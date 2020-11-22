#!/usr/bin/env node
/*
 * lib.utility2.js (2020.11.13)
 * https://github.com/kaizhu256/node-utility2
 * this zero-dependency package will provide high-level functions to to build, test, and deploy webapps
 *
 */


/* istanbul instrument in package utility2 */
// assets.utility2.header.js - start
/* jslint utility2:true */
/* istanbul ignore next */
// run shared js-env code - init-local
(function () {
    "use strict";
    let isBrowser;
    let isWebWorker;
    let local;
    // polyfill globalThis
    if (!(typeof globalThis === "object" && globalThis)) {
        if (typeof window === "object" && window && window.window === window) {
            window.globalThis = window;
        }
        if (typeof global === "object" && global && global.global === global) {
            global.globalThis = global;
        }
    }
    // init debugInline
    if (!globalThis.debugInline) {
        let consoleError;
        consoleError = console.error;
        globalThis.debugInline = function (...argList) {
        /*
         * this function will both print <argList> to stderr
         * and return <argList>[0]
         */
            consoleError("\n\ndebugInline");
            consoleError(...argList);
            consoleError("\n");
            return argList[0];
        };
    }
    // init isBrowser
    isBrowser = (
        typeof globalThis.XMLHttpRequest === "function"
        && globalThis.navigator
        && typeof globalThis.navigator.userAgent === "string"
    );
    // init isWebWorker
    isWebWorker = (
        isBrowser && typeof globalThis.importScripts === "function"
    );
    // init function
    function objectDeepCopyWithKeysSorted(obj) {
    /*
     * this function will recursively deep-copy <obj> with keys sorted
     */
        let sorted;
        if (typeof obj !== "object" || !obj) {
            return obj;
        }
        // recursively deep-copy list with child-keys sorted
        if (Array.isArray(obj)) {
            return obj.map(objectDeepCopyWithKeysSorted);
        }
        // recursively deep-copy obj with keys sorted
        sorted = {};
        Object.keys(obj).sort().forEach(function (key) {
            sorted[key] = objectDeepCopyWithKeysSorted(obj[key]);
        });
        return sorted;
    }
    function assertJsonEqual(aa, bb) {
    /*
     * this function will assert JSON.stringify(<aa>) === JSON.stringify(<bb>)
     */
        aa = JSON.stringify(objectDeepCopyWithKeysSorted(aa));
        bb = JSON.stringify(objectDeepCopyWithKeysSorted(bb));
        if (aa !== bb) {
            throw new Error(JSON.stringify(aa) + " !== " + JSON.stringify(bb));
        }
    }
    function assertOrThrow(passed, msg) {
    /*
     * this function will throw <msg> if <passed> is falsy
     */
        if (passed) {
            return;
        }
        throw (
            (
                msg
                && typeof msg.message === "string"
                && typeof msg.stack === "string"
            )
            // if msg is err, then leave as is
            ? msg
            : new Error(
                typeof msg === "string"
                // if msg is string, then leave as is
                ? msg
                // else JSON.stringify(msg)
                : JSON.stringify(msg, undefined, 4)
            )
        );
    }
    function coalesce(...argList) {
    /*
     * this function will coalesce null, undefined, or "" in <argList>
     */
        let arg;
        let ii;
        ii = 0;
        while (ii < argList.length) {
            arg = argList[ii];
            if (arg !== undefined && arg !== null && arg !== "") {
                return arg;
            }
            ii += 1;
        }
        return arg;
    }
    function identity(val) {
    /*
     * this function will return <val>
     */
        return val;
    }
    function noop() {
    /*
     * this function will do nothing
     */
        return;
    }
    function objectAssignDefault(tgt = {}, src = {}, depth = 0) {
    /*
     * this function will if items from <tgt> are null, undefined, or "",
     * then overwrite them with items from <src>
     */
        let recurse;
        recurse = function (tgt, src, depth) {
            Object.entries(src).forEach(function ([
                key, bb
            ]) {
                let aa;
                aa = tgt[key];
                if (aa === undefined || aa === null || aa === "") {
                    tgt[key] = bb;
                    return;
                }
                if (
                    depth !== 0
                    && typeof aa === "object" && aa && !Array.isArray(aa)
                    && typeof bb === "object" && bb && !Array.isArray(bb)
                ) {
                    recurse(aa, bb, depth - 1);
                }
            });
        };
        recurse(tgt, src, depth | 0);
        return tgt;
    }
    function onErrorThrow(err) {
    /*
     * this function will throw <err> if exists
     */
        if (err) {
            throw err;
        }
    }
    // bug-workaround - throw unhandledRejections in node-process
    if (
        typeof process === "object" && process
        && typeof process.on === "function"
        && process.unhandledRejections !== "strict"
    ) {
        process.unhandledRejections = "strict";
        process.on("unhandledRejection", function (err) {
            throw err;
        });
    }
    // init local
    local = {
        assertJsonEqual,
        assertOrThrow,
        coalesce,
        identity,
        isBrowser,
        isWebWorker,
        local,
        noop,
        objectAssignDefault,
        objectDeepCopyWithKeysSorted,
        onErrorThrow
    };
    globalThis.globalLocal = local;
}());
// assets.utility2.header.js - end


(function (local) {
"use strict";


/* istanbul ignore next */
// run shared js-env code - init-before
(function () {
// init local
local = (
    globalThis.utility2_rollup
    // || globalThis.utility2_rollup_old
    // || require("./assets.utility2.rollup.js")
    || globalThis.globalLocal
);
// init exports
if (local.isBrowser) {
    globalThis.utility2_utility2 = local;
} else {
    module.exports = local;
    module.exports.__dirname = __dirname;
}
// init lib main
local.utility2 = local;


/* validateLineSortedReset */
// init lib utility2
globalThis.utility2 = local;
// init lib extra
[
    "apidoc",
    "istanbul",
    "jslint",
    "marked"
].forEach(function (key) {
    try {
        local[key] = (
            local.isBrowser
            ? globalThis["utility2_" + key]
            : require("./lib." + key + ".js")
        );
    } catch (errCaught) {
        local.assertOrThrow(errCaught.code === "MODULE_NOT_FOUND", errCaught);
    }
    local[key] = local[key] || {};
});


// run shared js-env code - assets
local.assetsDict = local.assetsDict || {};


local.assetsDict[
    "/assets.utility2.header.js"
] = `// assets.utility2.header.js - start
/* jslint utility2:true */
/* istanbul ignore next */
// run shared js\-env code - init-local
(function () {
    "use strict";
    let isBrowser;
    let isWebWorker;
    let local;
    // polyfill globalThis
    if (!(typeof globalThis === "object" && globalThis)) {
        if (typeof window === "object" && window && window.window === window) {
            window.globalThis = window;
        }
        if (typeof global === "object" && global && global.global === global) {
            global.globalThis = global;
        }
    }
    // init debugInline
    if (!globalThis.debugInline) {
        let consoleError;
        consoleError = console.error;
        globalThis.debugInline = function (...argList) {
        /*
         * this function will both print <argList> to stderr
         * and return <argList>[0]
         */
            consoleError("\\n\\ndebugInline");
            consoleError(...argList);
            consoleError("\\n");
            return argList[0];
        };
    }
    // init isBrowser
    isBrowser = (
        typeof globalThis.XMLHttpRequest === "function"
        && globalThis.navigator
        && typeof globalThis.navigator.userAgent === "string"
    );
    // init isWebWorker
    isWebWorker = (
        isBrowser && typeof globalThis.importScripts === "function"
    );
    // init function
    function objectDeepCopyWithKeysSorted(obj) {
    /*
     * this function will recursively deep-copy <obj> with keys sorted
     */
        let sorted;
        if (typeof obj !== "object" || !obj) {
            return obj;
        }
        // recursively deep-copy list with child-keys sorted
        if (Array.isArray(obj)) {
            return obj.map(objectDeepCopyWithKeysSorted);
        }
        // recursively deep-copy obj with keys sorted
        sorted = {};
        Object.keys(obj).sort().forEach(function (key) {
            sorted[key] = objectDeepCopyWithKeysSorted(obj[key]);
        });
        return sorted;
    }
    function assertJsonEqual(aa, bb) {
    /*
     * this function will assert JSON.stringify(<aa>) === JSON.stringify(<bb>)
     */
        aa = JSON.stringify(objectDeepCopyWithKeysSorted(aa));
        bb = JSON.stringify(objectDeepCopyWithKeysSorted(bb));
        if (aa !== bb) {
            throw new Error(JSON.stringify(aa) + " !== " + JSON.stringify(bb));
        }
    }
    function assertOrThrow(passed, msg) {
    /*
     * this function will throw <msg> if <passed> is falsy
     */
        if (passed) {
            return;
        }
        throw (
            (
                msg
                && typeof msg.message === "string"
                && typeof msg.stack === "string"
            )
            // if msg is err, then leave as is
            ? msg
            : new Error(
                typeof msg === "string"
                // if msg is string, then leave as is
                ? msg
                // else JSON.stringify(msg)
                : JSON.stringify(msg, undefined, 4)
            )
        );
    }
    function coalesce(...argList) {
    /*
     * this function will coalesce null, undefined, or "" in <argList>
     */
        let arg;
        let ii;
        ii = 0;
        while (ii < argList.length) {
            arg = argList[ii];
            if (arg !== undefined && arg !== null && arg !== "") {
                return arg;
            }
            ii += 1;
        }
        return arg;
    }
    function identity(val) {
    /*
     * this function will return <val>
     */
        return val;
    }
    function noop() {
    /*
     * this function will do nothing
     */
        return;
    }
    function objectAssignDefault(tgt = {}, src = {}, depth = 0) {
    /*
     * this function will if items from <tgt> are null, undefined, or "",
     * then overwrite them with items from <src>
     */
        let recurse;
        recurse = function (tgt, src, depth) {
            Object.entries(src).forEach(function ([
                key, bb
            ]) {
                let aa;
                aa = tgt[key];
                if (aa === undefined || aa === null || aa === "") {
                    tgt[key] = bb;
                    return;
                }
                if (
                    depth !== 0
                    && typeof aa === "object" && aa && !Array.isArray(aa)
                    && typeof bb === "object" && bb && !Array.isArray(bb)
                ) {
                    recurse(aa, bb, depth - 1);
                }
            });
        };
        recurse(tgt, src, depth | 0);
        return tgt;
    }
    function onErrorThrow(err) {
    /*
     * this function will throw <err> if exists
     */
        if (err) {
            throw err;
        }
    }
    // bug-workaround - throw unhandledRejections in node-process
    if (
        typeof process === "object" && process
        && typeof process.on === "function"
        && process.unhandledRejections !== "strict"
    ) {
        process.unhandledRejections = "strict";
        process.on("unhandledRejection", function (err) {
            throw err;
        });
    }
    // init local
    local = {
        assertJsonEqual,
        assertOrThrow,
        coalesce,
        identity,
        isBrowser,
        isWebWorker,
        local,
        noop,
        objectAssignDefault,
        objectDeepCopyWithKeysSorted,
        onErrorThrow
    };
    globalThis.globalLocal = local;
}());
// assets.utility2.header.js - end
`;


/* jslint ignore:start */
local.assetsDict["/assets.index.template.html"] =
local.assetsDict["/assets.utility2.template.html"] = '\
<!doctype html>\n\
<html lang="en">\n\
<head>\n\
<meta charset="utf-8">\n\
<meta name="viewport" content="width=device-width, initial-scale=1">\n\
<!-- "assets.utility2.template.html" -->\n\
<title>{{env.npm_package_name}} ({{env.npm_package_version}})</title>\n\
<style>\n\
/* jslint utility2:true */\n\
/*csslint\n\
*/\n\
/* csslint ignore:start */\n\
*,\n\
*:after,\n\
*:before {\n\
    box-sizing: border-box;\n\
}\n\
.uiAnimateSlide {\n\
    overflow-y: hidden;\n\
    transition: max-height ease-in 250ms, min-height ease-in 250ms, padding-bottom ease-in 250ms, padding-top ease-in 250ms;\n\
}\n\
/* csslint ignore:end */\n\
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
    background: #f7f7f7;\n\
    font-family: Arial, Helvetica, sans-serif;\n\
    font-size: small;\n\
    margin: 0 40px;\n\
}\n\
body > div,\n\
body > input,\n\
body > pre,\n\
body > .button,\n\
body > .textarea {\n\
    margin-bottom: 20px;\n\
    margin-top: 0;\n\
}\n\
body > input,\n\
body > .button {\n\
    width: 20rem;\n\
}\n\
body > .readonly {\n\
    background: #ddd;\n\
}\n\
body > .textarea {\n\
    height: 10rem;\n\
    resize: vertical;\n\
    width: 100%;\n\
}\n\
code,\n\
pre,\n\
.textarea {\n\
    font-family: Consolas, Menlo, monospace;\n\
    font-size: smaller;\n\
}\n\
pre {\n\
    overflow-wrap: break-word;\n\
    white-space: pre-wrap;\n\
}\n\
.button {\n\
    background: #ddd;\n\
    border: 1px solid #999;\n\
    color: #000;\n\
    cursor: pointer;\n\
    display: inline-block;\n\
    padding: 2px 5px;\n\
    text-align: center;\n\
    text-decoration: none;\n\
}\n\
.button:hover {\n\
    background: #bbb;\n\
}\n\
.colorError {\n\
    color: #d00;\n\
}\n\
.textarea {\n\
    background: #fff;\n\
    border: 1px solid #999;\n\
    border-radius: 0;\n\
    cursor: auto;\n\
    overflow: auto;\n\
    padding: 2px;\n\
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
<div class="uiAnimateSpin" style="animation: uiAnimateSpin 2s linear infinite; border: 5px solid #999; border-radius: 50%; border-top: 5px solid #7d7; display: none; height: 25px; vertical-align: middle; width: 25px;"></div>\n\
<script>\n\
/* jslint utility2:true */\n\
// polyfill globalThis\n\
(function () {\n\
/*\n\
 * this function will polyfill globalThis\n\
 */\n\
    "use strict";\n\
    window.globalThis = window.globalThis || globalThis;\n\
}());\n\
\n\
\n\
// init domOnEventWindowOnloadTimeElapsed\n\
(function () {\n\
/*\n\
 * this function will measure and print time-elapsed for window.onload\n\
 */\n\
    "use strict";\n\
    if (!(\n\
        typeof window === "object" && window && window.document\n\
        && typeof document.addEventListener === "function"\n\
    ) || window.domOnEventWindowOnloadTimeElapsed) {\n\
        return;\n\
    }\n\
    window.domOnEventWindowOnloadTimeElapsed = Date.now() + 100;\n\
    window.addEventListener("load", function () {\n\
        setTimeout(function () {\n\
            window.domOnEventWindowOnloadTimeElapsed = (\n\
                Date.now()\n\
                - window.domOnEventWindowOnloadTimeElapsed\n\
            );\n\
            console.error(\n\
                "domOnEventWindowOnloadTimeElapsed = "\n\
                + window.domOnEventWindowOnloadTimeElapsed\n\
            );\n\
        }, 100);\n\
    });\n\
}());\n\
\n\
\n\
// init domOnEventAjaxProgressUpdate\n\
(function () {\n\
/*\n\
 * this function will display incrementing ajax-progress-bar\n\
 */\n\
    "use strict";\n\
    let opt;\n\
    let styleBar0;\n\
    let styleBar;\n\
    let styleModal0;\n\
    let styleModal;\n\
    let timeStart;\n\
    let timerInterval;\n\
    let timerTimeout;\n\
    let tmp;\n\
    let width;\n\
    try {\n\
        if (\n\
            window.domOnEventAjaxProgressUpdate\n\
            || !document.getElementById("domElementAjaxProgressBar1").style\n\
        ) {\n\
            return;\n\
        }\n\
    } catch (ignore) {\n\
        return;\n\
    }\n\
    window.domOnEventAjaxProgressUpdate = function (gotoState, onError) {\n\
        gotoState = (gotoState | 0) + 1;\n\
        switch (gotoState) {\n\
        // ajaxProgress - show\n\
        case 1:\n\
            // init timerInterval and timerTimeout\n\
            if (!timerTimeout) {\n\
                timeStart = Date.now();\n\
                timerInterval = setInterval(opt, 2000, 1, onError);\n\
                timerTimeout = setTimeout(opt, opt.timeout, 2, onError);\n\
            }\n\
            // show ajaxProgressBar\n\
            if (width !== -1) {\n\
                styleBar.background = styleBar0.background;\n\
            }\n\
            setTimeout(opt, 50, gotoState, onError);\n\
            break;\n\
        // ajaxProgress - increment\n\
        case 2:\n\
            // show ajaxProgressBar\n\
            if (width === -1) {\n\
                break;\n\
            }\n\
            styleBar.background = styleBar0.background;\n\
            // reset ajaxProgress if it reaches end\n\
            if ((styleBar.width.slice(0, -1) | 0) > 95) {\n\
                width = 0;\n\
            }\n\
            // this algorithm will indefinitely increment ajaxProgress\n\
            // with successively smaller increments without reaching 100%\n\
            width += 1;\n\
            styleBar.width = Math.max(\n\
                100 - 75 * Math.exp(-0.125 * width),\n\
                styleBar.width.slice(0, -1) | 0\n\
            ) + "%";\n\
            // show ajaxProgressModal\n\
            styleModal.height = "100%";\n\
            styleModal.opacity = styleModal0.opacity;\n\
            if (!opt.cnt) {\n\
                setTimeout(opt, 0, gotoState, onError);\n\
            }\n\
            break;\n\
        // ajaxProgress - 100%\n\
        case 3:\n\
            width = -1;\n\
            styleBar.width = "100%";\n\
            setTimeout(opt, 1000, gotoState, onError);\n\
            break;\n\
        // ajaxProgress - hide\n\
        case 4:\n\
            // debug timeElapsed\n\
            tmp = Date.now();\n\
            console.error(\n\
                "domOnEventAjaxProgressUpdate - timeElapsed - "\n\
                + (tmp - timeStart)\n\
                + " ms"\n\
            );\n\
            // cleanup timerInterval and timerTimeout\n\
            timeStart = tmp;\n\
            clearInterval(timerInterval);\n\
            timerInterval = undefined;\n\
            clearTimeout(timerTimeout);\n\
            timerTimeout = undefined;\n\
            // hide ajaxProgressBar\n\
            styleBar.background = "transparent";\n\
            // hide ajaxProgressModal\n\
            styleModal.opacity = "0";\n\
            if (onError) {\n\
                onError();\n\
            }\n\
            setTimeout(opt, 250, gotoState);\n\
            break;\n\
        // ajaxProgress - reset\n\
        default:\n\
            opt.cnt = 0;\n\
            width = 0;\n\
            styleBar.width = "0%";\n\
            styleModal.height = "0";\n\
        }\n\
    };\n\
    opt = window.domOnEventAjaxProgressUpdate;\n\
    opt.end = function (onError) {\n\
        opt.cnt = 0;\n\
        window.domOnEventAjaxProgressUpdate(2, onError);\n\
    };\n\
    // init styleBar\n\
    styleBar = document.getElementById("domElementAjaxProgressBar1").style;\n\
    styleBar0 = Object.assign({}, styleBar);\n\
    Object.entries({\n\
        background: "#d00",\n\
        height: "2px",\n\
        left: "0",\n\
        margin: "0",\n\
        padding: "0",\n\
        position: "fixed",\n\
        top: "0",\n\
        transition: "background 250ms, width 750ms",\n\
        width: "0%",\n\
        "z-index": "1"\n\
    }).forEach(function (entry) {\n\
        styleBar[entry[0]] = styleBar[entry[0]] || entry[1];\n\
    });\n\
    // init styleModal\n\
    styleModal = document.getElementById("domElementAjaxProgressModal1") || {};\n\
    styleModal = styleModal.style || {};\n\
    styleModal0 = Object.assign({}, styleModal);\n\
    Object.entries({\n\
        height: "0",\n\
        left: "0",\n\
        margin: "0",\n\
        padding: "0",\n\
        position: "fixed",\n\
        top: "0",\n\
        transition: "opacity 125ms",\n\
        width: "100%",\n\
        "z-index": "1"\n\
    }).forEach(function (entry) {\n\
        styleModal[entry[0]] = styleModal[entry[0]] || entry[1];\n\
    });\n\
    // init state\n\
    width = 0;\n\
    opt.cnt = 0;\n\
    opt.timeout = 30000;\n\
    // init ajaxProgress\n\
    window.domOnEventAjaxProgressUpdate();\n\
}());\n\
\n\
\n\
// init domOnEventDelegateDict\n\
(function () {\n\
/*\n\
 * this function will handle delegated dom-evt\n\
 */\n\
    "use strict";\n\
    let debounce;\n\
    let timerTimeout;\n\
    debounce = function () {\n\
        return setTimeout(function () {\n\
            timerTimeout = undefined;\n\
        }, 30);\n\
    };\n\
    if (!(\n\
        typeof window === "object" && window && window.document\n\
        && typeof document.addEventListener === "function"\n\
    ) || window.domOnEventDelegateDict) {\n\
        return;\n\
    }\n\
    window.domOnEventDelegateDict = {};\n\
    window.domOnEventDelegateDict.domOnEventDelegate = function (evt) {\n\
        evt.targetOnEvent = evt.target.closest("[data-onevent]");\n\
        if (\n\
            !evt.targetOnEvent\n\
            || evt.targetOnEvent.dataset.onevent === "domOnEventNoop"\n\
            || evt.target.closest(".disabled,.readonly")\n\
        ) {\n\
            return;\n\
        }\n\
        // filter evt-change\n\
        switch (evt.type !== "change" && evt.target.type) {\n\
        case "checkbox":\n\
        case "file":\n\
        case "select-one":\n\
        case "radio":\n\
            return;\n\
        }\n\
        // filter evt-keyup\n\
        switch (evt.type) {\n\
        case "keyup":\n\
            if (!timerTimeout && (\n\
                evt.target.tagName === "INPUT"\n\
                || evt.target.tagName === "TEXTAREA"\n\
            )) {\n\
                timerTimeout = debounce();\n\
                if (evt.target.dataset.valueOld !== evt.target.value) {\n\
                    evt.target.dataset.valueOld = evt.target.value;\n\
                    break;\n\
                }\n\
            }\n\
            return;\n\
        }\n\
        switch (evt.targetOnEvent.tagName) {\n\
        case "BUTTON":\n\
        case "FORM":\n\
            evt.preventDefault();\n\
            break;\n\
        }\n\
        evt.stopPropagation();\n\
        // handle domOnEventClickTarget\n\
        if (evt.targetOnEvent.dataset.onevent === "domOnEventClickTarget") {\n\
            document.querySelector(\n\
                evt.targetOnEvent.dataset.clickTarget\n\
            ).click();\n\
            return;\n\
        }\n\
        window.domOnEventDelegateDict[evt.targetOnEvent.dataset.onevent](evt);\n\
    };\n\
    // handle evt\n\
    [\n\
        "change",\n\
        "click",\n\
        "keyup",\n\
        "submit"\n\
    ].forEach(function (eventType) {\n\
        document.addEventListener(\n\
            eventType,\n\
            window.domOnEventDelegateDict.domOnEventDelegate\n\
        );\n\
    });\n\
}());\n\
\n\
\n\
// init domOnEventSelectAllWithinPre\n\
(function () {\n\
/*\n\
 * this function will limit select-all within <pre tabIndex="0"> elem\n\
 * https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse\n\
 */\n\
    "use strict";\n\
    if (!(\n\
        typeof window === "object" && window && window.document\n\
        && typeof document.addEventListener === "function"\n\
    ) || window.domOnEventSelectAllWithinPre) {\n\
        return;\n\
    }\n\
    window.domOnEventSelectAllWithinPre = function (evt) {\n\
        let range;\n\
        let selection;\n\
        if (\n\
            evt && (evt.ctrlKey || evt.metaKey) && evt.key === "a"\n\
            && evt.target.closest("pre")\n\
        ) {\n\
            range = document.createRange();\n\
            range.selectNodeContents(evt.target.closest("pre"));\n\
            selection = window.getSelection();\n\
            selection.removeAllRanges();\n\
            selection.addRange(range);\n\
            evt.preventDefault();\n\
        }\n\
    };\n\
    // handle evt\n\
    document.addEventListener(\n\
        "keydown",\n\
        window.domOnEventSelectAllWithinPre\n\
    );\n\
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
<button class="button" data-onevent="testRunBrowser" id="buttonTestRun1">run browser-tests</button><br>\n\
<div class="uiAnimateSlide" id="htmlTestReport1" style="border-bottom: 0; border-top: 0; margin-bottom: 0; margin-top: 0; max-height: 0; padding-bottom: 0; padding-top: 0;"></div>\n\
utility2-comment -->\n\
\n\
\n\
<!-- custom-html-start -->\n\
<label>stderr and stdout</label>\n\
<textarea class="onevent-reset-output readonly textarea" id="outputStdout1" readonly></textarea>\n\
<!-- custom-html-end -->\n\
\n\
\n\
<!-- utility2-comment\n\
{{#if isRollup}}\n\
<script src="assets.app.js"></script>\n\
{{#unless isRollup}}\n\
<script src="assets.utility2.rollup.js"></script>\n\
<script>window.utility2_onReadyBefore.cnt += 1;</script>\n\
<script src="utility2.state.init.js"></script>\n\
utility2-comment -->\n\
<script src="assets.{{packageJson.nameLib}}.js"></script>\n\
<script src="assets.example.js"></script>\n\
<script src="assets.test.js"></script>\n\
<script>\n\
if (window.utility2_onReadyBefore) {\n\
    window.utility2_onReadyBefore();\n\
}\n\
</script>\n\
<!-- utility2-comment\n\
{{/if isRollup}}\n\
utility2-comment -->\n\
<div style="text-align: center;">\n\
    [\n\
    this app was created with\n\
    <a\n\
        href="https://github.com/kaizhu256/node-utility2" target="_blank"\n\
    >utility2</a>\n\
    ]\n\
</div>\n\
</body>\n\
</html>\n\
';


// https://img.shields.io/badge/last_build-0000_00_00_00_00_00_UTC_--_master_--_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-0077ff.svg?style=flat
local.assetsDict["/assets.buildBadge.template.svg"] =
'<svg xmlns="http://www.w3.org/2000/svg" width="563" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="563" height="20" fill="#555"/><rect rx="0" x="61" width="502" height="20" fill="#07f"/><path fill="#07f" d="M61 0h4v20h-4z"/><rect rx="0" width="563" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="31.5" y="15" fill="#010101" fill-opacity=".3">last build</text><text x="31.5" y="14">last build</text><text x="311" y="15" fill="#010101" fill-opacity=".3">0000-00-00 00:00:00 UTC - master - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</text><text x="311" y="14">0000-00-00 00:00:00 UTC - master - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</text></g></svg>';


local.assetsDict["/assets.example.html"] = "";


local.assetsDict["/assets.example.template.js"] = '\
/*\n\
example.js\n\
\n\
this script will run web-demo of my-app-lite\n\
\n\
instruction\n\
    1. save this script as example.js\n\
    2. run shell-command:\n\
        $ npm install my-app-lite && \\\n\
            PORT=8081 node example.js\n\
    3. open browser to http://127.0.0.1:8081 and play with web-demo\n\
    4. edit this script to suit your needs\n\
*/\n\
\n\
\n\
/* istanbul instrument in package my_app */\n\
' + local.assetsDict["/assets.utility2.header.js"] + '\
\n\
\n\
/* jslint utility2:true */\n\
(function (local) {\n\
"use strict";\n\
\n\
\n\
// run shared js\-env code - init-before\n\
(function () {\n\
// init local\n\
local = (\n\
    globalThis.utility2_rollup\n\
    || globalThis.utility2_my_app\n\
    || require("my-app-lite")\n\
);\n\
// init exports\n\
globalThis.local = local;\n\
}());\n\
\n\
\n\
/* istanbul ignore next */\n\
// run browser js\-env code - init-test\n\
(function () {\n\
if (!local.isBrowser) {\n\
    return;\n\
}\n\
// log stderr and stdout to #outputStdout1\n\
["error", "log"].forEach(function (key) {\n\
    let elem;\n\
    let fnc;\n\
    elem = document.querySelector("#outputStdout1");\n\
    if (!elem) {\n\
        return;\n\
    }\n\
    fnc = console[key];\n\
    console[key] = function (...argList) {\n\
        fnc(...argList);\n\
        // append text to #outputStdout1\n\
        elem.textContent += argList.map(function (arg) {\n\
            return (\n\
                typeof arg === "string"\n\
                ? arg\n\
                : JSON.stringify(arg, undefined, 4)\n\
            );\n\
        }).join(" ").replace((\n\
            /\\u001b\\[\\d*m/g\n\
        ), "") + "\\n";\n\
        // scroll textarea to bottom\n\
        elem.scrollTop = elem.scrollHeight;\n\
    };\n\
});\n\
local.objectAssignDefault(local, globalThis.domOnEventDelegateDict);\n\
globalThis.domOnEventDelegateDict = local;\n\
}());\n\
\n\
\n\
/* istanbul ignore next */\n\
// run node js\-env code - init-test\n\
(function () {\n\
if (local.isBrowser) {\n\
    return;\n\
}\n\
// init exports\n\
module.exports = local;\n\
// init assetsDict\n\
local.assetsDict = local.assetsDict || {};\n\
/* jslint ignore:start */\n\
local.assetsDict["/assets.index.template.html"] = \'\\\n\
'
+ local.assetsDict["/assets.index.template.html"].replace((/\n/g), "\\n\\\n")
+ '\';\n\
/* jslint ignore:end */\n\
local.assetsDict["/assets.my_app.js"] = (\n\
    local.assetsDict["/assets.my_app.js"]\n\
    || require("fs").readFileSync(\n\
        require("path").resolve(local.__dirname + "/lib.my_app.js"),\n\
        "utf8"\n\
    ).replace((\n\
        /^#!\\//\n\
    ), "// ")\n\
);\n\
/* validateLineSortedReset */\n\
local.assetsDict["/"] = local.assetsDict[\n\
    "/assets.index.template.html"\n\
].replace((\n\
    /\\{\\{env\\.(\\w+?)\\}\\}/g\n\
), function (match0, match1) {\n\
    switch (match1) {\n\
    case "npm_package_description":\n\
        return "the greatest app in the world!";\n\
    case "npm_package_name":\n\
        return "my-app-lite";\n\
    case "npm_package_nameLib":\n\
        return "my_app";\n\
    case "npm_package_version":\n\
        return "0.0.1";\n\
    default:\n\
        return match0;\n\
    }\n\
});\n\
local.assetsDict["/assets.example.html"] = local.assetsDict["/"];\n\
// init cli\n\
if (module !== require.main || globalThis.utility2_rollup) {\n\
    return;\n\
}\n\
local.assetsDict["/assets.example.js"] = (\n\
    local.assetsDict["/assets.example.js"]\n\
    || require("fs").readFileSync(__filename, "utf8")\n\
);\n\
local.assetsDict["/favicon.ico"] = local.assetsDict["/favicon.ico"] || "";\n\
local.assetsDict["/index.html"] = local.assetsDict["/"];\n\
// if $npm_config_timeout_exit exists,\n\
// then exit this process after $npm_config_timeout_exit ms\n\
if (Number(process.env.npm_config_timeout_exit)) {\n\
    setTimeout(process.exit, Number(process.env.npm_config_timeout_exit));\n\
}\n\
// start server\n\
if (globalThis.utility2_serverHttp1) {\n\
    return;\n\
}\n\
process.env.PORT = process.env.PORT || "8081";\n\
console.error("http-server listening on port " + process.env.PORT);\n\
require("http").createServer(function (req, res) {\n\
    let data;\n\
    data = local.assetsDict[require("url").parse(req.url).pathname];\n\
    if (data !== undefined) {\n\
        res.end(data);\n\
        return;\n\
    }\n\
    res.statusCode = 404;\n\
    res.end();\n\
}).listen(process.env.PORT);\n\
}());\n\
}());\n\
';


local.assetsDict["/assets.my_app.template.js"] = '\
#!/usr/bin/env node\n\
/*\n\
 * lib.my_app.js ({{packageJson.version}})\n\
 * https://github.com/kaizhu256/node-my-app-lite\n\
 * {{packageJson.description}}\n\
 *\n\
 */\n\
\n\
\n\
/* istanbul instrument in package my_app */\n\
' + local.assetsDict["/assets.utility2.header.js"] + '\
\n\
\n\
(function (local) {\n\
"use strict";\n\
\n\
\n\
/* istanbul ignore next */\n\
// run shared js\-env code - init-before\n\
(function () {\n\
// init local\n\
local = (\n\
    globalThis.utility2_rollup\n\
    // || globalThis.utility2_rollup_old\n\
    // || require("./assets.utility2.rollup.js")\n\
    || globalThis.globalLocal\n\
);\n\
// init exports\n\
if (local.isBrowser) {\n\
    globalThis.utility2_my_app = local;\n\
} else {\n\
    module.exports = local;\n\
    module.exports.__dirname = __dirname;\n\
}\n\
// init lib main\n\
local.my_app = local;\n\
\n\
\n\
/* validateLineSortedReset */\n\
return;\n\
}());\n\
}());\n\
';


local.assetsDict["/assets.readme.template.md"] = '\
# my-app-lite\n\
the greatest app in the world!\n\
\n\
# live web demo\n\
- [https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.com/app](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.com/app)\n\
\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithub.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.com/app)\n\
\n\
\n\
[![travis-ci.com build-status](https://api.travis-ci.com/kaizhu256/node-my-app-lite.svg)](https://travis-ci.com/kaizhu256/node-my-app-lite) [![coverage](https://kaizhu256.github.io/node-my-app-lite/build/coverage/coverage.badge.svg)](https://kaizhu256.github.io/node-my-app-lite/build/coverage/index.html)\n\
\n\
[![NPM](https://nodei.co/npm/my-app-lite.png?downloads=true)](https://www.npmjs.com/package/my-app-lite)\n\
\n\
[![build commit status](https://kaizhu256.github.io/node-my-app-lite/build/build.badge.svg)](https://travis-ci.com/kaizhu256/node-my-app-lite)\n\
\n\
| git-branch : | [master](https://github.com/kaizhu256/node-my-app-lite/tree/master) | [beta](https://github.com/kaizhu256/node-my-app-lite/tree/beta) | [alpha](https://github.com/kaizhu256/node-my-app-lite/tree/alpha)|\n\
|--:|:--|:--|:--|\n\
| test-server-github : | [![github.com test-server](https://kaizhu256.github.io/node-my-app-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-my-app-lite/build..master..travis-ci.com/app) | [![github.com test-server](https://kaizhu256.github.io/node-my-app-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.com/app) | [![github.com test-server](https://kaizhu256.github.io/node-my-app-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-my-app-lite/build..alpha..travis-ci.com/app)|\n\
| test-server-heroku : | [![heroku.com test-server](https://kaizhu256.github.io/node-my-app-lite/heroku-logo.75x25.png)](https://h1-my-app-master.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-my-app-lite/heroku-logo.75x25.png)](https://h1-my-app-beta.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-my-app-lite/heroku-logo.75x25.png)](https://h1-my-app-alpha.herokuapp.com)|\n\
| test-report : | [![test-report](https://kaizhu256.github.io/node-my-app-lite/build..master..travis-ci.com/test-report.badge.svg)](https://kaizhu256.github.io/node-my-app-lite/build..master..travis-ci.com/test-report.html) | [![test-report](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.com/test-report.badge.svg)](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.com/test-report.html) | [![test-report](https://kaizhu256.github.io/node-my-app-lite/build..alpha..travis-ci.com/test-report.badge.svg)](https://kaizhu256.github.io/node-my-app-lite/build..alpha..travis-ci.com/test-report.html)|\n\
| coverage : | [![coverage](https://kaizhu256.github.io/node-my-app-lite/build..master..travis-ci.com/coverage/coverage.badge.svg)](https://kaizhu256.github.io/node-my-app-lite/build..master..travis-ci.com/coverage/index.html) | [![coverage](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.com/coverage/coverage.badge.svg)](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.com/coverage/index.html) | [![coverage](https://kaizhu256.github.io/node-my-app-lite/build..alpha..travis-ci.com/coverage/coverage.badge.svg)](https://kaizhu256.github.io/node-my-app-lite/build..alpha..travis-ci.com/coverage/index.html)|\n\
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-my-app-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-my-app-lite/tree/gh-pages/build..master..travis-ci.com) | [![build-artifacts](https://kaizhu256.github.io/node-my-app-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-my-app-lite/tree/gh-pages/build..beta..travis-ci.com) | [![build-artifacts](https://kaizhu256.github.io/node-my-app-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-my-app-lite/tree/gh-pages/build..alpha..travis-ci.com)|\n\
\n\
[![npmPackageListing](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.npmPackageListing.svg)](https://github.com/kaizhu256/node-my-app-lite)\n\
\n\
![npmPackageDependencyTree](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.npmPackageDependencyTree.svg)\n\
\n\
\n\
# table of contents\n\
\n\
\n\
# cdn download\n\
- [https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.com/app/assets.my_app.js](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.com/app/assets.my_app.js)\n\
\n\
\n\
# documentation\n\
#### api doc\n\
- [https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.com/apidoc.html](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.com/apidoc.html)\n\
\n\
[![apidoc](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252F.tmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.com/apidoc.html)\n\
\n\
#### cli help\n\
![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.npmPackageCliHelp.svg)\n\
\n\
#### changelog 0.0.1\n\
- update build\n\
- none\n\
\n\
#### todo\n\
- none\n\
\n\
\n\
# quickstart standalone app\n\
#### to run this example, follow instruction in script below\n\
- [assets.app.js](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.com/app/assets.app.js)\n\
```shell\n\
# example.sh\n\
\n\
# this shell script will download and run web-demo of my-app-lite as standalone app\n\
\n\
# 1. download standalone app\n\
curl -O https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.com/app/assets.app.js\n\
# 2. run standalone app\n\
PORT=8081 node ./assets.app.js\n\
# 3. open browser to http://127.0.0.1:8081 and play with web-demo\n\
# 4. edit file assets.app.js to suit your needs\n\
```\n\
\n\
#### output from browser\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleSh.browser.%252F.png)](https://kaizhu256.github.io/node-my-app-lite/build/app/assets.example.html)\n\
\n\
#### output from shell\n\
![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleSh.svg)\n\
\n\
\n\
# quickstart example.js\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-my-app-lite/build/app/assets.example.html)\n\
\n\
#### to run this example, follow instruction in script below\n\
- [example.js](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.com/example.js)\n\
```javascript\n' + local.assetsDict["/assets.example.template.js"] + '```\n\
\n\
#### output from browser\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-my-app-lite/build/app/assets.example.html)\n\
\n\
#### output from shell\n\
![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleJs.svg)\n\
\n\
\n\
# extra screenshots\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252F.tmp%252Fbuild%252Fapidoc.html.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252F.tmp%252Fbuild%252Fapidoc.html.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252F.tmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252F.tmp%252Fbuild%252Fapidoc.html.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252F.tmp%252Fbuild%252Fcoverage.lib.html.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252F.tmp%252Fbuild%252Fcoverage.lib.html.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252F.tmp%252Fbuild%252Fcoverage.lib.html.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252F.tmp%252Fbuild%252Fcoverage.lib.html.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252F.tmp%252Fbuild%252Ftest-report.html.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252F.tmp%252Fbuild%252Ftest-report.html.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252F.tmp%252Fbuild%252Ftest-report.html.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252F.tmp%252Fbuild%252Ftest-report.html.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithub.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithub.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithub.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithub.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithubTest.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithubTest.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithubTest.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithubTest.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHeroku.browser.%252F.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHeroku.browser.%252F.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHeroku.browser.%252F.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHeroku.browser.%252F.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHerokuTest.browser.%252F.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHerokuTest.browser.%252F.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHerokuTest.browser.%252F.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHerokuTest.browser.%252F.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.npmTest.browser.%252F.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.npmTest.browser.%252F.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.npmTest.browser.%252F.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.npmTest.browser.%252F.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleJs.browser.%252F.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleJs.browser.%252F.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleJs.browser.%252F.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleSh.browser.%252F.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleSh.browser.%252F.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleSh.browser.%252F.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleSh.browser.%252F.png)\n\
\n\
\n\
# package.json\n\
```json\n\
{\n\
    "!!jslint_utility2": true,\n\
    "author": "kai zhu <kaizhu256@gmail.com>",\n\
    "description": "the greatest app in the world!",\n\
    "devDependencies": {\n\
        "utility2": "kaizhu256/node-utility2#alpha"\n\
    },\n\
    "engines": {\n\
        "node": ">=12.0"\n\
    },\n\
    "fileCount": 0,\n\
    "homepage": "https://github.com/kaizhu256/node-my-app-lite",\n\
    "keywords": [],\n\
    "license": "MIT",\n\
    "main": "lib.my_app.js",\n\
    "name": "my-app-lite",\n\
    "nameAliasPublish": "",\n\
    "repository": {\n\
        "type": "git",\n\
        "url": "https://github.com/kaizhu256/node-my-app-lite.git"\n\
    },\n\
    "scripts": {\n\
        "build-ci": "sh npm_scripts.sh",\n\
        "env": "env",\n\
        "eval": "sh npm_scripts.sh",\n\
        "heroku-postbuild": "sh npm_scripts.sh",\n\
        "postinstall": "sh npm_scripts.sh",\n\
        "start": "sh npm_scripts.sh",\n\
        "test": "sh npm_scripts.sh",\n\
        "utility2": "sh npm_scripts.sh"\n\
    },\n\
    "version": "0.0.1"\n\
}\n\
```\n\
\n\
\n\
# changelog of last 50 commits\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.gitLog.svg)](https://github.com/kaizhu256/node-my-app-lite/commits)\n\
\n\
\n\
# internal build script\n\
- build_ci.sh\n\
```shell\n\
# build_ci.sh\n\
\n\
# this shell script will run build-ci for this package\n\
\n\
shBuildCiAfter () {(set -e\n\
    # shDeployCustom\n\
    shDeployGithub\n\
    # shDeployHeroku\n\
    shReadmeEval example.sh\n\
)}\n\
\n\
shBuildCiBefore () {(set -e\n\
    # shNpmTestPublished\n\
    shReadmeEval example.js\n\
)}\n\
\n\
# run shBuildCi\n\
eval "$(utility2 source)"\n\
shBuildCi\n\
```\n\
\n\
\n\
# misc\n\
- this package was created with [utility2](https://github.com/kaizhu256/node-utility2)\n\
';


local.assetsDict["/assets.test.template.js"] = '\
/* istanbul instrument in package my_app */\n\
' + local.assetsDict["/assets.utility2.header.js"] + '\
\n\
\n\
/* jslint utility2:true */\n\
(function (local) {\n\
"use strict";\n\
\n\
\n\
/* istanbul ignore next */\n\
// run shared js\-env code - init-before\n\
(function () {\n\
// init local\n\
local = globalThis.utility2 || require("utility2");\n\
local = local.requireReadme();\n\
globalThis.local = local;\n\
// init test\n\
local.testRunDefault(local);\n\
}());\n\
\n\
\n\
// run shared js\-env code - function\n\
(function () {\n\
return;\n\
}());\n\
}());\n\
';


// https://img.shields.io/badge/tests_failed-999-dd0000.svg?style=flat
local.assetsDict["/assets.testReportBadge.template.svg"] =
'<svg xmlns="http://www.w3.org/2000/svg" width="103" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="103" height="20" fill="#555"/><rect rx="0" x="72" width="31" height="20" fill="#d00"/><path fill="#d00" d="M72 0h4v20h-4z"/><rect rx="0" width="103" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="37" y="15" fill="#010101" fill-opacity=".3">tests failed</text><text x="37" y="14">tests failed</text><text x="86.5" y="15" fill="#010101" fill-opacity=".3">999</text><text x="86.5" y="14">999</text></g></svg>';


local.assetsDict["/assets.utility2.rollup.start.js"] = '\
/* utility2.rollup.js begin */\n\
/* istanbul ignore all */\n\
' + local.assetsDict["/assets.utility2.header.js"] + '\
\n\
\n\
/* jslint utility2:true */\n\
(function () {\n\
    "use strict";\n\
    // init utility2_rollup\n\
    globalThis.utility2_rollup = (\n\
        globalThis.utility2_rollup_old\n\
        || globalThis.globalLocal\n\
    );\n\
    globalThis.utility2_rollup.local = globalThis.utility2_rollup;\n\
    globalThis.utility2_rollup_old = null;\n\
}());\n\
';


local.assetsDict["/assets.utility2.rollup.content.js"] = '\
(function (local) {\n\
    "use strict";\n\
/* jslint ignore:start */\n\
/* utility2.rollup.js content */\n\
/* jslint ignore:end */\n\
    return local;\n\
}(globalThis.utility2_rollup));\n\
';


local.assetsDict["/assets.utility2.rollup.end.js"] = '\
(function () {\n\
    "use strict";\n\
    globalThis.utility2_rollup_old = globalThis.utility2_rollup;\n\
    globalThis.utility2_rollup = null;\n\
}());\n\
/* utility2.rollup.js end */\n\
';


local.assetsDict["/favicon.ico"] = "";
/* jslint ignore:end */


// run shared js-env code - cli
local.cliDict = {};

local.cliDict["utility2.browserTest"] = function () {
/*
 * <urlList> <mode>
 * will browser-test in parallel, comma-separated <urlList> with given <mode>
 */
    local.browserTest({
        url: process.argv[3]
    }, function (err) {
        if (err) {
            console.log(err);
        }
    });
};

local.cliDict["utility2.start"] = function () {
/*
 * <port>
 * will start utility2 http-server on given <port> (default 8081)
 */
    globalThis.local = local;
    local.replStart();
    local.testRunDefault({});
    if (process.env.npm_config_runme) {
        require(require("path").resolve(process.env.npm_config_runme));
    }
};

local.cliDict["utility2.testReportCreate"] = function () {
/*
 *
 * will create test-report
 */
    process.exit(
        local.testReportCreate(
            JSON.parse(
                require("fs").readFileSync(
                    process.env.UTILITY2_DIR_BUILD + "/test-report.json",
                    "utf8"
                )
            )
        ).testsFailed !== 0
    );
};
}());


// run shared js-env code - function
(function () {
let localEventListenerDict;
let localEventListenerId;
localEventListenerDict = {};
localEventListenerId = 0;


local._testCase_buildApidoc_default = function (opt, onError) {
/*
 * this function will test buildApidoc's default handling-behavior
 */
    let require2;
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    require2 = function (file) {
    /*
     * this function will require <file> in sandbox-env
     */
        let exports;
        let mockDict;
        let mockList;
        let noop;
        noop = function () {
        /*
         * this function will do nothing
         */
            return;
        };
        // coverage-hack
        noop();
        mockList = [
            [
                globalThis, {
                    setImmediate: noop,
                    setInterval: noop,
                    setTimeout: noop
                }
            ]
        ];
        // disable io and side-effect
        [
            process,
            process.stdin,
            process.stdout,
            require("child_process"),
            require("cluster"),
            require("crypto"),
            require("dgram"),
            require("dns"),
            require("domain"),
            require("events").prototype,
            require("http"),
            require("https"),
            require("net"),
            require("os"),
            require("readline"),
            require("repl"),
            require("stream").prototype,
            require("timers"),
            require("tls"),
            require("tty"),
            require("util"),
            require("v8"),
            require("vm"),
            {
                // coverage-hack
                "__zjqx1234__": noop
            }
        ].forEach(function (dict) {
            mockDict = {};
            Object.keys(dict).forEach(function (key) {
                if (typeof dict[key] === "function" && (
                    process.env.npm_config_mode_test_case
                    === "testCase_buildApidoc_default"
                    // coverage-hack
                    || key === "__zjqx1234__"
                )) {
                    mockDict[key] = noop;
                }
            });
            mockList.push([
                dict, mockDict
            ]);
        });
        local.testMock(mockList, function (onError) {
            try {
                exports = require(file);
            } catch (errCaught) {
                console.error(errCaught);
            }
            onError();
        }, local.onErrorThrow);
        return exports;
    };
    // coverage-hack
    require2();
    // save apidoc.html
    local.fsWriteFileWithMkdirp(".tmp/build/apidoc.html", local.apidocCreate(
        Object.assign({
            blacklistDict: local,
            modeNoop: (
                process.env.npm_config_mode_test_case
                !== "testCase_buildApidoc_default"
            ),
            require: require2
        }, opt)
    ), onError);
};

local._testCase_buildApp_default = function (opt, onError) {
/*
 * this function will test buildApp's default handling-behavior
 */
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    local.buildApp(opt, onError);
};

local._testCase_webpage_default = function (opt, onError) {
/*
 * this function will test webpage's default handling-behavior
 */
    local.domQuerySelectorAllTagName("html");
    local.domStyleValidate();
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    local.browserTest({
        fileScreenshot: (
            process.env.UTILITY2_DIR_BUILD
            + "/screenshot." + process.env.MODE_BUILD + ".browser.%2F.png"
        ),
        url: (
            local.serverLocalHost
            + "/?modeTest=1&timeoutDefault=" + local.timeoutDefault
            + "&modeTestCase=" + local.modeTestCase.replace((
                /_?testCase_webpage_default/
            ), "")
        )
    }, onError);
};

local.browserTest = function ({
    modeSilent,
    modeTestReportCreate,
    url
}, onError) {
/*
 * this function will spawn google-chrome-process to test <url>
 */
    let chromeClient;
    let fileScreenshot;
    let isDone;
    let promiseList;
    let testId;
    let testName;
    function onError2(err) {
        // cleanup chromeClient
        chromeClient.destroy();
        onError(err);
    }
    // init utility2_testReport
    globalThis.utility2_testReport = globalThis.utility2_testReport || {
        coverage: globalThis.__coverage__,
        testPlatformList: [
            {
                name: (
                    local.isBrowser
                    ? (
                        "browser - "
                        + location.pathname + " - " + navigator.userAgent
                    )
                    : "node - " + process.platform + " " + process.version
                ) + " - " + new Date().toISOString(),
                testCaseList: []
            }
        ]
    };
    if (modeTestReportCreate) {
        return;
    }
    Promise.resolve().then(function () {
        // node - init
        url = url.replace("{{timeExit}}", Date.now() + local.timeoutDefault);
        testId = Math.random().toString(16);
        testName = process.env.MODE_BUILD + ".browser." + encodeURIComponent(
            require("url").parse(url).pathname.replace(
                "/build.." + process.env.CI_BRANCH + ".." + process.env.CI_HOST,
                "/build"
            )
        );
        fileScreenshot = (
            process.env.UTILITY2_DIR_BUILD
            + "/screenshot." + testName + ".png"
        );
        return local.chromeDevtoolsClientCreate({
            modeSilent,
            timeout: local.timeoutDefault,
            url
        });
    }).then(function (data) {
        chromeClient = data;
        return chromeClient.navigate({
            url
        });
    }).then(function () {
        promiseList = [];
        promiseList.push(chromeClient.screenshot({
            delay: 100,
            file: fileScreenshot
        }));
        chromeClient.evaluate(
            // coverage-hack
            "console.timeStamp();\n"
            + "window.utility2_testId=\"" + testId + "\";\n"
            + "if(!window.utility2_modeTest){\n"
            + "console.timeStamp(window.utility2_testId);\n"
            + "}\n"
        );
        return new Promise(function (resolve) {
            chromeClient.on("Performance.metrics", function ({
                title
            }) {
                if (isDone || title !== testId) {
                    return;
                }
                isDone = true;
                resolve(chromeClient.evaluate(
                    "JSON.stringify(\n"
                    + "window.utility2_testReport\n"
                    + "||{testPlatformList:[{}]}\n"
                    + ");\n"
                ));
            });
        });
    }).then(function (data) {
        data = JSON.parse(data);
        // merge browser-screenshot
        data.testPlatformList[0].screenshot = fileScreenshot.replace((
            /.*\//
        ), "");
        // merge browser-coverage
        local.istanbulCoverageMerge(globalThis.__coverage__, data.coverage);
        // merge browser-test-report
        local.testReportMerge(globalThis.utility2_testReport, data);
        // save test-report.json
        promiseList.push(new Promise(function (resolve) {
            require("fs").writeFile(
                require("path").resolve(
                    process.env.UTILITY2_DIR_BUILD + "/test-report.json"
                ),
                JSON.stringify(globalThis.utility2_testReport),
                function (err) {
                    local.onErrorThrow(err);
                    console.error(
                        "\nbrowserTest - merged test-report "
                        + process.env.UTILITY2_DIR_BUILD + "/test-report.json"
                        + "\n"
                    );
                    resolve();
                }
            );
        }));
        return Promise.all(promiseList);
    }).then(function () {
        // cleanup chromeClient
        chromeClient.destroy();
        onError2();
    });
};

local.buildApp = function ({
    assetsList = [],
    customizeReadmeList = []
}, onError) {
/*
 * this function will build app
 */
    let buildAppAssets;
    let buildAppStandalone;
    let buildLib;
    let buildReadme;
    let buildTest;
    let fileDict;
    let packageJson;
    let packageNameLib;
    let port;
    let promiseList;
    let src;
    let tgt;
    let tgtReplaceConditional;
    let writeFile;
    let writeFileLog;
    tgtReplaceConditional = function (condition, replaceList) {
    /*
     * this function will conditionally replace <tgt> with replacements in
     * <replaceList>
     */
        replaceList.forEach(function ({
            aa,
            bb,
            merge
        }) {
            let isMatch;
            if (!condition) {
                aa = aa || merge;
                console.error(
                    "buildApp - replace-skipped - "
                    + JSON.stringify((aa && aa.source) || aa)
                );
                return;
            }
            if (aa) {
                if (!tgt.match(aa)) {
                    console.error(
                        "buildApp - replace-unmatched - "
                        + JSON.stringify((aa && aa.source) || aa)
                    );
                    return;
                }
                tgt = tgt.replace(aa, bb);
                return;
            }
            src.replace(merge, function (match2) {
                tgt.replace(merge, function (match1) {
                    isMatch = true;
                    // disable $-escape in replacement-string
                    tgt = tgt.replace(match1, function () {
                        return match2;
                    });
                    return "";
                });
                return "";
            });
            if (!isMatch) {
                console.error(
                    "buildApp - replace-unmatched - "
                    + JSON.stringify(merge.source)
                );
            }
        });
    };
    writeFile = function (file, data, resolve) {
    /*
     * this function will write <data> to <file> with notification
     */
        require("fs").writeFile(file, data, function (err) {
            local.onErrorThrow(err);
            writeFileLog(file);
            resolve();
        });
    };
    writeFileLog = function (file) {
    /*
     * this function will notify <file> written
     */
        console.error("buildApp - wrote - " + require("path").resolve(file));
    };
    buildAppAssets = function (resolve) {
        let promiseList2;
        promiseList2 = [];
        // fetch assets
        [
            {
                url: "/LICENSE"
            }, {
                file: "/assets." + packageNameLib + ".html",
                url: "/index.html"
            }, {
                url: "/assets." + packageNameLib + ".css"
            }, {
                url: "/assets." + packageNameLib + ".js"
            }, {
                url: "/assets.app.js"
            }, {
                url: "/assets.example.html"
            }, {
                url: "/assets.example.js"
            }, {
                url: "/assets.test.js"
            }, {
                url: "/assets.utility2.html"
            }, {
                url: "/assets.utility2.lib.jslint.js"
            }, {
                url: "/assets.utility2.rollup.js"
            }, {
                url: "/index.html"
            }, {
                url: "/index.rollup.html"
            }, {
                url: "/utility2.state.init.js"
            }
        ].concat(assetsList).forEach(function (elem) {
            promiseList2.push(new Promise(function (resolve) {
                require("http").request((
                    "http://127.0.0.1:" + process.env.PORT + elem.url
                ), function (res) {
                    let file;
                    file = ".tmp/build/app/" + (elem.file || elem.url);
                    res.pipe(require("fs").createWriteStream(
                        file
                    ).on("close", function () {
                        writeFileLog(file);
                        resolve();
                    }));
                }).end();
            }));
        });
        // jslint assets
        Promise.all(promiseList2).then(function (errList) {
            errList.forEach(local.onErrorThrow);
            require("child_process").spawn("node", [
                "assets.utility2.lib.jslint.js", "dir", ".", "--conditional"
            ], {
                cwd: ".tmp/build/app",
                stdio: [
                    "ignore", 1, 2
                ]
            }).on("exit", resolve);
        });
    };
    buildAppStandalone = function (resolve) {
        // write native-module
        require("fs").readdir(".", function (err, fileList) {
            local.onErrorThrow(err);
            Promise.all(fileList.map(function (file) {
                return new Promise(function (resolve) {
                    if (require("path").extname(file) !== ".node") {
                        resolve();
                        return;
                    }
                    require("fs").copyFile(file, (
                        ".tmp/build/app.standalone/" + file
                    ), function (err) {
                        local.onErrorThrow(err);
                        resolve();
                    });
                });
            })).then(function () {
                // write assets.app.js
                writeFile((
                    ".tmp/build/app.standalone/assets.app.js"
                ), local.assetsDict["/assets.app.js"], function () {
                    // test-file assets.app.js
                    require("child_process").spawn("node", [
                        "assets.app.js"
                    ], {
                        cwd: ".tmp/build/app.standalone",
                        env: {
                            PATH: process.env.PATH,
                            PORT: port,
                            npm_config_timeout_exit: 4000
                        },
                        stdio: [
                            "ignore", 1, 2
                        ]
                    }).on("exit", resolve);
                });
            });
        });
    };
    buildLib = function (resolve) {
        src = fileDict["lib." + packageNameLib + ".js"];
        // render lib.xxx.js
        tgt = local.templateRenderMyApp(
            local.assetsDict["/assets.my_app.template.js"]
        );
        tgtReplaceConditional(true, [
            {
                // customize top-level comment-description
                merge: (
                    /\n\u0020\*\n(?:[\S\s]*?\n)?\u0020\*\/\n/
                )
            }, {
                // customize code after /* validateLineSortedReset */
                merge: (
                    /\n\/\*\u0020validateLineSortedReset\u0020\*\/\n[\S\s]*?$/
                )
            }
        ]);
        // customize assets.utility2.rollup.js
        tgtReplaceConditional(fileDict["assets.utility2.rollup.js"], [
            {
                aa: "    // || globalThis.utility2_rollup_old",
                bb: "    || globalThis.utility2_rollup_old"
            }, {
                aa: "    // || require(\"./assets.utility2.rollup.js\")",
                bb: "    || require(\"./assets.utility2.rollup.js\")"
            }
        ]);
        // write lib.xxx.js
        writeFile("lib." + packageNameLib + ".js", tgt, resolve);
    };
    buildReadme = function (resolve) {
    /*
     * this function will build readme with template assets.readme.template.md
     */
        let packageJsonRgx;
        let toc;
        // reset toc
        src = fileDict["README.md"].replace((
            /\n#\u0020table\u0020of\u0020contents$[\S\s]*?\n\n\n/m
        ), "\n# table of contents\n\n\n");
        packageJsonRgx = (
            /\n#\u0020package.json\n```json\n([\S\s]*?)\n```\n/
        );
        // render README.md
        tgt = local.templateRenderMyApp(
            local.assetsDict["/assets.readme.template.md"]
        );
        // init packageJson
        src.replace(packageJsonRgx, function (match0, match1) {
            // remove null from package.json
            packageJson = JSON.parse(match1.replace((
                /\u0020{4}".*?":\u0020null,?$/gm
            ), ""));
            packageJson.description = src.split("\n")[1];
            local.objectAssignDefault(packageJson, {
                nameLib: JSON.parse(fileDict["package.json"]).nameLib
            });
            packageJson = local.objectAssignDefault(packageJson, {
                nameLib: packageJson.name.replace((
                    /\W/g
                ), "_"),
                nameOriginal: packageJson.name
            });
            packageJson = local.objectAssignDefault(
                packageJson,
                JSON.parse(local.templateRenderMyApp(packageJsonRgx.exec(
                    local.assetsDict["/assets.readme.template.md"]
                )[1])),
                2
            );
            // avoid npm-installing that
            delete packageJson.devDependencies[packageJson.name];
            // reset scripts
            packageJson.scripts = {
                "build-ci": "sh npm_scripts.sh",
                env: "env",
                eval: "sh npm_scripts.sh",
                "heroku-postbuild": "sh npm_scripts.sh",
                postinstall: "sh npm_scripts.sh",
                start: "sh npm_scripts.sh",
                test: "sh npm_scripts.sh",
                utility2: "sh npm_scripts.sh"
            };
            // write package.json
            require("fs").writeFileSync(
                "package.json",
                JSON.stringify(local.objectDeepCopyWithKeysSorted(
                    packageJson
                ), undefined, 4) + "\n"
            );
            writeFileLog("package.json");
            // re-render README.md
            tgt = local.templateRenderMyApp(
                local.assetsDict["/assets.readme.template.md"]
            ).replace(packageJsonRgx, match0.replace(
                match1,
                JSON.stringify(local.objectDeepCopyWithKeysSorted(
                    packageJson
                ), undefined, 4)
            ));
            return "";
        });
        tgtReplaceConditional(true, [
            {
                // customize name and description
                merge: (
                    /.*?\n.*?\n/
                )
            }, {
                // customize cdn-download
                merge: (
                    /\n#\u0020cdn\u0020download\n[\S\s]*?\n\n\n/
                )
            }, {
                // customize live-web-demo
                merge: (
                    /\n#\u0020live\u0020web\u0020demo\n[\S\s]*?\n\n\n/
                )
            }, {
                // customize changelog
                merge: (
                    /\n####\u0020changelog\u0020[\S\s]*?\n\n\n/
                )
            }, {
                // customize example.js - shared js\u002denv code - init-before
                merge: (
                    /\nglobalThis\.local\u0020=\u0020local;\n[^`]*?\n\/\*\u0020istanbul\u0020ignore\u0020next\u0020\*\/\n\/\/\u0020run\u0020browser\u0020js\u002denv\u0020code\u0020-\u0020init-test\n/
                )
            }, {
                // customize example.js - html-body
                merge: (
                    /\n<!--\u0020custom-html-start\u0020-->\\n\\\n[^`]*?\n<!--\u0020custom-html-end\u0020-->\\n\\\n/
                )
            }, {
                // customize build_ci - shBuildCiAfter
                merge: (
                    /\nshBuildCiAfter\u0020\(\)\u0020\{\(set\u0020-e\n[\S\s]*?\n\)\}\n/
                )
            }, {
                // customize build_ci - shBuildCiBefore
                merge: (
                    /\nshBuildCiBefore\u0020\(\)\u0020\{\(set\u0020-e\n[\S\s]*?\n\)\}\n/
                )
            }
        ]);
        // customize private-repository
        tgtReplaceConditional(packageJson.private, [
            {
                aa: (
                    /\n\[!\[NPM\]\(https:\/\/nodei.co\/npm\/.*?\n/
                ),
                bb: ""
            }, {
                aa: "$ npm install ",
                bb: (
                    "$ git clone \\\n"
                    + packageJson.repository.url.replace(
                        "git+https://github.com/",
                        "git@github.com:"
                    ) + " \\\n--single-branch -b beta node_modules/"
                )
            }
        ]);
        // customize version
        [
            src, tgt
        ] = [
            src, tgt
        ].map(function (elem) {
            return elem.replace((
                /\n(####\u0020changelog\u0020|-\u0020npm\u0020publish\u0020)\d+?\.\d+?\.\d+?.*?\n/g
            ), "\n$1" + packageJson.version + "\n");
        });
        // customize example.js
        tgtReplaceConditional(local.assetsDict[
            "/index.html"
        ].indexOf("<script src=\"assets.example.js\"></script>") < 0, [
            {
                aa: (
                    /\nif\u0020\(!local.isBrowser\)\u0020\{\n[\S\s]*?\n\}\(\)\);\n/g
                ),
                bb: "\nif (!local.isBrowser) {\n    return;\n}\n}());\n"
            }
        ]);
        // customize comment
        src.replace((
            /^(\u0020*?)(?:#\!\!\u0020|#\/\/\u0020|\/\/\!\!\u0020|<!--\u0020)(.*?)(?:\u0020-->)?$/gm
        ), function (match0, match1, match2) {
            tgt = tgt.replace(
                "\n" + match1 + match2 + "\n",
                "\n" + match0 + "\n"
            );
        });
        // customize - user-defined
        tgtReplaceConditional(true, customizeReadmeList);
        // customize assets.index.template.html
        tgtReplaceConditional(local.assetsDict[
            "/assets.index.template.html"
        ].indexOf("\"assets.utility2.template.html\"") < 0, [
            {
                aa: (
                    /\n\/\*\u0020jslint\u0020ignore:start\u0020\*\/\nlocal.assetsDict\["\/assets.index.template.html"\]\u0020=\u0020'\\\n[\S\s]*?\n\/\*\u0020jslint\u0020ignore:end\u0020\*\/\n/
                ),
                bb: "\n"
            }
        ]);
        // customize shDeployCustom
        tgtReplaceConditional(src.indexOf("    shDeployCustom\n") >= 0, [
            {
                // customize example.sh
                merge: (
                    /\n####\u0020changelog\u0020[\S\s]*?\n#\u0020quickstart\u0020example.js\n/
                )
            }, {
                // customize screenshot
                merge: (
                    /\n#\u0020quickstart\u0020[\S\s]*?\n#\u0020extra\u0020screenshots\n/
                )
            }, {
                // customize screenshot
                aa: (
                    /^1\.\u0020.*?screenshot\.(?:npmTest|testExampleJs|testExampleSh).*?\.png[\S\s]*?\n\n/gm
                ),
                bb: ""
            }
        ]);
        // customize shNpmTestPublished
        tgt = tgt.replace(
            "$ npm install " + process.env.GITHUB_FULLNAME + "#alpha",
            "$ npm install " + packageJson.name
        );
        tgtReplaceConditional(src.indexOf("    shNpmTestPublished\n") < 0, [
            {
                aa: "$ npm install " + packageJson.name,
                bb: "$ npm install " + process.env.GITHUB_FULLNAME + "#alpha"
            }, {
                aa: (
                    /\n.*?\bhttps:\/\/www.npmjs.com\/package\/.*?\n/
                ),
                bb: ""
            }, {
                aa: (
                    /\n.*?npmPackageDependencyTree.*?\n/
                ),
                bb: ""
            }
        ]);
        // customize shBuildCiAfter and shBuildCiBefore
        [
            [
                "shDeployGithub", (
                    /.*?\/screenshot\.deployGithub.*?\n/g
                )
            ], [
                "shDeployHeroku", (
                    /.*?\/screenshot\.deployHeroku.*?\n/g
                )
            ], [
                "shReadmeEval example.js", (
                    /.*?\/screenshot\.testExampleJs.*?\n/g
                )
            ], [
                "shReadmeEval example.sh", (
                    /.*?\/screenshot\.testExampleSh.*?\n/g
                )
            ], [
                // coverage-hack
                "__zjqx1234__" + Math.random(), "__zjqx1234__" + Math.random()
            ]
        ].forEach(function ([
            condition, rgxScreenshot
        ]) {
            if (src.indexOf("    " + condition + "\n") >= 0) {
                return;
            }
            // customize test-server
            tgt = tgt.replace(
                new RegExp(
                    "\\n\\| test-server-"
                    + condition.replace("shDeploy", "").toLowerCase()
                    + " : \\|.*?\\n"
                ),
                "\n"
            );
            // customize screenshot
            tgt = tgt.replace(rgxScreenshot, "");
        });
        tgt = local.templateRenderMyApp(tgt);
        // customize toc
        toc = "\n# table of contents\n";
        tgt.replace((
            /\n\n\n#\u0020(.*)/g
        ), function (ignore, match1) {
            if (match1 === "table of contents") {
                return;
            }
            toc += "1. [" + match1 + "](#" + match1.toLowerCase().replace((
                /[^\u0020\-0-9A-Z_a-z]/g
            ), "").replace((
                /\u0020/g
            ), "-") + ")\n";
        });
        tgt = tgt.replace("\n# table of contents\n", toc);
        // eslint - no-multiple-empty-lines
        // https://github.com/eslint/eslint/blob/v7.2.0/docs/rules/no-multiple-empty-lines.md
        tgt = tgt.replace((
            /\n{4,}/g
        ), "\n\n\n");
        // write README.md
        writeFile("README.md", tgt, resolve);
    };
    buildTest = function (resolve) {
        src = fileDict["test.js"];
        // render test.js
        tgt = local.templateRenderMyApp(
            local.assetsDict["/assets.test.template.js"]
        );
        // customize shared js\u002denv code - function
        tgtReplaceConditional(true, [
            {
                merge: (
                    /\n\}\(\)\);\n\n\n\/\/\u0020run\u0020shared\u0020js\u002denv\u0020code\u0020-\u0020function\n[\S\s]*?$/
                )
            }
        ]);
        // customize require("utility2")
        Array.from([
            "assets.utility2.rollup.js",
            "lib.utility2.js"
        ]).some(function (file) {
            if (fileDict[file]) {
                tgt = tgt.replace(
                    "require(\"utility2\")",
                    "require(\"./" + file + "\")"
                );
                return true;
            }
        });
        // write test.js
        writeFile("test.js", tgt, resolve);
    };
    // buildInit
    Promise.resolve().then(function () {
        // init packageJson
        packageJson = JSON.parse(
            require("fs").readFileSync("package.json", "utf8")
        );
        // init packageNameLib
        packageNameLib = packageJson.nameLib || packageJson.name;
        fileDict = {};
        promiseList = [];
        // cleanup build-dir
        promiseList.push(new Promise(function (resolve) {
            require("child_process").spawn((
                "for DIR in .tmp/build/app/ .tmp/build/app.standalone/;"
                + "do rm -rf $DIR; mkdir -p $DIR; done"
            ), {
                shell: true,
                stdio: [
                    "ignore", 1, 2
                ]
            }).on("exit", resolve);
        }));
        // init port
        promiseList.push(new Promise(function (resolve) {
            let recurse;
            let server;
            recurse = function (err) {
                if (server) {
                    server.close();
                }
                if (!err) {
                    resolve();
                    return;
                }
                port = Number(
                    "0x" + require("crypto").randomBytes(2).toString("hex")
                ) | 0x8000;
                server = require("net").createServer().listen(port);
                server.on("error", recurse).on("listening", recurse);
            };
            recurse(true);
        }));
        // read file
        [
            "README.md",
            "lib." + packageNameLib + ".js",
            "package.json",
            "test.js"
        ].forEach(function (file) {
            promiseList.push(new Promise(function (resolve) {
                require("fs").readFile(file, "utf8", function (err, data) {
                    fileDict[file] = data;
                    resolve(err);
                });
            }));
        });
        // exists file
        [
            "assets.utility2.rollup.js",
            "lib.utility2.js"
        ].forEach(function (file) {
            promiseList.push(new Promise(function (resolve) {
                require("fs").access(file, function (notExists) {
                    fileDict[file] = !notExists;
                    resolve();
                });
            }));
        });
        return Promise.all(promiseList);
    }).then(function (errList) {
        errList.forEach(local.onErrorThrow);
        promiseList = [];
        promiseList.push(new Promise(buildReadme));
        promiseList.push(new Promise(buildLib));
        promiseList.push(new Promise(buildTest));
        return Promise.all(promiseList);
    }).then(function (errList) {
        errList.forEach(local.onErrorThrow);
        promiseList = [];
        promiseList.push(new Promise(buildAppAssets));
        promiseList.push(new Promise(buildAppStandalone));
        return Promise.all(promiseList);
    }).then(function (errList) {
        errList.forEach(local.onErrorThrow);
        onError();
    });
};

local.chromeDevtoolsClientCreate = function ({
    chromeBin,
    modeMockProcessPlatform,
    modeSilent,
    processPlatform,
    timeout
}) {
/*
 * this function with create chrome-devtools-client from <chromeBin>
 */
    let chromeCleanup;
    let chromeClient;
    let chromeProcess;
    let chromeSessionId;
    let chromeUserDataDir;
    let websocket;
    let wsReader;
    return Promise.resolve().then(function () {
    /*
     * this function will init <chromeCleanup> and <chromeClient>
     */
        let callbackDict;
        let callbackId;
        let timerTimeout;
        callbackDict = {};
        callbackId = 0;
        chromeCleanup = function () {
        /*
         * this function will
         * kill <chromeProcess>
         * rm -rf <chromeUserDataDir>
         * destroy <chromeClient>, <websocket>, <wsReader>
         */
            // cleanup timerTimeout
            clearTimeout(timerTimeout);
            // kill <chromeProcess>
            try {
                if (processPlatform === "win32") {
                    require("child_process").spawnSync("taskkill", [
                        "/pid", chromeProcess.pid, "/T", "/F"
                    ], {
                        stdio: "ignore"
                    });
                } else {
                    // kill child process tree with ".kill(-pid)" command.
                    process.kill(-chromeProcess.pid, "SIGKILL");
                }
            } catch (ignore) {}
            // rm -rf <chromeUserDataDir>
            require("fs").rmdirSync(chromeUserDataDir, {
                recursive: true
            });
            // destroy <chromeClient>, <websocket>, <wsReader>
            chromeClient.destroy();
            try {
                websocket.destroy();
            } catch (ignore) {}
            wsReader.destroy();
        };
        // init timerTimeout
        timeout = timeout || 30000;
        timerTimeout = setTimeout(function () {
            chromeCleanup();
            chromeClient.emit("error", new Error(
                "chrome-devtools - timeout " + timeout + " ms"
            ));
        }, timeout);
        function ChromeClient() {
        /*
         * this function will construct <chromeClient>
         */
            require("stream").Duplex.call(this);
        }
        require("util").inherits(ChromeClient, require("stream").Duplex);
        chromeClient = new ChromeClient();
        chromeClient.__proto__._destroy = chromeCleanup;
        chromeClient.__proto__._read = function () {
        /*
         * this function will implement stream.Duplex.prototype._read
         */
            if (websocket && websocket.readable) {
                websocket.resume();
            }
        };
        chromeClient.__proto__._write = function (payload, ignore, callback) {
        /*
         * this function will implement stream.Duplex.prototype._write
         */
            // console.error("SEND \u25ba " + payload.slice(0, 256).toString());
            let header;
            let maskKey;
            let result;
            // init header
            header = Buffer.alloc(2 + 8 + 4);
            // init fin = true
            header[0] |= 0x80;
            // init opcode = text-frame
            header[0] |= 1;
            // init mask = true
            header[1] |= 0x80;
            // init payload.length
            if (payload.length < 126) {
                header = header.slice(0, 2 + 0 + 4);
                header[1] |= payload.length;
            // } else if (payload.length < 65536) {
            } else {
                local.assertOrThrow(
                    payload.length < 65536,
                    "chrome-devtools - "
                    + "payload-length must be less than 65536 bytes, not "
                    + payload.length
                );
                header = header.slice(0, 2 + 2 + 4);
                header[1] |= 126;
                header.writeUInt16BE(payload.length, 2);
            /*
            } else {
                header[1] |= 127;
                header.writeUInt32BE(payload.length, 6);
            */
            }
            // init maskKey
            maskKey = require("crypto").randomBytes(4);
            maskKey.copy(header, header.length - 4);
            // send header
            websocket.cork();
            websocket.write(header);
            // send payload ^ maskKey
            payload.forEach(function (ignore, ii) {
                payload[ii] ^= maskKey[ii & 3];
            });
            // return write-result
            result = websocket.write(payload, callback);
            websocket.uncork();
            return result;
        };
        chromeClient.evaluate = function (expression) {
            return chromeClient.rpc("Runtime.evaluate", {
                awaitPromise: true,
                expression,
                returnByValue: false,
                userGesture: true
            }).then(function ({
                exceptionDetails,
                result
            }) {
                local.assertOrThrow(
                    !exceptionDetails,
                    "chrome-devtools - " + JSON.stringify(exceptionDetails)
                );
                return result.value;
            });
        };
        chromeClient.on("data", function (payload) {
        /*
         * this function will handle callback for <payload>
         * received from chrome-browser using chrome-devtools-protocol
         */
            // console.error("\u25c0 RECV " + payload.slice(0, 256).toString());
            let callback;
            let {
                method,
                id,
                error,
                params,
                result
            } = JSON.parse(payload);
            local.assertOrThrow(!method || (
                /^[A-Z]\w*?\.[a-z]\w*?$/
            ).test(method), new Error(
                "chrome-devtools - invalid method " + method
            ));
            // init callback
            callback = callbackDict[id];
            delete callbackDict[id];
            // callback.resolve
            if (callback) {
                // preserve stack-trace
                callback.err.message = "chrome-devtools - "
                + JSON.stringify(error);
                local.assertOrThrow(!error, callback.err);
                callback.resolve(result);
                return;
            }
            local.assertOrThrow(!error, "chrome-devtools - " + error);
            chromeClient.emit(method, params);
        });
        chromeClient.navigate = function ({
            url
        }) {
        /*
         * this function will navigate to webpage <url>
         */
            let chromeFrameId;
            console.error("chrome-devtools - Page.navigate " + url);
            chromeClient.rpc("Page.navigate", {
                url
            });
            // wait for page to load
            chromeClient.rpc("Page.getFrameTree").then(function ({
                frameTree
            }) {
                chromeFrameId = frameTree.frame.id;
            });
            return new Promise(function (resolve) {
                chromeClient.on("Page.lifecycleEvent", function onLoad({
                    frameId,
                    name
                }) {
                    if (frameId === chromeFrameId && name === "load") {
                        chromeClient.removeListener(
                            "Page.lifecycleEvent",
                            onLoad
                        );
                        resolve();
                    }
                });
            });
        };
        chromeClient.rpc = function (method, params) {
        /*
         * this function will message-pass
         * JSON.stringify({
         *     id: <callbackId>,
         *     method: <method>,
         *     params: <params>,
         *     sessionId: <chromeSessionId>
         * })
         * to chrome-browser using chrome-devtools-protocol
         */
            callbackId = (callbackId % 256) + 1;
            chromeClient.write(Buffer.from(JSON.stringify({
                id: callbackId,
                method,
                params,
                sessionId: chromeSessionId
            })));
            return new Promise(function (resolve) {
                callbackDict[callbackId] = {
                    err: new Error(),
                    method,
                    resolve
                };
            });
        };
        chromeClient.screenshot = function ({
            delay,
            file
        }) {
        /*
         * this function will screenshot browser to <file> given <delay> ms
         */
            local.assertOrThrow(file, "chrome-devtools - file required");
            return new Promise(function (resolve) {
                setTimeout(function () {
                    chromeClient.rpc("Page.captureScreenshot", {
                        format: "png"
                    }).then(function ({
                        data
                    }) {
                        require("fs").writeFile((
                            file
                        ), Buffer.from(data, "base64"), function (err) {
                            local.onErrorThrow(err);
                            console.error(
                                "chrome-devtools - Page.captureScreenshot "
                                + file
                            );
                            resolve();
                        });
                    });
                }, delay);
            });
        };
    }).then(function () {
    /*
     * this function will init <wsReader>
     * that can read websocket-frames from <websocket>
     */
        let WS_READ_HEADER;
        let WS_READ_LENGTH16;
        let WS_READ_LENGTH63;
        let WS_READ_PAYLOAD;
        let wsBufList;
        let wsPayloadLength;
        let wsReadState;
        WS_READ_HEADER = 0;
        WS_READ_LENGTH16 = 1;
        WS_READ_LENGTH63 = 2;
        WS_READ_PAYLOAD = 3;
        wsBufList = [];
        wsPayloadLength = 0;
        wsReadState = WS_READ_HEADER;
/*
https://tools.ietf.org/html/draft-ietf-hybi-thewebsocketprotocol-13#section-5.2
+---------------------------------------------------------------+
|0               1               2               3              |
|0 1 2 3 4 5 6 7 8 9 a b c d e f 0 1 2 3 4 5 6 7 8 9 a b c d e f|
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |             (16/63)           |
|N|V|V|V|       |S|             |   (if payload len==126/127)   |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
|     Extended payload length continued, if payload len == 127  |
+ - - - - - - - - - - - - - - - +-------------------------------+
|                               |Masking-key, if MASK set to 1  |
+-------------------------------+-------------------------------+
| Masking-key (continued)       |          Payload Data         |
+-------------------------------- - - - - - - - - - - - - - - - +
:                     Payload Data continued ...                :
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
|                     Payload Data continued ...                |
+---------------------------------------------------------------+
FIN: 1 bit
    Indicates that this is the final fragment in a message.  The first
    fragment MAY also be the final fragment.
RSV1, RSV2, RSV3: 1 bit each
    MUST be 0 unless an extension is negotiated which defines meanings
    for non-zero values.  If a nonzero value is received and none of
    the negotiated extensions defines the meaning of such a nonzero
    value, the receiving endpoint MUST _Fail the WebSocket
    Connection_.
Opcode: 4 bits
    Defines the interpretation of the payload data.  If an unknown
    opcode is received, the receiving endpoint MUST _Fail the
    WebSocket Connection_.  The following values are defined.
    *  %x0 denotes a continuation frame
    *  %x1 denotes a text frame
    *  %x2 denotes a binary frame
    *  %x3-7 are reserved for further non-control frames
    *  %x8 denotes a connection close
    *  %x9 denotes a ping
    *  %xA denotes a pong
    *  %xB-F are reserved for further control frames
Mask: 1 bit
    Defines whether the payload data is masked.  If set to 1, a
    masking key is present in masking-key, and this is used to unmask
    the payload data as per Section 5.3.  All frames sent from client
    to server have this bit set to 1.
Payload length: 7 bits, 7+16 bits, or 7+64 bits
    The length of the payload data, in bytes: if 0-125, that is the
    payload length.  If 126, the following 2 bytes interpreted as a 16
    bit unsigned integer are the payload length.  If 127, the
    following 8 bytes interpreted as a 64-bit unsigned integer (the
    most significant bit MUST be 0) are the payload length.  Multibyte
    length quantities are expressed in network byte order.  The
    payload length is the length of the extension data + the length of
    the application data.  The length of the extension data may be
    zero, in which case the payload length is the length of the
    application data.
Masking-key: 0 or 4 bytes
    All frames sent from the client to the server are masked by a 32-
    bit value that is contained within the frame.  This field is
    present if the mask bit is set to 1, and is absent if the mask bit
    is set to 0.  See Section 5.3 for further information on client-
    to-server masking.
Payload data: (x+y) bytes
    The payload data is defined as extension data concatenated with
    application data.
Extension data: x bytes
    The extension data is 0 bytes unless an extension has been
    negotiated.  Any extension MUST specify the length of the
    extension data, or how that length may be calculated, and how the
    extension use MUST be negotiated during the opening handshake.  If
    present, the extension data is included in the total payload
    length.
Application data: y bytes
    Arbitrary application data, taking up the remainder of the frame
    after any extension data.  The length of the application data is
    equal to the payload length minus the length of the extension
    data.
*/
        function wsBufListRead(nn) {
        /*
         * this function will read <nn> bytes from <wsBufList>
         */
            let buf;
            wsBufList = (
                wsBufList.length === 1
                ? wsBufList[0]
                : Buffer.concat(wsBufList)
            );
            buf = wsBufList.slice(0, nn);
            wsBufList = [
                wsBufList.slice(nn)
            ];
            return buf;
        }
        function wsFrameRead() {
        /*
         * this function will read websocket-data-frame
         */
            let buf;
            let opcode;
            if (wsBufList.reduce(function (aa, bb) {
                return aa + bb.length;
            }, 0) < (
                wsReadState === WS_READ_PAYLOAD
                ? Math.max(wsPayloadLength, 1)
                : wsReadState === WS_READ_LENGTH63
                ? 8
                : 2
            )) {
                return;
            }
            switch (wsReadState) {
            // read frame-header
            case WS_READ_HEADER:
                buf = wsBufListRead(2);
                // validate opcode
                opcode = buf[0] & 0x0f;
                local.assertOrThrow(
                    opcode === 0x01,
                    "chrome-devtools - opcode must be 0x01, not 0x0"
                    + opcode.toString(16)
                );
                wsPayloadLength = buf[1] & 0x7f;
                wsReadState = (
                    wsPayloadLength === 126
                    ? WS_READ_LENGTH16
                    : wsPayloadLength === 127
                    ? WS_READ_LENGTH63
                    : WS_READ_PAYLOAD
                );
                break;
            // read frame-payload-length-16
            case WS_READ_LENGTH16:
                wsPayloadLength = wsBufListRead(2).readUInt16BE(0);
                wsReadState = WS_READ_PAYLOAD;
                break;
            // read frame-payload-length-63
            case WS_READ_LENGTH63:
                buf = wsBufListRead(8);
                wsPayloadLength = (
                    buf.readUInt32BE(0) * 0x100000000 + buf.readUInt32BE(4)
                );
                wsReadState = WS_READ_PAYLOAD;
                break;
            // read frame-payload-data
            case WS_READ_PAYLOAD:
                local.assertOrThrow(
                    0 <= wsPayloadLength && wsPayloadLength <= 10000000,
                    "chrome-devtools - "
                    + "payload-length must be between 0 and 256 MiB, not "
                    + wsPayloadLength
                );
                buf = wsBufListRead(wsPayloadLength);
                wsReadState = WS_READ_HEADER;
                chromeClient.push(buf);
                break;
            }
            return true;
        }
        function WsReader() {
        /*
         * this function will construct <wsReader>
         */
            require("stream").Transform.call(this);
        }
        require("util").inherits(WsReader, require("stream").Transform);
        wsReader = new WsReader();
        wsReader.__proto__._transform = function (chunk, ignore, callback) {
        /*
         * this function will implement Transform.prototype._transform
         */
            wsBufList.push(chunk);
            while (true) {
                if (!wsFrameRead()) {
                    break;
                }
            }
            callback();
        };
    }).then(function () {
    /*
     * this function will init <chromeProcess>
     */
        processPlatform = processPlatform || process.platform;
        chromeUserDataDir = require("fs").mkdtempSync(require("path").join(
            require("os").tmpdir(),
            "puppeteer_dev_profile-"
        ));
        chromeBin = chromeBin || (
            processPlatform === "darwin"
            ? "/Applications/Google Chrome.app/Contents/MacOS/"
            + "Google Chrome"
            : processPlatform === "win32"
            ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\"
            + "chrome.exe"
            : "/usr/bin/google-chrome-stable"
        );
        console.error("chrome-devtools - spawn " + chromeBin);
        chromeProcess = require("child_process").spawn((
            chromeBin
        ), [
            "--headless",
            "--incognito",
            (
                processPlatform === "linux"
                ? "--no-sandbox"
                : ""
            ),
            "--remote-debugging-port=0",
            "--user-data-dir=" + chromeUserDataDir
        ], {
            // On non-windows platforms, `detached: false` makes child process
            // a leader of a new process group, making it possible to kill
            // child process tree with `.kill(-pid)` command.
            // https://nodejs.org/api/child_process.html#child_process_options_detached
            detached: process.platform !== "win32",
            stdio: [
                "ignore", (
                    !modeSilent
                    ? 1
                    : "ignore"
                ), "pipe"
            ]
        });
        if (!modeSilent) {
            chromeProcess.on("error", local.noop);
            chromeProcess.stderr.pipe(process.stderr, {
                end: false
            });
        }
        process.on("exit", chromeCleanup);
        process.on("SIGINT", chromeCleanup);
        process.on("SIGTERM", chromeCleanup);
        process.on("SIGHUP", chromeCleanup);
        return new Promise(function (resolve, reject) {
            let stderr;
            // coverage-hack
            if (modeMockProcessPlatform) {
                chromeCleanup();
                reject();
                return;
            }
            stderr = "";
            chromeProcess.stderr.on("data", function onData(chunk) {
                local.assertOrThrow(
                    stderr.length < 65536,
                    "chrome-devtools - cannot connect to chrome"
                );
                stderr += chunk;
                stderr.replace((
                    /^DevTools\u0020listening\u0020on\u0020(ws:\/\/.*)$/m
                ), function (ignore, url) {
                    chromeProcess.stderr.removeListener("data", onData);
                    resolve(url);
                    return "";
                });
            });
        });
    }).then(function (websocketUrl) {
    /*
     * this function will init <websocket>
     */
        let secWebsocketKey;
        console.error(
            "chrome-devtools - connect websocket " + websocketUrl
        );
        secWebsocketKey = require("crypto").randomBytes(16).toString("base64");
        return new Promise(function (resolve) {
            require("http").get(Object.assign(require("url").parse(
                websocketUrl
            ), {
                "createConnection": function (opt) {
                    opt.path = opt.socketPath;
                    return require("net").connect(opt);
                },
                "headers": {
                    "Connection": "Upgrade",
                    "Sec-WebSocket-Key": secWebsocketKey,
                    "Sec-WebSocket-Version": 13,
                    "Upgrade": "websocket"
                },
                "protocol": "http:",
                "protocolVersion": 13
            })).once("upgrade", function (res, _websocket, head) {
                local.assertOrThrow(
                    (
                        res.headers["sec-websocket-accept"]
                        === require("crypto").createHash("sha1").update(
                            secWebsocketKey
                            + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
                        ).digest("base64")
                    ),
                    "chrome-devtools - invalid sec-websocket-accept header"
                );
                websocket = _websocket;
                websocket.unshift(head);
                // websocket - disable timeout
                websocket.setTimeout(0);
                // websocket - disable nagle's algorithm
                websocket.setNoDelay();
                websocket.on("end", websocket.end.bind(websocket));
                // pipe websocket to wsReader
                websocket.pipe(wsReader);
                resolve();
            });
        });
    }).then(function () {
    /*
     * this function will init <chromeSessionId>
     */
        console.error("chrome-devtools - Target.createTarget about:blank");
        return chromeClient.rpc("Target.createTarget", {
            url: "about:blank"
        }).then(function (data) {
            return chromeClient.rpc("Target.attachToTarget", {
                targetId: data.targetId,
                flatten: true
            });
        }).then(function ({
            sessionId
        }) {
            chromeSessionId = sessionId;
        });
    }).then(function () {
    /*
     * this function will navigate chrome to <url>
     */
        // init screensize
        chromeClient.rpc("Emulation.setDeviceMetricsOverride", {
            deviceScaleFactor: 1,
            height: 600,
            mobile: false,
            screenOrientation: {
                angle: 0,
                type: "portraitPrimary"
            },
            width: 800
        });
        // init page
        chromeClient.rpc("Page.enable", undefined);
        chromeClient.rpc("Page.setLifecycleEventsEnabled", {
            enabled: true
        });
        chromeClient.rpc("Performance.enable", undefined);
    }).then(function () {
    /*
     * this function will resolve <chromeClient>
     */
        return chromeClient;
    });
};

local.cliRun = function ({
    rgxComment
}) {
/*
 * this function will run cli
 */
    let cliDict;
    cliDict = local.cliDict;
    cliDict._eval = cliDict._eval || function () {
    /*
     * <code>
     * will eval <code>
     */
        globalThis.local = local;
        require("vm").runInThisContext(process.argv[3]);
    };
    cliDict._help = cliDict._help || function () {
    /*
     *
     * will print help
     */
        let commandList;
        let file;
        let packageJson;
        let str;
        let strDict;
        commandList = [
            {
                argList: "<arg2>  ...",
                description: "usage:",
                command: [
                    "<arg1>"
                ]
            }, {
                argList: "'console.log(\"hello world\")'",
                description: "example:",
                command: [
                    "--eval"
                ]
            }
        ];
        file = __filename.replace((
            /.*\//
        ), "");
        packageJson = require("./package.json");
        // validate comment
        rgxComment = rgxComment || (
            /\)\u0020\{\n(?:|\u0020{4})\/\*\n(?:\u0020|\u0020{5})\*((?:\u0020<[^>]*?>|\u0020\.\.\.)*?)\n(?:\u0020|\u0020{5})\*\u0020(will\u0020.*?\S)\n(?:\u0020|\u0020{5})\*\/\n(?:\u0020{4}|\u0020{8})\S/
        );
        strDict = {};
        Object.keys(cliDict).sort().forEach(function (key, ii) {
            if (key[0] === "_" && key !== "_default") {
                return;
            }
            str = String(cliDict[key]);
            if (key === "_default") {
                key = "";
            }
            strDict[str] = strDict[str] || (ii + 2);
            ii = strDict[str];
            if (commandList[ii]) {
                commandList[ii].command.push(key);
                return;
            }
            commandList[ii] = rgxComment.exec(str);
            local.assertOrThrow(commandList[ii], (
                "cliRun - cannot parse comment in COMMAND "
                + key
                + ":\nnew RegExp("
                + JSON.stringify(rgxComment.source)
                + ").exec(" + JSON.stringify(str).replace((
                    /\\\\/g
                ), "\u0000").replace((
                    /\\n/g
                ), "\\n\\\n").replace((
                    /\u0000/g
                ), "\\\\") + ");"
            ));
            commandList[ii] = {
                argList: local.coalesce(commandList[ii][1], "").trim(),
                command: [
                    key
                ],
                description: commandList[ii][2]
            };
        });
        str = "";
        str += packageJson.name + " (" + packageJson.version + ")\n\n";
        str += commandList.filter(function (elem) {
            return elem;
        }).map(function (elem, ii) {
            elem.command = elem.command.filter(function (elem) {
                return elem;
            });
            switch (ii) {
            case 0:
            case 1:
                elem.argList = [
                    elem.argList
                ];
                break;
            default:
                elem.argList = elem.argList.split(" ");
                elem.description = (
                    "# COMMAND "
                    + (elem.command[0] || "<none>") + "\n# "
                    + elem.description
                );
            }
            return (
                elem.description + "\n  " + file
                + "  " + elem.command.sort().join("|") + "  "
                + elem.argList.join("  ")
            );
        }).join("\n\n");
        console.log(str);
    };
    cliDict["--eval"] = cliDict["--eval"] || cliDict._eval;
    cliDict["--help"] = cliDict["--help"] || cliDict._help;
    cliDict["-e"] = cliDict["-e"] || cliDict._eval;
    cliDict["-h"] = cliDict["-h"] || cliDict._help;
    cliDict._default = cliDict._default || cliDict._help;
    cliDict.help = cliDict.help || cliDict._help;
    cliDict._interactive = cliDict._interactive || function () {
    /*
     *
     * will start interactive-mode
     */
        globalThis.local = local;
        local.identity(local.replStart || require("repl").start)({
            useGlobal: true
        });
    };
    cliDict["--interactive"] = cliDict["--interactive"] || cliDict._interactive;
    cliDict["-i"] = cliDict["-i"] || cliDict._interactive;
    cliDict._version = cliDict._version || function () {
    /*
     *
     * will print version
     */
        console.log(require(__dirname + "/package.json").version);
    };
    cliDict["--version"] = cliDict["--version"] || cliDict._version;
    cliDict["-v"] = cliDict["-v"] || cliDict._version;
    // default to --help command if no arguments are given
    if (process.argv.length <= 2) {
        cliDict._help();
        return;
    }
    if (cliDict[process.argv[2]]) {
        cliDict[process.argv[2]]();
        return;
    }
    cliDict._default();
};

local.corsForwardProxyHostIfNeeded = function (xhr) {
/*
 * this function will return xhr.corsForwardProxyHost, if needed
 */
    return (
        local.isBrowser
        && local.env.npm_package_nameLib
        && (
            /^https?:\/\//
        ).test(xhr.url)
        && xhr.url.indexOf(xhr.location.protocol + "//" + xhr.location.host)
        !== 0
        && (
            /\.github\.io$/
        ).test(xhr.location.host)
        && xhr.corsForwardProxyHost !== "disabled"
        && (xhr.corsForwardProxyHost || "https://h1-proxy1.herokuapp.com")
    );
};

local.domQuerySelectorAllTagName = function (selector) {
/*
 * this function will return list of tagName matching <selector>
 */
    let set;
    try {
        document.getElementById("undefined");
    } catch (ignore) {
        return [];
    }
    set = new Set();
    document.querySelectorAll(selector).forEach(function (elem) {
        set.add(elem.tagName);
    });
    return Array.from(set).sort();
};

local.domStyleValidate = function () {
/*
 * this function will validate <style> tags
 */
    let rgx;
    let tmp;
    try {
        document.getElementById("undefined");
    } catch (ignore) {
        return;
    }
    rgx = (
        /^0\u0020(?:(body\u0020>\u0020)?(?:\.testReportDiv\u0020.+|\.x-istanbul\u0020.+|\.button|\.colorError|\.readonly|\.textarea|\.uiAnimateSlide|a|body|code|div|input|pre|textarea)(?:,|\u0020\{))|^[1-9]\d*?\u0020#/m
    );
    tmp = [];
    Array.from(
        document.querySelectorAll("style")
    ).map(function (elem, ii) {
        elem.innerHTML.replace((
            /\/\*[\S\s]*?\*\/|;|\}/g
        ), "\n").replace((
            /^([^\n\u0020@].*?)[,{:].*?$/gm
        ), function (match0, match1) {
            try {
                ii = document.querySelectorAll(match1).length;
            } catch (errCaught) {
                console.error(errCaught);
            }
            if (!(ii > 1)) {
                tmp.push(ii + " " + match0);
            }
        });
    });
    tmp.filter(function (elem) {
        return !rgx.test(elem);
    }).sort().reverse().forEach(function (elem, ii, list) {
        console.error(
            "domStyleValidateUnmatched " + (list.length - ii) + ". " + elem
        );
    });
};

local.eventListenerAdd = function (type, listener, opt = {}) {
/*
 * this function will listen evt <type> with <listener>
 */
    localEventListenerId = (localEventListenerId + 1) | 0;
    localEventListenerDict[localEventListenerId] = {
        listener,
        once: opt.once,
        type
    };
};

local.eventListenerEmit = function (type, msg) {
/*
 * this function will emit evt <type> with <msg>
 */
    Object.entries(localEventListenerDict).forEach(function ([
        id, elem
    ]) {
        if (elem.type === type) {
            if (elem.once) {
                delete localEventListenerDict[id];
            }
            elem.listener(msg);
        }
    });
};

local.eventListenerRemove = function (listener) {
/*
 * this function will emit evt <type> with <msg>
 */
    Object.entries(localEventListenerDict).forEach(function ([
        id, elem
    ]) {
        if (elem.listener === listener) {
            delete localEventListenerDict[id];
        }
    });
};

local.fsReadFileOrDefaultSync = function (pathname, type, dflt) {
/*
 * this function will sync-read <pathname> with given <type> and <dflt>
 */
    let fs;
    // do nothing if module not exists
    try {
        fs = require("fs");
        pathname = require("path").resolve(pathname);
    } catch (ignore) {
        return dflt;
    }
    // try to read pathname
    try {
        return (
            type === "json"
            ? JSON.parse(fs.readFileSync(pathname, "utf8"))
            : fs.readFileSync(pathname, type)
        );
    } catch (ignore) {
        return dflt;
    }
};

local.fsWriteFileWithMkdirp = function (pathname, data, onError) {
/*
 * this function will async write <data> to <pathname> with "mkdir -p"
 */
    let fs;
    // do nothing if module not exists
    try {
        fs = require("fs");
        pathname = require("path").resolve(pathname);
    } catch (ignore) {
        onError();
    }
    // write pathname
    fs.writeFile(pathname, data, function (err) {
        if (!err) {
            console.error("fsWriteFileWithMkdirp - " + pathname);
            onError(undefined, true);
            return;
        }
        // mkdir -p
        fs.mkdir(require("path").dirname(pathname), {
            recursive: true
        }, function (ignore) {
            // re-write pathname
            fs.writeFile(pathname, data, function (err) {
                if (err) {
                    throw err;
                }
                console.error("fsWriteFileWithMkdirp - " + pathname);
                onError(undefined, true);
            });
        });
    });
};

local.fsWriteFileWithMkdirpSync = function (pathname, data) {
/*
 * this function will sync write <data> to <pathname> with "mkdir -p"
 */
    let fs;
    // do nothing if module not exists
    try {
        fs = require("fs");
        pathname = require("path").resolve(pathname);
    } catch (ignore) {
        return;
    }
    // try to write pathname
    try {
        fs.writeFileSync(pathname, data);
    } catch (ignore) {
        // mkdir -p
        fs.mkdirSync(require("path").dirname(pathname), {
            recursive: true
        });
        // re-write pathname
        fs.writeFileSync(pathname, data);
    }
    console.error("fsWriteFileWithMkdirpSync - " + pathname);
    return true;
};

local.jslintAutofixLocalFunction = function (code, file) {
/*
 * this function will jslint-autofix local-function
 */
    let code2;
    let dictFnc;
    let dictProp;
    function stringMerge(str1, str2, rgx) {
    /*
     * this function will merge <str2> into <str1>,
     * for sections where both match <rgx> with no magic
     */
        str2.replace(rgx, function (match2) {
            str1.replace(rgx, function (match1) {
                str1 = str1.replace(match1, function () {
                    return match2;
                });
                return "";
            });
            return "";
        });
        return str1;
    }
    if (local.isBrowser) {
        return code;
    }
    // make file relative
    file = require("path").resolve(file);
    if (file.indexOf(process.cwd() + require("path").sep) === 0) {
        file = file.replace(process.cwd() + require("path").sep, "");
    }
    switch (file) {
    case "README.md":
    case "lib." + process.env.npm_package_nameLib + ".js":
    case "lib." + process.env.npm_package_nameLib + ".sh":
    case "lib.apidoc.js":
    case "lib.istanbul.js":
    case "lib.jslint.js":
    case "lib.marked.js":
    case "npm_scripts.sh":
    case "test.js":
        break;
    default:
        return code;
    }
    // autofix - assets.utility2.header.js
    code = code.replace((
        /\n\/\/\u0020assets.utility2\.header\.js\u0020-\u0020start\n[\S\s]*?\n\/\/\u0020assets.utility2\.header\.js\u0020-\u0020end\n/
    ), "\n" + local.assetsDict["/assets.utility2.header.js"]);
    // autofix - assets.my_app.template.js
    code = stringMerge(
        code,
        local.assetsDict["/assets.my_app.template.js"].replace((
            /my_app/g
        ), file.split(".")[1]),
        file !== "README.md" && local.identity(
            /\n\/\*\u0020istanbul\u0020instrument\u0020in\u0020package\u0020[\S\s]*?\n\/\*\u0020validateLineSortedReset\u0020\*\/\n/
        )
    );
    // customize local for assets.utility2.rollup.js
    if (
        file === "lib." + process.env.npm_package_nameLib + ".js"
        && require("fs").existsSync("./assets.utility2.rollup.js")
    ) {
        code = code.replace(
            "    // || globalThis.utility2_rollup_old",
            "    || globalThis.utility2_rollup_old"
        ).replace(
            "    // || require(\"./assets.utility2.rollup.js\")",
            "    || require(\"./assets.utility2.rollup.js\")"
        );
    }
    // init functionAllDict and functionBaseDict
    [
        [
            "utility2"
        ], [
            "utility2", "apidoc"
        ]
    ].forEach(function (dictList, ii) {
        dictFnc = (
            ii
            ? "functionAllDict"
            : "functionBaseDict"
        );
        if (local[dictFnc]) {
            return;
        }
        local[dictFnc] = {};
        dictList.forEach(function (dict) {
            dict = local[dict];
            Object.keys(dict).forEach(function (key) {
                if (
                    !(
                        /^[A-Z_]|^testCase_/m
                    ).test(key)
                    && typeof dict[key] === "function"
                ) {
                    local[dictFnc][key] = (
                        local[dictFnc][key] || String(dict[key])
                    );
                }
            });
        });
        Object.keys(local[dictFnc]).forEach(function (key) {
            if (process.binding("natives")[key]) {
                local[dictFnc][key] = undefined;
            }
        });
    });
    // autofix - local-function
    dictFnc = {};
    dictProp = {};
    code = code.replace((
        /^local\.(.*?)\u0020=\u0020(function\u0020\([\S\s]*?\n\});\n+/gm
    ), function (match0, key, match2, match3) {
        // local-function - duplicate
        if (dictFnc[key]) {
            return "";
        }
        // local-function - normalize
        dictFnc[key] = true;
        match3 = local.functionAllDict[key] || "";
        // make shell-safe
        // https://unix.stackexchange.com/questions/57794/shell-escape-characters-for-sh-c
        if (file.slice(-3) === ".sh") {
            match3 = match3.replace((
                /'/g
            ), "'\"'\"'");
        }
        if (match3 && match3 !== match2) {
            match0 = match0.replace(match2, match3.replace((
                /\$\$|\$/g
            ), "$$$$"));
        }
        return match0.trimEnd() + "\n\n";
    });
    // comment
    code2 = code;
    code2 = code2.replace((
        /^\u0020*?\/\*[\S\s]*?\*\/|^\u0020*?(?:\/\/.*?|.*?\\)$/gm
    ), "");
    // local-function - update dictFnc and dictProp
    code2.replace((
        /\blocal\.(\w+?\b)(?:\u0020(===|=|\|\|)(?:\u0020"function"\u0020&&\u0020local\.\w|\u0020|$))?/gm
    ), function (ignore, match1, match2) {
        switch (match2) {
        case "=":
            dictFnc[match1] = true;
            break;
        case "===":
        case "||":
            dictProp[match1] = false;
            break;
        default:
            dictProp[match1] = true;
        }
    });
    [
        dictFnc, dictProp
    ].forEach(function (dict) {
        Object.keys(dict).forEach(function (key) {
            dict[key] = dict[key] && local.functionBaseDict[key];
        });
    });
    dictFnc = JSON.parse(JSON.stringify(dictFnc));
    dictProp = JSON.parse(JSON.stringify(dictProp));
    [
        "assertJsonEqual",
        "assertOrThrow",
        "coalesce",
        "identity",
        "noop",
        "objectAssignDefault",
        "objectDeepCopyWithKeysSorted",
        "onErrorThrow"
    ].forEach(function (key) {
        dictFnc[key] = true;
        dictProp[key] = true;
    });
    // local-function - missing
    switch (require("fs").existsSync("assets.utility2.rollup.js") || file) {
    case "README.md":
    case "lib.utility2.js":
    case "test.js":
    case true:
        break;
    default:
        Object.keys(dictProp).forEach(function (key) {
            if (dictProp[key] && !dictFnc[key]) {
                console.error(
                    "local-function - missing (" + file + ") local." + key
                );
            }
        });
    }
    // local-function - unused
    switch (file) {
    case "lib.utility2.js":
    case "lib.utility2.sh":
        break;
    default:
        Object.keys(dictFnc).forEach(function (key) {
            if (!dictProp.hasOwnProperty(key)) {
                console.error(
                    "local-function - unused (" + file + ") local." + key
                );
            }
        });
    }
    return code;
};

local.listShuffle = function (list) {
/*
 * this function will inplace shuffle <list> using fisher-yates algorithm
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
    let ii;
    let random;
    let swap;
    ii = list.length;
    while (ii > 1) {
        ii -= 1;
        random = Math.floor(Math.random() * (ii + 1));
        swap = list[ii];
        list[ii] = list[random];
        list[random] = swap;
    }
    return list;
};

local.middlewareAssetsCached = function (req, res, next) {
/*
 * this function will run middleware to serve cached-assets
 */
    if (!local.assetsDict.hasOwnProperty(req.urlParsed.pathname)) {
        next();
        return;
    }
    // do not cache if headers already sent or url has '?' search indicator
    if (!(res.headersSent || req.url.indexOf("?") >= 0)) {
        // init serverResponseHeaderLastModified
        local.serverResponseHeaderLastModified = (
            local.serverResponseHeaderLastModified
            // resolve to 1000 ms
            || new Date()
        );
        // respond with 304 If-Modified-Since serverResponseHeaderLastModified
        if (
            new Date(req.headers["if-modified-since"])
            >= local.serverResponseHeaderLastModified
        ) {
            res.statusCode = 304;
            res.end();
            return;
        }
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader(
            "Last-Modified",
            local.serverResponseHeaderLastModified.toUTCString()
        );
    }
    res.end(local.assetsDict[req.urlParsed.pathname]);
};

local.middlewareError = function (err, req, res) {
/*
 * this function will run middleware to handle <err>
 */
    // default - 404 Not Found
    if (!err) {
        local.serverRespondDefault(req, res, 404);
        return;
    }
    // statusCode [400, 600)
    local.serverRespondDefault(req, res, (
        (err.statusCode >= 400 && err.statusCode < 600)
        ? err.statusCode
        : 500
    ), err);
};

local.middlewareFileServer = function (req, res, next) {
/*
 * this function will run middleware to serve files
 */
    let file;
    if (req.method !== "GET" || local.isBrowser) {
        next();
        return;
    }
    // resolve file
    file = require("path").resolve(
        // replace trailing "/" with "/index.html"
        require("url").parse(req.url).pathname.slice(1).replace((
            /\/$/
        ), "/index.html")
    );
    // security - disable parent-directory lookup
    if (file.indexOf(process.cwd() + require("path").sep) !== 0) {
        next();
        return;
    }
    require("fs").readFile(file, function (err, data) {
        // default to next
        if (err) {
            next();
            return;
        }
        // respond with data
        res.end(data);
    });
};

local.middlewareInit = function (req, res, next) {
/*
 * this function will run middleware to init <req> and <res>
 */
    let contentType;
    // init timerTimeout
    local.serverRespondTimeoutDefault(req, res, local.timeoutDefault);
    // init req.urlParsed
    req.urlParsed = local.urlParse(req.url);
    // set reponse-header "content-type"
    contentType = {
        // application
        ".js": "application/javascript; charset=utf-8",
        ".json": "application/json; charset=utf-8",
        ".mjs": "application/javascript; charset=utf-8",
        ".pdf": "application/pdf",
        ".wasm": "application/wasm",
        ".xml": "application/xml; charset=utf-8",
        // image
        ".bmp": "image/bmp",
        ".gif": "image/gif",
        ".jpe": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".jpg": "image/jpeg",
        ".png": "image/png",
        ".svg": "image/svg+xml; charset=utf-8",
        // text
        "/": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".htm": "text/html; charset=utf-8",
        ".html": "text/html; charset=utf-8",
        ".md": "text/markdown; charset=utf-8",
        ".txt": "text/plain; charset=utf-8"
    };
    contentType = contentType[(
        /^\/$|\.[^.]*?$|$/m
    ).exec(req.urlParsed.pathname)[0]];
    if (contentType) {
        res.setHeader("content-type", contentType);
    }
    // default to next
    next();
};

local.onParallel = function (onError, onEach, onRetry) {
/*
 * this function will create function that will
 * 1. run async tasks in parallel
 * 2. if cnt === 0 or err occurred, then call onError(err)
 */
    let onParallel;
    onEach = onEach || local.noop;
    onRetry = onRetry || local.noop;
    onParallel = function (err, data) {
        if (onRetry(err, data)) {
            return;
        }
        // decrement cnt
        onParallel.cnt -= 1;
        // validate cnt
        if (!(onParallel.cnt >= 0 || err || onParallel.err)) {
            err = new Error(
                "invalid onParallel.cnt = " + onParallel.cnt
            );
        // ensure onError is run only once
        } else if (onParallel.cnt < 0) {
            return;
        }
        // handle err
        if (err) {
            onParallel.err = err;
            // ensure cnt <= 0
            onParallel.cnt = -Math.abs(onParallel.cnt);
        }
        // call onError when isDone
        if (onParallel.cnt <= 0) {
            onError(err, data);
            return;
        }
        onEach();
    };
    // init cnt
    onParallel.cnt = 0;
    // return callback
    return onParallel;
};

local.onParallelList = function (opt, onEach, onError) {
/*
 * this function will
 * 1. async-run onEach in parallel,
 *    with given <opt>.rateLimit and <opt>.retryLimit
 * 2. call <onError> when onParallel.ii + 1 === <opt>.list.length
 */
    let isListEnd;
    let onEach2;
    let onParallel;
    opt.list = opt.list || [];
    onEach2 = function () {
        while (true) {
            if (!(onParallel.ii + 1 < opt.list.length)) {
                isListEnd = true;
                return;
            }
            if (!(onParallel.cnt < opt.rateLimit + 1)) {
                return;
            }
            onParallel.ii += 1;
            onEach({
                elem: opt.list[onParallel.ii],
                ii: onParallel.ii,
                list: opt.list,
                retry: 0
            }, onParallel);
        }
    };
    onParallel = local.onParallel(onError, onEach2, function (err, data) {
        if (err && data && data.retry < opt.retryLimit) {
            console.error(err);
            data.retry += 1;
            setTimeout(function () {
                onParallel.cnt -= 1;
                onEach(data, onParallel);
            }, 1000);
            return true;
        }
        // restart if opt.list has grown
        if (isListEnd && (onParallel.ii + 1 < opt.list.length)) {
            isListEnd = undefined;
            onEach2();
        }
    });
    onParallel.ii = -1;
    opt.rateLimit = Number(opt.rateLimit) || 6;
    opt.rateLimit = Math.max(opt.rateLimit, 1);
    opt.retryLimit = Number(opt.retryLimit) || 2;
    onParallel.cnt += 1;
    onEach2();
    onParallel();
};

local.replStart = function () {
/*
 * this function will start repl-debugger
 */
    let that;
    if (globalThis.utility2_repl1) {
        return;
    }
    // start repl
    that = require("repl").start({
        useGlobal: true
    });
    globalThis.utility2_repl1 = that;
    // save eval-function
    that.evalDefault = that.eval;
    // hook custom-eval-function
    that.eval = function (script, context, file, onError) {
        script.replace((
            /^(\S+)\u0020(.*?)\n/
        ), function (ignore, match1, match2) {
            switch (match1) {
            // syntax-sugar - run shell-command
            case "$":
                match2 = match2.replace((
                    /^git\b/
                ), "git --no-pager");
                switch (match2) {
                // syntax-sugar - run git diff
                case "git --no-pager diff":
                    match2 = "git diff --color";
                    break;
                // syntax-sugar - run git log
                case "git --no-pager log":
                    match2 = "git log -n 4";
                    break;
                // syntax-sugar - run ll
                case "ll":
                    match2 = "ls -Fal";
                    break;
                }
                // source lib.utility2.sh
                if (
                    process.platform !== "win32"
                    && process.env.UTILITY2_DIR_BIN && (match2 !== ":")
                ) {
                    match2 = (
                        ". " + process.env.UTILITY2_DIR_BIN
                        + "/lib.utility2.sh;" + match2
                    );
                }
                // run shell-command
                require("child_process").spawn(match2, {
                    shell: true,
                    stdio: [
                        "ignore", 1, 2
                    ]
                // print exitCode
                }).on("exit", function (exitCode) {
                    console.error("exitCode " + exitCode);
                    that.evalDefault("\n", context, file, onError);
                });
                script = "\n";
                break;
            // syntax-sugar - map text with charCodeAt
            case "charCode":
                console.error(
                    match2.split("").map(function (chr) {
                        return (
                            "\\u"
                            + chr.charCodeAt(0).toString(16).padStart(4, 0)
                        );
                    }).join("")
                );
                script = "\n";
                break;
            // syntax-sugar - sort chr
            case "charSort":
                console.error(JSON.stringify(match2.split("").sort().join("")));
                script = "\n";
                break;
            // syntax-sugar - grep current dir
            case "grep":
                // run shell-command
                require("child_process").spawn((
                    "find . -type f | grep -v -E "
/* jslint ignore:start */
+ '"\
/\\.|~\$|/(obj|release)/|(\\b|_)(\\.\\d|\
archive|artifact|\
bower_component|build|\
coverage|\
doc|\
external|\
fixture|\
git_module|\
jquery|\
log|\
min|misc|mock|\
node_module|\
old|\
raw|\rollup|\
swp|\
tmp|\
vendor)s{0,1}(\\b|_)\
" '
/* jslint ignore:end */
                    + "| tr \"\\n\" \"\\000\" | xargs -0 grep -HIin -E \""
                    + match2 + "\""
                ), {
                    shell: true,
                    stdio: [
                        "ignore", 1, 2
                    ]
                }).on("exit", function (exitCode) {
                    console.error("exitCode " + exitCode);
                    that.evalDefault("\n", context, file, onError);
                });
                script = "\n";
                break;
            // syntax-sugar - list obj's keys, sorted by item-type
            // console.error(Object.keys(global).map(function(key){return(typeof global[key]==='object'&&global[key]&&global[key]===global[key]?'global':typeof global[key])+' '+key;}).sort().join('\n')) // jslint ignore:line
            case "keys":
                script = (
                    "console.error(Object.keys(" + match2
                    + ").map(function(key){return("
                    + "typeof " + match2 + "[key]==='object'&&"
                    + match2 + "[key]&&"
                    + match2 + "[key]===global[key]"
                    + "?'global'"
                    + ":typeof " + match2 + "[key]"
                    + ")+' '+key;"
                    + "}).sort().join('\\n'))\n"
                );
                break;
            // syntax-sugar - print String(val)
            case "print":
                script = "console.error(String(" + match2 + "))\n";
                break;
            }
        });
        // eval script
        that.evalDefault(script, context, file, onError);
    };
};

local.requireReadme = function () {
/*
 * this function will require and export example.js embedded in README.md
 */
    let code;
    let env;
    let module;
    let tmp;
    // init env
    env = (typeof process === "object" && process && process.env) || {};
    // library-mode
    if (env.npm_config_mode_lib) {
        local.testRunDefault = local.noop;
        return local;
    }
    // init module.exports
    module = {};
    // if file is modified, then restart process
    if (env.npm_config_mode_auto_restart) {
        require("fs").readdir(".", function (ignore, fileList) {
            fileList.concat(__filename).forEach(function (file) {
                require("fs").stat(file, function (err, data) {
                    local.onErrorThrow(err);
                    if (!data.isFile()) {
                        return;
                    }
                    require("fs").watchFile(file, {
                        interval: 1000,
                        persistent: false
                    }, function () {
                        console.error("file modified - " + file);
                        setTimeout(function () {
                            process.exit(77);
                        }, 1000);
                    });
                });
            });
        });
    }
    if (local.isBrowser) {
        module.exports = local.objectAssignDefault(
            globalThis.utility2_rollup || globalThis.local,
            local
        );
        return module.exports;
    }
    // start repl-debugger
    local.replStart();
    // jslint process.cwd()
    require("child_process").spawn("node", [
        "-e", (
            "require(" + JSON.stringify(__filename)
            + ").jslint.jslintAndPrintDir(" + JSON.stringify(process.cwd())
            + ", {autofix:" + (!env.npm_config_mode_test)
            + ",conditional:true});"
        )
    ], {
        env: Object.assign({}, env, {
            npm_config_mode_lib: "1"
        }),
        stdio: [
            "ignore", 1, 2
        ]
    });
    if (globalThis.utility2_rollup || env.npm_config_mode_start) {
        // init assets index.html
        local.assetsDict["/index.html"] = (
            local.fsReadFileOrDefaultSync("index.html", "utf8", "")
            || local.assetsDict["/index.rollup.html"] || ""
        );
        local.assetsDict["/"] = local.assetsDict["/index.html"];
        local.assetsDict["/assets.app.js"] = require("fs").readFileSync(
            __filename,
            "utf8"
        ).replace((
            /^#!\//
        ), "// ");
        // init exports
        local[env.npm_package_nameLib] = local;
        module.exports = local;
        return module.exports;
    }
    // init file $npm_package_main
    globalThis.utility2_moduleExports = require(
        require("path").resolve(env.npm_package_main)
    );
    globalThis.utility2_moduleExports.globalThis = globalThis;
    // read code from README.md
    code = local.assetsDict["/assets.example.template.js"];
    local.fsReadFileOrDefaultSync("README.md", "utf8", "").replace((
        /\n```javascript(\n\/\*\nexample\.js\n[\S\s]*?\n)```\n/
    ), function (ignore, match1, ii, input) {
        // preserve lineno
        code = input.slice(0, ii).replace((
            /.+/g
        ), "") + "\n" + match1;
        return "";
    });
    // alias require($npm_package_name) to utility2_moduleExports;
    code = code.replace(
        new RegExp("require\\(." + env.npm_package_name + ".\\)"),
        "globalThis.utility2_moduleExports"
    ).replace(
        new RegExp("require\\(." + env.npm_package_nameOriginal + ".\\)"),
        "globalThis.utility2_moduleExports"
    );
    // init example.js
    tmp = require("path").resolve("example.js");
    // jslint code
    local.jslintAndPrint(code, tmp);
    // instrument code
    code = local.istanbulInstrumentInPackage(code, tmp);
    // init module.exports
    module = new local.Module(tmp);
    require.cache[tmp] = module;
    module._compile(code, tmp);
    // init exports
    module.exports.utility2 = local;
    module.exports[env.npm_package_nameLib] = (
        globalThis.utility2_moduleExports
    );
    // init assets lib.xxx.js
    [
        ".css", ".js"
    ].forEach(function (extname) {
        local.assetsDict[
            "/assets." + env.npm_package_nameLib + extname
        ] = local.fsReadFileOrDefaultSync(
            require("path").resolve(env.npm_package_main).replace((
                /\.\w+?$/
            ), extname),
            "utf8",
            ""
        ).replace((
            /^#!\//
        ), "// ");
    });
    Object.assign(local.assetsDict, module.exports.assetsDict);
    // instrument assets lib.xxx.js
    local.assetsDict["/assets." + env.npm_package_nameLib + ".js"] = (
        local.istanbulInstrumentInPackage(
            local.assetsDict[
                "/assets." + env.npm_package_nameLib + ".js"
            ],
            env.npm_package_main
        )
    );
    module.exports.assetsDict = local.assetsDict;
    local.assetsDict["/assets.example.js"] = code;
    local.assetsDict["/assets.test.js"] = local.istanbulInstrumentInPackage(
        require("fs").readFileSync("test.js", "utf8"),
        "test.js"
    );
    // init assets index.html
    [
        [
            "index", ""
        ],
        [
            "index", ".rollup"
        ]
    ].forEach(function ([
        file, isRollup
    ]) {
        tmp = "assets." + file + ".template.html";
        local.assetsDict["/" + tmp] = local.assetsDict["/" + tmp];
        file = file + isRollup + ".html";
        local.assetsDict["/" + file] = local.templateRender(
            // uncomment utility2-comment
            local.assetsDict["/" + tmp].replace((
                /<!--\u0020utility2-comment\b([\S\s]*?)\butility2-comment\u0020-->/g
            ), "$1"),
            {
                env,
                isRollup,
                packageJson: {
                    nameLib: env.npm_package_nameLib
                }
            }
        );
    });
    local.assetsDict["/"] = local.assetsDict["/index.html"];
    // init assets.app.js
    local.assetsDict["/assets.app.js"] = [
        "header",
        "/assets.utility2.rollup.js",
        "/assets.utility2.rollup.start.js",
        "/assets.my_app.css",
        "/assets.my_app.js",
        "/assets.example.js",
        "/assets.test.js",
        "/assets.utility2.rollup.end.js"
    ].map(function (key) {
        switch (key) {
/* jslint ignore:start */
case 'header':
return '\
/* this rollup was created with utility2\n\
 * https://github.com/kaizhu256/node-utility2\n\
 */\n\
\n\
\n\
/*\n\
assets.app.js\n\
\n\
' + env.npm_package_description + '\n\
\n\
instruction\n\
    1. save this script as assets.app.js\n\
    2. run shell-command:\n\
        $ PORT=8081 node assets.app.js\n\
    3. open browser to http://127.0.0.1:8081 and play with web-demo\n\
    4. edit this script to suit your needs\n\
*/\n\
' + local.assetsDict["/assets.utility2.rollup.start.js"].replace((
    /utility2_rollup/g
), "utility2_app");
/* jslint ignore:end */
        case "/assets.my_app.css":
            tmp = "/assets." + env.npm_package_nameLib + ".css";
            // disable $-escape in replacement-string
            code = local.assetsDict[
                "/assets.utility2.rollup.content.js"
            ].replace("/* utility2.rollup.js content */", function () {
                return (
                    "local.assetsDict[\"" + tmp + "\"] = (\n"
                    + JSON.stringify(local.assetsDict[tmp]).replace((
                        /\\\\/g
                    ), "\u0000").replace((
                        /\\n/g
                    ), "\\n\\\n").replace((
                        /\u0000/g
                    ), "\\\\")
                    + ");\n"
                );
            });
            break;
        case "/assets.my_app.js":
            tmp = "/assets." + env.npm_package_nameLib + ".js";
            // disable $-escape in replacement-string
            code = local.assetsDict[
                "/assets.utility2.rollup.content.js"
            ].replace("/* utility2.rollup.js content */", function () {
                return (
                    "local.assetsDict[\"" + tmp + "\"] = (\n"
                    + JSON.stringify(local.assetsDict[tmp]).replace((
                        /\\\\/g
                    ), "\u0000").replace((
                        /\\n/g
                    ), "\\n\\\n").replace((
                        /\u0000/g
                    ), "\\\\")
                    + ");\n"
                    + local.assetsDict[tmp]
                );
            });
            break;
        default:
            code = local.assetsDict[key];
        }
        return (
            "/* script-begin " + key + " */\n"
            + code.trim()
            + "\n/* script-end " + key + " */\n"
        );
    }).join("\n\n\n");
    local.objectAssignDefault(module.exports, local);
    // init testCase_buildXxx
    Object.keys(local).forEach(function (key) {
        if (
            key.indexOf("_testCase_build") === 0
            || key === "_testCase_webpage_default"
        ) {
            module.exports[key.slice(1)] = (
                module.exports[key.slice(1)] || local[key]
            );
        }
    });
    return module.exports;
};

local.serverRespondDefault = function (req, res, statusCode, err) {
/*
 * this function will respond with default http <statusCode> and message,
 * or <err>.stack for given statusCode
 */
    let msg;
    // init statusCode and contentType
    local.serverRespondHeadSet(req, res, statusCode, {
        "Content-Type": "text/plain; charset=utf-8"
    });
    if (err) {
        // debug statusCode / method / url
        err.message = (
            res.statusCode + " " + req.method + " " + req.url + "\n"
            + err.message
        );
        // print err.stack to stderr
        console.error(err);
        // end res with err.stack
        res.end(err.stack);
        return;
    }
    // end res with default statusCode and http-message
    msg = {
        "100": "Continue",
        "101": "Switching Protocols",
        "102": "Processing",
        "103": "Early Hints",
        "200": "OK",
        "201": "Created",
        "202": "Accepted",
        "203": "Non-Authoritative Information",
        "204": "No Content",
        "205": "Reset Content",
        "206": "Partial Content",
        "207": "Multi-Status",
        "208": "Already Reported",
        "226": "IM Used",
        "300": "Multiple Choices",
        "301": "Moved Permanently",
        "302": "Found",
        "303": "See Other",
        "304": "Not Modified",
        "305": "Use Proxy",
        "307": "Temporary Redirect",
        "308": "Permanent Redirect",
        "400": "Bad Request",
        "401": "Unauthorized",
        "402": "Payment Required",
        "403": "Forbidden",
        "404": "Not Found",
        "405": "Method Not Allowed",
        "406": "Not Acceptable",
        "407": "Proxy Authentication Required",
        "408": "Request Timeout",
        "409": "Conflict",
        "410": "Gone",
        "411": "Length Required",
        "412": "Precondition Failed",
        "413": "Payload Too Large",
        "414": "URI Too Long",
        "415": "Unsupported Media Type",
        "416": "Range Not Satisfiable",
        "417": "Expectation Failed",
        "418": "I'm a Teapot",
        "421": "Misdirected Request",
        "422": "Unprocessable Entity",
        "423": "Locked",
        "424": "Failed Dependency",
        "425": "Unordered Collection",
        "426": "Upgrade Required",
        "428": "Precondition Required",
        "429": "Too Many Requests",
        "431": "Request Header Fields Too Large",
        "451": "Unavailable For Legal Reasons",
        "500": "Internal Server Error",
        "501": "Not Implemented",
        "502": "Bad Gateway",
        "503": "Service Unavailable",
        "504": "Gateway Timeout",
        "505": "HTTP Version Not Supported",
        "506": "Variant Also Negotiates",
        "507": "Insufficient Storage",
        "508": "Loop Detected",
        "509": "Bandwidth Limit Exceeded",
        "510": "Not Extended",
        "511": "Network Authentication Required"
    };
    msg = statusCode + " " + msg[statusCode];
    res.end(msg);
};

local.serverRespondEcho = function (req, res) {
/*
 * this function will respond with debug info
 */
    res.write(
        req.method + " " + req.url
        + " HTTP/" + req.httpVersion + "\r\n"
        + Object.keys(req.headers).map(function (key) {
            return key + ": " + req.headers[key] + "\r\n";
        }).join("") + "\r\n"
    );
    req.pipe(res);
};

local.serverRespondHeadSet = function (ignore, res, statusCode, headers) {
/*
 * this function will set <res> object's <statusCode> and <headers>
 */
    if (res.headersSent) {
        return;
    }
    // init res.statusCode
    if (Number(statusCode)) {
        res.statusCode = Number(statusCode);
    }
    Object.keys(headers).forEach(function (key) {
        res.setHeader(key, headers[key]);
    });
    return true;
};

local.serverRespondTimeoutDefault = function (req, res, timeout) {
/*
 * this function will create <timeout>-handler for server-<req>
 */
    let isDone;
    let onError;
    onError = function () {
        if (isDone) {
            return;
        }
        isDone = true;
        // debug res
        console.error("serverLog - " + JSON.stringify({
            time: new Date(req.timeStart).toISOString(),
            type: "serverResponse",
            method: req.method,
            url: req.url,
            statusCode: res.statusCode | 0,
            timeElapsed: Date.now() - req.timeStart,
            // extra
            reqContentLength: req.dataLength || 0,
            resContentLength: res.contentLength,
            reqHeaderXForwardedFor: req.headers["x-forwarded-for"] || "",
            reqHeaderOrigin: req.headers.origin || "",
            reqHeaderReferer: req.headers.referer || "",
            reqHeaderUserAgent: req.headers["user-agent"]
        }) + "\n");
        // cleanup timerTimeout
        clearTimeout(req.timerTimeout);
    };
    req.timeStart = Date.now();
    req.onTimeout = req.onTimeout || function (err) {
        local.serverRespondDefault(req, res, 500, err);
        setTimeout(function () {
            // cleanup req and res
            local.streamCleanup(req);
            local.streamCleanup(res);
        }, 1000);
    };
    // init timerTimeout
    timeout = timeout || local.timeoutDefault;
    req.timerTimeout = setTimeout(
        req.onTimeout,
        timeout,
        new Error(
            "timeout - " + timeout + " ms - "
            + "server " + req.method + " " + req.url
        )
    );
    res.contentLength = 0;
    res.writeContentLength = res.writeContentLength || res.write;
    res.write = function (buf, encoding, callback) {
        res.contentLength += Buffer.byteLength(buf);
        res.writeContentLength(buf, encoding, callback);
    };
    res.on("error", onError);
    res.on("finish", onError);
};

local.setTimeoutOnError = function (onError, timeout, err, data) {
/*
 * this function will after timeout has passed,
 * then call <onError>(<err>, <data>)
 */
    if (typeof onError === "function") {
        setTimeout(function () {
            onError(err, data);
        }, timeout);
    }
    return data;
};

local.streamCleanup = function (stream) {
/*
 * this function will try to end or destroy <stream>
 */
    let err;
    // try to end stream
    try {
        stream.end();
    } catch (errCaught) {
        err = errCaught;
    }
    // if err, then try to destroy stream
    if (err) {
        try {
            stream.destroy();
        } catch (ignore) {}
    }
};

local.stringHtmlSafe = function (str) {
/*
 * this function will make <str> html-safe
 * https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html
 */
    return str.replace((
        /&/gu
    ), "&amp;").replace((
        /"/gu
    ), "&quot;").replace((
        /'/gu
    ), "&apos;").replace((
        /</gu
    ), "&lt;").replace((
        />/gu
    ), "&gt;").replace((
        /&amp;(amp;|apos;|gt;|lt;|quot;)/igu
    ), "&$1");
};

local.stringQuotedToAscii = function (str) {
/*
 * this function will replace non-ascii-chr to unicode-escaped-ascii-chr
 * in quoted-<str>
 */
    return str.replace((
        /\r/g
    ), "\\r").replace((
        /\t/g
    ), "\\t").replace((
        /[^\n\u0020-\u007e]/g
    ), function (chr) {
        return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).slice(-4);
    });
};

local.stringRegexpEscape = function (str) {
/*
 * this function will regexp-escape <str>
 * https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
 */
    return str.replace((
        /[\-\/\\\^$*+?.()|\[\]{}]/g
    ), "\\$&");
};

local.templateRender = function (template, dict, opt = {}, ii = 0) {
/*
 * this function will render <template> with given <dict>
 */
    let argList;
    let getVal;
    let match;
    let renderPartial;
    let rgx;
    let skip;
    let val;
    if (dict === null || dict === undefined) {
        dict = {};
    }
    getVal = function (key) {
        argList = key.split(" ");
        val = dict;
        if (argList[0] === "#this/") {
            return val;
        }
        if (argList[0] === "#ii/") {
            return ii;
        }
        // iteratively lookup nested val in dict
        argList[0].split(".").forEach(function (key) {
            val = val && val[key];
        });
        return val;
    };
    renderPartial = function (match0, helper, key, partial) {
        switch (helper) {
        case "each":
        case "eachTrimEndComma":
            val = getVal(key);
            val = (
                Array.isArray(val)
                ? val.map(function (dict, ii) {
                    // recurse with partial
                    return local.templateRender(partial, dict, opt, ii);
                }).join("")
                : ""
            );
            // remove trailing-comma from last elem
            if (helper === "eachTrimEndComma") {
                val = val.trimEnd().replace((
                    /,$/
                ), "");
            }
            return val;
        case "if":
            partial = partial.split("{{#unless " + key + "}}");
            partial = (
                getVal(key)
                ? partial[0]
                // handle "unless" case
                : partial.slice(1).join("{{#unless " + key + "}}")
            );
            // recurse with partial
            return local.templateRender(partial, dict, opt);
        case "unless":
            return (
                getVal(key)
                ? ""
                // recurse with partial
                : local.templateRender(partial, dict, opt)
            );
        default:
            // recurse with partial
            return match0[0] + local.templateRender(match0.slice(1), dict, opt);
        }
    };
    // render partials
    rgx = (
        /\{\{#(\w+)\u0020([^}]+?)\}\}/g
    );
    template = template || "";
    match = rgx.exec(template);
    while (match) {
        rgx.lastIndex += 1 - match[0].length;
        template = template.replace(
            new RegExp(
                "\\{\\{#(" + match[1] + ") (" + match[2]
                + ")\\}\\}([\\S\\s]*?)\\{\\{/" + match[1] + " " + match[2]
                + "\\}\\}"
            ),
            renderPartial
        );
        match = rgx.exec(template);
    }
    // search for keys in template
    return template.replace((
        /\{\{[^}]+?\}\}/g
    ), function (match0) {
        let markdownToHtml;
        let notHtmlSafe;
        notHtmlSafe = opt.notHtmlSafe;
        try {
            val = getVal(match0.slice(2, -2));
            if (val === undefined) {
                return match0;
            }
            argList.slice(1).forEach(function (fmt, ii, list) {
                switch (fmt) {
                case "*":
                case "+":
                case "-":
                case "/":
                    skip = ii + 1;
                    val = String(
                        fmt === "*"
                        ? Number(val) * Number(list[skip])
                        : fmt === "+"
                        ? Number(val) + Number(list[skip])
                        : fmt === "-"
                        ? Number(val) - Number(list[skip])
                        : Number(val) / Number(list[skip])
                    );
                    break;
                case "alphanumeric":
                    val = val.replace((
                        /\W/g
                    ), "_");
                    break;
                case "decodeURIComponent":
                    val = decodeURIComponent(val);
                    break;
                case "encodeURIComponent":
                    val = encodeURIComponent(val);
                    break;
                case "jsonStringify":
                    val = JSON.stringify(val);
                    break;
                case "jsonStringify4":
                    val = JSON.stringify(val, undefined, 4);
                    break;
                case "markdownSafe":
                    val = val.replace((
                        /`/g
                    ), "'"); // `
                    break;
                case "markdownToHtml":
                    markdownToHtml = true;
                    break;
                case "notHtmlSafe":
                    notHtmlSafe = true;
                    break;
                case "padEnd":
                case "padStart":
                case "replace":
                case "slice":
                    skip = ii + 2;
                    val = String(val)[fmt](
                        list[skip - 1],
                        list[skip].replace("\"\"", "").replace("\"_\"", " ")
                    );
                    break;
                case "truncate":
                    skip = ii + 1;
                    if (val.length > list[skip]) {
                        val = val.slice(
                            0,
                            Math.max(list[skip] - 3, 0)
                        ).trimEnd() + "...";
                    }
                    break;
                // default to String.prototype[fmt]()
                default:
                    if (ii <= skip) {
                        break;
                    }
                    val = val[fmt]();
                }
            });
            val = String(val);
            // default to htmlSafe
            if (!notHtmlSafe) {
                val = val.replace((
                    /&/gu
                ), "&amp;").replace((
                    /"/gu
                ), "&quot;").replace((
                    /'/gu
                ), "&apos;").replace((
                    /</gu
                ), "&lt;").replace((
                    />/gu
                ), "&gt;").replace((
                    /&amp;(amp;|apos;|gt;|lt;|quot;)/igu
                ), "&$1");
            }
            markdownToHtml = (
                markdownToHtml
                && (typeof local.marked === "function" && local.marked)
            );
            if (markdownToHtml) {
                val = markdownToHtml(val).replace((
                    /&amp;(amp;|apos;|gt;|lt;|quot;)/igu
                ), "&$1");
            }
            return val;
        } catch (errCaught) {
            errCaught.message = (
                "templateRender could not render expression "
                + JSON.stringify(match0) + "\n"
            ) + errCaught.message;
            local.assertOrThrow(undefined, errCaught);
        }
    });
};

local.templateRenderMyApp = function (template) {
/*
 * this function will render my-app-lite template
 */
    let githubRepo;
    let packageJson;
    packageJson = JSON.parse(
        require("fs").readFileSync("package.json", "utf8")
    );
    local.objectAssignDefault(packageJson, {
        nameLib: packageJson.name.replace((
            /\W/g
        ), "_"),
        repository: {
            url: (
                "https://github.com/kaizhu256/node-" + packageJson.name
            )
        }
    }, 2);
    githubRepo = packageJson.repository.url.replace((
        /\.git$/
    ), "").split("/").slice(-2);
    template = template.replace((
        /kaizhu256(\.github\.io\/|%252F|\/)/g
    ), githubRepo[0] + ("$1"));
    template = template.replace((
        /node-my-app-lite/g
    ), githubRepo[1]);
    template = template.replace((
        /\bh1-my-app\b/g
    ), (
        packageJson.nameHeroku
        || ("h1-" + packageJson.nameLib.replace((
            /_/g
        ), "-"))
    ));
    template = template.replace((
        /my-app-lite/g
    ), packageJson.name);
    template = template.replace((
        /my_app/g
    ), packageJson.nameLib);
    template = template.replace((
        /\{\{packageJson\.(\S+)\}\}/g
    ), function (ignore, match1) {
        return packageJson[match1];
    });
    return template;
};

local.testCase_noop_default = function (opt, onError) {
/*
 * this function will test noop's default handling-behavior
 */
    local.noop();
    onError(undefined, opt);
};

local.testMock = function (mockList, onTestCase, onError) {
/*
 * this function will mock objects in <mockList> when running <onTestCase>
 */
    let onError2;
    onError2 = function (err) {
        // restore mock[0] from mock[2]
        mockList.reverse().forEach(function (mock) {
            Object.keys(mock[2]).forEach(function (key) {
                try {
                    mock[0][key] = mock[2][key];
                } catch (errCaught) {
                    console.error(errCaught);
                }
            });
        });
        onError(err);
    };
    // suppress console.error and console.log
    mockList.unshift([
        console, {}
    ]);
    local.objectAssignDefault(mockList[0][1], {
        error: local.noop,
        log: local.noop
    });
    // mock mock[0]
    mockList.forEach(function (mock) {
        mock[2] = {};
        // backup mock[0] into mock[2]
        Object.keys(mock[1]).forEach(function (key) {
            mock[2][key] = mock[0][key];
        });
        // override mock[0] with mock[1]
        Object.keys(mock[1]).forEach(function (key) {
            try {
                mock[0][key] = mock[1][key];
            } catch (errCaught) {
                console.error(errCaught);
            }
        });
    });
    // try to run onTestCase with mock[0]
    try {
        // run onTestCase
        onTestCase(onError2);
    } catch (errCaught) {
        onError2(errCaught);
    }
};

local.testReportCreate = function (testReport) {
/*
 * this function will create test-report artifacts
 */
    testReport = local.objectAssignDefault(testReport, {
        testPlatformList: []
    });
    // print test-report summary
    console.error(
        "\n" + new Array(56).join("-")
        + "\n" + testReport.testPlatformList.filter(function (testPlatform) {
            // if testPlatform has no tests, then filter it out
            return testPlatform.testCaseList.length;
        }).map(function (testPlatform) {
            return (
                "| test-report - " + testPlatform.name + "\n|"
                + String(
                    testPlatform.timeElapsed + " ms     "
                ).padStart(16, " ")
                + String(
                    testPlatform.testsFailed + " failed "
                ).padStart(16, " ")
                + String(
                    testPlatform.testsPassed + " passed "
                ).padStart(16, " ")
                + "     |\n" + new Array(56).join("-")
            );
        }).join("\n") + "\n"
    );
    // create test-report.html
    local.fsWriteFileWithMkdirpSync(
        ".tmp/build/test-report.html",
        local.testReportMerge(testReport)
    );
    // create build.badge.svg
    local.fsWriteFileWithMkdirpSync(
        ".tmp/build/build.badge.svg",
        local.assetsDict["/assets.buildBadge.template.svg"].replace((
            /0000-00-00\u002000:00:00\u0020UTC\u0020-\u0020master\u0020-\u0020aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/g
        ), (
            new Date().toISOString().slice(0, 19).replace("T", " ")
            + " - " + process.env.CI_BRANCH + " - " + process.env.CI_COMMIT_ID
        ))
    );
    // create test-report.badge.svg
    local.fsWriteFileWithMkdirpSync(
        ".tmp/build/test-report.badge.svg",
        local.assetsDict["/assets.testReportBadge.template.svg"].replace((
            // edit number of tests failed
            /999/g
        ), testReport.testsFailed).replace((
            // edit badge color
            /d00/g
        ), (
            testReport.testsFailed
            ? "d00"
            : "0d0"
        ))
    );
    // if any test failed, then exit with non-zero exitCode
    console.error(
        "\n" + process.env.MODE_BUILD
        + " - " + testReport.testsFailed + " failed tests\n"
    );
    // print failed testCase
    testReport.testPlatformList.forEach(function (testPlatform) {
        testPlatform.testCaseList.forEach(function (testCase) {
            if (testCase.status !== "passed") {
                console.error(JSON.stringify(testCase, undefined, 4));
            }
        });
    });
    return testReport;
};

local.testReportMerge = function (testReport1, testReport2 = {}) {
/*
 * this function will
 * 1. merge testReport2 into testReport1
 * 2. return testReport1 in html-format
 */
    let errStackList;
    let html;
    let testCaseNumber;
    let testReport;
    // 1. merge testReport2 into testReport1
    [
        testReport1, testReport2
    ].forEach(function (testReport, ii) {
        let {
            MODE_BUILD
        } = local.env;
        ii += 1;
        local.objectAssignDefault(testReport, {
            date: new Date().toISOString(),
            errStackList: [],
            testPlatformList: [],
            timeElapsed: 0
        }, -1);
        // security - handle malformed testReport
        local.assertOrThrow(
            typeof testReport === "object" && testReport,
            ii + " invalid testReport " + typeof testReport
        );
        // validate timeElapsed
        local.assertOrThrow(
            typeof testReport.timeElapsed === "number",
            ii + " invalid testReport.timeElapsed "
            + typeof testReport.timeElapsed
        );
        // security - handle malformed testReport.testPlatformList
        testReport.testPlatformList.forEach(function (testPlatform) {
            local.objectAssignDefault(testPlatform, {
                name: "undefined",
                testCaseList: [],
                timeElapsed: 0
            }, -1);
            local.assertOrThrow(
                typeof testPlatform.name === "string",
                ii + " invalid testPlatform.name " + typeof testPlatform.name
            );
            // insert $MODE_BUILD into testPlatform.name
            if (MODE_BUILD) {
                testPlatform.name = testPlatform.name.replace((
                    /^(browser|node)\b/
                ), MODE_BUILD + " - $1");
            }
            // validate timeElapsed
            local.assertOrThrow(
                typeof testPlatform.timeElapsed === "number",
                (
                    ii + " invalid testPlatform.timeElapsed "
                    + typeof testPlatform.timeElapsed
                )
            );
            // security - handle malformed testPlatform.testCaseList
            testPlatform.testCaseList.forEach(function (testCase) {
                local.objectAssignDefault(testCase, {
                    errStack: "",
                    name: "undefined",
                    timeElapsed: 0
                }, -1);
                local.assertOrThrow(
                    typeof testCase.errStack === "string",
                    ii + " invalid testCase.errStack "
                    + typeof testCase.errStack
                );
                local.assertOrThrow(
                    typeof testCase.name === "string",
                    ii + " invalid testCase.name " + typeof testCase.name
                );
                // validate timeElapsed
                local.assertOrThrow(
                    typeof testCase.timeElapsed === "number",
                    (
                        ii + " invalid testCase.timeElapsed "
                        + typeof testCase.timeElapsed
                    )
                );
            });
        });
    });
    // merge testReport2.testPlatformList into testReport1.testPlatformList
    testReport2.testPlatformList.forEach(function (testPlatform2) {
        // add testPlatform2 to testReport1.testPlatformList
        testReport1.testPlatformList.push(testPlatform2);
    });
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
            case "failed":
                testPlatform.testsFailed += 1;
                testReport.testsFailed += 1;
                break;
            // update passed tests
            case "passed":
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
        testPlatform.status = (
            testPlatform.testsFailed
            ? "failed"
            : testPlatform.testsPending
            ? "pending"
            : "passed"
        );
        // sort testCaseList by status and name
        testPlatform.testCaseList.sort(function (aa, bb) {
            return (
                aa.status.replace("passed", "z") + aa.name
                > bb.status.replace("passed", "z") + bb.name
                ? 1
                : -1
            );
        });
    });
    // sort testPlatformList by status and name
    testReport.testPlatformList.sort(function (aa, bb) {
        return (
            aa.status.replace("passed", "z") + aa.name
            > bb.status.replace("passed", "z") + bb.name
            ? 1
            : -1
        );
    });
    // stop testReport timer
    if (!testReport.testsPending) {
        local.timeElapsedPoll(testReport);
    }
    // 2. return testReport1 in html-format
    // deepcopy testReport that will be modified for html templating
    testReport = JSON.parse(JSON.stringify(testReport1));
    // update timeElapsed
    local.timeElapsedPoll(testReport);
    testReport.testPlatformList.forEach(function (testPlatform) {
        // update testPlatform.timeElapsed
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
    testCaseNumber = 0;
    Object.assign(testReport, {
        // map testPlatformList
        testPlatformList: testReport.testPlatformList.filter(function (
            testPlatform
        ) {
            // if testPlatform has no tests, then filter it out
            return testPlatform.testCaseList.length;
        }).map(function (testPlatform, ii) {
            errStackList = [];
            return Object.assign(testPlatform, {
                errStackList,
                name: testPlatform.name,
                screenshot: testPlatform.screenshot,
                // map testCaseList
                testCaseList: testPlatform.testCaseList.map(function (
                    testCase
                ) {
                    testCaseNumber += 1;
                    if (testCase.errStack) {
                        errStackList.push({
                            errStack: (
                                testCaseNumber + ". " + testCase.name
                                + "\n" + testCase.errStack
                            )
                        });
                    }
                    return Object.assign(testCase, {
                        testCaseNumber,
                        testReportTestStatusClass: (
                            "test"
                            + testCase.status[0].toUpperCase()
                            + testCase.status.slice(1)
                        )
                    });
                }),
                testPlatformNumber: ii + 1
            });
        }, 8),
        testStatusClass: (
            testReport.testsFailed
            ? "testFailed"
            : "testPassed"
        )
    });
    // create html test-report
    html = local.assetsDict["/assets.utility2.template.html"];
    html = html.replace("assets.utility2.template.html", "");
    html = html.replace((
        /<title>.*?<\/title>/
    ), "<title>test-report</title>");
    // init html - style
    html = html.replace(
        "\n</style>\n",
        "\n"
        + ".testReportDiv img {\n"
        + "    border: 1px solid #999;\n"
        + "    margin: 5px 0 5px 0;\n"
        + "    max-height: 256px;\n"
        + "    max-width: 512px;\n"
        + "}\n"
        + ".testReportDiv pre {\n"
        + "    background: #fdd;\n"
        + "    border-top: 1px solid #999;\n"
        + "    margin-bottom: 0;\n"
        + "    padding: 10px;\n"
        + "}\n"
        + ".testReportDiv span {\n"
        + "    display: inline-block;\n"
        + "    width: 120px;\n"
        + "}\n"
        + ".testReportDiv table {\n"
        + "    border-top: 1px solid #999;\n"
        + "    text-align: left;\n"
        + "    width: 100%;\n"
        + "}\n"
        + ".testReportDiv table > tbody > tr:nth-child(odd) {\n"
        + "    background: #bfb;\n"
        + "}\n"
        + ".testReportDiv .footer {\n"
        + "    text-align: center;\n"
        + "}\n"
        + ".testReportDiv .platform {\n"
        + "    background: #fff;\n"
        + "    border: 1px solid #999;\n"
        + "    margin-bottom: 20px;\n"
        + "    padding: 0 10px 10px 10px;\n"
        + "    text-align: left;\n"
        + "}\n"
        + ".testReportDiv .summary {\n"
        + "    background: #bfb;\n"
        + "}\n"
        + ".testReportDiv .testFailed {\n"
        + "    background: #f99;\n"
        + "}\n"
        + "</style>\n"
    );
    // init html - body
    html = html.replace((
        /\n<\/script>[\S\s]*?<\/body>\n/
    ), function () {
        let {
            date,
            testPlatformList,
            testStatusClass,
            testsFailed,
            testsPassed,
            testsPending,
            timeElapsed
        } = testReport;
        let {
            CI_COMMIT_INFO,
            npm_package_homepage,
            npm_package_name,
            npm_package_version
        } = local.env;
        return (
            "</script>\n"
            + "<div class=\"testReportDiv\">\n"
            + "<h1>test-report for\n"
            + "   <a href=\"" + (npm_package_homepage || "#") + "\">\n"
            + "   " + npm_package_name + " (" + npm_package_version + ")\n"
            + "   </a>\n"
            + "</h1>\n"
            + "\n"
            + "<div class=\"platform summary\">\n"
            + "<h2>summary</h2>\n"
            + "<h4>\n"
            + "   <span>version</span>- " + npm_package_version + "<br>\n"
            + "   <span>test date</span>- " + date + "<br>\n"
            + "   <span>commit info</span>- \n"
            + (CI_COMMIT_INFO || "undefined") + "<br>\n"
            + "</h4>\n"
            + "<table>\n"
            + "<thead>\n"
            + "   <tr>\n"
            + "   <th>total time-elapsed</th>\n"
            + "   <th>total tests failed</th>\n"
            + "   <th>total tests passed</th>\n"
            + "   <th>total tests pending</th>\n"
            + "   </tr>\n"
            + "</thead>\n"
            + "<tbody>\n"
            + "   <tr>\n"
            + "   <td>" + timeElapsed + " ms</td>\n"
            + "   <td class=\"" + testStatusClass + "\">"
            + testsFailed + "</td>\n"
            + "   <td>" + testsPassed + "</td>\n"
            + "   <td>" + testsPending + "</td>\n"
            + "   </tr>\n"
            + "</tbody>\n"
            + "</table>\n"
            + "</div>\n"
            + "\n"
            + testPlatformList.map(function ({
                domOnEventWindowOnloadTimeElapsed,
                errStackList,
                name,
                screenshot,
                testCaseList,
                testPlatformNumber,
                testsFailed,
                testsPassed,
                testsPending,
                timeElapsed
            }) {
                return "<div class=\"platform\">\n"
                + "<h4>\n"
                + testPlatformNumber + ". " + name + "<br>\n"
                + (
                    screenshot
                    ? "<a href=\"" + encodeURIComponent(screenshot) + "\">\n"
                    + "<img\n"
                    + "alt=\"" + encodeURIComponent(screenshot) + "\"\n"
                    + "src=\"" + encodeURIComponent(screenshot) + "\"\n"
                    + ">\n"
                    + "</a>\n"
                    + "<br>\n"
                    : ""
                )
                + (
                    domOnEventWindowOnloadTimeElapsed
                    ? "<span>onload-time</span>- "
                    + domOnEventWindowOnloadTimeElapsed
                    + " ms<br>\n"
                    : ""
                )
                + "<span>time-elapsed</span>- " + timeElapsed + " ms<br>\n"
                + "<span>tests failed</span>- " + testsFailed + "<br>\n"
                + "<span>tests passed</span>- " + testsPassed + "<br>\n"
                + "<span>tests pending</span>- " + testsPending + "<br>\n"
                + "</h4>\n"
                + "\n"
                + "<table>\n"
                + "<thead><tr>\n"
                + "<th>#</th>\n"
                + "<th>time-elapsed</th>\n"
                + "<th>status</th>\n"
                + "<th>test-case</th>\n"
                + "</tr></thead>\n"
                + "<tbody>\n"
                + testCaseList.map(function ({
                    name,
                    status,
                    testCaseNumber,
                    testReportTestStatusClass,
                    timeElapsed
                }) {
                    return "<tr>\n"
                    + "<td>" + testCaseNumber + "</td>\n"
                    + "<td>" + timeElapsed + " ms</td>\n"
                    + "<td class=\"" + testReportTestStatusClass + "\">"
                    + status + "</td>\n"
                    + "<td>" + name + "</td>\n"
                    + "</tr>\n";
                }).join("")
                + "</tbody>\n"
                + "</table>\n"
                + "\n"
                + (
                    errStackList.length
                    ? "<pre tabIndex=\"0\">\n"
                    + errStackList.join("\n") + "\n"
                    + "</pre>\n"
                    : ""
                )
                + "</div>\n";
            }).join("")
            + "\n"
            + "<div class=\"footer\">\n"
            + "[ this document was created with <a\n"
            + "    href=\"https://github.com/kaizhu256/node-utility2\"\n"
            + "    target=\"_blank\"\n"
            + ">utility2</a> ]\n"
            + "</div>\n"
            + "\n"
            + "</div>\n"
            + "</body>\n"
        );
    });
    html = local.templateRender(html, testReport);
    return html;
};

local.testRunBrowser = function () {
/*
 * this function will run browser-tests
 */
    // hide browser-tests
    if (document.querySelector("#htmlTestReport1").style.maxHeight !== "0px") {
        local.uiAnimateSlideUp(document.querySelector("#htmlTestReport1"));
        document.querySelector(
            "#buttonTestRun1"
        ).textContent = "run browser-tests";
        return;
    }
    // show browser-tests
    local.uiAnimateSlideDown(document.querySelector("#htmlTestReport1"));
    document.querySelector(
        "#buttonTestRun1"
    ).textContent = "hide browser-tests";
    local.modeTest = 1;
    local.testRunDefault(globalThis.local);
    // reset output
    document.querySelectorAll(".onevent-reset-output").forEach(function (elem) {
        elem.textContent = "";
    });
};

local.testRunDefault = function (opt) {
/*
 * this function will run tests in testPlatform.testCaseList
 */
    let consoleError;
    let isCoverage;
    let processExit;
    let testPlatform;
    let testReport;
    let timerInterval;
    // run-server
    // 1. create server from local.middlewareList
    // 2. start server on local.env.PORT
    // 3. run tests
    if (!local.isBrowser) {
        // 1. create server from local.middlewareList
        local.middlewareList = local.middlewareList || [
            local.middlewareInit,
            local.middlewareAssetsCached,
            local.middlewareFileServer
        ];
        if (!(globalThis.utility2_serverHttp1 || (
            typeof process === "object"
            && process
            && process.env.npm_config_mode_lib
        ))) {
            globalThis.utility2_onReadyBefore.cnt += 1;
            local.serverLocalReqHandler = function (req, res) {
            /*
             * this function will emulate express-like middleware-chaining
             */
                let gotoState;
                let isDone;
                gotoState = -1;
                (function gotoNext(err) {
                    try {
                        gotoState += 1;
                        if (err || gotoState >= local.middlewareList.length) {
                            local.middlewareError(err, req, res);
                            return;
                        }
                        // recurse with next middleware in middlewareList
                        local.middlewareList[gotoState](req, res, gotoNext);
                    } catch (errCaught) {
                        // throw errCaught to break infinite recursion-loop
                        local.assertOrThrow(!isDone, errCaught);
                        isDone = true;
                        gotoNext(errCaught);
                    }
                }());
            };
            globalThis.utility2_serverHttp1 = local.http.createServer(
                local.serverLocalReqHandler
            );
            // 2. start server on local.env.PORT
            console.error("http-server listening on port " + local.env.PORT);
            globalThis.utility2_onReadyBefore.cnt += 1;
            globalThis.utility2_serverHttp1.listen(
                local.env.PORT,
                globalThis.utility2_onReadyBefore
            );
            // 3. run tests
            local.testRunDefault(opt);
            globalThis.utility2_onReadyBefore();
        }
    }
    globalThis.utility2_modeTest = Number(
        globalThis.utility2_modeTest
        || opt.modeTest
        || local.modeTest
        || local.env.npm_config_mode_test
    );
    switch (globalThis.utility2_modeTest) {
    // init
    case 1:
        globalThis.utility2_modeTest += 1;
        // reset db
        globalThis.utility2_onReadyAfter(function () {
            local.testRunDefault(opt);
        });
        return;
    // test-run
    default:
        // test-ignore
        if (
            globalThis.utility2_onReadyBefore.cnt
            || !globalThis.utility2_modeTest
            || globalThis.utility2_modeTest > 2
        ) {
            return;
        }
        // test-run
        globalThis.utility2_modeTest += 1;
    }
    // visual notification - testRun
    //!! local.ajaxProgressUpdate();
    // mock console.error
    consoleError = console.error;
    isCoverage = (
        typeof globalThis.__coverage__ === "object" && globalThis.__coverage__
        && Object.keys(globalThis.__coverage__).length
    );
    console.error = function (...argList) {
    /*
     * this function will ignore serverLog-msg during test-run
     */
        if (!isCoverage && !(
            /^serverLog\u0020-\u0020\{/
        ).test(argList[0])) {
            consoleError(...argList);
        }
    };
    // mock proces.exit
    if (!local.isBrowser) {
        processExit = process.exit;
        process.exit = function (exitCode) {
            local.eventListenerEmit(
                "utility2.testRunMock.process.exit",
                exitCode | 0
            );
        };
    }
    // init modeTestCase
    local.modeTestCase = (
        local.modeTestCase
        || local.env.npm_config_mode_test_case || ""
    );
    // init testReport
    testReport = globalThis.utility2_testReport;
    // init testReport timer
    local.timeElapsedPoll(testReport);
    // init testPlatform
    testPlatform = testReport.testPlatformList[0];
    // init testPlatform timer
    local.timeElapsedPoll(testPlatform);
    // reset testPlatform.testCaseList
    testPlatform.testCaseList.length = 0;
    // add tests into testPlatform.testCaseList
    Object.keys(opt).forEach(function (key) {
        // add testCase opt[key] to testPlatform.testCaseList
        if (
            typeof opt[key] === "function" && (
                local.modeTestCase
                ? local.modeTestCase.split(
                    /[,\s]/g
                ).indexOf(key) >= 0
                : key.indexOf("testCase_") === 0
            )
        ) {
            testPlatform.testCaseList.push({
                isBrowser: local.isBrowser,
                name: key,
                status: "pending",
                onTestCase: opt[key]
            });
        }
    });
    local.testReportMerge(testReport);
    if (local.isBrowser) {
        document.querySelectorAll("#htmlTestReport1").forEach(function (elem) {
            local.uiAnimateSlideDown(elem);
            elem.innerHTML = local.testReportMerge(testReport);
        });
    }
    local.eventListenerEmit("utility2.testRunStart", testReport);
    // testRunProgressUpdate every 2000 ms until isDone
    timerInterval = setInterval(function () {
        // update testPlatform.timeElapsed
        local.timeElapsedPoll(testPlatform);
        if (local.isBrowser) {
            document.querySelector(
                "#htmlTestReport1"
            ).innerHTML = local.testReportMerge(testReport);
        }
        local.eventListenerEmit("utility2.testRunProgressUpdate", testReport);
        // cleanup timerInterval
        if (!testReport.testsPending) {
            clearInterval(timerInterval);
        }
        // list pending testCase every 5000 ms
        if (testPlatform.timeElapsed % 5000 < 3000) {
            consoleError(
                "testRunDefault - "
                + testPlatform.timeElapsed + " ms - testCase pending - "
                + testPlatform.testCaseList.filter(function (testCase) {
                    return testCase.status === "pending";
                }).slice(0, 4).map(function (testCase) {
                    return testCase.name;
                }).join(", ") + " ..."
            );
        }
    }, 2000);
    // shallow-copy testPlatform.testCaseList to prevent side-effects
    // from in-place sort from testReportMerge
    local.onParallelList({
        list: testPlatform.testCaseList.slice()
    }, function (testCase, onParallel) {
        let onError;
        let timerTimeout;
        onError = function (err) {
            // update testPlatform.timeElapsed
            local.timeElapsedPoll(testPlatform);
            // cleanup timerTimeout
            clearTimeout(timerTimeout);
            // if testCase isDone, then fail testCase
            if (testCase.isDone) {
                err = err || new Error(
                    "callback in testCase "
                    + testCase.name
                    + " called multiple times"
                );
            }
            // if err occurred, then fail testCase
            if (err) {
                // restore console.log
                console.error = consoleError;
                testCase.status = "failed";
                consoleError(
                    "\ntestRunDefault - "
                    + testPlatform.timeElapsed + " ms - testCase failed - "
                    + testCase.name + "\n" + err.message + "\n" + err.stack
                );
                testCase.errStack = (
                    testCase.errStack || err.message + "\n" + err.stack
                );
                // validate errStack is non-empty
                local.assertOrThrow(
                    testCase.errStack,
                    "invalid errStack " + testCase.errStack
                );
            }
            // if tests isDone, then do nothing
            if (testCase.isDone) {
                return;
            }
            testCase.isDone = true;
            if (testCase.status === "pending") {
                testCase.status = "passed";
            }
            // stop testCase timer
            local.timeElapsedPoll(testCase);
            consoleError(
                "testRunDefault - "
                + testPlatform.timeElapsed + " ms - [" + (
                    local.isBrowser
                    ? "browser"
                    : "node"
                ) + " test-case "
                + testPlatform.testCaseList.filter(function (testCase) {
                    return testCase.isDone;
                }).length + " of " + testPlatform.testCaseList.length + " "
                + testCase.status + "] - " + testCase.name
            );
            // if all testCase.isDone, then create test-report
            onParallel();
        };
        testCase = testCase.elem;
        // init timerTimeout
        timerTimeout = setTimeout(
            onError,
            local.timeoutDefault,
            new Error(
                "timeout - " + local.timeoutDefault + " ms - "
                + testCase.name
            )
        );
        // increment number of tests remaining
        onParallel.cnt += 1;
        // try to run testCase
        local.tryCatchOnError(function () {
            // init timeElapsed
            local.timeElapsedPoll(testCase);
            testCase.onTestCase({}, onError);
        }, onError);
    }, function () {
    /*
     * this function will create test-report after all tests isDone
     */
        // update timeElapsed
        local.timeElapsedPoll(testPlatform);
        globalThis.utility2_modeTest = 1;
        //!! local.ajaxProgressUpdate();
        // init domOnEventWindowOnloadTimeElapsed
        if (globalThis.domOnEventWindowOnloadTimeElapsed < 0x10000000000) {
            testPlatform.domOnEventWindowOnloadTimeElapsed = (
                globalThis.domOnEventWindowOnloadTimeElapsed
            );
        }
        // finalize testReport
        local.testReportMerge(testReport);
        // create test-report.json
        delete testReport.coverage;
        local.fsWriteFileWithMkdirpSync(
            local.env.UTILITY2_DIR_BUILD + "/test-report.json",
            JSON.stringify(testReport, undefined, 4)
        );
        // restore console.log
        console.error = consoleError;
        // restore process.exit
        if (processExit) {
            process.exit = processExit;
        }
        // reset utility2_modeTest
        globalThis.utility2_modeTest = 0;
        // save testReport and coverage
        testReport.coverage = globalThis.__coverage__;
        console.timeStamp(globalThis.utility2_testId);
        local.eventListenerEmit("utility2.testRunEnd", testReport);
        // exit with number of tests failed
        if (processExit) {
            process.exit(testReport.testsFailed, testReport);
        }
    });
};

local.throwError = function () {
/*
 * this function will throw new err
 */
    throw new Error();
};

local.timeElapsedPoll = function (opt) {
/*
 * this function will poll (Date.now() - <opt>.timeStart)
 */
    opt.timeStart = opt.timeStart || Date.now();
    opt.timeElapsed = Date.now() - opt.timeStart;
};

local.tryCatchOnError = function (fnc, onError) {
/*
 * this function will run <fnc> in tryCatch block,
 * else call onError with errCaught
 */
    let result;
    // validate onError
    local.assertOrThrow(typeof onError === "function", typeof onError);
    try {
        // reset errCaught
        delete local._debugTryCatchError;
        result = fnc();
        delete local._debugTryCatchError;
        return result;
    } catch (errCaught) {
        // debug errCaught
        local._debugTryCatchError = errCaught;
        return onError(errCaught);
    }
};

local.uiAnimateSlideAccordian = function (elem, elemList, onError) {
/*
 * this function will slideDown <elem>, but slideUp elements in <elemList>
 */
    elemList.forEach(function (elem2) {
        if (elem2 !== elem) {
            local.uiAnimateSlideUp(elem2);
        }
    });
    setTimeout(function () {
        local.uiAnimateSlideDown(elem, onError);
    }, 250);
};

local.uiAnimateSlideDown = function (elem, onError) {
/*
 * this function will slideDown dom-<elem>
 */
    onError = onError || local.noop;
    if (!(
        elem
        && elem.style && elem.style.maxHeight !== "100%"
        && elem.classList && elem.classList.contains("uiAnimateSlide")
    )) {
        onError();
        return;
    }
    elem.style.borderBottom = "";
    elem.style.borderTop = "";
    elem.style.marginBottom = "";
    elem.style.marginTop = "";
    elem.style.maxHeight = 1.5 * globalThis.innerHeight + "px";
    elem.style.paddingBottom = "";
    elem.style.paddingTop = "";
    setTimeout(function () {
        elem.style.maxHeight = "100%";
        onError();
    }, 250);
};

local.uiAnimateSlideUp = function (elem, onError) {
/*
 * this function will slideUp dom-<elem>
 */
    if (!(
        elem
        && elem.style && elem.style.maxHeight !== "0px"
        && elem.classList && elem.classList.contains("uiAnimateSlide")
    )) {
        local.setTimeoutOnError(onError);
        return;
    }
    elem.style.borderBottom = "0";
    elem.style.borderTop = "0";
    elem.style.marginBottom = "0";
    elem.style.marginTop = "0";
    elem.style.maxHeight = "0";
    elem.style.paddingBottom = "0";
    elem.style.paddingTop = "0";
    local.setTimeoutOnError(onError, 250);
};

local.urlJoin = function (aa, bb) {
/*
 * this function will if bb is relative, url-join aa with bb
 */
    // bb is absolute-url
    if ((
        /^\w+?:\/\//
    ).test(bb)) {
        return bb;
    }
    // bb is absolute-url without protocol
    if (bb.slice(0, 2) === "//") {
        return aa.split("/")[0] + bb;
    }
    // bb is absolute-url without host
    if (bb[0] === "/") {
        return aa.split("/").slice(0, 3).join("/") + bb;
    }
    // bb is relative-url
    if (aa.split("/").length < 4) {
        aa += "/";
    }
    return aa.replace((
        /[?#].*?$/
    ), "").replace((
        /[^\/]*?$/
    ), "") + bb;
};

local.urlParse = function (url) {
/*
 * this function will parse <url> according to below spec,
 * with additional query-property
 * https://developer.mozilla.org/en-US/docs/Web/API/URL
 */
    let urlParsed;
    urlParsed = {};
    // try to parse url
    local.tryCatchOnError(function () {
        // resolve host-less url
        if (local.isBrowser) {
            local.serverLocalHost = (
                local.serverLocalHost
                || location.protocol + "//" + location.host
            );
            // resolve absolute path
            if (url[0] === "/") {
                url = local.serverLocalHost + url;
            // resolve relative path
            } else if (!(
                /^\w+?:\/\//
            ).test(url)) {
                url = (
                    local.serverLocalHost
                    + location.pathname.replace((
                        /\/[^\/]*?$/
                    ), "") + "/" + url
                );
            }
            urlParsed = new globalThis.URL(url);
            urlParsed.path = (
                "/" + urlParsed.href.split("/").slice(3).join("/").split("#")[0]
            );
        } else {
            process.env.PORT = process.env.PORT || "8081";
            local.serverLocalHost = (
                local.serverLocalHost
                || ("http://127.0.0.1:" + process.env.PORT)
            );
            // resolve absolute path
            if (url[0] === "/") {
                url = local.serverLocalHost + url;
            // resolve relative path
            } else if (!(
                /^\w+?:\/\//
            ).test(url)) {
                url = local.serverLocalHost + "/" + url;
            }
            urlParsed = require("url").parse(url);
        }
        // init query
        urlParsed.query = {};
        local.coalesce(urlParsed.search, "").slice(1).replace((
            /[^&]+/g
        ), function (item) {
            item = item.split("=");
            item[0] = decodeURIComponent(item[0]);
            item[1] = decodeURIComponent(item.slice(1).join("="));
            // parse repeating query-param as an array
            if (urlParsed.query[item[0]]) {
                if (!Array.isArray(urlParsed.query[item[0]])) {
                    urlParsed.query[item[0]] = [
                        urlParsed.query[item[0]]
                    ];
                }
                urlParsed.query[item[0]].push(item[1]);
            } else {
                urlParsed.query[item[0]] = item[1];
            }
            return "";
        });
        urlParsed.basename = urlParsed.pathname.replace((
            /^.*\//
        ), "");
    }, local.noop);
    // https://developer.mozilla.org/en/docs/Web/API/URL#Properties
    return {
        basename: urlParsed.basename || "",
        hash: urlParsed.hash || "",
        host: urlParsed.host || "",
        hostname: urlParsed.hostname || "",
        href: urlParsed.href || "",
        path: urlParsed.path || "",
        pathname: urlParsed.pathname || "",
        port: urlParsed.port || "",
        protocol: urlParsed.protocol || "",
        query: urlParsed.query || {},
        search: urlParsed.search || ""
    };
};

local.uuid4Create = function () {
/*
 * this function will create random uuid,
 * with format 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
 */
    // code derived from http://jsperf.com/uuid4
    let id;
    let ii;
    id = "";
    ii = 0;
    while (ii < 32) {
        switch (ii) {
        case 8:
        case 20:
            id += "-";
            // coerce to finite integer
            id += local.identity((Math.random() * 16) | 0).toString(16);
            break;
        case 12:
            id += "-";
            id += "4";
            break;
        case 16:
            id += "-";
            id += local.identity((Math.random() * 4) | 8).toString(16);
            break;
        default:
            // coerce to finite integer
            id += local.identity((Math.random() * 16) | 0).toString(16);
        }
        ii += 1;
    }
    return id;
};
}());


/* istanbul ignore next */
// run shared js-env code - init-after
(function () {
local.apidocCreate = local.apidoc.apidocCreate;
local.browserTest({
    modeTestReportCreate: true
});
local.env = (typeof process === "object" && process && process.env) || {};
local.objectAssignDefault(local.env, {
    npm_package_nameLib: local.coalesce(
        local.env.npm_package_name,
        ""
    ).replace((
        /\W/g
    ), "_")
});
local.objectAssignDefault(local.env, {
    npm_package_description: "the greatest app in the world!",
    npm_package_name: "my-app-lite",
    npm_package_nameLib: "my_app",
    npm_package_version: "0.0.1"
});
local.istanbulCoverageMerge = local.istanbul.coverageMerge || local.identity;
// cbranch-no cstat-no fstat-no missing-if-branch
local.istanbulCoverageReportCreate = (
    local.istanbul.coverageReportCreate || local.identity
);
local.istanbulInstrumentInPackage = (
    local.istanbul.instrumentInPackage || local.identity
);
local.istanbulInstrumentSync = local.istanbul.instrumentSync || local.identity;
local.jslintAndPrint = local.jslint.jslintAndPrint || local.identity;
local.regexpCharsetEncodeUri = (
    /\w!#\$%&'\(\)\*\+,-\.\/:;=\?@~/
);
local.regexpCharsetEncodeUriComponent = (
    /\w!%'\(\)\*-\.~/
);
// https://github.com/chjj/marked/blob/v0.3.7/lib/marked.js#L499
local.regexpMatchUrl = (
    /\bhttps?:\/\/[^\s<]+[^<.,:;"')\]\s]/
);
// https://www.w3.org/TR/html5/sec-forms.html#email-state-typeemail
local.regexpValidateEmail = (
    /^[a-zA-Z0-9.!#$%&'*+\/=?\^_`{|}~\-]+@[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$/
);
// https://en.wikipedia.org/wiki/E.164
local.regexpValidatePhone = (
    /^(?:\+\d{1,3}[\u0020\-]?)?(?:\(\d{1,4}\)[\u0020\-]?)?\d[\d\u0020\-]{7,17}$/
);
local.regexpValidateUuid = (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
);
local.stringCharsetAscii = (
    "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007"
    + "\b\t\n\u000b\f\r\u000e\u000f"
    + "\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017"
    + "\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f"
    + " !\"#$%&'()*+,-./0123456789:;<=>?"
    + "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_"
    + "`abcdefghijklmnopqrstuvwxyz{|}~\u007f"
);
local.stringCharsetEncodeUri = (
    "!#$%&'()*+,-./"
    + "0123456789:;=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~"
);
local.stringCharsetEncodeUriComponent = (
    "!%'()*-."
    + "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~"
);
local.stringHelloEmoji = "hello \ud83d\ude01\n";
// init serverLocalHost
local.urlParse("");
// init timeoutDefault
local.timeoutDefault = local.env.npm_config_timeout_default;
String(
    (typeof location === "object" && location && location.search) || ""
).replace((
    /\b(NODE_ENV|mode[A-Z]\w+?|timeExit|timeoutDefault)=([^&#]+)/g
), function (match0, key, val) {
    local[key] = decodeURIComponent(val);
    local.env[key] = local[key];
    // try to JSON.parse string
    try {
        local[key] = JSON.parse(match0);
    } catch (ignore) {}
    return "";
});
/* validateLineSortedReset */
// init timeExit
local.timeExit = (
    Number(local.env.npm_config_time_exit) || local.timeExit
    || Number(Date.now() + Number(local.env.npm_config_timeout_exit))
);
if (local.timeExit) {
    local.timeoutDefault = local.timeExit - Date.now();
    setTimeout(
        typeof process === "object" && process && process.exit,
        local.timeoutDefault
    );
}
// re-init timeoutDefault
local.timeoutDefault = Number(local.timeoutDefault) || 30000;
globalThis.utility2_onReadyAfter = (
    globalThis.utility2_onReadyAfter || function (onError) {
    /*
     * this function will call onError when utility2_onReadyBefore.cnt === 0
     */
        globalThis.utility2_onReadyBefore.cnt += 1;
        local.eventListenerAdd("utility2_onReadyAfter", onError, {
            once: true
        });
        setTimeout(globalThis.utility2_onReadyBefore);
        return onError;
    }
);
globalThis.utility2_onReadyBefore = (
    globalThis.utility2_onReadyBefore || local.onParallel(function (err) {
    /*
     * this function will keep track of utility2_onReadyBefore.cnt
     */
        local.eventListenerEmit("utility2_onReadyAfter", err);
    })
);
globalThis.utility2_onReadyAfter(local.noop);
}());


// run browser js-env code - init-after
(function () {
if (!local.isBrowser) {
    return;
}
// require modules
local.http = local._http;
}());


/* istanbul ignore next */
// run node js-env code - init-after
(function () {
if (local.isBrowser) {
    return;
}
local.http = require("http");
/* validateLineSortedReset */
local.Module = require("module");
// init env
local.objectAssignDefault(process.env, {
    UTILITY2_DIR_BUILD: require("path").resolve(".tmp/build")
});
// merge previous test-report
if (process.env.npm_config_mode_test_report_merge) {
    local.testReportMerge(
        globalThis.utility2_testReport,
        local.fsReadFileOrDefaultSync(
            process.env.UTILITY2_DIR_BUILD + "/test-report.json",
            "json",
            {}
        )
    );
    if (process.argv[2] !== "--help") {
        console.error(
            "\n" + process.env.MODE_BUILD + " - merged test-report from file "
            + process.env.UTILITY2_DIR_BUILD + "/test-report.json"
        );
    }
}
// init cli
if (module === require.main && (!globalThis.utility2_rollup || (
    process.argv[2]
    && local.cliDict[process.argv[2]]
    && process.argv[2].indexOf("utility2.") === 0
))) {
    local.cliRun({});
    if (local.cliDict[process.argv[2]]) {
        local.cliDict[process.argv[2]]();
        switch (process.argv[2]) {
        case "--interactive":
        case "-i":
        case "utility2.swaggerValidateFile":
        case "utility2.start":
            break;
        default:
            return;
        }
    }
}
// override assets
if (globalThis.utility2_rollup) {
    local.assetsDict["/assets.utility2.rollup.js"] = (
        require("fs").readFileSync(
            __filename,
            "utf8"
        ).split("\n/* script-end /assets.utility2.rollup.end.js */")[0]
        + "\n/* script-end /assets.utility2.rollup.end.js */\n"
    );
    return;
}
// init assets
[
    "/assets.utility2.example.js",
    "/assets.utility2.html",
    "/assets.utility2.test.js",
    "lib.apidoc.js",
    "lib.istanbul.js",
    "lib.jslint.js",
    "lib.marked.js",
    "lib.utility2.js",
    "test.js"
].forEach(function (key) {
    switch (key) {
    case "/assets.utility2.example.js":
        local.assetsDict[key] = "";
        local.fsReadFileOrDefaultSync(
            __dirname + "/README.md",
            "utf8",
            ""
        ).replace((
            /```javascript([\S\s]*?)```/
        ), function (ignore, match1) {
            local.assetsDict[key] = match1.trim() + "\n";
            return "";
        });
        break;
    case "/assets.utility2.html":
        local.assetsDict[key] = "";
        local.fsReadFileOrDefaultSync(
            __dirname + "/README.md",
            "utf8",
            ""
        ).replace((
            /<!doctype\u0020html>[\S\s]*?<\/html>\\n\\\n/
        ), function (match0) {
            match0 = match0.replace((
                /\\n\\$/gm
            ), "");
            match0 = match0.replace(
                "<script src=\"assets.app.js\"></script>\n",
                (
                    "<script "
                    + "src=\"assets.utility2.rollup.js\"></script>\n"
                    + "<script "
                    + "src=\"assets.utility2.example.js\"></script>\n"
                    + "<script "
                    + "src=\"assets.utility2.test.js\"></script>\n"
                )
            );
            match0 = match0.replace(
                "assets.example.js",
                "assets.utility2.example.js"
            );
            match0 = match0.replace(
                "assets.test.js",
                "assets.utility2.test.js"
            );
            match0 = match0.replace((
                /npm_package_/g
            ), "");
            match0 = match0.replace((
                /<!--\u0020utility2-comment\b([\S\s]*?)\butility2-comment\u0020-->/g
            ), "$1");
            local.assetsDict[key] = local.templateRender(match0, {
                env: local.objectAssignDefault({
                    version: "0.0.1"
                }, require(__dirname + "/package.json")),
                isRollup: true
            });
            return "";
        });
        break;
    case "/assets.utility2.test.js":
        local.assetsDict[key] = local.fsReadFileOrDefaultSync(
            __dirname + "/test.js",
            "utf8",
            ""
        );
        break;
    case "lib.utility2.js":
        key = key.replace("lib.", "");
        local.assetsDict["/assets." + key] = local.fsReadFileOrDefaultSync(
            __dirname + "/lib." + key,
            "utf8",
            ""
        ).replace((
            /^#!\//
        ), "// ");
        break;
    default:
        local.assetsDict["/assets.utility2." + key] = (
            local.fsReadFileOrDefaultSync(
                __dirname + "/" + key,
                "utf8",
                ""
            ).replace((
                /^#!\//
            ), "// ")
        );
    }
});
local.assetsDict["/assets.utility2.rollup.js"] = [
    "header",
    "/assets.utility2.rollup.start.js",
    "lib.apidoc.js",
    "lib.istanbul.js",
    "lib.jslint.js",
    "lib.marked.js",
    "lib.utility2.js",
    "/assets.utility2.example.js",
    "/assets.utility2.html",
    "/assets.utility2.lib.jslint.js",
    "/assets.utility2.test.js",
    "/assets.utility2.rollup.end.js"
].map(function (key) {
    let code;
    switch (key) {
    case "/assets.utility2.example.js":
    case "/assets.utility2.html":
    case "/assets.utility2.lib.jslint.js":
    case "/assets.utility2.test.js":
        // disable $-escape in replacement-string
        code = local.assetsDict[
            "/assets.utility2.rollup.content.js"
        ].replace("/* utility2.rollup.js content */", function () {
            return (
                "local.assetsDict[\"" + key + "\"] = (\n"
                + JSON.stringify(local.assetsDict[key]).replace((
                    /\\\\/g
                ), "\u0000").replace((
                    /\\n/g
                ), "\\n\\\n").replace((
                    /\u0000/g
                ), "\\\\")
                + ");\n"
            );
        });
        break;
    case "/assets.utility2.rollup.start.js":
    case "/assets.utility2.rollup.end.js":
        code = local.assetsDict[key];
        break;
    case "header":
        return (
            "/* this rollup was created with utility2\n"
            + " * https://github.com/kaizhu256/node-utility2\n"
            + " */\n"
        );
    case "lib.utility2.js":
        key = "/assets." + key.replace("lib.", "");
        code = local.assetsDict[key];
        break;
    default:
        key = "/assets.utility2." + key;
        code = local.assetsDict[key];
    }
    return (
        "/* script-begin " + key + " */\n"
        + code.trim()
        + "\n/* script-end " + key + " */\n"
    );
}).join("\n\n\n");
}());
}());
