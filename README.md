utility2
========
the zero-dependency swiss-army-knife for building, testing, and deploying webapps

[![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-utility2.svg)](https://travis-ci.org/kaizhu256/node-utility2) [![istanbul-coverage](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/coverage.html/index.html)

[![NPM](https://nodei.co/npm/utility2.png?downloads=true)](https://www.npmjs.com/package/utility2)

[![package-listing](https://kaizhu256.github.io/node-utility2/build/screen-capture.gitLsTree.svg)](https://github.com/kaizhu256/node-utility2)



# cdn download
- [https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/app/assets.utility2.rollup.js](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/app/assets.utility2.rollup.js)



# live demo
- [https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/app/index.html](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/app/index.html)

[![github.com test-server](https://kaizhu256.github.io/node-utility2/build/screen-capture.deployGithub.browser._2Fnode-utility2_2Fbuild..alpha..travis-ci.org_2Fapp_2Findex.html.png)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/app/index.html)



# documentation
#### api-doc
- [https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/api-doc.html](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/api-doc.html)

[![api-doc](https://kaizhu256.github.io/node-utility2/build/screen-capture.apiDoc.browser._2Fhome_2Ftravis_2Fbuild_2Fkaizhu256_2Fnode-utility2_2Ftmp_2Fbuild_2Fapi-doc.html.png)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/api-doc.html)

#### todo
- split function buildApiDoc into file lib.apidoc.js
- split function testRun into file lib.test.js
- rename test.js -> test.$npm_package_nameAlias.js
- add utility2.middlewareLimit
- add server stress test using electron
- none

#### change since 345e02c6
- npm publish 2017.2.28
- build - add publish build-branch
- build - auto-clean build if commit-message is CLEAN_BUILD
- build - auto-tag branch in master build-branch
- README.md - normalize browser-script in example.js
- promote utility2 plug in README.md, api-doc, code-coverage, rollup, test-coverage
- lib.db.js - add ttl-cache
- lib.utility2.js - revamp function buildApiDoc
- lib.utility2.sh - revamp shell-function shNpmPublish
- none

#### this package requires
- darwin or linux os
- chromium-based browser or firefox browser



# build status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-utility2.svg)](https://travis-ci.org/kaizhu256/node-utility2)
[![build commit status](https://kaizhu256.github.io/node-utility2/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-utility2)

| git-branch : | [master](https://github.com/kaizhu256/node-utility2/tree/master) | [beta](https://github.com/kaizhu256/node-utility2/tree/beta) | [alpha](https://github.com/kaizhu256/node-utility2/tree/alpha)|
|--:|:--|:--|:--|
| test-server-1 : | [![github.com test-server](https://kaizhu256.github.io/node-utility2/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/app/index.html) | [![github.com test-server](https://kaizhu256.github.io/node-utility2/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/app/index.html) | [![github.com test-server](https://kaizhu256.github.io/node-utility2/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/app/index.html)|
| test-server-2 : | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://h1-utility2-master.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://h1-utility2-beta.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://h1-utility2-alpha.herokuapp.com)|
| test-report : | [![test-report](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/test-report.html)|
| coverage : | [![istanbul-coverage](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/coverage.html/index.html) | [![istanbul-coverage](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/coverage.html/index.html) | [![istanbul-coverage](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/coverage.html/index.html)|
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
- [example.sh](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/example.sh)
```shell
# example.sh

# this shell script will serve a webpage that will interactively run browser-tests with coverage

# instruction
    # 1. copy and paste this entire shell script into a console and press enter
    # 2. play with the browser-demo on http://127.0.0.1:8081

shExampleSh() {(set -e
    # npm install utility2
    npm install utility2
    # serve a webpage that will interactively run browser-tests with coverage
    cd node_modules/utility2 && export PORT=8081 && npm start
)}
shExampleSh
```

#### output from browser
![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleSh.browser..png)

#### output from shell
![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleSh.svg)



# quickstart automated example
![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.testExampleJs.browser._2Ftmp_2Fapp_2Ftmp_2Fbuild_2Ftest-report.html.png)

#### to run this example, follow the instruction in the script below
- [example.js](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/example.js)
```javascript
/*
example.js

this script will demo automated browser-tests with coverage (via electron and istanbul)

instruction
    1. save this script as example.js
    2. run the shell command:
        $ npm install electron-lite utility2 && \
            PATH="$(pwd)/node_modules/.bin:$PATH" \
            PORT=8081 \
            npm_config_mode_coverage=utility2 \
            node_modules/.bin/utility2 test example.js
    3. view test-report in ./tmp/build/test-report.html
    4. view coverage in ./tmp/build/coverage.html/index.html
*/



/* istanbul instrument in package utility2 */
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
        // init utility2_rollup
        local = local.global.utility2_rollup || (local.modeJs === 'browser'
            ? window.utility2
            : require('utility2'));
        // export local
        local.global.local = local;
        // run test-server
        local.testRunServer(local);
        // init assets
        local.assetsDict['/assets.hello'] = 'hello';
    }());
    switch (local.modeJs) {



    // run browser js-env code - function
    case 'browser':
        local.testCase_ajax_200 = function (options, onError) {
        /*
         * this function will test ajax's "200 ok" handling-behavior
         */
            options = {};
            // test ajax-path 'assets.hello'
            local.ajax({ url: 'assets.hello' }, function (error, xhr) {
                local.tryCatchOnError(function () {
                    // validate no error occurred
                    local.assert(!error, error);
                    // validate data
                    options.data = xhr.responseText;
                    local.assert(options.data === 'hello', options.data);
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
            local.ajax({ url: '/undefined' }, function (error) {
                local.tryCatchOnError(function () {
                    // validate error occurred
                    local.assert(error, error);
                    options.statusCode = error.statusCode;
                    // validate 404 http statusCode
                    local.assert(options.statusCode === 404, options.statusCode);
                    onError();
                }, onError);
            });
        };
        break;



    // run node js-env code - function
    case 'node':
        local.testCase_webpage_default = function (options, onError) {
        /*
         * this function will test the webpage's default handling-behavior
         */
            options = { modeCoverageMerge: true, url: local.serverLocalHost + '?modeTest=1' };
            local.browserTest(options, onError);
        };
        break;
    }
    switch (local.modeJs) {



    // post-init
    /* istanbul ignore next */
    // run browser js-env code - post-init
    case 'browser':
        local.testRunBrowser = function (event) {
            if (!event || (event &&
                    event.currentTarget &&
                    event.currentTarget.className &&
                    event.currentTarget.className.includes &&
                    event.currentTarget.className.includes('onreset'))) {
                // reset output
                Array.from(
                    document.querySelectorAll('body > .resettable')
                ).forEach(function (element) {
                    switch (element.tagName) {
                    case 'INPUT':
                    case 'TEXTAREA':
                        element.value = '';
                        break;
                    default:
                        element.textContent = '';
                    }
                });
            }
            switch (event && event.currentTarget && event.currentTarget.id) {
            case 'testRunButton1':
                // show tests
                if (document.querySelector('#testReportDiv1').style.display === 'none') {
                    document.querySelector('#testReportDiv1').style.display = 'block';
                    document.querySelector('#testRunButton1').textContent =
                        'hide internal test';
                    local.modeTest = true;
                    local.testRunDefault(local);
                // hide tests
                } else {
                    document.querySelector('#testReportDiv1').style.display = 'none';
                    document.querySelector('#testRunButton1').textContent = 'run internal test';
                }
                break;
            // custom-case
            case 'testRunButton2':
                // run tests
                local.modeTest = true;
                local.testRunDefault(local);
                break;
            default:
                if (location.href.indexOf("modeTest=") >= 0) {
                    return;
                }
                // try to JSON.stringify #inputTextareaEval1
                try {
                    document.querySelector('#outputPreJsonStringify1').textContent = '';
                    document.querySelector('#outputPreJsonStringify1').textContent =
                        local.jsonStringifyOrdered(
                            JSON.parse(document.querySelector('#inputTextareaEval1').value),
                            null,
                            4
                        );
                } catch (ignore) {
                }
                // jslint #inputTextareaEval1
                local.jslint.errorText = '';
                if (document.querySelector('#inputTextareaEval1').value
                        .indexOf('/*jslint') >= 0) {
                    local.jslint.jslintAndPrint(
                        document.querySelector('#inputTextareaEval1').value,
                        'inputTextareaEval1.js'
                    );
                }
                document.querySelector('#outputPreJslint1').textContent =
                    local.jslint.errorText
                    .replace((/\u001b\[\d+m/g), '')
                    .trim();
                // try to cleanup __coverage__
                try {
                    delete local.global.__coverage__['/inputTextareaEval1.js'];
                } catch (ignore) {
                }
                // try to cover and eval input-code
                try {
                    /*jslint evil: true*/
                    document.querySelector('#outputTextarea1').value =
                        local.istanbul.instrumentSync(
                            document.querySelector('#inputTextareaEval1').value,
                            '/inputTextareaEval1.js'
                        );
                    eval(document.querySelector('#outputTextarea1').value);
                    document.querySelector('#coverageReportDiv1').innerHTML =
                        local.istanbul.coverageReportCreate({
                            coverage: window.__coverage__
                        });
                } catch (errorCaught) {
                    console.error(errorCaught.stack);
                }
            }
            if (document.querySelector('#inputTextareaEval1') && (!event || (event &&
                    event.currentTarget &&
                    event.currentTarget.className &&
                    event.currentTarget.className.includes &&
                    event.currentTarget.className.includes('oneval')))) {
                // try to eval input-code
                try {
                    /*jslint evil: true*/
                    eval(document.querySelector('#inputTextareaEval1').value);
                } catch (errorCaught) {
                    console.error(errorCaught.stack);
                }
            }
        };
        // log stderr and stdout to #outputTextareaStdout1
        ['error', 'log'].forEach(function (key) {
            console[key + '_original'] = console[key];
            console[key] = function () {
                var element;
                console[key + '_original'].apply(console, arguments);
                element = document.querySelector('#outputTextareaStdout1');
                if (!element) {
                    return;
                }
                // append text to #outputTextareaStdout1
                element.value += Array.from(arguments).map(function (arg) {
                    return typeof arg === 'string'
                        ? arg
                        : JSON.stringify(arg, null, 4);
                }).join(' ') + '\n';
                // scroll textarea to bottom
                element.scrollTop = element.scrollHeight;
            };
        });
        // init event-handling
        ['change', 'click', 'keyup'].forEach(function (event) {
            Array.from(document.querySelectorAll('.on' + event)).forEach(function (element) {
                element.addEventListener(event, local.testRunBrowser);
            });
        });
        // run tests
        local.testRunBrowser();
        break;



    /* istanbul ignore next */
    // run node js-env code - post-init
    case 'node':
        // export local
        module.exports = local;
        // require modules
        local.fs = require('fs');
        local.http = require('http');
        local.url = require('url');
        // init assets
        local.assetsDict = local.assetsDict || {};
        /* jslint-ignore-begin */
        local.assetsDict['/assets.index.template.html'] = '\
<!doctype html>\n\
<html lang="en">\n\
<head>\n\
<meta charset="UTF-8">\n\
<meta name="viewport" content="width=device-width, initial-scale=1">\n\
<title>{{env.npm_package_nameAlias}} v{{env.npm_package_version}}</title>\n\
<style>\n\
/*csslint\n\
    box-sizing: false,\n\
    universal-selector: false\n\
*/\n\
* {\n\
    box-sizing: border-box;\n\
}\n\
body {\n\
    background: #dde;\n\
    font-family: Arial, Helvetica, sans-serif;\n\
    margin: 2rem;\n\
}\n\
body > * {\n\
    margin-bottom: 1rem;\n\
}\n\
.utility2FooterDiv {\n\
    margin-top: 20px;\n\
    text-align: center;\n\
}\n\
</style>\n\
<style>\n\
/*csslint\n\
    ids: false,\n\
*/\n\
#outputPreJslint1 {\n\
    color: #d00;\n\
}\n\
textarea {\n\
    font-family: monospace;\n\
    height: 10rem;\n\
    width: 100%;\n\
}\n\
textarea[readonly] {\n\
    background: #ddd;\n\
}\n\
</style>\n\
</head>\n\
<body>\n\
<!-- utility2-comment\n\
<div id="ajaxProgressDiv1" style="background: #d00; height: 2px; left: 0; margin: 0; padding: 0; position: fixed; top: 0; transition: background 0.5s, width 1.5s; width: 25%;"></div>\n\
utility2-comment -->\n\
<h1>\n\
<!-- utility2-comment\n\
    <a\n\
        {{#if env.npm_package_homepage}}\n\
        href="{{env.npm_package_homepage}}"\n\
        {{/if env.npm_package_homepage}}\n\
        target="_blank"\n\
    >\n\
utility2-comment -->\n\
        {{env.npm_package_nameAlias}} v{{env.npm_package_version}}\n\
<!-- utility2-comment\n\
    </a>\n\
utility2-comment -->\n\
</h1>\n\
<h3>{{env.npm_package_description}}</h3>\n\
<!-- utility2-comment\n\
<h4><a download href="assets.app.js">download standalone app</a></h4>\n\
utility2-comment -->\n\
\n\
\n\
\n\
<label>edit or paste script below to cover and test</label>\n\
<textarea class="oneval onkeyup onreset" id="inputTextareaEval1">\n\
// remove comment below to disable jslint\n\
/*jslint\n\
    browser: true,\n\
    es6: true\n\
*/\n\
/*global window*/\n\
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
        options = {url: "/"};\n\
        // test ajax request for main-page "/"\n\
        window.utility2.ajax(options, function (error, xhr) {\n\
            try {\n\
                // validate no error occurred\n\
                window.utility2.assert(!error, error);\n\
                // validate "200 ok" status\n\
                window.utility2.assert(xhr.statusCode === 200, xhr.statusCode);\n\
                // validate non-empty data\n\
                data = xhr.responseText;\n\
                window.utility2.assert(data && data.length > 0, data);\n\
                onError();\n\
            } catch (errorCaught) {\n\
                onError(errorCaught);\n\
            }\n\
        });\n\
    };\n\
\n\
    window.utility2.testRunDefault(testCaseDict);\n\
}());\n\
</textarea>\n\
<pre id="outputPreJsonStringify1"></pre>\n\
<pre id="outputPreJslint1"></pre>\n\
<label>instrumented-code</label>\n\
<textarea class="resettable" id="outputTextarea1" readonly></textarea>\n\
<label>stderr and stdout</label>\n\
<textarea class="resettable" id="outputTextareaStdout1" readonly></textarea>\n\
<button class="onclick onreset" id="testRunButton2">run internal test</button><br>\n\
<div class="resettable" id="testReportDiv1" style="display: none;"></div>\n\
<div id="coverageReportDiv1" class="resettable"></div>\n\
<!-- utility2-comment\n\
{{#if isRollup}}\n\
<script src="assets.app.js"></script>\n\
{{#unless isRollup}}\n\
utility2-comment -->\n\
<script src="assets.utility2.lib.istanbul.js"></script>\n\
<script src="assets.utility2.lib.jslint.js"></script>\n\
<script src="assets.utility2.lib.db.js"></script>\n\
<script src="assets.utility2.lib.sjcl.js"></script>\n\
<script src="assets.utility2.lib.uglifyjs.js"></script>\n\
<script src="assets.utility2.js"></script>\n\
<script src="jsonp.utility2._stateInit?callback=window.utility2._stateInit"></script>\n\
<script>window.utility2.onResetBefore.counter += 1;</script>\n\
<script src="assets.example.js"></script>\n\
<script src="assets.test.js"></script>\n\
<script>window.utility2.onResetBefore();</script>\n\
<!-- utility2-comment\n\
{{/if isRollup}}\n\
utility2-comment -->\n\
<div class="utility2FooterDiv">\n\
    [ this app was created with\n\
    <a href="https://github.com/kaizhu256/node-utility2" target="_blank">utility2</a>\n\
    ]\n\
</div>\n\
</body>\n\
</html>\n\
';
        /* jslint-ignore-end */
        if (local.templateRender) {
            local.assetsDict['/'] = local.templateRender(
                local.assetsDict['/assets.index.template.html'],
                {
                    env: local.objectSetDefault(local.env, {
                        npm_package_description: 'example module',
                        npm_package_nameAlias: 'example',
                        npm_package_version: '0.0.1'
                    })
                }
            );
        } else {
            local.assetsDict['/'] = local.assetsDict['/assets.index.template.html']
                .replace((/\{\{env\.(\w+?)\}\}/g), function (match0, match1) {
                    // jslint-hack
                    String(match0);
                    switch (match1) {
                    case 'npm_package_description':
                        return 'example module';
                    case 'npm_package_nameAlias':
                        return 'example';
                    case 'npm_package_version':
                        return '0.0.1';
                    }
                });
        }
        // run the cli
        if (local.global.utility2_rollup || module !== require.main) {
            break;
        }
        local.assetsDict['/assets.example.js'] = local.assetsDict['/assets.example.js'] ||
            local.fs.readFileSync(__filename, 'utf8');
        local.assetsDict['/assets.utility2.rollup.js'] =
            local.assetsDict['/assets.utility2.rollup.js'] || local.fs.readFileSync(
                local.utility2.__dirname + '/lib.utility2.js',
                'utf8'
            ).replace((/^#!/), '//');
        local.assetsDict['/favicon.ico'] = local.assetsDict['/favicon.ico'] || '';
        // if $npm_config_timeout_exit exists,
        // then exit this process after $npm_config_timeout_exit ms
        if (Number(process.env.npm_config_timeout_exit)) {
            setTimeout(process.exit, Number(process.env.npm_config_timeout_exit));
        }
        // start server
        if (local.global.utility2_serverHttp1) {
            break;
        }
        process.env.PORT = process.env.PORT || '8081';
        console.log('server starting on port ' + process.env.PORT);
        local.http.createServer(function (request, response) {
            request.urlParsed = local.url.parse(request.url);
            if (local.assetsDict[request.urlParsed.pathname] !== undefined) {
                response.end(local.assetsDict[request.urlParsed.pathname]);
                return;
            }
            response.statusCode = 404;
            response.end();
        }).listen(process.env.PORT);
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



# package.json
```json
{
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": {
        "utility2": "lib.utility2.sh",
        "utility2-github-crud": "lib.github_crud.js",
        "utility2-istanbul": "lib.istanbul.js",
        "utility2-jslint": "lib.jslint.js",
        "utility2-uglifyjs": "lib.uglifyjs.js"
    },
    "description": "the zero-dependency swiss-army-knife for building, testing, and deploying webapps",
    "devDependencies": {
        "electron-lite": "kaizhu256/node-electron-lite#alpha"
    },
    "engines": {
        "node": ">=4.0"
    },
    "homepage": "https://github.com/kaizhu256/node-utility2",
    "keywords": [
        "browser",
        "build",
        "busybox",
        "ci",
        "code-coverage",
        "continuous-integration",
        "deploy",
        "docker",
        "electron",
        "headless-browser",
        "istanbul",
        "jscover",
        "jscoverage",
        "phantomjs",
        "slimerjs",
        "swiss-army-knife",
        "test",
        "test-coverage",
        "travis",
        "travis-ci",
        "utility2",
        "webapp"
    ],
    "license": "MIT",
    "main": "lib.utility2.js",
    "name": "utility2",
    "nameAlias": "utility2",
    "nameOriginal": "utility2",
    "os": [
        "darwin",
        "linux"
    ],
    "repository": {
        "type": "git",
        "url": "https://github.com/kaizhu256/node-utility2.git"
    },
    "scripts": {
        "build-ci": "./lib.utility2.sh shRun shReadmeBuild",
        "env": "env",
        "example.sh": "./lib.utility2.sh shRunScreenCapture shReadmeTestSh example.sh",
        "heroku-postbuild": "./lib.utility2.sh shRun shDeployHeroku",
        "postinstall": "if [ -f lib.utility2.npm-scripts.sh ]; then ./lib.utility2.npm-scripts.sh postinstall; fi",
        "publish-alias": "VERSION=$(npm info $npm_package_name version); for ALIAS in apidocs busybox busybox2 busyweb test-lite; do utility2 shRun shNpmPublishAs . $ALIAS $VERSION; utility2 shRun shNpmTestPublished $ALIAS || exit $?; done",
        "start": "export PORT=${PORT:-8080} && if [ -f assets.app.js ]; then node assets.app.js; return; fi && export npm_config_mode_auto_restart=1 && ./lib.utility2.sh shRun shIstanbulCover test.js",
        "test": "export PORT=$(./lib.utility2.sh shServerPortRandom) && export PORT_REPL=$(./lib.utility2.sh shServerPortRandom) && export npm_config_mode_auto_restart=1 && ./lib.utility2.sh test test.js",
        "test-all": "npm test --mode-coverage=all"
    },
    "version": "2017.2.28"
}
```



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-utility2/build/screen-capture.gitLog.svg)](https://github.com/kaizhu256/node-utility2/commits)



# internal build-script
- Dockerfile.base
```shell
# Dockerfile.base
# docker build -f tmp/README.Dockerfile.base -t kaizhu256/node-utility2:base .
# docker build -f "tmp/README.Dockerfile.$DOCKER_TAG" -t "$GITHUB_REPO:$DOCKER_TAG" . ||
# https://hub.docker.com/_/node/
FROM debian:stable-slim
MAINTAINER kai zhu <kaizhu256@gmail.com>
VOLUME [ \
  "/mnt", \
  "/root", \
  "/tmp", \
  "/usr/share/doc", \
  "/usr/share/man", \
  "/var/cache", \
  "/var/lib/apt", \
  "/var/log", \
  "/var/tmp" \
]
WORKDIR /tmp
# install nodejs
# https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
RUN export DEBIAN_FRONTEND=noninteractive && \
    apt-get update && \
    apt-get install --no-install-recommends -y \
        apt-utils \
        busybox \
        ca-certificates \
        curl && \
    (busybox --list | xargs -n1 /bin/sh -c 'ln -s /bin/busybox /bin/$0 2>/dev/null' || true) \
        && \
    curl -sL https://deb.nodesource.com/setup_6.x | /bin/bash - && \
    apt-get install -y nodejs
# install electron-lite
VOLUME [ \
  "/usr/lib/chromium" \
]
# COPY electron-*.zip /tmp
RUN export DEBIAN_FRONTEND=noninteractive && \
    apt-get update && \
    apt-get install --no-install-recommends -y \
        chromium \
        gconf2 \
        git \
        xvfb && \
    npm install "kaizhu256/node-electron-lite#alpha" && \
    cd node_modules/electron-lite && \
    npm install && \
    export DISPLAY=:99.0 && \
    (Xvfb "$DISPLAY" &) && \
    npm test && \
    cp /tmp/electron-*.zip /
# install extras
RUN export DEBIAN_FRONTEND=noninteractive && \
    apt-get update && \
    apt-get install --no-install-recommends -y \
        nginx-extras \
        transmission-daemon \
        ssh \
        vim
```

- Dockerfile.elasticsearch
```shell
# Dockerfile.elasticsearch
FROM kaizhu256/node-utility2:latest
MAINTAINER kai zhu <kaizhu256@gmail.com>
# install swagger-ui
RUN export DEBIAN_FRONTEND=noninteractive && \
    rm -fr /swagger-ui && \
    git clone --branch=v2.1.5 --single-branch \
        https://github.com/swagger-api/swagger-ui.git && \
    mv swagger-ui/dist /swagger-ui
```

- Dockerfile.emscripten
```shell
# Dockerfile.emscripten
# docker build -f tmp/README.Dockerfile.emscripten -t emscripten .
FROM kaizhu256/node-utility2:latest
MAINTAINER kai zhu <kaizhu256@gmail.com>
# https://kripken.github.io/emscripten-site/docs
# /building_from_source/building_emscripten_from_source_using_the_sdk.html
# build emscripten v1.36.0
RUN export DEBIAN_FRONTEND=noninteractive && \
    mkdir -p /usr/share/man/man1 && \
    apt-get update && \
    apt-get install --no-install-recommends -y \
        cmake && \
    cd / && \
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
FROM kaizhu256/node-utility2:base
MAINTAINER kai zhu <kaizhu256@gmail.com>
# install elasticsearch and kibana
RUN export DEBIAN_FRONTEND=noninteractive && \
    mkdir -p /usr/share/man/man1 && \
    apt-get update && \
    apt-get install --no-install-recommends -y \
        default-jre && \
    curl -#Lo elasticsearch.tar.gz \
        https://download.elastic.co/elasticsearch/elasticsearch/elasticsearch-1.7.6.tar.gz && \
    rm -fr /elasticsearch && \
    mkdir -p /elasticsearch && \
    tar -xzf elasticsearch.tar.gz --strip-components=1 -C /elasticsearch && \
    curl -#Lo kibana.tar.gz https://download.elastic.co/kibana/kibana/kibana-3.1.3.tar.gz && \
    rm -fr /kibana && \
    mkdir -p /kibana && \
    tar -xzf kibana.tar.gz --strip-components=1 -C /kibana
```

- build.sh
```shell
# build.sh

# this shell script will run the build for this package

shBuild() {(set -e
# this function will run the main build
    #!! coverage-hack
    # init env
    . ./lib.utility2.sh && shInit
    # init github-gh-pages commit-limit
    export COMMIT_LIMIT=20
    case "$CI_BRANCH" in
    alpha)
        shBuildCiDefault
        ;;
    beta)
        shBuildCiDefault
        ;;
    master)
        shBuildCiDefault
        git tag "$npm_package_version"
        git push "git@github.com:$GITHUB_REPO.git" "$npm_package_version" || true
        ;;
    publish)
        printf "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > "$HOME/.npmrc"
        export CI_BRANCH=alpha
        shNpmPublishAs
        shBuildCiDefault
        npm run publish-alias
        git push "git@github.com:$GITHUB_REPO.git" publish:beta
        ;;
    esac
    # docker build
    docker --version 2>/dev/null || return
    # if running legacy-node, then return
    [ "$TRAVIS" ] && [ "$(node --version)" \< "v7.0" ] && return || true
    export DOCKER_TAG="$(printf "$CI_BRANCH" | sed -e "s/docker.//")"
    # if $DOCKER_TAG is not unique from $CI_BRANCH, then return
    [ "$DOCKER_TAG" = "$CI_BRANCH" ] && return || true
    # docker build
    (printf "0" > "$npm_config_file_tmp" &&
        docker build -f "tmp/README.Dockerfile.$DOCKER_TAG" -t "$GITHUB_REPO:$DOCKER_TAG" . ||
        printf $? > "$npm_config_file_tmp") | tee "tmp/build/build.$CI_BRANCH.log"
    EXIT_CODE="$(cat "$npm_config_file_tmp")"
    [ "$EXIT_CODE" != 0 ] && return "$EXIT_CODE" || true
    # docker test
    case "$CI_BRANCH" in
    docker.base)
        # npm test utility2
        for PACKAGE in utility2 "kaizhu256/node-utility2#alpha"
        do
            docker run "$GITHUB_REPO:$DOCKER_TAG" /bin/bash -c "set -e
                curl https://raw.githubusercontent.com\
/kaizhu256/node-utility2/alpha/lib.utility2.sh > /tmp/lib.utility2.sh
                . /tmp/lib.utility2.sh
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
        docker login -p="$DOCKER_PASSWORD" -u="$DOCKER_USERNAME"
        docker push "$GITHUB_REPO:$DOCKER_TAG"
    fi
)}

shBuildCiTestPost() {(set -e
# this function will run the post-test build
    # if running legacy-node, then return
    [ "$(node --version)" \< "v7.0" ] && return || true
    export NODE_ENV=production
    # deploy app to gh-pages
    (export MODE_BUILD=deployGithub && shDeployGithub) || return $?
    # deploy app to heroku
    (export MODE_BUILD=deployHeroku && shDeployHeroku) || return $?
)}

shBuildCiTestPre() {(set -e
# this function will run the pre-test build
    # test example.js
    (export MODE_BUILD=testExampleJs &&
        shFileTrimLeft tmp/README.example.js &&
        shRunScreenCapture shReadmeTestExampleJs) || return $?
    # screen-capture example.js coverage
    (export MODE_BUILD=testExampleJs &&
        export modeBrowserTest=screenCapture &&
        export url=/tmp/app/tmp/build/coverage.html/app/example.js.html &&
        shBrowserTest) || return $?
    # screen-capture example.js test-report
    (export MODE_BUILD=testExampleJs &&
        export modeBrowserTest=screenCapture &&
        export url=/tmp/app/tmp/build/test-report.html &&
        shBrowserTest) || return $?
    # test example.sh
    (export MODE_BUILD=testExampleSh && npm run example.sh) || return $?
    # test published-package
    (export MODE_BUILD=npmTestPublished && shRunScreenCapture shNpmTestPublished) || return $?
)}

shBuild
```



# misc
- this package was created with [utility2](https://github.com/kaizhu256/node-utility2)
