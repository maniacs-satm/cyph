import { StringMapWrapper } from 'angular2/src/facade/collection';
import { isPresent, isBlank, RegExpWrapper, CONST_EXPR } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
export function convertUrlParamsToArray(urlParams) {
    var paramsArray = [];
    if (isBlank(urlParams)) {
        return [];
    }
    StringMapWrapper.forEach(urlParams, (value, key) => { paramsArray.push((value === true) ? key : key + '=' + value); });
    return paramsArray;
}
// Convert an object of url parameters into a string that can be used in an URL
export function serializeParams(urlParams, joiner = '&') {
    return convertUrlParamsToArray(urlParams).join(joiner);
}
/**
 * This class represents a parsed URL
 */
export class Url {
    constructor(path, child = null, auxiliary = CONST_EXPR([]), params = CONST_EXPR({})) {
        this.path = path;
        this.child = child;
        this.auxiliary = auxiliary;
        this.params = params;
    }
    toString() {
        return this.path + this._matrixParamsToString() + this._auxToString() + this._childString();
    }
    segmentToString() { return this.path + this._matrixParamsToString(); }
    /** @internal */
    _auxToString() {
        return this.auxiliary.length > 0 ?
            ('(' + this.auxiliary.map(sibling => sibling.toString()).join('//') + ')') :
            '';
    }
    _matrixParamsToString() {
        var paramString = serializeParams(this.params, ';');
        if (paramString.length > 0) {
            return ';' + paramString;
        }
        return '';
    }
    /** @internal */
    _childString() { return isPresent(this.child) ? ('/' + this.child.toString()) : ''; }
}
export class RootUrl extends Url {
    constructor(path, child = null, auxiliary = CONST_EXPR([]), params = null) {
        super(path, child, auxiliary, params);
    }
    toString() {
        return this.path + this._auxToString() + this._childString() + this._queryParamsToString();
    }
    segmentToString() { return this.path + this._queryParamsToString(); }
    _queryParamsToString() {
        if (isBlank(this.params)) {
            return '';
        }
        return '?' + serializeParams(this.params);
    }
}
export function pathSegmentsToUrl(pathSegments) {
    var url = new Url(pathSegments[pathSegments.length - 1]);
    for (var i = pathSegments.length - 2; i >= 0; i -= 1) {
        url = new Url(pathSegments[i], url);
    }
    return url;
}
var SEGMENT_RE = RegExpWrapper.create('^[^\\/\\(\\)\\?;=&#]+');
function matchUrlSegment(str) {
    var match = RegExpWrapper.firstMatch(SEGMENT_RE, str);
    return isPresent(match) ? match[0] : '';
}
var QUERY_PARAM_VALUE_RE = RegExpWrapper.create('^[^\\(\\)\\?;&#]+');
function matchUrlQueryParamValue(str) {
    var match = RegExpWrapper.firstMatch(QUERY_PARAM_VALUE_RE, str);
    return isPresent(match) ? match[0] : '';
}
export class UrlParser {
    peekStartsWith(str) { return this._remaining.startsWith(str); }
    capture(str) {
        if (!this._remaining.startsWith(str)) {
            throw new BaseException(`Expected "${str}".`);
        }
        this._remaining = this._remaining.substring(str.length);
    }
    parse(url) {
        this._remaining = url;
        if (url == '' || url == '/') {
            return new Url('');
        }
        return this.parseRoot();
    }
    // segment + (aux segments) + (query params)
    parseRoot() {
        if (this.peekStartsWith('/')) {
            this.capture('/');
        }
        var path = matchUrlSegment(this._remaining);
        this.capture(path);
        var aux = [];
        if (this.peekStartsWith('(')) {
            aux = this.parseAuxiliaryRoutes();
        }
        if (this.peekStartsWith(';')) {
            // TODO: should these params just be dropped?
            this.parseMatrixParams();
        }
        var child = null;
        if (this.peekStartsWith('/') && !this.peekStartsWith('//')) {
            this.capture('/');
            child = this.parseSegment();
        }
        var queryParams = null;
        if (this.peekStartsWith('?')) {
            queryParams = this.parseQueryParams();
        }
        return new RootUrl(path, child, aux, queryParams);
    }
    // segment + (matrix params) + (aux segments)
    parseSegment() {
        if (this._remaining.length == 0) {
            return null;
        }
        if (this.peekStartsWith('/')) {
            this.capture('/');
        }
        var path = matchUrlSegment(this._remaining);
        this.capture(path);
        var matrixParams = null;
        if (this.peekStartsWith(';')) {
            matrixParams = this.parseMatrixParams();
        }
        var aux = [];
        if (this.peekStartsWith('(')) {
            aux = this.parseAuxiliaryRoutes();
        }
        var child = null;
        if (this.peekStartsWith('/') && !this.peekStartsWith('//')) {
            this.capture('/');
            child = this.parseSegment();
        }
        return new Url(path, child, aux, matrixParams);
    }
    parseQueryParams() {
        var params = {};
        this.capture('?');
        this.parseQueryParam(params);
        while (this._remaining.length > 0 && this.peekStartsWith('&')) {
            this.capture('&');
            this.parseQueryParam(params);
        }
        return params;
    }
    parseMatrixParams() {
        var params = {};
        while (this._remaining.length > 0 && this.peekStartsWith(';')) {
            this.capture(';');
            this.parseParam(params);
        }
        return params;
    }
    parseParam(params) {
        var key = matchUrlSegment(this._remaining);
        if (isBlank(key)) {
            return;
        }
        this.capture(key);
        var value = true;
        if (this.peekStartsWith('=')) {
            this.capture('=');
            var valueMatch = matchUrlSegment(this._remaining);
            if (isPresent(valueMatch)) {
                value = valueMatch;
                this.capture(value);
            }
        }
        params[key] = value;
    }
    parseQueryParam(params) {
        var key = matchUrlSegment(this._remaining);
        if (isBlank(key)) {
            return;
        }
        this.capture(key);
        var value = true;
        if (this.peekStartsWith('=')) {
            this.capture('=');
            var valueMatch = matchUrlQueryParamValue(this._remaining);
            if (isPresent(valueMatch)) {
                value = valueMatch;
                this.capture(value);
            }
        }
        params[key] = value;
    }
    parseAuxiliaryRoutes() {
        var routes = [];
        this.capture('(');
        while (!this.peekStartsWith(')') && this._remaining.length > 0) {
            routes.push(this.parseSegment());
            if (this.peekStartsWith('//')) {
                this.capture('//');
            }
        }
        this.capture(')');
        return routes;
    }
}
export var parser = new UrlParser();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3BhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtdzNEUmxYSmkudG1wL2FuZ3VsYXIyL3NyYy9yb3V0ZXIvdXJsX3BhcnNlci50cyJdLCJuYW1lcyI6WyJjb252ZXJ0VXJsUGFyYW1zVG9BcnJheSIsInNlcmlhbGl6ZVBhcmFtcyIsIlVybCIsIlVybC5jb25zdHJ1Y3RvciIsIlVybC50b1N0cmluZyIsIlVybC5zZWdtZW50VG9TdHJpbmciLCJVcmwuX2F1eFRvU3RyaW5nIiwiVXJsLl9tYXRyaXhQYXJhbXNUb1N0cmluZyIsIlVybC5fY2hpbGRTdHJpbmciLCJSb290VXJsIiwiUm9vdFVybC5jb25zdHJ1Y3RvciIsIlJvb3RVcmwudG9TdHJpbmciLCJSb290VXJsLnNlZ21lbnRUb1N0cmluZyIsIlJvb3RVcmwuX3F1ZXJ5UGFyYW1zVG9TdHJpbmciLCJwYXRoU2VnbWVudHNUb1VybCIsIm1hdGNoVXJsU2VnbWVudCIsIm1hdGNoVXJsUXVlcnlQYXJhbVZhbHVlIiwiVXJsUGFyc2VyIiwiVXJsUGFyc2VyLnBlZWtTdGFydHNXaXRoIiwiVXJsUGFyc2VyLmNhcHR1cmUiLCJVcmxQYXJzZXIucGFyc2UiLCJVcmxQYXJzZXIucGFyc2VSb290IiwiVXJsUGFyc2VyLnBhcnNlU2VnbWVudCIsIlVybFBhcnNlci5wYXJzZVF1ZXJ5UGFyYW1zIiwiVXJsUGFyc2VyLnBhcnNlTWF0cml4UGFyYW1zIiwiVXJsUGFyc2VyLnBhcnNlUGFyYW0iLCJVcmxQYXJzZXIucGFyc2VRdWVyeVBhcmFtIiwiVXJsUGFyc2VyLnBhcnNlQXV4aWxpYXJ5Um91dGVzIl0sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZ0NBQWdDO09BQ3hELEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFDLE1BQU0sMEJBQTBCO09BQy9FLEVBQUMsYUFBYSxFQUFtQixN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VUFBVUEsQ0FBQ0EsTUFBNEJBO1FBQ3JDUSxJQUFJQSxHQUFHQSxHQUFHQSxlQUFlQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtRQUMzQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDakJBLE1BQU1BLENBQUNBO1FBQ1RBLENBQUNBO1FBQ0RBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ2xCQSxJQUFJQSxLQUFLQSxHQUFRQSxJQUFJQSxDQUFDQTtRQUN0QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDN0JBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2xCQSxJQUFJQSxVQUFVQSxHQUFHQSxlQUFlQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtZQUNsREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFCQSxLQUFLQSxHQUFHQSxVQUFVQSxDQUFDQTtnQkFDbkJBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBQ3RCQSxDQUFDQTtRQUNIQSxDQUFDQTtRQUVEQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTtJQUN0QkEsQ0FBQ0E7SUFFRFIsZUFBZUEsQ0FBQ0EsTUFBNEJBO1FBQzFDUyxJQUFJQSxHQUFHQSxHQUFHQSxlQUFlQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtRQUMzQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDakJBLE1BQU1BLENBQUNBO1FBQ1RBLENBQUNBO1FBQ0RBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ2xCQSxJQUFJQSxLQUFLQSxHQUFRQSxJQUFJQSxDQUFDQTtRQUN0QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDN0JBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2xCQSxJQUFJQSxVQUFVQSxHQUFHQSx1QkFBdUJBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO1lBQzFEQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDMUJBLEtBQUtBLEdBQUdBLFVBQVVBLENBQUNBO2dCQUNuQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLENBQUNBO1FBQ0hBLENBQUNBO1FBRURBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO0lBQ3RCQSxDQUFDQTtJQUVEVCxvQkFBb0JBO1FBQ2xCVSxJQUFJQSxNQUFNQSxHQUFVQSxFQUFFQSxDQUFDQTtRQUN2QkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFbEJBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO1lBQy9EQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUNqQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzlCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNyQkEsQ0FBQ0E7UUFDSEEsQ0FBQ0E7UUFDREEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFbEJBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBO0lBQ2hCQSxDQUFDQTtBQUNIVixDQUFDQTtBQUVELFdBQVcsTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzUHJlc2VudCwgaXNCbGFuaywgUmVnRXhwV3JhcHBlciwgQ09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRVcmxQYXJhbXNUb0FycmF5KHVybFBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiBzdHJpbmdbXSB7XG4gIHZhciBwYXJhbXNBcnJheSA9IFtdO1xuICBpZiAoaXNCbGFuayh1cmxQYXJhbXMpKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChcbiAgICAgIHVybFBhcmFtcywgKHZhbHVlLCBrZXkpID0+IHsgcGFyYW1zQXJyYXkucHVzaCgodmFsdWUgPT09IHRydWUpID8ga2V5IDoga2V5ICsgJz0nICsgdmFsdWUpOyB9KTtcbiAgcmV0dXJuIHBhcmFtc0FycmF5O1xufVxuXG4vLyBDb252ZXJ0IGFuIG9iamVjdCBvZiB1cmwgcGFyYW1ldGVycyBpbnRvIGEgc3RyaW5nIHRoYXQgY2FuIGJlIHVzZWQgaW4gYW4gVVJMXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplUGFyYW1zKHVybFBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0sIGpvaW5lciA9ICcmJyk6IHN0cmluZyB7XG4gIHJldHVybiBjb252ZXJ0VXJsUGFyYW1zVG9BcnJheSh1cmxQYXJhbXMpLmpvaW4oam9pbmVyKTtcbn1cblxuLyoqXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgYSBwYXJzZWQgVVJMXG4gKi9cbmV4cG9ydCBjbGFzcyBVcmwge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBwYXRoOiBzdHJpbmcsIHB1YmxpYyBjaGlsZDogVXJsID0gbnVsbCwgcHVibGljIGF1eGlsaWFyeTogVXJsW10gPSBDT05TVF9FWFBSKFtdKSxcbiAgICAgIHB1YmxpYyBwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gQ09OU1RfRVhQUih7fSkpIHt9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wYXRoICsgdGhpcy5fbWF0cml4UGFyYW1zVG9TdHJpbmcoKSArIHRoaXMuX2F1eFRvU3RyaW5nKCkgKyB0aGlzLl9jaGlsZFN0cmluZygpO1xuICB9XG5cbiAgc2VnbWVudFRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnBhdGggKyB0aGlzLl9tYXRyaXhQYXJhbXNUb1N0cmluZygpOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYXV4VG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hdXhpbGlhcnkubGVuZ3RoID4gMCA/XG4gICAgICAgICgnKCcgKyB0aGlzLmF1eGlsaWFyeS5tYXAoc2libGluZyA9PiBzaWJsaW5nLnRvU3RyaW5nKCkpLmpvaW4oJy8vJykgKyAnKScpIDpcbiAgICAgICAgJyc7XG4gIH1cblxuICBwcml2YXRlIF9tYXRyaXhQYXJhbXNUb1N0cmluZygpOiBzdHJpbmcge1xuICAgIHZhciBwYXJhbVN0cmluZyA9IHNlcmlhbGl6ZVBhcmFtcyh0aGlzLnBhcmFtcywgJzsnKTtcbiAgICBpZiAocGFyYW1TdHJpbmcubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuICc7JyArIHBhcmFtU3RyaW5nO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9jaGlsZFN0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gaXNQcmVzZW50KHRoaXMuY2hpbGQpID8gKCcvJyArIHRoaXMuY2hpbGQudG9TdHJpbmcoKSkgOiAnJzsgfVxufVxuXG5leHBvcnQgY2xhc3MgUm9vdFVybCBleHRlbmRzIFVybCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcGF0aDogc3RyaW5nLCBjaGlsZDogVXJsID0gbnVsbCwgYXV4aWxpYXJ5OiBVcmxbXSA9IENPTlNUX0VYUFIoW10pLFxuICAgICAgcGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSA9IG51bGwpIHtcbiAgICBzdXBlcihwYXRoLCBjaGlsZCwgYXV4aWxpYXJ5LCBwYXJhbXMpO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wYXRoICsgdGhpcy5fYXV4VG9TdHJpbmcoKSArIHRoaXMuX2NoaWxkU3RyaW5nKCkgKyB0aGlzLl9xdWVyeVBhcmFtc1RvU3RyaW5nKCk7XG4gIH1cblxuICBzZWdtZW50VG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMucGF0aCArIHRoaXMuX3F1ZXJ5UGFyYW1zVG9TdHJpbmcoKTsgfVxuXG4gIHByaXZhdGUgX3F1ZXJ5UGFyYW1zVG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICBpZiAoaXNCbGFuayh0aGlzLnBhcmFtcykpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICByZXR1cm4gJz8nICsgc2VyaWFsaXplUGFyYW1zKHRoaXMucGFyYW1zKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF0aFNlZ21lbnRzVG9VcmwocGF0aFNlZ21lbnRzOiBzdHJpbmdbXSk6IFVybCB7XG4gIHZhciB1cmwgPSBuZXcgVXJsKHBhdGhTZWdtZW50c1twYXRoU2VnbWVudHMubGVuZ3RoIC0gMV0pO1xuICBmb3IgKHZhciBpID0gcGF0aFNlZ21lbnRzLmxlbmd0aCAtIDI7IGkgPj0gMDsgaSAtPSAxKSB7XG4gICAgdXJsID0gbmV3IFVybChwYXRoU2VnbWVudHNbaV0sIHVybCk7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn1cblxudmFyIFNFR01FTlRfUkUgPSBSZWdFeHBXcmFwcGVyLmNyZWF0ZSgnXlteXFxcXC9cXFxcKFxcXFwpXFxcXD87PSYjXSsnKTtcbmZ1bmN0aW9uIG1hdGNoVXJsU2VnbWVudChzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHZhciBtYXRjaCA9IFJlZ0V4cFdyYXBwZXIuZmlyc3RNYXRjaChTRUdNRU5UX1JFLCBzdHIpO1xuICByZXR1cm4gaXNQcmVzZW50KG1hdGNoKSA/IG1hdGNoWzBdIDogJyc7XG59XG52YXIgUVVFUllfUEFSQU1fVkFMVUVfUkUgPSBSZWdFeHBXcmFwcGVyLmNyZWF0ZSgnXlteXFxcXChcXFxcKVxcXFw/OyYjXSsnKTtcbmZ1bmN0aW9uIG1hdGNoVXJsUXVlcnlQYXJhbVZhbHVlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgdmFyIG1hdGNoID0gUmVnRXhwV3JhcHBlci5maXJzdE1hdGNoKFFVRVJZX1BBUkFNX1ZBTFVFX1JFLCBzdHIpO1xuICByZXR1cm4gaXNQcmVzZW50KG1hdGNoKSA/IG1hdGNoWzBdIDogJyc7XG59XG5cbmV4cG9ydCBjbGFzcyBVcmxQYXJzZXIge1xuICBwcml2YXRlIF9yZW1haW5pbmc6IHN0cmluZztcblxuICBwZWVrU3RhcnRzV2l0aChzdHI6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVtYWluaW5nLnN0YXJ0c1dpdGgoc3RyKTsgfVxuXG4gIGNhcHR1cmUoc3RyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3JlbWFpbmluZy5zdGFydHNXaXRoKHN0cikpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBFeHBlY3RlZCBcIiR7c3RyfVwiLmApO1xuICAgIH1cbiAgICB0aGlzLl9yZW1haW5pbmcgPSB0aGlzLl9yZW1haW5pbmcuc3Vic3RyaW5nKHN0ci5sZW5ndGgpO1xuICB9XG5cbiAgcGFyc2UodXJsOiBzdHJpbmcpOiBVcmwge1xuICAgIHRoaXMuX3JlbWFpbmluZyA9IHVybDtcbiAgICBpZiAodXJsID09ICcnIHx8IHVybCA9PSAnLycpIHtcbiAgICAgIHJldHVybiBuZXcgVXJsKCcnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucGFyc2VSb290KCk7XG4gIH1cblxuICAvLyBzZWdtZW50ICsgKGF1eCBzZWdtZW50cykgKyAocXVlcnkgcGFyYW1zKVxuICBwYXJzZVJvb3QoKTogUm9vdFVybCB7XG4gICAgaWYgKHRoaXMucGVla1N0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgdGhpcy5jYXB0dXJlKCcvJyk7XG4gICAgfVxuICAgIHZhciBwYXRoID0gbWF0Y2hVcmxTZWdtZW50KHRoaXMuX3JlbWFpbmluZyk7XG4gICAgdGhpcy5jYXB0dXJlKHBhdGgpO1xuXG4gICAgdmFyIGF1eDogVXJsW10gPSBbXTtcbiAgICBpZiAodGhpcy5wZWVrU3RhcnRzV2l0aCgnKCcpKSB7XG4gICAgICBhdXggPSB0aGlzLnBhcnNlQXV4aWxpYXJ5Um91dGVzKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBlZWtTdGFydHNXaXRoKCc7JykpIHtcbiAgICAgIC8vIFRPRE86IHNob3VsZCB0aGVzZSBwYXJhbXMganVzdCBiZSBkcm9wcGVkP1xuICAgICAgdGhpcy5wYXJzZU1hdHJpeFBhcmFtcygpO1xuICAgIH1cbiAgICB2YXIgY2hpbGQgPSBudWxsO1xuICAgIGlmICh0aGlzLnBlZWtTdGFydHNXaXRoKCcvJykgJiYgIXRoaXMucGVla1N0YXJ0c1dpdGgoJy8vJykpIHtcbiAgICAgIHRoaXMuY2FwdHVyZSgnLycpO1xuICAgICAgY2hpbGQgPSB0aGlzLnBhcnNlU2VnbWVudCgpO1xuICAgIH1cbiAgICB2YXIgcXVlcnlQYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gbnVsbDtcbiAgICBpZiAodGhpcy5wZWVrU3RhcnRzV2l0aCgnPycpKSB7XG4gICAgICBxdWVyeVBhcmFtcyA9IHRoaXMucGFyc2VRdWVyeVBhcmFtcygpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJvb3RVcmwocGF0aCwgY2hpbGQsIGF1eCwgcXVlcnlQYXJhbXMpO1xuICB9XG5cbiAgLy8gc2VnbWVudCArIChtYXRyaXggcGFyYW1zKSArIChhdXggc2VnbWVudHMpXG4gIHBhcnNlU2VnbWVudCgpOiBVcmwge1xuICAgIGlmICh0aGlzLl9yZW1haW5pbmcubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5wZWVrU3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICB0aGlzLmNhcHR1cmUoJy8nKTtcbiAgICB9XG4gICAgdmFyIHBhdGggPSBtYXRjaFVybFNlZ21lbnQodGhpcy5fcmVtYWluaW5nKTtcbiAgICB0aGlzLmNhcHR1cmUocGF0aCk7XG5cbiAgICB2YXIgbWF0cml4UGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSA9IG51bGw7XG4gICAgaWYgKHRoaXMucGVla1N0YXJ0c1dpdGgoJzsnKSkge1xuICAgICAgbWF0cml4UGFyYW1zID0gdGhpcy5wYXJzZU1hdHJpeFBhcmFtcygpO1xuICAgIH1cbiAgICB2YXIgYXV4OiBVcmxbXSA9IFtdO1xuICAgIGlmICh0aGlzLnBlZWtTdGFydHNXaXRoKCcoJykpIHtcbiAgICAgIGF1eCA9IHRoaXMucGFyc2VBdXhpbGlhcnlSb3V0ZXMoKTtcbiAgICB9XG4gICAgdmFyIGNoaWxkOiBVcmwgPSBudWxsO1xuICAgIGlmICh0aGlzLnBlZWtTdGFydHNXaXRoKCcvJykgJiYgIXRoaXMucGVla1N0YXJ0c1dpdGgoJy8vJykpIHtcbiAgICAgIHRoaXMuY2FwdHVyZSgnLycpO1xuICAgICAgY2hpbGQgPSB0aGlzLnBhcnNlU2VnbWVudCgpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFVybChwYXRoLCBjaGlsZCwgYXV4LCBtYXRyaXhQYXJhbXMpO1xuICB9XG5cbiAgcGFyc2VRdWVyeVBhcmFtcygpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgdmFyIHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICB0aGlzLmNhcHR1cmUoJz8nKTtcbiAgICB0aGlzLnBhcnNlUXVlcnlQYXJhbShwYXJhbXMpO1xuICAgIHdoaWxlICh0aGlzLl9yZW1haW5pbmcubGVuZ3RoID4gMCAmJiB0aGlzLnBlZWtTdGFydHNXaXRoKCcmJykpIHtcbiAgICAgIHRoaXMuY2FwdHVyZSgnJicpO1xuICAgICAgdGhpcy5wYXJzZVF1ZXJ5UGFyYW0ocGFyYW1zKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIHBhcnNlTWF0cml4UGFyYW1zKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICB2YXIgcGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuICAgIHdoaWxlICh0aGlzLl9yZW1haW5pbmcubGVuZ3RoID4gMCAmJiB0aGlzLnBlZWtTdGFydHNXaXRoKCc7JykpIHtcbiAgICAgIHRoaXMuY2FwdHVyZSgnOycpO1xuICAgICAgdGhpcy5wYXJzZVBhcmFtKHBhcmFtcyk7XG4gICAgfVxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICBwYXJzZVBhcmFtKHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiB2b2lkIHtcbiAgICB2YXIga2V5ID0gbWF0Y2hVcmxTZWdtZW50KHRoaXMuX3JlbWFpbmluZyk7XG4gICAgaWYgKGlzQmxhbmsoa2V5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNhcHR1cmUoa2V5KTtcbiAgICB2YXIgdmFsdWU6IGFueSA9IHRydWU7XG4gICAgaWYgKHRoaXMucGVla1N0YXJ0c1dpdGgoJz0nKSkge1xuICAgICAgdGhpcy5jYXB0dXJlKCc9Jyk7XG4gICAgICB2YXIgdmFsdWVNYXRjaCA9IG1hdGNoVXJsU2VnbWVudCh0aGlzLl9yZW1haW5pbmcpO1xuICAgICAgaWYgKGlzUHJlc2VudCh2YWx1ZU1hdGNoKSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlTWF0Y2g7XG4gICAgICAgIHRoaXMuY2FwdHVyZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGFyYW1zW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHBhcnNlUXVlcnlQYXJhbShwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogdm9pZCB7XG4gICAgdmFyIGtleSA9IG1hdGNoVXJsU2VnbWVudCh0aGlzLl9yZW1haW5pbmcpO1xuICAgIGlmIChpc0JsYW5rKGtleSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jYXB0dXJlKGtleSk7XG4gICAgdmFyIHZhbHVlOiBhbnkgPSB0cnVlO1xuICAgIGlmICh0aGlzLnBlZWtTdGFydHNXaXRoKCc9JykpIHtcbiAgICAgIHRoaXMuY2FwdHVyZSgnPScpO1xuICAgICAgdmFyIHZhbHVlTWF0Y2ggPSBtYXRjaFVybFF1ZXJ5UGFyYW1WYWx1ZSh0aGlzLl9yZW1haW5pbmcpO1xuICAgICAgaWYgKGlzUHJlc2VudCh2YWx1ZU1hdGNoKSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlTWF0Y2g7XG4gICAgICAgIHRoaXMuY2FwdHVyZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGFyYW1zW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHBhcnNlQXV4aWxpYXJ5Um91dGVzKCk6IFVybFtdIHtcbiAgICB2YXIgcm91dGVzOiBVcmxbXSA9IFtdO1xuICAgIHRoaXMuY2FwdHVyZSgnKCcpO1xuXG4gICAgd2hpbGUgKCF0aGlzLnBlZWtTdGFydHNXaXRoKCcpJykgJiYgdGhpcy5fcmVtYWluaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgIHJvdXRlcy5wdXNoKHRoaXMucGFyc2VTZWdtZW50KCkpO1xuICAgICAgaWYgKHRoaXMucGVla1N0YXJ0c1dpdGgoJy8vJykpIHtcbiAgICAgICAgdGhpcy5jYXB0dXJlKCcvLycpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNhcHR1cmUoJyknKTtcblxuICAgIHJldHVybiByb3V0ZXM7XG4gIH1cbn1cblxuZXhwb3J0IHZhciBwYXJzZXIgPSBuZXcgVXJsUGFyc2VyKCk7XG4iXX0=