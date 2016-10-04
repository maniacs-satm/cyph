/* */ 
"use strict";
var chai_1 = require('chai');
var MapPolyfill_1 = require('../../dist/cjs/util/MapPolyfill');
describe('MapPolyfill', function() {
  it('should exist', function() {
    chai_1.expect(MapPolyfill_1.MapPolyfill).to.be.a('function');
  });
  it('should act like a hashtable that accepts objects as keys', function() {
    var map = new MapPolyfill_1.MapPolyfill();
    var key1 = {};
    var key2 = {};
    map.set('test', 'hi');
    map.set(key1, 'yo');
    map.set(key2, 'what up');
    chai_1.expect(map.get('test')).to.equal('hi');
    chai_1.expect(map.get(key1)).to.equal('yo');
    chai_1.expect(map.get(key2)).to.equal('what up');
    chai_1.expect(map.size).to.equal(3);
  });
  it('should allow setting keys twice', function() {
    var map = new MapPolyfill_1.MapPolyfill();
    var key1 = {};
    map.set(key1, 'sing');
    map.set(key1, 'yodel');
    chai_1.expect(map.get(key1)).to.equal('yodel');
    chai_1.expect(map.size).to.equal(1);
  });
  it('should have a delete method that removes keys', function() {
    var map = new MapPolyfill_1.MapPolyfill();
    var key1 = {};
    map.set(key1, 'sing');
    chai_1.expect(map.size).to.equal(1);
    map.delete(key1);
    chai_1.expect(map.size).to.equal(0);
    chai_1.expect(map.get(key1)).to.be.a('undefined');
  });
  describe('prototype.forEach', function() {
    it('should exist', function() {
      var map = new MapPolyfill_1.MapPolyfill();
      chai_1.expect(map.forEach).to.be.a('function');
    });
    it('should iterate over keys and values', function() {
      var expectedKeys = ['a', 'b', 'c'];
      var expectedValues = [1, 2, 3];
      var map = new MapPolyfill_1.MapPolyfill();
      map.set('a', 1);
      map.set('b', 2);
      map.set('c', 3);
      var thisArg = {arg: 'value'};
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
