/* */ 
var AWS = require('./core');
var Api = require('./model/api');
var regionConfig = require('./region_config');
var inherit = AWS.util.inherit;
AWS.Service = inherit({
  constructor: function Service(config) {
    if (!this.loadServiceClass) {
      throw AWS.util.error(new Error(), 'Service must be constructed with `new\' operator');
    }
    var ServiceClass = this.loadServiceClass(config || {});
    if (ServiceClass)
      return new ServiceClass(config);
    this.initialize(config);
  },
  initialize: function initialize(config) {
    var svcConfig = AWS.config[this.serviceIdentifier];
    this.config = new AWS.Config(AWS.config);
    if (svcConfig)
      this.config.update(svcConfig, true);
    if (config)
      this.config.update(config, true);
    this.validateService();
    if (!this.config.endpoint)
      regionConfig(this);
    this.config.endpoint = this.endpointFromTemplate(this.config.endpoint);
    this.setEndpoint(this.config.endpoint);
  },
  validateService: function validateService() {},
  loadServiceClass: function loadServiceClass(serviceConfig) {
    var config = serviceConfig;
    if (!AWS.util.isEmpty(this.api)) {
      return null;
    } else if (config.apiConfig) {
      return AWS.Service.defineServiceApi(this.constructor, config.apiConfig);
    } else if (!this.constructor.services) {
      return null;
    } else {
      config = new AWS.Config(AWS.config);
      config.update(serviceConfig, true);
      var version = config.apiVersions[this.constructor.serviceIdentifier];
      version = version || config.apiVersion;
      return this.getLatestServiceClass(version);
    }
  },
  getLatestServiceClass: function getLatestServiceClass(version) {
    version = this.getLatestServiceVersion(version);
    if (this.constructor.services[version] === null) {
      AWS.Service.defineServiceApi(this.constructor, version);
    }
    return this.constructor.services[version];
  },
  getLatestServiceVersion: function getLatestServiceVersion(version) {
    if (!this.constructor.services || this.constructor.services.length === 0) {
      throw new Error('No services defined on ' + this.constructor.serviceIdentifier);
    }
    if (!version) {
      version = 'latest';
    } else if (AWS.util.isType(version, Date)) {
      version = AWS.util.date.iso8601(version).split('T')[0];
    }
    if (Object.hasOwnProperty(this.constructor.services, version)) {
      return version;
    }
    var keys = Object.keys(this.constructor.services).sort();
    var selectedVersion = null;
    for (var i = keys.length - 1; i >= 0; i--) {
      if (keys[i][keys[i].length - 1] !== '*') {
        selectedVersion = keys[i];
      }
      if (keys[i].substr(0, 10) <= version) {
        return selectedVersion;
      }
    }
    throw new Error('Could not find ' + this.constructor.serviceIdentifier + ' API to satisfy version constraint `' + version + '\'');
  },
  api: {},
  defaultRetryCount: 3,
  makeRequest: function makeRequest(operation, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = null;
    }
    params = params || {};
    if (this.config.params) {
      var rules = this.api.operations[operation];
      if (rules) {
        params = AWS.util.copy(params);
        AWS.util.each(this.config.params, function(key, value) {
          if (rules.input.members[key]) {
            if (params[key] === undefined || params[key] === null) {
              params[key] = value;
            }
          }
        });
      }
    }
    var request = new AWS.Request(this, operation, params);
    this.addAllRequestListeners(request);
    if (callback)
      request.send(callback);
    return request;
  },
  makeUnauthenticatedRequest: function makeUnauthenticatedRequest(operation, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = {};
    }
    var request = this.makeRequest(operation, params).toUnauthenticated();
    return callback ? request.send(callback) : request;
  },
  waitFor: function waitFor(state, params, callback) {
    var waiter = new AWS.ResourceWaiter(this, state);
    return waiter.wait(params, callback);
  },
  addAllRequestListeners: function addAllRequestListeners(request) {
    var list = [AWS.events, AWS.EventListeners.Core, this.serviceInterface(), AWS.EventListeners.CorePost];
    for (var i = 0; i < list.length; i++) {
      if (list[i])
        request.addListeners(list[i]);
    }
    if (!this.config.paramValidation) {
      request.removeListener('validate', AWS.EventListeners.Core.VALIDATE_PARAMETERS);
    }
    if (this.config.logger) {
      request.addListeners(AWS.EventListeners.Logger);
    }
    this.setupRequestListeners(request);
  },
  setupRequestListeners: function setupRequestListeners() {},
  getSignerClass: function getSignerClass() {
    var version;
    if (this.config.signatureVersion) {
      version = this.config.signatureVersion;
    } else {
      version = this.api.signatureVersion;
    }
    return AWS.Signers.RequestSigner.getVersion(version);
  },
  serviceInterface: function serviceInterface() {
    switch (this.api.protocol) {
      case 'ec2':
        return AWS.EventListeners.Query;
      case 'query':
        return AWS.EventListeners.Query;
      case 'json':
        return AWS.EventListeners.Json;
      case 'rest-json':
        return AWS.EventListeners.RestJson;
      case 'rest-xml':
        return AWS.EventListeners.RestXml;
    }
    if (this.api.protocol) {
      throw new Error('Invalid service `protocol\' ' + this.api.protocol + ' in API config');
    }
  },
  successfulResponse: function successfulResponse(resp) {
    return resp.httpResponse.statusCode < 300;
  },
  numRetries: function numRetries() {
    if (this.config.maxRetries !== undefined) {
      return this.config.maxRetries;
    } else {
      return this.defaultRetryCount;
    }
  },
  retryDelays: function retryDelays(retryCount) {
    var retryDelayOptions = this.config.retryDelayOptions || {};
    var customBackoff = retryDelayOptions.customBackoff || null;
    if (typeof customBackoff === 'function') {
      return customBackoff(retryCount);
    }
    var base = retryDelayOptions.base || 30;
    var delay = Math.random() * (Math.pow(2, retryCount) * base);
    return delay;
  },
  retryableError: function retryableError(error) {
    if (this.networkingError(error))
      return true;
    if (this.expiredCredentialsError(error))
      return true;
    if (this.throttledError(error))
      return true;
    if (error.statusCode >= 500)
      return true;
    return false;
  },
  networkingError: function networkingError(error) {
    return error.code === 'NetworkingError';
  },
  expiredCredentialsError: function expiredCredentialsError(error) {
    return (error.code === 'ExpiredTokenException');
  },
  clockSkewError: function clockSkewError(error) {
    switch (error.code) {
      case 'RequestTimeTooSkewed':
      case 'RequestExpired':
      case 'InvalidSignatureException':
      case 'SignatureDoesNotMatch':
      case 'AuthFailure':
      case 'RequestInTheFuture':
        return true;
      default:
        return false;
    }
  },
  throttledError: function throttledError(error) {
    switch (error.code) {
      case 'ProvisionedThroughputExceededException':
      case 'Throttling':
      case 'ThrottlingException':
      case 'RequestLimitExceeded':
      case 'RequestThrottled':
        return true;
      default:
        return false;
    }
  },
  endpointFromTemplate: function endpointFromTemplate(endpoint) {
    if (typeof endpoint !== 'string')
      return endpoint;
    var e = endpoint;
    e = e.replace(/\{service\}/g, this.api.endpointPrefix);
    e = e.replace(/\{region\}/g, this.config.region);
    e = e.replace(/\{scheme\}/g, this.config.sslEnabled ? 'https' : 'http');
    return e;
  },
  setEndpoint: function setEndpoint(endpoint) {
    this.endpoint = new AWS.Endpoint(endpoint, this.config);
  },
  paginationConfig: function paginationConfig(operation, throwException) {
    var paginator = this.api.operations[operation].paginator;
    if (!paginator) {
      if (throwException) {
        var e = new Error();
        throw AWS.util.error(e, 'No pagination configuration for ' + operation);
      }
      return null;
    }
    return paginator;
  }
});
AWS.util.update(AWS.Service, {
  defineMethods: function defineMethods(svc) {
    AWS.util.each(svc.prototype.api.operations, function iterator(method) {
      if (svc.prototype[method])
        return;
      svc.prototype[method] = function(params, callback) {
        return this.makeRequest(method, params, callback);
      };
    });
  },
  defineService: function defineService(serviceIdentifier, versions, features) {
    AWS.Service._serviceMap[serviceIdentifier] = true;
    if (!Array.isArray(versions)) {
      features = versions;
      versions = [];
    }
    var svc = inherit(AWS.Service, features || {});
    if (typeof serviceIdentifier === 'string') {
      AWS.Service.addVersions(svc, versions);
      var identifier = svc.serviceIdentifier || serviceIdentifier;
      svc.serviceIdentifier = identifier;
    } else {
      svc.prototype.api = serviceIdentifier;
      AWS.Service.defineMethods(svc);
    }
    return svc;
  },
  addVersions: function addVersions(svc, versions) {
    if (!Array.isArray(versions))
      versions = [versions];
    svc.services = svc.services || {};
    for (var i = 0; i < versions.length; i++) {
      if (svc.services[versions[i]] === undefined) {
        svc.services[versions[i]] = null;
      }
    }
    svc.apiVersions = Object.keys(svc.services).sort();
  },
  defineServiceApi: function defineServiceApi(superclass, version, apiConfig) {
    var svc = inherit(superclass, {serviceIdentifier: superclass.serviceIdentifier});
    function setApi(api) {
      if (api.isApi) {
        svc.prototype.api = api;
      } else {
        svc.prototype.api = new Api(api);
      }
    }
    if (typeof version === 'string') {
      if (apiConfig) {
        setApi(apiConfig);
      } else {
        try {
          setApi(AWS.apiLoader(superclass.serviceIdentifier, version));
        } catch (err) {
          throw AWS.util.error(err, {message: 'Could not find API configuration ' + superclass.serviceIdentifier + '-' + version});
        }
      }
      if (!superclass.services.hasOwnProperty(version)) {
        superclass.apiVersions = superclass.apiVersions.concat(version).sort();
      }
      superclass.services[version] = svc;
    } else {
      setApi(version);
    }
    AWS.Service.defineMethods(svc);
    return svc;
  },
  hasService: function(identifier) {
    return AWS.Service._serviceMap.hasOwnProperty(identifier);
  },
  _serviceMap: {}
});
