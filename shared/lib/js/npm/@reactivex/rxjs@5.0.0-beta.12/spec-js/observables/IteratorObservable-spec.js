/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var IteratorObservable_1 = require('../../dist/cjs/observable/IteratorObservable');
describe('IteratorObservable', function() {
  it('should create an Observable via constructor', function() {
    var source = new IteratorObservable_1.IteratorObservable([]);
    chai_1.expect(source instanceof IteratorObservable_1.IteratorObservable).to.be.true;
  });
  it('should create IteratorObservable via static create function', function() {
    var s = new IteratorObservable_1.IteratorObservable([]);
    var r = IteratorObservable_1.IteratorObservable.create([]);
    chai_1.expect(s).to.deep.equal(r);
  });
  it('should not accept null (or truthy-equivalent to null) iterator', function() {
    chai_1.expect(function() {
      IteratorObservable_1.IteratorObservable.create(null);
    }).to.throw(Error, 'iterator cannot be null.');
    chai_1.expect(function() {
      IteratorObservable_1.IteratorObservable.create(void 0);
    }).to.throw(Error, 'iterator cannot be null.');
  });
  it('should not accept boolean as iterator', function() {
    chai_1.expect(function() {
      IteratorObservable_1.IteratorObservable.create(false);
    }).to.throw(Error, 'object is not iterable');
  });
  it('should emit members of an array iterator', function(done) {
    var expected = [10, 20, 30, 40];
    IteratorObservable_1.IteratorObservable.create([10, 20, 30, 40]).subscribe(function(x) {
      chai_1.expect(x).to.equal(expected.shift());
    }, function(x) {
      done(new Error('should not be called'));
    }, function() {
      chai_1.expect(expected.length).to.equal(0);
      done();
    });
  });
  it('should emit members of an array iterator on a particular scheduler', function() {
    var source = IteratorObservable_1.IteratorObservable.create([10, 20, 30, 40], rxTestScheduler);
    var values = {
      a: 10,
      b: 20,
      c: 30,
      d: 40
    };
    expectObservable(source).toBe('(abcd|)', values);
  });
  it('should emit members of an array iterator on a particular scheduler, ' + 'but is unsubscribed early', function(done) {
    var expected = [10, 20, 30, 40];
    var source = IteratorObservable_1.IteratorObservable.create([10, 20, 30, 40], Rx.Scheduler.queue);
    var subscriber = Rx.Subscriber.create(function(x) {
      chai_1.expect(x).to.equal(expected.shift());
      if (x === 30) {
        subscriber.unsubscribe();
        done();
      }
    }, function(x) {
      done(new Error('should not be called'));
    }, function() {
      done(new Error('should not be called'));
    });
    source.subscribe(subscriber);
  });
  it('should emit characters of a string iterator', function(done) {
    var expected = ['f', 'o', 'o'];
    IteratorObservable_1.IteratorObservable.create('foo').subscribe(function(x) {
      chai_1.expect(x).to.equal(expected.shift());
    }, function(x) {
      done(new Error('should not be called'));
    }, function() {
      chai_1.expect(expected.length).to.equal(0);
      done();
    });
  });
  it('should be possible to unsubscribe in the middle of the iteration', function(done) {
    var expected = [10, 20, 30];
    var subscriber = Rx.Subscriber.create(function(x) {
      chai_1.expect(x).to.equal(expected.shift());
      if (x === 30) {
        subscriber.unsubscribe();
        done();
      }
    }, function(x) {
      done(new Error('should not be called'));
    }, function() {
      done(new Error('should not be called'));
    });
    IteratorObservable_1.IteratorObservable.create([10, 20, 30, 40, 50, 60]).subscribe(subscriber);
  });
});
