#!/usr/bin/env node
/*
 * lib.puppeteer.js (2019.8.12)
 * https://github.com/kaizhu256/node-puppeteer-lite
 * this package will provide a zero-dependency version of puppeteer
 *
 */


/* istanbul instrument in package puppeteer */
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
    globalThis.utility2_puppeteer = local;
} else {
    module.exports = local;
    module.exports.__dirname = __dirname;
}
// init lib main
local.puppeteer = local;


/* validateLineSortedReset */
local.cliRun = function (opt) {
/*
 * this function will run cli with given <opt>
 */
    let cliDict;
    cliDict = local.cliDict;
    cliDict._eval = cliDict._eval || function () {
    /*
     * <code>
     * will eval <code>
     */
        globalThis.local = local;
        require("vm").runInThisContext(process.argv[3]);
    };
    cliDict._help = cliDict._help || function () {
    /*
     *
     * will print help
     */
        let commandList;
        let file;
        let packageJson;
        let str;
        let strDict;
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
            if (commandList[ii]) {
                commandList[ii].command.push(key);
                return;
            }
            try {
                commandList[ii] = opt.rgxComment.exec(str);
                commandList[ii] = {
                    argList: local.coalesce(commandList[ii][1], "").trim(),
                    command: [
                        key
                    ],
                    description: commandList[ii][2]
                };
            } catch (ignore) {
                local.assertOrThrow(undefined, new Error(
                    "cliRun - cannot parse comment in COMMAND "
                    + key
                    + ":\nnew RegExp("
                    + JSON.stringify(opt.rgxComment.source)
                    + ").exec(" + JSON.stringify(str).replace((
                        /\\\\/g
                    ), "\u0000").replace((
                        /\\n/g
                    ), "\\n\\\n").replace((
                        /\u0000/g
                    ), "\\\\") + ");"
                ));
            }
        });
        str = "";
        str += packageJson.name + " (" + packageJson.version + ")\n\n";
        str += commandList.filter(function (elem) {
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
                + "  " + elem.command.sort().join("|") + "  "
                + elem.argList.join("  ")
            );
        }).join("\n\n");
        console.log(str);
    };
    cliDict["--eval"] = cliDict["--eval"] || cliDict._eval;
    cliDict["--help"] = cliDict["--help"] || cliDict._help;
    cliDict["-e"] = cliDict["-e"] || cliDict._eval;
    cliDict["-h"] = cliDict["-h"] || cliDict._help;
    cliDict._default = cliDict._default || cliDict._help;
    cliDict.help = cliDict.help || cliDict._help;
    cliDict._interactive = cliDict._interactive || function () {
    /*
     *
     * will start interactive-mode
     */
        globalThis.local = local;
        local.identity(local.replStart || require("repl").start)({
            useGlobal: true
        });
    };
    cliDict["--interactive"] = cliDict["--interactive"] || cliDict._interactive;
    cliDict["-i"] = cliDict["-i"] || cliDict._interactive;
    cliDict._version = cliDict._version || function () {
    /*
     *
     * will print version
     */
        console.log(require(__dirname + "/package.json").version);
    };
    cliDict["--version"] = cliDict["--version"] || cliDict._version;
    cliDict["-v"] = cliDict["-v"] || cliDict._version;
    // default to --help command if no arguments are given
    if (process.argv.length <= 2) {
        cliDict._help();
        return;
    }
    if (cliDict[process.argv[2]]) {
        cliDict[process.argv[2]]();
        return;
    }
    cliDict._default();
};
}());


// /* istanbul ignore next */
// run node js-env code - function
(function () {
if (local.isBrowser) {
    return;
}
let BUFFER0;
BUFFER0 = Buffer.alloc(0);
/* jslint ignore:start */
const debugError = console.error;
const debugProtocol = function () {
    return;
}
const mime = {
    getType: function (file) {
        file = path.extname(String(file).toLowerCase());
        switch (file) {
        case ".png":
            return "image/png";
        case ".jpe":
        case ".jpeg":
        case ".jpg":
            return "image/jpeg";
        default:
            return file;
        }
    }
};
let EventEmitter = require("events");
let URL = require("url");
// let WebSocket = require("ws");
// let bufferUtil = require("bufferutil");
let childProcess = require("child_process");
// let debugError = require("debug")(`puppeteer:error`);
// let debugProtocol = require("debug")("puppeteer:protocol");
let fs = require("fs");
let http = require("http");
let https = require("https");
// let mime = require("mime");
let net = require("net");
let os = require("os");
let path = require("path");
let readline = require("readline");
let tls = require("tls");
let url = require("url");
let exports_puppeteer_puppeteer_index = {};
let exports_puppeteer_puppeteer_lib_Browser = {};
let exports_puppeteer_puppeteer_lib_BrowserFetcher = {};
let exports_puppeteer_puppeteer_lib_Connection = {};
let exports_puppeteer_puppeteer_lib_Coverage = {};
let exports_puppeteer_puppeteer_lib_DOMWorld = {};
let exports_puppeteer_puppeteer_lib_DeviceDescriptors = {};
let exports_puppeteer_puppeteer_lib_Dialog = {};
let exports_puppeteer_puppeteer_lib_EmulationManager = {};
let exports_puppeteer_puppeteer_lib_Errors = {};
let exports_puppeteer_puppeteer_lib_Events = {};
let exports_puppeteer_puppeteer_lib_ExecutionContext = {};
let exports_puppeteer_puppeteer_lib_FrameManager = {};
let exports_puppeteer_puppeteer_lib_Input = {};
let exports_puppeteer_puppeteer_lib_JSHandle = {};
let exports_puppeteer_puppeteer_lib_LifecycleWatcher = {};
let exports_puppeteer_puppeteer_lib_NetworkManager = {};
let exports_puppeteer_puppeteer_lib_Page = {};
let exports_puppeteer_puppeteer_lib_Puppeteer = {};
let exports_puppeteer_puppeteer_lib_Target = {};
let exports_puppeteer_puppeteer_lib_TaskQueue = {};
let exports_puppeteer_puppeteer_lib_TimeoutSettings = {};
let exports_puppeteer_puppeteer_lib_api = {};
let exports_puppeteer_puppeteer_lib_helper = {};
let exports_puppeteer_puppeteer_node6_lib_Puppeteer = {};
let exports_puppeteer_puppeteer_package_json = {};
let exports_websockets_ws_index = {};
let exports_websockets_ws_lib_buffer_util = {};
let exports_websockets_ws_lib_constants = {};
let exports_websockets_ws_lib_event_target = {};
let exports_websockets_ws_lib_extension = {};
let exports_websockets_ws_lib_validation = {};
let exports_websockets_ws_package_json = {};
/*
repo https://github.com/websockets/ws/tree/6.2.1
committed 2019-03-27T08:34:10Z
*/
/*
file https://github.com/websockets/ws/blob/6.2.1/package.json
*/
exports_websockets_ws_package_json = {
    "name": "ws",
    "version": "6.2.1",
    "description": "Simple to use, blazing fast and thoroughly tested websocket client and server for Node.js",
    "keywords": [
        "HyBi",
        "Push",
        "RFC-6455",
        "WebSocket",
        "WebSockets",
        "real-time"
    ],
    "homepage": "https://github.com/websockets/ws",
    "bugs": "https://github.com/websockets/ws/issues",
    "repository": "websockets/ws",
    "author": "Einar Otto Stangvik <einaros@gmail.com> (http://2x.io)",
    "license": "MIT",
    "main": "index.js",
    "browser": "browser.js",
    "files": [
        "browser.js",
        "index.js",
        "lib/*.js"
    ],
    "scripts": {
        "test": "npm run lint && nyc --reporter=html --reporter=text mocha test/*.test.js",
        "integration": "npm run lint && mocha test/*.integration.js",
        "lint": "eslint --ignore-path .gitignore . && prettier --check --ignore-path .gitignore \"**/*.{json,md,yml}\""
    },
    "dependencies": {
        "async-limiter": "~1.0.0"
    },
    "devDependencies": {
        "benchmark": "~2.1.4",
        "bufferutil": "~4.0.0",
        "coveralls": "~3.0.3",
        "eslint": "~5.15.0",
        "eslint-config-prettier": "~4.1.0",
        "eslint-plugin-prettier": "~3.0.0",
        "mocha": "~6.0.0",
        "nyc": "~13.3.0",
        "prettier": "~1.16.1",
        "utf-8-validate": "~5.0.0"
    }
}
/*
file https://github.com/websockets/ws/blob/6.2.1/lib/constants.js
*/
"use strict";
exports_websockets_ws_lib_constants = {
    GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
    kStatusCode: Symbol("status-code"),
};
/*
file https://github.com/websockets/ws/blob/6.2.1/lib/buffer-util.js
*/
"use strict";
/**
  * Masks a buffer using the given mask.
  *
  * @param {Buffer} source The buffer to mask
  * @param {Buffer} mask The mask to use
  * @param {Buffer} output The buffer where to store the result
  * @param {Number} offset The offset at which to start writing
  * @param {Number} length The number of bytes to mask.
  * @public
  */
function _mask(source, mask, output, offset, length) {
    for (var ii = 0; ii < length; ii++) {
        output[offset + ii] = source[ii] ^ mask[ii & 3];
    }
}
try {
//   const bufferUtil = require("bufferutil");
    const bu = bufferUtil.BufferUtil || bufferUtil;
    exports_websockets_ws_lib_buffer_util = {
        concat,
        mask(source, mask, output, offset, length) {
            if (length < 48) _mask(source, mask, output, offset, length);
            else bu.mask(source, mask, output, offset, length);
        },
    };
} catch (e) /* istanbul ignore next */ {
    exports_websockets_ws_lib_buffer_util = {
        mask: _mask,
    };
}
/*
file https://github.com/websockets/ws/blob/6.2.1/lib/event-target.js
*/
"use strict";
/**
  * Class representing an event.
  *
  * @private
  */
class Event {
    /**
      * Create a new `Event`.
      *
      * @param {String} type The name of the event
      * @param {Object} target A reference to the target to which the event was dispatched
      */
    constructor(type, target) {
        this.target = target;
        this.type = type;
    }
}
/**
  * Class representing a message event.
  *
  * @extends Event
  * @private
  */
class MessageEvent extends Event {
    /**
      * Create a new `MessageEvent`.
      *
      * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The received data
      * @param {WebSocket} target A reference to the target to which the event was dispatched
      */
    constructor(data, target) {
        super("message", target);
        this.data = data;
    }
}
/**
  * Class representing a close event.
  *
  * @extends Event
  * @private
  */
class CloseEvent extends Event {
    /**
      * Create a new `CloseEvent`.
      *
      * @param {Number} code The status code explaining why the connection is being closed
      * @param {String} reason A human-readable string explaining why the connection is closing
      * @param {WebSocket} target A reference to the target to which the event was dispatched
      */
    constructor(code, reason, target) {
        super("close", target);
        this.wasClean = target._closeFrameReceived && target._closeFrameSent;
        this.reason = reason;
        this.code = code;
    }
}
/**
  * Class representing an open event.
  *
  * @extends Event
  * @private
  */
class OpenEvent extends Event {
    /**
      * Create a new `OpenEvent`.
      *
      * @param {WebSocket} target A reference to the target to which the event was dispatched
      */
    constructor(target) {
        super("open", target);
    }
}
/**
  * Class representing an error event.
  *
  * @extends Event
  * @private
  */
class ErrorEvent extends Event {
    /**
      * Create a new `ErrorEvent`.
      *
      * @param {Object} error The error that generated this event
      * @param {WebSocket} target A reference to the target to which the event was dispatched
      */
    constructor(error, target) {
        super("error", target);
        this.message = error.message;
        this.error = error;
    }
}
/**
  * This provides methods for emulating the `EventTarget` interface. It's not
  * meant to be used directly.
  *
  * @mixin
  */
const EventTarget = {
    /**
      * Register an event listener.
      *
      * @param {String} method A string representing the event type to listen for
      * @param {Function} listener The listener to add
      * @public
      */
    addEventListener(method, listener) {
        if (typeof listener !== "function") return;
        function onMessage(data) {
            listener.call(this, new MessageEvent(data, this));
        }
        function onClose(code, message) {
            listener.call(this, new CloseEvent(code, message, this));
        }
        function onError(error) {
            listener.call(this, new ErrorEvent(error, this));
        }
        function onOpen() {
            listener.call(this, new OpenEvent(this));
        }
        if (method === "message") {
            onMessage._listener = listener;
            this.on(method, onMessage);
        } else if (method === "close") {
            onClose._listener = listener;
            this.on(method, onClose);
        } else if (method === "error") {
            onError._listener = listener;
            this.on(method, onError);
        } else if (method === "open") {
            onOpen._listener = listener;
            this.on(method, onOpen);
        } else {
            this.on(method, listener);
        }
    },
    /**
      * Remove an event listener.
      *
      * @param {String} method A string representing the event type to remove
      * @param {Function} listener The listener to remove
      * @public
      */
    removeEventListener(method, listener) {
        const listeners = this.listeners(method);
        for (var ii = 0; ii < listeners.length; ii++) {
            if (listeners[ii] === listener || listeners[ii]._listener === listener) {
                this.removeListener(method, listeners[ii]);
            }
        }
    }
};
exports_websockets_ws_lib_event_target = EventTarget;
/*
file https://github.com/websockets/ws/blob/6.2.1/lib/sender.js
*/
/* jslint ignore:end */
/*
file https://github.com/websockets/ws/blob/6.2.1/lib/websocket.js
*/
function Socket2(socket) {
/**
  * HyBi Sender implementation.
  */
    let ERR_PAYLOADMAX;
    let READ_HEADER;
    let READ_LENGTH16;
    let READ_LENGTH63;
    let READ_PAYLOAD;
    let bufList;
    let payloadLength;
    let readState;
    let that;
    function _read() {
        socket.resume();
    }
    function _write(payload, ignore, callback) {
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
        // init payloadLength
        payload = Buffer.from(payload);
        if (payload.length < 126) {
            header = header.slice(0, 2 + 0 + 4);
            header[1] |= payload.length;
        } else if (payload.length < 65536) {
            header = header.slice(0, 2 + 2 + 4);
            header[1] |= 126;
            header.writeUInt16BE(payload.length, 2);
        } else {
            header[1] |= 127;
            header.writeUInt32BE(payload.length, 6);
        }
        // init maskKey
        maskKey = require("crypto").randomBytes(4);
        maskKey.copy(header, header.length - 4);
        // send header
        socket.cork();
        socket.write(header);
        // send payload ^ maskKey
        payload.forEach(function (ignore, ii) {
            payload[ii] ^= maskKey[ii & 3];
        });
        // return write-result
        result = socket.write(payload, callback);
        socket.uncork();
        return result;
    }
    function bufListRead(nn) {
    /*
     * this function will read <nn> bytes from <bufList>
     */
        let buf;
        let result;
        if (nn === bufList[0].length) {
            return bufList.shift();
        }
        if (nn < bufList[0].length) {
            buf = bufList[0];
            bufList[0] = buf.slice(nn);
            return buf.slice(0, nn);
        }
        result = Buffer.allocUnsafe(nn);
        while (true) {
            buf = bufList.shift();
            buf.copy(result, result.length - nn);
            nn -= buf.length;
            if (nn <= 0) {
                break;
            }
        }
        return result;
    }
    function frameRead() {
    /*
     * this function will read from websocket-data-frame
     * https://tools.ietf.org/html/draft-ietf-hybi-thewebsocketprotocol-13#section-5.2
     *
     *  0               1               2               3
     *  0 1 2 3 4 5 6 7 0 1 2 3 4 5 6 7 0 1 2 3 4 5 6 7 0 1 2 3 4 5 6 7
     * +-+-+-+-+-------+-+-------------+-------------------------------+
     * |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
     * |I|S|S|S|  (4)  |A|     (7)     |             (16/63)           |
     * |N|V|V|V|       |S|             |   (if payload len==126/127)   |
     * | |1|2|3|       |K|             |                               |
     * +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
     * |     Extended payload length continued, if payload len == 127  |
     * + - - - - - - - - - - - - - - - +-------------------------------+
     * |                               |Masking-key, if MASK set to 1  |
     * +-------------------------------+-------------------------------+
     * | Masking-key (continued)       |          Payload Data         |
     * +-------------------------------- - - - - - - - - - - - - - - - +
     * :                     Payload Data continued ...                :
     * + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
     * |                     Payload Data continued ...                |
     * +---------------------------------------------------------------+
     *
     * |Opcode  | Meaning                             | Reference |
     * +--------+-------------------------------------+-----------|
     * | 0      | Continuation Frame                  | RFC XXXX  |
     * +--------+-------------------------------------+-----------|
     * | 1      | Text Frame                          | RFC XXXX  |
     * +--------+-------------------------------------+-----------|
     * | 2      | Binary Frame                        | RFC XXXX  |
     * +--------+-------------------------------------+-----------|
     * | 8      | Connection Close Frame              | RFC XXXX  |
     * +--------+-------------------------------------+-----------|
     * | 9      | Ping Frame                          | RFC XXXX  |
     * +--------+-------------------------------------+-----------|
     * | 10     | Pong Frame                          | RFC XXXX  |
     * +--------+-------------------------------------+-----------|
     */
        let buf;
        let opcode;
        if (bufList.reduce(function (aa, bb) {
            return aa + bb.length;
        }, 0) < (
            readState === READ_PAYLOAD
            ? Math.max(payloadLength, 1)
            : readState === READ_LENGTH63
            ? 8
            : 2
        )) {
            return;
        }
        switch (readState) {
        // read frame-header
        case READ_HEADER:
            buf = bufListRead(2);
            // validate opcode
            opcode = buf[0] & 0x0f;
            local.assertOrThrow(
                opcode === 0x01 || opcode === 0x02,
                new Error(
                    "Invalid WebSocket frame: opcode must be 0x01 or 0x02, not "
                    + opcode
                )
            );
            payloadLength = buf[1] & 0x7f;
            readState = (
                payloadLength === 126
                ? READ_LENGTH16
                : payloadLength === 127
                ? READ_LENGTH63
                : READ_PAYLOAD
            );
            break;
        // read frame-payload-length-16
        case READ_LENGTH16:
            payloadLength = bufListRead(2).readUInt16BE(0);
            readState = READ_PAYLOAD;
            break;
        // read frame-payload-length-63
        case READ_LENGTH63:
            buf = bufListRead(8);
            payloadLength = (
                buf.readUInt32BE(0) * 0x100000000 + buf.readUInt32BE(4)
            );
            readState = READ_PAYLOAD;
            break;
        // read frame-payload-data
        case READ_PAYLOAD:
            buf = (
                payloadLength
                ? bufListRead(payloadLength)
                : Buffer.alloc(0)
            );
            readState = READ_HEADER;
            that.push(buf);
            break;
        }
        local.assertOrThrow(payloadLength <= 256 * 1024 * 1024, ERR_PAYLOADMAX);
        return true;
    }
    // init that
    that = this;
    require("stream").Duplex.call(that);
    that._read2 = _read;
    that._write2 = _write;
    // init Reader
    function Reader() {
        require("stream").Transform.call(this);
    }
    require("util").inherits(Reader, require("stream").Transform);
    Reader.prototype._transform = function (chunk, ignore, callback) {
    /*
     * this function will implement Transform.prototype._transform
     */
        try {
            bufList.push(chunk);
            while (true) {
                if (!frameRead()) {
                    break;
                }
            }
            callback();
        } catch (errCaught) {
            this.destroy(errCaught);
        }
    };
    // pipe Reader
    ERR_PAYLOADMAX = new RangeError("Max payload size exceeded");
    READ_HEADER = 0;
    READ_LENGTH16 = 1;
    READ_LENGTH63 = 2;
    READ_PAYLOAD = 3;
    bufList = [];
    payloadLength = 0;
    readState = READ_HEADER;
    socket.pipe(new Reader());
}
// init Socket2
require("util").inherits(Socket2, require("stream").Duplex);
Socket2.prototype._read = function (...argList) {
    try {
        this._read2(...argList);
    } catch (errCaught) {
        this.destroy(errCaught);
    }
};
Socket2.prototype._write = function (...argList) {
    try {
        this._write2(...argList);
    } catch (errCaught) {
        this.destroy(errCaught);
    }
};

function WebSocket(address) {
    /**
      * Create a new `WebSocket`.
      *
      * @param {(String|url.Url|url.URL)} address The URL to which to connect
      * @param {(String|String[])} protocols The subprotocols
      * @param {Object} options Connection options
      */
    let cryptoKey;
    let ws2;
    let wsSend;
    ws2 = this;
    require("stream").EventEmitter.call(ws2);
    function close() {
/*
 * Start a closing handshake.
 *
 *          +----------+   +-----------+   +----------+
 *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
 *    |     +----------+   +-----------+   +----------+     |
 *          +----------+   +-----------+         |
 * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
 *          +----------+   +-----------+   |
 *    |           |                        |   +---+        |
 *                +------------------------+-->|fin| - - - -
 *    |         +---+                      |   +---+
 *     - - - - -|fin|<---------------------+
 *              +---+
 *
 * @param {Number} code Status code explaining why the connection is closing
 * @param {String} data A string explaining why the connection is closing
 * @public
 */
        if (ws2.readyState === WebSocket.CLOSED) {
            return;
        }
        if (ws2.readyState === WebSocket.CONNECTING) {
            throw new Error(
                "WebSocket was closed before the connection was established"
            );
        }
        if (ws2.readyState === WebSocket.CLOSING) {
            if (ws2._closeFrameSent && ws2._closeFrameReceived) {
                ws2._socket.end();
            }
            return;
        }
        ws2.readyState = WebSocket.CLOSING;
        ws2._socket.end();
        //
        // Specify a timeout for the closing handshake to complete.
        //
        ws2._closeTimer = setTimeout(
            ws2._socket.destroy.bind(ws2._socket),
            30000
        );
    }
    function emitClose() {
    /**
      * Emit the `"close"` event.
      *
      * @private
      */
        ws2.readyState = WebSocket.CLOSED;
        ws2.emit("close");
    }
    function send(data, options, cb) {
/**
  * Send a data message.
  *
  * @param {*} data The message to send
  * @param {Object} options Options object
  * @param {Boolean} options.binary Specifies whether `data` is binary or text
  * @param {Boolean} options.fin Specifies whether the fragment is the last one
  * @param {Function} cb Callback which is executed when data is written out
  * @public
  */
        if (typeof options === "function") {
            cb = options;
            options = {};
        }
        if (ws2.readyState !== WebSocket.OPEN) {
            const err = new Error(
                "WebSocket is not open: readyState " + ws2.readyState + "("
                + Array.from([
                    "CONNECTING", "OPEN", "CLOSING", "CLOSED"
                ])[ws2.readyState] + ")"
            );
            if (cb) {
                return cb(err);
            }
            throw err;
        }
        if (typeof data === "number") {
            data = data.toString();
        }
        wsSend.write(data || BUFFER0, cb);
    }
    //!! ws2 = this;
    //!! require("stream").Transform.call(ws2);
    ws2.close = close;
    ws2.emitClose = emitClose;
    ws2.send = send;
    ws2.readyState = WebSocket.CONNECTING;
    ws2.protocol = "";
    // initAsClient
    cryptoKey = require("crypto").randomBytes(16).toString("base64");
    require("http").get(Object.assign(require("url").parse(
        address
    ), {
        "createConnection": function (opt) {
            return require("net").connect(Object.assign(opt, {
                path: opt.socketPath
            }));
        },
        "defaultPort": 80,
        "followRedirects": false,
        "headers": {
            "Connection": "Upgrade",
            "Sec-WebSocket-Key": cryptoKey,
            "Sec-WebSocket-Version": 13,
            "Upgrade": "websocket"
        },
        "maxRedirects": 10,
        "protocol": "http:",
        "protocolVersion": 13
    })).once("upgrade", function (res, socket, head) {
        function socketOnEnd() {
            ws2.readyState = WebSocket.CLOSING;
            socket.end();
        }
        wsSend = new Socket2(socket); // jslint ignore:line
        wsSend.on("data", function (payload) {
            ws2.emit("message", payload.toString());
        });
        ws2.emit("upgrade", res);
        // The user may have closed the connection from a listener
        // of the `upgrade` event.
        if (ws2.readyState !== WebSocket.CONNECTING) {
            return;
        }
        local.assertOrThrow(
            (
                res.headers["sec-websocket-accept"]
                === require("crypto").createHash("sha1").update(
                    cryptoKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
                ).digest("base64")
            ),
            new Error("Invalid Sec-WebSocket-Accept header")
        );
/**
* Set up the socket and the internal resources.
*
* @param {net.Socket} socket The network socket between the server and client
* @param {Buffer} head The first packet of the upgraded stream
* @private
*/
        //!! ws2.setSocket(socket, head);
        ws2._socket = socket;
        socket.setTimeout(0);
        socket.setNoDelay();
        if (head.length > 0) {
            socket.unshift(head);
        }
        socket.once("close", function () {
            socket.removeListener("end", socketOnEnd);
            ws2.readyState = WebSocket.CLOSING;
// The close frame might not have been received or the `"end"` event emitted,
// for example, if the socket was destroyed due to an error. Ensure that the
// `receiver` stream is closed after writing any remaining buffered data to
// it. If the readable side of the socket is in flowing mode then there is no
// buffered data as everything has been already written and `readable.read()`
// will return `null`. If instead, the socket is paused, any possible buffered
// data will be read as a single chunk and emitted synchronously in a single
// `"data"` event.
            ws2._socket.read();
            clearTimeout(ws2._closeTimer);
            ws2.emitClose();
        });
        socket.on("end", socketOnEnd);
        socket.once("error", function () {
            socket.on("error", local.noop);
            ws2.readyState = WebSocket.CLOSING;
            socket.destroy();
        });
        ws2.readyState = WebSocket.OPEN;
        ws2.emit("open");
    });
}
require("util").inherits(WebSocket, require("stream").EventEmitter);
/* jslint ignore:start */
WebSocket.prototype.addEventListener = EventTarget.addEventListener;
WebSocket.prototype.removeEventListener = EventTarget.removeEventListener;
["CONNECTING", "OPEN", "CLOSING", "CLOSED"].forEach(function (readyState, ii) {
    WebSocket[readyState] = ii;
});
/*
file https://github.com/websockets/ws/blob/6.2.1/index.js
*/
"use strict";
exports_websockets_ws_index = WebSocket;
/*
repo https://github.com/puppeteer/puppeteer/tree/v1.19.0
committed 2019-07-23T05:02:45Z
*/
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/package.json
*/
exports_puppeteer_puppeteer_package_json = {
    "name": "puppeteer",
    "version": "1.19.0",
    "description": "A high-level API to control headless Chrome over the DevTools Protocol",
    "main": "index.js",
    "repository": "github:GoogleChrome/puppeteer",
    "engines": {
        "node": ">=6.4.0"
    },
    "puppeteer": {
        "chromium_revision": "674921"
    },
    "scripts": {
        "unit": "node test/test.js",
        "funit": "BROWSER=firefox node test/test.js",
        "debug-unit": "node --inspect-brk test/test.js",
        "test-doclint": "node utils/doclint/check_public_api/test/test.js && node utils/doclint/preprocessor/test.js",
        "test": "npm run lint --silent && npm run coverage && npm run test-doclint && npm run test-node6-transformer && npm run test-types",
        "install": "node install.js",
        "lint": "([ \"$CI\" = true ] && eslint --quiet -f codeframe . || eslint .) && npm run tsc && npm run doc",
        "doc": "node utils/doclint/cli.js",
        "coverage": "cross-env COVERAGE=true npm run unit",
        "test-node6-transformer": "node utils/node6-transform/test/test.js",
        "build": "node utils/node6-transform/index.js && node utils/doclint/generate_types",
        "unit-node6": "node node6/test/test.js",
        "tsc": "tsc -p .",
        "prepublishOnly": "npm run build",
        "apply-next-version": "node utils/apply_next_version.js",
        "bundle": "npx browserify -r ./index.js:puppeteer -o utils/browser/puppeteer-web.js",
        "test-types": "node utils/doclint/generate_types && npx -p typescript@2.1 tsc -p utils/doclint/generate_types/test/",
        "unit-bundle": "node utils/browser/test.js"
    },
    "author": "The Chromium Authors",
    "license": "Apache-2.0",
    "dependencies": {
        "debug": "^4.1.0",
        "extract-zip": "^1.6.6",
        "https-proxy-agent": "^2.2.1",
        "mime": "^2.0.3",
        "progress": "^2.0.1",
        "proxy-from-env": "^1.0.0",
        "rimraf": "^2.6.1",
        "ws": "^6.1.0"
    },
    "devDependencies": {
        "@types/debug": "0.0.31",
        "@types/extract-zip": "^1.6.2",
        "@types/mime": "^2.0.0",
        "@types/node": "^8.10.34",
        "@types/rimraf": "^2.0.2",
        "@types/ws": "^6.0.1",
        "commonmark": "^0.28.1",
        "cross-env": "^5.0.5",
        "eslint": "^5.15.1",
        "esprima": "^4.0.0",
        "jpeg-js": "^0.3.4",
        "minimist": "^1.2.0",
        "ncp": "^2.0.0",
        "pixelmatch": "^4.0.2",
        "pngjs": "^3.3.3",
        "text-diff": "^1.0.1",
        "typescript": "3.2.2"
    },
    "browser": {
        "./lib/BrowserFetcher.js": false,
        "./node6/lib/Puppeteer": false,
        "ws": "./utils/browser/WebSocket",
        "fs": false,
        "child_process": false,
        "rimraf": false,
        "readline": false
    }
}
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/helper.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
// const {TimeoutError} = exports_puppeteer_puppeteer_lib_Errors;
// const debugError = require("debug")(`puppeteer:error`);
// const fs = require("fs");
class Helper {
    /**
      * @param {Function|string} fun
      * @param {!Array<*>} args
      * @return {string}
      */
    static evaluationString(fun, ...args) {
        if (Helper.isString(fun)) {
            assert(args.length === 0, "Cannot evaluate a string with arguments");
            return /** @type {string} */ (fun);
        }
        return `(${fun})(${args.map(serializeArgument).join(",")})`;
        /**
          * @param {*} arg
          * @return {string}
          */
        function serializeArgument(arg) {
            if (Object.is(arg, undefined)) {
                return "undefined";
            }
            return JSON.stringify(arg);
        }
    }
    /**
      * @param {!Protocol.Runtime.ExceptionDetails} exceptionDetails
      * @return {string}
      */
    static getExceptionMessage(exceptionDetails) {
        if (exceptionDetails.exception) {
            return exceptionDetails.exception.description || exceptionDetails.exception.value;
        }
        let message = exceptionDetails.text;
        if (exceptionDetails.stackTrace) {
            for (const callframe of exceptionDetails.stackTrace.callFrames) {
                const location = callframe.url + ":" + callframe.lineNumber + ":" + callframe.columnNumber;
                const functionName = callframe.functionName || "<anonymous>";
                message += `\n    at ${functionName} (${location})`;
            }
        }
        return message;
    }
    /**
      * @param {!Protocol.Runtime.RemoteObject} remoteObject
      * @return {*}
      */
    static valueFromRemoteObject(remoteObject) {
        assert(!remoteObject.objectId, "Cannot extract value when objectId is given");
        if (remoteObject.unserializableValue) {
            if (remoteObject.type === "bigint" && typeof BigInt !== "undefined")
                return BigInt(remoteObject.unserializableValue.replace("n", ""));
            switch (remoteObject.unserializableValue) {
                case "-0":
                    return -0;
                case "NaN":
                    return NaN;
                case "Infinity":
                    return Infinity;
                case "-Infinity":
                    return -Infinity;
                default:
                    throw new Error("Unsupported unserializable value: " + remoteObject.unserializableValue);
            }
        }
        return remoteObject.value;
    }
    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {!Protocol.Runtime.RemoteObject} remoteObject
      */
    static async releaseObject(client, remoteObject) {
        if (!remoteObject.objectId)
            return;
        await client.send("Runtime.releaseObject", {objectId: remoteObject.objectId}).catch(error => {
            // Exceptions might happen in case of a page been navigated or closed.
            // Swallow these since they are harmless and we don't leak anything in this case.
            debugError(error);
        });
    }
    /**
      * @param {!Object} classType
      */
    static installAsyncStackHooks(classType) {
        for (const methodName of Reflect.ownKeys(classType.prototype)) {
            const method = Reflect.get(classType.prototype, methodName);
            if (methodName === "constructor" || typeof methodName !== "string" || methodName.startsWith("_") || typeof method !== "function" || method.constructor.name !== "AsyncFunction")
                continue;
            Reflect.set(classType.prototype, methodName, function(...args) {
                const syncStack = {};
                Error.captureStackTrace(syncStack);
                return method.call(this, ...args).catch(e => {
                    const stack = syncStack.stack.substring(syncStack.stack.indexOf("\n") + 1);
                    const clientStack = stack.substring(stack.indexOf("\n"));
                    if (e instanceof Error && e.stack && !e.stack.includes(clientStack))
                        e.stack += "\n  -- ASYNC --\n" + stack;
                    throw e;
                });
            });
        }
    }
    /**
      * @param {!NodeJS.EventEmitter} emitter
      * @param {(string|symbol)} eventName
      * @param {function(?):void} handler
      * @return {{emitter: !NodeJS.EventEmitter, eventName: (string|symbol), handler: function(?)}}
      */
    static addEventListener(emitter, eventName, handler) {
        emitter.on(eventName, handler);
        return { emitter, eventName, handler };
    }
    /**
      * @param {!Array<{emitter: !NodeJS.EventEmitter, eventName: (string|symbol), handler: function(?):void}>} listeners
      */
    static removeEventListeners(listeners) {
        for (const listener of listeners)
            listener.emitter.removeListener(listener.eventName, listener.handler);
        listeners.splice(0, listeners.length);
    }
    /**
      * @param {!Object} obj
      * @return {boolean}
      */
    static isString(obj) {
        return typeof obj === "string" || obj instanceof String;
    }
    /**
      * @param {!Object} obj
      * @return {boolean}
      */
    static isNumber(obj) {
        return typeof obj === "number" || obj instanceof Number;
    }
    static promisify(nodeFunction) {
        function promisified(...args) {
            return new Promise((resolve, reject) => {
                function callback(err, ...result) {
                    if (err)
                        return reject(err);
                    if (result.length === 1)
                        return resolve(result[0]);
                    return resolve(result);
                }
                nodeFunction.call(null, ...args, callback);
            });
        }
        return promisified;
    }
    /**
      * @param {!NodeJS.EventEmitter} emitter
      * @param {(string|symbol)} eventName
      * @param {function} predicate
      * @return {!Promise}
      */
    static waitForEvent(emitter, eventName, predicate, timeout) {
        let eventTimeout, resolveCallback, rejectCallback;
        const promise = new Promise((resolve, reject) => {
            resolveCallback = resolve;
            rejectCallback = reject;
        });
        const listener = Helper.addEventListener(emitter, eventName, event => {
            if (!predicate(event))
                return;
            cleanup();
            resolveCallback(event);
        });
        if (timeout) {
            eventTimeout = setTimeout(() => {
                cleanup();
                rejectCallback(new TimeoutError("Timeout exceeded while waiting for event"));
            }, timeout);
        }
        function cleanup() {
            Helper.removeEventListeners([listener]);
            clearTimeout(eventTimeout);
        }
        return promise;
    }
    /**
      * @template T
      * @param {!Promise<T>} promise
      * @param {string} taskName
      * @param {number} timeout
      * @return {!Promise<T>}
      */
    static async waitWithTimeout(promise, taskName, timeout) {
        let reject;
        const timeoutError = new TimeoutError(`waiting for ${taskName} failed: timeout ${timeout}ms exceeded`);
        const timeoutPromise = new Promise((resolve, x) => reject = x);
        let timeoutTimer = null;
        if (timeout)
            timeoutTimer = setTimeout(() => reject(timeoutError), timeout);
        try {
            return await Promise.race([promise, timeoutPromise]);
        } finally {
            if (timeoutTimer)
                clearTimeout(timeoutTimer);
        }
    }
    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {string} handle
      * @param {?string} path
      * @return {!Promise<!Buffer>}
      */
    static async readProtocolStream(client, handle, path) {
        let eof = false;
        let file;
        if (path)
            file = await openAsync(path, "w");
        const bufs = [];
        while (!eof) {
            const response = await client.send("IO.read", {handle});
            eof = response.eof;
            const buf = Buffer.from(response.data, response.base64Encoded ? "base64" : undefined);
            bufs.push(buf);
            if (path)
                await writeAsync(file, buf);
        }
        if (path)
            await closeAsync(file);
        await client.send("IO.close", {handle});
        let resultBuffer = null;
        try {
            resultBuffer = Buffer.concat(bufs);
        } finally {
            return resultBuffer;
        }
    }
}
const openAsync = Helper.promisify(fs.open);
const writeAsync = Helper.promisify(fs.write);
const closeAsync = Helper.promisify(fs.close);
/**
  * @param {*} value
  * @param {string=} message
  */
function assert(value, message) {
    if (!value)
        throw new Error(message);
}
exports_puppeteer_puppeteer_lib_helper = {
    helper: Helper,
    assert,
    debugError
};
// hack-puppeteer - init helper
let helper = exports_puppeteer_puppeteer_lib_helper.helper;
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/Browser.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
// const { helper, assert } = exports_puppeteer_puppeteer_lib_helper;
// const {Target} = exports_puppeteer_puppeteer_lib_Target;
// const EventEmitter = require("events");
// const {TaskQueue} = exports_puppeteer_puppeteer_lib_TaskQueue;
// const {Events} = exports_puppeteer_puppeteer_lib_Events;
function Browser(connection, contextIds, ignoreHTTPSErrors, defaultViewport, process, closeCallback) {
    /**
      * @param {!Puppeteer.Connection} connection
      * @param {!Array<string>} contextIds
      * @param {boolean} ignoreHTTPSErrors
      * @param {?Puppeteer.Viewport} defaultViewport
      * @param {?Puppeteer.ChildProcess} process
      * @param {(function():Promise)=} closeCallback
      */
        require("stream").EventEmitter.call(this);
        this._ignoreHTTPSErrors = ignoreHTTPSErrors;
        this._defaultViewport = defaultViewport;
        this._process = process;
        this._screenshotTaskQueue = new TaskQueue();
        this._connection = connection;
        this._closeCallback = closeCallback || new Function();
        this._defaultContext = new BrowserContext(this._connection, this, null);
        /** @type {Map<string, BrowserContext>} */
        this._contexts = new Map();
        contextIds.forEach(function (contextId) {
            this._contexts.set(contextId, new BrowserContext(this._connection, this, contextId));
        });
        /** @type {Map<string, Target>} */
        this._targets = new Map();
        this._connection.on(Events.Connection.Disconnected, () => this.emit(Events.Browser.Disconnected));
        this._connection.on("Target.targetCreated", this._targetCreated.bind(this));
        this._connection.on("Target.targetDestroyed", this._targetDestroyed.bind(this));
        this._connection.on("Target.targetInfoChanged", this._targetInfoChanged.bind(this));
}
require("util").inherits(Browser, require("stream").EventEmitter);
Browser.create = async function(connection, contextIds, ignoreHTTPSErrors, defaultViewport, process, closeCallback) {
    const browser = new Browser(connection, contextIds, ignoreHTTPSErrors, defaultViewport, process, closeCallback);
    await connection.send("Target.setDiscoverTargets", {discover: true});
    return browser;
};
/**
  * @return {?Puppeteer.ChildProcess}
  */
Browser.prototype.process = function() {
    return this._process;
};
/**
  * @return {!Promise<!BrowserContext>}
  */
Browser.prototype.createIncognitoBrowserContext = async function() {
    const {browserContextId} = await this._connection.send("Target.createBrowserContext");
    const context = new BrowserContext(this._connection, this, browserContextId);
    this._contexts.set(browserContextId, context);
    return context;
};
/**
  * @return {!Array<!BrowserContext>}
  */
Browser.prototype.browserContexts = function() {
    return [this._defaultContext, ...Array.from(this._contexts.values())];
};
/**
  * @return {!BrowserContext}
  */
Browser.prototype.defaultBrowserContext = function() {
    return this._defaultContext;
};
/**
  * @param {?string} contextId
  */
Browser.prototype._disposeContext = async function(contextId) {
    await this._connection.send("Target.disposeBrowserContext", {browserContextId: contextId || undefined});
    this._contexts.delete(contextId);
};
/**
  * @param {!Protocol.Target.targetCreatedPayload} event
  */
Browser.prototype._targetCreated = async function(event) {
    const targetInfo = event.targetInfo;
    const {browserContextId} = targetInfo;
    const context = (browserContextId && this._contexts.has(browserContextId)) ? this._contexts.get(browserContextId) : this._defaultContext;
    const target = new Target(targetInfo, context, () => this._connection.createSession(targetInfo), this._ignoreHTTPSErrors, this._defaultViewport, this._screenshotTaskQueue);
    assert(!this._targets.has(event.targetInfo.targetId), "Target should not exist before targetCreated");
    this._targets.set(event.targetInfo.targetId, target);
    if (await target._initializedPromise) {
        this.emit(Events.Browser.TargetCreated, target);
        context.emit(Events.BrowserContext.TargetCreated, target);
    }
};
/**
  * @param {{targetId: string}} event
  */
Browser.prototype._targetDestroyed = async function(event) {
    const target = this._targets.get(event.targetId);
    target._initializedCallback(false);
    this._targets.delete(event.targetId);
    target._closedCallback();
    if (await target._initializedPromise) {
        this.emit(Events.Browser.TargetDestroyed, target);
        target.browserContext().emit(Events.BrowserContext.TargetDestroyed, target);
    }
};
/**
  * @param {!Protocol.Target.targetInfoChangedPayload} event
  */
Browser.prototype._targetInfoChanged = function(event) {
    const target = this._targets.get(event.targetInfo.targetId);
    assert(target, "target should exist before targetInfoChanged");
    const previousURL = target.url();
    const wasInitialized = target._isInitialized;
    target._targetInfoChanged(event.targetInfo);
    if (wasInitialized && previousURL !== target.url()) {
        this.emit(Events.Browser.TargetChanged, target);
        target.browserContext().emit(Events.BrowserContext.TargetChanged, target);
    }
};
/**
  * @return {string}
  */
Browser.prototype.wsEndpoint = function() {
    return this._connection.url();
};
/**
  * @return {!Promise<!Puppeteer.Page>}
  */
Browser.prototype.newPage = async function() {
    return this._defaultContext.newPage();
};
/**
  * @param {?string} contextId
  * @return {!Promise<!Puppeteer.Page>}
  */
Browser.prototype._createPageInContext = async function(contextId) {
    const {targetId} = await this._connection.send("Target.createTarget", {url: "about:blank", browserContextId: contextId || undefined});
    const target = await this._targets.get(targetId);
    assert(await target._initializedPromise, "Failed to create target for page");
    const page = await target.page();
    return page;
};
/**
  * @return {!Array<!Target>}
  */
Browser.prototype.targets = function() {
    return Array.from(this._targets.values()).filter(function (target) {
        return target._isInitialized;
    });
};
/**
  * @return {!Target}
  */
Browser.prototype.target = function() {
    return this.targets().find(function (target) {
        return target.type() === "browser";
    });
};
/**
  * @param {function(!Target):boolean} predicate
  * @param {{timeout?: number}=} options
  * @return {!Promise<!Target>}
  */
Browser.prototype.waitForTarget = async function(predicate, options = {}) {
    const {
        timeout = 30000
    } = options;
    const existingTarget = this.targets().find(predicate);
    if (existingTarget) {
        return existingTarget;
    }
    let resolve;
    const targetPromise = new Promise(function (x) {
        resolve = x;
        return resolve;
    });
    this.on(Events.Browser.TargetCreated, check);
    this.on(Events.Browser.TargetChanged, check);
    try {
        if (!timeout) {
            return await targetPromise;
        }
        return await helper.waitWithTimeout(targetPromise, "target", timeout);
    } catch (ignore) {
    } finally {
        this.removeListener(Events.Browser.TargetCreated, check);
        this.removeListener(Events.Browser.TargetChanged, check);
    }
    /**
      * @param {!Target} target
      */
    function check(target) {
        if (predicate(target)) {
            resolve(target);
        }
    }
};
/**
  * @return {!Promise<!Array<!Puppeteer.Page>>}
  */
Browser.prototype.pages = async function() {
    const contextPages = await Promise.all(this.browserContexts().map(function (context) {
        return context.pages();
    }));
    // Flatten array.
    return contextPages.reduce(function (acc, x) { return acc.concat(x); }, []);
};
/**
  * @return {!Promise<string>}
  */
Browser.prototype.version = async function() {
    const version = await this._getVersion();
    return version.product;
};
/**
  * @return {!Promise<string>}
  */
Browser.prototype.userAgent = async function() {
    const version = await this._getVersion();
    return version.userAgent;
};
Browser.prototype.close = async function() {
    await this._closeCallback.call(null);
    this.disconnect();
};
Browser.prototype.disconnect = function() {
    this._connection.dispose();
};
/**
  * @return {boolean}
  */
Browser.prototype.isConnected = function() {
    return !this._connection._closed;
};
/**
  * @return {!Promise<!Object>}
  */
Browser.prototype._getVersion = function() {
    return this._connection.send("Browser.getVersion");
};
class BrowserContext extends EventEmitter {
    /**
      * @param {!Puppeteer.Connection} connection
      * @param {!Browser} browser
      * @param {?string} contextId
      */
    constructor(connection, browser, contextId) {
        super();
        this._connection = connection;
        this._browser = browser;
        this._id = contextId;
    }
    /**
      * @return {!Array<!Target>} target
      */
    targets() {
        return this._browser.targets().filter(function (target) {return target.browserContext() === this; });
    }
    /**
      * @param {function(!Target):boolean} predicate
      * @param {{timeout?: number}=} options
      * @return {!Promise<!Target>}
      */
    waitForTarget(predicate, options) {
        return this._browser.waitForTarget(function (target) { return target.browserContext() === this && predicate(target) }, options);
    }
    /**
      * @return {!Promise<!Array<!Puppeteer.Page>>}
      */
    async pages() {
        const pages = await Promise.all(
                this.targets()
                        .filter(function (target) { return target.type() === "page"; })
                        .map(function (target) { return target.page(); })
        );
        return pages.filter(function (page) { return !!page; });
    }
    /**
      * @return {boolean}
      */
    isIncognito() {
        return !!this._id;
    }
    /**
      * @param {string} origin
      * @param {!Array<string>} permissions
      */
    async overridePermissions(origin, permissions) {
        const webPermissionToProtocol = new Map([
            ["geolocation", "geolocation"],
            ["midi", "midi"],
            ["notifications", "notifications"],
            ["push", "push"],
            ["camera", "videoCapture"],
            ["microphone", "audioCapture"],
            ["background-sync", "backgroundSync"],
            ["ambient-light-sensor", "sensors"],
            ["accelerometer", "sensors"],
            ["gyroscope", "sensors"],
            ["magnetometer", "sensors"],
            ["accessibility-events", "accessibilityEvents"],
            ["clipboard-read", "clipboardRead"],
            ["clipboard-write", "clipboardWrite"],
            ["payment-handler", "paymentHandler"],
            // chrome-specific permissions we have.
            ["midi-sysex", "midiSysex"],
        ]);
        permissions = permissions.map(function (permission) {
            const protocolPermission = webPermissionToProtocol.get(permission);
            if (!protocolPermission)
                throw new Error("Unknown permission: " + permission);
            return protocolPermission;
        });
        await this._connection.send("Browser.grantPermissions", {origin, browserContextId: this._id || undefined, permissions});
    }
    async clearPermissionOverrides() {
        await this._connection.send("Browser.resetPermissions", {browserContextId: this._id || undefined});
    }
    /**
      * @return {!Promise<!Puppeteer.Page>}
      */
    newPage() {
        return this._browser._createPageInContext(this._id);
    }
    /**
      * @return {!Browser}
      */
    browser() {
        return this._browser;
    }
    async close() {
        assert(this._id, "Non-incognito profiles cannot be closed!");
        await this._browser._disposeContext(this._id);
    }
};
exports_puppeteer_puppeteer_lib_Browser = {Browser, BrowserContext};
/* jslint ignore:end */
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/Connection.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
// const {assert} = exports_puppeteer_puppeteer_lib_helper;
// const {Events} = exports_puppeteer_puppeteer_lib_Events;
// const debugProtocol = require("debug")("puppeteer:protocol");
// const EventEmitter = require("events");
class Connection extends EventEmitter {
    /**
      * @param {string} url
      * @param {!Puppeteer.ConnectionTransport} transport
      * @param {number=} delay
      */
    constructor(url, ws, delay = 0) {
        super();
        this._url = url;
        this._lastId = 0;
        /** @type {!Map<number, {resolve: function, reject: function, error: !Error, method: string}>}*/
        this._callbacks = new Map();
        this._delay = delay;
        this._ws = ws;
        let ws2 = this._ws;
        ws2.addEventListener("message", function (event) {
            if (this.onmessage) {
                this.onmessage.call(null, event.data);
            }
        });
        ws2.addEventListener("close", function (event) {
            if (this.onclose) {
                this.onclose.call(null);
            }
        });
        // Silently ignore all errors - we don't know what to do with them.
        ws2.addEventListener("error", local.noop);
        this.onmessage = this._onMessage.bind(this);
        this.onclose = this._onClose.bind(this);
        /** @type {!Map<string, !CDPSession>}*/
        this._sessions = new Map();
        this._closed = false;
    }
    /**
      * @param {!CDPSession} session
      * @return {!Connection}
      */
    static fromSession(session) {
        return session._connection;
    }
    /**
      * @param {string} sessionId
      * @return {?CDPSession}
      */
    session(sessionId) {
        return this._sessions.get(sessionId) || null;
    }
    /**
      * @return {string}
      */
    url() {
        return this._url;
    }
    /**
      * @param {string} method
      * @param {!Object=} params
      * @return {!Promise<?Object>}
      */
    send(method, params = {}) {
        const id = this._rawSend({method, params});
        return new Promise((resolve, reject) => {
            this._callbacks.set(id, {resolve, reject, error: new Error(), method});
        });
    }
    /**
      * @param {*} message
      * @return {number}
      */
    _rawSend(message) {
        const id = ++this._lastId;
        message = JSON.stringify(Object.assign({}, message, {id}));
        debugProtocol("SEND ► " + message);
        let ws2 = this._ws;
        ws2.send(message);
        return id;
    }
    /**
      * @param {string} message
      */
    async _onMessage(message) {
        if (this._delay) {
            await new Promise(function (f) { return setTimeout(f, this._delay); });
        }
        debugProtocol("◀ RECV " + message);
        const object = JSON.parse(message);
        if (object.method === "Target.attachedToTarget") {
            const sessionId = object.params.sessionId;
            const session = new CDPSession(this, object.params.targetInfo.type, sessionId);
            this._sessions.set(sessionId, session);
        } else if (object.method === "Target.detachedFromTarget") {
            const session = this._sessions.get(object.params.sessionId);
            if (session) {
                session._onClosed();
                this._sessions.delete(object.params.sessionId);
            }
        }
        if (object.sessionId) {
            const session = this._sessions.get(object.sessionId);
            if (session)
                session._onMessage(object);
        } else if (object.id) {
            const callback = this._callbacks.get(object.id);
            // Callbacks could be all rejected if someone has called `.dispose()`.
            if (callback) {
                this._callbacks.delete(object.id);
                if (object.error)
                    callback.reject(createProtocolError(callback.error, callback.method, object));
                else
                    callback.resolve(object.result);
            }
        } else {
            this.emit(object.method, object.params);
        }
    }
    _onClose() {
        if (this._closed)
            return;
        this._closed = true;
        this.onmessage = null;
        this.onclose = null;
        for (const callback of this._callbacks.values())
            callback.reject(rewriteError(callback.error, `Protocol error (${callback.method}): Target closed.`));
        this._callbacks.clear();
        for (const session of this._sessions.values())
            session._onClosed();
        this._sessions.clear();
        this.emit(Events.Connection.Disconnected);
    }
    dispose() {
        this._onClose();
        let ws2 = this._ws;
        ws2.close();
    }
    /**
      * @param {Protocol.Target.TargetInfo} targetInfo
      * @return {!Promise<!CDPSession>}
      */
    async createSession(targetInfo) {
        const {sessionId} = await this.send("Target.attachToTarget", {targetId: targetInfo.targetId, flatten: true});
        return this._sessions.get(sessionId);
    }
}
class CDPSession extends EventEmitter {
    /**
      * @param {!Connection} connection
      * @param {string} targetType
      * @param {string} sessionId
      */
    constructor(connection, targetType, sessionId) {
        super();
        /** @type {!Map<number, {resolve: function, reject: function, error: !Error, method: string}>}*/
        this._callbacks = new Map();
        this._connection = connection;
        this._targetType = targetType;
        this._sessionId = sessionId;
    }
    /**
      * @param {string} method
      * @param {!Object=} params
      * @return {!Promise<?Object>}
      */
    send(method, params = {}) {
        if (!this._connection)
            return Promise.reject(new Error(`Protocol error (${method}): Session closed. Most likely the ${this._targetType} has been closed.`));
        const id = this._connection._rawSend({sessionId: this._sessionId, method, params});
        return new Promise((resolve, reject) => {
            this._callbacks.set(id, {resolve, reject, error: new Error(), method});
        });
    }
    /**
      * @param {{id?: number, method: string, params: Object, error: {message: string, data: any}, result?: *}} object
      */
    _onMessage(object) {
        if (object.id && this._callbacks.has(object.id)) {
            const callback = this._callbacks.get(object.id);
            this._callbacks.delete(object.id);
            if (object.error)
                callback.reject(createProtocolError(callback.error, callback.method, object));
            else
                callback.resolve(object.result);
        } else {
            assert(!object.id);
            this.emit(object.method, object.params);
        }
    }
    async detach() {
        if (!this._connection)
            throw new Error(`Session already detached. Most likely the ${this._targetType} has been closed.`);
        await this._connection.send("Target.detachFromTarget",  {sessionId: this._sessionId});
    }
    _onClosed() {
        for (const callback of this._callbacks.values())
            callback.reject(rewriteError(callback.error, `Protocol error (${callback.method}): Target closed.`));
        this._callbacks.clear();
        this._connection = null;
        this.emit(Events.CDPSession.Disconnected);
    }
}
/**
  * @param {!Error} error
  * @param {string} method
  * @param {{error: {message: string, data: any}}} object
  * @return {!Error}
  */
function createProtocolError(error, method, object) {
    let message = `Protocol error (${method}): ${object.error.message}`;
    if ("data" in object.error)
        message += ` ${object.error.data}`;
    return rewriteError(error, message);
}
/**
  * @param {!Error} error
  * @param {string} message
  * @return {!Error}
  */
function rewriteError(error, message) {
    error.message = message;
    return error;
}
exports_puppeteer_puppeteer_lib_Connection = {Connection, CDPSession};
/* jslint ignore:start */
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/Coverage.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
// const {helper, debugError, assert} = exports_puppeteer_puppeteer_lib_helper;
// const {EVALUATION_SCRIPT_URL} = exports_puppeteer_puppeteer_lib_ExecutionContext;
/**
  * @typedef {Object} CoverageEntry
  * @property {string} url
  * @property {string} text
  * @property {!Array<!{start: number, end: number}>} ranges
  */
class Coverage {
    /**
      * @param {!Puppeteer.CDPSession} client
      */
    constructor(client) {
        this._jsCoverage = new JSCoverage(client);
        this._cssCoverage = new CSSCoverage(client);
    }
    /**
      * @param {!{resetOnNavigation?: boolean, reportAnonymousScripts?: boolean}} options
      */
    async startJSCoverage(options) {
        return await this._jsCoverage.start(options);
    }
    /**
      * @return {!Promise<!Array<!CoverageEntry>>}
      */
    async stopJSCoverage() {
        return await this._jsCoverage.stop();
    }
    /**
      * @param {{resetOnNavigation?: boolean}=} options
      */
    async startCSSCoverage(options) {
        return await this._cssCoverage.start(options);
    }
    /**
      * @return {!Promise<!Array<!CoverageEntry>>}
      */
    async stopCSSCoverage() {
        return await this._cssCoverage.stop();
    }
}
exports_puppeteer_puppeteer_lib_Coverage = {Coverage};
class JSCoverage {
    /**
      * @param {!Puppeteer.CDPSession} client
      */
    constructor(client) {
        this._client = client;
        this._enabled = false;
        this._scriptURLs = new Map();
        this._scriptSources = new Map();
        this._eventListeners = [];
        this._resetOnNavigation = false;
    }
    /**
      * @param {!{resetOnNavigation?: boolean, reportAnonymousScripts?: boolean}} options
      */
    async start(options = {}) {
        assert(!this._enabled, "JSCoverage is already enabled");
        const {
            resetOnNavigation = true,
            reportAnonymousScripts = false
        } = options;
        this._resetOnNavigation = resetOnNavigation;
        this._reportAnonymousScripts = reportAnonymousScripts;
        this._enabled = true;
        this._scriptURLs.clear();
        this._scriptSources.clear();
        this._eventListeners = [
            helper.addEventListener(this._client, "Debugger.scriptParsed", this._onScriptParsed.bind(this)),
            helper.addEventListener(this._client, "Runtime.executionContextsCleared", this._onExecutionContextsCleared.bind(this)),
        ];
        await Promise.all([
            this._client.send("Profiler.enable"),
            this._client.send("Profiler.startPreciseCoverage", {callCount: false, detailed: true}),
            this._client.send("Debugger.enable"),
            this._client.send("Debugger.setSkipAllPauses", {skip: true})
        ]);
    }
    _onExecutionContextsCleared() {
        if (!this._resetOnNavigation)
            return;
        this._scriptURLs.clear();
        this._scriptSources.clear();
    }
    /**
      * @param {!Protocol.Debugger.scriptParsedPayload} event
      */
    async _onScriptParsed(event) {
        // Ignore puppeteer-injected scripts
        if (event.url === EVALUATION_SCRIPT_URL)
            return;
        // Ignore other anonymous scripts unless the reportAnonymousScripts option is true.
        if (!event.url && !this._reportAnonymousScripts)
            return;
        try {
            const response = await this._client.send("Debugger.getScriptSource", {scriptId: event.scriptId});
            this._scriptURLs.set(event.scriptId, event.url);
            this._scriptSources.set(event.scriptId, response.scriptSource);
        } catch (e) {
            // This might happen if the page has already navigated away.
            debugError(e);
        }
    }
    /**
      * @return {!Promise<!Array<!CoverageEntry>>}
      */
    async stop() {
        assert(this._enabled, "JSCoverage is not enabled");
        this._enabled = false;
        const [profileResponse] = await Promise.all([
            this._client.send("Profiler.takePreciseCoverage"),
            this._client.send("Profiler.stopPreciseCoverage"),
            this._client.send("Profiler.disable"),
            this._client.send("Debugger.disable"),
        ]);
        helper.removeEventListeners(this._eventListeners);
        const coverage = [];
        for (const entry of profileResponse.result) {
            let url = this._scriptURLs.get(entry.scriptId);
            if (!url && this._reportAnonymousScripts)
                url = "debugger://VM" + entry.scriptId;
            const text = this._scriptSources.get(entry.scriptId);
            if (text === undefined || url === undefined)
                continue;
            const flattenRanges = [];
            for (const func of entry.functions)
                flattenRanges.push(...func.ranges);
            const ranges = convertToDisjointRanges(flattenRanges);
            coverage.push({url, ranges, text});
        }
        return coverage;
    }
}
class CSSCoverage {
    /**
      * @param {!Puppeteer.CDPSession} client
      */
    constructor(client) {
        this._client = client;
        this._enabled = false;
        this._stylesheetURLs = new Map();
        this._stylesheetSources = new Map();
        this._eventListeners = [];
        this._resetOnNavigation = false;
    }
    /**
      * @param {{resetOnNavigation?: boolean}=} options
      */
    async start(options = {}) {
        assert(!this._enabled, "CSSCoverage is already enabled");
        const {resetOnNavigation = true} = options;
        this._resetOnNavigation = resetOnNavigation;
        this._enabled = true;
        this._stylesheetURLs.clear();
        this._stylesheetSources.clear();
        this._eventListeners = [
            helper.addEventListener(this._client, "CSS.styleSheetAdded", this._onStyleSheet.bind(this)),
            helper.addEventListener(this._client, "Runtime.executionContextsCleared", this._onExecutionContextsCleared.bind(this)),
        ];
        await Promise.all([
            this._client.send("DOM.enable"),
            this._client.send("CSS.enable"),
            this._client.send("CSS.startRuleUsageTracking"),
        ]);
    }
    _onExecutionContextsCleared() {
        if (!this._resetOnNavigation)
            return;
        this._stylesheetURLs.clear();
        this._stylesheetSources.clear();
    }
    /**
      * @param {!Protocol.CSS.styleSheetAddedPayload} event
      */
    async _onStyleSheet(event) {
        const header = event.header;
        // Ignore anonymous scripts
        if (!header.sourceURL)
            return;
        try {
            const response = await this._client.send("CSS.getStyleSheetText", {styleSheetId: header.styleSheetId});
            this._stylesheetURLs.set(header.styleSheetId, header.sourceURL);
            this._stylesheetSources.set(header.styleSheetId, response.text);
        } catch (e) {
            // This might happen if the page has already navigated away.
            debugError(e);
        }
    }
    /**
      * @return {!Promise<!Array<!CoverageEntry>>}
      */
    async stop() {
        assert(this._enabled, "CSSCoverage is not enabled");
        this._enabled = false;
        const ruleTrackingResponse = await this._client.send("CSS.stopRuleUsageTracking");
        await Promise.all([
            this._client.send("CSS.disable"),
            this._client.send("DOM.disable"),
        ]);
        helper.removeEventListeners(this._eventListeners);
        // aggregate by styleSheetId
        const styleSheetIdToCoverage = new Map();
        for (const entry of ruleTrackingResponse.ruleUsage) {
            let ranges = styleSheetIdToCoverage.get(entry.styleSheetId);
            if (!ranges) {
                ranges = [];
                styleSheetIdToCoverage.set(entry.styleSheetId, ranges);
            }
            ranges.push({
                startOffset: entry.startOffset,
                endOffset: entry.endOffset,
                count: entry.used ? 1 : 0,
            });
        }
        const coverage = [];
        for (const styleSheetId of this._stylesheetURLs.keys()) {
            const url = this._stylesheetURLs.get(styleSheetId);
            const text = this._stylesheetSources.get(styleSheetId);
            const ranges = convertToDisjointRanges(styleSheetIdToCoverage.get(styleSheetId) || []);
            coverage.push({url, ranges, text});
        }
        return coverage;
    }
}
/**
  * @param {!Array<!{startOffset:number, endOffset:number, count:number}>} nestedRanges
  * @return {!Array<!{start:number, end:number}>}
  */
function convertToDisjointRanges(nestedRanges) {
    const points = [];
    for (const range of nestedRanges) {
        points.push({ offset: range.startOffset, type: 0, range });
        points.push({ offset: range.endOffset, type: 1, range });
    }
    // Sort points to form a valid parenthesis sequence.
    points.sort((a, b) => {
        // Sort with increasing offsets.
        if (a.offset !== b.offset)
            return a.offset - b.offset;
        // All "end" points should go before "start" points.
        if (a.type !== b.type)
            return b.type - a.type;
        const aLength = a.range.endOffset - a.range.startOffset;
        const bLength = b.range.endOffset - b.range.startOffset;
        // For two "start" points, the one with longer range goes first.
        if (a.type === 0)
            return bLength - aLength;
        // For two "end" points, the one with shorter range goes first.
        return aLength - bLength;
    });
    const hitCountStack = [];
    const results = [];
    let lastOffset = 0;
    // Run scanning line to intersect all ranges.
    for (const point of points) {
        if (hitCountStack.length && lastOffset < point.offset && hitCountStack[hitCountStack.length - 1] > 0) {
            const lastResult = results.length ? results[results.length - 1] : null;
            if (lastResult && lastResult.end === lastOffset)
                lastResult.end = point.offset;
            else
                results.push({start: lastOffset, end: point.offset});
        }
        lastOffset = point.offset;
        if (point.type === 0)
            hitCountStack.push(point.range.count);
        else
            hitCountStack.pop();
    }
    // Filter out empty ranges.
    return results.filter(range => range.end - range.start > 1);
}
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/DOMWorld.js
*/
/**
  * Copyright 2019 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
// const fs = require("fs");
// const {helper, assert} = exports_puppeteer_puppeteer_lib_helper;
// const {LifecycleWatcher} = exports_puppeteer_puppeteer_lib_LifecycleWatcher;
// const {TimeoutError} = exports_puppeteer_puppeteer_lib_Errors;
const readFileAsync = helper.promisify(fs.readFile);
/**
  * @unrestricted
  */
class DOMWorld {
    /**
      * @param {!Puppeteer.FrameManager} frameManager
      * @param {!Puppeteer.Frame} frame
      * @param {!Puppeteer.TimeoutSettings} timeoutSettings
      */
    constructor(frameManager, frame, timeoutSettings) {
        this._frameManager = frameManager;
        this._frame = frame;
        this._timeoutSettings = timeoutSettings;
        this._documentPromise = null;
        /** @type {!Promise<!Puppeteer.ExecutionContext>} */
        this._contextPromise;
        this._contextResolveCallback = null;
        this._setContext(null);
        /** @type {!Set<!WaitTask>} */
        this._waitTasks = new Set();
        this._detached = false;
    }
    /**
      * @return {!Puppeteer.Frame}
      */
    frame() {
        return this._frame;
    }
    /**
      * @param {?Puppeteer.ExecutionContext} context
      */
    _setContext(context) {
        if (context) {
            this._contextResolveCallback.call(null, context);
            this._contextResolveCallback = null;
            for (const waitTask of this._waitTasks)
                waitTask.rerun();
        } else {
            this._documentPromise = null;
            this._contextPromise = new Promise(fulfill => {
                this._contextResolveCallback = fulfill;
            });
        }
    }
    /**
      * @return {boolean}
      */
    _hasContext() {
        return !this._contextResolveCallback;
    }
    _detach() {
        this._detached = true;
        for (const waitTask of this._waitTasks)
            waitTask.terminate(new Error("waitForFunction failed: frame got detached."));
    }
    /**
      * @return {!Promise<!Puppeteer.ExecutionContext>}
      */
    executionContext() {
        if (this._detached)
            throw new Error(`Execution Context is not available in detached frame "${this._frame.url()}" (are you trying to evaluate?)`);
        return this._contextPromise;
    }
    /**
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<!Puppeteer.JSHandle>}
      */
    async evaluateHandle(pageFunction, ...args) {
        const context = await this.executionContext();
        return context.evaluateHandle(pageFunction, ...args);
    }
    /**
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<*>}
      */
    async evaluate(pageFunction, ...args) {
        const context = await this.executionContext();
        return context.evaluate(pageFunction, ...args);
    }
}
exports_puppeteer_puppeteer_lib_DOMWorld = {DOMWorld};
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/Dialog.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
// const {assert} = exports_puppeteer_puppeteer_lib_helper;
class Dialog {
    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {string} type
      * @param {string} message
      * @param {(string|undefined)} defaultValue
      */
    constructor(client, type, message, defaultValue = "") {
        this._client = client;
        this._type = type;
        this._message = message;
        this._handled = false;
        this._defaultValue = defaultValue;
    }
    /**
      * @return {string}
      */
    type() {
        return this._type;
    }
    /**
      * @return {string}
      */
    message() {
        return this._message;
    }
    /**
      * @return {string}
      */
    defaultValue() {
        return this._defaultValue;
    }
    /**
      * @param {string=} promptText
      */
    async accept(promptText) {
        assert(!this._handled, "Cannot accept dialog which is already handled!");
        this._handled = true;
        await this._client.send("Page.handleJavaScriptDialog", {
            accept: true,
            promptText: promptText
        });
    }
    async dismiss() {
        assert(!this._handled, "Cannot dismiss dialog which is already handled!");
        this._handled = true;
        await this._client.send("Page.handleJavaScriptDialog", {
            accept: false
        });
    }
}
Dialog.Type = {
    Alert: "alert",
    BeforeUnload: "beforeunload",
    Confirm: "confirm",
    Prompt: "prompt"
};
exports_puppeteer_puppeteer_lib_Dialog = {Dialog};
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/EmulationManager.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
class EmulationManager {
    /**
      * @param {!Puppeteer.CDPSession} client
      */
    constructor(client) {
        this._client = client;
        this._emulatingMobile = false;
        this._hasTouch = false;
    }
    /**
      * @param {!Puppeteer.Viewport} viewport
      * @return {Promise<boolean>}
      */
    async emulateViewport(viewport) {
        const mobile = viewport.isMobile || false;
        const width = viewport.width;
        const height = viewport.height;
        const deviceScaleFactor = viewport.deviceScaleFactor || 1;
        /** @type {Protocol.Emulation.ScreenOrientation} */
        const screenOrientation = viewport.isLandscape ? { angle: 90, type: "landscapePrimary" } : { angle: 0, type: "portraitPrimary" };
        const hasTouch = viewport.hasTouch || false;
        await Promise.all([
            this._client.send("Emulation.setDeviceMetricsOverride", { mobile, width, height, deviceScaleFactor, screenOrientation }),
            this._client.send("Emulation.setTouchEmulationEnabled", {
                enabled: hasTouch
            })
        ]);
        const reloadNeeded = this._emulatingMobile !== mobile || this._hasTouch !== hasTouch;
        this._emulatingMobile = mobile;
        this._hasTouch = hasTouch;
        return reloadNeeded;
    }
}
exports_puppeteer_puppeteer_lib_EmulationManager = {EmulationManager};
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/Errors.js
*/
/**
  * Copyright 2018 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
class TimeoutError extends CustomError {}
exports_puppeteer_puppeteer_lib_Errors = {
    TimeoutError,
};
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/Events.js
*/
/**
  * Copyright 2019 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
const Events = {
    Page: {
        Close: "close",
        Console: "console",
        Dialog: "dialog",
        DOMContentLoaded: "domcontentloaded",
        Error: "error",
        // Can't use just "error" due to node.js special treatment of error events.
        // @see https://nodejs.org/api/events.html#events_error_events
        PageError: "pageerror",
        Request: "request",
        Response: "response",
        RequestFailed: "requestfailed",
        RequestFinished: "requestfinished",
        FrameAttached: "frameattached",
        FrameDetached: "framedetached",
        FrameNavigated: "framenavigated",
        Load: "load",
        Metrics: "metrics",
        Popup: "popup",
        WorkerCreated: "workercreated",
        WorkerDestroyed: "workerdestroyed",
    },
    Browser: {
        TargetCreated: "targetcreated",
        TargetDestroyed: "targetdestroyed",
        TargetChanged: "targetchanged",
        Disconnected: "disconnected"
    },
    BrowserContext: {
        TargetCreated: "targetcreated",
        TargetDestroyed: "targetdestroyed",
        TargetChanged: "targetchanged",
    },
    NetworkManager: {
        Request: Symbol("Events.NetworkManager.Request"),
        Response: Symbol("Events.NetworkManager.Response"),
        RequestFailed: Symbol("Events.NetworkManager.RequestFailed"),
        RequestFinished: Symbol("Events.NetworkManager.RequestFinished"),
    },
    FrameManager: {
        FrameAttached: Symbol("Events.FrameManager.FrameAttached"),
        FrameNavigated: Symbol("Events.FrameManager.FrameNavigated"),
        FrameDetached: Symbol("Events.FrameManager.FrameDetached"),
        LifecycleEvent: Symbol("Events.FrameManager.LifecycleEvent"),
        FrameNavigatedWithinDocument: Symbol("Events.FrameManager.FrameNavigatedWithinDocument"),
        ExecutionContextCreated: Symbol("Events.FrameManager.ExecutionContextCreated"),
        ExecutionContextDestroyed: Symbol("Events.FrameManager.ExecutionContextDestroyed"),
    },
    Connection: {
        Disconnected: Symbol("Events.Connection.Disconnected"),
    },
    CDPSession: {
        Disconnected: Symbol("Events.CDPSession.Disconnected"),
    },
};
exports_puppeteer_puppeteer_lib_Events = { Events };
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/ExecutionContext.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
// const {helper, assert} = exports_puppeteer_puppeteer_lib_helper;
// const {createJSHandle, JSHandle} = exports_puppeteer_puppeteer_lib_JSHandle;
const EVALUATION_SCRIPT_URL = "__puppeteer_evaluation_script__";
const SOURCE_URL_REGEX = /^[\040\t]*\/\/[@#] sourceURL=\s*(\S*?)\s*$/m;
class ExecutionContext {
    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {!Protocol.Runtime.ExecutionContextDescription} contextPayload
      * @param {?Puppeteer.DOMWorld} world
      */
    constructor(client, contextPayload, world) {
        this._client = client;
        this._world = world;
        this._contextId = contextPayload.id;
    }
    /**
      * @return {?Puppeteer.Frame}
      */
    frame() {
        return this._world ? this._world.frame() : null;
    }
    /**
      * @param {Function|string} pageFunction
      * @param {...*} args
      * @return {!Promise<*>}
      */
    async evaluate(pageFunction, ...args) {
        return await this._evaluateInternal(true /* returnByValue */, pageFunction, ...args);
    }
    /**
      * @param {Function|string} pageFunction
      * @param {...*} args
      * @return {!Promise<!JSHandle>}
      */
    async evaluateHandle(pageFunction, ...args) {
        return this._evaluateInternal(false /* returnByValue */, pageFunction, ...args);
    }
    /**
      * @param {boolean} returnByValue
      * @param {Function|string} pageFunction
      * @param {...*} args
      * @return {!Promise<*>}
      */
    async _evaluateInternal(returnByValue, pageFunction, ...args) {
        const suffix = `//# sourceURL=${EVALUATION_SCRIPT_URL}`;
        if (helper.isString(pageFunction)) {
            const contextId = this._contextId;
            const expression = /** @type {string} */ (pageFunction);
            const expressionWithSourceUrl = SOURCE_URL_REGEX.test(expression) ? expression : expression + "\n" + suffix;
            const {exceptionDetails, result: remoteObject} = await this._client.send("Runtime.evaluate", {
                expression: expressionWithSourceUrl,
                contextId,
                returnByValue,
                awaitPromise: true,
                userGesture: true
            }).catch(rewriteError);
            if (exceptionDetails)
                throw new Error("Evaluation failed: " + helper.getExceptionMessage(exceptionDetails));
            return returnByValue ? helper.valueFromRemoteObject(remoteObject) : createJSHandle(this, remoteObject);
        }
        if (typeof pageFunction !== "function")
            throw new Error(`Expected to get |string| or |function| as the first argument, but got "${pageFunction}" instead.`);
        let functionText = pageFunction.toString();
        // hack-coverage - un-instrument
        functionText = functionText.replace((/\b__cov_.*?\+\+/g), "0");
        try {
            new Function("(" + functionText + ")");
        } catch (e1) {
            // This means we might have a function shorthand. Try another
            // time prefixing "function ".
            if (functionText.startsWith("async "))
                functionText = "async function " + functionText.substring("async ".length);
            else
                functionText = "function " + functionText;
            try {
                new Function("(" + functionText  + ")");
            } catch (e2) {
                // We tried hard to serialize, but there's a weird beast here.
                throw new Error("Passed function is not well-serializable!");
            }
        }
        let callFunctionOnPromise;
        try {
            callFunctionOnPromise = this._client.send("Runtime.callFunctionOn", {
                functionDeclaration: functionText + "\n" + suffix + "\n",
                executionContextId: this._contextId,
                arguments: args.map(convertArgument.bind(this)),
                returnByValue,
                awaitPromise: true,
                userGesture: true
            });
        } catch (err) {
            if (err instanceof TypeError && err.message.startsWith("Converting circular structure to JSON"))
                err.message += " Are you passing a nested JSHandle?";
            throw err;
        }
        const { exceptionDetails, result: remoteObject } = await callFunctionOnPromise.catch(rewriteError);
        if (exceptionDetails)
            throw new Error("Evaluation failed: " + helper.getExceptionMessage(exceptionDetails));
        return returnByValue ? helper.valueFromRemoteObject(remoteObject) : createJSHandle(this, remoteObject);
        /**
          * @param {*} arg
          * @return {*}
          * @this {ExecutionContext}
          */
        function convertArgument(arg) {
            if (typeof arg === "bigint") // eslint-disable-line valid-typeof
                return { unserializableValue: `${arg.toString()}n` };
            if (Object.is(arg, -0))
                return { unserializableValue: "-0" };
            if (Object.is(arg, Infinity))
                return { unserializableValue: "Infinity" };
            if (Object.is(arg, -Infinity))
                return { unserializableValue: "-Infinity" };
            if (Object.is(arg, NaN))
                return { unserializableValue: "NaN" };
            const objectHandle = arg && (arg instanceof JSHandle) ? arg : null;
            if (objectHandle) {
                if (objectHandle._context !== this)
                    throw new Error("JSHandles can be evaluated only in the context they were created!");
                if (objectHandle._disposed)
                    throw new Error("JSHandle is disposed!");
                if (objectHandle._remoteObject.unserializableValue)
                    return { unserializableValue: objectHandle._remoteObject.unserializableValue };
                if (!objectHandle._remoteObject.objectId)
                    return { value: objectHandle._remoteObject.value };
                return { objectId: objectHandle._remoteObject.objectId };
            }
            return { value: arg };
        }
        /**
          * @param {!Error} error
          * @return {!Protocol.Runtime.evaluateReturnValue}
          */
        function rewriteError(error) {
            if (error.message.includes("Object reference chain is too long"))
                return {result: {type: "undefined"}};
            if (error.message.includes("Object couldn't be returned by value"))
                return {result: {type: "undefined"}};
            if (error.message.endsWith("Cannot find context with specified id"))
                throw new Error("Execution context was destroyed, most likely because of a navigation.");
            throw error;
        }
    }
    /**
      * @param {!JSHandle} prototypeHandle
      * @return {!Promise<!JSHandle>}
      */
    async queryObjects(prototypeHandle) {
        assert(!prototypeHandle._disposed, "Prototype JSHandle is disposed!");
        assert(prototypeHandle._remoteObject.objectId, "Prototype JSHandle must not be referencing primitive value");
        const response = await this._client.send("Runtime.queryObjects", {
            prototypeObjectId: prototypeHandle._remoteObject.objectId
        });
        return createJSHandle(this, response.objects);
    }
    /**
      * @param {Puppeteer.ElementHandle} elementHandle
      * @return {Promise<Puppeteer.ElementHandle>}
      */
    async _adoptElementHandle(elementHandle) {
        assert(elementHandle.executionContext() !== this, "Cannot adopt handle that already belongs to this execution context");
        assert(this._world, "Cannot adopt handle without DOMWorld");
        const nodeInfo = await this._client.send("DOM.describeNode", {
            objectId: elementHandle._remoteObject.objectId,
        });
        const {object} = await this._client.send("DOM.resolveNode", {
            backendNodeId: nodeInfo.node.backendNodeId,
            executionContextId: this._contextId,
        });
        return /** @type {Puppeteer.ElementHandle}*/(createJSHandle(this, object));
    }
}
exports_puppeteer_puppeteer_lib_ExecutionContext = {ExecutionContext, EVALUATION_SCRIPT_URL};
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/FrameManager.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
// const EventEmitter = require("events");
// const {helper, assert, debugError} = exports_puppeteer_puppeteer_lib_helper;
// const {Events} = exports_puppeteer_puppeteer_lib_Events;
// const {ExecutionContext, EVALUATION_SCRIPT_URL} = exports_puppeteer_puppeteer_lib_ExecutionContext;
// const {LifecycleWatcher} = exports_puppeteer_puppeteer_lib_LifecycleWatcher;
// const {DOMWorld} = exports_puppeteer_puppeteer_lib_DOMWorld;
// const {NetworkManager} = exports_puppeteer_puppeteer_lib_NetworkManager;
const UTILITY_WORLD_NAME = "__puppeteer_utility_world__";
class FrameManager extends EventEmitter {
    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {!Puppeteer.Page} page
      * @param {boolean} ignoreHTTPSErrors
      * @param {!Puppeteer.TimeoutSettings} timeoutSettings
      */
    constructor(client, page, ignoreHTTPSErrors, timeoutSettings) {
        super();
        this._client = client;
        this._page = page;
        this._networkManager = new NetworkManager(client, ignoreHTTPSErrors);
        this._networkManager.setFrameManager(this);
        this._timeoutSettings = timeoutSettings;
        /** @type {!Map<string, !Frame>} */
        this._frames = new Map();
        /** @type {!Map<number, !ExecutionContext>} */
        this._contextIdToContext = new Map();
        /** @type {!Set<string>} */
        this._isolatedWorlds = new Set();
        this._client.on("Page.frameAttached", event => this._onFrameAttached(event.frameId, event.parentFrameId));
        this._client.on("Page.frameNavigated", event => this._onFrameNavigated(event.frame));
        this._client.on("Page.navigatedWithinDocument", event => this._onFrameNavigatedWithinDocument(event.frameId, event.url));
        this._client.on("Page.frameDetached", event => this._onFrameDetached(event.frameId));
        this._client.on("Page.frameStoppedLoading", event => this._onFrameStoppedLoading(event.frameId));
        this._client.on("Runtime.executionContextCreated", event => this._onExecutionContextCreated(event.context));
        this._client.on("Runtime.executionContextDestroyed", event => this._onExecutionContextDestroyed(event.executionContextId));
        this._client.on("Runtime.executionContextsCleared", event => this._onExecutionContextsCleared());
        this._client.on("Page.lifecycleEvent", event => this._onLifecycleEvent(event));
    }
    async initialize() {
        const [,{frameTree}] = await Promise.all([
            this._client.send("Page.enable"),
            this._client.send("Page.getFrameTree"),
        ]);
        this._handleFrameTree(frameTree);
        await Promise.all([
            this._client.send("Page.setLifecycleEventsEnabled", { enabled: true }),
            this._client.send("Runtime.enable", {}).then(() => this._ensureIsolatedWorld(UTILITY_WORLD_NAME)),
            this._networkManager.initialize(),
        ]);
    }
    /**
      * @return {!NetworkManager}
      */
    networkManager() {
        return this._networkManager;
    }
    /**
      * @param {!Puppeteer.Frame} frame
      * @param {string} url
      * @param {!{referer?: string, timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async navigateFrame(frame, url, options = {}) {
        assertNoLegacyNavigationOptions(options);
        const {
            referer = this._networkManager.extraHTTPHeaders()["referer"],
            waitUntil = ["load"],
            timeout = this._timeoutSettings.navigationTimeout(),
        } = options;
        const watcher = new LifecycleWatcher(this, frame, waitUntil, timeout);
        let ensureNewDocumentNavigation = false;
        let error = await Promise.race([
            navigate(this._client, url, referer, frame._id),
            watcher.timeoutOrTerminationPromise(),
        ]);
        if (!error) {
            error = await Promise.race([
                watcher.timeoutOrTerminationPromise(),
                ensureNewDocumentNavigation ? watcher.newDocumentNavigationPromise() : watcher.sameDocumentNavigationPromise(),
            ]);
        }
        watcher.dispose();
        if (error)
            throw error;
        return watcher.navigationResponse();
        /**
          * @param {!Puppeteer.CDPSession} client
          * @param {string} url
          * @param {string} referrer
          * @param {string} frameId
          * @return {!Promise<?Error>}
          */
        async function navigate(client, url, referrer, frameId) {
            try {
                const response = await client.send("Page.navigate", {url, referrer, frameId});
                ensureNewDocumentNavigation = !!response.loaderId;
                return response.errorText ? new Error(`${response.errorText} at ${url}`) : null;
            } catch (error) {
                return error;
            }
        }
    }
    /**
      * @param {!Puppeteer.Frame} frame
      * @param {!{timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async waitForFrameNavigation(frame, options = {}) {
        assertNoLegacyNavigationOptions(options);
        const {
            waitUntil = ["load"],
            timeout = this._timeoutSettings.navigationTimeout(),
        } = options;
        const watcher = new LifecycleWatcher(this, frame, waitUntil, timeout);
        const error = await Promise.race([
            watcher.timeoutOrTerminationPromise(),
            watcher.sameDocumentNavigationPromise(),
            watcher.newDocumentNavigationPromise()
        ]);
        watcher.dispose();
        if (error)
            throw error;
        return watcher.navigationResponse();
    }
    /**
      * @param {!Protocol.Page.lifecycleEventPayload} event
      */
    _onLifecycleEvent(event) {
        const frame = this._frames.get(event.frameId);
        if (!frame)
            return;
        frame._onLifecycleEvent(event.loaderId, event.name);
        this.emit(Events.FrameManager.LifecycleEvent, frame);
    }
    /**
      * @param {string} frameId
      */
    _onFrameStoppedLoading(frameId) {
        const frame = this._frames.get(frameId);
        if (!frame)
            return;
        frame._onLoadingStopped();
        this.emit(Events.FrameManager.LifecycleEvent, frame);
    }
    /**
      * @param {!Protocol.Page.FrameTree} frameTree
      */
    _handleFrameTree(frameTree) {
        if (frameTree.frame.parentId)
            this._onFrameAttached(frameTree.frame.id, frameTree.frame.parentId);
        this._onFrameNavigated(frameTree.frame);
        if (!frameTree.childFrames)
            return;
        for (const child of frameTree.childFrames)
            this._handleFrameTree(child);
    }
    /**
      * @return {!Puppeteer.Page}
      */
    page() {
        return this._page;
    }
    /**
      * @return {!Frame}
      */
    mainFrame() {
        return this._mainFrame;
    }
    /**
      * @return {!Array<!Frame>}
      */
    frames() {
        return Array.from(this._frames.values());
    }
    /**
      * @param {!string} frameId
      * @return {?Frame}
      */
    frame(frameId) {
        return this._frames.get(frameId) || null;
    }
    /**
      * @param {string} frameId
      * @param {?string} parentFrameId
      */
    _onFrameAttached(frameId, parentFrameId) {
        if (this._frames.has(frameId))
            return;
        assert(parentFrameId);
        const parentFrame = this._frames.get(parentFrameId);
        const frame = new Frame(this, this._client, parentFrame, frameId);
        this._frames.set(frame._id, frame);
        this.emit(Events.FrameManager.FrameAttached, frame);
    }
    /**
      * @param {!Protocol.Page.Frame} framePayload
      */
    _onFrameNavigated(framePayload) {
        const isMainFrame = !framePayload.parentId;
        let frame = isMainFrame ? this._mainFrame : this._frames.get(framePayload.id);
        assert(isMainFrame || frame, "We either navigate top level or have old version of the navigated frame");
        // Detach all child frames first.
        if (frame) {
            for (const child of frame.childFrames())
                this._removeFramesRecursively(child);
        }
        // Update or create main frame.
        if (isMainFrame) {
            if (frame) {
                // Update frame id to retain frame identity on cross-process navigation.
                this._frames.delete(frame._id);
                frame._id = framePayload.id;
            } else {
                // Initial main frame navigation.
                frame = new Frame(this, this._client, null, framePayload.id);
            }
            this._frames.set(framePayload.id, frame);
            this._mainFrame = frame;
        }
        // Update frame payload.
        frame._navigated(framePayload);
        this.emit(Events.FrameManager.FrameNavigated, frame);
    }
    /**
      * @param {string} name
      */
    async _ensureIsolatedWorld(name) {
        if (this._isolatedWorlds.has(name))
            return;
        this._isolatedWorlds.add(name);
        await this._client.send("Page.addScriptToEvaluateOnNewDocument", {
            source: `//# sourceURL=${EVALUATION_SCRIPT_URL}`,
            worldName: name,
        }),
        await Promise.all(this.frames().map(frame => this._client.send("Page.createIsolatedWorld", {
            frameId: frame._id,
            grantUniveralAccess: true,
            worldName: name,
        }).catch(debugError))); // frames might be removed before we send this
    }
    /**
      * @param {string} frameId
      * @param {string} url
      */
    _onFrameNavigatedWithinDocument(frameId, url) {
        const frame = this._frames.get(frameId);
        if (!frame)
            return;
        frame._navigatedWithinDocument(url);
        this.emit(Events.FrameManager.FrameNavigatedWithinDocument, frame);
        this.emit(Events.FrameManager.FrameNavigated, frame);
    }
    /**
      * @param {string} frameId
      */
    _onFrameDetached(frameId) {
        const frame = this._frames.get(frameId);
        if (frame)
            this._removeFramesRecursively(frame);
    }
    _onExecutionContextCreated(contextPayload) {
        const frameId = contextPayload.auxData ? contextPayload.auxData.frameId : null;
        const frame = this._frames.get(frameId) || null;
        let world = null;
        if (frame) {
            if (contextPayload.auxData && !!contextPayload.auxData["isDefault"]) {
                world = frame._mainWorld;
            } else if (contextPayload.name === UTILITY_WORLD_NAME && !frame._secondaryWorld._hasContext()) {
                // In case of multiple sessions to the same target, there's a race between
                // connections so we might end up creating multiple isolated worlds.
                // We can use either.
                world = frame._secondaryWorld;
            }
        }
        if (contextPayload.auxData && contextPayload.auxData["type"] === "isolated")
            this._isolatedWorlds.add(contextPayload.name);
        /** @type {!ExecutionContext} */
        const context = new ExecutionContext(this._client, contextPayload, world);
        if (world)
            world._setContext(context);
        this._contextIdToContext.set(contextPayload.id, context);
    }
    /**
      * @param {number} executionContextId
      */
    _onExecutionContextDestroyed(executionContextId) {
        const context = this._contextIdToContext.get(executionContextId);
        if (!context)
            return;
        this._contextIdToContext.delete(executionContextId);
        if (context._world)
            context._world._setContext(null);
    }
    _onExecutionContextsCleared() {
        for (const context of this._contextIdToContext.values()) {
            if (context._world)
                context._world._setContext(null);
        }
        this._contextIdToContext.clear();
    }
    /**
      * @param {number} contextId
      * @return {!ExecutionContext}
      */
    executionContextById(contextId) {
        const context = this._contextIdToContext.get(contextId);
        assert(context, "INTERNAL ERROR: missing context with id = " + contextId);
        return context;
    }
    /**
      * @param {!Frame} frame
      */
    _removeFramesRecursively(frame) {
        for (const child of frame.childFrames())
            this._removeFramesRecursively(child);
        frame._detach();
        this._frames.delete(frame._id);
        this.emit(Events.FrameManager.FrameDetached, frame);
    }
}
/**
  * @unrestricted
  */
class Frame {
    /**
      * @param {!FrameManager} frameManager
      * @param {!Puppeteer.CDPSession} client
      * @param {?Frame} parentFrame
      * @param {string} frameId
      */
    constructor(frameManager, client, parentFrame, frameId) {
        this._frameManager = frameManager;
        this._client = client;
        this._parentFrame = parentFrame;
        this._url = "";
        this._id = frameId;
        this._detached = false;
        this._loaderId = "";
        /** @type {!Set<string>} */
        this._lifecycleEvents = new Set();
        /** @type {!DOMWorld} */
        this._mainWorld = new DOMWorld(frameManager, this, frameManager._timeoutSettings);
        /** @type {!DOMWorld} */
        this._secondaryWorld = new DOMWorld(frameManager, this, frameManager._timeoutSettings);
        /** @type {!Set<!Frame>} */
        this._childFrames = new Set();
        if (this._parentFrame)
            this._parentFrame._childFrames.add(this);
    }
    /**
      * @param {string} url
      * @param {!{referer?: string, timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async goto(url, options) {
        return await this._frameManager.navigateFrame(this, url, options);
    }
    /**
      * @param {!{timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async waitForNavigation(options) {
        return await this._frameManager.waitForFrameNavigation(this, options);
    }
    /**
      * @return {!Promise<!ExecutionContext>}
      */
    executionContext() {
        return this._mainWorld.executionContext();
    }
    /**
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<!Puppeteer.JSHandle>}
      */
    async evaluateHandle(pageFunction, ...args) {
        return this._mainWorld.evaluateHandle(pageFunction, ...args);
    }
    /**
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<*>}
      */
    async evaluate(pageFunction, ...args) {
        return this._mainWorld.evaluate(pageFunction, ...args);
    }
    /**
      * @param {string} selector
      * @return {!Promise<?Puppeteer.ElementHandle>}
      */
    async $(selector) {
        return this._mainWorld.$(selector);
    }
    /**
      * @param {string} expression
      * @return {!Promise<!Array<!Puppeteer.ElementHandle>>}
      */
    async $x(expression) {
        return this._mainWorld.$x(expression);
    }
    /**
      * @param {string} selector
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<(!Object|undefined)>}
      */
    async $eval(selector, pageFunction, ...args) {
        return this._mainWorld.$eval(selector, pageFunction, ...args);
    }
    /**
      * @param {string} selector
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<(!Object|undefined)>}
      */
    async $$eval(selector, pageFunction, ...args) {
        return this._mainWorld.$$eval(selector, pageFunction, ...args);
    }
    /**
      * @param {string} selector
      * @return {!Promise<!Array<!Puppeteer.ElementHandle>>}
      */
    async $$(selector) {
        return this._mainWorld.$$(selector);
    }
    /**
      * @return {!Promise<String>}
      */
    async content() {
        return this._secondaryWorld.content();
    }
    /**
      * @param {string} html
      * @param {!{timeout?: number, waitUntil?: string|!Array<string>}=} options
      */
    async setContent(html, options = {}) {
        return this._secondaryWorld.setContent(html, options);
    }
    /**
      * @return {string}
      */
    name() {
        return this._name || "";
    }
    /**
      * @return {string}
      */
    url() {
        return this._url;
    }
    /**
      * @return {?Frame}
      */
    parentFrame() {
        return this._parentFrame;
    }
    /**
      * @return {!Array.<!Frame>}
      */
    childFrames() {
        return Array.from(this._childFrames);
    }
    /**
      * @return {boolean}
      */
    isDetached() {
        return this._detached;
    }
    /**
      * @param {!{url?: string, path?: string, content?: string, type?: string}} options
      * @return {!Promise<!Puppeteer.ElementHandle>}
      */
    async addScriptTag(options) {
        return this._mainWorld.addScriptTag(options);
    }
    /**
      * @param {!{url?: string, path?: string, content?: string}} options
      * @return {!Promise<!Puppeteer.ElementHandle>}
      */
    async addStyleTag(options) {
        return this._mainWorld.addStyleTag(options);
    }
    /**
      * @param {string} selector
      * @param {!{delay?: number, button?: "left"|"right"|"middle", clickCount?: number}=} options
      */
    async click(selector, options) {
        return this._secondaryWorld.click(selector, options);
    }
    /**
      * @param {string} selector
      */
    async focus(selector) {
        return this._secondaryWorld.focus(selector);
    }
    /**
      * @param {string} selector
      */
    async hover(selector) {
        return this._secondaryWorld.hover(selector);
    }
    /**
    * @param {string} selector
    * @param {!Array<string>} values
    * @return {!Promise<!Array<string>>}
    */
    select(selector, ...values){
        return this._secondaryWorld.select(selector, ...values);
    }
    /**
      * @param {string} selector
      */
    async tap(selector) {
        return this._secondaryWorld.tap(selector);
    }
    /**
      * @param {string} selector
      * @param {string} text
      * @param {{delay: (number|undefined)}=} options
      */
    async type(selector, text, options) {
        return this._mainWorld.type(selector, text, options);
    }
    /**
      * @param {(string|number|Function)} selectorOrFunctionOrTimeout
      * @param {!Object=} options
      * @param {!Array<*>} args
      * @return {!Promise<?Puppeteer.JSHandle>}
      */
    waitFor(selectorOrFunctionOrTimeout, options = {}, ...args) {
        const xPathPattern = "//";
        if (helper.isString(selectorOrFunctionOrTimeout)) {
            const string = /** @type {string} */ (selectorOrFunctionOrTimeout);
            if (string.startsWith(xPathPattern))
                return this.waitForXPath(string, options);
            return this.waitForSelector(string, options);
        }
        if (helper.isNumber(selectorOrFunctionOrTimeout))
            return new Promise(fulfill => setTimeout(fulfill, /** @type {number} */ (selectorOrFunctionOrTimeout)));
        if (typeof selectorOrFunctionOrTimeout === "function")
            return this.waitForFunction(selectorOrFunctionOrTimeout, options, ...args);
        return Promise.reject(new Error("Unsupported target type: " + (typeof selectorOrFunctionOrTimeout)));
    }
    /**
      * @param {string} selector
      * @param {!{visible?: boolean, hidden?: boolean, timeout?: number}=} options
      * @return {!Promise<?Puppeteer.ElementHandle>}
      */
    async waitForSelector(selector, options) {
        const handle = await this._secondaryWorld.waitForSelector(selector, options);
        if (!handle)
            return null;
        const mainExecutionContext = await this._mainWorld.executionContext();
        const result = await mainExecutionContext._adoptElementHandle(handle);
        await handle.dispose();
        return result;
    }
    /**
      * @param {string} xpath
      * @param {!{visible?: boolean, hidden?: boolean, timeout?: number}=} options
      * @return {!Promise<?Puppeteer.ElementHandle>}
      */
    async waitForXPath(xpath, options) {
        const handle = await this._secondaryWorld.waitForXPath(xpath, options);
        if (!handle)
            return null;
        const mainExecutionContext = await this._mainWorld.executionContext();
        const result = await mainExecutionContext._adoptElementHandle(handle);
        await handle.dispose();
        return result;
    }
    /**
      * @param {Function|string} pageFunction
      * @param {!{polling?: string|number, timeout?: number}=} options
      * @return {!Promise<!Puppeteer.JSHandle>}
      */
    waitForFunction(pageFunction, options = {}, ...args) {
        return this._mainWorld.waitForFunction(pageFunction, options, ...args);
    }
    /**
      * @return {!Promise<string>}
      */
    async title() {
        return this._secondaryWorld.title();
    }
    /**
      * @param {!Protocol.Page.Frame} framePayload
      */
    _navigated(framePayload) {
        this._name = framePayload.name;
        // TODO(lushnikov): remove this once requestInterception has loaderId exposed.
        this._navigationURL = framePayload.url;
        this._url = framePayload.url;
    }
    /**
      * @param {string} url
      */
    _navigatedWithinDocument(url) {
        this._url = url;
    }
    /**
      * @param {string} loaderId
      * @param {string} name
      */
    _onLifecycleEvent(loaderId, name) {
        if (name === "init") {
            this._loaderId = loaderId;
            this._lifecycleEvents.clear();
        }
        this._lifecycleEvents.add(name);
    }
    _onLoadingStopped() {
        this._lifecycleEvents.add("DOMContentLoaded");
        this._lifecycleEvents.add("load");
    }
    _detach() {
        this._detached = true;
        this._mainWorld._detach();
        this._secondaryWorld._detach();
        if (this._parentFrame)
            this._parentFrame._childFrames.delete(this);
        this._parentFrame = null;
    }
}
function assertNoLegacyNavigationOptions(options) {
    assert(options["networkIdleTimeout"] === undefined, "ERROR: networkIdleTimeout option is no longer supported.");
    assert(options["networkIdleInflight"] === undefined, "ERROR: networkIdleInflight option is no longer supported.");
    assert(options.waitUntil !== "networkidle", "ERROR: \"networkidle\" option is no longer supported. Use \"networkidle2\" instead");
}
exports_puppeteer_puppeteer_lib_FrameManager = {FrameManager, Frame};
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/JSHandle.js
*/
/**
  * Copyright 2019 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
// const {helper, assert, debugError} = exports_puppeteer_puppeteer_lib_helper;
// const path = require("path");
function createJSHandle(context, remoteObject) {
    const frame = context.frame();
    if (remoteObject.subtype === "node" && frame) {
        const frameManager = frame._frameManager;
        return new ElementHandle(context, context._client, remoteObject, frameManager.page(), frameManager);
    }
    return new JSHandle(context, context._client, remoteObject);
}
class JSHandle {
    /**
      * @param {!Puppeteer.ExecutionContext} context
      * @param {!Puppeteer.CDPSession} client
      * @param {!Protocol.Runtime.RemoteObject} remoteObject
      */
    constructor(context, client, remoteObject) {
        this._context = context;
        this._client = client;
        this._remoteObject = remoteObject;
        this._disposed = false;
    }
    /**
      * @return {!Puppeteer.ExecutionContext}
      */
    executionContext() {
        return this._context;
    }
    /**
      * @param {string} propertyName
      * @return {!Promise<?JSHandle>}
      */
    async getProperty(propertyName) {
        const objectHandle = await this._context.evaluateHandle((object, propertyName) => {
            const result = {__proto__: null};
            result[propertyName] = object[propertyName];
            return result;
        }, this, propertyName);
        const properties = await objectHandle.getProperties();
        const result = properties.get(propertyName) || null;
        await objectHandle.dispose();
        return result;
    }
    /**
      * @return {!Promise<!Map<string, !JSHandle>>}
      */
    async getProperties() {
        const response = await this._client.send("Runtime.getProperties", {
            objectId: this._remoteObject.objectId,
            ownProperties: true
        });
        const result = new Map();
        for (const property of response.result) {
            if (!property.enumerable)
                continue;
            result.set(property.name, createJSHandle(this._context, property.value));
        }
        return result;
    }
    /**
      * @return {!Promise<?Object>}
      */
    async jsonValue() {
        if (this._remoteObject.objectId) {
            const response = await this._client.send("Runtime.callFunctionOn", {
                functionDeclaration: "function() { return this; }",
                objectId: this._remoteObject.objectId,
                returnByValue: true,
                awaitPromise: true,
            });
            return helper.valueFromRemoteObject(response.result);
        }
        return helper.valueFromRemoteObject(this._remoteObject);
    }
    /**
      * @return {?Puppeteer.ElementHandle}
      */
    asElement() {
        return null;
    }
    async dispose() {
        if (this._disposed)
            return;
        this._disposed = true;
        await helper.releaseObject(this._client, this._remoteObject);
    }
    /**
      * @override
      * @return {string}
      */
    toString() {
        if (this._remoteObject.objectId) {
            const type =  this._remoteObject.subtype || this._remoteObject.type;
            return "JSHandle@" + type;
        }
        return "JSHandle:" + helper.valueFromRemoteObject(this._remoteObject);
    }
}
exports_puppeteer_puppeteer_lib_JSHandle = {createJSHandle, JSHandle};
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/LifecycleWatcher.js
*/
/**
  * Copyright 2019 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
// const {helper, assert} = exports_puppeteer_puppeteer_lib_helper;
// const {Events} = exports_puppeteer_puppeteer_lib_Events;
// const {TimeoutError} = exports_puppeteer_puppeteer_lib_Errors;
class LifecycleWatcher {
    /**
      * @param {!Puppeteer.FrameManager} frameManager
      * @param {!Puppeteer.Frame} frame
      * @param {string|!Array<string>} waitUntil
      * @param {number} timeout
      */
    constructor(frameManager, frame, waitUntil, timeout) {
        if (Array.isArray(waitUntil))
            waitUntil = waitUntil.slice();
        else if (typeof waitUntil === "string")
            waitUntil = [waitUntil];
        this._expectedLifecycle = waitUntil.map(value => {
            const protocolEvent = puppeteerToProtocolLifecycle[value];
            assert(protocolEvent, "Unknown value for options.waitUntil: " + value);
            return protocolEvent;
        });
        this._frameManager = frameManager;
        this._frame = frame;
        this._initialLoaderId = frame._loaderId;
        this._timeout = timeout;
        /** @type {?Puppeteer.Request} */
        this._navigationRequest = null;
        this._eventListeners = [
            helper.addEventListener(frameManager._client, Events.CDPSession.Disconnected, () => this._terminate(new Error("Navigation failed because browser has disconnected!"))),
            helper.addEventListener(this._frameManager, Events.FrameManager.LifecycleEvent, this._checkLifecycleComplete.bind(this)),
            helper.addEventListener(this._frameManager, Events.FrameManager.FrameNavigatedWithinDocument, this._navigatedWithinDocument.bind(this)),
            helper.addEventListener(this._frameManager, Events.FrameManager.FrameDetached, this._onFrameDetached.bind(this)),
            helper.addEventListener(this._frameManager.networkManager(), Events.NetworkManager.Request, this._onRequest.bind(this)),
        ];
        this._sameDocumentNavigationPromise = new Promise(fulfill => {
            this._sameDocumentNavigationCompleteCallback = fulfill;
        });
        this._lifecyclePromise = new Promise(fulfill => {
            this._lifecycleCallback = fulfill;
        });
        this._newDocumentNavigationPromise = new Promise(fulfill => {
            this._newDocumentNavigationCompleteCallback = fulfill;
        });
        this._timeoutPromise = this._createTimeoutPromise();
        this._terminationPromise = new Promise(fulfill => {
            this._terminationCallback = fulfill;
        });
        this._checkLifecycleComplete();
    }
    /**
      * @param {!Puppeteer.Request} request
      */
    _onRequest(request) {
        if (request.frame() !== this._frame || !request.isNavigationRequest())
            return;
        this._navigationRequest = request;
    }
    /**
      * @param {!Puppeteer.Frame} frame
      */
    _onFrameDetached(frame) {
        if (this._frame === frame) {
            this._terminationCallback.call(null, new Error("Navigating frame was detached"));
            return;
        }
        this._checkLifecycleComplete();
    }
    /**
      * @return {?Puppeteer.Response}
      */
    navigationResponse() {
        return this._navigationRequest ? this._navigationRequest.response() : null;
    }
    /**
      * @param {!Error} error
      */
    _terminate(error) {
        this._terminationCallback.call(null, error);
    }
    /**
      * @return {!Promise<?Error>}
      */
    sameDocumentNavigationPromise() {
        return this._sameDocumentNavigationPromise;
    }
    /**
      * @return {!Promise<?Error>}
      */
    newDocumentNavigationPromise() {
        return this._newDocumentNavigationPromise;
    }
    /**
      * @return {!Promise}
      */
    lifecyclePromise() {
        return this._lifecyclePromise;
    }
    /**
      * @return {!Promise<?Error>}
      */
    timeoutOrTerminationPromise() {
        return Promise.race([this._timeoutPromise, this._terminationPromise]);
    }
    /**
      * @return {!Promise<?Error>}
      */
    _createTimeoutPromise() {
        if (!this._timeout)
            return new Promise(() => {});
        const errorMessage = "Navigation Timeout Exceeded: " + this._timeout + "ms exceeded";
        return new Promise(fulfill => this._maximumTimer = setTimeout(fulfill, this._timeout))
                .then(() => new TimeoutError(errorMessage));
    }
    /**
      * @param {!Puppeteer.Frame} frame
      */
    _navigatedWithinDocument(frame) {
        if (frame !== this._frame)
            return;
        this._hasSameDocumentNavigation = true;
        this._checkLifecycleComplete();
    }
    _checkLifecycleComplete() {
        // We expect navigation to commit.
        if (!checkLifecycle(this._frame, this._expectedLifecycle))
            return;
        this._lifecycleCallback();
        if (this._frame._loaderId === this._initialLoaderId && !this._hasSameDocumentNavigation)
            return;
        if (this._hasSameDocumentNavigation)
            this._sameDocumentNavigationCompleteCallback();
        if (this._frame._loaderId !== this._initialLoaderId)
            this._newDocumentNavigationCompleteCallback();
        /**
          * @param {!Puppeteer.Frame} frame
          * @param {!Array<string>} expectedLifecycle
          * @return {boolean}
          */
        function checkLifecycle(frame, expectedLifecycle) {
            for (const event of expectedLifecycle) {
                if (!frame._lifecycleEvents.has(event))
                    return false;
            }
            for (const child of frame.childFrames()) {
                if (!checkLifecycle(child, expectedLifecycle))
                    return false;
            }
            return true;
        }
    }
    dispose() {
        helper.removeEventListeners(this._eventListeners);
        clearTimeout(this._maximumTimer);
    }
}
const puppeteerToProtocolLifecycle = {
    "load": "load",
    "domcontentloaded": "DOMContentLoaded",
    "networkidle0": "networkIdle",
    "networkidle2": "networkAlmostIdle",
};
exports_puppeteer_puppeteer_lib_LifecycleWatcher = {LifecycleWatcher};
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/NetworkManager.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
// const EventEmitter = require("events");
// const {helper, assert, debugError} = exports_puppeteer_puppeteer_lib_helper;
// const {Events} = exports_puppeteer_puppeteer_lib_Events;
class NetworkManager extends EventEmitter {
    /**
      * @param {!Puppeteer.CDPSession} client
      */
    constructor(client, ignoreHTTPSErrors) {
        super();
        this._client = client;
        this._ignoreHTTPSErrors = ignoreHTTPSErrors;
        this._frameManager = null;
        /** @type {!Map<string, !Request>} */
        this._requestIdToRequest = new Map();
        /** @type {!Map<string, !Protocol.Network.requestWillBeSentPayload>} */
        this._requestIdToRequestWillBeSentEvent = new Map();
        /** @type {!Object<string, string>} */
        this._extraHTTPHeaders = {};
        this._offline = false;
        /** @type {?{username: string, password: string}} */
        this._credentials = null;
        /** @type {!Set<string>} */
        this._attemptedAuthentications = new Set();
        this._userRequestInterceptionEnabled = false;
        this._protocolRequestInterceptionEnabled = false;
        this._userCacheDisabled = false;
        /** @type {!Map<string, string>} */
        this._requestIdToInterceptionId = new Map();
        this._client.on("Fetch.requestPaused", this._onRequestPaused.bind(this));
        this._client.on("Fetch.authRequired", this._onAuthRequired.bind(this));
        this._client.on("Network.requestWillBeSent", this._onRequestWillBeSent.bind(this));
        this._client.on("Network.requestServedFromCache", this._onRequestServedFromCache.bind(this));
        this._client.on("Network.responseReceived", this._onResponseReceived.bind(this));
        this._client.on("Network.loadingFinished", this._onLoadingFinished.bind(this));
        this._client.on("Network.loadingFailed", this._onLoadingFailed.bind(this));
    }
    async initialize() {
        await this._client.send("Network.enable");
        if (this._ignoreHTTPSErrors)
            await this._client.send("Security.setIgnoreCertificateErrors", {ignore: true});
    }
    /**
      * @param {!Puppeteer.FrameManager} frameManager
      */
    setFrameManager(frameManager) {
        this._frameManager = frameManager;
    }
    /**
      * @param {?{username: string, password: string}} credentials
      */
    async authenticate(credentials) {
        this._credentials = credentials;
        await this._updateProtocolRequestInterception();
    }
    /**
      * @param {!Object<string, string>} extraHTTPHeaders
      */
    async setExtraHTTPHeaders(extraHTTPHeaders) {
        this._extraHTTPHeaders = {};
        for (const key of Object.keys(extraHTTPHeaders)) {
            const value = extraHTTPHeaders[key];
            assert(helper.isString(value), `Expected value of header "${key}" to be String, but "${typeof value}" is found.`);
            this._extraHTTPHeaders[key.toLowerCase()] = value;
        }
        await this._client.send("Network.setExtraHTTPHeaders", { headers: this._extraHTTPHeaders });
    }
    /**
      * @return {!Object<string, string>}
      */
    extraHTTPHeaders() {
        return Object.assign({}, this._extraHTTPHeaders);
    }
    /**
      * @param {boolean} value
      */
    async setOfflineMode(value) {
        if (this._offline === value)
            return;
        this._offline = value;
        await this._client.send("Network.emulateNetworkConditions", {
            offline: this._offline,
            // values of 0 remove any active throttling. crbug.com/456324#c9
            latency: 0,
            downloadThroughput: -1,
            uploadThroughput: -1
        });
    }
    /**
      * @param {string} userAgent
      */
    async setUserAgent(userAgent) {
        await this._client.send("Network.setUserAgentOverride", { userAgent });
    }
    /**
      * @param {boolean} enabled
      */
    async setCacheEnabled(enabled) {
        this._userCacheDisabled = !enabled;
        await this._updateProtocolCacheDisabled();
    }
    /**
      * @param {boolean} value
      */
    async setRequestInterception(value) {
        this._userRequestInterceptionEnabled = value;
        await this._updateProtocolRequestInterception();
    }
    async _updateProtocolRequestInterception() {
        const enabled = this._userRequestInterceptionEnabled || !!this._credentials;
        if (enabled === this._protocolRequestInterceptionEnabled)
            return;
        this._protocolRequestInterceptionEnabled = enabled;
        if (enabled) {
            await Promise.all([
                this._updateProtocolCacheDisabled(),
                this._client.send("Fetch.enable", {
                    handleAuthRequests: true,
                    patterns: [{urlPattern: "*"}],
                }),
            ]);
        } else {
            await Promise.all([
                this._updateProtocolCacheDisabled(),
                this._client.send("Fetch.disable")
            ]);
        }
    }
    async _updateProtocolCacheDisabled() {
        await this._client.send("Network.setCacheDisabled", {
            cacheDisabled: this._userCacheDisabled || this._protocolRequestInterceptionEnabled
        });
    }
    /**
      * @param {!Protocol.Network.requestWillBeSentPayload} event
      */
    _onRequestWillBeSent(event) {
        // Request interception doesn't happen for data URLs with Network Service.
        if (this._protocolRequestInterceptionEnabled && !event.request.url.startsWith("data:")) {
            const requestId = event.requestId;
            const interceptionId = this._requestIdToInterceptionId.get(requestId);
            if (interceptionId) {
                this._onRequest(event, interceptionId);
                this._requestIdToInterceptionId.delete(requestId);
            } else {
                this._requestIdToRequestWillBeSentEvent.set(event.requestId, event);
            }
            return;
        }
        this._onRequest(event, null);
    }
    /**
      * @param {!Protocol.Fetch.authRequiredPayload} event
      */
    _onAuthRequired(event) {
        /** @type {"Default"|"CancelAuth"|"ProvideCredentials"} */
        let response = "Default";
        if (this._attemptedAuthentications.has(event.requestId)) {
            response = "CancelAuth";
        } else if (this._credentials) {
            response = "ProvideCredentials";
            this._attemptedAuthentications.add(event.requestId);
        }
        const {username, password} = this._credentials || {username: undefined, password: undefined};
        this._client.send("Fetch.continueWithAuth", {
            requestId: event.requestId,
            authChallengeResponse: { response, username, password },
        }).catch(debugError);
    }
    /**
      * @param {!Protocol.Fetch.requestPausedPayload} event
      */
    _onRequestPaused(event) {
        if (!this._userRequestInterceptionEnabled && this._protocolRequestInterceptionEnabled) {
            this._client.send("Fetch.continueRequest", {
                requestId: event.requestId
            }).catch(debugError);
        }
        const requestId = event.networkId;
        const interceptionId = event.requestId;
        if (requestId && this._requestIdToRequestWillBeSentEvent.has(requestId)) {
            const requestWillBeSentEvent = this._requestIdToRequestWillBeSentEvent.get(requestId);
            this._onRequest(requestWillBeSentEvent, interceptionId);
            this._requestIdToRequestWillBeSentEvent.delete(requestId);
        } else {
            this._requestIdToInterceptionId.set(requestId, interceptionId);
        }
    }
    /**
      * @param {!Protocol.Network.requestWillBeSentPayload} event
      * @param {?string} interceptionId
      */
    _onRequest(event, interceptionId) {
        let redirectChain = [];
        if (event.redirectResponse) {
            const request = this._requestIdToRequest.get(event.requestId);
            // If we connect late to the target, we could have missed the requestWillBeSent event.
            if (request) {
                this._handleRequestRedirect(request, event.redirectResponse);
                redirectChain = request._redirectChain;
            }
        }
        const frame = event.frameId && this._frameManager ? this._frameManager.frame(event.frameId) : null;
        const request = new Request(this._client, frame, interceptionId, this._userRequestInterceptionEnabled, event, redirectChain);
        this._requestIdToRequest.set(event.requestId, request);
        this.emit(Events.NetworkManager.Request, request);
    }
    /**
      * @param {!Protocol.Network.requestServedFromCachePayload} event
      */
    _onRequestServedFromCache(event) {
        const request = this._requestIdToRequest.get(event.requestId);
        if (request)
            request._fromMemoryCache = true;
    }
    /**
      * @param {!Request} request
      * @param {!Protocol.Network.Response} responsePayload
      */
    _handleRequestRedirect(request, responsePayload) {
        const response = new Response(this._client, request, responsePayload);
        request._response = response;
        request._redirectChain.push(request);
        response._bodyLoadedPromiseFulfill.call(null, new Error("Response body is unavailable for redirect responses"));
        this._requestIdToRequest.delete(request._requestId);
        this._attemptedAuthentications.delete(request._interceptionId);
        this.emit(Events.NetworkManager.Response, response);
        this.emit(Events.NetworkManager.RequestFinished, request);
    }
    /**
      * @param {!Protocol.Network.responseReceivedPayload} event
      */
    _onResponseReceived(event) {
        const request = this._requestIdToRequest.get(event.requestId);
        // FileUpload sends a response without a matching request.
        if (!request)
            return;
        const response = new Response(this._client, request, event.response);
        request._response = response;
        this.emit(Events.NetworkManager.Response, response);
    }
    /**
      * @param {!Protocol.Network.loadingFinishedPayload} event
      */
    _onLoadingFinished(event) {
        const request = this._requestIdToRequest.get(event.requestId);
        // For certain requestIds we never receive requestWillBeSent event.
        // @see https://crbug.com/750469
        if (!request)
            return;
        // Under certain conditions we never get the Network.responseReceived
        // event from protocol. @see https://crbug.com/883475
        if (request.response())
            request.response()._bodyLoadedPromiseFulfill.call(null);
        this._requestIdToRequest.delete(request._requestId);
        this._attemptedAuthentications.delete(request._interceptionId);
        this.emit(Events.NetworkManager.RequestFinished, request);
    }
    /**
      * @param {!Protocol.Network.loadingFailedPayload} event
      */
    _onLoadingFailed(event) {
        const request = this._requestIdToRequest.get(event.requestId);
        // For certain requestIds we never receive requestWillBeSent event.
        // @see https://crbug.com/750469
        if (!request)
            return;
        request._failureText = event.errorText;
        const response = request.response();
        if (response)
            response._bodyLoadedPromiseFulfill.call(null);
        this._requestIdToRequest.delete(request._requestId);
        this._attemptedAuthentications.delete(request._interceptionId);
        this.emit(Events.NetworkManager.RequestFailed, request);
    }
}
class Request {
    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {?Puppeteer.Frame} frame
      * @param {string} interceptionId
      * @param {boolean} allowInterception
      * @param {!Protocol.Network.requestWillBeSentPayload} event
      * @param {!Array<!Request>} redirectChain
      */
    constructor(client, frame, interceptionId, allowInterception, event, redirectChain) {
        this._client = client;
        this._requestId = event.requestId;
        this._isNavigationRequest = event.requestId === event.loaderId && event.type === "Document";
        this._interceptionId = interceptionId;
        this._allowInterception = allowInterception;
        this._interceptionHandled = false;
        this._response = null;
        this._failureText = null;
        this._url = event.request.url;
        this._resourceType = event.type.toLowerCase();
        this._method = event.request.method;
        this._postData = event.request.postData;
        this._headers = {};
        this._frame = frame;
        this._redirectChain = redirectChain;
        for (const key of Object.keys(event.request.headers))
            this._headers[key.toLowerCase()] = event.request.headers[key];
        this._fromMemoryCache = false;
    }
    /**
      * @return {string}
      */
    url() {
        return this._url;
    }
    /**
      * @return {string}
      */
    resourceType() {
        return this._resourceType;
    }
    /**
      * @return {string}
      */
    method() {
        return this._method;
    }
    /**
      * @return {string|undefined}
      */
    postData() {
        return this._postData;
    }
    /**
      * @return {!Object}
      */
    headers() {
        return this._headers;
    }
    /**
      * @return {?Response}
      */
    response() {
        return this._response;
    }
    /**
      * @return {?Puppeteer.Frame}
      */
    frame() {
        return this._frame;
    }
    /**
      * @return {boolean}
      */
    isNavigationRequest() {
        return this._isNavigationRequest;
    }
    /**
      * @return {!Array<!Request>}
      */
    redirectChain() {
        return this._redirectChain.slice();
    }
    /**
      * @return {?{errorText: string}}
      */
    failure() {
        if (!this._failureText)
            return null;
        return {
            errorText: this._failureText
        };
    }
    /**
      * @param {!{url?: string, method?:string, postData?: string, headers?: !Object}} overrides
      */
    async continue(overrides = {}) {
        // Request interception is not supported for data: urls.
        if (this._url.startsWith("data:"))
            return;
        assert(this._allowInterception, "Request Interception is not enabled!");
        assert(!this._interceptionHandled, "Request is already handled!");
        const {
            url,
            method,
            postData,
            headers
        } = overrides;
        this._interceptionHandled = true;
        await this._client.send("Fetch.continueRequest", {
            requestId: this._interceptionId,
            url,
            method,
            postData,
            headers: headers ? headersArray(headers) : undefined,
        }).catch(error => {
            // In certain cases, protocol will return error if the request was already canceled
            // or the page was closed. We should tolerate these errors.
            debugError(error);
        });
    }
    /**
      * @param {!{status: number, headers: Object, contentType: string, body: (string|Buffer)}} response
      */
    async respond(response) {
        // Mocking responses for dataURL requests is not currently supported.
        if (this._url.startsWith("data:"))
            return;
        assert(this._allowInterception, "Request Interception is not enabled!");
        assert(!this._interceptionHandled, "Request is already handled!");
        this._interceptionHandled = true;
        const responseBody = response.body && helper.isString(response.body) ? Buffer.from(/** @type {string} */(response.body)) : /** @type {?Buffer} */(response.body || null);
        /** @type {!Object<string, string>} */
        const responseHeaders = {};
        if (response.headers) {
            for (const header of Object.keys(response.headers))
                responseHeaders[header.toLowerCase()] = response.headers[header];
        }
        if (response.contentType)
            responseHeaders["content-type"] = response.contentType;
        if (responseBody && !("content-length" in responseHeaders))
            responseHeaders["content-length"] = String(Buffer.byteLength(responseBody));
        await this._client.send("Fetch.fulfillRequest", {
            requestId: this._interceptionId,
            responseCode: response.status || 200,
            responsePhrase: STATUS_TEXTS[response.status || 200],
            responseHeaders: headersArray(responseHeaders),
            body: responseBody ? responseBody.toString("base64") : undefined,
        }).catch(error => {
            // In certain cases, protocol will return error if the request was already canceled
            // or the page was closed. We should tolerate these errors.
            debugError(error);
        });
    }
    /**
      * @param {string=} errorCode
      */
    async abort(errorCode = "failed") {
        // Request interception is not supported for data: urls.
        if (this._url.startsWith("data:"))
            return;
        const errorReason = errorReasons[errorCode];
        assert(errorReason, "Unknown error code: " + errorCode);
        assert(this._allowInterception, "Request Interception is not enabled!");
        assert(!this._interceptionHandled, "Request is already handled!");
        this._interceptionHandled = true;
        await this._client.send("Fetch.failRequest", {
            requestId: this._interceptionId,
            errorReason
        }).catch(error => {
            // In certain cases, protocol will return error if the request was already canceled
            // or the page was closed. We should tolerate these errors.
            debugError(error);
        });
    }
}
const errorReasons = {
    "aborted": "Aborted",
    "accessdenied": "AccessDenied",
    "addressunreachable": "AddressUnreachable",
    "blockedbyclient": "BlockedByClient",
    "blockedbyresponse": "BlockedByResponse",
    "connectionaborted": "ConnectionAborted",
    "connectionclosed": "ConnectionClosed",
    "connectionfailed": "ConnectionFailed",
    "connectionrefused": "ConnectionRefused",
    "connectionreset": "ConnectionReset",
    "internetdisconnected": "InternetDisconnected",
    "namenotresolved": "NameNotResolved",
    "timedout": "TimedOut",
    "failed": "Failed",
};
class Response {
    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {!Request} request
      * @param {!Protocol.Network.Response} responsePayload
      */
    constructor(client, request, responsePayload) {
        this._client = client;
        this._request = request;
        this._contentPromise = null;
        this._bodyLoadedPromise = new Promise(fulfill => {
            this._bodyLoadedPromiseFulfill = fulfill;
        });
        this._remoteAddress = {
            ip: responsePayload.remoteIPAddress,
            port: responsePayload.remotePort,
        };
        this._status = responsePayload.status;
        this._statusText = responsePayload.statusText;
        this._url = request.url();
        this._fromDiskCache = !!responsePayload.fromDiskCache;
        this._fromServiceWorker = !!responsePayload.fromServiceWorker;
        this._headers = {};
        for (const key of Object.keys(responsePayload.headers))
            this._headers[key.toLowerCase()] = responsePayload.headers[key];
        this._securityDetails = responsePayload.securityDetails ? new SecurityDetails(responsePayload.securityDetails) : null;
    }
    /**
      * @return {{ip: string, port: number}}
      */
    remoteAddress() {
        return this._remoteAddress;
    }
    /**
      * @return {string}
      */
    url() {
        return this._url;
    }
    /**
      * @return {boolean}
      */
    ok() {
        return this._status === 0 || (this._status >= 200 && this._status <= 299);
    }
    /**
      * @return {number}
      */
    status() {
        return this._status;
    }
    /**
      * @return {string}
      */
    statusText() {
        return this._statusText;
    }
    /**
      * @return {!Object}
      */
    headers() {
        return this._headers;
    }
    /**
      * @return {?SecurityDetails}
      */
    securityDetails() {
        return this._securityDetails;
    }
    /**
      * @return {!Promise<!Buffer>}
      */
    buffer() {
        if (!this._contentPromise) {
            this._contentPromise = this._bodyLoadedPromise.then(async error => {
                if (error)
                    throw error;
                const response = await this._client.send("Network.getResponseBody", {
                    requestId: this._request._requestId
                });
                return Buffer.from(response.body, response.base64Encoded ? "base64" : "utf8");
            });
        }
        return this._contentPromise;
    }
    /**
      * @return {!Promise<string>}
      */
    async text() {
        const content = await this.buffer();
        return content.toString("utf8");
    }
    /**
      * @return {!Promise<!Object>}
      */
    async json() {
        const content = await this.text();
        return JSON.parse(content);
    }
    /**
      * @return {!Request}
      */
    request() {
        return this._request;
    }
    /**
      * @return {boolean}
      */
    fromCache() {
        return this._fromDiskCache || this._request._fromMemoryCache;
    }
    /**
      * @return {boolean}
      */
    fromServiceWorker() {
        return this._fromServiceWorker;
    }
    /**
      * @return {?Puppeteer.Frame}
      */
    frame() {
        return this._request.frame();
    }
}
class SecurityDetails {
    /**
      * @param {!Protocol.Network.SecurityDetails} securityPayload
      */
    constructor(securityPayload) {
        this._subjectName = securityPayload["subjectName"];
        this._issuer = securityPayload["issuer"];
        this._validFrom = securityPayload["validFrom"];
        this._validTo = securityPayload["validTo"];
        this._protocol = securityPayload["protocol"];
    }
    /**
      * @return {string}
      */
    subjectName() {
        return this._subjectName;
    }
    /**
      * @return {string}
      */
    issuer() {
        return this._issuer;
    }
    /**
      * @return {number}
      */
    validFrom() {
        return this._validFrom;
    }
    /**
      * @return {number}
      */
    validTo() {
        return this._validTo;
    }
    /**
      * @return {string}
      */
    protocol() {
        return this._protocol;
    }
}
/**
  * @param {Object<string, string>} headers
  * @return {!Array<{name: string, value: string}>}
  */
function headersArray(headers) {
    const result = [];
    for (const name in headers)
        result.push({name, value: headers[name] + ""});
    return result;
}
// List taken from https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml with extra 306 and 418 codes.
const STATUS_TEXTS = {
    "100": "Continue",
    "101": "Switching Protocols",
    "102": "Processing",
    "103": "Early Hints",
    "200": "OK",
    "201": "Created",
    "202": "Accepted",
    "203": "Non-Authoritative Information",
    "204": "No Content",
    "205": "Reset Content",
    "206": "Partial Content",
    "207": "Multi-Status",
    "208": "Already Reported",
    "226": "IM Used",
    "300": "Multiple Choices",
    "301": "Moved Permanently",
    "302": "Found",
    "303": "See Other",
    "304": "Not Modified",
    "305": "Use Proxy",
    "306": "Switch Proxy",
    "307": "Temporary Redirect",
    "308": "Permanent Redirect",
    "400": "Bad Request",
    "401": "Unauthorized",
    "402": "Payment Required",
    "403": "Forbidden",
    "404": "Not Found",
    "405": "Method Not Allowed",
    "406": "Not Acceptable",
    "407": "Proxy Authentication Required",
    "408": "Request Timeout",
    "409": "Conflict",
    "410": "Gone",
    "411": "Length Required",
    "412": "Precondition Failed",
    "413": "Payload Too Large",
    "414": "URI Too Long",
    "415": "Unsupported Media Type",
    "416": "Range Not Satisfiable",
    "417": "Expectation Failed",
    "418": "I'm a teapot",
    "421": "Misdirected Request",
    "422": "Unprocessable Entity",
    "423": "Locked",
    "424": "Failed Dependency",
    "425": "Too Early",
    "426": "Upgrade Required",
    "428": "Precondition Required",
    "429": "Too Many Requests",
    "431": "Request Header Fields Too Large",
    "451": "Unavailable For Legal Reasons",
    "500": "Internal Server Error",
    "501": "Not Implemented",
    "502": "Bad Gateway",
    "503": "Service Unavailable",
    "504": "Gateway Timeout",
    "505": "HTTP Version Not Supported",
    "506": "Variant Also Negotiates",
    "507": "Insufficient Storage",
    "508": "Loop Detected",
    "510": "Not Extended",
    "511": "Network Authentication Required",
};
exports_puppeteer_puppeteer_lib_NetworkManager = {Request, Response, NetworkManager, SecurityDetails};
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/Page.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
// const fs = require("fs");
// const path = require("path");
// const EventEmitter = require("events");
// const mime = require("mime");
// const {Events} = exports_puppeteer_puppeteer_lib_Events;
// const {Connection} = exports_puppeteer_puppeteer_lib_Connection;
// const {Dialog} = exports_puppeteer_puppeteer_lib_Dialog;
// const {EmulationManager} = exports_puppeteer_puppeteer_lib_EmulationManager;
// const {FrameManager} = exports_puppeteer_puppeteer_lib_FrameManager;
// const {helper, debugError, assert} = exports_puppeteer_puppeteer_lib_helper;
// const {Coverage} = exports_puppeteer_puppeteer_lib_Coverage;
// const {createJSHandle} = exports_puppeteer_puppeteer_lib_JSHandle;
// const {TimeoutSettings} = exports_puppeteer_puppeteer_lib_TimeoutSettings;
const writeFileAsync = helper.promisify(fs.writeFile);
class Page extends EventEmitter {
    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {!Puppeteer.Target} target
      * @param {boolean} ignoreHTTPSErrors
      * @param {?Puppeteer.Viewport} defaultViewport
      * @param {!Puppeteer.TaskQueue} screenshotTaskQueue
      * @return {!Promise<!Page>}
      */
    static async create(client, target, ignoreHTTPSErrors, defaultViewport, screenshotTaskQueue) {
        const page = new Page(client, target, ignoreHTTPSErrors, screenshotTaskQueue);
        await page._initialize();
        if (defaultViewport)
            await page.setViewport(defaultViewport);
        return page;
    }
    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {!Puppeteer.Target} target
      * @param {boolean} ignoreHTTPSErrors
      * @param {!Puppeteer.TaskQueue} screenshotTaskQueue
      */
    constructor(client, target, ignoreHTTPSErrors, screenshotTaskQueue) {
        super();
        this._closed = false;
        this._client = client;
        this._target = target;
        this._timeoutSettings = new TimeoutSettings();
        /** @type {!FrameManager} */
        this._frameManager = new FrameManager(client, this, ignoreHTTPSErrors, this._timeoutSettings);
        this._emulationManager = new EmulationManager(client);
        /** @type {!Map<string, Function>} */
        this._pageBindings = new Map();
        this._coverage = new Coverage(client);
        this._javascriptEnabled = true;
        /** @type {?Puppeteer.Viewport} */
        this._viewport = null;
        this._screenshotTaskQueue = screenshotTaskQueue;
        /** @type {!Map<string, Worker>} */
        this._workers = new Map();
        client.on("Target.attachedToTarget", event => {
            if (event.targetInfo.type !== "worker") {
                // If we don't detach from service workers, they will never die.
                client.send("Target.detachFromTarget", {
                    sessionId: event.sessionId
                }).catch(debugError);
                return;
            }
            const session = Connection.fromSession(client).session(event.sessionId);
            const worker = new Worker(session, event.targetInfo.url, this._addConsoleMessage.bind(this), this._handleException.bind(this));
            this._workers.set(event.sessionId, worker);
            this.emit(Events.Page.WorkerCreated, worker);
        });
        client.on("Target.detachedFromTarget", event => {
            const worker = this._workers.get(event.sessionId);
            if (!worker)
                return;
            this.emit(Events.Page.WorkerDestroyed, worker);
            this._workers.delete(event.sessionId);
        });
        this._frameManager.on(Events.FrameManager.FrameAttached, event => this.emit(Events.Page.FrameAttached, event));
        this._frameManager.on(Events.FrameManager.FrameDetached, event => this.emit(Events.Page.FrameDetached, event));
        this._frameManager.on(Events.FrameManager.FrameNavigated, event => this.emit(Events.Page.FrameNavigated, event));
        const networkManager = this._frameManager.networkManager();
        networkManager.on(Events.NetworkManager.Request, event => this.emit(Events.Page.Request, event));
        networkManager.on(Events.NetworkManager.Response, event => this.emit(Events.Page.Response, event));
        networkManager.on(Events.NetworkManager.RequestFailed, event => this.emit(Events.Page.RequestFailed, event));
        networkManager.on(Events.NetworkManager.RequestFinished, event => this.emit(Events.Page.RequestFinished, event));
        this._fileChooserInterceptionIsDisabled = false;
        this._fileChooserInterceptors = new Set();
        client.on("Page.domContentEventFired", event => this.emit(Events.Page.DOMContentLoaded));
        client.on("Page.loadEventFired", event => this.emit(Events.Page.Load));
        client.on("Runtime.consoleAPICalled", event => this._onConsoleAPI(event));
        client.on("Runtime.bindingCalled", event => this._onBindingCalled(event));
        client.on("Page.javascriptDialogOpening", event => this._onDialog(event));
        client.on("Runtime.exceptionThrown", exception => this._handleException(exception.exceptionDetails));
        client.on("Inspector.targetCrashed", event => this._onTargetCrashed());
        client.on("Performance.metrics", event => this._emitMetrics(event));
        client.on("Log.entryAdded", event => this._onLogEntryAdded(event));
        client.on("Page.fileChooserOpened", event => this._onFileChooser(event));
        this._target._isClosedPromise.then(() => {
            this.emit(Events.Page.Close);
            this._closed = true;
        });
    }
    async _initialize() {
        await Promise.all([
            this._frameManager.initialize(),
            this._client.send("Target.setAutoAttach", {autoAttach: true, waitForDebuggerOnStart: false, flatten: true}),
            this._client.send("Performance.enable", {}),
            this._client.send("Log.enable", {}),
            this._client.send("Page.setInterceptFileChooserDialog", {enabled: true}).catch(e => {
                this._fileChooserInterceptionIsDisabled = true;
            }),
        ]);
    }
    /**
      * @param {!Protocol.Page.fileChooserOpenedPayload} event
      */
    _onFileChooser(event) {
        if (!this._fileChooserInterceptors.size) {
            this._client.send("Page.handleFileChooser", { action: "fallback" }).catch(debugError);
            return;
        }
        const interceptors = Array.from(this._fileChooserInterceptors);
        this._fileChooserInterceptors.clear();
        const fileChooser = new FileChooser(this._client, event);
        for (const interceptor of interceptors)
            interceptor.call(null, fileChooser);
    }
    /**
      * @param {!{timeout?: number}=} options
      * @return !Promise<!FileChooser>}
      */
    async waitForFileChooser(options = {}) {
        if (this._fileChooserInterceptionIsDisabled)
            throw new Error("File chooser handling does not work with multiple connections to the same page");
        const {
            timeout = this._timeoutSettings.timeout(),
        } = options;
        let callback;
        const promise = new Promise(x => callback = x);
        this._fileChooserInterceptors.add(callback);
        return helper.waitWithTimeout(promise, "waiting for file chooser", timeout).catch(e => {
            this._fileChooserInterceptors.delete(callback);
            throw e;
        });
    }
    /**
      * @param {!{longitude: number, latitude: number, accuracy: (number|undefined)}} options
      */
    async setGeolocation(options) {
        const { longitude, latitude, accuracy = 0} = options;
        if (longitude < -180 || longitude > 180)
            throw new Error(`Invalid longitude "${longitude}": precondition -180 <= LONGITUDE <= 180 failed.`);
        if (latitude < -90 || latitude > 90)
            throw new Error(`Invalid latitude "${latitude}": precondition -90 <= LATITUDE <= 90 failed.`);
        if (accuracy < 0)
            throw new Error(`Invalid accuracy "${accuracy}": precondition 0 <= ACCURACY failed.`);
        await this._client.send("Emulation.setGeolocationOverride", {longitude, latitude, accuracy});
    }
    /**
      * @return {!Puppeteer.Target}
      */
    target() {
        return this._target;
    }
    /**
      * @return {!Puppeteer.Browser}
      */
    browser() {
        return this._target.browser();
    }
    /**
      * @return {!Puppeteer.BrowserContext}
      */
    browserContext() {
        return this._target.browserContext();
    }
    _onTargetCrashed() {
        this.emit("error", new Error("Page crashed!"));
    }
    /**
      * @param {!Protocol.Log.entryAddedPayload} event
      */
    _onLogEntryAdded(event) {
        const {level, text, args, source, url, lineNumber} = event.entry;
        if (args)
            args.map(arg => helper.releaseObject(this._client, arg));
        if (source !== "worker")
            this.emit(Events.Page.Console, new ConsoleMessage(level, text, [], {url, lineNumber}));
    }
    /**
      * @return {!Puppeteer.Frame}
      */
    mainFrame() {
        return this._frameManager.mainFrame();
    }
    /**
      * @return {!Touchscreen}
      */
    get touchscreen() {
        return this._touchscreen;
    }
    /**
      * @return {!Coverage}
      */
    get coverage() {
        return this._coverage;
    }
    /**
      * @return {!Array<Puppeteer.Frame>}
      */
    frames() {
        return this._frameManager.frames();
    }
    /**
      * @return {!Array<!Worker>}
      */
    workers() {
        return Array.from(this._workers.values());
    }
    /**
      * @param {boolean} value
      */
    async setRequestInterception(value) {
        return this._frameManager.networkManager().setRequestInterception(value);
    }
    /**
      * @param {boolean} enabled
      */
    setOfflineMode(enabled) {
        return this._frameManager.networkManager().setOfflineMode(enabled);
    }
    /**
      * @param {number} timeout
      */
    setDefaultNavigationTimeout(timeout) {
        this._timeoutSettings.setDefaultNavigationTimeout(timeout);
    }
    /**
      * @param {number} timeout
      */
    setDefaultTimeout(timeout) {
        this._timeoutSettings.setDefaultTimeout(timeout);
    }
    /**
      * @param {string} selector
      * @return {!Promise<?Puppeteer.ElementHandle>}
      */
    async $(selector) {
        return this.mainFrame().$(selector);
    }
    /**
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<!Puppeteer.JSHandle>}
      */
    async evaluateHandle(pageFunction, ...args) {
        const context = await this.mainFrame().executionContext();
        return context.evaluateHandle(pageFunction, ...args);
    }
    /**
      * @param {!Puppeteer.JSHandle} prototypeHandle
      * @return {!Promise<!Puppeteer.JSHandle>}
      */
    async queryObjects(prototypeHandle) {
        const context = await this.mainFrame().executionContext();
        return context.queryObjects(prototypeHandle);
    }
    /**
      * @param {string} selector
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<(!Object|undefined)>}
      */
    async $eval(selector, pageFunction, ...args) {
        return this.mainFrame().$eval(selector, pageFunction, ...args);
    }
    /**
      * @param {string} selector
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<(!Object|undefined)>}
      */
    async $$eval(selector, pageFunction, ...args) {
        return this.mainFrame().$$eval(selector, pageFunction, ...args);
    }
    /**
      * @param {string} selector
      * @return {!Promise<!Array<!Puppeteer.ElementHandle>>}
      */
    async $$(selector) {
        return this.mainFrame().$$(selector);
    }
    /**
      * @param {string} expression
      * @return {!Promise<!Array<!Puppeteer.ElementHandle>>}
      */
    async $x(expression) {
        return this.mainFrame().$x(expression);
    }
    /**
      * @param {!Array<string>} urls
      * @return {!Promise<!Array<Network.Cookie>>}
      */
    async cookies(...urls) {
        return (await this._client.send("Network.getCookies", {
            urls: urls.length ? urls : [this.url()]
        })).cookies;
    }
    /**
      * @param {Array<Protocol.Network.deleteCookiesParameters>} cookies
      */
    async deleteCookie(...cookies) {
        const pageURL = this.url();
        for (const cookie of cookies) {
            const item = Object.assign({}, cookie);
            if (!cookie.url && pageURL.startsWith("http"))
                item.url = pageURL;
            await this._client.send("Network.deleteCookies", item);
        }
    }
    /**
      * @param {Array<Network.CookieParam>} cookies
      */
    async setCookie(...cookies) {
        const pageURL = this.url();
        const startsWithHTTP = pageURL.startsWith("http");
        const items = cookies.map(cookie => {
            const item = Object.assign({}, cookie);
            if (!item.url && startsWithHTTP)
                item.url = pageURL;
            assert(item.url !== "about:blank", `Blank page can not have cookie "${item.name}"`);
            assert(!String.prototype.startsWith.call(item.url || "", "data:"), `Data URL page can not have cookie "${item.name}"`);
            return item;
        });
        await this.deleteCookie(...items);
        if (items.length)
            await this._client.send("Network.setCookies", { cookies: items });
    }
    /**
      * @param {!{url?: string, path?: string, content?: string, type?: string}} options
      * @return {!Promise<!Puppeteer.ElementHandle>}
      */
    async addScriptTag(options) {
        return this.mainFrame().addScriptTag(options);
    }
    /**
      * @param {!{url?: string, path?: string, content?: string}} options
      * @return {!Promise<!Puppeteer.ElementHandle>}
      */
    async addStyleTag(options) {
        return this.mainFrame().addStyleTag(options);
    }
    /**
      * @param {string} name
      * @param {Function} puppeteerFunction
      */
    async exposeFunction(name, puppeteerFunction) {
        if (this._pageBindings.has(name))
            throw new Error(`Failed to add page binding with name ${name}: window["${name}"] already exists!`);
        this._pageBindings.set(name, puppeteerFunction);
        const expression = helper.evaluationString(addPageBinding, name);
        await this._client.send("Runtime.addBinding", {name: name});
        await this._client.send("Page.addScriptToEvaluateOnNewDocument", {source: expression});
        await Promise.all(this.frames().map(frame => frame.evaluate(expression).catch(debugError)));
        function addPageBinding(bindingName) {
            const binding = window[bindingName];
            window[bindingName] = (...args) => {
                const me = window[bindingName];
                let callbacks = me["callbacks"];
                if (!callbacks) {
                    callbacks = new Map();
                    me["callbacks"] = callbacks;
                }
                const seq = (me["lastSeq"] || 0) + 1;
                me["lastSeq"] = seq;
                const promise = new Promise((resolve, reject) => callbacks.set(seq, {resolve, reject}));
                binding(JSON.stringify({name: bindingName, seq, args}));
                return promise;
            };
        }
    }
    /**
      * @param {?{username: string, password: string}} credentials
      */
    async authenticate(credentials) {
        return this._frameManager.networkManager().authenticate(credentials);
    }
    /**
      * @param {!Object<string, string>} headers
      */
    async setExtraHTTPHeaders(headers) {
        return this._frameManager.networkManager().setExtraHTTPHeaders(headers);
    }
    /**
      * @param {string} userAgent
      */
    async setUserAgent(userAgent) {
        return this._frameManager.networkManager().setUserAgent(userAgent);
    }
    /**
      * @return {!Promise<!Metrics>}
      */
    async metrics() {
        const response = await this._client.send("Performance.getMetrics");
        return this._buildMetricsObject(response.metrics);
    }
    /**
      * @param {!Protocol.Performance.metricsPayload} event
      */
    _emitMetrics(event) {
        this.emit(Events.Page.Metrics, {
            title: event.title,
            metrics: this._buildMetricsObject(event.metrics)
        });
    }
    /**
      * @param {?Array<!Protocol.Performance.Metric>} metrics
      * @return {!Metrics}
      */
    _buildMetricsObject(metrics) {
        const result = {};
        for (const metric of metrics || []) {
            if (supportedMetrics.has(metric.name))
                result[metric.name] = metric.value;
        }
        return result;
    }
    /**
      * @param {!Protocol.Runtime.ExceptionDetails} exceptionDetails
      */
    _handleException(exceptionDetails) {
        const message = helper.getExceptionMessage(exceptionDetails);
        const err = new Error(message);
        err.stack = ""; // Don't report clientside error with a node stack attached
        this.emit(Events.Page.PageError, err);
    }
    /**
      * @param {!Protocol.Runtime.consoleAPICalledPayload} event
      */
    async _onConsoleAPI(event) {
        if (event.executionContextId === 0) {
            // DevTools protocol stores the last 1000 console messages. These
            // messages are always reported even for removed execution contexts. In
            // this case, they are marked with executionContextId = 0 and are
            // reported upon enabling Runtime agent.
            //
            // Ignore these messages since:
            // - there's no execution context we can use to operate with message
            //   arguments
            // - these messages are reported before Puppeteer clients can subscribe
            //   to the "console"
            //   page event.
            //
            // @see https://github.com/GoogleChrome/puppeteer/issues/3865
            return;
        }
        const context = this._frameManager.executionContextById(event.executionContextId);
        const values = event.args.map(arg => createJSHandle(context, arg));
        this._addConsoleMessage(event.type, values, event.stackTrace);
    }
    /**
      * @param {!Protocol.Runtime.bindingCalledPayload} event
      */
    async _onBindingCalled(event) {
        const {name, seq, args} = JSON.parse(event.payload);
        let expression = null;
        try {
            const result = await this._pageBindings.get(name)(...args);
            expression = helper.evaluationString(deliverResult, name, seq, result);
        } catch (error) {
            if (error instanceof Error)
                expression = helper.evaluationString(deliverError, name, seq, error.message, error.stack);
            else
                expression = helper.evaluationString(deliverErrorValue, name, seq, error);
        }
        this._client.send("Runtime.evaluate", { expression, contextId: event.executionContextId }).catch(debugError);
        /**
          * @param {string} name
          * @param {number} seq
          * @param {*} result
          */
        function deliverResult(name, seq, result) {
            window[name]["callbacks"].get(seq).resolve(result);
            window[name]["callbacks"].delete(seq);
        }
        /**
          * @param {string} name
          * @param {number} seq
          * @param {string} message
          * @param {string} stack
          */
        function deliverError(name, seq, message, stack) {
            const error = new Error(message);
            error.stack = stack;
            window[name]["callbacks"].get(seq).reject(error);
            window[name]["callbacks"].delete(seq);
        }
        /**
          * @param {string} name
          * @param {number} seq
          * @param {*} value
          */
        function deliverErrorValue(name, seq, value) {
            window[name]["callbacks"].get(seq).reject(value);
            window[name]["callbacks"].delete(seq);
        }
    }
    /**
      * @param {string} type
      * @param {!Array<!Puppeteer.JSHandle>} args
      * @param {Protocol.Runtime.StackTrace=} stackTrace
      */
    _addConsoleMessage(type, args, stackTrace) {
        if (!this.listenerCount(Events.Page.Console)) {
            args.forEach(arg => arg.dispose());
            return;
        }
        const textTokens = [];
        for (const arg of args) {
            const remoteObject = arg._remoteObject;
            if (remoteObject.objectId)
                textTokens.push(arg.toString());
            else
                textTokens.push(helper.valueFromRemoteObject(remoteObject));
        }
        const location = stackTrace && stackTrace.callFrames.length ? {
            url: stackTrace.callFrames[0].url,
            lineNumber: stackTrace.callFrames[0].lineNumber,
            columnNumber: stackTrace.callFrames[0].columnNumber,
        } : {};
        const message = new ConsoleMessage(type, textTokens.join(" "), args, location);
        this.emit(Events.Page.Console, message);
    }
    _onDialog(event) {
        let dialogType = null;
        if (event.type === "alert")
            dialogType = Dialog.Type.Alert;
        else if (event.type === "confirm")
            dialogType = Dialog.Type.Confirm;
        else if (event.type === "prompt")
            dialogType = Dialog.Type.Prompt;
        else if (event.type === "beforeunload")
            dialogType = Dialog.Type.BeforeUnload;
        assert(dialogType, "Unknown javascript dialog type: " + event.type);
        const dialog = new Dialog(this._client, dialogType, event.message, event.defaultPrompt);
        this.emit(Events.Page.Dialog, dialog);
    }
    /**
      * @return {!string}
      */
    url() {
        return this.mainFrame().url();
    }
    /**
      * @return {!Promise<string>}
      */
    async content() {
        return await this._frameManager.mainFrame().content();
    }
    /**
      * @param {string} html
      * @param {!{timeout?: number, waitUntil?: string|!Array<string>}=} options
      */
    async setContent(html, options) {
        await this._frameManager.mainFrame().setContent(html, options);
    }
    /**
      * @param {string} url
      * @param {!{referer?: string, timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async goto(url, options) {
        return await this._frameManager.mainFrame().goto(url, options);
    }
    /**
      * @param {!{timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async reload(options) {
        const [response] = await Promise.all([
            this.waitForNavigation(options),
            this._client.send("Page.reload")
        ]);
        return response;
    }
    /**
      * @param {!{timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async waitForNavigation(options = {}) {
        return await this._frameManager.mainFrame().waitForNavigation(options);
    }
    /**
      * @param {(string|Function)} urlOrPredicate
      * @param {!{timeout?: number}=} options
      * @return {!Promise<!Puppeteer.Request>}
      */
    async waitForRequest(urlOrPredicate, options = {}) {
        const {
            timeout = this._timeoutSettings.timeout(),
        } = options;
        return helper.waitForEvent(this._frameManager.networkManager(), Events.NetworkManager.Request, request => {
            if (helper.isString(urlOrPredicate))
                return (urlOrPredicate === request.url());
            if (typeof urlOrPredicate === "function")
                return !!(urlOrPredicate(request));
            return false;
        }, timeout);
    }
    /**
      * @param {(string|Function)} urlOrPredicate
      * @param {!{timeout?: number}=} options
      * @return {!Promise<!Puppeteer.Response>}
      */
    async waitForResponse(urlOrPredicate, options = {}) {
        const {
            timeout = this._timeoutSettings.timeout(),
        } = options;
        return helper.waitForEvent(this._frameManager.networkManager(), Events.NetworkManager.Response, response => {
            if (helper.isString(urlOrPredicate))
                return (urlOrPredicate === response.url());
            if (typeof urlOrPredicate === "function")
                return !!(urlOrPredicate(response));
            return false;
        }, timeout);
    }
    /**
      * @param {!{timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async goBack(options) {
        return this._go(-1, options);
    }
    /**
      * @param {!{timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async goForward(options) {
        return this._go(+1, options);
    }
    /**
      * @param {!{timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async _go(delta, options) {
        const history = await this._client.send("Page.getNavigationHistory");
        const entry = history.entries[history.currentIndex + delta];
        if (!entry)
            return null;
        const [response] = await Promise.all([
            this.waitForNavigation(options),
            this._client.send("Page.navigateToHistoryEntry", {entryId: entry.id}),
        ]);
        return response;
    }
    async bringToFront() {
        await this._client.send("Page.bringToFront");
    }
    /**
      * @param {!{viewport: !Puppeteer.Viewport, userAgent: string}} options
      */
    async emulate(options) {
        await Promise.all([
            this.setViewport(options.viewport),
            this.setUserAgent(options.userAgent)
        ]);
    }
    /**
      * @param {boolean} enabled
      */
    async setJavaScriptEnabled(enabled) {
        if (this._javascriptEnabled === enabled)
            return;
        this._javascriptEnabled = enabled;
        await this._client.send("Emulation.setScriptExecutionDisabled", { value: !enabled });
    }
    /**
      * @param {boolean} enabled
      */
    async setBypassCSP(enabled) {
        await this._client.send("Page.setBypassCSP", { enabled });
    }
    /**
      * @param {?string} mediaType
      */
    async emulateMedia(mediaType) {
        assert(mediaType === "screen" || mediaType === "print" || mediaType === null, "Unsupported media type: " + mediaType);
        await this._client.send("Emulation.setEmulatedMedia", {media: mediaType || ""});
    }
    /**
      * @param {!Puppeteer.Viewport} viewport
      */
    async setViewport(viewport) {
        const needsReload = await this._emulationManager.emulateViewport(viewport);
        this._viewport = viewport;
        if (needsReload)
            await this.reload();
    }
    /**
      * @return {?Puppeteer.Viewport}
      */
    viewport() {
        return this._viewport;
    }
    /**
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<*>}
      */
    async evaluate(pageFunction, ...args) {
        return this._frameManager.mainFrame().evaluate(pageFunction, ...args);
    }
    /**
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      */
    async evaluateOnNewDocument(pageFunction, ...args) {
        const source = helper.evaluationString(pageFunction, ...args);
        await this._client.send("Page.addScriptToEvaluateOnNewDocument", { source });
    }
    /**
      * @param {boolean} enabled
      */
    async setCacheEnabled(enabled = true) {
        await this._frameManager.networkManager().setCacheEnabled(enabled);
    }
    /**
      * @param {!ScreenshotOptions=} options
      * @return {!Promise<!Buffer|!String>}
      */
    async screenshot(options = {}) {
        let screenshotType = null;
        // options.type takes precedence over inferring the type from options.path
        // because it may be a 0-length file with no extension created beforehand (i.e. as a temp file).
        if (options.type) {
            assert(options.type === "png" || options.type === "jpeg", "Unknown options.type value: " + options.type);
            screenshotType = options.type;
        } else if (options.path) {
            const mimeType = mime.getType(options.path);
            if (mimeType === "image/png")
                screenshotType = "png";
            else if (mimeType === "image/jpeg")
                screenshotType = "jpeg";
            assert(screenshotType, "Unsupported screenshot mime type: " + mimeType);
        }
        if (!screenshotType)
            screenshotType = "png";
        if (options.quality) {
            assert(screenshotType === "jpeg", "options.quality is unsupported for the " + screenshotType + " screenshots");
            assert(typeof options.quality === "number", "Expected options.quality to be a number but found " + (typeof options.quality));
            assert(Number.isInteger(options.quality), "Expected options.quality to be an integer");
            assert(options.quality >= 0 && options.quality <= 100, "Expected options.quality to be between 0 and 100 (inclusive), got " + options.quality);
        }
        assert(!options.clip || !options.fullPage, "options.clip and options.fullPage are exclusive");
        if (options.clip) {
            assert(typeof options.clip.x === "number", "Expected options.clip.x to be a number but found " + (typeof options.clip.x));
            assert(typeof options.clip.y === "number", "Expected options.clip.y to be a number but found " + (typeof options.clip.y));
            assert(typeof options.clip.width === "number", "Expected options.clip.width to be a number but found " + (typeof options.clip.width));
            assert(typeof options.clip.height === "number", "Expected options.clip.height to be a number but found " + (typeof options.clip.height));
            assert(options.clip.width !== 0, "Expected options.clip.width not to be 0.");
            assert(options.clip.height !== 0, "Expected options.clip.width not to be 0.");
        }
        return this._screenshotTaskQueue.postTask(this._screenshotTask.bind(this, screenshotType, options));
    }
    /**
      * @param {"png"|"jpeg"} format
      * @param {!ScreenshotOptions=} options
      * @return {!Promise<!Buffer|!String>}
      */
    async _screenshotTask(format, options) {
        await this._client.send("Target.activateTarget", {targetId: this._target._targetId});
        let clip = options.clip ? processClip(options.clip) : undefined;
        if (options.fullPage) {
            const metrics = await this._client.send("Page.getLayoutMetrics");
            const width = Math.ceil(metrics.contentSize.width);
            const height = Math.ceil(metrics.contentSize.height);
            // Overwrite clip for full page at all times.
            clip = { x: 0, y: 0, width, height, scale: 1 };
            const {
                isMobile = false,
                deviceScaleFactor = 1,
                isLandscape = false
            } = this._viewport || {};
            /** @type {!Protocol.Emulation.ScreenOrientation} */
            const screenOrientation = isLandscape ? { angle: 90, type: "landscapePrimary" } : { angle: 0, type: "portraitPrimary" };
            await this._client.send("Emulation.setDeviceMetricsOverride", { mobile: isMobile, width, height, deviceScaleFactor, screenOrientation });
        }
        const shouldSetDefaultBackground = options.omitBackground && format === "png";
        if (shouldSetDefaultBackground)
            await this._client.send("Emulation.setDefaultBackgroundColorOverride", { color: { r: 0, g: 0, b: 0, a: 0 } });
        const result = await this._client.send("Page.captureScreenshot", { format, quality: options.quality, clip });
        if (shouldSetDefaultBackground)
            await this._client.send("Emulation.setDefaultBackgroundColorOverride");
        if (options.fullPage && this._viewport)
            await this.setViewport(this._viewport);
        const buffer = options.encoding === "base64" ? result.data : Buffer.from(result.data, "base64");
        if (options.path)
            await writeFileAsync(options.path, buffer);
        return buffer;
        function processClip(clip) {
            const x = Math.round(clip.x);
            const y = Math.round(clip.y);
            const width = Math.round(clip.width + clip.x - x);
            const height = Math.round(clip.height + clip.y - y);
            return {x, y, width, height, scale: 1};
        }
    }
    /**
      * @param {!PDFOptions=} options
      * @return {!Promise<!Buffer>}
      */
    async pdf(options = {}) {
        const {
            scale = 1,
            displayHeaderFooter = false,
            headerTemplate = "",
            footerTemplate = "",
            printBackground = false,
            landscape = false,
            pageRanges = "",
            preferCSSPageSize = false,
            margin = {},
            path = null
        } = options;
        let paperWidth = 8.5;
        let paperHeight = 11;
        if (options.format) {
            const format = Page.PaperFormats[options.format.toLowerCase()];
            assert(format, "Unknown paper format: " + options.format);
            paperWidth = format.width;
            paperHeight = format.height;
        } else {
            paperWidth = convertPrintParameterToInches(options.width) || paperWidth;
            paperHeight = convertPrintParameterToInches(options.height) || paperHeight;
        }
        const marginTop = convertPrintParameterToInches(margin.top) || 0;
        const marginLeft = convertPrintParameterToInches(margin.left) || 0;
        const marginBottom = convertPrintParameterToInches(margin.bottom) || 0;
        const marginRight = convertPrintParameterToInches(margin.right) || 0;
        const result = await this._client.send("Page.printToPDF", {
            transferMode: "ReturnAsStream",
            landscape,
            displayHeaderFooter,
            headerTemplate,
            footerTemplate,
            printBackground,
            scale,
            paperWidth,
            paperHeight,
            marginTop,
            marginBottom,
            marginLeft,
            marginRight,
            pageRanges,
            preferCSSPageSize
        });
        return await helper.readProtocolStream(this._client, result.stream, path);
    }
    /**
      * @return {!Promise<string>}
      */
    async title() {
        return this.mainFrame().title();
    }
    /**
      * @param {!{runBeforeUnload: (boolean|undefined)}=} options
      */
    async close(options = {runBeforeUnload: undefined}) {
        assert(!!this._client._connection, "Protocol error: Connection closed. Most likely the page has been closed.");
        const runBeforeUnload = !!options.runBeforeUnload;
        if (runBeforeUnload) {
            await this._client.send("Page.close");
        } else {
            await this._client._connection.send("Target.closeTarget", { targetId: this._target._targetId });
            await this._target._isClosedPromise;
        }
    }
    /**
      * @return {boolean}
      */
    isClosed() {
        return this._closed;
    }
    /**
      * @return {!Mouse}
      */
    get mouse() {
        return this._mouse;
    }
    /**
      * @param {string} selector
      * @param {!{delay?: number, button?: "left"|"right"|"middle", clickCount?: number}=} options
      */
    click(selector, options = {}) {
        return this.mainFrame().click(selector, options);
    }
    /**
      * @param {string} selector
      */
    focus(selector) {
        return this.mainFrame().focus(selector);
    }
    /**
      * @param {string} selector
      */
    hover(selector) {
        return this.mainFrame().hover(selector);
    }
    /**
      * @param {string} selector
      * @param {!Array<string>} values
      * @return {!Promise<!Array<string>>}
      */
    select(selector, ...values) {
        return this.mainFrame().select(selector, ...values);
    }
    /**
      * @param {string} selector
      */
    tap(selector) {
        return this.mainFrame().tap(selector);
    }
    /**
      * @param {string} selector
      * @param {string} text
      * @param {{delay: (number|undefined)}=} options
      */
    type(selector, text, options) {
        return this.mainFrame().type(selector, text, options);
    }
    /**
      * @param {(string|number|Function)} selectorOrFunctionOrTimeout
      * @param {!Object=} options
      * @param {!Array<*>} args
      * @return {!Promise<!Puppeteer.JSHandle>}
      */
    waitFor(selectorOrFunctionOrTimeout, options = {}, ...args) {
        return this.mainFrame().waitFor(selectorOrFunctionOrTimeout, options, ...args);
    }
    /**
      * @param {string} selector
      * @param {!{visible?: boolean, hidden?: boolean, timeout?: number}=} options
      * @return {!Promise<?Puppeteer.ElementHandle>}
      */
    waitForSelector(selector, options = {}) {
        return this.mainFrame().waitForSelector(selector, options);
    }
    /**
      * @param {string} xpath
      * @param {!{visible?: boolean, hidden?: boolean, timeout?: number}=} options
      * @return {!Promise<?Puppeteer.ElementHandle>}
      */
    waitForXPath(xpath, options = {}) {
        return this.mainFrame().waitForXPath(xpath, options);
    }
    /**
      * @param {Function} pageFunction
      * @param {!{polling?: string|number, timeout?: number}=} options
      * @param {!Array<*>} args
      * @return {!Promise<!Puppeteer.JSHandle>}
      */
    waitForFunction(pageFunction, options = {}, ...args) {
        return this.mainFrame().waitForFunction(pageFunction, options, ...args);
    }
}
/**
  * @typedef {Object} PDFOptions
  * @property {number=} scale
  * @property {boolean=} displayHeaderFooter
  * @property {string=} headerTemplate
  * @property {string=} footerTemplate
  * @property {boolean=} printBackground
  * @property {boolean=} landscape
  * @property {string=} pageRanges
  * @property {string=} format
  * @property {string|number=} width
  * @property {string|number=} height
  * @property {boolean=} preferCSSPageSize
  * @property {!{top?: string|number, bottom?: string|number, left?: string|number, right?: string|number}=} margin
  * @property {string=} path
  */
/**
  * @typedef {Object} Metrics
  * @property {number=} Timestamp
  * @property {number=} Documents
  * @property {number=} Frames
  * @property {number=} JSEventListeners
  * @property {number=} Nodes
  * @property {number=} LayoutCount
  * @property {number=} RecalcStyleCount
  * @property {number=} LayoutDuration
  * @property {number=} RecalcStyleDuration
  * @property {number=} ScriptDuration
  * @property {number=} TaskDuration
  * @property {number=} JSHeapUsedSize
  * @property {number=} JSHeapTotalSize
  */
/**
  * @typedef {Object} ScreenshotOptions
  * @property {string=} type
  * @property {string=} path
  * @property {boolean=} fullPage
  * @property {{x: number, y: number, width: number, height: number}=} clip
  * @property {number=} quality
  * @property {boolean=} omitBackground
  * @property {string=} encoding
  */
/** @type {!Set<string>} */
const supportedMetrics = new Set([
    "Timestamp",
    "Documents",
    "Frames",
    "JSEventListeners",
    "Nodes",
    "LayoutCount",
    "RecalcStyleCount",
    "LayoutDuration",
    "RecalcStyleDuration",
    "ScriptDuration",
    "TaskDuration",
    "JSHeapUsedSize",
    "JSHeapTotalSize",
]);
/**
  * @typedef {Object} ConsoleMessage.Location
  * @property {string=} url
  * @property {number=} lineNumber
  * @property {number=} columnNumber
  */
class ConsoleMessage {
    /**
      * @param {string} type
      * @param {string} text
      * @param {!Array<!Puppeteer.JSHandle>} args
      * @param {ConsoleMessage.Location} location
      */
    constructor(type, text, args, location = {}) {
        this._type = type;
        this._text = text;
        this._args = args;
        this._location = location;
    }
    /**
      * @return {string}
      */
    type() {
        return this._type;
    }
    /**
      * @return {string}
      */
    text() {
        return this._text;
    }
    /**
      * @return {!Array<!Puppeteer.JSHandle>}
      */
    args() {
        return this._args;
    }
    /**
      * @return {Object}
      */
    location() {
        return this._location;
    }
}
exports_puppeteer_puppeteer_lib_Page = {Page, ConsoleMessage};
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/Target.js
*/
/**
  * Copyright 2019 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
// const {Events} = exports_puppeteer_puppeteer_lib_Events;
// const {Page} = exports_puppeteer_puppeteer_lib_Page;
// const {Worker} = exports_puppeteer_puppeteer_lib_Worker;
// const {Connection} = exports_puppeteer_puppeteer_lib_Connection;
class Target {
    /**
      * @param {!Protocol.Target.TargetInfo} targetInfo
      * @param {!Puppeteer.BrowserContext} browserContext
      * @param {!function():!Promise<!Puppeteer.CDPSession>} sessionFactory
      * @param {boolean} ignoreHTTPSErrors
      * @param {?Puppeteer.Viewport} defaultViewport
      * @param {!Puppeteer.TaskQueue} screenshotTaskQueue
      */
    constructor(targetInfo, browserContext, sessionFactory, ignoreHTTPSErrors, defaultViewport, screenshotTaskQueue) {
        this._targetInfo = targetInfo;
        this._browserContext = browserContext;
        this._targetId = targetInfo.targetId;
        this._sessionFactory = sessionFactory;
        this._ignoreHTTPSErrors = ignoreHTTPSErrors;
        this._defaultViewport = defaultViewport;
        this._screenshotTaskQueue = screenshotTaskQueue;
        /** @type {?Promise<!Puppeteer.Page>} */
        this._pagePromise = null;
        /** @type {?Promise<!Worker>} */
        this._workerPromise = null;
        this._initializedPromise = new Promise(fulfill => this._initializedCallback = fulfill).then(async success => {
            if (!success)
                return false;
            const opener = this.opener();
            if (!opener || !opener._pagePromise || this.type() !== "page")
                return true;
            const openerPage = await opener._pagePromise;
            if (!openerPage.listenerCount(Events.Page.Popup))
                return true;
            const popupPage = await this.page();
            openerPage.emit(Events.Page.Popup, popupPage);
            return true;
        });
        this._isClosedPromise = new Promise(fulfill => this._closedCallback = fulfill);
        this._isInitialized = this._targetInfo.type !== "page" || this._targetInfo.url !== "";
        if (this._isInitialized)
            this._initializedCallback(true);
    }
    /**
      * @return {!Promise<!Puppeteer.CDPSession>}
      */
    createCDPSession() {
        return this._sessionFactory();
    }
    /**
      * @return {!Promise<?Page>}
      */
    async page() {
        if ((this._targetInfo.type === "page" || this._targetInfo.type === "background_page") && !this._pagePromise) {
            this._pagePromise = this._sessionFactory()
                    .then(client => Page.create(client, this, this._ignoreHTTPSErrors, this._defaultViewport, this._screenshotTaskQueue));
        }
        return this._pagePromise;
    }
    /**
      * @return {!Promise<?Worker>}
      */
    async worker() {
        if (this._targetInfo.type !== "service_worker" && this._targetInfo.type !== "shared_worker")
            return null;
        if (!this._workerPromise) {
            this._workerPromise = this._sessionFactory().then(async client => {
                // Top level workers have a fake page wrapping the actual worker.
                const [targetAttached] = await Promise.all([
                    new Promise(x => client.once("Target.attachedToTarget", x)),
                    client.send("Target.setAutoAttach", {autoAttach: true, waitForDebuggerOnStart: false, flatten: true}),
                ]);
                const session = Connection.fromSession(client).session(targetAttached.sessionId);
                // TODO(einbinder): Make workers send their console logs.
                return new Worker(session, this._targetInfo.url, () => {} /* consoleAPICalled */, () => {} /* exceptionThrown */);
            });
        }
        return this._workerPromise;
    }
    /**
      * @return {string}
      */
    url() {
        return this._targetInfo.url;
    }
    /**
      * @return {"page"|"background_page"|"service_worker"|"shared_worker"|"other"|"browser"}
      */
    type() {
        const type = this._targetInfo.type;
        if (type === "page" || type === "background_page" || type === "service_worker" || type === "shared_worker" || type === "browser")
            return type;
        return "other";
    }
    /**
      * @return {!Puppeteer.Browser}
      */
    browser() {
        return this._browserContext.browser();
    }
    /**
      * @return {!Puppeteer.BrowserContext}
      */
    browserContext() {
        return this._browserContext;
    }
    /**
      * @return {?Puppeteer.Target}
      */
    opener() {
        const { openerId } = this._targetInfo;
        if (!openerId)
            return null;
        return this.browser()._targets.get(openerId);
    }
    /**
      * @param {!Protocol.Target.TargetInfo} targetInfo
      */
    _targetInfoChanged(targetInfo) {
        this._targetInfo = targetInfo;
        if (!this._isInitialized && (this._targetInfo.type !== "page" || this._targetInfo.url !== "")) {
            this._isInitialized = true;
            this._initializedCallback(true);
            return;
        }
    }
}
exports_puppeteer_puppeteer_lib_Target = {Target};
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/TaskQueue.js
*/
class TaskQueue {
    constructor() {
        this._chain = Promise.resolve();
    }
    /**
      * @param {Function} task
      * @return {!Promise}
      */
    postTask(task) {
        const result = this._chain.then(task);
        this._chain = result.catch(() => {});
        return result;
    }
}
exports_puppeteer_puppeteer_lib_TaskQueue = {TaskQueue};
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/TimeoutSettings.js
*/
/**
  * Copyright 2019 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
const DEFAULT_TIMEOUT = 30000;
class TimeoutSettings {
    constructor() {
        this._defaultTimeout = null;
        this._defaultNavigationTimeout = null;
    }
    /**
      * @param {number} timeout
      */
    setDefaultTimeout(timeout) {
        this._defaultTimeout = timeout;
    }
    /**
      * @param {number} timeout
      */
    setDefaultNavigationTimeout(timeout) {
        this._defaultNavigationTimeout = timeout;
    }
    /**
      * @return {number}
      */
    navigationTimeout() {
        if (this._defaultNavigationTimeout !== null)
            return this._defaultNavigationTimeout;
        if (this._defaultTimeout !== null)
            return this._defaultTimeout;
        return DEFAULT_TIMEOUT;
    }
    timeout() {
        if (this._defaultTimeout !== null)
            return this._defaultTimeout;
        return DEFAULT_TIMEOUT;
    }
}
exports_puppeteer_puppeteer_lib_TimeoutSettings = {TimeoutSettings};
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/api.js
*/
/**
  * Copyright 2019 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
exports_puppeteer_puppeteer_lib_api = {
    Browser: exports_puppeteer_puppeteer_lib_Browser.Browser,
    BrowserContext: exports_puppeteer_puppeteer_lib_Browser.BrowserContext,
    BrowserFetcher: exports_puppeteer_puppeteer_lib_BrowserFetcher,
    CDPSession: exports_puppeteer_puppeteer_lib_Connection.CDPSession,
    ConsoleMessage: exports_puppeteer_puppeteer_lib_Page.ConsoleMessage,
    Coverage: exports_puppeteer_puppeteer_lib_Coverage.Coverage,
    Dialog: exports_puppeteer_puppeteer_lib_Dialog.Dialog,
    ExecutionContext: exports_puppeteer_puppeteer_lib_ExecutionContext.ExecutionContext,
    Frame: exports_puppeteer_puppeteer_lib_FrameManager.Frame,
    JSHandle: exports_puppeteer_puppeteer_lib_JSHandle.JSHandle,
    Mouse: exports_puppeteer_puppeteer_lib_Input.Mouse,
    Page: exports_puppeteer_puppeteer_lib_Page.Page,
    Puppeteer: exports_puppeteer_puppeteer_lib_Puppeteer,
    Request: exports_puppeteer_puppeteer_lib_NetworkManager.Request,
    Response: exports_puppeteer_puppeteer_lib_NetworkManager.Response,
    SecurityDetails: exports_puppeteer_puppeteer_lib_NetworkManager.SecurityDetails,
    Target: exports_puppeteer_puppeteer_lib_Target.Target,
    TimeoutError: exports_puppeteer_puppeteer_lib_Errors.TimeoutError,
    Touchscreen: exports_puppeteer_puppeteer_lib_Input.Touchscreen,
};
/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/index.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
const api = exports_puppeteer_puppeteer_lib_api;
for (const className in api) {
    // Puppeteer-web excludes certain classes from bundle, e.g. BrowserFetcher.
    if (typeof api[className] === "function")
        helper.installAsyncStackHooks(api[className]);
}
// If node does not support async await, use the compiled version.
const Puppeteer = exports_puppeteer_puppeteer_lib_Puppeteer
const packageJson = exports_puppeteer_puppeteer_package_json;
const preferredRevision = packageJson.puppeteer.chromium_revision;
// let Browser         = exports_puppeteer_puppeteer_lib_Browser.Browser;
let BrowserFetcher  = exports_puppeteer_puppeteer_lib_BrowserFetcher;
// let Connection      = exports_puppeteer_puppeteer_lib_Connection.Connection;
// let Coverage        = exports_puppeteer_puppeteer_lib_Coverage.Coverage;
// let DOMWorld        = exports_puppeteer_puppeteer_lib_DOMWorld.DOMWorld;
// let DeviceDescriptors = exports_puppeteer_puppeteer_lib_DeviceDescriptors;
// let Dialog          = exports_puppeteer_puppeteer_lib_Dialog.Dialog;
// let EmulationManager = exports_puppeteer_puppeteer_lib_EmulationManager.EmulationManager;
// let TimeoutError    = exports_puppeteer_puppeteer_lib_Errors.TimeoutError;
// let Errors          = exports_puppeteer_puppeteer_lib_Errors;
// let Events          = exports_puppeteer_puppeteer_lib_Events.Events;
// let EVALUATION_SCRIPT_URL = exports_puppeteer_puppeteer_lib_ExecutionContext.EVALUATION_SCRIPT_URL;
// let ExecutionContext = exports_puppeteer_puppeteer_lib_ExecutionContext.ExecutionContext;
// let FrameManager    = exports_puppeteer_puppeteer_lib_FrameManager.FrameManager;
// let Mouse           = exports_puppeteer_puppeteer_lib_Input.Mouse;
// let Touchscreen     = exports_puppeteer_puppeteer_lib_Input.Touchscreen;
// let JSHandle        = exports_puppeteer_puppeteer_lib_JSHandle.JSHandle;
// let createJSHandle  = exports_puppeteer_puppeteer_lib_JSHandle.createJSHandle;
// let LifecycleWatcher = exports_puppeteer_puppeteer_lib_LifecycleWatcher.LifecycleWatcher;
// let NetworkManager  = exports_puppeteer_puppeteer_lib_NetworkManager.NetworkManager;
// let Page            = exports_puppeteer_puppeteer_lib_Page.Page;
// let Target          = exports_puppeteer_puppeteer_lib_Target.Target;
// let TaskQueue       = exports_puppeteer_puppeteer_lib_TaskQueue.TaskQueue;
// let TimeoutSettings = exports_puppeteer_puppeteer_lib_TimeoutSettings.TimeoutSettings;
// let assert          = exports_puppeteer_puppeteer_lib_helper.assert;
// let debugError      = exports_puppeteer_puppeteer_lib_helper.debugError;
// let helper          = exports_puppeteer_puppeteer_lib_helper.helper;
// let packageJson     = exports_puppeteer_puppeteer_package_json;
// let concat          = exports_websockets_ws_lib_buffer_util.concat;
// let mask            = exports_websockets_ws_lib_buffer_util.mask;
let GUID            = exports_websockets_ws_lib_constants.GUID;
let kStatusCode     = exports_websockets_ws_lib_constants.kStatusCode;
// let EventTarget     = exports_websockets_ws_lib_event_target;
let extension       = exports_websockets_ws_lib_extension;
local._puppeteer = exports_puppeteer_puppeteer_index;
local.puppeteerApi = exports_puppeteer_puppeteer_lib_api;
/*
file none
*/
local.puppeteerApi.Connection = Connection;
local.puppeteerApi.WebSocket = WebSocket;
/*
debugInline
net.connect Error
        at Object.netConnect [as createConnection] (/root/Documents/utility2/lib.puppeteer.js:3122:30)
        at new ClientRequest (_http_client.js:302:33)
        at request (http.js:46:10)
        at get (http.js:50:15)
        at initAsClient (/root/Documents/utility2/lib.puppeteer.js:2993:31)
        at new WebSocket (/root/Documents/utility2/lib.puppeteer.js:2508:7)
        at /root/Documents/utility2/lib.puppeteer.js:11813:18
        at new Promise (<anonymous>)
        at Function.create (/root/Documents/utility2/lib.puppeteer.js:11812:12)
        at /root/Documents/utility2/lib.utility2.js:2369:64
{
    protocolVersion: 13,
    maxPayload: 268435456,
    followRedirects: false,
    maxRedirects: 10,
    createConnection: [Function: netConnect],
    socketPath: undefined,
    hostname: undefined,
    protocol: undefined,
    timeout: undefined,
    method: undefined,
    auth: undefined,
    host: "127.0.0.1",
    path: "/devtools/browser/87392fa0-71e5-4fee-95c4-5c6665034c10",
    port: "34935",
    defaultPort: 80,
    headers: {
        "Sec-WebSocket-Version": 13,
        "Sec-WebSocket-Key": "ewtDA/p1EoxySjHWxY6DBw==",
        Connection: "Upgrade",
        Upgrade: "websocket"
    }
} ws://127.0.0.1:34935/devtools/browser/87392fa0-71e5-4fee-95c4-5c6665034c10
  */
/* jslint ignore:end */
}());
}());
