/*jslint
  bitwise: true, browser: true,
  indent: 2,
  maxerr: 8,
  node: true, nomen: true,
  regexp: true,
  stupid: true,
  todo: true
*/
/*global phantom*/
(function main($$options) {
  /*
    this function is the main module
  */
  'use strict';
  var global, local, localBrowser, localNode, localPhantom, mainApp;

  local = {
    _ajax_default_test: function (onError) {
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
        // test 404 error handling behavior
        url: '/test/undefined?modeErrorIgnore=1'
      }, {
        // test 500 internal server error handling behavior
        url: '/test/error?modeErrorIgnore=1'
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
    },

    coverageMerge: function (coverage1, coverage2) {
      /*
        this function merges coverage2 into coverage1
      */
      var dict1, dict2;
      Object.keys(coverage2).forEach(function (file) {
        // if file does not exist in coverage1, then add it
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
              dict1[key] = dict1[key] || [];
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
    },

    _debug_print: function (arg) {
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
    },

    __debug_print_default_test: function (onError) {
      /*
        this function tests _debug_print's default handling behavior
      */
      var message;
      mainApp.testMock(onError, [
        // mock console.error
        [console, { error: function (arg) {
          message += (arg || '') + '\n';
        } }]
      ], function (onError) {
        message = '';
        local._debug_print('_debug_print_default_test');
        // validate message
        mainApp.assert(
          message === '\n\n\ndebug' + 'Print\n_debug_print_default_test\n\n',
          message
        );
        onError();
      });
    },

    assert: function (passed, message) {
      /*
        this function throws an error if the assertion fails
      */
      if (!passed) {
        throw new Error(
          // if message is a string, then leave it as is
          typeof message === 'string' ? message
            // if message is an Error object, then get its stack trace
            : message instanceof Error ? mainApp.errorStack(message)
              // else JSON.stringify message
              : JSON.stringify(message)
        );
      }
    },

    _assert_default_test: function (onError) {
      /*
        this function tests assert's default handling behavior
      */
      // test assertion passed
      mainApp.assert(true, true);
      // test assertion failed with text message
      mainApp.testTryCatch(function () {
        mainApp.assert(false, '_assert_default_test');
      }, function (error) {
        // validate error occurred
        mainApp.assert(error instanceof Error, error);
        // validate error message
        mainApp.assert(
          error.message === '_assert_default_test',
          error.message
        );
      });
      // test assertion failed with error object
      mainApp.testTryCatch(function () {
        mainApp.assert(false, mainApp._errorDefault);
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
        // validate error message
        mainApp.assert(error.message === '{"aa":1}', error.message);
      });
      onError();
    },

    callArg0: function (callback) {
      /*
        this function calls the callback in arg position 0
      */
      callback();
    },

    callArg1: function (arg0, callback) {
      /*
        this function calls the callback in arg position 1
      */
      // nop hack to pass jslint
      mainApp.nop(arg0);
      callback();
    },

    callArg2: function (arg0, arg1, callback) {
      /*
        this function calls the callback in arg position 2
      */
      // nop hack to pass jslint
      mainApp.nop(arg0, arg1);
      callback();
    },

    _callArgX_default_test: function (onError) {
      /*
        this function tests callArgX's default handling behavior
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
      onError();
    },

    errorStack: function (error) {
      /*
        this function returns the error's stack or message attribute
      */
      return String(error.stack || error.message);
    },

    jsonCopy: function (obj) {
      /*
        this function returns a deep-copy of the JSON obj
      */
      return JSON.parse(JSON.stringify(obj));
    },

    jsonStringifyOrdered: function (value, replacer, space) {
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
    },

    _jsonStringifyOrdered_default_test: function (onError) {
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
      // test mixed data-type handling behavior
      data = mainApp.jsonStringifyOrdered({
        ee: {},
        dd: [undefined],
        cc: mainApp.nop,
        bb: 2,
        aa: 1
      });
      mainApp.assert(data === '{"aa":1,"bb":2,"dd":[null],"ee":{}}', data);
      onError();
    },

    localExport: function (local, exports) {
      /*
        this function exports the local object to exports
      */
      Object.keys(local).forEach(function (key) {
        // add testCase to mainApp._testReport
        if (key.slice(-5) === '_test' &&
            local._name.split('.')[0] === mainApp._envDict.PACKAGE_JSON_NAME &&
            (!mainApp.modeTestCase || mainApp.modeTestCase === key)) {
          mainApp._testPlatform.testCaseList.push({
            callback: local[key],
            name: local._name + '.' + key
          });
          return;
        }
        // export items that don't start with an underscore _
        if (key[0] !== '_') {
          mainApp[key] = local[key];
        }
      });
      // export mainApp
      Object.keys(mainApp).forEach(function (key) {
        // export items that don't start with an underscore _
        if (key[0] !== '_' && !exports[key]) {
          exports[key] = mainApp[key];
        }
      });
    },

    nop: function () {
      /*
        this function performs no operation - nop
      */
      return;
    },

    onErrorDefault: function (error) {
      /*
        this function provides a default error handling callback.
      */
      // error exists, then print the error stack
      if (error) {
        console.error('\nonErrorDefault - error\n' + mainApp.errorStack(error) + '\n');
      }
    },

    __onErrorDefault_default_test: function (onError) {
      /*
        this function tests _onErrorDefault's default handling behavior
      */
      var message;
      mainApp.testMock(onError, [
        // mock console.error
        [console, { error: function (arg) {
          message = arg;
        } }]
      ], function (onError) {
        // test no error handling behavior
        mainApp.onErrorDefault();
        // validate message
        mainApp.assert(!message, message);
        // test error handling behavior
        mainApp.onErrorDefault(mainApp._errorDefault);
        // validate message
        mainApp.assert(message, message);
        onError();
      });
    },

    onParallel: function (onError) {
      /*
        this function returns another function that runs async tasks in parallel,
        and calls onError only if there's an error, or if its counter reaches zero
      */
      var self;
      self = function (error) {
        // if it exists, then print error
        mainApp.onErrorDefault(error);
        // if error is not already set, then set it to error
        self.error = self.error || error;
        // decrement counter
        self.counter -= 1;
        // if counter is 0, then call onError with error
        if (self.counter === 0) {
          onError(self.error);
        }
      };
      // init counter
      self.counter = 0;
      // return callback
      return self;
    },

    onTimeout: function (onError, timeout, message) {
      /*
        this function creates a timer that passes a timeout error to onError,
        when the specified timeout has passed
      */
      var error;
      // validate timeout is a finite, positive-definite integer
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
    },

    _onTimeout_timeout_test: function (onError) {
      /*
        this function tests onTimeout's timeout handling behavior
      */
      var timeElapsed;
      // init timeElapsed
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
      }, 1500, '_onTimeout_timeoutError_test');
    },

    setDefault: function (options, depth, defaults) {
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
    },

    _setDefault_default_test: function (onError) {
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
    },

    setOverride: function (options, depth, override, backup) {
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
          options[key] = override2;
          return;
        }
        // 3. recurse options[key] and override[key]
        mainApp.setOverride(options2, depth, override2, override2, backup);
      });
      return options;
    },

    _setOverride_default_test: function (onError) {
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
    },

    testMock: function (onError, mockList, test) {
      /*
        this function mocks the mainApp given in the mockList while running the test callback
      */
      var onError2;
      // prepend mandatory mocks for async / unsafe functions
      mockList = [
        // suppress console.log
        [console, { log: mainApp.nop }],
        // enforce synchonicity by mocking timers as mainApp.callArg0
        [global, { setInterval: mainApp.callArg0, setTimeout: mainApp.callArg0 }],
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
        // run test
        test(onError2);
      }, onError2);
    },

    testMerge: function (testReport1, testReport2) {
      /*
        this function
        1. merges testReport2 into testReport1
        2. returns testReport1 in html format
      */
      var errorStackList, testCaseNumber, testReport;
      // part 1 - merge testReport2 into testReport1
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
          // insert $MODE_CI_BUILD into testPlatform.name
          if (mainApp.modeJs === 'node' && mainApp._envDict.MODE_CI_BUILD) {
            testPlatform.name = testPlatform.name.replace(
              (/^(browser|node)/),
              mainApp._envDict.MODE_CI_BUILD + ' - $1'
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
        testReport1.testPlatformList.forEach(function (testPlatform1) {
          // validate testPlatform1.name doesn't collide testPlatform2.name
          mainApp.assert(testPlatform1.name !== testPlatform2.name, testPlatform1.name);
        });
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
      // part 2 - create and return html test-report
      // json-copy testReport, which will be modified for html templating
      testReport = mainApp.jsonCopy(testReport);
      // parse timeElapsed
      local._timeElapsedStop(testReport);
      testReport.testPlatformList.forEach(function (testPlatform) {
        local._timeElapsedStop(testPlatform);
        testPlatform.testCaseList.forEach(function (testCase) {
          local._timeElapsedStop(testCase);
          testPlatform.timeElapsed =
            Math.max(testPlatform.timeElapsed, testCase.timeElapsed);
        });
        testReport.timeElapsed = Math.max(testReport.timeElapsed, testPlatform.timeElapsed);
      });
      // create html test-report
      testCaseNumber = 0;
      return mainApp.textFormat(
        mainApp._fileCacheDict['/test/test-report.html.template'].data,
        mainApp.setOverride(testReport, -1, {
          _envDict: mainApp._envDict,
          // security - sanitize '<' in text
          CI_COMMIT_INFO: String(mainApp._envDict.CI_COMMIT_INFO).replace((/</g), '&lt;'),
          // map testPlatformList
          testPlatformList: testReport.testPlatformList.map(function (testPlatform, ii) {
            errorStackList = [];
            return mainApp.setOverride(testPlatform, -1, {
              errorStackList: errorStackList,
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
                if (testCase.errorStack) {
                  // word wrap error message to 96 characters in html <pre> tag
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
    },

    testRun: function () {
      /*
        this function inits tests
      */
      var consoleError, onParallel, testPlatform, timerInterval;
      // if in browser mode, visually refresh test progress unti it finishes
      if (mainApp.modeJs === 'browser') {
        // init testReportDiv element
        mainApp._testReportDiv = document.createElement('div');
        document.body.appendChild(mainApp._testReportDiv);
        // create initial blank test page
        mainApp._testReportDiv.innerHTML =
          mainApp.testMerge(mainApp._testReport, {});
        // update test-report status every 1000 ms until finished
        timerInterval = setInterval(function () {
          // update mainApp._testReportDiv in browser
          mainApp._testReportDiv.innerHTML =
            mainApp.testMerge(mainApp._testReport, {});
          if (mainApp._testReport.testsPending === 0) {
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
        testReport = mainApp._testReport;
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
            coverage: global.__coverage__,
            failed: mainApp._testReport.testsFailed,
            testReport: mainApp._testReport
          };
          if (mainApp.modeTest === 'phantom') {
            setTimeout(function () {
              throw new Error(JSON.stringify({
                global_test_results: global.global_test_results
              }));
            });
          }
          break;
        case 'node':
          // create build badge
          mainApp.fs.writeFileSync(
            process.cwd() + '/.build/build.badge.svg',
            mainApp._fileCacheDict['.build/build.badge.svg'].data
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
          // create test-report.badge.svg
          mainApp.fs.writeFileSync(
            process.cwd() + '/.build/test-report.badge.svg',
            mainApp._fileCacheDict['.build/test-report.badge.svg'].data
              // edit number of tests failed
              .replace((/999/g), testReport.testsFailed)
              // edit badge color
              .replace((/d00/g), testReport.testsFailed ? 'd00' : '0d0')
          );
          // create test-report.html
          mainApp.fs.writeFileSync(
            process.cwd() + '/.build/test-report.html',
            testReportHtml
          );
          // create test-report.json
          mainApp.fs.writeFileSync(
            process.cwd() + '/.build/test-report.json',
            JSON.stringify(mainApp._testReport)
          );
          // if any test failed, then exit with non-zero exit-code
          setTimeout(function () {
            // finalize mainApp._testReport
            mainApp.testMerge(testReport, {});
            process.exit(testReport.testsFailed);
          }, 1000);
          break;
        }
      });
      onParallel.counter += 1;
      // init testReport timer
      mainApp._testReport.timeElapsed = Date.now();
      // init testPlatform
      testPlatform = mainApp._testPlatform;
      // init testPlatform timer
      testPlatform.timeElapsed = Date.now();
      testPlatform.testCaseList.map(function (testCase) {
        // bug - use shallow copy of testPlatform.testCaseList,
        // since the original might get sorted during testing
        return testCase;
      }).forEach(function (testCase) {
        var finished, onError;
        onError = function (error) {
          // coverage - mock console.error for dummy test
          if (testCase.name === 'utility2.' + mainApp.modeJs + '.__testRun_failedTest_test') {
            consoleError = console.error;
            console.error = mainApp.nop;
          }
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
          // coverage - restore console.error and delete errorStack for dummy failed test
          if (testCase.name === 'utility2.' + mainApp.modeJs + '.__testRun_failedTest_test') {
            // test testMerge's failed test handling behavior
            mainApp.testMerge(mainApp._testReport, {});
            console.error = consoleError;
            testCase.errorStack = '';
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
          testCase.callback(onError);
        } catch (errorCaught) {
          onError(errorCaught);
        }
      });
      onParallel();
    },

    __testRun_failedTest_test: function (onError) {
      /*
        this function test _testRun's failed test handling behavior
      */
      // test failed test from callback handling behavior
      onError(mainApp._errorDefault);
      // test failed test from multiple callback handling behavior
      onError();
      // test failed test from thrown error handling behavior
      throw mainApp._errorDefault;
    },

    testTryCatch: function (callback, onError) {
      /*
        this function calls the callback in a try-catch block,
        and passes any caught errors to onError
      */
      try {
        callback();
      } catch (errorCaught) {
        onError(errorCaught);
      }
    },

    textFormat: function (template, dict, undefinedValue) {
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
          return mainApp.textFormat(fragment, dict, undefinedValue);
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
      return template.replace((/\{\{[^{}]+\}\}/g), function (key) {
        value = dict;
        // iteratively lookup nested values in the dict
        key.slice(2, -2).split('.').forEach(function (key) {
          value = value && value[key];
        });
        return value === undefined ? undefinedValue : value;
      });
    },

    _textFormat_default_test: function (onError) {
      /*
        this function tests textFormat's default handling behavior
      */
      var data;
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
    },

    _timeElapsedStop: function (options) {
      /*
        this function stops options.timeElapsed
      */
      if (options.timeElapsed > 0xffffffff) {
        options.timeElapsed = Date.now() - options.timeElapsed;
      }
    }
  };

  localBrowser = {
    _name: 'utility2.browser',

    ajax: function (options, onError) {
      /*
        this functions performs a brower ajax request with error handling and timeout
      */
      var data, error, errorStack, finished, ii, onEvent, timerTimeout, xhr;
      // init stack trace of this function's caller in case of error
      errorStack = new Error().stack;
      // event handling
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
          // validate xhr exists in local._ajaxProgressList
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
      mainApp.debugXhr = xhr;
      // init event handling
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
      }, options.timeout || mainApp._timeoutDefault, 'ajax');
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
    },

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

    // init list of xhr used in ajaxProgress
    _ajaxProgressList: [],

    // init _ajaxProgressState
    _ajaxProgressState: 0,

    _ajaxProgressUpdate: function (width, type, label) {
      /*
        this function visually updates the ajaxProgressBar
      */
      local._ajaxProgressBarDiv.style.width = width;
      local._ajaxProgressBarDiv.className = local._ajaxProgressBarDiv.className
        .replace((/ajaxProgressBarDiv\w+/), type);
      local._ajaxProgressBarDiv.innerHTML = label;
    }
  };

  localNode = {
    _name: 'utility2.node',

    ajax: function (options, onError) {
      /*
        this functions runs a node http request with error handling and timeout
      */
      var finished,
        modeIo,
        onIo,
        request,
        response,
        responseText,
        timerTimeout,
        urlParsed;
      modeIo = 0;
      onIo = function (error, data) {
        modeIo = error instanceof Error ? -1 : modeIo + 1;
        switch (modeIo) {
        case 1:
          // set timerTimeout
          timerTimeout = mainApp.onTimeout(
            onIo,
            options.timeout || mainApp._timeoutDefault,
            'ajax ' + options.url
          );
          // handle implicit localhost
          if (options.url[0] === '/') {
            options.url = 'http://localhost:' + process.env.npm_config_server_port +
              options.url;
          }
          // parse options.url
          urlParsed = mainApp.url.parse(options.url);
          // disable socket pooling
          options.agent = options.agent || false;
          // hostname needed for http.request
          options.hostname = urlParsed.hostname;
          // path needed for http.request
          options.path = urlParsed.path;
          // port needed for http.request
          options.port = urlParsed.port;
          // protocol needed for http.request
          options.protocol = urlParsed.protocol;
          // init headers
          options.headers = options.headers || {};
          // init Content-Length header
          options.headers['Content-Length'] =
            typeof options.data === 'string' ? Buffer.byteLength(options.data)
            : Buffer.isBuffer(options.data) ? options.data.length
              : 0;
          // make http request
          request = (options.protocol === 'https:' ? mainApp.https : mainApp.http)
            .request(options, onIo)
            // handle error event
            .on('error', onIo);
          // send request and/or data
          request.end(options.data);
          break;
        case 2:
          response = error;
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
          // cleanup request socket
          if (request) {
            request.destroy();
          }
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
            onError(error, responseText);
            return;
          }
          onError(null, responseText);
        }
      };
      onIo();
    },

    coverageBadge: function (coverage) {
      /*
        this function creates a coverage-report badge
      */
      var coveragePercent;
      coveragePercent = [0, 0];
      Object.keys(coverage).forEach(function (statementDict) {
        statementDict = coverage[statementDict].s;
        Object.keys(statementDict).forEach(function (key) {
          coveragePercent[0] += statementDict[key] ? 1 : 0;
        });
        coveragePercent[1] += Object.keys(statementDict).length;
      });
      coveragePercent = 100 * coveragePercent[0] / coveragePercent[1];
      mainApp.fs.writeFileSync(
        process.cwd() + '/.build/coverage-report.badge.svg',
        mainApp._fileCacheDict['.build/coverage-report.badge.svg']
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
    },

    _coverageBadge_default_test: function (onError) {
      /*
        this function tests coverageBadge's default handling behavior
      */
      var data;
      mainApp.coverageBadge({ file1: { s: { 1: 0, 2: 1 } } });
      data = mainApp.fs.readFileSync(
        process.cwd() + '/.build/coverage-report.badge.svg',
        'utf8'
      );
      mainApp.assert(data === '<svg xmlns="http://www.w3.org/2000/svg" width="117" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="3" width="117" height="20" fill="#555"/><rect rx="3" x="63" width="54" height="20" fill="#6f6f00"/><path fill="#6f6f00" d="M63 0h4v20h-4z"/><rect rx="3" width="117" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="32.5" y="15" fill="#010101" fill-opacity=".3">coverage</text><text x="32.5" y="14">coverage</text><text x="89" y="15" fill="#010101" fill-opacity=".3">50.0%</text><text x="89" y="14">50.0%</text></g></svg>', data);
      onError();
    },

    _coverageInstrument: function (script, file) {
      /*
        this function instruments the given script and file
      */
      var istanbul;
      istanbul = require('istanbul');
      return new istanbul.Instrumenter().instrumentSync(script, file);
    },

    _coverageMerge_default_test: function (onError) {
      /*
        this function tests coverageMerge's default handling behavior
      */
      var coverage1, coverage2, script;
      script = local._coverageInstrument(
        '(function () {\nreturn arg ? __coverage__ : __coverage__;\n}());',
        'test'
      );
      local.arg = 0;
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
    },

    fileCacheAndParse: function (options) {
      /*
        this function parses options.file and caches it to mainApp._fileCacheDict
      */
      var tmp;
      // read options.data from options.file
      options.data = mainApp.fs.readFileSync(options.file, 'utf8')
        // comment out shebang
        .replace((/^#!/), '//#!');
      // cache options to mainApp._fileCacheDict[options.cache]
      if (options.cache) {
        mainApp._fileCacheDict[options.cache] = options;
      }
      // parse options.data's embedded sub-files
      if (options.parse) {
        options.data.replace(
          (/^\/\* FILE_BEGIN ([\S\s]+?) \*\/$([\S\s]+?)^\/\* FILE_END \*\/$/gm),
          function (match0, options2, data, ii) {
            // nop hack to pass jslint
            mainApp.nop(match0);
            // preserve lineno
            tmp = options.data.slice(0, ii).replace((/.*/g), '') +
              options2.replace((/.*/g), '');
            options2 = JSON.parse(options2);
            // cache options2 to mainApp._fileCacheDict[options2.file]
            mainApp._fileCacheDict[options2.file] = options2;
            // cache data to option2.data and preserve lineno
            options2.data = tmp + data;
            // run each action in options2.actionList
            options2.actionList.forEach(function (action) {
              switch (action) {
              // export options2.data to mainApp._mainAppBrowser._fileCacheDict
              case 'exportBrowser':
                mainApp._mainAppBrowser._fileCacheDict[options2.file] = options2;
                break;
              // lint options2.data
              case 'lint':
                mainApp.jslint_lite.jslintPrint(options2.data, options2.file);
                break;
              }
            });
            // auto-trim data
            options2.data = options2.data.trim();
          }
        );
      }
      // if coverage-mode is enabled, then cover options.data
      if (local.__coverage__ &&
          options.coverage &&
          options.coverage === mainApp._envDict.PACKAGE_JSON_NAME) {
        options.data = local._coverageInstrument(options.data, options.file);
      }
    },

    githubFilePut: function (url, file, sha) {
      /*
        this function puts the local file1 to the remote github file2
      */
      var modeIo, onIo, options, urlParsed;
      modeIo = 0;
      onIo = function (error, data) {
        // nop hack to pass jslint
        mainApp.nop(error);
        modeIo += 1;
        switch (modeIo) {
        case 1:
          urlParsed = (/github.com\/([^\/]+\/[^\/]+)\/blob\/([^\/]+)\/(.+)/).exec(url);
          options = {
            headers: {
              // github basic authentication
              authorization: process.env.GITHUB_BASIC ? 'basic ' + process.env.GITHUB_BASIC
                // github oauth authentication
                : 'token ' + process.env.GITHUB_TOKEN,
              // bug - github api requires user-agent header
              'user-agent': 'undefined'
            },
            url: 'https://api.github.com/repos/' + urlParsed[1] + '/contents/' +
              urlParsed[3]
          };
          // update-file-mode - get sha of file to be overwritten
          if (sha === undefined) {
            options.url += '?ref=' + urlParsed[2];
          // create / update file-mode
          } else {
            options.data = JSON.stringify({
              branch: urlParsed[2],
              content: mainApp.fs.readFileSync(file).toString('base64'),
              message: '[skip ci] update file ' + url,
              // update-file-mode - update old file specified by the sha
              sha: sha ||
                // create-file-mode - create new file
                undefined
            });
            options.method = 'PUT';
            onIo = mainApp.onErrorDefault;
          }
          mainApp.ajax(options, onIo);
          break;
        case 2:
          try {
            sha = JSON.parse(data).sha;
          } catch (ignore) {
          }
          mainApp.githubFilePut(url, file, sha || null);
          break;
        }
      };
      onIo();
    },

    replStart: function (globalDict) {
      /*
        this function inits the repl debugger
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
            match[2] = ' git log -n 8 | cat';
            break;
          }
          // run async shell command
          mainApp.child_process.spawn(
            '/bin/bash',
            ['-c', match[2]],
            { stdio: process.env.npm_config_mode_npm_test ? 'ignore' : ['ignore', 1, 2] }
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
    },

    _replStart_default_test: function (onError) {
      /*
        this function test replStart's default handling behavior
      */
      var evil;
      // evil hack to pass jslint
      evil = 'eval';
      [
        // test shell handling behavior
        '($ :\n)',
        // test git diff handling behavior
        '($ git diff\n)',
        // test git log handling behavior
        '($ git log\n)',
        // test print handling behavior
        '(print\n)'
      ].forEach(function (script) {
        local._replServer[evil](script, null, 'repl', mainApp.nop);
      });
      // test syntax error handling behavior
      local._replServer[evil]('syntax error', null, 'repl', function (error) {
        mainApp.testTryCatch(function () {
          // validate error occurred
          // bug - use util.isError to validate error when using eval
          mainApp.assert(require('util').isError(error), error);
          onError();
        }, onError);
      });
    },

    serverRespondDefault: function (request, response, statusCode, error) {
      /*
        this function responds with a default message,
        or error stack for the given statusCode
      */
      // set response / statusCode / contentType
      mainApp.serverRespondWriteHead(request, response, statusCode, {
        'Content-Type': 'text/plain; charset=utf-8'
      });
      if (error) {
        // if modeErrorIgnore is disabled in url search params,
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
    },

    serverRespondEcho: function (request, response) {
      /*
        this function responds with debug info
      */
      response.write(request.method + ' ' + request.url +
        ' HTTP/' + request.httpVersion + '\r\n' +
        Object.keys(request.headers).map(function (key) {
          return key + ': ' + request.headers[key] + '\r\n';
        }).join('') + '\r\n');
      request.pipe(response);
    },

    serverRespondWriteHead: function (_, response, statusCode, headers) {
      /*
        this function sets the response object's statusCode / headers
      */
      // nop hack to pass jslint
      mainApp.nop(_);
      if (!response.headersSent) {
        // set response.statusCode
        if (statusCode) {
          response.statusCode = statusCode;
        }
        Object.keys(headers).forEach(function (key) {
          // validate header is non-empty string
          mainApp.assert(
            headers[key] && typeof headers[key] === 'string',
            'invalid response header ' + key
          );
          response.setHeader(key, headers[key]);
        });
      }
    },

    streamReadAll: function (readableStream, onError) {
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
    },

    testPhantom: function (url, onError) {
      /*
        this function spawns a phantomjs process to test a webpage
      */
      var onParallel;
      onParallel = mainApp.onParallel(onError);
      onParallel.counter += 1;
      ['phantomjs', 'slimerjs'].forEach(function (argv0) {
        var file, onError2, timerTimeout;
        // if slimerjs is not available, then do not use it
        if (argv0 === 'slimerjs' && !process.env.npm_config_mode_slimerjs) {
          return;
        }
        argv0 = process.env.MODE_CI_BUILD + '.' + argv0;
        onParallel.counter += 1;
        onError2 = function (error) {
          // cleanup timerTimeout
          clearTimeout(timerTimeout);
          onParallel(error);
        };
        // set timerTimeout
        timerTimeout = mainApp.onTimeout(onError2, mainApp._timeoutDefault, argv0);
        file = __dirname + '/index.js';
        // cover index.js
        if (local.__coverage__ && 'utility2' === mainApp._envDict.PACKAGE_JSON_NAME) {
          file = mainApp.os.tmpdir() + '/' + Date.now() + Math.random() + '.js';
          mainApp.fs.writeFileSync(
            file,
            mainApp._fileCacheDict['/assets/utility2.js'].data
          );
        }
        // spawn a phantomjs process to test a webpage
        mainApp.child_process.spawn(argv0.split('.')[1], [file, encodeURIComponent(
          JSON.stringify({
            argv0: argv0,
            __dirname: __dirname,
            _timeoutDefault: mainApp._timeoutDefault,
            url: url
          })
        )], { stdio: 'inherit' })
          .on('exit', function (exitCode) {
            // merge coverage code
            if (local.__coverage__) {
              mainApp.coverageMerge(
                local.__coverage__,
                JSON.parse(mainApp.fs.readFileSync(
                  process.cwd() +
                    '/.build/coverage-report.html/coverage.' + argv0 + '.json',
                  'utf8'
                ))
              );
            }
            // merge tests
            mainApp.testMerge(
              mainApp._testReport,
              JSON.parse(mainApp.fs.readFileSync(
                process.cwd() + '/.build/test-report.' + argv0 + '.json',
                'utf8'
              ))
            );
            onError2(exitCode && new Error(argv0 + ' exit ' + exitCode));
          });
      });
      onParallel();
    }
  };

  localPhantom = {
    _name: 'utility2.phantom'
  };

  (function initModule() {
    /*
      this function inits this module
    */
    // init global object
    global = $$options.global;
    switch ($$options.modeJs) {
    // init browser js env
    case 'browser':
      // init local object
      Object.keys(localBrowser).forEach(function (key) {
        local[key] = localBrowser[key];
      });
      // init mainApp
      mainApp = global.$$mainApp = global.$$mainApp || {};
      mainApp._envDict = mainApp._envDict || {};
      mainApp.modeJs = 'browser';
      break;
    // init node js env
    case 'node':
      // init local object
      Object.keys(localNode).forEach(function (key) {
        local[key] = localNode[key];
      });
      // init mainApp
      mainApp = module.exports;
      mainApp._envDict = process.env;
      mainApp.modeJs = 'node';
      break;
    // init phantom js env
    case 'phantom':
      // init local object
      Object.keys(localPhantom).forEach(function (key) {
        local[key] = localPhantom[key];
      });
      // init mainApp
      mainApp = {};
      mainApp._envDict = require('system').env;
      mainApp.modeJs = 'phantom';
      break;
    }
    // init _debug_print
    global[['debug', 'Print'].join('')] = local._debug_print;
    // export local object
    Object.keys(local).forEach(function (key) {
      // export items that don't start with an underscore _
      if (key[0] !== '_') {
        mainApp[key] = local[key];
      }
    });
    // init main test-platform
    mainApp._testPlatform = {
      // list of test-cases and their test-results
      testCaseList: []
    };
    // init main test-platform's name
    switch (mainApp.modeJs) {
    case 'browser':
      mainApp._testPlatform.name = 'browser - ' + navigator.userAgent;
      break;
    case 'node':
      mainApp._testPlatform.name = 'node - ' + process.platform + ' ' + process.version;
      break;
    case 'phantom':
      mainApp._testPlatform.name = 'phantom - ' + require('system').name + ' ' +
        phantom.version.major + '.' +
        phantom.version.minor + '.' +
        phantom.version.patch;
      break;
    }
    // init mainApp with default values
    mainApp.setDefault(mainApp, -1, {
      // init default error
      _errorDefault: new Error('default error'),
      // init cached dict of files
      _fileCacheDict: {},
      // init main test-report
      _testReport: { testPlatformList: [mainApp._testPlatform] },
      // init ascii character reference
      _textExampleAscii: '\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f' +
        '\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f' +
        ' !"#$%&\'()*+,-./0123456789:;<=>?' +
        '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_' +
        '`abcdefghijklmnopqrstuvwxyz{|}~\x7f',
      // init default timeout for ajax requests and other async io
      _timeoutDefault: 30000
    });
    // init local object
    mainApp.localExport(local, mainApp);
    switch (mainApp.modeJs) {
    // init module in browser js env
    case 'browser':
      // parse any query-param that matches 'mode*' or 'timeoutDefault'
      location.search.replace(
        (/\b(mode[A-Z]\w+|timeoutDefault)=([^&=]+)/g),
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
      // init _ajaxProgressBarDiv element
      local._ajaxProgressBarDiv = document.getElementsByClassName('ajaxProgressBarDiv')[0];
      // init _ajaxProgressDiv element
      local._ajaxProgressDiv = document.getElementsByClassName('ajaxProgressDiv')[0];
      mainApp.setDefault(local, -1, {
        // init fallback _ajaxProgressBarDiv element
        _ajaxProgressBarDiv: { className: '', style: {} },
        // init fallback _ajaxProgressDiv element
        _ajaxProgressDiv: { style: {} }
      });
      break;
    // init module in node js env
    case 'node':
      // require modules
      mainApp.child_process = require('child_process');
      mainApp.fs = require('fs');
      mainApp.http = require('http');
      mainApp.https = require('https');
      mainApp.jslint_lite = require('jslint-lite');
      mainApp.os = require('os');
      mainApp.path = require('path');
      mainApp.url = require('url');
      mainApp.vm = require('vm');
      // if global coverage object exists, then export it to local.__coverage__
      Object.keys(global).forEach(function (key) {
        if (key.indexOf('$$cov_') === 0) {
          local.__coverage__ = global[key];
        }
      });
      // init mainApp with default values
      mainApp.setDefault(mainApp, -1, {
        // export __dirname
        __dirname: __dirname,
        // init state file used for browser init
        _mainAppBrowser: {
          _envDict: {
            PACKAGE_JSON_DESCRIPTION: mainApp._envDict.PACKAGE_JSON_DESCRIPTION,
            PACKAGE_JSON_NAME: mainApp._envDict.PACKAGE_JSON_NAME,
            PACKAGE_JSON_VERSION: mainApp._envDict.PACKAGE_JSON_VERSION
          },
          _fileCacheDict: {}
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
      break;
    // init module in phantom js env
    case 'phantom':
      // require modules
      mainApp.fs = require('fs');
      mainApp.system = require('system');
      mainApp.webpage = require('webpage');
      // phantom error handling - http://phantomjs.org/api/phantom/handler/on-error.html
      phantom.onError = function (msg, trace) {
        var msgStack = [mainApp.argv0 + ' ERROR: ' + msg];
        if (trace && trace.length) {
          msgStack.push(mainApp.argv0 + ' TRACE:');
          trace.forEach(function (t) {
            msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line
              + (t.function ? ' (in function ' + t.function + ')' : ''));
          });
        }
        console.error('\n\n\n\n' + msgStack.join('\n') + '\n');
        // non-zero exit-code
        phantom.exit(1);
      };
      // init mainApp
      mainApp.setOverride(
        mainApp,
        -1,
        JSON.parse(decodeURIComponent(mainApp.system.args[1]))
      );
      // set timeout for phantom
      setTimeout(function () {
        throw new Error(mainApp.argv0 + ' - timeout ' + mainApp.url);
      }, Number(mainApp._timeoutDefault) || 30000);
      // init page
      mainApp.page = mainApp.webpage.create();
      // init browser view size
      mainApp.page.viewportSize = { height: 600, width: 800 };
      // init page error handling
      // http://phantomjs.org/api/webpage/handler/on-error.html
      mainApp.page.onError = function (msg, trace) {
        var data, file;
        data = (/^Error: (\{"global_test_results":\{.+)/).exec(msg);
        data = data && JSON.parse(data[1]).global_test_results;
        if (data) {
          // merge coverage
          global.__coverage__ = global.__coverage__ || {};
          mainApp.coverageMerge(global.__coverage__, data.coverage || {});
          // create screenshot
          file = mainApp.fs.workingDirectory +
            '/.build/test-report.screenshot.' + mainApp.argv0 + '.png';
          mainApp.page.render(file);
          console.log('created ' + 'file://' + file);
          // integrate screenshot into test-report
          data.testReport.testPlatformList[0].screenshotImg =
            'test-report.screenshot.' + mainApp.argv0 + '.png';
          [[
            '.build/test-report.' + mainApp.argv0 + '.json',
            mainApp.jsonCopy(data.testReport)
          ], [
            '.build/coverage-report.html/coverage.' + mainApp.argv0 + '.json',
            global.__coverage__
          ]].forEach(function (args) {
            file = mainApp.fs.workingDirectory + '/' + args[0];
            mainApp.fs.write(file, JSON.stringify(args[1]));
            console.log('created ' + 'file://' + file);
          });
          // exit-code based on number of tests failed
          phantom.exit(data.testReport.testsFailed);
          return;
        }
        phantom.onError(msg, trace);
      };
      // pipe page's console.log to stdout
      mainApp.page.onConsoleMessage = function () {
        console.log.apply(console, arguments);
      };
      // open requested webpage
      mainApp.page.open(mainApp.url, function (data) {
        console.log(mainApp.argv0 + ' - open ' + data + ' ' + mainApp.url);
        // validate page opened successfully
        mainApp.assert(data === 'success', data);
      });
      break;
    }
  }());
}((function initOptions() {
  /*
    this function passes js env options to the calling function
  */
  'use strict';
  try {
    // init phantom js env
    return {
      global: window,
      modeJs: typeof phantom.version === 'object' &&
        typeof require('webpage').create === 'function' && 'phantom'
    };
  } catch (errorCaughtPhantom) {
    try {
      // init node js env
      return {
        global: global,
        modeJs: module.exports && typeof process.versions.node === 'string' &&
          typeof require('child_process').spawn === 'function' && 'node'
      };
    } catch (errorCaughtNode) {
      // init browser js env
      return {
        global: window,
        modeJs: typeof navigator.userAgent === 'string' &&
          typeof document.body.querySelector('div') === 'object' && 'browser'
      };
    }
  }
}())));
