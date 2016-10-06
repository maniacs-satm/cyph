/* */ 
"format cjs";
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/common/testing'), require('@angular/core'), require('./router.umd')) : typeof define === 'function' && define.amd ? define(['exports', '@angular/common', '@angular/common/testing', '@angular/core', '@angular/router'], factory) : (factory((global.ng = global.ng || {}, global.ng.router = global.ng.router || {}, global.ng.router.testing = global.ng.router.testing || {}), global.ng.common, global.ng.common.testing, global.ng.core, global.ng.router));
}(this, function(exports, _angular_common, _angular_common_testing, _angular_core, _angular_router) {
  'use strict';
  var ROUTER_PROVIDERS = _angular_router.__router_private__.ROUTER_PROVIDERS;
  var ROUTES = _angular_router.__router_private__.ROUTES;
  var flatten = _angular_router.__router_private__.flatten;
  var SpyNgModuleFactoryLoader = (function() {
    function SpyNgModuleFactoryLoader(compiler) {
      this.compiler = compiler;
      this.stubbedModules = {};
    }
    SpyNgModuleFactoryLoader.prototype.load = function(path) {
      if (this.stubbedModules[path]) {
        return this.compiler.compileModuleAsync(this.stubbedModules[path]);
      } else {
        return Promise.reject(new Error("Cannot find module " + path));
      }
    };
    SpyNgModuleFactoryLoader.decorators = [{type: _angular_core.Injectable}];
    SpyNgModuleFactoryLoader.ctorParameters = [{type: _angular_core.Compiler}];
    return SpyNgModuleFactoryLoader;
  }());
  function setupTestingRouter(urlSerializer, outletMap, location, loader, compiler, injector, routes) {
    return new _angular_router.Router(null, urlSerializer, outletMap, location, injector, loader, compiler, flatten(routes));
  }
  var RouterTestingModule = (function() {
    function RouterTestingModule() {}
    RouterTestingModule.withRoutes = function(routes) {
      return {
        ngModule: RouterTestingModule,
        providers: [_angular_router.provideRoutes(routes)]
      };
    };
    RouterTestingModule.decorators = [{
      type: _angular_core.NgModule,
      args: [{
        exports: [_angular_router.RouterModule],
        providers: [ROUTER_PROVIDERS, {
          provide: _angular_common.Location,
          useClass: _angular_common_testing.SpyLocation
        }, {
          provide: _angular_common.LocationStrategy,
          useClass: _angular_common_testing.MockLocationStrategy
        }, {
          provide: _angular_core.NgModuleFactoryLoader,
          useClass: SpyNgModuleFactoryLoader
        }, {
          provide: _angular_router.Router,
          useFactory: setupTestingRouter,
          deps: [_angular_router.UrlSerializer, _angular_router.RouterOutletMap, _angular_common.Location, _angular_core.NgModuleFactoryLoader, _angular_core.Compiler, _angular_core.Injector, ROUTES]
        }, _angular_router.provideRoutes([])]
      }]
    }];
    RouterTestingModule.ctorParameters = [];
    return RouterTestingModule;
  }());
  exports.SpyNgModuleFactoryLoader = SpyNgModuleFactoryLoader;
  exports.setupTestingRouter = setupTestingRouter;
  exports.RouterTestingModule = RouterTestingModule;
}));
