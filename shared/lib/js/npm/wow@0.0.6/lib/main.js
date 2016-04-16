/* */ 
(function(process) {
  var com = require('./command');
  var args = process.argv.slice(0);
  new com.commands(args).init();
})(require('process'));
