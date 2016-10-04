/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
describe('Observable.prototype.publishReplay', function() {
  asDiagram('publishReplay(1)')('should mirror a simple source Observable', function() {
    var source = cold('--1-2---3-4--5-|');
    var sourceSubs = '^              !';
    var published = source.publishReplay(1);
    var expected = '--1-2---3-4--5-|';
    expectObservable(published).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    published.connect();
  });
  it('should return a ConnectableObservable', function() {
    var source = Observable.of(1).publishReplay();
    chai_1.expect(source instanceof Rx.ConnectableObservable).to.be.true;
  });
  it('should do nothing if connect is not called, despite subscriptions', function() {
    var source = cold('--1-2---3-4--5-|');
    var sourceSubs = [];
    var published = source.publishReplay(1);
    var expected = '-';
    expectObservable(published).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
  });
  it('should multicast the same values to multiple observers, bufferSize=1', function() {
    var source = cold('-1-2-3----4-|');
    var sourceSubs = '^           !';
    var published = source.publishReplay(1);
    var subscriber1 = hot('a|           ').mergeMapTo(published);
    var expected1 = '-1-2-3----4-|';
    var subscriber2 = hot('    b|       ').mergeMapTo(published);
    var expected2 = '    23----4-|';
    var subscriber3 = hot('        c|   ').mergeMapTo(published);
    var expected3 = '        3-4-|';
    expectObservable(subscriber1).toBe(expected1);
    expectObservable(subscriber2).toBe(expected2);
    expectObservable(subscriber3).toBe(expected3);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    published.connect();
  });
  it('should multicast the same values to multiple observers, bufferSize=2', function() {
    var source = cold('-1-2-----3------4-|');
    var sourceSubs = '^                 !';
    var published = source.publishReplay(2);
    var subscriber1 = hot('a|                 ').mergeMapTo(published);
    var expected1 = '-1-2-----3------4-|';
    var subscriber2 = hot('    b|             ').mergeMapTo(published);
    var expected2 = '    (12)-3------4-|';
    var subscriber3 = hot('           c|       ').mergeMapTo(published);
    var expected3 = '           (23)-4-|';
    expectObservable(subscriber1).toBe(expected1);
    expectObservable(subscriber2).toBe(expected2);
    expectObservable(subscriber3).toBe(expected3);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    published.connect();
  });
  it('should multicast an error from the source to multiple observers', function() {
    var source = cold('-1-2-3----4-#');
    var sourceSubs = '^           !';
    var published = source.publishReplay(1);
    var subscriber1 = hot('a|           ').mergeMapTo(published);
    var expected1 = '-1-2-3----4-#';
    var subscriber2 = hot('    b|       ').mergeMapTo(published);
    var expected2 = '    23----4-#';
    var subscriber3 = hot('        c|   ').mergeMapTo(published);
    var expected3 = '        3-4-#';
    expectObservable(subscriber1).toBe(expected1);
    expectObservable(subscriber2).toBe(expected2);
    expectObservable(subscriber3).toBe(expected3);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    published.connect();
  });
  it('should multicast the same values to multiple observers, ' + 'but is unsubscribed explicitly and early', function() {
    var source = cold('-1-2-3----4-|');
    var sourceSubs = '^        !   ';
    var published = source.publishReplay(1);
    var unsub = '         u   ';
    var subscriber1 = hot('a|           ').mergeMapTo(published);
    var expected1 = '-1-2-3----   ';
    var subscriber2 = hot('    b|       ').mergeMapTo(published);
    var expected2 = '    23----   ';
    var subscriber3 = hot('        c|   ').mergeMapTo(published);
    var expected3 = '        3-   ';
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
    }).publishReplay(1);
    var subscriber1 = hot('a|           ').mergeMapTo(published);
    var expected1 = '-1-2-3----   ';
    var subscriber2 = hot('    b|       ').mergeMapTo(published);
    var expected2 = '    23----   ';
    var subscriber3 = hot('        c|   ').mergeMapTo(published);
    var expected3 = '        3-   ';
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
      var replayed = source.publishReplay(1).refCount();
      var subscriber1 = hot('   a|           ').mergeMapTo(replayed);
      var expected1 = '   -1-2-3----4-|';
      var subscriber2 = hot('       b|       ').mergeMapTo(replayed);
      var expected2 = '       23----4-|';
      var subscriber3 = hot('           c|   ').mergeMapTo(replayed);
      var expected3 = '           3-4-|';
      expectObservable(subscriber1).toBe(expected1);
      expectObservable(subscriber2).toBe(expected2);
      expectObservable(subscriber3).toBe(expected3);
      expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    });
    it('should disconnect when last subscriber unsubscribes', function() {
      var source = cold('-1-2-3----4-|');
      var sourceSubs = '   ^        !   ';
      var replayed = source.publishReplay(1).refCount();
      var subscriber1 = hot('   a|           ').mergeMapTo(replayed);
      var unsub1 = '          !     ';
      var expected1 = '   -1-2-3--     ';
      var subscriber2 = hot('       b|       ').mergeMapTo(replayed);
      var unsub2 = '            !   ';
      var expected2 = '       23----   ';
      expectObservable(subscriber1, unsub1).toBe(expected1);
      expectObservable(subscriber2, unsub2).toBe(expected2);
      expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    });
    it('should NOT be retryable', function() {
      var source = cold('-1-2-3----4-#');
      var published = source.publishReplay(1).refCount().retry(3);
      var subscriber1 = hot('a|           ').mergeMapTo(published);
      var expected1 = '-1-2-3----4-(444#)';
      var subscriber2 = hot('    b|       ').mergeMapTo(published);
      var expected2 = '    23----4-(444#)';
      var subscriber3 = hot('        c|   ').mergeMapTo(published);
      var expected3 = '        3-4-(444#)';
      expectObservable(subscriber1).toBe(expected1);
      expectObservable(subscriber2).toBe(expected2);
      expectObservable(subscriber3).toBe(expected3);
    });
    it('should NOT be repeatable', function() {
      var source = cold('-1-2-3----4-|');
      var published = source.publishReplay(1).refCount().repeat(3);
      var subscriber1 = hot('a|           ').mergeMapTo(published);
      var expected1 = '-1-2-3----4-(44|)';
      var subscriber2 = hot('    b|       ').mergeMapTo(published);
      var expected2 = '    23----4-(44|)';
      var subscriber3 = hot('        c|   ').mergeMapTo(published);
      var expected3 = '        3-4-(44|)';
      expectObservable(subscriber1).toBe(expected1);
      expectObservable(subscriber2).toBe(expected2);
      expectObservable(subscriber3).toBe(expected3);
    });
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
    var connectable = source.publishReplay();
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
  it('should replay as many events as specified by the bufferSize', function(done) {
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
    var connectable = source.publishReplay(2);
    connectable.subscribe(function(x) {
      results1.push(x);
    });
    chai_1.expect(results1).to.deep.equal([]);
    chai_1.expect(results2).to.deep.equal([]);
    connectable.connect();
    connectable.subscribe(function(x) {
      results2.push(x);
    });
    chai_1.expect(results1).to.deep.equal([1, 2, 3, 4]);
    chai_1.expect(results2).to.deep.equal([3, 4]);
    chai_1.expect(subscriptions).to.equal(1);
    done();
  });
  it('should emit replayed values and resubscribe to the source when ' + 'reconnected without source completion', function() {
    var results1 = [];
    var results2 = [];
    var subscriptions = 0;
    var source = new Observable(function(observer) {
      subscriptions++;
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.next(4);
    });
    var connectable = source.publishReplay(2);
    var subscription1 = connectable.subscribe(function(x) {
      results1.push(x);
    });
    chai_1.expect(results1).to.deep.equal([]);
    chai_1.expect(results2).to.deep.equal([]);
    connectable.connect().unsubscribe();
    subscription1.unsubscribe();
    chai_1.expect(results1).to.deep.equal([1, 2, 3, 4]);
    chai_1.expect(results2).to.deep.equal([]);
    chai_1.expect(subscriptions).to.equal(1);
    var subscription2 = connectable.subscribe(function(x) {
      results2.push(x);
    });
    connectable.connect().unsubscribe();
    subscription2.unsubscribe();
    chai_1.expect(results1).to.deep.equal([1, 2, 3, 4]);
    chai_1.expect(results2).to.deep.equal([3, 4, 1, 2, 3, 4]);
    chai_1.expect(subscriptions).to.equal(2);
  });
  it('should emit replayed values plus completed when subscribed after completed', function(done) {
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
    var connectable = source.publishReplay(2);
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
      chai_1.expect(results2).to.deep.equal([3, 4]);
      done();
    });
  });
  it('should multicast an empty source', function() {
    var source = cold('|');
    var sourceSubs = '(^!)';
    var published = source.publishReplay(1);
    var expected = '|';
    expectObservable(published).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    published.connect();
  });
  it('should multicast a never source', function() {
    var source = cold('-');
    var sourceSubs = '^';
    var published = source.publishReplay(1);
    var expected = '-';
    expectObservable(published).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    published.connect();
  });
  it('should multicast a throw source', function() {
    var source = cold('#');
    var sourceSubs = '(^!)';
    var published = source.publishReplay(1);
    var expected = '#';
    expectObservable(published).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
    published.connect();
  });
});
