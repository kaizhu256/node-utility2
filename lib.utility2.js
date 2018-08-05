#!/usr/bin/env node
/* istanbul instrument in package utility2 */
/* jslint-utility2 */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run shared js-env code - init-before
    /* istanbul ignore next */
    (function () {
        // init debug_inline
        (function () {
            var consoleError, context, key;
            context = (typeof window === "object" && window) || global;
            key = "debug_inline".replace("_i", "I");
            if (context[key]) {
                return;
            }
            consoleError = console.error;
            context[key] = function (arg0) {
            /*
             * this function will both print arg0 to stderr and return it
             */
                // debug arguments
                context["_" + key + "Arguments"] = arguments;
                consoleError("\n\n" + key);
                consoleError.apply(console, arguments);
                consoleError("\n");
                // return arg0 for inspection
                return arg0;
            };
        }());
        // init local
        local = {};
        // init isBrowser
        local.isBrowser = typeof window === "object" &&
            typeof window.XMLHttpRequest === "function" &&
            window.document &&
            typeof window.document.querySelectorAll === "function";
        // init global
        local.global = local.isBrowser
            ? window
            : global;
        // re-init local
        local = local.global.utility2_rollup ||
            // local.global.utility2_rollup_old || require('./assets.utility2.rollup.js') ||
            local;
        // init nop
        local.nop = function () {
        /*
         * this function will do nothing
         */
            return;
        };
        // init exports
        if (local.isBrowser) {
            local.global.utility2_utility2 = local;
        } else {
            // require builtins
            // local.assert = require('assert');
            local.buffer = require('buffer');
            local.child_process = require('child_process');
            local.cluster = require('cluster');
            local.console = require('console');
            local.constants = require('constants');
            local.crypto = require('crypto');
            local.dgram = require('dgram');
            local.dns = require('dns');
            local.domain = require('domain');
            local.events = require('events');
            local.fs = require('fs');
            local.http = require('http');
            local.https = require('https');
            local.module = require('module');
            local.net = require('net');
            local.os = require('os');
            local.path = require('path');
            local.process = require('process');
            local.punycode = require('punycode');
            local.querystring = require('querystring');
            local.readline = require('readline');
            local.repl = require('repl');
            local.stream = require('stream');
            local.string_decoder = require('string_decoder');
            local.timers = require('timers');
            local.tls = require('tls');
            local.tty = require('tty');
            local.url = require('url');
            local.util = require('util');
            local.v8 = require('v8');
            local.vm = require('vm');
            local.zlib = require('zlib');
            module.exports = local;
            module.exports.__dirname = __dirname;
        }
        // init lib main
        local.local = local.utility2 = local;



        /* validateLineSortedReset */
        // init lib utility2
        local.global.utility2 = local;
        // init lib extra
        [
            'apidoc',
            'db',
            'github_crud',
            'istanbul',
            'jslint',
            'marked',
            'sjcl',
            'uglifyjs'
        ].forEach(function (key) {
            try {
                local[key] = local.isBrowser
                    ? local.global['utility2_' + key]
                    : require('./lib.' + key + '.js');
            } catch (ignore) {
            }
            local[key] = local[key] || {};
        });
        // init assets and templates
        local.assetsDict = local.assetsDict || {};



/* jslint-ignore-begin */
local.assetsDict['/assets.index.template.html'] =
local.assetsDict['/assets.utility2.template.html'] = '\
<!doctype html>\n\
<html lang="en">\n\
<head>\n\
<meta charset="UTF-8">\n\
<meta name="viewport" content="width=device-width, initial-scale=1">\n\
<!-- "assets.utility2.template.html" -->\n\
<title>{{env.npm_package_name}} ({{env.npm_package_version}})</title>\n\
<style>\n\
/* jslint-utility2 */\n\
/*csslint\n\
*/\n\
/* jslint-ignore-begin */\n\
*,\n\
*:after,\n\
*:before {\n\
    box-sizing: border-box;\n\
}\n\
/* jslint-ignore-end */\n\
@keyframes uiAnimateShake {\n\
    0%, 50% {\n\
        transform: translateX(10px);\n\
    }\n\
    25%, 75% {\n\
        transform: translateX(-10px);\n\
    }\n\
    100% {\n\
        transform: translateX(0);\n\
    }\n\
}\n\
@keyframes uiAnimateSpin {\n\
    0% {\n\
        transform: rotate(0deg);\n\
    }\n\
    100% {\n\
        transform: rotate(360deg);\n\
    }\n\
}\n\
a {\n\
    overflow-wrap: break-word;\n\
}\n\
body {\n\
    background: #eef;\n\
    font-family: Arial, Helvetica, sans-serif;\n\
    margin: 0 40px;\n\
}\n\
body > div,\n\
body > form > div,\n\
body > form > input,\n\
body > form > pre,\n\
body > form > textarea,\n\
body > form > .button,\n\
body > input,\n\
body > pre,\n\
body > textarea,\n\
body > .button {\n\
    margin-bottom: 20px;\n\
}\n\
body > form > input,\n\
body > form > .button,\n\
body > input,\n\
body > .button {\n\
    width: 20rem;\n\
}\n\
body > form > textarea,\n\
body > textarea {\n\
    height: 10rem;\n\
    width: 100%;\n\
}\n\
body > textarea[readonly] {\n\
    background: #ddd;\n\
}\n\
code,\n\
pre,\n\
textarea {\n\
    font-family: Consolas, Menlo, monospace;\n\
    font-size: small;\n\
}\n\
pre {\n\
    overflow-wrap: break-word;\n\
    white-space: pre-wrap;\n\
}\n\
textarea {\n\
    overflow: auto;\n\
    white-space: pre;\n\
}\n\
.button {\n\
    background-color: #fff;\n\
    border: 1px solid;\n\
    border-bottom-color: rgb(186, 186, 186);\n\
    border-left-color: rgb(209, 209, 209);\n\
    border-radius: 4px;\n\
    border-right-color: rgb(209, 209, 209);\n\
    border-top-color: rgb(216, 216, 216);\n\
    color: #00d;\n\
    cursor: pointer;\n\
    display: inline-block;\n\
    font-family: Arial, Helvetica, sans-serif;\n\
    font-size: 12px;\n\
    font-style: normal;\n\
    font-weight: normal;\n\
    margin: 0;\n\
    padding: 2px 7px 3px 7px;\n\
    text-align: center;\n\
    text-decoration: underline;\n\
}\n\
.colorError {\n\
    color: #d00;\n\
}\n\
.uiAnimateShake {\n\
    animation-duration: 500ms;\n\
    animation-name: uiAnimateShake;\n\
}\n\
.uiAnimateSlide {\n\
    overflow-y: hidden;\n\
    transition: max-height ease-in 250ms, min-height ease-in 250ms, padding-bottom ease-in 250ms, padding-top ease-in 250ms;\n\
}\n\
.utility2FooterDiv {\n\
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
</head>\n\
<body>\n\
<div id="ajaxProgressDiv1" style="background: #d00; height: 2px; left: 0; margin: 0; padding: 0; position: fixed; top: 0; transition: background 500ms, width 1500ms; width: 0%; z-index: 1;"></div>\n\
<div class="uiAnimateSpin" style="animation: uiAnimateSpin 2s linear infinite; border: 5px solid #999; border-radius: 50%; border-top: 5px solid #7d7; display: none; height: 25px; vertical-align: middle; width: 25px;"></div>\n\
<script>\n\
/* jslint-utility2 */\n\
/*jslint\n\
    bitwise: true,\n\
    browser: true,\n\
    maxerr: 4,\n\
    maxlen: 100,\n\
    node: true,\n\
    nomen: true,\n\
    regexp: true,\n\
    stupid: true\n\
*/\n\
// init timerIntervalAjaxProgressUpdate\n\
(function () {\n\
/*\n\
 * this function will increment the ajax-progress-bar until the webpage has loaded\n\
 */\n\
    "use strict";\n\
    var ajaxProgressDiv1,\n\
        ajaxProgressState,\n\
        ajaxProgressUpdate;\n\
    if (window.timerIntervalAjaxProgressUpdate) {\n\
        return;\n\
    }\n\
    ajaxProgressDiv1 = document.querySelector("#ajaxProgressDiv1");\n\
    setTimeout(function () {\n\
        ajaxProgressDiv1.style.width = "25%";\n\
    });\n\
    ajaxProgressState = 0;\n\
    ajaxProgressUpdate = (window.local &&\n\
        window.local.ajaxProgressUpdate) || function () {\n\
        ajaxProgressDiv1.style.width = "100%";\n\
        setTimeout(function () {\n\
            ajaxProgressDiv1.style.background = "transparent";\n\
            setTimeout(function () {\n\
                ajaxProgressDiv1.style.width = "0%";\n\
            }, 500);\n\
        }, 1500);\n\
    };\n\
    window.timerIntervalAjaxProgressUpdate = setInterval(function () {\n\
        ajaxProgressState += 1;\n\
        ajaxProgressDiv1.style.width = Math.max(\n\
            100 - 75 * Math.exp(-0.125 * ajaxProgressState),\n\
            ajaxProgressDiv1.style.width.slice(0, -1) | 0\n\
        ) + "%";\n\
    }, 1000);\n\
    window.addEventListener("load", function () {\n\
        clearInterval(window.timerIntervalAjaxProgressUpdate);\n\
        ajaxProgressUpdate();\n\
    });\n\
}());\n\
// init domOnEventMediaHotkeys\n\
(function () {\n\
/*\n\
 * this function will add media-hotkeys to elements with class=".domOnEventMediaHotkeysInit"\n\
 */\n\
    "use strict";\n\
    var input, onEvent;\n\
    if (window.domOnEventMediaHotkeys) {\n\
        return;\n\
    }\n\
    onEvent = window.domOnEventMediaHotkeys = function (event) {\n\
        var media;\n\
        if (event === "init") {\n\
            Array.from(\n\
                document.querySelectorAll(".domOnEventMediaHotkeysInit")\n\
            ).forEach(function (media) {\n\
                media.classList.remove("domOnEventMediaHotkeysInit");\n\
                media.classList.add("domOnEventMediaHotkeys");\n\
                ["play", "pause", "seeking"].forEach(function (event) {\n\
                    media.addEventListener(event, onEvent);\n\
                });\n\
            });\n\
            return;\n\
        }\n\
        if (event.currentTarget.classList.contains("domOnEventMediaHotkeys")) {\n\
            window.domOnEventMediaHotkeysMedia1 = event.currentTarget;\n\
            window.domOnEventMediaHotkeysInput.focus();\n\
            return;\n\
        }\n\
        media = window.domOnEventMediaHotkeysMedia1;\n\
        try {\n\
            switch (event.key || event.type) {\n\
            case ",":\n\
            case ".":\n\
                media.currentTime += (event.key === "," && -0.03125) || 0.03125;\n\
                break;\n\
            case "<":\n\
            case ">":\n\
                media.playbackRate *= (event.key === "<" && 0.5) || 2;\n\
                break;\n\
            case "ArrowDown":\n\
            case "ArrowUp":\n\
                media.volume += (event.key === "ArrowDown" && -0.05) || 0.05;\n\
                break;\n\
            case "ArrowLeft":\n\
            case "ArrowRight":\n\
                media.currentTime += (event.key === "ArrowLeft" && -5) || 5;\n\
                break;\n\
            case "j":\n\
            case "l":\n\
                media.currentTime += (event.key === "j" && -10) || 10;\n\
                break;\n\
            case "k":\n\
            case " ":\n\
                if (media.paused) {\n\
                    media.play();\n\
                } else {\n\
                    media.pause();\n\
                }\n\
                break;\n\
            case "m":\n\
                media.muted = !media.muted;\n\
                break;\n\
            default:\n\
                if (event.key >= 0) {\n\
                    media.currentTime = 0.1 * event.key * media.duration;\n\
                    break;\n\
                }\n\
                return;\n\
            }\n\
        } catch (ignore) {\n\
        }\n\
        event.preventDefault();\n\
    };\n\
    input = window.domOnEventMediaHotkeysInput = document.createElement("button");\n\
    input.style = "border:0;height:0;margin:0;padding:0;position:fixed;width:0;z-index:-1;";\n\
    input.addEventListener("click", onEvent);\n\
    input.addEventListener("keydown", onEvent);\n\
    document.body.appendChild(input);\n\
    onEvent("init");\n\
}());\n\
// init domOnEventSelectAllWithinPre\n\
(function () {\n\
/*\n\
 * this function will limit select-all within <pre tabIndex="0"> elements\n\
 * https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse\n\
 */\n\
    "use strict";\n\
    if (window.domOnEventSelectAllWithinPre) {\n\
        return;\n\
    }\n\
    window.domOnEventSelectAllWithinPre = function (event) {\n\
        var range, selection;\n\
        if (event &&\n\
                event.key === "a" &&\n\
                (event.ctrlKey || event.metaKey) &&\n\
                event.target.closest("pre")) {\n\
            range = document.createRange();\n\
            range.selectNodeContents(event.target.closest("pre"));\n\
            selection = window.getSelection();\n\
            selection.removeAllRanges();\n\
            selection.addRange(range);\n\
            event.preventDefault();\n\
        }\n\
    };\n\
    document.addEventListener("keydown", window.domOnEventSelectAllWithinPre);\n\
}());\n\
</script>\n\
<h1>\n\
<!-- utility2-comment\n\
    <a\n\
        {{#if env.npm_package_homepage}}\n\
        href="{{env.npm_package_homepage}}"\n\
        {{/if env.npm_package_homepage}}\n\
        target="_blank"\n\
    >\n\
utility2-comment -->\n\
        {{env.npm_package_name}} ({{env.npm_package_version}})\n\
<!-- utility2-comment\n\
    </a>\n\
utility2-comment -->\n\
</h1>\n\
<h3>{{env.npm_package_description}}</h3>\n\
<!-- utility2-comment\n\
<a class="button" download href="assets.app.js">download standalone app</a><br>\n\
<button class="button onclick onreset" id="testRunButton1">run internal test</button><br>\n\
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
<script src="assets.{{env.npm_package_nameLib}}.js"></script>\n\
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
this script will run a web-demo of jslint-lite\n\
\n\
instruction\n\
    1. save this script as example.js\n\
    2. run the shell command:\n\
        $ npm install jslint-lite && PORT=8081 node example.js\n\
    3. open a browser to http://127.0.0.1:8081 and play with the web-demo\n\
    4. edit this script to suit your needs\n\
*/\n\
\n\
\n\
\n\
/* istanbul instrument in package jslint */\n\
/* jslint-utility2 */\n\
/*jslint\n\
    bitwise: true,\n\
    browser: true,\n\
    maxerr: 4,\n\
    maxlen: 100,\n\
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
        // init isBrowser\n\
        local.isBrowser = typeof window === "object" &&\n\
            typeof window.XMLHttpRequest === "function" &&\n\
            window.document &&\n\
            typeof window.document.querySelectorAll === "function";\n\
        // init global\n\
        local.global = local.isBrowser\n\
            ? window\n\
            : global;\n\
        // re-init local\n\
        local = local.global.utility2_rollup || (local.isBrowser\n\
            ? local.global.utility2_jslint\n\
            : require(\'jslint-lite\'));\n\
        // init exports\n\
        local.global.local = local;\n\
    }());\n\
\n\
\n\
\n\
    // run browser js\-env code - init-test\n\
    /* istanbul ignore next */\n\
    (function () {\n\
        if (!local.isBrowser) {\n\
            return;\n\
        }\n\
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
                    document.querySelector(\'#testRunButton1\').textContent = \'hide internal test\';\n\
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
    }());\n\
\n\
\n\
\n\
    // run node js\-env code - init-test\n\
    /* istanbul ignore next */\n\
    (function () {\n\
        if (local.isBrowser) {\n\
            return;\n\
        }\n\
        // init exports\n\
        module.exports = local;\n\
        // require builtins\n\
        // local.assert = require(\'assert\');\n\
        local.buffer = require(\'buffer\');\n\
        local.child_process = require(\'child_process\');\n\
        local.cluster = require(\'cluster\');\n\
        local.console = require(\'console\');\n\
        local.constants = require(\'constants\');\n\
        local.crypto = require(\'crypto\');\n\
        local.dgram = require(\'dgram\');\n\
        local.dns = require(\'dns\');\n\
        local.domain = require(\'domain\');\n\
        local.events = require(\'events\');\n\
        local.fs = require(\'fs\');\n\
        local.http = require(\'http\');\n\
        local.https = require(\'https\');\n\
        local.module = require(\'module\');\n\
        local.net = require(\'net\');\n\
        local.os = require(\'os\');\n\
        local.path = require(\'path\');\n\
        local.process = require(\'process\');\n\
        local.punycode = require(\'punycode\');\n\
        local.querystring = require(\'querystring\');\n\
        local.readline = require(\'readline\');\n\
        local.repl = require(\'repl\');\n\
        local.stream = require(\'stream\');\n\
        local.string_decoder = require(\'string_decoder\');\n\
        local.timers = require(\'timers\');\n\
        local.tls = require(\'tls\');\n\
        local.tty = require(\'tty\');\n\
        local.url = require(\'url\');\n\
        local.util = require(\'util\');\n\
        local.v8 = require(\'v8\');\n\
        local.vm = require(\'vm\');\n\
        local.zlib = require(\'zlib\');\n\
        /* validateLineSortedReset */\n\
        // init assets\n\
        local.assetsDict = local.assetsDict || {};\n\
        [\n\
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
        /* jslint-ignore-begin */\n\
        local.assetsDict[\'/assets.index.template.html\'] = \'\\\n\
' + local.assetsDict['/assets.index.template.html'].replace((/\n/g), '\\n\\\n') + '\';\n\
        /* jslint-ignore-end */\n\
        /* validateLineSortedReset */\n\
        /* jslint-ignore-begin */\n\
        // bug-workaround - long $npm_package_buildCustomOrg\n\
        local.assetsDict[\'/assets.jslint.js\'] =\n\
            local.assetsDict[\'/assets.jslint.js\'] ||\n\
            local.fs.readFileSync(local.__dirname + \'/lib.jslint.js\', \'utf8\'\n\
        ).replace((/^#!\\//), \'// \');\n\
        /* jslint-ignore-end */\n\
        /* validateLineSortedReset */\n\
        local.assetsDict[\'/\'] =\n\
            local.assetsDict[\'/assets.example.html\'] =\n\
            local.assetsDict[\'/assets.index.template.html\']\n\
            .replace((/\\{\\{env\\.(\\w+?)\\}\\}/g), function (match0, match1) {\n\
                switch (match1) {\n\
                case \'npm_package_description\':\n\
                    return \'the greatest app in the world!\';\n\
                case \'npm_package_name\':\n\
                    return \'my-app\';\n\
                case \'npm_package_nameLib\':\n\
                    return \'my_app\';\n\
                case \'npm_package_version\':\n\
                    return \'0.0.1\';\n\
                default:\n\
                    return match0;\n\
                }\n\
            });\n\
        // init cli\n\
        if (module !== require.main || local.global.utility2_rollup) {\n\
            return;\n\
        }\n\
        local.assetsDict[\'/assets.example.js\'] =\n\
            local.assetsDict[\'/assets.example.js\'] ||\n\
            local.fs.readFileSync(__filename, \'utf8\');\n\
        local.assetsDict[\'/favicon.ico\'] = local.assetsDict[\'/favicon.ico\'] || \'\';\n\
        // if $npm_config_timeout_exit exists,\n\
        // then exit this process after $npm_config_timeout_exit ms\n\
        if (Number(process.env.npm_config_timeout_exit)) {\n\
            setTimeout(process.exit, Number(process.env.npm_config_timeout_exit));\n\
        }\n\
        // start server\n\
        if (local.global.utility2_serverHttp1) {\n\
            return;\n\
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
    }());\n\
}());\n\
';



local.assetsDict['/assets.lib.template.js'] = '\
#!/usr/bin/env node\n\
/* istanbul instrument in package jslint */\n\
/* jslint-utility2 */\n\
/*jslint\n\
    bitwise: true,\n\
    browser: true,\n\
    maxerr: 4,\n\
    maxlen: 100,\n\
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
    /* istanbul ignore next */\n\
    (function () {\n\
        // init debug_inline\n\
        (function () {\n\
            var consoleError, context, key;\n\
            context = (typeof window === "object" && window) || global;\n\
            key = "debug_inline".replace("_i", "I");\n\
            if (context[key]) {\n\
                return;\n\
            }\n\
            consoleError = console.error;\n\
            context[key] = function (arg0) {\n\
            /*\n\
             * this function will both print arg0 to stderr and return it\n\
             */\n\
                // debug arguments\n\
                context["_" + key + "Arguments"] = arguments;\n\
                consoleError("\\n\\n" + key);\n\
                consoleError.apply(console, arguments);\n\
                consoleError("\\n");\n\
                // return arg0 for inspection\n\
                return arg0;\n\
            };\n\
        }());\n\
        // init local\n\
        local = {};\n\
        // init isBrowser\n\
        local.isBrowser = typeof window === "object" &&\n\
            typeof window.XMLHttpRequest === "function" &&\n\
            window.document &&\n\
            typeof window.document.querySelectorAll === "function";\n\
        // init global\n\
        local.global = local.isBrowser\n\
            ? window\n\
            : global;\n\
        // re-init local\n\
        local = local.global.utility2_rollup ||\n\
            // local.global.utility2_rollup_old || require(\'./assets.utility2.rollup.js\') ||\n\
            local;\n\
        // init nop\n\
        local.nop = function () {\n\
        /*\n\
         * this function will do nothing\n\
         */\n\
            return;\n\
        };\n\
        // init exports\n\
        if (local.isBrowser) {\n\
            local.global.utility2_jslint = local;\n\
        } else {\n\
            // require builtins\n\
            // local.assert = require(\'assert\');\n\
            local.buffer = require(\'buffer\');\n\
            local.child_process = require(\'child_process\');\n\
            local.cluster = require(\'cluster\');\n\
            local.console = require(\'console\');\n\
            local.constants = require(\'constants\');\n\
            local.crypto = require(\'crypto\');\n\
            local.dgram = require(\'dgram\');\n\
            local.dns = require(\'dns\');\n\
            local.domain = require(\'domain\');\n\
            local.events = require(\'events\');\n\
            local.fs = require(\'fs\');\n\
            local.http = require(\'http\');\n\
            local.https = require(\'https\');\n\
            local.module = require(\'module\');\n\
            local.net = require(\'net\');\n\
            local.os = require(\'os\');\n\
            local.path = require(\'path\');\n\
            local.process = require(\'process\');\n\
            local.punycode = require(\'punycode\');\n\
            local.querystring = require(\'querystring\');\n\
            local.readline = require(\'readline\');\n\
            local.repl = require(\'repl\');\n\
            local.stream = require(\'stream\');\n\
            local.string_decoder = require(\'string_decoder\');\n\
            local.timers = require(\'timers\');\n\
            local.tls = require(\'tls\');\n\
            local.tty = require(\'tty\');\n\
            local.url = require(\'url\');\n\
            local.util = require(\'util\');\n\
            local.v8 = require(\'v8\');\n\
            local.vm = require(\'vm\');\n\
            local.zlib = require(\'zlib\');\n\
            module.exports = local;\n\
            module.exports.__dirname = __dirname;\n\
        }\n\
        // init lib main\n\
        local.local = local.jslint = local;\n\
\n\
\n\
\n\
        /* validateLineSortedReset */\n\
        return;\n\
    }());\n\
}());\n\
';



local.assetsDict['/assets.readme.template.md'] = '\
# jslint-lite\n\
the greatest app in the world!\n\
\n\
# live web demo\n\
- [https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/app](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/app)\n\
\n\
[![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployGithub.browser.%252Fnode-jslint-lite%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/app)\n\
\n\
\n\
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
# documentation\n\
#### cli help\n\
![screenshot](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.npmPackageCliHelp.svg)\n\
\n\
#### api doc\n\
- [https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/apidoc.html](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/apidoc.html)\n\
\n\
[![apidoc](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/apidoc.html)\n\
\n\
#### swagger doc\n\
- [https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/app/assets.swgg.html](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/app/assets.swgg.html)\n\
\n\
[![swaggerdoc](https://kaizhu256.github.io/node-jslint-lite/build/screenshot.deployGithub.browser.%252Fnode-jslint-lite%252Fbuild%252Fapp%252Fassets.swgg.html.png)](https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/app/assets.swgg.html)\n\
\n\
#### todo\n\
- none\n\
\n\
#### changelog 0.0.1\n\
- npm publish 0.0.1\n\
- update build\n\
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
# this shell script will download and run a web-demo of jslint-lite as a standalone app\n\
\n\
# 1. download standalone app\n\
curl -O https://kaizhu256.github.io/node-jslint-lite/build..beta..travis-ci.org/app/assets.app.js\n\
# 2. run standalone app\n\
PORT=8081 node ./assets.app.js\n\
# 3. open a browser to http://127.0.0.1:8081 and play with the web-demo\n\
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
    "nameAliasPublish": "",\n\
    "os": [\n\
        "darwin",\n\
        "linux"\n\
    ],\n\
    "repository": {\n\
        "type": "git",\n\
        "url": "https://github.com/kaizhu256/node-jslint-lite.git"\n\
    },\n\
    "scripts": {\n\
        "build-ci": "./npm_scripts.sh",\n\
        "env": "env",\n\
        "eval": "./npm_scripts.sh",\n\
        "heroku-postbuild": "./npm_scripts.sh",\n\
        "postinstall": "./npm_scripts.sh",\n\
        "start": "./npm_scripts.sh",\n\
        "test": "./npm_scripts.sh",\n\
        "utility2": "./npm_scripts.sh"\n\
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
shBuildCiAfter () {(set -e\n\
    # shDeployCustom\n\
    shDeployGithub\n\
    # shDeployHeroku\n\
    shReadmeTest example.sh\n\
)}\n\
\n\
shBuildCiBefore () {(set -e\n\
    # shNpmTestPublished\n\
    shReadmeTest example.js\n\
)}\n\
\n\
# run shBuildCi\n\
eval "$(utility2 source)"\n\
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
[{{env.npm_package_name}} ({{env.npm_package_version}})]({{env.npm_package_homepage}}) \
{{#unless env.npm_package_homepage}} \
{{env.npm_package_name}} ({{env.npm_package_version}}) \
{{/if env.npm_package_homepage}} \
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
{{packageJson jsonStringify4 markdownSafe}}\n\
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
[{{env.npm_package_name}} ({{env.npm_package_version}})]({{env.npm_package_homepage}}) \
{{#unless env.npm_package_homepage}} \
{{env.npm_package_name}} ({{env.npm_package_version}}) \
{{/if env.npm_package_homepage}} \
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
{{packageJson jsonStringify4 markdownSafe}}\n\
```\n\
\n\
\n\
\n\
# misc\n\
- this document was created with [utility2](https://github.com/kaizhu256/node-utility2)\n\
';



local.assetsDict['/assets.readmeCustomOrg.swgg.template.md'] = '\
# swgg-github-misc\n\
this zero-dependency package will provide a (nodejs-compatible) swagger-client for github-misc\'s web-apis, with a working web-demo\n\
\n\
# live web demo\n\
- [https://kaizhu256.github.io/node-swgg-github-misc/build..beta..travis-ci.org/app](https://kaizhu256.github.io/node-swgg-github-misc/build..beta..travis-ci.org/app)\n\
\n\
[![screenshot](https://kaizhu256.github.io/node-swgg-github-misc/build/screenshot.deployGithub.browser.%252Fnode-swgg-github-misc%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-swgg-github-misc/build..beta..travis-ci.org/app)\n\
\n\
\n\
\n\
# cdn download\n\
- [https://kaizhu256.github.io/node-swgg-github-misc/build..beta..travis-ci.org/app/assets.swgg.swagger.json](https://kaizhu256.github.io/node-swgg-github-misc/build..beta..travis-ci.org/app/assets.swgg.swagger.json)\n\
\n\
\n\
\n\
#### todo\n\
- none\n\
\n\
#### changelog 0.0.1\n\
- npm publish 0.0.1\n\
- update build\n\
- none\n\
\n\
#### this package requires\n\
- darwin or linux os\n\
\n\
\n\
\n\
# quickstart example.js\n\
[![screenshot](https://kaizhu256.github.io/node-swgg-github-misc/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-swgg-github-misc/build/app/assets.example.html)\n\
\n\
#### to run this example, follow the instruction in the script below\n\
- [example.js](https://kaizhu256.github.io/node-swgg-github-misc/build..beta..travis-ci.org/example.js)\n\
```javascript\n\
/*\n\
example.js\n\
\n\
this script will run a web-demo of swgg-github-misc\n\
\n\
instruction\n\
    1. save this script as example.js\n\
    2. run the shell command:\n\
        $ npm install swgg-github-misc && PORT=8081 node example.js\n\
    3. open a browser to http://127.0.0.1:8081 and play with the web-demo\n\
    4. edit this script to suit your needs\n\
*/\n\
\n\
\n\
\n\
/* istanbul instrument in package swgg_github_misc */\n\
/* jslint-utility2 */\n\
/*jslint\n\
    bitwise: true,\n\
    browser: true,\n\
    maxerr: 4,\n\
    maxlen: 100,\n\
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
        // init isBrowser\n\
        local.isBrowser = typeof window === "object" &&\n\
            typeof window.XMLHttpRequest === "function" &&\n\
            window.document &&\n\
            typeof window.document.querySelectorAll === "function";\n\
        // init global\n\
        local.global = local.isBrowser\n\
            ? window\n\
            : global;\n\
        // re-init local\n\
        local = local.global.utility2_rollup || (local.isBrowser\n\
            ? local.global.utility2_swgg_github_misc\n\
            : require(\'swgg-github-misc\'));\n\
        // init exports\n\
        local.global.local = local;\n\
        // init assets\n\
        local.assetsDict[\'/assets.index.template.html\'] = local.assetsDict[\'/assets.swgg.html\'];\n\
    }());\n\
\n\
\n\
\n\
    // run browser js\-env code - init-test\n\
    (function () {\n\
        if (!local.isBrowser) {\n\
            return;\n\
        }\n\
    }());\n\
}());\n\
```\n\
\n\
#### output from browser\n\
[![screenshot](https://kaizhu256.github.io/node-swgg-github-misc/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-swgg-github-misc/build/app/assets.example.html)\n\
\n\
#### output from shell\n\
![screenshot](https://kaizhu256.github.io/node-swgg-github-misc/build/screenshot.testExampleJs.svg)\n\
\n\
\n\
\n\
# package.json\n\
```json\n\
{\n\
    "githubRepoAlias": "swgg-io/node-swgg-github-misc",\n\
    "keywords": [\n\
        "github-misc",\n\
        "swagger-client"\n\
    ],\n\
    "name": "swgg-github-misc",\n\
    "swggAll": "github-all",\n\
    "swggTags0": "github-misc",\n\
    "version": "0.0.1"\n\
}\n\
```\n\
\n\
\n\
\n\
    # shDeployCustom\n\
    shDeployGithub\n\
    # shDeployHeroku\n\
    # shNpmTestPublished\n\
';



local.assetsDict['/assets.test.template.js'] = '\
/* istanbul instrument in package jslint */\n\
/* jslint-utility2 */\n\
/*jslint\n\
    bitwise: true,\n\
    browser: true,\n\
    maxerr: 4,\n\
    maxlen: 100,\n\
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
        // init isBrowser\n\
        local.isBrowser = typeof window === "object" &&\n\
            typeof window.XMLHttpRequest === "function" &&\n\
            window.document &&\n\
            typeof window.document.querySelectorAll === "function";\n\
        // init global\n\
        local.global = local.isBrowser\n\
            ? window\n\
            : global;\n\
        // re-init local\n\
        local = local.global.local = (local.global.utility2 ||\n\
            require(\'utility2\')).requireReadme();\n\
        // init test\n\
        local.testRunInit(local);\n\
    }());\n\
\n\
\n\
\n\
    // run shared js\-env code - function\n\
    (function () {\n\
        return;\n\
    }());\n\
}());\n\
';



local.assetsDict['/assets.testReport.template.html'] =
    local.assetsDict['/assets.utility2.template.html']
    .replace('assets.utility2.template.html', '')
    .replace((/<title>.*?<\/title>/), '<title>test-report</title>')
    .replace('</style>\n', '\
<style>\n\
/* jslint-utility2 */\n\
/*csslint\n\
*/\n\
.testReportDiv img {\n\
    border: 1px solid black;\n\
    margin: 5px 0 5px 0;\n\
    max-height: 256px;\n\
    max-width: 512px;\n\
}\n\
.testReportDiv pre {\n\
    background: #fdd;\n\
    border-top: 1px solid black;\n\
    margin-bottom: 0;\n\
    padding: 10px;\n\
}\n\
.testReportDiv span {\n\
    display: inline-block;\n\
    width: 120px;\n\
}\n\
.testReportDiv table {\n\
    border-top: 1px solid black;\n\
    text-align: left;\n\
    width: 100%;\n\
}\n\
.testReportDiv table > tbody > tr:nth-child(odd) {\n\
    background: #bfb;\n\
}\n\
.testReportDiv .displayNone {\n\
    display: none;\n\
}\n\
.testReportDiv .footer {\n\
    text-align: center;\n\
}\n\
.testReportDiv .platform {\n\
    background: #fff;\n\
    border: 1px solid black;\n\
    margin-bottom: 20px;\n\
    padding: 0 10px 10px 10px;\n\
    text-align: left;\n\
}\n\
.testReportDiv .summary {\n\
    background: #bfb;\n\
}\n\
.testReportDiv .testFailed {\n\
    background: #f99;\n\
}\n\
.testReportDiv .testPending {\n\
    background: #99f;\n\
}\n\
</style>\n\
'.replace('<style>\n', ''))
    .replace((/<\/script>[\S\s]*?<\/body>/), '\
</script>\n\
<div class="testReportDiv">\n\
<h1>test-report for\n\
    <a\n\
        {{#if env.npm_package_homepage}}\n\
        href="{{env.npm_package_homepage}}"\n\
        {{/if env.npm_package_homepage}}\n\
    >\n\
        {{env.npm_package_name}} ({{env.npm_package_version}})\n\
    </a>\n\
</h1>\n\
<div class="platform summary">\n\
<h2>summary</h2>\n\
<h4>\n\
    <span>version</span>-\n\
        {{env.npm_package_version}}<br>\n\
    <span>test date</span>- {{date}}<br>\n\
    <span>commit info</span>-\n\
        {{#if env.CI_COMMIT_INFO}}\n\
        {{env.CI_COMMIT_INFO}}<br>\n\
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
<div class="platform">\n\
<h4>\n\
    {{testPlatformNumber}}. {{name}}<br>\n\
    {{#if screenshot}}\n\
    <a href="{{screenshot encodeURIComponent}}">\n\
        <img alt="{{screenshot encodeURIComponent}}" src="{{screenshot encodeURIComponent}}">\n\
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
<pre class="{{preClass}}" tabIndex="0">\n\
{{#each errorStackList}}\n\
{{errorStack}}\n\
{{/each errorStackList}}\n\
</pre>\n\
</div>\n\
{{/each testPlatformList}}\n\
<div class="footer">\n\
    [ this document was created with\n\
    <a href="https://github.com/kaizhu256/node-utility2" target="_blank">utility2</a>\n\
    ]\n\
</div>\n\
</div>\n\
</body>');



// https://img.shields.io/badge/tests_failed-999-dd0000.svg?style=flat
local.assetsDict['/assets.testReportBadge.template.svg'] =
'<svg xmlns="http://www.w3.org/2000/svg" width="103" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="103" height="20" fill="#555"/><rect rx="0" x="72" width="31" height="20" fill="#d00"/><path fill="#d00" d="M72 0h4v20h-4z"/><rect rx="0" width="103" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="37" y="15" fill="#010101" fill-opacity=".3">tests failed</text><text x="37" y="14">tests failed</text><text x="86.5" y="15" fill="#010101" fill-opacity=".3">999</text><text x="86.5" y="14">999</text></g></svg>';



local.assetsDict['/assets.utility2.rollup.begin.js'] = '\
/* utility2.rollup.js begin */\n\
/* istanbul ignore all */\n\
/* jslint-utility2 */\n\
/*jslint\n\
    bitwise: true,\n\
    browser: true,\n\
    maxerr: 4,\n\
    maxlen: 100,\n\
    node: true,\n\
    nomen: true,\n\
    regexp: true,\n\
    stupid: true\n\
*/\n\
(function () {\n\
    "use strict";\n\
    var local;\n\
    local = {};\n\
    // init isBrowser\n\
    local.isBrowser = typeof window === "object" &&\n\
        typeof window.XMLHttpRequest === "function" &&\n\
        window.document &&\n\
        typeof window.document.querySelectorAll === "function";\n\
    // init global\n\
    local.global = local.isBrowser\n\
        ? window\n\
        : global;\n\
    local.local = local.global.utility2_rollup = local.global.utility2_rollup_old || local;\n\
    local.global.utility2_rollup_old = null;\n\
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
    // init isBrowser\n\
    local.isBrowser = typeof window === "object" &&\n\
        typeof window.XMLHttpRequest === "function" &&\n\
        window.document &&\n\
        typeof window.document.querySelectorAll === "function";\n\
    // init global\n\
    local.global = local.isBrowser\n\
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
        local.Blob = local.isBrowser
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
         * The FormData(form) constructor must run these steps:
         * 1. Let fd be a new FormData object.
         * 2. If form is given, set fd's entries to the result
         *    of constructing the form data set for form. (not implemented)
         * 3. Return fd.
         * https://xhr.spec.whatwg.org/#dom-formdata
         */
            this.entryList = [];
        };

        local.FormData.prototype.append = function (name, value, filename) {
        /*
         * The append(name, value, filename) method, when invoked, must run these steps:
         * 1. If the filename argument is given, set value to a new File object
         *    whose contents are value and name is filename.
         * 2. Append a new entry whose name is name, and value is value,
         *    to context object's list of entries.
         * https://xhr.spec.whatwg.org/#dom-formdata-append
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
         * https://tools.ietf.org/html/rfc7578
         */
            var boundary, result;
            // handle null-case
            if (!this.entryList.length) {
                onError(null, local.bufferCreate());
                return;
            }
            // init boundary
            boundary = '--' + Date.now().toString(16) + Math.random().toString(16);
            // init result
            result = [];
            local.onParallelList({
                list: this.entryList
            }, function (options2, onParallel) {
                var value;
                value = options2.element.value;
                if (!(value instanceof local.Blob)) {
                    result[options2.ii] = [boundary +
                        '\r\nContent-Disposition: form-data; name="' + options2.element.name +
                        '"\r\n\r\n', value, '\r\n'];
                    onParallel.counter += 1;
                    onParallel();
                    return;
                }
                // read from blob in parallel
                onParallel.counter += 1;
                local.blobRead(value, 'binary', function (error, data) {
                    result[options2.ii] = !error && [boundary +
                        '\r\nContent-Disposition: form-data; name="' + options2.element.name +
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
         * An IncomingMessage object is created by http.Server or http.ClientRequest
         * and passed as the first argument to the 'request' and 'response' event respectively.
         * It may be used to access response status, headers and data.
         * https://nodejs.org/dist/v0.12.18/docs/api/all.html#all_http_incomingmessage
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
         * Adds a listener to the end of the listeners array for the specified event.
         * No checks are made to see if the listener has already been added.
         * Multiple calls passing the same combination of event and listener will result
         * in the listener being added multiple times.
         * https://nodejs.org/dist/v0.12.18/docs/api/all.html#all_emitter_addlistener_event_listener
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
         * Execute each of the listeners in order with the supplied arguments.
         * https://nodejs.org/dist/v0.12.18/docs/api/all.html#all_emitter_emit_event_arg1_arg2
         */
            event = new local.global.Event(event);
            event.data = data;
            this.onEvent.dispatchEvent(event);
        };

        /*
         * Adds a listener to the end of the listeners array for the specified event.
         * No checks are made to see if the listener has already been added.
         * Multiple calls passing the same combination of event and listener will result
         * in the listener being added multiple times.
         * https://nodejs.org/dist/v0.12.18/docs/api/all.html#all_emitter_on_event_listener
         */
        local._http.IncomingMessage.prototype.on =
            local._http.IncomingMessage.prototype.addListener;

        local._http.IncomingMessage.prototype.pipe = function (writable) {
        /*
         * This method pulls all the data out of a readable stream, and writes it
         * to the supplied destination, automatically managing the flow
         * so that the destination is not overwhelmed by a fast readable stream.
         * https://nodejs.org/dist/v0.12.18/docs/api/all.html#all_readable_pipe_destination_options
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
         * This object is created internally by a HTTP server--not by the user.
         * It is passed as the second parameter to the 'request' event.
         * https://nodejs.org/dist/v0.12.18/docs/api/all.html#all_class_http_serverresponse
         */
            this.chunkList = [];
            this.headers = {};
            this.onEvent = document.createDocumentFragment();
            this.onResponse = onResponse;
            this.statusCode = 200;
        };

        /*
         * Adds a listener to the end of the listeners array for the specified event.
         * No checks are made to see if the listener has already been added.
         * Multiple calls passing the same combination of event and listener will result
         * in the listener being added multiple times.
         * https://nodejs.org/dist/v0.12.18/docs/api/all.html#all_emitter_addlistener_event_listener
         */
        local._http.ServerResponse.prototype.addListener =
            local._http.IncomingMessage.prototype.addListener;
        /*
         * Execute each of the listeners in order with the supplied arguments.
         * https://nodejs.org/dist/v0.12.18/docs/api/all.html#all_emitter_emit_event_arg1_arg2
         */
        local._http.ServerResponse.prototype.emit = local._http.IncomingMessage.prototype.emit;

        local._http.ServerResponse.prototype.end = function (data) {
        /*
         * This method signals to the server that all of the response headers and body
         * have been sent; that server should consider this message complete.
         * The method, response.end(), MUST be called on each response.
         * https://nodejs.org/dist/v0.12.18/docs/api/all.html#all_response_end_data_encoding_callback
         */
            // emit writable events
            this.chunkList.push(data || '');
            this.emit('finish');
            // emit readable events
            this.onResponse(this);
            this.emit('data', local.bufferConcat(this.chunkList));
            this.emit('end');
        };

        /*
         * Adds a listener to the end of the listeners array for the specified event.
         * No checks are made to see if the listener has already been added.
         * Multiple calls passing the same combination of event and listener will result
         * in the listener being added multiple times.
         * https://nodejs.org/dist/v0.12.18/docs/api/all.html#all_emitter_on_event_listener
         */
        local._http.ServerResponse.prototype.on = local._http.IncomingMessage.prototype.addListener;

        /*
         * Sets a single header value for implicit headers. If this header already exists
         * in the to-be-sent headers, its value will be replaced. Use an array of strings here
         * if you need to send multiple headers with the same name.
         * https://nodejs.org/dist/v0.12.18/docs/api/all.html#all_response_setheader_name_value
         */
        local._http.ServerResponse.prototype.setHeader = function (key, value) {
            this.headers[key.toLowerCase()] = value;
        };

        local._http.ServerResponse.prototype.write = function (data) {
        /*
         * This sends a chunk of the response body.
         * This method may be called multiple times to provide successive parts of the body.
         * https://nodejs.org/dist/v0.12.18/docs/api/all.html#all_response_write_chunk_encoding_callback
         */
            this.chunkList.push(data);
        };

        // init _http.XMLHttpRequest
        local._http.XMLHttpRequest = function () {
        /*
         * The constructor initializes an XMLHttpRequest.
         * It must be called before any other method calls.
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#XMLHttpRequest()
         */
            var xhr;
            xhr = this;
            ['onError', 'onResponse'].forEach(function (key) {
                xhr[key] = xhr[key].bind(xhr);
            });
            xhr.headers = {};
            xhr.onLoadList = [];
            /*
             * The XMLHttpRequest response property returns the response's body content
             * as an ArrayBuffer, Blob, Document, JavaScript Object, or DOMString,
             * depending on the value of the request's responseType property.
             * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response
             */
            xhr.response = null;
            /*
             * The read-only XMLHttpRequest property responseText returns the text
             * received from a server following a request being sent.
             * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseText
             */
            xhr.responseText = '';
            /*
             * The XMLHttpRequest property responseType is an enumerated string value
             * specifying the type of data contained in the response. It also lets the author
             * change the response type. If an empty string is set as the value of responseType,
             * the default value of "text" is used.
             * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
             */
            xhr.responseType = '';
            /*
             * The read-only XMLHttpRequest.status property returns the numerical status code
             * of the response of the XMLHttpRequest. status will be an unsigned short.
             * Before the request is complete, the value of status will be 0. It is worth noting
             * that browsers report a status of 0 in case of XMLHttpRequest errors too.
             * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status
             */
            xhr.status = xhr.statusCode = 0;
            /*
             * The read-only XMLHttpRequest.statusText property returns a DOMString
             * containing the response's status message as returned by the HTTP server.
             * Unlike XMLHTTPRequest.status which indicates a numerical status code,
             * this property contains the text of the response status, such as "OK" or "Not Found".
             * If the request's readyState is in UNSENT or OPENED state,
             * the value of statusText will be an empty string.
             * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/statusText
             */
            xhr.statusText = '';
            /*
             * The XMLHttpRequest.timeout property is an unsigned long representing the number
             * of milliseconds a request can take before automatically being terminated.
             * The default value is 0, which means there is no timeout. Timeout shouldn't be used
             * for synchronous XMLHttpRequests requests used in a document environment
             * or it will throw an InvalidAccessError exception. When a timeout happens,
             * a timeout event is fired.
             * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout
             */
            xhr.timeout = local.timeoutDefault;
        };

        local._http.XMLHttpRequest.prototype.abort = function () {
        /*
         * Aborts the request if it has already been sent.
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#abort()
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

        local._http.XMLHttpRequest.prototype.onError = function (error, data) {
        /*
         * this function will handle the error and data passed back to the xhr-connection
         */
            if (this._isDone) {
                return;
            }
            data = local.bufferToNodeBuffer(data);
            this.error = error;
            this.response = data;
            // init responseText
            if (this.responseType === 'text' || !this.responseType) {
                this.responseText = local.bufferToString(data);
            }
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
            this.responseHeaders = responseStream.headers;
            this.responseStream = responseStream;
            this.status = this.statusCode = responseStream.statusCode;
            this.statusText = local.http.STATUS_CODES[responseStream.statusCode] || '';
            local.streamReadAll(responseStream, this.onError);
        };

        local._http.XMLHttpRequest.prototype.open = function (method, url) {
        /*
         * Initializes a request. This method is to be used from JavaScript code;
         * to initialize a request from native code, use openRequest() instead.
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#open()
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

        local._http.XMLHttpRequest.prototype.send = function (data) {
        /*
         * Sends the request. If the request is asynchronous (which is the default),
         * this method returns as soon as the request is sent.
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#send()
         */
            var xhr;
            data = local.bufferToNodeBuffer(data);
            xhr = this;
            xhr.data = data;
            // asynchronously send data
            setTimeout(function () {
                xhr.requestStream.end(xhr.data);
            });
        };

        local._http.XMLHttpRequest.prototype.setRequestHeader = function (key, value) {
        /*
         * Sets the value of an HTTP request header.
         * You must call setRequestHeader()after open(), but before send().
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#setRequestHeader()
         */
            key = key.toLowerCase();
            this.headers[key] = value;
            this.requestStream.setHeader(key, value);
        };

        local._http.createServer = function () {
            /*
             * Returns a new instance of http.Server.
             * https://nodejs.org/dist/v0.12.18/docs/api/all.html#all_http_createserver_requestlistener
             */
            return { listen: function (port, onError) {
            /*
             * This will cause the server to accept connections on the specified handle,
             * but it is presumed that the file descriptor or handle has already been bound
             * to a port or domain socket.
             * https://nodejs.org/dist/v0.12.18/docs/api/all.html#all_server_listen_handle_callback
             */
                onError(null, port);
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

        local._middlewareError = function (error, request, response) {
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

        local._testCase_buildApidoc_default = function (options, onError) {
        /*
         * this function will test buildApidoc's default handling-behavior
         */
            if (local.env.npm_config_mode_test_fast || local.isBrowser) {
                onError(null, options);
                return;
            }
            local.buildApidoc(options, onError);
        };

        local._testCase_buildApp_default = function (options, onError) {
        /*
         * this function will test buildApp's default handling-behavior
         */
            if (local.env.npm_config_mode_test_fast || local.isBrowser) {
                onError(null, options);
                return;
            }
            global.local.testCase_buildReadme_default(options, local.onErrorThrow);
            global.local.testCase_buildLib_default(options, local.onErrorThrow);
            global.local.testCase_buildTest_default(options, local.onErrorThrow);
            global.local.testCase_buildCustomOrg_default(options, local.onErrorThrow);
            local.buildApp(options, onError);
        };

        local._testCase_buildCustomOrg_default = function (options, onError) {
        /*
         * this function will test buildCustomOrg's default handling-behavior
         */
            if (local.isBrowser) {
                onError(null, options);
                return;
            }
            local.buildCustomOrg({}, onError);
        };

        local._testCase_buildLib_default = function (options, onError) {
        /*
         * this function will test buildLib's default handling-behavior
         */
            if (local.isBrowser) {
                onError(null, options);
                return;
            }
            local.buildLib({}, onError);
        };

        local._testCase_buildReadme_default = function (options, onError) {
        /*
         * this function will test buildReadme's default handling-behavior
         */
            if (local.isBrowser) {
                onError(null, options);
                return;
            }
            local.buildReadme({}, onError);
        };

        local._testCase_buildTest_default = function (options, onError) {
        /*
         * this function will test buildTest's default handling-behavior
         */
            if (local.isBrowser) {
                onError(null, options);
                return;
            }
            local.buildTest({}, onError);
        };

        local._testCase_webpage_default = function (options, onError) {
        /*
         * this function will test webpage's default handling-behavior
         */
            local.domStyleValidate();
            if (local.env.npm_config_mode_test_fast || local.isBrowser) {
                onError(null, options);
                return;
            }
            local.browserTest({
                fileScreenshot: local.env.npm_config_dir_build +
                    '/screenshot.' + local.env.MODE_BUILD + '.browser.%2F.png',
                modeCoverageMerge: true,
                url: local.assetsDict['/']
                    .indexOf('<script src="assets.test.js"></script>') >= 0
                    ? local.serverLocalHost + '?modeTest=1&timeoutDefault=' + local.timeoutDefault
                    : local.serverLocalHost + '/index.html?modeTest=1&timeoutDefault=1'
            }, onError);
        };

        local.ajax = function (options, onError) {
        /*
         * this function will send an ajax-request with error-handling and timeout
         * example usage:
            local.ajax({
                header: { 'x-header-hello': 'world' },
                method: 'GET',
                url: '/index.html'
            }, function (error, xhr) {
                console.log(xhr.responseText);
                console.log(xhr.statusCode);
            });
         */
            var ajaxProgressUpdate, isBrowser, isDone, nop, streamCleanup, xhr;
            // init standalone handling-behavior
            nop = function () {
            /*
             * this function will do nothing
             */
                return;
            };
            ajaxProgressUpdate = local.ajaxProgressUpdate || nop;
            // init onError
            if (local.onErrorWithStack) {
                onError = local.onErrorWithStack(onError);
            }
            streamCleanup = function (stream) {
            /*
             * this function will try to end or destroy the stream
             */
                // try to end the stream
                try {
                    stream.end();
                } catch (errorCaught) {
                    // if error, then try to destroy the stream
                    try {
                        stream.destroy();
                    } catch (ignore) {
                    }
                }
            };
            // init isBrowser
            isBrowser = typeof window === 'object' &&
                typeof window.XMLHttpRequest === 'function' &&
                window.document &&
                typeof window.document.querySelectorAll === 'function';
            // init xhr
            xhr = !options.httpRequest && (!isBrowser ||
                (local.serverLocalUrlTest && local.serverLocalUrlTest(options.url)))
                ? local._http && local._http.XMLHttpRequest && new local._http.XMLHttpRequest()
                : isBrowser && new window.XMLHttpRequest();
            if (!xhr) {
                xhr = require('url').parse(options.url);
                xhr.headers = options.headers;
                xhr.method = options.method;
                xhr.timeout = xhr.timeout || local.timeoutDefault || 30000;
                xhr = (
                    options.httpRequest || require(xhr.protocol.slice(0, -1)).request
                )(xhr, function (response) {
                    var chunkList;
                    chunkList = [];
                    xhr.responseStream = response;
                    xhr.responseHeaders = xhr.responseStream.headers;
                    xhr.status = xhr.responseStream.statusCode;
                    xhr.responseStream
                        .on('data', function (chunk) {
                            chunkList.push(chunk);
                        })
                        .on('end', function () {
                            xhr.response = Buffer.concat(chunkList);
                            if (xhr.responseType === 'text' || !xhr.responseType) {
                                xhr.responseText = String(xhr.response);
                            }
                            xhr.onEvent({ type: 'load' });
                        })
                        .on('error', xhr.onEvent);
                });
                xhr.addEventListener = nop;
                xhr.open = nop;
                xhr.requestStream = xhr;
                xhr.responseText = '';
                xhr.send = xhr.end;
                xhr.setRequestHeader = nop;
                setTimeout(function () {
                    xhr.on('error', xhr.onEvent);
                });
            }
            // debug xhr
            local._debugXhr = xhr;
            // init options
            Object.keys(options).forEach(function (key) {
                if (options[key] !== undefined) {
                    xhr[key] = options[key];
                }
            });
            // init properties
            xhr.headers = {};
            Object.keys(options.headers || {}).forEach(function (key) {
                xhr.headers[key.toLowerCase()] = options.headers[key];
            });
            xhr.method = xhr.method || 'GET';
            xhr.responseHeaders = {};
            xhr.timeStart = Date.now();
            xhr.timeout = xhr.timeout || local.timeoutDefault || 30000;
            // init timerTimeout
            xhr.timerTimeout = setTimeout(function () {
                xhr.error = xhr.error || new Error('onTimeout - timeout-error - ' +
                    xhr.timeout + ' ms - ' + 'ajax ' + xhr.method + ' ' + xhr.url);
                xhr.abort();
                // cleanup requestStream and responseStream
                streamCleanup(xhr.requestStream);
                streamCleanup(xhr.responseStream);
            }, xhr.timeout);
            // init event-handling
            xhr.onEvent = function (event) {
                if (event instanceof Error) {
                    xhr.error = xhr.error || event;
                    xhr.onEvent({ type: 'error' });
                    return;
                }
                // init statusCode
                xhr.statusCode = xhr.status;
                switch (event.type) {
                case 'abort':
                case 'error':
                case 'load':
                    // do not run more than once
                    if (isDone) {
                        return;
                    }
                    isDone = xhr._isDone = true;
                    // update responseHeaders
                    if (xhr.getAllResponseHeaders) {
                        xhr.getAllResponseHeaders().replace((
                            /(.*?): *?(.*?)\r\n/g
                        ), function (match0, match1, match2) {
                            match0 = match1;
                            xhr.responseHeaders[match0.toLowerCase()] = match2;
                        });
                    }
                    xhr.timeElapsed = Date.now() - xhr.timeStart;
                    // debug ajaxResponse
                    if (xhr.modeDebug) {
                        console.error('serverLog - ' + JSON.stringify({
                            time: new Date(xhr.timeStart).toISOString(),
                            type: 'ajaxResponse',
                            method: xhr.method,
                            url: xhr.url,
                            statusCode: xhr.statusCode,
                            timeElapsed: xhr.timeElapsed,
                            // extra
                            data: (function () {
                                try {
                                    return String(xhr.data.slice(0, 256));
                                } catch (ignore) {
                                }
                            }()),
                            responseText: (function () {
                                try {
                                    return String(xhr.responseText.slice(0, 256));
                                } catch (ignore) {
                                }
                            }())
                        }));
                    }
                    // cleanup timerTimeout
                    clearTimeout(xhr.timerTimeout);
                    // cleanup requestStream and responseStream
                    setTimeout(function () {
                        streamCleanup(xhr.requestStream);
                        streamCleanup(xhr.responseStream);
                    });
                    // decrement ajaxProgressCounter
                    if (local.ajaxProgressCounter) {
                        local.ajaxProgressCounter -= 1;
                    }
                    // handle abort or error event
                    if (!xhr.error &&
                            (event.type === 'abort' ||
                            event.type === 'error' ||
                            xhr.statusCode >= 400)) {
                        xhr.error = new Error('ajax - event ' + event.type);
                    }
                    // debug statusCode
                    (xhr.error || {}).statusCode = xhr.statusCode;
                    // debug statusCode / method / url
                    if (local.errorMessagePrepend && xhr.error) {
                        local.errorMessagePrepend(xhr.error, (isBrowser
                            ? 'browser'
                            : 'node') + ' - ' +
                            xhr.statusCode + ' ' + xhr.method + ' ' + xhr.url + '\n' +
                            // try to debug responseText
                            (function () {
                                try {
                                    return '    ' + JSON.stringify(xhr.responseText.slice(0, 256) +
                                        '...') + '\n';
                                } catch (ignore) {
                                }
                            }()));
                    }
                    onError(xhr.error, xhr);
                    break;
                }
                ajaxProgressUpdate();
            };
            // increment ajaxProgressCounter
            local.ajaxProgressCounter = local.ajaxProgressCounter || 0;
            local.ajaxProgressCounter += 1;
            xhr.addEventListener('abort', xhr.onEvent);
            xhr.addEventListener('error', xhr.onEvent);
            xhr.addEventListener('load', xhr.onEvent);
            xhr.addEventListener('loadstart', ajaxProgressUpdate);
            xhr.addEventListener('progress', ajaxProgressUpdate);
            if (xhr.upload && xhr.upload.addEventListener) {
                xhr.upload.addEventListener('progress', ajaxProgressUpdate);
            }
            // open url through corsForwardProxyHost
            xhr.corsForwardProxyHost = xhr.corsForwardProxyHost || local.corsForwardProxyHost;
            xhr.location = xhr.location || (local.global && local.global.location) || {};
            if (local.corsForwardProxyHostIfNeeded && local.corsForwardProxyHostIfNeeded(xhr)) {
                xhr.open(xhr.method, local.corsForwardProxyHostIfNeeded(xhr));
                xhr.setRequestHeader('forward-proxy-headers', JSON.stringify(xhr.headers));
                xhr.setRequestHeader('forward-proxy-url', xhr.url);
            // open url
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
                        xhr.onEvent(error);
                        return;
                    }
                    // send data
                    xhr.send(data);
                });
            } else {
                // send data
                xhr.send(xhr.data);
            }
            return xhr;
        };

        /* istanbul ignore next */
        local.ajaxCrawl = function (options, onError) {
        /*
         * this function will recursively web-crawl options.urlList to options.depthMax
         */
            local.onNext(options, function (error) {
                switch (options.modeNext) {
                // onParallelList(options);
                case 1:
                    options = local.objectSetDefault(options, {
                        depth: 0,
                        depthMax: 10,
                        dict: {},
                        dir: '.',
                        filter: local.echo,
                        list: [],
                        postProcess: local.echo,
                        rgxCrawl: (/<a\b[\S\s]*?href="(.*?)"/g),
                        rgxParent0: (/z^/),
                        urlList: []
                    });
                    options.urlList.forEach(function (url) {
                        // recurse - push
                        local.ajaxCrawl(local.objectSetDefault({ modeNext: 1, url: url }, options));
                    });
                    local.onParallelList(options, function (options2, onParallel) {
                        onParallel.counter += 1;
                        options2.element.modeNext = 2;
                        // recurse - ajax
                        local.ajaxCrawl(
                            local.objectSetDefault(
                                local.objectSetOverride(options2.element, options2),
                                options
                            ),
                            onParallel
                        );
                    }, onError);
                    break;
                // options.list.push(options);
                case 2:
                    options.url = local.urlJoin(options.urlParsed0.href, options.url);
                    // validate url
                    local.assert((/^https?:\/\//).test(options.url), options.url);
                    options.url = options.url
                        .replace((/[?#].*?$/), '')
                        .replace((/\/{2,}/g), '/')
                        .replace('/', '//');
                    options.file = (options.url + ((/\.(?:html?|txt|xml)$/).test(options.url)
                        ? ''
                        : '/index.html'))
                        .replace((/^https?:\/\//), options.dir + '/')
                        .replace((/\/{2,}/g), '/');
                    // optimization - hasOwnProperty
                    if (options.dict.hasOwnProperty(options.file)) {
                        break;
                    }
                    options.dict[options.file] = true;
                    if ((!options.depth ||
                            (options.rgxParent0.test(options.url) &&
                            local.urlParse(options.url).host === options.urlParsed0.host)) &&
                            options.filter(options) &&
                            !local.fs.existsSync(options.file)) {
                        options.modeNext = 2;
                        if (!options.depth) {
                            options.rgxParent0 = new RegExp(options.rgxParent0.source + '|^' +
                                local.stringRegexpEscape(options.url.replace((/\/[^\/]*$/), '/')));
                        }
                        options.list.push(options);
                    }
                    break;
                // ajax(options);
                case 3:
                    local.ajax(options, function (error, xhr) {
                        options.xhr = xhr;
                        // validate xhr
                        local.assert(xhr, error);
                        // handle redirect
                        if (300 <= xhr.statusCode && xhr.statusCode < 400) {
                            options.modeNext = Infinity;
                            // recurse - redirect
                            local.ajaxCrawl(local.objectSetDefault({
                                depth: options.depth,
                                modeNext: 1,
                                url: xhr.responseStream.headers.location,
                                urlParsed0: options.xhr.urlParsed
                            }, options), local.nop);
                        }
                        options.onNext();
                    });
                    break;
                case 4:
                    // debug ajaxCrawl
                    console.error('serverLog - ' + JSON.stringify({
                        time: new Date(options.xhr.timeStart).toISOString(),
                        type: 'ajaxCrawl',
                        method: options.xhr.method,
                        url: options.xhr.url,
                        statusCode: options.xhr.statusCode,
                        timeElapsed: options.xhr.timeElapsed,
                        // extra
                        responseContentLength: options.xhr.response && options.xhr.response.length,
                        depth: options.depth,
                        ii: options.ii,
                        listLength: options.list.length,
                        dictSize: Object.keys(options.dict).length,
                        rgxCrawlMatch1: options.rgxCrawlMatch1
                    }));
                    // save file
                    local.fsWriteFileWithMkdirpSync(
                        options.file,
                        options.postProcess(options.xhr.responseText.trim() + '\n')
                    );
                    // skip crawl
                    if (!(options.depth < options.depthMax)) {
                        options.onNext();
                        return;
                    }
                    // crawl file
                    options.xhr.responseText.replace(options.rgxCrawl, function (match0, match1) {
                        match0 = match1;
                        // recurse - push
                        local.ajaxCrawl(local.objectSetDefault({
                            depth: options.depth + 1,
                            modeNext: 1,
                            rgxCrawlMatch1: match1,
                            url: match0,
                            urlParsed0: options.xhr.urlParsed
                        }, options), local.nop);
                    });
                    options.onNext(error, options);
                    break;
                default:
                    onError(error, options);
                }
            });
            options.modeNext = options.modeNext || 0;
            options.onNext();
        };

        local.ajaxProgressUpdate = function () {
        /*
         * this function will update ajaxProgress
         */
            var ajaxProgressDiv1;
            ajaxProgressDiv1 = local.isBrowser && document.querySelector('#ajaxProgressDiv1');
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
                    ajaxProgressDiv1.style.width.slice(0, -1) | 0
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
                    if (!local.ajaxProgressState) {
                        ajaxProgressDiv1.style.width = '0%';
                    }
                }, 500);
            }, local.ajaxProgressCounter > 0
                ? local.timeoutDefault
                : 1500);
        };

        local.assert = function (passed, message, onError) {
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
            // debug error
            local._debugAssertError = error;
            onError = onError || function (error) {
                throw error;
            };
            onError(error);
        };

        local.assertJsonEqual = function (aa, bb, message) {
        /*
         * this function will assert
         * jsonStringifyOrdered(aa) === JSON.stringify(bb)
         */
            aa = local.jsonStringifyOrdered(aa);
            bb = JSON.stringify(bb);
            local.assert(aa === bb, message || [aa, bb]);
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

        local.base64FromBuffer = function (bff, mode) {
        /*
         * this function will convert Uint8Array bff to base64
         * https://developer.mozilla.org/en-US/Add-ons/Code_snippets/StringView#The_code
         */
            var ii, mod3, text, uint24, uint6ToB64;
            // convert utf8-string bff to Uint8Array
            if (bff && mode === 'string') {
                bff = typeof window === 'object' &&
                    window &&
                    typeof window.TextEncoder === 'function'
                    ? new window.TextEncoder().encode(bff)
                    : Buffer.from(bff);
            }
            bff = bff || [];
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

        local.base64FromString = function (text) {
        /*
         * this function will convert utf8-string text to base64
         */
            return local.base64FromBuffer(text, 'string');
        };

        local.base64ToBuffer = function (b64, mode) {
        /*
         * this function will convert b64 to Uint8Array
         * https://gist.github.com/wang-bin/7332335
         */
            /*globals Uint8Array*/
            var bff, byte, chr, ii, jj, map64, mod4;
            b64 = b64 || '';
            bff = new Uint8Array(b64.length); // 3/4
            byte = 0;
            jj = 0;
            map64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            mod4 = 0;
            for (ii = 0; ii < b64.length; ii += 1) {
                chr = map64.indexOf(b64[ii]);
                if (chr >= 0) {
                    mod4 %= 4;
                    if (mod4 === 0) {
                        byte = chr;
                    } else {
                        byte = byte * 64 + chr;
                        bff[jj] = 255 & (byte >> ((-2 * (mod4 + 1)) & 6));
                        jj += 1;
                    }
                    mod4 += 1;
                }
            }
            // optimization - create resized-view of bff
            bff = bff.subarray(0, jj);
            // mode !== 'string'
            if (mode !== 'string') {
                return bff;
            }
            // mode === 'string' - browser js-env
            if (typeof window === 'object' && window && typeof window.TextDecoder === 'function') {
                return new window.TextDecoder().decode(bff);
            }
            // mode === 'string' - node js-env
            Object.setPrototypeOf(bff, Buffer.prototype);
            return String(bff);
        };

        local.base64ToString = function (b64) {
        /*
         * this function will convert b64 to utf8-string
         */
            return local.base64ToBuffer(b64, 'string');
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
            if (!local.isBrowser) {
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
            var isDone, modeNext, onNext, onParallel, options2, timerTimeout;
            // init options
            try {
                [
                    'CI_BRANCH',
                    'CI_HOST',
                    'DISPLAY',
                    'MODE_BUILD',
                    'PATH',
                    'fileElectronHtml',
                    'fileScreenshot',
                    'fileTestReport',
                    'modeBrowserTest',
                    'modeCoverageMerge',
                    'modeNext',
                    'modeSilent',
                    'modeTestIgnore',
                    'npm_config_dir_build',
                    'npm_config_dir_tmp',
                    'npm_config_time_exit',
                    'npm_config_timeout_default',
                    'timeExit',
                    'timeoutDefault',
                    'timeoutScreenshot',
                    'url'
                ].forEach(function (key) {
                    if (local.env[key] !== undefined && typeof options[key] !== 'number') {
                        options[key] = options[key] || local.env[key];
                    }
                });
                options.timeoutDefault = Number(options.timeoutDefault) || local.timeoutDefault;
            } catch (ignore) {
            }
            try {
                options.require = options.utility2_require || require;
                options.fs = options.require('fs');
            } catch (ignore) {
            }
            try {
                options.document = options.utility2_document || document;
            } catch (ignore) {
            }
            try {
                options.window = options.utility2_window || window;
            } catch (ignore) {
            }
            onNext = function (error, data) {
                modeNext = error instanceof Error
                    ? Infinity
                    : modeNext + 1;
                switch (modeNext) {
                // node - init
                case 1:
                    // init url
                    if (!(/^\w+:\/\//).test(options.url)) {
                        options.url = local.path.resolve(process.cwd(), options.url);
                    }
                    options.urlParsed = local.urlParse(options.url);
                    // init testName
                    options.testName = options.urlParsed.pathname;
                    if (options.testName.indexOf(process.cwd()) === 0) {
                        options.testName = options.testName.replace(process.cwd(), '');
                    }
                    options.testName = options.MODE_BUILD + '.browser.' +
                        encodeURIComponent(options.testName.replace(
                            '/build..' + options.CI_BRANCH + '..' + options.CI_HOST,
                            '/build'
                        ));
                    local.objectSetDefault(options, {
                        fileCoverage: options.npm_config_dir_tmp +
                            '/coverage.' + options.testName + '.json',
                        fileScreenshot: options.npm_config_dir_build +
                            '/screenshot.' + options.testName + '.png',
                        fileTestReport: options.npm_config_dir_tmp +
                            '/test-report.' + options.testName + '.json',
                        modeBrowserTest: 'test',
                        timeExit: Date.now() + options.timeoutDefault,
                        timeoutScreenshot: options.timeoutScreenshot || 15000
                    }, 1);
                    // init timerTimeout
                    timerTimeout = local.onTimeout(
                        onNext,
                        options.timeoutDefault,
                        options.testName
                    ).unref();
                    // init file fileElectronHtml
                    options.browserTestScript = String(local.browserTest)
                        .replace((/<\//g), '<\\/')
                        // coverage-hack - un-instrument function
                        .replace((/\b__cov_.*?\+\+/g), '0');
                    options.fileElectronHtml = options.npm_config_dir_tmp + '/electron.' +
                        Date.now().toString(16) + Math.random().toString(16) + '.html';
                    options2 = {};
                    Object.keys(options).forEach(function (key) {
                        if (typeof options[key] !== 'object') {
                            options2[key] = options[key];
                        }
                    });
                    options2.modeNext = 20;
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
                        '<script>window.local = {}; (' + options.browserTestScript + '(' +
                        JSON.stringify(options2) + '))</script>');
                    console.error('\nbrowserTest - created electron entry-page ' +
                        options.fileElectronHtml + '\n');
                    // init file fileElectronHtml.preload.js
                    options2.modeNext = 30;
                    local.fsWriteFileWithMkdirpSync(
                        options.fileElectronHtml + '.preload.js',
                        '(' + options.browserTestScript + '(' + JSON.stringify(options2) + '))'
                    );
                    // spawn an electron process to test a url
                    options.modeNext = 10;
                    options.npm_config_time_exit = options.timeExit;
                    local.childProcessSpawnWithTimeout('electron', [
                        __filename,
                        'utility2.browserTest',
                        options.url,
                        '--enable-logging'
                    ], { env: options, stdio: options.modeSilent
                        ? 'ignore'
                        : ['ignore', 1, 2], timeout: options.timeoutDefault })
                        .once('error', onNext)
                        .once('exit', onNext);
                    break;
                // node.electron - init
                case 11:
                    local.electron = options.require('electron');
                    // handle uncaughtexception
                    process.once('uncaughtException', onNext);
                    // wait for electron to init
                    local.electron.app.once('ready', onNext);
                    break;
                // node.electron - after ready
                case 12:
                    options.BrowserWindow = local.electron.BrowserWindow;
                    local.objectSetDefault(options, {
                        frame: false,
                        height: 768,
                        show: false,
                        width: 1024,
                        x: 0,
                        y: 0
                    });
                    // init browserWindow
                    options.browserWindow = new options.BrowserWindow(options);
                    onParallel = local.onParallel(onNext);
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
                    options.browserWindow.loadURL('file://' + options.fileElectronHtml);
                    break;
                // node.electron.browserWindow - init
                case 21:
                    options.webview1 = options.document.querySelector('#webview1');
                    options.webview1.addEventListener('did-get-response-details', function () {
                        options.document.title = options.fileElectronHtml + ' opened';
                    });
                    options.rgx = new RegExp('^' + options.fileElectronHtml + ' (\\w+) ');
                    options.webview1.addEventListener('console-message', function (event) {
                        try {
                            modeNext = 21;
                            onNext(null, event);
                        } catch (errorCaught) {
                            console.error(errorCaught);
                        }
                    });
                    break;
                // node.electron.browserWindow.webview - init
                case 31:
                    // init fileElectronHtml for testRun
                    if (options.modeBrowserTest === 'test') {
                        options.window.fileElectronHtml = options.fileElectronHtml;
                    }
                    setTimeout(onNext, options.timeoutScreenshot);
                    break;
                // node.electron.browserWindow.webview - print html
                case 32:
                    console.error(options.fileElectronHtml + ' html ' +
                        options.document.documentElement.outerHTML);
                    setTimeout(onNext, 1000);
                    break;
                // node.electron.browserWindow.webview - print default-test
                case 33:
                    if (options.modeBrowserTest !== 'test' || options.window.utility2_modeTestRun) {
                        return;
                    }
                    console.error(options.fileElectronHtml + ' global_test_results ' +
                        JSON.stringify({ global_test_results: {
                            coverage: options.window.__coverage__,
                            testReport: { testPlatformList: [{}] }
                        } }));
                    break;
                // node.electron.browserWindow - handle event console-message
                case 22:
                    data.message.replace(options.rgx, function (match0, match1) {
                        data.type2 = match1;
                        data.data = data.message.slice(match0.length);
                    });
                    switch (data.type2) {
                    case 'global_test_results':
                        if (options.modeBrowserTest !== 'test') {
                            return;
                        }
                        options.global_test_results = JSON.parse(data.data).global_test_results;
                        if (options.global_test_results.testReport) {
                            // merge screenshot into test-report
                            options.global_test_results.testReport.testPlatformList[0].screenshot =
                                options.fileScreenshot.replace((/.*\//), '');
                            // save browser test-report
                            options.fs.writeFileSync(
                                options.fileTestReport,
                                JSON.stringify(options.global_test_results.testReport)
                            );
                            // save browser coverage
                            if (options.global_test_results.coverage) {
                                options.fs.writeFileSync(
                                    options.fileCoverage,
                                    JSON.stringify(options.global_test_results.coverage)
                                );
                            }
                            setTimeout(function () {
                                options.document.title = options.fileElectronHtml +
                                    ' testReport written';
                            });
                        }
                        break;
                    case 'html':
                        options.fs.writeFile(options.fileScreenshot.replace((
                            /\.\w+$/
                        ), '.html'), data.data, function () {
                            options.document.title = options.fileElectronHtml + ' html written';
                        });
                        break;
                    default:
                        console.error(data.message);
                    }
                    break;
                // node.electron - screenshot
                case 13:
                    options.browserWindow.capturePage(options, onNext);
                    break;
                case 14:
                    options.fs.writeFile(options.fileScreenshot, error.toPng(), onNext);
                    break;
                case 15:
                    console.error('\nbrowserTest - created screenshot file ' +
                        options.fileScreenshot + '\n');
                    console.error('browserTest - created screenshot file ' +
                        options.fileScreenshot.replace((/\.\w+$/), '.html'));
                    local.exit();
                    break;
                // node - after electron
                case 2:
                    // cleanup fileElectronHtml
                    try {
                        options.fs.unlinkSync(options.fileElectronHtml);
                        options.fs.unlinkSync(options.fileElectronHtml + '.preload.js');
                    } catch (ignore) {
                    }
                    console.error('\nbrowserTest - exit-code ' + error + ' - ' + options.url +
                        '\n');
                    if (options.modeBrowserTest !== 'test') {
                        modeNext = Infinity;
                        onNext();
                        return;
                    }
                    // merge browser coverage
                    // try to JSON.parse the string
                    data = null;
                    try {
                        data = options.modeCoverageMerge && JSON.parse(
                            options.fs.readFileSync(options.fileCoverage, 'utf8')
                        );
                    } catch (ignore) {
                    }
                    local.istanbulCoverageMerge(local.global.__coverage__, data);
                    console.error('\nbrowserTest - merged coverage from file ' +
                        options.fileCoverage + '\n');
                    // try to merge browser test-report
                    // try to JSON.parse the string
                    data = null;
                    try {
                        data = !error &&
                            JSON.parse(options.fs.readFileSync(options.fileTestReport, 'utf8'));
                    } catch (ignore) {
                    }
                    if (data && !options.modeTestIgnore) {
                        local.testReportMerge(local.testReport, data);
                        console.error('\nbrowserTest - merged test-report from file ' +
                            options.fileTestReport + '\n');
                    }
                    // create test-report.json
                    options.fs.writeFileSync(
                        options.npm_config_dir_build + '/test-report.json',
                        JSON.stringify(local.testReport)
                    );
                    onNext(data && data.testsFailed && new Error(data.testsFailed));
                    break;
                default:
                    if (isDone) {
                        return;
                    }
                    isDone = true;
                    // cleanup timerTimeout
                    clearTimeout(timerTimeout);
                    onError(error);
                }
            };
            modeNext = Number(options.modeNext) || 0;
            onNext(null, options);
        };

        local.bufferConcat = function (bffList) {
        /*
         * this function will emulate node's Buffer.concat for Uint8Array in the browser
         */
            /*globals UintArray*/
            var ii, jj, length, result;
            length = 0;
            bffList = bffList
                .filter(function (bff) {
                    return bff || bff === 0;
                })
                .map(function (bff) {
                    // coerce bff to Uint8Array
                    if (!(bff instanceof Uint8Array)) {
                        bff = typeof bff === 'number'
                            ? local.bufferCreate(String(bff))
                            : local.bufferCreate(bff);
                    }
                    length += bff.length;
                    return bff;
                });
            result = local.bufferCreate(length);
            ii = 0;
            bffList.forEach(function (bff) {
                for (jj = 0; jj < bff.length; ii += 1, jj += 1) {
                    result[ii] = bff[jj];
                }
            });
            return result;
        };

        local.bufferCreate = function (text) {
        /*
         * this function will create a Uint8Array from text,
         * with either 'utf8' (default) or 'base64' encoding
         */
            /*globals Uint8Array*/
            if (typeof text !== 'string') {
                return new Uint8Array(text);
            }
            if (typeof window === 'object' && window && typeof window.TextEncoder === 'function') {
                return new window.TextEncoder().encode(text);
            }
            return Buffer.from(text);
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
         * filled with cryptographically-strong random bytes
         */
            /*globals Uint8Array, crypto*/
            return typeof crypto === 'object' && crypto && crypto.getRandomValues
                ? crypto.getRandomValues(new Uint8Array(length))
                : require('crypto').randomBytes(length);
        };

        local.bufferToNodeBuffer = function (bff) {
        /*
         * this function will coerce Uint8Array bff to nodejs Buffer
         */
            /*globals Uint8Array*/
            if (typeof Buffer === 'function' &&
                    Buffer &&
                    typeof Buffer.isBuffer === 'function' &&
                    bff instanceof Uint8Array &&
                    !Buffer.isBuffer(bff)) {
                bff = bff.subarray();
                Object.setPrototypeOf(bff, Buffer.prototype);
            }
            return bff;
        };

        local.bufferToString = function (bff) {
        /*
         * this function will convert Uint8Array bff to utf8 string
         */
            bff = bff || '';
            if (typeof bff === 'string') {
                return bff;
            }
            // browser js-env
            if (typeof window === 'object' && window && typeof window.TextDecoder === 'function') {
                return new window.TextDecoder().decode(bff);
            }
            // node js-env
            return String(local.bufferToNodeBuffer(bff));
        };

        local.buildApidoc = function (options, onError) {
        /*
         * this function will build the apidoc
         */
            // optimization - do not run if $npm_config_mode_coverage = all
            if (local.env.npm_config_mode_coverage === 'all') {
                onError();
                return;
            }
            options = local.objectSetDefault(options, {
                blacklistDict: local,
                require: local.requireInSandbox
            });
            if (local.env.npm_package_buildCustomOrg && !options.modeForce) {
                onError();
                return;
            }
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
            options = local.objectSetDefault(options, { assetsList: [] });
            // build assets
            local.fsRmrSync(local.env.npm_config_dir_build + '/app');
            local.onParallelList({ list: options.assetsList.concat([{
                file: '/LICENSE',
                url: '/LICENSE'
            }, {
                file: '/assets.' + local.env.npm_package_nameLib + '.html',
                url: '/index.html'
            }, {
                file: '/assets.' + local.env.npm_package_nameLib + '.js',
                url: '/assets.' + local.env.npm_package_nameLib + '.js'
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
            }]) }, function (options2, onParallel) {
                options2 = options2.element;
                onParallel.counter += 1;
                local.ajax(options2, function (error, xhr) {
                    // validate no error occurred
                    local.assert(!error, error);
                    // jslint file
                    local.jslintAndPrintConditional(xhr.responseText, options2.file);
                    // validate no error occurred
                    local.assert(!local.jslint.errorText, local.jslint.errorText);
                    local.fsWriteFileWithMkdirpSync(
                        local.env.npm_config_dir_build + '/app' + options2.file,
                        xhr.response
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
                local.objectSetOverride(options, { packageJson: {
                    keywords: ['documentation', local.env.npm_package_buildCustomOrg]
                } }, 2);
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
                    'lib.' + local.env.npm_package_nameLib + '.js',
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
                // customize body after /* validateLineSortedReset */
                (/\n {8}\/\* validateLineSortedReset \*\/\n[\S\s]*?$/)
            ].forEach(function (rgx) {
                options.dataTo = local.stringCustomizeFromToRgx(
                    options.dataFrom,
                    options.dataTo,
                    rgx
                );
            });
            // customize local for assets.utility2.rollup.js
            if (local.fs.existsSync('./assets.utility2.rollup.js') &&
                    local.env.npm_package_nameLib !== 'swgg') {
                options.dataTo = options.dataTo.replace(
                    '            // local.global.utility2_rollup_old || ',
                    '            local.global.utility2_rollup_old || '
                );
            }
            options.customize();
            // save lib.xxx.js
            local.fs.writeFileSync(
                'lib.' + local.env.npm_package_nameLib + '.js',
                options.dataTo
            );
            // normalize function-before
            [
                'lib.' + local.env.npm_package_nameLib + '.js',
                'lib.' + local.env.npm_package_nameLib + '.sh',
                'npm_scripts.sh'
            ].forEach(function (file) {
                options.dataFunctionBefore = local.tryCatchReadFile(file, 'utf8').replace((
                    /^ {8}local\.(\w+) = function \([\S\s]+?\n {8}\};$/gm
                ), function (match0, match1) {
                    [local, local.github_crud, local.swgg].some(function (dict) {
                        if (match1[0] !== '_' && typeof dict[match1] === 'function') {
                            match0 = '        local.' + match1 + ' = ' + String(dict[match1]) + ';';
                            return true;
                        }
                    });
                    return match0;
                });
                /* istanbul ignore next */
                if (options.dataFunctionBefore && !local.env.npm_config_mode_coverage) {
                    local.fs.writeFileSync(file, options.dataFunctionBefore);
                }
            });
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
                    ),
                packageJsonRgx: (/\n# package.json\n```json\n([\S\s]*?)\n```\n/)
            });
            // render dataTo
            options.dataTo = local.templateRenderJslintLite(
                local.assetsDict['/assets.readme.template.md'],
                options
            );
            // init package.json
            options.dataFrom.replace(options.packageJsonRgx, function (match0, match1) {
                // remove null-items from package.json
                options.packageJson = JSON.parse(match1.replace((/ {4}".*?": null,?$/gm), ''));
                options.packageJson.description = options.dataFrom.split('\n')[1];
                local.tryCatchOnError(function () {
                    local.objectSetDefault(options.packageJson, {
                        nameLib: JSON.parse(local.fs.readFileSync('./package.json')).nameLib
                    });
                }, local.nop);
                local.objectSetDefault(options.packageJson, {
                    nameLib: options.packageJson.name.replace((/\W/g), '_'),
                    nameOriginal: options.packageJson.name
                });
                local.objectSetDefault(
                    options.packageJson,
                    JSON.parse(local.templateRenderJslintLite(options.packageJsonRgx.exec(
                        local.assetsDict['/assets.readme.template.md']
                    )[1], options)),
                    2
                );
                // avoid npm-installing self
                delete options.packageJson.devDependencies[options.packageJson.name];
                // reset scripts
                options.packageJson.scripts = {
                    'build-ci': './npm_scripts.sh',
                    env: 'env',
                    eval: './npm_scripts.sh',
                    'heroku-postbuild': './npm_scripts.sh',
                    postinstall: './npm_scripts.sh',
                    start: './npm_scripts.sh',
                    test: './npm_scripts.sh',
                    utility2: './npm_scripts.sh'
                };
                // save package.json
                local.fs.writeFileSync(
                    'package.json',
                    local.jsonStringifyOrdered(options.packageJson, null, 4) + '\n'
                );
                // re-render dataTo
                options.dataTo = local.templateRenderJslintLite(
                    local.assetsDict['/assets.readme.template.md'],
                    options
                );
                options.dataTo = options.dataTo.replace(
                    options.packageJsonRgx,
                    match0.replace(match1, local.jsonStringifyOrdered(options.packageJson, null, 4))
                );
            });
            // search-and-replace - customize dataTo
            [
                // customize name and description
                (/.*?\n.*?\n/),
                // customize cdn-download
                (/\n# cdn download\n[\S\s]*?\n\n\n\n/),
                // customize live web demo
                (/\n# live web demo\n[\S\s]*?\n\n\n\n/),
                // customize todo
                (/\n#### todo\n[\S\s]*?\n\n\n\n/),
                // customize quickstart-example-js
                new RegExp('\\n {8}local\\.global\\.local = local;\\n' +
                    '[^`]*?\\n {4}\\/\\/ run browser js\\-env code - init-test\\n'),
                new RegExp('\\n {8}local\\.testRunBrowser = function \\(event\\) \\{\\n' +
                    '[^`]*?^ {12}if \\(!event \\|\\| \\(event &&\\n', 'm'),
                (/\n {12}\/\/ custom-case\n[^`]*?\n {12}\}\n/),
                // customize quickstart-html-body
                (/\nutility2-comment -->(?:\\n\\\n){4}[^`]*?^<!-- utility2-comment\\n\\\n/m),
                // customize build script
                (/\n# internal build script\n[\S\s]*?^- build_ci\.sh\n/m),
                (/\nshBuildCiAfter \(\) \{\(set -e\n[\S\s]*?\n\)\}\n/),
                (/\nshBuildCiBefore \(\) \{\(set -e\n[\S\s]*?\n\)\}\n/)
            ].forEach(function (rgx) {
                options.dataTo = local.stringCustomizeFromToRgx(
                    options.dataFrom,
                    options.dataTo,
                    rgx
                );
            });
            // customize private-repository
            if (local.env.npm_package_isPrivate) {
                options.dataTo = options.dataTo
                    .replace((
                        /\n\[!\[NPM\]\(https:\/\/nodei.co\/npm\/.*?\n/
                    ), '\n')
                    .replace(
                        '$ npm install ',
                        '$ git clone --single-branch -b beta ' +
                            local.env.npm_package_repository_url
                            .replace('git+https://github.com/', 'git@github.com:') +
                            ' node_modules/'
                    );
            }
            // customize version
            ['dataFrom', 'dataTo'].forEach(function (element) {
                options[element] = options[element].replace((
                    /\n(#### changelog |- npm publish )\d+?\.\d+?\.\d+?.*?\n/g
                ), '\n$1' + options.packageJson.version + '\n');
            });
            // customize swaggerdoc
            if (!local.assetsDict['/assets.swgg.swagger.json'] ||
                    (/\bswggUiContainer\b/).test(local.assetsDict['/index.html']) ||
                    local.env.npm_package_name === 'utility2') {
                options.dataTo = options.dataTo.replace((/\n#### swagger doc\n[\S\s]*?\n#### /),
                    '\n#### ');
            }
            // customize example.js
            if (local.assetsDict['/index.html']
                    .indexOf('<script src="assets.example.js"></script>') < 0) {
                options.dataTo = options.dataTo.replace(
                    (/\n {4}case 'browser':\n[\S\s]+?\n {8}break;\n/g),
                    "\n    case 'browser':\n        break;\n"
                );
            }
            // customize comment
            options.dataFrom.replace((
                /^( *?)(?:#\!\! |#\/\/ |\/\/\!\! |<!-- )(.*?)(?: -->)?$/gm
            ), function (match0, match1, match2) {
                options.dataTo = options.dataTo.replace(
                    '\n' + match1 + match2 + '\n',
                    '\n' + match0 + '\n'
                );
            });
            options.customize();
            // customize shDeployCustom
            if (options.dataFrom.indexOf('    shDeployCustom\n') >= 0) {
                [
                    // customize quickstart
                    (/\n#### changelog [\S\s]*\n# quickstart example.js\n/),
                    options.dataFrom.indexOf('"assets.utility2.template.html"') < 0 &&
                        (/\n# quickstart [\S\s]*?\n# extra screenshots\n/)
                ].forEach(function (rgx) {
                    options.dataTo = local.stringCustomizeFromToRgx(
                        options.dataFrom,
                        options.dataTo,
                        rgx
                    );
                });
                // customize screenshot
                options.dataTo = options.dataTo.replace(
                    new RegExp('^1\\. .*?screenshot\\.' +
                        '(?:npmTest|testExampleJs|testExampleSh)' +
                        '.*?\\.png[\\S\\s]*?\\n\\n', 'gm'),
                    ''
                );
            }
            // customize shNpmTestPublished
            options.dataTo = options.dataTo.replace(
                '$ npm install ' + local.env.GITHUB_REPO + '#alpha',
                '$ npm install ' + local.env.npm_package_name
            );
            if (options.dataFrom.indexOf('    shNpmTestPublished\n') < 0) {
                options.dataTo = options.dataTo.replace(
                    '$ npm install ' + local.env.npm_package_name,
                    '$ npm install ' + local.env.GITHUB_REPO + '#alpha'
                );
                [
                    (/\n.*?\bhttps:\/\/www.npmjs.com\/package\/.*?\n/),
                    (/\n.*?npmPackageDependencyTree.*?\n/)
                ].forEach(function (rgx) {
                    options.dataTo = options.dataTo.replace(rgx, '\n');
                });
            }
            // customize shBuildCiAfter and shBuildCiBefore
            [
                ['shDeployGithub', (/.*?\/screenshot\.deployGithub.*?\n/g)],
                ['shDeployHeroku', (/.*?\/screenshot\.deployHeroku.*?\n/g)],
                ['shReadmeTest example.js', (/.*?\/screenshot\.testExampleJs.*?\n/g)],
                ['shReadmeTest example.sh', (/.*?\/screenshot\.testExampleSh.*?\n/g)]
            ].forEach(function (element) {
                if (options.dataFrom.indexOf('    ' + element[0] + '\n') >= 0) {
                    return;
                }
                // customize test-server
                options.dataTo = options.dataTo.replace(
                    new RegExp('\\n\\| test-server-' +
                        element[0].replace('shDeploy', '').toLowerCase() +
                        ' : \\|.*?\\n'),
                    '\n'
                );
                // customize screenshot
                options.dataTo = options.dataTo.replace(element[1], '');
            });
            // customize assets.index.template.html
            if (local.assetsDict['/assets.index.template.html']
                    .indexOf('"assets.utility2.template.html"') < 0) {
                options.dataTo = options.dataTo.replace(
                    new RegExp('\\n {8}\\/\\* jslint-ignore-begin \\*\\/\\n' +
                        ' {8}local.assetsDict\\[\'\\/assets.index.template.html\'\\] = \'\\\\\\n' +
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
                match0 = match1;
                if (match0 === 'table of contents') {
                    return;
                }
                options.toc += '1. [' + match0 + '](#' + match0.toLowerCase()
                    .replace(/[^ \-0-9A-Z_a-z]/g, '').replace(/ /g, '-') + ')\n';
            });
            options.dataTo = options.dataTo.replace('\n# table of contents\n', options.toc);
            // normalize whitespace
            options.dataTo = options.dataTo
                .replace((/\n{5,}/g), '\n\n\n\n')
                .replace((/(\S)\n{3}(\S)/g), '$1\n\n$2');
            // save README.md
            local.fs.writeFileSync('README.md', options.dataTo);
            // customize assets.swgg.swagger.json
            if (local.fs.existsSync('assets.swgg.swagger.json')) {
                // normalize assets.swgg.swagger.json
                options.swaggerJson = local.swgg.normalizeSwaggerJson(JSON.parse(
                    // read assets.swgg.swagger.json
                    local.fs.readFileSync('assets.swgg.swagger.json', 'utf8')
                ));
                local.objectSetOverride(options.swaggerJson, { info: {
                    title: options.packageJson.name,
                    version: options.packageJson.version,
                    'x-swgg-description': options.packageJson.description,
                    'x-swgg-homepage': options.packageJson.homepage
                } }, 2);
                options.dataTo.replace((/\bhttps:\/\/.*?\/assets\.app\.js/), function (match0) {
                    options.swaggerJson['x-swgg-downloadStandaloneApp'] = match0;
                });
                // save assets.swgg.swagger.json
                local.fs.writeFileSync('assets.swgg.swagger.json', local.jsonStringifyOrdered(
                    options.swaggerJson,
                    null,
                    4
                ) + '\n');
            }
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
                // customize shared js\-env code - function
                (/\n {4}\}\(\)\);\n\n\n\n {4}\/\/ run shared js\-env code - function\n[\S\s]*?$/)
            ].forEach(function (rgx) {
                options.dataTo = local.stringCustomizeFromToRgx(
                    options.dataFrom,
                    options.dataTo,
                    rgx
                );
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
                { stdio: ['ignore', 1, 2], timeout: 5000 }
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
                Math.floor(
                    0.001 * (Number(argList[2] && argList[2].timeout) || local.timeoutDefault) + 2
                ) + '; kill -9 ' + child.pid + ' 2>/dev/null', { shell: true, stdio: 'ignore' });
            return child;
        };

        local.cliRun = function (fnc) {
        /*
         * this function will run the cli
         */
            var nop;
            nop = function () {
            /*
             * this function will do nothing
             */
                return;
            };
            local.cliDict._eval = local.cliDict._eval || function () {
            /*
             * <code>
             * # eval code
             */
                local.global.local = local;
                require('vm').runInThisContext(process.argv[3]);
            };
            local.cliDict['--eval'] = local.cliDict['--eval'] || local.cliDict._eval;
            local.cliDict['-e'] = local.cliDict['-e'] || local.cliDict._eval;
            local.cliDict._help = local.cliDict._help || function (options) {
            /*
             *
             * # print help
             */
                var commandList, file, packageJson, text, textDict;
                commandList = [{
                    arg: '<arg2> ...',
                    description: 'usage:',
                    command: ['<arg1>']
                }];
                file = __filename.replace((/.*\//), '');
                packageJson = require('./package.json');
                textDict = {};
                Object.keys(local.cliDict).sort().forEach(function (key, ii) {
                    if (key[0] === '_' && key !== '_default') {
                        return;
                    }
                    text = String(local.cliDict[key]);
                    if (key === '_default') {
                        key = '<>';
                    }
                    ii = textDict[text] = textDict[text] || (ii + 1);
                    if (commandList[ii]) {
                        commandList[ii].command.push(key);
                    } else {
                        commandList[ii] = (/\n +?\*(.*?)\n +?\*(.*?)\n/).exec(text);
                        // coverage-hack - ignore else-statement
                        nop(local.global.__coverage__ && (function () {
                            commandList[ii] = commandList[ii] || ['', '', ''];
                        }()));
                        commandList[ii] = {
                            arg: commandList[ii][1].trim(),
                            command: [key],
                            description: commandList[ii][2].trim()
                        };
                    }
                });
                (options && options.modeError
                    ? console.error
                    : console.log)((options && options.modeError
                    ? '\u001b[31merror: missing <arg1>\u001b[39m\n\n'
                    : '') + packageJson.name + ' (' + packageJson.version + ')\n\n' + commandList
                    .filter(function (element) {
                        return element;
                    }).map(function (element) {
                        return (element.description + '\n' +
                            file + '  ' +
                            element.command.sort().join('|') + '  ' +
                            element.arg.replace((/ +/g), '  '))
                                .replace((/<>\||\|<>|<> {2}/), '')
                                .trim();
                    })
                    .join('\n\n') + '\n\nexample:\n' + file +
                    '  --eval  \'console.log("hello world")\'');
            };
            local.cliDict['--help'] = local.cliDict['--help'] || local.cliDict._help;
            local.cliDict['-h'] = local.cliDict['-h'] || local.cliDict._help;
            local.cliDict._default = local.cliDict._default || local.cliDict._help;
            local.cliDict.help = local.cliDict.help || local.cliDict._help;
            local.cliDict._interactive = local.cliDict._interactive || function () {
            /*
             *
             * # start interactive-mode
             */
                local.global.local = local;
                local.replStart();
            };
            if (local.replStart) {
                local.cliDict['--interactive'] = local.cliDict['--interactive'] ||
                    local.cliDict._interactive;
                local.cliDict['-i'] = local.cliDict['-i'] || local.cliDict._interactive;
            }
            local.cliDict._version = local.cliDict._version || function () {
            /*
             *
             * # print version
             */
                console.log(require(__dirname + '/package.json').version);
            };
            local.cliDict['--version'] = local.cliDict['--version'] || local.cliDict._version;
            local.cliDict['-v'] = local.cliDict['-v'] || local.cliDict._version;
            // run fnc()
            fnc = fnc || function () {
                // default to --help command if no arguments are given
                if (process.argv.length <= 2 && !local.cliDict._default.modeNoCommand) {
                    local.cliDict._help({ modeError: true });
                    process.exit(1);
                    return;
                }
                if (local.cliDict[process.argv[2]]) {
                    local.cliDict[process.argv[2]]();
                    return;
                }
                local.cliDict._default();
            };
            fnc();
        };

        local.cookieDict = function () {
        /*
         * this function will return a dict of all cookies
         */
            var result;
            result = {};
            document.cookie.replace((/(\w+)=([^;]*)/g), function (match0, match1, match2) {
                match0 = match1;
                result[match0] = match2;
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
                match0 = match1;
                document.cookie = match0 + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
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

        local.corsBackendHostInject = function (url, backendHost, rgxInject, location) {
        /*
         * this function will inject backendHost into the url, if location.host is a github site
         */
            location = location || (typeof window === 'object' && window && window.location);
            if (!(backendHost && location && (/\bgithub.io$/).test(location.host))) {
                return url;
            }
            // init github-branch
            location.pathname.replace(
                (/\/build\.\.(alpha|beta|master)\.\.travis-ci\.org\//),
                function (match0, match1) {
                    match0 = match1;
                    backendHost = backendHost.replace('-alpha.', '-' + match0 + '.');
                }
            );
            return url.replace(rgxInject || (/.*()/), backendHost + '$1');
        };

        local.corsForwardProxyHostIfNeeded = function (xhr) {
        /*
         * this function will return xhr.corsForwardProxyHost, if needed
         */
            return local.isBrowser &&
                local.env.npm_package_nameLib &&
                (/^https?:\/\//).test(xhr.url) &&
                xhr.url.indexOf(xhr.location.protocol + '//' + xhr.location.host) !== 0 &&
                (/\.github\.io$/).test(xhr.location.host) &&
                xhr.corsForwardProxyHost !== 'disabled' &&
                (xhr.corsForwardProxyHost || 'https://h1-proxy1.herokuapp.com');
        };

        local.cryptoAesXxxCbcRawDecrypt = function (options, onError) {
        /*
         * this function will aes-xxx-cbc decrypt with the given options
         * example usage:
            data = new Uint8Array([1,2,3]);
            key = '0123456789abcdef0123456789abcdef';
            mode = null;
            local.cryptoAesXxxCbcRawEncrypt({ data: data, key: key, mode: mode }, function (
                error,
                data
            ) {
                console.assert(!error, error);
                local.cryptoAesXxxCbcRawDecrypt({ data: data, key: key, mode: mode }, console.log);
            });
         */
            /*globals Uint8Array*/
            var cipher, crypto, data, ii, iv, key;
            // init key
            key = new Uint8Array(0.5 * options.key.length);
            for (ii = 0; ii < key.byteLength; ii += 2) {
                key[ii] = parseInt(options.key.slice(2 * ii, 2 * ii + 2), 16);
            }
            data = options.data;
            // base64
            if (options.mode === 'base64') {
                data = local.base64ToBuffer(data);
            }
            // normalize data
            if (!(data instanceof Uint8Array)) {
                data = new Uint8Array(data);
            }
            // init iv
            iv = data.subarray(0, 16);
            // optimization - create resized-view of data
            data = data.subarray(16);
            crypto = typeof window === 'object' && window.crypto;
            if (!(crypto && crypto.subtle && typeof crypto.subtle.importKey === 'function')) {
                setTimeout(function () {
                    crypto = require('crypto');
                    cipher = crypto.createDecipheriv(
                        'aes-' + (8 * key.byteLength) + '-cbc',
                        key,
                        iv
                    );
                    onError(null, Buffer.concat([cipher.update(data), cipher.final()]));
                });
                return;
            }
            crypto.subtle.importKey('raw', key, {
                name: 'AES-CBC'
            }, false, ['decrypt']).then(function (key) {
                crypto.subtle.decrypt({ iv: iv, name: 'AES-CBC' }, key, data).then(function (data) {
                    onError(null, new Uint8Array(data));
                }).catch(onError);
            }).catch(onError);
        };

        local.cryptoAesXxxCbcRawEncrypt = function (options, onError) {
        /*
         * this function will aes-xxx-cbc encrypt with the given options
         * example usage:
            data = new Uint8Array([1,2,3]);
            key = '0123456789abcdef0123456789abcdef';
            mode = null;
            local.cryptoAesXxxCbcRawEncrypt({ data: data, key: key, mode: mode }, function (
                error,
                data
            ) {
                console.assert(!error, error);
                local.cryptoAesXxxCbcRawDecrypt({ data: data, key: key, mode: mode }, console.log);
            });
         */
            /*globals Uint8Array*/
            var cipher, crypto, data, ii, iv, key;
            // init key
            key = new Uint8Array(0.5 * options.key.length);
            for (ii = 0; ii < key.byteLength; ii += 2) {
                key[ii] = parseInt(options.key.slice(2 * ii, 2 * ii + 2), 16);
            }
            data = options.data;
            // init iv
            iv = new Uint8Array((((data.byteLength) >> 4) << 4) + 32);
            crypto = typeof window === 'object' && window.crypto;
            if (!(crypto && crypto.subtle && typeof crypto.subtle.importKey === 'function')) {
                setTimeout(function () {
                    crypto = require('crypto');
                    // init iv
                    iv.set(crypto.randomBytes(16));
                    cipher = crypto.createCipheriv(
                        'aes-' + (8 * key.byteLength) + '-cbc',
                        key,
                        iv.subarray(0, 16)
                    );
                    data = cipher.update(data);
                    iv.set(data, 16);
                    iv.set(cipher.final(), 16 + data.byteLength);
                    if (options.mode === 'base64') {
                        iv = local.base64FromBuffer(iv);
                        iv += '\n';
                    }
                    onError(null, iv);
                });
                return;
            }
            // init iv
            iv.set(crypto.getRandomValues(new Uint8Array(16)));
            crypto.subtle.importKey('raw', key, {
                name: 'AES-CBC'
            }, false, ['encrypt']).then(function (key) {
                crypto.subtle.encrypt({
                    iv: iv.subarray(0, 16),
                    name: 'AES-CBC'
                }, key, data).then(function (data) {
                    iv.set(new Uint8Array(data), 16);
                    // base64
                    if (options.mode === 'base64') {
                        iv = local.base64FromBuffer(iv);
                        iv += '\n';
                    }
                    onError(null, iv);
                }).catch(onError);
            }).catch(onError);
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
                query: { buildStartedAt: { $not: { $gt: new Date(
                    Date.now() - (Number(options && options.olderThanLast) || 0)
                ).toISOString() } } }
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
                    self = local.dbTableCustomOrg = local.dbTableCustomOrgCreate(
                        options,
                        options.onNext
                    );
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
                    local.setTimeoutOnError(onError, 0, error, self);
                }
            });
            options.modeNext = 0;
            options.onNext();
            return self;
        };

        local.domElementRender = function (template, dict) {
        /*
         * this function will return a dom-fragment rendered from the givent template and dict
         */
            var tmp;
            tmp = document.createElement('template');
            tmp.innerHTML = local.templateRender(template, dict);
            return tmp.content;
        };

        local.domQuerySelectorAllTagNameAndPrint = function (selector) {
        /*
         * this function will print all tagName's that match the selector
         */
            var dict;
            dict = {};
            Array.from(document.querySelectorAll(selector)).forEach(function (element) {
                dict[element.tagName.toLowerCase()] = true;
            });
            console.log(Object.keys(dict).sort().join('\n'));
        };

        local.domStyleValidate = function () {
        /*
         * this function will validate the document's style
         */
            var rgx, tmp;
            rgx = new RegExp('^0 (?:(body > )?(?:form > )?(?:' +
                '\\.testReportDiv .+|\\.x-istanbul .+|' +
                '\\.button|\\.colorError|\\.uiAnimateShake|\\.uiAnimateSlide|\\.zeroPixel|' +
                'a|body|code|div|input|pre|textarea' +
                ')(?:\\[readonly\\])?(?:,| \\{))');
            tmp = [];
            Array.from(typeof document === 'object' &&
                    document &&
                    typeof document.querySelectorAll === 'function'
                ? document.querySelectorAll('style')
                : []).map(function (element, ii) {
                element.innerHTML.replace((/^([^\n @].*?)[,\{:].*?$/gm), function (match0, match1) {
                    ii = document.querySelectorAll(match1).length;
                    if (!(ii > 1)) {
                        tmp.push(ii + ' ' + match0);
                    }
                });
            });
            tmp
                .filter(function (element) {
                    return !rgx.test(element);
                })
                .sort()
                .reverse()
                .forEach(function (element, ii) {
                    console.error('domStyleValidateUnmatched ' + ii + '. ' + element);
                });
        };

        local.echo = function (arg0) {
        /*
         * this function will return arg0
         */
            return arg0;
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
            if (local.isBrowser) {
                console.error(local.global.fileElectronHtml + ' global_test_results ' +
                    JSON.stringify({ global_test_results: local.global.global_test_results }));
            } else {
                process.exit(exitCode);
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
                { stdio: ['ignore', 1, 2] }
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

        local.isNullOrUndefined = function (arg0) {
        /*
         * this function will test if arg0 is null or undefined
         */
            return arg0 === null || arg0 === undefined;
        };

        local.jslintAndPrintConditional = function (script, file, mode) {
        /*
         * this function will jslint / csslint the script and print any errors to stderr
         * conditionally, depending on macros
         */
            // optimization - ignore uglified/rollup files
            if (!script || script.length >= 0x100000) {
                return script;
            }
            switch (file.replace((/^.*\./), '.')) {
            case '.css':
                if ((/^\/\*csslint\b/m).test(script)) {
                    local.jslintAndPrint(script, file);
                }
                break;
            case '.sh':
                local.jslintAndPrint(script, file);
                break;
            case '.js':
                if (((/^\/\*jslint\b/m).test(script) && !local.global.__coverage__) ||
                        mode === 'force') {
                    local.jslintAndPrint(script, file);
                }
                break;
            }
            // recurse - csslint <style>...</style>
            script.replace(
                (/^<style>(?:\\n\\)?\n([\S\s]+?)\n<\/style>(?:\\n\\)?$/gm),
                function (match0, match1, ii, text) {
                    match0 = match1;
                    local.jslintAndPrintConditional(
                        // preserve lineno
                        text.slice(0, ii).replace((/.+/g), '') + '\n' + match0
                            // filter \\n\\
                            .replace((/\\n\\$/gm), '')
                            // filter ' + ... + '\\
                            .replace((/^' \+ .*? \+ '\\$/gm), ''),
                        file + '.css'
                    );
                }
            );
            // recurse - jslint <script>...</script>
            script.replace((
                /^(?:\/\/ )?<script>(?:\\n\\)?\n([\S\s]+?)\n(?:\/\/ )?<\/script>(?:\\n\\)?$/gm
            ), function (match0, match1, ii, text) {
                match0 = match1;
                local.jslintAndPrintConditional(
                    // preserve lineno
                    text.slice(0, ii).replace((/.+/g), '') + '\n' + match0
                        // filter \\n\\
                        .replace((/\\n\\$/gm), '')
                        // filter ' + ... + '\\
                        .replace((/^' \+ .*? \+ '\\$/gm), ''),
                    file + '.js',
                    mode
                );
            });
            return script;
        };

        local.jsonCopy = function (obj) {
        /*
         * this function will deep-copy obj
         */
            return obj === undefined
                ? undefined
                : JSON.parse(JSON.stringify(obj));
        };

        local.jsonStringifyOrdered = function (obj, replacer, space) {
        /*
         * this function will JSON.stringify obj,
         * with object-keys sorted and circular-references removed
         */
            var circularList, stringify, tmp;
            stringify = function (obj) {
            /*
             * this function will recursively JSON.stringify obj,
             * with object-keys sorted and circular-references removed
             */
                // if obj is not an object or function, then JSON.stringify as normal
                if (!(obj &&
                        typeof obj === 'object' &&
                        typeof obj.toJSON !== 'function')) {
                    return JSON.stringify(obj);
                }
                // ignore circular-reference
                if (circularList.indexOf(obj) >= 0) {
                    return;
                }
                circularList.push(obj);
                // if obj is an array, then recurse its items
                if (Array.isArray(obj)) {
                    return '[' + obj.map(function (obj) {
                        // recurse
                        tmp = stringify(obj);
                        return typeof tmp === 'string'
                            ? tmp
                            : 'null';
                    }).join(',') + ']';
                }
                // if obj is not an array, then recurse its items with object-keys sorted
                return '{' + Object.keys(obj)
                    // sort object-keys
                    .sort()
                    .map(function (key) {
                        // recurse
                        tmp = stringify(obj[key]);
                        if (typeof tmp === 'string') {
                            return JSON.stringify(key) + ':' + tmp;
                        }
                    })
                    .filter(function (obj) {
                        return typeof obj === 'string';
                    })
                    .join(',') + '}';
            };
            circularList = [];
            // try to derefernce all properties in obj
            (function () {
                try {
                    obj = JSON.parse(JSON.stringify(obj));
                } catch (ignore) {
                }
            }());
            return JSON.stringify(typeof obj === 'object' && obj
                // recurse
                ? JSON.parse(stringify(obj))
                : obj, replacer, space);
        };

        local.jwtAes256GcmDecrypt = function (token, key) {
        /*
         * this function will use json-web-encryption to
         * aes-256-gcm-decrypt the token with the given base64url-encoded key
         * https://tools.ietf.org/html/rfc7516
         */
            return local.tryCatchOnError(function () {
                token = token
                    .replace((/-/g), '+')
                    .replace((/_/g), '/')
                    .split('.');
                token = local.sjcl.decrypt(
                    local.sjcl.codec.base64url.toBits(local.jwtAes256KeyInit(key)),
                    JSON.stringify({
                        adata: token[4],
                        ct: token[3],
                        iv: token[2],
                        ks: 256,
                        mode: 'gcm'
                    })
                );
                return local.jwtHs256Decode(token, key);
            }, local.nop) || {};
        };

        local.jwtAes256GcmEncrypt = function (data, key) {
        /*
         * this function will use json-web-encryption to
         * aes-256-gcm-encrypt the data with the given base64url-encoded key
         * https://tools.ietf.org/html/rfc7516
         */
            var adata;
            adata = local.jwtAes256KeyCreate();
            data = local.jwtHs256Encode(data, key);
            data = JSON.parse(local.sjcl.encrypt(
                local.sjcl.codec.base64url.toBits(local.jwtAes256KeyInit(key)),
                data,
                { adata: local.sjcl.codec.base64url.toBits(adata), ks: 256, mode: 'gcm' }
            ));
            return local.normalizeJwtBase64Url('eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4R0NNIn0..' +
                data.iv + '.' + data.ct + '.' + adata);
        };

        local.jwtAes256KeyCreate = function () {
        /*
         * this function will create a random, aes-256-base64url-jwt-key
         */
            return local.normalizeJwtBase64Url(
                local.base64FromBuffer(local.bufferRandomBytes(32))
            );
        };

        local.jwtAes256KeyInit = function (key) {
        /*
         * this function will init the aes-256-base64url-jwt-key
         * https://jwt.io/
         */
            // init npm_config_jwtAes256Key
            local.env.npm_config_jwtAes256Key = local.env.npm_config_jwtAes256Key ||
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
            return key || local.env.npm_config_jwtAes256Key;
        };

        local.jwtHs256Decode = function (token, key) {
        /*
         * this function will decode the json-web-token with the given base64-encoded key
         * https://jwt.io/
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
         * this function will encode the data into a json-web-token
         * with the given base64-encoded key
         * https://jwt.io/
         */
            data = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                local.normalizeJwtBase64Url(local.base64FromString(JSON.stringify(data)));
            return data + '.' + local.sjcl.codec.base64url.fromBits(
                new local.sjcl.misc.hmac(local.sjcl.codec.base64url.toBits(
                    local.jwtAes256KeyInit(key)
                )).encrypt(data)
            );
        };

        local.listGetElementRandom = function (list) {
        /*
         * this function will return a random element from the list
         */
            return list[Math.floor(Math.random() * list.length)];
        };

        local.listShuffle = function (list) {
        /*
         * this function will inplace shuffle the list, via fisher-yates algorithm
         * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
         */
            var ii, random, swap;
            for (ii = list.length - 1; ii > 0; ii -= 1) {
                random = Math.floor(Math.random() * (ii + 1));
                swap = list[ii];
                list[ii] = list[random];
                list[random] = swap;
            }
            return list;
        };

        local.localStorageSetItemOrClear = function (key, value) {
        /*
         * this function will try to set the key/value pair to localStorage,
         * or else call localStorage.clear()
         */
            try {
                localStorage.setItem(key, value);
            } catch (errorCaught) {
                localStorage.clear();
            }
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
                            !(/\bgzip\b/).test(request.headers['accept-encoding'])) {
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

        local.middlewareCacheControlLastModified = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will update the response-header Last-Modified
         */
            // do not cache if headers already sent or url has '?' search indicator
            if (response.headersSent || request.url.indexOf('?') >= 0) {
                nextMiddleware();
                return;
            }
            // init serverResponseHeaderLastModified
            local.serverResponseHeaderLastModified = local.serverResponseHeaderLastModified ||
                // resolve to 1000 ms
                new Date(new Date().toUTCString());
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
                local.serverResponseHeaderLastModified.toUTCString()
            );
            nextMiddleware();
        };

        local.middlewareFileServer = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will serve files
         */
            if (request.method !== 'GET' || local.isBrowser) {
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
                    ((/\.[^\.]*?$/).exec(request.urlParsed.pathname) || {})[0]
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
            if (request.method === 'OPTIONS' && (/forward-proxy-url/)
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
                console.error('serverLog - ' + JSON.stringify({
                    time: new Date(options.timeStart).toISOString(),
                    type: 'middlewareForwardProxyResponse',
                    method: options.method,
                    url: options.url,
                    statusCode: response.statusCode | 0,
                    timeElapsed: Date.now() - options.timeStart,
                    // extra
                    headers: options.headers
                }));
                if (!error) {
                    return;
                }
                // cleanup client
                local.streamCleanup(options.clientRequest);
                local.streamCleanup(options.clientResponse);
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
                ((/\.[^\.]*?$/).exec(request.urlParsed.pathname) || {})[0]
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
                    var argList;
                    argList = Array.from(arguments);
                    argList[0] = local.bufferToNodeBuffer(argList[0]);
                    response['_' + key].apply(response, argList);
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
                    '/assets.index.template.html': local.assetsDict['/assets.index.template.html'],
                    '/assets.swgg.swagger.json': local.assetsDict['/assets.swgg.swagger.json']
                },
                env: {
                    NODE_ENV: local.env.NODE_ENV,
                    npm_config_mode_backend: local.env.npm_config_mode_backend,
                    npm_package_description: local.env.npm_package_description,
                    npm_package_homepage: local.env.npm_package_homepage,
                    npm_package_name: local.env.npm_package_name,
                    npm_package_nameLib: local.env.npm_package_nameLib,
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
            var result;
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
                        result = require('path').resolve(process.cwd(), modulePath + '/' + module);
                        result = require('fs').statSync(result).isDirectory() && result;
                        return result;
                    } catch (errorCaught) {
                        result = null;
                    }
                    return result;
                });
            return result || '';
        };

        local.normalizeChunk = function (chunk) {
        /*
         * this function will normalize the chunk
         */
            return chunk || '';
        };

        local.normalizeJwt = function (data) {
        /*
         * this function will normalize the jwt-data with registered-headers
         * https://tools.ietf.org/html/rfc7519#section-4.1
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

        local.normalizeJwtBase64Url = function (b64) {
        /*
         * this function will normlize b64 to base64url format
         */
            return b64
                .replace((/\=/g), '')
                .replace((/\+/g), '-')
                .replace((/\//g), '_');
        };

        local.numberToRomanNumerals = function (num) {
        /*
         * this function will convert num to a roman-numeral
         * https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
         */
            var digits, ii, key, roman;
            digits = String(+num).split('');
            key = [
                '', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
                '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
                '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'
            ];
            roman = '';
            ii = 3;
            while (ii) {
                ii -= 1;
                roman = (key[+digits.pop() + (ii * 10)] || '') + roman;
            }
            return new Array(+digits.join('') + 1).join('M') + roman;
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
                if (typeof element === 'object' && element && !Array.isArray(element)) {
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

        local.objectSetDefault = function (arg0, defaults, depth) {
        /*
         * this function will recursively set defaults for undefined-items in arg0
         */
            arg0 = arg0 || {};
            defaults = defaults || {};
            Object.keys(defaults).forEach(function (key) {
                var arg2, defaults2;
                arg2 = arg0[key];
                // handle misbehaving getter
                try {
                    defaults2 = defaults[key];
                } catch (ignore) {
                }
                if (defaults2 === undefined) {
                    return;
                }
                // init arg0[key] to default value defaults[key]
                switch (arg2) {
                case '':
                case null:
                case undefined:
                    arg0[key] = defaults2;
                    return;
                }
                // if arg2 and defaults2 are both non-null and non-array objects,
                // then recurse with arg2 and defaults2
                if (depth > 1 &&
                        // arg2 is a non-null and non-array object
                        typeof arg2 === 'object' && arg2 && !Array.isArray(arg2) &&
                        // defaults2 is a non-null and non-array object
                        typeof defaults2 === 'object' && defaults2 && !Array.isArray(defaults2)) {
                    // recurse
                    local.objectSetDefault(arg2, defaults2, depth - 1);
                }
            });
            return arg0;
        };

        local.objectSetOverride = function (arg0, overrides, depth, env) {
        /*
         * this function will recursively set overrides for items in arg0
         */
            arg0 = arg0 || {};
            env = env || (typeof process === 'object' && process.env) || {};
            overrides = overrides || {};
            Object.keys(overrides).forEach(function (key) {
                var arg2, overrides2;
                arg2 = arg0[key];
                overrides2 = overrides[key];
                if (overrides2 === undefined) {
                    return;
                }
                // if both arg2 and overrides2 are non-null and non-array objects,
                // then recurse with arg2 and overrides2
                if (depth > 1 &&
                        // arg2 is a non-null and non-array object
                        typeof arg2 === 'object' && arg2 && !Array.isArray(arg2) &&
                        // overrides2 is a non-null and non-array object
                        typeof overrides2 === 'object' && overrides2 &&
                        !Array.isArray(overrides2)) {
                    local.objectSetOverride(arg2, overrides2, depth - 1, env);
                    return;
                }
                // else set arg0[key] with overrides[key]
                arg0[key] = arg0 === env
                    // if arg0 is env, then overrides falsey value with empty string
                    ? overrides2 || ''
                    : overrides2;
            });
            return arg0;
        };

        local.objectTraverse = function (arg0, onSelf, circularList) {
        /*
         * this function will recursively traverse arg0, and run onSelf with arg0's properties
         */
            onSelf(arg0);
            circularList = circularList || [];
            if (arg0 && typeof arg0 === 'object' && circularList.indexOf(arg0) < 0) {
                circularList.push(arg0);
                Object.keys(arg0).forEach(function (key) {
                    // recurse with arg0[key]
                    local.objectTraverse(arg0[key], onSelf, circularList);
                });
            }
            return arg0;
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
            var onError2, stack;
            stack = new Error().stack.replace((/(.*?)\n.*?$/m), '$1');
            onError2 = function (error, data, meta) {
                if (error &&
                        error !== local.errorDefault &&
                        String(error.stack).indexOf(stack.split('\n')[2]) < 0) {
                    // append the current stack to error.stack
                    error.stack += '\n' + stack;
                }
                onError(error, data, meta);
            };
            // debug onError
            onError2.toString = function () {
                return String(onError);
            };
            return onError2;
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
                local.assert(
                    onParallel.counter >= 0 || error || onParallel.error,
                    'invalid onParallel.counter = ' + onParallel.counter
                );
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
         * 2. call onError when onParallel.ii + 1 === options.list.length
         */
            var isListEnd, onEach2, onParallel;
            options.list = options.list || [];
            onEach2 = function () {
                while (true) {
                    if (!(onParallel.ii + 1 < options.list.length)) {
                        isListEnd = true;
                        return;
                    }
                    if (!(onParallel.counter < options.rateLimit + 1)) {
                        return;
                    }
                    onParallel.ii += 1;
                    onEach({
                        element: options.list[onParallel.ii],
                        ii: onParallel.ii,
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
                // restart if options.list has grown
                if (isListEnd && (onParallel.ii + 1 < options.list.length)) {
                    isListEnd = null;
                    onEach2();
                }
            });
            onParallel.ii = -1;
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
            }, timeout);
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
                match = (/^(\S+)(.*?)\n/).exec(script) || {};
                onError2 = function (error, data) {
                    // debug error
                    global.utility2_debugReplError = error || global.utility2_debugReplError;
                    onError(error, data);
                };
                switch (match[1]) {
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
                    require('child_process').spawn('find . -type f | grep -v -E ' +
/* jslint-ignore-begin */
'"\
/\\.|(\\b|_)(\\.\\d|\
archive|artifact|\
bower_component|build|\
coverage|\
doc|\
external|\
fixture|\
git_module|\
jquery|\
log|\
min|mock|\
node_module|\
rollup|\
swp|\
tmp|\
vendor)s{0,1}(\\b|_)\
" ' +
/* jslint-ignore-end */
                            '| tr "\\n" "\\000" | xargs -0 grep -HIin -E "' +
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
                }, local.onErrorDefault);
                onError();
            }, local.onErrorThrow);
            return exports;
        };

        local.requireReadme = function () {
        /*
         * this function will require and export example.js embedded in README.md
         */
            var module, script, tmp;
            // init module.exports
            module = {};
            if (local.isBrowser) {
                module.exports = local.objectSetDefault(
                    local.global.utility2_rollup || local.global.local,
                    local
                );
                return module.exports;
            }
            // start repl-debugger
            local.replStart();
            // debug dir
            local.fs.readdirSync(process.cwd()).forEach(function (file) {
                file = process.cwd() + '/' + file;
                // if the file is modified, then restart the process
                local.onFileModifiedRestart(file);
                switch (local.path.basename(file)) {
                // swagger-validate assets.swgg.swagger.json
                case 'assets.swgg.swagger.json':
                    local.fs.readFile(file, 'utf8', function (error, data) {
                        local.tryCatchOnError(function () {
                            // validate no error occurred
                            local.assert(!error, error);
                            local.swgg.swaggerValidate(JSON.parse(data));
                        }, local.onErrorDefault);
                    });
                    break;
                }
                switch (local.path.extname(file)) {
                case '.css':
                case '.html':
                case '.js':
                case '.json':
                case '.sh':
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
            if (local.global.utility2_rollup || local.env.npm_config_mode_start) {
                // init assets
                local.assetsDict['/'] = local.assetsDict['/index.html'] =
                    local.tryCatchReadFile('index.html') ||
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
                local.assetsDict['/assets.app.js'] = local.fs.readFileSync(
                    __filename,
                    'utf8'
                ).replace((/^#!\//), '// ');
                // init exports
                local[local.env.npm_package_nameLib] = local;
                module.exports = local;
                return module.exports;
            }
            // init file $npm_package_main
            global.utility2_moduleExports = require(
                process.cwd() + '/' + local.env.npm_package_main
            );
            global.utility2_moduleExports.global = global;
            // read script from README.md
            script = local.templateRenderJslintLite(
                local.assetsDict['/assets.example.template.js'],
                {}
            );
            local.tryCatchOnError(function () {
                tmp = !local.env.npm_package_buildCustomOrg &&
                    (/```\w*?(\n[\W\s]*?example\.js[\n\"][\S\s]+?)\n```/).exec(
                        local.fs.readFileSync('README.md', 'utf8')
                    );
                script = tmp.input.slice(0, tmp.index).replace((/.+/g), '') + tmp[1];
            }, local.nop);
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
            // init module.exports
            module = require.cache[tmp] = new local.Module(tmp);
            // load script into module
            module._compile(script, tmp);
            // init exports
            module.exports.utility2 = local;
            module.exports[local.env.npm_package_nameLib] = global.utility2_moduleExports;
            // init assets
            tmp = process.cwd() + '/' + local.env.npm_package_main;
            local.assetsDict['/assets.' + local.env.npm_package_nameLib + '.js'] =
                local.fs.readFileSync(tmp, 'utf8').replace((/^#!\//), '// ');
            local.objectSetOverride(local.assetsDict, module.exports.assetsDict);
            local.assetsDict['/assets.' + local.env.npm_package_nameLib + '.js'] =
                local.istanbulInstrumentInPackage(
                    local.assetsDict['/assets.' + local.env.npm_package_nameLib + '.js'],
                    tmp
                );
            module.exports.assetsDict = local.assetsDict;
            local.assetsDict['/assets.example.js'] = script;
            local.assetsDict['/assets.test.js'] = local.istanbulInstrumentInPackage(
                local.fs.readFileSync('test.js', 'utf8'),
                process.cwd() + '/test.js'
            );
            // init assets index.html
            local.tryCatchOnError(function () {
                local.assetsDict['/assets.index.template.html'] = local.fs.readFileSync(
                    'assets.index.template.html',
                    'utf8'
                );
            }, local.nop);
            ['index', 'utility2'].forEach(function (element) {
                local.assetsDict['/' + element + '.html'] =
                    local.assetsDict['/' + element + '.html'] ||
                    local.templateRender(
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
                    );
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
    3. open a browser to http://127.0.0.1:8081 and play with the web-demo\n\
    4. edit this script to suit your needs\n\
*/\n\
' + local.assetsDict['/assets.utility2.rollup.begin.js']
    .replace((/utility2_rollup/g), 'utility2_app');
/* jslint-ignore-end */
                case '/assets.lib.js':
                    // handle large string-replace
                    tmp = '/assets.' + local.env.npm_package_nameLib + '.js';
                    script = local.assetsDict['/assets.utility2.rollup.content.js']
                        .split('/* utility2.rollup.js content */');
                    script.splice(1, 0, 'local.assetsDict["' + tmp + '"] = ' +
                            JSON.stringify(local.assetsDict[tmp]).replace((/\\n/g), '\\n\\\n'));
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
            return module.exports;
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
                console.error('serverLog - ' + JSON.stringify({
                    time: new Date(request.timeStart).toISOString(),
                    type: 'serverResponse',
                    method: request.method,
                    url: request.url,
                    statusCode: response.statusCode | 0,
                    timeElapsed: Date.now() - request.timeStart,
                    // extra
                    requestContentLength: request.dataLength || 0,
                    responseContentLength: response.contentLength,
                    requestHeaderXForwardedFor: request.headers['x-forwarded-for'] || '',
                    requestHeaderOrigin: request.headers.origin || '',
                    requestHeaderReferer: request.headers.referer || '',
                    requestHeaderUserAgent: request.headers['user-agent']
                }));
                // cleanup timerTimeout
                clearTimeout(request.timerTimeout);
            };
            request.timeStart = Date.now();
            request.onTimeout = request.onTimeout || function (error) {
                local.serverRespondDefault(request, response, 500, error);
                setTimeout(function () {
                    // cleanup request and response
                    local.streamCleanup(request);
                    local.streamCleanup(response);
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
                chunk = local.normalizeChunk(chunk);
                response.contentLength += chunk.length;
                response.writeContentLength(chunk, encoding, callback);
            };
            response.on('error', onError);
            response.on('finish', onError);
        };

        local.setTimeoutOnError = function (onError, timeout, error, data) {
        /*
         * this function will async-call onError
         */
            if (typeof onError === 'function') {
                setTimeout(function () {
                    onError(error, data);
                }, timeout);
            }
            return data;
        };

        local.sjclHashScryptCreate = function (password, options) {
        /*
         * this function will create a scrypt-hash of the password
         * with the given options (default = $s0$10801)
         * e.g. $s0$e0801$epIxT/h6HbbwHaehFnh/bw==$7H0vsXlY8UxxyW/BWx/9GuY7jEvGjT71GFd6O4SZND0=
         * https://github.com/wg/scrypt
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
         * this function will validate the password against the scrypt-hash
         * https://github.com/wg/scrypt
         */
            return local.sjclHashScryptCreate(password, hash) === hash;
        };

        local.sjclHashSha1Create = function (data) {
        /*
         * this function will create a base64-encoded sha1 hash of the string data
         */
            return local.sjcl.codec.base64.fromBits(local.sjcl.hash.sha1.hash(data));
        };

        local.sjclHashSha256Create = function (data) {
        /*
         * this function will create a base64-encoded sha256 hash of the string data
         */
            return local.sjcl.codec.base64.fromBits(local.sjcl.hash.sha256.hash(data));
        };

        local.sjclHmacSha1Create = function (key, data) {
        /*
         * this function will create a base64-encoded sha1 hmac
         * from the string key and string data
         */
            return local.sjcl.codec.base64.fromBits(
                (new local.sjcl.misc.hmac(
                    local.sjcl.codec.utf8String.toBits(key),
                    local.sjcl.hash.sha1
                )).mac(local.sjcl.codec.utf8String.toBits(data))
            );
        };

        local.sjclHmacSha256Create = function (key, data) {
        /*
         * this function will create a base64-encoded sha256 hmac
         * from the string key and string data
         */
            return local.sjcl.codec.base64.fromBits(
                (new local.sjcl.misc.hmac(
                    local.sjcl.codec.utf8String.toBits(key),
                    local.sjcl.hash.sha256
                )).mac(local.sjcl.codec.utf8String.toBits(data))
            );
        };

        local.stateInit = function (options) {
        /*
         * this function will init the state-options
         */
            local.objectSetOverride(local, options, 10);
            // init swgg
            local.swgg.apiUpdate(local.swgg.swaggerJson);
        };

        local.streamCleanup = function (stream) {
        /*
         * this function will try to end or destroy the stream
         */
            // try to end the stream
            try {
                stream.end();
            } catch (errorCaught) {
                // if error, then try to destroy the stream
                try {
                    stream.destroy();
                } catch (ignore) {
                }
            }
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
                    chunk = local.normalizeChunk(chunk);
                    chunkList.push(chunk);
                    stream.dataLength += chunk.length;
                })
                // on end event, pass concatenated read buffer to onError
                .on('end', function () {
                    onError(null, local.isBrowser
                        ? chunkList[0]
                        : local.bufferConcat(chunkList));
                })
                // on error event, pass error to onError
                .on('error', onError);
        };

        local.stringCustomizeFromToRgx = function (textFrom, textTo, rgx) {
        /*
         * this function will customize a segment of textTo with a segment of textFrom,
         * with the given rgx
         */
            textFrom.replace(rgx, function (match0) {
                textTo.replace(rgx, function (match1) {
                    textTo = textTo.split(match1);
                    textTo[0] += match0;
                    textTo[0] += textTo.splice(1, 1)[0];
                    textTo = textTo.join(match1);
                });
            });
            return textTo;
        };

        local.stringHtmlSafe = function (text) {
        /*
         * this function will make the text html-safe
         * https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html
         */
            return text
                .replace((/"/g), '&quot;')
                .replace((/&/g), '&amp;')
                .replace((/'/g), '&apos;')
                .replace((/</g), '&lt;')
                .replace((/>/g), '&gt;')
                .replace((/&amp;(amp;|apos;|gt;|lt;|quot;)/ig), '&$1');
        };

        local.stringRegexpEscape = function (text) {
        /*
         * this function will regexp-escape text
         * https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
         */
            return text.replace(/[\-\/\\\^$*+?.()|\[\]{}]/g, '\\$&');
        };

        local.stringTruncate = function (text, maxLength) {
        /*
         * this function will truncate text to the given maxLength
         */
            return text.length > maxLength
                ? text.slice(0, maxLength - 3).trimRight() + '...'
                : text;
        };

        local.stringUniqueKey = function (text) {
        /*
         * this function will return a string-key that is unique in the given text
         */
            var key;
            // seed the key with the least frequent letters in the english-language
            // https://en.wikipedia.org/wiki/Letter_frequency
            key = 'zqxj';
            do {
                key += ((1 + Math.random()) * 0x10000000000000).toString(36).slice(1);
            } while (text.indexOf(key) >= 0);
            return key;
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
                    .map(function (arg) {
                        if (arg && arg.stack) {
                            arg = local.objectSetDefault(local.jsonCopy(arg), {
                                message: arg.message,
                                name: arg.name,
                                stack: arg.stack
                            });
                        }
                        return arg;
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
         * 2. run onTask in background to update cache
         * 3. save onTask's result to cache
         * 4. if cache-miss, then call onError with onTask's result
         */
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                // 1. if cache-hit, then call onError with cacheValue
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
                // 2. run onTask in background to update cache
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

        local.templateRender = function (template, dict, options) {
        /*
         * this function will render the template with the given dict
         */
            var argList, getValue, match, renderPartial, rgx, tryCatch, skip, value;
            dict = dict || {};
            options = options || {};
            getValue = function (key) {
                argList = key.split(' ');
                value = dict;
                if (argList[0] === '#this/') {
                    return;
                }
                // iteratively lookup nested values in the dict
                argList[0].split('.').forEach(function (key) {
                    value = value && value[key];
                });
                return value;
            };
            renderPartial = function (match0, helper, key, partial) {
                switch (helper) {
                case 'each':
                case 'eachTrimRightComma':
                    value = getValue(key);
                    value = Array.isArray(value)
                        ? value.map(function (dict) {
                            // recurse with partial
                            return local.templateRender(partial, dict, options);
                        }).join('')
                        : '';
                    // remove trailing-comma from last element
                    if (helper === 'eachTrimRightComma') {
                        value = value.trimRight().replace((/,$/), '');
                    }
                    return value;
                case 'if':
                    partial = partial.split('{{#unless ' + key + '}}');
                    partial = getValue(key)
                        ? partial[0]
                        // handle 'unless' case
                        : partial.slice(1).join('{{#unless ' + key + '}}');
                    // recurse with partial
                    return local.templateRender(partial, dict, options);
                case 'unless':
                    return getValue(key)
                        ? ''
                        // recurse with partial
                        : local.templateRender(partial, dict, options);
                default:
                    // recurse with partial
                    return match0[0] + local.templateRender(match0.slice(1), dict, options);
                }
            };
            tryCatch = function (fnc, message) {
            /*
             * this function will prepend the message to errorCaught
             */
                try {
                    return fnc();
                } catch (errorCaught) {
                    errorCaught.message = message + errorCaught.message;
                    throw errorCaught;
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
                var markdownToHtml, notHtmlSafe;
                notHtmlSafe = options.notHtmlSafe;
                return tryCatch(function () {
                    getValue(match0.slice(2, -2));
                    if (value === undefined) {
                        return match0;
                    }
                    argList.slice(1).forEach(function (arg0, ii, list) {
                        switch (arg0) {
                        case 'alphanumeric':
                            value = value.replace((/\W/g), '_');
                            break;
                        case 'decodeURIComponent':
                            value = decodeURIComponent(value);
                            break;
                        case 'encodeURIComponent':
                            value = encodeURIComponent(value);
                            break;
                        case 'jsonStringify':
                            value = JSON.stringify(value);
                            break;
                        case 'jsonStringify4':
                            value = JSON.stringify(value, null, 4);
                            break;
                        case 'markdownSafe':
                            value = value.replace((/`/g), '\'');
                            break;
                        case 'markdownToHtml':
                            markdownToHtml = true;
                            break;
                        case 'notHtmlSafe':
                            notHtmlSafe = true;
                            break;
                        case 'truncate':
                            skip = ii + 1;
                            if (value.length > list[skip]) {
                                value = value.slice(0, list[skip] - 3).trimRight() + '...';
                            }
                            break;
                        // default to String.prototype[arg0]()
                        default:
                            if (ii === skip) {
                                break;
                            }
                            value = value[arg0]();
                            break;
                        }
                    });
                    value = String(value);
                    // default to htmlSafe
                    if (!notHtmlSafe) {
                        value = value
                            .replace((/&/g), '&amp;')
                            .replace((/"/g), '&quot;')
                            .replace((/'/g), '&apos;')
                            .replace((/</g), '&lt;')
                            .replace((/>/g), '&gt;')
                            .replace((/&amp;(amp;|apos;|gt;|lt;|quot;)/ig), '&$1');
                    }
                    if (markdownToHtml && typeof local.marked === 'function') {
                        value = local.marked(value)
                            .replace((/&amp;(amp;|apos;|gt;|lt;|quot;)/ig), '&$1');
                    }
                    return value;
                }, 'templateRender could not render expression ' + JSON.stringify(match0) + '\n');
            });
        };

        local.templateRenderJslintLite = function (template, options) {
        /*
         * this function will render the jslint-lite template with the given options.packageJson
         */
            options.packageJson = options.packageJson ||
                JSON.parse(local.fs.readFileSync('package.json', 'utf8'));
            local.objectSetDefault(options.packageJson, {
                nameLib: options.packageJson.name.replace((/\W/g), '_'),
                repository: { url: 'https://github.com/kaizhu256/node-' +
                    options.packageJson.name + '.git' }
            }, 2);
            options.githubRepo = options.packageJson.repository.url.split('/').slice(-2);
            options.githubRepo[1] = options.githubRepo[1].replace((/\.git$/), '');
            template = template.replace(
                (/https:\/\/kaizhu256\.github\.io\/node-jslint-lite/g),
                'https://' + options.githubRepo[0] + '.github.io/' + options.githubRepo[1]
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
            template = template.replace((/jslint-lite/g), options.packageJson.name);
            template = template.replace(
                '/* istanbul instrument in package jslint */',
                '/* istanbul instrument in package ' + options.packageJson.nameLib + ' */'
            );
            template = template.replace(
                (/\bh1-jslint\b/g),
                options.packageJson.nameHeroku ||
                    ('h1-' + options.packageJson.nameLib.replace((/_/g), '-'))
            );
            template = template.replace(
                'assets.{{env.npm_package_nameLib}}',
                'assets.' + options.packageJson.nameLib
            );
            template = template.replace('my-app', options.packageJson.name);
            template = template.replace('my_app', options.packageJson.nameLib);
            if (options.customizeAfter) {
                return template;
            }
            template = template.replace(
                (/\b(assets\.|lib\.|local\.|utility2_)jslint\b/g),
                '$1' + options.packageJson.nameLib
            );
            return template;
        };

        local.testCase_nop_default = function (options, onError) {
        /*
         * this function will test nop's default handling-behavior
         */
            local.nop();
            onError(null, options);
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
                // suppress console.error and console.log
                if (!(mockList[0] && mockList[0][0] === console)) {
                    mockList.unshift([console, {}]);
                }
                local.objectSetDefault(mockList[0][1], { error: local.nop, log: local.nop });
                // mock-objects
                mockList.forEach(function (mock) {
                    mock[2] = {};
                    // backup mock[0] into mock[2]
                    Object.keys(mock[1]).forEach(function (key) {
                        mock[2][key] = typeof process === 'object' &&
                                process.env === mock[0] &&
                                mock[0][key] === undefined
                            // handle process.env
                            ? ''
                            : mock[0][key];
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
                    typeof testReport === 'object' && testReport,
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
                testPlatform.testCaseList.sort(function (arg0, arg1) {
                    return arg0.status.replace('passed', 'z') + arg0.name >
                        arg1.status.replace('passed', 'z') + arg1.name
                        ? 1
                        : -1;
                });
            });
            // sort testPlatformList by status and name
            testReport.testPlatformList.sort(function (arg0, arg1) {
                return arg0.status.replace('passed', 'z') + arg0.name >
                    arg1.status.replace('passed', 'z') + arg1.name
                    ? 1
                    : -1;
            });
            // stop testReport timer
            if (!testReport.testsPending) {
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
                testReport.timeElapsed = Math.max(
                    testReport.timeElapsed,
                    testPlatform.timeElapsed
                );
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
                                testCaseList: testPlatform.testCaseList.map(function (testCase) {
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
            if (!local.global.utility2_modeTestRun) {
                local.global.utility2_modeTestRun = 1;
                setTimeout(function () {
                    local.testRunBefore();
                    local.onReadyAfter(function () {
                        local.testRunDefault(options);
                    });
                });
                return;
            }
            if (local.global.utility2_modeTestRun !== 1) {
                return;
            }
            local.global.utility2_modeTestRun = 2;
            // visual notification - testRun
            local.ajaxProgressUpdate();
            // mock serverLog
            local._testRunConsoleError = local._testRunConsoleError || console.error;
            console.error = function (arg0) {
            /*
             * this function will ignore serverLog-messages during test-run
             */
                if (!(typeof arg0 === 'string' && arg0.indexOf('serverLog - {') === 0)) {
                    local._testRunConsoleError.apply(console, arguments);
                }
            };
            if (!local.isBrowser) {
                // mock proces.exit
                exit = process.exit;
                process.exit = local.nop;
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
            if (local.isBrowser) {
                testReportDiv1 = document.querySelector('#testReportDiv1');
            }
            testReportDiv1 = testReportDiv1 || { style: {} };
            local.uiAnimateSlideDown(testReportDiv1);
            testReportDiv1.innerHTML = local.testReportMerge(testReport, {});
            // update test-report status every 1000 ms until isDone
            timerInterval = setInterval(function () {
                // update testReportDiv1 in browser
                testReportDiv1.innerHTML = local.testReportMerge(testReport, {});
                if (!testReport.testsPending) {
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
                    console.error('[' + (local.isBrowser
                        ? 'browser'
                        : 'node') + ' test-case ' +
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
                local.global.utility2_modeTestRun = 0;
                local.ajaxProgressUpdate();
                // stop testPlatform timer
                local.timeElapsedPoll(testPlatform);
                // finalize testReport
                local.testReportMerge(testReport, {});
                if (local.isBrowser) {
                    // notify saucelabs of test results
                    // https://docs.saucelabs.com/reference/rest-api/#js-unit-testing
                    local.global.global_test_results = {
                        coverage: local.global.__coverage__,
                        failed: testReport.testsFailed,
                        testReport: testReport
                    };
                } else {
                    // create test-report.json
                    local.fs.writeFileSync(
                        local.env.npm_config_dir_build + '/test-report.json',
                        JSON.stringify(testReport)
                    );
                    // cleanup $npm_config_dir_tmp
                    local.child_process.spawnSync('rm -f ' + local.env.npm_config_dir_tmp +
                        '/electron.*', { shell: true, stdio: ['ignore', 1, 2] });
                }
                setTimeout(function () {
                    // restore serverLog
                    console.error = local._testRunConsoleError;
                    if (local.isBrowser) {
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
                    } else {
                        // restore process.exit
                        process.exit = exit;
                    }
                    // exit with number of tests failed
                    local.exit(testReport.testsFailed);
                // coverage-hack - wait 1000 ms for timerInterval
                }, 1000);
            });
        };

        local.testRunInit = function (local) {
        /*
         * this function will init testRunXxx
         */
            // init testCase_buildXxx
            Object.keys(local).forEach(function (key) {
                if (key.indexOf('_testCase_build') === 0 ||
                        key === '_testCase_webpage_default') {
                    local[key.slice(1)] = local[key.slice(1)] || local[key];
                }
            });
            // run test
            setTimeout(function () {
                if (!local.isBrowser || local.global.utility2_serverHttp1) {
                    local.testRunServer(local);
                    return;
                }
                if (local.modeTest &&
                        local.testRunBrowser &&
                        document.querySelector('#testRunButton1')) {
                    document.querySelector('#testRunButton1').click();
                    return;
                }
                local.testRunDefault(local);
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
                local.middlewareJsonpStateInit,
                local.middlewareFileServer
            ];
            local.serverLocalRequestHandler = function (request, response) {
                var self;
                self = {};
                local.onNext(self, function (error) {
                    if (error || self.modeNext >= local.middlewareList.length) {
                        local._middlewareError(error, request, response);
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
            local.global.utility2_serverHttp1 = local.http.createServer(
                local.serverLocalRequestHandler
            );
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
            var result;
            // validate onError
            local.assert(typeof onError === 'function', typeof onError);
            try {
                // reset errorCaught
                local._debugTryCatchError = null;
                result = fnc();
                local._debugTryCatchError = null;
                return result;
            } catch (errorCaught) {
                // debug errorCaught
                local._debugTryCatchError = errorCaught;
                return onError(errorCaught);
            }
        };

        local.tryCatchReadFile = function (file, options) {
        /*
         * this function will try to read the file or return an empty string
         */
            var data;
            try {
                data = local.fs.readFileSync(file, options);
            } catch (ignore) {
            }
            return data || '';
        };

        local.uiAnimateShake = function (element, onError) {
        /*
         * this function will shake the dom-element
         */
            if (!element || element.classList.contains('uiAnimateShake')) {
                local.setTimeoutOnError(onError);
                return;
            }
            element.classList.add('uiAnimateShake');
            setTimeout(function () {
                element.classList.remove('uiAnimateShake');
                local.setTimeoutOnError(onError);
            }, 500);
        };

        local.uiAnimateShakeIfError = function (error, element, onError) {
        /*
         * this function will shake the dom-element if error occurred
         */
            var hasError;
            if (!element) {
                local.setTimeoutOnError(onError);
                return;
            }
            hasError = element.classList.contains('hasError');
            if (error && !hasError) {
                element.classList.add('hasError');
                local.uiAnimateShake(element, onError);
                return;
            }
            if (!error && hasError) {
                element.classList.remove('hasError');
            }
            local.setTimeoutOnError(onError);
        };

        local.uiAnimateSlideAccordian = function (element, elementList, onError) {
        /*
         * this function will slideDown the element,
         * and slideUp all other elements in elementList
         */
            elementList.forEach(function (element2) {
                if (element2 !== element) {
                    local.uiAnimateSlideUp(element2);
                }
            });
            setTimeout(function () {
                local.uiAnimateSlideDown(element, onError);
            }, 250);
        };

        local.uiAnimateSlideDown = function (element, onError) {
        /*
         * this function will slideDown the dom-element
         */
            onError = onError || local.nop;
            if (!(element &&
                    element.style && element.style.maxHeight !== '100%' &&
                    element.classList && element.classList.contains('uiAnimateSlide'))) {
                onError();
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
                onError();
            }, 250);
        };

        local.uiAnimateSlideUp = function (element, onError) {
        /*
         * this function will slideUp the dom-element
         */
            if (!(element &&
                    element.style && element.style.maxHeight !== '0px' &&
                    element.classList && element.classList.contains('uiAnimateSlide'))) {
                local.setTimeoutOnError(onError);
                return;
            }
            element.style.borderBottom = '0';
            element.style.borderTop = '0';
            element.style.marginBottom = '0';
            element.style.marginTop = '0';
            element.style.maxHeight = '0';
            element.style.paddingBottom = '0';
            element.style.paddingTop = '0';
            local.setTimeoutOnError(onError, 250);
        };

        local.urlJoin = function (aa, bb) {
        /*
         * this function will, if bb is relative, url-join aa with bb
         */
            // bb is absolute-url
            if ((/^\w+?:\/\//).test(bb)) {
                return bb;
            }
            // bb is absolute-url without protocol
            if (bb.slice(0, 2) === '//') {
                return aa.split('/')[0] + bb;
            }
            // bb is absolute-url without host
            if (bb[0] === '/') {
                return aa.split('/').slice(0, 3).join('/') + bb;
            }
            // bb is relative-url
            if (aa.split('/').length < 4) {
                aa += '/';
            }
            return aa.replace((/[?#].*?$/), '').replace((/[^\/]*?$/), '') + bb;
        };

        local.urlParse = function (url) {
        /*
         * this function will parse the url according to the above spec, plus a query param
         * https://developer.mozilla.org/en-US/docs/Web/API/URL
         */
            var urlParsed;
            urlParsed = {};
            // try to parse the url
            local.tryCatchOnError(function () {
                // resolve host-less url
                if (local.isBrowser) {
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
                } else {
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
                    id += ((Math.random() * 16) | 0).toString(16);
                    break;
                case 12:
                    id += '-';
                    id += '4';
                    break;
                case 16:
                    id += '-';
                    id += ((Math.random() * 4) | 8).toString(16);
                    break;
                default:
                    // coerce to finite integer
                    id += ((Math.random() * 16) | 0).toString(16);
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
        local.env = local.isBrowser
            ? {}
            : process.env;
        local.objectSetDefault(local.env, {
            npm_package_nameLib: (local.env.npm_package_name || '').replace((/\W/g), '_')
        });
        local.objectSetDefault(local.env, {
            npm_package_description: 'the greatest app in the world!',
            npm_package_name: 'my-app',
            npm_package_nameLib: 'my_app',
            npm_package_version: '0.0.1'
        });
        local.errorDefault = new Error('default error');
        local.istanbulCoverageMerge = local.istanbul.coverageMerge || local.echo;
        // cbranch-no cstat-no fstat-no missing-if-branch
        local.istanbulCoverageReportCreate = local.istanbul.coverageReportCreate || local.echo;
        local.istanbulInstrumentInPackage = local.istanbul.instrumentInPackage || local.echo;
        local.istanbulInstrumentSync = local.istanbul.instrumentSync || local.echo;
        local.jslintAndPrint = local.jslint.jslintAndPrint || local.echo;
        local.regexpCharsetEncodeUri = (/\w!#\$%&'\(\)\*\+,\-\.\/:;=\?@~/);
        local.regexpCharsetEncodeUriComponent = (/\w!%'\(\)\*\-\.~/);
        // https://github.com/chjj/marked/blob/v0.3.7/lib/marked.js#L499
        local.regexpMatchUrl = (/\bhttps?:\/\/[^\s<]+[^<.,:;"')\]\s]/);
        // https://www.w3.org/TR/html5/sec-forms.html#email-state-typeemail
        local.regexpValidateEmail = new RegExp(
            '^[a-zA-Z0-9.!#$%&\'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}' +
                '[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
        );
        // https://en.wikipedia.org/wiki/E.164
        local.regexpValidatePhone = (/^(?:\+\d{1,3}[ \-]?)?(?:\(\d{1,4}\)[ \-]?)?\d[\d \-]{7,17}$/);
        local.regexpValidateUuid =
            (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
        local.stringCharsetAscii =
            '\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f' +
            '\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f' +
            ' !"#$%&\'()*+,-./0123456789:;<=>?' +
            '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_' +
            '`abcdefghijklmnopqrstuvwxyz{|}~\x7f';
        local.stringCharsetEncodeUri = '!#$%&\'()*+,-./' +
            '0123456789:;=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~';
        local.stringCharsetEncodeUriComponent = '!%\'()*-.' +
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~';
        // mock swgg
        local.swgg = local.swgg || {
            apiUpdate: local.nop,
            normalizeSwaggerJson: local.nop,
            swaggerValidate: local.nop
        };
        local.taskOnTaskDict = {};
        local.testReport = { testPlatformList: [{
            name: local.isBrowser
                ? 'browser - ' + location.pathname + ' - ' + navigator.userAgent + ' - ' +
                    new Date().toISOString()
                : 'node - ' + process.platform + ' ' + process.version + ' - ' +
                    new Date().toISOString(),
            screenshot: local.env.MODE_BUILD_SCREENSHOT_IMG,
            testCaseList: []
        }] };
        // init serverLocalHost
        local.urlParse('');
        // init timeoutDefault
        if (local.isBrowser) {
            location.search.replace(
                (/\b(NODE_ENV|mode[A-Z]\w+|timeExit|timeoutDefault)=([^&#]+)/g),
                function (match0, key, value) {
                    match0 = decodeURIComponent(value);
                    local[key] = local.env[key] = match0;
                    // try to JSON.parse the string
                    local.tryCatchOnError(function () {
                        local[key] = JSON.parse(match0);
                    }, local.nop);
                }
            );
        } else {
            local.timeoutDefault = local.env.npm_config_timeout_default;
        }
        // init timeExit
        local.timeExit = Number(local.env.npm_config_time_exit) || local.timeExit ||
            Number(Date.now() + Number(local.env.npm_config_timeout_exit));
        if (local.timeExit) {
            local.timeoutDefault = local.timeExit - Date.now();
            setTimeout(local.exit, local.timeoutDefault);
        }
        // re-init timeoutDefault
        local.timeoutDefault = Number(local.timeoutDefault) || 30000;
        local.onReadyAfter(local.nop);
        // init uglify
        local.uglify = local.uglifyjs.uglify || local.echo;
    }());



    // run browser js-env code - init-after
    (function () {
        if (!local.isBrowser) {
            return;
        }
        // require modules
        local.http = local._http;
        local.https = local._http;
    }());



    // run node js-env code - init-after
    /* istanbul ignore next */
    (function () {
        if (local.isBrowser) {
            return;
        }
        local.Module = require('module');
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
            if (process.argv[2] !== '--help') {
                console.error('\n' + local.env.MODE_BUILD + ' - merged test-report from file ' +
                    local.env.npm_config_file_test_report_merge);
            }
        }
        // init cli
        local.cliDict = {};
        local.cliDict['utility2.ajax'] = function () {
        /*
         * <url>
         * # ajax <url> and print response to stdout
         */
            local.ajax({ url: process.argv[3] }, function (error, xhr) {
                local.onErrorThrow(error);
                process.stdout.write(xhr.response);
            });
        };
        local.cliDict['utility2.browserTest'] = function () {
        /*
         * <url> <mode>
         * # run browserTest on the url with the given mode
         */
            local.onParallelList({
                list: process.argv[3].split(/\s+/).filter(function (element) {
                    return element;
                })
            }, function (options2, onParallel) {
                onParallel.counter += 1;
                local.browserTest({ url: options2.element }, function () {
                    onParallel();
                });
            }, local.exit);
        };
        local.cliDict['utility2.customOrgStarFilterNotBuilt'] = function () {
        /*
         * <begin> <end>
         * # filter customOrg
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
                        // validate no error occurred
                        local.assert(!error, error);
                        console.error('utility2.customOrgStarFilterNotBuilt - fetched ' + xhr.url);
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
                                            'utility2.customOrgStarFilterNotBuilt - not built - ' +
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
        local.cliDict['utility2.dbTableCustomOrgCrudGetManyByQuery'] = function () {
        /*
         * <dbTableAndQuery>
         * # query dbTableCustomOrg
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
        local.cliDict['utility2.dbTableCustomOrgUpdate'] = function () {
        /*
         * <dbTable>
         * # update dbTableCustomOrg
         */
            local.dbTableCustomOrgUpdate(
                JSON.parse(process.argv[3] || '{}'),
                local.onErrorThrow
            );
        };
        local.cliDict['utility2.onParallelListExec'] = function () {
        /*
         * <commandList>
         * # run in parallel the list of line-separated shell-commands
         */
            local.onParallelList({
                list: process.argv[3].split('\n').filter(function (element) {
                    return element.trim();
                }),
                rateLimit: process.argv[4],
                retryLimit: process.argv[5]
            }, function (options2, onParallel) {
                onParallel.counter += 1;
                local.child_process.spawn(
                    '. ' + local.__dirname + '/lib.utility2.sh; ' + options2.element,
                    { shell: true, stdio: ['ignore', 1, 2] }
                ).on('exit', function (exitCode) {
                    console.error('onParallelListExec - [' + (onParallel.ii + 1) +
                        ' of ' + options2.list.length + '] exitCode ' + exitCode);
                    onParallel(exitCode && new Error(exitCode), options2);
                });
            }, local.exit);
        };
        local.cliDict['utility2.start'] = function () {
        /*
         * <port>
         * # start utility2 server on the given port (default 8081)
         */
            local.env.PORT = process.argv[3] || local.env.PORT;
            local.global.local = local;
            local.replStart();
            local.testRunServer({});
        };
        local.cliDict['utility2.swaggerValidateFile'] = function () {
        /*
         * <file/url>
         * # swagger-validate file/url
         */
            setTimeout(function () {
                local.swgg.swaggerValidateFile({ file: process.argv[3] }, function (error, data) {
                    console.error(data);
                    process.exit(error);
                });
            });
        };
        local.cliDict['utility2.testReportCreate'] = function () {
        /*
         *
         * # create test-report
         */
            local.exit(local.testReportCreate(local.tryCatchOnError(function () {
                return require(local.env.npm_config_dir_build + '/test-report.json');
            }, local.onErrorDefault)).testsFailed);
        };
        if (module === require.main && (!local.global.utility2_rollup || (process.argv[2] &&
                local.cliDict[process.argv[2]] &&
                process.argv[2].indexOf('utility2.') === 0))) {
            local.cliRun(local.nop);
            if (local.cliDict[process.argv[2]]) {
                local.cliDict[process.argv[2]]();
                switch (process.argv[2]) {
                case '--interactive':
                case '-i':
                case 'utility2.swaggerValidateFile':
                case 'utility2.start':
                    break;
                default:
                    return;
                }
            }
        }
        /* validateLineSortedReset */
        // override assets
        [
            '/assets.index.template.html',
            '/assets.swgg.swagger.json',
            '/assets.swgg.swagger.server.json'
        ].forEach(function (file) {
            local.assetsDict[file] = local.assetsDict[file] || '';
            if (process.argv[2] !== '--help' && local.fs.existsSync(__dirname + file)) {
                console.error('override assets ' + process.cwd() + file);
                local.assetsDict[file] = local.fs.readFileSync(__dirname + file, 'utf8');
            }
        });
        if (local.global.utility2_rollup) {
            local.assetsDict['/assets.utility2.rollup.js'] = local.fs.readFileSync(
                __filename,
                'utf8'
            ).split('\n/* script-end /assets.utility2.rollup.end.js */')[0] +
                '\n/* script-end /assets.utility2.rollup.end.js */\n';
            return;
        }
        // init assets
        [
            '/assets.utility2.example.js',
            '/assets.utility2.html',
            '/assets.utility2.test.js',
            'lib.apidoc.js',
            'lib.db.js',
            'lib.github_crud.js',
            'lib.istanbul.js',
            'lib.jslint.js',
            'lib.marked.js',
            'lib.sjcl.js',
            'lib.swgg.js',
            'lib.uglifyjs.js',
            'lib.utility2.js',
            'test.js'
        ].forEach(function (key) {
            switch (key) {
            case '/assets.utility2.example.js':
                local.assetsDict[key] = '';
                local.tryCatchOnError(function () {
                    local.fs.readFileSync(
                        __dirname + '/README.md',
                        'utf8'
                    ).replace((/```javascript([\S\s]*?)```/), function (match0, match1) {
                        match0 = match1;
                        local.assetsDict[key] = match0.trim() + '\n';
                    });
                }, local.nop);
                break;
            case '/assets.utility2.html':
                local.assetsDict[key] = '';
                local.tryCatchOnError(function () {
                    local.fs.readFileSync(__dirname + '/README.md', 'utf8').replace((
                        /<!doctype html>[\S\s]*?<\/html>\\n\\\n/
                    ), function (match0) {
                        local.assetsDict[key] = local.templateRender(match0
                            .replace((/\\n\\$/gm), '')
                            .replace(
                                '<script src="assets.app.js"></script>\n',
                                '<script src="assets.utility2.rollup.js"></script>\n' +
                                    '<script src="assets.utility2.example.js"></script>\n' +
                                    '<script src="assets.utility2.test.js"></script>\n'
                            )
                            .replace('assets.example.js', 'assets.utility2.example.js')
                            .replace('assets.test.js', 'assets.utility2.test.js')
                            .replace((/npm_package_/g), '')
                            // uncomment utility2-comment
                            .replace(
                                (/<!-- utility2-comment\b([\S\s]+?)\butility2-comment -->/g),
                                '$1'
                            ), {
                                env: local.objectSetDefault({
                                    version: '0.0.1'
                                }, require(__dirname + '/package.json')),
                                isRollup: true
                            });
                    });
                }, local.nop);
                break;
            case '/assets.utility2.test.js':
                local.assetsDict[key] = local.tryCatchReadFile(__dirname + '/test.js', 'utf8');
                break;
            case 'lib.swgg.js':
            case 'lib.utility2.js':
                key = key.replace('lib.', '');
                local.assetsDict['/assets.' + key] = local.tryCatchReadFile(
                    __dirname + '/lib.' + key,
                    'utf8'
                ).replace((/^#!\//), '// ');
                break;
            default:
                local.assetsDict['/assets.utility2.' + key] = local.tryCatchReadFile(
                    __dirname + '/' + key,
                    'utf8'
                ).replace((/^#!\//), '// ');
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
            'lib.marked.js',
            'lib.sjcl.js',
            'lib.uglifyjs.js',
            'lib.utility2.js',
            'lib.swgg.js',
            '/assets.utility2.example.js',
            '/assets.utility2.html',
            '/assets.utility2.test.js',
            '/assets.utility2.rollup.end.js'
        ].map(function (key) {
            var script;
            switch (key) {
            case '/assets.utility2.example.js':
            case '/assets.utility2.html':
            case '/assets.utility2.test.js':
                script = local.assetsDict['/assets.utility2.rollup.content.js']
                    .split('/* utility2.rollup.js content */');
                script.splice(1, 0, 'local.assetsDict["' + key + '"] = ' +
                    JSON.stringify(local.assetsDict[key]).replace((/\\n/g), '\\n\\\n'));
                script = script.join('');
                script += '\n';
                break;
            case '/assets.utility2.rollup.begin.js':
            case '/assets.utility2.rollup.end.js':
                script = local.assetsDict[key];
                break;
            case 'header':
                return '/* this rollup was created with utility2 ' +
                    '(https://github.com/kaizhu256/node-utility2) */\n';
            case 'lib.swgg.js':
            case 'lib.utility2.js':
                key = '/assets.' + key.replace('lib.', '');
                script = local.assetsDict[key];
                break;
            default:
                key = '/assets.utility2.' + key;
                script = local.assetsDict[key];
            }
            return '/* script-begin ' + key + ' */\n' +
                script.trim() +
                '\n/* script-end ' + key + ' */\n';
        }).join('\n\n\n');
        // init lib dependents
        [
            'swgg'
        ].forEach(function (lib) {
            var file;
            file = __dirname + '/lib.' + lib + '.js';
            if (local.fs.existsSync(file)) {
                local[lib] = require(file);
            }
        });
    }());
}());
