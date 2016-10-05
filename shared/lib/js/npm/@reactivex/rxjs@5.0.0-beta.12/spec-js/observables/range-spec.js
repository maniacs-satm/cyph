/* */ 
"use strict";
var chai_1 = require('chai');
var sinon = require('sinon');
var Rx = require('../../dist/cjs/Rx');
var RangeObservable_1 = require('../../dist/cjs/observable/RangeObservable');
var Observable = Rx.Observable;
var asap = Rx.Scheduler.asap;
describe('Observable.range', function() {
  asDiagram('range(1, 10)')('should create an observable with numbers 1 to 10', function() {
    var e1 = Observable.range(1, 10).concatMap(function(x, i) {
      return Observable.of(x).delay(i === 0 ? 0 : 20, rxTestScheduler);
    });
    var expected = 'a-b-c-d-e-f-g-h-i-(j|)';
    var values = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
      g: 7,
      h: 8,
      i: 9,
      j: 10
    };
    expectObservable(e1).toBe(expected, values);
  });
  it('should synchronously create a range of values by default', function() {
    var results = [];
    Observable.range(12, 4).subscribe(function(x) {
      results.push(x);
    });
    chai_1.expect(results).to.deep.equal([12, 13, 14, 15]);
  });
  it('should accept a scheduler', function(done) {
    var expected = [12, 13, 14, 15];
    sinon.spy(asap, 'schedule');
    var source = Observable.range(12, 4, asap);
    chai_1.expect(source.scheduler).to.deep.equal(asap);
    source.subscribe(function(x) {
      chai_1.expect(asap.schedule).have.been.called;
      var exp = expected.shift();
      chai_1.expect(x).to.equal(exp);
    }, function(x) {
      done(new Error('should not be called'));
    }, function() {
      asap.schedule.restore();
      done();
    });
  });
});
describe('RangeObservable', function() {
  describe('create', function() {
    it('should create a RangeObservable', function() {
      var observable = RangeObservable_1.RangeObservable.create(12, 4);
      chai_1.expect(observable instanceof RangeObservable_1.RangeObservable).to.be.true;
    });
    it('should accept a scheduler', function() {
      var observable = RangeObservable_1.RangeObservable.create(12, 4, asap);
      chai_1.expect(observable.scheduler).to.deep.equal(asap);
    });
  });
  describe('dispatch', function() {
    it('should complete if index >= count', function() {
      var o = new Rx.Subscriber();
      var obj = sinon.stub(o);
      var state = {
        subscriber: obj,
        index: 10,
        start: 0,
        count: 9
      };
      RangeObservable_1.RangeObservable.dispatch(state);
      chai_1.expect(state.subscriber.complete).have.been.called;
      chai_1.expect(state.subscriber.next).not.have.been.called;
    });
    it('should next out another value and increment the index and start', function() {
      var o = new Rx.Subscriber();
      var obj = sinon.stub(o);
      var state = {
        subscriber: obj,
        index: 1,
        start: 5,
        count: 9
      };
      var thisArg = {schedule: sinon.spy()};
      RangeObservable_1.RangeObservable.dispatch.call(thisArg, state);
      chai_1.expect(state.subscriber.complete).not.have.been.called;
      chai_1.expect(state.subscriber.next).have.been.calledWith(5);
      chai_1.expect(state.start).to.equal(6);
      chai_1.expect(state.index).to.equal(2);
      chai_1.expect(thisArg.schedule).have.been.calledWith(state);
    });
  });
});