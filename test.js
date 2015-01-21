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
    this function tests this module
  */
  'use strict';
  var local, mainApp;
  // init local
  local = {};
  // init browser js-env
  if (typeof window === 'object') {
    // init mainApp
    mainApp = window.mainApp = window.$$mainApp;
    // test !mainApp.modeTest handling behavior
    mainApp._modeTest = mainApp.modeTest;
    mainApp.modeTest = null;
    mainApp.testRun();
    mainApp.modeTest = mainApp._modeTest;
    // run test
    mainApp.testRun(function () {
      // test mainApp.modeTest !== 'phantom' handling behavior
      if (mainApp.modeTest === 'phantom2') {
        setTimeout(function () {
          throw new Error(JSON.stringify({
            global_test_results: window.global_test_results
          }));
        });
      }
    });
  // init node js-env
  } else {
    // init mainApp
    mainApp = global.mainApp = module.exports;
    // require modules
    mainApp.utility2 = require('./index.js');
    // merge utility2 into mainApp;
    Object.keys(mainApp.utility2).forEach(function (key) {
      if (key[0] !== '_') {
        mainApp[key] = mainApp.utility2[key];
      }
    });
    // init local test-case's
    local._testPhantom_default_test = function (onError) {
      /*
        this function tests testPhantom's default handling behavior
      */
      var onParallel;
      onParallel = mainApp.onParallel(onError);
      onParallel.counter += 1;
      // test default handling behavior
      onParallel.counter += 1;
      mainApp.testPhantom({ url: 'http://localhost:' + process.env.npm_config_server_port +
        // test phantom-callback handling behavior
        '/?modeTest=phantom&' +
        // test _testSecret-validation handling behavior
        '_testSecret={{_testSecret}}&' +
        // test timeoutDefault-override handling behavior
        'timeoutDefault=' + mainApp.timeoutDefault }, onParallel);
      // test single-test-case handling behavior
      onParallel.counter += 1;
      mainApp.testPhantom({
        modeErrorIgnore: true,
        url: 'http://localhost:' + process.env.npm_config_server_port +
          // test modeTest !== 'phantom' handling behavior
          '/?modeTest=phantom2&' +
          // test testRun's failure handling behavior
          'modeTestCase=_testRun_failure_test'
      }, function (error) {
        mainApp.testTryCatch(function () {
          // validate error occurred
          mainApp.assert(error instanceof Error, error);
          onParallel();
        }, onParallel);
      });
      // test standalone utility2.js library handling behavior
      onParallel.counter += 1;
      mainApp.testPhantom({
        url: 'http://localhost:' + process.env.npm_config_server_port +
          // test phantom-callback handling behavior
          '/test/utility2.html?modeTest=phantom'
      }, onParallel);
      // test script-error handling behavior
      onParallel.counter += 1;
      mainApp.testPhantom({
        modeErrorIgnore: true,
        url:
          'http://localhost:' + process.env.npm_config_server_port + '/test/script-error.html'
      }, function (error) {
        mainApp.testTryCatch(function () {
          // validate error occurred
          mainApp.assert(error instanceof Error, error);
          onParallel();
        }, onParallel);
      });
      // test timeout handling behavior
      onParallel.counter += 1;
      mainApp.testPhantom({
        modeErrorIgnore: true,
        timeout: 1000,
        url: 'http://localhost:' + process.env.npm_config_server_port + '/test/hello'
      }, function (error) {
        mainApp.testTryCatch(function () {
          // validate error occurred
          mainApp.assert(error instanceof Error, error);
          onParallel();
        }, onParallel);
      });
      // test phantom.onError handling behavior
      onParallel.counter += 1;
      mainApp.testPhantom({
        modeErrorIgnore: true,
        modeTestPhantomOnError: true,
        url: 'http://localhost:' + process.env.npm_config_server_port +
          '/test/modeTestPhantomOnError'
      }, function (error) {
        mainApp.testTryCatch(function () {
          // validate no error occurred
          mainApp.assert(!error, error);
          onParallel();
        }, onParallel);
      });
      // test misc handling behavior
      onParallel.counter += 1;
      mainApp.testMock([
        // test no coverage handling behavior
        [mainApp.utility2, {
          child_process: { spawn: function () {
            return { on: function (event, onExit) {
              // nop hack to pass jslint
              mainApp.nop(event);
              onExit();
            } };
          } },
          __coverage__: null,
          fs: { readFileSync: function () {
            return 'null';
          } },
          onTimeout: mainApp.nop,
          testMerge: mainApp.nop
        }],
        [process.env, {
          // test $PACKAGE_JSON !== 'utility2' handling behavior
          PACKAGE_JSON_NAME: '',
          // test no slimerjs handling behavior
          npm_config_mode_no_slimerjs: '1'
        }]
      ], onParallel, function (onError) {
        mainApp.testPhantom({
          modeErrorIgnore: true,
          url: 'http://localhost:' + process.env.npm_config_server_port + '/test/misc'
        }, function (error) {
          mainApp.testTryCatch(function () {
            // validate no error occurred
            mainApp.assert(!error, error);
            onError();
          }, onError);
        });
      });
      onParallel();
    };
    local._testPrefix = 'utility2.test.node';
    // add local test-case's
    mainApp.testCaseAdd(local, mainApp);
    // run server test
    mainApp.testRunServer([mainApp.testMiddleware, function (request, response, next) {
      // nop hack to pass jslint
      mainApp.nop(request);
      mainApp.nop(response);
      // test next middleware handling behavior
      next();
    }, function (request, response, next) {
      /*
        this function is the main test middleware
      */
      switch (request.urlPathNormalized) {
      // serve main page
      case '/':
        mainApp.serverRespondWriteHead(request, response, 303, {
          'Location': request.url.replace('/', '/test/test.html')
        });
        response.end();
        break;
      // test http POST handling behavior
      case '/test/echo':
        mainApp.serverRespondEcho(request, response);
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
        mainApp.serverRespondWriteHead(request, response, null, {});
        next(mainApp.errorDefault);
        // test multiple-callback error handling behavior
        next(mainApp.errorDefault);
        // test onErrorDefault handling behavior
        mainApp.testMock([
          // suppress console.error
          [console, { error: mainApp.nop }],
          // suppress modeErrorIgnore
          [request, { url: '' }]
        ], mainApp.nop, function (onError) {
          mainApp.serverRespondDefault(request, response, 500, mainApp.errorDefault);
          onError();
        });
        break;
      // fallback to 404-not-found-error
      default:
        next();
      }
    // exit after test-run ends
    }], process.exit);
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
      console.log('auto-cache and auto-parse ' + options.file);
      // cache and parse the file
      mainApp.fileCacheAndParse(options);
      // if the file is modified, then re-cache and re-parse it
      mainApp.onFileModifiedCacheAndParse(options);
    });
    // watch the following files, and if they are modified, then re-jslint them
    mainApp.fs.readdirSync(__dirname).forEach(function (file) {
      switch (mainApp.path.extname(file)) {
      case '.js':
      case '.json':
        file = __dirname + '/' + file;
        console.log('auto-jslint ' + file);
        // jslint the file
        mainApp.jslint_lite.jslintPrint(mainApp.fs.readFileSync(file, 'utf8'), file);
        // if the file is modified, then re-jslint it
        mainApp.onFileModifiedJslint(file);
        break;
      }
    });
    // init repl debugger
    mainApp.replStart({ mainApp: mainApp });
  }
}());
