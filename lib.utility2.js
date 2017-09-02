#!/usr/bin/env node
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



    // run shared js-env code - init-before
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
        local = local.global.utility2_rollup || local;
        // init lib
        local.local = local.utility2 = local;
        // init exports
        if (local.modeJs === 'browser') {
            local.global.utility2_utility2 = local;
        } else {
            module.exports = local;
            module.exports.__dirname = __dirname;
            module.exports.module = module;
        }
        // init lib utility2
        local.global.utility2 = local.global.utility2_utility2 = local.utility2 = local;
    }());



    // run shared js-env code - function-before
    (function () {
        // init global.debug_inline
        local.global['debug_inline'.replace('_i', 'I')] = local.global[
            'debug_inline'.replace('_i', 'I')
        ] || function (arg) {
        /*
         * this function will both print the arg to stderr and return it
         */
            // debug arguments
            local['_debug_inlineArguments'.replace('_i', 'I')] = arguments;
            console.error('\n\n\ndebug_inline'.replace('_i', 'I'));
            console.error.apply(console, arguments);
            console.error();
            // return arg for inspection
            return arg;
        };
        local.nop = function () {
        /*
         * this function will do nothing
         */
            return;
        };
        // init lib
        [
            'apidoc',
            'db',
            'github_crud',
            'istanbul',
            'jslint',
            'sjcl',
            'uglifyjs'
        ].forEach(function (key) {
            try {
                local[key] = local.modeJs === 'browser'
                    ? local.global['utility2_' + key]
                    : require('./lib.' + key + '.js');
            } catch (ignore) {
            }
            local[key] = local[key] || {};
        });
        // init assets and templates
        local.assetsDict = {};



/* jslint-ignore-begin */
local.assetsDict['/assets.index.default.template.html'] =
local.assetsDict['/assets.index.template.html'] = '\
<!doctype html>\n\
<html lang="en">\n\
<head>\n\
<meta charset="UTF-8">\n\
<meta name="viewport" content="width=device-width, initial-scale=1">\n\
<!-- "assets.index.default.template.html" -->\n\
<title>{{env.npm_package_name}} (v{{env.npm_package_version}})</title>\n\
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
body > button {\n\
    width: 20rem;\n\
}\n\
button {\n\
    cursor: pointer;\n\
}\n\
.uiAnimateSlide {\n\
    overflow-y: hidden;\n\
    transition: border-bottom 250ms, border-top 250ms, margin-bottom 250ms, margin-top 250ms, max-height 250ms, min-height 250ms, padding-bottom 250ms, padding-top 250ms;\n\
}\n\
.utility2FooterDiv {\n\
    margin-top: 20px;\n\
    text-align: center;\n\
}\n\
.zeroPixel {\n\
    border: 0;\n\
    height: 0;\n\
    margin: 0;\n\
    padding: 0;\n\
    width: 0;\n\
}\n\
</style>\n\
<style>\n\
/*csslint\n\
*/\n\
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
<div id="ajaxProgressDiv1" style="background: #d00; height: 2px; left: 0; margin: 0; padding: 0; position: fixed; top: 0; transition: background 500ms, width 1500ms; width: 0%;"></div>\n\
<script>\n\
/*jslint\n\
    bitwise: true,\n\
    browser: true,\n\
    maxerr: 8,\n\
    maxlen: 96,\n\
    node: true,\n\
    nomen: true,\n\
    regexp: true,\n\
    stupid: true\n\
*/\n\
(function () {\n\
    "use strict";\n\
    var ajaxProgressDiv1, ajaxProgressState;\n\
    ajaxProgressDiv1 = document.querySelector("#ajaxProgressDiv1");\n\
    ajaxProgressState = 0;\n\
    window.timerIntervalAjaxProgressUpdate = setInterval(function () {\n\
        ajaxProgressState += 1;\n\
        ajaxProgressDiv1.style.width = Math.max(\n\
            100 - 100 * Math.exp(-0.0625 * ajaxProgressState),\n\
            Number(ajaxProgressDiv1.style.width.slice(0, -1)) || 0\n\
        ) + "%";\n\
    }, 1000);\n\
}());\n\
</script>\n\
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
        {{env.npm_package_name}} (v{{env.npm_package_version}})\n\
<!-- utility2-comment\n\
    </a>\n\
utility2-comment -->\n\
</h1>\n\
<h3>{{env.npm_package_description}}</h3>\n\
<!-- utility2-comment\n\
<h4><a download href="assets.app.js">download standalone app</a></h4>\n\
<button class="onclick onreset" id="testRunButton1">run internal test</button><br>\n\
<div class="uiAnimateSlide" id="testReportDiv1" style="border-bottom: 0; border-top: 0; margin-bottom: 0; margin-top: 0; max-height: 0; padding-bottom: 0; padding-top: 0;"></div>\n\
utility2-comment -->\n\
\n\
\n\
\n\
<label>stderr and stdout</label>\n\
<textarea class="resettable" id="outputTextareaStdout1" readonly></textarea>\n\
<!-- utility2-comment\n\
{{#if isRollup}}\n\
<script src="assets.app.js"></script>\n\
{{#unless isRollup}}\n\
utility2-comment -->\n\
<script src="assets.utility2.rollup.js"></script>\n\
<script>window.utility2.onResetBefore.counter += 1;</script>\n\
<script src="jsonp.utility2.stateInit?callback=window.utility2.stateInit"></script>\n\
<script src="assets.{{env.npm_package_nameAlias}}.js"></script>\n\
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



// https://img.shields.io/badge/last_build-0000_00_00_00_00_00_UTC_--_master_--_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-0077ff.svg?style=flat
local.assetsDict['/assets.buildBadge.template.svg'] =
'<svg xmlns="http://www.w3.org/2000/svg" width="563" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="563" height="20" fill="#555"/><rect rx="0" x="61" width="502" height="20" fill="#07f"/><path fill="#07f" d="M61 0h4v20h-4z"/><rect rx="0" width="563" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="31.5" y="15" fill="#010101" fill-opacity=".3">last build</text><text x="31.5" y="14">last build</text><text x="311" y="15" fill="#010101" fill-opacity=".3">0000-00-00 00:00:00 UTC - master - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</text><text x="311" y="14">0000-00-00 00:00:00 UTC - master - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</text></g></svg>';



local.assetsDict['/assets.example.html'] = '';



local.assetsDict['/assets.example.template.js'] = '\
/*\n\
example.js\n\
\n\
this script will run a web demo of jslint-lite\n\
\n\
instruction\n\
    1. save this script as example.js\n\
    2. run the shell command:\n\
        $ npm install jslint-lite && PORT=8081 node example.js\n\
    3. open a browser to http://127.0.0.1:8081 and play with the web demo\n\
    4. edit this script to suit your needs\n\
*/\n\
\n\
\n\
\n\
/* istanbul instrument in package jslint */\n\
/*jslint\n\
    bitwise: true,\n\
    browser: true,\n\
    maxerr: 8,\n\
    maxlen: 96,\n\
    node: true,\n\
    nomen: true,\n\
    regexp: true,\n\
    stupid: true\n\
*/\n\
(function () {\n\
    \'use strict\';\n\
    var local;\n\
\n\
\n\
\n\
    // run shared js\-env code - init-before\n\
    (function () {\n\
        // init local\n\
        local = {};\n\
        // init modeJs\n\
        local.modeJs = (function () {\n\
            try {\n\
                return typeof navigator.userAgent === \'string\' &&\n\
                    typeof document.querySelector(\'body\') === \'object\' &&\n\
                    typeof XMLHttpRequest.prototype.open === \'function\' &&\n\
                    \'browser\';\n\
            } catch (errorCaughtBrowser) {\n\
                return module.exports &&\n\
                    typeof process.versions.node === \'string\' &&\n\
                    typeof require(\'http\').createServer === \'function\' &&\n\
                    \'node\';\n\
            }\n\
        }());\n\
        // init global\n\
        local.global = local.modeJs === \'browser\'\n\
            ? window\n\
            : global;\n\
        // init utility2_rollup\n\
        local = local.global.utility2_rollup || (local.modeJs === \'browser\'\n\
            ? local.global.utility2_jslint\n\
            : require(\'jslint-lite\'));\n\
        // init exports\n\
        local.global.local = local;\n\
    }());\n\
    switch (local.modeJs) {\n\
\n\
\n\
\n\
    // init-after\n\
    // run browser js\-env code - init-after\n\
    /* istanbul ignore next */\n\
    case \'browser\':\n\
        local.testRunBrowser = function (event) {\n\
            if (!event || (event &&\n\
                    event.currentTarget &&\n\
                    event.currentTarget.className &&\n\
                    event.currentTarget.className.includes &&\n\
                    event.currentTarget.className.includes(\'onreset\'))) {\n\
                // reset output\n\
                Array.from(\n\
                    document.querySelectorAll(\'body > .resettable\')\n\
                ).forEach(function (element) {\n\
                    switch (element.tagName) {\n\
                    case \'INPUT\':\n\
                    case \'TEXTAREA\':\n\
                        element.value = \'\';\n\
                        break;\n\
                    default:\n\
                        element.textContent = \'\';\n\
                    }\n\
                });\n\
            }\n\
            switch (event && event.currentTarget && event.currentTarget.id) {\n\
            case \'testRunButton1\':\n\
                // show tests\n\
                if (document.querySelector(\'#testReportDiv1\').style.maxHeight === \'0px\') {\n\
                    local.uiAnimateSlideDown(document.querySelector(\'#testReportDiv1\'));\n\
                    document.querySelector(\'#testRunButton1\').textContent =\n\
                        \'hide internal test\';\n\
                    local.modeTest = true;\n\
                    local.testRunDefault(local);\n\
                // hide tests\n\
                } else {\n\
                    local.uiAnimateSlideUp(document.querySelector(\'#testReportDiv1\'));\n\
                    document.querySelector(\'#testRunButton1\').textContent = \'run internal test\';\n\
                }\n\
                break;\n\
            // custom-case\n\
            default:\n\
                break;\n\
            }\n\
            if (document.querySelector(\'#inputTextareaEval1\') && (!event || (event &&\n\
                    event.currentTarget &&\n\
                    event.currentTarget.className &&\n\
                    event.currentTarget.className.includes &&\n\
                    event.currentTarget.className.includes(\'oneval\')))) {\n\
                // try to eval input-code\n\
                try {\n\
                    /*jslint evil: true*/\n\
                    eval(document.querySelector(\'#inputTextareaEval1\').value);\n\
                } catch (errorCaught) {\n\
                    console.error(errorCaught);\n\
                }\n\
            }\n\
        };\n\
        // log stderr and stdout to #outputTextareaStdout1\n\
        [\'error\', \'log\'].forEach(function (key) {\n\
            console[key + \'_original\'] = console[key];\n\
            console[key] = function () {\n\
                var element;\n\
                console[key + \'_original\'].apply(console, arguments);\n\
                element = document.querySelector(\'#outputTextareaStdout1\');\n\
                if (!element) {\n\
                    return;\n\
                }\n\
                // append text to #outputTextareaStdout1\n\
                element.value += Array.from(arguments).map(function (arg) {\n\
                    return typeof arg === \'string\'\n\
                        ? arg\n\
                        : JSON.stringify(arg, null, 4);\n\
                }).join(\' \') + \'\\n\';\n\
                // scroll textarea to bottom\n\
                element.scrollTop = element.scrollHeight;\n\
            };\n\
        });\n\
        // init event-handling\n\
        [\'change\', \'click\', \'keyup\'].forEach(function (event) {\n\
            Array.from(document.querySelectorAll(\'.on\' + event)).forEach(function (element) {\n\
                element.addEventListener(event, local.testRunBrowser);\n\
            });\n\
        });\n\
        // run tests\n\
        local.testRunBrowser();\n\
        break;\n\
\n\
\n\
\n\
    // run node js\-env code - init-after\n\
    /* istanbul ignore next */\n\
    case \'node\':\n\
        // init exports\n\
        module.exports = local;\n\
        // require modules\n\
        local.fs = require(\'fs\');\n\
        local.http = require(\'http\');\n\
        local.url = require(\'url\');\n\
        // init assets\n\
        local.assetsDict = local.assetsDict || {};\n\
        /* jslint-ignore-begin */\n\
        local.assetsDict[\'/assets.index.template.html\'] = \'\\\n' +
local.assetsDict['/assets.index.template.html'].replace((/\n/g), '\\n\\\n') + '\';\n\
        /* jslint-ignore-end */\n\
        [\n\
            \'assets.index.css\',\n\
            \'assets.index.template.html\',\n\
            \'assets.swgg.swagger.json\',\n\
            \'assets.swgg.swagger.server.json\'\n\
        ].forEach(function (file) {\n\
            file = \'/\' + file;\n\
            local.assetsDict[file] = local.assetsDict[file] || \'\';\n\
            if (local.fs.existsSync(local.__dirname + file)) {\n\
                local.assetsDict[file] = local.fs.readFileSync(\n\
                    local.__dirname + file,\n\
                    \'utf8\'\n\
                );\n\
            }\n\
        });\n\
        local.assetsDict[\'/\'] =\n\
            local.assetsDict[\'/assets.example.html\'] =\n\
            local.assetsDict[\'/assets.index.template.html\']\n\
            .replace((/\\{\\{env\\.(\\w+?)\\}\\}/g), function (match0, match1) {\n\
                // jslint-hack\n\
                String(match0);\n\
                switch (match1) {\n\
                case \'npm_package_description\':\n\
                    return \'the greatest app in the world!\';\n\
                case \'npm_package_name\':\n\
                    return \'my-app\';\n\
                case \'npm_package_nameAlias\':\n\
                    return \'my_app\';\n\
                case \'npm_package_version\':\n\
                    return \'0.0.1\';\n\
                default:\n\
                    return match0;\n\
                }\n\
            });\n\
        // run the cli\n\
        if (module !== require.main || local.global.utility2_rollup) {\n\
            break;\n\
        }\n\
        local.assetsDict[\'/assets.example.js\'] =\n\
            local.assetsDict[\'/assets.example.js\'] ||\n\
            local.fs.readFileSync(__filename, \'utf8\');\n\
        // bug-workaround - long $npm_package_buildCustomOrg\n\
        /* jslint-ignore-begin */\n\
        local.assetsDict[\'/assets.jslint.js\'] =\n\
            local.assetsDict[\'/assets.jslint.js\'] ||\n\
            local.fs.readFileSync(\n\
                local.jslint.__dirname + \'/lib.jslint.js\',\n\
                \'utf8\'\n\
            ).replace((/^#!/), \'//\');\n\
        /* jslint-ignore-end */\n\
        local.assetsDict[\'/favicon.ico\'] = local.assetsDict[\'/favicon.ico\'] || \'\';\n\
        // if $npm_config_timeout_exit exists,\n\
        // then exit this process after $npm_config_timeout_exit ms\n\
        if (Number(process.env.npm_config_timeout_exit)) {\n\
            setTimeout(process.exit, Number(process.env.npm_config_timeout_exit));\n\
        }\n\
        // start server\n\
        if (local.global.utility2_serverHttp1) {\n\
            break;\n\
        }\n\
        process.env.PORT = process.env.PORT || \'8081\';\n\
        console.error(\'server starting on port \' + process.env.PORT);\n\
        local.http.createServer(function (request, response) {\n\
            request.urlParsed = local.url.parse(request.url);\n\
            if (local.assetsDict[request.urlParsed.pathname] !== undefined) {\n\
                response.end(local.assetsDict[request.urlParsed.pathname]);\n\
                return;\n\
            }\n\
            response.statusCode = 404;\n\
            response.end();\n\
        }).listen(process.env.PORT);\n\
        break;\n\
    }\n\
}());\n\
';



local.assetsDict['/assets.lib.template.js'] = '\
/* istanbul instrument in package jslint */\n\
/*jslint\n\
    bitwise: true,\n\
    browser: true,\n\
    maxerr: 8,\n\
    maxlen: 96,\n\
    node: true,\n\
    nomen: true,\n\
    regexp: true,\n\
    stupid: true\n\
*/\n\
(function () {\n\
    \'use strict\';\n\
    var local;\n\
\n\
\n\
\n\
    // run shared js\-env code - init-before\n\
    (function () {\n\
        // init local\n\
        local = {};\n\
        // init modeJs\n\
        local.modeJs = (function () {\n\
            try {\n\
                return typeof navigator.userAgent === \'string\' &&\n\
                    typeof document.querySelector(\'body\') === \'object\' &&\n\
                    typeof XMLHttpRequest.prototype.open === \'function\' &&\n\
                    \'browser\';\n\
            } catch (errorCaughtBrowser) {\n\
                return module.exports &&\n\
                    typeof process.versions.node === \'string\' &&\n\
                    typeof require(\'http\').createServer === \'function\' &&\n\
                    \'node\';\n\
            }\n\
        }());\n\
        // init global\n\
        local.global = local.modeJs === \'browser\'\n\
            ? window\n\
            : global;\n\
        // init utility2_rollup\n\
        local = local.global.utility2_rollup || local;\n\
        // init lib\n\
        local.local = local.jslint = local;\n\
        // init exports\n\
        if (local.modeJs === \'browser\') {\n\
            local.global.utility2_jslint = local;\n\
        } else {\n\
            module.exports = local;\n\
            module.exports.__dirname = __dirname;\n\
            module.exports.module = module;\n\
        }\n\
    }());\n\
}());\n\
';



local.assetsDict['/assets.readme.template.md'] = '\
# jslint-lite\n\
the greatest app in the world!\n\
\n\
![screenshot]()\n\
\n\
[![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-jslint-lite.svg)](https://travis-ci.org/kaizhu256/node-jslint-lite) [![coverage](https://kaizhu256.github.io/node-jslint-lite/build/coverage.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build/coverage.html/index.html)\n\
\n\
[![NPM](https://nodei.co/npm/jslint-lite.png?downloads=true)](https://www.npmjs.com/package/jslint-lite)\n\
\n\
[![build commit status](https://kaizhu256.github.io/node-jslint-lite/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-jslint-lite)\n\
\n\
| git-branch : | [master](https://github.com/kaizhu256/node-jslint-lite/tree/master) | [beta](https://github.com/kaizhu256/node-jslint-lite/tree/beta) | [alpha](https://github.com/kaizhu256/node-jslint-lite/tree/alpha)|\n\
|--:|:--|:--|:--|\n\
| test-server-github : | [![github.com test-server](https://kaizhu256.github.io/node-jslint-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-jslint-lite/build..master..travis-ci.org/app) | [![github.com test-server](https://kaizhu256.github.io/node-jslint-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/app) | [![github.com test-server](https://kaizhu256.github.io/node-jslint-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-jslint-lite/build..alpha..travis-ci.org/app)|\n\
| test-server-heroku : | [![heroku.com test-server](https://kaizhu256.github.io/node-jslint-lite/heroku-logo.75x25.png)](https://h1-jslint-master.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-jslint-lite/heroku-logo.75x25.png)](https://h1-jslint-beta.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-jslint-lite/heroku-logo.75x25.png)](https://h1-jslint-alpha.herokuapp.com)|\n\
| test-report : | [![test-report](https://kaizhu256.github.io/node-jslint-lite/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build..master..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-jslint-lite/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build..alpha..travis-ci.org/test-report.html)|\n\
| coverage : | [![coverage](https://kaizhu256.github.io/node-jslint-lite/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build..master..travis-ci.org/coverage.html/index.html) | [![coverage](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/coverage.html/index.html) | [![coverage](https://kaizhu256.github.io/node-jslint-lite/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-jslint-lite/build..alpha..travis-ci.org/coverage.html/index.html)|\n\
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-jslint-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-jslint-lite/tree/gh-pages/build..master..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-jslint-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-jslint-lite/tree/gh-pages/build..beta..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-jslint-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-jslint-lite/tree/gh-pages/build..alpha..travis-ci.org)|\n\
\n\
[![npmPackageListing](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.npmPackageListing.svg)](https://github.com/kaizhu256/node-jslint-lite)\n\
\n\
![npmPackageDependencyTree](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.npmPackageDependencyTree.svg)\n\
\n\
\n\
\n\
# table of contents\n\
\n\
\n\
\n\
# cdn download\n\
- [https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/app/assets.jslint.js](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/app/assets.jslint.js)\n\
\n\
\n\
\n\
# live demo\n\
- [https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/app/](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/app)\n\
\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployGithub.browser.%252Fnode-jslint-lite%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/app)\n\
\n\
\n\
\n\
# documentation\n\
#### apidoc\n\
- [https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/apidoc.html](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/apidoc.html)\n\
\n\
[![apidoc](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/apidoc.html)\n\
\n\
#### swaggerdoc\n\
- [https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/app/assets.swgg.html](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/app/assets.swgg.html)\n\
\n\
[![swaggerdoc](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployGithub.browser.%252Fnode-jslint-lite%252Fbuild%252Fapp%252Fassets.swgg.html.png)](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/app/assets.swgg.html)\n\
\n\
#### todo\n\
- none\n\
\n\
#### changelog for v0.0.1\n\
- none\n\
\n\
#### this package requires\n\
- darwin or linux os\n\
\n\
\n\
\n\
# quickstart standalone app\n\
#### to run this example, follow the instruction in the script below\n\
- [assets.app.js](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/app/assets.app.js)\n\
```shell\n\
# example.sh\n\
\n\
# this shell script will download and run a web demo of jslint-lite as a standalone app\n\
\n\
# 1. download standalone app\n\
curl -O https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/app/assets.app.js\n\
# 2. run standalone app\n\
node ./assets.app.js\n\
# 3. open a browser to http://127.0.0.1:8081 and play with the web demo\n\
# 4. edit file assets.app.js to suit your needs\n\
```\n\
\n\
#### output from browser\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.testExampleSh.browser.%252F.png)](https://kaizhu256.github.io/node-jslint-lite/build/app/assets.example.html)\n\
\n\
#### output from shell\n\
![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.testExampleSh.svg)\n\
\n\
\n\
\n\
# quickstart example.js\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-jslint-lite/build/app/assets.example.html)\n\
\n\
#### to run this example, follow the instruction in the script below\n\
- [example.js](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/example.js)\n\
```javascript\n' + local.assetsDict['/assets.example.template.js'] + '```\n\
\n\
#### output from browser\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-jslint-lite/build/app/assets.example.html)\n\
\n\
#### output from shell\n\
![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.testExampleJs.svg)\n\
\n\
\n\
\n\
# extra screenshots\n\
1. [https://kaizhu256.github.io/node-jslint-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)\n\
\n\
1. [https://kaizhu256.github.io/node-jslint-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)\n\
\n\
1. [https://kaizhu256.github.io/node-jslint-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)\n\
\n\
1. [https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployGithub.browser.%252Fnode-jslint-lite%252Fbuild%252Fapp%252Fassets.swgg.html.png](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployGithub.browser.%252Fnode-jslint-lite%252Fbuild%252Fapp%252Fassets.swgg.html.png)\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployGithub.browser.%252Fnode-jslint-lite%252Fbuild%252Fapp%252Fassets.swgg.html.png)](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployGithub.browser.%252Fnode-jslint-lite%252Fbuild%252Fapp%252Fassets.swgg.html.png)\n\
\n\
1. [https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployGithub.browser.%252Fnode-jslint-lite%252Fbuild%252Fapp.png](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployGithub.browser.%252Fnode-jslint-lite%252Fbuild%252Fapp.png)\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployGithub.browser.%252Fnode-jslint-lite%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployGithub.browser.%252Fnode-jslint-lite%252Fbuild%252Fapp.png)\n\
\n\
1. [https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployGithubTest.browser.%252Fnode-jslint-lite%252Fbuild%252Fapp.png](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployGithubTest.browser.%252Fnode-jslint-lite%252Fbuild%252Fapp.png)\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployGithubTest.browser.%252Fnode-jslint-lite%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployGithubTest.browser.%252Fnode-jslint-lite%252Fbuild%252Fapp.png)\n\
\n\
1. [https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png)\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png)](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png)\n\
\n\
1. [https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployHeroku.browser.%252F.png](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployHeroku.browser.%252F.png)\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployHeroku.browser.%252F.png)](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployHeroku.browser.%252F.png)\n\
\n\
1. [https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployHerokuTest.browser.%252F.png](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployHerokuTest.browser.%252F.png)\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployHerokuTest.browser.%252F.png)](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployHerokuTest.browser.%252F.png)\n\
\n\
1. [https://kaizhu256.github.io/node-jslint-lite/build/screenshot.npmTest.browser.%252F.png](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.npmTest.browser.%252F.png)\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.npmTest.browser.%252F.png)](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.npmTest.browser.%252F.png)\n\
\n\
1. [https://kaizhu256.github.io/node-jslint-lite/build/screenshot.npmTestPublished.browser.%252F.png](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.npmTestPublished.browser.%252F.png)\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.npmTestPublished.browser.%252F.png)](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.npmTestPublished.browser.%252F.png)\n\
\n\
1. [https://kaizhu256.github.io/node-jslint-lite/build/screenshot.testExampleJs.browser.%252F.png](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.testExampleJs.browser.%252F.png)\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.testExampleJs.browser.%252F.png)\n\
\n\
1. [https://kaizhu256.github.io/node-jslint-lite/build/screenshot.testExampleSh.browser.%252F.png](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.testExampleSh.browser.%252F.png)\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.testExampleSh.browser.%252F.png)](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.testExampleSh.browser.%252F.png)\n\
\n\
\n\
\n\
# package.json\n\
```json\n\
{\n\
    "author": "kai zhu <kaizhu256@gmail.com>",\n\
    "description": "the greatest app in the world!",\n\
    "devDependencies": {\n\
        "electron-lite": "kaizhu256/node-electron-lite#alpha",\n\
        "utility2": "kaizhu256/node-utility2#alpha"\n\
    },\n\
    "engines": {\n\
        "node": ">=4.0"\n\
    },\n\
    "homepage": "https://github.com/kaizhu256/node-jslint-lite",\n\
    "keywords": [],\n\
    "license": "MIT",\n\
    "main": "lib.jslint.js",\n\
    "name": "jslint-lite",\n\
    "os": [\n\
        "darwin",\n\
        "linux"\n\
    ],\n\
    "repository": {\n\
        "type": "git",\n\
        "url": "https://github.com/kaizhu256/node-jslint-lite.git"\n\
    },\n\
    "scripts": {\n\
        "build-ci": "utility2 shReadmeTest build_ci.sh",\n\
        "env": "env",\n\
        "heroku-postbuild": "npm uninstall utility2 2>/dev/null; npm install kaizhu256/node-utility2#alpha && utility2 shDeployHeroku",\n\
        "postinstall": "[ ! -f npm_scripts.sh ] || ./npm_scripts.sh postinstall",\n\
        "start": "PORT=${PORT:-8080} utility2 start test.js",\n\
        "test": "PORT=$(utility2 shServerPortRandom) utility2 test test.js"\n\
    },\n\
    "version": "0.0.1"\n\
}\n\
```\n\
\n\
\n\
\n\
# changelog of last 50 commits\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.gitLog.svg)](https://github.com/kaizhu256/node-jslint-lite/commits)\n\
\n\
\n\
\n\
# internal build script\n\
- build_ci.sh\n\
```shell\n\
# build_ci.sh\n\
\n\
# this shell script will run the build for this package\n\
\n\
shBuildCiAfter() {(set -e\n\
    shDeployGithub\n\
    shDeployHeroku\n\
    shReadmeTest example.sh\n\
)}\n\
\n\
shBuildCiBefore() {(set -e\n\
    shNpmTestPublished\n\
    shReadmeTest example.js\n\
)}\n\
\n\
# run shBuildCi\n\
eval $(utility2 source)\n\
shBuildCi\n\
```\n\
\n\
\n\
\n\
# misc\n\
- this package was created with [utility2](https://github.com/kaizhu256/node-utility2)\n\
';



local.assetsDict['/assets.readmeCustomOrg.npmdoc.template.md'] = '\
# npmdoc-{{env.npm_package_name}}\n\
\n\
#### basic api documentation for \
{{#if env.npm_package_homepage}} \
[{{env.npm_package_name}} (v{{env.npm_package_version}})]({{env.npm_package_homepage}}) \
{{#unless env.npm_package_homepage}} \
{{env.npm_package_name}} (v{{env.npm_package_version}}) \
{{/if env.npm_package_homepage}} \
[![npm package](https://img.shields.io/npm/v/npmdoc-{{env.npm_package_name}}.svg?style=flat-square)](https://www.npmjs.org/package/npmdoc-{{env.npm_package_name}}) \
[![travis-ci.org build-status](https://api.travis-ci.org/npmdoc/node-npmdoc-{{env.npm_package_name}}.svg)](https://travis-ci.org/npmdoc/node-npmdoc-{{env.npm_package_name}})\n\
\n\
#### {{env.npm_package_description}}\n\
\n\
[![NPM](https://nodei.co/npm/{{env.npm_package_name}}.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/{{env.npm_package_name}})\n\
\n\
- [https://npmdoc.github.io/node-npmdoc-{{env.npm_package_name}}/build/apidoc.html](https://npmdoc.github.io/node-npmdoc-{{env.npm_package_name}}/build/apidoc.html)\n\
\n\
[![apidoc](https://npmdoc.github.io/node-npmdoc-{{env.npm_package_name}}/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://npmdoc.github.io/node-npmdoc-{{env.npm_package_name}}/build/apidoc.html)\n\
\n\
![npmPackageListing](https://npmdoc.github.io/node-npmdoc-{{env.npm_package_name}}/build/screenshot.npmPackageListing.svg)\n\
\n\
![npmPackageDependencyTree](https://npmdoc.github.io/node-npmdoc-{{env.npm_package_name}}/build/screenshot.npmPackageDependencyTree.svg)\n\
\n\
\n\
\n\
# package.json\n\
\n\
```json\n\
\n\
{{packageJson jsonStringify4 markdownCodeSafe}}\n\
```\n\
\n\
\n\
\n\
# misc\n\
- this document was created with [utility2](https://github.com/kaizhu256/node-utility2)\n\
';



local.assetsDict['/assets.readmeCustomOrg.npmtest.template.md'] = '\
# npmtest-{{env.npm_package_name}}\n\
\n\
#### basic test coverage for \
{{#if env.npm_package_homepage}} \
[{{env.npm_package_name}} (v{{env.npm_package_version}})]({{env.npm_package_homepage}}) \
{{#unless env.npm_package_homepage}} \
{{env.npm_package_name}} (v{{env.npm_package_version}}) \
{{/if env.npm_package_homepage}} \
[![npm package](https://img.shields.io/npm/v/npmtest-{{env.npm_package_name}}.svg?style=flat-square)](https://www.npmjs.org/package/npmtest-{{env.npm_package_name}}) \
[![travis-ci.org build-status](https://api.travis-ci.org/npmtest/node-npmtest-{{env.npm_package_name}}.svg)](https://travis-ci.org/npmtest/node-npmtest-{{env.npm_package_name}})\n\
\n\
#### {{env.npm_package_description}}\n\
\n\
[![NPM](https://nodei.co/npm/{{env.npm_package_name}}.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/{{env.npm_package_name}})\n\
\n\
| git-branch : | [alpha](https://github.com/npmtest/node-npmtest-{{env.npm_package_name}}/tree/alpha)|\n\
|--:|:--|\n\
| coverage : | [![coverage](https://npmtest.github.io/node-npmtest-{{env.npm_package_name}}/build/coverage.badge.svg)](https://npmtest.github.io/node-npmtest-{{env.npm_package_name}}/build/coverage.html/index.html)|\n\
| test-report : | [![test-report](https://npmtest.github.io/node-npmtest-{{env.npm_package_name}}/build/test-report.badge.svg)](https://npmtest.github.io/node-npmtest-{{env.npm_package_name}}/build/test-report.html)|\n\
| test-server-github : | [![github.com test-server](https://npmtest.github.io/node-npmtest-{{env.npm_package_name}}/GitHub-Mark-32px.png)](https://npmtest.github.io/node-npmtest-{{env.npm_package_name}}/build/app) || build-artifacts : | [![build-artifacts](https://npmtest.github.io/node-npmtest-{{env.npm_package_name}}/glyphicons_144_folder_open.png)](https://github.com/npmtest/node-npmtest-{{env.npm_package_name}}/tree/gh-pages/build)|\n\
\n\
- [https://npmtest.github.io/node-npmtest-{{env.npm_package_name}}/build/coverage.html/index.html](https://npmtest.github.io/node-npmtest-{{env.npm_package_name}}/build/coverage.html/index.html)\n\
\n\
[![coverage](https://npmtest.github.io/node-npmtest-{{env.npm_package_name}}/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)](https://npmtest.github.io/node-npmtest-{{env.npm_package_name}}/build/coverage.html/index.html)\n\
\n\
- [https://npmtest.github.io/node-npmtest-{{env.npm_package_name}}/build/test-report.html](https://npmtest.github.io/node-npmtest-{{env.npm_package_name}}/build/test-report.html)\n\
\n\
[![test-report](https://npmtest.github.io/node-npmtest-{{env.npm_package_name}}/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)](https://npmtest.github.io/node-npmtest-{{env.npm_package_name}}/build/test-report.html)\n\
\n\
- [https://npmdoc.github.io/node-npmdoc-{{env.npm_package_name}}/build/apidoc.html](https://npmdoc.github.io/node-npmdoc-{{env.npm_package_name}}/build/apidoc.html)\n\
\n\
[![apidoc](https://npmdoc.github.io/node-npmdoc-{{env.npm_package_name}}/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://npmdoc.github.io/node-npmdoc-{{env.npm_package_name}}/build/apidoc.html)\n\
\n\
![npmPackageListing](https://npmtest.github.io/node-npmtest-{{env.npm_package_name}}/build/screenshot.npmPackageListing.svg)\n\
\n\
![npmPackageDependencyTree](https://npmtest.github.io/node-npmtest-{{env.npm_package_name}}/build/screenshot.npmPackageDependencyTree.svg)\n\
\n\
\n\
\n\
# package.json\n\
\n\
```json\n\
\n\
{{packageJson jsonStringify4 markdownCodeSafe}}\n\
```\n\
\n\
\n\
\n\
# misc\n\
- this document was created with [utility2](https://github.com/kaizhu256/node-utility2)\n\
';



local.assetsDict['/assets.test.template.js'] = '\
/* istanbul instrument in package jslint */\n\
/*jslint\n\
    bitwise: true,\n\
    browser: true,\n\
    maxerr: 8,\n\
    maxlen: 96,\n\
    node: true,\n\
    nomen: true,\n\
    regexp: true,\n\
    stupid: true\n\
*/\n\
(function () {\n\
    \'use strict\';\n\
    var local;\n\
\n\
\n\
\n\
    // run shared js\-env code - init-before\n\
    (function () {\n\
        // init local\n\
        local = {};\n\
        // init modeJs\n\
        local.modeJs = (function () {\n\
            try {\n\
                return typeof navigator.userAgent === \'string\' &&\n\
                    typeof document.querySelector(\'body\') === \'object\' &&\n\
                    typeof XMLHttpRequest.prototype.open === \'function\' &&\n\
                    \'browser\';\n\
            } catch (errorCaughtBrowser) {\n\
                return module.exports &&\n\
                    typeof process.versions.node === \'string\' &&\n\
                    typeof require(\'http\').createServer === \'function\' &&\n\
                    \'node\';\n\
            }\n\
        }());\n\
        // init global\n\
        local.global = local.modeJs === \'browser\'\n\
            ? window\n\
            : global;\n\
        switch (local.modeJs) {\n\
        // re-init local from window.local\n\
        case \'browser\':\n\
            local = local.global.utility2.objectSetDefault(\n\
                local.global.utility2_rollup || local.global.local,\n\
                local.global.utility2\n\
            );\n\
            break;\n\
        // re-init local from example.js\n\
        case \'node\':\n\
            local = (local.global.utility2_rollup ||\n\
                require(\'utility2\')).requireReadme();\n\
            break;\n\
        }\n\
        // init exports\n\
        local.global.local = local;\n\
    }());\n\
\n\
\n\
\n\
    // run shared js\-env code - function\n\
    (function () {\n\
        return;\n\
    }());\n\
    switch (local.modeJs) {\n\
\n\
\n\
\n\
    // run browser js\-env code - function\n\
    case \'browser\':\n\
        break;\n\
\n\
\n\
\n\
    // run node js\-env code - function\n\
    case \'node\':\n\
        break;\n\
    }\n\
\n\
\n\
\n\
    // run shared js\-env code - init-after\n\
    (function () {\n\
        return;\n\
    }());\n\
    switch (local.modeJs) {\n\
\n\
\n\
\n\
    // run browser js\-env code - init-after\n\
    /* istanbul ignore next */\n\
    case \'browser\':\n\
        local.testCase_browser_nullCase = local.testCase_browser_nullCase || function (\n\
            options,\n\
            onError\n\
        ) {\n\
        /*\n\
         * this function will test browser\'s null-case handling-behavior\n\
         */\n\
            onError(null, options);\n\
        };\n\
\n\
        local.utility2.ajaxForwardProxyUrlTest = local.utility2.ajaxForwardProxyUrlTest ||\n\
            function (url, location) {\n\
            /*\n\
             * this function will test if the url requires forward-proxy\n\
             */\n\
                // jslint-hack\n\
                local.nop(url);\n\
                return local.env.npm_package_nameAlias && (/\\bgithub.io$/).test(location.host)\n\
                    ? \'https://h1-\' + local.env.npm_package_nameAlias + \'-alpha.herokuapp.com\'\n\
                    : location.protocol + \'//\' + location.host;\n\
            };\n\
\n\
        // run tests\n\
        if (local.modeTest && document.querySelector(\'#testRunButton1\')) {\n\
            document.querySelector(\'#testRunButton1\').click();\n\
        }\n\
        break;\n\
\n\
\n\
\n\
    // run node js\-env code - init-after\n\
    /* istanbul ignore next */\n\
    case \'node\':\n\
        local.testCase_buildApidoc_default = local.testCase_buildApidoc_default || function (\n\
            options,\n\
            onError\n\
        ) {\n\
        /*\n\
         * this function will test buildApidoc\'s default handling-behavior\n\
         */\n\
            options = { modulePathList: module.paths };\n\
            local.buildApidoc(options, onError);\n\
        };\n\
\n\
        local.testCase_buildApp_default = local.testCase_buildApp_default || function (\n\
            options,\n\
            onError\n\
        ) {\n\
        /*\n\
         * this function will test buildApp\'s default handling-behavior\n\
         */\n\
            local.testCase_buildReadme_default(options, local.onErrorThrow);\n\
            local.testCase_buildLib_default(options, local.onErrorThrow);\n\
            local.testCase_buildTest_default(options, local.onErrorThrow);\n\
            local.testCase_buildCustomOrg_default(options, local.onErrorThrow);\n\
            options = [];\n\
            local.buildApp(options, onError);\n\
        };\n\
\n\
        local.testCase_buildCustomOrg_default = local.testCase_buildCustomOrg_default ||\n\
            function (options, onError) {\n\
            /*\n\
             * this function will test buildCustomOrg\'s default handling-behavior\n\
             */\n\
                options = {};\n\
                local.buildCustomOrg(options, onError);\n\
            };\n\
\n\
        local.testCase_buildLib_default = local.testCase_buildLib_default || function (\n\
            options,\n\
            onError\n\
        ) {\n\
        /*\n\
         * this function will test buildLib\'s default handling-behavior\n\
         */\n\
            options = {};\n\
            local.buildLib(options, onError);\n\
        };\n\
\n\
        local.testCase_buildReadme_default = local.testCase_buildReadme_default || function (\n\
            options,\n\
            onError\n\
        ) {\n\
        /*\n\
         * this function will test buildReadme\'s default handling-behavior\n\
         */\n\
            options = {};\n\
            local.buildReadme(options, onError);\n\
        };\n\
\n\
        local.testCase_buildTest_default = local.testCase_buildTest_default || function (\n\
            options,\n\
            onError\n\
        ) {\n\
        /*\n\
         * this function will test buildTest\'s default handling-behavior\n\
         */\n\
            options = {};\n\
            local.buildTest(options, onError);\n\
        };\n\
\n\
        local.testCase_webpage_default = local.testCase_webpage_default || function (\n\
            options,\n\
            onError\n\
        ) {\n\
        /*\n\
         * this function will test webpage\'s default handling-behavior\n\
         */\n\
            options = { modeCoverageMerge: true, url: local.serverLocalHost + \'?modeTest=1\' };\n\
            local.browserTest(options, onError);\n\
        };\n\
\n\
        // run test-server\n\
        local.testRunServer(local);\n\
        break;\n\
    }\n\
}());\n\
';



local.assetsDict['/assets.testReport.template.html'] = '\
<div class="testReportDiv">\n\
<style>\n\
/*csslint\n\
    adjoining-classes: false\n\
*/\n\
.testReportDiv {\n\
    font-family: Arial, Helvetica, sans-serif;\n\
}\n\
.testReportFooterDiv {\n\
    margin-top: 20px;\n\
    text-align: center;\n\
}\n\
.testReportPlatformDiv {\n\
    background: #fff;\n\
    border: 1px solid black;\n\
    margin-top: 20px;\n\
    padding: 0 10px 10px 10px;\n\
    text-align: left;\n\
}\n\
.testReportPlatformDiv .displayNone {\n\
    display: none;\n\
}\n\
.testReportPlatformDiv img {\n\
    border: 1px solid black;\n\
    margin: 5px 0 5px 0;\n\
    max-height: 256px;\n\
    max-width: 512px;\n\
}\n\
.testReportPlatformDiv pre {\n\
    background: #fdd;\n\
    border-top: 1px solid black;\n\
    margin-bottom: 0;\n\
    padding: 10px;\n\
    white-space: pre-wrap;\n\
}\n\
.testReportPlatformDiv span {\n\
    display: inline-block;\n\
    width: 120px;\n\
}\n\
.testReportPlatformDiv.summary {\n\
    background: #bfb;\n\
}\n\
.testReportPlatformDiv table {\n\
    border-top: 1px solid black;\n\
    text-align: left;\n\
    width: 100%;\n\
}\n\
.testReportPlatformDiv table > tbody > tr:nth-child(odd) {\n\
    background: #bfb;\n\
}\n\
.testReportPlatformDiv .testFailed {\n\
    background: #f99;\n\
}\n\
.testReportPlatformDiv .testPending {\n\
    background: #99f;\n\
}\n\
</style>\n\
<h1>test-report for\n\
    <a\n\
        {{#if env.npm_package_homepage}}\n\
        href="{{env.npm_package_homepage}}"\n\
        {{/if env.npm_package_homepage}}\n\
    >{{env.npm_package_name}} (v{{env.npm_package_version}})</a>\n\
</h1>\n\
<div class="testReportPlatformDiv summary">\n\
<h2>summary</h2>\n\
<h4>\n\
    <span>version</span>-\n\
        {{env.npm_package_version}}<br>\n\
    <span>test date</span>- {{date}}<br>\n\
    <span>commit info</span>-\n\
        {{#if env.CI_COMMIT_INFO}}\n\
        {{env.CI_COMMIT_INFO htmlSafe}}<br>\n\
        {{#unless env.CI_COMMIT_INFO}}\n\
        undefined<br>\n\
        {{/if env.CI_COMMIT_INFO}}\n\
</h4>\n\
<table>\n\
<thead>\n\
    <tr>\n\
        <th>total time-elapsed</th>\n\
        <th>total tests failed</th>\n\
        <th>total tests passed</th>\n\
        <th>total tests pending</th>\n\
    </tr>\n\
</thead>\n\
<tbody><tr>\n\
    <td>{{timeElapsed}} ms</td>\n\
    <td class="{{testStatusClass}}">{{testsFailed}}</td>\n\
    <td>{{testsPassed}}</td>\n\
    <td>{{testsPending}}</td>\n\
</tr></tbody>\n\
</table>\n\
</div>\n\
{{#each testPlatformList}}\n\
<div class="testReportPlatformDiv">\n\
<h4>\n\
    {{testPlatformNumber}}. {{name htmlSafe}}<br>\n\
    {{#if screenshot}}\n\
    <a href="{{screenshot encodeURIComponent}}">\n\
        <img src="{{screenshot encodeURIComponent}}">\n\
    </a>\n\
    <br>\n\
    {{/if screenshot}}\n\
    <span>time-elapsed</span>- {{timeElapsed}} ms<br>\n\
    <span>tests failed</span>- {{testsFailed}}<br>\n\
    <span>tests passed</span>- {{testsPassed}}<br>\n\
    <span>tests pending</span>- {{testsPending}}<br>\n\
</h4>\n\
<table>\n\
<thead><tr>\n\
    <th>#</th>\n\
    <th>time-elapsed</th>\n\
    <th>status</th>\n\
    <th>test-case</th>\n\
</tr></thead>\n\
<tbody>\n\
{{#each testCaseList}}\n\
<tr>\n\
    <td>{{testCaseNumber}}</td>\n\
    <td>{{timeElapsed}} ms</td>\n\
    <td class="{{testReportTestStatusClass}}">{{status}}</td>\n\
    <td>{{name}}</td>\n\
</tr>\n\
{{/each testCaseList}}\n\
</tbody>\n\
</table>\n\
<pre class="{{preClass}}">\n\
{{#each errorStackList}}\n\
{{errorStack htmlSafe}}\n\
{{/each errorStackList}}\n\
</pre>\n\
</div>\n\
{{/each testPlatformList}}\n\
<div class="testReportFooterDiv">\n\
    [ this document was created with\n\
    <a href="https://github.com/kaizhu256/node-utility2" target="_blank">utility2</a>\n\
    ]\n\
</div>\n\
</div>\n\
';



// https://img.shields.io/badge/tests_failed-999-dd0000.svg?style=flat
local.assetsDict['/assets.testReportBadge.template.svg'] =
'<svg xmlns="http://www.w3.org/2000/svg" width="103" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="103" height="20" fill="#555"/><rect rx="0" x="72" width="31" height="20" fill="#d00"/><path fill="#d00" d="M72 0h4v20h-4z"/><rect rx="0" width="103" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="37" y="15" fill="#010101" fill-opacity=".3">tests failed</text><text x="37" y="14">tests failed</text><text x="86.5" y="15" fill="#010101" fill-opacity=".3">999</text><text x="86.5" y="14">999</text></g></svg>';



local.assetsDict['/assets.utility2.rollup.begin.js'] = '\
/* utility2.rollup.js begin */\n\
/* istanbul ignore all */\n\
/*jslint\n\
    bitwise: true,\n\
    browser: true,\n\
    maxerr: 8,\n\
    maxlen: 96,\n\
    node: true,\n\
    nomen: true,\n\
    regexp: true,\n\
    stupid: true\n\
*/\n\
(function () {\n\
    "use strict";\n\
    var local;\n\
    local = {};\n\
    local.modeJs = (function () {\n\
        try {\n\
            return typeof navigator.userAgent === "string" &&\n\
                typeof document.querySelector("body") === "object" &&\n\
                typeof XMLHttpRequest.prototype.open === "function" &&\n\
                "browser";\n\
        } catch (errorCaughtBrowser) {\n\
            return module.exports &&\n\
                typeof process.versions.node === "string" &&\n\
                typeof require("http").createServer === "function" &&\n\
                "node";\n\
        }\n\
    }());\n\
    local.global = local.modeJs === "browser"\n\
        ? window\n\
        : global;\n\
    local.local = local.global.utility2_rollup = local.global.utility2_rollup_old || local;\n\
}());\n\
';



local.assetsDict['/assets.utility2.rollup.content.js'] = '\
(function () {\n\
    "use strict";\n\
    var local;\n\
    local = (typeof window === "object" && window && window.utility2_rollup) ||\n\
        global.utility2_rollup;\n\
    local.local = local;\n\
/* jslint-ignore-begin */\n\
/* utility2.rollup.js content */\n\
/* jslint-ignore-end */\n\
}());\n\
';



local.assetsDict['/assets.utility2.rollup.end.js'] = '\
(function () {\n\
    "use strict";\n\
    var local;\n\
    local = {};\n\
    local.modeJs = (function () {\n\
        try {\n\
            return typeof navigator.userAgent === "string" &&\n\
                typeof document.querySelector("body") === "object" &&\n\
                typeof XMLHttpRequest.prototype.open === "function" &&\n\
                "browser";\n\
        } catch (errorCaughtBrowser) {\n\
            return module.exports &&\n\
                typeof process.versions.node === "string" &&\n\
                typeof require("http").createServer === "function" &&\n\
                "node";\n\
        }\n\
    }());\n\
    local.global = local.modeJs === "browser"\n\
        ? window\n\
        : global;\n\
    local.global.utility2_rollup_old = local.global.utility2_rollup;\n\
    local.global.utility2_rollup = null;\n\
}());\n\
/* utility2.rollup.js end */\n\
';



local.assetsDict['/favicon.ico'] = '';
/* jslint-ignore-end */
    }());



    // run shared js-env code - function
    (function () {
        // init lib Blob
        local.Blob = local.modeJs === 'browser'
            ? local.global.Blob
            : function (array, options) {
              /*
               * this function will create a node-compatible Blob instance
               */
                this.bff = local.bufferConcat(array);
                this.type = options && options.type;
            };

        // init lib FormData
        local.FormData = function () {
        /*
         * this function will create a serverLocal-compatible FormData instance
         * https://xhr.spec.whatwg.org/#dom-formdata
         * The FormData(form) constructor must run these steps:
         * 1. Let fd be a new FormData object.
         * 2. If form is given, set fd's entries to the result
         *    of constructing the form data set for form. (not implemented)
         * 3. Return fd.
         */
            this.entryList = [];
        };

        local.FormData.prototype.append = function (name, value, filename) {
        /*
         * https://xhr.spec.whatwg.org/#dom-formdata-append
         * The append(name, value, filename) method, when invoked, must run these steps:
         * 1. If the filename argument is given, set value to a new File object
         *    whose contents are value and name is filename.
         * 2. Append a new entry whose name is name, and value is value,
         *    to context object's list of entries.
         */
            if (filename) {
                // bug-workaround - chromium cannot assign name to Blob instance
                local.tryCatchOnError(function () {
                    value.name = filename;
                }, local.nop);
            }
            this.entryList.push({ name: name, value: value });
        };

        local.FormData.prototype.read = function (onError) {
        /*
         * https://tools.ietf.org/html/rfc7578
         * this function will read from formData as a buffer, e.g.
         * --Boundary\r\n
         * Content-Disposition: form-data; name="key"\r\n
         * \r\n
         * value\r\n
         * --Boundary\r\n
         * Content-Disposition: form-data; name="input1"; filename="file1.png"\r\n
         * Content-Type: image/jpeg\r\n
         * \r\n
         * <data1>\r\n
         * --Boundary\r\n
         * Content-Disposition: form-data; name="input2"; filename="file2.png"\r\n
         * Content-Type: image/jpeg\r\n
         * \r\n
         * <data2>\r\n
         * --Boundary--\r\n
         */
            var boundary, result;
            // handle null-case
            if (this.entryList.length === 0) {
                onError(null, local.bufferCreate());
                return;
            }
            // init boundary
            boundary = '--' + Date.now().toString(16) + Math.random().toString(16);
            // init result
            result = [];
            local.onParallelList({
                list: this.entryList
            }, function (options, onParallel) {
                var value;
                value = options.element.value;
                if (!(value instanceof local.Blob)) {
                    result[options.ii] = [boundary +
                        '\r\nContent-Disposition: form-data; name="' + options.element.name +
                        '"\r\n\r\n', value, '\r\n'];
                    onParallel.counter += 1;
                    onParallel();
                    return;
                }
                // read from blob in parallel
                onParallel.counter += 1;
                local.blobRead(value, 'binary', function (error, data) {
                    result[options.ii] = !error && [boundary +
                        '\r\nContent-Disposition: form-data; name="' + options.element.name +
                        '"' +
                        // read param filename
                        (value && value.name
                            ? '; filename="' + value.name + '"'
                            : '') +
                        '\r\n' +
                        // read param Content-Type
                        (value && value.type
                            ? 'Content-Type: ' + value.type + '\r\n'
                            : '') +
                        '\r\n', data, '\r\n'];
                    onParallel(error);
                });
            }, function (error) {
                // add closing boundary
                result.push([boundary + '--\r\n']);
                // concatenate result
                onError(
                    error,
                    // flatten result
                    !error && local.bufferConcat(Array.prototype.concat.apply([], result))
                );
            });
        };

        // init lib _http
        local._http = {};

        // init _http.IncomingMessage
        local._http.IncomingMessage = function (xhr) {
        /*
         * https://nodejs.org/api/all.html#all_http_incomingmessage
         * An IncomingMessage object is created by http.Server or http.ClientRequest
         * and passed as the first argument to the 'request' and 'response' event respectively
         */
            this.headers = {};
            this.httpVersion = '1.1';
            this.method = xhr.method;
            this.onEvent = document.createDocumentFragment();
            this.readable = true;
            this.url = xhr.url;
        };

        local._http.IncomingMessage.prototype.addListener = function (event, onEvent) {
        /*
         * https://nodejs.org/api/all.html#all_emitter_addlistener_event_listener
         * Adds a listener to the end of the listeners array for the specified event
         */
            this.onEvent.addEventListener(event, function (event) {
                onEvent(event.data);
            });
            if (this.readable && event === 'end') {
                this.readable = null;
                this.emit('data', this.data);
                this.emit('end');
            }
            return this;
        };

        local._http.IncomingMessage.prototype.emit = function (event, data) {
        /*
         * https://nodejs.org/api/all.html#all_emitter_emit_event_arg1_arg2
         * Calls each of the listeners in order with the supplied arguments
         */
            event = new local.global.Event(event);
            event.data = data;
            this.onEvent.dispatchEvent(event);
        };

        // https://nodejs.org/api/all.html#all_emitter_on_event_listener
        local._http.IncomingMessage.prototype.on =
            local._http.IncomingMessage.prototype.addListener;

        local._http.IncomingMessage.prototype.pipe = function (writable) {
        /*
         * https://nodejs.org/api/all.html#all_readable_pipe_destination_options
         * This method pulls all the data out of a readable stream, and writes it to the
         * supplied destination, automatically managing the flow so that the destination is not
         * overwhelmed by a fast readable stream
         */
            this.on('data', function (chunk) {
                writable.write(chunk);
            });
            this.on('end', function () {
                writable.end();
            });
            return writable;
        };

        local._http.STATUS_CODES = {
            100: 'Continue',
            101: 'Switching Protocols',
            102: 'Processing',
            200: 'OK',
            201: 'Created',
            202: 'Accepted',
            203: 'Non-Authoritative Information',
            204: 'No Content',
            205: 'Reset Content',
            206: 'Partial Content',
            207: 'Multi-Status',
            208: 'Already Reported',
            226: 'IM Used',
            300: 'Multiple Choices',
            301: 'Moved Permanently',
            302: 'Found',
            303: 'See Other',
            304: 'Not Modified',
            305: 'Use Proxy',
            307: 'Temporary Redirect',
            308: 'Permanent Redirect',
            400: 'Bad Request',
            401: 'Unauthorized',
            402: 'Payment Required',
            403: 'Forbidden',
            404: 'Not Found',
            405: 'Method Not Allowed',
            406: 'Not Acceptable',
            407: 'Proxy Authentication Required',
            408: 'Request Timeout',
            409: 'Conflict',
            410: 'Gone',
            411: 'Length Required',
            412: 'Precondition Failed',
            413: 'Payload Too Large',
            414: 'URI Too Long',
            415: 'Unsupported Media Type',
            416: 'Range Not Satisfiable',
            417: 'Expectation Failed',
            418: 'I\'m a teapot',
            421: 'Misdirected Request',
            422: 'Unprocessable Entity',
            423: 'Locked',
            424: 'Failed Dependency',
            425: 'Unordered Collection',
            426: 'Upgrade Required',
            428: 'Precondition Required',
            429: 'Too Many Requests',
            431: 'Request Header Fields Too Large',
            451: 'Unavailable For Legal Reasons',
            500: 'Internal Server Error',
            501: 'Not Implemented',
            502: 'Bad Gateway',
            503: 'Service Unavailable',
            504: 'Gateway Timeout',
            505: 'HTTP Version Not Supported',
            506: 'Variant Also Negotiates',
            507: 'Insufficient Storage',
            508: 'Loop Detected',
            509: 'Bandwidth Limit Exceeded',
            510: 'Not Extended',
            511: 'Network Authentication Required'
        };

        // init _http.ServerResponse
        local._http.ServerResponse = function (onResponse) {
        /*
         * https://nodejs.org/api/all.html#all_class_http_serverresponse
         * This object is created internally by a HTTP server--not by the user
         */
            this.chunkList = [];
            this.headers = {};
            this.onEvent = document.createDocumentFragment();
            this.onResponse = onResponse;
            this.statusCode = 200;
        };

        // https://nodejs.org/api/all.html#all_emitter_addlistener_event_listener
        local._http.ServerResponse.prototype.addListener =
            local._http.IncomingMessage.prototype.addListener;

        // https://nodejs.org/api/all.html#all_emitter_emit_event_arg1_arg2
        local._http.ServerResponse.prototype.emit =
            local._http.IncomingMessage.prototype.emit;

        local._http.ServerResponse.prototype.end = function (data) {
        /* https://nodejs.org/api/all.html#all_response_end_data_encoding_callback
         * This method signals to the server that all of the response headers
         * and body have been sent
         */
            // emit writable events
            this.chunkList.push(data || '');
            this.emit('finish');
            // emit readable events
            this.onResponse(this);
            this.emit('data', local.bufferConcat(this.chunkList));
            this.emit('end');
        };

        // https://nodejs.org/api/all.html#all_emitter_on_event_listener
        local._http.ServerResponse.prototype.on =
            local._http.IncomingMessage.prototype.addListener;

        // https://nodejs.org/api/all.html#all_response_setheader_name_value
        local._http.ServerResponse.prototype.setHeader = function (key, value) {
            this.headers[key.toLowerCase()] = value;
        };

        local._http.ServerResponse.prototype.write = function (data) {
        /*
         * https://nodejs.org/api/all.html#all_response_write_chunk_encoding_callback
         * This sends a chunk of the response body
         */
            this.chunkList.push(data);
        };

        // init _http.XMLHttpRequest
        local._http.XMLHttpRequest = function () {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#XMLHttpRequest()
         * The constructor initiates an XMLHttpRequest
         */
            var xhr;
            xhr = this;
            ['onError', 'onResponse'].forEach(function (key) {
                xhr[key] = xhr[key].bind(xhr);
            });
            xhr.headers = {};
            xhr.onLoadList = [];
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
            xhr.readyState = 0;
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response
            xhr.response = null;
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseText
            xhr.responseText = '';
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
            xhr.responseType = '';
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status
            xhr.status = xhr.statusCode = 0;
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/statusText
            xhr.statusText = '';
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout
            xhr.timeout = local.timeoutDefault;
        };

        local._http.XMLHttpRequest.prototype.abort = function () {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#abort()
         * Aborts the request if it has already been sent
         */
            this.onError(new Error('abort'));
        };

        local._http.XMLHttpRequest.prototype.addEventListener = function (event, onError) {
        /*
         * this function will add event listeners to the xhr-connection
         */
            switch (event) {
            case 'abort':
            case 'error':
            case 'load':
                this.onLoadList.push(onError);
                break;
            }
        };

        local._http.XMLHttpRequest.prototype.getAllResponseHeaders = function () {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
         * #getAllResponseHeaders()
         * Returns all the response headers, separated by CRLF, as a string,
         * or null if no response has been received
         */
            var xhr;
            xhr = this;
            return Object.keys((xhr.responseStream &&
                xhr.responseStream.headers) || {}).map(function (key) {
                return key + ': ' + xhr.responseStream.headers[key] + '\r\n';
            }).join('') + '\r\n';
        };

        local._http.XMLHttpRequest.prototype.getResponseHeader = function (key) {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#getResponseHeader()
         * Returns the string containing the text of the specified header,
         * or null if either the response has not yet been received
         * or the header doesn't exist in the response
         */
            return (this.responseStream &&
                this.responseStream.headers &&
                this.responseStream.headers[key]) || null;
        };

        local._http.XMLHttpRequest.prototype.onError = function (error, data) {
        /*
         * this function will handle the error and data passed back to the xhr-connection
         */
            if (this.isDone) {
                return;
            }
            this.error = error;
            this.response = data;
            // init responseText
            if (!this.responseType || this.responseType === 'text') {
                this.responseText = local.bufferToString(data);
            }
            // update xhr
            this.readyState = 4;
            this.onreadystatechange();
            // handle data
            this.onLoadList.forEach(function (onError) {
                onError({ type: error
                    ? 'error'
                    : 'load' });
            });
        };

        local._http.XMLHttpRequest.prototype.onResponse = function (responseStream) {
        /*
         * this function will handle the responseStream from the xhr-connection
         */
            this.responseStream = responseStream;
            // update xhr
            this.status = this.statusCode = this.responseStream.statusCode;
            this.statusText = local.http.STATUS_CODES[this.responseStream.statusCode] || '';
            this.readyState = 1;
            this.onreadystatechange();
            this.readyState = 2;
            this.onreadystatechange();
            this.readyState = 3;
            this.onreadystatechange();
            if (this.responseType === 'stream') {
                this.onError(null, this.responseStream);
                return;
            }
            local.streamReadAll(this.responseStream, this.onError);
        };

        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange
        local._http.XMLHttpRequest.prototype.onreadystatechange = local.nop;

        local._http.XMLHttpRequest.prototype.open = function (method, url) {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#open()
         * Initializes a request
         */
            this.method = method;
            this.url = url;
            // parse url
            this.urlParsed = local.urlParse(String(this.url));
            this.hostname = this.urlParsed.hostname;
            this.path = this.urlParsed.pathname + this.urlParsed.search;
            this.port = this.urlParsed.port;
            // init requestStream
            this.requestStream = (this.urlParsed.protocol === 'https:'
                ? local.https
                : local.http).request(this, this.onResponse)
                // handle request-error
                .on('error', this.onError);
        };

        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#overrideMimeType()
        local._http.XMLHttpRequest.prototype.overrideMimeType = local.nop;

        local._http.XMLHttpRequest.prototype.send = function (data) {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#send()
         * Sends the request
         */
            var self;
            self = this;
            self.data = data;
            // asynchronously send data
            setTimeout(function () {
                self.requestStream.end(self.data);
            });
        };

        local._http.XMLHttpRequest.prototype.setRequestHeader = function (key, value) {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#setRequestHeader()
         * Sets the value of an HTTP request header
         */
            key = key.toLowerCase();
            this.headers[key] = value;
            this.requestStream.setHeader(key, value);
        };

        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload
        local._http.XMLHttpRequest.prototype.upload = { addEventListener: local.nop };

        local._http.createServer = function () {
            /*
             * https://nodejs.org/api/all.html#all_http_createserver_requestlistener
             * Returns a new instance of http.Server
             */
            return { listen: function (port, onError) {
            /*
             * https://nodejs.org/api/all.html#all_server_listen_handle_callback
             * This will cause the server to accept connections on the specified handle,
             * but it is presumed that the file descriptor or handle has already been bound
             * to a port or domain socket
             */
                // jslint-hack
                local.nop(port);
                onError();
            } };
        };

        local._http.request = function (xhr, onResponse) {
            var self;
            self = {};
            self.end = function (data) {
                // do not run more than once
                if (self.ended) {
                    return;
                }
                self.ended = true;
                self.serverRequest.data = data;
                local.serverLocalRequestHandler(self.serverRequest, self.serverResponse);
            };
            self.on = function () {
                return self;
            };
            self.serverRequest = new local._http.IncomingMessage(xhr);
            self.serverResponse = new local._http.ServerResponse(onResponse);
            self.setHeader = function (key, value) {
                self.serverRequest.headers[key.toLowerCase()] = value;
            };
            return self;
        };

        local.ajax = function (options, onError) {
        /*
         * this function will send an ajax-request with error-handling and timeout
         * example usage:
            local.ajax({
                method: 'GET',
                url: '/index.html'
            }, function (error, xhr) {
                console.log(xhr.responseText);
                console.log(xhr.statusCode);
            });
         */
            var tmp, xhr;
            // init standalone handling-behavior
            local.nop = local.nop || function () {
                return;
            };
            local.ajaxForwardProxyUrlTest = local.ajaxForwardProxyUrlTest || local.nop;
            local.ajaxProgressCounter = local.ajaxProgressCounter || 0;
            local.ajaxProgressUpdate = local.ajaxProgressUpdate || local.nop;
            local.bufferToNodeBuffer = local.bufferToNodeBuffer || local.nop;
            local.bufferToString = local.bufferToString || local.nop;
            local.errorMessagePrepend = local.errorMessagePrepend || local.nop;
            local.onErrorWithStack = local.onErrorWithStack || function (arg) {
                return arg;
            };
            local.serverLocalUrlTest = local.serverLocalUrlTest || local.nop;
            local.streamListCleanup = local.streamListCleanup || local.nop;
            local.timeoutDefault = local.timeoutDefault || 30000;
            local.tryCatchOnError = local.tryCatchOnError || local.nop;
            // init onError
            onError = local.onErrorWithStack(onError);
            // init xhr
            xhr = local.modeJs === 'node' || local.serverLocalUrlTest(options.url)
                ? new local._http.XMLHttpRequest()
                : new window.XMLHttpRequest();
            // debug xhr
            local._debugXhr = xhr;
            // init options
            Object.keys(options).forEach(function (key) {
                if (options[key] !== undefined) {
                    xhr[key] = options[key];
                }
            });
            // init headers
            xhr.headers = {};
            Object.keys(options.headers || {}).forEach(function (key) {
                xhr.headers[key.toLowerCase()] = options.headers[key];
            });
            // init method
            xhr.method = xhr.method || 'GET';
            // init timeStart
            xhr.timeStart = Date.now();
            // init timeout
            xhr.timeout = xhr.timeout || local.timeoutDefault;
            // init timerTimeout
            xhr.timerTimeout = setTimeout(function () {
                xhr.error = xhr.error || new Error('onTimeout - timeout-error - ' +
                    xhr.timeout + ' ms - ' + 'ajax ' + xhr.method + ' ' + xhr.url);
                xhr.abort();
                // cleanup requestStream and responseStream
                local.streamListCleanup([xhr.requestStream, xhr.responseStream]);
            }, xhr.timeout | 0);
            // init event handling
            xhr.onEvent = function (event) {
                // init statusCode
                xhr.statusCode = xhr.status;
                switch (event.type) {
                case 'abort':
                case 'error':
                case 'load':
                    // do not run more than once
                    if (xhr.isDone) {
                        return;
                    }
                    xhr.isDone = true;
                    // debug ajaxResponse
                    if (xhr.modeDebug) {
                        console.error({
                            type: 'ajaxResponse',
                            time: new Date(xhr.timeStart).toISOString(),
                            method: xhr.method,
                            url: xhr.url,
                            statusCode: xhr.statusCode,
                            duration: Date.now() - xhr.timeStart,
                            // extra
                            headers: xhr.headers,
                            data: xhr.data && xhr.data.slice &&
                                local.bufferToString(xhr.data.slice(0, 256)),
                            responseText: local.tryCatchOnError(function () {
                                return xhr.responseText.slice(0, 256);
                            }, local.nop)
                        });
                    }
                    // cleanup timerTimeout
                    clearTimeout(xhr.timerTimeout);
                    // cleanup requestStream and responseStream
                    setTimeout(function () {
                        local.streamListCleanup([xhr.requestStream, xhr.responseStream]);
                    });
                    // decrement ajaxProgressCounter
                    local.ajaxProgressCounter -= 1;
                    // handle abort or error event
                    if (!xhr.error &&
                            (event.type === 'abort' ||
                            event.type === 'error' ||
                            xhr.statusCode >= 400)) {
                        xhr.error = new Error(event.type);
                    }
                    // handle completed xhr request
                    if (xhr.readyState === 4) {
                        // handle string data
                        if (xhr.error) {
                            // debug statusCode
                            xhr.error.statusCode = xhr.statusCode;
                            // debug statusCode / method / url
                            tmp = local.modeJs + ' - ' + xhr.statusCode + ' ' + xhr.method +
                                ' ' + xhr.url + '\n';
                            // try to debug responseText
                            local.tryCatchOnError(function () {
                                tmp += '    ' + JSON.stringify(xhr.responseText.slice(0, 256) +
                                    '...') + '\n';
                            }, local.nop);
                            local.errorMessagePrepend(xhr.error, tmp);
                        }
                    }
                    onError(xhr.error, xhr);
                    break;
                }
                local.ajaxProgressUpdate();
            };
            // increment ajaxProgressCounter
            local.ajaxProgressCounter += 1;
            xhr.addEventListener('abort', xhr.onEvent);
            xhr.addEventListener('error', xhr.onEvent);
            xhr.addEventListener('load', xhr.onEvent);
            xhr.addEventListener('loadstart', local.ajaxProgressUpdate);
            xhr.addEventListener('progress', local.ajaxProgressUpdate);
            xhr.upload.addEventListener('progress', local.ajaxProgressUpdate);
            // open url
            xhr.forwardProxyUrl = local.modeJs === 'browser' &&
                (/^https{0,1}:/).test(xhr.url) &&
                xhr.url.indexOf(location.protocol + '//' + location.host) !== 0 &&
                local.ajaxForwardProxyUrlTest(xhr.url, location);
            if (xhr.forwardProxyUrl) {
                xhr.open(xhr.method, xhr.forwardProxyUrl);
                xhr.setRequestHeader('forward-proxy-headers', JSON.stringify(xhr.headers));
                xhr.setRequestHeader('forward-proxy-url', xhr.url);
            } else {
                xhr.open(xhr.method, xhr.url);
            }
            Object.keys(xhr.headers).forEach(function (key) {
                xhr.setRequestHeader(key, xhr.headers[key]);
            });
            if (local.FormData && xhr.data instanceof local.FormData) {
                // handle formData
                xhr.data.read(function (error, data) {
                    if (error) {
                        xhr.error = xhr.error || error;
                        xhr.onEvent({ type: 'error' });
                        return;
                    }
                    // send data
                    xhr.send(local.bufferToNodeBuffer(data));
                });
            } else {
                // send data
                xhr.send(local.bufferToNodeBuffer(xhr.data));
            }
            return xhr;
        };

        local.ajaxProgressUpdate = function () {
        /*
         * this function will update ajaxProgress
         */
            var ajaxProgressDiv1;
            // cleanup timerInterval
            clearInterval(local.global.timerIntervalAjaxProgressUpdate);
            ajaxProgressDiv1 = local.modeJs === 'browser' &&
                document.querySelector('#ajaxProgressDiv1');
            if (!ajaxProgressDiv1) {
                return;
            }
            // init ajaxProgressDiv1StyleBackground
            local.ajaxProgressDiv1StyleBackground = local.ajaxProgressDiv1StyleBackground ||
                ajaxProgressDiv1.style.background;
            // show ajaxProgress
            ajaxProgressDiv1.style.background = local.ajaxProgressDiv1StyleBackground;
            // increment ajaxProgress
            if (local.ajaxProgressCounter > 0) {
                // this algorithm will indefinitely increment the ajaxProgressBar
                // with successively smaller increments without ever reaching 100%
                local.ajaxProgressState += 1;
                ajaxProgressDiv1.style.width = Math.max(
                    100 - 75 * Math.exp(-0.125 * local.ajaxProgressState),
                    Number(ajaxProgressDiv1.style.width.slice(0, -1)) || 0
                ) + '%';
            } else {
                // finish ajaxProgress
                ajaxProgressDiv1.style.width = '100%';
            }
            // cleanup timerTimeout
            clearTimeout(local.timerTimeoutAjaxProgressHide);
            // hide ajaxProgress
            local.timerTimeoutAjaxProgressHide = setTimeout(function () {
                ajaxProgressDiv1.style.background = 'transparent';
                local.ajaxProgressCounter = 0;
                local.ajaxProgressState = 0;
                // reset ajaxProgress
                setTimeout(function () {
                    // coverage-hack - ignore else-statement
                    local.nop(!local.ajaxProgressState && (function () {
                        ajaxProgressDiv1.style.width = '0%';
                    }()));
                }, 500);
            }, local.ajaxProgressCounter > 0
                ? local.timeoutDefault
                : 1500);
        };

        local.assert = function (passed, message) {
        /*
         * this function will throw the error message if passed is falsey
         */
            var error;
            if (passed) {
                return;
            }
            error = message && message.message
                // if message is an error-object, then leave it as is
                ? message
                : new Error(typeof message === 'string'
                    // if message is a string, then leave it as is
                    ? message
                    // else JSON.stringify message
                    : JSON.stringify(message));
            throw error;
        };

        local.assertJsonEqual = function (aa, bb) {
        /*
         * this function will assert
         * jsonStringifyOrdered(aa) === JSON.stringify(bb)
         */
            aa = local.jsonStringifyOrdered(aa);
            bb = JSON.stringify(bb);
            local.assert(aa === bb, [aa, bb]);
        };

        local.assertJsonNotEqual = function (aa, bb) {
        /*
         * this function will assert
         * jsonStringifyOrdered(aa) !== JSON.stringify(bb)
         */
            aa = local.jsonStringifyOrdered(aa);
            bb = JSON.stringify(bb);
            local.assert(aa !== bb, [aa]);
        };

        local.base64FromBuffer = function (bff) {
        /*
         * https://developer.mozilla.org/en-US/Add-ons/Code_snippets/StringView#The_code
         * this function will convert the Uint8Array-bff to base64-encoded-text
         */
            var ii, mod3, text, uint24, uint6ToB64;
            text = '';
            uint24 = 0;
            uint6ToB64 = function (uint6) {
                return uint6 < 26
                    ? uint6 + 65
                    : uint6 < 52
                    ? uint6 + 71
                    : uint6 < 62
                    ? uint6 - 4
                    : uint6 === 62
                    ? 43
                    : 47;
            };
            for (ii = 0; ii < bff.length; ii += 1) {
                mod3 = ii % 3;
                uint24 |= bff[ii] << (16 >>> mod3 & 24);
                if (mod3 === 2 || bff.length - ii === 1) {
                    text += String.fromCharCode(
                        uint6ToB64(uint24 >>> 18 & 63),
                        uint6ToB64(uint24 >>> 12 & 63),
                        uint6ToB64(uint24 >>> 6 & 63),
                        uint6ToB64(uint24 & 63)
                    );
                    uint24 = 0;
                }
            }
            return text.replace(/A(?=A$|$)/g, '=');
        };

        local.base64FromHex = function (text) {
        /*
         * this function will convert the hex-text to base64-encoded-text
         */
            var bff, ii;
            bff = [];
            for (ii = 0; ii < text.length; ii += 2) {
                bff.push(parseInt(text[ii] + text[ii + 1], 16));
            }
            return local.base64FromBuffer(bff);
        };

        local.base64FromString = function (text) {
        /*
         * this function will convert the utf8-text to base64-encoded-text
         */
            return local.base64FromBuffer(local.bufferCreate(text));
        };

        /* jslint-ignore-begin */
        local.base64ToBuffer = function (text) {
        /*
         * https://gist.github.com/wang-bin/7332335
         * this function will convert the base64-encoded text to Uint8Array
         */
            var de = new Uint8Array(text.length); //3/4
            var u = 0, q = '', x = '', c;
            var map64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            for (var r=0; c=text[x++]; ~c&&(u=q%4?u*64+c:c,q++%4)?de[r++]=(255&u>>(-2*q&6)):0)
                c = map64.indexOf(c);
            return de.subarray(0, r);
        };
        /* jslint-ignore-end */

        local.base64ToHex = function (text) {
        /*
         * this function will convert the base64-encoded-text to hex-text
         */
            var bff, ii;
            bff = local.base64ToBuffer(text);
            text = '';
            for (ii = 0; ii < bff.length; ii += 1) {
                text += (256 + bff[ii]).toString(16).slice(-2);
            }
            return text;
        };

        local.base64ToString = function (text) {
        /*
         * this function will convert the base64-encoded text to utf8-text
         */
            return local.bufferToString(local.base64ToBuffer(text));
        };

        local.blobRead = function (blob, encoding, onError) {
        /*
         * this function will read from the blob with the given encoding
         * possible encodings are:
         * - Uint8Array (default)
         * - dataURL
         * - text
         */
            var data, isDone, reader;
            if (local.modeJs === 'node') {
                switch (encoding) {
                // readAsDataURL
                case 'dataURL':
                    data = 'data:' + (blob.type || '') + ';base64,' +
                        local.base64FromBuffer(blob.bff);
                    break;
                // readAsText
                case 'text':
                    data = local.bufferToString(blob.bff);
                    break;
                // readAsArrayBuffer
                default:
                    data = local.bufferCreate(blob.bff);
                }
                onError(null, data);
                return;
            }
            reader = new local.global.FileReader();
            reader.onabort = reader.onerror = reader.onload = function (event) {
                if (isDone) {
                    return;
                }
                isDone = true;
                switch (event.type) {
                case 'abort':
                case 'error':
                    onError(new Error('blobRead - ' + event.type));
                    break;
                case 'load':
                    onError(null, reader.result instanceof local.global.ArrayBuffer
                        // convert ArrayBuffer to Uint8Array
                        ? local.bufferCreate(reader.result)
                        : reader.result);
                    break;
                }
            };
            switch (encoding) {
            // readAsDataURL
            case 'dataURL':
                reader.readAsDataURL(blob);
                break;
            // readAsText
            case 'text':
                reader.readAsText(blob);
                break;
            // readAsArrayBuffer
            default:
                reader.readAsArrayBuffer(blob);
            }
        };

        local.browserTest = function (options, onError) {
        /*
         * this function will spawn an electron process to test options.url
         */
            var fileScreenshotBaseScrape, isDone, onParallel, timerTimeout;
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                // node - init
                case 1:
                    fileScreenshotBaseScrape = function (url) {
                        return options.npm_config_dir_build + '/screenshot.scrape.browser.' +
                            encodeURIComponent(url.split(/[?#]/)[0]);
                    };
                    // init options
                    [
                        'CI_BRANCH',
                        'CI_HOST',
                        'DISPLAY',
                        'MODE_BUILD',
                        'PATH',
                        'fileCoverage',
                        'fileScreenshotBase',
                        'fileTestReport',
                        'modeBrowserTest',
                        'modeBrowserTestRecurseDepth',
                        'modeBrowserTestRecurseExclude',
                        'modeBrowserTestRecurseInclude',
                        'modeBrowserTestRecursePath',
                        'modeBrowserTestShow',
                        'modeBrowserTestTranslate',
                        'modeBrowserTestTranslating',
                        'modeCoverageMerge',
                        'modeSilent',
                        'npm_config_dir_build',
                        'npm_config_dir_tmp',
                        'rateLimit',
                        'timeExit',
                        'timeoutDefault',
                        'timeoutScreenshot',
                        'url'
                    ].forEach(function (key) {
                        if (typeof options[key] === 'number') {
                            return;
                        }
                        options[key] = options[key] || local.env[key] || '';
                        local.assert(!(options[key] && typeof options[key] === 'object'));
                    });
                    options.modeBrowserTestRecurseDepth = Number(
                        options.modeBrowserTestRecurseDepth
                    ) || 0;
                    if (options.modeBrowserTest === 'translateAfterScrape') {
                        options.modeBrowserTest = 'scrape';
                        options.modeBrowserTest2 = 'translateAfterScrape';
                    }
                    options.timeoutDefault = options.timeoutDefault || local.timeoutDefault;
                    // init url
                    if (!(/^\w+:\/\//).test(options.url)) {
                        options.url = local.path.resolve(process.cwd(), options.url);
                        if (options.modeBrowserTest2 === 'translateAfterScrape' &&
                                !options.modeBrowserTestTranslating) {
                            options.fileScreenshotBase = options.url;
                        }
                    }
                    options.urlParsed = local.urlParse(options.url);
                    // init testName
                    options.testName = options.urlParsed.pathname;
                    if (options.testName.indexOf(process.cwd()) === 0) {
                        options.testName = options.testName.replace(process.cwd(), '');
                    }
                    if (options.modeBrowserTest === 'scrape') {
                        options.testName = options.urlParsed.href
                            .split('/')
                            .slice(0, 3)
                            .join('/') + options.testName;
                        options.fileScreenshotBase = options.fileScreenshotBase ||
                            fileScreenshotBaseScrape(options.url);
                    }
                    options.testName = options.MODE_BUILD + '.browser.' +
                        encodeURIComponent(options.testName.replace(
                            '/build..' + options.CI_BRANCH + '..' + options.CI_HOST,
                            '/build'
                        ));
                    local.objectSetDefault(options, {
                        fileCoverage: options.npm_config_dir_tmp +
                            '/coverage.' + options.testName + '.json',
                        fileScreenshotBase: options.npm_config_dir_build +
                            '/screenshot.' + options.testName,
                        fileTestReport: options.npm_config_dir_tmp +
                            '/test-report.' + options.testName + '.json',
                        modeBrowserTest: 'test',
                        timeExit: Date.now() + options.timeoutDefault,
                        timeoutScreenshot: options.timeoutScreenshot || 15000
                    }, 1);
                    options.fileScreenshot = options.fileScreenshotBase + '.png';
                    // node.electron - init
                    if (process.versions.electron) {
                        options.modeNext = 10;
                        options.onNext();
                        return;
                    }
                    // node - translating
                    if (options.modeBrowserTestTranslating) {
                        options.onNext();
                        return;
                    }
                    // node - recurse
/*
https://cloud.google.com/translate/docs/languages
example usage:
mkdir -p /tmp/100 && \
    rm -f /tmp/100/screenshot.* && \
    modeBrowserTestRecurseDepth=1 \
    modeBrowserTestRecurseInclude=/www.iana.org/,/example.com/ \
    modeBrowserTestTranslate=zh-CN \
    npm_config_dir_build=/tmp/100 \
    timeoutScreenshot=5000 \
    shBrowserTest 'http://example.com/' scrape && \
    ls -l /tmp/100
mkdir -p /tmp/100 && \
    rm -f /tmp/100/screenshot.* && \
    modeBrowserTestRecurseDepth=1 \
    modeBrowserTestRecurseExclude=/english/ \
    modeBrowserTestRecurseInclude=.xinhuanet.com/,/xinhuanet.com/ \
    modeBrowserTestTranslate2=en \
    npm_config_dir_build=/tmp/100 \
    rateLimit=4 \
    timeoutScreenshot=10000 \
    shBrowserTest 'http://xinhuanet.com/' scrape && \
    ls -l /tmp/100
*/
                    if (options.modeBrowserTestRecursePath) {
                        if (options.modeBrowserTestRecurseDepth < 0 ||
                                local.fs.existsSync(options.fileScreenshot)) {
                            options.modeNext = Infinity;
                        } else {
                            console.error('\nbrowserTest - recurse ' +
                                options.modeBrowserTestRecurseDepth + ' ' +
                                options.modeBrowserTestRecursePath + options.url +
                                '\n');
                            local.fs.writeFileSync(options.fileScreenshot, '');
                        }
                        options.onNext();
                        return;
                    }
                    options.onNext();
                    break;
                // node - spawn electron
                case 2:
                    // node - translateAfterScrape
                    if (options.modeBrowserTest2 === 'translateAfterScrape' &&
                            !options.modeBrowserTestTranslating) {
                        options.onNext();
                        return;
                    }
                    if (options.modeBrowserTest !== 'scrape') {
                        options.modeNext = Infinity;
                    }
                    local.childProcessSpawnWithTimeout('electron', [
                        __filename,
                        'cli.browserTest',
                        options.url,
                        '--enable-logging'
                    ], {
                        env: options,
                        stdio: options.modeSilent
                            ? 'ignore'
                            : ['ignore', 1, 2],
                        timeout: options.timeoutDefault
                    })
                        .on('error', options.onNext)
                        .once('exit', options.onNext);
                    break;
                // node - google-translate options.url
                // to the languages in options.modeBrowserTranslate
                case 3:
                    if (options.modeBrowserTest2 === 'translateAfterScrape' ||
                            options.modeBrowserTestTranslating) {
                        options.modeNext = Infinity;
                    }
                    local.onParallelList({
                        list: (!options.modeBrowserTestTranslating &&
                            options.modeBrowserTestTranslate
                            .split(/[\s,]+/)
                            .filter(function (element) {
                                return element;
                            }))
                    }, function (options2, onParallel) {
                        options2.fileScreenshotBase = options.fileScreenshotBase +
                            '.translateAfterScrape.' + options2.element;
                        local.fs.writeFileSync(
                            options2.fileScreenshotBase + '.html',
                            local.fs.readFileSync(options.fileScreenshotBase + '.html', 'utf8')
/* jslint-ignore-begin */
// local.ajax({url: 'https://translate.googleapis.com/translate_a/l?client=te' }, function () { console.log(local.jsonStringifyOrdered(JSON.parse(arguments[1].responseText), null, 4)); });
+ '\
\n\
<div id="google_translate_element"></div>\n\
<script type="text/javascript">\n\
function TranslateElementInit() {\n\
    new google.translate.TranslateElement({\n\
        includedLanguages: "' + options2.element + '",\n\
        layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL\n\
    }, "google_translate_element");\n\
    document.querySelector(".goog-te-combo").selectedIndex = 1;\n\
    document.querySelector(".goog-te-combo").dispatchEvent(new Event("change"));\n\
    document.querySelector(".goog-te-combo").dispatchEvent(new Event("change"));\n\
    setInterval(function () {\n\
        window.scrollTo(0, 0);\n\
    }, 1000);\n\
}\n\
</script>\n\
<script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=TranslateElementInit"></script>\n\
'
/* jslint-ignore-end */
                        );
                        onParallel.counter += 1;
                        local.browserTest({
                            modeBrowserTest: options2.modeBrowserTest,
                            fileScreenshotBase: options2.fileScreenshotBase,
                            modeBrowserTestTranslating: options2.element,
                            timeoutScreenshot: options.timeoutScreenshot,
                            url: (options2.fileScreenshotBase + '.html').replace((/%/g), '%25')
                        }, onParallel);
                    }, options.onNext);
                    break;
                // node - recurse
                case 4:
                    local.fs.readFileSync(
                        options.fileScreenshotBase + '.html',
                        'utf8'
                    ).replace((/ data-scrape="([\S\s]*?)"/), function (match0, match1) {
                        // jslint-hack
                        local.nop(match0);
                        data = JSON.parse(match1
                            .replace((/&quot;/g), '"')
                            .replace((/&amp;/g), '&'));
                    });
                    data.readdirDict = {};
                    data.recurseDict = {};
                    data.tmp = local.fs.readdirSync(options.npm_config_dir_build);
                    data.tmp.forEach(function (file) {
                        data.readdirDict[options.npm_config_dir_build + '/' + file] = true;
                    });
                    data.exclude = options.modeBrowserTestRecurseExclude
                        .split(/[\s,]+/)
                        .filter(function (element) {
                            return element;
                        });
                    data.include = (options.modeBrowserTestRecurseInclude ||
                        (options.url.split((/[\/?#]/)).slice(0, 3).join('/')))
                        .split(/[\s,]+/)
                        .filter(function (element) {
                            return element;
                        });
                    Object.keys(data.hrefDict).forEach(function (url) {
                        if (url && data.exclude.every(function (element) {
                                return url.indexOf(element) < 0;
                            }) && data.include.some(function (element) {
                                return url.indexOf(element) >= 0;
                            })) {
                            data.recurseDict[url] = true;
                        }
                    });
                    local.onParallelList({
                        list: Object.keys(data.recurseDict).sort(),
                        rateLimit: options.rateLimit || 1
                    }, function (options2, onParallel) {
                        onParallel.counter += 1;
                        local.browserTest({
                            modeBrowserTest: options.modeBrowserTest,
                            modeBrowserTestRecurseDepth:
                                options.modeBrowserTestRecurseDepth - 1,
                            modeBrowserTestRecurseExclude:
                                options.modeBrowserTestRecurseExclude,
                            modeBrowserTestRecurseInclude:
                                options.modeBrowserTestRecurseInclude,
                            modeBrowserTestRecursePath: options.modeBrowserTestRecursePath +
                                options.url + ' -> ',
                            modeBrowserTestTranslate: options.modeBrowserTestTranslate,
                            timeoutScreenshot: options.timeoutScreenshot,
                            url: options2.element
                        }, onParallel);
                    }, options.onNext);
                    break;
                // node.electron - init
                case 11:
                    // init timerTimeout
                    timerTimeout = local.onTimeout(
                        options.onNext,
                        options.timeoutDefault,
                        options.testName
                    ).unref();
                    // init file fileElectronHtml
                    options.browserTestScript = local.browserTestElectron
                        .toString()
                        .replace((/<\//g), '<\\/')
                        // coverage-hack - un-instrument
                        .replace((/\b__cov_.*?\+\+/g), '0');
                    options.fileElectronHtml = options.npm_config_dir_tmp + '/electron.' +
                        Date.now().toString(16) + Math.random().toString(16) + '.html';
                    options.modeNext = 20;
                    local.fsWriteFileWithMkdirpSync(options.fileElectronHtml, '<style>body {' +
                            'border: 1px solid black;' +
                            'margin: 0;' +
                            'padding: 0;' +
                        '}</style>' +
                        '<webview id="webview1" preload="' + options.fileElectronHtml +
                        '.preload.js" src="' +
                        options.url.replace('{{timeExit}}', options.timeExit) +
                        '" style="' +
                            'border: none;' +
                            'height: 100%;' +
                            'margin: 0;' +
                            'padding: 0;' +
                            'width: 100%;' +
                        '"></webview>' +
                        '<script>window.local = {}; (' + options.browserTestScript +
                        '(' + JSON.stringify(options) + '))</script>');
                    console.error('\nbrowserTest - created electron entry-page ' +
                        options.fileElectronHtml + '\n');
                    // init file fileElectronHtml.preload.js
                    options.modeNext = 30;
                    local.fsWriteFileWithMkdirpSync(
                        options.fileElectronHtml + '.preload.js',
                        '(' + options.browserTestScript + '(' + JSON.stringify(options) +
                            '))'
                    );
                    // reset modeNext
                    options.modeNext = 11;
                    local.electron = options.electron;
                    local.tryCatchOnError(function () {
                        local.electron = require('electron');
                    }, local.nop);
                    // handle uncaughtexception
                    process.once('uncaughtException', options.onNext);
                    // wait for electron to init
                    local.electron.app.once('ready', function () {
                        options.onNext();
                    });
                    break;
                // node.electron - after ready
                case 12:
                    options.BrowserWindow = local.electron.BrowserWindow;
                    local.objectSetDefault(options, {
                        frame: false,
                        height: 768,
                        show: !!options.modeBrowserTestShow,
                        width: 1024,
                        x: 0,
                        y: 0
                    });
                    // init browserWindow
                    options.browserWindow = new options.BrowserWindow(options);
                    onParallel = local.onParallel(options.onNext);
                    // onParallel - html
                    onParallel.counter += 1;
                    // onParallel - test
                    if (options.modeBrowserTest === 'test') {
                        onParallel.counter += 1;
                    }
                    options.browserWindow.on('page-title-updated', function (event, title) {
                        if (event && title.indexOf(options.fileElectronHtml) === 0) {
                            if (title.split(' ').slice(-1)[0] === 'opened') {
                                console.error('\nbrowserTest - opened ' + options.url + '\n');
                                return;
                            }
                            onParallel();
                        }
                    });
                    // load url in browserWindow
                    options.browserWindow.loadURL('file://' + options.fileElectronHtml, {
                        userAgent: options.modeBrowserTest === 'scrape' &&
                            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 ' +
                            '(KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
                    });
                    break;
                // node.electron - after html
                case 13:
                    options.browserWindow.capturePage(options, function (data) {
                        local.fs.writeFileSync(options.fileScreenshot, data.toPng());
                        console.error('\nbrowserTest - created screenshot file ' +
                            options.fileScreenshot + '\n');
                        options.onNext();
                    });
                    break;
                // node.electron - after screenshot
                case 14:
                    console.error('browserTest - created screenshot file ' +
                        options.fileScreenshotBase + '.html');
                    options.onNext();
                    local.exit();
                    break;
                default:
                    if (isDone) {
                        return;
                    }
                    isDone = true;
                    local.onErrorDefault(error);
                    if (options.modeBrowserTestRecursePath) {
                        error = null;
                    }
                    // cleanup timerTimeout
                    clearTimeout(timerTimeout);
                    // cleanup fileElectronHtml
                    local.tryCatchOnError(function () {
                        local.fs.unlinkSync(options.fileElectronHtml);
                        local.fs.unlinkSync(options.fileElectronHtml + '.preload.js');
                    }, local.nop);
                    // create test-report
                    if (!(options.modeBrowserTest === 'test' &&
                            local.modeJs === 'node' &&
                            !process.versions.electron)) {
                        onError(error);
                        return;
                    }
                    // merge browser coverage
                    // try to JSON.parse the string
                    data = null;
                    local.tryCatchOnError(function () {
                        data = options.modeCoverageMerge && JSON.parse(
                            local.fs.readFileSync(options.fileCoverage, 'utf8')
                        );
                    }, local.nop);
                    local.istanbulCoverageMerge(local.global.__coverage__, data);
                    console.error('\nbrowserTest - merged coverage from file ' +
                        options.fileCoverage + '\n');
                    // try to merge browser test-report
                    data = null;
                    local.tryCatchOnError(function () {
                        data = !error && JSON.parse(
                            local.fs.readFileSync(options.fileTestReport, 'utf8')
                        );
                    }, local.nop);
                    if (data && !options.modeTestIgnore) {
                        local.testReportMerge(local.testReport, data);
                        console.error('\nbrowserTest - merged test-report from file ' +
                            options.fileTestReport + '\n');
                    }
                    // create test-report.json
                    local.fs.writeFileSync(
                        options.npm_config_dir_build + '/test-report.json',
                        JSON.stringify(local.testReport)
                    );
                    onError(data && data.testsFailed && new Error(data.testsFailed));
                }
            });
            options.modeNext = Number(options.modeNext) || 0;
            options.onNext();
        };

        /* istanbul ignore next */
        local.browserTestElectron = function (options) {
        /*
         * this function will spawn an electron process to test options.url
         */
            var modeNext, onNext, tmp;
            onNext = function (error, data) {
                modeNext = error instanceof Error
                    ? Infinity
                    : modeNext + 1;
                switch (modeNext) {
                // node.electron.browserWindow - init
                case 21:
                    options.fs = require('fs');
                    options.webview1 = document.querySelector('#webview1');
                    options.webview1.addEventListener('did-get-response-details', function () {
                        document.title = options.fileElectronHtml + ' opened';
                    });
                    options.webview1.addEventListener('console-message', function (event) {
                        modeNext = 21;
                        try {
                            onNext(null, event);
                        } catch (errorCaught) {
                            console.error(errorCaught);
                        }
                    });
                    break;
                // node.electron.browserWindow - handle event console-message
                case 22:
                    data.message.replace(new RegExp(
                        '^' + options.fileElectronHtml + ' (\\w+) '
                    ), function (match0, match1) {
                        data.type2 = match1;
                        data.data = data.message.slice(match0.length);
                    });
                    switch (data.type2) {
                    case 'global_test_results':
                        if (options.modeBrowserTest !== 'test') {
                            return;
                        }
                        options.global_test_results =
                            JSON.parse(data.data).global_test_results;
                        if (options.global_test_results.testReport) {
                            // merge screenshot into test-report
                            options.global_test_results.testReport.testPlatformList[0]
                                .screenshot =
                                options.fileScreenshot.replace((/.*\//), '');
                            // save browser test-report
                            options.fs.writeFileSync(
                                options.fileTestReport,
                                JSON.stringify(options.global_test_results.testReport)
                            );
                            // save browser coverage
                            if (options.global_test_results.coverage) {
                                require('fs').writeFileSync(
                                    options.fileCoverage,
                                    JSON.stringify(options.global_test_results.coverage)
                                );
                            }
                            setTimeout(function () {
                                document.title = options.fileElectronHtml +
                                    ' testReport written';
                            });
                        }
                        break;
                    case 'html':
                        data = data.data;
                        options.fs.writeFileSync(options.fileScreenshotBase + '.html', data);
                        setTimeout(function () {
                            document.title = options.fileElectronHtml + ' html written';
                        });
                        break;
                    default:
                        console.error(data.message);
                    }
                    break;
                // preload.js
                // node.electron.browserWindow.webview - init event-handling
                case 31:
                    if (options.modeBrowserTest === 'test') {
                        window.fileElectronHtml = options.fileElectronHtml;
                    }
                    setTimeout(onNext, options.timeoutScreenshot);
                    break;
                // node.electron.browserWindow.webview - emit event console-message
                case 32:
                    // init data
                    data = {};
                    try {
                        data.hrefDict = {};
                        // disable <script> tag
                        Array.from(
                            document.querySelectorAll('script')
                        ).forEach(function (element) {
                            element.outerHTML = '<script></script>';
                        });
                        // absolute href and src attribute
                        Array.from(
                            document.querySelectorAll('[href],[src]')
                        ).forEach(function (element) {
                            ['href', 'src'].forEach(function (key) {
                                tmp = element[key];
                                if (!tmp) {
                                    return;
                                }
                                if ((/^http:|^https:/).test(tmp)) {
                                    element[key] = tmp;
                                    if (key === 'href') {
                                        tmp = tmp.split(/[?#]/)[0];
                                        data.hrefDict[tmp] = data.hrefDict[tmp] ||
                                            element.textContent.slice(0, 0x100000)
                                            .trim()
                                            .replace((/^["']+|["']+$/), '')
                                            .slice(0, 256);
                                    }
                                    return;
                                }
                                if ((/^javascript/).test(tmp)) {
                                    element[key] = '#';
                                }
                            });
                        });
                        // deduplicate '/'
                        Object.keys(data.hrefDict).forEach(function (key) {
                            if (data.hrefDict.hasOwnProperty(key + '/') ||
                                    (/\.(?:css|js)$/).test(key)) {
                                data.hrefDict[key] = undefined;
                            }
                        });
                        data.href = location.href;
                        data.url = location.href.split(/[?#]/)[0];
                        // body.textContent
                        tmp = '';
                        try {
                            tmp = document.body.textContent.slice(0, 0x100000);
                            Array.from(
                                document.querySelectorAll('style')
                            ).forEach(function (element) {
                                tmp = tmp.replace(element.textContent.slice(0, 65536), '');
                            });
                            tmp = (tmp.trim() + '\n\n')
                                .replace((/\s*?\n/g), '\n')
                                .replace((/\S[\S\s]*?\n{2,}/g), function (match0) {
                                    match0 = match0.trim() + '\n\n';
                                    return match0.length >= 256 + 2
                                        ? match0
                                        : '';
                                })
                                .trim()
                                .slice(0, 65536);
                        } catch (errorCaught) {
                            console.error(errorCaught);
                        }
                        data.bodyTextContent = tmp;
                        document.documentElement.dataset.scrape = JSON.stringify(data, null, 4);
                    } catch (errorCaught) {
                        console.error(errorCaught);
                    }
                    // html
                    console.error(options.fileElectronHtml + ' html ' +
                        document.documentElement.outerHTML);
                    // test
                    if (options.modeBrowserTest === 'test' && !window.utility2) {
                        console.error(options.fileElectronHtml +
                            ' global_test_results ' +
                            JSON.stringify({ global_test_results: {
                                testReport: { testPlatformList: [{}] }
                            } }));
                    }
                    break;
                default:
                    if (error) {
                        console.error(options.fileScreenshot);
                        console.error(error);
                    }
                    // close window
                    try {
                        options.browserWindow.close();
                    } catch (ignore) {
                    }
                }
            };
            modeNext = Number(options.modeNext);
            onNext();
        };

        local.bufferConcat = function (bufferList) {
        /*
         * this function will emulate node's Buffer.concat for Uint8Array in the browser
         */
            var ii, jj, length, result;
            length = 0;
            bufferList = bufferList
                .filter(function (element) {
                    return element || element === 0;
                })
                .map(function (element) {
                    // convert number to string
                    if (typeof element === 'number') {
                        element = String(element);
                    }
                    // convert non-Uint8Array to Uint8Array
                    element = local.bufferCreateIfNotBuffer(element);
                    length += element.length;
                    return element;
                });
            result = local.bufferCreate(length);
            ii = 0;
            bufferList.forEach(function (element) {
                for (jj = 0; jj < element.length; ii += 1, jj += 1) {
                    result[ii] = element[jj];
                }
            });
            return result;
        };

        local.bufferCreate = function (text) {
        /*
         * this function will create a Uint8Array from the text,
         * with either 'utf8' (default) or 'base64' encoding
         */
// bug-workaround - TextEncoder.encode polyfill
/* jslint-ignore-begin */
// utility2-uglifyjs https://github.com/feross/buffer/blob/v4.9.1/index.js#L1670
/* istanbul ignore next */
function utf8ToBytes(e,t){t=t||Infinity;var n,r=e.length,i=null,s=[];for(var o=0
;o<r;++o){n=e.charCodeAt(o);if(n>55295&&n<57344){if(!i){if(n>56319){(t-=3)>-1&&s
.push(239,191,189);continue}if(o+1===r){(t-=3)>-1&&s.push(239,191,189);continue}
i=n;continue}if(n<56320){(t-=3)>-1&&s.push(239,191,189),i=n;continue}n=(i-55296<<10|
n-56320)+65536}else i&&(t-=3)>-1&&s.push(239,191,189);i=null;if(n<128){if((t-=1)<0
)break;s.push(n)}else if(n<2048){if((t-=2)<0)break;s.push(n>>6|192,n&63|128)}else if(
n<65536){if((t-=3)<0)break;s.push(n>>12|224,n>>6&63|128,n&63|128)}else{if(!(n<1114112
))throw new Error("Invalid code point");if((t-=4)<0)break;s.push(n>>18|240,n>>12&63|128
,n>>6&63|128,n&63|128)}}return s}
/* jslint-ignore-end */
            if (typeof text === 'string') {
                if (local.modeJs === 'node') {
                    return new Buffer(text);
                }
                if (local.global.TextEncoder) {
                    return new local.global.TextEncoder('utf-8').encode(text);
                }
                /* jslint-ignore-next-line */
                return new local.global.Uint8Array(utf8ToBytes(text));
            }
            return new local.global.Uint8Array(text);
        };

        local.bufferCreateIfNotBuffer = function (text) {
        /*
         * this function will create a Uint8Array from the text with the given encoding,
         * if it is not already a Uint8Array
         */
            return text instanceof local.global.Uint8Array
                ? text
                : local.bufferCreate(text);
        };

        local.bufferIndexOfSubBuffer = function (bff, subBff, fromIndex) {
        /*
         * this function will search bff for the indexOf-like position of the subBff
         */
            var ii, jj, kk;
            for (ii = fromIndex || 0; ii < bff.length; ii += 1) {
                for (jj = 0, kk = ii; jj < subBff.length; jj += 1, kk += 1) {
                    if (subBff[jj] !== bff[kk]) {
                        break;
                    }
                }
                if (jj === subBff.length) {
                    return kk - jj;
                }
            }
            return subBff.length && -1;
        };

        local.bufferRandomBytes = function (length) {
        /*
         * this function will create create a Uint8Array with the given length,
         * filled with random bytes
         */
            var bff, ii;
            bff = new local.global.Uint8Array(length);
            for (ii = 0; ii < bff.length; ii += 1) {
                bff[ii] = Math.random() * 256;
            }
            return bff;
        };

        local.bufferToNodeBuffer = function (bff) {
        /*
         * this function will convert the Uint8Array instance to a node Buffer instance
         */
            if (local.modeJs === 'node' &&
                    bff instanceof local.global.Uint8Array && (!Buffer.isBuffer(bff))) {
                Object.setPrototypeOf(bff, Buffer.prototype);
            }
            return bff;
        };

        local.bufferToString = function (bff) {
        /*
         * this function will convert the Uint8Array bff to a utf8 string
         */
            bff = bff || '';
            if (typeof bff === 'string') {
                return bff;
            }
            bff = local.bufferCreateIfNotBuffer(bff);
            if (local.modeJs === 'node') {
                return new Buffer(bff).toString();
            }
            if (local.global.TextDecoder) {
                return new local.global.TextDecoder('utf-8').decode(bff);
            }
// bug-workaround - TextDecoder.decode polyfill
/* jslint-ignore-begin */
// http://stackoverflow.com/questions/17191945/conversion-between-utf-8-arraybuffer-and-string
function Utf8ArrayToStr(e){var t,n,r,i,s,o;t="",r=e.length,n=0;while(n<r){i=e[n++
];switch(i>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:t+=String
.fromCharCode(i);break;case 12:case 13:s=e[n++],t+=String.fromCharCode((i&31)<<6|
s&63);break;case 14:s=e[n++],o=e[n++],t+=String.fromCharCode((i&15)<<12|(s&63)<<6|
(o&63)<<0)}}return t}
return Utf8ArrayToStr(bff);
/* jslint-ignore-end */
        };

        local.buildApidoc = function (options, onError) {
        /*
         * this function will build the apidoc
         */
            if (local.env.npm_package_buildCustomOrg && !options.modeForce) {
                onError();
                return;
            }
            // optimization - do not run if $npm_config_mode_coverage = all
            if (local.env.npm_config_mode_coverage === 'all') {
                onError();
                return;
            }
            local.objectSetDefault(options, {
                blacklistDict: local,
                require: local.requireInSandbox
            });
            // create apidoc.html
            local.fsWriteFileWithMkdirpSync(
                local.env.npm_config_dir_build + '/apidoc.html',
                local.tryCatchReadFile('apidoc.html', 'utf8') || local.apidocCreate(options)
            );
            console.error('created apidoc file ' + local.env.npm_config_dir_build +
                '/apidoc.html\n');
            onError();
        };

        local.buildApp = function (options, onError) {
        /*
         * this function will build the app
         */
            local.fsRmrSync(local.env.npm_config_dir_build + '/app');
            local.onParallelList({ list: options.concat([{
                file: '/assets.' + local.env.npm_package_nameAlias + '.html',
                url: '/index.html'
            }, {
                file: '/assets.' + local.env.npm_package_nameAlias + '.js',
                url: '/assets.' + local.env.npm_package_nameAlias + '.js'
            }, {
                file: '/assets.app.js',
                url: '/assets.app.js'
            }, {
                file: '/assets.example.html',
                url: '/assets.example.html'
            }, {
                file: '/assets.example.js',
                url: '/assets.example.js'
            }, {
                file: '/assets.index.css',
                url: '/assets.index.css'
            }, {
                file: '/assets.swgg.html',
                url: '/assets.swgg.html'
            }, {
                file: '/assets.swgg.swagger.json',
                url: '/assets.swgg.swagger.json'
            }, {
                file: '/assets.swgg.swagger.petstore.json',
                url: '/assets.swgg.swagger.petstore.json'
            }, {
                file: '/assets.swgg.swagger.server.json',
                url: '/assets.swgg.swagger.server.json'
            }, {
                file: '/assets.test.js',
                url: '/assets.test.js'
            }, {
                file: '/assets.utility2.rollup.js',
                url: '/assets.utility2.rollup.js'
            }, {
                file: '/index.html',
                url: '/index.html'
            }, {
                file: '/jsonp.utility2.stateInit',
                url: '/jsonp.utility2.stateInit?callback=window.utility2.stateInit'
            }]) }, function (options, onParallel) {
                options = options.element;
                onParallel.counter += 1;
                local.ajax(options, function (error, xhr) {
                    // validate no error occurred
                    local.assert(!error, error);
                    // jslint file
                    local.jslintAndPrintConditional(xhr.responseText, options.file);
                    // validate no error occurred
                    local.assert(!local.jslint.errorText, local.jslint.errorText);
                    local.fsWriteFileWithMkdirpSync(
                        local.env.npm_config_dir_build + '/app' + options.file,
                        new Buffer(xhr.response)
                    );
                    onParallel();
                });
            }, function (error) {
                // validate no error occurred
                local.assert(!error, error);
                // test standalone assets.app.js
                local.fs.writeFileSync('tmp/assets.app.js', local.assetsDict['/assets.app.js']);
                local.childProcessSpawnWithTimeout('node', ['assets.app.js'], {
                    cwd: 'tmp',
                    env: {
                        PATH: local.env.PATH,
                        PORT: (local.env.PORT ^ (Math.random() * 0x10000)) | 0x8000,
                        npm_config_timeout_exit: 5000
                    },
                    stdio: ['ignore', 1, 2]
                })
                    .once('error', onError)
                    .once('exit', function (exitCode) {
                        // validate exitCode
                        local.assert(!exitCode, exitCode);
                        onError();
                    });
            });
        };

        local.buildCustomOrg = function (options, onError) {
        /*
         * this function will build the customOrg
         */
            var isDone, onError2, onParallel;
            if (!local.env.npm_package_buildCustomOrg && !options.modeForce) {
                onError();
                return;
            }
            onError2 = function (error) {
                local.onErrorDefault(error);
                if (isDone) {
                    return;
                }
                isDone = true;
                // try to recover from error
                setTimeout(onError, error && local.timeoutDefault);
            };
            // try to recover from uncaughtException
            process.on('uncaughtException', onError2);
            onParallel = local.onParallel(onError2);
            onParallel.counter += 1;
            // build package.json
            options.packageJson = JSON.parse(local.fs.readFileSync('package.json', 'utf8'));
            onParallel.counter += 1;
            local.buildReadme({
                dataFrom: '\n# package.json\n```json\n' + JSON.stringify(options.packageJson) +
                    '\n```\n',
                modeForce: true
            }, onParallel);
            options.packageJson = JSON.parse(local.fs.readFileSync('package.json', 'utf8'));
            switch (local.env.GITHUB_ORG) {
            case 'npmdoc':
                local.objectSetOverride(options, {
                    packageJson: {
                        keywords: ['documentation', local.env.npm_package_buildCustomOrg]
                    }
                }, 2);
                // build apidoc.html
                onParallel.counter += 1;
                local.buildApidoc({
                    dir: local.env.npm_package_buildCustomOrg,
                    modeForce: true,
                    modulePathList: options.modulePathList
                }, onParallel);
                break;
            case 'npmtest':
                local.objectSetOverride(options, {
                    packageJson: {
                        keywords: ['coverage', 'test', local.env.npm_package_buildCustomOrg]
                    }
                }, 2);
                break;
            case 'scrapeitall':
                break;
            }
            // build README.md
            options.readme = local.apidocCreate({
                dir: local.env.npm_package_buildCustomOrg,
                modeNoApidoc: true,
                modulePathList: options.modulePathList,
                require: local.requireInSandbox,
                template: local.assetsDict['/assets.readmeCustomOrg.' + local.env.GITHUB_ORG +
                    '.template.md']
            });
            local.fs.writeFileSync('README.md', options.readme);
            console.error('created customOrg file ' + process.cwd() + '/README.md\n');
            // re-build package.json
            options.packageJson.description = options.readme.split('\n')[2].trim();
            local.fs.writeFileSync(
                'package.json',
                local.jsonStringifyOrdered(options.packageJson, null, 4) + '\n'
            );
            onParallel();
        };

        local.buildLib = function (options, onError) {
        /*
         * this function will build the lib
         */
            local.objectSetDefault(options, {
                customize: local.nop,
                dataFrom: local.tryCatchReadFile(
                    'lib.' + local.env.npm_package_nameAlias + '.js',
                    'utf8'
                ),
                dataTo: local.templateRenderJslintLite(
                    local.assetsDict['/assets.lib.template.js'],
                    {}
                )
            });
            // search-and-replace - customize dataTo
            [
                // customize body before istanbul instrument in package
                (/[\S\s]*?^\/\* istanbul instrument in package /m),
                // customize body after use strict
                (/\n {4}'use strict';\n[\S\s]*?\n\n\n\n/),
                // customize body after init exports
                (/\n {12}module.exports.module = module;\n[\S\s]*?$/)
            ].forEach(function (rgx) {
                // handle large string-replace
                options.dataFrom.replace(rgx, function (match0) {
                    options.dataTo.replace(rgx, function (match1) {
                        options.dataTo = options.dataTo.split(match1);
                        options.dataTo[0] += match0;
                        options.dataTo[0] += options.dataTo.splice(1, 1)[0];
                        options.dataTo = options.dataTo.join(match1);
                    });
                });
            });
            options.customize();
            // save lib.xxx.js
            local.fs.writeFileSync(
                'lib.' + local.env.npm_package_nameAlias + '.js',
                options.dataTo
            );
            onError();
        };

        local.buildReadme = function (options, onError) {
        /*
         * this function will build the readme in jslint-lite style
         */
            if (local.env.npm_package_buildCustomOrg && !options.modeForce) {
                onError();
                return;
            }
            local.objectSetDefault(options, {
                customize: local.nop,
                dataFrom: local.tryCatchReadFile('README.md', 'utf8')
                    // reset toc
                    .replace(
                        /\n# table of contents$[\S\s]*?\n\n\n\n/m,
                        '\n# table of contents\n\n\n\n'
                    )
            });
            // init package.json
            options.rgx = (/\n# package.json\n```json\n([\S\s]*?)\n```\n/);
            options.dataFrom.replace(options.rgx, function (match0, match1) {
                options.packageJson = JSON.parse(match1);
                options.packageJson.description = options.dataFrom.split('\n')[1];
                local.objectSetDefault(options.packageJson, {
                    nameAlias: options.packageJson.name.replace((/\W/g), '_'),
                    nameOriginal: options.packageJson.name
                });
                local.objectSetDefault(
                    options.packageJson,
                    JSON.parse(local.templateRenderJslintLite(
                        options.rgx.exec(local.assetsDict['/assets.readme.template.md'])[1],
                        options
                    )),
                    2
                );
                // avoid npm-installing self
                delete options.packageJson.devDependencies[options.packageJson.name];
                // save package.json
                local.fs.writeFileSync(
                    'package.json',
                    local.jsonStringifyOrdered(options.packageJson, null, 4) + '\n'
                );
                // render dataTo
                options.dataTo = local.templateRenderJslintLite(
                    local.assetsDict['/assets.readme.template.md'],
                    options
                );
                options.dataTo = options.dataTo.replace(
                    options.rgx,
                    match0.replace(
                        match1,
                        local.jsonStringifyOrdered(options.packageJson, null, 4)
                    )
                );
            });
            // init assets.swgg.swagger.json
            if (local.fs.existsSync('assets.swgg.swagger.json')) {
                local.fs.writeFileSync(
                    'assets.swgg.swagger.json',
                    local.fs.readFileSync('assets.swgg.swagger.json', 'utf8')
                        .replace((/(\n {8}"description": ").*?(".*\n)/), '$1' +
                            options.packageJson.description + '$2')
                        .replace((/(\n {8}"title": ").*?(".*\n)/), '$1' +
                            options.packageJson.name + '$2')
                        .replace((/(\n {8}"version": ").*?(".*\n)/), '$1' +
                            options.packageJson.version + '$2')
                        .replace((/(\n {8}"x-homepage": ").*?(".*\n)/), '$1' +
                            options.packageJson.homepage + '$2')
                );
            }
            // search-and-replace - customize dataTo
            [
                // customize name and description
                (/.*?\n.*?\n/),
                // customize cdn-download
                (/\n# cdn download\n[\S\s]*?\n\n\n\n/),
                // customize demo
                (/\n# live demo\n[\S\s]*?\n\n\n\n/),
                // customize todo
                (/\n#### todo\n[\S\s]*?\n\n\n\n/),
                // customize quickstart-example-js
                (/\n {8}local\.global\.local = local;\n[^`]*?\n {4}\/\/ init-after\n/),
                new RegExp('\\n {8}local\\.testRunBrowser = function \\(event\\) \\{\\n' +
                    '[^`]*?^ {12}if \\(!event \\|\\| \\(event &&\\n', 'm'),
                (/\n {12}\/\/ custom-case\n[^`]*?\n {12}\}\n/),
                // customize quickstart-html-style
                (/\n<\/style>\\n\\\n<style>\\n\\\n[^`]*?\\n\\\n<\/style>\\n\\\n/),
                // customize quickstart-html-body
                (/\nutility2-comment -->(?:\\n\\\n){4}[^`]*?^<!-- utility2-comment\\n\\\n/m),
                // customize build script
                (/\n# internal build script\n[\S\s]*?^- build_ci\.sh\n/m),
                (/\nshBuildCiAfter\(\) \{\(set -e\n[^`]*?\n\)\}\n/),
                (/\nshBuildCiBefore\(\) \{\(set -e\n[^`]*?\n\)\}\n/)
            ].forEach(function (rgx) {
                // handle large string-replace
                options.dataFrom.replace(rgx, function (match0) {
                    options.dataTo.replace(rgx, function (match1) {
                        options.dataTo = options.dataTo.split(match1);
                        options.dataTo[0] += match0;
                        options.dataTo[0] += options.dataTo.splice(1, 1)[0];
                        options.dataTo = options.dataTo.join(match1);
                    });
                });
            });
            // customize swaggerdoc
            if (!local.assetsDict['/assets.swgg.swagger.json'] ||
                    (/\bswggUiContainer\b/).exec(local.assetsDict['/index.html'])) {
                options.dataTo = options.dataTo.replace(
                    (/\n#### swaggerdoc\n[\S\s]*?\n#### /),
                    '\n#### '
                );
            }
            // customize comment
            options.dataFrom.replace(
                (/^( *?)(?:#!\! |#\/\/ |\/\/!\! )(.*?)$/gm),
                function (match0, match1, match2) {
                    options.dataTo = options.dataTo.replace(match1 + match2, match0);
                }
            );
            options.customize();
            // customize shDeployCustom
            if (options.dataFrom.indexOf('shDeployCustom') >= 0) {
                [
                    // customize test-server
                    (/\n\| git-branch : \|[\S\s]*?\n\| test-report : \|/),
                    // customize quickstart
                    (/\n#### changelog [\S\s]*\n# quickstart example.js\n/),
                    options.dataFrom.indexOf('"assets.index.default.template.html"') < 0 &&
                        (/\n# quickstart [\S\s]*?\n# extra screenshots\n/)
                ].forEach(function (rgx) {
                    options.dataFrom.replace(rgx, function (match0) {
                        options.dataTo = options.dataTo.replace(rgx, match0);
                    });
                });
                // customize screenshot
                options.dataTo = options.dataTo.replace(new RegExp('^1\\. .*?screenshot\\.' +
                    '(?:deployGithub|deployHeroku|npmTest|testExampleJs|testExampleSh)' +
                    '.*?\\.png[\\S\\s]*?\\n\\n', 'gm'), '');
            }
            // customize assets.index.template.html
            if (local.assetsDict['/assets.index.template.html']
                    .indexOf('"assets.index.default.template.html"') < 0) {
                options.dataTo = options.dataTo.replace(
                    new RegExp('\\n {8}\\/\\* jslint-ignore-begin \\*\\/\\n' +
                        ' {8}local.assetsDict\\[\'\\/assets.index.template.html\'\\]' +
                        ' = \'\\\\\\n' +
                        '[\\S\\s]*?\\n {8}\\/\\* jslint-ignore-end \\*\\/\\n'),
                    '\n'
                );
            }
            // render dataTo - customizeAfter
            options.customizeAfter = true;
            options.dataTo = local.templateRenderJslintLite(options.dataTo, options);
            // customize toc
            options.toc = '\n# table of contents\n';
            options.dataTo.replace(/\n\n\n\n# (.*)/g, function (match0, match1) {
                // jslint-hack
                local.nop(match0);
                if (match1 === 'table of contents') {
                    return;
                }
                options.toc += '1. [' + match1 + '](#' + match1.toLowerCase()
                    .replace(/[^ \-0-9A-Z_a-z]/g, '').replace(/ /g, '-') + ')\n';
            });
            options.dataTo = options.dataTo.replace('\n# table of contents\n', options.toc);
            // customize screenshot
            options.dataTo = options.dataTo.replace(
                (/\n.*?!\[screenshot\].*?\n([\S\s]+?(\n.*?!\[screenshot\].*?\n))/),
                function (match0, match1, match2) {
                    // jslint-hack
                    local.nop(match0);
                    return match2 + match1;
                }
            );
            // normalize whitespace
            options.dataTo = options.dataTo
                .replace((/\n{5,}/g), '\n\n\n\n')
                .replace((/(\S)\n{3}(\S)/g), '$1\n\n$2');
            // save README.md
            local.fs.writeFileSync('README.md', options.dataTo);
            onError();
        };

        local.buildTest = function (options, onError) {
        /*
         * this function will build the test
         */
            local.objectSetDefault(options, {
                customize: local.nop,
                dataFrom: local.tryCatchReadFile('test.js', 'utf8'),
                dataTo: local.templateRenderJslintLite(
                    local.assetsDict['/assets.test.template.js'],
                    {}
                )
            });
            // search-and-replace - customize dataTo
            [
                // customize js\-env code
                new RegExp('\\n {4}\\/\\/ run shared js\\-env code - init-before\\n' +
                    '[\\S\\s]*?^ {4}\\(function \\(\\) \\{\\n', 'm'),
                (/\n {8}local.global.local = local;\n[\S\s]*?^ {4}\}\(\)\);\n/m),
                (/\n {4}\/\/ run shared js\-env code - function\n[\S\s]*?\n {4}\}\(\)\);\n/),
                (/\n {4}\/\/ run browser js\-env code - function\n[\S\s]*?\n {8}break;\n/),
                (/\n {4}\/\/ run node js\-env code - function\n[\S\s]*?\n {8}break;\n/),
                (/\n {4}\/\/ run shared js\-env code - init-after\n[\S\s]*?\n {4}\}\(\)\);\n/),
                new RegExp('\\n {4}\\/\\/ run browser js\\-env code - init-after\\n' +
                    '[\\S\\s]*?\n {8}local.testCase_browser_nullCase = '),
                new RegExp('\\n {4}\\/\\/ run node js\\-env code - init-after\\n' +
                    '[\\S\\s]*?\n {8}local.testCase_buildApidoc_default = ')
            ].forEach(function (rgx) {
                // handle large string-replace
                options.dataFrom.replace(rgx, function (match0) {
                    options.dataTo.replace(rgx, function (match1) {
                        options.dataTo = options.dataTo.split(match1);
                        options.dataTo[0] += match0;
                        options.dataTo[0] += options.dataTo.splice(1, 1)[0];
                        options.dataTo = options.dataTo.join(match1);
                    });
                });
            });
            // customize require('utility2')
            [
                './assets.utility2.rollup.js',
                './lib.utility2.js'
            ].forEach(function (file) {
                if (local.fs.existsSync(file)) {
                    options.dataTo = options.dataTo.replace(
                        "require('utility2')",
                        "require('" + file + "')"
                    );
                }
            });
            options.customize();
            // save test.js
            local.fs.writeFileSync('test.js', options.dataTo);
            onError();
        };

        local.childProcessSpawnWithTimeout = function () {
        /*
         * this function will run like child_process.spawn,
         * but with auto-timeout after timeout milliseconds
         * example usage:
            var child = local.childProcessSpawnWithTimeout(
                '/bin/sh',
                ['-c', 'echo hello world'],
                {
                    stdio: ['ignore', 1, 2],
                    // timeout in ms
                    timeout: 5000
                }
            );
            child.on('error', console.error);
            child.on('exit', function (exitCode) {
                console.error('exitCode ' + exitCode);
            });
         */
            var argList, child, child_process, timerTimeout;
            argList = arguments;
            child_process = require('child_process');
            // spawn child
            child = child_process.spawn.apply(child_process, argList)
                .on('exit', function () {
                    // cleanup timerTimeout
                    try {
                        process.kill(timerTimeout.pid);
                    } catch (ignore) {
                    }
                });
            // init timerTimeout
            timerTimeout = child_process.spawn('sleep ' +
                // convert timeout to integer seconds with 2 second delay
                ((0.001 * (Number(argList[2] && argList[2].timeout) ||
                Number(local.timeoutDefault)) + 2) | 0) +
                '; kill -9 ' + child.pid + ' 2>/dev/null', { shell: true, stdio: 'ignore' });
            return child;
        };

        local.cookieDict = function () {
        /*
         * this function will return a dict of all cookies
         */
            var result;
            result = {};
            document.cookie.replace((/(\w+)=([^;]*)/g), function (match0, match1, match2) {
                // jslint-hack
                local.nop(match0);
                result[match1] = match2;
            });
            return result;
        };

        local.cookieRemove = function (name) {
        /*
         * this function will remove the cookie with the given name
         */
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        };

        local.cookieRemoveAll = function () {
        /*
         * this function will remove all cookies
         */
            document.cookie.replace((/(\w+)=/g), function (match0, match1) {
                // jslint-hack
                local.nop(match0);
                document.cookie = match1 + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            });
        };

        local.cookieSet = function (name, value, expiresOffset) {
        /*
         * this function will set the cookie with the given name, value,
         * and expiresOffset (in ms)
         */
            var tmp;
            tmp = name + '=' + value + '; expires=' +
                new Date(Date.now() + expiresOffset).toUTCString();
            document.cookie = tmp;
            return tmp;
        };

        local.dbTableCustomOrgCreate = function (options, onError) {
        /*
         * this function will create a persistent dbTableCustomOrg
         */
            options = local.objectSetDefault(options, { customOrg: local.env.GITHUB_ORG });
            options = local.objectSetDefault(options, {
                name: 'CustomOrg.' + options.customOrg,
                sizeLimit: 1000,
                sortDefault: [{
                    fieldName: '_id'
                }, {
                    fieldName: 'buildStartedAt'
                }, {
                    fieldName: 'buildState'
                }, {
                    fieldName: 'active'
                }]
            });
            local.dbTableCustomOrg = local.db.dbTableCreateOne(options, onError);
            return local.dbTableCustomOrg;
        };

        local.dbTableCustomOrgCrudGetManyByQuery = function (options) {
        /*
         * this function will query dbTableCustomOrg
         */
            options = local.objectSetDefault(options, {
                customOrg: local.env.GITHUB_ORG,
                query: { buildStartedAt: { $not: { $gt: new Date(Date.now() - (
                    Number(options && options.olderThanLast) || 0
                )).toISOString() } } }
            }, 2);
            console.error('dbTableCustomOrgCrudGetManyByQuery - ' + JSON.stringify(options));
            return local.dbTableCustomOrgCreate().crudGetManyByQuery(options);
        };

        local.dbTableCustomOrgUpdate = function (options, onError) {
        /*
         * this function will update dbTableCustomOrg with active, public repos
         */
            var count, dbRowList, self;
            options = local.objectSetDefault(options, { customOrg: local.env.GITHUB_ORG });
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    self = local.dbTableCustomOrg =
                        local.dbTableCustomOrgCreate(options, options.onNext);
                    break;
                case 2:
                    self = local.dbTableCustomOrg = data;
                    data = {
                        headers: {
                            'Travis-API-Version': '3',
                            Authorization: 'token ' + local.env.TRAVIS_ACCESS_TOKEN
                        },
                        url: 'https://api.travis-ci.org/repos?limit=1'
                    };
                    console.error('fetching ' + data.url + ' ...');
                    local.ajax(data, options.onNext);
                    break;
                case 3:
                    count = JSON.parse(data.responseText)['@pagination'].count;
                    console.error('... fetched ' + data.url + ' with ' + count + ' repos');
                    dbRowList = [];
                    local.onParallelList({
                        list: [{
                            offset: 0,
                            sort_by: 'asc'
                        }, {
                            offset: 100,
                            sort_by: 'asc'
                        }, {
                            offset: 200,
                            sort_by: 'asc'
                        }, {
                            offset: 300,
                            sort_by: 'asc'
                        }, {
                            offset: 400,
                            sort_by: 'asc'
                        }, {
                            offset: Math.floor(Math.random() * count) - 100,
                            sort_by: 'asc'
                        }, {
                            offset: Math.floor(Math.random() * count) - 100,
                            sort_by: 'asc'
                        }, {
                            offset: 0,
                            sort_by: 'desc'
                        }, {
                            offset: count - 500,
                            sort_by: 'desc'
                        }, {
                            offset: count - 400,
                            sort_by: 'desc'
                        }, {
                            offset: count - 300,
                            sort_by: 'desc'
                        }, {
                            offset: count - 200,
                            sort_by: 'desc'
                        }, {
                            offset: count - 100,
                            sort_by: 'desc'
                        }]
                    }, function (options2, onParallel) {
                        onParallel.counter += 1;
                        options2 = {
                            headers: {
                                'Travis-API-Version': '3',
                                Authorization: 'token ' + local.env.TRAVIS_ACCESS_TOKEN
                            },
                            url: 'https://api.travis-ci.org/repos?' +
                                'include=repository.current_build&' +
                                'limit=100&' +
                                'offset=' + options2.element.offset + '&' +
                                'sort_by=current_build%3A' + options2.element.sort_by
                        };
                        console.error('fetching ' + options2.url + ' ...');
                        local.ajax(options2, function (error, data) {
                            // validate no error occurred
                            local.assert(!error, error);
                            dbRowList = dbRowList
                                .concat(JSON.parse(data.responseText).repositories);
                            console.error('... fetched ' + options2.url);
                            onParallel();
                        });
                    }, options.onNext);
                    break;
                case 4:
                    self.crudRemoveManyByQuery({});
                    self.crudSetManyById(dbRowList
                        .filter(function (dbRow) {
                            return dbRow.private === false && dbRow.slug.indexOf(
                                options.customOrg + '/node-' + options.customOrg + '-'
                            ) === 0;
                        })
                        .map(function (dbRow) {
                            data = dbRow.current_build || {};
                            return {
                                _id: dbRow.name.replace('node-' + options.customOrg + '-', ''),
                                active: dbRow.active,
                                buildDuration: data.duration,
                                buildFinishedAt: data.finished_at,
                                buildStartedAt: data.started_at,
                                buildState: data.state
                            };
                        }));
                    self.save(options.onNext);
                    break;
                default:
                    local.setTimeoutOnError(onError, error, self);
                }
            });
            options.modeNext = 0;
            options.onNext();
            return self;
        };

        local.domFragmentRender = function (template, dict) {
        /*
         * this function will return a dom-fragment rendered from the givent template and dict
         */
            var tmp;
            tmp = document.createElement('template');
            tmp.innerHTML = local.templateRender(template, dict);
            return tmp.content;
        };

        local.echo = function (arg) {
        /*
         * this function will return the arg
         */
            return arg;
        };

        local.envKeyIsSensitive = function (key) {
        /*
         * this function will try to determine if the env-key is sensitive
         */
            return (/(?:\b|_)(?:crypt|decrypt|key|pass|private|secret|token)/)
                .test(key.toLowerCase()) ||
                (/Crypt|Decrypt|Key|Pass|Private|Secret|Token/).test(key);
        };

        local.envSanitize = function (env) {
        /*
         * this function will return a sanitized copy of the env object,
         * with sensitive env-vars removed
         */
            var result;
            result = {};
            Object.keys(env).forEach(function (key) {
                if (!local.envKeyIsSensitive(key) &&
                        typeof env[key] === 'string' &&
                        env[key].length <= 4096) {
                    result[key] = env[key];
                }
            });
            return result;
        };

        local.errorMessagePrepend = function (error, message) {
        /*
         * this function will prepend the message to error.message and error.stack
         */
            error.message = message + error.message;
            error.stack = message + error.stack;
            return error;
        };

        local.exit = function (exitCode) {
        /*
         * this function will exit the current process with the given exitCode
         */
            local.onErrorDefault(typeof exitCode !== 'number' && exitCode);
            exitCode = !exitCode || Number(exitCode) === 0
                ? 0
                : Number(exitCode) || 1;
            switch (local.modeJs) {
            case 'browser':
                console.error(local.global.fileElectronHtml + ' global_test_results ' +
                    JSON.stringify({ global_test_results: local.global.global_test_results }));
                break;
            case 'node':
                process.exit(exitCode);
                break;
            }
            // reset modeTest
            local.modeTest = null;
        };

        local.fsRmrSync = function (dir) {
        /*
         * this function will synchronously 'rm -fr' the dir
         */
            local.child_process.execFileSync(
                'rm',
                ['-fr', local.path.resolve(process.cwd(), dir)],
                { stdio: ['ignore', 2, 2] }
            );
        };

        local.fsWriteFileWithMkdirpSync = function (file, data) {
        /*
         * this function will synchronously 'mkdir -p' and write the data to file
         */
            // try to write to file
            try {
                require('fs').writeFileSync(file, data);
            } catch (errorCaught) {
                // mkdir -p
                require('child_process').spawnSync(
                    'mkdir',
                    ['-p', require('path').dirname(file)],
                    { stdio: ['ignore', 1, 2] }
                );
                // re-write to file
                require('fs').writeFileSync(file, data);
            }
        };

        local.githubCorsUrlOverride = function (url, hostOverride, rgxHostOverride, location) {
        /*
         * this function will return hostOverride over location.host,
         * if this app is hosted on github.io
         */
            location = location || (typeof window === 'object' && window && window.location);
            if (!(hostOverride && location && (local.githubCorsHostTest ||
                    (/\bgithub.com$|\bgithub.io$/).test(location.host)))) {
                return url;
            }
            // init github-branch
            location.pathname.replace(
                (/\/build\.\.(alpha|beta|master)\.\.travis-ci\.org\//),
                function (match0, match1) {
                    // jslint-hack
                    match0 = match1;
                    hostOverride = hostOverride.replace('-alpha.', '-' + match0 + '.');
                }
            );
            return url.replace(rgxHostOverride || (/.*()/), hostOverride + '$1');
        };

        local.httpRequest = function (options, onError) {
        /*
         * this function will request the data from options.url
         */
            var chunkList,
                isDone,
                onError2,
                timerTimeout,
                request,
                response,
                timeStart,
                urlParsed;
            // init onError2
            onError2 = function (error) {
                if (isDone) {
                    return;
                }
                isDone = true;
                // debug httpResponse
                local.serverLog({
                    type: 'httpResponse',
                    time: new Date(timeStart).toISOString(),
                    method: options.method,
                    url: options.url,
                    statusCode: local.normalizeValue('number', response && response.statusCode),
                    duration: Date.now() - timeStart
                });
                // cleanup timerTimeout
                clearTimeout(timerTimeout);
                // cleanup request and response
                [request, response].forEach(function (stream) {
                    // try to end the stream
                    try {
                        stream.end();
                    // else try to destroy the stream
                    } catch (errorCaught) {
                        try {
                            stream.destroy();
                        } catch (ignore) {
                        }
                    }
                });
                onError(error, response);
            };
            // init timerTimeout
            timerTimeout = setTimeout(function () {
                onError2(new Error('http-request timeout'));
            }, options.timeout || 30000);
            urlParsed = require('url').parse(options.url);
            urlParsed.headers = options.headers;
            urlParsed.method = options.method;
            // debug request
            timeStart = Date.now();
            request = require(
                urlParsed.protocol.slice(0, -1)
            ).request(urlParsed, function (_response) {
                response = _response;
                if (response.statusCode < 200 || response.statusCode > 299) {
                    onError2(new Error(response.statusCode));
                    return;
                }
                chunkList = [];
                response
                    .on('data', function (chunk) {
                        chunkList.push(chunk);
                    })
                    .on('end', function () {
                        response.data = Buffer.concat(chunkList);
                        onError2();
                    })
                    .on('error', onError2);
            }).on('error', onError2);
            request.end(options.data);
        };

        local.isNullOrUndefined = function (arg) {
        /*
         * this function will test if the arg is null or undefined
         */
            return arg === null || arg === undefined;
        };

        local.jslintAndPrintConditional = function (script, file, mode) {
        /*
         * this function will jslint / csslint the script and print any errors to stderr,
         * conditionally
         */
            // cleanup errors
            local.jslint.errorCounter = 0;
            local.jslint.errorText = '';
            // optimization - ignore uglified/rollup files
            if (!script || script.length >= 0x100000) {
                return script;
            }
            switch ((/\.\w+$/).exec(file) && (/\.\w+$/).exec(file)[0]) {
            case '.css':
                if (script.indexOf('/*csslint') >= 0 || mode === 'force') {
                    local.jslintAndPrint(script, file);
                }
                break;
            case '.html':
                // csslint <style> tag
                script.replace(
                    (/<style>([\S\s]+?)<\/style>/g),
                    function (match0, match1, ii, text) {
                        // jslint-hack
                        local.nop(match0);
                        // preserve lineno
                        match1 = text.slice(0, ii).replace((/.+/g), '') + match1;
                        local.jslintAndPrintConditional(match1, file + '.css', mode);
                    }
                );
                // jslint <script> tag
                script.replace(
                    (/<script>([\S\s]+?)<\/script>/g),
                    function (match0, match1, ii, text) {
                        // jslint-hack
                        local.nop(match0);
                        // preserve lineno
                        match1 = text.slice(0, ii).replace((/.+/g), '') + match1;
                        local.jslintAndPrintConditional(match1, file + '.js', mode);
                    }
                );
                break;
            case '.js':
                if ((script.indexOf('/*jslint') >= 0 &&
                        !local.global.__coverage__) || mode === 'force') {
                    local.jslintAndPrint(script, file);
                }
                break;
            }
            return script;
        };

        local.jsonCopy = function (arg) {
        /*
         * this function will return a deep-copy of the JSON-arg
         */
            return arg === undefined
                ? undefined
                : JSON.parse(JSON.stringify(arg));
        };

        local.jsonStringifyOrdered = function (element, replacer, space) {
        /*
         * this function will JSON.stringify the element,
         * with object-keys sorted and circular-references removed
         */
            var circularList, stringify, tmp;
            stringify = function (element) {
            /*
             * this function will recursively JSON.stringify the element,
             * with object-keys sorted and circular-references removed
             */
                // if element is an object, then recurse its items with object-keys sorted
                if (element &&
                        typeof element === 'object' &&
                        typeof element.toJSON !== 'function') {
                    // ignore circular-reference
                    if (circularList.indexOf(element) >= 0) {
                        return;
                    }
                    circularList.push(element);
                    // if element is an array, then recurse its elements
                    if (Array.isArray(element)) {
                        return '[' + element.map(function (element) {
                            // recurse
                            tmp = stringify(element);
                            return typeof tmp === 'string'
                                ? tmp
                                : 'null';
                        }).join(',') + ']';
                    }
                    return '{' + Object.keys(element)
                        // sort object-keys
                        .sort()
                        .map(function (key) {
                            // recurse
                            tmp = stringify(element[key]);
                            if (typeof tmp === 'string') {
                                return JSON.stringify(key) + ':' + tmp;
                            }
                        })
                        .filter(function (element) {
                            return typeof element === 'string';
                        })
                        .join(',') + '}';
                }
                // else JSON.stringify as normal
                return JSON.stringify(element);
            };
            circularList = [];
            return JSON.stringify(element && typeof element === 'object'
                // recurse
                ? JSON.parse(stringify(element))
                : element, replacer, space);
        };

        local.jwtA256GcmDecrypt = function (token, key) {
        /*
         * https://tools.ietf.org/html/rfc7516
         * this function will use json-web-encryption to
         * aes-256-gcm-decrypt the token with the given base64url-encoded key
         */
            return local.tryCatchOnError(function () {
                token = token
                    .replace((/-/g), '+')
                    .replace((/_/g), '/')
                    .split('.');
                token = local.sjcl.decrypt(local.sjcl.codec.base64url.toBits(
                    local.jwtAes256KeyInit(key)
                ), JSON.stringify({
                    adata: token[4],
                    ct: token[3],
                    iv: token[2],
                    ks: 256,
                    mode: 'gcm'
                }));
                return local.jwtHs256Decode(token, key);
            }, local.nop) || {};
        };

        local.jwtA256GcmEncrypt = function (data, key) {
        /*
         * https://tools.ietf.org/html/rfc7516
         * this function will use json-web-encryption to
         * aes-256-gcm-encrypt the data with the given base64url-encoded key
         */
            var adata;
            adata = local.jwtAes256KeyCreate();
            data = local.jwtHs256Encode(data, key);
            data = JSON.parse(local.sjcl.encrypt(
                local.sjcl.codec.base64url.toBits(local.jwtAes256KeyInit(key)),
                data,
                { adata: local.sjcl.codec.base64url.toBits(adata), ks: 256, mode: 'gcm' }
            ));
            return local.jwtBase64UrlNormalize('eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4R0NNIn0..' +
                data.iv + '.' + data.ct + '.' + adata);
        };

        local.jwtAes256KeyCreate = function () {
        /*
         * this function will create a random, aes-256-base64url-jwt-key
         */
            return local.jwtBase64UrlNormalize(
                local.base64FromBuffer(local.bufferRandomBytes(32))
            );
        };

        local.jwtAes256KeyInit = function (key) {
        /*
         * https://jwt.io/
         * this function will init the aes-256-base64url-jwt-key
         */
            // init npm_config_jwtAes256Key
            local.env.npm_config_jwtAes256Key = local.env.npm_config_jwtAes256Key ||
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
            return key || local.env.npm_config_jwtAes256Key;
        };

        local.jwtBase64UrlNormalize = function (text) {
        /*
         * this function will normlize the text to base64url format
         */
            return text
                .replace((/\=/g), '')
                .replace((/\+/g), '-')
                .replace((/\//g), '_');
        };

        local.jwtHs256Decode = function (token, key) {
        /*
         * https://jwt.io/
         * this function will decode the json-web-token with the given base64-encode key
         */
            var timeNow;
            timeNow = Date.now() / 1000;
            // try to decode the token
            return local.tryCatchOnError(function () {
                token = token.split('.');
                // validate header
                local.assert(token[0] === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', token);
                // validate signature
                local.assert(local.sjcl.codec.base64url.fromBits(
                    new local.sjcl.misc.hmac(local.sjcl.codec.base64url.toBits(
                        local.jwtAes256KeyInit(key)
                    )).encrypt(token[0] + '.' + token[1])
                ) === token[2]);
                // return decoded data
                token = JSON.parse(local.base64ToString(token[1]));
                // https://tools.ietf.org/html/rfc7519#section-4.1
                // validate jwt-registered-headers
                local.assert(!token.exp || token.exp >= timeNow);
                local.assert(!token.nbf || token.nbf <= timeNow);
                return token;
            }, local.nop) || {};
        };

        local.jwtHs256Encode = function (data, key) {
        /*
         * https://jwt.io/
         * this function will encode the data into a json-web-token
         * with the given base64-encode key
         */
            data = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                local.jwtBase64UrlNormalize(local.base64FromString(JSON.stringify(data)));
            return data + '.' + local.sjcl.codec.base64url.fromBits(
                new local.sjcl.misc.hmac(local.sjcl.codec.base64url.toBits(
                    local.jwtAes256KeyInit(key)
                )).encrypt(data)
            );
        };

        local.jwtNormalize = function (data) {
        /*
         * https://tools.ietf.org/html/rfc7519#section-4.1
         * this function will normalize the jwt-data with registered-headers
         */
            var timeNow;
            timeNow = Date.now() / 1000;
            return local.objectSetDefault(data, {
                exp: timeNow + 5 * 60,
                iat: timeNow,
                jti: Math.random().toString(16).slice(2),
                nbf: timeNow
            });
        };

        local.listGetElementRandom = function (list) {
        /*
         * this function will return a random element from the list
         */
            return list[Math.floor(list.length * Math.random())];
        };

        local.listShuffle = function (list) {
        /*
         * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
         * this function will inplace shuffle the list, via fisher-yates algorithm
         */
            var ii, random, swap;
            for (ii = list.length - 1; ii > 0; ii -= 1) {
                // coerce to finite integer
                random = (Math.random() * (ii + 1)) | 0;
                swap = list[ii];
                list[ii] = list[random];
                list[random] = swap;
            }
            return list;
        };

        local.middlewareAssetsCached = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will serve cached-assets
         */
            var options;
            options = {};
            local.onNext(options, function (error, data) {
                options.result = options.result || local.assetsDict[request.urlParsed.pathname];
                if (options.result === undefined) {
                    nextMiddleware(error);
                    return;
                }
                switch (options.modeNext) {
                case 1:
                    // skip gzip
                    if (response.headersSent ||
                            !(/\bgzip\b/).exec(request.headers['accept-encoding'])) {
                        options.modeNext += 1;
                        options.onNext();
                        return;
                    }
                    // gzip and cache result
                    local.taskCreateCached({
                        cacheDict: 'middlewareAssetsCachedGzip',
                        key: request.urlParsed.pathname
                    }, function (onError) {
                        local.zlib.gzip(options.result, function (error, data) {
                            onError(error, !error && data.toString('base64'));
                        });
                    }, options.onNext);
                    break;
                case 2:
                    // set gzip header
                    options.result = local.base64ToBuffer(data);
                    response.setHeader('Content-Encoding', 'gzip');
                    response.setHeader('Content-Length', options.result.length);
                    options.onNext();
                    break;
                case 3:
                    local.middlewareCacheControlLastModified(request, response, options.onNext);
                    break;
                case 4:
                    response.end(options.result);
                    break;
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.middlewareBodyRead = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will
         * read and save the request-body to request.bodyRaw
         */
            // jslint-hack
            local.nop(response);
            // if request is already read, then goto nextMiddleware
            if (!request.readable) {
                nextMiddleware();
                return;
            }
            local.streamReadAll(request, function (error, data) {
                request.bodyRaw = request.bodyRaw || data;
                nextMiddleware(error);
            });
        };

        local.middlewareCacheControlLastModified = function (
            request,
            response,
            nextMiddleware
        ) {
        /*
         * this function will run the middleware that will update the Last-Modified header
         */
            // do not cache if headers already sent or url has '?' search indicator
            if (!(response.headersSent || request.url.indexOf('?') >= 0)) {
                // init serverResponseHeaderLastModified
                local.serverResponseHeaderLastModified =
                    local.serverResponseHeaderLastModified ||
                    // resolve to 1000 ms
                    new Date(new Date(Math.floor(Date.now() / 1000) * 1000).toGMTString());
                // respond with 304 If-Modified-Since serverResponseHeaderLastModified
                if (new Date(request.headers['if-modified-since']) >=
                        local.serverResponseHeaderLastModified) {
                    response.statusCode = 304;
                    response.end();
                    return;
                }
                response.setHeader('Cache-Control', 'no-cache');
                response.setHeader(
                    'Last-Modified',
                    local.serverResponseHeaderLastModified.toGMTString()
                );
            }
            nextMiddleware();
        };

        local.middlewareError = function (error, request, response) {
        /*
         * this function will run the middleware that will handle errors
         */
            // if error occurred, then respond with '500 Internal Server Error',
            // else respond with '404 Not Found'
            local.serverRespondDefault(request, response, error
                ? (error.statusCode >= 400 && error.statusCode < 600
                    ? error.statusCode
                    : 500)
                : 404, error);
        };

        local.middlewareFileServer = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will serve files
         */
            if (request.method !== 'GET' || local.modeJs === 'browser') {
                nextMiddleware();
                return;
            }
            request.urlFile = (process.cwd() + request.urlParsed.pathname
                // security - disable parent directory lookup
                .replace((/.*\/\.\.\//g), '/'))
                // replace trailing '/' with '/index.html'
                .replace((/\/$/), '/index.html');
            // serve file from cache
            local.taskCreateCached({
                cacheDict: 'middlewareFileServer',
                key: request.urlFile
            // run background-task to re-cache file
            }, function (onError) {
                local.fs.readFile(request.urlFile, function (error, data) {
                    onError(error, data && local.base64FromBuffer(data));
                });
            }, function (error, data) {
                // default to nextMiddleware
                if (error) {
                    nextMiddleware();
                    return;
                }
                // init response-header content-type
                request.urlParsed.contentType = local.contentTypeDict[
                    (/\.[^\.]*$/).exec(request.urlParsed.pathname) &&
                        (/\.[^\.]*$/).exec(request.urlParsed.pathname)[0]
                ];
                local.serverRespondHeadSet(request, response, null, {
                    'Content-Type': request.urlParsed.contentType
                });
                // serve file from cache
                response.end(local.base64ToBuffer(data));
            });
        };

        local.middlewareForwardProxy = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will forward-proxy the request
         * to its destination-host
         */
            var onError, options, timerTimeout;
            // handle preflight-cors
            if (request.method === 'OPTIONS' &&
                    (/forward-proxy-url/)
                    .test(request.headers['access-control-request-headers'])) {
                local.serverRespondCors(request, response);
                response.end();
                return;
            }
            if (!request.headers['forward-proxy-url']) {
                nextMiddleware();
                return;
            }
            local.serverRespondCors(request, response);
            // init onError
            onError = function (error) {
                clearTimeout(timerTimeout);
                if (options.isDone) {
                    return;
                }
                options.isDone = true;
                // debug middlewareForwardProxy
                local.serverLog({
                    type: 'middlewareForwardProxy',
                    time: new Date(options.timeStart).toISOString(),
                    method: options.method,
                    url: options.url,
                    statusCode: local.normalizeValue('number', response.statusCode),
                    duration: Date.now() - options.timeStart,
                    // extra
                    headers: options.headers
                });
                if (!error) {
                    return;
                }
                // cleanup client
                local.streamListCleanup([options.clientRequest, options.clientResponse]);
                nextMiddleware(error);
            };
            // init options
            options = local.urlParse(request.headers['forward-proxy-url']);
            options.method = request.method;
            options.url = request.headers['forward-proxy-url'];
            // init timerTimeout
            timerTimeout = local.onTimeout(
                onError,
                local.timeoutDefault,
                'forward-proxy ' + options.method + ' ' + options.url
            );
            // parse headers
            options.headers = {};
            local.tryCatchOnError(function () {
                options.headers = JSON.parse(request.headers['forward-proxy-headers']);
            }, local.nop);
            // debug options
            local._debugForwardProxy = options;
            options.clientRequest = (options.protocol === 'https:'
                ? local.https
                : local.http).request(options, function (clientResponse) {
                options.clientResponse = clientResponse.on('error', onError);
                response.statusCode = options.clientResponse.statusCode;
                // pipe clientResponse to serverResponse
                options.clientResponse.pipe(response);
            }).on('error', onError);
            options.timeStart = Date.now();
            // init event-handling
            request.on('error', onError);
            response.on('finish', onError).on('error', onError);
            // pipe serverRequest to clientRequest
            request.pipe(options.clientRequest);
        };

        local.middlewareInit = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will init the request and response
         */
            // debug server-request
            local._debugServerRequest = request;
            // debug server-response
            local._debugServerResponse = response;
            // init timerTimeout
            local.serverRespondTimeoutDefault(request, response, local.timeoutDefault);
            // init request.urlParsed
            request.urlParsed = local.urlParse(request.url);
            // init response-header content-type
            request.urlParsed.contentType = local.contentTypeDict[
                (/\.[^\.]*$/).exec(request.urlParsed.pathname) &&
                    (/\.[^\.]*$/).exec(request.urlParsed.pathname)[0]
            ];
            local.serverRespondHeadSet(request, response, null, {
                'Content-Type': request.urlParsed.contentType
            });
            // set main-page content-type to text/html
            if (request.urlParsed.pathname === '/') {
                local.serverRespondHeadSet(request, response, null, {
                    'Content-Type': 'text/html; charset=UTF-8'
                });
            }
            // init response.end and response.write to accept Uint8Array instance
            ['end', 'write'].forEach(function (key) {
                response['_' + key] = response['_' + key] || response[key];
                response[key] = function () {
                    var args;
                    args = Array.from(arguments);
                    args[0] = local.bufferToNodeBuffer(args[0]);
                    response['_' + key].apply(response, args);
                };
            });
            // default to nextMiddleware
            nextMiddleware();
        };

        local.middlewareJsonpStateInit = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will
         * serve the browser-state wrapped in the given jsonp-callback
         */
            var state;
            if (!(request.stateInit || (request.urlParsed &&
                    request.urlParsed.pathname === '/jsonp.utility2.stateInit'))) {
                nextMiddleware();
                return;
            }
            state = { utility2: {
                assetsDict: {
                    '/assets.index.css': local.assetsDict['/assets.index.css'],
                    '/assets.index.template.html':
                        local.assetsDict['/assets.index.template.html'],
                    '/assets.swgg.swagger.json': local.assetsDict['/assets.swgg.swagger.json']
                },
                env: {
                    NODE_ENV: local.env.NODE_ENV,
                    npm_config_mode_backend: local.env.npm_config_mode_backend,
                    npm_package_description: local.env.npm_package_description,
                    npm_package_homepage: local.env.npm_package_homepage,
                    npm_package_name: local.env.npm_package_name,
                    npm_package_nameAlias: local.env.npm_package_nameAlias,
                    npm_package_version: local.env.npm_package_version
                }
            } };
            if (request.stateInit) {
                return state;
            }
            response.end(request.urlParsed.query.callback + '(' + JSON.stringify(state) + ');');
        };

        local.moduleDirname = function (module, modulePathList) {
        /*
         * this function will search modulePathList for the module's __dirname
         */
            var result, tmp;
            // search process.cwd()
            if (!module || module === '.' || module.indexOf('/') >= 0) {
                return require('path').resolve(process.cwd(), module || '');
            }
            // search modulePathList
            ['node_modules']
                .concat(modulePathList)
                .concat(require('module').globalPaths)
                .concat([process.env.HOME + '/node_modules', '/usr/local/lib/node_modules'])
                .some(function (modulePath) {
                    try {
                        tmp = require('path').resolve(process.cwd(), modulePath + '/' + module);
                        result = require('fs').statSync(tmp).isDirectory() && tmp;
                        return result;
                    } catch (ignore) {
                    }
                });
            return result || '';
        };

        local.normalizeValue = function (type, value, valueDefault) {
        /*
         * this function will normalize the value by type
         */
            switch (type) {
            case 'dict':
                return value && typeof value === 'object' && !Array.isArray(value)
                    ? value
                    : valueDefault || {};
            case 'list':
                return Array.isArray(value)
                    ? value
                    : valueDefault || [];
            case 'number':
                return Number(value) || valueDefault || 0;
            case 'string':
                return typeof value === 'string'
                    ? value
                    : valueDefault || '';
            }
        };

        local.objectGetElementFirst = function (arg) {
        /*
         * this function will get the first element of the arg
         */
            var item;
            item = {};
            item.key = Object.keys(arg)[0];
            item.value = arg[item.key];
            return item;
        };

        local.objectKeysTypeof = function (arg) {
        /*
         * this function will return a list of the arg's keys, sorted by item-type
         */
            return Object.keys(arg).map(function (key) {
                return typeof arg[key] + ' ' + key;
            }).sort().join('\n');
        };

        local.objectLiteralize = function (arg) {
        /*
         * this function will traverse arg, and replace every encounter of the magical key '$[]'
         * with its object literal [key, value]
         */
            local.objectTraverse(arg, function (element) {
                if (element && typeof element === 'object' && !Array.isArray(element)) {
                    Object.keys(element).forEach(function (key) {
                        if (key.indexOf('$[]') === 0) {
                            element[element[key][0]] = element[key][1];
                            delete element[key];
                        }
                    });
                }
            });
            return arg;
        };

        local.objectSetDefault = function (arg, defaults, depth) {
        /*
         * this function will recursively set defaults for undefined-items in the arg
         */
            arg = arg || {};
            defaults = defaults || {};
            Object.keys(defaults).forEach(function (key) {
                var arg2, defaults2;
                arg2 = arg[key];
                // handle misbehaving getter
                try {
                    defaults2 = defaults[key];
                } catch (ignore) {
                }
                if (defaults2 === undefined) {
                    return;
                }
                // init arg[key] to default value defaults[key]
                if (!arg2) {
                    arg[key] = defaults2;
                    return;
                }
                // if arg2 and defaults2 are both non-null and non-array objects,
                // then recurse with arg2 and defaults2
                if (depth > 1 &&
                        // arg2 is a non-null and non-array object
                        arg2 &&
                        typeof arg2 === 'object' &&
                        !Array.isArray(arg2) &&
                        // defaults2 is a non-null and non-array object
                        defaults2 &&
                        typeof defaults2 === 'object' &&
                        !Array.isArray(defaults2)) {
                    // recurse
                    local.objectSetDefault(arg2, defaults2, depth - 1);
                }
            });
            return arg;
        };

        local.objectSetOverride = function (arg, overrides, depth, env) {
        /*
         * this function will recursively set overrides for items in the arg
         */
            arg = arg || {};
            env = env || (typeof process === 'object' && process.env) || {};
            overrides = overrides || {};
            Object.keys(overrides).forEach(function (key) {
                var arg2, overrides2;
                arg2 = arg[key];
                overrides2 = overrides[key];
                if (overrides2 === undefined) {
                    return;
                }
                // if both arg2 and overrides2 are non-null and non-array objects,
                // then recurse with arg2 and overrides2
                if (depth > 1 &&
                        // arg2 is a non-null and non-array object
                        (arg2 &&
                        typeof arg2 === 'object' &&
                        !Array.isArray(arg2)) &&
                        // overrides2 is a non-null and non-array object
                        (overrides2 &&
                        typeof overrides2 === 'object' &&
                        !Array.isArray(overrides2))) {
                    local.objectSetOverride(arg2, overrides2, depth - 1, env);
                    return;
                }
                // else set arg[key] with overrides[key]
                arg[key] = arg === env
                    // if arg is env, then overrides falsey value with empty string
                    ? overrides2 || ''
                    : overrides2;
            });
            return arg;
        };

        local.objectTraverse = function (arg, onSelf, circularList) {
        /*
         * this function will recursively traverse the arg,
         * and run onSelf with the arg's properties
         */
            onSelf(arg);
            circularList = circularList || [];
            if (arg &&
                    typeof arg === 'object' &&
                    circularList.indexOf(arg) < 0) {
                circularList.push(arg);
                Object.keys(arg).forEach(function (key) {
                    // recurse with arg[key]
                    local.objectTraverse(arg[key], onSelf, circularList);
                });
            }
            return arg;
        };

        local.onErrorDefault = function (error) {
        /*
         * this function will if error exists, then print error.stack to stderr
         */
            if (error && !local.global.__coverage__) {
                console.error(error);
            }
        };

        local.onErrorThrow = function (error) {
        /*
         * this function will assert no error occurred
         */
            if (error) {
                throw error;
            }
        };

        local.onErrorWithStack = function (onError) {
        /*
         * this function will create a new callback that will call onError,
         * and append the current stack to any error
         */
            var stack;
            stack = new Error().stack.replace((/(.*?)\n.*?$/m), '$1');
            return function (error, data, meta) {
                if (error &&
                        error !== local.errorDefault &&
                        String(error.stack).indexOf(stack.split('\n')[2]) < 0) {
                    // append the current stack to error.stack
                    error.stack += '\n' + stack;
                }
                onError(error, data, meta);
            };
        };

        local.onFileModifiedRestart = function (file) {
        /*
         * this function will watch the file, and if modified, then restart the process
         */
            if (local.env.npm_config_mode_auto_restart &&
                    local.fs.existsSync(file) &&
                    local.fs.statSync(file).isFile()) {
                local.fs.watchFile(file, {
                    interval: 1000,
                    persistent: false
                }, function (stat2, stat1) {
                    if (stat2.mtime > stat1.mtime) {
                        console.error('file modified - ' + file);
                        local.exit(77);
                    }
                });
            }
        };

        local.onNext = function (options, onError) {
        /*
         * this function will wrap onError inside the recursive function options.onNext,
         * and append the current stack to any error
         */
            options.onNext = local.onErrorWithStack(function (error, data, meta) {
                try {
                    options.modeNext = error && !options.modeErrorIgnore
                        ? Infinity
                        : options.modeNext + 1;
                    onError(error, data, meta);
                } catch (errorCaught) {
                    // throw errorCaught to break infinite recursion-loop
                    if (options.errorCaught) {
                        throw options.errorCaught;
                    }
                    options.errorCaught = errorCaught;
                    options.onNext(errorCaught, data, meta);
                }
            });
            return options;
        };

        local.onParallel = function (onError, onEach, onRetry) {
        /*
         * this function will create a function that will
         * 1. run async tasks in parallel
         * 2. if counter === 0 or error occurred, then call onError with error
         */
            var onParallel;
            onError = local.onErrorWithStack(onError);
            onEach = onEach || local.nop;
            onRetry = onRetry || local.nop;
            onParallel = function (error, data) {
                if (onRetry(error, data)) {
                    return;
                }
                // decrement counter
                onParallel.counter -= 1;
                // validate counter
                console.assert(onParallel.counter >= 0 || error || onParallel.error);
                // ensure onError is run only once
                if (onParallel.counter < 0) {
                    return;
                }
                // handle error
                if (error) {
                    onParallel.error = error;
                    // ensure counter <= 0
                    onParallel.counter = -Math.abs(onParallel.counter);
                }
                // call onError when isDone
                if (onParallel.counter <= 0) {
                    onError(error, data);
                    return;
                }
                onEach();
            };
            // init counter
            onParallel.counter = 0;
            // return callback
            return onParallel;
        };

        local.onParallelList = function (options, onEach, onError) {
        /*
         * this function will
         * 1. async-run onEach in parallel,
         *    with the given options.rateLimit and options.retryLimit
         * 2. call onError when isDone
         */
            var ii, onEach2, onParallel;
            options.list = options.list || [];
            onEach2 = function () {
                while (ii + 1 < options.list.length &&
                        onParallel.counter < options.rateLimit + 1) {
                    ii += 1;
                    onParallel.ii += 1;
                    onParallel.remaining -= 1;
                    onEach({
                        element: options.list[ii],
                        ii: ii,
                        list: options.list,
                        retry: 0
                    }, onParallel);
                }
            };
            onParallel = local.onParallel(onError, onEach2, function (error, data) {
                if (error && data && data.retry < options.retryLimit) {
                    local.onErrorDefault(error);
                    data.retry += 1;
                    setTimeout(function () {
                        onParallel.counter -= 1;
                        onEach(data, onParallel);
                    }, 1000);
                    return true;
                }
            });
            ii = -1;
            onParallel.ii = -1;
            onParallel.remaining = options.list.length;
            options.rateLimit = Number(options.rateLimit) || 6;
            options.rateLimit = Math.max(options.rateLimit, 1);
            options.retryLimit = Number(options.retryLimit) || 2;
            onParallel.counter += 1;
            onEach2();
            onParallel();
        };

        local.onReadyAfter = function (onError) {
        /*
         * this function will call onError when onReadyBefore.counter === 0
         */
            local.onReadyBefore.counter += 1;
            local.taskCreate({ key: 'utility2.onReadyAfter' }, null, onError);
            local.onResetAfter(local.onReadyBefore);
            return onError;
        };

        local.onReadyBefore = local.onParallel(function (error) {
        /*
         * this function will keep track of onReadyBefore.counter
         */
            local.taskCreate({
                key: 'utility2.onReadyAfter'
            }, function (onError) {
                onError(error);
            }, function (error) {
                // validate no error occurred
                local.assert(!error, error);
            });
        });

        local.onResetAfter = function (onError) {
        /*
         * this function will call onError when onResetBefore.counter === 0
         */
            local.onResetBefore.counter += 1;
            // visual notification - onResetAfter
            local.ajaxProgressUpdate();
            local.taskCreate({ key: 'utility2.onResetAfter' }, null, onError);
            setTimeout(local.onResetBefore);
            return onError;
        };

        local.onResetBefore = local.onParallel(function (error) {
        /*
         * this function will keep track of onResetBefore.counter
         */
            local.taskCreate({
                key: 'utility2.onResetAfter'
            }, function (onError) {
                onError(error);
            }, function (error) {
                // validate no error occurred
                local.assert(!error, error);
            });
        });

        local.onTimeout = function (onError, timeout, message) {
        /*
         * this function will create a timeout-error-handler,
         * that will append the current stack to any error encountered
         */
            onError = local.onErrorWithStack(onError);
            // create timerTimeout
            return setTimeout(function () {
                onError(new Error('onTimeout - timeout-error - ' +
                    timeout + ' ms - ' + (typeof message === 'function'
                    ? message()
                    : message)));
            // coerce to finite integer
            }, timeout | 0);
        };

        local.profile = function (fnc, onError) {
        /*
         * this function will profile the async fnc in milliseconds with the callback onError
         */
            var timeStart;
            timeStart = Date.now();
            // run async fnc
            fnc(function (error) {
                // call onError with difference in milliseconds between Date.now() and timeStart
                onError(error, Date.now() - timeStart);
            });
        };

        local.profileSync = function (fnc) {
        /*
         * this function will profile the sync fnc in milliseconds
         */
            var timeStart;
            timeStart = Date.now();
            // run sync fnc
            fnc();
            // return difference in milliseconds between Date.now() and timeStart
            return Date.now() - timeStart;
        };

        local.replStart = function () {
        /*
         * this function will start the repl-debugger
         */
            /*jslint evil: true*/
            var self;
            if (global.utility2_serverRepl1) {
                return;
            }
            // start replServer
            self = global.utility2_serverRepl1 = require('repl').start({ useGlobal: true });
            self.nop = function () {
            /*
             * this function will do nothing
             */
                return;
            };
            self.onError = function (error) {
            /*
             * this function will debug any repl-error
             */
                // debug error
                global.utility2_debugReplError = error;
                console.error(error);
            };
            // save repl eval function
            self.evalDefault = self.eval;
            // hook custom repl eval function
            self.eval = function (script, context, file, onError) {
                var match, onError2;
                match = (/^(\S+)(.*?)\n/).exec(script);
                onError2 = function (error, data) {
                    // debug error
                    global.utility2_debugReplError = error || global.utility2_debugReplError;
                    onError(error, data);
                };
                switch (match && match[1]) {
                // syntax sugar to run async shell command
                case '$':
                    switch (match[2]) {
                    // syntax sugar to run git diff
                    case ' git diff':
                        match[2] = ' git diff --color | cat';
                        break;
                    // syntax sugar to run git log
                    case ' git log':
                        match[2] = ' git log -n 4 | cat';
                        break;
                    }
                    // run async shell command
                    require('child_process').spawn(match[2], {
                        shell: true,
                        stdio: ['ignore', 1, 2]
                    })
                        // on shell exit, print return prompt
                        .on('exit', function (exitCode) {
                            console.error('exit-code ' + exitCode);
                            self.evalDefault(
                                '\n',
                                context,
                                file,
                                onError2
                            );
                        });
                    script = '\n';
                    break;
                // syntax sugar to grep current dir
                case 'grep':
                    // run async shell command
                    require('child_process').spawn('find . -type f | grep -v ' +
/* jslint-ignore-begin */
'"\
/\\.\\|\\(\\b\\|_\\)\\(\\.\\d\\|\
archive\\|artifact\\|\
bower_component\\|build\\|\
coverage\\|\
doc\\|\
external\\|\
fixture\\|\
git_module\\|\
jquery\\|\
log\\|\
min\\|mock\\|\
node_module\\|\
rollup\\|\
swp\\|\
tmp\\|\
vendor\\)s\\{0,1\\}\\(\\b\\|_\\)\
" ' +
/* jslint-ignore-end */
                            '| tr "\\n" "\\000" | xargs -0 grep -in "' +
                            match[2].trim() + '"', { shell: true, stdio: ['ignore', 1, 2] })
                        // on shell exit, print return prompt
                        .on('exit', function (exitCode) {
                            console.error('exit-code ' + exitCode);
                            self.evalDefault(
                                '\n',
                                context,
                                file,
                                onError2
                            );
                        });
                    script = '\n';
                    break;
                // syntax sugar to list object's keys, sorted by item-type
                case 'keys':
                    script = 'console.error(Object.keys(' + match[2] +
                        ').map(function (key) {' +
                        'return typeof ' + match[2] + '[key] + " " + key + "\\n";' +
                        '}).sort().join("") + Object.keys(' + match[2] + ').length)\n';
                    break;
                // syntax sugar to print stringified arg
                case 'print':
                    script = 'console.error(String(' + match[2] + '))\n';
                    break;
                }
                // eval the script
                self.evalDefault(script, context, file, onError2);
            };
            self.socket = { end: self.nop, on: self.nop, write: self.nop };
            // init process.stdout
            process.stdout._writeDefault = process.stdout._writeDefault ||
                process.stdout._write;
            process.stdout._write = function (chunk, encoding, callback) {
                process.stdout._writeDefault(chunk, encoding, callback);
                // coverage-hack - ignore else-statement
                self.nop(self.socket.writable && (function () {
                    self.socket.write(chunk, encoding);
                }()));
            };
            // start tcp-server
            global.utility2_serverReplTcp1 = require('net').createServer(function (socket) {
                // init socket
                self.socket = socket;
                self.socket.on('data', self.write.bind(self));
                self.socket.on('error', self.onError);
                self.socket.setKeepAlive(true);
            });
            // coverage-hack - ignore else-statement
            self.nop(process.env.PORT_REPL && (function () {
                console.error('repl-server listening on tcp-port ' + process.env.PORT_REPL);
                global.utility2_serverReplTcp1.listen(process.env.PORT_REPL);
            }()));
        };

        local.requireInSandbox = function (file) {
        /*
         * this function will require the file in a sandbox-lite env
         */
            var exports, mockDict, mockList, tmp;
            mockList = [
                [ local.global, {
                    setImmediate: local.nop,
                    setInterval: local.nop,
                    setTimeout: local.nop
                }]
            ];
            [
                [local, 'child_process'],
                [local, 'cluster'],
                [local, 'http'],
                [local, 'https'],
                [local, 'net'],
                [local, 'repl'],
                [local.events, 'prototype'],
                [local.global, 'process'],
                [local.stream, 'prototype'],
                [process, 'stdin']
            ].forEach(function (element) {
                tmp = element[0][element[1]];
                mockDict = {};
                Object.keys(tmp).forEach(function (key) {
                    if (typeof tmp[key] === 'function' &&
                            !(/^(?:fs\.Read|fs\.read|process\.binding|process\.dlopen)/)
                            .test((element[1] + '.' + key))) {
                        mockDict[key] = function () {
                            return;
                        };
                        // coverage-hack
                        mockDict[key]();
                    }
                });
                mockList.push([ tmp, mockDict ]);
            });
            local.testMock(mockList, function (onError) {
                local.tryCatchOnError(function () {
                    exports = require(file);
                }, console.error);
                onError();
            }, local.onErrorThrow);
            return exports;
        };

        local.requireReadme = function () {
        /*
         * this function will require and export example.js embedded in README.md
         */
            var module, script, tmp;
            // start repl-debugger
            local.replStart();
            // debug dir
            [__dirname, process.cwd()].forEach(function (dir) {
                local.fs.readdirSync(dir).forEach(function (file) {
                    file = dir + '/' + file;
                    // if the file is modified, then restart the process
                    local.onFileModifiedRestart(file);
                    switch (local.path.extname(file)) {
                    case '.css':
                    case '.html':
                    case '.js':
                    case '.json':
                        if ((/\brollup\b/).test(file)) {
                            return;
                        }
                        // jslint file
                        local.fs.readFile(file, 'utf8', function (error, data) {
                            local.jslintAndPrintConditional(!error && data, file);
                        });
                        break;
                    }
                });
            });
            if (local.global.utility2_rollup || local.env.npm_config_mode_start) {
                // init assets
                local.assetsDict['/'] = local.assetsDict['/index.html'] =
                    local.assetsDict['/index.html'] || local.templateRender(
                        // uncomment utility2-comment
                        local.assetsDict['/assets.index.template.html'].replace(
                            (/<!-- utility2-comment\b([\S\s]+?)\butility2-comment -->/g),
                            '$1'
                        ),
                        { env: local.env, isRollup: true }
                    );
                local.assetsDict['/assets.example.js'] =
                    local.assetsDict['/assets.example.template.js'];
                local.assetsDict['/assets.app.js'] =
                    local.fs.readFileSync(__filename, 'utf8').replace((/^#!/), '//');
                // init exports
                local.global.local = local[local.env.npm_package_nameAlias] = local;
                return local;
            }
            // init file $npm_package_main
            tmp = process.cwd() + '/' + local.env.npm_package_main;
            global.utility2_moduleExports = require(tmp);
            local.assetsDict['/assets.' + local.env.npm_package_nameAlias + '.js'] =
                local.istanbulInstrumentInPackage(
                    local.fs.readFileSync(tmp, 'utf8').replace((/^#!/), '//'),
                    tmp
                );
            global.utility2_moduleExports.global = global;
            // read script from README.md
            script = local.templateRenderJslintLite(
                local.assetsDict['/assets.example.template.js'],
                {}
            );
            // coverage-hack - ignore else-statement
            local.nop(!local.env.npm_package_buildCustomOrg && (function () {
                local.fs.readFileSync('README.md', 'utf8').replace(
                    (/```\w*?(\n[\W\s]*?example\.js[\n\"][\S\s]+?)\n```/),
                    function (match0, match1, ii, text) {
                        // jslint-hack
                        local.nop(match0);
                        // preserve lineno
                        script = text.slice(0, ii).replace((/.+/g), '') + match1;
                    }
                );
            }()));
            script = script
                // alias require($npm_package_name) to utility2_moduleExports;
                .replace(
                    "require('" + local.env.npm_package_name + "')",
                    'global.utility2_moduleExports'
                )
                .replace(
                    "require('" + local.env.npm_package_nameOriginal + "')",
                    'global.utility2_moduleExports'
                );
            // init example.js
            tmp = process.cwd() + '/example.js';
            // jslint script
            local.jslintAndPrintConditional(script, tmp);
            // cover script
            script = local.istanbulInstrumentInPackage(script, tmp);
            // init module
            module = require.cache[tmp] = new local.Module(tmp);
            // load script into module
            module._compile(script, tmp);
            // init exports
            module.exports.utility2 = local;
            module.exports[local.env.npm_package_nameAlias] = global.utility2_moduleExports;
            // init assets
            local.objectSetOverride(local.assetsDict, module.exports.assetsDict);
            module.exports.assetsDict = local.assetsDict;
            local.assetsDict['/assets.example.js'] = script;
            local.assetsDict['/assets.test.js'] = local.istanbulInstrumentInPackage(
                local.fs.readFileSync('test.js', 'utf8'),
                process.cwd() + '/test.js'
            );
            // init assets index.html
            local.tryCatchOnError(function () {
                local.assetsDict['/assets.index.template.html'] =
                    local.fs.readFileSync('assets.index.template.html', 'utf8');
            }, local.nop);
            ['index', 'index.default'].forEach(function (element) {
                local.assetsDict['/' + element + '.html'] =
                    local.assetsDict['/' + element + '.html'] ||
                    local.jslintAndPrintConditional(local.templateRender(
                        // uncomment utility2-comment
                        local.assetsDict['/assets.' + element + '.template.html'].replace(
                            (/<!-- utility2-comment\b([\S\s]+?)\butility2-comment -->/g),
                            '$1'
                        ),
                        {
                            env: local.env,
                            isRollup: local.global.utility2_rollup ||
                                local.env.NODE_ENV === 'rollup' ||
                                local.env.NODE_ENV === 'production'
                        }
                    ), '/' + element + '.html');
            });
            local.assetsDict['/'] = local.assetsDict['/index.html'];
            // init assets.app.js
            local.assetsDict['/assets.app.js'] = [
                'header',
                '/assets.utility2.rollup.js',
                '/assets.utility2.rollup.begin.js',
                'local.stateInit',
                '/assets.lib.js',
                '/assets.example.js',
                '/assets.test.js',
                '/assets.utility2.rollup.end.js'
            ].map(function (key) {
                switch (key) {
/* jslint-ignore-begin */
case 'header':
return '\
/* this rollup was created with utility2 (https://github.com/kaizhu256/node-utility2) */\n\
\n\
\n\
\n\
/*\n\
assets.app.js\n\
\n\
' + local.env.npm_package_description + '\n\
\n\
instruction\n\
    1. save this script as assets.app.js\n\
    2. run the shell command:\n\
        $ PORT=8081 node assets.app.js\n\
    3. open a browser to http://127.0.0.1:8081 and play with the web demo\n\
    4. edit this script to suit your needs\n\
*/\n\
' + local.assetsDict['/assets.utility2.rollup.begin.js']
    .replace((/utility2_rollup/g), 'utility2_app');
/* jslint-ignore-end */
                case '/assets.lib.js':
                    // handle large string-replace
                    tmp = '/assets.' + local.env.npm_package_nameAlias + '.js';
                    script = local.assetsDict['/assets.utility2.rollup.content.js']
                        .split('/* utility2.rollup.js content */');
                    script.splice(1, 0, 'local.assetsDict["' + tmp + '"] = ' +
                        JSON.stringify(local.assetsDict[tmp]));
                    script = script.join('');
                    script += '\n';
                    script += local.assetsDict[tmp];
                    break;
                case 'local.stateInit':
                    // handle large string-replace
                    script = local.assetsDict['/assets.utility2.rollup.content.js']
                        .split('/* utility2.rollup.js content */');
                    tmp = local.middlewareJsonpStateInit({ stateInit: true });
                    // add extra physical files to assetsDict
                    local.fs.readdirSync('.').forEach(function (file) {
                        file = '/' + file;
                        if (file.indexOf('/assets.') === 0 &&
                                local.fs.readFileSync('.' + file, 'utf8') ===
                                local.assetsDict[file]) {
                            tmp.utility2.assetsDict[file] = local.assetsDict[file];
                        }
                    });
                    script.splice(1, 0, key + '(' + JSON.stringify(tmp, null, 4) + ');');
                    script = script.join('');
                    break;
                default:
                    script = local.assetsDict[key];
                }
                return '/* script-begin ' + key + ' */\n' +
                    script.trim() +
                    '\n/* script-end ' + key + ' */\n';
            }).join('\n\n\n');
            local.objectSetDefault(module.exports, local);
            // jslint assetsDict
            Object.keys(local.assetsDict).sort().forEach(function (key) {
                setTimeout(function () {
                    local.jslintAndPrintConditional(local.assetsDict[key], key);
                });
            });
            return module.exports;
        };

        local.serverLog = function (options) {
            console.error('serverLog - ' + JSON.stringify(options));
        };

        local.serverRespondCors = function (request, response) {
        /*
         * this function will enable cors for the request
         * http://en.wikipedia.org/wiki/Cross-origin_resource_sharing
         */
            local.serverRespondHeadSet(request, response, null, local.jsonCopy({
                'access-control-allow-headers':
                    request.headers['access-control-request-headers'],
                'access-control-allow-methods':
                    request.headers['access-control-request-method'],
                'access-control-allow-origin': '*'
            }));
        };

        local.serverRespondDefault = function (request, response, statusCode, error) {
        /*
         * this function will respond with a default message,
         * or error.stack for the given statusCode
         */
            // init statusCode and contentType
            local.serverRespondHeadSet(
                request,
                response,
                statusCode,
                { 'Content-Type': 'text/plain; charset=utf-8' }
            );
            if (error) {
                // debug statusCode / method / url
                local.errorMessagePrepend(
                    error,
                    response.statusCode + ' ' + request.method + ' ' + request.url + '\n'
                );
                // print error.stack to stderr
                local.onErrorDefault(error);
                // end response with error.stack
                response.end(error.stack);
                return;
            }
            // end response with default statusCode message
            response.end(
                statusCode + ' ' + local.http.STATUS_CODES[statusCode]
            );
        };

        local.serverRespondEcho = function (request, response) {
        /*
         * this function will respond with debug info
         */
            response.write(request.method + ' ' + request.url +
                ' HTTP/' + request.httpVersion + '\r\n' +
                Object.keys(request.headers).map(function (key) {
                    return key + ': ' + request.headers[key] + '\r\n';
                }).join('') + '\r\n');
            request.pipe(response);
        };

        local.serverRespondHeadSet = function (request, response, statusCode, headers) {
        /*
         * this function will set the response object's statusCode / headers
         */
            // jslint-hack
            local.nop(request);
            if (response.headersSent) {
                return;
            }
            // init response.statusCode
            if (Number(statusCode)) {
                response.statusCode = Number(statusCode);
            }
            Object.keys(headers).forEach(function (key) {
                if (headers[key]) {
                    response.setHeader(key, headers[key]);
                }
            });
            return true;
        };

        local.serverRespondTimeoutDefault = function (request, response, timeout) {
        /*
         * this function will create a timeout-error-handler for the server-request
         */
            var onError;
            onError = function () {
                if (response.isDone) {
                    return;
                }
                response.isDone = true;
                // debug serverResponse
                local.serverLog({
                    type: 'serverResponse',
                    time: new Date(request.timeStart).toISOString(),
                    method: request.method,
                    url: request.url,
                    statusCode: local.normalizeValue('number', response.statusCode),
                    duration: Date.now() - request.timeStart,
                    // extra
                    requestContentLength: request.dataLength || 0,
                    responseContentLength: response.contentLength,
                    requestHeaderXForwardedFor: request.headers['x-forwarded-for'] || '',
                    requestHeaderOrigin: request.headers.origin || '',
                    requestHeaderReferer: request.headers.referer || '',
                    requestHeaderUserAgent: request.headers['user-agent']
                });
                // cleanup timerTimeout
                clearTimeout(request.timerTimeout);
            };
            request.timeStart = Date.now();
            request.onTimeout = request.onTimeout || function (error) {
                local.serverRespondDefault(request, response, 500, error);
                setTimeout(function () {
                    // cleanup request and response
                    local.streamListCleanup([request, response]);
                }, 1000);
            };
            request.timerTimeout = local.onTimeout(
                request.onTimeout,
                timeout || local.timeoutDefault,
                'server ' + request.method + ' ' + request.url
            );
            response.contentLength = 0;
            response.writeContentLength = response.writeContentLength || response.write;
            response.write = function (chunk, encoding, callback) {
                response.contentLength += chunk.length;
                response.writeContentLength(chunk, encoding, callback);
            };
            response.on('error', onError);
            response.on('finish', onError);
        };

        local.setTimeoutOnError = function (onError, error, data) {
        /*
         * this function will async-call onError
         */
            if (typeof onError === 'function') {
                setTimeout(function () {
                    onError(error, data);
                });
            }
            return data;
        };

        local.sjclHashScryptCreate = function (password, options) {
        /*
         * https://github.com/wg/scrypt
         * this function will create a scrypt-hash of the password
         * with the given options (default = $s0$10801)
         * e.g. $s0$e0801$epIxT/h6HbbwHaehFnh/bw==$7H0vsXlY8UxxyW/BWx/9GuY7jEvGjT71GFd6O4SZND0=
         */
            // init options
            options = (options || '$s0$10801').split('$');
            // init salt
            if (!options[3]) {
                options[3] = local.sjcl.codec.base64.fromBits(
                    local.sjcl.random.randomWords(4, 0)
                );
            }
            // init hash
            options[4] = local.sjcl.codec.base64.fromBits(
                local.sjcl.misc.scrypt(
                    password || '',
                    local.sjcl.codec.base64.toBits(options[3]),
                    Math.pow(2, parseInt(options[2].slice(0, 1), 16)),
                    parseInt(options[2].slice(1, 2), 16),
                    parseInt(options[2].slice(3, 4), 16)
                )
            );
            return options.slice(0, 5).join('$');
        };

        local.sjclHashScryptValidate = function (password, hash) {
        /*
         * https://github.com/wg/scrypt
         * this function will validate the password against the scrypt-hash
         */
            return local.sjclHashScryptCreate(password, hash) === hash;
        };

        local.sjclHashSha256Create = function (data) {
        /*
         * this function will create a base64-encoded sha-256 hash of the string data
         */
            return local.sjcl.codec.base64.fromBits(local.sjcl.hash.sha256.hash(data));
        };

        local.sjclHmacSha256Create = function (key, data) {
        /*
         * this function will create a base64-encoded sha-256 hmac
         * from the base64-encoded key and string data
         */
            return local.sjcl.codec.base64.fromBits(
                (new local.sjcl.misc.hmac(
                    local.sjcl.codec.base64.toBits(key),
                    local.sjcl.hash.sha256
                )).mac(local.sjcl.codec.utf8String.toBits(data))
            );
        };

        local.stateInit = function (options) {
        /*
         * this function will init the state-options
         */
            local.objectSetOverride(local, options, Infinity);
            // init swgg
            // coverage-hack - ignore else-statement
            local.nop(local.swgg && local.swgg.apiDictUpdate(local.swgg.swaggerJson));
        };

        local.streamListCleanup = function (streamList) {
        /*
         * this function will end or destroy the streams in streamList
         */
            streamList.forEach(function (stream) {
                // try to end the stream
                local.tryCatchOnError(function () {
                    stream.end();
                }, function () {
                    // if error, then try to destroy the stream
                    local.tryCatchOnError(function () {
                        stream.destroy();
                    }, local.nop);
                });
            });
        };

        local.streamReadAll = function (stream, onError) {
        /*
         * this function will concat data from the stream,
         * and pass it to onError when isDone reading
         */
            var chunkList;
            chunkList = [];
            stream.dataLength = 0;
            // read data from the stream
            stream
                // on data event, push the buffer chunk to chunkList
                .on('data', function (chunk) {
                    chunkList.push(chunk);
                    stream.dataLength += chunk.length;
                })
                // on end event, pass concatenated read buffer to onError
                .on('end', function () {
                    onError(null, local.modeJs === 'browser'
                        ? chunkList[0]
                        : local.bufferConcat(chunkList));
                })
                // on error event, pass error to onError
                .on('error', onError);
        };

        local.stringHtmlSafe = function (text) {
        /*
         * this function will make the text html-safe
         */
            // new RegExp('[' + '"&\'<>'.split('').sort().join('') + ']', 'g')
            return text.replace((/["&'<>]/g), function (match0) {
                return '&#x' + match0.charCodeAt(0).toString(16) + ';';
            });
        };

        local.taskCreate = function (options, onTask, onError) {
        /*
         * this function will create the task onTask named options.key, if it does not exist,
         * and push onError to its onErrorList
         */
            var task;
            // init task
            task = local.taskOnTaskDict[options.key] = local.taskOnTaskDict[options.key] ||
                { onErrorList: [] };
            // push callback onError to the task
            if (onError) {
                onError = local.onErrorWithStack(onError);
                task.onErrorList.push(onError);
            }
            // if task exists, then return it
            if (!onTask || task.onTask) {
                return task;
            }
            task.onDone = function () {
                // if isDone, then do nothing
                if (task.isDone) {
                    return;
                }
                task.isDone = true;
                // cleanup timerTimeout
                clearTimeout(task.timerTimeout);
                // cleanup task
                delete local.taskOnTaskDict[options.key];
                // preserve error.message and error.stack
                task.result = JSON.stringify(Array.from(arguments)
                    .map(function (element) {
                        if (element && element.stack) {
                            element = local.objectSetDefault(local.jsonCopy(element), {
                                message: element.message,
                                name: element.name,
                                stack: element.stack
                            });
                        }
                        return element;
                    }));
                // pass result to callbacks in onErrorList
                task.onErrorList.forEach(function (onError) {
                    onError.apply(null, JSON.parse(task.result));
                });
            };
            // init timerTimeout
            task.timerTimeout = local.onTimeout(
                task.onDone,
                options.timeout || local.timeoutDefault,
                'taskCreate ' + options.key
            );
            task.onTask = onTask;
            // run onTask
            task.onTask(task.onDone);
            return task;
        };

        local.taskCreateCached = function (options, onTask, onError) {
        /*
         * this function will
         * 1. if cache-hit, then call onError with cacheValue
         * 2. run onTask in background
         * 3. save onTask's result to cache
         * 4. if cache-miss, then call onError with onTask's result
         */
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                //  1. if cache-hit, then call onError with cacheValue
                case 1:
                    // read cacheValue from memory-cache
                    local.cacheDict[options.cacheDict] = local.cacheDict[options.cacheDict] ||
                        {};
                    options.cacheValue = local.cacheDict[options.cacheDict][options.key];
                    if (options.cacheValue) {
                        // call onError with cacheValue
                        options.modeCacheHit = true;
                        onError(null, JSON.parse(options.cacheValue));
                        if (!options.modeCacheUpdate) {
                            break;
                        }
                    }
                    // run background-task with lower priority for cache-hit
                    setTimeout(options.onNext, options.modeCacheHit && options.cacheTtl);
                    break;
                // 2. run onTask in background
                case 2:
                    local.taskCreate(options, onTask, options.onNext);
                    break;
                default:
                    // 3. save onTask's result to cache
                    // JSON.stringify data to prevent side-effects on cache
                    options.cacheValue = JSON.stringify(data);
                    if (!error && options.cacheValue) {
                        local.cacheDict[options.cacheDict][options.key] = options.cacheValue;
                    }
                    // 4. if cache-miss, then call onError with onTask's result
                    if (!options.modeCacheHit) {
                        onError(error, options.cacheValue && JSON.parse(options.cacheValue));
                    }
                    (options.onCacheWrite || local.nop)();
                    break;
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.templateRender = function (template, dict) {
        /*
         * this function will render the template with the given dict
         */
            var argList, getValue, match, renderPartial, rgx, value;
            dict = dict || {};
            getValue = function (key) {
                argList = key.split(' ');
                value = dict;
                // iteratively lookup nested values in the dict
                argList[0].split('.').forEach(function (key) {
                    value = value && value[key];
                });
                return value;
            };
            renderPartial = function (match0, helper, key, partial) {
                switch (helper) {
                case 'each':
                    value = getValue(key);
                    return Array.isArray(value)
                        ? value.map(function (dict) {
                            // recurse with partial
                            return local.templateRender(partial, dict);
                        }).join('')
                        : '';
                case 'if':
                    partial = partial.split('{{#unless ' + key + '}}');
                    partial = getValue(key)
                        ? partial[0]
                        // handle 'unless' case
                        : partial.slice(1).join('{{#unless ' + key + '}}');
                    // recurse with partial
                    return local.templateRender(partial, dict);
                case 'unless':
                    return getValue(key)
                        ? ''
                        // recurse with partial
                        : local.templateRender(partial, dict);
                default:
                    // recurse with partial
                    return match0[0] + local.templateRender(match0.slice(1), dict);
                }
            };
            // render partials
            rgx = (/\{\{#(\w+) ([^}]+?)\}\}/g);
            template = template || '';
            for (match = rgx.exec(template); match; match = rgx.exec(template)) {
                rgx.lastIndex += 1 - match[0].length;
                template = template.replace(
                    new RegExp('\\{\\{#(' + match[1] + ') (' + match[2] +
                        ')\\}\\}([\\S\\s]*?)\\{\\{/' + match[1] + ' ' + match[2] +
                        '\\}\\}'),
                    renderPartial
                );
            }
            // search for keys in the template
            return template.replace((/\{\{[^}]+?\}\}/g), function (match0) {
                getValue(match0.slice(2, -2));
                if (value === undefined) {
                    return match0;
                }
                argList.slice(1).forEach(function (arg) {
                    switch (arg) {
                    case 'alphanumeric':
                        value = value.replace((/\W/g), '_');
                        break;
                    case 'decodeURIComponent':
                        value = decodeURIComponent(value);
                        break;
                    case 'encodeURIComponent':
                        value = encodeURIComponent(value);
                        break;
                    case 'htmlSafe':
                        value = value.replace((/["&'<>]/g), function (match0) {
                            return '&#x' + match0.charCodeAt(0).toString(16) + ';';
                        });
                        break;
                    case 'jsonStringify':
                        value = JSON.stringify(value);
                        break;
                    case 'jsonStringify4':
                        value = JSON.stringify(value, null, 4);
                        break;
                    case 'markdownCodeSafe':
                        value = value.replace((/`/g), '\'');
                        break;
                    default:
                        value = value[arg]();
                        break;
                    }
                });
                return String(value);
            });
        };

        local.templateRenderJslintLite = function (template, options) {
        /*
         * this function will render the jslint-lite template with the given options.packageJson
         */
            options.packageJson = options.packageJson ||
                JSON.parse(local.fs.readFileSync('package.json', 'utf8'));
            local.objectSetDefault(options.packageJson, {
                nameAlias: options.packageJson.name.replace((/\W/g), '_'),
                repository: { url: 'https://github.com/kaizhu256/node-' +
                    options.packageJson.name + '.git' }
            }, 2);
            options.githubRepo = options.packageJson.repository.url.split('/').slice(-2);
            options.githubRepo[1] = options.githubRepo[1].replace((/\.git$/), '');
            template = template.replace(
                (/https:\/\/kaizhu256\.github\.io\/node-jslint-lite/g),
                'https://' +  options.githubRepo[0] + '.github.io/' +  options.githubRepo[1]
            );
            template = template.replace(
                (/kaizhu256\/node-jslint-lite/g),
                options.githubRepo.join('/')
            );
            template = template.replace(
                (/kaizhu256%252Fnode-jslint-lite/g),
                options.githubRepo.join('%252F')
            );
            template = template.replace(
                (/node-jslint-lite/g),
                options.githubRepo[1]
            );
            template = template.replace((/^#!/), '//');
            template = template.replace((/jslint-lite/g), options.packageJson.name);
            template = template.replace(
                '/* istanbul instrument in package jslint */',
                '/* istanbul instrument in package ' + options.packageJson.nameAlias + ' */'
            );
            template = template.replace(
                (/\bh1-jslint\b/g),
                'h1-' + options.packageJson.nameAlias.replace((/_/g), '-')
            );
            template = template.replace(
                'assets.{{env.npm_package_nameAlias}}',
                'assets.' + options.packageJson.nameAlias
            );
            template = template.replace('my-app', options.packageJson.name);
            template = template.replace('my_app', options.packageJson.nameAlias);
            if (options.customizeAfter) {
                return template;
            }
            template = template.replace(
                (/\b(assets\.|lib\.|local\.|utility2_)jslint\b/g),
                '$1' + options.packageJson.nameAlias
            );
            return template;
        };

        local.testMock = function (mockList, onTestCase, onError) {
        /*
         * this function will mock the objects in mockList while running the onTestCase
         */
            var onError2;
            onError2 = function (error) {
                // restore mock[0] from mock[2]
                mockList.reverse().forEach(function (mock) {
                    Object.keys(mock[2]).forEach(function (key) {
                        mock[0][key] = mock[2][key];
                    });
                });
                onError(error);
            };
            // try to call onError with mock-objects
            local.tryCatchOnError(function () {
                // mock-objects
                mockList.forEach(function (mock) {
                    mock[2] = {};
                    // backup mock[0] into mock[2]
                    Object.keys(mock[1]).forEach(function (key) {
                        if (typeof process === 'object' &&
                                process.env === mock[0] &&
                                mock[0][key] === undefined) {
                            mock[0][key] = '';
                        }
                        mock[2][key] = mock[0][key];
                    });
                    // override mock[0] with mock[1]
                    Object.keys(mock[1]).forEach(function (key) {
                        mock[0][key] = mock[1][key];
                    });
                });
                // run onTestCase
                onTestCase(onError2);
            }, onError2);
        };

        local.testReportCreate = function (testReport) {
        /*
         * this function will create test-report artifacts
         */
            testReport = local.objectSetDefault(testReport, { testPlatformList: [] });
            // print test-report summary
            console.error('\n' + new Array(56).join('-') + '\n' + testReport.testPlatformList
                .filter(function (testPlatform) {
                    // if testPlatform has no tests, then filter it out
                    return testPlatform.testCaseList.length;
                })
                .map(function (testPlatform) {
                    return '| test-report - ' + testPlatform.name + '\n|' +
                        ('        ' + testPlatform.timeElapsed + ' ms     ')
                        .slice(-16) +
                        ('        ' + testPlatform.testsFailed + ' failed ')
                        .slice(-16) +
                        ('        ' + testPlatform.testsPassed + ' passed ')
                        .slice(-16) + '     |\n' + new Array(56).join('-');
                })
                .join('\n') + '\n');
            // create test-report.html
            local.fs.writeFileSync(
                local.env.npm_config_dir_build + '/test-report.html',
                local.testReportMerge(testReport, {})
            );
            // create build.badge.svg
            local.fs.writeFileSync(
                local.env.npm_config_dir_build + '/build.badge.svg',
                local.assetsDict['/assets.buildBadge.template.svg'].replace(
                    new RegExp('0000-00-00 00:00:00 UTC - master - ' +
                        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'g'),
                    new Date().toISOString().slice(0, 19).replace('T', ' ') +
                        ' - ' + local.env.CI_BRANCH + ' - ' + local.env.CI_COMMIT_ID
                )
            );
            // create test-report.badge.svg
            local.fs.writeFileSync(
                local.env.npm_config_dir_build + '/test-report.badge.svg',
                local.assetsDict['/assets.testReportBadge.template.svg']
                    // edit number of tests failed
                    .replace((/999/g), testReport.testsFailed)
                    // edit badge color
                    .replace(
                        (/d00/g),
                        // coverage-hack - cover both fail and pass cases
                        '0d00'.slice(!!testReport.testsFailed).slice(0, 3)
                    )
            );
            console.error('created test-report file ' + local.env.npm_config_dir_build +
                '/test-report.html\n');
            // if any test failed, then exit with non-zero exit-code
            console.error('\n' + local.env.MODE_BUILD +
                ' - ' + testReport.testsFailed + ' failed tests\n');
            // print failed testCase
            testReport.testPlatformList.forEach(function (testPlatform) {
                testPlatform.testCaseList.forEach(function (testCase) {
                    if (testCase.status !== 'passed') {
                        console.error(JSON.stringify(testCase, null, 4));
                    }
                });
            });
            return testReport;
        };

        local.testReportMerge = function (testReport1, testReport2) {
        /*
         * this function will
         * 1. merge testReport2 into testReport1
         * 2. return testReport1 in html-format
         */
            var errorStackList, testCaseNumber, testReport;
            // 1. merge testReport2 into testReport1
            [testReport1, testReport2].forEach(function (testReport, ii) {
                ii += 1;
                local.objectSetDefault(testReport, {
                    date: new Date().toISOString(),
                    errorStackList: [],
                    testPlatformList: [],
                    timeElapsed: 0
                }, 8);
                // security - handle malformed testReport
                local.assert(
                    testReport && typeof testReport === 'object',
                    ii + ' invalid testReport ' + typeof testReport
                );
                // validate timeElapsed
                local.assert(
                    typeof testReport.timeElapsed === 'number',
                    ii + ' invalid testReport.timeElapsed ' + typeof testReport.timeElapsed
                );
                // security - handle malformed testReport.testPlatformList
                testReport.testPlatformList.forEach(function (testPlatform) {
                    local.objectSetDefault(testPlatform, {
                        name: 'undefined',
                        testCaseList: [],
                        timeElapsed: 0
                    }, 8);
                    local.assert(
                        typeof testPlatform.name === 'string',
                        ii + ' invalid testPlatform.name ' + typeof testPlatform.name
                    );
                    // insert $MODE_BUILD into testPlatform.name
                    if (local.env.MODE_BUILD) {
                        testPlatform.name = testPlatform.name.replace(
                            (/^(browser|node)\b/),
                            local.env.MODE_BUILD + ' - $1'
                        );
                    }
                    // validate timeElapsed
                    local.assert(
                        typeof testPlatform.timeElapsed === 'number',
                        ii + ' invalid testPlatform.timeElapsed ' +
                            typeof testPlatform.timeElapsed
                    );
                    // security - handle malformed testPlatform.testCaseList
                    testPlatform.testCaseList.forEach(function (testCase) {
                        local.objectSetDefault(testCase, {
                            errorStack: '',
                            name: 'undefined',
                            timeElapsed: 0
                        }, 8);
                        local.assert(
                            typeof testCase.errorStack === 'string',
                            ii + ' invalid testCase.errorStack ' + typeof testCase.errorStack
                        );
                        local.assert(
                            typeof testCase.name === 'string',
                            ii + ' invalid testCase.name ' + typeof testCase.name
                        );
                        // validate timeElapsed
                        local.assert(
                            typeof testCase.timeElapsed === 'number',
                            ii + ' invalid testCase.timeElapsed ' + typeof testCase.timeElapsed
                        );
                    });
                });
            });
            // merge testReport2.testPlatformList into testReport1.testPlatformList
            testReport2.testPlatformList.forEach(function (testPlatform2) {
                // add testPlatform2 to testReport1.testPlatformList
                testReport1.testPlatformList.push(testPlatform2);
            });
            // update testReport1.timeElapsed
            testReport1.timeElapsed += testReport2.timeElapsed;
            testReport = testReport1;
            testReport.testsFailed = 0;
            testReport.testsPassed = 0;
            testReport.testsPending = 0;
            testReport.testPlatformList.forEach(function (testPlatform) {
                testPlatform.testsFailed = 0;
                testPlatform.testsPassed = 0;
                testPlatform.testsPending = 0;
                testPlatform.testCaseList.forEach(function (testCase) {
                    switch (testCase.status) {
                    // update failed tests
                    case 'failed':
                        testPlatform.testsFailed += 1;
                        testReport.testsFailed += 1;
                        break;
                    // update passed tests
                    case 'passed':
                        testPlatform.testsPassed += 1;
                        testReport.testsPassed += 1;
                        break;
                    // update pending tests
                    default:
                        testPlatform.testsPending += 1;
                        testReport.testsPending += 1;
                    }
                });
                // update testPlatform.status
                testPlatform.status = testPlatform.testsFailed
                    ? 'failed'
                    : testPlatform.testsPending
                    ? 'pending'
                    : 'passed';
                // sort testCaseList by status and name
                testPlatform.testCaseList.sort(function (arg1, arg2) {
                    return arg1.status.replace('passed', 'z') + arg1.name >
                        arg2.status.replace('passed', 'z') + arg2.name
                        ? 1
                        : -1;
                });
            });
            // sort testPlatformList by status and name
            testReport.testPlatformList.sort(function (arg1, arg2) {
                return arg1.status.replace('passed', 'z') + arg1.name >
                    arg2.status.replace('passed', 'z') + arg2.name
                    ? 1
                    : -1;
            });
            // stop testReport timer
            if (testReport.testsPending === 0) {
                local.timeElapsedPoll(testReport);
            }
            // 2. return testReport1 in html-format
            // json-copy testReport that will be modified for html templating
            testReport = local.jsonCopy(testReport1);
            // update timeElapsed
            local.timeElapsedPoll(testReport);
            testReport.testPlatformList.forEach(function (testPlatform) {
                local.timeElapsedPoll(testPlatform);
                testPlatform.testCaseList.forEach(function (testCase) {
                    if (!testCase.isDone) {
                        local.timeElapsedPoll(testCase);
                    }
                    testPlatform.timeElapsed = Math.max(
                        testPlatform.timeElapsed,
                        testCase.timeElapsed
                    );
                });
                // update testReport.timeElapsed with testPlatform.timeElapsed
                testReport.timeElapsed =
                    Math.max(testReport.timeElapsed, testPlatform.timeElapsed);
            });
            // create html test-report
            testCaseNumber = 0;
            return local.templateRender(
                local.assetsDict['/assets.testReport.template.html'],
                local.objectSetOverride(testReport, {
                    env: local.env,
                    // map testPlatformList
                    testPlatformList: testReport.testPlatformList
                        .filter(function (testPlatform) {
                            // if testPlatform has no tests, then filter it out
                            return testPlatform.testCaseList.length;
                        })
                        .map(function (testPlatform, ii) {
                            errorStackList = [];
                            return local.objectSetOverride(testPlatform, {
                                errorStackList: errorStackList,
                                name: testPlatform.name,
                                screenshot: testPlatform.screenshot,
                                // map testCaseList
                                testCaseList: testPlatform.testCaseList.map(function (
                                    testCase
                                ) {
                                    testCaseNumber += 1;
                                    if (testCase.errorStack) {
                                        errorStackList.push({
                                            errorStack: testCaseNumber + '. ' + testCase.name +
                                                '\n' + testCase.errorStack
                                        });
                                    }
                                    return local.objectSetOverride(testCase, {
                                        testCaseNumber: testCaseNumber,
                                        testReportTestStatusClass: 'test' +
                                            testCase.status[0].toUpperCase() +
                                            testCase.status.slice(1)
                                    }, 8);
                                }),
                                preClass: errorStackList.length
                                    ? ''
                                    : 'displayNone',
                                testPlatformNumber: ii + 1
                            });
                        }, 8),
                    testStatusClass: testReport.testsFailed
                        ? 'testFailed'
                        : 'testPassed'
                }, 8)
            );
        };

        local.testRunBefore = local.nop;

        local.testRunDefault = function (options) {
        /*
         * this function will run all tests in testPlatform.testCaseList
         */
            var exit, testPlatform, testReport, testReportDiv1, timerInterval;
            // init modeTest
            local.modeTest = local.modeTest || local.env.npm_config_mode_test;
            if (!(local.modeTest || options.modeTest)) {
                return;
            }
            if (!options.testRunBeforeDone) {
                options.testRunBeforeTimer = options.testRunBeforeTimer ||
                    setTimeout(function () {
                        local.testRunBefore();
                        local.onReadyAfter(function () {
                            options.testRunBeforeDone = true;
                            local.testRunDefault(options);
                        });
                    });
                return;
            }
            // reset testRunBefore
            options.testRunBeforeDone = options.testRunBeforeTimer = null;
            // visual notification - testRun
            local.ajaxProgressUpdate();
            // mock serverLog
            local._serverLog = local._serverLog || local.serverLog;
            local.serverLog = local.nop;
            switch (local.modeJs) {
            case 'node':
                // mock proces.exit
                exit = process.exit;
                process.exit = local.nop;
                break;
            }
            // init modeTestCase
            local.modeTestCase = local.modeTestCase || local.env.npm_config_mode_test_case;
            // init testReport
            testReport = local.testReport;
            // init testReport timer
            local.timeElapsedStart(testReport);
            // init testPlatform
            testPlatform = local.testReport.testPlatformList[0];
            // init testPlatform timer
            local.timeElapsedStart(testPlatform);
            // reset testPlatform.testCaseList
            testPlatform.testCaseList.length = 0;
            // add tests into testPlatform.testCaseList
            Object.keys(options).forEach(function (key) {
                // add testCase options[key] to testPlatform.testCaseList
                if (typeof options[key] === 'function' && (local.modeTestCase
                        ? local.modeTestCase.split(',').indexOf(key) >= 0
                        : key.indexOf('testCase_') === 0)) {
                    testPlatform.testCaseList.push({
                        name: key,
                        status: 'pending',
                        onTestCase: options[key]
                    });
                }
            });
            // visual notification - update test-progress until isDone
            // init testReportDiv1 element
            if (local.modeJs === 'browser') {
                testReportDiv1 = document.querySelector('#testReportDiv1');
            }
            testReportDiv1 = testReportDiv1 || { style: {} };
            local.uiAnimateSlideDown(testReportDiv1);
            testReportDiv1.innerHTML = local.testReportMerge(testReport, {});
            // update test-report status every 1000 ms until isDone
            timerInterval = setInterval(function () {
                // update testReportDiv1 in browser
                testReportDiv1.innerHTML = local.testReportMerge(testReport, {});
                if (testReport.testsPending === 0) {
                    // cleanup timerInterval
                    clearInterval(timerInterval);
                }
            }, 1000);
            // shallow-copy testPlatform.testCaseList to prevent side-effects
            // from in-place sort from testReportMerge
            local.onParallelList({
                list: testPlatform.testCaseList.slice(),
                rateLimit: Infinity
            }, function (testCase, onParallel) {
                var onError, timerTimeout;
                onError = function (error) {
                    // cleanup timerTimeout
                    clearTimeout(timerTimeout);
                    // if testCase isDone, then fail testCase with error for ending again
                    if (testCase.isDone) {
                        error = error || new Error('callback in testCase ' +
                            testCase.name + ' called multiple times');
                    }
                    // if error occurred, then fail testCase
                    if (error) {
                        testCase.status = 'failed';
                        console.error('\ntestCase ' + testCase.name + ' failed\n' +
                            error.message + '\n' + error.stack);
                        testCase.errorStack = testCase.errorStack ||
                            error.message + '\n' + error.stack;
                        // validate errorStack is non-empty
                        local.assert(
                            testCase.errorStack,
                            'invalid errorStack ' + testCase.errorStack
                        );
                    }
                    // if tests isDone, then do nothing
                    if (testCase.isDone) {
                        return;
                    }
                    testCase.isDone = true;
                    if (testCase.status === 'pending') {
                        testCase.status = 'passed';
                    }
                    // stop testCase timer
                    local.timeElapsedPoll(testCase);
                    console.error('[' + local.modeJs + ' test-case ' +
                        testPlatform.testCaseList.filter(function (testCase) {
                            return testCase.isDone;
                        }).length + ' of ' + testPlatform.testCaseList.length + ' ' +
                        testCase.status + '] - ' + testCase.name);
                    // if all testCase isDone, then create test-report
                    onParallel();
                };
                testCase = testCase.element;
                // init timerTimeout
                timerTimeout = local.onTimeout(onError, local.timeoutDefault, testCase.name);
                // increment number of tests remaining
                onParallel.counter += 1;
                // try to run testCase
                local.tryCatchOnError(function () {
                    // start testCase timer
                    local.timeElapsedStart(testCase);
                    testCase.onTestCase(null, onError);
                }, onError);
            }, function () {
            /*
             * this function will create the test-report after all tests isDone
             */
                local.ajaxProgressUpdate();
                // stop testPlatform timer
                local.timeElapsedPoll(testPlatform);
                // finalize testReport
                local.testReportMerge(testReport, {});
                switch (local.modeJs) {
                case 'browser':
                    // notify saucelabs of test results
                    // https://docs.saucelabs.com/reference/rest-api/
                    // #js-unit-testing
                    local.global.global_test_results = {
                        coverage: local.global.__coverage__,
                        failed: testReport.testsFailed,
                        testReport: testReport
                    };
                    break;
                case 'node':
                    // create test-report.json
                    local.fs.writeFileSync(
                        local.env.npm_config_dir_build + '/test-report.json',
                        JSON.stringify(testReport)
                    );
                    break;
                }
                setTimeout(function () {
                    // restore serverLog
                    local.serverLog = local._serverLog;
                    switch (local.modeJs) {
                    case 'browser':
                        // update coverageReport
                        local.istanbulCoverageReportCreate({
                            coverage: local.global.__coverage__
                        });
                        if (document.querySelector('#coverageReportDiv1')) {
                            document.querySelector('#coverageReportDiv1').innerHTML =
                                local.istanbul.coverageReportCreate({
                                    coverage: window.__coverage__
                                });
                        }
                        break;
                    case 'node':
                        // restore process.exit
                        process.exit = exit;
                        break;
                    }
                    // exit with number of tests failed
                    local.exit(testReport.testsFailed);
                // coverage-hack - wait 1000 ms for timerInterval
                }, 1000);
            });
        };

        local.testRunServer = function (options) {
        /*
         * this function will
         * 1. create server from local.middlewareList
         * 2. start server on local.env.PORT
         * 3. run tests
         */
            if (local.global.utility2_serverHttp1) {
                return;
            }
            local.onReadyBefore.counter += 1;
            // 1. create server from local.middlewareList
            local.middlewareList = local.middlewareList || [
                local.middlewareInit,
                local.middlewareForwardProxy,
                local.middlewareAssetsCached,
                local.middlewareJsonpStateInit
            ];
            local.serverLocalRequestHandler = function (request, response) {
                var self;
                self = {};
                local.onNext(self, function (error) {
                    if (error || self.modeNext >= local.middlewareList.length) {
                        // default to middlewareError
                        local.middlewareError(error, request, response);
                        return;
                    }
                    // recurse with next middleware in middlewareList
                    local.middlewareList[self.modeNext](
                        request,
                        response,
                        self.onNext
                    );
                });
                self.modeNext = -1;
                self.onNext();
            };
            local.global.utility2_serverHttp1 =
                local.http.createServer(local.serverLocalRequestHandler);
            // 2. start server on local.env.PORT
            console.error('server listening on http-port ' + local.env.PORT);
            local.onReadyBefore.counter += 1;
            local.global.utility2_serverHttp1.listen(local.env.PORT, local.onReadyBefore);
            // 3. run tests
            local.testRunDefault(options);
            local.onReadyBefore();
        };

        local.throwError = function () {
        /*
         * this function will throw an error
         */
            throw new Error();
        };

        local.timeElapsedPoll = function (options) {
        /*
         * this function will poll options.timeElapsed
         */
            options = local.timeElapsedStart(options);
            options.timeElapsed = Date.now() - options.timeStart;
            return options;
        };

        local.timeElapsedStart = function (options, timeStart) {
        /*
         * this function will start options.timeElapsed
         */
            options = options || {};
            options.timeStart = timeStart || options.timeStart || Date.now();
            return options;
        };

        local.tryCatchOnError = function (fnc, onError) {
        /*
         * this function will try to run the fnc in a try-catch block,
         * else call onError with the errorCaught
         */
            // validate onError
            local.assert(typeof onError === 'function', typeof onError);
            try {
                // reset errorCaught
                local._debugTryCatchErrorCaught = null;
                return fnc();
            } catch (errorCaught) {
                // debug errorCaught
                local._debugTryCatchErrorCaught = errorCaught;
                return onError(errorCaught);
            }
        };

        local.tryCatchReadFile = function (file, options) {
        /*
         * this function will try to read the file or return an empty string
         */
            var data;
            data = '';
            try {
                data = local.fs.readFileSync(file, options);
            } catch (ignore) {
            }
            return data;
        };

        local.uiAnimateSlideAccordian = function (element, elementList, callback) {
        /*
         * this function will slideDown the element,
         * and slideUp all other elements in elementList
         */
            elementList.forEach(function (element2) {
                if (element2 !== element) {
                    local.uiAnimateSlideUp(element2);
                }
            });
            local.uiAnimateSlideDown(element, callback);
        };

        local.uiAnimateSlideDown = function (element, callback) {
        /*
         * this function will slideDown the dom-element
         */
            callback = callback || local.nop;
            if (!(element &&
                    element.style && element.style.maxHeight !== '100%' &&
                    element.classList && element.classList.contains('uiAnimateSlide'))) {
                setTimeout(callback);
                return;
            }
            element.style.borderBottom = '';
            element.style.borderTop = '';
            element.style.marginBottom = '';
            element.style.marginTop = '';
            element.style.maxHeight = 1.5 * local.global.innerHeight + 'px';
            element.style.paddingBottom = '';
            element.style.paddingTop = '';
            setTimeout(function () {
                element.style.maxHeight = '100%';
                callback();
            }, 250);
        };

        local.uiAnimateSlideUp = function (element, callback) {
        /*
         * this function will slideUp the dom-element
         */
            callback = callback || local.nop;
            if (!(element &&
                    element.style && element.style.maxHeight !== '0px' &&
                    element.classList && element.classList.contains('uiAnimateSlide'))) {
                setTimeout(callback);
                return;
            }
            element.style.borderBottom = '0';
            element.style.borderTop = '0';
            element.style.marginBottom = '0';
            element.style.marginTop = '0';
            element.style.maxHeight = '0';
            element.style.paddingBottom = '0';
            element.style.paddingTop = '0';
            setTimeout(callback, 250);
        };

        local.urlParse = function (url) {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/URL
         * this function will parse the url according to the above spec, plus a query param
         */
            var urlParsed;
            urlParsed = {};
            // try to parse the url
            local.tryCatchOnError(function () {
                // resolve host-less url
                switch (local.modeJs) {
                case 'browser':
                    local.serverLocalHost = local.serverLocalHost ||
                        location.protocol + '//' + location.host;
                    // resolve absolute path
                    if (url[0] === '/') {
                        url = local.serverLocalHost + url;
                    // resolve relative path
                    } else if (!(/^\w+?:\/\//).test(url)) {
                        url = local.serverLocalHost +
                            location.pathname.replace((/\/[^\/]*?$/), '') + '/' + url;
                    }
                    urlParsed = new local.global.URL(url);
                    urlParsed.path = '/' + urlParsed.href
                        .split('/')
                        .slice(3)
                        .join('/')
                        .split('#')[0];
                    break;
                case 'node':
                    local.env.PORT = local.env.PORT || '8081';
                    local.serverLocalHost = local.serverLocalHost ||
                        ('http://127.0.0.1:' + local.env.PORT);
                    // resolve absolute path
                    if (url[0] === '/') {
                        url = local.serverLocalHost + url;
                    // resolve relative path
                    } else if (!(/^\w+?:\/\//).test(url)) {
                        url = local.serverLocalHost + '/' + url;
                    }
                    urlParsed = local.url.parse(url);
                    break;
                }
                // init query
                urlParsed.query = {};
                (urlParsed.search || '').slice(1).replace((/[^&]+/g), function (item) {
                    item = item.split('=');
                    item[0] = decodeURIComponent(item[0]);
                    item[1] = decodeURIComponent(item.slice(1).join('='));
                    // parse repeating query-param as an array
                    if (urlParsed.query[item[0]]) {
                        if (!Array.isArray(urlParsed.query[item[0]])) {
                            urlParsed.query[item[0]] = [urlParsed.query[item[0]]];
                        }
                        urlParsed.query[item[0]].push(item[1]);
                    } else {
                        urlParsed.query[item[0]] = item[1];
                    }
                });
            }, local.nop);
            // https://developer.mozilla.org/en/docs/Web/API/URL#Properties
            return {
                hash: urlParsed.hash || '',
                host: urlParsed.host || '',
                hostname: urlParsed.hostname || '',
                href: urlParsed.href || '',
                path: urlParsed.path || '',
                pathname: urlParsed.pathname || '',
                port: urlParsed.port || '',
                protocol: urlParsed.protocol || '',
                query: urlParsed.query || {},
                search: urlParsed.search || ''
            };
        };

        local.uuid4Create = function () {
        /*
         * this function will create a random uuid,
         * with format 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
         */
            // code derived from http://jsperf.com/uuid4
            var id, ii;
            id = '';
            for (ii = 0; ii < 32; ii += 1) {
                switch (ii) {
                case 8:
                case 20:
                    id += '-';
                    // coerce to finite integer
                    id += (Math.random() * 16 | 0).toString(16);
                    break;
                case 12:
                    id += '-';
                    id += '4';
                    break;
                case 16:
                    id += '-';
                    id += (Math.random() * 4 | 8).toString(16);
                    break;
                default:
                    // coerce to finite integer
                    id += (Math.random() * 16 | 0).toString(16);
                }
            }
            return id;
        };
    }());



    // run shared js-env code - init-after
    (function () {
        local.ajaxProgressCounter = 0;
        local.ajaxProgressState = 0;
        local.apidocCreate = local.apidoc.apidocCreate;
        local.cacheDict = {};
        local.contentTypeDict = {
            // application
            '.js': 'application/javascript; charset=UTF-8',
            '.json': 'application/json; charset=UTF-8',
            '.pdf': 'application/pdf',
            '.xml': 'application/xml; charset=UTF-8',
            // image
            '.bmp': 'image/bmp',
            '.gif': 'image/gif',
            '.jpeg': 'image/jpeg',
            '.jpg': 'image/jpeg',
            '.png': 'image/png',
            '.svg': 'image/svg+xml; charset=UTF-8',
            // text
            '.css': 'text/css; charset=UTF-8',
            '.htm': 'text/html; charset=UTF-8',
            '.html': 'text/html; charset=UTF-8',
            '.md': 'text/markdown; charset=UTF-8',
            '.txt': 'text/plain; charset=UTF-8'
        };
        // init env
        local.env = local.modeJs === 'browser'
            ? {}
            : process.env;
        local.objectSetDefault(local.env, {
            npm_package_nameAlias: (local.env.npm_package_name || '').replace((/\W/g), '_')
        });
        local.objectSetDefault(local.env, {
            npm_package_description: 'the greatest app in the world!',
            npm_package_name: 'my-app',
            npm_package_nameAlias: 'my_app',
            npm_package_version: '0.0.1'
        });
        local.errorDefault = new Error('default error');
        local.istanbulCoverageMerge = local.istanbul.coverageMerge || local.echo;
        local.istanbulCoverageMerge = local.istanbul.coverageMerge || local.echo;
        local.istanbulCoverageReportCreate = local.istanbul.coverageReportCreate || local.echo;
        local.istanbulInstrumentInPackage = local.istanbul.instrumentInPackage || local.echo;
        local.istanbulInstrumentSync = local.istanbul.instrumentSync || local.echo;
        local.jslintAndPrint = local.jslint.jslintAndPrint || local.echo;
        local.regexpEmailValidate = new RegExp(
            '^[a-zA-Z0-9.!#$%&\'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}' +
                '[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
        );
        // https://en.wikipedia.org/wiki/E.164
        local.regexpPhoneValidate =
            (/^(?:\+\d{1,3}[ \-]{0,1}){0,1}(?:\(\d{1,4}\)[ \-]{0,1}){0,1}\d[\d \-]{7,16}$/);
        local.regexpUriComponentCharset = (/[\w\!\%\'\(\)\*\-\.\~]/);
        local.regexpUuidValidate =
            (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
        local.stringAsciiCharset =
            '\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f' +
            '\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f' +
            ' !"#$%&\'()*+,-./0123456789:;<=>?' +
            '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_' +
            '`abcdefghijklmnopqrstuvwxyz{|}~\x7f';
        local.stringUriComponentCharset = '!%\'()*-.' +
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~';
        local.taskOnTaskDict = {};
        local.testReport = { testPlatformList: [{
            name: local.modeJs === 'browser'
                ? 'browser - ' + location.pathname + ' - ' + navigator.userAgent + ' - ' +
                    new Date().toISOString()
                : 'node - ' + process.platform + ' ' + process.version + ' - ' +
                    new Date().toISOString(),
            screenshot: local.env.MODE_BUILD_SCREENSHOT_IMG,
            testCaseList: []
        }] };
        local.uglify = local.uglifyjs.uglify || local.echo;
        // init serverLocalHost
        local.urlParse('');
        // init timeoutDefault
        switch (local.modeJs) {
        case 'browser':
            location.search.replace(
                (/\b(NODE_ENV|mode[A-Z]\w+|timeExit|timeoutDefault)=([^#&]+)/g),
                function (match0, key, value) {
                    match0 = decodeURIComponent(value);
                    local[key] = local.env[key] = match0;
                    // try to JSON.parse the string
                    local.tryCatchOnError(function () {
                        local[key] = JSON.parse(match0);
                    }, local.nop);
                }
            );
            break;
        case 'node':
            local.timeoutDefault = local.env.npm_config_timeout_default;
            break;
        }
        // init timeExit
        local.timeExit = Number(local.timeExit) ||
            Number(Date.now() + Number(local.env.npm_config_timeout_exit)) ||
            Number(local.env.npm_config_time_exit);
        if (local.timeExit) {
            local.timeoutDefault = local.timeExit - Date.now();
            setTimeout(local.exit, local.timeoutDefault);
        }
        // re-init timeoutDefault
        local.timeoutDefault = Number(local.timeoutDefault || 30000);
        local.onReadyAfter(local.nop);
    }());
    switch (local.modeJs) {



    // run browser js-env code - init-after
    case 'browser':
        // require modules
        local.http = local._http;
        local.https = local._http;
        break;



    // run node js-env code - init-after
    /* istanbul ignore next */
    case 'node':
        // require modules
        local.Module = require('module');
        local.child_process = require('child_process');
        local.cluster = require('cluster');
        local.events = require('events');
        local.fs = require('fs');
        local.http = require('http');
        local.https = require('https');
        local.net = require('net');
        local.path = require('path');
        local.repl = require('repl');
        local.stream = require('stream');
        local.url = require('url');
        local.vm = require('vm');
        local.zlib = require('zlib');
        // init env
        local.objectSetDefault(local.env, {
            npm_config_dir_build: process.cwd() + '/tmp/build',
            npm_config_dir_tmp: process.cwd() + '/tmp'
        });
        // merge previous test-report
        if (local.env.npm_config_file_test_report_merge) {
            local.testReportMerge(
                local.testReport,
                JSON.parse(local.tryCatchReadFile(
                    local.env.npm_config_file_test_report_merge,
                    'utf8'
                ) || '{}')
            );
            console.error('\n' + local.env.MODE_BUILD + ' - merged test-report from file ' +
                local.env.npm_config_file_test_report_merge);
        }
        // run the cli
        local.cliDict = {};
        local.cliDict['--eval'] = function () {
        /*
         * this function will eval the given string
         */
            local.global.local = local;
            local.vm.runInThisContext(process.argv[3]);
        };
        local.cliDict['-e'] = local.cliDict['--eval'];
        local.cliDict['--help'] = function () {
        /*
         * this function will print the help-menu
         */
            console.log('commands:');
            Object.keys(local.cliDict).forEach(function (key) {
                console.log('    ' + key + '\n        ' +
                    (/this function will (.*)/).exec(local.cliDict[key].toString())[1]);
            });
        };
        local.cliDict['--interactive'] = function () {
        /*
         * this function will start the repl
         */
            local.replStart();
            local.global.local = local;
        };
        local.cliDict['-i'] = local.cliDict['--interactive'];
        local.cliDict['cli.browserTest'] = function () {
        /*
         * this function will run browerTest
         */
            local.onParallelList({
                list: process.argv[3].split(/\s+/).filter(function (element) {
                    return element;
                })
            }, function (options, onParallel) {
                onParallel.counter += 1;
                local.browserTest({ url: options.element }, function () {
                    onParallel();
                });
            }, local.exit);
        };
        local.cliDict['cli.customOrgStarFilterNotBuilt'] = function () {
        /*
         * this function will filter customOrg
         */
            (function () {
                var options;
                options = {};
                options.dict = {};
                options.list = [];
                for (options.ii = Number(process.argv[3]);
                        options.ii < Number(process.argv[4]);
                        options.ii += 36) {
                    options.list.push(options.ii);
                }
                local.listShuffle(options.list);
                local.onParallelList(options, function (options2, onParallel) {
                    onParallel.counter += 1;
                    local.ajax({
                        url: 'https://www.npmjs.com/browse/star?offset=' + options2.element
                    }, function (error, xhr) {
                        // jslint-hack
                        local.nop(error);
                        console.error('cli.customOrgStarFilterNotBuilt - fetched ' + xhr.url);
                        (xhr.responseText || '').toLowerCase().replace((
                            /href=\"\/package\/(.+?)\"/g
                        ), function (match0, match1) {
                            match0 = local.env.GITHUB_ORG + '/node-' + local.env.GITHUB_ORG +
                                '-' + match1;
                            if (options.dict[match0]) {
                                return;
                            }
                            onParallel.counter += 1;
                            local.onParallelList({ list: [{
                                url: 'https://raw.githubusercontent.com/' + match0 +
                                    '/gh-pages/build..alpha..travis-ci.org' +
                                    '/screenshot.npmPackageListing.svg'
                            // }, {
                                // url: 'https://registry.npmjs.org/' + local.env.GITHUB_ORG +
                                    // '-' + match1
                            }] }, function (options2, onParallel) {
                                onParallel.counter += 1;
                                local.ajax(options2.element, function (error) {
                                    if (error && !options.dict[match0]) {
                                        options.dict[match0] = true;
                                        console.error(
                                            'cli.customOrgStarFilterNotBuilt - not built - ' +
                                                match0
                                        );
                                        console.log(match0);
                                    }
                                    onParallel();
                                });
                            }, function () {
                                onParallel();
                            });
                        });
                        onParallel();
                    });
                }, local.onErrorThrow);
            }());
        };
        local.cliDict['cli.dbTableCustomOrgCrudGetManyByQuery'] = function () {
        /*
         * this function will query dbTableCustomOrg
         */
            local.dbTableCustomOrgCreate(JSON.parse(process.argv[3] || '{}'), function (error) {
                // validate no error occurred
                local.assert(!error, error);
                console.log(local.dbTableCustomOrgCrudGetManyByQuery(
                    JSON.parse(process.argv[3] || '{}')
                )
                    .map(function (element) {
                        return element._id;
                    })
                    .join('\n'));
            });
        };
        local.cliDict['cli.dbTableCustomOrgUpdate'] = function () {
        /*
         * this function will update dbTableCustomOrg
         */
            local.dbTableCustomOrgUpdate(
                JSON.parse(process.argv[3] || '{}'),
                local.onErrorThrow
            );
        };
        local.cliDict['cli.onParallelListExec'] = function () {
        /*
         * this function will run in parallel the list of line-separated shell-commands
         */
            local.onParallelList({
                list: process.argv[3].split('\n').filter(function (element) {
                    return element.trim();
                }),
                rateLimit: process.argv[4],
                retryLimit: process.argv[5]
            }, function (options, onParallel) {
                onParallel.counter += 1;
                local.child_process.spawn('. ' + local.__dirname + '/lib.utility2.sh; ' +
                    options.element, { shell: true, stdio: ['ignore', 1, 2] })
                    .on('exit', function (exitCode) {
                        console.error('onParallelListExec - [' + (onParallel.ii + 1) +
                            ' of ' + options.list.length + '] exitCode ' + exitCode);
                        onParallel(exitCode && new Error(exitCode), options);
                    });
            }, local.exit);
        };
        local.cliDict['cli.testReportCreate'] = function () {
        /*
         * this function will create the test-report
         */
            local.exit(local.testReportCreate(local.tryCatchOnError(function () {
                return require(local.env.npm_config_dir_build + '/test-report.json');
            }, local.onErrorDefault)).testsFailed);
        };
        if (local.cliDict[process.argv[2]]) {
            local.cliDict[process.argv[2]]();
            if (!(/--interactive|-i/).test(process.argv[2])) {
                return;
            }
        }
        // override assets
        [
            'assets.index.css',
            'assets.index.template.html',
            'assets.swgg.swagger.json',
            'assets.swgg.swagger.server.json'
        ].forEach(function (file) {
            local.assetsDict['/' + file] = local.assetsDict['/' + file] || '';
            if (!local.fs.existsSync(file)) {
                return;
            }
            console.error('override assets ' + file);
            local.assetsDict['/' + file] = local.fs.readFileSync(file, 'utf8');
        });
        if (local.global.utility2_rollup) {
            local.assetsDict['/assets.utility2.rollup.js'] =
                local.fs.readFileSync(__filename, 'utf8')
                .split('\n/* script-end /assets.utility2.rollup.end.js */')[0] +
                '\n/* script-end /assets.utility2.rollup.end.js */\n';
            break;
        }
        // init assets
        [
            'lib.apidoc.js',
            'lib.db.js',
            'lib.github_crud.js',
            'lib.istanbul.js',
            'lib.jslint.js',
            'lib.sjcl.js',
            'lib.swgg.js',
            'lib.uglifyjs.js',
            'lib.utility2.js',
            'lib.utility2.sh'
        ].forEach(function (key) {
            switch (key) {
            case 'lib.apidoc.js':
            case 'lib.db.js':
            case 'lib.github_crud.js':
            case 'lib.istanbul.js':
            case 'lib.jslint.js':
            case 'lib.sjcl.js':
            case 'lib.uglifyjs.js':
                local.assetsDict['/assets.utility2.' + key] =
                    local.tryCatchReadFile(__dirname + '/' + key, 'utf8')
                        .replace((/^#!/), '//');
                break;
            case 'lib.swgg.js':
            case 'lib.utility2.js':
                key = key.replace('lib.', '');
                local.assetsDict['/assets.' + key] =
                    local.tryCatchReadFile(__dirname + '/lib.' + key, 'utf8')
                        .replace((/^#!/), '//');
                break;
            case 'lib.utility2.sh':
                local.jslintAndPrintConditional(
                    local.tryCatchReadFile(__dirname + '/' + key, 'utf8')
                        .replace((/^ *?#!\! .*$/gm), ''),
                    __dirname + '/' + key + '.html'
                );
                break;
            }
        });
        local.assetsDict['/assets.utility2.rollup.js'] = [
            'header',
            '/assets.utility2.rollup.begin.js',
            'lib.apidoc.js',
            'lib.db.js',
            'lib.github_crud.js',
            'lib.istanbul.js',
            'lib.jslint.js',
            'lib.sjcl.js',
            'lib.uglifyjs.js',
            'lib.utility2.js',
            'lib.swgg.js',
            '/assets.utility2.rollup.end.js'
        ].map(function (key) {
            var script;
            switch (key) {
            case 'header':
                return '/* this rollup was created with utility2 ' +
                    '(https://github.com/kaizhu256/node-utility2) */\n';
            case '/assets.utility2.rollup.begin.js':
            case '/assets.utility2.rollup.end.js':
                script = local.assetsDict[key];
                break;
            case 'lib.apidoc.js':
            case 'lib.db.js':
            case 'lib.github_crud.js':
            case 'lib.istanbul.js':
            case 'lib.jslint.js':
            case 'lib.sjcl.js':
            case 'lib.uglifyjs.js':
                key = '/assets.utility2.' + key;
                script = local.assetsDict[key];
                break;
            case 'lib.swgg.js':
            case 'lib.utility2.js':
                key = '/assets.' + key.replace('lib.', '');
                script = local.assetsDict[key];
                break;
            }
            return '/* script-begin ' + key + ' */\n' +
                script.trim() +
                '\n/* script-end ' + key + ' */\n';
        }).join('\n\n\n');
        // init lib
        [
            'swgg'
        ].forEach(function (lib) {
            var file;
            file = __dirname + '/lib.' + lib + '.js';
            if (local.fs.existsSync(file)) {
                local[lib] = require(file);
            }
        });
        break;
    }
}());
