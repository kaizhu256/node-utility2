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
    let consoleError;
    let isBrowser;
    let isWebWorker;
    let local;
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
    function assertJsonEqual(aa, bb) {
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
    function nop() {
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
    local = {};
    local.local = local;
    globalThis.globalLocal = local;
    local.assertJsonEqual = assertJsonEqual;
    local.assertOrThrow = assertOrThrow;
    local.coalesce = coalesce;
    local.identity = identity;
    local.isBrowser = isBrowser;
    local.isWebWorker = isWebWorker;
    local.nop = nop;
    local.objectAssignDefault = objectAssignDefault;
    local.onErrorThrow = onErrorThrow;
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


/* istanbul ignore next */
// run node js-env code - function
(function () {
if (local.isBrowser) {
    return;
}
local.fsRmrfSync = function (pathname) {
/*
 * this function will sync "rm -rf" <pathname>
 */
    let child_process;
    // do nothing if module not exists
    try {
        child_process = require("child_process");
    } catch (ignore) {
        return;
    }
    pathname = require("path").resolve(pathname);
    if (process.platform !== "win32") {
        child_process.spawnSync("rm", [
            "-rf", pathname
        ], {
            stdio: [
                "ignore", 1, 2
            ]
        });
        return;
    }
    try {
        child_process.spawnSync("rd", [
            "/s", "/q", pathname
        ], {
            stdio: [
                "ignore", 1, 2
            ]
        });
    } catch (ignore) {}
};

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
const removeFolder = function (dir, onError) {
    local.fsRmrfSync(dir);
    onError();
};
removeFolder.sync = local.fsRmrfSync;
const removeRecursive = removeFolder;


let EventEmitter = require('events');
let URL = require('url');
// let WebSocket = require('ws');
let Writable = require('stream').Writable;
// let bufferUtil = require('bufferutil');
let childProcess = require('child_process');
let crypto = require('crypto');
// let debugError = require('debug')(`puppeteer:error`);
// let debugProtocol = require('debug')('puppeteer:protocol');
let fs = require('fs');
let http = require('http');
let https = require('https');
// let isValidUTF8 = require('utf-8-validate');
// let mime = require('mime');
let net = require('net');
let os = require('os');
let path = require('path');
let randomBytes = require('crypto').randomBytes;
let readline = require('readline');
// let removeFolder = require('rimraf');
let tls = require('tls');
let url = require('url');
let exports_puppeteer_puppeteer_index = {};
let exports_puppeteer_puppeteer_lib_Accessibility = {};
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
let exports_puppeteer_puppeteer_lib_Launcher = {};
let exports_puppeteer_puppeteer_lib_LifecycleWatcher = {};
let exports_puppeteer_puppeteer_lib_Multimap = {};
let exports_puppeteer_puppeteer_lib_NetworkManager = {};
let exports_puppeteer_puppeteer_lib_Page = {};
let exports_puppeteer_puppeteer_lib_PipeTransport = {};
let exports_puppeteer_puppeteer_lib_Puppeteer = {};
let exports_puppeteer_puppeteer_lib_Target = {};
let exports_puppeteer_puppeteer_lib_TaskQueue = {};
let exports_puppeteer_puppeteer_lib_TimeoutSettings = {};
let exports_puppeteer_puppeteer_lib_Tracing = {};
let exports_puppeteer_puppeteer_lib_USKeyboardLayout = {};
let exports_puppeteer_puppeteer_lib_WebSocketTransport = {};
let exports_puppeteer_puppeteer_lib_Worker = {};
let exports_puppeteer_puppeteer_lib_api = {};
let exports_puppeteer_puppeteer_lib_helper = {};
let exports_puppeteer_puppeteer_node6_lib_Puppeteer = {};
let exports_puppeteer_puppeteer_package_json = {};
let exports_websockets_ws_index = {};
let exports_websockets_ws_lib_buffer_util = {};
let exports_websockets_ws_lib_constants = {};
let exports_websockets_ws_lib_event_target = {};
let exports_websockets_ws_lib_extension = {};
let exports_websockets_ws_lib_permessage_deflate = {};
let exports_websockets_ws_lib_receiver = {};
let exports_websockets_ws_lib_sender = {};
let exports_websockets_ws_lib_validation = {};
let exports_websockets_ws_lib_websocket = {};
let exports_websockets_ws_lib_websocket_server = {};
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
'use strict';

exports_websockets_ws_lib_constants = {
  BINARY_TYPES: ['nodebuffer', 'arraybuffer', 'fragments'],
  GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
  kStatusCode: Symbol('status-code'),
  kWebSocket: Symbol('websocket'),
  EMPTY_BUFFER: Buffer.alloc(0),
  NOOP: () => {}
};


/*
file https://github.com/websockets/ws/blob/6.2.1/lib/validation.js
*/
'use strict';

try {
//   const isValidUTF8 = require('utf-8-validate');

  exports_websockets_ws_lib_validation.isValidUTF8 =
    typeof isValidUTF8 === 'object'
      ? isValidUTF8.Validation.isValidUTF8 // utf-8-validate@<3.0.0
      : isValidUTF8;
} catch (e) /* istanbul ignore next */ {
  exports_websockets_ws_lib_validation.isValidUTF8 = () => true;
}

/**
 * Checks if a status code is allowed in a close frame.
 *
 * @param {Number} code The status code
 * @return {Boolean} `true` if the status code is valid, else `false`
 * @public
 */
exports_websockets_ws_lib_validation.isValidStatusCode = (code) => {
  return (
    (code >= 1000 &&
      code <= 1013 &&
      code !== 1004 &&
      code !== 1005 &&
      code !== 1006) ||
    (code >= 3000 && code <= 4999)
  );
};


/*
file https://github.com/websockets/ws/blob/6.2.1/lib/buffer-util.js
*/
'use strict';

// const { EMPTY_BUFFER } = exports_websockets_ws_lib_constants;

/**
 * Merges an array of buffers into a new buffer.
 *
 * @param {Buffer[]} list The array of buffers to concat
 * @param {Number} totalLength The total length of buffers in the list
 * @return {Buffer} The resulting buffer
 * @public
 */
function concat(list, totalLength) {
  if (list.length === 0) return EMPTY_BUFFER;
  if (list.length === 1) return list[0];

  const target = Buffer.allocUnsafe(totalLength);
  var offset = 0;

  for (var i = 0; i < list.length; i++) {
    const buf = list[i];
    buf.copy(target, offset);
    offset += buf.length;
  }

  return target;
}

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
  for (var i = 0; i < length; i++) {
    output[offset + i] = source[i] ^ mask[i & 3];
  }
}

/**
 * Unmasks a buffer using the given mask.
 *
 * @param {Buffer} buffer The buffer to unmask
 * @param {Buffer} mask The mask to use
 * @public
 */
function _unmask(buffer, mask) {
  // Required until https://github.com/nodejs/node/issues/9006 is resolved.
  const length = buffer.length;
  for (var i = 0; i < length; i++) {
    buffer[i] ^= mask[i & 3];
  }
}

/**
 * Converts a buffer to an `ArrayBuffer`.
 *
 * @param {Buffer} buf The buffer to convert
 * @return {ArrayBuffer} Converted buffer
 * @public
 */
function toArrayBuffer(buf) {
  if (buf.byteLength === buf.buffer.byteLength) {
    return buf.buffer;
  }

  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

/**
 * Converts `data` to a `Buffer`.
 *
 * @param {*} data The data to convert
 * @return {Buffer} The buffer
 * @throws {TypeError}
 * @public
 */
function toBuffer(data) {
  toBuffer.readOnly = true;

  if (Buffer.isBuffer(data)) return data;

  var buf;

  if (data instanceof ArrayBuffer) {
    buf = Buffer.from(data);
  } else if (ArrayBuffer.isView(data)) {
    buf = viewToBuffer(data);
  } else {
    buf = Buffer.from(data);
    toBuffer.readOnly = false;
  }

  return buf;
}

/**
 * Converts an `ArrayBuffer` view into a buffer.
 *
 * @param {(DataView|TypedArray)} view The view to convert
 * @return {Buffer} Converted view
 * @private
 */
function viewToBuffer(view) {
  const buf = Buffer.from(view.buffer);

  if (view.byteLength !== view.buffer.byteLength) {
    return buf.slice(view.byteOffset, view.byteOffset + view.byteLength);
  }

  return buf;
}

try {
//   const bufferUtil = require('bufferutil');
  const bu = bufferUtil.BufferUtil || bufferUtil;

  exports_websockets_ws_lib_buffer_util = {
    concat,
    mask(source, mask, output, offset, length) {
      if (length < 48) _mask(source, mask, output, offset, length);
      else bu.mask(source, mask, output, offset, length);
    },
    toArrayBuffer,
    toBuffer,
    unmask(buffer, mask) {
      if (buffer.length < 32) _unmask(buffer, mask);
      else bu.unmask(buffer, mask);
    }
  };
} catch (e) /* istanbul ignore next */ {
  exports_websockets_ws_lib_buffer_util = {
    concat,
    mask: _mask,
    toArrayBuffer,
    toBuffer,
    unmask: _unmask
  };
}


/*
file https://github.com/websockets/ws/blob/6.2.1/lib/event-target.js
*/
'use strict';

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
    super('message', target);

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
    super('close', target);

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
    super('open', target);
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
    super('error', target);

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
    if (typeof listener !== 'function') return;

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

    if (method === 'message') {
      onMessage._listener = listener;
      this.on(method, onMessage);
    } else if (method === 'close') {
      onClose._listener = listener;
      this.on(method, onClose);
    } else if (method === 'error') {
      onError._listener = listener;
      this.on(method, onError);
    } else if (method === 'open') {
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

    for (var i = 0; i < listeners.length; i++) {
      if (listeners[i] === listener || listeners[i]._listener === listener) {
        this.removeListener(method, listeners[i]);
      }
    }
  }
};

exports_websockets_ws_lib_event_target = EventTarget;


/*
file https://github.com/websockets/ws/blob/6.2.1/lib/extension.js
*/
'use strict';

//
// Allowed token characters:
//
// '!', '#', '$', '%', '&', ''', '*', '+', '-',
// '.', 0-9, A-Z, '^', '_', '`', a-z, '|', '~'
//
// tokenChars[32] === 0 // ' '
// tokenChars[33] === 1 // '!'
// tokenChars[34] === 0 // '"'
// ...
//
// prettier-ignore
const tokenChars = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
  0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, // 32 - 47
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, // 80 - 95
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 // 112 - 127
];

/**
 * Adds an offer to the map of extension offers or a parameter to the map of
 * parameters.
 *
 * @param {Object} dest The map of extension offers or parameters
 * @param {String} name The extension or parameter name
 * @param {(Object|Boolean|String)} elem The extension parameters or the
 *     parameter value
 * @private
 */
function push(dest, name, elem) {
  if (Object.prototype.hasOwnProperty.call(dest, name)) dest[name].push(elem);
  else dest[name] = [elem];
}

/**
 * Parses the `Sec-WebSocket-Extensions` header into an object.
 *
 * @param {String} header The field value of the header
 * @return {Object} The parsed object
 * @public
 */
function parse(header) {
  const offers = {};

  if (header === undefined || header === '') return offers;

  var params = {};
  var mustUnescape = false;
  var isEscaping = false;
  var inQuotes = false;
  var extensionName;
  var paramName;
  var start = -1;
  var end = -1;

  for (var i = 0; i < header.length; i++) {
    const code = header.charCodeAt(i);

    if (extensionName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20 /* ' ' */ || code === 0x09 /* '\t' */) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b /* ';' */ || code === 0x2c /* ',' */) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        const name = header.slice(start, end);
        if (code === 0x2c) {
          push(offers, name, params);
          params = {};
        } else {
          extensionName = name;
        }

        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else if (paramName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20 || code === 0x09) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        push(params, header.slice(start, end), true);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = {};
          extensionName = undefined;
        }

        start = end = -1;
      } else if (code === 0x3d /* '=' */ && start !== -1 && end === -1) {
        paramName = header.slice(start, i);
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else {
      //
      // The value of a quoted-string after unescaping must conform to the
      // token ABNF, so only token characters are valid.
      // Ref: https://tools.ietf.org/html/rfc6455#section-9.1
      //
      if (isEscaping) {
        if (tokenChars[code] !== 1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
        if (start === -1) start = i;
        else if (!mustUnescape) mustUnescape = true;
        isEscaping = false;
      } else if (inQuotes) {
        if (tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (code === 0x22 /* '"' */ && start !== -1) {
          inQuotes = false;
          end = i;
        } else if (code === 0x5c /* '\' */) {
          isEscaping = true;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
        inQuotes = true;
      } else if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (start !== -1 && (code === 0x20 || code === 0x09)) {
        if (end === -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        var value = header.slice(start, end);
        if (mustUnescape) {
          value = value.replace(/\\/g, '');
          mustUnescape = false;
        }
        push(params, paramName, value);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = {};
          extensionName = undefined;
        }

        paramName = undefined;
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    }
  }

  if (start === -1 || inQuotes) {
    throw new SyntaxError('Unexpected end of input');
  }

  if (end === -1) end = i;
  const token = header.slice(start, end);
  if (extensionName === undefined) {
    push(offers, token, {});
  } else {
    if (paramName === undefined) {
      push(params, token, true);
    } else if (mustUnescape) {
      push(params, paramName, token.replace(/\\/g, ''));
    } else {
      push(params, paramName, token);
    }
    push(offers, extensionName, params);
  }

  return offers;
}

/**
 * Builds the `Sec-WebSocket-Extensions` header field value.
 *
 * @param {Object} extensions The map of extensions and parameters to format
 * @return {String} A string representing the given object
 * @public
 */
function format(extensions) {
  return Object.keys(extensions)
    .map((extension) => {
      var configurations = extensions[extension];
      if (!Array.isArray(configurations)) configurations = [configurations];
      return configurations
        .map((params) => {
          return [extension]
            .concat(
              Object.keys(params).map((k) => {
                var values = params[k];
                if (!Array.isArray(values)) values = [values];
                return values
                  .map((v) => (v === true ? k : `${k}=${v}`))
                  .join('; ');
              })
            )
            .join('; ');
        })
        .join(', ');
    })
    .join(', ');
}

exports_websockets_ws_lib_extension = { format, parse };


/*
file https://github.com/websockets/ws/blob/6.2.1/lib/receiver.js
*/
'use strict';

// const { Writable } = require('stream');

// const PerMessageDeflate = exports_websockets_ws_lib_permessage_deflate;
// const {
//   BINARY_TYPES,
//   EMPTY_BUFFER,
//   kStatusCode,
//   kWebSocket
// } = exports_websockets_ws_lib_constants;
// const { concat, toArrayBuffer, unmask } = exports_websockets_ws_lib_buffer_util;
// const { isValidStatusCode, isValidUTF8 } = exports_websockets_ws_lib_validation;

const GET_INFO = 0;
const GET_PAYLOAD_LENGTH_16 = 1;
const GET_PAYLOAD_LENGTH_64 = 2;
const GET_MASK = 3;
const GET_DATA = 4;
const INFLATING = 5;

/**
 * HyBi Receiver implementation.
 *
 * @extends stream.Writable
 */
class Receiver extends Writable {
  /**
   * Creates a Receiver instance.
   *
   * @param {String} binaryType The type for binary data
   * @param {Object} extensions An object containing the negotiated extensions
   * @param {Number} maxPayload The maximum allowed message length
   */
  constructor(binaryType, extensions, maxPayload) {
    super();

    this._binaryType = binaryType || BINARY_TYPES[0];
    this[kWebSocket] = undefined;
    this._extensions = extensions || {};
    this._maxPayload = maxPayload | 0;

    this._bufferedBytes = 0;
    this._buffers = [];

    this._compressed = false;
    this._payloadLength = 0;
    this._mask = undefined;
    this._fragmented = 0;
    this._masked = false;
    this._fin = false;
    this._opcode = 0;

    this._totalPayloadLength = 0;
    this._messageLength = 0;
    this._fragments = [];

    this._state = GET_INFO;
    this._loop = false;
  }

  /**
   * Implements `Writable.prototype._write()`.
   *
   * @param {Buffer} chunk The chunk of data to write
   * @param {String} encoding The character encoding of `chunk`
   * @param {Function} cb Callback
   */
  _write(chunk, encoding, cb) {
    if (this._opcode === 0x08 && this._state == GET_INFO) return cb();

    this._bufferedBytes += chunk.length;
    this._buffers.push(chunk);
    this.startLoop(cb);
  }

  /**
   * Consumes `n` bytes from the buffered data.
   *
   * @param {Number} n The number of bytes to consume
   * @return {Buffer} The consumed bytes
   * @private
   */
  consume(n) {
    this._bufferedBytes -= n;

    if (n === this._buffers[0].length) return this._buffers.shift();

    if (n < this._buffers[0].length) {
      const buf = this._buffers[0];
      this._buffers[0] = buf.slice(n);
      return buf.slice(0, n);
    }

    const dst = Buffer.allocUnsafe(n);

    do {
      const buf = this._buffers[0];

      if (n >= buf.length) {
        this._buffers.shift().copy(dst, dst.length - n);
      } else {
        buf.copy(dst, dst.length - n, 0, n);
        this._buffers[0] = buf.slice(n);
      }

      n -= buf.length;
    } while (n > 0);

    return dst;
  }

  /**
   * Starts the parsing loop.
   *
   * @param {Function} cb Callback
   * @private
   */
  startLoop(cb) {
    var err;
    this._loop = true;

    do {
      switch (this._state) {
        case GET_INFO:
          err = this.getInfo();
          break;
        case GET_PAYLOAD_LENGTH_16:
          err = this.getPayloadLength16();
          break;
        case GET_PAYLOAD_LENGTH_64:
          err = this.getPayloadLength64();
          break;
        case GET_MASK:
          this.getMask();
          break;
        case GET_DATA:
          err = this.getData(cb);
          break;
        default:
          // `INFLATING`
          this._loop = false;
          return;
      }
    } while (this._loop);

    cb(err);
  }

  /**
   * Reads the first two bytes of a frame.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getInfo() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    const buf = this.consume(2);

    if ((buf[0] & 0x30) !== 0x00) {
      this._loop = false;
      return error(RangeError, 'RSV2 and RSV3 must be clear', true, 1002);
    }

    const compressed = (buf[0] & 0x40) === 0x40;

    if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
      this._loop = false;
      return error(RangeError, 'RSV1 must be clear', true, 1002);
    }

    this._fin = (buf[0] & 0x80) === 0x80;
    this._opcode = buf[0] & 0x0f;
    this._payloadLength = buf[1] & 0x7f;

    if (this._opcode === 0x00) {
      if (compressed) {
        this._loop = false;
        return error(RangeError, 'RSV1 must be clear', true, 1002);
      }

      if (!this._fragmented) {
        this._loop = false;
        return error(RangeError, 'invalid opcode 0', true, 1002);
      }

      this._opcode = this._fragmented;
    } else if (this._opcode === 0x01 || this._opcode === 0x02) {
      if (this._fragmented) {
        this._loop = false;
        return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002);
      }

      this._compressed = compressed;
    } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
      if (!this._fin) {
        this._loop = false;
        return error(RangeError, 'FIN must be set', true, 1002);
      }

      if (compressed) {
        this._loop = false;
        return error(RangeError, 'RSV1 must be clear', true, 1002);
      }

      if (this._payloadLength > 0x7d) {
        this._loop = false;
        return error(
          RangeError,
          `invalid payload length ${this._payloadLength}`,
          true,
          1002
        );
      }
    } else {
      this._loop = false;
      return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002);
    }

    if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
    this._masked = (buf[1] & 0x80) === 0x80;

    if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
    else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
    else return this.haveLength();
  }

  /**
   * Gets extended payload length (7+16).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength16() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    this._payloadLength = this.consume(2).readUInt16BE(0);
    return this.haveLength();
  }

  /**
   * Gets extended payload length (7+64).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength64() {
    if (this._bufferedBytes < 8) {
      this._loop = false;
      return;
    }

    const buf = this.consume(8);
    const num = buf.readUInt32BE(0);

    //
    // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
    // if payload length is greater than this number.
    //
    if (num > Math.pow(2, 53 - 32) - 1) {
      this._loop = false;
      return error(
        RangeError,
        'Unsupported WebSocket frame: payload length > 2^53 - 1',
        false,
        1009
      );
    }

    this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
    return this.haveLength();
  }

  /**
   * Payload length has been read.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  haveLength() {
    if (this._payloadLength && this._opcode < 0x08) {
      this._totalPayloadLength += this._payloadLength;
      if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
        this._loop = false;
        return error(RangeError, 'Max payload size exceeded', false, 1009);
      }
    }

    if (this._masked) this._state = GET_MASK;
    else this._state = GET_DATA;
  }

  /**
   * Reads mask bytes.
   *
   * @private
   */
  getMask() {
    if (this._bufferedBytes < 4) {
      this._loop = false;
      return;
    }

    this._mask = this.consume(4);
    this._state = GET_DATA;
  }

  /**
   * Reads data bytes.
   *
   * @param {Function} cb Callback
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  getData(cb) {
    var data = EMPTY_BUFFER;

    if (this._payloadLength) {
      if (this._bufferedBytes < this._payloadLength) {
        this._loop = false;
        return;
      }

      data = this.consume(this._payloadLength);
      if (this._masked) unmask(data, this._mask);
    }

    if (this._opcode > 0x07) return this.controlMessage(data);

    if (this._compressed) {
      this._state = INFLATING;
      this.decompress(data, cb);
      return;
    }

    if (data.length) {
      //
      // This message is not compressed so its lenght is the sum of the payload
      // length of all fragments.
      //
      this._messageLength = this._totalPayloadLength;
      this._fragments.push(data);
    }

    return this.dataMessage();
  }

  /**
   * Decompresses data.
   *
   * @param {Buffer} data Compressed data
   * @param {Function} cb Callback
   * @private
   */
  decompress(data, cb) {
    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

    perMessageDeflate.decompress(data, this._fin, (err, buf) => {
      if (err) return cb(err);

      if (buf.length) {
        this._messageLength += buf.length;
        if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
          return cb(
            error(RangeError, 'Max payload size exceeded', false, 1009)
          );
        }

        this._fragments.push(buf);
      }

      const er = this.dataMessage();
      if (er) return cb(er);

      this.startLoop(cb);
    });
  }

  /**
   * Handles a data message.
   *
   * @return {(Error|undefined)} A possible error
   * @private
   */
  dataMessage() {
    if (this._fin) {
      const messageLength = this._messageLength;
      const fragments = this._fragments;

      this._totalPayloadLength = 0;
      this._messageLength = 0;
      this._fragmented = 0;
      this._fragments = [];

      if (this._opcode === 2) {
        var data;

        if (this._binaryType === 'nodebuffer') {
          data = concat(fragments, messageLength);
        } else if (this._binaryType === 'arraybuffer') {
          data = toArrayBuffer(concat(fragments, messageLength));
        } else {
          data = fragments;
        }

        this.emit('message', data);
      } else {
        const buf = concat(fragments, messageLength);

        if (!isValidUTF8(buf)) {
          this._loop = false;
          return error(Error, 'invalid UTF-8 sequence', true, 1007);
        }

        this.emit('message', buf.toString());
      }
    }

    this._state = GET_INFO;
  }

  /**
   * Handles a control message.
   *
   * @param {Buffer} data Data to handle
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  controlMessage(data) {
    if (this._opcode === 0x08) {
      this._loop = false;

      if (data.length === 0) {
        this.emit('conclude', 1005, '');
        this.end();
      } else if (data.length === 1) {
        return error(RangeError, 'invalid payload length 1', true, 1002);
      } else {
        const code = data.readUInt16BE(0);

        if (!isValidStatusCode(code)) {
          return error(RangeError, `invalid status code ${code}`, true, 1002);
        }

        const buf = data.slice(2);

        if (!isValidUTF8(buf)) {
          return error(Error, 'invalid UTF-8 sequence', true, 1007);
        }

        this.emit('conclude', code, buf.toString());
        this.end();
      }
    } else if (this._opcode === 0x09) {
      this.emit('ping', data);
    } else {
      this.emit('pong', data);
    }

    this._state = GET_INFO;
  }
}

exports_websockets_ws_lib_receiver = Receiver;

/**
 * Builds an error object.
 *
 * @param {(Error|RangeError)} ErrorCtor The error constructor
 * @param {String} message The error message
 * @param {Boolean} prefix Specifies whether or not to add a default prefix to
 *     `message`
 * @param {Number} statusCode The status code
 * @return {(Error|RangeError)} The error
 * @private
 */
function error(ErrorCtor, message, prefix, statusCode) {
  const err = new ErrorCtor(
    prefix ? `Invalid WebSocket frame: ${message}` : message
  );

  Error.captureStackTrace(err, error);
  err[kStatusCode] = statusCode;
  return err;
}


/*
file https://github.com/websockets/ws/blob/6.2.1/lib/sender.js
*/
'use strict';

// const { randomBytes } = require('crypto');

// const PerMessageDeflate = exports_websockets_ws_lib_permessage_deflate;
// const { EMPTY_BUFFER } = exports_websockets_ws_lib_constants;
// const { isValidStatusCode } = exports_websockets_ws_lib_validation;
// const { mask: applyMask, toBuffer } = exports_websockets_ws_lib_buffer_util;

/**
 * HyBi Sender implementation.
 */
class Sender {
  /**
   * Creates a Sender instance.
   *
   * @param {net.Socket} socket The connection socket
   * @param {Object} extensions An object containing the negotiated extensions
   */
  constructor(socket, extensions) {
    this._extensions = extensions || {};
    this._socket = socket;

    this._firstFragment = true;
    this._compress = false;

    this._bufferedBytes = 0;
    this._deflating = false;
    this._queue = [];
  }

  /**
   * Frames a piece of data according to the HyBi WebSocket protocol.
   *
   * @param {Buffer} data The data to frame
   * @param {Object} options Options object
   * @param {Number} options.opcode The opcode
   * @param {Boolean} options.readOnly Specifies whether `data` can be modified
   * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
   * @return {Buffer[]} The framed data as a list of `Buffer` instances
   * @public
   */
  static frame(data, options) {
    const merge = options.mask && options.readOnly;
    var offset = options.mask ? 6 : 2;
    var payloadLength = data.length;

    if (data.length >= 65536) {
      offset += 8;
      payloadLength = 127;
    } else if (data.length > 125) {
      offset += 2;
      payloadLength = 126;
    }

    const target = Buffer.allocUnsafe(merge ? data.length + offset : offset);

    target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
    if (options.rsv1) target[0] |= 0x40;

    target[1] = payloadLength;

    if (payloadLength === 126) {
      target.writeUInt16BE(data.length, 2);
    } else if (payloadLength === 127) {
      target.writeUInt32BE(0, 2);
      target.writeUInt32BE(data.length, 6);
    }

    if (!options.mask) return [target, data];

    const mask = randomBytes(4);

    target[1] |= 0x80;
    target[offset - 4] = mask[0];
    target[offset - 3] = mask[1];
    target[offset - 2] = mask[2];
    target[offset - 1] = mask[3];

    if (merge) {
      applyMask(data, mask, target, offset, data.length);
      return [target];
    }

    applyMask(data, mask, data, 0, data.length);
    return [target, data];
  }

  /**
   * Sends a close message to the other peer.
   *
   * @param {(Number|undefined)} code The status code component of the body
   * @param {String} data The message component of the body
   * @param {Boolean} mask Specifies whether or not to mask the message
   * @param {Function} cb Callback
   * @public
   */
  close(code, data, mask, cb) {
    var buf;

    if (code === undefined) {
      buf = EMPTY_BUFFER;
    } else if (typeof code !== 'number' || !isValidStatusCode(code)) {
      throw new TypeError('First argument must be a valid error code number');
    } else if (data === undefined || data === '') {
      buf = Buffer.allocUnsafe(2);
      buf.writeUInt16BE(code, 0);
    } else {
      buf = Buffer.allocUnsafe(2 + Buffer.byteLength(data));
      buf.writeUInt16BE(code, 0);
      buf.write(data, 2);
    }

    if (this._deflating) {
      this.enqueue([this.doClose, buf, mask, cb]);
    } else {
      this.doClose(buf, mask, cb);
    }
  }

  /**
   * Frames and sends a close message.
   *
   * @param {Buffer} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback
   * @private
   */
  doClose(data, mask, cb) {
    this.sendFrame(
      Sender.frame(data, {
        fin: true,
        rsv1: false,
        opcode: 0x08,
        mask,
        readOnly: false
      }),
      cb
    );
  }

  /**
   * Sends a ping message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback
   * @public
   */
  ping(data, mask, cb) {
    const buf = toBuffer(data);

    if (this._deflating) {
      this.enqueue([this.doPing, buf, mask, toBuffer.readOnly, cb]);
    } else {
      this.doPing(buf, mask, toBuffer.readOnly, cb);
    }
  }

  /**
   * Frames and sends a ping message.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Boolean} readOnly Specifies whether `data` can be modified
   * @param {Function} cb Callback
   * @private
   */
  doPing(data, mask, readOnly, cb) {
    this.sendFrame(
      Sender.frame(data, {
        fin: true,
        rsv1: false,
        opcode: 0x09,
        mask,
        readOnly
      }),
      cb
    );
  }

  /**
   * Sends a pong message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback
   * @public
   */
  pong(data, mask, cb) {
    const buf = toBuffer(data);

    if (this._deflating) {
      this.enqueue([this.doPong, buf, mask, toBuffer.readOnly, cb]);
    } else {
      this.doPong(buf, mask, toBuffer.readOnly, cb);
    }
  }

  /**
   * Frames and sends a pong message.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Boolean} readOnly Specifies whether `data` can be modified
   * @param {Function} cb Callback
   * @private
   */
  doPong(data, mask, readOnly, cb) {
    this.sendFrame(
      Sender.frame(data, {
        fin: true,
        rsv1: false,
        opcode: 0x0a,
        mask,
        readOnly
      }),
      cb
    );
  }

  /**
   * Sends a data message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} options.compress Specifies whether or not to compress `data`
   * @param {Boolean} options.binary Specifies whether `data` is binary or text
   * @param {Boolean} options.fin Specifies whether the fragment is the last one
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback
   * @public
   */
  send(data, options, cb) {
    const buf = toBuffer(data);
    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
    var opcode = options.binary ? 2 : 1;
    var rsv1 = options.compress;

    if (this._firstFragment) {
      this._firstFragment = false;
      if (rsv1 && perMessageDeflate) {
        rsv1 = buf.length >= perMessageDeflate._threshold;
      }
      this._compress = rsv1;
    } else {
      rsv1 = false;
      opcode = 0;
    }

    if (options.fin) this._firstFragment = true;

    if (perMessageDeflate) {
      const opts = {
        fin: options.fin,
        rsv1,
        opcode,
        mask: options.mask,
        readOnly: toBuffer.readOnly
      };

      if (this._deflating) {
        this.enqueue([this.dispatch, buf, this._compress, opts, cb]);
      } else {
        this.dispatch(buf, this._compress, opts, cb);
      }
    } else {
      this.sendFrame(
        Sender.frame(buf, {
          fin: options.fin,
          rsv1: false,
          opcode,
          mask: options.mask,
          readOnly: toBuffer.readOnly
        }),
        cb
      );
    }
  }

  /**
   * Dispatches a data message.
   *
   * @param {Buffer} data The message to send
   * @param {Boolean} compress Specifies whether or not to compress `data`
   * @param {Object} options Options object
   * @param {Number} options.opcode The opcode
   * @param {Boolean} options.readOnly Specifies whether `data` can be modified
   * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
   * @param {Function} cb Callback
   * @private
   */
  dispatch(data, compress, options, cb) {
    if (!compress) {
      this.sendFrame(Sender.frame(data, options), cb);
      return;
    }

    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

    this._deflating = true;
    perMessageDeflate.compress(data, options.fin, (_, buf) => {
      this._deflating = false;
      options.readOnly = false;
      this.sendFrame(Sender.frame(buf, options), cb);
      this.dequeue();
    });
  }

  /**
   * Executes queued send operations.
   *
   * @private
   */
  dequeue() {
    while (!this._deflating && this._queue.length) {
      const params = this._queue.shift();

      this._bufferedBytes -= params[1].length;
      params[0].apply(this, params.slice(1));
    }
  }

  /**
   * Enqueues a send operation.
   *
   * @param {Array} params Send operation parameters.
   * @private
   */
  enqueue(params) {
    this._bufferedBytes += params[1].length;
    this._queue.push(params);
  }

  /**
   * Sends a frame.
   *
   * @param {Buffer[]} list The frame to send
   * @param {Function} cb Callback
   * @private
   */
  sendFrame(list, cb) {
    if (list.length === 2) {
      this._socket.cork();
      this._socket.write(list[0]);
      this._socket.write(list[1], cb);
      this._socket.uncork();
    } else {
      this._socket.write(list[0], cb);
    }
  }
}

exports_websockets_ws_lib_sender = Sender;


/*
file https://github.com/websockets/ws/blob/6.2.1/lib/websocket-server.js
*/
'use strict';

// const EventEmitter = require('events');
// const crypto = require('crypto');
// const http = require('http');

// const PerMessageDeflate = exports_websockets_ws_lib_permessage_deflate;
// const extension = exports_websockets_ws_lib_extension;
// const WebSocket = exports_websockets_ws_lib_websocket;
// const { GUID } = exports_websockets_ws_lib_constants;

const keyRegex = /^[+/0-9A-Za-z]{22}==$/;

/**
 * Class representing a WebSocket server.
 *
 * @extends EventEmitter
 */
class WebSocketServer extends EventEmitter {
  /**
   * Create a `WebSocketServer` instance.
   *
   * @param {Object} options Configuration options
   * @param {Number} options.backlog The maximum length of the queue of pending
   *     connections
   * @param {Boolean} options.clientTracking Specifies whether or not to track
   *     clients
   * @param {Function} options.handleProtocols An hook to handle protocols
   * @param {String} options.host The hostname where to bind the server
   * @param {Number} options.maxPayload The maximum allowed message size
   * @param {Boolean} options.noServer Enable no server mode
   * @param {String} options.path Accept only connections matching this path
   * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable
   *     permessage-deflate
   * @param {Number} options.port The port where to bind the server
   * @param {http.Server} options.server A pre-created HTTP/S server to use
   * @param {Function} options.verifyClient An hook to reject connections
   * @param {Function} callback A listener for the `listening` event
   */
  constructor(options, callback) {
    super();

    options = Object.assign(
      {
        maxPayload: 100 * 1024 * 1024,
        perMessageDeflate: false,
        handleProtocols: null,
        clientTracking: true,
        verifyClient: null,
        noServer: false,
        backlog: null, // use default (511 as implemented in net.js)
        server: null,
        host: null,
        path: null,
        port: null
      },
      options
    );

    if (options.port == null && !options.server && !options.noServer) {
      throw new TypeError(
        'One of the "port", "server", or "noServer" options must be specified'
      );
    }

    if (options.port != null) {
      this._server = http.createServer((req, res) => {
        const body = http.STATUS_CODES[426];

        res.writeHead(426, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        });
        res.end(body);
      });
      this._server.listen(
        options.port,
        options.host,
        options.backlog,
        callback
      );
    } else if (options.server) {
      this._server = options.server;
    }

    if (this._server) {
      this._removeListeners = addListeners(this._server, {
        listening: this.emit.bind(this, 'listening'),
        error: this.emit.bind(this, 'error'),
        upgrade: (req, socket, head) => {
          this.handleUpgrade(req, socket, head, (ws) => {
            this.emit('connection', ws, req);
          });
        }
      });
    }

    if (options.perMessageDeflate === true) options.perMessageDeflate = {};
    if (options.clientTracking) this.clients = new Set();
    this.options = options;
  }

  /**
   * Returns the bound address, the address family name, and port of the server
   * as reported by the operating system if listening on an IP socket.
   * If the server is listening on a pipe or UNIX domain socket, the name is
   * returned as a string.
   *
   * @return {(Object|String|null)} The address of the server
   * @public
   */
  address() {
    if (this.options.noServer) {
      throw new Error('The server is operating in "noServer" mode');
    }

    if (!this._server) return null;
    return this._server.address();
  }

  /**
   * Close the server.
   *
   * @param {Function} cb Callback
   * @public
   */
  close(cb) {
    if (cb) this.once('close', cb);

    //
    // Terminate all associated clients.
    //
    if (this.clients) {
      for (const client of this.clients) client.terminate();
    }

    const server = this._server;

    if (server) {
      this._removeListeners();
      this._removeListeners = this._server = null;

      //
      // Close the http server if it was internally created.
      //
      if (this.options.port != null) {
        server.close(() => this.emit('close'));
        return;
      }
    }

    process.nextTick(emitClose, this);
  }

  /**
   * See if a given request should be handled by this server instance.
   *
   * @param {http.IncomingMessage} req Request object to inspect
   * @return {Boolean} `true` if the request is valid, else `false`
   * @public
   */
  shouldHandle(req) {
    if (this.options.path) {
      const index = req.url.indexOf('?');
      const pathname = index !== -1 ? req.url.slice(0, index) : req.url;

      if (pathname !== this.options.path) return false;
    }

    return true;
  }

  /**
   * Handle a HTTP Upgrade request.
   *
   * @param {http.IncomingMessage} req The request object
   * @param {net.Socket} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @public
   */
  handleUpgrade(req, socket, head, cb) {
    socket.on('error', socketOnError);

    const key =
      req.headers['sec-websocket-key'] !== undefined
        ? req.headers['sec-websocket-key'].trim()
        : false;
    const version = +req.headers['sec-websocket-version'];
    const extensions = {};

    if (
      req.method !== 'GET' ||
      req.headers.upgrade.toLowerCase() !== 'websocket' ||
      !key ||
      !keyRegex.test(key) ||
      (version !== 8 && version !== 13) ||
      !this.shouldHandle(req)
    ) {
      return abortHandshake(socket, 400);
    }

    if (this.options.perMessageDeflate) {
      const perMessageDeflate = new PerMessageDeflate(
        this.options.perMessageDeflate,
        true,
        this.options.maxPayload
      );

      try {
        const offers = extension.parse(req.headers['sec-websocket-extensions']);

        if (offers[PerMessageDeflate.extensionName]) {
          perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
          extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
      } catch (err) {
        return abortHandshake(socket, 400);
      }
    }

    //
    // Optionally call external client verification handler.
    //
    if (this.options.verifyClient) {
      const info = {
        origin:
          req.headers[`${version === 8 ? 'sec-websocket-origin' : 'origin'}`],
        secure: !!(req.connection.authorized || req.connection.encrypted),
        req
      };

      if (this.options.verifyClient.length === 2) {
        this.options.verifyClient(info, (verified, code, message, headers) => {
          if (!verified) {
            return abortHandshake(socket, code || 401, message, headers);
          }

          this.completeUpgrade(key, extensions, req, socket, head, cb);
        });
        return;
      }

      if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
    }

    this.completeUpgrade(key, extensions, req, socket, head, cb);
  }

  /**
   * Upgrade the connection to WebSocket.
   *
   * @param {String} key The value of the `Sec-WebSocket-Key` header
   * @param {Object} extensions The accepted extensions
   * @param {http.IncomingMessage} req The request object
   * @param {net.Socket} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @private
   */
  completeUpgrade(key, extensions, req, socket, head, cb) {
    //
    // Destroy the socket if the client has already sent a FIN packet.
    //
    if (!socket.readable || !socket.writable) return socket.destroy();

    const digest = crypto
      .createHash('sha1')
      .update(key + GUID)
      .digest('base64');

    const headers = [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      'Connection: Upgrade',
      `Sec-WebSocket-Accept: ${digest}`
    ];

    const ws = new WebSocket(null);
    var protocol = req.headers['sec-websocket-protocol'];

    if (protocol) {
      protocol = protocol.trim().split(/ *, */);

      //
      // Optionally call external protocol selection handler.
      //
      if (this.options.handleProtocols) {
        protocol = this.options.handleProtocols(protocol, req);
      } else {
        protocol = protocol[0];
      }

      if (protocol) {
        headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
        ws.protocol = protocol;
      }
    }

    if (extensions[PerMessageDeflate.extensionName]) {
      const params = extensions[PerMessageDeflate.extensionName].params;
      const value = extension.format({
        [PerMessageDeflate.extensionName]: [params]
      });
      headers.push(`Sec-WebSocket-Extensions: ${value}`);
      ws._extensions = extensions;
    }

    //
    // Allow external modification/inspection of handshake headers.
    //
    this.emit('headers', headers, req);

    socket.write(headers.concat('\r\n').join('\r\n'));
    socket.removeListener('error', socketOnError);

    ws.setSocket(socket, head, this.options.maxPayload);

    if (this.clients) {
      this.clients.add(ws);
      ws.on('close', () => this.clients.delete(ws));
    }

    cb(ws);
  }
}

exports_websockets_ws_lib_websocket_server = WebSocketServer;

/**
 * Add event listeners on an `EventEmitter` using a map of <event, listener>
 * pairs.
 *
 * @param {EventEmitter} server The event emitter
 * @param {Object.<String, Function>} map The listeners to add
 * @return {Function} A function that will remove the added listeners when called
 * @private
 */
function addListeners(server, map) {
  for (const event of Object.keys(map)) server.on(event, map[event]);

  return function removeListeners() {
    for (const event of Object.keys(map)) {
      server.removeListener(event, map[event]);
    }
  };
}

/**
 * Emit a `'close'` event on an `EventEmitter`.
 *
 * @param {EventEmitter} server The event emitter
 * @private
 */
function emitClose(server) {
  server.emit('close');
}

/**
 * Handle premature socket errors.
 *
 * @private
 */
function socketOnError() {
  this.destroy();
}

/**
 * Close the connection when preconditions are not fulfilled.
 *
 * @param {net.Socket} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} [message] The HTTP response body
 * @param {Object} [headers] Additional HTTP response headers
 * @private
 */
function abortHandshake(socket, code, message, headers) {
  if (socket.writable) {
    message = message || http.STATUS_CODES[code];
    headers = Object.assign(
      {
        Connection: 'close',
        'Content-type': 'text/html',
        'Content-Length': Buffer.byteLength(message)
      },
      headers
    );

    socket.write(
      `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` +
        Object.keys(headers)
          .map((h) => `${h}: ${headers[h]}`)
          .join('\r\n') +
        '\r\n\r\n' +
        message
    );
  }

  socket.removeListener('error', socketOnError);
  socket.destroy();
}


/*
file https://github.com/websockets/ws/blob/6.2.1/lib/websocket.js
*/
'use strict';

// const EventEmitter = require('events');
// const crypto = require('crypto');
// const https = require('https');
// const http = require('http');
// const net = require('net');
// const tls = require('tls');
// const url = require('url');

// const PerMessageDeflate = exports_websockets_ws_lib_permessage_deflate;
// const EventTarget = exports_websockets_ws_lib_event_target;
// const extension = exports_websockets_ws_lib_extension;
// const Receiver = exports_websockets_ws_lib_receiver;
// const Sender = exports_websockets_ws_lib_sender;
// const {
//   BINARY_TYPES,
//   EMPTY_BUFFER,
//   GUID,
//   kStatusCode,
//   kWebSocket,
//   NOOP
// } = exports_websockets_ws_lib_constants;

const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
const protocolVersions = [8, 13];
const closeTimeout = 30 * 1000;

/**
 * Class representing a WebSocket.
 *
 * @extends EventEmitter
 */
class WebSocket extends EventEmitter {
  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|url.Url|url.URL)} address The URL to which to connect
   * @param {(String|String[])} protocols The subprotocols
   * @param {Object} options Connection options
   */
  constructor(address, protocols, options) {
    super();

    this.readyState = WebSocket.CONNECTING;
    this.protocol = '';

    this._binaryType = BINARY_TYPES[0];
    this._closeFrameReceived = false;
    this._closeFrameSent = false;
    this._closeMessage = '';
    this._closeTimer = null;
    this._closeCode = 1006;
    this._extensions = {};
    this._receiver = null;
    this._sender = null;
    this._socket = null;

    if (address !== null) {
      this._isServer = false;
      this._redirects = 0;

      if (Array.isArray(protocols)) {
        protocols = protocols.join(', ');
      } else if (typeof protocols === 'object' && protocols !== null) {
        options = protocols;
        protocols = undefined;
      }

      initAsClient(this, address, protocols, options);
    } else {
      this._isServer = true;
    }
  }

  get CONNECTING() {
    return WebSocket.CONNECTING;
  }
  get CLOSING() {
    return WebSocket.CLOSING;
  }
  get CLOSED() {
    return WebSocket.CLOSED;
  }
  get OPEN() {
    return WebSocket.OPEN;
  }

  /**
   * This deviates from the WHATWG interface since ws doesn't support the
   * required default "blob" type (instead we define a custom "nodebuffer"
   * type).
   *
   * @type {String}
   */
  get binaryType() {
    return this._binaryType;
  }

  set binaryType(type) {
    if (!BINARY_TYPES.includes(type)) return;

    this._binaryType = type;

    //
    // Allow to change `binaryType` on the fly.
    //
    if (this._receiver) this._receiver._binaryType = type;
  }

  /**
   * @type {Number}
   */
  get bufferedAmount() {
    if (!this._socket) return 0;

    //
    // `socket.bufferSize` is `undefined` if the socket is closed.
    //
    return (this._socket.bufferSize || 0) + this._sender._bufferedBytes;
  }

  /**
   * @type {String}
   */
  get extensions() {
    return Object.keys(this._extensions).join();
  }

  /**
   * Set up the socket and the internal resources.
   *
   * @param {net.Socket} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Number} maxPayload The maximum allowed message size
   * @private
   */
  setSocket(socket, head, maxPayload) {
    const receiver = new Receiver(
      this._binaryType,
      this._extensions,
      maxPayload
    );

    this._sender = new Sender(socket, this._extensions);
    this._receiver = receiver;
    this._socket = socket;

    receiver[kWebSocket] = this;
    socket[kWebSocket] = this;

    receiver.on('conclude', receiverOnConclude);
    receiver.on('drain', receiverOnDrain);
    receiver.on('error', receiverOnError);
    receiver.on('message', receiverOnMessage);
    receiver.on('ping', receiverOnPing);
    receiver.on('pong', receiverOnPong);

    socket.setTimeout(0);
    socket.setNoDelay();

    if (head.length > 0) socket.unshift(head);

    socket.on('close', socketOnClose);
    socket.on('data', socketOnData);
    socket.on('end', socketOnEnd);
    socket.on('error', socketOnError);

    this.readyState = WebSocket.OPEN;
    this.emit('open');
  }

  /**
   * Emit the `'close'` event.
   *
   * @private
   */
  emitClose() {
    this.readyState = WebSocket.CLOSED;

    if (!this._socket) {
      this.emit('close', this._closeCode, this._closeMessage);
      return;
    }

    if (this._extensions[PerMessageDeflate.extensionName]) {
      this._extensions[PerMessageDeflate.extensionName].cleanup();
    }

    this._receiver.removeAllListeners();
    this.emit('close', this._closeCode, this._closeMessage);
  }

  /**
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
  close(code, data) {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake(this, this._req, msg);
    }

    if (this.readyState === WebSocket.CLOSING) {
      if (this._closeFrameSent && this._closeFrameReceived) this._socket.end();
      return;
    }

    this.readyState = WebSocket.CLOSING;
    this._sender.close(code, data, !this._isServer, (err) => {
      //
      // This error is handled by the `'error'` listener on the socket. We only
      // want to know if the close frame has been sent here.
      //
      if (err) return;

      this._closeFrameSent = true;
      if (this._closeFrameReceived) this._socket.end();
    });

    //
    // Specify a timeout for the closing handshake to complete.
    //
    this._closeTimer = setTimeout(
      this._socket.destroy.bind(this._socket),
      closeTimeout
    );
  }

  /**
   * Send a ping.
   *
   * @param {*} data The data to send
   * @param {Boolean} mask Indicates whether or not to mask `data`
   * @param {Function} cb Callback which is executed when the ping is sent
   * @public
   */
  ping(data, mask, cb) {
    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (this.readyState !== WebSocket.OPEN) {
      const err = new Error(
        `WebSocket is not open: readyState ${this.readyState} ` +
          `(${readyStates[this.readyState]})`
      );

      if (cb) return cb(err);
      throw err;
    }

    if (typeof data === 'number') data = data.toString();
    if (mask === undefined) mask = !this._isServer;
    this._sender.ping(data || EMPTY_BUFFER, mask, cb);
  }

  /**
   * Send a pong.
   *
   * @param {*} data The data to send
   * @param {Boolean} mask Indicates whether or not to mask `data`
   * @param {Function} cb Callback which is executed when the pong is sent
   * @public
   */
  pong(data, mask, cb) {
    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (this.readyState !== WebSocket.OPEN) {
      const err = new Error(
        `WebSocket is not open: readyState ${this.readyState} ` +
          `(${readyStates[this.readyState]})`
      );

      if (cb) return cb(err);
      throw err;
    }

    if (typeof data === 'number') data = data.toString();
    if (mask === undefined) mask = !this._isServer;
    this._sender.pong(data || EMPTY_BUFFER, mask, cb);
  }

  /**
   * Send a data message.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} options.compress Specifies whether or not to compress `data`
   * @param {Boolean} options.binary Specifies whether `data` is binary or text
   * @param {Boolean} options.fin Specifies whether the fragment is the last one
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback which is executed when data is written out
   * @public
   */
  send(data, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    if (this.readyState !== WebSocket.OPEN) {
      const err = new Error(
        `WebSocket is not open: readyState ${this.readyState} ` +
          `(${readyStates[this.readyState]})`
      );

      if (cb) return cb(err);
      throw err;
    }

    if (typeof data === 'number') data = data.toString();

    const opts = Object.assign(
      {
        binary: typeof data !== 'string',
        mask: !this._isServer,
        compress: true,
        fin: true
      },
      options
    );

    if (!this._extensions[PerMessageDeflate.extensionName]) {
      opts.compress = false;
    }

    this._sender.send(data || EMPTY_BUFFER, opts, cb);
  }

  /**
   * Forcibly close the connection.
   *
   * @public
   */
  terminate() {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake(this, this._req, msg);
    }

    if (this._socket) {
      this.readyState = WebSocket.CLOSING;
      this._socket.destroy();
    }
  }
}

readyStates.forEach((readyState, i) => {
  WebSocket[readyState] = i;
});

//
// Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
// See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
//
['open', 'error', 'close', 'message'].forEach((method) => {
  Object.defineProperty(WebSocket.prototype, `on${method}`, {
    /**
     * Return the listener of the event.
     *
     * @return {(Function|undefined)} The event listener or `undefined`
     * @public
     */
    get() {
      const listeners = this.listeners(method);
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i]._listener) return listeners[i]._listener;
      }

      return undefined;
    },
    /**
     * Add a listener for the event.
     *
     * @param {Function} listener The listener to add
     * @public
     */
    set(listener) {
      const listeners = this.listeners(method);
      for (var i = 0; i < listeners.length; i++) {
        //
        // Remove only the listeners added via `addEventListener`.
        //
        if (listeners[i]._listener) this.removeListener(method, listeners[i]);
      }
      this.addEventListener(method, listener);
    }
  });
});

WebSocket.prototype.addEventListener = EventTarget.addEventListener;
WebSocket.prototype.removeEventListener = EventTarget.removeEventListener;

exports_websockets_ws_lib_websocket = WebSocket;

/**
 * Initialize a WebSocket client.
 *
 * @param {WebSocket} websocket The client to initialize
 * @param {(String|url.Url|url.URL)} address The URL to which to connect
 * @param {String} protocols The subprotocols
 * @param {Object} options Connection options
 * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable
 *     permessage-deflate
 * @param {Number} options.handshakeTimeout Timeout in milliseconds for the
 *     handshake request
 * @param {Number} options.protocolVersion Value of the `Sec-WebSocket-Version`
 *     header
 * @param {String} options.origin Value of the `Origin` or
 *     `Sec-WebSocket-Origin` header
 * @param {Number} options.maxPayload The maximum allowed message size
 * @param {Boolean} options.followRedirects Whether or not to follow redirects
 * @param {Number} options.maxRedirects The maximum number of redirects allowed
 * @private
 */
function initAsClient(websocket, address, protocols, options) {
  const opts = Object.assign(
    {
      protocolVersion: protocolVersions[1],
      maxPayload: 100 * 1024 * 1024,
      perMessageDeflate: true,
      followRedirects: false,
      maxRedirects: 10
    },
    options,
    {
      createConnection: undefined,
      socketPath: undefined,
      hostname: undefined,
      protocol: undefined,
      timeout: undefined,
      method: undefined,
      auth: undefined,
      host: undefined,
      path: undefined,
      port: undefined
    }
  );

  if (!protocolVersions.includes(opts.protocolVersion)) {
    throw new RangeError(
      `Unsupported protocol version: ${opts.protocolVersion} ` +
        `(supported versions: ${protocolVersions.join(', ')})`
    );
  }

  var parsedUrl;

  if (typeof address === 'object' && address.href !== undefined) {
    parsedUrl = address;
    websocket.url = address.href;
  } else {
    //
    // The WHATWG URL constructor is not available on Node.js < 6.13.0
    //
    parsedUrl = url.URL ? new url.URL(address) : url.parse(address);
    websocket.url = address;
  }

  const isUnixSocket = parsedUrl.protocol === 'ws+unix:';

  if (!parsedUrl.host && (!isUnixSocket || !parsedUrl.pathname)) {
    throw new Error(`Invalid URL: ${websocket.url}`);
  }

  const isSecure =
    parsedUrl.protocol === 'wss:' || parsedUrl.protocol === 'https:';
  const defaultPort = isSecure ? 443 : 80;
  const key = crypto.randomBytes(16).toString('base64');
  const get = isSecure ? https.get : http.get;
  const path = parsedUrl.search
    ? `${parsedUrl.pathname || '/'}${parsedUrl.search}`
    : parsedUrl.pathname || '/';
  var perMessageDeflate;

  opts.createConnection = isSecure ? tlsConnect : netConnect;
  opts.defaultPort = opts.defaultPort || defaultPort;
  opts.port = parsedUrl.port || defaultPort;
  opts.host = parsedUrl.hostname.startsWith('[')
    ? parsedUrl.hostname.slice(1, -1)
    : parsedUrl.hostname;
  opts.headers = Object.assign(
    {
      'Sec-WebSocket-Version': opts.protocolVersion,
      'Sec-WebSocket-Key': key,
      Connection: 'Upgrade',
      Upgrade: 'websocket'
    },
    opts.headers
  );
  opts.path = path;
  opts.timeout = opts.handshakeTimeout;

  if (opts.perMessageDeflate) {
    perMessageDeflate = new PerMessageDeflate(
      opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
      false,
      opts.maxPayload
    );
    opts.headers['Sec-WebSocket-Extensions'] = extension.format({
      [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
    });
  }
  if (protocols) {
    opts.headers['Sec-WebSocket-Protocol'] = protocols;
  }
  if (opts.origin) {
    if (opts.protocolVersion < 13) {
      opts.headers['Sec-WebSocket-Origin'] = opts.origin;
    } else {
      opts.headers.Origin = opts.origin;
    }
  }
  if (parsedUrl.auth) {
    opts.auth = parsedUrl.auth;
  } else if (parsedUrl.username || parsedUrl.password) {
    opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
  }

  if (isUnixSocket) {
    const parts = path.split(':');

    opts.socketPath = parts[0];
    opts.path = parts[1];
  }

  var req = (websocket._req = get(opts));

  if (opts.timeout) {
    req.on('timeout', () => {
      abortHandshake(websocket, req, 'Opening handshake has timed out');
    });
  }

  req.on('error', (err) => {
    if (websocket._req.aborted) return;

    req = websocket._req = null;
    websocket.readyState = WebSocket.CLOSING;
    websocket.emit('error', err);
    websocket.emitClose();
  });

  req.on('response', (res) => {
    const location = res.headers.location;
    const statusCode = res.statusCode;

    if (
      location &&
      opts.followRedirects &&
      statusCode >= 300 &&
      statusCode < 400
    ) {
      if (++websocket._redirects > opts.maxRedirects) {
        abortHandshake(websocket, req, 'Maximum redirects exceeded');
        return;
      }

      req.abort();

      const addr = url.URL
        ? new url.URL(location, address)
        : url.resolve(address, location);

      initAsClient(websocket, addr, protocols, options);
    } else if (!websocket.emit('unexpected-response', req, res)) {
      abortHandshake(
        websocket,
        req,
        `Unexpected server response: ${res.statusCode}`
      );
    }
  });

  req.on('upgrade', (res, socket, head) => {
    websocket.emit('upgrade', res);

    //
    // The user may have closed the connection from a listener of the `upgrade`
    // event.
    //
    if (websocket.readyState !== WebSocket.CONNECTING) return;

    req = websocket._req = null;

    const digest = crypto
      .createHash('sha1')
      .update(key + GUID)
      .digest('base64');

    if (res.headers['sec-websocket-accept'] !== digest) {
      abortHandshake(websocket, socket, 'Invalid Sec-WebSocket-Accept header');
      return;
    }

    const serverProt = res.headers['sec-websocket-protocol'];
    const protList = (protocols || '').split(/, */);
    var protError;

    if (!protocols && serverProt) {
      protError = 'Server sent a subprotocol but none was requested';
    } else if (protocols && !serverProt) {
      protError = 'Server sent no subprotocol';
    } else if (serverProt && !protList.includes(serverProt)) {
      protError = 'Server sent an invalid subprotocol';
    }

    if (protError) {
      abortHandshake(websocket, socket, protError);
      return;
    }

    if (serverProt) websocket.protocol = serverProt;

    if (perMessageDeflate) {
      try {
        const extensions = extension.parse(
          res.headers['sec-websocket-extensions']
        );

        if (extensions[PerMessageDeflate.extensionName]) {
          perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
          websocket._extensions[
            PerMessageDeflate.extensionName
          ] = perMessageDeflate;
        }
      } catch (err) {
        abortHandshake(
          websocket,
          socket,
          'Invalid Sec-WebSocket-Extensions header'
        );
        return;
      }
    }

    websocket.setSocket(socket, head, opts.maxPayload);
  });
}

/**
 * Create a `net.Socket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {net.Socket} The newly created socket used to start the connection
 * @private
 */
function netConnect(options) {
  //
  // Override `options.path` only if `options` is a copy of the original options
  // object. This is always true on Node.js >= 8 but not on Node.js 6 where
  // `options.socketPath` might be `undefined` even if the `socketPath` option
  // was originally set.
  //
  if (options.protocolVersion) options.path = options.socketPath;
  return net.connect(options);
}

/**
 * Create a `tls.TLSSocket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {tls.TLSSocket} The newly created socket used to start the connection
 * @private
 */
function tlsConnect(options) {
  options.path = undefined;
  options.servername = options.servername || options.host;
  return tls.connect(options);
}

/**
 * Abort the handshake and emit an error.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {(http.ClientRequest|net.Socket)} stream The request to abort or the
 *     socket to destroy
 * @param {String} message The error message
 * @private
 */
function abortHandshake(websocket, stream, message) {
  websocket.readyState = WebSocket.CLOSING;

  const err = new Error(message);
  Error.captureStackTrace(err, abortHandshake);

  if (stream.setHeader) {
    stream.abort();
    stream.once('abort', websocket.emitClose.bind(websocket));
    websocket.emit('error', err);
  } else {
    stream.destroy(err);
    stream.once('error', websocket.emit.bind(websocket, 'error'));
    stream.once('close', websocket.emitClose.bind(websocket));
  }
}

/**
 * The listener of the `Receiver` `'conclude'` event.
 *
 * @param {Number} code The status code
 * @param {String} reason The reason for closing
 * @private
 */
function receiverOnConclude(code, reason) {
  const websocket = this[kWebSocket];

  websocket._socket.removeListener('data', socketOnData);
  websocket._socket.resume();

  websocket._closeFrameReceived = true;
  websocket._closeMessage = reason;
  websocket._closeCode = code;

  if (code === 1005) websocket.close();
  else websocket.close(code, reason);
}

/**
 * The listener of the `Receiver` `'drain'` event.
 *
 * @private
 */
function receiverOnDrain() {
  this[kWebSocket]._socket.resume();
}

/**
 * The listener of the `Receiver` `'error'` event.
 *
 * @param {(RangeError|Error)} err The emitted error
 * @private
 */
function receiverOnError(err) {
  const websocket = this[kWebSocket];

  websocket._socket.removeListener('data', socketOnData);

  websocket.readyState = WebSocket.CLOSING;
  websocket._closeCode = err[kStatusCode];
  websocket.emit('error', err);
  websocket._socket.destroy();
}

/**
 * The listener of the `Receiver` `'finish'` event.
 *
 * @private
 */
function receiverOnFinish() {
  this[kWebSocket].emitClose();
}

/**
 * The listener of the `Receiver` `'message'` event.
 *
 * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The message
 * @private
 */
function receiverOnMessage(data) {
  this[kWebSocket].emit('message', data);
}

/**
 * The listener of the `Receiver` `'ping'` event.
 *
 * @param {Buffer} data The data included in the ping frame
 * @private
 */
function receiverOnPing(data) {
  const websocket = this[kWebSocket];

  websocket.pong(data, !websocket._isServer, NOOP);
  websocket.emit('ping', data);
}

/**
 * The listener of the `Receiver` `'pong'` event.
 *
 * @param {Buffer} data The data included in the pong frame
 * @private
 */
function receiverOnPong(data) {
  this[kWebSocket].emit('pong', data);
}

/**
 * The listener of the `net.Socket` `'close'` event.
 *
 * @private
 */
function socketOnClose() {
  const websocket = this[kWebSocket];

  this.removeListener('close', socketOnClose);
  this.removeListener('end', socketOnEnd);

  websocket.readyState = WebSocket.CLOSING;

  //
  // The close frame might not have been received or the `'end'` event emitted,
  // for example, if the socket was destroyed due to an error. Ensure that the
  // `receiver` stream is closed after writing any remaining buffered data to
  // it. If the readable side of the socket is in flowing mode then there is no
  // buffered data as everything has been already written and `readable.read()`
  // will return `null`. If instead, the socket is paused, any possible buffered
  // data will be read as a single chunk and emitted synchronously in a single
  // `'data'` event.
  //
  websocket._socket.read();
  websocket._receiver.end();

  this.removeListener('data', socketOnData);
  this[kWebSocket] = undefined;

  clearTimeout(websocket._closeTimer);

  if (
    websocket._receiver._writableState.finished ||
    websocket._receiver._writableState.errorEmitted
  ) {
    websocket.emitClose();
  } else {
    websocket._receiver.on('error', receiverOnFinish);
    websocket._receiver.on('finish', receiverOnFinish);
  }
}

/**
 * The listener of the `net.Socket` `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function socketOnData(chunk) {
  if (!this[kWebSocket]._receiver.write(chunk)) {
    this.pause();
  }
}

/**
 * The listener of the `net.Socket` `'end'` event.
 *
 * @private
 */
function socketOnEnd() {
  const websocket = this[kWebSocket];

  websocket.readyState = WebSocket.CLOSING;
  websocket._receiver.end();
  this.end();
}

/**
 * The listener of the `net.Socket` `'error'` event.
 *
 * @private
 */
function socketOnError() {
  const websocket = this[kWebSocket];

  this.removeListener('error', socketOnError);
  this.on('error', NOOP);

  websocket.readyState = WebSocket.CLOSING;
  this.destroy();
}


/*
file https://github.com/websockets/ws/blob/6.2.1/index.js
*/
'use strict';

// const WebSocket = exports_websockets_ws_lib_websocket;

WebSocket.Server = exports_websockets_ws_lib_websocket_server;
WebSocket.Receiver = exports_websockets_ws_lib_receiver;
WebSocket.Sender = exports_websockets_ws_lib_sender;

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
// const debugError = require('debug')(`puppeteer:error`);
// const fs = require('fs');

class Helper {
  /**
   * @param {Function|string} fun
   * @param {!Array<*>} args
   * @return {string}
   */
  static evaluationString(fun, ...args) {
    if (Helper.isString(fun)) {
      assert(args.length === 0, 'Cannot evaluate a string with arguments');
      return /** @type {string} */ (fun);
    }
    return `(${fun})(${args.map(serializeArgument).join(',')})`;

    /**
     * @param {*} arg
     * @return {string}
     */
    function serializeArgument(arg) {
      if (Object.is(arg, undefined))
        return 'undefined';
      return JSON.stringify(arg);
    }
  }

  /**
   * @param {!Protocol.Runtime.ExceptionDetails} exceptionDetails
   * @return {string}
   */
  static getExceptionMessage(exceptionDetails) {
    if (exceptionDetails.exception)
      return exceptionDetails.exception.description || exceptionDetails.exception.value;
    let message = exceptionDetails.text;
    if (exceptionDetails.stackTrace) {
      for (const callframe of exceptionDetails.stackTrace.callFrames) {
        const location = callframe.url + ':' + callframe.lineNumber + ':' + callframe.columnNumber;
        const functionName = callframe.functionName || '<anonymous>';
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
    assert(!remoteObject.objectId, 'Cannot extract value when objectId is given');
    if (remoteObject.unserializableValue) {
      if (remoteObject.type === 'bigint' && typeof BigInt !== 'undefined')
        return BigInt(remoteObject.unserializableValue.replace('n', ''));
      switch (remoteObject.unserializableValue) {
        case '-0':
          return -0;
        case 'NaN':
          return NaN;
        case 'Infinity':
          return Infinity;
        case '-Infinity':
          return -Infinity;
        default:
          throw new Error('Unsupported unserializable value: ' + remoteObject.unserializableValue);
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
    await client.send('Runtime.releaseObject', {objectId: remoteObject.objectId}).catch(error => {
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
      if (methodName === 'constructor' || typeof methodName !== 'string' || methodName.startsWith('_') || typeof method !== 'function' || method.constructor.name !== 'AsyncFunction')
        continue;
      Reflect.set(classType.prototype, methodName, function(...args) {
        const syncStack = {};
        Error.captureStackTrace(syncStack);
        return method.call(this, ...args).catch(e => {
          const stack = syncStack.stack.substring(syncStack.stack.indexOf('\n') + 1);
          const clientStack = stack.substring(stack.indexOf('\n'));
          if (e instanceof Error && e.stack && !e.stack.includes(clientStack))
            e.stack += '\n  -- ASYNC --\n' + stack;
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
    return typeof obj === 'string' || obj instanceof String;
  }

  /**
   * @param {!Object} obj
   * @return {boolean}
   */
  static isNumber(obj) {
    return typeof obj === 'number' || obj instanceof Number;
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
        rejectCallback(new TimeoutError('Timeout exceeded while waiting for event'));
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
      file = await openAsync(path, 'w');
    const bufs = [];
    while (!eof) {
      const response = await client.send('IO.read', {handle});
      eof = response.eof;
      const buf = Buffer.from(response.data, response.base64Encoded ? 'base64' : undefined);
      bufs.push(buf);
      if (path)
        await writeAsync(file, buf);
    }
    if (path)
      await closeAsync(file);
    await client.send('IO.close', {handle});
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
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/Accessibility.js
*/
/**
 * Copyright 2018 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @typedef {Object} SerializedAXNode
 * @property {string} role
 *
 * @property {string=} name
 * @property {string|number=} value
 * @property {string=} description
 *
 * @property {string=} keyshortcuts
 * @property {string=} roledescription
 * @property {string=} valuetext
 *
 * @property {boolean=} disabled
 * @property {boolean=} expanded
 * @property {boolean=} focused
 * @property {boolean=} modal
 * @property {boolean=} multiline
 * @property {boolean=} multiselectable
 * @property {boolean=} readonly
 * @property {boolean=} required
 * @property {boolean=} selected
 *
 * @property {boolean|"mixed"=} checked
 * @property {boolean|"mixed"=} pressed
 *
 * @property {number=} level
 * @property {number=} valuemin
 * @property {number=} valuemax
 *
 * @property {string=} autocomplete
 * @property {string=} haspopup
 * @property {string=} invalid
 * @property {string=} orientation
 *
 * @property {Array<SerializedAXNode>=} children
 */

class Accessibility {
  /**
   * @param {!Puppeteer.CDPSession} client
   */
  constructor(client) {
    this._client = client;
  }

  /**
   * @param {{interestingOnly?: boolean, root?: ?Puppeteer.ElementHandle}=} options
   * @return {!Promise<!SerializedAXNode>}
   */
  async snapshot(options = {}) {
    const {
      interestingOnly = true,
      root = null,
    } = options;
    const {nodes} = await this._client.send('Accessibility.getFullAXTree');
    let backendNodeId = null;
    if (root) {
      const {node} = await this._client.send('DOM.describeNode', {objectId: root._remoteObject.objectId});
      backendNodeId = node.backendNodeId;
    }
    const defaultRoot = AXNode.createTree(nodes);
    let needle = defaultRoot;
    if (backendNodeId) {
      needle = defaultRoot.find(node => node._payload.backendDOMNodeId === backendNodeId);
      if (!needle)
        return null;
    }
    if (!interestingOnly)
      return serializeTree(needle)[0];

    /** @type {!Set<!AXNode>} */
    const interestingNodes = new Set();
    collectInterestingNodes(interestingNodes, defaultRoot, false);
    if (!interestingNodes.has(needle))
      return null;
    return serializeTree(needle, interestingNodes)[0];
  }
}

/**
 * @param {!Set<!AXNode>} collection
 * @param {!AXNode} node
 * @param {boolean} insideControl
 */
function collectInterestingNodes(collection, node, insideControl) {
  if (node.isInteresting(insideControl))
    collection.add(node);
  if (node.isLeafNode())
    return;
  insideControl = insideControl || node.isControl();
  for (const child of node._children)
    collectInterestingNodes(collection, child, insideControl);
}

/**
 * @param {!AXNode} node
 * @param {!Set<!AXNode>=} whitelistedNodes
 * @return {!Array<!SerializedAXNode>}
 */
function serializeTree(node, whitelistedNodes) {
  /** @type {!Array<!SerializedAXNode>} */
  const children = [];
  for (const child of node._children)
    children.push(...serializeTree(child, whitelistedNodes));

  if (whitelistedNodes && !whitelistedNodes.has(node))
    return children;

  const serializedNode = node.serialize();
  if (children.length)
    serializedNode.children = children;
  return [serializedNode];
}


class AXNode {
  /**
   * @param {!Protocol.Accessibility.AXNode} payload
   */
  constructor(payload) {
    this._payload = payload;

    /** @type {!Array<!AXNode>} */
    this._children = [];

    this._richlyEditable = false;
    this._editable = false;
    this._focusable = false;
    this._expanded = false;
    this._name = this._payload.name ? this._payload.name.value : '';
    this._role = this._payload.role ? this._payload.role.value : 'Unknown';
    this._cachedHasFocusableChild;

    for (const property of this._payload.properties || []) {
      if (property.name === 'editable') {
        this._richlyEditable = property.value.value === 'richtext';
        this._editable = true;
      }
      if (property.name === 'focusable')
        this._focusable = property.value.value;
      if (property.name === 'expanded')
        this._expanded = property.value.value;
    }
  }

  /**
   * @return {boolean}
   */
  _isPlainTextField() {
    if (this._richlyEditable)
      return false;
    if (this._editable)
      return true;
    return this._role === 'textbox' || this._role === 'ComboBox' || this._role === 'searchbox';
  }

  /**
   * @return {boolean}
   */
  _isTextOnlyObject() {
    const role = this._role;
    return (role === 'LineBreak' || role === 'text' ||
            role === 'InlineTextBox');
  }

  /**
   * @return {boolean}
   */
  _hasFocusableChild() {
    if (this._cachedHasFocusableChild === undefined) {
      this._cachedHasFocusableChild = false;
      for (const child of this._children) {
        if (child._focusable || child._hasFocusableChild()) {
          this._cachedHasFocusableChild = true;
          break;
        }
      }
    }
    return this._cachedHasFocusableChild;
  }

  /**
   * @param {function(AXNode):boolean} predicate
   * @return {?AXNode}
   */
  find(predicate) {
    if (predicate(this))
      return this;
    for (const child of this._children) {
      const result = child.find(predicate);
      if (result)
        return result;
    }
    return null;
  }

  /**
   * @return {boolean}
   */
  isLeafNode() {
    if (!this._children.length)
      return true;

    // These types of objects may have children that we use as internal
    // implementation details, but we want to expose them as leaves to platform
    // accessibility APIs because screen readers might be confused if they find
    // any children.
    if (this._isPlainTextField() || this._isTextOnlyObject())
      return true;

    // Roles whose children are only presentational according to the ARIA and
    // HTML5 Specs should be hidden from screen readers.
    // (Note that whilst ARIA buttons can have only presentational children, HTML5
    // buttons are allowed to have content.)
    switch (this._role) {
      case 'doc-cover':
      case 'graphics-symbol':
      case 'img':
      case 'Meter':
      case 'scrollbar':
      case 'slider':
      case 'separator':
      case 'progressbar':
        return true;
      default:
        break;
    }

    // Here and below: Android heuristics
    if (this._hasFocusableChild())
      return false;
    if (this._focusable && this._name)
      return true;
    if (this._role === 'heading' && this._name)
      return true;
    return false;
  }

  /**
   * @return {boolean}
   */
  isControl() {
    switch (this._role) {
      case 'button':
      case 'checkbox':
      case 'ColorWell':
      case 'combobox':
      case 'DisclosureTriangle':
      case 'listbox':
      case 'menu':
      case 'menubar':
      case 'menuitem':
      case 'menuitemcheckbox':
      case 'menuitemradio':
      case 'radio':
      case 'scrollbar':
      case 'searchbox':
      case 'slider':
      case 'spinbutton':
      case 'switch':
      case 'tab':
      case 'textbox':
      case 'tree':
        return true;
      default:
        return false;
    }
  }

  /**
   * @param {boolean} insideControl
   * @return {boolean}
   */
  isInteresting(insideControl) {
    const role = this._role;
    if (role === 'Ignored')
      return false;

    if (this._focusable || this._richlyEditable)
      return true;

    // If it's not focusable but has a control role, then it's interesting.
    if (this.isControl())
      return true;

    // A non focusable child of a control is not interesting
    if (insideControl)
      return false;

    return this.isLeafNode() && !!this._name;
  }

  /**
   * @return {!SerializedAXNode}
   */
  serialize() {
    /** @type {!Map<string, number|string|boolean>} */
    const properties = new Map();
    for (const property of this._payload.properties || [])
      properties.set(property.name.toLowerCase(), property.value.value);
    if (this._payload.name)
      properties.set('name', this._payload.name.value);
    if (this._payload.value)
      properties.set('value', this._payload.value.value);
    if (this._payload.description)
      properties.set('description', this._payload.description.value);

    /** @type {SerializedAXNode} */
    const node = {
      role: this._role
    };

    /** @type {!Array<keyof SerializedAXNode>} */
    const userStringProperties = [
      'name',
      'value',
      'description',
      'keyshortcuts',
      'roledescription',
      'valuetext',
    ];
    for (const userStringProperty of userStringProperties) {
      if (!properties.has(userStringProperty))
        continue;
      node[userStringProperty] = properties.get(userStringProperty);
    }

    /** @type {!Array<keyof SerializedAXNode>} */
    const booleanProperties = [
      'disabled',
      'expanded',
      'focused',
      'modal',
      'multiline',
      'multiselectable',
      'readonly',
      'required',
      'selected',
    ];
    for (const booleanProperty of booleanProperties) {
      // WebArea's treat focus differently than other nodes. They report whether their frame  has focus,
      // not whether focus is specifically on the root node.
      if (booleanProperty === 'focused' && this._role === 'WebArea')
        continue;
      const value = properties.get(booleanProperty);
      if (!value)
        continue;
      node[booleanProperty] = value;
    }

    /** @type {!Array<keyof SerializedAXNode>} */
    const tristateProperties = [
      'checked',
      'pressed',
    ];
    for (const tristateProperty of tristateProperties) {
      if (!properties.has(tristateProperty))
        continue;
      const value = properties.get(tristateProperty);
      node[tristateProperty] = value === 'mixed' ? 'mixed' : value === 'true' ? true : false;
    }
    /** @type {!Array<keyof SerializedAXNode>} */
    const numericalProperties = [
      'level',
      'valuemax',
      'valuemin',
    ];
    for (const numericalProperty of numericalProperties) {
      if (!properties.has(numericalProperty))
        continue;
      node[numericalProperty] = properties.get(numericalProperty);
    }
    /** @type {!Array<keyof SerializedAXNode>} */
    const tokenProperties = [
      'autocomplete',
      'haspopup',
      'invalid',
      'orientation',
    ];
    for (const tokenProperty of tokenProperties) {
      const value = properties.get(tokenProperty);
      if (!value || value === 'false')
        continue;
      node[tokenProperty] = value;
    }
    return node;
  }

  /**
   * @param {!Array<!Protocol.Accessibility.AXNode>} payloads
   * @return {!AXNode}
   */
  static createTree(payloads) {
    /** @type {!Map<string, !AXNode>} */
    const nodeById = new Map();
    for (const payload of payloads)
      nodeById.set(payload.nodeId, new AXNode(payload));
    for (const node of nodeById.values()) {
      for (const childId of node._payload.childIds || [])
        node._children.push(nodeById.get(childId));
    }
    return nodeById.values().next().value;
  }
}

exports_puppeteer_puppeteer_lib_Accessibility = {Accessibility};


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
// const EventEmitter = require('events');
// const {TaskQueue} = exports_puppeteer_puppeteer_lib_TaskQueue;
// const {Events} = exports_puppeteer_puppeteer_lib_Events;

class Browser extends EventEmitter {
  /**
   * @param {!Puppeteer.Connection} connection
   * @param {!Array<string>} contextIds
   * @param {boolean} ignoreHTTPSErrors
   * @param {?Puppeteer.Viewport} defaultViewport
   * @param {?Puppeteer.ChildProcess} process
   * @param {function()=} closeCallback
   */
  static async create(connection, contextIds, ignoreHTTPSErrors, defaultViewport, process, closeCallback) {
    const browser = new Browser(connection, contextIds, ignoreHTTPSErrors, defaultViewport, process, closeCallback);
    await connection.send('Target.setDiscoverTargets', {discover: true});
    return browser;
  }

  /**
   * @param {!Puppeteer.Connection} connection
   * @param {!Array<string>} contextIds
   * @param {boolean} ignoreHTTPSErrors
   * @param {?Puppeteer.Viewport} defaultViewport
   * @param {?Puppeteer.ChildProcess} process
   * @param {(function():Promise)=} closeCallback
   */
  constructor(connection, contextIds, ignoreHTTPSErrors, defaultViewport, process, closeCallback) {
    super();
    this._ignoreHTTPSErrors = ignoreHTTPSErrors;
    this._defaultViewport = defaultViewport;
    this._process = process;
    this._screenshotTaskQueue = new TaskQueue();
    this._connection = connection;
    this._closeCallback = closeCallback || new Function();

    this._defaultContext = new BrowserContext(this._connection, this, null);
    /** @type {Map<string, BrowserContext>} */
    this._contexts = new Map();
    for (const contextId of contextIds)
      this._contexts.set(contextId, new BrowserContext(this._connection, this, contextId));

    /** @type {Map<string, Target>} */
    this._targets = new Map();
    this._connection.on(Events.Connection.Disconnected, () => this.emit(Events.Browser.Disconnected));
    this._connection.on('Target.targetCreated', this._targetCreated.bind(this));
    this._connection.on('Target.targetDestroyed', this._targetDestroyed.bind(this));
    this._connection.on('Target.targetInfoChanged', this._targetInfoChanged.bind(this));
  }

  /**
   * @return {?Puppeteer.ChildProcess}
   */
  process() {
    return this._process;
  }

  /**
   * @return {!Promise<!BrowserContext>}
   */
  async createIncognitoBrowserContext() {
    const {browserContextId} = await this._connection.send('Target.createBrowserContext');
    const context = new BrowserContext(this._connection, this, browserContextId);
    this._contexts.set(browserContextId, context);
    return context;
  }

  /**
   * @return {!Array<!BrowserContext>}
   */
  browserContexts() {
    return [this._defaultContext, ...Array.from(this._contexts.values())];
  }

  /**
   * @return {!BrowserContext}
   */
  defaultBrowserContext() {
    return this._defaultContext;
  }

  /**
   * @param {?string} contextId
   */
  async _disposeContext(contextId) {
    await this._connection.send('Target.disposeBrowserContext', {browserContextId: contextId || undefined});
    this._contexts.delete(contextId);
  }

  /**
   * @param {!Protocol.Target.targetCreatedPayload} event
   */
  async _targetCreated(event) {
    const targetInfo = event.targetInfo;
    const {browserContextId} = targetInfo;
    const context = (browserContextId && this._contexts.has(browserContextId)) ? this._contexts.get(browserContextId) : this._defaultContext;

    const target = new Target(targetInfo, context, () => this._connection.createSession(targetInfo), this._ignoreHTTPSErrors, this._defaultViewport, this._screenshotTaskQueue);
    assert(!this._targets.has(event.targetInfo.targetId), 'Target should not exist before targetCreated');
    this._targets.set(event.targetInfo.targetId, target);

    if (await target._initializedPromise) {
      this.emit(Events.Browser.TargetCreated, target);
      context.emit(Events.BrowserContext.TargetCreated, target);
    }
  }

  /**
   * @param {{targetId: string}} event
   */
  async _targetDestroyed(event) {
    const target = this._targets.get(event.targetId);
    target._initializedCallback(false);
    this._targets.delete(event.targetId);
    target._closedCallback();
    if (await target._initializedPromise) {
      this.emit(Events.Browser.TargetDestroyed, target);
      target.browserContext().emit(Events.BrowserContext.TargetDestroyed, target);
    }
  }

  /**
   * @param {!Protocol.Target.targetInfoChangedPayload} event
   */
  _targetInfoChanged(event) {
    const target = this._targets.get(event.targetInfo.targetId);
    assert(target, 'target should exist before targetInfoChanged');
    const previousURL = target.url();
    const wasInitialized = target._isInitialized;
    target._targetInfoChanged(event.targetInfo);
    if (wasInitialized && previousURL !== target.url()) {
      this.emit(Events.Browser.TargetChanged, target);
      target.browserContext().emit(Events.BrowserContext.TargetChanged, target);
    }
  }

  /**
   * @return {string}
   */
  wsEndpoint() {
    return this._connection.url();
  }

  /**
   * @return {!Promise<!Puppeteer.Page>}
   */
  async newPage() {
    return this._defaultContext.newPage();
  }

  /**
   * @param {?string} contextId
   * @return {!Promise<!Puppeteer.Page>}
   */
  async _createPageInContext(contextId) {
    const {targetId} = await this._connection.send('Target.createTarget', {url: 'about:blank', browserContextId: contextId || undefined});
    const target = await this._targets.get(targetId);
    assert(await target._initializedPromise, 'Failed to create target for page');
    const page = await target.page();
    return page;
  }

  /**
   * @return {!Array<!Target>}
   */
  targets() {
    return Array.from(this._targets.values()).filter(target => target._isInitialized);
  }

  /**
   * @return {!Target}
   */
  target() {
    return this.targets().find(target => target.type() === 'browser');
  }

  /**
   * @param {function(!Target):boolean} predicate
   * @param {{timeout?: number}=} options
   * @return {!Promise<!Target>}
   */
  async waitForTarget(predicate, options = {}) {
    const {
      timeout = 30000
    } = options;
    const existingTarget = this.targets().find(predicate);
    if (existingTarget)
      return existingTarget;
    let resolve;
    const targetPromise = new Promise(x => resolve = x);
    this.on(Events.Browser.TargetCreated, check);
    this.on(Events.Browser.TargetChanged, check);
    try {
      if (!timeout)
        return await targetPromise;
      return await helper.waitWithTimeout(targetPromise, 'target', timeout);
    } finally {
      this.removeListener(Events.Browser.TargetCreated, check);
      this.removeListener(Events.Browser.TargetChanged, check);
    }

    /**
     * @param {!Target} target
     */
    function check(target) {
      if (predicate(target))
        resolve(target);
    }
  }

  /**
   * @return {!Promise<!Array<!Puppeteer.Page>>}
   */
  async pages() {
    const contextPages = await Promise.all(this.browserContexts().map(context => context.pages()));
    // Flatten array.
    return contextPages.reduce((acc, x) => acc.concat(x), []);
  }

  /**
   * @return {!Promise<string>}
   */
  async version() {
    const version = await this._getVersion();
    return version.product;
  }

  /**
   * @return {!Promise<string>}
   */
  async userAgent() {
    const version = await this._getVersion();
    return version.userAgent;
  }

  async close() {
    await this._closeCallback.call(null);
    this.disconnect();
  }

  disconnect() {
    this._connection.dispose();
  }

  /**
   * @return {boolean}
   */
  isConnected() {
    return !this._connection._closed;
  }

  /**
   * @return {!Promise<!Object>}
   */
  _getVersion() {
    return this._connection.send('Browser.getVersion');
  }
}

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
    return this._browser.targets().filter(target => target.browserContext() === this);
  }

  /**
   * @param {function(!Target):boolean} predicate
   * @param {{timeout?: number}=} options
   * @return {!Promise<!Target>}
   */
  waitForTarget(predicate, options) {
    return this._browser.waitForTarget(target => target.browserContext() === this && predicate(target), options);
  }

  /**
   * @return {!Promise<!Array<!Puppeteer.Page>>}
   */
  async pages() {
    const pages = await Promise.all(
        this.targets()
            .filter(target => target.type() === 'page')
            .map(target => target.page())
    );
    return pages.filter(page => !!page);
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
      ['geolocation', 'geolocation'],
      ['midi', 'midi'],
      ['notifications', 'notifications'],
      ['push', 'push'],
      ['camera', 'videoCapture'],
      ['microphone', 'audioCapture'],
      ['background-sync', 'backgroundSync'],
      ['ambient-light-sensor', 'sensors'],
      ['accelerometer', 'sensors'],
      ['gyroscope', 'sensors'],
      ['magnetometer', 'sensors'],
      ['accessibility-events', 'accessibilityEvents'],
      ['clipboard-read', 'clipboardRead'],
      ['clipboard-write', 'clipboardWrite'],
      ['payment-handler', 'paymentHandler'],
      // chrome-specific permissions we have.
      ['midi-sysex', 'midiSysex'],
    ]);
    permissions = permissions.map(permission => {
      const protocolPermission = webPermissionToProtocol.get(permission);
      if (!protocolPermission)
        throw new Error('Unknown permission: ' + permission);
      return protocolPermission;
    });
    await this._connection.send('Browser.grantPermissions', {origin, browserContextId: this._id || undefined, permissions});
  }

  async clearPermissionOverrides() {
    await this._connection.send('Browser.resetPermissions', {browserContextId: this._id || undefined});
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
    assert(this._id, 'Non-incognito profiles cannot be closed!');
    await this._browser._disposeContext(this._id);
  }
}

exports_puppeteer_puppeteer_lib_Browser = {Browser, BrowserContext};


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
// const debugProtocol = require('debug')('puppeteer:protocol');
// const EventEmitter = require('events');

class Connection extends EventEmitter {
  /**
   * @param {string} url
   * @param {!Puppeteer.ConnectionTransport} transport
   * @param {number=} delay
   */
  constructor(url, transport, delay = 0) {
    super();
    this._url = url;
    this._lastId = 0;
    /** @type {!Map<number, {resolve: function, reject: function, error: !Error, method: string}>}*/
    this._callbacks = new Map();
    this._delay = delay;

    this._transport = transport;
    this._transport.onmessage = this._onMessage.bind(this);
    this._transport.onclose = this._onClose.bind(this);
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
    debugProtocol('SEND ► ' + message);
    this._transport.send(message);
    return id;
  }

  /**
   * @param {string} message
   */
  async _onMessage(message) {
    if (this._delay)
      await new Promise(f => setTimeout(f, this._delay));
    debugProtocol('◀ RECV ' + message);
    const object = JSON.parse(message);
    if (object.method === 'Target.attachedToTarget') {
      const sessionId = object.params.sessionId;
      const session = new CDPSession(this, object.params.targetInfo.type, sessionId);
      this._sessions.set(sessionId, session);
    } else if (object.method === 'Target.detachedFromTarget') {
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
    this._transport.onmessage = null;
    this._transport.onclose = null;
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
    this._transport.close();
  }

  /**
   * @param {Protocol.Target.TargetInfo} targetInfo
   * @return {!Promise<!CDPSession>}
   */
  async createSession(targetInfo) {
    const {sessionId} = await this.send('Target.attachToTarget', {targetId: targetInfo.targetId, flatten: true});
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
    await this._connection.send('Target.detachFromTarget',  {sessionId: this._sessionId});
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
  if ('data' in object.error)
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
    assert(!this._enabled, 'JSCoverage is already enabled');
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
      helper.addEventListener(this._client, 'Debugger.scriptParsed', this._onScriptParsed.bind(this)),
      helper.addEventListener(this._client, 'Runtime.executionContextsCleared', this._onExecutionContextsCleared.bind(this)),
    ];
    await Promise.all([
      this._client.send('Profiler.enable'),
      this._client.send('Profiler.startPreciseCoverage', {callCount: false, detailed: true}),
      this._client.send('Debugger.enable'),
      this._client.send('Debugger.setSkipAllPauses', {skip: true})
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
      const response = await this._client.send('Debugger.getScriptSource', {scriptId: event.scriptId});
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
    assert(this._enabled, 'JSCoverage is not enabled');
    this._enabled = false;
    const [profileResponse] = await Promise.all([
      this._client.send('Profiler.takePreciseCoverage'),
      this._client.send('Profiler.stopPreciseCoverage'),
      this._client.send('Profiler.disable'),
      this._client.send('Debugger.disable'),
    ]);
    helper.removeEventListeners(this._eventListeners);

    const coverage = [];
    for (const entry of profileResponse.result) {
      let url = this._scriptURLs.get(entry.scriptId);
      if (!url && this._reportAnonymousScripts)
        url = 'debugger://VM' + entry.scriptId;
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
    assert(!this._enabled, 'CSSCoverage is already enabled');
    const {resetOnNavigation = true} = options;
    this._resetOnNavigation = resetOnNavigation;
    this._enabled = true;
    this._stylesheetURLs.clear();
    this._stylesheetSources.clear();
    this._eventListeners = [
      helper.addEventListener(this._client, 'CSS.styleSheetAdded', this._onStyleSheet.bind(this)),
      helper.addEventListener(this._client, 'Runtime.executionContextsCleared', this._onExecutionContextsCleared.bind(this)),
    ];
    await Promise.all([
      this._client.send('DOM.enable'),
      this._client.send('CSS.enable'),
      this._client.send('CSS.startRuleUsageTracking'),
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
      const response = await this._client.send('CSS.getStyleSheetText', {styleSheetId: header.styleSheetId});
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
    assert(this._enabled, 'CSSCoverage is not enabled');
    this._enabled = false;
    const ruleTrackingResponse = await this._client.send('CSS.stopRuleUsageTracking');
    await Promise.all([
      this._client.send('CSS.disable'),
      this._client.send('DOM.disable'),
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

// const fs = require('fs');
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

    /** @type {?Promise<!Puppeteer.ElementHandle>} */
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
      waitTask.terminate(new Error('waitForFunction failed: frame got detached.'));
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

  /**
   * @param {string} selector
   * @return {!Promise<?Puppeteer.ElementHandle>}
   */
  async $(selector) {
    const document = await this._document();
    const value = await document.$(selector);
    return value;
  }

  /**
   * @return {!Promise<!Puppeteer.ElementHandle>}
   */
  async _document() {
    if (this._documentPromise)
      return this._documentPromise;
    this._documentPromise = this.executionContext().then(async context => {
      const document = await context.evaluateHandle('document');
      return document.asElement();
    });
    return this._documentPromise;
  }

  /**
   * @param {string} expression
   * @return {!Promise<!Array<!Puppeteer.ElementHandle>>}
   */
  async $x(expression) {
    const document = await this._document();
    const value = await document.$x(expression);
    return value;
  }

  /**
   * @param {string} selector
   * @param {Function|string} pageFunction
   * @param {!Array<*>} args
   * @return {!Promise<(!Object|undefined)>}
   */
  async $eval(selector, pageFunction, ...args) {
    const document = await this._document();
    return document.$eval(selector, pageFunction, ...args);
  }

  /**
   * @param {string} selector
   * @param {Function|string} pageFunction
   * @param {!Array<*>} args
   * @return {!Promise<(!Object|undefined)>}
   */
  async $$eval(selector, pageFunction, ...args) {
    const document = await this._document();
    const value = await document.$$eval(selector, pageFunction, ...args);
    return value;
  }

  /**
   * @param {string} selector
   * @return {!Promise<!Array<!Puppeteer.ElementHandle>>}
   */
  async $$(selector) {
    const document = await this._document();
    const value = await document.$$(selector);
    return value;
  }

  /**
   * @return {!Promise<String>}
   */
  async content() {
    return await this.evaluate(() => {
      let retVal = '';
      if (document.doctype)
        retVal = new XMLSerializer().serializeToString(document.doctype);
      if (document.documentElement)
        retVal += document.documentElement.outerHTML;
      return retVal;
    });
  }

  /**
   * @param {string} html
   * @param {!{timeout?: number, waitUntil?: string|!Array<string>}=} options
   */
  async setContent(html, options = {}) {
    const {
      waitUntil = ['load'],
      timeout = this._timeoutSettings.navigationTimeout(),
    } = options;
    // We rely upon the fact that document.open() will reset frame lifecycle with "init"
    // lifecycle event. @see https://crrev.com/608658
    await this.evaluate(html => {
      document.open();
      document.write(html);
      document.close();
    }, html);
    const watcher = new LifecycleWatcher(this._frameManager, this._frame, waitUntil, timeout);
    const error = await Promise.race([
      watcher.timeoutOrTerminationPromise(),
      watcher.lifecyclePromise(),
    ]);
    watcher.dispose();
    if (error)
      throw error;
  }

  /**
   * @param {!{url?: string, path?: string, content?: string, type?: string}} options
   * @return {!Promise<!Puppeteer.ElementHandle>}
   */
  async addScriptTag(options) {
    const {
      url = null,
      path = null,
      content = null,
      type = ''
    } = options;
    if (url !== null) {
      try {
        const context = await this.executionContext();
        return (await context.evaluateHandle(addScriptUrl, url, type)).asElement();
      } catch (error) {
        throw new Error(`Loading script from ${url} failed`);
      }
    }

    if (path !== null) {
      let contents = await readFileAsync(path, 'utf8');
      contents += '//# sourceURL=' + path.replace(/\n/g, '');
      const context = await this.executionContext();
      return (await context.evaluateHandle(addScriptContent, contents, type)).asElement();
    }

    if (content !== null) {
      const context = await this.executionContext();
      return (await context.evaluateHandle(addScriptContent, content, type)).asElement();
    }

    throw new Error('Provide an object with a `url`, `path` or `content` property');

    /**
     * @param {string} url
     * @param {string} type
     * @return {!Promise<!HTMLElement>}
     */
    async function addScriptUrl(url, type) {
      const script = document.createElement('script');
      script.src = url;
      if (type)
        script.type = type;
      const promise = new Promise((res, rej) => {
        script.onload = res;
        script.onerror = rej;
      });
      document.head.appendChild(script);
      await promise;
      return script;
    }

    /**
     * @param {string} content
     * @param {string} type
     * @return {!HTMLElement}
     */
    function addScriptContent(content, type = 'text/javascript') {
      const script = document.createElement('script');
      script.type = type;
      script.text = content;
      let error = null;
      script.onerror = e => error = e;
      document.head.appendChild(script);
      if (error)
        throw error;
      return script;
    }
  }

  /**
   * @param {!{url?: string, path?: string, content?: string}} options
   * @return {!Promise<!Puppeteer.ElementHandle>}
   */
  async addStyleTag(options) {
    const {
      url = null,
      path = null,
      content = null
    } = options;
    if (url !== null) {
      try {
        const context = await this.executionContext();
        return (await context.evaluateHandle(addStyleUrl, url)).asElement();
      } catch (error) {
        throw new Error(`Loading style from ${url} failed`);
      }
    }

    if (path !== null) {
      let contents = await readFileAsync(path, 'utf8');
      contents += '/*# sourceURL=' + path.replace(/\n/g, '') + '*/';
      const context = await this.executionContext();
      return (await context.evaluateHandle(addStyleContent, contents)).asElement();
    }

    if (content !== null) {
      const context = await this.executionContext();
      return (await context.evaluateHandle(addStyleContent, content)).asElement();
    }

    throw new Error('Provide an object with a `url`, `path` or `content` property');

    /**
     * @param {string} url
     * @return {!Promise<!HTMLElement>}
     */
    async function addStyleUrl(url) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      const promise = new Promise((res, rej) => {
        link.onload = res;
        link.onerror = rej;
      });
      document.head.appendChild(link);
      await promise;
      return link;
    }

    /**
     * @param {string} content
     * @return {!Promise<!HTMLElement>}
     */
    async function addStyleContent(content) {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(content));
      const promise = new Promise((res, rej) => {
        style.onload = res;
        style.onerror = rej;
      });
      document.head.appendChild(style);
      await promise;
      return style;
    }
  }

  /**
   * @param {string} selector
   * @param {!{delay?: number, button?: "left"|"right"|"middle", clickCount?: number}=} options
   */
  async click(selector, options) {
    const handle = await this.$(selector);
    assert(handle, 'No node found for selector: ' + selector);
    await handle.click(options);
    await handle.dispose();
  }

  /**
   * @param {string} selector
   */
  async focus(selector) {
    const handle = await this.$(selector);
    assert(handle, 'No node found for selector: ' + selector);
    await handle.focus();
    await handle.dispose();
  }

  /**
   * @param {string} selector
   */
  async hover(selector) {
    const handle = await this.$(selector);
    assert(handle, 'No node found for selector: ' + selector);
    await handle.hover();
    await handle.dispose();
  }

  /**
  * @param {string} selector
  * @param {!Array<string>} values
  * @return {!Promise<!Array<string>>}
  */
  select(selector, ...values){
    for (const value of values)
      assert(helper.isString(value), 'Values must be strings. Found value "' + value + '" of type "' + (typeof value) + '"');
    return this.$eval(selector, (element, values) => {
      if (element.nodeName.toLowerCase() !== 'select')
        throw new Error('Element is not a <select> element.');

      const options = Array.from(element.options);
      element.value = undefined;
      for (const option of options) {
        option.selected = values.includes(option.value);
        if (option.selected && !element.multiple)
          break;
      }
      element.dispatchEvent(new Event('input', { 'bubbles': true }));
      element.dispatchEvent(new Event('change', { 'bubbles': true }));
      return options.filter(option => option.selected).map(option => option.value);
    }, values);
  }

  /**
   * @param {string} selector
   */
  async tap(selector) {
    const handle = await this.$(selector);
    assert(handle, 'No node found for selector: ' + selector);
    await handle.tap();
    await handle.dispose();
  }

  /**
   * @param {string} selector
   * @param {string} text
   * @param {{delay: (number|undefined)}=} options
   */
  async type(selector, text, options) {
    const handle = await this.$(selector);
    assert(handle, 'No node found for selector: ' + selector);
    await handle.type(text, options);
    await handle.dispose();
  }

  /**
   * @param {string} selector
   * @param {!{visible?: boolean, hidden?: boolean, timeout?: number}=} options
   * @return {!Promise<?Puppeteer.ElementHandle>}
   */
  waitForSelector(selector, options) {
    return this._waitForSelectorOrXPath(selector, false, options);
  }

  /**
   * @param {string} xpath
   * @param {!{visible?: boolean, hidden?: boolean, timeout?: number}=} options
   * @return {!Promise<?Puppeteer.ElementHandle>}
   */
  waitForXPath(xpath, options) {
    return this._waitForSelectorOrXPath(xpath, true, options);
  }

  /**
   * @param {Function|string} pageFunction
   * @param {!{polling?: string|number, timeout?: number}=} options
   * @return {!Promise<!Puppeteer.JSHandle>}
   */
  waitForFunction(pageFunction, options = {}, ...args) {
    const {
      polling = 'raf',
      timeout = this._timeoutSettings.timeout(),
    } = options;
    return new WaitTask(this, pageFunction, 'function', polling, timeout, ...args).promise;
  }

  /**
   * @return {!Promise<string>}
   */
  async title() {
    return this.evaluate(() => document.title);
  }

  /**
   * @param {string} selectorOrXPath
   * @param {boolean} isXPath
   * @param {!{visible?: boolean, hidden?: boolean, timeout?: number}=} options
   * @return {!Promise<?Puppeteer.ElementHandle>}
   */
  async _waitForSelectorOrXPath(selectorOrXPath, isXPath, options = {}) {
    const {
      visible: waitForVisible = false,
      hidden: waitForHidden = false,
      timeout = this._timeoutSettings.timeout(),
    } = options;
    const polling = waitForVisible || waitForHidden ? 'raf' : 'mutation';
    const title = `${isXPath ? 'XPath' : 'selector'} "${selectorOrXPath}"${waitForHidden ? ' to be hidden' : ''}`;
    const waitTask = new WaitTask(this, predicate, title, polling, timeout, selectorOrXPath, isXPath, waitForVisible, waitForHidden);
    const handle = await waitTask.promise;
    if (!handle.asElement()) {
      await handle.dispose();
      return null;
    }
    return handle.asElement();

    /**
     * @param {string} selectorOrXPath
     * @param {boolean} isXPath
     * @param {boolean} waitForVisible
     * @param {boolean} waitForHidden
     * @return {?Node|boolean}
     */
    function predicate(selectorOrXPath, isXPath, waitForVisible, waitForHidden) {
      const node = isXPath
        ? document.evaluate(selectorOrXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
        : document.querySelector(selectorOrXPath);
      if (!node)
        return waitForHidden;
      if (!waitForVisible && !waitForHidden)
        return node;
      const element = /** @type {Element} */ (node.nodeType === Node.TEXT_NODE ? node.parentElement : node);

      const style = window.getComputedStyle(element);
      const isVisible = style && style.visibility !== 'hidden' && hasVisibleBoundingBox();
      const success = (waitForVisible === isVisible || waitForHidden === !isVisible);
      return success ? node : null;

      /**
       * @return {boolean}
       */
      function hasVisibleBoundingBox() {
        const rect = element.getBoundingClientRect();
        return !!(rect.top || rect.bottom || rect.width || rect.height);
      }
    }
  }
}

class WaitTask {
  /**
   * @param {!DOMWorld} domWorld
   * @param {Function|string} predicateBody
   * @param {string|number} polling
   * @param {number} timeout
   * @param {!Array<*>} args
   */
  constructor(domWorld, predicateBody, title, polling, timeout, ...args) {
    if (helper.isString(polling))
      assert(polling === 'raf' || polling === 'mutation', 'Unknown polling option: ' + polling);
    else if (helper.isNumber(polling))
      assert(polling > 0, 'Cannot poll with non-positive interval: ' + polling);
    else
      throw new Error('Unknown polling options: ' + polling);

    this._domWorld = domWorld;
    this._polling = polling;
    this._timeout = timeout;
    this._predicateBody = helper.isString(predicateBody) ? 'return (' + predicateBody + ')' : 'return (' + predicateBody + ')(...args)';
    this._args = args;
    this._runCount = 0;
    domWorld._waitTasks.add(this);
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
    // Since page navigation requires us to re-install the pageScript, we should track
    // timeout on our end.
    if (timeout) {
      const timeoutError = new TimeoutError(`waiting for ${title} failed: timeout ${timeout}ms exceeded`);
      this._timeoutTimer = setTimeout(() => this.terminate(timeoutError), timeout);
    }
    this.rerun();
  }

  /**
   * @param {!Error} error
   */
  terminate(error) {
    this._terminated = true;
    this._reject(error);
    this._cleanup();
  }

  async rerun() {
    const runCount = ++this._runCount;
    /** @type {?Puppeteer.JSHandle} */
    let success = null;
    let error = null;
    try {
      success = await (await this._domWorld.executionContext()).evaluateHandle(waitForPredicatePageFunction, this._predicateBody, this._polling, this._timeout, ...this._args);
    } catch (e) {
      error = e;
    }

    if (this._terminated || runCount !== this._runCount) {
      if (success)
        await success.dispose();
      return;
    }

    // Ignore timeouts in pageScript - we track timeouts ourselves.
    // If the frame's execution context has already changed, `frame.evaluate` will
    // throw an error - ignore this predicate run altogether.
    if (!error && await this._domWorld.evaluate(s => !s, success).catch(e => true)) {
      await success.dispose();
      return;
    }

    // When the page is navigated, the promise is rejected.
    // We will try again in the new execution context.
    if (error && error.message.includes('Execution context was destroyed'))
      return;

    // We could have tried to evaluate in a context which was already
    // destroyed.
    if (error && error.message.includes('Cannot find context with specified id'))
      return;

    if (error)
      this._reject(error);
    else
      this._resolve(success);

    this._cleanup();
  }

  _cleanup() {
    clearTimeout(this._timeoutTimer);
    this._domWorld._waitTasks.delete(this);
    this._runningTask = null;
  }
}

/**
 * @param {string} predicateBody
 * @param {string} polling
 * @param {number} timeout
 * @return {!Promise<*>}
 */
async function waitForPredicatePageFunction(predicateBody, polling, timeout, ...args) {
  const predicate = new Function('...args', predicateBody);
  let timedOut = false;
  if (timeout)
    setTimeout(() => timedOut = true, timeout);
  if (polling === 'raf')
    return await pollRaf();
  if (polling === 'mutation')
    return await pollMutation();
  if (typeof polling === 'number')
    return await pollInterval(polling);

  /**
   * @return {!Promise<*>}
   */
  function pollMutation() {
    const success = predicate.apply(null, args);
    if (success)
      return Promise.resolve(success);

    let fulfill;
    const result = new Promise(x => fulfill = x);
    const observer = new MutationObserver(mutations => {
      if (timedOut) {
        observer.disconnect();
        fulfill();
      }
      const success = predicate.apply(null, args);
      if (success) {
        observer.disconnect();
        fulfill(success);
      }
    });
    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: true
    });
    return result;
  }

  /**
   * @return {!Promise<*>}
   */
  function pollRaf() {
    let fulfill;
    const result = new Promise(x => fulfill = x);
    onRaf();
    return result;

    function onRaf() {
      if (timedOut) {
        fulfill();
        return;
      }
      const success = predicate.apply(null, args);
      if (success)
        fulfill(success);
      else
        requestAnimationFrame(onRaf);
    }
  }

  /**
   * @param {number} pollInterval
   * @return {!Promise<*>}
   */
  function pollInterval(pollInterval) {
    let fulfill;
    const result = new Promise(x => fulfill = x);
    onTimeout();
    return result;

    function onTimeout() {
      if (timedOut) {
        fulfill();
        return;
      }
      const success = predicate.apply(null, args);
      if (success)
        fulfill(success);
      else
        setTimeout(onTimeout, pollInterval);
    }
  }
}

exports_puppeteer_puppeteer_lib_DOMWorld = {DOMWorld};


/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/DeviceDescriptors.js
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

exports_puppeteer_puppeteer_lib_DeviceDescriptors = [
  {
    'name': 'Blackberry PlayBook',
    'userAgent': 'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+',
    'viewport': {
      'width': 600,
      'height': 1024,
      'deviceScaleFactor': 1,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Blackberry PlayBook landscape',
    'userAgent': 'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+',
    'viewport': {
      'width': 1024,
      'height': 600,
      'deviceScaleFactor': 1,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'BlackBerry Z30',
    'userAgent': 'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+',
    'viewport': {
      'width': 360,
      'height': 640,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'BlackBerry Z30 landscape',
    'userAgent': 'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+',
    'viewport': {
      'width': 640,
      'height': 360,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'Galaxy Note 3',
    'userAgent': 'Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    'viewport': {
      'width': 360,
      'height': 640,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Galaxy Note 3 landscape',
    'userAgent': 'Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    'viewport': {
      'width': 640,
      'height': 360,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'Galaxy Note II',
    'userAgent': 'Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    'viewport': {
      'width': 360,
      'height': 640,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Galaxy Note II landscape',
    'userAgent': 'Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    'viewport': {
      'width': 640,
      'height': 360,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'Galaxy S III',
    'userAgent': 'Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    'viewport': {
      'width': 360,
      'height': 640,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Galaxy S III landscape',
    'userAgent': 'Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    'viewport': {
      'width': 640,
      'height': 360,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'Galaxy S5',
    'userAgent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
    'viewport': {
      'width': 360,
      'height': 640,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Galaxy S5 landscape',
    'userAgent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
    'viewport': {
      'width': 640,
      'height': 360,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'iPad',
    'userAgent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
    'viewport': {
      'width': 768,
      'height': 1024,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'iPad landscape',
    'userAgent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
    'viewport': {
      'width': 1024,
      'height': 768,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'iPad Mini',
    'userAgent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
    'viewport': {
      'width': 768,
      'height': 1024,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'iPad Mini landscape',
    'userAgent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
    'viewport': {
      'width': 1024,
      'height': 768,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'iPad Pro',
    'userAgent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
    'viewport': {
      'width': 1024,
      'height': 1366,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'iPad Pro landscape',
    'userAgent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
    'viewport': {
      'width': 1366,
      'height': 1024,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'iPhone 4',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53',
    'viewport': {
      'width': 320,
      'height': 480,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'iPhone 4 landscape',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53',
    'viewport': {
      'width': 480,
      'height': 320,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'iPhone 5',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
    'viewport': {
      'width': 320,
      'height': 568,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'iPhone 5 landscape',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
    'viewport': {
      'width': 568,
      'height': 320,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'iPhone 6',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    'viewport': {
      'width': 375,
      'height': 667,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'iPhone 6 landscape',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    'viewport': {
      'width': 667,
      'height': 375,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'iPhone 6 Plus',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    'viewport': {
      'width': 414,
      'height': 736,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'iPhone 6 Plus landscape',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    'viewport': {
      'width': 736,
      'height': 414,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'iPhone 7',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    'viewport': {
      'width': 375,
      'height': 667,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'iPhone 7 landscape',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    'viewport': {
      'width': 667,
      'height': 375,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'iPhone 7 Plus',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    'viewport': {
      'width': 414,
      'height': 736,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'iPhone 7 Plus landscape',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    'viewport': {
      'width': 736,
      'height': 414,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'iPhone 8',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    'viewport': {
      'width': 375,
      'height': 667,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'iPhone 8 landscape',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    'viewport': {
      'width': 667,
      'height': 375,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'iPhone 8 Plus',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    'viewport': {
      'width': 414,
      'height': 736,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'iPhone 8 Plus landscape',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    'viewport': {
      'width': 736,
      'height': 414,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'iPhone SE',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
    'viewport': {
      'width': 320,
      'height': 568,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'iPhone SE landscape',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
    'viewport': {
      'width': 568,
      'height': 320,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'iPhone X',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    'viewport': {
      'width': 375,
      'height': 812,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'iPhone X landscape',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    'viewport': {
      'width': 812,
      'height': 375,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'JioPhone 2',
    'userAgent': 'Mozilla/5.0 (Mobile; LYF/F300B/LYF-F300B-001-01-15-130718-i;Android; rv:48.0) Gecko/48.0 Firefox/48.0 KAIOS/2.5',
    'viewport': {
      'width': 240,
      'height': 320,
      'deviceScaleFactor': 1,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'JioPhone 2 landscape',
    'userAgent': 'Mozilla/5.0 (Mobile; LYF/F300B/LYF-F300B-001-01-15-130718-i;Android; rv:48.0) Gecko/48.0 Firefox/48.0 KAIOS/2.5',
    'viewport': {
      'width': 320,
      'height': 240,
      'deviceScaleFactor': 1,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'Kindle Fire HDX',
    'userAgent': 'Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true',
    'viewport': {
      'width': 800,
      'height': 1280,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Kindle Fire HDX landscape',
    'userAgent': 'Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true',
    'viewport': {
      'width': 1280,
      'height': 800,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'LG Optimus L70',
    'userAgent': 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; LGMS323 Build/KOT49I.MS32310c) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3765.0 Mobile Safari/537.36',
    'viewport': {
      'width': 384,
      'height': 640,
      'deviceScaleFactor': 1.25,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'LG Optimus L70 landscape',
    'userAgent': 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; LGMS323 Build/KOT49I.MS32310c) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3765.0 Mobile Safari/537.36',
    'viewport': {
      'width': 640,
      'height': 384,
      'deviceScaleFactor': 1.25,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'Microsoft Lumia 550',
    'userAgent': 'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 550) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263',
    'viewport': {
      'width': 640,
      'height': 360,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Microsoft Lumia 950',
    'userAgent': 'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263',
    'viewport': {
      'width': 360,
      'height': 640,
      'deviceScaleFactor': 4,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Microsoft Lumia 950 landscape',
    'userAgent': 'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263',
    'viewport': {
      'width': 640,
      'height': 360,
      'deviceScaleFactor': 4,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'Nexus 10',
    'userAgent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36',
    'viewport': {
      'width': 800,
      'height': 1280,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Nexus 10 landscape',
    'userAgent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36',
    'viewport': {
      'width': 1280,
      'height': 800,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'Nexus 4',
    'userAgent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
    'viewport': {
      'width': 384,
      'height': 640,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Nexus 4 landscape',
    'userAgent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
    'viewport': {
      'width': 640,
      'height': 384,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'Nexus 5',
    'userAgent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
    'viewport': {
      'width': 360,
      'height': 640,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Nexus 5 landscape',
    'userAgent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
    'viewport': {
      'width': 640,
      'height': 360,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'Nexus 5X',
    'userAgent': 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
    'viewport': {
      'width': 412,
      'height': 732,
      'deviceScaleFactor': 2.625,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Nexus 5X landscape',
    'userAgent': 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
    'viewport': {
      'width': 732,
      'height': 412,
      'deviceScaleFactor': 2.625,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'Nexus 6',
    'userAgent': 'Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6 Build/N6F26U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
    'viewport': {
      'width': 412,
      'height': 732,
      'deviceScaleFactor': 3.5,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Nexus 6 landscape',
    'userAgent': 'Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6 Build/N6F26U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
    'viewport': {
      'width': 732,
      'height': 412,
      'deviceScaleFactor': 3.5,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'Nexus 6P',
    'userAgent': 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 6P Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
    'viewport': {
      'width': 412,
      'height': 732,
      'deviceScaleFactor': 3.5,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Nexus 6P landscape',
    'userAgent': 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 6P Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
    'viewport': {
      'width': 732,
      'height': 412,
      'deviceScaleFactor': 3.5,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'Nexus 7',
    'userAgent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 7 Build/MOB30X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36',
    'viewport': {
      'width': 600,
      'height': 960,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Nexus 7 landscape',
    'userAgent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 7 Build/MOB30X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36',
    'viewport': {
      'width': 960,
      'height': 600,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'Nokia Lumia 520',
    'userAgent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)',
    'viewport': {
      'width': 320,
      'height': 533,
      'deviceScaleFactor': 1.5,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Nokia Lumia 520 landscape',
    'userAgent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)',
    'viewport': {
      'width': 533,
      'height': 320,
      'deviceScaleFactor': 1.5,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'Nokia N9',
    'userAgent': 'Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13',
    'viewport': {
      'width': 480,
      'height': 854,
      'deviceScaleFactor': 1,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Nokia N9 landscape',
    'userAgent': 'Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13',
    'viewport': {
      'width': 854,
      'height': 480,
      'deviceScaleFactor': 1,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'Pixel 2',
    'userAgent': 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
    'viewport': {
      'width': 411,
      'height': 731,
      'deviceScaleFactor': 2.625,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Pixel 2 landscape',
    'userAgent': 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
    'viewport': {
      'width': 731,
      'height': 411,
      'deviceScaleFactor': 2.625,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  },
  {
    'name': 'Pixel 2 XL',
    'userAgent': 'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
    'viewport': {
      'width': 411,
      'height': 823,
      'deviceScaleFactor': 3.5,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  },
  {
    'name': 'Pixel 2 XL landscape',
    'userAgent': 'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
    'viewport': {
      'width': 823,
      'height': 411,
      'deviceScaleFactor': 3.5,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': true
    }
  }
];
for (const device of exports_puppeteer_puppeteer_lib_DeviceDescriptors)
  exports_puppeteer_puppeteer_lib_DeviceDescriptors[device.name] = device;


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
  constructor(client, type, message, defaultValue = '') {
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
    assert(!this._handled, 'Cannot accept dialog which is already handled!');
    this._handled = true;
    await this._client.send('Page.handleJavaScriptDialog', {
      accept: true,
      promptText: promptText
    });
  }

  async dismiss() {
    assert(!this._handled, 'Cannot dismiss dialog which is already handled!');
    this._handled = true;
    await this._client.send('Page.handleJavaScriptDialog', {
      accept: false
    });
  }
}

Dialog.Type = {
  Alert: 'alert',
  BeforeUnload: 'beforeunload',
  Confirm: 'confirm',
  Prompt: 'prompt'
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
    const screenOrientation = viewport.isLandscape ? { angle: 90, type: 'landscapePrimary' } : { angle: 0, type: 'portraitPrimary' };
    const hasTouch = viewport.hasTouch || false;

    await Promise.all([
      this._client.send('Emulation.setDeviceMetricsOverride', { mobile, width, height, deviceScaleFactor, screenOrientation }),
      this._client.send('Emulation.setTouchEmulationEnabled', {
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
    Close: 'close',
    Console: 'console',
    Dialog: 'dialog',
    DOMContentLoaded: 'domcontentloaded',
    Error: 'error',
    // Can't use just 'error' due to node.js special treatment of error events.
    // @see https://nodejs.org/api/events.html#events_error_events
    PageError: 'pageerror',
    Request: 'request',
    Response: 'response',
    RequestFailed: 'requestfailed',
    RequestFinished: 'requestfinished',
    FrameAttached: 'frameattached',
    FrameDetached: 'framedetached',
    FrameNavigated: 'framenavigated',
    Load: 'load',
    Metrics: 'metrics',
    Popup: 'popup',
    WorkerCreated: 'workercreated',
    WorkerDestroyed: 'workerdestroyed',
  },

  Browser: {
    TargetCreated: 'targetcreated',
    TargetDestroyed: 'targetdestroyed',
    TargetChanged: 'targetchanged',
    Disconnected: 'disconnected'
  },

  BrowserContext: {
    TargetCreated: 'targetcreated',
    TargetDestroyed: 'targetdestroyed',
    TargetChanged: 'targetchanged',
  },

  NetworkManager: {
    Request: Symbol('Events.NetworkManager.Request'),
    Response: Symbol('Events.NetworkManager.Response'),
    RequestFailed: Symbol('Events.NetworkManager.RequestFailed'),
    RequestFinished: Symbol('Events.NetworkManager.RequestFinished'),
  },

  FrameManager: {
    FrameAttached: Symbol('Events.FrameManager.FrameAttached'),
    FrameNavigated: Symbol('Events.FrameManager.FrameNavigated'),
    FrameDetached: Symbol('Events.FrameManager.FrameDetached'),
    LifecycleEvent: Symbol('Events.FrameManager.LifecycleEvent'),
    FrameNavigatedWithinDocument: Symbol('Events.FrameManager.FrameNavigatedWithinDocument'),
    ExecutionContextCreated: Symbol('Events.FrameManager.ExecutionContextCreated'),
    ExecutionContextDestroyed: Symbol('Events.FrameManager.ExecutionContextDestroyed'),
  },

  Connection: {
    Disconnected: Symbol('Events.Connection.Disconnected'),
  },

  CDPSession: {
    Disconnected: Symbol('Events.CDPSession.Disconnected'),
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

const EVALUATION_SCRIPT_URL = '__puppeteer_evaluation_script__';
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
      const expressionWithSourceUrl = SOURCE_URL_REGEX.test(expression) ? expression : expression + '\n' + suffix;
      const {exceptionDetails, result: remoteObject} = await this._client.send('Runtime.evaluate', {
        expression: expressionWithSourceUrl,
        contextId,
        returnByValue,
        awaitPromise: true,
        userGesture: true
      }).catch(rewriteError);
      if (exceptionDetails)
        throw new Error('Evaluation failed: ' + helper.getExceptionMessage(exceptionDetails));
      return returnByValue ? helper.valueFromRemoteObject(remoteObject) : createJSHandle(this, remoteObject);
    }

    if (typeof pageFunction !== 'function')
      throw new Error(`Expected to get |string| or |function| as the first argument, but got "${pageFunction}" instead.`);

    let functionText = pageFunction.toString();
    // hack-coverage - un-instrument
    functionText = functionText.replace((/\b__cov_.*?\+\+/g), "0");
    try {
      new Function('(' + functionText + ')');
    } catch (e1) {
      // This means we might have a function shorthand. Try another
      // time prefixing 'function '.
      if (functionText.startsWith('async '))
        functionText = 'async function ' + functionText.substring('async '.length);
      else
        functionText = 'function ' + functionText;
      try {
        new Function('(' + functionText  + ')');
      } catch (e2) {
        // We tried hard to serialize, but there's a weird beast here.
        throw new Error('Passed function is not well-serializable!');
      }
    }
    let callFunctionOnPromise;
    try {
      callFunctionOnPromise = this._client.send('Runtime.callFunctionOn', {
        functionDeclaration: functionText + '\n' + suffix + '\n',
        executionContextId: this._contextId,
        arguments: args.map(convertArgument.bind(this)),
        returnByValue,
        awaitPromise: true,
        userGesture: true
      });
    } catch (err) {
      if (err instanceof TypeError && err.message.startsWith('Converting circular structure to JSON'))
        err.message += ' Are you passing a nested JSHandle?';
      throw err;
    }
    const { exceptionDetails, result: remoteObject } = await callFunctionOnPromise.catch(rewriteError);
    if (exceptionDetails)
      throw new Error('Evaluation failed: ' + helper.getExceptionMessage(exceptionDetails));
    return returnByValue ? helper.valueFromRemoteObject(remoteObject) : createJSHandle(this, remoteObject);

    /**
     * @param {*} arg
     * @return {*}
     * @this {ExecutionContext}
     */
    function convertArgument(arg) {
      if (typeof arg === 'bigint') // eslint-disable-line valid-typeof
        return { unserializableValue: `${arg.toString()}n` };
      if (Object.is(arg, -0))
        return { unserializableValue: '-0' };
      if (Object.is(arg, Infinity))
        return { unserializableValue: 'Infinity' };
      if (Object.is(arg, -Infinity))
        return { unserializableValue: '-Infinity' };
      if (Object.is(arg, NaN))
        return { unserializableValue: 'NaN' };
      const objectHandle = arg && (arg instanceof JSHandle) ? arg : null;
      if (objectHandle) {
        if (objectHandle._context !== this)
          throw new Error('JSHandles can be evaluated only in the context they were created!');
        if (objectHandle._disposed)
          throw new Error('JSHandle is disposed!');
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
      if (error.message.includes('Object reference chain is too long'))
        return {result: {type: 'undefined'}};
      if (error.message.includes('Object couldn\'t be returned by value'))
        return {result: {type: 'undefined'}};

      if (error.message.endsWith('Cannot find context with specified id'))
        throw new Error('Execution context was destroyed, most likely because of a navigation.');
      throw error;
    }
  }

  /**
   * @param {!JSHandle} prototypeHandle
   * @return {!Promise<!JSHandle>}
   */
  async queryObjects(prototypeHandle) {
    assert(!prototypeHandle._disposed, 'Prototype JSHandle is disposed!');
    assert(prototypeHandle._remoteObject.objectId, 'Prototype JSHandle must not be referencing primitive value');
    const response = await this._client.send('Runtime.queryObjects', {
      prototypeObjectId: prototypeHandle._remoteObject.objectId
    });
    return createJSHandle(this, response.objects);
  }

  /**
   * @param {Puppeteer.ElementHandle} elementHandle
   * @return {Promise<Puppeteer.ElementHandle>}
   */
  async _adoptElementHandle(elementHandle) {
    assert(elementHandle.executionContext() !== this, 'Cannot adopt handle that already belongs to this execution context');
    assert(this._world, 'Cannot adopt handle without DOMWorld');
    const nodeInfo = await this._client.send('DOM.describeNode', {
      objectId: elementHandle._remoteObject.objectId,
    });
    const {object} = await this._client.send('DOM.resolveNode', {
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

// const EventEmitter = require('events');
// const {helper, assert, debugError} = exports_puppeteer_puppeteer_lib_helper;
// const {Events} = exports_puppeteer_puppeteer_lib_Events;
// const {ExecutionContext, EVALUATION_SCRIPT_URL} = exports_puppeteer_puppeteer_lib_ExecutionContext;
// const {LifecycleWatcher} = exports_puppeteer_puppeteer_lib_LifecycleWatcher;
// const {DOMWorld} = exports_puppeteer_puppeteer_lib_DOMWorld;
// const {NetworkManager} = exports_puppeteer_puppeteer_lib_NetworkManager;

const UTILITY_WORLD_NAME = '__puppeteer_utility_world__';

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

    this._client.on('Page.frameAttached', event => this._onFrameAttached(event.frameId, event.parentFrameId));
    this._client.on('Page.frameNavigated', event => this._onFrameNavigated(event.frame));
    this._client.on('Page.navigatedWithinDocument', event => this._onFrameNavigatedWithinDocument(event.frameId, event.url));
    this._client.on('Page.frameDetached', event => this._onFrameDetached(event.frameId));
    this._client.on('Page.frameStoppedLoading', event => this._onFrameStoppedLoading(event.frameId));
    this._client.on('Runtime.executionContextCreated', event => this._onExecutionContextCreated(event.context));
    this._client.on('Runtime.executionContextDestroyed', event => this._onExecutionContextDestroyed(event.executionContextId));
    this._client.on('Runtime.executionContextsCleared', event => this._onExecutionContextsCleared());
    this._client.on('Page.lifecycleEvent', event => this._onLifecycleEvent(event));
  }

  async initialize() {
    const [,{frameTree}] = await Promise.all([
      this._client.send('Page.enable'),
      this._client.send('Page.getFrameTree'),
    ]);
    this._handleFrameTree(frameTree);
    await Promise.all([
      this._client.send('Page.setLifecycleEventsEnabled', { enabled: true }),
      this._client.send('Runtime.enable', {}).then(() => this._ensureIsolatedWorld(UTILITY_WORLD_NAME)),
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
      referer = this._networkManager.extraHTTPHeaders()['referer'],
      waitUntil = ['load'],
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
        const response = await client.send('Page.navigate', {url, referrer, frameId});
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
      waitUntil = ['load'],
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
    assert(isMainFrame || frame, 'We either navigate top level or have old version of the navigated frame');

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
    await this._client.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `//# sourceURL=${EVALUATION_SCRIPT_URL}`,
      worldName: name,
    }),
    await Promise.all(this.frames().map(frame => this._client.send('Page.createIsolatedWorld', {
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
      if (contextPayload.auxData && !!contextPayload.auxData['isDefault']) {
        world = frame._mainWorld;
      } else if (contextPayload.name === UTILITY_WORLD_NAME && !frame._secondaryWorld._hasContext()) {
        // In case of multiple sessions to the same target, there's a race between
        // connections so we might end up creating multiple isolated worlds.
        // We can use either.
        world = frame._secondaryWorld;
      }
    }
    if (contextPayload.auxData && contextPayload.auxData['type'] === 'isolated')
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
    assert(context, 'INTERNAL ERROR: missing context with id = ' + contextId);
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
    this._url = '';
    this._id = frameId;
    this._detached = false;

    this._loaderId = '';
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
    return this._name || '';
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
    const xPathPattern = '//';

    if (helper.isString(selectorOrFunctionOrTimeout)) {
      const string = /** @type {string} */ (selectorOrFunctionOrTimeout);
      if (string.startsWith(xPathPattern))
        return this.waitForXPath(string, options);
      return this.waitForSelector(string, options);
    }
    if (helper.isNumber(selectorOrFunctionOrTimeout))
      return new Promise(fulfill => setTimeout(fulfill, /** @type {number} */ (selectorOrFunctionOrTimeout)));
    if (typeof selectorOrFunctionOrTimeout === 'function')
      return this.waitForFunction(selectorOrFunctionOrTimeout, options, ...args);
    return Promise.reject(new Error('Unsupported target type: ' + (typeof selectorOrFunctionOrTimeout)));
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
    if (name === 'init') {
      this._loaderId = loaderId;
      this._lifecycleEvents.clear();
    }
    this._lifecycleEvents.add(name);
  }

  _onLoadingStopped() {
    this._lifecycleEvents.add('DOMContentLoaded');
    this._lifecycleEvents.add('load');
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
  assert(options['networkIdleTimeout'] === undefined, 'ERROR: networkIdleTimeout option is no longer supported.');
  assert(options['networkIdleInflight'] === undefined, 'ERROR: networkIdleInflight option is no longer supported.');
  assert(options.waitUntil !== 'networkidle', 'ERROR: "networkidle" option is no longer supported. Use "networkidle2" instead');
}

exports_puppeteer_puppeteer_lib_FrameManager = {FrameManager, Frame};


/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/Input.js
*/
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// const {assert} = exports_puppeteer_puppeteer_lib_helper;
// const keyDefinitions = exports_puppeteer_puppeteer_lib_USKeyboardLayout;

/**
 * @typedef {Object} KeyDescription
 * @property {number} keyCode
 * @property {string} key
 * @property {string} text
 * @property {string} code
 * @property {number} location
 */

class Keyboard {
  /**
   * @param {!Puppeteer.CDPSession} client
   */
  constructor(client) {
    this._client = client;
    this._modifiers = 0;
    this._pressedKeys = new Set();
  }

  /**
   * @param {string} key
   * @param {{text?: string}=} options
   */
  async down(key, options = { text: undefined }) {
    const description = this._keyDescriptionForString(key);

    const autoRepeat = this._pressedKeys.has(description.code);
    this._pressedKeys.add(description.code);
    this._modifiers |= this._modifierBit(description.key);

    const text = options.text === undefined ? description.text : options.text;
    await this._client.send('Input.dispatchKeyEvent', {
      type: text ? 'keyDown' : 'rawKeyDown',
      modifiers: this._modifiers,
      windowsVirtualKeyCode: description.keyCode,
      code: description.code,
      key: description.key,
      text: text,
      unmodifiedText: text,
      autoRepeat,
      location: description.location,
      isKeypad: description.location === 3
    });
  }

  /**
   * @param {string} key
   * @return {number}
   */
  _modifierBit(key) {
    if (key === 'Alt')
      return 1;
    if (key === 'Control')
      return 2;
    if (key === 'Meta')
      return 4;
    if (key === 'Shift')
      return 8;
    return 0;
  }

  /**
   * @param {string} keyString
   * @return {KeyDescription}
   */
  _keyDescriptionForString(keyString) {
    const shift = this._modifiers & 8;
    const description = {
      key: '',
      keyCode: 0,
      code: '',
      text: '',
      location: 0
    };

    const definition = keyDefinitions[keyString];
    assert(definition, `Unknown key: "${keyString}"`);

    if (definition.key)
      description.key = definition.key;
    if (shift && definition.shiftKey)
      description.key = definition.shiftKey;

    if (definition.keyCode)
      description.keyCode = definition.keyCode;
    if (shift && definition.shiftKeyCode)
      description.keyCode = definition.shiftKeyCode;

    if (definition.code)
      description.code = definition.code;

    if (definition.location)
      description.location = definition.location;

    if (description.key.length === 1)
      description.text = description.key;

    if (definition.text)
      description.text = definition.text;
    if (shift && definition.shiftText)
      description.text = definition.shiftText;

    // if any modifiers besides shift are pressed, no text should be sent
    if (this._modifiers & ~8)
      description.text = '';

    return description;
  }

  /**
   * @param {string} key
   */
  async up(key) {
    const description = this._keyDescriptionForString(key);

    this._modifiers &= ~this._modifierBit(description.key);
    this._pressedKeys.delete(description.code);
    await this._client.send('Input.dispatchKeyEvent', {
      type: 'keyUp',
      modifiers: this._modifiers,
      key: description.key,
      windowsVirtualKeyCode: description.keyCode,
      code: description.code,
      location: description.location
    });
  }

  /**
   * @param {string} char
   */
  async sendCharacter(char) {
    await this._client.send('Input.insertText', {text: char});
  }

  /**
   * @param {string} text
   * @param {{delay: (number|undefined)}=} options
   */
  async type(text, options) {
    let delay = 0;
    if (options && options.delay)
      delay = options.delay;
    for (const char of text) {
      if (keyDefinitions[char])
        await this.press(char, {delay});
      else
        await this.sendCharacter(char);
      if (delay)
        await new Promise(f => setTimeout(f, delay));
    }
  }

  /**
   * @param {string} key
   * @param {!{delay?: number, text?: string}=} options
   */
  async press(key, options = {}) {
    const {delay = null} = options;
    await this.down(key, options);
    if (delay !== null)
      await new Promise(f => setTimeout(f, options.delay));
    await this.up(key);
  }
}

class Mouse {
  /**
   * @param {Puppeteer.CDPSession} client
   * @param {!Keyboard} keyboard
   */
  constructor(client, keyboard) {
    this._client = client;
    this._keyboard = keyboard;
    this._x = 0;
    this._y = 0;
    /** @type {'none'|'left'|'right'|'middle'} */
    this._button = 'none';
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {!{steps?: number}=} options
   */
  async move(x, y, options = {}) {
    const {steps = 1} = options;
    const fromX = this._x, fromY = this._y;
    this._x = x;
    this._y = y;
    for (let i = 1; i <= steps; i++) {
      await this._client.send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        button: this._button,
        x: fromX + (this._x - fromX) * (i / steps),
        y: fromY + (this._y - fromY) * (i / steps),
        modifiers: this._keyboard._modifiers
      });
    }
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {!{delay?: number, button?: "left"|"right"|"middle", clickCount?: number}=} options
   */
  async click(x, y, options = {}) {
    const {delay = null} = options;
    if (delay !== null) {
      await Promise.all([
        this.move(x, y),
        this.down(options),
      ]);
      await new Promise(f => setTimeout(f, delay));
      await this.up(options);
    } else {
      await Promise.all([
        this.move(x, y),
        this.down(options),
        this.up(options),
      ]);
    }
  }

  /**
   * @param {!{button?: "left"|"right"|"middle", clickCount?: number}=} options
   */
  async down(options = {}) {
    const {button = 'left', clickCount = 1} = options;
    this._button = button;
    await this._client.send('Input.dispatchMouseEvent', {
      type: 'mousePressed',
      button,
      x: this._x,
      y: this._y,
      modifiers: this._keyboard._modifiers,
      clickCount
    });
  }

  /**
   * @param {!{button?: "left"|"right"|"middle", clickCount?: number}=} options
   */
  async up(options = {}) {
    const {button = 'left', clickCount = 1} = options;
    this._button = 'none';
    await this._client.send('Input.dispatchMouseEvent', {
      type: 'mouseReleased',
      button,
      x: this._x,
      y: this._y,
      modifiers: this._keyboard._modifiers,
      clickCount
    });
  }
}

class Touchscreen {
  /**
   * @param {Puppeteer.CDPSession} client
   * @param {Keyboard} keyboard
   */
  constructor(client, keyboard) {
    this._client = client;
    this._keyboard = keyboard;
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  async tap(x, y) {
    // Touches appear to be lost during the first frame after navigation.
    // This waits a frame before sending the tap.
    // @see https://crbug.com/613219
    await this._client.send('Runtime.evaluate', {
      expression: 'new Promise(x => requestAnimationFrame(() => requestAnimationFrame(x)))',
      awaitPromise: true
    });

    const touchPoints = [{x: Math.round(x), y: Math.round(y)}];
    await this._client.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints,
      modifiers: this._keyboard._modifiers
    });
    await this._client.send('Input.dispatchTouchEvent', {
      type: 'touchEnd',
      touchPoints: [],
      modifiers: this._keyboard._modifiers
    });
  }
}

exports_puppeteer_puppeteer_lib_Input = { Keyboard, Mouse, Touchscreen};


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
// const path = require('path');

function createJSHandle(context, remoteObject) {
  const frame = context.frame();
  if (remoteObject.subtype === 'node' && frame) {
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
    const response = await this._client.send('Runtime.getProperties', {
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
      const response = await this._client.send('Runtime.callFunctionOn', {
        functionDeclaration: 'function() { return this; }',
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
      return 'JSHandle@' + type;
    }
    return 'JSHandle:' + helper.valueFromRemoteObject(this._remoteObject);
  }
}

class ElementHandle extends JSHandle {
  /**
   * @param {!Puppeteer.ExecutionContext} context
   * @param {!Puppeteer.CDPSession} client
   * @param {!Protocol.Runtime.RemoteObject} remoteObject
   * @param {!Puppeteer.Page} page
   * @param {!Puppeteer.FrameManager} frameManager
   */
  constructor(context, client, remoteObject, page, frameManager) {
    super(context, client, remoteObject);
    this._client = client;
    this._remoteObject = remoteObject;
    this._page = page;
    this._frameManager = frameManager;
    this._disposed = false;
  }

  /**
   * @override
   * @return {?ElementHandle}
   */
  asElement() {
    return this;
  }

  /**
   * @return {!Promise<?Puppeteer.Frame>}
   */
  async contentFrame() {
    const nodeInfo = await this._client.send('DOM.describeNode', {
      objectId: this._remoteObject.objectId
    });
    if (typeof nodeInfo.node.frameId !== 'string')
      return null;
    return this._frameManager.frame(nodeInfo.node.frameId);
  }

  async _scrollIntoViewIfNeeded() {
    const error = await this.executionContext().evaluate(async(element, pageJavascriptEnabled) => {
      if (!element.isConnected)
        return 'Node is detached from document';
      if (element.nodeType !== Node.ELEMENT_NODE)
        return 'Node is not of type HTMLElement';
      // force-scroll if page's javascript is disabled.
      if (!pageJavascriptEnabled) {
        element.scrollIntoView({block: 'center', inline: 'center', behavior: 'instant'});
        return false;
      }
      const visibleRatio = await new Promise(resolve => {
        const observer = new IntersectionObserver(entries => {
          resolve(entries[0].intersectionRatio);
          observer.disconnect();
        });
        observer.observe(element);
      });
      if (visibleRatio !== 1.0)
        element.scrollIntoView({block: 'center', inline: 'center', behavior: 'instant'});
      return false;
    }, this, this._page._javascriptEnabled);
    if (error)
      throw new Error(error);
  }

  /**
   * @return {!Promise<!{x: number, y: number}>}
   */
  async _clickablePoint() {
    const [result, layoutMetrics] = await Promise.all([
      this._client.send('DOM.getContentQuads', {
        objectId: this._remoteObject.objectId
      }).catch(debugError),
      this._client.send('Page.getLayoutMetrics'),
    ]);
    if (!result || !result.quads.length)
      throw new Error('Node is either not visible or not an HTMLElement');
    // Filter out quads that have too small area to click into.
    const {clientWidth, clientHeight} = layoutMetrics.layoutViewport;
    const quads = result.quads.map(quad => this._fromProtocolQuad(quad)).map(quad => this._intersectQuadWithViewport(quad, clientWidth, clientHeight)).filter(quad => computeQuadArea(quad) > 1);
    if (!quads.length)
      throw new Error('Node is either not visible or not an HTMLElement');
    // Return the middle point of the first quad.
    const quad = quads[0];
    let x = 0;
    let y = 0;
    for (const point of quad) {
      x += point.x;
      y += point.y;
    }
    return {
      x: x / 4,
      y: y / 4
    };
  }

  /**
   * @return {!Promise<void|Protocol.DOM.getBoxModelReturnValue>}
   */
  _getBoxModel() {
    return this._client.send('DOM.getBoxModel', {
      objectId: this._remoteObject.objectId
    }).catch(error => debugError(error));
  }

  /**
   * @param {!Array<number>} quad
   * @return {!Array<{x: number, y: number}>}
   */
  _fromProtocolQuad(quad) {
    return [
      {x: quad[0], y: quad[1]},
      {x: quad[2], y: quad[3]},
      {x: quad[4], y: quad[5]},
      {x: quad[6], y: quad[7]}
    ];
  }

  /**
   * @param {!Array<{x: number, y: number}>} quad
   * @param {number} width
   * @param {number} height
   * @return {!Array<{x: number, y: number}>}
   */
  _intersectQuadWithViewport(quad, width, height) {
    return quad.map(point => ({
      x: Math.min(Math.max(point.x, 0), width),
      y: Math.min(Math.max(point.y, 0), height),
    }));
  }

  async hover() {
    await this._scrollIntoViewIfNeeded();
    const {x, y} = await this._clickablePoint();
    await this._page.mouse.move(x, y);
  }

  /**
   * @param {!{delay?: number, button?: "left"|"right"|"middle", clickCount?: number}=} options
   */
  async click(options) {
    await this._scrollIntoViewIfNeeded();
    const {x, y} = await this._clickablePoint();
    await this._page.mouse.click(x, y, options);
  }

  /**
   * @param {!Array<string>} filePaths
   */
  async uploadFile(...filePaths) {
    const files = filePaths.map(filePath => path.resolve(filePath));
    const objectId = this._remoteObject.objectId;
    await this._client.send('DOM.setFileInputFiles', { objectId, files });
  }

  async tap() {
    await this._scrollIntoViewIfNeeded();
    const {x, y} = await this._clickablePoint();
    await this._page.touchscreen.tap(x, y);
  }

  async focus() {
    await this.executionContext().evaluate(element => element.focus(), this);
  }

  /**
   * @param {string} text
   * @param {{delay: (number|undefined)}=} options
   */
  async type(text, options) {
    await this.focus();
    await this._page.keyboard.type(text, options);
  }

  /**
   * @param {string} key
   * @param {!{delay?: number, text?: string}=} options
   */
  async press(key, options) {
    await this.focus();
    await this._page.keyboard.press(key, options);
  }

  /**
   * @return {!Promise<?{x: number, y: number, width: number, height: number}>}
   */
  async boundingBox() {
    const result = await this._getBoxModel();

    if (!result)
      return null;

    const quad = result.model.border;
    const x = Math.min(quad[0], quad[2], quad[4], quad[6]);
    const y = Math.min(quad[1], quad[3], quad[5], quad[7]);
    const width = Math.max(quad[0], quad[2], quad[4], quad[6]) - x;
    const height = Math.max(quad[1], quad[3], quad[5], quad[7]) - y;

    return {x, y, width, height};
  }

  /**
   * @return {!Promise<?BoxModel>}
   */
  async boxModel() {
    const result = await this._getBoxModel();

    if (!result)
      return null;

    const {content, padding, border, margin, width, height} = result.model;
    return {
      content: this._fromProtocolQuad(content),
      padding: this._fromProtocolQuad(padding),
      border: this._fromProtocolQuad(border),
      margin: this._fromProtocolQuad(margin),
      width,
      height
    };
  }

  /**
   *
   * @param {!Object=} options
   * @returns {!Promise<string|!Buffer>}
   */
  async screenshot(options = {}) {
    let needsViewportReset = false;

    let boundingBox = await this.boundingBox();
    assert(boundingBox, 'Node is either not visible or not an HTMLElement');

    const viewport = this._page.viewport();

    if (viewport && (boundingBox.width > viewport.width || boundingBox.height > viewport.height)) {
      const newViewport = {
        width: Math.max(viewport.width, Math.ceil(boundingBox.width)),
        height: Math.max(viewport.height, Math.ceil(boundingBox.height)),
      };
      await this._page.setViewport(Object.assign({}, viewport, newViewport));

      needsViewportReset = true;
    }

    await this._scrollIntoViewIfNeeded();

    boundingBox = await this.boundingBox();
    assert(boundingBox, 'Node is either not visible or not an HTMLElement');
    assert(boundingBox.width !== 0, 'Node has 0 width.');
    assert(boundingBox.height !== 0, 'Node has 0 height.');

    const { layoutViewport: { pageX, pageY } } = await this._client.send('Page.getLayoutMetrics');

    const clip = Object.assign({}, boundingBox);
    clip.x += pageX;
    clip.y += pageY;

    const imageData = await this._page.screenshot(Object.assign({}, {
      clip
    }, options));

    if (needsViewportReset)
      await this._page.setViewport(viewport);

    return imageData;
  }

  /**
   * @param {string} selector
   * @return {!Promise<?ElementHandle>}
   */
  async $(selector) {
    const handle = await this.executionContext().evaluateHandle(
        (element, selector) => element.querySelector(selector),
        this, selector
    );
    const element = handle.asElement();
    if (element)
      return element;
    await handle.dispose();
    return null;
  }

  /**
   * @param {string} selector
   * @return {!Promise<!Array<!ElementHandle>>}
   */
  async $$(selector) {
    const arrayHandle = await this.executionContext().evaluateHandle(
        (element, selector) => element.querySelectorAll(selector),
        this, selector
    );
    const properties = await arrayHandle.getProperties();
    await arrayHandle.dispose();
    const result = [];
    for (const property of properties.values()) {
      const elementHandle = property.asElement();
      if (elementHandle)
        result.push(elementHandle);
    }
    return result;
  }

  /**
   * @param {string} selector
   * @param {Function|String} pageFunction
   * @param {!Array<*>} args
   * @return {!Promise<(!Object|undefined)>}
   */
  async $eval(selector, pageFunction, ...args) {
    const elementHandle = await this.$(selector);
    if (!elementHandle)
      throw new Error(`Error: failed to find element matching selector "${selector}"`);
    const result = await this.executionContext().evaluate(pageFunction, elementHandle, ...args);
    await elementHandle.dispose();
    return result;
  }

  /**
   * @param {string} selector
   * @param {Function|String} pageFunction
   * @param {!Array<*>} args
   * @return {!Promise<(!Object|undefined)>}
   */
  async $$eval(selector, pageFunction, ...args) {
    const arrayHandle = await this.executionContext().evaluateHandle(
        (element, selector) => Array.from(element.querySelectorAll(selector)),
        this, selector
    );

    const result = await this.executionContext().evaluate(pageFunction, arrayHandle, ...args);
    await arrayHandle.dispose();
    return result;
  }

  /**
   * @param {string} expression
   * @return {!Promise<!Array<!ElementHandle>>}
   */
  async $x(expression) {
    const arrayHandle = await this.executionContext().evaluateHandle(
        (element, expression) => {
          const document = element.ownerDocument || element;
          const iterator = document.evaluate(expression, element, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
          const array = [];
          let item;
          while ((item = iterator.iterateNext()))
            array.push(item);
          return array;
        },
        this, expression
    );
    const properties = await arrayHandle.getProperties();
    await arrayHandle.dispose();
    const result = [];
    for (const property of properties.values()) {
      const elementHandle = property.asElement();
      if (elementHandle)
        result.push(elementHandle);
    }
    return result;
  }

  /**
   * @returns {!Promise<boolean>}
   */
  isIntersectingViewport() {
    return this.executionContext().evaluate(async element => {
      const visibleRatio = await new Promise(resolve => {
        const observer = new IntersectionObserver(entries => {
          resolve(entries[0].intersectionRatio);
          observer.disconnect();
        });
        observer.observe(element);
      });
      return visibleRatio > 0;
    }, this);
  }
}

function computeQuadArea(quad) {
  // Compute sum of all directed areas of adjacent triangles
  // https://en.wikipedia.org/wiki/Polygon#Simple_polygons
  let area = 0;
  for (let i = 0; i < quad.length; ++i) {
    const p1 = quad[i];
    const p2 = quad[(i + 1) % quad.length];
    area += (p1.x * p2.y - p2.x * p1.y) / 2;
  }
  return Math.abs(area);
}

/**
 * @typedef {Object} BoxModel
 * @property {!Array<!{x: number, y: number}>} content
 * @property {!Array<!{x: number, y: number}>} padding
 * @property {!Array<!{x: number, y: number}>} border
 * @property {!Array<!{x: number, y: number}>} margin
 * @property {number} width
 * @property {number} height
 */

exports_puppeteer_puppeteer_lib_JSHandle = {createJSHandle, JSHandle, ElementHandle};


/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/Launcher.js
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
// const os = require('os');
// const path = require('path');
// const http = require('http');
// const https = require('https');
// const URL = require('url');
// const removeFolder = require('rimraf');
// const childProcess = require('child_process');
// const BrowserFetcher = exports_puppeteer_puppeteer_lib_BrowserFetcher;
// const {Connection} = exports_puppeteer_puppeteer_lib_Connection;
// const {Browser} = exports_puppeteer_puppeteer_lib_Browser;
// const readline = require('readline');
// const fs = require('fs');
// const {helper, assert, debugError} = exports_puppeteer_puppeteer_lib_helper;
// const {TimeoutError} = exports_puppeteer_puppeteer_lib_Errors;
// const WebSocketTransport = exports_puppeteer_puppeteer_lib_WebSocketTransport;
// const PipeTransport = exports_puppeteer_puppeteer_lib_PipeTransport;

const mkdtempAsync = helper.promisify(fs.mkdtemp);
const removeFolderAsync = helper.promisify(removeFolder);

const CHROME_PROFILE_PATH = path.join(os.tmpdir(), 'puppeteer_dev_profile-');

const DEFAULT_ARGS = [
  '--disable-background-networking',
  '--enable-features=NetworkService,NetworkServiceInProcess',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-extensions-with-background-pages',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-extensions',
  // TODO: Support OOOPIF. @see https://github.com/GoogleChrome/puppeteer/issues/2548
  // BlinkGenPropertyTrees disabled due to crbug.com/937609
  '--disable-features=site-per-process,TranslateUI,BlinkGenPropertyTrees',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-popup-blocking',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-sync',
  '--force-color-profile=srgb',
  '--metrics-recording-only',
  '--no-first-run',
  '--enable-automation',
  '--password-store=basic',
  '--use-mock-keychain',
];

class Launcher {
  /**
   * @param {string} projectRoot
   * @param {string} preferredRevision
   * @param {boolean} isPuppeteerCore
   */
  constructor(projectRoot, preferredRevision, isPuppeteerCore) {
    this._projectRoot = projectRoot;
    this._preferredRevision = preferredRevision;
    this._isPuppeteerCore = isPuppeteerCore;
  }

  /**
   * @param {!(Launcher.LaunchOptions & Launcher.ChromeArgOptions & Launcher.BrowserOptions)=} options
   * @return {!Promise<!Browser>}
   */
  async launch(options = {}) {
    const {
      ignoreDefaultArgs = false,
      args = [],
      dumpio = false,
      executablePath = null,
      pipe = false,
      env = process.env,
      handleSIGINT = true,
      handleSIGTERM = true,
      handleSIGHUP = true,
      ignoreHTTPSErrors = false,
      defaultViewport = {width: 800, height: 600},
      slowMo = 0,
      timeout = 30000
    } = options;

    const chromeArguments = [];
    if (!ignoreDefaultArgs)
      chromeArguments.push(...this.defaultArgs(options));
    else if (Array.isArray(ignoreDefaultArgs))
      chromeArguments.push(...this.defaultArgs(options).filter(arg => ignoreDefaultArgs.indexOf(arg) === -1));
    else
      chromeArguments.push(...args);

    let temporaryUserDataDir = null;

    if (!chromeArguments.some(argument => argument.startsWith('--remote-debugging-')))
      chromeArguments.push(pipe ? '--remote-debugging-pipe' : '--remote-debugging-port=0');
    if (!chromeArguments.some(arg => arg.startsWith('--user-data-dir'))) {
      temporaryUserDataDir = await mkdtempAsync(CHROME_PROFILE_PATH);
      chromeArguments.push(`--user-data-dir=${temporaryUserDataDir}`);
    }

    let chromeExecutable = executablePath;
    if (!executablePath) {
      const {missingText, executablePath} = this._resolveExecutablePath();
      if (missingText)
        throw new Error(missingText);
      chromeExecutable = executablePath;
    }

    const usePipe = chromeArguments.includes('--remote-debugging-pipe');
    /** @type {!Array<"ignore"|"pipe">} */
    let stdio = ['pipe', 'pipe', 'pipe'];
    if (usePipe) {
      if (dumpio)
        stdio = ['ignore', 'pipe', 'pipe', 'pipe', 'pipe'];
      else
        stdio = ['ignore', 'ignore', 'ignore', 'pipe', 'pipe'];
    }
    const chromeProcess = childProcess.spawn(
        chromeExecutable,
        chromeArguments,
        {
          // On non-windows platforms, `detached: false` makes child process a leader of a new
          // process group, making it possible to kill child process tree with `.kill(-pid)` command.
          // @see https://nodejs.org/api/child_process.html#child_process_options_detached
          detached: process.platform !== 'win32',
          env,
          stdio
        }
    );

    if (dumpio) {
      chromeProcess.stderr.pipe(process.stderr);
      chromeProcess.stdout.pipe(process.stdout);
    }

    let chromeClosed = false;
    const waitForChromeToClose = new Promise((fulfill, reject) => {
      chromeProcess.once('exit', () => {
        chromeClosed = true;
        // Cleanup as processes exit.
        if (temporaryUserDataDir) {
          removeFolderAsync(temporaryUserDataDir)
              .then(() => fulfill())
              .catch(err => console.error(err));
        } else {
          fulfill();
        }
      });
    });

    const listeners = [ helper.addEventListener(process, 'exit', killChrome) ];
    if (handleSIGINT)
      listeners.push(helper.addEventListener(process, 'SIGINT', () => { killChrome(); process.exit(130); }));
    if (handleSIGTERM)
      listeners.push(helper.addEventListener(process, 'SIGTERM', gracefullyCloseChrome));
    if (handleSIGHUP)
      listeners.push(helper.addEventListener(process, 'SIGHUP', gracefullyCloseChrome));
    /** @type {?Connection} */
    let connection = null;
    try {
      if (!usePipe) {
        const browserWSEndpoint = await waitForWSEndpoint(chromeProcess, timeout, this._preferredRevision);
        const transport = await WebSocketTransport.create(browserWSEndpoint);
        connection = new Connection(browserWSEndpoint, transport, slowMo);
      } else {
        const transport = new PipeTransport(/** @type {!NodeJS.WritableStream} */(chromeProcess.stdio[3]), /** @type {!NodeJS.ReadableStream} */ (chromeProcess.stdio[4]));
        connection = new Connection('', transport, slowMo);
      }
      const browser = await Browser.create(connection, [], ignoreHTTPSErrors, defaultViewport, chromeProcess, gracefullyCloseChrome);
      await browser.waitForTarget(t => t.type() === 'page');
      return browser;
    } catch (e) {
      killChrome();
      throw e;
    }

    /**
     * @return {Promise}
     */
    function gracefullyCloseChrome() {
      helper.removeEventListeners(listeners);
      if (temporaryUserDataDir) {
        killChrome();
      } else if (connection) {
        // Attempt to close chrome gracefully
        connection.send('Browser.close').catch(error => {
          debugError(error);
          killChrome();
        });
      }
      return waitForChromeToClose;
    }

    // This method has to be sync to be used as 'exit' event handler.
    function killChrome() {
      helper.removeEventListeners(listeners);
      if (chromeProcess.pid && !chromeProcess.killed && !chromeClosed) {
        // Force kill chrome.
        try {
          if (process.platform === 'win32')
            childProcess.execSync(`taskkill /pid ${chromeProcess.pid} /T /F`);
          else
            process.kill(-chromeProcess.pid, 'SIGKILL');
        } catch (e) {
          // the process might have already stopped
        }
      }
      // Attempt to remove temporary profile directory to avoid littering.
      try {
        removeFolder.sync(temporaryUserDataDir);
      } catch (e) { }
    }
  }

  /**
   * @param {!Launcher.ChromeArgOptions=} options
   * @return {!Array<string>}
   */
  defaultArgs(options = {}) {
    const {
      devtools = false,
      headless = !devtools,
      args = [],
      userDataDir = null
    } = options;
    const chromeArguments = [...DEFAULT_ARGS];
    if (userDataDir)
      chromeArguments.push(`--user-data-dir=${userDataDir}`);
    if (devtools)
      chromeArguments.push('--auto-open-devtools-for-tabs');
    if (headless) {
      chromeArguments.push(
          '--headless',
          '--hide-scrollbars',
          '--mute-audio'
      );
    }
    if (args.every(arg => arg.startsWith('-')))
      chromeArguments.push('about:blank');
    chromeArguments.push(...args);
    return chromeArguments;
  }

  /**
   * @return {string}
   */
  executablePath() {
    return this._resolveExecutablePath().executablePath;
  }

  /**
   * @param {!(Launcher.BrowserOptions & {browserWSEndpoint?: string, browserURL?: string, transport?: !Puppeteer.ConnectionTransport})} options
   * @return {!Promise<!Browser>}
   */
  async connect(options) {
    const {
      browserWSEndpoint,
      browserURL,
      ignoreHTTPSErrors = false,
      defaultViewport = {width: 800, height: 600},
      transport,
      slowMo = 0,
    } = options;

    assert(Number(!!browserWSEndpoint) + Number(!!browserURL) + Number(!!transport) === 1, 'Exactly one of browserWSEndpoint, browserURL or transport must be passed to puppeteer.connect');

    let connection = null;
    if (transport) {
      connection = new Connection('', transport, slowMo);
    } else if (browserWSEndpoint) {
      const connectionTransport = await WebSocketTransport.create(browserWSEndpoint);
      connection = new Connection(browserWSEndpoint, connectionTransport, slowMo);
    } else if (browserURL) {
      const connectionURL = await getWSEndpoint(browserURL);
      const connectionTransport = await WebSocketTransport.create(connectionURL);
      connection = new Connection(connectionURL, connectionTransport, slowMo);
    }

    const {browserContextIds} = await connection.send('Target.getBrowserContexts');
    return Browser.create(connection, browserContextIds, ignoreHTTPSErrors, defaultViewport, null, () => connection.send('Browser.close').catch(debugError));
  }

  /**
   * @return {{executablePath: string, missingText: ?string}}
   */
  _resolveExecutablePath() {
    // puppeteer-core doesn't take into account PUPPETEER_* env variables.
    if (!this._isPuppeteerCore) {
      const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || process.env.npm_config_puppeteer_executable_path || process.env.npm_package_config_puppeteer_executable_path;
      if (executablePath) {
        const missingText = !fs.existsSync(executablePath) ? 'Tried to use PUPPETEER_EXECUTABLE_PATH env variable to launch browser but did not find any executable at: ' + executablePath : null;
        return { executablePath, missingText };
      }
    }
    const browserFetcher = new BrowserFetcher(this._projectRoot);
    if (!this._isPuppeteerCore) {
      const revision = process.env['PUPPETEER_CHROMIUM_REVISION'];
      if (revision) {
        const revisionInfo = browserFetcher.revisionInfo(revision);
        const missingText = !revisionInfo.local ? 'Tried to use PUPPETEER_CHROMIUM_REVISION env variable to launch browser but did not find executable at: ' + revisionInfo.executablePath : null;
        return {executablePath: revisionInfo.executablePath, missingText};
      }
    }
    const revisionInfo = browserFetcher.revisionInfo(this._preferredRevision);
    const missingText = !revisionInfo.local ? `Chromium revision is not downloaded. Run "npm install" or "yarn install"` : null;
    return {executablePath: revisionInfo.executablePath, missingText};
  }
}

/**
 * @param {!Puppeteer.ChildProcess} chromeProcess
 * @param {number} timeout
 * @param {string} preferredRevision
 * @return {!Promise<string>}
 */
function waitForWSEndpoint(chromeProcess, timeout, preferredRevision) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({ input: chromeProcess.stderr });
    let stderr = '';
    const listeners = [
      helper.addEventListener(rl, 'line', onLine),
      helper.addEventListener(rl, 'close', () => onClose()),
      helper.addEventListener(chromeProcess, 'exit', () => onClose()),
      helper.addEventListener(chromeProcess, 'error', error => onClose(error))
    ];
    const timeoutId = timeout ? setTimeout(onTimeout, timeout) : 0;

    /**
     * @param {!Error=} error
     */
    function onClose(error) {
      cleanup();
      reject(new Error([
        'Failed to launch chrome!' + (error ? ' ' + error.message : ''),
        stderr,
        '',
        'TROUBLESHOOTING: https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md',
        '',
      ].join('\n')));
    }

    function onTimeout() {
      cleanup();
      reject(new TimeoutError(`Timed out after ${timeout} ms while trying to connect to Chrome! The only Chrome revision guaranteed to work is r${preferredRevision}`));
    }

    /**
     * @param {string} line
     */
    function onLine(line) {
      stderr += line + '\n';
      const match = line.match(/^DevTools listening on (ws:\/\/.*)$/);
      if (!match)
        return;
      cleanup();
      resolve(match[1]);
    }

    function cleanup() {
      if (timeoutId)
        clearTimeout(timeoutId);
      helper.removeEventListeners(listeners);
    }
  });
}

/**
 * @param {string} browserURL
 * @return {!Promise<string>}
 */
function getWSEndpoint(browserURL) {
  let resolve, reject;
  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });

  const endpointURL = URL.resolve(browserURL, '/json/version');
  const protocol = endpointURL.startsWith('https') ? https : http;
  const requestOptions = Object.assign(URL.parse(endpointURL), { method: 'GET' });
  const request = protocol.request(requestOptions, res => {
    let data = '';
    if (res.statusCode !== 200) {
      // Consume response data to free up memory.
      res.resume();
      reject(new Error('HTTP ' + res.statusCode));
      return;
    }
    res.setEncoding('utf8');
    res.on('data', chunk => data += chunk);
    res.on('end', () => resolve(JSON.parse(data).webSocketDebuggerUrl));
  });

  request.on('error', reject);
  request.end();

  return promise.catch(e => {
    e.message = `Failed to fetch browser webSocket url from ${endpointURL}: ` + e.message;
    throw e;
  });
}

/**
 * @typedef {Object} Launcher.ChromeArgOptions
 * @property {boolean=} headless
 * @property {Array<string>=} args
 * @property {string=} userDataDir
 * @property {boolean=} devtools
 */

/**
 * @typedef {Object} Launcher.LaunchOptions
 * @property {string=} executablePath
 * @property {boolean|Array<string>=} ignoreDefaultArgs
 * @property {boolean=} handleSIGINT
 * @property {boolean=} handleSIGTERM
 * @property {boolean=} handleSIGHUP
 * @property {number=} timeout
 * @property {boolean=} dumpio
 * @property {!Object<string, string | undefined>=} env
 * @property {boolean=} pipe
 */

/**
 * @typedef {Object} Launcher.BrowserOptions
 * @property {boolean=} ignoreHTTPSErrors
 * @property {(?Puppeteer.Viewport)=} defaultViewport
 * @property {number=} slowMo
 */


exports_puppeteer_puppeteer_lib_Launcher = Launcher;


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
    else if (typeof waitUntil === 'string')
      waitUntil = [waitUntil];
    this._expectedLifecycle = waitUntil.map(value => {
      const protocolEvent = puppeteerToProtocolLifecycle[value];
      assert(protocolEvent, 'Unknown value for options.waitUntil: ' + value);
      return protocolEvent;
    });

    this._frameManager = frameManager;
    this._frame = frame;
    this._initialLoaderId = frame._loaderId;
    this._timeout = timeout;
    /** @type {?Puppeteer.Request} */
    this._navigationRequest = null;
    this._eventListeners = [
      helper.addEventListener(frameManager._client, Events.CDPSession.Disconnected, () => this._terminate(new Error('Navigation failed because browser has disconnected!'))),
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
      this._terminationCallback.call(null, new Error('Navigating frame was detached'));
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
    const errorMessage = 'Navigation Timeout Exceeded: ' + this._timeout + 'ms exceeded';
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
  'load': 'load',
  'domcontentloaded': 'DOMContentLoaded',
  'networkidle0': 'networkIdle',
  'networkidle2': 'networkAlmostIdle',
};

exports_puppeteer_puppeteer_lib_LifecycleWatcher = {LifecycleWatcher};


/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/Multimap.js
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
/**
 * @template T
 * @template V
 */
class Multimap {
  constructor() {
    this._map = new Map();
  }

  /**
   * @param {T} key
   * @param {V} value
   */
  set(key, value) {
    let set = this._map.get(key);
    if (!set) {
      set = new Set();
      this._map.set(key, set);
    }
    set.add(value);
  }

  /**
   * @param {T} key
   * @return {!Set<V>}
   */
  get(key) {
    let result = this._map.get(key);
    if (!result)
      result = new Set();
    return result;
  }

  /**
   * @param {T} key
   * @return {boolean}
   */
  has(key) {
    return this._map.has(key);
  }

  /**
   * @param {T} key
   * @param {V} value
   * @return {boolean}
   */
  hasValue(key, value) {
    const set = this._map.get(key);
    if (!set)
      return false;
    return set.has(value);
  }

  /**
   * @return {number}
   */
  get size() {
    return this._map.size;
  }

  /**
   * @param {T} key
   * @param {V} value
   * @return {boolean}
   */
  delete(key, value) {
    const values = this.get(key);
    const result = values.delete(value);
    if (!values.size)
      this._map.delete(key);
    return result;
  }

  /**
   * @param {T} key
   */
  deleteAll(key) {
    this._map.delete(key);
  }

  /**
   * @param {T} key
   * @return {V}
   */
  firstValue(key) {
    const set = this._map.get(key);
    if (!set)
      return null;
    return set.values().next().value;
  }

  /**
   * @return {T}
   */
  firstKey() {
    return this._map.keys().next().value;
  }

  /**
   * @return {!Array<V>}
   */
  valuesArray() {
    const result = [];
    for (const key of this._map.keys())
      result.push(...Array.from(this._map.get(key).values()));
    return result;
  }

  /**
   * @return {!Array<T>}
   */
  keysArray() {
    return Array.from(this._map.keys());
  }

  clear() {
    this._map.clear();
  }
}

exports_puppeteer_puppeteer_lib_Multimap = Multimap;


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
// const EventEmitter = require('events');
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

    this._client.on('Fetch.requestPaused', this._onRequestPaused.bind(this));
    this._client.on('Fetch.authRequired', this._onAuthRequired.bind(this));
    this._client.on('Network.requestWillBeSent', this._onRequestWillBeSent.bind(this));
    this._client.on('Network.requestServedFromCache', this._onRequestServedFromCache.bind(this));
    this._client.on('Network.responseReceived', this._onResponseReceived.bind(this));
    this._client.on('Network.loadingFinished', this._onLoadingFinished.bind(this));
    this._client.on('Network.loadingFailed', this._onLoadingFailed.bind(this));
  }

  async initialize() {
    await this._client.send('Network.enable');
    if (this._ignoreHTTPSErrors)
      await this._client.send('Security.setIgnoreCertificateErrors', {ignore: true});
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
    await this._client.send('Network.setExtraHTTPHeaders', { headers: this._extraHTTPHeaders });
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
    await this._client.send('Network.emulateNetworkConditions', {
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
    await this._client.send('Network.setUserAgentOverride', { userAgent });
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
        this._client.send('Fetch.enable', {
          handleAuthRequests: true,
          patterns: [{urlPattern: '*'}],
        }),
      ]);
    } else {
      await Promise.all([
        this._updateProtocolCacheDisabled(),
        this._client.send('Fetch.disable')
      ]);
    }
  }

  async _updateProtocolCacheDisabled() {
    await this._client.send('Network.setCacheDisabled', {
      cacheDisabled: this._userCacheDisabled || this._protocolRequestInterceptionEnabled
    });
  }

  /**
   * @param {!Protocol.Network.requestWillBeSentPayload} event
   */
  _onRequestWillBeSent(event) {
    // Request interception doesn't happen for data URLs with Network Service.
    if (this._protocolRequestInterceptionEnabled && !event.request.url.startsWith('data:')) {
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
    let response = 'Default';
    if (this._attemptedAuthentications.has(event.requestId)) {
      response = 'CancelAuth';
    } else if (this._credentials) {
      response = 'ProvideCredentials';
      this._attemptedAuthentications.add(event.requestId);
    }
    const {username, password} = this._credentials || {username: undefined, password: undefined};
    this._client.send('Fetch.continueWithAuth', {
      requestId: event.requestId,
      authChallengeResponse: { response, username, password },
    }).catch(debugError);
  }

  /**
   * @param {!Protocol.Fetch.requestPausedPayload} event
   */
  _onRequestPaused(event) {
    if (!this._userRequestInterceptionEnabled && this._protocolRequestInterceptionEnabled) {
      this._client.send('Fetch.continueRequest', {
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
    response._bodyLoadedPromiseFulfill.call(null, new Error('Response body is unavailable for redirect responses'));
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
    this._isNavigationRequest = event.requestId === event.loaderId && event.type === 'Document';
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
    if (this._url.startsWith('data:'))
      return;
    assert(this._allowInterception, 'Request Interception is not enabled!');
    assert(!this._interceptionHandled, 'Request is already handled!');
    const {
      url,
      method,
      postData,
      headers
    } = overrides;
    this._interceptionHandled = true;
    await this._client.send('Fetch.continueRequest', {
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
    if (this._url.startsWith('data:'))
      return;
    assert(this._allowInterception, 'Request Interception is not enabled!');
    assert(!this._interceptionHandled, 'Request is already handled!');
    this._interceptionHandled = true;

    const responseBody = response.body && helper.isString(response.body) ? Buffer.from(/** @type {string} */(response.body)) : /** @type {?Buffer} */(response.body || null);

    /** @type {!Object<string, string>} */
    const responseHeaders = {};
    if (response.headers) {
      for (const header of Object.keys(response.headers))
        responseHeaders[header.toLowerCase()] = response.headers[header];
    }
    if (response.contentType)
      responseHeaders['content-type'] = response.contentType;
    if (responseBody && !('content-length' in responseHeaders))
      responseHeaders['content-length'] = String(Buffer.byteLength(responseBody));

    await this._client.send('Fetch.fulfillRequest', {
      requestId: this._interceptionId,
      responseCode: response.status || 200,
      responsePhrase: STATUS_TEXTS[response.status || 200],
      responseHeaders: headersArray(responseHeaders),
      body: responseBody ? responseBody.toString('base64') : undefined,
    }).catch(error => {
      // In certain cases, protocol will return error if the request was already canceled
      // or the page was closed. We should tolerate these errors.
      debugError(error);
    });
  }

  /**
   * @param {string=} errorCode
   */
  async abort(errorCode = 'failed') {
    // Request interception is not supported for data: urls.
    if (this._url.startsWith('data:'))
      return;
    const errorReason = errorReasons[errorCode];
    assert(errorReason, 'Unknown error code: ' + errorCode);
    assert(this._allowInterception, 'Request Interception is not enabled!');
    assert(!this._interceptionHandled, 'Request is already handled!');
    this._interceptionHandled = true;
    await this._client.send('Fetch.failRequest', {
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
  'aborted': 'Aborted',
  'accessdenied': 'AccessDenied',
  'addressunreachable': 'AddressUnreachable',
  'blockedbyclient': 'BlockedByClient',
  'blockedbyresponse': 'BlockedByResponse',
  'connectionaborted': 'ConnectionAborted',
  'connectionclosed': 'ConnectionClosed',
  'connectionfailed': 'ConnectionFailed',
  'connectionrefused': 'ConnectionRefused',
  'connectionreset': 'ConnectionReset',
  'internetdisconnected': 'InternetDisconnected',
  'namenotresolved': 'NameNotResolved',
  'timedout': 'TimedOut',
  'failed': 'Failed',
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
        const response = await this._client.send('Network.getResponseBody', {
          requestId: this._request._requestId
        });
        return Buffer.from(response.body, response.base64Encoded ? 'base64' : 'utf8');
      });
    }
    return this._contentPromise;
  }

  /**
   * @return {!Promise<string>}
   */
  async text() {
    const content = await this.buffer();
    return content.toString('utf8');
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
    this._subjectName = securityPayload['subjectName'];
    this._issuer = securityPayload['issuer'];
    this._validFrom = securityPayload['validFrom'];
    this._validTo = securityPayload['validTo'];
    this._protocol = securityPayload['protocol'];
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
    result.push({name, value: headers[name] + ''});
  return result;
}

// List taken from https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml with extra 306 and 418 codes.
const STATUS_TEXTS = {
  '100': 'Continue',
  '101': 'Switching Protocols',
  '102': 'Processing',
  '103': 'Early Hints',
  '200': 'OK',
  '201': 'Created',
  '202': 'Accepted',
  '203': 'Non-Authoritative Information',
  '204': 'No Content',
  '205': 'Reset Content',
  '206': 'Partial Content',
  '207': 'Multi-Status',
  '208': 'Already Reported',
  '226': 'IM Used',
  '300': 'Multiple Choices',
  '301': 'Moved Permanently',
  '302': 'Found',
  '303': 'See Other',
  '304': 'Not Modified',
  '305': 'Use Proxy',
  '306': 'Switch Proxy',
  '307': 'Temporary Redirect',
  '308': 'Permanent Redirect',
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '402': 'Payment Required',
  '403': 'Forbidden',
  '404': 'Not Found',
  '405': 'Method Not Allowed',
  '406': 'Not Acceptable',
  '407': 'Proxy Authentication Required',
  '408': 'Request Timeout',
  '409': 'Conflict',
  '410': 'Gone',
  '411': 'Length Required',
  '412': 'Precondition Failed',
  '413': 'Payload Too Large',
  '414': 'URI Too Long',
  '415': 'Unsupported Media Type',
  '416': 'Range Not Satisfiable',
  '417': 'Expectation Failed',
  '418': 'I\'m a teapot',
  '421': 'Misdirected Request',
  '422': 'Unprocessable Entity',
  '423': 'Locked',
  '424': 'Failed Dependency',
  '425': 'Too Early',
  '426': 'Upgrade Required',
  '428': 'Precondition Required',
  '429': 'Too Many Requests',
  '431': 'Request Header Fields Too Large',
  '451': 'Unavailable For Legal Reasons',
  '500': 'Internal Server Error',
  '501': 'Not Implemented',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
  '504': 'Gateway Timeout',
  '505': 'HTTP Version Not Supported',
  '506': 'Variant Also Negotiates',
  '507': 'Insufficient Storage',
  '508': 'Loop Detected',
  '510': 'Not Extended',
  '511': 'Network Authentication Required',
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

// const fs = require('fs');
// const path = require('path');
// const EventEmitter = require('events');
// const mime = require('mime');
// const {Events} = exports_puppeteer_puppeteer_lib_Events;
// const {Connection} = exports_puppeteer_puppeteer_lib_Connection;
// const {Dialog} = exports_puppeteer_puppeteer_lib_Dialog;
// const {EmulationManager} = exports_puppeteer_puppeteer_lib_EmulationManager;
// const {FrameManager} = exports_puppeteer_puppeteer_lib_FrameManager;
// const {Keyboard, Mouse, Touchscreen} = exports_puppeteer_puppeteer_lib_Input;
// const Tracing = exports_puppeteer_puppeteer_lib_Tracing;
// const {helper, debugError, assert} = exports_puppeteer_puppeteer_lib_helper;
// const {Coverage} = exports_puppeteer_puppeteer_lib_Coverage;
// const {Worker} = exports_puppeteer_puppeteer_lib_Worker;
// const {createJSHandle} = exports_puppeteer_puppeteer_lib_JSHandle;
// const {Accessibility} = exports_puppeteer_puppeteer_lib_Accessibility;
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
    this._keyboard = new Keyboard(client);
    this._mouse = new Mouse(client, this._keyboard);
    this._timeoutSettings = new TimeoutSettings();
    this._touchscreen = new Touchscreen(client, this._keyboard);
    this._accessibility = new Accessibility(client);
    /** @type {!FrameManager} */
    this._frameManager = new FrameManager(client, this, ignoreHTTPSErrors, this._timeoutSettings);
    this._emulationManager = new EmulationManager(client);
    this._tracing = new Tracing(client);
    /** @type {!Map<string, Function>} */
    this._pageBindings = new Map();
    this._coverage = new Coverage(client);
    this._javascriptEnabled = true;
    /** @type {?Puppeteer.Viewport} */
    this._viewport = null;

    this._screenshotTaskQueue = screenshotTaskQueue;

    /** @type {!Map<string, Worker>} */
    this._workers = new Map();
    client.on('Target.attachedToTarget', event => {
      if (event.targetInfo.type !== 'worker') {
        // If we don't detach from service workers, they will never die.
        client.send('Target.detachFromTarget', {
          sessionId: event.sessionId
        }).catch(debugError);
        return;
      }
      const session = Connection.fromSession(client).session(event.sessionId);
      const worker = new Worker(session, event.targetInfo.url, this._addConsoleMessage.bind(this), this._handleException.bind(this));
      this._workers.set(event.sessionId, worker);
      this.emit(Events.Page.WorkerCreated, worker);
    });
    client.on('Target.detachedFromTarget', event => {
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

    client.on('Page.domContentEventFired', event => this.emit(Events.Page.DOMContentLoaded));
    client.on('Page.loadEventFired', event => this.emit(Events.Page.Load));
    client.on('Runtime.consoleAPICalled', event => this._onConsoleAPI(event));
    client.on('Runtime.bindingCalled', event => this._onBindingCalled(event));
    client.on('Page.javascriptDialogOpening', event => this._onDialog(event));
    client.on('Runtime.exceptionThrown', exception => this._handleException(exception.exceptionDetails));
    client.on('Inspector.targetCrashed', event => this._onTargetCrashed());
    client.on('Performance.metrics', event => this._emitMetrics(event));
    client.on('Log.entryAdded', event => this._onLogEntryAdded(event));
    client.on('Page.fileChooserOpened', event => this._onFileChooser(event));
    this._target._isClosedPromise.then(() => {
      this.emit(Events.Page.Close);
      this._closed = true;
    });
  }

  async _initialize() {
    await Promise.all([
      this._frameManager.initialize(),
      this._client.send('Target.setAutoAttach', {autoAttach: true, waitForDebuggerOnStart: false, flatten: true}),
      this._client.send('Performance.enable', {}),
      this._client.send('Log.enable', {}),
      this._client.send('Page.setInterceptFileChooserDialog', {enabled: true}).catch(e => {
        this._fileChooserInterceptionIsDisabled = true;
      }),
    ]);
  }

  /**
   * @param {!Protocol.Page.fileChooserOpenedPayload} event
   */
  _onFileChooser(event) {
    if (!this._fileChooserInterceptors.size) {
      this._client.send('Page.handleFileChooser', { action: 'fallback' }).catch(debugError);
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
      throw new Error('File chooser handling does not work with multiple connections to the same page');
    const {
      timeout = this._timeoutSettings.timeout(),
    } = options;
    let callback;
    const promise = new Promise(x => callback = x);
    this._fileChooserInterceptors.add(callback);
    return helper.waitWithTimeout(promise, 'waiting for file chooser', timeout).catch(e => {
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
    await this._client.send('Emulation.setGeolocationOverride', {longitude, latitude, accuracy});
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
    this.emit('error', new Error('Page crashed!'));
  }

  /**
   * @param {!Protocol.Log.entryAddedPayload} event
   */
  _onLogEntryAdded(event) {
    const {level, text, args, source, url, lineNumber} = event.entry;
    if (args)
      args.map(arg => helper.releaseObject(this._client, arg));
    if (source !== 'worker')
      this.emit(Events.Page.Console, new ConsoleMessage(level, text, [], {url, lineNumber}));
  }

  /**
   * @return {!Puppeteer.Frame}
   */
  mainFrame() {
    return this._frameManager.mainFrame();
  }

  /**
   * @return {!Keyboard}
   */
  get keyboard() {
    return this._keyboard;
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
   * @return {!Tracing}
   */
  get tracing() {
    return this._tracing;
  }

  /**
   * @return {!Accessibility}
   */
  get accessibility() {
    return this._accessibility;
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
    return (await this._client.send('Network.getCookies', {
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
      if (!cookie.url && pageURL.startsWith('http'))
        item.url = pageURL;
      await this._client.send('Network.deleteCookies', item);
    }
  }

  /**
   * @param {Array<Network.CookieParam>} cookies
   */
  async setCookie(...cookies) {
    const pageURL = this.url();
    const startsWithHTTP = pageURL.startsWith('http');
    const items = cookies.map(cookie => {
      const item = Object.assign({}, cookie);
      if (!item.url && startsWithHTTP)
        item.url = pageURL;
      assert(item.url !== 'about:blank', `Blank page can not have cookie "${item.name}"`);
      assert(!String.prototype.startsWith.call(item.url || '', 'data:'), `Data URL page can not have cookie "${item.name}"`);
      return item;
    });
    await this.deleteCookie(...items);
    if (items.length)
      await this._client.send('Network.setCookies', { cookies: items });
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
      throw new Error(`Failed to add page binding with name ${name}: window['${name}'] already exists!`);
    this._pageBindings.set(name, puppeteerFunction);

    const expression = helper.evaluationString(addPageBinding, name);
    await this._client.send('Runtime.addBinding', {name: name});
    await this._client.send('Page.addScriptToEvaluateOnNewDocument', {source: expression});
    await Promise.all(this.frames().map(frame => frame.evaluate(expression).catch(debugError)));

    function addPageBinding(bindingName) {
      const binding = window[bindingName];
      window[bindingName] = (...args) => {
        const me = window[bindingName];
        let callbacks = me['callbacks'];
        if (!callbacks) {
          callbacks = new Map();
          me['callbacks'] = callbacks;
        }
        const seq = (me['lastSeq'] || 0) + 1;
        me['lastSeq'] = seq;
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
    const response = await this._client.send('Performance.getMetrics');
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
    err.stack = ''; // Don't report clientside error with a node stack attached
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
      //   to the 'console'
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
    this._client.send('Runtime.evaluate', { expression, contextId: event.executionContextId }).catch(debugError);

    /**
     * @param {string} name
     * @param {number} seq
     * @param {*} result
     */
    function deliverResult(name, seq, result) {
      window[name]['callbacks'].get(seq).resolve(result);
      window[name]['callbacks'].delete(seq);
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
      window[name]['callbacks'].get(seq).reject(error);
      window[name]['callbacks'].delete(seq);
    }

    /**
     * @param {string} name
     * @param {number} seq
     * @param {*} value
     */
    function deliverErrorValue(name, seq, value) {
      window[name]['callbacks'].get(seq).reject(value);
      window[name]['callbacks'].delete(seq);
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
    const message = new ConsoleMessage(type, textTokens.join(' '), args, location);
    this.emit(Events.Page.Console, message);
  }

  _onDialog(event) {
    let dialogType = null;
    if (event.type === 'alert')
      dialogType = Dialog.Type.Alert;
    else if (event.type === 'confirm')
      dialogType = Dialog.Type.Confirm;
    else if (event.type === 'prompt')
      dialogType = Dialog.Type.Prompt;
    else if (event.type === 'beforeunload')
      dialogType = Dialog.Type.BeforeUnload;
    assert(dialogType, 'Unknown javascript dialog type: ' + event.type);
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
      this._client.send('Page.reload')
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
      if (typeof urlOrPredicate === 'function')
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
      if (typeof urlOrPredicate === 'function')
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
    const history = await this._client.send('Page.getNavigationHistory');
    const entry = history.entries[history.currentIndex + delta];
    if (!entry)
      return null;
    const [response] = await Promise.all([
      this.waitForNavigation(options),
      this._client.send('Page.navigateToHistoryEntry', {entryId: entry.id}),
    ]);
    return response;
  }

  async bringToFront() {
    await this._client.send('Page.bringToFront');
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
    await this._client.send('Emulation.setScriptExecutionDisabled', { value: !enabled });
  }

  /**
   * @param {boolean} enabled
   */
  async setBypassCSP(enabled) {
    await this._client.send('Page.setBypassCSP', { enabled });
  }

  /**
   * @param {?string} mediaType
   */
  async emulateMedia(mediaType) {
    assert(mediaType === 'screen' || mediaType === 'print' || mediaType === null, 'Unsupported media type: ' + mediaType);
    await this._client.send('Emulation.setEmulatedMedia', {media: mediaType || ''});
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
    await this._client.send('Page.addScriptToEvaluateOnNewDocument', { source });
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
      assert(options.type === 'png' || options.type === 'jpeg', 'Unknown options.type value: ' + options.type);
      screenshotType = options.type;
    } else if (options.path) {
      const mimeType = mime.getType(options.path);
      if (mimeType === 'image/png')
        screenshotType = 'png';
      else if (mimeType === 'image/jpeg')
        screenshotType = 'jpeg';
      assert(screenshotType, 'Unsupported screenshot mime type: ' + mimeType);
    }

    if (!screenshotType)
      screenshotType = 'png';

    if (options.quality) {
      assert(screenshotType === 'jpeg', 'options.quality is unsupported for the ' + screenshotType + ' screenshots');
      assert(typeof options.quality === 'number', 'Expected options.quality to be a number but found ' + (typeof options.quality));
      assert(Number.isInteger(options.quality), 'Expected options.quality to be an integer');
      assert(options.quality >= 0 && options.quality <= 100, 'Expected options.quality to be between 0 and 100 (inclusive), got ' + options.quality);
    }
    assert(!options.clip || !options.fullPage, 'options.clip and options.fullPage are exclusive');
    if (options.clip) {
      assert(typeof options.clip.x === 'number', 'Expected options.clip.x to be a number but found ' + (typeof options.clip.x));
      assert(typeof options.clip.y === 'number', 'Expected options.clip.y to be a number but found ' + (typeof options.clip.y));
      assert(typeof options.clip.width === 'number', 'Expected options.clip.width to be a number but found ' + (typeof options.clip.width));
      assert(typeof options.clip.height === 'number', 'Expected options.clip.height to be a number but found ' + (typeof options.clip.height));
      assert(options.clip.width !== 0, 'Expected options.clip.width not to be 0.');
      assert(options.clip.height !== 0, 'Expected options.clip.width not to be 0.');
    }
    return this._screenshotTaskQueue.postTask(this._screenshotTask.bind(this, screenshotType, options));
  }

  /**
   * @param {"png"|"jpeg"} format
   * @param {!ScreenshotOptions=} options
   * @return {!Promise<!Buffer|!String>}
   */
  async _screenshotTask(format, options) {
    await this._client.send('Target.activateTarget', {targetId: this._target._targetId});
    let clip = options.clip ? processClip(options.clip) : undefined;

    if (options.fullPage) {
      const metrics = await this._client.send('Page.getLayoutMetrics');
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
      const screenOrientation = isLandscape ? { angle: 90, type: 'landscapePrimary' } : { angle: 0, type: 'portraitPrimary' };
      await this._client.send('Emulation.setDeviceMetricsOverride', { mobile: isMobile, width, height, deviceScaleFactor, screenOrientation });
    }
    const shouldSetDefaultBackground = options.omitBackground && format === 'png';
    if (shouldSetDefaultBackground)
      await this._client.send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
    const result = await this._client.send('Page.captureScreenshot', { format, quality: options.quality, clip });
    if (shouldSetDefaultBackground)
      await this._client.send('Emulation.setDefaultBackgroundColorOverride');

    if (options.fullPage && this._viewport)
      await this.setViewport(this._viewport);

    const buffer = options.encoding === 'base64' ? result.data : Buffer.from(result.data, 'base64');
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
      headerTemplate = '',
      footerTemplate = '',
      printBackground = false,
      landscape = false,
      pageRanges = '',
      preferCSSPageSize = false,
      margin = {},
      path = null
    } = options;

    let paperWidth = 8.5;
    let paperHeight = 11;
    if (options.format) {
      const format = Page.PaperFormats[options.format.toLowerCase()];
      assert(format, 'Unknown paper format: ' + options.format);
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

    const result = await this._client.send('Page.printToPDF', {
      transferMode: 'ReturnAsStream',
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
    assert(!!this._client._connection, 'Protocol error: Connection closed. Most likely the page has been closed.');
    const runBeforeUnload = !!options.runBeforeUnload;
    if (runBeforeUnload) {
      await this._client.send('Page.close');
    } else {
      await this._client._connection.send('Target.closeTarget', { targetId: this._target._targetId });
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
  'Timestamp',
  'Documents',
  'Frames',
  'JSEventListeners',
  'Nodes',
  'LayoutCount',
  'RecalcStyleCount',
  'LayoutDuration',
  'RecalcStyleDuration',
  'ScriptDuration',
  'TaskDuration',
  'JSHeapUsedSize',
  'JSHeapTotalSize',
]);

/** @enum {!{width: number, height: number}} */
Page.PaperFormats = {
  letter: {width: 8.5, height: 11},
  legal: {width: 8.5, height: 14},
  tabloid: {width: 11, height: 17},
  ledger: {width: 17, height: 11},
  a0: {width: 33.1, height: 46.8 },
  a1: {width: 23.4, height: 33.1 },
  a2: {width: 16.54, height: 23.4 },
  a3: {width: 11.7, height: 16.54 },
  a4: {width: 8.27, height: 11.7 },
  a5: {width: 5.83, height: 8.27 },
  a6: {width: 4.13, height: 5.83 },
};

const unitToPixels = {
  'px': 1,
  'in': 96,
  'cm': 37.8,
  'mm': 3.78
};

/**
 * @param {(string|number|undefined)} parameter
 * @return {(number|undefined)}
 */
function convertPrintParameterToInches(parameter) {
  if (typeof parameter === 'undefined')
    return undefined;
  let pixels;
  if (helper.isNumber(parameter)) {
    // Treat numbers as pixel values to be aligned with phantom's paperSize.
    pixels = /** @type {number} */ (parameter);
  } else if (helper.isString(parameter)) {
    const text = /** @type {string} */ (parameter);
    let unit = text.substring(text.length - 2).toLowerCase();
    let valueText = '';
    if (unitToPixels.hasOwnProperty(unit)) {
      valueText = text.substring(0, text.length - 2);
    } else {
      // In case of unknown unit try to parse the whole parameter as number of pixels.
      // This is consistent with phantom's paperSize behavior.
      unit = 'px';
      valueText = text;
    }
    const value = Number(valueText);
    assert(!isNaN(value), 'Failed to parse parameter value: ' + text);
    pixels = value * unitToPixels[unit];
  } else {
    throw new Error('page.pdf() Cannot handle parameter type: ' + (typeof parameter));
  }
  return pixels / 96;
}

/**
 * @typedef {Object} Network.Cookie
 * @property {string} name
 * @property {string} value
 * @property {string} domain
 * @property {string} path
 * @property {number} expires
 * @property {number} size
 * @property {boolean} httpOnly
 * @property {boolean} secure
 * @property {boolean} session
 * @property {("Strict"|"Lax"|"Extended"|"None")=} sameSite
 */


/**
 * @typedef {Object} Network.CookieParam
 * @property {string} name
 * @property {string} value
 * @property {string=} url
 * @property {string=} domain
 * @property {string=} path
 * @property {number=} expires
 * @property {boolean=} httpOnly
 * @property {boolean=} secure
 * @property {("Strict"|"Lax")=} sameSite
 */

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

class FileChooser {
  /**
   * @param {Puppeteer.CDPSession} client
   * @param {!Protocol.Page.fileChooserOpenedPayload} event
   */
  constructor(client, event) {
    this._client = client;
    this._multiple = event.mode !== 'selectSingle';
    this._handled = false;
  }

  /**
   * @return {boolean}
   */
  isMultiple() {
    return this._multiple;
  }

  /**
   * @param {!Array<string>} filePaths
   * @return {!Promise}
   */
  async accept(filePaths) {
    assert(!this._handled, 'Cannot accept FileChooser which is already handled!');
    this._handled = true;
    const files = filePaths.map(filePath => path.resolve(filePath));
    await this._client.send('Page.handleFileChooser', {
      action: 'accept',
      files,
    });
  }

  /**
   * @return {!Promise}
   */
  async cancel() {
    assert(!this._handled, 'Cannot cancel FileChooser which is already handled!');
    this._handled = true;
    await this._client.send('Page.handleFileChooser', {
      action: 'cancel',
    });
  }
}

exports_puppeteer_puppeteer_lib_Page = {Page, ConsoleMessage, FileChooser};


/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/PipeTransport.js
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
// const {helper, debugError} = exports_puppeteer_puppeteer_lib_helper;

/**
 * @implements {!Puppeteer.ConnectionTransport}
 */
class PipeTransport {
  /**
   * @param {!NodeJS.WritableStream} pipeWrite
   * @param {!NodeJS.ReadableStream} pipeRead
   */
  constructor(pipeWrite, pipeRead) {
    this._pipeWrite = pipeWrite;
    this._pendingMessage = '';
    this._eventListeners = [
      helper.addEventListener(pipeRead, 'data', buffer => this._dispatch(buffer)),
      helper.addEventListener(pipeRead, 'close', () => {
        if (this.onclose)
          this.onclose.call(null);
      }),
      helper.addEventListener(pipeRead, 'error', debugError),
      helper.addEventListener(pipeWrite, 'error', debugError),
    ];
    this.onmessage = null;
    this.onclose = null;
  }

  /**
   * @param {string} message
   */
  send(message) {
    this._pipeWrite.write(message);
    this._pipeWrite.write('\0');
  }

  /**
   * @param {!Buffer} buffer
   */
  _dispatch(buffer) {
    let end = buffer.indexOf('\0');
    if (end === -1) {
      this._pendingMessage += buffer.toString();
      return;
    }
    const message = this._pendingMessage + buffer.toString(undefined, 0, end);
    if (this.onmessage)
      this.onmessage.call(null, message);

    let start = end + 1;
    end = buffer.indexOf('\0', start);
    while (end !== -1) {
      if (this.onmessage)
        this.onmessage.call(null, buffer.toString(undefined, start, end));
      start = end + 1;
      end = buffer.indexOf('\0', start);
    }
    this._pendingMessage = buffer.toString(undefined, start);
  }

  close() {
    this._pipeWrite = null;
    helper.removeEventListeners(this._eventListeners);
  }
}

exports_puppeteer_puppeteer_lib_PipeTransport = PipeTransport;


/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/Puppeteer.js
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
// const Launcher = exports_puppeteer_puppeteer_lib_Launcher;
// const BrowserFetcher = exports_puppeteer_puppeteer_lib_BrowserFetcher;
const Errors = exports_puppeteer_puppeteer_lib_Errors;
const DeviceDescriptors = exports_puppeteer_puppeteer_lib_DeviceDescriptors;

exports_puppeteer_puppeteer_lib_Puppeteer = class {
  /**
   * @param {string} projectRoot
   * @param {string} preferredRevision
   * @param {boolean} isPuppeteerCore
   */
  constructor(projectRoot, preferredRevision, isPuppeteerCore) {
    this._projectRoot = projectRoot;
    this._launcher = new Launcher(projectRoot, preferredRevision, isPuppeteerCore);
  }

  /**
   * @param {!(Launcher.LaunchOptions & Launcher.ChromeArgOptions & Launcher.BrowserOptions)=} options
   * @return {!Promise<!Puppeteer.Browser>}
   */
  launch(options) {
    return this._launcher.launch(options);
  }

  /**
   * @param {!(Launcher.BrowserOptions & {browserWSEndpoint?: string, browserURL?: string, transport?: !Puppeteer.ConnectionTransport})} options
   * @return {!Promise<!Puppeteer.Browser>}
   */
  connect(options) {
    return this._launcher.connect(options);
  }

  /**
   * @return {string}
   */
  executablePath() {
    return this._launcher.executablePath();
  }

  /**
   * @return {Object}
   */
  get devices() {
    return DeviceDescriptors;
  }

  /**
   * @return {Object}
   */
  get errors() {
    return Errors;
  }

  /**
   * @param {!Launcher.ChromeArgOptions=} options
   * @return {!Array<string>}
   */
  defaultArgs(options) {
    return this._launcher.defaultArgs(options);
  }

  /**
   * @param {!BrowserFetcher.Options=} options
   * @return {!BrowserFetcher}
   */
  createBrowserFetcher(options) {
    return new BrowserFetcher(this._projectRoot, options);
  }
};


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
      if (!opener || !opener._pagePromise || this.type() !== 'page')
        return true;
      const openerPage = await opener._pagePromise;
      if (!openerPage.listenerCount(Events.Page.Popup))
        return true;
      const popupPage = await this.page();
      openerPage.emit(Events.Page.Popup, popupPage);
      return true;
    });
    this._isClosedPromise = new Promise(fulfill => this._closedCallback = fulfill);
    this._isInitialized = this._targetInfo.type !== 'page' || this._targetInfo.url !== '';
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
    if ((this._targetInfo.type === 'page' || this._targetInfo.type === 'background_page') && !this._pagePromise) {
      this._pagePromise = this._sessionFactory()
          .then(client => Page.create(client, this, this._ignoreHTTPSErrors, this._defaultViewport, this._screenshotTaskQueue));
    }
    return this._pagePromise;
  }

  /**
   * @return {!Promise<?Worker>}
   */
  async worker() {
    if (this._targetInfo.type !== 'service_worker' && this._targetInfo.type !== 'shared_worker')
      return null;
    if (!this._workerPromise) {
      this._workerPromise = this._sessionFactory().then(async client => {
        // Top level workers have a fake page wrapping the actual worker.
        const [targetAttached] = await Promise.all([
          new Promise(x => client.once('Target.attachedToTarget', x)),
          client.send('Target.setAutoAttach', {autoAttach: true, waitForDebuggerOnStart: false, flatten: true}),
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
    if (type === 'page' || type === 'background_page' || type === 'service_worker' || type === 'shared_worker' || type === 'browser')
      return type;
    return 'other';
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

    if (!this._isInitialized && (this._targetInfo.type !== 'page' || this._targetInfo.url !== '')) {
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
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/Tracing.js
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

class Tracing {
  /**
   * @param {!Puppeteer.CDPSession} client
   */
  constructor(client) {
    this._client = client;
    this._recording = false;
    this._path = '';
  }

  /**
   * @param {!{path?: string, screenshots?: boolean, categories?: !Array<string>}} options
   */
  async start(options = {}) {
    assert(!this._recording, 'Cannot start recording trace while already recording trace.');

    const defaultCategories = [
      '-*', 'devtools.timeline', 'v8.execute', 'disabled-by-default-devtools.timeline',
      'disabled-by-default-devtools.timeline.frame', 'toplevel',
      'blink.console', 'blink.user_timing', 'latencyInfo', 'disabled-by-default-devtools.timeline.stack',
      'disabled-by-default-v8.cpu_profiler', 'disabled-by-default-v8.cpu_profiler.hires'
    ];
    const {
      path = null,
      screenshots = false,
      categories = defaultCategories,
    } = options;

    if (screenshots)
      categories.push('disabled-by-default-devtools.screenshot');

    this._path = path;
    this._recording = true;
    await this._client.send('Tracing.start', {
      transferMode: 'ReturnAsStream',
      categories: categories.join(',')
    });
  }

  /**
   * @return {!Promise<!Buffer>}
   */
  async stop() {
    let fulfill;
    const contentPromise = new Promise(x => fulfill = x);
    this._client.once('Tracing.tracingComplete', event => {
      helper.readProtocolStream(this._client, event.stream, this._path).then(fulfill);
    });
    await this._client.send('Tracing.end');
    this._recording = false;
    return contentPromise;
  }
}

exports_puppeteer_puppeteer_lib_Tracing = Tracing;


/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/USKeyboardLayout.js
*/
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @typedef {Object} KeyDefinition
 * @property {number=} keyCode
 * @property {number=} shiftKeyCode
 * @property {string=} key
 * @property {string=} shiftKey
 * @property {string=} code
 * @property {string=} text
 * @property {string=} shiftText
 * @property {number=} location
 */

/**
 * @type {Object<string, KeyDefinition>}
 */
exports_puppeteer_puppeteer_lib_USKeyboardLayout = {
  '0': {'keyCode': 48, 'key': '0', 'code': 'Digit0'},
  '1': {'keyCode': 49, 'key': '1', 'code': 'Digit1'},
  '2': {'keyCode': 50, 'key': '2', 'code': 'Digit2'},
  '3': {'keyCode': 51, 'key': '3', 'code': 'Digit3'},
  '4': {'keyCode': 52, 'key': '4', 'code': 'Digit4'},
  '5': {'keyCode': 53, 'key': '5', 'code': 'Digit5'},
  '6': {'keyCode': 54, 'key': '6', 'code': 'Digit6'},
  '7': {'keyCode': 55, 'key': '7', 'code': 'Digit7'},
  '8': {'keyCode': 56, 'key': '8', 'code': 'Digit8'},
  '9': {'keyCode': 57, 'key': '9', 'code': 'Digit9'},
  'Power': {'key': 'Power', 'code': 'Power'},
  'Eject': {'key': 'Eject', 'code': 'Eject'},
  'Abort': {'keyCode': 3, 'code': 'Abort', 'key': 'Cancel'},
  'Help': {'keyCode': 6, 'code': 'Help', 'key': 'Help'},
  'Backspace': {'keyCode': 8, 'code': 'Backspace', 'key': 'Backspace'},
  'Tab': {'keyCode': 9, 'code': 'Tab', 'key': 'Tab'},
  'Numpad5': {'keyCode': 12, 'shiftKeyCode': 101, 'key': 'Clear', 'code': 'Numpad5', 'shiftKey': '5', 'location': 3},
  'NumpadEnter': {'keyCode': 13, 'code': 'NumpadEnter', 'key': 'Enter', 'text': '\r', 'location': 3},
  'Enter': {'keyCode': 13, 'code': 'Enter', 'key': 'Enter', 'text': '\r'},
  '\r': {'keyCode': 13, 'code': 'Enter', 'key': 'Enter', 'text': '\r'},
  '\n': {'keyCode': 13, 'code': 'Enter', 'key': 'Enter', 'text': '\r'},
  'ShiftLeft': {'keyCode': 16, 'code': 'ShiftLeft', 'key': 'Shift', 'location': 1},
  'ShiftRight': {'keyCode': 16, 'code': 'ShiftRight', 'key': 'Shift', 'location': 2},
  'ControlLeft': {'keyCode': 17, 'code': 'ControlLeft', 'key': 'Control', 'location': 1},
  'ControlRight': {'keyCode': 17, 'code': 'ControlRight', 'key': 'Control', 'location': 2},
  'AltLeft': {'keyCode': 18, 'code': 'AltLeft', 'key': 'Alt', 'location': 1},
  'AltRight': {'keyCode': 18, 'code': 'AltRight', 'key': 'Alt', 'location': 2},
  'Pause': {'keyCode': 19, 'code': 'Pause', 'key': 'Pause'},
  'CapsLock': {'keyCode': 20, 'code': 'CapsLock', 'key': 'CapsLock'},
  'Escape': {'keyCode': 27, 'code': 'Escape', 'key': 'Escape'},
  'Convert': {'keyCode': 28, 'code': 'Convert', 'key': 'Convert'},
  'NonConvert': {'keyCode': 29, 'code': 'NonConvert', 'key': 'NonConvert'},
  'Space': {'keyCode': 32, 'code': 'Space', 'key': ' '},
  'Numpad9': {'keyCode': 33, 'shiftKeyCode': 105, 'key': 'PageUp', 'code': 'Numpad9', 'shiftKey': '9', 'location': 3},
  'PageUp': {'keyCode': 33, 'code': 'PageUp', 'key': 'PageUp'},
  'Numpad3': {'keyCode': 34, 'shiftKeyCode': 99, 'key': 'PageDown', 'code': 'Numpad3', 'shiftKey': '3', 'location': 3},
  'PageDown': {'keyCode': 34, 'code': 'PageDown', 'key': 'PageDown'},
  'End': {'keyCode': 35, 'code': 'End', 'key': 'End'},
  'Numpad1': {'keyCode': 35, 'shiftKeyCode': 97, 'key': 'End', 'code': 'Numpad1', 'shiftKey': '1', 'location': 3},
  'Home': {'keyCode': 36, 'code': 'Home', 'key': 'Home'},
  'Numpad7': {'keyCode': 36, 'shiftKeyCode': 103, 'key': 'Home', 'code': 'Numpad7', 'shiftKey': '7', 'location': 3},
  'ArrowLeft': {'keyCode': 37, 'code': 'ArrowLeft', 'key': 'ArrowLeft'},
  'Numpad4': {'keyCode': 37, 'shiftKeyCode': 100, 'key': 'ArrowLeft', 'code': 'Numpad4', 'shiftKey': '4', 'location': 3},
  'Numpad8': {'keyCode': 38, 'shiftKeyCode': 104, 'key': 'ArrowUp', 'code': 'Numpad8', 'shiftKey': '8', 'location': 3},
  'ArrowUp': {'keyCode': 38, 'code': 'ArrowUp', 'key': 'ArrowUp'},
  'ArrowRight': {'keyCode': 39, 'code': 'ArrowRight', 'key': 'ArrowRight'},
  'Numpad6': {'keyCode': 39, 'shiftKeyCode': 102, 'key': 'ArrowRight', 'code': 'Numpad6', 'shiftKey': '6', 'location': 3},
  'Numpad2': {'keyCode': 40, 'shiftKeyCode': 98, 'key': 'ArrowDown', 'code': 'Numpad2', 'shiftKey': '2', 'location': 3},
  'ArrowDown': {'keyCode': 40, 'code': 'ArrowDown', 'key': 'ArrowDown'},
  'Select': {'keyCode': 41, 'code': 'Select', 'key': 'Select'},
  'Open': {'keyCode': 43, 'code': 'Open', 'key': 'Execute'},
  'PrintScreen': {'keyCode': 44, 'code': 'PrintScreen', 'key': 'PrintScreen'},
  'Insert': {'keyCode': 45, 'code': 'Insert', 'key': 'Insert'},
  'Numpad0': {'keyCode': 45, 'shiftKeyCode': 96, 'key': 'Insert', 'code': 'Numpad0', 'shiftKey': '0', 'location': 3},
  'Delete': {'keyCode': 46, 'code': 'Delete', 'key': 'Delete'},
  'NumpadDecimal': {'keyCode': 46, 'shiftKeyCode': 110, 'code': 'NumpadDecimal', 'key': '\u0000', 'shiftKey': '.', 'location': 3},
  'Digit0': {'keyCode': 48, 'code': 'Digit0', 'shiftKey': ')', 'key': '0'},
  'Digit1': {'keyCode': 49, 'code': 'Digit1', 'shiftKey': '!', 'key': '1'},
  'Digit2': {'keyCode': 50, 'code': 'Digit2', 'shiftKey': '@', 'key': '2'},
  'Digit3': {'keyCode': 51, 'code': 'Digit3', 'shiftKey': '#', 'key': '3'},
  'Digit4': {'keyCode': 52, 'code': 'Digit4', 'shiftKey': '$', 'key': '4'},
  'Digit5': {'keyCode': 53, 'code': 'Digit5', 'shiftKey': '%', 'key': '5'},
  'Digit6': {'keyCode': 54, 'code': 'Digit6', 'shiftKey': '^', 'key': '6'},
  'Digit7': {'keyCode': 55, 'code': 'Digit7', 'shiftKey': '&', 'key': '7'},
  'Digit8': {'keyCode': 56, 'code': 'Digit8', 'shiftKey': '*', 'key': '8'},
  'Digit9': {'keyCode': 57, 'code': 'Digit9', 'shiftKey': '\(', 'key': '9'},
  'KeyA': {'keyCode': 65, 'code': 'KeyA', 'shiftKey': 'A', 'key': 'a'},
  'KeyB': {'keyCode': 66, 'code': 'KeyB', 'shiftKey': 'B', 'key': 'b'},
  'KeyC': {'keyCode': 67, 'code': 'KeyC', 'shiftKey': 'C', 'key': 'c'},
  'KeyD': {'keyCode': 68, 'code': 'KeyD', 'shiftKey': 'D', 'key': 'd'},
  'KeyE': {'keyCode': 69, 'code': 'KeyE', 'shiftKey': 'E', 'key': 'e'},
  'KeyF': {'keyCode': 70, 'code': 'KeyF', 'shiftKey': 'F', 'key': 'f'},
  'KeyG': {'keyCode': 71, 'code': 'KeyG', 'shiftKey': 'G', 'key': 'g'},
  'KeyH': {'keyCode': 72, 'code': 'KeyH', 'shiftKey': 'H', 'key': 'h'},
  'KeyI': {'keyCode': 73, 'code': 'KeyI', 'shiftKey': 'I', 'key': 'i'},
  'KeyJ': {'keyCode': 74, 'code': 'KeyJ', 'shiftKey': 'J', 'key': 'j'},
  'KeyK': {'keyCode': 75, 'code': 'KeyK', 'shiftKey': 'K', 'key': 'k'},
  'KeyL': {'keyCode': 76, 'code': 'KeyL', 'shiftKey': 'L', 'key': 'l'},
  'KeyM': {'keyCode': 77, 'code': 'KeyM', 'shiftKey': 'M', 'key': 'm'},
  'KeyN': {'keyCode': 78, 'code': 'KeyN', 'shiftKey': 'N', 'key': 'n'},
  'KeyO': {'keyCode': 79, 'code': 'KeyO', 'shiftKey': 'O', 'key': 'o'},
  'KeyP': {'keyCode': 80, 'code': 'KeyP', 'shiftKey': 'P', 'key': 'p'},
  'KeyQ': {'keyCode': 81, 'code': 'KeyQ', 'shiftKey': 'Q', 'key': 'q'},
  'KeyR': {'keyCode': 82, 'code': 'KeyR', 'shiftKey': 'R', 'key': 'r'},
  'KeyS': {'keyCode': 83, 'code': 'KeyS', 'shiftKey': 'S', 'key': 's'},
  'KeyT': {'keyCode': 84, 'code': 'KeyT', 'shiftKey': 'T', 'key': 't'},
  'KeyU': {'keyCode': 85, 'code': 'KeyU', 'shiftKey': 'U', 'key': 'u'},
  'KeyV': {'keyCode': 86, 'code': 'KeyV', 'shiftKey': 'V', 'key': 'v'},
  'KeyW': {'keyCode': 87, 'code': 'KeyW', 'shiftKey': 'W', 'key': 'w'},
  'KeyX': {'keyCode': 88, 'code': 'KeyX', 'shiftKey': 'X', 'key': 'x'},
  'KeyY': {'keyCode': 89, 'code': 'KeyY', 'shiftKey': 'Y', 'key': 'y'},
  'KeyZ': {'keyCode': 90, 'code': 'KeyZ', 'shiftKey': 'Z', 'key': 'z'},
  'MetaLeft': {'keyCode': 91, 'code': 'MetaLeft', 'key': 'Meta', 'location': 1},
  'MetaRight': {'keyCode': 92, 'code': 'MetaRight', 'key': 'Meta', 'location': 2},
  'ContextMenu': {'keyCode': 93, 'code': 'ContextMenu', 'key': 'ContextMenu'},
  'NumpadMultiply': {'keyCode': 106, 'code': 'NumpadMultiply', 'key': '*', 'location': 3},
  'NumpadAdd': {'keyCode': 107, 'code': 'NumpadAdd', 'key': '+', 'location': 3},
  'NumpadSubtract': {'keyCode': 109, 'code': 'NumpadSubtract', 'key': '-', 'location': 3},
  'NumpadDivide': {'keyCode': 111, 'code': 'NumpadDivide', 'key': '/', 'location': 3},
  'F1': {'keyCode': 112, 'code': 'F1', 'key': 'F1'},
  'F2': {'keyCode': 113, 'code': 'F2', 'key': 'F2'},
  'F3': {'keyCode': 114, 'code': 'F3', 'key': 'F3'},
  'F4': {'keyCode': 115, 'code': 'F4', 'key': 'F4'},
  'F5': {'keyCode': 116, 'code': 'F5', 'key': 'F5'},
  'F6': {'keyCode': 117, 'code': 'F6', 'key': 'F6'},
  'F7': {'keyCode': 118, 'code': 'F7', 'key': 'F7'},
  'F8': {'keyCode': 119, 'code': 'F8', 'key': 'F8'},
  'F9': {'keyCode': 120, 'code': 'F9', 'key': 'F9'},
  'F10': {'keyCode': 121, 'code': 'F10', 'key': 'F10'},
  'F11': {'keyCode': 122, 'code': 'F11', 'key': 'F11'},
  'F12': {'keyCode': 123, 'code': 'F12', 'key': 'F12'},
  'F13': {'keyCode': 124, 'code': 'F13', 'key': 'F13'},
  'F14': {'keyCode': 125, 'code': 'F14', 'key': 'F14'},
  'F15': {'keyCode': 126, 'code': 'F15', 'key': 'F15'},
  'F16': {'keyCode': 127, 'code': 'F16', 'key': 'F16'},
  'F17': {'keyCode': 128, 'code': 'F17', 'key': 'F17'},
  'F18': {'keyCode': 129, 'code': 'F18', 'key': 'F18'},
  'F19': {'keyCode': 130, 'code': 'F19', 'key': 'F19'},
  'F20': {'keyCode': 131, 'code': 'F20', 'key': 'F20'},
  'F21': {'keyCode': 132, 'code': 'F21', 'key': 'F21'},
  'F22': {'keyCode': 133, 'code': 'F22', 'key': 'F22'},
  'F23': {'keyCode': 134, 'code': 'F23', 'key': 'F23'},
  'F24': {'keyCode': 135, 'code': 'F24', 'key': 'F24'},
  'NumLock': {'keyCode': 144, 'code': 'NumLock', 'key': 'NumLock'},
  'ScrollLock': {'keyCode': 145, 'code': 'ScrollLock', 'key': 'ScrollLock'},
  'AudioVolumeMute': {'keyCode': 173, 'code': 'AudioVolumeMute', 'key': 'AudioVolumeMute'},
  'AudioVolumeDown': {'keyCode': 174, 'code': 'AudioVolumeDown', 'key': 'AudioVolumeDown'},
  'AudioVolumeUp': {'keyCode': 175, 'code': 'AudioVolumeUp', 'key': 'AudioVolumeUp'},
  'MediaTrackNext': {'keyCode': 176, 'code': 'MediaTrackNext', 'key': 'MediaTrackNext'},
  'MediaTrackPrevious': {'keyCode': 177, 'code': 'MediaTrackPrevious', 'key': 'MediaTrackPrevious'},
  'MediaStop': {'keyCode': 178, 'code': 'MediaStop', 'key': 'MediaStop'},
  'MediaPlayPause': {'keyCode': 179, 'code': 'MediaPlayPause', 'key': 'MediaPlayPause'},
  'Semicolon': {'keyCode': 186, 'code': 'Semicolon', 'shiftKey': ':', 'key': ';'},
  'Equal': {'keyCode': 187, 'code': 'Equal', 'shiftKey': '+', 'key': '='},
  'NumpadEqual': {'keyCode': 187, 'code': 'NumpadEqual', 'key': '=', 'location': 3},
  'Comma': {'keyCode': 188, 'code': 'Comma', 'shiftKey': '\<', 'key': ','},
  'Minus': {'keyCode': 189, 'code': 'Minus', 'shiftKey': '_', 'key': '-'},
  'Period': {'keyCode': 190, 'code': 'Period', 'shiftKey': '>', 'key': '.'},
  'Slash': {'keyCode': 191, 'code': 'Slash', 'shiftKey': '?', 'key': '/'},
  'Backquote': {'keyCode': 192, 'code': 'Backquote', 'shiftKey': '~', 'key': '`'},
  'BracketLeft': {'keyCode': 219, 'code': 'BracketLeft', 'shiftKey': '{', 'key': '['},
  'Backslash': {'keyCode': 220, 'code': 'Backslash', 'shiftKey': '|', 'key': '\\'},
  'BracketRight': {'keyCode': 221, 'code': 'BracketRight', 'shiftKey': '}', 'key': ']'},
  'Quote': {'keyCode': 222, 'code': 'Quote', 'shiftKey': '"', 'key': '\''},
  'AltGraph': {'keyCode': 225, 'code': 'AltGraph', 'key': 'AltGraph'},
  'Props': {'keyCode': 247, 'code': 'Props', 'key': 'CrSel'},
  'Cancel': {'keyCode': 3, 'key': 'Cancel', 'code': 'Abort'},
  'Clear': {'keyCode': 12, 'key': 'Clear', 'code': 'Numpad5', 'location': 3},
  'Shift': {'keyCode': 16, 'key': 'Shift', 'code': 'ShiftLeft', 'location': 1},
  'Control': {'keyCode': 17, 'key': 'Control', 'code': 'ControlLeft', 'location': 1},
  'Alt': {'keyCode': 18, 'key': 'Alt', 'code': 'AltLeft', 'location': 1},
  'Accept': {'keyCode': 30, 'key': 'Accept'},
  'ModeChange': {'keyCode': 31, 'key': 'ModeChange'},
  ' ': {'keyCode': 32, 'key': ' ', 'code': 'Space'},
  'Print': {'keyCode': 42, 'key': 'Print'},
  'Execute': {'keyCode': 43, 'key': 'Execute', 'code': 'Open'},
  '\u0000': {'keyCode': 46, 'key': '\u0000', 'code': 'NumpadDecimal', 'location': 3},
  'a': {'keyCode': 65, 'key': 'a', 'code': 'KeyA'},
  'b': {'keyCode': 66, 'key': 'b', 'code': 'KeyB'},
  'c': {'keyCode': 67, 'key': 'c', 'code': 'KeyC'},
  'd': {'keyCode': 68, 'key': 'd', 'code': 'KeyD'},
  'e': {'keyCode': 69, 'key': 'e', 'code': 'KeyE'},
  'f': {'keyCode': 70, 'key': 'f', 'code': 'KeyF'},
  'g': {'keyCode': 71, 'key': 'g', 'code': 'KeyG'},
  'h': {'keyCode': 72, 'key': 'h', 'code': 'KeyH'},
  'i': {'keyCode': 73, 'key': 'i', 'code': 'KeyI'},
  'j': {'keyCode': 74, 'key': 'j', 'code': 'KeyJ'},
  'k': {'keyCode': 75, 'key': 'k', 'code': 'KeyK'},
  'l': {'keyCode': 76, 'key': 'l', 'code': 'KeyL'},
  'm': {'keyCode': 77, 'key': 'm', 'code': 'KeyM'},
  'n': {'keyCode': 78, 'key': 'n', 'code': 'KeyN'},
  'o': {'keyCode': 79, 'key': 'o', 'code': 'KeyO'},
  'p': {'keyCode': 80, 'key': 'p', 'code': 'KeyP'},
  'q': {'keyCode': 81, 'key': 'q', 'code': 'KeyQ'},
  'r': {'keyCode': 82, 'key': 'r', 'code': 'KeyR'},
  's': {'keyCode': 83, 'key': 's', 'code': 'KeyS'},
  't': {'keyCode': 84, 'key': 't', 'code': 'KeyT'},
  'u': {'keyCode': 85, 'key': 'u', 'code': 'KeyU'},
  'v': {'keyCode': 86, 'key': 'v', 'code': 'KeyV'},
  'w': {'keyCode': 87, 'key': 'w', 'code': 'KeyW'},
  'x': {'keyCode': 88, 'key': 'x', 'code': 'KeyX'},
  'y': {'keyCode': 89, 'key': 'y', 'code': 'KeyY'},
  'z': {'keyCode': 90, 'key': 'z', 'code': 'KeyZ'},
  'Meta': {'keyCode': 91, 'key': 'Meta', 'code': 'MetaLeft', 'location': 1},
  '*': {'keyCode': 106, 'key': '*', 'code': 'NumpadMultiply', 'location': 3},
  '+': {'keyCode': 107, 'key': '+', 'code': 'NumpadAdd', 'location': 3},
  '-': {'keyCode': 109, 'key': '-', 'code': 'NumpadSubtract', 'location': 3},
  '/': {'keyCode': 111, 'key': '/', 'code': 'NumpadDivide', 'location': 3},
  ';': {'keyCode': 186, 'key': ';', 'code': 'Semicolon'},
  '=': {'keyCode': 187, 'key': '=', 'code': 'Equal'},
  ',': {'keyCode': 188, 'key': ',', 'code': 'Comma'},
  '.': {'keyCode': 190, 'key': '.', 'code': 'Period'},
  '`': {'keyCode': 192, 'key': '`', 'code': 'Backquote'},
  '[': {'keyCode': 219, 'key': '[', 'code': 'BracketLeft'},
  '\\': {'keyCode': 220, 'key': '\\', 'code': 'Backslash'},
  ']': {'keyCode': 221, 'key': ']', 'code': 'BracketRight'},
  '\'': {'keyCode': 222, 'key': '\'', 'code': 'Quote'},
  'Attn': {'keyCode': 246, 'key': 'Attn'},
  'CrSel': {'keyCode': 247, 'key': 'CrSel', 'code': 'Props'},
  'ExSel': {'keyCode': 248, 'key': 'ExSel'},
  'EraseEof': {'keyCode': 249, 'key': 'EraseEof'},
  'Play': {'keyCode': 250, 'key': 'Play'},
  'ZoomOut': {'keyCode': 251, 'key': 'ZoomOut'},
  ')': {'keyCode': 48, 'key': ')', 'code': 'Digit0'},
  '!': {'keyCode': 49, 'key': '!', 'code': 'Digit1'},
  '@': {'keyCode': 50, 'key': '@', 'code': 'Digit2'},
  '#': {'keyCode': 51, 'key': '#', 'code': 'Digit3'},
  '$': {'keyCode': 52, 'key': '$', 'code': 'Digit4'},
  '%': {'keyCode': 53, 'key': '%', 'code': 'Digit5'},
  '^': {'keyCode': 54, 'key': '^', 'code': 'Digit6'},
  '&': {'keyCode': 55, 'key': '&', 'code': 'Digit7'},
  '(': {'keyCode': 57, 'key': '\(', 'code': 'Digit9'},
  'A': {'keyCode': 65, 'key': 'A', 'code': 'KeyA'},
  'B': {'keyCode': 66, 'key': 'B', 'code': 'KeyB'},
  'C': {'keyCode': 67, 'key': 'C', 'code': 'KeyC'},
  'D': {'keyCode': 68, 'key': 'D', 'code': 'KeyD'},
  'E': {'keyCode': 69, 'key': 'E', 'code': 'KeyE'},
  'F': {'keyCode': 70, 'key': 'F', 'code': 'KeyF'},
  'G': {'keyCode': 71, 'key': 'G', 'code': 'KeyG'},
  'H': {'keyCode': 72, 'key': 'H', 'code': 'KeyH'},
  'I': {'keyCode': 73, 'key': 'I', 'code': 'KeyI'},
  'J': {'keyCode': 74, 'key': 'J', 'code': 'KeyJ'},
  'K': {'keyCode': 75, 'key': 'K', 'code': 'KeyK'},
  'L': {'keyCode': 76, 'key': 'L', 'code': 'KeyL'},
  'M': {'keyCode': 77, 'key': 'M', 'code': 'KeyM'},
  'N': {'keyCode': 78, 'key': 'N', 'code': 'KeyN'},
  'O': {'keyCode': 79, 'key': 'O', 'code': 'KeyO'},
  'P': {'keyCode': 80, 'key': 'P', 'code': 'KeyP'},
  'Q': {'keyCode': 81, 'key': 'Q', 'code': 'KeyQ'},
  'R': {'keyCode': 82, 'key': 'R', 'code': 'KeyR'},
  'S': {'keyCode': 83, 'key': 'S', 'code': 'KeyS'},
  'T': {'keyCode': 84, 'key': 'T', 'code': 'KeyT'},
  'U': {'keyCode': 85, 'key': 'U', 'code': 'KeyU'},
  'V': {'keyCode': 86, 'key': 'V', 'code': 'KeyV'},
  'W': {'keyCode': 87, 'key': 'W', 'code': 'KeyW'},
  'X': {'keyCode': 88, 'key': 'X', 'code': 'KeyX'},
  'Y': {'keyCode': 89, 'key': 'Y', 'code': 'KeyY'},
  'Z': {'keyCode': 90, 'key': 'Z', 'code': 'KeyZ'},
  ':': {'keyCode': 186, 'key': ':', 'code': 'Semicolon'},
  '<': {'keyCode': 188, 'key': '\<', 'code': 'Comma'},
  '_': {'keyCode': 189, 'key': '_', 'code': 'Minus'},
  '>': {'keyCode': 190, 'key': '>', 'code': 'Period'},
  '?': {'keyCode': 191, 'key': '?', 'code': 'Slash'},
  '~': {'keyCode': 192, 'key': '~', 'code': 'Backquote'},
  '{': {'keyCode': 219, 'key': '{', 'code': 'BracketLeft'},
  '|': {'keyCode': 220, 'key': '|', 'code': 'Backslash'},
  '}': {'keyCode': 221, 'key': '}', 'code': 'BracketRight'},
  '"': {'keyCode': 222, 'key': '"', 'code': 'Quote'},
  'SoftLeft': {'key': 'SoftLeft', 'code': 'SoftLeft', 'location': 4},
  'SoftRight': {'key': 'SoftRight', 'code': 'SoftRight', 'location': 4},
  'Camera': {'keyCode': 44, 'key': 'Camera', 'code': 'Camera', 'location': 4},
  'Call': {'key': 'Call', 'code': 'Call', 'location': 4},
  'EndCall': {'keyCode': 95, 'key': 'EndCall', 'code': 'EndCall', 'location': 4},
  'VolumeDown': {'keyCode': 182, 'key': 'VolumeDown', 'code': 'VolumeDown', 'location': 4},
  'VolumeUp': {'keyCode': 183, 'key': 'VolumeUp', 'code': 'VolumeUp', 'location': 4},
};


/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/WebSocketTransport.js
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
// const WebSocket = require('ws');

/**
 * @implements {!Puppeteer.ConnectionTransport}
 */
class WebSocketTransport {
  /**
   * @param {string} url
   * @return {!Promise<!WebSocketTransport>}
   */
  static create(url) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(url, [], {
        perMessageDeflate: false,
        maxPayload: 256 * 1024 * 1024, // 256Mb
      });
      ws.addEventListener('open', () => resolve(new WebSocketTransport(ws)));
      ws.addEventListener('error', reject);
    });
  }

  /**
   * @param {!WebSocket} ws
   */
  constructor(ws) {
    this._ws = ws;
    this._ws.addEventListener('message', event => {
      if (this.onmessage)
        this.onmessage.call(null, event.data);
    });
    this._ws.addEventListener('close', event => {
      if (this.onclose)
        this.onclose.call(null);
    });
    // Silently ignore all errors - we don't know what to do with them.
    this._ws.addEventListener('error', () => {});
    this.onmessage = null;
    this.onclose = null;
  }

  /**
   * @param {string} message
   */
  send(message) {
    this._ws.send(message);
  }

  close() {
    this._ws.close();
  }
}

exports_puppeteer_puppeteer_lib_WebSocketTransport = WebSocketTransport;


/*
file https://github.com/puppeteer/puppeteer/blob/v1.19.0/lib/Worker.js
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
// const EventEmitter = require('events');
// const {debugError} = exports_puppeteer_puppeteer_lib_helper;
// const {ExecutionContext} = exports_puppeteer_puppeteer_lib_ExecutionContext;
// const {JSHandle} = exports_puppeteer_puppeteer_lib_JSHandle;

class Worker extends EventEmitter {
  /**
   * @param {Puppeteer.CDPSession} client
   * @param {string} url
   * @param {function(string, !Array<!JSHandle>, Protocol.Runtime.StackTrace=):void} consoleAPICalled
   * @param {function(!Protocol.Runtime.ExceptionDetails):void} exceptionThrown
   */
  constructor(client, url, consoleAPICalled, exceptionThrown) {
    super();
    this._client = client;
    this._url = url;
    this._executionContextPromise = new Promise(x => this._executionContextCallback = x);
    /** @type {function(!Protocol.Runtime.RemoteObject):!JSHandle} */
    let jsHandleFactory;
    this._client.once('Runtime.executionContextCreated', async event => {
      jsHandleFactory = remoteObject => new JSHandle(executionContext, client, remoteObject);
      const executionContext = new ExecutionContext(client, event.context, null);
      this._executionContextCallback(executionContext);
    });
    // This might fail if the target is closed before we recieve all execution contexts.
    this._client.send('Runtime.enable', {}).catch(debugError);

    this._client.on('Runtime.consoleAPICalled', event => consoleAPICalled(event.type, event.args.map(jsHandleFactory), event.stackTrace));
    this._client.on('Runtime.exceptionThrown', exception => exceptionThrown(exception.exceptionDetails));
  }

  /**
   * @return {string}
   */
  url() {
    return this._url;
  }

  /**
   * @return {!Promise<ExecutionContext>}
   */
  async executionContext() {
    return this._executionContextPromise;
  }

  /**
   * @param {Function|string} pageFunction
   * @param {!Array<*>} args
   * @return {!Promise<*>}
   */
  async evaluate(pageFunction, ...args) {
    return (await this._executionContextPromise).evaluate(pageFunction, ...args);
  }

  /**
   * @param {Function|string} pageFunction
   * @param {!Array<*>} args
   * @return {!Promise<!JSHandle>}
   */
  async evaluateHandle(pageFunction, ...args) {
    return (await this._executionContextPromise).evaluateHandle(pageFunction, ...args);
  }
}

exports_puppeteer_puppeteer_lib_Worker = {Worker};


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
  Accessibility: exports_puppeteer_puppeteer_lib_Accessibility.Accessibility,
  Browser: exports_puppeteer_puppeteer_lib_Browser.Browser,
  BrowserContext: exports_puppeteer_puppeteer_lib_Browser.BrowserContext,
  BrowserFetcher: exports_puppeteer_puppeteer_lib_BrowserFetcher,
  CDPSession: exports_puppeteer_puppeteer_lib_Connection.CDPSession,
  ConsoleMessage: exports_puppeteer_puppeteer_lib_Page.ConsoleMessage,
  Coverage: exports_puppeteer_puppeteer_lib_Coverage.Coverage,
  Dialog: exports_puppeteer_puppeteer_lib_Dialog.Dialog,
  ElementHandle: exports_puppeteer_puppeteer_lib_JSHandle.ElementHandle,
  ExecutionContext: exports_puppeteer_puppeteer_lib_ExecutionContext.ExecutionContext,
  FileChooser: exports_puppeteer_puppeteer_lib_Page.FileChooser,
  Frame: exports_puppeteer_puppeteer_lib_FrameManager.Frame,
  JSHandle: exports_puppeteer_puppeteer_lib_JSHandle.JSHandle,
  Keyboard: exports_puppeteer_puppeteer_lib_Input.Keyboard,
  Mouse: exports_puppeteer_puppeteer_lib_Input.Mouse,
  Page: exports_puppeteer_puppeteer_lib_Page.Page,
  Puppeteer: exports_puppeteer_puppeteer_lib_Puppeteer,
  Request: exports_puppeteer_puppeteer_lib_NetworkManager.Request,
  Response: exports_puppeteer_puppeteer_lib_NetworkManager.Response,
  SecurityDetails: exports_puppeteer_puppeteer_lib_NetworkManager.SecurityDetails,
  Target: exports_puppeteer_puppeteer_lib_Target.Target,
  TimeoutError: exports_puppeteer_puppeteer_lib_Errors.TimeoutError,
  Touchscreen: exports_puppeteer_puppeteer_lib_Input.Touchscreen,
  Tracing: exports_puppeteer_puppeteer_lib_Tracing,
  Worker: exports_puppeteer_puppeteer_lib_Worker.Worker,
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

let asyncawait = true;
try {
  new Function('async function test(){await 1}');
} catch (error) {
  asyncawait = false;
}

if (asyncawait) {
//   const {helper} = exports_puppeteer_puppeteer_lib_helper;
     const api = exports_puppeteer_puppeteer_lib_api;
  for (const className in api) {
    // Puppeteer-web excludes certain classes from bundle, e.g. BrowserFetcher.
    if (typeof api[className] === 'function')
      helper.installAsyncStackHooks(api[className]);
  }
}

// If node does not support async await, use the compiled version.
const Puppeteer = asyncawait ? exports_puppeteer_puppeteer_lib_Puppeteer : exports_puppeteer_puppeteer_node6_lib_Puppeteer;
const packageJson = exports_puppeteer_puppeteer_package_json;
const preferredRevision = packageJson.puppeteer.chromium_revision;
const isPuppeteerCore = packageJson.name === 'puppeteer-core';

exports_puppeteer_puppeteer_index = new Puppeteer(__dirname, preferredRevision, isPuppeteerCore);
// let Accessibility   = exports_puppeteer_puppeteer_lib_Accessibility.Accessibility;
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
// let Keyboard        = exports_puppeteer_puppeteer_lib_Input.Keyboard;
// let Mouse           = exports_puppeteer_puppeteer_lib_Input.Mouse;
// let Touchscreen     = exports_puppeteer_puppeteer_lib_Input.Touchscreen;
// let JSHandle        = exports_puppeteer_puppeteer_lib_JSHandle.JSHandle;
// let createJSHandle  = exports_puppeteer_puppeteer_lib_JSHandle.createJSHandle;
// let Launcher        = exports_puppeteer_puppeteer_lib_Launcher;
// let LifecycleWatcher = exports_puppeteer_puppeteer_lib_LifecycleWatcher.LifecycleWatcher;
// let NetworkManager  = exports_puppeteer_puppeteer_lib_NetworkManager.NetworkManager;
// let Page            = exports_puppeteer_puppeteer_lib_Page.Page;
// let PipeTransport   = exports_puppeteer_puppeteer_lib_PipeTransport;
// let Target          = exports_puppeteer_puppeteer_lib_Target.Target;
// let TaskQueue       = exports_puppeteer_puppeteer_lib_TaskQueue.TaskQueue;
// let TimeoutSettings = exports_puppeteer_puppeteer_lib_TimeoutSettings.TimeoutSettings;
// let Tracing         = exports_puppeteer_puppeteer_lib_Tracing;
let keyDefinitions  = exports_puppeteer_puppeteer_lib_USKeyboardLayout;
// let WebSocketTransport = exports_puppeteer_puppeteer_lib_WebSocketTransport;
// let Worker          = exports_puppeteer_puppeteer_lib_Worker.Worker;
let api             = exports_puppeteer_puppeteer_lib_api;
// let assert          = exports_puppeteer_puppeteer_lib_helper.assert;
// let debugError      = exports_puppeteer_puppeteer_lib_helper.debugError;
// let helper          = exports_puppeteer_puppeteer_lib_helper.helper;
// let packageJson     = exports_puppeteer_puppeteer_package_json;
let applyMask       = exports_websockets_ws_lib_buffer_util.mask;
// let concat          = exports_websockets_ws_lib_buffer_util.concat;
// let mask            = exports_websockets_ws_lib_buffer_util.mask;
// let toArrayBuffer   = exports_websockets_ws_lib_buffer_util.toArrayBuffer;
// let toBuffer        = exports_websockets_ws_lib_buffer_util.toBuffer;
let unmask          = exports_websockets_ws_lib_buffer_util.unmask;
let BINARY_TYPES    = exports_websockets_ws_lib_constants.BINARY_TYPES;
let EMPTY_BUFFER    = exports_websockets_ws_lib_constants.EMPTY_BUFFER;
let GUID            = exports_websockets_ws_lib_constants.GUID;
let NOOP            = exports_websockets_ws_lib_constants.NOOP;
let kStatusCode     = exports_websockets_ws_lib_constants.kStatusCode;
let kWebSocket      = exports_websockets_ws_lib_constants.kWebSocket;
// let EventTarget     = exports_websockets_ws_lib_event_target;
let extension       = exports_websockets_ws_lib_extension;
let PerMessageDeflate = exports_websockets_ws_lib_permessage_deflate;
// let Receiver        = exports_websockets_ws_lib_receiver;
// let Sender          = exports_websockets_ws_lib_sender;
let isValidStatusCode = exports_websockets_ws_lib_validation.isValidStatusCode;
let isValidUTF8     = exports_websockets_ws_lib_validation.isValidUTF8;
// let WebSocket       = exports_websockets_ws_lib_websocket;
local._puppeteer = exports_puppeteer_puppeteer_index;
local.puppeteerApi = exports_puppeteer_puppeteer_lib_api;
local.puppeteerLaunch = local._puppeteer.launch.bind(local._puppeteer);
local.nop(local.puppeteerLaunch);


/*
file none
*/
/* jslint ignore:end */
// run the cli
if (module === require.main && !globalThis.utility2_rollup) {
    local.cliRun();
}
}());
}());
