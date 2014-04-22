#!/usr/bin/env node
/*jslint browser: true, indent: 2, maxerr: 8, node: true, nomen: true, regexp: true, todo: true, unparam: true*/
/*global global, required, state, utility2, $*/



(function module1InitShared() {
  /*
    this shared module inits utility2
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.module1InitShared',

    _init: function () {
      /* export global object */
      if (typeof window === 'object') {
        window.global = window.global || window;
      }
      /* global required object */
      global.required = global.required || {};
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
        state.modeExtra = true;
        state.modeInit = 2;
        /* set browser test mode */
        state.modeTest = (/\bmodeTest=\w/).test(global.location && global.location.hash);
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
          state.timeoutDefault
        );
      });
    },

    __init_browser_test: function (onEventError) {
      /*
        this function tests _init's browser handling behavior
      */
      utility2.testMock(onEventError, [
        [global, state.modeBrowser ? { required: null, state: {} } : {
          document: { body: {} },
          location: {},
          jQuery: {},
          /* code coverage for global.process */
          process: null,
          /* code coverage for global.required */
          required: null,
          state: {},
          window: {}
        }],
        /* code coverage for console.log2 */
        [console, { log2: null }],
        [utility2, { initModule: utility2.nop }]
      ], function (onEventError) {
        local._init();
        onEventError();
      });
    },

    _initOnce: function () {
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
    },

    __initOnce_default_test: function (onEventError) {
      /*
        this function tests _initOnce's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { jQuery: utility2.nop, state: {} }],
        [utility2, { untilReadyUtility2: utility2.nop }]
      ], function (onEventError) {
        /* test browser handling behavior */
        state.modeBrowser = true;
        state.modeNodejs = false;
        local._initOnce();
        /* test nodejs handling behavior */
        state.modeBrowser = false;
        state.modeNodejs = true;
        local._initOnce();
        onEventError();
      });
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
        utility2.assert(false);
      }, function (error) {
        utility2.assert(error instanceof Error, error);
      });
      /* test failed assertion with message */
      utility2.tryCatch(function () {
        utility2.assert(false, '_assert_default_test');
      }, function (error) {
        utility2.assert(error instanceof Error, error);
      });
      /* test failed assertion with error message */
      utility2.tryCatch(function () {
        utility2.assert(false, new Error('_assert_default_test'));
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
        testReport: { failures: 0, passed: 0 },
        testSuiteFailList: [],
        testSuiteList: [],
        testSuiteRemaining: 0,
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
          utility2.assert(!error);
          utility2.assert(data === '_evalOnEventError_default_test', data);
        }
      );
      /* test error handling behavior */
      utility2.evalOnEventError(
        new Error('_evalOnEventError_default_test'),
        null,
        function (error) {
          utility2.assert(error instanceof Error, error);
        }
      );
      /* test syntax error handling behavior */
      utility2.evalOnEventError(
        '_evalOnEventError_default_test.js',
        '_evalOnEventError_default_test',
        function (error) {
          utility2.assert(error instanceof Error, error);
        }
      );
      /* test browser handling behavior */
      utility2.testMock(onEventError, [
        [global, { state: { modeBrowser: true } }]
      ], function (onEventError) {
        utility2.evalOnEventError(
          '_evalOnEventError_default_test.js',
          '"_evalOnEventError_default_test"',
          function (error, data) {
            utility2.assert(!error);
            utility2.assert(data === '_evalOnEventError_default_test', data);
          }
        );
      });
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
      utility2.assert(local2._name, local2._name);
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
            actionList: ['lint', 'evalOnWatch', 'createContentBrowser'],
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
              /* if state.modeExtra, then ensure state.serverListened or not state.modeNodejs */
              && (!state.modeExtra || !state.modeNodejs || state.serverListened)
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
        state.modeExtra = true;
        state.modeTest = true;
        state.serverListened = true;
        local2 = {
          /* test class handling behavior */
          _Aa: utility2.nop,
          /* test class prototype handling behavior */
          _Aa_prototype_bb: utility2.nop,
          /* test dict handling behavior */
          _aaDict_bb: true,
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
      var circular;
      /* test undefined handling behavior */
      console.assert(utility2.jsonStringifyCircular(undefined) === undefined);
      /* test circular handling behavior */
      circular = {};
      circular.circular = circular;
      circular = {'aa': [1, circular, 2], 'bb': utility2.nop };
      console.assert(utility2.jsonStringifyCircular(circular) === '{"aa":[1,{},2]}');
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
      /* test undefined handling behavior */
      utility2.assert(utility2.jsonStringifyOrdered(undefined) === undefined);
      /* test function handling behavior */
      utility2.assert(utility2.jsonStringifyOrdered(utility2.nop) === undefined);
      /* test default handling behavior */
      console.assert(utility2.jsonStringifyOrdered({
        ee: {},
        dd: [undefined],
        cc: utility2.nop,
        bb: 2,
        aa: 1
      }, 'ordered') === '{"aa":1,"bb":2,"dd":[null],"ee":{}}');
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
        if (required.uglify_js) {
          ast = required.uglify_js.parse(script, { filename: file });
          /* figure out scope */
          ast.figure_out_scope();
          /* compress */
          ast.transform(new required.uglify_js.Compressor());
          /* mangle */
          ast.figure_out_scope();
          ast.compute_char_frequency();
          ast.mangle_names();
          /* generate output */
          result = new required.uglify_js.OutputStream({ ascii_only: true });
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
        utility2.onEventErrorDefault(error);
        error.stack = '';
        utility2.onEventErrorDefault(error);
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
      error = new Error('onEventTimeout - timeout error - ' + timeout + 'ms - ' + message);
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
      utility2.assert(utility2.stringToEmptyLine('aa\nbb1\nbb2\ncc\n', (/^bb.*$/gm))
        === 'aa\n\n\ncc\n');
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
      utility2.assert(utility2.templateFormat('{{aa}}', { aa: 1 }) === '{{aa}}');
      utility2.assert(utility2.templateFormat('{{aa}}', { aa: 'bb' }) === 'bb');
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
      utility2.jsonLog('\n\n\n\ntestReport');
      /* sort list of test suites by name */
      state.testSuiteList.sort(function (arg1, arg2) {
        arg1 = arg1.name;
        arg2 = arg2.name;
        return arg1 <= arg2 ? -1 : 1;
      }).forEach(function (testSuite) {
        state.testReport.failures += testSuite.failures;
        state.testReport.passed += testSuite.passed;
        utility2.jsonLog((testSuite.failures ? required.colors.inverse : utility2.echo)(
          ('        ' + (testSuite.time)).slice(-8) + ' ms | '
            + testSuite.failures + ' failed | '
            + (Object.keys(testSuite.testCaseList).length - testSuite.failures)
            + ' passed in ' + testSuite.name
        ));
      });
      utility2.jsonLog(state.testSuiteFailList.sort().join('\n'));
      utility2.jsonLog();
      self.reportBrowser();
      self.reportNodejs();
      state.testSuiteFailList.length = 0;
      state.testSuiteList.length = 0;
    },

    __Test_prototype_report_failure_test: function (onEventError) {
      /*
        this function tests _Test_prototype_report's failure handling behavior
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
            { failures: 1, name: 'bb', passed: 1, testCaseList: {} },
            { failures: 1, name: 'aa', passed: 1, testCaseList: {} }
          ]
        } }).report();
        onEventError();
      });
    },

    _Test_prototype_reportBrowser: function () {
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
      /*jslint stupid: true*/
      var self, state;
      self = this;
      state = self.global.state;
      if (state.modeNodejs && state.modeNpmTest) {
        /* exit */
        utility2.readyUtility2Exit.remaining += 1;
        setTimeout(utility2.readyUtility2Exit);
      }
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
        name: state.javascriptPlatform + (state.javascriptPlatform === 'browser'
          ? '.' + self.global.navigator.userAgent
          : '') + '.' + self.local2._name,
        passed: 0,
        testCaseList: {},
        tests: testList.length,
        time: 0
      };
      /* add test suite to global list of test suites */
      state.testSuiteList.push(testSuite);
      state.testSuiteRemaining += 1;
      /* this callback runs when all tests are finished */
      onEventReady = utility2.untilReady(function () {
        testSuite.passed = testSuite.tests - testSuite.failures;
        state.testSuiteRemaining -= 1;
        if (state.testSuiteRemaining === 0) {
          /* assert state.onEventErrorDefaultIgnoreList is empty */
          utility2.assert(state.onEventErrorDefaultIgnoreList.length === 0);
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

    __Test_prototype_run_failure_test: function (onEventError) {
      /*
        this function tests _Test_prototype_run's failure handling behavior
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
        _name: 'utility2.__Test_prototype_run_failure_test',
        _test: function (onEventError) {
          /* test failure handling behavior */
          onEventError(new Error('__Test_prototype_run_failure_test'));
          /* test multiple callback, failure handling behavior */
          onEventError();
        }
      });
      state.onEventErrorDefaultIgnoreList.push('__Test_prototype_run_failure_test');
      state.onEventErrorDefaultIgnoreList.push(
        'testModule - browser.unknown.utility2.__Test_prototype_run_failure_test._test\'s'
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
        this function creates a test object from the given testName and runs it asynchronously
      */
      var errorMessage, onEventError2, remaining, self, state, test, timeout;
      self = this;
      state = self.global.state;
      /* handle test result */
      onEventError2 = function (error) {
        /* clear timeout for test */
        clearTimeout(timeout);
        /* assert test callback was not called multiple times */
        remaining -= 1;
        if (remaining < 0) {
          error = error || new Error(
            'testModule - ' + test.name + "'s callback called multiple times"
          );
        }
        /* handle test failure */
        if (error) {
          errorMessage = '\ntestModule - test failed - ' + test.name;
          self.global.console.error(required.colors.inverse(errorMessage));
          utility2.onEventErrorDefault(error);
          errorMessage += state.debugMessage;
          test.failure = utility2.errorStack(error);
          state.testSuiteFailList.push(errorMessage);
          if (remaining < 0) {
            return;
          }
          testSuite.failures += 1;
        } else {
          utility2.jsonLog('testModule - test passed - ' + test.name);
        }
        /* record time it took for test to run */
        test.time = Date.now() - test.time;
        testSuite.time = Math.max(test.time, testSuite.time);
        /* asynchronously finish test */
        self.global.setTimeout.call(global, onEventReady);
        /* optional qunit hook for saucelabs testing */
        if (self.global.QUnit) {
          self.global.QUnit.test(test.name, function () {
            self.global.QUnit.ok(!error, utility2.errorStack(error));
          });
        }
      };
      remaining = 1;
      /* create test */
      test = testSuite.testCaseList[testName] = {
        name: testSuite.name + '.' + testName,
        time: Date.now()
      };
      /* set timeout for test */
      timeout = utility2.onEventTimeout(onEventError2, state.timeoutDefault, 'testModule');
      utility2.tryCatch(function () {
        /* run test */
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
          utility2.assert(error instanceof Error);
          utility2.assert(state.aa === 1);
          onEventError();
        }, [
          [state, { aa: 2 }]
        ], function () {
          throw new Error('_testMock_error_test');
        });
      });
    },

    _testSetTimeout: setTimeout,

    _throwError: function () {
      /*
        this function always throws an error
      */
      throw new Error('_throwError');
    },

    _throwError_default_test: function (onEventError) {
      /*
        this function tests throwError's default handling behavior
      */
      utility2.tryCatch(local._throwError, function (error) {
        utility2.assert(error instanceof Error);
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
      onEventReady(new Error('_untilReady_error_test'));
      /* test multiple callback handling behavior */
      onEventReady();
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



(function module2CliNodejs() {
  /*
    this nodejs module inits the cli
  */
  'use strict';
  /*jslint stupid: true*/
  var local;
  local = {

    _name: 'utility2.module2CliNodejs',

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
      /* command-line init */
      local._initArgv();
      local._initNpmTest();
      local._initCoverage(global);
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
        this function inits process.argv and integrates it into the state dict
      */
      var key2, tmp, value;
      /* load package.json file */
      state.packageJson = state.packageJson || {};
      utility2.tryCatch(function () {
        state.packageJson = JSON.parse(required.fs.readFileSync(process.cwd()
          + '/package.json'));
      }, utility2.nop);
      /* init argv */
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
      state.exportEnv = tmp = {};
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
            on: utility2.callArg1
          },
          state: {}
        }]
      ], function (onEventError) {
        process.argv = ['--cc'];
        local._initArgv();
        utility2.assert(state.aa === false);
        utility2.assert(state.bb === 1);
        utility2.assert(state.cc === true);
        process.argv = ['--cc', 'bb'];
        local._initArgv();
        utility2.assert(state.cc === 'bb');
        process.argv = ['--cc', '1'];
        local._initArgv();
        utility2.assert(state.cc === 1);
        process.argv = ['--no-cc'];
        local._initArgv();
        utility2.assert(state.cc === false);
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
          var collector;
          collector = new required.istanbul.Collector();
          collector.add(global.__coverage__);
          /* print text report */
          required.istanbul.Report.create('text').writeReport(collector);
          /* create lcov and html report */
          required.istanbul.Report.create('lcov', { dir: state.tmpdir })
            .writeReport(collector, true);
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
          state: { modeCoverage: null }
        }],
        [required, { istanbul: null }],
        [utility2, { require: null }]
      ], function (onEventError) {
        /* mock require('istanbul') */
        utility2.require = function () {
          return {
            Collector: function () {
              this.add = utility2.nop;
            },
            hook: { hookRequire: function (callback1, callback2) {
              utility2.assert(callback1('__initCoverage_default_test.js') === true);
              utility2.assert(callback1('_.js') === false);
              utility2.assert(callback2('"__initCoverage_default_test"')
                === '"__initCoverage_default_test"');
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
        /* set test mode */
        state.modeTest = true;
        /* set tmpdir */
        state.tmpdir = state.tmpdir || 'tmp';
        /* exit with non-zero code if tests failed */
        process.on('exit', function () {
          if (state.testReport && state.testReport.failures) {
            process.exit(1);
          }
        });
        /* perform fast npm test with no web tests */
        if (process.env.npm_config_fast) {
          state.modeLocal = true;
          state.timeoutDefault = 8000;
        }
      }
    },

    __initNpmTest_default_test: function (onEventError) {
      /*
        this function tests _initNpmTest's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, {
          process: {
            env: { npm_config_fast: '' },
            exit: utility2.nop,
            on: utility2.callArg1
          },
          state: { testReport: { failures: null } }
        }]
      ], function (onEventError) {
        /* test null case handling behavior */
        state.modeNpmTest = null;
        local._initNpmTest();
        /* test default handling behavior */
        state.modeNpmTest = true;
        local._initNpmTest();
        /* test fast handling behavior */
        process.env.npm_config_fast = 'true';
        local._initNpmTest();
        /* test failure handling behavior */
        state.testReport.failures = true;
        local._initNpmTest();
        onEventError();
      });
    },

    instrumentCode: function (file, code) {
      /*
        this function instruments the code
      */
      if (state.modeCoverage && state.modeCoverage.test(file)) {
        utility2.jsonLog('instrumentCode ' + file);
        if (!state.modeExtra && state.modeNpmTest) {
          code = code.replace((/\n\(function module5Utility2ExtraShared\(\) \{\n[\S\s]*/), '');
        }
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
          modeExtra: null,
          modeNpmTest: null
        } }]
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
      utility2.assert(local._stringToCamelCase('') === '');
      utility2.assert(local._stringToCamelCase('aa-bb-cc') === 'aaBbCc');
      onEventError();
    }

  };
  local._init();
}());



(function module3InitNodejs() {
  /*
    this nodejs module inits utility2
  */
  'use strict';
  /*jslint stupid: true*/
  var local;
  local = {

    _name: 'utility2.module3InitNodejs',

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
      /* utility2 ready for utility2.js2 */
      utility2.readyUtility2.remaining += 1;
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
      local._initTmpdir();
      utility2.untilReadyUtility2(function () {
        local._initCli();
      });
    },

    _initCli: function () {
      switch (state.modeCli) {
      /* export env */
      case 'exportEnv':
        /* save state.tmpdir to env */
        state.exportEnv.UTILITY2_TMPDIR = state.tmpdir;
        console.log(Object.keys(state.exportEnv).sort().map(function (key) {
          return 'export ' + key + '=' + JSON.stringify(state.exportEnv[key]);
        }).join(' && '));
        break;
      case 'utility2NpmInstall':
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
        break;
      }
    },

    __initCli_exportEnv_test: function (onEventError) {
      /*
        this function tests _initCli's exportEnv handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: { exportEnv: {}, modeCli: 'exportEnv' } }]
      ], function (onEventError) {
        var message;
        console.log = function (_) {
          message = _;
        };
        local._initCli();
        utility2.assert((/export UTILITY2_TMPDIR=\w+/).test(message), message);
        onEventError();
      });
    },

    __initCli_utility2NpmInstall_test: function (onEventError) {
      /*
        this function tests _initCli's utility2NpmInstall handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { required: { fs: { writeFileSync: utility2.nop } } }],
        [state, { modeCli: 'utility2NpmInstall' }]
      ], function (onEventError) {
        local._initCli();
        onEventError();
      });
    },

    _initTmpdir: function () {
      /* init state.tmpdir */
      state.tmpdir = required.path.resolve(state.tmpdir
        || required.os.tmpdir() + '/utility2.' + encodeURIComponent(process.cwd()));
      if (state.modeExtra || state.modeNpmTest) {
        utility2.assert(state.tmpdir, 'invalid state.tmpdir ' + state.tmpdir);
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
      }
    },

    __initTmpdir_default_test: function (onEventError) {
      /*
        this function tests _initTmpdir's default handling behavior
      */
      utility2.testMock(onEventError, [
        [required.fs, { existsSync: utility2.nop }]
      ], function (onEventError) {
        /* populate cache dir with a file to remove */
        utility2.fsMkdirpSync(state.tmpdir + '/cache/' + utility2.uuid4());
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
        default:
          onEventError(error);
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
          required: { fs: { readdir: function (dir, onEventError) {
            onEventError(new Error('__fsCacheCleanup_error_test'));
          }, unlink: utility2.callArg1 } }
        }]
      ], function (onEventError) {
        local._fsCacheCleanup(function (error) {
          utility2.assert(error instanceof Error);
          onEventError();
        });
      });
    },

    fsMkdirpSync: function (dir) {
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
      dir = state.tmpdir + '/cache/' + utility2.uuid4() + '/foo';
      utility2.fsMkdirpSync(dir);
      /* mkdir a second time to trigger EEXIST case */
      utility2.fsMkdirpSync(dir);
      required.fs.exists(dir, function (exists) {
        utility2.assert(exists);
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
        utility2.assert(error instanceof Error);
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
          if (!error) {
            mode = -2;
            onEventError2();
            return;
          }
          required.fs.readdir(dir, onEventError2);
          break;
        case 3:
          onEventReady = utility2.untilReady(onEventError2);
          if (data) {
            data.forEach(function (file) {
              onEventReady.remaining += 1;
              local._fsRmr(dir + '/' + file, onEventReady);
            });
          }
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

    fsWatch: function (options, onEventError) {
      /*
        this function watches a file and runs specified actions if it is modified
        usage example:
        utility2.fsWatch({
          actionList: ['lint', 'evalOnWatch'],
          file: 'foo.js'
        }, utility2.onEventErrorDefault);
      */
      var onEventChange;
      onEventChange = function (stat2, stat1) {
        /* execute following code only if modified timestamp has changed */
        if (stat2.mtime >= stat1.mtime) {
          required.fs.readFile(options.file, 'utf8', function (error, content) {
            if (error) {
              onEventError(error);
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
            /* set watch mode */
            options.modeWatch = true;
            onEventError();
          });
        }
      };
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
        utility2.assert(error instanceof Error);
        utility2.fsWatchUnwatch(file);
        onEventError();
      });
    },

    _fsWatch_testWatch_test: function (onEventError) {
      /*
        this function tests fsWatch's testWatch handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: { testWatchList: [ { write: utility2.nop }] } }],
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

    fsWatchActionDict_createContentBrowser: function (options) {
      /*
        this function caches the file content for browser use,
        stripping of nodejs code
      */
      options.contentBrowser = utility2.stringToEmptyLine(
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
          utility2.assert(state[file]);
          delete state[file];
          utility2.fsWatchUnwatch(file);
          onEventError2();
          break;
        default:
          onEventError(error);
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

    fsWatchUnwatch: function (file) {
      /*
        this function unwatches the file
      */
      required.fs.unwatchFile(file);
      delete state.fsWatchDict[file];
    },

    processKill: function (pid) {
      /*
        this function silently attempts to kill the process with the given pid
      */
      /* validate pid is a positive, finite number */
      pid = Number(pid);
      if (0 < pid && pid < Infinity) {
        utility2.tryCatch(function () {
          process.kill(pid);
        }, utility2.nop);
      }
    },

    _processKill_default_test: function (onEventError) {
      /*
        this function tests processKill's default handling behavior
      */
      utility2.testMock(onEventError, [
        [process, { kill: utility2.nop }]
      ], function (onEventError) {
        utility2.processKill('1');
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
            utility2.assert(error instanceof Error);
            onEventError();
          });
        };
        utility2.readyUtility2Exit.remaining += 1;
        utility2.readyUtility2Exit(new Error(' _readyUtility2Exit_error_test'));
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
      /* assert child process of utility2 exited within 2000 ms */
      setTimeout(function () {
        utility2.tryCatch(function () {
          utility2.assert(exitCode === 0, 'exitCode ' + exitCode);
          onEventError();
        }, onEventError);
      }, 2000);
    }

  };
  local._init();
}());



(function module4ReplNodejs() {
  /*
    this nodejs module starts an interactive repl debugger
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.module4ReplNodejs',

    _init: function () {
      if (state.modeNodejs) {
        utility2.initModule(module, local);
      }
    },

    _initOnce: function () {
      /* start interactive repl debugger */
      if (state.modeRepl && !state.repl) {
        state.repl = required.repl.start({
          eval: function (script, context, file, onEventError) {
            utility2.evalOnEventError('<repl>', utility2.replParse(script), onEventError);
          },
          useGlobal: true
        });
      }
    },

    replParse: function (script) {
      /*
        this function parses repl stdin
      */
      /* optimization - cached callback */
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
        this function gives a quick and dirty way to execute shell scripts
      */
      var child;
      options.stdio = options.stdio || ['ignore', 1, 2];
      child = required.child_process.spawn(
        options.argv ? options.argv[0] : '/bin/bash',
        options.argv ? options.argv.slice(1) : ['-c', options.script],
        options
      );
      /* set timeout for shell */
      utility2.unref(required.child_process.spawn('/bin/bash', ['-c', 'sleep '
        + ((options.timeout || state.timeoutDefault) / 1000) + '; kill ' + child.pid
        + ' 2>/dev/null'], { stdio: 'ignore' }));
      /* debug shell exit */
      child.on('exit', function (exitcode) {
        utility2.jsonLog('shell - process ' + child.pid + ' exited with code ' + exitcode);
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
    }


  };
  local._init();
}());



(function module5Utility2ExtraShared() {
  /*
    this shared module exports extra utilities
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.module5Utility2ExtraShared',

    _init: function () {
      if (state.modeExtra) {
        utility2.initModule(module, local);
      }
    },

    _initOnce: function () {
      /* exports */
      global.atob = global.atob || function (text) {
        return new Buffer(text, 'base64').toString();
      };
      global.btoa = global.btoa || function (text) {
        return new Buffer(text).toString('base64');
      };
      if (state.modeBrowser) {
        local._initBrowser();
      }
    },

    _initBrowser: function () {
      /*
        this function runs browser-side initializations
      */
      var params;
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
      state.testCallbackId = utility2.urlParamsGet(location.search).testCallbackId;
      params = utility2.urlParamsGet(location.hash, '#');
      /* browser test mode - watch */
      if (params.testWatch) {
        /* increment testWatch counter */
        location.hash = utility2.urlParamsMerge(location.hash, {
          testWatch: (Number(params.testWatch) + 1).toString()
        }, '#');
        /* watch server for changes and reload via server-sent events */
        new global.EventSource('/test/test.watch').addEventListener('message', function () {
          location.reload();
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

    clearCallSetInterval: function (key, callback, interval, timeout) {
      /*
        this function
        1. clear interval key
        2. run callback
        3. set interval key to callback
        usage example:
        utility2.clearCallSetInterval('setIntervalFoo', function (timeout) {
          if (timeout) {
            console.log('timeout error after 4000 ms');
            console.error(timeout.stack);
            utility2.clearCallSetInterval('setIntervalFoo', 'clear');
            return;
          }
          console.log('1000 ms interval');
        }, 1000, 4000);
      */
      var dict;
      dict = state.clearCallSetIntervalDict = state.clearCallSetIntervalDict || {};
      dict[key] = dict[key] || {};
      /* set timeout for clearCallSetInterval */
      if (timeout) {
        timeout = utility2.onEventTimeout(function (error) {
          utility2.clearCallSetInterval(key, 'clear');
          callback(error);
        }, timeout, key);
      }
      /* 1. clear interval key */
      clearInterval(dict[key].interval);
      if (callback === 'clear') {
        /* clear timeout for clearCallSetInterval */
        clearTimeout(dict[key].timeout);
        delete dict[key];
        return;
      }
      /* 2. call callback */
      callback();
      /* 3. set interval key to callback */
      dict[key] = {
        interval: setInterval(callback, interval),
        timeout: timeout
      };
    },

    _clearCallSetInterval_timeout_test: function (onEventError) {
      /*
        this function tests clearCallSetInterval's timeout handling behavior
      */
      var onEventReady;
      onEventReady = utility2.untilReady(onEventError);
      [100, 200, 300].forEach(function (data) {
        onEventReady.remaining += 1;
        utility2.clearCallSetInterval(utility2.uuid4(), function (timeout) {
          if (timeout) {
            utility2.assert(timeout instanceof Error);
            utility2.assert(timeout.code === 'ETIMEDOUT');
            onEventReady();
          }
        }, 200, data);
      });
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
      utility2.assert(utility2.mimeLookup('foo.css') === 'text/css');
      utility2.assert(utility2.mimeLookup('foo.html') === 'text/html');
      utility2.assert(utility2.mimeLookup('foo.js') === 'application/javascript');
      utility2.assert(utility2.mimeLookup('foo.json') === 'application/json');
      utility2.assert(utility2.mimeLookup('foo.txt') === 'text/plain');
      utility2.assert(utility2.mimeLookup('foo') === undefined);
      onEventError();
    },

    urlDecodeOrError: function (text) {
      /*
        this function returns an error if the text cannot be decoded
      */
      try {
        return decodeURIComponent(text || '');
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
      utility2.assert(utility2.urlParamsGet('/aa?bb=cc%2B#dd=ee%2B', '?').bb === 'cc+');
      utility2.assert(utility2.urlParamsGet('/aa?bb=cc%2B#dd=ee%2B', '?').dd === undefined);
      utility2.assert(utility2.urlParamsGet('/aa?bb=cc%2B#dd=ee%2B', '#').bb === undefined);
      utility2.assert(utility2.urlParamsGet('/aa?bb=cc%2B#dd=ee%2B', '#').dd === 'ee+');
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
      utility2.assert(utility2.urlParamsMerge('/aa#dd=ee%2B', { bb: 'cc+' }, '?')
        === '/aa?bb=cc%2B#dd=ee%2B');
      utility2.assert(utility2.urlParamsMerge('/aa?bb=cc%2B', { dd: 'ee+' }, '#')
        === '/aa?bb=cc%2B#dd=ee%2B');
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
      utility2.assert(utility2.urlParamsRemove('/aa?bb=cc%2B#dd=ee%2B', ['bb'], '?')
        === '/aa?#dd=ee%2B');
      utility2.assert(utility2.urlParamsRemove('/aa?bb=cc%2B#dd=ee%2B', ['dd'], '#')
        === '/aa?bb=cc%2B#');
      onEventError();
    }

  };
  local._init();
}());



(function moduleAdminBrowser() {
  /*
    this browser module exports the admin api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleAdminBrowser',

    _init: function () {
      if (state.modeBrowser) {
        utility2.initModule(module, local);
      }
    },

    adminEval: function (script, onEventError) {
      /*
        this function remotely evals the javascript code on server
      */
      utility2.ajax({ data: script, resultType: 'json', url: "/admin/admin.eval" }, onEventError);
    },

    _adminEval_default_test: function (onEventError) {
      /*
        this function tests adminEval's default handling behavior
      */
      utility2.adminEval('"_adminEval_default_test"', function (error, data) {
        utility2.assert(data === '_adminEval_default_test');
        onEventError();
      });
    },

    adminShell: function (script, onEventError) {
      /*
        this function remotely executes shell commands on server
      */
      utility2.ajax({ data: script, url: "/admin/admin.shell" }, onEventError);
    },

    _adminShell_default_test: function (onEventError) {
      /*
        this function tests adminShell's default handling behavior
      */
      utility2.adminShell(':', onEventError);
    }

  };
  local._init();
}());



(function moduleAdminNodejs() {
  /*
    this nodejs module exports the admin api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleAdminNodejs',

    _init: function () {
      if (state.modeExtra && state.modeNodejs) {
        utility2.initModule(module, local);
      }
    },

    'router2SecurityDict_/admin': function (request, response, next) {
      /*
        this function handles admin security
      */
      /* security - https redirect */
      if (utility2.securityHttpsRedirect(request, response)) {
        return;
      }
      /* security - basic auth passed */
      if (utility2.securityBasicAuthValidate(request)) {
        next();
        return;
      }
      /* security - basic auth failed */
      utility2.serverRespond(request, response, 303, {
        data: '/signin?redirect=' + encodeURIComponent(request.url)
      });
    },

    'router5MainDict_/admin/admin.eval': function (request, response, next) {
      /*
        this function evals the javascript code
      */
      var mode, onEventError2;
      mode = 0;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* read script from request stream */
        case 1:
          utility2.streamReadAll(request, onEventError2);
          break;
        /* eval script */
        case 2:
          data = data.toString();
          /* log script to be eval'd */
          utility2.jsonLog('router5MainDict_/admin/admin.eval\n' + data);
          utility2.evalOnEventError('router5MainDict_/admin/admin.eval', data, onEventError2);
          break;
        /* respond with eval'd result */
        case 3:
          response.end(utility2.jsonStringifyCircular(data));
          break;
        default:
          next(error);
        }
      };
      onEventError2();
    },

    'router5MainDict_/admin/admin.shell': function (request, response, next) {
      /*
        this function runs shell scripts
      */
      var child, mode, onEventData, onEventError2;
      mode = 0;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* read script from request stream */
        case 1:
          utility2.streamReadAll(request, onEventError2);
          break;
        /* eval script */
        case 2:
          data = data.toString();
          /* log script to be eval'd */
          utility2.jsonLog('router5MainDict_/admin/admin.shell\n' + data);
          onEventData = function (chunk) {
            process.stdout.write(chunk);
            response.write(chunk);
          };
          child = utility2.shell({ script: data, stdio: ['ignore', 'pipe', 'pipe'] })
            .on('close', function (exitCode) {
              response.end('\nexit code: ' + exitCode);
            })
            .on('error', next);
          child.stderr.on('data', onEventData);
          child.stdout.on('data', onEventData);
          break;
        default:
          next(error);
        }
      };
      onEventError2();
    },

    'router6FileDict_/admin/admin.html': function (request, response) {
      /*
        this function serves the file admin.html
      */
      utility2.serverRespond(request, response, 200, {
        data: utility2.templateFormat(state.fsWatchDict['/admin/admin.html'].content, {
          state: JSON.stringify({
            testModuleDict: { utility2: true },
            timeoutDefault: state.timeoutDefault
          })
        })
      });
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
      /* ajax xss via proxy */
      if ((/^https*:/).test(options.url)) {
        options.url = '/proxy/proxy.ajax/' + options.url;
      }
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
      onEventEvent = function (event, __) {
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
          /* error message */
          if (__ instanceof Error) {
            error = __;
          } else if (event.type !== 'load' || xhr.status >= 400) {
            error = new Error(event.type);
          } else if (options.resultType === 'json') {
            data = utility2.jsonParseOrError(xhr.responseText);
            if (data instanceof Error) {
              error = data;
            }
          } else {
            data = xhr.responseText;
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
        setTimeout(function () {
          /* hide progress bar */
          if (!local._xhrList.length) {
            local._divXhrProgress.hide();
          }
        }, 1000);
      };
      /* set default options */
      options.contentType = options.contentType || 'application/octet-stream';
      /* init xhr object */
      xhr = new XMLHttpRequest();
      /* set timeout for ajaxBrowser */
      timeout = utility2.onEventTimeout(function (timeout) {
        xhr.abort(timeout);
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
      xhr.open(options.method || 'GET', options.url);
      Object.keys(options.headers || {}).forEach(function (key) {
        xhr.sendRequestHeader(key, options.headers[key]);
      });
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
            utility2.assert(error instanceof Error);
            onEventError();
          });
          local._divXhrProgress.click();
        }
      }, 1000);
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
      if (width) {
        local._divXhrProgressBar.css('width', width);
      }
      if (type) {
        local._divXhrProgressBar[0].className
          = local._divXhrProgressBar[0].className.replace((/progress-bar-\w+/), type); /**/
      }
      if (label) {
        local._divXhrProgressBar.html(label);
      }
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
      if (state.modeExtra && state.modeNodejs) {
        utility2.initModule(module, local);
      }
    },

    _ajaxCache: function (options, onEventError) {
      /*
        this function tries to get the data from local cache instead of running the ajax request
      */
      options.cachePrefix = options.cachePrefix || '';
      if (!options.cache || options.cache === 'miss') {
        options.cache = 'miss';
        return true;
      }
      utility2.dbBlobRead(
        options.cachePrefix + '/cache/ajax/' + options.url0,
        function (error, data) {
          if (error) {
            options.cache = 'miss';
            utility2.ajaxNodejs(options, onEventError);
            return;
          }
          options.cache = 'hit';
          local._ajaxOnEventData(options, onEventError, null, data);
        }
      );
    },

    ajaxNodejs: function (options, onEventError) {
      /*
        this function implements the the ajax function for the javascript platform nodejs
      */
      var onEventError2, request, response, timeout, urlParsed;
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
        onEventError(error, data);
      };
      /* set timeout for ajaxNodejs */
      timeout = utility2.onEventTimeout(onEventError2, state.timeoutDefault, 'ajaxNodejs');
      /* ajax - cached file */
      if (!local._ajaxCache(options, onEventError2)) {
        return;
      }
      /* localhost */
      if (options.url[0] === '/') {
        options.url = state.localhost + options.url;
      }
      /* set default options */
      urlParsed = required.url.parse(String(options.proxy || options.url));
      /* assert valid http / https url */
      if (!(/^https*:$/).test(urlParsed.protocol)) {
        onEventError2(new Error('ajaxNodejs - invalid url ' + (options.proxy || options.url)));
        return;
      }
      /* bug - disable socket pooling, because it causes timeout errors in tls tests */
      options.agent = options.agent || false;
      /* host needed for redirects */
      options.host = urlParsed.host;
      /* hostname needed for http(s).request */
      options.hostname = urlParsed.hostname;
      /* path needed for http(s).request */
      options.path = options.proxy ? options.url : urlParsed.path;
      if (options.params) {
        options.path = utility2.urlParamsMerge(options.path, options.params);
      }
      /* port needed for http(s).request */
      options.port = urlParsed.port;
      /* protocol needed for http(s).request */
      options.protocol = urlParsed.protocol || 'http:';
      /* run ajax request */
      request = (options.protocol === 'https:'
        ? required.https
        : required.http).request(options, function (_) {
        response = _;
        local._ajaxOnEventResponse(options, onEventError2, response);
      }).on('error', onEventError2);
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

    _ajaxNodejs_cache_test: function (onEventError) {
      /*
        this function tests ajaxNodejs's cache handling behavior
      */
      var onEventReady;
      onEventReady = utility2.untilReady(onEventError);
      /* test cache flush handling behavior */
      onEventReady.remaining += 1;
      utility2.ajax({
        cache: 'miss',
        url: '/test/test.json'
      }, function (error, data) {
        utility2.tryCatch(function () {
          utility2.assert(!error);
          data = data.toString();
          utility2.assert(data === '"hello test"', data);
          onEventReady();
        }, onEventReady);
      });
      /* test cache default handling behavior */
      onEventReady.remaining += 1;
      utility2.ajax({
        cache: true,
        url: '/test/test.json'
      }, function (error, data) {
        utility2.tryCatch(function () {
          utility2.assert(!error);
          data = data.toString();
          utility2.assert(data === '"hello test"', data);
          onEventReady();
        }, onEventReady);
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
        utility2.dbBlobWrite(
          options.cachePrefix + '/cache/ajax/' + options.url0,
          data,
          utility2.onEventErrorDefault
        );
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
        this function tests _ajaxOnEventData's resultType handling behavior
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
          utility2.assert(error instanceof Error);
          onEventReady();
        }, onEventReady);
      }, new Error('__ajaxOnEventData_default_test'));
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

    replParseDict_ajax: function (arg1, arg2) {
      /*
        this function runs ajax from the repl interpreter
      */
      utility2.ajax({ modeDebug: true, url: arg2 }, utility2.onEventErrorDefault);
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
      if (state.modeExtra) {
        utility2.initModule(module, local);
      }
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
        onEventError(new Error('ajax - invalid options.url '
          + (options && options.url)));
        return;
      }
      /* assert callback is a function */
      utility2.assert(typeof onEventError === 'function', 'ajax - invalid callback');
      /* set options.url0 if necessary */
      options.url0 = options.url0 || options.url;
      /* set options.method if necessary */
      if (options.data) {
        options.method = options.method || 'POST';
      }
      if (options instanceof Error) {
        onEventError(options);
        return;
      }
      (state.modeNodejs ? utility2.ajaxNodejs : utility2.ajaxBrowser)(options, onEventError);
    },

    _ajax_default_test: function (onEventError) {
      /*
        this function tests ajax's default handling behavior
      */
      utility2.ajax({
        data: '_ajax_default_test',
        modeDebug: true,
        url: '/test/test.echo'
      }, function (error, data) {
        utility2.tryCatch(function () {
          utility2.assert(!error, error);
          utility2.assert((/\n\n_ajax_default_test$/).test(data), data);
          onEventError();
        }, onEventError);
      });
    },

    _ajax_nullCase_test: function (onEventError) {
      /*
        this function tests ajax's null case handling behavior
      */
      utility2.ajax(null, function (error, data) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error, error);
          utility2.assert(data === undefined, data);
          onEventError();
        }, onEventError);
      });
    },

    ajaxErrorDebug: function (error, method, statusCode, url, data) {
      /*
        this function add extra ajax debug info to the error's message and stack
      */
      /* add http method / status / url info to error.message */
      error.message = (method || 'GET') + ' ' + statusCode + ' - ' + url + '\n'
        + data;
      if (error.stack) {
        error.stack = error.message + '\n' + error.stack;
      }
    },

    ajaxMultiUrls2: function (options, onEventReady) {
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
        && options.urlList.length
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
      utility2.ajaxMultiUrls2({ urlList: [
        '/test/test.json',
        (state.localhost || '') + '/test/test.json'
      ] }, function (error, data) {
        utility2.tryCatch(function () {
          utility2.assert(!error);
          utility2.assert(data.data === '"hello test"');
          onEventReady();
        }, onEventReady);
      });
    },

    _ajaxMultiUrls_error_test: function (onEventError) {
      /*
        this function tests ajaxMultiUrls's error handling behavior
      */
      utility2.ajaxMultiUrls2({ urlList: [null] }, function (error) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error);
          onEventError();
        }, onEventError);
      });
    },

    _ajaxMultiUrls_nullCase_test: function (onEventError) {
      /*
        this function tests ajaxMultiUrls's null case handling behavior
      */
      utility2.ajaxMultiUrls2(null, function (error) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error);
          onEventError();
        }, onEventError);
      });
    }

  };
  local._init();
}());



(function moduleCacheShared() {
  /*
    this shared module exports the cache api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleCacheShared',

    _init: function () {
      if (state.modeExtra) {
        utility2.initModule(module, local);
      }
    },

    createCache: function (size) {
      /*
        this Cache class has lru-like cache behavior,
        but with O(1) average case gets and sets
      */
      var self;
      self = new local._Cache();
      utility2.assert(size >= 2, 'size must be greater than or equal to 2');
      self.size = size;
      self.clear();
      return self;
    },

    _Cache: function () {
      /*
        this is the _Cache class
      */
      return;
    },

    _Cache_prototype_clear: function () {
      /*
        this function clears the cache
      */
      this.cache1 = {};
      this.cache2 = {};
      this.remaining = this.size;
    },

    _Cache_prototype_garbageCollect: function () {
      /*
        this function garbage collects an arbitray number of lru items,
        when this.remaining reaches zero
       */
      if (this.remaining <= 0) {
        this.remaining = this.size;
        if (2 * Object.keys(this.cache2).length > this.size) {
          this.cache1 = this.cache2;
          this.cache2 = {};
        }
      }
      this.remaining -= 1;
    },

    _Cache_prototype_getItem: function (key) {
      /*
        this function gets the item from cache with O(1) average case performance
      */
      var value;
      value = this.cache1[key];
      if (value !== undefined) {
        this.cache2[key] = value;
        this.garbageCollect();
        return value;
      }
    },

    _Cache_prototype_removeItem: function (key) {
      /*
        this function removes the item to cache with O(1) average case performance
      */
      this.setItem(key, undefined);
    },

    _Cache_prototype_setItem: function (key, value) {
      /*
        this function sets the item to cache with O(1) average case performance
      */
      this.garbageCollect();
      this.cache2[key] = this.cache1[key] = value;
    },

    __Cache_default_test: function (onEventError) {
      /*
        this function tests _Cache's default handling behavior
      */
      var self;
      /* coverage - don't use the "new" keyword */
      self = utility2.createCache(2);
      utility2.assert(self.remaining === 2);
      self.setItem('aa', 1);
      utility2.assert(self.remaining === 1);
      utility2.assert(Object.keys(self.cache1).length === 1);
      utility2.assert(Object.keys(self.cache2).length === 1);
      self.setItem('bb', 2);
      utility2.assert(self.remaining === 0);
      utility2.assert(Object.keys(self.cache1).length === 2);
      utility2.assert(Object.keys(self.cache2).length === 2);
      self.setItem('cc', 3);
      utility2.assert(self.remaining === 1);
      utility2.assert(Object.keys(self.cache1).length === 3);
      utility2.assert(Object.keys(self.cache2).length === 1);
      utility2.assert(self.getItem('aa'));
      utility2.assert(self.remaining === 0);
      utility2.assert(Object.keys(self.cache1).length === 3);
      utility2.assert(Object.keys(self.cache2).length === 2);
      self.setItem('dd', 4);
      utility2.assert(self.remaining === 1);
      utility2.assert(Object.keys(self.cache1).length === 3);
      utility2.assert(Object.keys(self.cache2).length === 1);
      self.setItem('ee', 5);
      utility2.assert(self.remaining === 0);
      utility2.assert(Object.keys(self.cache1).length === 4);
      utility2.assert(Object.keys(self.cache2).length === 2);
      utility2.assert(self.getItem('bb') === undefined);
      utility2.assert(self.remaining === 0);
      utility2.assert(Object.keys(self.cache1).length === 4);
      utility2.assert(Object.keys(self.cache2).length === 2);
      self.removeItem('ee');
      utility2.assert(self.remaining === 1);
      utility2.assert(Object.keys(self.cache1).length === 2);
      utility2.assert(Object.keys(self.cache2).length === 1);
      utility2.assert(self.getItem('ee') === undefined);
      utility2.assert(self.remaining === 1);
      utility2.assert(Object.keys(self.cache1).length === 2);
      utility2.assert(Object.keys(self.cache2).length === 1);
      onEventError();
    }

  };
  local._init();
}());



(function moduleDbGithubNodejs() {
  /*
    this nodejs module exports the github db api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleDbGithubNodejs',

    _init: function () {
      if (state.modeExtra && state.modeNodejs) {
        utility2.initModule(module, local);
      }
    },

    _initOnce: function () {
      var onEventReady;
      onEventReady = utility2.untilReady(utility2.onEventErrorDefault);
      if (process.env.GITHUB_TOKEN && state.modeDbGithub && !state.modeLocal) {
        state.dbGithubBranchDefault
          = utility2.createDbGithubBranch(state.modeDbGithub, process.env.GITHUB_TOKEN);
        /* delete files from command-line */
        if (state.dbGithubBranchFileDeleteList) {
          state.dbGithubBranchFileDeleteList.split(',').forEach(function (file) {
            onEventReady.remaining += 1;
            state.dbGithubBranchDefault.fileDelete(
              state.dbGithubBranchFilePrefix + file,
              onEventReady
            );
          });
        }
        /* update files from command-line */
        if (state.dbGithubBranchFileUpdateList) {
          state.dbGithubBranchFileUpdateList.split(',').forEach(function (file) {
            onEventReady.remaining += 1;
            required.fs.readFile(state.dbGithubBranchFileCwd + file, function (error, data) {
              utility2.assert(!error, error);
              state.dbGithubBranchDefault.fileUpdate(
                state.dbGithubBranchFilePrefix + file,
                data,
                onEventReady
              );
            });
          });
        }
      /* disable tests for this module */
      } else {
        state.testModuleDict[local._name] = false;
      }
    },

    createDbGithubBranch: function (ownerRepoBranch, token) {
      /*
        this function creates a github db branch for storing files
      */
      var self;
      self = new local._Branch();
      ownerRepoBranch = ownerRepoBranch.split('/');
      self.branch = ownerRepoBranch[2];
      self.token = token;
      self.url = 'https://api.github.com/repos/'
        + ownerRepoBranch[0] + '/' + ownerRepoBranch[1] + '/contents';
      return self;
    },

    _blobSha1: function (blob) {
      /*
        this function calculates a blob's sha1 hash
      */
      return required.crypto.createHash('sha1')
        .update('blob ' + blob.length + '\x00')
        .update(blob)
        .digest('hex');
    },

    _Branch: function () {
      /*
        this is the _Branch class
      */
      return;
    },

    _Branch_prototype_ajax: function (options, onEventError) {
      /*
        this function makes an ajax request
      */
      utility2.ajax(utility2.setOverride(options, { headers: {
        authorization: 'token ' + this.token,
        /* data is always a string, so we use Buffer.byteLength */
        'content-length': options.data ? Buffer.byteLength(options.data) : 0,
        /* BUG - github api requires user-agent header */
        'user-agent': 'unknown'
      }, resultType: 'json' }), onEventError);
    },

    _Branch_prototype_fileDelete: function (file, onEventError) {
      /*
        this function deletes the specified file
        https://developer.github.com/v3/repos/contents/#delete-a-file
      */
      var mode, onEventError2, self;
      mode = 0;
      self = this;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* get the file's sha id */
        case 1:
          self.fileSha(file, onEventError2);
          break;
        case 2:
          /* file doesn't exist, so no need to delete it */
          if (!data) {
            onEventError();
            return;
          }
          self.ajax({ data: JSON.stringify({
            branch: self.branch,
            message: 'delete ' + file,
            sha: data
          }), method: 'DELETE', url: self.url + file }, onEventError2);
          break;
        default:
          onEventError(error, data);
        }
      };
      onEventError2();
    },

    _Branch_prototype_fileUpdate: function (file, blob, onEventError) {
      /*
        this function updates the specified file with the given blob
        https://developer.github.com/v3/repos/contents/#update-a-file
      */
      var mode, onEventError2, self;
      mode = 0;
      self = this;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* get the file's sha id */
        case 1:
          self.fileSha(file, onEventError2);
          break;
        case 2:
          self.ajax({ data: JSON.stringify({
            branch: self.branch,
            content: blob.toString('base64'),
            message: 'update ' + file,
            sha: data
          }), method: 'PUT', url: self.url + file }, onEventError2);
          break;
        default:
          onEventError(error, data);
        }
      };
      onEventError2();
    },

    _Branch_prototype_fileSha: function (file, onEventError) {
      /*
        this function gets the file's sha id on github
      */
      var mode, onEventError2, self, sha;
      mode = 0;
      self = this;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          self.ajax({
            url: self.url + required.path.dirname(file) + '?ref=' + self.branch
          }, onEventError2);
          break;
        case 2:
          file = required.path.basename(file);
          /* default sha to empty string */
          sha = '';
          data.some(onEventError2);
          mode += 1;
          onEventError2();
          break;
        case 3:
          mode -= 1;
          if (error.name === file) {
            sha = error.sha;
            return true;
          }
          break;
        default:
          onEventError((/^GET 404\b/).test(error && error.message) ? null : error, sha);
        }
      };
      onEventError2();
    },

    _Branch_default_test: function (onEventError) {
      /*
        this function tests _Branch's default handling behavior
      */
      var file, mode, onEventError2, self;
      self = state.dbGithubBranchDefault;
      self = utility2.createDbGithubBranch(state.modeDbGithub, process.env.GITHUB_TOKEN);
      mode = 0;
      onEventError2 = function (error) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* test _Branch_prototype_fileDelete's null handling behavior */
        case 1:
          file = '/test/_Branch_default_test.json';
          self.fileDelete(file, onEventError2);
          break;
        /* test _Branch_prototype_fileUpdate's default handling behavior */
        case 2:
          self.fileUpdate(file, new Buffer('"_Branch_default_test2"'), onEventError2);
          break;
        /* test _Branch_prototype_fileDelete's default handling behavior */
        case 3:
          self.fileDelete(file, onEventError2);
          break;
        default:
          onEventError(error);
        }
      };
      onEventError2();
    }

  };
  local._init();
}());



(function moduleDbPostgresNodejs() {
  /*
    this nodejs module exports the postgres db api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleDbPostgresNodejs',

    _init: function () {
      if (state.modeExtra && state.modeNodejs) {
        utility2.initModule(module, local);
      }
    },

    _initOnce: function () {
      var mode, onEventError2, self;
      mode = 0;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          state.testModuleDict['utility2.moduleDbPostgresNodejs'] = false;
          if (!state.modeLocal && state.modeDbPostgres) {
            required.pg = required.pg || require('pg');
            utility2.readyUtility2.remaining += 1;
            required.pg.connect(state.modeDbPostgres, onEventError2);
          }
          break;
        /* create postgres default table */
        case 2:
          self = state.dbPostgresTableDefault
            = utility2.createDbPostgresTable('utility2_default', onEventError2);
          break;
        /* get stateOverride.json */
        case 3:
          self.getItem('stateOverride.json', utility2.jsonParseHandler(onEventError2));
          break;
        /* override state with */
        case 4:
          utility2.setOverride(state, data || {});
          onEventError2();
          break;
        default:
          utility2.assert(!error, error);
          state.testModuleDict['utility2.moduleDbPostgresNodejs'] = true;
          utility2.readyUtility2();
        }
      };
      onEventError2();
    },

    createDbPostgresTable: function (name, onEventError) {
      /*
        this function creates a postgres db table for storing key / value pairs
      */
      var self;
      /* optimization - use cached table */
      state.dbPostgresTableCache = state.dbPostgresTableCache || utility2.createCache(256);
      self = state.dbPostgresTableCache.getItem(name);
      if (self) {
        onEventError(null, self);
        return;
      }
      self = new local._Table();
      self.name = name;
      /* upsert code from http://www.postgresql.org/docs/current/static/plpgsql-control-structures.html#PLPGSQL-UPSERT-EXAMPLE */
      /* CREATE TABLE IF NOT EXISTS utility2_default (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL); */
      /* INSERT INTO utility2_default (key, value) VALUES (key2, value2) */
      self.query('CREATE TABLE IF NOT EXISTS {{table}} (\n'
          + 'key TEXT PRIMARY KEY NOT NULL,\n'
          + 'value TEXT NOT NULL\n'
        + ');\n'
        + 'CREATE OR REPLACE FUNCTION upsert_{{table}} (key2 TEXT, value2 TEXT)\n'
        + 'RETURNS VOID AS $$ BEGIN LOOP\n'
          + '-- first try to update the key\n'
          + 'UPDATE {{table}} SET value = value2 WHERE key = key2;\n'
          + 'IF found THEN\n'
              + 'RETURN;\n'
          + 'END IF;\n'
          + '-- not there, so try to insert the key\n'
          + '-- if someone else inserts the same key concurrently,\n'
          + '-- we could get a unique-key failure\n'
          + 'BEGIN\n'
            + 'INSERT INTO {{table}} (key, value) VALUES (key2, value2);\n'
            + 'RETURN;\n'
          + 'EXCEPTION WHEN unique_violation THEN\n'
            + '-- Do nothing, and loop to try the UPDATE again.\n'
          + 'END;\n'
        + 'END LOOP; END; $$\n'
        + 'LANGUAGE plpgsql;', null, function (error) {
          /* optimization - cache table */
          if (!error) {
            state.dbPostgresTableCache.setItem(name, self);
          }
          onEventError(error, self);
        });
      return self;
    },

    replParseDict_postgres: function (arg1, arg2) {
      switch (arg2) {
      case '_':
        console.log(state.dbPostgresResult);
        return;
      case '.tables':
        arg2 = 'SELECT table_name FROM information_schema.tables'
          + " WHERE table_schema = 'public';";
        break;
      }
      state.dbPostgresTableDefault.query(arg2, null, function (error, data) {
        if (data && data.length) {
          state.dbPostgresResult = data;
        }
        console.log(error || data);
      });
    },

    _replParseDict_postgres_default_test: function (onEventError) {
      /*
        this function tests replParseDict_postgres's default handling behavior
      */
      utility2.testMock(onEventError, [
        [state, { postgresTableDefault: { query: function (_, __, onEventError) {
          onEventError(null, [null]);
        } }, postgresResult: null }]
      ], function (onEventError) {
        utility2.replParse('(postgres _\n)');
        utility2.replParse('(postgres SELECT 1;\n)');
        onEventError();
      });
    },

    _Table: function () {
      /*
        this is the _Table class
      */
      return;
    },

    __Table_default_test: function (onEventError) {
      /*
        this function tests _Tables's default handling behavior
      */
      var mode, onEventError2, self;
      mode = 0;
      onEventError2 = function (error, data, ___) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* test utility2.createDbPostgresTable's default handling behavior */
        case 1:
          self = utility2.createDbPostgresTable('utility2__Table_default_test', onEventError2);
          break;
        /* test utility2.createDbPostgresTable's cache handling behavior */
        case 2:
          self = utility2.createDbPostgresTable('utility2__Table_default_test', onEventError2);
          break;
        /* test self.drop's default handling behavior */
        case 3:
          self.drop(onEventError2);
          break;
        case 4:
          self = utility2.createDbPostgresTable('utility2__Table_default_test', onEventError2);
          break;
        /* test self.clear's default handling behavior */
        case 5:
          self.clear(onEventError2);
          break;
        /* test self.setItem's default handling behavior */
        case 6:
          self.setItem('aa', 'bb', onEventError2);
          break;
        case 7:
          self.setItem('cc', 'dd', onEventError2);
          break;
        case 8:
          self.setItem('ee', 'ff', onEventError2);
          break;
        /* test self.removeItem's default handling behavior */
        case 9:
          self.removeItem('ee', onEventError2);
          break;
        /* test self.getItem's default handling behavior */
        case 10:
          self.getItem('aa', onEventError2);
          break;
        case 11:
          utility2.tryCatch(function () {
            utility2.assert(data === 'bb', data);
            onEventError2();
          }, onEventError2);
          break;
        case 12:
          self.getItem('cc', onEventError2);
          break;
        case 13:
          utility2.tryCatch(function () {
            utility2.assert(data === 'dd', data);
            onEventError2();
          }, onEventError2);
          break;
        case 14:
          self.getItem('ee', onEventError2);
          break;
        case 15:
          utility2.tryCatch(function () {
            utility2.assert(data === undefined, data);
            onEventError2();
          }, onEventError2);
          break;
        /* test self.key's default handling behavior */
        case 16:
          self.key(0, onEventError2);
          break;
        case 17:
          utility2.tryCatch(function () {
            utility2.assert(data === 'bb', data);
            onEventError2();
          }, onEventError2);
          break;
        case 18:
          self.key(1, onEventError2);
          break;
        case 19:
          utility2.tryCatch(function () {
            utility2.assert(data === 'dd', data);
            onEventError2();
          }, onEventError2);
          break;
        case 20:
          self.key(2, onEventError2);
          break;
        case 21:
          utility2.tryCatch(function () {
            utility2.assert(data === null, data);
            onEventError2();
          }, onEventError2);
          break;
        /* test self.keys's default handling behavior */
        case 22:
          self.keys(onEventError2);
          break;
        case 23:
          utility2.tryCatch(function () {
            utility2.assert(JSON.stringify(data) === '["aa","cc"]', data);
            onEventError2();
          }, onEventError2);
          break;
        /* test self.length's default handling behavior */
        case 24:
          self.length(onEventError2);
          break;
        case 25:
          utility2.tryCatch(function () {
            utility2.assert(data === 2, data);
            onEventError2();
          }, onEventError2);
          break;
        default:
          self.drop(function () {
            onEventError(error, data);
          });
        }
      };
      onEventError2();
    },

    _Table_prototype_clear: function (onEventError) {
      /*
        this function atomically cause the table associated with the table
        to be emptied of all key/value pairs, if there are any.
      */
      this.query('DELETE FROM {{table}};', null, onEventError);
    },

    _Table_prototype_drop: function (onEventError) {
      /*
        this function drops the table
      */
      /* optimization - flush cache */
      state.dbPostgresTableCache.removeItem(this.name);
      this.query(
        'DROP TABLE IF EXISTS {{table}};'
          + 'DROP FUNCTION IF EXISTS upsert_{{table}} (key2 TEXT, value2 TEXT);',
        null,
        onEventError
      );
    },

    _Table_prototype_getItem: function (key, onEventError) {
      /*
        this function returns the current value associated with the given key
      */
      var mode, onEventError2, self;
      mode = 0;
      self = this;
      onEventError2 = function (error, data, ___) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          self.query('SELECT value from {{table}} WHERE key=$1;', [key], onEventError2);
          break;
        case 2:
          onEventError2(null, data && data[0] && data[0].value);
          break;
        default:
          onEventError(error, data);
        }
      };
      onEventError2();
    },

    _Table_prototype_key: function (offset, onEventError) {
      /*
        this function returns the current value associated with the given key.
        If the given key does not exist in the table then this method must return null.
      */
      this.query(
        'SELECT value FROM {{table}} OFFSET $1;',
        [offset],
        function (error, data) {
          onEventError(error, (data && data[0] && data[0].value) || null);
        }
      );
    },

    _Table_prototype_keys: function (onEventError) {
      /*
        this function returns all keys listed in the table.
      */
      var mode, onEventError2, self;
      mode = 0;
      self = this;
      onEventError2 = function (error, data, ___) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          self.query('SELECT key from {{table}};', null, onEventError2);
          break;
        case 2:
          data = (data || []).map(onEventError2);
          mode += 1;
          onEventError2(null, data);
          break;
        case 3:
          mode -= 1;
          return error.key;
        default:
          onEventError(error, data);
        }
      };
      onEventError2();
    },

    _Table_prototype_length: function (onEventError) {
      /*
        this function returns the number of key/value pairs
        currently present in the table associated with the table.
      */
      this.query('SELECT count(*) FROM {{table}};', null, function (error, data) {
        onEventError(error, Number(data && data[0] && data[0].count));
      });
    },

    _Table_prototype_query: function (statement, params, onEventError) {
      /*
       this function performs a sql query
      */
      var client, done, mode, onEventError2, self;
      done = utility2.nop;
      mode = 0;
      self = this;
      onEventError2 = function (error, data, ___) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          required.pg.connect(state.modeDbPostgres, onEventError2);
          break;
        case 2:
          client = data;
          done = ___;
          client.query(
            statement.replace((/\{\{table\}\}/g), self.name),
            params,
            onEventError2
          );
          break;
        default:
          done();
          onEventError(error, data && data.rows);
        }
      };
      onEventError2();
    },

    _Table_prototype_removeItem: function (key, onEventError) {
      /*
        this function causes the key/value pair with the given key
        to be removed from the table associated with the table, if it exists.
        usage example: self.removeItem('foo', utility2.onEventErrorDefault);
      */
      this.query('DELETE FROM {{table}} WHERE key=$1;', [key], onEventError);
    },

    _Table_prototype_setItem: function (key, value, onEventError) {
      /*
        this function sets the item with the given key to the given value
        usage example: self.setItem('foo', 'bar', utility2.onEventErrorDefault);
      */
      this.query('SELECT upsert_{{table}} ($1, $2);', [key, value], onEventError);
    }

  };
  local._init();
}());



(function moduleDbSqlite3Browser() {
  /*
    this browser module exports the sqlite3 db api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleDbSqlite3Browser',

    _init: function () {
      if (state.modeBrowser) {
        utility2.initModule(module, local);
      }
    }

  };
  local._init();
}());



(function moduleDbSqlite3Nodejs() {
  /*
    this nodejs module exports the sqlite3 db api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleDbSqlite3Nodejs',

    _init: function () {
      if (state.modeExtra && state.modeNodejs) {
        utility2.initModule(module, local);
      }
    },

    _initOnce: function () {
      /*jslint stupid: true*/
      /* init sqlite3 */
      required.sqlite3 = required.sqlite3 || utility2.require('sqlite3');
      utility2.readyUtility2.remaining += 1;
      state.sqlite3 = new required.sqlite3.cached.Database(
        state.tmpdir + '/db.sqlite3',
        utility2.readyUtility2
      );
      /* create sqlite3 default table */
      utility2.readyUtility2.remaining += 1;
      state.dbSqlite3TableDefault = utility2.createDbSqlite3Table(
        'utility2_default',
        function (error) {
          utility2.assert(!error, error);
          utility2.readyUtility2();
        }
      );
      /* create sqlite3 blob table */
      utility2.readyUtility2.remaining += 1;
      state.dbSqlite3TableBlob = utility2.createDbSqlite3Table(
        'utility2_blob',
        function (error) {
          utility2.assert(!error, error);
          /* create blob dir */
          utility2.fsMkdirpSync(state.tmpdir + '/blob');
          /* cleanup old cached sqlite3 blobs */
          state.dbSqlite3TableBlob.sqlAll(
            "SELECT DISTINCT record FROM {{table}} WHERE record LIKE '/cache/%';",
            {},
            function (error, data) {
              utility2.assert(!error, error);
              data.forEach(function (record) {
                utility2.dbBlobDelete(record.record, utility2.onEventErrorDefault);
              });
            }
          );
          /* periodically remove cached sqlite3 blobs */
          utility2.unref(setInterval(function () {
            local._dbCacheCleanup(utility2.onEventErrorDefault);
          }, 300000));
          utility2.readyUtility2();
        }
      );
    },

    createDbSqlite3Table: function (name, onEventError) {
      /*
        this function creates a sqlite3 db table for storing record / field / value triplets
      */
      var self;
      /* assert valid table name */
      if ((/_fts_|_(?:1|ai|au|bd|bu|fts)$/).test(name)) {
        onEventError(new Error('createDbSqlite3Table - invalid table name ' + name));
        return;
      }
      /* optimization - use cached table */
      state.dbSqlite3TableCache = state.dbSqlite3TableCache || utility2.createCache(256);
      self = state.dbSqlite3TableCache.getItem(name);
      if (self) {
        onEventError(null, self);
        return;
      }
      self = new local._Table();
      self.name = name;
      state.sqlite3.exec(self.sqlStatement('CREATE TABLE IF NOT EXISTS {{table}} (\n'
          + 'id TEXT PRIMARY KEY NOT NULL,\n'
          + 'record TEXT NOT NULL,\n'
          + 'field TEXT NOT NULL,\n'
          + 'value TEXT NOT NULL\n'
        + ');\n'
        /* create fts table */
        + 'CREATE VIRTUAL TABLE IF NOT EXISTS {{table}}_fts USING\n'
          + "FTS4 (content='{{table}}', record, field, value);\n"
        /* create fts trigger BEFORE UPDATE */
        + 'CREATE TRIGGER IF NOT EXISTS {{table}}_bu BEFORE UPDATE ON {{table}} BEGIN\n'
          + 'DELETE FROM {{table}}_fts WHERE docid=old.rowid;\n'
        + 'END;\n'
        /* create fts trigger BEFORE DELETE */
        + 'CREATE TRIGGER IF NOT EXISTS {{table}}_bd BEFORE DELETE ON {{table}} BEGIN\n'
          + 'DELETE FROM {{table}}_fts WHERE docid=old.rowid;\n'
        + 'END;\n'
        /* create fts trigger AFTER UPDATE */
        + 'CREATE TRIGGER IF NOT EXISTS {{table}}_au AFTER UPDATE ON {{table}} BEGIN\n'
          + 'INSERT INTO {{table}}_fts (docid, record, field, value)\n'
          + 'VALUES (new.rowid, new.record, new.field, new.value);\n'
        + 'END;\n'
        /* create fts trigger BEFORE INSERT */
        + 'CREATE TRIGGER IF NOT EXISTS {{table}}_ai AFTER INSERT ON {{table}} BEGIN\n'
          + 'INSERT INTO {{table}}_fts (docid, record, field, value)\n'
          + 'VALUES (new.rowid, new.record, new.field, new.value);\n'
        + 'END;\n'
        + 'PRAGMA journal_mode=WAL;'), function (error) {
        /* optimization - cache table */
        if (!error) {
          state.dbSqlite3TableCache.setItem(name, self);
        }
        onEventError(error);
      });
      return self;
    },

    _createDbSqlite3Table_error_test: function (onEventError) {
      /*
        this function tests createDbSqlite3Table's error handling behavior
      */
      utility2.createDbSqlite3Table('table_fts', function (error) {
        utility2.assert(error instanceof Error);
        onEventError();
      });
    },

    _dbBlobEncodeName: function (file) {
      /*
        this function encodes the filename into a flattened filename with no dir structure
      */
      return state.tmpdir + '/blob/' + encodeURIComponent(file);
    },

    dbBlobCopy: function (file1, file2, onEventError) {
      /*
        this function will
        1. copy the blob in persistent fs
        2. copy the blob's sqlite3 record
      */
      var mode, onEventError2;
      mode = 0;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* 1. copy the blob in persistent fs */
        case 1:
          utility2.fsCopyFileAtomic(
            local._dbBlobEncodeName(file1),
            local._dbBlobEncodeName(file2),
            onEventError2
          );
          break;
        /* 2. copy the blob's sqlite3 record */
        case 2:
          state.dbSqlite3TableBlob.recordCopy(file1, file2, onEventError2);
          break;
        default:
          onEventError(error);
        }
      };
      onEventError2();
    },

    dbBlobDelete: function (file, onEventError) {
      /*
        this function will
        1. unlink the blob in persistent fs
        2. delete the blob's sqlite3 record
      */
      var mode, onEventError2;
      mode = 0;
      onEventError2 = function (error) {
        error = error && error.code === 'ENOENT' ? null : error;
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* 1. unlink the blob in persistent fs */
        case 2:
          required.fs.unlink(local._dbBlobEncodeName(file), onEventError2);
          break;
        /* 2. delete the blob's sqlite3 record */
        case 1:
          state.dbSqlite3TableBlob.recordDelete(file, onEventError2);
          break;
        default:
          onEventError(error);
        }
      };
      onEventError2();
    },

    dbBlobRead: function (file, onEventError) {
      /*
        this function reads the blob
      */
      required.fs.readFile(local._dbBlobEncodeName(file), onEventError);
    },

    dbBlobRename: function (file1, file2, onEventError) {
      /*
        this function will
        1. rename the blob in persistent fs
        2. rename the blob's sqlite3 record
      */
      var mode, onEventError2;
      mode = 0;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* 1. rename the blob in persistent fs */
        case 1:
          required.fs.rename(
            local._dbBlobEncodeName(file1),
            local._dbBlobEncodeName(file2),
            onEventError2
          );
          break;
        /* 2. rename the blob's sqlite3 record */
        case 2:
          state.dbSqlite3TableBlob.recordRename(file1, file2, onEventError2);
          break;
        default:
          onEventError(error);
        }
      };
      onEventError2();
    },

    dbBlobWrite: function (file, data, onEventError) {
      /*
        this function will
        1. atomically write the blob to persistent fs
        2. create the blob's sqlite3 record
      */
      var mode, onEventError2;
      mode = 0;
      onEventError2 = function (error) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* 1. atomically write the blob to persistent fs */
        case 1:
          utility2.fsWriteFileAtomic(local._dbBlobEncodeName(file), data, onEventError2);
          break;
        /* 2. create the blob's sqlite3 record */
        case 2:
          state.dbSqlite3TableBlob.recordReplace(file, {
            size: typeof data === 'string' ? Buffer.byteLength(data) : data.length
          }, onEventError2);
          break;
        default:
          onEventError(error);
        }
      };
      onEventError2();
    },

    _dbCacheCleanup: function (onEventError) {
      /*
        this function cleans up cached db blobs
      */
      var dir, mode, onEventError2;
      mode = 0;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* loop through state._dbCacheCleanupFsList */
        case 1:
          dir = state.tmpdir + '/cache';
          utility2.jsonLog('_dbCacheCleanup - cleaning ' + dir);
          state._dbCacheCleanupFsList = state._dbCacheCleanupFsList || [];
          state._dbCacheCleanupFsList.forEach(onEventError2);
          mode += 1;
          onEventError2();
          break;
        /* delete cached blob */
        case 2:
          mode -= 1;
          utility2.dbBlobDelete(error, utility2.onEventErrorDefault);
          break;
        /* get list of files to be removed for the next cycle */
        case 3:
          state.dbSqlite3TableBlob.sqlAll(
            "SELECT DISTINCT record FROM {{table}} WHERE record LIKE '/cache/%';",
            {},
            onEventError2
          );
          break;
        /* save list to state._dbCacheCleanupFsList */
        case 4:
          state._dbCacheCleanupFsList = data.map(function (record) {
            return record.record;
          });
          onEventError2();
          break;
        default:
          onEventError(error);
        }
      };
      onEventError2();
    },

    __dbCacheCleanup_default_test: function (onEventError) {
      /*
        this function tests _dbCacheCleanup's default handling behavior
      */
      state._dbCacheCleanupFsList = ['/cache/' + utility2.uuid4() + '/foo'];
      local._dbCacheCleanup(onEventError);
    },

    dbTableList: function (onEventError) {
      /*
        this function lists all user tables in the sqlite3 db
      */
      var mode, onEventError2;
      mode = 0;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          state.sqlite3.all(
            'SELECT name FROM sqlite_master\n'
              + 'WHERE type="table" AND name NOT LIKE "%_fts" AND name NOT LIKE "%_fts_%";',
            onEventError2
          );
          break;
        case 2:
          data = data.map(onEventError2);
          mode += 1;
          break;
        case 3:
          mode -= 1;
          return error.name;
        default:
          onEventError(error, data);
        }
      };
      onEventError2();
    },

    fsCopyFileAtomic: function (file1, file2, onEventError) {
      /*
        this function atomically copies file1 to file2
      */
      utility2.fsWriteFileAtomic(file2, required.fs.createReadStream(file1), onEventError);
    },

    _fsCopyFileAtomic_error_test: function (onEventError) {
      /*
        this function tests fsCopyFileAtomic's error handling behavior
      */
      utility2.fsCopyFileAtomic(utility2.uuid4(), utility2.uuid4(), function (error) {
        utility2.assert(error instanceof Error);
        onEventError();
      });
    },

    fsWriteFileAtomic: function (file, data, onEventError) {
      /*
        this function will
        1. write the data to a unique cache file
        2. rename the cache file to persistent file
      */
      var mode, onEventError2, tmp;
      mode = 0;
      onEventError2 = function (error) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* 1. write the data to a cache file */
        case 1:
          tmp = state.tmpdir + '/cache/' + utility2.uuid4();
          /* write from readable stream */
          if (data instanceof required.stream.Readable) {
            data.on('error', onEventError2).pipe(
              required.fs.createWriteStream(tmp)
                .on('error', onEventError2)
                .on('finish', onEventError2)
            );
          /* write from buffer / string */
          } else {
            required.fs.writeFile(tmp, data, onEventError2);
          }
          break;
        /* 2. rename the cache file to persistent file */
        case 2:
          required.fs.rename(tmp, file, onEventError2);
          break;
        default:
          onEventError(error);
        }
      };
      onEventError2();
    },

    _fsWriteFileAtomic_default_test: function (onEventError) {
      /*
        this function tests fsWriteFileAtomic's and friends' default handling behavior
      */
      var file1, file2, mode, onEventError2;
      mode = 0;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          /* test fsWriteFileAtomic's default handling behavior */
          file1 = state.tmpdir + '/cache/' + utility2.uuid4();
          utility2.fsWriteFileAtomic(file1, '_fsWriteFileAtomic_default_test', onEventError2);
          break;
        case 2:
          /* test fsCopyFileAtomic's default handling behavior */
          file2 = state.tmpdir + '/cache/' + utility2.uuid4();
          utility2.fsCopyFileAtomic(file1, file2, onEventError2);
          break;
        case 3:
          required.fs.readFile(file2, 'utf8', onEventError2);
          break;
        case 5:
          utility2.assert(data === '_fsWriteFileAtomic_default_test');
          onEventError2();
          break;
        default:
          onEventError(error);
        }
      };
      onEventError2();
    },

    replParseDict_sqlite3: function (arg1, arg2) {
      switch (arg2) {
      case '_':
        console.log(state.sqlite3Result);
        return;
      case '.tables':
        arg2 = 'SELECT name FROM sqlite_master;';
        break;
      case '.tableList':
        arg2 = 'SELECT name FROM sqlite_master\n'
          + 'WHERE type="table" AND name NOT LIKE "%_fts" AND name NOT LIKE "%_fts_%";';
        break;
      }
      arg2 = arg2
        /* list all records in a table */
        .replace((/^(\S+) (.*)/), function (_, command, arg) {
          switch (command) {
          case '.tableDrop':
            utility2.createDbSqlite3Table(arg, function (error, self) {
              if (!error) {
                self.tableDrop(utility2.onEventErrorDefault);
              }
            });
            return 'SELECT 1;';
          case '.recordList':
            return 'SELECT DISTINCT record FROM ' + arg + ';';
          default:
            return _;
          }
        });
      state.sqlite3.all(arg2, function (error, rows) {
        if (rows) {
          state.sqlite3Result = rows;
        }
        console.log(error || rows);
      });
    },

    _replParseDict_sqlite3_default_test: function (onEventError) {
      /*
        this function tests replParseDict_sqlite3's default handling behavior
      */
      utility2.testMock(onEventError, [
        [state, { sqlite3: { all: function (_, onEventError) {
          onEventError(null, true);
        } }, sqlite3Result: null }]
      ], function (onEventError) {
        utility2.replParse('(sqlite3 _\n)');
        utility2.replParse('(sqlite3 .tables\n)');
        onEventError();
      });
    },

    _Table: function () {
      /*
        this is the _Table class
      */
      return;
    },

    __Table_default_test: function (onEventError) {
      /*
        this function tests _Table's default handling behavior
      */
      /* test createDbSqlite3Table's default handling behavior */
      var self;
      self = utility2.createDbSqlite3Table('cache__Table_default_test', function (error) {
        /* test self.sqlSerialize's default handling behavior */
        self.sqlSerialize(function (onEventError2) {
          /* test self.recordReplace's default handling behavior */
          self.recordReplace('foo', { aa: true }, onEventError2);
          self.recordGet('foo', function (error, data) {
            utility2.assert(!error);
            utility2.assert(data.aa === true);
            utility2.assert(data.timestamp);
          });
          /* test self.recordUpdate's default handling behavior */
          self.recordUpdate('foo', { bb: true }, onEventError2);
          /* test self.recordGet's default handling behavior */
          self.recordGet('foo', function (error, data) {
            utility2.assert(!error);
            utility2.assert(data.aa === true);
            utility2.assert(data.bb === true);
            utility2.assert(data.timestamp);
          });
          /* test self.recordGetRandom's default handling behavior */
          self.recordGetRandom(function (error, data) {
            utility2.assert(!error);
            utility2.assert(data.aa === true);
            utility2.assert(data.bb === true);
            utility2.assert(data.timestamp);
          });
          /* test self.recordCopy's default handling behavior */
          self.recordCopy('foo', 'bar', onEventError2);
          self.recordGet('bar', function (error, data) {
            utility2.assert(!error);
            utility2.assert(data.aa === true);
            utility2.assert(data.bb === true);
            utility2.assert(data.timestamp);
          });
          /* test self.recordRename's default handling behavior */
          self.recordRename('bar', 'baz', onEventError2);
          self.recordGet('baz', function (error, data) {
            utility2.assert(!error);
            utility2.assert(data.aa === true);
            utility2.assert(data.bb === true);
            utility2.assert(data.timestamp);
          });
          /* test self.recordReplace's default handling behavior */
          self.recordReplace('foo', { bb: true, cc: true }, onEventError2);
          self.recordGet('foo', function (error, data) {
            utility2.assert(!error);
            utility2.assert(data.aa === undefined);
            utility2.assert(data.bb === true);
            utility2.assert(data.cc === true);
            utility2.assert(data.timestamp);
          });
          /* test self.recordUpdate's default handling behavior */
          self.recordUpdate('foo', { bb: null }, onEventError2);
          self.recordGet('foo', function (error, data) {
            utility2.assert(!error);
            utility2.assert(data.aa === undefined);
            utility2.assert(data.bb === undefined);
            utility2.assert(data.cc === true);
            utility2.assert(data.timestamp);
          });
          /* test self.recordGet's error handling behavior */
          self.sqlRun(
            'INSERT OR REPLACE INTO {{table}} (id, record, field, value) VALUES(?, ?, ?, ?);',
            [self.idEncode('foo', 'cc'), 'foo', 'cc', 'syntax error'],
            onEventError2
          );
          self.recordGet('foo', function (error, data) {
            utility2.assert(!error);
            utility2.assert(data.aa === undefined);
            utility2.assert(data.bb === undefined);
            utility2.assert(data.cc === undefined);
            utility2.assert(data.timestamp);
          });
          /* test self.tableFts's default handling behavior */
          self.tableFts('foo', function (error, data) {
            utility2.assert(!error);
            utility2.assert(data);
          });
          /* test self.recordDelete's default handling behavior */
          self.recordDelete('foo', onEventError2);
          /* test self.recordGet's nonexistent handling behavior */
          self.recordGet('foo', function (error, data) {
            utility2.assert(!error);
            utility2.assert(!data);
          });
          /* test self.tableDrop's default handling behavior */
          self.tableDrop(onEventError2);
          /* test self.sqlSerialize's multiple error handling behavior */
          state.onEventErrorDefaultIgnoreList.push(
            'SQLITE_ERROR: no such table: ' + self.name
          );
          self.recordGet('foo', onEventError2);
          state.onEventErrorDefaultIgnoreList.push(
            'SQLITE_ERROR: no such table: ' + self.name
          );
          self.recordGet('foo', onEventError2);
        }, function (error) {
          self.tableDrop(function () {
            utility2.assert(error instanceof Error);
            onEventError();
          });
        });
      });
    },

    _Table_prototype_idEncode: function (record, field) {
      return encodeURIComponent(record) + ' ' + encodeURIComponent(field);
    },

    _Table_prototype_recordCopy: function (record1, record2, onEventError) {
      /*
        this function copies record1 to record2
      */
      var self;
      self = this;
      self.sqlSerialize(function (onEventError) {
        self.sqlRun('DELETE FROM {{table}} WHERE record=?;', record2, onEventError);
        self.sqlRun('INSERT OR REPLACE INTO {{table}} (id, record, field, value)'
          + ' SELECT replace(id, ?, ?), ?, field, value from {{table}} WHERE record=?;', [
            encodeURIComponent(record1) + ' ',
            encodeURIComponent(record2) + ' ',
            record2,
            record1
          ], onEventError);
      }, onEventError);
    },

    _Table_prototype_recordDelete: function (record, onEventError) {
      this.sqlRun('DELETE FROM {{table}} WHERE record=?;', record, onEventError);
    },

    _Table_prototype_recordGet: function (record, onEventError, modeRandom) {
      var dict, field, mode, onEventError2, self;
      mode = 0;
      self = this;
      onEventError2 = function (error, data) {
        mode = error instanceof Error && mode !== 2 ? -1 : mode + 1;
        switch (mode) {
        case 1:
          if (modeRandom) {
            self.sqlAll(
              'SELECT * FROM {{table}} WHERE record IN'
                + ' (SELECT DISTINCT record FROM {{table}} ORDER BY RANDOM() LIMIT 1);',
              {},
              onEventError2
            );
          } else {
            self.sqlAll('SELECT * FROM {{table}} WHERE record=?;', record, onEventError2);
          }
          break;
        case 2:
          if (data.length === 0) {
            onEventError();
            return;
          }
          dict = {};
          data.forEach(onEventError2);
          mode += 1;
          onEventError2();
          break;
        case 3:
          mode -= 1;
          field = error;
          error = utility2.jsonParseOrError(field.value);
          if (error instanceof Error) {
            /* fault-tolerance - auto delete invalid fields */
            self.sqlRun(
              'DELETE FROM {{table}} WHERE value=?;',
              field.value,
              utility2.onEventErrorDefault
            );
            return;
          }
          dict[field.field] = error;
          break;
        default:
          onEventError(error, dict);
          break;
        }
      };
      onEventError2();
    },

    _Table_prototype_recordGetRandom: function (onEventError) {
      this.recordGet(null, onEventError, true);
    },

    _Table_prototype_recordList: function (onEventError) {
      var mode, onEventError2, self;
      mode = 0;
      self = this;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          self.sqlAll('SELECT DISTINCT record FROM {{table}};', {}, onEventError2);
          break;
        case 2:
          data = data.map(onEventError2);
          mode += 1;
          onEventError2(null, data);
          break;
        case 3:
          mode -= 1;
          return error.record;
        default:
          onEventError(error);
        }
      };
      onEventError2();
    },

    _Table_prototype_recordRename: function (record1, record2, onEventError) {
      /*
        this function renames record1 to record2
      */
      var self;
      self = this;
      self.sqlSerialize(function (onEventError) {
        self.sqlRun('DELETE FROM {{table}} WHERE record=?;', record2, onEventError);
        self.sqlRun('UPDATE {{table}} SET id = replace(id, ?, ?), record = ?'
          + ' WHERE record=?;', [
            encodeURIComponent(record1) + ' ',
            encodeURIComponent(record2) + ' ',
            record2,
            record1
          ], onEventError);
      }, onEventError);
    },

    _Table_prototype_recordReplace: function (record, fieldDict, onEventError, mode) {
      var self;
      self = this;
      self.sqlSerialize(function (onEventError) {
        if (mode !== 'update') {
          self.sqlRun('DELETE FROM {{table}} WHERE record=?;', record, onEventError);
        }
        Object.keys(fieldDict || {}).forEach(function (field) {
          /* delete null-valued fields */
          if (fieldDict[field] === null) {
            if (mode === 'update') {
              self.sqlRun(
                'DELETE FROM {{table}} WHERE id=?;',
                self.idEncode(record, field),
                onEventError
              );
            }
          } else {
            self.sqlRun(
              'INSERT OR REPLACE INTO {{table}} (id, record, field, value) VALUES(?, ?, ?, ?);',
              [self.idEncode(record, field), record, field, JSON.stringify(fieldDict[field])],
              onEventError
            );
          }
        });
        /* auto timestamp */
        self.sqlRun(
          'INSERT OR REPLACE INTO {{table}} (id, record, field, value) VALUES(?, ?, ?, ?);',
          [
            self.idEncode(record, 'timestamp'),
            record,
            'timestamp',
            JSON.stringify(new Date().toJSON())
          ],
          onEventError
        );
      }, onEventError);
    },

    _Table_prototype_recordUpdate: function (record, fieldDict, onEventError) {
      this.recordReplace(record, fieldDict, onEventError, 'update');
    },

    _Table_prototype_sqlAll: function (statement, params, onEventError) {
      state.sqlite3.all(this.sqlStatement(statement), params, onEventError);
    },

    _Table_prototype_sqlExec: function (statement, onEventError) {
      state.sqlite3.exec(this.sqlStatement(statement), onEventError);
    },

    _Table_prototype_sqlRun: function (statement, params, onEventError) {
      state.sqlite3.run(this.sqlStatement(statement), params, onEventError);
    },

    _Table_prototype_sqlSerialize: function (serialize, onEventError) {
      var mode, onEventError2;
      mode = 0;
      onEventError2 = function (error) {
        if (mode === -1) {
          utility2.onEventErrorDefault(error);
          return;
        }
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case -1:
          onEventError(error);
          break;
        case 1:
          state.sqlite3.serialize(onEventError2);
          break;
        case 2:
          serialize(onEventError2);
          state.sqlite3.run('SELECT 0', function (error) {
            mode = mode === -1 ? mode : -2;
            onEventError2(error);
          });
          break;
        }
      };
      onEventError2();
    },

    _Table_prototype_sqlStatement: function (statement) {
      utility2.assert(statement.slice(-1) === ';');
      return statement.replace((/\{\{table\}\}/g), this.name);
    },

    _Table_prototype_tableDrop: function (onEventError) {
      /* optimization - flush cache */
      state.dbSqlite3TableCache.removeItem(this.name);
      this.sqlExec('DROP TABLE IF EXISTS {{table}};\n'
        + 'DROP TABLE IF EXISTS {{table}}_fts;', onEventError);
    },

    _Table_prototype_tableFts: function (query, onEventError) {
      /*
        this function runs full-text search on the table
      */
      this.sqlAll(
        'SELECT rowid, offsets({{table}}_fts), matchinfo({{table}}_fts),'
          + ' snippet({{table}}_fts) FROM {{table}}_fts WHERE {{table}}_fts match ?;',
        query,
        onEventError
      );
    }

  };
  local._init();
}());



(function moduleHeadlessPhantomjsNodejs() {
  /*
    this nodejs module exports the headless phantomjs test api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleHeadlessPhantomjsNodejs',

    _init: function () {
      if (state.modeExtra && state.modeNodejs) {
        utility2.initModule(module, local);
      }
    },

    phantomjsTestUrl: function (options, onEventError) {
      /*
        this function starts a separate phantomjs process to open and test a webpage
      */
      var mode, onEventError2, testCallbackId, timeout;
      mode = 0;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          testCallbackId = utility2.uuid4();
          options.url = utility2.urlParamsMerge(options.url, {
            testCallbackId: testCallbackId
          });
          required.phantomjs = required.phantomjs || utility2.require('phantomjs');
          state.phantomjs = utility2.shell({ argv: [
            options.argv0 || required.phantomjs.path,
            utility2.__dirname + '/.install/utility2_phantomjs.js',
            new Buffer(JSON.stringify(options)).toString('base64')
          ], modeDebug: false });
          state.browserTestCallbackDict[testCallbackId] = onEventError2;
          /* set timeout for phantomjsTestUrl */
          timeout = utility2.onEventTimeout(
            onEventError2,
            state.timeoutDefault,
            'phantomjsTestUrl ' + options.url
          );
          break;
        default:
          /* clear timeout for phantomjsTestUrl */
          clearTimeout(timeout);
          /* garbage collect testCallbackId */
          delete state.browserTestCallbackDict[testCallbackId];
          onEventError(error);
        }
      };
      onEventError2();
    },

    _phantomjsTestUrl_default_test: function (onEventError) {
      /*
        this function tests phantomjsTestUrl's default handling behavior
      */
      utility2.phantomjsTestUrl({
        timeoutDefault: state.timeoutDefault,
        url: state.localhost + '/test/test.html#modeTest=1'
      }, onEventError);
    }

  };
  local._init();
}());



(function moduleHeadlessSlimerjsNodejs() {
  /*
    this nodejs module exports the headless slimerjs test api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleHeadlessSlimerjsNodejs',

    _init: function () {
      if (state.modeExtra && state.modeNodejs) {
        utility2.initModule(module, local);
      }
    },

    _initOnce: function () {
      /* disable / enable tests for this module */
      state.testModuleDict[local._name] = !!state.modeHeadlessSlimerjs;
    },

    slimerjsTestUrl: function (options, onEventError) {
      /*
        this function starts a separate slimerjs process to open and test a webpage
      */
      options = utility2.jsonCopy(options);
      options.argv0 = state.modeHeadlessSlimerjs;
      utility2.phantomjsTestUrl(options, onEventError);
    },

    _slimerjsTestUrl_default_test: function (onEventError) {
      /*
        this function tests slimerjsTestUrl's default handling behavior
      */
      utility2.slimerjsTestUrl({
        timeoutDefault: state.timeoutDefault,
        url: state.localhost + '/test/test.html#modeTest=1'
      }, onEventError);
    }

  };
  local._init();
}());



(function moduleRollupNodejs() {
  /*
    this nodejs module exports the rollup api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleRollupNodejs',

    _init: function () {
      if (state.modeExtra && state.modeNodejs) {
        utility2.initModule(module, local);
      }
    },

    _initOnce: function () {
      if (state.minifyFileList) {
        state.minifyFileList.split(',').forEach(function (file) {
          local._minifyFile(file, utility2.onEventErrorDefault);
        });
      }
      if (state.rollupFileList) {
        state.rollupFileList.split(',').forEach(function (file) {
          local._rollupFile(file, utility2.onEventErrorDefault);
        });
      }
    },

    _minifyFile: function (file, onEventError) {
      /*
        this function minifies css / js files
      */
      var mode, onEventError2;
      mode = 0;
      onEventError2 = function (error, data) {
        if (mode === -1) {
          utility2.onEventErrorDefault(error, data);
          return;
        }
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          required.fs.readFile(file, 'utf8', onEventError2);
          break;
        case 2:
          utility2.jsonLog('_minifyFile - minifying ' + file);
          data = utility2.commentShebang(data);
          switch (required.path.extname(file)) {
          case '.css':
          case '.js':
            onEventError2(null, utility2.scriptMinify(file, data));
            break;
          default:
            mode += 1;
            onEventError2();
          }
          break;
        case 3:
          utility2.fsWriteFileAtomic(file.replace((/([^.]*$)/), 'min.$1'), data, onEventError2);
          break;
        default:
          onEventError(error);
        }
      };
      onEventError2();
    },

    _rollupFile: function (file, onEventError) {
      /*
        this function rolls up a css / js file
      */
      var content, dataList, mode, onEventError2, options, onEventReady;
      mode = 0;
      onEventError2 = function (error, data) {
        if (mode === -1) {
          utility2.onEventErrorDefault(error, data);
          return;
        }
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          utility2.jsonLog('_rollupFile - rolling up ' + file);
          required.fs.readFile(file, 'utf8', onEventError2);
          break;
        case 2:
          content = data;
          utility2.evalOnEventError(
            file,
            utility2.scriptLint(file + '.js', content
              .replace((/(^\/\* CSS_COMMENT|CSS_COMMENT \*\/$)/gm), '// $1')),
            onEventError2
          );
          break;
        case 3:
          options = data;
          dataList = utility2.jsonCopy(options.urlList);
          onEventReady = utility2.untilReady(onEventError2);
          onEventReady.remaining = dataList.length;
          utility2.ajaxMultiUrls2(options, function (error, data) {
            mode = 3;
            onEventError2(error, data);
            onEventReady(error);
          });
          break;
        case 4:
          /* additional css parsing */
          if (required.path.extname(file) === '.css' && !data.modeCss) {
            data.modeCss = true;
            onEventReady.remaining += 1;
            local._rollupFileCss(data, function (error) {
              mode = 3;
              onEventError2(error, data);
              onEventReady(error);
            });
            return;
          }
          dataList[dataList.indexOf(data.options.url0)] = data;
          break;
        case 5:
          /* concat text to content */
          dataList.forEach(function (data) {
            content += '\n/* MODULE_BEGIN ' + data.options.url0 + ' */\n' + data.data.trim()
              + '\n/* MODULE_END */\n';
          });
          /* post processing */
          if (options.postProcessing) {
            content = options.postProcessing(content);
          }
          /* remove trailing whitespace */
          content = content.replace((/[\t\r ]+$/gm), '').trim() + '\n';
          /* write to file */
          file = file.replace((/([^.]*$)/), 'rollup.$1');
          utility2.fsWriteFileAtomic(file, content, onEventError2);
          break;
        case 6:
          local._minifyFile(file, onEventError2);
          break;
        default:
          onEventError(error);
        }
      };
      onEventError2();
    },

    __rollupFile_cssRollup_test: function (onEventError) {
      /*
        this function tests _rollupFile's css rollup handling behavior
      */
      var file, mode, onEventError2;
      mode = 0;
      onEventError2 = function (error, data) {
        mode += 1;
        mode = error instanceof Error ? -1 : mode;
        switch (mode) {
        case 1:
          file = state.tmpdir + '/cache/' + utility2.uuid4() + '.css';
          utility2.fsWriteFileAtomic(file, '/*jslint indent: 2, regexp: true*/\n'
            + '/* CSS_COMMENT\n'
            + '(function () {\n'
            + '  "use strict";\n'
            + '  return { urlList: ['
            + '    "/test/test.css",\n'
            + '    "' + state.localhost + '/test/test.css"\n'
            + '    ] };\n'
            + '}());\n'
            + 'CSS_COMMENT */\n', onEventError2);
          break;
        case 2:
          local._rollupFile(file, onEventError2);
          break;
        case 3:
          required.fs.readFile(file.replace('.css', '.rollup.css'), 'utf8', onEventError2);
          break;
        case 4:
          utility2.tryCatch(function () {
            utility2.assert(!error, error);
            utility2.assert((/data:image\/png;base64/).test(data), data);
            onEventError2();
          }, onEventError2);
          break;
        default:
          onEventError(error);
          return;
        }
      };
      onEventError2();
    },

    __rollupFile_jsRollup_test: function (onEventError) {
      /*
        this function tests _rollupFile's js rollup handling behavior
      */
      var file, mode, onEventError2;
      mode = 0;
      onEventError2 = function (error, data) {
        mode += 1;
        mode = error instanceof Error ? -1 : mode;
        switch (mode) {
        case 1:
          file = state.tmpdir + '/cache/' + utility2.uuid4() + '.js';
          utility2.fsWriteFileAtomic(file, '/*jslint indent: 2, regexp: true*/\n'
            + '(function () {\n'
            + '  "use strict";\n'
            + '  return { postProcessing: function (content) {\n'
            + '    return content.replace(/(\\nconsole\\.log.*)test/g, "$1test!");\n'
            + '  }, urlList: ['
            + '    "/test/test.js",\n'
            + '    "' + state.localhost + '/test/test.js"\n'
            + '    ] };\n'
            + '}());\n', onEventError2);
          break;
        case 2:
          local._rollupFile(file, onEventError2);
          break;
        case 3:
          required.fs.readFile(file.replace('.js', '.rollup.js'), 'utf8', onEventError2);
          break;
        case 4:
          utility2.tryCatch(function () {
            utility2.assert(!error, error);
            utility2.assert((/\nconsole\.log\("hello test!"\);\n/).test(data), data);
            onEventError2();
          }, onEventError2);
          break;
        default:
          onEventError(error);
          return;
        }
      };
      onEventError2();
    },

    _rollupFileCss: function (options, onEventError) {
      /*
        this function runs additional rollup steps for css scripts
      */
      var datauriDict, mode, onEventError2, onEventReady;
      mode = 0;
      onEventError2 = function (error, data) {
        if (mode === -1) {
          utility2.onEventErrorDefault(error, data);
          return;
        }
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          utility2.jsonLog('_rollupFileCss - rolling up ' + options.options.url0);
          datauriDict = {};
          options.data.replace((/\burl\(([^)]+)\)/g), onEventError2);
          mode += 1;
          onEventError2();
          break;
        case 2:
          mode -= 1;
          data = required.path.resolve('/' + required.path.dirname(options.options.url0) + '/'
            + data.replace((/["']/g), '')).replace((/^\/(https*:\/)/), '$1/');
          datauriDict[data] = datauriDict[data] || {};
          datauriDict[data][error] = null;
          break;
        case 3:
          /* handle null case where there are no external resources to retrieve */
          if (!Object.keys(datauriDict || {}).length) {
            mode += 1;
            onEventError2();
            return;
          }
          onEventReady = utility2.untilReady(onEventError2);
          onEventReady.remaining += Object.keys(datauriDict).length;
          utility2.ajaxMultiUrls2({
            cache: options.options.cache,
            cachePrefix: options.options.cachePrefix,
            resultType: 'binary',
            urlList: Object.keys(datauriDict)
          }, function (error, data) {
            mode = 3;
            onEventError2(error, data);
            onEventReady(error);
          });
          break;
        case 4:
          Object.keys(datauriDict[data.options.url0]).forEach(function (match) {
            options.data = options.data.replace(
              new RegExp(match.replace((/(\W)/g), '\\$1'), 'g'),
              'url(\n"data:' + utility2.mimeLookup(data.options.url0) + ';base64,'
                + data.data.toString('base64') + '"\n)'
            );
          });
          break;
        default:
          onEventError(error);
        }
      };
      onEventError2();
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
      if (state.modeExtra && state.modeNodejs) {
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
      /* middleware0Security - basic auth */
      state.securityBasicAuthSecret = state.securityBasicAuthSecret
        || process.env.BASIC_AUTH_SECRET
        || utility2.uuid4();
      /* middleware1LoggingDefault */
      state.middleware1LoggingDefault = state.middleware1LoggingDefault
        || required.connect_logger('dev');
      /* init server */
      /* defer local tests until server is listening on state.serverPort */
      utility2.readyUtility2.remaining += 1;
      /* indicate server is ready */
      utility2.serverListen(state.serverPort, utility2.readyUtility2);
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

    '_router1LoggingDict_/_ignore_test': function (onEventError) {
      /*
        this function tests router1LoggingDict_/'s ignore handling behavior
      */
      utility2.ajax({ url: '/favicon.ico' }, function () {
        onEventError();
      });
    },

    'router2SecurityDict_/': function (request, response, next) {
      /*
        this function handles default server security
      */
      /* security - https redirect */
      if (state.modeSecurityHttpsRedirect !== false
          && utility2.securityHttpsRedirect(request, response)) {
        return;
      }
      /* security - basic auth passed */
      if (request.urlPathNormalized === '/' || utility2.securityBasicAuthValidate(request)) {
        next();
        return;
      }
      /* security - basic auth failed */
      utility2.serverRespond(request, response, 303, {
        data: '/signin?redirect=' + encodeURIComponent(request.url)
      });
    },

    'router2SecurityDict_/public': function (request, response, next) {
      /*
        this function grants public access to the /public path
      */
      next();
    },

    'router2SecurityDict_/signin': function (request, response, next) {
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

    '_router2SecurityDict_/signin_default_test': function (onEventError) {
      /*
        this function tests router2SecurityDict_/signin's default handling behavior
      */
      var onEventReady;
      onEventReady = utility2.untilReady(onEventError);
      /* test https redirect */
      onEventReady.remaining += 1;
      utility2.ajax({ url: '/signin?httpsRedirect=1' }, function (error) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error, error);
          onEventReady();
        }, onEventReady);
      });
      /* test failed signin */
      onEventReady.remaining += 1;
      utility2.ajax({ url: '/signin?basicAuthFail=1' }, function (error) {
        utility2.tryCatch(function () {
          utility2.assert(error instanceof Error, error);
          onEventReady();
        }, onEventReady);
      });
      /* test successful signin */
      onEventReady.remaining += 1;
      utility2.ajax({ url: '/signin?redirect=%2Ftest%2Ftest.json' }, function (error, data) {
        utility2.tryCatch(function () {
          utility2.assert(!error, error);
          utility2.assert(data === '"hello test"', data);
          onEventReady();
        }, onEventReady);
      });
    },

    'router3CacheDict_/public/utility2': function (request, response, next) {
      /*
        this function grants public access to the /public path
      */
      response.setHeader('cache-control', 'public, max-age=31536000');
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

    '_router4ProxyDict_/proxy.ajax_default_test': function (onEventError) {
      /*
        this function tests router4ProxyDict_/proxy.ajax's default handling behavior
      */
      utility2.ajax({
        url: state.localhost + '/proxy/proxy.ajax/' + state.localhost + '/test/test.json'
      }, function (error, data) {
        utility2.tryCatch(function () {
          utility2.assert(!error, error);
          utility2.assert(data === '"hello test"', data);
          onEventError();
        }, onEventError);
      });
    },

    'router5MainDict_/': function (request, response, next) {
      /*
        this function handles the main page
      */
      if (request.urlPathNormalized === '/') {
        utility2.serverRespond(request, response, 200, {
          contentType: 'text/html',
          data: state.fsWatchDict['/main.html'].content
        });
        return;
      }
      next();
    },

    'router5MainDict_/test/report.upload': function (request, response, next) {
      /*
        this function receives and parses uploaded test reports
      */
      utility2.streamReadAll(request, utility2.jsonParseHandler(function (error, data) {
        var file1, file2, onEventError2;
        if (error instanceof Error) {
          next(error);
          return;
        }
        response.end();
        data = data || {};
        state.testSuiteList = state.testSuiteList || [];
        state.testSuiteList = state.testSuiteList.concat(data.testSuiteList || []);
        /* merge global.__coverage with uploaded code coverage object */
        Object.keys(data.coverage || {}).forEach(function (key) {
          file1 = global.__coverage__[key];
          file2 = data.coverage[key];
          if (file1) {
            /* remove derived info */
            delete file1.l;
            Object.keys(file2.s).forEach(function (key) {
              file1.s[key] += file2.s[key];
            });
            Object.keys(file2.f).forEach(function (key) {
              file1.f[key] += file2.f[key];
            });
            Object.keys(file2.b).forEach(function (key) {
              file2.b[key].forEach(function (count, ii) {
                file1.b[key][ii] += count;
              });
            });
          }
        });
        onEventError2 = state.browserTestCallbackDict[data.testCallbackId];
        if (onEventError2) {
          /* check for failures in test results */
          onEventError2(((data && data.testSuiteList) || []).some(function (testSuite) {
            return testSuite && testSuite.failures;
          })
            /* tests failed */
            ? new Error('tests failed')
            /* tests passed */
            : null);
        }
      }));
    },

    '_router5MainDict_/test/report.upload_error_test': function (onEventError) {
      /*
        this function tests router5MainDict_/test/report.upload's error handling behavior
      */
      utility2.testMock(onEventError, [
        [utility2, { streamReadAll: function (_, onEventError) {
          onEventError(null, 'syntax error');
        } }],
        [state.router0TestDict, {
          '/test/report.upload': local['router5MainDict_/test/report.upload']
        }]
      ], function (onEventError) {
        state.middleware0Test({ url: '/test/report.upload' }, {}, function (error) {
          utility2.assert(error instanceof Error, error);
          onEventError();
        });
      });
    },

    'router5MainDict_/test/test.echo': function (request, response) {
      /*
        this function echoes the request back to the response
      */
      if (!response.headersSent) {
        response.writeHead(200, { 'content-type': 'text/plain' });
      }
      response.write(request.method + ' ' + request.url + ' http/' + request.httpVersion
        + '\n');
      Object.keys(request.headers).forEach(function (name) {
        response.write(name + ': ' + request.headers[name] + '\n');
      });
      response.write('\n');
      /* optimization - stream data */
      request.pipe(response);
    },

    'router5MainDict_/test/test.timeout': function (request, response, next) {
      /*
        this function responds after state.timeoutDefault milliseconds
      */
      setTimeout(function () {
        response.end();
      }, request.urlParams.timeout || state.timeoutDefault);
    },

    '_router5MainDict_/test/test.timeout_default_test': function (onEventError) {
      /*
        this function tests router5MainDict_/test/test.timeout's default handling behavior
      */
      /* test signin's default handling behavior */
      utility2.ajax({ url: '/test/test.timeout?timeout=1' }, function (error) {
        utility2.assert(!error);
        onEventError();
      });
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
      response.setHeader('content-type', 'text/event-stream');
      /* set retry interval to state.timeoutDefault */
      response.write('retry: ' + state.timeoutDefault + '\n\n');
      list = state.testWatchList;
      /* limit max number of server-sent events */
      if (list.length >= 8) {
        list.shift();
      }
      list.push(response);
    },

    'router6FileDict_/public': function (request, response, next) {
      /*
        this function serves public files
      */
      utility2.serverRespondFile(response, process.cwd() + request.urlPathNormalized, next);
    },

    '_router6FileDict_/public_error_test': function (onEventError) {
      /*
        this function tests router6FileDict_/public's error handling behavior
      */
      utility2.ajax({ url: '/public/' + utility2.uuid4() }, function (error) {
        utility2.assert(error instanceof Error);
        onEventError();
      });
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

    'router6FileDict_/sandbox': function (request, response, next) {
      /*
        this function serves files from sandbox
      */
      var ii, fileList;
      fileList = Object.keys(state.fsWatchDict);
      for (ii = 0; ii < fileList.length; ii += 1) {
        if (fileList[ii] === request.urlPathNormalized) {
          utility2.serverRespond(request, response, 200, {
            data: state.fsWatchDict[fileList[ii]].content
          });
          return;
        }
      }
      next();
    },

    'router6FileDict_/test/test.png': function (request, response) {
      /*
        this function serves the file test.png
      */
      utility2.serverRespond(request, response, 200, {
        data: new Buffer(
          'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAA'
            + 'AApJREFUCB1jYAAAAAIAAc/INeUAAAAASUVORK5CYII=',
          'base64'
        )
      });
    },

    'router6FileDict_/test/test.css': function (request, response) {
      /*
        this function serves the file test.css
      */
      utility2.serverRespond(request, response, 200, {
        data: utility2.scriptLint('test.css', 'body { background-image:url("test.png"); }')
      });
    },

    'router6FileDict_/test/test.html': function (request, response) {
      /*
        this function serves the file test.html
      */
      utility2.serverRespond(request, response, 200, {
        data: utility2.templateFormat(state.fsWatchDict['/test/test.html'].content, {
          state: JSON.stringify({
            testModuleDict: { utility2: true },
            timeoutDefault: state.timeoutDefault
          })
        })
      });
    },

    'router6FileDict_/test/test.js': function (request, response) {
      /*
        this function serves the file test.js
      */
      utility2.serverRespond(request, response, 200, { data: 'console.log("hello test");' });
    },

    'router6FileDict_/test/test.json': function (request, response) {
      /*
        this function responds with the application/json string '"hello test"'
      */
      utility2.serverRespond(request, response, 200, { data: '"hello test"' });
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
            if (path.length <= 4096) {
              path = (/[^#&?]*/).exec(encodeURI(path))[0];
              if (path && path.length <= 256 && !(/\.\/|\.$/).test(path)) {
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

    __createMiddleware_error_test: function (onEventError) {
      /*
        this function tests _createMiddleware's error handling behavior
      */
      state.onEventErrorDefaultIgnoreList.push(
        '_createMiddleware request handler - invalid url /public/../foo'
      );
      utility2.ajax({
        url: '/public/../foo'
      }, function (error) {
        utility2.assert(error instanceof Error);
        onEventError();
      });
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
        /* call error handling middleware */
        case -1:
          utility2.serverRespond(request, response, 500, { error: error });
          break;
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
          next();
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

    securityFromLocalhost: function (request) {
      /*
        this function checks if the request originated from localhost
      */
      return (/^(?::1|127.0.0.1|localhost)\b/).test(request.headers.host);
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
        if (options.data) {
          response.setHeader('location', options.data);
        }
        break;
      /* 401 unauthorized */
      case 401:
        response.setHeader('www-authenticate', 'Basic realm="Authorization Required"');
        break;
      /* 500 internal server error */
      case 500:
        if (options.error) {
          utility2.onEventErrorDefault(options.error);
          options.contentType = options.contentType || 'text/plain';
          options.data = utility2.errorStack(options.error);
        }
        break;
      }
      if (!response.headersSent) {
        response.statusCode = statusCode;
        response.setHeader('content-type', options.contentType
          || utility2.mimeLookup(request.urlPathNormalized) || 'text/plain');
      }
      response.end(typeof options.data === 'string' || Buffer.isBuffer(options.data)
        ? options.data
        : String(options.data));
    },

    serverRespondFile: function (response, file, next) {
      /*
        this function serves static files
      */
      response.setHeader('content-type', utility2.mimeLookup(file)
        || 'application/octet-stream');
      required.fs.createReadStream(file).on('error', function () {
        /* security - don't leak filesystem info on error */
        next();
      }).pipe(response);
    },

    serverListen: function (port, onEventListen) {
      /*
        this function makes the listen on the specified port, if not already listening,
        and then calls the onEventListen callback
      */
      /* create a random port from 32768 to 65535, inclusive, as needed */
      port = Number(port === 'random' ? utility2.serverPortRandom() : port);
      if (!port) {
        onEventListen();
        return;
      }
      /* if already listening on port, then simply call onEventListen */
      state.serverListenDict = state.serverListenDict || {};
      if (state.serverListenDict[port]) {
        /* call onEventListen */
        onEventListen();
        return;
      }
      state.serverListenDict[port] = true;
      /* set state.serverPort as needed */
      state.serverPort = state.serverPort === 'random' ? port : state.serverPort || port;
      /* set state.server with a new http server as needed */
      state.server = state.server || required.http.createServer(function (request, response) {
        utility2.middlewareApplication(request, response, function (error) {
          utility2.serverRespond(request, response, error ? 500 : 404, { error: error });
        });
      });
      /* listen on specified port */
      utility2.jsonLog('serverListen - listening on port ' + port);
      state.server.listen(port, function () {
        if (port === state.serverPort) {
          state.localhost = state.localhost || 'http://localhost:' + state.serverPort;
          state.serverListened = true;
        }
        /* call onEventListen */
        onEventListen();
      });
    },

    _serverListen_nullCase_test: function (onEventError) {
      /*
        this function tests serverListen's null case handling behavior
      */
      utility2.serverListen(null, onEventError);
    },

    _serverListen_reListen_test: function (onEventError) {
      /*
        this function tests serverListen's re-listen handling behavior
      */
      utility2.serverListen(state.serverPort, onEventError);
    }

  };
  local._init();
}());

