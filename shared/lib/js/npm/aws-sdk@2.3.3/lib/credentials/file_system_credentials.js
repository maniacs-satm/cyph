/* */ 
var AWS = require('../core');
AWS.FileSystemCredentials = AWS.util.inherit(AWS.Credentials, {
  constructor: function FileSystemCredentials(filename) {
    AWS.Credentials.call(this);
    this.filename = filename;
    this.get(function() {});
  },
  refresh: function refresh(callback) {
    if (!callback)
      callback = function(err) {
        if (err)
          throw err;
      };
    try {
      var creds = JSON.parse(AWS.util.readFileSync(this.filename));
      AWS.Credentials.call(this, creds);
      if (!this.accessKeyId || !this.secretAccessKey) {
        throw new Error('Credentials not set in ' + this.filename);
      }
      this.expired = false;
      callback();
    } catch (err) {
      callback(err);
    }
  }
});
