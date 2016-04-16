/* */ 
(function(process) {
  var AWS = require('./core');
  module.exports = AWS;
  AWS.apiLoader = require('./api_loader').load;
  AWS.XML.Parser = require('./xml/node_parser');
  require('./http/node');
  require('./services');
  require('./credentials/ec2_metadata_credentials');
  require('./credentials/environment_credentials');
  require('./credentials/file_system_credentials');
  require('./credentials/shared_ini_file_credentials');
  AWS.CredentialProviderChain.defaultProviders = [function() {
    return new AWS.EnvironmentCredentials('AWS');
  }, function() {
    return new AWS.EnvironmentCredentials('AMAZON');
  }, function() {
    return new AWS.SharedIniFileCredentials();
  }, function() {
    return new AWS.EC2MetadataCredentials();
  }];
  AWS.util.update(AWS.Config.prototype.keys, {
    credentials: function() {
      var credentials = null;
      new AWS.CredentialProviderChain([function() {
        return new AWS.EnvironmentCredentials('AWS');
      }, function() {
        return new AWS.EnvironmentCredentials('AMAZON');
      }, function() {
        return new AWS.SharedIniFileCredentials();
      }]).resolve(function(err, creds) {
        if (!err)
          credentials = creds;
      });
      return credentials;
    },
    credentialProvider: function() {
      return new AWS.CredentialProviderChain();
    },
    region: function() {
      return process.env.AWS_REGION || process.env.AMAZON_REGION;
    }
  });
  AWS.config = new AWS.Config();
})(require('process'));
