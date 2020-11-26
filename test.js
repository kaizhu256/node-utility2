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
    onErrorThrow
} = local;

local.testCase_assertXxx_default = function (opt, onError) {
/*
 * this function will test assertXxx's default handling-behavior
 */
    // test assertion passed
    assertOrThrow(true, true);
    // test assertion failed with undefined message
    local.tryCatchOnError(function () {
        assertOrThrow(undefined);
    }, function (err) {
        // handle err
        assertOrThrow(err, err);
        // validate err.message
        assertJsonEqual(err.message, "");
    });
    // test assertion failed with string message
    local.tryCatchOnError(function () {
        assertOrThrow(undefined, "aa");
    }, function (err) {
        // handle err
        assertOrThrow(err, err);
        // validate err.message
        assertJsonEqual(err.message, "aa");
    });
    // test assertion failed with errObj
    local.tryCatchOnError(function () {
        assertOrThrow(undefined, new Error());
    }, function (err) {
        // handle err
        assertOrThrow(err, err);
    });
    // test assertion failed with json object
    local.tryCatchOnError(function () {
        assertOrThrow(undefined, {
            aa: 1
        });
    }, function (err) {
        // handle err
        assertOrThrow(err, err);
        // validate err.message
        assertJsonEqual(err.message, "{\n    \"aa\": 1\n}");
    });
    onError(undefined, opt);
};

local.testCase_bufferValidateAndCoerce_err = function (opt, onError) {
/*
 * this function will test bufferValidateAndCoerce's err handling-behavior
 */
    [[], 0, {}].forEach(function (elem) {
        opt = null;
        try {
            local.bufferValidateAndCoerce(elem);
        } catch (errCaught) {
            opt = errCaught;
        }
        // handle err
        assertOrThrow(opt, elem);
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
        assetsList: [
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
            {
                // customize quickstart-example-js-instruction
                merge: (
                    /#\u0020quickstart\u0020example.js[\S\s]*?\n\n\n/
                )
            }, {
                // customize quickstart-example-js-script
                merge: (
                    /\n<\/script>[\S\s]*?\n<script\u0020src="assets\.example\.js">/
                )
            }, {
                // customize quickstart-example-js-screenshot
                merge: (
                    /```[^`]*?\n#\u0020extra\u0020screenshots/
                )
            }, {
                // customize build-script
                merge: (
                    /\n#\u0020internal\u0020build\u0020script\n[\S\s]*?\nshBuildCi\n/
                )
            }
        ]
    }, onError, opt);
};

local.testCase_buildXxx_default = function (opt, onError) {
/*
 * this function will test buildXxx's default handling-behavior
 */
    local.testMock([
        [
            local, {
                browserTest: local.noop
            }
        ]
    ], function (onError) {
        local._testCase_webpage_default({}, local.noop);
        onError(undefined, opt);
    }, onError);
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
        }).catch(local.noop);
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
                replStart: null
            }
        ], [
            local.cliDict, {
                _default: local.noop,
                _help: null
            }
        ], [
            process, {
                argv: []
            }
        ], [
            require("repl"), {
                start: local.noop
            }
        ], [
            require("vm"), {
                runInThisContext: local.noop
            }
        ]
    ], function (onError) {
        // test default handling-behavior
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
            local.cliRun({});
        });
        // test err handling-behavior
        local.cliDict._default = null;
        local.cliDict._help = null;
        local.tryCatchOnError(local.cliRun, local.noop);
        onError(undefined, opt);
    }, onError);
};

local.testCase_eventListenerXxx_default = function (opt, onError) {
/*
 * this function will test eventListenerXxx's default handling-behavior
 */
    let listener;
    listener = function (msg) {
        assertJsonEqual(msg, "bb");
    };
    local.eventListenerAdd("aa", listener);
    local.eventListenerAdd("aa", listener, {
        once: true
    });
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
                write: local.noop
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
            // test grep handling-behavior
            "grep \\baa\\b\n",
            // test keys handling-behavior
            "keys {}\n",
            // test print handling-behavior
            "print abcd\n",
            // test err handling-behavior
            "undefined()\n"
        ].forEach(function (script) {
            globalThis.utility2_repl1.eval(script, null, "repl", local.noop);
        });
        onError(undefined, opt);
    }, onError);
};

local.testCase_serverRespondTimeoutDefault_timeout = function (opt, onError) {
/*
 * this function will test
 * serverRespondTimeoutDefault's timeout handling-behavior
 */
    opt = function (fnc1, fnc2) {
        [
            fnc1, fnc2
        ].forEach(function (fnc) {
            if (typeof fnc === "function") {
                fnc();
            }
        });
    };
    local.testMock([
        [
            local, {
                onTimeout: opt,
                serverRespondDefault: local.noop,
                setTimeout: opt
            }
        ]
    ], function (onError) {
        local.serverRespondTimeoutDefault({
            headers: {}
        }, {
            on: opt
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
            " !&quot;#$%&amp;&apos;()*+,-./0123456789:;&lt;=&gt;?@"
            + "ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"
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
            "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007"
            + "\b\t\n\u000b\f\r\u000e\u000f"
            + "\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017"
            + "\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f"
            + " !\"#\\$%&'\\(\\)\\*\\+,\\-\\.\\/0123456789:;<=>\\?@"
            + "ABCDEFGHIJKLMNOPQRSTUVWXYZ\\[\\\\\\]\\^_`"
            + "abcdefghijklmnopqrstuvwxyz\\{\\|\\}~"
            + "\u007f"
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

local.testCase_throwError_default = function (opt, onError) {
/*
 * this function will test throwError's default handling-behavior
 */
    local.tryCatchOnError(function () {
        local.throwError();
    }, function (err) {
        // handle err
        assertOrThrow(err, err);
        onError(undefined, opt);
    });
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

local.testCase_webpage_err = function (opt, onError) {
/*
 * this function will test webpage's err handling-behavior
 */
    if (!local.isBrowser) {
        local.browserTest({
            modeSilent: true,
            url: (
                "http://127.0.0.1:" + process.env.PORT
                + "/?modeTest=1"
                + "&modeTestCase=testCase_webpage_err"
            )
        }, function (err) {
            onError(undefined, err);
        });
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
    setTimeout(local.throwError);
};
}());


// run shared js-env code - init-after
(function () {
    return;
//!! // init test-middleware
//!! local.middlewareList.push(function (req, res, next) {
//!! /*
 //!! * this function will run test-middleware
 //!! */
    //!! switch (req.urlParsed.pathname) {
    //!! // test http POST handling-behavior
    //!! case "/test.body":
        //!! // test req-body-read handling-behavior
        //!! local.middlewareBodyRead(req, res, function () {
            //!! // test multiple req-body-read handling-behavior
            //!! local.middlewareBodyRead(req, res, function () {
                //!! res.write(req.bodyRaw);
                //!! res.end();
            //!! });
        //!! });
        //!! break;
    //!! // test http POST handling-behavior
    //!! case "/test.echo":
        //!! // test res-header handling-behavior
        //!! local.serverRespondHeadSet(req, res, null, {
            //!! "X-Res-Header-Test": "bb"
        //!! });
        //!! local.serverRespondEcho(req, res);
        //!! break;
    //!! // test undefined-status-code handling-behavior
    //!! case "/test.err-undefined":
        //!! local.serverRespondDefault(req, res, 999);
        //!! break;
    //!! // test timeout handling-behavior
    //!! case "/test.timeout":
        //!! setTimeout(function () {
            //!! res.end();
        //!! }, 2000);
        //!! break;
    //!! // serve file
    //!! default:
        //!! local.middlewareFileServer(req, res, next);
    //!! }
//!! });
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
    "<h1>script_only_test</h1>\n"
    + "<script src=\"assets.utility2.js\"></script>\n"
    + "<script>window.utility2_onReadyBefore.cnt += 1;</script>\n"
    + "<script src=\"assets.example.js\"></script>\n"
    + "<script src=\"assets.test.js\"></script>\n"
    + "<script>window.utility2_onReadyBefore();</script>\n"
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
