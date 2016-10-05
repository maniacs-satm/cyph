/* */ 
(function(process) {
  "use strict";
  var chai_1 = require('chai');
  var sinon = require('sinon');
  var Rx = require('../../dist/cjs/Rx');
  var Observable = Rx.Observable;
  describe('Observable.fromPromise', function() {
    it('should emit one value from a resolved promise', function(done) {
      var promise = Promise.resolve(42);
      Observable.fromPromise(promise).subscribe(function(x) {
        chai_1.expect(x).to.equal(42);
      }, function(x) {
        done(new Error('should not be called'));
      }, function() {
        done();
      });
    });
    it('should raise error from a rejected promise', function(done) {
      var promise = Promise.reject('bad');
      Observable.fromPromise(promise).subscribe(function(x) {
        done(new Error('should not be called'));
      }, function(e) {
        chai_1.expect(e).to.equal('bad');
        done();
      }, function() {
        done(new Error('should not be called'));
      });
    });
    it('should share the underlying promise with multiple subscribers', function(done) {
      var promise = Promise.resolve(42);
      var observable = Observable.fromPromise(promise);
      observable.subscribe(function(x) {
        chai_1.expect(x).to.equal(42);
      }, function(x) {
        done(new Error('should not be called'));
      }, null);
      setTimeout(function() {
        observable.subscribe(function(x) {
          chai_1.expect(x).to.equal(42);
        }, function(x) {
          done(new Error('should not be called'));
        }, function() {
          done();
        });
      });
    });
    it('should accept already-resolved Promise', function(done) {
      var promise = Promise.resolve(42);
      promise.then(function(x) {
        chai_1.expect(x).to.equal(42);
        Observable.fromPromise(promise).subscribe(function(y) {
          chai_1.expect(y).to.equal(42);
        }, function(x) {
          done(new Error('should not be called'));
        }, function() {
          done();
        });
      }, function() {
        done(new Error('should not be called'));
      });
    });
    it('should emit a value from a resolved promise on a separate scheduler', function(done) {
      var promise = Promise.resolve(42);
      Observable.fromPromise(promise, Rx.Scheduler.asap).subscribe(function(x) {
        chai_1.expect(x).to.equal(42);
      }, function(x) {
        done(new Error('should not be called'));
      }, function() {
        done();
      });
    });
    it('should raise error from a rejected promise on a separate scheduler', function(done) {
      var promise = Promise.reject('bad');
      Observable.fromPromise(promise, Rx.Scheduler.asap).subscribe(function(x) {
        done(new Error('should not be called'));
      }, function(e) {
        chai_1.expect(e).to.equal('bad');
        done();
      }, function() {
        done(new Error('should not be called'));
      });
    });
    it('should share the underlying promise with multiple subscribers on a separate scheduler', function(done) {
      var promise = Promise.resolve(42);
      var observable = Observable.fromPromise(promise, Rx.Scheduler.asap);
      observable.subscribe(function(x) {
        chai_1.expect(x).to.equal(42);
      }, function(x) {
        done(new Error('should not be called'));
      }, null);
      setTimeout(function() {
        observable.subscribe(function(x) {
          chai_1.expect(x).to.equal(42);
        }, function(x) {
          done(new Error('should not be called'));
        }, function() {
          done();
        });
      });
    });
    it('should not emit, throw or complete if immediately unsubscribed', function(done) {
      var nextSpy = sinon.spy();
      var throwSpy = sinon.spy();
      var completeSpy = sinon.spy();
      var promise = Promise.resolve(42);
      var subscription = Observable.fromPromise(promise).subscribe(nextSpy, throwSpy, completeSpy);
      subscription.unsubscribe();
      setTimeout(function() {
        chai_1.expect(nextSpy).not.have.been.called;
        chai_1.expect(throwSpy).not.have.been.called;
        chai_1.expect(completeSpy).not.have.been.called;
        done();
      });
    });
    if (typeof process === 'object' && Object.prototype.toString.call(process) === '[object process]') {
      it('should globally throw unhandled errors on process', function(done) {
        var originalException = process.listeners('uncaughtException');
        process.removeAllListeners('uncaughtException');
        process.once('uncaughtException', function(error) {
          chai_1.expect(error).to.be.an('error', 'fail');
          originalException.forEach(function(l) {
            return process.addListener('uncaughtException', l);
          });
          done();
        });
        Observable.fromPromise(Promise.reject('bad')).subscribe(function(x) {
          done(new Error('should not be called'));
        }, function(e) {
          chai_1.expect(e).to.equal('bad');
          throw new Error('fail');
        }, function() {
          done(new Error('should not be called'));
        });
      });
    } else if (typeof window === 'object' && (Object.prototype.toString.call(window) === '[object global]' || Object.prototype.toString.call(window) === '[object Window]')) {
      it('should globally throw unhandled errors on window', function(done) {
        var expected = ['Uncaught fail', 'fail', 'Script error.', 'uncaught exception: fail'];
        var current = window.onerror;
        window.onerror = null;
        var invoked = false;
        function onException(e) {
          if (invoked) {
            return;
          }
          invoked = true;
          chai_1.expect(expected).to.contain(e);
          window.onerror = current;
          done();
        }
        window.onerror = onException;
        Observable.fromPromise(Promise.reject('bad')).subscribe(function(x) {
          done(new Error('should not be called'));
        }, function(e) {
          chai_1.expect(e).to.equal('bad');
          throw 'fail';
        }, function() {
          done(new Error('should not be called'));
        });
      });
    }
  });
})(require('process'));