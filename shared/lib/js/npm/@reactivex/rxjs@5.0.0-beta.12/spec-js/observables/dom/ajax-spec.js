/* */ 
"use strict";
var chai_1 = require('chai');
var sinon = require('sinon');
var Rx = require('../../../dist/cjs/Rx');
var root_1 = require('../../../dist/cjs/util/root');
var ajax_helper_1 = require('../../helpers/ajax-helper');
describe('Observable.ajax', function() {
  var gXHR;
  var rXHR;
  var sandbox;
  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    gXHR = global.XMLHttpRequest;
    rXHR = root_1.root.XMLHttpRequest;
    global.XMLHttpRequest = ajax_helper_1.MockXMLHttpRequest;
    root_1.root.XMLHttpRequest = ajax_helper_1.MockXMLHttpRequest;
  });
  afterEach(function() {
    sandbox.restore();
    ajax_helper_1.MockXMLHttpRequest.clearRequest();
    global.XMLHttpRequest = gXHR;
    root_1.root.XMLHttpRequest = rXHR;
    root_1.root.XDomainRequest = null;
    root_1.root.ActiveXObject = null;
  });
  it('should create default XMLHttpRequest for non CORS', function() {
    var obj = {
      url: '/',
      method: ''
    };
    Rx.Observable.ajax(obj).subscribe();
    chai_1.expect(ajax_helper_1.MockXMLHttpRequest.mostRecent.withCredentials).to.be.false;
  });
  it('should try to create AXObject for XHR in old version of IE', function() {
    var axObjectStub = sandbox.stub();
    axObjectStub.returns(sinon.stub(new ajax_helper_1.MockXMLHttpRequest()));
    root_1.root.ActiveXObject = axObjectStub;
    root_1.root.XMLHttpRequest = null;
    var obj = {
      url: '/',
      method: ''
    };
    Rx.Observable.ajax(obj).subscribe();
    chai_1.expect(axObjectStub).to.have.been.called;
  });
  it('should throw if not able to create XMLHttpRequest', function() {
    root_1.root.XMLHttpRequest = null;
    root_1.root.ActiveXObject = null;
    var obj = {
      url: '/',
      method: ''
    };
    chai_1.expect(function() {
      Rx.Observable.ajax(obj).subscribe();
    }).to.throw();
  });
  it('should create XMLHttpRequest for CORS', function() {
    var obj = {
      url: '/',
      method: '',
      crossDomain: true,
      withCredentials: true
    };
    Rx.Observable.ajax(obj).subscribe();
    chai_1.expect(ajax_helper_1.MockXMLHttpRequest.mostRecent.withCredentials).to.be.true;
  });
  it('should try to create XDomainRequest for CORS if XMLHttpRequest is not available', function() {
    var xDomainStub = sandbox.stub();
    xDomainStub.returns(sinon.stub(new ajax_helper_1.MockXMLHttpRequest()));
    root_1.root.XDomainRequest = xDomainStub;
    root_1.root.XMLHttpRequest = null;
    var obj = {
      url: '/',
      method: '',
      crossDomain: true,
      withCredentials: true
    };
    Rx.Observable.ajax(obj).subscribe();
    chai_1.expect(xDomainStub).to.have.been.called;
  });
  it('should throw if not able to create CORS request', function() {
    root_1.root.XMLHttpRequest = null;
    root_1.root.XDomainRequest = null;
    var obj = {
      url: '/',
      method: '',
      crossDomain: true,
      withCredentials: true
    };
    chai_1.expect(function() {
      Rx.Observable.ajax(obj).subscribe();
    }).to.throw();
  });
  it('should set headers', function() {
    var obj = {
      url: '/talk-to-me-goose',
      headers: {
        'Content-Type': 'kenny/loggins',
        'Fly-Into-The': 'Dangah Zone!',
        'Take-A-Ride-Into-The': 'Danger ZoooOoone!'
      },
      method: ''
    };
    Rx.Observable.ajax(obj).subscribe();
    var request = ajax_helper_1.MockXMLHttpRequest.mostRecent;
    chai_1.expect(request.url).to.equal('/talk-to-me-goose');
    chai_1.expect(request.requestHeaders).to.deep.equal({
      'Content-Type': 'kenny/loggins',
      'Fly-Into-The': 'Dangah Zone!',
      'Take-A-Ride-Into-The': 'Danger ZoooOoone!',
      'X-Requested-With': 'XMLHttpRequest'
    });
  });
  it('should not set default Content-Type header when no body is sent', function() {
    var obj = {
      url: '/talk-to-me-goose',
      method: 'GET'
    };
    Rx.Observable.ajax(obj).subscribe();
    var request = ajax_helper_1.MockXMLHttpRequest.mostRecent;
    chai_1.expect(request.url).to.equal('/talk-to-me-goose');
    chai_1.expect(request.requestHeaders).to.not.have.keys('Content-Type');
  });
  it('should error if createXHR throws', function() {
    var error;
    var obj = {
      url: '/flibbertyJibbet',
      responseType: 'text',
      createXHR: function() {
        throw new Error('wokka wokka');
      }
    };
    Rx.Observable.ajax(obj).subscribe(function(x) {
      throw 'should not next';
    }, function(err) {
      error = err;
    }, function() {
      throw 'should not complete';
    });
    chai_1.expect(error).to.be.an('error', 'wokka wokka');
  });
  it('should succeed on 200', function() {
    var expected = {foo: 'bar'};
    var result;
    var complete = false;
    var obj = {
      url: '/flibbertyJibbet',
      responseType: 'text',
      method: ''
    };
    Rx.Observable.ajax(obj).subscribe(function(x) {
      result = x;
    }, null, function() {
      complete = true;
    });
    chai_1.expect(ajax_helper_1.MockXMLHttpRequest.mostRecent.url).to.equal('/flibbertyJibbet');
    ajax_helper_1.MockXMLHttpRequest.mostRecent.respondWith({
      'status': 200,
      'contentType': 'application/json',
      'responseText': JSON.stringify(expected)
    });
    chai_1.expect(result.xhr).exist;
    chai_1.expect(result.response).to.deep.equal(JSON.stringify({foo: 'bar'}));
    chai_1.expect(complete).to.be.true;
  });
  it('should fail on 404', function() {
    var error;
    var obj = {
      url: '/flibbertyJibbet',
      normalizeError: function(e, xhr, type) {
        return xhr.response || xhr.responseText;
      },
      responseType: 'text',
      method: ''
    };
    Rx.Observable.ajax(obj).subscribe(function(x) {
      throw 'should not next';
    }, function(err) {
      error = err;
    }, function() {
      throw 'should not complete';
    });
    chai_1.expect(ajax_helper_1.MockXMLHttpRequest.mostRecent.url).to.equal('/flibbertyJibbet');
    ajax_helper_1.MockXMLHttpRequest.mostRecent.respondWith({
      'status': 404,
      'contentType': 'text/plain',
      'responseText': 'Wee! I am text!'
    });
    chai_1.expect(error instanceof Rx.AjaxError).to.be.true;
    chai_1.expect(error.message).to.equal('ajax error 404');
    chai_1.expect(error.status).to.equal(404);
  });
  it('should fail on 404', function() {
    var error;
    var obj = {
      url: '/flibbertyJibbet',
      normalizeError: function(e, xhr, type) {
        return xhr.response || xhr.responseText;
      },
      responseType: 'text',
      method: ''
    };
    Rx.Observable.ajax(obj).subscribe(function(x) {
      throw 'should not next';
    }, function(err) {
      error = err;
    }, function() {
      throw 'should not complete';
    });
    chai_1.expect(ajax_helper_1.MockXMLHttpRequest.mostRecent.url).to.equal('/flibbertyJibbet');
    ajax_helper_1.MockXMLHttpRequest.mostRecent.respondWith({
      'status': 300,
      'contentType': 'text/plain',
      'responseText': 'Wee! I am text!'
    });
    chai_1.expect(error instanceof Rx.AjaxError).to.be.true;
    chai_1.expect(error.message).to.equal('ajax error 300');
    chai_1.expect(error.status).to.equal(300);
  });
  it('should succeed no settings', function() {
    var expected = JSON.stringify({foo: 'bar'});
    Rx.Observable.ajax('/flibbertyJibbet').subscribe(function(x) {
      chai_1.expect(x.status).to.equal(200);
      chai_1.expect(x.xhr.method).to.equal('GET');
      chai_1.expect(x.xhr.responseText).to.equal(expected);
    }, function() {
      throw 'should not have been called';
    });
    chai_1.expect(ajax_helper_1.MockXMLHttpRequest.mostRecent.url).to.equal('/flibbertyJibbet');
    ajax_helper_1.MockXMLHttpRequest.mostRecent.respondWith({
      'status': 200,
      'contentType': 'text/plain',
      'responseText': expected
    });
  });
  it('should fail no settings', function() {
    var expected = JSON.stringify({foo: 'bar'});
    Rx.Observable.ajax('/flibbertyJibbet').subscribe(function() {
      throw 'should not have been called';
    }, function(x) {
      chai_1.expect(x.status).to.equal(500);
      chai_1.expect(x.xhr.method).to.equal('GET');
      chai_1.expect(x.xhr.responseText).to.equal(expected);
    }, function() {
      throw 'should not have been called';
    });
    chai_1.expect(ajax_helper_1.MockXMLHttpRequest.mostRecent.url).to.equal('/flibbertyJibbet');
    ajax_helper_1.MockXMLHttpRequest.mostRecent.respondWith({
      'status': 500,
      'contentType': 'text/plain',
      'responseText': expected
    });
  });
  describe('ajax request body', function() {
    var rFormData;
    beforeEach(function() {
      rFormData = root_1.root.FormData;
      root_1.root.FormData = root_1.root.FormData || (function() {
        function class_1() {}
        return class_1;
      }());
    });
    afterEach(function() {
      root_1.root.FormData = rFormData;
    });
    it('can take string body', function() {
      var obj = {
        url: '/flibbertyJibbet',
        method: '',
        body: 'foobar'
      };
      Rx.Observable.ajax(obj).subscribe();
      chai_1.expect(ajax_helper_1.MockXMLHttpRequest.mostRecent.url).to.equal('/flibbertyJibbet');
      chai_1.expect(ajax_helper_1.MockXMLHttpRequest.mostRecent.data).to.equal('foobar');
    });
    it('can take FormData body', function() {
      var body = new root_1.root.FormData();
      var obj = {
        url: '/flibbertyJibbet',
        method: '',
        body: body
      };
      Rx.Observable.ajax(obj).subscribe();
      chai_1.expect(ajax_helper_1.MockXMLHttpRequest.mostRecent.url).to.equal('/flibbertyJibbet');
      chai_1.expect(ajax_helper_1.MockXMLHttpRequest.mostRecent.data).to.deep.equal(body);
      chai_1.expect(ajax_helper_1.MockXMLHttpRequest.mostRecent.requestHeaders).to.deep.equal({'X-Requested-With': 'XMLHttpRequest'});
    });
    it('should not fail when FormData is undefined', function() {
      root_1.root.FormData = void 0;
      var obj = {
        url: '/flibbertyJibbet',
        method: '',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: {'🌟': '🚀'}
      };
      Rx.Observable.ajax(obj).subscribe();
      chai_1.expect(ajax_helper_1.MockXMLHttpRequest.mostRecent.url).to.equal('/flibbertyJibbet');
    });
    it('should send by form-urlencoded format', function() {
      var body = {'🌟': '🚀'};
      var obj = {
        url: '/flibbertyJibbet',
        method: '',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: body
      };
      Rx.Observable.ajax(obj).subscribe();
      chai_1.expect(ajax_helper_1.MockXMLHttpRequest.mostRecent.url).to.equal('/flibbertyJibbet');
      chai_1.expect(ajax_helper_1.MockXMLHttpRequest.mostRecent.data).to.equal('%F0%9F%8C%9F=%F0%9F%9A%80');
    });
    it('should send by JSON', function() {
      var body = {'🌟': '🚀'};
      var obj = {
        url: '/flibbertyJibbet',
        method: '',
        headers: {'Content-Type': 'application/json'},
        body: body
      };
      Rx.Observable.ajax(obj).subscribe();
      chai_1.expect(ajax_helper_1.MockXMLHttpRequest.mostRecent.url).to.equal('/flibbertyJibbet');
      chai_1.expect(ajax_helper_1.MockXMLHttpRequest.mostRecent.data).to.equal('{"🌟":"🚀"}');
    });
  });
  describe('ajax.get', function() {
    it('should succeed on 200', function() {
      var expected = {foo: 'bar'};
      var result;
      var complete = false;
      Rx.Observable.ajax.get('/flibbertyJibbet').subscribe(function(x) {
        result = x.response;
      }, null, function() {
        complete = true;
      });
      var request = ajax_helper_1.MockXMLHttpRequest.mostRecent;
      chai_1.expect(request.url).to.equal('/flibbertyJibbet');
      request.respondWith({
        'status': 200,
        'contentType': 'application/json',
        'responseText': JSON.stringify(expected)
      });
      chai_1.expect(result).to.deep.equal(expected);
      chai_1.expect(complete).to.be.true;
    });
    it('should succeed on 204 No Content', function() {
      var expected = null;
      var result;
      var complete = false;
      Rx.Observable.ajax.get('/flibbertyJibbet').subscribe(function(x) {
        result = x.response;
      }, null, function() {
        complete = true;
      });
      var request = ajax_helper_1.MockXMLHttpRequest.mostRecent;
      chai_1.expect(request.url).to.equal('/flibbertyJibbet');
      request.respondWith({
        'status': 204,
        'contentType': 'application/json',
        'responseText': expected
      });
      chai_1.expect(result).to.deep.equal(expected);
      chai_1.expect(complete).to.be.true;
    });
    it('should able to select json response via getJSON', function() {
      var expected = {foo: 'bar'};
      var result;
      var complete = false;
      Rx.Observable.ajax.getJSON('/flibbertyJibbet').subscribe(function(x) {
        result = x;
      }, null, function() {
        complete = true;
      });
      var request = ajax_helper_1.MockXMLHttpRequest.mostRecent;
      chai_1.expect(request.url).to.equal('/flibbertyJibbet');
      request.respondWith({
        'status': 200,
        'contentType': 'application/json',
        'responseText': JSON.stringify(expected)
      });
      chai_1.expect(result).to.deep.equal(expected);
      chai_1.expect(complete).to.be.true;
    });
  });
  describe('ajax.post', function() {
    it('should succeed on 200', function() {
      var expected = {
        foo: 'bar',
        hi: 'there you'
      };
      var result;
      var complete = false;
      Rx.Observable.ajax.post('/flibbertyJibbet', expected).subscribe(function(x) {
        result = x;
      }, null, function() {
        complete = true;
      });
      var request = ajax_helper_1.MockXMLHttpRequest.mostRecent;
      chai_1.expect(request.method).to.equal('POST');
      chai_1.expect(request.url).to.equal('/flibbertyJibbet');
      chai_1.expect(request.requestHeaders).to.deep.equal({
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      });
      request.respondWith({
        'status': 200,
        'contentType': 'application/json',
        'responseText': JSON.stringify(expected)
      });
      chai_1.expect(request.data).to.equal('foo=bar&hi=there%20you');
      chai_1.expect(result.response).to.deep.equal(expected);
      chai_1.expect(complete).to.be.true;
    });
    it('should succeed on 204 No Content', function() {
      var expected = null;
      var result;
      var complete = false;
      Rx.Observable.ajax.post('/flibbertyJibbet', expected).subscribe(function(x) {
        result = x;
      }, null, function() {
        complete = true;
      });
      var request = ajax_helper_1.MockXMLHttpRequest.mostRecent;
      chai_1.expect(request.method).to.equal('POST');
      chai_1.expect(request.url).to.equal('/flibbertyJibbet');
      chai_1.expect(request.requestHeaders).to.deep.equal({
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      });
      request.respondWith({
        'status': 204,
        'contentType': 'application/json',
        'responseType': 'json',
        'responseText': expected
      });
      chai_1.expect(result.response).to.equal(expected);
      chai_1.expect(complete).to.be.true;
    });
    it('should succeed in IE on 204 No Content', function() {
      var expected = null;
      var result;
      var complete = false;
      root_1.root.XMLHttpRequest = ajax_helper_1.MockXMLHttpRequestInternetExplorer;
      Rx.Observable.ajax.post('/flibbertyJibbet', expected).subscribe(function(x) {
        result = x;
      }, null, function() {
        complete = true;
      });
      var request = ajax_helper_1.MockXMLHttpRequest.mostRecent;
      chai_1.expect(request.method).to.equal('POST');
      chai_1.expect(request.url).to.equal('/flibbertyJibbet');
      chai_1.expect(request.requestHeaders).to.deep.equal({
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      });
      request.respondWith({
        'status': 204,
        'contentType': 'application/json'
      });
      chai_1.expect(result.response).to.equal(expected);
      chai_1.expect(complete).to.be.true;
    });
  });
});
