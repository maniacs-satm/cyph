/* */ 
(function(process) {
  require('./config');
  var fs = require('fs');
  exports.Host = function() {
    if (process.platform === "win32") {}
  };
})(require('process'));
