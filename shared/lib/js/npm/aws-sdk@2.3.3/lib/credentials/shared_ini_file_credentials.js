/* */ 
(function(process) {
  var AWS = require('../core');
  var path = require('path');
  AWS.SharedIniFileCredentials = AWS.util.inherit(AWS.Credentials, {
    constructor: function SharedIniFileCredentials(options) {
      AWS.Credentials.call(this);
      options = options || {};
      this.filename = options.filename;
      this.profile = options.profile || process.env.AWS_PROFILE || 'default';
      this.get(function() {});
    },
    refresh: function refresh(callback) {
      if (!callback)
        callback = function(err) {
          if (err)
            throw err;
        };
      try {
        if (!this.filename)
          this.loadDefaultFilename();
        var creds = AWS.util.ini.parse(AWS.util.readFileSync(this.filename));
        if (typeof creds[this.profile] === 'object') {
          this.accessKeyId = creds[this.profile]['aws_access_key_id'];
          this.secretAccessKey = creds[this.profile]['aws_secret_access_key'];
          this.sessionToken = creds[this.profile]['aws_session_token'];
        }
        if (!this.accessKeyId || !this.secretAccessKey) {
          throw new Error('Credentials not set in ' + this.filename + ' using profile ' + this.profile);
        }
        this.expired = false;
        callback();
      } catch (err) {
        callback(err);
      }
    },
    loadDefaultFilename: function loadDefaultFilename() {
      var env = process.env;
      var home = env.HOME || env.USERPROFILE || (env.HOMEPATH ? ((env.HOMEDRIVE || 'C:/') + env.HOMEPATH) : null);
      if (!home) {
        throw AWS.util.error(new Error('Cannot load credentials, HOME path not set'));
      }
      this.filename = path.join(home, '.aws', 'credentials');
    }
  });
})(require('process'));
