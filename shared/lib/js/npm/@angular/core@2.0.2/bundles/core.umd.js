/* */ 
"format cjs";
(function(process) {
  (function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/Subject'), require('rxjs/Observable')) : typeof define === 'function' && define.amd ? define(['exports', 'rxjs/Subject', 'rxjs/Observable'], factory) : (factory((global.ng = global.ng || {}, global.ng.core = global.ng.core || {}), global.Rx, global.Rx));
  }(this, function(exports, rxjs_Subject, rxjs_Observable) {
    'use strict';
    var globalScope;
    if (typeof window === 'undefined') {
      if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        globalScope = self;
      } else {
        globalScope = global;
      }
    } else {
      globalScope = window;
    }
    function scheduleMicroTask(fn) {
      Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
    }
    var global$1 = globalScope;
    function getTypeNameForDebugging(type) {
      return type['name'] || typeof type;
    }
    global$1.assert = function assert(condition) {};
    function isPresent(obj) {
      return obj !== undefined && obj !== null;
    }
    function isBlank(obj) {
      return obj === undefined || obj === null;
    }
    function isString(obj) {
      return typeof obj === 'string';
    }
    function isFunction(obj) {
      return typeof obj === 'function';
    }
    function isArray(obj) {
      return Array.isArray(obj);
    }
    function stringify(token) {
      if (typeof token === 'string') {
        return token;
      }
      if (token === undefined || token === null) {
        return '' + token;
      }
      if (token.overriddenName) {
        return token.overriddenName;
      }
      if (token.name) {
        return token.name;
      }
      var res = token.toString();
      var newLineIndex = res.indexOf('\n');
      return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
    }
    var StringWrapper = (function() {
      function StringWrapper() {}
      StringWrapper.fromCharCode = function(code) {
        return String.fromCharCode(code);
      };
      StringWrapper.charCodeAt = function(s, index) {
        return s.charCodeAt(index);
      };
      StringWrapper.split = function(s, regExp) {
        return s.split(regExp);
      };
      StringWrapper.equals = function(s, s2) {
        return s === s2;
      };
      StringWrapper.stripLeft = function(s, charVal) {
        if (s && s.length) {
          var pos = 0;
          for (var i = 0; i < s.length; i++) {
            if (s[i] != charVal)
              break;
            pos++;
          }
          s = s.substring(pos);
        }
        return s;
      };
      StringWrapper.stripRight = function(s, charVal) {
        if (s && s.length) {
          var pos = s.length;
          for (var i = s.length - 1; i >= 0; i--) {
            if (s[i] != charVal)
              break;
            pos--;
          }
          s = s.substring(0, pos);
        }
        return s;
      };
      StringWrapper.replace = function(s, from, replace) {
        return s.replace(from, replace);
      };
      StringWrapper.replaceAll = function(s, from, replace) {
        return s.replace(from, replace);
      };
      StringWrapper.slice = function(s, from, to) {
        if (from === void 0) {
          from = 0;
        }
        if (to === void 0) {
          to = null;
        }
        return s.slice(from, to === null ? undefined : to);
      };
      StringWrapper.replaceAllMapped = function(s, from, cb) {
        return s.replace(from, function() {
          var matches = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            matches[_i - 0] = arguments[_i];
          }
          matches.splice(-2, 2);
          return cb(matches);
        });
      };
      StringWrapper.contains = function(s, substr) {
        return s.indexOf(substr) != -1;
      };
      StringWrapper.compare = function(a, b) {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      };
      return StringWrapper;
    }());
    var NumberWrapper = (function() {
      function NumberWrapper() {}
      NumberWrapper.toFixed = function(n, fractionDigits) {
        return n.toFixed(fractionDigits);
      };
      NumberWrapper.equal = function(a, b) {
        return a === b;
      };
      NumberWrapper.parseIntAutoRadix = function(text) {
        var result = parseInt(text);
        if (isNaN(result)) {
          throw new Error('Invalid integer literal when parsing ' + text);
        }
        return result;
      };
      NumberWrapper.parseInt = function(text, radix) {
        if (radix == 10) {
          if (/^(\-|\+)?[0-9]+$/.test(text)) {
            return parseInt(text, radix);
          }
        } else if (radix == 16) {
          if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
            return parseInt(text, radix);
          }
        } else {
          var result = parseInt(text, radix);
          if (!isNaN(result)) {
            return result;
          }
        }
        throw new Error('Invalid integer literal when parsing ' + text + ' in base ' + radix);
      };
      Object.defineProperty(NumberWrapper, "NaN", {
        get: function() {
          return NaN;
        },
        enumerable: true,
        configurable: true
      });
      NumberWrapper.isNumeric = function(value) {
        return !isNaN(value - parseFloat(value));
      };
      NumberWrapper.isNaN = function(value) {
        return isNaN(value);
      };
      NumberWrapper.isInteger = function(value) {
        return Number.isInteger(value);
      };
      return NumberWrapper;
    }());
    function looseIdentical(a, b) {
      return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
    }
    function getMapKey(value) {
      return value;
    }
    function isJsObject(o) {
      return o !== null && (typeof o === 'function' || typeof o === 'object');
    }
    function print(obj) {
      console.log(obj);
    }
    function warn(obj) {
      console.warn(obj);
    }
    var _symbolIterator = null;
    function getSymbolIterator() {
      if (isBlank(_symbolIterator)) {
        if (isPresent(globalScope.Symbol) && isPresent(Symbol.iterator)) {
          _symbolIterator = Symbol.iterator;
        } else {
          var keys = Object.getOwnPropertyNames(Map.prototype);
          for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (key !== 'entries' && key !== 'size' && Map.prototype[key] === Map.prototype['entries']) {
              _symbolIterator = key;
            }
          }
        }
      }
      return _symbolIterator;
    }
    function isPrimitive(obj) {
      return !isJsObject(obj);
    }
    var _nextClassId = 0;
    function extractAnnotation(annotation) {
      if (isFunction(annotation) && annotation.hasOwnProperty('annotation')) {
        annotation = annotation.annotation;
      }
      return annotation;
    }
    function applyParams(fnOrArray, key) {
      if (fnOrArray === Object || fnOrArray === String || fnOrArray === Function || fnOrArray === Number || fnOrArray === Array) {
        throw new Error("Can not use native " + stringify(fnOrArray) + " as constructor");
      }
      if (isFunction(fnOrArray)) {
        return fnOrArray;
      } else if (fnOrArray instanceof Array) {
        var annotations = fnOrArray;
        var annoLength = annotations.length - 1;
        var fn = fnOrArray[annoLength];
        if (!isFunction(fn)) {
          throw new Error("Last position of Class method array must be Function in key " + key + " was '" + stringify(fn) + "'");
        }
        if (annoLength != fn.length) {
          throw new Error("Number of annotations (" + annoLength + ") does not match number of arguments (" + fn.length + ") in the function: " + stringify(fn));
        }
        var paramsAnnotations = [];
        for (var i = 0,
            ii = annotations.length - 1; i < ii; i++) {
          var paramAnnotations = [];
          paramsAnnotations.push(paramAnnotations);
          var annotation = annotations[i];
          if (annotation instanceof Array) {
            for (var j = 0; j < annotation.length; j++) {
              paramAnnotations.push(extractAnnotation(annotation[j]));
            }
          } else if (isFunction(annotation)) {
            paramAnnotations.push(extractAnnotation(annotation));
          } else {
            paramAnnotations.push(annotation);
          }
        }
        Reflect.defineMetadata('parameters', paramsAnnotations, fn);
        return fn;
      } else {
        throw new Error("Only Function or Array is supported in Class definition for key '" + key + "' is '" + stringify(fnOrArray) + "'");
      }
    }
    function Class(clsDef) {
      var constructor = applyParams(clsDef.hasOwnProperty('constructor') ? clsDef.constructor : undefined, 'constructor');
      var proto = constructor.prototype;
      if (clsDef.hasOwnProperty('extends')) {
        if (isFunction(clsDef.extends)) {
          constructor.prototype = proto = Object.create(clsDef.extends.prototype);
        } else {
          throw new Error("Class definition 'extends' property must be a constructor function was: " + stringify(clsDef.extends));
        }
      }
      for (var key in clsDef) {
        if (key != 'extends' && key != 'prototype' && clsDef.hasOwnProperty(key)) {
          proto[key] = applyParams(clsDef[key], key);
        }
      }
      if (this && this.annotations instanceof Array) {
        Reflect.defineMetadata('annotations', this.annotations, constructor);
      }
      var constructorName = constructor['name'];
      if (!constructorName || constructorName === 'constructor') {
        constructor['overriddenName'] = "class" + _nextClassId++;
      }
      return constructor;
    }
    var Reflect = global$1.Reflect;
    function makeDecorator(name, props, parentClass, chainFn) {
      if (chainFn === void 0) {
        chainFn = null;
      }
      var metaCtor = makeMetadataCtor([props]);
      function DecoratorFactory(objOrType) {
        if (!(Reflect && Reflect.getMetadata)) {
          throw 'reflect-metadata shim is required when using class decorators';
        }
        if (this instanceof DecoratorFactory) {
          metaCtor.call(this, objOrType);
          return this;
        } else {
          var annotationInstance_1 = new DecoratorFactory(objOrType);
          var chainAnnotation = isFunction(this) && this.annotations instanceof Array ? this.annotations : [];
          chainAnnotation.push(annotationInstance_1);
          var TypeDecorator = function TypeDecorator(cls) {
            var annotations = Reflect.getOwnMetadata('annotations', cls) || [];
            annotations.push(annotationInstance_1);
            Reflect.defineMetadata('annotations', annotations, cls);
            return cls;
          };
          TypeDecorator.annotations = chainAnnotation;
          TypeDecorator.Class = Class;
          if (chainFn)
            chainFn(TypeDecorator);
          return TypeDecorator;
        }
      }
      if (parentClass) {
        DecoratorFactory.prototype = Object.create(parentClass.prototype);
      }
      DecoratorFactory.prototype.toString = function() {
        return ("@" + name);
      };
      DecoratorFactory.annotationCls = DecoratorFactory;
      return DecoratorFactory;
    }
    function makeMetadataCtor(props) {
      function ctor() {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i - 0] = arguments[_i];
        }
        props.forEach(function(prop, i) {
          var argVal = args[i];
          if (Array.isArray(prop)) {
            var val = !argVal || argVal === undefined ? prop[1] : argVal;
            _this[prop[0]] = val;
          } else {
            for (var propName in prop) {
              var val = !argVal || argVal[propName] === undefined ? prop[propName] : argVal[propName];
              _this[propName] = val;
            }
          }
        });
      }
      return ctor;
    }
    function makeParamDecorator(name, props, parentClass) {
      var metaCtor = makeMetadataCtor(props);
      function ParamDecoratorFactory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i - 0] = arguments[_i];
        }
        if (this instanceof ParamDecoratorFactory) {
          metaCtor.apply(this, args);
          return this;
        }
        var annotationInstance = new ((_a = ParamDecoratorFactory).bind.apply(_a, [void 0].concat(args)))();
        ParamDecorator.annotation = annotationInstance;
        return ParamDecorator;
        function ParamDecorator(cls, unusedKey, index) {
          var parameters = Reflect.getMetadata('parameters', cls) || [];
          while (parameters.length <= index) {
            parameters.push(null);
          }
          parameters[index] = parameters[index] || [];
          var annotationsForParam = parameters[index];
          annotationsForParam.push(annotationInstance);
          Reflect.defineMetadata('parameters', parameters, cls);
          return cls;
        }
        var _a;
      }
      if (parentClass) {
        ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
      }
      ParamDecoratorFactory.prototype.toString = function() {
        return ("@" + name);
      };
      ParamDecoratorFactory.annotationCls = ParamDecoratorFactory;
      return ParamDecoratorFactory;
    }
    function makePropDecorator(name, props, parentClass) {
      var metaCtor = makeMetadataCtor(props);
      function PropDecoratorFactory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i - 0] = arguments[_i];
        }
        if (this instanceof PropDecoratorFactory) {
          metaCtor.apply(this, args);
          return this;
        } else {
          var decoratorInstance = new ((_a = PropDecoratorFactory).bind.apply(_a, [void 0].concat(args)))();
          return function PropDecorator(target, name) {
            var meta = Reflect.getOwnMetadata('propMetadata', target.constructor) || {};
            meta[name] = meta[name] || [];
            meta[name].unshift(decoratorInstance);
            Reflect.defineMetadata('propMetadata', meta, target.constructor);
          };
        }
        var _a;
      }
      if (parentClass) {
        PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
      }
      PropDecoratorFactory.prototype.toString = function() {
        return ("@" + name);
      };
      PropDecoratorFactory.annotationCls = PropDecoratorFactory;
      return PropDecoratorFactory;
    }
    var Inject = makeParamDecorator('Inject', [['token', undefined]]);
    var Optional = makeParamDecorator('Optional', []);
    var Injectable = makeParamDecorator('Injectable', []);
    var Self = makeParamDecorator('Self', []);
    var SkipSelf = makeParamDecorator('SkipSelf', []);
    var Host = makeParamDecorator('Host', []);
    var OpaqueToken = (function() {
      function OpaqueToken(_desc) {
        this._desc = _desc;
      }
      OpaqueToken.prototype.toString = function() {
        return "Token " + this._desc;
      };
      OpaqueToken.decorators = [{type: Injectable}];
      OpaqueToken.ctorParameters = [null];
      return OpaqueToken;
    }());
    var ANALYZE_FOR_ENTRY_COMPONENTS = new OpaqueToken('AnalyzeForEntryComponents');
    var Attribute = makeParamDecorator('Attribute', [['attributeName', undefined]]);
    var Query = (function() {
      function Query() {}
      return Query;
    }());
    var ContentChildren = makePropDecorator('ContentChildren', [['selector', undefined], {
      first: false,
      isViewQuery: false,
      descendants: false,
      read: undefined
    }], Query);
    var ContentChild = makePropDecorator('ContentChild', [['selector', undefined], {
      first: true,
      isViewQuery: false,
      descendants: true,
      read: undefined
    }], Query);
    var ViewChildren = makePropDecorator('ViewChildren', [['selector', undefined], {
      first: false,
      isViewQuery: true,
      descendants: true,
      read: undefined
    }], Query);
    var ViewChild = makePropDecorator('ViewChild', [['selector', undefined], {
      first: true,
      isViewQuery: true,
      descendants: true,
      read: undefined
    }], Query);
    exports.ChangeDetectionStrategy;
    (function(ChangeDetectionStrategy) {
      ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 0] = "OnPush";
      ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 1] = "Default";
    })(exports.ChangeDetectionStrategy || (exports.ChangeDetectionStrategy = {}));
    var ChangeDetectorStatus;
    (function(ChangeDetectorStatus) {
      ChangeDetectorStatus[ChangeDetectorStatus["CheckOnce"] = 0] = "CheckOnce";
      ChangeDetectorStatus[ChangeDetectorStatus["Checked"] = 1] = "Checked";
      ChangeDetectorStatus[ChangeDetectorStatus["CheckAlways"] = 2] = "CheckAlways";
      ChangeDetectorStatus[ChangeDetectorStatus["Detached"] = 3] = "Detached";
      ChangeDetectorStatus[ChangeDetectorStatus["Errored"] = 4] = "Errored";
      ChangeDetectorStatus[ChangeDetectorStatus["Destroyed"] = 5] = "Destroyed";
    })(ChangeDetectorStatus || (ChangeDetectorStatus = {}));
    function isDefaultChangeDetectionStrategy(changeDetectionStrategy) {
      return isBlank(changeDetectionStrategy) || changeDetectionStrategy === exports.ChangeDetectionStrategy.Default;
    }
    var Directive = makeDecorator('Directive', {
      selector: undefined,
      inputs: undefined,
      outputs: undefined,
      host: undefined,
      providers: undefined,
      exportAs: undefined,
      queries: undefined
    });
    var Component = makeDecorator('Component', {
      selector: undefined,
      inputs: undefined,
      outputs: undefined,
      host: undefined,
      exportAs: undefined,
      moduleId: undefined,
      providers: undefined,
      viewProviders: undefined,
      changeDetection: exports.ChangeDetectionStrategy.Default,
      queries: undefined,
      templateUrl: undefined,
      template: undefined,
      styleUrls: undefined,
      styles: undefined,
      animations: undefined,
      encapsulation: undefined,
      interpolation: undefined,
      entryComponents: undefined
    }, Directive);
    var Pipe = makeDecorator('Pipe', {
      name: undefined,
      pure: true
    });
    var Input = makePropDecorator('Input', [['bindingPropertyName', undefined]]);
    var Output = makePropDecorator('Output', [['bindingPropertyName', undefined]]);
    var HostBinding = makePropDecorator('HostBinding', [['hostPropertyName', undefined]]);
    var HostListener = makePropDecorator('HostListener', [['eventName', undefined], ['args', []]]);
    var LifecycleHooks;
    (function(LifecycleHooks) {
      LifecycleHooks[LifecycleHooks["OnInit"] = 0] = "OnInit";
      LifecycleHooks[LifecycleHooks["OnDestroy"] = 1] = "OnDestroy";
      LifecycleHooks[LifecycleHooks["DoCheck"] = 2] = "DoCheck";
      LifecycleHooks[LifecycleHooks["OnChanges"] = 3] = "OnChanges";
      LifecycleHooks[LifecycleHooks["AfterContentInit"] = 4] = "AfterContentInit";
      LifecycleHooks[LifecycleHooks["AfterContentChecked"] = 5] = "AfterContentChecked";
      LifecycleHooks[LifecycleHooks["AfterViewInit"] = 6] = "AfterViewInit";
      LifecycleHooks[LifecycleHooks["AfterViewChecked"] = 7] = "AfterViewChecked";
    })(LifecycleHooks || (LifecycleHooks = {}));
    var LIFECYCLE_HOOKS_VALUES = [LifecycleHooks.OnInit, LifecycleHooks.OnDestroy, LifecycleHooks.DoCheck, LifecycleHooks.OnChanges, LifecycleHooks.AfterContentInit, LifecycleHooks.AfterContentChecked, LifecycleHooks.AfterViewInit, LifecycleHooks.AfterViewChecked];
    var OnChanges = (function() {
      function OnChanges() {}
      return OnChanges;
    }());
    var OnInit = (function() {
      function OnInit() {}
      return OnInit;
    }());
    var DoCheck = (function() {
      function DoCheck() {}
      return DoCheck;
    }());
    var OnDestroy = (function() {
      function OnDestroy() {}
      return OnDestroy;
    }());
    var AfterContentInit = (function() {
      function AfterContentInit() {}
      return AfterContentInit;
    }());
    var AfterContentChecked = (function() {
      function AfterContentChecked() {}
      return AfterContentChecked;
    }());
    var AfterViewInit = (function() {
      function AfterViewInit() {}
      return AfterViewInit;
    }());
    var AfterViewChecked = (function() {
      function AfterViewChecked() {}
      return AfterViewChecked;
    }());
    var CUSTOM_ELEMENTS_SCHEMA = {name: 'custom-elements'};
    var NO_ERRORS_SCHEMA = {name: 'no-errors-schema'};
    var NgModule = makeDecorator('NgModule', {
      providers: undefined,
      declarations: undefined,
      imports: undefined,
      exports: undefined,
      entryComponents: undefined,
      bootstrap: undefined,
      schemas: undefined,
      id: undefined
    });
    exports.ViewEncapsulation;
    (function(ViewEncapsulation) {
      ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
      ViewEncapsulation[ViewEncapsulation["Native"] = 1] = "Native";
      ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
    })(exports.ViewEncapsulation || (exports.ViewEncapsulation = {}));
    var ViewMetadata = (function() {
      function ViewMetadata(_a) {
        var _b = _a === void 0 ? {} : _a,
            templateUrl = _b.templateUrl,
            template = _b.template,
            encapsulation = _b.encapsulation,
            styles = _b.styles,
            styleUrls = _b.styleUrls,
            animations = _b.animations,
            interpolation = _b.interpolation;
        this.templateUrl = templateUrl;
        this.template = template;
        this.styleUrls = styleUrls;
        this.styles = styles;
        this.encapsulation = encapsulation;
        this.animations = animations;
        this.interpolation = interpolation;
      }
      return ViewMetadata;
    }());
    function forwardRef(forwardRefFn) {
      forwardRefFn.__forward_ref__ = forwardRef;
      forwardRefFn.toString = function() {
        return stringify(this());
      };
      return forwardRefFn;
    }
    function resolveForwardRef(type) {
      if (isFunction(type) && type.hasOwnProperty('__forward_ref__') && type.__forward_ref__ === forwardRef) {
        return type();
      } else {
        return type;
      }
    }
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    function unimplemented() {
      throw new Error('unimplemented');
    }
    var BaseError = (function(_super) {
      __extends(BaseError, _super);
      function BaseError(message) {
        var nativeError = _super.call(this, message);
        this._nativeError = nativeError;
      }
      Object.defineProperty(BaseError.prototype, "message", {
        get: function() {
          return this._nativeError.message;
        },
        set: function(message) {
          this._nativeError.message = message;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(BaseError.prototype, "name", {
        get: function() {
          return this._nativeError.name;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(BaseError.prototype, "stack", {
        get: function() {
          return this._nativeError.stack;
        },
        set: function(value) {
          this._nativeError.stack = value;
        },
        enumerable: true,
        configurable: true
      });
      BaseError.prototype.toString = function() {
        return this._nativeError.toString();
      };
      return BaseError;
    }(Error));
    var WrappedError = (function(_super) {
      __extends(WrappedError, _super);
      function WrappedError(message, error) {
        _super.call(this, message + " caused by: " + (error instanceof Error ? error.message : error));
        this.originalError = error;
      }
      Object.defineProperty(WrappedError.prototype, "stack", {
        get: function() {
          return (this.originalError instanceof Error ? this.originalError : this._nativeError).stack;
        },
        enumerable: true,
        configurable: true
      });
      return WrappedError;
    }(BaseError));
    var _THROW_IF_NOT_FOUND = new Object();
    var THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
    var _NullInjector = (function() {
      function _NullInjector() {}
      _NullInjector.prototype.get = function(token, notFoundValue) {
        if (notFoundValue === void 0) {
          notFoundValue = _THROW_IF_NOT_FOUND;
        }
        if (notFoundValue === _THROW_IF_NOT_FOUND) {
          throw new Error("No provider for " + stringify(token) + "!");
        }
        return notFoundValue;
      };
      return _NullInjector;
    }());
    var Injector = (function() {
      function Injector() {}
      Injector.prototype.get = function(token, notFoundValue) {
        return unimplemented();
      };
      Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
      Injector.NULL = new _NullInjector();
      return Injector;
    }());
    var createMapFromPairs = (function() {
      try {
        if (new Map([[1, 2]]).size === 1) {
          return function createMapFromPairs(pairs) {
            return new Map(pairs);
          };
        }
      } catch (e) {}
      return function createMapAndPopulateFromPairs(pairs) {
        var map = new Map();
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i];
          map.set(pair[0], pair[1]);
        }
        return map;
      };
    })();
    var _clearValues = (function() {
      if ((new Map()).keys().next) {
        return function _clearValues(m) {
          var keyIterator = m.keys();
          var k;
          while (!((k = keyIterator.next()).done)) {
            m.set(k.value, null);
          }
        };
      } else {
        return function _clearValuesWithForeEach(m) {
          m.forEach(function(v, k) {
            m.set(k, null);
          });
        };
      }
    })();
    var _arrayFromMap = (function() {
      try {
        if ((new Map()).values().next) {
          return function createArrayFromMap(m, getValues) {
            return getValues ? Array.from(m.values()) : Array.from(m.keys());
          };
        }
      } catch (e) {}
      return function createArrayFromMapWithForeach(m, getValues) {
        var res = new Array(m.size),
            i = 0;
        m.forEach(function(v, k) {
          res[i] = getValues ? v : k;
          i++;
        });
        return res;
      };
    })();
    var MapWrapper = (function() {
      function MapWrapper() {}
      MapWrapper.createFromStringMap = function(stringMap) {
        var result = new Map();
        for (var prop in stringMap) {
          result.set(prop, stringMap[prop]);
        }
        return result;
      };
      MapWrapper.toStringMap = function(m) {
        var r = {};
        m.forEach(function(v, k) {
          return r[k] = v;
        });
        return r;
      };
      MapWrapper.createFromPairs = function(pairs) {
        return createMapFromPairs(pairs);
      };
      MapWrapper.iterable = function(m) {
        return m;
      };
      MapWrapper.keys = function(m) {
        return _arrayFromMap(m, false);
      };
      MapWrapper.values = function(m) {
        return _arrayFromMap(m, true);
      };
      return MapWrapper;
    }());
    var StringMapWrapper = (function() {
      function StringMapWrapper() {}
      StringMapWrapper.merge = function(m1, m2) {
        var m = {};
        for (var _i = 0,
            _a = Object.keys(m1); _i < _a.length; _i++) {
          var k = _a[_i];
          m[k] = m1[k];
        }
        for (var _b = 0,
            _c = Object.keys(m2); _b < _c.length; _b++) {
          var k = _c[_b];
          m[k] = m2[k];
        }
        return m;
      };
      StringMapWrapper.equals = function(m1, m2) {
        var k1 = Object.keys(m1);
        var k2 = Object.keys(m2);
        if (k1.length != k2.length) {
          return false;
        }
        for (var i = 0; i < k1.length; i++) {
          var key = k1[i];
          if (m1[key] !== m2[key]) {
            return false;
          }
        }
        return true;
      };
      return StringMapWrapper;
    }());
    var ListWrapper = (function() {
      function ListWrapper() {}
      ListWrapper.createFixedSize = function(size) {
        return new Array(size);
      };
      ListWrapper.createGrowableSize = function(size) {
        return new Array(size);
      };
      ListWrapper.clone = function(array) {
        return array.slice(0);
      };
      ListWrapper.forEachWithIndex = function(array, fn) {
        for (var i = 0; i < array.length; i++) {
          fn(array[i], i);
        }
      };
      ListWrapper.first = function(array) {
        if (!array)
          return null;
        return array[0];
      };
      ListWrapper.last = function(array) {
        if (!array || array.length == 0)
          return null;
        return array[array.length - 1];
      };
      ListWrapper.indexOf = function(array, value, startIndex) {
        if (startIndex === void 0) {
          startIndex = 0;
        }
        return array.indexOf(value, startIndex);
      };
      ListWrapper.contains = function(list, el) {
        return list.indexOf(el) !== -1;
      };
      ListWrapper.reversed = function(array) {
        var a = ListWrapper.clone(array);
        return a.reverse();
      };
      ListWrapper.concat = function(a, b) {
        return a.concat(b);
      };
      ListWrapper.insert = function(list, index, value) {
        list.splice(index, 0, value);
      };
      ListWrapper.removeAt = function(list, index) {
        var res = list[index];
        list.splice(index, 1);
        return res;
      };
      ListWrapper.removeAll = function(list, items) {
        for (var i = 0; i < items.length; ++i) {
          var index = list.indexOf(items[i]);
          list.splice(index, 1);
        }
      };
      ListWrapper.remove = function(list, el) {
        var index = list.indexOf(el);
        if (index > -1) {
          list.splice(index, 1);
          return true;
        }
        return false;
      };
      ListWrapper.clear = function(list) {
        list.length = 0;
      };
      ListWrapper.isEmpty = function(list) {
        return list.length == 0;
      };
      ListWrapper.fill = function(list, value, start, end) {
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = null;
        }
        list.fill(value, start, end === null ? list.length : end);
      };
      ListWrapper.equals = function(a, b) {
        if (a.length != b.length)
          return false;
        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i])
            return false;
        }
        return true;
      };
      ListWrapper.slice = function(l, from, to) {
        if (from === void 0) {
          from = 0;
        }
        if (to === void 0) {
          to = null;
        }
        return l.slice(from, to === null ? undefined : to);
      };
      ListWrapper.splice = function(l, from, length) {
        return l.splice(from, length);
      };
      ListWrapper.sort = function(l, compareFn) {
        if (isPresent(compareFn)) {
          l.sort(compareFn);
        } else {
          l.sort();
        }
      };
      ListWrapper.toString = function(l) {
        return l.toString();
      };
      ListWrapper.toJSON = function(l) {
        return JSON.stringify(l);
      };
      ListWrapper.maximum = function(list, predicate) {
        if (list.length == 0) {
          return null;
        }
        var solution = null;
        var maxValue = -Infinity;
        for (var index = 0; index < list.length; index++) {
          var candidate = list[index];
          if (isBlank(candidate)) {
            continue;
          }
          var candidateValue = predicate(candidate);
          if (candidateValue > maxValue) {
            solution = candidate;
            maxValue = candidateValue;
          }
        }
        return solution;
      };
      ListWrapper.flatten = function(list) {
        var target = [];
        _flattenArray(list, target);
        return target;
      };
      ListWrapper.addAll = function(list, source) {
        for (var i = 0; i < source.length; i++) {
          list.push(source[i]);
        }
      };
      return ListWrapper;
    }());
    function _flattenArray(source, target) {
      if (isPresent(source)) {
        for (var i = 0; i < source.length; i++) {
          var item = source[i];
          if (isArray(item)) {
            _flattenArray(item, target);
          } else {
            target.push(item);
          }
        }
      }
      return target;
    }
    function isListLikeIterable(obj) {
      if (!isJsObject(obj))
        return false;
      return isArray(obj) || (!(obj instanceof Map) && getSymbolIterator() in obj);
    }
    function areIterablesEqual(a, b, comparator) {
      var iterator1 = a[getSymbolIterator()]();
      var iterator2 = b[getSymbolIterator()]();
      while (true) {
        var item1 = iterator1.next();
        var item2 = iterator2.next();
        if (item1.done && item2.done)
          return true;
        if (item1.done || item2.done)
          return false;
        if (!comparator(item1.value, item2.value))
          return false;
      }
    }
    function iterateListLike(obj, fn) {
      if (isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
          fn(obj[i]);
        }
      } else {
        var iterator = obj[getSymbolIterator()]();
        var item;
        while (!((item = iterator.next()).done)) {
          fn(item.value);
        }
      }
    }
    var __extends$1 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    function findFirstClosedCycle(keys) {
      var res = [];
      for (var i = 0; i < keys.length; ++i) {
        if (ListWrapper.contains(res, keys[i])) {
          res.push(keys[i]);
          return res;
        }
        res.push(keys[i]);
      }
      return res;
    }
    function constructResolvingPath(keys) {
      if (keys.length > 1) {
        var reversed = findFirstClosedCycle(ListWrapper.reversed(keys));
        var tokenStrs = reversed.map(function(k) {
          return stringify(k.token);
        });
        return ' (' + tokenStrs.join(' -> ') + ')';
      }
      return '';
    }
    var AbstractProviderError = (function(_super) {
      __extends$1(AbstractProviderError, _super);
      function AbstractProviderError(injector, key, constructResolvingMessage) {
        _super.call(this, 'DI Error');
        this.keys = [key];
        this.injectors = [injector];
        this.constructResolvingMessage = constructResolvingMessage;
        this.message = this.constructResolvingMessage(this.keys);
      }
      AbstractProviderError.prototype.addKey = function(injector, key) {
        this.injectors.push(injector);
        this.keys.push(key);
        this.message = this.constructResolvingMessage(this.keys);
      };
      return AbstractProviderError;
    }(BaseError));
    var NoProviderError = (function(_super) {
      __extends$1(NoProviderError, _super);
      function NoProviderError(injector, key) {
        _super.call(this, injector, key, function(keys) {
          var first = stringify(ListWrapper.first(keys).token);
          return "No provider for " + first + "!" + constructResolvingPath(keys);
        });
      }
      return NoProviderError;
    }(AbstractProviderError));
    var CyclicDependencyError = (function(_super) {
      __extends$1(CyclicDependencyError, _super);
      function CyclicDependencyError(injector, key) {
        _super.call(this, injector, key, function(keys) {
          return "Cannot instantiate cyclic dependency!" + constructResolvingPath(keys);
        });
      }
      return CyclicDependencyError;
    }(AbstractProviderError));
    var InstantiationError = (function(_super) {
      __extends$1(InstantiationError, _super);
      function InstantiationError(injector, originalException, originalStack, key) {
        _super.call(this, 'DI Error', originalException);
        this.keys = [key];
        this.injectors = [injector];
      }
      InstantiationError.prototype.addKey = function(injector, key) {
        this.injectors.push(injector);
        this.keys.push(key);
      };
      Object.defineProperty(InstantiationError.prototype, "message", {
        get: function() {
          var first = stringify(ListWrapper.first(this.keys).token);
          return this.originalError.message + ": Error during instantiation of " + first + "!" + constructResolvingPath(this.keys) + ".";
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(InstantiationError.prototype, "causeKey", {
        get: function() {
          return this.keys[0];
        },
        enumerable: true,
        configurable: true
      });
      return InstantiationError;
    }(WrappedError));
    var InvalidProviderError = (function(_super) {
      __extends$1(InvalidProviderError, _super);
      function InvalidProviderError(provider) {
        _super.call(this, "Invalid provider - only instances of Provider and Type are allowed, got: " + provider);
      }
      return InvalidProviderError;
    }(BaseError));
    var NoAnnotationError = (function(_super) {
      __extends$1(NoAnnotationError, _super);
      function NoAnnotationError(typeOrFunc, params) {
        _super.call(this, NoAnnotationError._genMessage(typeOrFunc, params));
      }
      NoAnnotationError._genMessage = function(typeOrFunc, params) {
        var signature = [];
        for (var i = 0,
            ii = params.length; i < ii; i++) {
          var parameter = params[i];
          if (!parameter || parameter.length == 0) {
            signature.push('?');
          } else {
            signature.push(parameter.map(stringify).join(' '));
          }
        }
        return 'Cannot resolve all parameters for \'' + stringify(typeOrFunc) + '\'(' + signature.join(', ') + '). ' + 'Make sure that all the parameters are decorated with Inject or have valid type annotations and that \'' + stringify(typeOrFunc) + '\' is decorated with Injectable.';
      };
      return NoAnnotationError;
    }(BaseError));
    var OutOfBoundsError = (function(_super) {
      __extends$1(OutOfBoundsError, _super);
      function OutOfBoundsError(index) {
        _super.call(this, "Index " + index + " is out-of-bounds.");
      }
      return OutOfBoundsError;
    }(BaseError));
    var MixingMultiProvidersWithRegularProvidersError = (function(_super) {
      __extends$1(MixingMultiProvidersWithRegularProvidersError, _super);
      function MixingMultiProvidersWithRegularProvidersError(provider1, provider2) {
        _super.call(this, 'Cannot mix multi providers and regular providers, got: ' + provider1.toString() + ' ' + provider2.toString());
      }
      return MixingMultiProvidersWithRegularProvidersError;
    }(BaseError));
    var ReflectiveKey = (function() {
      function ReflectiveKey(token, id) {
        this.token = token;
        this.id = id;
        if (!token) {
          throw new Error('Token must be defined!');
        }
      }
      Object.defineProperty(ReflectiveKey.prototype, "displayName", {
        get: function() {
          return stringify(this.token);
        },
        enumerable: true,
        configurable: true
      });
      ReflectiveKey.get = function(token) {
        return _globalKeyRegistry.get(resolveForwardRef(token));
      };
      Object.defineProperty(ReflectiveKey, "numberOfKeys", {
        get: function() {
          return _globalKeyRegistry.numberOfKeys;
        },
        enumerable: true,
        configurable: true
      });
      return ReflectiveKey;
    }());
    var KeyRegistry = (function() {
      function KeyRegistry() {
        this._allKeys = new Map();
      }
      KeyRegistry.prototype.get = function(token) {
        if (token instanceof ReflectiveKey)
          return token;
        if (this._allKeys.has(token)) {
          return this._allKeys.get(token);
        }
        var newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
        this._allKeys.set(token, newKey);
        return newKey;
      };
      Object.defineProperty(KeyRegistry.prototype, "numberOfKeys", {
        get: function() {
          return this._allKeys.size;
        },
        enumerable: true,
        configurable: true
      });
      return KeyRegistry;
    }());
    var _globalKeyRegistry = new KeyRegistry();
    var Type = Function;
    var ReflectionCapabilities = (function() {
      function ReflectionCapabilities(reflect) {
        this._reflect = reflect || global$1.Reflect;
      }
      ReflectionCapabilities.prototype.isReflectionEnabled = function() {
        return true;
      };
      ReflectionCapabilities.prototype.factory = function(t) {
        var prototype = t.prototype;
        return function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
          }
          var instance = Object.create(prototype);
          t.apply(instance, args);
          return instance;
        };
      };
      ReflectionCapabilities.prototype._zipTypesAndAnnotations = function(paramTypes, paramAnnotations) {
        var result;
        if (typeof paramTypes === 'undefined') {
          result = new Array(paramAnnotations.length);
        } else {
          result = new Array(paramTypes.length);
        }
        for (var i = 0; i < result.length; i++) {
          if (typeof paramTypes === 'undefined') {
            result[i] = [];
          } else if (paramTypes[i] != Object) {
            result[i] = [paramTypes[i]];
          } else {
            result[i] = [];
          }
          if (isPresent(paramAnnotations) && isPresent(paramAnnotations[i])) {
            result[i] = result[i].concat(paramAnnotations[i]);
          }
        }
        return result;
      };
      ReflectionCapabilities.prototype.parameters = function(typeOrFunc) {
        if (isPresent(typeOrFunc.parameters)) {
          return typeOrFunc.parameters;
        }
        if (isPresent(typeOrFunc.ctorParameters)) {
          var ctorParameters = typeOrFunc.ctorParameters;
          var paramTypes_1 = ctorParameters.map(function(ctorParam) {
            return ctorParam && ctorParam.type;
          });
          var paramAnnotations_1 = ctorParameters.map(function(ctorParam) {
            return ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators);
          });
          return this._zipTypesAndAnnotations(paramTypes_1, paramAnnotations_1);
        }
        if (isPresent(this._reflect) && isPresent(this._reflect.getMetadata)) {
          var paramAnnotations = this._reflect.getMetadata('parameters', typeOrFunc);
          var paramTypes = this._reflect.getMetadata('design:paramtypes', typeOrFunc);
          if (isPresent(paramTypes) || isPresent(paramAnnotations)) {
            return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
          }
        }
        var parameters = new Array(typeOrFunc.length);
        parameters.fill(undefined);
        return parameters;
      };
      ReflectionCapabilities.prototype.annotations = function(typeOrFunc) {
        if (isPresent(typeOrFunc.annotations)) {
          var annotations = typeOrFunc.annotations;
          if (isFunction(annotations) && annotations.annotations) {
            annotations = annotations.annotations;
          }
          return annotations;
        }
        if (isPresent(typeOrFunc.decorators)) {
          return convertTsickleDecoratorIntoMetadata(typeOrFunc.decorators);
        }
        if (isPresent(this._reflect) && isPresent(this._reflect.getMetadata)) {
          var annotations = this._reflect.getMetadata('annotations', typeOrFunc);
          if (isPresent(annotations))
            return annotations;
        }
        return [];
      };
      ReflectionCapabilities.prototype.propMetadata = function(typeOrFunc) {
        if (isPresent(typeOrFunc.propMetadata)) {
          var propMetadata = typeOrFunc.propMetadata;
          if (isFunction(propMetadata) && propMetadata.propMetadata) {
            propMetadata = propMetadata.propMetadata;
          }
          return propMetadata;
        }
        if (isPresent(typeOrFunc.propDecorators)) {
          var propDecorators_1 = typeOrFunc.propDecorators;
          var propMetadata_1 = {};
          Object.keys(propDecorators_1).forEach(function(prop) {
            propMetadata_1[prop] = convertTsickleDecoratorIntoMetadata(propDecorators_1[prop]);
          });
          return propMetadata_1;
        }
        if (isPresent(this._reflect) && isPresent(this._reflect.getMetadata)) {
          var propMetadata = this._reflect.getMetadata('propMetadata', typeOrFunc);
          if (isPresent(propMetadata))
            return propMetadata;
        }
        return {};
      };
      ReflectionCapabilities.prototype.interfaces = function(type) {
        return [];
      };
      ReflectionCapabilities.prototype.hasLifecycleHook = function(type, lcInterface, lcProperty) {
        if (!(type instanceof Type))
          return false;
        var proto = type.prototype;
        return !!proto[lcProperty];
      };
      ReflectionCapabilities.prototype.getter = function(name) {
        return new Function('o', 'return o.' + name + ';');
      };
      ReflectionCapabilities.prototype.setter = function(name) {
        return new Function('o', 'v', 'return o.' + name + ' = v;');
      };
      ReflectionCapabilities.prototype.method = function(name) {
        var functionBody = "if (!o." + name + ") throw new Error('\"" + name + "\" is undefined');\n        return o." + name + ".apply(o, args);";
        return new Function('o', 'args', functionBody);
      };
      ReflectionCapabilities.prototype.importUri = function(type) {
        if (typeof type === 'object' && type['filePath']) {
          return type['filePath'];
        }
        return "./" + stringify(type);
      };
      ReflectionCapabilities.prototype.resolveIdentifier = function(name, moduleUrl, runtime) {
        return runtime;
      };
      ReflectionCapabilities.prototype.resolveEnum = function(enumIdentifier, name) {
        return enumIdentifier[name];
      };
      return ReflectionCapabilities;
    }());
    function convertTsickleDecoratorIntoMetadata(decoratorInvocations) {
      if (!decoratorInvocations) {
        return [];
      }
      return decoratorInvocations.map(function(decoratorInvocation) {
        var decoratorType = decoratorInvocation.type;
        var annotationCls = decoratorType.annotationCls;
        var annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
        return new (annotationCls.bind.apply(annotationCls, [void 0].concat(annotationArgs)))();
      });
    }
    var ReflectorReader = (function() {
      function ReflectorReader() {}
      return ReflectorReader;
    }());
    var __extends$2 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Reflector = (function(_super) {
      __extends$2(Reflector, _super);
      function Reflector(reflectionCapabilities) {
        _super.call(this);
        this.reflectionCapabilities = reflectionCapabilities;
        this._injectableInfo = new Map();
        this._getters = new Map();
        this._setters = new Map();
        this._methods = new Map();
        this._usedKeys = null;
      }
      Reflector.prototype.updateCapabilities = function(caps) {
        this.reflectionCapabilities = caps;
      };
      Reflector.prototype.isReflectionEnabled = function() {
        return this.reflectionCapabilities.isReflectionEnabled();
      };
      Reflector.prototype.trackUsage = function() {
        this._usedKeys = new Set();
      };
      Reflector.prototype.listUnusedKeys = function() {
        var _this = this;
        if (this._usedKeys == null) {
          throw new Error('Usage tracking is disabled');
        }
        var allTypes = MapWrapper.keys(this._injectableInfo);
        return allTypes.filter(function(key) {
          return !_this._usedKeys.has(key);
        });
      };
      Reflector.prototype.registerFunction = function(func, funcInfo) {
        this._injectableInfo.set(func, funcInfo);
      };
      Reflector.prototype.registerType = function(type, typeInfo) {
        this._injectableInfo.set(type, typeInfo);
      };
      Reflector.prototype.registerGetters = function(getters) {
        _mergeMaps(this._getters, getters);
      };
      Reflector.prototype.registerSetters = function(setters) {
        _mergeMaps(this._setters, setters);
      };
      Reflector.prototype.registerMethods = function(methods) {
        _mergeMaps(this._methods, methods);
      };
      Reflector.prototype.factory = function(type) {
        if (this._containsReflectionInfo(type)) {
          var res = this._getReflectionInfo(type).factory;
          return isPresent(res) ? res : null;
        } else {
          return this.reflectionCapabilities.factory(type);
        }
      };
      Reflector.prototype.parameters = function(typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
          var res = this._getReflectionInfo(typeOrFunc).parameters;
          return isPresent(res) ? res : [];
        } else {
          return this.reflectionCapabilities.parameters(typeOrFunc);
        }
      };
      Reflector.prototype.annotations = function(typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
          var res = this._getReflectionInfo(typeOrFunc).annotations;
          return isPresent(res) ? res : [];
        } else {
          return this.reflectionCapabilities.annotations(typeOrFunc);
        }
      };
      Reflector.prototype.propMetadata = function(typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
          var res = this._getReflectionInfo(typeOrFunc).propMetadata;
          return isPresent(res) ? res : {};
        } else {
          return this.reflectionCapabilities.propMetadata(typeOrFunc);
        }
      };
      Reflector.prototype.interfaces = function(type) {
        if (this._injectableInfo.has(type)) {
          var res = this._getReflectionInfo(type).interfaces;
          return isPresent(res) ? res : [];
        } else {
          return this.reflectionCapabilities.interfaces(type);
        }
      };
      Reflector.prototype.hasLifecycleHook = function(type, lcInterface, lcProperty) {
        var interfaces = this.interfaces(type);
        if (interfaces.indexOf(lcInterface) !== -1) {
          return true;
        } else {
          return this.reflectionCapabilities.hasLifecycleHook(type, lcInterface, lcProperty);
        }
      };
      Reflector.prototype.getter = function(name) {
        if (this._getters.has(name)) {
          return this._getters.get(name);
        } else {
          return this.reflectionCapabilities.getter(name);
        }
      };
      Reflector.prototype.setter = function(name) {
        if (this._setters.has(name)) {
          return this._setters.get(name);
        } else {
          return this.reflectionCapabilities.setter(name);
        }
      };
      Reflector.prototype.method = function(name) {
        if (this._methods.has(name)) {
          return this._methods.get(name);
        } else {
          return this.reflectionCapabilities.method(name);
        }
      };
      Reflector.prototype._getReflectionInfo = function(typeOrFunc) {
        if (isPresent(this._usedKeys)) {
          this._usedKeys.add(typeOrFunc);
        }
        return this._injectableInfo.get(typeOrFunc);
      };
      Reflector.prototype._containsReflectionInfo = function(typeOrFunc) {
        return this._injectableInfo.has(typeOrFunc);
      };
      Reflector.prototype.importUri = function(type) {
        return this.reflectionCapabilities.importUri(type);
      };
      Reflector.prototype.resolveIdentifier = function(name, moduleUrl, runtime) {
        return this.reflectionCapabilities.resolveIdentifier(name, moduleUrl, runtime);
      };
      Reflector.prototype.resolveEnum = function(identifier, name) {
        return this.reflectionCapabilities.resolveEnum(identifier, name);
      };
      return Reflector;
    }(ReflectorReader));
    function _mergeMaps(target, config) {
      Object.keys(config).forEach(function(k) {
        target.set(k, config[k]);
      });
    }
    var reflector = new Reflector(new ReflectionCapabilities());
    var ReflectiveDependency = (function() {
      function ReflectiveDependency(key, optional, lowerBoundVisibility, upperBoundVisibility, properties) {
        this.key = key;
        this.optional = optional;
        this.lowerBoundVisibility = lowerBoundVisibility;
        this.upperBoundVisibility = upperBoundVisibility;
        this.properties = properties;
      }
      ReflectiveDependency.fromKey = function(key) {
        return new ReflectiveDependency(key, false, null, null, []);
      };
      return ReflectiveDependency;
    }());
    var _EMPTY_LIST = [];
    var ResolvedReflectiveProvider_ = (function() {
      function ResolvedReflectiveProvider_(key, resolvedFactories, multiProvider) {
        this.key = key;
        this.resolvedFactories = resolvedFactories;
        this.multiProvider = multiProvider;
      }
      Object.defineProperty(ResolvedReflectiveProvider_.prototype, "resolvedFactory", {
        get: function() {
          return this.resolvedFactories[0];
        },
        enumerable: true,
        configurable: true
      });
      return ResolvedReflectiveProvider_;
    }());
    var ResolvedReflectiveFactory = (function() {
      function ResolvedReflectiveFactory(factory, dependencies) {
        this.factory = factory;
        this.dependencies = dependencies;
      }
      return ResolvedReflectiveFactory;
    }());
    function resolveReflectiveFactory(provider) {
      var factoryFn;
      var resolvedDeps;
      if (isPresent(provider.useClass)) {
        var useClass = resolveForwardRef(provider.useClass);
        factoryFn = reflector.factory(useClass);
        resolvedDeps = _dependenciesFor(useClass);
      } else if (isPresent(provider.useExisting)) {
        factoryFn = function(aliasInstance) {
          return aliasInstance;
        };
        resolvedDeps = [ReflectiveDependency.fromKey(ReflectiveKey.get(provider.useExisting))];
      } else if (isPresent(provider.useFactory)) {
        factoryFn = provider.useFactory;
        resolvedDeps = constructDependencies(provider.useFactory, provider.deps);
      } else {
        factoryFn = function() {
          return provider.useValue;
        };
        resolvedDeps = _EMPTY_LIST;
      }
      return new ResolvedReflectiveFactory(factoryFn, resolvedDeps);
    }
    function resolveReflectiveProvider(provider) {
      return new ResolvedReflectiveProvider_(ReflectiveKey.get(provider.provide), [resolveReflectiveFactory(provider)], provider.multi);
    }
    function resolveReflectiveProviders(providers) {
      var normalized = _normalizeProviders(providers, []);
      var resolved = normalized.map(resolveReflectiveProvider);
      return MapWrapper.values(mergeResolvedReflectiveProviders(resolved, new Map()));
    }
    function mergeResolvedReflectiveProviders(providers, normalizedProvidersMap) {
      for (var i = 0; i < providers.length; i++) {
        var provider = providers[i];
        var existing = normalizedProvidersMap.get(provider.key.id);
        if (isPresent(existing)) {
          if (provider.multiProvider !== existing.multiProvider) {
            throw new MixingMultiProvidersWithRegularProvidersError(existing, provider);
          }
          if (provider.multiProvider) {
            for (var j = 0; j < provider.resolvedFactories.length; j++) {
              existing.resolvedFactories.push(provider.resolvedFactories[j]);
            }
          } else {
            normalizedProvidersMap.set(provider.key.id, provider);
          }
        } else {
          var resolvedProvider;
          if (provider.multiProvider) {
            resolvedProvider = new ResolvedReflectiveProvider_(provider.key, ListWrapper.clone(provider.resolvedFactories), provider.multiProvider);
          } else {
            resolvedProvider = provider;
          }
          normalizedProvidersMap.set(provider.key.id, resolvedProvider);
        }
      }
      return normalizedProvidersMap;
    }
    function _normalizeProviders(providers, res) {
      providers.forEach(function(b) {
        if (b instanceof Type) {
          res.push({
            provide: b,
            useClass: b
          });
        } else if (b && typeof b == 'object' && b.provide !== undefined) {
          res.push(b);
        } else if (b instanceof Array) {
          _normalizeProviders(b, res);
        } else {
          throw new InvalidProviderError(b);
        }
      });
      return res;
    }
    function constructDependencies(typeOrFunc, dependencies) {
      if (!dependencies) {
        return _dependenciesFor(typeOrFunc);
      } else {
        var params = dependencies.map(function(t) {
          return [t];
        });
        return dependencies.map(function(t) {
          return _extractToken(typeOrFunc, t, params);
        });
      }
    }
    function _dependenciesFor(typeOrFunc) {
      var params = reflector.parameters(typeOrFunc);
      if (!params)
        return [];
      if (params.some(isBlank)) {
        throw new NoAnnotationError(typeOrFunc, params);
      }
      return params.map(function(p) {
        return _extractToken(typeOrFunc, p, params);
      });
    }
    function _extractToken(typeOrFunc, metadata, params) {
      var depProps = [];
      var token = null;
      var optional = false;
      if (!isArray(metadata)) {
        if (metadata instanceof Inject) {
          return _createDependency(metadata.token, optional, null, null, depProps);
        } else {
          return _createDependency(metadata, optional, null, null, depProps);
        }
      }
      var lowerBoundVisibility = null;
      var upperBoundVisibility = null;
      for (var i = 0; i < metadata.length; ++i) {
        var paramMetadata = metadata[i];
        if (paramMetadata instanceof Type) {
          token = paramMetadata;
        } else if (paramMetadata instanceof Inject) {
          token = paramMetadata.token;
        } else if (paramMetadata instanceof Optional) {
          optional = true;
        } else if (paramMetadata instanceof Self) {
          upperBoundVisibility = paramMetadata;
        } else if (paramMetadata instanceof Host) {
          upperBoundVisibility = paramMetadata;
        } else if (paramMetadata instanceof SkipSelf) {
          lowerBoundVisibility = paramMetadata;
        }
      }
      token = resolveForwardRef(token);
      if (isPresent(token)) {
        return _createDependency(token, optional, lowerBoundVisibility, upperBoundVisibility, depProps);
      } else {
        throw new NoAnnotationError(typeOrFunc, params);
      }
    }
    function _createDependency(token, optional, lowerBoundVisibility, upperBoundVisibility, depProps) {
      return new ReflectiveDependency(ReflectiveKey.get(token), optional, lowerBoundVisibility, upperBoundVisibility, depProps);
    }
    var _MAX_CONSTRUCTION_COUNTER = 10;
    var UNDEFINED = new Object();
    var ReflectiveProtoInjectorInlineStrategy = (function() {
      function ReflectiveProtoInjectorInlineStrategy(protoEI, providers) {
        this.provider0 = null;
        this.provider1 = null;
        this.provider2 = null;
        this.provider3 = null;
        this.provider4 = null;
        this.provider5 = null;
        this.provider6 = null;
        this.provider7 = null;
        this.provider8 = null;
        this.provider9 = null;
        this.keyId0 = null;
        this.keyId1 = null;
        this.keyId2 = null;
        this.keyId3 = null;
        this.keyId4 = null;
        this.keyId5 = null;
        this.keyId6 = null;
        this.keyId7 = null;
        this.keyId8 = null;
        this.keyId9 = null;
        var length = providers.length;
        if (length > 0) {
          this.provider0 = providers[0];
          this.keyId0 = providers[0].key.id;
        }
        if (length > 1) {
          this.provider1 = providers[1];
          this.keyId1 = providers[1].key.id;
        }
        if (length > 2) {
          this.provider2 = providers[2];
          this.keyId2 = providers[2].key.id;
        }
        if (length > 3) {
          this.provider3 = providers[3];
          this.keyId3 = providers[3].key.id;
        }
        if (length > 4) {
          this.provider4 = providers[4];
          this.keyId4 = providers[4].key.id;
        }
        if (length > 5) {
          this.provider5 = providers[5];
          this.keyId5 = providers[5].key.id;
        }
        if (length > 6) {
          this.provider6 = providers[6];
          this.keyId6 = providers[6].key.id;
        }
        if (length > 7) {
          this.provider7 = providers[7];
          this.keyId7 = providers[7].key.id;
        }
        if (length > 8) {
          this.provider8 = providers[8];
          this.keyId8 = providers[8].key.id;
        }
        if (length > 9) {
          this.provider9 = providers[9];
          this.keyId9 = providers[9].key.id;
        }
      }
      ReflectiveProtoInjectorInlineStrategy.prototype.getProviderAtIndex = function(index) {
        if (index == 0)
          return this.provider0;
        if (index == 1)
          return this.provider1;
        if (index == 2)
          return this.provider2;
        if (index == 3)
          return this.provider3;
        if (index == 4)
          return this.provider4;
        if (index == 5)
          return this.provider5;
        if (index == 6)
          return this.provider6;
        if (index == 7)
          return this.provider7;
        if (index == 8)
          return this.provider8;
        if (index == 9)
          return this.provider9;
        throw new OutOfBoundsError(index);
      };
      ReflectiveProtoInjectorInlineStrategy.prototype.createInjectorStrategy = function(injector) {
        return new ReflectiveInjectorInlineStrategy(injector, this);
      };
      return ReflectiveProtoInjectorInlineStrategy;
    }());
    var ReflectiveProtoInjectorDynamicStrategy = (function() {
      function ReflectiveProtoInjectorDynamicStrategy(protoInj, providers) {
        this.providers = providers;
        var len = providers.length;
        this.keyIds = new Array(len);
        for (var i = 0; i < len; i++) {
          this.keyIds[i] = providers[i].key.id;
        }
      }
      ReflectiveProtoInjectorDynamicStrategy.prototype.getProviderAtIndex = function(index) {
        if (index < 0 || index >= this.providers.length) {
          throw new OutOfBoundsError(index);
        }
        return this.providers[index];
      };
      ReflectiveProtoInjectorDynamicStrategy.prototype.createInjectorStrategy = function(ei) {
        return new ReflectiveInjectorDynamicStrategy(this, ei);
      };
      return ReflectiveProtoInjectorDynamicStrategy;
    }());
    var ReflectiveProtoInjector = (function() {
      function ReflectiveProtoInjector(providers) {
        this.numberOfProviders = providers.length;
        this._strategy = providers.length > _MAX_CONSTRUCTION_COUNTER ? new ReflectiveProtoInjectorDynamicStrategy(this, providers) : new ReflectiveProtoInjectorInlineStrategy(this, providers);
      }
      ReflectiveProtoInjector.fromResolvedProviders = function(providers) {
        return new ReflectiveProtoInjector(providers);
      };
      ReflectiveProtoInjector.prototype.getProviderAtIndex = function(index) {
        return this._strategy.getProviderAtIndex(index);
      };
      return ReflectiveProtoInjector;
    }());
    var ReflectiveInjectorInlineStrategy = (function() {
      function ReflectiveInjectorInlineStrategy(injector, protoStrategy) {
        this.injector = injector;
        this.protoStrategy = protoStrategy;
        this.obj0 = UNDEFINED;
        this.obj1 = UNDEFINED;
        this.obj2 = UNDEFINED;
        this.obj3 = UNDEFINED;
        this.obj4 = UNDEFINED;
        this.obj5 = UNDEFINED;
        this.obj6 = UNDEFINED;
        this.obj7 = UNDEFINED;
        this.obj8 = UNDEFINED;
        this.obj9 = UNDEFINED;
      }
      ReflectiveInjectorInlineStrategy.prototype.resetConstructionCounter = function() {
        this.injector._constructionCounter = 0;
      };
      ReflectiveInjectorInlineStrategy.prototype.instantiateProvider = function(provider) {
        return this.injector._new(provider);
      };
      ReflectiveInjectorInlineStrategy.prototype.getObjByKeyId = function(keyId) {
        var p = this.protoStrategy;
        var inj = this.injector;
        if (p.keyId0 === keyId) {
          if (this.obj0 === UNDEFINED) {
            this.obj0 = inj._new(p.provider0);
          }
          return this.obj0;
        }
        if (p.keyId1 === keyId) {
          if (this.obj1 === UNDEFINED) {
            this.obj1 = inj._new(p.provider1);
          }
          return this.obj1;
        }
        if (p.keyId2 === keyId) {
          if (this.obj2 === UNDEFINED) {
            this.obj2 = inj._new(p.provider2);
          }
          return this.obj2;
        }
        if (p.keyId3 === keyId) {
          if (this.obj3 === UNDEFINED) {
            this.obj3 = inj._new(p.provider3);
          }
          return this.obj3;
        }
        if (p.keyId4 === keyId) {
          if (this.obj4 === UNDEFINED) {
            this.obj4 = inj._new(p.provider4);
          }
          return this.obj4;
        }
        if (p.keyId5 === keyId) {
          if (this.obj5 === UNDEFINED) {
            this.obj5 = inj._new(p.provider5);
          }
          return this.obj5;
        }
        if (p.keyId6 === keyId) {
          if (this.obj6 === UNDEFINED) {
            this.obj6 = inj._new(p.provider6);
          }
          return this.obj6;
        }
        if (p.keyId7 === keyId) {
          if (this.obj7 === UNDEFINED) {
            this.obj7 = inj._new(p.provider7);
          }
          return this.obj7;
        }
        if (p.keyId8 === keyId) {
          if (this.obj8 === UNDEFINED) {
            this.obj8 = inj._new(p.provider8);
          }
          return this.obj8;
        }
        if (p.keyId9 === keyId) {
          if (this.obj9 === UNDEFINED) {
            this.obj9 = inj._new(p.provider9);
          }
          return this.obj9;
        }
        return UNDEFINED;
      };
      ReflectiveInjectorInlineStrategy.prototype.getObjAtIndex = function(index) {
        if (index == 0)
          return this.obj0;
        if (index == 1)
          return this.obj1;
        if (index == 2)
          return this.obj2;
        if (index == 3)
          return this.obj3;
        if (index == 4)
          return this.obj4;
        if (index == 5)
          return this.obj5;
        if (index == 6)
          return this.obj6;
        if (index == 7)
          return this.obj7;
        if (index == 8)
          return this.obj8;
        if (index == 9)
          return this.obj9;
        throw new OutOfBoundsError(index);
      };
      ReflectiveInjectorInlineStrategy.prototype.getMaxNumberOfObjects = function() {
        return _MAX_CONSTRUCTION_COUNTER;
      };
      return ReflectiveInjectorInlineStrategy;
    }());
    var ReflectiveInjectorDynamicStrategy = (function() {
      function ReflectiveInjectorDynamicStrategy(protoStrategy, injector) {
        this.protoStrategy = protoStrategy;
        this.injector = injector;
        this.objs = new Array(protoStrategy.providers.length);
        ListWrapper.fill(this.objs, UNDEFINED);
      }
      ReflectiveInjectorDynamicStrategy.prototype.resetConstructionCounter = function() {
        this.injector._constructionCounter = 0;
      };
      ReflectiveInjectorDynamicStrategy.prototype.instantiateProvider = function(provider) {
        return this.injector._new(provider);
      };
      ReflectiveInjectorDynamicStrategy.prototype.getObjByKeyId = function(keyId) {
        var p = this.protoStrategy;
        for (var i = 0; i < p.keyIds.length; i++) {
          if (p.keyIds[i] === keyId) {
            if (this.objs[i] === UNDEFINED) {
              this.objs[i] = this.injector._new(p.providers[i]);
            }
            return this.objs[i];
          }
        }
        return UNDEFINED;
      };
      ReflectiveInjectorDynamicStrategy.prototype.getObjAtIndex = function(index) {
        if (index < 0 || index >= this.objs.length) {
          throw new OutOfBoundsError(index);
        }
        return this.objs[index];
      };
      ReflectiveInjectorDynamicStrategy.prototype.getMaxNumberOfObjects = function() {
        return this.objs.length;
      };
      return ReflectiveInjectorDynamicStrategy;
    }());
    var ReflectiveInjector = (function() {
      function ReflectiveInjector() {}
      ReflectiveInjector.resolve = function(providers) {
        return resolveReflectiveProviders(providers);
      };
      ReflectiveInjector.resolveAndCreate = function(providers, parent) {
        if (parent === void 0) {
          parent = null;
        }
        var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
        return ReflectiveInjector.fromResolvedProviders(ResolvedReflectiveProviders, parent);
      };
      ReflectiveInjector.fromResolvedProviders = function(providers, parent) {
        if (parent === void 0) {
          parent = null;
        }
        return new ReflectiveInjector_(ReflectiveProtoInjector.fromResolvedProviders(providers), parent);
      };
      Object.defineProperty(ReflectiveInjector.prototype, "parent", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      ReflectiveInjector.prototype.resolveAndCreateChild = function(providers) {
        return unimplemented();
      };
      ReflectiveInjector.prototype.createChildFromResolved = function(providers) {
        return unimplemented();
      };
      ReflectiveInjector.prototype.resolveAndInstantiate = function(provider) {
        return unimplemented();
      };
      ReflectiveInjector.prototype.instantiateResolved = function(provider) {
        return unimplemented();
      };
      return ReflectiveInjector;
    }());
    var ReflectiveInjector_ = (function() {
      function ReflectiveInjector_(_proto, _parent) {
        if (_parent === void 0) {
          _parent = null;
        }
        this._constructionCounter = 0;
        this._proto = _proto;
        this._parent = _parent;
        this._strategy = _proto._strategy.createInjectorStrategy(this);
      }
      ReflectiveInjector_.prototype.get = function(token, notFoundValue) {
        if (notFoundValue === void 0) {
          notFoundValue = THROW_IF_NOT_FOUND;
        }
        return this._getByKey(ReflectiveKey.get(token), null, null, notFoundValue);
      };
      ReflectiveInjector_.prototype.getAt = function(index) {
        return this._strategy.getObjAtIndex(index);
      };
      Object.defineProperty(ReflectiveInjector_.prototype, "parent", {
        get: function() {
          return this._parent;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ReflectiveInjector_.prototype, "internalStrategy", {
        get: function() {
          return this._strategy;
        },
        enumerable: true,
        configurable: true
      });
      ReflectiveInjector_.prototype.resolveAndCreateChild = function(providers) {
        var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
        return this.createChildFromResolved(ResolvedReflectiveProviders);
      };
      ReflectiveInjector_.prototype.createChildFromResolved = function(providers) {
        var proto = new ReflectiveProtoInjector(providers);
        var inj = new ReflectiveInjector_(proto);
        inj._parent = this;
        return inj;
      };
      ReflectiveInjector_.prototype.resolveAndInstantiate = function(provider) {
        return this.instantiateResolved(ReflectiveInjector.resolve([provider])[0]);
      };
      ReflectiveInjector_.prototype.instantiateResolved = function(provider) {
        return this._instantiateProvider(provider);
      };
      ReflectiveInjector_.prototype._new = function(provider) {
        if (this._constructionCounter++ > this._strategy.getMaxNumberOfObjects()) {
          throw new CyclicDependencyError(this, provider.key);
        }
        return this._instantiateProvider(provider);
      };
      ReflectiveInjector_.prototype._instantiateProvider = function(provider) {
        if (provider.multiProvider) {
          var res = new Array(provider.resolvedFactories.length);
          for (var i = 0; i < provider.resolvedFactories.length; ++i) {
            res[i] = this._instantiate(provider, provider.resolvedFactories[i]);
          }
          return res;
        } else {
          return this._instantiate(provider, provider.resolvedFactories[0]);
        }
      };
      ReflectiveInjector_.prototype._instantiate = function(provider, ResolvedReflectiveFactory) {
        var factory = ResolvedReflectiveFactory.factory;
        var deps = ResolvedReflectiveFactory.dependencies;
        var length = deps.length;
        var d0;
        var d1;
        var d2;
        var d3;
        var d4;
        var d5;
        var d6;
        var d7;
        var d8;
        var d9;
        var d10;
        var d11;
        var d12;
        var d13;
        var d14;
        var d15;
        var d16;
        var d17;
        var d18;
        var d19;
        try {
          d0 = length > 0 ? this._getByReflectiveDependency(provider, deps[0]) : null;
          d1 = length > 1 ? this._getByReflectiveDependency(provider, deps[1]) : null;
          d2 = length > 2 ? this._getByReflectiveDependency(provider, deps[2]) : null;
          d3 = length > 3 ? this._getByReflectiveDependency(provider, deps[3]) : null;
          d4 = length > 4 ? this._getByReflectiveDependency(provider, deps[4]) : null;
          d5 = length > 5 ? this._getByReflectiveDependency(provider, deps[5]) : null;
          d6 = length > 6 ? this._getByReflectiveDependency(provider, deps[6]) : null;
          d7 = length > 7 ? this._getByReflectiveDependency(provider, deps[7]) : null;
          d8 = length > 8 ? this._getByReflectiveDependency(provider, deps[8]) : null;
          d9 = length > 9 ? this._getByReflectiveDependency(provider, deps[9]) : null;
          d10 = length > 10 ? this._getByReflectiveDependency(provider, deps[10]) : null;
          d11 = length > 11 ? this._getByReflectiveDependency(provider, deps[11]) : null;
          d12 = length > 12 ? this._getByReflectiveDependency(provider, deps[12]) : null;
          d13 = length > 13 ? this._getByReflectiveDependency(provider, deps[13]) : null;
          d14 = length > 14 ? this._getByReflectiveDependency(provider, deps[14]) : null;
          d15 = length > 15 ? this._getByReflectiveDependency(provider, deps[15]) : null;
          d16 = length > 16 ? this._getByReflectiveDependency(provider, deps[16]) : null;
          d17 = length > 17 ? this._getByReflectiveDependency(provider, deps[17]) : null;
          d18 = length > 18 ? this._getByReflectiveDependency(provider, deps[18]) : null;
          d19 = length > 19 ? this._getByReflectiveDependency(provider, deps[19]) : null;
        } catch (e) {
          if (e instanceof AbstractProviderError || e instanceof InstantiationError) {
            e.addKey(this, provider.key);
          }
          throw e;
        }
        var obj;
        try {
          switch (length) {
            case 0:
              obj = factory();
              break;
            case 1:
              obj = factory(d0);
              break;
            case 2:
              obj = factory(d0, d1);
              break;
            case 3:
              obj = factory(d0, d1, d2);
              break;
            case 4:
              obj = factory(d0, d1, d2, d3);
              break;
            case 5:
              obj = factory(d0, d1, d2, d3, d4);
              break;
            case 6:
              obj = factory(d0, d1, d2, d3, d4, d5);
              break;
            case 7:
              obj = factory(d0, d1, d2, d3, d4, d5, d6);
              break;
            case 8:
              obj = factory(d0, d1, d2, d3, d4, d5, d6, d7);
              break;
            case 9:
              obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8);
              break;
            case 10:
              obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9);
              break;
            case 11:
              obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10);
              break;
            case 12:
              obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11);
              break;
            case 13:
              obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12);
              break;
            case 14:
              obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13);
              break;
            case 15:
              obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14);
              break;
            case 16:
              obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15);
              break;
            case 17:
              obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16);
              break;
            case 18:
              obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17);
              break;
            case 19:
              obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18);
              break;
            case 20:
              obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19);
              break;
            default:
              throw new Error("Cannot instantiate '" + provider.key.displayName + "' because it has more than 20 dependencies");
          }
        } catch (e) {
          throw new InstantiationError(this, e, e.stack, provider.key);
        }
        return obj;
      };
      ReflectiveInjector_.prototype._getByReflectiveDependency = function(provider, dep) {
        return this._getByKey(dep.key, dep.lowerBoundVisibility, dep.upperBoundVisibility, dep.optional ? null : THROW_IF_NOT_FOUND);
      };
      ReflectiveInjector_.prototype._getByKey = function(key, lowerBoundVisibility, upperBoundVisibility, notFoundValue) {
        if (key === INJECTOR_KEY) {
          return this;
        }
        if (upperBoundVisibility instanceof Self) {
          return this._getByKeySelf(key, notFoundValue);
        } else {
          return this._getByKeyDefault(key, notFoundValue, lowerBoundVisibility);
        }
      };
      ReflectiveInjector_.prototype._throwOrNull = function(key, notFoundValue) {
        if (notFoundValue !== THROW_IF_NOT_FOUND) {
          return notFoundValue;
        } else {
          throw new NoProviderError(this, key);
        }
      };
      ReflectiveInjector_.prototype._getByKeySelf = function(key, notFoundValue) {
        var obj = this._strategy.getObjByKeyId(key.id);
        return (obj !== UNDEFINED) ? obj : this._throwOrNull(key, notFoundValue);
      };
      ReflectiveInjector_.prototype._getByKeyDefault = function(key, notFoundValue, lowerBoundVisibility) {
        var inj;
        if (lowerBoundVisibility instanceof SkipSelf) {
          inj = this._parent;
        } else {
          inj = this;
        }
        while (inj instanceof ReflectiveInjector_) {
          var inj_ = inj;
          var obj = inj_._strategy.getObjByKeyId(key.id);
          if (obj !== UNDEFINED)
            return obj;
          inj = inj_._parent;
        }
        if (inj !== null) {
          return inj.get(key.token, notFoundValue);
        } else {
          return this._throwOrNull(key, notFoundValue);
        }
      };
      Object.defineProperty(ReflectiveInjector_.prototype, "displayName", {
        get: function() {
          var providers = _mapProviders(this, function(b) {
            return ' "' + b.key.displayName + '" ';
          }).join(', ');
          return "ReflectiveInjector(providers: [" + providers + "])";
        },
        enumerable: true,
        configurable: true
      });
      ReflectiveInjector_.prototype.toString = function() {
        return this.displayName;
      };
      return ReflectiveInjector_;
    }());
    var INJECTOR_KEY = ReflectiveKey.get(Injector);
    function _mapProviders(injector, fn) {
      var res = new Array(injector._proto.numberOfProviders);
      for (var i = 0; i < injector._proto.numberOfProviders; ++i) {
        res[i] = fn(injector._proto.getProviderAtIndex(i));
      }
      return res;
    }
    var ErrorHandler = (function() {
      function ErrorHandler(rethrowError) {
        if (rethrowError === void 0) {
          rethrowError = true;
        }
        this._console = console;
        this.rethrowError = rethrowError;
      }
      ErrorHandler.prototype.handleError = function(error) {
        var originalError = this._findOriginalError(error);
        var originalStack = this._findOriginalStack(error);
        var context = this._findContext(error);
        this._console.error("EXCEPTION: " + this._extractMessage(error));
        if (originalError) {
          this._console.error("ORIGINAL EXCEPTION: " + this._extractMessage(originalError));
        }
        if (originalStack) {
          this._console.error('ORIGINAL STACKTRACE:');
          this._console.error(originalStack);
        }
        if (context) {
          this._console.error('ERROR CONTEXT:');
          this._console.error(context);
        }
        if (this.rethrowError)
          throw error;
      };
      ErrorHandler.prototype._extractMessage = function(error) {
        return error instanceof Error ? error.message : error.toString();
      };
      ErrorHandler.prototype._findContext = function(error) {
        if (error) {
          return error.context ? error.context : this._findContext(error.originalError);
        }
        return null;
      };
      ErrorHandler.prototype._findOriginalError = function(error) {
        var e = error.originalError;
        while (e && e.originalError) {
          e = e.originalError;
        }
        return e;
      };
      ErrorHandler.prototype._findOriginalStack = function(error) {
        if (!(error instanceof Error))
          return null;
        var e = error;
        var stack = e.stack;
        while (e instanceof Error && e.originalError) {
          e = e.originalError;
          if (e instanceof Error && e.stack) {
            stack = e.stack;
          }
        }
        return stack;
      };
      return ErrorHandler;
    }());
    function isPromise(obj) {
      return !!obj && typeof obj.then === 'function';
    }
    var APP_INITIALIZER = new OpaqueToken('Application Initializer');
    var ApplicationInitStatus = (function() {
      function ApplicationInitStatus(appInits) {
        var _this = this;
        this._done = false;
        var asyncInitPromises = [];
        if (appInits) {
          for (var i = 0; i < appInits.length; i++) {
            var initResult = appInits[i]();
            if (isPromise(initResult)) {
              asyncInitPromises.push(initResult);
            }
          }
        }
        this._donePromise = Promise.all(asyncInitPromises).then(function() {
          _this._done = true;
        });
        if (asyncInitPromises.length === 0) {
          this._done = true;
        }
      }
      Object.defineProperty(ApplicationInitStatus.prototype, "done", {
        get: function() {
          return this._done;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ApplicationInitStatus.prototype, "donePromise", {
        get: function() {
          return this._donePromise;
        },
        enumerable: true,
        configurable: true
      });
      ApplicationInitStatus.decorators = [{type: Injectable}];
      ApplicationInitStatus.ctorParameters = [{
        type: Array,
        decorators: [{
          type: Inject,
          args: [APP_INITIALIZER]
        }, {type: Optional}]
      }];
      return ApplicationInitStatus;
    }());
    var APP_ID = new OpaqueToken('AppId');
    function _appIdRandomProviderFactory() {
      return "" + _randomChar() + _randomChar() + _randomChar();
    }
    var APP_ID_RANDOM_PROVIDER = {
      provide: APP_ID,
      useFactory: _appIdRandomProviderFactory,
      deps: []
    };
    function _randomChar() {
      return StringWrapper.fromCharCode(97 + Math.floor(Math.random() * 25));
    }
    var PLATFORM_INITIALIZER = new OpaqueToken('Platform Initializer');
    var APP_BOOTSTRAP_LISTENER = new OpaqueToken('appBootstrapListener');
    var PACKAGE_ROOT_URL = new OpaqueToken('Application Packages Root URL');
    var Console = (function() {
      function Console() {}
      Console.prototype.log = function(message) {
        print(message);
      };
      Console.prototype.warn = function(message) {
        warn(message);
      };
      Console.decorators = [{type: Injectable}];
      Console.ctorParameters = [];
      return Console;
    }());
    var __extends$4 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ComponentStillLoadingError = (function(_super) {
      __extends$4(ComponentStillLoadingError, _super);
      function ComponentStillLoadingError(compType) {
        _super.call(this, "Can't compile synchronously as " + stringify(compType) + " is still being loaded!");
        this.compType = compType;
      }
      return ComponentStillLoadingError;
    }(BaseError));
    var ModuleWithComponentFactories = (function() {
      function ModuleWithComponentFactories(ngModuleFactory, componentFactories) {
        this.ngModuleFactory = ngModuleFactory;
        this.componentFactories = componentFactories;
      }
      return ModuleWithComponentFactories;
    }());
    function _throwError() {
      throw new Error("Runtime compiler is not loaded");
    }
    var Compiler = (function() {
      function Compiler() {}
      Compiler.prototype.compileModuleSync = function(moduleType) {
        throw _throwError();
      };
      Compiler.prototype.compileModuleAsync = function(moduleType) {
        throw _throwError();
      };
      Compiler.prototype.compileModuleAndAllComponentsSync = function(moduleType) {
        throw _throwError();
      };
      Compiler.prototype.compileModuleAndAllComponentsAsync = function(moduleType) {
        throw _throwError();
      };
      Compiler.prototype.clearCache = function() {};
      Compiler.prototype.clearCacheFor = function(type) {};
      return Compiler;
    }());
    var COMPILER_OPTIONS = new OpaqueToken('compilerOptions');
    var CompilerFactory = (function() {
      function CompilerFactory() {}
      return CompilerFactory;
    }());
    var DefaultIterableDifferFactory = (function() {
      function DefaultIterableDifferFactory() {}
      DefaultIterableDifferFactory.prototype.supports = function(obj) {
        return isListLikeIterable(obj);
      };
      DefaultIterableDifferFactory.prototype.create = function(cdRef, trackByFn) {
        return new DefaultIterableDiffer(trackByFn);
      };
      return DefaultIterableDifferFactory;
    }());
    var trackByIdentity = function(index, item) {
      return item;
    };
    var DefaultIterableDiffer = (function() {
      function DefaultIterableDiffer(_trackByFn) {
        this._trackByFn = _trackByFn;
        this._length = null;
        this._collection = null;
        this._linkedRecords = null;
        this._unlinkedRecords = null;
        this._previousItHead = null;
        this._itHead = null;
        this._itTail = null;
        this._additionsHead = null;
        this._additionsTail = null;
        this._movesHead = null;
        this._movesTail = null;
        this._removalsHead = null;
        this._removalsTail = null;
        this._identityChangesHead = null;
        this._identityChangesTail = null;
        this._trackByFn = isPresent(this._trackByFn) ? this._trackByFn : trackByIdentity;
      }
      Object.defineProperty(DefaultIterableDiffer.prototype, "collection", {
        get: function() {
          return this._collection;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(DefaultIterableDiffer.prototype, "length", {
        get: function() {
          return this._length;
        },
        enumerable: true,
        configurable: true
      });
      DefaultIterableDiffer.prototype.forEachItem = function(fn) {
        var record;
        for (record = this._itHead; record !== null; record = record._next) {
          fn(record);
        }
      };
      DefaultIterableDiffer.prototype.forEachOperation = function(fn) {
        var nextIt = this._itHead;
        var nextRemove = this._removalsHead;
        var addRemoveOffset = 0;
        var moveOffsets = null;
        while (nextIt || nextRemove) {
          var record = !nextRemove || nextIt && nextIt.currentIndex < getPreviousIndex(nextRemove, addRemoveOffset, moveOffsets) ? nextIt : nextRemove;
          var adjPreviousIndex = getPreviousIndex(record, addRemoveOffset, moveOffsets);
          var currentIndex = record.currentIndex;
          if (record === nextRemove) {
            addRemoveOffset--;
            nextRemove = nextRemove._nextRemoved;
          } else {
            nextIt = nextIt._next;
            if (record.previousIndex == null) {
              addRemoveOffset++;
            } else {
              if (!moveOffsets)
                moveOffsets = [];
              var localMovePreviousIndex = adjPreviousIndex - addRemoveOffset;
              var localCurrentIndex = currentIndex - addRemoveOffset;
              if (localMovePreviousIndex != localCurrentIndex) {
                for (var i = 0; i < localMovePreviousIndex; i++) {
                  var offset = i < moveOffsets.length ? moveOffsets[i] : (moveOffsets[i] = 0);
                  var index = offset + i;
                  if (localCurrentIndex <= index && index < localMovePreviousIndex) {
                    moveOffsets[i] = offset + 1;
                  }
                }
                var previousIndex = record.previousIndex;
                moveOffsets[previousIndex] = localCurrentIndex - localMovePreviousIndex;
              }
            }
          }
          if (adjPreviousIndex !== currentIndex) {
            fn(record, adjPreviousIndex, currentIndex);
          }
        }
      };
      DefaultIterableDiffer.prototype.forEachPreviousItem = function(fn) {
        var record;
        for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
          fn(record);
        }
      };
      DefaultIterableDiffer.prototype.forEachAddedItem = function(fn) {
        var record;
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
          fn(record);
        }
      };
      DefaultIterableDiffer.prototype.forEachMovedItem = function(fn) {
        var record;
        for (record = this._movesHead; record !== null; record = record._nextMoved) {
          fn(record);
        }
      };
      DefaultIterableDiffer.prototype.forEachRemovedItem = function(fn) {
        var record;
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
          fn(record);
        }
      };
      DefaultIterableDiffer.prototype.forEachIdentityChange = function(fn) {
        var record;
        for (record = this._identityChangesHead; record !== null; record = record._nextIdentityChange) {
          fn(record);
        }
      };
      DefaultIterableDiffer.prototype.diff = function(collection) {
        if (isBlank(collection))
          collection = [];
        if (!isListLikeIterable(collection)) {
          throw new Error("Error trying to diff '" + collection + "'");
        }
        if (this.check(collection)) {
          return this;
        } else {
          return null;
        }
      };
      DefaultIterableDiffer.prototype.onDestroy = function() {};
      DefaultIterableDiffer.prototype.check = function(collection) {
        var _this = this;
        this._reset();
        var record = this._itHead;
        var mayBeDirty = false;
        var index;
        var item;
        var itemTrackBy;
        if (isArray(collection)) {
          var list = collection;
          this._length = collection.length;
          for (index = 0; index < this._length; index++) {
            item = list[index];
            itemTrackBy = this._trackByFn(index, item);
            if (record === null || !looseIdentical(record.trackById, itemTrackBy)) {
              record = this._mismatch(record, item, itemTrackBy, index);
              mayBeDirty = true;
            } else {
              if (mayBeDirty) {
                record = this._verifyReinsertion(record, item, itemTrackBy, index);
              }
              if (!looseIdentical(record.item, item))
                this._addIdentityChange(record, item);
            }
            record = record._next;
          }
        } else {
          index = 0;
          iterateListLike(collection, function(item) {
            itemTrackBy = _this._trackByFn(index, item);
            if (record === null || !looseIdentical(record.trackById, itemTrackBy)) {
              record = _this._mismatch(record, item, itemTrackBy, index);
              mayBeDirty = true;
            } else {
              if (mayBeDirty) {
                record = _this._verifyReinsertion(record, item, itemTrackBy, index);
              }
              if (!looseIdentical(record.item, item))
                _this._addIdentityChange(record, item);
            }
            record = record._next;
            index++;
          });
          this._length = index;
        }
        this._truncate(record);
        this._collection = collection;
        return this.isDirty;
      };
      Object.defineProperty(DefaultIterableDiffer.prototype, "isDirty", {
        get: function() {
          return this._additionsHead !== null || this._movesHead !== null || this._removalsHead !== null || this._identityChangesHead !== null;
        },
        enumerable: true,
        configurable: true
      });
      DefaultIterableDiffer.prototype._reset = function() {
        if (this.isDirty) {
          var record;
          var nextRecord;
          for (record = this._previousItHead = this._itHead; record !== null; record = record._next) {
            record._nextPrevious = record._next;
          }
          for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            record.previousIndex = record.currentIndex;
          }
          this._additionsHead = this._additionsTail = null;
          for (record = this._movesHead; record !== null; record = nextRecord) {
            record.previousIndex = record.currentIndex;
            nextRecord = record._nextMoved;
          }
          this._movesHead = this._movesTail = null;
          this._removalsHead = this._removalsTail = null;
          this._identityChangesHead = this._identityChangesTail = null;
        }
      };
      DefaultIterableDiffer.prototype._mismatch = function(record, item, itemTrackBy, index) {
        var previousRecord;
        if (record === null) {
          previousRecord = this._itTail;
        } else {
          previousRecord = record._prev;
          this._remove(record);
        }
        record = this._linkedRecords === null ? null : this._linkedRecords.get(itemTrackBy, index);
        if (record !== null) {
          if (!looseIdentical(record.item, item))
            this._addIdentityChange(record, item);
          this._moveAfter(record, previousRecord, index);
        } else {
          record = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
          if (record !== null) {
            if (!looseIdentical(record.item, item))
              this._addIdentityChange(record, item);
            this._reinsertAfter(record, previousRecord, index);
          } else {
            record = this._addAfter(new CollectionChangeRecord(item, itemTrackBy), previousRecord, index);
          }
        }
        return record;
      };
      DefaultIterableDiffer.prototype._verifyReinsertion = function(record, item, itemTrackBy, index) {
        var reinsertRecord = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
        if (reinsertRecord !== null) {
          record = this._reinsertAfter(reinsertRecord, record._prev, index);
        } else if (record.currentIndex != index) {
          record.currentIndex = index;
          this._addToMoves(record, index);
        }
        return record;
      };
      DefaultIterableDiffer.prototype._truncate = function(record) {
        while (record !== null) {
          var nextRecord = record._next;
          this._addToRemovals(this._unlink(record));
          record = nextRecord;
        }
        if (this._unlinkedRecords !== null) {
          this._unlinkedRecords.clear();
        }
        if (this._additionsTail !== null) {
          this._additionsTail._nextAdded = null;
        }
        if (this._movesTail !== null) {
          this._movesTail._nextMoved = null;
        }
        if (this._itTail !== null) {
          this._itTail._next = null;
        }
        if (this._removalsTail !== null) {
          this._removalsTail._nextRemoved = null;
        }
        if (this._identityChangesTail !== null) {
          this._identityChangesTail._nextIdentityChange = null;
        }
      };
      DefaultIterableDiffer.prototype._reinsertAfter = function(record, prevRecord, index) {
        if (this._unlinkedRecords !== null) {
          this._unlinkedRecords.remove(record);
        }
        var prev = record._prevRemoved;
        var next = record._nextRemoved;
        if (prev === null) {
          this._removalsHead = next;
        } else {
          prev._nextRemoved = next;
        }
        if (next === null) {
          this._removalsTail = prev;
        } else {
          next._prevRemoved = prev;
        }
        this._insertAfter(record, prevRecord, index);
        this._addToMoves(record, index);
        return record;
      };
      DefaultIterableDiffer.prototype._moveAfter = function(record, prevRecord, index) {
        this._unlink(record);
        this._insertAfter(record, prevRecord, index);
        this._addToMoves(record, index);
        return record;
      };
      DefaultIterableDiffer.prototype._addAfter = function(record, prevRecord, index) {
        this._insertAfter(record, prevRecord, index);
        if (this._additionsTail === null) {
          this._additionsTail = this._additionsHead = record;
        } else {
          this._additionsTail = this._additionsTail._nextAdded = record;
        }
        return record;
      };
      DefaultIterableDiffer.prototype._insertAfter = function(record, prevRecord, index) {
        var next = prevRecord === null ? this._itHead : prevRecord._next;
        record._next = next;
        record._prev = prevRecord;
        if (next === null) {
          this._itTail = record;
        } else {
          next._prev = record;
        }
        if (prevRecord === null) {
          this._itHead = record;
        } else {
          prevRecord._next = record;
        }
        if (this._linkedRecords === null) {
          this._linkedRecords = new _DuplicateMap();
        }
        this._linkedRecords.put(record);
        record.currentIndex = index;
        return record;
      };
      DefaultIterableDiffer.prototype._remove = function(record) {
        return this._addToRemovals(this._unlink(record));
      };
      DefaultIterableDiffer.prototype._unlink = function(record) {
        if (this._linkedRecords !== null) {
          this._linkedRecords.remove(record);
        }
        var prev = record._prev;
        var next = record._next;
        if (prev === null) {
          this._itHead = next;
        } else {
          prev._next = next;
        }
        if (next === null) {
          this._itTail = prev;
        } else {
          next._prev = prev;
        }
        return record;
      };
      DefaultIterableDiffer.prototype._addToMoves = function(record, toIndex) {
        if (record.previousIndex === toIndex) {
          return record;
        }
        if (this._movesTail === null) {
          this._movesTail = this._movesHead = record;
        } else {
          this._movesTail = this._movesTail._nextMoved = record;
        }
        return record;
      };
      DefaultIterableDiffer.prototype._addToRemovals = function(record) {
        if (this._unlinkedRecords === null) {
          this._unlinkedRecords = new _DuplicateMap();
        }
        this._unlinkedRecords.put(record);
        record.currentIndex = null;
        record._nextRemoved = null;
        if (this._removalsTail === null) {
          this._removalsTail = this._removalsHead = record;
          record._prevRemoved = null;
        } else {
          record._prevRemoved = this._removalsTail;
          this._removalsTail = this._removalsTail._nextRemoved = record;
        }
        return record;
      };
      DefaultIterableDiffer.prototype._addIdentityChange = function(record, item) {
        record.item = item;
        if (this._identityChangesTail === null) {
          this._identityChangesTail = this._identityChangesHead = record;
        } else {
          this._identityChangesTail = this._identityChangesTail._nextIdentityChange = record;
        }
        return record;
      };
      DefaultIterableDiffer.prototype.toString = function() {
        var list = [];
        this.forEachItem(function(record) {
          return list.push(record);
        });
        var previous = [];
        this.forEachPreviousItem(function(record) {
          return previous.push(record);
        });
        var additions = [];
        this.forEachAddedItem(function(record) {
          return additions.push(record);
        });
        var moves = [];
        this.forEachMovedItem(function(record) {
          return moves.push(record);
        });
        var removals = [];
        this.forEachRemovedItem(function(record) {
          return removals.push(record);
        });
        var identityChanges = [];
        this.forEachIdentityChange(function(record) {
          return identityChanges.push(record);
        });
        return 'collection: ' + list.join(', ') + '\n' + 'previous: ' + previous.join(', ') + '\n' + 'additions: ' + additions.join(', ') + '\n' + 'moves: ' + moves.join(', ') + '\n' + 'removals: ' + removals.join(', ') + '\n' + 'identityChanges: ' + identityChanges.join(', ') + '\n';
      };
      return DefaultIterableDiffer;
    }());
    var CollectionChangeRecord = (function() {
      function CollectionChangeRecord(item, trackById) {
        this.item = item;
        this.trackById = trackById;
        this.currentIndex = null;
        this.previousIndex = null;
        this._nextPrevious = null;
        this._prev = null;
        this._next = null;
        this._prevDup = null;
        this._nextDup = null;
        this._prevRemoved = null;
        this._nextRemoved = null;
        this._nextAdded = null;
        this._nextMoved = null;
        this._nextIdentityChange = null;
      }
      CollectionChangeRecord.prototype.toString = function() {
        return this.previousIndex === this.currentIndex ? stringify(this.item) : stringify(this.item) + '[' + stringify(this.previousIndex) + '->' + stringify(this.currentIndex) + ']';
      };
      return CollectionChangeRecord;
    }());
    var _DuplicateItemRecordList = (function() {
      function _DuplicateItemRecordList() {
        this._head = null;
        this._tail = null;
      }
      _DuplicateItemRecordList.prototype.add = function(record) {
        if (this._head === null) {
          this._head = this._tail = record;
          record._nextDup = null;
          record._prevDup = null;
        } else {
          this._tail._nextDup = record;
          record._prevDup = this._tail;
          record._nextDup = null;
          this._tail = record;
        }
      };
      _DuplicateItemRecordList.prototype.get = function(trackById, afterIndex) {
        var record;
        for (record = this._head; record !== null; record = record._nextDup) {
          if ((afterIndex === null || afterIndex < record.currentIndex) && looseIdentical(record.trackById, trackById)) {
            return record;
          }
        }
        return null;
      };
      _DuplicateItemRecordList.prototype.remove = function(record) {
        var prev = record._prevDup;
        var next = record._nextDup;
        if (prev === null) {
          this._head = next;
        } else {
          prev._nextDup = next;
        }
        if (next === null) {
          this._tail = prev;
        } else {
          next._prevDup = prev;
        }
        return this._head === null;
      };
      return _DuplicateItemRecordList;
    }());
    var _DuplicateMap = (function() {
      function _DuplicateMap() {
        this.map = new Map();
      }
      _DuplicateMap.prototype.put = function(record) {
        var key = getMapKey(record.trackById);
        var duplicates = this.map.get(key);
        if (!isPresent(duplicates)) {
          duplicates = new _DuplicateItemRecordList();
          this.map.set(key, duplicates);
        }
        duplicates.add(record);
      };
      _DuplicateMap.prototype.get = function(trackById, afterIndex) {
        if (afterIndex === void 0) {
          afterIndex = null;
        }
        var key = getMapKey(trackById);
        var recordList = this.map.get(key);
        return recordList ? recordList.get(trackById, afterIndex) : null;
      };
      _DuplicateMap.prototype.remove = function(record) {
        var key = getMapKey(record.trackById);
        var recordList = this.map.get(key);
        if (recordList.remove(record)) {
          this.map.delete(key);
        }
        return record;
      };
      Object.defineProperty(_DuplicateMap.prototype, "isEmpty", {
        get: function() {
          return this.map.size === 0;
        },
        enumerable: true,
        configurable: true
      });
      _DuplicateMap.prototype.clear = function() {
        this.map.clear();
      };
      _DuplicateMap.prototype.toString = function() {
        return '_DuplicateMap(' + stringify(this.map) + ')';
      };
      return _DuplicateMap;
    }());
    function getPreviousIndex(item, addRemoveOffset, moveOffsets) {
      var previousIndex = item.previousIndex;
      if (previousIndex === null)
        return previousIndex;
      var moveOffset = 0;
      if (moveOffsets && previousIndex < moveOffsets.length) {
        moveOffset = moveOffsets[previousIndex];
      }
      return previousIndex + addRemoveOffset + moveOffset;
    }
    var DefaultKeyValueDifferFactory = (function() {
      function DefaultKeyValueDifferFactory() {}
      DefaultKeyValueDifferFactory.prototype.supports = function(obj) {
        return obj instanceof Map || isJsObject(obj);
      };
      DefaultKeyValueDifferFactory.prototype.create = function(cdRef) {
        return new DefaultKeyValueDiffer();
      };
      return DefaultKeyValueDifferFactory;
    }());
    var DefaultKeyValueDiffer = (function() {
      function DefaultKeyValueDiffer() {
        this._records = new Map();
        this._mapHead = null;
        this._previousMapHead = null;
        this._changesHead = null;
        this._changesTail = null;
        this._additionsHead = null;
        this._additionsTail = null;
        this._removalsHead = null;
        this._removalsTail = null;
      }
      Object.defineProperty(DefaultKeyValueDiffer.prototype, "isDirty", {
        get: function() {
          return this._additionsHead !== null || this._changesHead !== null || this._removalsHead !== null;
        },
        enumerable: true,
        configurable: true
      });
      DefaultKeyValueDiffer.prototype.forEachItem = function(fn) {
        var record;
        for (record = this._mapHead; record !== null; record = record._next) {
          fn(record);
        }
      };
      DefaultKeyValueDiffer.prototype.forEachPreviousItem = function(fn) {
        var record;
        for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
          fn(record);
        }
      };
      DefaultKeyValueDiffer.prototype.forEachChangedItem = function(fn) {
        var record;
        for (record = this._changesHead; record !== null; record = record._nextChanged) {
          fn(record);
        }
      };
      DefaultKeyValueDiffer.prototype.forEachAddedItem = function(fn) {
        var record;
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
          fn(record);
        }
      };
      DefaultKeyValueDiffer.prototype.forEachRemovedItem = function(fn) {
        var record;
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
          fn(record);
        }
      };
      DefaultKeyValueDiffer.prototype.diff = function(map) {
        if (!map) {
          map = new Map();
        } else if (!(map instanceof Map || isJsObject(map))) {
          throw new Error("Error trying to diff '" + map + "'");
        }
        return this.check(map) ? this : null;
      };
      DefaultKeyValueDiffer.prototype.onDestroy = function() {};
      DefaultKeyValueDiffer.prototype.check = function(map) {
        var _this = this;
        this._reset();
        var records = this._records;
        var oldSeqRecord = this._mapHead;
        var lastOldSeqRecord = null;
        var lastNewSeqRecord = null;
        var seqChanged = false;
        this._forEach(map, function(value, key) {
          var newSeqRecord;
          if (oldSeqRecord && key === oldSeqRecord.key) {
            newSeqRecord = oldSeqRecord;
            _this._maybeAddToChanges(newSeqRecord, value);
          } else {
            seqChanged = true;
            if (oldSeqRecord !== null) {
              _this._removeFromSeq(lastOldSeqRecord, oldSeqRecord);
              _this._addToRemovals(oldSeqRecord);
            }
            if (records.has(key)) {
              newSeqRecord = records.get(key);
              _this._maybeAddToChanges(newSeqRecord, value);
            } else {
              newSeqRecord = new KeyValueChangeRecord(key);
              records.set(key, newSeqRecord);
              newSeqRecord.currentValue = value;
              _this._addToAdditions(newSeqRecord);
            }
          }
          if (seqChanged) {
            if (_this._isInRemovals(newSeqRecord)) {
              _this._removeFromRemovals(newSeqRecord);
            }
            if (lastNewSeqRecord == null) {
              _this._mapHead = newSeqRecord;
            } else {
              lastNewSeqRecord._next = newSeqRecord;
            }
          }
          lastOldSeqRecord = oldSeqRecord;
          lastNewSeqRecord = newSeqRecord;
          oldSeqRecord = oldSeqRecord && oldSeqRecord._next;
        });
        this._truncate(lastOldSeqRecord, oldSeqRecord);
        return this.isDirty;
      };
      DefaultKeyValueDiffer.prototype._reset = function() {
        if (this.isDirty) {
          var record = void 0;
          for (record = this._previousMapHead = this._mapHead; record !== null; record = record._next) {
            record._nextPrevious = record._next;
          }
          for (record = this._changesHead; record !== null; record = record._nextChanged) {
            record.previousValue = record.currentValue;
          }
          for (record = this._additionsHead; record != null; record = record._nextAdded) {
            record.previousValue = record.currentValue;
          }
          this._changesHead = this._changesTail = null;
          this._additionsHead = this._additionsTail = null;
          this._removalsHead = this._removalsTail = null;
        }
      };
      DefaultKeyValueDiffer.prototype._truncate = function(lastRecord, record) {
        while (record !== null) {
          if (lastRecord === null) {
            this._mapHead = null;
          } else {
            lastRecord._next = null;
          }
          var nextRecord = record._next;
          this._addToRemovals(record);
          lastRecord = record;
          record = nextRecord;
        }
        for (var rec = this._removalsHead; rec !== null; rec = rec._nextRemoved) {
          rec.previousValue = rec.currentValue;
          rec.currentValue = null;
          this._records.delete(rec.key);
        }
      };
      DefaultKeyValueDiffer.prototype._maybeAddToChanges = function(record, newValue) {
        if (!looseIdentical(newValue, record.currentValue)) {
          record.previousValue = record.currentValue;
          record.currentValue = newValue;
          this._addToChanges(record);
        }
      };
      DefaultKeyValueDiffer.prototype._isInRemovals = function(record) {
        return record === this._removalsHead || record._nextRemoved !== null || record._prevRemoved !== null;
      };
      DefaultKeyValueDiffer.prototype._addToRemovals = function(record) {
        if (this._removalsHead === null) {
          this._removalsHead = this._removalsTail = record;
        } else {
          this._removalsTail._nextRemoved = record;
          record._prevRemoved = this._removalsTail;
          this._removalsTail = record;
        }
      };
      DefaultKeyValueDiffer.prototype._removeFromSeq = function(prev, record) {
        var next = record._next;
        if (prev === null) {
          this._mapHead = next;
        } else {
          prev._next = next;
        }
        record._next = null;
      };
      DefaultKeyValueDiffer.prototype._removeFromRemovals = function(record) {
        var prev = record._prevRemoved;
        var next = record._nextRemoved;
        if (prev === null) {
          this._removalsHead = next;
        } else {
          prev._nextRemoved = next;
        }
        if (next === null) {
          this._removalsTail = prev;
        } else {
          next._prevRemoved = prev;
        }
        record._prevRemoved = record._nextRemoved = null;
      };
      DefaultKeyValueDiffer.prototype._addToAdditions = function(record) {
        if (this._additionsHead === null) {
          this._additionsHead = this._additionsTail = record;
        } else {
          this._additionsTail._nextAdded = record;
          this._additionsTail = record;
        }
      };
      DefaultKeyValueDiffer.prototype._addToChanges = function(record) {
        if (this._changesHead === null) {
          this._changesHead = this._changesTail = record;
        } else {
          this._changesTail._nextChanged = record;
          this._changesTail = record;
        }
      };
      DefaultKeyValueDiffer.prototype.toString = function() {
        var items = [];
        var previous = [];
        var changes = [];
        var additions = [];
        var removals = [];
        var record;
        for (record = this._mapHead; record !== null; record = record._next) {
          items.push(stringify(record));
        }
        for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
          previous.push(stringify(record));
        }
        for (record = this._changesHead; record !== null; record = record._nextChanged) {
          changes.push(stringify(record));
        }
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
          additions.push(stringify(record));
        }
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
          removals.push(stringify(record));
        }
        return 'map: ' + items.join(', ') + '\n' + 'previous: ' + previous.join(', ') + '\n' + 'additions: ' + additions.join(', ') + '\n' + 'changes: ' + changes.join(', ') + '\n' + 'removals: ' + removals.join(', ') + '\n';
      };
      DefaultKeyValueDiffer.prototype._forEach = function(obj, fn) {
        if (obj instanceof Map) {
          obj.forEach(fn);
        } else {
          Object.keys(obj).forEach(function(k) {
            return fn(obj[k], k);
          });
        }
      };
      return DefaultKeyValueDiffer;
    }());
    var KeyValueChangeRecord = (function() {
      function KeyValueChangeRecord(key) {
        this.key = key;
        this.previousValue = null;
        this.currentValue = null;
        this._nextPrevious = null;
        this._next = null;
        this._nextAdded = null;
        this._nextRemoved = null;
        this._prevRemoved = null;
        this._nextChanged = null;
      }
      KeyValueChangeRecord.prototype.toString = function() {
        return looseIdentical(this.previousValue, this.currentValue) ? stringify(this.key) : (stringify(this.key) + '[' + stringify(this.previousValue) + '->' + stringify(this.currentValue) + ']');
      };
      return KeyValueChangeRecord;
    }());
    var IterableDiffers = (function() {
      function IterableDiffers(factories) {
        this.factories = factories;
      }
      IterableDiffers.create = function(factories, parent) {
        if (isPresent(parent)) {
          var copied = ListWrapper.clone(parent.factories);
          factories = factories.concat(copied);
          return new IterableDiffers(factories);
        } else {
          return new IterableDiffers(factories);
        }
      };
      IterableDiffers.extend = function(factories) {
        return {
          provide: IterableDiffers,
          useFactory: function(parent) {
            if (!parent) {
              throw new Error('Cannot extend IterableDiffers without a parent injector');
            }
            return IterableDiffers.create(factories, parent);
          },
          deps: [[IterableDiffers, new SkipSelf(), new Optional()]]
        };
      };
      IterableDiffers.prototype.find = function(iterable) {
        var factory = this.factories.find(function(f) {
          return f.supports(iterable);
        });
        if (isPresent(factory)) {
          return factory;
        } else {
          throw new Error("Cannot find a differ supporting object '" + iterable + "' of type '" + getTypeNameForDebugging(iterable) + "'");
        }
      };
      return IterableDiffers;
    }());
    var KeyValueDiffers = (function() {
      function KeyValueDiffers(factories) {
        this.factories = factories;
      }
      KeyValueDiffers.create = function(factories, parent) {
        if (isPresent(parent)) {
          var copied = ListWrapper.clone(parent.factories);
          factories = factories.concat(copied);
          return new KeyValueDiffers(factories);
        } else {
          return new KeyValueDiffers(factories);
        }
      };
      KeyValueDiffers.extend = function(factories) {
        return {
          provide: KeyValueDiffers,
          useFactory: function(parent) {
            if (!parent) {
              throw new Error('Cannot extend KeyValueDiffers without a parent injector');
            }
            return KeyValueDiffers.create(factories, parent);
          },
          deps: [[KeyValueDiffers, new SkipSelf(), new Optional()]]
        };
      };
      KeyValueDiffers.prototype.find = function(kv) {
        var factory = this.factories.find(function(f) {
          return f.supports(kv);
        });
        if (isPresent(factory)) {
          return factory;
        } else {
          throw new Error("Cannot find a differ supporting object '" + kv + "'");
        }
      };
      return KeyValueDiffers;
    }());
    var UNINITIALIZED = {toString: function() {
        return 'CD_INIT_VALUE';
      }};
    function devModeEqual(a, b) {
      if (isListLikeIterable(a) && isListLikeIterable(b)) {
        return areIterablesEqual(a, b, devModeEqual);
      } else if (!isListLikeIterable(a) && !isPrimitive(a) && !isListLikeIterable(b) && !isPrimitive(b)) {
        return true;
      } else {
        return looseIdentical(a, b);
      }
    }
    var WrappedValue = (function() {
      function WrappedValue(wrapped) {
        this.wrapped = wrapped;
      }
      WrappedValue.wrap = function(value) {
        return new WrappedValue(value);
      };
      return WrappedValue;
    }());
    var ValueUnwrapper = (function() {
      function ValueUnwrapper() {
        this.hasWrappedValue = false;
      }
      ValueUnwrapper.prototype.unwrap = function(value) {
        if (value instanceof WrappedValue) {
          this.hasWrappedValue = true;
          return value.wrapped;
        }
        return value;
      };
      ValueUnwrapper.prototype.reset = function() {
        this.hasWrappedValue = false;
      };
      return ValueUnwrapper;
    }());
    var SimpleChange = (function() {
      function SimpleChange(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
      }
      SimpleChange.prototype.isFirstChange = function() {
        return this.previousValue === UNINITIALIZED;
      };
      return SimpleChange;
    }());
    var ChangeDetectorRef = (function() {
      function ChangeDetectorRef() {}
      return ChangeDetectorRef;
    }());
    var keyValDiff = [new DefaultKeyValueDifferFactory()];
    var iterableDiff = [new DefaultIterableDifferFactory()];
    var defaultIterableDiffers = new IterableDiffers(iterableDiff);
    var defaultKeyValueDiffers = new KeyValueDiffers(keyValDiff);
    var RenderComponentType = (function() {
      function RenderComponentType(id, templateUrl, slotCount, encapsulation, styles, animations) {
        this.id = id;
        this.templateUrl = templateUrl;
        this.slotCount = slotCount;
        this.encapsulation = encapsulation;
        this.styles = styles;
        this.animations = animations;
      }
      return RenderComponentType;
    }());
    var RenderDebugInfo = (function() {
      function RenderDebugInfo() {}
      Object.defineProperty(RenderDebugInfo.prototype, "injector", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(RenderDebugInfo.prototype, "component", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(RenderDebugInfo.prototype, "providerTokens", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(RenderDebugInfo.prototype, "references", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(RenderDebugInfo.prototype, "context", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(RenderDebugInfo.prototype, "source", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      return RenderDebugInfo;
    }());
    var Renderer = (function() {
      function Renderer() {}
      return Renderer;
    }());
    var RootRenderer = (function() {
      function RootRenderer() {}
      return RootRenderer;
    }());
    exports.SecurityContext;
    (function(SecurityContext) {
      SecurityContext[SecurityContext["NONE"] = 0] = "NONE";
      SecurityContext[SecurityContext["HTML"] = 1] = "HTML";
      SecurityContext[SecurityContext["STYLE"] = 2] = "STYLE";
      SecurityContext[SecurityContext["SCRIPT"] = 3] = "SCRIPT";
      SecurityContext[SecurityContext["URL"] = 4] = "URL";
      SecurityContext[SecurityContext["RESOURCE_URL"] = 5] = "RESOURCE_URL";
    })(exports.SecurityContext || (exports.SecurityContext = {}));
    var Sanitizer = (function() {
      function Sanitizer() {}
      return Sanitizer;
    }());
    var ElementRef = (function() {
      function ElementRef(nativeElement) {
        this.nativeElement = nativeElement;
      }
      return ElementRef;
    }());
    var trace;
    var events;
    function detectWTF() {
      var wtf = global$1['wtf'];
      if (wtf) {
        trace = wtf['trace'];
        if (trace) {
          events = trace['events'];
          return true;
        }
      }
      return false;
    }
    function createScope(signature, flags) {
      if (flags === void 0) {
        flags = null;
      }
      return events.createScope(signature, flags);
    }
    function leave(scope, returnValue) {
      trace.leaveScope(scope, returnValue);
      return returnValue;
    }
    function startTimeRange(rangeType, action) {
      return trace.beginTimeRange(rangeType, action);
    }
    function endTimeRange(range) {
      trace.endTimeRange(range);
    }
    var wtfEnabled = detectWTF();
    function noopScope(arg0, arg1) {
      return null;
    }
    var wtfCreateScope = wtfEnabled ? createScope : function(signature, flags) {
      return noopScope;
    };
    var wtfLeave = wtfEnabled ? leave : function(s, r) {
      return r;
    };
    var wtfStartTimeRange = wtfEnabled ? startTimeRange : function(rangeType, action) {
      return null;
    };
    var wtfEndTimeRange = wtfEnabled ? endTimeRange : function(r) {
      return null;
    };
    var ViewContainerRef = (function() {
      function ViewContainerRef() {}
      Object.defineProperty(ViewContainerRef.prototype, "element", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ViewContainerRef.prototype, "injector", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ViewContainerRef.prototype, "parentInjector", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ViewContainerRef.prototype, "length", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      ;
      return ViewContainerRef;
    }());
    var ViewContainerRef_ = (function() {
      function ViewContainerRef_(_element) {
        this._element = _element;
        this._createComponentInContainerScope = wtfCreateScope('ViewContainerRef#createComponent()');
        this._insertScope = wtfCreateScope('ViewContainerRef#insert()');
        this._removeScope = wtfCreateScope('ViewContainerRef#remove()');
        this._detachScope = wtfCreateScope('ViewContainerRef#detach()');
      }
      ViewContainerRef_.prototype.get = function(index) {
        return this._element.nestedViews[index].ref;
      };
      Object.defineProperty(ViewContainerRef_.prototype, "length", {
        get: function() {
          var views = this._element.nestedViews;
          return isPresent(views) ? views.length : 0;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ViewContainerRef_.prototype, "element", {
        get: function() {
          return this._element.elementRef;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ViewContainerRef_.prototype, "injector", {
        get: function() {
          return this._element.injector;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ViewContainerRef_.prototype, "parentInjector", {
        get: function() {
          return this._element.parentInjector;
        },
        enumerable: true,
        configurable: true
      });
      ViewContainerRef_.prototype.createEmbeddedView = function(templateRef, context, index) {
        if (context === void 0) {
          context = null;
        }
        if (index === void 0) {
          index = -1;
        }
        var viewRef = templateRef.createEmbeddedView(context);
        this.insert(viewRef, index);
        return viewRef;
      };
      ViewContainerRef_.prototype.createComponent = function(componentFactory, index, injector, projectableNodes) {
        if (index === void 0) {
          index = -1;
        }
        if (injector === void 0) {
          injector = null;
        }
        if (projectableNodes === void 0) {
          projectableNodes = null;
        }
        var s = this._createComponentInContainerScope();
        var contextInjector = isPresent(injector) ? injector : this._element.parentInjector;
        var componentRef = componentFactory.create(contextInjector, projectableNodes);
        this.insert(componentRef.hostView, index);
        return wtfLeave(s, componentRef);
      };
      ViewContainerRef_.prototype.insert = function(viewRef, index) {
        if (index === void 0) {
          index = -1;
        }
        var s = this._insertScope();
        if (index == -1)
          index = this.length;
        var viewRef_ = viewRef;
        this._element.attachView(viewRef_.internalView, index);
        return wtfLeave(s, viewRef_);
      };
      ViewContainerRef_.prototype.move = function(viewRef, currentIndex) {
        var s = this._insertScope();
        if (currentIndex == -1)
          return;
        var viewRef_ = viewRef;
        this._element.moveView(viewRef_.internalView, currentIndex);
        return wtfLeave(s, viewRef_);
      };
      ViewContainerRef_.prototype.indexOf = function(viewRef) {
        return ListWrapper.indexOf(this._element.nestedViews, viewRef.internalView);
      };
      ViewContainerRef_.prototype.remove = function(index) {
        if (index === void 0) {
          index = -1;
        }
        var s = this._removeScope();
        if (index == -1)
          index = this.length - 1;
        var view = this._element.detachView(index);
        view.destroy();
        wtfLeave(s);
      };
      ViewContainerRef_.prototype.detach = function(index) {
        if (index === void 0) {
          index = -1;
        }
        var s = this._detachScope();
        if (index == -1)
          index = this.length - 1;
        var view = this._element.detachView(index);
        return wtfLeave(s, view.ref);
      };
      ViewContainerRef_.prototype.clear = function() {
        for (var i = this.length - 1; i >= 0; i--) {
          this.remove(i);
        }
      };
      return ViewContainerRef_;
    }());
    var ViewType;
    (function(ViewType) {
      ViewType[ViewType["HOST"] = 0] = "HOST";
      ViewType[ViewType["COMPONENT"] = 1] = "COMPONENT";
      ViewType[ViewType["EMBEDDED"] = 2] = "EMBEDDED";
    })(ViewType || (ViewType = {}));
    var AppElement = (function() {
      function AppElement(index, parentIndex, parentView, nativeElement) {
        this.index = index;
        this.parentIndex = parentIndex;
        this.parentView = parentView;
        this.nativeElement = nativeElement;
        this.nestedViews = null;
        this.componentView = null;
      }
      Object.defineProperty(AppElement.prototype, "elementRef", {
        get: function() {
          return new ElementRef(this.nativeElement);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AppElement.prototype, "vcRef", {
        get: function() {
          return new ViewContainerRef_(this);
        },
        enumerable: true,
        configurable: true
      });
      AppElement.prototype.initComponent = function(component, componentConstructorViewQueries, view) {
        this.component = component;
        this.componentConstructorViewQueries = componentConstructorViewQueries;
        this.componentView = view;
      };
      Object.defineProperty(AppElement.prototype, "parentInjector", {
        get: function() {
          return this.parentView.injector(this.parentIndex);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AppElement.prototype, "injector", {
        get: function() {
          return this.parentView.injector(this.index);
        },
        enumerable: true,
        configurable: true
      });
      AppElement.prototype.mapNestedViews = function(nestedViewClass, callback) {
        var result = [];
        if (isPresent(this.nestedViews)) {
          this.nestedViews.forEach(function(nestedView) {
            if (nestedView.clazz === nestedViewClass) {
              result.push(callback(nestedView));
            }
          });
        }
        return result;
      };
      AppElement.prototype.moveView = function(view, currentIndex) {
        var previousIndex = this.nestedViews.indexOf(view);
        if (view.type === ViewType.COMPONENT) {
          throw new Error("Component views can't be moved!");
        }
        var nestedViews = this.nestedViews;
        if (nestedViews == null) {
          nestedViews = [];
          this.nestedViews = nestedViews;
        }
        ListWrapper.removeAt(nestedViews, previousIndex);
        ListWrapper.insert(nestedViews, currentIndex, view);
        var refRenderNode;
        if (currentIndex > 0) {
          var prevView = nestedViews[currentIndex - 1];
          refRenderNode = prevView.lastRootNode;
        } else {
          refRenderNode = this.nativeElement;
        }
        if (isPresent(refRenderNode)) {
          view.renderer.attachViewAfter(refRenderNode, view.flatRootNodes);
        }
        view.markContentChildAsMoved(this);
      };
      AppElement.prototype.attachView = function(view, viewIndex) {
        if (view.type === ViewType.COMPONENT) {
          throw new Error("Component views can't be moved!");
        }
        var nestedViews = this.nestedViews;
        if (nestedViews == null) {
          nestedViews = [];
          this.nestedViews = nestedViews;
        }
        ListWrapper.insert(nestedViews, viewIndex, view);
        var refRenderNode;
        if (viewIndex > 0) {
          var prevView = nestedViews[viewIndex - 1];
          refRenderNode = prevView.lastRootNode;
        } else {
          refRenderNode = this.nativeElement;
        }
        if (isPresent(refRenderNode)) {
          view.renderer.attachViewAfter(refRenderNode, view.flatRootNodes);
        }
        view.addToContentChildren(this);
      };
      AppElement.prototype.detachView = function(viewIndex) {
        var view = ListWrapper.removeAt(this.nestedViews, viewIndex);
        if (view.type === ViewType.COMPONENT) {
          throw new Error("Component views can't be moved!");
        }
        view.detach();
        view.removeFromContentChildren(this);
        return view;
      };
      return AppElement;
    }());
    var __extends$6 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ExpressionChangedAfterItHasBeenCheckedError = (function(_super) {
      __extends$6(ExpressionChangedAfterItHasBeenCheckedError, _super);
      function ExpressionChangedAfterItHasBeenCheckedError(oldValue, currValue) {
        var msg = "Expression has changed after it was checked. Previous value: '" + oldValue + "'. Current value: '" + currValue + "'.";
        if (oldValue === UNINITIALIZED) {
          msg += " It seems like the view has been created after its parent and its children have been dirty checked." + " Has it been created in a change detection hook ?";
        }
        _super.call(this, msg);
      }
      return ExpressionChangedAfterItHasBeenCheckedError;
    }(BaseError));
    var ViewWrappedError = (function(_super) {
      __extends$6(ViewWrappedError, _super);
      function ViewWrappedError(originalError, context) {
        _super.call(this, "Error in " + context.source, originalError);
        this.context = context;
      }
      return ViewWrappedError;
    }(WrappedError));
    var ViewDestroyedError = (function(_super) {
      __extends$6(ViewDestroyedError, _super);
      function ViewDestroyedError(details) {
        _super.call(this, "Attempt to use a destroyed view: " + details);
      }
      return ViewDestroyedError;
    }(BaseError));
    var ViewUtils = (function() {
      function ViewUtils(_renderer, _appId, sanitizer) {
        this._renderer = _renderer;
        this._appId = _appId;
        this._nextCompTypeId = 0;
        this.sanitizer = sanitizer;
      }
      ViewUtils.prototype.createRenderComponentType = function(templateUrl, slotCount, encapsulation, styles, animations) {
        return new RenderComponentType(this._appId + "-" + this._nextCompTypeId++, templateUrl, slotCount, encapsulation, styles, animations);
      };
      ViewUtils.prototype.renderComponent = function(renderComponentType) {
        return this._renderer.renderComponent(renderComponentType);
      };
      ViewUtils.decorators = [{type: Injectable}];
      ViewUtils.ctorParameters = [{type: RootRenderer}, {
        type: undefined,
        decorators: [{
          type: Inject,
          args: [APP_ID]
        }]
      }, {type: Sanitizer}];
      return ViewUtils;
    }());
    function flattenNestedViewRenderNodes(nodes) {
      return _flattenNestedViewRenderNodes(nodes, []);
    }
    function _flattenNestedViewRenderNodes(nodes, renderNodes) {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (node instanceof AppElement) {
          var appEl = node;
          renderNodes.push(appEl.nativeElement);
          if (isPresent(appEl.nestedViews)) {
            for (var k = 0; k < appEl.nestedViews.length; k++) {
              _flattenNestedViewRenderNodes(appEl.nestedViews[k].rootNodesOrAppElements, renderNodes);
            }
          }
        } else {
          renderNodes.push(node);
        }
      }
      return renderNodes;
    }
    var EMPTY_ARR = [];
    function ensureSlotCount(projectableNodes, expectedSlotCount) {
      var res;
      if (!projectableNodes) {
        res = EMPTY_ARR;
      } else if (projectableNodes.length < expectedSlotCount) {
        var givenSlotCount = projectableNodes.length;
        res = new Array(expectedSlotCount);
        for (var i = 0; i < expectedSlotCount; i++) {
          res[i] = (i < givenSlotCount) ? projectableNodes[i] : EMPTY_ARR;
        }
      } else {
        res = projectableNodes;
      }
      return res;
    }
    var MAX_INTERPOLATION_VALUES = 9;
    function interpolate(valueCount, c0, a1, c1, a2, c2, a3, c3, a4, c4, a5, c5, a6, c6, a7, c7, a8, c8, a9, c9) {
      switch (valueCount) {
        case 1:
          return c0 + _toStringWithNull(a1) + c1;
        case 2:
          return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2;
        case 3:
          return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3;
        case 4:
          return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4;
        case 5:
          return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5;
        case 6:
          return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6;
        case 7:
          return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6 + _toStringWithNull(a7) + c7;
        case 8:
          return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8;
        case 9:
          return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8 + _toStringWithNull(a9) + c9;
        default:
          throw new Error("Does not support more than 9 expressions");
      }
    }
    function _toStringWithNull(v) {
      return v != null ? v.toString() : '';
    }
    function checkBinding(throwOnChange, oldValue, newValue) {
      if (throwOnChange) {
        if (!devModeEqual(oldValue, newValue)) {
          throw new ExpressionChangedAfterItHasBeenCheckedError(oldValue, newValue);
        }
        return false;
      } else {
        return !looseIdentical(oldValue, newValue);
      }
    }
    function castByValue(input, value) {
      return input;
    }
    var EMPTY_ARRAY = [];
    var EMPTY_MAP = {};
    function pureProxy1(fn) {
      var result;
      var v0 = UNINITIALIZED;
      return function(p0) {
        if (!looseIdentical(v0, p0)) {
          v0 = p0;
          result = fn(p0);
        }
        return result;
      };
    }
    function pureProxy2(fn) {
      var result;
      var v0 = UNINITIALIZED;
      var v1 = UNINITIALIZED;
      return function(p0, p1) {
        if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1)) {
          v0 = p0;
          v1 = p1;
          result = fn(p0, p1);
        }
        return result;
      };
    }
    function pureProxy3(fn) {
      var result;
      var v0 = UNINITIALIZED;
      var v1 = UNINITIALIZED;
      var v2 = UNINITIALIZED;
      return function(p0, p1, p2) {
        if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2)) {
          v0 = p0;
          v1 = p1;
          v2 = p2;
          result = fn(p0, p1, p2);
        }
        return result;
      };
    }
    function pureProxy4(fn) {
      var result;
      var v0,
          v1,
          v2,
          v3;
      v0 = v1 = v2 = v3 = UNINITIALIZED;
      return function(p0, p1, p2, p3) {
        if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) || !looseIdentical(v3, p3)) {
          v0 = p0;
          v1 = p1;
          v2 = p2;
          v3 = p3;
          result = fn(p0, p1, p2, p3);
        }
        return result;
      };
    }
    function pureProxy5(fn) {
      var result;
      var v0,
          v1,
          v2,
          v3,
          v4;
      v0 = v1 = v2 = v3 = v4 = UNINITIALIZED;
      return function(p0, p1, p2, p3, p4) {
        if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) || !looseIdentical(v3, p3) || !looseIdentical(v4, p4)) {
          v0 = p0;
          v1 = p1;
          v2 = p2;
          v3 = p3;
          v4 = p4;
          result = fn(p0, p1, p2, p3, p4);
        }
        return result;
      };
    }
    function pureProxy6(fn) {
      var result;
      var v0,
          v1,
          v2,
          v3,
          v4,
          v5;
      v0 = v1 = v2 = v3 = v4 = v5 = UNINITIALIZED;
      return function(p0, p1, p2, p3, p4, p5) {
        if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) || !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5)) {
          v0 = p0;
          v1 = p1;
          v2 = p2;
          v3 = p3;
          v4 = p4;
          v5 = p5;
          result = fn(p0, p1, p2, p3, p4, p5);
        }
        return result;
      };
    }
    function pureProxy7(fn) {
      var result;
      var v0,
          v1,
          v2,
          v3,
          v4,
          v5,
          v6;
      v0 = v1 = v2 = v3 = v4 = v5 = v6 = UNINITIALIZED;
      return function(p0, p1, p2, p3, p4, p5, p6) {
        if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) || !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5) || !looseIdentical(v6, p6)) {
          v0 = p0;
          v1 = p1;
          v2 = p2;
          v3 = p3;
          v4 = p4;
          v5 = p5;
          v6 = p6;
          result = fn(p0, p1, p2, p3, p4, p5, p6);
        }
        return result;
      };
    }
    function pureProxy8(fn) {
      var result;
      var v0,
          v1,
          v2,
          v3,
          v4,
          v5,
          v6,
          v7;
      v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = UNINITIALIZED;
      return function(p0, p1, p2, p3, p4, p5, p6, p7) {
        if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) || !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5) || !looseIdentical(v6, p6) || !looseIdentical(v7, p7)) {
          v0 = p0;
          v1 = p1;
          v2 = p2;
          v3 = p3;
          v4 = p4;
          v5 = p5;
          v6 = p6;
          v7 = p7;
          result = fn(p0, p1, p2, p3, p4, p5, p6, p7);
        }
        return result;
      };
    }
    function pureProxy9(fn) {
      var result;
      var v0,
          v1,
          v2,
          v3,
          v4,
          v5,
          v6,
          v7,
          v8;
      v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = v8 = UNINITIALIZED;
      return function(p0, p1, p2, p3, p4, p5, p6, p7, p8) {
        if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) || !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5) || !looseIdentical(v6, p6) || !looseIdentical(v7, p7) || !looseIdentical(v8, p8)) {
          v0 = p0;
          v1 = p1;
          v2 = p2;
          v3 = p3;
          v4 = p4;
          v5 = p5;
          v6 = p6;
          v7 = p7;
          v8 = p8;
          result = fn(p0, p1, p2, p3, p4, p5, p6, p7, p8);
        }
        return result;
      };
    }
    function pureProxy10(fn) {
      var result;
      var v0,
          v1,
          v2,
          v3,
          v4,
          v5,
          v6,
          v7,
          v8,
          v9;
      v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = v8 = v9 = UNINITIALIZED;
      return function(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9) {
        if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) || !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5) || !looseIdentical(v6, p6) || !looseIdentical(v7, p7) || !looseIdentical(v8, p8) || !looseIdentical(v9, p9)) {
          v0 = p0;
          v1 = p1;
          v2 = p2;
          v3 = p3;
          v4 = p4;
          v5 = p5;
          v6 = p6;
          v7 = p7;
          v8 = p8;
          v9 = p9;
          result = fn(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
        }
        return result;
      };
    }
    var __extends$5 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ComponentRef = (function() {
      function ComponentRef() {}
      Object.defineProperty(ComponentRef.prototype, "location", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ComponentRef.prototype, "injector", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ComponentRef.prototype, "instance", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      ;
      Object.defineProperty(ComponentRef.prototype, "hostView", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      ;
      Object.defineProperty(ComponentRef.prototype, "changeDetectorRef", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ComponentRef.prototype, "componentType", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      return ComponentRef;
    }());
    var ComponentRef_ = (function(_super) {
      __extends$5(ComponentRef_, _super);
      function ComponentRef_(_hostElement, _componentType) {
        _super.call(this);
        this._hostElement = _hostElement;
        this._componentType = _componentType;
      }
      Object.defineProperty(ComponentRef_.prototype, "location", {
        get: function() {
          return this._hostElement.elementRef;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ComponentRef_.prototype, "injector", {
        get: function() {
          return this._hostElement.injector;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ComponentRef_.prototype, "instance", {
        get: function() {
          return this._hostElement.component;
        },
        enumerable: true,
        configurable: true
      });
      ;
      Object.defineProperty(ComponentRef_.prototype, "hostView", {
        get: function() {
          return this._hostElement.parentView.ref;
        },
        enumerable: true,
        configurable: true
      });
      ;
      Object.defineProperty(ComponentRef_.prototype, "changeDetectorRef", {
        get: function() {
          return this._hostElement.parentView.ref;
        },
        enumerable: true,
        configurable: true
      });
      ;
      Object.defineProperty(ComponentRef_.prototype, "componentType", {
        get: function() {
          return this._componentType;
        },
        enumerable: true,
        configurable: true
      });
      ComponentRef_.prototype.destroy = function() {
        this._hostElement.parentView.destroy();
      };
      ComponentRef_.prototype.onDestroy = function(callback) {
        this.hostView.onDestroy(callback);
      };
      return ComponentRef_;
    }(ComponentRef));
    var EMPTY_CONTEXT = new Object();
    var ComponentFactory = (function() {
      function ComponentFactory(selector, _viewFactory, _componentType) {
        this.selector = selector;
        this._viewFactory = _viewFactory;
        this._componentType = _componentType;
      }
      Object.defineProperty(ComponentFactory.prototype, "componentType", {
        get: function() {
          return this._componentType;
        },
        enumerable: true,
        configurable: true
      });
      ComponentFactory.prototype.create = function(injector, projectableNodes, rootSelectorOrNode) {
        if (projectableNodes === void 0) {
          projectableNodes = null;
        }
        if (rootSelectorOrNode === void 0) {
          rootSelectorOrNode = null;
        }
        var vu = injector.get(ViewUtils);
        if (!projectableNodes) {
          projectableNodes = [];
        }
        var hostView = this._viewFactory(vu, injector, null);
        var hostElement = hostView.create(EMPTY_CONTEXT, projectableNodes, rootSelectorOrNode);
        return new ComponentRef_(hostElement, this._componentType);
      };
      return ComponentFactory;
    }());
    var __extends$7 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var NoComponentFactoryError = (function(_super) {
      __extends$7(NoComponentFactoryError, _super);
      function NoComponentFactoryError(component) {
        _super.call(this, "No component factory found for " + stringify(component));
        this.component = component;
      }
      return NoComponentFactoryError;
    }(BaseError));
    var _NullComponentFactoryResolver = (function() {
      function _NullComponentFactoryResolver() {}
      _NullComponentFactoryResolver.prototype.resolveComponentFactory = function(component) {
        throw new NoComponentFactoryError(component);
      };
      return _NullComponentFactoryResolver;
    }());
    var ComponentFactoryResolver = (function() {
      function ComponentFactoryResolver() {}
      ComponentFactoryResolver.NULL = new _NullComponentFactoryResolver();
      return ComponentFactoryResolver;
    }());
    var CodegenComponentFactoryResolver = (function() {
      function CodegenComponentFactoryResolver(factories, _parent) {
        this._parent = _parent;
        this._factories = new Map();
        for (var i = 0; i < factories.length; i++) {
          var factory = factories[i];
          this._factories.set(factory.componentType, factory);
        }
      }
      CodegenComponentFactoryResolver.prototype.resolveComponentFactory = function(component) {
        var result = this._factories.get(component);
        if (!result) {
          result = this._parent.resolveComponentFactory(component);
        }
        return result;
      };
      return CodegenComponentFactoryResolver;
    }());
    var __extends$8 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var EventEmitter = (function(_super) {
      __extends$8(EventEmitter, _super);
      function EventEmitter(isAsync) {
        if (isAsync === void 0) {
          isAsync = false;
        }
        _super.call(this);
        this.__isAsync = isAsync;
      }
      EventEmitter.prototype.emit = function(value) {
        _super.prototype.next.call(this, value);
      };
      EventEmitter.prototype.subscribe = function(generatorOrNext, error, complete) {
        var schedulerFn;
        var errorFn = function(err) {
          return null;
        };
        var completeFn = function() {
          return null;
        };
        if (generatorOrNext && typeof generatorOrNext === 'object') {
          schedulerFn = this.__isAsync ? function(value) {
            setTimeout(function() {
              return generatorOrNext.next(value);
            });
          } : function(value) {
            generatorOrNext.next(value);
          };
          if (generatorOrNext.error) {
            errorFn = this.__isAsync ? function(err) {
              setTimeout(function() {
                return generatorOrNext.error(err);
              });
            } : function(err) {
              generatorOrNext.error(err);
            };
          }
          if (generatorOrNext.complete) {
            completeFn = this.__isAsync ? function() {
              setTimeout(function() {
                return generatorOrNext.complete();
              });
            } : function() {
              generatorOrNext.complete();
            };
          }
        } else {
          schedulerFn = this.__isAsync ? function(value) {
            setTimeout(function() {
              return generatorOrNext(value);
            });
          } : function(value) {
            generatorOrNext(value);
          };
          if (error) {
            errorFn = this.__isAsync ? function(err) {
              setTimeout(function() {
                return error(err);
              });
            } : function(err) {
              error(err);
            };
          }
          if (complete) {
            completeFn = this.__isAsync ? function() {
              setTimeout(function() {
                return complete();
              });
            } : function() {
              complete();
            };
          }
        }
        return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
      };
      return EventEmitter;
    }(rxjs_Subject.Subject));
    var NgZoneImpl = (function() {
      function NgZoneImpl(_a) {
        var _this = this;
        var trace = _a.trace,
            onEnter = _a.onEnter,
            onLeave = _a.onLeave,
            setMicrotask = _a.setMicrotask,
            setMacrotask = _a.setMacrotask,
            onError = _a.onError;
        this.onEnter = onEnter;
        this.onLeave = onLeave;
        this.setMicrotask = setMicrotask;
        this.setMacrotask = setMacrotask;
        this.onError = onError;
        if (typeof Zone == 'undefined') {
          throw new Error('Angular requires Zone.js prolyfill.');
        }
        Zone.assertZonePatched();
        this.outer = this.inner = Zone.current;
        if (Zone['wtfZoneSpec']) {
          this.inner = this.inner.fork(Zone['wtfZoneSpec']);
        }
        if (trace && Zone['longStackTraceZoneSpec']) {
          this.inner = this.inner.fork(Zone['longStackTraceZoneSpec']);
        }
        this.inner = this.inner.fork({
          name: 'angular',
          properties: {'isAngularZone': true},
          onInvokeTask: function(delegate, current, target, task, applyThis, applyArgs) {
            try {
              _this.onEnter();
              return delegate.invokeTask(target, task, applyThis, applyArgs);
            } finally {
              _this.onLeave();
            }
          },
          onInvoke: function(delegate, current, target, callback, applyThis, applyArgs, source) {
            try {
              _this.onEnter();
              return delegate.invoke(target, callback, applyThis, applyArgs, source);
            } finally {
              _this.onLeave();
            }
          },
          onHasTask: function(delegate, current, target, hasTaskState) {
            delegate.hasTask(target, hasTaskState);
            if (current === target) {
              if (hasTaskState.change == 'microTask') {
                _this.setMicrotask(hasTaskState.microTask);
              } else if (hasTaskState.change == 'macroTask') {
                _this.setMacrotask(hasTaskState.macroTask);
              }
            }
          },
          onHandleError: function(delegate, current, target, error) {
            delegate.handleError(target, error);
            _this.onError(error);
            return false;
          }
        });
      }
      NgZoneImpl.isInAngularZone = function() {
        return Zone.current.get('isAngularZone') === true;
      };
      NgZoneImpl.prototype.runInner = function(fn) {
        return this.inner.run(fn);
      };
      ;
      NgZoneImpl.prototype.runInnerGuarded = function(fn) {
        return this.inner.runGuarded(fn);
      };
      ;
      NgZoneImpl.prototype.runOuter = function(fn) {
        return this.outer.run(fn);
      };
      ;
      return NgZoneImpl;
    }());
    var NgZone = (function() {
      function NgZone(_a) {
        var _this = this;
        var _b = _a.enableLongStackTrace,
            enableLongStackTrace = _b === void 0 ? false : _b;
        this._hasPendingMicrotasks = false;
        this._hasPendingMacrotasks = false;
        this._isStable = true;
        this._nesting = 0;
        this._onUnstable = new EventEmitter(false);
        this._onMicrotaskEmpty = new EventEmitter(false);
        this._onStable = new EventEmitter(false);
        this._onErrorEvents = new EventEmitter(false);
        this._zoneImpl = new NgZoneImpl({
          trace: enableLongStackTrace,
          onEnter: function() {
            _this._nesting++;
            if (_this._isStable) {
              _this._isStable = false;
              _this._onUnstable.emit(null);
            }
          },
          onLeave: function() {
            _this._nesting--;
            _this._checkStable();
          },
          setMicrotask: function(hasMicrotasks) {
            _this._hasPendingMicrotasks = hasMicrotasks;
            _this._checkStable();
          },
          setMacrotask: function(hasMacrotasks) {
            _this._hasPendingMacrotasks = hasMacrotasks;
          },
          onError: function(error) {
            return _this._onErrorEvents.emit(error);
          }
        });
      }
      NgZone.isInAngularZone = function() {
        return NgZoneImpl.isInAngularZone();
      };
      NgZone.assertInAngularZone = function() {
        if (!NgZoneImpl.isInAngularZone()) {
          throw new Error('Expected to be in Angular Zone, but it is not!');
        }
      };
      NgZone.assertNotInAngularZone = function() {
        if (NgZoneImpl.isInAngularZone()) {
          throw new Error('Expected to not be in Angular Zone, but it is!');
        }
      };
      NgZone.prototype._checkStable = function() {
        var _this = this;
        if (this._nesting == 0) {
          if (!this._hasPendingMicrotasks && !this._isStable) {
            try {
              this._nesting++;
              this._onMicrotaskEmpty.emit(null);
            } finally {
              this._nesting--;
              if (!this._hasPendingMicrotasks) {
                try {
                  this.runOutsideAngular(function() {
                    return _this._onStable.emit(null);
                  });
                } finally {
                  this._isStable = true;
                }
              }
            }
          }
        }
      };
      ;
      Object.defineProperty(NgZone.prototype, "onUnstable", {
        get: function() {
          return this._onUnstable;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgZone.prototype, "onMicrotaskEmpty", {
        get: function() {
          return this._onMicrotaskEmpty;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgZone.prototype, "onStable", {
        get: function() {
          return this._onStable;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgZone.prototype, "onError", {
        get: function() {
          return this._onErrorEvents;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgZone.prototype, "isStable", {
        get: function() {
          return this._isStable;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgZone.prototype, "hasPendingMicrotasks", {
        get: function() {
          return this._hasPendingMicrotasks;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgZone.prototype, "hasPendingMacrotasks", {
        get: function() {
          return this._hasPendingMacrotasks;
        },
        enumerable: true,
        configurable: true
      });
      NgZone.prototype.run = function(fn) {
        return this._zoneImpl.runInner(fn);
      };
      NgZone.prototype.runGuarded = function(fn) {
        return this._zoneImpl.runInnerGuarded(fn);
      };
      NgZone.prototype.runOutsideAngular = function(fn) {
        return this._zoneImpl.runOuter(fn);
      };
      return NgZone;
    }());
    var Testability = (function() {
      function Testability(_ngZone) {
        this._ngZone = _ngZone;
        this._pendingCount = 0;
        this._isZoneStable = true;
        this._didWork = false;
        this._callbacks = [];
        this._watchAngularEvents();
      }
      Testability.prototype._watchAngularEvents = function() {
        var _this = this;
        this._ngZone.onUnstable.subscribe({next: function() {
            _this._didWork = true;
            _this._isZoneStable = false;
          }});
        this._ngZone.runOutsideAngular(function() {
          _this._ngZone.onStable.subscribe({next: function() {
              NgZone.assertNotInAngularZone();
              scheduleMicroTask(function() {
                _this._isZoneStable = true;
                _this._runCallbacksIfReady();
              });
            }});
        });
      };
      Testability.prototype.increasePendingRequestCount = function() {
        this._pendingCount += 1;
        this._didWork = true;
        return this._pendingCount;
      };
      Testability.prototype.decreasePendingRequestCount = function() {
        this._pendingCount -= 1;
        if (this._pendingCount < 0) {
          throw new Error('pending async requests below zero');
        }
        this._runCallbacksIfReady();
        return this._pendingCount;
      };
      Testability.prototype.isStable = function() {
        return this._isZoneStable && this._pendingCount == 0 && !this._ngZone.hasPendingMacrotasks;
      };
      Testability.prototype._runCallbacksIfReady = function() {
        var _this = this;
        if (this.isStable()) {
          scheduleMicroTask(function() {
            while (_this._callbacks.length !== 0) {
              (_this._callbacks.pop())(_this._didWork);
            }
            _this._didWork = false;
          });
        } else {
          this._didWork = true;
        }
      };
      Testability.prototype.whenStable = function(callback) {
        this._callbacks.push(callback);
        this._runCallbacksIfReady();
      };
      Testability.prototype.getPendingRequestCount = function() {
        return this._pendingCount;
      };
      Testability.prototype.findBindings = function(using, provider, exactMatch) {
        return [];
      };
      Testability.prototype.findProviders = function(using, provider, exactMatch) {
        return [];
      };
      Testability.decorators = [{type: Injectable}];
      Testability.ctorParameters = [{type: NgZone}];
      return Testability;
    }());
    var TestabilityRegistry = (function() {
      function TestabilityRegistry() {
        this._applications = new Map();
        _testabilityGetter.addToWindow(this);
      }
      TestabilityRegistry.prototype.registerApplication = function(token, testability) {
        this._applications.set(token, testability);
      };
      TestabilityRegistry.prototype.getTestability = function(elem) {
        return this._applications.get(elem);
      };
      TestabilityRegistry.prototype.getAllTestabilities = function() {
        return MapWrapper.values(this._applications);
      };
      TestabilityRegistry.prototype.getAllRootElements = function() {
        return MapWrapper.keys(this._applications);
      };
      TestabilityRegistry.prototype.findTestabilityInTree = function(elem, findInAncestors) {
        if (findInAncestors === void 0) {
          findInAncestors = true;
        }
        return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
      };
      TestabilityRegistry.decorators = [{type: Injectable}];
      TestabilityRegistry.ctorParameters = [];
      return TestabilityRegistry;
    }());
    var _NoopGetTestability = (function() {
      function _NoopGetTestability() {}
      _NoopGetTestability.prototype.addToWindow = function(registry) {};
      _NoopGetTestability.prototype.findTestabilityInTree = function(registry, elem, findInAncestors) {
        return null;
      };
      return _NoopGetTestability;
    }());
    function setTestabilityGetter(getter) {
      _testabilityGetter = getter;
    }
    var _testabilityGetter = new _NoopGetTestability();
    var __extends$3 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var _devMode = true;
    var _runModeLocked = false;
    var _platform;
    function enableProdMode() {
      if (_runModeLocked) {
        throw new Error('Cannot enable prod mode after platform setup.');
      }
      _devMode = false;
    }
    function isDevMode() {
      _runModeLocked = true;
      return _devMode;
    }
    function createPlatform(injector) {
      if (_platform && !_platform.destroyed) {
        throw new Error('There can be only one platform. Destroy the previous one to create a new one.');
      }
      _platform = injector.get(PlatformRef);
      var inits = injector.get(PLATFORM_INITIALIZER, null);
      if (inits)
        inits.forEach(function(init) {
          return init();
        });
      return _platform;
    }
    function createPlatformFactory(parentPlaformFactory, name, providers) {
      if (providers === void 0) {
        providers = [];
      }
      var marker = new OpaqueToken("Platform: " + name);
      return function(extraProviders) {
        if (extraProviders === void 0) {
          extraProviders = [];
        }
        if (!getPlatform()) {
          if (parentPlaformFactory) {
            parentPlaformFactory(providers.concat(extraProviders).concat({
              provide: marker,
              useValue: true
            }));
          } else {
            createPlatform(ReflectiveInjector.resolveAndCreate(providers.concat(extraProviders).concat({
              provide: marker,
              useValue: true
            })));
          }
        }
        return assertPlatform(marker);
      };
    }
    function assertPlatform(requiredToken) {
      var platform = getPlatform();
      if (!platform) {
        throw new Error('No platform exists!');
      }
      if (!platform.injector.get(requiredToken, null)) {
        throw new Error('A platform with a different configuration has been created. Please destroy it first.');
      }
      return platform;
    }
    function destroyPlatform() {
      if (_platform && !_platform.destroyed) {
        _platform.destroy();
      }
    }
    function getPlatform() {
      return _platform && !_platform.destroyed ? _platform : null;
    }
    var PlatformRef = (function() {
      function PlatformRef() {}
      PlatformRef.prototype.bootstrapModuleFactory = function(moduleFactory) {
        throw unimplemented();
      };
      PlatformRef.prototype.bootstrapModule = function(moduleType, compilerOptions) {
        if (compilerOptions === void 0) {
          compilerOptions = [];
        }
        throw unimplemented();
      };
      Object.defineProperty(PlatformRef.prototype, "injector", {
        get: function() {
          throw unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      ;
      Object.defineProperty(PlatformRef.prototype, "destroyed", {
        get: function() {
          throw unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      return PlatformRef;
    }());
    function _callAndReportToErrorHandler(errorHandler, callback) {
      try {
        var result = callback();
        if (isPromise(result)) {
          return result.catch(function(e) {
            errorHandler.handleError(e);
            throw e;
          });
        }
        return result;
      } catch (e) {
        errorHandler.handleError(e);
        throw e;
      }
    }
    var PlatformRef_ = (function(_super) {
      __extends$3(PlatformRef_, _super);
      function PlatformRef_(_injector) {
        _super.call(this);
        this._injector = _injector;
        this._modules = [];
        this._destroyListeners = [];
        this._destroyed = false;
      }
      PlatformRef_.prototype.onDestroy = function(callback) {
        this._destroyListeners.push(callback);
      };
      Object.defineProperty(PlatformRef_.prototype, "injector", {
        get: function() {
          return this._injector;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PlatformRef_.prototype, "destroyed", {
        get: function() {
          return this._destroyed;
        },
        enumerable: true,
        configurable: true
      });
      PlatformRef_.prototype.destroy = function() {
        if (this._destroyed) {
          throw new Error('The platform has already been destroyed!');
        }
        this._modules.slice().forEach(function(module) {
          return module.destroy();
        });
        this._destroyListeners.forEach(function(listener) {
          return listener();
        });
        this._destroyed = true;
      };
      PlatformRef_.prototype.bootstrapModuleFactory = function(moduleFactory) {
        return this._bootstrapModuleFactoryWithZone(moduleFactory, null);
      };
      PlatformRef_.prototype._bootstrapModuleFactoryWithZone = function(moduleFactory, ngZone) {
        var _this = this;
        if (!ngZone)
          ngZone = new NgZone({enableLongStackTrace: isDevMode()});
        return ngZone.run(function() {
          var ngZoneInjector = ReflectiveInjector.resolveAndCreate([{
            provide: NgZone,
            useValue: ngZone
          }], _this.injector);
          var moduleRef = moduleFactory.create(ngZoneInjector);
          var exceptionHandler = moduleRef.injector.get(ErrorHandler, null);
          if (!exceptionHandler) {
            throw new Error('No ErrorHandler. Is platform module (BrowserModule) included?');
          }
          moduleRef.onDestroy(function() {
            return ListWrapper.remove(_this._modules, moduleRef);
          });
          ngZone.onError.subscribe({next: function(error) {
              exceptionHandler.handleError(error);
            }});
          return _callAndReportToErrorHandler(exceptionHandler, function() {
            var initStatus = moduleRef.injector.get(ApplicationInitStatus);
            return initStatus.donePromise.then(function() {
              _this._moduleDoBootstrap(moduleRef);
              return moduleRef;
            });
          });
        });
      };
      PlatformRef_.prototype.bootstrapModule = function(moduleType, compilerOptions) {
        if (compilerOptions === void 0) {
          compilerOptions = [];
        }
        return this._bootstrapModuleWithZone(moduleType, compilerOptions, null);
      };
      PlatformRef_.prototype._bootstrapModuleWithZone = function(moduleType, compilerOptions, ngZone, componentFactoryCallback) {
        var _this = this;
        if (compilerOptions === void 0) {
          compilerOptions = [];
        }
        var compilerFactory = this.injector.get(CompilerFactory);
        var compiler = compilerFactory.createCompiler(Array.isArray(compilerOptions) ? compilerOptions : [compilerOptions]);
        if (componentFactoryCallback) {
          return compiler.compileModuleAndAllComponentsAsync(moduleType).then(function(_a) {
            var ngModuleFactory = _a.ngModuleFactory,
                componentFactories = _a.componentFactories;
            componentFactoryCallback(componentFactories);
            return _this._bootstrapModuleFactoryWithZone(ngModuleFactory, ngZone);
          });
        }
        return compiler.compileModuleAsync(moduleType).then(function(moduleFactory) {
          return _this._bootstrapModuleFactoryWithZone(moduleFactory, ngZone);
        });
      };
      PlatformRef_.prototype._moduleDoBootstrap = function(moduleRef) {
        var appRef = moduleRef.injector.get(ApplicationRef);
        if (moduleRef.bootstrapFactories.length > 0) {
          moduleRef.bootstrapFactories.forEach(function(compFactory) {
            return appRef.bootstrap(compFactory);
          });
        } else if (moduleRef.instance.ngDoBootstrap) {
          moduleRef.instance.ngDoBootstrap(appRef);
        } else {
          throw new Error(("The module " + stringify(moduleRef.instance.constructor) + " was bootstrapped, but it does not declare \"@NgModule.bootstrap\" components nor a \"ngDoBootstrap\" method. ") + "Please define one of these.");
        }
      };
      PlatformRef_.decorators = [{type: Injectable}];
      PlatformRef_.ctorParameters = [{type: Injector}];
      return PlatformRef_;
    }(PlatformRef));
    var ApplicationRef = (function() {
      function ApplicationRef() {}
      Object.defineProperty(ApplicationRef.prototype, "componentTypes", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      ;
      Object.defineProperty(ApplicationRef.prototype, "components", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      ;
      return ApplicationRef;
    }());
    var ApplicationRef_ = (function(_super) {
      __extends$3(ApplicationRef_, _super);
      function ApplicationRef_(_zone, _console, _injector, _exceptionHandler, _componentFactoryResolver, _initStatus, _testabilityRegistry, _testability) {
        var _this = this;
        _super.call(this);
        this._zone = _zone;
        this._console = _console;
        this._injector = _injector;
        this._exceptionHandler = _exceptionHandler;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._initStatus = _initStatus;
        this._testabilityRegistry = _testabilityRegistry;
        this._testability = _testability;
        this._bootstrapListeners = [];
        this._rootComponents = [];
        this._rootComponentTypes = [];
        this._changeDetectorRefs = [];
        this._runningTick = false;
        this._enforceNoNewChanges = false;
        this._enforceNoNewChanges = isDevMode();
        this._zone.onMicrotaskEmpty.subscribe({next: function() {
            _this._zone.run(function() {
              _this.tick();
            });
          }});
      }
      ApplicationRef_.prototype.registerChangeDetector = function(changeDetector) {
        this._changeDetectorRefs.push(changeDetector);
      };
      ApplicationRef_.prototype.unregisterChangeDetector = function(changeDetector) {
        ListWrapper.remove(this._changeDetectorRefs, changeDetector);
      };
      ApplicationRef_.prototype.bootstrap = function(componentOrFactory) {
        var _this = this;
        if (!this._initStatus.done) {
          throw new Error('Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.');
        }
        var componentFactory;
        if (componentOrFactory instanceof ComponentFactory) {
          componentFactory = componentOrFactory;
        } else {
          componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentOrFactory);
        }
        this._rootComponentTypes.push(componentFactory.componentType);
        var compRef = componentFactory.create(this._injector, [], componentFactory.selector);
        compRef.onDestroy(function() {
          _this._unloadComponent(compRef);
        });
        var testability = compRef.injector.get(Testability, null);
        if (testability) {
          compRef.injector.get(TestabilityRegistry).registerApplication(compRef.location.nativeElement, testability);
        }
        this._loadComponent(compRef);
        if (isDevMode()) {
          this._console.log("Angular 2 is running in the development mode. Call enableProdMode() to enable the production mode.");
        }
        return compRef;
      };
      ApplicationRef_.prototype._loadComponent = function(componentRef) {
        this._changeDetectorRefs.push(componentRef.changeDetectorRef);
        this.tick();
        this._rootComponents.push(componentRef);
        var listeners = this._injector.get(APP_BOOTSTRAP_LISTENER, []).concat(this._bootstrapListeners);
        listeners.forEach(function(listener) {
          return listener(componentRef);
        });
      };
      ApplicationRef_.prototype._unloadComponent = function(componentRef) {
        if (this._rootComponents.indexOf(componentRef) == -1) {
          return;
        }
        this.unregisterChangeDetector(componentRef.changeDetectorRef);
        ListWrapper.remove(this._rootComponents, componentRef);
      };
      ApplicationRef_.prototype.tick = function() {
        if (this._runningTick) {
          throw new Error('ApplicationRef.tick is called recursively');
        }
        var scope = ApplicationRef_._tickScope();
        try {
          this._runningTick = true;
          this._changeDetectorRefs.forEach(function(detector) {
            return detector.detectChanges();
          });
          if (this._enforceNoNewChanges) {
            this._changeDetectorRefs.forEach(function(detector) {
              return detector.checkNoChanges();
            });
          }
        } finally {
          this._runningTick = false;
          wtfLeave(scope);
        }
      };
      ApplicationRef_.prototype.ngOnDestroy = function() {
        this._rootComponents.slice().forEach(function(component) {
          return component.destroy();
        });
      };
      Object.defineProperty(ApplicationRef_.prototype, "componentTypes", {
        get: function() {
          return this._rootComponentTypes;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ApplicationRef_.prototype, "components", {
        get: function() {
          return this._rootComponents;
        },
        enumerable: true,
        configurable: true
      });
      ApplicationRef_._tickScope = wtfCreateScope('ApplicationRef#tick()');
      ApplicationRef_.decorators = [{type: Injectable}];
      ApplicationRef_.ctorParameters = [{type: NgZone}, {type: Console}, {type: Injector}, {type: ErrorHandler}, {type: ComponentFactoryResolver}, {type: ApplicationInitStatus}, {
        type: TestabilityRegistry,
        decorators: [{type: Optional}]
      }, {
        type: Testability,
        decorators: [{type: Optional}]
      }];
      return ApplicationRef_;
    }(ApplicationRef));
    var __extends$9 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var NgModuleRef = (function() {
      function NgModuleRef() {}
      Object.defineProperty(NgModuleRef.prototype, "injector", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgModuleRef.prototype, "componentFactoryResolver", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgModuleRef.prototype, "instance", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      return NgModuleRef;
    }());
    var NgModuleFactory = (function() {
      function NgModuleFactory(_injectorClass, _moduleType) {
        this._injectorClass = _injectorClass;
        this._moduleType = _moduleType;
      }
      Object.defineProperty(NgModuleFactory.prototype, "moduleType", {
        get: function() {
          return this._moduleType;
        },
        enumerable: true,
        configurable: true
      });
      NgModuleFactory.prototype.create = function(parentInjector) {
        if (!parentInjector) {
          parentInjector = Injector.NULL;
        }
        var instance = new this._injectorClass(parentInjector);
        instance.create();
        return instance;
      };
      return NgModuleFactory;
    }());
    var _UNDEFINED = new Object();
    var NgModuleInjector = (function(_super) {
      __extends$9(NgModuleInjector, _super);
      function NgModuleInjector(parent, factories, bootstrapFactories) {
        _super.call(this, factories, parent.get(ComponentFactoryResolver, ComponentFactoryResolver.NULL));
        this.parent = parent;
        this.bootstrapFactories = bootstrapFactories;
        this._destroyListeners = [];
        this._destroyed = false;
      }
      NgModuleInjector.prototype.create = function() {
        this.instance = this.createInternal();
      };
      NgModuleInjector.prototype.get = function(token, notFoundValue) {
        if (notFoundValue === void 0) {
          notFoundValue = THROW_IF_NOT_FOUND;
        }
        if (token === Injector || token === ComponentFactoryResolver) {
          return this;
        }
        var result = this.getInternal(token, _UNDEFINED);
        return result === _UNDEFINED ? this.parent.get(token, notFoundValue) : result;
      };
      Object.defineProperty(NgModuleInjector.prototype, "injector", {
        get: function() {
          return this;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgModuleInjector.prototype, "componentFactoryResolver", {
        get: function() {
          return this;
        },
        enumerable: true,
        configurable: true
      });
      NgModuleInjector.prototype.destroy = function() {
        if (this._destroyed) {
          throw new Error("The ng module " + stringify(this.instance.constructor) + " has already been destroyed.");
        }
        this._destroyed = true;
        this.destroyInternal();
        this._destroyListeners.forEach(function(listener) {
          return listener();
        });
      };
      NgModuleInjector.prototype.onDestroy = function(callback) {
        this._destroyListeners.push(callback);
      };
      return NgModuleInjector;
    }(CodegenComponentFactoryResolver));
    var NgModuleFactoryLoader = (function() {
      function NgModuleFactoryLoader() {}
      return NgModuleFactoryLoader;
    }());
    var moduleFactories = new Map();
    function registerModuleFactory(id, factory) {
      var existing = moduleFactories.get(id);
      if (existing) {
        throw new Error("Duplicate module registered for " + id + " - " + existing.moduleType.name + " vs " + factory.moduleType.name);
      }
      moduleFactories.set(id, factory);
    }
    function getModuleFactory(id) {
      var factory = moduleFactories.get(id);
      if (!factory)
        throw new Error("No module with ID " + id + " loaded");
      return factory;
    }
    var QueryList = (function() {
      function QueryList() {
        this._dirty = true;
        this._results = [];
        this._emitter = new EventEmitter();
      }
      Object.defineProperty(QueryList.prototype, "changes", {
        get: function() {
          return this._emitter;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(QueryList.prototype, "length", {
        get: function() {
          return this._results.length;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(QueryList.prototype, "first", {
        get: function() {
          return this._results[0];
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(QueryList.prototype, "last", {
        get: function() {
          return this._results[this.length - 1];
        },
        enumerable: true,
        configurable: true
      });
      QueryList.prototype.map = function(fn) {
        return this._results.map(fn);
      };
      QueryList.prototype.filter = function(fn) {
        return this._results.filter(fn);
      };
      QueryList.prototype.reduce = function(fn, init) {
        return this._results.reduce(fn, init);
      };
      QueryList.prototype.forEach = function(fn) {
        this._results.forEach(fn);
      };
      QueryList.prototype.some = function(fn) {
        return this._results.some(fn);
      };
      QueryList.prototype.toArray = function() {
        return this._results.slice();
      };
      QueryList.prototype[getSymbolIterator()] = function() {
        return this._results[getSymbolIterator()]();
      };
      QueryList.prototype.toString = function() {
        return this._results.toString();
      };
      QueryList.prototype.reset = function(res) {
        this._results = ListWrapper.flatten(res);
        this._dirty = false;
      };
      QueryList.prototype.notifyOnChanges = function() {
        this._emitter.emit(this);
      };
      QueryList.prototype.setDirty = function() {
        this._dirty = true;
      };
      Object.defineProperty(QueryList.prototype, "dirty", {
        get: function() {
          return this._dirty;
        },
        enumerable: true,
        configurable: true
      });
      return QueryList;
    }());
    var _SEPARATOR = '#';
    var FACTORY_CLASS_SUFFIX = 'NgFactory';
    var SystemJsNgModuleLoaderConfig = (function() {
      function SystemJsNgModuleLoaderConfig() {}
      return SystemJsNgModuleLoaderConfig;
    }());
    var DEFAULT_CONFIG = {
      factoryPathPrefix: '',
      factoryPathSuffix: '.ngfactory'
    };
    var SystemJsNgModuleLoader = (function() {
      function SystemJsNgModuleLoader(_compiler, config) {
        this._compiler = _compiler;
        this._config = config || DEFAULT_CONFIG;
      }
      SystemJsNgModuleLoader.prototype.load = function(path) {
        var offlineMode = this._compiler instanceof Compiler;
        return offlineMode ? this.loadFactory(path) : this.loadAndCompile(path);
      };
      SystemJsNgModuleLoader.prototype.loadAndCompile = function(path) {
        var _this = this;
        var _a = path.split(_SEPARATOR),
            module = _a[0],
            exportName = _a[1];
        if (exportName === undefined)
          exportName = 'default';
        return System.import(module).then(function(module) {
          return module[exportName];
        }).then(function(type) {
          return checkNotEmpty(type, module, exportName);
        }).then(function(type) {
          return _this._compiler.compileModuleAsync(type);
        });
      };
      SystemJsNgModuleLoader.prototype.loadFactory = function(path) {
        var _a = path.split(_SEPARATOR),
            module = _a[0],
            exportName = _a[1];
        var factoryClassSuffix = FACTORY_CLASS_SUFFIX;
        if (exportName === undefined) {
          exportName = 'default';
          factoryClassSuffix = '';
        }
        return System.import(this._config.factoryPathPrefix + module + this._config.factoryPathSuffix).then(function(module) {
          return module[exportName + factoryClassSuffix];
        }).then(function(factory) {
          return checkNotEmpty(factory, module, exportName);
        });
      };
      SystemJsNgModuleLoader.decorators = [{type: Injectable}];
      SystemJsNgModuleLoader.ctorParameters = [{type: Compiler}, {
        type: SystemJsNgModuleLoaderConfig,
        decorators: [{type: Optional}]
      }];
      return SystemJsNgModuleLoader;
    }());
    function checkNotEmpty(value, modulePath, exportName) {
      if (!value) {
        throw new Error("Cannot find '" + exportName + "' in '" + modulePath + "'");
      }
      return value;
    }
    var __extends$10 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var TemplateRef = (function() {
      function TemplateRef() {}
      Object.defineProperty(TemplateRef.prototype, "elementRef", {
        get: function() {
          return null;
        },
        enumerable: true,
        configurable: true
      });
      return TemplateRef;
    }());
    var TemplateRef_ = (function(_super) {
      __extends$10(TemplateRef_, _super);
      function TemplateRef_(_appElement, _viewFactory) {
        _super.call(this);
        this._appElement = _appElement;
        this._viewFactory = _viewFactory;
      }
      TemplateRef_.prototype.createEmbeddedView = function(context) {
        var view = this._viewFactory(this._appElement.parentView.viewUtils, this._appElement.parentInjector, this._appElement);
        view.create(context || {}, null, null);
        return view.ref;
      };
      Object.defineProperty(TemplateRef_.prototype, "elementRef", {
        get: function() {
          return this._appElement.elementRef;
        },
        enumerable: true,
        configurable: true
      });
      return TemplateRef_;
    }(TemplateRef));
    var _queuedAnimations = [];
    function queueAnimation(player) {
      _queuedAnimations.push(player);
    }
    function triggerQueuedAnimations() {
      for (var i = 0; i < _queuedAnimations.length; i++) {
        var player = _queuedAnimations[i];
        player.play();
      }
      _queuedAnimations = [];
    }
    var __extends$11 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ViewRef = (function() {
      function ViewRef() {}
      Object.defineProperty(ViewRef.prototype, "destroyed", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      return ViewRef;
    }());
    var EmbeddedViewRef = (function(_super) {
      __extends$11(EmbeddedViewRef, _super);
      function EmbeddedViewRef() {
        _super.apply(this, arguments);
      }
      Object.defineProperty(EmbeddedViewRef.prototype, "context", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(EmbeddedViewRef.prototype, "rootNodes", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      ;
      return EmbeddedViewRef;
    }(ViewRef));
    var ViewRef_ = (function() {
      function ViewRef_(_view) {
        this._view = _view;
        this._view = _view;
        this._originalMode = this._view.cdMode;
      }
      Object.defineProperty(ViewRef_.prototype, "internalView", {
        get: function() {
          return this._view;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ViewRef_.prototype, "rootNodes", {
        get: function() {
          return this._view.flatRootNodes;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ViewRef_.prototype, "context", {
        get: function() {
          return this._view.context;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ViewRef_.prototype, "destroyed", {
        get: function() {
          return this._view.destroyed;
        },
        enumerable: true,
        configurable: true
      });
      ViewRef_.prototype.markForCheck = function() {
        this._view.markPathToRootAsCheckOnce();
      };
      ViewRef_.prototype.detach = function() {
        this._view.cdMode = ChangeDetectorStatus.Detached;
      };
      ViewRef_.prototype.detectChanges = function() {
        this._view.detectChanges(false);
        triggerQueuedAnimations();
      };
      ViewRef_.prototype.checkNoChanges = function() {
        this._view.detectChanges(true);
      };
      ViewRef_.prototype.reattach = function() {
        this._view.cdMode = this._originalMode;
        this.markForCheck();
      };
      ViewRef_.prototype.onDestroy = function(callback) {
        this._view.disposables.push(callback);
      };
      ViewRef_.prototype.destroy = function() {
        this._view.destroy();
      };
      return ViewRef_;
    }());
    var __extends$12 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var EventListener = (function() {
      function EventListener(name, callback) {
        this.name = name;
        this.callback = callback;
      }
      ;
      return EventListener;
    }());
    var DebugNode = (function() {
      function DebugNode(nativeNode, parent, _debugInfo) {
        this._debugInfo = _debugInfo;
        this.nativeNode = nativeNode;
        if (isPresent(parent) && parent instanceof DebugElement) {
          parent.addChild(this);
        } else {
          this.parent = null;
        }
        this.listeners = [];
      }
      Object.defineProperty(DebugNode.prototype, "injector", {
        get: function() {
          return isPresent(this._debugInfo) ? this._debugInfo.injector : null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(DebugNode.prototype, "componentInstance", {
        get: function() {
          return isPresent(this._debugInfo) ? this._debugInfo.component : null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(DebugNode.prototype, "context", {
        get: function() {
          return isPresent(this._debugInfo) ? this._debugInfo.context : null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(DebugNode.prototype, "references", {
        get: function() {
          return isPresent(this._debugInfo) ? this._debugInfo.references : null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(DebugNode.prototype, "providerTokens", {
        get: function() {
          return isPresent(this._debugInfo) ? this._debugInfo.providerTokens : null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(DebugNode.prototype, "source", {
        get: function() {
          return isPresent(this._debugInfo) ? this._debugInfo.source : null;
        },
        enumerable: true,
        configurable: true
      });
      return DebugNode;
    }());
    var DebugElement = (function(_super) {
      __extends$12(DebugElement, _super);
      function DebugElement(nativeNode, parent, _debugInfo) {
        _super.call(this, nativeNode, parent, _debugInfo);
        this.properties = {};
        this.attributes = {};
        this.classes = {};
        this.styles = {};
        this.childNodes = [];
        this.nativeElement = nativeNode;
      }
      DebugElement.prototype.addChild = function(child) {
        if (isPresent(child)) {
          this.childNodes.push(child);
          child.parent = this;
        }
      };
      DebugElement.prototype.removeChild = function(child) {
        var childIndex = this.childNodes.indexOf(child);
        if (childIndex !== -1) {
          child.parent = null;
          this.childNodes.splice(childIndex, 1);
        }
      };
      DebugElement.prototype.insertChildrenAfter = function(child, newChildren) {
        var siblingIndex = this.childNodes.indexOf(child);
        if (siblingIndex !== -1) {
          var previousChildren = this.childNodes.slice(0, siblingIndex + 1);
          var nextChildren = this.childNodes.slice(siblingIndex + 1);
          this.childNodes = ListWrapper.concat(ListWrapper.concat(previousChildren, newChildren), nextChildren);
          for (var i = 0; i < newChildren.length; ++i) {
            var newChild = newChildren[i];
            if (isPresent(newChild.parent)) {
              newChild.parent.removeChild(newChild);
            }
            newChild.parent = this;
          }
        }
      };
      DebugElement.prototype.query = function(predicate) {
        var results = this.queryAll(predicate);
        return results.length > 0 ? results[0] : null;
      };
      DebugElement.prototype.queryAll = function(predicate) {
        var matches = [];
        _queryElementChildren(this, predicate, matches);
        return matches;
      };
      DebugElement.prototype.queryAllNodes = function(predicate) {
        var matches = [];
        _queryNodeChildren(this, predicate, matches);
        return matches;
      };
      Object.defineProperty(DebugElement.prototype, "children", {
        get: function() {
          var children = [];
          this.childNodes.forEach(function(node) {
            if (node instanceof DebugElement) {
              children.push(node);
            }
          });
          return children;
        },
        enumerable: true,
        configurable: true
      });
      DebugElement.prototype.triggerEventHandler = function(eventName, eventObj) {
        this.listeners.forEach(function(listener) {
          if (listener.name == eventName) {
            listener.callback(eventObj);
          }
        });
      };
      return DebugElement;
    }(DebugNode));
    function asNativeElements(debugEls) {
      return debugEls.map(function(el) {
        return el.nativeElement;
      });
    }
    function _queryElementChildren(element, predicate, matches) {
      element.childNodes.forEach(function(node) {
        if (node instanceof DebugElement) {
          if (predicate(node)) {
            matches.push(node);
          }
          _queryElementChildren(node, predicate, matches);
        }
      });
    }
    function _queryNodeChildren(parentNode, predicate, matches) {
      if (parentNode instanceof DebugElement) {
        parentNode.childNodes.forEach(function(node) {
          if (predicate(node)) {
            matches.push(node);
          }
          if (node instanceof DebugElement) {
            _queryNodeChildren(node, predicate, matches);
          }
        });
      }
    }
    var _nativeNodeToDebugNode = new Map();
    function getDebugNode(nativeNode) {
      return _nativeNodeToDebugNode.get(nativeNode);
    }
    function indexDebugNode(node) {
      _nativeNodeToDebugNode.set(node.nativeNode, node);
    }
    function removeDebugNodeFromIndex(node) {
      _nativeNodeToDebugNode.delete(node.nativeNode);
    }
    function _reflector() {
      return reflector;
    }
    var _CORE_PLATFORM_PROVIDERS = [PlatformRef_, {
      provide: PlatformRef,
      useExisting: PlatformRef_
    }, {
      provide: Reflector,
      useFactory: _reflector,
      deps: []
    }, {
      provide: ReflectorReader,
      useExisting: Reflector
    }, TestabilityRegistry, Console];
    var platformCore = createPlatformFactory(null, 'core', _CORE_PLATFORM_PROVIDERS);
    var LOCALE_ID = new OpaqueToken('LocaleId');
    var TRANSLATIONS = new OpaqueToken('Translations');
    var TRANSLATIONS_FORMAT = new OpaqueToken('TranslationsFormat');
    function _iterableDiffersFactory() {
      return defaultIterableDiffers;
    }
    function _keyValueDiffersFactory() {
      return defaultKeyValueDiffers;
    }
    var ApplicationModule = (function() {
      function ApplicationModule() {}
      ApplicationModule.decorators = [{
        type: NgModule,
        args: [{providers: [ApplicationRef_, {
            provide: ApplicationRef,
            useExisting: ApplicationRef_
          }, ApplicationInitStatus, Compiler, APP_ID_RANDOM_PROVIDER, ViewUtils, {
            provide: IterableDiffers,
            useFactory: _iterableDiffersFactory
          }, {
            provide: KeyValueDiffers,
            useFactory: _keyValueDiffersFactory
          }, {
            provide: LOCALE_ID,
            useValue: 'en-US'
          }]}]
      }];
      ApplicationModule.ctorParameters = [];
      return ApplicationModule;
    }());
    var FILL_STYLE_FLAG = 'true';
    var ANY_STATE = '*';
    var DEFAULT_STATE = '*';
    var EMPTY_STATE = 'void';
    var Math$1 = global$1.Math;
    var AnimationGroupPlayer = (function() {
      function AnimationGroupPlayer(_players) {
        var _this = this;
        this._players = _players;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._finished = false;
        this._started = false;
        this.parentPlayer = null;
        var count = 0;
        var total = this._players.length;
        if (total == 0) {
          scheduleMicroTask(function() {
            return _this._onFinish();
          });
        } else {
          this._players.forEach(function(player) {
            player.parentPlayer = _this;
            player.onDone(function() {
              if (++count >= total) {
                _this._onFinish();
              }
            });
          });
        }
      }
      AnimationGroupPlayer.prototype._onFinish = function() {
        if (!this._finished) {
          this._finished = true;
          if (!isPresent(this.parentPlayer)) {
            this.destroy();
          }
          this._onDoneFns.forEach(function(fn) {
            return fn();
          });
          this._onDoneFns = [];
        }
      };
      AnimationGroupPlayer.prototype.init = function() {
        this._players.forEach(function(player) {
          return player.init();
        });
      };
      AnimationGroupPlayer.prototype.onStart = function(fn) {
        this._onStartFns.push(fn);
      };
      AnimationGroupPlayer.prototype.onDone = function(fn) {
        this._onDoneFns.push(fn);
      };
      AnimationGroupPlayer.prototype.hasStarted = function() {
        return this._started;
      };
      AnimationGroupPlayer.prototype.play = function() {
        if (!isPresent(this.parentPlayer)) {
          this.init();
        }
        if (!this.hasStarted()) {
          this._onStartFns.forEach(function(fn) {
            return fn();
          });
          this._onStartFns = [];
          this._started = true;
        }
        this._players.forEach(function(player) {
          return player.play();
        });
      };
      AnimationGroupPlayer.prototype.pause = function() {
        this._players.forEach(function(player) {
          return player.pause();
        });
      };
      AnimationGroupPlayer.prototype.restart = function() {
        this._players.forEach(function(player) {
          return player.restart();
        });
      };
      AnimationGroupPlayer.prototype.finish = function() {
        this._onFinish();
        this._players.forEach(function(player) {
          return player.finish();
        });
      };
      AnimationGroupPlayer.prototype.destroy = function() {
        this._onFinish();
        this._players.forEach(function(player) {
          return player.destroy();
        });
      };
      AnimationGroupPlayer.prototype.reset = function() {
        this._players.forEach(function(player) {
          return player.reset();
        });
      };
      AnimationGroupPlayer.prototype.setPosition = function(p) {
        this._players.forEach(function(player) {
          player.setPosition(p);
        });
      };
      AnimationGroupPlayer.prototype.getPosition = function() {
        var min = 0;
        this._players.forEach(function(player) {
          var p = player.getPosition();
          min = Math$1.min(p, min);
        });
        return min;
      };
      return AnimationGroupPlayer;
    }());
    var AnimationKeyframe = (function() {
      function AnimationKeyframe(offset, styles) {
        this.offset = offset;
        this.styles = styles;
      }
      return AnimationKeyframe;
    }());
    var AnimationPlayer = (function() {
      function AnimationPlayer() {}
      Object.defineProperty(AnimationPlayer.prototype, "parentPlayer", {
        get: function() {
          throw new Error('NOT IMPLEMENTED: Base Class');
        },
        set: function(player) {
          throw new Error('NOT IMPLEMENTED: Base Class');
        },
        enumerable: true,
        configurable: true
      });
      return AnimationPlayer;
    }());
    var NoOpAnimationPlayer = (function() {
      function NoOpAnimationPlayer() {
        var _this = this;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._started = false;
        this.parentPlayer = null;
        scheduleMicroTask(function() {
          return _this._onFinish();
        });
      }
      NoOpAnimationPlayer.prototype._onFinish = function() {
        this._onDoneFns.forEach(function(fn) {
          return fn();
        });
        this._onDoneFns = [];
      };
      NoOpAnimationPlayer.prototype.onStart = function(fn) {
        this._onStartFns.push(fn);
      };
      NoOpAnimationPlayer.prototype.onDone = function(fn) {
        this._onDoneFns.push(fn);
      };
      NoOpAnimationPlayer.prototype.hasStarted = function() {
        return this._started;
      };
      NoOpAnimationPlayer.prototype.init = function() {};
      NoOpAnimationPlayer.prototype.play = function() {
        if (!this.hasStarted()) {
          this._onStartFns.forEach(function(fn) {
            return fn();
          });
          this._onStartFns = [];
        }
        this._started = true;
      };
      NoOpAnimationPlayer.prototype.pause = function() {};
      NoOpAnimationPlayer.prototype.restart = function() {};
      NoOpAnimationPlayer.prototype.finish = function() {
        this._onFinish();
      };
      NoOpAnimationPlayer.prototype.destroy = function() {};
      NoOpAnimationPlayer.prototype.reset = function() {};
      NoOpAnimationPlayer.prototype.setPosition = function(p) {};
      NoOpAnimationPlayer.prototype.getPosition = function() {
        return 0;
      };
      return NoOpAnimationPlayer;
    }());
    var AnimationSequencePlayer = (function() {
      function AnimationSequencePlayer(_players) {
        var _this = this;
        this._players = _players;
        this._currentIndex = 0;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._finished = false;
        this._started = false;
        this.parentPlayer = null;
        this._players.forEach(function(player) {
          player.parentPlayer = _this;
        });
        this._onNext(false);
      }
      AnimationSequencePlayer.prototype._onNext = function(start) {
        var _this = this;
        if (this._finished)
          return;
        if (this._players.length == 0) {
          this._activePlayer = new NoOpAnimationPlayer();
          scheduleMicroTask(function() {
            return _this._onFinish();
          });
        } else if (this._currentIndex >= this._players.length) {
          this._activePlayer = new NoOpAnimationPlayer();
          this._onFinish();
        } else {
          var player = this._players[this._currentIndex++];
          player.onDone(function() {
            return _this._onNext(true);
          });
          this._activePlayer = player;
          if (start) {
            player.play();
          }
        }
      };
      AnimationSequencePlayer.prototype._onFinish = function() {
        if (!this._finished) {
          this._finished = true;
          if (!isPresent(this.parentPlayer)) {
            this.destroy();
          }
          this._onDoneFns.forEach(function(fn) {
            return fn();
          });
          this._onDoneFns = [];
        }
      };
      AnimationSequencePlayer.prototype.init = function() {
        this._players.forEach(function(player) {
          return player.init();
        });
      };
      AnimationSequencePlayer.prototype.onStart = function(fn) {
        this._onStartFns.push(fn);
      };
      AnimationSequencePlayer.prototype.onDone = function(fn) {
        this._onDoneFns.push(fn);
      };
      AnimationSequencePlayer.prototype.hasStarted = function() {
        return this._started;
      };
      AnimationSequencePlayer.prototype.play = function() {
        if (!isPresent(this.parentPlayer)) {
          this.init();
        }
        if (!this.hasStarted()) {
          this._onStartFns.forEach(function(fn) {
            return fn();
          });
          this._onStartFns = [];
          this._started = true;
        }
        this._activePlayer.play();
      };
      AnimationSequencePlayer.prototype.pause = function() {
        this._activePlayer.pause();
      };
      AnimationSequencePlayer.prototype.restart = function() {
        if (this._players.length > 0) {
          this.reset();
          this._players[0].restart();
        }
      };
      AnimationSequencePlayer.prototype.reset = function() {
        this._players.forEach(function(player) {
          return player.reset();
        });
      };
      AnimationSequencePlayer.prototype.finish = function() {
        this._onFinish();
        this._players.forEach(function(player) {
          return player.finish();
        });
      };
      AnimationSequencePlayer.prototype.destroy = function() {
        this._onFinish();
        this._players.forEach(function(player) {
          return player.destroy();
        });
      };
      AnimationSequencePlayer.prototype.setPosition = function(p) {
        this._players[0].setPosition(p);
      };
      AnimationSequencePlayer.prototype.getPosition = function() {
        return this._players[0].getPosition();
      };
      return AnimationSequencePlayer;
    }());
    var __extends$13 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var AUTO_STYLE = '*';
    var AnimationEntryMetadata = (function() {
      function AnimationEntryMetadata(name, definitions) {
        this.name = name;
        this.definitions = definitions;
      }
      return AnimationEntryMetadata;
    }());
    var AnimationStateMetadata = (function() {
      function AnimationStateMetadata() {}
      return AnimationStateMetadata;
    }());
    var AnimationStateDeclarationMetadata = (function(_super) {
      __extends$13(AnimationStateDeclarationMetadata, _super);
      function AnimationStateDeclarationMetadata(stateNameExpr, styles) {
        _super.call(this);
        this.stateNameExpr = stateNameExpr;
        this.styles = styles;
      }
      return AnimationStateDeclarationMetadata;
    }(AnimationStateMetadata));
    var AnimationStateTransitionMetadata = (function(_super) {
      __extends$13(AnimationStateTransitionMetadata, _super);
      function AnimationStateTransitionMetadata(stateChangeExpr, steps) {
        _super.call(this);
        this.stateChangeExpr = stateChangeExpr;
        this.steps = steps;
      }
      return AnimationStateTransitionMetadata;
    }(AnimationStateMetadata));
    var AnimationMetadata = (function() {
      function AnimationMetadata() {}
      return AnimationMetadata;
    }());
    var AnimationKeyframesSequenceMetadata = (function(_super) {
      __extends$13(AnimationKeyframesSequenceMetadata, _super);
      function AnimationKeyframesSequenceMetadata(steps) {
        _super.call(this);
        this.steps = steps;
      }
      return AnimationKeyframesSequenceMetadata;
    }(AnimationMetadata));
    var AnimationStyleMetadata = (function(_super) {
      __extends$13(AnimationStyleMetadata, _super);
      function AnimationStyleMetadata(styles, offset) {
        if (offset === void 0) {
          offset = null;
        }
        _super.call(this);
        this.styles = styles;
        this.offset = offset;
      }
      return AnimationStyleMetadata;
    }(AnimationMetadata));
    var AnimationAnimateMetadata = (function(_super) {
      __extends$13(AnimationAnimateMetadata, _super);
      function AnimationAnimateMetadata(timings, styles) {
        _super.call(this);
        this.timings = timings;
        this.styles = styles;
      }
      return AnimationAnimateMetadata;
    }(AnimationMetadata));
    var AnimationWithStepsMetadata = (function(_super) {
      __extends$13(AnimationWithStepsMetadata, _super);
      function AnimationWithStepsMetadata() {
        _super.call(this);
      }
      Object.defineProperty(AnimationWithStepsMetadata.prototype, "steps", {
        get: function() {
          throw new Error('NOT IMPLEMENTED: Base Class');
        },
        enumerable: true,
        configurable: true
      });
      return AnimationWithStepsMetadata;
    }(AnimationMetadata));
    var AnimationSequenceMetadata = (function(_super) {
      __extends$13(AnimationSequenceMetadata, _super);
      function AnimationSequenceMetadata(_steps) {
        _super.call(this);
        this._steps = _steps;
      }
      Object.defineProperty(AnimationSequenceMetadata.prototype, "steps", {
        get: function() {
          return this._steps;
        },
        enumerable: true,
        configurable: true
      });
      return AnimationSequenceMetadata;
    }(AnimationWithStepsMetadata));
    var AnimationGroupMetadata = (function(_super) {
      __extends$13(AnimationGroupMetadata, _super);
      function AnimationGroupMetadata(_steps) {
        _super.call(this);
        this._steps = _steps;
      }
      Object.defineProperty(AnimationGroupMetadata.prototype, "steps", {
        get: function() {
          return this._steps;
        },
        enumerable: true,
        configurable: true
      });
      return AnimationGroupMetadata;
    }(AnimationWithStepsMetadata));
    function animate(timing, styles) {
      if (styles === void 0) {
        styles = null;
      }
      var stylesEntry = styles;
      if (!isPresent(stylesEntry)) {
        var EMPTY_STYLE = {};
        stylesEntry = new AnimationStyleMetadata([EMPTY_STYLE], 1);
      }
      return new AnimationAnimateMetadata(timing, stylesEntry);
    }
    function group(steps) {
      return new AnimationGroupMetadata(steps);
    }
    function sequence(steps) {
      return new AnimationSequenceMetadata(steps);
    }
    function style(tokens) {
      var input;
      var offset = null;
      if (isString(tokens)) {
        input = [tokens];
      } else {
        if (isArray(tokens)) {
          input = tokens;
        } else {
          input = [tokens];
        }
        input.forEach(function(entry) {
          var entryOffset = entry['offset'];
          if (isPresent(entryOffset)) {
            offset = offset == null ? parseFloat(entryOffset) : offset;
          }
        });
      }
      return new AnimationStyleMetadata(input, offset);
    }
    function state(stateNameExpr, styles) {
      return new AnimationStateDeclarationMetadata(stateNameExpr, styles);
    }
    function keyframes(steps) {
      return new AnimationKeyframesSequenceMetadata(steps);
    }
    function transition(stateChangeExpr, steps) {
      var animationData = isArray(steps) ? new AnimationSequenceMetadata(steps) : steps;
      return new AnimationStateTransitionMetadata(stateChangeExpr, animationData);
    }
    function trigger(name, animation) {
      return new AnimationEntryMetadata(name, animation);
    }
    function prepareFinalAnimationStyles(previousStyles, newStyles, nullValue) {
      if (nullValue === void 0) {
        nullValue = null;
      }
      var finalStyles = {};
      Object.keys(newStyles).forEach(function(prop) {
        var value = newStyles[prop];
        finalStyles[prop] = value == AUTO_STYLE ? nullValue : value.toString();
      });
      Object.keys(previousStyles).forEach(function(prop) {
        if (!isPresent(finalStyles[prop])) {
          finalStyles[prop] = nullValue;
        }
      });
      return finalStyles;
    }
    function balanceAnimationKeyframes(collectedStyles, finalStateStyles, keyframes) {
      var limit = keyframes.length - 1;
      var firstKeyframe = keyframes[0];
      var flatenedFirstKeyframeStyles = flattenStyles(firstKeyframe.styles.styles);
      var extraFirstKeyframeStyles = {};
      var hasExtraFirstStyles = false;
      Object.keys(collectedStyles).forEach(function(prop) {
        var value = collectedStyles[prop];
        if (!flatenedFirstKeyframeStyles[prop]) {
          flatenedFirstKeyframeStyles[prop] = value;
          extraFirstKeyframeStyles[prop] = value;
          hasExtraFirstStyles = true;
        }
      });
      var keyframeCollectedStyles = StringMapWrapper.merge({}, flatenedFirstKeyframeStyles);
      var finalKeyframe = keyframes[limit];
      ListWrapper.insert(finalKeyframe.styles.styles, 0, finalStateStyles);
      var flatenedFinalKeyframeStyles = flattenStyles(finalKeyframe.styles.styles);
      var extraFinalKeyframeStyles = {};
      var hasExtraFinalStyles = false;
      Object.keys(keyframeCollectedStyles).forEach(function(prop) {
        if (!isPresent(flatenedFinalKeyframeStyles[prop])) {
          extraFinalKeyframeStyles[prop] = AUTO_STYLE;
          hasExtraFinalStyles = true;
        }
      });
      if (hasExtraFinalStyles) {
        finalKeyframe.styles.styles.push(extraFinalKeyframeStyles);
      }
      Object.keys(flatenedFinalKeyframeStyles).forEach(function(prop) {
        if (!isPresent(flatenedFirstKeyframeStyles[prop])) {
          extraFirstKeyframeStyles[prop] = AUTO_STYLE;
          hasExtraFirstStyles = true;
        }
      });
      if (hasExtraFirstStyles) {
        firstKeyframe.styles.styles.push(extraFirstKeyframeStyles);
      }
      return keyframes;
    }
    function clearStyles(styles) {
      var finalStyles = {};
      Object.keys(styles).forEach(function(key) {
        finalStyles[key] = null;
      });
      return finalStyles;
    }
    function collectAndResolveStyles(collection, styles) {
      return styles.map(function(entry) {
        var stylesObj = {};
        Object.keys(entry).forEach(function(prop) {
          var value = entry[prop];
          if (value == FILL_STYLE_FLAG) {
            value = collection[prop];
            if (!isPresent(value)) {
              value = AUTO_STYLE;
            }
          }
          collection[prop] = value;
          stylesObj[prop] = value;
        });
        return stylesObj;
      });
    }
    function renderStyles(element, renderer, styles) {
      Object.keys(styles).forEach(function(prop) {
        renderer.setElementStyle(element, prop, styles[prop]);
      });
    }
    function flattenStyles(styles) {
      var finalStyles = {};
      styles.forEach(function(entry) {
        Object.keys(entry).forEach(function(prop) {
          finalStyles[prop] = entry[prop];
        });
      });
      return finalStyles;
    }
    var AnimationStyles = (function() {
      function AnimationStyles(styles) {
        this.styles = styles;
      }
      return AnimationStyles;
    }());
    var DebugDomRootRenderer = (function() {
      function DebugDomRootRenderer(_delegate) {
        this._delegate = _delegate;
      }
      DebugDomRootRenderer.prototype.renderComponent = function(componentProto) {
        return new DebugDomRenderer(this._delegate.renderComponent(componentProto));
      };
      return DebugDomRootRenderer;
    }());
    var DebugDomRenderer = (function() {
      function DebugDomRenderer(_delegate) {
        this._delegate = _delegate;
      }
      DebugDomRenderer.prototype.selectRootElement = function(selectorOrNode, debugInfo) {
        var nativeEl = this._delegate.selectRootElement(selectorOrNode, debugInfo);
        var debugEl = new DebugElement(nativeEl, null, debugInfo);
        indexDebugNode(debugEl);
        return nativeEl;
      };
      DebugDomRenderer.prototype.createElement = function(parentElement, name, debugInfo) {
        var nativeEl = this._delegate.createElement(parentElement, name, debugInfo);
        var debugEl = new DebugElement(nativeEl, getDebugNode(parentElement), debugInfo);
        debugEl.name = name;
        indexDebugNode(debugEl);
        return nativeEl;
      };
      DebugDomRenderer.prototype.createViewRoot = function(hostElement) {
        return this._delegate.createViewRoot(hostElement);
      };
      DebugDomRenderer.prototype.createTemplateAnchor = function(parentElement, debugInfo) {
        var comment = this._delegate.createTemplateAnchor(parentElement, debugInfo);
        var debugEl = new DebugNode(comment, getDebugNode(parentElement), debugInfo);
        indexDebugNode(debugEl);
        return comment;
      };
      DebugDomRenderer.prototype.createText = function(parentElement, value, debugInfo) {
        var text = this._delegate.createText(parentElement, value, debugInfo);
        var debugEl = new DebugNode(text, getDebugNode(parentElement), debugInfo);
        indexDebugNode(debugEl);
        return text;
      };
      DebugDomRenderer.prototype.projectNodes = function(parentElement, nodes) {
        var debugParent = getDebugNode(parentElement);
        if (isPresent(debugParent) && debugParent instanceof DebugElement) {
          var debugElement_1 = debugParent;
          nodes.forEach(function(node) {
            debugElement_1.addChild(getDebugNode(node));
          });
        }
        this._delegate.projectNodes(parentElement, nodes);
      };
      DebugDomRenderer.prototype.attachViewAfter = function(node, viewRootNodes) {
        var debugNode = getDebugNode(node);
        if (isPresent(debugNode)) {
          var debugParent = debugNode.parent;
          if (viewRootNodes.length > 0 && isPresent(debugParent)) {
            var debugViewRootNodes = [];
            viewRootNodes.forEach(function(rootNode) {
              return debugViewRootNodes.push(getDebugNode(rootNode));
            });
            debugParent.insertChildrenAfter(debugNode, debugViewRootNodes);
          }
        }
        this._delegate.attachViewAfter(node, viewRootNodes);
      };
      DebugDomRenderer.prototype.detachView = function(viewRootNodes) {
        viewRootNodes.forEach(function(node) {
          var debugNode = getDebugNode(node);
          if (isPresent(debugNode) && isPresent(debugNode.parent)) {
            debugNode.parent.removeChild(debugNode);
          }
        });
        this._delegate.detachView(viewRootNodes);
      };
      DebugDomRenderer.prototype.destroyView = function(hostElement, viewAllNodes) {
        viewAllNodes.forEach(function(node) {
          removeDebugNodeFromIndex(getDebugNode(node));
        });
        this._delegate.destroyView(hostElement, viewAllNodes);
      };
      DebugDomRenderer.prototype.listen = function(renderElement, name, callback) {
        var debugEl = getDebugNode(renderElement);
        if (isPresent(debugEl)) {
          debugEl.listeners.push(new EventListener(name, callback));
        }
        return this._delegate.listen(renderElement, name, callback);
      };
      DebugDomRenderer.prototype.listenGlobal = function(target, name, callback) {
        return this._delegate.listenGlobal(target, name, callback);
      };
      DebugDomRenderer.prototype.setElementProperty = function(renderElement, propertyName, propertyValue) {
        var debugEl = getDebugNode(renderElement);
        if (isPresent(debugEl) && debugEl instanceof DebugElement) {
          debugEl.properties[propertyName] = propertyValue;
        }
        this._delegate.setElementProperty(renderElement, propertyName, propertyValue);
      };
      DebugDomRenderer.prototype.setElementAttribute = function(renderElement, attributeName, attributeValue) {
        var debugEl = getDebugNode(renderElement);
        if (isPresent(debugEl) && debugEl instanceof DebugElement) {
          debugEl.attributes[attributeName] = attributeValue;
        }
        this._delegate.setElementAttribute(renderElement, attributeName, attributeValue);
      };
      DebugDomRenderer.prototype.setBindingDebugInfo = function(renderElement, propertyName, propertyValue) {
        this._delegate.setBindingDebugInfo(renderElement, propertyName, propertyValue);
      };
      DebugDomRenderer.prototype.setElementClass = function(renderElement, className, isAdd) {
        var debugEl = getDebugNode(renderElement);
        if (isPresent(debugEl) && debugEl instanceof DebugElement) {
          debugEl.classes[className] = isAdd;
        }
        this._delegate.setElementClass(renderElement, className, isAdd);
      };
      DebugDomRenderer.prototype.setElementStyle = function(renderElement, styleName, styleValue) {
        var debugEl = getDebugNode(renderElement);
        if (isPresent(debugEl) && debugEl instanceof DebugElement) {
          debugEl.styles[styleName] = styleValue;
        }
        this._delegate.setElementStyle(renderElement, styleName, styleValue);
      };
      DebugDomRenderer.prototype.invokeElementMethod = function(renderElement, methodName, args) {
        this._delegate.invokeElementMethod(renderElement, methodName, args);
      };
      DebugDomRenderer.prototype.setText = function(renderNode, text) {
        this._delegate.setText(renderNode, text);
      };
      DebugDomRenderer.prototype.animate = function(element, startingStyles, keyframes, duration, delay, easing) {
        return this._delegate.animate(element, startingStyles, keyframes, duration, delay, easing);
      };
      return DebugDomRenderer;
    }());
    var StaticNodeDebugInfo = (function() {
      function StaticNodeDebugInfo(providerTokens, componentToken, refTokens) {
        this.providerTokens = providerTokens;
        this.componentToken = componentToken;
        this.refTokens = refTokens;
      }
      return StaticNodeDebugInfo;
    }());
    var DebugContext = (function() {
      function DebugContext(_view, _nodeIndex, _tplRow, _tplCol) {
        this._view = _view;
        this._nodeIndex = _nodeIndex;
        this._tplRow = _tplRow;
        this._tplCol = _tplCol;
      }
      Object.defineProperty(DebugContext.prototype, "_staticNodeInfo", {
        get: function() {
          return isPresent(this._nodeIndex) ? this._view.staticNodeDebugInfos[this._nodeIndex] : null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(DebugContext.prototype, "context", {
        get: function() {
          return this._view.context;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(DebugContext.prototype, "component", {
        get: function() {
          var staticNodeInfo = this._staticNodeInfo;
          if (isPresent(staticNodeInfo) && isPresent(staticNodeInfo.componentToken)) {
            return this.injector.get(staticNodeInfo.componentToken);
          }
          return null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(DebugContext.prototype, "componentRenderElement", {
        get: function() {
          var componentView = this._view;
          while (isPresent(componentView.declarationAppElement) && componentView.type !== ViewType.COMPONENT) {
            componentView = componentView.declarationAppElement.parentView;
          }
          return isPresent(componentView.declarationAppElement) ? componentView.declarationAppElement.nativeElement : null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(DebugContext.prototype, "injector", {
        get: function() {
          return this._view.injector(this._nodeIndex);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(DebugContext.prototype, "renderNode", {
        get: function() {
          if (isPresent(this._nodeIndex) && this._view.allNodes) {
            return this._view.allNodes[this._nodeIndex];
          } else {
            return null;
          }
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(DebugContext.prototype, "providerTokens", {
        get: function() {
          var staticNodeInfo = this._staticNodeInfo;
          return isPresent(staticNodeInfo) ? staticNodeInfo.providerTokens : null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(DebugContext.prototype, "source", {
        get: function() {
          return this._view.componentType.templateUrl + ":" + this._tplRow + ":" + this._tplCol;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(DebugContext.prototype, "references", {
        get: function() {
          var _this = this;
          var varValues = {};
          var staticNodeInfo = this._staticNodeInfo;
          if (isPresent(staticNodeInfo)) {
            var refs = staticNodeInfo.refTokens;
            Object.keys(refs).forEach(function(refName) {
              var refToken = refs[refName];
              var varValue;
              if (isBlank(refToken)) {
                varValue = _this._view.allNodes ? _this._view.allNodes[_this._nodeIndex] : null;
              } else {
                varValue = _this._view.injectorGet(refToken, _this._nodeIndex, null);
              }
              varValues[refName] = varValue;
            });
          }
          return varValues;
        },
        enumerable: true,
        configurable: true
      });
      return DebugContext;
    }());
    var AnimationTransitionEvent = (function() {
      function AnimationTransitionEvent(_a) {
        var fromState = _a.fromState,
            toState = _a.toState,
            totalTime = _a.totalTime;
        this.fromState = fromState;
        this.toState = toState;
        this.totalTime = totalTime;
      }
      return AnimationTransitionEvent;
    }());
    var ViewAnimationMap = (function() {
      function ViewAnimationMap() {
        this._map = new Map();
        this._allPlayers = [];
      }
      Object.defineProperty(ViewAnimationMap.prototype, "length", {
        get: function() {
          return this.getAllPlayers().length;
        },
        enumerable: true,
        configurable: true
      });
      ViewAnimationMap.prototype.find = function(element, animationName) {
        var playersByAnimation = this._map.get(element);
        if (isPresent(playersByAnimation)) {
          return playersByAnimation[animationName];
        }
      };
      ViewAnimationMap.prototype.findAllPlayersByElement = function(element) {
        var el = this._map.get(element);
        return el ? Object.keys(el).map(function(k) {
          return el[k];
        }) : [];
      };
      ViewAnimationMap.prototype.set = function(element, animationName, player) {
        var playersByAnimation = this._map.get(element);
        if (!isPresent(playersByAnimation)) {
          playersByAnimation = {};
        }
        var existingEntry = playersByAnimation[animationName];
        if (isPresent(existingEntry)) {
          this.remove(element, animationName);
        }
        playersByAnimation[animationName] = player;
        this._allPlayers.push(player);
        this._map.set(element, playersByAnimation);
      };
      ViewAnimationMap.prototype.getAllPlayers = function() {
        return this._allPlayers;
      };
      ViewAnimationMap.prototype.remove = function(element, animationName) {
        var playersByAnimation = this._map.get(element);
        if (playersByAnimation) {
          var player = playersByAnimation[animationName];
          delete playersByAnimation[animationName];
          var index = this._allPlayers.indexOf(player);
          this._allPlayers.splice(index, 1);
          if (Object.keys(playersByAnimation).length === 0) {
            this._map.delete(element);
          }
        }
      };
      return ViewAnimationMap;
    }());
    var __extends$15 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var _UNDEFINED$1 = new Object();
    var ElementInjector = (function(_super) {
      __extends$15(ElementInjector, _super);
      function ElementInjector(_view, _nodeIndex) {
        _super.call(this);
        this._view = _view;
        this._nodeIndex = _nodeIndex;
      }
      ElementInjector.prototype.get = function(token, notFoundValue) {
        if (notFoundValue === void 0) {
          notFoundValue = THROW_IF_NOT_FOUND;
        }
        var result = _UNDEFINED$1;
        if (result === _UNDEFINED$1) {
          result = this._view.injectorGet(token, this._nodeIndex, _UNDEFINED$1);
        }
        if (result === _UNDEFINED$1) {
          result = this._view.parentInjector.get(token, notFoundValue);
        }
        return result;
      };
      return ElementInjector;
    }(Injector));
    var __extends$14 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var _scope_check = wtfCreateScope("AppView#check(ascii id)");
    var AppView = (function() {
      function AppView(clazz, componentType, type, viewUtils, parentInjector, declarationAppElement, cdMode) {
        this.clazz = clazz;
        this.componentType = componentType;
        this.type = type;
        this.viewUtils = viewUtils;
        this.parentInjector = parentInjector;
        this.declarationAppElement = declarationAppElement;
        this.cdMode = cdMode;
        this.contentChildren = [];
        this.viewChildren = [];
        this.viewContainerElement = null;
        this.numberOfChecks = 0;
        this.animationPlayers = new ViewAnimationMap();
        this._animationListeners = new Map();
        this.ref = new ViewRef_(this);
        if (type === ViewType.COMPONENT || type === ViewType.HOST) {
          this.renderer = viewUtils.renderComponent(componentType);
        } else {
          this.renderer = declarationAppElement.parentView.renderer;
        }
      }
      Object.defineProperty(AppView.prototype, "destroyed", {
        get: function() {
          return this.cdMode === ChangeDetectorStatus.Destroyed;
        },
        enumerable: true,
        configurable: true
      });
      AppView.prototype.cancelActiveAnimation = function(element, animationName, removeAllAnimations) {
        if (removeAllAnimations === void 0) {
          removeAllAnimations = false;
        }
        if (removeAllAnimations) {
          this.animationPlayers.findAllPlayersByElement(element).forEach(function(player) {
            return player.destroy();
          });
        } else {
          var player = this.animationPlayers.find(element, animationName);
          if (isPresent(player)) {
            player.destroy();
          }
        }
      };
      AppView.prototype.queueAnimation = function(element, animationName, player, totalTime, fromState, toState) {
        var _this = this;
        queueAnimation(player);
        var event = new AnimationTransitionEvent({
          'fromState': fromState,
          'toState': toState,
          'totalTime': totalTime
        });
        this.animationPlayers.set(element, animationName, player);
        player.onDone(function() {
          _this.triggerAnimationOutput(element, animationName, 'done', event);
          _this.animationPlayers.remove(element, animationName);
        });
        player.onStart(function() {
          _this.triggerAnimationOutput(element, animationName, 'start', event);
        });
      };
      AppView.prototype.triggerAnimationOutput = function(element, animationName, phase, event) {
        var listeners = this._animationListeners.get(element);
        if (isPresent(listeners) && listeners.length) {
          for (var i = 0; i < listeners.length; i++) {
            var listener = listeners[i];
            if (listener.eventName === animationName && listener.eventPhase === phase) {
              listener.handler(event);
              break;
            }
          }
        }
      };
      AppView.prototype.registerAnimationOutput = function(element, eventName, eventPhase, eventHandler) {
        var animations = this._animationListeners.get(element);
        if (!isPresent(animations)) {
          this._animationListeners.set(element, animations = []);
        }
        animations.push(new _AnimationOutputHandler(eventName, eventPhase, eventHandler));
      };
      AppView.prototype.create = function(context, givenProjectableNodes, rootSelectorOrNode) {
        this.context = context;
        var projectableNodes;
        switch (this.type) {
          case ViewType.COMPONENT:
            projectableNodes = ensureSlotCount(givenProjectableNodes, this.componentType.slotCount);
            break;
          case ViewType.EMBEDDED:
            projectableNodes = this.declarationAppElement.parentView.projectableNodes;
            break;
          case ViewType.HOST:
            projectableNodes = givenProjectableNodes;
            break;
        }
        this._hasExternalHostElement = isPresent(rootSelectorOrNode);
        this.projectableNodes = projectableNodes;
        return this.createInternal(rootSelectorOrNode);
      };
      AppView.prototype.createInternal = function(rootSelectorOrNode) {
        return null;
      };
      AppView.prototype.init = function(rootNodesOrAppElements, allNodes, disposables, subscriptions) {
        this.rootNodesOrAppElements = rootNodesOrAppElements;
        this.allNodes = allNodes;
        this.disposables = disposables;
        this.subscriptions = subscriptions;
        if (this.type === ViewType.COMPONENT) {
          this.declarationAppElement.parentView.viewChildren.push(this);
          this.dirtyParentQueriesInternal();
        }
      };
      AppView.prototype.selectOrCreateHostElement = function(elementName, rootSelectorOrNode, debugInfo) {
        var hostElement;
        if (isPresent(rootSelectorOrNode)) {
          hostElement = this.renderer.selectRootElement(rootSelectorOrNode, debugInfo);
        } else {
          hostElement = this.renderer.createElement(null, elementName, debugInfo);
        }
        return hostElement;
      };
      AppView.prototype.injectorGet = function(token, nodeIndex, notFoundResult) {
        return this.injectorGetInternal(token, nodeIndex, notFoundResult);
      };
      AppView.prototype.injectorGetInternal = function(token, nodeIndex, notFoundResult) {
        return notFoundResult;
      };
      AppView.prototype.injector = function(nodeIndex) {
        if (isPresent(nodeIndex)) {
          return new ElementInjector(this, nodeIndex);
        } else {
          return this.parentInjector;
        }
      };
      AppView.prototype.destroy = function() {
        if (this._hasExternalHostElement) {
          this.renderer.detachView(this.flatRootNodes);
        } else if (isPresent(this.viewContainerElement)) {
          this.viewContainerElement.detachView(this.viewContainerElement.nestedViews.indexOf(this));
        }
        this._destroyRecurse();
      };
      AppView.prototype._destroyRecurse = function() {
        if (this.cdMode === ChangeDetectorStatus.Destroyed) {
          return;
        }
        var children = this.contentChildren;
        for (var i = 0; i < children.length; i++) {
          children[i]._destroyRecurse();
        }
        children = this.viewChildren;
        for (var i = 0; i < children.length; i++) {
          children[i]._destroyRecurse();
        }
        this.destroyLocal();
        this.cdMode = ChangeDetectorStatus.Destroyed;
      };
      AppView.prototype.destroyLocal = function() {
        var _this = this;
        var hostElement = this.type === ViewType.COMPONENT ? this.declarationAppElement.nativeElement : null;
        for (var i = 0; i < this.disposables.length; i++) {
          this.disposables[i]();
        }
        for (var i = 0; i < this.subscriptions.length; i++) {
          this.subscriptions[i].unsubscribe();
        }
        this.destroyInternal();
        this.dirtyParentQueriesInternal();
        if (this.animationPlayers.length == 0) {
          this.renderer.destroyView(hostElement, this.allNodes);
        } else {
          var player = new AnimationGroupPlayer(this.animationPlayers.getAllPlayers());
          player.onDone(function() {
            _this.renderer.destroyView(hostElement, _this.allNodes);
          });
        }
      };
      AppView.prototype.destroyInternal = function() {};
      AppView.prototype.detachInternal = function() {};
      AppView.prototype.detach = function() {
        var _this = this;
        this.detachInternal();
        if (this.animationPlayers.length == 0) {
          this.renderer.detachView(this.flatRootNodes);
        } else {
          var player = new AnimationGroupPlayer(this.animationPlayers.getAllPlayers());
          player.onDone(function() {
            _this.renderer.detachView(_this.flatRootNodes);
          });
        }
      };
      Object.defineProperty(AppView.prototype, "changeDetectorRef", {
        get: function() {
          return this.ref;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AppView.prototype, "parent", {
        get: function() {
          return isPresent(this.declarationAppElement) ? this.declarationAppElement.parentView : null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AppView.prototype, "flatRootNodes", {
        get: function() {
          return flattenNestedViewRenderNodes(this.rootNodesOrAppElements);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AppView.prototype, "lastRootNode", {
        get: function() {
          var lastNode = this.rootNodesOrAppElements.length > 0 ? this.rootNodesOrAppElements[this.rootNodesOrAppElements.length - 1] : null;
          return _findLastRenderNode(lastNode);
        },
        enumerable: true,
        configurable: true
      });
      AppView.prototype.dirtyParentQueriesInternal = function() {};
      AppView.prototype.detectChanges = function(throwOnChange) {
        var s = _scope_check(this.clazz);
        if (this.cdMode === ChangeDetectorStatus.Checked || this.cdMode === ChangeDetectorStatus.Errored)
          return;
        if (this.cdMode === ChangeDetectorStatus.Destroyed) {
          this.throwDestroyedError('detectChanges');
        }
        this.detectChangesInternal(throwOnChange);
        if (this.cdMode === ChangeDetectorStatus.CheckOnce)
          this.cdMode = ChangeDetectorStatus.Checked;
        this.numberOfChecks++;
        wtfLeave(s);
      };
      AppView.prototype.detectChangesInternal = function(throwOnChange) {
        this.detectContentChildrenChanges(throwOnChange);
        this.detectViewChildrenChanges(throwOnChange);
      };
      AppView.prototype.detectContentChildrenChanges = function(throwOnChange) {
        for (var i = 0; i < this.contentChildren.length; ++i) {
          var child = this.contentChildren[i];
          if (child.cdMode === ChangeDetectorStatus.Detached)
            continue;
          child.detectChanges(throwOnChange);
        }
      };
      AppView.prototype.detectViewChildrenChanges = function(throwOnChange) {
        for (var i = 0; i < this.viewChildren.length; ++i) {
          var child = this.viewChildren[i];
          if (child.cdMode === ChangeDetectorStatus.Detached)
            continue;
          child.detectChanges(throwOnChange);
        }
      };
      AppView.prototype.markContentChildAsMoved = function(renderAppElement) {
        this.dirtyParentQueriesInternal();
      };
      AppView.prototype.addToContentChildren = function(renderAppElement) {
        renderAppElement.parentView.contentChildren.push(this);
        this.viewContainerElement = renderAppElement;
        this.dirtyParentQueriesInternal();
      };
      AppView.prototype.removeFromContentChildren = function(renderAppElement) {
        ListWrapper.remove(renderAppElement.parentView.contentChildren, this);
        this.dirtyParentQueriesInternal();
        this.viewContainerElement = null;
      };
      AppView.prototype.markAsCheckOnce = function() {
        this.cdMode = ChangeDetectorStatus.CheckOnce;
      };
      AppView.prototype.markPathToRootAsCheckOnce = function() {
        var c = this;
        while (isPresent(c) && c.cdMode !== ChangeDetectorStatus.Detached) {
          if (c.cdMode === ChangeDetectorStatus.Checked) {
            c.cdMode = ChangeDetectorStatus.CheckOnce;
          }
          var parentEl = c.type === ViewType.COMPONENT ? c.declarationAppElement : c.viewContainerElement;
          c = isPresent(parentEl) ? parentEl.parentView : null;
        }
      };
      AppView.prototype.eventHandler = function(cb) {
        return cb;
      };
      AppView.prototype.throwDestroyedError = function(details) {
        throw new ViewDestroyedError(details);
      };
      return AppView;
    }());
    var DebugAppView = (function(_super) {
      __extends$14(DebugAppView, _super);
      function DebugAppView(clazz, componentType, type, viewUtils, parentInjector, declarationAppElement, cdMode, staticNodeDebugInfos) {
        _super.call(this, clazz, componentType, type, viewUtils, parentInjector, declarationAppElement, cdMode);
        this.staticNodeDebugInfos = staticNodeDebugInfos;
        this._currentDebugContext = null;
      }
      DebugAppView.prototype.create = function(context, givenProjectableNodes, rootSelectorOrNode) {
        this._resetDebug();
        try {
          return _super.prototype.create.call(this, context, givenProjectableNodes, rootSelectorOrNode);
        } catch (e) {
          this._rethrowWithContext(e);
          throw e;
        }
      };
      DebugAppView.prototype.injectorGet = function(token, nodeIndex, notFoundResult) {
        this._resetDebug();
        try {
          return _super.prototype.injectorGet.call(this, token, nodeIndex, notFoundResult);
        } catch (e) {
          this._rethrowWithContext(e);
          throw e;
        }
      };
      DebugAppView.prototype.detach = function() {
        this._resetDebug();
        try {
          _super.prototype.detach.call(this);
        } catch (e) {
          this._rethrowWithContext(e);
          throw e;
        }
      };
      DebugAppView.prototype.destroyLocal = function() {
        this._resetDebug();
        try {
          _super.prototype.destroyLocal.call(this);
        } catch (e) {
          this._rethrowWithContext(e);
          throw e;
        }
      };
      DebugAppView.prototype.detectChanges = function(throwOnChange) {
        this._resetDebug();
        try {
          _super.prototype.detectChanges.call(this, throwOnChange);
        } catch (e) {
          this._rethrowWithContext(e);
          throw e;
        }
      };
      DebugAppView.prototype._resetDebug = function() {
        this._currentDebugContext = null;
      };
      DebugAppView.prototype.debug = function(nodeIndex, rowNum, colNum) {
        return this._currentDebugContext = new DebugContext(this, nodeIndex, rowNum, colNum);
      };
      DebugAppView.prototype._rethrowWithContext = function(e) {
        if (!(e instanceof ViewWrappedError)) {
          if (!(e instanceof ExpressionChangedAfterItHasBeenCheckedError)) {
            this.cdMode = ChangeDetectorStatus.Errored;
          }
          if (isPresent(this._currentDebugContext)) {
            throw new ViewWrappedError(e, this._currentDebugContext);
          }
        }
      };
      DebugAppView.prototype.eventHandler = function(cb) {
        var _this = this;
        var superHandler = _super.prototype.eventHandler.call(this, cb);
        return function(event) {
          _this._resetDebug();
          try {
            return superHandler(event);
          } catch (e) {
            _this._rethrowWithContext(e);
            throw e;
          }
        };
      };
      return DebugAppView;
    }(AppView));
    function _findLastRenderNode(node) {
      var lastNode;
      if (node instanceof AppElement) {
        var appEl = node;
        lastNode = appEl.nativeElement;
        if (isPresent(appEl.nestedViews)) {
          for (var i = appEl.nestedViews.length - 1; i >= 0; i--) {
            var nestedView = appEl.nestedViews[i];
            if (nestedView.rootNodesOrAppElements.length > 0) {
              lastNode = _findLastRenderNode(nestedView.rootNodesOrAppElements[nestedView.rootNodesOrAppElements.length - 1]);
            }
          }
        }
      } else {
        lastNode = node;
      }
      return lastNode;
    }
    var _AnimationOutputHandler = (function() {
      function _AnimationOutputHandler(eventName, eventPhase, handler) {
        this.eventName = eventName;
        this.eventPhase = eventPhase;
        this.handler = handler;
      }
      return _AnimationOutputHandler;
    }());
    var __core_private__ = {
      isDefaultChangeDetectionStrategy: isDefaultChangeDetectionStrategy,
      ChangeDetectorStatus: ChangeDetectorStatus,
      constructDependencies: constructDependencies,
      LifecycleHooks: LifecycleHooks,
      LIFECYCLE_HOOKS_VALUES: LIFECYCLE_HOOKS_VALUES,
      ReflectorReader: ReflectorReader,
      CodegenComponentFactoryResolver: CodegenComponentFactoryResolver,
      AppElement: AppElement,
      AppView: AppView,
      DebugAppView: DebugAppView,
      NgModuleInjector: NgModuleInjector,
      registerModuleFactory: registerModuleFactory,
      ViewType: ViewType,
      MAX_INTERPOLATION_VALUES: MAX_INTERPOLATION_VALUES,
      checkBinding: checkBinding,
      flattenNestedViewRenderNodes: flattenNestedViewRenderNodes,
      interpolate: interpolate,
      ViewUtils: ViewUtils,
      ViewMetadata: ViewMetadata,
      DebugContext: DebugContext,
      StaticNodeDebugInfo: StaticNodeDebugInfo,
      devModeEqual: devModeEqual,
      UNINITIALIZED: UNINITIALIZED,
      ValueUnwrapper: ValueUnwrapper,
      RenderDebugInfo: RenderDebugInfo,
      TemplateRef_: TemplateRef_,
      ReflectionCapabilities: ReflectionCapabilities,
      makeDecorator: makeDecorator,
      DebugDomRootRenderer: DebugDomRootRenderer,
      EMPTY_ARRAY: EMPTY_ARRAY,
      EMPTY_MAP: EMPTY_MAP,
      pureProxy1: pureProxy1,
      pureProxy2: pureProxy2,
      pureProxy3: pureProxy3,
      pureProxy4: pureProxy4,
      pureProxy5: pureProxy5,
      pureProxy6: pureProxy6,
      pureProxy7: pureProxy7,
      pureProxy8: pureProxy8,
      pureProxy9: pureProxy9,
      pureProxy10: pureProxy10,
      castByValue: castByValue,
      Console: Console,
      reflector: reflector,
      Reflector: Reflector,
      NoOpAnimationPlayer: NoOpAnimationPlayer,
      AnimationPlayer: AnimationPlayer,
      AnimationSequencePlayer: AnimationSequencePlayer,
      AnimationGroupPlayer: AnimationGroupPlayer,
      AnimationKeyframe: AnimationKeyframe,
      prepareFinalAnimationStyles: prepareFinalAnimationStyles,
      balanceAnimationKeyframes: balanceAnimationKeyframes,
      flattenStyles: flattenStyles,
      clearStyles: clearStyles,
      renderStyles: renderStyles,
      collectAndResolveStyles: collectAndResolveStyles,
      AnimationStyles: AnimationStyles,
      ANY_STATE: ANY_STATE,
      DEFAULT_STATE: DEFAULT_STATE,
      EMPTY_STATE: EMPTY_STATE,
      FILL_STYLE_FLAG: FILL_STYLE_FLAG,
      ComponentStillLoadingError: ComponentStillLoadingError,
      isPromise: isPromise
    };
    exports.createPlatform = createPlatform;
    exports.assertPlatform = assertPlatform;
    exports.destroyPlatform = destroyPlatform;
    exports.getPlatform = getPlatform;
    exports.PlatformRef = PlatformRef;
    exports.ApplicationRef = ApplicationRef;
    exports.enableProdMode = enableProdMode;
    exports.isDevMode = isDevMode;
    exports.createPlatformFactory = createPlatformFactory;
    exports.APP_ID = APP_ID;
    exports.PACKAGE_ROOT_URL = PACKAGE_ROOT_URL;
    exports.PLATFORM_INITIALIZER = PLATFORM_INITIALIZER;
    exports.APP_BOOTSTRAP_LISTENER = APP_BOOTSTRAP_LISTENER;
    exports.APP_INITIALIZER = APP_INITIALIZER;
    exports.ApplicationInitStatus = ApplicationInitStatus;
    exports.DebugElement = DebugElement;
    exports.DebugNode = DebugNode;
    exports.asNativeElements = asNativeElements;
    exports.getDebugNode = getDebugNode;
    exports.Testability = Testability;
    exports.TestabilityRegistry = TestabilityRegistry;
    exports.setTestabilityGetter = setTestabilityGetter;
    exports.TRANSLATIONS = TRANSLATIONS;
    exports.TRANSLATIONS_FORMAT = TRANSLATIONS_FORMAT;
    exports.LOCALE_ID = LOCALE_ID;
    exports.ApplicationModule = ApplicationModule;
    exports.wtfCreateScope = wtfCreateScope;
    exports.wtfLeave = wtfLeave;
    exports.wtfStartTimeRange = wtfStartTimeRange;
    exports.wtfEndTimeRange = wtfEndTimeRange;
    exports.Type = Type;
    exports.EventEmitter = EventEmitter;
    exports.ErrorHandler = ErrorHandler;
    exports.AnimationTransitionEvent = AnimationTransitionEvent;
    exports.AnimationPlayer = AnimationPlayer;
    exports.Sanitizer = Sanitizer;
    exports.ANALYZE_FOR_ENTRY_COMPONENTS = ANALYZE_FOR_ENTRY_COMPONENTS;
    exports.Attribute = Attribute;
    exports.ContentChild = ContentChild;
    exports.ContentChildren = ContentChildren;
    exports.Query = Query;
    exports.ViewChild = ViewChild;
    exports.ViewChildren = ViewChildren;
    exports.Component = Component;
    exports.Directive = Directive;
    exports.HostBinding = HostBinding;
    exports.HostListener = HostListener;
    exports.Input = Input;
    exports.Output = Output;
    exports.Pipe = Pipe;
    exports.AfterContentChecked = AfterContentChecked;
    exports.AfterContentInit = AfterContentInit;
    exports.AfterViewChecked = AfterViewChecked;
    exports.AfterViewInit = AfterViewInit;
    exports.DoCheck = DoCheck;
    exports.OnChanges = OnChanges;
    exports.OnDestroy = OnDestroy;
    exports.OnInit = OnInit;
    exports.CUSTOM_ELEMENTS_SCHEMA = CUSTOM_ELEMENTS_SCHEMA;
    exports.NO_ERRORS_SCHEMA = NO_ERRORS_SCHEMA;
    exports.NgModule = NgModule;
    exports.Class = Class;
    exports.forwardRef = forwardRef;
    exports.resolveForwardRef = resolveForwardRef;
    exports.Injector = Injector;
    exports.ReflectiveInjector = ReflectiveInjector;
    exports.ResolvedReflectiveFactory = ResolvedReflectiveFactory;
    exports.ReflectiveKey = ReflectiveKey;
    exports.OpaqueToken = OpaqueToken;
    exports.Inject = Inject;
    exports.Optional = Optional;
    exports.Injectable = Injectable;
    exports.Self = Self;
    exports.SkipSelf = SkipSelf;
    exports.Host = Host;
    exports.NgZone = NgZone;
    exports.RenderComponentType = RenderComponentType;
    exports.Renderer = Renderer;
    exports.RootRenderer = RootRenderer;
    exports.COMPILER_OPTIONS = COMPILER_OPTIONS;
    exports.Compiler = Compiler;
    exports.CompilerFactory = CompilerFactory;
    exports.ModuleWithComponentFactories = ModuleWithComponentFactories;
    exports.ComponentFactory = ComponentFactory;
    exports.ComponentRef = ComponentRef;
    exports.ComponentFactoryResolver = ComponentFactoryResolver;
    exports.ElementRef = ElementRef;
    exports.NgModuleFactory = NgModuleFactory;
    exports.NgModuleRef = NgModuleRef;
    exports.NgModuleFactoryLoader = NgModuleFactoryLoader;
    exports.getModuleFactory = getModuleFactory;
    exports.QueryList = QueryList;
    exports.SystemJsNgModuleLoader = SystemJsNgModuleLoader;
    exports.SystemJsNgModuleLoaderConfig = SystemJsNgModuleLoaderConfig;
    exports.TemplateRef = TemplateRef;
    exports.ViewContainerRef = ViewContainerRef;
    exports.EmbeddedViewRef = EmbeddedViewRef;
    exports.ViewRef = ViewRef;
    exports.ChangeDetectorRef = ChangeDetectorRef;
    exports.CollectionChangeRecord = CollectionChangeRecord;
    exports.DefaultIterableDiffer = DefaultIterableDiffer;
    exports.IterableDiffers = IterableDiffers;
    exports.KeyValueChangeRecord = KeyValueChangeRecord;
    exports.KeyValueDiffers = KeyValueDiffers;
    exports.SimpleChange = SimpleChange;
    exports.WrappedValue = WrappedValue;
    exports.platformCore = platformCore;
    exports.__core_private__ = __core_private__;
    exports.AUTO_STYLE = AUTO_STYLE;
    exports.AnimationEntryMetadata = AnimationEntryMetadata;
    exports.AnimationStateMetadata = AnimationStateMetadata;
    exports.AnimationStateDeclarationMetadata = AnimationStateDeclarationMetadata;
    exports.AnimationStateTransitionMetadata = AnimationStateTransitionMetadata;
    exports.AnimationMetadata = AnimationMetadata;
    exports.AnimationKeyframesSequenceMetadata = AnimationKeyframesSequenceMetadata;
    exports.AnimationStyleMetadata = AnimationStyleMetadata;
    exports.AnimationAnimateMetadata = AnimationAnimateMetadata;
    exports.AnimationWithStepsMetadata = AnimationWithStepsMetadata;
    exports.AnimationSequenceMetadata = AnimationSequenceMetadata;
    exports.AnimationGroupMetadata = AnimationGroupMetadata;
    exports.animate = animate;
    exports.group = group;
    exports.sequence = sequence;
    exports.style = style;
    exports.state = state;
    exports.keyframes = keyframes;
    exports.transition = transition;
    exports.trigger = trigger;
  }));
})(require('process'));