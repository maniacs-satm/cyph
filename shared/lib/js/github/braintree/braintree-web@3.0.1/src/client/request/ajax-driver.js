'use strict';

var querystring = require('../../lib/querystring');
var prepBody = require('./prep-body');
var parseBody = require('./parse-body');
var isXHRAvailable = global.XMLHttpRequest && 'withCredentials' in new global.XMLHttpRequest();

function getRequestObject() {
  return isXHRAvailable ? new XMLHttpRequest() : new XDomainRequest();
}

function request(options, cb) {
  var status, resBody;
  var method = options.method;
  var url = options.url;
  var body = options.data;
  var timeout = options.timeout;
  var req = getRequestObject();
  var callback = cb;

  if (method === 'GET') {
    url = querystring.queryify(url, body);
    body = null;
  }

  if (isXHRAvailable) {
    req.onreadystatechange = function () {
      if (req.readyState !== 4) { return; }

      status = req.status;
      resBody = parseBody(req.responseText);

      if (status >= 400 || status < 200) {
        callback(resBody || 'error', null, status || 500);
      } else {
        callback(null, resBody, status);
      }
    };
  } else {
    req.onload = function () {
      callback(null, parseBody(req.responseText), req.status);
    };

    req.onerror = function () {
      callback('error', null, req.status);
    };

    // This must remain for IE9 to work
    req.onprogress = function () {};

    req.ontimeout = function () {
      callback('timeout', null, -1);
    };
  }

  req.open(method, url, true);
  req.timeout = timeout;

  if (isXHRAvailable && method === 'POST') {
    req.setRequestHeader('Content-Type', 'application/json');
  }

  try {
    req.send(prepBody(method, body));
  } catch (e) { /* ignored */ }
}

module.exports = {
  request: request
};
