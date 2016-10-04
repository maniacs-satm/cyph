/* */ 
"use strict";
var chai_1 = require('chai');
var sinon = require('sinon');
var Rx = require('../../dist/cjs/Rx');
var Scheduler = Rx.Scheduler;
var queue = Scheduler.queue;
describe('Scheduler.queue', function() {
  it('should switch from synchronous to asynchronous at will', function() {
    var sandbox = sinon.sandbox.create();
    var fakeTimer = sandbox.useFakeTimers();
    var asyncExec = false;
    var state = [];
    queue.schedule(function(index) {
      state.push(index);
      if (index === 0) {
        this.schedule(1, 100);
      } else if (index === 1) {
        asyncExec = true;
        this.schedule(2, 0);
      }
    }, 0, 0);
    chai_1.expect(asyncExec).to.be.false;
    chai_1.expect(state).to.be.deep.equal([0]);
    fakeTimer.tick(100);
    chai_1.expect(asyncExec).to.be.true;
    chai_1.expect(state).to.be.deep.equal([0, 1, 2]);
    sandbox.restore();
  });
  it('should unsubscribe the rest of the scheduled actions if an action throws an error', function() {
    var actions = [];
    var action2Exec = false;
    var action3Exec = false;
    var errorValue = undefined;
    try {
      queue.schedule(function() {
        actions.push(queue.schedule(function() {
          throw new Error('oops');
        }), queue.schedule(function() {
          action2Exec = true;
        }), queue.schedule(function() {
          action3Exec = true;
        }));
      });
    } catch (e) {
      errorValue = e;
    }
    chai_1.expect(actions.every(function(action) {
      return action.closed;
    })).to.be.true;
    chai_1.expect(action2Exec).to.be.false;
    chai_1.expect(action3Exec).to.be.false;
    chai_1.expect(errorValue).exist;
    chai_1.expect(errorValue.message).to.equal('oops');
  });
});
