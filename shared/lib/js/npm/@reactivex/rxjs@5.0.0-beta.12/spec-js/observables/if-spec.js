/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
describe('Observable.if', function() {
  it('should subscribe to thenSource when the conditional returns true', function() {
    var e1 = Observable.if(function() {
      return true;
    }, Observable.of('a'));
    var expected = '(a|)';
    expectObservable(e1).toBe(expected);
  });
  it('should subscribe to elseSource when the conditional returns false', function() {
    var e1 = Observable.if(function() {
      return false;
    }, Observable.of('a'), Observable.of('b'));
    var expected = '(b|)';
    expectObservable(e1).toBe(expected);
  });
  it('should complete without an elseSource when the conditional returns false', function() {
    var e1 = Observable.if(function() {
      return false;
    }, Observable.of('a'));
    var expected = '|';
    expectObservable(e1).toBe(expected);
  });
  it('should raise error when conditional throws', function() {
    var e1 = Observable.if((function() {
      throw 'error';
    }), Observable.of('a'));
    var expected = '#';
    expectObservable(e1).toBe(expected);
  });
  it('should accept resolved promise as thenSource', function(done) {
    var expected = 42;
    var e1 = Observable.if(function() {
      return true;
    }, new Promise(function(resolve) {
      resolve(expected);
    }));
    e1.subscribe(function(x) {
      chai_1.expect(x).to.equal(expected);
    }, function(x) {
      done(new Error('should not be called'));
    }, function() {
      done();
    });
  });
  it('should accept resolved promise as elseSource', function(done) {
    var expected = 42;
    var e1 = Observable.if(function() {
      return false;
    }, Observable.of('a'), new Promise(function(resolve) {
      resolve(expected);
    }));
    e1.subscribe(function(x) {
      chai_1.expect(x).to.equal(expected);
    }, function(x) {
      done(new Error('should not be called'));
    }, function() {
      done();
    });
  });
  it('should accept rejected promise as elseSource', function(done) {
    var expected = 42;
    var e1 = Observable.if(function() {
      return false;
    }, Observable.of('a'), new Promise(function(resolve, reject) {
      reject(expected);
    }));
    e1.subscribe(function(x) {
      done(new Error('should not be called'));
    }, function(x) {
      chai_1.expect(x).to.equal(expected);
      done();
    }, function() {
      done(new Error('should not be called'));
    });
  });
  it('should accept rejected promise as thenSource', function(done) {
    var expected = 42;
    var e1 = Observable.if(function() {
      return true;
    }, new Promise(function(resolve, reject) {
      reject(expected);
    }));
    e1.subscribe(function(x) {
      done(new Error('should not be called'));
    }, function(x) {
      chai_1.expect(x).to.equal(expected);
      done();
    }, function() {
      done(new Error('should not be called'));
    });
  });
});