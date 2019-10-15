/*
example.js

this script will demo automated browser-tests with coverage (via electron and istanbul)

instruction
    1. save this script as example.js
    2. run the shell-command:
        $ npm install utility2 electron-lite &&             PATH="$(pwd)/node_modules/.bin:$PATH"             PORT=8081             npm_config_mode_coverage=utility2             node_modules/.bin/utility2 test example.js




    3. view test-report in ./tmp/build/test-report.html
    4. view coverage in ./tmp/build/coverage.html/index.html
*/



/* istanbul instrument in package utility2 */
/* istanbul ignore next */
/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    var consoleError;
    var local;
    // init globalThis
    (function () {
        try {
            globalThis = Function("return this")(); // jslint ignore:line
        } catch (ignore) {}
    }());
    globalThis.globalThis = globalThis;
    // init debug_inline
    if (!globalThis["debug\u0049nline"]) {
        consoleError = console.error;
        globalThis["debug\u0049nline"] = function () {
        /*
         * this function will both print <arguments> to stderr
         * and return <arguments>[0]
         */
            var argList;
            argList = Array.from(arguments); // jslint ignore:line
            // debug arguments
            globalThis["debug\u0049nlineArguments"] = argList;
            consoleError("\n\ndebug\u0049nline");
            consoleError.apply(console, argList);
            consoleError("\n");
            // return arg0 for inspection
            return argList[0];
        };
    }
    // init local
    local = {};
    local.local = local;
    globalThis.globalLocal = local;
    // init isBrowser
    local.isBrowser = (
        typeof window === "object"
        && window === globalThis
        && typeof window.XMLHttpRequest === "function"
        && window.document
        && typeof window.document.querySelector === "function"
    );
    // init function
    local.assertThrow = function (passed, message) {
    /*
     * this function will throw err.<message> if <passed> is falsy
     */
        var err;
        if (passed) {
            return;
        }
        err = (
            // ternary-operator
            (
                message
                && typeof message.message === "string"
                && typeof message.stack === "string"
            )
            // if message is errObj, then leave as is
            ? message
            : new Error(
                typeof message === "string"
                // if message is a string, then leave as is
                ? message
                // else JSON.stringify message
                : JSON.stringify(message, null, 4)
            )
        );
        throw err;
    };
    local.functionOrNop = function (fnc) {
    /*
     * this function will if <fnc> exists,
     * them return <fnc>,
     * else return <nop>
     */
        return fnc || local.nop;
    };
    local.identity = function (value) {
    /*
     * this function will return <value>
     */
        return value;
    };
    local.nop = function () {
    /*
     * this function will do nothing
     */
        return;
    };
    local.objectAssignDefault = function (target, source) {
    /*
     * this function will if items from <target> are
     * null, undefined, or empty-string,
     * then overwrite them with items from <source>
     */
        target = target || {};
        Object.keys(source || {}).forEach(function (key) {
            if (
                target[key] === null
                || target[key] === undefined
                || target[key] === ""
            ) {
                target[key] = target[key] || source[key];
            }
        });
        return target;
    };
    // require builtin
    if (!local.isBrowser) {
        local.assert = require("assert");
        local.buffer = require("buffer");
        local.child_process = require("child_process");
        local.cluster = require("cluster");
        local.crypto = require("crypto");
        local.dgram = require("dgram");
        local.dns = require("dns");
        local.domain = require("domain");
        local.events = require("events");
        local.fs = require("fs");
        local.http = require("http");
        local.https = require("https");
        local.net = require("net");
        local.os = require("os");
        local.path = require("path");
        local.querystring = require("querystring");
        local.readline = require("readline");
        local.repl = require("repl");
        local.stream = require("stream");
        local.string_decoder = require("string_decoder");
        local.timers = require("timers");
        local.tls = require("tls");
        local.tty = require("tty");
        local.url = require("url");
        local.util = require("util");
        local.vm = require("vm");
        local.zlib = require("zlib");
    }
}(this));



(function (local) {
"use strict";



// run shared js-env code - init-before
(function () {
// init local
local = (
    globalThis.utility2_rollup
    || globalThis.utility2_utility2
    || require("utility2")
);
// init exports
globalThis.local = local;
// run test-server
local.testRunServer(local);
// init assets
local.assetsDict["/assets.hello.txt"] = "hello \ud83d\ude01\n";
local.assetsDict["/assets.index.template.html"] = "";
}());



// run shared js-env code - function
(function () {
local.testCase_ajax_200 = function (opt, onError) {
/*
 * this function will test ajax's "200 ok" handling-behavior
 */
    if (!local.isBrowser) {
        onError(null, opt);
        return;
    }
    opt = {};
    // test ajax-path "assets.hello.txt"
    local.ajax({
        url: "assets.hello.txt"
    }, function (err, xhr) {
        local.tryCatchOnError(function () {
            // validate no err occurred
            local.assertThrow(!err, err);
            // validate data
            opt.data = xhr.responseText;
            local.assertThrow(
                opt.data === "hello \ud83d\ude01\n",
                opt.data
            );
            onError();
        }, onError);
    });
};

local.testCase_ajax_404 = function (opt, onError) {
/*
 * this function will test ajax's "404 not found" handling-behavior
 */
    if (!local.isBrowser) {
        onError(null, opt);
        return;
    }
    opt = {};
    // test ajax-path "/undefined"
    local.ajax({
        url: "/undefined"
    }, function (err) {
        local.tryCatchOnError(function () {
            // validate err occurred
            local.assertThrow(err, err);
            opt.statusCode = err.statusCode;
            // validate 404 http statusCode
            local.assertThrow(opt.statusCode === 404, opt.statusCode);
            onError();
        }, onError);
    });
};

local.testCase_webpage_default = function (opt, onError) {
/*
 * this function will test webpage's default handling-behavior
 */
    if (local.isBrowser) {
        onError(null, opt);
        return;
    }
    opt = {
        modeCoverageMerge: true,
        url: local.serverLocalHost + "?modeTest=1"
    };
    local.browserTest(opt, onError);
};
}());



/* istanbul ignore next */
// run browser js-env code - init-test
(function () {
if (!local.isBrowser) {
    return;
}
// log stderr and stdout to #outputStdout1
["error", "log"].forEach(function (key) {
    var argList;
    var elem;
    var fnc;
    elem = document.querySelector(
        "#outputStdout1"
    );
    if (!elem) {
        return;
    }
    fnc = console[key];
    console[key] = function () {
        argList = Array.from(arguments); // jslint ignore:line
        fnc.apply(console, argList);
        // append text to #outputStdout1
        elem.textContent += argList.map(function (arg) {
            return (
                typeof arg === "string"
                ? arg
                : JSON.stringify(arg, null, 4)
            );
        }).join(" ").replace((
            /\u001b\[\d*m/g
        ), "") + "\n";
        // scroll textarea to bottom
        elem.scrollTop = elem.scrollHeight;
    };
});
Object.assign(local, globalThis.domOnEventDelegateDict);
globalThis.domOnEventDelegateDict = local;
local.onEventDomDb = (
    local.db && local.db.onEventDomDb
);
local.testRunBrowser = function (evt) {
/*
 * this function will run browser-tests
 */
    switch (
        !evt.ctrlKey
        && !evt.metaKey
        && (
            evt.modeInit
            || (evt.type + "." + (evt.target && evt.target.id))
        )
    ) {
    // custom-case
    case "click.jslintAutofixButton1":
    case "keydown.inputEval1":
    case true:
        globalThis.domOnEventDelegateDict.domOnEventResetOutput();
        // jslint #inputEval1
        local.jslint.jslintAndPrint(
            document.querySelector(
                "#inputEval1"
            ).value,
            "inputEval1.js",
            {
                autofix: (
                    evt
                    && evt.currentTarget
                    && evt.currentTarget.id === "jslintAutofixButton1"
                ),
                conditional: true
            }
        );
        if (local.jslint.jslintResult.autofix) {
            document.querySelector(
                "#inputEval1"
            ).value = (
                local.jslint.jslintResult.code
            );
        }
        document.querySelector(
            "#outputJslintPre1"
        ).textContent = (
            local.jslint.jslintResult.errText
        ).replace((
            /\u001b\[\d*m/g
        ), "").trim();
        // try to cleanup __coverage__
        try {
            delete globalThis.__coverage__["/inputEval1.js"];
        } catch (ignore) {}
        // try to cover and eval input-code
        try {
            document.querySelector(
                "#outputCode1"
            ).textContent = (
                local.istanbul.instrumentSync(
                    document.querySelector(
                        "#inputEval1"
                    ).value,
                    "/inputEval1.js"
                )
            );
            eval( // jslint ignore:line
                document.querySelector(
                    "#outputCode1"
                ).textContent.replace((
                    /^#!\//
                ), "// ")
            );
            document.querySelector(
                "#coverageReportDiv1"
            ).innerHTML = (
                local.istanbul.coverageReportCreate({
                    coverage: window.__coverage__
                })
            );
        } catch (errorCaught2) {
            console.error(errorCaught2);
        }
        return;
    case "click.testRunButton1":
        local.modeTest = 1;
        local.testRunDefault(local);
        return;
    // run browser-tests
    default:
        if (
            (evt.target && evt.target.id) !== "testRunButton1"
            && !(evt.modeInit && (
                /\bmodeTest=1\b/
            ).test(location.search))
        ) {
            return;
        }
        // show browser-tests
        if (document.querySelector(
            "#testReportDiv1"
        ).style.maxHeight === "0px") {
            globalThis.domOnEventDelegateDict.domOnEventResetOutput();
            local.uiAnimateSlideDown(document.querySelector(
                "#testReportDiv1"
            ));
            document.querySelector(
                "#testRunButton1"
            ).textContent = "hide internal test";
            local.modeTest = 1;
            local.testRunDefault(local);
            return;
        }
        // hide browser-tests
        local.uiAnimateSlideUp(document.querySelector(
            "#testReportDiv1"
        ));
        document.querySelector(
            "#testRunButton1"
        ).textContent = "run internal test";
    }
};

local.testRunBrowser({
    modeInit: true
});
}());



/* istanbul ignore next */
// run node js-env code - init-test
(function () {
if (local.isBrowser) {
    return;
}
// init exports
module.exports = local;
/* validateLineSortedReset */
// init assets
local.assetsDict = local.assetsDict || {};
[
    "assets.index.template.html",
    "assets.swgg.swagger.json",
    "assets.swgg.swagger.server.json"
].forEach(function (file) {
    file = "/" + file;
    local.assetsDict[file] = local.assetsDict[file] || "";
    if (local.fs.existsSync(local.__dirname + file)) {
        local.assetsDict[file] = local.fs.readFileSync(
            local.__dirname + file,
            "utf8"
        );
    }
});
/* jslint ignore:start */
local.assetsDict["/assets.index.template.html"] = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<!-- "assets.utility2.template.html" -->\n<title>{{env.npm_package_name}} ({{env.npm_package_version}})</title>\n<style>\n/* jslint utility2:true */\n/*csslint\n*/\n/* csslint ignore:start */\n*,\n*:after,\n*:before {\n    box-sizing: border-box;\n}\n/* csslint ignore:end */\n@keyframes uiAnimateShake {\n0%,\n50% {\n    transform: translateX(10px);\n}\n100% {\n    transform: translateX(0);\n}\n25%,\n75% {\n    transform: translateX(-10px);\n}\n}\n@keyframes uiAnimateSpin {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\na {\n    overflow-wrap: break-word;\n}\nbody {\n    background: #eef;\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: small;\n    margin: 0 40px;\n}\nbody > div,\nbody > form > div,\nbody > form > input,\nbody > form > pre,\nbody > form > .button,\nbody > form > .textarea,\nbody > input,\nbody > pre,\nbody > .button,\nbody > .textarea {\n    margin-bottom: 20px;\n    margin-top: 0;\n}\nbody > form > input,\nbody > form > .button,\nbody > input,\nbody > .button {\n    width: 20rem;\n}\nbody > form > .textarea,\nbody > .textarea {\n    height: 10rem;\n    width: 100%;\n}\nbody > .readonly {\n    background: #ddd;\n}\ncode,\npre,\n.textarea {\n    font-family: Consolas, Menlo, monospace;\n    font-size: smaller;\n}\npre {\n    overflow-wrap: break-word;\n    white-space: pre-wrap;\n}\n.button {\n    background-color: #fff;\n    border: 1px solid;\n    border-bottom-color: rgb(186, 186, 186);\n    border-left-color: rgb(209, 209, 209);\n    border-radius: 4px;\n    border-right-color: rgb(209, 209, 209);\n    border-top-color: rgb(216, 216, 216);\n    color: #00d;\n    cursor: pointer;\n    display: inline-block;\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: 12px;\n    font-style: normal;\n    font-weight: normal;\n    margin: 0;\n    padding: 2px 7px 3px 7px;\n    text-align: center;\n    text-decoration: underline;\n}\n.colorError {\n    color: #d00;\n}\n.textarea {\n    background: #fff;\n    border: 1px solid #999;\n    border-radius: 0;\n    cursor: auto;\n    overflow: auto;\n    padding: 2px;\n}\n.uiAnimateShake {\n    animation-duration: 500ms;\n    animation-name: uiAnimateShake;\n}\n.uiAnimateSlide {\n    overflow-y: hidden;\n    transition: max-height ease-in 250ms, min-height ease-in 250ms, padding-bottom ease-in 250ms, padding-top ease-in 250ms;\n}\n.utility2FooterDiv {\n    text-align: center;\n}\n.zeroPixel {\n    border: 0;\n    height: 0;\n    margin: 0;\n    padding: 0;\n    width: 0;\n}\n</style>\n</head>\n<body>\n<div id="ajaxProgressDiv1" style="background: #d00; height: 2px; left: 0; margin: 0; padding: 0; position: fixed; top: 0; transition: background 500ms, width 1500ms; width: 0%; z-index: 1;"></div>\n<div class="uiAnimateSpin" style="animation: uiAnimateSpin 2s linear infinite; border: 5px solid #999; border-radius: 50%; border-top: 5px solid #7d7; display: none; height: 25px; vertical-align: middle; width: 25px;"></div>\n<a class="zeroPixel" download="db.persistence.json" href="" id="dbExportA1"></a>\n<input class="zeroPixel" data-onevent="onEventDomDb" data-onevent-db="dbImportInput" type="file">\n<script>\n/* jslint utility2:true */\n// init domOnEventWindowOnloadTimeElapsed\n(function () {\n/*\n * this function will measure and print time-elapsed for window.onload\n */\n    "use strict";\n    if (window.domOnEventWindowOnloadTimeElapsed) {\n        return;\n    }\n    window.domOnEventWindowOnloadTimeElapsed = Date.now() + 100;\n    window.addEventListener("load", function () {\n        setTimeout(function () {\n            window.domOnEventWindowOnloadTimeElapsed = (\n                Date.now()\n                - window.domOnEventWindowOnloadTimeElapsed\n            );\n            console.error(\n                "domOnEventWindowOnloadTimeElapsed = "\n                + window.domOnEventWindowOnloadTimeElapsed\n            );\n        }, 100);\n    });\n}());\n\n\n\n// init domOnEventDelegateDict\n(function () {\n/*\n * this function will handle delegated dom-event\n */\n    "use strict";\n    var timerTimeoutDict;\n    if (window.domOnEventDelegateDict) {\n        return;\n    }\n    window.domOnEventDelegateDict = {};\n    timerTimeoutDict = {};\n    window.domOnEventDelegateDict.domOnEventDelegate = function (evt) {\n        evt.targetOnEvent = evt.target.closest(\n            "[data-onevent]"\n        );\n        if (\n            !evt.targetOnEvent\n            || evt.targetOnEvent.dataset.onevent === "domOnEventNop"\n            || evt.target.closest(\n                ".disabled, .readonly"\n            )\n        ) {\n            return;\n        }\n        // rate-limit high-frequency-event\n        switch (evt.type) {\n        case "keydown":\n        case "keyup":\n            // filter non-input keyboard-event\n            if (!evt.target.closest(\n                "input, option, select, textarea"\n            )) {\n                return;\n            }\n            if (timerTimeoutDict[evt.type] !== true) {\n                timerTimeoutDict[evt.type] = timerTimeoutDict[\n                    evt.type\n                ] || setTimeout(function () {\n                    timerTimeoutDict[evt.type] = true;\n                    window.domOnEventDelegateDict.domOnEventDelegate(evt);\n                }, 50);\n                return;\n            }\n            timerTimeoutDict[evt.type] = null;\n            break;\n        }\n        switch (evt.targetOnEvent.tagName) {\n        case "BUTTON":\n        case "FORM":\n            evt.preventDefault();\n            break;\n        }\n        evt.stopPropagation();\n        window.domOnEventDelegateDict[evt.targetOnEvent.dataset.onevent](\n            evt\n        );\n    };\n    window.domOnEventDelegateDict.domOnEventResetOutput = function () {\n        Array.from(document.querySelectorAll(\n            ".onevent-reset-output"\n        )).forEach(function (elem) {\n            switch (elem.tagName) {\n            case "INPUT":\n            case "TEXTAREA":\n                elem.value = "";\n                break;\n            case "PRE":\n                elem.textContent = "";\n                break;\n            default:\n                elem.innerHTML = "";\n            }\n        });\n    };\n    // init event-handling\n    [\n        "change",\n        "click",\n        "keydown",\n        "submit"\n    ].forEach(function (eventType) {\n        document.addEventListener(\n            eventType,\n            window.domOnEventDelegateDict.domOnEventDelegate\n        );\n    });\n}());\n\n\n\n// init timerIntervalAjaxProgressUpdate\n(function () {\n/*\n * this function will increment ajax-progress-bar\n * until webpage has loaded\n */\n    "use strict";\n    var ajaxProgressDiv1;\n    var ajaxProgressState;\n    var ajaxProgressUpdate;\n    if (\n        window.timerIntervalAjaxProgressUpdate\n        || !document.querySelector(\n            "#ajaxProgressDiv1"\n        )\n    ) {\n        return;\n    }\n    ajaxProgressDiv1 = document.querySelector(\n        "#ajaxProgressDiv1"\n    );\n    setTimeout(function () {\n        ajaxProgressDiv1.style.width = "25%";\n    });\n    ajaxProgressState = 0;\n    ajaxProgressUpdate = (\n        window.local\n        && window.local.ajaxProgressUpdate\n    ) || function () {\n        ajaxProgressDiv1.style.width = "100%";\n        setTimeout(function () {\n            ajaxProgressDiv1.style.background = "transparent";\n            setTimeout(function () {\n                ajaxProgressDiv1.style.width = "0%";\n            }, 500);\n        }, 1000);\n    };\n    window.timerIntervalAjaxProgressUpdate = setInterval(function () {\n        ajaxProgressState += 1;\n        ajaxProgressDiv1.style.width = Math.max(\n            100 - 75 * Math.exp(-0.125 * ajaxProgressState),\n            ajaxProgressDiv1.style.width.slice(0, -1) | 0\n        ) + "%";\n    }, 1000);\n    window.addEventListener("load", function () {\n        clearInterval(window.timerIntervalAjaxProgressUpdate);\n        ajaxProgressUpdate();\n    });\n}());\n\n\n\n// init domOnEventSelectAllWithinPre\n(function () {\n/*\n * this function will limit select-all within <pre tabIndex="0"> elements\n * https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse\n */\n    "use strict";\n    if (window.domOnEventSelectAllWithinPre) {\n        return;\n    }\n    window.domOnEventSelectAllWithinPre = function (evt) {\n        var range;\n        var selection;\n        if (\n            evt\n            && evt.key === "a"\n            && (evt.ctrlKey || evt.metaKey)\n            && evt.target.closest(\n                "pre"\n            )\n        ) {\n            range = document.createRange();\n            range.selectNodeContents(evt.target.closest(\n                "pre"\n            ));\n            selection = window.getSelection();\n            selection.removeAllRanges();\n            selection.addRange(range);\n            evt.preventDefault();\n        }\n    };\n    // init event-handling\n    document.addEventListener(\n        "keydown",\n        window.domOnEventSelectAllWithinPre\n    );\n}());\n</script>\n<h1>\n<!-- utility2-comment\n    <a\n        {{#if env.npm_package_homepage}}\n        href="{{env.npm_package_homepage}}"\n        {{/if env.npm_package_homepage}}\n        target="_blank"\n    >\nutility2-comment -->\n        {{env.npm_package_name}} ({{env.npm_package_version}})\n<!-- utility2-comment\n    </a>\nutility2-comment -->\n</h1>\n<h3>{{env.npm_package_description}}</h3>\n<!-- utility2-comment\n<a class="button" download href="assets.app.js">download standalone app</a><br>\n<button class="button" data-onevent="testRunBrowser" id="testRunButton1">run internal test</button><br>\nutility2-comment -->\n\n\n\n<label>edit or paste script below to cover and test</label>\n<textarea class="textarea" data-onevent="testRunBrowser" id="inputEval1">\n// remove comment below to disable jslint\n/*jslint browser, devel*/\n/*global window*/\n(function () {\n    "use strict";\n    var testCaseDict;\n    testCaseDict = {};\n    testCaseDict.modeTest = 1;\n\n    // comment this testCase to disable failed error demo\n    testCaseDict.testCase_failed_error_demo = function (opt, onError) {\n    /*\n     * this function will run a failed error demo\n     */\n        // jslint-hack\n        window.utility2.nop(opt);\n        onError(new Error("this is a failed error demo"));\n    };\n\n    testCaseDict.testCase_passed_ajax_demo = function (opt, onError) {\n    /*\n     * this function will demo a passed ajax test\n     */\n        var data;\n        opt = {url: "/"};\n        // test ajax-req for main-page "/"\n        window.utility2.ajax(opt, function (err, xhr) {\n            try {\n                // validate no err occurred\n                console.assert(!err, err);\n                // validate "200 ok" status\n                console.assert(xhr.statusCode === 200, xhr.statusCode);\n                // validate non-empty data\n                data = xhr.responseText;\n                console.assert(data && data.length > 0, data);\n                onError();\n            } catch (errorCaught) {\n                onError(errorCaught);\n            }\n        });\n    };\n\n    window.utility2.testRunDefault(testCaseDict);\n}());\n</textarea>\n<button class="button" data-onevent="testRunBrowser" id="jslintAutofixButton1">jslint autofix</button><br>\n<pre class= "colorError" id="outputJslintPre1" tabindex="0"></pre>\n<label>instrumented-code</label>\n<pre class="readonly textarea" id="outputCode1" tabindex="0"></pre>\n<label>stderr and stdout</label>\n<pre class="onevent-reset-output readonly textarea" id="outputStdout1" tabindex="0"></pre>\n<div id="testReportDiv1"></div>\n<div id="coverageReportDiv1"></div>\n<!-- utility2-comment\n{{#if isRollup}}\n<script src="assets.app.js"></script>\n{{#unless isRollup}}\nutility2-comment -->\n<script src="assets.utility2.lib.istanbul.js"></script>\n<script src="assets.utility2.lib.jslint.js"></script>\n<script src="assets.utility2.lib.db.js"></script>\n<script src="assets.utility2.lib.marked.js"></script>\n<script src="assets.utility2.lib.sjcl.js"></script>\n<script src="assets.utility2.js"></script>\n<script>window.utility2_onReadyBefore.counter += 1;</script>\n<script src="jsonp.utility2.stateInit?callback=window.utility2.stateInit"></script>\n<script src="assets.example.js"></script>\n<script src="assets.test.js"></script>\n<script>window.utility2_onReadyBefore();</script>\n<!-- utility2-comment\n{{/if isRollup}}\nutility2-comment -->\n<div class="utility2FooterDiv">\n    [ this app was created with\n    <a href="https://github.com/kaizhu256/node-utility2" target="_blank">utility2</a>\n    ]\n</div>\n</body>\n</html>\n';






































































































































































































































































































































































































































































/* jslint ignore:end */
/* validateLineSortedReset */
/* jslint ignore:start */
local.assetsDict["/assets.utility2.js"] =
    local.assetsDict["/assets.utility2.js"] ||
    local.fs.readFileSync(local.__dirname + "/lib.utility2.js", "utf8"
).replace((/^#!\//), "// ");
/* jslint ignore:end */
/* validateLineSortedReset */
local.assetsDict["/"] = local.assetsDict["/assets.index.template.html"]
.replace((
    /\{\{env\.(\w+?)\}\}/g
), function (match0, match1) {
    switch (match1) {
    case "npm_package_description":
        return "the greatest app in the world!";
    case "npm_package_name":
        return "utility2";
    case "npm_package_nameLib":
        return "utility2";
    case "npm_package_version":
        return "0.0.1";
    default:
        return match0;
    }
});
local.assetsDict["/assets.example.html"] = local.assetsDict["/"];
local.assetsDict["/index.html"] = local.assetsDict["/"];
// init cli
if (module !== require.main || globalThis.utility2_rollup) {
    return;
}
/* validateLineSortedReset */
local.assetsDict["/assets.example.js"] = (
    local.assetsDict["/assets.example.js"]
    || local.fs.readFileSync(__filename, "utf8")
);
local.assetsDict["/favicon.ico"] = local.assetsDict["/favicon.ico"] || "";
// if $npm_config_timeout_exit exists,
// then exit this process after $npm_config_timeout_exit ms
if (Number(process.env.npm_config_timeout_exit)) {
    setTimeout(process.exit, Number(process.env.npm_config_timeout_exit));
}
// start server
if (globalThis.utility2_serverHttp1) {
    return;
}
process.env.PORT = process.env.PORT || "8081";
console.error("http-server listening on port " + process.env.PORT);
local.http.createServer(function (req, res) {
    req.urlParsed = local.url.parse(req.url);
    if (local.assetsDict[req.urlParsed.pathname] !== undefined) {
        res.end(local.assetsDict[req.urlParsed.pathname]);
        return;
    }
    res.statusCode = 404;
    res.end();
}).listen(process.env.PORT);
}());



}());
