utility2
========
run dynamic browser tests with coverage (via istanbul and electron)

[![NPM](https://img.shields.io/npm/v/utility2.svg?style=flat-square)](https://www.npmjs.com/package/utility2) [![NPM](https://img.shields.io/npm/dm/utility2.svg?style=flat-square)](https://www.npmjs.com/package/utility2)



# documentation
#### todo
- rename var data to result in test.js
- add es6 support in jslint
- add utility2.middlewareLimit
- add server stress test using electron
- none

#### change since ed10b33f
- npm publish 2016.2.1
- allow interrupting of covered-npm-test without re-running uncovered-npm-test
- add function utility2.bufferCreate, utility2.bufferToNodeBuffer, utility2.bufferToString, utility2.stringFromBase64, utility2.stringToBase64, utility2.timeElapsedStart, utility2.timeElapsedStop
- remove lib.stringview.js
- none

#### this package requires
- darwin or linux os

#### api-doc
- [https://kaizhu256.github.io/node-utility2/build/doc.api.html](https://kaizhu256.github.io/node-utility2/build/doc.api.html)

[![api-doc](https://kaizhu256.github.io/node-utility2/build/screen-capture.docApiCreate.browser._2Fhome_2Ftravis_2Fbuild_2Fkaizhu256_2Fnode-utility2_2Ftmp_2Fbuild_2Fdoc.api.html.png)](https://kaizhu256.github.io/node-utility2/build/doc.api.html)



# live test-server
- [https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/app/index.html](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/app/index.html)

[![github.com test-server](https://kaizhu256.github.io/node-utility2/build/screen-capture.githubDeploy.browser._2Fnode-utility2_2Fbuild..alpha..travis-ci.org_2Fapp_2Findex.html.png)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/app/index.html)



# build-status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-utility2.svg)](https://travis-ci.org/kaizhu256/node-utility2)
[![build commit status](https://kaizhu256.github.io/node-utility2/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-utility2)

| git-branch : | [master](https://github.com/kaizhu256/node-utility2/tree/master) | [beta](https://github.com/kaizhu256/node-utility2/tree/beta) | [alpha](https://github.com/kaizhu256/node-utility2/tree/alpha)|
|--:|:--|:--|:--|
| test-server : | [![github.com test-server](https://kaizhu256.github.io/node-utility2/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/app/index.html) | [![github.com test-server](https://kaizhu256.github.io/node-utility2/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/app/index.html) | [![github.com test-server](https://kaizhu256.github.io/node-utility2/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/app/index.html)|
| test-report : | [![test-report](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/test-report.html)|
| coverage : | [![istanbul coverage](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/coverage.html/index.html) | [![istanbul coverage](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/coverage.html/index.html) | [![istanbul coverage](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/coverage.html/index.html)|
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build..master..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build..beta..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build..alpha..travis-ci.org)|

#### master branch
- stable branch
- HEAD should be tagged, npm-published package

#### beta branch
- semi-stable branch
- HEAD should be latest, npm-published package

#### alpha branch
- unstable branch
- HEAD is arbitrary
- commit history may be rewritten



# quickstart interactive example
#### to run this example, follow the instruction in the script below
- example.sh

```shell
# example.sh

# this shell script will
    # npm install utility2
    # serve a webpage that will interactively run browser tests with coverage

# instruction
    # 1. copy and paste this entire shell script into a console and press enter
    # 2. open a browser to http://localhost:1337
    # 3. edit or paste script in browser to cover and test

shExampleSh() {(set -e
    # npm install utility2
    npm install utility2

    # serve a webpage that will interactively run browser tests with coverage
    cd node_modules/utility2 && export PORT=1337 && npm start
)}
shExampleSh
```

#### output from electron
![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleSh.browser..png)

#### output from shell
![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleSh.svg)



# quickstart node example
![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleJs.browser._2Ftmp_2Fapp_2Ftmp_2Fbuild_2Ftest-report.html.png)

#### to run this example, follow the instruction in the script below
- example.js

```javascript
/*
example.js

this shared browser / node script will run browser tests with coverage
(via istanbul and electron)

instruction
    1. save this js script as example.js
    2. run the shell command:
        $ npm install electron-lite utility2 && \
            export PATH="$(pwd)/node_modules/.bin:$PATH" && \
            export PORT=1337 && \
            export npm_config_mode_coverage=1 && \
            node_modules/.bin/utility2 test node example.js
    3. view test-report in ./tmp/build/test-report.html
    4. view coverage in ./tmp/build/coverage.html/index.html
*/

/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/

(function () {
    'use strict';
    var local;



    // run shared js-env code - pre-init
    (function () {
        // init local
        local = {};
        // init modeJs
        local.modeJs = (function () {
            try {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
                    typeof XMLHttpRequest.prototype.open === 'function' &&
                    'browser';
            } catch (errorCaughtBrowser) {
                return module.exports &&
                    typeof process.versions.node === 'string' &&
                    typeof require('http').createServer === 'function' &&
                    'node';
            }
        }());
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        // init utility2
        local = local.modeJs === 'browser'
            ? window.utility2.local
            : require('utility2').local;
        // export local
        local.global.local = local;
        // init middleware
        local.middleware = local.utility2.middlewareGroupCreate([
            local.utility2.middlewareInit,
            local.utility2.middlewareAssetsCached
        ]);
        // init error-middleware
        local.middlewareError = local.utility2.middlewareError;
        // run server-test
        local.utility2.testRunServer(local);
        // init assets
        local.utility2.assetsDict['/assets.hello'] = 'hello';
    }());
    switch (local.modeJs) {



    // run browser js-env code
    case 'browser':
        // init tests
        local.testCase_ajax_200 = function (options, onError) {
        /*
         * this function will test ajax's "200 ok" handling-behavior
         */
            var data;
            // jslint-hack
            local.utility2.nop(options);
            // test 'assets.hello'
            local.utility2.ajax({
                url: 'assets.hello'
            }, function (error, xhr) {
                try {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate data
                    data = xhr.responseText;
                    local.utility2.assert(data === 'hello', data);
                    onError();
                } catch (errorCaught) {
                    onError(errorCaught);
                }
            });
        };
        local.testCase_ajax_404 = function (options, onError) {
        /*
         * this function will test ajax's "404 not found" handling-behavior
         */
            // jslint-hack
            local.utility2.nop(options);
            // test '/undefined'
            local.utility2.ajax({ url: '/undefined' }, function (error) {
                try {
                    // validate error occurred
                    local.utility2.assert(error, error);
                    // validate 404 http statusCode
                    local.utility2.assert(error.statusCode === 404, error.statusCode);
                    onError();
                } catch (errorCaught) {
                    onError(errorCaught);
                }
            });
        };
        break;



    // run node js-env code
    case 'node':
        // init tests
        local.testCase_browserTest_default = function (options, onError) {
        /*
         * this function will spawn an electron process to test the test-page
         */
            // jslint-hack
            local.utility2.nop(options);
            local.utility2.browserTest({
                modeCoverageMerge: true,
                url: 'http://localhost:' + process.env.PORT + '?modeTest=consoleLogResult'
            }, onError);
        };
        // export local
        module.exports = local;
        // mock package.json env
        process.env.npm_package_description = 'this is an example module';
        process.env.npm_package_name = 'example-module';
        process.env.npm_package_version = '0.0.1';
        // init assets
        /* jslint-ignore-begin */
        local.utility2.templateIndexHtml = '\
<!doctype html>\n\
<html lang="en">\n\
<head>\n\
<meta charset="UTF-8">\n\
<title>\n\
{{envDict.npm_package_name}} @ {{envDict.npm_package_version}}\n\
</title>\n\
<link href="assets.utility2.css" rel="stylesheet">\n\
<style>\n\
* {\n\
    box-sizing: border-box;\n\
}\n\
body {\n\
    background-color: #fff;\n\
    font-family: Helvetical Neue, Helvetica, Arial, sans-serif;\n\
}\n\
body > div {\n\
    margin-top: 20px;\n\
}\n\
textarea {\n\
    font-family: monospace;\n\
    height: 32em;\n\
    width: 100%;\n\
}\n\
.jslintOutputPre {\n\
    color: #f00;\n\
}\n\
.testReportDiv {\n\
    display: none;\n\
}\n\
</style>\n\
</head>\n\
<body>\n\
    <div class="ajaxProgressDiv" style="display: block;">\n\
        <div class="ajaxProgressBarDiv ajaxProgressBarDivLoading">loading</div>\n\
    </div>\n\
    <h1>{{envDict.npm_package_name}} @ {{envDict.npm_package_version}}</h1>\n\
    <h3>{{envDict.npm_package_description}}</h3>\n\
    <div>edit or paste script below to cover and test</div>\n\
<textarea class="istanbulInputTextarea jslintInputTextarea">\n\
/*jslint browser: true*/\n\
(function () {\n\
    "use strict";\n\
    var testCaseDict;\n\
    testCaseDict = {};\n\
    testCaseDict.modeTest = true;\n\
\n\
    // comment this testCase to disable the failed assertion demo\n\
    testCaseDict.testCase_failed_assertion_demo = function (\n\
        options,\n\
        onError\n\
    ) {\n\
    /*\n\
     * this function will demo a failed assertion test\n\
     */\n\
        // jslint-hack\n\
        window.utility2.nop(options);\n\
        window.utility2.assert(false, "this is a failed assertion demo");\n\
        onError();\n\
    };\n\
\n\
    testCaseDict.testCase_passed_ajax_demo = function (options, onError) {\n\
    /*\n\
     * this function will demo a passed ajax test\n\
     */\n\
        var data;\n\
        // jslint-hack\n\
        window.utility2.nop(options);\n\
        // test ajax request for main-page "/"\n\
        window.utility2.ajax({\n\
            url: "/"\n\
        }, function (error, xhr) {\n\
            try {\n\
                // validate no error occurred\n\
                window.utility2.assert(!error, error);\n\
                // validate non-empty data\n\
                data = xhr.responseText;\n\
                window.utility2.assert(data && data.length > 0, data);\n\
                // validate "200 ok" status\n\
                if (xhr.statusCode === 200) {\n\
                    window.utility2.assert(data, data);\n\
                }\n\
                onError();\n\
            } catch (errorCaught) {\n\
                onError(errorCaught);\n\
            }\n\
        });\n\
    };\n\
\n\
    if (!window.utility2.modeTest) {\n\
        window.utility2.testRun(testCaseDict);\n\
    }\n\
}());\n\
</textarea>\n\
    <pre class="jslintOutputPre"></pre>\n\
    <div class="testReportDiv"></div>\n\
    <div class="istanbulCoverageDiv"></div>\n\
<script src="assets.utility2.lib.bcrypt.js"></script>\n\
<script src="assets.utility2.lib.cryptojs.js"></script>\n\
<script src="assets.utility2.lib.istanbul.js"></script>\n\
<script src="assets.utility2.lib.jslint.js"></script>\n\
<script src="assets.utility2.lib.uglifyjs.js"></script>\n\
<script src="assets.utility2.js"></script>\n\
<script>window.utility2.onReady.counter += 1;</script>\n\
<script src="assets.example.js"></script>\n\
{{scriptExtra}}\n\
<script>window.utility2.onReady();</script>\n\
<script>\n\
window.utility2.envDict.npm_package_description = "{{envDict.npm_package_description}}";\n\
window.utility2.envDict.npm_package_name = "{{envDict.npm_package_name}}";\n\
window.utility2.envDict.npm_package_version = "{{envDict.npm_package_version}};"\n\
window.testRun = function () {\n\
    if (window.utility2.modeTest) {\n\
        return;\n\
    }\n\
    // jslint .jslintInputTextarea\n\
    window.utility2.jslintAndPrint(\n\
        (document.querySelector(".jslintInputTextarea") || {}).value || "",\n\
        "jslintInputTextarea.js"\n\
    );\n\
    (document.querySelector(".jslintOutputPre") || {}).textContent =\n\
        window.utility2.jslint.errorText\n\
        .replace((/\\u001b\\[\\d+m/g), "")\n\
        .trim();\n\
    // try to cleanup __coverage__\n\
    try {\n\
        delete window.__coverage__["/istanbulInputTextarea.js"];\n\
    } catch (ignore) {\n\
    }\n\
    // try to eval input-code\n\
    try {\n\
        eval(window.utility2.istanbulInstrumentSync(\n\
            document.querySelector(".istanbulInputTextarea").value,\n\
            "/istanbulInputTextarea.js"\n\
        ));\n\
        window.utility2.istanbulCoverageReportCreate({ coverage: window.__coverage__ });\n\
    } catch (errorCaught) {\n\
        document.querySelector(".istanbulCoverageDiv").innerHTML =\n\
            "<pre>" + errorCaught.stack.replace((/</g), "&lt") + "</pre>";\n\
    }\n\
};\n\
document.querySelector(".istanbulInputTextarea")\n\
    .addEventListener("keyup", window.testRun);\n\
window.testRun({});\n\
</script>\n\
</body>\n\
</html>\n\
';
        /* jslint-ignore-end */
        local.utility2.assetsDict['/'] = local.utility2.templateIndexHtml
            .replace((/\{\{envDict\.\w+?\}\}/g), function (match0) {
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
            })
            .replace('{{scriptExtra}}', '');
        local.utility2.assetsDict['/assets.example.js'] =
            // cover example.js
            local.utility2.istanbulInstrumentSync(
                local.fs.readFileSync(__dirname + '/example.js', 'utf8'),
                __dirname + '/example.js'
            );
        break;
    }
}());
```

#### output from utility2
![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleJs.browser._2Ftmp_2Fapp_2Ftmp_2Fbuild_2Ftest-report.html.png)

#### output from istanbul
![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleJs.browser._2Ftmp_2Fapp_2Ftmp_2Fbuild_2Fcoverage.html_2Fapp_2Fexample.js.html.png)

#### output from shell
![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleJs.svg)



# npm-dependencies
- none



# package-listing
[![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.gitLsTree.svg)](https://github.com/kaizhu256/node-utility2)



# package.json
```json
{
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": {
        "utility2": "index.sh",
        "utility2-bcrypt": "lib.bcrypt.js",
        "utility2-istanbul": "lib.istanbul.js",
        "utility2-jslint": "lib.jslint.js",
        "utility2-uglifyjs": "lib.uglifyjs.js"
    },
    "description": "run dynamic browser tests with coverage (via istanbul and electron)",
    "devDependencies": {
        "electron-lite": "2015.12.4"
    },
    "engines": { "node": ">=4.0" },
    "keywords": [
        "atom", "atom-shell",
        "browser", "build",
        "ci", "code", "continuous-integration", "cover", "coverage",
        "electron",
        "headless", "headless-browser",
        "instrument", "istanbul",
        "jscover", "jscoverage",
        "phantom", "phantomjs",
        "slimer", "slimerjs",
        "test", "travis", "travis-ci",
        "web"
    ],
    "license": "MIT",
    "name": "utility2",
    "os": ["darwin", "linux"],
    "repository": {
        "type": "git",
        "url": "https://github.com/kaizhu256/node-utility2.git"
    },
    "scripts": {
        "build-ci": "./index.sh shRun shReadmeBuild",
        "build-doc": "export MODE_LINENO=0 && \
./index.sh shRun shReadmeExportFile package.json package.json && \
./index.sh shRun shDocApiCreate \"module.exports={ \
exampleFileList:['README.md','test.js','index.js', \
'lib.bcrypt.js','lib.cryptojs.js','lib.istanbul.js','lib.jslint.js','lib.uglifyjs.js'], \
moduleDict:{ \
utility2:{exports:require('./index.js')}, \
'utility2.bcrypt':{aliasList:['bcrypt','local'],exports:require('./index.js').bcrypt}, \
'utility2.cryptojs':{aliasList:['cryptojs','local'],exports:require('./index.js').cryptojs}, \
'utility2.istanbul':{aliasList:['istanbul','local'],exports:require('./index.js').istanbul}, \
'utility2.jslint':{aliasList:['jslint','local'],exports:require('./index.js').jslint}, \
'utility2.FormData':{aliasList:['FormData','local'], \
exports:require('./index.js').FormData}, \
'utility2.FormData.prototype':{aliasList:['data'], \
exports:require('./index.js').FormData.prototype}, \
'utility2.uglifyjs':{aliasList:['uglifyjs','local'],exports:require('./index.js').uglifyjs} \
} \
}\"",
        "env": "env",
        "start": "export PORT=${PORT:-8080} && \
export npm_config_mode_auto_restart=1 && \
./index.sh shRun shIstanbulCover node test.js",
        "test": "export MODE_LINENO=0 && \
./index.sh shRun shReadmeExportFile package.json package.json && \
export PORT=$(./index.sh shServerPortRandom) && \
export npm_config_mode_auto_restart=1 && \
./index.sh test node test.js",
        "test-published": "./index.sh shRun shNpmTestPublished"
    },
    "version": "2016.2.1"
}
```



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.gitLog.svg)](https://github.com/kaizhu256/node-utility2/commits)



# internal build-script
- build.sh

```shell
# build.sh

# this shell script will run the build for this package

shBuildCiTestPre() {(set -e
# this function will run the pre-test build
    # test example js script
    (export MODE_BUILD=testExampleJs &&
        export MODE_LINENO=0 &&
        shRunScreenCapture shReadmeTestJs example.js)
    # screen-capture example.js coverage
    (export MODE_BUILD=testExampleJs &&
        export modeBrowserTest=screenCapture &&
        export url=/tmp/app/tmp/build/coverage.html/app/example.js.html &&
        shBrowserTest)
    # screen-capture example.js test-report
    (export MODE_BUILD=testExampleJs &&
        export modeBrowserTest=screenCapture &&
        export url=/tmp/app/tmp/build/test-report.html &&
        shBrowserTest)

    # test example shell script
    (export MODE_BUILD=testExampleSh &&
        export npm_config_timeout_exit=1000 &&
        shRunScreenCapture shReadmeTestSh example.sh)
    # save screen-capture
    cp "/tmp/app/node_modules/$npm_package_name/tmp/build/"screen-capture.*.png \
        "$npm_config_dir_build"
)}

shBuildCiTestPost() {(set -e
# this function will run the post-test build
    # if running legacy-node, then exit
    [ "$(node --version)" \< "v5.0" ] && exit || true
    # if branch is not alpha, beta, or master, then exit
    if !([ "$CI_BRANCH" = alpha ] ||
        [ "$CI_BRANCH" = beta ] ||
        [ "$CI_BRANCH" = master ])
    then
        exit
    fi
    TEST_URL="https://$(printf "$GITHUB_REPO" | \
        sed 's/\//.github.io\//')/build..$CI_BRANCH..travis-ci.org/app/index.html"
    # deploy app to gh-pages
    (export npm_config_file_test_report_merge="$npm_config_dir_build/test-report.json" &&
        shGithubDeploy)
    # test deployed app to gh-pages
    (export MODE_BUILD=githubTest &&
        export modeBrowserTest=test &&
        export npm_config_file_test_report_merge="$npm_config_dir_build/test-report.json" &&
        export url="$TEST_URL?modeTest=consoleLogResult&timeExit={{timeExit}}" &&
        shBrowserTest)
)}

shBuild() {
# this function will run the main build
    set -e
    # init env
    . ./index.sh && shInit
    # cleanup github-gh-pages dir
    # export BUILD_GITHUB_UPLOAD_PRE_SH="rm -fr build"
    # init github-gh-pages commit-limit
    export COMMIT_LIMIT=16
    # run default build
    shBuildCiDefault
}
shBuild
```
