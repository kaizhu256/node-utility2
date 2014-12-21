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
  var mainApp;
  switch ($$options.modeJs) {
  // init browser js env
  case 'browser':
    // init mainApp
    mainApp = window.$$mainApp;
    // init browser test
    if (mainApp.modeTest) {
      mainApp.testRun();
    }
    break;
  // init node js env
  case 'node':
    // init mainApp
    mainApp = module.exports;
    // require modules
    mainApp.utility2 = require('utility2');
    // init local object
    mainApp.utility2.localExport({
      _name: 'utility2.test.node',

      _initNode_watchFile_test: function (onError) {
        /*
          this function tests this initNode's watchFile handling behavior
        */
        var onRemaining, remaining, remainingError;
        onRemaining = function (error) {
          remaining -= 1;
          remainingError = remainingError || error;
          if (remaining === 0) {
            onError(remainingError);
          }
        };
        remaining = 1;
        // test fileCacheAndParse's watchFile handling behavior
        [
          // test auto-jslint handling behavior
          __dirname + '/package.json',
          // test auto-cache handling behavior
          __dirname + '/index.data'
        ].forEach(function (file) {
          remaining += 1;
          mainApp.fs.stat(file, function (error, stat) {
            // test default watchFile handling behavior
            remaining += 1;
            mainApp.fs.utimes(file, stat.atime, new Date(), onRemaining);
            // test nop watchFile handling behavior
            remaining += 1;
            setTimeout(function () {
              mainApp.fs.utimes(file, stat.atime, stat.mtime, onRemaining);
            // coverage - use 1500 ms to cover setInterval watchFile in node
            }, 1500);
            onRemaining(error);
          });
        });
        onRemaining();
      },

      _testPhantom_default_test: function (onError) {
        /*
          this function tests testPhantom' default handling behavior
        */
        mainApp.testPhantom('http://localhost:' + process.env.npm_config_server_port +
          '/?modeTest=phantom&_timeoutDefault=' + mainApp.utility2._timeoutDefault, onError);
      }
    }, mainApp);
    // cache test.* files
    [{
      cache: '/assets/test.js',
      coverage: 'utility2',
      file: __dirname + '/test.js'
    }].forEach(function (options) {
      mainApp.fileCacheAndParse(options);
    });
    // validate process.env.npm_config_server_port
    // is a positive-definite integer less then 0x10000
    (function () {
      var serverPort;
      serverPort = Number(process.env.npm_config_server_port);
      mainApp.assert(
        (serverPort | 0) === serverPort && 0 < serverPort && serverPort < 0x10000,
        'invalid server-port ' + serverPort
      );
    }());
    // init server
    mainApp.http.createServer(function (request, response) {
      (function middleware(request, response, next) {
        // init urlPathNormalized
        request.urlPathNormalized =
          mainApp.path.resolve(mainApp.url.parse(request.url).pathname);
        switch (request.urlPathNormalized) {
        // serve the following assets from _fileCacheDict
        case '/assets/test.js':
        case '/assets/utility2.css':
        case '/assets/utility2.js':
          response.end(mainApp.utility2._fileCacheDict[request.urlPathNormalized].data);
          break;
        // serve main page
        case '/':
          response.end(mainApp.textFormat('<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>' +
            '<link href="/assets/utility2.css" rel="stylesheet"/>' +
            '<style>body { font-family: arial; }</style>' +
            '</head>' +
            '<body>' +
            '<!-- ajax progress bar begin -->' +
            '<div class="ajaxProgressDiv">' +
              '<div class="ajaxProgressBarDiv ajaxProgressBarDivLoading">loading</div>' +
            '</div>' +
            '<!-- ajax progress bar end -->' +
            '<!-- main app div begin -->' +
            '<div>' +
              '<h1>{{env.PACKAGE_JSON_NAME}} <{{env.PACKAGE_JSON_VERSION}}></h1>' +
              '<h3>{{env.PACKAGE_JSON_DESCRIPTION}}</h3>' +
              '<!-- main app content -->' +
            '</div>' +
            '<!-- main app div end -->' +
            '<!-- script begin -->' +
            '<script>window.$$mainApp = {{mainAppBrowserJson}}</script>' +
            '<script src="/assets/utility2.js"></script>' +
            '<script src="/assets/test.js"></script>' +
            '<!-- script end -->' +
            '</body>' +
            '</html>', {
              env: process.env,
              fileCacheDict: mainApp.utility2._fileCacheDict,
              mainAppBrowserJson: JSON.stringify(mainApp.utility2._mainAppBrowser)
            }));
          break;
        // test http POST handling behavior
        case '/test/echo':
          mainApp.serverRespondEcho(request, response);
          break;
        // test internal server error handling behavior
        case '/test/error':
          next(mainApp.utility2._errorDefault);
          break;
        // test http GET handling behavior
        case '/test/hello':
          response.end('hello');
          break;
        // fallback to 404 Not Found
        default:
          next();
        }
      }(request, response, function (error) {
        mainApp.serverRespondDefault(request, response, error ? 500 : 404, error);
      }));
    })
      // start server on port process.env.npm_config_server_port
      .listen(process.env.npm_config_server_port, function () {
        console.log('server listening on port ' + process.env.npm_config_server_port);
        // init node test
        if (process.env.npm_config_mode_npm_test) {
          mainApp.testRun();
        }
      });
    // watch and auto-cache the following files when modified
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
      console.log('auto-cache ' + options.file);
      mainApp.fs.watchFile(options.file, {
        interval: 1000,
        persistent: false
      }, function (stat2, stat1) {
        if (stat2.mtime > stat1.mtime) {
          mainApp.fileCacheAndParse(options);
        }
      });
    });
    // watch and auto-jslint the files in __dirname when modified
    mainApp.fs.readdirSync(__dirname).forEach(function (file) {
      switch (mainApp.path.extname(file)) {
      case '.js':
      case '.json':
        file = __dirname + '/' + file;
        console.log('auto-jslint ' + file);
        // jslint file
        mainApp.jslint_lite.jslintPrint(mainApp.fs.readFileSync(file, 'utf8'), file);
        // if the file is modified, then auto-jslint it
        mainApp.fs.watchFile(file, {
          interval: 1000,
          persistent: false
        }, function (stat2, stat1) {
          if (stat2.mtime > stat1.mtime) {
            mainApp.jslint_lite.jslintPrint(mainApp.fs.readFileSync(file, 'utf8'), file);
          }
        });
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
      modeJs: module.exports && typeof process.versions.node === 'string' &&
        typeof require('child_process').spawn === 'function' && 'node'
    };
  } catch (errorCaughtNode) {
    // init browser js env
    return {
      modeJs: typeof navigator.userAgent === 'string' &&
        typeof document.body.querySelector('div') === 'object' && 'browser'
    };
  }
}())));
