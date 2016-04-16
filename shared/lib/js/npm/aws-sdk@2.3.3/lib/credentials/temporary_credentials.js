/* */ 
var AWS = require('../core');
AWS.TemporaryCredentials = AWS.util.inherit(AWS.Credentials, {
  constructor: function TemporaryCredentials(params) {
    AWS.Credentials.call(this);
    this.loadMasterCredentials();
    this.expired = true;
    this.params = params || {};
    if (this.params.RoleArn) {
      this.params.RoleSessionName = this.params.RoleSessionName || 'temporary-credentials';
    }
  },
  refresh: function refresh(callback) {
    var self = this;
    self.createClients();
    if (!callback)
      callback = function(err) {
        if (err)
          throw err;
      };
    self.service.config.credentials = self.masterCredentials;
    var operation = self.params.RoleArn ? self.service.assumeRole : self.service.getSessionToken;
    operation.call(self.service, function(err, data) {
      if (!err) {
        self.service.credentialsFrom(data, self);
      }
      callback(err);
    });
  },
  loadMasterCredentials: function loadMasterCredentials() {
    this.masterCredentials = AWS.config.credentials;
    while (this.masterCredentials.masterCredentials) {
      this.masterCredentials = this.masterCredentials.masterCredentials;
    }
  },
  createClients: function() {
    this.service = this.service || new AWS.STS({params: this.params});
  }
});
