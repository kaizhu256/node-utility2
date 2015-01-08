utility2 [![NPM](https://img.shields.io/npm/v/utility2.svg?style=flat-square)](https://www.npmjs.org/package/utility2)
========
lightweight nodejs module for testing and covering browser code



## build info [![travis-ci.org build status](https://api.travis-ci.org/kaizhu256/node-utility2.svg)](https://travis-ci.org/kaizhu256/node-utility2) ![codeship.io build status](https://codeship.com/projects/df8f44c0-2ee3-0132-0af5-6a016ae0b812/status)

[![build commit status](https://kaizhu256.github.io/node-utility2/build.badge.svg)](https://travis-ci.org/kaizhu256/node-utility2)

| git branch | test-server | test-report | coverage-report | build artifact |
|:----------:|:-----------:|:-----------:|:---------------:|:--------------:|
|[master](https://github.com/kaizhu256/node-utility2/tree/master) | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://hrku01-utility2-master.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/test-report.html) | [![istanbul coverage-report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/coverage-report.html/node-utility2/index.html) | [![build artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build.travis-ci.org/master)|
|[beta](https://github.com/kaizhu256/node-utility2/tree/beta) | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://hrku01-utility2-beta.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/test-report.html) | [![istanbul coverage-report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/coverage-report.html/node-utility2/index.html) | [![build artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build.travis-ci.org/beta)|
|[alpha](https://github.com/kaizhu256/node-utility2/tree/alpha) | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://hrku01-utility2-alpha.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/test-report.html) | [![istanbul coverage-report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/coverage-report.html/node-utility2/index.html) | [![build artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build.travis-ci.org/alpha)|
```
# build-ci.sh
# this shell code runs the ci-build process
shBuildCi() {
  # init $TRAVIS env
  if [ "$TRAVIS" ]
  then
    export HEROKU_REPO=hrku01-utility2-$TRAVIS_BRANCH || return $?
    export TEST_URL="https://hrku01-utility2-$TRAVIS_BRANCH.herokuapp.com/?modeTest=phantom&_testSecret={{_testSecret}}" || return $?
  fi
  # init env
  . ./index.sh && shInit && mkdir -p .tmp/build/coverage-report.html || return $?
  # test quickstart
  MODE_CI_BUILD=testQuickstartSh shRunScreenshot shTestQuickstartSh || return $?
  # test example code
  MODE_CI_BUILD=testExampleJs shRunScreenshot shTestExampleJs || return $?
  # npm test
  MODE_CI_BUILD=npmTest shRunScreenshot npm test || return $?
  # deploy to heroku
  if [ "$TRAVIS" ]
  then
    shRun shTestHeroku || return $?
  fi
}
# run build process in ci env
shBuildCi
# save exit code
EXIT_CODE=$?
# upload build artifacts to github
if [ "$TRAVIS" ]
then
  shRun shBuildGithubUpload || exit $?
fi
# exit with $EXIT_CODE
exit $EXIT_CODE
```



## live test-server
[![heroku.com test-server](https://kaizhu256.github.io/node-utility2/screenshot.testHeroku.phantomjs.png)](https://hrku01-utility2-beta.herokuapp.com/?modeTest=1)



## quickstart
```
# quickstart.sh
# this shell code runs the quickstart demo
# 1. create a clean app directory (e.g /tmp/app)
# 2. inside app directory, run the following shell code inside a terminal

shQuickstartSh() {
  # npm install utility2
  npm install utility2 || return $?

  # run browser and server tests with code-coverage
  cd node_modules/utility2 && npm install && npm test || return $?

  # start test-server on port 4380 and exit after 10000 ms
  npm start --server-port=4380 --timeout-exit=10000 || return $?

  # open browser to http://localhost:4380/?modeTest=1
}

# run quickstart demo
shQuickstartSh
```
#### output
[![screenshot](https://kaizhu256.github.io/node-utility2/screenshot.testQuickstartSh.png)](https://kaizhu256.github.io/node-utility2/screenshot.testQuickstartSh.png)



## nodejs example code
```
// example.js
// this nodejs code runs browser and server tests with code-coverage
// 1. create a clean app directory (e.g /tmp/app)
// 2. inside app directory, save this js code as example.js
// 3. inside app directory, run the following shell command:
//    $ npm install istanbul utility2 && node_modules/.bin/utility2 shRun shNpmTest example.js
/*jslint
  browser: true,
  indent: 2,
  node: true, nomen: true
*/
(function $$example() {
  'use strict';
  var mainApp;
  // browser js env
  if (typeof window === 'object') {
    // init mainApp
    mainApp = window.$$mainApp;
    // init test cases in browser js env
    mainApp.testPlatform.testCaseList = [{
      function: function (onError) {
        /*
          this function tests ajax's 200 http status-code handling behavior
        */
        // test the defined url '/test/hello'
        mainApp.ajax({
          url: '/test/hello'
        }, function (error, data) {
          mainApp.testTryCatch(function () {
            // validate no error occurred
            mainApp.assert(!error, error);
            // validate data
            mainApp.assert(data === 'hello', data);
            onError();
          }, onError);
        });
      },
      name: 'browser._ajax_200_test'
    }, {
      function: function (onError) {
        /*
          this function tests ajax's 404 http status-code handling behavior
        */
        // test the undefined url '/test/undefined'
        mainApp.ajax({
          url: '/test/undefined'
        }, function (error) {
          mainApp.testTryCatch(function () {
            // validate error occurred
            mainApp.assert(error instanceof Error, error);
            // validate 404 http status-code
            mainApp.assert(error.statusCode === 404, error.statusCode);
            onError();
          }, onError);
        });
      },
      name: 'browser._ajax_404_test'
    }];
    // init browser test
    mainApp.testRun(mainApp.nop);
  // node js env
  } else {
    // init mainApp
    mainApp = require('utility2');
    // watch the following files, and if they are modified, then re-cache and re-parse them
    [{
      // cache file as /test/test.js
      cache: '/test/test.js',
      // init browser code-coverage for /test/test.js
      coverage: 'undefined',
      file: __dirname + '/example.js'
    }].forEach(function (options) {
      console.log('auto-cache and auto-parse ' + options.file);
      // cache and parse the file
      mainApp.fileCacheAndParse(options);
      // if the file is modified, then cache and parse it
      mainApp.onFileModifiedCacheAndParse(options);
    });
    // init test cases in node js env
    mainApp.testPlatform.testCaseList = [{
      function: function (onError) {
        /*
          this function spawns a phantomjs process to test a webpage
        */
        mainApp.testPhantom({
          url: 'http://localhost:' + process.env.npm_config_server_port +
            '/test/test.html?modeTest=phantom'
        }, onError);
      },
      name: 'node._testPhantom_default_test'
    }];
    // init server test
    mainApp.testRunServer([function (request, response, next) {
      /*
        this function is the main test middleware
      */
      // nop hack to pass jslint
      mainApp.nop(request);
      switch (request.urlPathNormalized) {
      // test http GET handling behavior
      case '/test/hello':
        response.end('hello');
        break;
      // fallback to 404 Not Found
      default:
        next();
      }
    }], function () {
      // exit after test-run ends
      process.exit(mainApp.testReport.testsFailed);
    });
  }
  return;
}());
```
#### output
[![screenshot](https://kaizhu256.github.io/node-utility2/screenshot.testExampleJs.png)](https://kaizhu256.github.io/node-utility2/screenshot.testExampleJs.png)



## npm dependencies
- jslint-lite



## package content
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
  - shell build script
- package.json
  - npm config file
- test.js
  - nodejs test script



## changelog
#### todo
- preserve lineno in shTestExampleJs
- embed nodejs test code in README.md
- embed istanbul-lite
- add server stress test using phantomjs
- minify /assets/utility2.js in production-mode

#### 2014.1.x
- export most utility2 properties
- add shGrep shell command
- improve code-coverage
- validate test page @ http://validator.w3.org/
- remove global phantom and slimer object references
- auto-detect $GITHUB_REPO

#### 2014.12.29
- merge global.__coverage__ and  local.__coverage__ into mainApp.__coverage__
- flesh out example code
- add onTestRunEnd callback to testRun
- replace argument middleware with middlewareList in testRunServer
- add phantomjs testing
- add timestamp in screenshots
- move build script from .travis.yml to README.md
- merge middlewareError and middlewareTest into testRunServer
- add border around phantomjs screenshot
- use tee in shRunScreenshot and add word-wrap and max-width of 80 characters
- merge .build into .tmp/build
- add shTestExampleJs with screenshot-capture
- move screenshot.* from beta to root directory in gh-pages branch
- change textFormat's undefined valueDefault handling behavior

#### 2014.10.31
- auto git-squash gh-pages when uploading build artifacts
- add shTestQuickstartSh with screenshot-capture and auto-kill server in quickstart code
- add middlewareError
- add grep sugar in repl
- add mainApp._testSecret attribute for private testing
- add middlewareTest
- remove npm postinstall script
- add timeout for onParallel
- notify phantomjs of test-completion by throwing a special error
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
- add offline mode for shBuildCi
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
