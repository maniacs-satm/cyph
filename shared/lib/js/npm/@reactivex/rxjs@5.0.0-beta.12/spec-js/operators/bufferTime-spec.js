/* */ 
"use strict";
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
describe('Observable.prototype.bufferTime', function() {
  asDiagram('bufferTime(100)')('should emit buffers at intervals', function() {
    var e1 = hot('---a---b---c---d---e---f---g-----|');
    var subs = '^                                !';
    var t = time('----------|');
    var expected = '----------w---------x---------y--(z|)';
    var values = {
      w: ['a', 'b'],
      x: ['c', 'd', 'e'],
      y: ['f', 'g'],
      z: []
    };
    var result = e1.bufferTime(t, null, Number.POSITIVE_INFINITY, rxTestScheduler);
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(subs);
  });
  it('should emit buffers at intervals test 2', function() {
    var e1 = hot('---------a---------b---------c---------d---------e---------g--------|');
    var t = time('--------------------------------|');
    var expected = '--------------------------------x-------------------------------y---(z|)';
    var values = {
      x: ['a', 'b', 'c'],
      y: ['d', 'e', 'g'],
      z: []
    };
    var result = e1.bufferTime(t, null, Number.POSITIVE_INFINITY, rxTestScheduler);
    expectObservable(result).toBe(expected, values);
  });
  it('should emit buffers at intervals or when the buffer is full', function() {
    var e1 = hot('---a---b---c---d---e---f---g-----|');
    var subs = '^                                !';
    var t = time('----------|');
    var expected = '-------w-------x-------y---------(z|)';
    var values = {
      w: ['a', 'b'],
      x: ['c', 'd'],
      y: ['e', 'f'],
      z: ['g']
    };
    var result = e1.bufferTime(t, null, 2, rxTestScheduler);
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(subs);
  });
  it('should emit buffers at intervals or when the buffer is full test 2', function() {
    var e1 = hot('---a---b---c---d---e---f---g-----|');
    var subs = '^                                !';
    var t = time('----------|');
    var expected = '----------w--------x---------y---(z|)';
    var values = {
      w: ['a', 'b'],
      x: ['c', 'd', 'e'],
      y: ['f', 'g'],
      z: []
    };
    var result = e1.bufferTime(t, null, 3, rxTestScheduler);
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(subs);
  });
  it('should emit buffers that have been created at intervals and close after the specified delay', function() {
    var e1 = hot('---a---b---c----d----e----f----g----h----i----(k|)');
    var t = time('---------------------|');
    var interval = time('--------------------|');
    var expected = '---------------------x-------------------y----(z|)';
    var values = {
      x: ['a', 'b', 'c', 'd', 'e'],
      y: ['e', 'f', 'g', 'h', 'i'],
      z: ['i', 'k']
    };
    var result = e1.bufferTime(t, interval, Number.POSITIVE_INFINITY, rxTestScheduler);
    expectObservable(result).toBe(expected, values);
  });
  it('should emit buffers that have been created at intervals and close after the specified delay ' + 'or when the buffer is full', function() {
    var e1 = hot('---a---b---c----d----e----f----g----h----i----(k|)');
    var t = time('---------------------|');
    var interval = time('--------------------|');
    var expected = '----------------x-------------------y---------(z|)';
    var values = {
      x: ['a', 'b', 'c', 'd'],
      y: ['e', 'f', 'g', 'h'],
      z: ['i', 'k']
    };
    var result = e1.bufferTime(t, interval, 4, rxTestScheduler);
    expectObservable(result).toBe(expected, values);
  });
  it('should emit buffers with timeSpan 100 and creationInterval 70', function() {
    var e1 = hot('--1--^2--3---4---5--6--7---8----9------------|');
    var e1subs = '^                                       !';
    var t = time('----------|');
    var interval = time('-------|');
    var expected = '----------a------b------c------d------e-(f|)';
    var values = {
      a: ['2', '3', '4'],
      b: ['4', '5', '6'],
      c: ['6', '7', '8'],
      d: ['8', '9'],
      e: [],
      f: []
    };
    var result = e1.bufferTime(t, interval, Number.POSITIVE_INFINITY, rxTestScheduler);
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should emit buffers but handle source ending with an error', function() {
    var e1 = hot('--1--^2--3---4---5--6--7---8----9------------#');
    var t = time('----------|');
    var interval = time('-------|');
    var expected = '----------a------b------c------d------e-#';
    var values = {
      a: ['2', '3', '4'],
      b: ['4', '5', '6'],
      c: ['6', '7', '8'],
      d: ['8', '9'],
      e: []
    };
    var result = e1.bufferTime(t, interval, Number.POSITIVE_INFINITY, rxTestScheduler);
    expectObservable(result).toBe(expected, values);
  });
  it('should emit buffers and allow result to unsubscribed early', function() {
    var e1 = hot('--1--^2--3---4---5--6--7---8----9------------|');
    var unsub = '                 !                       ';
    var subs = '^                !                       ';
    var t = time('----------|');
    var interval = time('-------|');
    var expected = '----------a------                        ';
    var values = {a: ['2', '3', '4']};
    var result = e1.bufferTime(t, interval, Number.POSITIVE_INFINITY, rxTestScheduler);
    expectObservable(result, unsub).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(subs);
  });
  it('should not break unsubscription chains when result is unsubscribed explicitly', function() {
    var e1 = hot('--1--^2--3---4---5--6--7---8----9------------|');
    var subs = '^               !                        ';
    var t = time('----------|');
    var interval = time('-------|');
    var expected = '----------a------                        ';
    var unsub = '                !                        ';
    var values = {a: ['2', '3', '4']};
    var result = e1.mergeMap(function(x) {
      return Observable.of(x);
    }).bufferTime(t, interval, Number.POSITIVE_INFINITY, rxTestScheduler).mergeMap(function(x) {
      return Observable.of(x);
    });
    expectObservable(result, unsub).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(subs);
  });
  it('should handle empty', function() {
    var e1 = cold('|');
    var e1subs = '(^!)';
    var expected = '(b|)';
    var values = {b: []};
    var t = time('----------|');
    var result = e1.bufferTime(t, null, Number.POSITIVE_INFINITY, rxTestScheduler);
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should handle never', function() {
    var e1 = cold('-');
    var unsub = '                                            !';
    var t = time('----------|');
    var expected = '----------a---------a---------a---------a----';
    var result = e1.bufferTime(t, null, Number.POSITIVE_INFINITY, rxTestScheduler);
    expectObservable(result, unsub).toBe(expected, {a: []});
  });
  it('should handle throw', function() {
    var e1 = Observable.throw(new Error('haha'));
    var expected = '#';
    var t = time('----------|');
    var result = e1.bufferTime(t, null, Number.POSITIVE_INFINITY, rxTestScheduler);
    expectObservable(result).toBe(expected, undefined, new Error('haha'));
  });
  it('should handle errors', function() {
    var e1 = hot('---a---b---c---#');
    var e1subs = '^              !';
    var t = time('----------|');
    var expected = '----------w----#';
    var values = {w: ['a', 'b']};
    var result = e1.bufferTime(t, null, Number.POSITIVE_INFINITY, rxTestScheduler);
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should emit buffers that have been created at intervals and close after ' + 'the specified delay with errors', function() {
    var e1 = hot('---a---b---c----d----e----f----g----h----i--#');
    var e1subs = '^                                           !';
    var t = time('---------------------|');
    var interval = time('--------------------|');
    var expected = '---------------------x-------------------y--#';
    var values = {
      x: ['a', 'b', 'c', 'd', 'e'],
      y: ['e', 'f', 'g', 'h', 'i']
    };
    var result = e1.bufferTime(t, interval, Number.POSITIVE_INFINITY, rxTestScheduler);
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should not throw when subscription synchronously unsubscribed after emit', function() {
    var e1 = hot('---a---b---c---d---e---f---g-----|');
    var subs = '^                   !';
    var t = time('----------|');
    var expected = '----------w---------(x|)';
    var values = {
      w: ['a', 'b'],
      x: ['c', 'd', 'e']
    };
    var result = e1.bufferTime(t, null, Number.POSITIVE_INFINITY, rxTestScheduler).take(2);
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(subs);
  });
});