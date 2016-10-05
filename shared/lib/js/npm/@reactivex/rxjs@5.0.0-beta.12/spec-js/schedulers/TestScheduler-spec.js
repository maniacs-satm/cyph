/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var Notification = Rx.Notification;
var TestScheduler = Rx.TestScheduler;
describe('TestScheduler', function() {
  it('should exist', function() {
    chai_1.expect(TestScheduler).exist;
    chai_1.expect(TestScheduler).to.be.a('function');
  });
  describe('parseMarbles()', function() {
    it('should parse a marble string into a series of notifications and types', function() {
      var result = TestScheduler.parseMarbles('-------a---b---|', {
        a: 'A',
        b: 'B'
      });
      chai_1.expect(result).deep.equal([{
        frame: 70,
        notification: Notification.createNext('A')
      }, {
        frame: 110,
        notification: Notification.createNext('B')
      }, {
        frame: 150,
        notification: Notification.createComplete()
      }]);
    });
    it('should parse a marble string, allowing spaces too', function() {
      var result = TestScheduler.parseMarbles('--a--b--|   ', {
        a: 'A',
        b: 'B'
      });
      chai_1.expect(result).deep.equal([{
        frame: 20,
        notification: Notification.createNext('A')
      }, {
        frame: 50,
        notification: Notification.createNext('B')
      }, {
        frame: 80,
        notification: Notification.createComplete()
      }]);
    });
    it('should parse a marble string with a subscription point', function() {
      var result = TestScheduler.parseMarbles('---^---a---b---|', {
        a: 'A',
        b: 'B'
      });
      chai_1.expect(result).deep.equal([{
        frame: 40,
        notification: Notification.createNext('A')
      }, {
        frame: 80,
        notification: Notification.createNext('B')
      }, {
        frame: 120,
        notification: Notification.createComplete()
      }]);
    });
    it('should parse a marble string with an error', function() {
      var result = TestScheduler.parseMarbles('-------a---b---#', {
        a: 'A',
        b: 'B'
      }, 'omg error!');
      chai_1.expect(result).deep.equal([{
        frame: 70,
        notification: Notification.createNext('A')
      }, {
        frame: 110,
        notification: Notification.createNext('B')
      }, {
        frame: 150,
        notification: Notification.createError('omg error!')
      }]);
    });
    it('should default in the letter for the value if no value hash was passed', function() {
      var result = TestScheduler.parseMarbles('--a--b--c--');
      chai_1.expect(result).deep.equal([{
        frame: 20,
        notification: Notification.createNext('a')
      }, {
        frame: 50,
        notification: Notification.createNext('b')
      }, {
        frame: 80,
        notification: Notification.createNext('c')
      }]);
    });
    it('should handle grouped values', function() {
      var result = TestScheduler.parseMarbles('---(abc)---');
      chai_1.expect(result).deep.equal([{
        frame: 30,
        notification: Notification.createNext('a')
      }, {
        frame: 30,
        notification: Notification.createNext('b')
      }, {
        frame: 30,
        notification: Notification.createNext('c')
      }]);
    });
  });
  describe('parseMarblesAsSubscriptions()', function() {
    it('should parse a subscription marble string into a subscriptionLog', function() {
      var result = TestScheduler.parseMarblesAsSubscriptions('---^---!-');
      chai_1.expect(result.subscribedFrame).to.equal(30);
      chai_1.expect(result.unsubscribedFrame).to.equal(70);
    });
    it('should parse a subscription marble string with an unsubscription', function() {
      var result = TestScheduler.parseMarblesAsSubscriptions('---^-');
      chai_1.expect(result.subscribedFrame).to.equal(30);
      chai_1.expect(result.unsubscribedFrame).to.equal(Number.POSITIVE_INFINITY);
    });
    it('should parse a subscription marble string with a synchronous unsubscription', function() {
      var result = TestScheduler.parseMarblesAsSubscriptions('---(^!)-');
      chai_1.expect(result.subscribedFrame).to.equal(30);
      chai_1.expect(result.unsubscribedFrame).to.equal(30);
    });
  });
  describe('createTime()', function() {
    it('should parse a simple time marble string to a number', function() {
      var scheduler = new TestScheduler(null);
      var time = scheduler.createTime('-----|');
      chai_1.expect(time).to.equal(50);
    });
    it('should throw if not given good marble input', function() {
      var scheduler = new TestScheduler(null);
      chai_1.expect(function() {
        scheduler.createTime('-a-b-#');
      }).to.throw();
    });
  });
  describe('createColdObservable()', function() {
    it('should create a cold observable', function() {
      var expected = ['A', 'B'];
      var scheduler = new TestScheduler(null);
      var source = scheduler.createColdObservable('--a---b--|', {
        a: 'A',
        b: 'B'
      });
      chai_1.expect(source instanceof Rx.Observable).to.be.true;
      source.subscribe(function(x) {
        chai_1.expect(x).to.equal(expected.shift());
      });
      scheduler.flush();
      chai_1.expect(expected.length).to.equal(0);
    });
  });
  describe('createHotObservable()', function() {
    it('should create a cold observable', function() {
      var expected = ['A', 'B'];
      var scheduler = new TestScheduler(null);
      var source = scheduler.createHotObservable('--a---b--|', {
        a: 'A',
        b: 'B'
      });
      chai_1.expect(source).to.be.an.instanceof(Rx.Subject);
      source.subscribe(function(x) {
        chai_1.expect(x).to.equal(expected.shift());
      });
      scheduler.flush();
      chai_1.expect(expected.length).to.equal(0);
    });
  });
  describe('jasmine helpers', function() {
    describe('rxTestScheduler', function() {
      it('should exist', function() {
        chai_1.expect(rxTestScheduler).to.be.an.instanceof(TestScheduler);
      });
    });
    describe('cold()', function() {
      it('should exist', function() {
        chai_1.expect(cold).to.exist;
        chai_1.expect(cold).to.be.a('function');
      });
      it('should create a cold observable', function() {
        var expected = [1, 2];
        var source = cold('-a-b-|', {
          a: 1,
          b: 2
        });
        source.subscribe(function(x) {
          chai_1.expect(x).to.equal(expected.shift());
        }, null, function() {
          chai_1.expect(expected.length).to.equal(0);
        });
        expectObservable(source).toBe('-a-b-|', {
          a: 1,
          b: 2
        });
      });
    });
    describe('hot()', function() {
      it('should exist', function() {
        chai_1.expect(hot).to.exist;
        chai_1.expect(hot).to.be.a('function');
      });
      it('should create a hot observable', function() {
        var source = hot('---^-a-b-|', {
          a: 1,
          b: 2
        });
        chai_1.expect(source instanceof Rx.Subject).to.be.true;
        expectObservable(source).toBe('--a-b-|', {
          a: 1,
          b: 2
        });
      });
    });
    describe('time()', function() {
      it('should exist', function() {
        chai_1.expect(time).to.exist;
        chai_1.expect(time).to.be.a('function');
      });
      it('should parse a simple time marble string to a number', function() {
        chai_1.expect(time('-----|')).to.equal(50);
      });
    });
    describe('expectObservable()', function() {
      it('should exist', function() {
        chai_1.expect(expectObservable).to.exist;
        chai_1.expect(expectObservable).to.be.a('function');
      });
      it('should return an object with a toBe function', function() {
        chai_1.expect(expectObservable(Rx.Observable.of(1)).toBe).to.be.a('function');
      });
      it('should append to flushTests array', function() {
        expectObservable(Rx.Observable.empty());
        chai_1.expect(rxTestScheduler.flushTests.length).to.equal(1);
      });
      it('should handle empty', function() {
        expectObservable(Rx.Observable.empty()).toBe('|', {});
      });
      it('should handle never', function() {
        expectObservable(Rx.Observable.never()).toBe('-', {});
        expectObservable(Rx.Observable.never()).toBe('---', {});
      });
      it('should accept an unsubscription marble diagram', function() {
        var source = hot('---^-a-b-|');
        var unsubscribe = '---!';
        var expected = '--a';
        expectObservable(source, unsubscribe).toBe(expected);
      });
    });
    describe('expectSubscriptions()', function() {
      it('should exist', function() {
        chai_1.expect(expectSubscriptions).to.exist;
        chai_1.expect(expectSubscriptions).to.be.a('function');
      });
      it('should return an object with a toBe function', function() {
        chai_1.expect(expectSubscriptions([]).toBe).to.be.a('function');
      });
      it('should append to flushTests array', function() {
        expectSubscriptions([]);
        chai_1.expect(rxTestScheduler.flushTests.length).to.equal(1);
      });
      it('should assert subscriptions of a cold observable', function() {
        var source = cold('---a---b-|');
        var subs = '^--------!';
        expectSubscriptions(source.subscriptions).toBe(subs);
        source.subscribe();
      });
    });
    describe('end-to-end helper tests', function() {
      it('should be awesome', function() {
        var values = {
          a: 1,
          b: 2
        };
        var myObservable = cold('---a---b--|', values);
        var subs = '^---------!';
        expectObservable(myObservable).toBe('---a---b--|', values);
        expectSubscriptions(myObservable.subscriptions).toBe(subs);
      });
      it('should support testing metastreams', function() {
        var x = cold('-a-b|');
        var y = cold('-c-d|');
        var myObservable = hot('---x---y----|', {
          x: x,
          y: y
        });
        var expected = '---x---y----|';
        var expectedx = cold('-a-b|');
        var expectedy = cold('-c-d|');
        expectObservable(myObservable).toBe(expected, {
          x: expectedx,
          y: expectedy
        });
      });
    });
  });
});