/* */ 
"use strict";
var Rx = require('../../dist/cjs/Rx');
var root_1 = require('../../dist/cjs/util/root');
var iterator_1 = require('../../dist/cjs/symbol/iterator');
var symbol_observable_1 = require('symbol-observable');
function lowerCaseO() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i - 0] = arguments[_i];
  }
  var values = [].slice.apply(arguments);
  var o = {subscribe: function(observer) {
      values.forEach(function(v) {
        observer.next(v);
      });
      observer.complete();
    }};
  o[Symbol.observable] = function() {
    return this;
  };
  return o;
}
exports.lowerCaseO = lowerCaseO;
;
exports.createObservableInputs = function(value) {
  return Rx.Observable.of(Rx.Observable.of(value), Rx.Observable.of(value, Rx.Scheduler.async), [value], Promise.resolve(value), ((_a = {}, _a[iterator_1.$$iterator] = function() {
    var iteratorResults = [{
      value: value,
      done: false
    }, {done: true}];
    return {next: function() {
        return iteratorResults.shift();
      }};
  }, _a)), ((_b = {}, _b[symbol_observable_1.default] = function() {
    return Rx.Observable.of(value);
  }, _b)));
  var _a,
      _b;
};
global.__root__ = root_1.root;