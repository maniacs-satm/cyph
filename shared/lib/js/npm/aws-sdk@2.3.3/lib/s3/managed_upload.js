/* */ 
(function(Buffer) {
  var AWS = require('../core');
  var byteLength = AWS.util.string.byteLength;
  AWS.S3.ManagedUpload = AWS.util.inherit({
    constructor: function ManagedUpload(options) {
      var self = this;
      AWS.SequentialExecutor.call(self);
      self.body = null;
      self.sliceFn = null;
      self.callback = null;
      self.parts = {};
      self.completeInfo = [];
      self.fillQueue = function() {
        self.callback(new Error('Unsupported body payload ' + typeof self.body));
      };
      self.configure(options);
    },
    configure: function configure(options) {
      options = options || {};
      this.partSize = this.minPartSize;
      if (options.queueSize)
        this.queueSize = options.queueSize;
      if (options.partSize)
        this.partSize = options.partSize;
      if (options.leavePartsOnError)
        this.leavePartsOnError = true;
      if (this.partSize < this.minPartSize) {
        throw new Error('partSize must be greater than ' + this.minPartSize);
      }
      this.service = options.service;
      this.bindServiceObject(options.params);
      this.validateBody();
      this.adjustTotalBytes();
    },
    leavePartsOnError: false,
    queueSize: 4,
    partSize: null,
    minPartSize: 1024 * 1024 * 5,
    maxTotalParts: 10000,
    send: function(callback) {
      var self = this;
      self.failed = false;
      self.callback = callback || function(err) {
        if (err)
          throw err;
      };
      var runFill = true;
      if (self.sliceFn) {
        self.fillQueue = self.fillBuffer;
      } else if (AWS.util.isNode()) {
        var Stream = AWS.util.nodeRequire('stream').Stream;
        if (self.body instanceof Stream) {
          runFill = false;
          self.fillQueue = self.fillStream;
          self.partBuffers = [];
          self.body.on('readable', function() {
            self.fillQueue();
          }).on('end', function() {
            self.isDoneChunking = true;
            self.numParts = self.totalPartNumbers;
            self.fillQueue.call(self);
          });
        }
      }
      if (runFill)
        self.fillQueue.call(self);
    },
    abort: function() {
      this.cleanup(AWS.util.error(new Error('Request aborted by user'), {
        code: 'RequestAbortedError',
        retryable: false
      }));
    },
    validateBody: function validateBody() {
      var self = this;
      self.body = self.service.config.params.Body;
      if (!self.body)
        throw new Error('params.Body is required');
      if (typeof self.body === 'string') {
        self.body = new AWS.util.Buffer(self.body);
      }
      self.sliceFn = AWS.util.arraySliceFn(self.body);
    },
    bindServiceObject: function bindServiceObject(params) {
      params = params || {};
      var self = this;
      if (!self.service) {
        self.service = new AWS.S3({params: params});
      } else {
        var config = AWS.util.copy(self.service.config);
        self.service = new self.service.constructor.__super__(config);
        self.service.config.params = AWS.util.merge(self.service.config.params || {}, params);
      }
    },
    adjustTotalBytes: function adjustTotalBytes() {
      var self = this;
      try {
        self.totalBytes = byteLength(self.body);
      } catch (e) {}
      if (self.totalBytes) {
        var newPartSize = Math.ceil(self.totalBytes / self.maxTotalParts);
        if (newPartSize > self.partSize)
          self.partSize = newPartSize;
      } else {
        self.totalBytes = undefined;
      }
    },
    isDoneChunking: false,
    partPos: 0,
    totalChunkedBytes: 0,
    totalUploadedBytes: 0,
    totalBytes: undefined,
    numParts: 0,
    totalPartNumbers: 0,
    activeParts: 0,
    doneParts: 0,
    parts: null,
    completeInfo: null,
    failed: false,
    multipartReq: null,
    partBuffers: null,
    partBufferLength: 0,
    fillBuffer: function fillBuffer() {
      var self = this;
      var bodyLen = byteLength(self.body);
      if (bodyLen === 0) {
        self.isDoneChunking = true;
        self.numParts = 1;
        self.nextChunk(self.body);
        return;
      }
      while (self.activeParts < self.queueSize && self.partPos < bodyLen) {
        var endPos = Math.min(self.partPos + self.partSize, bodyLen);
        var buf = self.sliceFn.call(self.body, self.partPos, endPos);
        self.partPos += self.partSize;
        if (byteLength(buf) < self.partSize || self.partPos === bodyLen) {
          self.isDoneChunking = true;
          self.numParts = self.totalPartNumbers + 1;
        }
        self.nextChunk(buf);
      }
    },
    fillStream: function fillStream() {
      var self = this;
      if (self.activeParts >= self.queueSize)
        return;
      var buf = self.body.read(self.partSize - self.partBufferLength) || self.body.read();
      if (buf) {
        self.partBuffers.push(buf);
        self.partBufferLength += buf.length;
        self.totalChunkedBytes += buf.length;
      }
      if (self.partBufferLength >= self.partSize) {
        var pbuf = self.partBuffers.length === 1 ? self.partBuffers[0] : Buffer.concat(self.partBuffers);
        self.partBuffers = [];
        self.partBufferLength = 0;
        if (pbuf.length > self.partSize) {
          var rest = pbuf.slice(self.partSize);
          self.partBuffers.push(rest);
          self.partBufferLength += rest.length;
          pbuf = pbuf.slice(0, self.partSize);
        }
        self.nextChunk(pbuf);
      }
      if (self.isDoneChunking && !self.isDoneSending) {
        pbuf = self.partBuffers.length === 1 ? self.partBuffers[0] : Buffer.concat(self.partBuffers);
        self.partBuffers = [];
        self.partBufferLength = 0;
        self.totalBytes = self.totalChunkedBytes;
        self.isDoneSending = true;
        if (self.numParts === 0 || pbuf.length > 0) {
          self.numParts++;
          self.nextChunk(pbuf);
        }
      }
      self.body.read(0);
    },
    nextChunk: function nextChunk(chunk) {
      var self = this;
      if (self.failed)
        return null;
      var partNumber = ++self.totalPartNumbers;
      if (self.isDoneChunking && partNumber === 1) {
        var req = self.service.putObject({Body: chunk});
        req._managedUpload = self;
        req.on('httpUploadProgress', self.progress).send(self.finishSinglePart);
        return null;
      } else if (self.service.config.params.ContentMD5) {
        var err = AWS.util.error(new Error('The Content-MD5 you specified is invalid for multi-part uploads.'), {
          code: 'InvalidDigest',
          retryable: false
        });
        self.cleanup(err);
        return null;
      }
      if (self.completeInfo[partNumber] && self.completeInfo[partNumber].ETag !== null) {
        return null;
      }
      self.activeParts++;
      if (!self.service.config.params.UploadId) {
        if (!self.multipartReq) {
          self.multipartReq = self.service.createMultipartUpload();
          self.multipartReq.on('success', function(resp) {
            self.service.config.params.UploadId = resp.data.UploadId;
            self.multipartReq = null;
          });
          self.queueChunks(chunk, partNumber);
          self.multipartReq.on('error', function(err) {
            self.cleanup(err);
          });
          self.multipartReq.send();
        } else {
          self.queueChunks(chunk, partNumber);
        }
      } else {
        self.uploadPart(chunk, partNumber);
      }
    },
    uploadPart: function uploadPart(chunk, partNumber) {
      var self = this;
      var partParams = {
        Body: chunk,
        ContentLength: AWS.util.string.byteLength(chunk),
        PartNumber: partNumber
      };
      var partInfo = {
        ETag: null,
        PartNumber: partNumber
      };
      self.completeInfo[partNumber] = partInfo;
      var req = self.service.uploadPart(partParams);
      self.parts[partNumber] = req;
      req._lastUploadedBytes = 0;
      req._managedUpload = self;
      req.on('httpUploadProgress', self.progress);
      req.send(function(err, data) {
        delete self.parts[partParams.PartNumber];
        self.activeParts--;
        if (!err && (!data || !data.ETag)) {
          var message = 'No access to ETag property on response.';
          if (AWS.util.isBrowser()) {
            message += ' Check CORS configuration to expose ETag header.';
          }
          err = AWS.util.error(new Error(message), {
            code: 'ETagMissing',
            retryable: false
          });
        }
        if (err)
          return self.cleanup(err);
        partInfo.ETag = data.ETag;
        self.doneParts++;
        if (self.isDoneChunking && self.doneParts === self.numParts) {
          self.finishMultiPart();
        } else {
          self.fillQueue.call(self);
        }
      });
    },
    queueChunks: function queueChunks(chunk, partNumber) {
      var self = this;
      self.multipartReq.on('success', function() {
        self.uploadPart(chunk, partNumber);
      });
    },
    cleanup: function cleanup(err) {
      var self = this;
      if (self.failed)
        return;
      if (typeof self.body.removeAllListeners === 'function' && typeof self.body.resume === 'function') {
        self.body.removeAllListeners('readable');
        self.body.removeAllListeners('end');
        self.body.resume();
      }
      if (self.service.config.params.UploadId && !self.leavePartsOnError) {
        self.service.abortMultipartUpload().send();
      }
      AWS.util.each(self.parts, function(partNumber, part) {
        part.removeAllListeners('complete');
        part.abort();
      });
      self.activeParts = 0;
      self.partPos = 0;
      self.numParts = 0;
      self.totalPartNumbers = 0;
      self.parts = {};
      self.failed = true;
      self.callback(err);
    },
    finishMultiPart: function finishMultiPart() {
      var self = this;
      var completeParams = {MultipartUpload: {Parts: self.completeInfo.slice(1)}};
      self.service.completeMultipartUpload(completeParams, function(err, data) {
        if (err)
          return self.cleanup(err);
        else
          self.callback(err, data);
      });
    },
    finishSinglePart: function finishSinglePart(err, data) {
      var upload = this.request._managedUpload;
      var httpReq = this.request.httpRequest;
      var endpoint = httpReq.endpoint;
      if (err)
        return upload.callback(err);
      data.Location = [endpoint.protocol, '//', endpoint.host, httpReq.path].join('');
      data.key = this.request.params.Key;
      data.Key = this.request.params.Key;
      data.Bucket = this.request.params.Bucket;
      upload.callback(err, data);
    },
    progress: function progress(info) {
      var upload = this._managedUpload;
      if (this.operation === 'putObject') {
        info.part = 1;
        info.key = this.params.Key;
      } else {
        upload.totalUploadedBytes += info.loaded - this._lastUploadedBytes;
        this._lastUploadedBytes = info.loaded;
        info = {
          loaded: upload.totalUploadedBytes,
          total: upload.totalBytes,
          part: this.params.PartNumber,
          key: this.params.Key
        };
      }
      upload.emit('httpUploadProgress', [info]);
    }
  });
  AWS.util.mixin(AWS.S3.ManagedUpload, AWS.SequentialExecutor);
  module.exports = AWS.S3.ManagedUpload;
})(require('buffer').Buffer);
