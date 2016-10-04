/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
describe('Observable.fromEvent', function() {
  asDiagram('fromEvent(element, \'click\')')('should create an observable of click on the element', function() {
    var target = {
      addEventListener: function(eventType, listener) {
        Observable.timer(50, 20, rxTestScheduler).mapTo('ev').take(2).concat(Observable.never()).subscribe(listener);
      },
      removeEventListener: function() {
        return void 0;
      },
      dispatchEvent: function() {
        return void 0;
      }
    };
    var e1 = Observable.fromEvent(target, 'click');
    var expected = '-----x-x---';
    expectObservable(e1).toBe(expected, {x: 'ev'});
  });
  it('should setup an event observable on objects with "on" and "off" ', function() {
    var onEventName;
    var onHandler;
    var offEventName;
    var offHandler;
    var obj = {
      on: function(a, b) {
        onEventName = a;
        onHandler = b;
      },
      off: function(a, b) {
        offEventName = a;
        offHandler = b;
      }
    };
    var subscription = Observable.fromEvent(obj, 'click').subscribe(function() {});
    subscription.unsubscribe();
    chai_1.expect(onEventName).to.equal('click');
    chai_1.expect(typeof onHandler).to.equal('function');
    chai_1.expect(offEventName).to.equal(onEventName);
    chai_1.expect(offHandler).to.equal(onHandler);
  });
  it('should setup an event observable on objects with "addEventListener" and "removeEventListener" ', function() {
    var onEventName;
    var onHandler;
    var offEventName;
    var offHandler;
    var obj = {
      addEventListener: function(a, b, useCapture) {
        onEventName = a;
        onHandler = b;
      },
      removeEventListener: function(a, b, useCapture) {
        offEventName = a;
        offHandler = b;
      }
    };
    var subscription = Observable.fromEvent(obj, 'click').subscribe(function() {});
    subscription.unsubscribe();
    chai_1.expect(onEventName).to.equal('click');
    chai_1.expect(typeof onHandler).to.equal('function');
    chai_1.expect(offEventName).to.equal(onEventName);
    chai_1.expect(offHandler).to.equal(onHandler);
  });
  it('should setup an event observable on objects with "addListener" and "removeListener" ', function() {
    var onEventName;
    var onHandler;
    var offEventName;
    var offHandler;
    var obj = {
      addListener: function(a, b) {
        onEventName = a;
        onHandler = b;
      },
      removeListener: function(a, b) {
        offEventName = a;
        offHandler = b;
      }
    };
    var subscription = Observable.fromEvent(obj, 'click').subscribe(function() {});
    subscription.unsubscribe();
    chai_1.expect(onEventName).to.equal('click');
    chai_1.expect(typeof onHandler).to.equal('function');
    chai_1.expect(offEventName).to.equal(onEventName);
    chai_1.expect(offHandler).to.equal(onHandler);
  });
  it('should pass through options to addEventListener', function() {
    var actualOptions;
    var expectedOptions = {
      capture: true,
      passive: true
    };
    var obj = {
      addEventListener: function(a, b, c) {
        actualOptions = c;
      },
      removeEventListener: function(a, b, c) {}
    };
    var subscription = Observable.fromEvent(obj, 'click', expectedOptions).subscribe(function() {});
    subscription.unsubscribe();
    chai_1.expect(actualOptions).to.equal(expectedOptions);
  });
  it('should pass through events that occur', function(done) {
    var send;
    var obj = {
      on: function(name, handler) {
        send = handler;
      },
      off: function() {}
    };
    Observable.fromEvent(obj, 'click').take(1).subscribe(function(e) {
      chai_1.expect(e).to.equal('test');
    }, function(err) {
      done(new Error('should not be called'));
    }, function() {
      done();
    });
    send('test');
  });
  it('should pass through events that occur and use the selector if provided', function(done) {
    var send;
    var obj = {
      on: function(name, handler) {
        send = handler;
      },
      off: function() {}
    };
    function selector(x) {
      return x + '!';
    }
    Observable.fromEvent(obj, 'click', selector).take(1).subscribe(function(e) {
      chai_1.expect(e).to.equal('test!');
    }, function(err) {
      done(new Error('should not be called'));
    }, function() {
      done();
    });
    send('test');
  });
  it('should not fail if no event arguments are passed and the selector does not return', function(done) {
    var send;
    var obj = {
      on: function(name, handler) {
        send = handler;
      },
      off: function() {}
    };
    function selector() {}
    Observable.fromEvent(obj, 'click', selector).take(1).subscribe(function(e) {
      chai_1.expect(e).not.exist;
    }, function(err) {
      done(new Error('should not be called'));
    }, function() {
      done();
    });
    send();
  });
  it('should return a value from the selector if no event arguments are passed', function(done) {
    var send;
    var obj = {
      on: function(name, handler) {
        send = handler;
      },
      off: function() {}
    };
    function selector() {
      return 'no arguments';
    }
    Observable.fromEvent(obj, 'click', selector).take(1).subscribe(function(e) {
      chai_1.expect(e).to.equal('no arguments');
    }, function(err) {
      done(new Error('should not be called'));
    }, function() {
      done();
    });
    send();
  });
  it('should pass multiple arguments to selector from event emitter', function(done) {
    var send;
    var obj = {
      on: function(name, handler) {
        send = handler;
      },
      off: function() {}
    };
    function selector(x, y, z) {
      return [].slice.call(arguments);
    }
    Observable.fromEvent(obj, 'click', selector).take(1).subscribe(function(e) {
      chai_1.expect(e).to.deep.equal([1, 2, 3]);
    }, function(err) {
      done(new Error('should not be called'));
    }, function() {
      done();
    });
    send(1, 2, 3);
  });
});
