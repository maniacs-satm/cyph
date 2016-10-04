/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../dist/cjs/Rx');
var Observable = Rx.Observable;
var Subscription = Rx.Subscription;
describe('Subscription', function() {
  it('should not leak', function(done) {
    var tearDowns = [];
    var source1 = Observable.create(function(observer) {
      return function() {
        tearDowns.push(1);
      };
    });
    var source2 = Observable.create(function(observer) {
      return function() {
        tearDowns.push(2);
        throw new Error('oops, I am a bad unsubscribe!');
      };
    });
    var source3 = Observable.create(function(observer) {
      return function() {
        tearDowns.push(3);
      };
    });
    var subscription = Observable.merge(source1, source2, source3).subscribe();
    setTimeout(function() {
      chai_1.expect(function() {
        subscription.unsubscribe();
      }).to.throw(Rx.UnsubscriptionError);
      chai_1.expect(tearDowns).to.deep.equal([1, 2, 3]);
      done();
    });
  });
  it('should not leak when adding a bad custom subscription to a subscription', function(done) {
    var tearDowns = [];
    var sub = new Subscription();
    var source1 = Observable.create(function(observer) {
      return function() {
        tearDowns.push(1);
      };
    });
    var source2 = Observable.create(function(observer) {
      return function() {
        tearDowns.push(2);
        sub.add(({unsubscribe: function() {
            chai_1.expect(sub.closed).to.be.true;
            throw new Error('Who is your daddy, and what does he do?');
          }}));
      };
    });
    var source3 = Observable.create(function(observer) {
      return function() {
        tearDowns.push(3);
      };
    });
    sub.add(Observable.merge(source1, source2, source3).subscribe());
    setTimeout(function() {
      chai_1.expect(function() {
        sub.unsubscribe();
      }).to.throw(Rx.UnsubscriptionError);
      chai_1.expect(tearDowns).to.deep.equal([1, 2, 3]);
      done();
    });
  });
  describe('Subscription.add()', function() {
    it('Should returns the self if the self is passed', function() {
      var sub = new Subscription();
      var ret = sub.add(sub);
      chai_1.expect(ret).to.equal(sub);
    });
    it('Should returns Subscription.EMPTY if it is passed', function() {
      var sub = new Subscription();
      var ret = sub.add(Subscription.EMPTY);
      chai_1.expect(ret).to.equal(Subscription.EMPTY);
    });
    it('Should returns Subscription.EMPTY if it is called with `void` value', function() {
      var sub = new Subscription();
      var ret = sub.add(undefined);
      chai_1.expect(ret).to.equal(Subscription.EMPTY);
    });
    it('Should returns a new Subscription created with teardown function if it is passed a function', function() {
      var sub = new Subscription();
      var isCalled = false;
      var ret = sub.add(function() {
        isCalled = true;
      });
      ret.unsubscribe();
      chai_1.expect(isCalled).to.equal(true);
    });
    it('Should returns the passed one if passed a unsubscribed AnonymousSubscription', function() {
      var sub = new Subscription();
      var arg = {
        isUnsubscribed: true,
        unsubscribe: function() {
          return undefined;
        }
      };
      var ret = sub.add(arg);
      chai_1.expect(ret).to.equal(arg);
    });
    it('Should returns the passed one if passed a AnonymousSubscription having not function `unsubscribe` member', function() {
      var sub = new Subscription();
      var arg = {
        isUnsubscribed: false,
        unsubscribe: undefined
      };
      var ret = sub.add(arg);
      chai_1.expect(ret).to.equal(arg);
    });
    it('Should returns the passed one if the self has been unsubscribed', function() {
      var main = new Subscription();
      main.unsubscribe();
      var child = new Subscription();
      var ret = main.add(child);
      chai_1.expect(ret).to.equal(child);
    });
    it('Should unsubscribe the passed one if the self has been unsubscribed', function() {
      var main = new Subscription();
      main.unsubscribe();
      var isCalled = false;
      var child = new Subscription(function() {
        isCalled = true;
      });
      main.add(child);
      chai_1.expect(isCalled).to.equal(true);
    });
  });
});
