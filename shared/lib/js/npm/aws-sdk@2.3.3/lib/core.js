/* */ 
var AWS = {util: require('./util')};
var _hidden = {};
_hidden.toString();
module.exports = AWS;
AWS.util.update(AWS, {
  VERSION: '2.3.3',
  Signers: {},
  Protocol: {
    Json: require('./protocol/json'),
    Query: require('./protocol/query'),
    Rest: require('./protocol/rest'),
    RestJson: require('./protocol/rest_json'),
    RestXml: require('./protocol/rest_xml')
  },
  XML: {
    Builder: require('./xml/builder'),
    Parser: null
  },
  JSON: {
    Builder: require('./json/builder'),
    Parser: require('./json/parser')
  },
  Model: {
    Api: require('./model/api'),
    Operation: require('./model/operation'),
    Shape: require('./model/shape'),
    Paginator: require('./model/paginator'),
    ResourceWaiter: require('./model/resource_waiter')
  },
  util: require('./util'),
  apiLoader: function() {
    throw new Error('No API loader set');
  }
});
require('./service');
require('./credentials');
require('./credentials/credential_provider_chain');
require('./credentials/temporary_credentials');
require('./credentials/web_identity_credentials');
require('./credentials/cognito_identity_credentials');
require('./credentials/saml_credentials');
require('./config');
require('./http');
require('./sequential_executor');
require('./event_listeners');
require('./request');
require('./response');
require('./resource_waiter');
require('./signers/request_signer');
require('./param_validator');
AWS.events = new AWS.SequentialExecutor();
