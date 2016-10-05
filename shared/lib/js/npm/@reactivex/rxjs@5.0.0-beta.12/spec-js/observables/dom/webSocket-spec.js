/* */ 
"use strict";
var chai_1 = require('chai');
var sinon = require('sinon');
var Rx = require('../../../dist/cjs/Rx');
var ajax_helper_1 = require('../../helpers/ajax-helper');
var Observable = Rx.Observable;
var __ws;
function setupMockWebSocket() {
  ajax_helper_1.MockWebSocket.clearSockets();
  __ws = __root__.WebSocket;
  __root__.WebSocket = ajax_helper_1.MockWebSocket;
}
function teardownMockWebSocket() {
  __root__.WebSocket = __ws;
  ajax_helper_1.MockWebSocket.clearSockets();
}
describe('Observable.webSocket', function() {
  beforeEach(function() {
    setupMockWebSocket();
  });
  afterEach(function() {
    teardownMockWebSocket();
  });
  it('should send and receive messages', function() {
    var messageReceived = false;
    var subject = Observable.webSocket('ws://mysocket');
    subject.next('ping');
    subject.subscribe(function(x) {
      chai_1.expect(x).to.equal('pong');
      messageReceived = true;
    });
    var socket = ajax_helper_1.MockWebSocket.lastSocket;
    chai_1.expect(socket.url).to.equal('ws://mysocket');
    socket.open();
    chai_1.expect(socket.lastMessageSent).to.equal('ping');
    socket.triggerMessage(JSON.stringify('pong'));
    chai_1.expect(messageReceived).to.be.true;
    subject.unsubscribe();
  });
  it('should allow the user to chain operators', function() {
    var messageReceived = false;
    var subject = Observable.webSocket('ws://mysocket');
    subject.map(function(x) {
      return x + '?';
    }).map(function(x) {
      return x + '!';
    }).map(function(x) {
      return x + '!';
    }).subscribe(function(x) {
      chai_1.expect(x).to.equal('pong?!!');
      messageReceived = true;
    });
    var socket = ajax_helper_1.MockWebSocket.lastSocket;
    socket.open();
    socket.triggerMessage(JSON.stringify('pong'));
    chai_1.expect(messageReceived).to.be.true;
    subject.unsubscribe();
  });
  it('receive multiple messages', function() {
    var expected = ['what', 'do', 'you', 'do', 'with', 'a', 'drunken', 'sailor?'];
    var results = [];
    var subject = Observable.webSocket('ws://mysocket');
    subject.subscribe(function(x) {
      results.push(x);
    });
    var socket = ajax_helper_1.MockWebSocket.lastSocket;
    socket.open();
    expected.forEach(function(x) {
      socket.triggerMessage(JSON.stringify(x));
    });
    chai_1.expect(results).to.deep.equal(expected);
    subject.unsubscribe();
  });
  it('should queue messages prior to subscription', function() {
    var expected = ['make', 'him', 'walk', 'the', 'plank'];
    var subject = Observable.webSocket('ws://mysocket');
    expected.forEach(function(x) {
      subject.next(x);
    });
    var socket = ajax_helper_1.MockWebSocket.lastSocket;
    chai_1.expect(socket).not.exist;
    subject.subscribe();
    socket = ajax_helper_1.MockWebSocket.lastSocket;
    chai_1.expect(socket.sent.length).to.equal(0);
    socket.open();
    chai_1.expect(socket.sent.length).to.equal(expected.length);
    subject.unsubscribe();
  });
  it('should send messages immediately if already open', function() {
    var subject = Observable.webSocket('ws://mysocket');
    subject.subscribe();
    var socket = ajax_helper_1.MockWebSocket.lastSocket;
    socket.open();
    subject.next('avast!');
    chai_1.expect(socket.lastMessageSent).to.equal('avast!');
    subject.next('ye swab!');
    chai_1.expect(socket.lastMessageSent).to.equal('ye swab!');
    subject.unsubscribe();
  });
  it('should close the socket when completed', function() {
    var subject = Observable.webSocket('ws://mysocket');
    subject.subscribe();
    var socket = ajax_helper_1.MockWebSocket.lastSocket;
    socket.open();
    chai_1.expect(socket.readyState).to.equal(1);
    sinon.spy(socket, 'close');
    chai_1.expect(socket.close).not.have.been.called;
    subject.complete();
    chai_1.expect(socket.close).have.been.called;
    chai_1.expect(socket.readyState).to.equal(3);
    subject.unsubscribe();
    socket.close.restore();
  });
  it('should close the socket with a code and a reason when errored', function() {
    var subject = Observable.webSocket('ws://mysocket');
    subject.subscribe();
    var socket = ajax_helper_1.MockWebSocket.lastSocket;
    socket.open();
    sinon.spy(socket, 'close');
    chai_1.expect(socket.close).not.have.been.called;
    subject.error({
      code: 1337,
      reason: 'Too bad, so sad :('
    });
    chai_1.expect(socket.close).have.been.calledWith(1337, 'Too bad, so sad :(');
    subject.unsubscribe();
    socket.close.restore();
  });
  it('should allow resubscription after closure via complete', function() {
    var subject = Observable.webSocket('ws://mysocket');
    subject.subscribe();
    var socket1 = ajax_helper_1.MockWebSocket.lastSocket;
    socket1.open();
    subject.complete();
    subject.next('a mariner yer not. yarrr.');
    subject.subscribe();
    var socket2 = ajax_helper_1.MockWebSocket.lastSocket;
    socket2.open();
    chai_1.expect(socket2).not.to.equal(socket1);
    chai_1.expect(socket2.lastMessageSent).to.equal('a mariner yer not. yarrr.');
    subject.unsubscribe();
  });
  it('should allow resubscription after closure via error', function() {
    var subject = Observable.webSocket('ws://mysocket');
    subject.subscribe();
    var socket1 = ajax_helper_1.MockWebSocket.lastSocket;
    socket1.open();
    subject.error({code: 1337});
    subject.next('yo-ho! yo-ho!');
    subject.subscribe();
    var socket2 = ajax_helper_1.MockWebSocket.lastSocket;
    socket2.open();
    chai_1.expect(socket2).not.to.equal(socket1);
    chai_1.expect(socket2.lastMessageSent).to.equal('yo-ho! yo-ho!');
    subject.unsubscribe();
  });
  it('should have a default resultSelector that parses message data as JSON', function() {
    var result;
    var expected = {mork: 'shazbot!'};
    var subject = Observable.webSocket('ws://mysocket');
    subject.subscribe(function(x) {
      result = x;
    });
    var socket = ajax_helper_1.MockWebSocket.lastSocket;
    socket.open();
    socket.triggerMessage(JSON.stringify(expected));
    chai_1.expect(result).to.deep.equal(expected);
    subject.unsubscribe();
  });
  describe('with a config object', function() {
    it('should send and receive messages', function() {
      var messageReceived = false;
      var subject = Observable.webSocket({url: 'ws://mysocket'});
      subject.next('ping');
      subject.subscribe(function(x) {
        chai_1.expect(x).to.equal('pong');
        messageReceived = true;
      });
      var socket = ajax_helper_1.MockWebSocket.lastSocket;
      chai_1.expect(socket.url).to.equal('ws://mysocket');
      socket.open();
      chai_1.expect(socket.lastMessageSent).to.equal('ping');
      socket.triggerMessage(JSON.stringify('pong'));
      chai_1.expect(messageReceived).to.be.true;
      subject.unsubscribe();
    });
    it('should take a protocol and set it properly on the web socket', function() {
      var subject = Observable.webSocket({
        url: 'ws://mysocket',
        protocol: 'someprotocol'
      });
      subject.subscribe();
      var socket = ajax_helper_1.MockWebSocket.lastSocket;
      chai_1.expect(socket.protocol).to.equal('someprotocol');
      subject.unsubscribe();
    });
    it('should take a resultSelector', function() {
      var results = [];
      var subject = Observable.webSocket({
        url: 'ws://mysocket',
        resultSelector: function(e) {
          return e.data + '!';
        }
      });
      subject.subscribe(function(x) {
        results.push(x);
      });
      var socket = ajax_helper_1.MockWebSocket.lastSocket;
      socket.open();
      ['ahoy', 'yarr', 'shove off'].forEach(function(x) {
        socket.triggerMessage(x);
      });
      chai_1.expect(results).to.deep.equal(['ahoy!', 'yarr!', 'shove off!']);
      subject.unsubscribe();
    });
    it('if the resultSelector fails it should go down the error path', function() {
      var subject = Observable.webSocket({
        url: 'ws://mysocket',
        resultSelector: function(e) {
          throw new Error('I am a bad error');
        }
      });
      subject.subscribe(function(x) {
        chai_1.expect(x).to.equal('this should not happen');
      }, function(err) {
        chai_1.expect(err).to.be.an('error', 'I am a bad error');
      });
      var socket = ajax_helper_1.MockWebSocket.lastSocket;
      socket.open();
      socket.triggerMessage('weee!');
      subject.unsubscribe();
    });
    it('should accept a closingObserver', function() {
      var calls = 0;
      var subject = Observable.webSocket({
        url: 'ws://mysocket',
        closingObserver: {next: function(x) {
            calls++;
            chai_1.expect(x).to.be.an('undefined');
          }}
      });
      subject.subscribe();
      var socket = ajax_helper_1.MockWebSocket.lastSocket;
      socket.open();
      chai_1.expect(calls).to.equal(0);
      subject.complete();
      chai_1.expect(calls).to.equal(1);
      subject.subscribe();
      socket = ajax_helper_1.MockWebSocket.lastSocket;
      socket.open();
      subject.error({code: 1337});
      chai_1.expect(calls).to.equal(2);
      subject.unsubscribe();
    });
    it('should accept a closeObserver', function() {
      var expected = [{wasClean: true}, {wasClean: false}];
      var closes = [];
      var subject = Observable.webSocket({
        url: 'ws://mysocket',
        closeObserver: {next: function(e) {
            closes.push(e);
          }}
      });
      subject.subscribe();
      var socket = ajax_helper_1.MockWebSocket.lastSocket;
      socket.open();
      chai_1.expect(closes.length).to.equal(0);
      socket.triggerClose(expected[0]);
      chai_1.expect(closes.length).to.equal(1);
      subject.subscribe(null, function(err) {
        chai_1.expect(err).to.equal(expected[1]);
      });
      socket = ajax_helper_1.MockWebSocket.lastSocket;
      socket.open();
      socket.triggerClose(expected[1]);
      chai_1.expect(closes.length).to.equal(2);
      chai_1.expect(closes[0]).to.equal(expected[0]);
      chai_1.expect(closes[1]).to.equal(expected[1]);
      subject.unsubscribe();
    });
    it('should handle constructor errors', function() {
      var subject = Observable.webSocket({
        url: 'bad_url',
        WebSocketCtor: function(url, protocol) {
          throw new Error("connection refused");
        }
      });
      subject.subscribe(function(x) {
        chai_1.expect(x).to.equal('this should not happen');
      }, function(err) {
        chai_1.expect(err).to.be.an('error', 'connection refused');
      });
      subject.unsubscribe();
    });
  });
  describe('multiplex', function() {
    it('should multiplex over the websocket', function() {
      var results = [];
      var subject = Observable.webSocket('ws://websocket');
      var source = subject.multiplex(function() {
        return {sub: 'foo'};
      }, function() {
        return {unsub: 'foo'};
      }, function(value) {
        return value.name === 'foo';
      });
      var sub = source.subscribe(function(x) {
        results.push(x.value);
      });
      var socket = ajax_helper_1.MockWebSocket.lastSocket;
      socket.open();
      chai_1.expect(socket.lastMessageSent).to.deep.equal({sub: 'foo'});
      [1, 2, 3, 4, 5].map(function(x) {
        return {
          name: x % 3 === 0 ? 'bar' : 'foo',
          value: x
        };
      }).forEach(function(x) {
        socket.triggerMessage(JSON.stringify(x));
      });
      chai_1.expect(results).to.deep.equal([1, 2, 4, 5]);
      sinon.spy(socket, 'close');
      sub.unsubscribe();
      chai_1.expect(socket.lastMessageSent).to.deep.equal({unsub: 'foo'});
      chai_1.expect(socket.close).have.been.called;
      socket.close.restore();
    });
    it('should work in combination with retry (issue #1466)', function() {
      var error = {wasClean: false};
      var results = [];
      var subject = Observable.webSocket({url: 'ws://mysocket'}).multiplex(function() {
        return results.push('sub');
      }, function() {
        return results.push('unsub');
      }, function() {
        return true;
      }).retry(1);
      subject.subscribe(function() {
        return results.push('next');
      }, function(e) {
        return results.push(e);
      });
      var socket = ajax_helper_1.MockWebSocket.lastSocket;
      socket.triggerClose(error);
      chai_1.expect(results).to.deep.equal(['sub', 'unsub', 'sub', error, 'unsub']);
    });
    it('should not close the socket until all subscriptions complete', function() {
      var socketSubject = Rx.Observable.webSocket({url: 'ws://mysocket'});
      var results = [];
      var socketMessages = [{id: 'A'}, {id: 'B'}, {
        id: 'A',
        complete: true
      }, {id: 'B'}, {
        id: 'B',
        complete: true
      }];
      socketSubject.multiplex(function() {
        return 'no-op';
      }, function() {
        return results.push('A unsub');
      }, function(req) {
        return req.id === 'A';
      }).takeWhile(function(req) {
        return !req.complete;
      }).subscribe(function() {
        return results.push('A next');
      }, function(e) {
        return results.push('A error ' + e);
      }, function() {
        return results.push('A complete');
      });
      socketSubject.multiplex(function() {
        return 'no-op';
      }, function() {
        return results.push('B unsub');
      }, function(req) {
        return req.id === 'B';
      }).takeWhile(function(req) {
        return !req.complete;
      }).subscribe(function() {
        return results.push('B next');
      }, function(e) {
        return results.push('B error ' + e);
      }, function() {
        return results.push('B complete');
      });
      var socket = ajax_helper_1.MockWebSocket.lastSocket;
      socket.open();
      socketMessages.forEach(function(msg) {
        socket.triggerMessage(JSON.stringify(msg));
      });
      chai_1.expect(results).to.deep.equal(['A next', 'B next', 'A complete', 'A unsub', 'B next', 'B complete', 'B unsub']);
    });
  });
});