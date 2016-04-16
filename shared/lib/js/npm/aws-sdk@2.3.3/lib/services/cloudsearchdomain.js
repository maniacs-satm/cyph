/* */ 
var AWS = require('../core');
AWS.util.update(AWS.CloudSearchDomain.prototype, {
  validateService: function validateService() {
    if (!this.config.endpoint || this.config.endpoint.indexOf('{') >= 0) {
      var msg = 'AWS.CloudSearchDomain requires an explicit ' + '`endpoint\' configuration option.';
      throw AWS.util.error(new Error(), {
        name: 'InvalidEndpoint',
        message: msg
      });
    }
  },
  setupRequestListeners: function setupRequestListeners(request) {
    request.removeListener('validate', AWS.EventListeners.Core.VALIDATE_CREDENTIALS);
    request.onAsync('validate', this.validateCredentials);
    request.addListener('validate', this.updateRegion);
  },
  validateCredentials: function(req, done) {
    if (!req.service.api.signatureVersion)
      return done();
    req.service.config.getCredentials(function(err) {
      if (err) {
        req.removeListener('sign', AWS.EventListeners.Core.SIGN);
      }
      done();
    });
  },
  updateRegion: function updateRegion(request) {
    var endpoint = request.httpRequest.endpoint.hostname;
    var zones = endpoint.split('.');
    request.httpRequest.region = zones[1] || request.httpRequest.region;
  }
});
