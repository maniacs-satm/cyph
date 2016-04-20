/* */ 
"use strict";
var mergeMapTo_1 = require('./mergeMapTo');
function concatMapTo(innerObservable, resultSelector) {
  return this.lift(new mergeMapTo_1.MergeMapToOperator(innerObservable, resultSelector, 1));
}
exports.concatMapTo = concatMapTo;
