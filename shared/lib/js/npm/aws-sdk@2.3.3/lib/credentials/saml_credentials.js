/* */ 
var AWS = require('../core');
AWS.SAMLCredentials = AWS.util.inherit(AWS.Credentials, {
  constructor: function SAMLCredentials(params) {
    AWS.Credentials.call(this);
    this.expired = true;
    this.params = params;
  },
  refresh: function refresh(callback) {
    var self = this;
    self.createClients();
    if (!callback)
      callback = function(err) {
        if (err)
          throw err;
      };
    self.service.assumeRoleWithSAML(function(err, data) {
      if (!err) {
        self.service.credentialsFrom(data, self);
      }
      callback(err);
    });
  },
  createClients: function() {
    this.service = this.service || new AWS.STS({params: this.params});
  }
});
