/* */ 
"format cjs";
'use strict';"use strict";
var core_1 = require('angular2/core');
var constants_1 = require('./constants');
var util_1 = require('./util');
var angular = require('./angular_js');
var CAMEL_CASE = /([A-Z])/g;
var INITIAL_VALUE = {
    __UNINITIALIZED__: true
};
var NOT_SUPPORTED = 'NOT_SUPPORTED';
var UpgradeNg1ComponentAdapterBuilder = (function () {
    function UpgradeNg1ComponentAdapterBuilder(name) {
        this.name = name;
        this.inputs = [];
        this.inputsRename = [];
        this.outputs = [];
        this.outputsRename = [];
        this.propertyOutputs = [];
        this.checkProperties = [];
        this.propertyMap = {};
        this.linkFn = null;
        this.directive = null;
        this.$controller = null;
        var selector = name.replace(CAMEL_CASE, function (all, next) { return '-' + next.toLowerCase(); });
        var self = this;
        this.type =
            core_1.Directive({ selector: selector, inputs: this.inputsRename, outputs: this.outputsRename })
                .Class({
                constructor: [
                    new core_1.Inject(constants_1.NG1_SCOPE),
                    core_1.ElementRef,
                    function (scope, elementRef) {
                        return new UpgradeNg1ComponentAdapter(self.linkFn, scope, self.directive, elementRef, self.$controller, self.inputs, self.outputs, self.propertyOutputs, self.checkProperties, self.propertyMap);
                    }
                ],
                ngOnInit: function () { },
                ngOnChanges: function () { },
                ngDoCheck: function () { }
            });
    }
    UpgradeNg1ComponentAdapterBuilder.prototype.extractDirective = function (injector) {
        var directives = injector.get(this.name + 'Directive');
        if (directives.length > 1) {
            throw new Error('Only support single directive definition for: ' + this.name);
        }
        var directive = directives[0];
        if (directive.replace)
            this.notSupported('replace');
        if (directive.terminal)
            this.notSupported('terminal');
        var link = directive.link;
        if (typeof link == 'object') {
            if (link.post)
                this.notSupported('link.post');
        }
        return directive;
    };
    UpgradeNg1ComponentAdapterBuilder.prototype.notSupported = function (feature) {
        throw new Error("Upgraded directive '" + this.name + "' does not support '" + feature + "'.");
    };
    UpgradeNg1ComponentAdapterBuilder.prototype.extractBindings = function () {
        var btcIsObject = typeof this.directive.bindToController === 'object';
        if (btcIsObject && Object.keys(this.directive.scope).length) {
            throw new Error("Binding definitions on scope and controller at the same time are not supported.");
        }
        var context = (btcIsObject) ? this.directive.bindToController : this.directive.scope;
        if (typeof context == 'object') {
            for (var name in context) {
                if (context.hasOwnProperty(name)) {
                    var localName = context[name];
                    var type = localName.charAt(0);
                    localName = localName.substr(1) || name;
                    var outputName = 'output_' + name;
                    var outputNameRename = outputName + ': ' + name;
                    var outputNameRenameChange = outputName + ': ' + name + 'Change';
                    var inputName = 'input_' + name;
                    var inputNameRename = inputName + ': ' + name;
                    switch (type) {
                        case '=':
                            this.propertyOutputs.push(outputName);
                            this.checkProperties.push(localName);
                            this.outputs.push(outputName);
                            this.outputsRename.push(outputNameRenameChange);
                            this.propertyMap[outputName] = localName;
                        // don't break; let it fall through to '@'
                        case '@':
                        // handle the '<' binding of angular 1.5 components
                        case '<':
                            this.inputs.push(inputName);
                            this.inputsRename.push(inputNameRename);
                            this.propertyMap[inputName] = localName;
                            break;
                        case '&':
                            this.outputs.push(outputName);
                            this.outputsRename.push(outputNameRename);
                            this.propertyMap[outputName] = localName;
                            break;
                        default:
                            var json = JSON.stringify(context);
                            throw new Error("Unexpected mapping '" + type + "' in '" + json + "' in '" + this.name + "' directive.");
                    }
                }
            }
        }
    };
    UpgradeNg1ComponentAdapterBuilder.prototype.compileTemplate = function (compile, templateCache, httpBackend) {
        var _this = this;
        if (this.directive.template !== undefined) {
            this.linkFn = compileHtml(this.directive.template);
        }
        else if (this.directive.templateUrl) {
            var url = this.directive.templateUrl;
            var html = templateCache.get(url);
            if (html !== undefined) {
                this.linkFn = compileHtml(html);
            }
            else {
                return new Promise(function (resolve, err) {
                    httpBackend('GET', url, null, function (status, response) {
                        if (status == 200) {
                            resolve(_this.linkFn = compileHtml(templateCache.put(url, response)));
                        }
                        else {
                            err("GET " + url + " returned " + status + ": " + response);
                        }
                    });
                });
            }
        }
        else {
            throw new Error("Directive '" + this.name + "' is not a component, it is missing template.");
        }
        return null;
        function compileHtml(html) {
            var div = document.createElement('div');
            div.innerHTML = html;
            return compile(div.childNodes);
        }
    };
    UpgradeNg1ComponentAdapterBuilder.resolve = function (exportedComponents, injector) {
        var promises = [];
        var compile = injector.get(constants_1.NG1_COMPILE);
        var templateCache = injector.get(constants_1.NG1_TEMPLATE_CACHE);
        var httpBackend = injector.get(constants_1.NG1_HTTP_BACKEND);
        var $controller = injector.get(constants_1.NG1_CONTROLLER);
        for (var name in exportedComponents) {
            if (exportedComponents.hasOwnProperty(name)) {
                var exportedComponent = exportedComponents[name];
                exportedComponent.directive = exportedComponent.extractDirective(injector);
                exportedComponent.$controller = $controller;
                exportedComponent.extractBindings();
                var promise = exportedComponent.compileTemplate(compile, templateCache, httpBackend);
                if (promise)
                    promises.push(promise);
            }
        }
        return Promise.all(promises);
    };
    return UpgradeNg1ComponentAdapterBuilder;
}());
exports.UpgradeNg1ComponentAdapterBuilder = UpgradeNg1ComponentAdapterBuilder;
var UpgradeNg1ComponentAdapter = (function () {
    function UpgradeNg1ComponentAdapter(linkFn, scope, directive, elementRef, $controller, inputs, outputs, propOuts, checkProperties, propertyMap) {
        this.directive = directive;
        this.inputs = inputs;
        this.outputs = outputs;
        this.propOuts = propOuts;
        this.checkProperties = checkProperties;
        this.propertyMap = propertyMap;
        this.destinationObj = null;
        this.checkLastValues = [];
        var element = elementRef.nativeElement;
        var childNodes = [];
        var childNode;
        while (childNode = element.firstChild) {
            element.removeChild(childNode);
            childNodes.push(childNode);
        }
        var componentScope = scope.$new(!!directive.scope);
        var $element = angular.element(element);
        var controllerType = directive.controller;
        var controller = null;
        if (controllerType) {
            var locals = { $scope: componentScope, $element: $element };
            controller = $controller(controllerType, locals, null, directive.controllerAs);
            $element.data(util_1.controllerKey(directive.name), controller);
        }
        var link = directive.link;
        if (typeof link == 'object')
            link = link.pre;
        if (link) {
            var attrs = NOT_SUPPORTED;
            var transcludeFn = NOT_SUPPORTED;
            var linkController = this.resolveRequired($element, directive.require);
            directive.link(componentScope, $element, attrs, linkController, transcludeFn);
        }
        this.destinationObj = directive.bindToController && controller ? controller : componentScope;
        linkFn(componentScope, function (clonedElement, scope) {
            for (var i = 0, ii = clonedElement.length; i < ii; i++) {
                element.appendChild(clonedElement[i]);
            }
        }, { parentBoundTranscludeFn: function (scope, cloneAttach) { cloneAttach(childNodes); } });
        for (var i = 0; i < inputs.length; i++) {
            this[inputs[i]] = null;
        }
        for (var j = 0; j < outputs.length; j++) {
            var emitter = this[outputs[j]] = new core_1.EventEmitter();
            this.setComponentProperty(outputs[j], (function (emitter) { return function (value) { return emitter.emit(value); }; })(emitter));
        }
        for (var k = 0; k < propOuts.length; k++) {
            this[propOuts[k]] = new core_1.EventEmitter();
            this.checkLastValues.push(INITIAL_VALUE);
        }
    }
    UpgradeNg1ComponentAdapter.prototype.ngOnInit = function () {
        if (this.destinationObj.$onInit) {
            this.destinationObj.$onInit();
        }
    };
    UpgradeNg1ComponentAdapter.prototype.ngOnChanges = function (changes) {
        for (var name in changes) {
            if (changes.hasOwnProperty(name)) {
                var change = changes[name];
                this.setComponentProperty(name, change.currentValue);
            }
        }
    };
    UpgradeNg1ComponentAdapter.prototype.ngDoCheck = function () {
        var count = 0;
        var destinationObj = this.destinationObj;
        var lastValues = this.checkLastValues;
        var checkProperties = this.checkProperties;
        for (var i = 0; i < checkProperties.length; i++) {
            var value = destinationObj[checkProperties[i]];
            var last = lastValues[i];
            if (value !== last) {
                if (typeof value == 'number' && isNaN(value) && typeof last == 'number' && isNaN(last)) {
                }
                else {
                    var eventEmitter = this[this.propOuts[i]];
                    eventEmitter.emit(lastValues[i] = value);
                }
            }
        }
        return count;
    };
    UpgradeNg1ComponentAdapter.prototype.setComponentProperty = function (name, value) {
        this.destinationObj[this.propertyMap[name]] = value;
    };
    UpgradeNg1ComponentAdapter.prototype.resolveRequired = function ($element, require) {
        if (!require) {
            return undefined;
        }
        else if (typeof require == 'string') {
            var name = require;
            var isOptional = false;
            var startParent = false;
            var searchParents = false;
            var ch;
            if (name.charAt(0) == '?') {
                isOptional = true;
                name = name.substr(1);
            }
            if (name.charAt(0) == '^') {
                searchParents = true;
                name = name.substr(1);
            }
            if (name.charAt(0) == '^') {
                startParent = true;
                name = name.substr(1);
            }
            var key = util_1.controllerKey(name);
            if (startParent)
                $element = $element.parent();
            var dep = searchParents ? $element.inheritedData(key) : $element.data(key);
            if (!dep && !isOptional) {
                throw new Error("Can not locate '" + require + "' in '" + this.directive.name + "'.");
            }
            return dep;
        }
        else if (require instanceof Array) {
            var deps = [];
            for (var i = 0; i < require.length; i++) {
                deps.push(this.resolveRequired($element, require[i]));
            }
            return deps;
        }
        throw new Error("Directive '" + this.directive.name + "' require syntax unrecognized: " + this.directive.require);
    };
    return UpgradeNg1ComponentAdapter;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBncmFkZV9uZzFfYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtY25SOXVlbGUudG1wL2FuZ3VsYXIyL3NyYy91cGdyYWRlL3VwZ3JhZGVfbmcxX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQVNPLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZCLDBCQU1PLGFBQWEsQ0FBQyxDQUFBO0FBQ3JCLHFCQUE0QixRQUFRLENBQUMsQ0FBQTtBQUNyQyxJQUFZLE9BQU8sV0FBTSxjQUFjLENBQUMsQ0FBQTtBQUV4QyxJQUFNLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDOUIsSUFBTSxhQUFhLEdBQUc7SUFDcEIsaUJBQWlCLEVBQUUsSUFBSTtDQUN4QixDQUFDO0FBQ0YsSUFBTSxhQUFhLEdBQVEsZUFBZSxDQUFDO0FBRzNDO0lBYUUsMkNBQW1CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBWC9CLFdBQU0sR0FBYSxFQUFFLENBQUM7UUFDdEIsaUJBQVksR0FBYSxFQUFFLENBQUM7UUFDNUIsWUFBTyxHQUFhLEVBQUUsQ0FBQztRQUN2QixrQkFBYSxHQUFhLEVBQUUsQ0FBQztRQUM3QixvQkFBZSxHQUFhLEVBQUUsQ0FBQztRQUMvQixvQkFBZSxHQUFhLEVBQUUsQ0FBQztRQUMvQixnQkFBVyxHQUE2QixFQUFFLENBQUM7UUFDM0MsV0FBTSxHQUFvQixJQUFJLENBQUM7UUFDL0IsY0FBUyxHQUF1QixJQUFJLENBQUM7UUFDckMsZ0JBQVcsR0FBK0IsSUFBSSxDQUFDO1FBRzdDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFVBQUMsR0FBRyxFQUFFLElBQVksSUFBSyxPQUFBLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQXhCLENBQXdCLENBQUMsQ0FBQztRQUN6RixJQUFJLElBQUksR0FBRyxJQUFJ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QUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEQsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FDWCxnQkFBYyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksdUNBQWtDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBUyxDQUFDLENBQUM7SUFDbkcsQ0FBQztJQUNILGlDQUFDO0FBQUQsQ0FBQyxBQXJJRCxJQXFJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRG9DaGVjayxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlLFxuICBUeXBlXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTkcxX0NPTVBJTEUsXG4gIE5HMV9TQ09QRSxcbiAgTkcxX0hUVFBfQkFDS0VORCxcbiAgTkcxX1RFTVBMQVRFX0NBQ0hFLFxuICBORzFfQ09OVFJPTExFUlxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge2NvbnRyb2xsZXJLZXl9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJy4vYW5ndWxhcl9qcyc7XG5cbmNvbnN0IENBTUVMX0NBU0UgPSAvKFtBLVpdKS9nO1xuY29uc3QgSU5JVElBTF9WQUxVRSA9IHtcbiAgX19VTklOSVRJQUxJWkVEX186IHRydWVcbn07XG5jb25zdCBOT1RfU1VQUE9SVEVEOiBhbnkgPSAnTk9UX1NVUFBPUlRFRCc7XG5cblxuZXhwb3J0IGNsYXNzIFVwZ3JhZGVOZzFDb21wb25lbnRBZGFwdGVyQnVpbGRlciB7XG4gIHR5cGU6IFR5cGU7XG4gIGlucHV0czogc3RyaW5nW10gPSBbXTtcbiAgaW5wdXRzUmVuYW1lOiBzdHJpbmdbXSA9IFtdO1xuICBvdXRwdXRzOiBzdHJpbmdbXSA9IFtdO1xuICBvdXRwdXRzUmVuYW1lOiBzdHJpbmdbXSA9IFtdO1xuICBwcm9wZXJ0eU91dHB1dHM6IHN0cmluZ1tdID0gW107XG4gIGNoZWNrUHJvcGVydGllczogc3RyaW5nW10gPSBbXTtcbiAgcHJvcGVydHlNYXA6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBsaW5rRm46IGFuZ3VsYXIuSUxpbmtGbiA9IG51bGw7XG4gIGRpcmVjdGl2ZTogYW5ndWxhci5JRGlyZWN0aXZlID0gbnVsbDtcbiAgJGNvbnRyb2xsZXI6IGFuZ3VsYXIuSUNvbnRyb2xsZXJTZXJ2aWNlID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XG4gICAgdmFyIHNlbGVjdG9yID0gbmFtZS5yZXBsYWNlKENBTUVMX0NBU0UsIChhbGwsIG5leHQ6IHN0cmluZykgPT4gJy0nICsgbmV4dC50b0xvd2VyQ2FzZSgpKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy50eXBlID1cbiAgICAgICAgRGlyZWN0aXZlKHtzZWxlY3Rvcjogc2VsZWN0b3IsIGlucHV0czogdGhpcy5pbnB1dHNSZW5hbWUsIG91dHB1dHM6IHRoaXMub3V0cHV0c1JlbmFtZX0pXG4gICAgICAgICAgICAuQ2xhc3Moe1xuICAgICAgICAgICAgICBjb25zdHJ1Y3RvcjogW1xuICAgICAgICAgICAgICAgIG5ldyBJbmplY3QoTkcxX1NDT1BFKSxcbiAgICAgICAgICAgICAgICBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHNjb3BlOiBhbmd1bGFyLklTY29wZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVcGdyYWRlTmcxQ29tcG9uZW50QWRhcHRlcihcbiAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxpbmtGbiwgc2NvcGUsIHNlbGYuZGlyZWN0aXZlLCBlbGVtZW50UmVmLCBzZWxmLiRjb250cm9sbGVyLCBzZWxmLmlucHV0cyxcbiAgICAgICAgICAgICAgICAgICAgICBzZWxmLm91dHB1dHMsIHNlbGYucHJvcGVydHlPdXRwdXRzLCBzZWxmLmNoZWNrUHJvcGVydGllcywgc2VsZi5wcm9wZXJ0eU1hcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBuZ09uSW5pdDogZnVuY3Rpb24oKSB7IC8qIG5lZWRzIHRvIGJlIGhlcmUgZm9yIG5nMiB0byBwcm9wZXJseSBkZXRlY3QgaXQgKi8gfSxcbiAgICAgICAgICAgICAgbmdPbkNoYW5nZXM6IGZ1bmN0aW9uKCkgeyAvKiBuZWVkcyB0byBiZSBoZXJlIGZvciBuZzIgdG8gcHJvcGVybHkgZGV0ZWN0IGl0ICovIH0sXG4gICAgICAgICAgICAgIG5nRG9DaGVjazogZnVuY3Rpb24oKSB7IC8qIG5lZWRzIHRvIGJlIGhlcmUgZm9yIG5nMiB0byBwcm9wZXJseSBkZXRlY3QgaXQgKi8gfVxuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBleHRyYWN0RGlyZWN0aXZlKGluamVjdG9yOiBhbmd1bGFyLklJbmplY3RvclNlcnZpY2UpOiBhbmd1bGFyLklEaXJlY3RpdmUge1xuICAgIHZhciBkaXJlY3RpdmVzOiBhbmd1bGFyLklEaXJlY3RpdmVbXSA9IGluamVjdG9yLmdldCh0aGlzLm5hbWUgKyAnRGlyZWN0aXZlJyk7XG4gICAgaWYgKGRpcmVjdGl2ZXMubGVuZ3RoID4gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdPbmx5IHN1cHBvcnQgc2luZ2xlIGRpcmVjdGl2ZSBkZWZpbml0aW9uIGZvcjogJyArIHRoaXMubmFtZSk7XG4gICAgfVxuICAgIHZhciBkaXJlY3RpdmUgPSBkaXJlY3RpdmVzWzBdO1xuICAgIGlmIChkaXJlY3RpdmUucmVwbGFjZSkgdGhpcy5ub3RTdXBwb3J0ZWQoJ3JlcGxhY2UnKTtcbiAgICBpZiAoZGlyZWN0aXZlLnRlcm1pbmFsKSB0aGlzLm5vdFN1cHBvcnRlZCgndGVybWluYWwnKTtcbiAgICB2YXIgbGluayA9IGRpcmVjdGl2ZS5saW5rO1xuICAgIGlmICh0eXBlb2YgbGluayA9PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKCg8YW5ndWxhci5JRGlyZWN0aXZlUHJlUG9zdD5saW5rKS5wb3N0KSB0aGlzLm5vdFN1cHBvcnRlZCgnbGluay5wb3N0Jyk7XG4gICAgfVxuICAgIHJldHVybiBkaXJlY3RpdmU7XG4gIH1cblxuICBwcml2YXRlIG5vdFN1cHBvcnRlZChmZWF0dXJlOiBzdHJpbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVwZ3JhZGVkIGRpcmVjdGl2ZSAnJHt0aGlzLm5hbWV9JyBkb2VzIG5vdCBzdXBwb3J0ICcke2ZlYXR1cmV9Jy5gKTtcbiAgfVxuXG4gIGV4dHJhY3RCaW5kaW5ncygpIHtcbiAgICB2YXIgYnRjSXNPYmplY3QgPSB0eXBlb2YgdGhpcy5kaXJlY3RpdmUuYmluZFRvQ29udHJvbGxlciA9PT0gJ29iamVjdCc7XG4gICAgaWYgKGJ0Y0lzT2JqZWN0ICYmIE9iamVjdC5rZXlzKHRoaXMuZGlyZWN0aXZlLnNjb3BlKS5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgQmluZGluZyBkZWZpbml0aW9ucyBvbiBzY29wZSBhbmQgY29udHJvbGxlciBhdCB0aGUgc2FtZSB0aW1lIGFyZSBub3Qgc3VwcG9ydGVkLmApO1xuICAgIH1cblxuICAgIHZhciBjb250ZXh0ID0gKGJ0Y0lzT2JqZWN0KSA/IHRoaXMuZGlyZWN0aXZlLmJpbmRUb0NvbnRyb2xsZXIgOiB0aGlzLmRpcmVjdGl2ZS5zY29wZTtcblxuICAgIGlmICh0eXBlb2YgY29udGV4dCA9PSAnb2JqZWN0Jykge1xuICAgICAgZm9yICh2YXIgbmFtZSBpbiBjb250ZXh0KSB7XG4gICAgICAgIGlmICgoPGFueT5jb250ZXh0KS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIHZhciBsb2NhbE5hbWUgPSBjb250ZXh0W25hbWVdO1xuICAgICAgICAgIHZhciB0eXBlID0gbG9jYWxOYW1lLmNoYXJBdCgwKTtcbiAgICAgICAgICBsb2NhbE5hbWUgPSBsb2NhbE5hbWUuc3Vic3RyKDEpIHx8IG5hbWU7XG4gICAgICAgICAgdmFyIG91dHB1dE5hbWUgPSAnb3V0cHV0XycgKyBuYW1lO1xuICAgICAgICAgIHZhciBvdXRwdXROYW1lUmVuYW1lID0gb3V0cHV0TmFtZSArICc6ICcgKyBuYW1lO1xuICAgICAgICAgIHZhciBvdXRwdXROYW1lUmVuYW1lQ2hhbmdlID0gb3V0cHV0TmFtZSArICc6ICcgKyBuYW1lICsgJ0NoYW5nZSc7XG4gICAgICAgICAgdmFyIGlucHV0TmFtZSA9ICdpbnB1dF8nICsgbmFtZTtcbiAgICAgICAgICB2YXIgaW5wdXROYW1lUmVuYW1lID0gaW5wdXROYW1lICsgJzogJyArIG5hbWU7XG4gICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICc9JzpcbiAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eU91dHB1dHMucHVzaChvdXRwdXROYW1lKTtcbiAgICAgICAgICAgICAgdGhpcy5jaGVja1Byb3BlcnRpZXMucHVzaChsb2NhbE5hbWUpO1xuICAgICAgICAgICAgICB0aGlzLm91dHB1dHMucHVzaChvdXRwdXROYW1lKTtcbiAgICAgICAgICAgICAgdGhpcy5vdXRwdXRzUmVuYW1lLnB1c2gob3V0cHV0TmFtZVJlbmFtZUNoYW5nZSk7XG4gICAgICAgICAgICAgIHRoaXMucHJvcGVydHlNYXBbb3V0cHV0TmFtZV0gPSBsb2NhbE5hbWU7XG4gICAgICAgICAgICAvLyBkb24ndCBicmVhazsgbGV0IGl0IGZhbGwgdGhyb3VnaCB0byAnQCdcbiAgICAgICAgICAgIGNhc2UgJ0AnOlxuICAgICAgICAgICAgLy8gaGFuZGxlIHRoZSAnPCcgYmluZGluZyBvZiBhbmd1bGFyIDEuNSBjb21wb25lbnRzXG4gICAgICAgICAgICBjYXNlICc8JzpcbiAgICAgICAgICAgICAgdGhpcy5pbnB1dHMucHVzaChpbnB1dE5hbWUpO1xuICAgICAgICAgICAgICB0aGlzLmlucHV0c1JlbmFtZS5wdXNoKGlucHV0TmFtZVJlbmFtZSk7XG4gICAgICAgICAgICAgIHRoaXMucHJvcGVydHlNYXBbaW5wdXROYW1lXSA9IGxvY2FsTmFtZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcmJzpcbiAgICAgICAgICAgICAgdGhpcy5vdXRwdXRzLnB1c2gob3V0cHV0TmFtZSk7XG4gICAgICAgICAgICAgIHRoaXMub3V0cHV0c1JlbmFtZS5wdXNoKG91dHB1dE5hbWVSZW5hbWUpO1xuICAgICAgICAgICAgICB0aGlzLnByb3BlcnR5TWFwW291dHB1dE5hbWVdID0gbG9jYWxOYW1lO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkoY29udGV4dCk7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgIGBVbmV4cGVjdGVkIG1hcHBpbmcgJyR7dHlwZX0nIGluICcke2pzb259JyBpbiAnJHt0aGlzLm5hbWV9JyBkaXJlY3RpdmUuYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29tcGlsZVRlbXBsYXRlKGNvbXBpbGU6IGFuZ3VsYXIuSUNvbXBpbGVTZXJ2aWNlLCB0ZW1wbGF0ZUNhY2hlOiBhbmd1bGFyLklUZW1wbGF0ZUNhY2hlU2VydmljZSxcbiAgICAgICAgICAgICAgICAgIGh0dHBCYWNrZW5kOiBhbmd1bGFyLklIdHRwQmFja2VuZFNlcnZpY2UpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmICh0aGlzLmRpcmVjdGl2ZS50ZW1wbGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmxpbmtGbiA9IGNvbXBpbGVIdG1sKHRoaXMuZGlyZWN0aXZlLnRlbXBsYXRlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aXZlLnRlbXBsYXRlVXJsKSB7XG4gICAgICB2YXIgdXJsID0gdGhpcy5kaXJlY3RpdmUudGVtcGxhdGVVcmw7XG4gICAgICB2YXIgaHRtbCA9IHRlbXBsYXRlQ2FjaGUuZ2V0KHVybCk7XG4gICAgICBpZiAoaHRtbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMubGlua0ZuID0gY29tcGlsZUh0bWwoaHRtbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIGVycikgPT4ge1xuICAgICAgICAgIGh0dHBCYWNrZW5kKCdHRVQnLCB1cmwsIG51bGwsIChzdGF0dXMsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICByZXNvbHZlKHRoaXMubGlua0ZuID0gY29tcGlsZUh0bWwodGVtcGxhdGVDYWNoZS5wdXQodXJsLCByZXNwb25zZSkpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVycihgR0VUICR7dXJsfSByZXR1cm5lZCAke3N0YXR1c306ICR7cmVzcG9uc2V9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYERpcmVjdGl2ZSAnJHt0aGlzLm5hbWV9JyBpcyBub3QgYSBjb21wb25lbnQsIGl0IGlzIG1pc3NpbmcgdGVtcGxhdGUuYCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICAgIGZ1bmN0aW9uIGNvbXBpbGVIdG1sKGh0bWwpOiBhbmd1bGFyLklMaW5rRm4ge1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XG4gICAgICByZXR1cm4gY29tcGlsZShkaXYuY2hpbGROb2Rlcyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlc29sdmUoZXhwb3J0ZWRDb21wb25lbnRzOiB7W25hbWU6IHN0cmluZ106IFVwZ3JhZGVOZzFDb21wb25lbnRBZGFwdGVyQnVpbGRlcn0sXG4gICAgICAgICAgICAgICAgIGluamVjdG9yOiBhbmd1bGFyLklJbmplY3RvclNlcnZpY2UpOiBQcm9taXNlPGFueT4ge1xuICAgIHZhciBwcm9taXNlcyA9IFtdO1xuICAgIHZhciBjb21waWxlOiBhbmd1bGFyLklDb21waWxlU2VydmljZSA9IGluamVjdG9yLmdldChORzFfQ09NUElMRSk7XG4gICAgdmFyIHRlbXBsYXRlQ2FjaGU6IGFuZ3VsYXIuSVRlbXBsYXRlQ2FjaGVTZXJ2aWNlID0gaW5qZWN0b3IuZ2V0KE5HMV9URU1QTEFURV9DQUNIRSk7XG4gICAgdmFyIGh0dHBCYWNrZW5kOiBhbmd1bGFyLklIdHRwQmFja2VuZFNlcnZpY2UgPSBpbmplY3Rvci5nZXQoTkcxX0hUVFBfQkFDS0VORCk7XG4gICAgdmFyICRjb250cm9sbGVyOiBhbmd1bGFyLklDb250cm9sbGVyU2VydmljZSA9IGluamVjdG9yLmdldChORzFfQ09OVFJPTExFUik7XG4gICAgZm9yICh2YXIgbmFtZSBpbiBleHBvcnRlZENvbXBvbmVudHMpIHtcbiAgICAgIGlmICgoPGFueT5leHBvcnRlZENvbXBvbmVudHMpLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHZhciBleHBvcnRlZENvbXBvbmVudCA9IGV4cG9ydGVkQ29tcG9uZW50c1tuYW1lXTtcbiAgICAgICAgZXhwb3J0ZWRDb21wb25lbnQuZGlyZWN0aXZlID0gZXhwb3J0ZWRDb21wb25lbnQuZXh0cmFjdERpcmVjdGl2ZShpbmplY3Rvcik7XG4gICAgICAgIGV4cG9ydGVkQ29tcG9uZW50LiRjb250cm9sbGVyID0gJGNvbnRyb2xsZXI7XG4gICAgICAgIGV4cG9ydGVkQ29tcG9uZW50LmV4dHJhY3RCaW5kaW5ncygpO1xuICAgICAgICB2YXIgcHJvbWlzZSA9IGV4cG9ydGVkQ29tcG9uZW50LmNvbXBpbGVUZW1wbGF0ZShjb21waWxlLCB0ZW1wbGF0ZUNhY2hlLCBodHRwQmFja2VuZCk7XG4gICAgICAgIGlmIChwcm9taXNlKSBwcm9taXNlcy5wdXNoKHByb21pc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG59XG5cbmNsYXNzIFVwZ3JhZGVOZzFDb21wb25lbnRBZGFwdGVyIGltcGxlbWVudHMgT25DaGFuZ2VzLCBEb0NoZWNrIHtcbiAgZGVzdGluYXRpb25PYmo6IGFueSA9IG51bGw7XG4gIGNoZWNrTGFzdFZhbHVlczogYW55W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihsaW5rRm46IGFuZ3VsYXIuSUxpbmtGbiwgc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCBwcml2YXRlIGRpcmVjdGl2ZTogYW5ndWxhci5JRGlyZWN0aXZlLFxuICAgICAgICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCAkY29udHJvbGxlcjogYW5ndWxhci5JQ29udHJvbGxlclNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgaW5wdXRzOiBzdHJpbmdbXSwgcHJpdmF0ZSBvdXRwdXRzOiBzdHJpbmdbXSwgcHJpdmF0ZSBwcm9wT3V0czogc3RyaW5nW10sXG4gICAgICAgICAgICAgIHByaXZhdGUgY2hlY2tQcm9wZXJ0aWVzOiBzdHJpbmdbXSwgcHJpdmF0ZSBwcm9wZXJ0eU1hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30pIHtcbiAgICB2YXIgZWxlbWVudDogRWxlbWVudCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB2YXIgY2hpbGROb2RlczogTm9kZVtdID0gW107XG4gICAgdmFyIGNoaWxkTm9kZTtcbiAgICB3aGlsZSAoY2hpbGROb2RlID0gZWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZSk7XG4gICAgICBjaGlsZE5vZGVzLnB1c2goY2hpbGROb2RlKTtcbiAgICB9XG4gICAgdmFyIGNvbXBvbmVudFNjb3BlID0gc2NvcGUuJG5ldyghIWRpcmVjdGl2ZS5zY29wZSk7XG4gICAgdmFyICRlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpO1xuICAgIHZhciBjb250cm9sbGVyVHlwZSA9IGRpcmVjdGl2ZS5jb250cm9sbGVyO1xuICAgIHZhciBjb250cm9sbGVyOiBhbnkgPSBudWxsO1xuICAgIGlmIChjb250cm9sbGVyVHlwZSkge1xuICAgICAgdmFyIGxvY2FscyA9IHskc2NvcGU6IGNvbXBvbmVudFNjb3BlLCAkZWxlbWVudDogJGVsZW1lbnR9O1xuICAgICAgY29udHJvbGxlciA9ICRjb250cm9sbGVyKGNvbnRyb2xsZXJUeXBlLCBsb2NhbHMsIG51bGwsIGRpcmVjdGl2ZS5jb250cm9sbGVyQXMpO1xuICAgICAgJGVsZW1lbnQuZGF0YShjb250cm9sbGVyS2V5KGRpcmVjdGl2ZS5uYW1lKSwgY29udHJvbGxlcik7XG4gICAgfVxuICAgIHZhciBsaW5rID0gZGlyZWN0aXZlLmxpbms7XG4gICAgaWYgKHR5cGVvZiBsaW5rID09ICdvYmplY3QnKSBsaW5rID0gKDxhbmd1bGFyLklEaXJlY3RpdmVQcmVQb3N0PmxpbmspLnByZTtcbiAgICBpZiAobGluaykge1xuICAgICAgdmFyIGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzID0gTk9UX1NVUFBPUlRFRDtcbiAgICAgIHZhciB0cmFuc2NsdWRlRm46IGFuZ3VsYXIuSVRyYW5zY2x1ZGVGdW5jdGlvbiA9IE5PVF9TVVBQT1JURUQ7XG4gICAgICB2YXIgbGlua0NvbnRyb2xsZXIgPSB0aGlzLnJlc29sdmVSZXF1aXJlZCgkZWxlbWVudCwgZGlyZWN0aXZlLnJlcXVpcmUpO1xuICAgICAgKDxhbmd1bGFyLklEaXJlY3RpdmVMaW5rRm4+ZGlyZWN0aXZlLmxpbmspKGNvbXBvbmVudFNjb3BlLCAkZWxlbWVudCwgYXR0cnMsIGxpbmtDb250cm9sbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zY2x1ZGVGbik7XG4gICAgfVxuICAgIHRoaXMuZGVzdGluYXRpb25PYmogPSBkaXJlY3RpdmUuYmluZFRvQ29udHJvbGxlciAmJiBjb250cm9sbGVyID8gY29udHJvbGxlciA6IGNvbXBvbmVudFNjb3BlO1xuXG4gICAgbGlua0ZuKGNvbXBvbmVudFNjb3BlLCAoY2xvbmVkRWxlbWVudDogTm9kZVtdLCBzY29wZTogYW5ndWxhci5JU2NvcGUpID0+IHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpaSA9IGNsb25lZEVsZW1lbnQubGVuZ3RoOyBpIDwgaWk7IGkrKykge1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNsb25lZEVsZW1lbnRbaV0pO1xuICAgICAgfVxuICAgIH0sIHtwYXJlbnRCb3VuZFRyYW5zY2x1ZGVGbjogKHNjb3BlLCBjbG9uZUF0dGFjaCkgPT4geyBjbG9uZUF0dGFjaChjaGlsZE5vZGVzKTsgfX0pO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXNbaW5wdXRzW2ldXSA9IG51bGw7XG4gICAgfVxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgb3V0cHV0cy5sZW5ndGg7IGorKykge1xuICAgICAgdmFyIGVtaXR0ZXIgPSB0aGlzW291dHB1dHNbal1dID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgdGhpcy5zZXRDb21wb25lbnRQcm9wZXJ0eShvdXRwdXRzW2pdLCAoKGVtaXR0ZXIpID0+ICh2YWx1ZSkgPT4gZW1pdHRlci5lbWl0KHZhbHVlKSkoZW1pdHRlcikpO1xuICAgIH1cbiAgICBmb3IgKHZhciBrID0gMDsgayA8IHByb3BPdXRzLmxlbmd0aDsgaysrKSB7XG4gICAgICB0aGlzW3Byb3BPdXRzW2tdXSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgIHRoaXMuY2hlY2tMYXN0VmFsdWVzLnB1c2goSU5JVElBTF9WQUxVRSk7XG4gICAgfVxuICB9XG5cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5kZXN0aW5hdGlvbk9iai4kb25Jbml0KSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uT2JqLiRvbkluaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7W25hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZX0pIHtcbiAgICBmb3IgKHZhciBuYW1lIGluIGNoYW5nZXMpIHtcbiAgICAgIGlmICgoPE9iamVjdD5jaGFuZ2VzKS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICB2YXIgY2hhbmdlOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzW25hbWVdO1xuICAgICAgICB0aGlzLnNldENvbXBvbmVudFByb3BlcnR5KG5hbWUsIGNoYW5nZS5jdXJyZW50VmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nRG9DaGVjaygpOiBudW1iZXIge1xuICAgIHZhciBjb3VudCA9IDA7XG4gICAgdmFyIGRlc3RpbmF0aW9uT2JqID0gdGhpcy5kZXN0aW5hdGlvbk9iajtcbiAgICB2YXIgbGFzdFZhbHVlcyA9IHRoaXMuY2hlY2tMYXN0VmFsdWVzO1xuICAgIHZhciBjaGVja1Byb3BlcnRpZXMgPSB0aGlzLmNoZWNrUHJvcGVydGllcztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoZWNrUHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbHVlID0gZGVzdGluYXRpb25PYmpbY2hlY2tQcm9wZXJ0aWVzW2ldXTtcbiAgICAgIHZhciBsYXN0ID0gbGFzdFZhbHVlc1tpXTtcbiAgICAgIGlmICh2YWx1ZSAhPT0gbGFzdCkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIGlzTmFOKHZhbHVlKSAmJiB0eXBlb2YgbGFzdCA9PSAnbnVtYmVyJyAmJiBpc05hTihsYXN0KSkge1xuICAgICAgICAgIC8vIGlnbm9yZSBiZWNhdXNlIE5hTiAhPSBOYU5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZXZlbnRFbWl0dGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IHRoaXNbdGhpcy5wcm9wT3V0c1tpXV07XG4gICAgICAgICAgZXZlbnRFbWl0dGVyLmVtaXQobGFzdFZhbHVlc1tpXSA9IHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICBzZXRDb21wb25lbnRQcm9wZXJ0eShuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmRlc3RpbmF0aW9uT2JqW3RoaXMucHJvcGVydHlNYXBbbmFtZV1dID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIHJlc29sdmVSZXF1aXJlZCgkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCByZXF1aXJlOiBzdHJpbmcgfCBzdHJpbmdbXSk6IGFueSB7XG4gICAgaWYgKCFyZXF1aXJlKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlcXVpcmUgPT0gJ3N0cmluZycpIHtcbiAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSA8c3RyaW5nPnJlcXVpcmU7XG4gICAgICB2YXIgaXNPcHRpb25hbCA9IGZhbHNlO1xuICAgICAgdmFyIHN0YXJ0UGFyZW50ID0gZmFsc2U7XG4gICAgICB2YXIgc2VhcmNoUGFyZW50cyA9IGZhbHNlO1xuICAgICAgdmFyIGNoOiBzdHJpbmc7XG4gICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT0gJz8nKSB7XG4gICAgICAgIGlzT3B0aW9uYWwgPSB0cnVlO1xuICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMSk7XG4gICAgICB9XG4gICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT0gJ14nKSB7XG4gICAgICAgIHNlYXJjaFBhcmVudHMgPSB0cnVlO1xuICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMSk7XG4gICAgICB9XG4gICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT0gJ14nKSB7XG4gICAgICAgIHN0YXJ0UGFyZW50ID0gdHJ1ZTtcbiAgICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKDEpO1xuICAgICAgfVxuXG4gICAgICB2YXIga2V5ID0gY29udHJvbGxlcktleShuYW1lKTtcbiAgICAgIGlmIChzdGFydFBhcmVudCkgJGVsZW1lbnQgPSAkZWxlbWVudC5wYXJlbnQoKTtcbiAgICAgIHZhciBkZXAgPSBzZWFyY2hQYXJlbnRzID8gJGVsZW1lbnQuaW5oZXJpdGVkRGF0YShrZXkpIDogJGVsZW1lbnQuZGF0YShrZXkpO1xuICAgICAgaWYgKCFkZXAgJiYgIWlzT3B0aW9uYWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4gbm90IGxvY2F0ZSAnJHtyZXF1aXJlfScgaW4gJyR7dGhpcy5kaXJlY3RpdmUubmFtZX0nLmApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlcDtcbiAgICB9IGVsc2UgaWYgKHJlcXVpcmUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdmFyIGRlcHMgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVxdWlyZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBkZXBzLnB1c2godGhpcy5yZXNvbHZlUmVxdWlyZWQoJGVsZW1lbnQsIHJlcXVpcmVbaV0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkZXBzO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBEaXJlY3RpdmUgJyR7dGhpcy5kaXJlY3RpdmUubmFtZX0nIHJlcXVpcmUgc3ludGF4IHVucmVjb2duaXplZDogJHt0aGlzLmRpcmVjdGl2ZS5yZXF1aXJlfWApO1xuICB9XG59XG4iXX0=