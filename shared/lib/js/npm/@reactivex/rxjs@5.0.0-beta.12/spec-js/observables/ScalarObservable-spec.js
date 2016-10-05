/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var ScalarObservable_1 = require('../../dist/cjs/observable/ScalarObservable');
describe('ScalarObservable', function() {
  it('should create expose a value property', function() {
    var s = new ScalarObservable_1.ScalarObservable(1);
    chai_1.expect(s.value).to.equal(1);
  });
  it('should create ScalarObservable via static create function', function() {
    var s = new ScalarObservable_1.ScalarObservable(1);
    var r = ScalarObservable_1.ScalarObservable.create(1);
    chai_1.expect(s).to.deep.equal(r);
  });
  it('should not schedule further if subscriber unsubscribed', function() {
    var s = new ScalarObservable_1.ScalarObservable(1, rxTestScheduler);
    var subscriber = new Rx.Subscriber();
    s.subscribe(subscriber);
    subscriber.closed = true;
    rxTestScheduler.flush();
  });
  it('should set `_isScalar` to true when NOT called with a Scheduler', function() {
    var s = new ScalarObservable_1.ScalarObservable(1);
    chai_1.expect(s._isScalar).to.be.true;
  });
  it('should set `_isScalar` to false when called with a Scheduler', function() {
    var s = new ScalarObservable_1.ScalarObservable(1, rxTestScheduler);
    chai_1.expect(s._isScalar).to.be.false;
  });
});