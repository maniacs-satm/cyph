/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../dist/cjs/Rx');
describe('Root Module', function() {
  it('should contain exports from commonjs modules', function() {
    chai_1.expect(Rx.Observable).to.be.a('function');
  });
});