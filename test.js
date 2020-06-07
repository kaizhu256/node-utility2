/* istanbul instrument in package utility2 */
// assets.utility2.header.js - start
/* jslint utility2:true */
/* istanbul ignore next */
// run shared js-env code - init-local
(function (globalThis) {
    "use strict";
    let consoleError;
    let local;
    // init globalThis
    globalThis.globalThis = globalThis.globalThis || globalThis;
    // init debugInline
    if (!globalThis.debugInline) {
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
        local.isBrowser && typeof globalThis.importScripts === "function"
    );
    // init function
    local.assertJsonEqual = function (aa, bb) {
    /*
     * this function will assert JSON.stringify(<aa>) === JSON.stringify(<bb>)
     */
        let objectDeepCopyWithKeysSorted;
        objectDeepCopyWithKeysSorted = function (obj) {
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
        };
        aa = JSON.stringify(objectDeepCopyWithKeysSorted(aa));
        bb = JSON.stringify(objectDeepCopyWithKeysSorted(bb));
        if (aa !== bb) {
            throw new Error(JSON.stringify(aa) + " !== " + JSON.stringify(bb));
        }
    };
    local.assertOrThrow = function (passed, msg) {
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
            if (arg !== undefined && arg !== null && arg !== "") {
                return arg;
            }
            ii += 1;
        }
        return arg;
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
    local.objectAssignDefault = function (tgt = {}, src = {}, depth = 0) {
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
    };
    // require builtin
    if (!local.isBrowser) {
        if (process.unhandledRejections !== "strict") {
            process.unhandledRejections = "strict";
            process.on("unhandledRejection", function (err) {
                throw err;
            });
        }
        local.fs = require("fs");
        local.path = require("path");
        local.url = require("url");
    }
}((typeof globalThis === "object" && globalThis) || window));
// assets.utility2.header.js - end



/* jslint utility2:true */
/* istanbul ignore next */
(function (local) {
"use strict";



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
local.testCase_FormData_default = function (opt, onError) {
/*
 * this function will test FormData's default handling-behavior
 */
    opt = {};
    opt.blob1 = new local.Blob([
        "aa", "bb", local.stringHelloEmoji, 0
    ]);
    opt.blob2 = new local.Blob([
        "aa", "bb", local.stringHelloEmoji, 0
    ], {
        type: "text/plain; charset=utf-8"
    });
    opt.data = new local.FormData();
    opt.data.append("text1", "aabb" + local.stringHelloEmoji + "0");
    // test file-upload handling-behavior
    opt.data.append("file1", opt.blob1);
    // test file-upload and filename handling-behavior
    opt.data.append("file2", opt.blob2, "filename2.txt");
    opt.method = "POST";
    opt.url = "/test.echo";
    local.ajax(opt, function (err, xhr) {
        // handle err
        local.assertOrThrow(!err, err);
        // validate responseText
        local.assertOrThrow(xhr.responseText.indexOf(
            "\r\nContent-Disposition: form-data; "
            + "name=\"text1\"\r\n\r\naabbhello \ud83d\ude01\n0\r\n"
        ) >= 0, xhr.responseText);
        local.assertOrThrow(xhr.responseText.indexOf(
            "\r\nContent-Disposition: form-data; "
            + "name=\"file1\"\r\n\r\naabbhello \ud83d\ude01\n0\r\n"
        ) >= 0, xhr.responseText);
        local.assertOrThrow(xhr.responseText.indexOf(
            "\r\nContent-Disposition: form-data; name=\"file2\"; "
            + "filename=\"filename2.txt\"\r\nContent-Type: text/plain; "
            + "charset=utf-8\r\n\r\naabbhello \ud83d\ude01\n0\r\n"
        ) >= 0, xhr.responseText);
        onError(undefined, opt);
    });
};

local.testCase_FormData_err = function (opt, onError) {
/*
 * this function will test FormData's err handling-behavior
 */
    local.testMock([
        [
            local.FormData.prototype, {
                read: function (onError) {
                    onError(new Error());
                }
            }
        ]
    ], function (onError) {
        local.ajax({
            data: new local.FormData(),
            method: "POST",
            url: "/test.echo"
        }, function (err) {
            // handle err
            local.assertOrThrow(err, err);
            onError(undefined, opt);
        });
    }, onError);
};

local.testCase_FormData_nullCase = function (opt, onError) {
/*
 * this function will test FormData's null-case handling-behavior
 */
    local.ajax({
        data: new local.FormData(),
        method: "POST",
        url: "/test.echo"
    }, function (err, xhr) {
        // handle err
        local.assertOrThrow(!err, err);
        // validate responseText
        local.assertOrThrow((
            /\r\n\r\n$/
        ).test(xhr.responseText), xhr.responseText);
        onError(undefined, opt);
    });
};

local.testCase_ajax_cache = function (opt, onError) {
/*
 * this function will test ajax's cache handling-behavior
 */
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    opt = {};
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // test http GET handling-behavior
            local.ajax({
                url: "assets.hello.txt"
            }, opt.gotoNext);
            break;
        case 2:
            // validate responseText
            local.assertJsonEqual(data.responseText, local.stringHelloEmoji);
            // test http GET 304 cache handling-behavior
            local.ajax({
                headers: {
                    "If-Modified-Since": (
                        new Date(Date.now() + 0xffff).toUTCString()
                    )
                },
                url: "assets.hello.txt"
            }, opt.gotoNext);
            break;
        case 3:
            // validate statusCode
            local.assertJsonEqual(data.statusCode, 304);
            opt.gotoNext();
            break;
        default:
            onError(err, opt);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.testCase_ajax_default = function (opt, onError) {
/*
 * this function will test ajax's default handling-behavior
 */
    let onParallel;
    onParallel = local.onParallel(onError);
    onParallel.cnt += 1;

    // test ajax's abort handling-behavior
    onParallel.cnt += 1;
    local.onParallelList({
        list: [
            "",
            "arraybuffer",
            "blob",
            "text"
        ]
    }, function (responseType, onParallel) {
        responseType = responseType.elem;
        onParallel.cnt += 1;
        local.ajax({
            data: (
                responseType === "arraybuffer"
                // test POST buffer-data handling-behavior
                ? new TextEncoder().encode(local.stringHelloEmoji)
                : responseType === "blob"
                // test POST blob-data handling-behavior
                ? new local.Blob([
                    "",
                    new Uint8Array(0),
                    local.stringHelloEmoji
                ])
                // test POST string-data handling-behavior
                : local.stringHelloEmoji
            ),
            method: "POST",
            // test nodejs-res handling-behavior
            responseType: responseType.replace("blob", "arraybuffer"),
            url: "/test.body"
        }, function (err, xhr) {
            // handle err
            local.assertOrThrow(!err, err);
            // validate statusCode
            local.assertJsonEqual(xhr.statusCode, 200);
            // validate responseText
            switch (responseType) {
            case "arraybuffer":
            case "blob":
                local.assertJsonEqual(xhr.responseBuffer.byteLength, 11);
                local.assertJsonEqual(Array.from(xhr.responseBuffer), [
                    0x68,
                    0x65,
                    0x6c,
                    0x6c,
                    0x6f,
                    0x20,
                    0xf0,
                    0x9f,
                    0x98,
                    0x81,
                    0x0a
                ]);
                break;
            default:
                local.assertJsonEqual(xhr.responseText, local.stringHelloEmoji);
            }
            onParallel(null, opt);
        });
    }, onParallel);

    // test ajax's data handling-behavior
    onParallel.cnt += 1;
    opt = local.ajax({
        url: "/test.timeout"
    }, function (err, xhr) {
        // handle err
        local.assertOrThrow(err, err);
        // validate statusCode
        local.assertJsonEqual(xhr.statusCode, 500);
        onParallel(null, opt);
    });
    // test multiple-callback handling-behavior
    opt.onEvent({
        type: "abort"
    });
    opt.abort();
    opt.abort();

    // test ajax's echo handling-behavior
    onParallel.cnt += 1;
    local.ajax({
        _aa: "aa",
        aa: "aa",
        data: local.stringHelloEmoji,
        // test req-header handling-behavior
        headers: {
            "X-Req-Header-Test": "aa"
        },
        method: "POST",
        // test modeDebug handling-behavior
        modeDebug: true,
        url: "/test.echo"
    }, function (err, xhr) {
        // handle err
        local.assertOrThrow(!err, err);
        // validate statusCode
        local.assertJsonEqual(xhr.statusCode, 200);
        // validate resHeaders
        local.assertJsonEqual(xhr.resHeaders["x-res-header-test"], "bb");
        // validate responseText
        local.assertOrThrow((
            /\r\nhello\u0020\ud83d\ude01\n$/
        ).test(xhr.responseText), xhr.responseText);
        local.assertOrThrow((
            /\r\nx-req-header-test:\u0020aa\r\n/
        ).test(xhr.responseText), xhr.responseText);
        // validate properties
        local.assertJsonEqual(xhr._aa, undefined);
        local.assertJsonEqual(xhr.aa, "aa");
        onParallel(null, opt);
    });

    // test ajax's err handling-behavior
    onParallel.cnt += 1;
    local.onParallelList({
        list: [
            {
                // test 404-not-found handling-behavior
                url: "/test.err-404"
            }, {
                // test 500-internal-server-error handling-behavior
                url: "/test.err-500"
            }, {
                // test undefined-status-code handling-behavior
                url: "/test.err-undefined"
            }
        ]
    }, function (opt2, onParallel) {
        onParallel.cnt += 1;
        local.ajax(opt2.elem, function (err) {
            // handle err
            local.assertOrThrow(err, err);
            onParallel(null, opt);
        });
    }, onParallel);

    // test ajax's file handling-behavior
    onParallel.cnt += 1;
    local.ajax({
        url: "LICENSE"
    }, function (err, xhr) {
        // handle err
        local.assertOrThrow(!err, err);
        // validate statusCode
        local.assertJsonEqual(xhr.statusCode, 200);
        // validate responseText
        local.assertOrThrow(xhr.responseText.indexOf(
            "MIT License (https://opensource.org/licenses/MIT)\n\n"
        ) === 0, xhr.data);
        onParallel(null, opt);
    });

    // test ajax's standalone handling-behavior
    onParallel.cnt += 1;
    local.testMock([
        [
            local, {
                utility2: null
            }
        ]
    ], function (onError) {
        [
            "", "arraybuffer"
        ].forEach(function (responseType) {
            // test default handling-behavior
            onParallel.cnt += 1;
            local.ajax({
                responseType,
                url: (
                    local.isBrowser
                    ? location.href
                    : local.serverLocalHost
                )
            }, function (err, xhr) {
                // handle err
                local.assertOrThrow(!err, err);
                // validate statusCode
                local.assertJsonEqual(xhr.statusCode, 200);
                onParallel();
            });
            // test err handling-behavior
            onParallel.cnt += 1;
            local.ajax({
                responseType,
                undefined,
                url: (
                    local.isBrowser
                    ? location.href.replace((
                        /\?.*$/
                    ), "")
                    : local.serverLocalHost
                ) + "/undefined"
            }, function (err, xhr) {
                // handle err
                local.assertOrThrow(err, err);
                // validate statusCode
                local.assertJsonEqual(xhr.statusCode, 404);
                onParallel();
            });
        });
        onError(undefined, opt);
    }, onParallel);
    onParallel();

    // test ajax's timeout handling-behavior
    onParallel.cnt += 1;
    setTimeout(function () {
        local.ajax({
            timeout: 1,
            url: "/test.timeout"
        }, function (err, xhr) {
            // handle err
            local.assertOrThrow(err, err);
            // validate statusCode
            local.assertJsonEqual(xhr.statusCode, 500);
            onParallel(null, opt);
        });
    }, 1000);
};

local.testCase_assertXxx_default = function (opt, onError) {
/*
 * this function will test assertXxx's default handling-behavior
 */
    // test assertion passed
    local.assertOrThrow(true, true);
    // test assertion failed with undefined message
    local.tryCatchOnError(function () {
        local.assertOrThrow(null);
    }, function (err) {
        // handle err
        local.assertOrThrow(err, err);
        // validate err.message
        local.assertJsonEqual(err.message, "");
    });
    // test assertion failed with string message
    local.tryCatchOnError(function () {
        local.assertOrThrow(null, "aa");
    }, function (err) {
        // handle err
        local.assertOrThrow(err, err);
        // validate err.message
        local.assertJsonEqual(err.message, "aa");
    });
    // test assertion failed with errObj
    local.tryCatchOnError(function () {
        local.assertOrThrow(null, new Error());
    }, function (err) {
        // handle err
        local.assertOrThrow(err, err);
    });
    // test assertion failed with json object
    local.tryCatchOnError(function () {
        local.assertOrThrow(null, {
            aa: 1
        });
    }, function (err) {
        // handle err
        local.assertOrThrow(err, err);
        // validate err.message
        local.assertJsonEqual(err.message, "{\n    \"aa\": 1\n}");
    });
    onError(undefined, opt);
};

local.testCase_base64Xxx_default = function (opt, onError) {
/*
 * this function will test base64Xxx's default handling-behavior
 */
    opt = {};
    opt.base64 = local.base64FromBuffer(
        local.stringCharsetAscii + local.stringHelloEmoji
    );
    // test null-case handling-behavior
    local.assertJsonEqual(local.base64FromBuffer(), "");
    local.assertJsonEqual(local.bufferToUtf8(local.base64ToBuffer()), "");
    local.assertJsonEqual(local.base64ToUtf8(), "");
    local.assertJsonEqual(local.base64FromBuffer(local.base64ToBuffer()), "");
    local.assertJsonEqual(local.base64FromBuffer(local.base64ToUtf8()), "");
    // test identity handling-behavior
    local.assertJsonEqual(
        local.base64FromBuffer(local.base64ToBuffer(opt.base64)),
        opt.base64
    );
    local.assertJsonEqual(
        local.base64FromBuffer(local.base64ToUtf8(opt.base64)),
        opt.base64
    );
    onError(undefined, opt);
};

local.testCase_blobRead_default = function (opt, onError) {
/*
 * this function will test blobRead's default handling-behavior
 */
    let onParallel;
    onParallel = local.onParallel(onError);
    onParallel.cnt += 1;
    // test data handling-behavior
    onParallel.cnt += 1;
    local.blobRead(new local.Blob([
        "",
        "aa",
        "bb",
        new Uint8Array(0),
        local.stringHelloEmoji
    ]), function (err, data) {
        // handle err
        local.assertOrThrow(!err, err);
        // validate data
        local.assertJsonEqual(
            local.bufferToUtf8(data),
            "aabbhello \ud83d\ude01\n"
        );
        onParallel(null, opt);
    });
    if (!local.isBrowser) {
        onParallel(null, opt);
        return;
    }
    // test err handling-behavior
    onParallel.cnt += 1;
    local.testMock([
        [
            FileReader.prototype, {
                readAsArrayBuffer: function () {
                    this.onabort({
                        type: "abort"
                    });
                    this.onerror({
                        type: "error"
                    });
                }
            }
        ]
    ], function (onError) {
        local.blobRead(null, function (err) {
            // handle err
            local.assertOrThrow(err, err);
        });
        onError(undefined, opt);
    }, onParallel);
    onParallel();
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
        local.assertOrThrow(opt, elem);
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
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    local.testCase_buildReadme_default(opt, local.onErrorThrow);
    local.testCase_buildLib_default(opt, local.onErrorThrow);
    local.testCase_buildTest_default(opt, local.onErrorThrow);
    local.buildApp({
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
        ]
    }, onError);
};

local.testCase_buildLib_default = function (opt, onError) {
/*
 * this function will test buildLib's default handling-behavior
 */
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    local.testMock([
        [
            local, {
                templateRenderMyApp: function () {
                    return local.assetsDict["/assets.my_app.template.js"];
                }
            }
        ], [
            local.fs, {
                // test customize-local handling-behavior
                existsSync: function () {
                    return true;
                },
                // test duplicate local function handling-behavior
                readFileSync: function () {
                    return (
                        "local.nop = function () {\n"
                        + "/*\n"
                        + " * this function will do nothing\n"
                        + " */\n"
                        + "    return;\n"
                        + "};\n"
                        + "local.nop = function () {\n"
                        + "/*\n"
                        + " * this function will do nothing\n"
                        + " */\n"
                        + "    return;\n"
                        + "};\n"
                    );
                },
                writeFileSync: local.nop
            }
        ]
    ], function (onError) {
        local.buildLib({}, onError);
    }, local.onErrorThrow);
    local.buildLib({}, onError);
};

local.testCase_buildReadme_default = function (opt, onError) {
/*
 * this function will test buildReadme's default handling-behavior
 */
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    opt = {};
    // test shNpmTestPublished handling-behavior
    opt.dataFrom = local.fs.readFileSync("README.md", "utf8").replace(
        "#\u0021! shNpmTestPublished",
        "shNpmTestPublished"
    );
    opt = {};
    opt.customize = function () {
        // search-and-replace - customize dataTo
        [
            // customize quickstart-example-js-instruction
            (
                /#\u0020quickstart\u0020example.js[\S\s]*?\n\n\n\n/
            ),
            // customize quickstart-example-js-script
            (
                /#unless\u0020isRollup[\S\s]*?<script\u0020src="assets\.example\.js">/
            ),
            // customize quickstart-example-js-screenshot
            (
                /```[^`]*?\n#\u0020extra\u0020screenshots/
            ),
            // customize build-script
            (
                /\n#\u0020internal\u0020build\u0020script\n[\S\s]*?\nshBuildCi\n/
            )
        ].forEach(function (rgx) {
            opt.dataFrom.replace(rgx, function (match0) {
                opt.dataTo = opt.dataTo.replace(rgx, match0);
            });
        });
    };
    local.buildReadme(opt, onError);
};

local.testCase_buildXxx_default = function (opt, onError) {
/*
 * this function will test buildXxx's default handling-behavior
 */
    local.testMock([
        [
            local, {
                assetsDict: {
                    "/": ""
                },
                browserTest: local.nop,
                buildApidoc: local.nop,
                buildLib: local.nop,
                buildReadme: local.nop,
                buildTest: local.nop,
                testCase_buildReadme_default: local.nop,
                testCase_buildLib_default: local.nop,
                testCase_buildTest_default: local.nop
            }
        ]
    ], function (onError) {
        local._testCase_buildApidoc_default({}, local.nop);
        local._testCase_buildApp_default({}, local.nop);
        local._testCase_buildLib_default({}, local.nop);
        local._testCase_buildReadme_default({}, local.nop);
        local._testCase_buildTest_default({}, local.nop);
        local._testCase_webpage_default({}, local.nop);
        local.assetsDict["/"] = "<script src=\"assets.test.js\"></script>";
        local._testCase_webpage_default({}, local.nop);
        onError(undefined, opt);
    }, onError);
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
                _default: local.nop,
                _help: null
            }
        ], [
            process, {
                argv: []
            }
        ], [
            require("repl"), {
                start: local.nop
            }
        ], [
            require("vm"), {
                runInThisContext: local.nop
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
            local.cliRun();
        });
        // test err handling-behavior
        local.cliDict._default = null;
        local.cliDict._help = null;
        local.tryCatchOnError(local.cliRun, local.nop);
        onError(undefined, opt);
    }, onError);
};

//!! local.testCase_corsBackendHostInject_default = function (opt, onError) {
//!! /*
 //!! * this function will corsBackendHostInject's default handling-behavior
 //!! */
    //!! // test null-case handling-behavior
    //!! local.assertJsonEqual(local.corsBackendHostInject(), undefined);
    //!! // test override-all handling-behavior
    //!! local.assertJsonEqual(local.corsBackendHostInject(
        //!! "cc.com",
        //!! "aa-alpha.bb.com",
        //!! null,
        //!! {
            //!! host: "github.io",
            //!! pathname: "/build..beta..travis-ci.com/"
        //!! }
    //!! ), "aa-beta.bb.com");
    //!! // test override-rgx handling-behavior
    //!! local.assertJsonEqual(local.corsBackendHostInject(
        //!! "cc/dd",
        //!! "aa-alpha.bb.com/",
        //!! (
            //!! /(^cc\/)/m
        //!! ),
        //!! {
            //!! host: "github.io",
            //!! pathname: "/build..beta..travis-ci.com/"
        //!! }
    //!! ), "aa-beta.bb.com/cc/dd");
    //!! onError(undefined, opt);
//!! };

local.testCase_corsForwardProxyHostIfNeeded_default = function (
    opt,
    onError
) {
/*
 * this function will corsForwardProxyHostIfNeeded's default handling-behavior
 */
    if (!local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    local.assertOrThrow(local.corsForwardProxyHostIfNeeded({
        location: {
            host: "undefined.github.io"
        },
        url: "https://example.com"
    }).indexOf(".herokuapp.com") >= 0);
    onError(undefined, opt);
};

/* istanbul ignore next */
local.testCase_cryptoAesXxxCbcRawXxx_default = function (opt, onError) {
/*
 * this function will cryptoAesXxxCbcRawXxx's default handling-behavior
 */
    if (!local.nop()) {
        onError();
        return;
    }
    opt = {};
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // encrypt data
            opt.data = new TextEncoder().encode("aa");
            opt.key = "0123456789abcdef0123456789abcdef";
            opt.mode = null;
            local.cryptoAesXxxCbcRawEncrypt(opt, opt.gotoNext);
            break;
        case 2:
            // decrypt data
            opt.data = data.buffer;
            local.cryptoAesXxxCbcRawDecrypt(opt, opt.gotoNext);
            break;
        case 3:
            // validate data
            local.assertJsonEqual(local.bufferToUtf8(data), "aa");
            opt.gotoNext();
            break;
        case 4:
            // encrypt data - base64
            opt.data = new TextEncoder().encode("aa");
            opt.key = (
                "0123456789abcdef0123456789abcdef"
                + "0123456789abcdef0123456789abcdef"
            );
            opt.mode = "base64";
            local.cryptoAesXxxCbcRawEncrypt(opt, opt.gotoNext);
            break;
        case 5:
            // decrypt data - base64
            opt.data = data;
            local.cryptoAesXxxCbcRawDecrypt(opt, opt.gotoNext);
            break;
        case 6:
            // validate data
            local.assertJsonEqual(local.bufferToUtf8(data), "aa");
            opt.gotoNext();
            break;
        default:
            onError(err, opt);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.testCase_domFragmentRender_default = function (opt, onError) {
/*
 * this function will test domFragmentRender's default handling-behavior
 */
    if (!local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    local.assertJsonEqual(local.domFragmentRender("<div>{{value}}</div>", {
        value: "aa"
    }).children[0].outerHTML, "<div>aa</div>");
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
    local.fs.writeFileSync("tmp/lib.utility2.js", local.fs.readFileSync(
        "lib.utility2.js",
        "utf8"
    ).replace("/* istanbul instrument in package utility2 */", ""));
    require("./tmp/lib.utility2.js");
    onError(undefined, opt);
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
        local.assertJsonEqual(opt.listShuffled.length, opt.list.length);
        opt.changed = opt.changed || opt.listShuffled !== opt.list;
        opt.ii += 1;
    }
    // validate list changed at least once during shuffle
    local.assertOrThrow(opt.changed, opt);
    onError(undefined, opt);
};

local.testCase_middlewareForwardProxy_default = function (opt, onError) {
/*
 * this function will test middlewareForwardProxy's default handling-behavior
 */
    let onParallel;
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    onParallel = local.onParallel(onError);
    onParallel.cnt += 1;
    // test preflight-cors handling-behavior
    onParallel.cnt += 1;
    local.ajax({
        headers: {
            "access-control-request-headers": (
                "forward-proxy-headers,forward-proxy-url"
            )
        },
        method: "OPTIONS",
        url: ""
    }, onParallel);
    // test forward-proxy-http handling-behavior
    onParallel.cnt += 1;
    local.ajax({
        headers: {
            "forward-proxy-url": "/assets.hello.txt"
        },
        url: ""
    }, function (err, xhr) {
        // handle err
        local.assertOrThrow(!err, err);
        // validate responseText
        local.assertJsonEqual(xhr.responseText, local.stringHelloEmoji);
        onParallel(null, opt, xhr);
    });
    // test err handling-behavior
    onParallel.cnt += 1;
    local.ajax({
        headers: {
            "forward-proxy-url": "https://undefined:0"
        },
        url: ""
    }, function (err) {
        // handle err
        local.assertOrThrow(err, err);
        onParallel(null, opt);
    });
    onParallel(null, opt);
};

local.testCase_moduleDirname_default = function (opt, onError) {
/*
 * this function will test moduleDirname's default handling-behavior
 */
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    // test null-case handling-behavior
    local.assertJsonEqual(
        local.moduleDirname(null, module.paths),
        process.cwd()
    );
    // test path handling-behavior
    local.assertJsonEqual(
        local.moduleDirname(".", module.paths),
        process.cwd()
    );
    local.assertJsonEqual(
        local.moduleDirname("./", module.paths),
        process.cwd()
    );
    // test module-does-not-exist handling-behavior
    local.assertJsonEqual(
        local.moduleDirname("syntax-err", module.paths),
        ""
    );
    onError(undefined, opt);
};

local.testCase_objectAssignRecurse_default = function (opt, onError) {
/*
 * this function will test objectAssignRecurse's default handling-behavior
 */
    // test null-case handling-behavior
    local.objectAssignRecurse();
    local.objectAssignRecurse({});
    // test falsy handling-behavior
    [
        "", 0, false, null, undefined
    ].forEach(function (aa) {
        [
            "", 0, false, null, undefined
        ].forEach(function (bb) {
            local.assertJsonEqual(
                local.objectAssignRecurse({
                    data: aa
                }, {
                    data: bb
                }).data,
                bb === undefined
                ? aa
                : bb
            );
        });
    });
    // test non-recursive handling-behavior
    local.assertJsonEqual(local.objectAssignRecurse({
        aa: 1,
        bb: {
            cc: 1
        },
        cc: {
            dd: 1
        },
        dd: [
            1, 1
        ],
        ee: [
            1, 1
        ]
    }, {
        aa: 2,
        bb: {
            dd: 2
        },
        cc: {
            ee: 2
        },
        dd: [
            2, 2
        ],
        ee: {
            ff: 2
        }
    // test default-depth handling-behavior
    }, null), {
        aa: 2,
        bb: {
            dd: 2
        },
        cc: {
            ee: 2
        },
        dd: [
            2, 2
        ],
        ee: {
            ff: 2
        }
    });
    // test recursive handling-behavior
    local.assertJsonEqual(local.objectAssignRecurse({
        aa: 1,
        bb: {
            cc: 1
        },
        cc: {
            dd: 1
        },
        dd: [
            1, 1
        ],
        ee: [
            1, 1
        ]
    }, {
        aa: 2,
        bb: {
            dd: 2
        },
        cc: {
            ee: 2
        },
        dd: [
            2, 2
        ],
        ee: {
            ff: 2
        }
    // test depth handling-behavior
    }, 2), {
        aa: 2,
        bb: {
            cc: 1,
            dd: 2
        },
        cc: {
            dd: 1,
            ee: 2
        },
        dd: [
            2, 2
        ],
        ee: {
            ff: 2
        }
    });
    // test env with empty-string handling-behavior
    local.assertJsonEqual(local.objectAssignRecurse(
        local.env,
        {
            "emptyString": null
        },
        // test default-depth handling-behavior
        null,
        local.env
    ).emptyString, "");
    onError(undefined, opt);
};

local.testCase_onErrorThrow_err = function (opt, onError) {
/*
 * this function will test onErrorThrow's err handling-behavior
 */
    local.tryCatchOnError(function () {
        local.onErrorThrow(new Error());
    }, function (err) {
        // handle err
        local.assertOrThrow(err, err);
        onError(undefined, opt);
    });
};

local.testCase_onErrorWithStack_toString = function (opt, onError) {
/*
 * this function will test onErrorWithStack's toString handling-behavior
 */
    local.assertJsonEqual(
        String(local.onErrorWithStack(local.nop)),
        String(local.nop)
    );
    onError(undefined, opt);
};

local.testCase_onFileModifiedRestart_watchFile = function (opt, onError) {
/*
 * this function will test onFileModifiedRestart's watchFile handling-behavior
 */
    let onParallel;
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    onParallel = local.onParallel(onError);
    onParallel.cnt += 1;
    local.fs.stat(__filename, function (err, stat) {
        // test default watchFile handling-behavior
        onParallel.cnt += 1;
        local.fs.utimes(__filename, stat.atime, new Date(), onParallel);
        // test nop watchFile handling-behavior
        onParallel.cnt += 1;
        setTimeout(function () {
            local.fs.utimes(__filename, stat.atime, stat.mtime, onParallel);
        }, 1000);
        onParallel(err, opt);
    });
};

local.testCase_onNext_err = function (opt, onError) {
/*
 * this function will test gotoNext's err handling-behavior
 */

    opt = {};
    opt.modeDebug = true;
    local.gotoNext(opt, function () {
        throw new Error();
    });
    opt.gotoState = 0;
    local.tryCatchOnError(function () {
        opt.gotoNext();
    }, function (err) {
        // handle err
        local.assertOrThrow(err, err);
        onError(undefined, opt);
    });
};

local.testCase_onParallelList_default = function (opt, onError) {
/*
 * this function will test onParallelList's default handling-behavior
 */
    opt = {};
    local.gotoNext(opt, function (err) {
        switch (opt.gotoState) {
        case 1:
            // test null-case handling-behavior
            local.onParallelList({}, local.onErrorThrow, opt.gotoNext);
            break;
        case 2:
            opt.list = [
                null
            ];
            // test retryLimit handling-behavior
            opt.retryLimit = 1;
            local.onParallelList(opt, function (opt2, onParallel) {
                onParallel.cnt += 1;
                // test err handling-behavior
                onParallel(new Error(), opt2);
                // test multiple-callback handling-behavior
                setTimeout(onParallel, 5000);
            }, function (err) {
                // handle err
                local.assertOrThrow(err, err);
                opt.gotoNext();
            });
            break;
        case 3:
            opt.data = [];
            // test rateLimit handling-behavior
            opt.rateLimit = 3;
            opt.rateMax = 0;
            // test retryLimit handling-behavior
            opt.retryLimit = 1;
            local.onParallelList({
                list: [
                    1, 2, 3, 4
                ],
                rateLimit: opt.rateLimit
            }, function (opt2, onParallel) {
                onParallel.cnt += 1;
                opt.rateMax = Math.max(
                    onParallel.cnt - 1,
                    opt.rateMax
                );
                // test async handling-behavior
                setTimeout(function () {
                    // test list-growth handling-behavior
                    if (opt2.ii === 3) {
                        opt2.list.push(5);
                    }
                    opt.data[opt2.ii] = opt2.elem;
                    // test retry handling-behavior
                    local.assertOrThrow(opt2.retry < 1);
                    onParallel(null, opt2);
                });
            }, opt.gotoNext, opt.rateLimit);
            break;
        case 4:
            // validate data
            local.assertJsonEqual(opt.data, [
                1, 2, 3, 4, 5
            ]);
            local.assertJsonEqual(opt.rateMax, 3);
            opt.data = [];
            opt.rateLimit = "syntax-err";
            opt.rateMax = 0;
            local.onParallelList({
                list: [
                    1, 2, 3, 4, 5
                ],
                rateLimit: opt.rateLimit
            }, function (opt2, onParallel) {
                // test sync handling-behavior
                onParallel.cnt += 1;
                opt.rateMax = Math.max(onParallel.cnt, opt.rateMax);
                opt.data[opt2.ii] = opt2.elem;
                onParallel(null, opt);
            }, opt.gotoNext);
            break;
        case 5:
            // validate data
            local.assertJsonEqual(opt.data, [
                1, 2, 3, 4, 5
            ]);
            local.assertJsonEqual(opt.rateMax, 2);
            opt.gotoNext();
            break;
        default:
            onError(err, opt);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.testCase_onParallel_default = function (opt, onError) {
/*
 * this function will test onParallel's default handling-behavior
 */
    let onParallel;
    let onParallelError;
    // test onEach handling-behavior
    onParallel = local.onParallel(onError, function () {
        // validate cnt
        local.assertOrThrow(onParallel.cnt >= 0, onParallel);
    });
    onParallel.cnt += 1;
    // test multiple-task handling-behavior
    onParallel.cnt += 1;
    setTimeout(function () {
        onParallelError = local.onParallel(onParallel);
        onParallelError.cnt += 1;
        onParallelError();
        // test multiple-callback-error handling-behavior
        onParallelError();
        // handle err
        local.assertOrThrow(onParallelError.err, onParallelError.err);
        // test err handling-behavior
        onParallelError(new Error());
        // handle err
        local.assertOrThrow(onParallelError.err, onParallelError.err);
        // test ignore-after-error handling-behavior
        onParallelError();
    });
    // test default handling-behavior
    onParallel(null, opt);
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
                            callback(null, evt);
                        }
                    };
                }
            }
        ],
        // suppress process.stdout
        [
            process.stdout, {
                write: local.nop
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
            globalThis.utility2_repl1.eval(script, null, "repl", local.nop);
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
                serverRespondDefault: local.nop,
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
    local.assertJsonEqual(local.setTimeoutOnError(), undefined);
    // test onError handling-behavior
    local.assertJsonEqual(
        local.setTimeoutOnError(onError, 0, null, {}, opt),
        {}
    );
};

local.testCase_stringHtmlSafe_default = function (opt, onError) {
/*
 * this function will test stringHtmlSafe's default handling-behavior
 */
    local.assertJsonEqual(
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
    local.assertJsonEqual(
        local.stringQuotedToAscii(local.stringHelloEmoji),
        "hello \\ud83d\\ude01\n"
    );
    onError(undefined, opt);
};

local.testCase_stringRegexpEscape_default = function (opt, onError) {
/*
 * this function will test stringRegexpEscape's default handling-behavior
 */
    local.assertJsonEqual(
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

local.testCase_templateRender_default = function (opt, onError) {
/*
 * this function will test templateRender's default handling-behavior
 */
    // test null-case handling-behavior
    local.assertJsonEqual(local.templateRender(), "");
    // test undefined-value handling-behavior
    local.assertJsonEqual(local.templateRender("{{aa}}", {}), "{{aa}}");
    // test basic handling-behavior
    local.assertJsonEqual(local.templateRender("{{aa}}", {
        aa: "```<aa\nbb>```"
    }), "```&lt;aa\nbb&gt;```");
    // test markdownToHtml handling-behavior
    local.assertJsonEqual(
        local.templateRender("{{aa markdownToHtml}}", {
            aa: local.stringCharsetAscii.slice(32, -1)
        }),
        (
            "<p> !&quot;#$%&amp;&apos;()*+,-./0123456789:;&lt;=&gt;?@"
            + "ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~"
            + "</p>\n"
        )
    );
    // test markdownSafe handling-behavior
    local.assertJsonEqual(
        local.templateRender("{{aa markdownSafe notHtmlSafe}}", {
            aa: local.stringCharsetAscii.slice(32, -1)
        }),
        (
            " !\"#$%&'()*+,-./0123456789:;<=>?@"
            + "ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_'abcdefghijklmnopqrstuvwxyz{|}~"
        )
    );
    // test notHtmlSafe handling-behavior
    local.assertJsonEqual(local.templateRender("{{aa notHtmlSafe}}", {
        aa: "```<aa\nbb>```"
    }), "```<aa\nbb>```");
    // test default handling-behavior
    local.assertJsonEqual(local.templateRender((
        "{{aa alphanumeric}} "
        + "{{aa truncate 4 truncate 4}} "
        + "{{aa jsonStringify jsonStringify4 decodeURIComponent"
        + " encodeURIComponent trim}} "
        + "{{bb}} {{cc}} {{dd}} {{ee.ff}}"
    ), {
        // test string value handling-behavior
        aa: "`<aa>`",
        // test non-string value handling-behavior
        bb: 1,
        // test null-value handling-behavior
        cc: null,
        // test undefined-value handling-behavior
        dd: undefined,
        // test nested value handling-behavior
        ee: {
            ff: "gg"
        }
    }), "__aa__ `... %22%5C%22%60%3Caa%3E%60%5C%22%22 1 null {{dd}} gg");
    // test partial handling-behavior
    local.assertJsonEqual(
        local.templateRender((
            "{{#undefined aa}}\n"
            + "list1{{#each list1}}\n"
            + "    aa - {{aa}}\n"
            + "    list2{{#eachTrimEndComma list2}}\n"
            + "        {{#this/ notHtmlSafe jsonStringify}}\n"
            + "        bb - {{bb}}\n"
            + "        {{#if bb}}\n"
            + "        if\n"
            + "        {{#unless bb}}\n"
            + "        else\n"
            + "        {{/if bb}}\n"
            + "        {{#unless bb}}\n"
            + "        unless\n"
            + "        {{/unless bb}}\n"
            + "        ,\n"
            + "    {{/eachTrimEndComma list2}}\n"
            + "{{/each list1}}\n"
            + "{{/undefined aa}}\n"
        ), {
            list1: [
                // test null-value handling-behavior
                null, {
                    aa: "aa",
                    // test recursive-list handling-behavior
                    list2: [
                        {
                            bb: "bb"
                        }, {
                            bb: null
                        }
                    ]
                }
            ]
        }),
        (
            "{{#undefined aa}}\n"
            + "list1\n"
            + "    aa - {{aa}}\n"
            + "    list2\n"
            + "\n"
            + "    aa - aa\n"
            + "    list2\n"
            + "        {\"bb\":\"bb\"}\n"
            + "        bb - bb\n"
            + "        \n"
            + "        if\n"
            + "        \n"
            + "        \n"
            + "        ,\n"
            + "    \n"
            + "        {\"bb\":null}\n"
            + "        bb - null\n"
            + "        \n"
            + "        else\n"
            + "        \n"
            + "        \n"
            + "        unless\n"
            + "        \n"
            + "        \n"
            + "\n"
            + "{{/undefined aa}}\n"
        )
    );
    // test err handling-behavior
    local.tryCatchOnError(function () {
        local.templateRender("{{aa bb}}", {
            aa: 1
        });
    }, local.nop);
    // handle err
    local.assertOrThrow(local._debugTryCatchError, local._debugTryCatchError);
    onError(undefined, opt);
};

local.testCase_testReportCreate_default = function (opt, onError) {
/*
 * this function will test testReport's default handling-behavior
 */
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    local.testMock([], function (onError) {
        // test null-case handling-behavior
        local.testReportCreate();
        // test testsFailed handling-behavior
        local.testReportCreate({
            testPlatformList: [
                {
                    testCaseList: [
                        {
                            status: "failed"
                        }, {
                            status: "passed"
                        }
                    ]
                }
            ]
        });
        onError(undefined, opt);
    }, onError);
};

local.testCase_throwError_default = function (opt, onError) {
/*
 * this function will test throwError's default handling-behavior
 */
    local.tryCatchOnError(function () {
        local.throwError();
    }, function (err) {
        // handle err
        local.assertOrThrow(err, err);
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
    local.assertOrThrow(
        opt.style.maxHeight.indexOf("px") >= 0,
        opt.style.maxHeight
    );
    local.uiAnimateSlideUp(opt);
    local.assertJsonEqual(opt.style.maxHeight, "0px");
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
    local.assertJsonEqual(local.urlJoin("", ""), "/");
    local.assertJsonEqual(local.urlJoin("http://aa/bb", "zz"), "http://aa/zz");
    local.assertJsonEqual(
        local.urlJoin("http://aa/bb/", "zz"),
        "http://aa/bb/zz"
    );
    local.assertJsonEqual(
        local.urlJoin("http://aa/bb/", "/zz"),
        "http://aa/zz"
    );
    local.assertJsonEqual(local.urlJoin("http://aa/bb/", "//zz"), "http://zz");
    local.assertJsonEqual(
        local.urlJoin("http://aa/bb/", "http://zz"),
        "http://zz"
    );
    onError(undefined, opt);
};

local.testCase_urlParse_default = function (opt, onError) {
/*
 * this function will test urlParse's default handling-behavior
 */
    local.testMock([
        [
            local, {
                // test default PORT handling-behavior
                env: {},
                // test init-serverLocalHost handling-behavior
                serverLocalHost: ""
            }
        ]
    ], function (onError) {
        // test default handling-behavior
        local.assertJsonEqual(local.urlParse(
            "https://127.0.0.1:80/foo/bar?aa=1&bb%20cc=dd%20=ee&aa=2&aa#zz=1"
        ), {
            basename: "bar",
            hash: "#zz=1",
            host: "127.0.0.1:80",
            hostname: "127.0.0.1",
            href: (
                "https://127.0.0.1:80/foo/bar"
                + "?aa=1&bb%20cc=dd%20=ee&aa=2&aa#zz=1"
            ),
            path: "/foo/bar?aa=1&bb%20cc=dd%20=ee&aa=2&aa",
            pathname: "/foo/bar",
            port: "80",
            protocol: "https:",
            query: {
                aa: [
                    "1", "2", ""
                ],
                "bb cc": "dd =ee"
            },
            search: "?aa=1&bb%20cc=dd%20=ee&aa=2&aa"
        });
        // test err handling-behavior
        local.assertJsonEqual(local.urlParse(null), {
            basename: "",
            hash: "",
            host: "",
            hostname: "",
            href: "",
            path: "",
            pathname: "",
            port: "",
            protocol: "",
            query: {},
            search: ""
        });
        onError(undefined, opt);
    }, onError);
};

local.testCase_uuid4Create_default = function (opt, onError) {
/*
 * this function will test uuid4Create's default handling-behavior
 */
    local.assertOrThrow(
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
                local.serverLocalHost
                + "?modeTest=1"
                + "&modeTestCase=testCase_webpage_err"
            )
        }, function (err) {
            onError(undefined, err);
        });
        return;
    }
    if (local.modeTestCase !== "testCase_webpage_err") {
        onError();
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

local.utility2.serverLocalUrlTest = function (url) {
/*
 * this function will test if <url> is local
 */
    url = local.urlParse(url).pathname;
    return local.isBrowser && !local.env.npm_config_mode_backend && (
        /^\/test\./
    ).test(url);
};
}());



// run shared js-env code - init-after
(function () {
// hack-coverage - test testRunServer's multiple-call handling-behavior
local.testRunServer(local);
// hack-coverage - stateInit
local.stateInit({});
// init test-middleware
local.middlewareList.push(function (req, res, next) {
/*
 * this function will run test-middleware
 */
    switch (req.urlParsed.pathname) {
    // test http POST handling-behavior
    case "/test.body":
        // test req-body-read handling-behavior
        local.middlewareBodyRead(req, res, function () {
            // test multiple req-body-read handling-behavior
            local.middlewareBodyRead(req, res, function () {
                res.write(req.bodyRaw);
                res.end();
            });
        });
        break;
    // test http POST handling-behavior
    case "/test.echo":
        // test res-header handling-behavior
        local.serverRespondHeadSet(req, res, null, {
            "X-Res-Header-Test": "bb"
        });
        local.serverRespondEcho(req, res);
        break;
    // test 500-internal-server-error handling-behavior
    case "/test.err-500":
        // test multiple-callback serverRespondHeadSet handling-behavior
        local.serverRespondHeadSet(req, res, null, {});
        next(new Error());
        // test multiple-callback-error handling-behavior
        next(new Error());
        // test onErrorDefault handling-behavior
        local.testMock([
            [
                local, {
                    swgg: null
                }
            ]
        ], function (onError) {
            let err;
            err = new Error("error");
            err.statusCode = 500;
            local.middlewareError(err, req, res);
            onError();
        }, local.onErrorThrow);
        break;
    // test undefined-status-code handling-behavior
    case "/test.err-undefined":
        local.serverRespondDefault(req, res, 999);
        break;
    // test timeout handling-behavior
    case "/test.timeout":
        setTimeout(function () {
            res.end();
        }, 2000);
        break;
    // serve file
    default:
        local.middlewareFileServer(req, res, next);
    }
});
}());



// run node js-env code - init-after
/* istanbul ignore next */
(function () {
if (local.isBrowser) {
    return;
}



(function () {
    switch (local.env.HEROKU_APP_NAME) {
    case "h1-cron1":
        // heroku-keepalive
        setInterval(function () {
            local.ajax({
                url: "https://h1-cron1.herokuapp.com"
            }, local.onErrorThrow);
        }, 5 * 60 * 1000);
        local.cronJob = local.nop;
        // update cron
        local.ajax({
            url: "https://kaizhu256.github.io/node-utility2/cronJob.js"
        }, function (err, xhr) {
            if (!err && xhr.responseText !== local.cronScript) {
                local.cronScript = xhr.responseText;
                require("vm").runInThisContext(local.cronScript);
            }
        });
        setInterval(function () {
            let cronTime;
            cronTime = new Date();
            if (
                cronTime.toISOString().slice(0, 16)
                < (local.cronTime && local.cronTime.toISOString())
            ) {
                return;
            }
            local.cronTime = cronTime;
            // cron every 5 minutes
            if (local.cronTime.getUTCMinutes() % 5 === 0) {
                // update cron
                local.ajax({
                    url: "https://kaizhu256.github.io/node-utility2/cronJob.js"
                }, function (err, xhr) {
                    if (!err && xhr.responseText !== local.cronScript) {
                        local.cronScript = xhr.responseText;
                        require("vm").runInThisContext(local.cronScript);
                    }
                });
            }
            local.cronJob();
        }, 30000);
        break;
    case "h1-proxy1":
        // heroku-keepalive
        setInterval(function () {
            local.ajax({
                url: "https://h1-proxy1.herokuapp.com"
            }, local.onErrorThrow);
        }, 5 * 60 * 1000);
        break;
    }
}());



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
    if (local.env.npm_config_mode_coverage) {
        process.argv.splice(1, 1, __dirname + "/lib.istanbul.js", "cover");
        local.istanbul.cliDict[process.argv[2]]();
        return;
    }
    // start
    process.argv.splice(1, 1);
    process.argv[1] = local.path.resolve(process.argv[1]);
    local.Module.runMain();
}
// runme
if (local.env.npm_config_runme) {
    require(local.path.resolve(local.env.npm_config_runme));
}
}());
}());
