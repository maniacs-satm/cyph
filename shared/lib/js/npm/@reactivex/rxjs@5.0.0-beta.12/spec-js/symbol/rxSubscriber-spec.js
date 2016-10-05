/* */ 
"use strict";
var chai_1 = require('chai');
var root_1 = require('../../dist/cjs/util/root');
var rxSubscriber_1 = require('../../dist/cjs/symbol/rxSubscriber');
describe('rxSubscriber symbol', function() {
  it('should exist in the proper form', function() {
    if (root_1.root.Symbol && root_1.root.Symbol.for) {
      chai_1.expect(rxSubscriber_1.$$rxSubscriber).to.equal(root_1.root.Symbol.for('rxSubscriber'));
    } else {
      chai_1.expect(rxSubscriber_1.$$rxSubscriber).to.equal('@@rxSubscriber');
    }
  });
});