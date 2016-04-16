/* */ 
(function(Buffer) {
  var AWS = require('../core');
  var Translator = require('./translator');
  var DynamoDBSet = require('./set');
  AWS.DynamoDB.DocumentClient = AWS.util.inherit({
    operations: {
      batchGetItem: 'batchGet',
      batchWriteItem: 'batchWrite',
      putItem: 'put',
      getItem: 'get',
      deleteItem: 'delete',
      updateItem: 'update',
      scan: 'scan',
      query: 'query'
    },
    constructor: function DocumentClient(options) {
      var self = this;
      self.options = options || {};
      self.configure(self.options);
    },
    configure: function configure(options) {
      var self = this;
      self.service = options.service;
      self.bindServiceObject(options);
      self.attrValue = self.service.api.operations.putItem.input.members.Item.value.shape;
    },
    bindServiceObject: function bindServiceObject(options) {
      var self = this;
      options = options || {};
      if (!self.service) {
        self.service = new AWS.DynamoDB(options);
      } else {
        var config = AWS.util.copy(self.service.config);
        self.service = new self.service.constructor.__super__(config);
        self.service.config.params = AWS.util.merge(self.service.config.params || {}, options.params);
      }
    },
    batchGet: function(params, callback) {
      var self = this;
      var request = self.service.batchGetItem(params);
      self.setupRequest(request);
      self.setupResponse(request);
      if (typeof callback === 'function') {
        request.send(callback);
      }
      return request;
    },
    batchWrite: function(params, callback) {
      var self = this;
      var request = self.service.batchWriteItem(params);
      self.setupRequest(request);
      self.setupResponse(request);
      if (typeof callback === 'function') {
        request.send(callback);
      }
      return request;
    },
    delete: function(params, callback) {
      var self = this;
      var request = self.service.deleteItem(params);
      self.setupRequest(request);
      self.setupResponse(request);
      if (typeof callback === 'function') {
        request.send(callback);
      }
      return request;
    },
    get: function(params, callback) {
      var self = this;
      var request = self.service.getItem(params);
      self.setupRequest(request);
      self.setupResponse(request);
      if (typeof callback === 'function') {
        request.send(callback);
      }
      return request;
    },
    put: function put(params, callback) {
      var self = this;
      var request = self.service.putItem(params);
      self.setupRequest(request);
      self.setupResponse(request);
      if (typeof callback === 'function') {
        request.send(callback);
      }
      return request;
    },
    update: function(params, callback) {
      var self = this;
      var request = self.service.updateItem(params);
      self.setupRequest(request);
      self.setupResponse(request);
      if (typeof callback === 'function') {
        request.send(callback);
      }
      return request;
    },
    scan: function(params, callback) {
      var self = this;
      var request = self.service.scan(params);
      self.setupRequest(request);
      self.setupResponse(request);
      if (typeof callback === 'function') {
        request.send(callback);
      }
      return request;
    },
    query: function(params, callback) {
      var self = this;
      var request = self.service.query(params);
      self.setupRequest(request);
      self.setupResponse(request);
      if (typeof callback === 'function') {
        request.send(callback);
      }
      return request;
    },
    createSet: function(list, options) {
      options = options || {};
      return new DynamoDBSet(list, options);
    },
    getTranslator: function() {
      return new Translator({attrValue: this.attrValue});
    },
    setupRequest: function setupRequest(request) {
      var self = this;
      var translator = self.getTranslator();
      var operation = request.operation;
      var inputShape = request.service.api.operations[operation].input;
      request._events.validate.unshift(function(req) {
        req.rawParams = AWS.util.copy(req.params);
        req.params = translator.translateInput(req.rawParams, inputShape);
      });
    },
    setupResponse: function setupResponse(request) {
      var self = this;
      var translator = self.getTranslator();
      var outputShape = self.service.api.operations[request.operation].output;
      request.on('extractData', function(response) {
        response.data = translator.translateOutput(response.data, outputShape);
      });
      var response = request.response;
      response.nextPage = function(cb) {
        var resp = this;
        var req = resp.request;
        var config;
        var service = req.service;
        var operation = req.operation;
        try {
          config = service.paginationConfig(operation, true);
        } catch (e) {
          resp.error = e;
        }
        if (!resp.hasNextPage()) {
          if (cb)
            cb(resp.error, null);
          else if (resp.error)
            throw resp.error;
          return null;
        }
        var params = AWS.util.copy(req.rawParams);
        if (!resp.nextPageTokens) {
          return cb ? cb(null, null) : null;
        } else {
          var inputTokens = config.inputToken;
          if (typeof inputTokens === 'string')
            inputTokens = [inputTokens];
          for (var i = 0; i < inputTokens.length; i++) {
            params[inputTokens[i]] = resp.nextPageTokens[i];
          }
          return self[operation](params, cb);
        }
      };
    }
  });
  module.exports = AWS.DynamoDB.DocumentClient;
})(require('buffer').Buffer);
