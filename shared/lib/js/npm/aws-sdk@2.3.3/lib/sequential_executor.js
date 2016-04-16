/* */ 
var AWS = require('./core');
AWS.SequentialExecutor = AWS.util.inherit({
  constructor: function SequentialExecutor() {
    this._events = {};
  },
  listeners: function listeners(eventName) {
    return this._events[eventName] ? this._events[eventName].slice(0) : [];
  },
  on: function on(eventName, listener) {
    if (this._events[eventName]) {
      this._events[eventName].push(listener);
    } else {
      this._events[eventName] = [listener];
    }
    return this;
  },
  onAsync: function onAsync(eventName, listener) {
    listener._isAsync = true;
    return this.on(eventName, listener);
  },
  removeListener: function removeListener(eventName, listener) {
    var listeners = this._events[eventName];
    if (listeners) {
      var length = listeners.length;
      var position = -1;
      for (var i = 0; i < length; ++i) {
        if (listeners[i] === listener) {
          position = i;
        }
      }
      if (position > -1) {
        listeners.splice(position, 1);
      }
    }
    return this;
  },
  removeAllListeners: function removeAllListeners(eventName) {
    if (eventName) {
      delete this._events[eventName];
    } else {
      this._events = {};
    }
    return this;
  },
  emit: function emit(eventName, eventArgs, doneCallback) {
    if (!doneCallback)
      doneCallback = function() {};
    var listeners = this.listeners(eventName);
    var count = listeners.length;
    this.callListeners(listeners, eventArgs, doneCallback);
    return count > 0;
  },
  callListeners: function callListeners(listeners, args, doneCallback, prevError) {
    var self = this;
    var error = prevError || null;
    function callNextListener(err) {
      if (err) {
        error = AWS.util.error(error || new Error(), err);
        if (self._haltHandlersOnError) {
          return doneCallback.call(self, error);
        }
      }
      self.callListeners(listeners, args, doneCallback, error);
    }
    while (listeners.length > 0) {
      var listener = listeners.shift();
      if (listener._isAsync) {
        listener.apply(self, args.concat([callNextListener]));
        return;
      } else {
        try {
          listener.apply(self, args);
        } catch (err) {
          error = AWS.util.error(error || new Error(), err);
        }
        if (error && self._haltHandlersOnError) {
          doneCallback.call(self, error);
          return;
        }
      }
    }
    doneCallback.call(self, error);
  },
  addListeners: function addListeners(listeners) {
    var self = this;
    if (listeners._events)
      listeners = listeners._events;
    AWS.util.each(listeners, function(event, callbacks) {
      if (typeof callbacks === 'function')
        callbacks = [callbacks];
      AWS.util.arrayEach(callbacks, function(callback) {
        self.on(event, callback);
      });
    });
    return self;
  },
  addNamedListener: function addNamedListener(name, eventName, callback) {
    this[name] = callback;
    this.addListener(eventName, callback);
    return this;
  },
  addNamedAsyncListener: function addNamedAsyncListener(name, eventName, callback) {
    callback._isAsync = true;
    return this.addNamedListener(name, eventName, callback);
  },
  addNamedListeners: function addNamedListeners(callback) {
    var self = this;
    callback(function() {
      self.addNamedListener.apply(self, arguments);
    }, function() {
      self.addNamedAsyncListener.apply(self, arguments);
    });
    return this;
  }
});
AWS.SequentialExecutor.prototype.addListener = AWS.SequentialExecutor.prototype.on;
module.exports = AWS.SequentialExecutor;
