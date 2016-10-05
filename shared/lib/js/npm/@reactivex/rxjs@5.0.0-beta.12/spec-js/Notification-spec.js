/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../dist/cjs/Rx');
var Notification = Rx.Notification;
describe('Notification', function() {
  it('should exist', function() {
    chai_1.expect(Notification).exist;
    chai_1.expect(Notification).to.be.a('function');
  });
  it('should not allow convert to observable if given kind is unknown', function() {
    var n = new Notification('x');
    chai_1.expect(function() {
      return n.toObservable();
    }).to.throw();
  });
  describe('createNext', function() {
    it('should return a Notification', function() {
      var n = Notification.createNext('test');
      chai_1.expect(n instanceof Notification).to.be.true;
      chai_1.expect(n.value).to.equal('test');
      chai_1.expect(n.kind).to.equal('N');
      chai_1.expect(n.exception).to.be.a('undefined');
      chai_1.expect(n.hasValue).to.be.true;
    });
  });
  describe('createError', function() {
    it('should return a Notification', function() {
      var n = Notification.createError('test');
      chai_1.expect(n instanceof Notification).to.be.true;
      chai_1.expect(n.value).to.be.a('undefined');
      chai_1.expect(n.kind).to.equal('E');
      chai_1.expect(n.exception).to.equal('test');
      chai_1.expect(n.hasValue).to.be.false;
    });
  });
  describe('createComplete', function() {
    it('should return a Notification', function() {
      var n = Notification.createComplete();
      chai_1.expect(n instanceof Notification).to.be.true;
      chai_1.expect(n.value).to.be.a('undefined');
      chai_1.expect(n.kind).to.equal('C');
      chai_1.expect(n.exception).to.be.a('undefined');
      chai_1.expect(n.hasValue).to.be.false;
    });
  });
  describe('toObservable', function() {
    it('should create observable from a next Notification', function() {
      var value = 'a';
      var next = Notification.createNext(value);
      expectObservable(next.toObservable()).toBe('(a|)');
    });
    it('should create observable from a complete Notification', function() {
      var complete = Notification.createComplete();
      expectObservable(complete.toObservable()).toBe('|');
    });
    it('should create observable from a error Notification', function() {
      var error = Notification.createError('error');
      expectObservable(error.toObservable()).toBe('#');
    });
  });
  describe('static reference', function() {
    it('should create new next Notification with value', function() {
      var value = 'a';
      var first = Notification.createNext(value);
      var second = Notification.createNext(value);
      chai_1.expect(first).not.to.equal(second);
    });
    it('should create new error Notification', function() {
      var first = Notification.createError();
      var second = Notification.createError();
      chai_1.expect(first).not.to.equal(second);
    });
    it('should return static next Notification reference without value', function() {
      var first = Notification.createNext(undefined);
      var second = Notification.createNext(undefined);
      chai_1.expect(first).to.equal(second);
    });
    it('should return static complete Notification reference', function() {
      var first = Notification.createComplete();
      var second = Notification.createComplete();
      chai_1.expect(first).to.equal(second);
    });
  });
  describe('do', function() {
    it('should invoke on next', function() {
      var n = Notification.createNext('a');
      var invoked = false;
      n.do(function(x) {
        invoked = true;
      }, function(err) {
        throw 'should not be called';
      }, function() {
        throw 'should not be called';
      });
      chai_1.expect(invoked).to.be.true;
    });
    it('should invoke on error', function() {
      var n = Notification.createError();
      var invoked = false;
      n.do(function(x) {
        throw 'should not be called';
      }, function(err) {
        invoked = true;
      }, function() {
        throw 'should not be called';
      });
      chai_1.expect(invoked).to.be.true;
    });
    it('should invoke on complete', function() {
      var n = Notification.createComplete();
      var invoked = false;
      n.do(function(x) {
        throw 'should not be called';
      }, function(err) {
        throw 'should not be called';
      }, function() {
        invoked = true;
      });
      chai_1.expect(invoked).to.be.true;
    });
  });
  describe('accept', function() {
    it('should accept observer for next Notification', function() {
      var value = 'a';
      var observed = false;
      var n = Notification.createNext(value);
      var observer = Rx.Subscriber.create(function(x) {
        chai_1.expect(x).to.equal(value);
        observed = true;
      }, function(err) {
        throw 'should not be called';
      }, function() {
        throw 'should not be called';
      });
      n.accept(observer);
      chai_1.expect(observed).to.be.true;
    });
    it('should accept observer for error Notification', function() {
      var observed = false;
      var n = Notification.createError();
      var observer = Rx.Subscriber.create(function(x) {
        throw 'should not be called';
      }, function(err) {
        observed = true;
      }, function() {
        throw 'should not be called';
      });
      n.accept(observer);
      chai_1.expect(observed).to.be.true;
    });
    it('should accept observer for complete Notification', function() {
      var observed = false;
      var n = Notification.createComplete();
      var observer = Rx.Subscriber.create(function(x) {
        throw 'should not be called';
      }, function(err) {
        throw 'should not be called';
      }, function() {
        observed = true;
      });
      n.accept(observer);
      chai_1.expect(observed).to.be.true;
    });
    it('should accept function for next Notification', function() {
      var value = 'a';
      var observed = false;
      var n = Notification.createNext(value);
      n.accept(function(x) {
        chai_1.expect(x).to.equal(value);
        observed = true;
      }, function(err) {
        throw 'should not be called';
      }, function() {
        throw 'should not be called';
      });
      chai_1.expect(observed).to.be.true;
    });
    it('should accept function for error Notification', function() {
      var observed = false;
      var error = 'error';
      var n = Notification.createError(error);
      n.accept(function(x) {
        throw 'should not be called';
      }, function(err) {
        chai_1.expect(err).to.equal(error);
        observed = true;
      }, function() {
        throw 'should not be called';
      });
      chai_1.expect(observed).to.be.true;
    });
    it('should accept function for complete Notification', function() {
      var observed = false;
      var n = Notification.createComplete();
      n.accept(function(x) {
        throw 'should not be called';
      }, function(err) {
        throw 'should not be called';
      }, function() {
        observed = true;
      });
      chai_1.expect(observed).to.be.true;
    });
  });
  describe('observe', function() {
    it('should observe for next Notification', function() {
      var value = 'a';
      var observed = false;
      var n = Notification.createNext(value);
      var observer = Rx.Subscriber.create(function(x) {
        chai_1.expect(x).to.equal(value);
        observed = true;
      }, function(err) {
        throw 'should not be called';
      }, function() {
        throw 'should not be called';
      });
      n.observe(observer);
      chai_1.expect(observed).to.be.true;
    });
    it('should observe for error Notification', function() {
      var observed = false;
      var n = Notification.createError();
      var observer = Rx.Subscriber.create(function(x) {
        throw 'should not be called';
      }, function(err) {
        observed = true;
      }, function() {
        throw 'should not be called';
      });
      n.observe(observer);
      chai_1.expect(observed).to.be.true;
    });
    it('should observe for complete Notification', function() {
      var observed = false;
      var n = Notification.createComplete();
      var observer = Rx.Subscriber.create(function(x) {
        throw 'should not be called';
      }, function(err) {
        throw 'should not be called';
      }, function() {
        observed = true;
      });
      n.observe(observer);
      chai_1.expect(observed).to.be.true;
    });
  });
});