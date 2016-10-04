/* */ 
"use strict";
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
describe('Observable.never', function() {
  asDiagram('never')('should create a cold observable that never emits', function() {
    var expected = '-';
    var e1 = Observable.never();
    expectObservable(e1).toBe(expected);
  });
});
