/*jslint
  bitwise: true, browser: true,
  indent: 2,
  maxerr: 8,
  node: true, nomen: true,
  regexp: true,
  stupid: true
*/
(function (exports) {
  'use strict';



  (function () {
    /*
      this function will run shared js-env code
    */
    exports._ajax_default_test = function (onError) {
      /*
        this function will test ajax's default handling behavior
      */
      var onParallel;
      onParallel = exports.onParallel(onError);
      onParallel.counter += 1;
      // test http GET handling behavior
      onParallel.counter += 1;
      exports.ajax({ url: '/test/hello' }, function (error, data) {
        exports.testTryCatch(function () {
          // validate no error occurred
          exports.assert(!error, error);
          // validate data
          exports.assert(data === 'hello', data);
          onParallel();
        }, onParallel);
      });
      // test http POST handling behavior
      ['binary', 'text'].forEach(function (resultType) {
        onParallel.counter += 1;
        exports.ajax({
          // test binary post handling behavior
          data: resultType === 'binary' && exports.modeJs === 'node' ? new Buffer('hello')
            // test text post handling behavior
            : 'hello',
          // test request header handling behavior
          headers: { 'X-Header-Hello': 'Hello' },
          method: 'POST',
          resultType: resultType,
          url: '/test/echo'
        }, function (error, data) {
          exports.testTryCatch(function () {
            // validate no error occurred
            exports.assert(!error, error);
            // validate binary data
            if (resultType === 'binary' && exports.modeJs === 'node') {
              exports.assert(Buffer.isBuffer(data), data);
              data = String(data);
            }
            // validate text data
            exports.assert(data.indexOf('hello') >= 0, data);
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
        exports.ajax(options, function (error) {
          exports.testTryCatch(function () {
            // validate error occurred
            exports.assert(error instanceof Error, error);
            onParallel();
          }, onParallel);
        });
      });
      onParallel();
    };

    exports.coverageMerge = function (coverage1, coverage2) {
      /*
        this function will merge coverage2 into coverage1
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

    exports.assert = function (passed, message) {
      /*
        this function will throw an error if the assertion fails
      */
      if (!passed) {
        throw new Error(
          // if message is a string, then leave it as is
          typeof message === 'string' ? message
            // if message is an Error object, then get its stack-trace
            : message instanceof Error ? exports.errorStack(message)
              // else JSON.stringify message
              : JSON.stringify(message)
        );
      }
    };

    exports._assert_default_test = function (onError) {
      /*
        this function will test assert's default handling behavior
      */
      // test assertion passed
      exports.assert(true, true);
      // test assertion failed with undefined message
      exports.testTryCatch(function () {
        exports.assert(false);
      }, function (error) {
        // validate error occurred
        exports.assert(error instanceof Error, error);
        // validate error-message
        exports.assert(error.message === '', error.message);
      });
      // test assertion failed with text message
      exports.testTryCatch(function () {
        exports.assert(false, '_assert_default_test');
      }, function (error) {
        // validate error occurred
        exports.assert(error instanceof Error, error);
        // validate error-message
        exports.assert(error.message === '_assert_default_test', error.message);
      });
      // test assertion failed with error object
      exports.testTryCatch(function () {
        exports.assert(false, exports.errorDefault);
      }, function (error) {
        // validate error occurred
        exports.assert(error instanceof Error, error);
      });
      // test assertion failed with json object
      exports.testTryCatch(function () {
        exports.assert(false, { aa: 1 });
      }, function (error) {
        // validate error occurred
        exports.assert(error instanceof Error, error);
        // validate error-message
        exports.assert(error.message === '{"aa":1}', error.message);
      });
      onError();
    };

    exports.errorStack = function (error) {
      /*
        this function will return the error's stack-trace
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

    exports.jsonCopy = function (value) {
      /*
        this function will return a deep-copy of the JSON value
      */
      return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
    };

    exports._jsonCopy_default_test = function (onError) {
      /*
        this function will test jsonCopy's default handling behavior
      */
      // test various data-type handling behavior
      [undefined, null, false, true, 0, 1, 1.5, 'a'].forEach(function (data) {
        exports.assert(exports.jsonCopy(data) === data, [exports.jsonCopy(data), data]);
      });
      onError();
    };

    exports.jsonStringifyOrdered = function (value, replacer, space) {
      /*
        this function will JSON.stringify the value with dictionaries in sorted order,
        and is used in tests
      */
      var stringifyOrdered;
      stringifyOrdered = function (value) {
        /*
          this function will recursively stringify the value, sorting object keys along the way
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

    exports._jsonStringifyOrdered_default_test = function (onError) {
      /*
        this function will test jsonStringifyOrdered's default handling behavior
      */
      var data;
      // test various data-type handling behavior
      [undefined, null, false, true, 0, 1, 1.5, 'a', {}, []].forEach(function (data) {
        exports.assert(
          exports.jsonStringifyOrdered(data) === JSON.stringify(data),
          [exports.jsonStringifyOrdered(data), JSON.stringify(data)]
        );
      });
      // test data-ordering handling behavior
      data = exports.jsonStringifyOrdered({
        // test nested dict handling behavior
        ee: { gg: 2, ff: 1},
        // test array handling behavior
        dd: [undefined],
        cc: exports.nop,
        bb: 2,
        aa: 1
      });
      exports.assert(data === '{"aa":1,"bb":2,"dd":[null],"ee":{"ff":1,"gg":2}}', data);
      onError();
    };

    exports.onErrorDefault = function (error) {
      /*
        this function will provide a default error handling callback,
        which simply prints the error stack or message to stderr
      */
      // if error is defined, then print the error stack
      if (error) {
        console.error('\nonErrorDefault - error\n' + exports.errorStack(error) + '\n');
      }
    };

    exports._onErrorDefault_default_test = function (onError) {
      /*
        this function will test onErrorDefault's default handling behavior
      */
      var message;
      exports.testMock([
        // suppress console.error
        [console, { error: function (arg) {
          message = arg;
        } }]
      ], onError, function (onError) {
        // test no error handling behavior
        exports.onErrorDefault();
        // validate message
        exports.assert(!message, message);
        // test error handling behavior
        exports.onErrorDefault(exports.errorDefault);
        // validate message
        exports.assert(message, message);
        onError();
      });
    };

    exports.onParallel = function (onError, onDebug) {
      /*
        this function will return another function that runs async tasks in parallel,
        and calls onError only if there's an error, or if its counter === 0
      */
      var errorStack, self;
      errorStack = exports.errorStack();
      onDebug = onDebug || exports.nop;
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
          error.stack = exports.errorStack(error) + '\n' + errorStack;
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

    exports._onParallel_default_test = function (onError) {
      /*
        this function will test onParallel's default handling behavior
      */
      var onParallel, onParallelError;
      // test onDebug handling behavior
      onParallel = exports.onParallel(onError, function (error, self) {
        exports.testTryCatch(function () {
          // validate no error occurred
          exports.assert(!error, error);
          // validate self
          exports.assert(self.counter >= 0, self);
        }, onError);
      });
      onParallel.counter += 1;
      onParallel.counter += 1;
      setTimeout(function () {
        onParallelError = exports.onParallel(function (error) {
          exports.testTryCatch(function () {
            // validate error occurred
            exports.assert(error instanceof Error, error);
            onParallel();
          }, onParallel);
        });
        onParallelError.counter += 1;
        // test error handling behavior
        onParallelError.counter += 1;
        onParallelError(exports.errorDefault);
        // test ignore-after-error handling behavior
        onParallelError();
      });
      // test default handling behavior
      onParallel();
    };

    exports.onTimeout = function (onError, timeout, message) {
      /*
        this function will create a timer that passes a timeout error to onError,
        when the specified timeout has passed
      */
      var error;
      // validate timeout is an integer in the exclusive range 0 to Infinity
      exports.assert(
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

    exports._onTimeout_timeout_test = function (onError) {
      /*
        this function will test onTimeout's timeout handling behavior
      */
      var timeElapsed;
      timeElapsed = Date.now();
      exports.onTimeout(function (error) {
        exports.testTryCatch(function () {
          // validate error occurred
          exports.assert(error instanceof Error);
          // save timeElapsed
          timeElapsed = Date.now() - timeElapsed;
          // validate timeElapsed passed is greater than timeout
          // bug - ie might timeout slightly earlier,
          // so increase timeElapsed by a small amount
          exports.assert(timeElapsed + 100 >= 1000, timeElapsed);
          onError();
        }, onError);
      // coverage - use 1500 ms to cover setInterval test-report refreshes in browser
      }, 1500, '_onTimeout_errorTimeout_test');
    };

    exports.setDefault = function (options, depth, defaults) {
      /*
        this function will recursively set default values
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
          exports.setDefault(options2, depth, defaults2);
        }
      });
      return options;
    };

    exports._setDefault_default_test = function (onError) {
      /*
        this function will test setDefault's default handling behavior
      */
      var options;
      // test non-recursive handling behavior
      options = exports.setDefault(
        { aa: 1, bb: {}, cc: [] },
        1,
        { aa: 2, bb: { cc: 2 }, cc: [1, 2] }
      );
      // validate options
      exports.assert(
        exports.jsonStringifyOrdered(options) === '{"aa":1,"bb":{},"cc":[]}',
        options
      );
      // test recursive handling behavior
      options = exports.setDefault(
        { aa: 1, bb: {}, cc: [] },
        -1,
        { aa: 2, bb: { cc: 2 }, cc: [1, 2] }
      );
      // validate options
      exports.assert(
        exports.jsonStringifyOrdered(options) === '{"aa":1,"bb":{"cc":2},"cc":[]}',
        options
      );
      onError();
    };

    exports.setOverride = function (options, depth, override, backup) {
      /*
        this function will recursively override the options object with the override object,
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
          // if options is envDict, then override falsey values with empty string
          options[key] = options === exports.envDict ? override2 || '' : override2;
          return;
        }
        // 3. recurse options[key] and override[key]
        exports.setOverride(options2, depth, override2, override2, backup);
      });
      return options;
    };

    exports._setOverride_default_test = function (onError) {
      /*
        this function will test setOverride's default handling behavior
      */
      var backup, data, options;
      backup = {};
      // test override handling behavior
      options = exports.setOverride(
        { aa: 1, bb: { cc: 2 }, dd: [3, 4], ee: { ff: { gg: 5, hh: 6 } } },
        // test depth handling behavior
        2,
        { aa: 2, bb: { dd: 3 }, dd: [4, 5], ee: { ff: { gg: 6 } } },
        // test backup handling behavior
        backup
      );
      // validate backup
      data = exports.jsonStringifyOrdered(backup);
      exports.assert(data ===
        '{"aa":1,"bb":{},"dd":[3,4],"ee":{"ff":{"gg":5,"hh":6}}}', data);
      // validate options
      data = exports.jsonStringifyOrdered(options);
      exports.assert(data ===
        '{"aa":2,"bb":{"cc":2,"dd":3},"dd":[4,5],"ee":{"ff":{"gg":6}}}', data);
      // test restore options from backup handling behavior
      exports.setOverride(options, -1, backup);
      // validate backup
      data = exports.jsonStringifyOrdered(backup);
      exports.assert(data ===
        '{"aa":1,"bb":{"dd":3},"dd":[3,4],"ee":{"ff":{"gg":6}}}', data);
      // validate options
      data = exports.jsonStringifyOrdered(options);
      exports.assert(data ===
        '{"aa":1,"bb":{"cc":2},"dd":[3,4],"ee":{"ff":{"gg":5,"hh":6}}}', data);
      onError();
    };

    exports.testMock = function (mockList, onError, testCase) {
      /*
        this function will mock the exports given in the mockList while running the testCase
      */
      var callCallback, onError2;
      callCallback = function (callback) {
        /*
          this function will call the callback
        */
        callback();
        // return a mock timer object with the unref method
        return { unref: exports.nop };
      };
      // prepend mandatory mocks for async / unsafe functions
      mockList = [
        // suppress console.log
        [console, { log: exports.nop }],
        // enforce synchronicity by mocking timers as callCallback
        [exports.global, { setInterval: callCallback, setTimeout: callCallback }],
        [exports.global.process || {}, { exit: exports.nop }]
      ].concat(mockList);
      onError2 = function (error) {
        // restore mock[0] from mock[2]
        mockList.reverse().forEach(function (mock) {
          exports.setOverride(mock[0], 1, mock[2], null);
        });
        onError(error);
      };
      // run onError callback in mocked exports in a try-catch block
      exports.testTryCatch(function () {
        // mock exports
        mockList.forEach(function (mock) {
          mock[2] = {};
          // backup mock[0] into mock[2]
          // override mock[0] with mock[1]
          exports.setOverride(mock[0], 1, mock[1], mock[2]);
        });
        // run testCase
        testCase(onError2);
      }, onError2);
    };

    exports.testMerge = function (testReport1, testReport2) {
      /*
        this function will
        1. merge testReport2 into testReport1
        2. return testReport1 in html-format
      */
      var errorStackList, testCaseNumber, testReport;
      // 1. merge testReport2 into testReport1
      [testReport1, testReport2].forEach(function (testReport, ii) {
        ii += 1;
        exports.setDefault(testReport, -1, {
          date: new Date().toISOString(),
          errorStackList: [],
          testPlatformList: [],
          timeElapsed: 0
        });
        // security - handle malformed testReport
        exports.assert(
          testReport && typeof testReport === 'object',
          ii + ' invalid testReport ' + typeof testReport
        );
        exports.assert(
          typeof testReport.timeElapsed === 'number',
          ii + ' invalid testReport.timeElapsed ' + typeof testReport.timeElapsed
        );
        // security - handle malformed testReport.testPlatformList
        testReport.testPlatformList.forEach(function (testPlatform) {
          exports.setDefault(testPlatform, -1, {
            name: 'undefined',
            testCaseList: [],
            timeElapsed: 0
          });
          exports.assert(
            typeof testPlatform.name === 'string',
            ii + ' invalid testPlatform.name ' + typeof testPlatform.name
          );
          // insert $MODE_BUILD into testPlatform.name
          if (exports.envDict.MODE_BUILD) {
            testPlatform.name = testPlatform.name.replace(
              (/^(browser|node|phantom|slimer)\b/),
              exports.envDict.MODE_BUILD + ' - $1'
            );
          }
          exports.assert(
            typeof testPlatform.timeElapsed === 'number',
            ii + ' invalid testPlatform.timeElapsed ' + typeof testPlatform.timeElapsed
          );
          // security - handle malformed testReport.testPlatformList.testCaseList
          testPlatform.testCaseList.forEach(function (testCase) {
            exports.setDefault(testCase, -1, {
              errorStack: '',
              name: 'undefined',
              timeElapsed: 0
            });
            exports.assert(
              typeof testCase.errorStack === 'string',
              ii + ' invalid testCase.errorStack ' + typeof testCase.errorStack
            );
            exports.assert(
              typeof testCase.name === 'string',
              ii + ' invalid testCase.name ' + typeof testCase.name
            );
            exports.assert(
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
        exports._timeElapsedStop(testReport);
      }
      // 2. return testReport1 in html-format
      // json-copy testReport, which will be modified for html templating
      testReport = exports.jsonCopy(testReport1);
      // update timeElapsed
      exports._timeElapsedStop(testReport);
      testReport.testPlatformList.forEach(function (testPlatform) {
        exports._timeElapsedStop(testPlatform);
        testPlatform.testCaseList.forEach(function (testCase) {
          exports._timeElapsedStop(testCase);
          testPlatform.timeElapsed =
            Math.max(testPlatform.timeElapsed, testCase.timeElapsed);
        });
        // update testReport.timeElapsed with testPlatform.timeElapsed
        testReport.timeElapsed = Math.max(testReport.timeElapsed, testPlatform.timeElapsed);
      });
      // create html test-report
      testCaseNumber = 0;
      return exports.textFormat(
        exports.fileCacheDict['/test/test-report.html.template'].data,
        exports.setOverride(testReport, -1, {
          // security - sanitize '<' in text
          CI_COMMIT_INFO: String(exports.envDict.CI_COMMIT_INFO).replace((/</g), '&lt;'),
          envDict: exports.envDict,
          // map testPlatformList
          testPlatformList: testReport.testPlatformList.filter(function (testPlatform) {
            // if testPlatform has no tests, then filter it out
            return testPlatform.testCaseList.length;
          }).map(function (testPlatform, ii) {
            errorStackList = [];
            return exports.setOverride(testPlatform, -1, {
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
                return exports.setOverride(testCase, -1, {
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

    exports.testRun = function (options, onTestRunEnd) {
      /*
        this function will run the test-cases in exports.testPlatform.testCaseList
      */
      var onParallel, testPlatform, timerInterval;
      exports.modeTest = exports.modeTest || exports.envDict.npm_config_mode_npm_test;
      if (!exports.modeTest) {
        return;
      }
      // init modeTestCase
      exports.modeTestCase = exports.modeTestCase || exports.envDict.npm_config_mode_test_case;
      // reset testPlatform.testCaseList
      exports.testPlatform.testCaseList.length = 0;
      // add test-cases into testPlatform.testCaseList
      Object.keys(options).forEach(function (key) {
        // add test-case options[key] to testPlatform.testCaseList
        if (key.slice(-5) === '_test' &&
            (exports.modeTestCase === key ||
              (!exports.modeTestCase && key !== '_testRun_failure_test'))) {
          exports.testPlatform.testCaseList.push({
            name: key,
            onTestCase: options[key]
          });
        }
      });
      // if in browser mode, visually refresh test progress until it finishes
      if (exports.modeJs === 'browser') {
        // init _testReportDiv element
        exports._testReportDiv = document.querySelector('.testReportDiv') || {};
        exports._testReportDiv.innerHTML = exports.testMerge(exports.testReport, {});
        document.body.appendChild(exports._testReportDiv);
        // update test-report status every 1000 ms until finished
        timerInterval = setInterval(function () {
          // update _testReportDiv in browser
          exports._testReportDiv.innerHTML =
            exports.testMerge(exports.testReport, {});
          if (exports.testReport.testsPending === 0) {
            // cleanup timerInterval
            clearInterval(timerInterval);
          }
        }, 1000);
      }
      onParallel = exports.onParallel(function () {
        /*
          this function create the test-report after all tests have finished
        */
        var separator, testReport, testReportHtml;
        // init new-line separator
        separator = new Array(56).join('-');
        // init testReport
        testReport = exports.testReport;
        // stop testPlatform timer
        exports._timeElapsedStop(testPlatform);
        // create testReportHtml
        testReportHtml = exports.testMerge(testReport, {});
        // print test-report summary
        console.log('\n' + separator + '\n' +
          testReport.testPlatformList.map(function (testPlatform) {
            return '| test-report - ' + testPlatform.name + '\n|' +
              ('        ' + testPlatform.timeElapsed + ' ms     ').slice(-16) +
              ('        ' + testPlatform.testsFailed + ' failed ').slice(-16) +
              ('        ' + testPlatform.testsPassed + ' passed ').slice(-16) +
              '     |\n' + separator;
          }).join('\n') + '\n');
        switch (exports.modeJs) {
        case 'browser':
          // notify saucelabs of test results
          // https://docs.saucelabs.com/reference/rest-api/#js-unit-testing
          exports.global.global_test_results = {
            coverage: exports.__coverage__,
            failed: exports.testReport.testsFailed,
            testReport: exports.testReport
          };
          setTimeout(function () {
            // call callback with number of tests failed
            onTestRunEnd(exports.testReport.testsFailed);
            // throw global_test_results as an error,
            // so it can be caught and passed to the phantom js-env
            if (exports.modeTest === 'phantom') {
              throw new Error(JSON.stringify({
                global_test_results: exports.global.global_test_results
              }));
            }
          }, 1000);
          break;
        case 'node':
          // create build badge
          exports.fs.writeFileSync(
            process.cwd() + '/.tmp/build/build.badge.svg',
            exports.fileCacheDict['.tmp/build/build.badge.svg'].data
              // edit branch name
              .replace(
                (/0000 00 00 00 00 00/g),
                new Date().toISOString().slice(0, 19).replace('T', ' ')
              )
              // edit branch name
              .replace((/- master -/g), '| ' + exports.envDict.CI_BRANCH + ' |')
              // edit commit id
              .replace(
                (/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/g),
                exports.envDict.CI_COMMIT_ID
              )
          );
          // create test-report.badge.svg
          exports.fs.writeFileSync(
            process.cwd() + '/.tmp/build/test-report.badge.svg',
            exports.fileCacheDict['.tmp/build/test-report.badge.svg'].data
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
          exports.fs.writeFileSync(
            process.cwd() + '/.tmp/build/test-report.html',
            testReportHtml
          );
          // create test-report.json
          exports.fs.writeFileSync(
            process.cwd() + '/.tmp/build/test-report.json',
            JSON.stringify(exports.testReport)
          );
          // if any test failed, then exit with non-zero exit-code
          setTimeout(function () {
            // finalize testReport
            exports.testMerge(testReport, {});
            console.log('\n' + exports.envDict.MODE_BUILD + ' - ' +
              exports.testReport.testsFailed + ' failed tests\n');
            // call callback with number of tests failed
            onTestRunEnd(exports.testReport.testsFailed);
          }, 1000);
          break;
        default:
          setTimeout(function () {
            // call callback with number of tests failed
            onTestRunEnd(exports.testReport.testsFailed);
          }, 1000);
        }
      });
      onParallel.counter += 1;
      // init testReport timer
      exports.testReport.timeElapsed = Date.now();
      // init testPlatform
      testPlatform = exports.testPlatform;
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
              exports.errorStack(error));
            testCase.errorStack = testCase.errorStack || exports.errorStack(error);
            // validate errorStack is non-empty
            exports.assert(testCase.errorStack, 'invalid errorStack ' + testCase.errorStack);
          }
          // if testCase already finished, then do not run finish code again
          if (finished) {
            return;
          }
          // finish testCase
          finished = true;
          // stop testCase timer
          exports._timeElapsedStop(testCase);
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

    exports._testRun_failure_test = function (onError) {
      /*
        this function will test testRun's failure handling behavior
      */
      // test failure from callback handling behavior
      onError(exports.errorDefault);
      // test failure from multiple-callback handling behavior
      onError();
      // test failure from thrown error handling behavior
      throw exports.errorDefault;
    };

    exports.testTryCatch = function (callback, onError) {
      /*
        this function will call the callback in a try-catch block,
        and pass any caught errors to onError
      */
      try {
        callback();
      } catch (errorCaught) {
        onError(errorCaught);
      }
    };

    exports.textFormat = function (template, dict, valueDefault) {
      /*
        this function will replace the keys in given text template
        with the key / value pairs provided by the dict
      */
      var match, replace, rgx, value;
      dict = dict || {};
      replace = function (match0, fragment) {
        // nop hack to pass jslint
        exports.nop(match0);
        return dict[match].map(function (dict) {
          // recursively format the array fragment
          return exports.textFormat(fragment, dict, valueDefault);
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

    exports._textFormat_default_test = function (onError) {
      /*
        this function will test textFormat's default handling behavior
      */
      var data;
      // test undefined valueDefault handling behavior
      data = exports.textFormat('{{aa}}', {}, undefined);
      exports.assert(data === '{{aa}}', data);
      // test default handling behavior
      data = exports.textFormat('{{aa}}{{aa}}{{bb}}{{cc}}{{dd}}{{ee.ff}}', {
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
      exports.assert(data === 'aaaa1null<undefined>gg', data);
      // test list handling behavior
      data = exports.textFormat('[{{#list1}}[{{#list2}}{{aa}},{{/list2}}],{{/list1}}]', {
        list1: [
          // test null-value handling behavior
          null,
          // test recursive list handling behavior
          { list2: [{ aa: 'bb' }, { aa: 'cc' }] }
        ]
      }, '<undefined>');
      exports.assert(data === '[[<undefined><undefined>,<undefined>],[bb,cc,],]', data);
      onError();
    };

    exports._timeElapsedStop = function (options) {
      /*
        this function will stop options.timeElapsed
      */
      if (options.timeElapsed > 0xffffffff) {
        options.timeElapsed = Date.now() - options.timeElapsed;
      }
    };
  }());



  (function () {
    /*
      this function will run browser js-env code
    */
    if (exports.modeJs !== 'browser') {
      return;
    }

    exports.ajax = function (options, onError) {
      /*
        this functions performs a brower ajax request with error handling and timeout
      */
      var data, error, errorStack, finished, ii, onEvent, timerTimeout, xhr;
      errorStack = exports.errorStack();
      // init event-handling
      onEvent = function (event) {
        switch (event.type) {
        case 'abort':
        case 'error':
        case 'load':
          // cleanup timerTimeout
          clearTimeout(timerTimeout);
          // validate finished is falsey
          exports.assert(!finished, finished);
          // set finished to true
          finished = true;
          // validate xhr is defined in _ajaxProgressList
          ii = exports._ajaxProgressList.indexOf(xhr);
          exports.assert(ii >= 0, 'missing xhr in exports._ajaxProgressList');
          // remove xhr from ajaxProgressList
          exports._ajaxProgressList.splice(ii, 1);
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
              error.stack = exports.errorStack(error) + '\n' + errorStack;
            }
          }
          // hide _ajaxProgressDiv
          if (exports._ajaxProgressList.length === 0) {
            exports._ajaxProgressBarHide = setTimeout(function () {
              // hide ajaxProgressBar
              exports._ajaxProgressDiv.style.display = 'none';
              // reset ajaxProgress
              exports._ajaxProgressState = 0;
              exports._ajaxProgressUpdate('0%', 'ajaxProgressBarDivLoading', 'loading');
            }, 1000);
          }
          onError(error, data, xhr);
          break;
        }
        // increment ajaxProgressBar
        if (exports._ajaxProgressList.length > 0) {
          exports._ajaxProgressIncrement();
          return;
        }
        // finish ajaxProgressBar
        exports._ajaxProgressUpdate('100%', 'ajaxProgressBarDivSuccess', 'loaded');
      };
      // init xhr
      xhr = new XMLHttpRequest();
      // debug xhr
      exports._debugXhr = xhr;
      // init event-handling
      xhr.addEventListener('abort', onEvent);
      xhr.addEventListener('error', onEvent);
      xhr.addEventListener('load', onEvent);
      xhr.addEventListener('loadstart', exports._ajaxProgressIncrement);
      xhr.addEventListener('progress', exports._ajaxProgressIncrement);
      xhr.upload.addEventListener('progress', exports._ajaxProgressIncrement);
      // set timerTimeout
      timerTimeout = exports.onTimeout(function (errorTimeout) {
        error = errorTimeout;
        xhr.abort();
      }, options.timeout || exports.timeoutDefault, 'ajax');
      // if ajaxProgressBar is hidden, then display it
      if (exports._ajaxProgressList.length === 0) {
        exports._ajaxProgressDiv.style.display = 'block';
      }
      // add xhr to _ajaxProgressList
      exports._ajaxProgressList.push(xhr);
      // open url
      xhr.open(options.method || 'GET', options.url);
      // send request headers
      Object.keys(options.headers || {}).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });
      // clear any pending timer to hide _ajaxProgressDiv
      clearTimeout(exports._ajaxProgressBarHide);
      // send data
      xhr.send(options.data);
    };

    // init _ajaxProgressBarDiv element
    exports._ajaxProgressBarDiv =
      document.querySelector('.ajaxProgressBarDiv') || { className: '', style: {} };

    // init _ajaxProgressDiv element
    exports._ajaxProgressDiv = document.querySelector('.ajaxProgressDiv') || { style: {} };

    exports._ajaxProgressIncrement = function () {
      /*
        this function will increment the ajaxProgressBar
      */
      // this algorithm can indefinitely increment the ajaxProgressBar
      // with successively smaller increments without ever reaching 100%
      exports._ajaxProgressState += 1;
      exports._ajaxProgressUpdate(
        100 - 75 * Math.exp(-0.125 * exports._ajaxProgressState) + '%',
        'ajaxProgressBarDivLoading',
        'loading'
      );
    };

    // init list of xhr used in ajaxProgress
    exports._ajaxProgressList = [];

    // init _ajaxProgressState
    exports._ajaxProgressState = 0;

    exports._ajaxProgressUpdate = function (width, type, label) {
      /*
        this function will visually update the ajaxProgressBar
      */
      exports._ajaxProgressBarDiv.style.width = width;
      exports._ajaxProgressBarDiv.className = exports._ajaxProgressBarDiv.className
        .replace((/ajaxProgressBarDiv\w+/), type);
      exports._ajaxProgressBarDiv.innerHTML = label;
    };
  }());



  (function () {
    /*
      this function will run node js-env code
    */
    if (exports.modeJs !== 'node') {
      return;
    }

    exports.ajax = function (options, onError) {
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
      errorStack = exports.errorStack();
      modeIo = 0;
      onIo = function (error, data) {
        modeIo = error instanceof Error ? NaN : modeIo + 1;
        switch (modeIo) {
        case 1:
          // set timerTimeout
          timerTimeout = exports.onTimeout(
            onIo,
            options.timeout || exports.timeoutDefault,
            'ajax ' + options.url
          );
          // init request and response
          request = response = { destroy: exports.nop };
          // handle implicit localhost
          if (options.url[0] === '/') {
            options.url = 'http://localhost:' + exports.envDict.npm_config_server_port +
              options.url;
          }
          // parse options.url
          urlParsed = exports.url.parse(String(options.url));
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
          request = (urlParsed.protocol === 'https:' ? exports.https : exports.http)
            .request(options, onIo)
            // handle error event
            .on('error', onIo);
          // debug ajax request
          exports._debugAjaxRequest = request;
          // send request and/or data
          request.end(options.data);
          break;
        case 2:
          response = error;
          // debug ajax response
          exports._debugAjaxResponse = response;
          exports.streamReadAll(response, onIo);
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
            error.stack = exports.errorStack(error) + '\n' + errorStack;
          }
          onError(error, responseText);
        }
      };
      onIo();
    };

    exports._coverageInstrument = function (script, file) {
      /*
        this function will instrument the given script and file
      */
      var istanbul;
      if (!exports._instrumenter) {
        istanbul = require('istanbul-lite');
        exports._instrumenter = new istanbul.Instrumenter();
      }
      return exports._instrumenter.instrumentSync(script, file);
    };

    exports._coverageMerge_default_test = function (onError) {
      /*
        this function will test coverageMerge's default handling behavior
      */
      var coverage1, coverage2, script;
      script = exports._coverageInstrument(
        '(function () {\nreturn arg ? __coverage__ : __coverage__;\n}());',
        'test'
      );
      exports.arg = 0;
      // init coverage1
      coverage1 = exports.vm.runInNewContext(script, { arg: 0 });
      // validate coverage1
      exports.assert(exports.jsonStringifyOrdered(coverage1) === '{"test":{"b":{"1":[0,1]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"f":{"1":1},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"test","s":{"1":1,"2":1},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage1);
      // init coverage1
      coverage2 = exports.vm.runInNewContext(script, { arg: 1 });
      // validate coverage2
      exports.assert(exports.jsonStringifyOrdered(coverage2) === '{"test":{"b":{"1":[1,0]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"f":{"1":1},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"test","s":{"1":1,"2":1},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage2);
      // merge coverage2 into coverage1
      exports.coverageMerge(coverage1, coverage2);
      // validate merged coverage1
      exports.assert(exports.jsonStringifyOrdered(coverage1) === '{"test":{"b":{"1":[1,1]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"f":{"1":2},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"test","s":{"1":2,"2":2},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage1);
      onError();
    };

    exports.fileCacheAndParse = function (options) {
      /*
        this function will parse options.file and cache it to exports.fileCacheDict
      */
      // read options.data from options.file and comment out shebang
      options.data = exports.fs.readFileSync(options.file, 'utf8').replace((/^#!/), '//#!');
      // if coverage-mode is enabled, then instrument options.data
      if (exports.__coverage__ &&
          options.coverage && options.coverage === exports.envDict.PACKAGE_JSON_NAME) {
        options.data = exports._coverageInstrument(options.data, options.file);
      }
      // cache options to exports.fileCacheDict[options.cache]
      if (options.cache) {
        exports.fileCacheDict[options.cache] = options;
      }
    };

    exports.onFileModifiedRestart = function (file) {
      /*
        this function will watche the file and if modified, then restart the process
      */
      if (exports.envDict.npm_config_mode_auto_restart && exports.fs.statSync(file).isFile()) {
        exports.fs.watchFile(file, {
          interval: 1000,
          persistent: false
        }, function (stat2, stat1) {
          if (stat2.mtime > stat1.mtime) {
            process.exit(1);
          }
        });
      }
    };

    exports.replStart = function (globalDict) {
      /*
        this function will start the repl debugger
      */
      var evil, match;
      // evil hack to pass jslint
      evil = 'eval';
      Object.keys(globalDict).forEach(function (key) {
        exports.global[key] = globalDict[key];
      });
      // start repl server
      exports._replServer = require('repl').start({ useGlobals: true });
      // save repl eval function
      exports._replServer.evalDefault = exports._replServer[evil];
      // hook custom repl eval function
      exports._replServer[evil] = function (script, context, file, onError) {
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
          exports.child_process.spawn(
            '/bin/bash',
            ['-c', match[2]],
            { stdio: ['ignore', 1, 2] }
          )
            // on shell exit, print return prompt
            .on('exit', function () {
              exports._replServer.evalDefault('\n', context, file, onError);
            });
          return;
        // syntax sugar to grep current directory
        case 'grep':
          // run async shell command
          exports.child_process.spawn(
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
              exports._replServer.evalDefault('\n', context, file, onError);
            });
          return;
        // syntax sugar to print stringified arg
        case 'print':
          script = '(console.log(String(' + match[2] + '))\n)';
          break;
        }
        // eval modified script
        exports._replServer.evalDefault(script, context, file, onError);
      };
    };

    exports._replStart_default_test = function (onError) {
      /*
        this function will test replStart's default handling behavior
      */
      var evil;
      exports.testMock([
        [exports.child_process, { spawn: function () {
          return { on: function (event, callback) {
            // nop hack to pass jslint
            exports.nop(event);
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
          exports._replServer[evil](script, null, 'repl', exports.nop);
        });
        // test syntax-error handling behavior
        exports._replServer[evil]('syntax-error', null, 'repl', function (error) {
          exports.testTryCatch(function () {
            // validate error occurred
            // bug - use util.isError to validate error when using eval
            exports.assert(require('util').isError(error), error);
            onError();
          }, onError);
        });
      });
    };

    exports.serverRespondDefault = function (request, response, statusCode, error) {
      /*
        this function will respond with a default message,
        or error stack for the given statusCode
      */
      // set response / statusCode / contentType
      exports.serverRespondWriteHead(request, response, statusCode, {
        'Content-Type': 'text/plain; charset=utf-8'
      });
      if (error) {
        // if modeErrorIgnore is undefined in url search params,
        // then print error.stack to stderr
        if (!(/\?.*\bmodeErrorIgnore=1\b/).test(request.url)) {
          exports.onErrorDefault(error);
        }
        // end response with error.stack
        response.end(exports.errorStack(error));
        return;
      }
      // end response with default statusCode message
      response.end(statusCode + ' ' + exports.http.STATUS_CODES[statusCode]);
    };

    exports.serverRespondEcho = function (request, response) {
      /*
        this function will respond with debug info
      */
      response.write(request.method + ' ' + request.url +
        ' HTTP/' + request.httpVersion + '\r\n' +
        Object.keys(request.headers).map(function (key) {
          return key + ': ' + request.headers[key] + '\r\n';
        }).join('') + '\r\n');
      request.pipe(response);
    };

    exports.serverRespondWriteHead = function (request, response, statusCode, headers) {
      /*
        this function will set the response object's statusCode / headers
      */
      // nop hack to pass jslint
      exports.nop(request);
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

    exports.streamReadAll = function (readableStream, onError) {
      /*
        this function will concat data from the readableStream,
        and pass it to onError when finished reading
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

    exports.testMiddleware = function (request, response, onIo) {
      var contentTypeDict;
      // debug server request
      exports._debugServerRequest = request;
      // debug server response
      exports._debugServerResponse = response;
      // check if _testSecret is valid
      request._testSecretValid = (/\b_testSecret=(\w+)\b/).exec(request.url);
      request._testSecretValid =
        request._testSecretValid && request._testSecretValid[1] === exports._testSecret;
      // init request.urlPathNormalized
      request.urlPathNormalized =
        exports.path.resolve(exports.url.parse(request.url).pathname);
      // init Content-Type header
      contentTypeDict = {
        '.css': 'text/css; charset=UTF-8',
        '.html': 'text/html; charset=UTF-8',
        '.js': 'application/javascript; charset=UTF-8',
        '.json': 'application/json; charset=UTF-8',
        '.txt': 'text/txt; charset=UTF-8'
      };
      exports.serverRespondWriteHead(request, response, null, {
        'Content-Type': contentTypeDict[exports.path.extname(request.urlPathNormalized)]
      });
      switch (request.urlPathNormalized) {
      // serve the following assets from fileCacheDict
      case '/assets/utility2.js':
      case '/test/test.js':
        response.end(exports.fileCacheDict[request.urlPathNormalized].data);
        break;
      // serve test page
      case '/test/test.html':
      case '/test/utility2.html':
        response.end(exports.textFormat(exports.fileCacheDict[
          request.urlPathNormalized
        ].data, {
          envDict: exports.envDict,
          utility2BrowserJson: JSON.stringify(exports.utility2Browser),
          utility2Css: exports.fileCacheDict['/assets/utility2.css'].data
        }));
        break;
      // fallback to next middleware
      default:
        onIo();
      }
    };

    exports.testPhantom = function (options, onError) {
      /*
        this function will spawn a phantomjs process to test a url
      */
      var onParallel;
      onParallel = exports.onParallel(onError);
      onParallel.counter += 1;
      // init timeout
      options.timeout = options.timeout || exports.timeoutDefault;
      ['phantomjs', 'slimerjs'].forEach(function (argv0) {
        var file, onError2, timerTimeout;
        // if slimerjs is not available, then do not use it
        if (argv0 === 'slimerjs' && (!exports.envDict.npm_config_mode_slimerjs ||
            exports.envDict.npm_config_mode_no_slimerjs)) {
          return;
        }
        argv0 = exports.envDict.MODE_BUILD + '.' + argv0;
        if ('utility2' === exports.envDict.PACKAGE_JSON_NAME) {
          argv0 += (exports.url.parse(options.url).path).replace((/\W+/g), '.');
        }
        onParallel.counter += 1;
        onError2 = function (error) {
          // cleanup timerTimeout
          clearTimeout(timerTimeout);
          onParallel(error);
        };
        // set timerTimeout
        timerTimeout = exports.onTimeout(onError2, options.timeout, argv0);
        file = __dirname + '/index.js';
        // cover index.js
        if (exports.__coverage__ && 'utility2' === exports.envDict.PACKAGE_JSON_NAME) {
          file = process.cwd() + '/.tmp/instrumented.utility2.js';
        }
        // spawn a phantomjs process to test a url
        exports.child_process.spawn(
          require('phantomjs-lite').__dirname + '/' + argv0.split('.')[1],
          [
            file,
            encodeURIComponent(JSON.stringify(exports.setOverride({
              argv0: argv0,
              _testSecret: exports._testSecret,
              timeoutDefault: options.timeout
            }, 1, options)))
          ],
          { stdio: 'inherit' }
        )
          .on('exit', function (exitCode) {
            // merge coverage code
            exports.coverageMerge(
              exports.__coverage__,
              JSON.parse(exports.fs.readFileSync(
                process.cwd() +
                  '/.tmp/build/coverage-report.html/coverage.' + argv0 + '.json',
                'utf8'
              ))
            );
            // merge tests
            if (!options.modeErrorIgnore) {
              exports.testMerge(
                exports.testReport,
                JSON.parse(exports.fs.readFileSync(
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

    exports.testRunServer = function (options, onTestRunEnd) {
    /*
      this function will
      1. create test-server with options.serverMiddlewareList
      2. start test-server on $npm_config_server_port
      3. test test-server
    */
      // if $npm_config_timeout_exit is defined,
      // then exit this process after $npm_config_timeout_exit ms
      if (Number(exports.envDict.npm_config_timeout_exit)) {
        setTimeout(process.exit, Number(exports.envDict.npm_config_timeout_exit))
          // keep timerTimeout from blocking the process from exiting
          .unref();
      }
      // web-server __filename as /assets/utility2.js
      exports.fileCacheAndParse({
        cache: '/assets/utility2.js',
        coverage: 'utility2',
        file: __filename
      });
      // save instrumented utility2.js to fs
      if (exports.__coverage__ && exports.envDict.PACKAGE_JSON_NAME === 'utility2') {
        exports.fs.writeFileSync(
          process.cwd() + '/.tmp/instrumented.utility2.js',
          exports.fileCacheDict['/assets/utility2.js'].data
        );
      }
      // if $npm_config_server_port is undefined,
      // then assign it a random integer in the inclusive range 1 to 0xffff
      exports.envDict.npm_config_server_port = exports.envDict.npm_config_server_port ||
        ((Math.random() * 0x10000) | 0x8000).toString();
      // 1. create test-server with options.serverMiddlewareList
      exports.http.createServer(function (request, response) {
        var modeIo, onIo;
        modeIo = -1;
        onIo = function (error) {
          modeIo = error instanceof Error ? NaN : modeIo + 1;
          if (options.serverMiddlewareList[modeIo]) {
            options.serverMiddlewareList[modeIo](request, response, onIo);
            return;
          }
          // if error occurred, then respond with '500 Internal Server Error'
          // else respond with '404 Not Found'
          exports.serverRespondDefault(request, response, error ? 500 : 404, error);
        };
        onIo();
      })
        // 2. start test-server on $npm_config_server_port
        .listen(exports.envDict.npm_config_server_port, function () {
          console.log(
            'test-server listening on port ' + exports.envDict.npm_config_server_port
          );
          // 3. test test-server
          exports.testRun(options, onTestRunEnd);
        });
    };

    exports._testRunServer_misc_test = function (onError) {
      /*
        this function will test testRunServer's misc handling behavior
      */
      // test random server-port handling behavior
      exports.testMock([
        [exports.http, { createServer: function () {
          return { listen: exports.nop };
        } }],
        [exports.envDict, {
          // test auto-exit handling behavior
          npm_config_timeout_exit: '1',
          // test random $npm_config_server_port handling behavior
          npm_config_server_port: ''
        }]
      ], onError, function (onError) {
        exports.testRunServer({ serverMiddlewareList: [] }, exports.nop);
        onError();
      });
    };

  }());



  (function () {
    /*
      this function will run phantom js-env code
    */
    if (exports.modeJs !== 'phantom') {
      return;
    }
    // override exports properties
    exports.setOverride(
      exports,
      -1,
      JSON.parse(decodeURIComponent(exports.system.args[1]))
    );
    // if modeErrorIgnore, then suppress console.error and console.log
    if (exports.modeErrorIgnore) {
      console.error = console.log = exports.nop;
    }
    // init error handling
    exports.global.phantom.onError = function (message, trace) {
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
          exports.coverageMerge(exports.__coverage__, data.coverage);
          // create screenCapture
          file = exports.fs.workingDirectory + '/.tmp/build/screen-capture.' +
            exports.argv0.replace((/\b(phantomjs|slimerjs)\b.*/g), '$1') + '.png';
          exports.page.render(file);
          console.log('created ' + 'file://' + file);
          // integrate screenCapture into test-report
          data.testReport.testPlatformList[0].screenCaptureImg =
            file.replace((/^.*\//), '');
          // merge test-report
          exports.testMerge(exports.testReport, data.testReport);
        // 2. else handle it as a normal error
        } else {
          // phantom error handling - http://phantomjs.org/api/phantom/handler/on-error.html
          console.error('\n\n');
          console.error(exports.argv0 + ' ERROR: ' + message);
          if (trace && trace.length) {
            console.error(exports.argv0 + ' TRACE:');
            trace.forEach(function (t) {
              console.error(' -> ' + (t.file || t.sourceURL) + ': ' + t.line
                + (t.function ? ' (in function ' + t.function + ')' : ''));
            });
          }
          console.error('\n\n');
        }
        [[
          '.tmp/build/test-report.' + exports.argv0 + '.json',
          exports.testReport
        ], [
          '.tmp/build/coverage-report.html/coverage.' + exports.argv0 + '.json',
          exports.__coverage__
        ]].forEach(function (args) {
          file = exports.fs.workingDirectory + '/' + args[0];
          exports.fs.write(file, JSON.stringify(args[1]));
          console.log('created ' + 'file://' + file);
        });
        // exit with number of tests failed as exit-code
        exports.global.phantom.exit(!data || data.testReport.testsFailed);
      } catch (error) {
        console.error(error.message);
        exports.global.phantom.exit(1);
      }
    };
    // set timeout for phantom
    exports.onTimeout(function (error) {
      exports.global.phantom.onError(error.message);
    }, exports.timeoutDefault, exports.url);
    // reset testCaseList
    exports.testPlatform.testCaseList = [];
    // init page
    exports.page = exports.webpage.create();
    // init page's viewport-size
    exports.page.viewportSize = exports.viewportSize || { height: 600, width: 800 };
    // init page's error handling
    // http://phantomjs.org/api/webpage/handler/on-error.html
    exports.page.onError = exports.global.phantom.onError;
    // pipe page's console.log to stdout
    exports.page.onConsoleMessage = function () {
      console.log.apply(console, arguments);
    };
    // open requested webpage
    exports.page.open(
      // security - insert _testSecret in url without revealing it
      exports.url.replace('{{_testSecret}}', exports._testSecret),
      function (data) {
        console.log(exports.argv0 + ' - open ' + data + ' ' + exports.url);
        // validate page opened successfully
        exports.assert(data === 'success', data);
      }
    );
  }());



}((function (self) {
  'use strict';
  var exports;
  // init shared js-env
  (function () {
    // init exports
    exports = {};
    exports.modeJs = (function () {
      try {
        return self.phantom.version &&
          typeof require('webpage').create === 'function' && 'phantom';
      } catch (errorCaughtPhantom) {
        try {
          return module.exports && typeof process.versions.node === 'string' &&
            typeof require('child_process').spawn === 'function' && 'node';
        } catch (errorCaughtNode) {
          exports = window.utility2 = window.utility2 || exports;
          exports.modeJs = typeof navigator.userAgent === 'string' &&
            typeof document.querySelector('body') === 'object' && 'browser';
          return exports.modeJs;
        }
      }
    }());
    exports.nop = function () {
      /*
        this function will perform no operation - nop
      */
      return;
    };
  }());
  switch (exports.modeJs) {
  // init browser js-env
  case 'browser':
    // init exports properties
    exports.envDict = exports.envDict || {};
    exports.global = window;
    // parse any url-search-params that matches 'mode*' or '_testSecret' or 'timeoutDefault'
    location.search.replace(
      (/\b(mode[A-Z]\w+|_testSecret|timeoutDefault)=([^#&=]+)/g),
      function (match0, key, value) {
        // nop hack to pass jslint
        exports.nop(match0);
        exports[key] = value;
        // try to parse value as json object
        try {
          exports[key] = JSON.parse(value);
        } catch (ignore) {
        }
      }
    );
    break;
  // init node js-env
  case 'node':
    // require modules
    exports.child_process = require('child_process');
    exports.crypto = require('crypto');
    exports.fs = require('fs');
    exports.http = require('http');
    exports.https = require('https');
    exports.jslint_lite = require('jslint-lite');
    exports.path = require('path');
    exports.url = require('url');
    exports.vm = require('vm');
    // init exports properties
    exports.__dirname = __dirname;
    exports.envDict = process.env;
    exports.global = global;
    exports.utility2Browser = {
      envDict: {
        PACKAGE_JSON_DESCRIPTION: exports.envDict.PACKAGE_JSON_DESCRIPTION,
        PACKAGE_JSON_NAME: exports.envDict.PACKAGE_JSON_NAME,
        PACKAGE_JSON_VERSION: exports.envDict.PACKAGE_JSON_VERSION
      }
    };
    // init _testSecret
    (function () {
      var testSecretCreate;
      testSecretCreate = function () {
        exports._testSecret = exports.crypto.randomBytes(32).toString('hex');
      };
      // init _testSecret
      testSecretCreate();
      exports._testSecret = exports.envDict.TEST_SECRET || exports._testSecret;
      // re-init _testSecret every 60 seconds
      setInterval(testSecretCreate, 60000).unref();
    }());
    module.exports = exports;
    break;
  // init phantom js-env
  case 'phantom':
    // require modules
    exports.fs = require('fs');
    exports.system = require('system');
    exports.webpage = require('webpage');
    // init exports properties
    exports.envDict = exports.system.env;
    exports.global = self;
    break;
  }
  // init shared js-env
  (function () {
    var debug_print;
    debug_print = 'debug_print'.replace('_p', 'P');
    // init global debug_print
    exports.global[debug_print] = function (arg) {
      /*
        this function will both print the arg to stderr and return it,
        and jslint will nag you to remove it if used
      */
      // debug arguments
      exports[debug_print + 'Arguments'] = arguments;
      console.error('\n\n\n' + debug_print);
      console.error.apply(console, arguments);
      console.error();
      // return arg for inspection
      return arg;
    };
    exports._debug_print_default_test = function (onError) {
      /*
        this function will test debug_print's default handling behavior
      */
      var message;
      exports.testMock([
        // suppress console.error
        [console, { error: function (arg) {
          message += (arg || '') + '\n';
        } }]
      ], onError, function (onError) {
        message = '';
        exports.global['debug_print'.replace('_p', 'P')]('_debug_print_default_test');
        // validate message
        exports.assert(
          message === '\n\n\ndebug' + 'Print\n_debug_print_default_test\n\n',
          message
        );
        onError();
      });
    };
    exports.__coverage__ = exports.__coverage__ || exports.global.__coverage__ || null;
    exports.errorDefault = new Error('default error');
    exports.testPlatform = {
      name: exports.modeJs === 'browser' ? 'browser - ' +
        navigator.userAgent + ' - ' + new Date().toISOString() :
          exports.modeJs === 'node' ? 'node - ' +
            process.platform + ' ' + process.version + ' - ' + new Date().toISOString() :
              (exports.global.slimer ? 'slimer - ' : 'phantom - ') +
              exports.system.os.name + ' ' +
              exports.global.phantom.version.major + '.' +
              exports.global.phantom.version.minor + '.' +
              exports.global.phantom.version.patch + ' - ' + new Date().toISOString(),
      screenCaptureImg: exports.envDict.MODE_BUILD_SCREEN_CAPTURE,
      testCaseList: []
    };
    exports.testReport = { testPlatformList: [exports.testPlatform] };
    exports.textExampleAscii = exports.textExampleAscii ||
      '\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f' +
      '\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f' +
      ' !"#$%&\'()*+,-./0123456789:;<=>?' +
      '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_' +
      '`abcdefghijklmnopqrstuvwxyz{|}~\x7f';
    exports.timeoutDefault =
      exports.envDict.npm_config_timeout_default || exports.timeoutDefault || 30000;
  }());



  // init fileCacheDict
  exports.fileCacheDict = {
/* jslint-ignore-begin */
'/test/test-report.html.template': { data: '\
<style>\n\
.testReportPlatformDiv {\n\
  border: 1px solid;\n\
  border-radius: 5px;\n\
  font-family: Helvetical Neue, Helvetica, Arial, sans-serif;\n\
  margin-top: 20px;\n\
  padding: 0 10px 10px 10px;\n\
  text-align: left;\n\
}\n\
.testReportPlatformPre {\n\
  background-color: #fdd;\n\
  border: 1px;\n\
  border-radius: 0 0 5px 5px;\n\
  border-top-style: solid;\n\
  margin-bottom: 0;\n\
  padding: 10px;\n\
}\n\
.testReportPlatformPreHidden {\n\
  display: none;\n\
}\n\
.testReportPlatformScreenCaptureA {\n\
  border: 1px solid;\n\
  border-color: #000;\n\
  display:block;\n\
  margin: 5px 0 5px 0;\n\
  max-height:256px;\n\
  max-width:320px;\n\
  overflow:hidden;\n\
}\n\
.testReportPlatformScreenCaptureImg {\n\
  max-width:320px;\n\
}\n\
.testReportPlatformSpan {\n\
  display: inline-block;\n\
  width: 8em;\n\
}\n\
.testReportPlatformTable {\n\
  border: 1px;\n\
  border-top-style: solid;\n\
  text-align: left;\n\
  width: 100%;\n\
}\n\
.testReportSummaryDiv {\n\
  background-color: #bfb;\n\
}\n\
.testReportSummarySpan {\n\
  display: inline-block;\n\
  width: 6.5em;\n\
}\n\
tr:nth-child(odd).testReportPlatformTr {\n\
  background-color: #bfb;\n\
}\n\
.testReportTestFailed {\n\
  background-color: #f99;\n\
}\n\
.testReportTestPending {\n\
  background-color: #99f;\n\
}\n\
</style>\n\
<div class="testReportPlatformDiv testReportSummaryDiv">\n\
<h2>{{envDict.PACKAGE_JSON_NAME}} test-report summary</h2>\n\
<h4>\n\
  <span class="testReportSummarySpan">version</span>- {{envDict.PACKAGE_JSON_VERSION}}<br>\n\
  <span class="testReportSummarySpan">build date</span>- {{date}}<br>\n\
  <span class="testReportSummarySpan">commit info</span>- {{CI_COMMIT_INFO}}<br>\n\
</h4>\n\
<table class="testReportPlatformTable">\n\
<thead><tr>\n\
  <th>total time elapsed</th>\n\
  <th>total tests failed</th>\n\
  <th>total tests passed</th>\n\
  <th>total tests pending</th>\n\
</tr></thead>\n\
<tbody><tr>\n\
  <td>{{timeElapsed}} ms</td>\n\
  <td class="{{testsFailedClass}}">{{testsFailed}}</td>\n\
  <td>{{testsPassed}}</td>\n\
  <td>{{testsPending}}</td>\n\
</tr></tbody>\n\
</table>\n\
</div>\n\
{{#testPlatformList}}\n\
<div class="testReportPlatformDiv">\n\
<h4>\n\
  {{testPlatformNumber}}. {{name}}<br>\n\
  {{screenCapture}}\n\
  <span class="testReportPlatformSpan">time elapsed</span>- {{timeElapsed}} ms<br>\n\
  <span class="testReportPlatformSpan">tests failed</span>- {{testsFailed}}<br>\n\
  <span class="testReportPlatformSpan">tests passed</span>- {{testsPassed}}<br>\n\
  <span class="testReportPlatformSpan">tests pending</span>- {{testsPending}}<br>\n\
</h4>\n\
<table class="testReportPlatformTable">\n\
<thead><tr>\n\
  <th>#</th>\n\
  <th>time elapsed</th>\n\
  <th>status</th>\n\
  <th>test case</th>\n\
</tr></thead>\n\
<tbody>\n\
{{#testCaseList}}\n\
<tr class="testReportPlatformTr">\n\
  <td>{{testCaseNumber}}</td>\n\
  <td>{{timeElapsed}} ms</td>\n\
  <td class="{{testReportTestStatusClass}}">{{status}}</td>\n\
  <td>{{name}}</td>\n\
</tr>\n\
{{/testCaseList}}\n\
</tbody>\n\
</table>\n\
<pre class="{{testReportPlatformPreClass}}">\n\
{{#errorStackList}}\n\
{{errorStack}}\n\
{{/errorStackList}}\n\
</pre>\n\
</div>\n\
{{/testPlatformList}}\n\
' },



// https://img.shields.io/badge/last_build-0000_00_00_00_00_00_UTC_--_master_--_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-0077ff.svg?style=flat
'.tmp/build/build.badge.svg': { data: '\
<svg xmlns="http://www.w3.org/2000/svg" width="563" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="563" height="20" fill="#555"/><rect rx="0" x="61" width="502" height="20" fill="#07f"/><path fill="#07f" d="M61 0h4v20h-4z"/><rect rx="0" width="563" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="31.5" y="15" fill="#010101" fill-opacity=".3">last build</text><text x="31.5" y="14">last build</text><text x="311" y="15" fill="#010101" fill-opacity=".3">0000 00 00 00 00 00 UTC - master - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</text><text x="311" y="14">0000 00 00 00 00 00 UTC - master - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</text></g></svg>\n\
' },



// https://img.shields.io/badge/coverage-100.0%-00dd00.svg?style=flat
'.tmp/build/coverage-report.badge.svg': { data: '\
<svg xmlns="http://www.w3.org/2000/svg" width="117" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="117" height="20" fill="#555"/><rect rx="0" x="63" width="54" height="20" fill="#0d0"/><path fill="#0d0" d="M63 0h4v20h-4z"/><rect rx="0" width="117" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="32.5" y="15" fill="#010101" fill-opacity=".3">coverage</text><text x="32.5" y="14">coverage</text><text x="89" y="15" fill="#010101" fill-opacity=".3">100.0%</text><text x="89" y="14">100.0%</text></g></svg>\n\
' },



// https://img.shields.io/badge/tests_failed-999-dd0000.svg?style=flat
'.tmp/build/test-report.badge.svg': { data: '\
<svg xmlns="http://www.w3.org/2000/svg" width="103" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="103" height="20" fill="#555"/><rect rx="0" x="72" width="31" height="20" fill="#d00"/><path fill="#d00" d="M72 0h4v20h-4z"/><rect rx="0" width="103" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="37" y="15" fill="#010101" fill-opacity=".3">tests failed</text><text x="37" y="14">tests failed</text><text x="86.5" y="15" fill="#010101" fill-opacity=".3">999</text><text x="86.5" y="14">999</text></g></svg>\n\
' },



// https://img.shields.io/badge/tests_failed-999-dd0000.svg?style=flat
'/assets/utility2.css': { data: '\
/*csslint\n\
  box-model: false\n\
*/\n\
.ajaxProgressBarDiv {\n\
  animation: 2s linear 0s normal none infinite ajaxProgressBarDivAnimation;\n\
  -o-animation: 2s linear 0s normal none infinite ajaxProgressBarDivAnimation;\n\
  -moz-animation: 2s linear 0s normal none infinite ajaxProgressBarDivAnimation;\n\
  -webkit-animation: 2s linear 0s normal none infinite ajaxProgressBarDivAnimation;\n\
  background-image: linear-gradient(\n\
    45deg,rgba(255,255,255,.25) 25%,\n\
    transparent 25%,\n\
    transparent 50%,\n\
    rgba(255,255,255,.25) 50%,\n\
    rgba(255,255,255,.25) 75%,\n\
    transparent 75%,\n\
    transparent\n\
  );\n\
  background-size: 40px 40px;\n\
  color: #fff;\n\
  font-family: Helvetical Neue, Helvetica, Arial, sans-serif;\n\
  font-size: 12px;\n\
  padding: 2px 0 2px 0;\n\
  text-align: center;\n\
  transition: width .5s ease;\n\
  width: 25%;\n\
}\n\
.ajaxProgressBarDivError {\n\
  background-color: #d33;\n\
}\n\
.ajaxProgressBarDivLoading {\n\
  background-color: #37b;\n\
}\n\
.ajaxProgressBarDivSuccess {\n\
  background-color: #3b3;\n\
}\n\
.ajaxProgressDiv {\n\
  background-color: #fff;\n\
  border: 1px solid;\n\
  display: none;\n\
  left: 50%;\n\
  margin: 0 0 0 -50px;\n\
  padding: 5px 5px 5px 5px;\n\
  position: fixed;\n\
  top: 49%;\n\
  width: 100px;\n\
  z-index: 9999;\n\
}\n\
@keyframes ajaxProgressBarDivAnimation {\n\
  from { background-position: 40px 0; }\n\
  to { background-position: 0 0; }\n\
}\n\
@-o-keyframes ajaxProgressBarDivAnimation {\n\
  from { background-position: 40px 0; }\n\
  to { background-position: 0 0; }\n\
}\n\
@-webkit-keyframes ajaxProgressBarDivAnimation {\n\
  from { background-position: 40px 0; }\n\
  to { background-position: 0 0; }\n\
}\n\
' },



'/test/test.html': { data: '\
<!DOCTYPE html>\n\
<html>\n\
<head>\n\
  <meta charset="UTF-8">\n\
  <title>{{envDict.PACKAGE_JSON_NAME}} [{{envDict.PACKAGE_JSON_VERSION}}]</title>\n\
  <style>\n\
  {{utility2Css}}\n\
  body {\n\
  background-color: #fff;\n\
  font-family: Helvetical Neue, Helvetica, Arial, sans-serif;\n\
  }\n\
  </style>\n\
</head>\n\
<body>\n\
  <!-- main app div begin -->\n\
  <div class="utility2Div">\n\
  <h1>{{envDict.PACKAGE_JSON_NAME}} [{{envDict.PACKAGE_JSON_VERSION}}]</h1>\n\
  <h3>{{envDict.PACKAGE_JSON_DESCRIPTION}}</h3>\n\
  <div><button\n\
    onclick="window.utility2.modeTest=1; window.utility2.testRun(window.utility2, window.utility2.nop);"\n\
  >run test</button></div>\n\
  <div class="testReportDiv"></div>\n\
  </div>\n\
  <!-- main app div end -->\n\
  <!-- ajax progress bar begin -->\n\
  <div class="ajaxProgressDiv">\n\
  <div class="ajaxProgressBarDiv ajaxProgressBarDivLoading">loading</div>\n\
  </div>\n\
  <!-- ajax progress bar end -->\n\
  <!-- script begin -->\n\
  <script>window.utility2 = {{utility2BrowserJson}}</script>\n\
  <script src="/assets/utility2.js"></script>\n\
  <script src="/test/test.js"></script>\n\
  <!-- script end -->\n\
</body>\n\
</html>\n\
' },



'/test/utility2.html': { data: '\
<!DOCTYPE html>\n\
<html>\n\
<head>\n\
  <meta charset="UTF-8">\n\
  <title>utility2.js library</title>\n\
</head>\n\
<body>\n\
  <script src="/assets/utility2.js"></script>\n\
  <script>\n\
  (function () {\n\
    "use strict";\n\
    if (window.utility2.modeTest === "phantom") {\n\
      throw new Error(JSON.stringify({ global_test_results: {\n\
        coverage: window.utility2.__coverage__,\n\
        testReport: window.utility2.testReport\n\
      } }));\n\
    }\n\
  }());\n\
  </script>\n\
</body>\n\
</html>\n\
' }
/* jslint-ignore-end */
  };
  return exports;
}(this))));
