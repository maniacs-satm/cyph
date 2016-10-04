/* */ 
"use strict";
var _ = require('lodash');
var commonInterface = require('mocha/lib/interfaces/common');
var escapeRe = require('escape-string-regexp');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var Rx = require('../../dist/cjs/Rx');
var marble = require('./marble-testing');
chai.use(sinonChai);
var diagramFunction = global.asDiagram;
module.exports = function(suite) {
  var suites = [suite];
  suite.on('pre-require', function(context, file, mocha) {
    var common = commonInterface(suites, context);
    context.before = common.before;
    context.after = common.after;
    context.beforeEach = common.beforeEach;
    context.afterEach = common.afterEach;
    context.run = mocha.options.delay && common.runWithSuite(suite);
    context.rxTestScheduler = null;
    context.hot = marble.hot;
    context.cold = marble.cold;
    context.expectObservable = marble.expectObservable;
    context.expectSubscriptions = marble.expectSubscriptions;
    context.time = marble.time;
    context.describe = context.context = function(title, fn) {
      var suite = Suite.create(suites[0], title);
      suite.file = file;
      suites.unshift(suite);
      fn.call(suite);
      suites.shift();
      return suite;
    };
    context.xdescribe = context.xcontext = context.describe.skip = function(title, fn) {
      var suite = Suite.create(suites[0], title);
      suite.pending = true;
      suites.unshift(suite);
      fn.call(suite);
      suites.shift();
    };
    context.describe.only = function(title, fn) {
      var suite = context.describe(title, fn);
      mocha.grep(suite.fullTitle());
      return suite;
    };
    context.type = function(title, fn) {};
    function stringify(x) {
      return JSON.stringify(x, function(key, value) {
        if (Array.isArray(value)) {
          return '[' + value.map(function(i) {
            return '\n\t' + stringify(i);
          }) + '\n]';
        }
        return value;
      }).replace(/\\"/g, '"').replace(/\\t/g, '\t').replace(/\\n/g, '\n');
    }
    function deleteErrorNotificationStack(marble) {
      var notification = marble.notification;
      if (notification) {
        var kind = notification.kind,
            exception = notification.exception;
        if (kind === 'E' && exception instanceof Error) {
          notification.exception = {
            name: exception.name,
            message: exception.message
          };
        }
      }
      return marble;
    }
    function observableMatcher(actual, expected) {
      if (Array.isArray(actual) && Array.isArray(expected)) {
        actual = actual.map(deleteErrorNotificationStack);
        expected = expected.map(deleteErrorNotificationStack);
        var passed = _.isEqual(actual, expected);
        if (passed) {
          return;
        }
        var message_1 = '\nExpected \n';
        actual.forEach(function(x) {
          return message_1 += "\t" + stringify(x) + "\n";
        });
        message_1 += '\t\nto deep equal \n';
        expected.forEach(function(x) {
          return message_1 += "\t" + stringify(x) + "\n";
        });
        chai.assert(passed, message_1);
      } else {
        chai.assert.deepEqual(actual, expected);
      }
    }
    var it = context.it = context.specify = function(title, fn) {
      context.rxTestScheduler = null;
      var modified = fn;
      if (fn && fn.length === 0) {
        modified = function(done) {
          context.rxTestScheduler = new Rx.TestScheduler(observableMatcher);
          var error = null;
          try {
            fn();
            context.rxTestScheduler.flush();
          } catch (e) {
            error = e instanceof Error ? e : new Error(e);
          } finally {
            context.rxTestScheduler = null;
            error ? done(error) : done();
          }
        };
      }
      var suite = suites[0];
      if (suite.pending) {
        modified = null;
      }
      var test = new Test(title, modified);
      test.file = file;
      suite.addTest(test);
      return test;
    };
    context.asDiagram = function(label) {
      if (diagramFunction) {
        return diagramFunction(label, it);
      }
      return it;
    };
    context.it.only = function(title, fn) {
      var test = it(title, fn);
      var reString = '^' + escapeRe(test.fullTitle()) + '$';
      mocha.grep(new RegExp(reString));
      return test;
    };
    context.xit = context.xspecify = context.it.skip = function(title) {
      context.it(title);
    };
    context.it.retries = function(n) {
      context.retries(n);
    };
  });
};
if (global.Mocha) {
  window.Mocha.interfaces['testschedulerui'] = module.exports;
} else {
  mocha.interfaces['testschedulerui'] = module.exports;
}
Object.defineProperty(Error.prototype, 'toJSON', {
  value: function() {
    var alt = {};
    Object.getOwnPropertyNames(this).forEach(function(key) {
      if (key !== 'stack') {
        alt[key] = this[key];
      }
    }, this);
    return alt;
  },
  configurable: true
});
