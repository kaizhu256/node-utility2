/*jslint
  bitwise: true, browser: true,
  indent: 2,
  maxerr: 8,
  node: true, nomen: true,
  regexp: true,
  stupid: true
*/
(function () {
  /*
    this function will test this module
  */
  'use strict';
  var exports, local;



  // init shared js-env
  (function () {
    // init local
    local = {};
    local.modeJs = (function () {
      try {
        return module.exports && typeof process.versions.node === 'string' &&
          typeof require('child_process').spawn === 'function' && 'node';
      } catch (errorCaughtNode) {
        return typeof navigator.userAgent === 'string' &&
          typeof document.querySelector('body') === 'object' && 'browser';
      }
    }());
    // init exports
    exports = local.modeJs === 'browser' ? window.utility2 : require('./index.js');

    // init tests
    local._ajax_default_test = function (onError) {
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
        // test timeout handling behavior
        timeout: 1,
        url: '/test/timeout'
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

    local._assert_default_test = function (onError) {
      /*
        this function will test assert's default handling behavior
      */
      var error;
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
      // test assertion failed with error object with no error.message and no error.trace
      error = new Error();
      error.message = '';
      error.stack = '';
      exports.testTryCatch(function () {
        exports.assert(false, error);
      }, function (error) {
        // validate error occurred
        exports.assert(error instanceof Error, error);
        // validate error.message
        exports.assert(error.message === 'undefined', error.message);
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

    local._debug_print_default_test = function (onError) {
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

    local._jsonCopy_default_test = function (onError) {
      /*
        this function will test jsonCopy's default handling behavior
      */
      // test various data-type handling behavior
      [undefined, null, false, true, 0, 1, 1.5, 'a'].forEach(function (data) {
        exports.assert(exports.jsonCopy(data) === data, [exports.jsonCopy(data), data]);
      });
      onError();
    };

    local._jsonStringifyOrdered_default_test = function (onError) {
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

    local._onErrorDefault_default_test = function (onError) {
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
        // test no-error handling behavior
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

    local._onParallel_default_test = function (onError) {
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

    local._onTimeout_timeout_test = function (onError) {
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
      // coverage-hack - use 1500 ms to cover setInterval test-report refresh in browser
      }, 1500, '_onTimeout_errorTimeout_test');
    };

    local._setDefault_default_test = function (onError) {
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

    local._setOverride_default_test = function (onError) {
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
      // test override envDict with empty-string handling behavior
      options = exports.setOverride(exports.envDict, 1, { 'emptyString': null });
      // validate options
      exports.assert(options.emptyString === '', options.emptyString);
      onError();
    };

    local._testRun_failure_test = function (onError) {
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

    local._textFormat_default_test = function (onError) {
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
  }());
  switch (local.modeJs) {



  // init browser js-env
  case 'browser':
    window.local = local;
    exports.onErrorExit = function () {
      // test modeTest !== 'phantom' handling behavior
      if (exports.modeTest === 'phantom2') {
        setTimeout(function () {
          throw new Error('\nphantom\n' + JSON.stringify({
            global_test_results: window.global_test_results
          }));
        }, 1000);
      }
    };
    local._modeTest = exports.modeTest;
    exports.modeTest = null;
    exports.testRun();
    exports.modeTest = local._modeTest;
    // run test
    exports.testRun(local);
    break;



  // init node js-env
  case 'node':
    // require modules
    local.fs = require('fs');
    local.path = require('path');

    // init tests
    local._istanbulMerge_default_test = function (onError) {
      /*
        this function will test istanbulMerge's default handling behavior
      */
      var coverage1, coverage2, script;
      script = exports.istanbulCover(
        '(function () {\nreturn arg ? __coverage__ : __coverage__;\n}());',
        'test'
      );
      exports.arg = 0;
      // init coverage1
      coverage1 = exports.vm.runInNewContext(script, { arg: 0 });
      // validate coverage1
      exports.assert(exports.jsonStringifyOrdered(coverage1) === '{"test":{"b":{"1":[0,1]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"f":{"1":1},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"test","s":{"1":1,"2":1},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage1);
      // init coverage2
      coverage2 = exports.vm.runInNewContext(script, { arg: 1 });
      // validate coverage2
      exports.assert(exports.jsonStringifyOrdered(coverage2) === '{"test":{"b":{"1":[1,0]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"f":{"1":1},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"test","s":{"1":1,"2":1},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage2);
      // merge coverage2 into coverage1
      exports.istanbulMerge(coverage1, coverage2);
      // validate merged coverage1
      exports.assert(exports.jsonStringifyOrdered(coverage1) === '{"test":{"b":{"1":[1,1]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"f":{"1":2},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"test","s":{"1":2,"2":2},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage1);
      // test null-case handling behavior
      coverage1 = null;
      coverage2 = null;
      exports.istanbulMerge(coverage1, coverage2);
      // validate merged coverage1
      exports.assert(coverage1 === null, coverage1);
      onError();
    };

    local._onFileModifiedRestart_default_test = function (onError) {
       /*
        this function will test onFileModifiedRestart's watchFile handling behavior
       */
      var file, onParallel;
      file = __dirname + '/package.json';
      onParallel = exports.onParallel(onError);
      onParallel.counter += 1;
      exports.fs.stat(file, function (error, stat) {
        // test default watchFile handling behavior
        onParallel.counter += 1;
        exports.fs.utimes(file, stat.atime, new Date(), onParallel);
        // test nop watchFile handling behavior
        onParallel.counter += 1;
        setTimeout(function () {
          exports.fs.utimes(file, stat.atime, stat.mtime, onParallel);
        // coverage-hack - use 1500 ms to cover setInterval watchFile in node
        }, 1500);
        onParallel(error);
      });
    };

    local._phantomTest_default_test = function (onError) {
      /*
        this function will test phantomTest's default handling behavior
      */
      var onParallel, options;
      onParallel = exports.onParallel(onError);
      onParallel.counter += 1;
      // test default handling behavior
      onParallel.counter += 1;
      exports.phantomTest({
        url: 'http://localhost:' + exports.envDict.npm_config_server_port +
          // test phantom-callback handling behavior
          '?modeTest=phantom&' +
          // test _testSecret-validation handling behavior
          '_testSecret={{_testSecret}}&' +
          // test timeoutDefault-override handling behavior
          'timeoutDefault=' + exports.timeoutDefault
      }, onParallel);
      [{
        modeErrorIgnore: true,
        url: 'http://localhost:' + exports.envDict.npm_config_server_port +
          // test standalone utility2.js library handling behavior
          '/test/utility2.html?' +
          // test modeTest !== 'phantom' handling behavior
          'modeTest=phantom2&' +
          // test single-test-case handling behavior
          // test testRun's failure handling behavior
          'modeTestCase=_testRun_failure_test'
      }, {
        modeErrorIgnore: true,
        url: 'http://localhost:' + exports.envDict.npm_config_server_port +
          // test script-error handling behavior
          '/test/script-error.html'
      }].forEach(function (options) {
        onParallel.counter += 1;
        exports.phantomTest(options, function (error) {
          exports.testTryCatch(function () {
            // validate error occurred
            exports.assert(error instanceof Error, error);
            onParallel();
          }, onParallel);
        });
      });
      // test screenCapture handling behavior
      onParallel.counter += 1;
      options = {
        timeoutScreenCapture: 1,
        url: 'http://localhost:' + exports.envDict.npm_config_server_port +
          '/test/screen-capture'
      };
      exports.phantomScreenCapture(options, function (error) {
        exports.testTryCatch(function () {
          // validate no error occurred
          exports.assert(!error, error);
          // validate screen-capture file
          exports.assert(
            options.phantomjs.fileScreenCapture &&
              exports.fs.existsSync(options.phantomjs.fileScreenCapture),
            options.phantomjs.fileScreenCapture
          );
          // delete screen-capture file, so it will not interfere with re-tests
          exports.fs.unlinkSync(options.phantomjs.fileScreenCapture);
          onParallel();
        }, onParallel);
      });
      // test misc handling behavior
      onParallel.counter += 1;
      exports.testMock([
        [exports, {
          child_process: { spawn: function () {
            return { on: exports.nop };
          } },
          envDict: {
            // test no slimerjs handling behavior
            npm_config_mode_no_slimerjs: '1',
            // test no cover utility2.js handling behavior
            npm_package_name: 'undefined'
          },
          onTimeout: exports.nop
        }]
      ], onParallel, function (onError) {
        exports.phantomTest({
          url: 'http://localhost:' + exports.envDict.npm_config_server_port
        });
        onError();
      });
      onParallel();
    };

    local._replStart_default_test = function (onError) {
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

    local._testRunServer_misc_test = function (onError) {
      /*
        this function will test testRunServer's misc handling behavior
      */
      exports.testMock([
        [exports, {
          envDict: {
            // test $npm_package_name !== 'utility2' handling behavior
            npm_package_name: 'undefined',
            // test auto-exit handling behavior
            npm_config_timeout_exit: '1',
            // test random $npm_config_server_port handling behavior
            npm_config_server_port: ''
          },
          fileCacheAndParse: exports.nop,
          http: {
            createServer: function () {
              return { listen: exports.nop };
            }
          }
        }]
      ], onError, function (onError) {
        exports.testRunServer({ serverMiddlewareList: [] });
        // validate $npm_config_server_port
        exports.assert(
          Number(exports.envDict.npm_config_server_port),
          exports.envDict.npm_config_server_port
        );
        onError();
      });
    };

    // init server-assets
    [{
      // coverage-hack - cover no cache handling behavior
      cache: null,
      // coverage-hack - cover no coverage handling behavior
      coverage: null,
      file: __dirname + '/test.js'
    }, {
      cache: '/test/test.js',
      coverage: 'utility2',
      file: __dirname + '/test.js'
    }].forEach(function (options) {
      console.log('cache and parse ' + options.file);
      // cache and parse the file
      exports.fileCacheAndParse(options);
    });
    // init server-middlewares
    local.serverMiddlewareList = [
      function (request, response, onNext) {
        /*
          this user-defined middleware will override the builtin test-middleware
        */
        switch (request.urlPathNormalized) {
        // test http POST handling behavior
        case '/test/echo':
          exports.serverRespondEcho(request, response);
          break;
        // test http GET handling behavior
        case '/test/hello':
          response.end('hello');
          break;
        // test timeout handling behavior
        case '/test/timeout':
          setTimeout(function () {
            response.end();
          }, 1000);
          break;
        // test script-error handling behavior
        case '/test/script-error.html':
          response.end('<script>syntax error</script>');
          break;
        // test standalone utility2.js library handling behavior
        case '/test/utility2.html':
          response.end('<script src="/assets/utility2.js">' +
            '</script><script src="/test/test.js"></script>');
          break;
        // test 500-internal-server-error handling behavior
        case '/test/server-error':
          // test multiple serverRespondWriteHead callback handling behavior
          exports.serverRespondWriteHead(request, response, null, {});
          onNext(exports.errorDefault);
          // test multiple-callback error handling behavior
          onNext(exports.errorDefault);
          // test onErrorDefault handling behavior
          exports.testMock([
            // suppress console.error
            [console, { error: exports.nop }],
            // suppress modeErrorIgnore
            [request, { url: '' }]
          ], exports.nop, function (onError) {
            exports.serverRespondDefault(
              request,
              response,
              500,
              exports.errorDefault
            );
            onError();
          });
          break;
        // fallback to next middleware
        default:
          onNext();
        }
      },
      // builtin test-middleware
      exports.testMiddleware
    ];
    // run server-test
    exports.testRunServer(local);
    local.fs.readdirSync(__dirname).forEach(function (file) {
      file = __dirname + '/' + file;
      switch (local.path.extname(file)) {
      case '.js':
      case '.json':
        // jslint the file
        exports.jslint_lite.jslintAndPrint(local.fs.readFileSync(file, 'utf8'), file);
        break;
      }
      // if the file is modified, then restart the process
      exports.onFileModifiedRestart(file);
    });
    // init repl debugger
    exports.replStart({ exports: exports, local: local });
    break;
  }
}());
