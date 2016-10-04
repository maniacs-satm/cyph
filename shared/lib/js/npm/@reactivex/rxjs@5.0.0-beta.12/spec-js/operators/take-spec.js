/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
describe('Observable.prototype.take', function() {
  asDiagram('take(2)')('should take two values of an observable with many values', function() {
    var e1 = cold('--a-----b----c---d--|');
    var e1subs = '^       !            ';
    var expected = '--a-----(b|)         ';
    expectObservable(e1.take(2)).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should work with empty', function() {
    var e1 = cold('|');
    var e1subs = '(^!)';
    var expected = '|';
    expectObservable(e1.take(42)).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should go on forever on never', function() {
    var e1 = cold('-');
    var e1subs = '^';
    var expected = '-';
    expectObservable(e1.take(42)).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should be empty on take(0)', function() {
    var e1 = hot('--a--^--b----c---d--|');
    var e1subs = [];
    var expected = '|';
    expectObservable(e1.take(0)).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should take one value of an observable with one value', function() {
    var e1 = hot('---(a|)');
    var e1subs = '^  !   ';
    var expected = '---(a|)';
    expectObservable(e1.take(1)).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should take one values of an observable with many values', function() {
    var e1 = hot('--a--^--b----c---d--|');
    var e1subs = '^  !            ';
    var expected = '---(b|)         ';
    expectObservable(e1.take(1)).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should error on empty', function() {
    var e1 = hot('--a--^----|');
    var e1subs = '^    !';
    var expected = '-----|';
    expectObservable(e1.take(42)).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should propagate error from the source observable', function() {
    var e1 = hot('---^---#', null, 'too bad');
    var e1subs = '^   !';
    var expected = '----#';
    expectObservable(e1.take(42)).toBe(expected, null, 'too bad');
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should propagate error from an observable with values', function() {
    var e1 = hot('---^--a--b--#');
    var e1subs = '^        !';
    var expected = '---a--b--#';
    expectObservable(e1.take(42)).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should allow unsubscribing explicitly and early', function() {
    var e1 = hot('---^--a--b-----c--d--e--|');
    var unsub = '         !            ';
    var e1subs = '^        !            ';
    var expected = '---a--b---            ';
    expectObservable(e1.take(42), unsub).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should work with throw', function() {
    var e1 = cold('#');
    var e1subs = '(^!)';
    var expected = '#';
    expectObservable(e1.take(42)).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should throw if total is less than zero', function() {
    chai_1.expect(function() {
      Observable.range(0, 10).take(-1);
    }).to.throw(Rx.ArgumentOutOfRangeError);
  });
  it('should not break unsubscription chain when unsubscribed explicitly', function() {
    var e1 = hot('---^--a--b-----c--d--e--|');
    var unsub = '         !            ';
    var e1subs = '^        !            ';
    var expected = '---a--b---            ';
    var result = e1.mergeMap(function(x) {
      return Observable.of(x);
    }).take(42).mergeMap(function(x) {
      return Observable.of(x);
    });
    expectObservable(result, unsub).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should unsubscribe from the source when it reaches the limit', function() {
    var source = Observable.create(function(observer) {
      chai_1.expect(observer.closed).to.be.false;
      observer.next(42);
      chai_1.expect(observer.closed).to.be.true;
    }).take(1);
    source.subscribe();
  });
});
