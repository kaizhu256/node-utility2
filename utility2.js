#!/usr/bin/env node
/*jslint browser: true, indent: 2, maxerr: 8, node: true, nomen: true, regexp: true, todo: true, unparam: true*/
/*global global, required, state, underscore, utility2, $*/
/*
utility2.js
standalone, browser test and code coverage framework for nodejs
*/



(function module1InitShared() {
  /*
    this shared module inits utility2
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.module1InitShared',

    _init: function () {
      /* export global objects */
      if (typeof window === 'object') {
        window.global = window.global || window;
      }
      /* global required object */
      global.required = global.required || {};
      /* global utility2 object */
      global.utility2 = required.utility2 = global.utility2 || {};
      local.stateDefault(global, {
        /* global dummy module object */
        module: null,
        /* global state object */
        state: {
          /* javascript platform unknown */
          javascriptPlatform: 'unknown',
          /* list of test-generated errors to be ignored */
          onEventErrorDefaultIgnoreList: [],
          /* phantomjs test url dictionary of test id's */
          phantomjsTestUrlDict: {},
          /* test suite list */
          testSuiteList: [],
          /* default timeout */
          timeoutDefault: 30000
        },
        /* global utility2 object */
        utility2: {
          stateDefault: local.stateDefault
        }
      });
      /* debug print */
      global[['debug', 'Print'].join('')] = utility2._zxqjDp = function (arg) {
        /*
          this internal function is used for temporary debugging,
          and jslint will nag you to remove it if used
        */
        console.log('\n\n\n\ndebug' + 'Print');
        console.log.apply(console, arguments);
        console.log();
        /* return arg for inspection */
        return arg;
      };
      /* javascript platform - nodejs */
      if (global.process && process.versions && process.versions.node) {
        state.javascriptPlatform = 'nodejs';
        state.modeNodejs = true;
        utility2.require = utility2.require || require;
      }
      /* javascript platform - browser */
      if (state.modeBrowser || (global.document && global.jQuery)) {
        state.javascriptPlatform = 'browser';
        state.modeBrowser = true;
        state.modeExtra = true;
        state.modeInit = 2;
        /* set browser test mode */
        state.modeTest = (/\bmodeTest=\w/).test(global.location && global.location.hash);
      }
      /* init module */
      utility2.assert = local.assert;
      local.initModule(module, local);
    },

    _initOnce: function () {
      /* utility2 ready */
      state.onEventReady = state.onEventReady
        || utility2.onEventMulti(utility2.nop, function () {
          utility2.deferCallback('untilReadyUtility2', 'ready');
        });
    },

    __initOnce_default_test: function (onEventError) {
      /*
        this function tests _initOnce's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: { onEventReady: null } }],
        [utility2, { deferCallback: utility2.nop, onEventMulti: utility2.callArg1 }]
      ], function (onEventError) {
        local._initOnce();
        onEventError();
      });
    },

    __init_browser_test: function (onEventError) {
      /*
        this function tests _init's browser handling behavior
      */
      utility2.testMock(onEventError, [
        [global, {
          require: null,
          required: null,
          state: { modeBrowser: true },
          window: {}
        }],
        [local, { initModule: utility2.nop }],
        [utility2, { require: null }]
      ], function (onEventError) {
        local._init();
        onEventError();
      });
    },

    assert: function (passed, message) {
      /*
        this function throws an error if the assertion fails
      */
      if (!passed) {
        throw new Error(message ? 'assertion error - ' + message : 'assertion error');
      }
    },

    _assert_default_test: function (onEventError) {
      /*
        this function tests assert's default handling behavior
      */
      /* test successful assertion */
      utility2.assert(true);
      /* test failed assertion */
      utility2.tryCatch(function () {
        utility2.assert(false);
      }, function (error) {
        utility2.assert(error instanceof Error);
      });
      /* test failed assertion with message */
      utility2.tryCatch(function () {
        utility2.assert(false, '_assert_default_test');
      }, function (error) {
        utility2.assert(error instanceof Error);
      });
      onEventError();
    },

    callArg0: function (callback) {
      /*
        this function calls the callback in arg position 0
      */
      if (callback) {
        callback();
      }
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
      if (callback) {
        callback();
      }
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
      if (callback) {
        callback();
      }
    },

    _callArg2_default_test: function (onEventError) {
      /*
        this function tests callArg2's default handling behavior
      */
      utility2.callArg2(null, null, function () {
        onEventError();
      });
    },

    commentShebang: function (script) {
      /*
        this function comments out the shebang in a script
        usage example:
        utility2.commentShebang('#!/usr/bin/env node\nconsole.log("commentShebang");\n');
      */
      return script.replace(/(^#.*)/, '/*$1*/');
    },

    _debug_print_default_test: function (onEventError) {
      /*
        this function tests debug print's default handling behavior
      */
      utility2.testMock(onEventError, [], function (onEventError) {
        utility2._zxqjDp('_debug_print_default_test');
        onEventError();
      });
    },

    deferCallback: function (key, mode, callback) {
      /*
        this function defers the callback until a ready-state is given
      */
      var self;
      self = state.deferCallbackDict = state.deferCallbackDict || {};
      self = self[key] = self[key] || { callbackList: [] };
      switch (mode) {
      case 'defer':
        /* optimization - fast callback if ready-state */
        if (self.modeReady) {
          callback(self.error);
          return;
        }
        /* slow deferred callback */
        self.callbackList.push(callback);
        /* set timeout for deferred callback*/
        utility2.onEventTimeout(function (error) {
          var ii;
          ii = self.callbackList.indexOf(callback);
          if (ii >= 0) {
            self.callbackList.splice(ii, 1)[0](error);
          }
        }, state.timeoutDefault, 'deferCallback ' + key);
        break;
      case 'delete':
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
      utility2.testMock(onEventError, [
        [global, { setTimeout: utility2.callArg0 }]
      ], function (onEventError) {
        var key;
        key = utility2.uuid4();
        utility2.deferCallback(key, 'defer', function (error) {
          utility2.assert(error instanceof Error);
          utility2.assert(error.code === 'ETIMEDOUT');
          utility2.deferCallback(key, 'delete');
          onEventError();
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
      utility2.assert(utility2.echo('_echo_default_test') === '_echo_default_test');
      onEventError();
    },

    evalOnEventError: function (file, script, onEventError) {
      /*
        this function evals the script in a try-catch block with error handling
      */
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
      utility2.evalOnEventError(
        'test.js',
        '"_evalOnEventError_default_test"',
        function (error, data) {
          utility2.assert(data === '_evalOnEventError_default_test');
          onEventError();
        }
      );
    },

    _evalOnEventError_syntaxError_test: function (onEventError) {
      /*
        this function tests evalOnEventError's syntax error handling behavior
      */
      utility2.evalOnEventError('error.js', 'syntax error', function (error) {
        utility2.assert(error instanceof Error);
        onEventError();
      });
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
        exports.__dirname = exports.__dirname || required.path.dirname(exports.__filename);
        state.moduleCacheDict = state.moduleCacheDict || {};
        if (!state.moduleCacheDict[exports.__filename]) {
          state.moduleCacheDict[exports.__filename] = module;
          /* watch module */
          utility2.fsWatch({
            actionList: ['lint', 'eval', 'cache'],
            exports: exports,
            file: exports.__filename
          }, utility2.onEventErrorDefault);
        }
      }
      /* init local2._initOnce */
      state.initOnceDict = state.initOnceDict || {};
      if (local2._initOnce && !state.initOnceDict[local2._name]) {
        state.initOnceDict[local2._name] = true;
        local2._initOnce();
      }
      /* init test */
      if (state.modeInit > 1) {
        /* wait until utility2 is ready before running tests */
        utility2.deferCallback('untilReadyUtility2', 'defer', function () {
          utility2.testLocal(local2);
        });
      }
    },

    _initModule_default_test: function (onEventError) {
      /*
        this function tests initModule's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { required: {}, state: {} }]
      ], function (onEventError) {
        utility2.initModule(null, {
          /* test class handling behavior */
          _Foo: utility2.nop,
          /* test class prototype handling behavior */
          _Foo_prototype_bar: utility2.nop,
          /* test dict handling behavior */
          _fooDict_bar: true,
          /* test list handling behavior */
          _fooList_bar: true,
          _name: 'utility2._initModule_default_test'
        });
        onEventError();
      });
    },

    jsonLog: function (argList) {
      /*
        this function uses JSON.stringify to give a consistent print format
        across various javascript platforms
      */
      console.log(argList.map(function (arg) {
        return typeof arg === 'string' ? arg : utility2.jsonStringifyCircular(arg);
      }).filter(function (arg) {
        return arg !== undefined;
      }).join(', '));
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
        this function tests jsonParseOrError's syntax error handling behavior.
      */
      utility2.assert(utility2.jsonParseOrError('syntax error') instanceof Error);
      onEventError();
    },

    jsonStringifyCircular: function (value, replacer, space) {
      /*
        this function JSON.stringify's the value, ignoring circular references.
        documentation for the arguments provided @
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_native_JSON.
      */
      return JSON.stringify(local._jsonStringifyCircularRecurse(value, []), replacer, space);
    },

    _jsonStringifyCircular_default_test: function (onEventError) {
      /*
        this function tests jsonStringifyCircular's default handling behavior.
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
        this function recurses the value looking for circular objects
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
      /* the value is an array */
      if (Array.isArray(value)) {
        return value.map(function (element) {
          return local._jsonStringifyCircularRecurse(element, circularList);
        });
      }
      /* the value is an object */
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
        this function tests jsonStringifyOrdered's default handling behavior.
      */
      /* test undefined handling behavior */
      utility2.assert(utility2.jsonStringifyOrdered(undefined) === undefined);
      /* test function handling behavior */
      utility2.assert(utility2.jsonStringifyOrdered(utility2.nop) === undefined);
      /* test default handling behavior */
      console.assert(utility2.jsonStringifyOrdered({
        ee: {},
        dd: [],
        cc: utility2.nop,
        bb: 2,
        aa: 1
      }, 'ordered') === '{"aa":1,"bb":2,"dd":[],"ee":{}}');
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
        /* sort dictionary keys */
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
          console.error('\n_scriptLintCss\n' + result + '\n');
        }
        break;
      /* lint js file */
      case '.js':
      case '.json':
        if (!global.__coverage__ && required.jslint && !required.jslint(script)) {
          console.error('\n_scriptLintJs\n' + file);
          required.jslint.errors.forEach(function (error, ii) {
            result = '#' + String(ii + 1) + ' ';
            while (result.length < 4) {
              result = ' ' + result;
            }
            if (error) {
              console.error(result + error.reason);
              console.error('    ' + (error.evidence).trim() + ' \/\/ Line ' + error.line
                + ', Pos ' + error.character);
            }
          });
          console.error();
        }
        break;
      }
      return script;
    },

    _scriptLint_error_test: function (onEventError) {
      /*
        this function tests scriptLint's error handling behavior
      */
      utility2.testMock(onEventError, [
        [console, { error: utility2.nop }],
        [global, { __coverage__: null }]
      ], function (onEventError) {
        /* test css error handling behavior */
        utility2.scriptLint('foo.css', 'syntax error');
        /* test js error handling behavior */
        utility2.scriptLint('foo.js', 'syntax error');
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
          result = result.toString();
        }
        break;
      }
      return script;
    },

    _scriptMinify_default_test: function (onEventError) {
      /*
        this function tests scriptMinify's defult handling behavior
      */
      utility2.scriptMinify('foo.css', 'foo {}');
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
        else it will print the data.
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
        /* print error.message and error.stack */
        console.error('\nonEventErrorDefault - error\n'
          + (error.stack || error.message || error)
          + '\n');
      /* print data if it's defined and not an empty string */
      } else if (data !== undefined && data !== '') {
        /* debug data */
        state.debugData = data;
        utility2.jsonLog(['\nonEventErrorDefault - data\n'
          + utility2.jsonStringifyCircular(data, null, 2) + '\n']);
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
      state.onEventErrorDefaultIgnoreList.push(error.message);
      utility2.onEventErrorDefault(error);
      onEventError();
    },

    onEventMulti: function (onEventError, onEventFinish) {
      /*
        this function creates a multi-callback object
      */
      var self;
      self = function (error, data) {
        onEventError(error, data);
        self.remaining -= 1;
        if (self.remaining === 0) {
          onEventFinish();
        }
      };
      self.remaining = 0;
      return self;
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

    _setTimeout: setTimeout,

    stateDefault: function (options, defaults) {
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
        if (defaults2
            && typeof defaults2 === 'object'
            && options2
            && typeof options2 === 'object'
            && !Array.isArray(options2)) {
          local.stateDefault(options2, defaults2);
        }
      });
      return options;
    },

    _stateDefault_default_test: function (onEventError) {
      /*
        this function tests stateDefault's default handling behavior
      */
      var options;
      options = utility2.stateDefault(
        { aa: 1, bb: {}, cc: [] },
        { aa: 2, bb: { cc: 2 }, cc: [1, 2] }
      );
      utility2.assert(options.aa === 1);
      utility2.assert(options.bb.cc === 2);
      utility2.assert(JSON.stringify(options.cc) === '[]');
      onEventError();
    },

    stateOverride: function (state, override, backup, depth) {
      /*
        this function recursively overrides the state object with the override object,
        and optionally saves the original state object to the backup object,
        and optionally accepts the depth recursion limit
      */
      local._stateOverrideRecurse(state, override, backup || {}, depth || Infinity);
      return state;
    },

    _stateOverrideRecurse: function (state, override, backup, depth) {
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
        local._stateOverrideRecurse(state2, override2, override2, depth - 1);
      });
    },

    _stateOverride_default_test: function (onEventError) {
      /*
        this function tests stateOverride's default handling behavior
      */
      var backup, state;
      backup = {};
      /* test override */
      state = utility2.stateOverride(
        { aa: 1, bb: { cc: 2 }, dd: [3, 4], ee: { ff: { gg: 5, hh: 6 } } },
        { aa: 2, bb: { dd: 3 }, dd: [4, 5], ee: { ff: { gg: 6 } } },
        backup,
        2
      );
      utility2.assert(state.aa === 2);
      utility2.assert(state.bb.cc === 2);
      utility2.assert(state.bb.dd === 3);
      utility2.assert(JSON.stringify(state.dd) === '[4,5]');
      utility2.assert(state.ee.ff.gg === 6);
      utility2.assert(state.ee.ff.hh === undefined);
      /* test backup */
      utility2.assert(backup.aa === 1);
      utility2.assert(backup.bb.cc === undefined);
      utility2.assert(backup.bb.dd === undefined);
      utility2.assert(JSON.stringify(backup.dd) === '[3,4]');
      utility2.assert(backup.ee.ff.gg === 5);
      utility2.assert(backup.ee.ff.hh === 6);
      /* test restore */
      utility2.stateOverride(state, backup);
      utility2.assert(state.aa === 1);
      utility2.assert(state.bb.cc === 2);
      utility2.assert(state.bb.dd === undefined);
      utility2.assert(JSON.stringify(state.dd) === '[3,4]');
      utility2.assert(state.ee.ff.gg === 5);
      utility2.assert(state.ee.ff.hh === 6);
      onEventError();
    },

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
      utility2.assert(utility2.stringToEmptyLine('foo\nbar1\nbar2\nbaz\n', (/^bar.*$/gm))
        === 'foo\n\n\nbaz\n');
      onEventError();
    },

    testMock: function (onEventError, mockList, test) {
      /*
        this function mocks the state given in the mockList while running the test callback
      */
      var onEventError2;
      onEventError2 = function (error) {
        /* restore state */
        mockList.reverse().forEach(function (mock) {
          utility2.stateOverride(mock[0], mock[2], null, 1);
        });
        if (error) {
          onEventError(error);
        }
      };
      /* prepend mandatory mocks for async / unsafe functions */
      mockList = [
        /* suppress console.log */
        [console, { log: utility2.nop }],
        [global, { setInterval: local._throwError, setTimeout: local._throwError }],
        [utility2, { exit: local._throwError, shell: local._throwError }],
        [global.process || {}, { exit: local._throwError }]
      ].concat(mockList);
      utility2.tryCatch(function () {
        /* mock state */
        mockList.forEach(function (mock) {
          mock[2] = {};
          utility2.stateOverride(mock[0], mock[1], mock[2], 1);
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
        [global, { state: { foo: 1 } }]
      ], function (onEventError) {
        utility2.testMock(function (error) {
          utility2.assert(error instanceof Error);
          utility2.assert(state.foo === 1);
          onEventError();
        }, [
          [state, { foo: 2 }]
        ], function () {
          throw new Error();
        });
      });
    },

    testLocal: function (local2) {
      /*
        this function runs tests on the module's local2 object
      */
      var onEventFinish, testList, testSuite;
      if (!(state.modeTest || local2._modeTest)
          || (state.testModuleList
          && state.testModuleList.indexOf(local2._name.split('.')[0]) < 0)) {
        return;
      }
      /* list all tests in local2 */
      testList = Object.keys(local2).filter(function (test) {
        return test.slice(-5) === '_test';
      });
      if (testList.length === 0) {
        return;
      }
      /* create test suite for local2 */
      testSuite = {
        failures: 0,
        name: state.javascriptPlatform + '.' + local2._name,
        passed: 0,
        testCaseList: {},
        tests: testList.length,
        time: 0
      };
      /* add test suite to global list of test suites */
      state.testSuiteList.push(testSuite);
      state.testSuiteRemaining = state.testSuiteRemaining || 0;
      state.testSuiteRemaining += 1;
      /* this callback runs when all tests are finished */
      onEventFinish = utility2.onEventMulti(utility2.nop, function () {
        testSuite.passed = testSuite.tests - testSuite.failures;
        state.testSuiteRemaining -= 1;
        if (state.testSuiteRemaining === 0) {
          /* assert state.onEventErrorDefaultIgnoreList is empty */
          utility2.assert(state.onEventErrorDefaultIgnoreList.length === 0);
          state.testSuiteRemaining = 0;
          utility2.testReport();
        }
      });
      onEventFinish.remaining = testList.length;
      /* asynchronously run tests in local2 */
      testList.forEach(function (testName) {
        var onEventError2, remaining, test, timeout;
        /* handle test result */
        onEventError2 = function (error) {
          /* clear timeout for test */
          clearTimeout(timeout);
          /* handle test failure */
          if (error) {
            console.error('\ntestLocal - test failed, ' + test.name);
            utility2.onEventErrorDefault(error);
            test.failure = error.stack || error.message || error;
            testSuite.failures += 1;
          }
          /* assert test callback was not called multiple times */
          remaining -= 1;
          utility2.assert(remaining === 0, 'testLocal - ' + test.name
            + "'s callback called multiple times");
          /* record time it took for test to run */
          test.time = Date.now() - test.time;
          testSuite.time = Math.max(test.time, testSuite.time);
          local._setTimeout.call(global, onEventFinish);
        };
        remaining = 1;
        /* create test */
        test = testSuite.testCaseList[testName] = {
          name: testSuite.name + '.' + testName,
          time: Date.now()
        };
        /* set timeout for test */
        timeout = utility2.onEventTimeout(onEventError2, state.timeoutDefault, 'testLocal');
        utility2.tryCatch(function () {
          /* run test */
          local2[testName](onEventError2);
          /* catch synchronously thrown errors */
        }, onEventError2);
      });
    },

    _testLocal_error_test: function (onEventError) {
      /*
        this function tests testLocal's error handling behavior
      */
      utility2.testMock(onEventError, [
        [console, { error: utility2.nop }],
        [local, { _setTimeout: utility2.callArg0 }],
        [state, { testSuiteList: [], testSuiteRemaining: 0 }],
        [utility2, { onEventTimeout: utility2.nop, testReport: utility2.nop }]
      ], function (onEventError) {
        utility2.testLocal({
          _error_test: function (onEventError) {
            onEventError(new Error());
          },
          _name: 'utility2._testLocal_error_test'
        });
        onEventError();
      });
    },

    _testLocal_nullCase_test: function (onEventError) {
      /*
        this function tests testLocal's null case handling behavior
      */
      /* test testMode disabled handling behavior */
      utility2.testMock(onEventError, [
        [state, { modeTest: null }]
      ], function (onEventError) {
        utility2.testLocal({});
      });
      /* test empty testList handling behavior */
      utility2.testLocal({ _modeTest: true, _name: 'utility2._testLocal_nullCase_test' });
      onEventError();
    },

    testReport: function () {
      /*
        this function creates a test report
      */
      utility2.jsonLog(['\ntestReport']);
      state.testReport = state.testReport || { failures: 0, passed: 0 };
      state.testSuiteList.sort(function (arg1, arg2) {
        arg1 = arg1.name;
        arg2 = arg2.name;
        return arg1 < arg2 ? -1 : arg1 > arg2 ? 1 : 0;
      }).forEach(function (testSuite) {
        state.testReport.failures += testSuite.failures;
        state.testReport.passed += testSuite.passed;
        utility2.jsonLog([('        ' + (testSuite.time || 0)).slice(-8) + ' ms | '
          + testSuite.failures + ' failed | '
          + (Object.keys(testSuite.testCaseList).length - testSuite.failures)
          + ' passed in ' + testSuite.name]);
      });
      utility2.jsonLog([]);
      local._testReportBrowser();
      local._testReportNodejs();
      state.testSuiteList.length = 0;
    },

    _testReport_default_test: function (onEventError) {
      /*
        this function tests testReport's default handling behavior
      */
      utility2.testMock(onEventError, [
        [local, { _testReportBrowser: utility2.nop, _testReportNodejs: utility2.nop }],
        [state, { testSuiteList: [] }]
      ], function (onEventError) {
        utility2.testReport();
        onEventError();
      });
    },

    _testReportBrowser: function () {
      if (state.modeBrowser) {
        /* upload test report */
        utility2.ajax({
          data: JSON.stringify({
            coverage: global.__coverage__,
            testCallbackId: state.testCallbackId,
            testSuiteList: state.testSuiteList
          }),
          url: '/test/report.upload'
        }, utility2.onEventErrorDefault);
      }
    },

    __testReportBrowser_default_test: function (onEventError) {
      /*
        this function tests _testReportBrowser's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: { modeBrowser: true } }],
        [utility2, { ajax: utility2.nop }]
      ], function (onEventError) {
        local._testReportBrowser();
        onEventError();
      });
    },

    _testReportNodejs: function () {
      /*jslint stupid: true*/
      if (state.modeNodejs && state.modeNpmTest) {
        /* write test report */
        required.fs.writeFileSync(state.tmpdir + '/test-report.xml', local._testReportXml());
        /* exit */
        process.exit();
      }
    },

    _testReportXml: function () {
      /*
        this function creates a test report in junit-xml format
      */
      var xml;
      xml = '\n<testsuites>\n';
      state.testSuiteList.sort(function (arg1, arg2) {
        arg1 = arg1.name;
        arg2 = arg2.name;
        return arg1 < arg2 ? -1 : arg1 > arg2 ? 1 : 0;
      }).forEach(function (testSuite) {
        state.testFailures = state.testFailures || 0;
        state.testFailures += testSuite.failures || 0;
        xml += '<testsuite ';
        ['failures', 'name', 'passed', 'tests'].forEach(function (attribute) {
          xml += attribute + '="' + testSuite[attribute] + '" ';
        });
        Object.keys(testSuite.testCaseList).forEach(function (test) {
          test = testSuite.testCaseList[test];
          xml += '<testcase ';
          ['name', 'time'].forEach(function (attribute) {
            xml += attribute + '="' + test[attribute] + '" ';
          });
          xml += '>';
          xml += (test.failure ? '<failure><![CDATA[' + test.failure + ']]></failure>\n' : '');
          xml += '</testcase>\n';
        });
        xml += '</testsuite>\n';
      });
      xml += '</testsuites>\n';
      return xml;
    },

    _testSetTimeout: setTimeout,

    _throwError: function () {
      throw new Error();
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
    this nodejs module inits the cli api
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
      /* require internal nodejs modules */
      required.child_process = required.child_process || require('child_process');
      required.fs = required.fs || require('fs');
      required.http = required.http || require('http');
      required.https = required.https || require('https');
      required.os = required.os || require('os');
      required.repl = required.repl || require('repl');
      required.stream = required.stream || require('stream');
      required.vm = required.vm || require('vm');
      /* require external npm modules */
      required.connect = required.connect || require('connect');
      required.pg = required.pg || require('pg');
      required.sqlite3 = required.sqlite3 || require('sqlite3');
      required.utility2_external = required.utility2_external || require('utility2_external');
      /* command line */
      state.modeCli = require.main === module;
      local._initPackageJson();
      local._initProcessArgv();
      local._initNpmTest();
      local._initCoverage();
      local._initTmpdir();
      local._initBootstrap();
    },

    __initOnce_default_test: function (onEventError) {
      /*
        this function tests _initOnce's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { required: {} }],
        [local, {
          _initBootstrap: utility2.nop,
          _initCoverage: utility2.nop,
          _initNpmTest: utility2.nop,
          _initPackageJson: utility2.nop,
          _initProcessArgv: utility2.nop,
          _initTmpdir: utility2.nop
        }]
      ], function (onEventError) {
        local._initOnce();
        onEventError();
      });
    },

    _initCoverage: function () {
      if (!state.coverageRegexp || process.env.npm_config_mode_coverage === '') {
        return;
      }
      global.__coverage__ = global.__coverage__ || {};
      required.istanbul = required.istanbul || require('istanbul');
      local._collector = local._collector || new required.istanbul.Collector();
      local._coverageRegexp = local._coverageRegexp || new RegExp(state.coverageRegexp);
      local._instrumenter = local._instrumenter || new required.istanbul.Instrumenter();
      required.istanbul.hook.hookRequire(function (file) {
        return local._coverageRegexp.test(file);
      }, function (code, file) {
        if (state.modeNpmTestUtility2 && !state.modeExtra) {
          code = code.replace((/\n\(function module5ExtraShared\(\) \{\n[\S\s]*/), '');
        }
        utility2.jsonLog(['instrumenting file -', file]);
        state.instrumentedFileDict = state.instrumentedFileDict || {};
        code = state.instrumentedFileDict[file]
          = local._instrumenter.instrumentSync(code, file);
        return code;
      });
      /* on exit, create coverage report */
      process.on('exit', function () {
        local._collector.add(global.__coverage__);
        /* print text report */
        required.istanbul.Report.create('text').writeReport(local._collector);
        /* create lcov and html report */
        required.istanbul.Report.create('lcov', { dir: state.tmpdir })
          .writeReport(local._collector, true);
      });
    },

    __initCoverage_default_test: function (onEventError) {
      /*
        this function tests _initCoverage's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: {} }]
      ], function (onEventError) {
        local._initCoverage();
      });
      utility2.testMock(onEventError, [
        [global, { state: { coverageRegexp: '\\bfoo\\.js$', modeNpmTestUtility2: true } }],
        [local, {
          _collector: { add: utility2.nop },
          _coverageRegexp: null,
          _instrumenter: { instrumentSync: utility2.echo }
        }],
        [process, { on: utility2.callArg1 }],
        [required, { istanbul: {
          hook: { hookRequire: function (callback1, callback2) {
            utility2.assert(callback1('foo.js') === true);
            utility2.assert(callback1('bar.js') === false);
            utility2.assert(callback2('console.log("__initCoverage_default_test");')
              === 'console.log("__initCoverage_default_test");');
          } },
          Report: { create: function () {
            return { writeReport: utility2.nop };
          } }
        } }]
      ], function (onEventError) {
        local._initCoverage();
        onEventError();
      });
    },

    _initBootstrap: function () {
      /*
        this function inits utility2 bootstrap code
      */
      if (!state.modeInit) {
        state.modeInit = 2;
        /* delete cached utility2 module */
        utility2.require.cache[module.filename] = null;
        /* reload utility2 */
        utility2.require(required.path.resolve(state.loadModule
          || (__dirname + '/utility2.js')));
        state.modeInit = 1;
      }
    },

    __initBootstrap_default_test: function (onEventError) {
      /*
        this function tests _initBootstrap's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { __dirname: '', state: {} }],
        [utility2, {
          deferCallback: utility2.nop,
          require: function () {
            return;
          }
        }]
      ], function (onEventError) {
        utility2.require.cache = {};
        local._initBootstrap();
        onEventError();
      });
    },

    _initNpmTest: function () {
      /* test utility2 */
      if (state.modeNpmTestUtility2) {
        utility2.stateDefault(state, {
          coverageRegexp: '\\butility2\\.js$',
          modeDebugProcess: true,
          modeRepl: true,
          modeNpmTest: true,
          serverPort: 'random',
          testModuleList: ['utility2'],
          tmpdir: state.modeExtra ? 'tmp' : 'tmp/core'
        });
      }
      if (state.modeNpmTest) {
        /* set test mode */
        state.modeTest = true;
        /* tmpdir */
        state.tmpdir = state.tmpdir || 'tmp';
        /* exit with non-zero code if tests failed */
        process.on('exit', function () {
          if (state.testReport && state.testReport.failures) {
            process.exit(1);
          }
        });
      }
    },

    __initNpmTest_default_test: function (onEventError) {
      /*
        this function tests _initNpmTest's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: { testReport: { failures: true } } }],
        [process, { exit: utility2.nop, on: utility2.callArg1 }]
      ], function (onEventError) {
        /* test modeNpmTest handling behavior */
        state.modeNpmTest = true;
        local._initNpmTest();
        /* test modeNpmTestUtility2 handling behavior */
        state.modeNpmTestUtility2 = true;
        local._initNpmTest();
        /* test modeNpmTestUtility2 with modeExtra handling behavior */
        state.modeExtra = true;
        state.modeNpmTestUtility2 = true;
        local._initNpmTest();
      });
      onEventError();
    },

    _initPackageJson: function () {
      /*
        this function loads package.json into memory if it exists
      */
      /* load package.json file */
      state.packageJson = state.packageJson || {};
      utility2.tryCatch(function () {
        /*jslint stupid: true*/
        state.packageJson = JSON.parse(required.fs.readFileSync(process.cwd()
          + '/package.json'));
      }, utility2.nop);
    },

    __initPackageJson_default_test: function (onEventError) {
      /*
        this function tests _initPackageJson's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: {} }]
      ], function (onEventError) {
        local._initPackageJson();
        onEventError();
      });
    },

    _initProcessArgv: function () {
      /*
        this function inits process.argv and integrates it into the state dictionary
      */
      if (!(state.modeCli || state.modeProcessArgv)) {
        return;
      }
      process.argv.forEach(function (arg, ii, argv) {
        var error, value;
        if (!(/^--[a-z]/).test(arg)) {
          return;
        }
        arg = arg.split('=');
        /* --foo=true -> state.foo = 1 */
        value = arg[1]
          || (/^--[a-z]/).test(argv[ii + 1] || '--a')
            /* --foo -> state.foo = true */
            ? 'true'
            /* --foo true -> state.foo = true */
            : argv[ii + 1];
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
      /* toggle state.modeExtra */
      state.modeExtra = state.modeExtra || state.minifyFileList || state.rollupFileList;
    },

    __initProcessArgv_default_test: function (onEventError) {
      /*
        this function tests _initProcessArgv's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { process: {}, state: {} }]
      ], function (onEventError) {
        /* test null case handling behavior */
        process.argv = ['--foo'];
        local._initProcessArgv();
        utility2.assert(state.foo === undefined);
        /* test default handling behavior */
        process.argv = ['--foo'];
        state.modeProcessArgv = true;
        local._initProcessArgv();
        utility2.assert(state.foo === true);
        process.argv = ['--foo', 'bar'];
        state.modeProcessArgv = true;
        local._initProcessArgv();
        utility2.assert(state.foo === 'bar');
        process.argv = ['--foo', '1'];
        state.modeProcessArgv = true;
        local._initProcessArgv();
        utility2.assert(state.foo === 1);
        process.argv = ['--no-foo'];
        state.modeProcessArgv = true;
        local._initProcessArgv();
        utility2.assert(state.foo === false);
        onEventError();
      });
    },

    _initTmpdir: function () {
      state.tmpdir = required.path.resolve(state.tmpdir
        || required.os.tmpdir() + '/utility2.' + encodeURIComponent(process.cwd()));
      /* create tmpdir */
      utility2.fsMkdirpSync(state.tmpdir);
    },

    __initTmpdir_default_test: function (onEventError) {
      /*
        this function tests _initTmpdir's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: {} }],
        [utility2, { fsMkdirpSync: utility2.nop }]
      ], function (onEventError) {
        local._initTmpdir();
        onEventError();
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

    _stringToCamelCase: function (text) {
      /*
        this function converts dashed names to camel case
      */
      return text.replace((/-[a-z]/g), function (match) {
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
  var local;
  local = {

    _name: 'utility2.module3InitNodejs',

    _init: function () {
      if (state.modeNodejs) {
        utility2.initModule(module, local);
      }
    },

    _initOnce: function () {
      /*jslint stupid: true*/
      /* watch package.json */
      utility2.fsWatch({
        actionList: ['lint'],
        file: utility2.__dirname + '/package.json'
      }, utility2.onEventErrorDefault);
      /* watch utility2_phantomjs.js */
      utility2.fsWatch({
        actionList: ['lint'],
        file: utility2.__dirname + '/utility2_phantomjs.js'
      }, utility2.onEventErrorDefault);
    },

    fsWatch: function (options, onEventError) {
      /*
        this function watches a file and runs specified actions if it is modified.
        usage example:
        utiliyt2.fsWatch({
          actionList: ['lint', 'eval'],
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
            /* run actions */
            options.actionList.forEach(function (action) {
              /* comment out shebang for executable scripts */
              state.fsWatchActionDict[action](options, utility2.commentShebang(content));
            });
            onEventError();
          });
        }
      };
      options.file = required.path.resolve(options.file);
      state.fsWatchDict = state.fsWatchDict || {};
      state.fsWatchDict[options.file] = options;
      required.fs.unwatchFile(options.file);
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
        utility2.fsWatchDelete(file);
        onEventError();
      });
    },

    _fsWatch_testWatch_test: function (onEventError) {
      /*
        this function tests fsWatch's testWatch handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: { testWatchList: [ { write: utility2.nop } ] } }],
        [required.fs, {
          readFile: utility2.callArg2,
          unWatchFile: utility2.nop,
          watchFile: utility2.nop
        }]
      ], function (onEventError) {
        utility2.fsWatch({ actionList: [], file: 'foo.js' }, onEventError);
      });
    },

    fsWatchActionDict_cache: function (options, content) {
      /*
        this function caches the file content
      */
      options.exports._fileContentBrowser = utility2.stringToEmptyLine(
        (state.instrumentedFileDict && state.instrumentedFileDict[options.file]) || content,
        (/^\(function module\w*Nodejs\(\) \{[\S\s]*?^\}\(\)\);$/gm)
      ).trimRight();
    },

    fsWatchActionDict_eval: function (options, content) {
      /*
        this function evals the file content
      */
      if (!options.initialized) {
        options.initialized = true;
        return;
      }
      utility2.jsonLog(['fsWatch - eval', options.file]);
      utility2.evalOnEventError(options, content, function (error) {
        utility2.onEventErrorDefault(error);
      });
    },

    _fsWatchActionDict_eval_default_test: function (onEventError) {
      /*
        this function tests fsWatchActionDict_eval's default handling behavior
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
            actionList: ['eval'],
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
          utility2.fsWatchDelete(file);
          onEventError2();
          break;
        default:
          onEventError(error);
        }
      };
      onEventError2();
    },

    fsWatchActionDict_lint: function (options, content) {
      /*
        this function css / js lints the file content
      */
      utility2.scriptLint(options.file, content);
    },

    fsWatchDelete: function (file) {
      /*
        this function deletes / unwatches the file
      */
      required.fs.unwatchFile(file);
      delete state.fsWatchDict[file];
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
    }

  };
  local._init();
}());



(function module5ExtraShared() {
  /*
    this nodejs module exports extra utilities
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.module5ExtraShared',

    _init: function () {
      if (state.modeExtra) {
        /* exports */
        global.atob = global.atob || function (text) {
          return new Buffer(text, 'base64').toString();
        };
        global.btoa = global.btoa || function (text) {
          return new Buffer(text).toString('base64');
        };
        utility2.initModule(module, local);
      }
    },

    _initOnce: function () {
      local._initBrowser();
    },

    _initBrowser: function () {
      /*
        this function runs browser-side initializations
      */
      var params;
      if (!state.modeBrowser) {
        return;
      }
      params = utility2.urlParamsParse(location.hash, '#').params;
      /* save test id identifying server-side test callback */
      state.testCallbackId = params.testCallbackId;
      /* browser test mode - watch */
      if (params.testWatch) {
        /* increment testWatch counter */
        location.hash = utility2.urlParamsSetItem(location.hash, 'testWatch',
          (Number(params.testWatch) + 1).toString(), '#');
        /* watch server for changes and reload via server-sent events */
        new global.EventSource('/test/test.watch').addEventListener('message', function () {
          location.reload();
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
      var onEventFinish;
      onEventFinish = utility2.onEventMulti(utility2.nop, onEventError);
      [100, 200, 300].forEach(function (data) {
        onEventFinish.remaining += 1;
        utility2.clearCallSetInterval(utility2.uuid4(), function (timeout) {
          if (timeout) {
            utility2.assert(timeout instanceof Error);
            utility2.assert(timeout.code === 'ETIMEDOUT');
            onEventFinish();
          }
        }, 200, data);
      });
    },

    jsonCopy: function (object) {
      /*
        this function deep copies the json object using JSON.parse(JSON.stringify(object))
      */
      return JSON.parse(JSON.stringify(object));
    },

    mimeLookup: function (file) {
      /*
        this function returns the file's mime-type
      */
      return required.mime.lookupDict[required.path.extname(file).slice(1)] || 'text/plain';
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
      utility2.assert(utility2.mimeLookup('foo') === 'text/plain');
      onEventError();
    },

    streamReadOnEventError: function (readable, onEventError) {
      /*
        this function concats data from readable stream and passes it to callback when done
      */
      var chunks;
      chunks = [];
      /* read data from readable stream */
      readable.on('data', function (chunk) {
        chunks.push(chunk);
      /* call callback when finished reading */
      }).on('end', function () {
        onEventError(null, Buffer.concat(chunks));
      /* pass any errors to the callback */
      }).on('error', onEventError);
    },

    stringAscii: '\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f'
      + '\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f'
      + ' !"#$%&\'()*+,-./0123456789:;<=>?'
      + '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_'
      + '`abcdefghijklmnopqrstuvwxyz{|}~\x7f',

    templateFormat: function (template, dict) {
      /*
        this function templates the template with the dict
      */
      return template.replace((/\{\{\w+\}\}/g), function (key) {
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
      utility2.assert(utility2.urlDecodeOrError(utility2.stringAscii) instanceof Error);
      onEventError();
    },

    urlParamsGetItem: function (url, key, delimiter) {
      /*
        this function gets a param item from the url
      */
      return utility2.urlParamsParse(url, delimiter).params[key] || '';
    },

    _urlParamsGetItem_default_test: function (onEventError) {
      /*
        this function tests urlParamsGetItem's default handling behavior
      */
      utility2.assert(utility2.urlParamsGetItem('/aa#bb=cc%2B', 'bb', '#') === 'cc+');
      onEventError();
    },

    urlParamsParse: function (url, delimiter) {
      /*
        this function parses the url into path / params components
      */
      var key, match, params, regexp, search, value;
      delimiter = delimiter || '?';
      match = url.indexOf(delimiter);
      params = {};
      regexp = (/([^&]+)=([^&]+)/g);
      if (match < 0) {
        return { params: params, path: url };
      }
      search = url.slice(match + 1);
      url = url.slice(0, match + 1);
      while (true) {
        match = regexp.exec(search);
        if (!match) {
          break;
        }
        /* validate key / value */
        key = utility2.urlDecodeOrError(match[1]);
        value = utility2.urlDecodeOrError(match[2]);
        if (!((key instanceof Error) || (value instanceof Error))) {
          params[key] = value;
        }
      }
      return { params: params, path: url };
    },

    urlParamsParsedJoin: function (parsed, delimiter) {
      /*
        this function joins the parsed object's path / params components into a single url
      */
      var path;
      path = parsed.path;
      delimiter = delimiter || '?';
      if (path.indexOf(delimiter) < 0) {
        path += delimiter;
      }
      Object.keys(parsed.params).sort().forEach(function (key, ii) {
        if (typeof parsed.params[key] === 'string') {
          if (ii || path.slice(-1) !== delimiter) {
            path += '&';
          }
          path += encodeURIComponent(key) + '=' + encodeURIComponent(parsed.params[key]);
        }
      });
      return path.replace(delimiter + '&', delimiter);
    },

    urlParamsRemoveItem: function (url, key, delimiter) {
      /*
        this function removes a param from the url
      */
      var parsed;
      parsed = utility2.urlParamsParse(url, delimiter);
      parsed.params[key] = null;
      return utility2.urlParamsParsedJoin(parsed, delimiter);
    },

    _urlParamsRemoveItem_default_test: function (onEventError) {
      /*
        this function tests urlParamsRemoveItem's default handling behavior
      */
      utility2.assert(utility2.urlParamsRemoveItem('/aa#bb=1&cc=2', 'bb', '#') === '/aa#cc=2');
      onEventError();
    },

    urlParamsSetItem: function (url, key, value, delimiter) {
      /*
        this function sets a param to the input url
      */
      var parsed;
      parsed = utility2.urlParamsParse(url, delimiter);
      parsed.params[key] = value;
      return utility2.urlParamsParsedJoin(parsed, delimiter);
    },

    _urlParamsSetItem_default_test: function (onEventError) {
      /*
        this function tests urlParamsSetItem's default handling behavior
      */
      utility2.assert(utility2.urlParamsSetItem('/aa', 'bb', 'cc+', '#')
        === '/aa#bb=cc%2B');
      utility2.assert(utility2.urlParamsSetItem('/aa#bb=1', 'cc', 'dd+', '#')
        === '/aa#bb=1&cc=dd%2B');
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
      utility2.ajax({ data: script, dataType: 'json', url: "/admin/admin.eval" }, onEventError);
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
      utility2.adminShell('echo', onEventError);
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
      if (state.modeNodejs && state.modeExtra) {
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
          utility2.streamReadOnEventError(request, onEventError2);
          break;
        /* eval script */
        case 2:
          data = data.toString();
          /* log script to be eval'd */
          utility2.jsonLog(['router5MainDict_/admin/admin.eval\n' + data]);
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
          utility2.streamReadOnEventError(request, onEventError2);
          break;
        /* eval script */
        case 2:
          data = data.toString();
          /* log script to be eval'd */
          utility2.jsonLog(['router5MainDict_/admin/admin.shell\n' + data]);
          onEventData = function (chunk) {
            process.stdout.write(chunk);
            response.write(chunk);
          };
          child = required.child_process.spawn('/bin/sh', ['-c', data])
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
      var data, mode, onEventError2, timeout, xhr;
      /* ajax xss via proxy */
      if ((/^https*:/).test(options.url)) {
        options.url = '/proxy/proxy.ajax/' + options.url;
      }
      /* set default options */
      options.contentType = options.contentType || 'application/octet-stream';
      options.dataType = options.dataType || 'text';
      options.type = options.type || options.method;
      /* add ajax progress feature */
      options.xhr = options.xhr || function () {
        return local._createXhrProgress(options);
      };
      if (options.params) {
        options.url = utility2.urlParamsParsedJoin({
          params: options.params,
          path: options.url
        });
      }
      mode = 0;
      onEventError2 = function (error, textStatus, jqXHR) {
        /* clear timeout for ajaxBrowser */
        clearTimeout(timeout);
        error = jqXHR instanceof Error ? jqXHR : options.error || error;
        mode = error instanceof Error ? -1 : mode + 1;
        xhr = xhr || (error instanceof Error ? jqXHR : error);
        switch (mode) {
        case 1:
          data = error;
          state.debugXhr = xhr;
          utility2.deferCallback(options.deferCallbackKey, 'defer', onEventError2);
          break;
        default:
          /* garbage collect deferred object */
          utility2.deferCallback(options.deferCallbackKey, 'delete');
          if (error) {
            error.message = xhr.status + ' ' + xhr.statusText + ' - ' + options.url + '\n'
              + error.message;
            if (error.stack) {
              error.stack = error.message + '\n' + xhr.responseText + '\n' + error.stack;
            }
          }
          onEventError(error, data);
        }
      };
      /* set timeout for ajaxBrowser */
      timeout = utility2.onEventTimeout(onEventError2, state.timeoutDefault, 'ajaxBrowser');
      $.ajax(options).always(onEventError2);
      /* debug mode option */
      if (options.modeDebug) {
        utility2.jsonLog(['ajax - options', options]);
      }
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

    _createXhrProgress: function (options) {
      /*
        this function creates a special xhr object with progress event handling
      */
      var ii, onEventEvent, xhr;
      xhr = new XMLHttpRequest();
      options.deferCallbackKey = utility2.uuid4();
      /* event handling */
      onEventEvent = function (event) {
        switch (event.type) {
        case 'abort':
        case 'error':
        case 'load':
          /* remove xhr from progress list */
          ii = local._xhrList.indexOf(xhr);
          if (ii >= 0) {
            local._xhrList.splice(ii, 1);
          }
          /* error message */
          if (event.type !== 'load' || xhr.status >= 400) {
            options.error = new Error(event.type);
          }
          /* ready */
          utility2.deferCallback(options.deferCallbackKey, 'ready');
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
      xhr.addEventListener('abort', onEventEvent);
      xhr.addEventListener('error', onEventEvent);
      xhr.addEventListener('load', onEventEvent);
      xhr.addEventListener('progress', onEventEvent);
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
      /* increment progress bar */
      local._progressIncrement();
      return xhr;
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
      if (state.modeNodejs && state.modeExtra) {
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
      /* localhost */
      var onEventError2, request, response, timeout, urlParsed;
      onEventError2 = function (error, data) {
        /* clear timeout for ajaxNodejs */
        clearTimeout(timeout);
        /* garbage collect request socket */
        if (request) {
          request.destroy();
        }
        /* garbage collect response socket */
        if (response) {
          response.destroy();
        }
        /* debug mode option */
        if (options.modeDebug) {
          utility2.jsonLog([
            'ajaxNodejs - response',
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
        options.path = utility2.urlParamsParsedJoin({
          params: options.params,
          path: options.path
        });
      }
      /* port needed for http(s).request */
      options.port = urlParsed.port;
      /* protocol needed for http(s).request */
      options.protocol = urlParsed.protocol || 'http:';
      /* default to allow ssl connections with self-signed certificates */
      options.rejectUnauthorized = options.rejectUnauthorized === undefined ? false : undefined;
      /* run ajax request */
      request = (options.protocol === 'https:'
        ? required.https
        : required.http).request(options, function (_) {
        response = _;
        /* debug ajaxResponse */
        state.debugAjaxResponse = response;
        local._ajaxOnEventResponse(options, onEventError2, response);
      }).on('error', onEventError2);
      /* debug ajaxRequest */
      state.debugAjaxRequest = request;
      /* end request */
      request.end(options.data);
      /* debug mode option */
      if (options.modeDebug) {
        utility2.jsonLog(['ajaxNodejs - options', options]);
      }
    },

    _ajaxNodejs_cache_test: function (onEventError) {
      /*
        this function tests ajaxNodejs's cache handling behavior
      */
      var onEventFinish;
      onEventFinish = utility2.onEventMulti(utility2.nop, onEventError);
      /* test cache flush handling behavior */
      onEventFinish.remaining += 1;
      utility2.ajax({
        cache: 'miss',
        url: '/test/test.json'
      }, function (error, data) {
        utility2.assert(!error);
        utility2.assert(data.toString() === '"hello test"');
        onEventFinish();
      });
      /* test cache default handling behavior */
      onEventFinish.remaining += 1;
      utility2.ajax({
        cache: true,
        url: '/test/test.json'
      }, function (error, data) {
        utility2.assert(!error);
        utility2.assert(data.toString() === '"hello test"');
        onEventFinish();
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
        onEventError(new Error((options.method || 'GET') + ' - ' + options.url
          + ' - ' + options.responseStatusCode + ' - ' + data.toString()));
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
      switch (options.dataType) {
      case 'binary':
        onEventError(null, data);
        break;
      /* try to JSON.parse the response */
      case 'json':
        error = utility2.jsonParseOrError(data);
        onEventError(error instanceof Error ? error : null, error);
        break;
      default:
        onEventError(null, data.toString());
      }
    },

    __ajaxOnEventData_default_test: function (onEventError) {
      /*
        this function tests _ajaxOnEventData's dataType handling behavior
      */
      var onEventFinish;
      onEventFinish = utility2.onEventMulti(utility2.nop, onEventError);
      /* test binary dataType handling behavior */
      onEventFinish.remaining += 1;
      utility2.ajax({
        dataType: 'binary',
        url: '/test/test.json'
      }, function (error, data) {
        utility2.assert(!error);
        utility2.assert(data.toString() === '"hello test"');
        onEventFinish();
      });
      /* test json dataType handling behavior */
      onEventFinish.remaining += 1;
      utility2.ajax({
        dataType: 'json',
        url: '/test/test.json'
      }, function (error, data) {
        utility2.assert(!error);
        utility2.assert(data === 'hello test');
        onEventFinish();
      });
      /* test error handling behavior */
      onEventFinish.remaining += 1;
      local._ajaxOnEventData(null, function (error) {
        utility2.assert(error instanceof Error);
        onEventFinish();
      }, new Error());
    },

    _ajaxOnEventResponse: function (options, onEventError, response) {
      /*
        this function handles the response object received by ajax request
      */
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
      utility2.streamReadOnEventError(
        response.on('error', onEventError),
        function (error, data) {
          local._ajaxOnEventData(options, onEventError, error, data);
        }
      );
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
      /* set options.method and options.type if necessary */
      if (options.data) {
        options.method = options.type = options.method || options.type || 'POST';
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
        utility2.assert(!error);
        utility2.assert((/\n\n_ajax_default_test$/).test(data));
        onEventError();
      });
    },

    _ajax_nullCase_test: function (onEventError) {
      /*
        this function tests ajax's null case handling behavior
      */
      utility2.ajax(null, function (error, data) {
        utility2.assert(error instanceof Error
          && data === undefined);
        onEventError();
      });
    },

    ajaxMultiUrls: function (options, onEventError, onEventFinish) {
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
      var onEventFinish2, remainingList;
      /* validate options.urlList */
      onEventFinish2 = utility2.onEventMulti(onEventError, onEventFinish);
      if (!(options
        && Array.isArray(options.urlList)
        && options.urlList.length
        && options.urlList.every(function (url) {
            return typeof url === 'string';
          }))) {
        onEventFinish2.remaining = 1;
        onEventFinish2(new Error('ajaxMultiUrls - invalid options.urlList '
          + utility2.jsonStringifyCircular(options && options.urlList)));
        return;
      }
      remainingList = utility2.jsonCopy(options.urlList);
      options.urlList.forEach(function (url) {
        var optionsUrl;
        onEventFinish2.remaining += 1;
        optionsUrl = utility2.jsonCopy(options);
        optionsUrl.url = url;
        utility2.ajax(optionsUrl, function (error, data) {
          /* debug remainingList */
          remainingList.splice(remainingList.indexOf(optionsUrl.url0), 1);
          utility2.jsonLog(['ajaxMultiUrls - fetched / remaining',
            optionsUrl.url0,
            JSON.stringify(remainingList.slice(0, 2)).replace(']', ',...]')]);
          onEventFinish2(error, {
            data: data,
            onEventFinish: onEventFinish2,
            options: optionsUrl
          });
        });
      });
    },

    _ajaxMultiUrls_default_test: function (onEventError) {
      /*
        this function tests ajaxMultiUrls's default handling behavior
      */
      utility2.ajaxMultiUrls({ urlList: [
        '/test/test.json',
        (state.localhost || '') + '/test/test.json'
      ] }, function (error, data) {
        utility2.assert(!error);
        utility2.assert(data.data === '"hello test"');
      }, onEventError);
    },

    _ajaxMultiUrls_error_test: function (onEventError) {
      /*
        this function tests ajaxMultiUrls's error handling behavior
      */
      utility2.ajaxMultiUrls({ urlList: [null] }, function (error, data) {
        utility2.assert(error instanceof Error);
      }, onEventError);
    },

    _ajaxMultiUrls_nullCase_test: function (onEventError) {
      /*
        this function tests ajaxMultiUrls's null case handling behavior
      */
      utility2.ajaxMultiUrls(null, function (error, data) {
        utility2.assert(error instanceof Error);
      }, onEventError);
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
      if (value === undefined) {
        return;
      }
      this.cache2[key] = value;
      this.garbageCollect();
      return value;
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



(function moduleDbNodejs() {
  /*
    this nodejs module exports the db api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleDbNodejs',

    _init: function () {
      if (state.modeNodejs && state.modeExtra) {
        utility2.initModule(module, local);
      }
    },

    _initOnce: function () {
      /*jslint stupid: true*/
      /* create blob dir */
      utility2.fsMkdirpSync(state.tmpdir + '/blob');
      /* create cache dir */
      utility2.fsMkdirpSync(state.tmpdir + '/cache');
      /* init sqlite3 */
      state.fsFileSqlite3 = state.tmpdir + '/db.sqlite3';
      state.onEventReady.remaining += 1;
      state.sqlite3 = required.sqlite3.cached.Database(
        state.tmpdir + '/db.sqlite3',
        state.onEventReady
      );
      /* create db blob table */
      state.onEventReady.remaining += 1;
      state.dbTableBlob = utility2.createDbTable('blob', state.onEventReady);
      /* create db test table */
      state.onEventReady.remaining += 1;
      state.dbTableTest = utility2.createDbTable('test', state.onEventReady);
      /* periodically remove fs cache files */
      local._fsCacheCleanup(utility2.onEventErrorDefault);
      utility2.clearCallSetInterval('_fsCacheCleanup', function () {
        local._fsCacheCleanup(utility2.onEventErrorDefault);
      }, 5 * 60 * 1000);
      /* periodically remove db cache blobs */
      local._dbCacheCleanup(utility2.onEventErrorDefault);
      utility2.clearCallSetInterval('_dbCacheCleanup', function () {
        local._dbCacheCleanup(utility2.onEventErrorDefault);
      }, 5 * 60 * 1000);
    },

    createDbTable: function (name, onEventError) {
      var self;
      /* optimization - use cached table */
      state.dbTableCache = state.dbTableCache || utility2.createCache(256);
      self = state.dbTableCache.getItem(name);
      if (self) {
        onEventError(null, self);
        return;
      }
      if ((/_fts_|_(?:1|ai|au|bd|bu|fts)$/).test(name)) {
        onEventError(new Error('createDbTable - invalid table name ' + name));
        return;
      }
      self = new local._Table();
      self.name = name;
      state.sqlite3.exec(self.sqlStatement('CREATE TABLE IF NOT EXISTS {{table}}(\n'
          + 'id TEXT PRIMARY KEY NOT NULL,\n'
          + 'record TEXT NOT NULL,\n'
          + 'field TEXT NOT NULL,\n'
          + 'value TEXT NOT NULL\n'
        + ');\n'
        /* create fts table */
        + 'CREATE VIRTUAL TABLE IF NOT EXISTS {{table}}_fts USING\n'
          + "FTS4(content='{{table}}', record, field, value);\n"
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
          + 'INSERT INTO {{table}}_fts(docid, record, field, value)\n'
          + 'VALUES(new.rowid, new.record, new.field, new.value);\n'
        + 'END;\n'
        /* create fts trigger BEFORE INSERT */
        + 'CREATE TRIGGER IF NOT EXISTS {{table}}_ai AFTER INSERT ON {{table}} BEGIN\n'
          + 'INSERT INTO {{table}}_fts(docid, record, field, value)\n'
          + 'VALUES(new.rowid, new.record, new.field, new.value);\n'
        + 'END;\n'
        + 'PRAGMA journal_mode=WAL;'), function (error) {
        /* optimization - cache table */
        if (!error) {
          state.dbTableCache.setItem(name, self);
        }
        onEventError(error, self);
      });
      return self;
    },

    _createDbTable_error_test: function (onEventError) {
      /*
        this function tests createDbTable's error handling behavior
      */
      utility2.createDbTable('table_fts', function (error) {
        utility2.assert(error instanceof Error);
        onEventError();
      });
    },

    _dbBlobEncodeName: function (file) {
      /*
        this function encodes the filename into a flattened filename with no directory structure
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
          state.dbTableBlob.recordCopy(file1, file2, onEventError2);
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
          state.dbTableBlob.recordDelete(file, onEventError2);
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
          state.dbTableBlob.recordRename(file1, file2, onEventError2);
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
          state.dbTableBlob.recordReplace(file, {
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
          utility2.jsonLog(['_dbCacheCleanup - cleaning /cache/', dir]);
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
          state.dbTableBlob.sqlAll(
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

    _fsCacheCleanup: function (onEventError) {
      /*
        this function cleans up the cachedir
      */
      var dir, mode, onEventError2;
      mode = 0;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        /* loop through state._fsCacheCleanupFsList */
        case 1:
          dir = state.tmpdir + '/cache';
          utility2.jsonLog(['_fsCacheCleanup - cleaning cachedir', dir]);
          state._fsCacheCleanupFsList = state._fsCacheCleanupFsList || [];
          state._fsCacheCleanupFsList.forEach(onEventError2);
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
        /* save list to state._fsCacheCleanupFsList */
        case 4:
          state._fsCacheCleanupFsList = data;
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
      var file, mode, onEventError2;
      mode = 0;
      onEventError2 = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          file = state.tmpdir + '/cache/' + utility2.uuid4() + '/foo';
          state._fsCacheCleanupFsList = [file];
          required.fs.mkdir(required.path.dirname(file), onEventError2);
          break;
        case 2:
          required.fs.writeFile(file, '', onEventError2);
          break;
        case 3:
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
        [local, { _rmR: utility2.nop }],
        [required.fs, { readdir: function (dir, onEventError) {
          onEventError(new Error());
        } }],
        [utility2, { onEventErrorDefault: utility2.nop }]
      ], function (onEventError) {
        local._fsCacheCleanup(function (error) {
          utility2.assert(error instanceof Error);
          onEventError();
        });
      });
    },

    _fsRmr: function (dir, onEventError) {
      /*
        this function recursively removes the dir
      */
      var mode, onEventFinish, onEventError2;
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
            onEventError();
            return;
          }
          required.fs.readdir(dir, onEventError2);
          break;
        case 3:
          onEventFinish = utility2.onEventMulti(utility2.onEventErrorDefault, onEventError2);
          onEventFinish.remaining = data.length + 1;
          data.forEach(function (file) {
            local._fsRmr(dir + '/' + file, onEventFinish);
          });
          /* handle directory with empty file list */
          onEventFinish();
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
        arg2 = 'SELECT * FROM sqlite_master;';
        break;
      }
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
      /* test createDbTable's default handling behavior */
      utility2.createDbTable('cache__Table_default_test', function (error, self) {
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
            'INSERT OR REPLACE INTO {{table}}(id, record, field, value) VALUES(?, ?, ?, ?);',
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
        self.sqlRun('INSERT OR REPLACE INTO {{table}}(id, record, field, value)'
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
              'INSERT OR REPLACE INTO {{table}}(id, record, field, value) VALUES(?, ?, ?, ?);',
              [self.idEncode(record, field), record, field, JSON.stringify(fieldDict[field])],
              onEventError
            );
          }
        });
        /* auto timestamp */
        self.sqlRun(
          'INSERT OR REPLACE INTO {{table}}(id, record, field, value) VALUES(?, ?, ?, ?);',
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
      state.dbTableCache.removeItem(this.name);
      this.sqlExec('DROP TABLE IF EXISTS {{table}};\n'
        + 'DROP TABLE IF EXISTS {{table}}_fts;', onEventError);
    },

    _Table_prototype_tableFts: function (query, onEventError) {
      /*
        this function runs full-text search on the table
      */
      this.sqlAll('SELECT rowid, offsets({{table}}_fts), matchinfo({{table}}_fts),'
        + ' snippet({{table}}_fts) FROM {{table}}_fts WHERE {{table}}_fts match ?;', query, onEventError);
    }

  };
  local._init();
}());



(function modulePhantomjsNodejs() {
  /*
    this nodejs module exports the phantomjs ajax / phantomjs test server api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.modulePhantomjsNodejs',

    _init: function () {
      if (state.modeNodejs && state.modeExtra) {
        utility2.initModule(module, local);
      }
    },

    phantomjsTestUrl: function (options, onEventError) {
      /*
        this function starts a separate phantomjs process to open and test a webpage
      */
      var testCallbackId;
      testCallbackId = utility2.uuid4();
      options.url = utility2.urlParamsSetItem(options.url, 'testCallbackId', testCallbackId, '#');
      required.phantomjs = required.phantomjs || require('phantomjs');
      state.phantomjs = utility2.shell(required.phantomjs.path
        + ' ' + utility2.__dirname + '/utility2_phantomjs.js '
        + new Buffer(JSON.stringify(options)).toString('base64'));
      state.phantomjsTestUrlDict[testCallbackId] = onEventError;
    },

    _phantomjsTestUrl_default_test: function (onEventError) {
      /*
        this function tests phantomjsTestUrl's default handling behavior
      */
      utility2.phantomjsTestUrl({
        timeoutDefault: state.timeoutDefault,
        url: state.localhost + '/test/test.html?modePhantomjs=1#modeTest=1'
      }, onEventError);
    }

  };
  local._init();
}());



(function modulePostgresNodejs() {
  /*
    this nodejs module exports the postgres api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.modulePostgresNodejs',

    _init: function () {
      if (state.modeNodejs && state.modeExtra) {
        state.postgresUrl = state.postgreUrl || process.env.POSTGRES_URL;
        if (state.postgresUrl) {
          utility2.initModule(module, local);
        }
      }
    },

    _initOnce: function () {
      /* create postgres default table */
      state.onEventReady.remaining += 1;
      state.postgresTableDefault
        = utility2.createPostgresTable('utility2_default', state.onEventReady);
    },

    createPostgresTable: function (name, onEventError) {
      /*
        this function creates a postgres table for storing key / valuse
      */
      var self;
      /* optimization - use cached table */
      state.postgresTableCache = state.postgresTableCache || utility2.createCache(256);
      self = state.postgresTableCache.getItem(name);
      if (self) {
        onEventError(null, self);
        return;
      }
      self = new local._Table();
      self.name = name;
      /* upsert code from http://www.postgresql.org/docs/current/static/plpgsql-control-structures.html#PLPGSQL-UPSERT-EXAMPLE */
      self.query('CREATE TABLE IF NOT EXISTS {{table}}(\n'
          + 'key TEXT PRIMARY KEY NOT NULL,\n'
          + 'value TEXT NOT NULL\n'
        + ');\n'
        + 'CREATE OR REPLACE FUNCTION upsert_{{table}}(key2 TEXT, value2 TEXT)\n'
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
            + 'INSERT INTO {{table}}(key, value) VALUES (key2, value2);\n'
            + 'RETURN;\n'
          + 'EXCEPTION WHEN unique_violation THEN\n'
            + '-- Do nothing, and loop to try the UPDATE again.\n'
          + 'END;\n'
        + 'END LOOP; END; $$\n'
        + 'LANGUAGE plpgsql;', null, function (error) {
          /* optimization - cache table */
          if (!error) {
            state.postgresTableCache.setItem(name, self);
          }
          onEventError(error, self);
        });
      return self;
    },

    replParseDict_postgres: function (arg1, arg2) {
      switch (arg2) {
      case '_':
        console.log(state.postgresResult);
        return;
      }
      state.postgresTableDefault.query(arg2, null, function (error, data) {
        if (data && data.length) {
          state.postgresResult = data;
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
        /* test utility2.createPostgresTable's default handling behavior */
        case 1:
          utility2.createPostgresTable('utility2__Table_default_test', onEventError2);
          break;
        /* test utility2.createPostgresTable's cache handling behavior */
        case 2:
          utility2.createPostgresTable('utility2__Table_default_test', onEventError2);
          break;
        /* test self.drop's default handling behavior */
        case 3:
          self = data;
          self.drop(onEventError2);
          break;
        case 4:
          utility2.createPostgresTable('utility2__Table_default_test', onEventError2);
          break;
        /* test self.clear's default handling behavior */
        case 5:
          self = data;
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
          utility2.assert(data === 'bb');
          onEventError2();
          break;
        case 12:
          self.getItem('cc', onEventError2);
          break;
        case 13:
          utility2.assert(data === 'dd');
          onEventError2();
          break;
        case 14:
          self.getItem('ee', onEventError2);
          break;
        case 15:
          utility2.assert(data === undefined);
          onEventError2();
          break;
        /* test self.key's default handling behavior */
        case 16:
          self.key(0, onEventError2);
          break;
        case 17:
          utility2.assert(data === 'bb');
          onEventError2();
          break;
        case 18:
          self.key(1, onEventError2);
          break;
        case 19:
          utility2.assert(data === 'dd');
          onEventError2();
          break;
        case 20:
          self.key(2, onEventError2);
          break;
        case 21:
          utility2.assert(data === null);
          onEventError2();
          break;
        /* test self.keys's default handling behavior */
        case 22:
          self.keys(onEventError2);
          break;
        case 23:
          utility2.assert(JSON.stringify(data) === '["aa","cc"]');
          onEventError2();
          break;
        /* test self.length's default handling behavior */
        case 24:
          self.length(onEventError2);
          break;
        case 25:
          utility2.assert(data === 2);
          onEventError2();
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
      state.postgresTableCache.removeItem(this.name);
      this.query(
        'DROP TABLE {{table}}; DROP FUNCTION upsert_{{table}}(key2 TEXT, value2 TEXT);',
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
          required.pg.connect(state.postgresUrl, onEventError2);
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
      this.query('SELECT upsert_{{table}}($1, $2);', [key, value], onEventError);
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
      if (state.modeNodejs && state.modeExtra) {
        utility2.initModule(module, local);
      }
    },

    _initOnce: function () {
      if (state.modeCli) {
        local._initMinify();
        local._initRollup();
      }
    },

    _initMinify: function () {
      /*
        this function minify files given by the command-line
      */
      var onEventFinish;
      if (!state.minifyFileList) {
        return;
      }
      onEventFinish = utility2.onEventMulti(function (error) {
        if (error instanceof Error) {
          utility2.onEventErrorDefault(error);
          process.exit(error);
        }
      }, process.exit);
      state.minifyFileList.split(',').forEach(function (file) {
        onEventFinish.remaining += 1;
        local._minifyFile(file, onEventFinish);
      });
    },

    _initRollup: function () {
      /*
        this function rollup files given by the command-line
      */
      var onEventFinish;
      if (!state.rollupFileList) {
        return;
      }
      onEventFinish = utility2.onEventMulti(function (error) {
        if (error instanceof Error) {
          utility2.onEventErrorDefault(error);
          process.exit(error);
        }
      }, process.exit);
      state.rollupFileList.split(',').forEach(function (file) {
        onEventFinish.remaining += 1;
        local._rollupFile(file, onEventFinish);
      });
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
          utility2.jsonLog(['_minifyFile', file]);
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
      var content, dataList, mode, onEventError2, options;
      mode = 0;
      onEventError2 = function (error, data) {
        if (mode === -1) {
          utility2.onEventErrorDefault(error, data);
          return;
        }
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          utility2.jsonLog(['_rollupFile', file]);
          required.fs.readFile(file, 'utf8', onEventError2);
          break;
        case 2:
          content = (/[\S\s]+?\n\}\(\)\);\n/).exec(data);
          content = utility2.scriptLint(file + '.js', content && content[0].trim()) + '\n';
          utility2.evalOnEventError(file, content, onEventError2);
          break;
        case 3:
          options = data;
          dataList = utility2.jsonCopy(options.urlList);
          utility2.ajaxMultiUrls(options, function (error, data) {
            mode = 3;
            onEventError2(error, data);
          }, onEventError2);
          break;
        case 4:
          /* additional css parsing */
          if (required.path.extname(file) === '.css' && !data.modeCss) {
            data.modeCss = true;
            data.onEventFinish.remaining += 1;
            local._rollupFileCss(data, function (error) {
              mode = 3;
              data.onEventFinish(error, data);
            });
            return;
          }
          dataList[dataList.indexOf(data.options.url0)] = data;
          break;
        case 5:
          /* concat text to content */
          dataList.forEach(function (data) {
            content += '\n/* module start - ' + data.options.url0 + ' */\n' + data.data.trim()
              + '\n/* module end */\n';
          });
          /* post processing */
          if (options.postProcessing) {
            content = options.postProcessing(content);
          }
          /* remove trailing whitespace */
          content = content.replace((/[\t\r ]+$/gm), '').trim() + '\n';
          /* write to file */
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
            + '(function () {\n'
            + '  "use strict";\n'
            + '  return { urlList: ['
            + '    "/test/test.css",\n'
            + '    "' + state.localhost + '/test/test.css"\n'
            + '    ] };\n'
            + '}());\n', onEventError2);
          break;
        case 2:
          local._rollupFile(file, onEventError2);
          break;
        case 3:
          required.fs.readFile(file, 'utf8', onEventError2);
          break;
        case 4:
          utility2.assert(!error);
          utility2.assert((/data:image\/png;base64/).test(data));
          onEventError2();
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
          required.fs.readFile(file, 'utf8', onEventError2);
          break;
        case 4:
          utility2.assert(!error);
          utility2.assert((/\nconsole\.log\("hello test!"\);\n/).test(data));
          onEventError2();
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
      var datauriDict, mode, onEventError2;
      mode = 0;
      onEventError2 = function (error, data) {
        if (mode === -1) {
          utility2.onEventErrorDefault(error, data);
          return;
        }
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          utility2.jsonLog(['_rollupFileCss', options.options.url0]);
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
          if (underscore.isEmpty(datauriDict)) {
            mode += 1;
            onEventError2();
            return;
          }
          utility2.ajaxMultiUrls({
            cache: options.options.cache,
            cachePrefix: options.options.cachePrefix,
            dataType: 'binary',
            urlList: Object.keys(datauriDict)
          }, function (error, data) {
            mode = 3;
            onEventError2(error, data);
          }, onEventError2);
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



(function moduleShellNodejs() {
  /*
    this nodejs module exports the shell api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleShellNodejs',

    _init: function () {
      if (state.modeNodejs && state.modeExtra) {
        utility2.initModule(module, local);
      }
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
        this function runs git git commands from the repl interpreter
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

    shell: function (options) {
      /*
        this function gives a quick and dirty way to execute shell scripts
      */
      var child;
      if (options.modeDebug !== false) {
        utility2.jsonLog(['shell - options', options]);
      }
      if (typeof options === 'string') {
        options = { script: options };
      }
      options.stdio = options.stdio || ['ignore', 1, 2];
      child = required.child_process.spawn(
        options.argv ? options.argv[0] : '/bin/sh',
        options.argv ? options.argv.slice(1) : ['-c', options.script],
        options
      );
      return child;
    }

  };
  local._init();
}());



(function moduleServerNodejs() {
  /*
    this nodejs module exports the server middleware api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleServerNodejs',

    _init: function () {
      if (state.modeNodejs && state.modeExtra) {
        utility2.initModule(module, local);
      }
    },

    _initOnce: function () {
      /* print debug info about the current process */
      if (state.modeDebugProcess && state.modeDebugProcess !== 'debugged') {
        state.modeDebugProcess = 'debugged';
        utility2.jsonLog(['_initDebugProcess - process.argv', process.argv]);
        utility2.jsonLog(['_initDebugProcess - process.cwd()', process.cwd()]);
        utility2.jsonLog(['_initDebugProcess - process.pid', process.pid]);
        utility2.jsonLog(['_initDebugProcess - process.env', process.env]);
        utility2.jsonLog(['_initDebugProcess - package.json', state.packageJson]);
      }
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
        || required.connect.logger('dev');
      /* init server */
      /* defer local tests until server is listening on state.serverPort */
      state.onEventReady.remaining += 1;
      utility2.serverListen(
        process.env.npm_config_server_port || state.serverPort,
        function () {
          if (state.serverListened) {
            state.onEventReady();
          }
        }
      );
    },

    'router1LoggingDict_/': function (request, response, next) {
      /*
        this function handles default logging
      */
      state.middleware1LoggingDefault(request, response, next);
    },

    'router1LoggingDict_/favicon.ico': function (request, response, next) {
      /*
        this function ignores logging for /favicon.ico
      */
      next();
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
          data: request.urlParsed.params.redirect || '/'
        });
        return;
      }
      utility2.serverRespond(request, response, 401, {});
    },

    '_router2SecurityDict_/signin_default_test': function (onEventError) {
      /*
        this function tests router2SecurityDict_/signin's default handling behavior
      */
      var onEventFinish;
      onEventFinish = utility2.onEventMulti(utility2.nop, onEventError);
      /* test https redirect */
      onEventFinish.remaining += 1;
      utility2.ajax({ url: '/signin?httpsRedirect=1' }, function (error) {
        utility2.assert(error instanceof Error);
        onEventFinish();
      });
      /* test failed sigin */
      onEventFinish.remaining += 1;
      utility2.ajax({ url: '/signin?basicAuthFail=1' }, function (error) {
        utility2.assert(error instanceof Error);
        onEventFinish();
      });
      /* test successful signin */
      onEventFinish.remaining += 1;
      utility2.ajax({ url: '/signin?redirect=%2Ftest%2Ftest.json' }, function (error, data) {
        utility2.assert(!error);
        utility2.assert(data === '"hello test"');
        onEventFinish();
      });
    },

    'router3CacheDict_/public/utility2_external': function (request, response, next) {
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
      var next2, request2, response2;
      next2 = function (error) {
        /* garbage collect request2 socket */
        if (request2) {
          request2.destroy();
        }
        /* garbage collect response2 socket */
        if (response2) {
          response2.destroy();
        }
        next(error);
      };
      request2 = required.url.parse(request.url.replace('/proxy/proxy.ajax/', ''));
      /* bug - disable socket pooling, because it causes timeout errors in tls tests */
      request2.agent = false;
      /* create modified copy of request.header */
      request2.headers = utility2.jsonCopy(request.headers);
      /* update host header with actual destination host */
      request2.headers.host = request2.host;
      /* create http(s) request */
      request2 = (request2.protocol === 'https:'
        ? required.https
        : required.http).request(request2, function (_) {
        response2 = _;
        /* proxy response headers */
        if (!response.headersSent) {
          response.writeHead(response2.statusCode, response2.headers);
        }
        /* pipe response */
        response2.on('error', next2).pipe(response.on('error', next2));
      });
      /* pipe request */
      request.on('error', next2).pipe(request2.on('error', next2));
    },

    '_router4ProxyDict_/proxy.ajax_default_test': function (onEventError) {
      /*
        this function tests router4ProxyDict_/proxy.ajax's default handling behavior
      */
      utility2.ajax({
        url: state.localhost + '/proxy/proxy.ajax/' + state.localhost + '/test/test.json'
      }, function (error, data) {
        utility2.assert(!error);
        utility2.assert(data === '"hello test"');
        onEventError();
      });
    },

    'router5MainDict_/': function (request, response, next) {
      /*
        this function handles the main page
      */
      if (request.urlPathNormalized !== '/') {
        next();
        return;
      }
      utility2.serverRespond(request, response, 200, {
        contentType: 'text/html',
        data: '<!DOCTYPE html><html><head>\n'
          + '<link'
            + ' href="/public/utility2_external/utility2_external.browser.min.css"'
            + ' rel="stylesheet"/>\n'
          + '<style>\n'
          + utility2.scriptLint('main.css', '\n')
          + '</style></head><body>\n'
          + 'hello world\n'
          + '</body></html>\n'
      });
    },

    'router5MainDict_/test/report.upload': function (request, response, next) {
      /*
        this function receives and parses uploaded test reports
      */
      utility2.streamReadOnEventError(request, function (error, data) {
        var coverage1, coverage2, file1, file2, onEventError;
        error = error || utility2.jsonParseOrError(data);
        if (error instanceof Error) {
          next(error);
          return;
        }
        response.end();
        state.testSuiteList = state.testSuiteList.concat(error.testSuiteList || []);
        /* extend global.__coverage with uploaded code coverage object */
        coverage1 = global.__coverage__;
        coverage2 = error.coverage || [];
        Object.keys(coverage2).forEach(function (key) {
          file1 = coverage1[key];
          file2 = coverage2[key];
          coverage1[key] = file1 || file2;
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
        onEventError = state.phantomjsTestUrlDict[error.testCallbackId];
        if (onEventError) {
          delete state.phantomjsTestUrlDict[error.testCallbackId];
          onEventError();
        }
      });
    },

    '_router5MainDict_/test/report.upload_error_test': function (onEventError) {
      /*
        this function tests router5MainDict_/test/report.upload's error handling behavior
      */
      utility2.testMock(onEventError, [
        [utility2, { streamReadOnEventError: function (_, onEventError) {
          onEventError(null, 'syntax error');
        } }],
        [state.router0TestDict, {
          '/test/report.upload': local['router5MainDict_/test/report.upload']
        }]
      ], function (onEventError) {
        state.middleware0Test({ url: '/test/report.upload' }, {}, function (error) {
          utility2.assert(error instanceof Error);
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
      setTimeout(
        response.end.bind(response),
        request.urlParsed.params.timeout || state.timeoutDefault
      );
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

    'router6FileDict_/public/utility2_external': function (request, response, next) {
      /*
        this function serves public, utility2_external files
      */
      utility2.serverRespondFile(response,
        required.utility2_external.__dirname + '/public/' + request.urlPathNormalized
          .replace('/public/utility2_external/', ''),
        next);
    },

    'router6FileDict_/public/utility2.js': function (request, response) {
      /*
        this function serves the file utility2.js
      */
      utility2.serverRespond(request, response, 200, { data: utility2._fileContentBrowser });
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
        data: utility2.templateFormat(
          '<!DOCTYPE html><html><head>\n'
            + '<link'
              + ' href="/public/utility2_external/utility2_external.browser.min.css"'
              + ' rel="stylesheet"/>\n'
            + '<style>\n'
            + utility2.scriptLint('test.css', '\n')
            + '</style></head><body>\n'
            + '<div id="divTest"></div>\n'
            + '<script>window.globalOverride = {{globalOverride}};</script>\n'
            + '<script src="/public/utility2_external/utility2_external.browser'
            /* bug - phantomjs raises syntax error for minified script */
            + (request.urlParsed.params.modePhantomjs ? '' : '.min')
            + '.js"></script>\n'
            + '<script src="/public/utility2.js"></script>\n'
            + '</body></html>\n',
          {
              globalOverride: JSON.stringify({
                state: { npmTestUtility2: state.npmTestUtility2, localhost: state.localhost }
              })
            }
        )
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
                request.urlParsed = request.urlParsed || utility2.urlParamsParse(request.url);
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
          utility2.serverRespond(request, response, 500, { data: error });
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
      return !request.urlParsed.params.basicAuthFail
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
      if (request.urlParsed.params.httpsRedirect
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
        utility2.onEventErrorDefault(options.data);
        options.data = String(options.data.stack || options.data.message || options.data);
        break;
      }
      if (!response.headersSent) {
        response.statusCode = statusCode;
        response.setHeader(
          'content-type',
          options.contentType || utility2.mimeLookup(request.urlPathNormalized)
        );
      }
      response.end(typeof options.data === 'string' || Buffer.isBuffer(options.data)
        ? options.data
        : String(options.data));
    },

    serverRespondFile: function (response, file, next) {
      /*
        this function serves static files
      */
      response.setHeader('content-type', utility2.mimeLookup(file));
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
      port = Number(port === 'random'
        ? utility2.serverPortRandom()
        : port || process.env.npm_config_server_port);
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
      /* set state.server as needed */
      state.server = state.server || required.connect().use(utility2.middlewareApplication);
      /* listen on specified port */
      state.server.listen(port, function () {
        utility2.jsonLog(['serverListen - listening on port', port]);
        if (port === state.serverPort) {
          state.serverListened = true;
          state.localhost = state.localhost || 'http://localhost:' + state.serverPort;
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
    },

    streamReadOnEventError: function (readable, onEventError) {
      /*
        this function concats the data from the readable stream,
        and passes it to callback when finished reading
      */
      var chunks;
      chunks = [];
      readable.on('data', function (chunk) {
        chunks.push(chunk);
      }).on('end', function () {
        onEventError(null, Buffer.concat(chunks));
      }).on('error', onEventError);
    }

  };
  local._init();
}());



(function moduleZCliShared() {
  /*
    this nodejs module finishes the init of cli api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleZCliShared',

    _init: function () {
      state.modeInit = state.modeNodejs && state.modeInit === 1
        ? state.modeInit + 1
        : state.modeInit;
      utility2.initModule(module, local);
    },

    _initOnce: function () {
      /* utility2 ready */
      if (state.modeBrowser) {
        state.onEventReady.remaining += 1;
        $(state.onEventReady);
      } else if (state.modeNodejs && !state.modeExtra) {
        state.onEventReady.remaining += 1;
        state.onEventReady();
      }
    },

    __initOnce_default_test: function (onEventError) {
      /*
        this function tests _initOnce's default handling behavior
      */
      utility2.testMock(onEventError, [
        [state, { modeExtra: false }],
        [utility2, { deferCallback: utility2.nop }]
      ], function (onEventError) {
        local._initOnce();
        onEventError();
      });
    }

  };
  local._init();
}());
