utility2 [![NPM](https://img.shields.io/npm/v/utility2.svg?style=flat-square)](https://www.npmjs.org/package/utility2)
========
lightweight nodejs module for testing and covering browser-side code



## build status [![travis.ci-org build status](https://api.travis-ci.org/kaizhu256/node-utility2.svg)](https://travis-ci.org/kaizhu256/node-utility2)

[![build commit status](https://kaizhu256.github.io/node-utility2/build.badge.svg)](https://travis-ci.org/kaizhu256/node-utility2)

| git branch | test server | test report | coverage report | build artifact |
|:----------:|:-----------:|:-----------:|:---------------:|:--------------:|
|[master](https://github.com/kaizhu256/node-utility2/tree/master) | [![heroku.com test server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://hrku01-utility2-master.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/coverage-report.html/node-utility2/index.html) | [![build artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build.travis-ci.org/master)|
|[beta](https://github.com/kaizhu256/node-utility2/tree/beta) | [![heroku.com test server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://hrku01-utility2-beta.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/coverage-report.html/node-utility2/index.html) | [![build artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build.travis-ci.org/beta)|
|[alpha](https://github.com/kaizhu256/node-utility2/tree/alpha) | [![heroku.com test server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://hrku01-utility2-alpha.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/coverage-report.html/node-utility2/index.html) | [![build artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build.travis-ci.org/alpha)|

| test server screenshot |
|:---------------------- |
|[![heroku.com test server](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/test-report.screenshot.herokuDeploy.phantomjs.png)](https://hrku01-utility2-beta.herokuapp.com/?modeTest=1)|



## installation and quickstart
```
# install
npm install utility2
# run server and browser tests on self with code-coverage
cd node_modules/utility2 && npm install && npm test
# start example test server on port 8080
npm start --server-port=8080
```



## library usage example
```
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
```



## package content
- .build/
  - auto-created directory where tests and coverages are stored
- .gitignore
  - git ignore file
- .travis.yml
  - travis-ci config file
- Procfile
  - heroku deploy script
- README.md
  - readme file
- git-ssh.sh
  - ssh authentication hook used for heroku git deployment
- index.data
  - data file containing embedded resources for testing this app
- index.js
  - main nodejs app
- index.sh
  - shell script exporting various helper test functions
- package.json
  - npm config file
- test.js
  - nodejs test script



## todo
- embed istanbul-lite
- screenshot of quickstart and demo library usage
- add shTmpMove to move app to /tmp/app and change shTmpCopy to copy app to /tmp/app.tmp
- add grep sugar in repl
- add tarball creation for deployment
- add grep in repl debugger
- add profiling and flame graph
- add server stress test using phantomjs
- minify /assets/utility2.js



## changelog
#### 2014.10.31
- notify phantomjs of test-completion by throwing a special error
- inline library usage example
- add --mode-forever to npm start
- add modeTestCase to test a single test-case
- rename cli.sh to index.sh
- add jsonCopy
- revamp server
- revamp phantomjs test
- revamp ajax
- add csslint
- emphasize low-level helper functions over high-level ones
- revert from saucelabs testing to phantomjs / slimerjs



#### 2014.9.22
- near 100% code-coverage during travis-ci build
- integrate codeship.io ci
- rename exports to mainApp
- remove global, exports, required, state, stateRestore from browser window
- add better error stack for browser ajax
- integrate code-coverage for browser initializations into _init_browser_test
- integrate code-coverage for nodejs initializations into _init_nodejs_test
- significantly increase code coverage
- add ajax timeout testing
- auto-detect slimerjs testing
- add url query-param feature modeErrorIgnore=1 to ignore test-simulated errors
- move main.* and utility2.* assets to /public/cache path
- fix code-coverage for failed tests
- remove global dependencies in nodejs env
- create ./build/test-report.xml for jenkins
- merge phantomjs and slimerjs dependencies into headless-browser package
- remove coverage.json when pushing build artifact to github

#### 2014.7.29
- add github basic auth for building private repo
- revamp ajax redirect in nodejs code
- integrate browser tests into main page
- add offline mode for shBuild
- add dummy failed tests in npm test for code-coverage
- add file update feature for data files
- add test flag in heroku Procfile
- add caching for scripts
- migrate from unstable -> master workflow to alpha -> beta -> master workflow
- add build commit badge in README.md
- merge node-utility2-data gh-pages repo into node-utility2
- add exportBrowserScript
- replace serving msin.data.js and main.js with {{name}}.data.js and {{name}}.js
- exit build on decrypt error
- add magic to auto-config state.repoGithub and state.repoHeroku
- enable testReportUpload only through command-line

#### 2014.7.18
- add description of files in README.md
- add code-coverage for saucelabs test routine
- automatically capture browser screenshots via phantomjs / slimerjs / saucelabs
- add basic auth for test-report upload
- rename exports.initLocal to exports.initSubmodule

#### 2014.7.12
- automate saucelabs testing in build

#### 2014.7.11
- add browser-side code-coverage
- automate phantomjs and slimerjs headless browser testing
- implement browser-side ajax
- update browser test-report status every 1000 ms until finished
- redirect main page to test.html
- watch and auto-jslint main.js and utility2.js

#### 2014.7.3
- initial commit
