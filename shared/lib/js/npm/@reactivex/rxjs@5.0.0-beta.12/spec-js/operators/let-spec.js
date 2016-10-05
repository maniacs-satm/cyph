/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
describe('Observable.prototype.let', function() {
  it('should be able to compose with let', function(done) {
    var expected = ['aa', 'bb'];
    var i = 0;
    var foo = function(observable) {
      return observable.map(function(x) {
        return x + x;
      });
    };
    Rx.Observable.from(['a', 'b']).let(foo).subscribe(function(x) {
      chai_1.expect(x).to.equal(expected[i++]);
    }, function(x) {
      done(new Error('should not be called'));
    }, function() {
      done();
    });
  });
});