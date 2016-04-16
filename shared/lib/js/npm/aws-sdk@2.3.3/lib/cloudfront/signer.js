/* */ 
var crypto = require('crypto'),
    url = require('url'),
    AWS = require('../core'),
    base64Encode = AWS.util.base64.encode,
    inherit = AWS.util.inherit;
var queryEncode = function(string) {
  var replacements = {
    '+': '-',
    '=': '_',
    '/': '~'
  };
  return string.replace(/[\+=\/]/g, function(match) {
    return replacements[match];
  });
};
var signPolicy = function(policy, privateKey) {
  var sign = crypto.createSign('RSA-SHA1');
  sign.write(policy);
  return queryEncode(sign.sign(privateKey, 'base64'));
};
var signWithCannedPolicy = function(url, expires, keyPairId, privateKey) {
  var policy = JSON.stringify({Statement: [{
      Resource: url,
      Condition: {DateLessThan: {'AWS:EpochTime': expires}}
    }]});
  return {
    Expires: expires,
    'Key-Pair-Id': keyPairId,
    Signature: signPolicy(policy.toString(), privateKey)
  };
};
var signWithCustomPolicy = function(policy, keyPairId, privateKey) {
  policy = policy.replace(/\s/mg, policy);
  return {
    Policy: queryEncode(base64Encode(policy)),
    'Key-Pair-Id': keyPairId,
    Signature: signPolicy(policy, privateKey)
  };
};
var determineScheme = function(url) {
  var parts = url.split('://');
  if (parts.length < 2) {
    throw new Error('Invalid URL.');
  }
  return parts[0].replace('*', '');
};
var getRtmpUrl = function(rtmpUrl) {
  var parsed = url.parse(rtmpUrl);
  return parsed.path.replace(/^\//, '') + parsed.hash;
};
var getResource = function(url) {
  switch (determineScheme(url)) {
    case 'http':
    case 'https':
      return url;
    case 'rtmp':
      return getRtmpUrl(url);
    default:
      throw new Error('Invalid URI scheme. Scheme must be one of' + ' http, https, or rtmp');
  }
};
var handleError = function(err, callback) {
  if (!callback || typeof callback !== 'function') {
    throw err;
  }
  callback(err);
};
var handleSuccess = function(result, callback) {
  if (!callback || typeof callback !== 'function') {
    return result;
  }
  callback(null, result);
};
AWS.CloudFront.Signer = inherit({
  constructor: function Signer(keyPairId, privateKey) {
    if (keyPairId === void 0 || privateKey === void 0) {
      throw new Error('A key pair ID and private key are required');
    }
    this.keyPairId = keyPairId;
    this.privateKey = privateKey;
  },
  getSignedCookie: function(options, cb) {
    var signatureHash = 'policy' in options ? signWithCustomPolicy(options.policy, this.keyPairId, this.privateKey) : signWithCannedPolicy(options.url, options.expires, this.keyPairId, this.privateKey);
    var cookieHash = {};
    for (var key in signatureHash) {
      if (signatureHash.hasOwnProperty(key)) {
        cookieHash['CloudFront-' + key] = signatureHash[key];
      }
    }
    return handleSuccess(cookieHash, cb);
  },
  getSignedUrl: function(options, cb) {
    try {
      var resource = getResource(options.url);
    } catch (err) {
      return handleError(err, cb);
    }
    var parsedUrl = url.parse(options.url, true),
        signatureHash = options.hasOwnProperty('policy') ? signWithCustomPolicy(options.policy, this.keyPairId, this.privateKey) : signWithCannedPolicy(resource, options.expires, this.keyPairId, this.privateKey);
    parsedUrl.search = null;
    for (var key in signatureHash) {
      if (signatureHash.hasOwnProperty(key)) {
        parsedUrl.query[key] = signatureHash[key];
      }
    }
    try {
      var signedUrl = determineScheme(options.url) === 'rtmp' ? getRtmpUrl(url.format(parsedUrl)) : url.format(parsedUrl);
    } catch (err) {
      return handleError(err, cb);
    }
    return handleSuccess(signedUrl, cb);
  }
});
module.exports = AWS.CloudFront.Signer;
