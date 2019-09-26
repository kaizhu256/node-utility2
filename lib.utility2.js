#!/usr/bin/env node
/*
 * lib.utility2.js (2019.9.17)
 * https://github.com/kaizhu256/node-utility2
 * this zero-dependency package will provide high-level functions to to build, test, and deploy webapps
 *
 */



/* istanbul instrument in package utility2 */
// assets.utility2.header.js - start
/* istanbul ignore next */
/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    let ArrayPrototypeFlat;
    let TextXxcoder;
    let consoleError;
    let debugName;
    let local;
    debugName = "debug" + String("Inline");
    // init globalThis
    globalThis.globalThis = globalThis.globalThis || globalThis;
    // init debug_inline
    if (!globalThis[debugName]) {
        consoleError = console.error;
        globalThis[debugName] = function (...argList) {
        /*
         * this function will both print <argList> to stderr
         * and return <argList>[0]
         */
            consoleError("\n\n" + debugName);
            consoleError.apply(console, argList);
            consoleError("\n");
            // return arg0 for inspection
            return argList[0];
        };
    }
    // polyfill
    ArrayPrototypeFlat = function (depth) {
    /*
     * this function will polyfill Array.prototype.flat
     * https://github.com/jonathantneal/array-flat-polyfill
     */
        depth = (
            globalThis.isNaN(depth)
            ? 1
            : Number(depth)
        );
        if (!depth) {
            return Array.prototype.slice.call(this);
        }
        return Array.prototype.reduce.call(this, function (acc, cur) {
            if (Array.isArray(cur)) {
                // recurse
                acc.push.apply(acc, ArrayPrototypeFlat.call(cur, depth - 1));
            } else {
                acc.push(cur);
            }
            return acc;
        }, []);
    };
    Array.prototype.flat = Array.prototype.flat || ArrayPrototypeFlat;
    Array.prototype.flatMap = Array.prototype.flatMap || function flatMap(
        ...argList
    ) {
    /*
     * this function will polyfill Array.prototype.flatMap
     * https://github.com/jonathantneal/array-flat-polyfill
     */
        return this.map(...argList).flat();
    };
    (function () {
        try {
            globalThis.TextDecoder = (
                globalThis.TextDecoder || require("util").TextDecoder
            );
            globalThis.TextEncoder = (
                globalThis.TextEncoder || require("util").TextEncoder
            );
        } catch (ignore) {}
    }());
    TextXxcoder = function () {
    /*
     * this function will polyfill TextDecoder/TextEncoder
     * https://gist.github.com/Yaffle/5458286
     */
        return;
    };
    TextXxcoder.prototype.decode = function (octets) {
    /*
     * this function will polyfill TextDecoder.prototype.decode
     * https://gist.github.com/Yaffle/5458286
     */
        let bytesNeeded;
        let codePoint;
        let ii;
        let kk;
        let octet;
        let string;
        string = "";
        ii = 0;
        while (ii < octets.length) {
            octet = octets[ii];
            bytesNeeded = 0;
            codePoint = 0;
            if (octet <= 0x7F) {
                bytesNeeded = 0;
                codePoint = octet & 0xFF;
            } else if (octet <= 0xDF) {
                bytesNeeded = 1;
                codePoint = octet & 0x1F;
            } else if (octet <= 0xEF) {
                bytesNeeded = 2;
                codePoint = octet & 0x0F;
            } else if (octet <= 0xF4) {
                bytesNeeded = 3;
                codePoint = octet & 0x07;
            }
            if (octets.length - ii - bytesNeeded > 0) {
                kk = 0;
                while (kk < bytesNeeded) {
                    octet = octets[ii + kk + 1];
                    codePoint = (codePoint << 6) | (octet & 0x3F);
                    kk += 1;
                }
            } else {
                codePoint = 0xFFFD;
                bytesNeeded = octets.length - ii;
            }
            string += String.fromCodePoint(codePoint);
            ii += bytesNeeded + 1;
        }
        return string;
    };
    TextXxcoder.prototype.encode = function (string) {
    /*
     * this function will polyfill TextEncoder.prototype.encode
     * https://gist.github.com/Yaffle/5458286
     */
        let bits;
        let cc;
        let codePoint;
        let ii;
        let length;
        let octets;
        octets = [];
        length = string.length;
        ii = 0;
        while (ii < length) {
            codePoint = string.codePointAt(ii);
            cc = 0;
            bits = 0;
            if (codePoint <= 0x0000007F) {
                cc = 0;
                bits = 0x00;
            } else if (codePoint <= 0x000007FF) {
                cc = 6;
                bits = 0xC0;
            } else if (codePoint <= 0x0000FFFF) {
                cc = 12;
                bits = 0xE0;
            } else if (codePoint <= 0x001FFFFF) {
                cc = 18;
                bits = 0xF0;
            }
            octets.push(bits | (codePoint >> cc));
            cc -= 6;
            while (cc >= 0) {
                octets.push(0x80 | ((codePoint >> cc) & 0x3F));
                cc -= 6;
            }
            ii += (
                codePoint >= 0x10000
                ? 2
                : 1
            );
        }
        return octets;
    };
    globalThis.TextDecoder = globalThis.TextDecoder || TextXxcoder;
    globalThis.TextEncoder = globalThis.TextEncoder || TextXxcoder;
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
        local.isBrowser && typeof globalThis.importScript === "function"
    );
    // init function
    local.assertOrThrow = function (passed, message) {
    /*
     * this function will throw err.<message> if <passed> is falsy
     */
        let err;
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
                : JSON.stringify(message, undefined, 4)
            )
        );
        throw err;
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
            if (arg !== null && arg !== undefined && arg !== "") {
                break;
            }
            ii += 1;
        }
        return arg;
    };
    local.fsRmrfSync = function (dir) {
    /*
     * this function will sync "rm -rf" <dir>
     */
        let child_process;
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
        let fs;
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
     * return <fnc>,
     * else return <nop>
     */
        return fnc || local.nop;
    };
    local.nop = function () {
    /*
     * this function will do nothing
     */
        return;
    };
    local.objectAssignDefault = function (target, source) {
    /*
     * this function will if items from <target> are null, undefined, or "",
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
    local.querySelector = function (selectors) {
    /*
     * this function will return first dom-elem that match <selectors>
     */
        return (
            typeof document === "object" && document
            && typeof document.querySelector === "function"
            && document.querySelector(selectors)
        ) || {};
    };
    local.querySelectorAll = function (selectors) {
    /*
     * this function will return dom-elem-list that match <selectors>
     */
        return (
            typeof document === "object" && document
            && typeof document.querySelectorAll === "function"
            && Array.from(document.querySelectorAll(selectors))
        ) || [];
    };
    local.value = function (val) {
    /*
     * this function will return <val>
     */
        return val;
    };
    local.valueOrEmptyList = function (val) {
    /*
     * this function will return <val> or []
     */
        return val || [];
    };
    local.valueOrEmptyObject = function (val) {
    /*
     * this function will return <val> or {}
     */
        return val || {};
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
    globalThis.utility2_utility2 = local;
} else {
    module.exports = local;
    module.exports.__dirname = __dirname;
}
// init lib main
local.utility2 = local;



/* validateLineSortedReset */
// init lib utility2
globalThis.utility2 = local;
// init lib extra
[
    "apidoc",
    "github_crud",
    "istanbul",
    "jslint",
    "marked",
    "puppeteer",
    "sjcl"
].forEach(function (key) {
    try {
        local[key] = (
            local.isBrowser
            ? globalThis["utility2_" + key]
            : require("./lib." + key + ".js")
        );
    } catch (errCaught) {
        local.assertOrThrow(errCaught.code === "MODULE_NOT_FOUND", errCaught);
    }
    local[key] = local[key] || {};
});



// run shared js-env code - assets
local.assetsDict = local.assetsDict || {};



/* jslint ignore:start */
local.assetsDict["/assets.utility2.header.js"] = '\
// assets.utility2.header.js - start\n\
/* istanbul ignore next */\n\
/* jslint utility2:true */\n\
(function (globalThis) {\n\
    "use strict";\n\
    let ArrayPrototypeFlat;\n\
    let TextXxcoder;\n\
    let consoleError;\n\
    let debugName;\n\
    let local;\n\
    debugName = "debug" + String("Inline");\n\
    // init globalThis\n\
    globalThis.globalThis = globalThis.globalThis || globalThis;\n\
    // init debug_inline\n\
    if (!globalThis[debugName]) {\n\
        consoleError = console.error;\n\
        globalThis[debugName] = function (...argList) {\n\
        /*\n\
         * this function will both print <argList> to stderr\n\
         * and return <argList>[0]\n\
         */\n\
            consoleError("\\n\\n" + debugName);\n\
            consoleError.apply(console, argList);\n\
            consoleError("\\n");\n\
            // return arg0 for inspection\n\
            return argList[0];\n\
        };\n\
    }\n\
    // polyfill\n\
    ArrayPrototypeFlat = function (depth) {\n\
    /*\n\
     * this function will polyfill Array.prototype.flat\n\
     * https://github.com/jonathantneal/array-flat-polyfill\n\
     */\n\
        depth = (\n\
            globalThis.isNaN(depth)\n\
            ? 1\n\
            : Number(depth)\n\
        );\n\
        if (!depth) {\n\
            return Array.prototype.slice.call(this);\n\
        }\n\
        return Array.prototype.reduce.call(this, function (acc, cur) {\n\
            if (Array.isArray(cur)) {\n\
                // recurse\n\
                acc.push.apply(acc, ArrayPrototypeFlat.call(cur, depth - 1));\n\
            } else {\n\
                acc.push(cur);\n\
            }\n\
            return acc;\n\
        }, []);\n\
    };\n\
    Array.prototype.flat = Array.prototype.flat || ArrayPrototypeFlat;\n\
    Array.prototype.flatMap = Array.prototype.flatMap || function flatMap(\n\
        ...argList\n\
    ) {\n\
    /*\n\
     * this function will polyfill Array.prototype.flatMap\n\
     * https://github.com/jonathantneal/array-flat-polyfill\n\
     */\n\
        return this.map(...argList).flat();\n\
    };\n\
    (function () {\n\
        try {\n\
            globalThis.TextDecoder = (\n\
                globalThis.TextDecoder || require("util").TextDecoder\n\
            );\n\
            globalThis.TextEncoder = (\n\
                globalThis.TextEncoder || require("util").TextEncoder\n\
            );\n\
        } catch (ignore) {}\n\
    }());\n\
    TextXxcoder = function () {\n\
    /*\n\
     * this function will polyfill TextDecoder/TextEncoder\n\
     * https://gist.github.com/Yaffle/5458286\n\
     */\n\
        return;\n\
    };\n\
    TextXxcoder.prototype.decode = function (octets) {\n\
    /*\n\
     * this function will polyfill TextDecoder.prototype.decode\n\
     * https://gist.github.com/Yaffle/5458286\n\
     */\n\
        let bytesNeeded;\n\
        let codePoint;\n\
        let ii;\n\
        let kk;\n\
        let octet;\n\
        let string;\n\
        string = "";\n\
        ii = 0;\n\
        while (ii < octets.length) {\n\
            octet = octets[ii];\n\
            bytesNeeded = 0;\n\
            codePoint = 0;\n\
            if (octet <= 0x7F) {\n\
                bytesNeeded = 0;\n\
                codePoint = octet & 0xFF;\n\
            } else if (octet <= 0xDF) {\n\
                bytesNeeded = 1;\n\
                codePoint = octet & 0x1F;\n\
            } else if (octet <= 0xEF) {\n\
                bytesNeeded = 2;\n\
                codePoint = octet & 0x0F;\n\
            } else if (octet <= 0xF4) {\n\
                bytesNeeded = 3;\n\
                codePoint = octet & 0x07;\n\
            }\n\
            if (octets.length - ii - bytesNeeded > 0) {\n\
                kk = 0;\n\
                while (kk < bytesNeeded) {\n\
                    octet = octets[ii + kk + 1];\n\
                    codePoint = (codePoint << 6) | (octet & 0x3F);\n\
                    kk += 1;\n\
                }\n\
            } else {\n\
                codePoint = 0xFFFD;\n\
                bytesNeeded = octets.length - ii;\n\
            }\n\
            string += String.fromCodePoint(codePoint);\n\
            ii += bytesNeeded + 1;\n\
        }\n\
        return string;\n\
    };\n\
    TextXxcoder.prototype.encode = function (string) {\n\
    /*\n\
     * this function will polyfill TextEncoder.prototype.encode\n\
     * https://gist.github.com/Yaffle/5458286\n\
     */\n\
        let bits;\n\
        let cc;\n\
        let codePoint;\n\
        let ii;\n\
        let length;\n\
        let octets;\n\
        octets = [];\n\
        length = string.length;\n\
        ii = 0;\n\
        while (ii < length) {\n\
            codePoint = string.codePointAt(ii);\n\
            cc = 0;\n\
            bits = 0;\n\
            if (codePoint <= 0x0000007F) {\n\
                cc = 0;\n\
                bits = 0x00;\n\
            } else if (codePoint <= 0x000007FF) {\n\
                cc = 6;\n\
                bits = 0xC0;\n\
            } else if (codePoint <= 0x0000FFFF) {\n\
                cc = 12;\n\
                bits = 0xE0;\n\
            } else if (codePoint <= 0x001FFFFF) {\n\
                cc = 18;\n\
                bits = 0xF0;\n\
            }\n\
            octets.push(bits | (codePoint >> cc));\n\
            cc -= 6;\n\
            while (cc >= 0) {\n\
                octets.push(0x80 | ((codePoint >> cc) & 0x3F));\n\
                cc -= 6;\n\
            }\n\
            ii += (\n\
                codePoint >= 0x10000\n\
                ? 2\n\
                : 1\n\
            );\n\
        }\n\
        return octets;\n\
    };\n\
    globalThis.TextDecoder = globalThis.TextDecoder || TextXxcoder;\n\
    globalThis.TextEncoder = globalThis.TextEncoder || TextXxcoder;\n\
    // init local\n\
    local = {};\n\
    local.local = local;\n\
    globalThis.globalLocal = local;\n\
    // init isBrowser\n\
    local.isBrowser = (\n\
        typeof globalThis.XMLHttpRequest === "function"\n\
        && globalThis.navigator\n\
        && typeof globalThis.navigator.userAgent === "string"\n\
    );\n\
    // init isWebWorker\n\
    local.isWebWorker = (\n\
        local.isBrowser && typeof globalThis.importScript === "function"\n\
    );\n\
    // init function\n\
    local.assertOrThrow = function (passed, message) {\n\
    /*\n\
     * this function will throw err.<message> if <passed> is falsy\n\
     */\n\
        let err;\n\
        if (passed) {\n\
            return;\n\
        }\n\
        err = (\n\
            (\n\
                message\n\
                && typeof message.message === "string"\n\
                && typeof message.stack === "string"\n\
            )\n\
            // if message is errObj, then leave as is\n\
            ? message\n\
            : new Error(\n\
                typeof message === "string"\n\
                // if message is a string, then leave as is\n\
                ? message\n\
                // else JSON.stringify message\n\
                : JSON.stringify(message, undefined, 4)\n\
            )\n\
        );\n\
        throw err;\n\
    };\n\
    local.coalesce = function (...argList) {\n\
    /*\n\
     * this function will coalesce null, undefined, or "" in <argList>\n\
     */\n\
        let arg;\n\
        let ii;\n\
        ii = 0;\n\
        while (ii < argList.length) {\n\
            arg = argList[ii];\n\
            if (arg !== null && arg !== undefined && arg !== "") {\n\
                break;\n\
            }\n\
            ii += 1;\n\
        }\n\
        return arg;\n\
    };\n\
    local.fsRmrfSync = function (dir) {\n\
    /*\n\
     * this function will sync "rm -rf" <dir>\n\
     */\n\
        let child_process;\n\
        try {\n\
            child_process = require("child_process");\n\
        } catch (ignore) {\n\
            return;\n\
        }\n\
        child_process.spawnSync("rm", [\n\
            "-rf", dir\n\
        ], {\n\
            stdio: [\n\
                "ignore", 1, 2\n\
            ]\n\
        });\n\
    };\n\
    local.fsWriteFileWithMkdirpSync = function (file, data) {\n\
    /*\n\
     * this function will sync write <data> to <file> with "mkdir -p"\n\
     */\n\
        let fs;\n\
        try {\n\
            fs = require("fs");\n\
        } catch (ignore) {\n\
            return;\n\
        }\n\
        // try to write file\n\
        try {\n\
            fs.writeFileSync(file, data);\n\
        } catch (ignore) {\n\
            // mkdir -p\n\
            require("child_process").spawnSync(\n\
                "mkdir",\n\
                [\n\
                    "-p", require("path").dirname(file)\n\
                ],\n\
                {\n\
                    stdio: [\n\
                        "ignore", 1, 2\n\
                    ]\n\
                }\n\
            );\n\
            // rewrite file\n\
            fs.writeFileSync(file, data);\n\
        }\n\
    };\n\
    local.functionOrNop = function (fnc) {\n\
    /*\n\
     * this function will if <fnc> exists,\n\
     * return <fnc>,\n\
     * else return <nop>\n\
     */\n\
        return fnc || local.nop;\n\
    };\n\
    local.nop = function () {\n\
    /*\n\
     * this function will do nothing\n\
     */\n\
        return;\n\
    };\n\
    local.objectAssignDefault = function (target, source) {\n\
    /*\n\
     * this function will if items from <target> are null, undefined, or "",\n\
     * then overwrite them with items from <source>\n\
     */\n\
        target = target || {};\n\
        Object.keys(source || {}).forEach(function (key) {\n\
            if (\n\
                target[key] === null\n\
                || target[key] === undefined\n\
                || target[key] === ""\n\
            ) {\n\
                target[key] = target[key] || source[key];\n\
            }\n\
        });\n\
        return target;\n\
    };\n\
    local.querySelector = function (selectors) {\n\
    /*\n\
     * this function will return first dom-elem that match <selectors>\n\
     */\n\
        return (\n\
            typeof document === "object" && document\n\
            && typeof document.querySelector === "function"\n\
            && document.querySelector(selectors)\n\
        ) || {};\n\
    };\n\
    local.querySelectorAll = function (selectors) {\n\
    /*\n\
     * this function will return dom-elem-list that match <selectors>\n\
     */\n\
        return (\n\
            typeof document === "object" && document\n\
            && typeof document.querySelectorAll === "function"\n\
            && Array.from(document.querySelectorAll(selectors))\n\
        ) || [];\n\
    };\n\
    local.value = function (val) {\n\
    /*\n\
     * this function will return <val>\n\
     */\n\
        return val;\n\
    };\n\
    local.valueOrEmptyList = function (val) {\n\
    /*\n\
     * this function will return <val> or []\n\
     */\n\
        return val || [];\n\
    };\n\
    local.valueOrEmptyObject = function (val) {\n\
    /*\n\
     * this function will return <val> or {}\n\
     */\n\
        return val || {};\n\
    };\n\
    // require builtin\n\
    if (!local.isBrowser) {\n\
        local.assert = require("assert");\n\
        local.buffer = require("buffer");\n\
        local.child_process = require("child_process");\n\
        local.cluster = require("cluster");\n\
        local.crypto = require("crypto");\n\
        local.dgram = require("dgram");\n\
        local.dns = require("dns");\n\
        local.domain = require("domain");\n\
        local.events = require("events");\n\
        local.fs = require("fs");\n\
        local.http = require("http");\n\
        local.https = require("https");\n\
        local.net = require("net");\n\
        local.os = require("os");\n\
        local.path = require("path");\n\
        local.querystring = require("querystring");\n\
        local.readline = require("readline");\n\
        local.repl = require("repl");\n\
        local.stream = require("stream");\n\
        local.string_decoder = require("string_decoder");\n\
        local.timers = require("timers");\n\
        local.tls = require("tls");\n\
        local.tty = require("tty");\n\
        local.url = require("url");\n\
        local.util = require("util");\n\
        local.vm = require("vm");\n\
        local.zlib = require("zlib");\n\
    }\n\
}((typeof globalThis === "object" && globalThis) || (function () {\n\
    return Function("return this")(); // jslint ignore:line\n\
}())));\n\
// assets.utility2.header.js - end\n\
'



local.assetsDict["/assets.index.template.html"] =
local.assetsDict["/assets.utility2.template.html"] = '\
<!doctype html>\n\
<html lang="en">\n\
<head>\n\
<meta charset="utf-8">\n\
<meta name="viewport" content="width=device-width, initial-scale=1">\n\
<!-- "assets.utility2.template.html" -->\n\
<title>{{env.npm_package_name}} ({{env.npm_package_version}})</title>\n\
<style>\n\
/* jslint utility2:true */\n\
/*csslint\n\
*/\n\
/* csslint ignore:start */\n\
*,\n\
*:after,\n\
*:before {\n\
    box-sizing: border-box;\n\
}\n\
/* csslint ignore:end */\n\
@keyframes uiAnimateSpin {\n\
0% {\n\
    transform: rotate(0deg);\n\
}\n\
100% {\n\
    transform: rotate(360deg);\n\
}\n\
}\n\
a {\n\
    overflow-wrap: break-word;\n\
}\n\
body {\n\
    background: #f7f7f7;\n\
    font-family: Arial, Helvetica, sans-serif;\n\
    font-size: small;\n\
    margin: 0 40px;\n\
}\n\
body > div,\n\
body > input,\n\
body > pre,\n\
body > .button,\n\
body > .textarea {\n\
    margin-bottom: 20px;\n\
    margin-top: 0;\n\
}\n\
body > input,\n\
body > .button {\n\
    width: 20rem;\n\
}\n\
body > .readonly {\n\
    background: #ddd;\n\
}\n\
body > .textarea {\n\
    height: 10rem;\n\
    resize: vertical;\n\
    width: 100%;\n\
}\n\
code,\n\
pre,\n\
.textarea {\n\
    font-family: Consolas, Menlo, monospace;\n\
    font-size: smaller;\n\
}\n\
pre {\n\
    overflow-wrap: break-word;\n\
    white-space: pre-wrap;\n\
}\n\
.button {\n\
    background: #ddd;\n\
    border: 1px solid #999;\n\
    color: #000;\n\
    cursor: pointer;\n\
    display: inline-block;\n\
    padding: 2px 5px;\n\
    text-align: center;\n\
    text-decoration: none;\n\
}\n\
.button:hover {\n\
    background: #bbb;\n\
}\n\
.colorError {\n\
    color: #d00;\n\
}\n\
.textarea {\n\
    background: #fff;\n\
    border: 1px solid #999;\n\
    border-radius: 0;\n\
    cursor: auto;\n\
    overflow: auto;\n\
    padding: 2px;\n\
}\n\
.uiAnimateSlide {\n\
    overflow-y: hidden;\n\
    transition: max-height ease-in 250ms, min-height ease-in 250ms, padding-bottom ease-in 250ms, padding-top ease-in 250ms;\n\
}\n\
.zeroPixel {\n\
    border: 0;\n\
    height: 0;\n\
    margin: 0;\n\
    padding: 0;\n\
    width: 0;\n\
}\n\
</style>\n\
</head>\n\
<body>\n\
<div class="uiAnimateSpin" style="animation: uiAnimateSpin 2s linear infinite; border: 5px solid #999; border-radius: 50%; border-top: 5px solid #7d7; display: none; height: 25px; vertical-align: middle; width: 25px;"></div>\n\
<script>\n\
/* jslint utility2:true */\n\
// init domOnEventWindowOnloadTimeElapsed\n\
(function () {\n\
/*\n\
 * this function will measure and print time-elapsed for window.onload\n\
 */\n\
    "use strict";\n\
    if (!(\n\
        typeof window === "object" && window && window.document\n\
        && typeof document.addEventListener === "function"\n\
    ) || window.domOnEventWindowOnloadTimeElapsed) {\n\
        return;\n\
    }\n\
    window.domOnEventWindowOnloadTimeElapsed = Date.now() + 100;\n\
    window.addEventListener("load", function () {\n\
        setTimeout(function () {\n\
            window.domOnEventWindowOnloadTimeElapsed = (\n\
                Date.now()\n\
                - window.domOnEventWindowOnloadTimeElapsed\n\
            );\n\
            console.error(\n\
                "domOnEventWindowOnloadTimeElapsed = "\n\
                + window.domOnEventWindowOnloadTimeElapsed\n\
            );\n\
        }, 100);\n\
    });\n\
}());\n\
\n\
\n\
\n\
// init domOnEventAjaxProgressUpdate\n\
(function () {\n\
/*\n\
 * this function will display incrementing ajax-progress-bar\n\
 */\n\
    "use strict";\n\
    let opt;\n\
    if (!(\n\
        typeof window === "object" && window && window.document\n\
        && typeof document.addEventListener === "function"\n\
    ) || window.domOnEventAjaxProgressUpdate) {\n\
        return;\n\
    }\n\
    window.domOnEventAjaxProgressUpdate = function (gotoState, onError) {\n\
        gotoState = (gotoState | 0) + 1;\n\
        switch (gotoState) {\n\
        // ajaxProgress - show\n\
        case 1:\n\
            // init timerInterval and timerTimeout\n\
            opt.timerInterval = (\n\
                opt.timerInterval || setInterval(opt, 2000, 1, onError)\n\
            );\n\
            opt.timerTimeout = (\n\
                opt.timerTimeout || setTimeout(opt, 30000, 2, onError)\n\
            );\n\
            // show ajaxProgress\n\
            if (opt.width !== -1) {\n\
                opt.style.background = opt.background;\n\
            }\n\
            setTimeout(opt, 50, gotoState, onError);\n\
            break;\n\
        // ajaxProgress - increment\n\
        case 2:\n\
            // show ajaxProgress\n\
            if (opt.width === -1) {\n\
                return;\n\
            }\n\
            opt.style.background = opt.background;\n\
            // reset ajaxProgress if it goes too high\n\
            if ((opt.style.width.slice(0, -1) | 0) > 95) {\n\
                opt.width = 0;\n\
            }\n\
            // this algorithm will indefinitely increment ajaxProgress\n\
            // with successively smaller increments without reaching 100%\n\
            opt.width += 1;\n\
            opt.style.width = Math.max(\n\
                100 - 75 * Math.exp(-0.125 * opt.width),\n\
                opt.style.width.slice(0, -1) | 0\n\
            ) + "%";\n\
            if (!opt.counter) {\n\
                setTimeout(opt, 0, gotoState, onError);\n\
            }\n\
            break;\n\
        // ajaxProgress - 100%\n\
        case 3:\n\
            opt.width = -1;\n\
            opt.style.width = "100%";\n\
            setTimeout(opt, 1000, gotoState, onError);\n\
            break;\n\
        // ajaxProgress - hide\n\
        case 4:\n\
            // cleanup timerInterval and timerTimeout\n\
            clearInterval(opt.timerInterval);\n\
            opt.timerInterval = null;\n\
            clearTimeout(opt.timerTimeout);\n\
            opt.timerTimeout = null;\n\
            // hide ajaxProgress\n\
            opt.style.background = "transparent";\n\
            if (onError) {\n\
                onError();\n\
            }\n\
            setTimeout(opt, 250, gotoState);\n\
            break;\n\
        // ajaxProgress - reset\n\
        default:\n\
            // reset ajaxProgress\n\
            opt.counter = 0;\n\
            opt.width = 0;\n\
            opt.style.width = "0%";\n\
        }\n\
    };\n\
    opt = window.domOnEventAjaxProgressUpdate;\n\
    opt.end = function (onError) {\n\
        opt.counter = 0;\n\
        window.domOnEventAjaxProgressUpdate(2, onError);\n\
    };\n\
    opt.elem = document.getElementById("domElementAjaxProgress1");\n\
    if (!opt.elem) {\n\
        opt.elem = document.createElement("div");\n\
        setTimeout(function () {\n\
            document.body.insertBefore(opt.elem, document.body.firstChild);\n\
        });\n\
    }\n\
    opt.elem.id = "domElementAjaxProgress1";\n\
    opt.style = opt.elem.style;\n\
    // init style\n\
    Object.entries({\n\
        background: "#d00",\n\
        height: "2px",\n\
        left: "0",\n\
        margin: "0",\n\
        padding: "0",\n\
        position: "fixed",\n\
        top: "0",\n\
        transition: "background 250ms, width 750ms",\n\
        width: "0%",\n\
        "z-index": "1"\n\
    }).forEach(function (entry) {\n\
        opt.style[entry[0]] = opt.style[entry[0]] || entry[1];\n\
    });\n\
    // init state\n\
    opt.background = opt.style.background;\n\
    opt.counter = 0;\n\
    opt.width = 0;\n\
}());\n\
\n\
\n\
\n\
// init domOnEventDelegateDict\n\
(function () {\n\
/*\n\
 * this function will handle delegated dom-evt\n\
 */\n\
    "use strict";\n\
    let debounce;\n\
    let timerTimeout;\n\
    debounce = function () {\n\
        return setTimeout(function () {\n\
            timerTimeout = undefined;\n\
        }, 30);\n\
    };\n\
    if (!(\n\
        typeof window === "object" && window && window.document\n\
        && typeof document.addEventListener === "function"\n\
    ) || window.domOnEventDelegateDict) {\n\
        return;\n\
    }\n\
    window.domOnEventDelegateDict = {};\n\
    window.domOnEventDelegateDict.domOnEventDelegate = function (evt) {\n\
        evt.targetOnEvent = evt.target.closest("[data-onevent]");\n\
        if (\n\
            !evt.targetOnEvent\n\
            || evt.targetOnEvent.dataset.onevent === "domOnEventNop"\n\
            || evt.target.closest(".disabled,.readonly")\n\
        ) {\n\
            return;\n\
        }\n\
        // filter evt-change\n\
        switch (evt.type !== "change" && evt.target.type) {\n\
        case "checkbox":\n\
        case "file":\n\
        case "select-one":\n\
        case "radio":\n\
            return;\n\
        }\n\
        // filter evt-keyup\n\
        switch (evt.type) {\n\
        case "keyup":\n\
            if (!timerTimeout && (\n\
                evt.target.tagName === "INPUT"\n\
                || evt.target.tagName === "TEXTAREA"\n\
            )) {\n\
                timerTimeout = debounce();\n\
                if (evt.target.dataset.valueOld !== evt.target.value) {\n\
                    evt.target.dataset.valueOld = evt.target.value;\n\
                    break;\n\
                }\n\
            }\n\
            return;\n\
        }\n\
        switch (evt.targetOnEvent.tagName) {\n\
        case "BUTTON":\n\
        case "FORM":\n\
            evt.preventDefault();\n\
            break;\n\
        }\n\
        evt.stopPropagation();\n\
        // handle domOnEventClickTarget\n\
        if (evt.targetOnEvent.dataset.onevent === "domOnEventClickTarget") {\n\
            document.querySelector(\n\
                evt.targetOnEvent.dataset.clickTarget\n\
            ).click();\n\
            return;\n\
        }\n\
        window.domOnEventDelegateDict[evt.targetOnEvent.dataset.onevent](evt);\n\
    };\n\
    // handle evt\n\
    [\n\
        "change",\n\
        "click",\n\
        "keyup",\n\
        "submit"\n\
    ].forEach(function (eventType) {\n\
        document.addEventListener(\n\
            eventType,\n\
            window.domOnEventDelegateDict.domOnEventDelegate\n\
        );\n\
    });\n\
}());\n\
\n\
\n\
\n\
// init domOnEventSelectAllWithinPre\n\
(function () {\n\
/*\n\
 * this function will limit select-all within <pre tabIndex="0"> elem\n\
 * https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse\n\
 */\n\
    "use strict";\n\
    if (!(\n\
        typeof window === "object" && window && window.document\n\
        && typeof document.addEventListener === "function"\n\
    ) || window.domOnEventSelectAllWithinPre) {\n\
        return;\n\
    }\n\
    window.domOnEventSelectAllWithinPre = function (evt) {\n\
        let range;\n\
        let selection;\n\
        if (\n\
            evt && (evt.ctrlKey || evt.metaKey) && evt.key === "a"\n\
            && evt.target.closest("pre")\n\
        ) {\n\
            range = document.createRange();\n\
            range.selectNodeContents(evt.target.closest("pre"));\n\
            selection = window.getSelection();\n\
            selection.removeAllRanges();\n\
            selection.addRange(range);\n\
            evt.preventDefault();\n\
        }\n\
    };\n\
    // handle evt\n\
    document.addEventListener(\n\
        "keydown",\n\
        window.domOnEventSelectAllWithinPre\n\
    );\n\
}());\n\
</script>\n\
<h1>\n\
<!-- utility2-comment\n\
<a\n\
    {{#if env.npm_package_homepage}}\n\
    href="{{env.npm_package_homepage}}"\n\
    {{/if env.npm_package_homepage}}\n\
    target="_blank"\n\
>\n\
utility2-comment -->\n\
    {{env.npm_package_name}} ({{env.npm_package_version}})\n\
<!-- utility2-comment\n\
</a>\n\
utility2-comment -->\n\
</h1>\n\
<h3>{{env.npm_package_description}}</h3>\n\
<!-- utility2-comment\n\
<a class="button" download href="assets.app.js">download standalone app</a><br>\n\
<button class="button" data-onevent="testRunBrowser" id="buttonTestRun1">run browser-tests</button><br>\n\
<div class="uiAnimateSlide" id="htmlTestReport1" style="border-bottom: 0; border-top: 0; margin-bottom: 0; margin-top: 0; max-height: 0; padding-bottom: 0; padding-top: 0;"></div>\n\
utility2-comment -->\n\
\n\
\n\
\n\
<!-- custom-html-start -->\n\
<label>stderr and stdout</label>\n\
<textarea class="onevent-reset-output readonly textarea" id="outputStdout1" readonly></textarea>\n\
<!-- custom-html-end -->\n\
\n\
\n\
\n\
<!-- utility2-comment\n\
{{#if isRollup}}\n\
<script src="assets.app.js"></script>\n\
{{#unless isRollup}}\n\
<script src="assets.utility2.rollup.js"></script>\n\
<script>window.utility2_onReadyBefore.counter += 1;</script>\n\
<script src="jsonp.utility2.stateInit?callback=window.utility2.stateInit"></script>\n\
utility2-comment -->\n\
<script src="assets.{{packageJson.nameLib}}.js"></script>\n\
<script src="assets.example.js"></script>\n\
<script src="assets.test.js"></script>\n\
<script>\n\
if (window.utility2_onReadyBefore) {\n\
    window.utility2_onReadyBefore();\n\
}\n\
</script>\n\
<!-- utility2-comment\n\
{{/if isRollup}}\n\
utility2-comment -->\n\
<div style="text-align: center;">\n\
    [\n\
    this app was created with\n\
    <a\n\
        href="https://github.com/kaizhu256/node-utility2" target="_blank"\n\
    >utility2</a>\n\
    ]\n\
</div>\n\
</body>\n\
</html>\n\
';



// https://img.shields.io/badge/last_build-0000_00_00_00_00_00_UTC_--_master_--_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-0077ff.svg?style=flat
local.assetsDict["/assets.buildBadge.template.svg"] =
'<svg xmlns="http://www.w3.org/2000/svg" width="563" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="563" height="20" fill="#555"/><rect rx="0" x="61" width="502" height="20" fill="#07f"/><path fill="#07f" d="M61 0h4v20h-4z"/><rect rx="0" width="563" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="31.5" y="15" fill="#010101" fill-opacity=".3">last build</text><text x="31.5" y="14">last build</text><text x="311" y="15" fill="#010101" fill-opacity=".3">0000-00-00 00:00:00 UTC - master - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</text><text x="311" y="14">0000-00-00 00:00:00 UTC - master - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</text></g></svg>';



local.assetsDict["/assets.example.html"] = "";



local.assetsDict["/assets.example.template.js"] = '\
/*\n\
example.js\n\
\n\
this script will run a web-demo of my-app-lite\n\
\n\
instruction\n\
    1. save this script as example.js\n\
    2. run shell-command:\n\
        $ npm install my-app-lite && \\\n\
            PORT=8081 node example.js\n\
    3. open a browser to http://127.0.0.1:8081 and play with web-demo\n\
    4. edit this script to suit your needs\n\
*/\n\
\n\
\n\
\n\
' + local.assetsDict["/assets.utility2.header.js"] + '\
\n\
\n\
\n\
/* jslint utility2:true */\n\
(function (local) {\n\
"use strict";\n\
\n\
\n\
\n\
// run shared js\-env code - init-before\n\
(function () {\n\
// init local\n\
local = (\n\
    globalThis.utility2_rollup\n\
    || globalThis.utility2_my_app\n\
    || require("my-app-lite")\n\
);\n\
// init exports\n\
globalThis.local = local;\n\
}());\n\
\n\
\n\
\n\
// run browser js\-env code - init-test\n\
(function () {\n\
if (!local.isBrowser) {\n\
    return;\n\
}\n\
// log stderr and stdout to #outputStdout1\n\
["error", "log"].forEach(function (key) {\n\
    let elem;\n\
    let fnc;\n\
    elem = local.querySelector("#outputStdout1");\n\
    if (!elem) {\n\
        return;\n\
    }\n\
    fnc = console[key];\n\
    console[key] = function (...argList) {\n\
        fnc.apply(console, argList);\n\
        // append text to #outputStdout1\n\
        elem.textContent += argList.map(function (arg) {\n\
            return (\n\
                typeof arg === "string"\n\
                ? arg\n\
                : JSON.stringify(arg, undefined, 4)\n\
            );\n\
        }).join(" ").replace((\n\
            /\\u001b\\[\\d*m/g\n\
        ), "") + "\\n";\n\
        // scroll textarea to bottom\n\
        elem.scrollTop = elem.scrollHeight;\n\
    };\n\
});\n\
local.objectAssignDefault(local, globalThis.domOnEventDelegateDict);\n\
globalThis.domOnEventDelegateDict = local;\n\
if ((\n\
    /\\bmodeTest=1\\b/\n\
).test(location.search)) {\n\
    local.testRunBrowser();\n\
}\n\
}());\n\
\n\
\n\
\n\
// run node js\-env code - init-test\n\
(function () {\n\
if (local.isBrowser) {\n\
    return;\n\
}\n\
// init exports\n\
module.exports = local;\n\
// init assets\n\
local.assetsDict = local.assetsDict || {};\n\
[\n\
    "assets.swgg.swagger.json",\n\
    "assets.swgg.swagger.server.json"\n\
].forEach(function (file) {\n\
    file = "/" + file;\n\
    local.assetsDict[file] = local.assetsDict[file] || "";\n\
    if (local.fs.existsSync(local.__dirname + file)) {\n\
        local.assetsDict[file] = local.fs.readFileSync(\n\
            local.__dirname + file,\n\
            "utf8"\n\
        );\n\
    }\n\
});\n\
/* jslint ignore:start */\n\
local.assetsDict["/assets.index.template.html"] = \'\\\n\
'
+ local.assetsDict["/assets.index.template.html"].replace((/\n/g), "\\n\\\n")
+ '\';\n\
/* jslint ignore:end */\n\
local.assetsDict["/assets.my_app.js"] = (\n\
    local.assetsDict["/assets.my_app.js"]\n\
    || local.fs.readFileSync(\n\
        local.__dirname + "/lib.my_app.js",\n\
        "utf8"\n\
    ).replace((\n\
        /^#!\\//\n\
    ), "// ")\n\
);\n\
/* validateLineSortedReset */\n\
local.assetsDict["/"] = local.assetsDict[\n\
    "/assets.index.template.html"\n\
].replace((\n\
    /\\{\\{env\\.(\\w+?)\\}\\}/g\n\
), function (match0, match1) {\n\
    switch (match1) {\n\
    case "npm_package_description":\n\
        return "the greatest app in the world!";\n\
    case "npm_package_name":\n\
        return "my-app-lite";\n\
    case "npm_package_nameLib":\n\
        return "my_app";\n\
    case "npm_package_version":\n\
        return "0.0.1";\n\
    default:\n\
        return match0;\n\
    }\n\
});\n\
local.assetsDict["/assets.example.html"] = local.assetsDict["/"];\n\
// init cli\n\
if (module !== require.main || globalThis.utility2_rollup) {\n\
    return;\n\
}\n\
local.assetsDict["/assets.example.js"] = (\n\
    local.assetsDict["/assets.example.js"]\n\
    || local.fs.readFileSync(__filename, "utf8")\n\
);\n\
local.assetsDict["/favicon.ico"] = local.assetsDict["/favicon.ico"] || "";\n\
local.assetsDict["/index.html"] = local.assetsDict["/"];\n\
// if $npm_config_timeout_exit exists,\n\
// then exit this process after $npm_config_timeout_exit ms\n\
if (Number(process.env.npm_config_timeout_exit)) {\n\
    setTimeout(process.exit, Number(process.env.npm_config_timeout_exit));\n\
}\n\
// start server\n\
if (globalThis.utility2_serverHttp1) {\n\
    return;\n\
}\n\
process.env.PORT = process.env.PORT || "8081";\n\
console.error("http-server listening on port " + process.env.PORT);\n\
local.http.createServer(function (req, res) {\n\
    req.urlParsed = local.url.parse(req.url);\n\
    if (local.assetsDict[req.urlParsed.pathname] !== undefined) {\n\
        res.end(local.assetsDict[req.urlParsed.pathname]);\n\
        return;\n\
    }\n\
    res.statusCode = 404;\n\
    res.end();\n\
}).listen(process.env.PORT);\n\
}());\n\
}());\n\
';



local.assetsDict["/assets.my_app.template.js"] = '\
#!/usr/bin/env node\n\
/*\n\
 * lib.my_app.js ({{packageJson.version}})\n\
 * https://github.com/kaizhu256/node-my-app-lite\n\
 * {{packageJson.description}}\n\
 *\n\
 */\n\
\n\
\n\
\n\
/* istanbul instrument in package my_app */\n\
' + local.assetsDict["/assets.utility2.header.js"] + '\
\n\
\n\
\n\
(function (local) {\n\
"use strict";\n\
\n\
\n\
\n\
/* istanbul ignore next */\n\
// run shared js\-env code - init-before\n\
(function () {\n\
// init local\n\
local = (\n\
    globalThis.utility2_rollup\n\
    // || globalThis.utility2_rollup_old\n\
    // || require("./assets.utility2.rollup.js")\n\
    || globalThis.globalLocal\n\
);\n\
// init exports\n\
if (local.isBrowser) {\n\
    globalThis.utility2_my_app = local;\n\
} else {\n\
    module.exports = local;\n\
    module.exports.__dirname = __dirname;\n\
}\n\
// init lib main\n\
local.my_app = local;\n\
\n\
\n\
\n\
return;\n\
}());\n\
}());\n\
';



local.assetsDict["/assets.readme.template.md"] = '\
# my-app-lite\n\
the greatest app in the world!\n\
\n\
# live web demo\n\
- [https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/app](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/app)\n\
\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithub.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/app)\n\
\n\
\n\
\n\
[![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-my-app-lite.svg)](https://travis-ci.org/kaizhu256/node-my-app-lite) [![coverage](https://kaizhu256.github.io/node-my-app-lite/build/coverage.badge.svg)](https://kaizhu256.github.io/node-my-app-lite/build/coverage.html/index.html)\n\
\n\
[![NPM](https://nodei.co/npm/my-app-lite.png?downloads=true)](https://www.npmjs.com/package/my-app-lite)\n\
\n\
[![build commit status](https://kaizhu256.github.io/node-my-app-lite/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-my-app-lite)\n\
\n\
| git-branch : | [master](https://github.com/kaizhu256/node-my-app-lite/tree/master) | [beta](https://github.com/kaizhu256/node-my-app-lite/tree/beta) | [alpha](https://github.com/kaizhu256/node-my-app-lite/tree/alpha)|\n\
|--:|:--|:--|:--|\n\
| test-server-github : | [![github.com test-server](https://kaizhu256.github.io/node-my-app-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-my-app-lite/build..master..travis-ci.org/app) | [![github.com test-server](https://kaizhu256.github.io/node-my-app-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/app) | [![github.com test-server](https://kaizhu256.github.io/node-my-app-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-my-app-lite/build..alpha..travis-ci.org/app)|\n\
| test-server-heroku : | [![heroku.com test-server](https://kaizhu256.github.io/node-my-app-lite/heroku-logo.75x25.png)](https://h1-my-app-master.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-my-app-lite/heroku-logo.75x25.png)](https://h1-my-app-beta.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-my-app-lite/heroku-logo.75x25.png)](https://h1-my-app-alpha.herokuapp.com)|\n\
| test-report : | [![test-report](https://kaizhu256.github.io/node-my-app-lite/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-my-app-lite/build..master..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-my-app-lite/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-my-app-lite/build..alpha..travis-ci.org/test-report.html)|\n\
| coverage : | [![coverage](https://kaizhu256.github.io/node-my-app-lite/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-my-app-lite/build..master..travis-ci.org/coverage.html/index.html) | [![coverage](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/coverage.html/index.html) | [![coverage](https://kaizhu256.github.io/node-my-app-lite/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-my-app-lite/build..alpha..travis-ci.org/coverage.html/index.html)|\n\
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-my-app-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-my-app-lite/tree/gh-pages/build..master..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-my-app-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-my-app-lite/tree/gh-pages/build..beta..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-my-app-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-my-app-lite/tree/gh-pages/build..alpha..travis-ci.org)|\n\
\n\
[![npmPackageListing](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.npmPackageListing.svg)](https://github.com/kaizhu256/node-my-app-lite)\n\
\n\
![npmPackageDependencyTree](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.npmPackageDependencyTree.svg)\n\
\n\
\n\
\n\
# table of contents\n\
\n\
\n\
\n\
# cdn download\n\
- [https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/app/assets.my_app.js](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/app/assets.my_app.js)\n\
\n\
\n\
\n\
# documentation\n\
#### api doc\n\
- [https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/apidoc.html](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/apidoc.html)\n\
\n\
[![apidoc](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/apidoc.html)\n\
\n\
#### cli help\n\
![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.npmPackageCliHelp.svg)\n\
\n\
#### swagger doc\n\
- [https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/app/assets.swgg.html](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/app/assets.swgg.html)\n\
\n\
[![swaggerdoc](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithub.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp%252Fassets.swgg.html.png)](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/app/assets.swgg.html)\n\
\n\
#### todo\n\
- none\n\
\n\
#### changelog 0.0.1\n\
- npm publish 0.0.1\n\
- update build\n\
- none\n\
\n\
#### this package requires\n\
- darwin or linux os\n\
\n\
\n\
\n\
# quickstart standalone app\n\
#### to run this example, follow instruction in script below\n\
- [assets.app.js](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/app/assets.app.js)\n\
```shell\n\
# example.sh\n\
\n\
# this shell script will download and run a web-demo of my-app-lite as a standalone app\n\
\n\
# 1. download standalone app\n\
curl -O https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/app/assets.app.js\n\
# 2. run standalone app\n\
PORT=8081 node ./assets.app.js\n\
# 3. open a browser to http://127.0.0.1:8081 and play with web-demo\n\
# 4. edit file assets.app.js to suit your needs\n\
```\n\
\n\
#### output from browser\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleSh.browser.%252F.png)](https://kaizhu256.github.io/node-my-app-lite/build/app/assets.example.html)\n\
\n\
#### output from shell\n\
![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleSh.svg)\n\
\n\
\n\
\n\
# quickstart example.js\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-my-app-lite/build/app/assets.example.html)\n\
\n\
#### to run this example, follow instruction in script below\n\
- [example.js](https://kaizhu256.github.io/node-my-app-lite/build..beta..travis-ci.org/example.js)\n\
```javascript\n' + local.assetsDict["/assets.example.template.js"] + '```\n\
\n\
#### output from browser\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-my-app-lite/build/app/assets.example.html)\n\
\n\
#### output from shell\n\
![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleJs.svg)\n\
\n\
\n\
\n\
# extra screenshots\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithub.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp%252Fassets.swgg.html.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithub.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp%252Fassets.swgg.html.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithub.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp%252Fassets.swgg.html.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithub.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp%252Fassets.swgg.html.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithub.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithub.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithub.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithub.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithubTest.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithubTest.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithubTest.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployGithubTest.browser.%252Fnode-my-app-lite%252Fbuild%252Fapp.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHeroku.browser.%252F.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHeroku.browser.%252F.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHeroku.browser.%252F.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHeroku.browser.%252F.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHerokuTest.browser.%252F.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHerokuTest.browser.%252F.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHerokuTest.browser.%252F.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.deployHerokuTest.browser.%252F.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.npmTest.browser.%252F.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.npmTest.browser.%252F.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.npmTest.browser.%252F.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.npmTest.browser.%252F.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleJs.browser.%252F.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleJs.browser.%252F.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleJs.browser.%252F.png)\n\
\n\
1. [https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleSh.browser.%252F.png](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleSh.browser.%252F.png)\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleSh.browser.%252F.png)](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.testExampleSh.browser.%252F.png)\n\
\n\
\n\
\n\
# package.json\n\
```json\n\
{\n\
    "author": "kai zhu <kaizhu256@gmail.com>",\n\
    "description": "the greatest app in the world!",\n\
    "devDependencies": {\n\
        "utility2": "kaizhu256/node-utility2#alpha"\n\
    },\n\
    "engines": {\n\
        "node": ">=10.0"\n\
    },\n\
    "homepage": "https://github.com/kaizhu256/node-my-app-lite",\n\
    "keywords": [],\n\
    "license": "MIT",\n\
    "main": "lib.my_app.js",\n\
    "name": "my-app-lite",\n\
    "nameAliasPublish": "",\n\
    "os": [\n\
        "darwin",\n\
        "linux"\n\
    ],\n\
    "repository": {\n\
        "type": "git",\n\
        "url": "https://github.com/kaizhu256/node-my-app-lite.git"\n\
    },\n\
    "scripts": {\n\
        "build-ci": "./npm_scripts.sh",\n\
        "env": "env",\n\
        "eval": "./npm_scripts.sh",\n\
        "heroku-postbuild": "./npm_scripts.sh",\n\
        "postinstall": "./npm_scripts.sh",\n\
        "start": "./npm_scripts.sh",\n\
        "test": "./npm_scripts.sh",\n\
        "utility2": "./npm_scripts.sh"\n\
    },\n\
    "version": "0.0.1"\n\
}\n\
```\n\
\n\
\n\
\n\
# changelog of last 50 commits\n\
[![screenshot](https://kaizhu256.github.io/node-my-app-lite/build/screenshot.gitLog.svg)](https://github.com/kaizhu256/node-my-app-lite/commits)\n\
\n\
\n\
\n\
# internal build script\n\
- build_ci.sh\n\
```shell\n\
# build_ci.sh\n\
\n\
# this shell script will run the build for this package\n\
\n\
shBuildCiAfter () {(set -e\n\
    # shDeployCustom\n\
    shDeployGithub\n\
    # shDeployHeroku\n\
    shReadmeTest example.sh\n\
)}\n\
\n\
shBuildCiBefore () {(set -e\n\
    # shNpmTestPublished\n\
    shReadmeTest example.js\n\
)}\n\
\n\
# run shBuildCi\n\
eval "$(utility2 source)"\n\
shBuildCi\n\
```\n\
\n\
\n\
\n\
# misc\n\
- this package was created with [utility2](https://github.com/kaizhu256/node-utility2)\n\
';



local.assetsDict["/assets.test.template.js"] = '\
/* istanbul instrument in package my_app */\n\
' + local.assetsDict["/assets.utility2.header.js"] + '\
\n\
\n\
\n\
/* istanbul ignore next */\n\
/* jslint utility2:true */\n\
(function (local) {\n\
"use strict";\n\
\n\
\n\
\n\
// run shared js\-env code - init-before\n\
(function () {\n\
// init local\n\
local = globalThis.globalLocal.value(\n\
    globalThis.utility2 || require("utility2")\n\
).requireReadme();\n\
globalThis.local = local;\n\
// init test\n\
local.testRunDefault(local);\n\
}());\n\
\n\
\n\
\n\
// run shared js\-env code - function\n\
(function () {\n\
return;\n\
}());\n\
}());\n\
';



local.assetsDict["/assets.testReport.template.html"] =
    local.assetsDict["/assets.utility2.template.html"]
    .replace("assets.utility2.template.html", "")
    .replace((/<title>.*?<\/title>/), "<title>test-report</title>")
    .replace("</style>\n", '\
<style>\n\
/* jslint utility2:true */\n\
/*csslint\n\
*/\n\
.testReportDiv img {\n\
    border: 1px solid #999;\n\
    margin: 5px 0 5px 0;\n\
    max-height: 256px;\n\
    max-width: 512px;\n\
}\n\
.testReportDiv pre {\n\
    background: #fdd;\n\
    border-top: 1px solid #999;\n\
    margin-bottom: 0;\n\
    padding: 10px;\n\
}\n\
.testReportDiv span {\n\
    display: inline-block;\n\
    width: 120px;\n\
}\n\
.testReportDiv table {\n\
    border-top: 1px solid #999;\n\
    text-align: left;\n\
    width: 100%;\n\
}\n\
.testReportDiv table > tbody > tr:nth-child(odd) {\n\
    background: #bfb;\n\
}\n\
.testReportDiv .displayNone {\n\
    display: none;\n\
}\n\
.testReportDiv .footer {\n\
    text-align: center;\n\
}\n\
.testReportDiv .platform {\n\
    background: #fff;\n\
    border: 1px solid #999;\n\
    margin-bottom: 20px;\n\
    padding: 0 10px 10px 10px;\n\
    text-align: left;\n\
}\n\
.testReportDiv .summary {\n\
    background: #bfb;\n\
}\n\
.testReportDiv .testFailed {\n\
    background: #f99;\n\
}\n\
.testReportDiv .testPending {\n\
    background: #99f;\n\
}\n\
</style>\n\
'.replace("<style>\n", "")).replace((/<\/script>[\S\s]*?<\/body>/), '\
</script>\n\
<div class="testReportDiv">\n\
<h1>test-report for\n\
    <a\n\
        {{#if env.npm_package_homepage}}\n\
        href="{{env.npm_package_homepage}}"\n\
        {{/if env.npm_package_homepage}}\n\
    >\n\
        {{env.npm_package_name}} ({{env.npm_package_version}})\n\
    </a>\n\
</h1>\n\
<div class="platform summary">\n\
<h2>summary</h2>\n\
<h4>\n\
    <span>version</span>-\n\
        {{env.npm_package_version}}<br>\n\
    <span>test date</span>- {{date}}<br>\n\
    <span>commit info</span>-\n\
        {{#if env.CI_COMMIT_INFO}}\n\
        {{env.CI_COMMIT_INFO}}<br>\n\
        {{#unless env.CI_COMMIT_INFO}}\n\
        undefined<br>\n\
        {{/if env.CI_COMMIT_INFO}}\n\
</h4>\n\
<table>\n\
<thead>\n\
    <tr>\n\
        <th>total time-elapsed</th>\n\
        <th>total tests failed</th>\n\
        <th>total tests passed</th>\n\
        <th>total tests pending</th>\n\
    </tr>\n\
</thead>\n\
<tbody><tr>\n\
    <td>{{timeElapsed}} ms</td>\n\
    <td class="{{testStatusClass}}">{{testsFailed}}</td>\n\
    <td>{{testsPassed}}</td>\n\
    <td>{{testsPending}}</td>\n\
</tr></tbody>\n\
</table>\n\
</div>\n\
{{#each testPlatformList}}\n\
<div class="platform">\n\
<h4>\n\
    {{testPlatformNumber}}. {{name}}<br>\n\
    {{#if screenshot}}\n\
    <a href="{{screenshot encodeURIComponent}}">\n\
        <img alt="{{screenshot encodeURIComponent}}" src="{{screenshot encodeURIComponent}}">\n\
    </a>\n\
    <br>\n\
    {{/if screenshot}}\n\
    {{#if domOnEventWindowOnloadTimeElapsed}}\n\
    <span>onload-time</span>- {{domOnEventWindowOnloadTimeElapsed}} ms<br>\n\
    {{/if domOnEventWindowOnloadTimeElapsed}}\n\
    <span>time-elapsed</span>- {{timeElapsed}} ms<br>\n\
    <span>tests failed</span>- {{testsFailed}}<br>\n\
    <span>tests passed</span>- {{testsPassed}}<br>\n\
    <span>tests pending</span>- {{testsPending}}<br>\n\
</h4>\n\
<table>\n\
<thead><tr>\n\
    <th>#</th>\n\
    <th>time-elapsed</th>\n\
    <th>status</th>\n\
    <th>test-case</th>\n\
</tr></thead>\n\
<tbody>\n\
{{#each testCaseList}}\n\
<tr>\n\
    <td>{{testCaseNumber}}</td>\n\
    <td>{{timeElapsed}} ms</td>\n\
    <td class="{{testReportTestStatusClass}}">{{status}}</td>\n\
    <td>{{name}}</td>\n\
</tr>\n\
{{/each testCaseList}}\n\
</tbody>\n\
</table>\n\
<pre class="{{preClass}}" tabIndex="0">\n\
{{#each errorStackList}}\n\
{{errorStack}}\n\
{{/each errorStackList}}\n\
</pre>\n\
</div>\n\
{{/each testPlatformList}}\n\
<div class="footer">\n\
    [ this document was created with\n\
    <a href="https://github.com/kaizhu256/node-utility2" target="_blank">utility2</a>\n\
    ]\n\
</div>\n\
</div>\n\
</body>');



// https://img.shields.io/badge/tests_failed-999-dd0000.svg?style=flat
local.assetsDict["/assets.testReportBadge.template.svg"] =
'<svg xmlns="http://www.w3.org/2000/svg" width="103" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="103" height="20" fill="#555"/><rect rx="0" x="72" width="31" height="20" fill="#d00"/><path fill="#d00" d="M72 0h4v20h-4z"/><rect rx="0" width="103" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="37" y="15" fill="#010101" fill-opacity=".3">tests failed</text><text x="37" y="14">tests failed</text><text x="86.5" y="15" fill="#010101" fill-opacity=".3">999</text><text x="86.5" y="14">999</text></g></svg>';



local.assetsDict["/assets.utility2.rollup.start.js"] = '\
/* utility2.rollup.js begin */\n\
/* istanbul ignore all */\n\
' + local.assetsDict["/assets.utility2.header.js"] + '\
\n\
\n\
\n\
/* jslint utility2:true */\n\
(function () {\n\
    "use strict";\n\
    // init utility2_rollup\n\
    globalThis.utility2_rollup = (\n\
        globalThis.utility2_rollup_old\n\
        || globalThis.globalLocal\n\
    );\n\
    globalThis.utility2_rollup.local = globalThis.utility2_rollup;\n\
    globalThis.utility2_rollup_old = null;\n\
}());\n\
';



local.assetsDict["/assets.utility2.rollup.content.js"] = '\
(function (local) {\n\
    "use strict";\n\
/* jslint ignore:start */\n\
/* utility2.rollup.js content */\n\
/* jslint ignore:end */\n\
    return local;\n\
}(globalThis.utility2_rollup));\n\
';



local.assetsDict["/assets.utility2.rollup.end.js"] = '\
(function () {\n\
    "use strict";\n\
    globalThis.utility2_rollup_old = globalThis.utility2_rollup;\n\
    globalThis.utility2_rollup = null;\n\
}());\n\
/* utility2.rollup.js end */\n\
';



local.assetsDict["/favicon.ico"] = "";
/* jslint ignore:end */



// run shared js-env code - cli
local.cliDict = {};

local.cliDict["utility2.browserTest"] = function () {
/*
 * <urlList> <mode>
 * will browser-test in parallel, comma-separated <urlList> with given <mode>
 */
    local.browserTest({
        url: process.argv[3]
    }, local.onErrorDefault);
};

local.cliDict["utility2.githubCrudContentDelete"] = function () {
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

local.cliDict["utility2.githubCrudContentGet"] = function () {
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

local.cliDict["utility2.githubCrudContentPut"] = function () {
/*
 * <fileRemote> <fileLocal> <commitMessage>
 * will put on github <fileRemote>, <fileLocal>
 */
    local.github_crud.githubCrudContentPutFile({
        message: process.argv[5],
        url: process.argv[3],
        file: process.argv[4]
    }, function (err) {
        process.exit(Boolean(err));
    });
};

local.cliDict["utility2.githubCrudContentTouch"] = function () {
/*
 * <fileRemoteList> <commitMessage>
 * will touch on github in parallel, comma-separated <fileRemoteList>
 */
    local.github_crud.githubCrudContentTouchList({
        message: process.argv[4],
        urlList: process.argv[3].split(
            /[,\s]/g
        ).filter(local.value)
    }, function (err) {
        process.exit(Boolean(err));
    });
};

local.cliDict["utility2.githubCrudRepoCreate"] = function () {
/*
 * <repoList>
 * will create on github in parallel, comma-separated <repoList>
 */
    local.github_crud.githubCrudRepoCreateList({
        urlList: process.argv[3].split(
            /[,\s]/g
        ).filter(local.value)
    }, function (err) {
        process.exit(Boolean(err));
    });
};

local.cliDict["utility2.githubCrudRepoDelete"] = function () {
/*
 * <repoList>
 * will delete from github in parallel, comma-separated <repoList>
 */
    local.github_crud.githubCrudRepoDeleteList({
        urlList: process.argv[3].split(
            /[,\s]/g
        ).filter(local.value)
    }, function (err) {
        process.exit(Boolean(err));
    });
};

local.cliDict["utility2.start"] = function () {
/*
 * <port>
 * will start utility2 http-server on given <port> (default 8081)
 */
    local.env.PORT = process.argv[3] || local.env.PORT;
    globalThis.local = local;
    local.replStart();
    local.testRunServer({});
};

local.cliDict["utility2.swaggerValidateFile"] = function () {
/*
 * <file/url>
 * will swagger-validate file/url
 */
    setTimeout(function () {
        local.swgg.swaggerValidateFile({
            file: process.argv[3]
        }, function (err, data) {
            console.error(data);
            process.exit(err);
        });
    });
};

local.cliDict["utility2.testReportCreate"] = function () {
/*
 *
 * will create test-report
 */
    process.exit(local.testReportCreate(JSON.parse(local.fs.readFileSync(
        local.env.npm_config_dir_build + "/test-report.json"
    ))).testsFailed);
};
}());



// run shared js-env code - function
(function () {
// init lib Blob
local.Blob = globalThis.Blob || function (list, opt) {
    /*
     * this function will emulate in node, browser's Blob class
     * https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
     */
    this.buf = local.bufferConcat(list.map(function (elem) {
        if (
            typeof elem === "string"
            || Object.prototype.toString.call(elem) === "[object Uint8Array]"
        ) {
            return elem;
        }
        // emulate in node, browser-behavior - auto-stringify arbitrary data
        return String(elem);
    }));
    this.type = (opt && opt.type) || "";
};

// init lib FormData
local.FormData = function () {
/*
 * this function will create a serverLocal-compatible FormData instance
 * The FormData(form) constructor must run these steps:
 * 1. Let fd be a new FormData object.
 * 2. If form is given, set fd's entries to the result
 *    of constructing the form data set for form. (not implemented)
 * 3. Return fd.
 * https://xhr.spec.whatwg.org/#dom-formdata
 */
    this.entryList = [];
};

local.FormData.prototype.append = function (name, value, filename) {
/*
 * The append(name, value, filename) method, when invoked, must run these steps:
 * 1. If the filename argument is given, set value to a new File object
 *    whose contents are value and name is filename.
 * 2. Append a new entry whose name is name, and value is value,
 *    to context object's list of entries.
 * https://xhr.spec.whatwg.org/#dom-formdata-append
 */
    if (filename) {
        // bug-workaround - chromium cannot assign name to Blob instance
        local.tryCatchOnError(function () {
            value.name = filename;
        }, local.nop);
    }
    this.entryList.push({
        name,
        value
    });
};

local.FormData.prototype.read = function (onError) {
/*
 * this function will read from formData as a buffer, e.g.
 * --Boundary\r\n
 * Content-Disposition: form-data; name="key"\r\n
 * \r\n
 * value\r\n
 * --Boundary\r\n
 * Content-Disposition: form-data; name="input1"; filename="file1.png"\r\n
 * Content-Type: image/jpeg\r\n
 * \r\n
 * <data1>\r\n
 * --Boundary\r\n
 * Content-Disposition: form-data; name="input2"; filename="file2.png"\r\n
 * Content-Type: image/jpeg\r\n
 * \r\n
 * <data2>\r\n
 * --Boundary--\r\n
 * https://tools.ietf.org/html/rfc7578
 */
    let boundary;
    let result;
    // handle null-case
    if (!this.entryList.length) {
        onError();
        return;
    }
    // init boundary
    boundary = "--" + Date.now().toString(16) + Math.random().toString(16);
    // init result
    result = [];
    local.onParallelList({
        list: this.entryList
    }, function (option2, onParallel) {
        let value;
        value = option2.elem.value;
        if (!(value && value.constructor === local.Blob)) {
            result[option2.ii] = [
                (
                    boundary + "\r\nContent-Disposition: form-data; name=\""
                    + option2.elem.name + "\"\r\n\r\n"
                ), value, "\r\n"
            ];
            onParallel.counter += 1;
            onParallel();
            return;
        }
        // read from blob in parallel
        onParallel.counter += 1;
        local.blobRead(value, function (err, data) {
            result[option2.ii] = !err && [
                (
                    boundary + "\r\nContent-Disposition: form-data; name=\""
                    + option2.elem.name + "\"" + (
                        (value && value.name)
                        // read param filename
                        ? "; filename=\"" + value.name + "\""
                        : ""
                    ) + "\r\n" + (
                        (value && value.type)
                        // read param Content-Type
                        ? "Content-Type: " + value.type + "\r\n"
                        : ""
                    ) + "\r\n"
                ), data, "\r\n"
            ];
            onParallel(err);
        });
    }, function (err) {
        // add closing boundary
        result.push([
            boundary + "--\r\n"
        ]);
        // concatenate result
        onError(
            err,
            // flatten result
            !err
            && local.bufferConcat(result.flat())
        );
    });
};

// init lib _http
local._http = {};

local._http.STATUS_CODES = {
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
    "418": "I'm a Teapot",
    "421": "Misdirected Request",
    "422": "Unprocessable Entity",
    "423": "Locked",
    "424": "Failed Dependency",
    "425": "Unordered Collection",
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
    "509": "Bandwidth Limit Exceeded",
    "510": "Not Extended",
    "511": "Network Authentication Required"
};

local._http.createServer = function () {
/*
 * this function will emulate in browser, node's http.createServer function
 * https://nodejs.org/dist/v0.12.18/docs/api/all.html#all_http_createserver_requestlistener
 */
    return {
        listen: function (port, onError) {
            onError(undefined, port);
        }
    };
};

local._http.request = function (xhr, onResponse) {
/*
 * this function will emulate in browser, node's http.request function
 * https://nodejs.org/dist/v0.12.18/docs/api/all.html#all_http_request_options_callback
 */
    let bufList;
    let data;
    let handler;
    let isDone;
    let req;
    let res;
    xhr = {
        end: function (_data) {
            if (isDone) {
                return;
            }
            isDone = true;
            data = _data;
            // async send req from client to server
            setTimeout(function () {
                local.serverLocalReqHandler(req, res);
            });
        },
        headers: xhr.headers,
        method: xhr.method,
        on: function () {
            return xhr;
        },
        timeout: xhr.timeout,
        url: xhr.href
    };
    bufList = [];
    handler = new globalThis.EventTarget();
    req = {
        emit: function (type, data) {
            handler.dispatchEvent(new globalThis.CustomEvent("req." + type, {
                detail: data
            }));
        },
        headers: xhr.headers,
        httpVersion: "1.1",
        method: xhr.method,
        on: function (type, onEvent) {
            handler.addEventListener("req." + type, function (evt) {
                onEvent(evt.detail);
            });
            if (req.readable && type === "end") {
                req.readable = null;
                req.emit("data", data);
                req.emit("end");
            }
            return req;
        },
        pipe: function (writable) {
            req.on("data", function (buf) {
                writable.write(buf);
            });
            req.on("end", function () {
                writable.end();
            });
            return writable;
        },
        readable: true,
        url: xhr.url
    };
    res = {
        emit: function (type, data) {
            handler.dispatchEvent(new globalThis.CustomEvent("res." + type, {
                detail: data
            }));
        },
        end: function (data) {
            if (res._isDone) {
                return;
            }
            res._isDone = true;
            bufList.push(data);
            // notify server res is finished
            res.emit("finish");
            // pass res to client
            onResponse(res);
            res.emit("data", local.bufferConcat(bufList));
            res.emit("end");
        },
        on: function (type, onEvent) {
            handler.addEventListener("res." + type, function (evt) {
                onEvent(evt.detail);
            });
            return res;
        },
        setHeader: function (key, val) {
            xhr.resHeaders[key.toLowerCase()] = val;
        },
        statusCode: 200,
        write: function (data) {
            bufList.push(data);
        }
    };
    return xhr;
};

local._testCase_buildApidoc_default = function (opt, onError) {
/*
 * this function will test buildApidoc's default handling-behavior
 */
    let require2;
    require2 = function (file) {
    /*
     * this function will require <file> in sandbox-env
     */
        let exports;
        let mockDict;
        let mockList;
        mockList = [
            [
                globalThis, {
                    setImmediate: local.nop,
                    setInterval: local.nop,
                    setTimeout: local.nop
                }
            ]
        ];
        [
            [
                local, "child_process"
            ], [
                local, "cluster"
            ], [
                local, "http"
            ], [
                local, "https"
            ], [
                local, "net"
            ], [
                local, "repl"
            ], [
                local.events, "prototype"
            ], [
                globalThis, "process"
            ], [
                local.stream, "prototype"
            ], [
                process, "stdin"
            ]
        ].forEach(function (elem, tmp) {
            tmp = elem[0][elem[1]];
            mockDict = {};
            Object.keys(tmp).forEach(function (key) {
                if (typeof tmp[key] === "function" && !(
                    /^(?:fs\.Read|fs\.read|process\.binding|process\.dlopen)/
                ).test(elem[1] + "." + key)) {
                    mockDict[key] = function () {
                        return;
                    };
                }
            });
            mockList.push([
                tmp, mockDict
            ]);
        });
        local.testMock(mockList, function (onError) {
            local.tryCatchOnError(function () {
                exports = require(file);
            }, local.onErrorDefault);
            onError();
        }, local.onErrorThrow);
        return exports;
    };
    if (
        local.isBrowser
        || local.env.npm_config_mode_coverage
        || local.env.npm_config_mode_test_case
        !== "testCase_buildApidoc_default"
    ) {
        onError(undefined, opt);
        return;
    }
    // save apidoc.html
    local.fsWriteFileWithMkdirpSync(
        "tmp/build/apidoc.html",
        local.apidocCreate(local.objectAssignDefault(opt, {
            blacklistDict: local,
            require: require2
        }))
    );
    console.error(
        "created apidoc file " + process.cwd() + "/tmp/build/apidoc.html\n"
    );
    onError();
};

local._testCase_buildApp_default = function (opt, onError) {
/*
 * this function will test buildApp's default handling-behavior
 */
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    globalThis.local.testCase_buildReadme_default(opt, local.onErrorThrow);
    globalThis.local.testCase_buildLib_default(opt, local.onErrorThrow);
    globalThis.local.testCase_buildTest_default(opt, local.onErrorThrow);
    local.buildApp(opt, onError);
};

local._testCase_buildLib_default = function (opt, onError) {
/*
 * this function will test buildLib's default handling-behavior
 */
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    return local.buildLib({}, onError);
};

local._testCase_buildReadme_default = function (opt, onError) {
/*
 * this function will test buildReadme's default handling-behavior
 */
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    return local.buildReadme({}, onError);
};

local._testCase_buildTest_default = function (opt, onError) {
/*
 * this function will test buildTest's default handling-behavior
 */
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    return local.buildTest({}, onError);
};

local._testCase_webpage_default = function (opt, onError) {
/*
 * this function will test webpage's default handling-behavior
 */
    local.domStyleValidate();
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    local.browserTest({
        fileScreenshot: (
            local.env.npm_config_dir_build
            + "/screenshot." + local.env.MODE_BUILD + ".browser.%2F.png"
        ),
        url: (
            local.assetsDict["/"].indexOf(
                "<script src=\"assets.test.js\"></script>"
            ) >= 0
            ? local.serverLocalHost
            + "?modeTest=1&timeoutDefault=" + local.timeoutDefault
            : local.serverLocalHost
            + "/assets.utility2.base.html?modeTest=1&timeoutDefault=1"
        ) + "&modeTestCase=" + local.modeTestCase.replace((
            /_?testCase_webpage_default/
        ), "")
    }, onError);
};

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
    let ajaxProgressUpdate;
    let bufferValidateAndCoerce;
    let isDone;
    let local2;
    let onError2;
    let onEvent;
    let stack;
    let streamCleanup;
    let timeout;
    let tmp;
    let xhr;
    let xhrInit;
    // init local2
    local2 = opt.local2 || local.utility2 || {};
    // init function
    ajaxProgressUpdate = local2.ajaxProgressUpdate || function () {
        return;
    };
    bufferValidateAndCoerce = local2.bufferValidateAndCoerce || function (
        buf,
        mode
    ) {
    /*
     * this function will validate and coerce/convert
     * <buf> to Buffer/Uint8Array, or String if <mode> = "string"
     */
        // coerce ArrayBuffer to Buffer
        if (Object.prototype.toString.call(buf) === "[object ArrayBuffer]") {
            buf = new Uint8Array(buf);
        }
        // convert Buffer to utf8
        if (mode === "string" && typeof buf !== "string") {
            buf = String(buf);
        }
        return buf;
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
            // decrement counter
            ajaxProgressUpdate.counter = Math.max(
                ajaxProgressUpdate.counter - 1,
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
                ), function (ignore, key, val) {
                    xhr.resHeaders[key.toLowerCase()] = val;
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
        let err;
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
        // coerce Uint8Array to Buffer
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
        xhr = local.value(local2.urlParse || require("url").parse)(opt.url);
        // init xhr
        xhrInit();
        // init xhr - http.request
        xhr = local.value(
            opt.httpReq
            || (local.isBrowser && local2.http.request)
            || require(xhr.protocol.slice(0, -1)).request
        )(xhr, function (resStream) {
        /*
         * this function will read <resStream>
         */
            let bufList;
            bufList = [];
            xhr.resHeaders = resStream.headers || xhr.resHeaders;
            xhr.resStream = resStream;
            xhr.statusCode = resStream.statusCode;
            resStream.dataLength = 0;
            resStream.on("data", function (buf) {
                bufList.push(buf);
            });
            resStream.on("end", function () {
                xhr.response = (
                    local.isBrowser
                    ? bufList[0]
                    : Buffer.concat(bufList)
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
    // increment counter
    ajaxProgressUpdate.counter |= 0;
    ajaxProgressUpdate.counter += 1;
    // handle evt
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

local.assertJsonEqual = function (aa, bb, message) {
/*
 * this function will assert jsonStringifyOrdered(<aa>) === JSON.stringify(<bb>)
 */
    aa = local.jsonStringifyOrdered(aa);
    bb = JSON.stringify(bb);
    local.assertOrThrow(aa === bb, message || [
        aa, bb
    ]);
};

local.assertJsonNotEqual = function (aa, bb, message) {
/*
 * this function will assert jsonStringifyOrdered(<aa>) !== JSON.stringify(<bb>)
 */
    aa = local.jsonStringifyOrdered(aa);
    bb = JSON.stringify(bb);
    local.assertOrThrow(aa !== bb, [
        aa
    ], message || aa);
};

local.base64FromBuffer = function (buf) {
/*
 * this function will convert Uint8Array <buf> to base64
 * https://developer.mozilla.org/en-US/Add-ons/Code_snippets/StringView#The_code
 */
    let ii;
    let mod3;
    let text;
    let uint24;
    let uint6ToB64;
    // convert utf8 to Uint8Array
    if (typeof buf === "string") {
        buf = new TextEncoder().encode(buf);
    }
    buf = buf || [];
    text = "";
    uint24 = 0;
    uint6ToB64 = function (uint6) {
        return (
            uint6 < 26
            ? uint6 + 65
            : uint6 < 52
            ? uint6 + 71
            : uint6 < 62
            ? uint6 - 4
            : uint6 === 62
            ? 43
            : 47
        );
    };
    ii = 0;
    while (ii < buf.length) {
        mod3 = ii % 3;
        uint24 |= buf[ii] << (16 >>> mod3 & 24);
        if (mod3 === 2 || buf.length - ii === 1) {
            text += String.fromCharCode(
                uint6ToB64(uint24 >>> 18 & 63),
                uint6ToB64(uint24 >>> 12 & 63),
                uint6ToB64(uint24 >>> 6 & 63),
                uint6ToB64(uint24 & 63)
            );
            uint24 = 0;
        }
        ii += 1;
    }
    return text.replace((
        /A(?=A$|$)/gm
    ), "=");
};

local.base64ToBuffer = function (b64, mode) {
/*
 * this function will convert <b64> to Uint8Array
 * https://gist.github.com/wang-bin/7332335
 */
    let buf;
    let byte;
    let chr;
    let ii;
    let jj;
    let map64;
    let mod4;
    b64 = b64 || "";
    buf = new Uint8Array(b64.length); // 3/4
    byte = 0;
    jj = 0;
    map64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    mod4 = 0;
    ii = 0;
    while (ii < b64.length) {
        chr = map64.indexOf(b64[ii]);
        if (chr >= 0) {
            mod4 %= 4;
            if (mod4 === 0) {
                byte = chr;
            } else {
                byte = byte * 64 + chr;
                buf[jj] = 255 & (byte >> ((-2 * (mod4 + 1)) & 6));
                jj += 1;
            }
            mod4 += 1;
        }
        ii += 1;
    }
    // optimization - create resized-view of buf
    buf = buf.subarray(0, jj);
    return local.bufferValidateAndCoerce(buf, mode);
};

local.base64ToUtf8 = function (b64) {
/*
 * this function will convert <b64> to utf8
 */
    return local.base64ToBuffer(b64, "string");
};

local.blobRead = function (blob, onError) {
/*
 * this function will read from <blob>
 */
    let isDone;
    let reader;
    if (blob && blob.constructor && blob.constructor === local.FormData) {
        blob.read(onError);
        return;
    }
    if (!local.isBrowser) {
        onError(undefined, local.bufferValidateAndCoerce(blob.buf));
        return;
    }
    reader = new FileReader();
    reader.onabort = function (evt) {
        if (isDone) {
            return;
        }
        isDone = true;
        switch (evt.type) {
        case "abort":
        case "error":
            onError(new Error("blobRead - " + evt.type));
            break;
        case "load":
            onError(
                undefined,
                Object.prototype.toString.call(reader.result)
                === "[object ArrayBuffer]"
                // convert ArrayBuffer to Uint8Array
                ? new Uint8Array(reader.result)
                : reader.result
            );
            break;
        }
    };
    reader.onerror = reader.onabort;
    reader.onload = reader.onabort;
    reader.readAsArrayBuffer(blob);
};

local.browserTest = function (opt, onError) {
/*
 * this function will spawn google-puppeteer-process to test <opt>.url
 */
    let browser;
    let fileScreenshot;
    let isDone;
    let onParallel;
    let page;
    let testId;
    let testName;
    let timerTimeout;
    // init utility2_testReport
    globalThis.utility2_testReport = globalThis.utility2_testReport || {
        coverage: globalThis.__coverage__,
        testPlatformList: [
            {
                name: (
                    local.isBrowser
                    ? (
                        "browser - "
                        + location.pathname + " - " + navigator.userAgent
                    )
                    : "node - " + process.platform + " " + process.version
                ) + " - " + new Date().toISOString(),
                testCaseList: []
            }
        ]
    };
    if (opt.modeTestReportCreate) {
        return;
    }
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        // node - init
        case 1:
            onParallel = local.onParallel(opt.gotoNext);
            onParallel.counter += 1;
            isDone = 0;
            testId = Math.random().toString(16);
            testName = new local.url.URL(opt.url).pathname;
            testName = (
                local.env.MODE_BUILD + ".browser."
                + encodeURIComponent(testName.replace(
                    "/build.."
                    + local.env.CI_BRANCH
                    + ".." + local.env.CI_HOST,
                    "/build"
                ))
            );
            fileScreenshot = (
                local.env.npm_config_dir_build + "/screenshot."
                + testName
                + ".png"
            );
            opt.url = opt.url.replace(
                "{{timeExit}}",
                Date.now() + local.timeoutDefault
            );
            // init timerTimeout
            timerTimeout = local.onTimeout(
                opt.gotoNext,
                local.timeoutDefault,
                testName
            );
            // create puppeteer browser
            local.puppeteerLaunch({
                args: [
                    "--headless",
                    "--incognito",
                    "--no-sandbox",
                    "--remote-debugging-port=0"
                ],
                dumpio: !opt.modeSilent,
                executablePath: local.env.CHROME_BIN,
                ignoreDefaultArgs: true
            }).then(opt.gotoNextData);
            break;
        case 2:
            browser = data;
            browser.newPage().then(opt.gotoNextData);
            break;
        case 3:
            page = data;
            page.goto(opt.url).then(opt.gotoNextData);
            break;
        case 4:
            onParallel.counter += 1;
            setTimeout(function () {
                page.screenshot({
                    path: fileScreenshot
                }).then(function () {
                    console.error(
                        "\nbrowserTest - created screenshot file "
                        + fileScreenshot
                        + "\n"
                    );
                    onParallel();
                });
            }, 100);
            page.evaluate(function (testId) {
                window.utility2_testId = testId;
            }, testId);
            page.on("metrics", function (metric) {
                if (isDone >= 1 || metric.title !== testId) {
                    return;
                }
                isDone = 1;
                opt.gotoNext();
            });
            break;
        case 5:
            page.evaluate(function () {
                return JSON.stringify(window.utility2_testReport);
            }).then(opt.gotoNextData);
            break;
        case 6:
            data = JSON.parse(data);
            // merge browser-screenshot
            data.testPlatformList[0].screenshot = fileScreenshot.replace((
                /.*\//
            ), "");
            // merge browser-coverage
            local.istanbulCoverageMerge(globalThis.__coverage__, data.coverage);
            // merge browser-test-report
            local.testReportMerge(globalThis.utility2_testReport, data);
            // save test-report.json
            onParallel.counter += 1;
            local.fs.writeFile(
                local.env.npm_config_dir_build + "/test-report.json",
                JSON.stringify(globalThis.utility2_testReport),
                function (err) {
                    console.error(
                        "\nbrowserTest - merged test-report "
                        + local.env.npm_config_dir_build + "/test-report.json"
                        + "\n"
                    );
                    onParallel(err);
                }
            );
            onParallel();
            break;
        default:
            if (isDone >= 2) {
                return;
            }
            isDone = 2;
            // cleanup timerTimeout
            clearTimeout(timerTimeout);
            browser.close();
            onError(err);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.bufferConcat = function (bufList) {
/*
 * this function will emulate in browser, node's Buffer.concat
 */
    let byteLength;
    let ii;
    let isString;
    let jj;
    let result;
    isString = true;
    result = [
        ""
    ];
    byteLength = 0;
    bufList.forEach(function (buf) {
        if (buf !== 0 && !(buf && buf.length)) {
            return;
        }
        // optimization - concat string
        if (isString && typeof buf === "string") {
            result[0] += buf;
            return;
        }
        isString = null;
        buf = local.bufferValidateAndCoerce(buf);
        byteLength += buf.byteLength;
        result.push(buf);
    });
    // optimization - return string
    if (isString) {
        return result[0];
    }
    result[0] = local.bufferValidateAndCoerce(result[0]);
    byteLength += result[0].byteLength;
    bufList = result;
    result = local.bufferValidateAndCoerce(new Uint8Array(byteLength));
    ii = 0;
    bufList.forEach(function (buf) {
        jj = 0;
        while (jj < buf.byteLength) {
            result[ii] = buf[jj];
            ii += 1;
            jj += 1;
        }
    });
    return result;
};

local.bufferIndexOfSubBuffer = function (buf, subBff, fromIndex) {
/*
 * this function will search <buf> from <fromIndex> for position of <subBff>
 */
    let ii;
    let jj;
    let kk;
    if (!subBff.length) {
        return 0;
    }
    ii = fromIndex || 0;
    while (ii < buf.length) {
        kk = ii;
        jj = 0;
        while (jj < subBff.length) {
            if (subBff[jj] !== buf[kk]) {
                break;
            }
            kk += 1;
            jj += 1;
        }
        if (jj === subBff.length) {
            return kk - jj;
        }
        ii += 1;
    }
    return -1;
};

local.bufferRandomBytes = function (length) {
/*
 * this function will return a Buffer with given <length>,
 * filled with cryptographically-strong random-values
 */
    return (
        (
            typeof window === "object"
            && window.crypto
            && typeof window.crypto.getRandomValues === "function"
        )
        ? window.crypto.getRandomValues(new Uint8Array(length))
        : require("crypto").randomBytes(length)
    );
};

local.bufferToUtf8 = function (buf) {
/*
 * this function will convert Uint8Array <buf> to utf8
 */
    return local.bufferValidateAndCoerce(buf, "string");
};

local.bufferValidateAndCoerce = function (buf, mode) {
/*
 * this function will validate and coerce/convert
 * <buf> to Buffer/Uint8Array, or String if <mode> = "string"
 */
    // validate not 0
    if (buf !== 0) {
        buf = buf || "";
    }
    if (typeof buf === "string" && mode === "string") {
        return buf;
    }
    // convert utf8 to Uint8Array
    if (typeof buf === "string") {
        buf = new TextEncoder().encode(buf);
    // validate instanceof Uint8Array
    } else if (Object.prototype.toString.call(buf) !== "[object Uint8Array]") {
        throw new Error(
            "bufferValidateAndCoerce - value is not instanceof "
            + "ArrayBuffer, String, or Uint8Array"
        );
    }
    // convert Uint8Array to utf8
    if (mode === "string") {
        return new TextDecoder().decode(buf);
    }
    // coerce Uint8Array to Buffer
    if (globalThis.Buffer && Buffer.isBuffer && !Buffer.isBuffer(buf)) {
        Object.setPrototypeOf(buf, Buffer.prototype);
    }
    return buf;
};

local.buildApp = function (opt, onError) {
/*
 * this function will build app with given <opt>
 */
    opt = local.objectSetDefault(opt, {
        assetsList: []
    });
    // build assets
    local.fsRmrfSync("tmp/build/app");
    local.onParallelList({
        list: [
            {
                file: "/LICENSE",
                url: "/LICENSE"
            }, {
                file: "/assets." + local.env.npm_package_nameLib + ".html",
                url: "/index.html"
            }, {
                file: "/assets." + local.env.npm_package_nameLib + ".js",
                url: "/assets." + local.env.npm_package_nameLib + ".js"
            }, {
                file: "/assets.app.js",
                url: "/assets.app.js"
            }, {
                file: "/assets.example.html",
                url: "/assets.example.html"
            }, {
                file: "/assets.example.js",
                url: "/assets.example.js"
            }, {
                file: "/assets.swgg.html",
                url: "/assets.swgg.html"
            }, {
                file: "/assets.swgg.swagger.json",
                url: "/assets.swgg.swagger.json"
            }, {
                file: "/assets.swgg.swagger.petstore.json",
                url: "/assets.swgg.swagger.petstore.json"
            }, {
                file: "/assets.swgg.swagger.server.json",
                url: "/assets.swgg.swagger.server.json"
            }, {
                file: "/assets.test.js",
                url: "/assets.test.js"
            }, {
                file: "/assets.utility2.html",
                url: "/assets.utility2.html"
            }, {
                file: "/assets.utility2.base.html",
                url: "/assets.utility2.base.html"
            }, {
                file: "/assets.utility2.rollup.js",
                url: "/assets.utility2.rollup.js"
            }, {
                file: "/index.html",
                url: "/index.html"
            }, {
                file: "/index.rollup.html",
                url: "/index.rollup.html"
            }, {
                file: "/jsonp.utility2.stateInit",
                url: (
                    "/jsonp.utility2.stateInit"
                    + "?callback=window.utility2.stateInit"
                )
            }
        ].concat(opt.assetsList)
    }, function (option2, onParallel) {
        option2 = option2.elem;
        onParallel.counter += 1;
        local.ajax(option2, function (err, xhr) {
            // handle err
            local.assertOrThrow(!err, err);
            // jslint file
            local.jslintAndPrint(xhr.responseText, option2.file, {
                conditional: true,
                coverage: local.env.npm_config_mode_coverage
            });
            // handle err
            local.assertOrThrow(
                !local.jslint.jslintResult.errMsg,
                local.jslint.jslintResult.errMsg
            );
            local.fsWriteFileWithMkdirpSync(
                "tmp/build/app" + option2.file,
                xhr.response
            );
            onParallel();
        });
    }, function (err) {
        // handle err
        local.assertOrThrow(!err, err);
        // test standalone assets.app.js
        local.fsWriteFileWithMkdirpSync(
            "tmp/buildApp/assets.app.js",
            local.assetsDict["/assets.app.js"]
        );
        local.childProcessSpawnWithTimeout("node", [
            "assets.app.js"
        ], {
            cwd: "tmp/buildApp",
            env: {
                PATH: local.env.PATH,
                PORT: (Math.random() * 0x10000) | 0x8000,
                npm_config_timeout_exit: 5000
            },
            stdio: [
                "ignore", "ignore", 2
            ]
        }).on("error", onError).on("exit", function (exitCode) {
            // validate exitCode
            local.assertOrThrow(!exitCode, exitCode);
            onError();
        });
    });
};

local.buildLib = function (opt, onError) {
/*
 * this function will build lib with given <opt>
 */
    let result;
    local.objectSetDefault(opt, {
        customize: local.nop,
        dataFrom: local.fsReadFileOrEmptyStringSync(
            "lib." + local.env.npm_package_nameLib + ".js",
            "utf8"
        ),
        dataTo: local.templateRenderMyApp(
            local.assetsDict["/assets.my_app.template.js"],
            opt
        )
    });
    // search-and-replace - customize dataTo
    [
        // customize top-level comment-description
        (
            /\n\u0020\*\n(?:[\S\s]*?\n)?\u0020\*\/\n/
        ),
        // customize body after /* validateLineSortedReset */
        (
            /\n\/\*\u0020validateLineSortedReset\u0020\*\/\n[\S\s]*?$/
        )
    ].forEach(function (rgx) {
        opt.dataTo = local.stringMerge(opt.dataTo, opt.dataFrom, rgx);
    });
    // customize local for assets.utility2.rollup.js
    if (
        local.fs.existsSync("./assets.utility2.rollup.js")
        && local.env.npm_package_nameLib !== "swgg"
    ) {
        opt.dataTo = opt.dataTo.replace(
            "    // || globalThis.utility2_rollup_old",
            "    || globalThis.utility2_rollup_old"
        ).replace(
            "    // || require(\"./assets.utility2.rollup.js\")",
            "    || require(\"./assets.utility2.rollup.js\")"
        );
    }
    // save lib
    result = opt.dataTo;
    if (!local.env.npm_config_mode_coverage) {
        local.fs.writeFileSync(
            "lib." + local.env.npm_package_nameLib + ".js",
            result
        );
    }
    opt.customize(opt);
    onError();
    return result;
};

local.buildReadme = function (opt, onError) {
/*
 * this function will build readme with given <opt> my-app-lite template
 */
    let result;
    local.objectSetDefault(opt, {
        customize: local.nop,
        // reset toc
        dataFrom: local.fsReadFileOrEmptyStringSync(
            "README.md",
            "utf8"
        ).replace((
            /\n#\u0020table\u0020of\u0020contents$[\S\s]*?\n\n\n\n/m
        ), "\n# table of contents\n\n\n\n"),
        packageJsonRgx: (
            /\n#\u0020package.json\n```json\n([\S\s]*?)\n```\n/
        )
    });
    // render dataTo
    opt.dataTo = local.templateRenderMyApp(
        local.assetsDict["/assets.readme.template.md"],
        opt
    );
    // init package.json
    opt.dataFrom.replace(opt.packageJsonRgx, function (match0, match1) {
        // remove null from package.json
        opt.packageJson = JSON.parse(match1.replace((
            /\u0020{4}".*?":\u0020null,?$/gm
        ), ""));
        opt.packageJson.description = opt.dataFrom.split("\n")[1];
        local.tryCatchOnError(function () {
            local.objectSetDefault(opt.packageJson, {
                nameLib: local.fsReadFileOrEmptyStringSync(
                    "./package.json",
                    "json"
                ).nameLib
            });
        }, local.nop);
        opt.packageJson = local.objectSetDefault(opt.packageJson, {
            nameLib: opt.packageJson.name.replace((
                /\W/g
            ), "_"),
            nameOriginal: opt.packageJson.name
        });
        opt.packageJson = local.objectSetDefault(
            opt.packageJson,
            JSON.parse(local.templateRenderMyApp(opt.packageJsonRgx.exec(
                local.assetsDict["/assets.readme.template.md"]
            )[1], opt)),
            2
        );
        // avoid npm-installing that
        delete opt.packageJson.devDependencies[opt.packageJson.name];
        // reset scripts
        opt.packageJson.scripts = {
            "build-ci": "./npm_scripts.sh",
            env: "env",
            eval: "./npm_scripts.sh",
            "heroku-postbuild": "./npm_scripts.sh",
            postinstall: "./npm_scripts.sh",
            start: "./npm_scripts.sh",
            test: "./npm_scripts.sh",
            utility2: "./npm_scripts.sh"
        };
        // save package.json
        local.fs.writeFileSync(
            "package.json",
            local.jsonStringifyOrdered(opt.packageJson, undefined, 4) + "\n"
        );
        // re-render dataTo
        opt.dataTo = local.templateRenderMyApp(
            local.assetsDict["/assets.readme.template.md"],
            opt
        );
        opt.dataTo = opt.dataTo.replace(
            opt.packageJsonRgx,
            match0.replace(
                match1,
                local.jsonStringifyOrdered(opt.packageJson, undefined, 4)
            )
        );
    });
    // search-and-replace - customize dataTo
    [
        // customize name and description
        (
            /.*?\n.*?\n/
        ),
        // customize cdn-download
        (
            /\n#\u0020cdn\u0020download\n[\S\s]*?\n\n\n\n/
        ),
        // customize live-web-demo
        (
            /\n#\u0020live\u0020web\u0020demo\n[\S\s]*?\n\n\n\n/
        ),
        // customize to-do
        (
            /\n####\u0020todo\n[\S\s]*?\n\n\n\n/
        ),
        // customize example.js - shared js-env code - init-before
        (
            /\nglobalThis\.local\u0020=\u0020local;\n[^`]*?\n\/\/\u0020run\u0020browser\u0020js\-env\u0020code\u0020-\u0020init-test\n/
        ),
        // customize example.js - html-body
        (
            /\n<!--\u0020custom-html-start\u0020-->\\n\\\n[^`]*?\n<!--\u0020custom-html-end\u0020-->\\n\\\n/
        ),
        // customize build_ci - shBuildCiAfter
        (
            /\nshBuildCiAfter\u0020\(\)\u0020\{\(set\u0020-e\n[\S\s]*?\n\)\}\n/
        ),
        // customize build_ci - shBuildCiBefore
        (
            /\nshBuildCiBefore\u0020\(\)\u0020\{\(set\u0020-e\n[\S\s]*?\n\)\}\n/
        )
    ].forEach(function (rgx) {
        opt.dataTo = local.stringMerge(opt.dataTo, opt.dataFrom, rgx);
    });
    // customize private-repository
    if (local.env.npm_package_private) {
        opt.dataTo = opt.dataTo.replace((
            /\n\[!\[NPM\]\(https:\/\/nodei.co\/npm\/.*?\n/
        ), "\n");
        opt.dataTo = opt.dataTo.replace("$ npm install ", (
            "$ git clone "
            + local.env.npm_package_repository_url.replace(
                "git+https://github.com/",
                "git@github.com:"
            ) + " --single-branch -b beta node_modules/"
        ));
    }
    // customize version
    [
        "dataFrom", "dataTo"
    ].forEach(function (elem) {
        opt[elem] = opt[elem].replace((
            /\n(####\u0020changelog\u0020|-\u0020npm\u0020publish\u0020)\d+?\.\d+?\.\d+?.*?\n/g
        ), "\n$1" + opt.packageJson.version + "\n");
    });
    // customize swaggerdoc
    if (
        !local.assetsDict["/assets.swgg.swagger.json"]
        || (
            /\bswggUiContainer\b/
        ).test(local.assetsDict["/index.html"])
        || local.env.npm_package_name === "utility2"
    ) {
        opt.dataTo = opt.dataTo.replace((
            /\n####\u0020swagger\u0020doc\n[\S\s]*?\n####\u0020/
        ), "\n#### ");
    }
    // customize example.js
    if (
        local.assetsDict["/index.html"].indexOf(
            "<script src=\"assets.example.js\"></script>"
        ) < 0
    ) {
        opt.dataTo = opt.dataTo.replace((
            /\nif\u0020\(!local.isBrowser\)\u0020\{\n[\S\s]*?\n\}\(\)\);\n/g
        ), "\nif (!local.isBrowser) {\n    return;\n}\n}());\n");
    }
    // customize comment
    opt.dataFrom.replace((
        /^(\u0020*?)(?:#\!\!\u0020|#\/\/\u0020|\/\/\!\!\u0020|<!--\u0020)(.*?)(?:\u0020-->)?$/gm
    ), function (match0, match1, match2) {
        opt.dataTo = opt.dataTo.replace(
            "\n" + match1 + match2 + "\n",
            "\n" + match0 + "\n"
        );
    });
    // customize - user-defined
    opt.customize(opt);
    // customize assets.index.template.html
    if (local.assetsDict["/assets.index.template.html"].indexOf(
        "\"assets.utility2.template.html\""
    ) < 0) {
        opt.dataTo = opt.dataTo.replace((
            /\n\/\*\u0020jslint\u0020ignore:start\u0020\*\/\nlocal.assetsDict\["\/assets.index.template.html"\]\u0020=\u0020'\\\n[\S\s]*?\n\/\*\u0020jslint\u0020ignore:end\u0020\*\/\n/
        ), "\n");
    }
    // customize shDeployCustom
    if (opt.dataFrom.indexOf("    shDeployCustom\n") >= 0) {
        [
            // customize example.sh
            (
                /\n####\u0020changelog\u0020[\S\s]*\n#\u0020quickstart\u0020example.js\n/
            ), (
                opt.dataFrom.indexOf("\"assets.utility2.template.html\"") < 0
                && local.value(
                    /\n#\u0020quickstart\u0020[\S\s]*?\n#\u0020extra\u0020screenshots\n/
                )
            )
        ].forEach(function (rgx) {
            opt.dataTo = local.stringMerge(opt.dataTo, opt.dataFrom, rgx);
        });
        // customize screenshot
        opt.dataTo = opt.dataTo.replace((
            /^1\.\u0020.*?screenshot\.(?:npmTest|testExampleJs|testExampleSh).*?\.png[\S\s]*?\n\n/gm
        ), "");
    }
    // customize shNpmTestPublished
    opt.dataTo = opt.dataTo.replace(
        "$ npm install " + local.env.GITHUB_REPO + "#alpha",
        "$ npm install " + local.env.npm_package_name
    );
    if (opt.dataFrom.indexOf("    shNpmTestPublished\n") < 0) {
        opt.dataTo = opt.dataTo.replace(
            "$ npm install " + local.env.npm_package_name,
            "$ npm install " + local.env.GITHUB_REPO + "#alpha"
        );
        [
            (
                /\n.*?\bhttps:\/\/www.npmjs.com\/package\/.*?\n/
            ), (
                /\n.*?npmPackageDependencyTree.*?\n/
            )
        ].forEach(function (rgx) {
            opt.dataTo = opt.dataTo.replace(rgx, "");
        });
    }
    // customize shBuildCiAfter and shBuildCiBefore
    [
        [
            "shDeployGithub", (
                /.*?\/screenshot\.deployGithub.*?\n/g
            )
        ], [
            "shDeployHeroku", (
                /.*?\/screenshot\.deployHeroku.*?\n/g
            )
        ], [
            "shReadmeTest example.js", (
                /.*?\/screenshot\.testExampleJs.*?\n/g
            )
        ], [
            "shReadmeTest example.sh", (
                /.*?\/screenshot\.testExampleSh.*?\n/g
            )
        ]
    ].forEach(function (elem) {
        if (opt.dataFrom.indexOf("    " + elem[0] + "\n") >= 0) {
            return;
        }
        // customize test-server
        opt.dataTo = opt.dataTo.replace(
            new RegExp(
                "\\n\\| test-server-"
                + elem[0].replace("shDeploy", "").toLowerCase()
                + " : \\|.*?\\n"
            ),
            "\n"
        );
        // customize screenshot
        opt.dataTo = opt.dataTo.replace(elem[1], "");
    });
    opt.dataTo = local.templateRenderMyApp(opt.dataTo, opt);
    // customize toc
    opt.toc = "\n# table of contents\n";
    opt.dataTo.replace((
        /\n\n\n\n#\u0020(.*)/g
    ), function (ignore, match1) {
        if (match1 === "table of contents") {
            return;
        }
        opt.toc += "1. [" + match1 + "](#" + match1.toLowerCase().replace((
            /[^\u0020\-0-9A-Z_a-z]/g
        ), "").replace((
            /\u0020/g
        ), "-") + ")\n";
    });
    opt.dataTo = opt.dataTo.replace("\n# table of contents\n", opt.toc);
    // customize whitespace
    opt.dataTo = opt.dataTo.replace((
        /\n{5,}/g
    ), "\n\n\n\n");
    // save README.md
    result = opt.dataTo;
    local.fs.writeFileSync("README.md", result);
    // customize assets.swgg.swagger.json
    opt.swaggerJson = local.swgg.normalizeSwaggerJson(
        local.fsReadFileOrEmptyStringSync("assets.swgg.swagger.json", "json")
    );
    local.objectSetOverride(opt.swaggerJson, {
        info: {
            title: opt.packageJson.name,
            version: opt.packageJson.version,
            "x-swgg-description": opt.packageJson.description,
            "x-swgg-homepage": opt.packageJson.homepage
        }
    }, 2);
    opt.dataTo.replace((
        /\bhttps:\/\/.*?\/assets\.app\.js/
    ), function (match0) {
        opt.swaggerJson["x-swgg-downloadStandaloneApp"] = (
            !local.env.npm_package_private && match0
        );
    });
    if (opt.swaggerJson.swagger) {
        local.fs.writeFileSync(
            "assets.swgg.swagger.json",
            local.jsonStringifyOrdered(opt.swaggerJson, undefined, 4) + "\n"
        );
    }
    onError();
    return result;
};

local.buildTest = function (opt, onError) {
/*
 * this function will build test with given <opt>
 */
    let result;
    local.objectSetDefault(opt, {
        customize: local.nop,
        dataFrom: local.fsReadFileOrEmptyStringSync("test.js", "utf8"),
        dataTo: local.templateRenderMyApp(
            local.assetsDict["/assets.test.template.js"],
            opt
        )
    });
    // search-and-replace - customize dataTo
    [
        // customize shared js\-env code - function
        (
            /\n\}\(\)\);\n\n\n\n\/\/\u0020run\u0020shared\u0020js\-env\u0020code\u0020-\u0020function\n[\S\s]*?$/
        )
    ].forEach(function (rgx) {
        opt.dataTo = local.stringMerge(opt.dataTo, opt.dataFrom, rgx);
    });
    // customize require("utility2")
    [
        "./assets.utility2.rollup.js",
        "./lib.utility2.js"
    ].forEach(function (file) {
        if (local.fs.existsSync(file)) {
            opt.dataTo = opt.dataTo.replace(
                "require(\"utility2\")",
                "require(\"" + file + "\")"
            );
        }
    });
    opt.customize(opt);
    // save test.js
    result = opt.dataTo;
    local.fs.writeFileSync("test.js", result);
    onError();
    return result;
};

local.childProcessSpawnWithTimeout = function (command, args, opt) {
/*
 * this function will run like child_process.spawn,
 * but with auto-timeout after timeout milliseconds
 * example usage:
    let child = local.childProcessSpawnWithTimeout(
        "/bin/sh",
        ["-c", "echo hello world"],
        {stdio: ["ignore", 1, 2], timeout: 5000}
    );
    child.on("error", console.error);
    child.on("exit", function (exitCode) {
        console.error("exitCode " + exitCode);
    });
 */
    let child;
    let child_process;
    let timerTimeout;
    child_process = require("child_process");
    // spawn child
    child = child_process.spawn(command, args, opt).on("exit", function () {
        // cleanup timerTimeout
        try {
            process.kill(timerTimeout.pid);
        } catch (ignore) {}
    });
    // init timerTimeout
    timerTimeout = child_process.spawn(
        // convert timeout to integer seconds with 2 second delay
        "sleep "
        + Math.floor(
            0.001 * (Number(opt && opt.timeout) || local.timeoutDefault)
            + 2
        )
        + "; kill -9 " + child.pid + " 2>/dev/null",
        {
            shell: true,
            stdio: "ignore"
        }
    );
    return child;
};

local.childProcessSpawnWithUtility2 = function (script, onError) {
/*
 * this function will run child_process.spawn, with lib.utility2.sh sourced
 */
    require("child_process").spawn(
        ". " + (process.env.npm_config_dir_utility2 || __dirname)
        + "/lib.utility2.sh; " + script,
        {
            shell: true,
            stdio: [
                "ignore", 1, 2
            ]
        }
    ).on("exit", function (exitCode) {
        onError(exitCode && Object.assign(new Error(), {
            exitCode
        }));
    });
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
    local.cliDict._help = local.cliDict._help || function () {
    /*
     *
     * will print help
     */
        let commandList;
        let file;
        let packageJson;
        let text;
        let textDict;
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
                + "  " + elem.command.sort().join("|") + "  "
                + elem.argList.join("  ")
            );
        }).join("\n\n");
        console.log(text);
    };
    local.cliDict["--eval"] = local.cliDict["--eval"] || local.cliDict._eval;
    local.cliDict["--help"] = local.cliDict["--help"] || local.cliDict._help;
    local.cliDict["-e"] = local.cliDict["-e"] || local.cliDict._eval;
    local.cliDict["-h"] = local.cliDict["-h"] || local.cliDict._help;
    local.cliDict._default = local.cliDict._default || local.cliDict._help;
    local.cliDict.help = local.cliDict.help || local.cliDict._help;
    local.cliDict._interactive = local.cliDict._interactive || function () {
    /*
     *
     * will start interactive-mode
     */
        globalThis.local = local;
        local.value(local.replStart || require("repl").start)({
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

local.corsBackendHostInject = function (url, backendHost, rgx, location) {
/*
 * this function will if <location>.host is a github site,
 * inject <backendHost> into <url> with given <rgx>
 */
    location = (
        location
        || (typeof window === "object" && window && window.location)
    );
    if (!(backendHost && location && (
        /\bgithub.io$/
    ).test(location.host))) {
        return url;
    }
    // init github-branch
    location.pathname.replace((
        /\/build\.\.(alpha|beta|master)\.\.travis-ci\.org\//
    ), function (ignore, match1) {
        backendHost = backendHost.replace("-alpha.", "-" + match1 + ".");
    });
    return url.replace(rgx || (
        /.*?($)/m
    ), backendHost + "$1");
};

local.corsForwardProxyHostIfNeeded = function (xhr) {
/*
 * this function will return xhr.corsForwardProxyHost, if needed
 */
    return (
        local.isBrowser
        && local.env.npm_package_nameLib
        && (
            /^https?:\/\//
        ).test(xhr.url)
        && xhr.url.indexOf(xhr.location.protocol + "//" + xhr.location.host)
        !== 0
        && (
            /\.github\.io$/
        ).test(xhr.location.host)
        && xhr.corsForwardProxyHost !== "disabled"
        && (xhr.corsForwardProxyHost || "https://h1-proxy1.herokuapp.com")
    );
};

/* istanbul ignore next */
local.cryptoAesXxxCbcRawDecrypt = function (opt, onError) {
/*
 * this function will aes-xxx-cbc decrypt with given <opt>
 * example usage:
    data = new Uint8Array([1,2,3]);
    key = '0123456789abcdef0123456789abcdef';
    mode = undefined;
    local.cryptoAesXxxCbcRawEncrypt({
        data,
        key,
        mode
    }, function (err, data) {
        console.assert(!err, err);
        local.cryptoAesXxxCbcRawDecrypt({
            data,
            key,
            mode
        }, console.log);
    });
 */
    let cipher;
    let crypto;
    let data;
    let ii;
    let iv;
    let key;
    // init key
    key = new Uint8Array(0.5 * opt.key.length);
    ii = 0;
    while (ii < key.byteLength) {
        key[ii] = parseInt(opt.key.slice(2 * ii, 2 * ii + 2), 16);
        ii += 2;
    }
    data = opt.data;
    // base64
    if (opt.mode === "base64") {
        data = local.base64ToBuffer(data);
    }
    // normalize data
    if (Object.prototype.toString.call(data) !== "[object Uint8Array]") {
        data = new Uint8Array(data);
    }
    // init iv
    iv = data.subarray(0, 16);
    // optimization - create resized-view of data
    data = data.subarray(16);
    crypto = globalThis.crypto;
    if (!local.isBrowser) {
        setTimeout(function () {
            crypto = require("crypto");
            cipher = crypto.createDecipheriv(
                "aes-" + (8 * key.byteLength) + "-cbc",
                key,
                iv
            );
            onError(undefined, Buffer.concat([
                cipher.update(data), cipher.final()
            ]));
        });
        return;
    }
    crypto.subtle.importKey("raw", key, {
        name: "AES-CBC"
    }, false, [
        "decrypt"
    ]).then(function (key) {
        crypto.subtle.decrypt({
            iv,
            name: "AES-CBC"
        }, key, data).then(function (data) {
            onError(undefined, new Uint8Array(data));
        }).catch(onError);
    }).catch(onError);
};

/* istanbul ignore next */
local.cryptoAesXxxCbcRawEncrypt = function (opt, onError) {
/*
 * this function will aes-xxx-cbc encrypt with given <opt>
 * example usage:
    data = new Uint8Array([1,2,3]);
    key = '0123456789abcdef0123456789abcdef';
    mode = undefined;
    local.cryptoAesXxxCbcRawEncrypt({
        data,
        key,
        mode
    }, function (err, data) {
        console.assert(!err, err);
        local.cryptoAesXxxCbcRawDecrypt({
            data,
            key,
            mode
        }, console.log);
    });
 */
    let cipher;
    let crypto;
    let data;
    let ii;
    let iv;
    let key;
    // init key
    key = new Uint8Array(0.5 * opt.key.length);
    ii = 0;
    while (ii < key.byteLength) {
        key[ii] = parseInt(opt.key.slice(2 * ii, 2 * ii + 2), 16);
        ii += 2;
    }
    data = opt.data;
    // init iv
    iv = new Uint8Array((((data.byteLength) >> 4) << 4) + 32);
    crypto = globalThis.crypto;
    if (!local.isBrowser) {
        setTimeout(function () {
            crypto = require("crypto");
            // init iv
            iv.set(crypto.randomBytes(16));
            cipher = crypto.createCipheriv(
                "aes-" + (8 * key.byteLength) + "-cbc",
                key,
                iv.subarray(0, 16)
            );
            data = cipher.update(data);
            iv.set(data, 16);
            iv.set(cipher.final(), 16 + data.byteLength);
            if (opt.mode === "base64") {
                iv = local.base64FromBuffer(iv);
                iv += "\n";
            }
            onError(undefined, iv);
        });
        return;
    }
    // init iv
    iv.set(crypto.getRandomValues(new Uint8Array(16)));
    crypto.subtle.importKey("raw", key, {
        name: "AES-CBC"
    }, false, [
        "encrypt"
    ]).then(function (key) {
        crypto.subtle.encrypt({
            iv: iv.subarray(0, 16),
            name: "AES-CBC"
        }, key, data).then(function (data) {
            iv.set(new Uint8Array(data), 16);
            // base64
            if (opt.mode === "base64") {
                iv = local.base64FromBuffer(iv);
                iv += "\n";
            }
            onError(undefined, iv);
        }).catch(onError);
    }).catch(onError);
};

local.dateGetWeekOfMonth = function (date) {
/*
 * this function will return sunday-based week-of-month from <date>
 */
    date = new Date(date.slice(0, 10) + "T00:00:00Z");
    return Math.ceil((date.getUTCDate() + new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        1
    ).getUTCDay()) / 7) - 1;
};

local.dateGetWeekOfYear = function (date) {
/*
 * this function will return ISO week-of-year from <date>
 *
 * Based on information at:
 *
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 *
 * https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
 */
    date = new Date(date.slice(0, 10) + "T00:00:00Z");
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    // Calculate full weeks to nearest Thursday
    return Math.ceil((((
        date
        // Get first day of year
        - new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
    ) / 86400000) + 1) / 7);
};

local.dateUtcFromLocal = function (date, timezoneOffset) {
/*
 * this function will convert local-<date> to utc-date
 */
    if (!date) {
        return "";
    }
    local.assertOrThrow((
        /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+?)?$/
    ).test(date), "invalid local-date " + date);
    if (!timezoneOffset) {
        return new Date(date).toISOString();
    }
    return new Date(
        new Date(date + "Z").getTime() + timezoneOffset * 60000
    ).toISOString();
};

local.dateUtcToLocal = function (date, timezoneOffset) {
/*
 * this function will convert utc-<date> to local-date
 */
    if (!date) {
        return "";
    }
    local.assertOrThrow((
        /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+?)?Z$/
    ).test(date), "invalid utc-date " + date);
    timezoneOffset = timezoneOffset || new Date(date).getTimezoneOffset();
    return new Date(
        new Date(date).getTime() - timezoneOffset * 60000
    ).toISOString();
};

local.domFragmentRender = function (template, dict) {
/*
 * this function will return dom-elem rendered from <template>
 */
    let tmp;
    tmp = document.createElement("template");
    tmp.innerHTML = local.templateRender(template, dict);
    return tmp.content;
};

local.domQuerySelectorAllTagName = function (selector) {
/*
 * this function will return all tagName that match <selector>
 */
    let set;
    set = new Set();
    local.querySelectorAll(selector).forEach(function (elem) {
        set.add(elem.tagName);
    });
    return Array.from(set).sort();
};

local.domSelectOptionValue = function (elem) {
/*
 * this function will return <elem>.options[<elem>.selectedIndex].value
 */
    elem = elem && elem.options[elem.selectedIndex];
    return (elem && elem.value) || "";
};

local.domStyleValidate = function () {
/*
 * this function will validate <style> tags
 */
    let rgx;
    let tmp;
    rgx = (
        /^0\u0020(?:(body\u0020>\u0020)?(?:\.testReportDiv\u0020.+|\.x-istanbul\u0020.+|\.button|\.colorError|\.readonly|\.textarea|\.uiAnimateSlide|a|body|code|div|input|pre|textarea)(?:,|\u0020\{))|^[1-9]\d*?\u0020#/m
    );
    tmp = [];
    local.querySelectorAll("style").map(function (elem, ii) {
        elem.innerHTML.replace((
            /\/\*[\S\s]*?\*\/|;|\}/g
        ), "\n").replace((
            /^([^\n\u0020@].*?)[,{:].*?$/gm
        ), function (match0, match1) {
            try {
                ii = local.querySelectorAll(match1).length;
            } catch (errCaught) {
                console.error(errCaught);
            }
            if (!(ii > 1)) {
                tmp.push(ii + " " + match0);
            }
        });
    });
    tmp.filter(function (elem) {
        return !rgx.test(elem);
    }).sort().reverse().forEach(function (elem, ii, list) {
        console.error(
            "domStyleValidateUnmatched " + (list.length - ii) + ". " + elem
        );
    });
};

local.errorMessagePrepend = function (err, message) {
/*
 * this function will prepend message to <err>.message and <err>.stack
 */
    if (err === local.errDefault) {
        return;
    }
    err.message = message + err.message;
    err.stack = message + err.stack;
    return err;
};

local.eventEmitterCreate = function (that = {}) {
/*
 * this function will create a simple, node-like event-emitter with <that>,
 * with methods emit, on, once, removeListener
 */
    let dict;
    let emit;
    let on;
    let once;
    let remove;
    emit = function (type, msg) {
    /*
     * this function will emit evt <type> with <msg>
     */
        Array.from(dict[type] || []).forEach(function (listener) {
            listener(msg);
        });
    };
    on = function (type, listener, opt = {}) {
    /*
     * this function will listen to evt <type> with <listener>
     */
        let isDone;
        if (typeof listener === "function") {
            dict[type] = dict[type] || [];
            dict[type].push(
                opt.once
                ? function listener2(msg) {
                    remove(type, listener2);
                    if (!isDone) {
                        isDone = true;
                        listener(msg);
                    }
                }
                : listener
            );
        }
        return that;
    };
    once = function (type, listener, opt = {}) {
    /*
     * this function will listen to evt <type> once with <listener>
     */
        opt.once = true;
        return on(type, listener, opt);
    };
    remove = function (type, listener) {
    /*
     * this function will stop listening to evt <type> with <listener>
     */
        let ii;
        let list;
        list = dict[type] || [];
        ii = list.length;
        while (ii > 0) {
            ii -= 1;
            if (list[ii] === listener) {
                list.splice(ii, 1);
            }
        }
        return that;
    };
    dict = {};
    that.emit = that.emit || emit;
    that.listenerEmit = that.listenerEmit || emit;
    that.on = that.on || on;
    that.once = that.once || once;
    that.removeListener = that.removeListener || remove;
    that.removeEventListener = that.removeEventListener || remove;
    that.listenerOn = that.listenerOn || on;
    that.listenerOnce = that.listenerOnce || once;
    that.listenerRemove = that.listenerRemove || remove;
    return that;
};

local.eventEmitterCreate(local);

local.fsReadFileOrEmptyStringSync = function (file, opt) {
/*
 * this function will try to read file or return empty-string, or
 * if <opt> === "json", then try to JSON.parse file or return {}
 */
    try {
        return (
            opt === "json"
            ? JSON.parse(local.fs.readFileSync(file, "utf8"))
            : local.fs.readFileSync(file, opt)
        );
    } catch (ignore) {
        return (
            opt === "json"
            ? {}
            : ""
        );
    }
};

local.gotoNext = function (opt, onError) {
/*
 * this function will wrap onError inside recursive-function <opt>.gotoNext,
 * and append current-stack to any err
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
                local.assertOrThrow(undefined, opt.errCaught);
            }
            opt.errCaught = errCaught;
            opt.gotoNext(errCaught, data, meta);
        }
    });
    opt.gotoNextData = opt.gotoNext.bind(undefined, undefined);
    return opt;
};

local.isNullOrUndefined = function (val) {
/*
 * this function will test if val is null or undefined
 */
    return val === null || val === undefined;
};

local.jslintAutofixLocalFunction = function (code, file) {
/*
 * this function will jslint-autofix local-function
 */
    let code2;
    let dictFnc;
    let dictProp;
    let tmp;
    if (local.isBrowser) {
        return code;
    }
    file = file.replace(process.cwd() + "/", "");
    switch (file) {
    case "README.md":
    case "lib." + process.env.npm_package_nameLib + ".js":
    case "lib." + process.env.npm_package_nameLib + ".sh":
    case "lib.apidoc.js":
    case "lib.github_crud.js":
    case "lib.istanbul.js":
    case "lib.jslint.js":
    case "lib.marked.js":
    case "lib.puppeteer.js":
    case "lib.sjcl.js":
    case "lib.swgg.js":
    case "npm_scripts.sh":
    case "test.js":
        break;
    default:
        return code;
    }
    // autofix - assets.utility2.header.js
    code = code.replace((
        /\n\/\/\u0020assets.utility2\.header\.js\u0020-\u0020start\n[\S\s]*?\n\/\/\u0020assets.utility2\.header\.js\u0020-\u0020end\n/
    ), "\n" + local.assetsDict["/assets.utility2.header.js"]);
    // autofix - assets.my_app.template.js
    code = local.stringMerge(
        code,
        local.assetsDict["/assets.my_app.template.js"].replace((
            /my_app/g
        ), file.split(".")[1]),
        file !== "README.md" && local.value(
            /\n\/\*\u0020istanbul\u0020instrument\u0020in\u0020package\u0020[\S\s]*?\n\/\*\u0020validateLineSortedReset\u0020\*\/\n/
        )
    );
    // customize local for assets.utility2.rollup.js
    if (
        file === "lib." + process.env.npm_package_nameLib + ".js"
        && local.fs.existsSync("./assets.utility2.rollup.js")
        && local.env.npm_package_nameLib !== "swgg"
    ) {
        code = code.replace(
            "    // || globalThis.utility2_rollup_old",
            "    || globalThis.utility2_rollup_old"
        ).replace(
            "    // || require(\"./assets.utility2.rollup.js\")",
            "    || require(\"./assets.utility2.rollup.js\")"
        );
    }
    // init functionAllDict and functionBaseDict
    [
        [
            "utility2", "swgg"
        ], [
            "utility2", "apidoc", "github_crud", "swgg"
        ]
    ].forEach(function (dictList, ii) {
        tmp = (
            ii
            ? "functionAllDict"
            : "functionBaseDict"
        );
        if (local[tmp]) {
            return;
        }
        local[tmp] = {};
        dictList.forEach(function (dict) {
            dict = local[dict];
            Object.keys(dict).forEach(function (key) {
                if (
                    !(
                        /^[A-Z_]|^testCase_/m
                    ).test(key)
                    && typeof dict[key] === "function"
                ) {
                    local[tmp][key] = local[tmp][key] || String(dict[key]);
                }
            });
        });
        Object.keys(local[tmp]).forEach(function (key) {
            if (process.binding("natives")[key]) {
                local[tmp][key] = undefined;
            }
        });
    });
    // autofix - local-function
    dictFnc = {};
    dictProp = {};
    code = code.replace((
        /^local\.(.*?)\u0020=\u0020(function\u0020\([\S\s]*?\n\});\n+/gm
    ), function (match0, key, match2, match3) {
        // local-function - duplicate
        if (dictFnc[key]) {
            return "";
        }
        // local-function - normalize
        dictFnc[key] = true;
        match3 = local.functionAllDict[key] || "";
        // make shell-safe
        // https://unix.stackexchange.com/questions/57794/shell-escape-characters-for-sh-c
        if (file.slice(-3) === ".sh") {
            match3 = match3.replace((
                /'/g
            ), "'\"'\"'");
        }
        if (match3 && match3 !== match2) {
            match0 = match0.replace(match2, match3.replace((
                /\$\$|\$/g
            ), "$$$$"));
        }
        return match0.trimEnd() + "\n\n";
    });
    // comment
    code2 = code;
    code2 = code2.replace((
        /^\u0020*?\/\*[\S\s]*?\*\/|^\u0020*?(?:\/\/.*?|.*?\\)$/gm
    ), "");
    // local-function - update dictFnc and dictProp
    code2.replace((
        /\blocal\.(\w+?\b)(?:\u0020(===|=|\|\|)(?:\u0020"function"\u0020&&\u0020local\.\w|\u0020|$))?/gm
    ), function (ignore, match1, match2) {
        switch (match2) {
        case "=":
            dictFnc[match1] = true;
            break;
        case "===":
        case "||":
            dictProp[match1] = false;
            break;
        default:
            dictProp[match1] = true;
        }
    });
    [
        dictFnc, dictProp
    ].forEach(function (dict) {
        Object.keys(dict).forEach(function (key) {
            dict[key] = dict[key] && local.functionBaseDict[key];
        });
    });
    dictFnc = local.jsonCopy(dictFnc);
    dictProp = local.jsonCopy(dictProp);
    [
        "assertOrThrow",
        "coalesce",
        "fsRmrfSync",
        "fsWriteFileWithMkdirpSync",
        "functionOrNop",
        "nop",
        "objectAssignDefault",
        "querySelector",
        "querySelectorAll",
        "value",
        "valueOrEmptyList",
        "valueOrEmptyObject"
    ].forEach(function (key) {
        dictFnc[key] = true;
        dictProp[key] = true;
    });
    // local-function - missing
    switch (local.fs.existsSync("assets.utility2.rollup.js") || file) {
    case "README.md":
    case "lib.swgg.js":
    case "lib.utility2.js":
    case "test.js":
    case true:
        break;
    default:
        Object.keys(dictProp).forEach(function (key) {
            if (dictProp[key] && !dictFnc[key]) {
                console.error(
                    "local-function - missing (" + file + ") local." + key
                );
            }
        });
    }
    // local-function - unused
    switch (file) {
    case "lib.swgg.js":
    case "lib.utility2.js":
    case "lib.utility2.sh":
        break;
    default:
        Object.keys(dictFnc).forEach(function (key) {
            if (!dictProp.hasOwnProperty(key)) {
                console.error(
                    "local-function - unused (" + file + ") local." + key
                );
            }
        });
    }
    return code;
};

local.jsonCopy = function (obj) {
/*
 * this function will deep-copy obj
 */
    return (
        obj === undefined
        ? undefined
        : JSON.parse(JSON.stringify(obj))
    );
};

local.jsonStringifyOrdered = function (obj, replacer, space) {
/*
 * this function will JSON.stringify <obj>,
 * with object-keys sorted and circular-references removed
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Syntax
 */
    let circularSet;
    let stringify;
    let tmp;
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
        if (circularSet.has(obj)) {
            return;
        }
        circularSet.add(obj);
        // if obj is an array, then recurse items
        if (Array.isArray(obj)) {
            tmp = "[" + obj.map(function (obj) {
                // recurse
                tmp = stringify(obj);
                return (
                    typeof tmp === "string"
                    ? tmp
                    : "null"
                );
            }).join(",") + "]";
            circularSet.delete(obj);
            return tmp;
        }
        // if obj is not an array,
        // then recurse its items with object-keys sorted
        tmp = "{" + Object.keys(obj).sort().map(function (key) {
            // recurse
            tmp = stringify(obj[key]);
            if (typeof tmp === "string") {
                return JSON.stringify(key) + ":" + tmp;
            }
        }).filter(function (obj) {
            return typeof obj === "string";
        }).join(",") + "}";
        circularSet.delete(obj);
        return tmp;
    };
    circularSet = new Set();
    return JSON.stringify((
        (typeof obj === "object" && obj)
        // recurse
        ? JSON.parse(stringify(obj))
        : obj
    ), replacer, space);
};

local.jwtAes256GcmDecrypt = function (token, key) {
/*
 * this function will use json-web-encryption to
 * aes-256-gcm-decrypt <token> with given base64url-encoded <key>
 * https://tools.ietf.org/html/rfc7516
 */
    return local.tryCatchOnError(function () {
        token = token.replace((
            /-/g
        ), "+").replace((
            /_/g
        ), "/").split(".");
        token = local.sjcl.decrypt(
            local.sjcl.codec.base64url.toBits(local.jwtAes256KeyInit(key)),
            JSON.stringify({
                adata: token[4],
                ct: token[3],
                iv: token[2],
                ks: 256,
                mode: "gcm"
            })
        );
        return local.jwtHs256Decode(token, key);
    }, local.nop) || {};
};

local.jwtAes256GcmEncrypt = function (data, key) {
/*
 * this function will use json-web-encryption to
 * aes-256-gcm-encrypt <data> with given base64url-encoded <key>
 * https://tools.ietf.org/html/rfc7516
 */
    let adata;
    adata = local.jwtAes256KeyCreate();
    data = local.jwtHs256Encode(data, key);
    data = JSON.parse(local.sjcl.encrypt(
        local.sjcl.codec.base64url.toBits(local.jwtAes256KeyInit(key)),
        data,
        {
            adata: local.sjcl.codec.base64url.toBits(adata),
            ks: 256,
            mode: "gcm"
        }
    ));
    return local.normalizeJwtBase64Url(
        "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4R0NNIn0.."
        + data.iv + "." + data.ct + "." + adata
    );
};

local.jwtAes256KeyCreate = function () {
/*
 * this function will create a random, aes-256-base64url-jwt-key
 */
    return local.normalizeJwtBase64Url(
        local.base64FromBuffer(local.bufferRandomBytes(32))
    );
};

local.jwtAes256KeyInit = function (key) {
/*
 * this function will init aes-256-base64url-jwt-<key>
 * https://jwt.io/
 */
    // init npm_config_jwtAes256Key
    local.env.npm_config_jwtAes256Key = (
        local.env.npm_config_jwtAes256Key
        || "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    );
    return key || local.env.npm_config_jwtAes256Key;
};

local.jwtHs256Decode = function (token, key) {
/*
 * this function will decode json-web-token with given base64-encoded <key>
 * https://jwt.io/
 */
    let Hmac;
    let timeNow;
    Hmac = local.sjcl.misc.hmac;
    timeNow = Date.now() / 1000;
    // try to decode token
    return local.tryCatchOnError(function () {
        token = token.split(".");
        // validate header
        local.assertOrThrow(
            token[0] === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
            token
        );
        // validate signature
        local.assertOrThrow(local.sjcl.codec.base64url.fromBits(
            new Hmac(local.sjcl.codec.base64url.toBits(
                local.jwtAes256KeyInit(key)
            )).encrypt(token[0] + "." + token[1])
        ) === token[2]);
        // return decoded data
        token = JSON.parse(local.base64ToUtf8(token[1]));
        // https://tools.ietf.org/html/rfc7519#section-4.1
        // validate jwt-registered-headers
        local.assertOrThrow(!token.exp || token.exp >= timeNow);
        local.assertOrThrow(!token.nbf || token.nbf <= timeNow);
        return token;
    }, local.nop) || {};
};

local.jwtHs256Encode = function (data, key) {
/*
 * this function will encode <data> into a json-web-token
 * with given base64-encoded <key>
 * https://jwt.io/
 */
    let Hmac;
    Hmac = local.sjcl.misc.hmac;
    data = (
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
        + local.normalizeJwtBase64Url(
            local.base64FromBuffer(JSON.stringify(data))
        )
    );
    return data + "." + local.sjcl.codec.base64url.fromBits(
        new Hmac(local.sjcl.codec.base64url.toBits(
            local.jwtAes256KeyInit(key)
        )).encrypt(data)
    );
};

local.listGetElementRandom = function (list) {
/*
 * this function will return random elem from <list>
 */
    return list[Math.floor(Math.random() * list.length)];
};

local.listShuffle = function (list) {
/*
 * this function will inplace shuffle <list> using fisher-yates algorithm
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
    let ii;
    let random;
    let swap;
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

local.localStorageSetItemOrClear = function (key, value) {
/*
 * this function will try to set <key>/<value> pair to localStorage,
 * or else call localStorage.clear()
 */
    try {
        localStorage.setItem(key, value);
    } catch (ignore) {
        localStorage.clear();
    }
};

local.middlewareAssetsCached = function (req, res, next) {
/*
 * this function will run middleware to serve cached-assets
 */
    if (!local.assetsDict.hasOwnProperty(req.urlParsed.pathname)) {
        next();
        return;
    }
    // do not cache if headers already sent or url has '?' search indicator
    if (!(res.headersSent || req.url.indexOf("?") >= 0)) {
        // init serverResponseHeaderLastModified
        local.serverResponseHeaderLastModified = (
            local.serverResponseHeaderLastModified
            // resolve to 1000 ms
            || new Date(new Date().toUTCString())
        );
        // respond with 304 If-Modified-Since serverResponseHeaderLastModified
        if (
            new Date(req.headers["if-modified-since"])
            >= local.serverResponseHeaderLastModified
        ) {
            res.statusCode = 304;
            res.end();
            return;
        }
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader(
            "Last-Modified",
            local.serverResponseHeaderLastModified.toUTCString()
        );
    }
    res.end(local.assetsDict[req.urlParsed.pathname]);
};

local.middlewareBodyRead = function (req, ignore, next) {
/*
 * this function will run middleware to
 * read and save <req> body to <req>.bodyRaw
 */
    // if req is already read, then goto next
    if (!req.readable) {
        next();
        return;
    }
    let bufList;
    bufList = [];
    req.on("data", function (buf) {
        bufList.push(buf);
    }).on("end", function () {
        req.bodyRaw = (
            local.isBrowser
            ? bufList[0]
            : Buffer.concat(bufList)
        );
        next();
    // on event-error, pass error to onError
    }).on("error", next);
};

local.middlewareError = function (err, req, res) {
/*
 * this function will run middleware to handle errors
 */
    // default - 404 Not Found
    if (!err) {
        local.serverRespondDefault(req, res, 404);
        return;
    }
    // http://jsonapi.org/format/#errors
    if (local.swgg && typeof local.swgg.serverRespondJsonapi === "function") {
        local.swgg.serverRespondJsonapi(req, res, err);
    }
    // statusCode [400, 600)
    local.serverRespondDefault(req, res, (
        (err.statusCode >= 400 && err.statusCode < 600)
        ? err.statusCode
        : 500
    ), err);
};

local.middlewareFileServer = function (req, res, next) {
/*
 * this function will run middleware to serve files
 */
    let file;
    if (req.method !== "GET" || local.isBrowser) {
        next();
        return;
    }
    // security - disable parent directory lookup
    file = local.path.resolve("/", req.urlParsed.pathname).slice(1);
    // replace trailing '/' with '/index.html'
    file = file.replace((
        /\/$/
    ), "/index.html");
    local.fs.readFile(file, function (err, data) {
        // default to next
        if (err) {
            next();
            return;
        }
        // respond with data
        local.serverRespondHeadSet(req, res, undefined, {
            "Content-Type": local.contentTypeDict[(
                /\.[^.]*?$|$/m
            ).exec(file)[0]]
        });
        res.end(data);
    });
};

local.middlewareForwardProxy = function (req, res, next) {
/*
 * this function will run middleware to forward-proxy <req>
 * to its destination-host
 */
    let isDone;
    let onError;
    let opt;
    let timerTimeout;
    // handle preflight-cors
    if (req.method === "OPTIONS" && (
        /forward-proxy-url/
    ).test(req.headers["access-control-request-headers"])) {
        local.serverRespondCors(req, res);
        res.end();
        return;
    }
    if (!req.headers["forward-proxy-url"]) {
        next();
        return;
    }
    local.serverRespondCors(req, res);
    // init onError
    onError = function (err) {
        if (isDone) {
            return;
        }
        isDone = true;
        // cleanup timerTimeout
        clearTimeout(timerTimeout);
        // debug middlewareForwardProxy
        console.error("serverLog - " + JSON.stringify({
            time: new Date(opt.timeStart).toISOString(),
            type: "middlewareForwardProxyResponse",
            method: opt.method,
            url: opt.url,
            statusCode: res.statusCode | 0,
            timeElapsed: Date.now() - opt.timeStart,
            // extra
            headers: opt.headers
        }));
        if (!err) {
            return;
        }
        // cleanup clientReq and clientRes
        local.streamCleanup(opt.clientReq);
        local.streamCleanup(opt.clientReq);
        next(err);
    };
    // init opt
    opt = local.urlParse(req.headers["forward-proxy-url"]);
    opt.method = req.method;
    opt.url = req.headers["forward-proxy-url"];
    // init timerTimeout
    timerTimeout = local.onTimeout(
        onError,
        local.timeoutDefault,
        "forward-proxy " + opt.method + " " + opt.url
    );
    // parse headers
    opt.headers = {};
    local.tryCatchOnError(function () {
        opt.headers = JSON.parse(req.headers["forward-proxy-headers"]);
    }, local.nop);
    // debug opt
    local._debugForwardProxy = opt;
    opt.clientReq = (
        opt.protocol === "https:"
        ? local.https
        : local.http
    ).request(opt, function (clientReq) {
        opt.clientReq = clientReq.on("error", onError);
        res.statusCode = opt.clientReq.statusCode;
        // pipe clientReq to res
        opt.clientReq.pipe(res);
    }).on("error", onError);
    opt.timeStart = Date.now();
    // handle evt
    req.on("error", onError);
    res.on("finish", onError).on("error", onError);
    // pipe req to clientReq
    req.pipe(opt.clientReq);
};

local.middlewareInit = function (req, res, next) {
/*
 * this function will run middleware to init <req> and <res>
 */
    // debug req and res
    local._debugServerReqRes4 = local._debugServerReqRes3;
    local._debugServerReqRes3 = local._debugServerReqRes2;
    local._debugServerReqRes2 = local._debugServerReqRes1;
    local._debugServerReqRes1 = {
        req,
        res
    };
    // init timerTimeout
    local.serverRespondTimeoutDefault(req, res, local.timeoutDefault);
    // init req.urlParsed
    req.urlParsed = local.urlParse(req.url);
    // init res-header content-type
    local.serverRespondHeadSet(req, res, undefined, {
        "Content-Type": local.contentTypeDict[(
            /\.[^.]*?$|$/m
        ).exec(req.urlParsed.pathname)[0]]
    });
    // set main-page content-type to text/html
    if (req.urlParsed.pathname === "/") {
        local.serverRespondHeadSet(req, res, undefined, {
            "Content-Type": "text/html; charset=utf-8"
        });
    }
    // default to next
    next();
};

local.middlewareJsonpStateInit = function (req, res, next) {
/*
 * this function will run middleware to
 * serve browser-state wrapped in given jsonp-callback
 */
    let state;
    if (!(req.stateInit || (
        req.urlParsed
        && req.urlParsed.pathname === "/jsonp.utility2.stateInit"
    ))) {
        next();
        return;
    }
    state = {
        utility2: {
            assetsDict: {
                "/assets.example.html":
                local.assetsDict["/assets.example.html"],
                "/assets.example.js": local.assetsDict["/assets.example.js"],
                "/assets.swgg.swagger.json":
                local.assetsDict["/assets.swgg.swagger.json"],
                "/assets.test.js": local.assetsDict["/assets.test.js"],
                "/assets.utility2.base.html":
                local.assetsDict["/assets.utility2.base.rollup.html"],
                "/index.rollup.html": local.assetsDict["/index.rollup.html"]
            },
            env: {
                NODE_ENV: local.env.NODE_ENV,
                npm_config_mode_backend: local.env.npm_config_mode_backend,
                npm_package_description: local.env.npm_package_description,
                npm_package_homepage: local.env.npm_package_homepage,
                npm_package_name: local.env.npm_package_name,
                npm_package_nameLib: local.env.npm_package_nameLib,
                npm_package_version: local.env.npm_package_version
            }
        }
    };
    if (req.stateInit) {
        return state;
    }
    res.end(
        req.urlParsed.query.callback + "(" + JSON.stringify(state) + ");"
    );
};

local.moduleDirname = function (module, pathList) {
/*
 * this function will search <pathList> for <module>'s __dirname
 */
    let result;
    // search process.cwd()
    if (!module || module === "." || module.indexOf("/") >= 0) {
        return require("path").resolve(process.cwd(), module || "");
    }
    // search pathList
    Array.from([
        pathList,
        require("module").globalPaths,
        [
            process.env.HOME + "/node_modules", "/usr/local/lib/node_modules"
        ]
    ]).flat().some(function (path) {
        try {
            result = require("path").resolve(
                process.cwd(),
                path + "/" + module
            );
            result = require("fs").statSync(result).isDirectory() && result;
            return result;
        } catch (ignore) {
            result = "";
        }
    });
    return result;
};

local.normalizeJwt = function (data) {
/*
 * this function will normalize the jwt-data with registered-headers
 * https://tools.ietf.org/html/rfc7519#section-4.1
 */
    let timeNow;
    timeNow = Date.now() / 1000;
    return local.objectSetDefault(data, {
        exp: timeNow + 5 * 60,
        iat: timeNow,
        jti: Math.random().toString(16).slice(2),
        nbf: timeNow
    });
};

local.normalizeJwtBase64Url = function (b64) {
/*
 * this function will normlize <b64> to base64url format
 */
    return b64.replace((
        /\=/g
    ), "").replace((
        /\+/g
    ), "-").replace((
        /\//g
    ), "_");
};

local.numberToRomanNumerals = function (num) {
/*
 * this function will convert num to a roman-numeral
 * https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
 */
    let digits;
    let ii;
    let key;
    let roman;
    digits = String(num).split("");
    key = [
        "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
        "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
        "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
    ];
    roman = "";
    ii = 3;
    while (ii) {
        ii -= 1;
        roman = (key[Number(digits.pop()) + (ii * 10)] || "") + roman;
    }
    return new Array(Number(digits.join("") + 1)).join("M") + roman;
};

local.objectSetDefault = function (dict, defaults, depth) {
/*
 * this function will recursively set defaults for undefined-items in dict
 */
    dict = dict || {};
    defaults = defaults || {};
    Object.keys(defaults).forEach(function (key) {
        let defaults2;
        let dict2;
        dict2 = dict[key];
        // handle misbehaving getter
        try {
            defaults2 = defaults[key];
        } catch (ignore) {}
        if (defaults2 === undefined) {
            return;
        }
        // init dict[key] to default value defaults[key]
        switch (dict2) {
        case "":
        case null:
        case undefined:
            dict[key] = defaults2;
            return;
        }
        // if dict2 and defaults2 are both non-undefined and non-array objects,
        // then recurse with dict2 and defaults2
        if (
            depth > 1
            // dict2 is a non-undefined and non-array object
            && typeof dict2 === "object" && dict2 && !Array.isArray(dict2)
            // defaults2 is a non-undefined and non-array object
            && typeof defaults2 === "object" && defaults2
            && !Array.isArray(defaults2)
        ) {
            // recurse
            local.objectSetDefault(dict2, defaults2, depth - 1);
        }
    });
    return dict;
};

local.objectSetOverride = function (dict, overrides, depth, env) {
/*
 * this function will recursively set overrides for items in dict
 */
    dict = dict || {};
    env = env || (typeof process === "object" && process.env) || {};
    overrides = overrides || {};
    Object.keys(overrides).forEach(function (key) {
        let dict2;
        let overrides2;
        dict2 = dict[key];
        overrides2 = overrides[key];
        if (overrides2 === undefined) {
            return;
        }
        // if both dict2 and overrides2 are non-undefined and non-array objects,
        // then recurse with dict2 and overrides2
        if (
            depth > 1
            // dict2 is a non-undefined and non-array object
            && typeof dict2 === "object" && dict2 && !Array.isArray(dict2)
            // overrides2 is a non-undefined and non-array object
            && typeof overrides2 === "object" && overrides2
            && !Array.isArray(overrides2)
        ) {
            local.objectSetOverride(dict2, overrides2, depth - 1, env);
            return;
        }
        // else set dict[key] with overrides[key]
        dict[key] = (
            dict === env
            // if dict is env, then overrides falsy-value with empty-string
            ? overrides2 || ""
            : overrides2
        );
    });
    return dict;
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

local.onErrorThrow = function (err) {
/*
 * this function will if <err> exists, then throw it
 */
    if (err) {
        throw err;
    }
    return err;
};

local.onErrorWithStack = function (onError) {
/*
 * this function will wrap <onError> with wrapper preserving current-stack
 */
    let onError2;
    let stack;
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

local.onFileModifiedRestart = function (file) {
/*
 * this function will watch the file, and if modified, then restart the process
 */
    if (
        local.env.npm_config_mode_auto_restart
        && local.fs.existsSync(file)
        && local.fs.statSync(file).isFile()
    ) {
        local.fs.watchFile(file, {
            interval: 1000,
            persistent: false
        }, function (stat2, stat1) {
            if (stat2.mtime > stat1.mtime) {
                console.error("file modified - " + file);
                setTimeout(function () {
                    process.exit(77);
                }, 1000);
            }
        });
    }
};

local.onParallel = function (onError, onEach, onRetry) {
/*
 * this function will create a function that will
 * 1. run async tasks in parallel
 * 2. if counter === 0 or err occurred, then call onError(err)
 */
    let onParallel;
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
    let isListEnd;
    let onEach2;
    let onParallel;
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
            isListEnd = undefined;
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

local.onTimeout = function (onError, timeout, message) {
/*
 * this function will create <timeout>-handler,
 * that appends current-stack to any err encountered
 */
    onError = local.onErrorWithStack(onError);
    // create timerTimeout
    return setTimeout(function () {
        onError(new Error("onTimeout - " + timeout + " ms - " + message));
    // coerce to finite integer
    }, timeout);
};

local.profile = function (fnc, onError) {
/*
 * this function will profile async <fnc> in milliseconds
 * with callback <onError>
 */
    let timeStart;
    timeStart = Date.now();
    // run async fnc
    fnc(function (err) {
        // call onError with difference in milliseconds
        // between Date.now() and timeStart
        onError(err, Date.now() - timeStart);
    });
};

local.profileSync = function (fnc) {
/*
 * this function will profile sync <fnc> in milliseconds
 */
    let timeStart;
    timeStart = Date.now();
    // run sync fnc
    fnc();
    // return difference in milliseconds between Date.now() and timeStart
    return Date.now() - timeStart;
};

local.replStart = function () {
/*
 * this function will start repl-debugger
 */
    let that;
    if (globalThis.utility2_repl1) {
        return;
    }
    // start repl
    that = require("repl").start({
        useGlobal: true
    });
    globalThis.utility2_repl1 = that;
    // save eval-function
    that.evalDefault = that.eval;
    // hook custom-eval-function
    that.eval = function (script, context, file, onError) {
        script.replace((
            /^(\S+)\u0020(.*?)\n/
        ), function (ignore, match1, match2) {
            switch (match1) {
            // syntax-sugar - run shell-command
            case "$":
                switch (match2) {
                // syntax-sugar - run git diff
                case "git diff":
                    match2 = "git diff --color | cat";
                    break;
                // syntax-sugar - run git log
                case "git log":
                    match2 = "git log -n 4 | cat";
                    break;
                // syntax-sugar - run ll
                case "ll":
                    match2 = "ls -Fal";
                    break;
                }
                // source lib.utility2.sh
                if (
                    process.platform !== "win32"
                    && process.env.npm_config_dir_utility2 && (match2 !== ":")
                ) {
                    match2 = (
                        ". " + process.env.npm_config_dir_utility2
                        + "/lib.utility2.sh;" + match2
                    );
                }
                // run shell-command
                require("child_process").spawn(match2, {
                    shell: true,
                    stdio: [
                        "ignore", 1, 2
                    ]
                // print exitCode
                }).on("exit", function (exitCode) {
                    console.error("exitCode " + exitCode);
                    that.evalDefault("\n", context, file, onError);
                });
                script = "\n";
                break;
            // syntax-sugar - map text with charCodeAt
            case "charCode":
                console.error(
                    match2.split("").map(function (chr) {
                        return (
                            "\\u"
                            + chr.charCodeAt(0).toString(16).padStart(4, 0)
                        );
                    }).join("")
                );
                script = "\n";
                break;
            // syntax-sugar - sort chr
            case "charSort":
                console.error(JSON.stringify(match2.split("").sort().join("")));
                script = "\n";
                break;
            // syntax-sugar - grep current dir
            case "grep":
                // run shell-command
                require("child_process").spawn((
                    "find . -type f | grep -v -E "
/* jslint ignore:start */
+ '"\
/\\.|~\$|(\\b|_)(\\.\\d|\
archive|artifact|\
bower_component|build|\
coverage|\
doc|\
external|\
fixture|\
git_module|\
jquery|\
log|\
min|misc|mock|\
node_module|\
raw|\rollup|\
swp|\
tmp|\
vendor)s{0,1}(\\b|_)\
" '
/* jslint ignore:end */
                    + "| tr \"\\n\" \"\\000\" | xargs -0 grep -HIin -E \""
                    + match2 + "\""
                ), {
                    shell: true,
                    stdio: [
                        "ignore", 1, 2
                    ]
                }).on("exit", function (exitCode) {
                    console.error("exitCode " + exitCode);
                    that.evalDefault("\n", context, file, onError);
                });
                script = "\n";
                break;
            // syntax-sugar - list obj's keys, sorted by item-type
            // console.error(Object.keys(global).map(function(key){return(typeof global[key]==='object'&&global[key]&&global[key]===global[key]?'global':typeof global[key])+' '+key;}).sort().join('\n')) // jslint ignore:line
            case "keys":
                script = (
                    "console.error(Object.keys(" + match2
                    + ").map(function(key){return("
                    + "typeof " + match2 + "[key]==='object'&&"
                    + match2 + "[key]&&"
                    + match2 + "[key]===global[key]"
                    + "?'global'"
                    + ":typeof " + match2 + "[key]"
                    + ")+' '+key;"
                    + "}).sort().join('\\n'))\n"
                );
                break;
            // syntax-sugar - print String(val)
            case "print":
                script = "console.error(String(" + match2 + "))\n";
                break;
            }
        });
        // eval script
        that.evalDefault(script, context, file, onError);
    };
};

local.requireReadme = function () {
/*
 * this function will require and export example.js embedded in README.md
 */
    let code;
    let module;
    let tmp;
    // init module.exports
    module = {};
    if (local.isBrowser) {
        module.exports = local.objectSetDefault(
            globalThis.utility2_rollup || globalThis.local,
            local
        );
        return module.exports;
    }
    // start repl-debugger
    local.replStart();
    // debug dir
    [
        __dirname + "/lib.jslint.js",
        __filename,
        "undefined"
    ].forEach(function (file) {
        local.fs.exists(file, function (exists) {
            if (exists) {
                local.onFileModifiedRestart(file);
            }
        });
    });
    local.fs.readdirSync(process.cwd()).forEach(function (file) {
        file = process.cwd() + "/" + file;
        // if the file is modified, then restart the process
        local.onFileModifiedRestart(file);
        switch (local.path.basename(file)) {
        // swagger-validate assets.swgg.swagger.json
        case "assets.swgg.swagger.json":
            local.fs.readFile(file, "utf8", function (err, data) {
                local.tryCatchOnError(function () {
                    // handle err
                    local.assertOrThrow(!err, err);
                    local.swgg.swaggerValidate(JSON.parse(data));
                }, local.onErrorDefault);
            });
            break;
        }
    });
    // jslint process.cwd()
    if (!local.env.npm_config_mode_library) {
        local.child_process.spawn("node", [
            "-e", (
                "require("
                + JSON.stringify(__filename)
                + ").jslint.jslintAndPrintDir("
                + JSON.stringify(process.cwd())
                + ", {autofix:true,conditional:true}, process.exit);"
            )
        ], {
            env: Object.assign({}, local.env, {
                npm_config_mode_library: "1"
            }),
            stdio: [
                "ignore", "ignore", 2
            ]
        });
    }
    if (globalThis.utility2_rollup || local.env.npm_config_mode_start) {
        // init assets
        local.assetsDict["/index.html"] = (
            local.fsReadFileOrEmptyStringSync("index.html")
            || local.assetsDict["/index.rollup.html"] || ""
        );
        local.assetsDict["/"] = local.assetsDict["/index.html"];
        local.assetsDict["/assets.app.js"] = local.fs.readFileSync(
            __filename,
            "utf8"
        ).replace((
            /^#!\//
        ), "// ");
        // init exports
        local[local.env.npm_package_nameLib] = local;
        module.exports = local;
        return module.exports;
    }
    // init file $npm_package_main
    globalThis.utility2_moduleExports = require(
        process.cwd() + "/" + local.env.npm_package_main
    );
    globalThis.utility2_moduleExports.globalThis = globalThis;
    // read code from README.md
    code = local.templateRenderMyApp(
        local.assetsDict["/assets.example.template.js"],
        {}
    );
    local.tryCatchOnError(function () {
        tmp = (
            /```\w*?(\n[\W\s]*?example\.js[\n"][\S\s]*?)\n```/
        ).exec(
            local.fs.readFileSync("README.md", "utf8")
        );
        code = tmp.input.slice(0, tmp.index).replace((
            /.+/g
        ), "") + tmp[1];
    }, local.nop);
    // alias require($npm_package_name) to utility2_moduleExports;
    code = code.replace(
        new RegExp("require\\(." + local.env.npm_package_name + ".\\)"),
        "globalThis.utility2_moduleExports"
    ).replace(
        new RegExp("require\\(." + local.env.npm_package_nameOriginal + ".\\)"),
        "globalThis.utility2_moduleExports"
    );
    // init example.js
    tmp = process.cwd() + "/example.js";
    // jslint code
    local.jslintAndPrint(code, tmp);
    // cover code
    code = local.istanbulInstrumentInPackage(code, tmp);
    // init module.exports
    module = new local.Module(tmp);
    require.cache[tmp] = module;
    // load code into module
    module._compile(code, tmp);
    // init exports
    module.exports.utility2 = local;
    module.exports[local.env.npm_package_nameLib] = (
        globalThis.utility2_moduleExports
    );
    // init assets
    tmp = process.cwd() + "/" + local.env.npm_package_main;
    local.assetsDict["/assets." + local.env.npm_package_nameLib + ".js"] = (
        local.fs.readFileSync(tmp, "utf8").replace((
            /^#!\//
        ), "// ")
    );
    Object.assign(local.assetsDict, module.exports.assetsDict);
    local.assetsDict["/assets." + local.env.npm_package_nameLib + ".js"] = (
        local.istanbulInstrumentInPackage(
            local.assetsDict[
                "/assets." + local.env.npm_package_nameLib + ".js"
            ],
            tmp
        )
    );
    module.exports.assetsDict = local.assetsDict;
    local.assetsDict["/assets.example.js"] = code;
    local.assetsDict["/assets.test.js"] = local.istanbulInstrumentInPackage(
        local.fs.readFileSync("test.js", "utf8"),
        process.cwd() + "/test.js"
    );
    // init assets index.html
    [
        "", ".rollup"
    ].forEach(function (isRollup) {
        [
            "index", "utility2"
        ].forEach(function (file) {
            tmp = "assets." + file + ".template.html";
            local.assetsDict["/" + tmp] = (
                local.fsReadFileOrEmptyStringSync(tmp, "utf8")
                || local.assetsDict["/" + tmp]
            );
            file = (
                file.replace("utility2", "assets.utility2.base") + isRollup
                + ".html"
            );
            local.assetsDict["/" + file] = local.fsReadFileOrEmptyStringSync(
                file,
                "utf8"
            ) || local.templateRender(
                // uncomment utility2-comment
                local.assetsDict["/" + tmp].replace((
                    /<!--\u0020utility2-comment\b([\S\s]*?)\butility2-comment\u0020-->/g
                ), "$1"),
                {
                    env: local.env,
                    isRollup
                }
            );
        });
    });
    local.assetsDict["/"] = local.assetsDict["/index.html"];
    // init assets.app.js
    local.assetsDict["/assets.app.js"] = [
        "header",
        "/assets.utility2.rollup.js",
        "/assets.utility2.rollup.start.js",
        "local.stateInit",
        "/assets.my_app.js",
        "/assets.example.js",
        "/assets.test.js",
        "/assets.utility2.rollup.end.js"
    ].map(function (key) {
        switch (key) {
/* jslint ignore:start */
case 'header':
return '\
/* this rollup was created with utility2\n\
 * https://github.com/kaizhu256/node-utility2\n\
 */\n\
\n\
\n\
\n\
/*\n\
assets.app.js\n\
\n\
' + local.env.npm_package_description + '\n\
\n\
instruction\n\
    1. save this script as assets.app.js\n\
    2. run the shell-command:\n\
        $ PORT=8081 node assets.app.js\n\
    3. open a browser to http://127.0.0.1:8081 and play with the web-demo\n\
    4. edit this script to suit your needs\n\
*/\n\
' + local.assetsDict["/assets.utility2.rollup.start.js"].replace((
    /utility2_rollup/g
), "utility2_app");
/* jslint ignore:end */
        case "/assets.my_app.js":
            // handle large string-replace
            tmp = "/assets." + local.env.npm_package_nameLib + ".js";
            code = local.assetsDict["/assets.utility2.rollup.content.js"].split(
                "/* utility2.rollup.js content */"
            );
            code.splice(
                1,
                0,
                "local.assetsDict[\"" + tmp + "\"] = "
                + JSON.stringify(local.assetsDict[tmp]).replace((
                    /\\\\/g
                ), "\u0000").replace((
                    /\\n/g
                ), "\\n\\\n").replace((
                    /\u0000/g
                ), "\\\\")
            );
            code = code.join("");
            code += "\n";
            code += local.assetsDict[tmp];
            break;
        case "local.stateInit":
            // handle large string-replace
            code = local.assetsDict["/assets.utility2.rollup.content.js"].split(
                "/* utility2.rollup.js content */"
            );
            tmp = local.middlewareJsonpStateInit({
                stateInit: true
            });
            // add extra physical files to assetsDict
            local.fs.readdirSync(".").forEach(function (file) {
                file = "/" + file;
                if (
                    local.assetsDict[file]
                    && local.assetsDict[file].length <= 0x100000
                    && String(local.assetsDict[file])
                    === local.fsReadFileOrEmptyStringSync("." + file, "utf8")
                ) {
                    tmp.utility2.assetsDict[file] = local.assetsDict[file];
                }
            });
            code.splice(
                1,
                0,
                key + "(" + JSON.stringify(tmp, undefined, 4) + ");"
            );
            code = code.join("");
            break;
        default:
            code = local.assetsDict[key];
        }
        return (
            "/* script-begin " + key + " */\n"
            + code.trim()
            + "\n/* script-end " + key + " */\n"
        );
    }).join("\n\n\n");
    local.objectSetDefault(module.exports, local);
    // init testCase_buildXxx
    Object.keys(local).forEach(function (key) {
        if (
            key.indexOf("_testCase_build") === 0
            || key === "_testCase_webpage_default"
        ) {
            module.exports[key.slice(1)] = (
                module.exports[key.slice(1)] || local[key]
            );
        }
    });
    return module.exports;
};

local.semverCompare = function (aa, bb) {
/*
 * this function will compare semver versions aa ? bb and return
 * -1 if aa < bb
 *  0 if aa = bb
 *  1 if aa > bb
 * https://semver.org/#spec-item-11
 * example usage:
    semverCompare("2.2.2", "10.2.2"); // -1
    semverCompare("1.2.3", "1.2.3");  //  0
    semverCompare("10.2.2", "2.2.2"); //  1
 */
    let ii;
    let len;
    [
        aa, bb
    ] = [
        aa, bb
    ].map(function (val) {
        val = (
            /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z\-][0-9a-zA-Z\-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z\-][0-9a-zA-Z\-]*))*))?(?:\+([0-9a-zA-Z\-]+(?:\.[0-9a-zA-Z\-]+)*))?$/
        ).exec(val) || [
            "", "", "", ""
        ];
        val[4] = val[4] || "";
        return val.slice(1, 4).concat(val[4].split("."));
    });
    ii = -1;
    len = Math.max(aa.length, bb.length);
    while (true) {
        ii += 1;
        if (ii >= len) {
            return 0;
        }
        aa[ii] = aa[ii] || "";
        bb[ii] = bb[ii] || "";
        if (ii === 3 && aa[ii] !== bb[ii]) {
            // 1.2.3 > 1.2.3-alpha
            if (!aa[ii]) {
                return 1;
            }
            // 1.2.3-alpha < 1.2.3
            if (!bb[ii]) {
                return -1;
            }
        }
        if (aa[ii] !== bb[ii]) {
            aa = aa[ii];
            bb = bb[ii];
            return (
                Number(aa) < Number(bb)
                ? -1
                : Number(aa) > Number(bb)
                ? 1
                : aa < bb
                ? -1
                : 1
            );
        }
    }
};

local.serverRespondCors = function (req, res) {
/*
 * this function will enable cors for the req
 * http://en.wikipedia.org/wiki/Cross-origin_resource_sharing
 */
    local.serverRespondHeadSet(req, res, undefined, local.jsonCopy({
        "access-control-allow-headers":
        req.headers["access-control-request-headers"],
        "access-control-allow-methods":
        req.headers["access-control-request-method"],
        "access-control-allow-origin": "*"
    }));
};

local.serverRespondDefault = function (req, res, statusCode, err) {
/*
 * this function will respond with a default message,
 * or <err>.stack for given statusCode
 */
    // init statusCode and contentType
    local.serverRespondHeadSet(
        req,
        res,
        statusCode,
        {
            "Content-Type": "text/plain; charset=utf-8"
        }
    );
    if (err) {
        // debug statusCode / method / url
        local.errorMessagePrepend(
            err,
            res.statusCode + " " + req.method + " " + req.url
            + "\n"
        );
        // print err.stack to stderr
        local.onErrorDefault(err);
        // end res with err.stack
        res.end(err.stack);
        return;
    }
    // end res with default statusCode message
    res.end(
        statusCode + " " + local.http.STATUS_CODES[statusCode]
    );
};

local.serverRespondEcho = function (req, res) {
/*
 * this function will respond with debug info
 */
    res.write(
        req.method + " " + req.url
        + " HTTP/" + req.httpVersion + "\r\n"
        + Object.keys(req.headers).map(function (key) {
            return key + ": " + req.headers[key] + "\r\n";
        }).join("") + "\r\n"
    );
    req.pipe(res);
};

local.serverRespondHeadSet = function (ignore, res, statusCode, headers) {
/*
 * this function will set the <res> object's <statusCode> and <headers>
 */
    if (res.headersSent) {
        return;
    }
    // init res.statusCode
    if (Number(statusCode)) {
        res.statusCode = Number(statusCode);
    }
    Object.keys(headers).forEach(function (key) {
        if (headers[key]) {
            res.setHeader(key, headers[key]);
        }
    });
    return true;
};

local.serverRespondTimeoutDefault = function (req, res, timeout) {
/*
 * this function will create <timeout>-handler for server-<req>
 */
    let isDone;
    let onError;
    onError = function () {
        if (isDone) {
            return;
        }
        isDone = true;
        // debug res
        console.error("serverLog - " + JSON.stringify({
            time: new Date(req.timeStart).toISOString(),
            type: "serverResponse",
            method: req.method,
            url: req.url,
            statusCode: res.statusCode | 0,
            timeElapsed: Date.now() - req.timeStart,
            // extra
            reqContentLength: req.dataLength || 0,
            resContentLength: res.contentLength,
            reqHeaderXForwardedFor: req.headers["x-forwarded-for"] || "",
            reqHeaderOrigin: req.headers.origin || "",
            reqHeaderReferer: req.headers.referer || "",
            reqHeaderUserAgent: req.headers["user-agent"]
        }));
        // cleanup timerTimeout
        clearTimeout(req.timerTimeout);
    };
    req.timeStart = Date.now();
    req.onTimeout = req.onTimeout || function (err) {
        local.serverRespondDefault(req, res, 500, err);
        setTimeout(function () {
            // cleanup <req> and <res>
            local.streamCleanup(req);
            local.streamCleanup(res);
        }, 1000);
    };
    // init timerTimeout
    req.timerTimeout = local.onTimeout(
        req.onTimeout,
        timeout || local.timeoutDefault,
        "server " + req.method + " " + req.url
    );
    res.contentLength = 0;
    res.writeContentLength = res.writeContentLength || res.write;
    res.write = function (buf, encoding, callback) {
        buf = local.bufferValidateAndCoerce(buf, typeof buf);
        res.contentLength += buf.length;
        res.writeContentLength(buf, encoding, callback);
    };
    res.on("error", onError);
    res.on("finish", onError);
};

local.setTimeoutOnError = function (onError, timeout, err, data) {
/*
 * this function will after timeout has passed,
 * then call <onError>(<err>, <data>)
 */
    if (typeof onError === "function") {
        setTimeout(function () {
            onError(err, data);
        }, timeout);
    }
    return data;
};

local.sjclHashScryptCreate = function (password, opt) {
/*
 * this function will create a scrypt-hash of the password
 * with given <opt> (default = $s0$10801)
 * e.g.
 * $s0$e0801$epIxT/h6HbbwHaehFnh/bw==$7H0vs
 * XlY8UxxyW/BWx/9GuY7jEvGjT71GFd6O4SZND0=
 * https://github.com/wg/scrypt
 */
    // init opt
    opt = String(opt || "$s0$10801").split("$");
    // init salt
    if (!opt[3]) {
        opt[3] = local.sjcl.codec.base64.fromBits(
            local.sjcl.random.randomWords(4, 0)
        );
    }
    // init hash
    opt[4] = local.sjcl.codec.base64.fromBits(
        local.sjcl.misc.scrypt(
            password || "",
            local.sjcl.codec.base64.toBits(opt[3]),
            Math.pow(2, parseInt(opt[2].slice(0, 1), 16)),
            parseInt(opt[2].slice(1, 2), 16),
            parseInt(opt[2].slice(3, 4), 16)
        )
    );
    return opt.slice(0, 5).join("$");
};

local.sjclHashScryptValidate = function (password, hash) {
/*
 * this function will validate the password against the scrypt-hash
 * https://github.com/wg/scrypt
 */
    return local.sjclHashScryptCreate(password, hash) === hash;
};

local.sjclHashSha1Create = function (data) {
/*
 * this function will create a base64-encoded sha1 hash of the string data
 */
    return local.sjcl.codec.base64.fromBits(local.sjcl.hash.sha1.hash(data));
};

local.sjclHashSha256Create = function (data) {
/*
 * this function will create a base64-encoded sha256 hash of the string data
 */
    return local.sjcl.codec.base64.fromBits(local.sjcl.hash.sha256.hash(data));
};

local.sjclHmacSha1Create = function (key, data) {
/*
 * this function will create a base64-encoded sha1 hmac
 * from the string key and string data
 */
    let Hmac;
    Hmac = local.sjcl.misc.hmac;
    return local.sjcl.codec.base64.fromBits(
        (new Hmac(
            local.sjcl.codec.utf8String.toBits(key),
            local.sjcl.hash.sha1
        )).mac(local.sjcl.codec.utf8String.toBits(data))
    );
};

local.sjclHmacSha256Create = function (key, data) {
/*
 * this function will create a base64-encoded sha256 hmac
 * from the string key and string data
 */
    let Hmac;
    Hmac = local.sjcl.misc.hmac;
    return local.sjcl.codec.base64.fromBits(
        (new Hmac(
            local.sjcl.codec.utf8String.toBits(key),
            local.sjcl.hash.sha256
        )).mac(local.sjcl.codec.utf8String.toBits(data))
    );
};

local.stateInit = function (opt) {
/*
 * this function will init state <opt>
 */
    local.objectSetOverride(local, opt, 10);
    // init swgg
    local.swgg.apiUpdate(local.swgg.swaggerJson);
};

local.streamCleanup = function (stream) {
/*
 * this function will try to end or destroy the stream
 */
    let err;
    // try to end the stream
    try {
        stream.end();
    } catch (errCaught) {
        err = errCaught;
    }
    // if err, then try to destroy the stream
    if (err) {
        try {
            stream.destroy();
        } catch (ignore) {}
    }
};

local.stringHtmlSafe = function (text) {
/*
 * this function will make the text html-safe
 * https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html
 */
    return text.replace((
        /&/g
    ), "&amp;").replace((
        /"/g
    ), "&quot;").replace((
        /'/g
    ), "&apos;").replace((
        /</g
    ), "&lt;").replace((
        />/g
    ), "&gt;").replace((
        /&amp;(amp;|apos;|gt;|lt;|quot;)/ig
    ), "&$1");
};

local.stringMerge = function (str1, str2, rgx) {
/*
 * this function will merge <str2> into <str1>,
 * for sections where both match <rgx>
 */
    str2.replace(rgx, function (match2) {
        str1.replace(rgx, function (match1) {
            str1 = str1.replace(match1, function () {
                return match2;
            });
            return "";
        });
        return "";
    });
    return str1;
};

local.stringQuotedToAscii = function (str) {
/*
 * this function will replace non-ascii-chr to unicode-escaped-ascii-chr
 * in quoted-<str>
 */
    return str.replace((
        /\r/g
    ), "\\r").replace((
        /\t/g
    ), "\\t").replace((
        /[^\n\u0020-\u007e]/g
    ), function (chr) {
        return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).slice(-4);
    });
};

local.stringRegexpEscape = function (text) {
/*
 * this function will regexp-escape text
 * https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
 */
    return text.replace((
        /[\-\/\\\^$*+?.()|\[\]{}]/g
    ), "\\$&");
};

local.stringTruncate = function (text, maxLength) {
/*
 * this function will truncate text to given maxLength
 */
    return (
        text.length > maxLength
        ? text.slice(0, maxLength - 3).trimEnd() + "..."
        : text
    );
};

local.stringUniqueKey = function (text) {
/*
 * this function will return a string-key that is unique in given text
 */
    let key;
    // seed the key with the least frequent letters in the english-language
    // https://en.wikipedia.org/wiki/Letter_frequency
    key = "zqxj";
    do {
        key += Number(
            (1 + Math.random()) * 0x10000000000000
        ).toString(36).slice(1);
    } while (text.indexOf(key) >= 0);
    return key;
};

local.templateRender = function (template, dict, opt, ii) {
/*
 * this function will render <template> with given <dict>
 */
    let argList;
    let getVal;
    let match;
    let renderPartial;
    let rgx;
    let skip;
    let val;
    if (dict === null || dict === undefined) {
        dict = {};
    }
    opt = opt || {};
    getVal = function (key) {
        argList = key.split(" ");
        val = dict;
        if (argList[0] === "#this/") {
            return val;
        }
        if (argList[0] === "#ii/") {
            return ii;
        }
        // iteratively lookup nested val in dict
        argList[0].split(".").forEach(function (key) {
            val = val && val[key];
        });
        return val;
    };
    renderPartial = function (match0, helper, key, partial) {
        switch (helper) {
        case "each":
        case "eachTrimEndComma":
            val = getVal(key);
            val = (
                Array.isArray(val)
                ? val.map(function (dict, ii) {
                    // recurse with partial
                    return local.templateRender(partial, dict, opt, ii);
                }).join("")
                : ""
            );
            // remove trailing-comma from last elem
            if (helper === "eachTrimEndComma") {
                val = val.trimEnd().replace((
                    /,$/
                ), "");
            }
            return val;
        case "if":
            partial = partial.split("{{#unless " + key + "}}");
            partial = (
                getVal(key)
                ? partial[0]
                // handle 'unless' case
                : partial.slice(1).join("{{#unless " + key + "}}")
            );
            // recurse with partial
            return local.templateRender(partial, dict, opt);
        case "unless":
            return (
                getVal(key)
                ? ""
                // recurse with partial
                : local.templateRender(partial, dict, opt)
            );
        default:
            // recurse with partial
            return match0[0] + local.templateRender(match0.slice(1), dict, opt);
        }
    };
    // render partials
    rgx = (
        /\{\{#(\w+)\u0020([^}]+?)\}\}/g
    );
    template = template || "";
    match = rgx.exec(template);
    while (match) {
        rgx.lastIndex += 1 - match[0].length;
        template = template.replace(
            new RegExp(
                "\\{\\{#(" + match[1] + ") (" + match[2]
                + ")\\}\\}([\\S\\s]*?)\\{\\{/" + match[1] + " " + match[2]
                + "\\}\\}"
            ),
            renderPartial
        );
        match = rgx.exec(template);
    }
    // search for keys in the template
    return template.replace((
        /\{\{[^}]+?\}\}/g
    ), function (match0) {
        let markdownToHtml;
        let notHtmlSafe;
        notHtmlSafe = opt.notHtmlSafe;
        try {
            val = getVal(match0.slice(2, -2));
            if (val === undefined) {
                return match0;
            }
            argList.slice(1).forEach(function (fmt, ii, list) {
                switch (fmt) {
                case "*":
                case "+":
                case "-":
                case "/":
                    skip = ii + 1;
                    val = String(
                        fmt === "*"
                        ? Number(val) * Number(list[skip])
                        : fmt === "+"
                        ? Number(val) + Number(list[skip])
                        : fmt === "-"
                        ? Number(val) - Number(list[skip])
                        : Number(val) / Number(list[skip])
                    );
                    break;
                case "alphanumeric":
                    val = val.replace((
                        /\W/g
                    ), "_");
                    break;
                case "decodeURIComponent":
                    val = decodeURIComponent(val);
                    break;
                case "encodeURIComponent":
                    val = encodeURIComponent(val);
                    break;
                case "jsonStringify":
                    val = JSON.stringify(val);
                    break;
                case "jsonStringify4":
                    val = JSON.stringify(val, undefined, 4);
                    break;
                case "markdownSafe":
                    val = val.replace((
                        /`/g
                    ), "'");
                    break;
                case "markdownToHtml":
                    markdownToHtml = true;
                    break;
                case "notHtmlSafe":
                    notHtmlSafe = true;
                    break;
                case "padEnd":
                case "padStart":
                case "replace":
                case "slice":
                    skip = ii + 2;
                    val = String(val)[fmt](
                        list[skip - 1],
                        list[skip].replace("\"\"", "").replace("\"_\"", " ")
                    );
                    break;
                case "truncate":
                    skip = ii + 1;
                    if (val.length > list[skip]) {
                        val = val.slice(
                            0,
                            Math.max(list[skip] - 3, 0)
                        ).trimEnd() + "...";
                    }
                    break;
                // default to String.prototype[fmt]()
                default:
                    if (ii <= skip) {
                        break;
                    }
                    val = val[fmt]();
                }
            });
            val = String(val);
            // default to htmlSafe
            if (!notHtmlSafe) {
                val = val.replace((
                    /&/g
                ), "&amp;").replace((
                    /"/g
                ), "&quot;").replace((
                    /'/g
                ), "&apos;").replace((
                    /</g
                ), "&lt;").replace((
                    />/g
                ), "&gt;").replace((
                    /&amp;(amp;|apos;|gt;|lt;|quot;)/ig
                ), "&$1");
            }
            markdownToHtml = (
                markdownToHtml
                && (typeof local.marked === "function" && local.marked)
            );
            if (markdownToHtml) {
                val = markdownToHtml(val).replace((
                    /&amp;(amp;|apos;|gt;|lt;|quot;)/ig
                ), "&$1");
            }
            return val;
        } catch (errCaught) {
            errCaught.message = (
                "templateRender could not render expression "
                + JSON.stringify(match0) + "\n"
            ) + errCaught.message;
            local.assertOrThrow(undefined, errCaught);
        }
    });
};

local.templateRenderMyApp = function (template, opt) {
/*
 * this function will render my-app-lite template with given <opt>.packageJson
 */
    opt.packageJson = local.fsReadFileOrEmptyStringSync("package.json", "json");
    local.objectSetDefault(opt.packageJson, {
        nameLib: opt.packageJson.name.replace((
            /\W/g
        ), "_"),
        repository: {
            url: (
                "https://github.com/kaizhu256/node-"
                + opt.packageJson.name
                + ".git"
            )
        }
    }, 2);
    opt.githubRepo = opt.packageJson.repository.url.replace((
        /\.git$/
    ), "").split("/").slice(-2);
    template = template.replace((
        /kaizhu256(\.github\.io\/|%252F|\/)/g
    ), opt.githubRepo[0] + ("$1"));
    template = template.replace((
        /node-my-app-lite/g
    ), opt.githubRepo[1]);
    template = template.replace((
        /\bh1-my-app\b/g
    ), (
        opt.packageJson.nameHeroku
        || ("h1-" + opt.packageJson.nameLib.replace((
            /_/g
        ), "-"))
    ));
    template = template.replace((
        /my-app-lite/g
    ), opt.packageJson.name);
    template = template.replace((
        /my_app/g
    ), opt.packageJson.nameLib);
    template = template.replace((
        /\{\{packageJson\.(\S+)\}\}/g
    ), function (ignore, match1) {
        return opt.packageJson[match1];
    });
    return template;
};

local.testCase_nop_default = function (opt, onError) {
/*
 * this function will test nop's default handling-behavior
 */
    local.nop();
    onError(undefined, opt);
};

local.testMock = function (mockList, onTestCase, onError) {
/*
 * this function will mock the objects in mockList while running the onTestCase
 */
    let onError2;
    onError2 = function (err) {
        // restore mock[0] from mock[2]
        mockList.reverse().forEach(function (mock) {
            Object.keys(mock[2]).forEach(function (key) {
                mock[0][key] = mock[2][key];
            });
        });
        onError(err);
    };
    // suppress console.error and console.log
    if (!(mockList[0] && mockList[0][0] === console)) {
        mockList.unshift([
            console, {}
        ]);
    }
    local.objectSetDefault(mockList[0][1], {
        error: local.nop,
        log: local.nop
    });
    // mock-objects
    mockList.forEach(function (mock) {
        mock[2] = {};
        // backup mock[0] into mock[2]
        Object.keys(mock[1]).forEach(function (key) {
            mock[2][key] = (
                (
                    typeof process === "object"
                    && process.env === mock[0]
                    && mock[0][key] === undefined
                )
                // handle process.env
                ? ""
                : mock[0][key]
            );
        });
        // override mock[0] with mock[1]
        Object.keys(mock[1]).forEach(function (key) {
            mock[0][key] = mock[1][key];
        });
    });
    // try to call onError with mock-objects
    local.tryCatchOnError(function () {
        // run onTestCase
        onTestCase(onError2);
    }, onError2);
};

local.testReportCreate = function (testReport) {
/*
 * this function will create test-report artifacts
 */
    testReport = local.objectSetDefault(testReport, {
        testPlatformList: []
    });
    // print test-report summary
    console.error(
        "\n" + new Array(56).join("-")
        + "\n" + testReport.testPlatformList.filter(function (testPlatform) {
            // if testPlatform has no tests, then filter it out
            return testPlatform.testCaseList.length;
        }).map(function (testPlatform) {
            return (
                "| test-report - " + testPlatform.name + "\n|"
                + String(
                    testPlatform.timeElapsed + " ms     "
                ).padStart(16, " ")
                + String(
                    testPlatform.testsFailed + " failed "
                ).padStart(16, " ")
                + String(
                    testPlatform.testsPassed + " passed "
                ).padStart(16, " ")
                + "     |\n" + new Array(56).join("-")
            );
        }).join("\n") + "\n"
    );
    // create test-report.html
    local.fsWriteFileWithMkdirpSync(
        "tmp/build/test-report.html",
        local.testReportMerge(testReport)
    );
    // create build.badge.svg
    local.fs.writeFileSync(
        "tmp/build/build.badge.svg",
        local.assetsDict["/assets.buildBadge.template.svg"].replace((
            /0000-00-00\u002000:00:00\u0020UTC\u0020-\u0020master\u0020-\u0020aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/g
        ), (
            new Date().toISOString().slice(0, 19).replace("T", " ")
            + " - " + local.env.CI_BRANCH + " - " + local.env.CI_COMMIT_ID
        ))
    );
    // create test-report.badge.svg
    local.fs.writeFileSync(
        "tmp/build/test-report.badge.svg",
        local.assetsDict["/assets.testReportBadge.template.svg"].replace((
            // edit number of tests failed
            /999/g
        ), testReport.testsFailed).replace((
            // edit badge color
            /d00/g
        ), (
            testReport.testsFailed
            ? "d00"
            : "0d0"
        ))
    );
    console.error(
        "created test-report file "
        + process.cwd() + "/tmp/build/test-report.html\n"
    );
    // if any test failed, then exit with non-zero exitCode
    console.error(
        "\n" + local.env.MODE_BUILD
        + " - " + testReport.testsFailed + " failed tests\n"
    );
    // print failed testCase
    testReport.testPlatformList.forEach(function (testPlatform) {
        testPlatform.testCaseList.forEach(function (testCase) {
            if (testCase.status !== "passed") {
                console.error(JSON.stringify(testCase, undefined, 4));
            }
        });
    });
    return testReport;
};

local.testReportMerge = function (testReport1, testReport2) {
/*
 * this function will
 * 1. merge testReport2 into testReport1
 * 2. return testReport1 in html-format
 */
    let errorStackList;
    let testCaseNumber;
    let testReport;
    testReport2 = testReport2 || {};
    // 1. merge testReport2 into testReport1
    [
        testReport1, testReport2
    ].forEach(function (testReport, ii) {
        ii += 1;
        local.objectSetDefault(testReport, {
            date: new Date().toISOString(),
            errorStackList: [],
            testPlatformList: [],
            timeElapsed: 0
        }, 8);
        // security - handle malformed testReport
        local.assertOrThrow(
            typeof testReport === "object" && testReport,
            ii + " invalid testReport " + typeof testReport
        );
        // validate timeElapsed
        local.assertOrThrow(
            typeof testReport.timeElapsed === "number",
            ii + " invalid testReport.timeElapsed "
            + typeof testReport.timeElapsed
        );
        // security - handle malformed testReport.testPlatformList
        testReport.testPlatformList.forEach(function (testPlatform) {
            local.objectSetDefault(testPlatform, {
                name: "undefined",
                testCaseList: [],
                timeElapsed: 0
            }, 8);
            local.assertOrThrow(
                typeof testPlatform.name === "string",
                ii + " invalid testPlatform.name " + typeof testPlatform.name
            );
            // insert $MODE_BUILD into testPlatform.name
            if (local.env.MODE_BUILD) {
                testPlatform.name = testPlatform.name.replace((
                    /^(browser|node)\b/
                ), local.env.MODE_BUILD + " - $1");
            }
            // validate timeElapsed
            local.assertOrThrow(
                typeof testPlatform.timeElapsed === "number",
                (
                    ii + " invalid testPlatform.timeElapsed "
                    + typeof testPlatform.timeElapsed
                )
            );
            // security - handle malformed testPlatform.testCaseList
            testPlatform.testCaseList.forEach(function (testCase) {
                local.objectSetDefault(testCase, {
                    errorStack: "",
                    name: "undefined",
                    timeElapsed: 0
                }, 8);
                local.assertOrThrow(
                    typeof testCase.errorStack === "string",
                    ii + " invalid testCase.errorStack "
                    + typeof testCase.errorStack
                );
                local.assertOrThrow(
                    typeof testCase.name === "string",
                    ii + " invalid testCase.name " + typeof testCase.name
                );
                // validate timeElapsed
                local.assertOrThrow(
                    typeof testCase.timeElapsed === "number",
                    (
                        ii + " invalid testCase.timeElapsed "
                        + typeof testCase.timeElapsed
                    )
                );
            });
        });
    });
    // merge testReport2.testPlatformList into testReport1.testPlatformList
    testReport2.testPlatformList.forEach(function (testPlatform2) {
        // add testPlatform2 to testReport1.testPlatformList
        testReport1.testPlatformList.push(testPlatform2);
    });
    testReport = testReport1;
    testReport.testsFailed = 0;
    testReport.testsPassed = 0;
    testReport.testsPending = 0;
    testReport.testPlatformList.forEach(function (testPlatform) {
        testPlatform.testsFailed = 0;
        testPlatform.testsPassed = 0;
        testPlatform.testsPending = 0;
        testPlatform.testCaseList.forEach(function (testCase) {
            switch (testCase.status) {
            // update failed tests
            case "failed":
                testPlatform.testsFailed += 1;
                testReport.testsFailed += 1;
                break;
            // update passed tests
            case "passed":
                testPlatform.testsPassed += 1;
                testReport.testsPassed += 1;
                break;
            // update pending tests
            default:
                testPlatform.testsPending += 1;
                testReport.testsPending += 1;
            }
        });
        // update testPlatform.status
        testPlatform.status = (
            testPlatform.testsFailed
            ? "failed"
            : testPlatform.testsPending
            ? "pending"
            : "passed"
        );
        // sort testCaseList by status and name
        testPlatform.testCaseList.sort(function (aa, bb) {
            return (
                aa.status.replace("passed", "z") + aa.name
                > bb.status.replace("passed", "z") + bb.name
                ? 1
                : -1
            );
        });
    });
    // sort testPlatformList by status and name
    testReport.testPlatformList.sort(function (aa, bb) {
        return (
            aa.status.replace("passed", "z") + aa.name
            > bb.status.replace("passed", "z") + bb.name
            ? 1
            : -1
        );
    });
    // stop testReport timer
    if (!testReport.testsPending) {
        local.timeElapsedPoll(testReport);
    }
    // 2. return testReport1 in html-format
    // json-copy testReport that will be modified for html templating
    testReport = local.jsonCopy(testReport1);
    // update timeElapsed
    local.timeElapsedPoll(testReport);
    testReport.testPlatformList.forEach(function (testPlatform) {
        // update testPlatform.timeElapsed
        local.timeElapsedPoll(testPlatform);
        testPlatform.testCaseList.forEach(function (testCase) {
            if (!testCase.isDone) {
                local.timeElapsedPoll(testCase);
            }
            testPlatform.timeElapsed = Math.max(
                testPlatform.timeElapsed,
                testCase.timeElapsed
            );
        });
        // update testReport.timeElapsed with testPlatform.timeElapsed
        testReport.timeElapsed = Math.max(
            testReport.timeElapsed,
            testPlatform.timeElapsed
        );
    });
    // create html test-report
    testCaseNumber = 0;
    return local.templateRender(
        local.assetsDict["/assets.testReport.template.html"],
        local.objectSetOverride(testReport, {
            env: local.env,
            // map testPlatformList
            testPlatformList: testReport.testPlatformList.filter(function (
                testPlatform
            ) {
                // if testPlatform has no tests, then filter it out
                return testPlatform.testCaseList.length;
            }).map(function (testPlatform, ii) {
                errorStackList = [];
                return Object.assign(testPlatform, {
                    errorStackList,
                    name: testPlatform.name,
                    screenshot: testPlatform.screenshot,
                    // map testCaseList
                    testCaseList: testPlatform.testCaseList.map(function (
                        testCase
                    ) {
                        testCaseNumber += 1;
                        if (testCase.errorStack) {
                            errorStackList.push({
                                errorStack: (
                                    testCaseNumber + ". " + testCase.name
                                    + "\n" + testCase.errorStack
                                )
                            });
                        }
                        return local.objectSetOverride(testCase, {
                            testCaseNumber,
                            testReportTestStatusClass: (
                                "test"
                                + testCase.status[0].toUpperCase()
                                + testCase.status.slice(1)
                            )
                        }, 8);
                    }),
                    preClass: (
                        errorStackList.length
                        ? ""
                        : "displayNone"
                    ),
                    testPlatformNumber: ii + 1
                });
            }, 8),
            testStatusClass: (
                testReport.testsFailed
                ? "testFailed"
                : "testPassed"
            )
        }, 8)
    );
};

local.testRunBrowser = function () {
/*
 * this function will run browser-tests
 */
    // hide browser-tests
    if (local.querySelector("#htmlTestReport1").style.maxHeight !== "0px") {
        local.uiAnimateSlideUp(local.querySelector("#htmlTestReport1"));
        local.querySelector(
            "#buttonTestRun1"
        ).textContent = "run browser-tests";
        return;
    }
    // show browser-tests
    local.uiAnimateSlideDown(local.querySelector("#htmlTestReport1"));
    local.querySelector("#buttonTestRun1").textContent = "hide browser-tests";
    local.modeTest = 1;
    local.testRunDefault(local);
    // reset output
    local.querySelectorAll(".onevent-reset-output").forEach(function (elem) {
        elem.textContent = "";
    });
};

local.testRunDefault = function (opt) {
/*
 * this function will run tests in testPlatform.testCaseList
 */
    let consoleError;
    let isCoverage;
    let processExit;
    let testPlatform;
    let testReport;
    let timerInterval;
    // run-server
    if (!local.isBrowser) {
        local.testRunServer(opt);
    }
    globalThis.utility2_modeTest = Number(
        globalThis.utility2_modeTest
        || opt.modeTest
        || local.modeTest
        || local.env.npm_config_mode_test
    );
    switch (globalThis.utility2_modeTest) {
    // init
    case 1:
        globalThis.utility2_modeTest += 1;
        // reset db
        globalThis.utility2_onReadyAfter(function () {
            local.testRunDefault(opt);
        });
        return;
    // test-run
    default:
        // test-ignore
        if (
            globalThis.utility2_onReadyBefore.counter
            || !globalThis.utility2_modeTest
            || globalThis.utility2_modeTest > 2
        ) {
            return;
        }
        // test-run
        globalThis.utility2_modeTest += 1;
    }
    // visual notification - testRun
    local.ajaxProgressUpdate();
    // mock console.error
    consoleError = console.error;
    isCoverage = (
        typeof globalThis.__coverage__ === "object" && globalThis.__coverage__
        && Object.keys(globalThis.__coverage__).length
    );
    console.error = function (...argList) {
    /*
     * this function will ignore serverLog-messages during test-run
     */
        if (!isCoverage && !(
            /^serverLog\u0020-\u0020\{/
        ).test(argList[0])) {
            consoleError(...argList);
        }
    };
    // mock proces.exit
    if (!local.isBrowser) {
        processExit = process.exit;
        process.exit = local.nop;
    }
    // init modeTestCase
    local.modeTestCase = (
        local.modeTestCase
        || local.env.npm_config_mode_test_case || ""
    );
    // init testReport
    testReport = globalThis.utility2_testReport;
    // init testReport timer
    local.timeElapsedStart(testReport);
    // init testPlatform
    testPlatform = testReport.testPlatformList[0];
    // init testPlatform timer
    local.timeElapsedStart(testPlatform);
    // reset testPlatform.testCaseList
    testPlatform.testCaseList.length = 0;
    // add tests into testPlatform.testCaseList
    Object.keys(opt).forEach(function (key) {
        // add testCase opt[key] to testPlatform.testCaseList
        if (
            typeof opt[key] === "function" && (
                local.modeTestCase
                ? local.modeTestCase.split(
                    /[,\s]/g
                ).indexOf(key) >= 0
                : key.indexOf("testCase_") === 0
            )
        ) {
            testPlatform.testCaseList.push({
                isBrowser: local.isBrowser,
                name: key,
                status: "pending",
                onTestCase: opt[key]
            });
        }
    });
    local.testReportMerge(testReport);
    local.querySelectorAll("#htmlTestReport1").forEach(function (elem) {
        local.uiAnimateSlideDown(elem);
        elem.innerHTML = local.testReportMerge(testReport);
    });
    local.emit("utility2.testRunStart", testReport);
    // testRunProgressUpdate every 2000 ms until isDone
    timerInterval = setInterval(function () {
        // update testPlatform.timeElapsed
        local.timeElapsedPoll(testPlatform);
        local.querySelector(
            "#htmlTestReport1"
        ).innerHTML = local.testReportMerge(testReport);
        local.emit("utility2.testRunProgressUpdate", testReport);
        // cleanup timerInterval
        if (!testReport.testsPending) {
            clearInterval(timerInterval);
        }
        // list pending testCase every 5000 ms
        if (testPlatform.timeElapsed % 5000 < 2000) {
            consoleError(
                "testRunDefault - "
                + testPlatform.timeElapsed + " ms - testCase pending - "
                + testPlatform.testCaseList.filter(function (testCase) {
                    return testCase.status === "pending";
                }).slice(0, 4).map(function (testCase) {
                    return testCase.name;
                }).join(", ") + " ..."
            );
        }
    }, 2000);
    // shallow-copy testPlatform.testCaseList to prevent side-effects
    // from in-place sort from testReportMerge
    local.onParallelList({
        list: testPlatform.testCaseList.slice()
    }, function (testCase, onParallel) {
        let onError;
        let timerTimeout;
        onError = function (err) {
            // update testPlatform.timeElapsed
            local.timeElapsedPoll(testPlatform);
            // cleanup timerTimeout
            clearTimeout(timerTimeout);
            // if testCase isDone, then fail testCase
            if (testCase.isDone) {
                err = err || new Error(
                    "callback in testCase "
                    + testCase.name
                    + " called multiple times"
                );
            }
            // if err occurred, then fail testCase
            if (err) {
                // restore console.log
                console.error = consoleError;
                testCase.status = "failed";
                consoleError(
                    "\ntestRunDefault - "
                    + testPlatform.timeElapsed + " ms - testCase failed - "
                    + testCase.name + "\n" + err.message + "\n" + err.stack
                );
                testCase.errorStack = (
                    testCase.errorStack || err.message + "\n" + err.stack
                );
                // validate errorStack is non-empty
                local.assertOrThrow(
                    testCase.errorStack,
                    "invalid errorStack " + testCase.errorStack
                );
            }
            // if tests isDone, then do nothing
            if (testCase.isDone) {
                return;
            }
            testCase.isDone = true;
            if (testCase.status === "pending") {
                testCase.status = "passed";
            }
            // stop testCase timer
            local.timeElapsedPoll(testCase);
            consoleError(
                "testRunDefault - "
                + testPlatform.timeElapsed + " ms - [" + (
                    local.isBrowser
                    ? "browser"
                    : "node"
                ) + " test-case "
                + testPlatform.testCaseList.filter(function (testCase) {
                    return testCase.isDone;
                }).length + " of " + testPlatform.testCaseList.length + " "
                + testCase.status + "] - " + testCase.name
            );
            // if all testCase.isDone, then create test-report
            onParallel();
        };
        testCase = testCase.elem;
        // init timerTimeout
        timerTimeout = local.onTimeout(
            onError,
            local.timeoutDefault,
            testCase.name
        );
        // increment number of tests remaining
        onParallel.counter += 1;
        // try to run testCase
        local.tryCatchOnError(function () {
            // start testCase timer
            local.timeElapsedStart(testCase);
            testCase.onTestCase(undefined, onError);
        }, onError);
    }, function () {
    /*
     * this function will create the test-report after all tests isDone
     */
        // update testPlatform.timeElapsed
        local.timeElapsedPoll(testPlatform);
        globalThis.utility2_modeTest = 1;
        local.ajaxProgressUpdate();
        // init domOnEventWindowOnloadTimeElapsed
        if (globalThis.domOnEventWindowOnloadTimeElapsed < 0x10000000000) {
            testPlatform.domOnEventWindowOnloadTimeElapsed = (
                globalThis.domOnEventWindowOnloadTimeElapsed
            );
        }
        // finalize testReport
        local.testReportMerge(testReport);
        // create test-report.json
        testReport.coverage = null;
        local.fsWriteFileWithMkdirpSync(
            local.env.npm_config_dir_build + "/test-report.json",
            JSON.stringify(testReport, undefined, 4)
        );
        // restore console.log
        console.error = consoleError;
        // restore process.exit
        if (processExit) {
            process.exit = processExit;
        }
        // reset utility2_modeTest
        globalThis.utility2_modeTest = 0;
        // save testReport and coverage
        testReport.coverage = globalThis.__coverage__;
        console.timeStamp(globalThis.utility2_testId);
        local.emit("utility2.testRunEnd", testReport);
        // exit with number of tests failed
        if (processExit) {
            process.exit(testReport.testsFailed, testReport);
        }
    });
};

local.testRunServer = function (opt) {
/*
 * this function will
 * 1. create server from local.middlewareList
 * 2. start server on local.env.PORT
 * 3. run tests
 */
    // 1. create server from local.middlewareList
    local.middlewareList = local.middlewareList || [
        local.middlewareInit,
        local.middlewareForwardProxy,
        local.middlewareAssetsCached,
        local.middlewareJsonpStateInit,
        local.middlewareFileServer
    ];
    if (local.env.npm_config_mode_library || globalThis.utility2_serverHttp1) {
        return;
    }
    globalThis.utility2_onReadyBefore.counter += 1;
    local.serverLocalReqHandler = function (req, res) {
        let that;
        that = {};
        local.gotoNext(that, function (err) {
            if (err || that.gotoState >= local.middlewareList.length) {
                local.middlewareError(err, req, res);
                return;
            }
            // recurse with next middleware in middlewareList
            local.middlewareList[that.gotoState](req, res, that.gotoNext);
        });
        that.gotoState = -1;
        that.gotoNext();
    };
    globalThis.utility2_serverHttp1 = local.http.createServer(
        local.serverLocalReqHandler
    );
    // 2. start server on local.env.PORT
    console.error("http-server listening on port " + local.env.PORT);
    globalThis.utility2_onReadyBefore.counter += 1;
    globalThis.utility2_serverHttp1.listen(
        local.env.PORT,
        globalThis.utility2_onReadyBefore
    );
    // 3. run tests
    local.testRunDefault(opt);
    globalThis.utility2_onReadyBefore();
};

local.throwError = function () {
/*
 * this function will throw new err
 */
    throw new Error();
};

local.timeElapsedPoll = function (opt) {
/*
 * this function will poll <opt>.timeElapsed
 */
    opt = local.timeElapsedStart(opt);
    opt.timeElapsed = Date.now() - opt.timeStart;
    return opt;
};

local.timeElapsedStart = function (opt) {
/*
 * this function will start <opt>.timeElapsed
 */
    opt = opt || {};
    opt.timeStart = opt.timeStart || Date.now();
    return opt;
};

local.tryCatchOnError = function (fnc, onError) {
/*
 * this function will run the fnc in a tryCatch block,
 * else call onError with errCaught
 */
    let result;
    // validate onError
    local.assertOrThrow(typeof onError === "function", typeof onError);
    try {
        // reset errCaught
        local._debugTryCatchError = null;
        result = fnc();
        local._debugTryCatchError = null;
        return result;
    } catch (errCaught) {
        // debug errCaught
        local._debugTryCatchError = errCaught;
        return onError(errCaught);
    }
};

local.uiAnimateSlideAccordian = function (elem, elemList, onError) {
/*
 * this function will slideDown <elem>, but slideUp elements in <elemList>
 */
    elemList.forEach(function (elem2) {
        if (elem2 !== elem) {
            local.uiAnimateSlideUp(elem2);
        }
    });
    setTimeout(function () {
        local.uiAnimateSlideDown(elem, onError);
    }, 250);
};

local.uiAnimateSlideDown = function (elem, onError) {
/*
 * this function will slideDown dom-<elem>
 */
    onError = onError || local.nop;
    if (!(
        elem
        && elem.style && elem.style.maxHeight !== "100%"
        && elem.classList && elem.classList.contains("uiAnimateSlide")
    )) {
        onError();
        return;
    }
    elem.style.borderBottom = "";
    elem.style.borderTop = "";
    elem.style.marginBottom = "";
    elem.style.marginTop = "";
    elem.style.maxHeight = 1.5 * globalThis.innerHeight + "px";
    elem.style.paddingBottom = "";
    elem.style.paddingTop = "";
    setTimeout(function () {
        elem.style.maxHeight = "100%";
        onError();
    }, 250);
};

local.uiAnimateSlideUp = function (elem, onError) {
/*
 * this function will slideUp dom-<elem>
 */
    if (!(
        elem
        && elem.style && elem.style.maxHeight !== "0px"
        && elem.classList && elem.classList.contains("uiAnimateSlide")
    )) {
        local.setTimeoutOnError(onError);
        return;
    }
    elem.style.borderBottom = "0";
    elem.style.borderTop = "0";
    elem.style.marginBottom = "0";
    elem.style.marginTop = "0";
    elem.style.maxHeight = "0";
    elem.style.paddingBottom = "0";
    elem.style.paddingTop = "0";
    local.setTimeoutOnError(onError, 250);
};

local.urlJoin = function (aa, bb) {
/*
 * this function will if bb is relative, url-join aa with bb
 */
    // bb is absolute-url
    if ((
        /^\w+?:\/\//
    ).test(bb)) {
        return bb;
    }
    // bb is absolute-url without protocol
    if (bb.slice(0, 2) === "//") {
        return aa.split("/")[0] + bb;
    }
    // bb is absolute-url without host
    if (bb[0] === "/") {
        return aa.split("/").slice(0, 3).join("/") + bb;
    }
    // bb is relative-url
    if (aa.split("/").length < 4) {
        aa += "/";
    }
    return aa.replace((
        /[?#].*?$/
    ), "").replace((
        /[^\/]*?$/
    ), "") + bb;
};

local.urlParse = function (url) {
/*
 * this function will parse <url> according to below spec, plus a query param
 * https://developer.mozilla.org/en-US/docs/Web/API/URL
 */
    let urlParsed;
    urlParsed = {};
    // try to parse url
    local.tryCatchOnError(function () {
        // resolve host-less url
        if (local.isBrowser) {
            local.serverLocalHost = (
                local.serverLocalHost
                || location.protocol + "//" + location.host
            );
            // resolve absolute path
            if (url[0] === "/") {
                url = local.serverLocalHost + url;
            // resolve relative path
            } else if (!(
                /^\w+?:\/\//
            ).test(url)) {
                url = (
                    local.serverLocalHost
                    + location.pathname.replace((
                        /\/[^\/]*?$/
                    ), "") + "/" + url
                );
            }
            urlParsed = new globalThis.URL(url);
            urlParsed.path = (
                "/" + urlParsed.href.split("/").slice(3).join("/").split("#")[0]
            );
        } else {
            local.env.PORT = local.env.PORT || "8081";
            local.serverLocalHost = (
                local.serverLocalHost
                || ("http://127.0.0.1:" + local.env.PORT)
            );
            // resolve absolute path
            if (url[0] === "/") {
                url = local.serverLocalHost + url;
            // resolve relative path
            } else if (!(
                /^\w+?:\/\//
            ).test(url)) {
                url = local.serverLocalHost + "/" + url;
            }
            urlParsed = local.url.parse(url);
        }
        // init query
        urlParsed.query = {};
        local.coalesce(urlParsed.search, "").slice(1).replace((
            /[^&]+/g
        ), function (item) {
            item = item.split("=");
            item[0] = decodeURIComponent(item[0]);
            item[1] = decodeURIComponent(item.slice(1).join("="));
            // parse repeating query-param as an array
            if (urlParsed.query[item[0]]) {
                if (!Array.isArray(urlParsed.query[item[0]])) {
                    urlParsed.query[item[0]] = [
                        urlParsed.query[item[0]]
                    ];
                }
                urlParsed.query[item[0]].push(item[1]);
            } else {
                urlParsed.query[item[0]] = item[1];
            }
        });
        urlParsed.basename = urlParsed.pathname.replace((
            /^.*\//
        ), "");
    }, local.nop);
    // https://developer.mozilla.org/en/docs/Web/API/URL#Properties
    return {
        basename: urlParsed.basename || "",
        hash: urlParsed.hash || "",
        host: urlParsed.host || "",
        hostname: urlParsed.hostname || "",
        href: urlParsed.href || "",
        path: urlParsed.path || "",
        pathname: urlParsed.pathname || "",
        port: urlParsed.port || "",
        protocol: urlParsed.protocol || "",
        query: urlParsed.query || {},
        search: urlParsed.search || ""
    };
};

local.uuid4Create = function () {
/*
 * this function will create a random uuid,
 * with format 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
 */
    // code derived from http://jsperf.com/uuid4
    let id;
    let ii;
    id = "";
    ii = 0;
    while (ii < 32) {
        switch (ii) {
        case 8:
        case 20:
            id += "-";
            // coerce to finite integer
            id += local.value((Math.random() * 16) | 0).toString(16);
            break;
        case 12:
            id += "-";
            id += "4";
            break;
        case 16:
            id += "-";
            id += local.value((Math.random() * 4) | 8).toString(16);
            break;
        default:
            // coerce to finite integer
            id += local.value((Math.random() * 16) | 0).toString(16);
        }
        ii += 1;
    }
    return id;
};
}());



/* istanbul ignore next */
// run shared js-env code - init-after
(function () {
local.ajaxProgressUpdate = (
    globalThis.domOnEventAjaxProgressUpdate || function () {
        return;
    }
);
local.apidocCreate = local.apidoc.apidocCreate;
local.browserTest({
    modeTestReportCreate: true
});
local.cacheDict = {};
local.contentTypeDict = {
    // application
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".pdf": "application/pdf",
    ".xml": "application/xml; charset=utf-8",
    // image
    ".bmp": "image/bmp",
    ".gif": "image/gif",
    ".jpe": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml; charset=utf-8",
    // text
    ".css": "text/css; charset=utf-8",
    ".htm": "text/html; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".md": "text/markdown; charset=utf-8",
    ".txt": "text/plain; charset=utf-8"
};
local.env = (
    local.isBrowser
    ? {}
    : process.env
);
local.objectSetDefault(local.env, {
    npm_package_nameLib: local.coalesce(
        local.env.npm_package_name,
        ""
    ).replace((
        /\W/g
    ), "_")
});
local.objectSetDefault(local.env, {
    npm_package_description: "the greatest app in the world!",
    npm_package_name: "my-app-lite",
    npm_package_nameLib: "my_app",
    npm_package_version: "0.0.1"
});
local.errDefault = new Error("default-error");
local.istanbulCoverageMerge = local.istanbul.coverageMerge || local.value;
// cbranch-no cstat-no fstat-no missing-if-branch
local.istanbulCoverageReportCreate = (
    local.istanbul.coverageReportCreate || local.value
);
local.istanbulInstrumentInPackage = (
    local.istanbul.instrumentInPackage || local.value
);
local.istanbulInstrumentSync = local.istanbul.instrumentSync || local.value;
local.jslintAndPrint = local.jslint.jslintAndPrint || local.value;
local.puppeteerLaunch = local.puppeteer.puppeteerLaunch || local.value;
local.regexpCharsetEncodeUri = (
    /\w!#\$%&'\(\)\*\+,\-\.\/:;=\?@~/
);
local.regexpCharsetEncodeUriComponent = (
    /\w!%'\(\)\*\-\.~/
);
// https://github.com/chjj/marked/blob/v0.3.7/lib/marked.js#L499
local.regexpMatchUrl = (
    /\bhttps?:\/\/[^\s<]+[^<.,:;"')\]\s]/
);
// https://www.w3.org/TR/html5/sec-forms.html#email-state-typeemail
local.regexpValidateEmail = (
    /^[a-zA-Z0-9.!#$%&'*+\/=?\^_`{|}~\-]+@[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$/
);
// https://en.wikipedia.org/wiki/E.164
local.regexpValidatePhone = (
    /^(?:\+\d{1,3}[\u0020\-]?)?(?:\(\d{1,4}\)[\u0020\-]?)?\d[\d\u0020\-]{7,17}$/
);
local.regexpValidateUuid = (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
);
local.stringCharsetAscii = (
    "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007"
    + "\b\t\n\u000b\f\r\u000e\u000f"
    + "\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017"
    + "\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f"
    + " !\"#$%&'()*+,-./0123456789:;<=>?"
    + "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_"
    + "`abcdefghijklmnopqrstuvwxyz{|}~\u007f"
);
local.stringCharsetEncodeUri = (
    "!#$%&'()*+,-./"
    + "0123456789:;=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~"
);
local.stringCharsetEncodeUriComponent = (
    "!%'()*-."
    + "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~"
);
local.stringHelloEmoji = "hello \ud83d\ude01\n";
// mock swgg
local.swgg = local.swgg || {
    apiUpdate: local.nop,
    normalizeSwaggerJson: local.nop,
    swaggerValidate: local.nop
};
local.taskOnTaskDict = {};
// init serverLocalHost
local.urlParse("");
// init timeoutDefault
if (local.isBrowser) {
    location.search.replace((
        /\b(NODE_ENV|mode[A-Z]\w+|timeExit|timeoutDefault)=([^&#]+)/g
    ), function (match0, key, value) {
        local[key] = decodeURIComponent(value);
        local.env[key] = local[key];
        // try to JSON.parse the string
        local.tryCatchOnError(function () {
            local[key] = JSON.parse(match0);
        }, local.nop);
    });
} else {
    local.timeoutDefault = local.env.npm_config_timeout_default;
}
// init timeExit
local.timeExit = (
    Number(local.env.npm_config_time_exit) || local.timeExit
    || Number(Date.now() + Number(local.env.npm_config_timeout_exit))
);
if (local.timeExit) {
    local.timeoutDefault = local.timeExit - Date.now();
    if (!local.isBrowser) {
        setTimeout(process.exit, local.timeoutDefault);
    }
}
// re-init timeoutDefault
local.timeoutDefault = Number(local.timeoutDefault) || 30000;
globalThis.utility2_onReadyAfter = (
    globalThis.utility2_onReadyAfter || function (onError) {
    /*
     * this function will call onError when utility2_onReadyBefore.counter === 0
     */
        globalThis.utility2_onReadyBefore.counter += 1;
        local.once("utility2_onReadyAfter", onError);
        setTimeout(globalThis.utility2_onReadyBefore);
        return onError;
    }
);
globalThis.utility2_onReadyBefore = (
    globalThis.utility2_onReadyBefore || local.onParallel(function (err) {
    /*
     * this function will keep track of utility2_onReadyBefore.counter
     */
        local.emit("utility2_onReadyAfter", err);
    })
);
globalThis.utility2_onReadyAfter(local.nop);
}());



// run browser js-env code - init-after
(function () {
if (!local.isBrowser) {
    return;
}
// require modules
local.http = local._http;
local.https = local._http;
}());



/* istanbul ignore next */
// run node js-env code - init-after
(function () {
if (local.isBrowser) {
    return;
}
local.Module = require("module");
// init env
local.objectAssignDefault(local.env, {
    npm_config_dir_build: process.cwd() + "/tmp/build",
    npm_config_dir_tmp: process.cwd() + "/tmp"
});
// merge previous test-report
if (local.env.npm_config_file_test_report_merge) {
    local.testReportMerge(
        globalThis.utility2_testReport,
        local.fsReadFileOrEmptyStringSync(
            local.env.npm_config_file_test_report_merge,
            "json"
        )
    );
    if (process.argv[2] !== "--help") {
        console.error(
            "\n" + local.env.MODE_BUILD + " - merged test-report from file "
            + local.env.npm_config_file_test_report_merge
        );
    }
}
// init cli
if (module === require.main && (!globalThis.utility2_rollup || (
    process.argv[2]
    && local.cliDict[process.argv[2]]
    && process.argv[2].indexOf("utility2.") === 0
))) {
    local.cliRun({}, local.nop);
    if (local.cliDict[process.argv[2]]) {
        local.cliDict[process.argv[2]]();
        switch (process.argv[2]) {
        case "--interactive":
        case "-i":
        case "utility2.swaggerValidateFile":
        case "utility2.start":
            break;
        default:
            return;
        }
    }
}
// override assets
[
    "/assets.index.template.html",
    "/assets.swgg.swagger.json",
    "/assets.swgg.swagger.server.json"
].forEach(function (file) {
    local.assetsDict[file] = local.assetsDict[file] || "";
    if (process.argv[2] !== "--help" && local.fs.existsSync(__dirname + file)) {
        console.error("override assets " + __dirname + file);
        local.assetsDict[file] = local.fs.readFileSync(
            __dirname + file,
            "utf8"
        );
    }
});
if (globalThis.utility2_rollup) {
    local.assetsDict["/assets.utility2.rollup.js"] = (
        local.fs.readFileSync(
            __filename,
            "utf8"
        ).split("\n/* script-end /assets.utility2.rollup.end.js */")[0]
        + "\n/* script-end /assets.utility2.rollup.end.js */\n"
    );
    return;
}
// init assets
[
    "/assets.utility2.example.js",
    "/assets.utility2.html",
    "/assets.utility2.test.js",
    "lib.apidoc.js",
    "lib.github_crud.js",
    "lib.istanbul.js",
    "lib.jslint.js",
    "lib.marked.js",
    "lib.puppeteer.js",
    "lib.sjcl.js",
    "lib.swgg.js",
    "lib.utility2.js",
    "test.js"
].forEach(function (key) {
    switch (key) {
    case "/assets.utility2.example.js":
        local.assetsDict[key] = "";
        local.tryCatchOnError(function () {
            local.fs.readFileSync(
                __dirname + "/README.md",
                "utf8"
            ).replace((
                /```javascript([\S\s]*?)```/
            ), function (ignore, match1) {
                local.assetsDict[key] = match1.trim() + "\n";
            });
        }, local.nop);
        break;
    case "/assets.utility2.html":
        local.assetsDict[key] = "";
        local.tryCatchOnError(function () {
            local.fs.readFileSync(__dirname + "/README.md", "utf8").replace((
                /<!doctype\u0020html>[\S\s]*?<\/html>\\n\\\n/
            ), function (match0) {
                match0 = match0.replace((
                    /\\n\\$/gm
                ), "");
                match0 = match0.replace(
                    "<script src=\"assets.app.js\"></script>\n",
                    (
                        "<script "
                        + "src=\"assets.utility2.rollup.js\"></script>\n"
                        + "<script "
                        + "src=\"assets.utility2.example.js\"></script>\n"
                        + "<script "
                        + "src=\"assets.utility2.test.js\"></script>\n"
                    )
                );
                match0 = match0.replace(
                    "assets.example.js",
                    "assets.utility2.example.js"
                );
                match0 = match0.replace(
                    "assets.test.js",
                    "assets.utility2.test.js"
                );
                match0 = match0.replace((
                    /npm_package_/g
                ), "");
                match0 = match0.replace((
                    /<!--\u0020utility2-comment\b([\S\s]*?)\butility2-comment\u0020-->/g
                ), "$1");
                local.assetsDict[key] = local.templateRender(match0, {
                    env: local.objectSetDefault({
                        version: "0.0.1"
                    }, require(__dirname + "/package.json")),
                    isRollup: true
                });
            });
        }, local.nop);
        break;
    case "/assets.utility2.test.js":
        local.assetsDict[key] = local.fsReadFileOrEmptyStringSync(
            __dirname + "/test.js",
            "utf8"
        );
        break;
    case "lib.swgg.js":
    case "lib.utility2.js":
        key = key.replace("lib.", "");
        local.assetsDict["/assets." + key] = local.fsReadFileOrEmptyStringSync(
            __dirname + "/lib." + key,
            "utf8"
        ).replace((
            /^#!\//
        ), "// ");
        break;
    default:
        local.assetsDict["/assets.utility2." + key] = (
            local.fsReadFileOrEmptyStringSync(
                __dirname + "/" + key,
                "utf8"
            ).replace((
                /^#!\//
            ), "// ")
        );
    }
});
local.assetsDict["/assets.utility2.rollup.js"] = [
    "header",
    "/assets.utility2.rollup.start.js",
    "lib.apidoc.js",
    "lib.github_crud.js",
    "lib.istanbul.js",
    "lib.jslint.js",
    "lib.marked.js",
    "lib.puppeteer.js",
    "lib.sjcl.js",
    "lib.utility2.js",
    "lib.swgg.js",
    "/assets.utility2.example.js",
    "/assets.utility2.html",
    "/assets.utility2.test.js",
    "/assets.utility2.rollup.end.js"
].map(function (key) {
    let script;
    switch (key) {
    case "/assets.utility2.example.js":
    case "/assets.utility2.html":
    case "/assets.utility2.test.js":
        // handle large string-replace
        script = local.assetsDict["/assets.utility2.rollup.content.js"].split(
            "/* utility2.rollup.js content */"
        );
        script.splice(1, 0, local.value(
            "local.assetsDict[\"" + key + "\"] = "
            + JSON.stringify(local.assetsDict[key])
        ).replace((
            /\\\\/g
        ), "\u0000").replace((
            /\\n/g
        ), "\\n\\\n").replace((
            /\u0000/g
        ), "\\\\"));
        script = script.join("");
        script += "\n";
        break;
    case "/assets.utility2.rollup.start.js":
    case "/assets.utility2.rollup.end.js":
        script = local.assetsDict[key];
        break;
    case "header":
        return (
            "/* this rollup was created with utility2\n"
            + " * https://github.com/kaizhu256/node-utility2\n"
            + " */\n"
        );
    case "lib.swgg.js":
    case "lib.utility2.js":
        key = "/assets." + key.replace("lib.", "");
        script = local.assetsDict[key];
        break;
    default:
        key = "/assets.utility2." + key;
        script = local.assetsDict[key];
    }
    return (
        "/* script-begin " + key + " */\n"
        + script.trim()
        + "\n/* script-end " + key + " */\n"
    );
}).join("\n\n\n");
// init lib dependents
[
    "swgg"
].forEach(function (lib) {
    let file;
    file = __dirname + "/lib." + lib + ".js";
    if (local.fs.existsSync(file)) {
        local[lib] = require(file);
    }
});
}());
}());
