/* */ 
"use strict";
var chai_1 = require('chai');
var sinon = require('sinon');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
describe('Observable.bindNodeCallback', function() {
  describe('when not scheduled', function() {
    it('should emit one value from a callback', function() {
      function callback(datum, cb) {
        cb(null, datum);
      }
      var boundCallback = Observable.bindNodeCallback(callback);
      var results = [];
      boundCallback(42).subscribe(function(x) {
        results.push(x);
      }, null, function() {
        results.push('done');
      });
      chai_1.expect(results).to.deep.equal([42, 'done']);
    });
    it('should emit one value chosen by a selector', function() {
      function callback(datum, cb) {
        cb(null, datum);
      }
      var boundCallback = Observable.bindNodeCallback(callback, function(datum) {
        return datum;
      });
      var results = [];
      boundCallback(42).subscribe(function(x) {
        results.push(x);
      }, null, function() {
        results.push('done');
      });
      chai_1.expect(results).to.deep.equal([42, 'done']);
    });
    it('should raise error from callback', function() {
      var error = new Error();
      function callback(cb) {
        cb(error);
      }
      var boundCallback = Observable.bindNodeCallback(callback);
      var results = [];
      boundCallback().subscribe(function() {
        throw 'should not next';
      }, function(err) {
        results.push(err);
      }, function() {
        throw 'should not complete';
      });
      chai_1.expect(results).to.deep.equal([error]);
    });
    it('should emit an error when the selector throws', function() {
      function callback(cb) {
        cb(null, 42);
      }
      var expected = new Error('Yikes!');
      var boundCallback = Observable.bindNodeCallback(callback, function(err) {
        throw expected;
      });
      boundCallback().subscribe(function() {
        throw 'should not next';
      }, function(err) {
        chai_1.expect(err).to.equal(expected);
      }, function() {
        throw 'should not complete';
      });
    });
    it('should not emit, throw or complete if immediately unsubscribed', function(done) {
      var nextSpy = sinon.spy();
      var throwSpy = sinon.spy();
      var completeSpy = sinon.spy();
      var timeout;
      function callback(datum, cb) {
        timeout = setTimeout(function() {
          cb(null, datum);
        });
      }
      var subscription = Observable.bindNodeCallback(callback)(42).subscribe(nextSpy, throwSpy, completeSpy);
      subscription.unsubscribe();
      setTimeout(function() {
        chai_1.expect(nextSpy).not.have.been.called;
        chai_1.expect(throwSpy).not.have.been.called;
        chai_1.expect(completeSpy).not.have.been.called;
        clearTimeout(timeout);
        done();
      });
    });
  });
  describe('when scheduled', function() {
    it('should emit one value from a callback', function() {
      function callback(datum, cb) {
        cb(null, datum);
      }
      var boundCallback = Observable.bindNodeCallback(callback, null, rxTestScheduler);
      var results = [];
      boundCallback(42).subscribe(function(x) {
        results.push(x);
      }, null, function() {
        results.push('done');
      });
      rxTestScheduler.flush();
      chai_1.expect(results).to.deep.equal([42, 'done']);
    });
    it('should error if callback throws', function() {
      var expected = new Error('haha no callback for you');
      function callback(datum, cb) {
        throw expected;
      }
      var boundCallback = Observable.bindNodeCallback(callback, null, rxTestScheduler);
      boundCallback(42).subscribe(function(x) {
        throw 'should not next';
      }, function(err) {
        chai_1.expect(err).to.equal(expected);
      }, function() {
        throw 'should not complete';
      });
      rxTestScheduler.flush();
    });
    it('should raise error from callback', function() {
      var error = new Error();
      function callback(cb) {
        cb(error);
      }
      var boundCallback = Observable.bindNodeCallback(callback, null, rxTestScheduler);
      var results = [];
      boundCallback().subscribe(function() {
        throw 'should not next';
      }, function(err) {
        results.push(err);
      }, function() {
        throw 'should not complete';
      });
      rxTestScheduler.flush();
      chai_1.expect(results).to.deep.equal([error]);
    });
    it('should error if selector throws', function() {
      var expected = new Error('what? a selector? I don\'t think so');
      function callback(datum, cb) {
        cb(null, datum);
      }
      function selector() {
        throw expected;
      }
      var boundCallback = Observable.bindNodeCallback(callback, selector, rxTestScheduler);
      boundCallback(42).subscribe(function(x) {
        throw 'should not next';
      }, function(err) {
        chai_1.expect(err).to.equal(expected);
      }, function() {
        throw 'should not complete';
      });
      rxTestScheduler.flush();
    });
    it('should use a selector', function() {
      function callback(datum, cb) {
        cb(null, datum);
      }
      function selector(x) {
        return x + '!!!';
      }
      var boundCallback = Observable.bindNodeCallback(callback, selector, rxTestScheduler);
      var results = [];
      boundCallback(42).subscribe(function(x) {
        results.push(x);
      }, null, function() {
        results.push('done');
      });
      rxTestScheduler.flush();
      chai_1.expect(results).to.deep.equal(['42!!!', 'done']);
    });
  });
  it('should pass multiple inner arguments as an array', function() {
    function callback(datum, cb) {
      cb(null, datum, 1, 2, 3);
    }
    var boundCallback = Observable.bindNodeCallback(callback, null, rxTestScheduler);
    var results = [];
    boundCallback(42).subscribe(function(x) {
      results.push(x);
    }, null, function() {
      results.push('done');
    });
    rxTestScheduler.flush();
    chai_1.expect(results).to.deep.equal([[42, 1, 2, 3], 'done']);
  });
  it('should pass multiple inner arguments to the selector if there is one', function() {
    function callback(datum, cb) {
      cb(null, datum, 1, 2, 3);
    }
    function selector(a, b, c, d) {
      chai_1.expect([a, b, c, d]).to.deep.equal([42, 1, 2, 3]);
      return a + b + c + d;
    }
    var boundCallback = Observable.bindNodeCallback(callback, selector, rxTestScheduler);
    var results = [];
    boundCallback(42).subscribe(function(x) {
      results.push(x);
    }, null, function() {
      results.push('done');
    });
    rxTestScheduler.flush();
    chai_1.expect(results).to.deep.equal([48, 'done']);
  });
  it('should cache value for next subscription and not call callbackFunc again', function() {
    var calls = 0;
    function callback(datum, cb) {
      calls++;
      cb(null, datum);
    }
    var boundCallback = Observable.bindNodeCallback(callback, null, rxTestScheduler);
    var results1 = [];
    var results2 = [];
    var source = boundCallback(42);
    source.subscribe(function(x) {
      results1.push(x);
    }, null, function() {
      results1.push('done');
    });
    source.subscribe(function(x) {
      results2.push(x);
    }, null, function() {
      results2.push('done');
    });
    rxTestScheduler.flush();
    chai_1.expect(calls).to.equal(1);
    chai_1.expect(results1).to.deep.equal([42, 'done']);
    chai_1.expect(results2).to.deep.equal([42, 'done']);
  });
});
