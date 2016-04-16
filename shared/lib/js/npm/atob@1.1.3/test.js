/* */ 
(function() {
  "use strict";
  var atob = require('./index'),
      encoded = "SGVsbG8gV29ybGQ=",
      unencoded = "Hello World";
  ;
  if (unencoded !== atob(encoded)) {
    console.log('[FAIL]', unencoded, atob(encoded));
    return;
  }
  console.log('[PASS] all tests pass');
}());
