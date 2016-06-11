utility2
========
this package will run dynamic browser tests with coverage (via istanbul and electron)

[![NPM](https://img.shields.io/npm/v/utility2.svg?style=flat-square)](https://www.npmjs.com/package/utility2) [![NPM](https://img.shields.io/npm/dm/utility2.svg?style=flat-square)](https://www.npmjs.com/package/utility2) [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-utility2.svg)](https://travis-ci.org/kaizhu256/node-utility2)



# documentation
#### todo
- add socket-io to repl-server
- add utility2.middlewareLimit
- add server stress test using electron
- none

#### change since c0a94961
- npm publish 2016.5.3
- add homepage-link in api-doc
- fix test-report styling
- none

#### this package requires
- darwin or linux os
- chromium-based browser or firefox browser

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
    # 2. open a browser to http://localhost:8081
    # 3. edit or paste script in browser to cover and test

shExampleSh() {(set -e
    # npm install utility2
    npm install utility2

    # serve a webpage that will interactively run browser tests with coverage
    cd node_modules/utility2 && export PORT=8081 && npm start
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
            export PORT=8081 && \
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
        /* istanbul ignore next */
        // init local
        local = local.modeJs === 'browser'
            ? window.utility2.local
            : module.isRollup
            ? module
            : require('utility2').local;
        // export local
        local.global.local = local;
        // init envDict
        local.utility2.objectSetDefault(local.utility2.envDict, {
            npm_package_description: 'undefined module',
            npm_package_name: 'undefined',
            npm_package_version: '0.0.1'
        });
        // init middleware
        local.middleware = local.utility2.middlewareGroupCreate([
            local.utility2.middlewareInit,
            local.utility2.middlewareAssetsCached,
            local.utility2.middlewareJsonpStateGet
        ]);
        // init error-middleware
        local.middlewareError = local.utility2.middlewareError;
        // run server-test
        local.utility2.testRunServer(local);
        // init assets
        local.utility2.assetsDict['/assets.hello'] = 'hello';
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        // init tests
        local.testCase_ajax_200 = function (options, onError) {
        /*
         * this function will test ajax's "200 ok" handling-behavior
         */
            options = {};
            // test ajax-path 'assets.hello'
            local.utility2.ajax({
                url: 'assets.hello'
            }, function (error, xhr) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate data
                    options.data = xhr.responseText;
                    local.utility2.assert(options.data === 'hello', options.data);
                    onError();
                }, onError);
            });
        };
        local.testCase_ajax_404 = function (options, onError) {
        /*
         * this function will test ajax's "404 not found" handling-behavior
         */
            options = {};
            // test ajax-path '/undefined'
            local.utility2.ajax({ url: '/undefined' }, function (error) {
                local.utility2.tryCatchOnError(function () {
                    // validate error occurred
                    local.utility2.assert(error, error);
                    options.statusCode = error.statusCode;
                    // validate 404 http statusCode
                    local.utility2.assert(options.statusCode === 404, options.statusCode);
                    onError();
                }, onError);
            });
        };
        break;



    // run node js-env code - post-init
    case 'node':
        // init tests
        local.testCase_webpage_default = function (options, onError) {
        /*
         * this function will test the webpage's default handling-behavior
         */
            options = {
                modeCoverageMerge: true,
                url: 'http://localhost:' + local.utility2.envDict.PORT +
                    '?modeTest=consoleLogResult'
            };
            local.utility2.browserTest(options, onError);
        };
        // export local
        module.exports = local;
        // init assets
        /* istanbul ignore next */
        local.utility2.assetsDict['/assets.example.js'] = local.global.assetsExampleJs ||
            local.fs.readFileSync(__filename, 'utf8');
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
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n\
}\n\
body > * {\n\
    margin-bottom: 1rem;\n\
}\n\
textarea {\n\
    font-family: monospace;\n\
    height: 32rem;\n\
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
    <h1>\n\
        <a\n\
            {{#if envDict.npm_package_homepage}}\n\
            href="{{envDict.npm_package_homepage}}"\n\
            {{/if envDict.npm_package_homepage}}\n\
        >\n\
            {{envDict.npm_package_name}} @ {{envDict.npm_package_version}}\n\
        </a>\n\
    </h1>\n\
    <h3>{{envDict.npm_package_description}}</h3>\n\
    <h4><a href="assets.app.js">download standalone app</a></h4>\n\
    <div>edit or paste script below to cover and test</div>\n\
<textarea class="istanbulInputTextarea jslintInputTextarea jsonStringifyInputTextarea">\n\
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
        options = { url: "/" };\n\
        // test ajax request for main-page "/"\n\
        window.utility2.ajax(options, function (error, xhr) {\n\
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
    <pre class="jsonStringifyPre"></pre>\n\
    <pre class="jslintOutputPre"></pre>\n\
    <div class="testReportDiv"></div>\n\
    <div class="istanbulCoverageDiv"></div>\n\
{{#if isRollup}}\n\
<script src="assets.app.js"></script>\n\
{{#unless isRollup}}\n\
<script src="assets.utility2.lib.bcrypt.js"></script>\n\
<script src="assets.utility2.lib.cryptojs.js"></script>\n\
<script src="assets.utility2.lib.istanbul.js"></script>\n\
<script src="assets.utility2.lib.jslint.js"></script>\n\
<script src="assets.utility2.lib.uglifyjs.js"></script>\n\
<script src="assets.utility2.js"></script>\n\
<script src="jsonp.utility2.stateGet?callback=window.utility2.stateInit"></script>\n\
<script>window.utility2.onReadyBefore.counter += 1;</script>\n\
<script src="assets.example.js"></script>\n\
<script src="assets.test.js"></script>\n\
<script>window.utility2.onReadyBefore();</script>\n\
{{/if isRollup}}\n\
<script>\n\
window.testRun = function () {\n\
    if (window.utility2.modeTest) {\n\
        return;\n\
    }\n\
    // try to JSON.stringify .jsonStringifyInputTextarea\n\
    try {\n\
        document.querySelector(".jsonStringifyPre").textContent = JSON.stringify(\n\
            JSON.parse(document.querySelector(".jsonStringifyInputTextarea").value),\n\
            null,\n\
            4\n\
        );\n\
    } catch (ignore) {\n\
    }\n\
    // jslint .jslintInputTextarea\n\
    window.utility2_jslint.jslintAndPrint(\n\
        document.querySelector(".jslintInputTextarea").value,\n\
        "jslintInputTextarea.js"\n\
    );\n\
    document.querySelector(".jslintOutputPre").textContent =\n\
        window.utility2_jslint.errorText\n\
        .replace((/\\u001b\\[\\d+m/g), "")\n\
        .trim();\n\
    // try to cleanup __coverage__\n\
    try {\n\
        delete window.__coverage__["/istanbulInputTextarea.js"];\n\
    } catch (ignore) {\n\
    }\n\
    // try to eval input-code\n\
    try {\n\
        eval(window.utility2_istanbul.instrumentSync(\n\
            document.querySelector(".istanbulInputTextarea").value,\n\
            "/istanbulInputTextarea.js"\n\
        ));\n\
        window.utility2_istanbul.coverageReportCreate({\n\
            coverage: window.__coverage__\n\
        });\n\
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
        local.utility2.assetsDict['/'] = local.utility2.templateRender(
            local.utility2.templateIndexHtml,
            { envDict: local.utility2.envDict }
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
    "package.json": true,
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": {
        "utility2": "index.sh",
        "utility2-bcrypt": "lib.bcrypt.js",
        "utility2-istanbul": "lib.istanbul.js",
        "utility2-jslint": "lib.jslint.js",
        "utility2-uglifyjs": "lib.uglifyjs.js"
    },
    "description": "this package will run dynamic browser tests with coverage \
(via istanbul and electron)",
    "devDependencies": {
        "electron-lite": "2016.5.1"
    },
    "engines": { "node": ">=4.0" },
    "homepage": "https://github.com/kaizhu256/node-utility2",
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
        "build-app": "npm test --mode-test-case=testCase_build_app",
        "build-ci": "./index.sh shRun shReadmeBuild",
        "build-doc": "npm test --mode-test-case=testCase_build_doc",
        "env": "env",
        "example.js": "\
. ./index.sh && shInit && shReadmeExportScripts && \
cp $(shFileTrimLeft tmp/README.package.json) package.json && \
shFileTrimLeft tmp/README.example.js && \
shRunScreenCapture shReadmeTestJs example.js",
        "example.sh": "\
. ./index.sh && shInit && shReadmeExportScripts && \
cp $(shFileTrimLeft tmp/README.package.json) package.json && \
shRunScreenCapture shReadmeTestSh example.sh",
        "start": "export PORT=${PORT:-8080} && \
export npm_config_mode_auto_restart=1 && \
./index.sh shRun shIstanbulCover node test.js",
        "test": "\
. ./index.sh && shInit && shReadmeExportScripts && \
cp $(shFileTrimLeft tmp/README.package.json) package.json && \
export PORT=$(./index.sh shServerPortRandom) && \
export npm_config_mode_auto_restart=1 && \
./index.sh test node test.js",
        "test-published": "./index.sh shRun shNpmTestPublished"
    },
    "version": "2016.5.3"
}
```



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.gitLog.svg)](https://github.com/kaizhu256/node-utility2/commits)



# internal build-script
- Dockerfile.emscripten
```shell
# Dockerfile.emscripten
# docker build -f tmp/README.Dockerfile.emscripten -t emscripten .
FROM kaizhu256/node-utility2:latest
MAINTAINER kai zhu <kaizhu256@gmail.com>
# https://kripken.github.io/emscripten-site/docs
# /building_from_source/building_emscripten_from_source_using_the_sdk.html
# build emscripten @ 1.36.0
RUN cd / && \
    git clone https://github.com/juj/emsdk.git --branch=master --single-branch && \
    cd /emsdk && \
    ./emsdk install -j2 --shallow sdk-master-64bit && \
    ./emsdk activate && \
    find . -name ".git" -print0 | xargs -0 rm -fr && \
    find . -name "src" -print0 | xargs -0 rm -fr
```

- Dockerfile.latest
```shell
# Dockerfile.latest
# https://hub.docker.com/_/node/
FROM node:latest
MAINTAINER kai zhu <kaizhu256@gmail.com>
VOLUME [ \
  "/mnt", \
  "/root", \
  "/tmp", \
  "/var/cache", \
  "/var/lib/apt/lists", \
  "/var/log", \
  "/var/tmp" \
]
WORKDIR /tmp
# cache apt-get
RUN apt-get update && \
    apt-get install -y \
        busybox \
        chromium \
        cmake \
        default-jre \
        gconf2 \
        less \
        libnotify4 \
        vim \
        xvfb
# cache electron-lite
RUN npm install electron-lite && \
    cp /tmp/electron-*.zip /
```

- build.sh
```shell
# build.sh

# this shell script will run the build for this package

shBuildCiTestPre() {(set -e
# this function will run the pre-test build
    # test example js script
    (export MODE_BUILD=testExampleJs &&
        npm run example.js)
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
        npm run example.sh)
    # screen-capture example.sh webpage
    cp "/tmp/app/node_modules/$npm_package_name/tmp/build/"screen-capture.*.png \
        "$npm_config_dir_build"
)}

shBuildCiTestPost() {(set -e
# this function will run the post-test build
    # if running legacy-node, then exit
    [ "$(node --version)" \< "v5.0" ] && exit || true
    TEST_URL="https://$(printf "$GITHUB_REPO" | \
        sed 's/\//.github.io\//')/build..$CI_BRANCH..travis-ci.org/app/index.html"
    # deploy app to gh-pages
    (export MODE_BUILD=githubTest &&
        shGithubDeploy)
    # test deployed app to gh-pages
    (export MODE_BUILD=githubTest &&
        export modeBrowserTest=test &&
        export url="$TEST_URL?modeTest=consoleLogResult&timeExit={{timeExit}}" &&
        shBrowserTest)
    # docker build
    if [ "$TRAVIS" ] && [ "$CI_BRANCH" = alpha ]
    then
        # (CI_BRANCH=docker.latest npm run build-ci)
        :
    fi
)}

shBuild() {(set -e
# this function will run the main build
    # init env
    . ./index.sh && shInit
    # cleanup github-gh-pages dir
    export BUILD_GITHUB_UPLOAD_PRE_SH="rm -fr build"
    # init github-gh-pages commit-limit
    export COMMIT_LIMIT=16
    # if branch is alpha, beta, or master, then run default build
    if [ "$CI_BRANCH" = alpha ] ||
        [ "$CI_BRANCH" = beta ] ||
        [ "$CI_BRANCH" = master ]
    then
        shBuildCiDefault
    fi
    docker --version 2>/dev/null || exit
    # if running legacy-node, then exit
    [ "$TRAVIS" ] && [ "$(node --version)" \< "v5.0" ] && exit || true
    export DOCKER_TAG="$(printf "$CI_BRANCH" | sed -e "s/docker.//")"
    # if $DOCKER_TAG is not unique from $CI_BRANCH, then exit
    [ "$DOCKER_TAG" = "$CI_BRANCH" ] && exit || true
    # docker pull
    docker pull "$GITHUB_REPO:$DOCKER_TAG" || true
    # docker build
    (printf "0" > "$npm_config_file_tmp" &&
        docker build -f "tmp/README.Dockerfile.$DOCKER_TAG" -t "$GITHUB_REPO:$DOCKER_TAG" . ||
        printf $? > "$npm_config_file_tmp") | tee "tmp/build/build.$CI_BRANCH.log"
    EXIT_CODE="$(cat "$npm_config_file_tmp")"
    [ "$EXIT_CODE" != 0 ] && exit "$EXIT_CODE" || true
    # docker test
    case "$CI_BRANCH" in
    docker.latest)
        # npm test utility2
        for PACKAGE in utility2 "kaizhu256/node-utility2#alpha"
        do
            docker run "$GITHUB_REPO:$DOCKER_TAG" /bin/bash -c "set -e
                curl https://raw.githubusercontent.com\
/kaizhu256/node-utility2/alpha/index.sh > /tmp/index.sh
                . /tmp/index.sh
                npm install '$PACKAGE'
                cd node_modules/utility2
                shBuildInsideDocker
            "
        done
        ;;
    esac
    # https://docs.travis-ci.com/user/docker/#Pushing-a-Docker-Image-to-a-Registry
    # docker push
    if [ "$DOCKER_PASSWORD" ]
    then
        docker login -e="$DOCKER_EMAIL" -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
        docker push "$GITHUB_REPO:$DOCKER_TAG"
    fi
)}
shBuild
```
