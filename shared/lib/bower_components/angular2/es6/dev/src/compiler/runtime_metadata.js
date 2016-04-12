var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { resolveForwardRef } from 'angular2/src/core/di';
import { Type, isBlank, isPresent, isArray, stringify } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import * as cpl from './directive_metadata';
import * as md from 'angular2/src/core/metadata/directives';
import { DirectiveResolver } from 'angular2/src/core/linker/directive_resolver';
import { PipeResolver } from 'angular2/src/core/linker/pipe_resolver';
import { ViewResolver } from 'angular2/src/core/linker/view_resolver';
import { hasLifecycleHook } from 'angular2/src/core/linker/directive_lifecycle_reflector';
import { LIFECYCLE_HOOKS_VALUES } from 'angular2/src/core/linker/interfaces';
import { reflector } from 'angular2/src/core/reflection/reflection';
import { Injectable, Inject, Optional } from 'angular2/src/core/di';
import { PLATFORM_DIRECTIVES, PLATFORM_PIPES } from 'angular2/src/core/platform_directives_and_pipes';
import { MODULE_SUFFIX } from './util';
import { assertArrayOfStrings } from './assertions';
import { getUrlScheme } from 'angular2/src/compiler/url_resolver';
export let RuntimeMetadataResolver = class {
    constructor(_directiveResolver, _pipeResolver, _viewResolver, _platformDirectives, _platformPipes) {
        this._directiveResolver = _directiveResolver;
        this._pipeResolver = _pipeResolver;
        this._viewResolver = _viewResolver;
        this._platformDirectives = _platformDirectives;
        this._platformPipes = _platformPipes;
        this._directiveCache = new Map();
        this._pipeCache = new Map();
        this._anonymousTypes = new Map();
        this._anonymousTypeIndex = 0;
    }
    /**
     * Wrap the stringify method to avoid naming things `function (arg1...) {`
     */
    sanitizeName(obj) {
        let result = stringify(obj);
        if (result.indexOf('(') < 0) {
            return result;
        }
        let found = this._anonymousTypes.get(obj);
        if (!found) {
            this._anonymousTypes.set(obj, this._anonymousTypeIndex++);
            found = this._anonymousTypes.get(obj);
        }
        return `anonymous_type_${found}_`;
    }
    getDirectiveMetadata(directiveType) {
        var meta = this._directiveCache.get(directiveType);
        if (isBlank(meta)) {
            var dirMeta = this._directiveResolver.resolve(directiveType);
            var moduleUrl = null;
            var templateMeta = null;
            var changeDetectionStrategy = null;
            if (dirMeta instanceof md.ComponentMetadata) {
                assertArrayOfStrings('styles', dirMeta.styles);
                var cmpMeta = dirMeta;
                moduleUrl = calcModuleUrl(directiveType, cmpMeta);
                var viewMeta = this._viewResolver.resolve(directiveType);
                assertArrayOfStrings('styles', viewMeta.styles);
                templateMeta = new cpl.CompileTemplateMetadata({
                    encapsulation: viewMeta.encapsulation,
                    template: viewMeta.template,
                    templateUrl: viewMeta.templateUrl,
                    styles: viewMeta.styles,
                    styleUrls: viewMeta.styleUrls
                });
                changeDetectionStrategy = cmpMeta.changeDetection;
            }
            meta = cpl.CompileDirectiveMetadata.create({
                selector: dirMeta.selector,
                exportAs: dirMeta.exportAs,
                isComponent: isPresent(templateMeta),
                dynamicLoadable: true,
                type: new cpl.CompileTypeMetadata({ name: this.sanitizeName(directiveType), moduleUrl: moduleUrl, runtime: directiveType }),
                template: templateMeta,
                changeDetection: changeDetectionStrategy,
                inputs: dirMeta.inputs,
                outputs: dirMeta.outputs,
                host: dirMeta.host,
                lifecycleHooks: LIFECYCLE_HOOKS_VALUES.filter(hook => hasLifecycleHook(hook, directiveType))
            });
            this._directiveCache.set(directiveType, meta);
        }
        return meta;
    }
    getPipeMetadata(pipeType) {
        var meta = this._pipeCache.get(pipeType);
        if (isBlank(meta)) {
            var pipeMeta = this._pipeResolver.resolve(pipeType);
            var moduleUrl = reflector.importUri(pipeType);
            meta = new cpl.CompilePipeMetadata({
                type: new cpl.CompileTypeMetadata({ name: this.sanitizeName(pipeType), moduleUrl: moduleUrl, runtime: pipeType }),
                name: pipeMeta.name,
                pure: pipeMeta.pure
            });
            this._pipeCache.set(pipeType, meta);
        }
        return meta;
    }
    getViewDirectivesMetadata(component) {
        var view = this._viewResolver.resolve(component);
        var directives = flattenDirectives(view, this._platformDirectives);
        for (var i = 0; i < directives.length; i++) {
            if (!isValidType(directives[i])) {
                throw new BaseException(`Unexpected directive value '${stringify(directives[i])}' on the View of component '${stringify(component)}'`);
            }
        }
        return directives.map(type => this.getDirectiveMetadata(type));
    }
    getViewPipesMetadata(component) {
        var view = this._viewResolver.resolve(component);
        var pipes = flattenPipes(view, this._platformPipes);
        for (var i = 0; i < pipes.length; i++) {
            if (!isValidType(pipes[i])) {
                throw new BaseException(`Unexpected piped value '${stringify(pipes[i])}' on the View of component '${stringify(component)}'`);
            }
        }
        return pipes.map(type => this.getPipeMetadata(type));
    }
};
RuntimeMetadataResolver = __decorate([
    Injectable(),
    __param(3, Optional()),
    __param(3, Inject(PLATFORM_DIRECTIVES)),
    __param(4, Optional()),
    __param(4, Inject(PLATFORM_PIPES)), 
    __metadata('design:paramtypes', [DirectiveResolver, PipeResolver, ViewResolver, Array, Array])
], RuntimeMetadataResolver);
function flattenDirectives(view, platformDirectives) {
    let directives = [];
    if (isPresent(platformDirectives)) {
        flattenArray(platformDirectives, directives);
    }
    if (isPresent(view.directives)) {
        flattenArray(view.directives, directives);
    }
    return directives;
}
function flattenPipes(view, platformPipes) {
    let pipes = [];
    if (isPresent(platformPipes)) {
        flattenArray(platformPipes, pipes);
    }
    if (isPresent(view.pipes)) {
        flattenArray(view.pipes, pipes);
    }
    return pipes;
}
function flattenArray(tree, out) {
    for (var i = 0; i < tree.length; i++) {
        var item = resolveForwardRef(tree[i]);
        if (isArray(item)) {
            flattenArray(item, out);
        }
        else {
            out.push(item);
        }
    }
}
function isValidType(value) {
    return isPresent(value) && (value instanceof Type);
}
function calcModuleUrl(type, cmpMetadata) {
    var moduleId = cmpMetadata.moduleId;
    if (isPresent(moduleId)) {
        var scheme = getUrlScheme(moduleId);
        return isPresent(scheme) && scheme.length > 0 ? moduleId :
            `package:${moduleId}${MODULE_SUFFIX}`;
    }
    else {
        return reflector.importUri(type);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZV9tZXRhZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtdzNEUmxYSmkudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci9ydW50aW1lX21ldGFkYXRhLnRzIl0sIm5hbWVzIjpbIlJ1bnRpbWVNZXRhZGF0YVJlc29sdmVyIiwiUnVudGltZU1ldGFkYXRhUmVzb2x2ZXIuY29uc3RydWN0b3IiLCJSdW50aW1lTWV0YWRhdGFSZXNvbHZlci5zYW5pdGl6ZU5hbWUiLCJSdW50aW1lTWV0YWRhdGFSZXNvbHZlci5nZXREaXJlY3RpdmVNZXRhZGF0YSIsIlJ1bnRpbWVNZXRhZGF0YVJlc29sdmVyLmdldFBpcGVNZXRhZGF0YSIsIlJ1bnRpbWVNZXRhZGF0YVJlc29sdmVyLmdldFZpZXdEaXJlY3RpdmVzTWV0YWRhdGEiLCJSdW50aW1lTWV0YWRhdGFSZXNvbHZlci5nZXRWaWV3UGlwZXNNZXRhZGF0YSIsImZsYXR0ZW5EaXJlY3RpdmVzIiwiZmxhdHRlblBpcGVzIiwiZmxhdHRlbkFycmF5IiwiaXNWYWxpZFR5cGUiLCJjYWxjTW9kdWxlVXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7T0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sc0JBQXNCO09BQy9DLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsTUFBTSwwQkFBMEI7T0FDN0YsRUFBQyxhQUFhLEVBQUMsTUFBTSxnQ0FBZ0M7T0FDckQsS0FBSyxHQUFHLE1BQU0sc0JBQXNCO09BQ3BDLEtBQUssRUFBRSxNQUFNLHVDQUF1QztPQUNwRCxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNkNBQTZDO09BQ3RFLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0NBQXdDO09BQzVELEVBQUMsWUFBWSxFQUFDLE1BQU0sd0NBQXdDO09BRTVELEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSx3REFBd0Q7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Q25DQSxDQUFDQTtBQUNIQSxDQUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cmVzb2x2ZUZvcndhcmRSZWZ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7VHlwZSwgaXNCbGFuaywgaXNQcmVzZW50LCBpc0FycmF5LCBzdHJpbmdpZnksIFJlZ0V4cFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQgKiBhcyBjcGwgZnJvbSAnLi9kaXJlY3RpdmVfbWV0YWRhdGEnO1xuaW1wb3J0ICogYXMgbWQgZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGEvZGlyZWN0aXZlcyc7XG5pbXBvcnQge0RpcmVjdGl2ZVJlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvZGlyZWN0aXZlX3Jlc29sdmVyJztcbmltcG9ydCB7UGlwZVJlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvcGlwZV9yZXNvbHZlcic7XG5pbXBvcnQge1ZpZXdSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3ZpZXdfcmVzb2x2ZXInO1xuaW1wb3J0IHtWaWV3TWV0YWRhdGF9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL21ldGFkYXRhL3ZpZXcnO1xuaW1wb3J0IHtoYXNMaWZlY3ljbGVIb29rfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvZGlyZWN0aXZlX2xpZmVjeWNsZV9yZWZsZWN0b3InO1xuaW1wb3J0IHtMaWZlY3ljbGVIb29rcywgTElGRUNZQ0xFX0hPT0tTX1ZBTFVFU30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtyZWZsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7XG5pbXBvcnQge0luamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWx9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7UExBVEZPUk1fRElSRUNUSVZFUywgUExBVEZPUk1fUElQRVN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3BsYXRmb3JtX2RpcmVjdGl2ZXNfYW5kX3BpcGVzJztcbmltcG9ydCB7TU9EVUxFX1NVRkZJWH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7YXNzZXJ0QXJyYXlPZlN0cmluZ3N9IGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5pbXBvcnQge2dldFVybFNjaGVtZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3VybF9yZXNvbHZlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSdW50aW1lTWV0YWRhdGFSZXNvbHZlciB7XG4gIHByaXZhdGUgX2RpcmVjdGl2ZUNhY2hlID0gbmV3IE1hcDxUeXBlLCBjcGwuQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhPigpO1xuICBwcml2YXRlIF9waXBlQ2FjaGUgPSBuZXcgTWFwPFR5cGUsIGNwbC5Db21waWxlUGlwZU1ldGFkYXRhPigpO1xuICBwcml2YXRlIF9hbm9ueW1vdXNUeXBlcyA9IG5ldyBNYXA8T2JqZWN0LCBudW1iZXI+KCk7XG4gIHByaXZhdGUgX2Fub255bW91c1R5cGVJbmRleCA9IDA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9kaXJlY3RpdmVSZXNvbHZlcjogRGlyZWN0aXZlUmVzb2x2ZXIsIHByaXZhdGUgX3BpcGVSZXNvbHZlcjogUGlwZVJlc29sdmVyLFxuICAgICAgcHJpdmF0ZSBfdmlld1Jlc29sdmVyOiBWaWV3UmVzb2x2ZXIsXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFBMQVRGT1JNX0RJUkVDVElWRVMpIHByaXZhdGUgX3BsYXRmb3JtRGlyZWN0aXZlczogVHlwZVtdLFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChQTEFURk9STV9QSVBFUykgcHJpdmF0ZSBfcGxhdGZvcm1QaXBlczogVHlwZVtdKSB7fVxuXG4gIC8qKlxuICAgKiBXcmFwIHRoZSBzdHJpbmdpZnkgbWV0aG9kIHRvIGF2b2lkIG5hbWluZyB0aGluZ3MgYGZ1bmN0aW9uIChhcmcxLi4uKSB7YFxuICAgKi9cbiAgcHJpdmF0ZSBzYW5pdGl6ZU5hbWUob2JqOiBhbnkpOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQgPSBzdHJpbmdpZnkob2JqKTtcbiAgICBpZiAocmVzdWx0LmluZGV4T2YoJygnKSA8IDApIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGxldCBmb3VuZCA9IHRoaXMuX2Fub255bW91c1R5cGVzLmdldChvYmopO1xuICAgIGlmICghZm91bmQpIHtcbiAgICAgIHRoaXMuX2Fub255bW91c1R5cGVzLnNldChvYmosIHRoaXMuX2Fub255bW91c1R5cGVJbmRleCsrKTtcbiAgICAgIGZvdW5kID0gdGhpcy5fYW5vbnltb3VzVHlwZXMuZ2V0KG9iaik7XG4gICAgfVxuICAgIHJldHVybiBgYW5vbnltb3VzX3R5cGVfJHtmb3VuZH1fYDtcbiAgfVxuXG4gIGdldERpcmVjdGl2ZU1ldGFkYXRhKGRpcmVjdGl2ZVR5cGU6IFR5cGUpOiBjcGwuQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhIHtcbiAgICB2YXIgbWV0YSA9IHRoaXMuX2RpcmVjdGl2ZUNhY2hlLmdldChkaXJlY3RpdmVUeXBlKTtcbiAgICBpZiAoaXNCbGFuayhtZXRhKSkge1xuICAgICAgdmFyIGRpck1ldGEgPSB0aGlzLl9kaXJlY3RpdmVSZXNvbHZlci5yZXNvbHZlKGRpcmVjdGl2ZVR5cGUpO1xuICAgICAgdmFyIG1vZHVsZVVybCA9IG51bGw7XG4gICAgICB2YXIgdGVtcGxhdGVNZXRhID0gbnVsbDtcbiAgICAgIHZhciBjaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSA9IG51bGw7XG5cbiAgICAgIGlmIChkaXJNZXRhIGluc3RhbmNlb2YgbWQuQ29tcG9uZW50TWV0YWRhdGEpIHtcbiAgICAgICAgYXNzZXJ0QXJyYXlPZlN0cmluZ3MoJ3N0eWxlcycsIGRpck1ldGEuc3R5bGVzKTtcbiAgICAgICAgdmFyIGNtcE1ldGEgPSA8bWQuQ29tcG9uZW50TWV0YWRhdGE+ZGlyTWV0YTtcbiAgICAgICAgbW9kdWxlVXJsID0gY2FsY01vZHVsZVVybChkaXJlY3RpdmVUeXBlLCBjbXBNZXRhKTtcbiAgICAgICAgdmFyIHZpZXdNZXRhID0gdGhpcy5fdmlld1Jlc29sdmVyLnJlc29sdmUoZGlyZWN0aXZlVHlwZSk7XG4gICAgICAgIGFzc2VydEFycmF5T2ZTdHJpbmdzKCdzdHlsZXMnLCB2aWV3TWV0YS5zdHlsZXMpO1xuICAgICAgICB0ZW1wbGF0ZU1ldGEgPSBuZXcgY3BsLkNvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhKHtcbiAgICAgICAgICBlbmNhcHN1bGF0aW9uOiB2aWV3TWV0YS5lbmNhcHN1bGF0aW9uLFxuICAgICAgICAgIHRlbXBsYXRlOiB2aWV3TWV0YS50ZW1wbGF0ZSxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogdmlld01ldGEudGVtcGxhdGVVcmwsXG4gICAgICAgICAgc3R5bGVzOiB2aWV3TWV0YS5zdHlsZXMsXG4gICAgICAgICAgc3R5bGVVcmxzOiB2aWV3TWV0YS5zdHlsZVVybHNcbiAgICAgICAgfSk7XG4gICAgICAgIGNoYW5nZURldGVjdGlvblN0cmF0ZWd5ID0gY21wTWV0YS5jaGFuZ2VEZXRlY3Rpb247XG4gICAgICB9XG4gICAgICBtZXRhID0gY3BsLkNvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YS5jcmVhdGUoe1xuICAgICAgICBzZWxlY3RvcjogZGlyTWV0YS5zZWxlY3RvcixcbiAgICAgICAgZXhwb3J0QXM6IGRpck1ldGEuZXhwb3J0QXMsXG4gICAgICAgIGlzQ29tcG9uZW50OiBpc1ByZXNlbnQodGVtcGxhdGVNZXRhKSxcbiAgICAgICAgZHluYW1pY0xvYWRhYmxlOiB0cnVlLFxuICAgICAgICB0eXBlOiBuZXcgY3BsLkNvbXBpbGVUeXBlTWV0YWRhdGEoXG4gICAgICAgICAgICB7bmFtZTogdGhpcy5zYW5pdGl6ZU5hbWUoZGlyZWN0aXZlVHlwZSksIG1vZHVsZVVybDogbW9kdWxlVXJsLCBydW50aW1lOiBkaXJlY3RpdmVUeXBlfSksXG4gICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZU1ldGEsXG4gICAgICAgIGNoYW5nZURldGVjdGlvbjogY2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgICAgIGlucHV0czogZGlyTWV0YS5pbnB1dHMsXG4gICAgICAgIG91dHB1dHM6IGRpck1ldGEub3V0cHV0cyxcbiAgICAgICAgaG9zdDogZGlyTWV0YS5ob3N0LFxuICAgICAgICBsaWZlY3ljbGVIb29rczogTElGRUNZQ0xFX0hPT0tTX1ZBTFVFUy5maWx0ZXIoaG9vayA9PiBoYXNMaWZlY3ljbGVIb29rKGhvb2ssIGRpcmVjdGl2ZVR5cGUpKVxuICAgICAgfSk7XG4gICAgICB0aGlzLl9kaXJlY3RpdmVDYWNoZS5zZXQoZGlyZWN0aXZlVHlwZSwgbWV0YSk7XG4gICAgfVxuICAgIHJldHVybiBtZXRhO1xuICB9XG5cbiAgZ2V0UGlwZU1ldGFkYXRhKHBpcGVUeXBlOiBUeXBlKTogY3BsLkNvbXBpbGVQaXBlTWV0YWRhdGEge1xuICAgIHZhciBtZXRhID0gdGhpcy5fcGlwZUNhY2hlLmdldChwaXBlVHlwZSk7XG4gICAgaWYgKGlzQmxhbmsobWV0YSkpIHtcbiAgICAgIHZhciBwaXBlTWV0YSA9IHRoaXMuX3BpcGVSZXNvbHZlci5yZXNvbHZlKHBpcGVUeXBlKTtcbiAgICAgIHZhciBtb2R1bGVVcmwgPSByZWZsZWN0b3IuaW1wb3J0VXJpKHBpcGVUeXBlKTtcbiAgICAgIG1ldGEgPSBuZXcgY3BsLkNvbXBpbGVQaXBlTWV0YWRhdGEoe1xuICAgICAgICB0eXBlOiBuZXcgY3BsLkNvbXBpbGVUeXBlTWV0YWRhdGEoXG4gICAgICAgICAgICB7bmFtZTogdGhpcy5zYW5pdGl6ZU5hbWUocGlwZVR5cGUpLCBtb2R1bGVVcmw6IG1vZHVsZVVybCwgcnVudGltZTogcGlwZVR5cGV9KSxcbiAgICAgICAgbmFtZTogcGlwZU1ldGEubmFtZSxcbiAgICAgICAgcHVyZTogcGlwZU1ldGEucHVyZVxuICAgICAgfSk7XG4gICAgICB0aGlzLl9waXBlQ2FjaGUuc2V0KHBpcGVUeXBlLCBtZXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIG1ldGE7XG4gIH1cblxuICBnZXRWaWV3RGlyZWN0aXZlc01ldGFkYXRhKGNvbXBvbmVudDogVHlwZSk6IGNwbC5Db21waWxlRGlyZWN0aXZlTWV0YWRhdGFbXSB7XG4gICAgdmFyIHZpZXcgPSB0aGlzLl92aWV3UmVzb2x2ZXIucmVzb2x2ZShjb21wb25lbnQpO1xuICAgIHZhciBkaXJlY3RpdmVzID0gZmxhdHRlbkRpcmVjdGl2ZXModmlldywgdGhpcy5fcGxhdGZvcm1EaXJlY3RpdmVzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpcmVjdGl2ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghaXNWYWxpZFR5cGUoZGlyZWN0aXZlc1tpXSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgICBgVW5leHBlY3RlZCBkaXJlY3RpdmUgdmFsdWUgJyR7c3RyaW5naWZ5KGRpcmVjdGl2ZXNbaV0pfScgb24gdGhlIFZpZXcgb2YgY29tcG9uZW50ICcke3N0cmluZ2lmeShjb21wb25lbnQpfSdgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0aXZlcy5tYXAodHlwZSA9PiB0aGlzLmdldERpcmVjdGl2ZU1ldGFkYXRhKHR5cGUpKTtcbiAgfVxuXG4gIGdldFZpZXdQaXBlc01ldGFkYXRhKGNvbXBvbmVudDogVHlwZSk6IGNwbC5Db21waWxlUGlwZU1ldGFkYXRhW10ge1xuICAgIHZhciB2aWV3ID0gdGhpcy5fdmlld1Jlc29sdmVyLnJlc29sdmUoY29tcG9uZW50KTtcbiAgICB2YXIgcGlwZXMgPSBmbGF0dGVuUGlwZXModmlldywgdGhpcy5fcGxhdGZvcm1QaXBlcyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwaXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFpc1ZhbGlkVHlwZShwaXBlc1tpXSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgICBgVW5leHBlY3RlZCBwaXBlZCB2YWx1ZSAnJHtzdHJpbmdpZnkocGlwZXNbaV0pfScgb24gdGhlIFZpZXcgb2YgY29tcG9uZW50ICcke3N0cmluZ2lmeShjb21wb25lbnQpfSdgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBpcGVzLm1hcCh0eXBlID0+IHRoaXMuZ2V0UGlwZU1ldGFkYXRhKHR5cGUpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmbGF0dGVuRGlyZWN0aXZlcyh2aWV3OiBWaWV3TWV0YWRhdGEsIHBsYXRmb3JtRGlyZWN0aXZlczogYW55W10pOiBUeXBlW10ge1xuICBsZXQgZGlyZWN0aXZlcyA9IFtdO1xuICBpZiAoaXNQcmVzZW50KHBsYXRmb3JtRGlyZWN0aXZlcykpIHtcbiAgICBmbGF0dGVuQXJyYXkocGxhdGZvcm1EaXJlY3RpdmVzLCBkaXJlY3RpdmVzKTtcbiAgfVxuICBpZiAoaXNQcmVzZW50KHZpZXcuZGlyZWN0aXZlcykpIHtcbiAgICBmbGF0dGVuQXJyYXkodmlldy5kaXJlY3RpdmVzLCBkaXJlY3RpdmVzKTtcbiAgfVxuICByZXR1cm4gZGlyZWN0aXZlcztcbn1cblxuZnVuY3Rpb24gZmxhdHRlblBpcGVzKHZpZXc6IFZpZXdNZXRhZGF0YSwgcGxhdGZvcm1QaXBlczogYW55W10pOiBUeXBlW10ge1xuICBsZXQgcGlwZXMgPSBbXTtcbiAgaWYgKGlzUHJlc2VudChwbGF0Zm9ybVBpcGVzKSkge1xuICAgIGZsYXR0ZW5BcnJheShwbGF0Zm9ybVBpcGVzLCBwaXBlcyk7XG4gIH1cbiAgaWYgKGlzUHJlc2VudCh2aWV3LnBpcGVzKSkge1xuICAgIGZsYXR0ZW5BcnJheSh2aWV3LnBpcGVzLCBwaXBlcyk7XG4gIH1cbiAgcmV0dXJuIHBpcGVzO1xufVxuXG5mdW5jdGlvbiBmbGF0dGVuQXJyYXkodHJlZTogYW55W10sIG91dDogQXJyYXk8VHlwZXxhbnlbXT4pOiB2b2lkIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmVlLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSByZXNvbHZlRm9yd2FyZFJlZih0cmVlW2ldKTtcbiAgICBpZiAoaXNBcnJheShpdGVtKSkge1xuICAgICAgZmxhdHRlbkFycmF5KGl0ZW0sIG91dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpc1ZhbGlkVHlwZSh2YWx1ZTogVHlwZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gaXNQcmVzZW50KHZhbHVlKSAmJiAodmFsdWUgaW5zdGFuY2VvZiBUeXBlKTtcbn1cblxuZnVuY3Rpb24gY2FsY01vZHVsZVVybCh0eXBlOiBUeXBlLCBjbXBNZXRhZGF0YTogbWQuQ29tcG9uZW50TWV0YWRhdGEpOiBzdHJpbmcge1xuICB2YXIgbW9kdWxlSWQgPSBjbXBNZXRhZGF0YS5tb2R1bGVJZDtcbiAgaWYgKGlzUHJlc2VudChtb2R1bGVJZCkpIHtcbiAgICB2YXIgc2NoZW1lID0gZ2V0VXJsU2NoZW1lKG1vZHVsZUlkKTtcbiAgICByZXR1cm4gaXNQcmVzZW50KHNjaGVtZSkgJiYgc2NoZW1lLmxlbmd0aCA+IDAgPyBtb2R1bGVJZCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYHBhY2thZ2U6JHttb2R1bGVJZH0ke01PRFVMRV9TVUZGSVh9YDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVmbGVjdG9yLmltcG9ydFVyaSh0eXBlKTtcbiAgfVxufVxuIl19