/* */ 
var AWS = require('../core');
require('../dynamodb/document_client');
AWS.util.update(AWS.DynamoDB.prototype, {
  setupRequestListeners: function setupRequestListeners(request) {
    if (request.service.config.dynamoDbCrc32) {
      request.removeListener('extractData', AWS.EventListeners.Json.EXTRACT_DATA);
      request.addListener('extractData', this.checkCrc32);
      request.addListener('extractData', AWS.EventListeners.Json.EXTRACT_DATA);
    }
  },
  checkCrc32: function checkCrc32(resp) {
    if (!resp.httpResponse.streaming && !resp.request.service.crc32IsValid(resp)) {
      resp.error = AWS.util.error(new Error(), {
        code: 'CRC32CheckFailed',
        message: 'CRC32 integrity check failed',
        retryable: true
      });
      resp.request.haltHandlersOnError();
      throw (resp.error);
    }
  },
  crc32IsValid: function crc32IsValid(resp) {
    var crc = resp.httpResponse.headers['x-amz-crc32'];
    if (!crc)
      return true;
    return parseInt(crc, 10) === AWS.util.crypto.crc32(resp.httpResponse.body);
  },
  defaultRetryCount: 10,
  retryDelays: function retryDelays(retryCount) {
    var delay = retryCount > 0 ? (50 * Math.pow(2, retryCount - 1)) : 0;
    return delay;
  }
});
