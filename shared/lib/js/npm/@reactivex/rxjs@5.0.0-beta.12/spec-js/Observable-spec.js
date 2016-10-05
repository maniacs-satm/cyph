/* */ 
"use strict";
var __extends = (this && this.__extends) || function(d, b) {
  for (var p in b)
    if (b.hasOwnProperty(p))
      d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var chai_1 = require('chai');
var Rx = require('../dist/cjs/Rx');
var Subscriber = Rx.Subscriber;
var Observable = Rx.Observable;
function expectFullObserver(val) {
  chai_1.expect(val).to.be.a('object');
  chai_1.expect(val.next).to.be.a('function');
  chai_1.expect(val.error).to.be.a('function');
  chai_1.expect(val.complete).to.be.a('function');
  chai_1.expect(val.closed).to.be.a('boolean');
}
describe('Observable', function() {
  it('should be constructed with a subscriber function', function(done) {
    var source = new Observable(function(observer) {
      expectFullObserver(observer);
      observer.next(1);
      observer.complete();
    });
    source.subscribe(function(x) {
      chai_1.expect(x).to.equal(1);
    }, null, done);
  });
  describe('forEach', function() {
    it('should iterate and return a Promise', function(done) {
      var expected = [1, 2, 3];
      var result = Observable.of(1, 2, 3).forEach(function(x) {
        chai_1.expect(x).to.equal(expected.shift());
      }, Promise).then(function() {
        done();
      });
      chai_1.expect(result.then).to.be.a('function');
    });
    it('should reject promise when in error', function(done) {
      Observable.throw('bad').forEach(function(x) {
        done(new Error('should not be called'));
      }, Promise).then(function() {
        done(new Error('should not complete'));
      }, function(err) {
        chai_1.expect(err).to.equal('bad');
        done();
      });
    });
    it('should allow Promise to be globally configured', function(done) {
      var wasCalled = false;
      __root__.Rx = {};
      __root__.Rx.config = {};
      __root__.Rx.config.Promise = function MyPromise(callback) {
        wasCalled = true;
        return new Promise(callback);
      };
      Observable.of(42).forEach(function(x) {
        chai_1.expect(x).to.equal(42);
      }).then(function() {
        chai_1.expect(wasCalled).to.be.true;
        delete __root__.Rx;
        done();
      });
    });
    it('should reject promise if nextHandler throws', function(done) {
      var results = [];
      Observable.of(1, 2, 3).forEach(function(x) {
        if (x === 3) {
          throw new Error('NO THREES!');
        }
        results.push(x);
      }, Promise).then(function() {
        done(new Error('should not be called'));
      }, function(err) {
        chai_1.expect(err).to.be.an('error', 'NO THREES!');
        chai_1.expect(results).to.deep.equal([1, 2]);
      }).then(function() {
        done();
      });
    });
    it('should handle a synchronous throw from the next handler and tear down', function(done) {
      var expected = new Error('I told, you Bobby Boucher, twos are the debil!');
      var unsubscribeCalled = false;
      var syncObservable = new Observable(function(observer) {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        return function() {
          unsubscribeCalled = true;
        };
      });
      var results = [];
      syncObservable.forEach(function(x) {
        results.push(x);
        if (x === 2) {
          throw expected;
        }
      }).then(function() {
        done(new Error('should not be called'));
      }, function(err) {
        results.push(err);
        chai_1.expect(results).to.deep.equal([1, 2, expected]);
        chai_1.expect(unsubscribeCalled).to.be.true;
        done();
      });
    });
    it('should handle an asynchronous throw from the next handler and tear down', function(done) {
      var expected = new Error('I told, you Bobby Boucher, twos are the debil!');
      var unsubscribeCalled = false;
      var syncObservable = new Observable(function(observer) {
        var i = 1;
        var id = setInterval(function() {
          return observer.next(i++);
        }, 1);
        return function() {
          clearInterval(id);
          unsubscribeCalled = true;
        };
      });
      var results = [];
      syncObservable.forEach(function(x) {
        results.push(x);
        if (x === 2) {
          throw expected;
        }
      }).then(function() {
        done(new Error('should not be called'));
      }, function(err) {
        results.push(err);
        chai_1.expect(results).to.deep.equal([1, 2, expected]);
        chai_1.expect(unsubscribeCalled).to.be.true;
        done();
      });
    });
  });
  describe('subscribe', function() {
    it('should be synchronous', function() {
      var subscribed = false;
      var nexted;
      var completed;
      var source = new Observable(function(observer) {
        subscribed = true;
        observer.next('wee');
        chai_1.expect(nexted).to.equal('wee');
        observer.complete();
        chai_1.expect(completed).to.be.true;
      });
      chai_1.expect(subscribed).to.be.false;
      var mutatedByNext = false;
      var mutatedByComplete = false;
      source.subscribe(function(x) {
        nexted = x;
        mutatedByNext = true;
      }, null, function() {
        completed = true;
        mutatedByComplete = true;
      });
      chai_1.expect(mutatedByNext).to.be.true;
      chai_1.expect(mutatedByComplete).to.be.true;
    });
    it('should work when subscribe is called with no arguments', function() {
      var source = new Observable(function(subscriber) {
        subscriber.next('foo');
        subscriber.complete();
      });
      source.subscribe();
    });
    it('should return a Subscription that calls the unsubscribe function returned by the subscriber', function() {
      var unsubscribeCalled = false;
      var source = new Observable(function() {
        return function() {
          unsubscribeCalled = true;
        };
      });
      var sub = source.subscribe(function() {});
      chai_1.expect(sub instanceof Rx.Subscription).to.be.true;
      chai_1.expect(unsubscribeCalled).to.be.false;
      chai_1.expect(sub.unsubscribe).to.be.a('function');
      sub.unsubscribe();
      chai_1.expect(unsubscribeCalled).to.be.true;
    });
    it('should run unsubscription logic when an error is thrown sending messages synchronously', function() {
      var messageError = false;
      var messageErrorValue = false;
      var unsubscribeCalled = false;
      var sub;
      var source = new Observable(function(observer) {
        observer.next('boo!');
        return function() {
          unsubscribeCalled = true;
        };
      });
      try {
        sub = source.subscribe(function(x) {
          throw x;
        });
      } catch (e) {
        messageError = true;
        messageErrorValue = e;
      }
      chai_1.expect(sub).to.be.a('undefined');
      chai_1.expect(unsubscribeCalled).to.be.true;
      chai_1.expect(messageError).to.be.true;
      chai_1.expect(messageErrorValue).to.equal('boo!');
    });
    it('should dispose of the subscriber when an error is thrown sending messages synchronously', function() {
      var messageError = false;
      var messageErrorValue = false;
      var unsubscribeCalled = false;
      var sub;
      var subscriber = new Subscriber(function(x) {
        throw x;
      });
      var source = new Observable(function(observer) {
        observer.next('boo!');
        return function() {
          unsubscribeCalled = true;
        };
      });
      try {
        sub = source.subscribe(subscriber);
      } catch (e) {
        messageError = true;
        messageErrorValue = e;
      }
      chai_1.expect(sub).to.be.a('undefined');
      chai_1.expect(subscriber.closed).to.be.true;
      chai_1.expect(unsubscribeCalled).to.be.true;
      chai_1.expect(messageError).to.be.true;
      chai_1.expect(messageErrorValue).to.equal('boo!');
    });
    it('should ignore next messages after unsubscription', function() {
      var times = 0;
      new Observable(function(observer) {
        observer.next(0);
        observer.next(0);
        observer.next(0);
        observer.next(0);
      }).do(function() {
        return times += 1;
      }).subscribe(function() {
        if (times === 2) {
          this.unsubscribe();
        }
      });
      chai_1.expect(times).to.equal(2);
    });
    it('should ignore error messages after unsubscription', function() {
      var times = 0;
      var errorCalled = false;
      new Observable(function(observer) {
        observer.next(0);
        observer.next(0);
        observer.next(0);
        observer.error(0);
      }).do(function() {
        return times += 1;
      }).subscribe(function() {
        if (times === 2) {
          this.unsubscribe();
        }
      }, function() {
        errorCalled = true;
      });
      chai_1.expect(times).to.equal(2);
      chai_1.expect(errorCalled).to.be.false;
    });
    it('should ignore complete messages after unsubscription', function() {
      var times = 0;
      var completeCalled = false;
      new Observable(function(observer) {
        observer.next(0);
        observer.next(0);
        observer.next(0);
        observer.complete();
      }).do(function() {
        return times += 1;
      }).subscribe(function() {
        if (times === 2) {
          this.unsubscribe();
        }
      }, null, function() {
        completeCalled = true;
      });
      chai_1.expect(times).to.equal(2);
      chai_1.expect(completeCalled).to.be.false;
    });
    describe('when called with an anonymous observer', function() {
      it('should accept an anonymous observer with just a next function and call the next function in the context' + ' of the anonymous observer', function(done) {
        var o = {next: function next(x) {
            chai_1.expect(this).to.equal(o);
            chai_1.expect(x).to.equal(1);
            done();
          }};
        Observable.of(1).subscribe(o);
      });
      it('should accept an anonymous observer with just an error function and call the error function in the context' + ' of the anonymous observer', function(done) {
        var o = {error: function error(err) {
            chai_1.expect(this).to.equal(o);
            chai_1.expect(err).to.equal('bad');
            done();
          }};
        Observable.throw('bad').subscribe(o);
      });
      it('should accept an anonymous observer with just a complete function and call the complete function in the' + ' context of the anonymous observer', function(done) {
        var o = {complete: function complete() {
            chai_1.expect(this).to.equal(o);
            done();
          }};
        Observable.empty().subscribe(o);
      });
      it('should accept an anonymous observer with no functions at all', function() {
        chai_1.expect(function() {
          Observable.empty().subscribe({});
        }).not.to.throw();
      });
      it('should run unsubscription logic when an error is thrown sending messages synchronously to an' + ' anonymous observer', function() {
        var messageError = false;
        var messageErrorValue = false;
        var unsubscribeCalled = false;
        var o = {next: function next(x) {
            chai_1.expect(this).to.equal(o);
            throw x;
          }};
        var sub;
        var source = new Observable(function(observer) {
          observer.next('boo!');
          return function() {
            unsubscribeCalled = true;
          };
        });
        try {
          sub = source.subscribe(o);
        } catch (e) {
          messageError = true;
          messageErrorValue = e;
        }
        chai_1.expect(sub).to.be.a('undefined');
        chai_1.expect(unsubscribeCalled).to.be.true;
        chai_1.expect(messageError).to.be.true;
        chai_1.expect(messageErrorValue).to.equal('boo!');
      });
      it('should ignore next messages after unsubscription', function() {
        var times = 0;
        new Observable(function(observer) {
          observer.next(0);
          observer.next(0);
          observer.next(0);
          observer.next(0);
        }).do(function() {
          return times += 1;
        }).subscribe({next: function() {
            if (times === 2) {
              this.unsubscribe();
            }
          }});
        chai_1.expect(times).to.equal(2);
      });
      it('should ignore error messages after unsubscription', function() {
        var times = 0;
        var errorCalled = false;
        new Observable(function(observer) {
          observer.next(0);
          observer.next(0);
          observer.next(0);
          observer.error(0);
        }).do(function() {
          return times += 1;
        }).subscribe({
          next: function() {
            if (times === 2) {
              this.unsubscribe();
            }
          },
          error: function() {
            errorCalled = true;
          }
        });
        chai_1.expect(times).to.equal(2);
        chai_1.expect(errorCalled).to.be.false;
      });
      it('should ignore complete messages after unsubscription', function() {
        var times = 0;
        var completeCalled = false;
        new Observable(function(observer) {
          observer.next(0);
          observer.next(0);
          observer.next(0);
          observer.complete();
        }).do(function() {
          return times += 1;
        }).subscribe({
          next: function() {
            if (times === 2) {
              this.unsubscribe();
            }
          },
          complete: function() {
            completeCalled = true;
          }
        });
        chai_1.expect(times).to.equal(2);
        chai_1.expect(completeCalled).to.be.false;
      });
    });
  });
});
describe('Observable.create', function() {
  asDiagram('create(obs => { obs.next(1); })')('should create a cold observable that emits just 1', function() {
    var e1 = Observable.create(function(obs) {
      obs.next(1);
    });
    var expected = 'x';
    expectObservable(e1).toBe(expected, {x: 1});
  });
  it('should create an Observable', function() {
    var result = Observable.create(function() {});
    chai_1.expect(result instanceof Observable).to.be.true;
  });
  it('should provide an observer to the function', function() {
    var called = false;
    var result = Observable.create(function(observer) {
      called = true;
      expectFullObserver(observer);
      observer.complete();
    });
    chai_1.expect(called).to.be.false;
    result.subscribe(function() {});
    chai_1.expect(called).to.be.true;
  });
});
describe('Observable.lift', function() {
  it('should be overrideable in a custom Observable type that composes', function(done) {
    var MyCustomObservable = (function(_super) {
      __extends(MyCustomObservable, _super);
      function MyCustomObservable() {
        _super.apply(this, arguments);
      }
      MyCustomObservable.prototype.lift = function(operator) {
        var observable = new MyCustomObservable();
        observable.source = this;
        observable.operator = operator;
        return observable;
      };
      return MyCustomObservable;
    }(Rx.Observable));
    var result = new MyCustomObservable(function(observer) {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    }).map(function(x) {
      return 10 * x;
    });
    chai_1.expect(result instanceof MyCustomObservable).to.be.true;
    var expected = [10, 20, 30];
    result.subscribe(function(x) {
      chai_1.expect(x).to.equal(expected.shift());
    }, function(x) {
      done(new Error('should not be called'));
    }, function() {
      done();
    });
  });
  it('should allow injecting behaviors into all subscribers in an operator ' + 'chain when overridden', function(done) {
    var log = [];
    var LogSubscriber = (function(_super) {
      __extends(LogSubscriber, _super);
      function LogSubscriber() {
        _super.apply(this, arguments);
      }
      LogSubscriber.prototype.next = function(value) {
        log.push('next ' + value);
        if (!this.isStopped) {
          this._next(value);
        }
      };
      return LogSubscriber;
    }(Rx.Subscriber));
    var LogOperator = (function() {
      function LogOperator(childOperator) {
        this.childOperator = childOperator;
      }
      LogOperator.prototype.call = function(subscriber, source) {
        return this.childOperator.call(new LogSubscriber(subscriber), source);
      };
      return LogOperator;
    }());
    var LogObservable = (function(_super) {
      __extends(LogObservable, _super);
      function LogObservable() {
        _super.apply(this, arguments);
      }
      LogObservable.prototype.lift = function(operator) {
        var observable = new LogObservable();
        observable.source = this;
        observable.operator = new LogOperator(operator);
        return observable;
      };
      return LogObservable;
    }(Observable));
    var result = new LogObservable(function(observer) {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    }).map(function(x) {
      return 10 * x;
    }).filter(function(x) {
      return x > 15;
    }).count();
    chai_1.expect(result instanceof LogObservable).to.be.true;
    var expected = [2];
    result.subscribe(function(x) {
      chai_1.expect(x).to.equal(expected.shift());
    }, function(x) {
      done(new Error('should not be called'));
    }, function() {
      chai_1.expect(log).to.deep.equal(['next 10', 'next 20', 'next 20', 'next 30', 'next 30', 'next 2']);
      done();
    });
  });
});