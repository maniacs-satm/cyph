/* */ 
var AWS = require('./core');
var inherit = AWS.util.inherit;
var jmespath = require('jmespath');
function CHECK_ACCEPTORS(resp) {
  var waiter = resp.request._waiter;
  var acceptors = waiter.config.acceptors;
  var acceptorMatched = false;
  var state = 'retry';
  acceptors.forEach(function(acceptor) {
    if (!acceptorMatched) {
      var matcher = waiter.matchers[acceptor.matcher];
      if (matcher && matcher(resp, acceptor.expected, acceptor.argument)) {
        acceptorMatched = true;
        state = acceptor.state;
      }
    }
  });
  if (!acceptorMatched && resp.error)
    state = 'failure';
  if (state === 'success') {
    waiter.setSuccess(resp);
  } else {
    waiter.setError(resp, state === 'retry');
  }
}
AWS.ResourceWaiter = inherit({
  constructor: function constructor(service, state) {
    this.service = service;
    this.state = state;
    this.loadWaiterConfig(this.state);
  },
  service: null,
  state: null,
  config: null,
  matchers: {
    path: function(resp, expected, argument) {
      var result = jmespath.search(resp.data, argument);
      return jmespath.strictDeepEqual(result, expected);
    },
    pathAll: function(resp, expected, argument) {
      var results = jmespath.search(resp.data, argument);
      if (!Array.isArray(results))
        results = [results];
      var numResults = results.length;
      if (!numResults)
        return false;
      for (var ind = 0; ind < numResults; ind++) {
        if (!jmespath.strictDeepEqual(results[ind], expected)) {
          return false;
        }
      }
      return true;
    },
    pathAny: function(resp, expected, argument) {
      var results = jmespath.search(resp.data, argument);
      if (!Array.isArray(results))
        results = [results];
      var numResults = results.length;
      for (var ind = 0; ind < numResults; ind++) {
        if (jmespath.strictDeepEqual(results[ind], expected)) {
          return true;
        }
      }
      return false;
    },
    status: function(resp, expected) {
      var statusCode = resp.httpResponse.statusCode;
      return (typeof statusCode === 'number') && (statusCode === expected);
    },
    error: function(resp, expected) {
      if (typeof expected === 'string' && resp.error) {
        return expected === resp.error.code;
      }
      return expected === !!resp.error;
    }
  },
  listeners: new AWS.SequentialExecutor().addNamedListeners(function(add) {
    add('RETRY_CHECK', 'retry', function(resp) {
      var waiter = resp.request._waiter;
      if (resp.error && resp.error.code === 'ResourceNotReady') {
        resp.error.retryDelay = (waiter.config.delay || 0) * 1000;
      }
    });
    add('CHECK_OUTPUT', 'extractData', CHECK_ACCEPTORS);
    add('CHECK_ERROR', 'extractError', CHECK_ACCEPTORS);
  }),
  wait: function wait(params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = undefined;
    }
    var request = this.service.makeRequest(this.config.operation, params);
    request._waiter = this;
    request.response.maxRetries = this.config.maxAttempts;
    request.addListeners(this.listeners);
    if (callback)
      request.send(callback);
    return request;
  },
  setSuccess: function setSuccess(resp) {
    resp.error = null;
    resp.data = resp.data || {};
    resp.request.removeAllListeners('extractData');
  },
  setError: function setError(resp, retryable) {
    resp.data = null;
    resp.error = AWS.util.error(resp.error || new Error(), {
      code: 'ResourceNotReady',
      message: 'Resource is not in the state ' + this.state,
      retryable: retryable
    });
  },
  loadWaiterConfig: function loadWaiterConfig(state) {
    if (!this.service.api.waiters[state]) {
      throw new AWS.util.error(new Error(), {
        code: 'StateNotFoundError',
        message: 'State ' + state + ' not found.'
      });
    }
    this.config = this.service.api.waiters[state];
  }
});
