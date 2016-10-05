/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
describe('Observable.prototype.max', function() {
  asDiagram('max')('should find the max of values of an observable', function() {
    var e1 = hot('--a--b--c--|', {
      a: 42,
      b: -1,
      c: 3
    });
    var subs = '^          !';
    var expected = '-----------(x|)';
    expectObservable(e1.max()).toBe(expected, {x: 42});
    expectSubscriptions(e1.subscriptions).toBe(subs);
  });
  it('should be never when source is never', function() {
    var e1 = cold('-');
    var e1subs = '^';
    var expected = '-';
    expectObservable(e1.max()).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should be zero when source is empty', function() {
    var e1 = cold('|');
    var e1subs = '(^!)';
    var expected = '|';
    expectObservable(e1.max()).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should be never when source doesn\'t complete', function() {
    var e1 = hot('--x--^--y--');
    var e1subs = '^     ';
    var expected = '------';
    expectObservable(e1.max()).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should be completes when source doesn\'t have values', function() {
    var e1 = hot('-x-^---|');
    var e1subs = '^   !';
    var expected = '----|';
    expectObservable(e1.max()).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should max the unique value of an observable', function() {
    var e1 = hot('-x-^--y--|', {y: 42});
    var e1subs = '^     !';
    var expected = '------(w|)';
    expectObservable(e1.max()).toBe(expected, {w: 42});
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should max the values of an ongoing hot observable', function() {
    var e1 = hot('--a-^-b--c--d--|', {
      a: 42,
      b: -1,
      c: 0,
      d: 666
    });
    var subs = '^          !';
    var expected = '-----------(x|)';
    expectObservable(e1.max()).toBe(expected, {x: 666});
    expectSubscriptions(e1.subscriptions).toBe(subs);
  });
  it('should allow unsubscribing explicitly and early', function() {
    var e1 = hot('--a--b--c--|', {
      a: 42,
      b: -1,
      c: 0
    });
    var unsub = '      !     ';
    var subs = '^     !     ';
    var expected = '-------     ';
    expectObservable(e1.max(), unsub).toBe(expected, {x: 42});
    expectSubscriptions(e1.subscriptions).toBe(subs);
  });
  it('should not break unsubscription chains when result is unsubscribed explicitly', function() {
    var source = hot('--a--b--c--|', {
      a: 42,
      b: -1,
      c: 0
    });
    var subs = '^     !     ';
    var expected = '-------     ';
    var unsub = '      !     ';
    var result = source.mergeMap(function(x) {
      return Observable.of(x);
    }).max().mergeMap(function(x) {
      return Observable.of(x);
    });
    expectObservable(result, unsub).toBe(expected, {x: 42});
    expectSubscriptions(source.subscriptions).toBe(subs);
  });
  it('should max a range() source observable', function(done) {
    Rx.Observable.range(1, 10000).max().subscribe(function(value) {
      chai_1.expect(value).to.equal(10000);
    }, function(x) {
      done(new Error('should not be called'));
    }, function() {
      done();
    });
  });
  it('should max a range().skip(1) source observable', function(done) {
    Rx.Observable.range(1, 10).skip(1).max().subscribe(function(value) {
      chai_1.expect(value).to.equal(10);
    }, function(x) {
      done(new Error('should not be called'));
    }, function() {
      done();
    });
  });
  it('should max a range().take(1) source observable', function(done) {
    Rx.Observable.range(1, 10).take(1).max().subscribe(function(value) {
      chai_1.expect(value).to.equal(1);
    }, function(x) {
      done(new Error('should not be called'));
    }, function() {
      done();
    });
  });
  it('should work with error', function() {
    var e1 = hot('-x-^--y--z--#', {
      x: 1,
      y: 2,
      z: 3
    }, 'too bad');
    var e1subs = '^        !';
    var expected = '---------#';
    expectObservable(e1.max()).toBe(expected, null, 'too bad');
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should work with throw', function() {
    var e1 = cold('#');
    var e1subs = '(^!)';
    var expected = '#';
    expectObservable(e1.max()).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should handle a constant predicate on an empty hot observable', function() {
    var e1 = hot('-x-^---|');
    var e1subs = '^   !';
    var expected = '----|';
    var predicate = function(x, y) {
      return 42;
    };
    expectObservable(e1.max(predicate)).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should handle a constant predicate on an never hot observable', function() {
    var e1 = hot('-x-^----');
    var e1subs = '^    ';
    var expected = '-----';
    var predicate = function(x, y) {
      return 42;
    };
    expectObservable(e1.max(predicate)).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should handle a constant predicate on a simple hot observable', function() {
    var e1 = hot('-x-^-a-|', {a: 1});
    var e1subs = '^   !';
    var expected = '----(w|)';
    var predicate = function() {
      return 42;
    };
    expectObservable(e1.max(predicate)).toBe(expected, {w: 1});
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should handle a reverse predicate on observable with many values', function() {
    var e1 = hot('-a-^-b--c--d-|', {
      a: 42,
      b: -1,
      c: 0,
      d: 666
    });
    var e1subs = '^         !';
    var expected = '----------(w|)';
    var predicate = function(x, y) {
      return x > y ? -1 : 1;
    };
    expectObservable(e1.max(predicate)).toBe(expected, {w: -1});
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should handle a predicate for string on observable with many values', function() {
    var e1 = hot('-a-^-b--c--d-|');
    var e1subs = '^         !';
    var expected = '----------(w|)';
    var predicate = function(x, y) {
      return x > y ? -1 : 1;
    };
    expectObservable(e1.max(predicate)).toBe(expected, {w: 'b'});
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should handle a constant predicate on observable that throws', function() {
    var e1 = hot('-1-^---#');
    var e1subs = '^   !';
    var expected = '----#';
    var predicate = function() {
      return 42;
    };
    expectObservable(e1.max(predicate)).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should handle a predicate that throws, on observable with many values', function() {
    var e1 = hot('-1-^-2--3--|');
    var e1subs = '^    !   ';
    var expected = '-----#   ';
    var predicate = function(x, y) {
      if (y === '3') {
        throw 'error';
      }
      return x > y ? x : y;
    };
    expectObservable(e1.max(predicate)).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
});