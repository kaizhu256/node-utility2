#!/usr/bin/env node
/*
 * lib.github_crud.js (2018.8.8)
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
        && typeof window.document.querySelectorAll === "function"
    );
    // init function
    local.assertThrow = function (passed, message) {
    /*
     * this function will throw the error <message> if <passed> is falsy
     */
        var error;
        if (passed) {
            return;
        }
        error = (
            // ternary-condition
            (
                message
                && typeof message.message === "string"
                && typeof message.stack === "string"
            )
            // if message is an error-object, then leave it as is
            ? message
            : new Error(
                typeof message === "string"
                // if message is a string, then leave it as is
                ? message
                // else JSON.stringify message
                : JSON.stringify(message, null, 4)
            )
        );
        throw error;
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
local.ajax = function (options, onError) {
/*
 * this function will send an ajax-request with the given options.url,
 * with error-handling and timeout
 * example usage:
    local.ajax({
        data: "hello world",
        header: {"x-header-hello": "world"},
        method: "POST",
        url: "/index.html"
    }, function (error, xhr) {
        console.log(xhr.statusCode);
        console.log(xhr.responseText);
    });
 */
    var ajaxProgressUpdate;
    var bufferValidateAndCoerce;
    var isDone;
    var local2;
    var onEvent;
    var streamCleanup;
    var tmp;
    var xhr;
    var xhrInit;
    // init local2
    local2 = local.utility2 || {};
    // init function
    ajaxProgressUpdate = local2.ajaxProgressUpdate || local.nop;
    bufferValidateAndCoerce = local2.bufferValidateAndCoerce || function (bff, mode) {
    /*
     * this function will validate and coerce/convert
     * ArrayBuffer, String, or Uint8Array -> Buffer or String
     */
        // coerce ArrayBuffer -> Buffer
        if (Object.prototype.toString.call(bff) === "[object ArrayBuffer]") {
            bff = new Uint8Array(bff);
        }
        // convert Buffer -> String
        if (mode === "string" && typeof bff !== "string") {
            bff = String(bff);
        }
        return bff;
    };
    onEvent = function (event) {
    /*
     * this function will handle events
     */
        if (Object.prototype.toString.call(event) === "[object Error]") {
            xhr.error = xhr.error || event;
            xhr.onEvent({
                type: "error"
            });
            return;
        }
        // init statusCode
        xhr.statusCode = (xhr.statusCode || xhr.status) | 0;
        switch (event.type) {
        case "abort":
        case "error":
        case "load":
            if (isDone) {
                return;
            }
            isDone = true;
            // decrement ajaxProgressCounter
            local2.ajaxProgressCounter = Math.max(local2.ajaxProgressCounter - 1, 0);
            ajaxProgressUpdate();
            // handle abort or error event
            switch (!xhr.error && event.type) {
            case "abort":
            case "error":
                xhr.error = new Error("ajax - event " + event.type);
                break;
            case "load":
                if (xhr.statusCode >= 400) {
                    xhr.error = new Error("ajax - statusCode " + xhr.statusCode);
                }
                break;
            }
            // debug statusCode / method / url
            if (xhr.error) {
                xhr.error.statusCode = xhr.statusCode;
                tmp = (
                    // ternary-condition
                    (
                        local.isBrowser
                        ? "browser"
                        : "node"
                    )
                    + " - " + xhr.statusCode + " " + xhr.method + " " + xhr.url
                    + "\n"
                );
                xhr.error.message = tmp + xhr.error.message;
                xhr.error.stack = tmp + xhr.error.stack;
            }
            // update responseHeaders
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
            if (xhr.getAllResponseHeaders) {
                xhr.getAllResponseHeaders().replace((
                    /(.*?):\u0020*(.*?)\r\n/g
                ), function (ignore, match1, match2) {
                    xhr.responseHeaders[match1.toLowerCase()] = match2;
                });
            }
            // debug ajaxResponse
            xhr.responseContentLength = (
                (xhr.response && (xhr.response.byteLength || xhr.response.length)) | 0
            );
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
                    responseContentLength: xhr.responseContentLength
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
                xhr.responseText = bufferValidateAndCoerce(xhr.response, "string");
                break;
            case "arraybuffer":
                xhr.responseBuffer = bufferValidateAndCoerce(xhr.response);
                break;
            }
            // cleanup timerTimeout
            clearTimeout(xhr.timerTimeout);
            // cleanup requestStream and responseStream
            streamCleanup(xhr.requestStream);
            streamCleanup(xhr.responseStream);
            onError(xhr.error, xhr);
            break;
        }
    };
    streamCleanup = function (stream) {
    /*
     * this function will try to end or destroy the stream
     */
        var error;
        // try to end the stream
        try {
            stream.end();
        } catch (errorCaught) {
            error = errorCaught;
        }
        // if error, then try to destroy the stream
        if (error) {
            try {
                stream.destroy();
            } catch (ignore) {}
        }
    };
    xhrInit = function () {
    /*
     * this function will init xhr
     */
        // init options
        Object.keys(options).forEach(function (key) {
            if (key[0] !== "_") {
                xhr[key] = options[key];
            }
        });
        Object.assign(xhr, {
            corsForwardProxyHost: xhr.corsForwardProxyHost || local2.corsForwardProxyHost,
            headers: xhr.headers || {},
            location: xhr.location || (local.isBrowser && location) || {},
            method: xhr.method || "GET",
            responseType: xhr.responseType || "",
            timeout: xhr.timeout || local2.timeoutDefault || 30000
        });
        Object.keys(xhr.headers).forEach(function (key) {
            xhr.headers[key.toLowerCase()] = xhr.headers[key];
        });
        // init misc
        local2._debugXhr = xhr;
        xhr.onEvent = onEvent;
        xhr.responseHeaders = {};
        xhr.timeStart = xhr.timeStart || Date.now();
    };
    // init onError
    if (local2.onErrorWithStack) {
        onError = local2.onErrorWithStack(onError);
    }
    // init xhr - XMLHttpRequest
    xhr = (
        local.isBrowser
        && !options.httpRequest
        && !(local2.serverLocalUrlTest && local2.serverLocalUrlTest(options.url))
        && new XMLHttpRequest()
    );
    // init xhr - http.request
    if (!xhr) {
        xhr = local.functionOrNop(local2.urlParse || require("url").parse)(options.url);
        // init xhr
        xhrInit();
        // init xhr - http.request
        xhr = local.functionOrNop(
            options.httpRequest
            || (local.isBrowser && local2.http.request)
            || require(xhr.protocol.slice(0, -1)).request
        )(xhr, function (responseStream) {
        /*
         * this function will read the responseStream
         */
            var chunkList;
            chunkList = [];
            xhr.responseHeaders = responseStream.responseHeaders || responseStream.headers;
            xhr.responseStream = responseStream;
            xhr.statusCode = responseStream.statusCode;
            responseStream.dataLength = 0;
            responseStream.on("data", function (chunk) {
                chunkList.push(chunk);
            });
            responseStream.on("end", function () {
                xhr.response = (
                    local.isBrowser
                    ? chunkList[0]
                    : Buffer.concat(chunkList)
                );
                responseStream.dataLength = xhr.response.byteLength || xhr.response.length;
                xhr.onEvent({
                    type: "load"
                });
            });
            responseStream.on("error", xhr.onEvent);
        });
        xhr.abort = function () {
        /*
         * this function will abort the xhr-request
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort
         */
            xhr.onEvent({
                type: "abort"
            });
        };
        xhr.addEventListener = local.nop;
        xhr.open = local.nop;
        xhr.requestStream = xhr;
        xhr.send = xhr.end;
        xhr.setRequestHeader = local.nop;
        xhr.on("error", onEvent);
    }
    // init xhr
    xhrInit();
    // init timerTimeout
    xhr.timerTimeout = setTimeout(function () {
        xhr.error = xhr.error || new Error(
            "onTimeout - timeout-error - "
            + xhr.timeout + " ms - " + "ajax " + xhr.method + " " + xhr.url
        );
        xhr.abort();
        // cleanup requestStream and responseStream
        streamCleanup(xhr.requestStream);
        streamCleanup(xhr.responseStream);
    }, xhr.timeout);
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
    if (local2.corsForwardProxyHostIfNeeded && local2.corsForwardProxyHostIfNeeded(xhr)) {
        xhr.open(xhr.method, local2.corsForwardProxyHostIfNeeded(xhr));
        xhr.setRequestHeader("forward-proxy-headers", JSON.stringify(xhr.headers));
        xhr.setRequestHeader("forward-proxy-url", xhr.url);
    // open url - default
    } else {
        xhr.open(xhr.method, xhr.url);
    }
    // send headers
    Object.keys(xhr.headers).forEach(function (key) {
        xhr.setRequestHeader(key, xhr.headers[key]);
    });
    // send data - FormData
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    if (local2.FormData && (xhr.data && xhr.data.constructor === local2.FormData)) {
        // handle formData
        xhr.data.read(function (error, data) {
            if (error) {
                xhr.onEvent(error);
                return;
            }
            // send data
            xhr.send(data);
        });
    // send data - default
    } else {
        // send data
        xhr.send(xhr.data);
    }
    return xhr;
};

local.cliRun = function (options) {
/*
 * this function will run the cli
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
        commandList = [{
            argList: "<arg2>  ...",
            description: "usage:",
            command: ["<arg1>"]
        }, {
            argList: "'console.log(\"hello world\")'",
            description: "example:",
            command: ["--eval"]
        }];
        file = __filename.replace((
            /.*\//
        ), "");
        options = Object.assign({}, options);
        packageJson = require("./package.json");
        // validate comment
        options.rgxComment = options.rgxComment || (
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
                commandList[ii] = options.rgxComment.exec(text);
                commandList[ii] = {
                    argList: (commandList[ii][1] || "").trim(),
                    command: [key],
                    description: commandList[ii][2]
                };
            } catch (ignore) {
                local.assertThrow(null, new Error(
                    "cliRun - cannot parse comment in COMMAND "
                    + key + ":\nnew RegExp(" + JSON.stringify(options.rgxComment.source)
                    + ").exec(" + JSON.stringify(text)
                    .replace((
                        /\\\\/g
                    ), "\u0000")
                    .replace((
                        /\\n/g
                    ), "\\n\\\n")
                    .replace((
                        /\u0000/g
                    ), "\\\\") + ");"
                ));
            }
        });
        console.log(packageJson.name + " (" + packageJson.version + ")\n\n" + commandList
        .filter(function (element) {
            return element;
        })
        .map(function (element, ii) {
            element.command = element.command.filter(function (element) {
                return element;
            });
            switch (ii) {
            case 0:
            case 1:
                element.argList = [element.argList];
                break;
            default:
                element.argList = element.argList.split(" ");
                element.description = (
                    "# COMMAND "
                    + (element.command[0] || "<none>") + "\n# "
                    + element.description
                );
            }
            return (
                element.description + "\n  " + file
                + ("  " + element.command.sort().join("|") + "  ")
                    .replace((
                    /^\u0020{4}$/
                ), "  ")
                + element.argList.join("  ")
            );
        })
        .join("\n\n"));
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
        local.functionOrNop(local.replStart || require("repl").start)({
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
    local.cliDict["--version"] = local.cliDict["--version"] || local.cliDict._version;
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

local.onErrorDefault = function (error) {
/*
 * this function will if <error> exists, then print it to stderr
 */
    if (error) {
        console.error(error);
    }
    return error;
};

local.onErrorWithStack = function (onError) {
/*
 * this function will create a new callback that will call onError,
 * and append the current stack to any error
 */
    var onError2;
    var stack;
    stack = new Error().stack.replace((
        /(.*?)\n.*?$/m
    ), "$1");
    onError2 = function (error, data, meta) {
        if (
            error
            && typeof error.stack === "string"
            && error !== local.errorDefault
            && String(error.stack).indexOf(stack.split("\n")[2]) < 0
        ) {
            // append the current stack to error.stack
            error.stack += "\n" + stack;
        }
        onError(error, data, meta);
    };
    // debug onError
    onError2.toString = function () {
        return String(onError);
    };
    return onError2;
};

local.onNext = function (options, onError) {
/*
 * this function will wrap onError inside the recursive function options.onNext,
 * and append the current stack to any error
 */
    options.onNext = local.onErrorWithStack(function (error, data, meta) {
        try {
            options.modeNext += (
                (error && !options.modeErrorIgnore)
                ? 1000
                : 1
            );
            if (options.modeDebug) {
                console.error("onNext - " + JSON.stringify({
                    modeNext: options.modeNext,
                    errorMessage: error && error.message
                }));
                if (error && error.stack) {
                    console.error(error.stack);
                }
            }
            onError(error, data, meta);
        } catch (errorCaught) {
            // throw errorCaught to break infinite recursion-loop
            if (options.errorCaught) {
                local.assertThrow(null, options.errorCaught);
            }
            options.errorCaught = errorCaught;
            options.onNext(errorCaught, data, meta);
        }
    });
    return options;
};

local.onParallel = function (onError, onEach, onRetry) {
/*
 * this function will create a function that will
 * 1. run async tasks in parallel
 * 2. if counter === 0 or error occurred, then call onError with error
 */
    var onParallel;
    onError = local.onErrorWithStack(onError);
    onEach = onEach || local.nop;
    onRetry = onRetry || local.nop;
    onParallel = function (error, data) {
        if (onRetry(error, data)) {
            return;
        }
        // decrement counter
        onParallel.counter -= 1;
        // validate counter
        if (!(onParallel.counter >= 0 || error || onParallel.error)) {
            error = new Error("invalid onParallel.counter = " + onParallel.counter);
        // ensure onError is run only once
        } else if (onParallel.counter < 0) {
            return;
        }
        // handle error
        if (error) {
            onParallel.error = error;
            // ensure counter <= 0
            onParallel.counter = -Math.abs(onParallel.counter);
        }
        // call onError when isDone
        if (onParallel.counter <= 0) {
            onError(error, data);
            return;
        }
        onEach();
    };
    // init counter
    onParallel.counter = 0;
    // return callback
    return onParallel;
};

local.onParallelList = function (options, onEach, onError) {
/*
 * this function will
 * 1. async-run onEach in parallel,
 *    with the given options.rateLimit and options.retryLimit
 * 2. call onError when onParallel.ii + 1 === options.list.length
 */
    var isListEnd;
    var onEach2;
    var onParallel;
    options.list = options.list || [];
    onEach2 = function () {
        while (true) {
            if (!(onParallel.ii + 1 < options.list.length)) {
                isListEnd = true;
                return;
            }
            if (!(onParallel.counter < options.rateLimit + 1)) {
                return;
            }
            onParallel.ii += 1;
            onEach({
                element: options.list[onParallel.ii],
                ii: onParallel.ii,
                list: options.list,
                retry: 0
            }, onParallel);
        }
    };
    onParallel = local.onParallel(onError, onEach2, function (error, data) {
        if (error && data && data.retry < options.retryLimit) {
            local.onErrorDefault(error);
            data.retry += 1;
            setTimeout(function () {
                onParallel.counter -= 1;
                onEach(data, onParallel);
            }, 1000);
            return true;
        }
        // restart if options.list has grown
        if (isListEnd && (onParallel.ii + 1 < options.list.length)) {
            isListEnd = null;
            onEach2();
        }
    });
    onParallel.ii = -1;
    options.rateLimit = Number(options.rateLimit) || 6;
    options.rateLimit = Math.max(options.rateLimit, 1);
    options.retryLimit = Number(options.retryLimit) || 2;
    onParallel.counter += 1;
    onEach2();
    onParallel();
};
}());



// run shared js-env code - function
(function () {
local.githubCrudAjax = function (options, onError) {
/*
 * this function will make a low-level content-request to github
 * https://developer.github.com/v3/repos/contents/
 */
    // init options
    options = {
        content: options.content,
        headers: Object.assign({
            // github oauth authentication
            Authorization: "token " + (
                typeof process === "object" && process && process.env.GITHUB_TOKEN
            ),
            // bug-workaround - https://developer.github.com/v3/#user-agent-required
            "User-Agent": "undefined"
        }, options.headers),
        httpRequest: options.httpRequest,
        message: options.message,
        method: options.method || "GET",
        responseJson: {},
        sha: options.sha,
        url: options.url
    };
    options.url = options.url
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
        options.branch = match1;
        if (options.method === "GET") {
            match0 = match0.replace("branch", "ref");
        }
        return match0;
    });
    if ((
        /^https:\/\/github\.com\/[^\/]+?\/[^\/]+?$/
    ).test(options.url)) {
        options.data = JSON.stringify({
            name: options.url.split("/")[4]
        });
        switch (options.method) {
        case "DELETE":
            options.url = (
                "https://api.github.com/repos/"
                + options.url.split("/").slice(3).join("/")
            );
            break;
        case "POST_ORG":
            options.url = (
                "https://api.github.com/orgs/"
                + options.url.split("/")[3] + "/repos"
            );
            break;
        case "POST_USER":
            options.url = "https://api.github.com/user/repos";
            break;
        }
        options.method = options.method.split("_")[0];
    } else {
        if (options.url.indexOf("https://api.github.com/repos/") !== 0) {
            console.error("githubCrud - invalid url " + options.url);
            onError(new Error("invalid url " + options.url));
            return;
        }
        if (options.method !== "GET") {
            options.message = (
                options.message
                || "[ci skip] " + options.method + " file "
                + options.url.replace((
                    /\?.*/
                ), "")
            );
            options.url += "&message=" + encodeURIComponent(options.message);
            if (options.sha) {
                options.url += "&sha=" + options.sha;
            }
            options.data = JSON.stringify({
                branch: options.branch,
                content: Buffer.from(options.content || "").toString("base64"),
                message: options.message,
                sha: options.sha
            });
        }
    }
    local.ajax(options, function (error, xhr) {
        console.error("serverLog - " + JSON.stringify({
            time: new Date(xhr.timeStart).toISOString(),
            type: "githubCrudResponse",
            method: xhr.method,
            url: xhr.url,
            statusCode: xhr.statusCode,
            timeElapsed: xhr.timeElapsed
        }));
        local.onErrorDefault(
            error
            && error.statusCode !== 404
            && xhr
            && ("githubCrud - " + xhr.responseText)
        );
        try {
            options.responseJson = JSON.parse(xhr.responseText);
        } catch (ignore) {}
        onError(
            !(options.method === "DELETE" && xhr.statusCode === 404) && error,
            options.responseJson
        );
    });
};

local.githubCrudContentDelete = function (options, onError) {
/*
 * this function will delete the github-file options.url
 * https://developer.github.com/v3/repos/contents/#delete-a-file
 */
    options = {
        httpRequest: options.httpRequest,
        message: options.message,
        url: options.url
    };
    local.onNext(options, function (error, data) {
        switch (options.modeNext) {
        case 1:
            // get sha
            local.githubCrudAjax({
                httpRequest: options.httpRequest,
                url: options.url
            }, options.onNext);
            break;
        case 2:
            // delete file with sha
            if (!error && data.sha) {
                local.githubCrudAjax({
                    httpRequest: options.httpRequest,
                    message: options.message,
                    method: "DELETE",
                    sha: data.sha,
                    url: options.url
                }, options.onNext);
                return;
            }
            // delete tree
            local.onParallelList({
                list: data
            }, function (options2, onParallel) {
                onParallel.counter += 1;
                // recurse
                local.githubCrudContentDelete({
                    httpRequest: options.httpRequest,
                    message: options.message,
                    url: options2.element.url
                }, onParallel);
            }, options.onNext);
            break;
        default:
            onError(error, data);
        }
    });
    options.modeNext = 0;
    options.onNext();
};

local.githubCrudContentGet = function (options, onError) {
/*
 * this function will get the github-file options.url
 * https://developer.github.com/v3/repos/contents/#get-contents
 */
    options = {
        httpRequest: options.httpRequest,
        url: options.url
    };
    local.onNext(options, function (error, data) {
        switch (options.modeNext) {
        case 1:
            local.githubCrudAjax({
                httpRequest: options.httpRequest,
                url: options.url
            }, options.onNext);
            break;
        case 2:
            options.onNext(null, Buffer.from(data.content || "", "base64"));
            break;
        default:
            onError(error, !error && data);
        }
    });
    options.modeNext = 0;
    options.onNext();
};

local.githubCrudContentPut = function (options, onError) {
/*
 * this function will put options.content to the github-file options.url
 * https://developer.github.com/v3/repos/contents/#create-a-file
 * https://developer.github.com/v3/repos/contents/#update-a-file
 */
    options = {
        content: options.content,
        httpRequest: options.httpRequest,
        message: options.message,
        modeErrorIgnore: true,
        url: options.url
    };
    local.onNext(options, function (error, data) {
        switch (options.modeNext) {
        case 1:
            // get sha
            local.githubCrudAjax({
                httpRequest: options.httpRequest,
                url: options.url
            }, options.onNext);
            break;
        case 2:
            // put file with sha
            local.githubCrudAjax({
                content: options.content,
                httpRequest: options.httpRequest,
                message: options.message,
                method: "PUT",
                sha: data.sha,
                url: options.url
            }, options.onNext);
            break;
        default:
            onError(error, data);
        }
    });
    options.modeNext = 0;
    options.onNext();
};

local.githubCrudContentPutFile = function (options, onError) {
/*
 * this function will put options.file to the github-file options.url
 * https://developer.github.com/v3/repos/contents/#update-a-file
 */
    options = {
        file: options.file,
        httpRequest: options.httpRequest,
        message: options.message,
        url: options.url
    };
    local.onNext(options, function (error, data) {
        switch (options.modeNext) {
        case 1:
            // get file from url
            if ((
                /^(?:http|https):\/\//
            ).test(options.file)) {
                local.ajax({
                    httpRequest: options.httpRequest,
                    url: options.file
                }, function (error, response) {
                    options.onNext(error, response && response.data);
                });
                return;
            }
            // get file
            local.fs.readFile(options.file, options.onNext);
            break;
        case 2:
            local.githubCrudContentPut({
                content: data,
                httpRequest: options.httpRequest,
                message: options.message,
                // resolve file in url
                url: (
                    // ternary-condition
                    (
                        /\/$/
                    ).test(options.url)
                    ? options.url + local.path.basename(options.file)
                    : options.url
                )
            }, options.onNext);
            break;
        default:
            onError(error, data);
        }
    });
    options.modeNext = 0;
    options.onNext();
};

local.githubCrudContentTouch = function (options, onError) {
/*
 * this function will touch the github-file options.url
 * https://developer.github.com/v3/repos/contents/#update-a-file
 */
    options = {
        httpRequest: options.httpRequest,
        message: options.message,
        modeErrorIgnore: true,
        url: options.url
    };
    local.onNext(options, function (error, data) {
        switch (options.modeNext) {
        case 1:
            // get sha
            local.githubCrudAjax({
                httpRequest: options.httpRequest,
                url: options.url
            }, options.onNext);
            break;
        case 2:
            // put file with sha
            local.githubCrudAjax({
                content: Buffer.from(data.content || "", "base64"),
                httpRequest: options.httpRequest,
                message: options.message,
                method: "PUT",
                sha: data.sha,
                url: options.url
            }, options.onNext);
            break;
        default:
            onError(error, data);
        }
    });
    options.modeNext = 0;
    options.onNext();
};

local.githubCrudContentTouchList = function (options, onError) {
/*
 * this function will touch the github-files options.urlList in parallel
 * https://developer.github.com/v3/repos/contents/#update-a-file
 */
    local.onParallelList({
        list: options.urlList
    }, function (options2, onParallel) {
        onParallel.counter += 1;
        local.githubCrudContentTouch({
            httpRequest: options.httpRequest,
            message: options.message,
            url: options2.element
        }, onParallel);
    }, onError);
};

local.githubCrudRepoCreate = function (options, onError) {
/*
 * this function will create the github-repo options.url
 * https://developer.github.com/v3/repos/#create
 */
    local.githubCrudAjax({
        httpRequest: options.httpRequest,
        method: "POST_ORG",
        url: options.url
    }, function (error, data) {
        if (!(error && error.statusCode === 404)) {
            onError(error, data);
            return;
        }
        local.githubCrudAjax({
            httpRequest: options.httpRequest,
            method: "POST_USER",
            url: options.url
        }, onError);
    });
};

local.githubCrudRepoCreateList = function (options, onError) {
/*
 * this function will create the github-repos options.urlList in parallel
 * https://developer.github.com/v3/repos/#create
 */
    local.onParallelList({
        list: options.urlList
    }, function (options2, onParallel) {
        onParallel.counter += 1;
        local.githubCrudRepoCreate({
            httpRequest: options.httpRequest,
            url: options2.element
        }, onParallel);
    }, onError);
};

local.githubCrudRepoDelete = function (options, onError) {
/*
 * this function will delete the github-repo options.url
 * https://developer.github.com/v3/repos/#delete-a-repository
 */
    local.githubCrudAjax({
        httpRequest: options.httpRequest,
        method: "DELETE",
        url: options.url
    }, onError);
};

local.githubCrudRepoDeleteList = function (options, onError) {
/*
 * this function will delete the github-repos options.urlList in parallel
 * https://developer.github.com/v3/repos/#delete-a-repository
 */
    local.onParallelList({
        list: options.urlList
    }, function (options2, onParallel) {
        onParallel.counter += 1;
        local.githubCrudRepoDelete({
            httpRequest: options.httpRequest,
            url: options2.element
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
    }, function (error) {
        process.exit(Boolean(error));
    });
};

local.cliDict.get = function () {
/*
 * <fileRemote>
 * will get from github <fileRemote>
 */
    local.github_crud.githubCrudContentGet({
        url: process.argv[3]
    }, function (error, data) {
        try {
            process.stdout.write(data);
        } catch (ignore) {}
        process.exit(Boolean(error));
    });
};

local.cliDict.put = function () {
/*
 * <fileRemote> <fileLocal> <commitMessage>
 * will put on github <fileRemote>, <fileLocal>
 */
    local.github_crud.githubCrudContentPutFile({
        message: process.argv[5],
        url: process.argv[3],
        file: process.argv[4]
    }, function (error) {
        process.exit(Boolean(error));
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
    }, function (error) {
        process.exit(Boolean(error));
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
    }, function (error) {
        process.exit(Boolean(error));
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
    }, function (error) {
        process.exit(Boolean(error));
    });
};

// run cli
if (module === require.main && !globalThis.utility2_rollup) {
    local.cliRun();
}
}());



}());
