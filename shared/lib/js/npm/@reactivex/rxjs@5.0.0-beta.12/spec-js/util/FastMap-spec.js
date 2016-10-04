/* */ 
"use strict";
var chai_1 = require('chai');
var FastMap_1 = require('../../dist/cjs/util/FastMap');
describe('FastMap', function() {
  it('should exist', function() {
    chai_1.expect(FastMap_1.FastMap).to.be.a('function');
  });
  it('should accept string as keys', function() {
    var map = new FastMap_1.FastMap();
    var key1 = 'keyOne';
    var key2 = 'keyTwo';
    map.set(key1, 'yo');
    map.set(key2, 'what up');
    chai_1.expect(map.get(key1)).to.equal('yo');
    chai_1.expect(map.get(key2)).to.equal('what up');
  });
  it('should allow setting keys twice', function() {
    var map = new FastMap_1.FastMap();
    var key1 = 'keyOne';
    map.set(key1, 'sing');
    map.set(key1, 'yodel');
    chai_1.expect(map.get(key1)).to.equal('yodel');
  });
  it('should have a delete method that removes keys', function() {
    var map = new FastMap_1.FastMap();
    var key1 = 'keyOne';
    map.set(key1, 'sing');
    chai_1.expect(map.delete(key1)).to.be.true;
    chai_1.expect(map.get(key1)).to.be.a('null');
  });
  it('should clear all', function() {
    var map = new FastMap_1.FastMap();
    var key1 = 'keyOne';
    var key2 = 'keyTwo';
    map.set(key1, 'yo');
    map.set(key2, 'what up');
    map.clear();
    chai_1.expect(map.get(key1)).to.be.a('undefined');
    chai_1.expect(map.get(key2)).to.be.a('undefined');
  });
  describe('prototype.forEach', function() {
    it('should exist', function() {
      var map = new FastMap_1.FastMap();
      chai_1.expect(map.forEach).to.be.a('function');
    });
    it('should iterate over keys and values', function() {
      var expectedKeys = ['a', 'b', 'c'];
      var expectedValues = [1, 2, 3];
      var map = new FastMap_1.FastMap();
      map.set('a', 1);
      map.set('b', 2);
      map.set('c', 3);
      var thisArg = {};
      map.forEach(function(value, key) {
        chai_1.expect(this).to.equal(thisArg);
        chai_1.expect(value).to.equal(expectedValues.shift());
        chai_1.expect(key).to.equal(expectedKeys.shift());
      }, thisArg);
      chai_1.expect(expectedValues.length).to.equal(0);
      chai_1.expect(expectedKeys.length).to.equal(0);
    });
  });
});
