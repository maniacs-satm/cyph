/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var ErrorObservable_1 = require('../../dist/cjs/observable/ErrorObservable');
var Observable = Rx.Observable;
describe('Observable.throw', function() {
  asDiagram('throw(e)')('should create a cold observable that just emits an error', function() {
    var expected = '#';
    var e1 = Observable.throw('error');
    expectObservable(e1).toBe(expected);
  });
  it('should emit one value', function(done) {
    var calls = 0;
    Observable.throw('bad').subscribe(function() {
      done(new Error('should not be called'));
    }, function(err) {
      chai_1.expect(++calls).to.equal(1);
      chai_1.expect(err).to.equal('bad');
      done();
    });
  });
  it('should create expose a error property', function() {
    var e = Observable.throw('error');
    chai_1.expect(e['error']).to.equal('error');
  });
  it('should create ErrorObservable via static create function', function() {
    var e = new ErrorObservable_1.ErrorObservable('error');
    var r = ErrorObservable_1.ErrorObservable.create('error');
    chai_1.expect(e).to.deep.equal(r);
  });
  it('should accept scheduler', function() {
    var e = Observable.throw('error', rxTestScheduler);
    expectObservable(e).toBe('#');
  });
});