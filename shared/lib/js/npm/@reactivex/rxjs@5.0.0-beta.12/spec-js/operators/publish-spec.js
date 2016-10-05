/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
describe('Observable.prototype.publish', function() {
  asDiagram('publish')('should mirror a simple source Observable', function() {
    var source = cold('--1-2---3-4--5-|');
    var sourceSubs = '^              !';
    var published = source.publish();
    var expected = '--1-2---3-4--5-|';
    expectObservable(published).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    published.connect();
  });
  it('should return a ConnectableObservable', function() {
    var source = Observable.of(1).publish();
    chai_1.expect(source instanceof Rx.ConnectableObservable).to.be.true;
  });
  it('should do nothing if connect is not called, despite subscriptions', function() {
    var source = cold('--1-2---3-4--5-|');
    var sourceSubs = [];
    var published = source.publish();
    var expected = '-';
    expectObservable(published).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
  });
  it('should multicast the same values to multiple observers', function() {
    var source = cold('-1-2-3----4-|');
    var sourceSubs = '^           !';
    var published = source.publish();
    var subscriber1 = hot('a|           ').mergeMapTo(published);
    var expected1 = '-1-2-3----4-|';
    var subscriber2 = hot('    b|       ').mergeMapTo(published);
    var expected2 = '    -3----4-|';
    var subscriber3 = hot('        c|   ').mergeMapTo(published);
    var expected3 = '        --4-|';
    expectObservable(subscriber1).toBe(expected1);
    expectObservable(subscriber2).toBe(expected2);
    expectObservable(subscriber3).toBe(expected3);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    published.connect();
  });
  it('should accept selectors', function() {
    var source = hot('-1-2-3----4-|');
    var sourceSubs = ['^           !', '    ^       !', '        ^   !'];
    var published = source.publish(function(x) {
      return x.zip(x, function(a, b) {
        return (parseInt(a) + parseInt(b)).toString();
      });
    });
    var subscriber1 = hot('a|           ').mergeMapTo(published);
    var expected1 = '-2-4-6----8-|';
    var subscriber2 = hot('    b|       ').mergeMapTo(published);
    var expected2 = '    -6----8-|';
    var subscriber3 = hot('        c|   ').mergeMapTo(published);
    var expected3 = '        --8-|';
    expectObservable(subscriber1).toBe(expected1);
    expectObservable(subscriber2).toBe(expected2);
    expectObservable(subscriber3).toBe(expected3);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
  });
  it('should multicast an error from the source to multiple observers', function() {
    var source = cold('-1-2-3----4-#');
    var sourceSubs = '^           !';
    var published = source.publish();
    var subscriber1 = hot('a|           ').mergeMapTo(published);
    var expected1 = '-1-2-3----4-#';
    var subscriber2 = hot('    b|       ').mergeMapTo(published);
    var expected2 = '    -3----4-#';
    var subscriber3 = hot('        c|   ').mergeMapTo(published);
    var expected3 = '        --4-#';
    expectObservable(subscriber1).toBe(expected1);
    expectObservable(subscriber2).toBe(expected2);
    expectObservable(subscriber3).toBe(expected3);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    published.connect();
  });
  it('should multicast the same values to multiple observers, ' + 'but is unsubscribed explicitly and early', function() {
    var source = cold('-1-2-3----4-|');
    var sourceSubs = '^        !   ';
    var published = source.publish();
    var unsub = '         u   ';
    var subscriber1 = hot('a|           ').mergeMapTo(published);
    var expected1 = '-1-2-3----   ';
    var subscriber2 = hot('    b|       ').mergeMapTo(published);
    var expected2 = '    -3----   ';
    var subscriber3 = hot('        c|   ').mergeMapTo(published);
    var expected3 = '        --   ';
    expectObservable(subscriber1).toBe(expected1);
    expectObservable(subscriber2).toBe(expected2);
    expectObservable(subscriber3).toBe(expected3);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    var connection;
    expectObservable(hot(unsub).do(function() {
      connection.unsubscribe();
    })).toBe(unsub);
    connection = published.connect();
  });
  it('should not break unsubscription chains when result is unsubscribed explicitly', function() {
    var source = cold('-1-2-3----4-|');
    var sourceSubs = '^        !   ';
    var published = source.mergeMap(function(x) {
      return Observable.of(x);
    }).publish();
    var subscriber1 = hot('a|           ').mergeMapTo(published);
    var expected1 = '-1-2-3----   ';
    var subscriber2 = hot('    b|       ').mergeMapTo(published);
    var expected2 = '    -3----   ';
    var subscriber3 = hot('        c|   ').mergeMapTo(published);
    var expected3 = '        --   ';
    var unsub = '         u   ';
    expectObservable(subscriber1).toBe(expected1);
    expectObservable(subscriber2).toBe(expected2);
    expectObservable(subscriber3).toBe(expected3);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    var connection;
    expectObservable(hot(unsub).do(function() {
      connection.unsubscribe();
    })).toBe(unsub);
    connection = published.connect();
  });
  describe('with refCount()', function() {
    it('should connect when first subscriber subscribes', function() {
      var source = cold('-1-2-3----4-|');
      var sourceSubs = '   ^           !';
      var replayed = source.publish().refCount();
      var subscriber1 = hot('   a|           ').mergeMapTo(replayed);
      var expected1 = '   -1-2-3----4-|';
      var subscriber2 = hot('       b|       ').mergeMapTo(replayed);
      var expected2 = '       -3----4-|';
      var subscriber3 = hot('           c|   ').mergeMapTo(replayed);
      var expected3 = '           --4-|';
      expectObservable(subscriber1).toBe(expected1);
      expectObservable(subscriber2).toBe(expected2);
      expectObservable(subscriber3).toBe(expected3);
      expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    });
    it('should disconnect when last subscriber unsubscribes', function() {
      var source = cold('-1-2-3----4-|');
      var sourceSubs = '   ^        !   ';
      var replayed = source.publish().refCount();
      var subscriber1 = hot('   a|           ').mergeMapTo(replayed);
      var unsub1 = '          !     ';
      var expected1 = '   -1-2-3--     ';
      var subscriber2 = hot('       b|       ').mergeMapTo(replayed);
      var unsub2 = '            !   ';
      var expected2 = '       -3----   ';
      expectObservable(subscriber1, unsub1).toBe(expected1);
      expectObservable(subscriber2, unsub2).toBe(expected2);
      expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    });
    it('should NOT be retryable', function() {
      var source = cold('-1-2-3----4-#');
      var sourceSubs = '^           !';
      var published = source.publish().refCount().retry(3);
      var subscriber1 = hot('a|           ').mergeMapTo(published);
      var expected1 = '-1-2-3----4-#';
      var subscriber2 = hot('    b|       ').mergeMapTo(published);
      var expected2 = '    -3----4-#';
      var subscriber3 = hot('        c|   ').mergeMapTo(published);
      var expected3 = '        --4-#';
      expectObservable(subscriber1).toBe(expected1);
      expectObservable(subscriber2).toBe(expected2);
      expectObservable(subscriber3).toBe(expected3);
      expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    });
    it('should NOT be repeatable', function() {
      var source = cold('-1-2-3----4-|');
      var sourceSubs = '^           !';
      var published = source.publish().refCount().repeat(3);
      var subscriber1 = hot('a|           ').mergeMapTo(published);
      var expected1 = '-1-2-3----4-|';
      var subscriber2 = hot('    b|       ').mergeMapTo(published);
      var expected2 = '    -3----4-|';
      var subscriber3 = hot('        c|   ').mergeMapTo(published);
      var expected3 = '        --4-|';
      expectObservable(subscriber1).toBe(expected1);
      expectObservable(subscriber2).toBe(expected2);
      expectObservable(subscriber3).toBe(expected3);
      expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    });
  });
  it('should emit completed when subscribed after completed', function(done) {
    var results1 = [];
    var results2 = [];
    var subscriptions = 0;
    var source = new Observable(function(observer) {
      subscriptions++;
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.next(4);
      observer.complete();
    });
    var connectable = source.publish();
    connectable.subscribe(function(x) {
      results1.push(x);
    });
    chai_1.expect(results1).to.deep.equal([]);
    chai_1.expect(results2).to.deep.equal([]);
    connectable.connect();
    chai_1.expect(results1).to.deep.equal([1, 2, 3, 4]);
    chai_1.expect(results2).to.deep.equal([]);
    chai_1.expect(subscriptions).to.equal(1);
    connectable.subscribe(function(x) {
      results2.push(x);
    }, function(x) {
      done(new Error('should not be called'));
    }, function() {
      chai_1.expect(results2).to.deep.equal([]);
      done();
    });
  });
  it('should multicast an empty source', function() {
    var source = cold('|');
    var sourceSubs = '(^!)';
    var published = source.publish();
    var expected = '|';
    expectObservable(published).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    published.connect();
  });
  it('should multicast a never source', function() {
    var source = cold('-');
    var sourceSubs = '^';
    var published = source.publish();
    var expected = '-';
    expectObservable(published).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    published.connect();
  });
  it('should multicast a throw source', function() {
    var source = cold('#');
    var sourceSubs = '(^!)';
    var published = source.publish();
    var expected = '#';
    expectObservable(published).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    published.connect();
  });
  it('should multicast one observable to multiple observers', function(done) {
    var results1 = [];
    var results2 = [];
    var subscriptions = 0;
    var source = new Observable(function(observer) {
      subscriptions++;
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.next(4);
      observer.complete();
    });
    var connectable = source.publish();
    connectable.subscribe(function(x) {
      results1.push(x);
    });
    connectable.subscribe(function(x) {
      results2.push(x);
    });
    chai_1.expect(results1).to.deep.equal([]);
    chai_1.expect(results2).to.deep.equal([]);
    connectable.connect();
    chai_1.expect(results1).to.deep.equal([1, 2, 3, 4]);
    chai_1.expect(results2).to.deep.equal([1, 2, 3, 4]);
    chai_1.expect(subscriptions).to.equal(1);
    done();
  });
});