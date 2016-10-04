/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
describe('ConnectableObservable.prototype.refCount', function() {
  asDiagram('refCount')('should turn a multicasted Observable an automatically ' + '(dis)connecting hot one', function() {
    var source = cold('--1-2---3-4--5-|');
    var sourceSubs = '^              !';
    var expected = '--1-2---3-4--5-|';
    var result = source.publish().refCount();
    expectObservable(result).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(sourceSubs);
  });
  it('should count references', function() {
    var connectable = Observable.never().publish();
    var refCounted = connectable.refCount();
    var sub1 = refCounted.subscribe({next: function() {}});
    var sub2 = refCounted.subscribe({next: function() {}});
    var sub3 = refCounted.subscribe({next: function() {}});
    chai_1.expect(connectable._refCount).to.equal(3);
    sub1.unsubscribe();
    sub2.unsubscribe();
    sub3.unsubscribe();
  });
  it('should unsub from the source when all other subscriptions are unsubbed', function(done) {
    var unsubscribeCalled = false;
    var connectable = new Observable(function(observer) {
      observer.next(true);
      return function() {
        unsubscribeCalled = true;
      };
    }).publish();
    var refCounted = connectable.refCount();
    var sub1 = refCounted.subscribe(function() {});
    var sub2 = refCounted.subscribe(function() {});
    var sub3 = refCounted.subscribe(function(x) {
      chai_1.expect(connectable._refCount).to.equal(1);
    });
    sub1.unsubscribe();
    sub2.unsubscribe();
    sub3.unsubscribe();
    chai_1.expect(connectable._refCount).to.equal(0);
    chai_1.expect(unsubscribeCalled).to.be.true;
    done();
  });
  it('should not unsubscribe when a subscriber synchronously unsubscribes if ' + 'other subscribers are present', function() {
    var unsubscribeCalled = false;
    var connectable = new Observable(function(observer) {
      observer.next(true);
      return function() {
        unsubscribeCalled = true;
      };
    }).publishReplay(1);
    var refCounted = connectable.refCount();
    refCounted.subscribe();
    refCounted.subscribe().unsubscribe();
    chai_1.expect(connectable._refCount).to.equal(1);
    chai_1.expect(unsubscribeCalled).to.be.false;
  });
  it('should not unsubscribe when a subscriber synchronously unsubscribes if ' + 'other subscribers are present and the source is a Subject', function() {
    var arr = [];
    var subject = new Rx.Subject();
    var connectable = subject.publishReplay(1);
    var refCounted = connectable.refCount();
    refCounted.subscribe(function(val) {
      arr.push(val);
    });
    subject.next('the number one');
    refCounted.first().subscribe().unsubscribe();
    subject.next('the number two');
    chai_1.expect(connectable._refCount).to.equal(1);
    chai_1.expect(arr[0]).to.equal('the number one');
    chai_1.expect(arr[1]).to.equal('the number two');
  });
});
