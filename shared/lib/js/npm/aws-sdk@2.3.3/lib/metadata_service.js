/* */ 
(function(process) {
  var AWS = require('./core');
  require('./http');
  var inherit = AWS.util.inherit;
  AWS.MetadataService = inherit({
    host: '169.254.169.254',
    httpOptions: {timeout: 0},
    constructor: function MetadataService(options) {
      AWS.util.update(this, options);
    },
    request: function request(path, callback) {
      path = path || '/';
      var data = '';
      var http = AWS.HttpClient.getInstance();
      var httpRequest = new AWS.HttpRequest('http://' + this.host + path);
      httpRequest.method = 'GET';
      var httpOptions = this.httpOptions;
      process.nextTick(function() {
        http.handleRequest(httpRequest, httpOptions, function(httpResponse) {
          httpResponse.on('data', function(chunk) {
            data += chunk.toString();
          });
          httpResponse.on('end', function() {
            callback(null, data);
          });
        }, callback);
      });
    },
    loadCredentialsCallbacks: [],
    loadCredentials: function loadCredentials(callback) {
      var self = this;
      var basePath = '/latest/meta-data/iam/security-credentials/';
      self.loadCredentialsCallbacks.push(callback);
      if (self.loadCredentialsCallbacks.length > 1) {
        return;
      }
      function callbacks(err, creds) {
        var cb;
        while ((cb = self.loadCredentialsCallbacks.shift()) !== undefined) {
          cb(err, creds);
        }
      }
      self.request(basePath, function(err, roleName) {
        if (err)
          callbacks(err);
        else {
          roleName = roleName.split('\n')[0];
          self.request(basePath + roleName, function(credErr, credData) {
            if (credErr)
              callbacks(credErr);
            else {
              try {
                var credentials = JSON.parse(credData);
                callbacks(null, credentials);
              } catch (parseError) {
                callbacks(parseError);
              }
            }
          });
        }
      });
    }
  });
  module.exports = AWS.MetadataService;
})(require('process'));
