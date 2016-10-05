/* */ 
(function(process) {
  "use strict";
  var chai_1 = require('chai');
  var sinon = require('sinon');
  var Immediate_1 = require('../../dist/cjs/util/Immediate');
  var Rx = require('../../dist/cjs/Rx');
  describe('ImmediateDefinition', function() {
    var sandbox;
    beforeEach(function() {
      sandbox = sinon.sandbox.create();
    });
    afterEach(function() {
      sandbox.restore();
    });
    it('should have setImmediate and clearImmediate methods', function() {
      var result = new Immediate_1.ImmediateDefinition(__root__);
      chai_1.expect(result.setImmediate).to.be.a('function');
      chai_1.expect(result.clearImmediate).to.be.a('function');
    });
    describe('when setImmediate exists on root', function() {
      it('should use the setImmediate and clearImmediate methods from root', function() {
        var setImmediateCalled = false;
        var clearImmediateCalled = false;
        var root = {
          setImmediate: function() {
            setImmediateCalled = true;
          },
          clearImmediate: function() {
            clearImmediateCalled = true;
          }
        };
        var result = new Immediate_1.ImmediateDefinition(root);
        result.setImmediate(function() {});
        result.clearImmediate(null);
        chai_1.expect(setImmediateCalled).to.be.ok;
        chai_1.expect(clearImmediateCalled).to.be.ok;
      });
    });
    describe('prototype.createProcessNextTickSetImmediate()', function() {
      it('should create the proper flavor of setImmediate using process.nextTick', function() {
        var instance = {
          root: {process: {nextTick: sinon.spy()}},
          runIfPresent: function() {},
          partiallyApplied: sinon.spy(),
          addFromSetImmediateArguments: sinon.stub().returns(123456)
        };
        var setImmediateImpl = Immediate_1.ImmediateDefinition.prototype.createProcessNextTickSetImmediate.call(instance);
        chai_1.expect(setImmediateImpl).to.be.a('function');
        var action = function() {};
        var handle = setImmediateImpl(action);
        chai_1.expect(handle).to.equal(123456);
        chai_1.expect(instance.addFromSetImmediateArguments).have.been.called;
        chai_1.expect(instance.partiallyApplied).have.been.calledWith(instance.runIfPresent, handle);
      });
    });
    describe('prototype.createPostMessageSetImmediate()', function() {
      it('should create the proper flavor of setImmediate using postMessage', function() {
        var addEventListenerCalledWith = null;
        var instance = {
          root: {
            addEventListener: function(name, callback) {
              addEventListenerCalledWith = [name, callback];
            },
            postMessage: sinon.spy(),
            Math: {random: sinon.stub().returns(42)}
          },
          runIfPresent: sinon.spy(),
          addFromSetImmediateArguments: sinon.stub().returns(123456)
        };
        var setImmediateImpl = Immediate_1.ImmediateDefinition.prototype.createPostMessageSetImmediate.call(instance);
        chai_1.expect(setImmediateImpl).to.be.a('function');
        chai_1.expect(addEventListenerCalledWith[0]).to.equal('message');
        addEventListenerCalledWith[1]({
          data: 'setImmediate$42$123456',
          source: instance.root
        });
        chai_1.expect(instance.runIfPresent).have.been.calledWith(123456);
        var action = function() {};
        var handle = setImmediateImpl(action);
        chai_1.expect(handle).to.equal(123456);
        chai_1.expect(instance.addFromSetImmediateArguments).have.been.called;
        chai_1.expect(instance.root.postMessage).have.been.calledWith('setImmediate$42$123456', '*');
      });
    });
    describe('prototype.createMessageChannelSetImmediate', function() {
      it('should create the proper flavor of setImmediate that uses message channels', function() {
        var port1 = {};
        var port2 = {postMessage: sinon.spy()};
        function MockMessageChannel() {
          this.port1 = port1;
          this.port2 = port2;
        }
        var instance = {
          root: {MessageChannel: MockMessageChannel},
          runIfPresent: sinon.spy(),
          addFromSetImmediateArguments: sinon.stub().returns(123456)
        };
        var setImmediateImpl = Immediate_1.ImmediateDefinition.prototype.createMessageChannelSetImmediate.call(instance);
        chai_1.expect(setImmediateImpl).to.be.a('function');
        chai_1.expect(port1.onmessage).to.be.a('function');
        port1.onmessage({data: 'something'});
        chai_1.expect(instance.runIfPresent).have.been.calledWith('something');
        var action = function() {};
        var handle = setImmediateImpl(action);
        chai_1.expect(handle).to.equal(123456);
        chai_1.expect(port2.postMessage).have.been.calledWith(123456);
      });
    });
    describe('prototype.createReadyStateChangeSetImmediate', function() {
      it('should create the proper flavor of setImmediate that uses readystatechange on a DOM element', function() {
        var fakeScriptElement = {};
        var instance = {
          root: {document: {
              createElement: sinon.stub().returns(fakeScriptElement),
              documentElement: {
                appendChild: sinon.spy(),
                removeChild: sinon.spy()
              }
            }},
          runIfPresent: sinon.spy(),
          addFromSetImmediateArguments: sinon.stub().returns(123456)
        };
        var setImmediateImpl = Immediate_1.ImmediateDefinition.prototype.createReadyStateChangeSetImmediate.call(instance);
        chai_1.expect(setImmediateImpl).to.be.a('function');
        var action = function() {};
        var handle = setImmediateImpl(action);
        chai_1.expect(handle).to.equal(123456);
        chai_1.expect(instance.root.document.createElement).have.been.calledWith('script');
        chai_1.expect(fakeScriptElement.onreadystatechange).to.be.a('function');
        chai_1.expect(instance.root.document.documentElement.appendChild).have.been.calledWith(fakeScriptElement);
        fakeScriptElement.onreadystatechange();
        chai_1.expect(instance.runIfPresent).have.been.calledWith(handle);
        chai_1.expect(fakeScriptElement.onreadystatechange).to.be.a('null');
        chai_1.expect(instance.root.document.documentElement.removeChild).have.been.calledWith(fakeScriptElement);
      });
    });
    describe('when setImmediate does *not* exist on root', function() {
      describe('when it can use process.nextTick', function() {
        it('should use the post message impl', function() {
          var nextTickImpl = function() {};
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUseProcessNextTick').returns(true);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUsePostMessage').returns(false);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUseMessageChannel').returns(false);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUseReadyStateChange').returns(false);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'createProcessNextTickSetImmediate').returns(nextTickImpl);
          var result = new Immediate_1.ImmediateDefinition({});
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUseProcessNextTick).have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUsePostMessage).not.have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUseMessageChannel).not.have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUseReadyStateChange).not.have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.createProcessNextTickSetImmediate).have.been.called;
          chai_1.expect(result.setImmediate).to.equal(nextTickImpl);
        });
      });
      describe('when it cannot use process.nextTick', function() {
        it('should use the post message impl', function() {
          var postMessageImpl = function() {};
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUseProcessNextTick').returns(false);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUsePostMessage').returns(true);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUseMessageChannel').returns(false);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUseReadyStateChange').returns(false);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'createPostMessageSetImmediate').returns(postMessageImpl);
          var result = new Immediate_1.ImmediateDefinition({});
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUseProcessNextTick).have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUsePostMessage).have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUseMessageChannel).not.have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUseReadyStateChange).not.have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.createPostMessageSetImmediate).have.been.called;
          chai_1.expect(result.setImmediate).to.equal(postMessageImpl);
        });
      });
      describe('when it cannot use process.nextTick or postMessage', function() {
        it('should use the readystatechange impl', function() {
          var messageChannelImpl = function() {};
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUseProcessNextTick').returns(false);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUsePostMessage').returns(false);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUseMessageChannel').returns(true);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUseReadyStateChange').returns(false);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'createMessageChannelSetImmediate').returns(messageChannelImpl);
          var result = new Immediate_1.ImmediateDefinition({});
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUseProcessNextTick).have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUsePostMessage).have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUseMessageChannel).have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUseReadyStateChange).not.have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.createMessageChannelSetImmediate).have.been.called;
          chai_1.expect(result.setImmediate).to.equal(messageChannelImpl);
        });
      });
      describe('when it cannot use process.nextTick, postMessage or Message channels', function() {
        it('should use the readystatechange impl', function() {
          var readyStateChangeImpl = function() {};
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUseProcessNextTick').returns(false);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUsePostMessage').returns(false);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUseMessageChannel').returns(false);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUseReadyStateChange').returns(true);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'createReadyStateChangeSetImmediate').returns(readyStateChangeImpl);
          var result = new Immediate_1.ImmediateDefinition({});
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUseProcessNextTick).have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUsePostMessage).have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUseMessageChannel).have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUseReadyStateChange).have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.createReadyStateChangeSetImmediate).have.been.called;
          chai_1.expect(result.setImmediate).to.equal(readyStateChangeImpl);
        });
      });
      describe('when no other methods to implement setImmediate are available', function() {
        it('should use the setTimeout impl', function() {
          var setTimeoutImpl = function() {};
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUseProcessNextTick').returns(false);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUsePostMessage').returns(false);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUseMessageChannel').returns(false);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUseReadyStateChange').returns(false);
          sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'createSetTimeoutSetImmediate').returns(setTimeoutImpl);
          var result = new Immediate_1.ImmediateDefinition({});
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUseProcessNextTick).have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUsePostMessage).have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUseMessageChannel).have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.canUseReadyStateChange).have.been.called;
          chai_1.expect(Immediate_1.ImmediateDefinition.prototype.createSetTimeoutSetImmediate).have.been.called;
          chai_1.expect(result.setImmediate).to.equal(setTimeoutImpl);
        });
      });
    });
    describe('partiallyApplied', function() {
      describe('when passed a function as the first argument', function() {
        it('should return a function that takes no arguments and will be called with the passed arguments', function() {
          var fn = sinon.spy();
          var result = Immediate_1.ImmediateDefinition.prototype.partiallyApplied(fn, 'arg1', 'arg2', 'arg3');
          chai_1.expect(result).to.be.a('function');
          chai_1.expect(fn).not.have.been.called;
          result();
          chai_1.expect(fn).have.been.calledWith('arg1', 'arg2', 'arg3');
        });
      });
      describe('when passed a non-function as an argument', function() {
        it('should coerce to a string and convert to a function which will be called by the returned function', function() {
          __root__.__wasCalled = null;
          var fnStr = '__wasCalled = true;';
          var result = Immediate_1.ImmediateDefinition.prototype.partiallyApplied(fnStr);
          chai_1.expect(result).to.be.a('function');
          result();
          chai_1.expect(__root__.__wasCalled).to.be.true;
          delete __root__.__wasCalled;
        });
      });
    });
    describe('prototype.identify', function() {
      it('should use Object.toString to return an identifier string', function() {
        function MockObject() {}
        sandbox.stub(MockObject.prototype, 'toString').returns('[object HEYO!]');
        var instance = {root: {Object: MockObject}};
        var result = Immediate_1.ImmediateDefinition.prototype.identify.call(instance);
        chai_1.expect(result).to.equal('[object HEYO!]');
      });
    });
    describe('prototype.canUseProcessNextTick', function() {
      describe('when root.process does not identify as [object process]', function() {
        it('should return false', function() {
          var instance = {
            root: {process: {}},
            identify: sinon.stub().returns('[object it-is-not-a-tumor]')
          };
          var result = Immediate_1.ImmediateDefinition.prototype.canUseProcessNextTick.call(instance);
          chai_1.expect(result).to.be.false;
          chai_1.expect(instance.identify).have.been.calledWith(instance.root.process);
        });
      });
      describe('when root.process identifies as [object process]', function() {
        it('should return true', function() {
          var instance = {
            root: {process: {}},
            identify: sinon.stub().returns('[object process]')
          };
          var result = Immediate_1.ImmediateDefinition.prototype.canUseProcessNextTick.call(instance);
          chai_1.expect(result).to.be.true;
          chai_1.expect(instance.identify).have.been.calledWith(instance.root.process);
        });
      });
    });
    describe('prototype.canUsePostMessage', function() {
      describe('when there is a global postMessage function', function() {
        describe('and importScripts does NOT exist', function() {
          it('should maintain any existing onmessage handler', function() {
            var originalOnMessage = function() {};
            var instance = {root: {onmessage: originalOnMessage}};
            Immediate_1.ImmediateDefinition.prototype.canUsePostMessage.call(instance);
            chai_1.expect(instance.root.onmessage).to.equal(originalOnMessage);
          });
          describe('and postMessage is synchronous', function() {
            it('should return false', function() {
              var postMessageCalled = false;
              var instance = {root: {postMessage: function() {
                    postMessageCalled = true;
                    this.onmessage();
                  }}};
              var result = Immediate_1.ImmediateDefinition.prototype.canUsePostMessage.call(instance);
              chai_1.expect(result).to.be.false;
              chai_1.expect(postMessageCalled).to.be.true;
            });
          });
          describe('and postMessage is asynchronous', function() {
            it('should return true', function() {
              var postMessageCalled = false;
              var instance = {root: {postMessage: function() {
                    postMessageCalled = true;
                    var _onmessage = this.onmessage;
                    setTimeout(function() {
                      _onmessage();
                    });
                  }}};
              var result = Immediate_1.ImmediateDefinition.prototype.canUsePostMessage.call(instance);
              chai_1.expect(result).to.be.true;
              chai_1.expect(postMessageCalled).to.be.true;
            });
          });
        });
        describe('and importScripts *does* exist because it is a worker', function() {
          it('should return false', function() {
            var instance = {root: {
                postMessage: function() {},
                importScripts: function() {}
              }};
            var result = Immediate_1.ImmediateDefinition.prototype.canUsePostMessage.call(instance);
            chai_1.expect(result).to.be.false;
          });
        });
      });
      describe('when there is NOT a global postMessage function', function() {
        it('should return false', function() {
          var instance = {root: {}};
          var result = Immediate_1.ImmediateDefinition.prototype.canUsePostMessage.call(instance);
          chai_1.expect(result).to.be.false;
        });
      });
    });
    describe('prototype.canUseMessageChannel', function() {
      it('should return true if MessageChannel exists', function() {
        var instance = {root: {MessageChannel: function() {}}};
        var result = Immediate_1.ImmediateDefinition.prototype.canUseMessageChannel.call(instance);
        chai_1.expect(result).to.be.true;
      });
      it('should return false if MessageChannel does NOT exist', function() {
        var instance = {root: {}};
        var result = Immediate_1.ImmediateDefinition.prototype.canUseMessageChannel.call(instance);
        chai_1.expect(result).to.be.false;
      });
    });
    describe('prototype.canUseReadyStateChange', function() {
      describe('when there is a document in global scope', function() {
        it('should return true if created script elements have an onreadystatechange property', function() {
          var fakeScriptElement = {onreadystatechange: null};
          var instance = {root: {document: {createElement: sinon.stub().returns(fakeScriptElement)}}};
          var result = Immediate_1.ImmediateDefinition.prototype.canUseReadyStateChange.call(instance);
          chai_1.expect(result).to.be.true;
          chai_1.expect(instance.root.document.createElement).have.been.calledWith('script');
        });
        it('should return false if created script elements do NOT have an onreadystatechange property', function() {
          var fakeScriptElement = {};
          var instance = {root: {document: {createElement: sinon.stub().returns(fakeScriptElement)}}};
          var result = Immediate_1.ImmediateDefinition.prototype.canUseReadyStateChange.call(instance);
          chai_1.expect(result).to.be.false;
          chai_1.expect(instance.root.document.createElement).have.been.calledWith('script');
        });
      });
      it('should return false if there is no document in global scope', function() {
        var instance = {root: {}};
        var result = Immediate_1.ImmediateDefinition.prototype.canUseReadyStateChange.call(instance);
        chai_1.expect(result).to.be.false;
      });
    });
    describe('prototype.addFromSetImmediateArguments', function() {
      it('should add to tasksByHandle and increment the nextHandle', function() {
        var partiallyAppliedResult = {};
        var instance = {
          tasksByHandle: {},
          nextHandle: 42,
          partiallyApplied: sinon.stub().returns(partiallyAppliedResult)
        };
        var args = [function() {}, 'foo', 'bar'];
        var handle = Immediate_1.ImmediateDefinition.prototype.addFromSetImmediateArguments.call(instance, args);
        chai_1.expect(handle).to.equal(42);
        chai_1.expect(instance.nextHandle).to.equal(43);
        chai_1.expect(instance.tasksByHandle[42]).to.equal(partiallyAppliedResult);
      });
    });
    describe('clearImmediate', function() {
      it('should delete values from tasksByHandle', function() {
        var setTimeoutImpl = function() {};
        sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUseProcessNextTick').returns(false);
        sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUsePostMessage').returns(false);
        sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUseMessageChannel').returns(false);
        sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'canUseReadyStateChange').returns(false);
        sandbox.stub(Immediate_1.ImmediateDefinition.prototype, 'createSetTimeoutSetImmediate').returns(setTimeoutImpl);
        var Immediate = new Immediate_1.ImmediateDefinition({});
        Immediate.tasksByHandle[123456] = function() {};
        chai_1.expect('123456' in Immediate.tasksByHandle).to.be.true;
        Immediate.clearImmediate(123456);
        chai_1.expect('123456' in Immediate.tasksByHandle).to.be.false;
      });
    });
    describe('prototype.runIfPresent', function() {
      it('should delay running the task if it is currently running a task', function() {
        var mockApplied = function() {};
        var instance = {
          root: {
            setTimeout: sinon.spy(),
            Object: Object
          },
          currentlyRunningATask: true,
          partiallyApplied: sinon.stub().returns(mockApplied)
        };
        Immediate_1.ImmediateDefinition.prototype.runIfPresent.call(instance, 123456);
        chai_1.expect(instance.partiallyApplied).have.been.calledWith(instance.runIfPresent, 123456);
        chai_1.expect(instance.root.setTimeout).have.been.calledWith(mockApplied, 0);
      });
      it('should not error if there is no task currently running and the handle passed is not found', function() {
        chai_1.expect(function() {
          var instance = {
            root: {
              setTimeout: sinon.spy(),
              Object: Object
            },
            currentlyRunningATask: false,
            tasksByHandle: {}
          };
          Immediate_1.ImmediateDefinition.prototype.runIfPresent.call(instance, 888888);
        }).not.to.throw();
      });
      describe('when a task is found for the handle', function() {
        it('should execute the task and clean up after', function() {
          var instance = {
            root: {
              setTimeout: sinon.spy(),
              Object: Object
            },
            currentlyRunningATask: false,
            tasksByHandle: {},
            clearImmediate: sinon.spy()
          };
          var spy = sinon.stub();
          spy({task: function() {
              chai_1.expect(instance.currentlyRunningATask).to.be.true;
            }});
          instance.tasksByHandle[123456] = spy;
          Immediate_1.ImmediateDefinition.prototype.runIfPresent.call(instance, 123456);
          chai_1.expect(instance.clearImmediate).have.been.calledWith(123456);
        });
      });
    });
    describe('prototype.createSetTimeoutSetImmediate', function() {
      it('should create a proper setImmediate implementation that uses setTimeout', function() {
        var mockApplied = function() {};
        var instance = {
          root: {setTimeout: sinon.spy()},
          addFromSetImmediateArguments: sinon.stub().returns(123456),
          runIfPresent: function() {},
          partiallyApplied: sinon.stub().returns(mockApplied)
        };
        var setImmediateImpl = Immediate_1.ImmediateDefinition.prototype.createSetTimeoutSetImmediate.call(instance);
        var handle = setImmediateImpl();
        chai_1.expect(handle).to.equal(123456);
        chai_1.expect(instance.addFromSetImmediateArguments).have.been.called;
        chai_1.expect(instance.root.setTimeout).have.been.calledWith(mockApplied, 0);
      });
    });
    describe('integration test', function() {
      it('should work', function(done) {
        var results = [];
        Rx.Observable.from([1, 2, 3], Rx.Scheduler.asap).subscribe(function(x) {
          results.push(x);
        }, function() {
          done(new Error('should not be called'));
        }, function() {
          chai_1.expect(results).to.deep.equal([1, 2, 3]);
          done();
        });
      });
    });
  });
})(require('process'));