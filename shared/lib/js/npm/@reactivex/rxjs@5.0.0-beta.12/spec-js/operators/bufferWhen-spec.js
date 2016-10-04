/* */ 
"use strict";
var chai_1 = require('chai');
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;
describe('Observable.prototype.bufferWhen', function() {
  asDiagram('bufferWhen')('should emit buffers that close and reopen', function() {
    var e1 = hot('--a--^---b---c---d---e---f---g---------|');
    var e2 = cold('--------------(s|)');
    var expected = '--------------x-------------y-----(z|)';
    var values = {
      x: ['b', 'c', 'd'],
      y: ['e', 'f', 'g'],
      z: []
    };
    expectObservable(e1.bufferWhen(function() {
      return e2;
    })).toBe(expected, values);
  });
  it('should emit buffers using constying cold closings', function() {
    var e1 = hot('--a--^---b---c---d---e---f---g---h------|      ');
    var subs = '^                                  !      ';
    var closings = [cold('---------------s--|                       '), cold('----------(s|)             '), cold('-------------(s|)')];
    var expected = '---------------x---------y---------(z|)   ';
    var values = {
      x: ['b', 'c', 'd'],
      y: ['e', 'f', 'g'],
      z: ['h']
    };
    var i = 0;
    var result = e1.bufferWhen(function() {
      return closings[i++];
    });
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(subs);
  });
  it('should emit buffers using constying hot closings', function() {
    var e1 = hot('--a--^---b---c---d---e---f---g---h------|   ');
    var subs = '^                                  !   ';
    var closings = [{
      obs: hot('-1--^--------------s---|                   '),
      sub: '^              !                       '
    }, {
      obs: hot('--1-^----3--------4----------s-|           '),
      sub: '               ^         !             '
    }, {
      obs: hot('1-2-^------3----4-------5--6-----------s--|'),
      sub: '                         ^         !   '
    }];
    var expected = '---------------x---------y---------(z|)';
    var values = {
      x: ['b', 'c', 'd'],
      y: ['e', 'f', 'g'],
      z: ['h']
    };
    var i = 0;
    var result = e1.bufferWhen(function() {
      return closings[i++].obs;
    });
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(subs);
    for (var j = 0; j < closings.length; j++) {
      expectSubscriptions(closings[j].obs.subscriptions).toBe(closings[j].sub);
    }
  });
  it('should emit buffers using constying empty delayed closings', function() {
    var e1 = hot('--a--^---b---c---d---e---f---g---h------|    ');
    var subs = '^                                  !   ';
    var closings = [cold('---------------|                       '), cold('----------|             '), cold('-------------|')];
    var closeSubs = ['^              !                       ', '               ^         !             ', '                         ^         !   '];
    var expected = '---------------x---------y---------(z|)';
    var values = {
      x: ['b', 'c', 'd'],
      y: ['e', 'f', 'g'],
      z: ['h']
    };
    var i = 0;
    var result = e1.bufferWhen(function() {
      return closings[i++];
    });
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(subs);
    expectSubscriptions(closings[0].subscriptions).toBe(closeSubs[0]);
    expectSubscriptions(closings[1].subscriptions).toBe(closeSubs[1]);
    expectSubscriptions(closings[2].subscriptions).toBe(closeSubs[2]);
  });
  it('should emit buffers using constying cold closings, outer unsubscribed early', function() {
    var e1 = hot('--a--^---b---c---d---e---f---g---h------|      ');
    var unsub = '                  !                       ';
    var subs = '^                 !                       ';
    var closings = [cold('---------------(s|)                       '), cold('----------(s|)             '), cold('-------------(s|)')];
    var closeSubs = ['^              !                          ', '               ^  !                       '];
    var expected = '---------------x---                       ';
    var values = {x: ['b', 'c', 'd']};
    var i = 0;
    var result = e1.bufferWhen(function() {
      return closings[i++];
    });
    expectObservable(result, unsub).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(subs);
    expectSubscriptions(closings[0].subscriptions).toBe(closeSubs[0]);
    expectSubscriptions(closings[1].subscriptions).toBe(closeSubs[1]);
    expectSubscriptions(closings[2].subscriptions).toBe([]);
  });
  it('should not break unsubscription chains when result is unsubscribed explicitly', function() {
    var e1 = hot('--a--^---b---c---d---e---f---g---h------|      ');
    var subs = '^                 !                       ';
    var closings = [cold('---------------(s|)                       '), cold('----------(s|)             '), cold('-------------(s|)')];
    var closeSubs = ['^              !                          ', '               ^  !                       '];
    var expected = '---------------x---                       ';
    var unsub = '                  !                       ';
    var values = {x: ['b', 'c', 'd']};
    var i = 0;
    var result = e1.mergeMap(function(x) {
      return Observable.of(x);
    }).bufferWhen(function() {
      return closings[i++];
    }).mergeMap(function(x) {
      return Observable.of(x);
    });
    expectObservable(result, unsub).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(subs);
    expectSubscriptions(closings[0].subscriptions).toBe(closeSubs[0]);
    expectSubscriptions(closings[1].subscriptions).toBe(closeSubs[1]);
    expectSubscriptions(closings[2].subscriptions).toBe([]);
  });
  it('should propagate error thrown from closingSelector', function() {
    var e1 = hot('--a--^---b---c---d---e---f---g---h------|      ');
    var subs = '^              !                          ';
    var closings = [cold('---------------s--|                       '), cold('----------(s|)             '), cold('-------------(s|)')];
    var closeSubs0 = '^              !                          ';
    var expected = '---------------(x#)                       ';
    var values = {x: ['b', 'c', 'd']};
    var i = 0;
    var result = e1.bufferWhen(function() {
      if (i === 1) {
        throw 'error';
      }
      return closings[i++];
    });
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(subs);
    expectSubscriptions(closings[0].subscriptions).toBe(closeSubs0);
  });
  it('should propagate error emitted from a closing', function() {
    var e1 = hot('--a--^---b---c---d---e---f---g---h------|');
    var subs = '^              !                    ';
    var closings = [cold('---------------s--|                 '), cold('#                    ')];
    var closeSubs = ['^              !                    ', '               (^!)                 '];
    var expected = '---------------(x#)                 ';
    var values = {x: ['b', 'c', 'd']};
    var i = 0;
    var result = e1.bufferWhen(function() {
      return closings[i++];
    });
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(subs);
    expectSubscriptions(closings[0].subscriptions).toBe(closeSubs[0]);
    expectSubscriptions(closings[1].subscriptions).toBe(closeSubs[1]);
  });
  it('should propagate error emitted late from a closing', function() {
    var e1 = hot('--a--^---b---c---d---e---f---g---h------|');
    var subs = '^                    !              ';
    var closings = [cold('---------------s--|                 '), cold('------#              ')];
    var closeSubs = ['^              !                    ', '               ^     !              '];
    var expected = '---------------x-----#              ';
    var values = {x: ['b', 'c', 'd']};
    var i = 0;
    var result = e1.bufferWhen(function() {
      return closings[i++];
    });
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(subs);
    expectSubscriptions(closings[0].subscriptions).toBe(closeSubs[0]);
    expectSubscriptions(closings[1].subscriptions).toBe(closeSubs[1]);
  });
  it('should handle errors', function() {
    var e1 = hot('--a--^---b---c---d---e---f---#');
    var e2 = cold('---------------(s|)');
    var e2subs = ['^              !         ', '               ^        !'];
    var expected = '---------------x--------#';
    var values = {x: ['b', 'c', 'd']};
    var result = e1.bufferWhen(function() {
      return e2;
    });
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should handle empty', function() {
    var e1 = cold('|');
    var e2 = cold('--------(s|)');
    var e1subs = '(^!)';
    var expected = '(x|)';
    var values = {x: []};
    var result = e1.bufferWhen(function() {
      return e2;
    });
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should handle throw', function() {
    var e1 = cold('#');
    var e2 = cold('--------(s|)');
    var e1subs = '(^!)';
    var expected = '#';
    var values = {x: []};
    var result = e1.bufferWhen(function() {
      return e2;
    });
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
  it('should handle never', function() {
    var e1 = hot('-');
    var unsub = '                                            !';
    var e1subs = '^                                           !';
    var e2 = cold('--------(s|)                                 ');
    var e2subs = ['^       !                                    ', '        ^       !                            ', '                ^       !                    ', '                        ^       !            ', '                                ^       !    ', '                                        ^   !'];
    var expected = '--------x-------x-------x-------x-------x----';
    var values = {x: []};
    var source = e1.bufferWhen(function() {
      return e2;
    });
    expectObservable(source, unsub).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should handle an inner never', function() {
    var e1 = hot('--a--^---b---c---d---e---f---g---h------|');
    var e2 = cold('-');
    var expected = '-----------------------------------(x|)';
    var values = {x: ['b', 'c', 'd', 'e', 'f', 'g', 'h']};
    expectObservable(e1.bufferWhen(function() {
      return e2;
    })).toBe(expected, values);
  });
  it('should NOT handle hot inner empty', function(done) {
    var source = Observable.of(1, 2, 3, 4, 5, 6, 7, 8, 9);
    var closing = Observable.empty();
    var TOO_MANY_INVOCATIONS = 30;
    source.bufferWhen(function() {
      return closing;
    }).takeWhile(function(val, index) {
      return index < TOO_MANY_INVOCATIONS;
    }).subscribe(function(val) {
      chai_1.expect(Array.isArray(val)).to.be.true;
      chai_1.expect(val.length).to.equal(0);
    }, function(err) {
      done(new Error('should not be called'));
    }, function() {
      done();
    });
  });
  it('should handle inner throw', function() {
    var e1 = hot('--a--^---b---c---d---e---f---g---h------|');
    var e1subs = '(^!)';
    var e2 = cold('#');
    var e2subs = '(^!)';
    var expected = '#';
    var values = {x: ['b', 'c', 'd', 'e', 'f', 'g', 'h']};
    var result = e1.bufferWhen(function() {
      return e2;
    });
    expectObservable(result).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
    expectSubscriptions(e2.subscriptions).toBe(e2subs);
  });
  it('should handle disposing of source', function() {
    var e1 = hot('--a--^---b---c---d---e---f---g---h------|');
    var subs = '^                   !';
    var unsub = '                    !';
    var e2 = cold('---------------(s|)');
    var expected = '---------------x-----';
    var values = {
      x: ['b', 'c', 'd'],
      y: ['e', 'f', 'g', 'h'],
      z: []
    };
    var source = e1.bufferWhen(function() {
      return e2;
    });
    expectObservable(source, unsub).toBe(expected, values);
    expectSubscriptions(e1.subscriptions).toBe(subs);
  });
});
