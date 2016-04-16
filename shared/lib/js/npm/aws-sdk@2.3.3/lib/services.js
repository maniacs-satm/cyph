/* */ 
var fs = require('fs');
var path = require('path');
var AWS = require('./core');
var apis = require('./api_loader');
apis.services.forEach(function(identifier) {
  var name = apis.serviceName(identifier);
  var versions = apis.serviceVersions(identifier);
  AWS[name] = AWS.Service.defineService(identifier, versions);
  var svcFile = path.join(__dirname, 'services', identifier + '.js');
  if (fs.existsSync(svcFile))
    require('./services/' + identifier);
});
