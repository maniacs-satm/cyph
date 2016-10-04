/* */ 
"use strict";
var chai_1 = require('chai');
var symbol_observable_1 = require('symbol-observable');
var root_1 = require('../../dist/cjs/util/root');
var observable_1 = require('../../dist/cjs/symbol/observable');
describe('observable symbol', function() {
  it('should exist in the proper form', function() {
    var $$observable = observable_1.getSymbolObservable(root_1.root);
    if (root_1.root.Symbol && root_1.root.Symbol.for) {
      chai_1.expect($$observable).to.equal(symbol_observable_1.default);
    } else {
      chai_1.expect($$observable).to.equal('@@observable');
    }
  });
});
