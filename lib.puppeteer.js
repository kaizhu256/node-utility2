#!/usr/bin/env node


// vim
// ,$s/^    \(async \)*\(\w\w*\)(/    Connection.prorotype.\2 = \1function (/gc
// ,$s/\(([^()]*)\) => {/function \1 {/gc
/*
        let that = this;
*/
// ,$s/\(\w\w*\) => {/function (\1) {/gc
// ,$s/\<this\>/that/gc
// ,$s/\(\w\w*\) => \(.*\)\([,)]\)/function (\1) { return \2; }\3/gc
// ,$s/\(\w\w*\) => \([^)]*\)\([,)]\)/function (\1) { return \2; }\3/gc
// ,$s/\(\w\w*\) => \([^,]*\)\([,)]\)/function (\1) { return \2; }\3/gc
// ,$s/\<\(if\|else\) .*[^{]$/& {/gc
// ,$s/^\( *\)\(\<\(if\|else\) .*[^{]\)\(\n.*\)/\1\2 {\4\r\1}/gc
// ,$s/^\( *\)\(\<else\)\(\n.*\)/\1\2 {\3\r\1}/gc
// ,$s/^\( *\)\<for (\(\w\w* \)*\(\w\w*\) of \(\w\S*\))\(\n.*\)/\1\4.forEach(function (\3) {\5\r\1});/gc // jslint ignore:line


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
/* jslint ignore:start */
const debugError = console.error;
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
let exports_puppeteer_puppeteer_lib_TimeoutSettings = {};
let exports_puppeteer_puppeteer_lib_api = {};
let exports_puppeteer_puppeteer_lib_helper = {};
let exports_puppeteer_puppeteer_node6_lib_Puppeteer = {};
let exports_websockets_ws_index = {};
let exports_websockets_ws_lib_buffer_util = {};
let exports_websockets_ws_lib_constants = {};
let exports_websockets_ws_lib_event_target = {};
let exports_websockets_ws_lib_validation = {};
/*
repo https://github.com/websockets/ws/tree/6.2.1
committed 2019-03-27T08:34:10Z
*/
/*
file https://github.com/websockets/ws/blob/6.2.1/lib/sender.js
*/
/* jslint ignore:end */
/*
file https://github.com/websockets/ws/blob/6.2.1/lib/websocket.js
*/
/**
  * @param {!Connection} connection
  * @param {string} targetType
  * @param {string} sessionId
  */
function CDPSession(sck2, targetType, sessionId) {
    let ssn = this;
    require("stream").EventEmitter.call(ssn);
    ssn.rpc4 = sck2.rpc4;
    ssn._targetType = targetType;
    ssn._sessionId = sessionId;
}
require("util").inherits(CDPSession, require("stream").EventEmitter);


function cdpClientCreate({
    websocketUrl
}, cdpClientResolve) {
/*
 * this function with create chrome-devtools-protocol-client from <websocketUrl>
 */
    let ERR_PAYLOAD_LENGTH;
    let READ_HEADER;
    let READ_LENGTH16;
    let READ_LENGTH63;
    let READ_PAYLOAD;
    let bufList;
    let callbackDict;
    let callbackId;
    let cdpClient;
    let cryptoKey;
    let onError;
    let payloadLength;
    let readState;
    let sessionDict;
    let websocket;
    let websocketReader;
    if (!cdpClientResolve) {
        return new Promise(function (resolve) {
            cdpClientCreate({
                websocketUrl
            }, resolve);
        });
    }
    /*
     * init cdpClient
     */
    function CdpClient() {
    /*
     * this function will construct cdpClient
     */
        require("stream").Duplex.call(this);
    }
    require("util").inherits(CdpClient, require("stream").Duplex);
    CdpClient.prototype._read = function () {
    /*
     * this function will implement stream.Duplex.prototype._read
     */
        if (websocket && websocket.readable) {
            websocket.resume();
        }
    };
    CdpClient.prototype._write = function (payload, ignore, callback) {
    /*
     * this function will implement stream.Duplex.prototype._write
     */
        let header;
        let maskKey;
        let result;
        // console.error("SEND ► " + payload.slice(0, 256).toString());
        // init header
        header = Buffer.alloc(2 + 8 + 4);
        // init fin = true
        header[0] |= 0x80;
        // init opcode = text-frame
        header[0] |= 1;
        // init mask = true
        header[1] |= 0x80;
        // init payloadLength
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
        websocket.cork();
        websocket.write(header);
        // send payload ^ maskKey
        payload.forEach(function (ignore, ii) {
            payload[ii] ^= maskKey[ii & 3];
        });
        // return write-result
        result = websocket.write(payload, callback);
        websocket.uncork();
        return result;
    };
    CdpClient.prototype.rpc4 = function (method, params, sessionId) {
    /*
     * this function will message-pass
     * JSON.stringify({id, <method>, <params>, <sessionId>})
     * to chrome-browser using chrome-devtools-protocol
     */
        callbackId = (callbackId % 1024) + 1;
        cdpClient.write(Buffer.from(JSON.stringify({
            id: callbackId,
            method,
            params,
            sessionId
        })));
        return new Promise(function (resolve, reject) {
            callbackDict = callbackDict || {};
            callbackDict[callbackId] = {
                resolve,
                reject,
                error: new Error(),
                method
            };
        });
    };
    callbackId = 0;
    cdpClient = new CdpClient();
    function createProtocolError(err, method, object) {
        err.message = (
            "Protocol error (" + method + "): " + object.error.message + (
                object.error.data
                ? " " + object.error.data
                : ""
            )
        );
        return err;
    }
    cdpClient.on("data", function (message) {
    /*
     * this function will handle callback for <message>
     * received from chrome-browser using chrome-devtools-protocol
     */
        // console.error("◀ RECV " + message.slice(0, 256).toString());
        let callback;
        let ssn;
        message = JSON.parse(message);
        local.assertOrThrow(!message.method || (
            /^[A-Z]\w*?\.[a-z]\w*?$/
        ).test(message.method), new Error(
            "cdpClient-response - invalid message.method " + message.method
        ));
        if (message.method === "Target.attachedToTarget") {
            ssn = new CDPSession(
                cdpClient,
                message.params.targetInfo.type,
                message.params.sessionId
            );
            sessionDict = sessionDict || {};
            cdpClient.sessionDict = sessionDict; // TODO - remove
            sessionDict[message.params.sessionId] = ssn;
        } else if (message.method === "Target.detachedFromTarget") {
            ssn = sessionDict[message.params.sessionId];
            if (ssn) {
                ssn._onClosed();
                delete sessionDict[message.params.sessionId];
            }
        }
        if (message.sessionId) {
            ssn = sessionDict[message.sessionId];
            if (!ssn) {
                return;
            }
            callback = callbackDict[message.id];
            if (callback) {
                delete callbackDict[message.id];
                if (message.error) {
                    callback.reject(createProtocolError(
                        callback.error,
                        callback.method,
                        message
                    ));
                    return;
                }
                callback.resolve(message.result);
                return;
            }
            local.assertOrThrow(!message.id, "missing message.id");
            ssn.emit(message.method, message.params);
            return;
        }
        if (message.id) {
            callback = callbackDict[message.id];
            // Callbacks could be all rejected if someone has called
            // `.dispose()`.
            if (!callback) {
                return;
            }
            delete callbackDict[message.id];
            if (message.error) {
                callback.reject(createProtocolError(
                    callback.error,
                    callback.method,
                    message
                ));
                return;
            }
            callback.resolve(message.result);
            return;
        }
        cdpClient.emit(message.method, message.params);
    });
    /*
     * init websocketReader
     */
/*
https://tools.ietf.org/html/draft-ietf-hybi-thewebsocketprotocol-13#section-5.2
+---------------------------------------------------------------+
|0               1               2               3              |
|0 1 2 3 4 5 6 7 8 9 a b c d e f 0 1 2 3 4 5 6 7 8 9 a b c d e f|
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |             (16/63)           |
|N|V|V|V|       |S|             |   (if payload len==126/127)   |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
|     Extended payload length continued, if payload len == 127  |
+ - - - - - - - - - - - - - - - +-------------------------------+
|                               |Masking-key, if MASK set to 1  |
+-------------------------------+-------------------------------+
| Masking-key (continued)       |          Payload Data         |
+-------------------------------- - - - - - - - - - - - - - - - +
:                     Payload Data continued ...                :
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
|                     Payload Data continued ...                |
+---------------------------------------------------------------+
FIN: 1 bit
    Indicates that this is the final fragment in a message.  The first
    fragment MAY also be the final fragment.
RSV1, RSV2, RSV3: 1 bit each
    MUST be 0 unless an extension is negotiated which defines meanings
    for non-zero values.  If a nonzero value is received and none of
    the negotiated extensions defines the meaning of such a nonzero
    value, the receiving endpoint MUST _Fail the WebSocket
    Connection_.
Opcode: 4 bits
    Defines the interpretation of the payload data.  If an unknown
    opcode is received, the receiving endpoint MUST _Fail the
    WebSocket Connection_.  The following values are defined.
    *  %x0 denotes a continuation frame
    *  %x1 denotes a text frame
    *  %x2 denotes a binary frame
    *  %x3-7 are reserved for further non-control frames
    *  %x8 denotes a connection close
    *  %x9 denotes a ping
    *  %xA denotes a pong
    *  %xB-F are reserved for further control frames
Mask: 1 bit
    Defines whether the payload data is masked.  If set to 1, a
    masking key is present in masking-key, and this is used to unmask
    the payload data as per Section 5.3.  All frames sent from client
    to server have this bit set to 1.
Payload length: 7 bits, 7+16 bits, or 7+64 bits
    The length of the payload data, in bytes: if 0-125, that is the
    payload length.  If 126, the following 2 bytes interpreted as a 16
    bit unsigned integer are the payload length.  If 127, the
    following 8 bytes interpreted as a 64-bit unsigned integer (the
    most significant bit MUST be 0) are the payload length.  Multibyte
    length quantities are expressed in network byte order.  The
    payload length is the length of the extension data + the length of
    the application data.  The length of the extension data may be
    zero, in which case the payload length is the length of the
    application data.
Masking-key: 0 or 4 bytes
    All frames sent from the client to the server are masked by a 32-
    bit value that is contained within the frame.  This field is
    present if the mask bit is set to 1, and is absent if the mask bit
    is set to 0.  See Section 5.3 for further information on client-
    to-server masking.
Payload data: (x+y) bytes
    The payload data is defined as extension data concatenated with
    application data.
Extension data: x bytes
    The extension data is 0 bytes unless an extension has been
    negotiated.  Any extension MUST specify the length of the
    extension data, or how that length may be calculated, and how the
    extension use MUST be negotiated during the opening handshake.  If
    present, the extension data is included in the total payload
    length.
Application data: y bytes
    Arbitrary application data, taking up the remainder of the frame
    after any extension data.  The length of the application data is
    equal to the payload length minus the length of the extension
    data.
*/
    function bufListRead(nn) {
    /*
     * this function will read <nn> bytes from <bufList>
     */
        let buf;
        bufList = (
            bufList.length === 1
            ? bufList[0]
            : Buffer.concat(bufList)
        );
        buf = bufList.slice(0, nn);
        bufList = [
            bufList.slice(nn)
        ];
        return buf;
    }
    function frameRead() {
    /*
     * this function will read from websocket-data-frame
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
            local.assertOrThrow(opcode === 0x01, new Error(
                "Invalid WebSocket frame: opcode must be 0x01, not 0x0"
                + opcode.toString(16)
            ));
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
            cdpClient.push(buf);
            break;
        }
        local.assertOrThrow(
            0 <= payloadLength && payloadLength <= 256 * 1024 * 1024,
            ERR_PAYLOAD_LENGTH
        );
        return true;
    }
    function WebsocketReader() {
    /*
     * this function will construct websocketReader
     */
        require("stream").Transform.call(this);
    }
    require("util").inherits(WebsocketReader, require("stream").Transform);
    WebsocketReader.prototype._transform = function (chunk, ignore, callback) {
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
    ERR_PAYLOAD_LENGTH = new RangeError(
        "payload-length must be between 0 and 256 MiB"
    );
    READ_HEADER = 0;
    READ_LENGTH16 = 1;
    READ_LENGTH63 = 2;
    READ_PAYLOAD = 3;
    bufList = [];
    payloadLength = 0;
    readState = READ_HEADER;
    websocketReader = new WebsocketReader();
    /*
     * init websocket
     */
    cryptoKey = require("crypto").randomBytes(16).toString("base64");
    onError = cdpClient._destroy.bind(cdpClient);
    require("http").get(Object.assign(require("url").parse(websocketUrl), {
        "createConnection": function (opt) {
            opt.path = opt.socketPath;
            return require("net").connect(opt);
        },
        "headers": {
            "Connection": "Upgrade",
            "Sec-WebSocket-Key": cryptoKey,
            "Sec-WebSocket-Version": 13,
            "Upgrade": "websocket"
        },
        "protocol": "http:",
        "protocolVersion": 13
    })).once("upgrade", function (res, _websocket, head) {
        local.assertOrThrow(
            (
                res.headers["sec-websocket-accept"]
                === require("crypto").createHash("sha1").update(
                    cryptoKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
                ).digest("base64")
            ),
            new Error("Invalid Sec-WebSocket-Accept header")
        );
        websocket = _websocket;
        websocket.on("error", onError);
        websocket.unshift(head);
        // websocket - disable timeout
        websocket.setTimeout(0);
        // websocket - disable nagle's algorithm
        websocket.setNoDelay();
        /*
        websocket.on("end", websocket.end);
        websocket.once("error", function () {
            websocket.destroy();
        });
        */
        // pipe websocket to websocketReader
        websocket.pipe(websocketReader);
        // resolve cdpClient
        cdpClientResolve(cdpClient);
    }).on("error", onError);
}
local.noop(cdpClientCreate);
/* jslint ignore:start */
/*
repo https://github.com/puppeteer/puppeteer/tree/v1.19.0
committed 2019-07-23T05:02:45Z
*/
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
            if (remoteObject.type === "bigint" && typeof BigInt !== "undefined") {
                return BigInt(remoteObject.unserializableValue.replace("n", ""));
            }
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
      * @param {!Object} classType
      */
    static installAsyncStackHooks(classType) {
        for (const methodName of Reflect.ownKeys(classType.prototype)) {
            const method = Reflect.get(classType.prototype, methodName);
            if (methodName === "constructor" || typeof methodName !== "string" || methodName.startsWith("_") || typeof method !== "function" || method.constructor.name !== "AsyncFunction") {
                continue;
            }
            Reflect.set(classType.prototype, methodName, function(...args) {
                const syncStack = {};
                Error.captureStackTrace(syncStack);
                return method.call(this, ...args).catch(function (e) {
                    const stack = syncStack.stack.substring(syncStack.stack.indexOf("\n") + 1);
                    const clientStack = stack.substring(stack.indexOf("\n"));
                    if (e instanceof Error && e.stack && !e.stack.includes(clientStack)) {
                        e.stack += "\n  -- ASYNC --\n" + stack;
                    }
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
        listeners.forEach(function (listener) {
            listener.emitter.removeListener(listener.eventName, listener.handler);
        });
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
            return new Promise(function (resolve, reject) {
                function callback(err, ...result) {
                    if (err) {
                        return reject(err);
                    }
                    if (result.length === 1) {
                        return resolve(result[0]);
                    }
                    return resolve(result);
                }
                nodeFunction.call(null, ...args, callback);
            });
        }
        return promisified;
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
        const timeoutPromise = new Promise(function (resolve, x) { return reject = x; });
        let timeoutTimer = null;
        if (timeout) {
            timeoutTimer = setTimeout(function () { return reject(timeoutError); }, timeout);
        }
        try {
            return await Promise.race([promise, timeoutPromise]);
        } finally {
            if (timeoutTimer) {
                clearTimeout(timeoutTimer);
            }
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
    if (!value) {
        throw new Error(message);
    }
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
// const {Events} = exports_puppeteer_puppeteer_lib_Events;
class Browser extends EventEmitter {
    static async create(sck2, process, chromeKill) {
        const browser = new Browser(sck2, process);
        browser.chromeKill = chromeKill;
        await sck2.rpc4("Target.setDiscoverTargets", {discover: true});
        return browser;
    }
    /**
      * @param {!Puppeteer.sck2} sck2
      * @param {?Puppeteer.ChildProcess} process
      */
    constructor(sck2, process) {
        super();
        let brw = this;
        brw._process = process;
        brw.sck2 = sck2;
        brw.rpc4 = sck2.rpc4;
        /** @type {Map<string, Target>} */
        brw._targets = new Map();
        brw.sck2.on("Target.targetCreated", async function _targetCreated(event) {
            const targetInfo = event.targetInfo;
            const {browserContextId} = targetInfo;
            const target = new Target(targetInfo, async function () {
                const {
                    sessionId
                } = await brw.rpc4("Target.attachToTarget", {
                    targetId: targetInfo.targetId,
                    flatten: true
                });
                return brw.sck2.sessionDict[sessionId];
            });
            assert(!brw._targets.has(event.targetInfo.targetId), "Target should not exist before targetCreated");
            brw._targets.set(event.targetInfo.targetId, target);
            if (await target._initializedPromise) {
                brw.emit(Events.Browser.TargetCreated, target);
            }
        });
        brw.sck2.on("Target.targetInfoChanged", function _targetInfoChanged(event) {
            const target = brw._targets.get(event.targetInfo.targetId);
            assert(target, "target should exist before targetInfoChanged");
            const previousURL = target.url();
            const wasInitialized = target._isInitialized;
            target._targetInfoChanged(event.targetInfo);
            if (wasInitialized && previousURL !== target.url()) {
                brw.emit(Events.Browser.TargetChanged, target);
            }
        });
    }
    /**
      * @return {!Promise<!Puppeteer.Page>}
      */
    async newPage() {
        return this._createPageInContext();
    }
    /**
      * @param {?string} contextId
      * @return {!Promise<!Puppeteer.Page>}
      */
    async _createPageInContext(contextId) {
        const {targetId} = await this.rpc4("Target.createTarget", {url: "about:blank", browserContextId: contextId || undefined});
        const target = await this._targets.get(targetId);
        assert(await target._initializedPromise, "Failed to create target for page");
        const page = await target.page();
        return page;
    }
    /**
      * @return {!Array<!Target>}
      */
    targets() {
        return Array.from(this._targets.values()).filter(function (target) { return target._isInitialized; });
    }
    /**
      * @return {!Target}
      */
    target() {
        return this.targets().find(function (target) { return target.type() === "browser"; });
    }
    /**
      * @param {function(!Target):boolean} predicate
      * @param {{timeout?: number}=} options
      * @return {!Promise<!Target>}
      */
    async waitForTarget(predicate, options = {}) {
        let brw = this;
        const {
            timeout = 30000
        } = options;
        const existingTarget = brw.targets().find(predicate);
        if (existingTarget) {
            return existingTarget;
        }
        let resolve;
        const targetPromise = new Promise(function (x) { return resolve = x; });
        brw.on(Events.Browser.TargetCreated, check);
        brw.on(Events.Browser.TargetChanged, check);
        try {
            if (!timeout) {
                return await targetPromise;
            }
            return await helper.waitWithTimeout(targetPromise, "target", timeout);
        } finally {
            brw.removeListener(Events.Browser.TargetCreated, check);
            brw.removeListener(Events.Browser.TargetChanged, check);
        }
        /**
          * @param {!Target} target
          */
        function check(target) {
            if (predicate(target)) {
                resolve(target);
            }
        }
    }
    async close() {
        await this.chromeKill();
        this.sck2.end();
    }
}
exports_puppeteer_puppeteer_lib_Browser = {Browser};


/* jslint ignore:end */
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
        DOMContentLoaded: "domcontentloaded",
        Error: "error",
        // Can't use just "error" due to node.js special treatment
        // of error events.
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
        WorkerDestroyed: "workerdestroyed"
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
        TargetChanged: "targetchanged"
    },
    NetworkManager: {
        Request: Symbol("Events.NetworkManager.Request"),
        Response: Symbol("Events.NetworkManager.Response"),
        RequestFailed: Symbol("Events.NetworkManager.RequestFailed"),
        RequestFinished: Symbol("Events.NetworkManager.RequestFinished")
    },
    FrameManager: {
        FrameAttached: Symbol("Events.FrameManager.FrameAttached"),
        FrameNavigated: Symbol("Events.FrameManager.FrameNavigated"),
        FrameDetached: Symbol("Events.FrameManager.FrameDetached"),
        LifecycleEvent: Symbol("Events.FrameManager.LifecycleEvent"),
        FrameNavigatedWithinDocument: Symbol(
            "Events.FrameManager.FrameNavigatedWithinDocument"
        ),
        ExecutionContextCreated: Symbol(
            "Events.FrameManager.ExecutionContextCreated"
        ),
        ExecutionContextDestroyed: Symbol(
            "Events.FrameManager.ExecutionContextDestroyed"
        )
    },
    Connection: {
        Disconnected: Symbol("Events.Connection.Disconnected")
    },
    CDPSession: {
        Disconnected: Symbol("Events.CDPSession.Disconnected")
    }
};
local.noop(Events);
/* jslint ignore:start */
exports_puppeteer_puppeteer_lib_Events = { Events };
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
      * @param {!Puppeteer.CDPSession} ssn
      */
    constructor(ssn) {
        this._jsCoverage = new JSCoverage(ssn);
        this._cssCoverage = new CSSCoverage(ssn);
    }
}
exports_puppeteer_puppeteer_lib_Coverage = {Coverage};
class JSCoverage {
    /**
      * @param {!Puppeteer.CDPSession} ssn
      */
    constructor(ssn) {
        this.ssn = ssn;
        this._enabled = false;
        this._scriptURLs = new Map();
        this._scriptSources = new Map();
        this._eventListeners = [];
        this._resetOnNavigation = false;
    }
}
class CSSCoverage {
    /**
      * @param {!Puppeteer.CDPSession} ssn
      */
    constructor(ssn) {
        this.ssn = ssn;
        this._enabled = false;
        this._stylesheetURLs = new Map();
        this._stylesheetSources = new Map();
        this._eventListeners = [];
        this._resetOnNavigation = false;
    }
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
        let that = this;
        if (context) {
            this._contextResolveCallback.call(null, context);
            this._contextResolveCallback = null;
            this._waitTasks.forEach(function (waitTask) {
                waitTask.rerun();
            });
        } else {
            this._documentPromise = null;
            this._contextPromise = new Promise(function (fulfill) {
                that._contextResolveCallback = fulfill;
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
        this._waitTasks.forEach(function (waitTask) {
            waitTask.terminate(new Error("waitForFunction failed: frame got detached."));
        });
    }
    /**
      * @return {!Promise<!Puppeteer.ExecutionContext>}
      */
    executionContext() {
        if (this._detached) {
            throw new Error(`Execution Context is not available in detached frame "${this._frame.url()}" (are you trying to evaluate?)`);
        }
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
      * @param {!Puppeteer.CDPSession} ssn
      */
    constructor(ssn) {
        this.ssn = ssn;
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
            this.ssn.rpc4("Emulation.setDeviceMetricsOverride", { mobile, width, height, deviceScaleFactor, screenOrientation }, this.ssn._sessionId),
            this.ssn.rpc4("Emulation.setTouchEmulationEnabled", {
                enabled: hasTouch
            }, this.ssn._sessionId)
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
      * @param {!Puppeteer.CDPSession} ssn
      * @param {!Protocol.Runtime.ExecutionContextDescription} contextPayload
      * @param {?Puppeteer.DOMWorld} world
      */
    constructor(ssn, contextPayload, world) {
        this.ssn = ssn;
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
            const {exceptionDetails, result: remoteObject} = await this.ssn.rpc4("Runtime.evaluate", {
                expression: expressionWithSourceUrl,
                contextId,
                returnByValue,
                awaitPromise: true,
                userGesture: true
            }, this.ssn._sessionId).catch(function (error) {
                if (error.message.includes("Object reference chain is too long")) {
                    return {result: {type: "undefined"}};
                }
                if (error.message.includes("Object couldn't be returned by value")) {
                    return {result: {type: "undefined"}};
                }
                if (error.message.endsWith("Cannot find context with specified id")) {
                    throw new Error("Execution context was destroyed, most likely because of a navigation.");
                }
                throw error;
            });
            if (exceptionDetails) {
                throw new Error("Evaluation failed: " + helper.getExceptionMessage(exceptionDetails));
            }
            return returnByValue ? helper.valueFromRemoteObject(remoteObject) : createJSHandle(this, remoteObject);
        }
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
      * @param {!Puppeteer.CDPSession} ssn
      * @param {!Puppeteer.Page} page
      * @param {!Puppeteer.TimeoutSettings} timeoutSettings
      */
    constructor(ssn, page, timeoutSettings) {
        super();
        let that = this;
        that.ssn = ssn;
        that._page = page;
        that._networkManager = new NetworkManager(ssn);
        that._networkManager.setFrameManager(that);
        that._timeoutSettings = timeoutSettings;
        /** @type {!Map<string, !Frame>} */
        that._frames = new Map();
        /** @type {!Map<number, !ExecutionContext>} */
        that._contextIdToContext = new Map();
        /** @type {!Set<string>} */
        that._isolatedWorlds = new Set();
        that.ssn.on("Page.frameAttached", function (event) { return that._onFrameAttached(event.frameId, event.parentFrameId); });
        that.ssn.on("Page.frameNavigated", function (event) { return that._onFrameNavigated(event.frame); });
        that.ssn.on("Page.navigatedWithinDocument", function (event) { return that._onFrameNavigatedWithinDocument(event.frameId, event.url); });
        that.ssn.on("Page.frameDetached", function (event) { return that._onFrameDetached(event.frameId); });
        that.ssn.on("Page.frameStoppedLoading", function (event) { return that._onFrameStoppedLoading(event.frameId); });
        that.ssn.on("Runtime.executionContextCreated", function (event) { return that._onExecutionContextCreated(event.context); });
        that.ssn.on("Runtime.executionContextDestroyed", function (event) { return that._onExecutionContextDestroyed(event.executionContextId); });
        that.ssn.on("Runtime.executionContextsCleared", function (event) { return that._onExecutionContextsCleared(); });
        that.ssn.on("Page.lifecycleEvent", function (event) { return that._onLifecycleEvent(event); });
    }
    async initialize() {
        let that = this;
        const [,{frameTree}] = await Promise.all([
            that.ssn.rpc4("Page.enable", undefined, that.ssn._sessionId),
            that.ssn.rpc4("Page.getFrameTree", undefined, that.ssn._sessionId),
        ]);
        that._handleFrameTree(frameTree);
        await Promise.all([
            that.ssn.rpc4("Page.setLifecycleEventsEnabled", { enabled: true }, that.ssn._sessionId),
            that.ssn.rpc4("Runtime.enable", {}, that.ssn._sessionId).then(function () { return that._ensureIsolatedWorld(UTILITY_WORLD_NAME); }),
            that._networkManager.initialize(),
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
            navigate(this.ssn, url, referer, frame._id),
            watcher.timeoutOrTerminationPromise(),
        ]);
        if (!error) {
            error = await Promise.race([
                watcher.timeoutOrTerminationPromise(),
                ensureNewDocumentNavigation ? watcher.newDocumentNavigationPromise() : watcher.sameDocumentNavigationPromise(),
            ]);
        }
        watcher.dispose();
        if (error) {
            throw error;
        }
        return watcher.navigationResponse();
        /**
          * @param {!Puppeteer.CDPSession} ssn
          * @param {string} url
          * @param {string} referrer
          * @param {string} frameId
          * @return {!Promise<?Error>}
          */
        async function navigate(ssn, url, referrer, frameId) {
            try {
                const response = await ssn.rpc4("Page.navigate", {url, referrer, frameId}, ssn._sessionId);
                ensureNewDocumentNavigation = !!response.loaderId;
                return response.errorText ? new Error(`${response.errorText} at ${url}`) : null;
            } catch (error) {
                return error;
            }
        }
    }
    /**
      * @param {!Protocol.Page.lifecycleEventPayload} event
      */
    _onLifecycleEvent(event) {
        const frame = this._frames.get(event.frameId);
        if (!frame) {
            return;
        }
        frame._onLifecycleEvent(event.loaderId, event.name);
        this.emit(Events.FrameManager.LifecycleEvent, frame);
    }
    /**
      * @param {string} frameId
      */
    _onFrameStoppedLoading(frameId) {
        const frame = this._frames.get(frameId);
        if (!frame) {
            return;
        }
        frame._onLoadingStopped();
        this.emit(Events.FrameManager.LifecycleEvent, frame);
    }
    /**
      * @param {!Protocol.Page.FrameTree} frameTree
      */
    _handleFrameTree(frameTree) {
        let that = this;
        if (frameTree.frame.parentId) {
            that._onFrameAttached(frameTree.frame.id, frameTree.frame.parentId);
        }
        that._onFrameNavigated(frameTree.frame);
        if (!frameTree.childFrames) {
            return;
        }
        frameTree.childFrames.forEach(function (child) {
            that._handleFrameTree(child);
        });
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
        if (this._frames.has(frameId)) {
            return;
        }
        assert(parentFrameId);
        const parentFrame = this._frames.get(parentFrameId);
        const frame = new Frame(this, this.ssn, parentFrame, frameId);
        this._frames.set(frame._id, frame);
        this.emit(Events.FrameManager.FrameAttached, frame);
    }
    /**
      * @param {!Protocol.Page.Frame} framePayload
      */
    _onFrameNavigated(framePayload) {
        let that = this;
        const isMainFrame = !framePayload.parentId;
        let frame = isMainFrame ? that._mainFrame : that._frames.get(framePayload.id);
        assert(isMainFrame || frame, "We either navigate top level or have old version of the navigated frame");
        // Detach all child frames first.
        if (frame) {
            frame.childFrames().forEach(function (child) {
                that._removeFramesRecursively(child);
            });
        }
        // Update or create main frame.
        if (isMainFrame) {
            if (frame) {
                // Update frame id to retain frame identity on cross-process navigation.
                that._frames.delete(frame._id);
                frame._id = framePayload.id;
            } else {
                // Initial main frame navigation.
                frame = new Frame(that, that.ssn, null, framePayload.id);
            }
            that._frames.set(framePayload.id, frame);
            that._mainFrame = frame;
        }
        // Update frame payload.
        frame._navigated(framePayload);
        that.emit(Events.FrameManager.FrameNavigated, frame);
    }
    /**
      * @param {string} name
      */
    async _ensureIsolatedWorld(name) {
        let that = this;
        if (that._isolatedWorlds.has(name)) {
            return;
        }
        that._isolatedWorlds.add(name);
        await that.ssn.rpc4("Page.addScriptToEvaluateOnNewDocument", {
            source: `//# sourceURL=${EVALUATION_SCRIPT_URL}`,
            worldName: name,
        }, that.ssn._sessionId),
        await Promise.all(that.frames().map(function (frame) { return that.ssn.rpc4("Page.createIsolatedWorld", {
            frameId: frame._id,
            grantUniveralAccess: true,
            worldName: name,
        }, that.ssn._sessionId).catch(debugError); })); // frames might be removed before we send this
    }
    /**
      * @param {string} frameId
      * @param {string} url
      */
    _onFrameNavigatedWithinDocument(frameId, url) {
        const frame = this._frames.get(frameId);
        if (!frame) {
            return;
        }
        frame._navigatedWithinDocument(url);
        this.emit(Events.FrameManager.FrameNavigatedWithinDocument, frame);
        this.emit(Events.FrameManager.FrameNavigated, frame);
    }
    /**
      * @param {string} frameId
      */
    _onFrameDetached(frameId) {
        const frame = this._frames.get(frameId);
        if (frame) {
            this._removeFramesRecursively(frame);
        }
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
        if (contextPayload.auxData && contextPayload.auxData["type"] === "isolated") {
            this._isolatedWorlds.add(contextPayload.name);
        }
        /** @type {!ExecutionContext} */
        const context = new ExecutionContext(this.ssn, contextPayload, world);
        if (world) {
            world._setContext(context);
        }
        this._contextIdToContext.set(contextPayload.id, context);
    }
    /**
      * @param {number} executionContextId
      */
    _onExecutionContextDestroyed(executionContextId) {
        const context = this._contextIdToContext.get(executionContextId);
        if (!context) {
            return;
        }
        this._contextIdToContext.delete(executionContextId);
        if (context._world) {
            context._world._setContext(null);
        }
    }
    _onExecutionContextsCleared() {
        for (const context of this._contextIdToContext.values()) {
            if (context._world) {
                context._world._setContext(null);
            }
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
        let that = this;
        frame.childFrames().forEach(function (child) {
            that._removeFramesRecursively(child);
        });
        frame._detach();
        that._frames.delete(frame._id);
        that.emit(Events.FrameManager.FrameDetached, frame);
    }
}
/**
  * @unrestricted
  */
class Frame {
    /**
      * @param {!FrameManager} frameManager
      * @param {!Puppeteer.CDPSession} ssn
      * @param {?Frame} parentFrame
      * @param {string} frameId
      */
    constructor(frameManager, ssn, parentFrame, frameId) {
        this._frameManager = frameManager;
        this.ssn = ssn;
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
        if (this._parentFrame) {
            this._parentFrame._childFrames.add(this);
        }
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
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<*>}
      */
    async evaluate(pageFunction, ...args) {
        return this._mainWorld.evaluate(pageFunction, ...args);
    }
    /**
      * @return {!Array.<!Frame>}
      */
    childFrames() {
        return Array.from(this._childFrames);
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
        return new ElementHandle(context, context.ssn, remoteObject, frameManager.page(), frameManager);
    }
    return new JSHandle(context, context.ssn, remoteObject);
}
class JSHandle {
    /**
      * @param {!Puppeteer.ExecutionContext} context
      * @param {!Puppeteer.CDPSession} ssn
      * @param {!Protocol.Runtime.RemoteObject} remoteObject
      */
    constructor(context, ssn, remoteObject) {
        this._context = context;
        this.ssn = ssn;
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
        const objectHandle = await this._context.evaluateHandle(function (object, propertyName) {
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
      * @return {?Puppeteer.ElementHandle}
      */
    asElement() {
        return null;
    }
    async dispose() {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
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
        let that = this;
        if (Array.isArray(waitUntil)) {
            waitUntil = waitUntil.slice();
        }
        else if (typeof waitUntil === "string") {
            waitUntil = [waitUntil];
        }
        that._expectedLifecycle = waitUntil.map(function (value) {
            const protocolEvent = puppeteerToProtocolLifecycle[value];
            assert(protocolEvent, "Unknown value for options.waitUntil: " + value);
            return protocolEvent;
        });
        that._frameManager = frameManager;
        that._frame = frame;
        that._initialLoaderId = frame._loaderId;
        that._timeout = timeout;
        /** @type {?Puppeteer.Request} */
        that._navigationRequest = null;
        that._eventListeners = [
            helper.addEventListener(frameManager.ssn, Events.CDPSession.Disconnected, function () { return that._terminate(new Error("Navigation failed because browser has disconnected!")); }),
            helper.addEventListener(that._frameManager, Events.FrameManager.LifecycleEvent, that._checkLifecycleComplete.bind(that)),
            helper.addEventListener(that._frameManager, Events.FrameManager.FrameNavigatedWithinDocument, that._navigatedWithinDocument.bind(that)),
            helper.addEventListener(that._frameManager, Events.FrameManager.FrameDetached, that._onFrameDetached.bind(that)),
            helper.addEventListener(that._frameManager.networkManager(), Events.NetworkManager.Request, that._onRequest.bind(that)),
        ];
        that._sameDocumentNavigationPromise = new Promise(function (fulfill) {
            that._sameDocumentNavigationCompleteCallback = fulfill;
        });
        that._lifecyclePromise = new Promise(function (fulfill) {
            that._lifecycleCallback = fulfill;
        });
        that._newDocumentNavigationPromise = new Promise(function (fulfill) {
            that._newDocumentNavigationCompleteCallback = fulfill;
        });
        that._timeoutPromise = that._createTimeoutPromise();
        that._terminationPromise = new Promise(function (fulfill) {
            that._terminationCallback = fulfill;
        });
        that._checkLifecycleComplete();
    }
    /**
      * @param {!Puppeteer.Request} request
      */
    _onRequest(request) {
        if (request.frame() !== this._frame || !request.isNavigationRequest()) {
            return;
        }
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
      * @return {!Promise<?Error>}
      */
    timeoutOrTerminationPromise() {
        return Promise.race([this._timeoutPromise, this._terminationPromise]);
    }
    /**
      * @return {!Promise<?Error>}
      */
    _createTimeoutPromise() {
        let that = this;
        if (!that._timeout) {
            return new Promise(function () {});
        }
        const errorMessage = "Navigation Timeout Exceeded: " + that._timeout + "ms exceeded";
        return new Promise(function (fulfill) { return that._maximumTimer = setTimeout(fulfill, that._timeout); })
                .then(function () { return new TimeoutError(errorMessage); });
    }
    /**
      * @param {!Puppeteer.Frame} frame
      */
    _navigatedWithinDocument(frame) {
        if (frame !== this._frame) {
            return;
        }
        this._hasSameDocumentNavigation = true;
        this._checkLifecycleComplete();
    }
    _checkLifecycleComplete() {
        // We expect navigation to commit.
        if (!checkLifecycle(this._frame, this._expectedLifecycle)) {
            return;
        }
        this._lifecycleCallback();
        if (this._frame._loaderId === this._initialLoaderId && !this._hasSameDocumentNavigation) {
            return;
        }
        if (this._hasSameDocumentNavigation) {
            this._sameDocumentNavigationCompleteCallback();
        }
        if (this._frame._loaderId !== this._initialLoaderId) {
            this._newDocumentNavigationCompleteCallback();
        }
        /**
          * @param {!Puppeteer.Frame} frame
          * @param {!Array<string>} expectedLifecycle
          * @return {boolean}
          */
        function checkLifecycle(frame, expectedLifecycle) {
            for (const event of expectedLifecycle) {
                if (!frame._lifecycleEvents.has(event)) {
                    return false;
                }
            }
            for (const child of frame.childFrames()) {
                if (!checkLifecycle(child, expectedLifecycle)) {
                    return false;
                }
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
      * @param {!Puppeteer.CDPSession} ssn
      */
    constructor(ssn) {
        super();
        this.ssn = ssn;
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
        this.ssn.on("Network.requestWillBeSent", this._onRequestWillBeSent.bind(this));
        this.ssn.on("Network.responseReceived", this._onResponseReceived.bind(this));
        this.ssn.on("Network.loadingFinished", this._onLoadingFinished.bind(this));
    }
    async initialize() {
        await this.ssn.rpc4("Network.enable", undefined, this.ssn._sessionId);
        if (this._ignoreHTTPSErrors) {
            await this.ssn.rpc4("Security.setIgnoreCertificateErrors", {ignore: true}, this.ssn._sessionId);
        }
    }
    /**
      * @param {!Puppeteer.FrameManager} frameManager
      */
    setFrameManager(frameManager) {
        this._frameManager = frameManager;
    }
    /**
      * @return {!Object<string, string>}
      */
    extraHTTPHeaders() {
        return Object.assign({}, this._extraHTTPHeaders);
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
      * @param {!Protocol.Network.requestWillBeSentPayload} event
      * @param {?string} interceptionId
      */
    _onRequest(event, interceptionId) {
        const frame = event.frameId && this._frameManager ? this._frameManager.frame(event.frameId) : null;
        const request = new Request(this.ssn, frame, interceptionId, this._userRequestInterceptionEnabled, event);
        this._requestIdToRequest.set(event.requestId, request);
        this.emit(Events.NetworkManager.Request, request);
    }
    /**
      * @param {!Protocol.Network.responseReceivedPayload} event
      */
    _onResponseReceived(event) {
        const request = this._requestIdToRequest.get(event.requestId);
        // FileUpload sends a response without a matching request.
        if (!request) {
            return;
        }
        const response = new Response(this.ssn, request, event.response);
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
        if (!request) {
            return;
        }
        // Under certain conditions we never get the Network.responseReceived
        // event from protocol. @see https://crbug.com/883475
        if (request.response()) {
            request.response()._bodyLoadedPromiseFulfill.call(null);
        }
        this._requestIdToRequest.delete(request._requestId);
        this._attemptedAuthentications.delete(request._interceptionId);
        this.emit(Events.NetworkManager.RequestFinished, request);
    }
}
class Request {
    /**
      * @param {!Puppeteer.CDPSession} ssn
      * @param {?Puppeteer.Frame} frame
      * @param {string} interceptionId
      * @param {boolean} allowInterception
      * @param {!Protocol.Network.requestWillBeSentPayload} event
      */
    constructor(ssn, frame, interceptionId, allowInterception, event) {
        let that = this;
        that.ssn = ssn;
        that._requestId = event.requestId;
        that._isNavigationRequest = event.requestId === event.loaderId && event.type === "Document";
        that._interceptionId = interceptionId;
        that._allowInterception = allowInterception;
        that._interceptionHandled = false;
        that._response = null;
        that._failureText = null;
        that._url = event.request.url;
        that._resourceType = event.type.toLowerCase();
        that._method = event.request.method;
        that._postData = event.request.postData;
        that._headers = {};
        that._frame = frame;
        Object.keys(event.request.headers).forEach(function (key) {
            that._headers[key.toLowerCase()] = event.request.headers[key];
        });
        that._fromMemoryCache = false;
    }
    /**
      * @return {string}
      */
    url() {
        return this._url;
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
      * @return {?{errorText: string}}
      */
    failure() {
        if (!this._failureText) {
            return null;
        }
        return {
            errorText: this._failureText
        };
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
      * @param {!Puppeteer.CDPSession} ssn
      * @param {!Request} request
      * @param {!Protocol.Network.Response} responsePayload
      */
    constructor(ssn, request, responsePayload) {
        let that = this;
        that.ssn = ssn;
        that._request = request;
        that._contentPromise = null;
        that._bodyLoadedPromise = new Promise(function (fulfill) {
            that._bodyLoadedPromiseFulfill = fulfill;
        });
        that._remoteAddress = {
            ip: responsePayload.remoteIPAddress,
            port: responsePayload.remotePort,
        };
        that._status = responsePayload.status;
        that._statusText = responsePayload.statusText;
        that._url = request.url();
        that._fromDiskCache = !!responsePayload.fromDiskCache;
        that._fromServiceWorker = !!responsePayload.fromServiceWorker;
        that._headers = {};
        Object.keys(responsePayload.headers).forEach(function (key) {
            that._headers[key.toLowerCase()] = responsePayload.headers[key];
        });
    }
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
exports_puppeteer_puppeteer_lib_NetworkManager = {Request, Response, NetworkManager};
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
// const {EmulationManager} = exports_puppeteer_puppeteer_lib_EmulationManager;
// const {FrameManager} = exports_puppeteer_puppeteer_lib_FrameManager;
// const {helper, debugError, assert} = exports_puppeteer_puppeteer_lib_helper;
// const {Coverage} = exports_puppeteer_puppeteer_lib_Coverage;
// const {createJSHandle} = exports_puppeteer_puppeteer_lib_JSHandle;
// const {TimeoutSettings} = exports_puppeteer_puppeteer_lib_TimeoutSettings;
const writeFileAsync = helper.promisify(fs.writeFile);
class Page extends EventEmitter {
    /**
      * @param {!Puppeteer.CDPSession} ssn
      * @param {!Puppeteer.Target} target
      * @return {!Promise<!Page>}
      */
    static async create(ssn, target) {
        const page = new Page(ssn, target);
        await page._initialize();
        // defaultViewport
        await page._emulationManager.emulateViewport({
            width: 800,
            height: 600
        })
        return page;
    }
    /**
      * @param {!Puppeteer.CDPSession} ssn
      * @param {!Puppeteer.Target} target
      */
    constructor(ssn, target) {
        super();
        let that = this;
        that._closed = false;
        that.ssn = ssn;
        that._target = target;
        that._timeoutSettings = new TimeoutSettings();
        /** @type {!FrameManager} */
        that._frameManager = new FrameManager(ssn, that, that._timeoutSettings);
        that._emulationManager = new EmulationManager(ssn);
        /** @type {!Map<string, Function>} */
        that._pageBindings = new Map();
        that._coverage = new Coverage(ssn);
        that._javascriptEnabled = true;
        /** @type {!Map<string, Worker>} */
        that._workers = new Map();
        that._frameManager.on(Events.FrameManager.FrameAttached, function (event) { return that.emit(Events.Page.FrameAttached, event); });
        that._frameManager.on(Events.FrameManager.FrameDetached, function (event) { return that.emit(Events.Page.FrameDetached, event); });
        that._frameManager.on(Events.FrameManager.FrameNavigated, function (event) { return that.emit(Events.Page.FrameNavigated, event); });
        const networkManager = that._frameManager.networkManager();
        networkManager.on(Events.NetworkManager.Request, function (event) { return that.emit(Events.Page.Request, event); });
        networkManager.on(Events.NetworkManager.Response, function (event) { return that.emit(Events.Page.Response, event); });
        networkManager.on(Events.NetworkManager.RequestFailed, function (event) { return that.emit(Events.Page.RequestFailed, event); });
        networkManager.on(Events.NetworkManager.RequestFinished, function (event) { return that.emit(Events.Page.RequestFinished, event); });
        that._fileChooserInterceptionIsDisabled = false;
        that._fileChooserInterceptors = new Set();
        ssn.on("Page.domContentEventFired", function (event) { return that.emit(Events.Page.DOMContentLoaded); });
        ssn.on("Page.loadEventFired", function (event) { return that.emit(Events.Page.Load); });
        ssn.on("Runtime.consoleAPICalled", function (event) { return that._onConsoleAPI(event); });
        ssn.on("Runtime.bindingCalled", function (event) { return that._onBindingCalled(event); });
        ssn.on("Page.javascriptDialogOpening", function (event) { return that._onDialog(event); });
        ssn.on("Runtime.exceptionThrown", function (exception) { return that._handleException(exception.exceptionDetails); });
        ssn.on("Inspector.targetCrashed", function (event) { return that._onTargetCrashed(); });
        ssn.on("Performance.metrics", function (event) { return that._emitMetrics(event); });
        ssn.on("Log.entryAdded", function (event) { return that._onLogEntryAdded(event); });
        ssn.on("Page.fileChooserOpened", function (event) { return that._onFileChooser(event); });
        that._target._isClosedPromise.then(function () {
            that.emit(Events.Page.Close);
            that._closed = true;
        });
    }
    async _initialize() {
        let that = this;
        await Promise.all([
            that._frameManager.initialize(),
            that.ssn.rpc4("Target.setAutoAttach", {autoAttach: true, waitForDebuggerOnStart: false, flatten: true}, this.ssn._sessionId),
            that.ssn.rpc4("Performance.enable", {}, this.ssn._sessionId),
            that.ssn.rpc4("Log.enable", {}, this.ssn._sessionId),
            that.ssn.rpc4("Page.setInterceptFileChooserDialog", {enabled: true}, this.ssn._sessionId).catch(function (e) {
                that._fileChooserInterceptionIsDisabled = true;
            }),
        ]);
    }
    /**
      * @param {!Protocol.Log.entryAddedPayload} event
      */
    _onLogEntryAdded(event) {
        let that = this;
        const {level, text, args, source, url, lineNumber} = event.entry;
        if (source !== "worker") {
            that.emit(Events.Page.Console, new ConsoleMessage(level, text, [], {url, lineNumber}));
        }
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
            if (supportedMetrics.has(metric.name)) {
                result[metric.name] = metric.value;
            }
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
        const values = event.args.map(function (arg) { return createJSHandle(context, arg); });
        this._addConsoleMessage(event.type, values, event.stackTrace);
    }
    /**
      * @param {string} type
      * @param {!Array<!Puppeteer.JSHandle>} args
      * @param {Protocol.Runtime.StackTrace=} stackTrace
      */
    _addConsoleMessage(type, args, stackTrace) {
        if (!this.listenerCount(Events.Page.Console)) {
            args.forEach(function (arg) { return arg.dispose(); });
            return;
        }
        const textTokens = [];
        for (const arg of args) {
            const remoteObject = arg._remoteObject;
            if (remoteObject.objectId) {
                textTokens.push(arg.toString());
            }
            else {
                textTokens.push(helper.valueFromRemoteObject(remoteObject));
            }
        }
        const location = stackTrace && stackTrace.callFrames.length ? {
            url: stackTrace.callFrames[0].url,
            lineNumber: stackTrace.callFrames[0].lineNumber,
            columnNumber: stackTrace.callFrames[0].columnNumber,
        } : {};
        const message = new ConsoleMessage(type, textTokens.join(" "), args, location);
        this.emit(Events.Page.Console, message);
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
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<*>}
      */
    async evaluate(pageFunction, ...args) {
        return this._frameManager.mainFrame().evaluate(pageFunction, ...args);
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
            if (mimeType === "image/png") {
                screenshotType = "png";
            }
            else if (mimeType === "image/jpeg") {
                screenshotType = "jpeg";
            }
            assert(screenshotType, "Unsupported screenshot mime type: " + mimeType);
        }
        if (!screenshotType) {
            screenshotType = "png";
        }
        if (options.quality) {
            assert(screenshotType === "jpeg", "options.quality is unsupported for the " + screenshotType + " screenshots");
            assert(typeof options.quality === "number", "Expected options.quality to be a number but found " + (typeof options.quality));
            assert(Number.isInteger(options.quality), "Expected options.quality to be an integer");
            assert(options.quality >= 0 && options.quality <= 100, "Expected options.quality to be between 0 and 100 (inclusive), got " + options.quality);
        }
        return Promise.resolve().then(this._screenshotTask.bind(this, screenshotType, options));
    }
    /**
      * @param {"png"|"jpeg"} format
      * @param {!ScreenshotOptions=} options
      * @return {!Promise<!Buffer|!String>}
      */
    async _screenshotTask(format, options) {
        await this.ssn.rpc4("Target.activateTarget", {targetId: this._target._targetId}, this.ssn._sessionId);
        let clip;
        const shouldSetDefaultBackground = options.omitBackground && format === "png";
        const result = await this.ssn.rpc4("Page.captureScreenshot", { format, quality: options.quality, clip }, this.ssn._sessionId);
        const buffer = options.encoding === "base64" ? result.data : Buffer.from(result.data, "base64");
        if (options.path) {
            await writeFileAsync(options.path, buffer);
        }
        return buffer;
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
      * @param {!function():!Promise<!Puppeteer.CDPSession>} sessionFactory
      */
    constructor(targetInfo, sessionFactory) {
        let that = this;
        that._targetInfo = targetInfo;
        that._targetId = targetInfo.targetId;
        that._sessionFactory = sessionFactory;
        /** @type {?Promise<!Puppeteer.Page>} */
        that._pagePromise = null;
        /** @type {?Promise<!Worker>} */
        that._workerPromise = null;
        that._initializedPromise = new Promise(function (fulfill) { return that._initializedCallback = fulfill; }).then(async function (success) {
            if (!success) {
                return false;
            }
            const opener = that.opener();
            if (!opener || !opener._pagePromise || that.type() !== "page") {
                return true;
            }
            const openerPage = await opener._pagePromise;
            if (!openerPage.listenerCount(Events.Page.Popup)) {
                return true;
            }
            const popupPage = await that.page();
            openerPage.emit(Events.Page.Popup, popupPage);
            return true;
        });
        that._isClosedPromise = new Promise(function (fulfill) { return that._closedCallback = fulfill; });
        that._isInitialized = that._targetInfo.type !== "page" || that._targetInfo.url !== "";
        if (that._isInitialized) {
            that._initializedCallback(true);
        }
    }
    /**
      * @return {!Promise<?Page>}
      */
    async page() {
        let tgt = this;
        if ((
            tgt._targetInfo.type === "page"
            || tgt._targetInfo.type === "background_page"
        ) && !tgt._pagePromise) {
            tgt._pagePromise = tgt._sessionFactory().then(function (ssn) {
                return Page.create(ssn, tgt);
            });
        }
        return tgt._pagePromise;
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
        if (type === "page" || type === "background_page" || type === "service_worker" || type === "shared_worker" || type === "browser") {
            return type;
        }
        return "other";
    }
    /**
      * @return {?Puppeteer.Target}
      */
    opener() {
        const { openerId } = this._targetInfo;
        if (!openerId) {
            return null;
        }
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
      * @return {number}
      */
    navigationTimeout() {
        if (this._defaultNavigationTimeout !== null) {
            return this._defaultNavigationTimeout;
        }
        if (this._defaultTimeout !== null) {
            return this._defaultTimeout;
        }
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
    ExecutionContext: exports_puppeteer_puppeteer_lib_ExecutionContext.ExecutionContext,
    Frame: exports_puppeteer_puppeteer_lib_FrameManager.Frame,
    JSHandle: exports_puppeteer_puppeteer_lib_JSHandle.JSHandle,
    Mouse: exports_puppeteer_puppeteer_lib_Input.Mouse,
    Page: exports_puppeteer_puppeteer_lib_Page.Page,
    Puppeteer: exports_puppeteer_puppeteer_lib_Puppeteer,
    Request: exports_puppeteer_puppeteer_lib_NetworkManager.Request,
    Response: exports_puppeteer_puppeteer_lib_NetworkManager.Response,
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
Object.entries(api).forEach(function ([
    className, val
]) {
    // Puppeteer-web excludes certain classes from bundle, e.g. BrowserFetcher.
    if (typeof val === "function") {
        helper.installAsyncStackHooks(val);
    }
});
// If node does not support async await, use the compiled version.
const Puppeteer = exports_puppeteer_puppeteer_lib_Puppeteer
// let Browser         = exports_puppeteer_puppeteer_lib_Browser.Browser;
let BrowserFetcher  = exports_puppeteer_puppeteer_lib_BrowserFetcher;
// let Connection      = exports_puppeteer_puppeteer_lib_Connection.Connection;
// let Coverage        = exports_puppeteer_puppeteer_lib_Coverage.Coverage;
// let DOMWorld        = exports_puppeteer_puppeteer_lib_DOMWorld.DOMWorld;
// let DeviceDescriptors = exports_puppeteer_puppeteer_lib_DeviceDescriptors;
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
// let TimeoutSettings = exports_puppeteer_puppeteer_lib_TimeoutSettings.TimeoutSettings;
// let assert          = exports_puppeteer_puppeteer_lib_helper.assert;
// let debugError      = exports_puppeteer_puppeteer_lib_helper.debugError;
// let helper          = exports_puppeteer_puppeteer_lib_helper.helper;
// let concat          = exports_websockets_ws_lib_buffer_util.concat;
local._puppeteer = exports_puppeteer_puppeteer_index;
local.puppeteerApi = exports_puppeteer_puppeteer_lib_api;
/*
file none
*/
local.puppeteerApi.cdpClientCreate = cdpClientCreate;
/*


*/
/* jslint ignore:end */
}());
}());
