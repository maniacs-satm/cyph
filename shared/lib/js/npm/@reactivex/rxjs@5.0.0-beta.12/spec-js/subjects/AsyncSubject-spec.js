/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var AsyncSubject = Rx.AsyncSubject;
var TestObserver = (function() {
  function TestObserver() {
    this.results = [];
  }
  TestObserver.prototype.next = function(value) {
    this.results.push(value);
  };
  TestObserver.prototype.error = function(err) {
    this.results.push(err);
  };
  TestObserver.prototype.complete = function() {
    this.results.push('done');
  };
  return TestObserver;
}());
describe('AsyncSubject', function() {
  it('should emit the last value when complete', function() {
    var subject = new AsyncSubject();
    var observer = new TestObserver();
    subject.subscribe(observer);
    subject.next(1);
    chai_1.expect(observer.results).to.deep.equal([]);
    subject.next(2);
    chai_1.expect(observer.results).to.deep.equal([]);
    subject.complete();
    chai_1.expect(observer.results).to.deep.equal([2, 'done']);
  });
  it('should emit the last value when subscribing after complete', function() {
    var subject = new AsyncSubject();
    var observer = new TestObserver();
    subject.next(1);
    subject.next(2);
    subject.complete();
    subject.subscribe(observer);
    chai_1.expect(observer.results).to.deep.equal([2, 'done']);
  });
  it('should keep emitting the last value to subsequent subscriptions', function() {
    var subject = new AsyncSubject();
    var observer = new TestObserver();
    var subscription = subject.subscribe(observer);
    subject.next(1);
    chai_1.expect(observer.results).to.deep.equal([]);
    subject.next(2);
    chai_1.expect(observer.results).to.deep.equal([]);
    subject.complete();
    chai_1.expect(observer.results).to.deep.equal([2, 'done']);
    subscription.unsubscribe();
    observer.results = [];
    subject.subscribe(observer);
    chai_1.expect(observer.results).to.deep.equal([2, 'done']);
  });
  it('should not emit values after complete', function() {
    var subject = new AsyncSubject();
    var observer = new TestObserver();
    subject.subscribe(observer);
    subject.next(1);
    chai_1.expect(observer.results).to.deep.equal([]);
    subject.next(2);
    chai_1.expect(observer.results).to.deep.equal([]);
    subject.complete();
    chai_1.expect(observer.results).to.deep.equal([2, 'done']);
  });
  it('should not allow change value after complete', function() {
    var subject = new AsyncSubject();
    var observer = new TestObserver();
    var otherObserver = new TestObserver();
    subject.subscribe(observer);
    subject.next(1);
    chai_1.expect(observer.results).to.deep.equal([]);
    subject.complete();
    chai_1.expect(observer.results).to.deep.equal([1, 'done']);
    subject.next(2);
    subject.subscribe(otherObserver);
    chai_1.expect(otherObserver.results).to.deep.equal([1, 'done']);
  });
  it('should not emit values if unsubscribed before complete', function() {
    var subject = new AsyncSubject();
    var observer = new TestObserver();
    var subscription = subject.subscribe(observer);
    subject.next(1);
    chai_1.expect(observer.results).to.deep.equal([]);
    subject.next(2);
    chai_1.expect(observer.results).to.deep.equal([]);
    subscription.unsubscribe();
    subject.next(3);
    chai_1.expect(observer.results).to.deep.equal([]);
    subject.complete();
    chai_1.expect(observer.results).to.deep.equal([]);
  });
  it('should just complete if no value has been nexted into it', function() {
    var subject = new AsyncSubject();
    var observer = new TestObserver();
    subject.subscribe(observer);
    chai_1.expect(observer.results).to.deep.equal([]);
    subject.complete();
    chai_1.expect(observer.results).to.deep.equal(['done']);
  });
  it('should keep emitting complete to subsequent subscriptions', function() {
    var subject = new AsyncSubject();
    var observer = new TestObserver();
    var subscription = subject.subscribe(observer);
    chai_1.expect(observer.results).to.deep.equal([]);
    subject.complete();
    chai_1.expect(observer.results).to.deep.equal(['done']);
    subscription.unsubscribe();
    observer.results = [];
    subject.subscribe(observer);
    chai_1.expect(observer.results).to.deep.equal(['done']);
  });
  it('should only error if an error is passed into it', function() {
    var expected = new Error('bad');
    var subject = new AsyncSubject();
    var observer = new TestObserver();
    subject.subscribe(observer);
    subject.next(1);
    chai_1.expect(observer.results).to.deep.equal([]);
    subject.error(expected);
    chai_1.expect(observer.results).to.deep.equal([expected]);
  });
  it('should keep emitting error to subsequent subscriptions', function() {
    var expected = new Error('bad');
    var subject = new AsyncSubject();
    var observer = new TestObserver();
    subject.subscribe(observer);
    subject.next(1);
    chai_1.expect(observer.results).to.deep.equal([]);
    subject.error(expected);
    chai_1.expect(observer.results).to.deep.equal([expected]);
    subject.unsubscribe();
    observer.results = [];
    subject.subscribe(observer);
    chai_1.expect(observer.results).to.deep.equal([expected]);
  });
});