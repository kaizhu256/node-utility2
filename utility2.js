/*jslint
  bitwise: true, browser: true,
  indent: 2,
  maxerr: 8,
  node: true, nomen: true,
  regexp: true,
  stupid: true,
  todo: true
*/
// declare module vars
var mainApp;



(function submoduleUtility2Shared() {
  /*
    this shared submodule exports useful utilities
  */
  'use strict';
  var local = {
    _name: 'utility2.submoduleUtility2Shared',

    _init: function () {
      /*
        this function inits this submodule
      */
      var argv, tmp;
      // init main app
      mainApp = mainApp || exports;
      // init _debug_print
      mainApp[['debug', 'Print'].join('')] = global[['debug', 'Print'].join('')] =
        local._debug_print;
      // init mode indicating whether we are in either browser or nodejs environment
      mainApp.modeNodejs = global.process && process.versions && process.versions.node;
      // init dict of argv key / value pairs
      mainApp.argvDict = mainApp.argvDict || {};
      // init argvDict in nodejs
      if (mainApp.modeNodejs) {
        // json-copy process.argv before modifying it
        argv = JSON.parse(JSON.stringify(process.argv));
        // append process.env.npm_config_mode_* to argv
        Object.keys(process.env).sort().forEach(function (key) {
          tmp = (/^npm_config_(mode_.+)/).exec(key);
          if (tmp) {
            argv.push('--' + tmp[1] + '=' + (process.env[key] || 'false'));
          }
        });
        // parse argv and integrate it into the mainApp.argvDict
        argv.forEach(function (arg, ii) {
          if (arg.indexOf('--') === 0) {
            arg = arg.split('=');
            // parse --foo=1 -> mainApp.foo = 1
            tmp = arg.length > 1 ? arg.slice(1).join('=')
              // parse --foo bar -> mainApp.foo = 'bar'
              : argv[ii + 1] && argv[ii + 1].indexOf('--') !== 0 ? argv[ii + 1]
                // parse --foo -> mainApp.foo = true
                : true;
            // convert key to camel case
            arg = arg[0].slice(2).replace((/[\-_][a-z]/g), function (match) {
              return match[1].toUpperCase();
            });
            // try to parse value as json object
            try {
              mainApp.argvDict[arg] = JSON.parse(tmp);
            // else keep value as-is
            } catch (errorCaught) {
              mainApp.argvDict[arg] = tmp;
            }
          }
        });
      // init argvDict in browser
      } else {
        // parse any query-param that matches 'mode*' or 'timeoutDefault'
        location.search.replace(
          (/\b(mode[A-Z]\w+|testCallbackId|timeoutDefault)=([^&=]+)/g),
          function (_, key, value) {
            // nop hack to pass jslint
            local.nop(_);
            // try to parse value as json object
            try {
              mainApp.argvDict[key] = JSON.parse(value);
            // else keep value as-is
            } catch (errorCaught) {
              mainApp.argvDict[key] = value;
            }
          }
        );
      }
      // init mainApp with default values
      local.setDefault(mainApp, {
        // init dict of argv key / value pairs
        argvDict: {},
        // init default error
        errorDefault: new Error('default error'),
        // init cached dict of files
        fileDict: {},
        // init mime-type lookup for given file extensions
        mimeLookupDict: {
          '.css': 'text/css',
          '.html': 'text/html',
          '.js': 'application/javascript',
          '.json': 'application/json',
          '.txt': 'text/plain'
        },
        // init dict of cli commands
        modeCliDict: {},
        // init dummy-test mode
        modeTestDummy: mainApp.argvDict.modeTestFail,
        // init fail-all-tests mode
        modeTestFail: mainApp.argvDict.modeTestFail,
        // init browser state
        stateBrowser: { fileDict: {} },
        // init dict of server-side callbacks used to merge test-reports from browser tests
        testCallbackDict: {},
        // init default timeout for ajax requests and other async io
        timeoutDefault: 30000
      });
      // init this app's test-platform object
      mainApp.testPlatform = {
        modeTestDummy: mainApp.modeTestDummy,
        // init this test-platform's name
        // e.g. 'nodejs - darwin v0.10.32' or 'browser - Mozilla/5.0 ...'
        name: mainApp.modeNodejs ? 'nodejs - ' + process.platform + ' ' + process.version
          : 'browser - ' + (navigator && navigator.userAgent),
        // list of test-cases and their test-results
        testCaseList: []
      };
      // init main test-report object,
      // used to accumulate test-reports from this app and other test-platforms
      mainApp.testReport = {
        // init global coverage object
        coverage: global.__coverage__,
        // init list of test-platforms
        // e.g. 'nodejs - darwin v0.10.32' or 'browser - Mozilla/5.0 ...'
        testPlatformList: [mainApp.testPlatform]
      };
      // init this submodule
      local.initSubmodule(local);
      // validate mainApp.timeoutDefault is a finite, positive-definite integer
      tmp = mainApp.timeoutDefault;
      mainApp.assert(
        (tmp | 0) === tmp && 0 < tmp && tmp < Infinity,
        'invalid mainApp.timeoutDefault ' + mainApp.timeoutDefault
      );
      // flesh out test-report object
      mainApp.testReportCreate(mainApp.testReport, {});
    },

    initSubmodule: function (local) {
      /*
        this function inits a submodule's local object
      */
      Object.keys(local).forEach(function (key) {
        var match;
        // add testCase to mainApp.testReport
        if (key.slice(-5) === '_test') {
          mainApp.testPlatform.testCaseList.push({
            callback: local[key],
            name: local._name + '.' + key
          });
          return;
        }
        // set dict items to mainApp object
        match = (/(.+Dict)_(.*)/).exec(key);
        if (match) {
          mainApp[match[1]] = mainApp[match[1]] || {};
          mainApp[match[1]][match[2]] = local[key];
          return;
        }
        match = (/(^ngApp_\w+)_(\w+)_(\w+)$/).exec(key);
        if (match) {
          // init angularjs app
          mainApp[match[1]] = mainApp[match[1]] || global.angular.module(match[1], []);
          // init angularjs app's sub-component
          mainApp[match[1]][match[2]](match[3], local[key]);
          return;
        }
        // export items that don't start with an underscore _
        if (key[0] !== '_') {
          mainApp[key] = local[key];
        }
      });
    },

    _ajax_default_test: function (onEventError) {
      /*
        this function tests ajax's default handling behavior
      */
      var onEventRemaining, remaining, remainingError;
      onEventRemaining = function (error) {
        remaining -= 1;
        remainingError = remainingError || error;
        if (remaining === 0) {
          onEventError(remainingError);
        }
      };
      remaining = 0;
      // test json handling behavior
      remaining += 1;
      mainApp.ajax({
        // test data upload handling behavior
        data:
          // if nodejs, then test binary data upload
          mainApp.modeNodejs ? new Buffer('1')
            // else test text data upload
            : '1',
        headers: {
          // test request header handling behavior
          foo: 'bar'
        },
        url: '/test/hello.json'
      }, function (error, data) {
        mainApp.testTryCatch(function () {
          // validate no error occurred
          mainApp.assert(!error, error);
          // validate data
          mainApp.assert(data === '"hello"', data);
          onEventRemaining();
        }, onEventRemaining);
      });
      [{
        // test 404 error handling behavior in /public
        url: '/public/undefined/' + Math.random() + '?modeErrorIgnore=1'
      }, {
        // test 404 error handling behavior in /test
        url: '/test/undefined/' + Math.random() + '?modeErrorIgnore=1'
      }, {
        // test timeout handling behavior
        timeout: 1,
        url: '/test/timeout?modeErrorIgnore=1'
      }, {
        // test not mainApp.modeTest security handling behavior
        url: '/test/no-mode-test?modeErrorIgnore=1'
      }, {
        // test unusually long url query-params security handling behavior
        url: '/test/url?modeErrorIgnore=1&' + new Array(0x2000).join('a')
      }, {
        // test unusually long url pathname security handling behavior
        url: '/test/path/' + new Array(0x200).join('a') + '?modeErrorIgnore=1'
      }, {
        // test JSON.parse error on test-report upload handling behavior
        data: 'syntax error',
        method: 'POST',
        url: '/test/test-report-upload?modeErrorIgnore=1'
      }].forEach(function (options) {
        remaining += 1;
        // test tryCatchHandler's error handling behavior
        mainApp.ajax(options, mainApp.tryCatchHandler(function (error) {
          mainApp.testTryCatch(function () {
            // validate error occurred
            mainApp.assert(error instanceof Error, error);
            onEventRemaining();
          }, onEventRemaining);
        }));
      });
    },

    assert: function (passed, message) {
      /*
        this function throws an error if the assertion fails
      */
      mainApp.errorThrow(!passed && new Error('assertion error - ' + (
        // if message is a string, then leave it as is
        typeof message === 'string' ? message
        // if message is an Error object, then get its stack trace
        : message instanceof Error ? mainApp.errorStack(message)
            // else JSON.stringify message
            : JSON.stringify(message)
      )));
    },

    _assert_default_test: function (onEventError) {
      /*
        this function tests assert's default handling behavior
      */
      // test assertion passed
      mainApp.assert(true, true);
      // test assertion failed
      mainApp.testTryCatch(function () {
        mainApp.assert(false);
      }, function (error) {
        // validate error occurred
        mainApp.assert(error instanceof Error, error);
        // validate error message
        mainApp.assert(error.message === 'assertion error - undefined', error.message);
      });
      // test assertion failed with text message
      mainApp.testTryCatch(function () {
        mainApp.assert(false, '_assert_default_test');
      }, function (error) {
        // validate error occurred
        mainApp.assert(error instanceof Error, error);
        // validate error message
        mainApp.assert(
          error.message === 'assertion error - _assert_default_test',
          error.message
        );
      });
      // test assertion failed with error object
      mainApp.testTryCatch(function () {
        mainApp.assert(false, mainApp.errorDefault);
      }, function (error) {
        // validate error occurred
        mainApp.assert(error instanceof Error, error);
        // validate error message
        mainApp.assert(error.message.indexOf('assertion error - ') === 0, error.message);
      });
      onEventError();
    },

    callArg0: function (callback) {
      /*
        this function calls the callback in arg position 0
      */
      callback();
    },

    callArg1: function (_, callback) {
      /*
        this function calls the callback in arg position 1
      */
      // nop hack to pass jslint
      mainApp.nop(_);
      callback();
    },

    callArg2: function (_, __, callback) {
      /*
        this function calls the callback in arg position 2
      */
      // nop hack to pass jslint
      mainApp.nop(_, __);
      callback();
    },

    callError0: function (onEventError) {
      /*
        this function calls the onEventError callback in arg position 0 with an error object
      */
      onEventError(mainApp.errorDefault);
    },

    callError1: function (_, onEventError) {
      /*
        this function calls the onEventError callback in arg position 1 with an error object
      */
      // nop hack to pass jslint
      mainApp.nop(_);
      onEventError(mainApp.errorDefault);
    },

    callError2: function (_, __, onEventError) {
      /*
        this function calls the onEventError callback in arg position 2 with an error object
      */
      // nop hack to pass jslint
      mainApp.nop(_, __);
      onEventError(mainApp.errorDefault);
    },

    _callX_default_test: function (onEventError) {
      /*
        this function tests callX's default handling behavior
      */
      mainApp.callArg0(function (error) {
        // validate no error occurred
        mainApp.assert(!error, error);
      });
      mainApp.callArg1(null, function (error) {
        // validate no error occurred
        mainApp.assert(!error, error);
      });
      mainApp.callArg2(null, null, function (error) {
        // validate no error occurred
        mainApp.assert(!error, error);
      });
      mainApp.callError0(function (error) {
        // validate error occurred
        mainApp.assert(error instanceof Error, error);
      });
      mainApp.callError1(null, function (error) {
        // validate error occurred
        mainApp.assert(error instanceof Error, error);
      });
      mainApp.callError2(null, null, function (error) {
        // validate error occurred
        mainApp.assert(error instanceof Error, error);
      });
      onEventError();
    },

    _debug_print: function (arg) {
      /*
        this internal function is used for tmp debugging,
        and jslint will nag you to remove it if used
      */
      console.error('\n\n\ndebug' + 'Print');
      console.error.apply(console, arguments);
      console.error();
      // return arg for inspection
      return arg;
    },

    __debug_print_default_test: function (onEventError) {
      /*
        this function tests _debug_print's default handling behavior
      */
      var message;
      mainApp.testMock(onEventError, [
        [console, { error: function (_) {
          message += (_ || '') + '\n';
        } }]
      ], function (onEventError) {
        message = '';
        local._debug_print('_debug_print_default_test');
        mainApp.assert(
          message === '\n\n\ndebug' + 'Print\n_debug_print_default_test\n\n',
          message
        );
        onEventError();
      });
    },

    errorStack: function (error) {
      /*
        this function returns the error's stack or message attribute
      */
      return String(error.stack || error.message);
    },

    errorThrow: function (error) {
      /*
        this function throws the error if it exists
      */
      if (error) {
        throw error;
      }
    },

    jsonStringifyOrdered: function (value, replacer, space) {
      /*
        this function JSON.stringify's the value with dictionaries in sorted order,
        allowing reliable / reproducible string comparisons and tests
      */
      return JSON.stringify(value && (typeof value === 'object' || Array.isArray(value)) ?
          JSON.parse(local._jsonStringifyOrderedRecurse(value))
        : value, replacer, space);
    },

    _jsonStringifyOrdered_default_test: function (onEventError) {
      /*
        this function tests jsonStringifyOrdered's default handling behavior
      */
      var data;
      // test undefined handling behavior
      data = mainApp.jsonStringifyOrdered(undefined);
      mainApp.assert(data === undefined, data);
      // test function handling behavior
      data = mainApp.jsonStringifyOrdered(mainApp.nop);
      mainApp.assert(data === undefined, data);
      // test default handling behavior
      data = mainApp.jsonStringifyOrdered({
        ee: {},
        dd: [undefined],
        cc: mainApp.nop,
        bb: 2,
        aa: 1
      });
      mainApp.assert(data === '{"aa":1,"bb":2,"dd":[null],"ee":{}}', data);
      onEventError();
    },

    _jsonStringifyOrderedRecurse: function (value) {
      /*
        this function recurses the value looking for dictionaries to sort
      */
      value = Array.isArray(value) ?
          '[' + value.map(local._jsonStringifyOrderedRecurse).join(',') + ']'
        : typeof value !== 'object' || !value ?
            JSON.stringify(value)
            // sort list of keys
            : '{' + Object.keys(value).filter(function (key) {
            return JSON.stringify(value[key]) !== undefined;
          }).sort().map(function (key) {
            return JSON.stringify(key) + ':' +
              local._jsonStringifyOrderedRecurse(value[key]);
          }).join(',') + '}';
      return value === undefined ? 'null' : value;
    },

    nop: function () {
      /*
        this function performs no operation - nop
      */
      return;
    },

    onEventErrorDefault: function (error, data) {
      /*
        this function provides a default, error / data handling callback.
        if an error is given, it will print the error's message and stack,
        else it will print the data
      */
      // error exists, then print it
      if (error) {
        console.error('\nonEventErrorDefault - error\n' + mainApp.errorStack(error) + '\n');
      // else if data exists and is a non-empty string, then print it
      } else if (data !== undefined && data !== '') {
        // debug data
        console.log('\nonEventErrorDefault - data\n' + JSON.stringify(data, null, 2) + '\n');
      }
    },

    _onEventErrorDefault_default_test: function (onEventError) {
      /*
        this function tests onEventErrorDefault's default handling behavior
      */
      var message;
      mainApp.testMock(onEventError, [
        [console, {
          error: function (_) {
            message = _;
          },
          log: function (_) {
            message = _;
          }
        }]
      ], function (onEventError) {
        // test default handling behavior
        message = null;
        mainApp.onEventErrorDefault(null, '_onEventErrorDefault_default_test');
        // validate data message
        mainApp.assert(message ===
          '\nonEventErrorDefault - data\n"_onEventErrorDefault_default_test"\n', message);
        // test no data handling behavior
        message = null;
        mainApp.onEventErrorDefault(null, '');
        // validate no message was printed
        mainApp.assert(message === null, message);
        // test error handling behavior
        message = '';
        mainApp.onEventErrorDefault(new Error('_onEventErrorDefault_default_test'));
        // validate error message
        mainApp.assert((/\nonEventErrorDefault - error\n.*_onEventErrorDefault_default_test/)
          .test(message.split('\n').slice(0, 3).join('\n')), JSON.stringify(message));
        onEventError();
      });
    },

    onEventTimeout: function (onEventError, timeout, message) {
      /*
        this function sets a timer to throw and handle a timeout error
      */
      var error;
      // validate timeout is a finite, positive-definite integer
      mainApp.assert(
        (timeout | 0) === timeout && 0 < timeout && timeout < Infinity,
        'invalid timeout ' + timeout
      );
      error = new Error('onEventTimeout - timeout error - ' + timeout + ' ms - ' + message);
      error.code = 'ETIMEDOUT';
      return setTimeout(function () {
        onEventError(error);
      }, timeout);
    },

    _onEventTimeout_timeout_test: function (onEventError) {
      /*
        this function tests onEventTimeout's timeout handling behavior
      */
      var timeElapsed;
      timeElapsed = Date.now();
      mainApp.onEventTimeout(function (error) {
        mainApp.testTryCatch(function () {
          // validate error occurred
          mainApp.assert(error instanceof Error);
          // validate error is timeout error
          mainApp.assert(error.code === 'ETIMEDOUT');
          timeElapsed = Date.now() - timeElapsed;
          // validate timeElapsed passed is greater than timeout
          // bug - ie might timeout slightly earlier so increase timeElapsed by a small amount
          mainApp.assert(timeElapsed + 100 >= 1000, timeElapsed);
          onEventError();
        }, onEventError);
      // coverage - use 1500 ms to cover setInterval test-report refreshes in browser
      }, 1500, '_onEventTimeout_timeoutError_test');
    },

    setDefault: function (options, defaults) {
      /*
        this function recursively sets default values for unset leaf nodes in the options object
      */
      Object.keys(defaults).forEach(function (key) {
        var defaults2, options2;
        defaults2 = defaults[key];
        options2 = options[key];
        // set default value
        if (options2 === undefined) {
          options[key] = defaults2;
          return;
        }
        // recurse defaults2 if options2 and defaults2 are both objects
        if (defaults2 && typeof defaults2 === 'object' &&
            options2 && typeof options2 === 'object' &&
            !Array.isArray(options2)) {
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
      options = mainApp.setDefault(
        { aa: 1, bb: {}, cc: [] },
        { aa: 2, bb: { cc: 2 }, cc: [1, 2] }
      );
      // validate options
      mainApp.assert(
        mainApp.jsonStringifyOrdered(options) === '{"aa":1,"bb":{"cc":2},"cc":[]}',
        options
      );
      onEventError();
    },

    setOverride: function (options, override, backup, depth) {
      /*
        this function recursively overrides the options object with the override object,
        and optionally saves the original options object to the backup object,
        and optionally accepts the depth recursion limit
      */
      local._setOverrideRecurse(options, override, backup || {}, depth || Infinity);
      return options;
    },

    _setOverride_default_test: function (onEventError) {
      /*
        this function tests setOverride's default handling behavior
      */
      var backup, data, options;
      backup = {};
      // test override handling behavior
      options = mainApp.setOverride(
        { aa: 1, bb: { cc: 2 }, dd: [3, 4], ee: { ff: { gg: 5, hh: 6 } } },
        { aa: 2, bb: { dd: 3 }, dd: [4, 5], ee: { ff: { gg: 6 } } },
        backup,
        2
      );
      // validate backup
      data = mainApp.jsonStringifyOrdered(backup);
      mainApp.assert(data === '{"aa":1,"bb":{},"dd":[3,4],"ee":{"ff":{"gg":5,"hh":6}}}', data);
      // validate options
      data = mainApp.jsonStringifyOrdered(options);
      mainApp.assert(data ===
        '{"aa":2,"bb":{"cc":2,"dd":3},"dd":[4,5],"ee":{"ff":{"gg":6}}}', data);
      // test restore handling behavior
      mainApp.setOverride(options, backup);
      // validate backup
      data = mainApp.jsonStringifyOrdered(backup);
      mainApp.assert(data === '{"aa":1,"bb":{"dd":3},"dd":[3,4],"ee":{"ff":{"gg":6}}}', data);
      // validate options
      data = mainApp.jsonStringifyOrdered(options);
      mainApp.assert(data ===
        '{"aa":1,"bb":{"cc":2},"dd":[3,4],"ee":{"ff":{"gg":5,"hh":6}}}', data);
      onEventError();
    },

    _setOverrideRecurse: function (options, override, backup, depth) {
      /*
        this function
        1. save the options item to the backup object
        2. set the override item to the options object
        3. recurse the override object
      */
      var options2, override2;
      Object.keys(override).forEach(function (key) {
        options2 = options[key];
        override2 = backup[key] = override[key];
        if (depth <= 1 ||
            // override2 is not a plain object
            !(override2 && typeof override2 === 'object' && !Array.isArray(override2)) ||
            // options2 is not a plain object
            !(options2 && typeof options2 === 'object' && !Array.isArray(options2))) {
          // 1. save the options item to the backup object
          backup[key] = options2;
          // 2. set the override item to the options object
          options[key] = override2;
          return;
        }
        // 3. recurse the override object
        local._setOverrideRecurse(options2, override2, override2, depth - 1);
      });
    },

    testMock: function (onEventError, mockList, test) {
      /*
        this function mocks the mainApp given in the mockList while running the test callback
      */
      var onEventError2;
      // prepend mandatory mocks for async / unsafe functions
      mockList = [
        // suppress console.log
        [console, { log: mainApp.nop }],
        // enforce synchonicity by mocking timers as mainApp.callArg0
        [global, { setInterval: mainApp.callArg0, setTimeout: mainApp.callArg0 }],
        [global.process || {}, { exit: mainApp.nop }]
      ].concat(mockList);
      onEventError2 = function (error) {
        mockList.reverse().forEach(function (mock) {
          mainApp.setOverride(mock[0], mock[2], null, 1);
        });
        onEventError(error);
      };
      // run onEventError callback in mocked mainApp in a try-catch block
      mainApp.testTryCatch(function () {
        // mock mainApp
        mockList.forEach(function (mock) {
          mock[2] = {};
          mainApp.setOverride(mock[0], mock[1], mock[2], 1);
        });
        // run test
        test(onEventError2);
      }, onEventError2);
    },

    testReportCreate: function (testReport1, testReport2) {
      /*
        this function
        1. merges testReport2 into testReport1
        2. merges testReport2.coverage into testReport1.coverage
        3. returns testReport1 in html format
      */
      var errorMessageList,
        env,
        file1,
        file2,
        testCaseNumber,
        testPlatform1,
        testReport,
        text;
      // part 1 - merge testReport2 into testReport1
      [testReport1, testReport2].forEach(function (testReport, ii) {
        ii += 1;
        mainApp.setDefault(testReport, {
          date: new Date().toISOString(),
          errorMessageList: [],
          testPlatformList: [],
          timeElapsed: 0
        });
        // security - handle malformed testReport
        mainApp.assert(
          testReport && typeof testReport === 'object',
          ii + ' invalid testReport ' + typeof testReport
        );
        mainApp.assert(
          typeof testReport.timeElapsed === 'number',
          ii + ' invalid testReport.timeElapsed ' + typeof testReport.timeElapsed
        );
        // security - handle malformed testReport.testPlatformList
        testReport.testPlatformList.forEach(function (testPlatform) {
          mainApp.setDefault(testPlatform, {
            name: 'undefined',
            testCaseList: [],
            timeElapsed: 0
          });
          mainApp.assert(
            typeof testPlatform.name === 'string',
            ii + ' invalid testPlatform.name ' + typeof testPlatform.name
          );
          if (mainApp.modeNodejs) {
            testPlatform.name = testPlatform.name.replace(
              (/^(browser|nodejs)/),
              process.env.MODE_CI_BUILD + ' - $1'
            );
          }
          mainApp.assert(
            typeof testPlatform.timeElapsed === 'number',
            ii + ' invalid testPlatform.timeElapsed ' + typeof testPlatform.timeElapsed
          );
          // security - handle malformed testReport.testPlatformList.testCaseList
          testPlatform.testCaseList.forEach(function (testCase) {
            mainApp.setDefault(testCase, {
              errorMessage: '',
              name: 'undefined',
              timeElapsed: 0
            });
            mainApp.assert(
              typeof testCase.errorMessage === 'string',
              ii + ' invalid testCase.errorMessage ' + typeof testCase.errorMessage
            );
            mainApp.assert(
              typeof testCase.name === 'string',
              ii + ' invalid testCase.name ' + typeof testCase.name
            );
            mainApp.assert(
              typeof testCase.timeElapsed === 'number',
              ii + ' invalid testCase.timeElapsed ' + typeof testCase.timeElapsed
            );
          });
        });
      });

      // merge testReport2.testPlatformList into testReport1.testPlatformList
      testReport2.testPlatformList.forEach(function (testPlatform2) {
        // if testPlatform2 collides with existing mainApp.testPlatform or is a dummy,
        // then give precedence to existing mainApp.testPlatform
        if (testPlatform2.name === mainApp.testPlatform.name || testPlatform2.modeTestDummy) {
          return;
        }
        // if testPlatform2 collides with existing testPlatform1,
        // then replace existing testPlatform1 with testPlatform2
        testPlatform1 = null;
        testReport1.testPlatformList.forEach(function (_, ii) {
          if (_.name === testPlatform2.name) {
            testPlatform1 = testReport1.testPlatformList[ii] = testPlatform2;
          }
        });
        // else add testPlatform2
        if (!testPlatform1) {
          testReport1.testPlatformList.push(testPlatform2);
        }
      });
      // update testReport1.timeElapsed
      if (testReport1.timeElapsed < 0xffffffff) {
        testReport1.timeElapsed += testReport2.timeElapsed;
      }
      testReport = testReport1;
      testReport.testsFailed = 0;
      testReport.testsPassed = 0;
      testReport.testsPending = 0;
      testReport.testPlatformList.forEach(function (testPlatform) {
        testPlatform.testsFailed = 0;
        testPlatform.testsPassed = 0;
        testPlatform.testsPending = 0;
        testPlatform.testCaseList.forEach(function (testCase) {
          // update failed tests
          if (testCase.errorMessage) {
            testCase.status = 'failed';
            testPlatform.testsFailed += 1;
            testReport.testsFailed += 1;
          // update passed tests
          } else if (testCase.timeElapsed < 0xffffffff) {
            testCase.status = 'passed';
            testPlatform.testsPassed += 1;
            testReport.testsPassed += 1;
          // update pending tests
          } else {
            testCase.status = 'pending';
            testPlatform.testsPending += 1;
            testReport.testsPending += 1;
          }
        });
        // update testPlatform.status
        testPlatform.status = testPlatform.testsFailed ? 'failed'
          : testPlatform.testsPending ? 'pending'
            : 'passed';
        // sort testCaseList by status and name
        testPlatform.testCaseList.sort(function (arg1, arg2) {
          arg1 = arg1.status.replace('passed', 'z') + arg1.name.toLowerCase();
          arg2 = arg2.status.replace('passed', 'z') + arg2.name.toLowerCase();
          return arg1 <= arg2 ? -1 : 1;
        });
      });
      // sort testPlatformList by status and name
      testReport.testPlatformList.sort(function (arg1, arg2) {
        arg1 = arg1.status.replace('passed', 'z') + arg1.name.toLowerCase();
        arg2 = arg2.status.replace('passed', 'z') + arg2.name.toLowerCase();
        return arg1 <= arg2 ? -1 : 1;
      });
      // stop testReport timer
      if (testReport.testsPending === 0) {
        local._timeElapsedParse(testReport);
      }
      // part 2 - merge testReport2.coverage into testReport1.coverage
      testReport1.coverage = testReport1.coverage || {};
      testReport2.coverage = testReport2.coverage || {};
      Object.keys(testReport2.coverage).forEach(function (file) {
        // if file does not exist, then add it
        if (!testReport1.coverage[file]) {
          testReport1.coverage[file] = testReport2.coverage[file];
          return;
        }
        file1 = testReport1.coverage[file];
        file2 = testReport2.coverage[file];
        [
          ['b', 'branchMap'],
          ['f', 'fnMap'],
          ['s', 'statementMap']
        ].forEach(function (item) {
          var countDict1,
            countDict2,
            key1,
            lineDict1,
            lineno,
            mapDict1,
            mapDict2;
          countDict1 = file1[item[0]];
          countDict2 = file2[item[0]];
          lineDict1 = {};
          lineno = function (obj) {
            return item[0] === 'b' ? obj.line + obj.type
              : item[0] === 'f' ? obj.line
                : obj.start.line;
          };
          mapDict1 = file1[item[1]];
          mapDict2 = file2[item[1]];
          // index lineno with the given key
          Object.keys(mapDict1).forEach(function (key1) {
            lineDict1[lineno(mapDict1[key1])] = key1;
          });
          Object.keys(mapDict2).forEach(function (key2) {
            key1 = lineDict1[lineno(mapDict2[key2])];
            // validate key1 exists
            mainApp.assert(key1, mapDict2[key2]);
            // merge count2 into count1
            if (item[0] === 'b') {
              countDict2[key2].forEach(function (count, jj) {
                countDict1[key1][jj] = countDict1[key1][jj] ? countDict1[key1][jj] + count
                  : count;
              });
            } else {
              countDict1[key1] = countDict1[key1] ? countDict1[key1] + countDict2[key2]
                : countDict2[key2];
            }
          });
        });
      });
      // part 3 - create and return html test-report
      // json-copy testReport, which will be modified for html templating
      testReport = JSON.parse(JSON.stringify(testReport));
      // init env
      env = (global.process && process.env) || {};
      // parse timeElapsed
      local._timeElapsedParse(testReport);
      testReport.testPlatformList.forEach(function (testPlatform) {
        local._timeElapsedParse(testPlatform);
        testPlatform.testCaseList.forEach(function (testCase) {
          local._timeElapsedParse(testCase);
          testPlatform.timeElapsed = Math.max(testPlatform.timeElapsed, testCase.timeElapsed);
        });
        testReport.timeElapsed = Math.max(testReport.timeElapsed, testPlatform.timeElapsed);
      });
      // create html test-report
      testCaseNumber = 0;
      if (!mainApp.fileDict['/public/test-report.html.template']) {
        return;
      }
      return mainApp.textFormat(
        mainApp.fileDict['/public/test-report.html.template'].data,
        mainApp.setOverride(testReport, {
          CI_BUILD_NUMBER: env.CI_BUILD_NUMBER,
          // security - sanitize '<' in text
          CI_COMMIT_INFO: String(env.CI_COMMIT_INFO).replace((/</g), '&lt;'),
          name: mainApp.name,
          // map testPlatformList
          testPlatformList: testReport.testPlatformList.map(function (testPlatform, ii) {
            errorMessageList = [];
            testPlatform.screenshotImg = testPlatform.screenshotImg || (mainApp.modeNodejs && (
              (/PhantomJS/).test(testPlatform.name) ?
                  'test-report.screenshot.phantomjs.png'
                : (/SlimerJS/).test(testPlatform.name) ?
                    'test-report.screenshot.slimerjs.png'
                  : mainApp.fs.existsSync('.build/test-report.screenshot.travis.png') ?
                      'test-report.screenshot.travis.png'
                    : ''
            ));
            return mainApp.setOverride(testPlatform, {
              errorMessageList: errorMessageList,
              // security - sanitize '<' in text
              name: String(testPlatform.name).replace((/</g), '&lt;'),
              screenshot: testPlatform.screenshotImg ?
                  '<a class="testReportPlatformScreenshotA" href="' +
                  testPlatform.screenshotImg + '">' +
                  '<img class="testReportPlatformScreenshotImg" src="' +
                  testPlatform.screenshotImg + '">' +
                  '</a>'
                : '',
              // map testCaseList
              testCaseList: testPlatform.testCaseList.map(function (testCase) {
                testCaseNumber += 1;
                if (testCase.errorMessage) {
                  // word wrap error message to 96 characters in html <pre> tag
                  errorMessageList.push({ errorMessage:
                    (testCaseNumber + '. ' + testCase.name + '\n' + testCase.errorMessage)
                      .split('\n')
                      .map(function (line) {
                      for (text = [line]; line.length > 96; line = text[text.length - 1]) {
                        line = [line.slice(0, 95) + '\\', '        ' + line.slice(95)];
                        text.splice(text.length - 1, 1, line[0], line[1]);
                      }
                      return text.join('\n');
                    })
                      .join('\n')
                      // security - sanitize '<' in text
                      .replace((/</g), '&lt;') });
                }
                return mainApp.setOverride(testCase, {
                  testCaseNumber: testCaseNumber,
                  testReportTestStatusClass: 'testReportTest' +
                    testCase.status[0].toUpperCase() + testCase.status.slice(1)
                });
              }),
              testReportPlatformPreClass: 'testReportPlatformPre' +
                (errorMessageList.length ? '' : 'Hidden'),
              testPlatformNumber: ii + 1
            });
          }),
          testsFailedClass: testReport.testsFailed ? 'testReportTestFailed'
            : 'testReportTestPassed'
        })
      );
    },

    testRun: function () {
      /*
        this function runs the tests
      */
      var coveragePercent, remaining, testPlatform, testReport, testReportHtml;
      testReport = mainApp.testReport;
      // start testReport timer
      testReport.timeElapsed = Date.now();
      // init testPlatform
      testPlatform = mainApp.testPlatform;
      // start testPlatform timer
      testPlatform.timeElapsed = Date.now();
      remaining = testPlatform.testCaseList.length;
      testPlatform.testCaseList.forEach(function (testCase) {
        var finished, onEventError;
        onEventError = function (error) {
          // if finished, then fail testCase with error for finishing again
          if (finished) {
            error = error ||
              new Error('callback in testCase ' + testCase.name + ' called multiple times');
          }
          // if error occurred, then fail testCase
          if (error) {
            console.error('\ntestCase ' + testCase.name + ' failed\n' +
              mainApp.errorStack(error));
            testCase.errorMessage = testCase.errorMessage || mainApp.errorStack(error);
          }
          // if finished, then do not finish again
          if (finished) {
            return;
          }
          // finish testCase
          finished = true;
          // stop testCase timer
          local._timeElapsedParse(testCase);
          // decrement test counter
          remaining -= 1;
          // create test-report when all tests have finished
          if (remaining === 0) {
            // stop testPlatform timer
            local._timeElapsedParse(testPlatform);
            // create testReportHtml
            testReportHtml = mainApp.testReportCreate(testReport, {});
            // print test-report summary
            console.log(testReport.testPlatformList.map(function (testPlatform) {
              return '\ntest-report - ' + testPlatform.name + '\n' +
                ('        ' + testPlatform.timeElapsed).slice(-8) + ' ms | ' +
                (' ' + testPlatform.testsFailed).slice(-2) + ' failed | ' +
                ('  ' + testPlatform.testsPassed).slice(-3) + ' passed';
            }).join('\n') + '\n');
            // nodejs code
            if (mainApp.modeNodejs) {
              // create html test-report
              console.log('\ncreating test-report file://' + process.cwd() +
                '/.build/test-report.html');
              mainApp.fs.writeFileSync('.build/test-report.html', testReportHtml);
              // create build badge
              mainApp.fs.writeFileSync(
                '.build/build.badge.svg',
                mainApp.fileDict['.build/build.badge.svg'].data
                  // edit branch name
                  .replace(
                    (/0000 00 00 00 00 00/g),
                    new Date().toISOString().slice(0, 19).replace('T', ' ')
                  )
                  // edit branch name
                  .replace((/- master -/g), '| ' + process.env.CI_BRANCH + ' |')
                  // edit commit id
                  .replace(
                    (/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/g),
                    process.env.CI_COMMIT_ID
                  )
              );
              // create test-report badge
              mainApp.fs.writeFileSync(
                '.build/test-report.badge.svg',
                mainApp.fileDict['.build/test-report.badge.svg'].data
                  // edit number of tests failed
                  .replace((/999/g), testReport.testsFailed)
                  // edit badge color
                  .replace((/d00/g), testReport.testsFailed ? 'd00' : '0d0')
              );
              // non-zero exit if tests failed
              setTimeout(function () {
                // finalize mainApp.testReport
                mainApp.testReportCreate(testReport, {});
                process.exit(testReport.testsFailed);
              }, 1000);
              if (mainApp.modeCoverage && !mainApp.modeTestDummy) {
                // create html coverage-report
                console.log('creating coverage-report file://' + process.cwd() +
                  '/.build/coverage-report.html/index.html');
                // create coverage-report badge
                coveragePercent = [0, 0];
                Object.keys(testReport.coverage).forEach(function (statementDict) {
                  statementDict = testReport.coverage[statementDict].s;
                  Object.keys(statementDict).forEach(function (key) {
                    coveragePercent[0] += statementDict[key] ? 1 : 0;
                  });
                  coveragePercent[1] += Object.keys(statementDict).length;
                });
                coveragePercent = 100 * coveragePercent[0] / coveragePercent[1];
                mainApp.fs.writeFileSync(
                  '.build/coverage-report.badge.svg',
                  mainApp.fileDict['.build/coverage-report.badge.svg']
                    .data
                    // edit coverage badge percent
                    .replace((/100.0/g), coveragePercent.toFixed(1))
                    // edit coverage badge color
                    .replace(
                      (/0d0/g),
                      ('0' + Math.round((100 - coveragePercent) * 2.21).toString(16))
                        .slice(-2) +
                        ('0' + Math.round(coveragePercent * 2.21).toString(16)).slice(-2) +
                        '00'
                    )
                );
              }
            // browser code
            } else {
              // notify saucelabs of test results
              global.global_test_results = {
                testReport: mainApp.testReport,
                testCallbackId: mainApp.testCallbackId,
                // extra stuff to keep saucelabs happy - https://saucelabs.com/docs/rest#jsunit
                failed: mainApp.testReport.testsFailed
              };
              // upload brower test-report back to server
              mainApp.testReportUpload();
            }
          }
        };
        // run testCase in try-catch block
        try {
          // start testCase timer
          testCase.timeElapsed = Date.now();
          testCase.callback(onEventError);
          // coverage - if mainApp.modeTestFail,
          // then throw a dummy error to cover error handling behavior
          mainApp.errorThrow(mainApp.modeTestFail &&
              testCase.name !== 'utility2.submoduleUtility2Nodejs._phantomjsTest_default_test'
              &&
              testCase.name !== 'utility2.submoduleUtility2Nodejs.__saucelabsTest_default_test'
              &&
              mainApp.errorDefault);
        } catch (errorCaught) {
          onEventError(errorCaught);
        }
      });
    },

    testTryCatch: function (callback, onEventError) {
      /*
        this function calls the callback in a try-catch block,
        and falls back to onEventError if an error is thrown
      */
      try {
        callback();
      } catch (errorCaught) {
        onEventError(errorCaught);
      }
    },

    // ascii character reference
    textExampleAscii: '\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f' +
      '\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f' +
      ' !"#$%&\'()*+,-./0123456789:;<=>?' +
      '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_' +
      '`abcdefghijklmnopqrstuvwxyz{|}~\x7f',

    textFormat: function (template, dict) {
      /*
        this function replaces the keys in given text template
        with the key / value pairs provided by the dict
      */
      var value;
      dict = dict || {};
      // search for keys in the template
      return local._textFormatList(template, dict).replace((/\{\{[^{}]+\}\}/g), function (key) {
        // lookup key's value in the dict
        value = key.slice(2, -2);
        return dict.hasOwnProperty(value) ? dict[value] : key;
      });
    },

    _textFormat_default_test: function (onEventError) {
      /*
        this function tests textFormat's default handling behavior
      */
      var data;
      data = mainApp.textFormat('{{aa}}{{aa}}{{bb}}{{bb}}{{cc}}{{cc}}', {
        // test string handling behavior
        aa: 'aa',
        // test non-string handling behavior
        bb: undefined
      });
      mainApp.assert(data === 'aaaaundefinedundefined{{cc}}{{cc}}', data);
      // test list handling behavior
      data = mainApp.textFormat('[{{@list1}}[{{@list2}}{{aa}},{{/@list2}}],{{/@list1}}]', {
        list1: [
          // test null handling behavior
          null,
          // test recursive list handling behavior
          { list2: [{ aa: 'bb' }, { aa: 'cc' }] }
        ]
      });
      mainApp.assert(data === '[[{{@list2}}{{aa}},{{/@list2}}],[bb,cc,],]', data);
      onEventError();
    },

    _textFormatList: function (template, dict) {
      /*
        this function replaces the keys in given text template
        with the key / value pairs provided by the dict
      */
      var rgx, match, onEventReplace;
      onEventReplace = function (_, fragment) {
        // nop hack to pass jslint
        mainApp.nop(_);
        return dict[match].map(function (dict) {
          return mainApp.textFormat(fragment, dict);
        }).join('');
      };
      rgx = (/\{\{@[^{]+\}\}/g);
      while (true) {
        // search for array keys in the template
        match = rgx.exec(template);
        if (!match) {
          break;
        }
        // lookup key's value in the dict
        match = match[0].slice(3, -2);
        if (Array.isArray(dict[match])) {
          template = template.replace(
            new RegExp('\\{\\{@' + match + '\\}\\}([\\S\\s]*?)\\{\\{\\/@' + match + '\\}\\}'),
            onEventReplace
          );
        }
      }
      return template;
    },

    _timeElapsedParse: function (obj) {
      /*
        this function parses test timeElapsed
      */
      if (obj.timeElapsed > 0xffffffff) {
        obj.timeElapsed = Date.now() - obj.timeElapsed;
      }
    },

    tryCatchHandler: function (onEventError) {
      /*
        this function returns a callback that will call onEventError in a try-catch block
      */
      return function (error, data) {
        if (error) {
          onEventError(error, data);
        }
        try {
          onEventError(error, data);
        } catch (errorCaught) {
          onEventError(errorCaught, data);
        }
      };
    }

  };
  local._init();
}());



(function submoduleUtility2Browser() {
  /*
    this browser submodule exports useful utilities
  */
  'use strict';
  var local = {
    _name: 'utility2.submoduleUtility2Browser',

    _init: function () {
      /*
        this function inits this submodule
      */
      if (mainApp.modeNodejs) {
        return;
      }
      // override mainApp with mainApp.argvDict
      mainApp.setOverride(mainApp, mainApp.argvDict);
      // init this submodule
      mainApp.initSubmodule(local);
      // init ajax
      local._initAjax();
      // init test
      local._initTest();
    },

    __init_browser_test: function (onEventError) {
      /*
        this function tests _init's browser handling behavior
      */
      mainApp.testMock(onEventError, [
        [mainApp, { modeTest: null, modeTestReportUpload: null }]
      ], function (onEventError) {
        // test _initTest's nop handling behavior
        local._initTest();
        // test testReportUpload's nop handling behavior
        mainApp.testReportUpload();
        onEventError();
      });
    },

    _initAjax: function () {
      /*
        this function inits the ajax api
      */
      var tmp;
      // coverage - if mainApp.modeTestDummy, then cover no-ajaxProgress handling behavior
      if (mainApp.modeTestDummy) {
        tmp = document.getElementsByClassName('ajaxProgressDiv')[0];
        tmp.parentNode.removeChild(tmp);
      }
      // init ajaxProgressDiv element
      local._ajaxProgressDiv = document.getElementsByClassName('ajaxProgressDiv')[0] ||
        document.createElement('div');
      // init ajaxProgressBarDiv element
      local._ajaxProgressBarDiv = document.getElementsByClassName('ajaxProgressBarDiv')[0] ||
        document.createElement('div');
      // check ajaxProgress status every second, and hide the ajaxProgressBar if necessary
      local._ajaxProgressHide();
    },

    _initTest: function () {
      /*
        this function inits the test api
      */
      var timerInterval;
      // if modeTest is diabled, then do not run tests
      if (!mainApp.modeTest) {
        return;
      }
      // run test after all external resources have been loaded
      window.addEventListener('load', function () {
        // init testReportDiv element
        mainApp.testReportDiv = document.createElement('div');
        document.body.appendChild(mainApp.testReportDiv);
        // create initial blank test page
        mainApp.testReportDiv.innerHTML = mainApp.testReportCreate(mainApp.testReport, {});
        // update test-report status every 1000 ms until finished
        timerInterval = setInterval(function () {
          // update mainApp.testReportDiv in browser
          mainApp.testReportDiv.innerHTML = mainApp.testReportCreate(mainApp.testReport, {});
          if (mainApp.testReport.testsPending === 0) {
            // cleanup timerInterval
            clearInterval(timerInterval);
          }
        }, 1000);
      });
    },

    ajax: function (options, onEventError) {
      /*
        this functions performs a brower ajax request with error handling and timeout
      */
      var data, error, errorStack, finished, ii, onEventEvent, timerTimeout, xhr;
      // init stack trace of this function's caller in case of error
      errorStack = new Error().stack;
      // event handling
      onEventEvent = function (event) {
        // if already finished, then ignore event
        if (finished) {
          return;
        }
        switch (event.type) {
        case 'abort':
        case 'error':
        case 'load':
          finished = true;
          // cleanup timerTimeout
          clearTimeout(timerTimeout);
          // validate xhr exists in local._ajaxProgressList
          ii = local._ajaxProgressList.indexOf(xhr);
          mainApp.assert(ii >= 0, 'missing xhr in local._ajaxProgressList');
          // remove xhr from ajaxProgressList
          local._ajaxProgressList.splice(ii, 1);
          if (!error) {
            // handle abort or error event
            if (event.type === 'abort' || event.type === 'error' || xhr.status >= 400) {
              error = new Error(event.type);
            }
          }
          // xhr request completed
          if (xhr.readyState === 4) {
            // handle text data
            data = xhr.responseText;
            if (error) {
              // add http method / statusCode / url debug info to error.message
              error.message = options.method + ' ' + xhr.status + ' - ' +
                options.url + '\n' +
                JSON.stringify(xhr.responseText.slice(0, 256) + '...') + '\n' +
                // trim potentially very long html response
                error.message.slice(0, 4096);
              // debug status code
              error.statusCode = xhr.status;
              if (errorStack && error.stack) {
                error.stack += '\n' + errorStack;
              }
            }
          }
          onEventError(error, data, xhr);
          break;
        }
        // increment ajaxProgressBar
        if (local._ajaxProgressList.length > 0) {
          local._ajaxProgressIncrement();
          return;
        }
        // finish ajaxProgressBar
        local._ajaxProgressUpdate('100%', 'ajaxProgressBarDivSuccess', 'loaded');
      };
      // init xhr
      xhr = new XMLHttpRequest();
      // debug xhr
      mainApp.debugXhr = xhr;
      // init event handling
      xhr.addEventListener('abort', onEventEvent);
      xhr.addEventListener('error', onEventEvent);
      xhr.addEventListener('load', onEventEvent);
      xhr.addEventListener('loadstart', local._ajaxProgressIncrement);
      xhr.addEventListener('progress', local._ajaxProgressIncrement);
      xhr.upload.addEventListener('progress', local._ajaxProgressIncrement);
      // set timerTimeout
      timerTimeout = mainApp.onEventTimeout(function (errorTimeout) {
        error = errorTimeout;
        onEventEvent({ type: 'abort' });
      }, options.timeout || mainApp.timeoutDefault, 'ajax');
      // if ajaxProgressBar is hidden, then display it
      if (local._ajaxProgressList.length === 0) {
        local._ajaxProgressDiv.style.display = 'block';
      }
      // add xhr to local._ajaxProgressList
      local._ajaxProgressList.push(xhr);
      // open url
      xhr.open(options.method || 'GET', options.url);
      // send request headers
      Object.keys(options.headers || {}).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });
      // send data
      xhr.send(options.data);
    },

    _ajaxProgressHide: function () {
      // keep track of how many consecutive cycles ajaxProgress is complete
      if (local._ajaxProgressList.length === 0 &&
          local._ajaxProgressDiv.style.display !== 'none') {
        local._ajaxProgressHideMode += 1;
        // if ajaxProgress is complete for 2 consecutive cycles,
        // then hide ajaxProgressBar and reset ajaxProgress
        if (local._ajaxProgressHideMode === 2) {
          local._ajaxProgressHideMode = 0;
          // hide ajaxProgressBar
          local._ajaxProgressDiv.style.display = 'none';
          // reset ajaxProgress
          local._ajaxProgressState = 0;
          local._ajaxProgressUpdate('0%', 'ajaxProgressBarDivLoading', 'loading');
        }
      } else {
        local._ajaxProgressHideMode = 0;
      }
      // check ajaxProgress status every second
      setTimeout(local._ajaxProgressHide, 1000);
    },

    _ajaxProgressHideMode: 0,

    _ajaxProgressIncrement: function () {
      /*
        this function increments the ajaxProgressBar
      */
      // this algorithm can indefinitely increment the ajaxProgressBar
      // with successively smaller increments without ever reaching 100%
      local._ajaxProgressState += 1;
      local._ajaxProgressUpdate(
        100 - 75 * Math.exp(-0.125 * local._ajaxProgressState) + '%',
        'ajaxProgressBarDivLoading',
        'loading'
      );
    },

    // list of xhr used in ajaxProgress
    _ajaxProgressList: [],

    _ajaxProgressState: 0,

    _ajaxProgressUpdate: function (width, type, label) {
      /*
        this function visually updates the ajaxProgressBar
      */
      local._ajaxProgressBarDiv.style.width = width;
      local._ajaxProgressBarDiv.className = local._ajaxProgressBarDiv.className
        .replace((/ajaxProgressBarDiv\w+/), type);
      local._ajaxProgressBarDiv.innerHTML = label;
    },

    testReportUpload: function () {
      /*
        this function uploads the brower test-report back to server
      */
      // if !mainApp.modeTestReportUpload, then do not upload browser test-report
      if (!mainApp.modeTestReportUpload) {
        return;
      }
      setTimeout(function () {
        mainApp.ajax({
          data: JSON.stringify(global.global_test_results),
          method: 'POST',
          url: '/test/test-report-upload'
        }, mainApp.onEventErrorDefault);
      // coverage - use 1000 ms to cover async cleanup code in browser
      }, 1000);
    }

  };
  local._init();
}());



(function submoduleUtility2Nodejs() {
  /*
    this nodejs submodule exports useful utilities
  */
  'use strict';
  var local = {
    _name: 'utility2.submoduleUtility2Nodejs',

    _init: function () {
      /*
        this function inits this submodule
      */
      // init this submodule
      mainApp.initSubmodule(local);
      // require builtin modules
      [
        'child_process', 'crypto',
        'fs',
        'http', 'https',
        'module',
        'path',
        'url', 'util',
        'vm'
      ].forEach(function (module) {
        mainApp[module] = mainApp[module] || require(module);
      });
      // require external modules
      [
        'istanbul',
        'jslint-lite'
      ].forEach(function (module) {
        try {
          mainApp[module.replace((/-/g), '_')] = require(module);
        } catch (ignore) {
        }
      });
      // bug - jslint-lite does not have jslintPrint method when requiring itself
      mainApp.setDefault(mainApp, { jslint_lite: { jslintPrint: mainApp.nop } });
      // override mainApp with package.json object
      mainApp.setOverride(mainApp, require(__dirname + '/package.json'));
      // init and watch package files
      local._initFile();
      // if this module is not in the root directory, then do not run this module as an app
      if (__dirname !== process.cwd() || mainApp.argvDict.modeNpmPackage) {
        return;
      }
      // init cli
      local._initCli();
      // init coverage
      local._initCoverage(global);
      // re-init and re-watch package files
      local._initFile();
      // init repl
      mainApp.initRepl({ mainApp: mainApp });
      // init server
      local._initServer();
    },

    __init_nodejs_test: function (onEventError) {
      /*
        this function tests _init's nodejs handling behavior
      */
      var onEventRemaining, remaining, remainingError;
      onEventRemaining = function (error) {
        remaining -= 1;
        remainingError = remainingError || error;
        if (remaining === 0) {
          onEventError(remainingError);
        }
      };
      remaining = 5;
      // test _initCli's default handling behavior
      mainApp.testMock(onEventRemaining, [
        [process, { on: mainApp.callArg1 }],
        [mainApp, { fs: { writeFileSync: mainApp.nop } }]
      ], function (onEventError) {
        // test update external resources hnadling behavior
        mainApp.modeCliDict.updateExternal();
        onEventError();
      });
      // test _initCoverage's nop handling behavior
      mainApp.testMock(onEventRemaining, [
        [process, { on: mainApp.nop }],
        [mainApp, { fs: { existsSync: mainApp.nop } }]
      ], function (onEventError) {
        // test no process.env.MODE_TEST_REPORT_MERGE handling behavior
        local._initCoverage({ process: { env: {} } });
        // test no old coverage exists handling behavior
        local._initCoverage({ process: { env: { MODE_TEST_REPORT_MERGE: true } } });
        onEventError();
      });
      // test _initFile's watchFile handling behavior
      [
        // test auto-jslint handling behavior
        'example.js',
        // test auto-init handling behavior
        'main.data'
      ].forEach(function (file) {
        mainApp.fs.stat(file, function (error, stat) {
          // test default watchFile handling behavior
          remaining += 1;
          mainApp.fs.utimes(file, stat.atime, new Date(), onEventRemaining);
          // test nop watchFile handling behavior
          remaining += 1;
          setTimeout(function () {
            mainApp.fs.utimes(file, stat.atime, stat.mtime, onEventRemaining);
          // coverage - use 1500 ms to cover setInterval watchFile in nodejs
          }, 1500);
          onEventRemaining(error);
        });
      });
      // test _initReplEval's default handling behavior
      [
        // test shell handling behavior
        '($ :\n)',
        // test print handling behavior
        '(print\n)'
      ].forEach(function (script) {
        local._initReplEval(script, null, 'repl', mainApp.nop);
      });
      // test error handling behavior
      local._initReplEval('syntax error', null, 'repl', function (error) {
        mainApp.testTryCatch(function () {
          // validate error occurred
          // bug - use util.isError to validate error when using eval
          mainApp.assert(mainApp.util.isError(error), error);
          onEventRemaining();
        }, onEventRemaining);
      });
    },

    _initCli: function () {
      /*
        this function inits the cli
      */
      var tmp;
      // override mainApp with mainApp.argvDict
      mainApp.setOverride(mainApp, mainApp.argvDict);
      // init cli after all modules have been synchronously loaded
      setTimeout(function () {
        tmp = mainApp.modeCliDict[mainApp.modeCli];
        if (tmp) {
          tmp();
        }
      });
    },

    _initCoverage: function (global) {
      /*
        this function inits coverage of this app
      */
      var tmp;
      // merge old coverage and test-report
      if (global.process.env.MODE_TEST_REPORT_MERGE) {
        // if a previous test-report exists, then merge it into mainApp.testReport
        if (mainApp.fs.existsSync('.build/test-report.json')) {
          mainApp.testReportCreate(mainApp.testReport, require('./.build/test-report.json'));
        // if a previous coverage exists, then merge it into mainApp.testReport
        } else if (mainApp.fs.existsSync('.build/coverage-report.html/coverage.json')) {
          mainApp.testReportCreate(mainApp.testReport, {
            coverage: require('./.build/coverage-report.html/coverage.json')
          });
        }
        // coverage - save coverages and tests on exit
        process.on('exit', function () {
          // save mainApp.testReport to ./build/test-report.json
          mainApp.fs.writeFileSync(
            '.build/test-report.json',
            JSON.stringify(mainApp.testReport)
          );
        });
      }
      // init testReport.coverage object
      Object.keys(global).forEach(function (key) {
        if (key.indexOf('$$cov_') === 0) {
          tmp = mainApp.testReport.coverage;
          // reference mainApp.testReport.coverage to global coverage object
          mainApp.testReport.coverage = global[key];
          // merge old coverage object to the global coverage object
          mainApp.testReportCreate(mainApp.testReport, { coverage: tmp });
        }
      });
    },

    _initFile: function () {
      /*
        this function inits and watches package files.
        it parses the file data, and saves it to mainApp.fileDict
      */
      var cacheFile, parseFile, removeSubmodule;
      cacheFile = function (options) {
        /*
          this function creates a unique cache url for the file data
        */
        var file, fileCache;
        file = options.file;
        // cache only package files or /public/* files
        if ((/^(?:main.data|main.js|utility2.data|utility2.js)$/).test(file)) {
          file = '/public/cache/' + file;
        }
        if (file.indexOf('/public/cache/') !== 0) {
          return;
        }
        // add .js extension for main.data and utility2.data
        if ((/^\/public\/cache\/(?:main\.data|utility2\.data)$/).test(file)) {
          file += '.js';
        }
        // create unique cache url for the file data using its sha256 hash
        fileCache = mainApp[file] = mainApp[file] || file + '.' +
          mainApp.crypto.createHash('sha256').update(options.data).digest('hex') +
          mainApp.path.extname(file);
        mainApp.fileDict[fileCache] = options;
      };
      parseFile = function (file) {
        /*
          this function parses the file data and saves it to mainApp.fileDict
        */
        var data;
        // init mainApp.fileDict[file]
        mainApp.fileDict[file] = {
          dataRaw: mainApp.fs.readFileSync(__dirname + '/' + file, 'utf8'),
          file: file
        };
        data = mainApp.fileDict[file].dataRaw
          // comment out shebang
          .replace((/^#!/), '//#!');
        switch (file) {
        case 'example.js':
          mainApp.stateBrowser.fileDict[file] = { data: data, file: file };
          break;
        case 'main.js':
        case 'utility2.js':
          // remove nodejs submodules from script
          data = removeSubmodule(data, 'Nodejs', file);
          break;
        case 'main.data':
        case 'utility2.data':
          data.replace(
            (/^\/\* FILE_BEGIN ([\S\s]+?) \*\/$([\S\s]+?)^\/\* FILE_END \*\/$/gm),
            function (_, options, data2, ii) {
              // nop hack to pass jslint
              mainApp.nop(_);
              options = JSON.parse(options);
              // save options to mainApp.fileDict
              mainApp.fileDict[options.file] = mainApp.setOverride(options, {
                // preserve lineno
                data: data.slice(0, ii).replace((/.*/g), '') + data2,
                dataRaw: data2,
                fileParent: file
              });
              // run each action in options.actionList
              options.actionList.forEach(function (action) {
                // validate action exists
                mainApp.assert(mainApp.fileActionDict[action], 'invalid file action ', action);
                mainApp.fileActionDict[action](options);
              });
              // create unique cache url for the file data
              cacheFile(options);
            }
          );
          // cull file to only have submodules
          data = ('}());\n\n\n\n' + data + '\n(function submoduleFooBrowser() {').replace((
            /(^\}\(\)\);\n\n\n\n)([\S\s]+?)(^\(function submodule\w+(?:Browser|Nodejs|Shared)\(\) \{$)/gm
          ), function (_, header, body, footer) {
            // nop hack to pass jslint
            mainApp.nop(_);
            // preserve lineno
            return header + body.replace((/.*/g), '') + footer;
          }).replace('}());\n\n\n\n', '').replace((/.*$/), '').trimRight();
          // eval embedded nodejs script in data file
          // remove browser submodules from script
          mainApp.vm.runInNewContext(removeSubmodule(data, 'Browser', file), {
            console: console,
            $$mainApp: mainApp
          }, file);
          // remove nodejs submodules from data file
          data = removeSubmodule(data, 'Nodejs', file);
          break;
        }
        // save file data to mainApp.fileDict
        mainApp.fileDict[file].data = data.trimRight();
        // create unique cache url for the file data
        cacheFile(mainApp.fileDict[file]);
        // update mainApp.stateBrowserJson
        mainApp.stateBrowserJson = JSON.stringify(mainApp.stateBrowser);
      };
      removeSubmodule = function (script, mode, file) {
        /*
          this function removes submodules with the specified mode from the script
        */
        script = (script + '\n\n\n\n').replace(new RegExp(
          '^\\(function submodule\\w+' + mode + '\\(\\) \\{[\\S\\s]+?^\\}\\(\\)\\);\n\n\n\n',
          'gm'
        ), function (match) {
          // preserve lineno
          return match.replace((/.*/g), '');
        }).trimRight();
        switch (file) {
        case 'main.js':
        case 'utility2.js':
          // if mainApp.modeCoverage, then instrument the script
          if (mainApp.modeCoverage) {
            script = new mainApp.istanbul.Instrumenter()
              .instrumentSync(script, __dirname + '/' + file);
          }
          break;
        }
        switch (mode) {
        case 'Nodejs':
          script = '(function () {' +
            'var global = window;' +
            'var mainApp = global.$$mainApp = global.$$mainApp || {};' +
            script +
            '}());';
          break;
        }
        return script;
      };
      // init data files
      ['utility2.data', 'main.data'].forEach(parseFile);
      // if this module is not in the root directory, then do not run the following code
      if (__dirname !== process.cwd() || mainApp.argvDict.modeNpmPackage) {
        return;
      }
      // watch and auto-init data files
      ['main.data', 'utility2.data'].forEach(function (file) {
        // cleanup any existing watchers on the file
        mainApp.fs.unwatchFile(file);
        // watch the file using 1000 ms polling
        mainApp.fs.watchFile(file, {
          interval: 1000,
          persistent: false
        }, function (stat2, stat1) {
          if (stat2.mtime >= stat1.mtime) {
            // save file data to mainApp.fileDict
            parseFile(file);
          }
        });
      });
      // watch and auto-jslint js files
      ['example.js', 'main.js', 'package.json', 'utility2.js'].forEach(function (file) {
        // save file data to mainApp.fileDict
        parseFile(file);
        // cleanup any existing watchers on the file
        mainApp.fs.unwatchFile(file);
        // watch the file using 1000 ms polling
        mainApp.fs.watchFile(file, {
          interval: 1000,
          persistent: false
        }, function (stat2, stat1) {
          if (stat2.mtime >= stat1.mtime) {
            // if modified, auto-jslint the file
            mainApp.jslint_lite.jslintPrint(
              mainApp.fs.readFileSync(file, 'utf8'),
              file
            );
            // if modified, re-save file data to mainApp.fileDict
            parseFile(file);
          }
        });
      });
    },

    initRepl: function (global) {
      /*
        this function inits the repl debugger
      */
      if (!mainApp.modeRepl) {
        return;
      }
      // save repl context
      local._initReplContext = require('repl')
        // start repl
        .start({ eval: local._initReplEval })
        .context;
      // export global object
      Object.keys(global).forEach(function (key) {
        local._initReplContext[key] = global[key];
      });
    },

    _initReplEval: function (script, __, file, onEventError) {
      /*
        this function custom evals the repl stdin
      */
      var match;
      try {
        // nop hack to pass jslint
        mainApp.nop(__);
        match = (/^\(([^ ]+)(.*)\n\)/).exec(script);
        if (match && mainApp.replParseDict[match[1]]) {
          script = mainApp.replParseDict[match[1]](match[2]);
        }
        onEventError(null, mainApp.vm.runInNewContext(script, local._initReplContext, file));
      } catch (errorCaught) {
        onEventError(errorCaught);
      }
    },

    _initServer: function () {
      /*
        this function inits the server
      */
      if (!mainApp.serverPort || mainApp.serverPort === true) {
        return;
      }
      // validate mainApp.serverPort is a valid port number
      mainApp.assert(
        (mainApp.serverPort | 0) === mainApp.serverPort &&
          0 < mainApp.serverPort && mainApp.serverPort < 0x10000,
        'invalid mainApp.serverPort ' + mainApp.serverPort
      );
      // init mainApp.localhost with hostname and port
      mainApp.localhost = 'http://localhost:' + mainApp.serverPort;
      console.log('\nserver starting on port ' + mainApp.serverPort + ' ...');
      // init server with mainApp.serverMiddleware
      mainApp.http.createServer(function (request, response) {
        mainApp.serverMiddleware(request, response, function (error) {
          mainApp.serverRespondDefault(request, response, error ? 500 : 404, error);
        });
      })
        // set server to listen on mainApp.serverPort
        .listen(mainApp.serverPort, function () {
          console.log('... server started on port ' + mainApp.serverPort);
        });
    },

    ajax: function (options, onEventError) {
      /*
        this functions performs a nodejs http(s) request with error handling and timeout
      */
      var finished,
        modeIo,
        onEventIo,
        request,
        response,
        responseText,
        timerTimeout,
        urlParsed;
      modeIo = 0;
      onEventIo = function (error, data) {
        modeIo = error instanceof Error ? -1 : modeIo + 1;
        switch (modeIo) {
        case 1:
          // clear old timerTimeout
          clearTimeout(timerTimeout);
          // set timerTimeout
          timerTimeout = mainApp.onEventTimeout(
            onEventIo,
            options.timeout || mainApp.timeoutDefault,
            'ajax ' + options.url
          );
          // handle implicit localhost
          if (options.url[0] === '/') {
            options.url = mainApp.localhost + options.url;
          }
          // parse options.url
          urlParsed = mainApp.url.parse(options.url);
          // disable socket pooling
          options.agent = options.agent || false;
          // hostname needed for http(s).request
          options.hostname = urlParsed.hostname;
          // path needed for http(s).request
          options.path = urlParsed.path;
          // port needed for http(s).request
          options.port = urlParsed.port;
          // protocol needed for http(s).request
          options.protocol = urlParsed.protocol;
          // init headers
          options.headers = options.headers || {};
          // init content-length header
          options.headers['content-length'] =
            typeof options.data === 'string' ? Buffer.byteLength(options.data)
            : Buffer.isBuffer(options.data) ? options.data.length
              : 0;
          // make http(s) request
          request = (options.protocol === 'https:' ? mainApp.https : mainApp.http)
            .request(options, onEventIo)
            // handle error event
            .on('error', onEventIo);
          // debug ajax request
          mainApp.debugAjaxRequest = request;
          // send request and/or data
          request.end(options.data);
          break;
        case 2:
          response = error;
          // debug ajax response
          mainApp.debugAjaxResponse = response;
          // concat response stream into responseText
          mainApp.streamReadAll(response, onEventIo);
          break;
        case 3:
          // init responseText
          responseText = options.resultType === 'binary' ? data : data.toString();
          // error handling for http status code >= 400
          if (response.statusCode >= 400) {
            onEventIo(new Error(responseText));
            return;
          }
          // successful response
          onEventIo(null, responseText);
          break;
        default:
          // if already finished, then ignore error / data
          if (finished) {
            return;
          }
          finished = true;
          // cleanup timerTimeout
          clearTimeout(timerTimeout);
          // cleanup request socket
          request.destroy();
          // cleanup response socket
          if (response) {
            response.destroy();
          }
          if (error) {
            // add http method / statusCode / url debug info to error.message
            error.message = options.method + ' ' + (response && response.statusCode) + ' - ' +
              options.url + '\n' +
              JSON.stringify((responseText || '').slice(0, 256) + '...') + '\n' +
              // trim potentially very long html response
              error.message.slice(0, 4096);
            // debug status code
            error.statusCode = response && response.statusCode;
            onEventError(error, responseText);
            return;
          }
          onEventError(null, responseText);
        }
      };
      onEventIo();
    },

    fileActionDict_exportFile: function (options) {
      /*
        this function exports the file to stateBrowser
      */
      mainApp.stateBrowser.fileDict[options.file] = options;
      mainApp.setOverride(mainApp.stateBrowser, {
        description: mainApp.description,
        name: mainApp.name
      });
    },

    fileActionDict_format: function (options) {
      /*
        this function formats the file with the mainApp dict
      */
      options.data = mainApp.textFormat(options.data, mainApp);
    },

    fileActionDict_install: function (options) {
      /*
        this function installs the file embedded in a *.data resource file
      */
      // if this this module is in the root directory, then install embedded file
      if (mainApp.modeCli === 'npmPostinstall' && __dirname === process.cwd()) {
        mainApp.fs.writeFileSync(options.file, options.data);
      }
    },

    fileActionDict_lint: function (options) {
      /*
        this function lints the file
      */
      switch (mainApp.path.extname(options.file)) {
      case '.js':
      case '.json':
        mainApp.jslint_lite.jslintPrint(options.data, options.file);
        break;
      }
    },

    fileActionDict_trim: function (options) {
      /*
        this function trims the file data
      */
      options.data = options.data.trim();
    },

    fileActionDict_updateExternal: function (options) {
      /*
        this function updates external sources embedded in the data file
      */
      // do not update external resources unless specified in cli
      if (mainApp.modeCli !== 'updateExternal') {
        return;
      }
      console.log('updateExternal - updating ' + options.externalUrl);
      mainApp.ajax({ url: options.externalUrl }, function (error, data) {
        // validate no error occurred
        mainApp.assert(!error, error);
        mainApp.fileDict[options.fileParent].dataRaw =
          mainApp.fileDict[options.fileParent].dataRaw.replace(options.dataRaw, '\n' +
            data.trim() + '\n');
      });
    },

    modeCliDict_githubContentsFilePut: function () {
      /*
        this function puts the local file1 to the remote github file2
      */
      var blob, file1, file2, modeIo, onEventIo, options, sha;
      modeIo = 0;
      onEventIo = function (_, data) {
        // nop hack to pass jslint
        mainApp.nop(_);
        modeIo += 1;
        switch (modeIo) {
        case 1:
          file1 = process.argv[3];
          file2 = file1.replace(process.argv[4], process.argv[5]);
          console.log('putting file https://' +
            process.env.GITHUB_REPO.replace('/', '.github.io/') + '/' + file2);
          options = {
            headers: {
              // github oauth authentication
              authorization: 'token ' + process.env.GITHUB_TOKEN,
              // bug - github api requires user-agent header
              'user-agent': 'undefined'
            },
            url: 'https://api.github.com/repos/' + process.env.GITHUB_REPO +
              '/contents/' + mainApp.path.dirname(file2) + '?ref=gh-pages'
          };
          mainApp.ajax(options, onEventIo);
          break;
        case 2:
          blob = mainApp.fs.readFileSync(file1);
          data = data && JSON.parse(data);
          if (Array.isArray(data)) {
            data.forEach(function (dict) {
              // calculate blob-sha
              if (dict.path === file2) {
                sha = dict.sha;
              }
            });
          }
          options.data = JSON.stringify({
            branch: 'gh-pages',
            content: blob.toString('base64'),
            message: '[skip ci] update file ' + file2,
            sha: sha
          });
          options.method = 'PUT';
          options.url = 'https://api.github.com/repos/' + process.env.GITHUB_REPO +
            '/contents/' + file2;
          mainApp.ajax(options, mainApp.errorThrow);
          break;
        }
      };
      onEventIo();
    },

    modeCliDict_saucelabsScreenshot: function () {
      /*
        this function grabs screenshots using saucelabs
      */
      var modeIo, onEventIo, options;
      modeIo = 0;
      onEventIo = function (error, data) {
        // validate no error occurred
        mainApp.assert(!error, error);
        modeIo += 1;
        switch (modeIo) {
        case 1:
          mainApp.onEventTimeout(
            onEventIo,
            mainApp.timeoutDefault,
            'saucelabsScreenshot ' + JSON.stringify(process.argv)
          )
            // unref timerTimout so process can exit normally
            .unref();
          options = {
            // json-copy options
            data: JSON.stringify({
              // specify custom test framework in saucelabs
              framework: 'custom',
              // set max-duration timeout in seconds
              'max-duration': 30,
              platforms: [["linux", "googlechrome", ""]],
              // disable video recording for faster performance
              'record-video': false,
              url: process.argv[3]
            }),
            headers: {
              authorization: 'Basic ' + new Buffer(process.env.SAUCE_USERNAME + ':' +
                process.env.SAUCE_ACCESS_KEY).toString('base64'),
              'content-type': 'application/json'
            },
            method: 'POST',
            url: 'https://saucelabs.com/rest/v1/' + process.env.SAUCE_USERNAME + '/js-tests'
          };
          // create job request
          mainApp.ajax(options, onEventIo);
          break;
        case 2:
          // get job status
          options.data = data;
          options.url += '/status';
          onEventIo();
          break;
        case 3:
          // try to get job_id
          mainApp.ajax(options, onEventIo);
          break;
        case 4:
          data = JSON.parse(data)['js tests'][0].job_id;
          // if job_id is not available yet, then try getting it again
          if (data === 'job not ready') {
            modeIo -= 2;
            setTimeout(onEventIo, 4000);
            return;
          }
          // create screenshot url
          options.method = 'GET';
          options.resultType = 'binary';
          options.url = 'https://saucelabs.com/jobs/' + data + '/0003screenshot.png';
          onEventIo();
          break;
        case 5:
          // try to get screenshot
          setTimeout(function () {
            mainApp.ajax(options, function (error, data) {
              // if screenshot is not available yet, then try getting it again
              if (error) {
                modeIo -= 1;
                onEventIo();
                return;
              }
              // else save screenshot to file
              mainApp.fs.writeFile(
                process.argv[4],
                data,
                mainApp.onEventErrorDefault
              );
            });
          }, 4000);
          break;
        }
      };
      onEventIo();
    },

    modeCliDict_saucelabsTest: function () {
      /*
        this function runs saucelabs tests with the given json options piped from stdin
      */
      var options;
      options = JSON.parse(mainApp.fs.readFileSync('.install/saucelabs-options.json'));
      // override timeoutDefault to 300000 ms
      mainApp.timeoutDefault = 300000;
      // create saucelabs browser testCase and run it
      mainApp.testPlatform.testCaseList = [{
        callback: function (onEventError) {
          local._saucelabsTest(options, onEventError);
        },
        name: 'utility2.submoduleUtility2Nodejs.__saucelabsTest_default_test'
      }];
      mainApp.testRun();
    },

    modeCliDict_updateExternal: function () {
      /*
        this function updates external resources in main.data and utility2.data
      */
      // the updating code is done elsewhere.
      // all we have to do is to save the updated file data on exit
      process.on('exit', function () {
        ['main.data', 'utility2.data'].forEach(function (file) {
          mainApp.fs.writeFileSync(file, mainApp.fileDict[file].dataRaw);
        });
      });
    },

    _phantomjsTest: function (file, onEventError) {
      /*
        this function spawns a phantomjs / slimerjs process from the given file
        to test a webpage
      */
      var onEventError2, testCallbackId, timerTimeout;
      onEventError2 = function (error) {
        // cleanup timerTimeout
        clearTimeout(timerTimeout);
        // garbage collect testCallbackId
        delete mainApp.testCallbackDict[testCallbackId];
        onEventError(error);
      };
      // set timerTimeout
      timerTimeout = mainApp.onEventTimeout(
        onEventError2,
        mainApp.timeoutDefault,
        file
      );
      // init testCallbackId
      testCallbackId = Math.random().toString('36').slice(2);
      mainApp.testCallbackDict[testCallbackId] = onEventError2;
      // spawn a phantomjs / slimerjs process from the given file to test a webpage
      mainApp.shell({ argv: [
        file,
        '.install/phantomjs-test.js',
        new Buffer(JSON.stringify({
          argv0: mainApp.path.basename(file),
          url: mainApp.localhost +
            // init query-params
            '/?modeTest=1' +
            (mainApp.modeTestFail ? '&modeTestFail=1' : '') +
            '&modeTestReportUpload=1' +
            '&testCallbackId=' + testCallbackId +
            '&timeoutDefault=' + mainApp.timeoutDefault
        })).toString('base64')
      ], stdio: mainApp.modeTestFail ? 'ignore' : null });
    },

    _phantomjsTest_default_test: function (onEventError) {
      /*
        this function tests _phantomjsTest's default handling behavior
      */
      var onEventRemaining, remaining, remainingError;
      onEventRemaining = function (error) {
        remainingError = remainingError || error;
        remaining -= 1;
        if (remaining === 0) {
          onEventError(remainingError);
        }
      };
      remaining = 0;
      // run phantomjs browser test
      remaining += 1;
      local._phantomjsTest('phantomjs', onEventRemaining);
      // run slimerjs browser test if slimerjs is available
      if (mainApp.modeSlimerjs) {
        remaining += 1;
        local._phantomjsTest('slimerjs', onEventRemaining);
      }
    },

    replParseDict_$: function (arg2) {
      /*
        this function runs shell commands from the repl interpreter
      */
      mainApp.shell({ argv: ['/bin/bash', '-c', mainApp.textFormat(arg2, mainApp)] });
    },

    replParseDict_print: function (arg2) {
      /*
        this function prints arg2 in stringified form from the repl interpreter
      */
      return '(console.log(String(' + arg2 + '))\n)';
    },

    _saucelabsTest: function (options, onEventError) {
      /*
        this function uses saucelabs's test-api to test a webpage
      */
      var completed,
        modeIo,
        onEventIo,
        onEventRemaining,
        remaining,
        remainingDict,
        remainingError,
        timerInterval,
        timerTimeout;
      modeIo = 0;
      onEventIo = function (error, data) {
        modeIo = error instanceof Error ? -1 : modeIo + 1;
        switch (modeIo) {
        case 1:
          // set timeout for _saucelabsTest
          timerTimeout = mainApp.onEventTimeout(
            onEventIo,
            mainApp.timeoutDefault,
            '_saucelabsTest ' + options.url
          );
          onEventRemaining = function (error) {
            remainingError = remainingError || error;
            remaining -= 1;
            if (remaining === 0) {
              modeIo = -2;
              onEventIo(remainingError);
            }
          };
          // coverage - if mainApp.modeTestDummy,
          // then shorten the test time by testing only one platform
          if (mainApp.modeTestDummy) {
            options.platforms = options.platforms.slice(0, 1);
          }
          options = {
            data: JSON.stringify(mainApp.setOverride(options, {
              build: mainApp.modeTestDummy || process.env.CI_BUILD_NUMBER_SAUCELABS,
              // specify custom test framework in saucelabs
              framework: 'custom',
              // reduce timeoutDefault to account for saucelabs startup time
              // bug - saucelabs only accepts integers for max-duration
              'max-duration': Math.ceil(Math.max(0.00075 * mainApp.timeoutDefault, 60)),
              url: mainApp.textFormat(options.url, {
                host: process.env.SAUCE_TEST_HOST,
                // reduce timeoutDefault to account for max-duration
                timeoutDefault: 0.5 * mainApp.timeoutDefault
              })
            })),
            headers: {
              authorization: 'Basic ' + new Buffer(process.env.SAUCE_USERNAME + ':' +
                process.env.SAUCE_ACCESS_KEY).toString('base64'),
              'content-type': 'application/json'
            },
            method: 'POST',
            // platforms needed for later debugging
            platforms: options.platforms,
            url: 'https://saucelabs.com/rest/v1/' + process.env.SAUCE_USERNAME + '/js-tests'
          };
          remaining = 0;
          remainingDict = {};
          mainApp.ajax(options, mainApp.tryCatchHandler(onEventIo));
          break;
        case 2:
          // JSON.parse data
          data = JSON.parse(data);
          // parse initial saucelabs response
          console.log('\nsaucelabs - tests started - ' + JSON.stringify({
            request: JSON.parse(options.data),
            response: data
          }));
          // create remainingDict of test id's
          data['js tests'].forEach(function (id, ii) {
            remaining += 1;
            remainingDict[id] = { id: id, platform: options.platforms[ii] };
          });
          // set timerInterval to poll saucelabs for test status
          timerInterval = setInterval(function () {
            // request test status
            mainApp.ajax(mainApp.setOverride(options, {
              data: JSON.stringify({ 'js tests': Object.keys(remainingDict) }),
              url: 'https://saucelabs.com/rest/v1/' + process.env.SAUCE_USERNAME +
                '/js-tests/status'
            }), mainApp.tryCatchHandler(onEventIo));
          }, 30000);
          break;
        case 3:
          // check status of polled tests from saucelabs response
          // decrement modeIo to repeat io loop
          modeIo -= 1;
          // JSON.parse data
          data = JSON.parse(data);
          completed = completed || data.completed || (/error/).test(data.status);
          data['js tests'].forEach(function (testPlatform) {
            // validate testPlatform.id
            mainApp.assert(
              remainingDict[testPlatform.id],
              'invalid testPlatform.id ' + testPlatform.id
            );
            // test finished - remove from remainingDict
            if (completed || testPlatform.result || (/error/).test(testPlatform.status)) {
              // remove test from remainingDict
              delete remainingDict[testPlatform.id];
              // merge browser test-report
              local._saucelabsTestMerge(testPlatform, onEventRemaining);
            // test pending - update test status
            } else {
              remainingDict[testPlatform.id] = {
                id: testPlatform.id,
                job_id: testPlatform.job_id,
                platform: testPlatform.platform,
                status: testPlatform.status
              };
            }
          });
          console.log('\nsaucelabs - tests remaining - ' + JSON.stringify(remainingDict));
          break;
        default:
          remaining = -2;
          // cleanup timerInterval
          clearInterval(timerInterval);
          // cleanup timerTimeout
          clearTimeout(timerTimeout);
          onEventError(error);
        }
      };
      onEventIo();
    },

    _saucelabsTestMerge: function (testReport, onEventError) {
      /*
        this function merges the saucelabs test-report into mainApp.testReport
      */
      var errorDefault, jobId, modeIo, onEventIo;
      modeIo = 0;
      onEventIo = function (error, data) {
        modeIo = error instanceof Error ? -1 : modeIo + 1;
        switch (modeIo) {
        case 1:
          // init errorDefault
          errorDefault = new Error(JSON.stringify(testReport));
          // init jobId
          jobId = testReport.job_id;
          // fetch saucelabs logs for the given jobId
          mainApp.ajax({
            url: 'https://saucelabs.com/jobs/' + jobId + '/log.json'
          }, mainApp.tryCatchHandler(onEventIo));
          break;
        case 2:
          // JSON.parse data
          data = JSON.parse(data);
          // fetch testReport from saucelabs logs
          data.forEach(function (data) {
            testReport = (data && data.result && data.result.testReport) || testReport;
          });
          // coverage - if mainApp.modeTestDummy,
          // then cover testReport recovery failed case
          if (mainApp.modeTestDummy) {
            testReport.testPlatformList = null;
          }
          // testReport recovery succeeded case
          if (testReport.testPlatformList) {
            // disable errorDefault
            errorDefault = null;
            // capture saucelabs screenshot
            testReport.testPlatformList[0].screenshotImg =
              'https://assets.saucelabs.com/jobs/' + jobId + '/0003screenshot.png';
          }
          onEventIo(errorDefault);
          break;
        default:
          // notify saucelabs of pass / fail test statue
          mainApp.ajax({
            data: '{"passed":' + !errorDefault + '}',
            headers: {
              authorization: 'Basic ' + new Buffer(process.env.SAUCE_USERNAME +
                ':' + process.env.SAUCE_ACCESS_KEY).toString('base64'),
              'content-type': 'application/json'
            },
            method: 'PUT',
            url: 'https://saucelabs.com/rest/v1/' + process.env.SAUCE_USERNAME + '/jobs/' +
              jobId
          }, mainApp.nop);
          // testReport recovery failed case
          if (errorDefault) {
            // create a minimal testReport reporting saucelabs internal error
            testReport = { testPlatformList: [{
              modeTestDummy: mainApp.modeTestDummy,
              name: 'browser - saucelabs ' +
                (testReport.platform || ['unknown user agent']).join(' '),
              testCaseList: [{
                errorMessage: mainApp.errorStack(errorDefault),
                name: '__saucelabsTest_default_test',
                timeElapsed: testReport.timeElapsed
              }],
              timeElapsed: testReport.timeElapsed
            }] };
          }
          // merge recovered testReport into mainApp.testReport
          mainApp.testReportCreate(mainApp.testReport, testReport);
          onEventError(errorDefault);
        }
      };
      onEventIo();
    },

    serverMiddleware: function (request, response, next) {
      var modeIo, onEventIo, path;
      modeIo = 0;
      onEventIo = function () {
        modeIo += 1;
        switch (modeIo) {
        case 1:
          // debug server request
          mainApp.debugServerRequest = request;
          // debug server response
          mainApp.debugServerResponse = response;
          // security - validate request url path
          path = request.url;
          // security - enforce max url length
          if (path.length <= 4096) {
            // get base path without query-params
            path = (/[^#&?]*/).exec(path)[0];
            if (path &&
                // security - enforce max path length
                path.length <= 256 &&
                // security - disable relative path
                !(/\.\/|\.$/).test(path)) {
              // dyanamic path handler
              request.urlPathNormalized = mainApp.path.resolve(path);
              onEventIo();
              return;
            }
          }
          next(new Error('serverMiddleware - invalid url ' + path));
          break;
        case 2:
          path = request.urlPathNormalized;
          // security - if not mainApp.modeTest, then disable /test/* path
          if ((path.indexOf('/test/') === 0 && !mainApp.modeTest) ||
              // coverage - cover disabling of /test/* path
              request.urlPathNormalized === '/test/no-mode-test') {
            next();
            return;
          }
          // notify browser to cache /public/cache/* path
          if (path.indexOf('/public/cache/') === 0) {
            mainApp.serverRespondWriteHead(request, response, null, {
              'cache-control': 'max-age=86400'
            });
          }
          // walk up parent path, all the while looking for a matching handler for the path
          while (!(mainApp.serverPathHandlerDict[path] || path === '/')) {
            path = mainApp.path.dirname(path);
          }
          // debug server request handler
          mainApp.debugServerHandler = mainApp.serverPathHandlerDict[path];
          // handle request in a try-catch block
          mainApp.testTryCatch(onEventIo, next);
          break;
        case 3:
          // pass request / response objects to the handler
          mainApp.serverPathHandlerDict[path](request, response, next);
          break;
        }
      };
      onEventIo();
    },

    'serverPathHandlerDict_/': function (request, response, next) {
      /*
        this function is the default fallback handler
      */
      // serve main page
      if (request.urlPathNormalized === '/') {
        mainApp.serverRespondData(request, response, 200, 'text/html', mainApp.textFormat(
          mainApp.fileDict['/public/main.html'].data,
          { stateBrowserJson: mainApp.stateBrowserJson }
        ));
        return;
      }
      // else fallback to next middleware
      next();
    },

    'serverPathHandlerDict_/public': function (request, response, next) {
      /*
        this function responds with public cached data if it exists
      */
      var options;
      options = mainApp.fileDict[request.urlPathNormalized];
      // cached data exists - respond with cached data
      if (options) {
        mainApp.serverRespondData(request, response, 200, mainApp.mimeLookupDict[
          mainApp.path.extname(request.urlPathNormalized)
        ], options.data);
        return;
      }
      // cached data does not exist - goto next middleware
      next();
    },

    'serverPathHandlerDict_/test/hello.json': function (request, response) {
      /*
        this function responds with a simple hello json string
      */
      mainApp.serverRespondData(request, response, 200, 'application/json', '"hello"');
    },

    'serverPathHandlerDict_/test/timeout': function (request, response) {
      /*
        this function responds with a delayed timeout
      */
      setTimeout(function () {
        mainApp.serverRespondDefault(request, response, 200);
      }, 1000);
    },

    'serverPathHandlerDict_/test/test-report-upload': function (request, response, next) {
      /*
        this function receives and parses uploaded test-reports
      */
      var modeIo, onEventIo;
      modeIo = 0;
      onEventIo = function (error, data) {
        modeIo = error instanceof Error ? -1 : modeIo + 1;
        switch (modeIo) {
        case 1:
          // stream test-report data into buffer
          mainApp.streamReadAll(
            request,
            // security - use try-catch block to parse potential malformed data
            mainApp.tryCatchHandler(onEventIo)
          );
          break;
        case 2:
          data = JSON.parse(data);
          // debug uploaded test-report
          mainApp.debugTestReportUpload = data;
          // validate data.testCallbackId exists in mainApp.testCallbackDict
          mainApp.assert(
            mainApp.testCallbackDict[data && data.testCallbackId],
            'invalid data.testCallbackId ' + (data && data.testCallbackId)
          );
          // merge data.testReport into mainApp.testReport
          mainApp.testReportCreate(mainApp.testReport, data.testReport);
          // call testCallbackId callback
          mainApp.testCallbackDict[data.testCallbackId](
            data.testReport.testsFailed ? new Error('browser tests failed') : null
          );
          response.end();
          // coverage - cover serverRespondWriteHead's response.headersSent handling behavior
          mainApp.serverRespondWriteHead(request, response, 500, {});
          break;
        default:
          next(error);
        }
      };
      onEventIo();
    },

    serverRespondData: function (request, response, statusCode, contentType, data) {
      /*
        this function responds with the given data
      */
      // set response / statusCode / contentType
      mainApp.serverRespondWriteHead(request, response, statusCode, {
        'content-type': contentType
      });
      // end response with data
      response.end(data);
    },

    serverRespondDefault: function (request, response, statusCode, error) {
      /*
        this function responds with a default message or error.stack for the given statusCode
      */
      // set response / statusCode / contentType
      mainApp.serverRespondWriteHead(request, response, statusCode, {
        'content-type': 'text/plain'
      });
      if (error) {
        // if not modeErrorIgnore in request, then print error.stack to stderr
        if (!(mainApp.modeTest && (/\?.*\bmodeErrorIgnore=1\b/).test(request.url)) ||
            // coverage - if mainApp.modeTestDummy,
            // then cover printing error.stack handling behavior
            mainApp.modeTestDummy) {
          mainApp.onEventErrorDefault(error);
        }
        // end response with error.stack
        response.end(mainApp.errorStack(error));
        return;
      }
      // end response with default statusCode message
      response.end(statusCode + ' ' + mainApp.http.STATUS_CODES[statusCode]);
    },

    serverRespondWriteHead: function (_, response, statusCode, headers) {
      /*
        this function sets the response object's statusCode / headers
      */
      // nop hack to pass jslint
      mainApp.nop(_);
      if (!response.headersSent) {
        // set response.statusCode
        response.statusCode = statusCode || response.statusCode;
        Object.keys(headers).forEach(function (key) {
          // validate header is non-empty string
          mainApp.assert(headers[key], 'invalid response header ' + key);
          response.setHeader(key, headers[key]);
        });
      }
    },

    shell: function (options) {
      /*
        this function executes shell scripts with timeout handling
      */
      var child, timerTimeoutPid;
      // init options.stdio
      options.stdio = options.stdio || ['ignore', 1, 2];
      // spawn shell in child process
      child = mainApp.child_process.spawn(options.argv[0], options.argv.slice(1), options);
      // set timerTimeoutPid
      timerTimeoutPid = mainApp.child_process.spawn('/bin/sh', ['-c', 'sleep ' +
        ((options.timeout || mainApp.timeoutDefault) / 1000) + '; kill ' + child.pid +
        ' 2>/dev/null'], { stdio: 'ignore' });
      // unref timerTimout process so it can continue tracking the original shell
      // after nodejs exits
      timerTimeoutPid.unref();
      timerTimeoutPid = timerTimeoutPid.pid;
      // debug shell exit code
      child
        // handle error event
        .on('error', mainApp.onEventErrorDefault)
        // handle exit event
        .on('exit', function (exitCode) {
          try {
            // cleanup timerTimeoutPid
            process.kill(timerTimeoutPid);
          } catch (ignore) {
          }
          console.log('shell - process ' + child.pid + ' exited with code ' + exitCode);
        });
      return child;
    },

    streamReadAll: function (readableStream, onEventError) {
      /*
        this function concats data from readable stream and passes it to callback when done
      */
      var chunks;
      chunks = [];
      // read data from readable stream
      readableStream.on('data', function (chunk) {
        chunks.push(chunk);
      // call callback when finished reading
      }).on('end', function () {
        onEventError(null, Buffer.concat(chunks));
      // pass any errors to the callback
      }).on('error', onEventError);
    }

  };
  local._init();
}());
