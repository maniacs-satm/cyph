/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var ArrayObservable_1 = require('../../dist/cjs/observable/ArrayObservable');
var ScalarObservable_1 = require('../../dist/cjs/observable/ScalarObservable');
var EmptyObservable_1 = require('../../dist/cjs/observable/EmptyObservable');
var Observable = Rx.Observable;
describe('Observable.of', function() {
  asDiagram('of(1, 2, 3)')('should create a cold observable that emits 1, 2, 3', function() {
    var e1 = Observable.of(1, 2, 3).concatMap(function(x, i) {
      return Observable.of(x).delay(i === 0 ? 0 : 20, rxTestScheduler);
    });
    var expected = 'x-y-(z|)';
    expectObservable(e1).toBe(expected, {
      x: 1,
      y: 2,
      z: 3
    });
  });
  it('should create an observable from the provided values', function(done) {
    var x = {foo: 'bar'};
    var expected = [1, 'a', x];
    var i = 0;
    Observable.of(1, 'a', x).subscribe(function(y) {
      chai_1.expect(y).to.equal(expected[i++]);
    }, function(x) {
      done(new Error('should not be called'));
    }, function() {
      done();
    });
  });
  it('should return a scalar observable if only passed one value', function() {
    var obs = Observable.of('one');
    chai_1.expect(obs instanceof ScalarObservable_1.ScalarObservable).to.be.true;
  });
  it('should return a scalar observable if only passed one value and a scheduler', function() {
    var obs = Observable.of('one', Rx.Scheduler.queue);
    chai_1.expect(obs instanceof ScalarObservable_1.ScalarObservable).to.be.true;
  });
  it('should return an array observable if passed many values', function() {
    var obs = Observable.of('one', 'two', 'three');
    chai_1.expect(obs instanceof ArrayObservable_1.ArrayObservable).to.be.true;
  });
  it('should return an empty observable if passed no values', function() {
    var obs = Observable.of();
    chai_1.expect(obs instanceof EmptyObservable_1.EmptyObservable).to.be.true;
  });
  it('should return an empty observable if passed only a scheduler', function() {
    var obs = Observable.of(Rx.Scheduler.queue);
    chai_1.expect(obs instanceof EmptyObservable_1.EmptyObservable).to.be.true;
  });
  it('should emit one value', function(done) {
    var calls = 0;
    Observable.of(42).subscribe(function(x) {
      chai_1.expect(++calls).to.equal(1);
      chai_1.expect(x).to.equal(42);
    }, function(err) {
      done(new Error('should not be called'));
    }, function() {
      done();
    });
  });
  it('should handle an Observable as the only value', function() {
    var source = Observable.of(Observable.of('a', 'b', 'c', rxTestScheduler), rxTestScheduler);
    chai_1.expect(source instanceof ScalarObservable_1.ScalarObservable).to.be.true;
    var result = source.concatAll();
    expectObservable(result).toBe('(abc|)');
  });
  it('should handle many Observable as the given values', function() {
    var source = Observable.of(Observable.of('a', 'b', 'c', rxTestScheduler), Observable.of('d', 'e', 'f', rxTestScheduler), rxTestScheduler);
    chai_1.expect(source instanceof ArrayObservable_1.ArrayObservable).to.be.true;
    var result = source.concatAll();
    expectObservable(result).toBe('(abcdef|)');
  });
});