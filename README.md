utility2 [![NPM](https://img.shields.io/npm/v/utility2.svg?style=flat-square)](https://www.npmjs.com/package/utility2)
========
lightweight library that runs phantomjs browser-tests with browser-coverage (via istanbul-lite and phantomjs-lite)



# build-status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-utility2.svg)](https://travis-ci.org/kaizhu256/node-utility2) ![codeship.io build-status](https://codeship.com/projects/df8f44c0-2ee3-0132-0af5-6a016ae0b812/status)

[![build commit status](https://kaizhu256.github.io/node-utility2/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-utility2)

| git-branch | test-server | test-report | coverage | build-artifacts |
|:----------:|:-----------:|:-----------:|:--------:|:---------------:|
|[master](https://github.com/kaizhu256/node-utility2/tree/master) | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://hrku01-utility2-master.herokuapp.com?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/test-report.html) | [![istanbul-lite coverage](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/coverage.html/node-utility2/index.html) | [![build-artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build..master..travis-ci.org)|
|[beta](https://github.com/kaizhu256/node-utility2/tree/beta) | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://hrku01-utility2-beta.herokuapp.com?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/test-report.html) | [![istanbul-lite coverage](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/coverage.html/node-utility2/index.html) | [![build-artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build..beta..travis-ci.org)|
|[alpha](https://github.com/kaizhu256/node-utility2/tree/alpha) | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://hrku01-utility2-alpha.herokuapp.com?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/test-report.html) | [![istanbul-lite coverage](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/coverage.html/node-utility2/index.html) | [![build-artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build..alpha..travis-ci.org)|



# live test-server
[![heroku.com test-server](https://kaizhu256.github.io/node-utility2/build/screen-capture.testHeroku.slimerjs.png)](https://hrku01-utility2-beta.herokuapp.com?modeTest=1)



# quickstart
#### follow the instruction in this script
```
/*
  example.js

  this shared browser / server script will run phantomjs browser-tests
  on itself with coverage for both the browser and server

  instruction to programmatically test browser and server with coverage
  1. save this js script as example.js
  2. run the shell command:
     $ npm install phantomjs-lite utility2 &&\
       node_modules/.bin/utility2 shRun shNpmTest example.js

  instruction to interactively test server on port 1337 without coverage
  1. save this js script as example.js
  2. run the shell command:
     $ npm install utility2 && npm_config_server_port=1337 node example.js
  3. interactively test server on http://localhost:1337
*/
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



  // run browser js-env code
  if (typeof window === 'object') {
    // init local.utility2
    local.utility2 = window.utility2;
    // init tests
    local._ajax_200_test = function (onError) {
      /*
        this function will test ajax's 200 http-status-code handling behavior
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
        this function will test ajax's 404 http-status-code handling behavior
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
    // run test
    local.utility2.testRun(local, local.utility2.nop);



  // run node js-env code
  } else {
    // mock package.json
    process.env.npm_package_description = 'this is an example module';
    process.env.npm_package_name = 'example-module';
    process.env.npm_package_version = '1.0.0';
    // require modules
    local.utility2 = require('utility2');
    // init tests
    local._phantomTest_default_test = function (onError) {
      /*
        this function will spawn phantomjs to test the test-page
      */
      local.utility2.phantomTest({
        url: 'http://localhost:' + process.env.npm_config_server_port +
          '?modeTest=phantom'
      }, onError);
    };
    // serve this file as '/test/test.js' with coverage
    local.utility2.fileCacheAndParse({
      cache: '/test/test.js',
      coverage: 'example-module',
      file: __filename
    });
    // init local.serverMiddlewareList
    local.serverMiddlewareList = [
      function (request, response, next) {
        /*
          this user-defined middleware will override the builtin test-middleware
        */
        // nop hack to pass jslint
        local.utility2.nop(request);
        switch (request.urlPathNormalized) {
        // redirect '/' to '/test/test.html'
        case '/':
          local.utility2.serverRespondWriteHead(request, response, 303, {
            'Location': request.url.replace('/', '/test/test.html')
          });
          response.end();
          break;
        // test http GET handling behavior
        case '/test/hello':
          response.end('hello');
          break;
        // fallback to builtin test-middleware
        default:
          next();
        }
      },
      // this builtin test-middleware will
      // 1. redirect '/' to '/test/test.html'
      // 2. serve '/assets/utility2.js' from builtin test-library
      // 3. serve '/test/test.js' from user-defined test-file
      // 4. serve '/test/test.html' from builtin test-page
      local.utility2.testMiddleware
    ];
    // this function will
    // 1. create http-server from local.serverMiddlewareList
    // 2. start http-server on port $npm_config_server_port
    // 3. if env var $npm_config_mode_npm_test is defined, then run tests
    local.utility2.testRunServer(local, process.exit);
  }
  return;
}());
```
#### output from shell
![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleJs.png)
#### output from [phantomjs-lite](https://www.npmjs.com/package/phantomjs-lite)
![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleJs.slimerjs.png)
#### output from [istanbul-lite](https://www.npmjs.com/package/istanbul-lite)
![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleJs.slimerjs._2Ftmp_2Fapp_2F.tmp_2Fbuild_2Fcoverage.html_2Fapp_2Fexample.js.html.png)



# package-listing
[![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.gitLsTree.png)](https://github.com/kaizhu256/node-utility2)



# npm-dependencies
- [istanbul-lite](https://www.npmjs.com/package/istanbul-lite)
- [jslint-lite](https://www.npmjs.com/package/jslint-lite)



# todo
- create flamegraph from istanbul coverage
- explicitly require slimerjs instead of auto-detecting it
- auto-generate help doc from README.md
- add server stress test using phantomjs
- minify /assets/utility2.js in production-mode



# changelog of last 50 commits
![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.gitLog.png)



# internal build-script
```
# build.sh
# this shell script runs the build process for this package
shBuild() {
  # init $TRAVIS env
  if [ "$TRAVIS" ]
  then
    export HEROKU_REPO=hrku01-utility2-$CI_BRANCH || return $?
    export TEST_URL="https://hrku01-utility2-$CI_BRANCH.herokuapp.com" ||\
      return $?
    export TEST_URL="$TEST_URL?modeTest=phantom&_testSecret={{_testSecret}}"\
      || return $?
    export npm_config_mode_slimerjs=1 || return $?
  fi
  # init env
  . ./index.sh && shInit || return $?
  # run npm test on published package
  shRun shNpmTestPublished || return $?
  # test example js script
  MODE_BUILD=testExampleJs\
  shRunScreenCapture shTestScriptJs example.js || return $?
  # screen-capture example.js coverage
  MODE_BUILD=testExampleJs shRun shPhantomScreenCapture\
    /tmp/app/.tmp/build/coverage.html/app/example.js.html || :
  # copy phantomjs screen-capture to $npm_config_dir_build
  cp /tmp/app/.tmp/build/screen-capture.*.png $npm_config_dir_build || return $?
  # run npm test
  MODE_BUILD=npmTest shRunScreenCapture npm test || return $?
  # deploy to heroku
  if [ "$TRAVIS" ]
  then
    shRun shTestHeroku || return $?
    # if number of commits > 1024, then squash older commits
    shRun shGitBackupAndSquashAndPush 1024 > /dev/null || return $?
  fi
}
# run build
shBuild
# save exit-code
EXIT_CODE=$?
shBuildCleanup() {
  # this function will cleanup build-artifacts in local build dir
  # init env
  . ./index.sh && shInit || return $?
  # create package-listing
  MODE_BUILD=gitLsTree shRunScreenCapture shGitLsTree || return $?
  # create recent changelog of last 50 commits
  MODE_BUILD=gitLog shRunScreenCapture git log -50 --pretty="%ai\u000a%B" ||\
    return $?
  # add black border around phantomjs screen-capture
  shBuildPrint phantomScreenCapture\
    "add black border around phantomjs screen-capture" || return $?
  local FILE_LIST="$(ls\
    $npm_config_dir_build/screen-capture.*.phantomjs*.png\
    $npm_config_dir_build/screen-capture.*.slimerjs*.png\
    2>/dev/null)" || return $?
  if [ "$FILE_LIST" ] && (mogrify --version > /dev/null 2>&1)
  then
    printf "$FILE_LIST" |\
      xargs -n 1 mogrify -frame 1 -mattecolor black || return $?
  fi
}
shBuildCleanup || exit $?
# upload build-artifacts to github
if [ "$TRAVIS" ]
then
  shBuildGithubUploadCleanup() {
    # this function will cleanup build-artifacts in local gh-pages repo
    return
  }
  # if number of commits > 16, then squash older commits
  COMMIT_LIMIT=16 shRun shBuildGithubUpload || exit $?
fi
# exit with $EXIT_CODE
exit $EXIT_CODE
```
