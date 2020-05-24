/*
example.js

this script will demo automated browser-tests with coverage
(via puppeteer and istanbul)

instruction
    1. save this script as example.js
    2. run the shell-command:
        $ npm install utility2 &&             PATH="$(pwd)/node_modules/.bin:$PATH"             PORT=8081             npm_config_mode_coverage=utility2             node_modules/.bin/utility2 test example.js




    3. view test-report in ./tmp/build/test-report.html
    4. view coverage in ./tmp/build/coverage.html/index.html
*/



// assets.utility2.header.js - start
/* istanbul ignore next */
/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    let ArrayPrototypeFlat;
    let TextXxcoder;
    let consoleError;
    let debugName;
    let local;
    debugName = "debug" + String("Inline");
    // init globalThis
    globalThis.globalThis = globalThis.globalThis || globalThis;
    // init debug_inline
    if (!globalThis[debugName]) {
        consoleError = console.error;
        globalThis[debugName] = function (...argList) {
        /*
         * this function will both print <argList> to stderr
         * and return <argList>[0]
         */
            consoleError("\n\n" + debugName);
            consoleError.apply(console, argList);
            consoleError("\n");
            // return arg0 for inspection
            return argList[0];
        };
    }
    // polyfill
    ArrayPrototypeFlat = function (depth) {
    /*
     * this function will polyfill Array.prototype.flat
     * https://github.com/jonathantneal/array-flat-polyfill
     */
        depth = (
            globalThis.isNaN(depth)
            ? 1
            : Number(depth)
        );
        if (!depth) {
            return Array.prototype.slice.call(this);
        }
        return Array.prototype.reduce.call(this, function (acc, cur) {
            if (Array.isArray(cur)) {
                // recurse
                acc.push.apply(acc, ArrayPrototypeFlat.call(cur, depth - 1));
            } else {
                acc.push(cur);
            }
            return acc;
        }, []);
    };
    Array.prototype.flat = Array.prototype.flat || ArrayPrototypeFlat;
    Array.prototype.flatMap = Array.prototype.flatMap || function flatMap(
        ...argList
    ) {
    /*
     * this function will polyfill Array.prototype.flatMap
     * https://github.com/jonathantneal/array-flat-polyfill
     */
        return this.map(...argList).flat();
    };
    String.prototype.trimEnd = (
        String.prototype.trimEnd || String.prototype.trimRight
    );
    String.prototype.trimStart = (
        String.prototype.trimStart || String.prototype.trimLeft
    );
    (function () {
        try {
            globalThis.TextDecoder = (
                globalThis.TextDecoder || require("util").TextDecoder
            );
            globalThis.TextEncoder = (
                globalThis.TextEncoder || require("util").TextEncoder
            );
        } catch (ignore) {}
    }());
    TextXxcoder = function () {
    /*
     * this function will polyfill TextDecoder/TextEncoder
     * https://gist.github.com/Yaffle/5458286
     */
        return;
    };
    TextXxcoder.prototype.decode = function (octets) {
    /*
     * this function will polyfill TextDecoder.prototype.decode
     * https://gist.github.com/Yaffle/5458286
     */
        let bytesNeeded;
        let codePoint;
        let ii;
        let kk;
        let octet;
        let string;
        string = "";
        ii = 0;
        while (ii < octets.length) {
            octet = octets[ii];
            bytesNeeded = 0;
            codePoint = 0;
            if (octet <= 0x7F) {
                bytesNeeded = 0;
                codePoint = octet & 0xFF;
            } else if (octet <= 0xDF) {
                bytesNeeded = 1;
                codePoint = octet & 0x1F;
            } else if (octet <= 0xEF) {
                bytesNeeded = 2;
                codePoint = octet & 0x0F;
            } else if (octet <= 0xF4) {
                bytesNeeded = 3;
                codePoint = octet & 0x07;
            }
            if (octets.length - ii - bytesNeeded > 0) {
                kk = 0;
                while (kk < bytesNeeded) {
                    octet = octets[ii + kk + 1];
                    codePoint = (codePoint << 6) | (octet & 0x3F);
                    kk += 1;
                }
            } else {
                codePoint = 0xFFFD;
                bytesNeeded = octets.length - ii;
            }
            string += String.fromCodePoint(codePoint);
            ii += bytesNeeded + 1;
        }
        return string;
    };
    TextXxcoder.prototype.encode = function (string) {
    /*
     * this function will polyfill TextEncoder.prototype.encode
     * https://gist.github.com/Yaffle/5458286
     */
        let bits;
        let cc;
        let codePoint;
        let ii;
        let length;
        let octets;
        octets = [];
        length = string.length;
        ii = 0;
        while (ii < length) {
            codePoint = string.codePointAt(ii);
            cc = 0;
            bits = 0;
            if (codePoint <= 0x0000007F) {
                cc = 0;
                bits = 0x00;
            } else if (codePoint <= 0x000007FF) {
                cc = 6;
                bits = 0xC0;
            } else if (codePoint <= 0x0000FFFF) {
                cc = 12;
                bits = 0xE0;
            } else if (codePoint <= 0x001FFFFF) {
                cc = 18;
                bits = 0xF0;
            }
            octets.push(bits | (codePoint >> cc));
            cc -= 6;
            while (cc >= 0) {
                octets.push(0x80 | ((codePoint >> cc) & 0x3F));
                cc -= 6;
            }
            ii += (
                codePoint >= 0x10000
                ? 2
                : 1
            );
        }
        return octets;
    };
    globalThis.TextDecoder = globalThis.TextDecoder || TextXxcoder;
    globalThis.TextEncoder = globalThis.TextEncoder || TextXxcoder;
    // init local
    local = {};
    local.local = local;
    globalThis.globalLocal = local;
    // init isBrowser
    local.isBrowser = (
        typeof globalThis.XMLHttpRequest === "function"
        && globalThis.navigator
        && typeof globalThis.navigator.userAgent === "string"
    );
    // init isWebWorker
    local.isWebWorker = (
        local.isBrowser && typeof globalThis.importScript === "function"
    );
    // init function
    local.assertOrThrow = function (passed, message) {
    /*
     * this function will throw err.<message> if <passed> is falsy
     */
        let err;
        if (passed) {
            return;
        }
        err = (
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
                : JSON.stringify(message, undefined, 4)
            )
        );
        throw err;
    };
    local.coalesce = function (...argList) {
    /*
     * this function will coalesce null, undefined, or "" in <argList>
     */
        let arg;
        let ii;
        ii = 0;
        while (ii < argList.length) {
            arg = argList[ii];
            if (arg !== null && arg !== undefined && arg !== "") {
                break;
            }
            ii += 1;
        }
        return arg;
    };
    local.fsRmrfSync = function (dir) {
    /*
     * this function will sync "rm -rf" <dir>
     */
        let child_process;
        try {
            child_process = require("child_process");
        } catch (ignore) {
            return;
        }
        child_process.spawnSync("rm", [
            "-rf", dir
        ], {
            stdio: [
                "ignore", 1, 2
            ]
        });
    };
    local.fsWriteFileWithMkdirpSync = function (file, data) {
    /*
     * this function will sync write <data> to <file> with "mkdir -p"
     */
        let fs;
        try {
            fs = require("fs");
        } catch (ignore) {
            return;
        }
        // try to write file
        try {
            fs.writeFileSync(file, data);
        } catch (ignore) {
            // mkdir -p
            require("child_process").spawnSync(
                "mkdir",
                [
                    "-p", require("path").dirname(file)
                ],
                {
                    stdio: [
                        "ignore", 1, 2
                    ]
                }
            );
            // rewrite file
            fs.writeFileSync(file, data);
        }
    };
    local.functionOrNop = function (fnc) {
    /*
     * this function will if <fnc> exists,
     * return <fnc>,
     * else return <nop>
     */
        return fnc || local.nop;
    };
    local.identity = function (val) {
    /*
     * this function will return <val>
     */
        return val;
    };
    local.nop = function () {
    /*
     * this function will do nothing
     */
        return;
    };
    local.objectAssignDefault = function (target, source) {
    /*
     * this function will if items from <target> are null, undefined, or "",
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
    local.querySelector = function (selectors) {
    /*
     * this function will return first dom-elem that match <selectors>
     */
        return (
            typeof document === "object" && document
            && typeof document.querySelector === "function"
            && document.querySelector(selectors)
        ) || {};
    };
    local.querySelectorAll = function (selectors) {
    /*
     * this function will return dom-elem-list that match <selectors>
     */
        return (
            typeof document === "object" && document
            && typeof document.querySelectorAll === "function"
            && Array.from(document.querySelectorAll(selectors))
        ) || [];
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
}((typeof globalThis === "object" && globalThis) || (function () {
    return Function("return this")(); // jslint ignore:line
}())));
// assets.utility2.header.js - end



/* jslint utility2:true */
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
        onError(undefined, opt);
        return;
    }
    opt = {};
    // test ajax-path "assets.hello.txt"
    local.ajax({
        url: "assets.hello.txt"
    }, function (err, xhr) {
        local.tryCatchOnError(function () {
            // handle err
            local.assertOrThrow(!err, err);
            // validate data
            opt.data = xhr.responseText;
            local.assertOrThrow(
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
        onError(undefined, opt);
        return;
    }
    opt = {};
    // test ajax-path "/undefined"
    local.ajax({
        url: "/undefined"
    }, function (err) {
        local.tryCatchOnError(function () {
            // handle err
            local.assertOrThrow(err, err);
            opt.statusCode = err.statusCode;
            // validate 404 http statusCode
            local.assertOrThrow(opt.statusCode === 404, opt.statusCode);
            onError();
        }, onError);
    });
};

local.testCase_webpage_default = function (opt, onError) {
/*
 * this function will test webpage's default handling-behavior
 */
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    opt = {
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
    let elem;
    let fnc;
    elem = local.querySelector("#outputStdout1");
    if (!elem) {
        return;
    }
    fnc = console[key];
    console[key] = function (...argList) {
        fnc.apply(console, argList);
        // append text to #outputStdout1
        elem.textContent += argList.map(function (arg) {
            return (
                typeof arg === "string"
                ? arg
                : JSON.stringify(arg, undefined, 4)
            );
        }).join(" ").replace((
            /\u001b\[\d*m/g
        ), "") + "\n";
        // scroll textarea to bottom
        elem.scrollTop = elem.scrollHeight;
    };
});
local.objectAssignDefault(local, globalThis.domOnEventDelegateDict);
globalThis.domOnEventDelegateDict = local;
if ((
    /\bmodeTest=1\b/
).test(location.search)) {
    local.testRunBrowser();
}
}());



// run node js-env code - init-test
(function () {
if (local.isBrowser) {
    return;
}
// init exports
module.exports = local;
// init assetsDict
local.assetsDict = local.assetsDict || {};
[
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
local.assetsDict["/assets.index.template.html"] = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<!-- "assets.utility2.template.html" -->\n<title>{{env.npm_package_name}} ({{env.npm_package_version}})</title>\n<style>\n/* jslint utility2:true */\n/*csslint\n*/\n/* csslint ignore:start */\n*,\n*:after,\n*:before {\n    box-sizing: border-box;\n}\n/* csslint ignore:end */\n@keyframes uiAnimateSpin {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\na {\n    overflow-wrap: break-word;\n}\nbody {\n    background: #f7f7f7;\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: small;\n    margin: 0 40px;\n}\nbody > div,\nbody > input,\nbody > pre,\nbody > .button,\nbody > .textarea {\n    margin-bottom: 20px;\n    margin-top: 0;\n}\nbody > input,\nbody > .button {\n    width: 20rem;\n}\nbody > .readonly {\n    background: #ddd;\n}\nbody > .textarea {\n    height: 10rem;\n    resize: vertical;\n    width: 100%;\n}\ncode,\npre,\n.textarea {\n    font-family: Consolas, Menlo, monospace;\n    font-size: smaller;\n}\npre {\n    overflow-wrap: break-word;\n    white-space: pre-wrap;\n}\n.button {\n    background: #ddd;\n    border: 1px solid #999;\n    color: #000;\n    cursor: pointer;\n    display: inline-block;\n    padding: 2px 5px;\n    text-align: center;\n    text-decoration: none;\n}\n.button:hover {\n    background: #bbb;\n}\n.colorError {\n    color: #d00;\n}\n.textarea {\n    background: #fff;\n    border: 1px solid #999;\n    border-radius: 0;\n    cursor: auto;\n    overflow: auto;\n    padding: 2px;\n}\n.uiAnimateSlide {\n    overflow-y: hidden;\n    transition: max-height ease-in 250ms, min-height ease-in 250ms, padding-bottom ease-in 250ms, padding-top ease-in 250ms;\n}\n.zeroPixel {\n    border: 0;\n    height: 0;\n    margin: 0;\n    padding: 0;\n    width: 0;\n}\n</style>\n</head>\n<body>\n<div class="uiAnimateSpin" style="animation: uiAnimateSpin 2s linear infinite; border: 5px solid #999; border-radius: 50%; border-top: 5px solid #7d7; display: none; height: 25px; vertical-align: middle; width: 25px;"></div>\n<script>\n/* jslint utility2:true */\n// init domOnEventWindowOnloadTimeElapsed\n(function () {\n/*\n * this function will measure and print time-elapsed for window.onload\n */\n    "use strict";\n    if (!(\n        typeof window === "object" && window && window.document\n        && typeof document.addEventListener === "function"\n    ) || window.domOnEventWindowOnloadTimeElapsed) {\n        return;\n    }\n    window.domOnEventWindowOnloadTimeElapsed = Date.now() + 100;\n    window.addEventListener("load", function () {\n        setTimeout(function () {\n            window.domOnEventWindowOnloadTimeElapsed = (\n                Date.now()\n                - window.domOnEventWindowOnloadTimeElapsed\n            );\n            console.error(\n                "domOnEventWindowOnloadTimeElapsed = "\n                + window.domOnEventWindowOnloadTimeElapsed\n            );\n        }, 100);\n    });\n}());\n\n\n\n// init domOnEventAjaxProgressUpdate\n(function () {\n/*\n * this function will display incrementing ajax-progress-bar\n */\n    "use strict";\n    let opt;\n    if (!(\n        typeof window === "object" && window && window.document\n        && typeof document.addEventListener === "function"\n    ) || window.domOnEventAjaxProgressUpdate) {\n        return;\n    }\n    window.domOnEventAjaxProgressUpdate = function (gotoState, onError) {\n        gotoState = (gotoState | 0) + 1;\n        switch (gotoState) {\n        // ajaxProgress - show\n        case 1:\n            // init timerInterval and timerTimeout\n            opt.timerInterval = (\n                opt.timerInterval || setInterval(opt, 2000, 1, onError)\n            );\n            opt.timerTimeout = (\n                opt.timerTimeout || setTimeout(opt, 30000, 2, onError)\n            );\n            // show ajaxProgress\n            if (opt.width !== -1) {\n                opt.style.background = opt.background;\n            }\n            setTimeout(opt, 50, gotoState, onError);\n            break;\n        // ajaxProgress - increment\n        case 2:\n            // show ajaxProgress\n            if (opt.width === -1) {\n                return;\n            }\n            opt.style.background = opt.background;\n            // reset ajaxProgress if it goes too high\n            if ((opt.style.width.slice(0, -1) | 0) > 95) {\n                opt.width = 0;\n            }\n            // this algorithm will indefinitely increment ajaxProgress\n            // with successively smaller increments without reaching 100%\n            opt.width += 1;\n            opt.style.width = Math.max(\n                100 - 75 * Math.exp(-0.125 * opt.width),\n                opt.style.width.slice(0, -1) | 0\n            ) + "%";\n            if (!opt.counter) {\n                setTimeout(opt, 0, gotoState, onError);\n            }\n            break;\n        // ajaxProgress - 100%\n        case 3:\n            opt.width = -1;\n            opt.style.width = "100%";\n            setTimeout(opt, 1000, gotoState, onError);\n            break;\n        // ajaxProgress - hide\n        case 4:\n            // cleanup timerInterval and timerTimeout\n            clearInterval(opt.timerInterval);\n            opt.timerInterval = null;\n            clearTimeout(opt.timerTimeout);\n            opt.timerTimeout = null;\n            // hide ajaxProgress\n            opt.style.background = "transparent";\n            if (onError) {\n                onError();\n            }\n            setTimeout(opt, 250, gotoState);\n            break;\n        // ajaxProgress - reset\n        default:\n            // reset ajaxProgress\n            opt.counter = 0;\n            opt.width = 0;\n            opt.style.width = "0%";\n        }\n    };\n    opt = window.domOnEventAjaxProgressUpdate;\n    opt.end = function (onError) {\n        opt.counter = 0;\n        window.domOnEventAjaxProgressUpdate(2, onError);\n    };\n    opt.elem = document.getElementById("domElementAjaxProgress1");\n    if (!opt.elem) {\n        opt.elem = document.createElement("div");\n        setTimeout(function () {\n            document.body.insertBefore(opt.elem, document.body.firstChild);\n        });\n    }\n    opt.elem.id = "domElementAjaxProgress1";\n    opt.style = opt.elem.style;\n    // init style\n    Object.entries({\n        background: "#d00",\n        height: "2px",\n        left: "0",\n        margin: "0",\n        padding: "0",\n        position: "fixed",\n        top: "0",\n        transition: "background 250ms, width 750ms",\n        width: "0%",\n        "z-index": "1"\n    }).forEach(function (entry) {\n        opt.style[entry[0]] = opt.style[entry[0]] || entry[1];\n    });\n    // init state\n    opt.background = opt.style.background;\n    opt.counter = 0;\n    opt.width = 0;\n}());\n\n\n\n// init domOnEventDelegateDict\n(function () {\n/*\n * this function will handle delegated dom-evt\n */\n    "use strict";\n    let debounce;\n    let timerTimeout;\n    debounce = function () {\n        return setTimeout(function () {\n            timerTimeout = undefined;\n        }, 30);\n    };\n    if (!(\n        typeof window === "object" && window && window.document\n        && typeof document.addEventListener === "function"\n    ) || window.domOnEventDelegateDict) {\n        return;\n    }\n    window.domOnEventDelegateDict = {};\n    window.domOnEventDelegateDict.domOnEventDelegate = function (evt) {\n        evt.targetOnEvent = evt.target.closest("[data-onevent]");\n        if (\n            !evt.targetOnEvent\n            || evt.targetOnEvent.dataset.onevent === "domOnEventNop"\n            || evt.target.closest(".disabled,.readonly")\n        ) {\n            return;\n        }\n        // filter evt-change\n        switch (evt.type !== "change" && evt.target.type) {\n        case "checkbox":\n        case "file":\n        case "select-one":\n        case "radio":\n            return;\n        }\n        // filter evt-keyup\n        switch (evt.type) {\n        case "keyup":\n            if (!timerTimeout && (\n                evt.target.tagName === "INPUT"\n                || evt.target.tagName === "TEXTAREA"\n            )) {\n                timerTimeout = debounce();\n                if (evt.target.dataset.valueOld !== evt.target.value) {\n                    evt.target.dataset.valueOld = evt.target.value;\n                    break;\n                }\n            }\n            return;\n        }\n        switch (evt.targetOnEvent.tagName) {\n        case "BUTTON":\n        case "FORM":\n            evt.preventDefault();\n            break;\n        }\n        evt.stopPropagation();\n        // handle domOnEventClickTarget\n        if (evt.targetOnEvent.dataset.onevent === "domOnEventClickTarget") {\n            document.querySelector(\n                evt.targetOnEvent.dataset.clickTarget\n            ).click();\n            return;\n        }\n        window.domOnEventDelegateDict[evt.targetOnEvent.dataset.onevent](evt);\n    };\n    // handle evt\n    [\n        "change",\n        "click",\n        "keyup",\n        "submit"\n    ].forEach(function (eventType) {\n        document.addEventListener(\n            eventType,\n            window.domOnEventDelegateDict.domOnEventDelegate\n        );\n    });\n}());\n\n\n\n// init domOnEventSelectAllWithinPre\n(function () {\n/*\n * this function will limit select-all within <pre tabIndex="0"> elem\n * https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse\n */\n    "use strict";\n    if (!(\n        typeof window === "object" && window && window.document\n        && typeof document.addEventListener === "function"\n    ) || window.domOnEventSelectAllWithinPre) {\n        return;\n    }\n    window.domOnEventSelectAllWithinPre = function (evt) {\n        let range;\n        let selection;\n        if (\n            evt && (evt.ctrlKey || evt.metaKey) && evt.key === "a"\n            && evt.target.closest("pre")\n        ) {\n            range = document.createRange();\n            range.selectNodeContents(evt.target.closest("pre"));\n            selection = window.getSelection();\n            selection.removeAllRanges();\n            selection.addRange(range);\n            evt.preventDefault();\n        }\n    };\n    // handle evt\n    document.addEventListener(\n        "keydown",\n        window.domOnEventSelectAllWithinPre\n    );\n}());\n</script>\n<h1>\n<!-- utility2-comment\n<a\n    {{#if env.npm_package_homepage}}\n    href="{{env.npm_package_homepage}}"\n    {{/if env.npm_package_homepage}}\n    target="_blank"\n>\nutility2-comment -->\n    {{env.npm_package_name}} ({{env.npm_package_version}})\n<!-- utility2-comment\n</a>\nutility2-comment -->\n</h1>\n<h3>{{env.npm_package_description}}</h3>\n<!-- utility2-comment\n<a class="button" download href="assets.app.js">download standalone app</a><br>\n<button class="button" data-onevent="testRunBrowser" id="buttonTestRun1">run browser-tests</button><br>\n<div class="uiAnimateSlide" id="htmlTestReport1" style="border-bottom: 0; border-top: 0; margin-bottom: 0; margin-top: 0; max-height: 0; padding-bottom: 0; padding-top: 0;"></div>\nutility2-comment -->\n\n\n\n<!-- custom-html-start -->\n<label>edit or paste script below to cover and test</label>\n<textarea class="textarea" data-onevent="domOnEventInputChange" id="inputTextarea1">\n// remove comment below to disable jslint\n/*jslint browser, devel*/\n/*global window*/\n(function () {\n    "use strict";\n    var testCaseDict;\n    testCaseDict = {};\n    testCaseDict.modeTest = 1;\n\n    // comment this testCase to disable failed error demo\n    testCaseDict.testCase_failed_error_demo = function (opt, onError) {\n    /*\n     * this function will run a failed error demo\n     */\n        // hack-jslint\n        window.utility2.nop(opt);\n        onError(new Error("this is a failed error demo"));\n    };\n\n    testCaseDict.testCase_passed_ajax_demo = function (opt, onError) {\n    /*\n     * this function will demo a passed ajax test\n     */\n        var data;\n        opt = {url: "/"};\n        // test ajax-req for main-page "/"\n        window.utility2.ajax(opt, function (err, xhr) {\n            try {\n                // handle err\n                console.assert(!err, err);\n                // validate "200 ok" status\n                console.assert(xhr.statusCode === 200, xhr.statusCode);\n                // validate non-empty data\n                data = xhr.responseText;\n                console.assert(data && data.length > 0, data);\n                onError();\n            } catch (errCaught) {\n                onError(errCaught);\n            }\n        });\n    };\n\n    window.utility2.testRunDefault(testCaseDict);\n}());\n</textarea>\n<button class="button" data-onevent="domOnEventInputChange" id="buttonJslintAutofix1">jslint autofix</button><br>\n<pre class= "colorError" id="outputJslintPre1" tabindex="0"></pre>\n<label>instrumented-code</label>\n<textarea class="readonly textarea" id="outputTextarea1" readonly tabindex="0"></textarea>\n<label>stderr and stdout</label>\n<textarea class="onevent-reset-output readonly textarea" id="outputStdout1" readonly></textarea>\n<div id="htmlTestReport2"></div>\n<div id="htmlCoverageReport1"></div>\n<script>\n/* jslint utility2:true */\nwindow.addEventListener("load", function (local) {\n"use strict";\nlocal = window.utility2;\nlocal.querySelectorAll(\n    "#buttonTestRun1, #htmlTestReport1"\n).forEach(function (elem) {\n    elem.style.display = "none";\n});\nlocal.domOnEventInputChange = function (evt) {\n    switch (evt.type + "." + evt.target.id) {\n    case "click.buttonJslintAutofix1":\n    case "keyup.inputTextarea1":\n        // jslint #inputTextarea1\n        local.jslintAndPrint(local.querySelector(\n            "#inputTextarea1"\n        ).value, "inputTextarea1.js", {\n            autofix: evt.target.id === "buttonJslintAutofix1",\n            conditional: evt.target.id !== "buttonJslintAutofix1"\n        });\n        if (local.jslint.jslintResult.autofix) {\n            local.querySelector(\n                "#inputTextarea1"\n            ).value = local.jslint.jslintResult.code;\n        }\n        local.querySelector(\n            "#outputJslintPre1"\n        ).textContent = local.jslint.jslintResult.errMsg.replace((\n            /\\u001b\\[\\d*m/g\n        ), "").trim();\n        // try to cleanup __coverage__\n        try {\n            delete globalThis.__coverage__["/inputTextarea1.js"];\n        } catch (ignore) {}\n        // try to cover and eval #inputTextarea1\n        try {\n            local.querySelector(\n                "#outputTextarea1"\n            ).value = local.istanbul.instrumentSync(\n                local.querySelector("#inputTextarea1").value,\n                "/inputTextarea1.js"\n            );\n            eval( // jslint ignore:line\n                local.querySelector("#outputTextarea1").value\n            );\n        } catch (errCaught) {\n            console.error(errCaught);\n        }\n        break;\n    }\n};\n// handle evt\nlocal.on("utility2.testRunEnd", function () {\n    local.querySelector(\n        "#htmlCoverageReport1"\n    ).innerHTML = local.istanbul.coverageReportCreate({\n        coverage: globalThis.__coverage__\n    });\n});\nlocal.on("utility2.testRunProgressUpdate", function (testReport) {\n    local.querySelector(\n        "#htmlTestReport2"\n    ).innerHTML = local.testReportMerge(testReport, {});\n});\nlocal.domOnEventInputChange({\n    target: {\n        id: "inputTextarea1"\n    },\n    type: "keyup"\n});\n});\n</script>\n<!-- custom-html-end -->\n\n\n\n<!-- utility2-comment\n{{#if isRollup}}\n<script src="assets.app.js"></script>\n{{#unless isRollup}}\nutility2-comment -->\n<script src="assets.utility2.lib.istanbul.js"></script>\n<script src="assets.utility2.lib.jslint.js"></script>\n<script src="assets.utility2.lib.marked.js"></script>\n<script src="assets.utility2.lib.sjcl.js"></script>\n<script src="assets.utility2.js"></script>\n<script>window.utility2_onReadyBefore.counter += 1;</script>\n<script src="jsonp.utility2.stateInit?callback=window.utility2.stateInit"></script>\n<script src="assets.example.js"></script>\n<script src="assets.test.js"></script>\n<script>\nif (window.utility2_onReadyBefore) {\n    window.utility2_onReadyBefore();\n}\n</script>\n<!-- utility2-comment\n{{/if isRollup}}\nutility2-comment -->\n<div style="text-align: center;">\n    [\n    this app was created with\n    <a\n        href="https://github.com/kaizhu256/node-utility2" target="_blank"\n    >utility2</a>\n    ]\n</div>\n</body>\n</html>\n';

















































































































































































































































































































































































































































































































































































/* jslint ignore:end */
local.assetsDict["/assets.utility2.js"] = (
    local.assetsDict["/assets.utility2.js"]
    || local.fs.readFileSync(
        local.__dirname + "/lib.utility2.js",
        "utf8"
    ).replace((
        /^#!\//
    ), "// ")
);
/* validateLineSortedReset */
local.assetsDict["/"] = local.assetsDict[
    "/assets.index.template.html"
].replace((
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
// init cli
if (module !== require.main || globalThis.utility2_rollup) {
    return;
}
local.assetsDict["/assets.example.js"] = (
    local.assetsDict["/assets.example.js"]
    || local.fs.readFileSync(__filename, "utf8")
);
local.assetsDict["/favicon.ico"] = local.assetsDict["/favicon.ico"] || "";
local.assetsDict["/index.html"] = local.assetsDict["/"];
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
