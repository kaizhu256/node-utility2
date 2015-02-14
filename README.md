utility2 [![NPM](https://img.shields.io/npm/v/utility2.svg?style=flat-square)](https://www.npmjs.org/package/utility2)
========
lightweight nodejs module that runs phantomjs tests with browser code-coverage (via istanbul-lite)



## build status [![travis-ci.org build status](https://api.travis-ci.org/kaizhu256/node-utility2.svg)](https://travis-ci.org/kaizhu256/node-utility2) ![codeship.io build status](https://codeship.com/projects/df8f44c0-2ee3-0132-0af5-6a016ae0b812/status)

[![build commit status](https://kaizhu256.github.io/node-utility2/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-utility2)

| git branch | test-server | test-report | coverage-report | build artifact |
|:----------:|:-----------:|:-----------:|:---------------:|:--------------:|
|[master](https://github.com/kaizhu256/node-utility2/tree/master) | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://hrku01-utility2-master.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-utility2/build/master/travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build/master/travis-ci.org/test-report.html) | [![istanbul-lite coverage-report](https://kaizhu256.github.io/node-utility2/build/master/travis-ci.org/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build/master/travis-ci.org/coverage-report.html/node-utility2/index.html) | [![build artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build/master/travis-ci.org)|
|[beta](https://github.com/kaizhu256/node-utility2/tree/beta) | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://hrku01-utility2-beta.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-utility2/build/beta/travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build/beta/travis-ci.org/test-report.html) | [![istanbul-lite coverage-report](https://kaizhu256.github.io/node-utility2/build/beta/travis-ci.org/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build/beta/travis-ci.org/coverage-report.html/node-utility2/index.html) | [![build artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build/beta/travis-ci.org)|
|[alpha](https://github.com/kaizhu256/node-utility2/tree/alpha) | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://hrku01-utility2-alpha.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-utility2/build/alpha/travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build/alpha/travis-ci.org/test-report.html) | [![istanbul-lite coverage-report](https://kaizhu256.github.io/node-utility2/build/alpha/travis-ci.org/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build/alpha/travis-ci.org/coverage-report.html/node-utility2/index.html) | [![build artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build/alpha/travis-ci.org)|



## live test-server
[![heroku.com test-server](https://kaizhu256.github.io/node-utility2/build/screen-capture.testHeroku.phantomjs.png)](https://hrku01-utility2-beta.herokuapp.com/?modeTest=1)



## quickstart
```
// example.js
// this example nodejs script runs browser and server tests with code-coverage
// 1. create a clean app directory (e.g /tmp/app)
// 2. inside app directory, save this js script as example.js
// 3. inside app directory, run the following shell command:
//    $ npm install utility2 && node_modules/.bin/utility2 shRun shNpmTest example.js
/*jslint
  browser: true,
  indent: 2,
  node: true, nomen: true
*/
(function () {
  'use strict';
  var local;
  // init local
  local = {};
  // init browser js-env
  if (typeof window === 'object') {
    // init local.utility2
    local.utility2 = window.utility2;
    // init local test-case's
    local._ajax_200_test = function (onError) {
      /*
        this function tests ajax's 200 http status-code handling behavior
      */
      // test the defined url '/test/hello'
      local.utility2.ajax({
        url: '/test/hello'
      }, function (error, data) {
        local.utility2.testTryCatch(function () {
          // validate no error occurred
          local.utility2.assert(!error, error);
          // validate data
          local.utility2.assert(data === 'hello', data);
          onError();
        }, onError);
      });
    };
    local._ajax_404_test = function (onError) {
      /*
        this function tests ajax's 404 http status-code handling behavior
      */
      // test the undefined url '/test/undefined'
      local.utility2.ajax({
        url: '/test/undefined'
      }, function (error) {
        local.utility2.testTryCatch(function () {
          // validate error occurred
          local.utility2.assert(error instanceof Error, error);
          // validate 404 http status-code
          local.utility2.assert(error.statusCode === 404, error.statusCode);
          onError();
        }, onError);
      });
    };
    // add local test-case's
    local._testPrefix = 'example.browser';
    local.utility2.testCaseAdd(local);
    // run test
    local.utility2.testRun(local.utility2.nop);
  // init node js-env
  } else {
    // require modules
    local.utility2 = require('utility2');
    // mock process.env.PACKAGE_JSON_NAME to match local._prefixTest
    process.env.PACKAGE_JSON_NAME = local.utility2.utility2Browser.envDict.PACKAGE_JSON_NAME =
      'example';
    // init local test-case's
    local._testPhantom_default_test = function (onError) {
      /*
        this function spawns a phantomjs process to test a webpage
      */
      local.utility2.testPhantom({
        url: 'http://localhost:' + process.env.npm_config_server_port +
          '/test/test.html?modeTest=phantom'
      }, onError);
    };
    // add local test-case's
    local._testPrefix = 'example.node';
    local.utility2.testCaseAdd(local);
    // watch the following files, and if they are modified, then re-cache and re-parse them
    [{
      // cache file as /test/test.js
      cache: '/test/test.js',
      // init browser code-coverage for /test/test.js
      coverage: 'example',
      file: __dirname + '/example.js'
    }].forEach(function (options) {
      console.log('auto-cache and auto-parse ' + options.file);
      // cache and parse the file
      local.utility2.fileCacheAndParse(options);
      // if the file is modified, then cache and parse it
      local.utility2.onFileModifiedCacheAndParse(options);
    });
    // run server test
    local.utility2.testRunServer(function () {
      // exit after test-run ends
      process.exit(local.utility2.testReport.testsFailed);
    }, [
      local.utility2.testMiddleware,
      function (request, response, next) {
        /*
          this function is the main test middleware
        */
        // nop hack to pass jslint
        local.utility2.nop(request);
        switch (request.urlPathNormalized) {
        // test http GET handling behavior
        case '/test/hello':
          response.end('hello');
          break;
        // fallback to 404 Not Found
        default:
          next();
        }
      }
    ]);
  }
  return;
}());
```
#### output
![screen-capture](https://kaizhu256.github.io/node-utility2/build//screen-capture.testExampleJs.png)
![screen-capture](https://kaizhu256.github.io/node-utility2/build//screen-capture.testExampleJs.phantomjs.png)



## npm dependencies
- [istanbul-lite](https://www.npmjs.com/package/istanbul-lite)
- [jslint-lite](https://www.npmjs.com/package/jslint-lite)



## package content
[![screen-capture](https://kaizhu256.github.io/node-utility2/build//screen-capture.gitLsTree.png)](https://github.com/kaizhu256/node-utility2)



## build script
```
# build.sh
# this shell script runs the build process for this package
shBuild() {
  # init $TRAVIS env
  if [ "$TRAVIS" ]
  then
    export HEROKU_REPO=hrku01-utility2-$TRAVIS_BRANCH || return $?
    export TEST_URL="https://hrku01-utility2-$TRAVIS_BRANCH.herokuapp.com/?modeTest=phantom&_testSecret={{_testSecret}}" || return $?
  fi
  # init env
  . ./index.sh && shInit && mkdir -p .tmp/build/coverage-report.html || return $?
  # create package content listing
  MODE_BUILD=gitLsTree shRunScreenCapture git ls-tree --abbrev=8 --full-name -l -r HEAD || return $?
  # run npm test on published package
  shRun shNpmTestPublished
  #!! # test example script
  #!! MODE_BUILD=testExampleJs shRunScreenCapture shTestScriptJs example.js || return $?
  #!! # copy phantomjs screen-capture to .tmp/build
  #!! cp /tmp/app/.tmp/build/screen-capture.* .tmp/build || return $?
  # run npm test
  MODE_BUILD=npmTest shRunScreenCapture npm test || return $?
  # deploy to heroku
  if [ "$TRAVIS" ]
  then
    shRun shTestHeroku || return $?
  fi
}
# run build
shBuild
# save exit-code
EXIT_CODE=$?
# upload build artifacts to github
if [ "$TRAVIS" ]
then
  shRun shBuildGithubUpload || exit $?
fi
# exit with $EXIT_CODE
exit $EXIT_CODE
```



## changelog
#### todo
- add alphaDependencies
- merge testAddCase into testRun
- move testPhantomjs from index.js to index.sh
- auto-generate help doc from README.md
- add server stress test using phantomjs
- minify /assets/utility2.js in production-mode

#### 2014.2.x
- merge mainApp into local object
- auto-git-squash gh-pages after 256 commits
- remove artifact versioning
- change build-artifact-dir to build/$CI_BRANCH/<ci-host>
- rename screenshot to screenCapture
- replace istanbul with istanbul-lite
- remove ansi escape code in shell screen-captures
- inline shRunForever and add mainApp.onFileModifiedRestart
- inline mainApp.errorStackAppend

#### 2014.1.x
- replace mainApp.exportLocal with mainApp.testCaseAdd
- preserve lineno in shTestScriptJs
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
- add timestamp in screen-captures
- move build script from .travis.yml to README.md
- merge middlewareError and middlewareTest into testRunServer
- add border around phantomjs screen-capture
- use tee in shRunScreenCapture and add word-wrap and max-width of 80 characters
- merge .build into .tmp/build
- add shTestScriptJs with screen-capture
- move screen-capture.* from beta to root directory in gh-pages branch
- change textFormat's undefined valueDefault handling behavior

#### 2014.10.31
- auto git-squash gh-pages when uploading build artifacts
- add shTestQuickstartSh with screen-capture and auto-kill server in quickstart code
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
- automatically capture browser screen-captures via phantomjs / slimerjs / saucelabs
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
