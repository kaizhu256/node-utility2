# utility2
this zero-dependency package will provide high-level functions to to build, test, and deploy webapps

# live web demo
- [https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/app](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/app/)

[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithub.browser.%252Fnode-utility2%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/app/)



[![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-utility2.svg)](https://travis-ci.org/kaizhu256/node-utility2) [![coverage](https://kaizhu256.github.io/node-utility2/build/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build/coverage.html/index.html)

[![build commit status](https://kaizhu256.github.io/node-utility2/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-utility2)

| git-branch : | [master](https://github.com/kaizhu256/node-utility2/tree/master) | [beta](https://github.com/kaizhu256/node-utility2/tree/beta) | [alpha](https://github.com/kaizhu256/node-utility2/tree/alpha)|
|--:|:--|:--|:--|
| test-server-github : | [![github.com test-server](https://kaizhu256.github.io/node-utility2/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/app) | [![github.com test-server](https://kaizhu256.github.io/node-utility2/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/app) | [![github.com test-server](https://kaizhu256.github.io/node-utility2/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/app)|
| test-server-heroku : | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://h1-utility2-master.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://h1-utility2-beta.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-utility2/heroku-logo.75x25.png)](https://h1-utility2-alpha.herokuapp.com)|
| test-report : | [![test-report](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/test-report.html)|
| coverage : | [![coverage](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..master..travis-ci.org/coverage.html/index.html) | [![coverage](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/coverage.html/index.html) | [![coverage](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build..alpha..travis-ci.org/coverage.html/index.html)|
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build..master..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build..beta..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-utility2/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build..alpha..travis-ci.org)|

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
- [https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/app/assets.utility2.rollup.js](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/app/assets.utility2.rollup.js)



# documentation
#### api doc
- [https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/apidoc.html](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/apidoc.html)

[![apidoc](https://kaizhu256.github.io/node-utility2/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/apidoc.html)

#### cli help
![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.npmPackageCliHelp.svg)

#### todo
- jslint - autofix - break querySelector and querySelectorAll into multiple-lines
- jslint - fix off-by-one line-error
- rename message to msg
- remove excessive "the" from comments
- replace taskCreateCached with debounce
- rename counter to cnt
- replace db-lite with sql.js
- replace uglifyjs-lite with terser-lite (v2.8.29)
- jslint - sort nested switch-statements
- add default testCase _testCase_cliRun_help
- merge class _http.IncomingMessage -> _http.ServerResponse
- integrate db-lite and github-crud into a cloud-based db on github
- add server stress-test using puppeteer
- none

#### changelog 2019.9.8
- npm publish 2019.9.8
- jslint - remove unexpected_a hacks
- jslint - reintroduce flag option.nomen to ignore bad_property_a
- jslint - migrate from let-declaration to var-declaration
- merge function local.streamReadAll into local.middlewareBodyRead
- remove little-used shell-function from lib.utility2.sh
- rename function assertThrow to assertOrThrow
- jslint - rename errText to errMsg
- inline lib.puppeteer.js into assets.app.js
- none

#### this package requires
- darwin or linux os



# quickstart standalone app
#### to run this example, follow instruction in script below
- [assets.app.js](https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/app/assets.app.js)
```shell
# example.sh

# this shell script will download and run a web-demo of utility2 as a standalone app

# 1. download standalone app
curl -O https://kaizhu256.github.io/node-utility2/build..beta..travis-ci.org/app/assets.app.js
# 2. run standalone app
PORT=8081 node ./assets.app.js
# 3. open a browser to http://127.0.0.1:8081 and play with web-demo
# 4. edit file assets.app.js to suit your needs
```

#### output from browser
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.testExampleSh.browser.%252F.png)](https://kaizhu256.github.io/node-utility2/build/app/assets.example.html)

#### output from shell
![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.testExampleSh.svg)



# quickstart example.js
![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.testExampleJs.browser.%252Ftmp%252Fapp%252Ftmp%252Fbuild%252Ftest-report.html.png)

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
        $ npm install kaizhu256/node-utility2#alpha && \
            PATH="$(pwd)/node_modules/.bin:$PATH" \
            PORT=8081 \
            npm_config_mode_coverage=utility2 \
            node_modules/.bin/utility2 test example.js
    3. view test-report in ./tmp/build/test-report.html
    4. view coverage in ./tmp/build/coverage.html/index.html
*/



/* istanbul instrument in package utility2 */
/* istanbul ignore next */
/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    let consoleError;
    let local;
    // init globalThis
    globalThis.globalThis = globalThis.globalThis || globalThis;
    // init debug_inline
    if (!globalThis["debug\u0049nline"]) {
        consoleError = console.error;
        globalThis["debug\u0049nline"] = function (...argList) {
        /*
         * this function will both print <argList> to stderr
         * and return <argList>[0]
         */
            // debug argList
            globalThis["debug\u0049nlineArgList"] = argList;
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
        typeof globalThis.XMLHttpRequest === "function"
        && globalThis.navigator
        && typeof globalThis.navigator.userAgent === "string"
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
                : JSON.stringify(message, null, 4)
            )
        );
        throw err;
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
    local.value = function (val) {
    /*
     * this function will return <val>
     */
        return val;
    };
    local.valueOrEmptyList = function (val) {
    /*
     * this function will return <val> or []
     */
        return val || [];
    };
    local.valueOrEmptyObject = function (val) {
    /*
     * this function will return <val> or {}
     */
        return val || {};
    };
    local.valueOrEmptyString = function (val) {
    /*
     * this function will return <val> or ""
     */
        return val || "";
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
        onError(null, opt);
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
    elem = document.querySelector(
        "#outputStdout1"
    );
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
                : JSON.stringify(arg, null, 4)
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
local.onEventDomDb = local.db && local.db.onEventDomDb;
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
    case "click.buttonJslintAutofix1":
    case "keydown.inputTextarea1":
    case true:
        globalThis.domOnEventDelegateDict.domOnEventResetOutput();
        // jslint #inputTextarea1
        local.jslint.jslintAndPrint(
            document.querySelector("#inputTextarea1").value,
            "inputTextarea1.js",
            {
                autofix: (
                    evt
                    && evt.currentTarget
                    && evt.currentTarget.id === "buttonJslintAutofix1"
                ),
                conditional: true
            }
        );
        if (local.jslint.jslintResult.autofix) {
            document.querySelector("#inputTextarea1").value = (
                local.jslint.jslintResult.code
            );
        }
        document.querySelector("#outputJslintPre1").textContent = (
            local.jslint.jslintResult.errMsg
        ).replace((
            /\u001b\[\d*m/g
        ), "").trim();
        // try to cleanup __coverage__
        try {
            delete globalThis.__coverage__["/inputTextarea1.js"];
        } catch (ignore) {}
        // try to cover and eval #inputTextarea1
        try {
            document.querySelector("#outputCode1").textContent = (
                local.istanbul.instrumentSync(
                    document.querySelector("#inputTextarea1").value,
                    "/inputTextarea1.js"
                )
            );
            eval( // jslint ignore:line
                document.querySelector("#outputCode1").textContent
            );
            document.querySelector("#htmlCoverageReport1").innerHTML = (
                local.istanbul.coverageReportCreate({
                    coverage: globalThis.__coverage__
                })
            );
        } catch (errCaught) {
            console.error(errCaught);
        }
        return;
    case "click.buttonTestRun1":
        local.modeTest = 1;
        local.testRunDefault(local);
        return;
    // run browser-tests
    default:
        if (
            (evt.target && evt.target.id) !== "buttonTestRun1"
            && !(evt.modeInit && (
                /\bmodeTest=1\b/
            ).test(location.search))
        ) {
            return;
        }
        // show browser-tests
        if (document.querySelector(
            "#htmlTestReport1"
        ).style.maxHeight === "0px") {
            globalThis.domOnEventDelegateDict.domOnEventResetOutput();
            local.uiAnimateSlideDown(document.querySelector(
                "#htmlTestReport1"
            ));
            document.querySelector(
                "#buttonTestRun1"
            ).textContent = "hide internal test";
            local.modeTest = 1;
            local.testRunDefault(local);
            return;
        }
        // hide browser-tests
        local.uiAnimateSlideUp(document.querySelector(
            "#htmlTestReport1"
        ));
        document.querySelector(
            "#buttonTestRun1"
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
local.assetsDict["/assets.index.template.html"] = '\
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
/* csslint ignore:end */\n\
@keyframes uiAnimateShake {\n\
0%,\n\
50% {\n\
    transform: translateX(10px);\n\
}\n\
100% {\n\
    transform: translateX(0);\n\
}\n\
25%,\n\
75% {\n\
    transform: translateX(-10px);\n\
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
    background: #f7f7f7;\n\
    font-family: Arial, Helvetica, sans-serif;\n\
    font-size: small;\n\
    margin: 0 40px;\n\
}\n\
body > div,\n\
body > form > div,\n\
body > form > input,\n\
body > form > pre,\n\
body > form > .button,\n\
body > form > .textarea,\n\
body > input,\n\
body > pre,\n\
body > .button,\n\
body > .textarea {\n\
    margin-bottom: 20px;\n\
    margin-top: 0;\n\
}\n\
body > form > input,\n\
body > form > .button,\n\
body > input,\n\
body > .button {\n\
    width: 20rem;\n\
}\n\
body > form > .textarea,\n\
body > .textarea {\n\
    height: 10rem;\n\
    width: 100%;\n\
}\n\
body > .readonly {\n\
    background: #ddd;\n\
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
.uiAnimateShake {\n\
    animation-duration: 500ms;\n\
    animation-name: uiAnimateShake;\n\
}\n\
.uiAnimateSlide {\n\
    overflow-y: hidden;\n\
    transition: max-height ease-in 250ms, min-height ease-in 250ms, padding-bottom ease-in 250ms, padding-top ease-in 250ms;\n\
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
<a class="zeroPixel" download="db.persistence.json" href="" id="dbExportA1"></a>\n\
<input class="zeroPixel" data-onevent="onEventDomDb" data-onevent-db="dbImportInput" type="file">\n\
<script>\n\
/* jslint utility2:true */\n\
// init domOnEventWindowOnloadTimeElapsed\n\
(function () {\n\
/*\n\
 * this function will measure and print time-elapsed for window.onload\n\
 */\n\
    "use strict";\n\
    if (window.domOnEventWindowOnloadTimeElapsed) {\n\
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
\n\
// init domOnEventAjaxProgressUpdate\n\
(function () {\n\
/*\n\
 * this function will display incrementing ajax-progress-bar\n\
 */\n\
    "use strict";\n\
    let opt;\n\
    if (window.domOnEventAjaxProgressUpdate) {\n\
        return;\n\
    }\n\
    window.domOnEventAjaxProgressUpdate = function (gotoState, onError) {\n\
        gotoState = (gotoState | 0) + 1;\n\
        switch (gotoState) {\n\
        // ajaxProgress - show\n\
        case 1:\n\
            // init timerInterval and timerTimeout\n\
            opt.timerInterval = (\n\
                opt.timerInterval || setInterval(opt, 2000, 1, onError)\n\
            );\n\
            opt.timerTimeout = (\n\
                opt.timerTimeout || setTimeout(opt, 30000, 2, onError)\n\
            );\n\
            // show ajaxProgress\n\
            if (opt.width !== -1) {\n\
                opt.style.background = opt.background;\n\
            }\n\
            setTimeout(opt, 50, gotoState, onError);\n\
            break;\n\
        // ajaxProgress - increment\n\
        case 2:\n\
            // show ajaxProgress\n\
            if (opt.width === -1) {\n\
                return;\n\
            }\n\
            opt.style.background = opt.background;\n\
            // reset ajaxProgress if it goes too high\n\
            if ((opt.style.width.slice(0, -1) | 0) > 95) {\n\
                opt.width = 0;\n\
            }\n\
            // this algorithm will indefinitely increment ajaxProgress\n\
            // with successively smaller increments without ever reaching 100%\n\
            opt.width += 1;\n\
            opt.style.width = Math.max(\n\
                100 - 75 * Math.exp(-0.125 * opt.width),\n\
                opt.style.width.slice(0, -1) | 0\n\
            ) + "%";\n\
            if (!opt.counter) {\n\
                setTimeout(opt, 0, gotoState, onError);\n\
            }\n\
            break;\n\
        // ajaxProgress - 100%\n\
        case 3:\n\
            opt.width = -1;\n\
            opt.style.width = "100%";\n\
            setTimeout(opt, 1000, gotoState, onError);\n\
            break;\n\
        // ajaxProgress - hide\n\
        case 4:\n\
            // cleanup timerInterval and timerTimeout\n\
            clearInterval(opt.timerInterval);\n\
            opt.timerInterval = null;\n\
            clearTimeout(opt.timerTimeout);\n\
            opt.timerTimeout = null;\n\
            // hide ajaxProgress\n\
            opt.style.background = "transparent";\n\
            if (onError) {\n\
                onError();\n\
            }\n\
            setTimeout(opt, 250, gotoState);\n\
            break;\n\
        // ajaxProgress - reset\n\
        default:\n\
            // reset ajaxProgress\n\
            opt.counter = 0;\n\
            opt.width = 0;\n\
            opt.style.width = "0%";\n\
        }\n\
    };\n\
    opt = window.domOnEventAjaxProgressUpdate;\n\
    opt.end = function (onError) {\n\
        opt.counter = 0;\n\
        window.domOnEventAjaxProgressUpdate(2, onError);\n\
    };\n\
    opt.elem = document.getElementById("domElementAjaxProgress1");\n\
    if (!opt.elem) {\n\
        opt.elem = document.createElement("div");\n\
        setTimeout(function () {\n\
            document.body.insertBefore(opt.elem, document.body.firstChild);\n\
        });\n\
    }\n\
    opt.elem.id = "domElementAjaxProgress1";\n\
    opt.style = opt.elem.style;\n\
    // init style\n\
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
        opt.style[entry[0]] = opt.style[entry[0]] || entry[1];\n\
    });\n\
    // init state\n\
    opt.background = opt.style.background;\n\
    opt.counter = 0;\n\
    opt.width = 0;\n\
}());\n\
\n\
\n\
\n\
// init domOnEventDelegateDict\n\
(function () {\n\
/*\n\
 * this function will handle delegated dom-event\n\
 */\n\
    "use strict";\n\
    let timerTimeoutDict;\n\
    if (window.domOnEventDelegateDict) {\n\
        return;\n\
    }\n\
    window.domOnEventDelegateDict = {};\n\
    timerTimeoutDict = {};\n\
    window.domOnEventDelegateDict.domOnEventDelegate = function (evt) {\n\
        evt.targetOnEvent = evt.target.closest(\n\
            "[data-onevent]"\n\
        );\n\
        if (\n\
            !evt.targetOnEvent\n\
            || evt.targetOnEvent.dataset.onevent === "domOnEventNop"\n\
            || evt.target.closest(\n\
                ".disabled, .readonly"\n\
            )\n\
        ) {\n\
            return;\n\
        }\n\
        // rate-limit high-frequency-event\n\
        switch (evt.type) {\n\
        case "keydown":\n\
        case "keyup":\n\
            // filter non-input keyboard-event\n\
            if (!evt.target.closest(\n\
                "input, option, select, textarea"\n\
            )) {\n\
                return;\n\
            }\n\
            if (timerTimeoutDict[evt.type] !== true) {\n\
                timerTimeoutDict[evt.type] = timerTimeoutDict[\n\
                    evt.type\n\
                ] || setTimeout(function () {\n\
                    timerTimeoutDict[evt.type] = true;\n\
                    window.domOnEventDelegateDict.domOnEventDelegate(evt);\n\
                }, 50);\n\
                return;\n\
            }\n\
            timerTimeoutDict[evt.type] = null;\n\
            break;\n\
        }\n\
        switch (evt.targetOnEvent.tagName) {\n\
        case "BUTTON":\n\
        case "FORM":\n\
            evt.preventDefault();\n\
            break;\n\
        }\n\
        evt.stopPropagation();\n\
        window.domOnEventDelegateDict[evt.targetOnEvent.dataset.onevent](\n\
            evt\n\
        );\n\
    };\n\
    window.domOnEventDelegateDict.domOnEventResetOutput = function () {\n\
        document.querySelectorAll(\n\
            ".onevent-reset-output"\n\
        ).forEach(function (elem) {\n\
            switch (elem.tagName) {\n\
            case "INPUT":\n\
            case "TEXTAREA":\n\
                elem.value = "";\n\
                break;\n\
            case "PRE":\n\
                elem.textContent = "";\n\
                break;\n\
            default:\n\
                elem.innerHTML = "";\n\
            }\n\
        });\n\
    };\n\
    // init event-handling\n\
    [\n\
        "change",\n\
        "click",\n\
        "keydown",\n\
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
\n\
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
    window.domOnEventSelectAllWithinPre = function (evt) {\n\
        let range;\n\
        let selection;\n\
        if (\n\
            evt\n\
            && evt.key === "a"\n\
            && (evt.ctrlKey || evt.metaKey)\n\
            && evt.target.closest(\n\
                "pre"\n\
            )\n\
        ) {\n\
            range = document.createRange();\n\
            range.selectNodeContents(evt.target.closest(\n\
                "pre"\n\
            ));\n\
            selection = window.getSelection();\n\
            selection.removeAllRanges();\n\
            selection.addRange(range);\n\
            evt.preventDefault();\n\
        }\n\
    };\n\
    // init event-handling\n\
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
<button class="button" data-onevent="testRunBrowser" id="buttonTestRun1">run internal test</button><br>\n\
<div class="uiAnimateSlide" id="htmlTestReport1" style="border-bottom: 0; border-top: 0; margin-bottom: 0; margin-top: 0; max-height: 0; padding-bottom: 0; padding-top: 0;"></div>\n\
utility2-comment -->\n\
\n\
\n\
\n\
<!-- custom-html-start -->\n\
<label>edit or paste script below to cover and test</label>\n\
<textarea class="textarea" data-onevent="testRunBrowser" id="inputTextarea1">\n\
// remove comment below to disable jslint\n\
/*jslint browser, devel*/\n\
/*global window*/\n\
(function () {\n\
    "use strict";\n\
    let testCaseDict;\n\
    testCaseDict = {};\n\
    testCaseDict.modeTest = 1;\n\
\n\
    // comment this testCase to disable failed error demo\n\
    testCaseDict.testCase_failed_error_demo = function (opt, onError) {\n\
    /*\n\
     * this function will run a failed error demo\n\
     */\n\
        // hack-jslint\n\
        window.utility2.nop(opt);\n\
        onError(new Error("this is a failed error demo"));\n\
    };\n\
\n\
    testCaseDict.testCase_passed_ajax_demo = function (opt, onError) {\n\
    /*\n\
     * this function will demo a passed ajax test\n\
     */\n\
        let data;\n\
        opt = {url: "/"};\n\
        // test ajax-req for main-page "/"\n\
        window.utility2.ajax(opt, function (err, xhr) {\n\
            try {\n\
                // validate no err occurred\n\
                console.assert(!err, err);\n\
                // validate "200 ok" status\n\
                console.assert(xhr.statusCode === 200, xhr.statusCode);\n\
                // validate non-empty data\n\
                data = xhr.responseText;\n\
                console.assert(data && data.length > 0, data);\n\
                onError();\n\
            } catch (errCaught) {\n\
                onError(errCaught);\n\
            }\n\
        });\n\
    };\n\
\n\
    window.utility2.testRunDefault(testCaseDict);\n\
}());\n\
</textarea>\n\
<button class="button" data-onevent="testRunBrowser" id="buttonJslintAutofix1">jslint autofix</button><br>\n\
<pre class= "colorError" id="outputJslintPre1" tabindex="0"></pre>\n\
<label>instrumented-code</label>\n\
<pre class="readonly textarea" id="outputCode1" tabindex="0"></pre>\n\
<label>stderr and stdout</label>\n\
<pre class="onevent-reset-output readonly textarea" id="outputStdout1" tabindex="0"></pre>\n\
<div id="htmlTestReport1"></div>\n\
<div id="htmlCoverageReport1"></div>\n\
<script>\n\
/* jslint utility2:true */\n\
(function () {\n\
"use strict";\n\
document.querySelector("#htmlTestReport1").remove();\n\
window.addEventListener("load", function () {\n\
    window.utility2.on("utility2.testRunEnd", function () {\n\
        document.querySelectorAll(\n\
            "#htmlCoverageReport1"\n\
        ).forEach(function (elem) {\n\
            elem.innerHTML = window.utility2.istanbulCoverageReportCreate();\n\
        });\n\
    });\n\
});\n\
}());\n\
</script>\n\
<!-- custom-html-end -->\n\
\n\
\n\
\n\
{{#if isRollup}}\n\
<!-- utility2-comment\n\
<script src="assets.app.js"></script>\n\
utility2-comment -->\n\
{{#unless isRollup}}\n\
<script src="assets.utility2.lib.istanbul.js"></script>\n\
<script src="assets.utility2.lib.jslint.js"></script>\n\
<script src="assets.utility2.lib.db.js"></script>\n\
<script src="assets.utility2.lib.marked.js"></script>\n\
<script src="assets.utility2.lib.sjcl.js"></script>\n\
<script src="assets.utility2.js"></script>\n\
<script>window.utility2_onReadyBefore.counter += 1;</script>\n\
<script src="jsonp.utility2.stateInit?callback=window.utility2.stateInit"></script>\n\
<script src="assets.example.js"></script>\n\
<script src="assets.test.js"></script>\n\
<script>\n\
if(window.utility2_onReadyBefore) {\n\
    window.utility2_onReadyBefore();\n\
}\n\
</script>\n\
{{/if isRollup}}\n\
<script>\n\
/* jslint utility2:true */\n\
(function () {\n\
"use strict";\n\
let htmlTestReport1;\n\
let local;\n\
htmlTestReport1 = document.querySelector("#htmlTestReport1");\n\
local = window.utility2;\n\
if (!(htmlTestReport1 && local)) {\n\
    return;\n\
}\n\
local.on("utility2.testRunProgressUpdate", function (testReport) {\n\
    htmlTestReport1.innerHTML = local.testReportMerge(testReport, {});\n\
});\n\
local.on("utility2.testRunStart", function (testReport) {\n\
    local.uiAnimateSlideDown(htmlTestReport1);\n\
    htmlTestReport1.innerHTML = local.testReportMerge(testReport, {});\n\
});\n\
}());\n\
</script>\n\
<!-- utility2-comment\n\
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
/* jslint ignore:end */
/* validateLineSortedReset */
/* jslint ignore:start */
local.assetsDict["/assets.utility2.js"] =
    local.assetsDict["/assets.utility2.js"] ||
    local.fs.readFileSync(local.__dirname + "/lib.utility2.js", "utf8"
).replace((/^#!\//), "// ");
/* jslint ignore:end */
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
```

#### output from browser
![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.testExampleJs.browser.%252Ftmp%252Fapp%252Ftmp%252Fbuild%252Ftest-report.html.png)

#### output from shell
![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.testExampleJs.svg)



# extra screenshots
1. [https://kaizhu256.github.io/node-utility2/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png](https://kaizhu256.github.io/node-utility2/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png](https://kaizhu256.github.io/node-utility2/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png](https://kaizhu256.github.io/node-utility2/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithub.browser.%252Fnode-utility2%252Fbuild%252Fapp%252Fassets.swgg.html.png](https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithub.browser.%252Fnode-utility2%252Fbuild%252Fapp%252Fassets.swgg.html.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithub.browser.%252Fnode-utility2%252Fbuild%252Fapp%252Fassets.swgg.html.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithub.browser.%252Fnode-utility2%252Fbuild%252Fapp%252Fassets.swgg.html.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithub.browser.%252Fnode-utility2%252Fbuild%252Fapp.png](https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithub.browser.%252Fnode-utility2%252Fbuild%252Fapp.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithub.browser.%252Fnode-utility2%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithub.browser.%252Fnode-utility2%252Fbuild%252Fapp.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithubTest.browser.%252Fnode-utility2%252Fbuild%252Fapp.png](https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithubTest.browser.%252Fnode-utility2%252Fbuild%252Fapp.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithubTest.browser.%252Fnode-utility2%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.deployGithubTest.browser.%252Fnode-utility2%252Fbuild%252Fapp.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png](https://kaizhu256.github.io/node-utility2/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.deployHeroku.browser.%252F.png](https://kaizhu256.github.io/node-utility2/build/screenshot.deployHeroku.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.deployHeroku.browser.%252F.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.deployHeroku.browser.%252F.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.deployHerokuTest.browser.%252F.png](https://kaizhu256.github.io/node-utility2/build/screenshot.deployHerokuTest.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.deployHerokuTest.browser.%252F.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.deployHerokuTest.browser.%252F.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.npmTest.browser.%252F.png](https://kaizhu256.github.io/node-utility2/build/screenshot.npmTest.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.npmTest.browser.%252F.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.npmTest.browser.%252F.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.testExampleJs.browser.%252F.png](https://kaizhu256.github.io/node-utility2/build/screenshot.testExampleJs.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.testExampleJs.browser.%252F.png)

1. [https://kaizhu256.github.io/node-utility2/build/screenshot.testExampleSh.browser.%252F.png](https://kaizhu256.github.io/node-utility2/build/screenshot.testExampleSh.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.testExampleSh.browser.%252F.png)](https://kaizhu256.github.io/node-utility2/build/screenshot.testExampleSh.browser.%252F.png)



# package.json
```json
{
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": {
        "utility2": "lib.utility2.sh",
        "utility2-apidoc": "lib.apidoc.js",
        "utility2-db": "lib.db.js",
        "utility2-github-crud": "lib.github_crud.js",
        "utility2-istanbul": "lib.istanbul.js",
        "utility2-jslint": "lib.jslint.js"
    },
    "description": "this zero-dependency package will provide high-level functions to to build, test, and deploy webapps",
    "devDependencies": {},
    "engines": {
        "node": ">=10.0"
    },
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
    "nameAliasPublish": "npmtest-lite test-lite",
    "nameLib": "utility2",
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
        "build-ci": "./npm_scripts.sh",
        "env": "env",
        "eval": "./npm_scripts.sh",
        "heroku-postbuild": "./npm_scripts.sh",
        "postinstall": "./npm_scripts.sh",
        "start": "./npm_scripts.sh",
        "test": "./npm_scripts.sh",
        "utility2": "./npm_scripts.sh"
    },
    "utility2Dependents": [
        "2019.01.21 github-crud",
        "2019.01.30 bootstrap-lite",
        "2019.02.20 swgg",
        "2019.08.09 istanbul-lite master",
        "2019.08.16 apidoc-lite master",
        "2019.09.06 jslint-lite",
        "2019.09.07 utility2"
    ],
    "version": "2019.9.8"
}
```



# changelog of last 50 commits
[![screenshot](https://kaizhu256.github.io/node-utility2/build/screenshot.gitLog.svg)](https://github.com/kaizhu256/node-utility2/commits)



# internal build script
- Dockerfile.base
```shell
# Dockerfile.base
# docker build -f tmp/README.Dockerfile.base -t kaizhu256/node-utility2:base .
# docker build -f "tmp/README.Dockerfile.$DOCKER_TAG" -t "$GITHUB_REPO:$DOCKER_TAG" .
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
    curl -Ls https://deb.nodesource.com/setup_10.x | /bin/bash -; \
    apt-get install -y nodejs; \
    (cd /usr/lib && npm install sqlite3@4); \
)
# install google-chrome-stable
RUN (set -e; \
    curl -Ls https://dl.google.com/linux/linux_signing_key.pub | \
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
        nginx-extras \
        screen \
        sqlite3 \
        transmission-daemon \
        ssh \
        vim \
        wget \
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
    rm -f /tmp/.X99-lock && export DISPLAY=:99.0 && (Xvfb "$DISPLAY" &); \
    npm install kaizhu256/node-utility2#alpha; \
    cp -a node_modules /; \
    cd node_modules/utility2; \
    npm install; \
    npm test; \
)
# install elasticsearch-lite
RUN (set -e; \
    export DEBIAN_FRONTEND=noninteractive; \
    mkdir -p /usr/share/man/man1; \
    apt-get update; \
    apt-get install --no-install-recommends -y \
        default-jre; \
    rm -f /tmp/.X99-lock && export DISPLAY=:99.0 && (Xvfb "$DISPLAY" &); \
    npm install kaizhu256/node-elasticsearch-lite#alpha; \
    cp -a node_modules /; \
    cd node_modules/elasticsearch-lite; \
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
    export DEBIAN_FRONTEND=noninteractive; \
    rm -f /tmp/.X99-lock && export DISPLAY=:99.0 && (Xvfb "$DISPLAY" &); \
    npm install kaizhu256/node-utility2#alpha; \
    cp -a node_modules /; \
    cd node_modules/utility2; \
    npm install; \
    npm test; \
)
```

- build_ci.sh
```shell
# build_ci.sh

# this shell script will run the build for this package

shBuildCiAfter () {(set -e
    #// hack-istanbul - test comment handling-behavior
    # shDeployCustom
    shDeployGithub
    shDeployHeroku
    shReadmeTest example.sh
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
        -f "tmp/README.Dockerfile.$DOCKER_TAG" \
        -t "$GITHUB_REPO:$DOCKER_TAG" .
    # docker test
    case "$CI_BRANCH" in
    docker.latest)
        # npm test utility2
        for PACKAGE in utility2 "kaizhu256/node-utility2#alpha"
        do
            docker run "$GITHUB_REPO:$DOCKER_TAG" /bin/sh -c "set -e
                curl -Ls https://raw.githubusercontent.com\
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

shBuildCiBefore () {(set -e
    #!! shNpmTestPublished
    shReadmeTest example.js
    # screenshot
    MODE_BUILD=testExampleJs shBrowserScreenshot \
        file:///tmp/app/tmp/build/coverage.html/app/example.js.html
    MODE_BUILD=testExampleJs shBrowserScreenshot \
        file:///tmp/app/tmp/build/test-report.html
)}

# run shBuildCi
. ./lib.utility2.sh
shBuildCi
```



# misc
- this package was created with [utility2](https://github.com/kaizhu256/node-utility2)
