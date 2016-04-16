/* */ 
var AWS = require('./core');
AWS.apiLoader = function(svc, version) {
  return AWS.apiLoader.services[svc][version];
};
AWS.apiLoader.services = {};
AWS.XML.Parser = require('./xml/browser_parser');
require('./http/xhr');
if (typeof window !== 'undefined')
  window.AWS = AWS;
if (typeof module !== 'undefined')
  module.exports = AWS;
if (typeof self !== 'undefined')
  self.AWS = AWS;
