/*jslint
  bitwise: true, browser: true,
  indent: 2,
  maxerr: 8,
  maxlen: 96,
  node: true, nomen: true,
  regexp: true,
  stupid: true
*/
(function (app) {
  'use strict';



  // run shared js-env code
  (function () {
    app.utility2.assert = function (passed, message) {
      /*
        this function will throw an error if the assertion fails
      */
      if (!passed) {
        throw new Error(
          // if message is a string, then leave it as is
          typeof message === 'string'
            ? message
            // if message is an Error object, then get its stack-trace
            : message instanceof Error
            ? app.utility2.errorStack(message)
            // else JSON.stringify message
            : JSON.stringify(message)
        );
      }
    };

    app.utility2.errorStack = function (error) {
      /*
        this function will return the error's stack-trace
      */
      return error.stack || error.message || 'undefined';
    };

    app.utility2.istanbulMerge = function (coverage1, coverage2) {
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

    app.utility2.jsonCopy = function (value) {
      /*
        this function will return a deep-copy of the JSON value
      */
      return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
    };

    app.utility2.jsonStringifyOrdered = function (value, replacer, space) {
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
      return typeof value === 'string'
        ? JSON.stringify(JSON.parse(stringifyOrdered(JSON.parse(value))), replacer, space)
        : value;
    };

    app.utility2.onErrorDefault = function (error) {
      /*
        this function will provide a default error handling callback,
        which simply prints the error stack or message to stderr
      */
      // if error is defined, then print the error stack
      if (error) {
        console.error('\nonErrorDefault - error\n' + app.utility2.errorStack(error) + '\n');
      }
    };

    app.utility2.onErrorExit = app.utility2.exit;

    app.utility2.onErrorWithStack = function (onError) {
      /*
        this function will return a new callback that calls onError,
        with the current stack-trace appended to any error
      */
      var errorStack;
      try {
        throw new Error();
      } catch (errorCaught) {
        errorStack = errorCaught.stack;
      }
      return function () {
        var args;
        args = arguments;
        if (args[0]) {
          // try to append errorStack to args[0].stack
          try {
            args[0].stack = args[0].stack ? args[0].stack + '\n' + errorStack : errorStack;
          } catch (ignore) {
          }
        }
        onError.apply(null, args);
      };
    };

    app.utility2.onParallel = function (onError, onDebug) {
      /*
        this function will return another function that runs async tasks in parallel,
        and calls onError only if there's an error, or if its counter === 0
      */
      var self;
      onDebug = onDebug || app.utility2.nop;
      self = function (error) {
        app.utility2.onErrorWithStack(function (error) {
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
          }
          // decrement counter
          self.counter -= 1;
          // if counter === 0, then call onError with error
          if (self.counter === 0) {
            onError(error);
          }
        })(error);
      };
      // init counter
      self.counter = 0;
      // return callback
      return self;
    };

    // init onReady
    (function () {
      app.utility2.onReady = app.utility2.onParallel(function (error) {
        app.utility2.onReady.onReady(error);
      });
      app.utility2.onReady.onReady = app.utility2.onErrorDefault;
      app.utility2.onReady.counter += 1;
      setTimeout(app.utility2.onReady);
    }());

    app.utility2.onTimeout = function (onError, timeout, message) {
      /*
        this function will create a timer that passes a timeout error to onError,
        when the specified timeout has passed
      */
      onError = app.utility2.onErrorWithStack(onError);
      var error;
      // validate timeout is an integer in the exclusive range 0 to Infinity
      app.utility2.assert(
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

    app.utility2.setDefault = function (options, depth, defaults) {
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
          app.utility2.setDefault(options2, depth, defaults2);
        }
      });
      return options;
    };

    app.utility2.setOverride = function (options, depth, override, backup) {
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
          options[key] = options === app.utility2.envDict ? override2 || '' : override2;
          return;
        }
        // 3. recurse options[key] and override[key]
        app.utility2.setOverride(options2, depth, override2, override2, backup);
      });
      return options;
    };

    app.utility2.testMock = function (mockList, onError, testCase) {
      /*
        this function will mock the objects given in the mockList while running the testCase
      */
      var callCallback, onError2;
      callCallback = function (callback) {
        /*
          this function will call the callback
        */
        callback();
        // return a mock timer object with the unref method
        return { unref: app.utility2.nop };
      };
      // prepend mandatory mocks for async / unsafe functions
      mockList = [
        // suppress console.log
        [console, { log: app.utility2.nop }],
        // enforce synchronicity by mocking timers as callCallback
        [app.utility2.global, { setInterval: callCallback, setTimeout: callCallback }]
      ].concat(mockList);
      onError2 = function (error) {
        // restore mock[0] from mock[2]
        mockList.reverse().forEach(function (mock) {
          app.utility2.setOverride(mock[0], 1, mock[2], null);
        });
        onError(error);
      };
      // run onError callback in mocked objects in a try-catch block
      app.utility2.testTryCatch(function () {
        // mock objects
        mockList.forEach(function (mock) {
          mock[2] = {};
          // backup mock[0] into mock[2]
          // override mock[0] with mock[1]
          app.utility2.setOverride(mock[0], 1, mock[1], mock[2]);
        });
        // run testCase
        testCase(onError2);
      }, onError2);
    };

    app.utility2.testMerge = function (testReport1, testReport2) {
      /*
        this function will
        1. merge testReport2 into testReport1
        2. return testReport1 in html-format
      */
      var errorStackList, testCaseNumber, testReport;
      // 1. merge testReport2 into testReport1
      [testReport1, testReport2].forEach(function (testReport, ii) {
        ii += 1;
        app.utility2.setDefault(testReport, -1, {
          date: new Date().toISOString(),
          errorStackList: [],
          testPlatformList: [],
          timeElapsed: 0
        });
        // security - handle malformed testReport
        app.utility2.assert(
          testReport && typeof testReport === 'object',
          ii + ' invalid testReport ' + typeof testReport
        );
        app.utility2.assert(
          typeof testReport.timeElapsed === 'number',
          ii + ' invalid testReport.timeElapsed ' + typeof testReport.timeElapsed
        );
        // security - handle malformed testReport.testPlatformList
        testReport.testPlatformList.forEach(function (testPlatform) {
          app.utility2.setDefault(testPlatform, -1, {
            name: 'undefined',
            testCaseList: [],
            timeElapsed: 0
          });
          app.utility2.assert(
            typeof testPlatform.name === 'string',
            ii + ' invalid testPlatform.name ' + typeof testPlatform.name
          );
          // insert $MODE_BUILD into testPlatform.name
          if (app.utility2.envDict.MODE_BUILD) {
            testPlatform.name = testPlatform.name.replace(
              (/^(browser|node|phantom|slimer)\b/),
              app.utility2.envDict.MODE_BUILD + ' - $1'
            );
          }
          app.utility2.assert(
            typeof testPlatform.timeElapsed === 'number',
            ii + ' invalid testPlatform.timeElapsed ' + typeof testPlatform.timeElapsed
          );
          // security - handle malformed testReport.testPlatformList.testCaseList
          testPlatform.testCaseList.forEach(function (testCase) {
            app.utility2.setDefault(testCase, -1, {
              errorStack: '',
              name: 'undefined',
              timeElapsed: 0
            });
            app.utility2.assert(
              typeof testCase.errorStack === 'string',
              ii + ' invalid testCase.errorStack ' + typeof testCase.errorStack
            );
            app.utility2.assert(
              typeof testCase.name === 'string',
              ii + ' invalid testCase.name ' + typeof testCase.name
            );
            app.utility2.assert(
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
        testPlatform.status = testPlatform.testsFailed
          ? 'failed'
          : testPlatform.testsPending
          ? 'pending'
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
        app.utility2._timeElapsedStop(testReport);
      }
      // 2. return testReport1 in html-format
      // json-copy testReport, which will be modified for html templating
      testReport = app.utility2.jsonCopy(testReport1);
      // update timeElapsed
      app.utility2._timeElapsedStop(testReport);
      testReport.testPlatformList.forEach(function (testPlatform) {
        app.utility2._timeElapsedStop(testPlatform);
        testPlatform.testCaseList.forEach(function (testCase) {
          app.utility2._timeElapsedStop(testCase);
          testPlatform.timeElapsed =
            Math.max(testPlatform.timeElapsed, testCase.timeElapsed);
        });
        // update testReport.timeElapsed with testPlatform.timeElapsed
        testReport.timeElapsed = Math.max(testReport.timeElapsed, testPlatform.timeElapsed);
      });
      // create html test-report
      testCaseNumber = 0;
      return app.utility2.textFormat(
        app.utility2.fileCacheDict['/test/test-report.html.template'].data,
        app.utility2.setOverride(testReport, -1, {
          // security - sanitize '<' in text
          CI_COMMIT_INFO: String(app.utility2.envDict.CI_COMMIT_INFO).replace((/</g), '&lt;'),
          envDict: app.utility2.envDict,
          // map testPlatformList
          testPlatformList: testReport.testPlatformList.filter(function (testPlatform) {
            // if testPlatform has no tests, then filter it out
            return testPlatform.testCaseList.length;
          }).map(function (testPlatform, ii) {
            errorStackList = [];
            return app.utility2.setOverride(testPlatform, -1, {
              errorStackList: errorStackList,
              // security - sanitize '<' in text
              name: String(testPlatform.name).replace((/</g), '&lt;'),
              screenCapture: testPlatform.screenCaptureImg
                ? '<a class="testReportPlatformScreenCaptureA" href="' +
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
                return app.utility2.setOverride(testCase, -1, {
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
          testsFailedClass: testReport.testsFailed
            ? 'testReportTestFailed'
            : 'testReportTestPassed'
        }),
        'undefined'
      );
    };

    app.utility2.testRun = function (options) {
      /*
        this function will run the tests in testPlatform.testCaseList
      */
      var exit, onParallel, testPlatform, timerInterval;
      options = options || {};
      app.utility2.modeTest =
        app.utility2.modeTest || app.utility2.envDict.npm_config_mode_npm_test;
      if (!(app.utility2.modeTest || options.modeTest)) {
        return;
      }
      // mock exit
      exit = app.utility2.exit;
      app.utility2.exit = app.utility2.nop;
      // init modeTestCase
      app.utility2.modeTestCase =
        app.utility2.modeTestCase || app.utility2.envDict.npm_config_mode_test_case;
      // reset testPlatform.testCaseList
      app.utility2.testPlatform.testCaseList.length = 0;
      // add tests into testPlatform.testCaseList
      Object.keys(options).forEach(function (key) {
        // add test-case options[key] to testPlatform.testCaseList
        if (key.slice(-5) === '_test' &&
            (app.utility2.modeTestCase === key ||
              (!app.utility2.modeTestCase && key !== '_testRun_failure_test'))) {
          app.utility2.testPlatform.testCaseList.push({
            name: key,
            onTestCase: options[key]
          });
        }
      });
      // if in browser mode, visually refresh test progress until it finishes
      if (app.utility2.modeJs === 'browser') {
        // init _testReportDiv element
        app.utility2._testReportDiv = document.querySelector('.testReportDiv') || { style: {} };
        app.utility2._testReportDiv.style.display = 'block';
        app.utility2._testReportDiv.innerHTML =
          app.utility2.testMerge(app.utility2.testReport, {});
        // update test-report status every 1000 ms until finished
        timerInterval = setInterval(function () {
          // update _testReportDiv in browser
          app.utility2._testReportDiv.innerHTML =
            app.utility2.testMerge(app.utility2.testReport, {});
          // update _istanbulLiteInputTextareDiv
          if (app.utility2.global.istanbul_lite &&
              app.utility2.global.istanbul_lite.coverageReportCreate) {
            app.utility2.global.istanbul_lite.coverageReportCreate();
          }
          if (app.utility2.testReport.testsPending === 0) {
            // cleanup timerInterval
            clearInterval(timerInterval);
          }
        }, 1000);
      }
      onParallel = app.utility2.onParallel(function () {
        /*
          this function will create the test-report after all tests have finished
        */
        var separator, testReport, testReportHtml;
        // restore exit
        app.utility2.exit = exit;
        // init new-line separator
        separator = new Array(56).join('-');
        // init testReport
        testReport = app.utility2.testReport;
        // stop testPlatform timer
        app.utility2._timeElapsedStop(testPlatform);
        // create testReportHtml
        testReportHtml = app.utility2.testMerge(testReport, {});
        // print test-report summary
        console.log('\n' + separator + '\n' +
          testReport.testPlatformList.map(function (testPlatform) {
            return '| test-report - ' + testPlatform.name + '\n|' +
              ('        ' + testPlatform.timeElapsed + ' ms     ').slice(-16) +
              ('        ' + testPlatform.testsFailed + ' failed ').slice(-16) +
              ('        ' + testPlatform.testsPassed + ' passed ').slice(-16) +
              '     |\n' + separator;
          }).join('\n') + '\n');
        switch (app.utility2.modeJs) {
        case 'browser':
          // notify saucelabs of test results
          // https://docs.saucelabs.com/reference/rest-api/#js-unit-testing
          app.utility2.global.global_test_results = {
            coverage: app.utility2.global.__coverage__,
            failed: app.utility2.testReport.testsFailed,
            testReport: app.utility2.testReport
          };
          setTimeout(function () {
            // call callback with number of tests failed
            app.utility2.onErrorExit(app.utility2.testReport.testsFailed);
            // throw global_test_results as an error,
            // so it can be caught and passed to the phantom js-env
            if (app.utility2.modeTest === 'phantom') {
              throw new Error('\nphantom\n' + JSON.stringify({
                global_test_results: app.utility2.global.global_test_results
              }));
            }
          }, 1000);
          break;
        case 'node':
          // create build badge
          app.utility2.fs.writeFileSync(
            app.utility2.envDict.npm_config_dir_build + '/build.badge.svg',
            app.utility2.fileCacheDict['/build/build.badge.svg'].data
              // edit branch name
              .replace(
                (/0000 00 00 00 00 00/g),
                new Date().toISOString().slice(0, 19).replace('T', ' ')
              )
              // edit branch name
              .replace((/- master -/g), '| ' + app.utility2.envDict.CI_BRANCH + ' |')
              // edit commit id
              .replace(
                (/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/g),
                app.utility2.envDict.CI_COMMIT_ID
              )
          );
          // create test-report.badge.svg
          app.utility2.fs.writeFileSync(
            app.utility2.envDict.npm_config_dir_build + '/test-report.badge.svg',
            app.utility2.fileCacheDict['/build/test-report.badge.svg'].data
              // edit number of tests failed
              .replace((/999/g), testReport.testsFailed)
              // edit badge color
              .replace(
                (/d00/g),
                // coverage-hack - cover pass and fail cases
                '0d00'.slice(!!testReport.testsFailed).slice(0, 3)
              )
          );
          // create test-report.html
          console.log('creating test-report ' +
            app.utility2.envDict.npm_config_dir_build + '/test-report.html');
          app.utility2.fs.writeFileSync(
            app.utility2.envDict.npm_config_dir_build + '/test-report.html',
            testReportHtml
          );
          // create test-report.json
          app.utility2.fs.writeFileSync(
            app.utility2.envDict.npm_config_dir_build + '/test-report.json',
            JSON.stringify(app.utility2.testReport)
          );
          // if any test failed, then exit with non-zero exit-code
          setTimeout(function () {
            // finalize testReport
            app.utility2.testMerge(testReport, {});
            console.log('\n' + app.utility2.envDict.MODE_BUILD + ' - ' +
              app.utility2.testReport.testsFailed + ' failed tests\n');
            // call callback with number of tests failed
            app.utility2.onErrorExit(app.utility2.testReport.testsFailed);
          }, 1000);
          break;
        }
      });
      onParallel.counter += 1;
      // init testReport timer
      app.utility2.testReport.timeElapsed = Date.now();
      // init testPlatform
      testPlatform = app.utility2.testPlatform;
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
              app.utility2.errorStack(error));
            testCase.errorStack = testCase.errorStack || app.utility2.errorStack(error);
            // validate errorStack is non-empty
            app.utility2.assert(
              testCase.errorStack,
              'invalid errorStack ' + testCase.errorStack
            );
          }
          // if testCase already finished, then do not run finish code again
          if (finished) {
            return;
          }
          // finish testCase
          finished = true;
          // stop testCase timer
          app.utility2._timeElapsedStop(testCase);
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

    app.utility2.testTryCatch = function (callback, onError) {
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

    app.utility2.textFormat = function (template, dict, valueDefault) {
      /*
        this function will replace the keys in given text template
        with the key / value pairs provided by the dict
      */
      var match, replace, rgx, value;
      dict = dict || {};
      replace = function (match0, fragment) {
        // nop hack to pass jslint
        app.utility2.nop(match0);
        return dict[match].map(function (dict) {
          // recursively format the array fragment
          return app.utility2.textFormat(fragment, dict, valueDefault);
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

    app.utility2._timeElapsedStop = function (options) {
      /*
        this function will stop options.timeElapsed
      */
      if (options.timeElapsed > 0xffffffff) {
        options.timeElapsed = Date.now() - options.timeElapsed;
      }
    };
  }());



  // run browser js-env code
  (function () {
    if (app.utility2.modeJs !== 'browser') {
      return;
    }

    app.utility2.ajax = function (options, onError) {
      /*
        this functions performs a brower ajax request with error handling and timeout
      */
      var data, error, finished, ii, onEvent, timerTimeout, xhr;
      // init event handling
      onEvent = app.utility2.onErrorWithStack(function (event) {
        switch (event.type) {
        case 'abort':
        case 'error':
        case 'load':
          // cleanup timerTimeout
          clearTimeout(timerTimeout);
          // validate finished is falsey
          app.utility2.assert(!finished, finished);
          // set finished to true
          finished = true;
          // validate xhr is defined in _ajaxProgressList
          ii = app.utility2._ajaxProgressList.indexOf(xhr);
          app.utility2.assert(ii >= 0, 'missing xhr in _ajaxProgressList');
          // remove xhr from ajaxProgressList
          app.utility2._ajaxProgressList.splice(ii, 1);
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
            }
          }
          // hide _ajaxProgressDiv
          if (app.utility2._ajaxProgressList.length === 0) {
            app.utility2._ajaxProgressBarHide = setTimeout(function () {
              // hide ajaxProgressBar
              app.utility2._ajaxProgressDiv.style.display = 'none';
              // reset ajaxProgress
              app.utility2._ajaxProgressState = 0;
              app.utility2._ajaxProgressUpdate('0%', 'ajaxProgressBarDivLoading', 'loading');
            }, 1000);
          }
          onError(error, data, xhr);
          break;
        }
        // increment ajaxProgressBar
        if (app.utility2._ajaxProgressList.length > 0) {
          app.utility2._ajaxProgressIncrement();
          return;
        }
        // finish ajaxProgressBar
        app.utility2._ajaxProgressUpdate('100%', 'ajaxProgressBarDivSuccess', 'loaded');
      });
      // init xhr
      xhr = new XMLHttpRequest();
      // debug xhr
      app.utility2._debugXhr = xhr;
      // init event handling
      xhr.addEventListener('abort', onEvent);
      xhr.addEventListener('error', onEvent);
      xhr.addEventListener('load', onEvent);
      xhr.addEventListener('loadstart', app.utility2._ajaxProgressIncrement);
      xhr.addEventListener('progress', app.utility2._ajaxProgressIncrement);
      xhr.upload.addEventListener('progress', app.utility2._ajaxProgressIncrement);
      // set timerTimeout
      timerTimeout = app.utility2.onTimeout(function (errorTimeout) {
        error = errorTimeout;
        xhr.abort();
      }, options.timeout || app.utility2.timeoutDefault, 'ajax');
      // if ajaxProgressBar is hidden, then display it
      if (app.utility2._ajaxProgressList.length === 0) {
        app.utility2._ajaxProgressDiv.style.display = 'block';
      }
      // add xhr to _ajaxProgressList
      app.utility2._ajaxProgressList.push(xhr);
      // open url
      xhr.open(options.method || 'GET', options.url);
      // send request headers
      Object.keys(options.headers || {}).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });
      // clear any pending timer to hide _ajaxProgressDiv
      clearTimeout(app.utility2._ajaxProgressBarHide);
      // send data
      xhr.send(options.data);
    };

    // init _ajaxProgressBarDiv element
    app.utility2._ajaxProgressBarDiv =
      document.querySelector('.ajaxProgressBarDiv') || { className: '', style: {} };

    // init _ajaxProgressDiv element
    app.utility2._ajaxProgressDiv = document.querySelector('.ajaxProgressDiv') || { style: {} };

    app.utility2._ajaxProgressIncrement = function () {
      /*
        this function will increment the ajaxProgressBar
      */
      // this algorithm can indefinitely increment the ajaxProgressBar
      // with successively smaller increments without ever reaching 100%
      app.utility2._ajaxProgressState += 1;
      app.utility2._ajaxProgressUpdate(
        100 - 75 * Math.exp(-0.125 * app.utility2._ajaxProgressState) + '%',
        'ajaxProgressBarDivLoading',
        'loading'
      );
    };

    // init list of xhr used in ajaxProgress
    app.utility2._ajaxProgressList = [];

    // init _ajaxProgressState
    app.utility2._ajaxProgressState = 0;

    app.utility2._ajaxProgressUpdate = function (width, type, label) {
      /*
        this function will visually update the ajaxProgressBar
      */
      app.utility2._ajaxProgressBarDiv.style.width = width;
      app.utility2._ajaxProgressBarDiv.className = app.utility2._ajaxProgressBarDiv.className
        .replace((/ajaxProgressBarDiv\w+/), type);
      app.utility2._ajaxProgressBarDiv.innerHTML = label;
    };
  }());



  // run node js-env code
  (function () {
    if (app.utility2.modeJs !== 'node') {
      return;
    }

    app.utility2.ajax = function (options, onError) {
      /*
        this functions runs a node http request with error handling and timeout
      */
      var finished,
        modeNext,
        onNext,
        request,
        response,
        responseText,
        timerTimeout,
        urlParsed;
      modeNext = 0;
      onNext = app.utility2.onErrorWithStack(function (error, data) {
        modeNext = error instanceof Error ? NaN : modeNext + 1;
        switch (modeNext) {
        case 1:
          // set timerTimeout
          timerTimeout = app.utility2.onTimeout(
            onNext,
            options.timeout || app.utility2.timeoutDefault,
            'ajax ' + options.url
          );
          // init request and response
          request = response = { destroy: app.utility2.nop };
          // handle implicit localhost
          if (options.url[0] === '/') {
            options.url = 'http://localhost:' + app.utility2.envDict.npm_config_server_port +
              options.url;
          }
          // parse options.url
          urlParsed = app.utility2.url.parse(String(options.url));
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
            typeof options.data === 'string'
            ? Buffer.byteLength(options.data)
            : Buffer.isBuffer(options.data)
            ? options.data.length
            : 0;
          // make http request
          request = (urlParsed.protocol === 'https:' ? app.utility2.https : app.utility2.http)
            .request(options, onNext)
            // handle error event
            .on('error', onNext);
          // debug ajax request
          app.utility2._debugAjaxRequest = request;
          // send request and/or data
          request.end(options.data);
          break;
        case 2:
          response = error;
          // debug ajax response
          app.utility2._debugAjaxResponse = response;
          app.utility2.streamReadAll(response, onNext);
          break;
        case 3:
          // init responseText
          responseText = options.resultType === 'binary' ? data : data.toString();
          // error handling for http status code >= 400
          if (response.statusCode >= 400) {
            onNext(new Error(responseText));
            return;
          }
          // successful response
          onNext();
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
          }
          onError(error, responseText, options);
        }
      });
      onNext();
    };

    app.utility2.fileCacheAndParse = function (options) {
      /*
        this function will parse options.file and cache it to fileCacheDict
      */
      // read options.data from options.file and comment out shebang
      options.data = options.data ||
        app.utility2.fs.readFileSync(options.file, 'utf8').replace((/^#!/), '//#!');
      // if coverage-mode is enabled, then cover options.data
      if (app.utility2.global.__coverage__ &&
          options.coverage && options.coverage === app.utility2.envDict.npm_package_name) {
        options.data = app.utility2.istanbul_lite.instrumentSync(options.data, options.file);
      }
      // cache options to fileCacheDict[options.cache]
      if (options.cache) {
        app.utility2.fileCacheDict[options.cache] = options;
      }
    };

    app.utility2.onFileModifiedRestart = function (file) {
      /*
        this function will watche the file and if modified, then restart the process
      */
      if (app.utility2.envDict.npm_config_mode_auto_restart &&
          app.utility2.fs.statSync(file).isFile()) {
        app.utility2.fs.watchFile(file, {
          interval: 1000,
          persistent: false
        }, function (stat2, stat1) {
          if (stat2.mtime > stat1.mtime) {
            app.utility2.exit(1);
          }
        });
      }
    };

    app.utility2.phantomScreenCapture = function (options, onError) {
      /*
        this function will spawn phantomjs to screen-capture options.url
      */
      app.utility2.phantomTest(app.utility2.setDefault(options, 1, {
        modePhantom: 'screenCapture',
        timeoutScreenCapture: 2000
      }), onError);
    };

    app.utility2.phantomTest = function (options, onError) {
      /*
        this function will spawn both phantomjs and slimerjs to test options.url
      */
      var onParallel;
      onParallel = app.utility2.onParallel(onError);
      onParallel.counter += 1;
      ['phantomjs', 'slimerjs'].forEach(function (argv0) {
        var optionsCopy;
        // if slimerjs is not available, then do not use it
        if (argv0 === 'slimerjs' && (!app.utility2.envDict.npm_config_mode_slimerjs ||
          app.utility2.envDict.npm_config_mode_no_slimerjs)) {
          return;
        }
        // copy options to create separate phantomjs / slimerjs state
        optionsCopy = app.utility2.jsonCopy(options);
        optionsCopy.argv0 = argv0;
        // run phantomjs / slimerjs instance
        onParallel.counter += 1;
        app.utility2._phantomTestSingle(optionsCopy, function (error) {
          // save phantomjs / slimerjs state to options
          options[argv0] = optionsCopy;
          onParallel(error);
        });
      });
      onParallel();
    };

    app.utility2._phantomTestSingle = function (options, onError) {
      /*
        this function will spawn either phantomjs or slimerjs to test options.url
      */
      var modeNext, onNext, onParallel, timerTimeout;
      modeNext = 0;
      onNext = function (error) {
        modeNext = error instanceof Error ? NaN : modeNext + 1;
        switch (modeNext) {
        case 1:
          options.argv1 = app.utility2.envDict.MODE_BUILD + '.' + options.argv0 + '.' +
            encodeURIComponent(app.utility2.url.parse(options.url).pathname);
          app.utility2.setDefault(options, 1, {
            _testSecret: app.utility2._testSecret,
            fileCoverage:
              app.utility2.envDict.npm_config_dir_tmp + '/coverage.' + options.argv1 + '.json',
            fileScreenCapture: (app.utility2.envDict.npm_config_dir_build +
              '/screen-capture.' + options.argv1 + '.png')
              .replace((/%/g), '_')
              .replace((/_2F.png$/), 'png'),
            fileTestReport: app.utility2.envDict.npm_config_dir_tmp +
              '/test-report.' + options.argv1 + '.json',
            modePhantom: 'testUrl'
          });
          // set timerTimeout
          timerTimeout =
            app.utility2.onTimeout(onNext, app.utility2.timeoutDefault, options.argv1);
          // spawn phantomjs to test a url
          app.utility2.child_process
            .spawn(
              require('phantomjs-lite').__dirname + '/' + options.argv0,
              [
                // coverage-hack - cover utility2 in phantomjs
                app.utility2.global.__coverage__ &&
                  app.utility2.envDict.npm_package_name === 'utility2'
                  ? app.utility2.envDict.npm_config_dir_tmp + '/covered.utility2.js'
                  : __dirname + '/index.js',
                encodeURIComponent(JSON.stringify(options))
              ],
              { stdio: 'inherit' }
            )
            .on('exit', onNext);
          break;
        case 2:
          options.exitCode = error;
          onParallel = app.utility2.onParallel(onNext);
          onParallel.counter += 1;
          // merge coverage and test-report
          [options.fileCoverage, options.fileTestReport].forEach(function (file, ii) {
            onParallel.counter += 1;
            app.utility2.fs.readFile(file, 'utf8', function (error, data) {
              // nop hack to pass jslint
              app.utility2.nop(error);
              try {
                data = JSON.parse(data);
              } catch (ignore) {
              }
              if (data) {
                // merge coverage
                if (ii === 0) {
                  app.utility2.istanbulMerge(app.utility2.global.__coverage__, data);
                // merge test-report
                } else if (options.modePhantom === 'testUrl' && !options.modeErrorIgnore) {
                  app.utility2.testMerge(app.utility2.testReport, data);
                }
              }
              onParallel();
            });
          });
          onParallel();
          break;
        case 3:
          onNext(
            options.exitCode && new Error(options.argv0 + ' exit-code ' + options.exitCode)
          );
          break;
        default:
          // cleanup timerTimeout
          clearTimeout(timerTimeout);
          onError(error);
        }
      };
      onNext();
    };

    app.utility2.replStart = function (globalDict) {
      /*
        this function will start the repl debugger
      */
      /*jslint
        evil: true
      */
      Object.keys(globalDict).forEach(function (key) {
        app.utility2.global[key] = globalDict[key];
      });
      // start repl server
      app.utility2._replServer = require('repl').start({ useGlobals: true });
      // save repl eval function
      app.utility2._replServer.evalDefault = app.utility2._replServer.eval;
      // hook custom repl eval function
      app.utility2._replServer.eval = function (script, context, file, onError) {
        var match;
        match = (/^([^ ]+)(.*)\n/).exec(script);
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
          app.utility2.child_process
            .spawn(
              '/bin/sh',
              ['-c', '. ' + __dirname + '/index.sh && ' + match[2]],
              { stdio: ['ignore', 1, 2] }
            )
            // on shell exit, print return prompt
            .on('exit', function () {
              app.utility2._replServer.evalDefault('\n', context, file, onError);
            });
          return;
        // syntax sugar to grep current dir
        case 'grep':
          // run async shell command
          app.utility2.child_process
            .spawn(
              '/bin/sh',
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
              app.utility2._replServer.evalDefault('\n', context, file, onError);
            });
          return;
        // syntax sugar to print stringified arg
        case 'print':
          script = 'console.log(String(' + match[2] + '))\n';
          break;
        }
        // eval modified script
        app.utility2._replServer.evalDefault(script, context, file, onError);
      };
    };

    app.utility2.serverRespondDefault = function (request, response, statusCode, error) {
      /*
        this function will respond with a default message,
        or error stack for the given statusCode
      */
      // set response / statusCode / contentType
      app.utility2.serverRespondWriteHead(request, response, statusCode, {
        'Content-Type': 'text/plain; charset=utf-8'
      });
      if (error) {
        // if modeErrorIgnore is undefined in url search params,
        // then print error.stack to stderr
        if (!(/\?.*\bmodeErrorIgnore=1\b/).test(request.url)) {
          app.utility2.onErrorDefault(error);
        }
        // end response with error.stack
        response.end(app.utility2.errorStack(error));
        return;
      }
      // end response with default statusCode message
      response.end(statusCode + ' ' + app.utility2.http.STATUS_CODES[statusCode]);
    };

    app.utility2.serverRespondEcho = function (request, response) {
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

    app.utility2.serverRespondWriteHead = function (request, response, statusCode, headers) {
      /*
        this function will set the response object's statusCode / headers
      */
      // nop hack to pass jslint
      app.utility2.nop(request);
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

    app.utility2.streamReadAll = function (readableStream, onError) {
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

    app.utility2.testMiddleware = function (request, response, onNext) {
      /*
        this builtin test-middleware will
        1. redirect '/' to '/test/test.html'
        2. serve '/assets/utility2.css' from builtin test-library
        3. serve '/assets/utility2.js' from builtin test-library
        4. serve '/test/test.js' from user-defined test-code
        5. serve '/test/test.html' from builtin test-page
      */
      switch (request.urlPathNormalized) {
      // 1. redirect '/' to '/test/test.html'
      case '/':
        app.utility2.serverRespondWriteHead(request, response, 303, {
          'Location': request.url.replace('/', '/test/test.html')
        });
        response.end();
        break;
      case '/assets/istanbul-lite.js':
      // 2. serve '/assets/utility2.css' from builtin test-library
      case '/assets/utility2.css':
      // 3. serve '/assets/utility2.js' from builtin test-library
      case '/assets/utility2.js':
      // 4. serve '/test/test.js' from user-defined test-file
      case '/test/test.js':
        response.end(app.utility2.fileCacheDict[request.urlPathNormalized].data);
        break;
      // 5. serve '/test/test.html' from builtin test-page
      case '/test/test.html':
        response.end(app.utility2.textFormat(app.utility2.fileCacheDict[
          request.urlPathNormalized
        ].data, { envDict: app.utility2.envDict }));
        break;
      // fallback to next middleware
      default:
        onNext();
      }
    };

    app.utility2.testRunServer = function (options) {
      /*
        this function will
        1. create http-server from options.serverMiddlewareList
        2. start http-server on port $npm_config_server_port
        3. if env var $npm_config_mode_npm_test is defined, then run tests
      */
      var server;
      // if $npm_config_timeout_exit is defined,
      // then exit this process after $npm_config_timeout_exit ms
      if (Number(app.utility2.envDict.npm_config_timeout_exit)) {
        setTimeout(app.utility2.exit, Number(app.utility2.envDict.npm_config_timeout_exit))
          // keep timerTimeout from blocking the process from exiting
          .unref();
      }
      // init assets
      [{
        cache: '/assets/istanbul-lite.js',
        data: app.utility2.istanbul_lite.istanbulLiteJs
      }, {
        cache: '/assets/utility2.js',
        coverage: 'utility2',
        file: __filename
      }].forEach(function (options) {
        if (!app.utility2.fileCacheDict[options.cache]) {
          app.utility2.fileCacheAndParse(options);
        }
      });
      // coverage-hack - cover utility2 in phantomjs
      if (app.utility2.global.__coverage__ &&
          app.utility2.envDict.npm_package_name === 'utility2') {
        app.utility2.fs.writeFileSync(
          app.utility2.envDict.npm_config_dir_tmp + '/covered.utility2.js',
          app.utility2.fileCacheDict['/assets/utility2.js'].data
        );
      }
      // 1. create http-server from options.serverMiddlewareList
      server = app.utility2.http.createServer(function (request, response) {
        var contentTypeDict, modeNext, onNext;
        modeNext = -2;
        onNext = function (error) {
          modeNext = error instanceof Error ? NaN : modeNext + 1;
          if (modeNext === -1) {
            // debug server request
            app.utility2._debugServerRequest = request;
            // debug server response
            app.utility2._debugServerResponse = response;
            // check if _testSecret is valid
            request._testSecretValid = (/\b_testSecret=(\w+)\b/).exec(request.url);
            request._testSecretValid = request._testSecretValid &&
              request._testSecretValid[1] === app.utility2._testSecret;
            // init request.urlPathNormalized
            request.urlPathNormalized =
              app.utility2.path.resolve(app.utility2.url.parse(request.url).pathname);
            // init Content-Type header
            contentTypeDict = {
              '.css': 'text/css; charset=UTF-8',
              '.html': 'text/html; charset=UTF-8',
              '.js': 'application/javascript; charset=UTF-8',
              '.json': 'application/json; charset=UTF-8',
              '.txt': 'text/txt; charset=UTF-8'
            };
            app.utility2.serverRespondWriteHead(request, response, null, {
              'Content-Type': contentTypeDict[
                app.utility2.path.extname(request.urlPathNormalized)
              ]
            });
            onNext();
            return;
          }
          if (modeNext < options.serverMiddlewareList.length) {
            options.serverMiddlewareList[modeNext](request, response, onNext);
            return;
          }
          // if error occurred, then respond with '500 Internal Server Error'
          // else respond with '404 Not Found'
          app.utility2.serverRespondDefault(request, response, error ? 500 : 404, error);
        };
        onNext();
      });
      // if $npm_config_server_port is undefined,
      // then assign it a random integer in the inclusive range 1 to 0xffff
      app.utility2.envDict.npm_config_server_port =
        app.utility2.envDict.npm_config_server_port ||
        ((Math.random() * 0x10000) | 0x8000).toString();
      // 2. start http-server on port $npm_config_server_port
      server.listen(app.utility2.envDict.npm_config_server_port, function () {
        console.log(
          'http-server listening on port ' + app.utility2.envDict.npm_config_server_port
        );
        app.utility2.onReady();
      });
      // 3. if env var $npm_config_mode_npm_test is defined, then run tests
      app.utility2.onReady.onReady = function () {
        app.utility2.testRun(options);
      };
      app.utility2.onReady.counter += 1;
      return server;
    };

    // init assets
    [{
      cache: '/test/test.html',
      data: app.utility2.fs.readFileSync(process.cwd() + '/README.md', 'utf8')
        .replace((/[\S\s]+?(<!DOCTYPE html>[\S\s]+?<\/html>)[\S\s]+/), '$1')
        .replace((/\\n\\$/gm), '')
    }].forEach(function (options) {
      if (!app.utility2.fileCacheDict[options.cache]) {
        app.utility2.fileCacheAndParse(options);
      }
    });
  }());



  // run phantom js-env code
  (function () {
    if (app.utility2.modeJs !== 'phantom') {
      return;
    }

    var modeNext, onNext;
    modeNext = 0;
    onNext = function (error, trace) {
      var data;
      modeNext += 1;
      switch (modeNext) {
      case 1:
        // init __coverage__
        app.utility2.global.__coverage__ = app.utility2.global.__coverage__ || {};
        // init global error handling
        // http://phantomjs.org/api/phantom/handler/on-error.html
        app.utility2.global.phantom.onError = onNext;
        // override utility2 properties
        app.utility2.setOverride(
          app.utility2,
          -1,
          JSON.parse(decodeURIComponent(app.utility2.system.args[1]))
        );
        // if modeErrorIgnore, then suppress console.error and console.log
        if (app.utility2.modeErrorIgnore) {
          console.error = console.log = app.utility2.nop;
        }
        // set timeout for phantom
        app.utility2.onTimeout(
          app.utility2.onErrorExit,
          app.utility2.timeoutDefault,
          app.utility2.url
        );
        // init webpage
        app.utility2.page = app.utility2.webpage.create();
        // init webpage clipRect
        app.utility2.page.clipRect = { height: 768, left: 0, top: 0, width: 1024 };
        // init webpage viewportSize
        app.utility2.page.viewportSize = { height: 768, width: 1024 };
        // init webpage error handling
        // http://phantomjs.org/api/webpage/handler/on-error.html
        app.utility2.page.onError = app.utility2.global.phantom.onError;
        // pipe webpage console.log to stdout
        app.utility2.page.onConsoleMessage = function () {
          console.log.apply(console, arguments);
        };
        // open requested webpage
        app.utility2.page.open(
          // security - insert _testSecret in url without revealing it
          app.utility2.url.replace('{{_testSecret}}', app.utility2._testSecret),
          onNext
        );
        break;
      case 2:
        console.log(app.utility2.argv0 + ' - open ' +
          (error === 'success' ? 'success' : 'fail') +
          ' ' + app.utility2.url);
        switch (app.utility2.modePhantom) {
        // screen-capture webpage after timeoutScreenCapture ms
        case 'screenCapture':
          setTimeout(onNext, app.utility2.timeoutScreenCapture);
          break;
        case 'testUrl':
          if (error !== 'success') {
            onNext(error, trace);
          }
          break;
        }
        break;
      case 3:
        switch (app.utility2.modePhantom) {
        // screen-capture webpage
        case 'screenCapture':
          // save screen-capture
          console.log('creating screen-capture file://' + app.utility2.fileScreenCapture);
          app.utility2.page.render(app.utility2.fileScreenCapture);
          break;
        // handle test-report callback
        case 'testUrl':
          try {
            data = (/\nphantom\n(\{"global_test_results":\{.+)/).exec(error);
            data = data && JSON.parse(data[1]).global_test_results;
          } catch (ignore) {
          }
          if (data) {
            // handle global_test_results passed as error
            // merge coverage
            app.utility2.istanbulMerge(app.utility2.global.__coverage__, data.coverage);
            // merge test-report
            app.utility2.testMerge(app.utility2.testReport, data.testReport);
            // save screen-capture
            app.utility2.page.render(app.utility2.fileScreenCapture);
            // integrate screen-capture into test-report
            data.testReport.testPlatformList[0].screenCaptureImg =
              app.utility2.fileScreenCapture.replace((/^.*\//), '');
            // save test-report
            app.utility2.fs.write(
              app.utility2.fileTestReport,
              JSON.stringify(app.utility2.testReport)
            );
            // exit with number of tests failed as exit-code
            onNext(data.testReport.testsFailed);
            return;
          }
          break;
        }
        // handle webpage error
        // http://phantomjs.org/api/phantom/handler/on-error.html
        if (error && typeof error === 'string') {
          console.error('\n' + app.utility2.argv1 + '\nERROR: ' + error + ' TRACE:');
          (trace || []).forEach(function (t) {
            console.error(' -> ' + (t.file || t.sourceURL) + ': ' + t.line +
              (t.function ? ' (in function ' + t.function + ')' : ''));
          });
          console.error();
        // handle phantom error
        } else {
          app.utility2.onErrorDefault(error);
        }
        onNext(!!error);
        break;
      default:
        setTimeout(function () {
          // save coverage before exiting
          app.utility2.fs.write(
            app.utility2.fileCoverage,
            JSON.stringify(app.utility2.global.__coverage__)
          );
          app.utility2.exit(error);
        });
      }
    };
    onNext();
  }());
}((function (self) {
  'use strict';
  var app;



  // run shared js-env code
  (function () {
    // init app
    app = {};
    // init utility2
    app.utility2 = {};
    app.utility2.modeJs = (function () {
      try {
        return self.phantom.version &&
          typeof require('webpage').create === 'function' && 'phantom';
      } catch (errorCaughtPhantom) {
        try {
          return module.exports && typeof process.versions.node === 'string' &&
            typeof require('http').createServer === 'function' && 'node';
        } catch (errorCaughtNode) {
          return typeof navigator.userAgent === 'string' &&
            typeof document.querySelector('body') === 'object' && 'browser';
        }
      }
    }());
    app.utility2.nop = function () {
      /*
        this function will perform no operation - nop
      */
      return;
    };
  }());
  switch (app.utility2.modeJs) {



  // run browser js-env code
  case 'browser':
    // export utility2
    window.utility2 = app.utility2;
    // init utility2 properties
    app.utility2.envDict = app.utility2.envDict || {};
    app.utility2.exit = app.utility2.nop;
    app.utility2.global = window;
    // parse any url-search-params that matches 'mode*' or '_testSecret' or 'timeoutDefault'
    location.search.replace(
      (/\b(mode[A-Z]\w+|_testSecret|timeoutDefault)=([^#&=]+)/g),
      function (match0, key, value) {
        // nop hack to pass jslint
        app.utility2.nop(match0);
        app.utility2[key] = value;
        // try to parse value as json object
        try {
          app.utility2[key] = JSON.parse(value);
        } catch (ignore) {
        }
      }
    );
    break;



  // run node js-env code
  case 'node':
    // export utility2
    module.exports = app.utility2;
    // require modules
    app.utility2.child_process = require('child_process');
    app.utility2.crypto = require('crypto');
    app.utility2.fs = require('fs');
    app.utility2.http = require('http');
    app.utility2.https = require('https');
    app.utility2.istanbul_lite = require('istanbul-lite');
    app.utility2.jslint_lite = require('jslint-lite');
    app.utility2.path = require('path');
    app.utility2.url = require('url');
    app.utility2.vm = require('vm');
    // init utility2 properties
    app.utility2.__dirname = __dirname;
    app.utility2.envDict = process.env;
    app.utility2.envDict.npm_config_dir_build = process.cwd() + '/.tmp/build';
    app.utility2.envDict.npm_config_dir_tmp = process.cwd() + '/.tmp';
    app.utility2.exit = process.exit;
    app.utility2.global = global;
    // init _testSecret
    (function () {
      var testSecretCreate;
      testSecretCreate = function () {
        app.utility2._testSecret = app.utility2.crypto.randomBytes(32).toString('hex');
      };
      // init _testSecret
      testSecretCreate();
      app.utility2._testSecret = app.utility2.envDict.TEST_SECRET || app.utility2._testSecret;
      // re-init _testSecret every 60 seconds
      setInterval(testSecretCreate, 60000).unref();
    }());
    break;



  // run phantom js-env code
  case 'phantom':
    // export utility2
    self.utility2 = app.utility2;
    // require modules
    app.utility2.fs = require('fs');
    app.utility2.system = require('system');
    app.utility2.webpage = require('webpage');
    // init utility2 properties
    app.utility2.envDict = app.utility2.system.env;
    app.utility2.exit = self.phantom.exit;
    app.utility2.global = self;
    break;
  }



  // run shared js-env code
  (function () {
    // init global debug_print
    app.utility2.global['debug_print'.replace('_p', 'P')] = function (arg) {
      /*
        this function will both print the arg to stderr and return it,
        and jslint will nag you to remove it if used
      */
      // debug arguments
      app.utility2['debug_printArguments'.replace('_p', 'P')] = arguments;
      console.error('\n\n\ndebug_print'.replace('_p', 'P'));
      console.error.apply(console, arguments);
      console.error();
      // return arg for inspection
      return arg;
    };
    app.utility2.errorDefault = new Error('default error');
    app.utility2.testPlatform = {
      name: app.utility2.modeJs === 'browser'
        ? 'browser - ' + navigator.userAgent + ' - ' + new Date().toISOString()
        : app.utility2.modeJs === 'node'
        ? 'node - ' +
          process.platform + ' ' + process.version + ' - ' + new Date().toISOString()
        : (app.utility2.global.slimer ? 'slimer - ' : 'phantom - ') +
          app.utility2.system.os.name + ' ' +
          app.utility2.global.phantom.version.major + '.' +
          app.utility2.global.phantom.version.minor + '.' +
          app.utility2.global.phantom.version.patch + ' - ' + new Date().toISOString(),
      screenCaptureImg: app.utility2.envDict.MODE_BUILD_SCREEN_CAPTURE,
      testCaseList: []
    };
    app.utility2.testReport = { testPlatformList: [app.utility2.testPlatform] };
    app.utility2.textExampleAscii = app.utility2.textExampleAscii ||
      '\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f' +
      '\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f' +
      ' !"#$%&\'()*+,-./0123456789:;<=>?' +
      '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_' +
      '`abcdefghijklmnopqrstuvwxyz{|}~\x7f';
    app.utility2.timeoutDefault =
      app.utility2.envDict.npm_config_timeout_default || app.utility2.timeoutDefault || 30000;
  }());



  // init fileCacheDict
  app.utility2.fileCacheDict = {
    '/test/test-report.html.template': { data: String() +
      '<style>\n' +
      '.testReportPlatformDiv {\n' +
        'border: 1px solid;\n' +
        'border-radius: 5px;\n' +
        'font-family: Helvetical Neue, Helvetica, Arial, sans-serif;\n' +
        'margin-top: 20px;\n' +
        'padding: 0 10px 10px 10px;\n' +
        'text-align: left;\n' +
      '}\n' +
      '.testReportPlatformPre {\n' +
        'background-color: #fdd;\n' +
        'border: 1px;\n' +
        'border-radius: 0 0 5px 5px;\n' +
        'border-top-style: solid;\n' +
        'margin-bottom: 0;\n' +
        'padding: 10px;\n' +
      '}\n' +
      '.testReportPlatformPreHidden {\n' +
        'display: none;\n' +
      '}\n' +
      '.testReportPlatformScreenCaptureA {\n' +
        'border: 1px solid;\n' +
        'border-color: #000;\n' +
        'display:block;\n' +
        'margin: 5px 0 5px 0;\n' +
        'max-height:256px;\n' +
        'max-width:320px;\n' +
        'overflow:hidden;\n' +
      '}\n' +
      '.testReportPlatformScreenCaptureImg {\n' +
        'max-width:320px;\n' +
      '}\n' +
      '.testReportPlatformSpan {\n' +
        'display: inline-block;\n' +
        'width: 8em;\n' +
      '}\n' +
      '.testReportPlatformTable {\n' +
        'border: 1px;\n' +
        'border-top-style: solid;\n' +
        'text-align: left;\n' +
        'width: 100%;\n' +
      '}\n' +
      '.testReportSummaryDiv {\n' +
        'background-color: #bfb;\n' +
      '}\n' +
      '.testReportSummarySpan {\n' +
        'display: inline-block;\n' +
        'width: 6.5em;\n' +
      '}\n' +
      'tr:nth-child(odd).testReportPlatformTr {\n' +
        'background-color: #bfb;\n' +
      '}\n' +
      '.testReportTestFailed {\n' +
        'background-color: #f99;\n' +
      '}\n' +
      '.testReportTestPending {\n' +
        'background-color: #99f;\n' +
      '}\n' +
      '</style>\n' +
      '<div class="testReportPlatformDiv testReportSummaryDiv">\n' +
      '<h2>{{envDict.npm_package_name}} test-report summary</h2>\n' +
      '<h4>\n' +
        '<span class="testReportSummarySpan">version</span>-\n' +
          '{{envDict.npm_package_version}}<br>\n' +
        '<span class="testReportSummarySpan">test date</span>- {{date}}<br>\n' +
        '<span class="testReportSummarySpan">commit info</span>- {{CI_COMMIT_INFO}}<br>\n' +
      '</h4>\n' +
      '<table class="testReportPlatformTable">\n' +
      '<thead><tr>\n' +
        '<th>total time elapsed</th>\n' +
        '<th>total tests failed</th>\n' +
        '<th>total tests passed</th>\n' +
        '<th>total tests pending</th>\n' +
      '</tr></thead>\n' +
      '<tbody><tr>\n' +
        '<td>{{timeElapsed}} ms</td>\n' +
        '<td class="{{testsFailedClass}}">{{testsFailed}}</td>\n' +
        '<td>{{testsPassed}}</td>\n' +
        '<td>{{testsPending}}</td>\n' +
      '</tr></tbody>\n' +
      '</table>\n' +
      '</div>\n' +
      '{{#testPlatformList}}\n' +
      '<div class="testReportPlatformDiv">\n' +
      '<h4>\n' +
        '{{testPlatformNumber}}. {{name}}<br>\n' +
        '{{screenCapture}}\n' +
        '<span class="testReportPlatformSpan">time elapsed</span>- {{timeElapsed}} ms<br>\n' +
        '<span class="testReportPlatformSpan">tests failed</span>- {{testsFailed}}<br>\n' +
        '<span class="testReportPlatformSpan">tests passed</span>- {{testsPassed}}<br>\n' +
        '<span class="testReportPlatformSpan">tests pending</span>- {{testsPending}}<br>\n' +
      '</h4>\n' +
      '<table class="testReportPlatformTable">\n' +
      '<thead><tr>\n' +
        '<th>#</th>\n' +
        '<th>time elapsed</th>\n' +
        '<th>status</th>\n' +
        '<th>test case</th>\n' +
      '</tr></thead>\n' +
      '<tbody>\n' +
      '{{#testCaseList}}\n' +
      '<tr class="testReportPlatformTr">\n' +
        '<td>{{testCaseNumber}}</td>\n' +
        '<td>{{timeElapsed}} ms</td>\n' +
        '<td class="{{testReportTestStatusClass}}">{{status}}</td>\n' +
        '<td>{{name}}</td>\n' +
      '</tr>\n' +
      '{{/testCaseList}}\n' +
      '</tbody>\n' +
      '</table>\n' +
      '<pre class="{{testReportPlatformPreClass}}">\n' +
      '{{#errorStackList}}\n' +
      '{{errorStack}}\n' +
      '{{/errorStackList}}\n' +
      '</pre>\n' +
      '</div>\n' +
      '{{/testPlatformList}}\n' +
      String() },



/* jslint-ignore-begin */
    // https://img.shields.io/badge/last_build-0000_00_00_00_00_00_UTC_--_master_--_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-0077ff.svg?style=flat
    '/build/build.badge.svg': { data: '<svg xmlns="http://www.w3.org/2000/svg" width="563" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="563" height="20" fill="#555"/><rect rx="0" x="61" width="502" height="20" fill="#07f"/><path fill="#07f" d="M61 0h4v20h-4z"/><rect rx="0" width="563" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="31.5" y="15" fill="#010101" fill-opacity=".3">last build</text><text x="31.5" y="14">last build</text><text x="311" y="15" fill="#010101" fill-opacity=".3">0000 00 00 00 00 00 UTC - master - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</text><text x="311" y="14">0000 00 00 00 00 00 UTC - master - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</text></g></svg>' },
/* jslint-ignore-end */



    // https://img.shields.io/badge/coverage-100.0%-00dd00.svg?style=flat
/* jslint-ignore-begin */
    '/build/coverage.badge.svg': { data: '<svg xmlns="http://www.w3.org/2000/svg" width="117" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="117" height="20" fill="#555"/><rect rx="0" x="63" width="54" height="20" fill="#0d0"/><path fill="#0d0" d="M63 0h4v20h-4z"/><rect rx="0" width="117" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="32.5" y="15" fill="#010101" fill-opacity=".3">coverage</text><text x="32.5" y="14">coverage</text><text x="89" y="15" fill="#010101" fill-opacity=".3">100.0%</text><text x="89" y="14">100.0%</text></g></svg>' },
/* jslint-ignore-end */



    // https://img.shields.io/badge/tests_failed-999-dd0000.svg?style=flat
/* jslint-ignore-begin */
    '/build/test-report.badge.svg': { data: '<svg xmlns="http://www.w3.org/2000/svg" width="103" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="103" height="20" fill="#555"/><rect rx="0" x="72" width="31" height="20" fill="#d00"/><path fill="#d00" d="M72 0h4v20h-4z"/><rect rx="0" width="103" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="37" y="15" fill="#010101" fill-opacity=".3">tests failed</text><text x="37" y="14">tests failed</text><text x="86.5" y="15" fill="#010101" fill-opacity=".3">999</text><text x="86.5" y="14">999</text></g></svg>' },
/* jslint-ignore-end */



    '/assets/utility2.css': { data: String() +
      '/*csslint\n' +
        'box-model: false\n' +
      '*/\n' +
      '.ajaxProgressBarDiv {\n' +
        'animation: 2s linear 0s normal none infinite ajaxProgressBarDivAnimation;\n' +
        '-o-animation: 2s linear 0s normal none infinite ajaxProgressBarDivAnimation;\n' +
        '-moz-animation: 2s linear 0s normal none infinite ajaxProgressBarDivAnimation;\n' +
        '-webkit-animation: 2s linear 0s normal none infinite ajaxProgressBarDivAnimation;\n' +
        'background-image: linear-gradient(\n' +
          '45deg,rgba(255,255,255,.25) 25%,\n' +
          'transparent 25%,\n' +
          'transparent 50%,\n' +
          'rgba(255,255,255,.25) 50%,\n' +
          'rgba(255,255,255,.25) 75%,\n' +
          'transparent 75%,\n' +
          'transparent\n' +
        ');\n' +
        'background-size: 40px 40px;\n' +
        'color: #fff;\n' +
        'font-family: Helvetical Neue, Helvetica, Arial, sans-serif;\n' +
        'font-size: 12px;\n' +
        'padding: 2px 0 2px 0;\n' +
        'text-align: center;\n' +
        'transition: width .5s ease;\n' +
        'width: 25%;\n' +
      '}\n' +
      '.ajaxProgressBarDivError {\n' +
        'background-color: #d33;\n' +
      '}\n' +
      '.ajaxProgressBarDivLoading {\n' +
        'background-color: #37b;\n' +
      '}\n' +
      '.ajaxProgressBarDivSuccess {\n' +
        'background-color: #3b3;\n' +
      '}\n' +
      '.ajaxProgressDiv {\n' +
        'background-color: #fff;\n' +
        'border: 1px solid;\n' +
        'display: none;\n' +
        'left: 50%;\n' +
        'margin: 0 0 0 -50px;\n' +
        'padding: 5px 5px 5px 5px;\n' +
        'position: fixed;\n' +
        'top: 49%;\n' +
        'width: 100px;\n' +
        'z-index: 9999;\n' +
      '}\n' +
      '@keyframes ajaxProgressBarDivAnimation {\n' +
        'from { background-position: 40px 0; }\n' +
        'to { background-position: 0 0; }\n' +
      '}\n' +
      '@-o-keyframes ajaxProgressBarDivAnimation {\n' +
        'from { background-position: 40px 0; }\n' +
        'to { background-position: 0 0; }\n' +
      '}\n' +
      '@-webkit-keyframes ajaxProgressBarDivAnimation {\n' +
        'from { background-position: 40px 0; }\n' +
        'to { background-position: 0 0; }\n' +
      '}\n' +
      String() }
  };
  return app;
}(this))));
