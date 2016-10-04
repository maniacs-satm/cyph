/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
var queueScheduler = Rx.Scheduler.queue;
describe('Observable.combineLatest', function() {
  it('should combineLatest the provided observables', function() {
    var firstSource = hot('----a----b----c----|');
    var secondSource = hot('--d--e--f--g--|');
    var expected = '----uv--wx-y--z----|';
    var combined = Observable.combineLatest(firstSource, secondSource, function(a, b) {
      return '' + a + b;
    });
    expectObservable(combined).toBe(expected, {
      u: 'ad',
      v: 'ae',
      w: 'af',
      x: 'bf',
      y: 'bg',
      z: 'cg'
    });
  });
  it('should combine an immediately-scheduled source with an immediately-scheduled second', function(done) {
    var a = Observable.of(1, 2, 3, queueScheduler);
    var b = Observable.of(4, 5, 6, 7, 8, queueScheduler);
    var r = [[1, 4], [2, 4], [2, 5], [3, 5], [3, 6], [3, 7], [3, 8]];
    Observable.combineLatest(a, b, queueScheduler).subscribe(function(vals) {
      chai_1.expect(vals).to.deep.equal(r.shift());
    }, function(x) {
      done(new Error('should not be called'));
    }, function() {
      chai_1.expect(r.length).to.equal(0);
      done();
    });
  });
  it('should accept array of observables', function() {
    var firstSource = hot('----a----b----c----|');
    var secondSource = hot('--d--e--f--g--|');
    var expected = '----uv--wx-y--z----|';
    var combined = Observable.combineLatest([firstSource, secondSource], function(a, b) {
      return '' + a + b;
    });
    expectObservable(combined).toBe(expected, {
      u: 'ad',
      v: 'ae',
      w: 'af',
      x: 'bf',
      y: 'bg',
      z: 'cg'
    });
  });
  it('should work with two nevers', function() {
    var e1 = cold('-');
    var e1subs = '^';
    var e2 = cold('-');
    var e2subs = '^';
    var expected = '-';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with never and empty', function() {
    var e1 = cold('-');
    var e1subs = '^';
    var e2 = cold('|');
    var e2subs = '(^!)';
    var expected = '-';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with empty and never', function() {
    var e1 = cold('|');
    var e1subs = '(^!)';
    var e2 = cold('-');
    var e2subs = '^';
    var expected = '-';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with empty and empty', function() {
    var e1 = cold('|');
    var e1subs = '(^!)';
    var e2 = cold('|');
    var e2subs = '(^!)';
    var expected = '|';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with hot-empty and hot-single', function() {
    var values = {
      a: 1,
      b: 2,
      c: 3,
      r: 1 + 3
    };
    var e1 = hot('-a-^-|', values);
    var e1subs = '^ !';
    var e2 = hot('-b-^-c-|', values);
    var e2subs = '^   !';
    var expected = '----|';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with hot-single and hot-empty', function() {
    var values = {
      a: 1,
      b: 2,
      c: 3
    };
    var e1 = hot('-a-^-|', values);
    var e1subs = '^ !';
    var e2 = hot('-b-^-c-|', values);
    var e2subs = '^   !';
    var expected = '----|';
    var result = Observable.combineLatest(e2, e1, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with hot-single and never', function() {
    var values = {a: 1};
    var e1 = hot('-a-^-|', values);
    var e1subs = '^ !';
    var e2 = hot('------', values);
    var e2subs = '^  ';
    var expected = '-';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with never and hot-single', function() {
    var values = {
      a: 1,
      b: 2
    };
    var e1 = hot('--------', values);
    var e1subs = '^    ';
    var e2 = hot('-a-^-b-|', values);
    var e2subs = '^   !';
    var expected = '-----';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with hot and hot', function() {
    var e1 = hot('--a--^--b--c--|', {
      a: 'a',
      b: 'b',
      c: 'c'
    });
    var e1subs = '^        !';
    var e2 = hot('---e-^---f--g--|', {
      e: 'e',
      f: 'f',
      g: 'g'
    });
    var e2subs = '^         !';
    var expected = '----x-yz--|';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, {
      x: 'bf',
      y: 'cf',
      z: 'cg'
    });
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with empty and error', function() {
    var e1 = hot('----------|');
    var e1subs = '^     !';
    var e2 = hot('------#', null, 'shazbot!');
    var e2subs = '^     !';
    var expected = '------#';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, null, 'shazbot!');
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with error and empty', function() {
    var e1 = hot('--^---#', null, 'too bad, honk');
    var e1subs = '^   !';
    var e2 = hot('--^--------|');
    var e2subs = '^   !';
    var expected = '----#';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, null, 'too bad, honk');
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with hot and throw', function() {
    var e1 = hot('-a-^--b--c--|', {
      a: 1,
      b: 2,
      c: 3
    });
    var e1subs = '^ !';
    var e2 = hot('---^-#', null, 'bazinga');
    var e2subs = '^ !';
    var expected = '--#';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, null, 'bazinga');
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with throw and hot', function() {
    var e1 = hot('---^-#', null, 'bazinga');
    var e1subs = '^ !';
    var e2 = hot('-a-^--b--c--|', {
      a: 1,
      b: 2,
      c: 3
    });
    var e2subs = '^ !';
    var expected = '--#';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, null, 'bazinga');
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with throw and throw', function() {
    var e1 = hot('---^----#', null, 'jenga');
    var e1subs = '^ !';
    var e2 = hot('---^-#', null, 'bazinga');
    var e2subs = '^ !';
    var expected = '--#';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, null, 'bazinga');
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with error and throw', function() {
    var e1 = hot('-a-^--b--#', {
      a: 1,
      b: 2
    }, 'wokka wokka');
    var e1subs = '^ !';
    var e2 = hot('---^-#', null, 'flurp');
    var e2subs = '^ !';
    var expected = '--#';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, null, 'flurp');
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with throw and error', function() {
    var e1 = hot('---^-#', null, 'flurp');
    var e1subs = '^ !';
    var e2 = hot('-a-^--b--#', {
      a: 1,
      b: 2
    }, 'wokka wokka');
    var e2subs = '^ !';
    var expected = '--#';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, null, 'flurp');
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with never and throw', function() {
    var e1 = hot('---^-----------');
    var e1subs = '^     !';
    var e2 = hot('---^-----#', null, 'wokka wokka');
    var e2subs = '^     !';
    var expected = '------#';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, null, 'wokka wokka');
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with throw and never', function() {
    var e1 = hot('---^----#', null, 'wokka wokka');
    var e1subs = '^    !';
    var e2 = hot('---^-----------');
    var e2subs = '^    !';
    var expected = '-----#';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, null, 'wokka wokka');
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with some and throw', function() {
    var e1 = hot('---^----a---b--|', {
      a: 1,
      b: 2
    });
    var e1subs = '^  !';
    var e2 = hot('---^--#', null, 'wokka wokka');
    var e2subs = '^  !';
    var expected = '---#';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, {
      a: 1,
      b: 2
    }, 'wokka wokka');
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should work with throw and some', function() {
    var e1 = hot('---^--#', null, 'wokka wokka');
    var e1subs = '^  !';
    var e2 = hot('---^----a---b--|', {
      a: 1,
      b: 2
    });
    var e2subs = '^  !';
    var expected = '---#';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, {
      a: 1,
      b: 2
    }, 'wokka wokka');
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should handle throw after complete left', function() {
    var left = hot('--a--^--b---|', {
      a: 1,
      b: 2
    });
    var leftSubs = '^      !';
    var right = hot('-----^--------#', null, 'bad things');
    var rightSubs = '^        !';
    var expected = '---------#';
    var result = Observable.combineLatest(left, right, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, null, 'bad things');
    expectSubscriptions(left.subscriptions).toBe(leftSubs);
    expectSubscriptions(right.subscriptions).toBe(rightSubs);
  });
  it('should handle throw after complete right', function() {
    var left = hot('-----^--------#', null, 'bad things');
    var leftSubs = '^        !';
    var right = hot('--a--^--b---|', {
      a: 1,
      b: 2
    });
    var rightSubs = '^      !';
    var expected = '---------#';
    var result = Observable.combineLatest(left, right, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, null, 'bad things');
    expectSubscriptions(left.subscriptions).toBe(leftSubs);
    expectSubscriptions(right.subscriptions).toBe(rightSubs);
  });
  it('should handle interleaved with tail', function() {
    var e1 = hot('-a--^--b---c---|', {
      a: 'a',
      b: 'b',
      c: 'c'
    });
    var e1subs = '^          !';
    var e2 = hot('--d-^----e---f--|', {
      d: 'd',
      e: 'e',
      f: 'f'
    });
    var e2subs = '^           !';
    var expected = '-----x-y-z--|';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, {
      x: 'be',
      y: 'ce',
      z: 'cf'
    });
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should handle two consecutive hot observables', function() {
    var e1 = hot('--a--^--b--c--|', {
      a: 'a',
      b: 'b',
      c: 'c'
    });
    var e1subs = '^        !';
    var e2 = hot('-----^----------d--e--f--|', {
      d: 'd',
      e: 'e',
      f: 'f'
    });
    var e2subs = '^                   !';
    var expected = '-----------x--y--z--|';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, {
      x: 'cd',
      y: 'ce',
      z: 'cf'
    });
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should handle two consecutive hot observables with error left', function() {
    var left = hot('--a--^--b--c--#', {
      a: 'a',
      b: 'b',
      c: 'c'
    }, 'jenga');
    var leftSubs = '^        !';
    var right = hot('-----^----------d--e--f--|', {
      d: 'd',
      e: 'e',
      f: 'f'
    });
    var rightSubs = '^        !';
    var expected = '---------#';
    var result = Observable.combineLatest(left, right, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, null, 'jenga');
    expectSubscriptions(left.subscriptions).toBe(leftSubs);
    expectSubscriptions(right.subscriptions).toBe(rightSubs);
  });
  it('should handle two consecutive hot observables with error right', function() {
    var left = hot('--a--^--b--c--|', {
      a: 'a',
      b: 'b',
      c: 'c'
    });
    var leftSubs = '^        !';
    var right = hot('-----^----------d--e--f--#', {
      d: 'd',
      e: 'e',
      f: 'f'
    }, 'dun dun dun');
    var rightSubs = '^                   !';
    var expected = '-----------x--y--z--#';
    var result = Observable.combineLatest(left, right, function(x, y) {
      return x + y;
    });
    expectObservable(result).toBe(expected, {
      x: 'cd',
      y: 'ce',
      z: 'cf'
    }, 'dun dun dun');
    expectSubscriptions(left.subscriptions).toBe(leftSubs);
    expectSubscriptions(right.subscriptions).toBe(rightSubs);
  });
  it('should handle selector throwing', function() {
    var e1 = hot('--a--^--b--|', {
      a: 1,
      b: 2
    });
    var e1subs = '^  !';
    var e2 = hot('--c--^--d--|', {
      c: 3,
      d: 4
    });
    var e2subs = '^  !';
    var expected = '---#';
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      throw 'ha ha ' + x + ', ' + y;
    });
    expectObservable(result).toBe(expected, null, 'ha ha 2, 4');
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should allow unsubscribing early and explicitly', function() {
    var e1 = hot('--a--^--b--c---d-| ');
    var e1subs = '^        !    ';
    var e2 = hot('---e-^---f--g---h-|');
    var e2subs = '^        !    ';
    var expected = '----x-yz--    ';
    var unsub = '         !    ';
    var values = {
      x: 'bf',
      y: 'cf',
      z: 'cg'
    };
    var result = Observable.combineLatest(e1, e2, function(x, y) {
      return x + y;
    });
    expectObservable(result, unsub).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should not break unsubscription chains when unsubscribed explicitly', function() {
    var e1 = hot('--a--^--b--c---d-| ');
    var e1subs = '^        !    ';
    var e2 = hot('---e-^---f--g---h-|');
    var e2subs = '^        !    ';
    var expected = '----x-yz--    ';
    var unsub = '         !    ';
    var values = {
      x: 'bf',
      y: 'cf',
      z: 'cg'
    };
    var result = Observable.combineLatest(e1.mergeMap(function(x) {
      return Observable.of(x);
    }), e2.mergeMap(function(x) {
      return Observable.of(x);
    }), function(x, y) {
      return x + y;
    }).mergeMap(function(x) {
      return Observable.of(x);
    });
    expectObservable(result, unsub).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should support promises', function() {
    type(function() {
      var a;
      var b;
      var c;
      var o1 = Observable.combineLatest(a, b, c);
      var o2 = Observable.combineLatest(a, b, c, function(aa, bb, cc) {
        return !!aa && !!bb && cc;
      });
    });
  });
  it('should support observables', function() {
    type(function() {
      var a;
      var b;
      var c;
      var o1 = Observable.combineLatest(a, b, c);
      var o2 = Observable.combineLatest(a, b, c, function(aa, bb, cc) {
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
      var o1 = Observable.combineLatest(a, b, c, d);
      var o2 = Observable.combineLatest(a, b, c, d, function(aa, bb, cc, dd) {
        return !!aa && !!bb && cc && !!dd.length;
      });
    });
  });
  it('should support arrays of promises', function() {
    type(function() {
      var a;
      var o1 = Observable.combineLatest(a);
      var o2 = Observable.combineLatest.apply(Observable, a);
      var o3 = Observable.combineLatest(a, function() {
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
      var o1 = Observable.combineLatest(a);
      var o2 = Observable.combineLatest.apply(Observable, a);
      var o3 = Observable.combineLatest(a, function() {
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
      var o1 = Observable.combineLatest(a);
    });
  });
  it('should return Array<T> when given a single observable', function() {
    type(function() {
      var a;
      var o1 = Observable.combineLatest(a);
    });
  });
});
