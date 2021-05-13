# utility2
this zero-dependency package will provide high-level functions to to build, test, and deploy webapps

# live web demo
- [https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.com/app](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.com/app/)

[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithub.browser.%252Fnode-utility2%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.com/app/)


[![travis-ci.com build-status](https://api.travis-ci.com/kaizhu256/node-utility2.svg)](https://travis-ci.com/kaizhu256/node-utility2) [![coverage](https://kaizhu256.github.io/node-utility2/build/coverage/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build/coverage/index.html)

[![build commit status](https://kaizhu256.github.io/node-utility2/build/build.badge.svg)](https://travis-ci.com/kaizhu256/node-utility2)

| git-branch : | [master](https://github.com/kaizhu256/node-utility2/tree/master) | [beta](https://github.com/kaizhu256/node-utility2/tree/beta) | [alpha](https://github.com/kaizhu256/node-utility2/tree/alpha)|
|--:|:--|:--|:--|
| test-server-github : | [![github.com test-server](https://kaizhu256.github.io/node-utility2/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.com/app) | [![github.com test-server](https://kaizhu256.github.io/node-utility2/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.com/app) | [![github.com test-server](https://kaizhu256.github.io/node-utility2/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.com/app)|
| test-server-heroku : | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://h1-utility2-master.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://h1-utility2-beta.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://h1-utility2-alpha.herokuapp.com)|
| test-report : | [![test-report](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.com/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.com/test-report.html) | [![test-report](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.com/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.com/test-report.html) | [![test-report](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.com/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.com/test-report.html)|
| coverage : | [![coverage](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.com/coverage/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.com/coverage/index.html) | [![coverage](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.com/coverage/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.com/coverage/index.html) | [![coverage](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.com/coverage/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.com/coverage/index.html)|
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build..master..travis-ci.com) | [![build-artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build..beta..travis-ci.com) | [![build-artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build..alpha..travis-ci.com)|

[![npmPackageListing](https://kaizhu256.github.io/node-utility2/build/screenshot.npmPackageListing.svg)](https://github.com/kaizhu256/node-utility2)


# table of contents
1. [cdn download](#cdn-download)
1. [documentation](#documentation)
1. [quickstart standalone app](#quickstart-standalone-app)
1. [quickstart example.js](#quickstart-examplejs)
1. [extra screenshots](#extra-screenshots)
1. [package.json](#packagejson)
1. [changelog of last 50 commits](#changelog-of-last-50-commits)
1. [internal build script](#internal-build-script)
1. [misc](#misc)


# cdn download
- [https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.com/app/assets.utility2.rollup.js](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.com/app/assets.utility2.rollup.js)


# documentation
#### api doc
- [https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.com/apidoc.html](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.com/apidoc.html)

[![apidoc](https://kaizhu256.github.io/node-utility2/build/screenshot.ci.browser.%252F.tmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.com/apidoc.html)

#### cli help
![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.npmPackageCliHelp.svg)

#### changelog 2020.12.3
- pre - migrate ci from travis-ci.com to github.com
- remove shell-functions shBuildInsideDocker, shChromeSocks5, shCryptoTravisEncrypt, shMacAddressSpoof, shNpmDeprecateAlias, shNpmPublishAlias, shTravisRepoCreate, shTravisRepoTrigger
- init shell-var \$CI_xxx in shell-function shCiInit instead of shCiMain
- rename shBuildXxx to shCiXxx
- merge shell-function shIstanbulCover into shNpmTest
- update shell-function shRunWithScreenshotTxt with fixed \$EXIT_CODE
- replace var isBrowser with isEnvNode and remove unused var isWebWorker
- merge state modeTest into npm_config_mode_test, modeTestCase into npm_config_mode_test_case, timeoutDefault into npm_config_timeout
- add functions documentQuerySelectorAll
- remove functions middlewareXxx, onParallelXxx, streamCleanup
- add file .windows_terminals_settings.json
- in shell-functions remove whitespace between "shXxx ()"
- none

#### todo
- migrate ci from travis-ci.com to github.com
- reimplement timerTimeout in function testRunDefault
- fix broken auto-jslint for README.md
- fix test-report bug with duplicate github and heroku tests
- update function fsWriteFileWithMkdirp to write to tmpfile first
- jslint - unmangle function jslintAutofixLocalFunction
- istanbul - inline class Instrumenter into function instrumentSync
- add default testCase _testCase_cliRun_help
- add server stress-test using chromeDevtoolsClientCreate
- none


# quickstart standalone app
#### to run this example, follow instruction in script below
- [assets.app.js](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.com/app/assets.app.js)
```shell
# example.sh

# this shell script will download and run web-demo of utility2 as standalone app

# 1. download standalone app
curl -O https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.com/app/assets.app.js
# 2. run standalone app
PORT=8081 node ./assets.app.js
# 3. open browser to http://127.0.0.1:8081 and play with web-demo
# 4. edit file assets.app.js to suit your needs
```

#### output from browser
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.readmeEvalExampleSh.browser.%252F.png)](https://kaizhu256.github.io/node-utility2/build/app/assets.example.html)

#### output from shell
![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.readmeEvalExampleSh.svg)


# quickstart example.js
![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.readmeEvalExampleJs.browser.%252Ftmp%252Fapp%252F.tmp%252Fbuild%252Ftest-report.html.png)

#### to run this example, follow the instruction in the script below
- [example.js](https://kaizhu256.github.io/node-utility2/build/example.js)
```javascript
/*
example.js

this script will demo automated browser-tests with coverage
(via puppeteer and istanbul)

instruction
    1. save this script as example.js
    2. run the shell-command:
        $ npm install utility2 && \
            PATH="$(pwd)/node_modules/.bin:$PATH" \
            PORT=8081 \
            UTILITY2_DIR_BUILD=.tmp/build \
            npm_config_mode_coverage=utility2 \
            node_modules/.bin/utility2 test example.js
    3. view test-report in .tmp/build/test-report.html
    4. view coverage in .tmp/build/coverage/index.html
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
     * this function will return document.querySelectorAll(<selector>)
     * or empty list if function is not available
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
     * this function will if items from <tgt> are null, undefined,
     * or "", then overwrite them with items from <src>
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


/* jslint utility2:true */
(function (local) {
"use strict";


// run shared js-env code - init-before
(function () {
// init local
local = (
    globalThis.utility2_rollup ||
    globalThis.utility2_utility2 ||
    require("utility2")
);
// init exports
globalThis.local = local;
}());


// run shared js-env code - function
(function () {
// init assets
local.assetsDict["/assets.hello.txt"] = "hello \ud83d\ude01\n";
local.assetsDict["/assets.index.template.html"] = "";

local.testCase_httpFetch_200 = async function (opt, onError) {
/*
 * this function will test httpFetch's "200 ok" handling-behavior
 */
    // test httpFetch-path "assets.hello.txt"
    opt = await local.httpFetch("assets.hello.txt");
    // validate status is 200
    local.assertJsonEqual(opt.status, 200);
    // validate responseText
    local.assertJsonEqual(await opt.text(), "hello \ud83d\ude01\n");
    onError(undefined, opt);
};

local.testCase_httpFetch_404 = async function (opt, onError) {
/*
 * this function will test httpFetch's "404 not found" handling-behavior
 */
    // test httpFetch-path "undefined"
    opt = await local.httpFetch("assets.hello.txt");
    // validate status is 200 - should fail
    local.assertJsonEqual(opt.status, 200);
    onError();
};

local.testCase_webpage_default = async function (opt, onError) {
/*
 * this function will test webpage's default handling-behavior
 */
    if (!local.isEnvNode) {
        onError(undefined, opt);
        return;
    }
    await local.browserTest({
        url: "http://127.0.0.1:" + process.env.PORT + "/?npm_config_mode_test=1"
    });
    onError(undefined, opt);
};

// run tests
if (local.isEnvNode && process.env.npm_config_mode_test) {
    local.testRunDefault(local);
}
}());


/* istanbul ignore next */
// run browser js-env code - init-test
(function () {
if (local.isEnvNode) {
    return;
}
// log stderr and stdout to #outputStdout1
["error", "log"].forEach(function (key) {
    let elem;
    let fnc;
    elem = document.querySelector("#outputStdout1");
    if (!elem) {
        return;
    }
    fnc = console[key];
    console[key] = function (...argList) {
        fnc(...argList);
        // append text to #outputStdout1
        elem.textContent += argList.map(function (arg) {
            return (
                typeof arg === "string"
                ? arg
                : JSON.stringify(arg, undefined, 4)
            );
        }).join(" ").replace((
            /\u001b\[\d+?m/g
        ), "") + "\n";
        // scroll textarea to bottom
        elem.scrollTop = elem.scrollHeight;
    };
});
}());


/* istanbul ignore next */
// run node js-env code - init-test
(function () {
if (!local.isEnvNode) {
    return;
}
// init exports
module.exports = local;
// init assetsDict
local.assetsDict = local.assetsDict || {};
local.assetsDict["/assets.utility2.js"] = (
    local.assetsDict["/assets.utility2.js"] ||
    require("fs").readFileSync(
        require("path").resolve(local.__dirname + "/lib.utility2.js"),
        "utf8"
    ).replace((
        /^#!\//
    ), "// ")
);
/* validateLineSortedReset */
/* jslint ignore:start */
local.assetsDict["/"] = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta
    content="width=device-width, initial-scale=1"
    name="viewport"
>
<!-- "assets.utility2.template.html" -->
<title>utility2 (2020.12.3)</title>
<style>
/* jslint utility2:true */
/*csslint
*/
/* csslint ignore:start */
*,
*:after,
*:before {
    box-sizing: border-box;
}
.uiAnimateSlide {
    overflow-y: hidden;
    transition:
        max-height ease-in 250ms,
        min-height ease-in 250ms,
        padding-bottom ease-in 250ms,
        padding-top ease-in 250ms;
}
/* csslint ignore:end */
@keyframes uiAnimateSpin {
0% {
    transform: rotate(0deg);
}
100% {
    transform: rotate(360deg);
}
}
a {
    overflow-wrap: break-word;
}
body {
    background: #f7f7f7;
    font-family: Arial, Helvetica, sans-serif;
    font-size: small;
    margin: 0 40px;
}
body > div,
body > input,
body > pre,
body > .button,
body > .textarea {
    margin-bottom: 20px;
    margin-top: 0;
}
body > input,
body > .button {
    width: 20rem;
}
body > .readonly {
    background: #ddd;
}
body > .textarea {
    height: 10rem;
    resize: vertical;
    width: 100%;
}
code,
pre,
.textarea {
    font-family: Consolas, Menlo, monospace;
    font-size: smaller;
}
pre {
    overflow-wrap: break-word;
    white-space: pre-wrap;
}
.button {
    background: #ddd;
    border: 1px solid #999;
    color: #000;
    cursor: pointer;
    display: inline-block;
    padding: 2px 5px;
    text-align: center;
    text-decoration: none;
}
.button:hover {
    background: #bbb;
}
.colorError {
    color: #d00;
}
.textarea {
    background: #fff;
    border: 1px solid #999;
    border-radius: 0;
    cursor: auto;
    overflow: auto;
    padding: 2px;
}
.zeroPixel {
    border: 0;
    height: 0;
    margin: 0;
    padding: 0;
    width: 0;
}
</style>
</head>
<body>
<div class="uiAnimateSpin" style="
    animation: uiAnimateSpin 2s linear infinite;
    border-radius: 50%;
    border-top: 5px solid #7d7;
    border: 5px solid #999;
    display: none;
    height: 25px;
    vertical-align: middle;
    width: 25px;
"></div>
<script>
/* jslint utility2:true */
(function () {
    "use strict";
    // polyfill globalThis
    window.globalThis = window;
    // measure-and-print time-elapsed for window.onload
    if (!window.domOnEventWindowOnloadTimeElapsed) {
        window.domOnEventWindowOnloadTimeElapsed = Date.now() + 100;
        window.addEventListener("load", function () {
            setTimeout(function () {
                window.domOnEventWindowOnloadTimeElapsed = (
                    Date.now() -
                    window.domOnEventWindowOnloadTimeElapsed
                );
                console.error(
                    "domOnEventWindowOnloadTimeElapsed = " +
                    window.domOnEventWindowOnloadTimeElapsed
                );
            }, 100);
        });
    }
    // limit select-all within <pre tabIndex="0"> elem
    if (!window.domOnEventSelectAllWithinPre) {
        window.domOnEventSelectAllWithinPre = function (evt) {
            let range;
            let selection;
            if (
                (evt.ctrlKey || evt.metaKey) &&
                evt.key === "a" &&
                evt.target.closest("pre")
            ) {
                range = document.createRange();
                range.selectNodeContents(evt.target.closest("pre"));
                selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                evt.preventDefault();
            }
        };
        // handle evt
        document.addEventListener(
            "keydown",
            window.domOnEventSelectAllWithinPre
        );
    }
}());
</script>
<h1>
<a href="https://github.com/kaizhu256/node-utility2" target="_blank">
    utility2 (2020.12.3)
</a>
</h1>
<h3>this zero-dependency package will provide high-level functions to to build, test, and deploy webapps</h3>
<a
    class="button" download href="assets.app.js"
>download standalone app</a><br>
<button
    class="button"
    id="buttonTestRun1"
>run browser-tests</button><br>
<div class="uiAnimateSlide" id="htmlTestReport1" style="
    border-bottom: 0;
    border-top: 0;
    margin-bottom: 0;
    margin-top: 0;
    max-height: 0;
    padding-bottom: 0;
    padding-top: 0;
"></div>


<!-- custom-html-start -->
<label>edit or paste script below to cover and test</label>
<textarea
    class="textarea"
    id="inputTextarea1">
// remove comment below to disable jslint
/*jslint browser, devel*/
/*global window*/
(function () {
    "use strict";
    let local = window.utility2;
    let testCaseDict = {
        modeTest: 1
    };

    // comment this testCase to disable failed error demo
    testCaseDict.testCase_failed_error_demo = function (opt, onError) {
    /*
     * this function will run a failed error demo
     */
        onError(new Error("this is a failed error demo"), opt);
    };

    testCaseDict.testCase_passed_http_fetch_demo = function (opt, onError) {
    /*
     * this function will demo a passed http-fetch test
     */
        // fetch main-page "/"
        window.fetch("/").then(function (res) {
            // validate "200 ok" status
            local.assertOrThrow(res.status === 200, res.status);
            return res.text();
        }).then(function (data) {
            // validate non-empty data
            local.assertOrThrow(data && data.length > 0, data);
            onError(undefined, opt);
        // handle err
        }).catch(onError);
    };

    // create coverage-report
    local.eventListenerAdd("utility2.testRunEnd", {}, function () {
        document.querySelector(
            "#htmlCoverageReport1"
        ).innerHTML = local.coverageReportCreate({});
    });

    // run tests
    if (!(
        /\bnpm_config_mode_test=1\b/
    ).test(location.search)) {
        local.testRunDefault(testCaseDict);
    }
}());
</textarea>
<button
    class="button"
    id="buttonJslintAutofix1"
>jslint autofix</button><br>
<pre class= "colorError" id="outputJslintPre1" tabindex="0"></pre>
<label>instrumented-code</label>
<textarea
    class="readonly textarea"
    id="outputTextarea1"
    readonly
    tabindex="0"
></textarea>
<label>stderr and stdout</label>
<textarea
    class="onevent-output-reset readonly textarea"
    id="outputStdout1"
    readonly
></textarea>
<div id="htmlCoverageReport1"></div>
<script>
/* jslint utility2:true */
/*jslint eval*/
window.addEventListener("load", function () {
    "use strict";
    let local;
    function testRun(evt) {
        // jslint #inputTextarea1
        local.jslintAndPrint(document.querySelector(
            "#inputTextarea1"
        ).value, "inputTextarea1.js", {
            modeAutofix: evt.target.id === "buttonJslintAutofix1",
            modeConditional: evt.target.id !== "buttonJslintAutofix1"
        });
        document.querySelector(
            "#outputJslintPre1"
        ).textContent = local.jslint.jslintResult.errMsg.replace((
            /\\u001b\\[\\d*m/g
        ), "").trim();
        // jslint-autofix #inputTextarea1
        if (local.jslint.jslintResult.autofix) {
            document.querySelector(
                "#inputTextarea1"
            ).value = local.jslint.jslintResult.code;
        }
        // try to cleanup __coverage__
        try {
            delete globalThis.__coverage__["/inputTextarea1.js"];
        } catch (ignore) {}
        // try to cover and eval #inputTextarea1
        try {
            document.querySelector(
                "#outputTextarea1"
            ).value = local.istanbul.instrumentSync(
                document.querySelector("#inputTextarea1").value,
                "/inputTextarea1.js"
            );
            eval(
                document.querySelector("#outputTextarea1").value
            );
        } catch (errCaught) {
            console.error(errCaught);
        }
    }
    // init local
    local = window.utility2;
    // init evt-handling
    document.querySelector(
        "#buttonJslintAutofix1"
    ).addEventListener("click", testRun);
    document.querySelector(
        "#inputTextarea1"
    ).addEventListener("keyup", testRun);
    // testRun
    testRun({
        target: {}
    });
});
</script>
<!-- custom-html-end -->


<script>
window.utility2_state = {
npm_config_mode_backend: undefined,
npm_package_description: "this zero-dependency package will provide high-level functions to to build, test, and deploy webapps",
npm_package_homepage: "https://github.com/kaizhu256/node-utility2",
npm_package_name: "utility2",
npm_package_nameLib: "utility2",
npm_package_version: "2020.12.3"
}
</script>
<script src="assets.utility2.lib.istanbul.js"></script>
<script src="assets.utility2.lib.jslint.js"></script>
<script src="assets.utility2.lib.marked.js"></script>
<script src="assets.utility2.js"></script>
<script>
/* jslint utility2:true */
window.utility2.onReadyIncrement();
window.addEventListener("load", function () {
    "use strict";
    let local;
    function onTestRun({
        msg,
        target,
        type
    }) {
        switch ((target && target.id) || type) {
        case "buttonTestRun1":
            window.utility2_modeTest = 1;
            local.testRunDefault(window.local);
            return;
        case "utility2.testRunEnd":
            document.querySelectorAll(
                "#buttonTestRun1"
            ).forEach(function (elem) {
                elem.textContent = "run tests";
            });
            document.querySelectorAll(
                "#htmlTestReport1"
            ).forEach(function (elem) {
                elem.innerHTML = msg.html;
            });
            return;
        case "utility2.testRunStart":
            document.querySelectorAll(
                ".onevent-output-reset"
            ).forEach(function (elem) {
                elem.textContent = "";
            });
            document.querySelectorAll(
                "#buttonTestRun1"
            ).forEach(function (elem) {
                elem.textContent = "running tests";
            });
            document.querySelectorAll(
                "#htmlTestReport1"
            ).forEach(function (elem) {
                local.uiAnimateSlideDown(elem);
                elem.innerHTML = msg.html;
            });
            return;
        case "utility2.testRunUpdate":
            document.querySelectorAll(
                "#htmlTestReport1"
            ).forEach(function (elem) {
                local.uiAnimateSlideDown(elem);
                elem.innerHTML = msg.html;
            });
            return;
        }
    }
    local = window.utility2;
    document.querySelectorAll(
        "#buttonTestRun1"
    ).forEach(function (elem) {
        elem.addEventListener("click", onTestRun);
    });
    local.eventListenerAdd("utility2.testRunEnd", {}, onTestRun);
    local.eventListenerAdd("utility2.testRunUpdate", {}, onTestRun);
    local.eventListenerAdd("utility2.testRunStart", {}, onTestRun);
    local.onReadyDecrement();
});
</script>

<script src="assets.example.js"></script>
<script src="assets.test.js"></script>
<div style="text-align: center;">
    [
    this app was created with
    <a
        href="https://github.com/kaizhu256/node-utility2"
        target="_blank"
    >utility2</a>
    ]
</div>
</body>
</html>
`;
/* jslint ignore:end */
local.assetsDict["/assets.example.html"] = local.assetsDict["/"];
// init cli
if (module !== require.main || globalThis.utility2_rollup) {
    return;
}
local.assetsDict["/assets.example.js"] = (
    local.assetsDict["/assets.example.js"] ||
    require("fs").readFileSync(__filename, "utf8")
);
local.assetsDict["/favicon.ico"] = local.assetsDict["/favicon.ico"] || "";
local.assetsDict["/index.html"] = local.assetsDict["/"];
// if $npm_config_timeout_exit exists,
// then exit this process after $npm_config_timeout_exit ms
if (process.env.npm_config_timeout_exit) {
    setTimeout(
        process.exit.bind(undefined, 15),
        process.env.npm_config_timeout_exit | 0
    ).unref();
}
// start server
if (globalThis.utility2_serverHttp1) {
    return;
}
process.env.PORT = process.env.PORT || "8081";
console.error("http-server listening on port " + process.env.PORT);
require("http").createServer(function (req, res) {
    let data;
    data = local.assetsDict[require("url").parse(req.url).pathname];
    if (data !== undefined) {
        res.end(data);
        return;
    }
    res.statusCode = 404;
    res.end();
}).listen(process.env.PORT);
}());
}());
```

#### output from browser
![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.readmeEvalExampleJs.browser.%252Ftmp%252Fapp%252F.tmp%252Fbuild%252Ftest-report.html.png)

#### output from shell
![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.readmeEvalExampleJs.svg)


# extra screenshots
1. [https://kaizhu256.github.io/node-utility2/build/screenshot.ci.browser.%252F.tmp%252Fbuild%252Fapidoc.html.png](https://kaizhu256.github.io/node-utility2/build/screenshot.ci.browser.%252F.tmp%252Fbuild%252Fapidoc.html.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.ci.browser.%252F.tmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.ci.browser.%252F.tmp%252Fbuild%252Fapidoc.html.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.ci.browser.%252F.tmp%252Fbuild%252Fcoverage.lib.html.png](https://kaizhu256.github.io/node-utility2/build/screenshot.ci.browser.%252F.tmp%252Fbuild%252Fcoverage.lib.html.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.ci.browser.%252F.tmp%252Fbuild%252Fcoverage.lib.html.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.ci.browser.%252F.tmp%252Fbuild%252Fcoverage.lib.html.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.ci.browser.%252F.tmp%252Fbuild%252Ftest-report.html.png](https://kaizhu256.github.io/node-utility2/build/screenshot.ci.browser.%252F.tmp%252Fbuild%252Ftest-report.html.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.ci.browser.%252F.tmp%252Fbuild%252Ftest-report.html.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.ci.browser.%252F.tmp%252Fbuild%252Ftest-report.html.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithub.browser.%252Fnode-utility2%252Fbuild%252Fapp.png](https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithub.browser.%252Fnode-utility2%252Fbuild%252Fapp.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithub.browser.%252Fnode-utility2%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithub.browser.%252Fnode-utility2%252Fbuild%252Fapp.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithubTest.browser.%252Fnode-utility2%252Fbuild%252Fapp.png](https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithubTest.browser.%252Fnode-utility2%252Fbuild%252Fapp.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithubTest.browser.%252Fnode-utility2%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithubTest.browser.%252Fnode-utility2%252Fbuild%252Fapp.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.deployHeroku.browser.%252F.png](https://kaizhu256.github.io/node-utility2/build/screenshot.deployHeroku.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.deployHeroku.browser.%252F.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.deployHeroku.browser.%252F.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.deployHerokuTest.browser.%252F.png](https://kaizhu256.github.io/node-utility2/build/screenshot.deployHerokuTest.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.deployHerokuTest.browser.%252F.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.deployHerokuTest.browser.%252F.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.npmTest.browser.%252F.png](https://kaizhu256.github.io/node-utility2/build/screenshot.npmTest.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.npmTest.browser.%252F.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.npmTest.browser.%252F.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.readmeEvalExampleJs.browser.%252F.png](https://kaizhu256.github.io/node-utility2/build/screenshot.readmeEvalExampleJs.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.readmeEvalExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.readmeEvalExampleJs.browser.%252F.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.readmeEvalExampleSh.browser.%252F.png](https://kaizhu256.github.io/node-utility2/build/screenshot.readmeEvalExampleSh.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.readmeEvalExampleSh.browser.%252F.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.readmeEvalExampleSh.browser.%252F.png)


# package.json
```json
{
    "!!jslint_utility2": true,
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": {
        "utility2": "lib.utility2.sh",
        "utility2-apidoc": "lib.apidoc.js",
        "utility2-istanbul": "lib.istanbul.js",
        "utility2-jslint": "lib.jslint.js"
    },
    "description": "this zero-dependency package will provide high-level functions to to build, test, and deploy webapps",
    "devDependencies": {},
    "engines": {
        "node": ">=12.0"
    },
    "fileCount": 28,
    "homepage": "https://github.com/kaizhu256/node-utility2",
    "keywords": [
        "continuous-integration",
        "npmdoc",
        "npmtest",
        "test-coverage",
        "travis-ci"
    ],
    "license": "MIT",
    "main": "lib.utility2.js",
    "name": "utility2",
    "nameAliasPublish": "",
    "nameAliasPublish2": "npmtest-lite test-lite",
    "nameLib": "utility2",
    "nameOriginal": "utility2",
    "repository": {
        "type": "git",
        "url": "https://github.com/kaizhu256/node-utility2.git"
    },
    "scripts": {
        "build-ci": "sh npm_scripts.sh",
        "env": "env",
        "eval": "sh npm_scripts.sh",
        "heroku-postbuild": "sh npm_scripts.sh",
        "postinstall": "sh npm_scripts.sh",
        "start": "sh npm_scripts.sh",
        "test": "sh npm_scripts.sh",
        "utility2": "sh npm_scripts.sh"
    },
    "utility2Dependents": [
        "2020.06.08 apidoc-lite",
        "2020.06.12 bootstrap-lite",
        "2020.08.19 sqlite3-lite",
        "2020.10.27 jslint-lite",
        "2020.11.12 istanbul-lite",
        "2020.12.01 utility2"
    ],
    "version": "2020.12.3"
}
```


# changelog of last 50 commits
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.gitLog.svg)](https://github.com/kaizhu256/node-utility2/commits)


# internal build script
- Dockerfile.base
```shell
# Dockerfile.base
# docker build -f .tmp/README.Dockerfile.base -t kaizhu256/node-utility2:base .
# docker build -f ".tmp/README.Dockerfile.$DOCKER_TAG" -t "$GITHUB_FULLNAME:$DOCKER_TAG" .
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
RUN (set -e; \
    export DEBIAN_FRONTEND=noninteractive; \
    apt-get update; \
    apt-get install --no-install-recommends -y \
        apt-utils \
        busybox \
        ca-certificates \
        curl \
        git \
        gnupg; \
    (busybox --list | xargs -n1 /bin/sh -c \
        'ln -s /bin/busybox /bin/$0 2>/dev/null' || true); \
    curl -Lf https://deb.nodesource.com/setup_14.x | /bin/bash -; \
    apt-get install -y nodejs; \
    (cd /usr/lib && npm install sqlite3@5); \
)
# install google-chrome-stable
RUN (set -e; \
    curl -Lf https://dl.google.com/linux/linux_signing_key.pub | \
        apt-key add -; \
    printf "deb http://dl.google.com/linux/chrome/deb/ stable main\n" > \
        /etc/apt/sources.list.d/google.list; \
    apt-get update && apt-get install google-chrome-stable -y; \
)
# install extra
RUN (set -e; \
    export DEBIAN_FRONTEND=noninteractive; \
    apt-get update; \
    apt-get install --no-install-recommends -y \
        aptitude \
        ffmpeg \
        imagemagick \
        less \
        nginx-extras \
        screen \
        sqlite3 \
        ssh \
        transmission-daemon \
        vim \
        wget \
        whois \
        xvfb; \
)
```

- Dockerfile.latest
```shell
# Dockerfile.latest
FROM kaizhu256/node-utility2:base
MAINTAINER kai zhu <kaizhu256@gmail.com>
# install utility2
RUN (set -e; \
    export DEBIAN_FRONTEND=noninteractive; \
    npm install -g eslint n; \
    npm install kaizhu256/node-utility2#alpha; \
    cp -a node_modules /; \
    cd node_modules/utility2; \
    npm install; \
    npm test; \
)
```

- Dockerfile.tmp
```shell
# Dockerfile.tmp
FROM kaizhu256/node-utility2:base
MAINTAINER kai zhu <kaizhu256@gmail.com>
# install utility2
RUN (set -e; \
)
```

- build_ci.sh
```shell
# build_ci.sh

# this shell script will run build-ci for this package

shCiAfter () {(set -e
    #// coverage-hack - test comment handling-behavior
    # shDeployCustom
    shDeployGithub
    shDeployHeroku
    shReadmeEval example.sh
    # restore $CI_BRANCH
    export CI_BRANCH="$CI_BRANCH_OLD"
    # docker build
    docker --version 2>/dev/null || return
    export DOCKER_TAG="$(printf "$CI_BRANCH" | sed -e "s/docker.//")"
    # if $DOCKER_TAG is not unique from $CI_BRANCH, then return
    if [ "$DOCKER_TAG" = "$CI_BRANCH" ]
    then
        return
    fi
    # docker build
    docker build \
        -f ".tmp/README.Dockerfile.$DOCKER_TAG" \
        -t "$GITHUB_FULLNAME:$DOCKER_TAG" .
    # docker test
    case "$CI_BRANCH" in
    docker.latest)
        # npm test utility2
        for PACKAGE in utility2 "kaizhu256/node-utility2#alpha"
        do
            docker run "$GITHUB_FULLNAME:$DOCKER_TAG" /bin/sh -c "
set -e
curl -Lf https://raw.githubusercontent.com\
/kaizhu256/node-utility2/alpha/lib.utility2.sh > /tmp/lib.utility2.sh
. /tmp/lib.utility2.sh
npm install '$PACKAGE'
cd node_modules/utility2
shEnvSanitize
npm install
npm test --mode-coverage
rm -rf .tmp
rm -rf \
    /root/.npm \
    /tmp/.* \
    /tmp/* \
    /var/cache/apt \
    /var/lib/apt/lists \
    /var/log/.* \
    /var/log/* \
    /var/tmp/.* \
    /var/tmp/* \
    2>/dev/null || true
"
        done
        ;;
    esac
    # https://docs.travis-ci.com/user/docker/#Pushing-a-Docker-Image-to-a-Registry
    # docker push
    if [ "$DOCKER_PASSWORD" ]
    then
        docker login -p="$DOCKER_PASSWORD" -u="$DOCKER_USERNAME"
        docker push "$GITHUB_FULLNAME:$DOCKER_TAG"
    fi
)}

shCiBefore () {(set -e
    #!! shNpmTestPublished
    shReadmeEval example.js
    # screenshot
    MODE_CI=readmeEvalExampleJs shBrowserScreenshot \
        file:///tmp/app/.tmp/build/coverage/app/example.js.html
    MODE_CI=readmeEvalExampleJs shBrowserScreenshot \
        file:///tmp/app/.tmp/build/test-report.html
)}

# run shCiMain
. lib.utility2.sh
shCiMain
```


# misc
- this package was created with [utility2](https://github.com/kaizhu256/node-utility2)
