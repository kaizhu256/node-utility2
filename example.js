/*
 example.js

 1) copy the code below to example.js

 2) to start the example server on port 8080, run:
    $ npm_config_server_port=8080 node example.js

 3) to start the example server on random port,
    and run browser tests with code-coverage, run:
    $ npm install utility2 && node_modules/.bin/utility2 shRun shNpmTest example.js
*/
/*jslint
  bitwise: true, browser: true,
  indent: 2,
  maxerr: 8,
  node: true, nomen: true,
  regexp: true,
  stupid: true,
  todo: true
*/
(function () {
  'use strict';
  var mainApp;
  // init mainApp.modeJs
  mainApp = { modeJs: 'undefined' };
  try {
    // check node js env
    mainApp.modeJs = global && module.exports && process.versions.node && 'node';
  } catch (errorCaughtNode) {
    try {
      // check browser js env
      mainApp.modeJs = window && navigator.userAgent && 'browser';
    } catch (ignore) {
    }
  }
  switch (mainApp.modeJs) {
  // init browser js env
  case 'browser':
    // init mainApp
    mainApp = window.$$mainApp;
    // init local object
    mainApp.localExport({
      _name: 'example.browser',
      _ajax_httpGet_test: function (onError) {
        /*
          this function tests ajax's http GET handling behavior
        */
        // test http GET handling behavior
        mainApp.ajax({ url: '/test/hello' }, function (error, data) {
          mainApp.testTryCatch(function () {
            // validate no error occurred
            mainApp.assert(!error, error);
            // validate data
            mainApp.assert(data === 'hello', data);
            onError();
          }, onError);
        });
      }
    }, mainApp);
    // init test
    mainApp.testRun();
    break;
  // init node js env
  case 'node':
    // init PACKAGE_JSON_NAME
    process.env.PACKAGE_JSON_NAME = 'example';
    mainApp.utility2 = require('utility2');
    // init local object
    mainApp.utility2.localExport({
      _name: 'example.node',
      _testPhantom_default_test: function (onError) {
        /*
          this function tests testPhantom' default handling behavior
        */
        mainApp.testPhantom(
          'http://localhost:' + process.env.npm_config_server_port + '/?modeTest=phantom',
          onError
        );
      }
    }, mainApp);
    // init server
    mainApp.http.createServer(function (request, response) {
      switch (mainApp.url.parse(request.url).pathname) {
      // serve the following assets from _fileCacheDict
      case '/assets/example.js':
        mainApp.fs.readFile(__dirname + '/example.js', function (error, data) {
          // nop hack to pass jslint
          mainApp.nop(error);
          response.end(data);
        });
        break;
      case '/assets/utility2.css':
      case '/assets/utility2.js':
        response.end(mainApp.utility2._fileCacheDict[request.url].data);
        break;
      // serve index.html template
      case '/':
        response.end('<html>' +
          '<body>' +
            '<link href="/assets/utility2.css" rel="stylesheet"/>' +
            '<script>window.$$mainApp = ' + JSON.stringify(mainApp.utility2._mainAppBrowser) +
            '</script>' +
            '<script src="/assets/utility2.js"></script>' +
            '<script src="/assets/example.js"></script>' +
          '</body>' +
          '</html>');
        break;
      // test http GET handling behavior
      case '/test/hello':
        response.end('hello');
        break;
      // fallback to 404 Not Found
      default:
        mainApp.serverRespondDefault(request, response, 404);
      }
    })
      // start server on port process.env.npm_config_server_port
      .listen(process.env.npm_config_server_port, function () {
        console.log('server listening on port ' + process.env.npm_config_server_port);
        // init test
        if (process.env.npm_config_mode_npm_test) {
          mainApp.testRun();
        }
      });
    break;
  }
}());
