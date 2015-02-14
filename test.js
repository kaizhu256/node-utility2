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
    // import test-cases from exports
    Object.keys(exports).forEach(function (key) {
      if (key.slice(-5) === '_test') {
        local[key] = exports[key];
      }
    });
  }());
  switch (local.modeJs) {
  // init browser js-env
  case 'browser':
    // test !exports.modeTest handling behavior
    local._modeTest = exports.modeTest;
    exports.modeTest = null;
    exports.testRun();
    exports.modeTest = local._modeTest;
    // run test
    exports.testRun(local, function () {
      // test exports.modeTest !== 'phantom' handling behavior
      if (exports.modeTest === 'phantom2') {
        setTimeout(function () {
          throw new Error(JSON.stringify({
            global_test_results: window.global_test_results
          }));
        });
      }
    });
    break;
  // init node js-env
  case 'node':
    // require modules
    local.fs = require('fs');
    local.path = require('path');
    // init local test-case's
    local._testPhantom_default_test = function (onError) {
      /*
        this function will test testPhantom's default handling behavior
      */
      var onParallel;
      onParallel = exports.onParallel(onError);
      onParallel.counter += 1;
      // test default handling behavior
      onParallel.counter += 1;
      exports.testPhantom({ url: 'http://localhost:' +
        process.env.npm_config_server_port +
        // test phantom-callback handling behavior
        '/?modeTest=phantom&' +
        // test _testSecret-validation handling behavior
        '_testSecret={{_testSecret}}&' +
        // test timeoutDefault-override handling behavior
        'timeoutDefault=' + exports.timeoutDefault }, onParallel);
      // test single-test-case handling behavior
      onParallel.counter += 1;
      exports.testPhantom({
        modeErrorIgnore: true,
        url: 'http://localhost:' + process.env.npm_config_server_port +
          // test modeTest !== 'phantom' handling behavior
          '/?modeTest=phantom2&' +
          // test testRun's failure handling behavior
          'modeTestCase=_testRun_failure_test'
      }, function (error) {
        exports.testTryCatch(function () {
          // validate error occurred
          exports.assert(error instanceof Error, error);
          onParallel();
        }, onParallel);
      });
      // test standalone utility2.js library handling behavior
      onParallel.counter += 1;
      exports.testPhantom({
        url: 'http://localhost:' + process.env.npm_config_server_port +
          // test phantom-callback handling behavior
          '/test/utility2.html?modeTest=phantom'
      }, onParallel);
      // test script-error handling behavior
      onParallel.counter += 1;
      exports.testPhantom({
        modeErrorIgnore: true,
        url:
          'http://localhost:' + process.env.npm_config_server_port + '/test/script-error.html'
      }, function (error) {
        exports.testTryCatch(function () {
          // validate error occurred
          exports.assert(error instanceof Error, error);
          onParallel();
        }, onParallel);
      });
      // test timeout handling behavior
      onParallel.counter += 1;
      exports.testPhantom({
        modeErrorIgnore: true,
        timeout: 1000,
        url: 'http://localhost:' + process.env.npm_config_server_port + '/test/hello'
      }, function (error) {
        exports.testTryCatch(function () {
          // validate error occurred
          exports.assert(error instanceof Error, error);
          onParallel();
        }, onParallel);
      });
      // test misc handling behavior
      onParallel.counter += 1;
      exports.testMock([
        // test no coverage handling behavior
        [exports, {
          child_process: { spawn: function () {
            return { on: function (event, onExit) {
              // nop hack to pass jslint
              exports.nop(event);
              onExit();
            } };
          } },
          __coverage__: null,
          fs: { readFileSync: function () {
            return 'null';
          } },
          onTimeout: exports.nop,
          testMerge: exports.nop
        }],
        [process.env, {
          // test $PACKAGE_JSON !== 'utility2' handling behavior
          PACKAGE_JSON_NAME: '',
          // test no slimerjs handling behavior
          npm_config_mode_no_slimerjs: '1'
        }]
      ], onParallel, function (onError) {
        exports.testPhantom({
          modeErrorIgnore: true,
          url: 'http://localhost:' + process.env.npm_config_server_port + '/test/misc'
        }, function (error) {
          exports.testTryCatch(function () {
            // validate no error occurred
            exports.assert(!error, error);
            onError();
          }, onError);
        });
      });
      onParallel();
    };
    // init local.serverMiddlewareList
    local.serverMiddlewareList = [
      // exit after test-run ends
      exports.testMiddleware,
      function (request, response, next) {
        // nop hack to pass jslint
        exports.nop(request);
        exports.nop(response);
        // test next middleware handling behavior
        next();
      },
      function (request, response, next) {
        /*
          this function is the main test-middleware
        */
        switch (request.urlPathNormalized) {
        // serve main-page
        case '/':
          exports.serverRespondWriteHead(request, response, 303, {
            'Location': request.url.replace('/', '/test/test.html')
          });
          response.end();
          break;
        // test http POST handling behavior
        case '/test/echo':
          exports.serverRespondEcho(request, response);
          break;
        // test http GET handling behavior
        case '/test/hello':
          response.end('hello');
          break;
        // test script-error handling behavior
        case '/test/script-error.html':
          response.end('<script>throw new Error("script-error")</script>');
          break;
        // test 500-internal-server-error handling behavior
        case '/test/server-error':
          // test multiple serverRespondWriteHead callback handling behavior
          exports.serverRespondWriteHead(request, response, null, {});
          next(exports.errorDefault);
          // test multiple-callback error handling behavior
          next(exports.errorDefault);
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
        // fallback to 404-not-found-error
        default:
          next();
        }
      }
    ];
    // run server-test
    exports.testRunServer(local, process.exit);
    [{
      file: __dirname + '/index.data',
      parse: true
    }, {
      cache: '/assets/utility2.js',
      coverage: 'utility2',
      file: __dirname + '/index.js'
    }, {
      cache: '/test/test.js',
      coverage: 'utility2',
      file: __dirname + '/test.js'
    }].forEach(function (options) {
      console.log('cache and parse ' + options.file);
      // cache and parse the file
      exports.fileCacheAndParse(options);
    });
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
