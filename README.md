utility2 [![NPM](https://img.shields.io/npm/v/utility2.svg?style=flat-square)](https://www.npmjs.com/package/utility2)
========
run dynamic browser tests with coverage (via istanbul-lite and phantomjs-lite)



# build-status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-utility2.svg)](https://travis-ci.org/kaizhu256/node-utility2) ![codeship.io build-status](https://codeship.com/projects/df8f44c0-2ee3-0132-0af5-6a016ae0b812/status)

[![build commit status](https://kaizhu256.github.io/node-utility2/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-utility2)

| git-branch | test-server | test-report | coverage | build-artifacts |
|:----------:|:-----------:|:-----------:|:--------:|:---------------:|
|[master](https://github.com/kaizhu256/node-utility2/tree/master) | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://hrku01-utility2-master.herokuapp.com) | [![test-report](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/test-report.html) | [![istanbul-lite coverage](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/coverage.html/node-utility2/index.html) | [![build-artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build..master..travis-ci.org)|
|[beta](https://github.com/kaizhu256/node-utility2/tree/beta) | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://hrku01-utility2-beta.herokuapp.com) | [![test-report](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/test-report.html) | [![istanbul-lite coverage](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/coverage.html/node-utility2/index.html) | [![build-artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build..beta..travis-ci.org)|
|[alpha](https://github.com/kaizhu256/node-utility2/tree/alpha) | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://hrku01-utility2-alpha.herokuapp.com) | [![test-report](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/test-report.html) | [![istanbul-lite coverage](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/coverage.html/node-utility2/index.html) | [![build-artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build..alpha..travis-ci.org)|



# live test-server
[![heroku.com test-server](https://kaizhu256.github.io/node-utility2/build/screen-capture.herokuTest.slimerjs.png)](https://hrku01-utility2-beta.herokuapp.com)



# quickstart
#### follow the instruction in this script
```
/*
example.js

this shared browser / node script will run phantomjs browser-tests
and browser-coverage on itself

instruction to programmatically test browser and server with coverage
    1. save this js script as example.js
    2. run the shell command:
          $ npm install phantomjs-lite utility2 \
              && node_modules/.bin/utility2 shRun shNpmTest example.js

instruction to interactively test server on port 1337 without coverage
    1. save this js script as example.js
    2. run the shell command:
          $ npm install utility2 && npm_config_server_port=1337 node example.js
    3. open a browser to http://localhost:1337
*/

/*jslint
browser: true,
maxerr: 4,
maxlen: 80,
node: true,
nomen: true,
stupid: true
*/

(function () {
    'use strict';
    var app;
    // init app
    app = {};
    // init utility2
    app.utility2 = typeof window === 'object'
        ? window.utility2
        : require('utility2');



    // run browser js-env code
    if (typeof window === 'object') {
        // init browser js-env tests
        app.testCase_ajax_200 = function (onError) {
            /*
            this function will test ajax's 200 http statusCode handling behavior
            */
            // test '/test/hello'
            app.utility2.ajax({
                url: '/test/hello'
            }, function (error, data) {
                app.utility2.testTryCatch(function () {
                    // validate no error occurred
                    app.utility2.assert(!error, error);
                    // validate data
                    app.utility2.assert(data === 'hello', data);
                    onError();
                }, onError);
            });
        };
        app.testCase_ajax_404 = function (onError) {
            /*
            this function will test ajax's 404 http statusCode handling behavior
            */
            // test '/test/undefined'
            app.utility2.ajax({
                url: '/test/undefined'
            }, function (error) {
                app.utility2.testTryCatch(function () {
                    // validate error occurred
                    app.utility2.assert(error instanceof Error, error);
                    // validate 404 http statusCode
                    app.utility2.assert(
                        error.statusCode === 404,
                        error.statusCode
                    );
                    onError();
                }, onError);
            });
        };
        // run test
        app.utility2.testRun(app, app.utility2.nop);



    // run node js-env code
    } else {
        // require modules
        app.fs = require('fs');
        // init node js-env tests
        app.testCase_phantomTest_default = function (onError) {
            /*
            this function will spawn phantomjs to test the test-page
            */
            app.utility2.phantomTest({
                url: 'http://localhost:' +
                    process.env.npm_config_server_port +
                    '?modeTest=phantom'
            }, onError);
        };
        // init assets
        app['/'] = (String() +



/* jslint-ignore-begin */
'<!DOCTYPE html>\n' +
'<html>\n' +
'<head>\n' +
    '<meta charset="UTF-8">\n' +
    '<title>\n' +
    '{{envDict.npm_package_name}} [{{envDict.npm_package_version}}]\n' +
    '</title>\n' +
    '<link rel="stylesheet" href="/assets/utility2.css">\n' +
    '<style>\n' +
    '* {\n' +
        'box-sizing: border-box;\n' +
    '}\n' +
    'body {\n' +
        'background-color: #fff;\n' +
        'font-family: Helvetical Neue, Helvetica, Arial, sans-serif;\n' +
    '}\n' +
    'body > div {\n' +
        'margin-top: 20px;\n' +
    '}\n' +
    'textarea {\n' +
        'font-family: monospace;\n' +
        'height: 24em;\n' +
        'width: 100%;\n' +
    '}\n' +
    '.jslintOutputPre {\n' +
        'color: #f00;\n' +
    '}\n' +
    '.testReportDiv {\n' +
        'display: none;\n' +
    '}\n' +
    '</style>\n' +
'</head>\n' +
'<body>\n' +
    '<div class="ajaxProgressDiv" style="display: none;">\n' +
    '<div class="ajaxProgressBarDiv ajaxProgressBarDivLoading">loading</div>\n' +
    '</div>\n' +
    '<h1>{{envDict.npm_package_name}} [{{envDict.npm_package_version}}]</h1>\n' +
    '<h3>{{envDict.npm_package_description}}</h3>\n' +
    '<div>edit or paste script below to cover and test</div>\n' +
'<textarea class="istanbulInputTextarea">\n' +
'window.utility2.testRun({\n' +
'\n' +
    'modeTest: true,\n' +
'\n' +
    'testCase_ajax_get: function (onError) {\n' +
        '/*\n' +
        'this function will test ajax"s GET handling behavior\n' +
        '*/\n' +
        '// test main-page "/"\n' +
        'utility2.ajax({ url: "/" }, function (error, data, xhr) {\n' +
            'try {\n' +
                '// validate no error occurred\n' +
                'utility2.assert(!error, error);\n' +
                '// validate main-page is non-empty\n' +
                'if (xhr.status === 200) {\n' +
                    'utility2.assert(data, data);\n' +
                '}\n' +
                'onError();\n' +
            '} catch (error) {\n' +
                'onError(error);\n' +
            '}\n' +
        '});\n' +
    '}\n' +
'});\n' +
'</textarea>\n' +
    '<pre class="jslintOutputPre"></pre>\n' +
    '<div class="testReportDiv"></div>\n' +
    '<div class="istanbulCoverageDiv"></div>\n' +
    '<script src="/assets/istanbul-lite.js"></script>\n' +
    '<script src="/assets/utility2.js"></script>\n' +
    '<script>\n' +
    'window.utility2 = window.utility2 || {};\n' +
    'window.utility2.envDict = {\n' +
        'npm_package_description: "{{envDict.npm_package_description}}",\n' +
        'npm_package_name: "{{envDict.npm_package_name}}",\n' +
        'npm_package_version: "{{envDict.npm_package_version}}"\n' +
    '};\n' +
    'document.querySelector(\n' +
        '".istanbulInputTextarea"\n' +
    ').addEventListener("keyup", window.istanbul_lite.coverTextarea);\n' +
    'if (!window.utility2.modeTest) {\n' +
        'window.istanbul_lite.coverTextarea();\n' +
    '}\n' +
    '</script>\n' +
    '<script src="/test/test.js"></script>\n' +
'</body>\n' +
'</html>\n' +
/* jslint-ignore-end */



            String()).replace((/\{\{envDict\.\w+?\}\}/g), function (match0) {
            switch (match0) {
            case '{{envDict.npm_package_description}}':
                return 'this is an example module';
            case '{{envDict.npm_package_name}}':
                return 'example-module';
            case '{{envDict.npm_package_version}}':
                return '0.0.1';
            }
        });
        app['/assets/istanbul-lite.js'] =
            app.utility2.istanbul_lite['/assets/istanbul-lite.js'];
        app['/assets/utility2.css'] =
            app.utility2['/assets/utility2.css'];
        app['/assets/utility2.js'] =
            app.utility2['/assets/utility2.js'];
        app['/test/hello'] =
            'hello';
        app['/test/test.js'] =
            app.utility2.istanbul_lite.instrumentSync(
                app.fs.readFileSync(__filename, 'utf8'),
                __filename
            );
        // init app.serverMiddlewareList
        app.serverMiddlewareList = [
            function (request, response, next) {
                /*
                this function is the main test-middleware
                */
                switch (request.urlPathNormalized) {
                // serve assets
                case '/':
                case '/assets/istanbul-lite.js':
                case '/assets/utility2.css':
                case '/assets/utility2.js':
                case '/test/hello':
                case '/test/test.js':
                    response.end(app[request.urlPathNormalized]);
                    break;
                // default to next middleware
                default:
                    next();
                }
            }
        ];
        // this test-runner will
        // 1. create http-server from app.serverMiddlewareList
        // 2. start http-server on port $npm_config_server_port
        // 3. if env var $npm_config_mode_npm_test is defined, then run tests
        app.utility2.testRunServer(app, process.exit);
    }
    return;
}());
```
#### output from shell
![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleJs.png)
#### output from [phantomjs-lite](https://www.npmjs.com/package/phantomjs-lite)
![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleJs.slimerjs.png)
#### output from [istanbul-lite](https://www.npmjs.com/package/istanbul-lite)
![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleJs.slimerjs._2Ftmp_2Fapp_2Ftmp_2Fbuild_2Fcoverage.html_2Fapp_2Fexample.js.html.png)



# npm-dependencies
- [istanbul-lite](https://www.npmjs.com/package/istanbul-lite)
- [jslint-lite](https://www.npmjs.com/package/jslint-lite)



# package-listing
[![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.gitLsTree.png)](https://github.com/kaizhu256/node-utility2)



# package.json
```
{
    "_packageJson": true,
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": { "utility2" : "index.sh" },
    "dependencies": {
        "istanbul-lite": "2015.3.6-13",
        "jslint-lite": "2015.3.6-13"
    },
    "devDependencies": {
        "phantomjs-lite": "^2015.1.4-102"
    },
    "description": "run dynamic browser tests with coverage \
(via istanbul-lite and phantomjs-lite)",
    "engines": { "node": ">=0.10 <=0.12" },
    "keywords": [
        "browser",
        "build",
        "ci",
        "code",
        "cover",
        "coverage",
        "csslint",
        "eshint",
        "eslint",
        "istanbul",
        "instrument",
        "jshint",
        "jslint",
        "lightweight",
        "lint",
        "phantomjs",
        "slimerjs",
        "test",
        "travis",
        "web"
    ],
    "license": "MIT",
    "name": "utility2",
    "os": ["darwin", "linux"],
    "repository" : {
        "type" : "git",
        "url" : "https://github.com/kaizhu256/node-utility2.git"
    },
    "scripts": {
        "build2": "./index.sh shRun shBuild",
        "start": "npm_config_mode_auto_restart=1 ./index.sh shRun node test.js",
        "test": "./index.sh shRun shReadmePackageJsonExport \
&& npm_config_mode_auto_restart=1 npm_config_mode_auto_restart_child=1 \
./index.sh shRun shNpmTest test.js"
    },
    "version": "2015.3.6-13"
}
```



# todo
- allow screen-capture to exit with non-zero exit-code
- create flamegraph from istanbul coverage
- auto-generate help doc from README.md
- add server stress test using phantomjs
- minify /assets/utility2.js in production-mode
- none



# changelog of last 50 commits
![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.gitLog.png)



# internal build-script
```
# build.sh
# this shell script will run the build process for this package
shBuild() {
    # init env
    export npm_config_mode_slimerjs=1 || return $?
    . ./index.sh && shInit || return $?

    # run npm-test on published package
    shRun shNpmTestPublished || return $?

    # test example js script
    MODE_BUILD=testExampleJs \
        shRunScreenCapture shReadmeTestJs example.js || return $?
    # screen-capture example.js coverage
    MODE_BUILD=testExampleJs shRun shPhantomScreenCapture \
        /tmp/app/tmp/build/coverage.html/app/example.js.html || :
    # copy phantomjs screen-capture to $npm_config_dir_build
    cp /tmp/app/tmp/build/screen-capture.*.png $npm_config_dir_build \
        || return $?

    # run npm-test
    MODE_BUILD=npmTest shRunScreenCapture npm test || return $?

    # deploy app to heroku
    shRun shHerokuDeploy hrku01-utility2-$CI_BRANCH || return $?

    # test deployed app to heroku
    if [ "$CI_BRANCH" = alpha ] ||
        [ "$CI_BRANCH" = beta ] ||
        [ "$CI_BRANCH" = master ]
    then
        local TEST_URL="https://hrku01-utility2-$CI_BRANCH.herokuapp.com" \
            || return $?
        TEST_URL="$TEST_URL?modeTest=phantom&_testSecret={{_testSecret}}" \
            || return $?
        MODE_BUILD=herokuTest shRun shPhantomTest $TEST_URL || return $?
    fi

    # if number of commits > 1024, then squash older commits
    shRun shGitBackupAndSquashAndPush 1024 > /dev/null || return $?
}
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
    MODE_BUILD=gitLog shRunScreenCapture git log -50 --pretty="%ai\u000a%B" \
        || return $?
    # add black border around phantomjs screen-capture
    shBuildPrint phantomScreenCapture \
        "add black border around phantomjs screen-capture" || return $?
    local FILE_LIST="$(ls \
        $npm_config_dir_build/screen-capture.*.phantomjs*.png \
        $npm_config_dir_build/screen-capture.*.slimerjs*.png \
        2>/dev/null)" || return $?
    if [ "$FILE_LIST" ] && (mogrify --version > /dev/null 2>&1)
    then
        printf "$FILE_LIST" | \
            xargs -n 1 mogrify -frame 1 -mattecolor black || return $?
    fi
}
shBuildCleanup || exit $?

shBuildGithubUploadCleanup() {
    # this function will cleanup build-artifacts in local gh-pages repo
    return
}

# upload build-artifacts to github,
# and if number of commits > 16, then squash older commits
COMMIT_LIMIT=16 shRun shBuildGithubUpload || exit $?

# exit with $EXIT_CODE
exit $EXIT_CODE
```
