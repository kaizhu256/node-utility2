/* istanbul instrument in package utility2 */
/* istanbul ignore next */
/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    var consoleError;
    var local;
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
    local.assertThrow = function (passed, message) {
    /*
     * this function will throw err.<message> if <passed> is falsy
     */
        var err;
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
        var child_process;
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
        var fs;
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
}((typeof globalThis === "object" && globalThis) || (function () {
    return Function("return this")(); // jslint ignore:line
}())));



(function (local) {
"use strict";



// run shared js-env code - init-before
(function () {
// init local
local = (
    globalThis.utility2 || require("./lib.utility2.js")
).requireReadme();
globalThis.local = local;
// init test
local.testRunDefault(local);
}());



// run shared js-env code - function
(function () {
local._testCase_testRunDefault_failure = function (opt, onError) {
/*
 * this function will test testRunDefault's failure handling-behavior
 */
    // test failure from callback handling-behavior
    onError(local.errDefault);
    // test failure from multiple-callback handling-behavior
    onError(null, opt);
    // test failure from ajax handling-behavior
    local.ajax({
        url: "/undefined"
    }, onError);
    // test failure from uncaught-uncaughtexception handling-behavior
    setTimeout(local.throwError);
    // test console.error handling-behavior
    local.testMock([
        [
            globalThis, {
                __coverage__: null
            }
        ]
    ], function (onError) {
        console.error();
        onError(null, opt);
    }, local.onErrorThrow);
    // test failure from thrown err handling-behavior
    throw local.errDefault;
};

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
        // validate no err occurred
        local.assertThrow(!err, err);
        // validate responseText
        local.assertThrow(xhr.responseText.indexOf(
            "\r\nContent-Disposition: form-data; "
            + "name=\"text1\"\r\n\r\naabbhello \ud83d\ude01\n0\r\n"
        ) >= 0, xhr.responseText);
        local.assertThrow(xhr.responseText.indexOf(
            "\r\nContent-Disposition: form-data; "
            + "name=\"file1\"\r\n\r\naabbhello \ud83d\ude01\n0\r\n"
        ) >= 0, xhr.responseText);
        local.assertThrow(xhr.responseText.indexOf(
            "\r\nContent-Disposition: form-data; name=\"file2\"; "
            + "filename=\"filename2.txt\"\r\nContent-Type: text/plain; "
            + "charset=utf-8\r\n\r\naabbhello \ud83d\ude01\n0\r\n"
        ) >= 0, xhr.responseText);
        onError(null, opt);
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
                    onError(local.errDefault);
                }
            }
        ]
    ], function (onError) {
        local.ajax({
            data: new local.FormData(),
            method: "POST",
            url: "/test.echo"
        }, function (err) {
            // validate err occurred
            local.assertThrow(err, err);
            onError(null, opt);
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
        // validate no err occurred
        local.assertThrow(!err, err);
        // validate responseText
        local.assertThrow((
            /\r\n\r\n$/
        ).test(xhr.responseText), xhr.responseText);
        onError(null, opt);
    });
};

local.testCase_ajax_cache = function (opt, onError) {
/*
 * this function will test ajax's cache handling-behavior
 */
    if (local.isBrowser) {
        onError(null, opt);
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
    var onParallel;
    onParallel = local.onParallel(onError);
    onParallel.counter += 1;

    // test ajax's abort handling-behavior
    onParallel.counter += 1;
    local.onParallelList({
        list: [
            "",
            "arraybuffer",
            "blob",
            "text"
        ]
    }, function (responseType, onParallel) {
        responseType = responseType.elem;
        onParallel.counter += 1;
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
            // validate no err occurred
            local.assertThrow(!err, err);
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
    onParallel.counter += 1;
    opt = local.ajax({
        url: "/test.timeout"
    }, function (err, xhr) {
        // validate err occurred
        local.assertThrow(err, err);
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
    onParallel.counter += 1;
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
        // validate no err occurred
        local.assertThrow(!err, err);
        // validate statusCode
        local.assertJsonEqual(xhr.statusCode, 200);
        // validate resHeaders
        local.assertJsonEqual(xhr.resHeaders["x-res-header-test"], "bb");
        // validate responseText
        local.assertThrow((
            /\r\nhello\u0020\ud83d\ude01\n$/
        ).test(xhr.responseText), xhr.responseText);
        local.assertThrow((
            /\r\nx-req-header-test:\u0020aa\r\n/
        ).test(xhr.responseText), xhr.responseText);
        // validate properties
        local.assertJsonEqual(xhr._aa, undefined);
        local.assertJsonEqual(xhr.aa, "aa");
        onParallel(null, opt);
    });

    // test ajax's err handling-behavior
    onParallel.counter += 1;
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
            //!! }, {
                //!! // test corsForwardProxyHost handling-behavior
                //!! corsForwardProxyHost: "https://undefined:0",
                //!! location: {
                    //!! host: "undefined.github.io"
                //!! },
                //!! timeout: 1,
                //!! // test undefined-https-url handling-behavior
                //!! url: "https://undefined:0"
            }
        ]
    }, function (option2, onParallel) {
        onParallel.counter += 1;
        local.ajax(option2.elem, function (err) {
            // validate err occurred
            local.assertThrow(err, err);
            onParallel(null, opt);
        });
    }, onParallel);

    // test ajax's file handling-behavior
    onParallel.counter += 1;
    local.ajax({
        url: "LICENSE"
    }, function (err, xhr) {
        // validate no err occurred
        local.assertThrow(!err, err);
        // validate statusCode
        local.assertJsonEqual(xhr.statusCode, 200);
        // validate responseText
        local.assertThrow(xhr.responseText.indexOf(
            "MIT License (https://opensource.org/licenses/MIT)\n\n"
        ) === 0, xhr.data);
        onParallel(null, opt);
    });

    // test ajax's standalone handling-behavior
    onParallel.counter += 1;
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
            onParallel.counter += 1;
            local.ajax({
                responseType,
                url: (
                    local.isBrowser
                    ? location.href
                    : local.serverLocalHost
                )
            }, function (err, xhr) {
                // validate no err occurred
                local.assertThrow(!err, err);
                // validate statusCode
                local.assertJsonEqual(xhr.statusCode, 200);
                onParallel();
            });
            // test err handling-behavior
            onParallel.counter += 1;
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
                // validate err occurred
                local.assertThrow(err, err);
                // validate statusCode
                local.assertJsonEqual(xhr.statusCode, 404);
                onParallel();
            });
        });
        onError(null, opt);
    }, onParallel);
    onParallel();

    // test ajax's timeout handling-behavior
    onParallel.counter += 1;
    setTimeout(function () {
        local.ajax({
            timeout: 1,
            url: "/test.timeout"
        }, function (err, xhr) {
            // validate err occurred
            local.assertThrow(err, err);
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
    local.assertThrow(true, true);
    // test assertion failed with undefined message
    local.tryCatchOnError(function () {
        local.assertThrow(null);
    }, function (err) {
        // validate err occurred
        local.assertThrow(err, err);
        // validate err.message
        local.assertJsonEqual(err.message, "");
    });
    // test assertion failed with string message
    local.tryCatchOnError(function () {
        local.assertThrow(null, "aa");
    }, function (err) {
        // validate err occurred
        local.assertThrow(err, err);
        // validate err.message
        local.assertJsonEqual(err.message, "aa");
    });
    // test assertion failed with errObj
    local.tryCatchOnError(function () {
        local.assertThrow(null, local.errDefault);
    }, function (err) {
        // validate err occurred
        local.assertThrow(err, err);
    });
    // test assertion failed with json object
    local.tryCatchOnError(function () {
        local.assertThrow(null, {
            aa: 1
        });
    }, function (err) {
        // validate err occurred
        local.assertThrow(err, err);
        // validate err.message
        local.assertJsonEqual(err.message, "{\n    \"aa\": 1\n}");
    });
    [
        "", 0, false, null, undefined
    ].forEach(function (aa, ii) {
        [
            "", 0, false, null, undefined
        ].forEach(function (bb, jj) {
            if (ii === jj) {
                // test assertJsonEqual's handling-behavior
                local.assertJsonEqual(aa, bb);
            } else {
                // test assertJsonNotEqual's handling-behavior
                local.assertJsonNotEqual(aa, bb);
            }
        });
    });
    onError(null, opt);
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
    onError(null, opt);
};

local.testCase_blobRead_default = function (opt, onError) {
/*
 * this function will test blobRead's default handling-behavior
 */
    var onParallel;
    onParallel = local.onParallel(onError);
    onParallel.counter += 1;
    // test data handling-behavior
    onParallel.counter += 1;
    local.blobRead(new local.Blob([
        "",
        "aa",
        "bb",
        new Uint8Array(0),
        local.stringHelloEmoji
    ]), function (err, data) {
        // validate no err occurred
        local.assertThrow(!err, err);
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
    onParallel.counter += 1;
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
            // validate err occurred
            local.assertThrow(err, err);
        });
        onError(null, opt);
    }, onParallel);
    onParallel();
};

local.testCase_bufferIndexOfSubBuffer_default = function (opt, onError) {
/*
 * this function will test bufferIndexOfSubBuffer's default handling-behavior
 */
[
    {
        buffer: "",
        subBuffer: "",
        validate: 0
    }, {
        buffer: "",
        subBuffer: "aa",
        validate: -1
    }, {
        buffer: "aa",
        subBuffer: "",
        validate: 0
    }, {
        buffer: "aa",
        subBuffer: "aa",
        validate: 0
    }, {
        buffer: "aa",
        subBuffer: "bb",
        validate: -1
    }, {
        buffer: "aaaa",
        subBuffer: "aa",
        validate: 0
    }, {
        buffer: "aabb",
        subBuffer: "aa",
        validate: 0
    }, {
        buffer: "aabb",
        subBuffer: "bb",
        validate: 2
    }, {
        buffer: "aabbaa",
        subBuffer: "aa",
        validate: 0
    }, {
        buffer: "aabbaa",
        subBuffer: "bb",
        validate: 2
    }, {
        buffer: "aabbaa",
        subBuffer: "ba",
        validate: 3
    }
].forEach(function (opt) {
    local.assertJsonEqual(local.bufferIndexOfSubBuffer(
        new TextEncoder().encode(opt.buffer),
        new TextEncoder().encode(opt.subBuffer),
        opt.fromIndex
    ), opt.validate);
});
onError(null, opt);
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
        // validate err occurred
        local.assertThrow(opt, elem);
    });
    onError(null, opt);
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
        onError(null, opt);
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
                file: "/assets.utility2.lib.db.js",
                url: "/assets.utility2.lib.db.js"
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
                file: "/assets.utility2.lib.sjcl.js",
                url: "/assets.utility2.lib.sjcl.js"
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
        onError(null, opt);
        return;
    }
    local.testMock([
        [
            local, {
                // test duplicate local function handling-behavior
                fsReadFileOrEmptyStringSync: function () {
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
        onError(null, opt);
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
                /#\u0020quickstart\u0020example.js[\S\s]*?istanbul\u0020instrument\u0020in\u0020package/
            ),
            // customize quickstart-example-js-html-script
            (
                /<script\u0020src="assets\.utility2\.[\S\s]*?<script\u0020src="assets\.example\.js">/
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
        local._testCase_buildApidoc_default(null, local.nop);
        local._testCase_buildApp_default(null, local.nop);
        local._testCase_buildLib_default(null, local.nop);
        local._testCase_buildReadme_default(null, local.nop);
        local._testCase_buildTest_default(null, local.nop);
        local._testCase_webpage_default(null, local.nop);
        local.assetsDict["/"] = "<script src=\"assets.test.js\"></script>";
        local._testCase_webpage_default(null, local.nop);
        onError(null, opt);
    }, onError);
};

local.testCase_childProcessSpawnWithTimeout_default = function (
    opt,
    onError
) {
/*
 * this function will test
 * childProcessSpawnWithTimeout's default handling-behavior
 */
    var onParallel;
    if (local.isBrowser) {
        onError(null, opt);
        return;
    }
    opt = {};
    onParallel = local.onParallel(onError);
    onParallel.counter += 1;
    // test default handling-behavior
    onParallel.counter += 1;
    local.childProcessSpawnWithTimeout("ls").on(
        "error",
        onParallel
    ).on("exit", function (exitCode, signal) {
        // validate exitCode
        local.assertJsonEqual(exitCode, 0);
        // validate signal
        local.assertJsonEqual(signal, null);
        onParallel(null, opt);
    });
    // test timeout handling-behavior
    onParallel.counter += 1;
    local.testMock([
        [
            local, {
                timeoutDefault: 1000
            }
        ]
    ], function (onError) {
        opt.childProcess = (
            local.childProcessSpawnWithTimeout("sleep", [
                5000
            ])
        );
        onError(null, opt);
    }, local.onErrorThrow);
    opt.childProcess.on(
        "error",
        onParallel
    ).on("exit", function (exitCode, signal) {
        // validate exitCode
        local.assertJsonEqual(exitCode, null);
        // validate signal
        local.assertJsonEqual(signal, "SIGKILL");
        onParallel(null, opt);
    });
    onParallel(null, opt);
};

local.testCase_childProcessSpawnWithUtility2_err = function (
    opt,
    onError
) {
/*
 * this function will test
 * childProcessSpawnWithTimeout's err handling-behavior
 */
    if (local.isBrowser) {
        onError(null, opt);
        return;
    }
    local.testMock([
        // test __dirname handling-behavior
        [
            process.env, {
                npm_config_dir_utility2: ""
            }
        ]
    ], function (onError) {
        local.local.childProcessSpawnWithUtility2("undefined", function (err) {
            // validate err occurred
            local.assertThrow(err, err);
        });
        onError(null, opt);
    }, onError);
};

local.testCase_cliRun_default = function (opt, onError) {
/*
 * this function will test cliRun's default handling-behavior
 */
    if (local.isBrowser) {
        onError(null, opt);
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
            local.repl, {
                start: local.nop
            }
        ], [
            local.vm, {
                runInThisContext: local.nop
            }
        ], [
            process, {
                argv: []
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
        onError(null, opt);
    }, onError);
};

local.testCase_corsBackendHostInject_default = function (opt, onError) {
/*
 * this function will corsBackendHostInject's default handling-behavior
 */
    // test null-case handling-behavior
    local.assertJsonEqual(local.corsBackendHostInject(), undefined);
    // test override-all handling-behavior
    local.assertJsonEqual(local.corsBackendHostInject(
        "cc.com",
        "aa-alpha.bb.com",
        null,
        {
            host: "github.io",
            pathname: "/build..beta..travis-ci.org/"
        }
    ), "aa-beta.bb.com");
    // test override-rgx handling-behavior
    local.assertJsonEqual(local.corsBackendHostInject(
        "cc/dd",
        "aa-alpha.bb.com/",
        (
            /(^cc\/)/m
        ),
        {
            host: "github.io",
            pathname: "/build..beta..travis-ci.org/"
        }
    ), "aa-beta.bb.com/cc/dd");
    onError(null, opt);
};

local.testCase_corsForwardProxyHostIfNeeded_default = function (
    opt,
    onError
) {
/*
 * this function will corsForwardProxyHostIfNeeded's default handling-behavior
 */
    if (!local.isBrowser) {
        onError(null, opt);
        return;
    }
    local.assertThrow(local.corsForwardProxyHostIfNeeded({
        location: {
            host: "undefined.github.io"
        },
        url: "https://example.com"
    }).indexOf(".herokuapp.com") >= 0);
    onError(null, opt);
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
        onError(null, opt);
        return;
    }
    local.assertJsonEqual(local.domFragmentRender("<div>{{value}}</div>", {
        value: "aa"
    }).children[0].outerHTML, "<div>aa</div>");
    onError(null, opt);
};

local.testCase_isNullOrUndefined_default = function (opt, onError) {
/*
 * this function will test isNullOrUndefined's default handling-behavior
 */
    // validate data
    local.assertJsonEqual(local.isNullOrUndefined(null), true);
    // validate data
    local.assertJsonEqual(local.isNullOrUndefined(undefined), true);
    // validate data
    local.assertJsonEqual(local.isNullOrUndefined(false), false);
    onError(null, opt);
};

local.testCase_jsonCopy_default = function (opt, onError) {
/*
 * this function will test jsonCopy's default handling-behavior
 */
// test various data-type handling-behavior
[
    undefined, null, false, true, 0, 1, 1.5, "a"
].forEach(function (elem) {
    local.assertJsonEqual(local.jsonCopy(elem), elem);
});
onError(null, opt);
};

local.testCase_jsonStringifyOrdered_default = function (opt, onError) {
/*
 * this function will test jsonStringifyOrdered's default handling-behavior
 */
    // test data-type handling-behavior
    ([
        undefined,
        null,
        false,
        true,
        0,
        1,
        1.5,
        "a",
        {},
        []
    ]).forEach(function (data) {
        local.assertJsonEqual(
            local.jsonStringifyOrdered(data),
            JSON.stringify(data)
        );
    });
    // test data-ordering handling-behavior
    opt = {
        // test nested dict handling-behavior
        ff: {
            hh: 2,
            gg: 1
        },
        // test nested array handling-behavior
        ee: [
            1, null, undefined
        ],
        dd: local.nop,
        cc: undefined,
        bb: null,
        aa: 1
    };
    // test circular-reference handling-behavior
    opt.zz = opt;
    local.assertJsonEqual(
        opt,
        {
            aa: 1,
            bb: null,
            ee: [
                1, null, null
            ],
            ff: {
                gg: 1,
                hh: 2
            }
        }
    );
    onError(null, opt);
};

local.testCase_jwtAes256GcmXxx_default = function (opt, onError) {
/*
 * this function will test jwtAes256GcmXxx's default handling-behavior
 */
    opt = {};
    opt.key = local.jwtAes256KeyCreate();
    // use canonical example at https://jwt.io/
    opt.data = JSON.parse(local.jsonStringifyOrdered(local.normalizeJwt({
        sub: "1234567890",
        name: "John Doe",
        admin: true
    })));
    // encrypt token
    opt.token = local.jwtAes256GcmEncrypt(opt.data, opt.key);
    // validate encrypted-token
    local.assertJsonEqual(
        local.jwtAes256GcmDecrypt(opt.token, opt.key),
        opt.data
    );
    // test decryption-failed handling-behavior
    local.assertJsonEqual(local.jwtAes256GcmDecrypt(opt.token, null), {});
    onError(null, opt);
};

local.testCase_jwtHs256Xxx_default = function (opt, onError) {
/*
 * this function will test jwtHs256Xxx's default handling-behavior
 */
    opt = {};
    opt.key = local.normalizeJwtBase64Url(local.base64FromBuffer("secret"));
    // use canonical example at https://jwt.io/
    opt.data = {
        sub: "1234567890",
        name: "John Doe",
        admin: true
    };
    opt.token = local.jwtHs256Encode(opt.data, opt.key);
    // validate encoded-token
    local.assertJsonEqual(
        opt.token,
        (
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
            + ".eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZ"
            + "SI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9"
            + ".TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"
        )
    );
    // validate decoded-data
    local.assertJsonEqual(
        local.jwtHs256Decode(opt.token, opt.key),
        {
            admin: true,
            name: "John Doe",
            sub: "1234567890"
        }
    );
    // test decoding-failed handling-behavior
    local.assertJsonEqual(local.jwtHs256Decode(opt.token, "undefined"), {});
    onError(null, opt);
};

local.testCase_libUtility2Js_standalone = function (opt, onError) {
/*
 * this function will test lib.utility2.js's standalone handling-behavior
 */
    if (local.isBrowser) {
        onError(null, opt);
        return;
    }
    local.fs.writeFileSync("tmp/lib.utility2.js", local.fs.readFileSync(
        "lib.utility2.js",
        "utf8"
    ).replace("/* istanbul instrument in package utility2 */", ""));
    require("./tmp/lib.utility2.js");
    onError(null, opt);
};

local.testCase_listGetElementRandom_default = function (opt, onError) {
/*
 * this function will test listGetRandom's default handling-behavior
 */
    opt = {};
    // init list
    opt.list = [
        "aa", "bb", "cc", "dd"
    ];
    opt.elemDict = {};
    // get 1000 random elem from list
    opt.ii = 0;
    while (opt.ii < 1000) {
        opt.elemDict[local.listGetElementRandom(opt.list)] = true;
        opt.ii += 1;
    }
    // validate all elem were retrieved from list
    local.assertJsonEqual(
        Object.keys(opt.elemDict).sort(),
        [
            "aa", "bb", "cc", "dd"
        ]
    );
    onError(null, opt);
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
    // validate list changed at least once during the shuffle
    local.assertThrow(opt.changed, opt);
    onError(null, opt);
};

local.testCase_localStorageSetItemOrClear_default = function (
    opt,
    onError
) {
/*
 * this function will localStorageSetItemOrClear's default handling-behavior
 */
    if (!local.isBrowser) {
        onError(null, opt);
        return;
    }
    local.localStorageSetItemOrClear(
        "testCase_localStorageSetItemOrClear_default",
        null
    );
    local.assertJsonEqual(
        localStorage.testCase_localStorageSetItemOrClear_default,
        "null"
    );
    local.testMock([
        [
            localStorage, {
                clear: null,
                setItem: function () {
                    throw local.errDefault;
                }
            }
        ]
    ], function (onError) {
        localStorage.clear = onError;
        local.localStorageSetItemOrClear(
            "testCase_localStorageSetItemOrClear_default",
            null
        );
    }, onError);
};

local.testCase_middlewareForwardProxy_default = function (opt, onError) {
/*
 * this function will test middlewareForwardProxy's default handling-behavior
 */
    var onParallel;
    if (local.isBrowser) {
        onError(null, opt);
        return;
    }
    onParallel = local.onParallel(onError);
    onParallel.counter += 1;
    // test preflight-cors handling-behavior
    onParallel.counter += 1;
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
    onParallel.counter += 1;
    local.ajax({
        headers: {
            "forward-proxy-url": "/assets.hello.txt"
        },
        url: ""
    }, function (err, xhr) {
        // validate no err occurred
        local.assertThrow(!err, err);
        // validate responseText
        local.assertJsonEqual(xhr.responseText, local.stringHelloEmoji);
        onParallel(null, opt, xhr);
    });
    // test err handling-behavior
    onParallel.counter += 1;
    local.ajax({
        headers: {
            "forward-proxy-url": "https://undefined:0"
        },
        url: ""
    }, function (err) {
        // validate err occurred
        local.assertThrow(err, err);
        onParallel(null, opt);
    });
    onParallel(null, opt);
};

local.testCase_middlewareJsonpStateInit_assetsList = function (
    opt,
    onError
) {
/*
 * this function will middlewareJsonpStateInit's assetsList handling-behavior
 */
    local.testMock([
        [
            local.env, {
                npm_package_assetsList: "undefined"
            }
        ], [
            local, {
                assetsDict: {}
            }
        ]
    ], function (onError) {
        local.middlewareJsonpStateInit({
            stateInit: true
        });
        // validate data
        local.assertJsonEqual(local.assetsDict["/undefined"], "");
        onError(null, opt);
    }, onError);
};

local.testCase_moduleDirname_default = function (opt, onError) {
/*
 * this function will test moduleDirname's default handling-behavior
 */
    if (local.isBrowser) {
        onError(null, opt);
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
    onError(null, opt);
};

local.testCase_numberToRomanNumerals_default = function (opt, onError) {
/*
 * this function will test numberToRomanNumerals's default handling-behavior
 */
    opt = {};
    opt.list = [
        "",
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI",
        "XII",
        "XIII",
        "XIV",
        "XV",
        "XVI",
        "XVII",
        "XVIII",
        "XIX",
        "XX",
        "XXI",
        "XXII",
        "XXIII",
        "XXIV",
        "XXV",
        "XXVI",
        "XXVII",
        "XXVIII",
        "XXIX",
        "XXX",
        "XXXI",
        "XXXII",
        "XXXIII",
        "XXXIV",
        "XXXV",
        "XXXVI",
        "XXXVII",
        "XXXVIII",
        "XXXIX",
        "XL",
        "XLI",
        "XLII",
        "XLIII",
        "XLIV",
        "XLV",
        "XLVI",
        "XLVII",
        "XLVIII",
        "XLIX",
        "L",
        "LI",
        "LII",
        "LIII",
        "LIV",
        "LV",
        "LVI",
        "LVII",
        "LVIII",
        "LIX",
        "LX",
        "LXI",
        "LXII",
        "LXIII",
        "LXIV",
        "LXV",
        "LXVI",
        "LXVII",
        "LXVIII",
        "LXIX",
        "LXX",
        "LXXI",
        "LXXII",
        "LXXIII",
        "LXXIV",
        "LXXV",
        "LXXVI",
        "LXXVII",
        "LXXVIII",
        "LXXIX",
        "LXXX",
        "LXXXI",
        "LXXXII",
        "LXXXIII",
        "LXXXIV",
        "LXXXV",
        "LXXXVI",
        "LXXXVII",
        "LXXXVIII",
        "LXXXIX",
        "XC",
        "XCI",
        "XCII",
        "XCIII",
        "XCIV",
        "XCV",
        "XCVI",
        "XCVII",
        "XCVIII",
        "XCIX",
        "C"
    ];
    opt.ii = 0;
    while (opt.ii < 10) {
        local.assertJsonEqual(
            local.numberToRomanNumerals(opt.ii),
            opt.list[opt.ii]
        );
        opt.ii += 1;
    }
    onError(null, opt);
};

local.testCase_objectSetDefault_default = function (opt, onError) {
/*
 * this function will test objectSetDefault's default handling-behavior
 */
    // test null-case handling-behavior
    local.objectSetDefault();
    local.objectSetDefault({});
    // test falsy handling-behavior
    [
        "", 0, false, null, undefined
    ].forEach(function (aa) {
        [
            "", 0, false, null, undefined
        ].forEach(function (bb) {
            local.assertJsonEqual(
                local.objectSetDefault({
                    data: aa
                }, {
                    data: bb
                }).data,
                (aa === 0 || aa === false || bb === undefined)
                ? aa
                : bb
            );
        });
    });
    // test non-recursive handling-behavior
    local.assertJsonEqual(local.objectSetDefault({
        aa: 0,
        bb: {
            cc: 1
        },
        cc: {
            dd: {}
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
            dd: {
                ee: 2
            }
        },
        dd: [
            2, 2
        ],
        ee: {
            ff: 2
        }
    // test default-depth handling-behavior
    }, null), {
        aa: 0,
        bb: {
            cc: 1
        },
        cc: {
            dd: {}
        },
        dd: [
            1, 1
        ],
        ee: [
            1, 1
        ]
    });
    // test recursive handling-behavior
    local.assertJsonEqual(local.objectSetDefault({
        aa: 0,
        bb: {
            cc: 1
        },
        cc: {
            dd: {}
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
            dd: {
                ee: 2
            }
        },
        dd: [
            2, 2
        ],
        ee: {
            ff: 2
        }
    // test depth handling-behavior
    }, 2), {
        aa: 0,
        bb: {
            cc: 1,
            dd: 2
        },
        cc: {
            dd: {}
        },
        dd: [
            1, 1
        ],
        ee: [
            1, 1
        ]
    });
    onError(null, opt);
};

local.testCase_objectSetOverride_default = function (opt, onError) {
/*
 * this function will test objectSetOverride's default handling-behavior
 */
    // test null-case handling-behavior
    local.objectSetOverride();
    local.objectSetOverride({});
    // test falsy handling-behavior
    [
        "", 0, false, null, undefined
    ].forEach(function (aa) {
        [
            "", 0, false, null, undefined
        ].forEach(function (bb) {
            local.assertJsonEqual(
                local.objectSetOverride({
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
    local.assertJsonEqual(local.objectSetOverride({
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
    local.assertJsonEqual(local.objectSetOverride({
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
    local.assertJsonEqual(local.objectSetOverride(
        local.env,
        {
            "emptyString": null
        },
        // test default-depth handling-behavior
        null,
        local.env
    ).emptyString, "");
    onError(null, opt);
};

local.testCase_onErrorDefault_default = function (opt, onError) {
/*
 * this function will test onErrorDefault's default handling-behavior
 */
    local.testMock([
        [
            console, {
                error: function (arg) {
                    opt = arg;
                }
            }
        ], [
            globalThis, {
                __coverage__: null
            }
        ]
    ], function (onError) {
        // test no err handling-behavior
        local.onErrorDefault();
        // validate opt
        local.assertThrow(!opt, opt);
        // test err handling-behavior
        local.onErrorDefault(local.errDefault);
        // validate opt
        local.assertThrow(opt, opt);
        onError(null, opt);
    }, onError);
};

local.testCase_onErrorThrow_err = function (opt, onError) {
/*
 * this function will test onErrorThrow's err handling-behavior
 */
    local.tryCatchOnError(function () {
        local.onErrorThrow(local.errDefault);
    }, function (err) {
        // validate err occurred
        local.assertThrow(err, err);
        onError(null, opt);
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
    onError(null, opt);
};

local.testCase_onFileModifiedRestart_watchFile = function (opt, onError) {
/*
 * this function will test onFileModifiedRestart's watchFile handling-behavior
 */
    var onParallel;
    if (local.isBrowser) {
        onError(null, opt);
        return;
    }
    onParallel = local.onParallel(onError);
    onParallel.counter += 1;
    local.fs.stat(__filename, function (err, stat) {
        // test default watchFile handling-behavior
        onParallel.counter += 1;
        local.fs.utimes(__filename, stat.atime, new Date(), onParallel);
        // test nop watchFile handling-behavior
        onParallel.counter += 1;
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
        throw local.errDefault;
    });
    opt.gotoState = 0;
    local.tryCatchOnError(function () {
        opt.gotoNext();
    }, function (err) {
        // validate err occurred
        local.assertThrow(err, err);
        onError(null, opt);
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
            local.onParallelList(opt, function (option2, onParallel) {
                onParallel.counter += 1;
                // test err handling-behavior
                onParallel(local.errDefault, option2);
                // test multiple-callback handling-behavior
                setTimeout(onParallel, 5000);
            }, function (err) {
                // validate err occurred
                local.assertThrow(err, err);
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
            }, function (option2, onParallel) {
                onParallel.counter += 1;
                opt.rateMax = Math.max(
                    onParallel.counter - 1,
                    opt.rateMax
                );
                // test async handling-behavior
                setTimeout(function () {
                    // test list-growth handling-behavior
                    if (option2.ii === 3) {
                        option2.list.push(5);
                    }
                    opt.data[option2.ii] = option2.elem;
                    // test retry handling-behavior
                    local.assertThrow(option2.retry < 1);
                    onParallel(null, option2);
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
            }, function (option2, onParallel) {
                // test sync handling-behavior
                onParallel.counter += 1;
                opt.rateMax = Math.max(onParallel.counter, opt.rateMax);
                opt.data[option2.ii] = option2.elem;
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
    var onParallel;
    var onParallelError;
    // test onEach handling-behavior
    onParallel = local.onParallel(onError, function () {
        // validate counter
        local.assertThrow(onParallel.counter >= 0, onParallel);
    });
    onParallel.counter += 1;
    // test multiple-task handling-behavior
    onParallel.counter += 1;
    setTimeout(function () {
        onParallelError = local.onParallel(onParallel);
        onParallelError.counter += 1;
        onParallelError();
        // test multiple-callback-error handling-behavior
        onParallelError();
        // validate err occurred
        local.assertThrow(onParallelError.err, onParallelError.err);
        // test err handling-behavior
        onParallelError(local.errDefault);
        // validate err occurred
        local.assertThrow(onParallelError.err, onParallelError.err);
        // test ignore-after-error handling-behavior
        onParallelError();
    });
    // test default handling-behavior
    onParallel(null, opt);
};

local.testCase_onTimeout_timeout = function (opt, onError) {
/*
 * this function will test onTimeout's timeout handling-behavior
 */
    opt = local.timeElapsedStart();
    local.onTimeout(function (err) {
        // validate err occurred
        local.assertThrow(err, err);
        // validate err.message
        local.assertThrow(
            err.message.indexOf("testCase_onTimeout_timeout") >= 0,
            err
        );
        // poll timeElapsed
        local.timeElapsedPoll(opt);
        // validate timeElapsed passed is greater than timeout
        local.assertThrow(opt.timeElapsed >= 1000, opt);
        onError(null, opt);
    }, 1000, "testCase_onTimeout_timeout");
};

local.testCase_profileXxx_default = function (opt, onError) {
/*
 * this function will test profileXxx's default handling-behavior
 */
    opt = {};
    // test profileSync's handling-behavior
    opt.timeElapsed = local.profileSync(function () {
        return;
    });
    // validate timeElapsed
    local.assertThrow(
        0 <= opt.timeElapsed && opt.timeElapsed < 1000,
        opt.timeElapsed
    );
    // test profile's async handling-behavior
    local.profile(function (onError) {
        setTimeout(onError);
    }, function (err, timeElapsed) {
        // validate no err occurred
        local.assertThrow(!err, err);
        opt.timeElapsed = timeElapsed;
        // validate timeElapsed
        local.assertThrow((
            0 <= opt.timeElapsed
            && opt.timeElapsed < local.timeoutDefault
        ), opt.timeElapsed);
        onError(null, opt);
    });
};

local.testCase_replStart_default = function (opt, onError) {
/*
 * this function will test replStart's default handling-behavior
 */
    if (local.isBrowser) {
        onError(null, opt);
        return;
    }
    local.replStart();
    // hack-istanbul - test replStart's muliple-call handling-behavior
    local.replStart();
    local.testMock([
        [
            local.child_process, {
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
        // test err handling-behavior
        globalThis.utility2_repl1.onError(local.errDefault);
        onError(null, opt);
    }, onError);
};

local.testCase_replStart_tcp = function (opt, onError) {
/*
 * this function will test replStart's tcp handling-behavior
 */
    if (local.isBrowser) {
        onError(null, opt);
        return;
    }
    opt = {};
    opt.data = "";
    opt.input = Math.random();
    opt.socket = local.net.createConnection(local.env.PORT_REPL);
    opt.socket.on("data", function (data) {
    /*
     * this function will concat data to opt.data
     */
        opt.data += data;
    });
    opt.socket.setEncoding("utf8");
    opt.socket.on("end", function () {
        // validate data
        local.assertThrow(
            opt.data.indexOf(opt.input) >= 0,
            JSON.stringify([
                opt.data, opt.input
            ])
        );
        onError(null, opt);
    });
    opt.socket.write(opt.input + "\n");
    // test err handling-behavior
    opt.socket.end("undefined()\n");
};

local.testCase_requireReadme_start = function (opt, onError) {
/*
 * this function will test requireReadme's start handling-behavior
 */
    if (local.isBrowser) {
        onError(null, opt);
        return;
    }
    local.testMock([
        [
            local, {
                assetsDict: {},
                onFileModifiedRestart: local.nop
            }
        ], [
            local.env, {
                npm_config_mode_start: "1",
                npm_package_nameLib: "_testCase_requireReadme_start"
            }
        ], [
            local.fs, {
                readFile: function (file, opt, onError) {
                    onError(null, "{}", file, opt);
                },
                readdirSync: function () {
                    // test jslintAndPrint.conditional handling-behavior
                    return [
                        "aa.css",
                        "aa.html",
                        "aa.js",
                        "aa.json",
                        "aa.rollup.js",
                        "assets.swgg.swagger.json"
                    ];
                }
            }
        ]
    ], function (onError) {
        // validate data
        local.requireReadme();
        local.assertThrow(local._testCase_requireReadme_start === local);
        onError(null, opt);
    }, onError);
};

local.testCase_semverCompare_default = function (opt, onError) {
/*
 * this function will test semverCompare's default handling-behavior
 */
    // test aa = bb
    opt = [
        [
            "",
            "1",
            "1.2",
            null,
            undefined
        ],
        [
            "1.2.3",
            "1.2.3+aa"
        ],
        [
            "1.2.3-aa",
            "1.2.3-aa+bb"
        ]
    ];
    opt.forEach(function ([
        aa, bb
    ]) {
        local.assertThrow(
            local.semverCompare(aa, bb) === 0,
            [
                aa, bb, local.semverCompare(aa, bb)
            ]
        );
    });
    // test aa < bb
    opt = [
        "syntax-err",
        "1.0.0-alpha",
        "1.0.0-alpha.1",
        "1.0.0-alpha.beta",
        "1.0.0-beta",
        "1.0.0-beta.2",
        "1.0.0-beta.11",
        "1.0.0-rc.1",
        "1.0.0",
        "2.2.2",
        "2.2.10",
        "2.10.2",
        "10.2.2"
    ];
    opt.reduce(function (aa, bb) {
        local.assertThrow(
            local.semverCompare(aa, bb) === -1,
            [
                aa, bb, local.semverCompare(aa, bb)
            ]
        );
        return bb;
    });
    // test aa > bb
    opt.reverse().reduce(function (aa, bb) {
        local.assertThrow(
            local.semverCompare(aa, bb) === 1,
            [
                aa, bb, local.semverCompare(aa, bb)
            ]
        );
        return bb;
    });
    onError(null, opt);
};

local.testCase_serverRespondTimeoutDefault_timeout = function (
    opt,
    onError
) {
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
        onError(null, opt);
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

local.testCase_sjclHashScryptXxx_default = function (opt, onError) {
/*
 * this function will test sjclHashScryptXxx's default handling-behavior
 */
    // test sjclHashScryptCreate's null-case handling-behavior
    local.assertJsonEqual(
        local.sjclHashScryptCreate().slice(0, 10),
        "$s0$10801$"
    );
    // https://github.com/wg/scrypt
    // test sjclHashScryptValidate's fail handling-behavior
    local.assertJsonEqual(local.sjclHashScryptValidate(
        "password",
        (
            "$s0$80801$epIxT/h6HbbwHaehFnh/bw=="
            + "$l/guDhz2Q0v/D93gq0K0qtSX6FWP8pH5maAJkbIcRaEA"
        )
    ), false);
    // https://github.com/wg/scrypt
    // test sjclHashScryptValidate's pass handling-behavior
    local.assertJsonEqual(local.sjclHashScryptValidate("password", (
        "$s0$80801$epIxT/h6HbbwHaehFnh/bw=="
        + "$l/guDhz2Q0v/D93gq0K0qtSX6FWP8pH5maAJkbIcRaE="
    )), true);
    onError(null, opt);
};

local.testCase_sjclHashShaXxxCreate_default = function (opt, onError) {
/*
 * this function will test sjclHashShaXxxCreate's default handling-behavior
 */
    local.assertJsonEqual(
        local.sjclHashSha1Create("aa"),
        "4MkDWJjdUvxlxBRUzsnE0mEb+zc="
    );
    local.assertJsonEqual(
        local.sjclHashSha256Create("aa"),
        "lhtt0+3jy47LqsvWjeBAzXjrLtWIkTDM60xJJo6k1QY="
    );
    onError(null, opt);
};

local.testCase_sjclHmacShaXxx_default = function (opt, onError) {
/*
 * this function will test sjclHmacShaXxx's default handling-behavior
 */
    local.assertJsonEqual(
        local.sjclHmacSha1Create("aa", "bb"),
        "15pOinCz63A+qZoxnv+mJB6UF1k="
    );
    local.assertJsonEqual(
        local.sjclHmacSha256Create("aa", "bb"),
        "94Xv3VdPHA+ohKyjkM1pb0W5ZVAuMVcmIAAI2AqNRCQ="
    );
    onError(null, opt);
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
    onError(null, opt);
};

local.testCase_stringQuotedToAscii_default = function (opt, onError) {
/*
 * this function will test stringQuotedToAscii's default handling-behavior
 */
    local.assertJsonEqual(
        local.stringQuotedToAscii(local.stringHelloEmoji),
        "hello \\ud83d\\ude01\n"
    );
    onError(null, opt);
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
    onError(null, opt);
};

local.testCase_stringTruncate_default = function (opt, onError) {
/*
 * this function will test stringTruncate's default handling-behavior
 */
    local.assertJsonEqual(local.stringTruncate("aa"), "aa");
    local.assertJsonEqual(local.stringTruncate("aa", 1), "...");
    local.assertJsonEqual(local.stringTruncate("aa", 2), "aa");
    onError(null, opt);
};

local.testCase_stringUniqueKey_default = function (opt, onError) {
/*
 * this function will test stringUniqueKey's default handling-behavior
 */
    local.assertThrow(("zqxj").indexOf(local.stringUniqueKey("zqxj") < 0));
    onError(null, opt);
};

local.testCase_taskCreateCached_default = function (opt, onError) {
/*
 * this function will test taskCreateCached's default handling-behavior
 */
    var cacheValue;
    var onTask;
    var option2;
    opt = {};
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        // test no cache handling-behavior
        case 1:
            onTask = function (onError) {
                onError(null, cacheValue);
            };
            opt.cacheDict = "testCase_taskCreateCached_default";
            opt.key = "memory";
            // cleanup memory-cache
            local.cacheDict[opt.cacheDict] = null;
            cacheValue = "aa";
            option2 = {
                cacheDict: opt.cacheDict,
                key: opt.key,
                // test onCacheWrite handling-behavior
                onCacheWrite: opt.gotoNext
            };
            local.taskCreateCached(option2, onTask, opt.gotoNext);
            break;
        case 2:
            // validate data
            local.assertJsonEqual(data, "aa");
            // validate no cache-hit
            local.assertThrow(!option2.modeCacheHit, option2.modeCacheHit);
            break;
        // test cache with update handling-behavior
        case 3:
            cacheValue = "bb";
            option2 = {
                cacheDict: opt.cacheDict,
                key: opt.key,
                // test modeCacheUpdate handling-behavior
                modeCacheUpdate: true,
                // test onCacheWrite handling-behavior
                onCacheWrite: opt.gotoNext
            };
            local.taskCreateCached(option2, onTask, opt.gotoNext);
            break;
        case 4:
            // validate data
            local.assertJsonEqual(data, "aa");
            // validate modeCacheHit
            local.assertJsonEqual(option2.modeCacheHit, true);
            break;
        // test cache handling-behavior
        case 5:
            option2 = {
                cacheDict: opt.cacheDict,
                key: opt.key
            };
            local.taskCreateCached(option2, onTask, opt.gotoNext);
            break;
        case 6:
            // validate data
            local.assertJsonEqual(data, "bb");
            // validate modeCacheHit
            local.assertJsonEqual(option2.modeCacheHit, true);
            opt.gotoNext();
            break;
        default:
            onError(err, opt);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.testCase_taskCreate_multipleCallback = function (opt, onError) {
/*
 * this function will test taskCreate's multiple-callback handling-behavior
 */
    opt = {
        counter: 0,
        key: "testCase_taskCreate_multiCallback"
    };
    local.taskCreate(opt, function (onError) {
        onError(null, opt);
        // test multiple-callback handling-behavior
        onError(null, opt);
    }, function () {
        opt.counter += 1;
    });
    // validate counter incremented once
    local.assertJsonEqual(opt.counter, 1);
    onError(null, opt);
};

local.testCase_taskCreate_upsert = function (opt, onError) {
/*
 * this function will test taskCreate's upsert handling-behavior
 */
    opt = {
        counter: 0,
        key: "testCase_taskCreate_upsert"
    };
    // test upsert handling-behavior
    [
        null, null
    ].forEach(function () {
        local.taskCreate(opt, function (onError) {
            opt.counter += 1;
            setTimeout(onError);
        });
    });
    // validate counter incremented once
    setTimeout(function () {
        local.assertJsonEqual(opt.counter, 1);
        onError(null, opt);
    });
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
            + "    list2{{#eachTrimRightComma list2}}\n"
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
            + "    {{/eachTrimRightComma list2}}\n"
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
    // validate err occurred
    local.assertThrow(local._debugTryCatchError, local._debugTryCatchError);
    onError(null, opt);
};

local.testCase_testReportCreate_default = function (opt, onError) {
/*
 * this function will test testReport's default handling-behavior
 */
    if (local.isBrowser) {
        onError(null, opt);
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
        onError(null, opt);
    }, onError);
};

local.testCase_throwError_default = function (opt, onError) {
/*
 * this function will test throwError's default handling-behavior
 */
    local.tryCatchOnError(function () {
        local.throwError();
    }, function (err) {
        // validate err occurred
        local.assertThrow(err, err);
        onError(null, opt);
    });
};

local.testCase_uiAnimateXxx_default = function (opt, onError) {
/*
 * this function will test uiAnimateXxx's default handling-behavior
 */
    if (!local.isBrowser) {
        onError(null, opt);
        return;
    }
    opt = document.createElement("div");
    // test uiAnimateShake handling-behavior
    local.uiAnimateShake();
    local.uiAnimateShake(opt);
    local.assertThrow(
        opt.classList.contains("uiAnimateShake"),
        opt.classList
    );
    local.uiAnimateShake(opt);
    local.assertThrow(
        opt.classList.contains("uiAnimateShake"),
        opt.classList
    );
    // test uiAnimateShakeIfError handling-behavior
    local.uiAnimateShakeIfError();
    local.uiAnimateShakeIfError(null, opt);
    local.assertThrow(
        !opt.classList.contains("hasError"),
        opt.classList
    );
    local.uiAnimateShakeIfError(true, opt);
    local.assertThrow(opt.classList.contains("hasError"), opt.classList);
    local.uiAnimateShakeIfError(null, opt);
    local.assertThrow(!opt.classList.contains("hasError"), opt.classList);
    // test uiAnimateSlideXxx handling-behavior
    local.uiAnimateSlideDown();
    local.uiAnimateSlideUp();
    opt.classList.add("uiAnimateSlide");
    local.uiAnimateSlideDown(opt);
    local.assertThrow(
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
    onError(null, opt);
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
    onError(null, opt);
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
        onError(null, opt);
    }, onError);
};

local.testCase_uuid4Create_default = function (opt, onError) {
/*
 * this function will test uuid4Create's default handling-behavior
 */
    local.assertThrow(
        local.regexpValidateUuid.test(local.uuid4Create()),
        local.uuid4Create()
    );
    onError(null, opt);
};

//!! local.testCase_webpage_err = function (opt, onError) {
//!! /*
 //!! * this function will test webpage's err handling-behavior
 //!! */
    //!! if (local.isBrowser) {
        //!! onError(null, opt);
        //!! return;
    //!! }
    //!! local.browserTest({
        //!! modeSilent: true,
        //!! timeoutDefault: local.timeoutDefault - 5000,
        //!! // https://localhost:8080/assets.script_only.html?modeTest=1&modeTestCase=_testCase_testRunDefault_failure&timeExit=
        //!! url: (
            //!! local.serverLocalHost
            //!! // test script_only handling-behavior
            //!! + "/assets.script_only.html"
            //!! // test electron-callback handling-behavior
            //!! + "?modeTest=1&"
            //!! // test specific testCase handling-behavior
            //!! // test testRunDefault's failure handling-behavior
            //!! + "modeTestCase=_testCase_testRunDefault_failure&"
            //!! // test timeExit handling-behavior
            //!! + "timeExit={{timeExit}}"
        //!! )
    //!! }, function (err) {
        //!! // validate err occurred
        //!! local.assertThrow(err, err);
        //!! onError(null, opt);
    //!! });
//!! };

local.utility2.serverLocalUrlTest = function (url) {
/*
 * this function will test if the url is local
 */
    url = local.urlParse(url).pathname;
    return local.isBrowser && !local.env.npm_config_mode_backend && (
        /^\/test\./
    ).test(url);
};
}());



// run shared js-env code - init-after
(function () {
// init assets
local.assetsDict["/assets.swgg.swagger.json"] = (
    local.fsReadFileOrEmptyStringSync("assets.swgg.swagger.json")
    || local.assetsDict["/assets.swgg.swagger.json"]
    || local.assetsDict["/assets.swgg.swagger.petstore.json"]
);
// hack-istanbul - re-run test-server
local.testRunServer(local);
// hack-istanbul - stateInit
local.stateInit({});
// init test-middleware
local.middlewareList.push(function (req, res, next) {
/*
 * this function will run the test-middleware
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
        next(local.errDefault);
        // test multiple-callback-error handling-behavior
        next(local.errDefault);
        // test onErrorDefault handling-behavior
        local.testMock([
            [
                local, {
                    swgg: null
                }
            ]
        ], function (onError) {
            var err;
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
                local.vm.runInThisContext(local.cronScript);
            }
        });
        setInterval(function () {
            var cronTime;
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
                        local.vm.runInThisContext(local.cronScript);
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
    + "<script>window.utility2_onReadyBefore.counter += 1;</script>\n"
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
    process.argv[1] = local.path.resolve(process.cwd(), process.argv[1]);
    local.Module.runMain();
}
}());
}());
