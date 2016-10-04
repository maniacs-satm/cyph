/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
describe('Observable.prototype.finally', function() {
  it('should call finally after complete', function(done) {
    var completed = false;
    Observable.of(1, 2, 3).finally(function() {
      chai_1.expect(completed).to.be.true;
      done();
    }).subscribe(null, null, function() {
      completed = true;
    });
  });
  it('should call finally after error', function(done) {
    var thrown = false;
    Observable.of(1, 2, 3).map(function(x) {
      if (x === 3) {
        throw x;
      }
      return x;
    }).finally(function() {
      chai_1.expect(thrown).to.be.true;
      done();
    }).subscribe(null, function() {
      thrown = true;
    });
  });
  it('should call finally upon disposal', function(done) {
    var disposed = false;
    var subscription = Observable.timer(100).finally(function() {
      chai_1.expect(disposed).to.be.true;
      done();
    }).subscribe();
    disposed = true;
    subscription.unsubscribe();
  });
  it('should call finally when synchronously subscribing to and unsubscribing ' + 'from a shared Observable', function(done) {
    Observable.interval(50).finally(done).share().subscribe().unsubscribe();
  });
  it('should call two finally instances in succession on a shared Observable', function(done) {
    var invoked = 0;
    function checkFinally() {
      invoked += 1;
      if (invoked === 2) {
        done();
      }
    }
    Observable.of(1, 2, 3).finally(checkFinally).finally(checkFinally).share().subscribe();
  });
  it('should handle empty', function() {
    var executed = false;
    var s1 = hot('|');
    var result = s1.finally(function() {
      return executed = true;
    });
    var expected = '|';
    expectObservable(result).toBe(expected);
    rxTestScheduler.flush();
    chai_1.expect(executed).to.be.true;
  });
  it('should handle never', function() {
    var executed = false;
    var s1 = hot('-');
    var result = s1.finally(function() {
      return executed = true;
    });
    var expected = '-';
    expectObservable(result).toBe(expected);
    rxTestScheduler.flush();
    chai_1.expect(executed).to.be.false;
  });
  it('should handle throw', function() {
    var executed = false;
    var s1 = hot('#');
    var result = s1.finally(function() {
      return executed = true;
    });
    var expected = '#';
    expectObservable(result).toBe(expected);
    rxTestScheduler.flush();
    chai_1.expect(executed).to.be.true;
  });
  it('should handle basic hot observable', function() {
    var executed = false;
    var s1 = hot('--a--b--c--|');
    var subs = '^          !';
    var expected = '--a--b--c--|';
    var result = s1.finally(function() {
      return executed = true;
    });
    expectObservable(result).toBe(expected);
    expectSubscriptions(s1.subscriptions).toBe(subs);
    rxTestScheduler.flush();
    chai_1.expect(executed).to.be.true;
  });
  it('should handle basic cold observable', function() {
    var executed = false;
    var s1 = cold('--a--b--c--|');
    var subs = '^          !';
    var expected = '--a--b--c--|';
    var result = s1.finally(function() {
      return executed = true;
    });
    expectObservable(result).toBe(expected);
    expectSubscriptions(s1.subscriptions).toBe(subs);
    rxTestScheduler.flush();
    chai_1.expect(executed).to.be.true;
  });
  it('should handle basic error', function() {
    var executed = false;
    var s1 = hot('--a--b--c--#');
    var subs = '^          !';
    var expected = '--a--b--c--#';
    var result = s1.finally(function() {
      return executed = true;
    });
    expectObservable(result).toBe(expected);
    expectSubscriptions(s1.subscriptions).toBe(subs);
    rxTestScheduler.flush();
    chai_1.expect(executed).to.be.true;
  });
  it('should handle unsubscription', function() {
    var executed = false;
    var s1 = hot('--a--b--c--|');
    var subs = '^     !     ';
    var expected = '--a--b-';
    var unsub = '      !';
    var result = s1.finally(function() {
      return executed = true;
    });
    expectObservable(result, unsub).toBe(expected);
    expectSubscriptions(s1.subscriptions).toBe(subs);
    rxTestScheduler.flush();
    chai_1.expect(executed).to.be.true;
  });
});
