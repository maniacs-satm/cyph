/* */ 
"use strict";
var Rx = require('../../dist/cjs/Rx');
var chai_1 = require('chai');
describe('Observable.prototype.cache', function() {
  it('should just work™', function() {
    var subs = 0;
    var source = Rx.Observable.create(function(observer) {
      subs++;
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    }).cache();
    var results = [];
    source.subscribe(function(x) {
      return results.push(x);
    });
    chai_1.expect(results).to.deep.equal([1, 2, 3]);
    chai_1.expect(subs).to.equal(1);
    results = [];
    source.subscribe(function(x) {
      return results.push(x);
    });
    chai_1.expect(results).to.deep.equal([1, 2, 3]);
    chai_1.expect(subs).to.equal(1);
  });
  it('should replay values upon subscription', function() {
    var s1 = hot('----a---b---c---|       ').cache(undefined, undefined, rxTestScheduler);
    var expected1 = '----a---b---c---|       ';
    var expected2 = '                  (abc|)';
    var sub2 = '------------------|     ';
    expectObservable(s1).toBe(expected1);
    rxTestScheduler.schedule(function() {
      return expectObservable(s1).toBe(expected2);
    }, time(sub2));
  });
  it('should not replay values after error with a hot observable', function() {
    var s1 = hot('---^---a---b---c---#  ').cache(undefined, undefined, rxTestScheduler);
    var expected1 = '----a---b---c---#  ';
    var expected2 = '                  -';
    var t = time('------------------|');
    expectObservable(s1).toBe(expected1);
    rxTestScheduler.schedule(function() {
      expectObservable(s1).toBe(expected2);
    }, t);
  });
  it('should be resubscribable after error with a cold observable', function() {
    var s1 = cold('----a---b---c---#                  ').cache(undefined, undefined, rxTestScheduler);
    var expected1 = '----a---b---c---#                  ';
    var expected2 = '                  ----a---b---c---#';
    var t = time('------------------|                ');
    expectObservable(s1).toBe(expected1);
    rxTestScheduler.schedule(function() {
      expectObservable(s1).toBe(expected2);
    }, t);
  });
  it('should replay values and and share', function() {
    var s1 = hot('---^---a---b---c------------d--e--f-|').cache(undefined, undefined, rxTestScheduler);
    var expected1 = '----a---b---c------------d--e--f-|';
    var expected2 = '                (abc)----d--e--f-|';
    var t = time('----------------|');
    expectObservable(s1).toBe(expected1);
    rxTestScheduler.schedule(function() {
      expectObservable(s1).toBe(expected2);
    }, t);
  });
  it('should have a bufferCount that limits the replay test 1', function() {
    var s1 = hot('---^---a---b---c------------d--e--f-|').cache(1);
    var expected1 = '----a---b---c------------d--e--f-|';
    var expected2 = '                c--------d--e--f-|';
    var t = time('----------------|');
    expectObservable(s1).toBe(expected1);
    rxTestScheduler.schedule(function() {
      expectObservable(s1).toBe(expected2);
    }, t);
  });
  it('should have a bufferCount that limits the replay test 2', function() {
    var s1 = hot('----a---b---c------------d--e--f-|').cache(2);
    var expected1 = '----a---b---c------------d--e--f-|';
    var expected2 = '                (bc)-----d--e--f-|';
    var t = time('----------------|');
    expectObservable(s1).toBe(expected1);
    rxTestScheduler.schedule(function() {
      return expectObservable(s1).toBe(expected2);
    }, t);
  });
  it('should accept a windowTime that limits the replay', function() {
    var w = time('----------|');
    var s1 = hot('---^---a---b---c------------d--e--f-|').cache(Number.POSITIVE_INFINITY, w, rxTestScheduler);
    var expected1 = '----a---b---c------------d--e--f-|';
    var expected2 = '                (bc)-----d--e--f-|';
    var t = time('----------------|');
    expectObservable(s1).toBe(expected1);
    rxTestScheduler.schedule(function() {
      expectObservable(s1).toBe(expected2);
    }, t);
  });
  it('should handle empty', function() {
    var s1 = cold('|').cache(undefined, undefined, rxTestScheduler);
    var expected1 = '|';
    var expected2 = '                |';
    var t = time('----------------|');
    expectObservable(s1).toBe(expected1);
    rxTestScheduler.schedule(function() {
      expectObservable(s1).toBe(expected2);
    }, t);
  });
  it('should handle throw', function() {
    var s1 = cold('#').cache(undefined, undefined, rxTestScheduler);
    var expected1 = '#';
    var expected2 = '                #';
    var t = time('----------------|');
    expectObservable(s1).toBe(expected1);
    rxTestScheduler.schedule(function() {
      expectObservable(s1).toBe(expected2);
    }, t);
  });
  it('should handle never', function() {
    var s1 = cold('-').cache(undefined, undefined, rxTestScheduler);
    var expected1 = '-';
    var expected2 = '                -';
    var t = time('----------------|');
    expectObservable(s1).toBe(expected1);
    rxTestScheduler.schedule(function() {
      expectObservable(s1).toBe(expected2);
    }, t);
  });
  it('should multicast a completion', function() {
    var s1 = hot('--a--^--b------c-----d------e-|').cache(undefined, undefined, rxTestScheduler);
    var t1 = time('|                         ');
    var e1 = '---b------c-----d------e-|';
    var t2 = time('----------|               ');
    var e2 = '          (bc)--d------e-|';
    var t3 = time('----------------|         ');
    var e3 = '                (bcd)--e-|';
    var expected = [e1, e2, e3];
    [t1, t2, t3].forEach(function(t, i) {
      rxTestScheduler.schedule(function() {
        expectObservable(s1).toBe(expected[i]);
      }, t);
    });
  });
  it('should multicast an error', function() {
    var s1 = hot('--a--^--b------c-----d------e-#').cache(undefined, undefined, rxTestScheduler);
    var t1 = time('|                         ');
    var e1 = '---b------c-----d------e-#';
    var t2 = time('----------|               ');
    var e2 = '          (bc)--d------e-#';
    var t3 = time('----------------|         ');
    var e3 = '                (bcd)--e-#';
    var expected = [e1, e2, e3];
    [t1, t2, t3].forEach(function(t, i) {
      rxTestScheduler.schedule(function() {
        expectObservable(s1).toBe(expected[i]);
      }, t);
    });
  });
  it('should limit replay by both count and a window time, test 2', function() {
    var w = time('-----------|');
    var s1 = hot('--a--^---b---c----d----e------f--g--h--i-------|').cache(4, w, rxTestScheduler);
    var e1 = '----b---c----d----e------f--g--h--i-------|';
    var t1 = time('--------------------|');
    var e2 = '                    (de)-f--g--h--i-------|';
    var t2 = time('-----------------------------------|');
    var e3 = '                                   (fghi)-|';
    expectObservable(s1).toBe(e1);
    rxTestScheduler.schedule(function() {
      expectObservable(s1).toBe(e2);
    }, t1);
    rxTestScheduler.schedule(function() {
      expectObservable(s1).toBe(e3);
    }, t2);
  });
  it('should be retryable', function() {
    var source = cold('--1-2-3-#');
    var subs = ['^       !                ', '        ^       !        ', '                ^       !'];
    var expected = '--1-2-3---1-2-3---1-2-3-#';
    var result = source.cache(undefined, undefined, rxTestScheduler).retry(2);
    expectObservable(result).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(subs);
  });
});
