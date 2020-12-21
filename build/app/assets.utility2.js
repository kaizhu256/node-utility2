// usr/bin/env node
/*
 * lib.utility2.js (2020.12.3)
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
    let isEnvNode;
    let local;
    // init debugInline
    if (!globalThis.debugInline) {
        let consoleError;
        consoleError = console.error;
        globalThis.debugInline = function (...argList) {
        /*
         * this function will both print <argList> to stderr and
         * return <argList>[0]
         */
            consoleError("\n\ndebugInline");
            consoleError(...argList);
            consoleError("\n");
            return argList[0];
        };
    }
    // init isEnvNode
    isEnvNode = (
        typeof process === "object" && process &&
        process.versions && typeof process.versions.node === "string"
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
                msg &&
                typeof msg.message === "string" &&
                typeof msg.stack === "string"
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
    function documentQuerySelectorAll(selector) {
    /*
     * this function will return document.querySelectorAll(<selector>) or
     * empty list if function is not available
     */
        return Array.from(
            (
                typeof document === "object" && document &&
                typeof document.querySelectorAll === "function"
            )
            ? document.querySelectorAll(selector)
            : []
        );
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
     * this function will if items from <tgt> are null, undefined, or
     * "", then overwrite them with items from <src>
     */
        function recurse(tgt, src, depth) {
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
                    depth !== 0 &&
                    typeof aa === "object" && aa && !Array.isArray(aa) &&
                    typeof bb === "object" && bb && !Array.isArray(bb)
                ) {
                    recurse(aa, bb, depth - 1);
                }
            });
        }
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
    // init local
    local = {
        assertJsonEqual,
        assertOrThrow,
        documentQuerySelectorAll,
        identity,
        isEnvNode,
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
    globalThis.utility2_rollup ||
    // globalThis.utility2_rollup_old ||
    // require("./assets.utility2.rollup.js") ||
    globalThis.globalLocal
);
// init exports
if (local.isEnvNode) {
    module.exports = local;
    module.exports.__dirname = __dirname;
} else {
    globalThis.utility2_utility2 = local;
}
// init lib main
local.utility2 = local;


/* validateLineSortedReset */
// bug-workaround - throw unhandledRejections in node-process
if (
    typeof process === "object" && process &&
    typeof process.on === "function" &&
    !process.unhandledRejections
) {
    process.unhandledRejections = "throw";
    process.on("unhandledRejection", function (err) {
        throw err;
    });
}
}());


(function () {
// init lib utility2
globalThis.utility2 = local;


// run shared js-env code - state
(function () {
    let packageJson;
    let state;
    // init state - default
    state = {
        apidocCreate: local.identity,
        coverageMerge: local.identity,
        coverageReportCreate: local.identity,
        instrumentInPackage: local.identity,
        jslintAndPrint: local.identity,
        jslintAndPrintDir: local.identity,
        npm_config_timeout: 30000,
        npm_package_description: "the greatest app in the world!",
        npm_package_name: "my-app",
        npm_package_version: "0.0.1"
    };
    // init state - utility2_state
    state = Object.assign(state, globalThis.utility2_state);
    // init state - package.json
    try {
        packageJson = JSON.parse(require("fs").readFileSync("package.json"));
        Object.entries(packageJson).forEach(function ([
            key, val
        ]) {
            state["npm_package_" + key] = String(val);
        });
        packageJson.repository.url.replace((
            /https:\/\/github\.com\/([^\/]+?\/[^.]+)/
        ), function (ignore, match1) {
            state.GITHUB_FULLNAME = match1;
            return "";
        });
    } catch (ignore) {}
    // init state - process.env
    state = Object.assign(
        state,
        (typeof process === "object" && process && process.env)
    );
    // init state - location.search
    if (
        typeof location === "object" && location &&
        typeof location.search === "string"
    ) {
        location.search.replace((
            /\b(npm_config_mode_test|npm_config_mode_test_case|npm_config_timeout)=([^&#]+)/g
        ), function (ignore, key, val) {
            state[key] = decodeURIComponent(val);
            return "";
        });
    }
    // init state - misc
    state = Object.assign({
        GITHUB_OWNER: String(state.GITHUB_FULLNAME).split("/")[0],
        GITHUB_REPO: String(state.GITHUB_FULLNAME).split("/")[1],
        UTILITY2_DIR_BUILD: (
            local.isEnvNode
            ? require("path").resolve(".tmp/build")
            : "/"
        ),
        npm_config_mode_test_case: "",
        npm_package_nameLib: String(state.npm_package_name).replace((
            /\W/g
        ), "_")
    }, state);
    state.npm_config_timeout |= 0;
    // init lib extra
    [
        "apidoc",
        "dummy",
        // cbranch-no cstat-no fstat-no missing-if-branch
        "istanbul",
        "jslint",
        "marked"
    ].forEach(function (key) {
        try {
            local[key] = (
                local.isEnvNode
                ? require("./lib." + key + ".js")
                : globalThis["utility2_" + key]
            );
        } catch (errCaught) {
            local.assertOrThrow(
                errCaught.code === "MODULE_NOT_FOUND",
                errCaught
            );
        }
        local[key] = local[key] || {};
        Object.assign(state, local[key]);
    });
    [
        "coverageReportCreate",
        "jslintAndPrintDir",
        "CI_BRANCH",
        "CI_COMMIT_ID",
        "CI_COMMIT_MESSAGE",
        "CI_HOST",
        "GITHUB_FULLNAME",
        "GITHUB_OWNER",
        "GITHUB_REPO",
        "HOME",
        "MODE_CI",
        "PATH",
        "PORT",
        "UTILITY2_DIR_BUILD",
        "apidocCreate",
        "coverageMerge",
        "instrumentInPackage",
        "jslintAndPrint",
        "npm_config_mode_auto_restart",
        "npm_config_mode_lib",
        "npm_config_mode_start",
        "npm_config_mode_test",
        "npm_config_mode_test_case",
        "npm_config_mode_test_report_merge",
        "npm_config_timeout",
        "npm_config_timeout_exit",
        "npm_package_description",
        "npm_package_homepage",
        "npm_package_main",
        "npm_package_name",
        "npm_package_nameHeroku",
        "npm_package_nameLib",
        "npm_package_nameOriginal",
        "npm_package_version"
    ].forEach(function (key) {
        local[key] = state[key];
    });
}());
let {
    assertJsonEqual,
    assertOrThrow,
    documentQuerySelectorAll,
    isEnvNode,
    noop,
    onErrorThrow,
    CI_BRANCH,
    CI_COMMIT_ID,
    CI_COMMIT_MESSAGE,
    CI_HOST,
    GITHUB_FULLNAME,
    GITHUB_OWNER,
    GITHUB_REPO,
    HOME,
    MODE_CI,
    PATH,
    PORT,
    UTILITY2_DIR_BUILD,
    apidocCreate,
    coverageMerge,
    instrumentInPackage,
    jslintAndPrint,
    npm_config_mode_auto_restart,
    npm_config_mode_lib,
    npm_config_mode_start,
    npm_config_mode_test,
    npm_config_mode_test_case,
    npm_config_mode_test_report_merge,
    npm_config_timeout,
    npm_config_timeout_exit,
    npm_package_description,
    npm_package_homepage,
    npm_package_main,
    npm_package_name,
    npm_package_nameHeroku,
    npm_package_nameLib,
    npm_package_nameOriginal,
    npm_package_version
} = local;


/* validateLineSortedReset */
// run shared js-env code - assetsDict
local.assetsDict = local.assetsDict || {};
local.assetsDict["/assets.utility2.header.js"] = (
    "// assets.utility2.header.js - start\n" +
    "/* jslint utility2:true */\n" +
    "/* istanbul ignore next */\n" +
    "// run shared js\u002denv code - init-local\n" +
    "(function () {\n" +
    "    \"use strict\";\n" +
    "    let isEnvNode;\n" +
    "    let local;\n" +
    "    // init debugInline\n" +
    "    if (!globalThis.debugInline) {\n" +
    "        let consoleError;\n" +
    "        consoleError = console.error;\n" +
    "        globalThis.debugInline = function (...argList) {\n" +
    "        /*\n" +
    "         * this function will both print <argList> to stderr and\n" +
    "         * return <argList>[0]\n" +
    "         */\n" +
    "            consoleError(\"\\n\\ndebugInline\");\n" +
    "            consoleError(...argList);\n" +
    "            consoleError(\"\\n\");\n" +
    "            return argList[0];\n" +
    "        };\n" +
    "    }\n" +
    "    // init isEnvNode\n" +
    "    isEnvNode = (\n" +
    "        typeof process === \"object\" && process &&\n" +
    "        process.versions && typeof process.versions.node === " +
    "\"string\"\n" +
    "    );\n" +
    "    // init function\n" +
    "    function objectDeepCopyWithKeysSorted(obj) {\n" +
    "    /*\n" +
    "     * this function will recursively deep-copy <obj> with keys sorted\n" +
    "     */\n" +
    "        let sorted;\n" +
    "        if (typeof obj !== \"object\" || !obj) {\n" +
    "            return obj;\n" +
    "        }\n" +
    "        // recursively deep-copy list with child-keys sorted\n" +
    "        if (Array.isArray(obj)) {\n" +
    "            return obj.map(objectDeepCopyWithKeysSorted);\n" +
    "        }\n" +
    "        // recursively deep-copy obj with keys sorted\n" +
    "        sorted = {};\n" +
    "        Object.keys(obj).sort().forEach(function (key) {\n" +
    "            sorted[key] = objectDeepCopyWithKeysSorted(obj[key]);\n" +
    "        });\n" +
    "        return sorted;\n" +
    "    }\n" +
    "    function assertJsonEqual(aa, bb) {\n" +
    "    /*\n" +
    "     * this function will assert JSON.stringify(<aa>) === " +
    "JSON.stringify(<bb>)\n" +
    "     */\n" +
    "        aa = JSON.stringify(objectDeepCopyWithKeysSorted(aa));\n" +
    "        bb = JSON.stringify(objectDeepCopyWithKeysSorted(bb));\n" +
    "        if (aa !== bb) {\n" +
    "            throw new Error(JSON.stringify(aa) + \" !== \" + " +
    "JSON.stringify(bb));\n" +
    "        }\n" +
    "    }\n" +
    "    function assertOrThrow(passed, msg) {\n" +
    "    /*\n" +
    "     * this function will throw <msg> if <passed> is falsy\n" +
    "     */\n" +
    "        if (passed) {\n" +
    "            return;\n" +
    "        }\n" +
    "        throw (\n" +
    "            (\n" +
    "                msg &&\n" +
    "                typeof msg.message === \"string\" &&\n" +
    "                typeof msg.stack === \"string\"\n" +
    "            )\n" +
    "            // if msg is err, then leave as is\n" +
    "            ? msg\n" +
    "            : new Error(\n" +
    "                typeof msg === \"string\"\n" +
    "                // if msg is string, then leave as is\n" +
    "                ? msg\n" +
    "                // else JSON.stringify(msg)\n" +
    "                : JSON.stringify(msg, undefined, 4)\n" +
    "            )\n" +
    "        );\n" +
    "    }\n" +
    "    function documentQuerySelectorAll(selector) {\n" +
    "    /*\n" +
    "     * this function will return document.querySelectorAll(<selector>) " +
    "or\n" +
    "     * empty list if function is not available\n" +
    "     */\n" +
    "        return Array.from(\n" +
    "            (\n" +
    "                typeof document === \"object\" && document &&\n" +
    "                typeof document.querySelectorAll === \"function\"\n" +
    "            )\n" +
    "            ? document.querySelectorAll(selector)\n" +
    "            : []\n" +
    "        );\n" +
    "    }\n" +
    "    function identity(val) {\n" +
    "    /*\n" +
    "     * this function will return <val>\n" +
    "     */\n" +
    "        return val;\n" +
    "    }\n" +
    "    function noop() {\n" +
    "    /*\n" +
    "     * this function will do nothing\n" +
    "     */\n" +
    "        return;\n" +
    "    }\n" +
    "    function objectAssignDefault(tgt = {}, src = {}, depth = 0) {\n" +
    "    /*\n" +
    "     * this function will if items from <tgt> are null, undefined, or\n" +
    "     * \"\", then overwrite them with items from <src>\n" +
    "     */\n" +
    "        function recurse(tgt, src, depth) {\n" +
    "            Object.entries(src).forEach(function ([\n" +
    "                key, bb\n" +
    "            ]) {\n" +
    "                let aa;\n" +
    "                aa = tgt[key];\n" +
    "                if (aa === undefined || aa === null || aa === \"\") {\n" +
    "                    tgt[key] = bb;\n" +
    "                    return;\n" +
    "                }\n" +
    "                if (\n" +
    "                    depth !== 0 &&\n" +
    "                    typeof aa === \"object\" && aa && " +
    "!Array.isArray(aa) &&\n" +
    "                    typeof bb === \"object\" && bb && " +
    "!Array.isArray(bb)\n" +
    "                ) {\n" +
    "                    recurse(aa, bb, depth - 1);\n" +
    "                }\n" +
    "            });\n" +
    "        }\n" +
    "        recurse(tgt, src, depth | 0);\n" +
    "        return tgt;\n" +
    "    }\n" +
    "    function onErrorThrow(err) {\n" +
    "    /*\n" +
    "     * this function will throw <err> if exists\n" +
    "     */\n" +
    "        if (err) {\n" +
    "            throw err;\n" +
    "        }\n" +
    "    }\n" +
    "    // init local\n" +
    "    local = {\n" +
    "        assertJsonEqual,\n" +
    "        assertOrThrow,\n" +
    "        documentQuerySelectorAll,\n" +
    "        identity,\n" +
    "        isEnvNode,\n" +
    "        local,\n" +
    "        noop,\n" +
    "        objectAssignDefault,\n" +
    "        objectDeepCopyWithKeysSorted,\n" +
    "        onErrorThrow\n" +
    "    };\n" +
    "    globalThis.globalLocal = local;\n" +
    "}());\n" +
    "// assets.utility2.header.js - end\n"
);
local.assetsDict["/assets.utility2.template.html"] = (
    "<!doctype html>\n" +
    "<html lang=\"en\">\n" +
    "<head>\n" +
    "<meta charset=\"utf-8\">\n" +
    "<meta\n" +
    "    content=\"width=device-width, initial-scale=1\"\n" +
    "    name=\"viewport\"\n" +
    ">\n" +
    "<!-- \"assets.utility2.template.html\" -->\n" +
    "<title>{{npm_package_name}} ({{npm_package_version}})</title>\n" +
    "<style>\n" +
    "/* jslint\u0020utility2:true */\n" +
    "/*csslint\n" +
    "*/\n" +
    "/* csslint ignore:start */\n" +
    "*,\n" +
    "*:after,\n" +
    "*:before {\n" +
    "    box-sizing: border-box;\n" +
    "}\n" +
    ".uiAnimateSlide {\n" +
    "    overflow-y: hidden;\n" +
    "    transition:\n" +
    "        max-height ease-in 250ms,\n" +
    "        min-height ease-in 250ms,\n" +
    "        padding-bottom ease-in 250ms,\n" +
    "        padding-top ease-in 250ms;\n" +
    "}\n" +
    "/* csslint ignore:end */\n" +
    "@keyframes uiAnimateSpin {\n" +
    "0% {\n" +
    "    transform: rotate(0deg);\n" +
    "}\n" +
    "100% {\n" +
    "    transform: rotate(360deg);\n" +
    "}\n" +
    "}\n" +
    "a {\n" +
    "    overflow-wrap: break-word;\n" +
    "}\n" +
    "body {\n" +
    "    background: #f7f7f7;\n" +
    "    font-family: Arial, Helvetica, sans-serif;\n" +
    "    font-size: small;\n" +
    "    margin: 0 40px;\n" +
    "}\n" +
    "body > div,\n" +
    "body > input,\n" +
    "body > pre,\n" +
    "body > .button,\n" +
    "body > .textarea {\n" +
    "    margin-bottom: 20px;\n" +
    "    margin-top: 0;\n" +
    "}\n" +
    "body > input,\n" +
    "body > .button {\n" +
    "    width: 20rem;\n" +
    "}\n" +
    "body > .readonly {\n" +
    "    background: #ddd;\n" +
    "}\n" +
    "body > .textarea {\n" +
    "    height: 10rem;\n" +
    "    resize: vertical;\n" +
    "    width: 100%;\n" +
    "}\n" +
    "code,\n" +
    "pre,\n" +
    ".textarea {\n" +
    "    font-family: Consolas, Menlo, monospace;\n" +
    "    font-size: smaller;\n" +
    "}\n" +
    "pre {\n" +
    "    overflow-wrap: break-word;\n" +
    "    white-space: pre-wrap;\n" +
    "}\n" +
    ".button {\n" +
    "    background: #ddd;\n" +
    "    border: 1px solid #999;\n" +
    "    color: #000;\n" +
    "    cursor: pointer;\n" +
    "    display: inline-block;\n" +
    "    padding: 2px 5px;\n" +
    "    text-align: center;\n" +
    "    text-decoration: none;\n" +
    "}\n" +
    ".button:hover {\n" +
    "    background: #bbb;\n" +
    "}\n" +
    ".colorError {\n" +
    "    color: #d00;\n" +
    "}\n" +
    ".textarea {\n" +
    "    background: #fff;\n" +
    "    border: 1px solid #999;\n" +
    "    border-radius: 0;\n" +
    "    cursor: auto;\n" +
    "    overflow: auto;\n" +
    "    padding: 2px;\n" +
    "}\n" +
    ".zeroPixel {\n" +
    "    border: 0;\n" +
    "    height: 0;\n" +
    "    margin: 0;\n" +
    "    padding: 0;\n" +
    "    width: 0;\n" +
    "}\n" +
    "</style>\n" +
    "</head>\n" +
    "<body>\n" +
    "<div class=\"uiAnimateSpin\" style=\"\n" +
    "    animation: uiAnimateSpin 2s linear infinite;\n" +
    "    border-radius: 50%;\n" +
    "    border-top: 5px solid #7d7;\n" +
    "    border: 5px solid #999;\n" +
    "    display: none;\n" +
    "    height: 25px;\n" +
    "    vertical-align: middle;\n" +
    "    width: 25px;\n" +
    "\"></div>\n" +
    "<script>\n" +
    "/* jslint\u0020utility2:true */\n" +
    "(function () {\n" +
    "    \"use strict\";\n" +
    "    // polyfill globalThis\n" +
    "    window.globalThis = window;\n" +
    "    // measure-and-print time-elapsed for window.onload\n" +
    "    if (!window.domOnEventWindowOnloadTimeElapsed) {\n" +
    "        window.domOnEventWindowOnloadTimeElapsed = Date.now() + 100;\n" +
    "        window.addEventListener(\"load\", function () {\n" +
    "            setTimeout(function () {\n" +
    "                window.domOnEventWindowOnloadTimeElapsed = (\n" +
    "                    Date.now() -\n" +
    "                    window.domOnEventWindowOnloadTimeElapsed\n" +
    "                );\n" +
    "                console.error(\n" +
    "                    \"domOnEventWindowOnloadTimeElapsed = \" +\n" +
    "                    window.domOnEventWindowOnloadTimeElapsed\n" +
    "                );\n" +
    "            }, 100);\n" +
    "        });\n" +
    "    }\n" +
    "    // limit select-all within <pre tabIndex=\"0\"> elem\n" +
    "    if (!window.domOnEventSelectAllWithinPre) {\n" +
    "        window.domOnEventSelectAllWithinPre = function (evt) {\n" +
    "            let range;\n" +
    "            let selection;\n" +
    "            if (\n" +
    "                (evt.ctrlKey || evt.metaKey) &&\n" +
    "                evt.key === \"a\" &&\n" +
    "                evt.target.closest(\"pre\")\n" +
    "            ) {\n" +
    "                range = document.createRange();\n" +
    "                range.selectNodeContents(evt.target.closest(\"pre\"));\n" +
    "                selection = window.getSelection();\n" +
    "                selection.removeAllRanges();\n" +
    "                selection.addRange(range);\n" +
    "                evt.preventDefault();\n" +
    "            }\n" +
    "        };\n" +
    "        // handle evt\n" +
    "        document.addEventListener(\n" +
    "            \"keydown\",\n" +
    "            window.domOnEventSelectAllWithinPre\n" +
    "        );\n" +
    "    }\n" +
    "}());\n" +
    "</script>\n" +
    "<h1>\n" +
    "<a href=\"{{npm_package_homepage}}\" target=\"_blank\">\n" +
    "    {{npm_package_name}} ({{npm_package_version}})\n" +
    "</a>\n" +
    "</h1>\n" +
    "<h3>{{npm_package_description}}</h3>\n" +
    "<!-- utility2-comment\n" +
    "<a\n" +
    "    class=\"button\" download href=\"assets.app.js\"\n" +
    ">download standalone app</a><br>\n" +
    "<button\n" +
    "    class=\"button\"\n" +
    "    id=\"buttonTestRun1\"\n" +
    ">run browser-tests</button><br>\n" +
    "<div class=\"uiAnimateSlide\" id=\"htmlTestReport1\" style=\"\n" +
    "    border-bottom: 0;\n" +
    "    border-top: 0;\n" +
    "    margin-bottom: 0;\n" +
    "    margin-top: 0;\n" +
    "    max-height: 0;\n" +
    "    padding-bottom: 0;\n" +
    "    padding-top: 0;\n" +
    "\"></div>\n" +
    "utility2-comment -->\n" +
    "\n" +
    "\n" +
    "<!-- custom-html-start -->\n" +
    "<label>stderr and stdout</label>\n" +
    "<textarea\n" +
    "    class=\"onevent-output-reset readonly textarea\"\n" +
    "    id=\"outputStdout1\"\n" +
    "    readonly\n" +
    "></textarea>\n" +
    "<!-- custom-html-end -->\n" +
    "\n" +
    "\n" +
    "<!-- utility2-comment\n" +
    "<script>\n" +
    "window.utility2_state = {\n" +
    "npm_config_mode_backend: {{npm_config_mode_backend jsonStringify}},\n" +
    "npm_package_description: {{npm_package_description jsonStringify}},\n" +
    "npm_package_homepage: {{npm_package_homepage jsonStringify}},\n" +
    "npm_package_name: {{npm_package_name jsonStringify}},\n" +
    "npm_package_nameLib: {{npm_package_nameLib jsonStringify}},\n" +
    "npm_package_version: {{npm_package_version jsonStringify}}\n" +
    "}\n" +
    "</script>\n" +
    "<script src=\"assets.utility2.rollup.js\"></script>\n" +
    "<script>\n" +
    "/* jslint utility2:true */\n" +
    "window.utility2.onReadyIncrement();\n" +
    "window.addEventListener(\"load\", function () {\n" +
    "    \"use strict\";\n" +
    "    let local;\n" +
    "    function onTestRun({\n" +
    "        msg,\n" +
    "        target,\n" +
    "        type\n" +
    "    }) {\n" +
    "        switch ((target && target.id) || type) {\n" +
    "        case \"buttonTestRun1\":\n" +
    "            window.utility2_modeTest = 1;\n" +
    "            local.testRunDefault(window.local);\n" +
    "            return;\n" +
    "        case \"utility2.testRunEnd\":\n" +
    "            document.querySelectorAll(\n" +
    "                \"#buttonTestRun1\"\n" +
    "            ).forEach(function (elem) {\n" +
    "                elem.textContent = \"run tests\";\n" +
    "            });\n" +
    "            document.querySelectorAll(\n" +
    "                \"#htmlTestReport1\"\n" +
    "            ).forEach(function (elem) {\n" +
    "                elem.innerHTML = msg.html;\n" +
    "            });\n" +
    "            return;\n" +
    "        case \"utility2.testRunStart\":\n" +
    "            document.querySelectorAll(\n" +
    "                \".onevent-output-reset\"\n" +
    "            ).forEach(function (elem) {\n" +
    "                elem.textContent = \"\";\n" +
    "            });\n" +
    "            document.querySelectorAll(\n" +
    "                \"#buttonTestRun1\"\n" +
    "            ).forEach(function (elem) {\n" +
    "                elem.textContent = \"running tests\";\n" +
    "            });\n" +
    "            document.querySelectorAll(\n" +
    "                \"#htmlTestReport1\"\n" +
    "            ).forEach(function (elem) {\n" +
    "                local.uiAnimateSlideDown(elem);\n" +
    "                elem.innerHTML = msg.html;\n" +
    "            });\n" +
    "            return;\n" +
    "        case \"utility2.testRunUpdate\":\n" +
    "            document.querySelectorAll(\n" +
    "                \"#htmlTestReport1\"\n" +
    "            ).forEach(function (elem) {\n" +
    "                local.uiAnimateSlideDown(elem);\n" +
    "                elem.innerHTML = msg.html;\n" +
    "            });\n" +
    "            return;\n" +
    "        }\n" +
    "    }\n" +
    "    local = window.utility2;\n" +
    "    document.querySelectorAll(\n" +
    "        \"#buttonTestRun1\"\n" +
    "    ).forEach(function (elem) {\n" +
    "        elem.addEventListener(\"click\", onTestRun);\n" +
    "    });\n" +
    "    local.eventListenerAdd(\"utility2.testRunEnd\", {}, onTestRun);\n" +
    "    local.eventListenerAdd(\"utility2.testRunUpdate\", {}, onTestRun);\n" +
    "    local.eventListenerAdd(\"utility2.testRunStart\", {}, onTestRun);\n" +
    "    local.onReadyDecrement();\n" +
    "});\n" +
    "</script>\n" +
    "utility2-comment -->\n" +
    "<script src=\"assets.{{npm_package_nameLib}}.js\"></script>\n" +
    "<script src=\"assets.example.js\"></script>\n" +
    "<script src=\"assets.test.js\"></script>\n" +
    "<div style=\"text-align: center;\">\n" +
    "    [\n" +
    "    this app was created with\n" +
    "    <a\n" +
    "        href=\"https://github.com/kaizhu256/node-utility2\"\n" +
    "        target=\"_blank\"\n" +
    "    >utility2</a>\n" +
    "    ]\n" +
    "</div>\n" +
    "</body>\n" +
    "</html>\n"
);
/* validateLineSortedReset */
local.assetsDict["/assets.example.html"] = "";
local.assetsDict["/assets.example.template.js"] = (
    "/*\n" +
    "example.js\n" +
    "\n" +
    "this script will run web-demo of my-app\n" +
    "\n" +
    "instruction\n" +
    "    1. save this script as example.js\n" +
    "    2. run shell-cmd:\n" +
    "        $ npm install my-app && \\\n" +
    "            PORT=8081 node example.js\n" +
    "    3. open browser to http://127.0.0.1:8081 and play with web-demo\n" +
    "    4. edit this script to suit your needs\n" +
    "*/\n" +
    "\n" +
    "\n" +
    "/* istanbul instrument in package my_app */\n" +
    local.assetsDict["/assets.utility2.header.js"] +
    "\n" +
    "\n" +
    "/* jslint utility2:true */\n" +
    "(function (local) {\n" +
    "\"use strict\";\n" +
    "\n" +
    "\n" +
    "// run shared js\u002denv code - init-before\n" +
    "(function () {\n" +
    "// init local\n" +
    "local = (\n" +
    "    globalThis.utility2_rollup ||\n" +
    "    globalThis.utility2_my_app ||\n" +
    "    require(\"my-app\")\n" +
    ");\n" +
    "// init exports\n" +
    "globalThis.local = local;\n" +
    "}());\n" +
    "\n" +
    "\n" +
    "/* istanbul ignore next */\n" +
    "// run browser js\u002denv code - init-test\n" +
    "(function () {\n" +
    "if (local.isEnvNode) {\n" +
    "    return;\n" +
    "}\n" +
    "// log stderr and stdout to #outputStdout1\n" +
    "[\"error\", \"log\"].forEach(function (key) {\n" +
    "    let elem;\n" +
    "    let fnc;\n" +
    "    elem = document.querySelector(\"#outputStdout1\");\n" +
    "    if (!elem) {\n" +
    "        return;\n" +
    "    }\n" +
    "    fnc = console[key];\n" +
    "    console[key] = function (...argList) {\n" +
    "        fnc(...argList);\n" +
    "        // append text to #outputStdout1\n" +
    "        elem.textContent += argList.map(function (arg) {\n" +
    "            return (\n" +
    "                typeof arg === \"string\"\n" +
    "                ? arg\n" +
    "                : JSON.stringify(arg, undefined, 4)\n" +
    "            );\n" +
    "        }).join(\" \").replace((\n" +
    "            /\\u001b\\[\\d+?m/g\n" +
    "        ), \"\") + \"\\n\";\n" +
    "        // scroll textarea to bottom\n" +
    "        elem.scrollTop = elem.scrollHeight;\n" +
    "    };\n" +
    "});\n" +
    "}());\n" +
    "\n" +
    "\n" +
    "/* istanbul ignore next */\n" +
    "// run node js\u002denv code - init-test\n" +
    "(function () {\n" +
    "if (!local.isEnvNode) {\n" +
    "    return;\n" +
    "}\n" +
    "// init exports\n" +
    "module.exports = local;\n" +
    "// init assetsDict\n" +
    "local.assetsDict = local.assetsDict || {};\n" +
    "local.assetsDict[\"/assets.my_app.js\"] = (\n" +
    "    local.assetsDict[\"/assets.my_app.js\"] ||\n" +
    "    require(\"fs\").readFileSync(\n" +
    "        require(\"path\").resolve(local.__dirname + " +
    "\"/lib.my_app.js\"),\n" +
    "        \"utf8\"\n" +
    "    ).replace((\n" +
    "        /^#!\\//\n" +
    "    ), \"// \")\n" +
    ");\n" +
    "/* validateLineSortedReset */\n" +
    "/* jslint ignore:start */\n" +
    "local.assetsDict[\"/\"] = `" +
    local.assetsDict["/assets.utility2.template.html"].replace((
        /[$\\`]/g
    ), "\\$&") +
    "`;\n" +
    "/* jslint ignore:end */\n" +
    "local.assetsDict[\"/assets.example.html\"] = local.assetsDict[\"/\"];\n" +
    "// init cli\n" +
    "if (module !== require.main || globalThis.utility2_rollup) {\n" +
    "    return;\n" +
    "}\n" +
    "local.assetsDict[\"/assets.example.js\"] = (\n" +
    "    local.assetsDict[\"/assets.example.js\"] ||\n" +
    "    require(\"fs\").readFileSync(__filename, \"utf8\")\n" +
    ");\n" +
    "local.assetsDict[\"/favicon.ico\"] = " +
    "local.assetsDict[\"/favicon.ico\"] || \"\";\n" +
    "local.assetsDict[\"/index.html\"] = local.assetsDict[\"/\"];\n" +
    "// if $npm_config_timeout_exit exists,\n" +
    "// then exit this process after $npm_config_timeout_exit ms\n" +
    "if (process.env.npm_config_timeout_exit) {\n" +
    "    setTimeout(\n" +
    "        process.exit.bind(undefined, 15),\n" +
    "        process.env.npm_config_timeout_exit | 0\n" +
    "    ).unref();\n" +
    "}\n" +
    "// start server\n" +
    "if (globalThis.utility2_serverHttp1) {\n" +
    "    return;\n" +
    "}\n" +
    "process.env.PORT = process.env.PORT || \"8081\";\n" +
    "console.error(\"http-server listening on port \" + process.env.PORT);\n" +
    "require(\"http\").createServer(function (req, res) {\n" +
    "    let data;\n" +
    "    data = local.assetsDict[require(\"url\").parse(req.url).pathname];\n" +
    "    if (data !== undefined) {\n" +
    "        res.end(data);\n" +
    "        return;\n" +
    "    }\n" +
    "    res.statusCode = 404;\n" +
    "    res.end();\n" +
    "}).listen(process.env.PORT);\n" +
    "}());\n" +
    "}());\n"
);
local.assetsDict["/assets.my_app.template.js"] = (
    "#!/usr/bin/env node\n" +
    "/*\n" +
    " * lib.my_app.js ({{npm_package_version}})\n" +
    " * https://github.com/kaizhu256/node-my-app\n" +
    " * {{npm_package_description}}\n" +
    " *\n" +
    " */\n" +
    "\n" +
    "\n" +
    "/* istanbul instrument in package my_app */\n" +
    local.assetsDict["/assets.utility2.header.js"] +
    "\n" +
    "\n" +
    "(function (local) {\n" +
    "\"use strict\";\n" +
    "\n" +
    "\n" +
    "/* istanbul ignore next */\n" +
    "// run shared js\u002denv code - init-before\n" +
    "(function () {\n" +
    "// init local\n" +
    "local = (\n" +
    "    globalThis.utility2_rollup ||\n" +
    "    // globalThis.utility2_rollup_old ||\n" +
    "    // require(\"./assets.utility2.rollup.js\") ||\n" +
    "    globalThis.globalLocal\n" +
    ");\n" +
    "// init exports\n" +
    "if (local.isEnvNode) {\n" +
    "    module.exports = local;\n" +
    "    module.exports.__dirname = __dirname;\n" +
    "} else {\n" +
    "    globalThis.utility2_my_app = local;\n" +
    "}\n" +
    "// init lib main\n" +
    "local.my_app = local;\n" +
    "\n" +
    "\n" +
    "/* validateLineSortedReset */\n" +
    "return;\n" +
    "}());\n" +
    "}());\n"
);
local.assetsDict["/assets.readme.template.md"] = String(
    "# my-app\n" +
    "the greatest app in the world!\n" +
    "\n" +
    "# live web demo\n" +
    "- [{{app.io}}/build..beta..github.com/app]" +
    "({{app.io}}/build..beta..github.com/app)\n" +
    "\n" +
    "[![screenshot]" +
    "({{app.io}}/build/screenshot.deployGithub.{{app.png}})]" +
    "({{app.io}}/build..beta..github.com/app)\n" +
    "\n" +
    "\n" +
    "[![github.com ci-status]" +
    "(https://github.com/kaizhu256/node-my-app/workflows/" +
    "Node.js%20CI/badge.svg)]" +
    "(https://github.com/kaizhu256/node-my-app/actions) " +
    "[![coverage]" +
    "({{app.io}}/build/coverage/coverage.badge.svg)]" +
    "({{app.io}}/build/coverage/index.html)\n" +
    "\n" +
    "[![NPM]" +
    "(https://nodei.co/npm/my-app.png?downloads=true)]" +
    "(https://www.npmjs.com/package/my-app)\n" +
    "\n" +
    "[![commit status]" +
    "({{app.io}}/build/commit.badge.svg)]" +
    "(https://github.com/kaizhu256/node-my-app/actions)\n" +
    "\n" +
    "| git-branch : | " +
    "[master]" +
    "({{app.com}}/tree/master) | " +
    "[beta]" +
    "({{app.com}}/tree/beta) | " +
    "[alpha]" +
    "({{app.com}}/tree/alpha)|\n" +
    "|--:|:--|:--|:--|\n" +
    "| test-server-github : | " +
    "[![github.com test-server]" +
    "({{app.io}}/GitHub-Mark-32px.png)]" +
    "({{app.io}}/build..master..github.com/app) | " +
    "[![github.com test-server]" +
    "({{app.io}}/GitHub-Mark-32px.png)]" +
    "({{app.io}}/build..beta..github.com/app) | " +
    "[![github.com test-server]" +
    "({{app.io}}/GitHub-Mark-32px.png)]" +
    "({{app.io}}/build..alpha..github.com/app)|\n" +
    "| test-server-heroku : | " +
    "[![heroku.com test-server]" +
    "({{app.io}}/heroku-logo.75x25.png)]" +
    "(https://h1-my-app-master.herokuapp.com) | " +
    "[![heroku.com test-server]" +
    "({{app.io}}/heroku-logo.75x25.png)]" +
    "(https://h1-my-app-beta.herokuapp.com) | " +
    "[![heroku.com test-server]" +
    "({{app.io}}/heroku-logo.75x25.png)]" +
    "(https://h1-my-app-alpha.herokuapp.com)|\n" +
    "| test-report : | " +
    "[![test-report]" +
    "({{app.io}}/build..master..github.com/test-report.badge.svg)]" +
    "({{app.io}}/build..master..github.com/test-report.html) | " +
    "[![test-report]" +
    "({{app.io}}/build..beta..github.com/test-report.badge.svg)]" +
    "({{app.io}}/build..beta..github.com/test-report.html) | " +
    "[![test-report]" +
    "({{app.io}}/build..alpha..github.com/test-report.badge.svg)]" +
    "({{app.io}}/build..alpha..github.com/test-report.html)|\n" +
    "| coverage : | " +
    "[![coverage]" +
    "({{app.io}}/build..master..github.com/coverage/coverage.badge.svg)]" +
    "({{app.io}}/build..master..github.com/coverage/index.html) | " +
    "[![coverage]" +
    "({{app.io}}/build..beta..github.com/coverage/coverage.badge.svg)]" +
    "({{app.io}}/build..beta..github.com/coverage/index.html) | " +
    "[![coverage]" +
    "({{app.io}}/build..alpha..github.com/coverage/coverage.badge.svg)]" +
    "({{app.io}}/build..alpha..github.com/coverage/index.html)|\n" +
    "| build-artifacts : | " +
    "[![build-artifacts]" +
    "({{app.io}}/glyphicons_144_folder_open.png)]" +
    "({{app.com}}/tree/gh-pages/build..master..github.com) | " +
    "[![build-artifacts]" +
    "({{app.io}}/glyphicons_144_folder_open.png)]" +
    "({{app.com}}/tree/gh-pages/build..beta..github.com) | " +
    "[![build-artifacts]" +
    "({{app.io}}/glyphicons_144_folder_open.png)]" +
    "({{app.com}}/tree/gh-pages/build..alpha..github.com)|\n" +
    "\n" +
    "[![npmPackageListing]" +
    "({{app.io}}/build/screenshot.npmPackageListing.svg)]" +
    "({{app.com}})\n" +
    "\n" +
    "![npmPackageDependencyTree]" +
    "({{app.io}}/build/screenshot.npmPackageDependencyTree.svg)\n" +
    "\n" +
    "\n" +
    "# table of contents\n" +
    "\n" +
    "\n" +
    "# cdn download\n" +
    "- [{{app.io}}/build..beta..github.com/app/assets.my_app.js]" +
    "({{app.io}}/build..beta..github.com/app/assets.my_app.js)\n" +
    "\n" +
    "\n" +
    "# documentation\n" +
    "#### api doc\n" +
    "- [{{app.io}}/build..beta..github.com/apidoc.html]" +
    "({{app.io}}/build..beta..github.com/apidoc.html)\n" +
    "\n" +
    "[![apidoc]" +
    "({{app.io}}/build/{{screenshot}}apidoc.html.png)]" +
    "({{app.io}}/build..beta..github.com/apidoc.html)\n" +
    "\n" +
    "#### cli help\n" +
    "![screenshot]" +
    "({{app.io}}/build/screenshot.npmPackageCliHelp.svg)\n" +
    "\n" +
    "#### changelog 0.0.1\n" +
    "- update build\n" +
    "- none\n" +
    "\n" +
    "#### todo\n" +
    "- none\n" +
    "\n" +
    "\n" +
    "# quickstart standalone app\n" +
    "#### to run this example, follow instruction in script below\n" +
    "- [assets.app.js]" +
    "({{app.io}}/build..beta..github.com/app/assets.app.js)\n" +
    "```shell\n" +
    "# example.sh\n" +
    "\n" +
    "# this shell script will download and run web-demo of my-app " +
    "as standalone app\n" +
    "\n" +
    "# 1. download standalone app\n" +
    "curl -O {{app.io}}/build..beta..github.com/app/assets.app.js\n" +
    "# 2. run standalone app\n" +
    "PORT=8081 node ./assets.app.js\n" +
    "# 3. open browser to http://127.0.0.1:8081 and play with web-demo\n" +
    "# 4. edit file assets.app.js to suit your needs\n" +
    "```\n" +
    "\n" +
    "#### output from browser\n" +
    "[![screenshot]" +
    "({{app.io}}/build/screenshot.readmeEvalExampleSh.browser.%252F.png)]" +
    "({{app.io}}/build/app/assets.example.html)\n" +
    "\n" +
    "#### output from shell\n" +
    "![screenshot]" +
    "({{app.io}}/build/screenshot.readmeEvalExampleSh.svg)\n" +
    "\n" +
    "\n" +
    "# quickstart example.js\n" +
    "[![screenshot]" +
    "({{app.io}}/build/screenshot.readmeEvalExampleJs.browser.%252F.png)]" +
    "({{app.io}}/build/app/assets.example.html)\n" +
    "\n" +
    "#### to run this example, follow instruction in script below\n" +
    "- [example.js]" +
    "({{app.io}}/build..beta..github.com/example.js)\n" +
    "```javascript\n" +
    local.assetsDict["/assets.example.template.js"] +
    "```\n" +
    "\n" +
    "#### output from browser\n" +
    "[![screenshot]" +
    "({{app.io}}/build/screenshot.readmeEvalExampleJs.browser.%252F.png)]" +
    "({{app.io}}/build/app/assets.example.html)\n" +
    "\n" +
    "#### output from shell\n" +
    "![screenshot]" +
    "({{app.io}}/build/screenshot.readmeEvalExampleJs.svg)\n" +
    "\n" +
    "\n" +
    "# extra screenshots\n" +
    "1. [{{app.io}}/build/{{screenshot}}apidoc.html.png]" +
    "({{app.io}}/build/{{screenshot}}apidoc.html.png)\n" +
    "[![screenshot]" +
    "({{app.io}}/build/{{screenshot}}apidoc.html.png)]" +
    "({{app.io}}/build/{{screenshot}}apidoc.html.png)\n" +
    "\n" +
    "1. [{{app.io}}/build/{{screenshot}}coverage.lib.html.png]" +
    "({{app.io}}/build/{{screenshot}}coverage.lib.html.png)\n" +
    "[![screenshot]" +
    "({{app.io}}/build/{{screenshot}}coverage.lib.html.png)]" +
    "({{app.io}}/build/{{screenshot}}coverage.lib.html.png)\n" +
    "\n" +
    "1. [{{app.io}}/build/{{screenshot}}test-report.html.png]" +
    "({{app.io}}/build/{{screenshot}}test-report.html.png)\n" +
    "[![screenshot]" +
    "({{app.io}}/build/{{screenshot}}test-report.html.png)]" +
    "({{app.io}}/build/{{screenshot}}test-report.html.png)\n" +
    "\n" +
    "1. [{{app.io}}/build/screenshot.deployGithub.{{app.png}}]" +
    "({{app.io}}/build/screenshot.deployGithub.{{app.png}})\n" +
    "[![screenshot]" +
    "({{app.io}}/build/screenshot.deployGithub.{{app.png}})]" +
    "({{app.io}}/build/screenshot.deployGithub.{{app.png}})\n" +
    "\n" +
    "1. [{{app.io}}/build/screenshot.deployGithubTest.{{app.png}}]" +
    "({{app.io}}/build/screenshot.deployGithubTest.{{app.png}})\n" +
    "[![screenshot]" +
    "({{app.io}}/build/screenshot.deployGithubTest.{{app.png}})]" +
    "({{app.io}}/build/screenshot.deployGithubTest.{{app.png}})\n" +
    "\n" +
    "1. [{{app.io}}/build/screenshot.deployHeroku.browser.%252F.png]" +
    "({{app.io}}/build/screenshot.deployHeroku.browser.%252F.png)\n" +
    "[![screenshot]" +
    "({{app.io}}/build/screenshot.deployHeroku.browser.%252F.png)]" +
    "({{app.io}}/build/screenshot.deployHeroku.browser.%252F.png)\n" +
    "\n" +
    "1. [{{app.io}}/build/screenshot.deployHerokuTest.browser.%252F.png]" +
    "({{app.io}}/build/screenshot.deployHerokuTest.browser.%252F.png)\n" +
    "[![screenshot]" +
    "({{app.io}}/build/screenshot.deployHerokuTest.browser.%252F.png)]" +
    "({{app.io}}/build/screenshot.deployHerokuTest.browser.%252F.png)\n" +
    "\n" +
    "1. [{{app.io}}/build/screenshot.npmTest.browser.%252F.png]" +
    "({{app.io}}/build/screenshot.npmTest.browser.%252F.png)\n" +
    "[![screenshot]" +
    "({{app.io}}/build/screenshot.npmTest.browser.%252F.png)]" +
    "({{app.io}}/build/screenshot.npmTest.browser.%252F.png)\n" +
    "\n" +
    "1. [{{app.io}}/build/screenshot.readmeEvalExampleJs.browser.%252F.png]" +
    "({{app.io}}/build/screenshot.readmeEvalExampleJs.browser.%252F.png)\n" +
    "[![screenshot]" +
    "({{app.io}}/build/screenshot.readmeEvalExampleJs.browser.%252F.png)]" +
    "({{app.io}}/build/screenshot.readmeEvalExampleJs.browser.%252F.png)\n" +
    "\n" +
    "1. [{{app.io}}/build/screenshot.readmeEvalExampleSh.browser.%252F.png]" +
    "({{app.io}}/build/screenshot.readmeEvalExampleSh.browser.%252F.png)\n" +
    "[![screenshot]" +
    "({{app.io}}/build/screenshot.readmeEvalExampleSh.browser.%252F.png)]" +
    "({{app.io}}/build/screenshot.readmeEvalExampleSh.browser.%252F.png)\n" +
    "\n" +
    "\n" +
    "# package.json\n" +
    "```json\n" +
    "{\n" +
    "    \"!!jslint_utility2\": true,\n" +
    "    \"author\": \"kai zhu <kaizhu256@gmail.com>\",\n" +
    "    \"description\": \"the greatest app in the world!\",\n" +
    "    \"devDependencies\": {\n" +
    "        \"utility2\": \"kaizhu256/node-utility2#alpha\"\n" +
    "    },\n" +
    "    \"engines\": {\n" +
    "        \"node\": \">=12.0\"\n" +
    "    },\n" +
    "    \"fileCount\": 0,\n" +
    "    \"homepage\": \"{{app.com}}\",\n" +
    "    \"keywords\": [],\n" +
    "    \"license\": \"MIT\",\n" +
    "    \"main\": \"lib.my_app.js\",\n" +
    "    \"name\": \"my-app\",\n" +
    "    \"nameAliasPublish\": \"\",\n" +
    "    \"repository\": {\n" +
    "        \"type\": \"git\",\n" +
    "        \"url\": \"{{app.com}}.git\"\n" +
    "    },\n" +
    "    \"scripts\": {\n" +
    "        \"build-ci\": \"sh npm_scripts.sh\",\n" +
    "        \"env\": \"env\",\n" +
    "        \"eval\": \"sh npm_scripts.sh\",\n" +
    "        \"heroku-postbuild\": \"sh npm_scripts.sh\",\n" +
    "        \"postinstall\": \"sh npm_scripts.sh\",\n" +
    "        \"start\": \"sh npm_scripts.sh\",\n" +
    "        \"test\": \"sh npm_scripts.sh\",\n" +
    "        \"utility2\": \"sh npm_scripts.sh\"\n" +
    "    },\n" +
    "    \"version\": \"0.0.1\"\n" +
    "}\n" +
    "```\n" +
    "\n" +
    "\n" +
    "# changelog of last 50 commits\n" +
    "[![screenshot]" +
    "({{app.io}}/build/screenshot.gitLog.svg)]" +
    "({{app.com}}/commits)\n" +
    "\n" +
    "\n" +
    "# internal build script\n" +
    "- build_ci.sh\n" +
    "```shell\n" +
    "# build_ci.sh\n" +
    "\n" +
    "# this shell script will run build-ci for this package\n" +
    "\n" +
    "shCiAfter () {(set -e\n" +
    "    # shDeployCustom\n" +
    "    shDeployGithub\n" +
    "    # shDeployHeroku\n" +
    "    shReadmeEval example.sh\n" +
    ")}\n" +
    "\n" +
    "shCiBefore () {(set -e\n" +
    "    # shNpmTestPublished\n" +
    "    shReadmeEval example.js\n" +
    ")}\n" +
    "\n" +
    "# run shCiMain\n" +
    "eval \"$(utility2 source)\"\n" +
    "shCiMain\n" +
    "```\n" +
    "\n" +
    "\n" +
    "# misc\n" +
    "- this package was created with [utility2]" +
    "(https://github.com/kaizhu256/node-utility2)\n"
).replace((
    /\{\{app\.com\}\}/g
), "https://github.com/kaizhu256/node-my-app").replace((
    /\{\{app\.io\}\}/g
), "https://kaizhu256.github.io/node-my-app").replace((
    /\{\{app.png\}\}/g
), "browser.%252Fnode-my-app%252Fbuild%252Fapp.png").replace((
    /\{\{screenshot\}\}/g
), "screenshot.ci.browser.%252F.tmp%252Fbuild%252F");
local.assetsDict["/assets.test.template.js"] = (
    "/* istanbul instrument in package my_app */\n" +
    local.assetsDict["/assets.utility2.header.js"] +
    "\n" +
    "\n" +
    "/* jslint utility2:true */\n" +
    "(function (local) {\n" +
    "\"use strict\";\n" +
    "\n" +
    "\n" +
    "/* istanbul ignore next */\n" +
    "// run shared js\u002denv code - init-before\n" +
    "(function () {\n" +
    "// init local\n" +
    "local = globalThis.utility2 || require(\"utility2\");\n" +
    "local = local.requireReadme();\n" +
    "globalThis.local = local;\n" +
    "// init test\n" +
    "local.testRunDefault(local);\n" +
    "}());\n" +
    "\n" +
    "\n" +
    "// run shared js\u002denv code - function\n" +
    "(function () {\n" +
    "return;\n" +
    "}());\n" +
    "}());\n"
);
local.assetsDict["/assets.utility2.rollup.content.js"] = (
    "(function (local) {\n" +
    "    \"use strict\";\n" +
    "/* jslint ignore:start */\n" +
    "/* utility2.rollup.js content */\n" +
    "/* jslint ignore:end */\n" +
    "    return local;\n" +
    "}(globalThis.utility2_rollup));\n"
);
local.assetsDict["/assets.utility2.rollup.end.js"] = (
    "(function () {\n" +
    "    \"use strict\";\n" +
    "    globalThis.utility2_rollup_old = globalThis.utility2_rollup;\n" +
    "    globalThis.utility2_rollup = null;\n" +
    "}());\n" +
    "/* utility2.rollup.js end */\n"
);
local.assetsDict["/assets.utility2.rollup.start.js"] = (
    "/* utility2.rollup.js begin */\n" +
    "/* istanbul ignore all */\n" +
    local.assetsDict["/assets.utility2.header.js"] +
    "\n" +
    "\n" +
    "/* jslint utility2:true */\n" +
    "(function () {\n" +
    "    \"use strict\";\n" +
    "    // init utility2_rollup\n" +
    "    globalThis.utility2_rollup = (\n" +
    "        globalThis.utility2_rollup_old\n" +
    "        || globalThis.globalLocal\n" +
    "    );\n" +
    "    globalThis.utility2_rollup.local = globalThis.utility2_rollup;\n" +
    "    globalThis.utility2_rollup_old = null;\n" +
    "}());\n"
);
local.assetsDict["/favicon.ico"] = "";


/* validateLineSortedReset */
// run shared js-env code - function
let localEventListenerDict;
let localEventListenerId;
let localOnReadyCnt;
localEventListenerDict = {};
localEventListenerId = 0;
localOnReadyCnt = 0;

local._testCase_buildApidoc_default = function (opt, onError) {
/*
 * this function will test buildApidoc's default handling-behavior
 */
    if (!isEnvNode) {
        onError(undefined, opt);
        return;
    }
    function require2(file) {
    /*
     * this function will require <file> in sandbox-env
     */
        let exports;
        let mockDict;
        let mockList;
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
                    // coverage-hack
                    key === "__zjqx1234__" ||
                    npm_config_mode_test_case === "testCase_buildApidoc_default"
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
        }, onErrorThrow);
        return exports;
    }
    // coverage-hack
    require2();
    // save apidoc.html
    local.fsWriteFileWithMkdirpSync(".tmp/build/apidoc.html", apidocCreate(
        Object.assign({
            blacklistDict: local,
            modeNoop: (
                npm_config_mode_test_case !== "testCase_buildApidoc_default"
            ),
            require: require2
        }, opt)
    ));
    onError();
};

local._testCase_buildApp_default = function (opt, onError) {
/*
 * this function will test buildApp's default handling-behavior
 */
    if (!isEnvNode) {
        onError(undefined, opt);
        return;
    }
    local.buildApp(opt, onError);
};

local._testCase_webpage_default = async function (opt, onError) {
/*
 * this function will test webpage's default handling-behavior
 */
    local.domQuerySelectorAllTagName("html");
    local.domStyleValidate();
    if (!isEnvNode) {
        onError(undefined, opt);
        return;
    }
    await local.browserTest({
        url: (
            "http://127.0.0.1:" + PORT +
            "/?npm_config_mode_test=1&npm_config_timeout=" +
            npm_config_timeout +
            "&npm_config_mode_test_case=" + npm_config_mode_test_case.replace((
                /\b_?testCase_webpage_default\b/
            ), "")
        )
    });
    onError(undefined, opt);
};

local.browserTest = async function ({
    modeSilent,
    modeWindowSize,
    url
}) {
/*
 * this function will spawn google-chrome-process to test <url>
 */
    let chromeClient;
    let chromeFrameId;
    let fileScreenshot;
    let isDone;
    let promiseScreenshot;
    let testErr;
    let testId;
    let testName;
    let testReport;
    let {
        chromeDevtoolsClientCreate,
        testReportMerge
    } = local;
    // node - init
    testId = Math.random().toString(16);
    testName = MODE_CI + ".browser." + encodeURIComponent(
        require("url").parse(url).pathname.replace(
            "/build.." + CI_BRANCH + ".." + CI_HOST,
            "/build"
        )
    );
    fileScreenshot = (
        UTILITY2_DIR_BUILD + "/screenshot." + testName + ".png"
    );
    chromeClient = await chromeDevtoolsClientCreate({
        modeSilent,
        modeWindowSize,
        timeout: npm_config_timeout
    });
    // init page
    chromeClient.rpc("Page.enable");
    chromeClient.rpc("Page.setLifecycleEventsEnabled", {
        enabled: true
    });
    chromeClient.rpc("Performance.enable");
    // load url
    chromeClient.rpc("Page.navigate", {
        url
    });
    chromeFrameId = (
        await chromeClient.rpc("Page.getFrameTree")
    ).frameTree.frame.id;
    await new Promise(function (resolve) {
        chromeClient.on("Page.lifecycleEvent", function onLoad({
            frameId,
            name
        }) {
            if (frameId === chromeFrameId && name === "load") {
                chromeClient.removeListener("Page.lifecycleEvent", onLoad);
                resolve();
            }
        });
    });
    console.error("chrome-devtools - loaded - page " + url);
    // screenshot
    promiseScreenshot = new Promise(async function (resolve) {
        let data;
        await new Promise(function (resolve) {
            setTimeout(resolve, 100);
        });
        data = await chromeClient.rpc("Page.captureScreenshot", {
            format: "png"
        });
        await require("fs").promises.writeFile(
            fileScreenshot,
            Buffer.from(data.data, "base64")
        );
        console.error("chrome-devtools - wrote - screenshot " + fileScreenshot);
        resolve();
    });
    chromeClient.evaluate(
        // coverage-hack
        "console.timeStamp();\n" +
        "window.utility2_testId=\"" + testId + "\";\n" +
        "if(!window.utility2_modeTest){\n" +
        "console.timeStamp(window.utility2_testId);\n" +
        "}\n"
    );
    testReport = await new Promise(function (resolve) {
        chromeClient.on("Performance.metrics", function ({
            title
        }) {
            if (isDone || title !== testId) {
                return;
            }
            isDone = true;
            resolve(chromeClient.evaluate(
                "JSON.stringify(\n" +
                "window.utility2_testReport\n" +
                "||{testPlatformList:[{}]}\n" +
                ");\n"
            ));
        });
    });
    testReport = JSON.parse(testReport);
    // init testErr
    testErr = testReport.testPlatformList[0].testsFailed && new Error(
        testReport.testPlatformList[0].testsFailed
    );
    // merge browser-screenshot
    testReport.testPlatformList[0].screenshot = fileScreenshot.replace((
        /.*\//
    ), "");
    // merge browser-coverage
    coverageMerge(globalThis.__coverage__, testReport.coverage);
    // merge browser-test-report
    testReportMerge(globalThis.utility2_testReport, testReport);
    // save test-report.json
    await require("fs").promises.writeFile(
        require("path").resolve(UTILITY2_DIR_BUILD + "/test-report.json"),
        JSON.stringify(globalThis.utility2_testReport)
    );
    console.error(
        "\nbrowserTest - merged test-report " +
        UTILITY2_DIR_BUILD + "/test-report.json" + "\n"
    );
    noop(await promiseScreenshot);
    // cleanup chromeClient
    chromeClient.destroy();
    onErrorThrow(testErr);
};

local.buildApp = function ({
    customizeAssetsList = [],
    customizeReadmeList = []
}, onError) {
/*
 * this function will build app
 */
    let assert;
    let fileDict;
    let packageJson;
    let packageNameLib;
    let port;
    let promiseList;
    let src;
    let tgt;
    assert = require("assert");
    function tgtReplaceConditional(conditional, replaceList) {
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
            if (!conditional) {
                aa = aa || merge;
                console.error(
                    "buildApp - replace-skipped - " +
                    JSON.stringify((aa && aa.source) || aa)
                );
                return;
            }
            if (aa) {
                if (!tgt.match(aa)) {
                    console.error(
                        "buildApp - replace-unmatched - " +
                        JSON.stringify((aa && aa.source) || aa)
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
                    "buildApp - replace-unmatched - " +
                    JSON.stringify(merge.source)
                );
            }
        });
    }
    function writeFileLog(file) {
    /*
     * this function will notify <file> written
     */
        console.error("buildApp - wrote - " + require("path").resolve(file));
    }
    function writeFile(file, data, resolve) {
    /*
     * this function will write <data> to <file> with notification
     */
        require("fs").writeFile(file, data, function (err) {
            onErrorThrow(err);
            writeFileLog(file);
            resolve();
        });
    }
    async function buildAppAssets(resolve) {
        // fetch assets
        await Promise.all([
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
            }
        ].concat(customizeAssetsList).map(function ({
            file,
            url
        }) {
            return new Promise(function (resolve) {
                require("http").get((
                    "http://127.0.0.1:" + PORT + url
                ), function (res) {
                    let bufList;
                    assert.ok(res.statusCode === 200, url);
                    bufList = [];
                    res.on("data", function (chunk) {
                        bufList.push(chunk);
                    }).on("end", function () {
                        writeFile(
                            ".tmp/build/app/" + (file || url),
                            Buffer.concat(bufList),
                            resolve
                        );
                    });
                });
            });
        }));
        // jslint assets
        require("child_process").spawn("node", [
            "assets.utility2.lib.jslint.js", "dir", ".", "--conditional"
        ], {
            cwd: ".tmp/build/app",
            stdio: [
                "ignore", 1, 2
            ]
        }).on("exit", resolve);
    }
    async function buildAppStandalone(resolve) {
        let fileList;
        // write native-module
        fileList = await require("fs").promises.readdir(".");
        await Promise.all(fileList.map(function (file) {
            return new Promise(function (resolve) {
                if (require("path").extname(file) !== ".node") {
                    resolve();
                    return;
                }
                require("fs").copyFile(file, (
                    ".tmp/build/app.standalone/" + file
                ), function (err) {
                    onErrorThrow(err);
                    resolve();
                });
            });
        }));
        // write assets.app.js
        writeFile((
            ".tmp/build/app.standalone/assets.app.js"
        ), local.assetsDict["/assets.app.js"], function () {
            let child;
            // test-file assets.app.js
            child = require("child_process").spawn("node", [
                "assets.app.js"
            ], {
                cwd: ".tmp/build/app.standalone",
                env: {
                    HOME,
                    PATH,
                    PORT: port
                },
                stdio: [
                    "ignore", 1, 2
                ]
            }).on("exit", function (exitCode, signal) {
                assert.ok(!exitCode && signal === "SIGTERM", JSON.stringify({
                    exitCode,
                    signal
                }));
                resolve();
            });
            setTimeout(child.kill.bind(child, "SIGTERM"), 4000);
        });
    }
    function buildLib(resolve) {
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
    }
    function buildReadme(resolve) {
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
            // customize name and description
            {
                merge: (
                    /.*?\n.*?\n/
                )
            // customize cdn-download
            }, {
                merge: (
                    /\n#\u0020cdn\u0020download\n[\S\s]*?\n\n\n/
                )
            // customize live-web-demo
            }, {
                merge: (
                    /\n#\u0020live\u0020web\u0020demo\n[\S\s]*?\n\n\n/
                )
            // customize changelog
            }, {
                merge: (
                    /\n####\u0020changelog\u0020[\S\s]*?\n\n\n/
                )
            // customize example.js - shared js\u002denv code - init-before
            }, {
                merge: (
                    /\nglobalThis\.local\u0020=\u0020local;\n[^`]*?\n\/\*\u0020istanbul\u0020ignore\u0020next\u0020\*\/\n\/\/\u0020run\u0020browser\u0020js\u002denv\u0020code\u0020-\u0020init-test\n/
                )
            // customize example.js - html-body
            }, {
                merge: (
                    /\n<!--\u0020custom-html-start\u0020-->\n[\S\s]*?\n<!--\u0020custom-html-end\u0020-->\n/
                )
            // customize build_ci - shCiAfter
            }, {
                merge: (
                    /\nshCiAfter\u0020\(\)\u0020\{\(set\u0020-e\n[\S\s]*?\n\)\}\n/
                )
            // customize build_ci - shCiBefore
            }, {
                merge: (
                    /\nshCiBefore\u0020\(\)\u0020\{\(set\u0020-e\n[\S\s]*?\n\)\}\n/
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
                    "$ git clone \\\n" +
                    packageJson.repository.url.replace(
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
                    /\nif\u0020\(local.isEnvNode\)\u0020\{\n[\S\s]*?\n\}\(\)\);\n/g
                ),
                bb: "\nif (local.isEnvNode) {\n    return;\n}\n}());\n"
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
        // customize index.html
        tgtReplaceConditional(local.assetsDict[
            "/index.html"
        ].indexOf("\"assets.utility2.template.html\"") < 0, [
            {
                aa: (
                    /\n\/\*\u0020jslint\u0020ignore:start\u0020\*\/\nlocal.assetsDict\["\/index.html"\]\u0020=\u0020'\\\n[\S\s]*?\n\/\*\u0020jslint\u0020ignore:end\u0020\*\/\n/
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
                    /^1\.\u0020.*?screenshot\.(?:npmTest|readmeEvalExampleJs|readmeEvalExampleSh).*?\.png[\S\s]*?\n\n/gm
                ),
                bb: ""
            }
        ]);
        // customize shNpmTestPublished
        tgt = tgt.replace(
            "$ npm install " + GITHUB_FULLNAME + "#alpha",
            "$ npm install " + packageJson.name
        );
        tgtReplaceConditional(src.indexOf("    shNpmTestPublished\n") < 0, [
            {
                aa: "$ npm install " + packageJson.name,
                bb: "$ npm install " + GITHUB_FULLNAME + "#alpha"
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
        // customize shCiAfter and shCiBefore
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
                    /.*?\/screenshot\.readmeEvalExampleJs.*?\n/g
                )
            ], [
                "shReadmeEval example.sh", (
                    /.*?\/screenshot\.readmeEvalExampleSh.*?\n/g
                )
            ], [
                // coverage-hack
                "__zjqx1234__" + Math.random(), "__zjqx1234__" + Math.random()
            ]
        ].forEach(function ([
            conditional, rgxScreenshot
        ]) {
            if (src.indexOf("    " + conditional + "\n") >= 0) {
                return;
            }
            // customize test-server
            tgt = tgt.replace(
                new RegExp(
                    "\\n\\| test-server-" +
                    conditional.replace("shDeploy", "").toLowerCase() +
                    " : \\|.*?\\n"
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
    }
    function buildTest(resolve) {
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
    }
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
                "for DIR in .tmp/build/app/ .tmp/build/app.standalone/;" +
                "do rm -rf $DIR; mkdir -p $DIR; done"
            ), {
                shell: true,
                stdio: [
                    "ignore", 1, 2
                ]
            }).on("exit", resolve);
        }));
        // init port
        promiseList.push(new Promise(function (resolve) {
            let server;
            function recurse(err) {
                if (server) {
                    server.close();
                }
                if (!err) {
                    resolve();
                    return;
                }
                port = (
                    "0x" + require("crypto").randomBytes(2).toString("hex")
                ) | 0x8000;
                server = require("net").createServer().listen(port);
                server.on("error", recurse).on("listening", recurse);
            }
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
        errList.forEach(onErrorThrow);
        promiseList = [];
        promiseList.push(new Promise(buildReadme));
        promiseList.push(new Promise(buildLib));
        promiseList.push(new Promise(buildTest));
        return Promise.all(promiseList);
    }).then(function (errList) {
        errList.forEach(onErrorThrow);
        promiseList = [];
        promiseList.push(new Promise(buildAppAssets));
        promiseList.push(new Promise(buildAppStandalone));
        return Promise.all(promiseList);
    }).then(function (errList) {
        errList.forEach(onErrorThrow);
        onError();
    });
};

local.chromeDevtoolsClientCreate = async function ({
    chromeBin,
    modeCoverageHack,
    modeSilent,
    modeWindowSize = "800x600",
    processPlatform,
    timeout
}) {
/*
 * this function with create chrome-devtools-client from <chromeBin>
 */
    let WS_READ_HEADER;
    let WS_READ_LENGTH16;
    let WS_READ_LENGTH63;
    let WS_READ_PAYLOAD;
    let assert;
    let callbackDict;
    let callbackId;
    let chromeClient;
    let chromeProcess;
    let chromeSessionId;
    let chromeUserDataDir;
    let secWebsocketKey;
    let timerTimeout;
    let websocket;
    let websocketUrl;
    let wsBufList;
    let wsPayloadLength;
    let wsReadState;
    let wsReader;
    if (modeCoverageHack === 1) {
        [
            "darwin", "linux", "win32"
        ].forEach(function (processPlatform) {
            local.chromeDevtoolsClientCreate({
                modeCoverageHack: 2,
                processPlatform
            }).catch(noop);
        });
        return;
    }
    WS_READ_HEADER = 0;
    WS_READ_LENGTH16 = 1;
    WS_READ_LENGTH63 = 2;
    WS_READ_PAYLOAD = 3;
    assert = require("assert");
    callbackDict = {};
    callbackId = 0;
    wsBufList = [];
    wsPayloadLength = 0;
    wsReadState = WS_READ_HEADER;
    function chromeCleanup() {
    /*
     * this function will
     * 1. kill <chromeProcess>
     * 2. rm -rf <chromeUserDataDir>
     * 3. destroy <chromeClient>, <websocket>, <wsReader>
     */
        // cleanup timerTimeout
        clearTimeout(timerTimeout);
        // 1. kill <chromeProcess>
        try {
            if (processPlatform === "win32") {
                require("child_process").spawnSync("taskkill", [
                    "/pid", chromeProcess.pid, "/T", "/F"
                ], {
                    stdio: "ignore"
                });
            } else {
                // kill child process tree with ".kill(-pid)" cmd.
                process.kill(-chromeProcess.pid, "SIGKILL");
            }
        } catch (ignore) {}
        // 2. rm -rf <chromeUserDataDir>
        if (chromeUserDataDir) {
            require("fs").rmdirSync(chromeUserDataDir, {
                recursive: true
            });
        }
        // 3. destroy <chromeClient>, <websocket>, <wsReader>
        chromeClient.destroy();
        if (websocket) {
            websocket.destroy();
        }
        wsReader.destroy();
    }
    async function chromeEvaluate(expression) {
    /*
     * this function will eval <expression> in chrome-browser
     */
        let {
            exceptionDetails,
            result
        } = await chromeClient.rpc("Runtime.evaluate", {
            awaitPromise: true,
            expression,
            returnByValue: false,
            userGesture: true
        });
        assert.ok(!exceptionDetails, (
            "chrome-devtools - evaluate - " +
            JSON.stringify(exceptionDetails)
        ));
        return result.value;
    }
    function chromeOnData(payload) {
    /*
     * this function will handle callback for <payload>
     * received from chrome-browser using chrome-devtools-protocol
     */
        // console.error("\u25c0 RECV " + payload.slice(0, 256).toString());
        let callback;
        let {
            error,
            id,
            method,
            params,
            result
        } = JSON.parse(payload);
        assert.ok(!method || (
            /^[A-Z]\w*?\.[a-z]\w*?$/
        ).test(method), "chrome-devtools - read - invalid method " + method);
        // init callback
        callback = callbackDict[id];
        delete callbackDict[id];
        // callback.resolve
        if (callback) {
            // preserve stack-trace
            callback.err.message = (
                "chrome-devtools - read - " + JSON.stringify(error)
            );
            assert.ok(!error, callback.err);
            callback.resolve(result);
            return;
        }
        assert.ok(!error, "chrome-devtools - read - " + JSON.stringify(error));
        chromeClient.emit(method, params);
    }
    function chromeRead() {
    /*
     * this function will implement stream.Duplex.prototype._read
     */
        if (websocket && websocket.readable) {
            websocket.resume();
        }
    }
    function chromeRpc(method, params) {
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
            sessionId: (
                typeof chromeSessionId === "string"
                ? chromeSessionId
                : undefined
            )
        })));
        return new Promise(function (resolve) {
            callbackDict[callbackId] = {
                err: new Error(),
                method,
                resolve
            };
        });
    }
    function chromeWrite(payload, ignore, callback) {
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
            assert.ok(payload.length < 65536, (
                "chrome-devtools - write - " +
                "payload-length must be less than 65536 bytes, not " +
                payload.length
            ));
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
    }
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
            assert.ok(opcode === 0x01, (
                "chrome-devtools - read - opcode must be 0x01, not 0x0" +
                opcode.toString(16)
            ));
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
            assert.ok((
                0 <= wsPayloadLength && wsPayloadLength <= 10000000
            ), (
                "chrome-devtools - read - " +
                "payload-length must be between 0 and 256 MiB, not " +
                wsPayloadLength
            ));
            buf = wsBufListRead(wsPayloadLength);
            wsReadState = WS_READ_HEADER;
            chromeClient.push(buf);
            break;
        }
        return true;
    }
    function wsReaderTransform(chunk, ignore, callback) {
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
    }
    // init chromeClient
    function ChromeClient() {
    /*
     * this function will construct <chromeClient>
     */
        chromeClient = this;
        require("util").inherits(ChromeClient, require("stream").Duplex);
        require("stream").Duplex.call(chromeClient);
        Object.assign(chromeClient.__proto__, {
            _destroy: chromeCleanup,
            _read: chromeRead,
            _write: chromeWrite,
            evaluate: chromeEvaluate,
            rpc: chromeRpc
        });
        chromeClient.on("data", chromeOnData);
    }
    chromeClient = new ChromeClient();
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
    // init wsReader that can read websocket-frames from websocket
    function WsReader() {
    /*
     * this function will construct <wsReader>
     */
        wsReader = this;
        require("util").inherits(WsReader, require("stream").Transform);
        require("stream").Transform.call(wsReader);
        Object.assign(wsReader.__proto__, {
            _transform: wsReaderTransform
        });
    }
    wsReader = new WsReader();
    // init chromeProcess
    processPlatform = processPlatform || process.platform;
    chromeUserDataDir = await require("fs").promises.mkdtemp(
        require("path").join(require("os").tmpdir(), "puppeteer_dev_profile-")
    );
    chromeBin = chromeBin || (
        processPlatform === "darwin"
        ? "/Applications/Google Chrome.app/Contents/MacOS/" +
        "Google Chrome"
        : processPlatform === "win32"
        ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\" +
        "chrome.exe"
        : "/usr/bin/google-chrome-stable"
    );
    console.error("chrome-devtools - spawning - " + chromeBin);
    chromeProcess = require("child_process").spawn((
        chromeBin
    ), [
        "--headless",
        "--incognito",
        "--remote-debugging-port=0",
        "--user-data-dir=" + chromeUserDataDir,
        "--window-size=" + modeWindowSize,
        Array.from([
            "", "--no-sandbox"
        ])[(process.getuid && process.getuid() === 0) | 0]
    ], {
        // On non-windows platforms, `detached: false` makes child process
        // a leader of a new process group, making it possible to kill
        // child process tree with `.kill(-pid)` cmd.
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
        chromeProcess.stderr.pipe(process.stderr, {
            end: false
        });
    }
    process.on("exit", chromeCleanup);
    process.on("SIGINT", chromeCleanup);
    process.on("SIGTERM", chromeCleanup);
    process.on("SIGHUP", chromeCleanup);
    // init timerTimeout
    timeout = timeout || 30000;
    if (modeCoverageHack === 2) {
        chromeClient.on("error", noop);
        chromeProcess.on("error", noop);
        timeout = 0;
    }
    timerTimeout = setTimeout(function () {
        chromeCleanup();
        chromeClient.emit("error", new Error(
            "chrome-devtools - timeout - " + timeout + " ms"
        ));
    }, timeout);
    // init websocketUrl
    websocketUrl = await new Promise(function (resolve) {
        let stderr;
        stderr = "";
        chromeProcess.stderr.on("data", function onData(chunk) {
            assert.ok(
                stderr.length < 65536,
                "chrome-devtools - connecting - cannot connect to chrome"
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
    // init websocket
    console.error("chrome-devtools - connecting - " + websocketUrl);
    secWebsocketKey = require("crypto").randomBytes(16).toString("base64");
    await new Promise(function (resolve) {
        require("http").get((
            websocketUrl
        ), {
            createConnection: function (opt) {
                delete opt.path;
                return require("net").connect(opt);
            },
            headers: {
                Connection: "Upgrade",
                "Sec-WebSocket-Key": secWebsocketKey,
                "Sec-WebSocket-Version": 13,
                Upgrade: "websocket"
            },
            protocol: "http:",
            protocolVersion: 13
        }).once("upgrade", function (res, _, head) {
            assert.ok((
                res.headers[
                    "sec-websocket-accept"
                ] === require("crypto").createHash("sha1").update(
                    secWebsocketKey +
                    "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
                ).digest("base64")
            ), (
                "chrome-devtools - connecting - " +
                "invalid header sec-websocket-accept"
            ));
            websocket = _;
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
    // init chromeSessionId
    chromeSessionId = await chromeClient.rpc("Target.createTarget", {
        url: "about:blank"
    });
    chromeSessionId = await chromeClient.rpc("Target.attachToTarget", {
        targetId: chromeSessionId.targetId,
        flatten: true
    });
    chromeSessionId = chromeSessionId.sessionId;
    console.error("chrome-devtools - created - blank-page with sessionId");
    return chromeClient;
};

local.cliRun = function ({
    rgxComment
}) {
/*
 * this function will run cli
 */
    let {
        _default,
        _eval,
        _help,
        _interactive,
        _version,
        cliDict,
        replStart
    } = Object.assign({}, local, local.cliDict);
    _eval = _eval || function () {
    /*
     * <code>
     * will eval <code>
     */
        Object.assign(globalThis, local);
        require("vm").runInThisContext(process.argv[3]);
    };
    _help = _help || function () {
    /*
     *
     * will print help
     */
        let cmdList;
        let file;
        let packageJson;
        let str;
        let strDict;
        cmdList = [
            {
                argList: "<arg2>  ...",
                description: "usage:",
                cmd: [
                    "<arg1>"
                ]
            }, {
                argList: "'console.log(\"hello world\")'",
                description: "example:",
                cmd: [
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
            if (cmdList[ii]) {
                cmdList[ii].cmd.push(key);
                return;
            }
            cmdList[ii] = rgxComment.exec(str);
            if (!cmdList[ii]) {
                throw new Error(
                    "cliRun - cannot parse comment in cmd " +
                    key + ":\nnew RegExp(" +
                    JSON.stringify(rgxComment.source) +
                    ").exec(" + JSON.stringify(str).replace((
                        /\\\\/g
                    ), "\u0000").replace((
                        /\\n/g
                    ), "\\n\\\n").replace((
                        /\u0000/g
                    ), "\\\\") + ");"
                );
            }
            cmdList[ii] = {
                argList: String(cmdList[ii][1] || "").trim(),
                cmd: [
                    key
                ],
                description: cmdList[ii][2]
            };
        });
        str = "";
        str += packageJson.name + " (" + packageJson.version + ")\n\n";
        str += cmdList.filter(function (elem) {
            return elem;
        }).map(function (elem, ii) {
            elem.cmd = elem.cmd.filter(function (elem) {
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
                    "# CMD " +
                    (elem.cmd[0] || "<none>") + "\n# " +
                    elem.description
                );
            }
            return (
                elem.description + "\n  " + file +
                "  " + elem.cmd.sort().join("|") + "  " +
                elem.argList.join("  ")
            );
        }).join("\n\n");
        console.log(str);
    };
    _interactive = _interactive || function () {
    /*
     *
     * will start interactive-mode
     */
        Object.assign(globalThis, local);
        replStart = replStart || require("repl").start;
        replStart({
            useGlobal: true
        });
    };
    _version = _version || function () {
    /*
     *
     * will print version
     */
        console.log(require(__dirname + "/package.json").version);
    };
    _default = _default || _help;
    Object.assign(cliDict, {
        "--eval": _eval,
        "--help": _help,
        "--interactive": _interactive,
        "--version": _version,
        "-e": _eval,
        "-h": _help,
        "-i": _interactive,
        "-v": _version,
        _default,
        _eval,
        _help,
        _interactive,
        _version
    });
    // run help-cmd if no arguments are given
    if (process.argv.length <= 2) {
        _help();
        return;
    }
    // run defined-cmd if it exists
    if (cliDict[process.argv[2]]) {
        cliDict[process.argv[2]]();
        return;
    }
    // run default-cmd
    _default();
};

local.domQuerySelectorAllTagName = function (selector) {
/*
 * this function will return list of tagName matching <selector>
 */
    let dict;
    dict = {};
    documentQuerySelectorAll(selector).forEach(function (elem) {
        dict[elem.tagName] = true;
    });
    return Object.keys(dict).sort();
};

local.domStyleValidate = function () {
/*
 * this function will validate <style> tags
 */
    let list;
    let rgx;
    rgx = (
        /^0\u0020(?:(body\u0020>\u0020)?(?:\.test-report-div\u0020.+|\.x-istanbul\u0020.+|\.button|\.colorError|\.readonly|\.textarea|\.uiAnimateSlide|a|body|code|div|input|pre|textarea)(?:,|\u0020\{))|^[1-9]\d*?\u0020#/m
    );
    list = [];
    documentQuerySelectorAll("style").forEach(function (elem, ii) {
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
            if (!(ii > 1) && !rgx.test(elem)) {
                list.push(ii + " " + match0);
            }
        });
    });
    list.filter(function (elem) {
        return !rgx.test(elem);
    }).sort().reverse().forEach(function (elem, ii, list) {
        console.error(
            "domStyleValidateUnmatched " + (list.length - ii) + ". " + elem
        );
    });
};

local.eventListenerAdd = function (type, {
    once
}, listener) {
/*
 * this function will listen evt <type> with <listener>
 */
    localEventListenerId = (localEventListenerId + 1) | 0;
    localEventListenerDict[localEventListenerId] = {
        listener,
        once,
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
            elem.listener({
                msg,
                type
            });
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
    // do nothing if module does not exist
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

local.fsWriteFileWithMkdirpSync = function (pathname, data) {
/*
 * this function will sync write <data> to <pathname> with "mkdir -p"
 */
    let fs;
    // do nothing if module does not exist
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
    console.error("fsWriteFileWithMkdirpSync - wrote - " + pathname);
    return true;
};

local.httpFetch = async function (url, opt = {}) {
/*
 * this function fetch <url> with given <opt>
 */
    let buf;
    let bufList;
    let req;
    let res;
    function arrayBuffer() {
        return buf;
    }
    async function json() {
        return JSON.stringify(await buf);
    }
    async function text() {
        return String(await buf);
    }
    // use browser fetch
    if (
        typeof globalThis.XMLHttpRequest === "function" &&
        typeof globalThis.fetch === "function"
    ) {
        return globalThis.fetch(url, opt);
    }
    // use node http-request
    if (!(
        /^https?:/
    ).test(url)) {
        url = "http://127.0.0.1:" + process.env.PORT + "/" + url.replace((
            /^\//
        ), "");
    }
    res = await new Promise(function (resolve) {
        req = require(url.split(":")[0]).request(url, opt, resolve).end();
    });
    let {
        headers,
        statusCode
    } = res;
    bufList = [];
    res.on("data", function (chunk) {
        bufList.push(chunk);
    });
    buf = new Promise(function (resolve) {
        res.on("end", function () {
            resolve(Buffer.concat(bufList));
        });
    });
    return Object.assign(res, {
        arrayBuffer,
        blob: arrayBuffer,
        headers: new Map(Object.entries(headers)),
        json,
        ok: 200 <= statusCode && statusCode <= 299,
        req,
        status: statusCode,
        statusText: require("http").STATUS_CODES[statusCode],
        text,
        url
    });
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
    if (!isEnvNode) {
        return code;
    }
    // make file relative
    file = require("path").resolve(file);
    if (file.indexOf(process.cwd() + require("path").sep) === 0) {
        file = file.replace(process.cwd() + require("path").sep, "");
    }
    switch (file) {
    case "README.md":
    case "lib." + npm_package_nameLib + ".js":
    case "lib." + npm_package_nameLib + ".sh":
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
        (
            file === "README.md"
            ? (
                /$^/m
            )
            : (
                /\n\/\*\u0020istanbul\u0020instrument\u0020in\u0020package\u0020[\S\s]*?\n\/\*\u0020validateLineSortedReset\u0020\*\/\n/
            )
        )
    );
    // customize local for assets.utility2.rollup.js
    if (
        file === "lib." + npm_package_nameLib + ".js" &&
        require("fs").existsSync("./assets.utility2.rollup.js")
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
                    ).test(key) &&
                    typeof dict[key] === "function"
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

local.onReadyDecrement = function (err) {
/*
 * this function will decrement <onReadyCnt>
 */
    localOnReadyCnt -= 1;
    if (localOnReadyCnt === 0) {
        local.eventListenerEmit("utility2.onReady", err);
    }
    return localOnReadyCnt;
};

local.onReadyIncrement = function () {
/*
 * this function will increment <onReadyCnt>
 */
    localOnReadyCnt += 1;
    return localOnReadyCnt;
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
    // init history
    that.setupHistory(require("path").resolve(
        process.env.HOME + "/.node_repl_history"
    ), function () {
        return;
    });
    // save eval-function
    that.evalDefault = that.eval;
    // hook custom-eval-function
    that.eval = function (script, context, file, onError) {
        script.replace((
            /^(\S+)\u0020(.*?)\n/
        ), function (ignore, match1, match2) {
            switch (match1) {
            // syntax-sugar - run shell-cmd
            case "$":
                switch (match2.split(" ").slice(0, 2).join(" ")) {
                // syntax-sugar - run git diff
                case "git diff":
                    match2 += " --color";
                    break;
                // syntax-sugar - run git log
                case "git log":
                    match2 += " -n 10";
                    break;
                // syntax-sugar - run ll
                case "ll":
                    match2 = "ls -Fal";
                    break;
                }
                match2 = match2.replace((
                    /^git\u0020/
                ), "git --no-pager ");
                // source lib.utility2.sh
                match2 = (
                    (
                        process.platform !== "win32" &&
                        process.env.UTILITY2_BIN && (match2 !== ":")
                    )
                    ? ". " + process.env.UTILITY2_BIN + "; " + match2
                    : match2
                );
                // run shell-cmd
                console.error("$ " + match2);
                require("child_process").spawn(match2, {
                    shell: true,
                    stdio: [
                        "ignore", 1, 2
                    ]
                // print exitCode
                }).on("exit", function (exitCode) {
                    console.error("$ EXIT_CODE=" + exitCode);
                    that.evalDefault("\n", context, file, onError);
                });
                script = "\n";
                break;
            // syntax-sugar - map text with charCodeAt
            case "charCode":
                console.error(
                    match2.split("").map(function (chr) {
                        return (
                            "\\u" +
                            chr.charCodeAt(0).toString(16).padStart(4, 0)
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
            // syntax-sugar - list obj-keys, sorted by item-type
            // console.error(Object.keys(global).map(function(key){return(typeof global[key]==='object'&&global[key]&&global[key]===global[key]?'global':typeof global[key])+' '+key;}).sort().join('\n')) // jslint ignore:line
            case "keys":
                script = (
                    "console.error(Object.keys(" + match2 +
                    ").map(function(key){return(" +
                    "typeof " + match2 + "[key]==='object'&&" +
                    match2 + "[key]&&" +
                    match2 + "[key]===global[key]" +
                    "?'global'" +
                    ":typeof " + match2 + "[key]" +
                    ")+' '+key;" +
                    "}).sort().join('\\n'))\n"
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
    let Module;
    let code;
    let exports;
    let file;
    let {
        assetsDict,
        fsReadFileOrDefaultSync,
        objectAssignDefault,
        replStart,
        templateRenderMyApp
    } = local;
    // if library-mode, then return local
    if (npm_config_mode_lib) {
        local.testRunDefault = noop;
        return local;
    }
    // if file modified, then restart process
    if (npm_config_mode_auto_restart) {
        require("fs").readdir(".", function (ignore, fileList) {
            fileList.concat(__filename).forEach(async function (file) {
                let stats;
                if (file[0] === ".") {
                    return;
                }
                stats = await require("fs").promises.stat(file);
                if (!stats.isFile()) {
                    return;
                }
                require("fs").watchFile(file, {
                    interval: 1000,
                    persistent: false
                }, function () {
                    console.error("watchFile - modified - " + file);
                    setTimeout(process.exit.bind(undefined, 77), 1000);
                });
            });
        });
    }
    // if browser-env, then return local
    if (!isEnvNode) {
        return objectAssignDefault(
            globalThis.utility2_rollup || globalThis.local,
            local
        );
    }
    // start repl-debugger
    replStart();
    // jslint $PWD
    require("child_process").spawn("node", [
        "-e", (
            "require(" + JSON.stringify(__filename) +
            ").jslintAndPrintDir(" + JSON.stringify(process.cwd()) +
            ", {modeAutofix:" + !npm_config_mode_test +
            ",modeConditional:true});"
        )
    ], {
        env: Object.assign({}, process.env, {
            npm_config_mode_lib: "1"
        }),
        stdio: [
            "ignore", 1, 2
        ]
    });
    // if rollup, then return local
    if (globalThis.utility2_rollup || npm_config_mode_start) {
        assetsDict["/assets.app.js"] = require("fs").readFileSync(
            __filename,
            "utf8"
        ).replace((
            /^#!\//
        ), "// ");
        // init exports
        local[npm_package_nameLib] = local;
        return local;
    }
    // init utility2_moduleExports from $npm_package_main
    globalThis.utility2_moduleExports = require(
        require("path").resolve(npm_package_main)
    );
    // read example.js from README.md
    code = assetsDict["/assets.example.template.js"];
    fsReadFileOrDefaultSync("README.md", "utf8", "").replace((
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
        new RegExp("require\\(." + npm_package_name + ".\\)"),
        "globalThis.utility2_moduleExports"
    ).replace(
        new RegExp("require\\(." + npm_package_nameOriginal + ".\\)"),
        "globalThis.utility2_moduleExports"
    );
    // jslint example.js
    file = require("path").resolve("example.js");
    jslintAndPrint(code, file);
    // instrument example.js
    code = instrumentInPackage(code, file);
    // eval example.js
    Module = require("module");
    exports = new Module(file);
    require.cache[file] = exports;
    exports._compile(code, file);
    // export example.js
    exports = exports.exports;
    exports.utility2 = local;
    exports[npm_package_nameLib] = globalThis.utility2_moduleExports;
    // cleanup utility2_moduleExports
    delete globalThis.utility2_moduleExports;
    // init assets lib.xxx.js
    [
        ".css", ".js"
    ].forEach(function (extname) {
        assetsDict[
            "/assets." + npm_package_nameLib + extname
        ] = fsReadFileOrDefaultSync(
            require("path").resolve(npm_package_main).replace((
                /\.\w+?$/
            ), extname),
            "utf8",
            ""
        ).replace((
            /^#!\//
        ), "// ");
    });
    Object.assign(assetsDict, exports.assetsDict);
    // instrument assets lib.xxx.js
    assetsDict["/assets." + npm_package_nameLib + ".js"] = (
        instrumentInPackage(
            assetsDict["/assets." + npm_package_nameLib + ".js"],
            npm_package_main
        )
    );
    exports.assetsDict = assetsDict;
    assetsDict["/assets.example.js"] = code;
    assetsDict["/assets.test.js"] = instrumentInPackage(
        require("fs").readFileSync("test.js", "utf8"),
        "test.js"
    );
    // init assets index.html
    file = assetsDict["/"];
    // uncomment utility2-comment
    file = file.replace((
        /\n<!--\u0020utility2-comment\n|\nutility2-comment\u0020-->\n/g
    ), "\n\n");
    // interpolate {{...}}
    file = templateRenderMyApp(file);
    assetsDict["/"] = file;
    assetsDict["/index.html"] = file;
    // init assets.app.js
    assetsDict["/assets.app.js"] = [
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
        case "/assets.my_app.css":
            file = "/assets." + npm_package_nameLib + ".css";
            // disable $-escape in replacement-string
            code = assetsDict[
                "/assets.utility2.rollup.content.js"
            ].replace("/* utility2.rollup.js content */", function () {
                return (
                    "local.assetsDict[\"" + file + "\"] = (\n" +
                    JSON.stringify(assetsDict[file]).replace((
                        /\\\\/g
                    ), "\u0000").replace((
                        /\\n/g
                    ), "\\n\\\n").replace((
                        /\u0000/g
                    ), "\\\\") +
                    ");\n"
                );
            });
            break;
        case "/assets.my_app.js":
            file = "/assets." + npm_package_nameLib + ".js";
            // disable $-escape in replacement-string
            code = assetsDict[
                "/assets.utility2.rollup.content.js"
            ].replace("/* utility2.rollup.js content */", function () {
                return (
                    "local.assetsDict[\"" + file + "\"] = (\n" +
                    JSON.stringify(assetsDict[file]).replace((
                        /\\\\/g
                    ), "\u0000").replace((
                        /\\n/g
                    ), "\\n\\\n").replace((
                        /\u0000/g
                    ), "\\\\") +
                    ");\n" +
                    assetsDict[file]
                );
            });
            break;
        case "header":
            return (
                "/* this rollup was created with utility2\n" +
                " * https://github.com/kaizhu256/node-utility2\n" +
                " */\n" +
                "\n" +
                "\n" +
                "/*\n" +
                "assets.app.js\n" +
                "\n" +
                npm_package_description + "\n" +
                "\n" +
                "instruction\n" +
                "    1. save this script as assets.app.js\n" +
                "    2. run shell-cmd:\n" +
                "        $ PORT=8081 node assets.app.js\n" +
                "    3. open browser to http://127.0.0.1:8081 " +
                "and play with web-demo\n" +
                "    4. edit this script to suit your needs\n" +
                "*/\n" +
                assetsDict["/assets.utility2.rollup.start.js"].replace((
                    /utility2_rollup/g
                ), "utility2_app")
            );
        default:
            code = assetsDict[key];
        }
        return (
            "/* script-begin " + key + " */\n" +
            code.trim() +
            "\n/* script-end " + key + " */\n"
        );
    }).join("\n\n\n");
    objectAssignDefault(exports, local);
    // init testCase_buildXxx
    Object.keys(local).forEach(function (key) {
        if (
            key.indexOf("_testCase_build") === 0 ||
            key === "_testCase_webpage_default"
        ) {
            exports[key.slice(1)] = exports[key.slice(1)] || local[key];
        }
    });
    return exports;
};

local.serverRequestListener = function (req, res) {
/*
 * this function will handle server-<req> and server-<res> using
 * express-like middleware-chaining
 */
    let isDone;
    let list;
    let timeStart;
    let timeout;
    let timerTimeout;
    let urlParsed;
    let {
        assetsDict,
        middlewareList
    } = local;
    function onClose() {
    /*
     * this function will hand "close" evt
     */
        if (req.url.indexOf("/favicon.ico") !== 0) {
            console.error("serverLog - " + JSON.stringify({
                time: new Date(timeStart).toISOString(),
                type: "serverResponse",
                method: req.method,
                url: urlParsed.pathname,
                statusCode: res.statusCode | 0,
                timeElapsed: Date.now() - timeStart
            }) + "\n");
        }
        isDone = true;
        clearTimeout(timerTimeout);
        req.destroy();
        res.destroy();
    }
    function onError(err) {
    /*
     * this function will end server-request
     */
        if (!isDone && !err) {
            isDone = true;
            res.statusCode = 404;
            res.end("404 Not Found");
            return;
        }
        console.error(err || new Error("onError called more than once"));
        if (isDone) {
            req.destroy();
            res.destroy();
            return;
        }
        isDone = true;
        res.statusCode = 500;
        res.end("500 Internal Server Error");
    }
    function onTimeout() {
        isDone = true;
        onError(new Error("timeout - " + timeout + " ms"));
    }
    async function middlewareInit(req, ignore, next) {
        let contentType;
        // init timeStart
        timeStart = Date.now();
        // init timerTimeout
        timeout = timeout || npm_config_timeout;
        timerTimeout = setTimeout(onTimeout, timeout);
        // init urlParsed
        urlParsed = new URL("http://127.0.0.1:" + PORT + req.url);
        // init evt-handling
        req.on("abort", onError);
        req.on("close", onClose);
        req.on("error", onError);
        res.on("error", onError);
        res.on("close", onClose);
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
            ".css": "text/css; charset=utf-8",
            ".htm": "text/html; charset=utf-8",
            ".html": "text/html; charset=utf-8",
            ".md": "text/markdown; charset=utf-8",
            ".txt": "text/plain; charset=utf-8",
            "/": "text/html; charset=utf-8"
        };
        contentType = contentType[(
            /^\/$|\.[^.]*?$|$/m
        ).exec(urlParsed.pathname)[0]];
        if (contentType) {
            res.setHeader("content-type", contentType);
        }
        await next();
    }
    async function middlewareServeAsset(ignore, res, next) {
    /*
     * this function will serve assets from <assetsDict>
     */
        if (!assetsDict.hasOwnProperty(urlParsed.pathname)) {
            await next();
            return;
        }
        res.statusCode = 200;
        res.end(assetsDict[urlParsed.pathname]);
    }
    async function middlewareServeFile(req, res, next) {
    /*
     * this function will serve <file> from fs
     */
        let file;
        if (req.method !== "GET") {
            await next();
            return;
        }
        file = urlParsed.pathname.slice(1);
        // replace trailing "/" with "/index.html"
        file = file.replace((
            /\/$/
        ), "/index.html");
        // resolve file
        file = require("path").resolve(file);
        if (
            // security - disable parent-directory lookup
            file.indexOf(process.cwd() + require("path").sep) !== 0 ||
            // security - ignore file with non-alphanumeric-first-character
            !(
                /[0-9A-Za-z]/
            ).test(require("path").basename(file)[0])
        ) {
            await next();
            return;
        }
        try {
            file = await require("fs").promises.readFile(file);
        } catch (ignore) {
            await next();
            return;
        }
        res.end(file);
    }
    async function next() {
        let middleware;
        try {
            middleware = list.shift();
            if (isDone || !middleware) {
                onError();
                return;
            }
            // recurse
            await middleware(req, res, next);
        } catch (errCaught) {
            onError(errCaught);
        }
    }
    // init list
    list = [].concat(
        middlewareInit,
        middlewareList,
        middlewareServeAsset,
        middlewareServeFile
    );
    next();
};

local.serverRespondEcho = function (req, res) {
/*
 * this function will respond with debug info
 */
    res.write(
        req.method + " " + req.url +
        " HTTP/" + req.httpVersion + "\r\n" +
        Object.keys(req.headers).map(function (key) {
            return key + ": " + req.headers[key] + "\r\n";
        }).join("") + "\r\n"
    );
    req.pipe(res);
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

local.stringRegexpEscape = function (str) {
/*
 * this function will regexp-escape <str>
 * https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
 */
    return str.replace((
        /[\-\/\\\^$*+?.()|\[\]{}]/g
    ), "\\$&");
};

local.svgBadgeCreate = function ({
    fill,
    str1,
    str2
}) {
/*
 * this function will create svg-badge
 */
    let xx1;
    let xx2;
    str1 = String(str1);
    str2 = String(str2);
    xx1 = 6 * str1.length + 20;
    xx2 = 6 * str2.length + 20;
    return (
        "<svg height=\"20\" width=\"" +
        (xx1 + xx2) +
        "\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "<rect fill=\"#555\" height=\"20\" width=\"" +
        (xx1 + xx2) +
        "\"/>\n" +
        "<rect fill=\"" + fill + "\" height=\"20\" width=\"" +
        xx2 + "\" x=\"" + xx1 + "\"/>\n" +
        "<g\n" +
        "fill=\"#fff\"\n" +
        "font-family=\"DejaVu Sans,Verdana,Geneva,sans-serif\"\n" +
        "font-size=\"11\"\n" +
        "text-anchor=\"middle\"\n" +
        ">\n" +
        "<text fill-opacity=\".5\" fill=\"#777\" x=\"" +
        0.5 * xx1 + "\" y=\"15\">" + str1 + "</text>\n" +
        "<text x=\"" + 0.5 * xx1 + "\" y=\"14\">" + str1 + "</text>\n" +
        "<text fill-opacity=\".5\" fill=\"#777\" x=\"" +
        (xx1 + 0.5 * xx2) + "\" y=\"15\">" + str2 + "</text>\n" +
        "<text x=\"" + (xx1 + 0.5 * xx2) + "\" y=\"14\">" + str2 + "</text>\n" +
        "</g>\n" +
        "</svg>\n"
    );
};

local.templateRenderMyApp = function (template) {
/*
 * this function will render my-app template
 */
    template = template.replace((
        /kaizhu256(\.github\.io\/|%252F|\/)/g
    ), GITHUB_OWNER + "$1");
    template = template.replace((
        /node-my-app/g
    ), GITHUB_REPO);
    template = template.replace((
        /\bh1-my-app\b/g
    ), (
        npm_package_nameHeroku ||
        ("h1-" + npm_package_nameLib.replace((
            /_/g
        ), "-"))
    ));
    template = template.replace((
        /\bmy-app\b/g
    ), npm_package_name);
    template = template.replace((
        /my_app/g
    ), npm_package_nameLib);
    template = template.replace((
        /\{\{(\w+)(\u0020jsonStringify)?\}\}/g
    ), function (ignore, key, jsonStringify) {
        return String(
            jsonStringify
            ? JSON.stringify(local[key])
            : String(local[key])
        ).replace((
            /<\//g
        ), "<\\/");
    });
    return template;
};

local.testCase_noop_default = function (opt, onError) {
/*
 * this function will test noop's default handling-behavior
 */
    noop();
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
        error: noop,
        log: noop
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

local.testReportMerge = function (
    testReport = {},
    testReport2 = {},
    mode = undefined
) {
/*
 * this function will
 * 1. merge <testReport2> into <testReport>
 * 2. render <testReport>.html
 * 3. write <testReport> to fs
 */
    let html;
    let testCaseNumber;
    let testPlatformDict;
    let testPlatformList;
    function fileWrite(file, data) {
    /*
     * this function will write <data> to <file>
     */
        file = require("path").resolve(UTILITY2_DIR_BUILD + "/" + file);
        require("fs").writeFileSync(file, data);
        console.error("test-report - wrote - " + file);
    }
    // 1. merge <testReport2> into <testReport>
    testReport = local.objectAssignDefault(testReport, {
        coverage: globalThis.__coverage__,
        date: new Date().toISOString(),
        testPlatformList: [
            {}
        ]
    });
    testPlatformDict = {};
    // deduplicate testPlatform with same name
    testPlatformList = [].concat(
        testReport.testPlatformList,
        testReport2.testPlatformList || []
    ).reverse().map(function (testPlatform) {
        local.objectAssignDefault(testPlatform, {
            date: new Date().toISOString(),
            modeBuild: MODE_CI,
            nameBase: (
                isEnvNode
                ? "node - " + process.platform + " - " + process.version
                : "browser - " + location.pathname + " - " + navigator.userAgent
            ),
            status: "pending",
            testCaseList: [],
            testsFailed: 0,
            testsPassed: 0,
            testsPending: 0,
            timeElapsed: 0,
            timeOnload: (
                globalThis.domOnEventWindowOnloadTimeElapsed < 0x10000000000 &&
                globalThis.domOnEventWindowOnloadTimeElapsed | 0
            ),
            timeStart: 0
        });
        testPlatform.name = (
            testPlatform.modeBuild + " - " + testPlatform.nameBase
        );
        testPlatformDict[testPlatform.name] = testPlatform;
        return testPlatform;
    }).slice(-1);
    delete testPlatformDict[testPlatformList[0].name];
    testPlatformList = [
        testPlatformList[0]
    ].concat(Object.values(testPlatformDict).sort(function (aa, bb) {
        return (
            aa.date < bb.date
            ? 1
            : -1
        );
    }));
    Object.assign(testReport, {
        testsFailed: 0,
        testsPassed: 0,
        testsPending: 0
    });
    testPlatformList.forEach(function (testPlatform) {
        Object.assign(testPlatform, {
            testsFailed: 0,
            testsPassed: 0,
            testsPending: 0
        });
        testPlatform.testCaseList.forEach(function ({
            status
        }) {
            switch (status) {
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
                (aa.status.replace("passed", "z") + aa.name) >
                (bb.status.replace("passed", "z") + bb.name)
                ? 1
                : -1
            );
        });
    });
    // 2. render <testReport>.html
    testCaseNumber = 0;
    html = local.assetsDict["/assets.utility2.template.html"];
    html = html.replace("assets.utility2.template.html", "");
    html = html.replace((
        /<title>.*?<\/title>/
    ), "<title>test-report</title>");
    // init html - style
    html = html.replace((
        "\n</style>\n"
    ), (
        "\n" +
        "</style>\n" +
        "<style>\n" +
        "/* jslint utility2:true */\n" +
        ".test-report-div img {\n" +
        "    border: 1px solid #999;\n" +
        "    margin: 5px 0 5px 0;\n" +
        "    max-height: 256px;\n" +
        "    max-width: 512px;\n" +
        "}\n" +
        ".test-report-div pre {\n" +
        "    background: #fdd;\n" +
        "    border-top: 1px solid #999;\n" +
        "    margin-bottom: 0;\n" +
        "    padding: 10px;\n" +
        "}\n" +
        ".test-report-div span {\n" +
        "    display: inline-block;\n" +
        "    width: 120px;\n" +
        "}\n" +
        ".test-report-div table {\n" +
        "    border-top: 1px solid #999;\n" +
        "    text-align: left;\n" +
        "    width: 100%;\n" +
        "}\n" +
        ".test-report-div table > tbody > tr:nth-child(odd) {\n" +
        "    background: #bfb;\n" +
        "}\n" +
        ".test-report-div .footer {\n" +
        "    text-align: center;\n" +
        "}\n" +
        ".test-report-div .platform {\n" +
        "    background: #fff;\n" +
        "    border: 1px solid #999;\n" +
        "    margin-bottom: 20px;\n" +
        "    padding: 0 10px 10px 10px;\n" +
        "    text-align: left;\n" +
        "}\n" +
        ".test-report-div .summary {\n" +
        "    background: #bfb;\n" +
        "}\n" +
        ".test-report-div .test-failed {\n" +
        "    background: #f99;\n" +
        "}\n" +
        ".test-report-div .test-pending {\n" +
        "    background: #99f;\n" +
        "}\n" +
        "</style>\n"
    ));
    // init html - body
    html = html.replace((
        /\n<\/script>[\S\s]*?<\/body>\n/
    ), function () {
        return (
            "\n" +
            "</script>\n" +
            "<div class=\"test-report-div\">\n" +
            // init html - header
            "<h1>test-report for\n" +
            "    <a href=\"" + (npm_package_homepage || "#") + "\">\n" +
            "    " + npm_package_name + " (" + npm_package_version + ")\n" +
            "    </a>\n" +
            "</h1>\n" +
            "\n" +
            // init html - summary
            "<div class=\"platform summary\">\n" +
            "<h2>summary</h2>\n" +
            "<h4>\n" +
            "    <span>version</span>- " + npm_package_version + "<br>\n" +
            "    <span>test-date</span>- " + testReport.date + "<br>\n" +
            "    <span>commit-info</span>- " +
            CI_COMMIT_ID + " - " + CI_COMMIT_MESSAGE + "<br>\n" +
            "</h4>\n" +
            "<table>\n" +
            "<thead>\n" +
            "    <tr>\n" +
            "    <th>total tests-failed</th>\n" +
            "    <th>total tests-passed</th>\n" +
            "    <th>total tests-pending</th>\n" +
            "    </tr>\n" +
            "</thead>\n" +
            "<tbody>\n" +
            "    <tr>\n" +
            "    <td class=\"" + (
                testReport.testsFailed
                ? "testFailed"
                : "testPassed"
            ) + "\">" + testReport.testsFailed + "</td>\n" +
            "    <td>" + testReport.testsPassed + "</td>\n" +
            "    <td>" + testReport.testsPending + "</td>\n" +
            "    </tr>\n" +
            "</tbody>\n" +
            "</table>\n" +
            "</div>\n" +
            "\n" +
            // init html - testPlatformList
            testPlatformList.map(function ({
                date,
                name,
                screenshot,
                testCaseList,
                testsFailed,
                testsPassed,
                testsPending,
                timeElapsed,
                timeOnload
            }, ii) {
                let errStackList;
                errStackList = [];
                screenshot = screenshot && encodeURIComponent(screenshot);
                return (
                    "<div class=\"platform\">\n" +
                    "<h4>\n" +
                    (ii + 1) + ". " + name + "<br>\n" + (
                        screenshot
                        ? "<a href=\"" + screenshot + "\">\n" +
                        "<img\n" +
                        "alt=\"" + screenshot + "\"\n" +
                        "src=\"" + screenshot + "\"\n" +
                        ">\n" +
                        "</a>\n" +
                        "<br>\n"
                        : ""
                    ) + (
                        timeOnload
                        ? "<span>onload-time</span>- " +
                        timeOnload +
                        " ms<br>\n"
                        : ""
                    ) +
                    "<span>test-date</span>- " + date + "<br>\n" +
                    "<span>time-elapsed</span>- " + timeElapsed + " ms<br>\n" +
                    "<span>tests-failed</span>- " + testsFailed + "<br>\n" +
                    "<span>tests-passed</span>- " + testsPassed + "<br>\n" +
                    "<span>tests-pending</span>- " + testsPending + "<br>\n" +
                    "</h4>\n" +
                    "\n" +
                    // init html - testCaseList
                    "<table>\n" +
                    "<thead><tr>\n" +
                    "<th>#</th>\n" +
                    "<th>time-elapsed</th>\n" +
                    "<th>status</th>\n" +
                    "<th>test-case</th>\n" +
                    "</tr></thead>\n" +
                    "<tbody>\n" +
                    testCaseList.map(function ({
                        errStack,
                        name,
                        status,
                        timeElapsed
                    }) {
                        testCaseNumber += 1;
                        if (errStack) {
                            errStackList.push(
                                testCaseNumber + ". " + name + "\n" +
                                errStack
                            );
                        }
                        return (
                            "<tr>\n" +
                            "<td>" + testCaseNumber + "</td>\n" +
                            "<td>" + timeElapsed + " ms</td>\n" +
                            "<td class=\"test-" + status + "\">" +
                            status + "</td>\n" +
                            "<td>" + name + "</td>\n" +
                            "</tr>\n"
                        );
                    }).join("") +
                    "</tbody>\n" +
                    "</table>\n" +
                    "\n" + (
                        errStackList.length
                        ? "<pre tabIndex=\"0\">\n" +
                        errStackList.join("\n") + "\n" +
                        "</pre>\n"
                        : ""
                    ) +
                    "</div>\n"
                );
            }).join("") +
            "\n" +
            // init html - footer
            "<div class=\"footer\">\n" +
            "[ this document was created with <a\n" +
            "    href=\"https://github.com/kaizhu256/node-utility2\"\n" +
            "    target=\"_blank\"\n" +
            ">utility2</a> ]\n" +
            "</div>\n" +
            "\n" +
            "</div>\n" +
            "</body>\n"
        );
    });
    testReport = Object.assign(testReport, {
        html,
        testPlatformList
    });
    // 3. write <testReport> to fs
    if (mode !== "modeWrite") {
        return testReport;
    }
    delete testReport.coverage;
    delete testReport.html;
    // print test-report summary
    console.error(
        "\n" + new Array(56).join("-") + "\n" +
        testPlatformList.filter(function (testPlatform) {
            // if testPlatform has no tests, then filter it out
            return testPlatform.testCaseList.length;
        }).map(function (testPlatform) {
            return (
                "| test-report - " + testPlatform.name + "\n|" +
                String(
                    testPlatform.timeElapsed + " ms     "
                ).padStart(16, " ") +
                String(
                    testPlatform.testsFailed + " failed "
                ).padStart(16, " ") +
                String(
                    testPlatform.testsPassed + " passed "
                ).padStart(16, " ") +
                "     |\n" + new Array(56).join("-") + "\n"
            );
        }).join("")
    );
    // print failed testCase
    testPlatformList.forEach(function (testPlatform) {
        testPlatform.testCaseList.forEach(function (testCase) {
            if (testCase.status !== "passed") {
                console.error(JSON.stringify(testCase, undefined, 4));
            }
        });
    });
    // jslint html
    jslintAndPrint(html, "test-report.html");
    // create test-report.html
    fileWrite("test-report.html", html);
    // create commit.badge.svg
    fileWrite("commit.badge.svg", local.svgBadgeCreate({
        fill: "#07f",
        str1: "last build",
        str2: (
            new Date().toISOString().slice(0, 19).replace("T", " ") +
            " - " + CI_BRANCH + " - " + CI_COMMIT_ID
        )
    }));
    // create test-report.badge.svg
    fileWrite("test-report.badge.svg", local.svgBadgeCreate({
        fill: (
            testPlatformList[0].testsFailed
            ? "#d00"
            : "#0d0"
        ),
        str1: "tests failed",
        str2: testPlatformList[0].testsFailed
    }));
    // if tests failed, then exit with non-zero exitCode
    process.exit(testReport.testsFailed !== 0);
};

local.testRunDefault = async function (testCaseDict = {}) {
/*
 * this function will run tests in <testCaseDict>
 */
    let consoleError;
    let isCoverage;
    let processExit;
    let testPlatform;
    let testReport;
    let timerInterval;
    function timeElapsedPoll(opt) {
    /*
     * this function will poll "Date.now() - <opt>.timeStart"
     */
        opt.timeStart = opt.timeStart || Date.now();
        opt.timeElapsed = Date.now() - opt.timeStart;
    }
    async function testCaseRun(testCase) {
        let testCasePromise;
        let testCaseResolve;
        testCasePromise = new Promise(function (resolve) {
            testCaseResolve = resolve;
        });
        function onError(err) {
            // update testPlatform.timeElapsed
            timeElapsedPoll(testPlatform);
            // if testCase isDone, then fail testCase
            if (testCase.isDone) {
                err = err || new Error(
                    "callback in testCase " +
                    testCase.name +
                    " called multiple times"
                );
            }
            // if err occurred, then fail testCase
            if (err) {
                // restore console.log
                console.error = consoleError;
                testCase.status = "failed";
                consoleError(
                    "\ntestRunDefault - " +
                    testPlatform.timeElapsed + " ms - testCase failed - " +
                    testCase.name + "\n" + err.message + "\n" + err.stack
                );
                testCase.errStack = (
                    testCase.errStack || err.message + "\n" + err.stack
                );
                // validate errStack is non-empty
                assertOrThrow(
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
            timeElapsedPoll(testCase);
            consoleError(
                "testRunDefault - " +
                testPlatform.timeElapsed + " ms - [" + (
                    isEnvNode
                    ? "node"
                    : "browser"
                ) + " test-case " +
                testPlatform.testCaseList.filter(function (testCase) {
                    return testCase.isDone;
                }).length + " of " + testPlatform.testCaseList.length
                + " " + testCase.status + "] - " + testCase.name
            );
            testCaseResolve();
        }
        try {
            timeElapsedPoll(testCase);
            testCase.onTestCase({}, onError);
            noop(await testCasePromise);
        } catch (errCaught) {
            onError(errCaught);
        }
    }
    if (npm_config_mode_lib) {
        return;
    }
    // init middlewareList
    local.middlewareList = local.middlewareList || [];
    // init http-server on $PORT
    if (isEnvNode && !globalThis.utility2_serverHttp1) {
        globalThis.utility2_serverHttp1 = require("http").createServer(
            local.serverRequestListener
        );
        console.error("http-server listening on port " + PORT);
        local.onReadyIncrement();
        globalThis.utility2_serverHttp1.listen(PORT, local.onReadyDecrement);
    }
    globalThis.utility2_modeTest = (
        globalThis.utility2_modeTest ||
        testCaseDict.modeTest ||
        npm_config_mode_test
    ) | 0;
    if (
        globalThis.utility2_modeTest !== 1 ||
        Object.keys(testCaseDict).length === 0
    ) {
        return;
    }
    if (localOnReadyCnt !== 0) {
        local.eventListenerAdd("utility2.onReady", {
            once: true
        }, local.testRunDefault.bind(undefined, testCaseDict));
        return;
    }
    globalThis.utility2_modeTest += 1;
    // visual notification - testRun
    // mock console.error
    consoleError = console.error;
    isCoverage = (
        typeof globalThis.__coverage__ === "object" &&
        globalThis.__coverage__ &&
        Object.keys(globalThis.__coverage__).length
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
    if (isEnvNode) {
        processExit = process.exit;
        process.exit = function (exitCode) {
            local.eventListenerEmit(
                "utility2.testRunMock.process.exit",
                exitCode | 0
            );
        };
    }
    // init testReport
    testReport = globalThis.utility2_testReport;
    // init testPlatform
    testPlatform = testReport.testPlatformList[0];
    // init testPlatform timer
    timeElapsedPoll(testPlatform);
    // reset testPlatform.testCaseList
    testPlatform.testCaseList.length = 0;
    // add tests into testPlatform.testCaseList
    Object.entries(testCaseDict).forEach(function ([
        key, val
    ]) {
        // add testCase testCaseDict[key] to testPlatform.testCaseList
        if (
            key && typeof val === "function" && (
                npm_config_mode_test_case
                ? npm_config_mode_test_case.split(",").indexOf(key) >= 0
                : key.indexOf("testCase_") === 0
            )
        ) {
            testPlatform.testCaseList.push({
                name: key,
                status: "pending",
                onTestCase: val
            });
        }
    });
    local.testReportMerge(testReport);
    local.eventListenerEmit("utility2.testRunStart", testReport);
    // testRunUpdate every 2000 ms until isDone
    timerInterval = setInterval(function () {
        // update testPlatform.timeElapsed
        timeElapsedPoll(testPlatform);
        local.testReportMerge(testReport);
        local.eventListenerEmit("utility2.testRunUpdate", testReport);
        // cleanup timerInterval
        if (!testReport.testsPending) {
            clearInterval(timerInterval);
        }
        // list pending testCase every 5000 ms
        if (testPlatform.timeElapsed % 5000 < 3000) {
            consoleError(
                "testRunDefault - " +
                testPlatform.timeElapsed + " ms - testCase pending - " +
                testPlatform.testCaseList.filter(function (testCase) {
                    return testCase.status === "pending";
                }).slice(0, 4).map(function (testCase) {
                    return testCase.name;
                }).join(", ") + " ..."
            );
        }
    }, 2000);
    // run testCaseList
    await Promise.all(testPlatform.testCaseList.map(testCaseRun));
    clearInterval(timerInterval);
    // update timeElapsed
    timeElapsedPoll(testPlatform);
    // finalize testReport
    local.testReportMerge(testReport);
    // restore console.log
    console.error = consoleError;
    // restore process.exit
    if (processExit) {
        process.exit = processExit;
    }
    // create test-report.json
    delete testReport.coverage;
    local.fsWriteFileWithMkdirpSync(
        UTILITY2_DIR_BUILD + "/test-report.json",
        JSON.stringify(testReport, undefined, 4)
    );
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
    onError = onError || noop;
    if (!(
        elem &&
        elem.style && elem.style.maxHeight !== "100%" &&
        elem.classList && elem.classList.contains("uiAnimateSlide")
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
        elem &&
        elem.style && elem.style.maxHeight !== "0px" &&
        elem.classList && elem.classList.contains("uiAnimateSlide")
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

local.uuid4Create = function () {
/*
 * this function will create random uuid with format
 * "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
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

/* validateLineSortedReset */
// run shared js-env code - init-after
// init utility2_testReport
globalThis.utility2_testReport = local.testReportMerge(
    globalThis.utility2_testReport
);
local.regexpCharsetEncodeUri = (
    /!#\$%&'\(\)\*\+,-\.\/0123456789:;=\?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~/
);
local.regexpCharsetEncodeUriComponent = (
    /!%'\(\)\*-\.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~/
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
    "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007" +
    "\b\t\n\u000b\f\r\u000e\u000f" +
    "\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017" +
    "\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f" +
    " !\"#$%&'()*+,-./0123456789:;<=>?" +
    "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_" +
    "`abcdefghijklmnopqrstuvwxyz{|}~\u007f"
);
assertJsonEqual(
    local.stringCharsetAscii,
    Array.from(new Array(128), function (ignore, ii) {
        return String.fromCharCode(ii);
    }).join("")
);
local.stringCharsetEncodeUri = (
    "!#$%&'()*+,-./" +
    "0123456789:;=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~"
);
local.stringCharsetEncodeUriComponent = (
    "!%'()*-." +
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~"
);
local.stringHelloEmoji = "hello \ud83d\ude01\n";


/* istanbul ignore next */
// run node js-env code - init-after
(function () {
if (!isEnvNode) {
    return;
}
// exit after $npm_config_timeout_exit
if (!npm_config_mode_lib && npm_config_timeout_exit) {
    setTimeout(process.exit.bind(undefined, 15), npm_config_timeout_exit);
}
// merge previous test-report
if (!npm_config_mode_lib && npm_config_mode_test_report_merge) {
    local.testReportMerge(
        globalThis.utility2_testReport,
        local.fsReadFileOrDefaultSync(
            UTILITY2_DIR_BUILD + "/test-report.json",
            "json",
            {}
        )
    );
    if (process.argv[2] !== "--help") {
        console.error(
            "\n" + MODE_CI + " - merged test-report from file " +
            UTILITY2_DIR_BUILD + "/test-report.json"
        );
    }
}
// init cli
local.cliDict = {};
local.cliDict["utility2.browserTest"] = async function () {
/*
 * <urlList> <mode>
 * will browser-test in parallel, comma-separated <urlList> with given <mode>
 */
    local.browserTest({
        url: process.argv[3]
    });
};

local.cliDict["utility2.testReportCreate"] = function () {
/*
 *
 * will create test-report
 */
    let testReport;
    try {
        testReport = JSON.parse(require("fs").readFileSync(
            UTILITY2_DIR_BUILD + "/test-report.json",
            "utf8"
        ));
    } catch (ignore) {}
    local.testReportMerge(testReport, {}, "modeWrite");
};

if (module === require.main && (!globalThis.utility2_rollup || (
    process.argv[2] &&
    local.cliDict[process.argv[2]] &&
    process.argv[2].indexOf("utility2.") === 0
))) {
    local.cliRun({});
    if (local.cliDict[process.argv[2]]) {
        switch (process.argv[2]) {
        case "--interactive":
        case "-i":
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
        ).split("\n/* script-end /assets.utility2.rollup.end.js */")[0] +
        "\n/* script-end /assets.utility2.rollup.end.js */\n"
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
                /\\n\\$|\\(.)/gm
            ), function (ignore, match1) {
                return match1 || "";
            });
            match0 = match0.replace(
                "<script src=\"assets.app.js\"></script>\n",
                (
                    "<script " +
                    "src=\"assets.utility2.rollup.js\"></script>\n" +
                    "<script " +
                    "src=\"assets.utility2.example.js\"></script>\n" +
                    "<script " +
                    "src=\"assets.utility2.test.js\"></script>\n"
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
/* validateLineSortedReset */
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
                "local.assetsDict[\"" + key + "\"] = (\n" +
                JSON.stringify(local.assetsDict[key]).replace((
                    /\\\\/g
                ), "\u0000").replace((
                    /\\n/g
                ), "\\n\\\n").replace((
                    /\u0000/g
                ), "\\\\") +
                ");\n"
            );
        });
        break;
    case "/assets.utility2.rollup.start.js":
    case "/assets.utility2.rollup.end.js":
        code = local.assetsDict[key];
        break;
    case "header":
        return (
            "/* this rollup was created with utility2\n" +
            " * https://github.com/kaizhu256/node-utility2\n" +
            " */\n"
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
        "/* script-begin " + key + " */\n" +
        code.trim() +
        "\n/* script-end " + key + " */\n"
    );
}).join("\n\n\n");
}());
}());
}());
