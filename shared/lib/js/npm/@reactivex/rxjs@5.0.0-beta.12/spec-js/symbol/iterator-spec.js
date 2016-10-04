/* */ 
"use strict";
var chai_1 = require('chai');
var root_1 = require('../../dist/cjs/util/root');
var iterator_1 = require('../../dist/cjs/symbol/iterator');
describe('iterator symbol', function() {
  it('should exist in the proper form', function() {
    var Symbol = root_1.root.Symbol;
    if (typeof Symbol === 'function') {
      if (Symbol.iterator) {
        chai_1.expect(iterator_1.$$iterator).to.equal(Symbol.iterator);
      } else if (root_1.root.Set && typeof(new root_1.root.Set()['@@iterator']) === 'function') {
        chai_1.expect(iterator_1.$$iterator).to.equal('@@iterator');
      } else if (root_1.root.Map) {
        var keys = Object.getOwnPropertyNames(root_1.root.Map.prototype);
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          if (key !== 'entries' && key !== 'size' && root_1.root.Map.prototype[key] === root_1.root.Map.prototype['entries']) {
            chai_1.expect(iterator_1.$$iterator).to.equal(key);
            break;
          }
        }
      } else if (typeof Symbol.for === 'function') {
        chai_1.expect(iterator_1.$$iterator).to.equal(Symbol.for('iterator'));
      }
    } else {
      chai_1.expect(iterator_1.$$iterator).to.equal('@@iterator');
    }
  });
});
