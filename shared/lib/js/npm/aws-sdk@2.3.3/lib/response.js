/* */ 
var AWS = require('./core');
var inherit = AWS.util.inherit;
var jmespath = require('jmespath');
AWS.Response = inherit({
  constructor: function Response(request) {
    this.request = request;
    this.data = null;
    this.error = null;
    this.retryCount = 0;
    this.redirectCount = 0;
    this.httpResponse = new AWS.HttpResponse();
    if (request) {
      this.maxRetries = request.service.numRetries();
      this.maxRedirects = request.service.config.maxRedirects;
    }
  },
  nextPage: function nextPage(callback) {
    var config;
    var service = this.request.service;
    var operation = this.request.operation;
    try {
      config = service.paginationConfig(operation, true);
    } catch (e) {
      this.error = e;
    }
    if (!this.hasNextPage()) {
      if (callback)
        callback(this.error, null);
      else if (this.error)
        throw this.error;
      return null;
    }
    var params = AWS.util.copy(this.request.params);
    if (!this.nextPageTokens) {
      return callback ? callback(null, null) : null;
    } else {
      var inputTokens = config.inputToken;
      if (typeof inputTokens === 'string')
        inputTokens = [inputTokens];
      for (var i = 0; i < inputTokens.length; i++) {
        params[inputTokens[i]] = this.nextPageTokens[i];
      }
      return service.makeRequest(this.request.operation, params, callback);
    }
  },
  hasNextPage: function hasNextPage() {
    this.cacheNextPageTokens();
    if (this.nextPageTokens)
      return true;
    if (this.nextPageTokens === undefined)
      return undefined;
    else
      return false;
  },
  cacheNextPageTokens: function cacheNextPageTokens() {
    if (this.hasOwnProperty('nextPageTokens'))
      return this.nextPageTokens;
    this.nextPageTokens = undefined;
    var config = this.request.service.paginationConfig(this.request.operation);
    if (!config)
      return this.nextPageTokens;
    this.nextPageTokens = null;
    if (config.moreResults) {
      if (!jmespath.search(this.data, config.moreResults)) {
        return this.nextPageTokens;
      }
    }
    var exprs = config.outputToken;
    if (typeof exprs === 'string')
      exprs = [exprs];
    AWS.util.arrayEach.call(this, exprs, function(expr) {
      var output = jmespath.search(this.data, expr);
      if (output) {
        this.nextPageTokens = this.nextPageTokens || [];
        this.nextPageTokens.push(output);
      }
    });
    return this.nextPageTokens;
  }
});
