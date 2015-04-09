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



# quickstart interactive example
#### to run this example, follow the instruction in the script below
```
# example.sh

# this shell script will
    # npm install utility2
    # serve a webpage that will interactively run browser tests with coverage

# instruction
    # 1. copy and paste this entire shell script into a console and press enter
    # 2. open a browser to http://localhost:1337
    # 3. edit or paste script in browser to cover and test

shExampleSh() {
    # npm install utility2
    npm install utility2 || return $?

    # serve a webpage that will interactively run browser tests with coverage
    cd node_modules/utility2 && npm start --server-port=1337 || return $?
}
shExampleSh
```
#### output from shell
[![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleSh.png)](https://travis-ci.org/kaizhu256/node-utility2)
#### output from phantomjs-lite
[![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleSh.slimerjs..png)](https://hrku01-utility2-beta.herokuapp.com)



# quickstart programmatic example
#### to run this example, follow the instruction in the script below
```
/*
example.js

this shared browser / node script will programmatically
run browser tests with coverage (via istanbul-lite and phantomjs-lite)

instruction
    1. save this js script as example.js
    2. run the shell command:
        $ npm install phantomjs-lite utility2 && \
            PATH=$(pwd)/node_modules/phantomjs-lite:$PATH && \
            node_modules/.bin/utility2 test example.js
    3. view test-report in ./tmp/build/test-report.html
    4. view coverage in ./tmp/build/coverage.html/index.html
*/

/*jslint
    browser: true,
    maxerr: 8,
    maxlen: 80,
    node: true,
    nomen: true,
    stupid: true
*/

(function () {
    'use strict';
    var local;



    // run shared js-env code
    (function () {
        // init local
        local = {};
        // init utility2
        local.utility2 = typeof window === 'object'
            ? window.utility2
            : require('utility2');
        // init istanbul_lite
        local.istanbul_lite = local.utility2.local.istanbul_lite;
        // init jslint_lite
        local.jslint_lite = local.utility2.local.jslint_lite;
    }());



    // run browser js-env code
    if (typeof window === 'object') {
        // init browser js-env tests
        local.testCase_ajax_200 = function (onError) {
            /*
                this function will test ajax's "200 ok" handling behavior
            */
            // test '/test/hello'
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
        local.testCase_ajax_404 = function (onError) {
            /*
                this function will test ajax's "404 not found" handling behavior
            */
            // test '/test/undefined'
            local.utility2.ajax({
                url: '/test/undefined'
            }, function (error) {
                local.utility2.testTryCatch(function () {
                    // validate error occurred
                    local.utility2.assert(error instanceof Error, error);
                    // validate 404 http statusCode
                    local.utility2.assert(
                        error.statusCode === 404,
                        error.statusCode
                    );
                    onError();
                }, onError);
            });
        };
        // run test
        local.utility2.testRun(local, local.utility2.nop);



    // run node js-env code
    } else {
        // mock package.json env
        process.env.npm_package_description = 'this is an example module';
        process.env.npm_package_name = 'example-module';
        process.env.npm_package_version = '0.0.1';
        // require modules
        local.fs = require('fs');
        // init node js-env tests
        local.testCase_phantomTest_default = function (onError) {
            /*
                this function will spawn phantomjs to test the test-page
            */
            local.utility2.phantomTest({
                url: 'http://localhost:' +
                    process.env.npm_config_server_port +
                    '?modeTest=phantom'
            }, onError);
        };
        // init assets
        local['/'] = (String() +



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
    '{{envDict.npm_config_html_head_extra}}\n' +
'</head>\n' +
'<body>\n' +
    '<div class="ajaxProgressDiv" style="display: none;">\n' +
    '<div class="ajaxProgressBarDiv ajaxProgressBarDivLoading" \
>loading</div>\n' +
    '</div>\n' +
    '<h1 \
>{{envDict.npm_package_name}} [{{envDict.npm_package_version}}]</h1>\n' +
    '<h3>{{envDict.npm_package_description}}</h3>\n' +
    '<div>edit or paste script below to cover and test</div>\n' +
'<textarea class="istanbulInputTextarea jslintInputTextarea">\n' +
'/*jslint browser: true*/\n' +
'(function () {\n' +
    '"use strict";\n' +
    'window.utility2.testRun({\n' +
'\n' +
        'modeTest: true,\n' +
'\n' +
        '// comment this code to skip the failed assertion demo\n' +
        'testCase_failed_assertion_demo: function (onError) {\n' +
            '/*\n' +
                'this function will demo a failed assertion test\n' +
            '*/\n' +
            'window.utility2.assert(\n' +
                'false,\n' +
                '"this is a failed assertion demo"\n' +
            ');\n' +
            'onError();\n' +
        '},\n' +
'\n' +
        'testCase_passed_ajax_demo: function (onError) {\n' +
            '/*\n' +
                'this function will demo a passed ajax test\n' +
            '*/\n' +
            '// test ajax request for main-page "/"\n' +
            'window.utility2.ajax({\n' +
                'url: "/"\n' +
            '}, function (error, data, xhr) {\n' +
                'try {\n' +
                    '// validate no error occurred\n' +
                    'window.utility2.assert(!error, error);\n' +
                    '// validate non-empty data\n' +
                    'window.utility2.assert(data && data.length > 0, data);\n' +
                    '// validate "200 ok" status\n' +
                    'if (xhr.status === 200) {\n' +
                        'window.utility2.assert(data, data);\n' +
                    '}\n' +
                    'onError();\n' +
                '} catch (errorCaught) {\n' +
                    'onError(errorCaught);\n' +
                '}\n' +
            '});\n' +
        '}\n' +
    '});\n' +
'}());\n' +
'</textarea>\n' +
    '<pre class="jslintOutputPre"></pre>\n' +
    '<div class="testReportDiv"></div>\n' +
    '<div class="istanbulCoverageDiv"></div>\n' +
    '<script src="/assets/istanbul-lite.js"></script>\n' +
    '<script src="/assets/jslint-lite.js"></script>\n' +
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
    ').addEventListener("keyup", function () {\n' +
        'window.utility2.taskGroupCreateOrAddCallback(\n' +
            '{ key: "testTextarea" },\n' +
            'function (onError) {\n' +
                'window.utility2.onErrorExit = onError;\n' +
                'window.jslint_lite.jslintTextarea();\n' +
                'window.istanbul_lite.coverTextarea();\n' +
            '},\n' +
            'window.utility2.nop\n' +
        ');\n' +
    '});\n' +
    'if (!window.utility2.modeTest) {\n' +
        'window.jslint_lite.jslintTextarea();\n' +
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
                return process.env.npm_package_description;
            case '{{envDict.npm_package_name}}':
                return process.env.npm_package_name;
            case '{{envDict.npm_package_version}}':
                return process.env.npm_package_version;
            default:
                return '';
            }
        });
        local['/assets/istanbul-lite.js'] =
            local.istanbul_lite['/assets/istanbul-lite.js'];
        local['/assets/utility2.css'] =
            local.utility2['/assets/utility2.css'];
        local['/assets/utility2.js'] =
            local.utility2['/assets/utility2.js'];
        local['/test/hello'] =
            'hello';
        local['/test/test.js'] =
            local.istanbul_lite.instrumentSync(
                local.fs.readFileSync(__filename, 'utf8'),
                __filename
            );
        // init middleware
        local.middleware = local.utility2.middlewareGroupCreate([
            local.utility2.middlewareInit,
            function (request, response, nextMiddleware) {
                /*
                this will run the test-middleware
                */
                switch (request.urlParsed.pathnameNormalized) {
                // serve assets
                case '/':
                case '/assets/istanbul-lite.js':
                case '/assets/utility2.css':
                case '/assets/utility2.js':
                case '/test/hello':
                case '/test/test.js':
                    response.end(local[request.urlParsed.pathnameNormalized]);
                    break;
                // default to nextMiddleware
                default:
                    nextMiddleware();
                }
            }
        ]);
        // init middleware error-handler
        local.onMiddlewareError = local.utility2.onMiddlewareError;
        // start server and run tests
        local.utility2.testRunServer(local, process.exit);
    }
    return;
}());
```
#### output from shell
[![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleJs.png)](https://travis-ci.org/kaizhu256/node-utility2)
#### output from utility2
[![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleSh.slimerjs._2Ftmp_2Fapp_2Ftmp_2Fbuild_2Ftest-report.html.png)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/test-report.html)
#### output from istanbul-lite
[![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleJs.slimerjs._2Ftmp_2Fapp_2Ftmp_2Fbuild_2Fcoverage.html_2Fapp_2Fexample.js.html.png)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/coverage.html/node-utility2/index.js.html)



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
        "istanbul-lite": "2015.4.2-11",
        "jslint-lite": "2015.3.24-11"
    },
    "description": "run dynamic browser tests with coverage \
(via istanbul-lite and phantomjs-lite)",
    "devDependencies": {
        "phantomjs-lite": "2015.4.3-10"
    },
    "engines": { "node": ">=0.10 <=0.12" },
    "keywords": [
        "browser", "build",
        "ci", "code", "cover", "coverage", "csslint",
        "eshint", "eslint",
        "headless",
        "instrument", "istanbul",
        "jshint", "jslint",
        "light", "lightweight", "lint", "lite",
        "minimal",
        "phantom", "phantomjs",
        "slimer", "slimerjs",
        "test", "travis", "travis-ci",
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
        "build-ci": "./index.sh shRun shReadmeBuild",
        "start": "npm_config_mode_auto_restart=1 ./index.sh shRun node test.js",
        "test": "./index.sh shRun shReadmePackageJsonExport && \
npm_config_mode_auto_restart=1 npm_config_mode_auto_restart_child=1 \
./index.sh test test.js"
    },
    "version": "2015.4.9-a"
}
```



# todo
- add testCase for validating _testSecret
- create flamegraph from istanbul coverage
- auto-generate help doc from README.md
- add server stress test using phantomjs
- minify /assets/utility2.js in production-mode
- none



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.gitLog.png)](https://github.com/kaizhu256/node-utility2/commits)



# internal build-script
```
# build.sh
# this shell script will run the build for this package
shBuild() {
    # this function will run the main build
    local TEST_URL || return $?

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
        /tmp/app/tmp/build/coverage.html/app/example.js.html || return $?
    # copy phantomjs screen-capture to $npm_config_dir_build
    cp /tmp/app/tmp/build/screen-capture.*.png $npm_config_dir_build || \
        return $?
    # screen-capture example.js test-report
    MODE_BUILD=testExampleSh shRun shPhantomScreenCapture \
        /tmp/app/tmp/build/test-report.html || return $?

    # test example shell script
    MODE_BUILD=testExampleSh \
        npm_config_timeout_exit=1000 \
        shRunScreenCapture shReadmeTestSh example.sh || return $?
    # save screen-capture
    cp /tmp/app/node_modules/utility2/tmp/build/screen-capture.*.png \
        $npm_config_dir_build || return $?

    # run npm-test
    MODE_BUILD=npmTest shRunScreenCapture npm test || return $?

    [ "$(node --version)" \< "v0.12" ] && return

    # deploy app to heroku
    shRun shHerokuDeploy hrku01-utility2-$CI_BRANCH || return $?

    # test deployed app to heroku
    if [ "$CI_BRANCH" = alpha ] ||
        [ "$CI_BRANCH" = beta ] ||
        [ "$CI_BRANCH" = master ]
    then
        TEST_URL="https://hrku01-utility2-$CI_BRANCH.herokuapp.com" || \
            return $?
        TEST_URL="$TEST_URL?modeTest=phantom&_testSecret={{_testSecret}}" || \
            return $?
        MODE_BUILD=herokuTest shRun shPhantomTest $TEST_URL || return $?
    fi

    # if number of commits > 1024, then squash older commits
    shRun shGitBackupAndSquashAndPush 1024 > /dev/null || return $?
}
shBuild

# save exit-code
EXIT_CODE=$?
[ "$(node --version)" \< "v0.12" ] && exit $EXIT_CODE

shBuildCleanup() {
    # this function will cleanup build-artifacts in local build dir
    # create package-listing
    MODE_BUILD=gitLsTree shRunScreenCapture shGitLsTree || return $?
    # create recent changelog of last 50 commits
    MODE_BUILD=gitLog shRunScreenCapture git log -50 --pretty="%ai\u000a%B" || \
        return $?
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
