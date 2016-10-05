/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
describe('Observable.prototype.toPromise', function() {
  it('should convert an Observable to a promise of its last value', function(done) {
    Observable.of(1, 2, 3).toPromise(Promise).then(function(x) {
      chai_1.expect(x).to.equal(3);
      done();
    });
  });
  it('should handle errors properly', function(done) {
    Observable.throw('bad').toPromise(Promise).then(function() {
      done(new Error('should not be called'));
    }, function(err) {
      chai_1.expect(err).to.equal('bad');
      done();
    });
  });
  it('should allow for global config via Rx.config.Promise', function(done) {
    var wasCalled = false;
    __root__.Rx = {};
    __root__.Rx.config = {};
    __root__.Rx.config.Promise = function MyPromise(callback) {
      wasCalled = true;
      return new Promise(callback);
    };
    Observable.of(42).toPromise().then(function(x) {
      chai_1.expect(wasCalled).to.be.true;
      chai_1.expect(x).to.equal(42);
      delete __root__.Rx;
      done();
    });
  });
});