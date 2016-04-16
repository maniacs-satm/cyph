/* */ 
(function(process) {
  var AWS = require('./core');
  var inherit = AWS.util.inherit;
  AWS.Endpoint = inherit({constructor: function Endpoint(endpoint, config) {
      AWS.util.hideProperties(this, ['slashes', 'auth', 'hash', 'search', 'query']);
      if (typeof endpoint === 'undefined' || endpoint === null) {
        throw new Error('Invalid endpoint: ' + endpoint);
      } else if (typeof endpoint !== 'string') {
        return AWS.util.copy(endpoint);
      }
      if (!endpoint.match(/^http/)) {
        var useSSL = config && config.sslEnabled !== undefined ? config.sslEnabled : AWS.config.sslEnabled;
        endpoint = (useSSL ? 'https' : 'http') + '://' + endpoint;
      }
      AWS.util.update(this, AWS.util.urlParse(endpoint));
      if (this.port) {
        this.port = parseInt(this.port, 10);
      } else {
        this.port = this.protocol === 'https:' ? 443 : 80;
      }
    }});
  AWS.HttpRequest = inherit({
    constructor: function HttpRequest(endpoint, region, customUserAgent) {
      endpoint = new AWS.Endpoint(endpoint);
      this.method = 'POST';
      this.path = endpoint.path || '/';
      this.headers = {};
      this.body = '';
      this.endpoint = endpoint;
      this.region = region;
      this.setUserAgent(customUserAgent);
    },
    setUserAgent: function setUserAgent(customUserAgent) {
      var prefix = AWS.util.isBrowser() ? 'X-Amz-' : '';
      var customSuffix = '';
      if (typeof customUserAgent === 'string' && customUserAgent) {
        customSuffix += ' ' + customUserAgent;
      }
      this.headers[prefix + 'User-Agent'] = AWS.util.userAgent() + customSuffix;
    },
    pathname: function pathname() {
      return this.path.split('?', 1)[0];
    },
    search: function search() {
      var query = this.path.split('?', 2)[1];
      if (query) {
        query = AWS.util.queryStringParse(query);
        return AWS.util.queryParamsToString(query);
      }
      return '';
    }
  });
  AWS.HttpResponse = inherit({
    constructor: function HttpResponse() {
      this.statusCode = undefined;
      this.headers = {};
      this.body = undefined;
      this.streaming = false;
      this.stream = null;
    },
    createUnbufferedStream: function createUnbufferedStream() {
      this.streaming = true;
      return this.stream;
    }
  });
  AWS.HttpClient = inherit({});
  AWS.HttpClient.getInstance = function getInstance() {
    if (this.singleton === undefined) {
      this.singleton = new this();
    }
    return this.singleton;
  };
})(require('process'));
