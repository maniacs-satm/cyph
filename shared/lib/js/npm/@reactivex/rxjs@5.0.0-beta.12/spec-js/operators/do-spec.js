/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
var Subject = Rx.Subject;
describe('Observable.prototype.do', function() {
  asDiagram('do(x => console.log(x))')('should mirror multiple values and complete', function() {
    var e1 = cold('--1--2--3--|');
    var e1subs = '^          !';
    var expected = '--1--2--3--|';
    var result = e1.do(function() {});
    expectObservable(result).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should next with a callback', function() {
    var value = null;
    Observable.of(42).do(function(x) {
      value = x;
    }).subscribe();
    chai_1.expect(value).to.equal(42);
  });
  it('should error with a callback', function() {
    var err = null;
    Observable.throw('bad').do(null, function(x) {
      err = x;
    }).subscribe(null, function(ex) {
      chai_1.expect(ex).to.equal('bad');
    });
    chai_1.expect(err).to.equal('bad');
  });
  it('should handle everything with an observer', function(done) {
    var expected = [1, 2, 3];
    var results = [];
    Observable.of(1, 2, 3).do({
      next: function(x) {
        results.push(x);
      },
      error: function(err) {
        done(new Error('should not be called'));
      },
      complete: function() {
        chai_1.expect(results).to.deep.equal(expected);
        done();
      }
    }).subscribe();
  });
  it('should handle everything with a Subject', function(done) {
    var expected = [1, 2, 3];
    var results = [];
    var subject = new Subject();
    subject.subscribe({
      next: function(x) {
        results.push(x);
      },
      error: function(err) {
        done(new Error('should not be called'));
      },
      complete: function() {
        chai_1.expect(results).to.deep.equal(expected);
        done();
      }
    });
    Observable.of(1, 2, 3).do(subject).subscribe();
  });
  it('should handle an error with a callback', function() {
    var errored = false;
    Observable.throw('bad').do(null, function(err) {
      chai_1.expect(err).to.equal('bad');
    }).subscribe(null, function(err) {
      errored = true;
      chai_1.expect(err).to.equal('bad');
    });
    chai_1.expect(errored).to.be.true;
  });
  it('should handle an error with observer', function() {
    var errored = false;
    Observable.throw('bad').do({error: function(err) {
        chai_1.expect(err).to.equal('bad');
      }}).subscribe(null, function(err) {
      errored = true;
      chai_1.expect(err).to.equal('bad');
    });
    chai_1.expect(errored).to.be.true;
  });
  it('should handle complete with observer', function() {
    var completed = false;
    Observable.empty().do({complete: function() {
        completed = true;
      }}).subscribe();
    chai_1.expect(completed).to.be.true;
  });
  it('should handle next with observer', function() {
    var value = null;
    Observable.of('hi').do({next: function(x) {
        value = x;
      }}).subscribe();
    chai_1.expect(value).to.equal('hi');
  });
  it('should raise error if next handler raises error', function() {
    Observable.of('hi').do({next: function(x) {
        throw new Error('bad');
      }}).subscribe(null, function(err) {
      chai_1.expect(err.message).to.equal('bad');
    });
  });
  it('should raise error if error handler raises error', function() {
    Observable.throw('ops').do({error: function(x) {
        throw new Error('bad');
      }}).subscribe(null, function(err) {
      chai_1.expect(err.message).to.equal('bad');
    });
  });
  it('should raise error if complete handler raises error', function() {
    Observable.empty().do({complete: function() {
        throw new Error('bad');
      }}).subscribe(null, function(err) {
      chai_1.expect(err.message).to.equal('bad');
    });
  });
  it('should allow unsubscribing explicitly and early', function() {
    var e1 = hot('--1--2--3--#');
    var unsub = '       !    ';
    var e1subs = '^      !    ';
    var expected = '--1--2--    ';
    var result = e1.do(function() {});
    expectObservable(result, unsub).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should not break unsubscription chains when result is unsubscribed explicitly', function() {
    var e1 = hot('--1--2--3--#');
    var e1subs = '^      !    ';
    var expected = '--1--2--    ';
    var unsub = '       !    ';
    var result = e1.mergeMap(function(x) {
      return Observable.of(x);
    }).do(function() {}).mergeMap(function(x) {
      return Observable.of(x);
    });
    expectObservable(result, unsub).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mirror multiple values and complete', function() {
    var e1 = cold('--1--2--3--|');
    var e1subs = '^          !';
    var expected = '--1--2--3--|';
    var result = e1.do(function() {});
    expectObservable(result).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mirror multiple values and terminate with error', function() {
    var e1 = cold('--1--2--3--#');
    var e1subs = '^          !';
    var expected = '--1--2--3--#';
    var result = e1.do(function() {});
    expectObservable(result).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
});