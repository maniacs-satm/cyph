/* */ 
var AWS = require('../core');
require('../metadata_service');
AWS.EC2MetadataCredentials = AWS.util.inherit(AWS.Credentials, {
  constructor: function EC2MetadataCredentials(options) {
    AWS.Credentials.call(this);
    options = options ? AWS.util.copy(options) : {};
    if (!options.httpOptions)
      options.httpOptions = {};
    options.httpOptions = AWS.util.merge({timeout: this.defaultTimeout}, options.httpOptions);
    this.metadataService = new AWS.MetadataService(options);
    this.metadata = {};
  },
  defaultTimeout: 1000,
  refresh: function refresh(callback) {
    var self = this;
    if (!callback)
      callback = function(err) {
        if (err)
          throw err;
      };
    self.metadataService.loadCredentials(function(err, creds) {
      if (!err) {
        self.expired = false;
        self.metadata = creds;
        self.accessKeyId = creds.AccessKeyId;
        self.secretAccessKey = creds.SecretAccessKey;
        self.sessionToken = creds.Token;
        self.expireTime = new Date(creds.Expiration);
      }
      callback(err);
    });
  }
});
