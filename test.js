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
        typeof globalThis.XMLHttpRequest === "function" &&
        globalThis.navigator &&
        typeof globalThis.navigator.userAgent === "string"
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
        if (
            typeof document === "object" && document &&
            typeof document.querySelectorAll === "function"
        ) {
            return Array.from(document.querySelectorAll(selector));
        }
        return [];
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
    // bug-workaround - throw unhandledRejections in node-process
    if (
        typeof process === "object" && process &&
        typeof process.on === "function" &&
        process.unhandledRejections !== "strict"
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
        documentQuerySelectorAll,
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


/* jslint utility2:true */
(function (local) {
"use strict";


/* istanbul ignore next */
// run shared js-env code - init-before
(function () {
// init local
local = globalThis.utility2 || require("./lib.utility2.js");
local = local.requireReadme();
globalThis.local = local;
// init test
local.testRunDefault(local);
}());


// run shared js-env code - function
(function () {
let {
    assertJsonEqual,
    assertOrThrow,
    noop,
    onErrorThrow,
    tryCatchOnError
} = local;

local.testCase_assertXxx_default = function (opt, onError) {
/*
 * this function will test assertXxx's default handling-behavior
 */
    // test assertion passed
    assertOrThrow(true, true);
    // test assertion failed with undefined message
    tryCatchOnError(function () {
        assertOrThrow(undefined);
    }, function (err) {
        // validate err
        assertJsonEqual(err.message, "");
    });
    // test assertion failed with string message
    tryCatchOnError(function () {
        assertOrThrow(undefined, "aa");
    }, function (err) {
        // validate err
        assertJsonEqual(err.message, "aa");
    });
    // test assertion failed with errObj
    tryCatchOnError(function () {
        assertOrThrow(undefined, new Error("aa"));
    }, function (err) {
        // validate err
        assertJsonEqual(err.message, "aa");
    });
    // test assertion failed with json object
    tryCatchOnError(function () {
        assertOrThrow(undefined, {
            aa: 1
        });
    }, function (err) {
        // validate err
        assertJsonEqual(err.message, "{\n    \"aa\": 1\n}");
    });
    onError(undefined, opt);
};

local.testCase_buildApidoc_default = function (opt, onError) {
/*
 * this function will test buildApidoc's default handling-behavior
 */
    local._testCase_buildApidoc_default({
        blacklistDict: {}
    }, onError, opt);
};

local.testCase_buildApp_default = function (opt, onError) {
/*
 * this function will test buildApp's default handling-behavior
 */
    local._testCase_buildApp_default({
        customizeAssetsList: [
            {
                file: "/assets.hello.txt",
                url: "/assets.hello.txt"
            }, {
                file: "/assets.script_only.html",
                url: "/assets.script_only.html"
            }, {
                file: "/assets.utility2.lib.istanbul.js",
                url: "/assets.utility2.lib.istanbul.js"
            }, {
                file: "/assets.utility2.lib.jslint.js",
                url: "/assets.utility2.lib.jslint.js"
            }, {
                file: "/assets.utility2.lib.marked.js",
                url: "/assets.utility2.lib.marked.js"
            }, {
                file: "/assets.utility2.rollup.js",
                url: "/assets.utility2.rollup.js"
            }
        ],
        customizeReadmeList: [
            // customize quickstart-example-js-instruction
            {
                merge: (
                    /\n#\u0020quickstart\u0020example.js\n[\S\s]*?\n\n\n/
                )
            // customize quickstart-example-js-comment
            }, {
                aa: "\n<!-- utility2-comment\n",
                bb: "\n"
            // customize quickstart-example-js-comment
            }, {
                aa: "\nutility2-comment -->\n",
                bb: "\n"
            // customize quickstart-example-js-comment
            }, {
                aa: "\n<!-- utility2-comment\n",
                bb: "\n"
            // customize quickstart-example-js-script-1
            }, {
                aa: "<script src=\"assets.utility2.js\"></script>\n",
                bb: "\n"
            // customize quickstart-example-js-script-2
            }, {
                aa: "<script src=\"assets.utility2.rollup.js\"></script>\n",
                bb: (
                    "<script src=\"assets.utility2.lib.istanbul.js\">" +
                    "</script>\n" +
                    "<script src=\"assets.utility2.lib.jslint.js\">" +
                    "</script>\n" +
                    "<script src=\"assets.utility2.lib.marked.js\">" +
                    "</script>\n" +
                    "<script src=\"assets.utility2.js\"></script>\n"
                )
            // customize quickstart-example-js-comment
            }, {
                aa: "\nutility2-comment -->\n",
                bb: "\n"
            // customize quickstart-example-js-screenshot
            }, {
                merge: (
                    /\n```[^`]*?\n#\u0020extra\u0020screenshots\n/
                )
            // customize build-script
            }, {
                merge: (
                    /\n#\u0020internal\u0020build\u0020script\n[\S\s]*?\nshBuildCi\n/
                )
            }
        ]
    }, onError, opt);
};

local.testCase_chromeDevtoolsClient_processPlatform = function (opt, onError) {
/*
 * this function will test chromeDevtoolsClient's processPlatform
 * handling-behavior
 */
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    [
        "darwin", "linux", "win32"
    ].forEach(function (processPlatform) {
        local.chromeDevtoolsClientCreate({
            modeMockProcessPlatform: true,
            processPlatform
        }).catch(noop);
    });
    onError(undefined, opt);
};

local.testCase_cliRun_default = function (opt, onError) {
/*
 * this function will test cliRun's default handling-behavior
 */
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    local.testMock([
        [
            local, {
                replStart: noop
            }
        ], [
            local.cliDict, {}
        ], [
            process, {
                argv: []
            }
        ], [
            require("repl"), {
                start: noop
            }
        ], [
            require("vm"), {
                runInThisContext: noop
            }
        ]
    ], function (onError) {
        // test default handling-behavior
        local.cliDict = {
            _default: noop
        };
        local.cliRun({
            rgxComment: (
                /^/
            )
        });
        // test builtin handling-behavior
        [
            "--eval",
            "--help",
            "--interactive",
            "--version",
            "undefined"
        ].forEach(function (key) {
            process.argv[2] = key;
            local.cliDict = {};
            local.cliRun({
                rgxComment: (
                    /^/
                )
            });
        });
        // test err handling-behavior
        local.cliDict = {};
        tryCatchOnError(local.cliRun.bind(undefined, {}), assertOrThrow);
        onError(undefined, opt);
    }, onError);
};

local.testCase_eventListenerXxx_default = function (opt, onError) {
/*
 * this function will test eventListenerXxx's default handling-behavior
 */
    let listener;
    listener = function ({
        msg,
        type
    }) {
        assertJsonEqual(msg, "bb");
        assertJsonEqual(type, "aa");
    };
    local.eventListenerAdd("aa", {}, listener);
    local.eventListenerAdd("aa", {
        once: true
    }, listener);
    local.eventListenerEmit("aa", "bb");
    local.eventListenerEmit("aa", "bb");
    local.eventListenerRemove(listener);
    onError(undefined, opt);
};

local.testCase_libUtility2Js_standalone = function (opt, onError) {
/*
 * this function will test lib.utility2.js's standalone handling-behavior
 */
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    require("fs").readFile("lib.utility2.js", "utf8", function (err, data) {
        onErrorThrow(err);
        require("fs").writeFile(".tmp/lib.utility2.js", data.replace(
            "/* istanbul instrument in package utility2 */",
            ""
        ), function (err) {
            onErrorThrow(err);
            require("./.tmp/lib.utility2.js");
        });
        onError(undefined, opt);
    });
};

local.testCase_listShuffle_default = function (opt, onError) {
/*
 * this function will test listShuffle's default handling-behavior
 */
    opt = {};
    // init list
    opt.list = "[0,1]";
    // shuffle list 100 times
    opt.ii = 0;
    while (opt.ii < 100) {
        opt.listShuffled = JSON.stringify(
            local.listShuffle(JSON.parse(opt.list))
        );
        // validate shuffled list
        assertJsonEqual(opt.listShuffled.length, opt.list.length);
        opt.changed = opt.changed || opt.listShuffled !== opt.list;
        opt.ii += 1;
    }
    // validate list changed at least once during shuffle
    assertOrThrow(opt.changed, opt);
    onError(undefined, opt);
};

local.testCase_replStart_default = function (opt, onError) {
/*
 * this function will test replStart's default handling-behavior
 */
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    local.replStart();
    // hack-coverage - test replStart's muliple-call handling-behavior
    local.replStart();
    local.testMock([
        [
            require("child_process"), {
                spawn: function () {
                    return {
                        on: function (evt, callback) {
                            callback(undefined, evt);
                        }
                    };
                }
            }
        ],
        // suppress process.stdout
        [
            process.stdout, {
                write: noop
            }
        ]
    ], function (onError) {
        [
            // test null-case handling-behavior
            "",
            // test shell handling-behavior
            "$ :\n",
            // test git diff handling-behavior
            "$ git diff\n",
            // test git log handling-behavior
            "$ git log\n",
            // test ll handling-behavior
            "$ ll\n",
            // test charCode handling-behavior
            "charCode abcd\n",
            // test charSort handling-behavior
            "charSort abcd\n",
            // test keys handling-behavior
            "keys {}\n",
            // test print handling-behavior
            "print abcd\n",
            // test err handling-behavior
            "undefined()\n"
        ].forEach(function (script) {
            globalThis.utility2_repl1.eval(script, null, "repl", noop);
        });
        onError(undefined, opt);
    }, onError);
};

local.testCase_setTimeoutOnError_default = function (opt, onError) {
/*
 * this function will test setTimeoutOnError's default handling-behavior
 */
    // test null-case handling-behavior
    assertJsonEqual(local.setTimeoutOnError(), undefined);
    // test onError handling-behavior
    assertJsonEqual(
        local.setTimeoutOnError(onError, 0, null, {}, opt),
        {}
    );
};

local.testCase_stringHtmlSafe_default = function (opt, onError) {
/*
 * this function will test stringHtmlSafe's default handling-behavior
 */
    assertJsonEqual(
        local.stringHtmlSafe(
            local.stringHtmlSafe(local.stringCharsetAscii).slice(32, -1)
        ),
        (
            " !&quot;#$%&amp;&apos;()*+,-./0123456789:;&lt;=&gt;?@" +
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"
        )
    );
    onError(undefined, opt);
};

local.testCase_stringQuotedToAscii_default = function (opt, onError) {
/*
 * this function will test stringQuotedToAscii's default handling-behavior
 */
    assertJsonEqual(
        local.stringQuotedToAscii(local.stringHelloEmoji),
        "hello \\ud83d\\ude01\n"
    );
    onError(undefined, opt);
};

local.testCase_stringRegexpEscape_default = function (opt, onError) {
/*
 * this function will test stringRegexpEscape's default handling-behavior
 */
    assertJsonEqual(
        local.stringRegexpEscape(local.stringCharsetAscii),
        (
            "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007" +
            "\b\t\n\u000b\f\r\u000e\u000f" +
            "\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017" +
            "\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f" +
            " !\"#\\$%&'\\(\\)\\*\\+,\\-\\.\\/0123456789:;<=>\\?@" +
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ\\[\\\\\\]\\^_`" +
            "abcdefghijklmnopqrstuvwxyz\\{\\|\\}~" +
            "\u007f"
        )
    );
    onError(undefined, opt);
};

local.testCase_testMock_err = function (opt, onError) {
/*
 * this function will test testMock's err handling-behavior
 */
    try {
        local.testMock([], function () {
            throw new Error();
        });
    } catch (errCaught) {
        // handle err
        assertOrThrow(errCaught, errCaught);
        onError(undefined, opt);
    }
};

local.testCase_uiAnimateXxx_default = function (opt, onError) {
/*
 * this function will test uiAnimateXxx's default handling-behavior
 */
    if (!local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    opt = document.createElement("div");
    // test uiAnimateSlideXxx handling-behavior
    local.uiAnimateSlideDown();
    local.uiAnimateSlideUp();
    opt.classList.add("uiAnimateSlide");
    local.uiAnimateSlideDown(opt);
    assertOrThrow(
        opt.style.maxHeight.indexOf("px") >= 0,
        opt.style.maxHeight
    );
    local.uiAnimateSlideUp(opt);
    assertJsonEqual(opt.style.maxHeight, "0px");
    // test uiAnimateSlideAccordian handling-behavior
    local.uiAnimateSlideAccordian(
        opt,
        [
            opt, document.createElement("div")
        ]
    );
    onError(undefined, opt);
};

local.testCase_urlJoin_default = function (opt, onError) {
/*
 * this function will test urlJoin's default handling-behavior
 */
    assertJsonEqual(local.urlJoin("", ""), "/");
    assertJsonEqual(local.urlJoin("http://aa/bb", "zz"), "http://aa/zz");
    assertJsonEqual(
        local.urlJoin("http://aa/bb/", "zz"),
        "http://aa/bb/zz"
    );
    assertJsonEqual(
        local.urlJoin("http://aa/bb/", "/zz"),
        "http://aa/zz"
    );
    assertJsonEqual(local.urlJoin("http://aa/bb/", "//zz"), "http://zz");
    assertJsonEqual(
        local.urlJoin("http://aa/bb/", "http://zz"),
        "http://zz"
    );
    onError(undefined, opt);
};

local.testCase_uuid4Create_default = function (opt, onError) {
/*
 * this function will test uuid4Create's default handling-behavior
 */
    assertOrThrow(
        local.regexpValidateUuid.test(local.uuid4Create()),
        local.uuid4Create()
    );
    onError(undefined, opt);
};

local.testCase_webpage_err = async function (opt, onError) {
/*
 * this function will test webpage's err handling-behavior
 */
    if (!local.isBrowser) {
        await local.browserTest({
            modeSilent: true,
            url: (
                "http://127.0.0.1:" + process.env.PORT +
                "/?modeTest=1" +
                "&modeTestCase=testCase_webpage_err"
            )
        });
        onError(undefined, opt);
        return;
    }
    if (local.modeTestCase !== "testCase_webpage_err") {
        onError(undefined, opt);
        return;
    }
    // ignore err in coverage-case
    globalThis.utility2_testReport.testPlatformList[0].testCaseList = [];
    globalThis.utility2_testReport.testsPending = 0;
    setTimeout(function () {
        // test err from callback handling-behavior
        onError(new Error(), opt);
        // test err from multiple-callback handling-behavior
        onError(undefined, opt);
    }, 2000);
    // test uncaught-err handling-behavior
    setTimeout(assertOrThrow.bind(undefined, undefined));
};
}());


// run node js-env code - init-after
/* istanbul ignore next */
(function () {
if (local.isBrowser) {
    return;
}
// init cli
if (module !== require.main || globalThis.utility2_rollup) {
    return;
}
local.assetsDict["/assets.script_only.html"] = (
    "<h1>script_only_test</h1>\n" +
    "<script src=\"assets.utility2.js\"></script>\n" +
    "<script>\n" +
    "window.utility2.onReadyIncrement();\n" +
    "window.addEventListener(\"load\", window.utility2.onReadyDecrement);\n" +
    "</script>\n" +
    "<script src=\"assets.example.js\"></script>\n" +
    "<script src=\"assets.test.js\"></script>\n"
);
if (process.argv[2]) {
    // start with coverage
    if (process.env.npm_config_mode_coverage) {
        process.argv.splice(1, 1, __dirname + "/lib.istanbul.js", "cover");
        local.istanbul.cliDict[process.argv[2]]();
        return;
    }
    // start
    process.argv.splice(1, 1);
    process.argv[1] = require("path").resolve(process.argv[1]);
    require("module").runMain();
}
// runme
if (process.env.npm_config_runme) {
    require(require("path").resolve(process.env.npm_config_runme));
}
}());
}());
