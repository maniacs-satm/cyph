var sqsConfig	= {
	apiVersion: '2012-11-05',
	region: 'us-east-1',
	accessKeyId: 'AKIAIN2DSULSB77U4S2A',
	secretAccessKey: '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'
};

var NON_EXISTENT_QUEUE	= 'AWS.SimpleQueueService.NonExistentQueue';
var QUEUE_PREFIX		= 'channels-';
var CHANNEL_IDS			= {true: '0', false: '1'};



var sqs	= (function () {
	var sqsFrame		= document.createElement('iframe');
	var sqsFrameOrigin	= isOnion ? ONION_URL : BASE_URL.slice(0, -1);
	var sqsFrameIsReady	= false;

	sqsFrame.style.display	= 'none';
	sqsFrame.src			= sqsFrameOrigin + (isOnion ? BASE_URL : '/') + 'sqsframe';

	document.body.appendChild(sqsFrame);

	function sqsFramePostMessage (message) {
		sqsFrame.contentWindow.postMessage(message, '*');
	}

	$(function () {
		$(sqsFrame).load(function () {
			sqsFramePostMessage({method: 'init', config: sqsConfig});

			setTimeout(function () {
				sqsFrameIsReady	= true;
			}, 250);
		});
	});


	var callbacks			= {};
	var callbackCount		= 0;
	var receiveMessageQueue	= [];

	function callback (f) {
		if (!f) {
			return null;
		}

		var callbackId			= ++callbackCount;
		callbacks[callbackId]	= f;
		return {callbackId: callbackId};
	}

	window.addEventListener('message', function (e) {
		if (e.origin == sqsFrameOrigin) {
			receiveMessageQueue.push(e);
		}
	});

	onTick(function () {
		if (receiveMessageQueue.length) {
			var e	= receiveMessageQueue.shift();
			var f	= callbacks[e.data.callbackId];

			if (f) {
				f.apply(null, JSON.parse(e.data.args));
			}

			return true;
		}

		return false;
	});


	var wrapper	= {};

	/* Add methods that take an object and an optional callback */
	[
		'createQueue',
		'deleteMessage',
		'deleteQueue',
		'getQueueUrl',
		'receiveMessage',
		'sendMessage',
		'sendMessageBatch'
	].forEach(function (methodName) {
		wrapper[methodName]	= function (o, f, shouldRetryUntilSuccessful) {
			function wrapperHelper () {
				if (sqsFrameIsReady) {
					sqsFramePostMessage({
						method: methodName,
						args: JSON.stringify([
							o,
							callback(!shouldRetryUntilSuccessful ? f : function (err) {
								if (err) {
									setTimeout(wrapperHelper, 50);
								}
								else if (f) {
									f.apply(this, arguments);
								}
							})
						])
					});
				}
				else {
					setTimeout(wrapperHelper, 50);
				}
			}

			wrapperHelper();
		};
	});

	return wrapper;
}());



/* Unidirectional queue */

function Queue (queueName, handlers) {
	var self	= this;
	handlers	= handlers || {};

	self.isAlive	= true;

	sqs.createQueue({
		QueueName: QUEUE_PREFIX + queueName,
		Attributes: {
			MessageRetentionPeriod: '7200',
			ReceiveMessageWaitTimeSeconds: '20'
		}
	}, function (err, data) {
		if (data) {
			self.queueUrl	= data.QueueUrl;
		}

		if (handlers.onopen) {
			handlers.onopen();
		}

		if (handlers.onmessage) {
			function onmessageHelper () {
				self.receive(handlers.onmessage, function (err, data) {
					if (err && err.code == NON_EXISTENT_QUEUE) {
						self.isAlive	= false;
						handlers.onclose && handlers.onclose.apply(self, arguments);
					}
					else {
						setTimeout(onmessageHelper, 50);
					}
				});
			}

			onmessageHelper();
		}
		else if (handlers.onclose) {
			function oncloseHelper () {
				sqs.getQueueUrl({
					QueueName: QUEUE_PREFIX + queueName
				}, function (err, data) {
					if (err && err.code == NON_EXISTENT_QUEUE) {
						self.isAlive	= false;
						handlers.onclose.apply(self, arguments);
					}
					else {
						setTimeout(oncloseHelper, 10000);
					}
				});
			}

			oncloseHelper();
		}
	}, true);
}

Queue.prototype.close	= function (callback) {
	var self	= this;

	if (self.isAlive) {
		sqs.deleteQueue({QueueUrl: this.queueUrl}, function () {
			self.isAlive	= false;
			callback && callback.apply(self, arguments);
		}, true);
	}
};

Queue.prototype.receive	= function (messageHandler, onComplete, maxNumberOfMessages, waitTimeSeconds) {
	var self	= this;

	if (self.isAlive) {
		sqs.receiveMessage({
			QueueUrl: self.queueUrl,
			MaxNumberOfMessages: maxNumberOfMessages || 10,
			WaitTimeSeconds: waitTimeSeconds || 20
		}, function (err, data) {
			try {
				if (messageHandler && data && data.Messages) {
					for (var i = 0 ; i < data.Messages.length ; ++i) {
						var message	= data.Messages[i];
						var messageBody	= message.Body;

						sqs.deleteMessage({
							QueueUrl: self.queueUrl,
							ReceiptHandle: message.ReceiptHandle
						});

						try {
							messageBody	= JSON.parse(messageBody).message;
						}
						catch (e) {}

						messageHandler(messageBody);
					}
				}
			}
			finally {
				onComplete && onComplete.apply(self, arguments);
			}
		});
	}
};

Queue.prototype.send	= function (message, callback, isSynchronous) {
	var self	= this;

	if (self.isAlive) {
		if (typeof message == 'string' || !message.length) {
			var messageBody	= JSON.stringify({message: message});

			if (isSynchronous) {
				var date		= new Date;
				var timestamp	= date.toISOString();
				var dateString	= timestamp.split('T')[0].replace(/-/g, '');

				var requestMethod	= 'GET';
				var algorithm		= 'AWS4-HMAC-SHA256';
				var hostHeader		= 'host';
				var terminator		= 'aws4_request';
				var service			= 'sqs';
				var host			= self.queueUrl.split('/')[2];
				var uri				= self.queueUrl.split(host)[1];

				var credential		=
					dateString + '/' +
					sqsConfig.region + '/' +
					service + '/' +
					terminator
				;

				var query	= $.param({
					Action: 'SendMessage',
					MessageBody: messageBody,
					Timestamp: timestamp,
					Version: sqsConfig.apiVersion,
					'X-Amz-Algorithm': algorithm,
					'X-Amz-Credential': sqsConfig.accessKeyId + '/' + credential,
					'X-Amz-Date': timestamp,
					'X-Amz-SignedHeaders': hostHeader
				});

				var canonicalRequest	=
					requestMethod + '\n' +
					uri + '\n' +
					query + '\n' +
					hostHeader + ':' + host + '\n\n' +
					hostHeader + '\n' +
					CryptoJS.SHA256('').toString()
				;

				var stringToSign	=
					algorithm + '\n' +
					timestamp.split('.')[0].match(/[0-9A-Za-z]/g).join('') + 'Z\n' +
					credential + '\n' +
					CryptoJS.SHA256(canonicalRequest).toString()
				;


				var signature	= CryptoJS.HmacSHA256(
					stringToSign,
					CryptoJS.HmacSHA256(
						terminator,
						CryptoJS.HmacSHA256(
							service,
							CryptoJS.HmacSHA256(
								sqsConfig.region,
								CryptoJS.HmacSHA256(
									dateString,
									'AWS4' + sqsConfig.secretAccessKey
								)
							)
						)
					)
				).toString();


				$.ajax({
					async: false,
					timeout: 30000,
					type: requestMethod,
					url: this.queueUrl + '?' + query + '&X-Amz-Signature=' + signature
				});
			}
			else {
				sqs.sendMessage({
					QueueUrl: this.queueUrl,
					MessageBody: messageBody
				}, callback, true);
			}
		}
		else if (isSynchronous) {
			for (var i = 0 ; i < message.length ; +i) {
				self.send(message[i], callback.length ? callback[i] : callback, true);
			}
		}
		else {
			sqs.sendMessageBatch({
				QueueUrl: this.queueUrl,
				Entries: message.map(function (s, i) {
					return {
						Id: (i + 1).toString(),
						MessageBody: JSON.stringify({message: s})
					};
				})
			}, callback && (!callback.length ? callback : function () {
				for (var i = 0 ; i < callback.length ; ++i) {
					var thisCallback	= callback[i];

					if (thisCallback) {
						try {
							thisCallback.apply(this, arguments);
						}
						catch (e) {}
					}
				}
			}), true);
		}
	}
};



/* Bidirectional channel, comprised of two queues */

function Channel (channelName, handlers) {
	var self	= this;
	handlers	= handlers || {};
	
	sqs.getQueueUrl({
		QueueName: QUEUE_PREFIX + channelName + CHANNEL_IDS[true]
	}, function (err, data) {
		var isCreator	= !!err;

		self.inQueue	= new Queue(channelName + CHANNEL_IDS[isCreator], {
			onmessage: handlers.onmessage,
			onclose: handlers.onclose,
			onopen: function () {
				self.outQueue	= new Queue(channelName + CHANNEL_IDS[!isCreator], {
					onopen: handlers.onopen && function () {
						handlers.onopen(isCreator);
					}
				});
			}
		});
	});
}

Channel.prototype.close	= function (callback) {
	var self	= this;

	self.inQueue.close(function () {
		self.outQueue.close(callback);
	});
};

Channel.prototype.receive	= function () {
	this.inQueue.receive.apply(this.inQueue, arguments);
};

Channel.prototype.send	= function () {
	this.outQueue.send.apply(this.outQueue, arguments);
};
