/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var VirtualTimeScheduler = Rx.VirtualTimeScheduler;
describe('VirtualTimeScheduler', function() {
  it('should exist', function() {
    chai_1.expect(VirtualTimeScheduler).exist;
    chai_1.expect(VirtualTimeScheduler).to.be.a('function');
  });
  it('should schedule things in order when flushed if each this is scheduled synchrously', function() {
    var v = new VirtualTimeScheduler();
    var invoked = [];
    var invoke = function(state) {
      invoked.push(state);
    };
    v.schedule(invoke, 0, 1);
    v.schedule(invoke, 0, 2);
    v.schedule(invoke, 0, 3);
    v.schedule(invoke, 0, 4);
    v.schedule(invoke, 0, 5);
    v.flush();
    chai_1.expect(invoked).to.deep.equal([1, 2, 3, 4, 5]);
  });
  it('should schedule things in order when flushed if each this is scheduled at random', function() {
    var v = new VirtualTimeScheduler();
    var invoked = [];
    var invoke = function(state) {
      invoked.push(state);
    };
    v.schedule(invoke, 0, 1);
    v.schedule(invoke, 100, 2);
    v.schedule(invoke, 0, 3);
    v.schedule(invoke, 500, 4);
    v.schedule(invoke, 0, 5);
    v.schedule(invoke, 100, 6);
    v.flush();
    chai_1.expect(invoked).to.deep.equal([1, 3, 5, 2, 6, 4]);
  });
  it('should schedule things in order when there are negative delays', function() {
    var v = new VirtualTimeScheduler();
    var invoked = [];
    var invoke = function(state) {
      invoked.push(state);
    };
    v.schedule(invoke, 0, 1);
    v.schedule(invoke, 100, 2);
    v.schedule(invoke, 0, 3);
    v.schedule(invoke, -2, 4);
    v.schedule(invoke, 0, 5);
    v.schedule(invoke, -10, 6);
    v.flush();
    chai_1.expect(invoked).to.deep.equal([6, 4, 1, 3, 5, 2]);
  });
  it('should support recursive scheduling', function() {
    var v = new VirtualTimeScheduler();
    var count = 0;
    var expected = [100, 200, 300];
    v.schedule(function(state) {
      if (++count === 3) {
        return;
      }
      chai_1.expect(this.delay).to.equal(expected.shift());
      this.schedule(state, this.delay);
    }, 100, 'test');
    v.flush();
    chai_1.expect(count).to.equal(3);
  });
});
