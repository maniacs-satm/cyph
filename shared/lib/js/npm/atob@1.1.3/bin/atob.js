/* */ 
(function(process) {
  (function() {
    "use strict";
    var atob = require('../index');
    ;
    console.log(atob(process.argv[2]));
  }());
})(require('process'));
