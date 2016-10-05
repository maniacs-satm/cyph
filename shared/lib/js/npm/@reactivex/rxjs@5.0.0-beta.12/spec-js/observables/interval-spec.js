/* */ 
"use strict";
var chai_1 = require('chai');
var sinon = require('sinon');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
describe('Observable.interval', function() {
  asDiagram('interval(1000)')('should create an observable emitting periodically', function() {
    var e1 = Observable.interval(20, rxTestScheduler).take(6).concat(Observable.never());
    var expected = '--a-b-c-d-e-f-';
    var values = {
      a: 0,
      b: 1,
      c: 2,
      d: 3,
      e: 4,
      f: 5
    };
    expectObservable(e1).toBe(expected, values);
  });
  it('should set up an interval', function() {
    var expected = '----------0---------1---------2---------3---------4---------5---------6-----';
    expectObservable(Observable.interval(100, rxTestScheduler)).toBe(expected, [0, 1, 2, 3, 4, 5, 6]);
  });
  it('should specify default scheduler if incorrect scheduler specified', function() {
    var scheduler = Observable.interval(10, sinon.stub()).scheduler;
    chai_1.expect(scheduler).to.equal(Rx.Scheduler.async);
  });
  it('should emit when relative interval set to zero', function() {
    var e1 = Observable.interval(0, rxTestScheduler).take(7);
    var expected = '(0123456|)';
    expectObservable(e1).toBe(expected, [0, 1, 2, 3, 4, 5, 6]);
  });
  it('should consider negative interval as zero', function() {
    var e1 = Observable.interval(-1, rxTestScheduler).take(7);
    var expected = '(0123456|)';
    expectObservable(e1).toBe(expected, [0, 1, 2, 3, 4, 5, 6]);
  });
  it('should emit values until unsubscribed', function(done) {
    var values = [];
    var expected = [0, 1, 2, 3, 4, 5, 6];
    var e1 = Observable.interval(5);
    var subscription = e1.subscribe(function(x) {
      values.push(x);
      if (x === 6) {
        subscription.unsubscribe();
        chai_1.expect(values).to.deep.equal(expected);
        done();
      }
    }, function(err) {
      done(new Error('should not be called'));
    }, function() {
      done(new Error('should not be called'));
    });
  });
});