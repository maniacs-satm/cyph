/* */ 
(function(process) {
  var AWS = require('./core');
  require('./credentials');
  require('./credentials/credential_provider_chain');
  AWS.Config = AWS.util.inherit({
    constructor: function Config(options) {
      if (options === undefined)
        options = {};
      options = this.extractCredentials(options);
      AWS.util.each.call(this, this.keys, function(key, value) {
        this.set(key, options[key], value);
      });
    },
    getCredentials: function getCredentials(callback) {
      var self = this;
      function finish(err) {
        callback(err, err ? null : self.credentials);
      }
      function credError(msg, err) {
        return new AWS.util.error(err || new Error(), {
          code: 'CredentialsError',
          message: msg
        });
      }
      function getAsyncCredentials() {
        self.credentials.get(function(err) {
          if (err) {
            var msg = 'Could not load credentials from ' + self.credentials.constructor.name;
            err = credError(msg, err);
          }
          finish(err);
        });
      }
      function getStaticCredentials() {
        var err = null;
        if (!self.credentials.accessKeyId || !self.credentials.secretAccessKey) {
          err = credError('Missing credentials');
        }
        finish(err);
      }
      if (self.credentials) {
        if (typeof self.credentials.get === 'function') {
          getAsyncCredentials();
        } else {
          getStaticCredentials();
        }
      } else if (self.credentialProvider) {
        self.credentialProvider.resolve(function(err, creds) {
          if (err) {
            err = credError('Could not load credentials from any providers', err);
          }
          self.credentials = creds;
          finish(err);
        });
      } else {
        finish(credError('No credentials to load'));
      }
    },
    update: function update(options, allowUnknownKeys) {
      allowUnknownKeys = allowUnknownKeys || false;
      options = this.extractCredentials(options);
      AWS.util.each.call(this, options, function(key, value) {
        if (allowUnknownKeys || this.keys.hasOwnProperty(key) || AWS.Service.hasService(key)) {
          this.set(key, value);
        }
      });
    },
    loadFromPath: function loadFromPath(path) {
      this.clear();
      var options = JSON.parse(AWS.util.readFileSync(path));
      var fileSystemCreds = new AWS.FileSystemCredentials(path);
      var chain = new AWS.CredentialProviderChain();
      chain.providers.unshift(fileSystemCreds);
      chain.resolve(function(err, creds) {
        if (err)
          throw err;
        else
          options.credentials = creds;
      });
      this.constructor(options);
      return this;
    },
    clear: function clear() {
      AWS.util.each.call(this, this.keys, function(key) {
        delete this[key];
      });
      this.set('credentials', undefined);
      this.set('credentialProvider', undefined);
    },
    set: function set(property, value, defaultValue) {
      if (value === undefined) {
        if (defaultValue === undefined) {
          defaultValue = this.keys[property];
        }
        if (typeof defaultValue === 'function') {
          this[property] = defaultValue.call(this);
        } else {
          this[property] = defaultValue;
        }
      } else if (property === 'httpOptions' && this[property]) {
        this[property] = AWS.util.merge(this[property], value);
      } else {
        this[property] = value;
      }
    },
    keys: {
      credentials: null,
      credentialProvider: null,
      region: null,
      logger: null,
      apiVersions: {},
      apiVersion: null,
      endpoint: undefined,
      httpOptions: {timeout: 120000},
      maxRetries: undefined,
      maxRedirects: 10,
      paramValidation: true,
      sslEnabled: true,
      s3ForcePathStyle: false,
      s3BucketEndpoint: false,
      computeChecksums: true,
      convertResponseTypes: true,
      correctClockSkew: false,
      customUserAgent: null,
      dynamoDbCrc32: true,
      systemClockOffset: 0,
      signatureVersion: null,
      signatureCache: true,
      retryDelayOptions: {base: 100}
    },
    extractCredentials: function extractCredentials(options) {
      if (options.accessKeyId && options.secretAccessKey) {
        options = AWS.util.copy(options);
        options.credentials = new AWS.Credentials(options);
      }
      return options;
    },
    setPromisesDependency: function setPromisesDependency(dep) {
      AWS.util.addPromisesToRequests(AWS.Request, dep);
    }
  });
  AWS.config = new AWS.Config();
})(require('process'));
