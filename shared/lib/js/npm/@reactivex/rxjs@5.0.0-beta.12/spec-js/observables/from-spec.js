/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
describe('Observable.from', function() {
  asDiagram('from([10, 20, 30])')('should create an observable from an array', function() {
    var e1 = Observable.from([10, 20, 30]).concatMap(function(x, i) {
      return Observable.of(x).delay(i === 0 ? 0 : 20, rxTestScheduler);
    });
    var expected = 'x-y-(z|)';
    expectObservable(e1).toBe(expected, {
      x: 10,
      y: 20,
      z: 30
    });
  });
  it('should throw for non observable object', function() {
    var r = function() {
      Observable.from({}).subscribe();
    };
    chai_1.expect(r).to.throw();
  });
  it('should return T for ObservableLike objects', function() {
    type(function() {
      var o1 = Observable.from([], Rx.Scheduler.asap);
      var o2 = Observable.from(Observable.empty());
      var o3 = Observable.from(new Promise(function(resolve) {
        return resolve();
      }));
    });
  });
  it('should return T for arrays', function() {
    type(function() {
      var o1 = Observable.from([], Rx.Scheduler.asap);
    });
  });
  var fakervable = function() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      values[_i - 0] = arguments[_i];
    }
    return ((_a = {}, _a[Symbol.observable] = function() {
      return ({subscribe: function(observer) {
          for (var _i = 0,
              values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            observer.next(value);
          }
          observer.complete();
        }});
    }, _a));
    var _a;
  };
  var fakerator = function() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      values[_i - 0] = arguments[_i];
    }
    return ((_a = {}, _a[Symbol.iterator] = function() {
      var clone = values.slice();
      return {next: function() {
          return ({
            done: clone.length <= 0,
            value: clone.shift()
          });
        }};
    }, _a));
    var _a;
  };
  var sources = [{
    name: 'observable',
    value: Observable.of('x')
  }, {
    name: 'observable-like',
    value: fakervable('x')
  }, {
    name: 'array',
    value: ['x']
  }, {
    name: 'promise',
    value: Promise.resolve('x')
  }, {
    name: 'iterator',
    value: fakerator('x')
  }, {
    name: 'array-like',
    value: (_a = {}, _a[0] = 'x', _a.length = 1, _a)
  }, {
    name: 'string',
    value: 'x'
  }, {
    name: 'arguments',
    value: function(x) {
      return arguments;
    }('x')
  }];
  var _loop_1 = function(source) {
    it("should accept " + source.name, function(done) {
      var nextInvoked = false;
      Observable.from(source.value).subscribe(function(x) {
        nextInvoked = true;
        chai_1.expect(x).to.equal('x');
      }, function(x) {
        done(new Error('should not be called'));
      }, function() {
        chai_1.expect(nextInvoked).to.equal(true);
        done();
      });
    });
    it("should accept " + source.name + " and scheduler", function(done) {
      var nextInvoked = false;
      Observable.from(source.value, Rx.Scheduler.async).subscribe(function(x) {
        nextInvoked = true;
        chai_1.expect(x).to.equal('x');
      }, function(x) {
        done(new Error('should not be called'));
      }, function() {
        chai_1.expect(nextInvoked).to.equal(true);
        done();
      });
      chai_1.expect(nextInvoked).to.equal(false);
    });
  };
  for (var _i = 0,
      sources_1 = sources; _i < sources_1.length; _i++) {
    var source = sources_1[_i];
    _loop_1(source);
  }
  var _a;
});