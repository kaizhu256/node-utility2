/*jslint
  bitwise: true, browser: true,
  indent: 2,
  maxerr: 8,
  node: true, nomen: true,
  regexp: true,
  stupid: true
*/
(function (local) {
  /*
    this function is the main module
  */
  'use strict';
  var global, mainApp;



  (function () {
    /*
      this function runs shared js-env code
    */
    // init global
    global = local.global;
    // init mainApp
    mainApp = local.mainApp;
    // init mainApp properties
    mainApp.modeJs = local.modeJs;
    mainApp.errorDefault = mainApp.errorDefault || new Error('default error');
    mainApp.fileCacheDict = mainApp.fileCacheDict || {};
    mainApp.testPlatform = { testCaseList: [] };
    mainApp.testReport = mainApp.testReport || { testPlatformList: [mainApp.testPlatform] };
    mainApp.textExampleAscii = mainApp.textExampleAscii ||
      '\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f' +
      '\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f' +
      ' !"#$%&\'()*+,-./0123456789:;<=>?' +
      '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_' +
      '`abcdefghijklmnopqrstuvwxyz{|}~\x7f';
    mainApp.timeoutDefault = mainApp.timeoutDefault || 30000;
    mainApp.__coverage__ = mainApp.__coverage__ || global.__coverage__ || null;

    local._ajax_default_test = function (onError) {
      /*
        this function tests ajax's default handling behavior
      */
      var onParallel;
      onParallel = mainApp.onParallel(onError);
      onParallel.counter += 1;
      // test http GET handling behavior
      onParallel.counter += 1;
      mainApp.ajax({ url: '/test/hello' }, function (error, data) {
        mainApp.testTryCatch(function () {
          // validate no error occurred
          mainApp.assert(!error, error);
          // validate data
          mainApp.assert(data === 'hello', data);
          onParallel();
        }, onParallel);
      });
      // test http POST handling behavior
      ['binary', 'text'].forEach(function (resultType) {
        onParallel.counter += 1;
        mainApp.ajax({
          // test binary post handling behavior
          data: resultType === 'binary' && mainApp.modeJs === 'node' ? new Buffer('hello')
            // test text post handling behavior
            : 'hello',
          // test request header handling behavior
          headers: { 'X-Header-Hello': 'Hello' },
          method: 'POST',
          resultType: resultType,
          url: '/test/echo'
        }, function (error, data) {
          mainApp.testTryCatch(function () {
            // validate no error occurred
            mainApp.assert(!error, error);
            // validate binary data
            if (resultType === 'binary' && mainApp.modeJs === 'node') {
              mainApp.assert(Buffer.isBuffer(data), data);
              data = String(data);
            }
            // validate text data
            mainApp.assert(data.indexOf('hello') >= 0, data);
            onParallel();
          }, onParallel);
        });
      });
      [{
        // test 404-not-found-error handling behavior
        url: '/test/undefined?modeErrorIgnore=1'
      }, {
        // test 500-internal-server-error handling behavior
        url: '/test/server-error?modeErrorIgnore=1'
      }, {
        // test undefined https host handling behavior
        timeout: 1,
        url: 'https://undefined' + Date.now() + Math.random() + '.com'
      }].forEach(function (options) {
        onParallel.counter += 1;
        mainApp.ajax(options, function (error) {
          mainApp.testTryCatch(function () {
            // validate error occurred
            mainApp.assert(error instanceof Error, error);
            onParallel();
          }, onParallel);
        });
      });
      onParallel();
    };

    mainApp.coverageMerge = function (coverage1, coverage2) {
      /*
        this function merges coverage2 into coverage1
      */
      var dict1, dict2;
      coverage1 = coverage1 || {};
      coverage2 = coverage2 || {};
      Object.keys(coverage2).forEach(function (file) {
        // if file is undefined in coverage1, then add it
        if (!coverage1[file]) {
          coverage1[file] = coverage2[file];
          return;
        }
        // merge file from coverage2 into coverage1
        ['b', 'f', 's'].forEach(function (key) {
          dict1 = coverage1[file][key];
          dict2 = coverage2[file][key];
          switch (key) {
          // increment coverage for branch lines
          case 'b':
            Object.keys(dict2).forEach(function (key) {
              dict2[key].forEach(function (count, ii) {
                dict1[key][ii] = dict1[key][ii] ? dict1[key][ii] + count : count;
              });
            });
            break;
          // increment coverage for function and statement lines
          case 'f':
          case 's':
            Object.keys(dict2).forEach(function (key) {
              dict1[key] = dict1[key] ? dict1[key] + dict2[key] : dict2[key];
            });
            break;
          }
        });
      });
      return coverage1;
    };

    mainApp.assert = function (passed, message) {
      /*
        this function throws an error if the assertion fails
      */
      if (!passed) {
        throw new Error(
          // if message is a string, then leave it as is
          typeof message === 'string' ? message
            // if message is an Error object, then get its stack-trace
            : message instanceof Error ? mainApp.errorStack(message)
              // else JSON.stringify message
              : JSON.stringify(message)
        );
      }
    };

    local._assert_default_test = function (onError) {
      /*
        this function tests assert's default handling behavior
      */
      // test assertion passed
      mainApp.assert(true, true);
      // test assertion failed with undefined message
      mainApp.testTryCatch(function () {
        mainApp.assert(false);
      }, function (error) {
        // validate error occurred
        mainApp.assert(error instanceof Error, error);
        // validate error-message
        mainApp.assert(error.message === '', error.message);
      });
      // test assertion failed with text message
      mainApp.testTryCatch(function () {
        mainApp.assert(false, '_assert_default_test');
      }, function (error) {
        // validate error occurred
        mainApp.assert(error instanceof Error, error);
        // validate error-message
        mainApp.assert(error.message === '_assert_default_test', error.message);
      });
      // test assertion failed with error object
      mainApp.testTryCatch(function () {
        mainApp.assert(false, mainApp.errorDefault);
      }, function (error) {
        // validate error occurred
        mainApp.assert(error instanceof Error, error);
      });
      // test assertion failed with json object
      mainApp.testTryCatch(function () {
        mainApp.assert(false, { aa: 1 });
      }, function (error) {
        // validate error occurred
        mainApp.assert(error instanceof Error, error);
        // validate error-message
        mainApp.assert(error.message === '{"aa":1}', error.message);
      });
      onError();
    };

    local._debug_print = global[['debug', 'Print'].join('')] = function (arg) {
      /*
        this internal function is used for tmp debugging,
        and jslint will nag you to remove it if used
      */
      // debug arguments
      mainApp[['debug', 'PrintArguments'].join('')] = arguments;
      console.error('\n\n\ndebug' + 'Print');
      console.error.apply(console, arguments);
      console.error();
      // return arg for inspection
      return arg;
    };

    local.__debug_print_default_test = function (onError) {
      /*
        this function tests _debug_print's default handling behavior
      */
      var message;
      mainApp.testMock([
        // suppress console.error
        [console, { error: function (arg) {
          message += (arg || '') + '\n';
        } }]
      ], onError, function (onError) {
        message = '';
        local._debug_print('__debug_print_default_test');
        // validate message
        mainApp.assert(
          message === '\n\n\ndebug' + 'Print\n__debug_print_default_test\n\n',
          message
        );
        onError();
      });
    };

    mainApp.errorStack = function (error) {
      /*
        this function returns the error's stack-trace
      */
      if (!(error && typeof error.stack === 'string')) {
        try {
          throw new Error();
        } catch (errorCaught) {
          error = errorCaught;
        }
      }
      return error.stack;
    };

    mainApp.jsonCopy = function (value) {
      /*
        this function returns a deep-copy of the JSON value
      */
      return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
    };

    local._jsonCopy_default_test = function (onError) {
      /*
        this function tests jsonCopy's default handling behavior
      */
      // test various data-type handling behavior
      [undefined, null, false, true, 0, 1, 1.5, 'a'].forEach(function (data) {
        mainApp.assert(mainApp.jsonCopy(data) === data, [mainApp.jsonCopy(data), data]);
      });
      onError();
    };

    mainApp.jsonStringifyOrdered = function (value, replacer, space) {
      /*
        this function JSON.stringify's the value with dictionaries in sorted order,
        allowing reliable / reproducible string comparisons and tests
      */
      var stringifyOrdered;
      stringifyOrdered = function (value) {
        /*
          this function recurses stringifies the value, sorting object keys along the way
        */
        // if value is an array, then recursively stringify its elements
        if (Array.isArray(value)) {
          return '[' + value.map(stringifyOrdered).join(',') + ']';
        }
        // if value is an object, then recursively stringify its items sorted by their keys
        if (value && typeof value === 'object') {
          return '{' + Object.keys(value)
            .sort()
            .map(function (key) {
              return JSON.stringify(key) + ':' + stringifyOrdered(value[key]);
            })
            .join(',') + '}';
        }
        // else JSON.stringify normally
        return JSON.stringify(value);
      };
      value = JSON.stringify(value);
      return typeof value === 'string' ?
          JSON.stringify(JSON.parse(stringifyOrdered(JSON.parse(value))), replacer, space)
        : value;
    };

    local._jsonStringifyOrdered_default_test = function (onError) {
      /*
        this function tests jsonStringifyOrdered's default handling behavior
      */
      var data;
      // test various data-type handling behavior
      [undefined, null, false, true, 0, 1, 1.5, 'a', {}, []].forEach(function (data) {
        mainApp.assert(
          mainApp.jsonStringifyOrdered(data) === JSON.stringify(data),
          [mainApp.jsonStringifyOrdered(data), JSON.stringify(data)]
        );
      });
      // test data-ordering handling behavior
      data = mainApp.jsonStringifyOrdered({
        // test nested dict handling behavior
        ee: { gg: 2, ff: 1},
        // test array handling behavior
        dd: [undefined],
        cc: mainApp.nop,
        bb: 2,
        aa: 1
      });
      mainApp.assert(data === '{"aa":1,"bb":2,"dd":[null],"ee":{"ff":1,"gg":2}}', data);
      onError();
    };

    mainApp.nop = function () {
      /*
        this function performs no operation - nop
      */
      return;
    };

    mainApp.onErrorDefault = function (error) {
      /*
        this function provides a default error handling callback,
        which simply prints the error stack or message to stderr
      */
      // if error is defined, then print the error stack
      if (error) {
        console.error('\nonErrorDefault - error\n' + mainApp.errorStack(error) + '\n');
      }
    };

    local._onErrorDefault_default_test = function (onError) {
      /*
        this function tests onErrorDefault's default handling behavior
      */
      var message;
      mainApp.testMock([
        // suppress console.error
        [console, { error: function (arg) {
          message = arg;
        } }]
      ], onError, function (onError) {
        // test no error handling behavior
        mainApp.onErrorDefault();
        // validate message
        mainApp.assert(!message, message);
        // test error handling behavior
        mainApp.onErrorDefault(mainApp.errorDefault);
        // validate message
        mainApp.assert(message, message);
        onError();
      });
    };

    mainApp.onParallel = function (onError, onDebug) {
      /*
        this function returns another function that runs async tasks in parallel,
        and calls onError only if there's an error, or if its counter === 0
      */
      var errorStack, self;
      errorStack = mainApp.errorStack();
      onDebug = onDebug || mainApp.nop;
      self = function (error) {
        onDebug(error, self);
        // if counter === 0 or error already occurred, then return
        if (self.counter === 0 || self.error) {
          return;
        }
        // error handling behavior
        if (error) {
          self.error = error;
          // ensure counter will decrement to 0
          self.counter = 1;
          // append errorStack to error.stack
          error.stack = mainApp.errorStack(error) + '\n' + errorStack;
        }
        // decrement counter
        self.counter -= 1;
        // if counter === 0, then call onError with error
        if (self.counter === 0) {
          onError(error);
        }
      };
      // init counter
      self.counter = 0;
      // return callback
      return self;
    };

    local._onParallel_default_test = function (onError) {
      /*
        this function tests onParallel's default handling behavior
      */
      var onParallel, onParallelError;
      // test onDebug handling behavior
      onParallel = mainApp.onParallel(onError, function (error, self) {
        mainApp.testTryCatch(function () {
          // validate no error occurred
          mainApp.assert(!error, error);
          // validate self
          mainApp.assert(self.counter >= 0, self);
        }, onError);
      });
      onParallel.counter += 1;
      onParallel.counter += 1;
      setTimeout(function () {
        onParallelError = mainApp.onParallel(function (error) {
          mainApp.testTryCatch(function () {
            // validate error occurred
            mainApp.assert(error instanceof Error, error);
            onParallel();
          }, onParallel);
        });
        onParallelError.counter += 1;
        // test error handling behavior
        onParallelError.counter += 1;
        onParallelError(mainApp.errorDefault);
        // test ignore-after-error handling behavior
        onParallelError();
      });
      // test default handling behavior
      onParallel();
    };

    mainApp.onTimeout = function (onError, timeout, message) {
      /*
        this function creates a timer that passes a timeout error to onError,
        when the specified timeout has passed
      */
      var error;
      // validate timeout is an integer in the exclusive range 0 to Infinity
      mainApp.assert(
        (timeout | 0) === timeout && 0 < timeout && timeout < Infinity,
        'invalid timeout ' + timeout
      );
      // create an error object in the current stack frame
      error = new Error('onTimeout - timeout error - ' + timeout + ' ms - ' + message);
      // create timeout timer
      return setTimeout(function () {
        onError(error);
      }, timeout);
    };

    local._onTimeout_timeout_test = function (onError) {
      /*
        this function tests onTimeout's timeout handling behavior
      */
      var timeElapsed;
      timeElapsed = Date.now();
      mainApp.onTimeout(function (error) {
        mainApp.testTryCatch(function () {
          // validate error occurred
          mainApp.assert(error instanceof Error);
          // save timeElapsed
          timeElapsed = Date.now() - timeElapsed;
          // validate timeElapsed passed is greater than timeout
          // bug - ie might timeout slightly earlier,
          // so increase timeElapsed by a small amount
          mainApp.assert(timeElapsed + 100 >= 1000, timeElapsed);
          onError();
        }, onError);
      // coverage - use 1500 ms to cover setInterval test-report refreshes in browser
      }, 1500, '_onTimeout_errorTimeout_test');
    };

    mainApp.setDefault = function (options, depth, defaults) {
      /*
        this function recursively sets default values
        for unset leaf nodes in the options object
      */
      depth -= 1;
      Object.keys(defaults).forEach(function (key) {
        var defaults2, options2;
        defaults2 = defaults[key];
        options2 = options[key];
        // set options[key] to default value defaults[key]
        if (options2 === undefined) {
          options[key] = defaults2;
          return;
        }
        // if options[key] and defaults[key] are both non-null, non-array objects
        // then recurse options[key] and defaults[key]
        if (depth !== 0 &&
            defaults2 && typeof defaults2 === 'object' && !Array.isArray(defaults2) &&
            options2 && typeof options2 === 'object' && !Array.isArray(options2)) {
          mainApp.setDefault(options2, depth, defaults2);
        }
      });
      return options;
    };

    local._setDefault_default_test = function (onError) {
      /*
        this function tests setDefault's default handling behavior
      */
      var options;
      // test non-recursive handling behavior
      options = mainApp.setDefault(
        { aa: 1, bb: {}, cc: [] },
        1,
        { aa: 2, bb: { cc: 2 }, cc: [1, 2] }
      );
      // validate options
      mainApp.assert(
        mainApp.jsonStringifyOrdered(options) === '{"aa":1,"bb":{},"cc":[]}',
        options
      );
      // test recursive handling behavior
      options = mainApp.setDefault(
        { aa: 1, bb: {}, cc: [] },
        -1,
        { aa: 2, bb: { cc: 2 }, cc: [1, 2] }
      );
      // validate options
      mainApp.assert(
        mainApp.jsonStringifyOrdered(options) === '{"aa":1,"bb":{"cc":2},"cc":[]}',
        options
      );
      onError();
    };

    mainApp.setOverride = function (options, depth, override, backup) {
      /*
        this function recursively overrides the options object with the override object,
        and optionally saves the original options object a backup object,
        and optionally accepts a depth recursion limit
      */
      var options2, override2;
      backup = backup || {};
      depth -= 1;
      Object.keys(override).forEach(function (key) {
        options2 = options[key];
        override2 = backup[key] = override[key];
        if (depth === 0 ||
            // override[key] is not a non-null, non-array object
            !(override2 && typeof override2 === 'object' && !Array.isArray(override2)) ||
            // options[key] is not a non-null, non-array object
            !(options2 && typeof options2 === 'object' && !Array.isArray(options2))) {
          // 1. save the options item to the backup object
          backup[key] = options2;
          // 2. set the override item to the options object
          // if options is mainApp.envDict, then override falsey values with empty string
          options[key] = options === mainApp.envDict ? override2 || '' : override2;
          return;
        }
        // 3. recurse options[key] and override[key]
        mainApp.setOverride(options2, depth, override2, override2, backup);
      });
      return options;
    };

    local._setOverride_default_test = function (onError) {
      /*
        this function tests setOverride's default handling behavior
      */
      var backup, data, options;
      backup = {};
      // test override handling behavior
      options = mainApp.setOverride(
        { aa: 1, bb: { cc: 2 }, dd: [3, 4], ee: { ff: { gg: 5, hh: 6 } } },
        // test depth handling behavior
        2,
        { aa: 2, bb: { dd: 3 }, dd: [4, 5], ee: { ff: { gg: 6 } } },
        // test backup handling behavior
        backup
      );
      // validate backup
      data = mainApp.jsonStringifyOrdered(backup);
      mainApp.assert(data ===
        '{"aa":1,"bb":{},"dd":[3,4],"ee":{"ff":{"gg":5,"hh":6}}}', data);
      // validate options
      data = mainApp.jsonStringifyOrdered(options);
      mainApp.assert(data ===
        '{"aa":2,"bb":{"cc":2,"dd":3},"dd":[4,5],"ee":{"ff":{"gg":6}}}', data);
      // test restore options from backup handling behavior
      mainApp.setOverride(options, -1, backup);
      // validate backup
      data = mainApp.jsonStringifyOrdered(backup);
      mainApp.assert(data ===
        '{"aa":1,"bb":{"dd":3},"dd":[3,4],"ee":{"ff":{"gg":6}}}', data);
      // validate options
      data = mainApp.jsonStringifyOrdered(options);
      mainApp.assert(data ===
        '{"aa":1,"bb":{"cc":2},"dd":[3,4],"ee":{"ff":{"gg":5,"hh":6}}}', data);
      onError();
    };

    mainApp.testCaseAdd = function (testCaseDict) {
      /*
        this function adds test-case's from testCaseDict into mainApp.testPlatform.testCaseList
      */
      // init mainApp.modeTestCase
      mainApp.modeTestCase = mainApp.modeTestCase || mainApp.envDict.npm_config_mode_test_case;
      Object.keys(testCaseDict).forEach(function (key) {
        // add test-case testCaseDict[key] to mainApp.testPlatform.testCaseList
        if (key.slice(-5) === '_test' &&
            (testCaseDict._testPrefix + '.')
              .indexOf(mainApp.envDict.PACKAGE_JSON_NAME + '.') === 0 &&
            (mainApp.modeTestCase === key ||
              (!mainApp.modeTestCase && key !== '_testRun_failure_test'))) {
          mainApp.testPlatform.testCaseList.push({
            name: testCaseDict._testPrefix + '.' + key,
            onTestCase: testCaseDict[key]
          });
        }
      });
    };

    mainApp.testMock = function (mockList, onError, testCase) {
      /*
        this function mocks the mainApp given in the mockList while running the testCase
      */
      var callCallback, onError2;
      callCallback = function (callback) {
        /*
          this function calls the callback
        */
        callback();
        // return a mock timer object with the unref method
        return { unref: mainApp.nop };
      };
      // prepend mandatory mocks for async / unsafe functions
      mockList = [
        // suppress console.log
        [console, { log: mainApp.nop }],
        // enforce synchronicity by mocking timers as callCallback
        [global, { setInterval: callCallback, setTimeout: callCallback }],
        [global.process || {}, { exit: mainApp.nop }]
      ].concat(mockList);
      onError2 = function (error) {
        // restore mock[0] from mock[2]
        mockList.reverse().forEach(function (mock) {
          mainApp.setOverride(mock[0], 1, mock[2], null);
        });
        onError(error);
      };
      // run onError callback in mocked mainApp in a try-catch block
      mainApp.testTryCatch(function () {
        // mock mainApp
        mockList.forEach(function (mock) {
          mock[2] = {};
          // backup mock[0] into mock[2]
          // override mock[0] with mock[1]
          mainApp.setOverride(mock[0], 1, mock[1], mock[2]);
        });
        // run testCase
        testCase(onError2);
      }, onError2);
    };

    mainApp.testMerge = function (testReport1, testReport2) {
      /*
        this function will
        1. merge testReport2 into testReport1
        2. return testReport1 in html-format
      */
      var errorStackList, testCaseNumber, testReport;
      // 1. merge testReport2 into testReport1
      [testReport1, testReport2].forEach(function (testReport, ii) {
        ii += 1;
        mainApp.setDefault(testReport, -1, {
          date: new Date().toISOString(),
          errorStackList: [],
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
          mainApp.setDefault(testPlatform, -1, {
            name: 'undefined',
            testCaseList: [],
            timeElapsed: 0
          });
          mainApp.assert(
            typeof testPlatform.name === 'string',
            ii + ' invalid testPlatform.name ' + typeof testPlatform.name
          );
          // insert $MODE_BUILD into testPlatform.name
          if (mainApp.envDict.MODE_BUILD) {
            testPlatform.name = testPlatform.name.replace(
              (/^(browser|node|phantom|slimer)\b/),
              mainApp.envDict.MODE_BUILD + ' - $1'
            );
          }
          mainApp.assert(
            typeof testPlatform.timeElapsed === 'number',
            ii + ' invalid testPlatform.timeElapsed ' + typeof testPlatform.timeElapsed
          );
          // security - handle malformed testReport.testPlatformList.testCaseList
          testPlatform.testCaseList.forEach(function (testCase) {
            mainApp.setDefault(testCase, -1, {
              errorStack: '',
              name: 'undefined',
              timeElapsed: 0
            });
            mainApp.assert(
              typeof testCase.errorStack === 'string',
              ii + ' invalid testCase.errorStack ' + typeof testCase.errorStack
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
        // add testPlatform2 to testReport1.testPlatformList
        testReport1.testPlatformList.push(testPlatform2);
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
          if (testCase.errorStack) {
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
        local._timeElapsedStop(testReport);
      }
      // 2. return testReport1 in html-format
      // json-copy testReport, which will be modified for html templating
      testReport = mainApp.jsonCopy(testReport1);
      // update timeElapsed
      local._timeElapsedStop(testReport);
      testReport.testPlatformList.forEach(function (testPlatform) {
        local._timeElapsedStop(testPlatform);
        testPlatform.testCaseList.forEach(function (testCase) {
          local._timeElapsedStop(testCase);
          testPlatform.timeElapsed =
            Math.max(testPlatform.timeElapsed, testCase.timeElapsed);
        });
        // update testReport.timeElapsed with testPlatform.timeElapsed
        testReport.timeElapsed = Math.max(testReport.timeElapsed, testPlatform.timeElapsed);
      });
      // create html test-report
      testCaseNumber = 0;
      return mainApp.textFormat(
        mainApp.fileCacheDict['/test/test-report.html.template'].data,
        mainApp.setOverride(testReport, -1, {
          // security - sanitize '<' in text
          CI_COMMIT_INFO: String(mainApp.envDict.CI_COMMIT_INFO).replace((/</g), '&lt;'),
          envDict: mainApp.envDict,
          // map testPlatformList
          testPlatformList: testReport.testPlatformList.filter(function (testPlatform) {
            // if testPlatform has no tests, then filter it out
            return testPlatform.testCaseList.length;
          }).map(function (testPlatform, ii) {
            errorStackList = [];
            return mainApp.setOverride(testPlatform, -1, {
              errorStackList: errorStackList,
              // security - sanitize '<' in text
              name: String(testPlatform.name).replace((/</g), '&lt;'),
              screenCapture: testPlatform.screenCaptureImg ?
                  '<a class="testReportPlatformScreenCaptureA" href="' +
                  testPlatform.screenCaptureImg + '">' +
                  '<img class="testReportPlatformScreenCaptureImg" src="' +
                  testPlatform.screenCaptureImg + '">' +
                  '</a>'
                : '',
              // map testCaseList
              testCaseList: testPlatform.testCaseList.map(function (testCase) {
                testCaseNumber += 1;
                if (testCase.errorStack) {
                  errorStackList.push({ errorStack:
                    (testCaseNumber + '. ' + testCase.name + '\n' + testCase.errorStack)
                      // security - sanitize '<' in text
                      .replace((/</g), '&lt;') });
                }
                return mainApp.setOverride(testCase, -1, {
                  testCaseNumber: testCaseNumber,
                  testReportTestStatusClass: 'testReportTest' +
                    testCase.status[0].toUpperCase() + testCase.status.slice(1)
                });
              }),
              testReportPlatformPreClass: 'testReportPlatformPre' +
                (errorStackList.length ? '' : 'Hidden'),
              testPlatformNumber: ii + 1
            });
          }),
          testsFailedClass: testReport.testsFailed ? 'testReportTestFailed'
            : 'testReportTestPassed'
        }),
        'undefined'
      );
    };

    mainApp.testRun = function (onTestRunEnd) {
      /*
        this function runs the tests in mainApp.testPlatform.testCaseList
      */
      var onParallel, testPlatform, timerInterval;
      mainApp.modeTest = mainApp.modeTest || mainApp.envDict.npm_config_mode_npm_test;
      if (!mainApp.modeTest) {
        return;
      }
      // if in browser mode, visually refresh test progress until it finishes
      if (mainApp.modeJs === 'browser') {
        // init mainApp._testReportDiv element
        mainApp._testReportDiv = document.createElement('div');
        mainApp._testReportDiv.innerHTML = mainApp.testMerge(mainApp.testReport, {});
        document.body.appendChild(mainApp._testReportDiv);
        // update test-report status every 1000 ms until finished
        timerInterval = setInterval(function () {
          // update mainApp._testReportDiv in browser
          mainApp._testReportDiv.innerHTML =
            mainApp.testMerge(mainApp.testReport, {});
          if (mainApp.testReport.testsPending === 0) {
            // cleanup timerInterval
            clearInterval(timerInterval);
          }
        }, 1000);
      }
      onParallel = mainApp.onParallel(function () {
        /*
          this function create the test-report after all tests have finished
        */
        var separator, testReport, testReportHtml;
        // init new-line separator
        separator = new Array(56).join('-');
        // init testReport
        testReport = mainApp.testReport;
        // stop testPlatform timer
        local._timeElapsedStop(testPlatform);
        // create testReportHtml
        testReportHtml = mainApp.testMerge(testReport, {});
        // print test-report summary
        console.log('\n' + separator + '\n' +
          testReport.testPlatformList.map(function (testPlatform) {
            return '| test-report - ' + testPlatform.name + '\n|' +
              ('        ' + testPlatform.timeElapsed + ' ms     ').slice(-16) +
              ('        ' + testPlatform.testsFailed + ' failed ').slice(-16) +
              ('        ' + testPlatform.testsPassed + ' passed ').slice(-16) +
              '     |\n' + separator;
          }).join('\n') + '\n');
        switch (mainApp.modeJs) {
        case 'browser':
          // notify saucelabs of test results
          // https://docs.saucelabs.com/reference/rest-api/#js-unit-testing
          global.global_test_results = {
            coverage: mainApp.__coverage__,
            failed: mainApp.testReport.testsFailed,
            testReport: mainApp.testReport
          };
          setTimeout(function () {
            // call callback with number of tests failed
            onTestRunEnd(mainApp.testReport.testsFailed);
            // throw global_test_results as an error,
            // so it can be caught and passed to the phantom js-env
            if (mainApp.modeTest === 'phantom') {
              throw new Error(JSON.stringify({
                global_test_results: global.global_test_results
              }));
            }
          }, 1000);
          break;
        case 'node':
          // create build badge
          mainApp.fs.writeFileSync(
            process.cwd() + '/.tmp/build/build.badge.svg',
            mainApp.fileCacheDict['.tmp/build/build.badge.svg'].data
              // edit branch name
              .replace(
                (/0000 00 00 00 00 00/g),
                new Date().toISOString().slice(0, 19).replace('T', ' ')
              )
              // edit branch name
              .replace((/- master -/g), '| ' + mainApp.envDict.CI_BRANCH + ' |')
              // edit commit id
              .replace(
                (/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/g),
                mainApp.envDict.CI_COMMIT_ID
              )
          );
          // create test-report.badge.svg
          mainApp.fs.writeFileSync(
            process.cwd() + '/.tmp/build/test-report.badge.svg',
            mainApp.fileCacheDict['.tmp/build/test-report.badge.svg'].data
              // edit number of tests failed
              .replace((/999/g), testReport.testsFailed)
              // edit badge color
              .replace(
                (/d00/g),
                // coverage hack
                '0d00'.slice(!!testReport.testsFailed).slice(0, 3)
              )
          );
          // create test-report.html
          mainApp.fs.writeFileSync(
            process.cwd() + '/.tmp/build/test-report.html',
            testReportHtml
          );
          // create test-report.json
          mainApp.fs.writeFileSync(
            process.cwd() + '/.tmp/build/test-report.json',
            JSON.stringify(mainApp.testReport)
          );
          // if any test failed, then exit with non-zero exit-code
          setTimeout(function () {
            // finalize mainApp.testReport
            mainApp.testMerge(testReport, {});
            console.log('\n' + mainApp.envDict.MODE_BUILD + ' - ' +
              mainApp.testReport.testsFailed + ' failed tests\n');
            // call callback with number of tests failed
            onTestRunEnd(mainApp.testReport.testsFailed);
          }, 1000);
          break;
        default:
          setTimeout(function () {
            // call callback with number of tests failed
            onTestRunEnd(mainApp.testReport.testsFailed);
          }, 1000);
        }
      });
      onParallel.counter += 1;
      // init testReport timer
      mainApp.testReport.timeElapsed = Date.now();
      // init testPlatform
      testPlatform = mainApp.testPlatform;
      // init testPlatform timer
      testPlatform.timeElapsed = Date.now();
      // bug - use shallow copy of testPlatform.testCaseList,
      // because the original might get in-place sorted during testing
      testPlatform.testCaseList.slice().forEach(function (testCase) {
        var finished, onError;
        onError = function (error) {
          // if testCase already finished, then fail testCase with error for finishing again
          if (finished) {
            error = error ||
              new Error('callback in testCase ' + testCase.name + ' called multiple times');
          }
          // if error occurred, then fail testCase
          if (error) {
            console.error('\ntestCase ' + testCase.name + ' failed\n' +
              mainApp.errorStack(error));
            testCase.errorStack = testCase.errorStack || mainApp.errorStack(error);
            // validate errorStack is non-empty
            mainApp.assert(testCase.errorStack, 'invalid errorStack ' + testCase.errorStack);
          }
          // if testCase already finished, then do not run finish code again
          if (finished) {
            return;
          }
          // finish testCase
          finished = true;
          // stop testCase timer
          local._timeElapsedStop(testCase);
          // if all tests have finished, then create test-report
          onParallel();
        };
        // increment number of tests remaining
        onParallel.counter += 1;
        // run testCase in try-catch block
        try {
          // start testCase timer
          testCase.timeElapsed = Date.now();
          testCase.onTestCase(onError);
        } catch (errorCaught) {
          onError(errorCaught);
        }
      });
      onParallel();
    };

    local._testRun_failure_test = function (onError) {
      /*
        this function test testRun's failure handling behavior
      */
      // test failure from callback handling behavior
      onError(mainApp.errorDefault);
      // test failure from multiple-callback handling behavior
      onError();
      // test failure from thrown error handling behavior
      throw mainApp.errorDefault;
    };

    mainApp.testTryCatch = function (callback, onError) {
      /*
        this function calls the callback in a try-catch block,
        and passes any caught errors to onError
      */
      try {
        callback();
      } catch (errorCaught) {
        onError(errorCaught);
      }
    };

    mainApp.textFormat = function (template, dict, valueDefault) {
      /*
        this function replaces the keys in given text template
        with the key / value pairs provided by the dict
      */
      var match, replace, rgx, value;
      dict = dict || {};
      replace = function (match0, fragment) {
        // nop hack to pass jslint
        mainApp.nop(match0);
        return dict[match].map(function (dict) {
          // recursively format the array fragment
          return mainApp.textFormat(fragment, dict, valueDefault);
        }).join('');
      };
      rgx = (/\{\{#[^{]+\}\}/g);
      while (true) {
        // search for array fragments in the template
        match = rgx.exec(template);
        if (!match) {
          break;
        }
        match = match[0].slice(3, -2);
        // if value is an array, then iteratively format the array fragment with it
        if (Array.isArray(dict[match])) {
          template = template.replace(
            new RegExp('\\{\\{#' + match + '\\}\\}([\\S\\s]*?)\\{\\{\\/' + match + '\\}\\}'),
            replace
          );
        }
      }
      // search for keys in the template
      return template.replace((/\{\{[^{}]+\}\}/g), function (keyList) {
        value = dict;
        // iteratively lookup nested values in the dict
        keyList.slice(2, -2).split('.').forEach(function (key) {
          value = value && value[key];
        });
        return value === undefined ? valueDefault || keyList : value;
      });
    };

    local._textFormat_default_test = function (onError) {
      /*
        this function tests textFormat's default handling behavior
      */
      var data;
      // test undefined valueDefault handling behavior
      data = mainApp.textFormat('{{aa}}', {}, undefined);
      mainApp.assert(data === '{{aa}}', data);
      // test default handling behavior
      data = mainApp.textFormat('{{aa}}{{aa}}{{bb}}{{cc}}{{dd}}{{ee.ff}}', {
        // test string value handling behavior
        aa: 'aa',
        // test non-string value handling behavior
        bb: 1,
        // test null-value handling behavior
        cc: null,
        // test undefined-value handling behavior
        dd: undefined,
        // test nested value handling behavior
        ee: { ff: 'gg' }
      }, '<undefined>');
      mainApp.assert(data === 'aaaa1null<undefined>gg', data);
      // test list handling behavior
      data = mainApp.textFormat('[{{#list1}}[{{#list2}}{{aa}},{{/list2}}],{{/list1}}]', {
        list1: [
          // test null-value handling behavior
          null,
          // test recursive list handling behavior
          { list2: [{ aa: 'bb' }, { aa: 'cc' }] }
        ]
      }, '<undefined>');
      mainApp.assert(data === '[[<undefined><undefined>,<undefined>],[bb,cc,],]', data);
      onError();
    };

    local._timeElapsedStop = function (options) {
      /*
        this function stops options.timeElapsed
      */
      if (options.timeElapsed > 0xffffffff) {
        options.timeElapsed = Date.now() - options.timeElapsed;
      }
    };
  }());



  (function () {
    /*
      this function runs browser js-env code
    */
    if (mainApp.modeJs !== 'browser') {
      return;
    }

    mainApp.ajax = function (options, onError) {
      /*
        this functions performs a brower ajax request with error handling and timeout
      */
      var data, error, errorStack, finished, ii, onEvent, timerTimeout, xhr;
      errorStack = mainApp.errorStack();
      // init event-handling
      onEvent = function (event) {
        switch (event.type) {
        case 'abort':
        case 'error':
        case 'load':
          // cleanup timerTimeout
          clearTimeout(timerTimeout);
          // validate finished is falsey
          mainApp.assert(!finished, finished);
          // set finished to true
          finished = true;
          // validate xhr is defined in local._ajaxProgressList
          ii = local._ajaxProgressList.indexOf(xhr);
          mainApp.assert(ii >= 0, 'missing xhr in local._ajaxProgressList');
          // remove xhr from ajaxProgressList
          local._ajaxProgressList.splice(ii, 1);
          // handle abort or error event
          if (!error &&
              (event.type === 'abort' || event.type === 'error' || xhr.status >= 400)) {
            error = new Error(event.type);
          }
          // handle completed xhr request
          if (xhr.readyState === 4) {
            // handle text data
            data = xhr.responseText;
            if (error) {
              // add http method / statusCode / url debug info to error.message
              error.message = options.method + ' ' + xhr.status + ' - ' +
                options.url + '\n' +
                JSON.stringify(xhr.responseText.slice(0, 256) + '...') + '\n' + error.message;
              // debug status code
              error.statusCode = xhr.status;
              // append errorStack to error.stack
              error.stack = mainApp.errorStack(error) + '\n' + errorStack;
            }
          }
          // hide _ajaxProgressDiv
          if (local._ajaxProgressList.length === 0) {
            local._ajaxProgressBarHide = setTimeout(function () {
              // hide ajaxProgressBar
              local._ajaxProgressDiv.style.display = 'none';
              // reset ajaxProgress
              local._ajaxProgressState = 0;
              local._ajaxProgressUpdate('0%', 'ajaxProgressBarDivLoading', 'loading');
            }, 1000);
          }
          onError(error, data, xhr);
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
      mainApp._debugXhr = xhr;
      // init event-handling
      xhr.addEventListener('abort', onEvent);
      xhr.addEventListener('error', onEvent);
      xhr.addEventListener('load', onEvent);
      xhr.addEventListener('loadstart', local._ajaxProgressIncrement);
      xhr.addEventListener('progress', local._ajaxProgressIncrement);
      xhr.upload.addEventListener('progress', local._ajaxProgressIncrement);
      // set timerTimeout
      timerTimeout = mainApp.onTimeout(function (errorTimeout) {
        error = errorTimeout;
        xhr.abort();
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
      // clear any pending timer to hide _ajaxProgressDiv
      clearTimeout(local._ajaxProgressBarHide);
      // send data
      xhr.send(options.data);
    };

    // init local._ajaxProgressBarDiv element
    local._ajaxProgressBarDiv =
      document.querySelector('.ajaxProgressBarDiv') || { className: '', style: {} };

    // init local._ajaxProgressDiv element
    local._ajaxProgressDiv = document.querySelector('.ajaxProgressDiv') || { style: {} };

    local._ajaxProgressIncrement = function () {
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
    };

    // init list of xhr used in ajaxProgress
    local._ajaxProgressList = [];

    // init local._ajaxProgressState
    local._ajaxProgressState = 0;

    local._ajaxProgressUpdate = function (width, type, label) {
      /*
        this function visually updates the ajaxProgressBar
      */
      local._ajaxProgressBarDiv.style.width = width;
      local._ajaxProgressBarDiv.className = local._ajaxProgressBarDiv.className
        .replace((/ajaxProgressBarDiv\w+/), type);
      local._ajaxProgressBarDiv.innerHTML = label;
    };
  }());



  (function () {
    /*
      this function runs node js-env code
    */
    if (mainApp.modeJs !== 'node') {
      return;
    }

    mainApp.ajax = function (options, onError) {
      /*
        this functions runs a node http request with error handling and timeout
      */
      var errorStack,
        finished,
        modeIo,
        onIo,
        request,
        response,
        responseText,
        timerTimeout,
        urlParsed;
      errorStack = mainApp.errorStack();
      modeIo = 0;
      onIo = function (error, data) {
        modeIo = error instanceof Error ? NaN : modeIo + 1;
        switch (modeIo) {
        case 1:
          // set timerTimeout
          timerTimeout = mainApp.onTimeout(
            onIo,
            options.timeout || mainApp.timeoutDefault,
            'ajax ' + options.url
          );
          // init request and response
          request = response = { destroy: mainApp.nop };
          // handle implicit localhost
          if (options.url[0] === '/') {
            options.url = 'http://localhost:' + mainApp.envDict.npm_config_server_port +
              options.url;
          }
          // parse options.url
          urlParsed = mainApp.url.parse(String(options.url));
          // disable socket pooling
          options.agent = options.agent || false;
          // hostname needed for http.request
          options.hostname = urlParsed.hostname;
          // path needed for http.request
          options.path = urlParsed.path;
          // port needed for http.request
          options.port = urlParsed.port;
          // init headers
          options.headers = options.headers || {};
          // init Content-Length header
          options.headers['Content-Length'] =
            typeof options.data === 'string' ? Buffer.byteLength(options.data)
            : Buffer.isBuffer(options.data) ? options.data.length
              : 0;
          // make http request
          request = (urlParsed.protocol === 'https:' ? mainApp.https : mainApp.http)
            .request(options, onIo)
            // handle error event
            .on('error', onIo);
          // debug ajax request
          mainApp._debugAjaxRequest = request;
          // send request and/or data
          request.end(options.data);
          break;
        case 2:
          response = error;
          // debug ajax response
          mainApp._debugAjaxResponse = response;
          mainApp.streamReadAll(response, onIo);
          break;
        case 3:
          // init responseText
          responseText = options.resultType === 'binary' ? data : data.toString();
          // error handling for http status code >= 400
          if (response.statusCode >= 400) {
            onIo(new Error(responseText));
            return;
          }
          // successful response
          onIo(null, responseText);
          break;
        default:
          // if already finished, then ignore error / data
          if (finished) {
            return;
          }
          finished = true;
          // cleanup timerTimeout
          clearTimeout(timerTimeout);
          // cleanup request
          request.destroy();
          // cleanup response
          response.destroy();
          if (error) {
            // add http method / statusCode / url debug info to error.message
            error.message = options.method + ' ' + (response && response.statusCode) + ' - ' +
              options.url + '\n' +
              JSON.stringify((responseText || '').slice(0, 256) + '...') + '\n' + error.message;
            // debug status code
            error.statusCode = response && response.statusCode;
            // append errorStack to error.stack
            error.stack = mainApp.errorStack(error) + '\n' + errorStack;
          }
          onError(error, responseText);
        }
      };
      onIo();
    };

    local._coverageInstrument = function (script, file) {
      /*
        this function instruments the given script and file
      */
      var istanbul;
      istanbul = require('istanbul-lite');
      return new istanbul.Instrumenter().instrumentSync(script, file);
    };

    local._coverageMerge_default_test = function (onError) {
      /*
        this function tests coverageMerge's default handling behavior
      */
      var coverage1, coverage2, script;
      script = local._coverageInstrument(
        '(function () {\nreturn arg ? __coverage__ : __coverage__;\n}());',
        'test'
      );
      mainApp.arg = 0;
      // init coverage1
      coverage1 = mainApp.vm.runInNewContext(script, { arg: 0 });
      // validate coverage1
      mainApp.assert(mainApp.jsonStringifyOrdered(coverage1) === '{"test":{"b":{"1":[0,1]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"f":{"1":1},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"test","s":{"1":1,"2":1},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage1);
      // init coverage1
      coverage2 = mainApp.vm.runInNewContext(script, { arg: 1 });
      // validate coverage2
      mainApp.assert(mainApp.jsonStringifyOrdered(coverage2) === '{"test":{"b":{"1":[1,0]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"f":{"1":1},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"test","s":{"1":1,"2":1},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage2);
      // merge coverage2 into coverage1
      mainApp.coverageMerge(coverage1, coverage2);
      // validate merged coverage1
      mainApp.assert(mainApp.jsonStringifyOrdered(coverage1) === '{"test":{"b":{"1":[1,1]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"f":{"1":2},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"test","s":{"1":2,"2":2},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage1);
      onError();
    };

    mainApp.fileCacheAndParse = function (options) {
      /*
        this function parses options.file and caches it to mainApp.fileCacheDict
      */
      var tmp;
      // read options.data from options.file
      options.data = mainApp.fs.readFileSync(options.file, 'utf8')
        // comment out shebang
        .replace((/^#!/), '//#!');
      // cache options to mainApp.fileCacheDict[options.cache]
      if (options.cache) {
        mainApp.fileCacheDict[options.cache] = options;
      }
      // parse options.data's embedded sub-files
      if (options.parse) {
        options.data.replace(
          (/^\/\* FILE_BEGIN ([\S\s]+?) \*\/$([\S\s]+?)^\/\* FILE_END \*\/$/gm),
          function (match0, options2, data, ii) {
            // nop hack to pass jslint
            mainApp.nop(match0);
            // preserve lineno
            tmp =
              options.data.slice(0, ii).replace((/.+/g), '') + options2.replace((/.+/g), '');
            options2 = JSON.parse(options2);
            // cache options2 to mainApp.fileCacheDict[options2.file]
            mainApp.fileCacheDict[options2.file] = options2;
            // cache data to option2.data and preserve lineno
            options2.data = tmp + data;
            // run each action in options2.actionList
            options2.actionList.forEach(function (action) {
              switch (action) {
              // export options2.data to mainApp.mainAppBrowser.fileCacheDict
              case 'exportBrowser':
                mainApp.mainAppBrowser.fileCacheDict[options2.file] = options2;
                break;
              // jslint options2.data
              case 'jslint':
                mainApp.jslint_lite.jslintAndPrint(options2.data, options2.file);
                break;
              }
            });
            // auto-trim data
            options2.data = options2.data.trim();
          }
        );
      }
      // if coverage-mode is enabled, then instrument options.data
      if (mainApp.__coverage__ &&
          options.coverage &&
          options.coverage === mainApp.envDict.PACKAGE_JSON_NAME) {
        options.data = local._coverageInstrument(options.data, options.file);
        // write instrumented options.data to fs
        mainApp.fs.writeFileSync(
          process.cwd() + '/.tmp/instrumented.' + options.cache.replace((/[^\w\-]/g), '.'),
          options.data
        );
      }
    };

    mainApp.onFileModifiedCacheAndParse = function (options) {
      /*
        this function watches the file and if modified, then cache and parse it
      */
      mainApp.fs.watchFile(options.file, {
        interval: 1000,
        persistent: false
      }, function (stat2, stat1) {
        if (stat2.mtime > stat1.mtime) {
          mainApp.fileCacheAndParse(options);
        }
      });
    };

    mainApp.onFileModifiedJslint = function (file) {
      /*
        this function watches the file and if modified, then jslint it
      */
      mainApp.fs.watchFile(file, {
        interval: 1000,
        persistent: false
      }, function (stat2, stat1) {
        if (stat2.mtime > stat1.mtime) {
          mainApp.jslint_lite.jslintAndPrint(mainApp.fs.readFileSync(file, 'utf8'), file);
        }
      });
    };

    mainApp.onFileModifiedRestart = function (file) {
      /*
        this function watches the file and if modified, then restart the process
      */
      if (process.env.npm_config_mode_auto_restart && mainApp.fs.statSync(file).isFile()) {
        mainApp.fs.watchFile(file, {
          interval: 1000,
          persistent: false
        }, function (stat2, stat1) {
          if (stat2.mtime > stat1.mtime) {
            process.exit();
          }
        });
      }
    };

    local._onFileModified_default_test = function (onError) {
      /*
        this function tests onFileModified's watchFile handling behavior
      */
      var onParallel;
      onParallel = mainApp.onParallel(onError);
      onParallel.counter += 1;
      // test fileCacheAndParse's watchFile handling behavior
      [
        // test auto-jslint handling behavior
        __dirname + '/package.json',
        // test auto-cache handling behavior
        __dirname + '/index.data'
      ].forEach(function (file) {
        onParallel.counter += 1;
        mainApp.fs.stat(file, function (error, stat) {
          // test default watchFile handling behavior
          onParallel.counter += 1;
          mainApp.fs.utimes(file, stat.atime, new Date(), onParallel);
          // test nop watchFile handling behavior
          onParallel.counter += 1;
          setTimeout(function () {
            mainApp.fs.utimes(file, stat.atime, stat.mtime, onParallel);
          // coverage - use 1500 ms to cover setInterval watchFile in node
          }, 1500);
          onParallel(error);
        });
      });
      onParallel();
    };

    mainApp.replStart = function (globalDict) {
      /*
        this function starts the repl debugger
      */
      var evil, match;
      // evil hack to pass jslint
      evil = 'eval';
      Object.keys(globalDict).forEach(function (key) {
        global[key] = globalDict[key];
      });
      // start repl server
      local._replServer = require('repl').start({ useGlobals: true });
      // save repl eval function
      local._replServer.evalDefault = local._replServer[evil];
      // hook custom repl eval function
      local._replServer[evil] = function (script, context, file, onError) {
        match = (/^\(([^ ]+)(.*)\n\)/).exec(script);
        switch (match && match[1]) {
        // syntax sugar to run async shell command
        case '$':
          switch (match[2]) {
          // syntax sugar to run git diff
          case ' git diff':
            match[2] = ' git diff --color | cat';
            break;
          // syntax sugar to run git log
          case ' git log':
            match[2] = ' git log -n 4 | cat';
            break;
          }
          // run async shell command
          mainApp.child_process.spawn(
            '/bin/bash',
            ['-c', match[2]],
            { stdio: ['ignore', 1, 2] }
          )
            // on shell exit, print return prompt
            .on('exit', function () {
              local._replServer.evalDefault('\n', context, file, onError);
            });
          return;
        // syntax sugar to grep current directory
        case 'grep':
          // run async shell command
          mainApp.child_process.spawn(
            '/bin/bash',
            ['-c', 'find . -type f | grep -v "/\\.\\|.*\\b\\(\\.\\d\\|' +
              'archive\\|artifacts\\|' +
              'bower_components\\|build\\|' +
              'coverage\\|' +
              'docs\\|' +
              'external\\|' +
              'git_modules\\|' +
              'jquery\\|' +
              'log\\|logs\\|' +
              'min\\|' +
              'node_modules\\|' +
              'rollup\\|' +
              'swp\\|' +
              'tmp\\)\\b" | tr "\\n" "\\000" | xargs -0 grep -in "' + match[2].trim() + '"'],
            { stdio: ['ignore', 1, 2] }
          )
            // on shell exit, print return prompt
            .on('exit', function () {
              local._replServer.evalDefault('\n', context, file, onError);
            });
          return;
        // syntax sugar to print stringified arg
        case 'print':
          script = '(console.log(String(' + match[2] + '))\n)';
          break;
        }
        // eval modified script
        local._replServer.evalDefault(script, context, file, onError);
      };
    };

    local._replStart_default_test = function (onError) {
      /*
        this function test replStart's default handling behavior
      */
      var evil;
      mainApp.testMock([
        [mainApp.child_process, { spawn: function () {
          return { on: function (event, callback) {
            // nop hack to pass jslint
            mainApp.nop(event);
            callback();
          } };
        } }]
      ], onError, function (onError) {
        // evil hack to pass jslint
        evil = 'eval';
        [
          // test shell handling behavior
          '($ :\n)',
          // test git diff handling behavior
          '($ git diff\n)',
          // test git log handling behavior
          '($ git log\n)',
          // test grep handling behavior
          '(grep \\bhello\\b\n)',
          // test print handling behavior
          '(print\n)'
        ].forEach(function (script) {
          local._replServer[evil](script, null, 'repl', mainApp.nop);
        });
        // test syntax-error handling behavior
        local._replServer[evil]('syntax-error', null, 'repl', function (error) {
          mainApp.testTryCatch(function () {
            // validate error occurred
            // bug - use util.isError to validate error when using eval
            mainApp.assert(require('util').isError(error), error);
            onError();
          }, onError);
        });
      });
    };

    mainApp.serverRespondDefault = function (request, response, statusCode, error) {
      /*
        this function responds with a default message,
        or error stack for the given statusCode
      */
      // set response / statusCode / contentType
      mainApp.serverRespondWriteHead(request, response, statusCode, {
        'Content-Type': 'text/plain; charset=utf-8'
      });
      if (error) {
        // if modeErrorIgnore is undefined in url search params,
        // then print error.stack to stderr
        if (!(/\?.*\bmodeErrorIgnore=1\b/).test(request.url)) {
          mainApp.onErrorDefault(error);
        }
        // end response with error.stack
        response.end(mainApp.errorStack(error));
        return;
      }
      // end response with default statusCode message
      response.end(statusCode + ' ' + mainApp.http.STATUS_CODES[statusCode]);
    };

    mainApp.serverRespondEcho = function (request, response) {
      /*
        this function responds with debug info
      */
      response.write(request.method + ' ' + request.url +
        ' HTTP/' + request.httpVersion + '\r\n' +
        Object.keys(request.headers).map(function (key) {
          return key + ': ' + request.headers[key] + '\r\n';
        }).join('') + '\r\n');
      request.pipe(response);
    };

    mainApp.serverRespondWriteHead = function (request, response, statusCode, headers) {
      /*
        this function sets the response object's statusCode / headers
      */
      // nop hack to pass jslint
      mainApp.nop(request);
      if (!response.headersSent) {
        // set response.statusCode
        if (statusCode) {
          response.statusCode = statusCode;
        }
        Object.keys(headers).forEach(function (key) {
          if (headers[key]) {
            response.setHeader(key, headers[key]);
          }
        });
      }
    };

    mainApp.streamReadAll = function (readableStream, onError) {
      /*
        this function concats data from the readableStream,
        and passes it to onError when finished reading
      */
      var chunkList;
      chunkList = [];
      // read data from the readableStream
      readableStream
        // on data event, push the buffer chunk to chunkList
        .on('data', function (chunk) {
          chunkList.push(chunk);
        })
        // on end event, pass concatenated read buffer to onError
        .on('end', function () {
          onError(null, Buffer.concat(chunkList));
        })
        // on error event, pass error to onError
        .on('error', onError);
    };

    mainApp.testMiddleware = function (request, response, onIo) {
      var contentTypeDict;
      // debug server request
      mainApp._debugServerRequest = request;
      // debug server response
      mainApp._debugServerResponse = response;
      // check if _testSecret is valid
      request._testSecretValid = (/\b_testSecret=(\w+)\b/).exec(request.url);
      request._testSecretValid =
        request._testSecretValid && request._testSecretValid[1] === mainApp._testSecret;
      // init request.urlPathNormalized
      request.urlPathNormalized =
        mainApp.path.resolve(mainApp.url.parse(request.url).pathname);
      // init Content-Type header
      contentTypeDict = {
        '.css': 'text/css; charset=UTF-8',
        '.html': 'text/html; charset=UTF-8',
        '.js': 'application/javascript; charset=UTF-8',
        '.json': 'application/json; charset=UTF-8',
        '.txt': 'text/txt; charset=UTF-8'
      };
      mainApp.serverRespondWriteHead(request, response, null, {
        'Content-Type': contentTypeDict[mainApp.path.extname(request.urlPathNormalized)]
      });
      switch (request.urlPathNormalized) {
      // serve the following assets from fileCacheDict
      case '/assets/utility2.js':
      case '/test/test.js':
        response.end(mainApp.fileCacheDict[request.urlPathNormalized].data);
        break;
      // serve test page
      case '/test/test.html':
      case '/test/utility2.html':
        response.end(mainApp.textFormat(mainApp.fileCacheDict[
          request.urlPathNormalized
        ].data, {
          envDict: mainApp.envDict,
          mainAppBrowserJson: JSON.stringify(mainApp.mainAppBrowser),
          utility2Css: mainApp.fileCacheDict['/assets/utility2.css'].data
        }));
        break;
      // fallback to next middleware
      default:
        onIo();
      }
    };

    mainApp.testPhantom = function (options, onError) {
      /*
        this function spawns a phantomjs process to test a url
      */
      var onParallel;
      onParallel = mainApp.onParallel(onError);
      onParallel.counter += 1;
      // init timeout
      options.timeout = options.timeout || mainApp.timeoutDefault;
      ['phantomjs', 'slimerjs'].forEach(function (argv0) {
        var file, onError2, timerTimeout;
        // if slimerjs is not available, then do not use it
        if (argv0 === 'slimerjs' && (!mainApp.envDict.npm_config_mode_slimerjs ||
            mainApp.envDict.npm_config_mode_no_slimerjs)) {
          return;
        }
        argv0 = mainApp.envDict.MODE_BUILD + '.' + argv0;
        if ('utility2' === mainApp.envDict.PACKAGE_JSON_NAME) {
          argv0 += (mainApp.url.parse(options.url).path).replace((/\W+/g), '.');
        }
        onParallel.counter += 1;
        onError2 = function (error) {
          // cleanup timerTimeout
          clearTimeout(timerTimeout);
          onParallel(error);
        };
        // set timerTimeout
        timerTimeout = mainApp.onTimeout(onError2, options.timeout, argv0);
        file = __dirname + '/index.js';
        // cover index.js
        if (mainApp.__coverage__ && 'utility2' === mainApp.envDict.PACKAGE_JSON_NAME) {
          file = process.cwd() + '/.tmp/instrumented..assets.utility2.js';
        }
        // spawn a phantomjs process to test a url
        mainApp.child_process.spawn(argv0.split('.')[1], [file, encodeURIComponent(
          JSON.stringify(mainApp.setOverride({
            argv0: argv0,
            __dirname: __dirname,
            _testSecret: mainApp._testSecret,
            timeoutDefault: options.timeout
          }, 1, options))
        )], { stdio: 'inherit' })
          .on('exit', function (exitCode) {
            // merge coverage code
            mainApp.coverageMerge(
              mainApp.__coverage__,
              JSON.parse(mainApp.fs.readFileSync(
                process.cwd() +
                  '/.tmp/build/coverage-report.html/coverage.' + argv0 + '.json',
                'utf8'
              ))
            );
            // merge tests
            if (!options.modeErrorIgnore) {
              mainApp.testMerge(
                mainApp.testReport,
                JSON.parse(mainApp.fs.readFileSync(
                  process.cwd() + '/.tmp/build/test-report.' + argv0 + '.json',
                  'utf8'
                ))
              );
            }
            onError2(exitCode && new Error(argv0 + ' exit ' + exitCode));
          });
      });
      onParallel();
    };

    mainApp.testRunServer = function (onTestRunEnd, middlewareList) {
    /*
      this function will
      1. create a test-server with middlewareList
      2. start test-server on $npm_config_server_port
      3. test test-server
    */
      // if $npm_config_timeout_exit is defined,
      // then exit this process after $npm_config_timeout_exit ms
      if (Number(mainApp.envDict.npm_config_timeout_exit)) {
        setTimeout(process.exit, Number(mainApp.envDict.npm_config_timeout_exit))
          // keep timerTimeout from blocking the process from exiting
          .unref();
      }
      // if $npm_config_server_port is undefined,
      // then assign it a random integer in the inclusive range 1 to 0xffff
      mainApp.envDict.npm_config_server_port = mainApp.envDict.npm_config_server_port ||
        ((Math.random() * 0x10000) | 0x8000).toString();
      // 1. create a test-server with middlewareList
      mainApp.http.createServer(function (request, response) {
        var modeIo, onIo;
        modeIo = -1;
        onIo = function (error) {
          modeIo = error instanceof Error ? NaN : modeIo + 1;
          if (middlewareList[modeIo]) {
            middlewareList[modeIo](request, response, onIo);
            return;
          }
          // if error occurred, then respond with '500 Internal Server Error'
          // else respond with '404 Not Found'
          mainApp.serverRespondDefault(request, response, error ? 500 : 404, error);
        };
        onIo();
      })
        // 2. start test-server on $npm_config_server_port
        .listen(mainApp.envDict.npm_config_server_port, function () {
          console.log(
            'test-server listening on port ' + mainApp.envDict.npm_config_server_port
          );
          // 3. test test-server
          mainApp.testRun(onTestRunEnd);
        });
    };

    local._testRunServer_misc_test = function (onError) {
      /*
        this function tests testRunServer's misc handling behavior
      */
      // test random server-port handling behavior
      mainApp.testMock([
        [mainApp.http, { createServer: function () {
          return { listen: mainApp.nop };
        } }],
        [mainApp.envDict, {
          // test auto-exit handling behavior
          npm_config_timeout_exit: '1',
          // test random $npm_config_server_port handling behavior
          npm_config_server_port: ''
        }]
      ], onError, function (onError) {
        mainApp.testRunServer(mainApp.nop, []);
        onError();
      });
    };
  }());



  (function () {
    /*
      this function runs shared js-env code
    */
    switch (mainApp.modeJs) {
    // init browser js-env
    case 'browser':
      // init mainApp
      global.$$mainApp = global.$$mainApp || mainApp;
      // init mainApp properties
      mainApp.envDict = mainApp.envDict || {};
      mainApp.testPlatform.name = 'browser - ' + navigator.userAgent +
        ' - ' + new Date().toISOString();
      mainApp.testPlatform.screenCaptureImg = mainApp.envDict.MODE_BUILD_SCREEN_CAPTURE;
      // parse any url-search-params that matches 'mode*' or '_testSecret' or 'timeoutDefault'
      location.search.replace(
        (/\b(mode[A-Z]\w+|_testSecret|timeoutDefault)=([^#&=]+)/g),
        function (match0, key, value) {
          // nop hack to pass jslint
          mainApp.nop(match0);
          mainApp[key] = value;
          // try to parse value as json object
          try {
            mainApp[key] = JSON.parse(value);
          } catch (ignore) {
          }
        }
      );
      break;
    // init node js-env
    case 'node':
      // require modules
      mainApp.child_process = require('child_process');
      mainApp.crypto = require('crypto');
      mainApp.fs = require('fs');
      mainApp.http = require('http');
      mainApp.https = require('https');
      mainApp.jslint_lite = require('jslint-lite');
      mainApp.path = require('path');
      mainApp.url = require('url');
      mainApp.vm = require('vm');
      // init mainApp properties
      mainApp.envDict = process.env;
      mainApp.testPlatform.name = 'node - ' + process.platform + ' ' + process.version +
        ' - ' + new Date().toISOString();
      mainApp.testPlatform.screenCaptureImg = mainApp.envDict.MODE_BUILD_SCREEN_CAPTURE;
      // init mainApp.__coverage__
      Object.keys(global).forEach(function (key) {
        if (key.indexOf('$$cov_') === 0) {
          mainApp.__coverage__ = global[key];
        }
      });
      // init mainApp with default values
      mainApp.setDefault(mainApp, -1, {
        // export __dirname
        __dirname: __dirname,
        // init state file used for browser init
        mainAppBrowser: {
          envDict: {
            PACKAGE_JSON_DESCRIPTION: mainApp.envDict.PACKAGE_JSON_DESCRIPTION,
            PACKAGE_JSON_NAME: mainApp.envDict.PACKAGE_JSON_NAME,
            PACKAGE_JSON_VERSION: mainApp.envDict.PACKAGE_JSON_VERSION
          },
          fileCacheDict: {}
        }
      });
      // cache index.* files
      [{
        file: __dirname + '/index.data',
        parse: true
      }, {
        cache: '/assets/utility2.js',
        coverage: 'utility2',
        file: __dirname + '/index.js'
      }].forEach(function (options) {
        mainApp.fileCacheAndParse(options);
      });
      // init _testSecret
      (function () {
        var testSecretCreate;
        testSecretCreate = function () {
          mainApp._testSecret = mainApp.crypto.randomBytes(32).toString('hex');
        };
        // init _testSecret
        testSecretCreate();
        mainApp._testSecret = mainApp.envDict.TEST_SECRET || mainApp._testSecret;
        // re-init _testSecret every 60 seconds
        setInterval(testSecretCreate, 60000).unref();
      }());
      break;
    // init phantom js-env
    case 'phantom':
      // require modules
      mainApp.fs = require('fs');
      mainApp.system = require('system');
      mainApp.webpage = require('webpage');
      // init mainApp properties
      mainApp.envDict = mainApp.system.env;
      mainApp.phantom = global.phantom;
      mainApp.testPlatform.name = (global.slimer ? 'slimer - ' : 'phantom - ') +
        mainApp.system.os.name + ' ' +
        mainApp.phantom.version.major + '.' +
        mainApp.phantom.version.minor + '.' +
        mainApp.phantom.version.patch +
        ' - ' + new Date().toISOString();
      mainApp.testPlatform.screenCaptureImg = mainApp.envDict.MODE_BUILD_SCREEN_CAPTURE;
      // override mainApp properties
      mainApp.setOverride(
        mainApp,
        -1,
        JSON.parse(decodeURIComponent(mainApp.system.args[1]))
      );
      // mock mainApp.fileCacheDict['/test/test-report.html.template'].data
      mainApp.fileCacheDict = { '/test/test-report.html.template': { data: '' } };
      // if modeErrorIgnore, then suppress console.error and console.log
      if (mainApp.modeErrorIgnore) {
        console.error = console.log = mainApp.nop;
      }
      // init error handling
      mainApp.phantom.onError = function (message, trace) {
        /*
          this function will catch all errors and
          1. check if the error-message is a test-callback, and handle it appropriately
          2. else handle it as a normal error
        */
        try {
          var data, file;
          data = (/^Error: (\{"global_test_results":\{.+)/).exec(message);
          data = data && JSON.parse(data[1]).global_test_results;
          // 1. check if the error-message is a test-callback, and handle it appropriately
          if (data) {
            // handle global_test_results passed as error
            // merge coverage
            mainApp.coverageMerge(mainApp.__coverage__, data.coverage);
            // create screenCapture
            file = mainApp.fs.workingDirectory + '/.tmp/build/screen-capture.' +
              mainApp.argv0.replace((/\b(phantomjs|slimerjs)\b.*/g), '$1') + '.png';
            mainApp.page.render(file);
            console.log('created ' + 'file://' + file);
            // integrate screenCapture into test-report
            data.testReport.testPlatformList[0].screenCaptureImg =
              file.replace((/^.*\//), '');
            // merge test-report
            mainApp.testMerge(mainApp.testReport, data.testReport);
          // 2. else handle it as a normal error
          } else {
            // phantom error handling - http://phantomjs.org/api/phantom/handler/on-error.html
            console.error('\n\n');
            console.error(mainApp.argv0 + ' ERROR: ' + message);
            if (trace && trace.length) {
              console.error(mainApp.argv0 + ' TRACE:');
              trace.forEach(function (t) {
                console.error(' -> ' + (t.file || t.sourceURL) + ': ' + t.line
                  + (t.function ? ' (in function ' + t.function + ')' : ''));
              });
            }
            console.error('\n\n');
          }
          [[
            '.tmp/build/test-report.' + mainApp.argv0 + '.json',
            mainApp.testReport
          ], [
            '.tmp/build/coverage-report.html/coverage.' + mainApp.argv0 + '.json',
            mainApp.__coverage__
          ]].forEach(function (args) {
            file = mainApp.fs.workingDirectory + '/' + args[0];
            mainApp.fs.write(file, JSON.stringify(args[1]));
            console.log('created ' + 'file://' + file);
          });
          // exit with number of tests failed as exit-code
          mainApp.phantom.exit(!data || data.testReport.testsFailed);
        } catch (error) {
          console.error(error.message);
          mainApp.phantom.exit(1);
        }
      };
      // set timeout for phantom
      mainApp.onTimeout(function (error) {
        mainApp.phantom.onError(error.message);
      }, mainApp.timeoutDefault, mainApp.url);
      // reset testCaseList
      mainApp.testPlatform.testCaseList = [];
      // init page
      mainApp.page = mainApp.webpage.create();
      // init page's viewport-size
      mainApp.page.viewportSize = mainApp.viewportSize || { height: 600, width: 800 };
      // init page's error handling
      // http://phantomjs.org/api/webpage/handler/on-error.html
      mainApp.page.onError = mainApp.phantom.onError;
      // pipe page's console.log to stdout
      mainApp.page.onConsoleMessage = function () {
        console.log.apply(console, arguments);
      };
      // open requested webpage
      mainApp.page.open(
        // security - insert _testSecret in url without revealing it
        mainApp.url.replace('{{_testSecret}}', mainApp._testSecret),
        function (data) {
          console.log(mainApp.argv0 + ' - open ' + data + ' ' + mainApp.url);
          // validate page opened successfully
          mainApp.assert(data === 'success', data);
        }
      );
      // test phantom.onError
      if (mainApp.modeTestPhantomOnError) {
        mainApp.testPlatform.testCaseList = [{
          name: 'utility2.phantom._phantomOnError_default_test',
          onTestCase: function (onError) {
            /*
              this function tests phantom.onError's default handling behavior
            */
            var exitCode;
            mainApp.testMock([
              [mainApp, {
                fs: { write: mainApp.nop },
                phantom: { exit: function (_exitCode) {
                  exitCode = _exitCode;
                } }
              }]
            ], onError, function (onError) {
              mainApp.testTryCatch(function () {
                // test default handling behavior
                global.phantom.onError('Error: ' + JSON.stringify({ global_test_results: {
                  testReport: mainApp.testReport
                } }));
                // validate exitCode
                mainApp.assert(!exitCode, exitCode);
                // test error-caught handling behavior
                global.phantom.onError('Error: ' + JSON.stringify({ global_test_results: {
                  testReport: mainApp.testReport
                } }) + 'syntax-error');
                // validate exitCode
                mainApp.assert(exitCode, exitCode);
                // test error-trace handling behavior
                global.phantom.onError('error-trace', [{
                  file: 'undefined'
                }, {
                  function: 'undefined'
                }, {
                  sourceUrl: 'undefined'
                }]);
                // validate exitCode
                mainApp.assert(exitCode, exitCode);
                // test no error-trace handling behavior
                global.phantom.onError('no-error-trace');
                // validate exitCode
                mainApp.assert(exitCode, exitCode);
                onError();
              }, onError);
            });
          }
        }];
        mainApp.testRun(function () {
          mainApp.phantom.onError('Error: ' + JSON.stringify({ global_test_results: {
            testReport: mainApp.testReport
          } }));
        });
      }
      break;
    }
    // add local test-case's
    mainApp.testCaseAdd(local, mainApp);
  }());
}((function ($$self) {
  /*
    this function returns js-env options
  */
  'use strict';
  try {
    // init phantom js-env
    return {
      global: $$self,
      mainApp: {},
      modeJs: $$self.phantom.version &&
        typeof require('webpage').create === 'function' && 'phantom',
      _testPrefix: 'utility2.index.phantom'
    };
  } catch (errorCaughtPhantom) {
    try {
      // init node js-env
      return {
        global: global,
        mainApp: module.exports,
        modeJs: module.exports && typeof process.versions.node === 'string' &&
          typeof require('child_process').spawn === 'function' && 'node',
        _testPrefix: 'utility2.index.node'
      };
    } catch (errorCaughtNode) {
      // init browser js-env
      return {
        global: window,
        mainApp: window.$$mainApp || {},
        modeJs: window && typeof navigator.userAgent === 'string' &&
          typeof document.querySelector('body') === 'object' && 'browser',
        _testPrefix: 'utility2.index.browser'
      };
    }
  }
}(this))));
