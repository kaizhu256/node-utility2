#!/usr/bin/env node
/*
 * lib.github_crud.js (2019.1.21)
 * https://github.com/kaizhu256/node-github-crud
 * this zero-dependency package will provide a simple cli-tool to PUT / GET / DELETE github files
 *
 */



/* istanbul instrument in package github_crud */
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
    globalThis.utility2_github_crud = local;
} else {
    module.exports = local;
    module.exports.__dirname = __dirname;
}
// init lib main
local.github_crud = local;



/* validateLineSortedReset */
local.ajax = function (opt, onError) {
/*
 * this function will send an ajax-req
 * with given <opt>.url and callback <onError>
 * with err and timeout handling
 * example usage:
    local.ajax({
        data: "hello world",
        header: {"x-header-hello": "world"},
        method: "POST",
        url: "/index.html"
    }, function (err, xhr) {
        console.log(xhr.statusCode);
        console.log(xhr.responseText);
    });
 */
    var ajaxProgressUpdate;
    var bufferValidateAndCoerce;
    var isDone;
    var local2;
    var onError2;
    var onEvent;
    var stack;
    var streamCleanup;
    var timeout;
    var tmp;
    var xhr;
    var xhrInit;
    // init local2
    local2 = opt.local2 || local.utility2 || {};
    // init function
    ajaxProgressUpdate = local2.ajaxProgressUpdate || local.nop;
    bufferValidateAndCoerce = local2.bufferValidateAndCoerce || function (
        bff,
        mode
    ) {
    /*
     * this function will validate and coerce/convert <bff> -> Buffer
     * (or String if <mode> = "string")
     */
        // coerce ArrayBuffer -> Buffer
        if (Object.prototype.toString.call(bff) === "[object ArrayBuffer]") {
            bff = new Uint8Array(bff);
        }
        // convert Buffer -> utf8
        if (mode === "string" && typeof bff !== "string") {
            bff = String(bff);
        }
        return bff;
    };
    onEvent = function (evt) {
    /*
     * this function will handle events
     */
        if (Object.prototype.toString.call(evt) === "[object Error]") {
            xhr.err = xhr.err || evt;
            xhr.onEvent({
                type: "error"
            });
            return;
        }
        // init statusCode
        xhr.statusCode = (xhr.statusCode || xhr.status) | 0;
        switch (evt.type) {
        case "abort":
        case "error":
        case "load":
            if (isDone) {
                return;
            }
            isDone = true;
            // decrement ajaxProgressCounter
            local2.ajaxProgressCounter = Math.max(
                local2.ajaxProgressCounter - 1,
                0
            );
            ajaxProgressUpdate();
            // handle abort or err event
            switch (!xhr.err && evt.type) {
            case "abort":
            case "error":
                xhr.err = new Error("ajax - event " + evt.type);
                break;
            case "load":
                if (xhr.statusCode >= 400) {
                    xhr.err = new Error(
                        "ajax - statusCode " + xhr.statusCode
                    );
                }
                break;
            }
            // debug statusCode / method / url
            if (xhr.err) {
                xhr.statusCode = xhr.statusCode || 500;
                xhr.err.statusCode = xhr.statusCode;
                tmp = (
                    // ternary-operator
                    (
                        local.isBrowser
                        ? "browser"
                        : "node"
                    )
                    + " - " + xhr.statusCode + " " + xhr.method + " " + xhr.url
                    + "\n"
                );
                xhr.err.message = tmp + xhr.err.message;
                xhr.err.stack = tmp + xhr.err.stack;
            }
            // update resHeaders
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
            if (xhr.getAllResponseHeaders) {
                xhr.getAllResponseHeaders().replace((
                    /(.*?):\u0020*(.*?)\r\n/g
                ), function (ignore, match1, match2) {
                    xhr.resHeaders[match1.toLowerCase()] = match2;
                });
            }
            // debug ajaxResponse
            xhr.resContentLength = (
                xhr.response
                && (xhr.response.byteLength || xhr.response.length)
            ) | 0;
            xhr.timeElapsed = Date.now() - xhr.timeStart;
            if (xhr.modeDebug) {
                console.error("serverLog - " + JSON.stringify({
                    time: new Date(xhr.timeStart).toISOString(),
                    type: "ajaxResponse",
                    method: xhr.method,
                    url: xhr.url,
                    statusCode: xhr.statusCode,
                    timeElapsed: xhr.timeElapsed,
                    // extra
                    resContentLength: xhr.resContentLength
                }));
            }
            // init responseType
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
            switch (xhr.response && xhr.responseType) {
            // init responseText
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseText
            case "":
            case "text":
                if (typeof xhr.responseText === "string") {
                    break;
                }
                xhr.responseText = bufferValidateAndCoerce(
                    xhr.response,
                    "string"
                );
                break;
            case "arraybuffer":
                xhr.responseBuffer = bufferValidateAndCoerce(xhr.response);
                break;
            }
            // cleanup timerTimeout
            clearTimeout(xhr.timerTimeout);
            // cleanup reqStream and resStream
            streamCleanup(xhr.reqStream);
            streamCleanup(xhr.resStream);
            onError2(xhr.err, xhr);
            break;
        }
    };
    // init onError2
    stack = new Error().stack;
    onError2 = function (err, xhr) {
        if (err && typeof err.stack === "string") {
            err.stack += "\n" + stack;
        }
        onError(err, xhr);
    };
    streamCleanup = function (stream) {
    /*
     * this function will try to end or destroy <stream>
     */
        var err;
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
    xhrInit = function () {
    /*
     * this function will init xhr
     */
        // init opt
        Object.keys(opt).forEach(function (key) {
            if (key[0] !== "_") {
                xhr[key] = opt[key];
            }
        });
        // init timeout
        timeout = xhr.timeout || local2.timeoutDefault || 30000;
        // init default
        local.objectAssignDefault(xhr, {
            corsForwardProxyHost: local2.corsForwardProxyHost,
            headers: {},
            location: (local.isBrowser && location) || {},
            method: "GET",
            responseType: ""
        });
        // init headers
        Object.keys(xhr.headers).forEach(function (key) {
            xhr.headers[key.toLowerCase()] = xhr.headers[key];
        });
        // coerce Uint8Array -> Buffer
        if (
            !local.isBrowser
            && !Buffer.isBuffer(xhr.data)
            && Object.prototype.toString.call(xhr.data)
            === "[object Uint8Array]"
        ) {
            Object.setPrototypeOf(xhr.data, Buffer.prototype);
        }
        // init misc
        local2._debugXhr = xhr;
        xhr.onEvent = onEvent;
        xhr.resHeaders = {};
        xhr.timeStart = xhr.timeStart || Date.now();
    };
    // init xhr - XMLHttpRequest
    xhr = (
        local.isBrowser
        && !opt.httpReq
        && !(local2.serverLocalUrlTest && local2.serverLocalUrlTest(opt.url))
        && new XMLHttpRequest()
    );
    // init xhr - http.request
    if (!xhr) {
        xhr = local.identity(local2.urlParse || require("url").parse)(opt.url);
        // init xhr
        xhrInit();
        // init xhr - http.request
        xhr = local.identity(
            opt.httpReq
            || (local.isBrowser && local2.http.request)
            || require(xhr.protocol.slice(0, -1)).request
        )(xhr, function (resStream) {
        /*
         * this function will read <resStream>
         */
            var chunkList;
            chunkList = [];
            xhr.resHeaders = resStream.resHeaders || resStream.headers;
            xhr.resStream = resStream;
            xhr.statusCode = resStream.statusCode;
            resStream.dataLength = 0;
            resStream.on("data", function (chunk) {
                chunkList.push(chunk);
            });
            resStream.on("end", function () {
                xhr.response = (
                    local.isBrowser
                    ? chunkList[0]
                    : Buffer.concat(chunkList)
                );
                resStream.dataLength = (
                    xhr.response.byteLength || xhr.response.length
                );
                xhr.onEvent({
                    type: "load"
                });
            });
            resStream.on("error", xhr.onEvent);
        });
        xhr.abort = function () {
        /*
         * this function will abort xhr-req
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort
         */
            xhr.onEvent({
                type: "abort"
            });
        };
        xhr.addEventListener = local.nop;
        xhr.open = local.nop;
        xhr.reqStream = xhr;
        xhr.send = xhr.end;
        xhr.setRequestHeader = local.nop;
        xhr.on("error", onEvent);
    }
    // init xhr
    xhrInit();
    // init timerTimeout
    xhr.timerTimeout = setTimeout(function () {
        xhr.err = xhr.err || new Error(
            "onTimeout - "
            + timeout + " ms - " + "ajax " + xhr.method + " " + xhr.url
        );
        xhr.abort();
        // cleanup reqStream and resStream
        streamCleanup(xhr.reqStream);
        streamCleanup(xhr.resStream);
    }, timeout);
    // increment ajaxProgressCounter
    local2.ajaxProgressCounter = local2.ajaxProgressCounter || 0;
    local2.ajaxProgressCounter += 1;
    // init event-handling
    xhr.addEventListener("abort", xhr.onEvent);
    xhr.addEventListener("error", xhr.onEvent);
    xhr.addEventListener("load", xhr.onEvent);
    xhr.addEventListener("loadstart", ajaxProgressUpdate);
    xhr.addEventListener("progress", ajaxProgressUpdate);
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload
    if (xhr.upload && xhr.upload.addEventListener) {
        xhr.upload.addEventListener("progress", ajaxProgressUpdate);
    }
    // open url - corsForwardProxyHost
    if (local.functionOrNop(local2.corsForwardProxyHostIfNeeded)(xhr)) {
        xhr.open(xhr.method, local2.corsForwardProxyHostIfNeeded(xhr));
        xhr.setRequestHeader(
            "forward-proxy-headers",
            JSON.stringify(xhr.headers)
        );
        xhr.setRequestHeader("forward-proxy-url", xhr.url);
    // open url - default
    } else {
        xhr.open(xhr.method, xhr.url);
    }
    // send headers
    Object.keys(xhr.headers).forEach(function (key) {
        xhr.setRequestHeader(key, xhr.headers[key]);
    });
    // send data
    switch ((xhr.data && xhr.data.constructor) || true) {
    // Blob
    // https://developer.mozilla.org/en-US/docs/Web/API/Blob
    case local2.Blob:
    // FormData
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    case local2.FormData:
        local2.blobRead(xhr.data, function (err, data) {
            if (err) {
                xhr.onEvent(err);
                return;
            }
            // send data
            xhr.send(data);
        });
        break;
    default:
        xhr.send(xhr.data);
    }
    return xhr;
};

local.cliRun = function (opt) {
/*
 * this function will run the cli with given <opt>
 */
    local.cliDict._eval = local.cliDict._eval || function () {
    /*
     * <code>
     * will eval <code>
     */
        globalThis.local = local;
        local.vm.runInThisContext(process.argv[3]);
    };
    local.cliDict["--eval"] = local.cliDict["--eval"] || local.cliDict._eval;
    local.cliDict["-e"] = local.cliDict["-e"] || local.cliDict._eval;
    local.cliDict._help = local.cliDict._help || function () {
    /*
     *
     * will print help
     */
        var commandList;
        var file;
        var packageJson;
        var text;
        var textDict;
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
        opt = Object.assign({}, opt);
        packageJson = require("./package.json");
        // validate comment
        opt.rgxComment = opt.rgxComment || (
            /\)\u0020\{\n(?:|\u0020{4})\/\*\n(?:\u0020|\u0020{5})\*((?:\u0020<[^>]*?>|\u0020\.\.\.)*?)\n(?:\u0020|\u0020{5})\*\u0020(will\u0020.*?\S)\n(?:\u0020|\u0020{5})\*\/\n(?:\u0020{4}|\u0020{8})\S/
        );
        textDict = {};
        Object.keys(local.cliDict).sort().forEach(function (key, ii) {
            if (key[0] === "_" && key !== "_default") {
                return;
            }
            text = String(local.cliDict[key]);
            if (key === "_default") {
                key = "";
            }
            textDict[text] = textDict[text] || (ii + 2);
            ii = textDict[text];
            if (commandList[ii]) {
                commandList[ii].command.push(key);
                return;
            }
            try {
                commandList[ii] = opt.rgxComment.exec(text);
                commandList[ii] = {
                    argList: (commandList[ii][1] || "").trim(),
                    command: [
                        key
                    ],
                    description: commandList[ii][2]
                };
            } catch (ignore) {
                local.assertThrow(null, new Error(
                    "cliRun - cannot parse comment in COMMAND "
                    + key
                    + ":\nnew RegExp("
                    + JSON.stringify(opt.rgxComment.source)
                    + ").exec(" + JSON.stringify(text).replace((
                        /\\\\/g
                    ), "\u0000").replace((
                        /\\n/g
                    ), "\\n\\\n").replace((
                        /\u0000/g
                    ), "\\\\") + ");"
                ));
            }
        });
        text = "";
        text += packageJson.name + " (" + packageJson.version + ")\n\n";
        text += commandList.filter(function (elem) {
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
                + ("  " + elem.command.sort().join("|") + "  ")
                .replace((
                    /^\u0020{4}$/
                ), "  ")
                + elem.argList.join("  ")
            );
        })
        .join("\n\n");
        console.log(text);
    };
    local.cliDict["--help"] = local.cliDict["--help"] || local.cliDict._help;
    local.cliDict["-h"] = local.cliDict["-h"] || local.cliDict._help;
    local.cliDict._default = local.cliDict._default || local.cliDict._help;
    local.cliDict.help = local.cliDict.help || local.cliDict._help;
    local.cliDict._interactive = local.cliDict._interactive || function () {
    /*
     *
     * will start interactive-mode
     */
        globalThis.local = local;
        local.identity(local.replStart || require("repl").start)({
            useGlobal: true
        });
    };
    local.cliDict["--interactive"] = (
        local.cliDict["--interactive"]
        || local.cliDict._interactive
    );
    local.cliDict["-i"] = local.cliDict["-i"] || local.cliDict._interactive;
    local.cliDict._version = local.cliDict._version || function () {
    /*
     *
     * will print version
     */
        console.log(require(__dirname + "/package.json").version);
    };
    local.cliDict["--version"] = (
        local.cliDict["--version"]
        || local.cliDict._version
    );
    local.cliDict["-v"] = local.cliDict["-v"] || local.cliDict._version;
    // default to --help command if no arguments are given
    if (process.argv.length <= 2) {
        local.cliDict._help();
        return;
    }
    if (local.cliDict[process.argv[2]]) {
        local.cliDict[process.argv[2]]();
        return;
    }
    local.cliDict._default();
};

local.gotoNext = function (opt, onError) {
/*
 * this function will wrap onError inside recursive-function <opt>.gotoNext,
 * and append the current-stack to any err
 */
    opt.gotoNext = local.onErrorWithStack(function (err, data, meta) {
        try {
            opt.gotoState += (
                (err && !opt.modeErrorIgnore)
                ? 1000
                : 1
            );
            if (opt.modeDebug) {
                console.error("gotoNext - " + JSON.stringify({
                    gotoState: opt.gotoState,
                    errorMessage: err && err.message
                }));
                if (err && err.stack) {
                    console.error(err.stack);
                }
            }
            onError(err, data, meta);
        } catch (errCaught) {
            // throw errCaught to break infinite recursion-loop
            if (opt.errCaught) {
                local.assertThrow(null, opt.errCaught);
            }
            opt.errCaught = errCaught;
            opt.gotoNext(errCaught, data, meta);
        }
    });
    return opt;
};

local.onErrorDefault = function (err) {
/*
 * this function will if <err> exists, then print it to stderr
 */
    if (err) {
        console.error(err);
    }
    return err;
};

local.onErrorWithStack = function (onError) {
/*
 * this function will create wrapper around <onError>
 * that will append current-stack to err.stack
 */
    var onError2;
    var stack;
    stack = new Error().stack.replace((
        /(.*?)\n.*?$/m
    ), "$1");
    onError2 = function (err, data, meta) {
        // append current-stack to err.stack
        if (
            err
            && typeof err.stack === "string"
            && err !== local.errDefault
            && String(err.stack).indexOf(stack.split("\n")[2]) < 0
        ) {
            err.stack += "\n" + stack;
        }
        onError(err, data, meta);
    };
    // debug onError
    onError2.toString = function () {
        return String(onError);
    };
    return onError2;
};

local.onParallel = function (onError, onEach, onRetry) {
/*
 * this function will create a function that will
 * 1. run async tasks in parallel
 * 2. if counter === 0 or err occurred, then call onError(err)
 */
    var onParallel;
    onError = local.onErrorWithStack(onError);
    onEach = onEach || local.nop;
    onRetry = onRetry || local.nop;
    onParallel = function (err, data) {
        if (onRetry(err, data)) {
            return;
        }
        // decrement counter
        onParallel.counter -= 1;
        // validate counter
        if (!(onParallel.counter >= 0 || err || onParallel.err)) {
            err = new Error(
                "invalid onParallel.counter = " + onParallel.counter
            );
        // ensure onError is run only once
        } else if (onParallel.counter < 0) {
            return;
        }
        // handle err
        if (err) {
            onParallel.err = err;
            // ensure counter <= 0
            onParallel.counter = -Math.abs(onParallel.counter);
        }
        // call onError when isDone
        if (onParallel.counter <= 0) {
            onError(err, data);
            return;
        }
        onEach();
    };
    // init counter
    onParallel.counter = 0;
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
    var isListEnd;
    var onEach2;
    var onParallel;
    opt.list = opt.list || [];
    onEach2 = function () {
        while (true) {
            if (!(onParallel.ii + 1 < opt.list.length)) {
                isListEnd = true;
                return;
            }
            if (!(onParallel.counter < opt.rateLimit + 1)) {
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
            local.onErrorDefault(err);
            data.retry += 1;
            setTimeout(function () {
                onParallel.counter -= 1;
                onEach(data, onParallel);
            }, 1000);
            return true;
        }
        // restart if opt.list has grown
        if (isListEnd && (onParallel.ii + 1 < opt.list.length)) {
            isListEnd = null;
            onEach2();
        }
    });
    onParallel.ii = -1;
    opt.rateLimit = Number(opt.rateLimit) || 6;
    opt.rateLimit = Math.max(opt.rateLimit, 1);
    opt.retryLimit = Number(opt.retryLimit) || 2;
    onParallel.counter += 1;
    onEach2();
    onParallel();
};
}());



// run shared js-env code - function
(function () {
local.githubCrudAjax = function (opt, onError) {
/*
 * this function will make a low-level content-req to github
 * https://developer.github.com/v3/repos/contents/
 */
    // init opt
    opt = {
        content: opt.content,
        headers: Object.assign({
            // github oauth authentication
            Authorization: "token " + (
                typeof process === "object"
                && process && process.env.GITHUB_TOKEN
            ),
            // bug-workaround
            // https://developer.github.com/v3/#user-agent-required
            "User-Agent": "undefined"
        }, opt.headers),
        httpReq: opt.httpReq,
        message: opt.message,
        method: opt.method || "GET",
        responseJson: {},
        sha: opt.sha,
        url: opt.url
    };
    opt.url = opt.url
/* jslint ignore:start */
// parse https://github.com/:owner/:repo/blob/:branch/:path
.replace(
    (/^https:\/\/github.com\/([^\/]+?\/[^\/]+?)\/blob\/([^\/]+?)\/(.+)/),
    'https://api.github.com/repos/$1/contents/$3?branch=$2'
)
// parse https://github.com/:owner/:repo/tree/:branch/:path
.replace(
    (/^https:\/\/github.com\/([^\/]+?\/[^\/]+?)\/tree\/([^\/]+?)\/(.+)/),
    'https://api.github.com/repos/$1/contents/$3?branch=$2'
)
// parse https://raw.githubusercontent.com/:owner/:repo/:branch/:path
.replace(
(/^https:\/\/raw.githubusercontent.com\/([^\/]+?\/[^\/]+?)\/([^\/]+?)\/(.+)/),
    'https://api.github.com/repos/$1/contents/$3?branch=$2'
)
// parse https://:owner.github.io/:repo/:path
.replace(
    (/^https:\/\/([^\.]+?)\.github\.io\/([^\/]+?)\/(.+)/),
    'https://api.github.com/repos/$1/$2/contents/$3?branch=gh-pages'
)
// parse :owner/:repo
.replace(
    (/^([^\/]+?\/[^\/]+?)$/),
    'https://github.com/$1'
)
/* jslint ignore:end */
    .replace((
        /\?branch=(.*)/
    ), function (match0, match1) {
        opt.branch = match1;
        if (opt.method === "GET") {
            match0 = match0.replace("branch", "ref");
        }
        return match0;
    });
    if ((
        /^https:\/\/github\.com\/[^\/]+?\/[^\/]+?$/
    ).test(opt.url)) {
        opt.data = JSON.stringify({
            name: opt.url.split("/")[4]
        });
        switch (opt.method) {
        case "DELETE":
            opt.url = (
                "https://api.github.com/repos/"
                + opt.url.split("/").slice(3).join("/")
            );
            break;
        case "POST_ORG":
            opt.url = (
                "https://api.github.com/orgs/"
                + opt.url.split("/")[3] + "/repos"
            );
            break;
        case "POST_USER":
            opt.url = "https://api.github.com/user/repos";
            break;
        }
        opt.method = opt.method.split("_")[0];
    } else {
        if (opt.url.indexOf("https://api.github.com/repos/") !== 0) {
            console.error("githubCrud - invalid url " + opt.url);
            onError(new Error("invalid url " + opt.url));
            return;
        }
        if (opt.method !== "GET") {
            opt.message = (
                opt.message
                || "[ci skip] " + opt.method + " file "
                + opt.url.replace((
                    /\?.*/
                ), "")
            );
            opt.url += "&message=" + encodeURIComponent(opt.message);
            if (opt.sha) {
                opt.url += "&sha=" + opt.sha;
            }
            opt.data = JSON.stringify({
                branch: opt.branch,
                content: Buffer.from(opt.content || "").toString("base64"),
                message: opt.message,
                sha: opt.sha
            });
        }
    }
    local.ajax(opt, function (err, xhr) {
        console.error("serverLog - " + JSON.stringify({
            time: new Date(xhr.timeStart).toISOString(),
            type: "githubCrudResponse",
            method: xhr.method,
            url: xhr.url,
            statusCode: xhr.statusCode,
            timeElapsed: xhr.timeElapsed
        }));
        local.onErrorDefault(
            err
            && err.statusCode !== 404
            && xhr
            && ("githubCrud - " + xhr.responseText)
        );
        try {
            opt.responseJson = JSON.parse(xhr.responseText);
        } catch (ignore) {}
        onError(
            !(opt.method === "DELETE" && xhr.statusCode === 404) && err,
            opt.responseJson
        );
    });
};

local.githubCrudContentDelete = function (opt, onError) {
/*
 * this function will delete github-file <opt>.url
 * https://developer.github.com/v3/repos/contents/#delete-a-file
 */
    opt = {
        httpReq: opt.httpReq,
        message: opt.message,
        url: opt.url
    };
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // get sha
            local.githubCrudAjax({
                httpReq: opt.httpReq,
                url: opt.url
            }, opt.gotoNext);
            break;
        case 2:
            // delete file with sha
            if (!err && data.sha) {
                local.githubCrudAjax({
                    httpReq: opt.httpReq,
                    message: opt.message,
                    method: "DELETE",
                    sha: data.sha,
                    url: opt.url
                }, opt.gotoNext);
                return;
            }
            // delete tree
            local.onParallelList({
                list: data
            }, function (option2, onParallel) {
                onParallel.counter += 1;
                // recurse
                local.githubCrudContentDelete({
                    httpReq: opt.httpReq,
                    message: opt.message,
                    url: option2.elem.url
                }, onParallel);
            }, opt.gotoNext);
            break;
        default:
            onError(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.githubCrudContentGet = function (opt, onError) {
/*
 * this function will get github-file <opt>.url
 * https://developer.github.com/v3/repos/contents/#get-contents
 */
    opt = {
        httpReq: opt.httpReq,
        url: opt.url
    };
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            local.githubCrudAjax({
                httpReq: opt.httpReq,
                url: opt.url
            }, opt.gotoNext);
            break;
        case 2:
            opt.gotoNext(null, Buffer.from(data.content || "", "base64"));
            break;
        default:
            onError(err, !err && data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.githubCrudContentPut = function (opt, onError) {
/*
 * this function will put <opt>.content to github-file <opt>.url
 * https://developer.github.com/v3/repos/contents/#create-a-file
 * https://developer.github.com/v3/repos/contents/#update-a-file
 */
    opt = {
        content: opt.content,
        httpReq: opt.httpReq,
        message: opt.message,
        modeErrorIgnore: true,
        url: opt.url
    };
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // get sha
            local.githubCrudAjax({
                httpReq: opt.httpReq,
                url: opt.url
            }, opt.gotoNext);
            break;
        case 2:
            // put file with sha
            local.githubCrudAjax({
                content: opt.content,
                httpReq: opt.httpReq,
                message: opt.message,
                method: "PUT",
                sha: data.sha,
                url: opt.url
            }, opt.gotoNext);
            break;
        default:
            onError(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.githubCrudContentPutFile = function (opt, onError) {
/*
 * this function will put opt.file to github-file <opt>.url
 * https://developer.github.com/v3/repos/contents/#update-a-file
 */
    opt = {
        file: opt.file,
        httpReq: opt.httpReq,
        message: opt.message,
        url: opt.url
    };
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // get file from url
            if ((
                /^(?:http|https):\/\//
            ).test(opt.file)) {
                local.ajax({
                    httpReq: opt.httpReq,
                    url: opt.file
                }, function (err, res) {
                    opt.gotoNext(err, res && res.data);
                });
                return;
            }
            // get file
            local.fs.readFile(opt.file, opt.gotoNext);
            break;
        case 2:
            local.githubCrudContentPut({
                content: data,
                httpReq: opt.httpReq,
                message: opt.message,
                // resolve file in url
                url: (
                    // ternary-operator
                    (
                        /\/$/
                    ).test(opt.url)
                    ? opt.url + local.path.basename(opt.file)
                    : opt.url
                )
            }, opt.gotoNext);
            break;
        default:
            onError(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.githubCrudContentTouch = function (opt, onError) {
/*
 * this function will touch github-file <opt>.url
 * https://developer.github.com/v3/repos/contents/#update-a-file
 */
    opt = {
        httpReq: opt.httpReq,
        message: opt.message,
        modeErrorIgnore: true,
        url: opt.url
    };
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // get sha
            local.githubCrudAjax({
                httpReq: opt.httpReq,
                url: opt.url
            }, opt.gotoNext);
            break;
        case 2:
            // put file with sha
            local.githubCrudAjax({
                content: Buffer.from(data.content || "", "base64"),
                httpReq: opt.httpReq,
                message: opt.message,
                method: "PUT",
                sha: data.sha,
                url: opt.url
            }, opt.gotoNext);
            break;
        default:
            onError(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.githubCrudContentTouchList = function (opt, onError) {
/*
 * this function will touch github-files <opt>.urlList in parallel
 * https://developer.github.com/v3/repos/contents/#update-a-file
 */
    local.onParallelList({
        list: opt.urlList
    }, function (option2, onParallel) {
        onParallel.counter += 1;
        local.githubCrudContentTouch({
            httpReq: opt.httpReq,
            message: opt.message,
            url: option2.elem
        }, onParallel);
    }, onError);
};

local.githubCrudRepoCreate = function (opt, onError) {
/*
 * this function will create github-repo <opt>.url
 * https://developer.github.com/v3/repos/#create
 */
    local.githubCrudAjax({
        httpReq: opt.httpReq,
        method: "POST_ORG",
        url: opt.url
    }, function (err, data) {
        if (!(err && err.statusCode === 404)) {
            onError(err, data);
            return;
        }
        local.githubCrudAjax({
            httpReq: opt.httpReq,
            method: "POST_USER",
            url: opt.url
        }, onError);
    });
};

local.githubCrudRepoCreateList = function (opt, onError) {
/*
 * this function will create github-repos <opt>.urlList in parallel
 * https://developer.github.com/v3/repos/#create
 */
    local.onParallelList({
        list: opt.urlList
    }, function (option2, onParallel) {
        onParallel.counter += 1;
        local.githubCrudRepoCreate({
            httpReq: opt.httpReq,
            url: option2.elem
        }, onParallel);
    }, onError);
};

local.githubCrudRepoDelete = function (opt, onError) {
/*
 * this function will delete github-repo <opt>.url
 * https://developer.github.com/v3/repos/#delete-a-repository
 */
    local.githubCrudAjax({
        httpReq: opt.httpReq,
        method: "DELETE",
        url: opt.url
    }, onError);
};

local.githubCrudRepoDeleteList = function (opt, onError) {
/*
 * this function will delete github-repos <opt>.urlList in parallel
 * https://developer.github.com/v3/repos/#delete-a-repository
 */
    local.onParallelList({
        list: opt.urlList
    }, function (option2, onParallel) {
        onParallel.counter += 1;
        local.githubCrudRepoDelete({
            httpReq: opt.httpReq,
            url: option2.elem
        }, onParallel);
    }, onError);
};
}());



// run node js-env code - init-after
/* istanbul ignore next */
(function () {
if (local.isBrowser) {
    return;
}



local.cliDict = {};
local.cliDict.delete = function () {
/*
 * <fileRemote|dirRemote> <commitMessage>
 * will delete from github <fileRemote|dirRemote>
 */
    local.github_crud.githubCrudContentDelete({
        message: process.argv[4],
        url: process.argv[3]
    }, function (err) {
        process.exit(Boolean(err));
    });
};

local.cliDict.get = function () {
/*
 * <fileRemote>
 * will get from github <fileRemote>
 */
    local.github_crud.githubCrudContentGet({
        url: process.argv[3]
    }, function (err, data) {
        try {
            process.stdout.write(data);
        } catch (ignore) {}
        process.exit(Boolean(err));
    });
};

local.cliDict.put = function () {
/*
 * <fileRemote> <fileLocal> <commitMessage>
 * will put on github <fileRemote> to <fileLocal>
 */
    local.github_crud.githubCrudContentPutFile({
        message: process.argv[5],
        url: process.argv[3],
        file: process.argv[4]
    }, function (err) {
        process.exit(Boolean(err));
    });
};

local.cliDict.repo_create = function () {
/*
 * <repoList>
 * will create on github in parallel, comma-separated <repoList>
 */
    local.github_crud.githubCrudRepoCreateList({
        urlList: process.argv[3].split(
            /[,\s]/g
        ).filter(local.identity)
    }, function (err) {
        process.exit(Boolean(err));
    });
};

local.cliDict.repo_delete = function () {
/*
 * <repoList>
 * will delete from github in parallel, comma-separated <repoList>
 */
    local.github_crud.githubCrudRepoDeleteList({
        urlList: process.argv[3].split(
            /[,\s]/g
        ).filter(local.identity)
    }, function (err) {
        process.exit(Boolean(err));
    });
};

local.cliDict.touch = function () {
/*
 * <fileRemoteList> <commitMessage>
 * will touch on github in parallel, comma-separated <fileRemoteList>
 */
    local.github_crud.githubCrudContentTouchList({
        message: process.argv[4],
        urlList: process.argv[3].split(
            /[,\s]/g
        ).filter(local.identity)
    }, function (err) {
        process.exit(Boolean(err));
    });
};

// run the cli
if (module === require.main && !globalThis.utility2_rollup) {
    local.cliRun();
}
}());
}());
