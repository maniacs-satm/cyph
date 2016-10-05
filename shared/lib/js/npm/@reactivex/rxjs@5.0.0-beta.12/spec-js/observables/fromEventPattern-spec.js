/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
describe('Observable.fromEventPattern', function() {
  asDiagram('fromEventPattern(addHandler, removeHandler)')('should create an observable from the handler API', function() {
    function addHandler(h) {
      Observable.timer(50, 20, rxTestScheduler).mapTo('ev').take(2).concat(Observable.never()).subscribe(h);
    }
    var e1 = Observable.fromEventPattern(addHandler, function() {
      return void 0;
    });
    var expected = '-----x-x---';
    expectObservable(e1).toBe(expected, {x: 'ev'});
  });
  it('should call addHandler on subscription', function() {
    var addHandlerCalledWith;
    var addHandler = function(h) {
      addHandlerCalledWith = h;
    };
    var removeHandler = function() {};
    Observable.fromEventPattern(addHandler, removeHandler).subscribe(function() {});
    chai_1.expect(addHandlerCalledWith).to.be.a('function');
  });
  it('should call removeHandler on unsubscription', function() {
    var removeHandlerCalledWith;
    var addHandler = function() {};
    var removeHandler = function(h) {
      removeHandlerCalledWith = h;
    };
    var subscription = Observable.fromEventPattern(addHandler, removeHandler).subscribe(function() {});
    subscription.unsubscribe();
    chai_1.expect(removeHandlerCalledWith).to.be.a('function');
  });
  it('should send errors in addHandler down the error path', function() {
    Observable.fromEventPattern(function(h) {
      throw 'bad';
    }, function() {}).subscribe(function() {}, function(err) {
      chai_1.expect(err).to.equal('bad');
    });
  });
  it('should accept a selector that maps outgoing values', function(done) {
    var target;
    var trigger = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
      }
      if (target) {
        target.apply(null, arguments);
      }
    };
    var addHandler = function(handler) {
      target = handler;
    };
    var removeHandler = function(handler) {
      target = null;
    };
    var selector = function(a, b) {
      return a + b + '!';
    };
    Observable.fromEventPattern(addHandler, removeHandler, selector).take(1).subscribe(function(x) {
      chai_1.expect(x).to.equal('testme!');
    }, function(err) {
      done(new Error('should not be called'));
    }, function() {
      done();
    });
    trigger('test', 'me');
  });
  it('should send errors in the selector down the error path', function(done) {
    var target;
    var trigger = function(value) {
      if (target) {
        target(value);
      }
    };
    var addHandler = function(handler) {
      target = handler;
    };
    var removeHandler = function(handler) {
      target = null;
    };
    var selector = function(x) {
      throw 'bad';
    };
    Observable.fromEventPattern(addHandler, removeHandler, selector).subscribe(function(x) {
      done(new Error('should not be called'));
    }, function(err) {
      chai_1.expect(err).to.equal('bad');
      done();
    }, function() {
      done(new Error('should not be called'));
    });
    trigger('test');
  });
});