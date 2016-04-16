/* */ 
var AWS = require('./core');
AWS.Credentials = AWS.util.inherit({
  constructor: function Credentials() {
    AWS.util.hideProperties(this, ['secretAccessKey']);
    this.expired = false;
    this.expireTime = null;
    if (arguments.length === 1 && typeof arguments[0] === 'object') {
      var creds = arguments[0].credentials || arguments[0];
      this.accessKeyId = creds.accessKeyId;
      this.secretAccessKey = creds.secretAccessKey;
      this.sessionToken = creds.sessionToken;
    } else {
      this.accessKeyId = arguments[0];
      this.secretAccessKey = arguments[1];
      this.sessionToken = arguments[2];
    }
  },
  expiryWindow: 15,
  needsRefresh: function needsRefresh() {
    var currentTime = AWS.util.date.getDate().getTime();
    var adjustedTime = new Date(currentTime + this.expiryWindow * 1000);
    if (this.expireTime && adjustedTime > this.expireTime) {
      return true;
    } else {
      return this.expired || !this.accessKeyId || !this.secretAccessKey;
    }
  },
  get: function get(callback) {
    var self = this;
    if (this.needsRefresh()) {
      this.refresh(function(err) {
        if (!err)
          self.expired = false;
        if (callback)
          callback(err);
      });
    } else if (callback) {
      callback();
    }
  },
  refresh: function refresh(callback) {
    this.expired = false;
    callback();
  }
});
