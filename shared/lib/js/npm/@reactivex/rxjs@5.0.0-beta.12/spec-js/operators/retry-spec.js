/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
describe('Observable.prototype.retry', function() {
  asDiagram('retry(2)')('should handle a basic source that emits next then errors, count=3', function() {
    var source = cold('--1-2-3-#');
    var subs = ['^       !                ', '        ^       !        ', '                ^       !'];
    var expected = '--1-2-3---1-2-3---1-2-3-#';
    var result = source.retry(2);
    expectObservable(result).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(subs);
  });
  it('should retry a number of times, without error, then complete', function(done) {
    var errors = 0;
    var retries = 2;
    Observable.create(function(observer) {
      observer.next(42);
      observer.complete();
    }).map(function(x) {
      if (++errors < retries) {
        throw 'bad';
      }
      errors = 0;
      return x;
    }).retry(retries).subscribe(function(x) {
      chai_1.expect(x).to.equal(42);
    }, function(err) {
      chai_1.expect('this was called').to.be.true;
    }, done);
  });
  it('should retry a number of times, then call error handler', function(done) {
    var errors = 0;
    var retries = 2;
    Observable.create(function(observer) {
      observer.next(42);
      observer.complete();
    }).map(function(x) {
      errors += 1;
      throw 'bad';
    }).retry(retries - 1).subscribe(function(x) {
      chai_1.expect(x).to.equal(42);
    }, function(err) {
      chai_1.expect(errors).to.equal(2);
      done();
    }, function() {
      chai_1.expect('this was called').to.be.true;
    });
  });
  it('should retry until successful completion', function(done) {
    var errors = 0;
    var retries = 10;
    Observable.create(function(observer) {
      observer.next(42);
      observer.complete();
    }).map(function(x) {
      if (++errors < retries) {
        throw 'bad';
      }
      errors = 0;
      return x;
    }).retry().take(retries).subscribe(function(x) {
      chai_1.expect(x).to.equal(42);
    }, function(err) {
      chai_1.expect('this was called').to.be.true;
    }, done);
  });
  it('should handle an empty source', function() {
    var source = cold('|');
    var subs = '(^!)';
    var expected = '|';
    var result = source.retry();
    expectObservable(result).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(subs);
  });
  it('should handle a never source', function() {
    var source = cold('-');
    var subs = '^';
    var expected = '-';
    var result = source.retry();
    expectObservable(result).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(subs);
  });
  it('should return a never observable given an async just-throw source and no count', function() {
    var source = cold('-#');
    var unsub = '                                     !';
    var expected = '--------------------------------------';
    var result = source.retry();
    expectObservable(result, unsub).toBe(expected);
  });
  it('should handle a basic source that emits next then completes', function() {
    var source = hot('--1--2--^--3--4--5---|');
    var subs = '^            !';
    var expected = '---3--4--5---|';
    var result = source.retry();
    expectObservable(result).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(subs);
  });
  it('should handle a basic source that emits next but does not complete', function() {
    var source = hot('--1--2--^--3--4--5---');
    var subs = '^            ';
    var expected = '---3--4--5---';
    var result = source.retry();
    expectObservable(result).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(subs);
  });
  it('should handle a basic source that emits next then errors, no count', function() {
    var source = cold('--1-2-3-#');
    var unsub = '                                     !';
    var subs = ['^       !                             ', '        ^       !                     ', '                ^       !             ', '                        ^       !     ', '                                ^    !'];
    var expected = '--1-2-3---1-2-3---1-2-3---1-2-3---1-2-';
    var result = source.retry();
    expectObservable(result, unsub).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(subs);
  });
  it('should handle a source which eventually throws, count=3, and result is ' + 'unsubscribed early', function() {
    var source = cold('--1-2-3-#');
    var unsub = '             !           ';
    var subs = ['^       !                ', '        ^    !           '];
    var expected = '--1-2-3---1-2-';
    var result = source.retry(3);
    expectObservable(result, unsub).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(subs);
  });
  it('should not break unsubscription chain when unsubscribed explicitly', function() {
    var source = cold('--1-2-3-#');
    var subs = ['^       !                ', '        ^    !           '];
    var expected = '--1-2-3---1-2-';
    var unsub = '             !           ';
    var result = source.mergeMap(function(x) {
      return Observable.of(x);
    }).retry(100).mergeMap(function(x) {
      return Observable.of(x);
    });
    expectObservable(result, unsub).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(subs);
  });
  it('should retry a synchronous source (multicasted and refCounted) multiple times', function(done) {
    var expected = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3];
    Observable.of(1, 2, 3).concat(Observable.throw('bad!')).multicast(function() {
      return new Rx.Subject();
    }).refCount().retry(4).subscribe(function(x) {
      chai_1.expect(x).to.equal(expected.shift());
    }, function(err) {
      chai_1.expect(err).to.equal('bad!');
      chai_1.expect(expected.length).to.equal(0);
      done();
    }, function() {
      done(new Error('should not be called'));
    });
  });
});