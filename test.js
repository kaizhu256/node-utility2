/*jslint
  bitwise: true, browser: true,
  indent: 2,
  maxerr: 8,
  maxlen: 96,
  node: true, nomen: true,
  stupid: true
*/
(function () {
  /*
    this function will test this module
  */
  'use strict';
  var app;



  // run shared js-env code
  (function () {
    // init app
    app = {};
    app.modeJs = (function () {
      try {
        return module.exports && typeof process.versions.node === 'string' &&
          typeof require('http').createServer === 'function' && 'node';
      } catch (errorCaughtNode) {
        return typeof navigator.userAgent === 'string' &&
          typeof document.querySelector('body') === 'object' && 'browser';
      }
    }());
    // init utility2
    app.utility2 = app.modeJs === 'browser'
      ? window.utility2
      : require('./index.js');

    // init tests
    app._ajax_default_test = function (onError) {
      /*
        this function will test ajax's default handling behavior
      */
      var onParallel;
      onParallel = app.utility2.onParallel(onError);
      onParallel.counter += 1;
      // test http GET handling behavior
      onParallel.counter += 1;
      app.utility2.ajax({ url: '/test/hello' }, function (error, data) {
        app.utility2.testTryCatch(function () {
          // validate no error occurred
          app.utility2.assert(!error, error);
          // validate data
          app.utility2.assert(data === 'hello', data);
          onParallel();
        }, onParallel);
      });
      // test http POST handling behavior
      ['binary', 'text'].forEach(function (resultType) {
        onParallel.counter += 1;
        app.utility2.ajax({
          // test binary post handling behavior
          data: resultType === 'binary' && app.utility2.modeJs === 'node' ? new Buffer('hello')
            // test text post handling behavior
            : 'hello',
          // test request header handling behavior
          headers: { 'X-Header-Hello': 'Hello' },
          method: 'POST',
          resultType: resultType,
          url: '/test/echo'
        }, function (error, data) {
          app.utility2.testTryCatch(function () {
            // validate no error occurred
            app.utility2.assert(!error, error);
            // validate binary data
            if (resultType === 'binary' && app.utility2.modeJs === 'node') {
              app.utility2.assert(Buffer.isBuffer(data), data);
              data = String(data);
            }
            // validate text data
            app.utility2.assert(data.indexOf('hello') >= 0, data);
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
        app.utility2.ajax(options, function (error) {
          app.utility2.testTryCatch(function () {
            // validate error occurred
            app.utility2.assert(error instanceof Error, error);
            onParallel();
          }, onParallel);
        });
      });
      onParallel();
    };

    app._assert_default_test = function (onError) {
      /*
        this function will test assert's default handling behavior
      */
      var error;
      // test assertion passed
      app.utility2.assert(true, true);
      // test assertion failed with undefined message
      app.utility2.testTryCatch(function () {
        app.utility2.assert(false);
      }, function (error) {
        // validate error occurred
        app.utility2.assert(error instanceof Error, error);
        // validate error-message
        app.utility2.assert(error.message === '', error.message);
      });
      // test assertion failed with error object with no error.message and no error.trace
      error = new Error();
      error.message = '';
      error.stack = '';
      app.utility2.testTryCatch(function () {
        app.utility2.assert(false, error);
      }, function (error) {
        // validate error occurred
        app.utility2.assert(error instanceof Error, error);
        // validate error.message
        app.utility2.assert(error.message === 'undefined', error.message);
      });
      // test assertion failed with text message
      app.utility2.testTryCatch(function () {
        app.utility2.assert(false, '_assert_default_test');
      }, function (error) {
        // validate error occurred
        app.utility2.assert(error instanceof Error, error);
        // validate error-message
        app.utility2.assert(error.message === '_assert_default_test', error.message);
      });
      // test assertion failed with error object
      app.utility2.testTryCatch(function () {
        app.utility2.assert(false, app.utility2.errorDefault);
      }, function (error) {
        // validate error occurred
        app.utility2.assert(error instanceof Error, error);
      });
      // test assertion failed with json object
      app.utility2.testTryCatch(function () {
        app.utility2.assert(false, { aa: 1 });
      }, function (error) {
        // validate error occurred
        app.utility2.assert(error instanceof Error, error);
        // validate error-message
        app.utility2.assert(error.message === '{"aa":1}', error.message);
      });
      onError();
    };

    app._debug_print_default_test = function (onError) {
      /*
        this function will test debug_print's default handling behavior
      */
      var message;
      app.utility2.testMock([
        // suppress console.error
        [console, { error: function (arg) {
          message += (arg || '') + '\n';
        } }]
      ], onError, function (onError) {
        message = '';
        app.utility2.global['debug_print'.replace('_p', 'P')]('_debug_print_default_test');
        // validate message
        app.utility2.assert(
          message === '\n\n\ndebug' + 'Print\n_debug_print_default_test\n\n',
          message
        );
        onError();
      });
    };

    app._istanbulInstrumentInPackage_default_test = function (onError) {
      /*
        this function will test istanbulInstrumentInPackage's default handling behavior
      */
      var data;
      app.utility2.testMock([
        [app.utility2.global, { __coverage__: {} }]
      ], onError, function (onError) {
        // test no cover handling behavior
        data = app.utility2.istanbulInstrumentInPackage('1', 'test.js', '');
        // validate data
        app.utility2.assert(data === '1', data);
        // test cover handling behavior
        data = app.utility2.istanbulInstrumentInPackage('1', 'test.js', 'utility2');
        // validate data
        app.utility2.assert(data.indexOf(".s[\'1\']++;1;\n") >= 0, data);
        onError();
      });
    };

    app._jsonCopy_default_test = function (onError) {
      /*
        this function will test jsonCopy's default handling behavior
      */
      // test various data-type handling behavior
      [undefined, null, false, true, 0, 1, 1.5, 'a'].forEach(function (data) {
        app.utility2.assert(
          app.utility2.jsonCopy(data) === data,
          [app.utility2.jsonCopy(data), data]
        );
      });
      onError();
    };

    app._jsonStringifyOrdered_default_test = function (onError) {
      /*
        this function will test jsonStringifyOrdered's default handling behavior
      */
      var data;
      // test various data-type handling behavior
      [undefined, null, false, true, 0, 1, 1.5, 'a', {}, []].forEach(function (data) {
        app.utility2.assert(
          app.utility2.jsonStringifyOrdered(data) === JSON.stringify(data),
          [app.utility2.jsonStringifyOrdered(data), JSON.stringify(data)]
        );
      });
      // test data-ordering handling behavior
      data = app.utility2.jsonStringifyOrdered({
        // test nested dict handling behavior
        ee: { gg: 2, ff: 1},
        // test array handling behavior
        dd: [undefined],
        cc: app.utility2.nop,
        bb: 2,
        aa: 1
      });
      app.utility2.assert(data === '{"aa":1,"bb":2,"dd":[null],"ee":{"ff":1,"gg":2}}', data);
      onError();
    };

    app._onErrorDefault_default_test = function (onError) {
      /*
        this function will test onErrorDefault's default handling behavior
      */
      var message;
      app.utility2.testMock([
        // suppress console.error
        [console, { error: function (arg) {
          message = arg;
        } }]
      ], onError, function (onError) {
        // test no error handling behavior
        app.utility2.onErrorDefault();
        // validate message
        app.utility2.assert(!message, message);
        // test error handling behavior
        app.utility2.onErrorDefault(app.utility2.errorDefault);
        // validate message
        app.utility2.assert(message, message);
        onError();
      });
    };

    app._onParallel_default_test = function (onError) {
      /*
        this function will test onParallel's default handling behavior
      */
      var onParallel, onParallelError;
      // test onDebug handling behavior
      onParallel = app.utility2.onParallel(onError, function (error, self) {
        app.utility2.testTryCatch(function () {
          // validate no error occurred
          app.utility2.assert(!error, error);
          // validate self
          app.utility2.assert(self.counter >= 0, self);
        }, onError);
      });
      onParallel.counter += 1;
      onParallel.counter += 1;
      setTimeout(function () {
        onParallelError = app.utility2.onParallel(function (error) {
          app.utility2.testTryCatch(function () {
            // validate error occurred
            app.utility2.assert(error instanceof Error, error);
            onParallel();
          }, onParallel);
        });
        onParallelError.counter += 1;
        // test error handling behavior
        onParallelError.counter += 1;
        onParallelError(app.utility2.errorDefault);
        // test ignore-after-error handling behavior
        onParallelError();
      });
      // test default handling behavior
      onParallel();
    };

    app._onTimeout_timeout_test = function (onError) {
      /*
        this function will test onTimeout's timeout handling behavior
      */
      var timeElapsed;
      timeElapsed = Date.now();
      app.utility2.onTimeout(function (error) {
        app.utility2.testTryCatch(function () {
          // validate error occurred
          app.utility2.assert(error instanceof Error);
          // save timeElapsed
          timeElapsed = Date.now() - timeElapsed;
          // validate timeElapsed passed is greater than timeout
          // bug - ie might timeout slightly earlier,
          // so increase timeElapsed by a small amount
          app.utility2.assert(timeElapsed + 100 >= 1000, timeElapsed);
          onError();
        }, onError);
      // coverage-hack - use 1500 ms to cover setInterval test-report refresh in browser
      }, 1500, '_onTimeout_errorTimeout_test');
    };

    app._setDefault_default_test = function (onError) {
      /*
        this function will test setDefault's default handling behavior
      */
      var options;
      // test non-recursive handling behavior
      options = app.utility2.setDefault(
        { aa: 1, bb: {}, cc: [] },
        1,
        { aa: 2, bb: { cc: 2 }, cc: [1, 2] }
      );
      // validate options
      app.utility2.assert(
        app.utility2.jsonStringifyOrdered(options) === '{"aa":1,"bb":{},"cc":[]}',
        options
      );
      // test recursive handling behavior
      options = app.utility2.setDefault(
        { aa: 1, bb: {}, cc: [] },
        -1,
        { aa: 2, bb: { cc: 2 }, cc: [1, 2] }
      );
      // validate options
      app.utility2.assert(
        app.utility2.jsonStringifyOrdered(options) === '{"aa":1,"bb":{"cc":2},"cc":[]}',
        options
      );
      onError();
    };

    app._setOverride_default_test = function (onError) {
      /*
        this function will test setOverride's default handling behavior
      */
      var backup, data, options;
      backup = {};
      // test override handling behavior
      options = app.utility2.setOverride(
        { aa: 1, bb: { cc: 2 }, dd: [3, 4], ee: { ff: { gg: 5, hh: 6 } } },
        // test depth handling behavior
        2,
        { aa: 2, bb: { dd: 3 }, dd: [4, 5], ee: { ff: { gg: 6 } } },
        // test backup handling behavior
        backup
      );
      // validate backup
      data = app.utility2.jsonStringifyOrdered(backup);
      app.utility2.assert(data ===
        '{"aa":1,"bb":{},"dd":[3,4],"ee":{"ff":{"gg":5,"hh":6}}}', data);
      // validate options
      data = app.utility2.jsonStringifyOrdered(options);
      app.utility2.assert(data ===
        '{"aa":2,"bb":{"cc":2,"dd":3},"dd":[4,5],"ee":{"ff":{"gg":6}}}', data);
      // test restore options from backup handling behavior
      app.utility2.setOverride(options, -1, backup);
      // validate backup
      data = app.utility2.jsonStringifyOrdered(backup);
      app.utility2.assert(data ===
        '{"aa":1,"bb":{"dd":3},"dd":[3,4],"ee":{"ff":{"gg":6}}}', data);
      // validate options
      data = app.utility2.jsonStringifyOrdered(options);
      app.utility2.assert(data ===
        '{"aa":1,"bb":{"cc":2},"dd":[3,4],"ee":{"ff":{"gg":5,"hh":6}}}', data);
      // test override envDict with empty-string handling behavior
      options = app.utility2.setOverride(app.utility2.envDict, 1, { 'emptyString': null });
      // validate options
      app.utility2.assert(options.emptyString === '', options.emptyString);
      onError();
    };

    app._testRun_failure_test = function (onError) {
      /*
        this function will test testRun's failure handling behavior
      */
      // test failure from callback handling behavior
      onError(app.utility2.errorDefault);
      // test failure from multiple-callback handling behavior
      onError();
      // test failure from thrown error handling behavior
      throw app.utility2.errorDefault;
    };

    app._textFormat_default_test = function (onError) {
      /*
        this function will test textFormat's default handling behavior
      */
      var data;
      // test undefined valueDefault handling behavior
      data = app.utility2.textFormat('{{aa}}', {}, undefined);
      app.utility2.assert(data === '{{aa}}', data);
      // test default handling behavior
      data = app.utility2.textFormat('{{aa}}{{aa}}{{bb}}{{cc}}{{dd}}{{ee.ff}}', {
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
      app.utility2.assert(data === 'aaaa1null<undefined>gg', data);
      // test list handling behavior
      data = app.utility2.textFormat('[{{#list1}}[{{#list2}}{{aa}},{{/list2}}],{{/list1}}]', {
        list1: [
          // test null-value handling behavior
          null,
          // test recursive list handling behavior
          { list2: [{ aa: 'bb' }, { aa: 'cc' }] }
        ]
      }, '<undefined>');
      app.utility2.assert(data === '[[<undefined><undefined>,<undefined>],[bb,cc,],]', data);
      onError();
    };
  }());
  switch (app.modeJs) {



  // run browser js-env code
  case 'browser':
    // export app
    window.app = app;
    app.utility2.onErrorExit = function () {
      // test modeTest !== 'phantom' handling behavior
      if (app.utility2.modeTest === 'phantom2') {
        setTimeout(function () {
          throw new Error('\nphantom\n' + JSON.stringify({
            global_test_results: window.global_test_results
          }));
        }, 1000);
      }
    };
    app._modeTest = app.utility2.modeTest;
    app.utility2.modeTest = null;
    app.utility2.testRun();
    app.utility2.modeTest = app._modeTest;
    // run test
    app.utility2.testRun(app);
    break;



  // run node js-env code
  case 'node':
    // require modules
    app.fs = require('fs');
    app.path = require('path');

    // init tests
    app._istanbulMerge_default_test = function (onError) {
      /*
        this function will test istanbulMerge's default handling behavior
      */
      var coverage1, coverage2, script;
      script = app.utility2.istanbul_lite.instrumentSync(
        '(function () {\nreturn arg ? __coverage__ : __coverage__;\n}());',
        'test'
      );
      app.utility2.arg = 0;
      // init coverage1
      coverage1 = app.utility2.vm.runInNewContext(script, { arg: 0 });
      // validate coverage1
/* jslint-ignore-begin */
      app.utility2.assert(app.utility2.jsonStringifyOrdered(coverage1) === '{"/test":{"b":{"1":[0,1]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"f":{"1":1},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"/test","s":{"1":1,"2":1},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage1);
      // init coverage2
      coverage2 = app.utility2.vm.runInNewContext(script, { arg: 1 });
      // validate coverage2
      app.utility2.assert(app.utility2.jsonStringifyOrdered(coverage2) === '{"/test":{"b":{"1":[1,0]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"f":{"1":1},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"/test","s":{"1":1,"2":1},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage2);
      // merge coverage2 into coverage1
      app.utility2.istanbulMerge(coverage1, coverage2);
      // validate merged coverage1
      app.utility2.assert(app.utility2.jsonStringifyOrdered(coverage1) === '{"/test":{"b":{"1":[1,1]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"f":{"1":2},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"/test","s":{"1":2,"2":2},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage1);
/* jslint-ignore-end */
      // test null-case handling behavior
      coverage1 = null;
      coverage2 = null;
      app.utility2.istanbulMerge(coverage1, coverage2);
      // validate merged coverage1
      app.utility2.assert(coverage1 === null, coverage1);
      onError();
    };

    app._onFileModifiedRestart_default_test = function (onError) {
       /*
        this function will test onFileModifiedRestart's watchFile handling behavior
       */
      var file, onParallel;
      file = __dirname + '/package.json';
      onParallel = app.utility2.onParallel(onError);
      onParallel.counter += 1;
      app.utility2.fs.stat(file, function (error, stat) {
        // test default watchFile handling behavior
        onParallel.counter += 1;
        app.utility2.fs.utimes(file, stat.atime, new Date(), onParallel);
        // test nop watchFile handling behavior
        onParallel.counter += 1;
        setTimeout(function () {
          app.utility2.fs.utimes(file, stat.atime, stat.mtime, onParallel);
        // coverage-hack - use 1500 ms to cover setInterval watchFile in node
        }, 1500);
        onParallel(error);
      });
    };

    app._phantomTest_default_test = function (onError) {
      /*
        this function will test phantomTest's default handling behavior
      */
      var onParallel, options;
      onParallel = app.utility2.onParallel(onError);
      onParallel.counter += 1;
      // test default handling behavior
      onParallel.counter += 1;
      app.utility2.phantomTest({
        url: 'http://localhost:' + app.utility2.envDict.npm_config_server_port +
          // test phantom-callback handling behavior
          '?modeTest=phantom&' +
          // test _testSecret-validation handling behavior
          '_testSecret={{_testSecret}}&' +
          // test timeoutDefault-override handling behavior
          'timeoutDefault=' + app.utility2.timeoutDefault
      }, onParallel);
      [{
        modeErrorIgnore: true,
        url: 'http://localhost:' + app.utility2.envDict.npm_config_server_port +
          // test standalone utility2.js library handling behavior
          '/test/utility2.html?' +
          // test modeTest !== 'phantom' handling behavior
          'modeTest=phantom2&' +
          // test single-test-case handling behavior
          // test testRun's failure handling behavior
          'modeTestCase=_testRun_failure_test'
      }, {
        modeErrorIgnore: true,
        url: 'http://localhost:' + app.utility2.envDict.npm_config_server_port +
          // test script-error handling behavior
          '/test/script-error.html'
      }].forEach(function (options) {
        onParallel.counter += 1;
        app.utility2.phantomTest(options, function (error) {
          app.utility2.testTryCatch(function () {
            // validate error occurred
            app.utility2.assert(error instanceof Error, error);
            onParallel();
          }, onParallel);
        });
      });
      // test screenCapture handling behavior
      onParallel.counter += 1;
      options = {
        timeoutScreenCapture: 1,
        url: 'http://localhost:' + app.utility2.envDict.npm_config_server_port +
          '/test/screen-capture'
      };
      app.utility2.phantomScreenCapture(options, function (error) {
        app.utility2.testTryCatch(function () {
          // validate no error occurred
          app.utility2.assert(!error, error);
          // validate screen-capture file
          app.utility2.assert(
            options.phantomjs.fileScreenCapture &&
              app.utility2.fs.existsSync(options.phantomjs.fileScreenCapture),
            options.phantomjs.fileScreenCapture
          );
          // remove screen-capture file, so it will not interfere with re-tests
          app.utility2.fs.unlinkSync(options.phantomjs.fileScreenCapture);
          onParallel();
        }, onParallel);
      });
      // test misc handling behavior
      onParallel.counter += 1;
      app.utility2.testMock([
        [app.utility2, {
          child_process: { spawn: function () {
            return { on: app.utility2.nop };
          } },
          envDict: {
            // test no slimerjs handling behavior
            npm_config_mode_no_slimerjs: '1',
            // test no cover utility2.js handling behavior
            npm_package_name: 'undefined'
          },
          onTimeout: app.utility2.nop
        }]
      ], onParallel, function (onError) {
        app.utility2.phantomTest({
          url: 'http://localhost:' + app.utility2.envDict.npm_config_server_port
        });
        onError();
      });
      onParallel();
    };

    app._replStart_default_test = function (onError) {
      /*
        this function will test replStart's default handling behavior
      */
      /*jslint evil: true*/
      app.utility2.testMock([
        [app.utility2.child_process, { spawn: function () {
          return { on: function (event, callback) {
            // jslint-hack
            app.utility2.nop(event);
            callback();
          } };
        } }]
      ], onError, function (onError) {
        [
          // test shell handling behavior
          '$ :\n',
          // test git diff handling behavior
          '$ git diff\n',
          // test git log handling behavior
          '$ git log\n',
          // test grep handling behavior
          'grep \\bhello\\b\n',
          // test print handling behavior
          'print\n'
        ].forEach(function (script) {
          app.utility2._replServer.eval(script, null, 'repl', app.utility2.nop);
        });
        onError();
      });
    };

    app._testRunServer_misc_test = function (onError) {
      /*
        this function will test testRunServer's misc handling behavior
      */
      app.utility2.testMock([
        [app.utility2, {
          envDict: {
            // test $npm_package_name !== 'utility2' handling behavior
            npm_package_name: 'undefined',
            // test exit-after-timeout handling behavior
            npm_config_timeout_exit: '1',
            // test random $npm_config_server_port handling behavior
            npm_config_server_port: ''
          },
          http: {
            createServer: function () {
              return { listen: app.utility2.nop };
            }
          }
        }]
      ], onError, function (onError) {
        app.utility2.testRunServer({ serverMiddlewareList: [] });
        // validate $npm_config_server_port
        app.utility2.assert(
          Number(app.utility2.envDict.npm_config_server_port),
          app.utility2.envDict.npm_config_server_port
        );
        onError();
      });
    };

    // init assets
    app['/'] =
      app.utility2['/test/test.html'];
    app['/assets/istanbul-lite.js'] =
      app.utility2.istanbul_lite['/assets/istanbul-lite.js'];
    app['/assets/utility2.css'] =
      app.utility2['/assets/utility2.css'];
    app['/assets/utility2.js'] =
      app.utility2.istanbulInstrumentInPackage(
        app.utility2['/assets/utility2.js'],
        __dirname + '/index.js',
        'utility2'
      );
    app['/test/test.js'] =
      app.utility2.istanbulInstrumentInPackage(
        app.utility2.fs.readFileSync(__filename, 'utf8'),
        __filename,
        'utility2'
      );
    // init serverMiddlewareList
    app.serverMiddlewareList = [
      function (request, response, onNext) {
        /*
          this function is the main test-middleware
        */
        switch (request.urlPathNormalized) {
        // serve assets
        case '/':
        case '/assets/istanbul-lite.js':
        case '/assets/utility2.css':
        case '/assets/utility2.js':
        case '/test/test.js':
          response.end(app[request.urlPathNormalized]);
          break;
        // test http POST handling behavior
        case '/test/echo':
          app.utility2.serverRespondEcho(request, response);
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
          response.end('<script>syntax-error!</script>');
          break;
        // test standalone utility2.js library handling behavior
        case '/test/utility2.html':
          response.end('<script src="/assets/utility2.js">' +
            '</script><script src="/test/test.js"></script>');
          break;
        // test 500-internal-server-error handling behavior
        case '/test/server-error':
          // test multiple serverRespondWriteHead callback handling behavior
          app.utility2.serverRespondWriteHead(request, response, null, {});
          onNext(app.utility2.errorDefault);
          // test multiple-callback error handling behavior
          onNext(app.utility2.errorDefault);
          // test onErrorDefault handling behavior
          app.utility2.testMock([
            // suppress console.error
            [console, { error: app.utility2.nop }],
            // suppress modeErrorIgnore
            [request, { url: '' }]
          ], app.utility2.nop, function (onError) {
            app.utility2.serverRespondDefault(
              request,
              response,
              500,
              app.utility2.errorDefault
            );
            onError();
          });
          break;
        // default to next middleware
        default:
          onNext();
        }
      }
    ];
    // run server-test
    app.utility2.testRunServer(app);
    app.fs.readdirSync(__dirname).forEach(function (file) {
      file = __dirname + '/' + file;
      switch (app.path.extname(file)) {
      case '.js':
      case '.json':
        // jslint the file
        app.utility2.jslint_lite.jslintAndPrint(app.fs.readFileSync(file, 'utf8'), file);
        break;
      }
      // if the file is modified, then restart the process
      app.utility2.onFileModifiedRestart(file);
    });
    // jslint /assets/utility2.css
    app.utility2.jslint_lite.jslintAndPrint(
      app.utility2['/assets/utility2.css'],
      '/assets/utility2.css'
    );
    // init repl debugger
    app.utility2.replStart({ app: app });
    break;
  }
}());
