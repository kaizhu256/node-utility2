/*jslint
  bitwise: true, browser: true,
  indent: 2,
  maxerr: 8,
  node: true, nomen: true,
  regexp: true,
  stupid: true,
  todo: true
*/
(function test($$options) {
  /*
    this function tests this module
  */
  'use strict';
  var global, local, mainApp;
  // init global object
  global = $$options.global;
  // init local shared object
  local = {};
  switch ($$options.modeJs) {
  // init browser js env
  case 'browser':
    // init mainApp
    mainApp = global.mainApp = global.$$mainApp;
    // init browser test
    mainApp.testRun();
    break;
  // init node js env
  case 'node':
    // init mainApp
    mainApp = module.exports;
    // require modules
    mainApp.utility2 = require('./index.js');
    // init local node object
    local._name = 'utility2.test.node';
    local._testPhantom_default_test = function (onError) {
      /*
        this function tests testPhantom's default handling behavior
      */
      mainApp.testPhantom('http://localhost:' + process.env.npm_config_server_port +
        '/?modeTest=phantom&_testSecret={{_testSecret}}&_timeoutDefault=' +
        mainApp.utility2._timeoutDefault, onError);
    };
    mainApp.utility2.localExport(local, mainApp);
    // init test server
    mainApp.testServerCreateAndListen(function (request, response, next) {
      /*
        this function is the main test middleware
      */
      switch (request.urlPathNormalized) {
      // test http POST handling behavior
      case '/test/echo':
        mainApp.serverRespondEcho(request, response);
        break;
      // fallback to 404 Not Found
      default:
        next();
      }
    });
    // watch the following files, and if they are modified, then cache and parse them
    [{
      file: __dirname + '/index.data',
      parse: true
    }, {
      cache: '/assets/test.js',
      coverage: 'utility2',
      file: __dirname + '/test.js'
    }, {
      cache: '/assets/utility2.js',
      coverage: 'utility2',
      file: __dirname + '/index.js'
    }].forEach(function (options) {
      console.log('auto-cache and auto-parse ' + options.file);
      // cache and parse the file
      mainApp.fileCacheAndParse(options);
      // if the file is modified, then cache and parse it
      mainApp.onFileModifiedCacheAndParse(options);
    });
    // watch the following files, and if they are modified, then jslint them
    mainApp.fs.readdirSync(__dirname).forEach(function (file) {
      switch (mainApp.path.extname(file)) {
      case '.js':
      case '.json':
        file = __dirname + '/' + file;
        console.log('auto-jslint ' + file);
        // jslint the file
        mainApp.jslint_lite.jslintPrint(mainApp.fs.readFileSync(file, 'utf8'), file);
        // if the file is modified, then jslint it
        mainApp.onFileModifiedJslint(file);
        break;
      }
    });
    // init repl debugger
    mainApp.replStart({ mainApp: mainApp });
    break;
  }
}((function initOptions() {
  /*
    this function passes js env options to the calling function
  */
  'use strict';
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
        typeof document.querySelector('body') === 'object' && 'browser'
    };
  }
}())));
