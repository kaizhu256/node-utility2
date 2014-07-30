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
var exports, required, state, stateRestore, stateRestore2;
stateRestore = function (state2) {
  /*
    this function is used by testMock to restore the local state var
  */
  'use strict';
  state = state2;
};



(function submoduleUtility2Shared() {
  /*
    this shared submodule exports useful utilities
  */
  'use strict';
  var local = {
    _name: 'utility2.submoduleUtility2Shared',

    _init: function () {
      /*
        this function inits the submodule
      */
      // export global object
      if (typeof window === 'object') {
        window.global = window;
      }
      // init module object
      global.module = global.module || {};
      // init _debug_print
      global[['debug', 'Print'].join('')] = local._debug_print;
      // init exports object
      exports = module.exports = {};
      // init state object
      state = exports.state = exports.state || {};
      // init flag indicating whether we are in either browser or nodejs environment
      state.modeNodejs = global.process && process.versions && process.versions.node;
      local.setDefault(state, {
        // default error
        errorDefault: new Error(),
        // cached dict of files
        fileDict: {},
        // mime-type lookup for given file extensions
        mimeLookupDict: {
          '.css': 'text/css',
          '.html': 'text/html',
          '.js': 'application/javascript',
          '.json': 'application/json',
          '.txt': 'text/plain'
        },
        // dict of cli commands
        modeCliDict: {},
        // state to export to browser
        stateBrowser: { fileDict: {} },
        // dict of server-side callbacks used to create test reports from browser tests
        testCallbackDict: {},
        // main test report object used to accumulate test reports from this and other platforms
        testReport: {
          // global code coverage object if it exists
          coverage: global.__coverage__,
          // list of javascript test platforms - e.g. browser / nodejs
          testPlatformList: [{
            // javascript platform name
            name: state.modeNodejs ? 'nodejs - ' + process.platform + ' ' + process.version
              : 'browser - ' + (navigator && navigator.userAgent),
            // list of test cases and their results
            testCaseList: []
          }]
        },
        // default timeout for ajax requests and other async io
        timeoutDefault: 30000
      });
      // init test platform object
      state.testPlatform = state.testReport.testPlatformList[0];
      // init this submodule
      local.initSubmodule(local);
      // init state.testReport
      exports.testReportCreate(state.testReport, {});
    },

    initSubmodule: function (local) {
      /*
        this function inits a submodule's local object
      */
      Object.keys(local).forEach(function (key) {
        var match;
        // add test case to state.testReport
        if (key.slice(-5) === '_test') {
          state.testPlatform.testCaseList.push({
            callback: local[key],
            name: local._name + '.' + key
          });
          return;
        }
        // set dict items to state object
        match = (/(.+Dict)_(.*)/).exec(key);
        if (match) {
          state[match[1]] = state[match[1]] || {};
          state[match[1]][match[2]] = local[key];
          return;
        }
        match = (/(^ngApp_\w+)_(\w+)_(\w+)$/).exec(key);
        if (match) {
          // init angularjs app
          state[match[1]] = state[match[1]] || global.angular.module(match[1], []);
          // init angularjs app's sub-component
          state[match[1]][match[2]](match[3], local[key]);
          return;
        }
        // export items that don't start with an underscore _
        if (key[0] !== '_') {
          exports[key] = local[key];
        }
      });
    },

    _initSubmodule_default_test: function (onEventError) {
      /*
        this function tests initSubmodule's default handling behavior
      */
      var data;
      exports.testMock(onEventError, stateRestore, [
      ], function (onEventError) {
        state = {};
        // test default handling behavior
        exports.initSubmodule({
          // test dict handling behavior
          _aaDict_bb: true,
          _name: '_initSubmodule_default_test'
        });
        // validate state
        data = exports.jsonStringifyOrdered(state);
        exports.assert(data === '{"_aaDict":{"bb":true}}', data);
        onEventError();
      });
    },

    assert: function (passed, message) {
      /*
        this function throws an error if the assertion fails
      */
      if (!passed) {
        throw new Error('assertion error - ' + (
          // if message is a string, then leave it as is
          typeof message === 'string' ? message
          // if message is an Error object, then get its stack trace
          : message instanceof Error ? exports.errorStack(message)
              // else JSON.stringify message
              : JSON.stringify(message)
        ));
      }
    },

    _assert_default_test: function (onEventError) {
      /*
        this function tests assert's default handling behavior
      */
      // test assertion passed
      exports.assert(true, true);
      // test assertion failed
      exports.testTryCatch(function () {
        exports.assert(false);
      }, function (error) {
        // validate error occurred
        exports.assert(error instanceof Error, error);
        // validate error message
        exports.assert(error.message === 'assertion error - undefined', error.message);
      });
      // test assertion failed with text message
      exports.testTryCatch(function () {
        exports.assert(false, '_assert_default_test');
      }, function (error) {
        // validate error occurred
        exports.assert(error instanceof Error, error);
        // validate error message
        exports.assert(
          error.message === 'assertion error - _assert_default_test',
          error.message
        );
      });
      // test assertion failed with error object
      exports.testTryCatch(function () {
        exports.assert(false, state.errorDefault);
      }, function (error) {
        // validate error occurred
        exports.assert(error instanceof Error, error);
        // validate error message
        exports.assert(error.message.indexOf('assertion error - ') === 0, error.message);
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
      exports.nop(_);
      callback();
    },

    callArg2: function (_, __, callback) {
      /*
        this function calls the callback in arg position 2
      */
      // nop hack to pass jslint
      exports.nop(_, __);
      callback();
    },

    callError0: function (onEventError) {
      /*
        this function calls the onEventError callback in arg position 0 with an error object
      */
      onEventError(state.errorDefault);
    },

    callError1: function (_, onEventError) {
      /*
        this function calls the onEventError callback in arg position 1 with an error object
      */
      // nop hack to pass jslint
      exports.nop(_);
      onEventError(state.errorDefault);
    },

    callError2: function (_, __, onEventError) {
      /*
        this function calls the onEventError callback in arg position 2 with an error object
      */
      // nop hack to pass jslint
      exports.nop(_, __);
      onEventError(state.errorDefault);
    },

    _callX_default_test: function (onEventError) {
      /*
        this function tests callX's default handling behavior
      */
      exports.callArg0(function (error) {
        // validate no error occurred
        exports.assert(!error, error);
      });
      exports.callArg1(null, function (error) {
        // validate no error occurred
        exports.assert(!error, error);
      });
      exports.callArg2(null, null, function (error) {
        // validate no error occurred
        exports.assert(!error, error);
      });
      exports.callError0(function (error) {
        // validate error occurred
        exports.assert(error instanceof Error, error);
      });
      exports.callError1(null, function (error) {
        // validate error occurred
        exports.assert(error instanceof Error, error);
      });
      exports.callError2(null, null, function (error) {
        // validate error occurred
        exports.assert(error instanceof Error, error);
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
      exports.testMock(onEventError, stateRestore, [
        [console, { error: function (_) {
          message += (_ || '') + '\n';
        } }]
      ], function (onEventError) {
        message = '';
        local._debug_print('_debug_print_default_test');
        exports.assert(
          message === '\n\n\ndebug' + 'Print\n_debug_print_default_test\n\n',
          message
        );
        onEventError();
      });
    },

    errorStack: function (error) {
      /*
        this function returns the error's stack or message attribute if possible
      */
      return (error && (error.stack || error.message || error)) || '';
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
      data = exports.jsonStringifyOrdered(undefined);
      exports.assert(data === undefined, data);
      // test function handling behavior
      data = exports.jsonStringifyOrdered(exports.nop);
      exports.assert(data === undefined, data);
      // test default handling behavior
      data = exports.jsonStringifyOrdered({
        ee: {},
        dd: [undefined],
        cc: exports.nop,
        bb: 2,
        aa: 1
      });
      exports.assert(data === '{"aa":1,"bb":2,"dd":[null],"ee":{}}', data);
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
        this function performs no operation (nop)
      */
      return;
    },

    onEventErrorDefault: function (error, data) {
      /*
        this function provides a default, error / data handling callback.
        if an error is given, it will print the error's message and stack,
        else it will print the data
      */
      if (error) {
        // print error
        console.error('\nonEventErrorDefault - error\n' + exports.errorStack(error) + '\n');
      // print data if it's defined and not an empty string
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
      exports.testMock(onEventError, stateRestore, [
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
        exports.onEventErrorDefault(null, '_onEventErrorDefault_default_test');
        // validate data message
        exports.assert(message ===
          '\nonEventErrorDefault - data\n"_onEventErrorDefault_default_test"\n', message);
        // test no data handling behavior
        message = null;
        exports.onEventErrorDefault(null, '');
        // validate no message was printed
        exports.assert(message === null, message);
        // test error handling behavior
        message = '';
        exports.onEventErrorDefault(new Error('_onEventErrorDefault_default_test'));
        // validate error message
        exports.assert((/\nonEventErrorDefault - error\n.*_onEventErrorDefault_default_test/)
          .test(message.split('\n').slice(0, 3).join('\n')), JSON.stringify(message));
        onEventError();
      });
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

    _onEventTimeout_timeout_test: function (onEventError) {
      /*
        this function tests onEventTimeout's timeout handling behavior
      */
      var timeElapsed;
      timeElapsed = Date.now();
      exports.onEventTimeout(function (error) {
        exports.testTryCatch(function () {
          // validate error occurred
          exports.assert(error instanceof Error);
          // validate error is timeout error
          exports.assert(error.code === 'ETIMEDOUT');
          timeElapsed = Date.now() - timeElapsed;
          // validate timeElapsed passed is greater than timeout
          // bug - ie might timeout slightly earlier so increase timeElapsed by a small amount
          exports.assert(timeElapsed + 100 >= 2000, timeElapsed);
          onEventError();
        }, onEventError);
      }, 2000, '_onEventTimeout_timeoutError_test');
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
      options = exports.setDefault(
        { aa: 1, bb: {}, cc: [] },
        { aa: 2, bb: { cc: 2 }, cc: [1, 2] }
      );
      // validate options
      exports.assert(
        exports.jsonStringifyOrdered(options) === '{"aa":1,"bb":{"cc":2},"cc":[]}',
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
      options = exports.setOverride(
        { aa: 1, bb: { cc: 2 }, dd: [3, 4], ee: { ff: { gg: 5, hh: 6 } } },
        { aa: 2, bb: { dd: 3 }, dd: [4, 5], ee: { ff: { gg: 6 } } },
        backup,
        2
      );
      // validate backup
      data = exports.jsonStringifyOrdered(backup);
      exports.assert(data === '{"aa":1,"bb":{},"dd":[3,4],"ee":{"ff":{"gg":5,"hh":6}}}', data);
      // validate options
      data = exports.jsonStringifyOrdered(options);
      exports.assert(data ===
        '{"aa":2,"bb":{"cc":2,"dd":3},"dd":[4,5],"ee":{"ff":{"gg":6}}}', data);
      // test restore handling behavior
      exports.setOverride(options, backup);
      // validate backup
      data = exports.jsonStringifyOrdered(backup);
      exports.assert(data === '{"aa":1,"bb":{"dd":3},"dd":[3,4],"ee":{"ff":{"gg":6}}}', data);
      // validate options
      data = exports.jsonStringifyOrdered(options);
      exports.assert(data ===
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

    testMock: function (onEventError, stateRestore, mockList, test) {
      /*
        this function mocks the state given in the mockList while running the test callback
      */
      var onEventError2;
      // prepend mandatory mocks for async / unsafe functions
      mockList = [
        // suppress console.log
        [console, { log: exports.nop }],
        // enforce synchonicity by mocking timers as exports.callArg0
        [global, { setInterval: exports.callArg0, setTimeout: exports.callArg0 }],
        [global.process || {}, { exit: exports.nop }]
      ].concat(mockList);
      onEventError2 = function (error) {
        // restore state
        stateRestore(exports.state);
        mockList.reverse().forEach(function (mock) {
          exports.setOverride(mock[0], mock[2], null, 1);
        });
        onEventError(error);
      };
      // run onEventError callback in mocked state in a try catch block
      try {
        // mock state
        mockList.forEach(function (mock) {
          mock[2] = {};
          exports.setOverride(mock[0], mock[1], mock[2], 1);
        });
        // run test
        test(onEventError2);
      } catch (error) {
        onEventError2(error);
      }
    },

    _testMock_error_test: function (onEventError) {
      /*
        this function tests testMock's error handling behavior
      */
      exports.testMock(function (error) {
        // validate error occurred
        exports.assert(error instanceof Error, error);
        onEventError();
      }, stateRestore, [
      ], function () {
        throw state.errorDefault;
      });
    },

    testReportCreate: function (testReport1, testReport2) {
      /*
        this function merges testReport2 into testReport1 and returns an html test report
      */
      var errorMessageList,
        env,
        file1,
        file2,
        testCaseNumber,
        testPlatform1,
        testReport,
        text,
        timeElapsedParse;
      // part 1 - merge testReport2 into testReport1
      [testReport1, testReport2].forEach(function (testReport, ii) {
        ii += 1;
        exports.setDefault(testReport, {
          date: new Date().toISOString(),
          errorMessageList: [],
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
        // security - handle malformed testReport.errorMessageList
        testReport.errorMessageList.forEach(function (errorMessage) {
          exports.assert(
            typeof errorMessage === 'string',
            ii + ' invalid errorMessage ' + typeof errorMessage
          );
        });
        // security - handle malformed testReport.testPlatformList
        testReport.testPlatformList.forEach(function (testPlatform) {
          exports.setDefault(testPlatform, {
            name: 'undefined',
            testCaseList: [],
            timeElapsed: 0
          });
          exports.assert(
            typeof testPlatform.name === 'string',
            ii + ' invalid testPlatform.name ' + typeof testPlatform.name
          );
          if (state.modeNodejs) {
            testPlatform.name = testPlatform.name.replace(
              (/^(browser|nodejs)/),
              process.env.MODE_CI_BUILD + ' - $1'
            );
          }
          exports.assert(
            typeof testPlatform.timeElapsed === 'number',
            ii + ' invalid testPlatform.timeElapsed ' + typeof testPlatform.timeElapsed
          );
          // security - handle malformed testReport.testPlatformList.testCaseList
          testPlatform.testCaseList.forEach(function (testCase) {
            exports.setDefault(testCase, {
              errorMessage: '',
              name: 'undefined',
              timeElapsed: 0
            });
            exports.assert(
              typeof testCase.errorMessage === 'string',
              ii + ' invalid testCase.errorMessage ' + typeof testCase.errorMessage
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
      // merge errorMessageList
      testReport2.errorMessageList.forEach(function (errorMessage) {
        testReport1.errorMessageList.push(errorMessage);
      });
      // merge testPlatformList
      testReport2.testPlatformList.forEach(function (testPlatform2) {
        testPlatform1 = null;
        testReport1.testPlatformList.forEach(function (_, ii) {
          // replace existing testPlatform1 with testPlatform2
          if (_.name === testPlatform2.name) {
            testPlatform1 = testReport1.testPlatformList[ii] = testPlatform2;
          }
        });
        // push new testPlatform2
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
        testPlatform.status = testPlatform.testsFailed ? 'failed' :
            testPlatform.testsPending ? 'pending' :
                'passed';
        // sort testCaseList by status and name
        testPlatform.testCaseList.sort(function (arg1, arg2) {
          arg1 = arg1.status.replace('passed', 'z') + arg1.name.toLowerCase();
          arg2 = arg2.status.replace('passed', 'z') + arg2.name.toLowerCase();
          return arg1 <= arg2 ? -1 : 1;
        });
        // update testReport.timeElapsed
        if (testPlatform.timeElapsed < 0xffffffff &&
            testPlatform.timeElapsed > testReport.timeElapsed) {
          testReport.timeElapsed = testPlatform.timeElapsed;
        }
      });
      // sort testPlatformList by status and name
      testReport.testPlatformList.sort(function (arg1, arg2) {
        arg1 = arg1.status.replace('passed', 'z') + arg1.name.toLowerCase();
        arg2 = arg2.status.replace('passed', 'z') + arg2.name.toLowerCase();
        return arg1 <= arg2 ? -1 : 1;
      });
      // stop testReport timer
      if (testReport.testsPending === 0 && testReport.timeElapsed > 0xffffffff) {
        testReport.timeElapsed = Date.now() - testReport.timeElapsed;
      }
      // merge remaining items in testReport2 into testReport1
      exports.setDefault(testReport1, testReport2);
      // part 2 - merge testReport2.coverage int testReport1.coverage
      // code derived from istanbul.utils.mergeFileCoverage
      testReport1.coverage = testReport1.coverage || {};
      testReport2.coverage = testReport2.coverage || {};
      Object.keys(testReport2.coverage).forEach(function (key) {
        file1 = testReport1.coverage[key];
        file2 = testReport2.coverage[key];
        // remove derived info
        delete file1.l;
        Object.keys(file2.b).forEach(function (key) {
          file2.b[key].forEach(function (count, ii) {
            file1.b[key][ii] = file1.b[key][ii] || 0;
            file1.b[key][ii] += count;
          });
        });
        Object.keys(file2.f).forEach(function (key) {
          file1.f[key] = file1.f[key] || 0;
          file1.f[key] += file2.f[key];
        });
        Object.keys(file2.s).forEach(function (key) {
          file1.s[key] = file1.s[key] || 0;
          file1.s[key] += file2.s[key];
        });
      });
      // part 3 - create and return html test report
      // create a copy of testReport, which will be modified for html templating
      testReport = JSON.parse(JSON.stringify(testReport));
      // init env
      env = (global.process && process.env) || {};
      timeElapsedParse = function (obj) {
        /*
          this function parses test timeElapsed
        */
        if (obj.timeElapsed > 0xffffffff) {
          obj.timeElapsed = Date.now() - obj.timeElapsed;
        }
      };
      // parse timeElapsed
      timeElapsedParse(testReport);
      testReport.testPlatformList.forEach(function (testPlatform) {
        timeElapsedParse(testPlatform);
        testPlatform.testCaseList.forEach(function (testCase) {
          timeElapsedParse(testCase);
        });
      });
      // create html test report
      testCaseNumber = 0;
      if (!state.fileDict['/public/test-report.html.template']) {
        return;
      }
      return exports.textFormat(
        state.fileDict['/public/test-report.html.template'].data,
        exports.setOverride(testReport, {
          CI_BUILD_NUMBER: env.CI_BUILD_NUMBER,
          // security - sanitize '<' in text
          CI_COMMIT_INFO: String(env.CI_COMMIT_INFO).replace((/</g), '&lt;'),
          // map testPlatformList
          testPlatformList: testReport.testPlatformList.map(function (testPlatform, ii) {
            errorMessageList = [];
            testPlatform.screenshotImg = testPlatform.screenshotImg || (state.modeNodejs && (
              (/PhantomJS/).test(testPlatform.name) ?
                  'test-report.screenshot.phantomjs.png'
                : (/SlimerJS/).test(testPlatform.name) ?
                    'test-report.screenshot.slimerjs.png'
                  : required.fs.existsSync('.build/test-report.screenshot.travis.png') ?
                      'test-report.screenshot.travis.png'
                    : ''
            ));
            return exports.setOverride(testPlatform, {
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
                return exports.setOverride(testCase, {
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
      var remaining, testPlatform, testReport, testReportHtml;
      testReport = state.testReport;
      // start testReport timer
      testReport.timeElapsed = Date.now();
      // init testPlatform
      testPlatform = state.testPlatform;
      // start testPlatform timer
      testPlatform.timeElapsed = Date.now();
      remaining = testPlatform.testCaseList.length;
      testPlatform.testCaseList.forEach(function (testCase) {
        var errorFinished, finished, onEventError;
        if (!testCase.callback) {
          remaining -= 1;
          return;
        }
        onEventError = function (error) {
          if (error) {
            console.error('\ntestCase ' + testCase.name + ' failed\n' +
              exports.errorStack(error));
            // save test error
            testCase.errorMessage = testCase.errorMessage || exports.errorStack(error) || '';
          }
          // error - multiple callbacks in test case
          if (finished) {
            errorFinished = new Error('testCase ' + testCase.name + ' called multiple times');
            exports.onEventErrorDefault(errorFinished);
            // save test error
            testCase.errorMessage = testCase.errorMessage || exports.errorStack(errorFinished);
            return;
          }
          finished = true;
          // stop testCase timer
          testCase.timeElapsed = Date.now() - testCase.timeElapsed;
          // decrement test counter
          remaining -= 1;
          // create test report when all tests have finished
          if (remaining === 0) {
            // stop testPlatform timer
            testPlatform.timeElapsed = Date.now() - testPlatform.timeElapsed;
            testReportHtml = exports.testReportCreate(testReport, {});
            // print test report summary
            console.log(testReport.testPlatformList.map(function (testPlatform) {
              return '\ntest report - ' + testPlatform.name + '\n' +
                ('        ' + testPlatform.timeElapsed).slice(-8) + ' ms | ' +
                (' ' + testPlatform.testsFailed).slice(-2) + ' failed | ' +
                ('  ' + testPlatform.testsPassed).slice(-3) + ' passed';
            }).join('\n') + '\n');
            // nodejs code
            if (state.modeNodejs) {
              // create html test report
              console.log('\ncreating test report file://' + process.cwd() +
                '/.build/test-report.html');
              required.fs.writeFileSync('.build/test-report.html', testReportHtml);
              // create html coverage report
              if (state.modeCoverage) {
                console.log('creating coverage report file://' + process.cwd() +
                  '/.build/coverage-report.html/index.html');
              }
              // create commit badge
              required.fs.writeFileSync(
                '.build/commit.badge.svg',
                state.fileDict['.build/commit.badge.svg']
                  .data
                  // edit commit id
                  .replace('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', process.env.CI_COMMIT_ID)
              );
              // create test report badge
              required.fs.writeFileSync(
                '.build/test-report.badge.svg',
                state.fileDict['.build/test-report.badge.svg']
                  .data
                  // edit coverage badge testReport.testsFailed
                  .replace('999', testReport.testsFailed)
                  // edit coverage badge color
                  .replace('d00', testReport.testsFailed ? 'd00' : '0d0')
              );
              // non-zero exit if tests failed
              setTimeout(function () {
                process.exit(testReport.testsFailed);
              }, 1000);
            // browser code
            } else {
              // notify saucelabs of test results
              global.global_test_results = {
                testReport: state.testReport,
                testCallbackId: state.testCallbackId,
                // extra stuff to keep saucelabs happy - https://saucelabs.com/docs/rest#jsunit
                failed: state.testReport.testsFailed
              };
              if ((/\bmodeTestReportUpload=1\b/).test(location.search)) {
                exports.ajax({
                  data: JSON.stringify(global.global_test_results),
                  method: 'POST',
                  url: '/test/test-report-upload'
                }, function (error) {
                  exports.onEventErrorDefault(error);
                });
              }
            }
          }
        };
        // run test case in try-catch block
        try {
          // start testCase timer
          testCase.timeElapsed = Date.now();
          // ignore utility2 tests in fast mode
          if (state.modeNodejs && state.modeFast && testCase.name.indexOf('utility2.') === 0) {
            onEventError();
            return;
          }
          testCase.callback(onEventError);
        } catch (error) {
          onEventError(error);
        }
      });
    },

    testTryCatch: function (callback, onEventError) {
      /*
        this function calls the callback in a try catch block,
        and falls back to onEventError if an error is thrown
      */
      try {
        callback();
      } catch (error) {
        onEventError(error);
      }
    },

    _testTryCatch_default_test: function (onEventError) {
      /*
        this function tests testTryCatch's default handling behavior
      */
      // test default handling behavior
      exports.testTryCatch(exports.nop, onEventError);
      // test error handling behavior
      exports.testTryCatch(function () {
        throw state.errorDefault;
      }, function (error) {
        // validate error occurred
        exports.assert(error instanceof Error, error);
      });
      onEventError();
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
      data = exports.textFormat('{{aa}}{{aa}}{{bb}}{{bb}}{{cc}}{{cc}}', {
        // test string handling behavior
        aa: 'aa',
        // test non-string handling behavior
        bb: undefined
      });
      exports.assert(data === 'aaaaundefinedundefined{{cc}}{{cc}}', data);
      // test list handling behavior
      data = exports.textFormat('[{{@list1}}[{{@list2}}{{aa}},{{/@list2}}],{{/@list1}}]', {
        list1: [
          // test null handling behavior
          null,
          // test recursive list handling behavior
          { list2: [{ aa: 'bb' }, { aa: 'cc' }] }
        ]
      });
      exports.assert(data === '[[{{@list2}}{{aa}},{{/@list2}}],[bb,cc,],]', data);
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
        exports.nop(_);
        return dict[match].map(function (dict) {
          return exports.textFormat(fragment, dict);
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

    tryCatchHandler: function (onEventError) {
      /*
        this function returns a callback that will call onEventError in a try catch block
      */
      return function (error, data) {
        if (error) {
          onEventError(error);
          return;
        }
        try {
          onEventError(null, data);
        } catch (error2) {
          onEventError(error2);
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
        this function inits the submodule
      */
      var tmp;
      if (state.modeNodejs) {
        return;
      }
      // init this submodule
      exports.initSubmodule(local);
      // init state.timeoutDefault
      tmp = (/\btimeoutDefault=(\d+)\b/).exec(location.search);
      state.timeoutDefault = tmp ? Number(tmp[1]) : state.timeoutDefault;
      // init ajax
      local._initAjax();
      // init test
      local._initTest();
    },

    _initAjax: function () {
      /*
        this function inits the ajax api
      */
      // init ajaxProgressDiv element
      local._ajaxProgressDiv = document.getElementsByClassName('ajaxProgressDiv')[0] ||
        document.createElement('div');
      // init ajaxProgressBarDiv element
      local._ajaxProgressBarDiv = document.getElementsByClassName('ajaxProgressBarDiv')[0] ||
        document.createElement('div');
      // check ajax progress status every second,
      // and hide the ajax progress bar if necessary
      local._ajaxProgressHide();
    },

    __initAjax_noAjaxProgressBar_test: function (onEventError) {
      /*
        this function tests _initAjax's no ajax progress bar handling behavior
      */
      exports.testMock(onEventError, stateRestore, [
        [document, {
          createElement: exports.nop,
          // disable finding ajax progress bar
          getElementsByClassName: function () {
            return [];
          }
        }],
        [local, {
          _ajaxProgressBarDiv: null,
          _ajaxProgressDiv: null,
          _ajaxProgressHide: exports.nop
        }]
      ], function (onEventError) {
        local._initAjax();
        // validate #ajaxProgressBarDiv was not found
        exports.assert(local._ajaxProgressBarDiv === undefined, local._ajaxProgressBarDiv);
        // validate #ajaxProgressDiv was not found
        exports.assert(local._ajaxProgressDiv === undefined, local._ajaxProgressDiv);
        onEventError();
      });
    },

    _initTest: function () {
      /*
        this function inits the test api
      */
      var timerInterval;
      // run tests in test mode
      if (!(/\bmodeTest=1\b/).test(location.search)) {
        return;
      }
      // init testReportDiv element
      state.testReportDiv = document.getElementsByClassName('testReportDiv')[0] || {};
      // save server-side testCallbackId
      state.testCallbackId = (/\btestCallbackId=([^&]+)/).exec(location.search);
      state.testCallbackId = state.testCallbackId && state.testCallbackId[1];
      // todo - implement proper promise
      setTimeout(function () {
        // run tests
        exports.testRun();
        // create initial blank test page
        state.testReportDiv.innerHTML = exports.testReportCreate(state.testReport, {});
        // update test report status every 1000 ms until finished
        timerInterval = setInterval(function () {
          // update state.testReportDiv in browser
          state.testReportDiv.innerHTML = exports.testReportCreate(state.testReport, {});
          if (state.testReport.testsPending === 0) {
            // cleanup timerInterval
            clearInterval(timerInterval);
          }
        }, 1000);
      });
    },

    ajax: function (options, onEventError) {
      /*
        this function implements the the ajax function for the browser
      */
      var data, error, ii, onEventEvent, onEventError2, timerTimeout, xhr;
      // error handling
      onEventError2 = function (error, data) {
        if (error) {
          // add http method / statusCode / url debug info to error.message
          error.message = options.method + ' ' + xhr.status + ' - ' +
            options.url + '\n' +
            JSON.stringify((xhr.responseText || '').slice(0, 256) + '...') + '\n' +
            // trim potentially very long html response
            error.message.slice(0, 4096);
        }
        onEventError(error, data, xhr);
      };
      // event handling
      onEventEvent = function (event) {
        switch (event.type) {
        case 'abort':
        case 'error':
        case 'load':
          // cleanup timerTimeout
          clearTimeout(timerTimeout);
          // remove xhr from ajax progress list
          ii = local._ajaxProgressList.indexOf(xhr);
          if (ii >= 0) {
            local._ajaxProgressList.splice(ii, 1);
          }
          if (!error) {
            // handle abort or error event
            if (event.type === 'abort' || event.type === 'error' || xhr.status >= 400) {
              error = new Error(event.type);
            // handle text data
            } else {
              data = xhr.responseText;
            }
          }
          onEventError2(error, data);
          break;
        }
        // increment ajax progress bar
        if (local._ajaxProgressList.length !== 0) {
          local._ajaxProgressIncrement();
          return;
        }
        // finish ajax progress bar
        switch (event.type) {
        case 'load':
          local._ajaxProgressUpdate('100%', 'ajaxProgressBarDivSuccess', 'loaded');
          break;
        default:
          local._ajaxProgressUpdate('100%', 'ajaxProgressBarDivError', event.type);
        }
      };
      // init xhr object
      xhr = new XMLHttpRequest();
      // debug xhr
      state.debugXhr = xhr;
      // xhr event handling
      xhr.addEventListener('abort', onEventEvent);
      xhr.addEventListener('error', onEventEvent);
      xhr.addEventListener('load', onEventEvent);
      xhr.addEventListener('loadstart', local._ajaxProgressIncrement);
      xhr.addEventListener('progress', local._ajaxProgressIncrement);
      xhr.upload.addEventListener('progress', local._ajaxProgressIncrement);
      // set timerTimeout
      timerTimeout = exports.onEventTimeout(function (timerTimeout) {
        error = timerTimeout;
        xhr.abort();
      }, state.timeoutDefault, 'ajax');
      // display ajax progress bar if hidden
      if (local._ajaxProgressList.length === 0) {
        local._ajaxProgressDiv.style.display = 'block';
      }
      local._ajaxProgressList.push(xhr);
      // open url in xhr
      xhr.open(options.method || 'GET', options.url);
      // init xhr headers
      Object.keys(options.headers || {}).forEach(function (key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });
      // send data through xhr
      xhr.send(options.data);
    },

    _ajax_default_test: function (onEventError) {
      /*
        this function tests ajax's default handling behavior
      */
      exports.ajax({
        url: '/test/hello.json'
      }, function (error, data) {
        exports.testTryCatch(function () {
          // validate no error occurred
          exports.assert(!error, error);
          // validate data
          exports.assert(data === '"hello"', data);
          onEventError();
        }, onEventError);
      });
    },

    _ajaxProgressHide: function () {
      // keep track of how many consecutive cycles ajax progress is complete
      if (local._ajaxProgressList.length === 0 &&
          local._ajaxProgressDiv.style.display !== 'none') {
        local._ajaxProgressHideMode += 1;
        // if ajax progress is complete for 2 consecutive cycles,
        // then hide ajax progress bar and reset ajax progress
        if (local._ajaxProgressHideMode === 2) {
          local._ajaxProgressHideMode = 0;
          // hide ajax progress bar
          local._ajaxProgressDiv.style.display = 'none';
          // reset ajax progress
          local._ajaxProgressState = 0;
          local._ajaxProgressUpdate('0%', 'ajaxProgressBarDivLoading', 'loading');
        }
      } else {
        local._ajaxProgressHideMode = 0;
      }
      // check ajax progress status every second
      setTimeout(local._ajaxProgressHide, 1000);
    },

    _ajaxProgressHideMode: 0,

    _ajaxProgressIncrement: function () {
      /*
        this function increments the ajax progress bar
      */
      // this algorithm can indefinitely increment the ajax progress bar
      // with successively smaller increments without ever reaching 100%
      local._ajaxProgressState += 1;
      local._ajaxProgressUpdate(
        100 - 75 * Math.exp(-0.125 * local._ajaxProgressState) + '%',
        'ajaxProgressBarDivLoading',
        'loading'
      );
    },

    _ajaxProgressList: [],

    _ajaxProgressState: 0,

    _ajaxProgressUpdate: function (width, type, label) {
      /*
        this function visually updates the ajax progress bar
      */
      local._ajaxProgressBarDiv.style.width = width;
      local._ajaxProgressBarDiv.className = local._ajaxProgressBarDiv.className
        .replace((/ajaxProgressBarDiv\w+/), type);
      local._ajaxProgressBarDiv.innerHTML = label;
    },

    // init event handling
    ngApp_utility2_controller_TestController: ['$scope', function ($scope) {
      $scope.runTest = function () {
        location.search = 'modeTest=1';
      };
    }]

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
        this function inits the submodule
      */
      if (!state.modeNodejs) {
        return;
      }
      // init this submodule
      exports.initSubmodule(local);
      // init required object
      required = exports.required = exports.required || {};
      // require builtin modules
      [
        'child_process', 'crypto',
        'fs',
        'http', 'https',
        'path',
        'url',
        'vm'
      ].forEach(function (module) {
        required[module] = required[module] || require(module);
      });
      // require external modules
      [
        'istanbul-lite',
        'jslint-lite'
      ].forEach(function (module) {
        try {
          required[module.replace((/-/g), '_')] = require(module);
        } catch (ignore) {
        }
      });
      // override state with package.json object
      exports.setOverride(state, require(__dirname + '/package.json'));
      // init and watch builtin files
      local._initFile();
      // init main.data
      required.vm.runInNewContext(
        state.fileDict['main.data'].data,
        { exports: exports },
        'main.data'
      );
      // run the following code only if this module is in the root directory
      if (__dirname !== process.cwd()) {
        return;
      }
      // init cli
      local._initCli(process.argv, process.env);
      // init coverage
      local._initCoverage();
      // init repl
      local._initRepl();
      // init server
      local._initServer();
      // re-init and re-watch builtin files
      local._initFile();
    },

    _initCli: function (argv, env) {
      /*
        this function inits the cli
      */
      var tmp;
      // json-copy argv before modifying it
      argv = JSON.parse(JSON.stringify(argv));
      // append env.npm_config_mode_* to argv
      Object.keys(env).forEach(function (key) {
        tmp = (/^npm_config_(mode_.+)/).exec(key);
        if (tmp) {
          argv.push('--' + tmp[1] + '=' + (env[key] || 'false'));
        }
      });
      // parse commandline arguments argv and integrate it into the state dict
      argv.forEach(function (arg) {
        if (arg.indexOf('--') === 0) {
          arg = arg.split('=');
          // --foo=1 -> state.foo = 1
          tmp = arg.slice(1).join('=') ||
            // --foo -> state.foo = true
            true;
          // convert arg to camel case
          arg = arg[0].slice(2).replace((/[\-_][a-z]/g), function (match) {
            return match[1].toUpperCase();
          });
          try {
            state[arg] = JSON.parse(tmp);
          } catch (error) {
            state[arg] = tmp;
          }
        }
      });
      // merge previous test report into current test report
      if (process.env.MODE_TEST_REPORT_MERGE) {
        try {
          exports.testReportCreate(state.testReport, require('./.build/test-report.json'));
        } catch (ignore) {
        }
        // on exit, create .build/test-report.json
        process.on('exit', function () {
          required.fs.writeFileSync(
            '.build/test-report.json',
            JSON.stringify(state.testReport)
          );
        });
      }
      // init cli after all modules have been synchronously loaded
      setTimeout(function () {
        tmp = state.modeCliDict[state.modeCli];
        if (tmp) {
          tmp(argv, exports.onEventErrorDefault);
        }
      });
    },

    __initCli_default_test: function (onEventError) {
      /*
        this function tests _initCli's default handling behavior
      */
      var data;
      exports.testMock(onEventError, stateRestore, [
        [exports, { testReportCreate: exports.nop }],
        [global, { require: exports.nop }]
      ], function (onEventError) {
        state = { modeCliDict: {} };
        local._initCli(['aa', '--bb', '--cc=dd'], {});
        data = exports.jsonStringifyOrdered(state);
        // validate state
        exports.assert(data === '{"bb":true,"cc":"dd","modeCliDict":{}}', data);
        onEventError();
      });
    },

    _initCoverage: function () {
      /*
        this function inits the coverage api
      */
      var coverage;
      // init testReport.coverage object
      Object.keys(global).forEach(function (key) {
        if (key.indexOf('$$cov_') === 0) {
          coverage = state.testReport.coverage;
          // reference state.testReport.coverage to global coverage object
          state.testReport.coverage = global[key];
          // merge old coverage object to the global coverage object
          exports.testReportCreate(state.testReport, { coverage: coverage });
        }
      });
    },

    _initFile: function () {
      /*
        this function inits and watches builtin files
      */
      var parseFile;
      parseFile = function (file) {
        var data;
        data = required.fs.readFileSync(__dirname + '/' + file, 'utf8')
          // comment out shebang
          .replace((/^#!/), '//#!');
        switch (file) {
        case 'example.js':
          state.stateBrowser.fileDict[file] = { data: data, file: file };
          break;
        case 'main.js':
        case 'utility2.js':
          data = data
            // remove nodejs modules from script
            .replace(
              (/^\(function submodule\w*Nodejs\(\) \{[\S\s]*?^\}\(\)\);$/gm),
              function (match) {
                // preserve lineno
                return match.replace((/.*/g), '');
              }
            )
            .trimRight();
          // instrument script if coverage flag is enabled
          if (state.modeCoverage) {
            data = required.istanbul_lite.instrument(data, __dirname + '/' + file);
          }
          break;
        case 'main.data':
        case 'utility2.data':
          data = data.replace(
            (/^\/\* FILE_BEGIN ([\S\s]+?) \*\/$([\S\s]+?)^\/\* FILE_END \*\/$/gm),
            function (_, options, data, ii) {
              // nop hack to pass jslint
              exports.nop(_);
              options = JSON.parse(options);
              // save options to state.fileDict
              state.fileDict[options.file] = options;
              // preserve lineno
              options.data = data.slice(0, ii).replace(/.*/g, '') + data;
              // run actions
              options.actionList.forEach(function (action) {
                (state.fileActionDict[action] || exports.nop)(options);
              });
              // preserve script in data file for export to browser
              return options.actionList.indexOf('exportBrowserScript') >= 0 ? _
                // preserve lineno
                : _.replace((/.*/g), '');
            }
          );
          break;
        }
        return data;
      };
      // init data files
      ['main.data', 'utility2.data'].forEach(function (file) {
        // cache file data to state.fileDict
        state.fileDict[file] = { data: parseFile(file), file: file };
      });
      // run the following code only if this module is in the root directory
      if (__dirname !== process.cwd()) {
        return;
      }
      // watch and auto-init data files
      ['main.data', 'utility2.data'].forEach(function (file) {
        // cleanup any existing watchers on the file
        required.fs.unwatchFile(file);
        // watch the file using 1000 ms polling
        required.fs.watchFile(file, {
          interval: 1000,
          persistent: false
        }, function (stat2, stat1) {
          if (stat2.mtime >= stat1.mtime) {
            // cache file data to state.fileDict
            state.fileDict[file] = { data: parseFile(file), file: file };
          }
        });
      });
      // watch and auto-jslint js files
      ['example.js', 'main.js', 'utility2.js'].forEach(function (file) {
        // cache file data to state.fileDict
        state.fileDict[file] = { data: parseFile(file), file: file };
        // cleanup any existing watchers on the file
        required.fs.unwatchFile(file);
        // watch the file using 1000 ms polling
        required.fs.watchFile(file, {
          interval: 1000,
          persistent: false
        }, function (stat2, stat1) {
          if (stat2.mtime >= stat1.mtime) {
            // if modified, auto-jslint the file
            if (required.jslint_lite && required.jslint_lite.jslint) {
              required.jslint_lite.jslintPrint(
                required.fs.readFileSync(file, 'utf8'),
                file
              );
            }
            // if modified, re-cache file data to state.fileDict
            state.fileDict[file] = { data: parseFile(file), file: file };
          }
        });
      });
    },

    _initRepl: function () {
      /*
        this function inits the ropl debugger
      */
      if (!state.modeRepl) {
        return;
      }
      // export exports
      global.exports = exports;
      // export required
      global.required = required;
      // export state
      global.state = state;
      // start repl
      require('repl').start({
        eval: function (script, __, file, onEventError) {
          // nop hack to pass jslint
          exports.nop(__);
          try {
            onEventError(null, required.vm.runInThisContext(local._replParse(script), file));
          } catch (error) {
            onEventError(error);
          }
        },
        useGlobal: true
      });
    },

    _initServer: function () {
      /*
        this function inits the server
      */
      if (!state.serverPort || state.serverPort === true) {
        return;
      }
      state.serverPort = Math.floor(
        // create random port in the inclusive range 0x8000 - 0xffff
        state.serverPort === 'random' ? (Math.random() * 0xffff) | 0x8000
          : state.serverPort
      );
      // validate state.serverPort
      exports.assert(
        0 < state.serverPort && state.serverPort <= 0xffff,
        'invalid state.serverPort ' + state.serverPort
      );
      // init state.localhost
      state.localhost = 'http://localhost:' + state.serverPort;
      console.log('\nserver starting on port ' + state.serverPort + ' ...');
      // init server with exports.serverMiddleware
      required.http.createServer(function (request, response) {
        exports.serverMiddleware(request, response, function (error) {
          exports.serverRespondDefault(response, error ? 500 : 404, error);
        });
      })
        // set server to listen on state.serverPort
        .listen(state.serverPort, function () {
          console.log('... server started on port ' + state.serverPort);
        });
    },

    ajax: function (options, onEventError) {
      /*
        this functions performs an asynchronous http(s) request with error handling and timeout,
        and passes the responseText to onEventError
      */
      var finished,
        mode,
        onEventMode,
        redirect,
        request,
        response,
        responseText,
        timerTimeout,
        urlParsed;
      mode = 0;
      onEventMode = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          // clear old timerTimeout
          clearTimeout(timerTimeout);
          // set timerTimeout
          timerTimeout = exports.onEventTimeout(
            onEventMode,
            options.timerTimeout || state.timeoutDefault,
            'ajax ' + options.url
          );
          // handle implicit localhost
          if (options.url[0] === '/') {
            options.url = state.localhost + options.url;
          }
          // parse options.url
          urlParsed = required.url.parse(options.url);
          // bug - disable socket pooling, because it causes timerTimeout errors in tls tests
          options.agent = options.agent || false;
          // host needed for redirects
          options.host = urlParsed.host;
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
          request = (options.protocol === 'https:' ? required.https : required.http)
            .request(options, onEventMode)
            // handle error event
            .on('error', onEventMode);
          // debug ajax request
          state.debugAjaxRequest = request;
          // send request and / or data
          request.end(options.data);
          break;
        case 2:
          response = error;
          // debug ajax response
          state.debugAjaxResponse = response;
          // follow redirects
          switch (response.statusCode) {
          case 301:
          case 302:
          case 303:
          case 304:
          case 305:
          case 306:
          case 307:
            mode = -2;
            redirect = true;
            onEventMode();
            return;
          }
          // concat response stream into responseText
          exports.streamReadAll(response, onEventMode);
          break;
        case 3:
          // init responseText
          responseText = options.resultType === 'binary' ? data : data.toString();
          // error handling for http status code >= 400
          if (response.statusCode >= 400) {
            onEventMode(new Error(responseText));
            return;
          }
          // successful response
          onEventMode(null, responseText);
          break;
        default:
          // ignore error / data if already finished
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
            onEventError(error, responseText, response);
            return;
          }
          if (redirect) {
            options.redirected = options.redirected || 8;
            options.redirected -= 1;
            if (options.redirected < 0) {
              onEventMode(new Error('ajax - too many http redirects to ' +
                response.headers.location));
              return;
            }
            options.url = response.headers.location;
            if (options.url && options.url[0] === '/') {
              options.url = options.protocol + '//' + options.host + options.url;
            }
            exports.ajax(options, onEventError);
            return;
          }
          onEventError(null, responseText, response);
        }
      };
      onEventMode();
    },

    _ajax_default_test: function (onEventError) {
      /*
        this function tests ajax's default handling behavior
      */
      exports.ajax({
        url: '/test/hello.json'
      }, function (error, data, response) {
        exports.testTryCatch(function () {
          // validate no error occurred
          exports.assert(!error, error);
          // validate data
          exports.assert(data === '"hello"', data);
          // validate response
          data = JSON.stringify({
            headers: {
              'connection': response.headers.connection,
              'content-type': response.headers['content-type'],
              'transfer-encoding': response.headers['transfer-encoding']
            },
            httpVersion: response.httpVersion,
            statusCode: response.statusCode
          });
          exports.assert(data === JSON.stringify({
            headers: {
              'connection': 'close',
              'content-type': 'application/json',
              'transfer-encoding': 'chunked'
            },
            httpVersion: '1.1',
            statusCode: 200
          }), data);
          onEventError();
        }, onEventError);
      });
    },

    fileActionDict_exportBrowserFile: function (options) {
      /*
        this function exports the file to stateBrowser
      */
      state.stateBrowser.fileDict[options.file] = options;
    },

    fileActionDict_format: function (options) {
      /*
        this function formats the file with the state dict
      */
      options.data = exports.textFormat(options.data, state);
    },

    fileActionDict_install: function (options) {
      /*
        this function installs the file
      */
      // run the following code only if this module is in the root directory
      if (state.modeCli === 'npmInstall' && __dirname === process.cwd()) {
        required.fs.writeFileSync(options.file, options.data);
      }
    },

    fileActionDict_lint: function (options) {
      /*
        this function lints the file
      */
      switch (required.path.extname(options.file)) {
      case '.js':
      case '.json':
        if (required.jslint_lite && required.jslint_lite.jslint) {
          required.jslint_lite.jslintPrint(options.data, options.file);
        }
        break;
      }
    },

    fileActionDict_trim: function (options) {
      /*
        this function trims the file data
      */
      options.data = options.data.trim();
    },

    modeCliDict_coverageReportBadgeCreate: function () {
      /*
        this function creates a coverage badge
      */
      var percent;
      percent = (/Statements: <span class="metric">([.\d]+)/)
        .exec(required.fs.readFileSync('.build/coverage-report.html/index.html', 'utf8'))[1];
      required.fs.writeFileSync(
        '.build/coverage-report.badge.svg',
        state.fileDict['.build/coverage-report.badge.svg']
          .data
          // edit coverage badge percent
          .replace('100.0', percent)
          // edit coverage badge color
          .replace(
            '0d0',
            ('0' + Math.round((100 - Number(percent)) * 2.21).toString(16))
              .slice(-2) +
              ('0' + Math.round(Number(percent) * 2.21).toString(16)).slice(-2) +
              '00'
          )
      );
    },

    _modeCliDict_coverageReportBadgeCreate_default_test: function (onEventError) {
      /*
        this function tests modeCliDict_coverageReportBadgeCreate's default handling behavior
      */
      exports.testMock(onEventError, stateRestore, [
        [required, { fs: {
          readFileSync: function () {
            return 'Statements: <span class="metric">50.0%';
          },
          writeFileSync: exports.nop
        } }]
      ], function (onEventError) {
        local.modeCliDict_coverageReportBadgeCreate();
        onEventError();
      });
    },

    modeCliDict_githubContentsFilePush: function (argv, onEventError) {
      /*
        this function pushes the local file1 to the remote github file2
      */
      var blob, file1, file2, mode, onEventMode, sha;
      mode = 0;
      onEventMode = function (error, data) {
        mode += 1;
        switch (mode) {
        case 1:
          file1 = argv[3];
          file2 = file1.replace(argv[4], argv[5]);
          console.log('pushing file https://' +
            process.env.GITHUB_REPO.replace('/', '.github.io/') + '/' + file2);
          exports.ajax({
            headers: {
              // github oauth authentication
              authorization: 'token ' + process.env.GITHUB_TOKEN,
              // bug - github api requires user-agent header
              'user-agent': 'unknown'
            },
            url: 'https://api.github.com/repos/' + process.env.GITHUB_REPO +
              '/contents/' + required.path.dirname(file2) + '?ref=gh-pages'
          }, onEventMode);
          break;
        case 2:
          blob = required.fs.readFileSync(file1);
          data = data && JSON.parse(data);
          if (Array.isArray(data)) {
            // calculate git blob sha
            sha = required.crypto.createHash('sha1')
              .update('blob ' + blob.length + '\x00')
              .update(blob)
              .digest('hex');
            data.forEach(function (dict) {
              if (dict.path === file2) {
                // no need to update if local and remote git blob sha matches
                if (dict.sha === sha) {
                  process.exit();
                }
                sha = dict.sha;
              }
            });
          }
          exports.ajax({
            data: JSON.stringify({
              branch: 'gh-pages',
              content: blob.toString('base64'),
              message: '[skip ci] update file ' + file2,
              sha: sha
            }),
            headers: {
              // github oauth authentication
              authorization: 'token ' + process.env.GITHUB_TOKEN,
              // bug - github api requires user-agent header
              'user-agent': 'unknown'
            },
            method: 'PUT',
            url: 'https://api.github.com/repos/' + process.env.GITHUB_REPO + '/contents/' + file2
          }, onEventMode);
          break;
        default:
          onEventError(error);
          process.exit(!!error);
        }
      };
      onEventMode();
    },

    _modeCliDict_githubContentsFilePush_default_test: function (onEventError) {
      /*
        this function tests modeCliDict_githubContentsFilePush's default handling behavior
      */
      var ajax1, mode;
      exports.testMock(onEventError, stateRestore, [
        [console, { error: exports.nop }],
        [exports, { ajax: function (_, onEventError) {
          // nop hack to pass jslint
          exports.nop(_);
          mode += 1;
          switch (mode) {
          case 1:
            ajax1(onEventError);
            break;
          case 2:
            onEventError();
            break;
          }
        } }],
        [required, {
          fs: { readFileSync: function () {
            return new Buffer(0);
          } }
        }],
        [process || {}, { argv: [null, null, null, 'aa/cc', 'aa', 'bb'] }]
      ], function (onEventError) {
        // test file create handling behavior
        mode = 0;
        ajax1 = function (onEventError) {
          // test file create handling behavior
          onEventError(null, '{}');
        };
        local.modeCliDict_githubContentsFilePush(process.argv, function (error) {
          exports.testTryCatch(function () {
            // validate no error occurred
            exports.assert(!error, error);
          }, onEventError);
        });
        // test file update handling behavior
        mode = 0;
        ajax1 = function (onEventError) {
          onEventError(null, JSON.stringify([
            // test blob path mismatch handling behavior
            {},
            // test blob sha match handling behavior
            // test file update handling behavior
            { path: 'bb/cc', sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391' },
            // test blob sha mismatch handling behavior
            { path: 'bb/cc' }
          ]));
        };
        local.modeCliDict_githubContentsFilePush(process.argv, function (error) {
          exports.testTryCatch(function () {
            // validate no error occurred
            exports.assert(!error, error);
          }, onEventError);
        });
        onEventError();
      });
    },

    modeCliDict_npmTest: function () {
      /*
        this function runs npm test
      */
      exports.testRun();
    },

    modeCliDict_saucelabsScreenshot: function () {
      /*
        this function grabs screenshots using saucelabs
      */
      [
        {
          file: 'test-report.screenshot.heroku.png',
          url: process.env.HEROKU_URL + '/test/test.html?modeTest=1'
        },
        {
          file: 'test-report.screenshot.travis.png',
          url: 'https://travis-ci.org/' + process.env.GITHUB_REPO
        }
      ].forEach(function (options) {
        local._saucelabsScreenshot(options, exports.onEventErrorDefault);
      });
    },

    modeCliDict_saucelabsTest: function () {
      /*
        this function runs saucelabs tests with the given json options piped from stdin
      */
      var options;
      options = JSON.parse(required.fs.readFileSync('.install/saucelabs-config.json'));
      // init state
      exports.setOverride(state, options.stateOverride);
      // remove stateOverride param
      delete options.stateOverride;
      state.testPlatform.testCaseList = [{
        callback: function (onEventError) {
          local._saucelabsTest(options, onEventError);
        },
        name: local._name + '.__saucelabsTest_default_test'
      }];
      exports.testRun();
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
        delete state.testCallbackDict[testCallbackId];
        onEventError(error);
      };
      // set timerTimeout
      timerTimeout = exports.onEventTimeout(
        onEventError2,
        state.timeoutDefault,
        file
      );
      // init testCallbackId
      testCallbackId = Math.random().toString('36').slice(2);
      state.testCallbackDict[testCallbackId] = onEventError2;
      // spawn a phantomjs / slimerjs process from the given file to test a webpage
      exports.shell({ argv: [
        file,
        '.install/phantomjs-test.js',
        new Buffer(JSON.stringify({ argv0: required.path.basename(file), url: state.localhost +
          '/test/test.html' +
          '?modeTest=1' +
          '&modeTestReportUpload=1' +
          '&testCallbackId=' + testCallbackId +
          '&timeoutDefault=' + state.timeoutDefault })).toString('base64')
      ], modeDebug: false });
    },

    __phantomjsTest_default_test: function (onEventError) {
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
      remaining = 2;
      // run browser test in phantomjs
      local._phantomjsTest(require('phantomjs').path, onEventRemaining);
      // run browser test in slimerjs
      local._phantomjsTest(require('slimerjs').path, onEventRemaining);
    },

    _replParse: function (script) {
      /*
        this function parses repl stdin
      */
      var match;
      // (foo\n) -> foo
      match = (/^\((.*)\n\)/).exec(script);
      if (!match) {
        return script;
      }
      script = match[1];
      // parse '@@' syntax sugar
      while (true) {
        match = (/(.*\w)@@(.*)/).exec(script);
        if (!match) {
          break;
        }
        script = match[1] + '( ' + match[2] + ')';
      }
      match = (/([^ ]*)(.*)/).exec(script);
      if (state.replParseDict[match[1]]) {
        return state.replParseDict[match[1]](match[2]);
      }
      // foo -> (foo\n)
      return '(' + script + '\n)';
    },

    replParseDict_$: function (arg2) {
      /*
        this function runs shell commands from the repl interpreter
      */
      exports.shell({
        argv: ['/bin/bash', '-c', exports.textFormat(arg2, state)],
        modeDebug: false
      });
    },

    replParseDict_print: function (arg2) {
      /*
        this function prints arg2 in stringified form from the repl interpreter
      */
      return '(console.log(String(' + arg2 + '))\n)';
    },

    serverMiddleware: function (request, response, next) {
      var mode, onEventMode, path;
      mode = 0;
      onEventMode = function () {
        mode += 1;
        switch (mode) {
        case 1:
          // debug server request
          state.debugServerRequest = request;
          // debug server response
          state.debugServerResponse = response;
          // security - validate request url path
          path = request.url;
          // security - enforce max url length
          if (path.length <= 4096) {
            // get base path without search params
            path = (/[^#&?]*/).exec(path)[0];
            if (path &&
                // security - enforce max path length
                path.length <= 256 &&
                // security - disallow relative path
                !(/\.\/|\.$/).test(path)) {
              // dyanamic path handler
              request.urlPathNormalized = required.path.resolve(path);
              onEventMode();
              return;
            }
          }
          next(new Error('serverMiddleware - invalid url ' + path));
          break;
        case 2:
          path = request.urlPathNormalized;
          // walk up parent path
          while (!(state.serverRequestHandlerDict[path] || path === '/')) {
            path = required.path.dirname(path);
          }
          // found a handler matching request path
          if (state.serverRequestHandlerDict[path]) {
            // debug server request handler
            state.debugServerHandler = state.serverRequestHandlerDict[path];
            // process request with error handling
            try {
              onEventMode();
            } catch (error) {
              next(error);
            }
          // else move on to next middleware
          } else {
            next();
          }
          break;
        case 3:
          state.serverRequestHandlerDict[path](request, response, next);
          break;
        }
      };
      onEventMode();
    },

    'serverRequestHandlerDict_/': function (request, response, next) {
      if (request.urlPathNormalized === '/') {
        exports.serverRespondData(response, 200, 'text/html', exports.textFormat(
          state.fileDict['/main.html'].data,
          { stateBrowserJson: JSON.stringify(state.stateBrowser) }
        ));
        return;
      }
      // goto next middleware
      next();
    },

    'serverRequestHandlerDict_/public': function (request, response, next) {
      /*
        this function responds with public cached data if it exists
      */
      var options;
      options = {
        '/public/main.data.js': 'main.data',
        '/public/main.js': 'main.js',
        '/public/utility2.data.js': 'utility2.data',
        '/public/utility2.js': 'utility2.js'
      };
      options = state.fileDict[options[request.urlPathNormalized] || request.urlPathNormalized];
      // cached data exists - respond with cached data
      if (options) {
        exports.serverRespondData(
          response,
          200,
          state.mimeLookupDict[
            required.path.extname(request.urlPathNormalized)
          ] || 'application/octet-stream',
          options.data
        );
        return;
      }
      // cached data does not exist - goto next middleware
      next();
    },

    'serverRequestHandlerDict_/test/hello.json': function (_, response) {
      // nop hack to pass jslint
      exports.nop(_);
      exports.serverRespondData(response, 200, 'application/json', '"hello"');
    },

    'serverRequestHandlerDict_/test/test.html': function (_, response) {
      // nop hack to pass jslint
      exports.nop(_);
      exports.serverRespondData(response, 200, 'text/html', exports.textFormat(
        state.fileDict['/test/test.html'].data,
        { stateBrowserJson: JSON.stringify(state.stateBrowser) }
      ));
    },

    'serverRequestHandlerDict_/test/test-report-upload': function (request, response, next) {
      /*
        this function receives and parses uploaded test reports
      */
      var mode, onEventMode;
      mode = 0;
      onEventMode = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          // authenticate request with basic authentication
          if (!state.modeTestReportUpload) {
            next();
            return;
          }
          exports.streamReadAll(
            request,
            // security - use try catch block to parse potential malformed data
            exports.tryCatchHandler(onEventMode)
          );
          break;
        case 2:
          data = JSON.parse(data);
          // debug data
          state.debugTestReportUpload = data;
          // merge data.testReport into state.testReport
          exports.testReportCreate(state.testReport, data.testReport);
          // call testCallbackId callback if it exists
          (state.testCallbackDict[data.testCallbackId] || exports.onEventErrorDefault)(
            data.testReport.testsFailed ? new Error('tests failed') : null
          );
          response.end();
          break;
        default:
          next(error);
        }
      };
      onEventMode();
    },

    serverRespondDefault: function (response, statusCode, error) {
      /*
        this function responds with a default message or error stack for the given statusCode
      */
      // set response / statusCode / contentType
      exports.serverRespondWriteHead(response, statusCode, { 'content-type': 'text/plain' });
      // end response with error stack
      if (error) {
        exports.onEventErrorDefault(error);
        response.end(exports.errorStack(error));
        return;
      }
      // end response with default statusCode message
      response.end(statusCode + ' ' +
        (required.http.STATUS_CODES[statusCode] || 'Unknown Status Code'));
    },

    serverRespondData: function (response, statusCode, contentType, data) {
      /*
        this function responds with the given data
      */
      // set response / statusCode / contentType
      exports.serverRespondWriteHead(response, statusCode, { 'content-type': contentType });
      // end response with data
      response.end(data);
    },

    serverRespondWriteHead: function (response, statusCode, headers) {
      /*
        this function sets the response object's statusCode / headers
      */
      if (!response.headersSent) {
        // set response.statusCode
        response.statusCode = statusCode || response.statusCode;
        Object.keys(headers).forEach(function (key) {
          // set only truthy headers
          if (headers[key]) {
            response.setHeader(key, headers[key]);
          }
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
      // debug shell options
      if (options.modeDebug !== false) {
        console.log('shell - options ' +  JSON.stringify(options));
      }
      // spawn shell in child process
      child = required.child_process.spawn(options.argv[0], options.argv.slice(1), options);
      // set timerTimeoutPid
      timerTimeoutPid = required.child_process.spawn('/bin/sh', ['-c', 'sleep ' +
        ((options.timeout || state.timeoutDefault) / 1000) + '; kill ' + child.pid +
        ' 2>/dev/null'], { stdio: 'ignore' });
      // unref timerTimout process so it can continue tracking the original shell
      // after nodejs exits
      timerTimeoutPid.unref();
      timerTimeoutPid = timerTimeoutPid.pid;
      // debug shell exit code
      child
        // handle error event
        .on('error', exports.onEventErrorDefault)
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
    },

    _saucelabsTest: function (options, onEventError) {
      /*
        this function requests saucelabs to test a webpage
      */
      var completed,
        mode,
        onEventMode,
        onEventRemaining,
        remaining,
        remainingDict,
        remainingError,
        timerInterval,
        timerTimeout;
      mode = 0;
      onEventMode = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          onEventRemaining = function (error) {
            remainingError = remainingError || error;
            remaining -= 1;
            if (remaining === 0) {
              mode = -2;
              onEventMode(remainingError);
            }
          };
          options = {
            data: JSON.stringify(exports.setOverride(options, {
              build: process.env.CI_BUILD_NUMBER_SAUCELABS,
              // specify custom test framework in saucelabs
              framework: 'custom',
              // reduce timeoutDefault to account for saucelabs startup time
              // bug - saucelabs only accepts integers for max-duration
              'max-duration': Math.ceil(Math.max(0.00075 * state.timeoutDefault, 60)),
              url: exports.textFormat(options.url, {
                host: process.env.HEROKU_URL || state.localhost,
                // reduce timeoutDefault to account for max-duration
                timeoutDefault: 0.5 * state.timeoutDefault
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
            url: 'https://saucelabs.com/rest/v1/' + process.env.SAUCE_USERNAME + '/js-tests',
            url0: options.url
          };
          remaining = 0;
          remainingDict = {};
          // set timeout for _saucelabsTest
          timerTimeout = exports.onEventTimeout(
            onEventMode,
            state.timeoutDefault,
            '_saucelabsTest ' + options.url0
          );
          exports.ajax(options, exports.tryCatchHandler(onEventMode));
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
            exports.ajax(exports.setOverride(options, {
              data: JSON.stringify({ 'js tests': Object.keys(remainingDict) }),
              url: 'https://saucelabs.com/rest/v1/' + process.env.SAUCE_USERNAME +
                '/js-tests/status'
            }), exports.tryCatchHandler(onEventMode));
          }, 30000);
          break;
        case 3:
          // check status of polled tests from saucelabs response
          // decrement mode to repeat io loop
          mode -= 1;
          // JSON.parse data
          data = JSON.parse(data);
          completed = completed || data.completed || (/error/).test(data.status);
          data['js tests'].forEach(function (data) {
            if (remainingDict[data.id]) {
              // test finished - remove from remainingDict
              if (completed || data.result || (/error/).test(data.status)) {
                // remove test from remainingDict
                delete remainingDict[data.id];
                // merge browser test report
                local._saucelabsMerge(data, onEventRemaining);
              // test pending - update test status
              } else {
                remainingDict[data.id] = {
                  id: data.id,
                  job_id: data.job_id,
                  platform: data.platform,
                  status: data.status
                };
              }
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
      onEventMode();
    },

    _saucelabsMerge: function (testReport, onEventError) {
      /*
        this function merges the saucelabs test report into state.testReport
      */
      var errorDefault, jobId, mode, onEventMode;
      mode = 0;
      onEventMode = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          // init errorDefault
          errorDefault = new Error(JSON.stringify(testReport));
          // init jobId
          jobId = testReport.job_id;
          // fetch saucelabs logs for the given jobId
          exports.ajax({
            url: 'https://saucelabs.com/jobs/' + jobId + '/log.json'
          }, exports.tryCatchHandler(onEventMode));
          break;
        case 2:
          // JSON.parse data
          data = JSON.parse(data);
          // fetch testReport from saucelabs logs
          data.forEach(function (data) {
            testReport = (data && data.result && data.result.testReport) || testReport;
          });
          // testReport recovery succeeded case
          if (testReport.testPlatformList) {
            // clear errorDefault
            errorDefault = null;
            // capture saucelabs screenshot
            testReport.testPlatformList[0].screenshotImg =
              'https://assets.saucelabs.com/jobs/' + jobId + '/0002screenshot.png';
          }
          onEventMode();
          break;
        default:
          // notify saucelabs of pass / fail test statue
          exports.ajax({
            data: '{"passed":' + !errorDefault + '}',
            headers: {
              authorization: 'Basic ' + new Buffer(process.env.SAUCE_USERNAME +
                ':' + process.env.SAUCE_ACCESS_KEY).toString('base64'),
              'content-type': 'application/json'
            },
            method: 'PUT',
            url: 'https://saucelabs.com/rest/v1/' + process.env.SAUCE_USERNAME + '/jobs/' +
              jobId
          }, exports.nop);
          // testReport recovery failed case
          if (errorDefault) {
            // create a minimal testReport reporting saucelabs internal error
            testReport = { testPlatformList: [{
              name: 'browser - saucelabs ' +
                (testReport.platform || ['unknown user agent']).join(' '),
              testCaseList: [{
                errorMessage: exports.errorStack(errorDefault),
                name: '__saucelabsTest_default_test',
                timeElapsed: testReport.timeElapsed
              }],
              timeElapsed: testReport.timeElapsed
            }] };
            testReport.errorMessageList =
              [testReport.testPlatformList[0].testCaseList[0].errorMessage];
          }
          // merge recovered testReport into state.testReport
          exports.testReportCreate(state.testReport, testReport);
          onEventError(errorDefault);
        }
      };
      onEventMode();
    },

    _saucelabsScreenshot: function (options, onEventError) {
      /*
        this function returns a url for the screenshot captured by saucelabs
      */
      var jobId,
        mode,
        onEventMode,
        remaining,
        screenshotImg,
        timerTimeout;
      mode = 0;
      onEventMode = function (error, data) {
        mode = error instanceof Error ? -1 : mode + 1;
        switch (mode) {
        case 1:
          // set timeout for screenshot to capture in seconds
          exports.setOverride(options, {
            data: JSON.stringify(exports.setOverride(JSON.parse(JSON.stringify(options)), {
              // specify custom test framework in saucelabs
              framework: 'custom',
              // set max-duration timeout in seconds
              // bug - saucelabs only accepts integers for max-duration
              'max-duration': Math.ceil(0.00025 * state.timeoutDefault),
              platforms: [["linux", "googlechrome", ""]],
              // disable video recording for faster performance
              "record-video": false
            })),
            headers: {
              authorization: 'Basic ' + new Buffer(process.env.SAUCE_USERNAME + ':' +
                process.env.SAUCE_ACCESS_KEY).toString('base64'),
              'content-type': 'application/json'
            },
            method: 'POST',
            url: 'https://saucelabs.com/rest/v1/' + process.env.SAUCE_USERNAME + '/js-tests',
            url0: options.url
          });
          remaining = 1;
          // set timeout for _saucelabsScreenshot
          timerTimeout = exports.onEventTimeout(
            onEventMode,
            state.timeoutDefault,
            '_saucelabsScreenshot ' + options.url0
          );
          exports.ajax(options, onEventMode);
          break;
        case 2:
          exports.setOverride(options, {
            data: data,
            url: 'https://saucelabs.com/rest/v1/' + process.env.SAUCE_USERNAME +
              '/js-tests/status'
          });
          onEventMode();
          break;
        case 3:
          setTimeout(function () {
            exports.ajax(options, exports.tryCatchHandler(onEventMode));
          }, 5000);
          break;
        case 4:
          jobId = JSON.parse(data)['js tests'][0].job_id;
          if (jobId === 'job not ready') {
            mode -= 2;
            onEventMode();
            return;
          }
          remaining -= 1;
          if (remaining === 0) {
            screenshotImg = 'https://assets.saucelabs.com/jobs/' + jobId +
              '/0002screenshot.png';
            setTimeout(onEventMode, 0.25 * state.timeoutDefault);
          }
          break;
        case 5:
          // fetch screenshotImg
          exports.ajax({
            resultType: 'binary',
            url: screenshotImg
          }, onEventMode);
          break;
        case 6:
          // save screenshotImg
          console.log('_saucelabsScreenshot - saving screenshot of ' + options.url0 +
            ' to ' + '.build/' + options.file);
          required.fs.writeFile('.build/' + options.file, data, onEventMode);
          break;
        default:
          remaining = -2;
          // cleanup timerTimeout
          clearTimeout(timerTimeout);
          onEventError(error);
        }
      };
      onEventMode();
    }

  };
  local._init();
}());
