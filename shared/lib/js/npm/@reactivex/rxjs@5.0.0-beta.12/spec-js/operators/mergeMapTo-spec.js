/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
describe('Observable.prototype.mergeMapTo', function() {
  asDiagram('mergeMapTo( 10\u2014\u201410\u2014\u201410\u2014| )')('should map-and-flatten each item to an Observable', function() {
    var e1 = hot('--1-----3--5-------|');
    var e1subs = '^                  !';
    var e2 = cold('x-x-x|              ', {x: 10});
    var expected = '--x-x-x-x-xxxx-x---|';
    var values = {x: 10};
    var result = e1.mergeMapTo(e2);
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mergeMapTo many regular interval inners', function() {
    var x = cold('----1---2---3---(4|)                        ');
    var xsubs = ['^               !                           ', '    ^               !                       ', '                ^               !           ', '                        ^               !   '];
    var e1 = hot('a---b-----------c-------d-------|           ');
    var e1subs = '^                                       !';
    var expected = '----1---(21)(32)(43)(41)2---(31)(42)3---(4|)';
    var source = e1.mergeMapTo(x);
    expectObservable(source).toBe(expected);
    expectSubscriptions(x.subscriptions).toBe(xsubs);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should map values to constant resolved promises and merge', function(done) {
    var source = Rx.Observable.from([4, 3, 2, 1]);
    var results = [];
    source.mergeMapTo(Observable.from(Promise.resolve(42))).subscribe(function(x) {
      results.push(x);
    }, function(err) {
      done(new Error('Subscriber error handler not supposed to be called.'));
    }, function() {
      chai_1.expect(results).to.deep.equal([42, 42, 42, 42]);
      done();
    });
  });
  it('should map values to constant rejected promises and merge', function(done) {
    var source = Rx.Observable.from([4, 3, 2, 1]);
    source.mergeMapTo(Observable.from(Promise.reject(42))).subscribe(function(x) {
      done(new Error('Subscriber next handler not supposed to be called.'));
    }, function(err) {
      chai_1.expect(err).to.equal(42);
      done();
    }, function() {
      done(new Error('Subscriber complete handler not supposed to be called.'));
    });
  });
  it('should mergeMapTo values to resolved promises with resultSelector', function(done) {
    var source = Rx.Observable.from([4, 3, 2, 1]);
    var resultSelectorCalledWith = [];
    var inner = Observable.from(Promise.resolve(42));
    var resultSelector = function(outerVal, innerVal, outerIndex, innerIndex) {
      resultSelectorCalledWith.push([].slice.call(arguments));
      return 8;
    };
    var results = [];
    var expectedCalls = [[4, 42, 0, 0], [3, 42, 1, 0], [2, 42, 2, 0], [1, 42, 3, 0]];
    source.mergeMapTo(inner, resultSelector).subscribe(function(x) {
      results.push(x);
    }, function(err) {
      done(new Error('Subscriber error handler not supposed to be called.'));
    }, function() {
      chai_1.expect(results).to.deep.equal([8, 8, 8, 8]);
      chai_1.expect(resultSelectorCalledWith).to.deep.equal(expectedCalls);
      done();
    });
  });
  it('should mergeMapTo values to rejected promises with resultSelector', function(done) {
    var source = Rx.Observable.from([4, 3, 2, 1]);
    var inner = Observable.from(Promise.reject(42));
    var resultSelector = function() {
      throw 'this should not be called';
    };
    source.mergeMapTo(inner, resultSelector).subscribe(function(x) {
      done(new Error('Subscriber next handler not supposed to be called.'));
    }, function(err) {
      chai_1.expect(err).to.equal(42);
      done();
    }, function() {
      done(new Error('Subscriber complete handler not supposed to be called.'));
    });
  });
  it('should mergeMapTo many outer values to many inner values', function() {
    var values = {
      i: 'foo',
      j: 'bar',
      k: 'baz',
      l: 'qux'
    };
    var e1 = hot('-a-------b-------c-------d-------|            ');
    var e1subs = '^                                            !';
    var inner = cold('----i---j---k---l---|                        ', values);
    var innersubs = [' ^                   !                        ', '         ^                   !                ', '                 ^                   !        ', '                         ^                   !'];
    var expected = '-----i---j---(ki)(lj)(ki)(lj)(ki)(lj)k---l---|';
    expectObservable(e1.mergeMapTo(inner)).toBe(expected, values);
    expectSubscriptions(inner.subscriptions).toBe(innersubs);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mergeMapTo many outer to many inner, complete late', function() {
    var values = {
      i: 'foo',
      j: 'bar',
      k: 'baz',
      l: 'qux'
    };
    var e1 = hot('-a-------b-------c-------d-----------------------|');
    var e1subs = '^                                                !';
    var inner = cold('----i---j---k---l---|', values);
    var innersubs = [' ^                   !                            ', '         ^                   !                    ', '                 ^                   !            ', '                         ^                   !    '];
    var expected = '-----i---j---(ki)(lj)(ki)(lj)(ki)(lj)k---l-------|';
    expectObservable(e1.mergeMapTo(inner)).toBe(expected, values);
    expectSubscriptions(inner.subscriptions).toBe(innersubs);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mergeMapTo many outer to many inner, outer never completes', function() {
    var values = {
      i: 'foo',
      j: 'bar',
      k: 'baz',
      l: 'qux'
    };
    var e1 = hot('-a-------b-------c-------d-------e---------------f------');
    var e1subs = '^                                                      !';
    var inner = cold('----i---j---k---l---|', values);
    var innersubs = [' ^                   !                                  ', '         ^                   !                          ', '                 ^                   !                  ', '                         ^                   !          ', '                                 ^                   !  ', '                                                 ^     !'];
    var unsub = '                                                       !';
    var expected = '-----i---j---(ki)(lj)(ki)(lj)(ki)(lj)(ki)(lj)k---l---i-';
    var source = e1.mergeMapTo(inner);
    expectObservable(source, unsub).toBe(expected, values);
    expectSubscriptions(inner.subscriptions).toBe(innersubs);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should not break unsubscription chains when result is unsubscribed explicitly', function() {
    var values = {
      i: 'foo',
      j: 'bar',
      k: 'baz',
      l: 'qux'
    };
    var e1 = hot('-a-------b-------c-------d-------e---------------f------');
    var e1subs = '^                                                      !';
    var inner = cold('----i---j---k---l---|', values);
    var innersubs = [' ^                   !                                  ', '         ^                   !                          ', '                 ^                   !                  ', '                         ^                   !          ', '                                 ^                   !  ', '                                                 ^     !'];
    var unsub = '                                                       !';
    var expected = '-----i---j---(ki)(lj)(ki)(lj)(ki)(lj)(ki)(lj)k---l---i-';
    var source = e1.map(function(x) {
      return x;
    }).mergeMapTo(inner).map(function(x) {
      return x;
    });
    expectObservable(source, unsub).toBe(expected, values);
    expectSubscriptions(inner.subscriptions).toBe(innersubs);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mergeMapTo many outer to many inner, inner never completes', function() {
    var values = {
      i: 'foo',
      j: 'bar',
      k: 'baz',
      l: 'qux'
    };
    var e1 = hot('-a-------b-------c-------d-------|         ');
    var e1subs = '^                                          ';
    var inner = cold('----i---j---k---l-', values);
    var innersubs = [' ^                                         ', '         ^                                 ', '                 ^                         ', '                         ^                 '];
    var expected = '-----i---j---(ki)(lj)(ki)(lj)(ki)(lj)k---l-';
    expectObservable(e1.mergeMapTo(inner)).toBe(expected, values);
    expectSubscriptions(inner.subscriptions).toBe(innersubs);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mergeMapTo many outer to many inner, and inner throws', function() {
    var values = {
      i: 'foo',
      j: 'bar',
      k: 'baz',
      l: 'qux'
    };
    var e1 = hot('-a-------b-------c-------d-------|');
    var e1subs = '^                        !        ';
    var inner = cold('----i---j---k---l-------#        ', values);
    var innersubs = [' ^                       !        ', '         ^               !        ', '                 ^       !        ', '                         (^!)     '];
    var expected = '-----i---j---(ki)(lj)(ki)#';
    expectObservable(e1.mergeMapTo(inner)).toBe(expected, values);
    expectSubscriptions(inner.subscriptions).toBe(innersubs);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mergeMapTo many outer to many inner, and outer throws', function() {
    var values = {
      i: 'foo',
      j: 'bar',
      k: 'baz',
      l: 'qux'
    };
    var e1 = hot('-a-------b-------c-------d-------#');
    var e1subs = '^                                !';
    var inner = cold('----i---j---k---l---|            ', values);
    var innersubs = [' ^                   !            ', '         ^                   !    ', '                 ^               !', '                         ^       !'];
    var expected = '-----i---j---(ki)(lj)(ki)(lj)(ki)#';
    expectObservable(e1.mergeMapTo(inner)).toBe(expected, values);
    expectSubscriptions(inner.subscriptions).toBe(innersubs);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mergeMapTo many outer to many inner, both inner and outer throw', function() {
    var values = {
      i: 'foo',
      j: 'bar',
      k: 'baz',
      l: 'qux'
    };
    var e1 = hot('-a-------b-------c-------d-------#');
    var e1subs = '^                    !';
    var inner = cold('----i---j---k---l---#', values);
    var innersubs = [' ^                   !', '         ^           !', '                 ^   !'];
    var expected = '-----i---j---(ki)(lj)#';
    expectObservable(e1.mergeMapTo(inner)).toBe(expected, values);
    expectSubscriptions(inner.subscriptions).toBe(innersubs);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mergeMapTo many cold Observable, with parameter concurrency=1', function() {
    var values = {
      i: 'foo',
      j: 'bar',
      k: 'baz',
      l: 'qux'
    };
    var e1 = hot('-a-------b-------c---|                                        ');
    var e1subs = '^                                                            !';
    var inner = cold('----i---j---k---l---|                                        ', values);
    var innersubs = [' ^                   !                                        ', '                     ^                   !                    ', '                                         ^                   !'];
    var expected = '-----i---j---k---l-------i---j---k---l-------i---j---k---l---|';
    function resultSelector(oV, iV, oI, iI) {
      return iV;
    }
    var result = e1.mergeMapTo(inner, resultSelector, 1);
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(inner.subscriptions).toBe(innersubs);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mergeMap to many cold Observable, with parameter concurrency=2', function() {
    var values = {
      i: 'foo',
      j: 'bar',
      k: 'baz',
      l: 'qux'
    };
    var e1 = hot('-a-------b-------c---|                    ');
    var e1subs = '^                                        !';
    var inner = cold('----i---j---k---l---|                    ', values);
    var innersubs = [' ^                   !                    ', '         ^                   !            ', '                     ^                   !'];
    var expected = '-----i---j---(ki)(lj)k---(li)j---k---l---|';
    function resultSelector(oV, iV, oI, iI) {
      return iV;
    }
    var result = e1.mergeMapTo(inner, resultSelector, 2);
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(inner.subscriptions).toBe(innersubs);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mergeMapTo many cold Observable, with parameter concurrency=1, without resultSelector', function() {
    var values = {
      i: 'foo',
      j: 'bar',
      k: 'baz',
      l: 'qux'
    };
    var e1 = hot('-a-------b-------c---|                                        ');
    var e1subs = '^                                                            !';
    var inner = cold('----i---j---k---l---|                                        ', values);
    var innersubs = [' ^                   !                                        ', '                     ^                   !                    ', '                                         ^                   !'];
    var expected = '-----i---j---k---l-------i---j---k---l-------i---j---k---l---|';
    var result = e1.mergeMapTo(inner, 1);
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(inner.subscriptions).toBe(innersubs);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mergeMap to many cold Observable, with parameter concurrency=2, without resultSelector', function() {
    var values = {
      i: 'foo',
      j: 'bar',
      k: 'baz',
      l: 'qux'
    };
    var e1 = hot('-a-------b-------c---|                    ');
    var e1subs = '^                                        !';
    var inner = cold('----i---j---k---l---|                    ', values);
    var innersubs = [' ^                   !                    ', '         ^                   !            ', '                     ^                   !'];
    var expected = '-----i---j---(ki)(lj)k---(li)j---k---l---|';
    var result = e1.mergeMapTo(inner, 2);
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(inner.subscriptions).toBe(innersubs);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mergeMapTo many outer to arrays', function() {
    var e1 = hot('2-----4--------3--------2-------|');
    var e1subs = '^                               !';
    var expected = '(0123)(0123)---(0123)---(0123)--|';
    var source = e1.mergeMapTo(['0', '1', '2', '3']);
    expectObservable(source).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mergeMapTo many outer to inner arrays, using resultSelector', function() {
    var e1 = hot('2-----4--------3--------2-------|');
    var e1subs = '^                               !';
    var expected = '(2345)(4567)---(3456)---(2345)--|';
    var source = e1.mergeMapTo(['0', '1', '2', '3'], function(x, y) {
      return String(parseInt(x) + parseInt(y));
    });
    expectObservable(source).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mergeMapTo many outer to inner arrays, and outer throws', function() {
    var e1 = hot('2-----4--------3--------2-------#');
    var e1subs = '^                               !';
    var expected = '(0123)(0123)---(0123)---(0123)--#';
    var source = e1.mergeMapTo(['0', '1', '2', '3']);
    expectObservable(source).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mergeMapTo many outer to inner arrays, resultSelector, outer throws', function() {
    var e1 = hot('2-----4--------3--------2-------#');
    var e1subs = '^                               !';
    var expected = '(2345)(4567)---(3456)---(2345)--#';
    var source = e1.mergeMapTo(['0', '1', '2', '3'], function(x, y) {
      return String(parseInt(x) + parseInt(y));
    });
    expectObservable(source).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mergeMapTo many outer to inner arrays, outer gets unsubscribed', function() {
    var e1 = hot('2-----4--------3--------2-------|');
    var e1subs = '^            !';
    var unsub = '             !';
    var expected = '(0123)(0123)--';
    var source = e1.mergeMapTo(['0', '1', '2', '3']);
    expectObservable(source, unsub).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mergeMapTo many outer to inner arrays, resultSelector, outer unsubscribed', function() {
    var e1 = hot('2-----4--------3--------2-------|');
    var e1subs = '^            !';
    var unsub = '             !';
    var expected = '(2345)(4567)--';
    var source = e1.mergeMapTo(['0', '1', '2', '3'], function(x, y) {
      return String(parseInt(x) + parseInt(y));
    });
    expectObservable(source, unsub).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should mergeMapTo many outer to inner arrays, resultSelector throws', function() {
    var e1 = hot('2-----4--------3--------2-------|');
    var e1subs = '^              !';
    var expected = '(2345)(4567)---#';
    var source = e1.mergeMapTo(['0', '1', '2', '3'], function(outer, inner) {
      if (outer === '3') {
        throw 'error';
      }
      return String(parseInt(outer) + parseInt(inner));
    });
    expectObservable(source).toBe(expected);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should map and flatten', function() {
    var source = Observable.of(1, 2, 3, 4).mergeMapTo(Observable.of('!'));
    var expected = ['!', '!', '!', '!'];
    var completed = false;
    source.subscribe(function(x) {
      chai_1.expect(x).to.equal(expected.shift());
    }, null, function() {
      chai_1.expect(expected.length).to.equal(0);
      completed = true;
    });
    chai_1.expect(completed).to.be.true;
  });
  it('should map and flatten an Array', function() {
    var source = Observable.of(1, 2, 3, 4).mergeMapTo(['!']);
    var expected = ['!', '!', '!', '!'];
    var completed = false;
    source.subscribe(function(x) {
      chai_1.expect(x).to.equal(expected.shift());
    }, null, function() {
      chai_1.expect(expected.length).to.equal(0);
      completed = true;
    });
    chai_1.expect(completed).to.be.true;
  });
  it('should support type signatures', function() {
    type(function() {
      var o;
      var m;
      var a1 = o.mergeMapTo(m);
      var a2 = o.mergeMapTo(m, 3);
      var a3 = o.mergeMapTo(m, function(o, i) {
        return ({
          o: o,
          i: i
        });
      });
      var a4 = o.mergeMapTo(m, function(o, i) {
        return ({
          o: o,
          i: i
        });
      }, 3);
    });
  });
});