/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
var Subscription = Rx.Subscription;
describe('Observable.using', function() {
  it('should dispose of the resource when the subscription is disposed', function(done) {
    var disposed = false;
    var source = Observable.using(function() {
      return new Subscription(function() {
        return disposed = true;
      });
    }, function(resource) {
      return Observable.range(0, 3);
    }).take(2);
    source.subscribe();
    if (disposed) {
      done();
    } else {
      done(new Error('disposed should be true but was false'));
    }
  });
  it('should accept factory returns promise resolves', function(done) {
    var expected = 42;
    var disposed = false;
    var e1 = Observable.using(function() {
      return new Subscription(function() {
        return disposed = true;
      });
    }, function(resource) {
      return new Promise(function(resolve) {
        resolve(expected);
      });
    });
    e1.subscribe(function(x) {
      chai_1.expect(x).to.equal(expected);
    }, function(x) {
      done(new Error('should not be called'));
    }, function() {
      done();
    });
  });
  it('should accept factory returns promise rejects', function(done) {
    var expected = 42;
    var disposed = false;
    var e1 = Observable.using(function() {
      return new Subscription(function() {
        return disposed = true;
      });
    }, function(resource) {
      return new Promise(function(resolve, reject) {
        reject(expected);
      });
    });
    e1.subscribe(function(x) {
      done(new Error('should not be called'));
    }, function(x) {
      chai_1.expect(x).to.equal(expected);
      done();
    }, function() {
      done(new Error('should not be called'));
    });
  });
  it('should raise error when resource factory throws', function(done) {
    var expectedError = 'expected';
    var error = 'error';
    var source = Observable.using(function() {
      throw expectedError;
    }, function(resource) {
      throw error;
    });
    source.subscribe(function(x) {
      done(new Error('should not be called'));
    }, function(x) {
      chai_1.expect(x).to.equal(expectedError);
      done();
    }, function() {
      done(new Error('should not be called'));
    });
  });
  it('should raise error when observable factory throws', function(done) {
    var error = 'error';
    var disposed = false;
    var source = Observable.using(function() {
      return new Subscription(function() {
        return disposed = true;
      });
    }, function(resource) {
      throw error;
    });
    source.subscribe(function(x) {
      done(new Error('should not be called'));
    }, function(x) {
      chai_1.expect(x).to.equal(error);
      done();
    }, function() {
      done(new Error('should not be called'));
    });
  });
});