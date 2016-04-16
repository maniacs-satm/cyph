/* */ 
var AWS = require('../core');
AWS.WebIdentityCredentials = AWS.util.inherit(AWS.Credentials, {
  constructor: function WebIdentityCredentials(params) {
    AWS.Credentials.call(this);
    this.expired = true;
    this.params = params;
    this.params.RoleSessionName = this.params.RoleSessionName || 'web-identity';
    this.data = null;
  },
  refresh: function refresh(callback) {
    var self = this;
    self.createClients();
    if (!callback)
      callback = function(err) {
        if (err)
          throw err;
      };
    self.service.assumeRoleWithWebIdentity(function(err, data) {
      self.data = null;
      if (!err) {
        self.data = data;
        self.service.credentialsFrom(data, self);
      }
      callback(err);
    });
  },
  createClients: function() {
    this.service = this.service || new AWS.STS({params: this.params});
  }
});
