/* */ 
"format cjs";
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('./platform-browser.umd')) : typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser'], factory) : (factory((global.ng = global.ng || {}, global.ng.platformBrowser = global.ng.platformBrowser || {}, global.ng.platformBrowser.testing = global.ng.platformBrowser.testing || {}), global.ng.core, global.ng.platformBrowser));
}(this, function(exports, _angular_core, _angular_platformBrowser) {
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
  var _global = globalScope;
  _global.assert = function assert(condition) {};
  function isPresent(obj) {
    return obj !== undefined && obj !== null;
  }
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
  var getDOM = _angular_platformBrowser.__platform_browser_private__.getDOM;
  var BrowserDomAdapter = _angular_platformBrowser.__platform_browser_private__.BrowserDomAdapter;
  var ELEMENT_PROBE_PROVIDERS = _angular_platformBrowser.__platform_browser_private__.ELEMENT_PROBE_PROVIDERS;
  var BrowserDetection = (function() {
    function BrowserDetection(ua) {
      this._overrideUa = ua;
    }
    Object.defineProperty(BrowserDetection.prototype, "_ua", {
      get: function() {
        if (isPresent(this._overrideUa)) {
          return this._overrideUa;
        } else {
          return isPresent(getDOM()) ? getDOM().getUserAgent() : '';
        }
      },
      enumerable: true,
      configurable: true
    });
    BrowserDetection.setup = function() {
      browserDetection = new BrowserDetection(null);
    };
    Object.defineProperty(BrowserDetection.prototype, "isFirefox", {
      get: function() {
        return this._ua.indexOf('Firefox') > -1;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isAndroid", {
      get: function() {
        return this._ua.indexOf('Mozilla/5.0') > -1 && this._ua.indexOf('Android') > -1 && this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Chrome') == -1 && this._ua.indexOf('IEMobile') == -1;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isEdge", {
      get: function() {
        return this._ua.indexOf('Edge') > -1;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isIE", {
      get: function() {
        return this._ua.indexOf('Trident') > -1;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isWebkit", {
      get: function() {
        return this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Edge') == -1 && this._ua.indexOf('IEMobile') == -1;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isIOS7", {
      get: function() {
        return (this._ua.indexOf('iPhone OS 7') > -1 || this._ua.indexOf('iPad OS 7') > -1) && this._ua.indexOf('IEMobile') == -1;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isSlow", {
      get: function() {
        return this.isAndroid || this.isIE || this.isIOS7;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "supportsNativeIntlApi", {
      get: function() {
        return !!_global.Intl && _global.Intl !== _global.IntlPolyfill;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isChromeDesktop", {
      get: function() {
        return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Mobile Safari') == -1 && this._ua.indexOf('Edge') == -1;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isOldChrome", {
      get: function() {
        return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Chrome/3') > -1 && this._ua.indexOf('Edge') == -1;
      },
      enumerable: true,
      configurable: true
    });
    return BrowserDetection;
  }());
  BrowserDetection.setup();
  var browserDetection = new BrowserDetection(null);
  function createNgZone() {
    return new _angular_core.NgZone({enableLongStackTrace: true});
  }
  function initBrowserTests() {
    BrowserDomAdapter.makeCurrent();
    BrowserDetection.setup();
  }
  var _TEST_BROWSER_PLATFORM_PROVIDERS = [{
    provide: _angular_core.PLATFORM_INITIALIZER,
    useValue: initBrowserTests,
    multi: true
  }];
  var platformBrowserTesting = _angular_core.createPlatformFactory(_angular_core.platformCore, 'browserTesting', _TEST_BROWSER_PLATFORM_PROVIDERS);
  var BrowserTestingModule = (function() {
    function BrowserTestingModule() {}
    BrowserTestingModule.decorators = [{
      type: _angular_core.NgModule,
      args: [{
        exports: [_angular_platformBrowser.BrowserModule],
        providers: [{
          provide: _angular_core.APP_ID,
          useValue: 'a'
        }, ELEMENT_PROBE_PROVIDERS, {
          provide: _angular_core.NgZone,
          useFactory: createNgZone
        }, {
          provide: _angular_platformBrowser.AnimationDriver,
          useValue: _angular_platformBrowser.AnimationDriver.NOOP
        }]
      }]
    }];
    BrowserTestingModule.ctorParameters = [];
    return BrowserTestingModule;
  }());
  exports.platformBrowserTesting = platformBrowserTesting;
  exports.BrowserTestingModule = BrowserTestingModule;
}));
