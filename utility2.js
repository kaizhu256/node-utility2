#!/usr/bin/env node
/*jslint browser: true, indent: 2, maxerr: 8, node: true, nomen: true, regexp: true, todo: true, unparam: true*/
/*global global, required, state, utility2, $*/



(function moduleInitShared() {
  /*
    this shared module inits utility2
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleInitShared',

    _init: function () {
      /* export global object */
      if (typeof window === 'object') {
        window.global = window;
      }
      /* init global required object */
      local._initRequired(global);
      /* global utility2 object */
      global.utility2 = required.utility2 = global.utility2 || {};
      local.setDefault(global, {
        /* global dummy module object */
        module: null,
        /* global state object */
        state: {
          /* javascript platform unknown */
          javascriptPlatform: 'unknown',
          /* list of test-generated errors to be ignored */
          onEventErrorDefaultIgnoreList: [],
          /* dict of browser test callbacks */
          browserTestCallbackDict: {},
          /* default timeout */
          timeoutDefault: 60000
        },
        /* global utility2 object */
        utility2: {
          assert: local.assert,
          deferCallback: local.deferCallback,
          initModule: local.initModule,
          onEventErrorDefault: local.onEventErrorDefault,
          setDefault: local.setDefault
        }
      });
      console.log2 = console.log2 || console.log;
      /* debug print */
      global[['debug', 'Print'].join('')] = utility2._zxqjDp = function (arg) {
        /*
          this internal function is used for temporary debugging,
          and jslint will nag you to remove it if used
        */
        console.log2('\n\n\n\ndebug' + 'Print');
        console.log2.apply(console, arguments);
        console.log2();
        /* return arg for inspection */
        return arg;
      };
      /* debug onEventError */
      global.onEventError = utility2.onEventErrorDefault;
      /* javascript platform - nodejs */
      if (global.process && process.versions && process.versions.node) {
        state.javascriptPlatform = 'nodejs';
        state.modeNodejs = true;
      }
      /* javascript platform - browser */
      if (global.document && global.document.body
          && global.jQuery
          && global.location
          && global.window) {
        state.javascriptPlatform = 'browser';
        state.modeBrowser = true;
        state.modeInit = 2;
        /* set browser test mode */
        state.modeTest = state.modeTest
          || (/\bmodeTest=\w/).test(global.location && global.location.hash);
      }
      /* export utility2.untilReadyUtility2 */
      utility2.untilReadyUtility2 = function (onEventError) {
        /*
          this function defers the onEventError callback until utility2 is ready
        */
        utility2.deferCallback('untilReadyUtility2', 'defer', onEventError);
      };
      /* init module */
      utility2.initModule(module, local);
      /* assert state.timeoutDefault is a positive, finite number */
      setTimeout(function () {
        utility2.assert(
          0 < state.timeoutDefault && state.timeoutDefault < Infinity,
          'invalid state.timeoutDefault ' + state.timeoutDefault
        );
      });
    },

    _initOnce: function () {
      /* export utility2 error object */
      utility2.error = utility2.error || new Error('utility2 error');
      /* export utility2.readyUtility2 */
      utility2.readyUtility2 = utility2.untilReady(function (error) {
        /*
          this function is called to indicate that a component of utility2 is ready
        */
        utility2.deferCallback('untilReadyUtility2', 'ready', error);
      });
      /* utility2 ready */
      utility2.readyUtility2.remaining += 1;
      (state.modeBrowser ? global.jQuery : setTimeout)(utility2.readyUtility2);
      /* init browser */
      local._initBrowser(global);
    },

    __initOnce_default_test: function (onEventError) {
      /*
        this function tests _initOnce's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { jQuery: utility2.callArg0, setTimeout: utility2.callArg0 }],
        [local, { _initBrowser: utility2.nop }],
        [utility2, { deferCallback: null, readyUtility2: null }]
      ], function (onEventError) {
        utility2.deferCallback = function () {
          onEventError();
        };
        local._initOnce();
      });
    },

    _initBrowser: function (global) {
      /*
        this function runs browser-side initializations
      */
      var params;
      if (!state.modeBrowser) {
        return;
      }
      /* mock required.colors */
      required.colors = required.colors || {};
      [ 'black', 'blackBG', 'blue', 'blueBG', 'bold',
        'cyan', 'cyanBG',
        'green', 'greenBG', 'grey', 'greyBG',
        'inverse', 'italic',
        'magenta', 'magentaBG',
        'rainbow', 'red', 'redBG',
        'strikethrough', 'stripColors',
        'underline',
        'white', 'whiteBG',
        'yellow', 'yellowBG',
        'zebra' ].forEach(function (color) {
        required.colors[color] = required.colors[color] || utility2.echo;
      });
      /* save test id identifying server-side test callback */
      state.testCallbackId = utility2.urlParamsGet(global.location.search).testCallbackId;
      params = utility2.urlParamsGet(global.location.hash, '#');
      /* browser test mode - watch */
      if (params.testWatch) {
        /* increment testWatch counter */
        global.location.hash = utility2.urlParamsMerge(global.location.hash, {
          testWatch: (Number(params.testWatch) + 1).toString()
        }, '#');
        /* watch server for changes and reload via server-sent events */
        new global.EventSource('/test/test.watch').addEventListener('message', function () {
          global.location.reload();
        });
      }
      /* qunit hook */
      if (global.QUnit) {
        global.QUnit.done = function (test_results) {
          utility2.deferCallback('untilReadyTestReport', 'defer', function () {
            test_results.testDict = state.qunitTestDict;
            global.global_test_results = test_results;
          });
        };
        global.QUnit.testStart(function (testDetails) {
          global.QUnit.log = function (details) {
            state.qunitTestDict = state.qunitTestDict || {};
            state.qunitTestDict[testDetails.name] = details;
          };
        });
      }
    },

    __initBrowser_default_test: function (onEventError) {
      /*
        this function tests _initBrowser's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { required: { url: required.url }, state: { modeBrowser: null } }],
        [utility2, { deferCallback: utility2.callArg2 }]
      ], function (onEventError) {
        var global2;
        /* test null case handling behavior */
        local._initBrowser({});
        /* test default handling behavior */
        state.modeBrowser = true;
        global2 = {
          /* test server sent event handling behavior */
          EventSource: function () {
            this.addEventListener = utility2.callArg1;
          },
          /* test testWatch handling behavior */
          location: { hash: '#testWatch=1', reload: utility2.nop, search: '' },
          /* test qunit handling behavior */
          QUnit: { testStart: utility2.nop }
        };
        local._initBrowser(global2);
        global2.QUnit.done({});
        /* test no qunit handling behavior */
        global2.QUnit = null;
        local._initBrowser(global2);
        onEventError();
      });
    },

    _initRequired: function (global) {
      /*
        this function inits the global required object */
      global.required = global.required || {};
    },

    __initRequired_default_test: function (onEventError) {
      /*
        this function tests _initRequired's default handling behavior
      */
      var global2;
      global2 = {};
      local._initRequired(global2);
      utility2.assert(global2.required, global2.required);
      onEventError();
    },

    assert: function (passed, message) {
      /*
        this function throws an error if the assertion fails
      */
      if (!passed) {
        /* if message is an Error object, then get its stack trace */
        message = message instanceof Error
          ? utility2.errorStack(message)
          /* if message is a string, then leave it as is */
          : typeof message === 'string'
          ? message
          /* else JSON.stringify message */
          : utility2.jsonStringifyCircular(message);
        throw new Error('assertion error - ' + (message || 'undefined'));
      }
    },

    _assert_default_test: function (onEventError) {
      /*
        this function tests assert's default handling behavior
      */
      /* test successful assertion */
      utility2.assert(true, true);
      /* test failed assertion */
      utility2.tryCatch(function () {
        utility2.assert(false, undefined);
      }, function (error) {
        utility2.assert(error instanceof Error, error);
      });
      /* test failed assertion with message */
      utility2.tryCatch(function () {
        utility2.assert(false, '_assert_default_test');
      }, function (error) {
        utility2.assert(error instanceof Error, error);
      });
      /* test failed assertion with error */
      utility2.tryCatch(function () {
        utility2.assert(false, utility2.error);
      }, function (error) {
        utility2.assert(error instanceof Error, error);
      });
      onEventError();
    },

    callArg0: function (callback) {
      /*
        this function calls the callback in arg position 0
      */
      callback();
    },

    _callArg0_default_test: function (onEventError) {
      /*
        this function tests callArg0's default handling behavior
      */
      utility2.callArg0(function () {
        onEventError();
      });
    },

    callArg1: function (_, callback) {
      /*
        this function calls the callback in arg position 1
      */
      callback();
    },

    _callArg1_default_test: function (onEventError) {
      /*
        this function tests callArg1's default handling behavior
      */
      utility2.callArg1(null, function () {
        onEventError();
      });
    },

    callArg2: function (_, __, callback) {
      /*
        this function calls the callback in arg position 2
      */
      callback();
    },

    _callArg2_default_test: function (onEventError) {
      /*
        this function tests callArg2's default handling behavior
      */
      utility2.callArg2(null, null, function () {
        onEventError();
      });
    },

    callError0: function (onEventError) {
      /*
        this function calls the onEventError callback in arg position 0 with an error object
      */
      onEventError(utility2.error);
    },

    _callError0_default_test: function (onEventError) {
      /*
        this function tests callError0's default handling behavior
      */
      utility2.callError0(function (error) {
        utility2.assert(error instanceof Error, error);
        onEventError();
      });
    },

    callError1: function (_, onEventError) {
      /*
        this function calls the onEventError callback in arg position 1 with an error object
      */
      onEventError(utility2.error);
    },

    _callError1_default_test: function (onEventError) {
      /*
        this function tests callError1's default handling behavior
      */
      utility2.callError1(null, function (error) {
        utility2.assert(error instanceof Error, error);
        onEventError();
      });
    },

    callError2: function (_, __, onEventError) {
      /*
        this function calls the onEventError callback in arg position 2 with an error object
      */
      onEventError(utility2.error);
    },

    _callError2_default_test: function (onEventError) {
      /*
        this function tests callError2's default handling behavior
      */
      utility2.callError2(null, null, function (error) {
        utility2.assert(error instanceof Error, error);
        onEventError();
      });
    },

    commentShebang: function (script) {
      /*
        this function comments out the shebang in a script
        usage example:
        utility2.commentShebang('#!/usr/bin/env node\nconsole.log("commentShebang");\n');
      */
      return script.replace(/(^#!.*)/, '//$1');
    },

    _createTest: function (global, local2) {
      /*
        this function creates a _Test object
      */
      var self;
      self = new local._Test();
      self.global = global;
      self.local2 = local2;
      /* set default test values for state */
      utility2.setDefault(self.global.state, {
        testSuiteFailList: [],
        testSuiteList: [],
        testSuiteRemaining: 0,
        testSummary: { failures: 0, passed: 0, time: 0 },
        onEventErrorDefaultIgnoreList: []
      });
      return self;
    },

    _debug_print_default_test: function (onEventError) {
      /*
        this function tests debug print's default handling behavior
      */
      utility2.testMock(onEventError, [
        [console, { log2: null }]
      ], function (onEventError) {
        var message;
        message = '';
        console.log2 = function (_) {
          message += (_ || '') + '\n';
        };
        utility2._zxqjDp('_debug_print_default_test');
        utility2.assert(
          message === '\n\n\n\ndebug' + 'Print\n_debug_print_default_test\n\n',
          message
        );
        onEventError();
      });
    },

    deferCallback: function (key, mode, callback) {
      /*
        this function defers the callback until a ready-state is given
      */
      var callback2, self, timeout;
      callback2 = function () {
        clearTimeout(timeout);
        callback.apply(null, arguments);
      };
      self = state.deferCallbackDict = state.deferCallbackDict || {};
      self = self[key] = self[key] || { callbackList: [] };
      switch (mode) {
      case 'defer':
        /* optimization - fast callback if ready-state */
        if (self.modeReady) {
          callback2(self.error);
          return;
        }
        /* slow deferred callback */
        self.callbackList.push(callback2);
        /* set timeout for deferred callback*/
        self.timeout = timeout = utility2.onEventTimeout(function (error) {
          self.callbackList.splice(self.callbackList.indexOf(callback2), 1)[0](error);
        }, state.timeoutDefault, 'deferCallback ' + key);
        break;
      case 'delete':
        /* clear timeout */
        clearTimeout(self.timeout);
        delete state.deferCallbackDict[key];
        break;
      case 'ready':
        self.error = callback;
        self.modeReady = true;
        while (self.callbackList.length) {
          utility2.deferCallback(key, 'defer', self.callbackList.shift());
        }
        break;
      }
    },

    _deferCallback_timeout_test: function (onEventError) {
      /*
        this function tests deferCallback's timeout handling behavior
      */
      var key;
      key = utility2.uuid4();
      utility2.testMock(onEventError, [
        [global, { state: {} }]
      ], function (onEventError) {
        utility2.deferCallback(key, 'defer', function (error) {
          utility2.tryCatch(function () {
            utility2.assert(error instanceof Error, error);
            utility2.assert(error.code === 'ETIMEDOUT', error.code);
            utility2.deferCallback(key, 'delete');
            utility2.assert(
              state.deferCallbackDict[key] === undefined,
              state.deferCallbackDict[key]
            );
            onEventError();
          }, onEventError);
        });
      });
    },

    echo: function (arg) {
      return arg;
    },

    _echo_default_test: function (onEventError) {
      /*
      this function tests echo's default handling behavior
      */
      var data;
      data = utility2.echo('_echo_default_test');
      utility2.assert(data === '_echo_default_test', data);
      onEventError();
    },

    errorStack: function (error) {
      /*
        this function returns the error's stack or message attribute if possible
      */
      return error && (error.stack || error.message || error);
    },

    evalOnEventError: function (file, script, onEventError) {
      /*
        this function evals the script in a try-catch block with error handling,
        in the utility2 module context
      */
      if (file instanceof Error) {
        onEventError(file);
        return;
      }
      utility2.tryCatch(function () {
        /*jslint evil: true*/
        onEventError(null, state.modeNodejs
          /* javascript platform nodejs */
          ? required.vm.runInThisContext(script, file)
          /* javascript platform browaer */
          : eval(script));
      }, onEventError);
    },

    _evalOnEventError_default_test: function (onEventError) {
      /*
        this function tests evalOnEventError's default handling behavior
      */
      /* test default handling behavior */
      utility2.evalOnEventError(
        '_evalOnEventError_default_test.js',
        '"_evalOnEventError_default_test"',
        function (error, data) {
          utility2.assert(!error, error);
          utility2.assert(data === '_evalOnEventError_default_test', data);
        }
      );
      /* test error handling behavior */
      utility2.evalOnEventError(utility2.error, null, function (error) {
        utility2.assert(error instanceof Error, error);
      });
      /* test syntax error handling behavior */
      utility2.evalOnEventError(
        '_evalOnEventError_default_test.js',
        '_evalOnEventError_default_test',
        function (error) {
          utility2.assert(error instanceof Error, error);
        }
      );
      onEventError();
    },

    initModule: function (module, local2) {
      /*
        this function inits the module with the local object
        usage example:
        utility2.initModule(module, local);
      */
      var exports;
      if (state.modeInit === 1) {
        return;
      }
      /* assert local2._name */
      utility2.assert(local2._name, 'invalid local2._name ' + local2._name);
      /* module exports */
      exports = local2._name.split('.');
      exports = required[exports[0]] = required[exports[0]] || {};
      Object.keys(local2).forEach(function (key) {
        var match;
        /* ignore test items */
        if (key.slice(-5) === '_test') {
          return;
        }
        /* set dict items to state object */
        match = (/(.+Dict)_(.*)/).exec(key);
        if (match) {
          state[match[1]] = state[match[1]] || {};
          state[match[1]][match[2]] = local2[key];
          return;
        }
        /* set prototype items to object's prototype */
        match = (/(.+)_prototype_(.+)/).exec(key);
        if (match) {
          local2[match[1]].prototype[match[2]] = local2[key];
          return;
        }
        /* angularjs app */
        match = (/(\w+)_ngApp_(\w+)_(\w+)/).exec(key);
        if (match) {
          local2[match[1]] = local2[match[1]] || global.angular.module(match[1], []);
          local2[match[1]][match[2]](match[3], local2[key]);
          return;
        }
        /* set remaining items to exports */
        if (key[0] !== '_') {
          exports[key] = local2[key];
        }
      });
      /* javascript platform nodejs */
      if (state.modeNodejs && module && utility2.fsWatch) {
        exports.__filename = exports.__filename || module.filename;
        state.moduleCacheDict = state.moduleCacheDict || {};
        if (!state.moduleCacheDict[exports.__filename]) {
          state.moduleCacheDict[exports.__filename] = module;
          /* watch module */
          utility2.fsWatch({
            actionList: ['lint', 'evalOnWatch'],
            file: exports.__filename
          }, utility2.onEventErrorDefault);
        }
      }
      /* init local2._initOnce */
      state.initOnceDict = state.initOnceDict || {};
      if (local2._initOnce && !state.initOnceDict[local2._name]) {
        state.initOnceDict[local2._name] = true;
        /* defer _initOnce until jQuery.ready */
        if (state.modeBrowser) {
          global.jQuery(function () {
            local2._initOnce();
          });
        } else {
          local2._initOnce();
        }
      }
      /* wait until utility2 is ready before running tests */
      if (state.modeInit > 1) {
        state.testModuleDict = state.testModuleDict || {};
        utility2.untilReadyUtility2(function () {
          /* init test */
          if (state.modeTest !== false
              /* ensure state.serverListened or not state.modeNodejs */
              && (!state.modeNodejs || state.serverListened)
              && (local2._modeTest || (state.modeTest
                && state.testModuleDict[local2._name] !== false
                && state.testModuleDict[local2._name.split('.')[0]]))) {
            local._createTest(global, local2).run();
          }
        });
      }
    },

    _initModule_default_test: function (onEventError) {
      /*
        this function tests initModule's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, {
          angular: { module: function () {
            return { controller: utility2.nop };
          } },
          jQuery: utility2.callArg0,
          required: {},
          state: { modeBrowser: true, modeNodejs: true }
        }],
        [local, { _createTest: function () {
          return { run: utility2.nop };
        } }]
      ], function (onEventError) {
        var local2;
        /* test null case handling behavior */
        state.modeInit = 1;
        utility2.initModule();
        /* test bootstrap handling behavior */
        state.modeInit = 0;
        utility2.initModule(null, { _name: 'utility2._initModule_default_test' });
        /* test no test handling behavior */
        state.modeInit = 2;
        state.modeTest = false;
        utility2.initModule(null, { _name: 'utility2._initModule_default_test' });
        /* test default handling behavior */
        state.modeTest = true;
        state.serverListened = true;
        local2 = {
          /* test dict handling behavior */
          _aaDict_bb: true,
          /* test class handling behavior */
          _Aa: utility2.nop,
          /* test class prototype handling behavior */
          _Aa_prototype_bb: utility2.nop,
          /* test angularjs app handling behavior */
          _aa_ngApp_controller_bb: [],
          _initOnce: utility2.nop,
          _modeTest: true,
          _name: 'utility2._initModule_default_test'
        };
        utility2.initModule(null, local2);
        utility2.assert(local2._Aa.prototype.bb, local2._Aa.prototype);
        onEventError();
      });
    },

    jsonCopy: function (object) {
      /*
        this function deep copies the json object using JSON.parse(JSON.stringify(object))
      */
      return JSON.parse(JSON.stringify(object));
    },

    jsonLog: function (message, data) {
      /*
        this function uses JSON.stringify to give a consistent print format
        across various javascript platforms
      */
      if (state.modeSilent) {
        return;
      }
      message = message || '';
      if (data) {
        message += ' ' + utility2.jsonStringifyCircular(data);
      }
      /* security - remove secrets from log */
      console.log(message.replace(
        (/"[^"]*(?:authoriz|key|login|passw|secret|token)[\S\s]*?([,}])/gi),
        function (_, match1) {
          return match1 === ',' ? '' : match1;
        }
      ));
    },

    _jsonLog_default_test: function (onEventError) {
      /*
        this function tests jsonLog's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: { modeSilent: null } }]
      ], function (onEventError) {
        var message;
        console.log = function (_) {
          message = _;
        };
        /* test silent handling behavior */
        state.modeSilent = true;
        utility2.jsonLog('_jsonLog_default_test');
        utility2.assert(!message, message);
        /* test default handling behavior */
        state.modeSilent = null;
        utility2.jsonLog('_jsonLog_default_test', {});
        utility2.assert(message === '_jsonLog_default_test {}', message);
        /* test no data handling behavior */
        utility2.jsonLog('_jsonLog_default_test');
        utility2.assert(message === '_jsonLog_default_test', message);
        /* test secret handling behavior */
        utility2.jsonLog('_jsonLog_default_test', { secret1: 'aa', secret2: 'bb' });
        utility2.assert(message === '_jsonLog_default_test {}', message);
        onEventError();
      });
    },

    jsonParseHandler: function (onEventError) {
      /*
        this function returns a callback that will JSON.parse the data with error handling
      */
      return function (error, data) {
        /* silently ignore undefined data */
        if (error || data === undefined) {
          onEventError(error, data);
          return;
        }
        try {
          data = JSON.parse(data);
        } catch (error2) {
          onEventError(error2);
          return;
        }
        onEventError(null, data);
      };
    },

    _jsonParseHandler_default_test: function (onEventError) {
      /*
        this function tests jsonParseHandler's default handling behavior
      */
      /* test default handling behavior */
      utility2.jsonParseHandler(function (error, data) {
        utility2.assert(!error, error);
        utility2.assert(data === '_jsonParseHandler_default_test', data);
      })(null, '"_jsonParseHandler_default_test"');
      /* test error handling behavior */
      utility2.jsonParseHandler(function (error, data) {
        utility2.assert(error instanceof Error, error);
      })(null, '_jsonParseHandler_default_test');
      /* test undefined handling behavior */
      utility2.jsonParseHandler(function (error, data) {
        utility2.assert(!error, error);
        utility2.assert(data === undefined, data);
      })();
      onEventError();
    },

    jsonParseOrError: function (data) {
      /*
        this function returns JSON.parse(data) or an error
      */
      try {
        return JSON.parse(data);
      } catch (error) {
        return error;
      }
    },

    _jsonParseOrError_syntaxError_test: function (onEventError) {
      /*
        this function tests jsonParseOrError's syntax error handling behavior
      */
      var data;
      data = utility2.jsonParseOrError('_jsonParseOrError_syntaxError_test');
      utility2.assert(data instanceof Error, data);
      onEventError();
    },

    jsonStringifyCircular: function (value, replacer, space) {
      /*
        this function JSON.stringify's the value, ignoring circular references.
        documentation for the arguments provided @
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_native_JSON
      */
      return JSON.stringify(local._jsonStringifyCircularRecurse(value, []), replacer, space);
    },

    _jsonStringifyCircular_default_test: function (onEventError) {
      /*
        this function tests jsonStringifyCircular's default handling behavior
      */
      var circular, data;
      /* test undefined handling behavior */
      data = utility2.jsonStringifyCircular(undefined);
      utility2.assert(data === undefined, data);
      /* test circular handling behavior */
      circular = {};
      circular.circular = circular;
      circular = {'aa': [1, circular, 2], 'bb': utility2.nop };
      data = utility2.jsonStringifyCircular(circular);
      utility2.assert(data === '{"aa":[1,{},2]}', data);
      onEventError();
    },

    _jsonStringifyCircularRecurse: function (value, circularList) {
      /*
        this function recurses through the value looking for circular objects
      */
      var result;
      /* return the value if its falsey */
      if (!value) {
        return value;
      }
      /* return undefined if the value is circular */
      if (circularList.indexOf(value) >= 0) {
        return;
      }
      /* return the value if JSON.stringify succeeds */
      utility2.tryCatch(function () {
        result = JSON.stringify(value);
      }, utility2.nop);
      if (result) {
        return value;
      }
      /* fallback code if JSON.stringify fails */
      /* add the value to circularList */
      circularList.push(value);
      /* the value is a function */
      if (typeof value === 'function') {
        return;
      }
      /* value is an array */
      if (Array.isArray(value)) {
        return value.map(function (element) {
          return local._jsonStringifyCircularRecurse(element, circularList);
        });
      }
      /* value is an object */
      result = {};
      Object.keys(value).forEach(function (key) {
        result[key] = local._jsonStringifyCircularRecurse(value[key], circularList);
      });
      return result;
    },

    jsonStringifyOrdered: function (value) {
      /*
        this function JSON.stringify's the value with dictionaries in sorted order,
        allowing reliable / reproducible string comparisons and tests
      */
      return !value || (typeof value !== 'object' && !Array.isArray(value))
        ? JSON.stringify(value)
        : local._jsonStringifyOrderedRecurse(local._jsonStringifyCircularRecurse(value, []));
    },

    _jsonStringifyOrdered_default_test: function (onEventError) {
      /*
        this function tests jsonStringifyOrdered's default handling behavior
      */
      var data;
      /* test undefined handling behavior */
      data = utility2.jsonStringifyOrdered(undefined);
      utility2.assert(data === undefined, data);
      /* test function handling behavior */
      data = utility2.jsonStringifyOrdered(utility2.nop);
      utility2.assert(data === undefined, data);
      /* test default handling behavior */
      data = utility2.jsonStringifyOrdered({
        ee: {},
        dd: [undefined],
        cc: utility2.nop,
        bb: 2,
        aa: 1
      });
      utility2.assert(data === '{"aa":1,"bb":2,"dd":[null],"ee":{}}', data);
      onEventError();
    },

    _jsonStringifyOrderedRecurse: function (value) {
      /*
        this function recurses the value looking for dictionaries to order
      */
      value = Array.isArray(value)
        ? '[' + value.map(local._jsonStringifyOrderedRecurse).join(',') + ']'
        : typeof value !== 'object' || !value
        ? JSON.stringify(value)
        /* sort list of keys */
        : '{' + Object.keys(value).filter(function (key) {
          return JSON.stringify(value[key]) !== undefined;
        }).sort().map(function (key) {
          return JSON.stringify(key) + ':' + local._jsonStringifyOrderedRecurse(value[key]);
        }).join(',') + '}';
      return value === undefined ? 'null' : value;
    },

    mimeLookup: function (file) {
      /*
        this function returns the file's mime-type
      */
      file = required.path.extname(file).slice(1);
      switch (file) {
      case 'css':
        return 'text/css';
      case 'html':
        return 'text/html';
      case 'js':
        return 'application/javascript';
      case 'json':
        return 'application/json';
      case 'txt':
        return 'text/plain';
      default:
        return required.mime.lookupDict[file];
      }
    },

    _mimeLookup_default_test: function (onEventError) {
      /*
        this function tests mimeLookup's default handling behavior
      */
      var data;
      data = utility2.mimeLookup('foo.css');
      utility2.assert(data === 'text/css', data);
      data = utility2.mimeLookup('foo.html');
      utility2.assert(data === 'text/html', data);
      data = utility2.mimeLookup('foo.js');
      utility2.assert(data === 'application/javascript', data);
      data = utility2.mimeLookup('foo.json');
      utility2.assert(data === 'application/json', data);
      data = utility2.mimeLookup('foo.txt');
      utility2.assert(data === 'text/plain', data);
      data = utility2.mimeLookup('foo');
      utility2.assert(data === undefined, data);
      onEventError();
    },

    scriptLint: function (file, script) {
      /*
        this function lints css / html / js / json scripts
        usage example:
        utility2.scriptLint('foo.js', 'console.log("scriptLint");');
      */
      var result;
      switch (required.path.extname(file)) {
      /* lint css file */
      case '.css':
        result = required.csslint
          && required.csslint.getFormatter('text').formatResults(required.csslint.verify(
            script,
            { ignore: 'ids' }
          ), file, { quiet: true }).trim();
        if (result) {
          utility2.jsonLog('\n_scriptLintCss\n' + result + '\n');
        }
        break;
      /* lint js file */
      case '.js':
      case '.json':
        if (!global.__coverage__ && required.jslint && !required.jslint(script)) {
          utility2.jsonLog('\n_scriptLintJs\n' + required.colors.bold(file));
          required.jslint.errors.forEach(function (error, ii) {
            result = '#' + String(ii + 1) + ' ';
            while (result.length < 4) {
              result = ' ' + result;
            }
            if (error && error.evidence) {
              utility2.jsonLog(result + required.colors.yellow(error.reason)
                + '\n    ' + (error.evidence).trim() + required.colors.grey(' \/\/ Line '
                  + error.line + ', Pos ' + error.character));
            }
          });
          utility2.jsonLog();
        }
        break;
      }
      return script;
    },

    _scriptLint_default_test: function (onEventError) {
      /*
        this function tests scriptLint's error handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { __coverage__: null }]
      ], function (onEventError) {
        /* test css default handling behavior */
        utility2.scriptLint('_scriptLint_default_test.css', '_scriptLint_default_test {}');
        /* test css error handling behavior */
        utility2.scriptLint('_scriptLint_default_test.css', '_scriptLint_default_test');
        /* test js default handling behavior */
        utility2.scriptLint('_scriptLint_default_test.js', '_scriptLint_default_test');
        /* test js error handling behavior */
        utility2.scriptLint('_scriptLint_default_test.js', 'var aa = "bb";');
        /* test js error.evidence missing handling behavior */
        utility2.testMock(onEventError, [
          [required, { jslint: function (script) {
            required.jslint.errors = [null];
          } }]
        ], function (onEventError) {
          utility2.scriptLint('_scriptLint_default_test.js', 'var aa = "bb";');
        });
        onEventError();
      });
    },

    scriptMinify: function (file, script) {
      /*
        this function minifies css / js scripts
        usage example:
        utility2.scriptMinify('foo.js', 'console.log("scriptMinify");');
      */
      var ast, result;
      switch (required.path.extname(file)) {
      /* minify css file */
      case '.css':
        script = required.cssmin ? required.cssmin(script) : script;
        break;
      /* minify js file */
      case '.js':
        if (required.uglifyjs) {
          ast = required.uglifyjs.parse(script, { filename: file });
          /* figure out scope */
          ast.figure_out_scope();
          /* compress */
          ast.transform(new required.uglifyjs.Compressor());
          /* mangle */
          ast.figure_out_scope();
          ast.compute_char_frequency();
          ast.mangle_names();
          /* generate output */
          result = new required.uglifyjs.OutputStream({ ascii_only: true });
          ast.print(result);
          script = result.toString();
        }
        break;
      }
      return script;
    },

    _scriptMinify_default_test: function (onEventError) {
      /*
        this function tests scriptMinify's defult handling behavior
      */
      utility2.scriptMinify('foo.css', '_scriptMinify_default_test {}');
      utility2.scriptMinify('foo.js', 'console.log("_scriptMinify_default_test");');
      onEventError();
    },

    nop: function () {
      /*
        this function performs no operation (nop)
        usage example:
        utility2.nop();
      */
      return;
    },

    _nop_default_test: function (onEventError) {
      /*
        this function tests nop's default handling behavior
      */
      utility2.nop();
      onEventError();
    },

    onEventErrorDefault: function (error, data) {
      /*
        this function provides a default, error / data handling callback.
        if an error is given, it will print the error's message and stack,
        else it will print the data
      */
      var ii;
      if (error) {
        /* ignore test-generated errors */
        for (ii = 0; ii < state.onEventErrorDefaultIgnoreList.length; ii += 1) {
          if (state.onEventErrorDefaultIgnoreList[ii] === error.message) {
            state.onEventErrorDefaultIgnoreList.splice(ii, 1);
            return;
          }
        }
        /* debug error */
        state.debugError = error;
        /* print error */
        state.debugMessage
          = '\nonEventErrorDefault - error\n' + utility2.errorStack(error) + '\n';
        console.error(state.debugMessage);
      /* print data if it's defined and not an empty string */
      } else if (data !== undefined && data !== '') {
        /* debug data */
        state.debugData = data;
        state.debugMessage = '\nonEventErrorDefault - data\n'
          + utility2.jsonStringifyCircular(data, null, 2) + '\n';
        utility2.jsonLog(state.debugMessage);
      }
    },

    _onEventErrorDefault_default_test: function (onEventError) {
      /*
        this function tests onEventErrorDefault's default handling behavior
      */
      utility2.testMock(onEventError, [], function (onEventError) {
        utility2.onEventErrorDefault(null, '_onEventErrorDefault_default_test');
        onEventError();
      });
    },

    _onEventErrorDefault_error_test: function (onEventError) {
      /*
        this function tests onEventErrorDefault's error handling behavior
      */
      utility2.testMock(onEventError, [
        [console, { error: utility2.nop }]
      ], function (onEventError) {
        var error;
        error = new Error('_onEventErrorDefault_error_test');
        /* test error.stack handling behavior */
        utility2.onEventErrorDefault(error);
        /* test error.message handling behavior */
        error.stack = '';
        utility2.onEventErrorDefault(error);
        /* test no error.message or error.stack handling behavior */
        error.message = '';
        utility2.onEventErrorDefault(error);
        onEventError();
      });
    },

    _onEventErrorDefault_ignore_test: function (onEventError) {
      /*
        this function tests onEventErrorDefault's ignore handling behavior
      */
      var error;
      error = new Error(utility2.uuid4());
      /* add extraneous error message for code coverage */
      state.onEventErrorDefaultIgnoreList.push(utility2.uuid4());
      state.onEventErrorDefaultIgnoreList.push(error.message);
      utility2.onEventErrorDefault(error);
      /* remove extraneous error message */
      state.onEventErrorDefaultIgnoreList.pop();
      onEventError();
    },

    onEventTimeout: function (onEventError, timeout, message) {
      /*
        this function sets a timer to throw and handle a timeout error
      */
      var error;
      error = new Error('onEventTimeout - timeout error - ' + timeout + ' ms - ' + message);
      error.code = 'ETIMEDOUT';
      return setTimeout(function () {
        onEventError(error);
      }, timeout);
    },

    setDefault: function (options, defaults) {
      /*
        this function recursively walks through the defaults object,
        and uses it to set default values for unset leaf nodes in the options object
      */
      Object.keys(defaults).forEach(function (key) {
        var defaults2, options2;
        defaults2 = defaults[key];
        options2 = options[key];
        /* set default value */
        if (options2 === undefined) {
          options[key] = defaults2;
          return;
        }
        /* recurse if options2 and defaults2 are both objects */
        if (defaults2 && typeof defaults2 === 'object'
            && options2 && typeof options2 === 'object'
            && !Array.isArray(options2)) {
          local.setDefault(options2, defaults2);
        }
      });
      return options;
    },

    _setDefault_default_test: function (onEventError) {
      /*
        this function tests setDefault's default handling behavior
      */
      var options;
      options = utility2.setDefault(
        { aa: 1, bb: {}, cc: [] },
        { aa: 2, bb: { cc: 2 }, cc: [1, 2] }
      );
      utility2.assert(
        utility2.jsonStringifyOrdered(options) === '{"aa":1,"bb":{"cc":2},"cc":[]}',
        options
      );
      onEventError();
    },

    setOverride: function (state, override, backup, depth) {
      /*
        this function recursively overrides the state object with the override object,
        and optionally saves the original state object to the backup object,
        and optionally accepts the depth recursion limit
      */
      local._setOverrideRecurse(state, override, backup || {}, depth || Infinity);
      return state;
    },

    _setOverrideRecurse: function (state, override, backup, depth) {
      /*
        this function
        1. save the state item to the backup object
        2. set the override item to the state object
        3. recurse the override object
      */
      var state2, override2;
      Object.keys(override).forEach(function (key) {
        state2 = state[key];
        override2 = backup[key] = override[key];
        if (depth <= 1
            /* override2 is not a plain object */
            || !(override2 && typeof override2 === 'object' && !Array.isArray(override2))
            /* state2 is not a plain object */
            || !(state2 && typeof state2 === 'object' && !Array.isArray(state2))) {
          /* 1. save the state item to the backup object */
          backup[key] = state2;
          /* 2. set the override item to the state object */
          state[key] = override2;
          return;
        }
        /* 3. recurse the override object */
        local._setOverrideRecurse(state2, override2, override2, depth - 1);
      });
    },

    _setOverride_default_test: function (onEventError) {
      /*
        this function tests setOverride's default handling behavior
      */
      var backup, state;
      backup = {};
      /* test override */
      state = utility2.setOverride(
        { aa: 1, bb: { cc: 2 }, dd: [3, 4], ee: { ff: { gg: 5, hh: 6 } } },
        { aa: 2, bb: { dd: 3 }, dd: [4, 5], ee: { ff: { gg: 6 } } },
        backup,
        2
      );
      utility2.assert(utility2.jsonStringifyOrdered(state)
          === '{"aa":2,"bb":{"cc":2,"dd":3},"dd":[4,5],"ee":{"ff":{"gg":6}}}', state);
      /* test backup */
      utility2.assert(utility2.jsonStringifyOrdered(backup)
          === '{"aa":1,"bb":{},"dd":[3,4],"ee":{"ff":{"gg":5,"hh":6}}}', backup);
      /* test restore */
      utility2.setOverride(state, backup);
      utility2.assert(utility2.jsonStringifyOrdered(backup)
          === '{"aa":1,"bb":{"dd":3},"dd":[3,4],"ee":{"ff":{"gg":6}}}', backup);
      utility2.assert(utility2.jsonStringifyOrdered(state)
          === '{"aa":1,"bb":{"cc":2},"dd":[3,4],"ee":{"ff":{"gg":5,"hh":6}}}', state);
      onEventError();
    },

    stringAscii: '\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f'
      + '\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f'
      + ' !"#$%&\'()*+,-./0123456789:;<=>?'
      + '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_'
      + '`abcdefghijklmnopqrstuvwxyz{|}~\x7f',

    stringToEmptyLine: function (text, regexp) {
      /*
        this function replaces regex matches in the text with empty lines
      */
      return text.replace(regexp, function (match) {
        return match.replace((/.*/g), '');
      });
    },

    _stringToEmptyLine_default_test: function (onEventError) {
      /*
        this function tests stringToEmptyLine's default handling behavior
      */
      var data;
      data = utility2.stringToEmptyLine('aa\nbb1\nbb2\ncc\n', (/^bb.*$/gm));
      utility2.assert(data === 'aa\n\n\ncc\n', data);
      onEventError();
    },

    templateFormat: function (template, dict) {
      /*
        this function templates the template with the dict
      */
      return template.replace((/\{\{[^{}]+\}\}/g), function (key) {
        var value;
        value = dict[key.slice(2, -2)];
        return typeof value === 'string' ? value : key;
      });
    },

    _templateFormat_default_test: function (onEventError) {
      /*
        this function tests templateFormat's default handling behavior
      */
      var data;
      data = utility2.templateFormat('{{aa}}', { aa: 1 });
      utility2.assert(data === '{{aa}}', data);
      data = utility2.templateFormat('{{aa}}', { aa: 'bb' });
      utility2.assert(data === 'bb', data);
      onEventError();
    },

    _Test: function () {
      /*
        this is the _Test class
      */
      return;
    },

    _Test_prototype_report: function () {
      /*
        this function creates a test report
      */
      var self, state;
      self = this;
      state = self.global.state;
      utility2.jsonLog('\n\n\n\ntest report');
      /* sort list of test suites by name */
      state.testSuiteList.sort(function (arg1, arg2) {
        arg1 = arg1.nameFull;
        arg2 = arg2.nameFull;
        return arg1 <= arg2 ? -1 : 1;
      }).forEach(function (testSuite) {
        testSuite.testCaseList.sort(function (arg1, arg2) {
          arg1 = arg1.nameFull;
          arg2 = arg2.nameFull;
          return arg1 <= arg2 ? -1 : 1;
        });
        state.testSummary.failures += testSuite.failures;
        state.testSummary.passed += testSuite.passed;
        state.testSummary.time = Math.max(state.testSummary.time, Number(testSuite.time) || 0);
        utility2.jsonLog((testSuite.failures ? required.colors.inverse : utility2.echo)(
          ('        ' + (testSuite.time)).slice(-8) + ' ms | '
            + testSuite.failures + ' failed | '
            + (testSuite.testCaseList.length - testSuite.failures)
            + ' passed in ' + testSuite.nameFull
        ));
      });
      utility2.jsonLog(state.testSuiteFailList.sort().join('\n'));
      utility2.jsonLog();
      self.reportBrowser();
      self.reportNodejs();
      state.testSuiteFailList.length = 0;
      state.testSuiteList.length = 0;
    },

    __Test_prototype_report_failedTest_test: function (onEventError) {
      /*
        this function tests _Test_prototype_report's failed test handling behavior
      */
      utility2.testMock(onEventError, [
        [utility2, { ajax: utility2.callArg1, deferCallback: utility2.nop }]
      ], function (onEventError) {
        local._createTest({ state: {
          /* test browser mode handling behavior */
          modeBrowser: true,
          /* test multiple test suites handling behavior */
          testSuiteList: [
            /* test failure handling behavior */
            { failures: 1, name: 'bb', passed: 1, testCaseList: [] },
            { failures: 1, name: 'aa', passed: 1, testCaseList: [] }
          ]
        } }).report();
        onEventError();
      });
    },

    _Test_prototype_reportBrowser: function () {
      /*
        this function runs extra report handling code in the browser
      */
      var self, state;
      self = this;
      state = self.global.state;
      if (state.modeBrowser) {
        /* upload test report */
        utility2.ajax({
          data: JSON.stringify({
            coverage: global.__coverage__,
            testCallbackId: state.testCallbackId,
            testSuiteList: state.testSuiteList
          }),
          url: '/test/report.upload'
        }, function (error) {
          utility2.onEventErrorDefault(error);
          utility2.deferCallback('untilReadyTestReport', 'ready');
        });
      }
    },

    _Test_prototype_reportNodejs: function () {
      /*
        this function runs extra report handling code in nodejs
      */
      var self, state;
      self = this;
      state = self.global.state;
      if (state.modeNodejs && state.modeNpmTest) {
        /* write test_report.badge.svg */
        utility2.readyUtility2Exit.remaining += 1;
        utility2.fsWriteFileAtomic(
          state.tmpdir + '/test_report.badge.svg',
          self.reportNodejsBadge(state.testSummary),
          utility2.readyUtility2Exit
        );
        /* write test_report.html */
        utility2.readyUtility2Exit.remaining += 1;
        utility2.fsWriteFileAtomic(
          state.tmpdir + '/test_report.html',
          self.reportNodejsHtml(state.testSummary, state.testSuiteList),
          utility2.readyUtility2Exit
        );
        /* write test_report.json */
        utility2.readyUtility2Exit.remaining += 1;
        utility2.fsWriteFileAtomic(
          state.tmpdir + '/test_report.json',
          JSON.stringify({
            testSuiteList: state.testSuiteList,
            testSummary: state.testSummary
          }, null, 2),
          utility2.readyUtility2Exit
        );
      }
    },

    _Test_prototype_reportNodejsBadge: function (testSummary) {
      /*
        this function generates a test report summary badge
      */
      return state.fsWatchDict['/test/modeAjaxOffline/http%3A%2F%2Fimg.shields.io'
        + '%2Fbadge%2Ftests_failed-999-ee0000.svg%3Fstyle%3Dflat%23GET'].contentBrowser
        .replace('999', testSummary.failures)
        .replace('e00', testSummary.failures ? 'e00' : '0e0');
    },

    __Test_prototype_reportNodejsBadge_failedTest_test: function (onEventError) {
      /*
        this function tests _Test_prototype_reportNodejsBadge's failed test handling behavior
      */
      var data;
      if (state.modeNodejs) {
        data = local._Test_prototype_reportNodejsBadge({ failures: 2});
        utility2.assert(data.indexOf('#e00') >= 0, data);
      }
      onEventError();
    },

    _Test_prototype_reportNodejsHtml: function (testSummary, testSuiteList) {
      /*
        this function generates an html test report from testSuiteList
      */
      var content, failureList, testCaseNumber, testSuiteNumber;
      testCaseNumber = 0;
      testSuiteNumber = 0;
      content = testSuiteList.map(function (testSuite, ii) {
        testSuiteNumber += 1;
        failureList = [];
        return '<div>'
          + '<h4>' + testSuiteNumber + '. ' + testSuite.javascriptPlatform + '</h4>'
          + '<h4>' + testSuite.userAgent + '</h4>'
          + '<h4>' + testSuite.name + ' (run in ' + testSuite.time + ' ms)</h4>'
          + '<table><thead><tr>'
          + '<th>#</th>'
          + '<th>time</th>'
          + '<th>status</th>'
          + '<th>test case</th>'
          + '</tr></thead><tbody>'
          + testSuite.testCaseList.map(function (testCase) {
            testCaseNumber += 1;
            if (testCase.failure) {
              failureList.push(testCaseNumber + '. ' + testCase.name
                + '\n' + testCase.failure);
            }
            return '<tr class=' + (testCase.failure ? 'failed' : 'passed') + '>'
              + '<td>' + testCaseNumber + '.</td>'
              + '<td>' + testCase.time + ' ms</td>'
              + '<td>' + (testCase.failure ? 'failed' : 'passed') + '</td>'
              + '<td>' + testCase.name + '</td>'
              + '</tr>';
          }).join('\n')
          + '</tbody></table>'
          + (failureList.length
            ? '<pre>' + failureList.join('\n\n').replace((/</g), '&lt;') + '</pre>'
            : '')
          + '</div>';
      }).join('\n');
      return utility2.templateFormat(
        state.fsWatchDict['/test/report.html.template'].contentBrowser,
        {
          content: content,
          totalFailed: String(testSummary.failures),
          totalFailedClass: String(testSummary.failures ? 'failed' : 'passed'),
          totalPassed: String(testSummary.passed),
          totalTestSuites: String(testSuiteList.length),
          totalTime: String(testSummary.time)
        }
      );
    },

    __Test_prototype_reportNodejsHtml_failedTest_test: function (onEventError) {
      /*
        this function tests _Test_prototype_reportNodejsHtml's failed test handling behavior
      */
      var data;
      if (state.modeNodejs) {
        data = local._Test_prototype_reportNodejsHtml({
          failures: 2
        }, [{ failures: 2, testCaseList: [
          { failure: 'aa' },
          { failure: 'bb' }
        ] }]);
        utility2.assert(data.indexOf('<td class="failed">2</td>') >= 0, data);
      }
      onEventError();
    },

    _Test_prototype_run: function () {
      /*
        this function runs all tests for a given module
      */
      var onEventReady, self, state, testList, testSuite;
      self = this;
      state = self.global.state;
      /* create a list of all available tests in local2 */
      testList = Object.keys(self.local2).filter(function (test) {
        return test.slice(-5) === '_test';
      });
      /* return if there are no tests */
      if (testList.length === 0) {
        return;
      }
      /* create test suite for local2 */
      testSuite = {
        failures: 0,
        javascriptPlatform: state.javascriptPlatform,
        name: self.local2._name,
        nameFull: '',
        passed: 0,
        testCaseList: [],
        tests: testList.length,
        time: 0,
        userAgent: (self.global.navigator && self.global.navigator.userAgent)
          || 'unknown user agent'
      };
      testSuite.nameFull = testSuite.javascriptPlatform
        + '.' + testSuite.userAgent
        + '.' + testSuite.name;
      /* add test suite to global list of test suites */
      state.testSuiteList.push(testSuite);
      state.testSuiteRemaining += 1;
      /* this callback runs when all tests are finished */
      onEventReady = utility2.untilReady(function () {
        testSuite.passed = testSuite.tests - testSuite.failures;
        state.testSuiteRemaining -= 1;
        if (state.testSuiteRemaining === 0) {
          /* assert state.onEventErrorDefaultIgnoreList is empty */
          utility2.assert(
            state.onEventErrorDefaultIgnoreList.length === 0,
            state.onEventErrorDefaultIgnoreList
          );
          state.testSuiteRemaining = 0;
          self.report();
        }
      });
      onEventReady.remaining += testList.length;
      /* asynchronously run tests in local2 */
      testList.forEach(function (testName) {
        self.runTestCase(testName, testSuite, onEventReady);
      });
    },

    __Test_prototype_run_failedTest_test: function (onEventError) {
      /*
        this function tests _Test_prototype_run's failed test handling behavior
      */
      var self;
      self = local._createTest({
        /* suppress error output in mock test */
        console: { error: utility2.nop },
        /* test browser user agent handling behavior */
        navigator: { userAgent: 'unknown' },
        /* test qunit handling behavior */
        QUnit: { ok: utility2.nop, test: utility2.callArg1 },
        setTimeout: setTimeout,
        /* test browser mode handling behavior */
        state: { javascriptPlatform: 'browser', modeBrowser: true }
      }, {
        _name: 'utility2.__Test_prototype_run_failedTest_test',
        _test: function (onEventError) {
          /* test failure handling behavior */
          onEventError(utility2.error);
          /* test multiple callback, failure handling behavior */
          onEventError();
        }
      });
      state.onEventErrorDefaultIgnoreList.push('utility2 error');
      state.onEventErrorDefaultIgnoreList.push(
        'runTestCase - browser.unknown.utility2.__Test_prototype_run_failedTest_test._test\'s'
          + ' callback called multiple times'
      );
      self.report = onEventError;
      self.run();
    },

    __Test_prototype_run_nullCase_test: function (onEventError) {
      /*
        this function tests _Test_prototype_run's null case handling behavior
      */
      local._createTest(
        { state: {} },
        { _name: 'utility2.__Test_prototype_run_nullCase_test' }
      ).run();
      onEventError();
    },

    _Test_prototype_runTestCase: function (testName, testSuite, onEventReady) {
      /*
        this function creates a testCase object from the given testName
        and runs it asynchronously
      */
      var errorMessage, onEventError2, remaining, self, state, testCase, timeout;
      self = this;
      state = self.global.state;
      /* handle testCase result */
      onEventError2 = function (error) {
        /* clear timeout for testCase */
        clearTimeout(timeout);
        /* assert testCase callback was not called multiple times */
        remaining -= 1;
        if (remaining < 0) {
          error = error || new Error(
            'runTestCase - ' + testCase.nameFull + "'s callback called multiple times"
          );
        }
        /* handle testCase failure */
        if (error) {
          errorMessage = '\nrunTestCase - failed - ' + testCase.nameFull;
          self.global.console.error(required.colors.inverse(errorMessage));
          utility2.onEventErrorDefault(error);
          errorMessage += state.debugMessage;
          testCase.failure = utility2.errorStack(error);
          state.testSuiteFailList.push(errorMessage);
          if (remaining < 0) {
            return;
          }
          testSuite.failures += 1;
        } else {
          utility2.jsonLog('runTestCase - passed - ' + testCase.nameFull);
        }
        /* record time it took for testCase to run */
        testCase.time = Date.now() - testCase.time;
        testSuite.time = Math.max(testCase.time, testSuite.time);
        /* asynchronously finish testCase */
        self.global.setTimeout.call(global, onEventReady);
        /* optional qunit hook for saucelabs testing */
        if (self.global.QUnit) {
          self.global.QUnit.test(testCase.nameFull, function () {
            self.global.QUnit.ok(!error, utility2.errorStack(error));
          });
        }
      };
      remaining = 1;
      /* create testCase */
      testCase = {
        name: testName,
        nameFull: testSuite.nameFull + '.' + testName,
        time: Date.now()
      };
      testSuite.testCaseList.push(testCase);
      /* set timeout for testCase */
      timeout = utility2.onEventTimeout(onEventError2, state.timeoutDefault, 'runTestCase');
      utility2.tryCatch(function () {
        /* run testCase */
        self.local2[testName](onEventError2);
        /* catch synchronously thrown errors */
      }, onEventError2);
    },

    testMock: function (onEventError, mockList, test) {
      /*
        this function mocks the state given in the mockList while running the test callback
      */
      var onEventError2;
      /* prepend mandatory mocks for async / unsafe functions */
      mockList = [
        /* suppress console.log */
        [console, { log: utility2.nop }],
        /* enforce synchonicity by mocking timers as utility2.callArg0 */
        [global, { setInterval: utility2.callArg0, setTimeout: utility2.callArg0 }],
        [global.process || {}, { exit: local._throwError }],
        [utility2, { shell: local._throwError }]
      ].concat(mockList);
      onEventError2 = function (error) {
        /* restore state */
        mockList.reverse().forEach(function (mock) {
          utility2.setOverride(mock[0], mock[2], null, 1);
        });
        if (error) {
          onEventError(error);
        }
      };
      /* run onEventError callback in mocked state in a try catch block */
      utility2.tryCatch(function () {
        /* mock state */
        mockList.forEach(function (mock) {
          mock[2] = {};
          utility2.setOverride(mock[0], mock[1], mock[2], 1);
        });
        /* run test */
        test(onEventError);
        onEventError2();
      }, onEventError2);
    },

    _testMock_error_test: function (onEventError) {
      /*
        this function tests testMock's error handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: { aa: 1 } }]
      ], function (onEventError) {
        utility2.testMock(function (error) {
          utility2.assert(error instanceof Error, error);
          utility2.assert(state.aa === 1, state);
          onEventError();
        }, [
          [state, { aa: 2 }]
        ], function () {
          throw utility2.error;
        });
      });
    },

    _testSetTimeout: setTimeout,

    _throwError: function () {
      /*
        this function always throws an error
      */
      throw utility2.error;
    },

    _throwError_default_test: function (onEventError) {
      /*
        this function tests throwError's default handling behavior
      */
      utility2.tryCatch(local._throwError, function (error) {
        utility2.assert(error instanceof Error, error);
        onEventError();
      });
    },

    tryCatch: function (callback, onEventError) {
      /*
        this function helps achieve 100% code coverage
      */
      try {
        callback();
      } catch (error) {
        onEventError(error);
      }
    },

    unref: function (obj) {
      /*
        this function unref's the object under nodejs
      */
      if (obj && obj.unref) {
        obj.unref();
      }
      return obj;
    },

    untilReady: function (onEventReady) {
      /*
        this function defers the onEventReady callback until the remaining counter goes to zero,
        or an error occurs
      */
      var self;
      self = function (error) {
        /* return any errors encountered */
        if (self.error) {
          onEventReady(error || self.error);
          return;
        }
        /* save any errors encountered */
        self.error = self.error || error;
        self.remaining -= 1;
        if (self.remaining === 0) {
          onEventReady(self.error);
        }
      };
      self.remaining = 0;
      return self;
    },

    _untilReady_error_test: function (onEventError) {
      /*
        this function tests untilReady's error handling behavior
      */
      var onEventReady;
      onEventReady = utility2.untilReady(function (error) {
        utility2.assert(error instanceof Error, error);
      });
      onEventReady.remaining += 1;
      /* test error handling behavior */
      onEventReady(utility2.error);
      /* test multiple callback handling behavior */
      onEventReady();
      onEventError();
    },

    urlDecodeOrError: function (text) {
      /*
        this function returns an error if the text cannot be decoded
      */
      try {
        return decodeURIComponent(text);
      } catch (error) {
        return error;
      }
    },

    _urlDecodeOrError_error_test: function (onEventError) {
      /*
        this function tests urlDecodeOrError's error handling behavior
      */
      var data;
      data = utility2.urlDecodeOrError(utility2.stringAscii);
      utility2.assert(data instanceof Error, data);
      onEventError();
    },

    urlParamsGet: function (url, delimiter) {
      /*
        this function returns a dictionary containing the url hash / search params
      */
      var params;
      params = {};
      url = required.url.parse(url);
      url = delimiter === '#' ? url.hash : url.search;
      (url || '').slice(1).replace((/([^&]+)=([^&]+)/g), function (_, key, value) {
        /* validate key / value */
        key = utility2.urlDecodeOrError(key);
        value = utility2.urlDecodeOrError(value);
        if (!((key instanceof Error) || (value instanceof Error))) {
          params[key] = value;
        }
      });
      return params;
    },

    _urlParamsGet_default_test: function (onEventError) {
      /*
        this function tests urlParamsGet's default handling behavior
      */
      var data;
      data = utility2.urlParamsGet('/aa?bb=cc%2B#dd=ee%2B&ff=%%', '?');
      utility2.assert(utility2.jsonStringifyOrdered(data) === '{"bb":"cc+"}', data);
      data = utility2.urlParamsGet('/aa?bb=cc%2B#dd=ee%2B&ff=%%', '#');
      utility2.assert(utility2.jsonStringifyOrdered(data) === '{"dd":"ee+"}', data);
      onEventError();
    },

    urlParamsMerge: function (url, params, delimiter) {
      /*
        this function merges the url hash / search with the given params
      */
      params = utility2.setOverride(utility2.urlParamsGet(url, delimiter), params);
      params = Object.keys(params).sort().map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      }).join('&');
      url = required.url.parse(url);
      return [
        url.protocol ? url.protocol + '//' : '',
        url.host,
        url.pathname,
        delimiter === '#' ? url.search : '?' + params,
        delimiter === '#' ? '#' + params : url.hash
      ].map(function (arg) {
        return arg || '';
      }).join('');
    },

    _urlParamsMerge_default_test: function (onEventError) {
      /*
        this function tests urlParamsMerge's default handling behavior
      */
      var data;
      data = utility2.urlParamsMerge('/aa#dd=ee%2B', { bb: 'cc+' }, '?');
      utility2.assert(data === '/aa?bb=cc%2B#dd=ee%2B', data);
      data = utility2.urlParamsMerge('/aa?bb=cc%2B', { dd: 'ee+' }, '#');
      utility2.assert(data === '/aa?bb=cc%2B#dd=ee%2B', data);
      onEventError();
    },

    urlParamsRemove: function (url, keyList, delimiter) {
      /*
        this function removes the given keys from the url hash / search params
      */
      var params;
      params = utility2.urlParamsGet(url, delimiter);
      keyList.forEach(function (key) {
        delete params[key];
      });
      return utility2.urlParamsMerge(
        url.replace(delimiter === '#' ? (/#.*/) : (/\?[^#]*/), ''),
        params,
        delimiter
      );
    },

    _urlParamsRemove_default_test: function (onEventError) {
      /*
        this function tests urlParamsRemove's default handling behavior
      */
      var data;
      data = utility2.urlParamsRemove('/aa?bb=cc%2B#dd=ee%2B', ['bb'], '?');
      utility2.assert(data === '/aa?#dd=ee%2B', data);
      data = utility2.urlParamsRemove('/aa?bb=cc%2B#dd=ee%2B', ['dd'], '#');
      utility2.assert(data === '/aa?bb=cc%2B#', data);
      onEventError();
    },

    uuid4: function () {
      /*
        this function returns a uuid4 string of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
      */
      /*jslint bitwise: true*/
      var id, ii;
      id = '';
      for (ii = 0; ii < 32; ii += 1) {
        switch (ii) {
        case 8:
        case 20:
          id += '-';
          id += (Math.random() * 16 | 0).toString(16);
          break;
        case 12:
          id += '-';
          id += '4';
          break;
        case 16:
          id += '-';
          id += (Math.random() * 4 | 8).toString(16);
          break;
        default:
          id += (Math.random() * 16 | 0).toString(16);
        }
      }
      return id;
    }

  };
  local._init();
}());



(function moduleCliNodejs() {
  /*
    this nodejs module inits the cli
  */
  'use strict';
  /*jslint stupid: true*/
  var local;
  local = {

    _name: 'utility2.moduleCliNodejs',

    _init: function () {
      if (state.modeNodejs) {
        utility2.initModule(module, local);
      }
    },

    _initOnce: function () {
      /* export __dirname */
      utility2.__dirname = utility2.__dirname || __dirname;
      /* export require */
      utility2.require = utility2.require || require;
      /* require builtin nodejs modules */
      [ 'child_process', 'crypto',
        'fs',
        'http', 'https',
        'module',
        'os',
        'path',
        'repl',
        'stream',
        'url',
        'util',
        'vm' ].forEach(function (module) {
        required[module] = required[module] || utility2.require(module);
      });
      /* require utility2_external */
      utility2.tryCatch(function () {
        required.utility2_external = required.utility2_external
          || utility2.require('./.install/public/utility2_external.shared.rollup.js');
      }, utility2.nop);
      /* parse commandline arguments */
      local._initArgv();
      /* init npm test mode */
      local._initNpmTest();
      /* init code coverage mode */
      local._initCoverage(global);
      /* init bootstrap code */
      local._initBootstrap();
    },

    __initOnce_default_test: function (onEventError) {
      /*
        this function tests _initOnce's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { required: {} }],
        [local, {
          _initArgv: utility2.nop,
          _initBootstrap: utility2.nop,
          _initCoverage: utility2.nop,
          _initNpmTest: utility2.nop
        }],
        /* code coverage for utility2._dirname and utility2.require */
        [utility2, { __dirname: null, require: null }]
      ], function (onEventError) {
        local._initOnce();
        onEventError();
      });
    },

    _initArgv: function () {
      /*
        this function parses commandline arguments and integrates it into the state dict
      */
      var key2, tmp, value;
      /* load package.json file */
      state.packageJson = state.packageJson || {};
      utility2.tryCatch(function () {
        state.packageJson = JSON.parse(required.fs.readFileSync(process.cwd()
          + '/package.json'));
      }, utility2.nop);
      /* init process.argv */
      tmp = utility2.jsonCopy(process.argv);
      /* process argv from process.env.npm_config_utility2_* */
      Object.keys(process.env).forEach(function (key) {
        key2 = (/^npm_config_utility2_(.+)/).exec(key);
        if (key2) {
          tmp.push('--' + key2[1] + '=' + (process.env[key] || 'false'));
        }
      });
      tmp.forEach(function (arg, ii) {
        var error;
        arg = arg.split('=');
        /* --foo=true -> state.foo = 1 */
        value = arg[1]
          || (((/^--[a-z]/).test(tmp[ii + 1]) || (ii + 1) >= tmp.length)
            /* --foo -> state.foo = true */
            ? 'true'
            /* --foo true -> state.foo = true */
            : tmp[ii + 1]);
        arg = arg[0];
        /* --no-foo -> state.foo = false */
        if ((/^--no-[a-z]/).test(arg)) {
          arg = '-' + arg.slice(4);
          value = 'false';
        }
        arg = local._stringToCamelCase(arg.slice(2));
        error = utility2.jsonParseOrError(value);
        state[arg] = error instanceof Error ? value : error;
      });
      tmp = {};
      /* save utility2.__dirname to env */
      tmp.UTILITY2_DIR = utility2.__dirname;
      /* save process vars to env */
      tmp.NODEJS_PROCESS_PID = process.pid;
      ['argv', 'cwd', 'pid', 'platform', 'versions'].forEach(function (key) {
        value = process[key];
        /* traverse down one level for sub-dict */
        if (typeof value === 'object') {
          Object.keys(value).forEach(function (key2) {
            tmp['NODEJS_PROCESS_' + key.toUpperCase() + '_' + key2.toUpperCase()]
              = String(value[key2]);
          });
        } else {
          tmp['NODEJS_PROCESS_' + key.toUpperCase()]
            = String(typeof value === 'function' ? value() : value);
        }
      });
      /* save npm_config vars to env */
      Object.keys(process.env).forEach(function (key) {
        if ((/^npm_config_/).test(key) && typeof process.env[key] === 'string') {
          tmp[key] = process.env[key];
        }
      });
      /* save package.json vars to env */
      Object.keys(state.packageJson).forEach(function (key) {
        value = state.packageJson[key];
        if (typeof value === 'string') {
          tmp['NODEJS_PACKAGE_JSON_' + key.toUpperCase()] = value;
        }
      });
      /* save env to process.env */
      utility2.setOverride(process.env, tmp);
      /* export env */
      if (state.modeCli === 'exportEnv') {
        console.log(Object.keys(tmp).sort().map(function (key) {
          return 'export ' + key + '=' + JSON.stringify(tmp[key]);
        }).join(' && '));
        process.exit();
      }
    },

    __initArgv_default_test: function (onEventError) {
      /*
        this function tests _initArgv's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, {
          process: {
            cwd: process.cwd,
            env: {
              /* test npm argument handling behavior */
              npm_config_utility2_aa: '',
              npm_config_utility2_bb: '1'
            },
            exit: utility2.nop,
            on: utility2.callArg1
          },
          state: { modeCli: 'exportEnv' }
        }]
      ], function (onEventError) {
        process.argv = ['--cc'];
        local._initArgv();
        utility2.assert(state.aa === false, state.aa);
        utility2.assert(state.bb === 1, state.bb);
        utility2.assert(state.cc === true, state.cc);
        process.argv = ['--cc', 'bb'];
        state.modeCli = '';
        local._initArgv();
        utility2.assert(state.cc === 'bb', state.cc);
        process.argv = ['--cc', '1'];
        local._initArgv();
        utility2.assert(state.cc === 1, state.cc);
        process.argv = ['--no-cc'];
        local._initArgv();
        utility2.assert(state.cc === false, state.cc);
        onEventError();
      });
    },

    _initBootstrap: function () {
      /*
        this function inits utility2 bootstrap code
      */
      if (!state.modeInit) {
        state.modeInit = 1;
        process.nextTick(function () {
          state.modeInit += 1;
          /* delete cached utility2 module */
          utility2.require.cache[module.filename] = null;
          /* reload utility2 */
          utility2.require(required.path.resolve(state.loadModule
            || (utility2.__dirname + '/utility2.js')));
        });
      }
    },

    __initBootstrap_default_test: function (onEventError) {
      /*
        this function tests _initBootstrap's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: {} }],
        [process, { nextTick: utility2.callArg0 }],
        [utility2, { require: null }]
      ], function (onEventError) {
        utility2.require = function () {
          return;
        };
        utility2.require.cache = {};
        /* test null case handling behavior */
        state.modeInit = 1;
        local._initBootstrap();
        utility2.assert(state.modeInit === 1, state.modeInit);
        /* test default handling behavior */
        state.modeInit = 0;
        local._initBootstrap();
        utility2.assert(state.modeInit === 2, state.modeInit);
        onEventError();
      });
    },

    _initCoverage: function (global) {
      if (state.modeCoverage) {
        state.modeCoverage = new RegExp(state.modeCoverage);
        global.__coverage__ = global.__coverage__ || {};
        required.istanbul = required.istanbul || utility2.require('istanbul');
        required.istanbul.hook.hookRequire(function (file) {
          return state.modeCoverage.test(file);
        }, function (code, file) {
          return utility2.instrumentCode(file, code);
        });
        /* on exit, create coverage report */
        process.on('exit', function () {
          var collector, data;
          collector = new required.istanbul.Collector();
          collector.add(global.__coverage__);
          /* print text report */
          required.istanbul.Report
            .create('text')
            .writeReport(collector);
          /* save cobertura report */
          required.istanbul.Report
            .create('cobertura', { dir: state.tmpdir })
            .writeReport(collector, true);
          /* save lcov and html report */
          required.istanbul.Report
            .create('lcov', { dir: state.tmpdir })
            .writeReport(collector, true);
          /* rename coverage files */
          [
            ['coverage_report', 'cache/' + utility2.uuid4()],
            ['lcov-report', 'coverage_report'],
            ['cobertura-coverage.xml', 'coverage_report/coverage_report.cobertura.xml'],
            ['lcov.info', 'coverage_report/coverage_report.lcov.info']
          ].forEach(function (rename) {
            utility2.tryCatch(function () {
              required.fs.renameSync(
                state.tmpdir + '/' + rename[0],
                state.tmpdir + '/' + rename[1]
              );
            }, utility2.nop);
          });
          /* get coverage percentage from cobertura report */
          data = required.fs.readFileSync(
            state.tmpdir + '/coverage_report/coverage_report.cobertura.xml',
            'utf8'
          );
          data = Number((/line-rate="([^"]+)"/).exec(data)[1]);
          /* create coverage badge */
          data = state.fsWatchDict['/test/modeAjaxOffline/http%3A%2F%2Fimg.shields.io'
            + '%2Fbadge%2Fcoverage-100.0%25-00ee00.svg%3Fstyle%3Dflat%23GET'].contentBrowser
            .replace('100.0', (100 * data).toFixed(1))
            .replace('0e0', ('0' + Math.round((1 - data) * 238).toString(16)).slice(-2)
              + ('0' + Math.round(data * 238).toString(16)).slice(-2)
              + '00');
          /* write coverage badge */
          required.fs.writeFileSync(
            state.tmpdir + '/coverage_report/coverage_report.badge.svg',
            data
          );
        });
      }
    },

    __initCoverage_default_test: function (onEventError) {
      /*
        this function tests _initCoverage's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, {
          process: { env: {}, on: utility2.callArg1 },
          state: {
            fsWatchDict: { '/test/modeAjaxOffline/http%3A%2F%2Fimg.shields.io%2Fbadge%2Fcoverage-100.0%25-00ee00.svg%3Fstyle%3Dflat%23GET': { contentBrowser: '' } },
            modeCoverage: null
          }
        }],
        [required, { fs: {
          readFileSync: function () {
            return 'line-rate="0.5"';
          },
          renameSync: utility2.nop,
          writeFileSync: utility2.nop
        }, istanbul: null }],
        [utility2, { require: null }]
      ], function (onEventError) {
        /* mock require('istanbul') */
        utility2.require = function () {
          return {
            Collector: function () {
              this.add = utility2.nop;
            },
            hook: { hookRequire: function (callback1, callback2) {
              var data;
              data = callback1('__initCoverage_default_test.js');
              utility2.assert(data === true, data);
              data = callback1('_.js');
              utility2.assert(data === false, data);
              data = callback2('"__initCoverage_default_test"');
              utility2.assert(data === '"__initCoverage_default_test"', data);
            } },
            Report: { create: function () {
              return { writeReport: utility2.nop };
            } }
          };
        };
        /* test null case handling behavior */
        state.modeCoverage = null;
        local._initCoverage();
        /* test default handling behavior */
        state.modeCoverage = '\\b__initCoverage_default_test\\.js$';
        local._initCoverage({});
        onEventError();
      });
    },

    _initNpmTest: function () {
      /* test utility2 */
      if (state.modeNpmTest) {
        /* setTimeout so these listeners are added last, after other utility2 listeners */
        setTimeout(function () {
          /* exit with non-zero code if tests failed */
          process.on('exit', function () {
            if (state.testSummary && state.testSummary.failures) {
              process.exit(1);
            }
          });
          /* exit with zero code on user interrupt */
          process.on('SIGINT', process.exit);
        });
      }
    },

    __initNpmTest_default_test: function (onEventError) {
      /*
        this function tests _initNpmTest's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, {
          process: { exit: null, on: function (mode, callback) {
            if (mode === 'exit') {
              callback();
            }
          } },
          setTimeout: utility2.callArg0,
          state: { testSummary: { failures: 0 } }
        }]
      ], function (onEventError) {
        var exitCode;
        process.exit = function (_) {
          exitCode = _;
        };
        /* test null case handling behavior */
        state.modeNpmTest = null;
        local._initNpmTest();
        utility2.assert(!exitCode, exitCode);
        /* test default handling behavior */
        state.modeNpmTest = true;
        local._initNpmTest();
        utility2.assert(!exitCode, exitCode);
        /* test failure handling behavior */
        state.testSummary.failures = 1;
        local._initNpmTest();
        utility2.assert(exitCode, exitCode);
        onEventError();
      });
    },

    instrumentCode: function (file, code) {
      /*
        this function instruments the code
      */
      if (state.modeCoverage && state.modeCoverage.test(file)) {
        utility2.jsonLog('instrumentCode ' + file);
        state.instrumentedFileDict = state.instrumentedFileDict || {};
        required.istanbul = required.istanbul || utility2.require('istanbul');
        local._instrumenter = local._instrumenter || new required.istanbul.Instrumenter();
        code = state.instrumentedFileDict[file]
          = local._instrumenter.instrumentSync(code, file);
      }
      return code;
    },

    _instrumentCode_default_test: function (onEventError) {
      /*
        this function tests instrumentCode's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: {
          modeCoverage: /^_instrumentCode_default_test\.js$/,
          modeNpmTest: null
        } }],
        [required, { istanbul: null }]
      ], function (onEventError) {
        var data;
        /* test null case handling behavior */
        data = utility2.instrumentCode('_.js', '"_instrumentCode_default_test"');
        utility2.assert(data === '"_instrumentCode_default_test"', data);
        /* test default handling behavior */
        state.modeNpmTest = null;
        data = utility2.instrumentCode(
          '_instrumentCode_default_test.js',
          '"_instrumentCode_default_test"'
        );
        utility2.assert(data !== '"_instrumentCode_default_test"', data);
        /* test npm test mode handling behavior */
        state.modeNpmTest = true;
        data = utility2.instrumentCode(
          '_instrumentCode_default_test.js',
          '"_instrumentCode_default_test"'
        );
        utility2.assert(data !== '"_instrumentCode_default_test"', data);
        onEventError();
      });
    },

    _stringToCamelCase: function (text) {
      /*
        this function converts dashed names to camel case
      */
      return text.replace((/[\-_][a-z]/g), function (match) {
        return match[1].toUpperCase();
      });
    },

    __stringToCamelCase_default_test: function (onEventError) {
      /*
        this function tests _stringToCamelCase's default handling behavior
      */
      var data;
      data = local._stringToCamelCase('');
      utility2.assert(data === '', data);
      data = local._stringToCamelCase('aa-bb-cc');
      utility2.assert(data === 'aaBbCc', data);
      onEventError();
    }

  };
  local._init();
}());



(function moduleInitNodejs() {
  /*
    this nodejs module inits utility2
  */
  'use strict';
  /*jslint stupid: true*/
  var local;
  local = {

    _name: 'utility2.moduleInitNodejs',

    _init: function () {
      if (state.modeNodejs) {
        /* subclass local._StreamReadableMock from stream.Readable */
        required.util.inherits(local._StreamReadableMock, required.stream.Readable);
        utility2.initModule(module, local);
      }
    },

    _initOnce: function () {
      /* print debug info about the current process */
      if (state.modeDebugProcess && state.modeDebugProcess !== 'debugged') {
        state.modeDebugProcess = 'debugged';
        utility2.jsonLog('debug - process.argv', process.argv);
        utility2.jsonLog('debug - process.cwd()', process.cwd());
        utility2.jsonLog('debug - process.pid', process.pid);
        utility2.jsonLog('debug - process.env', process.env);
      }
      /* export utility2.readyUtility2Exit */
      utility2.readyUtility2Exit = utility2.readyUtility2Exit
        || utility2.untilReady(function (error) {
          if (error) {
            utility2.onEventErrorDefault(error);
          }
          process.exit(error);
        });
      /* watch files */
      ['package.json', 'utility2.js2', 'utility2.sh'].forEach(function (file) {
        file = utility2.__dirname + '/' + file;
        required.fs.exists(file, function (exists) {
          if (exists) {
            utility2.fsWatch({
              actionList: ['lint', 'eval'],
              file: file
            }, utility2.onEventErrorDefault);
          }
        });
      });
      /* init tmpdir */
      if (state.tmpdir) {
        local._initTmpdir();
      }
      utility2.untilReadyUtility2(function () {
        (state.modeCliDict[state.modeCli] || utility2.nop)();
      });
      /* init interactive repl debugger */
      if (state.modeRepl && !state.repl) {
        state.repl = required.repl.start({
          eval: function (script, context, file, onEventError) {
            utility2.evalOnEventError('<repl>', utility2.replParse(script), onEventError);
          },
          useGlobal: true
        });
      }
    },

    __initOnce_default_test: function (onEventError) {
      /*
        this function tests _initOnce's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { required: { fs: { exists: function (_, callback) {
          callback(null);
        } } }, state: {} }],
        [utility2, { untilReadyUtility2: utility2.nop }]
      ], function (onEventError) {
        local._initOnce();
        onEventError();
      });
    },

    _initTmpdir: function () {
      /* default state.tmpdir to empty string if boolean */
      state.tmpdir = typeof state.tmpdir === 'string' ? state.tmpdir : '';
      /* init state.tmpdir */
      state.tmpdir = required.path.resolve(state.tmpdir
        || required.os.tmpdir() + '/utility2.' + encodeURIComponent(process.cwd()));
      utility2.assert(state.tmpdir, state.tmpdir);
      if (!required.fs.existsSync(state.tmpdir + '/cache')) {
        utility2.jsonLog('creating tmpdir ' + state.tmpdir);
        /* create cache dir */
        utility2.fsMkdirpSync(state.tmpdir + '/cache');
      }
      /* cleanup old cache */
      required.fs.readdirSync(state.tmpdir + '/cache').forEach(function (file) {
        local._fsRmr(state.tmpdir + '/cache/' + file, utility2.onEventErrorDefault);
      });
      /* periodically remove cache files */
      utility2.unref(setInterval(function () {
        local._fsCacheCleanup(utility2.onEventErrorDefault);
      }, 300000));
    },

    __initTmpdir_default_test: function (onEventError) {
      /*
        this function tests _initTmpdir's default handling behavior
      */
      utility2.testMock(onEventError, [
        [required.fs, { existsSync: utility2.nop }]
      ], function (onEventError) {
        /* populate cache dir with a nested file to remove */
        utility2.fsMkdirpSync(state.tmpdir + '/cache/' + utility2.uuid4());
        local._initTmpdir();
        onEventError();
      });
    },

    __initTmpdir_defaultTmpdir_test: function (onEventError) {
      /*
        this function tests _initTmpdir's default tmpdir handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { setInterval: utility2.nop, state: {} }],
        [required.fs, {
          existsSync: function () {
            return true;
          },
          readdirSync: function () {
            return [];
          }
        }]
      ], function (onEventError) {
        local._initTmpdir();
        onEventError();
      });
    },

    createStreamReadableMock: function (data) {
      /*
        this function creates a mock readable stream around the given data
      */
      var self;
      self = new local._StreamReadableMock();
      required.stream.Readable.call(self);
      self.data = data;
      return self;
    },

    _fsCacheCleanup: function (onEventError) {
      /*
        this function cleans up the cachedir
      */
      var dir, mode, onEventError2;
      mode = 0;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* loop through state._fsCacheCleanupFileList */
        case 1:
          dir = state.tmpdir + '/cache';
          utility2.jsonLog('_fsCacheCleanup - cleaning ' + dir);
          state._fsCacheCleanupFileList = state._fsCacheCleanupFileList || [];
          state._fsCacheCleanupFileList.forEach(onEventError2);
          mode += 1;
          onEventError2();
          break;
        /* rm -r cached dir / file */
        case 2:
          mode -= 1;
          local._fsRmr(dir + '/' + error, utility2.onEventErrorDefault);
          break;
        /* get list of files to be removed for the next cycle */
        case 3:
          required.fs.readdir(dir, onEventError2);
          break;
        /* save list to state._fsCacheCleanupFileList */
        case 4:
          state._fsCacheCleanupFileList = data;
          onEventError2();
          break;
        default:
          onEventError(error);
        }
      };
      onEventError2();
    },

    __fsCacheCleanup_default_test: function (onEventError) {
      /*
        this function tests _fsCacheCleanup's default handling behavior
      */
      var dir, mode, onEventError2;
      mode = 0;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          /* create dummy dir for removal */
          dir = state.tmpdir + '/cache/' + utility2.uuid4();
          required.fs.mkdir(dir, onEventError2);
          break;
        case 2:
          /* create dummy file in dummy dir */
          required.fs.writeFile(
            dir + '/__fsCacheCleanup_default_test',
            '__fsCacheCleanup_default_test',
            onEventError2
          );
          break;
        case 3:
          /* add dummy dir to cleanup list */
          state._fsCacheCleanupFileList = [required.path.basename(dir)];
          /* remove dummy dir */
          local._fsCacheCleanup(onEventError2);
          break;
        case 4:
          onEventError2(utility2.error);
          break;
        default:
          utility2.tryCatch(function () {
            utility2.assert(error instanceof Error && error === utility2.error, error);
            onEventError();
          }, onEventError);
        }
      };
      onEventError2();
    },

    __fsCacheCleanup_error_test: function (onEventError) {
      /*
        this function tests _fsCacheCleanup's error handling behavior
      */
      utility2.testMock(onEventError, [
        [global, {
          local: { _fsRmr: utility2.nop },
          required: { fs: { readdir: utility2.callError1, unlink: utility2.callArg1 } }
        }]
      ], function (onEventError) {
        local._fsCacheCleanup(function (error) {
          utility2.assert(error instanceof Error, error);
          onEventError();
        });
      });
    },

    fsMkdirp: function (dir, onEventError) {
      /*
        this function recursively builds up nested directories as necessary
      */
      var mode, onEventError2;
      mode = 0;
      onEventError2 = function (error) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* attempt to mkdir */
        case 1:
          required.fs.mkdir(dir, onEventError2);
          break;
        /* mkdir successful */
        case 2:
          onEventError();
          break;
        /* mkdir failed */
        default:
          switch (error && error.code) {
          /* dir already exists - fallback to success */
          case 'EEXIST':
            onEventError();
            break;
          /* parent dir doesn't exist - recurse up parent dir */
          case 'ENOENT':
            mode = 0;
            utility2.fsMkdirp(required.path.dirname(dir), onEventError2);
            break;
          /* default error */
          default:
            onEventError(error);
          }
        }
      };
      onEventError2();
    },

    _fsMkdirp_default_test: function (onEventError) {
      /*
        this function tests fsMkdirp's default handling behavior
      */
      var dir, mode, onEventError2;
      mode = 0;
      onEventError2 = function (error) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* test default handling behavior */
        case 1:
          dir = state.tmpdir + '/cache/' + utility2.uuid4() + '/' + utility2.uuid4();
          utility2.fsMkdirp(dir, onEventError2);
          break;
        /* test EEXIST handling behavior */
        case 2:
          utility2.fsMkdirp(dir, onEventError2);
          break;
        /* assert dir exists */
        case 3:
          required.fs.exists(dir, onEventError2);
          break;
        case 4:
          utility2.assert(error, error);
          onEventError2(utility2.error);
          break;
        default:
          utility2.tryCatch(function () {
            utility2.assert(error instanceof Error && error === utility2.error, error);
            onEventError();
          }, onEventError);
        }
      };
      onEventError2();
    },

    _fsMkdirp_error_test: function (onEventError) {
      /*
        this function tests fsMkdirp's error handling behavior
      */
      utility2.fsMkdirp('/dev/null/_fsMkdirp_error_test', function (error) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error, error);
          onEventError();
        }, onEventError);
      });
    },

    fsMkdirpSync: function (dir) {
      /*
        this function recursively builds up nested directories as necessary
      */
      utility2.tryCatch(function () {
        required.fs.mkdirSync(dir);
      }, function (error) {
        switch (error.code) {
        case 'EEXIST':
          break;
        case 'ENOENT':
          utility2.fsMkdirpSync(required.path.dirname(dir));
          utility2.fsMkdirpSync(dir);
          break;
        default:
          throw error;
        }
      });
    },

    _fsMkdirpSync_default_test: function (onEventError) {
      /*
        this function tests fsMkdirpSync's default handling behavior
      */
      var dir;
      dir = state.tmpdir + '/cache/' + utility2.uuid4() + '/' + utility2.uuid4();
      utility2.fsMkdirpSync(dir);
      /* mkdir a second time to trigger EEXIST case */
      utility2.fsMkdirpSync(dir);
      required.fs.exists(dir, function (exists) {
        utility2.assert(exists, exists);
        onEventError();
      });
    },

    _fsMkdirpSync_error_test: function (onEventError) {
      /*
        this function tests fsMkdirpSync's error handling behavior
      */
      utility2.tryCatch(function () {
        utility2.fsMkdirpSync('/dev/null/foo');
      }, function (error) {
        utility2.assert(error instanceof Error, error);
        onEventError();
      });
    },

    _fsRmr: function (dir, onEventError) {
      /*
        this function recursively removes the dir
      */
      var mode, onEventReady, onEventError2;
      mode = 0;
      onEventError2 = function (error, data) {
        error = error && error.code === 'ENOENT' ? null : error;
        mode = error instanceof Error && mode !== 1 ? -1 : mode + 1;
        switch (mode) {
        case 1:
          required.fs.unlink(dir, onEventError2);
          break;
        case 2:
          /* if error, then its a dir, which will we will recursively rm */
          if (error) {
            required.fs.readdir(dir, onEventError2);
            return;
          }
          /* else file unlink successful */
          onEventError();
          break;
        case 3:
          onEventReady = utility2.untilReady(onEventError2);
          (data || []).forEach(function (file) {
            onEventReady.remaining += 1;
            local._fsRmr(dir + '/' + file, onEventReady);
          });
          /* handle empty dir case */
          onEventReady.remaining += 1;
          onEventReady();
          break;
        case 4:
          required.fs.rmdir(dir, onEventError2);
          break;
        default:
          onEventError(error);
        }
      };
      onEventError2();
    },

    __fsRmr_error_test: function (onEventError) {
      /*
        this function tests _fsRmr's error handling behavior
      */
      utility2.testMock(onEventError, [[required, { fs: {} }]], function (onEventError) {
        required.fs.readdir = utility2.callArg1;
        required.fs.rmdir = required.fs.unlink = utility2.callError1;
        local._fsRmr(state.tmpdir + '/cache/' + utility2.uuid4(), function (error) {
          utility2.tryCatch(function () {
            utility2.assert(error instanceof Error, error);
            onEventError();
          }, onEventError);
        });
      });
    },

    __fsRmr_errorEnoent_test: function (onEventError) {
      /*
        this function tests _fsRmr's ENOENT error handling behavior
      */
      local._fsRmr(state.tmpdir + '/cache/' + utility2.uuid4(), onEventError);
    },

    fsWatch: function (options, onEventError) {
      /*
        this function watches a file and runs specified actions if it is modified
        usage example:
        utility2.fsWatch({
          actionList: ['lint', 'evalOnWatch'],
          file: 'foo.js'
        }, utility2.onEventErrorDefault);
      */
      var onEventChange, onEventError2;
      onEventChange = function (stat2, stat1) {
        /* execute following code only if modified timestamp has changed */
        if (stat2.mtime >= stat1.mtime) {
          required.fs.readFile(options.file, 'utf8', function (error, content) {
            if (error) {
              onEventError2(error);
              return;
            }
            /* test watch */
            state.testWatchList = state.testWatchList || [];
            state.testWatchList.forEach(function (response) {
              response.write('data:\n\n');
            });
            /* save content to options dict */
            options.content = required.path.extname(options.file) === '.js'
              ? utility2.instrumentCode(options.file, utility2.commentShebang(content))
              : content;
            /* run actions */
            options.actionList.forEach(function (action) {
              state.fsWatchActionDict[action](options);
            });
            /* save browser content */
            state.fsWatchActionDict.createContentBrowser(options);
            onEventError2();
          });
        }
      };
      onEventError2 = function (error) {
        /* set watch mode */
        if (!options.modeWatch) {
          options.modeWatch = true;
          setTimeout(utility2.readyUtility2);
        }
        onEventError(error);
      };
      if (!options.modeWatch) {
        utility2.readyUtility2.remaining += 1;
      }
      options.file = required.path.resolve(options.file);
      state.fsWatchDict = state.fsWatchDict || {};
      /* save options to state.fsWatchDict */
      state.fsWatchDict[options.file] = options;
      /* unwatch old stale file */
      required.fs.unwatchFile(options.file);
      /* watch the new file */
      required.fs.watchFile(options.file, { interval: 1000, persistent: false }, onEventChange);
      onEventChange({ mtime: 2}, { mtime: 1});
    },

    _fsWatch_error_test: function (onEventError) {
      /*
        this function tests fsWatch's error handling behavior
      */
      var file;
      file = state.tmpdir + '/cache/' + utility2.uuid4() + '.js';
      utility2.fsWatch({ actionList: ['lint'], file: file }, function (error) {
        utility2.assert(error instanceof Error, error);
        utility2.fsWatchUnwatch(file);
        onEventError();
      });
    },

    _fsWatch_misc_test: function (onEventError) {
      /*
        this function tests fsWatch's misc handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: {} }],
        [required, { fs: {
          readFile: utility2.nop,
          unwatchFile: utility2.nop,
          watchFile: function (_, __, onEventChange) {
            onEventChange({ mtime: 1 }, { mtime: 2 });
          }
        } }]
      ], function (onEventError) {
        utility2.fsWatch({ file: '', modeWatch: true });
        onEventError();
      });
    },

    _fsWatch_testWatch_test: function (onEventError) {
      /*
        this function tests fsWatch's testWatch handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: {
          fsWatchActionDict: { createContentBrowser: utility2.nop },
          testWatchList: [{ write: utility2.nop }]
        } }],
        [required.fs, {
          readFile: function (_, __, onEventError) {
            onEventError(null, '');
          },
          unWatchFile: utility2.nop,
          watchFile: utility2.nop
        }]
      ], function (onEventError) {
        utility2.fsWatch({ actionList: [], file: '_fsWatch_testWatch_test.js' }, onEventError);
      });
    },

    fsWatchActionDict_base64Decode: function (options) {
      /*
        this function base64Decodes the file content into a binary blob
      */
      options.content = new Buffer(options.content, 'base64');
    },

    fsWatchActionDict_createContentBrowser: function (options) {
      /*
        this function caches the file content for browser use, stripping it of nodejs code
      */
      options.contentBrowser = Buffer.isBuffer(options.content)
        ? options.content
        : utility2.stringToEmptyLine(
          (state.instrumentedFileDict && state.instrumentedFileDict[options.file])
            || options.content,
          (/^\(function module\w*Nodejs\(\) \{[\S\s]*?^\}\(\)\);$/gm)
        ).trimRight();
    },

    fsWatchActionDict_eval: function (options) {
      /*
        this function evals the file content
      */
      switch (required.path.extname(options.file)) {
      /* eval js file */
      case '.js':
        utility2.evalOnEventError(options.file, options.content, function (error) {
          utility2.onEventErrorDefault(error);
        });
        break;
      /* eval js2 file */
      case '.js2':
        options.content.replace(
          (/^\/\* MODULE_BEGIN (.+) \*\/$([\S\s]+?)^\/\* MODULE_END \*\/$/gm),
          function (_, options2, content, ii) {
            options2 = JSON.parse(options2);
            /* save options2 to state.fsWatchDict */
            state.fsWatchDict[options2.file] = options2;
            /* save content to options2 dict */
            options2.content
              /* preserve lineno */
              = options.content.slice(0, ii).replace(/.*/g, '') + content;
            /* instrument js file */
            if (required.path.extname(options2.file) === '.js') {
              options2.content = utility2.instrumentCode(options.file, options2.content);
            }
            /* run actions */
            options2.actionList.forEach(function (action) {
              state.fsWatchActionDict[action](options2);
            });
            /* save browser content */
            state.fsWatchActionDict.createContentBrowser(options2);
          }
        );
        break;
      /* eval shell script */
      case '.sh':
        utility2.shell({
          modeDebug: false,
          script: options.content
        }, utility2.onEventErrorDefault);
        break;
      }
    },

    fsWatchActionDict_evalOnWatch: function (options) {
      /*
        this function evals the file content only during a watch event
      */
      /*jslint evil: true*/
      if (options.modeWatch) {
        utility2.jsonLog('fsWatch - evalOnWatch ' + options.file);
        state.fsWatchActionDict.eval(options);
      }
    },

    _fsWatchActionDict_evalOnWatch_default_test: function (onEventError) {
      /*
        this function tests fsWatchActionDict_evalOnWatch's default handling behavior
      */
      var file, mode, onEventError2;
      mode = 0;
      onEventError2 = function (error) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          file = state.tmpdir + '/cache/' + utility2.uuid4() + '.js';
          required.fs.writeFile(file, '', onEventError2);
          break;
        case 2:
          utility2.fsWatch({
            actionList: ['evalOnWatch'],
            file: file
          }, onEventError2);
          break;
        case 3:
          required.fs.writeFile(
            file,
            'state[' + JSON.stringify(file) + '] = true;',
            utility2.onEventErrorDefault
          );
          break;
        case 4:
          utility2.assert(state[file], state[file]);
          delete state[file];
          utility2.fsWatchUnwatch(file);
          onEventError2(utility2.error);
          break;
        default:
          utility2.tryCatch(function () {
            utility2.assert(error instanceof Error && error === utility2.error, error);
            onEventError();
          }, onEventError);
        }
      };
      onEventError2();
    },

    fsWatchActionDict_lint: function (options) {
      /*
        this function css / js lints the file content
      */
      utility2.scriptLint(options.file, options.content);
    },

    fsWatchActionDict_trim: function (options) {
      /*
        this function trims the file content
      */
      options.content = options.content.trim();
    },

    fsWatchUnwatch: function (file) {
      /*
        this function unwatches the file
      */
      required.fs.unwatchFile(file);
      delete state.fsWatchDict[file];
    },

    fsWriteFileAtomic: function (file, data, onEventError) {
      /*
        this function will
        1. write the data to a unique cache file
        2. rename the cache file to persistent file
        3. mkdirp parent dir if necessary
      */
      var mode, onEventError2, tmp;
      mode = 0;
      onEventError2 = function (error) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* 1. write the data to a cache file */
        case 1:
          tmp = state.tmpdir + '/cache/' + utility2.uuid4();
          required.fs.writeFile(tmp, data, onEventError2);
          break;
        /* 2. rename the cache file to persistent file */
        case 2:
          required.fs.rename(tmp, file, onEventError2);
          break;
        default:
          /* 3. mkdirp parent dir if necessary */
          if (error && error.code === 'ENOENT') {
            mode = 1;
            utility2.fsMkdirp(required.path.dirname(file), onEventError2);
            return;
          }
          onEventError(error);
        }
      };
      onEventError2();
    },

    _fsWriteFileAtomic_default_test: function (onEventError) {
      /*
        this function tests fsWriteFileAtomic's and friends' default handling behavior
      */
      var file, mode, onEventError2;
      mode = 0;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          /* test fsWriteFileAtomic's default handling behavior */
          file = state.tmpdir + '/cache/' + utility2.uuid4();
          utility2.fsWriteFileAtomic(file, '_fsWriteFileAtomic_default_test', onEventError2);
          break;
        case 2:
          required.fs.readFile(file, 'utf8', onEventError2);
          break;
        case 3:
          utility2.assert(data === '_fsWriteFileAtomic_default_test', data);
          onEventError2(utility2.error);
          break;
        default:
          utility2.tryCatch(function () {
            utility2.assert(error instanceof Error && error === utility2.error, error);
            onEventError();
          }, onEventError);
        }
      };
      onEventError2();
    },

    headlessPhantomjs: function (options, onEventError) {
      /*
        this function starts a separate phantomjs process to open and test a webpage
      */
      var onEventError2, testCallbackId, timeout;
      onEventError2 = function (error, data) {
        /* clear timeout for headlessPhantomjs */
        clearTimeout(timeout);
        /* garbage collect testCallbackId */
        delete state.browserTestCallbackDict[testCallbackId];
        onEventError(error);
      };
      testCallbackId = utility2.uuid4();
      options.url = utility2.urlParamsMerge(options.url, { testCallbackId: testCallbackId });
      required.phantomjs = required.phantomjs || utility2.require('phantomjs');
      state.phantomjs = utility2.shell({ argv: [
        options.argv0 || required.phantomjs.path,
        utility2.__dirname + '/.install/utility2_headless_phantomjs.js',
        new Buffer(JSON.stringify(options)).toString('base64')
      ], modeDebug: false });
      state.browserTestCallbackDict[testCallbackId] = onEventError2;
      /* set timeout for headlessPhantomjs */
      timeout = utility2.onEventTimeout(
        onEventError2,
        state.timeoutDefault,
        'headlessPhantomjs ' + options.url
      );
    },

    _headlessPhantomjs_default_test: function (onEventError) {
      /*
        this function tests headlessPhantomjs's default handling behavior
      */
      utility2.headlessPhantomjs({
        url: state.localhost + '/test/test.html#modeTest=1&testWatch=1'
      }, onEventError);
    },

    kill: function (pid, signal) {
      /*
        this function kills the pid, while silently ignoring errors
      */
      /* validate pid is a positive, finite number */
      pid = Number(pid);
      if (0 < pid && pid < Infinity) {
        utility2.tryCatch(function () {
          process.kill(pid, signal);
        }, utility2.nop);
      }
    },

    _kill_default_test: function (onEventError) {
      /*
        this function tests kill's default handling behavior
      */
      utility2.testMock(onEventError, [
        [process, { kill: utility2.nop }]
      ], function (onEventError) {
        /* test default handling behavior */
        utility2.kill(1);
        /* test invalid pid handling behavior */
        utility2.kill('invalid pid');
        onEventError();
      });
    },

    modeCliDict_utility2NpmInstall: function () {
      /*
        this function installs files from utility2.js2 to the .install dir
      */
      Object.keys(state.fsWatchDict).forEach(function (file) {
        if ((/^(?:\.gitconfig|\.gitignore|\.install)\b/).test(file)) {
          /* install files to .install dir */
          required.fs.writeFileSync(
            utility2.__dirname + '/' + file,
            (/^\.install\b/).test(file)
              ? state.fsWatchDict[file].content
              : state.fsWatchDict[file].content.trimLeft()
          );
        }
      });
    },

    _modeCliDict_utility2NpmInstall_default_test: function (onEventError) {
      /*
        this function tests modeCliDict_utility2NpmInstall's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { required: { fs: { writeFileSync: utility2.nop } } }],
        [state, { modeCli: 'utility2NpmInstall' }]
      ], function (onEventError) {
        state.modeCliDict[state.modeCli]();
        onEventError();
      });
    },

    _readyUtility2Exit_error_test: function (onEventError) {
      /*
        this function tests readyUtility2Exit's error handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { process: { exit: null } }],
        [utility2, { onEventErrorDefault: utility2.nop }],
        [utility2.readyUtility2Exit, { error: null, remaining: 0 }]
      ], function (onEventError) {
        process.exit = function (error) {
          utility2.tryCatch(function () {
            utility2.assert(error instanceof Error, error);
            onEventError();
          });
        };
        utility2.readyUtility2Exit.remaining += 1;
        utility2.readyUtility2Exit(utility2.error);
      });
    },

    replParse: function (script) {
      /*
        this function parses repl stdin
      */
      var arg1, arg2;
      /* null -> "(null\n)" */
      if (!/^\(.*\n\)$/.test(script)) {
        return script;
      }
      script = script.slice(1, -2);
      /* @@ syntax sugar */
      while (/\w@@ /.test(script)) {
        script = script.replace(/(\w)@@ ([\S\s]*)/, '$1($2)');
      }
      arg1 = script.split(' ');
      arg2 = arg1.slice(1).join(' ');
      arg1 = arg1[0];
      if (state.replParseDict[arg1]) {
        return state.replParseDict[arg1](arg1, arg2);
      }
      return '(' + script + '\n)';
    },

    _replParse_default_test: function (onEventError) {
      /*
        this function tests replParse's default handling behavior
      */
      /*jslint evil: true*/
      utility2.testMock(onEventError, [
        [utility2, { evalOnEventError: utility2.nop }]
      ], function (onEventError) {
        /* test syntax error */
        state.repl.eval('syntax error');
        /* test '@@' syntax sugar */
        state.repl.eval('(console.log@@ "_replParse_default_test"\n)');
        onEventError();
      });
    },

    replParseDict_$: function (arg1, arg2) {
      /*
        this function runs shell commands from the repl interpreter
      */
      utility2.shell({ modeDebug: false, script: utility2.templateFormat(arg2, state) });
    },

    _replParseDict_$_default_test: function (onEventError) {
      /*
        this function tests replParseDict_$'s default handling behavior
      */
      utility2.testMock(onEventError, [
        [utility2, { shell: utility2.nop }]
      ], function (onEventError) {
        utility2.replParse('($ echo "_replParseDict_print_default_test"\n)');
        onEventError();
      });
    },

    replParseDict_git: function (arg1, arg2) {
      /*
        this function runs git commands from the repl interpreter
      */
      switch (arg2) {
      case 'diff':
        arg2 = '--no-pager diff';
        break;
      case 'log':
        arg2 = 'log | head -n 18';
        break;
      }
      utility2.shell({ modeDebug: false, script: 'git ' + arg2 });
    },

    _replParseDict_git_default_test: function (onEventError) {
      /*
        this function tests replParseDict_git's default handling behavior
      */
      utility2.testMock(onEventError, [
        [utility2, { shell: utility2.nop }]
      ], function (onEventError) {
        utility2.replParse('(git diff\n)');
        utility2.replParse('(git log\n)');
        utility2.replParse('(git status\n)');
        onEventError();
      });
    },

    replParseDict_grep: function (arg1, arg2) {
      /*
        this function performs grep searches from the repl interpreter
      */
      utility2.shell({ modeDebug: false, script: 'find . -type f | grep -v '
        + '"/\\.\\|.*\\b\\(\\.\\d\\|archive\\|artifacts\\|bower_components\\|build'
        + '\\|coverage\\|docs\\|external\\|git_modules\\|jquery\\|log\\|logs\\|min'
        + '\\|node_modules\\|rollup.*\\|swp\\|test\\|tmp\\)\\b" '
        + '| tr "\\n" "\\000" | xargs -0 grep -in ' + JSON.stringify(arg2) });
    },

    _replParseDict_grep_default_test: function (onEventError) {
      /*
        this function tests replParseDict_grep's default handling behavior
      */
      utility2.testMock(onEventError, [
        [utility2, { shell: utility2.nop }]
      ], function (onEventError) {
        utility2.replParse('(grep "_replParseDict_grep_default_test"\n)');
        onEventError();
      });
    },

    replParseDict_print: function (arg1, arg2) {
      /*
        this function prints arg2 in stringified form from the repl interpreter
      */
      return '(console.log(String(' + arg2 + '))\n)';
    },

    _replParseDict_print_default_test: function (onEventError) {
      /*
        this function tests replParseDict_print's default handling behavior
      */
      utility2.testMock(onEventError, [], function (onEventError) {
        utility2.replParse('(print "_replParseDict_print_default_test"\n)');
        onEventError();
      });
    },

    shell: function (options) {
      /*
        this function executes shell scripts with timeout handling
      */
      var child, timeout;
      options.stdio = options.stdio || ['ignore', 1, 2];
      /* spawn shell in child process */
      child = required.child_process.spawn(
        options.argv ? options.argv[0] : '/bin/bash',
        options.argv ? options.argv.slice(1) : ['-c', options.script],
        options
      );
      /* set timeout for shell */
      timeout = utility2.unref(required.child_process.spawn('/bin/bash', ['-c', 'sleep '
        + ((options.timeout || state.timeoutDefault) / 1000) + '; kill ' + child.pid
        + ' 2>/dev/null'], { stdio: 'ignore' })).pid;
      /* debug shell exit code */
      child.on('error', utility2.onEventErrorDefault).on('exit', function (exitCode) {
        utility2.kill(timeout);
        utility2.jsonLog('shell - process ' + child.pid + ' exited with code ' + exitCode);
      });
      /* debug shell options */
      if (options.modeDebug !== false) {
        utility2.jsonLog('shell - options', options);
      }
      return child;
    },

    _shell_default_test: function (onEventError) {
      /*
        this function tests shell's default handling behavior
      */
      utility2.testMock(onEventError, [], function (onEventError) {
        local.shell({ script: ':' }).on('exit', onEventError);
      });
    },

    _StreamReadableMock: function () {
      /*
        this is the _StreamReadableMock class
      */
      return;
    },

    _StreamReadableMock_prototype__read: function () {
      /*
        this function is StreamReadableMock's mandatory _read implementation
        for the readable stream class
      */
      if (!this.pushed) {
        this.pushed = true;
        this.push(this.data);
        return;
      }
      this.push(null);
    },

    streamReadAll: function (readableStream, onEventError) {
      /*
        this function concats data from readable stream and passes it to callback when done
      */
      var chunks;
      chunks = [];
      /* read data from readable stream */
      readableStream.on('data', function (chunk) {
        chunks.push(chunk);
      /* call callback when finished reading */
      }).on('end', function () {
        onEventError(null, Buffer.concat(chunks));
      /* pass any errors to the callback */
      }).on('error', onEventError);
    },

    _streamReadAll_default_test: function (onEventError) {
      /*
        this function tests streamReadAll's default handling behavior
      */
      utility2.streamReadAll(
        utility2.createStreamReadableMock('_streamReadAll_default_test'),
        function (error, data) {
          utility2.tryCatch(function () {
            utility2.assert(!error, error);
            data = data.toString();
            utility2.assert(data === '_streamReadAll_default_test', data);
            onEventError();
          }, onEventError);
        }
      );
    },

    _utility2_timeout_test: function (onEventError) {
      /*
        this function tests utility2's timeout handling behavior
      */
      var exitCode;
      utility2.shell({ argv: [utility2.__filename, '--no-mode-test'], modeDebug: false })
        .on('exit', function (_) {
          exitCode = _;
        });
      /* assert child process of utility2 exited within 4000 ms */
      setTimeout(function () {
        utility2.tryCatch(function () {
          utility2.assert(exitCode === 0, exitCode);
          onEventError();
        }, onEventError);
      }, 4000);
    }

  };
  local._init();
}());



(function moduleAjaxBrowser() {
  /*
    this browser module exports the ajax api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleAjaxBrowser',

    _init: function () {
      if (state.modeBrowser) {
        utility2.initModule(module, local);
      }
    },

    _initOnce: function () {
      /* exports */
      /* css */
      $(document.head).append('<style>\n'
        + utility2.scriptLint('moduleAjaxBrowser.css', '#divXhrProgress {\n'
          + 'background-color: #fff;\n'
          + 'border: 2px solid black;\n'
          + 'border-radius: 5px;\n'
          + 'cursor: pointer;\n'
          + 'display: none;\n'
          + 'left: 50%;\n'
          + 'margin: 0px 0px 0px -64px;\n'
          + 'padding: 0px 0px 0px 0px;\n'
          + 'position: fixed;\n'
          + 'top: 49%;\n'
          + 'width: 128px;\n'
          + 'z-index: 99999;\n'
          + '}\n')
        + '#divXhrProgress > .progress {\n'
          + 'background-color: #777;\n'
          + 'margin: 10px;\n'
        + '}\n'
        + '</style>\n');
      /* init xhr progress container */
      local._divXhrProgress = $('<div id="divXhrProgress">\n'
        + '<div class="active progress progress-striped">\n'
          + '<div class="progress-bar progress-bar-info">loading\n'
        + '</div></div></a>\n');
      $(document.body).append(local._divXhrProgress);
      local._divXhrProgressBar = local._divXhrProgress.find('div.progress-bar');
      /* event handling */
      local._divXhrProgress.on('click', function () {
        while (local._xhrList.length) {
          local._xhrList.pop().abort();
        }
      });
    },

    ajaxBrowser: function (options, onEventError) {
      /*
        this function implements the the ajax function for the javascript platform browser
      */
      var data, error, ii, onEventEvent, onEventError2, timeout, xhr;
      /* error handling */
      onEventError2 = function (error, data) {
        if (error) {
          /* add extra debug info to error */
          utility2.ajaxErrorDebug(
            error,
            options.method,
            xhr.status,
            options.url,
            xhr.responseText
          );
        }
        onEventError(error, data);
      };
      /* event handling */
      onEventEvent = function (event) {
        switch (event.type) {
        case 'abort':
        case 'error':
        case 'load':
          /* clear timeout for ajaxBrowser */
          clearTimeout(timeout);
          /* remove xhr from progress list */
          ii = local._xhrList.indexOf(xhr);
          if (ii >= 0) {
            local._xhrList.splice(ii, 1);
          }
          /* error handling */
          if (!error) {
            /* abort or error */
            if (event.type !== 'load' || xhr.status >= 400) {
              error = new Error(event.type);
            /* json.Parse data */
            } else if (options.resultType === 'json') {
              data = utility2.jsonParseOrError(xhr.responseText);
              if (data instanceof Error) {
                error = data;
              }
            } else {
              data = xhr.responseText;
            }
          }
          onEventError2(error, data);
          break;
        }
        /* increment progress bar */
        if (local._xhrList.length !== 0) {
          local._progressIncrement();
          return;
        }
        /* finish progress bar */
        switch (event.type) {
        case 'load':
          local._progressUpdate('100%', 'progress-bar-success', 'loaded');
          break;
        default:
          local._progressUpdate('100%', 'progress-bar-danger', event.type);
        }
        /* allow the final status to be shown for a short time before hiding */
        setTimeout(local._divXhrProgressHide, 1000);
      };
      /* set default options */
      options.contentType = options.contentType || 'application/octet-stream';
      /* init xhr object */
      xhr = new XMLHttpRequest();
      /* set timeout for ajaxBrowser */
      timeout = utility2.onEventTimeout(function (timeout) {
        error = timeout;
        xhr.abort();
      }, state.timeoutDefault, 'ajaxBrowser');
      /* debug xhr */
      state.debugXhr = xhr;
      xhr.addEventListener('abort', onEventEvent);
      xhr.addEventListener('error', onEventEvent);
      xhr.addEventListener('load', onEventEvent);
      xhr.addEventListener('loadstart', local._progressIncrement);
      xhr.addEventListener('progress', local._progressIncrement);
      xhr.upload.addEventListener('progress', local._progressIncrement);
      /* show progress bar */
      if (local._xhrList.length === 0) {
        local._progressState = 1;
        local._progressUpdate('0%', 'progress-bar-info', 'loading');
        /* bug - delay displaying progress bar to prevent it from showing 100% width */
        setTimeout(function () {
          if (local._xhrList.length) {
            local._divXhrProgress.show();
          }
        });
      }
      local._xhrList.push(xhr);
      /* open xhr */
      xhr.open(options.method, options.url);
      /* send xhr */
      xhr.send(options.data);
    },

    _ajaxBrowser_abort_test: function (onEventError) {
      /*
        this function tests ajaxBrowser's abort handling behavior
      */
      var interval;
      /* set interval */
      interval = setInterval(function () {
        /* wait until no ajax io is in progress before initiating test */
        if (!local._xhrList.length) {
          /* clear interval */
          clearInterval(interval);
          utility2.ajax({ url: '/test/test.timeout' }, function (error) {
            utility2.assert(error instanceof Error, error);
            onEventError();
          });
          local._divXhrProgress.click();
        }
      }, 1000);
    },

    _divXhrProgressHide: function () {
      /*
        this function hides the xhr progress bar if all xhr request are finished
      */
      if (local._xhrList.length === 0) {
        local._divXhrProgress.hide();
      }
    },

    __divXhrProgressHide_default_test: function (onEventError) {
      /*
        this function tests _divXhrProgressHide's default handling behavior
      */
      utility2.testMock(onEventError, [[local, { _xhrList: [] }]], function (onEventError) {
        /* test hide handling behavior */
        local._divXhrProgressHide();
        local._xhrList.push(null);
        /* test nop handling behavior */
        local._divXhrProgressHide();
        onEventError();
      });
    },

    _progressIncrement: function () {
      /*
        this function increments the progress bar
      */
      local._progressState += 0.25;
      local._progressUpdate(
        100 - 100 / (local._progressState) + '%',
        'progress-bar-info',
        'loading'
      );
    },

    _progressUpdate: function (width, type, label) {
      /*
        this function updates the visual progress bar
      */
      local._divXhrProgressBar.css('width', width);
      local._divXhrProgressBar[0].className
        = local._divXhrProgressBar[0].className.replace((/progress-bar-\w+/), type); /**/
      local._divXhrProgressBar.html(label);
    },

    _xhrList: []

  };
  local._init();
}());



(function moduleAjaxNodejs() {
  /*
    this nodejs module exports the ajax api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleAjaxNodejs',

    _init: function () {
      if (state.modeNodejs) {
        utility2.initModule(module, local);
      }
    },

    _ajaxCache: function (options, onEventError) {
      /*
        this function tries to get the data from local cache instead of running the ajax request
      */
      /* cache all ajax request */
      if (state.modeAjaxOffline) {
        options.cache = options.cache || 'miss';
        options.cachePrefix = options.cachePrefix || '/modeAjaxOffline';
      }
      options.cachePrefix = options.cachePrefix || '/cache/ajax';
      if (options.cache && options.cache !== 'miss') {
        required.fs.readFile(state.tmpdir + '/' + options.cachePrefix + '/'
          + encodeURIComponent(options.url0 + '#' + options.method), function (error, data) {
            if (error) {
              options.cache = 'miss';
              utility2.ajax(options, onEventError);
              return;
            }
            options.cache = 'hit';
            local._ajaxOnEventData(options, onEventError, null, data);
          });
        return true;
      }
    },

    __ajaxCache_default_test: function (onEventError) {
      /*
        this function tests _ajaxCache's default handling behavior
      */
      var mode, onEventError2, options;
      mode = 0;
      onEventError2 = function (error) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* test cache miss handling behavior */
        case 1:
          options = { cache: true, url: '/test/test.echo?' + utility2.uuid4() };
          utility2.ajax(options, onEventError2);
          break;
        case 2:
          utility2.tryCatch(function () {
            utility2.assert(!error, error);
            utility2.assert(options.cache === 'miss', options);
            onEventError2();
          }, onEventError2);
          break;
        /* test cache hit handling behavior */
        case 3:
          options.cache = true;
          setTimeout(onEventError2, 1000);
          break;
        case 4:
          utility2.ajax(options, onEventError2);
          break;
        case 5:
          utility2.tryCatch(function () {
            utility2.assert(!error, error);
            utility2.assert(options.cache === 'hit', options);
            onEventError2();
          }, onEventError2);
          break;
        case 6:
          onEventError2(utility2.error);
          break;
        default:
          utility2.tryCatch(function () {
            utility2.assert(error instanceof Error && error === utility2.error, error);
            onEventError();
          }, onEventError);
        }
      };
      onEventError2();
    },

    __ajaxCache_modeAjaxOffline_test: function (onEventError) {
      /*
        this function tests _ajaxCache's modeAjaxOffline handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: { modeAjaxOffline: true } }]
      ], function (onEventError) {
        var options;
        options = {};
        local._ajaxCache(options);
        utility2.assert(utility2.jsonStringifyOrdered(options)
          === '{"cache":"miss","cachePrefix":"/modeAjaxOffline"}', options);
        onEventError();
      });
    },

    ajaxNodejs: function (options, onEventError) {
      /*
        this function implements the the ajax function for the javascript platform nodejs
      */
      var onEventError2, remaining, request, response, timeout, urlParsed;
      onEventError2 = function (error, data) {
        /* clear timeout for ajaxNodejs */
        clearTimeout(timeout);
        if (error) {
          /* add extra debug info to error */
          utility2.ajaxErrorDebug(
            error,
            options.method,
            response && response.statusCode,
            options.url,
            ''
          );
          /* garbage collect request socket */
          if (request) {
            request.destroy();
          }
          /* garbage collect response socket */
          if (response) {
            response.destroy();
          }
        }
        /* debug mode option */
        if (options.modeDebug) {
          utility2.jsonLog('ajaxNodejs - response', [
            options.url,
            options.responseStatusCode,
            options.responseHeaders
          ]);
        }
        remaining -= 1;
        (remaining >= 0 ? onEventError : utility2.onEventErrorDefault)(error, data);
      };
      remaining = 1;
      /* set timeout for ajaxNodejs */
      timeout = utility2.onEventTimeout(onEventError2, state.timeoutDefault, 'ajaxNodejs');
      /* localhost */
      if (options.url[0] === '/') {
        options.url = state.localhost + options.url;
      }
      /* assert valid http / https url */
      if (!(/^https*:/).test(options.url)) {
        onEventError2(new Error('ajaxNodejs - invalid url ' + options.url));
        return;
      }
      /* ajax caching */
      if (local._ajaxCache(options, onEventError2)) {
        return;
      }
      /* use cached data when in local mode */
      if (state.modeOffline && options.url.indexOf(state.localhost) !== 0) {
        options.url = state.localhost + '/test/modeAjaxOffline/'
          + encodeURIComponent(options.url + '#' + options.method);
      }
      /* set default options */
      urlParsed = required.url.parse(String(options.url));
      /* bug - disable socket pooling, because it causes timeout errors in tls tests */
      options.agent = options.agent || false;
      /* host needed for redirects */
      options.host = urlParsed.host;
      /* hostname needed for http(s).request */
      options.hostname = urlParsed.hostname;
      /* path needed for http(s).request */
      options.path = urlParsed.path;
      /* port needed for http(s).request */
      options.port = urlParsed.port;
      /* protocol needed for http(s).request */
      options.protocol = urlParsed.protocol;
      /* run ajax request */
      request = (options.protocol === 'https:'
        ? required.https
        : required.http).request(options, function (_) {
        response = _;
        local._ajaxOnEventResponse(options, onEventError2, response);
      });
      /* error handling */
      request.on('error', onEventError2);
      /* debug ajaxRequest */
      state.debugAjaxRequest = request;
      /* pipe request */
      if (options.data instanceof required.stream.Readable) {
        options.data.on('error', onEventError2).pipe(request.on('error', onEventError2));
      /* end request */
      } else {
        request.end(options.data);
      }
      /* debug mode option */
      if (options.modeDebug) {
        utility2.jsonLog('ajaxNodejs - options', options);
      }
    },

    _ajaxNodejs_https_test: function (onEventError) {
      /*
        this function tests ajaxNodejs's https handling behavior
      */
      utility2.testMock(onEventError, [
        [required, { https: { request: function () {
          return { end: utility2.nop, on: utility2.nop };
        } } }],
        [state, { modeOffline: false }]
      ], function (onEventError) {
        utility2.ajax({ url: 'https://_ajaxNodejs_https_test' }, function (error) {
          utility2.tryCatch(function () {
            utility2.assert(error instanceof Error, error);
            onEventError();
          }, onEventError);
        });
      });
    },

    _ajaxNodejs_invalidUrl_test: function (onEventError) {
      /*
        this function tests ajaxNodejs's invalid url handling behavior
      */
      utility2.ajax({ url: '_ajaxNodejs_invalidUrl_test' }, function (error) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error, error);
          onEventError();
        }, onEventError);
      });
    },

    _ajaxNodejs_modeOffline_test: function (onEventError) {
      /*
        this function tests ajaxNodejs's modeOffline handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { setTimeout: setTimeout }],
        [state, { modeOffline: true }]
      ], function (onEventError) {
        var options;
        options = { url: 'http://img.shields.io/badge/coverage-100.0%-00ee00.svg?style=flat' };
        utility2.ajax(options, function (error, data) {
          utility2.tryCatch(function () {
            utility2.assert(!error, error);
            utility2.assert(options.url === state.localhost + '/test/modeAjaxOffline/'
              + 'http%3A%2F%2Fimg.shields.io%2Fbadge%2Fcoverage-100.0%25-00ee00.svg'
              + '%3Fstyle%3Dflat%23GET', options.url);
            onEventError();
          }, onEventError);
        });
      });
    },

    _ajaxOnEventData: function (options, onEventError, error, data) {
      /*
        this function handles error / data received by ajax request
      */
      if (error) {
        onEventError(error);
        return;
      }
      if (options.responseStatusCode >= 400) {
        onEventError(new Error(data.toString()));
        return;
      }
      /* cache data */
      if (options.cache === 'miss') {
        utility2.fsWriteFileAtomic(state.tmpdir + '/' + options.cachePrefix + '/'
          + encodeURIComponent(options.url0
            + '#' + options.method), data, utility2.onEventErrorDefault);
      }
      switch (options.resultType) {
      case 'binary':
        onEventError(null, data);
        break;
      /* try to JSON.parse the response */
      case 'json':
        utility2.jsonParseHandler(onEventError)(error, data);
        break;
      default:
        onEventError(null, data.toString());
      }
    },

    __ajaxOnEventData_default_test: function (onEventError) {
      /*
        this function tests _ajaxOnEventData's default handling behavior
      */
      var onEventReady;
      onEventReady = utility2.untilReady(onEventError);
      /* test binary resultType handling behavior */
      onEventReady.remaining += 1;
      utility2.ajax({
        resultType: 'binary',
        url: '/test/test.json'
      }, function (error, data) {
        utility2.tryCatch(function () {
          utility2.assert(!error, error);
          utility2.assert(data.toString() === '"hello test"', data);
          onEventReady();
        }, onEventReady);
      });
      /* test json resultType handling behavior */
      onEventReady.remaining += 1;
      utility2.ajax({
        resultType: 'json',
        url: '/test/test.json'
      }, function (error, data) {
        utility2.tryCatch(function () {
          utility2.assert(!error, error);
          utility2.assert(data.toString() === 'hello test', data);
          onEventReady();
        }, onEventReady);
      });
      /* test error handling behavior */
      onEventReady.remaining += 1;
      local._ajaxOnEventData(null, function (error) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error, error);
          onEventReady();
        }, onEventReady);
      }, utility2.error);
    },

    _ajaxOnEventResponse: function (options, onEventError, response) {
      /*
        this function handles the response object received by ajax request
      */
      /* error handling */
      response.on('error', onEventError);
      /* debug response */
      state.debugAjaxResponse = response;
      if (options.resultType === 'response') {
        onEventError(null, response);
        return;
      }
      options.responseStatusCode = response.statusCode;
      options.responseHeaders = response.headers;
      if (options.redirect !== false) {
        /* 3xx redirect */
        switch (response.statusCode) {
        case 300:
        case 301:
        case 302:
        case 303:
        case 307:
        case 308:
          options.redirected = options.redirected || 0;
          options.redirected += 1;
          if (options.redirected >= 8) {
            onEventError(new Error('ajaxNodejs - too many http redirects to '
              + response.headers.location));
            return;
          }
          options.url = response.headers.location;
          if (options.url[0] === '/') {
            options.url = options.protocol + '//' + options.host + options.url;
          }
          if (response.statusCode === 303) {
            options.data = null;
            options.method = 'GET';
          }
          utility2.ajax(options, onEventError);
          return;
        }
      }
      utility2.streamReadAll(
        response.on('error', onEventError),
        function (error, data) {
          local._ajaxOnEventData(options, onEventError, error, data);
        }
      );
    },

    __ajaxOnEventResponse_redirect_test: function (onEventError) {
      /*
        this function tests _ajaxOnEventResponse's redirect handling behavior
      */
      local._ajaxOnEventResponse({ redirected: Infinity }, function (error) {
        utility2.assert(error instanceof Error, error);
        onEventError();
      }, { headers: {}, on: utility2.nop, statusCode: 300 });
    },

    replParseDict_ajax: function (arg1, arg2) {
      /*
        this function runs ajax from the repl interpreter
      */
      utility2.ajax({ modeDebug: true, url: arg2 }, utility2.onEventErrorDefault);
    },

    _replParseDict_ajax_default_test: function (onEventError) {
      /*
        this function tests replParseDict_ajax's default handling behavior
      */
      utility2.testMock(onEventError, [
        [utility2, { ajax: utility2.nop }]
      ], function (onEventError) {
        utility2.replParse('(ajax /test/test.json\n)');
        onEventError();
      });
    }

  };
  local._init();
}());



(function moduleAjaxShared() {
  /*
    this shared module exports the ajax api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleAjaxShared',

    _init: function () {
      utility2.initModule(module, local);
    },

    ajax: function (options, onEventError) {
      /*
        this function runs the ajax request, and auto-concats the response stream into utf8 text
        usage example:
        utility2.ajax({
          data: 'hello ajax',
          type: 'POST',
          url: '/upload/foo.txt'
        }, utility2.onEventErrorDefault);
      */
      /* validate options */
      if (!(options && typeof options.url === 'string')) {
        onEventError(new Error('ajax - invalid options.url ' + (options && options.url)));
        return;
      }
      /* assert callback is a function */
      utility2.assert(typeof onEventError === 'function', onEventError);
      /* set options.headers if necessary */
      options.headers = options.headers || {};
      /* set options.url0 if necessary */
      options.url0 = options.url0 || options.url;
      /* set options.method if necessary */
      if (options.data) {
        options.method = options.method || 'POST';
      }
      options.method = options.method || 'GET';
      (state.modeNodejs ? utility2.ajaxNodejs : utility2.ajaxBrowser)(options, onEventError);
    },

    _ajax_default_test: function (onEventError) {
      /*
        this function tests ajax's default handling behavior
      */
      utility2.ajax({ modeDebug: true, url: '/' }, onEventError);
    },

    _ajax_json_test: function (onEventError) {
      /*
        this function tests ajax's json handling behavior
      */
      utility2.ajax({ resultType: 'json', url: '/test/test.json' }, function (error, data) {
        utility2.tryCatch(function () {
          utility2.assert(!error, error);
          utility2.assert(data.toString() === 'hello test', data);
          onEventError();
        }, onEventError);
      });
    },

    _ajax_jsonError_test: function (onEventError) {
      /*
        this function tests ajax's json error handling behavior
      */
      utility2.ajax({ resultType: 'json', url: '/test/test.echo' }, function (error) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error, error);
          onEventError();
        }, onEventError);
      });
    },

    _ajax_nullCase_test: function (onEventError) {
      /*
        this function tests ajax's null case handling behavior
      */
      utility2.ajax({}, function (error, data) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error, error);
          utility2.assert(data === undefined, data);
          onEventError();
        }, onEventError);
      });
    },

    _ajax_timeout_test: function (onEventError) {
      /*
        this function tests ajax's timeout handling behavior
      */
      utility2.testMock(onEventError, [
        [state, { timeoutDefault: 1 }]
      ], function (onEventError) {
        utility2.ajax({ url: '/test/test.timeout?timeout=1000' }, function (error) {
          utility2.assert(error instanceof Error, error);
          utility2.assert(error.code === 'ETIMEDOUT', error.code);
        });
        onEventError();
      });
    },

    ajaxErrorDebug: function (error, method, statusCode, url, data) {
      /*
        this function add extra ajax debug info to the error's message and stack
      */
      /* add http method / status / url info to error.message */
      error.message = method + ' ' + statusCode + ' - ' + url
        + '\n' + error.message + '\n' + data;
      if (error.stack) {
        /* BUG - phantomjs has readonly error.stack */
        utility2.tryCatch(function () {
          error.stack = error.message + '\n' + error.stack;
        }, utility2.nop);
      }
    },

    ajaxMultiUrls: function (options, onEventReady) {
      /*
        this function makes multiple ajax requests for multiple urls
        usage example:
        utility2.ajaxMultiUrls({
          urlList: ['http://facebook.com', 'http://google.com']
        }, function (error, data) {
          console.log(data);
        }, function () {
          console.log('finished all ajax requests');
        });
      */
      var remainingList;
      /* validate options.urlList */
      if (!(options
        && Array.isArray(options.urlList)
        && options.urlList.every(function (url) {
            return typeof url === 'string';
          }))) {
        onEventReady(new Error('ajaxMultiUrls - invalid options.urlList '
          + utility2.jsonStringifyCircular(options && options.urlList)));
        return;
      }
      remainingList = utility2.jsonCopy(options.urlList);
      options.urlList.forEach(function (url) {
        var options2;
        options2 = utility2.jsonCopy(options);
        options2.url = url;
        utility2.ajax(options2, function (error, data) {
          /* debug remainingList */
          remainingList.splice(remainingList.indexOf(options2.url0), 1);
          utility2.jsonLog('ajaxMultiUrls - fetched / remaining', [
            options2.url0,
            JSON.stringify(remainingList.slice(0, 2)).replace(']', ',...]')
          ]);
          onEventReady(error, {
            data: data,
            options: options2
          });
        });
      });
    },

    _ajaxMultiUrls_default_test: function (onEventError) {
      /*
        this function tests ajaxMultiUrls's default handling behavior
      */
      var onEventReady;
      onEventReady = utility2.untilReady(onEventError);
      onEventReady.remaining += 2;
      utility2.ajaxMultiUrls({ urlList: [
        '/test/test.json',
        (state.localhost || '') + '/test/test.json'
      ] }, function (error, data) {
        utility2.tryCatch(function () {
          utility2.assert(!error, error);
          utility2.assert(data.data === '"hello test"', data.data);
          onEventReady();
        }, onEventReady);
      });
    },

    _ajaxMultiUrls_error_test: function (onEventError) {
      /*
        this function tests ajaxMultiUrls's error handling behavior
      */
      utility2.ajaxMultiUrls({ urlList: [null] }, function (error) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error, error);
          onEventError();
        }, onEventError);
      });
    },

    _ajaxMultiUrls_nullCase_test: function (onEventError) {
      /*
        this function tests ajaxMultiUrls's null case handling behavior
      */
      utility2.ajaxMultiUrls(null, function (error) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error, error);
          onEventError();
        }, onEventError);
      });
    }

  };
  local._init();
}());



(function moduleServerNodejs() {
  /*
    this nodejs module exports the server api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleServerNodejs',

    _init: function () {
      if (required.utility2_external && state.modeNodejs) {
        utility2.initModule(module, local);
      }
    },

    _initOnce: function () {
      /* init middlewares */
      [
        'Test',
        'Logging',
        'Security',
        'Cache',
        'Proxy',
        'Main',
        'File'
      ].forEach(function (middleware, ii) {
        middleware = ii + middleware;
        /* init middleware router dict */
        state['router' + middleware + 'Dict'] = state['router' + middleware + 'Dict'] || {};
        /* init middleware */
        state['middleware' + middleware] = state['middleware' + middleware]
          || local._createMiddleware(state['router' + middleware + 'Dict']);
      });
      /* middleware1LoggingDefault */
      state.middleware1LoggingDefault = state.middleware1LoggingDefault
        || required.connect_logger('dev');
      /* middleware2Security - basic auth */
      state.securityBasicAuthSecret = state.securityBasicAuthSecret
        || 'admin:' + utility2.uuid4();
      /* init server */
      /* defer local tests until server is listening on state.serverPort */
      utility2.readyUtility2.remaining += 1;
      /* indicate server is ready */
      utility2.serverListen(utility2.readyUtility2);
    },

    'router1LoggingDict_/': function (request, response, next) {
      /*
        this function handles default logging
      */
      switch (request.urlPathNormalized) {
      /* ignore logging for these url paths */
      case '/favicon.ico':
        next();
        break;
      default:
        state.middleware1LoggingDefault(request, response, next);
      }
    },

    'router2SecurityDict_/security': function (request, response, next) {
      /*
        this function handles default server security
      */
      /* security - https redirect */
      if (state.modeSecurityHttpsRedirect !== false
          && utility2.securityHttpsRedirect(request, response)) {
        return;
      }
      /* security - basic auth passed */
      if (utility2.securityBasicAuthValidate(request)) {
        next();
        return;
      }
      /* security - basic auth failed */
      utility2.serverRespond(request, response, 303, {
        data: '/security/signin?redirect=' + encodeURIComponent(request.url)
      });
    },

    '_router2SecurityDict_/_basicAuthFailure_test': function (onEventError) {
      /*
        this function tests router2SecurityDict_/'s basic auth failure handling behavior
      */
      utility2.ajax({
        url: '/security?basicAuthFail=1'
      }, function (error) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error, error);
          onEventError();
        }, onEventError);
      });
    },

    '_router2SecurityDict_/security_default_test': function (onEventError) {
      /*
        this function tests router2SecurityDict_/security's default handling behavior
      */
      utility2.ajax({ url: '/security' }, function (error, data) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error
            && error.message === 'GET 404 - ' + state.localhost + '/security\n404 Not Found\n',
            error.message);
          onEventError();
        }, onEventError);
      });
    },

    '_router2SecurityDict_/security_httpsRedirect_test': function (onEventError) {
      /*
        this function tests router2SecurityDict_/security's https redirect handling behavior
      */
      utility2.testMock(onEventError, [
        [utility2, { securityHttpsRedirect: function () {
          return true;
        } }]
      ], function (onEventError) {
        local['router2SecurityDict_/security']();
        onEventError();
      });
    },

    'router2SecurityDict_/security/signin': function (request, response, next) {
      /* security - https redirect */
      if (utility2.securityHttpsRedirect(request, response)) {
        return;
      }
      /* basic auth succeeded */
      if (utility2.securityBasicAuthValidate(request)) {
        utility2.serverRespond(request, response, 303, {
          data: request.urlParams.redirect || '/'
        });
        return;
      }
      utility2.serverRespond(request, response, 401, {});
    },

    '_router2SecurityDict_/security/signin_default_test': function (onEventError) {
      /*
        this function tests router2SecurityDict_/security/signin's default handling behavior
      */
      var onEventReady;
      onEventReady = utility2.untilReady(onEventError);
      /* test https redirect */
      onEventReady.remaining += 1;
      utility2.ajax({ url: '/security/signin?httpsRedirect=1' }, function (error) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error, error);
          onEventReady();
        }, onEventReady);
      });
      /* test successful signin to main page */
      onEventReady.remaining += 1;
      utility2.ajax({ url: '/security/signin' }, function (error, data) {
        utility2.tryCatch(function () {
          utility2.assert(!error, error);
          onEventReady();
        }, onEventReady);
      });
      /* test successful signin with redirect */
      onEventReady.remaining += 1;
      utility2.ajax({
        url: '/security/signin?redirect=%2Ftest%2Ftest.json'
      }, function (error, data) {
        utility2.tryCatch(function () {
          utility2.assert(!error, error);
          utility2.assert(data === '"hello test"', data);
          onEventReady();
        }, onEventReady);
      });
    },

    '_router2SecurityDict_/security/signin_failure_test': function (onEventError) {
      /*
        this function tests router2SecurityDict_/security/signin's failure handling behavior
      */
      utility2.ajax({
        redirect: false,
        url: '/security/signin?basicAuthFail=1'
      }, function (error) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error, error);
          onEventError();
        }, onEventError);
      });
    },

    'router3CacheDict_/public/utility2': function (request, response, next) {
      /*
        this function grants public access to the /public path
      */
      utility2.serverResponseWriteHead(response, null, {
        'cache-control': 'public, max-age=31536000'
      });
      next();
    },

    'router4ProxyDict_/proxy/proxy.ajax': function (request, response, next) {
      /*
        this function proxies frontend request
      */
      var headers, url;
      url = request.url.replace('/proxy/proxy.ajax/', '');
      /* create modified copy of request.header */
      headers = utility2.jsonCopy(request.headers);
      /* update host header with actual destination host */
      headers.host = required.url.parse(url).host;
      /* init http request */
      utility2.ajax({
        data: request,
        headers: headers,
        resultType: 'response',
        url: url
      }, function (error, response2) {
        if (error) {
          next(error);
          return;
        }
        /* pipe proxied response back to client */
        response2.pipe(response);
      });
    },

    '_router4ProxyDict_/proxy.ajax_error_test': function (onEventError) {
      /*
        this function tests router4ProxyDict_/proxy.ajax's error handling behavior
      */
      utility2.testMock(onEventError, [
        [utility2, { ajax: utility2.callError1 }]
      ], function (onEventError) {
        local['router4ProxyDict_/proxy/proxy.ajax']({
          headers: {},
          url: ''
        }, null, function (error) {
          utility2.tryCatch(function () {
            utility2.assert(error instanceof Error, error);
            onEventError();
          }, onEventError);
        });
      });
    },

    'router5MainDict_/': function (request, response, next) {
      /*
        this function handles the main page
      */
      if (request.urlPathNormalized === '/') {
        utility2.serverRespond(request, response, 200, {
          contentType: 'text/html',
          data: state.fsWatchDict['/test/test.html'].contentBrowser
        });
        return;
      }
      next();
    },

    'router5MainDict_/test/report.upload': function (request, response, next) {
      /*
        this function receives and parses uploaded test reports
      */
      var data, failures, mode, onEventError2;
      mode = 0;
      onEventError2 = function (error, _) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          utility2.streamReadAll(request, utility2.jsonParseHandler(onEventError2));
          break;
        case 2:
          data = _;
          /* security - use try catch block to parse potential malformed data */
          utility2.tryCatch(onEventError2, onEventError2);
          break;
        case 3:
          data = data || {};
          /* merge global.__coverage with uploaded code coverage object */
          local._coverageMerge(global.__coverage__, data.coverage || {});
          state.testSuiteList = state.testSuiteList || [];
          /* security - handle malformed data.testSuiteList */
          (Array.isArray(data.testSuiteList)
            ? data.testSuiteList
            : []).forEach(function (testSuite) {
            if (testSuite) {
              state.testSuiteList.push(testSuite);
              failures = failures || testSuite.failures;
            }
          });
          next = state.browserTestCallbackDict[data.testCallbackId];
          if (next) {
            next(failures ? new Error('tests failed') : null);
          }
          response.end();
          break;
        default:
          next(error);
        }
      };
      onEventError2();
    },

    '_router5MainDict_/test/report.upload_error_test': function (onEventError) {
      /*
        this function tests router5MainDict_/test/report.upload's error handling behavior
      */
      utility2.testMock(onEventError, [
        [utility2, { streamReadAll: utility2.callError1 }]
      ], function (onEventError) {
        local['router5MainDict_/test/report.upload'](null, null, function (error) {
          utility2.assert(error instanceof Error, error);
          onEventError();
        });
      });
    },

    '_router5MainDict_/test/report.upload_failedTest_test': function (onEventError) {
      /*
        this function tests router5MainDict_/test/report.upload's failed test handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: { browserTestCallbackDict: {}, testSuiteList: null } }],
        [utility2, { streamReadAll: function (_, onEventError) {
          onEventError(null, JSON.stringify({
            testCallbackId: 'aa',
            testSuiteList: [null, { failures: 2 }]
          }));
        } }]
      ], function (onEventError) {
        state.browserTestCallbackDict.aa = function (error) {
          utility2.tryCatch(function () {
            utility2.assert(error instanceof Error, error);
            onEventError();
          }, onEventError);
        };
        local['router5MainDict_/test/report.upload'](null, { end: utility2.nop });
      });
    },

    '_router5MainDict_/test/report.upload_nullCase_test': function (onEventError) {
      /*
        this function tests router5MainDict_/test/report.upload's null case handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: { browserTestCallbackDict: {}, testSuiteList: null } }],
        [utility2, { streamReadAll: utility2.callArg1 }]
      ], function (onEventError) {
        local['router5MainDict_/test/report.upload'](null, { end: utility2.nop });
        onEventError();
      });
    },

    'router5MainDict_/test/test.echo': function (request, response) {
      /*
        this function echoes the request back to the response
      */
      utility2.serverResponseWriteHead(response, 200, { 'content-type': 'text/plain' });
      response.write(request.method + ' ' + request.url + ' http/' + request.httpVersion
        + '\n');
      Object.keys(request.headers).forEach(function (name) {
        response.write(name + ': ' + request.headers[name] + '\n');
      });
      response.write('\n');
      /* optimization - stream data */
      request.pipe(response);
    },

    'router5MainDict_/test/test.error': function (request, response, next) {
      /*
        this function mocks an internal server error
      */
      state.onEventErrorDefaultIgnoreList.push('utility2 error');
      next(utility2.error);
    },

    'router5MainDict_/test/test.timeout': function (request, response, next) {
      /*
        this function responds after state.timeoutDefault milliseconds
      */
      setTimeout(function () {
        response.end();
      }, request.urlParams.timeout || state.timeoutDefault);
    },

    'router5MainDict_/test/test.watch': function (request, response, next) {
      /*
        this function informs the client about server file changes using server sent events
      */
      var list;
      if (request.headers.accept !== 'text/event-stream') {
        next();
        return;
      }
      /* https://developer.mozilla.org/en-US/docs/Server-sent_events/Using_server-sent_events */
      utility2.serverResponseWriteHead(response, null, { 'content-type': 'text/event-stream' });
      /* set retry interval to state.timeoutDefault */
      response.write('retry: ' + state.timeoutDefault + '\n\n');
      list = state.testWatchList;
      /* limit max number of server-sent events */
      if (list.length >= 8) {
        list.pop();
      }
      list.unshift(utility2.unref(response));
    },

    '_router5MainDict_/test/test.watch_garbageCollect_test': function (onEventError) {
      /*
        this function tests _router5MainDict_/test/test.watch's garbage collect
        handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: { testWatchList: [0, 1, 2, 3, 4, 5, 6, 7] } }]
      ], function (onEventError) {
        var response;
        response = { setHeader: utility2.nop, write: utility2.nop };
        local['router5MainDict_/test/test.watch'](
          { headers: { accept: 'text/event-stream' } },
          response
        );
        utility2.assert(state.testWatchList.length === 8, state.testWatchList);
        utility2.assert(state.testWatchList[0] === response, state.testWatchList);
        onEventError();
      });
    },

    'router6FileDict_/public': function (request, response, next) {
      /*
        this function serves public files
      */
      var data;
      data = state.fsWatchDict[request.urlPathNormalized];
      data = data && data.contentBrowser;
      /* respond with in-memory cache of data if possible */
      if (data) {
        utility2.serverRespond(request, response, 200, { data: data });
        return;
      }
      /* fallback to physical file */
      utility2.serverRespondFile(response, process.cwd() + request.urlPathNormalized, next);
    },

    'router6FileDict_/public/utility2': function (request, response, next) {
      /*
        this function serves public, utility2 files
      */
      utility2.serverRespondFile(
        response,
        utility2.__dirname + '/.install/public/'
          + request.urlPathNormalized.replace('/public/utility2/', ''),
        next
      );
    },

    'router6FileDict_/public/utility2.js': function (request, response) {
      /*
        this function serves the file utility2.js
      */
      utility2.serverRespond(request, response, 200, {
        data: state.fsWatchDict[utility2.__filename].contentBrowser
      });
    },

    'router6FileDict_/test': function (request, response, next) {
      /*
        this function serves public files
      */
      var data;
      data = state.fsWatchDict[request.urlPathNormalized];
      data = data && data.contentBrowser;
      /* respond with in-memory cache of data if possible */
      if (data) {
        utility2.serverRespond(request, response, 200, { data: data });
        return;
      }
      next();
    },

    _createMiddleware: function (router5MainDict) {
      /*
        this function creates a middleware app using the specified router dict
      */
      return function (request, response, next) {
        var mode, onEventError2, path;
        mode = 0;
        onEventError2 = function () {
          mode += 1;
          switch (mode) {
          case 1:
            /* debug request */
            state.debugServerRequest = request;
            /* debug response */
            state.debugServerResponse = response;
            /* security - validate request url path */
            if (request.urlPathNormalized) {
              onEventError2();
              return;
            }
            path = request.url;
            /* security - enforce max url length */
            if (path.length <= 4096) {
              path = (/[^#&?]*/).exec(path)[0];
              if (path
                  /* security - enforce max path length */
                  && path.length <= 256
                  /* security - disallow relative path */
                  && !(/\.\/|\.$/).test(path)) {
                /* dyanamic path handler */
                request.urlPathNormalized = required.path.resolve(path);
                /* urlParsed */
                request.urlParams = request.urlParams || utility2.urlParamsGet(request.url);
                onEventError2();
                return;
              }
            }
            next(new Error('_createMiddleware request handler - invalid url ' + path));
            break;
          case 2:
            path = request.urlPathNormalized;
            while (!(router5MainDict[path] || path === '/')) {
              path = required.path.dirname(path);
            }
            /* found a handler matching request path */
            if (router5MainDict[path]) {
              /* debug request handler */
              state.debugServerRequestHandler = router5MainDict[path];
              /* process request with error handling */
              utility2.tryCatch(onEventError2, next);
            /* else move on to next middleware */
            } else {
              next();
            }
            break;
          case 3:
            router5MainDict[path](request, response, next);
            break;
          }
        };
        onEventError2();
      };
    },

    __createMiddleware_security_test: function (onEventError) {
      /*
        this function tests _createMiddleware's security handling behavior
      */
      var onEventReady, url;
      onEventReady = utility2.untilReady(onEventError);
      /* test path overflow handling behavior */
      onEventReady.remaining += 1;
      url = '/public/' + new Buffer(4096).toString('hex');
      state.onEventErrorDefaultIgnoreList.push(
        '_createMiddleware request handler - invalid url ' + url
      );
      utility2.ajax({ url: url }, function (error) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error, error);
          onEventReady();
        }, onEventReady);
      });
      /* test relative path handling behavior */
      onEventReady.remaining += 1;
      state.onEventErrorDefaultIgnoreList.push(
        '_createMiddleware request handler - invalid url /public/../aa'
      );
      utility2.ajax({ url: '/public/../aa' }, function (error) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error, error);
          onEventReady();
        }, onEventReady);
      });
    },

    _coverageMerge: function (coverage1, coverage2) {
      /*
        this function merges coverage2 into coverage1
      */
      var file1, file2;
      Object.keys(coverage2).forEach(function (key) {
        file1 = coverage1[key];
        file2 = coverage2[key];
        /* security - handle malformed file2 */
        if (file1 && file2) {
          /* remove derived info */
          delete file1.l;
          Object.keys(file2.b || {}).forEach(function (key) {
            /* security - handle malformed file2.b[key] */
            if (Array.isArray(file2.b[key])) {
              file1.b[key] = file1.b[key] || [];
              file2.b[key].forEach(function (count, ii) {
                file1.b[key][ii] = file1.b[key][ii] || 0;
                file1.b[key][ii] += count;
              });
            }
          });
          Object.keys(file2.f || {}).forEach(function (key) {
            file1.f[key] = file1.f[key] || 0;
            file1.f[key] += file2.f[key];
          });
          Object.keys(file2.s || {}).forEach(function (key) {
            file1.s[key] = file1.s[key] || 0;
            file1.s[key] += file2.s[key];
          });
        }
      });
    },

    __coverageMerge_nullCase_test: function (onEventError) {
      /*
        this function tests _coverageMerge's null case handling behavior
      */
      /* test null case 1 handling behavior */
      local._coverageMerge({}, { aa: null });
      /* test null case 2 handling behavior */
      local._coverageMerge({ aa: {} }, { aa: {} });
      /* test null case 3 handling behavior */
      local._coverageMerge({ aa: {} }, { aa: { b: { bb: null } } });
      /* test null case 4 handling behavior */
      local._coverageMerge({ aa: { b: {} } }, { aa: { b: { bb: [] } } });
      onEventError();
    },

    middlewareApplication: function (request, response, next) {
      /*
        this function exports the main middleware application
      */
      var mode, onEventError2;
      mode = 0;
      onEventError2 = function (error) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* 1. middleware logging */
        case 1:
          state.middleware1Logging(request, response, onEventError2);
          break;
        /* 2. middleware security */
        case 2:
          state.middleware2Security(request, response, onEventError2);
          break;
        /* 3. middleware cache */
        case 3:
          state.middleware3Cache(request, response, onEventError2);
          break;
        /* 4. middleware proxy */
        case 4:
          state.middleware4Proxy(request, response, onEventError2);
          break;
        /* 5. middleware main */
        case 5:
          state.middleware5Main(request, response, onEventError2);
          break;
        /* 6. middleware file */
        case 6:
          state.middleware6File(request, response, onEventError2);
          break;
        /* fallback to next middleware */
        default:
          next(error);
        }
      };
      onEventError2();
    },

    securityBasicAuthValidate: function (request) {
      /*
        this function validates the request's basic auth
        basic auth format:
        btoa('Aladdin:open sesame')
        atob('QWxhZGRpbjpvcGVuIHNlc2FtZQ==')
      */
      /* browser-initiated basic auth failure */
      return !request.urlParams.basicAuthFail
        /* ignore for localhost */
        && (utility2.securityFromLocalhost(request)
          /* basic auth validation */
          || (/\S*$/).exec(request.headers.authorization || '')[0]
          === state.securityBasicAuthSecret);
    },

    _securityBasicAuthValidate_failure_test: function (onEventError) {
      /*
        this function tests securityBasicAuthValidate's failure handling behavior
      */
      var data;
      data = utility2.securityBasicAuthValidate({ headers: {}, urlParams: {} });
      utility2.assert(!data, data);
      onEventError();
    },

    securityHttpsRedirect: function (request, response) {
      /*
        this function forces the server to redirect all non-https requests to https
      */
      var headers;
      headers = request.headers;
      /* browser-initiated httpsRedirect */
      if (request.urlParams.httpsRedirect
          /* ignore for locahost */
          || (!utility2.securityFromLocalhost(request)
            /* check x-forwared-proto header in case we're behind a reverse proxy */
            && headers['x-forwarded-proto'] !== 'https')) {
        utility2.serverRespond(request, response, 301, {
          data: 'https://' + headers.host + request.url
        });
        return true;
      }
    },

    _securityHttpsRedirect_default_test: function (onEventError) {
      /*
        this function tests securityHttpsRedirect's default handling behavior
      */
      var data;
      data = utility2.securityHttpsRedirect({
        headers: { 'x-forwarded-proto': 'https' },
        urlParams: {}
      });
      utility2.assert(!data, data);
      onEventError();
    },

    securityFromLocalhost: function (request) {
      /*
        this function checks if the request originated from localhost
      */
      return (/^(?::1|127.0.0.1|localhost)\b/).test(request.headers.host);
    },

    serverListen: function (onEventListen) {
      /*
        this function makes the server listen on the specified port, if not already listening,
        and then calls the onEventListen callback
      */
      /* if already listening, then simply call onEventListen */
      if (state.serverListened || !state.serverPort) {
        onEventListen();
        return;
      }
      /* create a random port from 32768 to 65535, inclusive, as needed */
      state.serverPort = Number(state.serverPort === 'random'
        ? utility2.serverPortRandom()
        : state.serverPort);
      /* assert valid state.serverPort */
      utility2.assert(state.serverPort, 'invalid state.serverPort ' + state.serverPort);
      /* set state.server with a new http server as needed */
      state.server = state.server || required.http.createServer(function (request, response) {
        utility2.middlewareApplication(request, response, function (error) {
          utility2.serverRespond(request, response, error ? 500 : 404, { error: error });
        });
      });
      /* listen on specified port */
      utility2.jsonLog('serverListen - listening on port ' + state.serverPort);
      state.server.listen(state.serverPort, function () {
        state.localhost = state.localhost || 'http://localhost:' + state.serverPort;
        state.serverListened = true;
        /* call onEventListen */
        onEventListen();
      });
    },

    _serverListen_default_test: function (onEventError) {
      /*
        this function tests serverListen's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: { server: { listen: utility2.callArg1 }, serverPort: 1 } }]
      ], function (onEventError) {
        /* test default handling behavior */
        utility2.serverListen(utility2.nop);
        /* test re-listen handling behavior */
        utility2.serverListen(utility2.nop);
        onEventError();
      });
    },

    serverPortRandom: function () {
      /*
        this function generates a random port number from 32768-65535
      */
      /*jslint bitwise: true*/
      return (Math.random() * 0xffff) | 0x8000;
    },

    serverRespond: function (request, response, statusCode, options) {
      /*
        this function handles an appropriate response for a given status code
      */
      statusCode = Number(statusCode);
      options.data = options.data
        || statusCode + ' ' + (required.http.STATUS_CODES[statusCode] || 'Unknown Status Code');
      switch (statusCode) {
      /* 3xx redirect */
      case 301:
      case 302:
      case 303:
      case 304:
      case 305:
      case 306:
      case 307:
      case 308:
      case 309:
        utility2.serverResponseWriteHead(response, null, { location: options.data });
        break;
      /* 401 unauthorized */
      case 401:
        utility2.serverResponseWriteHead(response, null, {
          'www-authenticate': 'Basic realm="Authorization Required"'
        });
        break;
      /* 500 internal server error */
      case 500:
        utility2.onEventErrorDefault(options.error);
        options.contentType = options.contentType || 'text/plain';
        options.data = utility2.errorStack(options.error);
        break;
      }
      utility2.serverResponseWriteHead(response, statusCode, {
        'content-type': options.contentType
          || utility2.mimeLookup(request.urlPathNormalized)
          || 'text/plain'
      });
      utility2.assert(
        typeof options.data === 'string' || Buffer.isBuffer(options.data),
        typeof options.data
      );
      response.end(options.data);
    },

    _serverRespond_default_test: function (onEventError) {
      /*
        this function tests serverRespond's default handling behavior
      */
      var data, response;
      response = { end: function (_) {
        data = _;
      }, headersSent: true };
      /* test unknown status code handling behavior */
      utility2.serverRespond({}, response, 'unknown', {});
      utility2.assert(data === 'NaN Unknown Status Code', data);
      onEventError();
    },

    serverRespondFile: function (response, file, next) {
      /*
        this function serves static files
      */
      utility2.serverResponseWriteHead(response, null, {
        'content-type': utility2.mimeLookup(file) || 'application/octet-stream'
      });
      required.fs.createReadStream(file).on('error', function () {
        /* security - don't leak filesystem info on error */
        next();
      }).pipe(response);
    },

    serverResponseWriteHead: function (response, statusCode, headers) {
      /*
        this function sets the headers of the response object
      */
      if (!response.headersSent) {
        response.statusCode = statusCode || response.statusCode;
        Object.keys(headers).forEach(function (key) {
          response.setHeader(key, headers[key]);
        });
      }
    },

    _serverResponseWriteHead_headersSent_test: function (onEventError) {
      /*
        this function tests serverResponseWriteHead's headersSent handling behavior
      */
      utility2.serverResponseWriteHead({ headersSent: true });
      onEventError();
    }

  };
  local._init();
}());



(function moduleServerShared() {
  /*
    this shared module exports the server api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleServerShared',

    _init: function () {
      utility2.initModule(module, local);
    },

    '_router1LoggingDict_/_ignoreLogging_test': function (onEventError) {
      /*
        this function tests router1LoggingDict_/'s ignore logging handling behavior
      */
      utility2.ajax({ url: '/favicon.ico' }, function () {
        onEventError();
      });
    },

    '_router4ProxyDict_/proxy.ajax_default_test': function (onEventError) {
      /*
        this function tests router4ProxyDict_/proxy.ajax's default handling behavior
      */
      utility2.ajax({
        url: '/proxy/proxy.ajax//test/test.json'
      }, function (error, data) {
        utility2.tryCatch(function () {
          utility2.assert(!error, error);
          utility2.assert(data === '"hello test"', data);
          onEventError();
        }, onEventError);
      });
    },

    '_router5MainDict_/_default_test': function (onEventError) {
      /*
        this function tests _router5MainDict_/'s default handling behavior
      */
      utility2.ajax({ url: '/'}, onEventError);
    },

    '_router5MainDict_/test/test.echo_default_test': function (onEventError) {
      /*
        this function tests router5MainDict_/test/test.echo's default handling behavior
      */
      utility2.ajax({
        data: '_ajax_default_test',
        url: '/test/test.echo'
      }, function (error, data) {
        utility2.tryCatch(function () {
          utility2.assert(!error, error);
          utility2.assert((/\n\n_ajax_default_test$/).test(data), data);
          onEventError();
        }, onEventError);
      });
    },

    '_router5MainDict_/test/test.error_default_test': function (onEventError) {
      /*
        this function tests router5MainDict_/test/test.error's default handling behavior
      */
      utility2.ajax({ url: '/test/test.error' }, function (error, data) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error, error);
          onEventError();
        }, onEventError);
      });
    },

    '_router5MainDict_/test/test.timeout_default_test': function (onEventError) {
      /*
        this function tests router5MainDict_/test/test.timeout's default handling behavior
      */
      utility2.ajax({ url: '/test/test.timeout?timeout=1' }, function (error) {
        utility2.assert(!error, error);
        onEventError();
      });
    },

    '_router5MainDict_/test/test.watch_nullCase_test': function (onEventError) {
      /*
        this function tests _router5MainDict_/test/test.watch's null case handling behavior
      */
      utility2.ajax({ url: '/test/test.watch' }, function (error) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error, error);
          onEventError();
        }, onEventError);
      });
    },

    '_router6FileDict_/public_error_test': function (onEventError) {
      /*
        this function tests router6FileDict_/public's error handling behavior
      */
      utility2.ajax({ url: '/public/' + utility2.uuid4() }, function (error) {
        utility2.assert(error instanceof Error, error);
        onEventError();
      });
    }

  };
  local._init();
}());

