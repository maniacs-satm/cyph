/* */ 
(function(process) {
  var AWS = require('../core');
  AWS.EnvironmentCredentials = AWS.util.inherit(AWS.Credentials, {
    constructor: function EnvironmentCredentials(envPrefix) {
      AWS.Credentials.call(this);
      this.envPrefix = envPrefix;
      this.get(function() {});
    },
    refresh: function refresh(callback) {
      if (!callback)
        callback = function(err) {
          if (err)
            throw err;
        };
      if (process === undefined) {
        callback(new Error('No process info available'));
        return;
      }
      var keys = ['ACCESS_KEY_ID', 'SECRET_ACCESS_KEY', 'SESSION_TOKEN'];
      var values = [];
      for (var i = 0; i < keys.length; i++) {
        var prefix = '';
        if (this.envPrefix)
          prefix = this.envPrefix + '_';
        values[i] = process.env[prefix + keys[i]];
        if (!values[i] && keys[i] !== 'SESSION_TOKEN') {
          callback(new Error('Variable ' + prefix + keys[i] + ' not set.'));
          return;
        }
      }
      this.expired = false;
      AWS.Credentials.apply(this, values);
      callback();
    }
  });
})(require('process'));
