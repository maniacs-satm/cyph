/* */ 
var AWS = require('../core');
require('../s3/managed_upload');
var operationsWith200StatusCodeError = {
  'completeMultipartUpload': true,
  'copyObject': true,
  'uploadPartCopy': true
};
AWS.util.update(AWS.S3.prototype, {
  validateService: function validateService() {
    if (!this.config.region)
      this.config.region = 'us-east-1';
    if (!this.config.endpoint && this.config.s3BucketEndpoint) {
      var msg = 'An endpoint must be provided when configuring ' + '`s3BucketEndpoint` to true.';
      throw AWS.util.error(new Error(), {
        name: 'InvalidEndpoint',
        message: msg
      });
    }
  },
  setupRequestListeners: function setupRequestListeners(request) {
    request.addListener('validate', this.validateScheme);
    request.addListener('validate', this.validateBucketEndpoint);
    request.addListener('build', this.addContentType);
    request.addListener('build', this.populateURI);
    request.addListener('build', this.computeContentMd5);
    request.addListener('build', this.computeSseCustomerKeyMd5);
    request.addListener('afterBuild', this.addExpect100Continue);
    request.removeListener('validate', AWS.EventListeners.Core.VALIDATE_REGION);
    request.addListener('extractError', this.extractError);
    request.addListener('extractData', this.extractData);
    request.addListener('extractData', AWS.util.hoistPayloadMember);
    request.addListener('beforePresign', this.prepareSignedUrl);
  },
  validateScheme: function(req) {
    var params = req.params,
        scheme = req.httpRequest.endpoint.protocol,
        sensitive = params.SSECustomerKey || params.CopySourceSSECustomerKey;
    if (sensitive && scheme !== 'https:') {
      var msg = 'Cannot send SSE keys over HTTP. Set \'sslEnabled\'' + 'to \'true\' in your configuration';
      throw AWS.util.error(new Error(), {
        code: 'ConfigError',
        message: msg
      });
    }
  },
  validateBucketEndpoint: function(req) {
    if (!req.params.Bucket && req.service.config.s3BucketEndpoint) {
      var msg = 'Cannot send requests to root API with `s3BucketEndpoint` set.';
      throw AWS.util.error(new Error(), {
        code: 'ConfigError',
        message: msg
      });
    }
  },
  populateURI: function populateURI(req) {
    var httpRequest = req.httpRequest;
    var b = req.params.Bucket;
    if (b) {
      if (!req.service.pathStyleBucketName(b)) {
        if (!req.service.config.s3BucketEndpoint) {
          httpRequest.endpoint.hostname = b + '.' + httpRequest.endpoint.hostname;
          var port = httpRequest.endpoint.port;
          if (port !== 80 && port !== 443) {
            httpRequest.endpoint.host = httpRequest.endpoint.hostname + ':' + httpRequest.endpoint.port;
          } else {
            httpRequest.endpoint.host = httpRequest.endpoint.hostname;
          }
        }
        httpRequest.virtualHostedBucket = b;
        httpRequest.path = httpRequest.path.replace(new RegExp('/' + b), '');
        if (httpRequest.path[0] !== '/') {
          httpRequest.path = '/' + httpRequest.path;
        }
      }
    }
  },
  addExpect100Continue: function addExpect100Continue(req) {
    var len = req.httpRequest.headers['Content-Length'];
    if (AWS.util.isNode() && len >= 1024 * 1024) {
      req.httpRequest.headers['Expect'] = '100-continue';
    }
  },
  addContentType: function addContentType(req) {
    var httpRequest = req.httpRequest;
    if (httpRequest.method === 'GET' || httpRequest.method === 'HEAD') {
      delete httpRequest.headers['Content-Type'];
      return;
    }
    if (!httpRequest.headers['Content-Type']) {
      httpRequest.headers['Content-Type'] = 'application/octet-stream';
    }
    var contentType = httpRequest.headers['Content-Type'];
    if (AWS.util.isBrowser()) {
      if (typeof httpRequest.body === 'string' && !contentType.match(/;\s*charset=/)) {
        var charset = '; charset=UTF-8';
        httpRequest.headers['Content-Type'] += charset;
      } else {
        var replaceFn = function(_, prefix, charsetName) {
          return prefix + charsetName.toUpperCase();
        };
        httpRequest.headers['Content-Type'] = contentType.replace(/(;\s*charset=)(.+)$/, replaceFn);
      }
    }
  },
  computableChecksumOperations: {
    putBucketCors: true,
    putBucketLifecycle: true,
    putBucketLifecycleConfiguration: true,
    putBucketTagging: true,
    deleteObjects: true,
    putBucketReplication: true
  },
  willComputeChecksums: function willComputeChecksums(req) {
    if (this.computableChecksumOperations[req.operation])
      return true;
    if (!this.config.computeChecksums)
      return false;
    if (!AWS.util.Buffer.isBuffer(req.httpRequest.body) && typeof req.httpRequest.body !== 'string') {
      return false;
    }
    var rules = req.service.api.operations[req.operation].input.members;
    if (req.service.getSignerClass(req) === AWS.Signers.V4) {
      if (rules.ContentMD5 && !rules.ContentMD5.required)
        return false;
    }
    if (rules.ContentMD5 && !req.params.ContentMD5)
      return true;
  },
  computeContentMd5: function computeContentMd5(req) {
    if (req.service.willComputeChecksums(req)) {
      var md5 = AWS.util.crypto.md5(req.httpRequest.body, 'base64');
      req.httpRequest.headers['Content-MD5'] = md5;
    }
  },
  computeSseCustomerKeyMd5: function computeSseCustomerKeyMd5(req) {
    var keys = {
      SSECustomerKey: 'x-amz-server-side-encryption-customer-key-MD5',
      CopySourceSSECustomerKey: 'x-amz-copy-source-server-side-encryption-customer-key-MD5'
    };
    AWS.util.each(keys, function(key, header) {
      if (req.params[key]) {
        var value = AWS.util.crypto.md5(req.params[key], 'base64');
        req.httpRequest.headers[header] = value;
      }
    });
  },
  pathStyleBucketName: function pathStyleBucketName(bucketName) {
    if (this.config.s3ForcePathStyle)
      return true;
    if (this.config.s3BucketEndpoint)
      return false;
    if (this.dnsCompatibleBucketName(bucketName)) {
      return (this.config.sslEnabled && bucketName.match(/\./)) ? true : false;
    } else {
      return true;
    }
  },
  dnsCompatibleBucketName: function dnsCompatibleBucketName(bucketName) {
    var b = bucketName;
    var domain = new RegExp(/^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/);
    var ipAddress = new RegExp(/(\d+\.){3}\d+/);
    var dots = new RegExp(/\.\./);
    return (b.match(domain) && !b.match(ipAddress) && !b.match(dots)) ? true : false;
  },
  successfulResponse: function successfulResponse(resp) {
    var req = resp.request;
    var httpResponse = resp.httpResponse;
    if (operationsWith200StatusCodeError[req.operation] && httpResponse.body.toString().match('<Error>')) {
      return false;
    } else {
      return httpResponse.statusCode < 300;
    }
  },
  retryableError: function retryableError(error, request) {
    if (operationsWith200StatusCodeError[request.operation] && error.statusCode === 200) {
      return true;
    } else if (error && error.code === 'RequestTimeout') {
      return true;
    } else if (error && error.code === 'AuthorizationHeaderMalformed' && error.region && error.region != request.httpRequest.region) {
      request.httpRequest.region = error.region;
      return true;
    } else {
      var _super = AWS.Service.prototype.retryableError;
      return _super.call(this, error, request);
    }
  },
  extractData: function extractData(resp) {
    var req = resp.request;
    if (req.operation === 'getBucketLocation') {
      var match = resp.httpResponse.body.toString().match(/>(.+)<\/Location/);
      delete resp.data['_'];
      if (match) {
        resp.data.LocationConstraint = match[1];
      } else {
        resp.data.LocationConstraint = '';
      }
    }
  },
  extractError: function extractError(resp) {
    var codes = {
      304: 'NotModified',
      403: 'Forbidden',
      400: 'BadRequest',
      404: 'NotFound'
    };
    var code = resp.httpResponse.statusCode;
    var body = resp.httpResponse.body || '';
    var requestId = resp.requestId;
    var extendedRequestId = resp.httpResponse.headers ? resp.httpResponse.headers['x-amz-id-2'] : null;
    if (codes[code] && body.length === 0) {
      resp.error = AWS.util.error(new Error(), {
        code: codes[resp.httpResponse.statusCode],
        message: null
      });
    } else {
      var data = new AWS.XML.Parser().parse(body.toString());
      resp.error = AWS.util.error(new Error(), {
        code: data.Code || code,
        message: data.Message || null,
        region: data.Region || null
      });
    }
    resp.error.requestId = requestId || null;
    resp.error.extendedRequestId = extendedRequestId || null;
  },
  getSignedUrl: function getSignedUrl(operation, params, callback) {
    params = AWS.util.copy(params || {});
    var expires = params.Expires || 900;
    delete params.Expires;
    var request = this.makeRequest(operation, params);
    return request.presign(expires, callback);
  },
  prepareSignedUrl: function prepareSignedUrl(request) {
    request.addListener('validate', request.service.noPresignedContentLength);
    request.removeListener('build', request.service.addContentType);
    if (!request.params.Body) {
      request.removeListener('build', request.service.computeContentMd5);
    } else {
      request.addListener('afterBuild', AWS.EventListeners.Core.COMPUTE_SHA256);
    }
  },
  noPresignedContentLength: function noPresignedContentLength(request) {
    if (request.params.ContentLength !== undefined) {
      throw AWS.util.error(new Error(), {
        code: 'UnexpectedParameter',
        message: 'ContentLength is not supported in pre-signed URLs.'
      });
    }
  },
  createBucket: function createBucket(params, callback) {
    if (typeof params === 'function' || !params) {
      callback = callback || params;
      params = {};
    }
    var hostname = this.endpoint.hostname;
    if (hostname !== this.api.globalEndpoint && !params.CreateBucketConfiguration) {
      params.CreateBucketConfiguration = {LocationConstraint: this.config.region};
    }
    return this.makeRequest('createBucket', params, callback);
  },
  upload: function upload(params, options, callback) {
    if (typeof options === 'function' && callback === undefined) {
      callback = options;
      options = null;
    }
    options = options || {};
    options = AWS.util.merge(options || {}, {
      service: this,
      params: params
    });
    var uploader = new AWS.S3.ManagedUpload(options);
    if (typeof callback === 'function')
      uploader.send(callback);
    return uploader;
  }
});
