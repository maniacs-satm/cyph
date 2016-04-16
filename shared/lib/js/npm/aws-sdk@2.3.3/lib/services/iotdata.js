/* */ 
var AWS = require('../core');
AWS.util.update(AWS.IotData.prototype, {
  validateService: function validateService() {
    if (!this.config.endpoint || this.config.endpoint.indexOf('{') >= 0) {
      var msg = 'AWS.IotData requires an explicit ' + '`endpoint\' configuration option.';
      throw AWS.util.error(new Error(), {
        name: 'InvalidEndpoint',
        message: msg
      });
    }
  },
  setupRequestListeners: function setupRequestListeners(request) {
    request.addListener('validateResponse', this.validateResponseBody);
  },
  validateResponseBody: function validateResponseBody(resp) {
    var body = resp.httpResponse.body.toString() || '{}';
    var bodyCheck = body.trim();
    if (!bodyCheck || bodyCheck.charAt(0) !== '{') {
      resp.httpResponse.body = '';
    }
  }
});
