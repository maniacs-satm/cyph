/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var test_helper_1 = require('../helpers/test-helper');
var Observable = Rx.Observable;
describe('Observable.forkJoin', function() {
  it('should join the last values of the provided observables into an array', function() {
    var e1 = Observable.forkJoin(hot('--a--b--c--d--|'), hot('(b|)'), hot('--1--2--3--|'));
    var expected = '--------------(x|)';
    expectObservable(e1).toBe(expected, {x: ['d', 'b', '3']});
  });
  it('should allow emit null or undefined', function() {
    var e2 = Observable.forkJoin(hot('--a--b--c--d--|', {d: null}), hot('(b|)'), hot('--1--2--3--|'), hot('-----r--t--u--|', {u: undefined}));
    var expected2 = '--------------(x|)';
    expectObservable(e2).toBe(expected2, {x: [null, 'b', '3', undefined]});
  });
  it('should join the last values of the provided observables with selector', function() {
    function selector(x, y, z) {
      return x + y + z;
    }
    var e1 = Observable.forkJoin(hot('--a--b--c--d--|'), hot('(b|)'), hot('--1--2--3--|'), selector);
    var expected = '--------------(x|)';
    expectObservable(e1).toBe(expected, {x: 'db3'});
  });
  it('should accept single observable', function() {
    var e1 = Observable.forkJoin(hot('--a--b--c--d--|'));
    var expected = '--------------(x|)';
    expectObservable(e1).toBe(expected, {x: ['d']});
  });
  it('should accept array of observable contains single', function() {
    var e1 = Observable.forkJoin([hot('--a--b--c--d--|')]);
    var expected = '--------------(x|)';
    expectObservable(e1).toBe(expected, {x: ['d']});
  });
  it('should accept single observable with selector', function() {
    function selector(x) {
      return x + x;
    }
    var e1 = Observable.forkJoin(hot('--a--b--c--d--|'), selector);
    var expected = '--------------(x|)';
    expectObservable(e1).toBe(expected, {x: 'dd'});
  });
  it('should accept array of observable contains single with selector', function() {
    function selector(x) {
      return x + x;
    }
    var e1 = Observable.forkJoin([hot('--a--b--c--d--|')], selector);
    var expected = '--------------(x|)';
    expectObservable(e1).toBe(expected, {x: 'dd'});
  });
  it('should accept lowercase-o observables', function() {
    var e1 = Observable.forkJoin(hot('--a--b--c--d--|'), hot('(b|)'), test_helper_1.lowerCaseO('1', '2', '3'));
    var expected = '--------------(x|)';
    expectObservable(e1).toBe(expected, {x: ['d', 'b', '3']});
  });
  it('should accept empty lowercase-o observables', function() {
    var e1 = Observable.forkJoin(hot('--a--b--c--d--|'), hot('(b|)'), test_helper_1.lowerCaseO());
    var expected = '|';
    expectObservable(e1).toBe(expected);
  });
  it('should accept promise', function(done) {
    var e1 = Observable.forkJoin(Observable.of(1), Promise.resolve(2));
    e1.subscribe(function(x) {
      chai_1.expect(x).to.deep.equal([1, 2]);
    }, function(err) {
      done(new Error('should not be called'));
    }, function() {
      done();
    });
  });
  it('should accept array of observables', function() {
    var e1 = Observable.forkJoin([hot('--a--b--c--d--|'), hot('(b|)'), hot('--1--2--3--|')]);
    var expected = '--------------(x|)';
    expectObservable(e1).toBe(expected, {x: ['d', 'b', '3']});
  });
  it('should accept array of observables with selector', function() {
    function selector(x, y, z) {
      return x + y + z;
    }
    var e1 = Observable.forkJoin([hot('--a--b--c--d--|'), hot('(b|)'), hot('--1--2--3--|')], selector);
    var expected = '--------------(x|)';
    expectObservable(e1).toBe(expected, {x: 'db3'});
  });
  it('should not emit if any of source observable is empty', function() {
    var e1 = Observable.forkJoin(hot('--a--b--c--d--|'), hot('(b|)'), hot('------------------|'));
    var expected = '------------------|';
    expectObservable(e1).toBe(expected);
  });
  it('should complete early if any of source is empty and completes before than others', function() {
    var e1 = Observable.forkJoin(hot('--a--b--c--d--|'), hot('(b|)'), hot('---------|'));
    var expected = '---------|';
    expectObservable(e1).toBe(expected);
  });
  it('should complete when all sources are empty', function() {
    var e1 = Observable.forkJoin(hot('--------------|'), hot('---------|'));
    var expected = '---------|';
    expectObservable(e1).toBe(expected);
  });
  it('should complete if source is not provided', function() {
    var e1 = Observable.forkJoin();
    var expected = '|';
    expectObservable(e1).toBe(expected);
  });
  it('should complete if sources list is empty', function() {
    var e1 = Observable.forkJoin([]);
    var expected = '|';
    expectObservable(e1).toBe(expected);
  });
  it('should complete when any of source is empty with selector', function() {
    function selector(x, y) {
      return x + y;
    }
    var e1 = Observable.forkJoin(hot('--a--b--c--d--|'), hot('---------|'), selector);
    var expected = '---------|';
    expectObservable(e1).toBe(expected);
  });
  it('should emit results by resultselector', function() {
    function selector(x, y) {
      return x + y;
    }
    var e1 = Observable.forkJoin(hot('--a--b--c--d--|'), hot('---2-----|'), selector);
    var expected = '--------------(x|)';
    expectObservable(e1).toBe(expected, {x: 'd2'});
  });
  it('should raise error when any of source raises error with empty observable', function() {
    var e1 = Observable.forkJoin(hot('------#'), hot('---------|'));
    var expected = '------#';
    expectObservable(e1).toBe(expected);
  });
  it('should raise error when any of source raises error with selector with empty observable', function() {
    function selector(x, y) {
      return x + y;
    }
    var e1 = Observable.forkJoin(hot('------#'), hot('---------|'), selector);
    var expected = '------#';
    expectObservable(e1).toBe(expected);
  });
  it('should raise error when source raises error', function() {
    var e1 = Observable.forkJoin(hot('------#'), hot('---a-----|'));
    var expected = '------#';
    expectObservable(e1).toBe(expected);
  });
  it('should raise error when source raises error with selector', function() {
    function selector(x, y) {
      return x + y;
    }
    var e1 = Observable.forkJoin(hot('------#'), hot('-------b-|'), selector);
    var expected = '------#';
    expectObservable(e1).toBe(expected);
  });
  it('should allow unsubscribing early and explicitly', function() {
    var e1 = hot('--a--^--b--c---d-| ');
    var e1subs = '^        !    ';
    var e2 = hot('---e-^---f--g---h-|');
    var e2subs = '^        !    ';
    var expected = '----------    ';
    var unsub = '         !    ';
    var result = Observable.forkJoin(e1, e2);
    expectObservable(result, unsub).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should support promises', function() {
    type(function() {
      var a;
      var b;
      var c;
      var o1 = Observable.forkJoin(a, b, c);
      var o2 = Observable.forkJoin(a, b, c, function(aa, bb, cc) {
        return !!aa && !!bb && cc;
      });
    });
  });
  it('should support observables', function() {
    type(function() {
      var a;
      var b;
      var c;
      var o1 = Observable.forkJoin(a, b, c);
      var o2 = Observable.forkJoin(a, b, c, function(aa, bb, cc) {
        return !!aa && !!bb && cc;
      });
    });
  });
  it('should support mixed observables and promises', function() {
    type(function() {
      var a;
      var b;
      var c;
      var d;
      var o1 = Observable.forkJoin(a, b, c, d);
      var o2 = Observable.forkJoin(a, b, c, d, function(aa, bb, cc, dd) {
        return !!aa && !!bb && cc && !!dd.length;
      });
    });
  });
  it('should support arrays of promises', function() {
    type(function() {
      var a;
      var o1 = Observable.forkJoin(a);
      var o2 = Observable.forkJoin.apply(Observable, a);
      var o3 = Observable.forkJoin(a, function() {
        var x = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          x[_i - 0] = arguments[_i];
        }
        return x.length;
      });
    });
  });
  it('should support arrays of observables', function() {
    type(function() {
      var a;
      var o1 = Observable.forkJoin(a);
      var o2 = Observable.forkJoin.apply(Observable, a);
      var o3 = Observable.forkJoin(a, function() {
        var x = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          x[_i - 0] = arguments[_i];
        }
        return x.length;
      });
    });
  });
  it('should return Array<T> when given a single promise', function() {
    type(function() {
      var a;
      var o1 = Observable.forkJoin(a);
    });
  });
  it('should return Array<T> when given a single observable', function() {
    type(function() {
      var a;
      var o1 = Observable.forkJoin(a);
    });
  });
});
