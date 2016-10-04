/* */ 
"use strict";
var chai_1 = require('chai');
var sinon = require('sinon');
var Rx = require('../dist/cjs/Rx');
var Subscriber = Rx.Subscriber;
describe('Subscriber', function() {
  describe('when created through create()', function() {
    it('should not call error() if next() handler throws an error', function() {
      var errorSpy = sinon.spy();
      var completeSpy = sinon.spy();
      var subscriber = Subscriber.create(function(value) {
        if (value === 2) {
          throw 'error!';
        }
      }, errorSpy, completeSpy);
      subscriber.next(1);
      chai_1.expect(function() {
        subscriber.next(2);
      }).to.throw('error!');
      chai_1.expect(errorSpy).not.have.been.called;
      chai_1.expect(completeSpy).not.have.been.called;
    });
  });
  it('should ignore next messages after unsubscription', function() {
    var times = 0;
    var sub = new Subscriber({next: function() {
        times += 1;
      }});
    sub.next();
    sub.next();
    sub.unsubscribe();
    sub.next();
    chai_1.expect(times).to.equal(2);
  });
  it('should ignore error messages after unsubscription', function() {
    var times = 0;
    var errorCalled = false;
    var sub = new Subscriber({
      next: function() {
        times += 1;
      },
      error: function() {
        errorCalled = true;
      }
    });
    sub.next();
    sub.next();
    sub.unsubscribe();
    sub.next();
    sub.error();
    chai_1.expect(times).to.equal(2);
    chai_1.expect(errorCalled).to.be.false;
  });
  it('should ignore complete messages after unsubscription', function() {
    var times = 0;
    var completeCalled = false;
    var sub = new Subscriber({
      next: function() {
        times += 1;
      },
      complete: function() {
        completeCalled = true;
      }
    });
    sub.next();
    sub.next();
    sub.unsubscribe();
    sub.next();
    sub.complete();
    chai_1.expect(times).to.equal(2);
    chai_1.expect(completeCalled).to.be.false;
  });
});
