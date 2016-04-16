/* */ 
(function(Buffer, process) {
  var AWS = require('./core');
  var AcceptorStateMachine = require('./state_machine');
  var inherit = AWS.util.inherit;
  var domain = AWS.util.nodeRequire('domain');
  var jmespath = require('jmespath');
  var hardErrorStates = {
    success: 1,
    error: 1,
    complete: 1
  };
  function isTerminalState(machine) {
    return hardErrorStates.hasOwnProperty(machine._asm.currentState);
  }
  var fsm = new AcceptorStateMachine();
  fsm.setupStates = function() {
    var transition = function(_, done) {
      var self = this;
      self._haltHandlersOnError = false;
      self.emit(self._asm.currentState, function(err) {
        if (err) {
          if (isTerminalState(self)) {
            if (domain && self.domain instanceof domain.Domain) {
              err.domainEmitter = self;
              err.domain = self.domain;
              err.domainThrown = false;
              self.domain.emit('error', err);
            } else {
              throw err;
            }
          } else {
            self.response.error = err;
            done(err);
          }
        } else {
          done(self.response.error);
        }
      });
    };
    this.addState('validate', 'build', 'error', transition);
    this.addState('build', 'afterBuild', 'restart', transition);
    this.addState('afterBuild', 'sign', 'restart', transition);
    this.addState('sign', 'send', 'retry', transition);
    this.addState('retry', 'afterRetry', 'afterRetry', transition);
    this.addState('afterRetry', 'sign', 'error', transition);
    this.addState('send', 'validateResponse', 'retry', transition);
    this.addState('validateResponse', 'extractData', 'extractError', transition);
    this.addState('extractError', 'extractData', 'retry', transition);
    this.addState('extractData', 'success', 'retry', transition);
    this.addState('restart', 'build', 'error', transition);
    this.addState('success', 'complete', 'complete', transition);
    this.addState('error', 'complete', 'complete', transition);
    this.addState('complete', null, null, transition);
  };
  fsm.setupStates();
  AWS.Request = inherit({
    constructor: function Request(service, operation, params) {
      var endpoint = service.endpoint;
      var region = service.config.region;
      var customUserAgent = service.config.customUserAgent;
      if (service.isGlobalEndpoint)
        region = 'us-east-1';
      this.domain = domain && domain.active;
      this.service = service;
      this.operation = operation;
      this.params = params || {};
      this.httpRequest = new AWS.HttpRequest(endpoint, region, customUserAgent);
      this.startTime = AWS.util.date.getDate();
      this.response = new AWS.Response(this);
      this._asm = new AcceptorStateMachine(fsm.states, 'validate');
      this._haltHandlersOnError = false;
      AWS.SequentialExecutor.call(this);
      this.emit = this.emitEvent;
    },
    send: function send(callback) {
      if (callback) {
        this.on('complete', function(resp) {
          callback.call(resp, resp.error, resp.data);
        });
      }
      this.runTo();
      return this.response;
    },
    build: function build(callback) {
      return this.runTo('send', callback);
    },
    runTo: function runTo(state, done) {
      this._asm.runTo(state, done, this);
      return this;
    },
    abort: function abort() {
      this.removeAllListeners('validateResponse');
      this.removeAllListeners('extractError');
      this.on('validateResponse', function addAbortedError(resp) {
        resp.error = AWS.util.error(new Error('Request aborted by user'), {
          code: 'RequestAbortedError',
          retryable: false
        });
      });
      if (this.httpRequest.stream) {
        this.httpRequest.stream.abort();
        if (this.httpRequest._abortCallback) {
          this.httpRequest._abortCallback();
        } else {
          this.removeAllListeners('send');
        }
      }
      return this;
    },
    eachPage: function eachPage(callback) {
      callback = AWS.util.fn.makeAsync(callback, 3);
      function wrappedCallback(response) {
        callback.call(response, response.error, response.data, function(result) {
          if (result === false)
            return;
          if (response.hasNextPage()) {
            response.nextPage().on('complete', wrappedCallback).send();
          } else {
            callback.call(response, null, null, AWS.util.fn.noop);
          }
        });
      }
      this.on('complete', wrappedCallback).send();
    },
    eachItem: function eachItem(callback) {
      var self = this;
      function wrappedCallback(err, data) {
        if (err)
          return callback(err, null);
        if (data === null)
          return callback(null, null);
        var config = self.service.paginationConfig(self.operation);
        var resultKey = config.resultKey;
        if (Array.isArray(resultKey))
          resultKey = resultKey[0];
        var items = jmespath.search(data, resultKey);
        AWS.util.arrayEach(items, function(item) {
          callback(null, item);
        });
      }
      this.eachPage(wrappedCallback);
    },
    isPageable: function isPageable() {
      return this.service.paginationConfig(this.operation) ? true : false;
    },
    createReadStream: function createReadStream() {
      var streams = AWS.util.nodeRequire('stream');
      var req = this;
      var stream = null;
      if (AWS.HttpClient.streamsApiVersion === 2) {
        stream = new streams.PassThrough();
        req.send();
      } else {
        stream = new streams.Stream();
        stream.readable = true;
        stream.sent = false;
        stream.on('newListener', function(event) {
          if (!stream.sent && event === 'data') {
            stream.sent = true;
            process.nextTick(function() {
              req.send();
            });
          }
        });
      }
      this.on('httpHeaders', function streamHeaders(statusCode, headers, resp) {
        if (statusCode < 300) {
          req.removeListener('httpData', AWS.EventListeners.Core.HTTP_DATA);
          req.removeListener('httpError', AWS.EventListeners.Core.HTTP_ERROR);
          req.on('httpError', function streamHttpError(error) {
            resp.error = error;
            resp.error.retryable = false;
          });
          var httpStream = resp.httpResponse.createUnbufferedStream();
          if (AWS.HttpClient.streamsApiVersion === 2) {
            httpStream.pipe(stream);
          } else {
            httpStream.on('data', function(arg) {
              stream.emit('data', arg);
            });
            httpStream.on('end', function() {
              stream.emit('end');
            });
          }
          httpStream.on('error', function(err) {
            stream.emit('error', err);
          });
        }
      });
      this.on('error', function(err) {
        stream.emit('error', err);
      });
      return stream;
    },
    emitEvent: function emit(eventName, args, done) {
      if (typeof args === 'function') {
        done = args;
        args = null;
      }
      if (!done)
        done = function() {};
      if (!args)
        args = this.eventParameters(eventName, this.response);
      var origEmit = AWS.SequentialExecutor.prototype.emit;
      origEmit.call(this, eventName, args, function(err) {
        if (err)
          this.response.error = err;
        done.call(this, err);
      });
    },
    eventParameters: function eventParameters(eventName) {
      switch (eventName) {
        case 'restart':
        case 'validate':
        case 'sign':
        case 'build':
        case 'afterValidate':
        case 'afterBuild':
          return [this];
        case 'error':
          return [this.response.error, this.response];
        default:
          return [this.response];
      }
    },
    presign: function presign(expires, callback) {
      if (!callback && typeof expires === 'function') {
        callback = expires;
        expires = null;
      }
      return new AWS.Signers.Presign().sign(this.toGet(), expires, callback);
    },
    toUnauthenticated: function toUnauthenticated() {
      this.removeListener('validate', AWS.EventListeners.Core.VALIDATE_CREDENTIALS);
      this.removeListener('sign', AWS.EventListeners.Core.SIGN);
      return this;
    },
    toGet: function toGet() {
      if (this.service.api.protocol === 'query' || this.service.api.protocol === 'ec2') {
        this.removeListener('build', this.buildAsGet);
        this.addListener('build', this.buildAsGet);
      }
      return this;
    },
    buildAsGet: function buildAsGet(request) {
      request.httpRequest.method = 'GET';
      request.httpRequest.path = request.service.endpoint.path + '?' + request.httpRequest.body;
      request.httpRequest.body = '';
      delete request.httpRequest.headers['Content-Length'];
      delete request.httpRequest.headers['Content-Type'];
    },
    haltHandlersOnError: function haltHandlersOnError() {
      this._haltHandlersOnError = true;
    }
  });
  AWS.util.addPromisesToRequests(AWS.Request);
  AWS.util.mixin(AWS.Request, AWS.SequentialExecutor);
})(require('buffer').Buffer, require('process'));
