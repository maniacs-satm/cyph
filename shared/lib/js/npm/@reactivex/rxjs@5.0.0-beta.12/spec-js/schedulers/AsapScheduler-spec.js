/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var asap = Rx.Scheduler.asap;
describe('Scheduler.asap', function() {
  it('should exist', function() {
    chai_1.expect(asap).exist;
  });
  it('should schedule an action to happen later', function(done) {
    var actionHappened = false;
    asap.schedule(function() {
      actionHappened = true;
      done();
    });
    if (actionHappened) {
      done(new Error('Scheduled action happened synchronously'));
    }
  });
  it('should execute recursively scheduled actions in separate asynchronous contexts', function(done) {
    var syncExec1 = true;
    var syncExec2 = true;
    asap.schedule(function(index) {
      if (index === 0) {
        this.schedule(1);
        asap.schedule(function() {
          syncExec1 = false;
        });
      } else if (index === 1) {
        this.schedule(2);
        asap.schedule(function() {
          syncExec2 = false;
        });
      } else if (index === 2) {
        this.schedule(3);
      } else if (index === 3) {
        if (!syncExec1 && !syncExec2) {
          done();
        } else {
          done(new Error('Execution happened synchronously.'));
        }
      }
    }, 0, 0);
  });
  it('should cancel the setImmediate if all scheduled actions unsubscribe before it executes', function(done) {
    var asapExec1 = false;
    var asapExec2 = false;
    var action1 = asap.schedule(function() {
      asapExec1 = true;
    });
    var action2 = asap.schedule(function() {
      asapExec2 = true;
    });
    chai_1.expect(asap.scheduled).to.exist;
    chai_1.expect(asap.actions.length).to.equal(2);
    action1.unsubscribe();
    action2.unsubscribe();
    chai_1.expect(asap.actions.length).to.equal(0);
    chai_1.expect(asap.scheduled).to.equal(undefined);
    asap.schedule(function() {
      chai_1.expect(asapExec1).to.equal(false);
      chai_1.expect(asapExec2).to.equal(false);
      done();
    });
  });
  it('should execute the rest of the scheduled actions if the first action is canceled', function(done) {
    var actionHappened = false;
    var firstSubscription = null;
    var secondSubscription = null;
    firstSubscription = asap.schedule(function() {
      actionHappened = true;
      if (secondSubscription) {
        secondSubscription.unsubscribe();
      }
      done(new Error('The first action should not have executed.'));
    });
    secondSubscription = asap.schedule(function() {
      if (!actionHappened) {
        done();
      }
    });
    if (actionHappened) {
      done(new Error('Scheduled action happened synchronously'));
    } else {
      firstSubscription.unsubscribe();
    }
  });
});