#!/usr/bin/env node
/*
 * lib.db.js (2018.9.1)
 * https://github.com/kaizhu256/node-db-lite
 * this zero-dependency package will provide a persistent, in-browser database, with a working web-demo
 *
 * browser example:
 *     <script src="assets.db-lite.js"></script>
 *     <script>
 *     var dbTable1;
 *     dbTable1 = window.dbTable1 = window.utility2_db.dbTableCreateOne({ name: "dbTable1" });
 *     dbTable1.idIndexCreate({ name: "field1" });
 *     dbTable1.crudSetOneById({ field1: "hello", field2: "world" });
 *     console.log(dbTable1.crudGetManyByQuery({
 *         limit: Infinity,
 *         query: { field1: "hello" },
 *         skip: 0,
 *         sort: [{ fieldName: 'field1', isDescending: false }]
 *     }));
 *     </script>
 *
 * node example:
 *     var db, dbTable1;
 *     utility2_db = require("./assets.db-lite.js");
 *     dbTable1 = global.dbTable1 = utility2_db.dbTableCreateOne({ name: "dbTable1" });
 *     dbTable1.idIndexCreate({ name: "field1" });
 *     dbTable1.crudSetOneById({ field1: "hello", field2: "world" });
 *     console.log(dbTable1.crudGetManyByQuery({
 *         limit: Infinity,
 *         query: { field1: "hello" },
 *         skip: 0,
 *         sort: [{ fieldName: 'field1', isDescending: false }]
 *     }));
 */



/* istanbul instrument in package db */
/* jslint utility2:true */
(function () {
"use strict";
var local;



/* istanbul ignore next */
// run shared js-env code - init-before
(function () {



// init debug_inline
(function () {
    var consoleError;
    var context;
    consoleError = console.error;
    context = (typeof window === "object" && window) || global;
    context["debug\u0049nline"] = context["debug\u0049nline"] || function () {
    /*
     * this function will both print arg0 to stderr and return it
     */
        var argList;
        argList = arguments; // jslint ignore:line
        // debug arguments
        context["debug\u0049nlineArguments"] = argList;
        consoleError("\n\ndebug\u0049nline");
        consoleError.apply(console, argList);
        consoleError("\n");
        // return arg0 for inspection
        return argList[0];
    };
}());
// init local
local = {};
// init isBrowser
local.isBrowser = (
    typeof window === "object"
    && typeof window.XMLHttpRequest === "function"
    && window.document
    && typeof window.document.querySelectorAll === "function"
);
// init global
local.global = local.isBrowser
? window
: global;
// re-init local
local = (
    local.global.utility2_rollup
    // || local.global.utility2_rollup_old || require("./assets.utility2.rollup.js")
    || local
);
// init exports
if (local.isBrowser) {
    local.global.utility2_db = local;
} else {
    // require builtins
    // local.assert = require("assert");
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
    module.exports = local;
    module.exports.__dirname = __dirname;
}
// init lib main
local.local = local;
local.db = local;



/* validateLineSortedReset */
local.assert = function (passed, message, onError) {
/*
 * this function will throw the error <message> if <passed> is falsy
 */
    var error;
    if (passed) {
        return;
    }
    error = (message && message.stack)
    // if message is an error-object, then leave it as is
    ? message
    : new Error(
        typeof message === "string"
        // if message is a string, then leave it as is
        ? message
        // else JSON.stringify message
        : JSON.stringify(message, null, 4)
    );
    onError = onError || function (error) {
        throw error;
    };
    onError(error);
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
        global.local = local;
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
        file = __filename.replace((/.*\//), "");
        options = Object.assign({}, options);
        packageJson = require("./package.json");
        // validate comment
        options.rgxComment = options.rgxComment || new RegExp(
            "\\) \\{\\n"
            + "(?:| {4})\\/\\*\\n"
            + "(?: | {5})\\*((?: <[^>]*?>| \\.\\.\\.)*?)\\n"
            + "(?: | {5})\\* (will .*?\\S)\\n"
            + "(?: | {5})\\*\\/\\n"
            + "(?: {4}| {8})\\S"
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
                throw new Error(
                    "cliRun - cannot parse comment in COMMAND "
                    + key + ":\nnew RegExp(" + JSON.stringify(options.rgxComment.source)
                    + ").exec(" + JSON.stringify(text)
                    .replace((/\\\\/g), "\u0000")
                    .replace((/\\n/g), "\\n\\\n")
                    .replace((/\u0000/g), "\\\\") + ");"
                );
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
                element.description = "# COMMAND "
                        + (element.command[0] || "<none>") + "\n# "
                        + element.description;
            }
            return element.description + "\n  " + file
                    + ("  " + element.command.sort().join("|") + "  ")
                    .replace((/^\u0020{4}$/), "  ")
                    + element.argList.join("  ");
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
        global.local = local;
        (local.replStart || require("repl").start)({useGlobal: true});
    };
    local.cliDict["--interactive"] = local.cliDict["--interactive"]
            || local.cliDict._interactive;
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

local.jsonCopy = function (obj) {
/*
 * this function will deep-copy obj
 */
    return obj === undefined
    ? undefined
    : JSON.parse(JSON.stringify(obj));
};

local.jsonStringifyOrdered = function (obj, replacer, space) {
/*
 * this function will JSON.stringify <obj>,
 * with object-keys sorted and circular-references removed
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Syntax
 */
    var circularList;
    var stringify;
    var tmp;
    stringify = function (obj) {
    /*
     * this function will recursively JSON.stringify obj,
     * with object-keys sorted and circular-references removed
     */
        // if obj is not an object or function, then JSON.stringify as normal
        if (!(
            obj
            && typeof obj === "object"
            && typeof obj.toJSON !== "function"
        )) {
            return JSON.stringify(obj);
        }
        // ignore circular-reference
        if (circularList.indexOf(obj) >= 0) {
            return;
        }
        circularList.push(obj);
        // if obj is an array, then recurse its items
        if (Array.isArray(obj)) {
            return "[" + obj.map(function (obj) {
                // recurse
                tmp = stringify(obj);
                return typeof tmp === "string"
                ? tmp
                : "null";
            }).join(",") + "]";
        }
        // if obj is not an array, then recurse its items with object-keys sorted
        return "{" + Object.keys(obj)
        // sort object-keys
        .sort()
        .map(function (key) {
            // recurse
            tmp = stringify(obj[key]);
            if (typeof tmp === "string") {
                return JSON.stringify(key) + ":" + tmp;
            }
        })
        .filter(function (obj) {
            return typeof obj === "string";
        })
        .join(",") + "}";
    };
    circularList = [];
    // try to derefernce all properties in obj
    (function () {
        try {
            obj = JSON.parse(JSON.stringify(obj));
        } catch (ignore) {
        }
    }());
    return JSON.stringify(
        (typeof obj === "object" && obj)
        // recurse
        ? JSON.parse(stringify(obj))
        : obj,
        replacer,
        space
    );
};

local.listShuffle = function (list) {
/*
 * this function will inplace shuffle the list using fisher-yates algorithm
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
    var ii;
    var random;
    var swap;
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

local.nop = function () {
/*
 * this function will do nothing
 */
    return;
};

local.objectSetOverride = function (dict, overrides, depth, env) {
/*
 * this function will recursively set overrides for items in dict
 */
    dict = dict || {};
    env = env || (typeof process === "object" && process.env) || {};
    overrides = overrides || {};
    Object.keys(overrides).forEach(function (key) {
        var dict2;
        var overrides2;
        dict2 = dict[key];
        overrides2 = overrides[key];
        if (overrides2 === undefined) {
            return;
        }
        // if both dict2 and overrides2 are non-null and non-array objects,
        // then recurse with dict2 and overrides2
        if (
            depth > 1
            // dict2 is a non-null and non-array object
            && typeof dict2 === "object" && dict2 && !Array.isArray(dict2)
            // overrides2 is a non-null and non-array object
            && typeof overrides2 === "object" && overrides2
            && !Array.isArray(overrides2)
        ) {
            local.objectSetOverride(dict2, overrides2, depth - 1, env);
            return;
        }
        // else set dict[key] with overrides[key]
        dict[key] = dict === env
        // if dict is env, then overrides falsy-value with empty-string
        ? overrides2 || ""
        : overrides2;
    });
    return dict;
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
    stack = new Error().stack.replace((/(.*?)\n.*?$/m), "$1");
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

local.replStart = function () {
/*
 * this function will start the repl-debugger
 */
    var self;
    if (global.utility2_serverRepl1) {
        return;
    }
    // start replServer
    self = require("repl").start({useGlobal: true});
    global.utility2_serverRepl1 = self;
    self.nop = function () {
    /*
     * this function will do nothing
     */
        return;
    };
    self.onError = function (error) {
    /*
     * this function will debug any repl-error
     */
        // debug error
        global.utility2_debugReplError = error;
        console.error(error);
    };
    // save repl eval function
    self.evalDefault = self.eval;
    // hook custom repl eval function
    self.eval = function (script, context, file, onError) {
        var onError2;
        onError2 = function (error, data) {
            // debug error
            global.utility2_debugReplError = error || global.utility2_debugReplError;
            onError(error, data);
        };
        script.replace((/^(\S+)\u0020(.*?)\n/), function (ignore, match1, match2) {
            switch (match1) {
            // syntax sugar to run async shell command
            case "$":
                switch (match2) {
                // syntax sugar to run git diff
                case "git diff":
                    match2 = "git diff --color | cat";
                    break;
                // syntax sugar to run git log
                case "git log":
                    match2 = "git log -n 4 | cat";
                    break;
                }
                // source lib.utility2.sh
                if (process.env.npm_config_dir_utility2 && (match2 !== ":")) {
                    match2 = ". " + process.env.npm_config_dir_utility2
                            + "/lib.utility2.sh;" + match2;
                }
                // run async shell command
                require("child_process").spawn(match2, {
                    shell: true,
                    stdio: ["ignore", 1, 2]
                })
                // on shell exit, print return prompt
                .on("exit", function (exitCode) {
                    console.error("exit-code " + exitCode);
                    self.evalDefault(
                        "\n",
                        context,
                        file,
                        onError2
                    );
                });
                script = "\n";
                break;
            // syntax sugar to map text with charCodeAt
            case "charCode":
                script = "console.error(" + JSON.stringify(
                    match2.split("").map(function (chr) {
                        return "\\u" + chr.charCodeAt(0).toString(16).padStart(4, 0);
                    }).join("")
                ) + ")\n";
                break;
            // syntax sugar to sort chr
            case "charSort":
                script = "console.error(" + JSON.stringify(
                    match2.split("").sort().join("")
                ) + ")\n";
                break;
            // syntax sugar to grep current dir
            case "grep":
                // run async shell command
                require("child_process").spawn(
                    (
                        "find . -type f | grep -v -E "
/* jslint ignore:start */
+ '"\
/\\.|(\\b|_)(\\.\\d|\
archive|artifact|\
bower_component|build|\
coverage|\
doc|\
external|\
fixture|\
git_module|\
jquery|\
log|\
min|mock|\
node_module|\
rollup|\
swp|\
tmp|\
vendor)s{0,1}(\\b|_)\
" '
/* jslint ignore:end */
                        + "| tr \"\\n\" \"\\000\" | xargs -0 grep -HIin -E \""
                        + match2 + "\""
                    ),
                    {shell: true, stdio: ["ignore", 1, 2]}
                )
                // on shell exit, print return prompt
                .on("exit", function (exitCode) {
                    console.error("exit-code " + exitCode);
                    self.evalDefault(
                        "\n",
                        context,
                        file,
                        onError2
                    );
                });
                script = "\n";
                break;
            // syntax sugar to list object's keys, sorted by item-type
            case "keys":
                script = "console.error(Object.keys(" + match2
                        + ").map(function (key) {"
                        + "return typeof " + match2 + "[key] + \" \" + key + \"\\n\";"
                        + "}).sort().join(\"\") + Object.keys(" + match2 + ").length)\n";
                break;
            // syntax sugar to print stringified arg
            case "print":
                script = "console.error(String(" + match2 + "))\n";
                break;
            }
        });
        // eval the script
        self.evalDefault(script, context, file, onError2);
    };
    self.socket = {end: self.nop, on: self.nop, write: self.nop};
    // init process.stdout
    process.stdout._writeDefault = process.stdout._writeDefault
            || process.stdout._write;
    process.stdout._write = function (chunk, encoding, callback) {
        process.stdout._writeDefault(chunk, encoding, callback);
        // coverage-hack - ignore else-statement
        self.nop(self.socket.writable && (function () {
            self.socket.write(chunk, encoding);
        }()));
    };
    // start tcp-server
    global.utility2_serverReplTcp1 = require("net").createServer(function (socket) {
        // init socket
        self.socket = socket;
        self.socket.on("data", self.write.bind(self));
        self.socket.on("error", self.onError);
        self.socket.setKeepAlive(true);
    });
    // coverage-hack - ignore else-statement
    self.nop(process.env.PORT_REPL && (function () {
        console.error("repl-server listening on tcp-port " + process.env.PORT_REPL);
        global.utility2_serverReplTcp1.listen(process.env.PORT_REPL);
    }()));
};

local.setTimeoutOnError = function (onError, timeout, error, data) {
/*
 * this function will after timeout has passed, then call onError(error, data)
 */
    if (typeof onError === "function") {
        setTimeout(function () {
            onError(error, data);
        }, timeout);
    }
    return data;
};
}());



// run shared js-env code - lib.storage.js
(function (local) {



var child_process;
var clear;
var defer;
var deferList;
var fs;
var getItem;
var init;
var isBrowser;
var keys;
var length;
var os;
var removeItem;
var setItem;
var storage;
var storageDir;

// init isBrowser
isBrowser = typeof window === "object" &&
        typeof window.XMLHttpRequest === "function" &&
        window.document &&
        typeof window.document.querySelectorAll === "function";
storageDir = "tmp/storage." + (
    isBrowser
    ? "undefined"
    : process.env.NODE_ENV
);
if (!isBrowser) {
    // require modules
    child_process = require("child_process");
    fs = require("fs");
    os = require("os");
}

clear = function (onError) {
/*
 * this function will clear storage
 */
    defer({action: "clear"}, onError);
};

defer = function (options, onError) {
/*
 * this function will defer options.action until storage is ready
 */
    var data;
    var isDone;
    var objectStore;
    var onError2;
    var request;
    var tmp;
    onError = onError || function (error) {
        // validate no error occurred
        local.assert(!error, error);
    };
    if (!storage) {
        deferList.push(function () {
            defer(options, onError);
        });
        init();
        return;
    }
    if (isBrowser) {
        onError2 = function () {
            /* istanbul ignore next */
            if (isDone) {
                return;
            }
            isDone = true;
            onError(
                request && (request.error || request.transaction.error),
                data || request.result || ""
            );
        };
        switch (options.action) {
        case "clear":
        case "removeItem":
        case "setItem":
            objectStore = storage
            .transaction(storageDir, "readwrite")
            .objectStore(storageDir);
            break;
        default:
            objectStore = storage
            .transaction(storageDir, "readonly")
            .objectStore(storageDir);
        }
        switch (options.action) {
        case "clear":
            request = objectStore.clear();
            break;
        case "getItem":
            request = objectStore.get(String(options.key));
            break;
        case "keys":
            data = [];
            request = objectStore.openCursor();
            request.onsuccess = function () {
                if (!request.result) {
                    return;
                }
                data.push(request.result.key);
                request.result.continue();
            };
            break;
        case "length":
            request = objectStore.count();
            break;
        case "removeItem":
            request = objectStore.delete(String(options.key));
            break;
        case "setItem":
            request = objectStore.put(options.value, String(options.key));
            break;
        }
        ["onabort", "onerror", "onsuccess"].forEach(function (handler) {
            request[handler] = request[handler] || onError2;
        });
        // debug request
        local._debugStorageRequest = request;
    } else {
        switch (options.action) {
        case "clear":
            child_process.spawnSync("rm -f " + storage + "/*", {
                shell: true,
                stdio: ["ignore", 1, 2]
            });
            setTimeout(onError);
            break;
        case "getItem":
            fs.readFile(
                storage + "/" + encodeURIComponent(String(options.key)),
                "utf8",
                function (ignore, data) {
                    onError(null, data || "");
                }
            );
            break;
        case "keys":
            fs.readdir(storage, function (error, data) {
                onError(error, data && data.map(decodeURIComponent));
            });
            break;
        case "length":
            fs.readdir(storage, function (error, data) {
                onError(error, data && data.length);
            });
            break;
        case "removeItem":
            fs.unlink(
                storage + "/" + encodeURIComponent(String(options.key)),
                // ignore error
                function () {
                    onError();
                }
            );
            break;
        case "setItem":
            tmp = os.tmpdir() + "/" + Date.now() + Math.random();
            // save to tmp
            fs.writeFile(tmp, options.value, function (error) {
                // validate no error occurred
                local.assert(!error, error);
                // rename tmp to key
                fs.rename(
                    tmp,
                    storage + "/" + encodeURIComponent(String(options.key)),
                    onError
                );
            });
            break;
        }
    }
};

deferList = [];

getItem = function (key, onError) {
/*
 * this function will get the item with the given key from storage
 */
    defer({action: "getItem", key: key}, onError);
};

init = function () {
/*
 * this function will init storage
 */
    var onError;
    var request;
    onError = function (error) {
        // validate no error occurred
        local.assert(!error, error);
        if (isBrowser) {
            storage = window[storageDir];
        }
        while (deferList.length) {
            deferList.shift()();
        }
    };
    if (isBrowser) {
        storage = window[storageDir];
    }
    if (storage) {
        onError();
        return;
    }
    if (isBrowser) {
        // init indexedDB
        try {
            request = window.indexedDB.open(storageDir);
            // debug request
            local._debugStorageRequestIndexedDB = request;
            request.onerror = onError;
            request.onsuccess = function () {
                window[storageDir] = request.result;
                onError();
            };
            request.onupgradeneeded = function () {
                if (!request.result.objectStoreNames.contains(storageDir)) {
                    request.result.createObjectStore(storageDir);
                }
            };
        } catch (ignore) {
        }
    } else {
        // mkdirp storage
        storage = storageDir;
        child_process.spawnSync("mkdir", ["-p", storage], {stdio: ["ignore", 1, 2]});
        onError();
    }
};

keys = function (onError) {
/*
 * this function will get all the keys in storage
 */
    defer({action: "keys"}, onError);
};

length = function (onError) {
/*
 * this function will get the number of items in storage
 */
    defer({action: "length"}, onError);
};

removeItem = function (key, onError) {
/*
 * this function will remove the item with the given key from storage
 */
    defer({action: "removeItem", key: key}, onError);
};

setItem = function (key, value, onError) {
/*
 * this function will set the item with the given key and value to storage
 */
    defer({action: "setItem", key: key, value: value}, onError);
};

// init local
local.storage = storage;
local.storageClear = clear;
local.storageDefer = defer;
local.storageDeferList = deferList;
local.storageDir = storageDir;
local.storageGetItem = getItem;
local.storageInit = init;
local.storageKeys = keys;
local.storageLength = length;
local.storageRemoveItem = removeItem;
local.storageSetItem = setItem;
}(local));



// run shared js-env code - lib.dbTable.js
(function () {



local._DbTable = function (options) {
/*
 * this function will create a dbTable
 */
    this.name = String(options.name);
    // register dbTable in dbTableDict
    local.dbTableDict[this.name] = this;
    this.dbRowList = [];
    this.isDirty = null;
    this.idIndexList = [{isInteger: false, name: "_id", dict: {}}];
    this.onSaveList = [];
    this.sizeLimit = options.sizeLimit || 0;
};

local._DbTable.prototype._cleanup = function () {
/*
 * this function will cleanup soft-deleted records from the dbTable
 */
    var dbRow;
    var ii;
    var list;
    if (!this.isDirty && this.dbRowList.length <= this.sizeLimit) {
        return;
    }
    this.isDirty = null;
    // cleanup dbRowList
    list = this.dbRowList;
    this.dbRowList = [];
    // optimization - while-loop
    ii = 0;
    while (ii < list.length) {
        dbRow = list[ii];
        // cleanup isRemoved
        if (!dbRow.$isRemoved) {
            this.dbRowList.push(dbRow);
        }
        ii += 1;
    }
    if (this.sizeLimit && this.dbRowList.length >= 1.5 * this.sizeLimit) {
        this.dbRowList = this._crudGetManyByQuery({}, this.sortDefault, 0, this.sizeLimit);
    }
};

local._DbTable.prototype._crudGetManyByQuery = function (
    query,
    sort,
    skip,
    limit,
    shuffle
) {
/*
 * this function will get the dbRow's in the dbTable,
 * with the given query, sort, skip, and limit
 */
    var ii;
    var result;
    result = this.dbRowList;
    // get by query
    if (result.length && query && Object.keys(query).length) {
        result = local.dbRowListGetManyByQuery(this.dbRowList, query);
    }
    // sort
    (sort || []).forEach(function (element) {
        // bug-workaround - v8 does not have stable-sort
        // optimization - while-loop
        ii = 0;
        while (ii < result.length) {
            result[ii].$ii = ii;
            ii += 1;
        }
        result.sort(function (aa, bb) {
            return local.sortCompare(
                local.dbRowGetItem(aa, element.fieldName),
                local.dbRowGetItem(bb, element.fieldName),
                aa.$ii,
                bb.$ii
            );
        });
        if (element.isDescending) {
            result.reverse();
        }
    });
    // skip
    result = result.slice(skip || 0);
    // shuffle
    ((shuffle && local.listShuffle) || local.nop)(result);
    // limit
    result = result.slice(0, limit || Infinity);
    return result;
};

local._DbTable.prototype._crudGetOneById = function (idDict) {
/*
 * this function will get the dbRow in the dbTable with the given idDict
 */
    var id;
    var result;
    idDict = local.objectSetOverride(idDict);
    result = null;
    this.idIndexList.some(function (idIndex) {
        id = idDict[idIndex.name];
        // optimization - hasOwnProperty
        if (idIndex.dict.hasOwnProperty(id)) {
            result = idIndex.dict[id];
            return result;
        }
    });
    return result;
};

local._DbTable.prototype._crudRemoveOneById = function (idDict, circularList) {
/*
 * this function will remove the dbRow from the dbTable with the given idDict
 */
    var id;
    var result;
    var self;
    if (!idDict) {
        return null;
    }
    self = this;
    circularList = circularList || [idDict];
    result = null;
    self.idIndexList.forEach(function (idIndex) {
        id = idDict[idIndex.name];
        // optimization - hasOwnProperty
        if (!idIndex.dict.hasOwnProperty(id)) {
            return;
        }
        result = idIndex.dict[id];
        delete idIndex.dict[id];
        // optimization - soft-delete
        result.$isRemoved = true;
        self.isDirty = true;
        if (circularList.indexOf(result) >= 0) {
            return;
        }
        circularList.push(result);
        // recurse
        self._crudRemoveOneById(result, circularList);
    });
    self.save();
    return result;
};

local._DbTable.prototype._crudSetOneById = function (dbRow) {
/*
 * this function will set the dbRow into the dbTable with the given dbRow._id
 * WARNING - existing dbRow with conflicting dbRow._id will be removed
 */
    var existing;
    var id;
    var normalize;
    var timeNow;
    normalize = function (dbRow) {
    /*
     * this function will recursively normalize dbRow
     */
        switch (typeof dbRow) {
        case "boolean":
        case "string":
            return dbRow;
        case "number":
            return Number.isFinite(dbRow)
            ? dbRow
            : undefined;
        case "object":
            if (!dbRow) {
                return;
            }
            break;
        default:
            return;
        }
        Object.keys(dbRow).forEach(function (key) {
            dbRow[key] = (key[0] === "$" || key.indexOf(".") >= 0)
            // invalid-property
            ? undefined
            // recurse
            : normalize(dbRow[key]);
        });
        return dbRow;
    };
    dbRow = local.jsonCopy(local.objectSetOverride(dbRow));
    // update timestamp
    timeNow = new Date().toISOString();
    dbRow._timeCreated = dbRow._timeCreated || timeNow;
    if (!local.modeImport) {
        dbRow._timeUpdated = timeNow;
    }
    // normalize
    dbRow = normalize(dbRow);
    dbRow = local.jsonCopy(dbRow);
    // remove existing dbRow
    existing = this._crudRemoveOneById(dbRow) || dbRow;
    this.idIndexList.forEach(function (idIndex) {
        // auto-set id
        id = local.dbRowSetId(existing, idIndex);
        // copy id from existing to dbRow
        dbRow[idIndex.name] = id;
        // set dbRow
        idIndex.dict[id] = dbRow;
    });
    // update dbRowList
    this.dbRowList.push(dbRow);
    this.save();
    return dbRow;
};

local._DbTable.prototype._crudUpdateOneById = function (dbRow) {
/*
 * this function will update the dbRow in the dbTable,
 * if it exists with the given dbRow._id
 * WARNING
 * existing dbRow's with conflicting unique-keys (besides the one being updated)
 * will be removed
 */
    var id;
    var result;
    dbRow = local.jsonCopy(local.objectSetOverride(dbRow));
    result = {};
    this.idIndexList.some(function (idIndex) {
        id = dbRow[idIndex.name];
        // optimization - hasOwnProperty
        if (idIndex.dict.hasOwnProperty(id)) {
            result = idIndex.dict[id];
            return true;
        }
    });
    // remove existing dbRow
    result = local.jsonCopy(this._crudRemoveOneById(result)) || result;
    // update dbRow
    delete dbRow._timeCreated;
    local.objectSetOverride(result, dbRow, 10);
    // replace dbRow
    result = this._crudSetOneById(result);
    return result;
};

local._DbTable.prototype.crudCountAll = function (onError) {
/*
 * this function will count all of dbRow's in the dbTable
 */
    this._cleanup();
    return local.setTimeoutOnError(onError, 0, null, this.dbRowList.length);
};

local._DbTable.prototype.crudCountManyByQuery = function (query, onError) {
/*
 * this function will count the number of dbRow's in the dbTable with the given query
 */
    this._cleanup();
    return local.setTimeoutOnError(
        onError,
        0,
        null,
        this._crudGetManyByQuery(query).length
    );
};

local._DbTable.prototype.crudGetManyById = function (idDictList, onError) {
/*
 * this function will get the dbRow's in the dbTable with the given idDictList
 */
    var self;
    this._cleanup();
    self = this;
    return local.setTimeoutOnError(onError, 0, null, local.dbRowProject(
        (idDictList || []).map(function (idDict) {
            return self._crudGetOneById(idDict);
        })
    ));
};

local._DbTable.prototype.crudGetManyByQuery = function (options, onError) {
/*
 * this function will get the dbRow's in the dbTable with the given options.query
 */
    this._cleanup();
    options = local.objectSetOverride(options);
    return local.setTimeoutOnError(onError, 0, null, local.dbRowProject(
        this._crudGetManyByQuery(
            options.query,
            options.sort || this.sortDefault,
            options.skip,
            options.limit,
            options.shuffle
        ),
        options.fieldList
    ));
};

local._DbTable.prototype.crudGetOneById = function (idDict, onError) {
/*
 * this function will get the dbRow in the dbTable with the given idDict
 */
    this._cleanup();
    return local.setTimeoutOnError(onError, 0, null, local.dbRowProject(
        this._crudGetOneById(idDict)
    ));
};

local._DbTable.prototype.crudGetOneByQuery = function (query, onError) {
/*
 * this function will get the dbRow in the dbTable with the given query
 */
    var ii;
    var result;
    this._cleanup();
    // optimization - while-loop
    ii = 0;
    while (ii < this.dbRowList.length) {
        result = local.dbRowListGetManyByQuery([this.dbRowList[ii]], query)[0];
        if (result) {
            break;
        }
        ii += 1;
    }
    return local.setTimeoutOnError(onError, 0, null, local.dbRowProject(result));
};

local._DbTable.prototype.crudGetOneByRandom = function (onError) {
/*
 * this function will get a random dbRow in the dbTable
 */
    this._cleanup();
    return local.setTimeoutOnError(onError, 0, null, local.dbRowProject(
        this.dbRowList[Math.floor(Math.random() * this.dbRowList.length)]
    ));
};

local._DbTable.prototype.crudRemoveAll = function (onError) {
/*
 * this function will remove all of the dbRow's from the dbTable
 */
    var idIndexList;
    // save idIndexList
    idIndexList = this.idIndexList;
    // reset dbTable
    local._DbTable.call(this, this);
    // restore idIndexList
    local.dbTableCreateOne({name: this.name, idIndexCreateList: idIndexList}, onError);
};

local._DbTable.prototype.crudRemoveManyById = function (idDictList, onError) {
/*
 * this function will remove the dbRow's from the dbTable with the given idDictList
 */
    var self;
    self = this;
    return local.setTimeoutOnError(onError, 0, null, local.dbRowProject(
        (idDictList || []).map(function (dbRow) {
            return self._crudRemoveOneById(dbRow);
        })
    ));
};

local._DbTable.prototype.crudRemoveManyByQuery = function (query, onError) {
/*
 * this function will remove the dbRow's from the dbTable with the given query
 */
    var self;
    self = this;
    return local.setTimeoutOnError(onError, 0, null, local.dbRowProject(
        self._crudGetManyByQuery(query).map(function (dbRow) {
            return self._crudRemoveOneById(dbRow);
        })
    ));
};

local._DbTable.prototype.crudRemoveOneById = function (idDict, onError) {
/*
 * this function will remove the dbRow from the dbTable with the given idDict
 */
    return local.setTimeoutOnError(onError, 0, null, local.dbRowProject(
        this._crudRemoveOneById(idDict)
    ));
};

local._DbTable.prototype.crudSetManyById = function (dbRowList, onError) {
/*
 * this function will set the dbRowList into the dbTable
 */
    var self;
    self = this;
    return local.setTimeoutOnError(onError, 0, null, local.dbRowProject(
        (dbRowList || []).map(function (dbRow) {
            return self._crudSetOneById(dbRow);
        })
    ));
};

local._DbTable.prototype.crudSetOneById = function (dbRow, onError) {
/*
 * this function will set the dbRow into the dbTable with the given dbRow._id
 */
    return local.setTimeoutOnError(onError, 0, null, local.dbRowProject(
        this._crudSetOneById(dbRow)
    ));
};

local._DbTable.prototype.crudUpdateManyById = function (dbRowList, onError) {
/*
 * this function will update the dbRowList in the dbTable,
 * if they exist with the given dbRow._id's
 */
    var self;
    self = this;
    return local.setTimeoutOnError(onError, 0, null, local.dbRowProject(
        (dbRowList || []).map(function (dbRow) {
            return self._crudUpdateOneById(dbRow);
        })
    ));
};

local._DbTable.prototype.crudUpdateManyByQuery = function (query, dbRow, onError) {
/*
 * this function will update the dbRow's in the dbTable with the given query
 */
    var result;
    var self;
    var tmp;
    self = this;
    tmp = local.jsonCopy(local.objectSetOverride(dbRow));
    result = self._crudGetManyByQuery(query).map(function (dbRow) {
        tmp._id = dbRow._id;
        return self._crudUpdateOneById(tmp);
    });
    return local.setTimeoutOnError(onError, 0, null, result);
};

local._DbTable.prototype.crudUpdateOneById = function (dbRow, onError) {
/*
 * this function will update the dbRow in the dbTable,
 * if it exists with the given dbRow._id
 */
    return local.setTimeoutOnError(onError, 0, null, local.dbRowProject(
        this._crudUpdateOneById(dbRow)
    ));
};

local._DbTable.prototype.drop = function (onError) {
/*
 * this function will drop the dbTable
 */
    console.error("db - dropping dbTable " + this.name + " ...");
    // cancel pending save
    this.timerSave = null;
    while (this.onSaveList.length) {
        this.onSaveList.shift()();
    }
    // reset dbTable
    local._DbTable.call(this, this);
    // clear persistence
    local.storageRemoveItem("dbTable." + this.name + ".json", onError);
};

local._DbTable.prototype.export = function (onError) {
/*
 * this function will export the db
 */
    var result;
    var self;
    this._cleanup();
    self = this;
    result = "";
    self.idIndexList.forEach(function (idIndex) {
        result += self.name + " idIndexCreate " + JSON.stringify({
            isInteger: idIndex.isInteger,
            name: idIndex.name
        }) + "\n";
    });
    result += self.name + " sizeLimit " + self.sizeLimit + "\n";
    result += self.name + " sortDefault " + JSON.stringify(self.sortDefault) + "\n";
    self.crudGetManyByQuery({}).forEach(function (dbRow) {
        result += self.name + " dbRowSet " + JSON.stringify(dbRow) + "\n";
    });
    return local.setTimeoutOnError(onError, 0, null, result.trim());
};

local._DbTable.prototype.idIndexCreate = function (options, onError) {
/*
 * this function will create an idIndex with the given options.name
 */
    var dbRow;
    var idIndex;
    var ii;
    var name;
    options = local.objectSetOverride(options);
    name = String(options.name);
    // disallow idIndex with dot-name
    if (name.indexOf(".") >= 0 || name === "_id") {
        return local.setTimeoutOnError(onError);
    }
    // remove existing idIndex
    this.idIndexRemove(options);
    // init idIndex
    idIndex = {
        dict: {},
        isInteger: Boolean(options.isInteger),
        name: name
    };
    this.idIndexList.push(idIndex);
    // populate idIndex with dbRowList
    // optimization - while-loop
    ii = 0;
    while (ii < this.dbRowList.length) {
        dbRow = this.dbRowList[ii];
        // auto-set id
        if (!dbRow.$isRemoved) {
            idIndex.dict[local.dbRowSetId(dbRow, idIndex)] = dbRow;
        }
        ii += 1;
    }
    this.save();
    return local.setTimeoutOnError(onError);
};

local._DbTable.prototype.idIndexRemove = function (options, onError) {
/*
 * this function will remove the idIndex with the given options.name
 */
    var name;
    options = local.objectSetOverride(options);
    name = String(options.name);
    this.idIndexList = this.idIndexList.filter(function (idIndex) {
        return idIndex.name !== name || idIndex.name === "_id";
    });
    this.save();
    return local.setTimeoutOnError(onError);
};

local._DbTable.prototype.save = function (onError) {
/*
 * this function will save the dbTable to storage
 */
    var self;
    self = this;
    if (local.modeImport) {
        return;
    }
    if (onError) {
        self.onSaveList.push(onError);
    }
    // throttle storage-writes to once every 1000 ms
    self.timerSave = self.timerSave || setTimeout(function () {
        self.timerSave = null;
        local.storageSetItem("dbTable." + self.name + ".json", self.export(), function (
            error
        ) {
            while (self.onSaveList.length) {
                self.onSaveList.shift()(error);
            }
        });
    }, 1000);
};

local.dbCrudRemoveAll = function (onError) {
/*
 * this function will remove all dbRow's from the db
 */
    var onParallel;
    onParallel = local.onParallel(function (error) {
        local.setTimeoutOnError(onError, 0, error);
    });
    onParallel.counter += 1;
    Object.keys(local.dbTableDict).forEach(function (key) {
        onParallel.counter += 1;
        local.dbTableDict[key].crudRemoveAll(onParallel);
    });
    onParallel();
};

local.dbDrop = function (onError) {
/*
 * this function will drop the db
 */
    var onParallel;
    console.error("db - dropping database ...");
    onParallel = local.onParallel(function (error) {
        local.setTimeoutOnError(onError, 0, error);
    });
    onParallel.counter += 1;
    onParallel.counter += 1;
    local.storageClear(onParallel);
    Object.keys(local.dbTableDict).forEach(function (key) {
        onParallel.counter += 1;
        local.dbTableDict[key].drop(onParallel);
    });
    onParallel();
};

local.dbExport = function (onError) {
/*
 * this function will export the db as serialized text
 */
    var result;
    result = "";
    Object.keys(local.dbTableDict).forEach(function (key) {
        console.error("db - exporting dbTable " + local.dbTableDict[key].name + " ...");
        result += local.dbTableDict[key].export();
        result += "\n\n";
    });
    return local.setTimeoutOnError(onError, 0, null, result.trim());
};

local.dbImport = function (text, onError) {
/*
 * this function will import the serialized text into the db
 */
    var dbTable;
    var dbTableDict;
    dbTableDict = {};
    local.modeImport = true;
    setTimeout(function () {
        local.modeImport = null;
    });
    text.replace((/^(\w\S*?)\u0020(\S+?)\u0020(\S.*?)$/gm), function (
        match0,
        match1,
        match2,
        match3
    ) {
        // jslint-hack
        local.nop(match0);
        switch (match2) {
        case "dbRowSet":
            dbTableDict[match1] = true;
            dbTable = local.dbTableCreateOne({isLoaded: true, name: match1});
            dbTable.crudSetOneById(JSON.parse(match3));
            break;
        case "idIndexCreate":
            dbTableDict[match1] = true;
            dbTable = local.dbTableCreateOne({isLoaded: true, name: match1});
            dbTable.idIndexCreate(JSON.parse(match3));
            break;
        case "sizeLimit":
            dbTableDict[match1] = true;
            dbTable = local.dbTableCreateOne({isLoaded: true, name: match1});
            dbTable.sizeLimit = JSON.parse(match3);
            break;
        case "sortDefault":
            dbTableDict[match1] = true;
            dbTable = local.dbTableCreateOne({isLoaded: true, name: match1});
            dbTable.sortDefault = JSON.parse(match3);
            break;
        default:
            local.onErrorDefault(new Error(
                "db - dbImport - invalid operation - " +
                match0
            ));
        }
    });
    Object.keys(dbTableDict).forEach(function (name) {
        console.error("db - importing dbTable " + name + " ...");
    });
    local.modeImport = null;
    return local.setTimeoutOnError(onError);
};

local.dbLoad = function (onError) {
/*
 * this function will load the db from storage
 */
    var onParallel;
    onParallel = local.onParallel(function (error) {
        local.setTimeoutOnError(onError, 0, error);
    });
    local.storageKeys(function (error, data) {
        onParallel.counter += 1;
        onParallel.counter += 1;
        onParallel(error);
        (data || []).forEach(function (key) {
            if (key.indexOf("dbTable.") !== 0) {
                return;
            }
            onParallel.counter += 1;
            local.storageGetItem(key, function (error, data) {
                onParallel.counter += 1;
                onParallel(error);
                local.dbImport(data, onParallel);
            });
        });
        onParallel();
    });
};

local.dbReset = function (dbSeedList, onError) {
/*
 * this function will drop and seed the db with the given dbSeedList
 */
    var onParallel;
    onParallel = local.global.utility2_onReadyBefore || local.onParallel(onError);
    onParallel.counter += 1;
    // drop db
    onParallel.counter += 1;
    local.dbDrop(function (error) {
        local.onErrorDefault(error);
        // seed db
        local.dbSeed(dbSeedList, !local.global.utility2_onReadyBefore && onParallel);
        (local.global.utility2_onReadyBefore || local.nop)();
    });
    (local.global.utility2_onReadyAfter || local.nop)(onError);
    onParallel();
};

local.dbRowGetItem = function (dbRow, key) {
/*
 * this function will get the item with the given key from dbRow
 */
    var ii;
    var value;
    value = dbRow;
    key = String(key).split(".");
    // optimization - while-loop
    ii = 0;
    while (ii < key.length && typeof value === "object" && value) {
        value = value[key[ii]];
        ii += 1;
    }
    return value === undefined
    ? null
    : value;
};

local.dbRowListGetManyByOperator = function (dbRowList, fieldName, operator, bb, not) {
/*
 * this function will get the dbRow's in dbRowList with the given operator
 */
    var ii;
    var jj;
    var result;
    var fieldValue;
    var test;
    var typeof2;
    result = [];
    typeof2 = typeof bb;
    if (bb && typeof2 === "object") {
        switch (operator) {
        case "$in":
        case "$nin":
        case "$regex":
            break;
        default:
            return result;
        }
    }
    switch (operator) {
    case "$eq":
        test = function (aa, bb) {
            return aa === bb;
        };
        break;
    case "$exists":
        bb = !bb;
        test = function (aa, bb) {
            return !((aa === null) ^ bb); // jslint ignore:line
        };
        break;
    case "$gt":
        test = function (aa, bb, typeof1, typeof2) {
            return typeof1 === typeof2 && aa > bb;
        };
        break;
    case "$gte":
        test = function (aa, bb, typeof1, typeof2) {
            return typeof1 === typeof2 && aa >= bb;
        };
        break;
    case "$in":
        if (bb && typeof bb.indexOf === "function") {
            if (typeof2 === "string") {
                test = function (aa, bb, typeof1, typeof2) {
                    return typeof1 === typeof2 && bb.indexOf(aa) >= 0;
                };
            } else {
                test = function (aa, bb) {
                    return bb.indexOf(aa) >= 0;
                };
            }
        }
        break;
    case "$lt":
        test = function (aa, bb, typeof1, typeof2) {
            return typeof1 === typeof2 && aa < bb;
        };
        break;
    case "$lte":
        test = function (aa, bb, typeof1, typeof2) {
            return typeof1 === typeof2 && aa <= bb;
        };
        break;
    case "$ne":
        test = function (aa, bb) {
            return aa !== bb;
        };
        break;
    case "$nin":
        if (bb && typeof bb.indexOf === "function") {
            if (typeof2 === "string") {
                test = function (aa, bb, typeof1, typeof2) {
                    return typeof1 === typeof2 && bb.indexOf(aa) < 0;
                };
            } else {
                test = function (aa, bb) {
                    return bb.indexOf(aa) < 0;
                };
            }
        }
        break;
    case "$regex":
        if (bb && typeof bb.test === "function") {
            test = function (aa, bb) {
                return bb.test(aa);
            };
        }
        break;
    case "$typeof":
        test = function (aa, bb, typeof1) {
            // jslint-hack
            local.nop(aa);
            return typeof1 === bb;
        };
        break;
    }
    if (!test) {
        return result;
    }
    // optimization - while-loop
    ii = dbRowList.length;
    while (ii >= 1) {
        ii -= 1;
        fieldValue = local.dbRowGetItem(dbRowList[ii], fieldName);
        // normalize to list
        if (!Array.isArray(fieldValue)) {
            fieldValue = [fieldValue];
        }
        // optimization - while-loop
        jj = fieldValue.length;
        while (jj >= 1) {
            jj -= 1;
            if (Boolean(not ^ test(fieldValue[jj], bb, typeof fieldValue[jj], typeof2))) {
                result.push(dbRowList[ii]);
                break;
            }
        }
    }
    return result;
};

local.dbRowListGetManyByQuery = function (dbRowList, query, fieldName, not) {
/*
 * this function will get the dbRow's in dbRowList with the given query
 */
    var bb;
    var dbRowDict;
    var result;
    // optimization - convert to boolean
    not = Boolean(not);
    result = dbRowList;
    if (!(typeof query === "object" && query)) {
        result = local.dbRowListGetManyByOperator(result, fieldName, "$eq", query, not);
        return result;
    }
    Object.keys(query).some(function (key) {
        bb = query[key];
        switch (key) {
        case "$not":
            key = fieldName;
            not = !not;
            break;
        case "$or":
            if (!Array.isArray(bb)) {
                break;
            }
            dbRowDict = {};
            bb.forEach(function (query) {
                // recurse
                local.dbRowListGetManyByQuery(result, query).forEach(function (dbRow) {
                    dbRowDict[dbRow._id] = dbRow;
                });
            });
            result = Object.keys(dbRowDict).map(function (id) {
                return dbRowDict[id];
            });
            return !result.length;
        }
        if (key[0] === "$") {
            result = local.dbRowListGetManyByOperator(result, fieldName, key, bb, not);
            return !result.length;
        }
        // recurse
        result = local.dbRowListGetManyByQuery(result, bb, key, not);
        return !result.length;
    });
    return result;
};

local.dbRowProject = function (dbRow, fieldList) {
/*
 * this function will deepcopy and project the dbRow with the given fieldList
 */
    var result;
    if (!dbRow) {
        return null;
    }
    // handle list-case
    if (Array.isArray(dbRow)) {
        return dbRow.map(function (dbRow) {
            // recurse
            return local.dbRowProject(dbRow, fieldList);
        });
    }
    // normalize to list
    if (!(Array.isArray(fieldList) && fieldList.length)) {
        fieldList = Object.keys(dbRow);
    }
    result = {};
    fieldList.forEach(function (key) {
        if (key[0] !== "$") {
            result[key] = dbRow[key];
        }
    });
    return JSON.parse(local.jsonStringifyOrdered(result));
};

local.dbRowSetId = function (dbRow, idIndex) {
/*
 * this function will if does not exist,
 * then set a random and unique id into dbRow for the given idIndex,
 */
    var id;
    id = dbRow[idIndex.name];
    if (typeof id !== "number" && typeof id !== "string") {
        do {
            id = idIndex.isInteger
            ? (1 + Math.random()) * 0x10000000000000
            : "a" + ((1 + Math.random()) * 0x10000000000000).toString(36).slice(1);
        // optimization - hasOwnProperty
        } while (idIndex.dict.hasOwnProperty(id));
        dbRow[idIndex.name] = id;
    }
    return id;
};

local.dbSave = function (onError) {
/*
 * this function will save the db to storage
 */
    var onParallel;
    onParallel = local.onParallel(function (error) {
        local.setTimeoutOnError(onError, 0, error);
    });
    onParallel.counter += 1;
    Object.keys(local.dbTableDict).forEach(function (key) {
        onParallel.counter += 1;
        local.dbTableDict[key].save(onParallel);
    });
    onParallel();
};

local.dbSeed = function (dbSeedList, onError) {
/*
 * this function will seed the db with the given dbSeedList
 */
    var dbTableDict;
    var onParallel;
    dbTableDict = {};
    onParallel = local.global.utility2_onReadyBefore || local.onParallel(onError);
    onParallel.counter += 1;
    // seed db
    onParallel.counter += 1;
    local.dbTableCreateMany(dbSeedList, onParallel);
    (dbSeedList || []).forEach(function (options) {
        dbTableDict[options.name] = true;
    });
    Object.keys(dbTableDict).forEach(function (name) {
        console.error("db - seeding dbTable " + name + " ...");
    });
    (local.global.utility2_onReadyAfter || local.nop)(onError);
    onParallel();
};

local.dbTableCreateMany = function (optionsList, onError) {
/*
 * this function will create many dbTables with the given optionsList
 */
    var onParallel;
    var result;
    onParallel = local.onParallel(function (error) {
        local.setTimeoutOnError(onError, 0, error, result);
    });
    onParallel.counter += 1;
    result = (optionsList || []).map(function (options) {
        onParallel.counter += 1;
        return local.dbTableCreateOne(options, onParallel);
    });
    return local.setTimeoutOnError(onParallel, 0, null, result);
};

local.dbTableCreateOne = function (options, onError) {
/*
 * this function will create a dbTable with the given options
 */
    var DbTable;
    var self;
    options = local.objectSetOverride(options);
    // register dbTable
    DbTable = local._DbTable;
    local.dbTableDict[options.name] = local.dbTableDict[options.name] || new DbTable(options);
    self = local.dbTableDict[options.name];
    self.sortDefault = options.sortDefault ||
            self.sortDefault ||
            [{fieldName: "_timeUpdated", isDescending: true}];
    // remove idIndex
    (options.idIndexRemoveList || []).forEach(function (idIndex) {
        self.idIndexRemove(idIndex);
    });
    // create idIndex
    (options.idIndexCreateList || []).forEach(function (idIndex) {
        self.idIndexCreate(idIndex);
    });
    // upsert dbRow
    self.crudSetManyById(options.dbRowList);
    // restore dbTable from persistent-storage
    self.isLoaded = self.isLoaded || options.isLoaded;
    if (!self.isLoaded) {
        local.storageGetItem("dbTable." + self.name + ".json", function (error, data) {
            // validate no error occurred
            local.assert(!error, error);
            if (!self.isLoaded) {
                local.dbImport(data);
            }
            self.isLoaded = true;
            local.setTimeoutOnError(onError, 0, null, self);
        });
        return self;
    }
    return local.setTimeoutOnError(onError, 0, null, self);
};

local.dbTableDict = {};

local.onEventDomDb = function (event) {
/*
 * this function will handle db dom-events
 */
    var ajaxProgressUpdate;
    var reader;
    var tmp;
    var utility2;
    utility2 = local.global.utility2 || {};
    ajaxProgressUpdate = utility2.ajaxProgressUpdate || local.nop;
    switch (event.target.dataset.onEventDomDb || event.target.id) {
    case "dbExportButton1":
        tmp = local.global.URL.createObjectURL(new local.global.Blob([local.dbExport()]));
        document.querySelector("#dbExportA1").href = tmp;
        document.querySelector("#dbExportA1").click();
        setTimeout(function () {
            local.global.URL.revokeObjectURL(tmp);
        }, 30000);
        break;
    case "dbImportButton1":
        tmp = document.querySelector("#dbImportInput1");
        if (!tmp.onEventDomDb) {
            tmp.onEventDomDb = local.onEventDomDb;
            tmp.addEventListener("change", local.onEventDomDb);
        }
        tmp.click();
        break;
    case "dbImportInput1":
        if (event.type !== "change") {
            return;
        }
        ajaxProgressUpdate();
        reader = new local.global.FileReader();
        tmp = document.querySelector("#dbImportInput1").files[0];
        if (!tmp) {
            return;
        }
        reader.addEventListener("load", function () {
            local.dbImport(reader.result);
            ajaxProgressUpdate();
        });
        reader.readAsText(tmp);
        break;
    case "dbResetButton1":
        ajaxProgressUpdate();
        local.dbReset(local.global.utility2_dbSeedList, function (error) {
            local.onErrorDefault(error);
            ((utility2.uiEventListenerDict || {})[".onEventUiReload"] || local.nop)();
        });
        break;
    }
};

local.sortCompare = function (aa, bb, ii, jj) {
/*
 * this function will compare aa vs bb and return:
 * -1 if aa < bb
 *  0 if aa === bb
 *  1 if aa > bb
 * the priority for comparing different typeof's is:
 * null < boolean < number < string < object < undefined
 */
    var typeof1;
    var typeof2;
    if (aa === bb) {
        return ii < jj
        ? -1
        : 1;
    }
    if (aa === null) {
        return -1;
    }
    if (bb === null) {
        return 1;
    }
    typeof1 = typeof aa;
    typeof2 = typeof bb;
    if (typeof1 === typeof2) {
        return typeof1 === "object"
        ? 0
        : aa > bb
        ? 1
        : -1;
    }
    if (typeof1 === "boolean") {
        return -1;
    }
    if (typeof2 === "boolean") {
        return 1;
    }
    if (typeof1 === "number") {
        return -1;
    }
    if (typeof2 === "number") {
        return 1;
    }
    if (typeof1 === "string") {
        return -1;
    }
    if (typeof2 === "string") {
        return 1;
    }
    return 0;
};
}());



// run node js-env code - init-after
/* istanbul ignore next */
(function () {
if (local.isBrowser) {
    return;
}



// init cli
if (module !== require.main || local.global.utility2_rollup) {
    return;
}
local.cliDict = {};
local.cliDict.dbTableCrudGetManyByQuery = function () {
/*
 * <dbTable> <query>
 * will get from <dbTable> with json <query>, <dbRowList>
 */
    local.dbTableCreateOne({name: process.argv[3]}, function (error, self) {
        // validate no error occurred
        local.assert(!error, error);
        console.log(JSON.stringify(self.crudGetManyByQuery(
            JSON.parse(process.argv[4] || "{}")
        ), null, 4));
    });
};

local.cliDict.dbTableCrudRemoveManyByQuery = function () {
/*
 * <dbTable> <query>
 * will remove from <dbTable> with json <query>, <dbRowList>
 */
    local.dbTableCreateOne({name: process.argv[3]}, function (error, self) {
        // validate no error occurred
        local.assert(!error, error);
        console.log(JSON.stringify(self.crudRemoveManyByQuery(
            JSON.parse(process.argv[4])
        ), null, 4));
    });
};

local.cliDict.dbTableCrudSetManyById = function () {
/*
 * <dbTable> <dbRowList>
 * will set in <dbTable>, <dbRowList>
 */
    local.dbTableCreateOne({name: process.argv[3]}, function (error, self) {
        // validate no error occurred
        local.assert(!error, error);
        self.crudSetManyById(JSON.parse(process.argv[4]));
    });
};

local.cliDict.dbTableHeaderDictGet = function () {
/*
 * <dbTable>
 * will get from <dbTable>, <headerDict>
 */
    local.dbTableCreateOne({name: process.argv[3]}, function (error, self) {
        // validate no error occurred
        local.assert(!error, error);
        var tmp;
        tmp = [];
        self.idIndexList.forEach(function (idIndex) {
            tmp.push({isInteger: idIndex.isInteger, name: idIndex.name});
        });
        console.log(JSON.stringify({
            idIndexList: tmp,
            sizeLimit: self.sizeLimit,
            sortDefault: self.sortDefault
        }, null, 4));
    });
};

local.cliDict.dbTableHeaderDictSet = function () {
/*
 * <dbTable> <headerDict>
 * will set in <dbTable>, <headerDict>
 */
    local.dbTableCreateOne({name: process.argv[3]}, function (error, self) {
        // validate no error occurred
        local.assert(!error, error);
        local.tmp = JSON.parse(process.argv[4]);
        self.sizeLimit = local.tmp.sizeLimit || self.sizeLimit;
        self.sortDefault = local.tmp.sortDefault || self.sortDefault;
        self.save();
        local.tmp = [];
        self.idIndexList.forEach(function (idIndex) {
            local.tmp.push({isInteger: idIndex.isInteger, name: idIndex.name});
        });
        local.cliDict.dbTableHeaderDictGet();
    });
};

local.cliDict.dbTableIdIndexCreate = function () {
/*
 * <dbTable> <idIndex>
 * will create in <dbTable>, <idIndex>
 */
    local.dbTableCreateOne({name: process.argv[3]}, function (error, self) {
        // validate no error occurred
        local.assert(!error, error);
        self.idIndexCreate(JSON.parse(process.argv[4]));
        self.save();
        local.tmp = [];
        self.idIndexList.forEach(function (idIndex) {
            local.tmp.push({isInteger: idIndex.isInteger, name: idIndex.name});
        });
        local.cliDict.dbTableHeaderDictGet();
    });
};

local.cliDict.dbTableIdIndexRemove = function () {
/*
 * <dbTable> <idIndex>
 * will remove from <dbTable>, <idIndex>
 */
    local.dbTableCreateOne({name: process.argv[3]}, function (error, self) {
        // validate no error occurred
        local.assert(!error, error);
        self.idIndexRemove(JSON.parse(process.argv[4]));
        self.save();
        local.cliDict.dbTableHeaderDictGet();
    });
};

local.cliDict.dbTableList = function () {
/*
 *
 * will get from db, <dbTableList>
 */
    local.storageKeys(function (error, data) {
        // validate no error occurred
        local.assert(!error, error);
        console.log(JSON.stringify(data.map(function (element) {
            return element.split(".").slice(1, -1).join(".");
        }), null, 4));
    });
};

local.cliDict.dbTableRemove = function () {
/*
 * <dbTable>
 * will remove from db, <dbTable>
 */
    local.storageRemoveItem("dbTable." + process.argv[3] + ".json", function (error) {
        // validate no error occurred
        local.assert(!error, error);
        local.cliDict.dbTableList();
    });
};

local.cliRun();
}());
}());
