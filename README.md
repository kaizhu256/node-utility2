utility2 [![NPM](https://img.shields.io/npm/v/utility2.svg?style=flat-square)](https://www.npmjs.org/package/utility2)
========
lightweight nodejs module for testing and covering browser-side code

| test server screenshot |
|:---------------------- |
|[![heroku.com test server](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/test-report.screenshot.herokuDeploy.phantomjs.png)](https://hrku01-utility2-beta.herokuapp.com/?modeTest=1)|




## build status [![travis.ci-org build status](https://api.travis-ci.org/kaizhu256/node-utility2.svg)](https://travis-ci.org/kaizhu256/node-utility2)

[![build commit status](https://kaizhu256.github.io/node-utility2/build.badge.svg)](https://travis-ci.org/kaizhu256/node-utility2)

| git branch | test server | test report | coverage report | build artifact |
|:----------:|:-----------:|:-----------:|:---------------:|:--------------:|
|[master](https://github.com/kaizhu256/node-utility2/tree/master) | [![heroku.com test server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://hrku01-utility2-master.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/coverage-report.html/node-utility2/index.html) | [![build artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build.travis-ci.org/master)|
|[beta](https://github.com/kaizhu256/node-utility2/tree/beta) | [![heroku.com test server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://hrku01-utility2-beta.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/coverage-report.html/node-utility2/index.html) | [![build artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build.travis-ci.org/beta)|
|[alpha](https://github.com/kaizhu256/node-utility2/tree/alpha) | [![heroku.com test server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://hrku01-utility2-alpha.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/coverage-report.html/node-utility2/index.html) | [![build artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build.travis-ci.org/alpha)|



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
- example.js
  - nodejs example usage script
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
- test.data
  - data file containing embedded test resources
- test.js
  - nodejs test script



## todo
- add shTmpMv to move app to /tmp/app and change shTmpCopy to copy app to /tmp/app.tmp
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
