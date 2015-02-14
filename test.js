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
    this function tests this module
  */
  'use strict';
  switch (local.modeJs) {
  // init browser js-env
  case 'browser':
    // test !local.utility2.modeTest handling behavior
    local._modeTest = local.utility2.modeTest;
    local.utility2.modeTest = null;
    local.utility2.testRun();
    local.utility2.modeTest = local._modeTest;
    // run test
    local.utility2.testRun(local, function () {
      // test local.utility2.modeTest !== 'phantom' handling behavior
      if (local.utility2.modeTest === 'phantom2') {
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
        this function tests testPhantom's default handling behavior
      */
      var onParallel;
      onParallel = local.utility2.onParallel(onError);
      onParallel.counter += 1;
      // test default handling behavior
      onParallel.counter += 1;
      local.utility2.testPhantom({ url: 'http://localhost:' +
        process.env.npm_config_server_port +
        // test phantom-callback handling behavior
        '/?modeTest=phantom&' +
        // test _testSecret-validation handling behavior
        '_testSecret={{_testSecret}}&' +
        // test timeoutDefault-override handling behavior
        'timeoutDefault=' + local.utility2.timeoutDefault }, onParallel);
      // test single-test-case handling behavior
      onParallel.counter += 1;
      local.utility2.testPhantom({
        modeErrorIgnore: true,
        url: 'http://localhost:' + process.env.npm_config_server_port +
          // test modeTest !== 'phantom' handling behavior
          '/?modeTest=phantom2&' +
          // test testRun's failure handling behavior
          'modeTestCase=_testRun_failure_test'
      }, function (error) {
        local.utility2.testTryCatch(function () {
          // validate error occurred
          local.utility2.assert(error instanceof Error, error);
          onParallel();
        }, onParallel);
      });
      // test standalone utility2.js library handling behavior
      onParallel.counter += 1;
      local.utility2.testPhantom({
        url: 'http://localhost:' + process.env.npm_config_server_port +
          // test phantom-callback handling behavior
          '/test/utility2.html?modeTest=phantom'
      }, onParallel);
      // test script-error handling behavior
      onParallel.counter += 1;
      local.utility2.testPhantom({
        modeErrorIgnore: true,
        url:
          'http://localhost:' + process.env.npm_config_server_port + '/test/script-error.html'
      }, function (error) {
        local.utility2.testTryCatch(function () {
          // validate error occurred
          local.utility2.assert(error instanceof Error, error);
          onParallel();
        }, onParallel);
      });
      // test timeout handling behavior
      onParallel.counter += 1;
      local.utility2.testPhantom({
        modeErrorIgnore: true,
        timeout: 1000,
        url: 'http://localhost:' + process.env.npm_config_server_port + '/test/hello'
      }, function (error) {
        local.utility2.testTryCatch(function () {
          // validate error occurred
          local.utility2.assert(error instanceof Error, error);
          onParallel();
        }, onParallel);
      });
      // test misc handling behavior
      onParallel.counter += 1;
      local.utility2.testMock([
        // test no coverage handling behavior
        [local.utility2, {
          child_process: { spawn: function () {
            return { on: function (event, onExit) {
              // nop hack to pass jslint
              local.utility2.nop(event);
              onExit();
            } };
          } },
          __coverage__: null,
          fs: { readFileSync: function () {
            return 'null';
          } },
          onTimeout: local.utility2.nop,
          testMerge: local.utility2.nop
        }],
        [process.env, {
          // test $PACKAGE_JSON !== 'utility2' handling behavior
          PACKAGE_JSON_NAME: '',
          // test no slimerjs handling behavior
          npm_config_mode_no_slimerjs: '1'
        }]
      ], onParallel, function (onError) {
        local.utility2.testPhantom({
          modeErrorIgnore: true,
          url: 'http://localhost:' + process.env.npm_config_server_port + '/test/misc'
        }, function (error) {
          local.utility2.testTryCatch(function () {
            // validate no error occurred
            local.utility2.assert(!error, error);
            onError();
          }, onError);
        });
      });
      onParallel();
    };
    // init local.serverMiddlewareList
    local.serverMiddlewareList = [
      // exit after test-run ends
      local.utility2.testMiddleware,
      function (request, response, next) {
        // nop hack to pass jslint
        local.utility2.nop(request);
        local.utility2.nop(response);
        // test next middleware handling behavior
        next();
      },
      function (request, response, next) {
        /*
          this function is the main test middleware
        */
        switch (request.urlPathNormalized) {
        // serve main page
        case '/':
          local.utility2.serverRespondWriteHead(request, response, 303, {
            'Location': request.url.replace('/', '/test/test.html')
          });
          response.end();
          break;
        // test http POST handling behavior
        case '/test/echo':
          local.utility2.serverRespondEcho(request, response);
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
          local.utility2.serverRespondWriteHead(request, response, null, {});
          next(local.utility2.errorDefault);
          // test multiple-callback error handling behavior
          next(local.utility2.errorDefault);
          // test onErrorDefault handling behavior
          local.utility2.testMock([
            // suppress console.error
            [console, { error: local.utility2.nop }],
            // suppress modeErrorIgnore
            [request, { url: '' }]
          ], local.utility2.nop, function (onError) {
            local.utility2.serverRespondDefault(
              request,
              response,
              500,
              local.utility2.errorDefault
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
    local.utility2.testRunServer(local, process.exit);
    // watch the following files, and if they are modified, then re-cache and re-parse them
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
      local.utility2.fileCacheAndParse(options);
    });
    local.fs.readdirSync(__dirname).forEach(function (file) {
      file = __dirname + '/' + file;
      switch (local.path.extname(file)) {
      case '.js':
      case '.json':
        // jslint the file
        local.utility2.jslint_lite.jslintAndPrint(local.fs.readFileSync(file, 'utf8'), file);
        break;
      }
      // if the file is modified, then restart the process
      local.utility2.onFileModifiedRestart(file);
    });
    // init repl debugger
    local.utility2.replStart({ local: local });
    break;
  }
}((function () {
  'use strict';
  var local;
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
    // init local.global
    local.global = local.modeJs === 'browser' ? window : global;
    // export local
    local.global.local = local;
    // init local.utility2
    local.utility2 = local.modeJs === 'browser' ? window.utility2 : require('./index.js');
    // import test-cases from local.utility2
    Object.keys(local.utility2).forEach(function (key) {
      if (key.slice(-5) === '_test') {
        local[key] = local.utility2[key];
      }
    });
  }());
  return local;
}())));
