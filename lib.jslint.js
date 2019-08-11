#!/usr/bin/env node
/*
 * lib.jslint.js (2019.8.9)
 * https://github.com/kaizhu256/node-jslint-lite
 * this zero-dependency package will provide browser-compatible versions of jslint (v2018.10.26) and csslint (v1.0.5), with a working web-demo
 *
 */



/* istanbul instrument in package jslint */
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
    globalThis.utility2_jslint = local;
} else {
    module.exports = local;
    module.exports.__dirname = __dirname;
}
// init lib main
local.jslint = local;



/* validateLineSortedReset */
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

local.jsonStringifyOrdered = function (obj, replacer, space) {
/*
 * this function will JSON.stringify <obj>,
 * with object-keys sorted and circular-references removed
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Syntax
 */
    var circularSet;
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
        if (circularSet.has(obj)) {
            return;
        }
        circularSet.add(obj);
        // if obj is an array, then recurse its items
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
        if (
            err
            && typeof err.stack === "string"
            && err !== local.errDefault
            && String(err.stack).indexOf(stack.split("\n")[2]) < 0
        ) {
            // append current-stack to err.stack
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
}());



/* istanbul ignore next */
// run shared js-env code - function
(function () {
/*
file https://github.com/CSSLint/csslint/blob/v1.0.5/dist/csslint.js
*/
/* jslint ignore:start */
/*!
CSSLint v1.0.4
Copyright (c) 2016 Nicole Sullivan and Nicholas C. Zakas. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var CSSLint = (function(){
  var module = module || {},
      exports = exports || {};

/*!
Parser-Lib
Copyright (c) 2009-2016 Nicholas C. Zakas. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
/* Version v1.1.0, Build time: 6-December-2016 10:31:29 */
var parserlib = (function () {
var require;
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/* exported Colors */

var Colors = module.exports = {
    __proto__       :null,
    aliceblue       :"#f0f8ff",
    antiquewhite    :"#faebd7",
    aqua            :"#00ffff",
    aquamarine      :"#7fffd4",
    azure           :"#f0ffff",
    beige           :"#f5f5dc",
    bisque          :"#ffe4c4",
    black           :"#000000",
    blanchedalmond  :"#ffebcd",
    blue            :"#0000ff",
    blueviolet      :"#8a2be2",
    brown           :"#a52a2a",
    burlywood       :"#deb887",
    cadetblue       :"#5f9ea0",
    chartreuse      :"#7fff00",
    chocolate       :"#d2691e",
    coral           :"#ff7f50",
    cornflowerblue  :"#6495ed",
    cornsilk        :"#fff8dc",
    crimson         :"#dc143c",
    cyan            :"#00ffff",
    darkblue        :"#00008b",
    darkcyan        :"#008b8b",
    darkgoldenrod   :"#b8860b",
    darkgray        :"#a9a9a9",
    darkgrey        :"#a9a9a9",
    darkgreen       :"#006400",
    darkkhaki       :"#bdb76b",
    darkmagenta     :"#8b008b",
    darkolivegreen  :"#556b2f",
    darkorange      :"#ff8c00",
    darkorchid      :"#9932cc",
    darkred         :"#8b0000",
    darksalmon      :"#e9967a",
    darkseagreen    :"#8fbc8f",
    darkslateblue   :"#483d8b",
    darkslategray   :"#2f4f4f",
    darkslategrey   :"#2f4f4f",
    darkturquoise   :"#00ced1",
    darkviolet      :"#9400d3",
    deeppink        :"#ff1493",
    deepskyblue     :"#00bfff",
    dimgray         :"#696969",
    dimgrey         :"#696969",
    dodgerblue      :"#1e90ff",
    firebrick       :"#b22222",
    floralwhite     :"#fffaf0",
    forestgreen     :"#228b22",
    fuchsia         :"#ff00ff",
    gainsboro       :"#dcdcdc",
    ghostwhite      :"#f8f8ff",
    gold            :"#ffd700",
    goldenrod       :"#daa520",
    gray            :"#808080",
    grey            :"#808080",
    green           :"#008000",
    greenyellow     :"#adff2f",
    honeydew        :"#f0fff0",
    hotpink         :"#ff69b4",
    indianred       :"#cd5c5c",
    indigo          :"#4b0082",
    ivory           :"#fffff0",
    khaki           :"#f0e68c",
    lavender        :"#e6e6fa",
    lavenderblush   :"#fff0f5",
    lawngreen       :"#7cfc00",
    lemonchiffon    :"#fffacd",
    lightblue       :"#add8e6",
    lightcoral      :"#f08080",
    lightcyan       :"#e0ffff",
    lightgoldenrodyellow  :"#fafad2",
    lightgray       :"#d3d3d3",
    lightgrey       :"#d3d3d3",
    lightgreen      :"#90ee90",
    lightpink       :"#ffb6c1",
    lightsalmon     :"#ffa07a",
    lightseagreen   :"#20b2aa",
    lightskyblue    :"#87cefa",
    lightslategray  :"#778899",
    lightslategrey  :"#778899",
    lightsteelblue  :"#b0c4de",
    lightyellow     :"#ffffe0",
    lime            :"#00ff00",
    limegreen       :"#32cd32",
    linen           :"#faf0e6",
    magenta         :"#ff00ff",
    maroon          :"#800000",
    mediumaquamarine:"#66cdaa",
    mediumblue      :"#0000cd",
    mediumorchid    :"#ba55d3",
    mediumpurple    :"#9370d8",
    mediumseagreen  :"#3cb371",
    mediumslateblue :"#7b68ee",
    mediumspringgreen   :"#00fa9a",
    mediumturquoise :"#48d1cc",
    mediumvioletred :"#c71585",
    midnightblue    :"#191970",
    mintcream       :"#f5fffa",
    mistyrose       :"#ffe4e1",
    moccasin        :"#ffe4b5",
    navajowhite     :"#ffdead",
    navy            :"#000080",
    oldlace         :"#fdf5e6",
    olive           :"#808000",
    olivedrab       :"#6b8e23",
    orange          :"#ffa500",
    orangered       :"#ff4500",
    orchid          :"#da70d6",
    palegoldenrod   :"#eee8aa",
    palegreen       :"#98fb98",
    paleturquoise   :"#afeeee",
    palevioletred   :"#d87093",
    papayawhip      :"#ffefd5",
    peachpuff       :"#ffdab9",
    peru            :"#cd853f",
    pink            :"#ffc0cb",
    plum            :"#dda0dd",
    powderblue      :"#b0e0e6",
    purple          :"#800080",
    red             :"#ff0000",
    rosybrown       :"#bc8f8f",
    royalblue       :"#4169e1",
    saddlebrown     :"#8b4513",
    salmon          :"#fa8072",
    sandybrown      :"#f4a460",
    seagreen        :"#2e8b57",
    seashell        :"#fff5ee",
    sienna          :"#a0522d",
    silver          :"#c0c0c0",
    skyblue         :"#87ceeb",
    slateblue       :"#6a5acd",
    slategray       :"#708090",
    slategrey       :"#708090",
    snow            :"#fffafa",
    springgreen     :"#00ff7f",
    steelblue       :"#4682b4",
    tan             :"#d2b48c",
    teal            :"#008080",
    thistle         :"#d8bfd8",
    tomato          :"#ff6347",
    turquoise       :"#40e0d0",
    violet          :"#ee82ee",
    wheat           :"#f5deb3",
    white           :"#ffffff",
    whitesmoke      :"#f5f5f5",
    yellow          :"#ffff00",
    yellowgreen     :"#9acd32",
    //'currentColor' color keyword https://www.w3.org/TR/css3-color/#currentcolor
    currentColor        :"The value of the 'color' property.",
    //CSS2 system colors https://www.w3.org/TR/css3-color/#css2-system
    activeBorder        :"Active window border.",
    activecaption       :"Active window caption.",
    appworkspace        :"Background color of multiple document interface.",
    background          :"Desktop background.",
    buttonface          :"The face background color for 3-D elements that appear 3-D due to one layer of surrounding border.",
    buttonhighlight     :"The color of the border facing the light source for 3-D elements that appear 3-D due to one layer of surrounding border.",
    buttonshadow        :"The color of the border away from the light source for 3-D elements that appear 3-D due to one layer of surrounding border.",
    buttontext          :"Text on push buttons.",
    captiontext         :"Text in caption, size box, and scrollbar arrow box.",
    graytext            :"Grayed (disabled) text. This color is set to #000 if the current display driver does not support a solid gray color.",
    greytext            :"Greyed (disabled) text. This color is set to #000 if the current display driver does not support a solid grey color.",
    highlight           :"Item(s) selected in a control.",
    highlighttext       :"Text of item(s) selected in a control.",
    inactiveborder      :"Inactive window border.",
    inactivecaption     :"Inactive window caption.",
    inactivecaptiontext :"Color of text in an inactive caption.",
    infobackground      :"Background color for tooltip controls.",
    infotext            :"Text color for tooltip controls.",
    menu                :"Menu background.",
    menutext            :"Text in menus.",
    scrollbar           :"Scroll bar gray area.",
    threeddarkshadow    :"The color of the darker (generally outer) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
    threedface          :"The face background color for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
    threedhighlight     :"The color of the lighter (generally outer) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
    threedlightshadow   :"The color of the darker (generally inner) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
    threedshadow        :"The color of the lighter (generally inner) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.",
    window              :"Window background.",
    windowframe         :"Window frame.",
    windowtext          :"Text in windows."
};
},{}],2:[function(require,module,exports){
"use strict";

module.exports = Combinator;

var SyntaxUnit = require("../util/SyntaxUnit");

var Parser = require("./Parser");

/**
 * Represents a selector combinator (whitespace, +, >).
 * @namespace parserlib.css
 * @class Combinator
 * @extends parserlib.util.SyntaxUnit
 * @constructor
 * @param {String} text The text representation of the unit.
 * @param {int} line The line of text on which the unit resides.
 * @param {int} col The column of text on which the unit resides.
 */
function Combinator(text, line, col) {

    SyntaxUnit.call(this, text, line, col, Parser.COMBINATOR_TYPE);

    /**
     * The type of modifier.
     * @type String
     * @property type
     */
    this.type = "unknown";

    //pretty simple
    if (/^\s+$/.test(text)) {
        this.type = "descendant";
    } else if (text === ">") {
        this.type = "child";
    } else if (text === "+") {
        this.type = "adjacent-sibling";
    } else if (text === "~") {
        this.type = "sibling";
    }
}

Combinator.prototype = new SyntaxUnit();
Combinator.prototype.constructor = Combinator;
},{"../util/SyntaxUnit":26,"./Parser":6}],3:[function(require,module,exports){
"use strict";

module.exports = Matcher;

var StringReader = require("../util/StringReader");
var SyntaxError = require("../util/SyntaxError");

/**
 * This class implements a combinator library for matcher functions.
 * The combinators are described at:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Value_definition_syntax#Component_value_combinators
 */
function Matcher(matchFunc, toString) {
    this.match = function(expression) {
        // Save/restore marks to ensure that failed matches always restore
        // the original location in the expression.
        var result;
        expression.mark();
        result = matchFunc(expression);
        if (result) {
            expression.drop();
        } else {
            expression.restore();
        }
        return result;
    };
    this.toString = typeof toString === "function" ? toString : function() {
        return toString;
    };
}

/** Precedence table of combinators. */
Matcher.prec = {
    MOD:    5,
    SEQ:    4,
    ANDAND: 3,
    OROR:   2,
    ALT:    1
};

/** Simple recursive-descent grammar to build matchers from strings. */
Matcher.parse = function(str) {
    var reader, eat, expr, oror, andand, seq, mod, term, result;
    reader = new StringReader(str);
    eat = function(matcher) {
        var result = reader.readMatch(matcher);
        if (result === null) {
            throw new SyntaxError(
                "Expected "+matcher, reader.getLine(), reader.getCol());
        }
        return result;
    };
    expr = function() {
        // expr = oror (" | " oror)*
        var m = [ oror() ];
        while (reader.readMatch(" | ") !== null) {
            m.push(oror());
        }
        return m.length === 1 ? m[0] : Matcher.alt.apply(Matcher, m);
    };
    oror = function() {
        // oror = andand ( " || " andand)*
        var m = [ andand() ];
        while (reader.readMatch(" || ") !== null) {
            m.push(andand());
        }
        return m.length === 1 ? m[0] : Matcher.oror.apply(Matcher, m);
    };
    andand = function() {
        // andand = seq ( " && " seq)*
        var m = [ seq() ];
        while (reader.readMatch(" && ") !== null) {
            m.push(seq());
        }
        return m.length === 1 ? m[0] : Matcher.andand.apply(Matcher, m);
    };
    seq = function() {
        // seq = mod ( " " mod)*
        var m = [ mod() ];
        while (reader.readMatch(/^ (?![&|\]])/) !== null) {
            m.push(mod());
        }
        return m.length === 1 ? m[0] : Matcher.seq.apply(Matcher, m);
    };
    mod = function() {
        // mod = term ( "?" | "*" | "+" | "#" | "{<num>,<num>}" )?
        var m = term();
        if (reader.readMatch("?") !== null) {
            return m.question();
        } else if (reader.readMatch("*") !== null) {
            return m.star();
        } else if (reader.readMatch("+") !== null) {
            return m.plus();
        } else if (reader.readMatch("#") !== null) {
            return m.hash();
        } else if (reader.readMatch(/^\{\s*/) !== null) {
            var min = eat(/^\d+/);
            eat(/^\s*,\s*/);
            var max = eat(/^\d+/);
            eat(/^\s*\}/);
            return m.braces(+min, +max);
        }
        return m;
    };
    term = function() {
        // term = <nt> | literal | "[ " expression " ]"
        if (reader.readMatch("[ ") !== null) {
            var m = expr();
            eat(" ]");
            return m;
        }
        return Matcher.fromType(eat(/^[^ ?*+#{]+/));
    };
    result = expr();
    if (!reader.eof()) {
        throw new SyntaxError(
            "Expected end of string", reader.getLine(), reader.getCol());
    }
    return result;
};

/**
 * Convert a string to a matcher (parsing simple alternations),
 * or do nothing if the argument is already a matcher.
 */
Matcher.cast = function(m) {
    if (m instanceof Matcher) {
        return m;
    }
    return Matcher.parse(m);
};

/**
 * Create a matcher for a single type.
 */
Matcher.fromType = function(type) {
    // Late require of ValidationTypes to break a dependency cycle.
    var ValidationTypes = require("./ValidationTypes");
    return new Matcher(function(expression) {
        return expression.hasNext() && ValidationTypes.isType(expression, type);
    }, type);
};

/**
 * Create a matcher for one or more juxtaposed words, which all must
 * occur, in the given order.
 */
Matcher.seq = function() {
    var ms = Array.prototype.slice.call(arguments).map(Matcher.cast);
    if (ms.length === 1) {
        return ms[0];
    }
    return new Matcher(function(expression) {
        var i, result = true;
        for (i = 0; result && i < ms.length; i++) {
            result = ms[i].match(expression);
        }
        return result;
    }, function(prec) {
        var p = Matcher.prec.SEQ;
        var s = ms.map(function(m) {
            return m.toString(p);
        }).join(" ");
        if (prec > p) {
            s = "[ " + s + " ]";
        }
        return s;
    });
};

/**
 * Create a matcher for one or more alternatives, where exactly one
 * must occur.
 */
Matcher.alt = function() {
    var ms = Array.prototype.slice.call(arguments).map(Matcher.cast);
    if (ms.length === 1) {
        return ms[0];
    }
    return new Matcher(function(expression) {
        var i, result = false;
        for (i = 0; !result && i < ms.length; i++) {
            result = ms[i].match(expression);
        }
        return result;
    }, function(prec) {
        var p = Matcher.prec.ALT;
        var s = ms.map(function(m) {
            return m.toString(p);
        }).join(" | ");
        if (prec > p) {
            s = "[ " + s + " ]";
        }
        return s;
    });
};

/**
 * Create a matcher for two or more options.  This implements the
 * double bar (||) and double ampersand (&&) operators, as well as
 * variants of && where some of the alternatives are optional.
 * This will backtrack through even successful matches to try to
 * maximize the number of items matched.
 */
Matcher.many = function(required) {
    var ms = Array.prototype.slice.call(arguments, 1).reduce(function(acc, v) {
        if (v.expand) {
            // Insert all of the options for the given complex rule as
            // individual options.
            var ValidationTypes = require("./ValidationTypes");
            acc.push.apply(acc, ValidationTypes.complex[v.expand].options);
        } else {
            acc.push(Matcher.cast(v));
        }
        return acc;
    }, []);

    if (required === true) {
        required = ms.map(function() {
            return true;
        });
    }

    var result = new Matcher(function(expression) {
        var seen = [], max = 0, pass = 0;
        var success = function(matchCount) {
            if (pass === 0) {
                max = Math.max(matchCount, max);
                return matchCount === ms.length;
            } else {
                return matchCount === max;
            }
        };
        var tryMatch = function(matchCount) {
            for (var i = 0; i < ms.length; i++) {
                if (seen[i]) {
                    continue;
                }
                expression.mark();
                if (ms[i].match(expression)) {
                    seen[i] = true;
                    // Increase matchCount iff this was a required element
                    // (or if all the elements are optional)
                    if (tryMatch(matchCount + ((required === false || required[i]) ? 1 : 0))) {
                        expression.drop();
                        return true;
                    }
                    // Backtrack: try *not* matching using this rule, and
                    // let's see if it leads to a better overall match.
                    expression.restore();
                    seen[i] = false;
                } else {
                    expression.drop();
                }
            }
            return success(matchCount);
        };
        if (!tryMatch(0)) {
            // Couldn't get a complete match, retrace our steps to make the
            // match with the maximum # of required elements.
            pass++;
            tryMatch(0);
        }

        if (required === false) {
            return max > 0;
        }
        // Use finer-grained specification of which matchers are required.
        for (var i = 0; i < ms.length; i++) {
            if (required[i] && !seen[i]) {
                return false;
            }
        }
        return true;
    }, function(prec) {
        var p = required === false ? Matcher.prec.OROR : Matcher.prec.ANDAND;
        var s = ms.map(function(m, i) {
            if (required !== false && !required[i]) {
                return m.toString(Matcher.prec.MOD) + "?";
            }
            return m.toString(p);
        }).join(required === false ? " || " : " && ");
        if (prec > p) {
            s = "[ " + s + " ]";
        }
        return s;
    });
    result.options = ms;
    return result;
};

/**
 * Create a matcher for two or more options, where all options are
 * mandatory but they may appear in any order.
 */
Matcher.andand = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(true);
    return Matcher.many.apply(Matcher, args);
};

/**
 * Create a matcher for two or more options, where options are
 * optional and may appear in any order, but at least one must be
 * present.
 */
Matcher.oror = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(false);
    return Matcher.many.apply(Matcher, args);
};

/** Instance methods on Matchers. */
Matcher.prototype = {
    constructor: Matcher,
    // These are expected to be overridden in every instance.
    match: function() { throw new Error("unimplemented"); },
    toString: function() { throw new Error("unimplemented"); },
    // This returns a standalone function to do the matching.
    func: function() { return this.match.bind(this); },
    // Basic combinators
    then: function(m) { return Matcher.seq(this, m); },
    or: function(m) { return Matcher.alt(this, m); },
    andand: function(m) { return Matcher.many(true, this, m); },
    oror: function(m) { return Matcher.many(false, this, m); },
    // Component value multipliers
    star: function() { return this.braces(0, Infinity, "*"); },
    plus: function() { return this.braces(1, Infinity, "+"); },
    question: function() { return this.braces(0, 1, "?"); },
    hash: function() {
        return this.braces(1, Infinity, "#", Matcher.cast(","));
    },
    braces: function(min, max, marker, optSep) {
        var m1 = this, m2 = optSep ? optSep.then(this) : this;
        if (!marker) {
            marker = "{" + min + "," + max + "}";
        }
        return new Matcher(function(expression) {
            var result = true, i;
            for (i = 0; i < max; i++) {
                if (i > 0 && optSep) {
                    result = m2.match(expression);
                } else {
                    result = m1.match(expression);
                }
                if (!result) {
                    break;
                }
            }
            return i >= min;
        }, function() {
            return m1.toString(Matcher.prec.MOD) + marker;
        });
    }
};
},{"../util/StringReader":24,"../util/SyntaxError":25,"./ValidationTypes":21}],4:[function(require,module,exports){
"use strict";

module.exports = MediaFeature;

var SyntaxUnit = require("../util/SyntaxUnit");

var Parser = require("./Parser");

/**
 * Represents a media feature, such as max-width:500.
 * @namespace parserlib.css
 * @class MediaFeature
 * @extends parserlib.util.SyntaxUnit
 * @constructor
 * @param {SyntaxUnit} name The name of the feature.
 * @param {SyntaxUnit} value The value of the feature or null if none.
 */
function MediaFeature(name, value) {

    SyntaxUnit.call(this, "(" + name + (value !== null ? ":" + value : "") + ")", name.startLine, name.startCol, Parser.MEDIA_FEATURE_TYPE);

    /**
     * The name of the media feature
     * @type String
     * @property name
     */
    this.name = name;

    /**
     * The value for the feature or null if there is none.
     * @type SyntaxUnit
     * @property value
     */
    this.value = value;
}

MediaFeature.prototype = new SyntaxUnit();
MediaFeature.prototype.constructor = MediaFeature;
},{"../util/SyntaxUnit":26,"./Parser":6}],5:[function(require,module,exports){
"use strict";

module.exports = MediaQuery;

var SyntaxUnit = require("../util/SyntaxUnit");

var Parser = require("./Parser");

/**
 * Represents an individual media query.
 * @namespace parserlib.css
 * @class MediaQuery
 * @extends parserlib.util.SyntaxUnit
 * @constructor
 * @param {String} modifier The modifier "not" or "only" (or null).
 * @param {String} mediaType The type of media (i.e., "print").
 * @param {Array} parts Array of selectors parts making up this selector.
 * @param {int} line The line of text on which the unit resides.
 * @param {int} col The column of text on which the unit resides.
 */
function MediaQuery(modifier, mediaType, features, line, col) {

    SyntaxUnit.call(this, (modifier ? modifier + " ": "") + (mediaType ? mediaType : "") + (mediaType && features.length > 0 ? " and " : "") + features.join(" and "), line, col, Parser.MEDIA_QUERY_TYPE);

    /**
     * The media modifier ("not" or "only")
     * @type String
     * @property modifier
     */
    this.modifier = modifier;

    /**
     * The mediaType (i.e., "print")
     * @type String
     * @property mediaType
     */
    this.mediaType = mediaType;

    /**
     * The parts that make up the selector.
     * @type Array
     * @property features
     */
    this.features = features;
}

MediaQuery.prototype = new SyntaxUnit();
MediaQuery.prototype.constructor = MediaQuery;
},{"../util/SyntaxUnit":26,"./Parser":6}],6:[function(require,module,exports){
"use strict";

module.exports = Parser;

var EventTarget = require("../util/EventTarget");
var SyntaxError = require("../util/SyntaxError");
var SyntaxUnit = require("../util/SyntaxUnit");

var Combinator = require("./Combinator");
var MediaFeature = require("./MediaFeature");
var MediaQuery = require("./MediaQuery");
var PropertyName = require("./PropertyName");
var PropertyValue = require("./PropertyValue");
var PropertyValuePart = require("./PropertyValuePart");
var Selector = require("./Selector");
var SelectorPart = require("./SelectorPart");
var SelectorSubPart = require("./SelectorSubPart");
var TokenStream = require("./TokenStream");
var Tokens = require("./Tokens");
var Validation = require("./Validation");

/**
 * A CSS3 parser.
 * @namespace parserlib.css
 * @class Parser
 * @constructor
 * @param {Object} options (Optional) Various options for the parser:
 *      starHack (true|false) to allow IE6 star hack as valid,
 *      underscoreHack (true|false) to interpret leading underscores
 *      as IE6-7 targeting for known properties, ieFilters (true|false)
 *      to indicate that IE < 8 filters should be accepted and not throw
 *      syntax errors.
 */
function Parser(options) {

    //inherit event functionality
    EventTarget.call(this);

    this.options = options || {};

    this._tokenStream = null;
}

//Static constants
Parser.DEFAULT_TYPE = 0;
Parser.COMBINATOR_TYPE = 1;
Parser.MEDIA_FEATURE_TYPE = 2;
Parser.MEDIA_QUERY_TYPE = 3;
Parser.PROPERTY_NAME_TYPE = 4;
Parser.PROPERTY_VALUE_TYPE = 5;
Parser.PROPERTY_VALUE_PART_TYPE = 6;
Parser.SELECTOR_TYPE = 7;
Parser.SELECTOR_PART_TYPE = 8;
Parser.SELECTOR_SUB_PART_TYPE = 9;

Parser.prototype = function() {

    var proto = new EventTarget(),  //new prototype
        prop,
        additions =  {
            __proto__: null,

            //restore constructor
            constructor: Parser,

            //instance constants - yuck
            DEFAULT_TYPE : 0,
            COMBINATOR_TYPE : 1,
            MEDIA_FEATURE_TYPE : 2,
            MEDIA_QUERY_TYPE : 3,
            PROPERTY_NAME_TYPE : 4,
            PROPERTY_VALUE_TYPE : 5,
            PROPERTY_VALUE_PART_TYPE : 6,
            SELECTOR_TYPE : 7,
            SELECTOR_PART_TYPE : 8,
            SELECTOR_SUB_PART_TYPE : 9,

            //-----------------------------------------------------------------
            // Grammar
            //-----------------------------------------------------------------

            _stylesheet: function() {

                /*
                 * stylesheet
                 *  : [ CHARSET_SYM S* STRING S* ';' ]?
                 *    [S|CDO|CDC]* [ import [S|CDO|CDC]* ]*
                 *    [ namespace [S|CDO|CDC]* ]*
                 *    [ [ ruleset | media | page | font_face | keyframes_rule | supports_rule ] [S|CDO|CDC]* ]*
                 *  ;
                 */

                var tokenStream = this._tokenStream,
                    count,
                    token,
                    tt;

                this.fire("startstylesheet");

                //try to read character set
                this._charset();

                this._skipCruft();

                //try to read imports - may be more than one
                while (tokenStream.peek() === Tokens.IMPORT_SYM) {
                    this._import();
                    this._skipCruft();
                }

                //try to read namespaces - may be more than one
                while (tokenStream.peek() === Tokens.NAMESPACE_SYM) {
                    this._namespace();
                    this._skipCruft();
                }

                //get the next token
                tt = tokenStream.peek();

                //try to read the rest
                while (tt > Tokens.EOF) {

                    try {

                        switch (tt) {
                            case Tokens.MEDIA_SYM:
                                this._media();
                                this._skipCruft();
                                break;
                            case Tokens.PAGE_SYM:
                                this._page();
                                this._skipCruft();
                                break;
                            case Tokens.FONT_FACE_SYM:
                                this._font_face();
                                this._skipCruft();
                                break;
                            case Tokens.KEYFRAMES_SYM:
                                this._keyframes();
                                this._skipCruft();
                                break;
                            case Tokens.VIEWPORT_SYM:
                                this._viewport();
                                this._skipCruft();
                                break;
                            case Tokens.DOCUMENT_SYM:
                                this._document();
                                this._skipCruft();
                                break;
                            case Tokens.SUPPORTS_SYM:
                                this._supports();
                                this._skipCruft();
                                break;
                            case Tokens.UNKNOWN_SYM:  //unknown @ rule
                                tokenStream.get();
                                if (!this.options.strict) {

                                    //fire error event
                                    this.fire({
                                        type:       "error",
                                        error:      null,
                                        message:    "Unknown @ rule: " + tokenStream.LT(0).value + ".",
                                        line:       tokenStream.LT(0).startLine,
                                        col:        tokenStream.LT(0).startCol
                                    });

                                    //skip braces
                                    count=0;
                                    while (tokenStream.advance([Tokens.LBRACE, Tokens.RBRACE]) === Tokens.LBRACE) {
                                        count++;    //keep track of nesting depth
                                    }

                                    while (count) {
                                        tokenStream.advance([Tokens.RBRACE]);
                                        count--;
                                    }
                                } else {
                                    //not a syntax error, rethrow it
                                    throw new SyntaxError("Unknown @ rule.", tokenStream.LT(0).startLine, tokenStream.LT(0).startCol);
                                }
                                break;
                            case Tokens.S:
                                this._readWhitespace();
                                break;
                            default:
                                if (!this._ruleset()) {

                                    //error handling for known issues
                                    switch (tt) {
                                        case Tokens.CHARSET_SYM:
                                            token = tokenStream.LT(1);
                                            this._charset(false);
                                            throw new SyntaxError("@charset not allowed here.", token.startLine, token.startCol);
                                        case Tokens.IMPORT_SYM:
                                            token = tokenStream.LT(1);
                                            this._import(false);
                                            throw new SyntaxError("@import not allowed here.", token.startLine, token.startCol);
                                        case Tokens.NAMESPACE_SYM:
                                            token = tokenStream.LT(1);
                                            this._namespace(false);
                                            throw new SyntaxError("@namespace not allowed here.", token.startLine, token.startCol);
                                        default:
                                            tokenStream.get();  //get the last token
                                            this._unexpectedToken(tokenStream.token());
                                    }
                                }
                        }
                    } catch (ex) {
                        if (ex instanceof SyntaxError && !this.options.strict) {
                            this.fire({
                                type:       "error",
                                error:      ex,
                                message:    ex.message,
                                line:       ex.line,
                                col:        ex.col
                            });
                        } else {
                            throw ex;
                        }
                    }

                    tt = tokenStream.peek();
                }

                if (tt !== Tokens.EOF) {
                    this._unexpectedToken(tokenStream.token());
                }

                this.fire("endstylesheet");
            },

            _charset: function(emit) {
                var tokenStream = this._tokenStream,
                    charset,
                    token,
                    line,
                    col;

                if (tokenStream.match(Tokens.CHARSET_SYM)) {
                    line = tokenStream.token().startLine;
                    col = tokenStream.token().startCol;

                    this._readWhitespace();
                    tokenStream.mustMatch(Tokens.STRING);

                    token = tokenStream.token();
                    charset = token.value;

                    this._readWhitespace();
                    tokenStream.mustMatch(Tokens.SEMICOLON);

                    if (emit !== false) {
                        this.fire({
                            type:   "charset",
                            charset:charset,
                            line:   line,
                            col:    col
                        });
                    }
                }
            },

            _import: function(emit) {
                /*
                 * import
                 *   : IMPORT_SYM S*
                 *    [STRING|URI] S* media_query_list? ';' S*
                 */

                var tokenStream = this._tokenStream,
                    uri,
                    importToken,
                    mediaList   = [];

                //read import symbol
                tokenStream.mustMatch(Tokens.IMPORT_SYM);
                importToken = tokenStream.token();
                this._readWhitespace();

                tokenStream.mustMatch([Tokens.STRING, Tokens.URI]);

                //grab the URI value
                uri = tokenStream.token().value.replace(/^(?:url\()?["']?([^"']+?)["']?\)?$/, "$1");

                this._readWhitespace();

                mediaList = this._media_query_list();

                //must end with a semicolon
                tokenStream.mustMatch(Tokens.SEMICOLON);
                this._readWhitespace();

                if (emit !== false) {
                    this.fire({
                        type:   "import",
                        uri:    uri,
                        media:  mediaList,
                        line:   importToken.startLine,
                        col:    importToken.startCol
                    });
                }
            },

            _namespace: function(emit) {
                /*
                 * namespace
                 *   : NAMESPACE_SYM S* [namespace_prefix S*]? [STRING|URI] S* ';' S*
                 */

                var tokenStream = this._tokenStream,
                    line,
                    col,
                    prefix,
                    uri;

                //read import symbol
                tokenStream.mustMatch(Tokens.NAMESPACE_SYM);
                line = tokenStream.token().startLine;
                col = tokenStream.token().startCol;
                this._readWhitespace();

                //it's a namespace prefix - no _namespace_prefix() method because it's just an IDENT
                if (tokenStream.match(Tokens.IDENT)) {
                    prefix = tokenStream.token().value;
                    this._readWhitespace();
                }

                tokenStream.mustMatch([Tokens.STRING, Tokens.URI]);
                /*if (!tokenStream.match(Tokens.STRING)){
                    tokenStream.mustMatch(Tokens.URI);
                }*/

                //grab the URI value
                uri = tokenStream.token().value.replace(/(?:url\()?["']([^"']+)["']\)?/, "$1");

                this._readWhitespace();

                //must end with a semicolon
                tokenStream.mustMatch(Tokens.SEMICOLON);
                this._readWhitespace();

                if (emit !== false) {
                    this.fire({
                        type:   "namespace",
                        prefix: prefix,
                        uri:    uri,
                        line:   line,
                        col:    col
                    });
                }
            },

            _supports: function(emit) {
                /*
                 * supports_rule
                 *  : SUPPORTS_SYM S* supports_condition S* group_rule_body
                 *  ;
                 */
                var tokenStream = this._tokenStream,
                    line,
                    col;

                if (tokenStream.match(Tokens.SUPPORTS_SYM)) {
                    line = tokenStream.token().startLine;
                    col = tokenStream.token().startCol;

                    this._readWhitespace();
                    this._supports_condition();
                    this._readWhitespace();

                    tokenStream.mustMatch(Tokens.LBRACE);
                    this._readWhitespace();

                    if (emit !== false) {
                        this.fire({
                            type:   "startsupports",
                            line:   line,
                            col:    col
                        });
                    }

                    while (true) {
                        if (!this._ruleset()) {
                            break;
                        }
                    }

                    tokenStream.mustMatch(Tokens.RBRACE);
                    this._readWhitespace();

                    this.fire({
                        type:   "endsupports",
                        line:   line,
                        col:    col
                    });
                }
            },

            _supports_condition: function() {
                /*
                 * supports_condition
                 *  : supports_negation | supports_conjunction | supports_disjunction |
                 *    supports_condition_in_parens
                 *  ;
                 */
                var tokenStream = this._tokenStream,
                    ident;

                if (tokenStream.match(Tokens.IDENT)) {
                    ident = tokenStream.token().value.toLowerCase();

                    if (ident === "not") {
                        tokenStream.mustMatch(Tokens.S);
                        this._supports_condition_in_parens();
                    } else {
                        tokenStream.unget();
                    }
                } else {
                    this._supports_condition_in_parens();
                    this._readWhitespace();

                    while (tokenStream.peek() === Tokens.IDENT) {
                        ident = tokenStream.LT(1).value.toLowerCase();
                        if (ident === "and" || ident === "or") {
                            tokenStream.mustMatch(Tokens.IDENT);
                            this._readWhitespace();
                            this._supports_condition_in_parens();
                            this._readWhitespace();
                        }
                    }
                }
            },

            _supports_condition_in_parens: function() {
                /*
                 * supports_condition_in_parens
                 *  : ( '(' S* supports_condition S* ')' ) | supports_declaration_condition |
                 *    general_enclosed
                 *  ;
                 */
                var tokenStream = this._tokenStream,
                    ident;

                if (tokenStream.match(Tokens.LPAREN)) {
                    this._readWhitespace();
                    if (tokenStream.match(Tokens.IDENT)) {
                        // look ahead for not keyword, if not given, continue with declaration condition.
                        ident = tokenStream.token().value.toLowerCase();
                        if (ident === "not") {
                            this._readWhitespace();
                            this._supports_condition();
                            this._readWhitespace();
                            tokenStream.mustMatch(Tokens.RPAREN);
                        } else {
                            tokenStream.unget();
                            this._supports_declaration_condition(false);
                        }
                    } else {
                        this._supports_condition();
                        this._readWhitespace();
                        tokenStream.mustMatch(Tokens.RPAREN);
                    }
                } else {
                    this._supports_declaration_condition();
                }
            },

            _supports_declaration_condition: function(requireStartParen) {
                /*
                 * supports_declaration_condition
                 *  : '(' S* declaration ')'
                 *  ;
                 */
                var tokenStream = this._tokenStream;

                if (requireStartParen !== false) {
                    tokenStream.mustMatch(Tokens.LPAREN);
                }
                this._readWhitespace();
                this._declaration();
                tokenStream.mustMatch(Tokens.RPAREN);
            },

            _media: function() {
                /*
                 * media
                 *   : MEDIA_SYM S* media_query_list S* '{' S* ruleset* '}' S*
                 *   ;
                 */
                var tokenStream     = this._tokenStream,
                    line,
                    col,
                    mediaList;//       = [];

                //look for @media
                tokenStream.mustMatch(Tokens.MEDIA_SYM);
                line = tokenStream.token().startLine;
                col = tokenStream.token().startCol;

                this._readWhitespace();

                mediaList = this._media_query_list();

                tokenStream.mustMatch(Tokens.LBRACE);
                this._readWhitespace();

                this.fire({
                    type:   "startmedia",
                    media:  mediaList,
                    line:   line,
                    col:    col
                });

                while (true) {
                    if (tokenStream.peek() === Tokens.PAGE_SYM) {
                        this._page();
                    } else if (tokenStream.peek() === Tokens.FONT_FACE_SYM) {
                        this._font_face();
                    } else if (tokenStream.peek() === Tokens.VIEWPORT_SYM) {
                        this._viewport();
                    } else if (tokenStream.peek() === Tokens.DOCUMENT_SYM) {
                        this._document();
                    } else if (tokenStream.peek() === Tokens.SUPPORTS_SYM) {
                        this._supports();
                    } else if (tokenStream.peek() === Tokens.MEDIA_SYM) {
                        this._media();
                    } else if (!this._ruleset()) {
                        break;
                    }
                }

                tokenStream.mustMatch(Tokens.RBRACE);
                this._readWhitespace();

                this.fire({
                    type:   "endmedia",
                    media:  mediaList,
                    line:   line,
                    col:    col
                });
            },

            //CSS3 Media Queries
            _media_query_list: function() {
                /*
                 * media_query_list
                 *   : S* [media_query [ ',' S* media_query ]* ]?
                 *   ;
                 */
                var tokenStream = this._tokenStream,
                    mediaList   = [];

                this._readWhitespace();

                if (tokenStream.peek() === Tokens.IDENT || tokenStream.peek() === Tokens.LPAREN) {
                    mediaList.push(this._media_query());
                }

                while (tokenStream.match(Tokens.COMMA)) {
                    this._readWhitespace();
                    mediaList.push(this._media_query());
                }

                return mediaList;
            },

            /*
             * Note: "expression" in the grammar maps to the _media_expression
             * method.

             */
            _media_query: function() {
                /*
                 * media_query
                 *   : [ONLY | NOT]? S* media_type S* [ AND S* expression ]*
                 *   | expression [ AND S* expression ]*
                 *   ;
                 */
                var tokenStream = this._tokenStream,
                    type        = null,
                    ident       = null,
                    token       = null,
                    expressions = [];

                if (tokenStream.match(Tokens.IDENT)) {
                    ident = tokenStream.token().value.toLowerCase();

                    //since there's no custom tokens for these, need to manually check
                    if (ident !== "only" && ident !== "not") {
                        tokenStream.unget();
                        ident = null;
                    } else {
                        token = tokenStream.token();
                    }
                }

                this._readWhitespace();

                if (tokenStream.peek() === Tokens.IDENT) {
                    type = this._media_type();
                    if (token === null) {
                        token = tokenStream.token();
                    }
                } else if (tokenStream.peek() === Tokens.LPAREN) {
                    if (token === null) {
                        token = tokenStream.LT(1);
                    }
                    expressions.push(this._media_expression());
                }

                if (type === null && expressions.length === 0) {
                    return null;
                } else {
                    this._readWhitespace();
                    while (tokenStream.match(Tokens.IDENT)) {
                        if (tokenStream.token().value.toLowerCase() !== "and") {
                            this._unexpectedToken(tokenStream.token());
                        }

                        this._readWhitespace();
                        expressions.push(this._media_expression());
                    }
                }

                return new MediaQuery(ident, type, expressions, token.startLine, token.startCol);
            },

            //CSS3 Media Queries
            _media_type: function() {
                /*
                 * media_type
                 *   : IDENT
                 *   ;
                 */
                return this._media_feature();
            },

            /**
             * Note: in CSS3 Media Queries, this is called "expression".
             * Renamed here to avoid conflict with CSS3 Selectors
             * definition of "expression". Also note that "expr" in the
             * grammar now maps to "expression" from CSS3 selectors.
             * @method _media_expression
             * @private
             */
            _media_expression: function() {
                /*
                 * expression
                 *  : '(' S* media_feature S* [ ':' S* expr ]? ')' S*
                 *  ;
                 */
                var tokenStream = this._tokenStream,
                    feature     = null,
                    token,
                    expression  = null;

                tokenStream.mustMatch(Tokens.LPAREN);

                feature = this._media_feature();
                this._readWhitespace();

                if (tokenStream.match(Tokens.COLON)) {
                    this._readWhitespace();
                    token = tokenStream.LT(1);
                    expression = this._expression();
                }

                tokenStream.mustMatch(Tokens.RPAREN);
                this._readWhitespace();

                return new MediaFeature(feature, expression ? new SyntaxUnit(expression, token.startLine, token.startCol) : null);
            },

            //CSS3 Media Queries
            _media_feature: function() {
                /*
                 * media_feature
                 *   : IDENT
                 *   ;
                 */
                var tokenStream = this._tokenStream;

                this._readWhitespace();

                tokenStream.mustMatch(Tokens.IDENT);

                return SyntaxUnit.fromToken(tokenStream.token());
            },

            //CSS3 Paged Media
            _page: function() {
                /*
                 * page:
                 *    PAGE_SYM S* IDENT? pseudo_page? S*
                 *    '{' S* [ declaration | margin ]? [ ';' S* [ declaration | margin ]? ]* '}' S*
                 *    ;
                 */
                var tokenStream = this._tokenStream,
                    line,
                    col,
                    identifier  = null,
                    pseudoPage  = null;

                //look for @page
                tokenStream.mustMatch(Tokens.PAGE_SYM);
                line = tokenStream.token().startLine;
                col = tokenStream.token().startCol;

                this._readWhitespace();

                if (tokenStream.match(Tokens.IDENT)) {
                    identifier = tokenStream.token().value;

                    //The value 'auto' may not be used as a page name and MUST be treated as a syntax error.
                    if (identifier.toLowerCase() === "auto") {
                        this._unexpectedToken(tokenStream.token());
                    }
                }

                //see if there's a colon upcoming
                if (tokenStream.peek() === Tokens.COLON) {
                    pseudoPage = this._pseudo_page();
                }

                this._readWhitespace();

                this.fire({
                    type:   "startpage",
                    id:     identifier,
                    pseudo: pseudoPage,
                    line:   line,
                    col:    col
                });

                this._readDeclarations(true, true);

                this.fire({
                    type:   "endpage",
                    id:     identifier,
                    pseudo: pseudoPage,
                    line:   line,
                    col:    col
                });
            },

            //CSS3 Paged Media
            _margin: function() {
                /*
                 * margin :
                 *    margin_sym S* '{' declaration [ ';' S* declaration? ]* '}' S*
                 *    ;
                 */
                var tokenStream = this._tokenStream,
                    line,
                    col,
                    marginSym   = this._margin_sym();

                if (marginSym) {
                    line = tokenStream.token().startLine;
                    col = tokenStream.token().startCol;

                    this.fire({
                        type: "startpagemargin",
                        margin: marginSym,
                        line:   line,
                        col:    col
                    });

                    this._readDeclarations(true);

                    this.fire({
                        type: "endpagemargin",
                        margin: marginSym,
                        line:   line,
                        col:    col
                    });
                    return true;
                } else {
                    return false;
                }
            },

            //CSS3 Paged Media
            _margin_sym: function() {

                /*
                 * margin_sym :
                 *    TOPLEFTCORNER_SYM |
                 *    TOPLEFT_SYM |
                 *    TOPCENTER_SYM |
                 *    TOPRIGHT_SYM |
                 *    TOPRIGHTCORNER_SYM |
                 *    BOTTOMLEFTCORNER_SYM |
                 *    BOTTOMLEFT_SYM |
                 *    BOTTOMCENTER_SYM |
                 *    BOTTOMRIGHT_SYM |
                 *    BOTTOMRIGHTCORNER_SYM |
                 *    LEFTTOP_SYM |
                 *    LEFTMIDDLE_SYM |
                 *    LEFTBOTTOM_SYM |
                 *    RIGHTTOP_SYM |
                 *    RIGHTMIDDLE_SYM |
                 *    RIGHTBOTTOM_SYM
                 *    ;
                 */

                var tokenStream = this._tokenStream;

                if (tokenStream.match([Tokens.TOPLEFTCORNER_SYM, Tokens.TOPLEFT_SYM,
                        Tokens.TOPCENTER_SYM, Tokens.TOPRIGHT_SYM, Tokens.TOPRIGHTCORNER_SYM,
                        Tokens.BOTTOMLEFTCORNER_SYM, Tokens.BOTTOMLEFT_SYM,
                        Tokens.BOTTOMCENTER_SYM, Tokens.BOTTOMRIGHT_SYM,
                        Tokens.BOTTOMRIGHTCORNER_SYM, Tokens.LEFTTOP_SYM,
                        Tokens.LEFTMIDDLE_SYM, Tokens.LEFTBOTTOM_SYM, Tokens.RIGHTTOP_SYM,
                        Tokens.RIGHTMIDDLE_SYM, Tokens.RIGHTBOTTOM_SYM])) {
                    return SyntaxUnit.fromToken(tokenStream.token());
                } else {
                    return null;
                }
            },

            _pseudo_page: function() {
                /*
                 * pseudo_page
                 *   : ':' IDENT
                 *   ;
                 */

                var tokenStream = this._tokenStream;

                tokenStream.mustMatch(Tokens.COLON);
                tokenStream.mustMatch(Tokens.IDENT);

                //TODO: CSS3 Paged Media says only "left", "center", and "right" are allowed

                return tokenStream.token().value;
            },

            _font_face: function() {
                /*
                 * font_face
                 *   : FONT_FACE_SYM S*
                 *     '{' S* declaration [ ';' S* declaration ]* '}' S*
                 *   ;
                 */
                var tokenStream = this._tokenStream,
                    line,
                    col;

                //look for @page
                tokenStream.mustMatch(Tokens.FONT_FACE_SYM);
                line = tokenStream.token().startLine;
                col = tokenStream.token().startCol;

                this._readWhitespace();

                this.fire({
                    type:   "startfontface",
                    line:   line,
                    col:    col
                });

                this._readDeclarations(true);

                this.fire({
                    type:   "endfontface",
                    line:   line,
                    col:    col
                });
            },

            _viewport: function() {
                /*
                 * viewport
                 *   : VIEWPORT_SYM S*
                 *     '{' S* declaration? [ ';' S* declaration? ]* '}' S*
                 *   ;
                 */
                var tokenStream = this._tokenStream,
                    line,
                    col;

                tokenStream.mustMatch(Tokens.VIEWPORT_SYM);
                line = tokenStream.token().startLine;
                col = tokenStream.token().startCol;

                this._readWhitespace();

                this.fire({
                    type:   "startviewport",
                    line:   line,
                    col:    col
                });

                this._readDeclarations(true);

                this.fire({
                    type:   "endviewport",
                    line:   line,
                    col:    col
                });
            },

            _document: function() {
                /*
                 * document
                 *   : DOCUMENT_SYM S*
                 *     _document_function [ ',' S* _document_function ]* S*
                 *     '{' S* ruleset* '}'
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    token,
                    functions = [],
                    prefix = "";

                tokenStream.mustMatch(Tokens.DOCUMENT_SYM);
                token = tokenStream.token();
                if (/^@\-([^\-]+)\-/.test(token.value)) {
                    prefix = RegExp.$1;
                }

                this._readWhitespace();
                functions.push(this._document_function());

                while (tokenStream.match(Tokens.COMMA)) {
                    this._readWhitespace();
                    functions.push(this._document_function());
                }

                tokenStream.mustMatch(Tokens.LBRACE);
                this._readWhitespace();

                this.fire({
                    type:      "startdocument",
                    functions: functions,
                    prefix:    prefix,
                    line:      token.startLine,
                    col:       token.startCol
                });

                var ok = true;
                while (ok) {
                    switch (tokenStream.peek()) {
                        case Tokens.PAGE_SYM:
                            this._page();
                            break;
                        case Tokens.FONT_FACE_SYM:
                            this._font_face();
                            break;
                        case Tokens.VIEWPORT_SYM:
                            this._viewport();
                            break;
                        case Tokens.MEDIA_SYM:
                            this._media();
                            break;
                        case Tokens.KEYFRAMES_SYM:
                            this._keyframes();
                            break;
                        case Tokens.DOCUMENT_SYM:
                            this._document();
                            break;
                        default:
                            ok = Boolean(this._ruleset());
                    }
                }

                tokenStream.mustMatch(Tokens.RBRACE);
                token = tokenStream.token();
                this._readWhitespace();

                this.fire({
                    type:      "enddocument",
                    functions: functions,
                    prefix:    prefix,
                    line:      token.startLine,
                    col:       token.startCol
                });
            },

            _document_function: function() {
                /*
                 * document_function
                 *   : function | URI S*
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    value;

                if (tokenStream.match(Tokens.URI)) {
                    value = tokenStream.token().value;
                    this._readWhitespace();
                } else {
                    value = this._function();
                }

                return value;
            },

            _operator: function(inFunction) {

                /*
                 * operator (outside function)
                 *  : '/' S* | ',' S* | /( empty )/
                 * operator (inside function)
                 *  : '/' S* | '+' S* | '*' S* | '-' S* /( empty )/
                 *  ;
                 */

                var tokenStream = this._tokenStream,
                    token       = null;

                if (tokenStream.match([Tokens.SLASH, Tokens.COMMA]) ||
                    (inFunction && tokenStream.match([Tokens.PLUS, Tokens.STAR, Tokens.MINUS]))) {
                    token =  tokenStream.token();
                    this._readWhitespace();
                }
                return token ? PropertyValuePart.fromToken(token) : null;
            },

            _combinator: function() {

                /*
                 * combinator
                 *  : PLUS S* | GREATER S* | TILDE S* | S+
                 *  ;
                 */

                var tokenStream = this._tokenStream,
                    value       = null,
                    token;

                if (tokenStream.match([Tokens.PLUS, Tokens.GREATER, Tokens.TILDE])) {
                    token = tokenStream.token();
                    value = new Combinator(token.value, token.startLine, token.startCol);
                    this._readWhitespace();
                }

                return value;
            },

            _unary_operator: function() {

                /*
                 * unary_operator
                 *  : '-' | '+'
                 *  ;
                 */

                var tokenStream = this._tokenStream;

                if (tokenStream.match([Tokens.MINUS, Tokens.PLUS])) {
                    return tokenStream.token().value;
                } else {
                    return null;
                }
            },

            _property: function() {

                /*
                 * property
                 *   : IDENT S*
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    value       = null,
                    hack        = null,
                    tokenValue,
                    token,
                    line,
                    col;

                //check for star hack - throws error if not allowed
                if (tokenStream.peek() === Tokens.STAR && this.options.starHack) {
                    tokenStream.get();
                    token = tokenStream.token();
                    hack = token.value;
                    line = token.startLine;
                    col = token.startCol;
                }

                if (tokenStream.match(Tokens.IDENT)) {
                    token = tokenStream.token();
                    tokenValue = token.value;

                    //check for underscore hack - no error if not allowed because it's valid CSS syntax
                    if (tokenValue.charAt(0) === "_" && this.options.underscoreHack) {
                        hack = "_";
                        tokenValue = tokenValue.substring(1);
                    }

                    value = new PropertyName(tokenValue, hack, (line||token.startLine), (col||token.startCol));
                    this._readWhitespace();
                }

                return value;
            },

            //Augmented with CSS3 Selectors
            _ruleset: function() {
                /*
                 * ruleset
                 *   : selectors_group
                 *     '{' S* declaration? [ ';' S* declaration? ]* '}' S*
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    tt,
                    selectors;

                /*
                 * Error Recovery: If even a single selector fails to parse,
                 * then the entire ruleset should be thrown away.
                 */
                try {
                    selectors = this._selectors_group();
                } catch (ex) {
                    if (ex instanceof SyntaxError && !this.options.strict) {

                        //fire error event
                        this.fire({
                            type:       "error",
                            error:      ex,
                            message:    ex.message,
                            line:       ex.line,
                            col:        ex.col
                        });

                        //skip over everything until closing brace
                        tt = tokenStream.advance([Tokens.RBRACE]);
                        if (tt === Tokens.RBRACE) {
                            //if there's a right brace, the rule is finished so don't do anything
                        } else {
                            //otherwise, rethrow the error because it wasn't handled properly
                            throw ex;
                        }
                    } else {
                        //not a syntax error, rethrow it
                        throw ex;
                    }

                    //trigger parser to continue
                    return true;
                }

                //if it got here, all selectors parsed
                if (selectors) {

                    this.fire({
                        type:       "startrule",
                        selectors:  selectors,
                        line:       selectors[0].line,
                        col:        selectors[0].col
                    });

                    this._readDeclarations(true);

                    this.fire({
                        type:       "endrule",
                        selectors:  selectors,
                        line:       selectors[0].line,
                        col:        selectors[0].col
                    });
                }

                return selectors;
            },

            //CSS3 Selectors
            _selectors_group: function() {

                /*
                 * selectors_group
                 *   : selector [ COMMA S* selector ]*
                 *   ;
                 */
                var tokenStream = this._tokenStream,
                    selectors   = [],
                    selector;

                selector = this._selector();
                if (selector !== null) {

                    selectors.push(selector);
                    while (tokenStream.match(Tokens.COMMA)) {
                        this._readWhitespace();
                        selector = this._selector();
                        if (selector !== null) {
                            selectors.push(selector);
                        } else {
                            this._unexpectedToken(tokenStream.LT(1));
                        }
                    }
                }

                return selectors.length ? selectors : null;
            },

            //CSS3 Selectors
            _selector: function() {
                /*
                 * selector
                 *   : simple_selector_sequence [ combinator simple_selector_sequence ]*
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    selector    = [],
                    nextSelector = null,
                    combinator  = null,
                    ws          = null;

                //if there's no simple selector, then there's no selector
                nextSelector = this._simple_selector_sequence();
                if (nextSelector === null) {
                    return null;
                }

                selector.push(nextSelector);

                do {

                    //look for a combinator
                    combinator = this._combinator();

                    if (combinator !== null) {
                        selector.push(combinator);
                        nextSelector = this._simple_selector_sequence();

                        //there must be a next selector
                        if (nextSelector === null) {
                            this._unexpectedToken(tokenStream.LT(1));
                        } else {

                            //nextSelector is an instance of SelectorPart
                            selector.push(nextSelector);
                        }
                    } else {

                        //if there's not whitespace, we're done
                        if (this._readWhitespace()) {

                            //add whitespace separator
                            ws = new Combinator(tokenStream.token().value, tokenStream.token().startLine, tokenStream.token().startCol);

                            //combinator is not required
                            combinator = this._combinator();

                            //selector is required if there's a combinator
                            nextSelector = this._simple_selector_sequence();
                            if (nextSelector === null) {
                                if (combinator !== null) {
                                    this._unexpectedToken(tokenStream.LT(1));
                                }
                            } else {

                                if (combinator !== null) {
                                    selector.push(combinator);
                                } else {
                                    selector.push(ws);
                                }

                                selector.push(nextSelector);
                            }
                        } else {
                            break;
                        }
                    }
                } while (true);

                return new Selector(selector, selector[0].line, selector[0].col);
            },

            //CSS3 Selectors
            _simple_selector_sequence: function() {
                /*
                 * simple_selector_sequence
                 *   : [ type_selector | universal ]
                 *     [ HASH | class | attrib | pseudo | negation ]*
                 *   | [ HASH | class | attrib | pseudo | negation ]+
                 *   ;
                 */

                var tokenStream = this._tokenStream,

                    //parts of a simple selector
                    elementName = null,
                    modifiers   = [],

                    //complete selector text
                    selectorText= "",

                    //the different parts after the element name to search for
                    components  = [
                        //HASH
                        function() {
                            return tokenStream.match(Tokens.HASH) ?
                                    new SelectorSubPart(tokenStream.token().value, "id", tokenStream.token().startLine, tokenStream.token().startCol) :
                                    null;
                        },
                        this._class,
                        this._attrib,
                        this._pseudo,
                        this._negation
                    ],
                    i           = 0,
                    len         = components.length,
                    component   = null,
                    line,
                    col;

                //get starting line and column for the selector
                line = tokenStream.LT(1).startLine;
                col = tokenStream.LT(1).startCol;

                elementName = this._type_selector();
                if (!elementName) {
                    elementName = this._universal();
                }

                if (elementName !== null) {
                    selectorText += elementName;
                }

                while (true) {

                    //whitespace means we're done
                    if (tokenStream.peek() === Tokens.S) {
                        break;
                    }

                    //check for each component
                    while (i < len && component === null) {
                        component = components[i++].call(this);
                    }

                    if (component === null) {

                        //we don't have a selector
                        if (selectorText === "") {
                            return null;
                        } else {
                            break;
                        }
                    } else {
                        i = 0;
                        modifiers.push(component);
                        selectorText += component.toString();
                        component = null;
                    }
                }

                return selectorText !== "" ?
                        new SelectorPart(elementName, modifiers, selectorText, line, col) :
                        null;
            },

            //CSS3 Selectors
            _type_selector: function() {
                /*
                 * type_selector
                 *   : [ namespace_prefix ]? element_name
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    ns          = this._namespace_prefix(),
                    elementName = this._element_name();

                if (!elementName) {
                    /*
                     * Need to back out the namespace that was read due to both
                     * type_selector and universal reading namespace_prefix
                     * first. Kind of hacky, but only way I can figure out
                     * right now how to not change the grammar.
                     */
                    if (ns) {
                        tokenStream.unget();
                        if (ns.length > 1) {
                            tokenStream.unget();
                        }
                    }

                    return null;
                } else {
                    if (ns) {
                        elementName.text = ns + elementName.text;
                        elementName.col -= ns.length;
                    }
                    return elementName;
                }
            },

            //CSS3 Selectors
            _class: function() {
                /*
                 * class
                 *   : '.' IDENT
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    token;

                if (tokenStream.match(Tokens.DOT)) {
                    tokenStream.mustMatch(Tokens.IDENT);
                    token = tokenStream.token();
                    return new SelectorSubPart("." + token.value, "class", token.startLine, token.startCol - 1);
                } else {
                    return null;
                }
            },

            //CSS3 Selectors
            _element_name: function() {
                /*
                 * element_name
                 *   : IDENT
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    token;

                if (tokenStream.match(Tokens.IDENT)) {
                    token = tokenStream.token();
                    return new SelectorSubPart(token.value, "elementName", token.startLine, token.startCol);
                } else {
                    return null;
                }
            },

            //CSS3 Selectors
            _namespace_prefix: function() {
                /*
                 * namespace_prefix
                 *   : [ IDENT | '*' ]? '|'
                 *   ;
                 */
                var tokenStream = this._tokenStream,
                    value       = "";

                //verify that this is a namespace prefix
                if (tokenStream.LA(1) === Tokens.PIPE || tokenStream.LA(2) === Tokens.PIPE) {

                    if (tokenStream.match([Tokens.IDENT, Tokens.STAR])) {
                        value += tokenStream.token().value;
                    }

                    tokenStream.mustMatch(Tokens.PIPE);
                    value += "|";
                }

                return value.length ? value : null;
            },

            //CSS3 Selectors
            _universal: function() {
                /*
                 * universal
                 *   : [ namespace_prefix ]? '*'
                 *   ;
                 */
                var tokenStream = this._tokenStream,
                    value       = "",
                    ns;

                ns = this._namespace_prefix();
                if (ns) {
                    value += ns;
                }

                if (tokenStream.match(Tokens.STAR)) {
                    value += "*";
                }

                return value.length ? value : null;
            },

            //CSS3 Selectors
            _attrib: function() {
                /*
                 * attrib
                 *   : '[' S* [ namespace_prefix ]? IDENT S*
                 *         [ [ PREFIXMATCH |
                 *             SUFFIXMATCH |
                 *             SUBSTRINGMATCH |
                 *             '=' |
                 *             INCLUDES |
                 *             DASHMATCH ] S* [ IDENT | STRING ] S*
                 *         ]? ']'
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    value       = null,
                    ns,
                    token;

                if (tokenStream.match(Tokens.LBRACKET)) {
                    token = tokenStream.token();
                    value = token.value;
                    value += this._readWhitespace();

                    ns = this._namespace_prefix();

                    if (ns) {
                        value += ns;
                    }

                    tokenStream.mustMatch(Tokens.IDENT);
                    value += tokenStream.token().value;
                    value += this._readWhitespace();

                    if (tokenStream.match([Tokens.PREFIXMATCH, Tokens.SUFFIXMATCH, Tokens.SUBSTRINGMATCH,
                            Tokens.EQUALS, Tokens.INCLUDES, Tokens.DASHMATCH])) {

                        value += tokenStream.token().value;
                        value += this._readWhitespace();

                        tokenStream.mustMatch([Tokens.IDENT, Tokens.STRING]);
                        value += tokenStream.token().value;
                        value += this._readWhitespace();
                    }

                    tokenStream.mustMatch(Tokens.RBRACKET);

                    return new SelectorSubPart(value + "]", "attribute", token.startLine, token.startCol);
                } else {
                    return null;
                }
            },

            //CSS3 Selectors
            _pseudo: function() {

                /*
                 * pseudo
                 *   : ':' ':'? [ IDENT | functional_pseudo ]
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    pseudo      = null,
                    colons      = ":",
                    line,
                    col;

                if (tokenStream.match(Tokens.COLON)) {

                    if (tokenStream.match(Tokens.COLON)) {
                        colons += ":";
                    }

                    if (tokenStream.match(Tokens.IDENT)) {
                        pseudo = tokenStream.token().value;
                        line = tokenStream.token().startLine;
                        col = tokenStream.token().startCol - colons.length;
                    } else if (tokenStream.peek() === Tokens.FUNCTION) {
                        line = tokenStream.LT(1).startLine;
                        col = tokenStream.LT(1).startCol - colons.length;
                        pseudo = this._functional_pseudo();
                    }

                    if (pseudo) {
                        pseudo = new SelectorSubPart(colons + pseudo, "pseudo", line, col);
                    } else {
                        var startLine = tokenStream.LT(1).startLine,
                            startCol  = tokenStream.LT(0).startCol;
                        throw new SyntaxError("Expected a `FUNCTION` or `IDENT` after colon at line " + startLine + ", col " + startCol + ".", startLine, startCol);
                    }
                }

                return pseudo;
            },

            //CSS3 Selectors
            _functional_pseudo: function() {
                /*
                 * functional_pseudo
                 *   : FUNCTION S* expression ')'
                 *   ;
                */

                var tokenStream = this._tokenStream,
                    value = null;

                if (tokenStream.match(Tokens.FUNCTION)) {
                    value = tokenStream.token().value;
                    value += this._readWhitespace();
                    value += this._expression();
                    tokenStream.mustMatch(Tokens.RPAREN);
                    value += ")";
                }

                return value;
            },

            //CSS3 Selectors
            _expression: function() {
                /*
                 * expression
                 *   : [ [ PLUS | '-' | DIMENSION | NUMBER | STRING | IDENT ] S* ]+
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    value       = "";

                while (tokenStream.match([Tokens.PLUS, Tokens.MINUS, Tokens.DIMENSION,
                        Tokens.NUMBER, Tokens.STRING, Tokens.IDENT, Tokens.LENGTH,
                        Tokens.FREQ, Tokens.ANGLE, Tokens.TIME,
                        Tokens.RESOLUTION, Tokens.SLASH])) {

                    value += tokenStream.token().value;
                    value += this._readWhitespace();
                }

                return value.length ? value : null;
            },

            //CSS3 Selectors
            _negation: function() {
                /*
                 * negation
                 *   : NOT S* negation_arg S* ')'
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    line,
                    col,
                    value       = "",
                    arg,
                    subpart     = null;

                if (tokenStream.match(Tokens.NOT)) {
                    value = tokenStream.token().value;
                    line = tokenStream.token().startLine;
                    col = tokenStream.token().startCol;
                    value += this._readWhitespace();
                    arg = this._negation_arg();
                    value += arg;
                    value += this._readWhitespace();
                    tokenStream.match(Tokens.RPAREN);
                    value += tokenStream.token().value;

                    subpart = new SelectorSubPart(value, "not", line, col);
                    subpart.args.push(arg);
                }

                return subpart;
            },

            //CSS3 Selectors
            _negation_arg: function() {
                /*
                 * negation_arg
                 *   : type_selector | universal | HASH | class | attrib | pseudo
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    args        = [
                        this._type_selector,
                        this._universal,
                        function() {
                            return tokenStream.match(Tokens.HASH) ?
                                    new SelectorSubPart(tokenStream.token().value, "id", tokenStream.token().startLine, tokenStream.token().startCol) :
                                    null;
                        },
                        this._class,
                        this._attrib,
                        this._pseudo
                    ],
                    arg         = null,
                    i           = 0,
                    len         = args.length,
                    line,
                    col,
                    part;

                line = tokenStream.LT(1).startLine;
                col = tokenStream.LT(1).startCol;

                while (i < len && arg === null) {

                    arg = args[i].call(this);
                    i++;
                }

                //must be a negation arg
                if (arg === null) {
                    this._unexpectedToken(tokenStream.LT(1));
                }

                //it's an element name
                if (arg.type === "elementName") {
                    part = new SelectorPart(arg, [], arg.toString(), line, col);
                } else {
                    part = new SelectorPart(null, [arg], arg.toString(), line, col);
                }

                return part;
            },

            _declaration: function() {

                /*
                 * declaration
                 *   : property ':' S* expr prio?
                 *   | /( empty )/
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    property    = null,
                    expr        = null,
                    prio        = null,
                    invalid     = null,
                    propertyName= "";

                property = this._property();
                if (property !== null) {

                    tokenStream.mustMatch(Tokens.COLON);
                    this._readWhitespace();

                    expr = this._expr();

                    //if there's no parts for the value, it's an error
                    if (!expr || expr.length === 0) {
                        this._unexpectedToken(tokenStream.LT(1));
                    }

                    prio = this._prio();

                    /*
                     * If hacks should be allowed, then only check the root
                     * property. If hacks should not be allowed, treat
                     * _property or *property as invalid properties.
                     */
                    propertyName = property.toString();
                    if (this.options.starHack && property.hack === "*" ||
                            this.options.underscoreHack && property.hack === "_") {

                        propertyName = property.text;
                    }

                    try {
                        this._validateProperty(propertyName, expr);
                    } catch (ex) {
                        invalid = ex;
                    }

                    this.fire({
                        type:       "property",
                        property:   property,
                        value:      expr,
                        important:  prio,
                        line:       property.line,
                        col:        property.col,
                        invalid:    invalid
                    });

                    return true;
                } else {
                    return false;
                }
            },

            _prio: function() {
                /*
                 * prio
                 *   : IMPORTANT_SYM S*
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    result      = tokenStream.match(Tokens.IMPORTANT_SYM);

                this._readWhitespace();
                return result;
            },

            _expr: function(inFunction) {
                /*
                 * expr
                 *   : term [ operator term ]*
                 *   ;
                 */

                var values      = [],
                    //valueParts    = [],
                    value       = null,
                    operator    = null;

                value = this._term(inFunction);
                if (value !== null) {

                    values.push(value);

                    do {
                        operator = this._operator(inFunction);

                        //if there's an operator, keep building up the value parts
                        if (operator) {
                            values.push(operator);
                        } /*else {
                            //if there's not an operator, you have a full value
                            values.push(new PropertyValue(valueParts, valueParts[0].line, valueParts[0].col));
                            valueParts = [];
                        }*/

                        value = this._term(inFunction);

                        if (value === null) {
                            break;
                        } else {
                            values.push(value);
                        }
                    } while (true);
                }

                //cleanup
                /*if (valueParts.length) {
                    values.push(new PropertyValue(valueParts, valueParts[0].line, valueParts[0].col));
                }*/

                return values.length > 0 ? new PropertyValue(values, values[0].line, values[0].col) : null;
            },

            _term: function(inFunction) {

                /*
                 * term
                 *   : unary_operator?
                 *     [ NUMBER S* | PERCENTAGE S* | LENGTH S* | ANGLE S* |
                 *       TIME S* | FREQ S* | function | ie_function ]
                 *   | STRING S* | IDENT S* | URI S* | UNICODERANGE S* | hexcolor
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    unary       = null,
                    value       = null,
                    endChar     = null,
                    part        = null,
                    token,
                    line,
                    col;

                //returns the operator or null
                unary = this._unary_operator();
                if (unary !== null) {
                    line = tokenStream.token().startLine;
                    col = tokenStream.token().startCol;
                }

                //exception for IE filters
                if (tokenStream.peek() === Tokens.IE_FUNCTION && this.options.ieFilters) {

                    value = this._ie_function();
                    if (unary === null) {
                        line = tokenStream.token().startLine;
                        col = tokenStream.token().startCol;
                    }

                //see if it's a simple block
                } else if (inFunction && tokenStream.match([Tokens.LPAREN, Tokens.LBRACE, Tokens.LBRACKET])) {

                    token = tokenStream.token();
                    endChar = token.endChar;
                    value = token.value + this._expr(inFunction).text;
                    if (unary === null) {
                        line = tokenStream.token().startLine;
                        col = tokenStream.token().startCol;
                    }
                    tokenStream.mustMatch(Tokens.type(endChar));
                    value += endChar;
                    this._readWhitespace();

                //see if there's a simple match
                } else if (tokenStream.match([Tokens.NUMBER, Tokens.PERCENTAGE, Tokens.LENGTH,
                        Tokens.ANGLE, Tokens.TIME,
                        Tokens.FREQ, Tokens.STRING, Tokens.IDENT, Tokens.URI, Tokens.UNICODE_RANGE])) {

                    value = tokenStream.token().value;
                    if (unary === null) {
                        line = tokenStream.token().startLine;
                        col = tokenStream.token().startCol;
                        // Correct potentially-inaccurate IDENT parsing in
                        // PropertyValuePart constructor.
                        part = PropertyValuePart.fromToken(tokenStream.token());
                    }
                    this._readWhitespace();
                } else {

                    //see if it's a color
                    token = this._hexcolor();
                    if (token === null) {

                        //if there's no unary, get the start of the next token for line/col info
                        if (unary === null) {
                            line = tokenStream.LT(1).startLine;
                            col = tokenStream.LT(1).startCol;
                        }

                        //has to be a function
                        if (value === null) {

                            /*
                             * This checks for alpha(opacity=0) style of IE
                             * functions. IE_FUNCTION only presents progid: style.
                             */
                            if (tokenStream.LA(3) === Tokens.EQUALS && this.options.ieFilters) {
                                value = this._ie_function();
                            } else {
                                value = this._function();
                            }
                        }

                        /*if (value === null) {
                            return null;
                            //throw new Error("Expected identifier at line " + tokenStream.token().startLine + ", character " +  tokenStream.token().startCol + ".");
                        }*/
                    } else {
                        value = token.value;
                        if (unary === null) {
                            line = token.startLine;
                            col = token.startCol;
                        }
                    }
                }

                return part !== null ? part : value !== null ?
                        new PropertyValuePart(unary !== null ? unary + value : value, line, col) :
                        null;
            },

            _function: function() {

                /*
                 * function
                 *   : FUNCTION S* expr ')' S*
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    functionText = null,
                    expr        = null,
                    lt;

                if (tokenStream.match(Tokens.FUNCTION)) {
                    functionText = tokenStream.token().value;
                    this._readWhitespace();
                    expr = this._expr(true);
                    functionText += expr;

                    //START: Horrible hack in case it's an IE filter
                    if (this.options.ieFilters && tokenStream.peek() === Tokens.EQUALS) {
                        do {

                            if (this._readWhitespace()) {
                                functionText += tokenStream.token().value;
                            }

                            //might be second time in the loop
                            if (tokenStream.LA(0) === Tokens.COMMA) {
                                functionText += tokenStream.token().value;
                            }

                            tokenStream.match(Tokens.IDENT);
                            functionText += tokenStream.token().value;

                            tokenStream.match(Tokens.EQUALS);
                            functionText += tokenStream.token().value;

                            //functionText += this._term();
                            lt = tokenStream.peek();
                            while (lt !== Tokens.COMMA && lt !== Tokens.S && lt !== Tokens.RPAREN) {
                                tokenStream.get();
                                functionText += tokenStream.token().value;
                                lt = tokenStream.peek();
                            }
                        } while (tokenStream.match([Tokens.COMMA, Tokens.S]));
                    }

                    //END: Horrible Hack

                    tokenStream.match(Tokens.RPAREN);
                    functionText += ")";
                    this._readWhitespace();
                }

                return functionText;
            },

            _ie_function: function() {

                /* (My own extension)
                 * ie_function
                 *   : IE_FUNCTION S* IDENT '=' term [S* ','? IDENT '=' term]+ ')' S*
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    functionText = null,
                    lt;

                //IE function can begin like a regular function, too
                if (tokenStream.match([Tokens.IE_FUNCTION, Tokens.FUNCTION])) {
                    functionText = tokenStream.token().value;

                    do {

                        if (this._readWhitespace()) {
                            functionText += tokenStream.token().value;
                        }

                        //might be second time in the loop
                        if (tokenStream.LA(0) === Tokens.COMMA) {
                            functionText += tokenStream.token().value;
                        }

                        tokenStream.match(Tokens.IDENT);
                        functionText += tokenStream.token().value;

                        tokenStream.match(Tokens.EQUALS);
                        functionText += tokenStream.token().value;

                        //functionText += this._term();
                        lt = tokenStream.peek();
                        while (lt !== Tokens.COMMA && lt !== Tokens.S && lt !== Tokens.RPAREN) {
                            tokenStream.get();
                            functionText += tokenStream.token().value;
                            lt = tokenStream.peek();
                        }
                    } while (tokenStream.match([Tokens.COMMA, Tokens.S]));

                    tokenStream.match(Tokens.RPAREN);
                    functionText += ")";
                    this._readWhitespace();
                }

                return functionText;
            },

            _hexcolor: function() {
                /*
                 * There is a constraint on the color that it must
                 * have either 3 or 6 hex-digits (i.e., [0-9a-fA-F])
                 * after the "#"; e.g., "#000" is OK, but "#abcd" is not.
                 *
                 * hexcolor
                 *   : HASH S*
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    token = null,
                    color;

                if (tokenStream.match(Tokens.HASH)) {

                    //need to do some validation here

                    token = tokenStream.token();
                    color = token.value;
                    if (!/#[a-f0-9]{3,6}/i.test(color)) {
                        throw new SyntaxError("Expected a hex color but found '" + color + "' at line " + token.startLine + ", col " + token.startCol + ".", token.startLine, token.startCol);
                    }
                    this._readWhitespace();
                }

                return token;
            },

            //-----------------------------------------------------------------
            // Animations methods
            //-----------------------------------------------------------------

            _keyframes: function() {

                /*
                 * keyframes:
                 *   : KEYFRAMES_SYM S* keyframe_name S* '{' S* keyframe_rule* '}' {
                 *   ;
                 */
                var tokenStream = this._tokenStream,
                    token,
                    tt,
                    name,
                    prefix = "";

                tokenStream.mustMatch(Tokens.KEYFRAMES_SYM);
                token = tokenStream.token();
                if (/^@\-([^\-]+)\-/.test(token.value)) {
                    prefix = RegExp.$1;
                }

                this._readWhitespace();
                name = this._keyframe_name();

                this._readWhitespace();
                tokenStream.mustMatch(Tokens.LBRACE);

                this.fire({
                    type:   "startkeyframes",
                    name:   name,
                    prefix: prefix,
                    line:   token.startLine,
                    col:    token.startCol
                });

                this._readWhitespace();
                tt = tokenStream.peek();

                //check for key
                while (tt === Tokens.IDENT || tt === Tokens.PERCENTAGE) {
                    this._keyframe_rule();
                    this._readWhitespace();
                    tt = tokenStream.peek();
                }

                this.fire({
                    type:   "endkeyframes",
                    name:   name,
                    prefix: prefix,
                    line:   token.startLine,
                    col:    token.startCol
                });

                this._readWhitespace();
                tokenStream.mustMatch(Tokens.RBRACE);
                this._readWhitespace();
            },

            _keyframe_name: function() {

                /*
                 * keyframe_name:
                 *   : IDENT
                 *   | STRING
                 *   ;
                 */
                var tokenStream = this._tokenStream;

                tokenStream.mustMatch([Tokens.IDENT, Tokens.STRING]);
                return SyntaxUnit.fromToken(tokenStream.token());
            },

            _keyframe_rule: function() {

                /*
                 * keyframe_rule:
                 *   : key_list S*
                 *     '{' S* declaration [ ';' S* declaration ]* '}' S*
                 *   ;
                 */
                var keyList = this._key_list();

                this.fire({
                    type:   "startkeyframerule",
                    keys:   keyList,
                    line:   keyList[0].line,
                    col:    keyList[0].col
                });

                this._readDeclarations(true);

                this.fire({
                    type:   "endkeyframerule",
                    keys:   keyList,
                    line:   keyList[0].line,
                    col:    keyList[0].col
                });
            },

            _key_list: function() {

                /*
                 * key_list:
                 *   : key [ S* ',' S* key]*
                 *   ;
                 */
                var tokenStream = this._tokenStream,
                    keyList = [];

                //must be least one key
                keyList.push(this._key());

                this._readWhitespace();

                while (tokenStream.match(Tokens.COMMA)) {
                    this._readWhitespace();
                    keyList.push(this._key());
                    this._readWhitespace();
                }

                return keyList;
            },

            _key: function() {
                /*
                 * There is a restriction that IDENT can be only "from" or "to".
                 *
                 * key
                 *   : PERCENTAGE
                 *   | IDENT
                 *   ;
                 */

                var tokenStream = this._tokenStream,
                    token;

                if (tokenStream.match(Tokens.PERCENTAGE)) {
                    return SyntaxUnit.fromToken(tokenStream.token());
                } else if (tokenStream.match(Tokens.IDENT)) {
                    token = tokenStream.token();

                    if (/from|to/i.test(token.value)) {
                        return SyntaxUnit.fromToken(token);
                    }

                    tokenStream.unget();
                }

                //if it gets here, there wasn't a valid token, so time to explode
                this._unexpectedToken(tokenStream.LT(1));
            },

            //-----------------------------------------------------------------
            // Helper methods
            //-----------------------------------------------------------------

            /**
             * Not part of CSS grammar, but useful for skipping over
             * combination of white space and HTML-style comments.
             * @return {void}
             * @method _skipCruft
             * @private
             */
            _skipCruft: function() {
                while (this._tokenStream.match([Tokens.S, Tokens.CDO, Tokens.CDC])) {
                    //noop
                }
            },

            /**
             * Not part of CSS grammar, but this pattern occurs frequently
             * in the official CSS grammar. Split out here to eliminate
             * duplicate code.
             * @param {Boolean} checkStart Indicates if the rule should check
             *      for the left brace at the beginning.
             * @param {Boolean} readMargins Indicates if the rule should check
             *      for margin patterns.
             * @return {void}
             * @method _readDeclarations
             * @private
             */
            _readDeclarations: function(checkStart, readMargins) {
                /*
                 * Reads the pattern
                 * S* '{' S* declaration [ ';' S* declaration ]* '}' S*
                 * or
                 * S* '{' S* [ declaration | margin ]? [ ';' S* [ declaration | margin ]? ]* '}' S*
                 * Note that this is how it is described in CSS3 Paged Media, but is actually incorrect.
                 * A semicolon is only necessary following a declaration if there's another declaration
                 * or margin afterwards.
                 */
                var tokenStream = this._tokenStream,
                    tt;

                this._readWhitespace();

                if (checkStart) {
                    tokenStream.mustMatch(Tokens.LBRACE);
                }

                this._readWhitespace();

                try {

                    while (true) {

                        if (tokenStream.match(Tokens.SEMICOLON) || (readMargins && this._margin())) {
                            //noop
                        } else if (this._declaration()) {
                            if (!tokenStream.match(Tokens.SEMICOLON)) {
                                break;
                            }
                        } else {
                            break;
                        }

                        //if ((!this._margin() && !this._declaration()) || !tokenStream.match(Tokens.SEMICOLON)){
                        //    break;
                        //}
                        this._readWhitespace();
                    }

                    tokenStream.mustMatch(Tokens.RBRACE);
                    this._readWhitespace();
                } catch (ex) {
                    if (ex instanceof SyntaxError && !this.options.strict) {

                        //fire error event
                        this.fire({
                            type:       "error",
                            error:      ex,
                            message:    ex.message,
                            line:       ex.line,
                            col:        ex.col
                        });

                        //see if there's another declaration
                        tt = tokenStream.advance([Tokens.SEMICOLON, Tokens.RBRACE]);
                        if (tt === Tokens.SEMICOLON) {
                            //if there's a semicolon, then there might be another declaration
                            this._readDeclarations(false, readMargins);
                        } else if (tt !== Tokens.RBRACE) {
                            //if there's a right brace, the rule is finished so don't do anything
                            //otherwise, rethrow the error because it wasn't handled properly
                            throw ex;
                        }
                    } else {
                        //not a syntax error, rethrow it
                        throw ex;
                    }
                }
            },

            /**
             * In some cases, you can end up with two white space tokens in a
             * row. Instead of making a change in every function that looks for
             * white space, this function is used to match as much white space
             * as necessary.
             * @method _readWhitespace
             * @return {String} The white space if found, empty string if not.
             * @private
             */
            _readWhitespace: function() {

                var tokenStream = this._tokenStream,
                    ws = "";

                while (tokenStream.match(Tokens.S)) {
                    ws += tokenStream.token().value;
                }

                return ws;
            },

            /**
             * Throws an error when an unexpected token is found.
             * @param {Object} token The token that was found.
             * @method _unexpectedToken
             * @return {void}
             * @private
             */
            _unexpectedToken: function(token) {
                throw new SyntaxError("Unexpected token '" + token.value + "' at line " + token.startLine + ", col " + token.startCol + ".", token.startLine, token.startCol);
            },

            /**
             * Helper method used for parsing subparts of a style sheet.
             * @return {void}
             * @method _verifyEnd
             * @private
             */
            _verifyEnd: function() {
                if (this._tokenStream.LA(1) !== Tokens.EOF) {
                    this._unexpectedToken(this._tokenStream.LT(1));
                }
            },

            //-----------------------------------------------------------------
            // Validation methods
            //-----------------------------------------------------------------
            _validateProperty: function(property, value) {
                Validation.validate(property, value);
            },

            //-----------------------------------------------------------------
            // Parsing methods
            //-----------------------------------------------------------------

            parse: function(input) {
                this._tokenStream = new TokenStream(input, Tokens);
                this._stylesheet();
            },

            parseStyleSheet: function(input) {
                //just passthrough
                return this.parse(input);
            },

            parseMediaQuery: function(input) {
                this._tokenStream = new TokenStream(input, Tokens);
                var result = this._media_query();

                //if there's anything more, then it's an invalid selector
                this._verifyEnd();

                //otherwise return result
                return result;
            },

            /**
             * Parses a property value (everything after the semicolon).
             * @return {parserlib.css.PropertyValue} The property value.
             * @throws parserlib.util.SyntaxError If an unexpected token is found.
             * @method parserPropertyValue
             */
            parsePropertyValue: function(input) {

                this._tokenStream = new TokenStream(input, Tokens);
                this._readWhitespace();

                var result = this._expr();

                //okay to have a trailing white space
                this._readWhitespace();

                //if there's anything more, then it's an invalid selector
                this._verifyEnd();

                //otherwise return result
                return result;
            },

            /**
             * Parses a complete CSS rule, including selectors and
             * properties.
             * @param {String} input The text to parser.
             * @return {Boolean} True if the parse completed successfully, false if not.
             * @method parseRule
             */
            parseRule: function(input) {
                this._tokenStream = new TokenStream(input, Tokens);

                //skip any leading white space
                this._readWhitespace();

                var result = this._ruleset();

                //skip any trailing white space
                this._readWhitespace();

                //if there's anything more, then it's an invalid selector
                this._verifyEnd();

                //otherwise return result
                return result;
            },

            /**
             * Parses a single CSS selector (no comma)
             * @param {String} input The text to parse as a CSS selector.
             * @return {Selector} An object representing the selector.
             * @throws parserlib.util.SyntaxError If an unexpected token is found.
             * @method parseSelector
             */
            parseSelector: function(input) {

                this._tokenStream = new TokenStream(input, Tokens);

                //skip any leading white space
                this._readWhitespace();

                var result = this._selector();

                //skip any trailing white space
                this._readWhitespace();

                //if there's anything more, then it's an invalid selector
                this._verifyEnd();

                //otherwise return result
                return result;
            },

            /**
             * Parses an HTML style attribute: a set of CSS declarations
             * separated by semicolons.
             * @param {String} input The text to parse as a style attribute
             * @return {void}
             * @method parseStyleAttribute
             */
            parseStyleAttribute: function(input) {
                input += "}"; // for error recovery in _readDeclarations()
                this._tokenStream = new TokenStream(input, Tokens);
                this._readDeclarations();
            }
        };

    //copy over onto prototype
    for (prop in additions) {
        if (Object.prototype.hasOwnProperty.call(additions, prop)) {
            proto[prop] = additions[prop];
        }
    }

    return proto;
}();

/*
nth
  : S* [ ['-'|'+']? INTEGER? {N} [ S* ['-'|'+'] S* INTEGER ]? |
         ['-'|'+']? INTEGER | {O}{D}{D} | {E}{V}{E}{N} ] S*
  ;
*/
},{"../util/EventTarget":23,"../util/SyntaxError":25,"../util/SyntaxUnit":26,"./Combinator":2,"./MediaFeature":4,"./MediaQuery":5,"./PropertyName":8,"./PropertyValue":9,"./PropertyValuePart":11,"./Selector":13,"./SelectorPart":14,"./SelectorSubPart":15,"./TokenStream":17,"./Tokens":18,"./Validation":19}],7:[function(require,module,exports){
"use strict";

/* exported Properties */

var Properties = module.exports = {
    __proto__: null,

    //A
    "align-items"                   : "flex-start | flex-end | center | baseline | stretch",
    "align-content"                 : "flex-start | flex-end | center | space-between | space-around | stretch",
    "align-self"                    : "auto | flex-start | flex-end | center | baseline | stretch",
    "all"                           : "initial | inherit | unset",
    "-webkit-align-items"           : "flex-start | flex-end | center | baseline | stretch",
    "-webkit-align-content"         : "flex-start | flex-end | center | space-between | space-around | stretch",
    "-webkit-align-self"            : "auto | flex-start | flex-end | center | baseline | stretch",
    "alignment-adjust"              : "auto | baseline | before-edge | text-before-edge | middle | central | after-edge | text-after-edge | ideographic | alphabetic | hanging | mathematical | <percentage> | <length>",
    "alignment-baseline"            : "auto | baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical",
    "animation"                     : 1,
    "animation-delay"               : "<time>#",
    "animation-direction"           : "<single-animation-direction>#",
    "animation-duration"            : "<time>#",
    "animation-fill-mode"           : "[ none | forwards | backwards | both ]#",
    "animation-iteration-count"     : "[ <number> | infinite ]#",
    "animation-name"                : "[ none | <single-animation-name> ]#",
    "animation-play-state"          : "[ running | paused ]#",
    "animation-timing-function"     : 1,

    //vendor prefixed
    "-moz-animation-delay"               : "<time>#",
    "-moz-animation-direction"           : "[ normal | alternate ]#",
    "-moz-animation-duration"            : "<time>#",
    "-moz-animation-iteration-count"     : "[ <number> | infinite ]#",
    "-moz-animation-name"                : "[ none | <single-animation-name> ]#",
    "-moz-animation-play-state"          : "[ running | paused ]#",

    "-ms-animation-delay"               : "<time>#",
    "-ms-animation-direction"           : "[ normal | alternate ]#",
    "-ms-animation-duration"            : "<time>#",
    "-ms-animation-iteration-count"     : "[ <number> | infinite ]#",
    "-ms-animation-name"                : "[ none | <single-animation-name> ]#",
    "-ms-animation-play-state"          : "[ running | paused ]#",

    "-webkit-animation-delay"               : "<time>#",
    "-webkit-animation-direction"           : "[ normal | alternate ]#",
    "-webkit-animation-duration"            : "<time>#",
    "-webkit-animation-fill-mode"           : "[ none | forwards | backwards | both ]#",
    "-webkit-animation-iteration-count"     : "[ <number> | infinite ]#",
    "-webkit-animation-name"                : "[ none | <single-animation-name> ]#",
    "-webkit-animation-play-state"          : "[ running | paused ]#",

    "-o-animation-delay"               : "<time>#",
    "-o-animation-direction"           : "[ normal | alternate ]#",
    "-o-animation-duration"            : "<time>#",
    "-o-animation-iteration-count"     : "[ <number> | infinite ]#",
    "-o-animation-name"                : "[ none | <single-animation-name> ]#",
    "-o-animation-play-state"          : "[ running | paused ]#",

    "appearance"                    : "none | auto",
    "-moz-appearance"               : "none | button | button-arrow-down | button-arrow-next | button-arrow-previous | button-arrow-up | button-bevel | button-focus | caret | checkbox | checkbox-container | checkbox-label | checkmenuitem | dualbutton | groupbox | listbox | listitem | menuarrow | menubar | menucheckbox | menuimage | menuitem | menuitemtext | menulist | menulist-button | menulist-text | menulist-textfield | menupopup | menuradio | menuseparator | meterbar | meterchunk | progressbar | progressbar-vertical | progresschunk | progresschunk-vertical | radio | radio-container | radio-label | radiomenuitem | range | range-thumb | resizer | resizerpanel | scale-horizontal | scalethumbend | scalethumb-horizontal | scalethumbstart | scalethumbtick | scalethumb-vertical | scale-vertical | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | separator | sheet | spinner | spinner-downbutton | spinner-textfield | spinner-upbutton | splitter | statusbar | statusbarpanel | tab | tabpanel | tabpanels | tab-scroll-arrow-back | tab-scroll-arrow-forward | textfield | textfield-multiline | toolbar | toolbarbutton | toolbarbutton-dropdown | toolbargripper | toolbox | tooltip | treeheader | treeheadercell | treeheadersortarrow | treeitem | treeline | treetwisty | treetwistyopen | treeview | -moz-mac-unified-toolbar | -moz-win-borderless-glass | -moz-win-browsertabbar-toolbox | -moz-win-communicationstext | -moz-win-communications-toolbox | -moz-win-exclude-glass | -moz-win-glass | -moz-win-mediatext | -moz-win-media-toolbox | -moz-window-button-box | -moz-window-button-box-maximized | -moz-window-button-close | -moz-window-button-maximize | -moz-window-button-minimize | -moz-window-button-restore | -moz-window-frame-bottom | -moz-window-frame-left | -moz-window-frame-right | -moz-window-titlebar | -moz-window-titlebar-maximized",
    "-ms-appearance"                : "none | icon | window | desktop | workspace | document | tooltip | dialog | button | push-button | hyperlink | radio | radio-button | checkbox | menu-item | tab | menu | menubar | pull-down-menu | pop-up-menu | list-menu | radio-group | checkbox-group | outline-tree | range | field | combo-box | signature | password | normal",
    "-webkit-appearance"            : "none | button | button-bevel | caps-lock-indicator | caret | checkbox | default-button | listbox | listitem | media-fullscreen-button | media-mute-button | media-play-button | media-seek-back-button | media-seek-forward-button | media-slider | media-sliderthumb | menulist | menulist-button | menulist-text | menulist-textfield | push-button | radio | searchfield | searchfield-cancel-button | searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical | square-button | textarea | textfield | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbargripper-horizontal | scrollbargripper-vertical | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical",
    "-o-appearance"                 : "none | window | desktop | workspace | document | tooltip | dialog | button | push-button | hyperlink | radio | radio-button | checkbox | menu-item | tab | menu | menubar | pull-down-menu | pop-up-menu | list-menu | radio-group | checkbox-group | outline-tree | range | field | combo-box | signature | password | normal",

    "azimuth"                       : "<azimuth>",

    //B
    "backface-visibility"           : "visible | hidden",
    "background"                    : 1,
    "background-attachment"         : "<attachment>#",
    "background-clip"               : "<box>#",
    "background-color"              : "<color>",
    "background-image"              : "<bg-image>#",
    "background-origin"             : "<box>#",
    "background-position"           : "<bg-position>",
    "background-repeat"             : "<repeat-style>#",
    "background-size"               : "<bg-size>#",
    "baseline-shift"                : "baseline | sub | super | <percentage> | <length>",
    "behavior"                      : 1,
    "binding"                       : 1,
    "bleed"                         : "<length>",
    "bookmark-label"                : "<content> | <attr> | <string>",
    "bookmark-level"                : "none | <integer>",
    "bookmark-state"                : "open | closed",
    "bookmark-target"               : "none | <uri> | <attr>",
    "border"                        : "<border-width> || <border-style> || <color>",
    "border-bottom"                 : "<border-width> || <border-style> || <color>",
    "border-bottom-color"           : "<color>",
    "border-bottom-left-radius"     :  "<x-one-radius>",
    "border-bottom-right-radius"    :  "<x-one-radius>",
    "border-bottom-style"           : "<border-style>",
    "border-bottom-width"           : "<border-width>",
    "border-collapse"               : "collapse | separate",
    "border-color"                  : "<color>{1,4}",
    "border-image"                  : 1,
    "border-image-outset"           : "[ <length> | <number> ]{1,4}",
    "border-image-repeat"           : "[ stretch | repeat | round ]{1,2}",
    "border-image-slice"            : "<border-image-slice>",
    "border-image-source"           : "<image> | none",
    "border-image-width"            : "[ <length> | <percentage> | <number> | auto ]{1,4}",
    "border-left"                   : "<border-width> || <border-style> || <color>",
    "border-left-color"             : "<color>",
    "border-left-style"             : "<border-style>",
    "border-left-width"             : "<border-width>",
    "border-radius"                 : "<border-radius>",
    "border-right"                  : "<border-width> || <border-style> || <color>",
    "border-right-color"            : "<color>",
    "border-right-style"            : "<border-style>",
    "border-right-width"            : "<border-width>",
    "border-spacing"                : "<length>{1,2}",
    "border-style"                  : "<border-style>{1,4}",
    "border-top"                    : "<border-width> || <border-style> || <color>",
    "border-top-color"              : "<color>",
    "border-top-left-radius"        : "<x-one-radius>",
    "border-top-right-radius"       : "<x-one-radius>",
    "border-top-style"              : "<border-style>",
    "border-top-width"              : "<border-width>",
    "border-width"                  : "<border-width>{1,4}",
    "bottom"                        : "<margin-width>",
    "-moz-box-align"                : "start | end | center | baseline | stretch",
    "-moz-box-decoration-break"     : "slice | clone",
    "-moz-box-direction"            : "normal | reverse",
    "-moz-box-flex"                 : "<number>",
    "-moz-box-flex-group"           : "<integer>",
    "-moz-box-lines"                : "single | multiple",
    "-moz-box-ordinal-group"        : "<integer>",
    "-moz-box-orient"               : "horizontal | vertical | inline-axis | block-axis",
    "-moz-box-pack"                 : "start | end | center | justify",
    "-o-box-decoration-break"       : "slice | clone",
    "-webkit-box-align"             : "start | end | center | baseline | stretch",
    "-webkit-box-decoration-break"  : "slice | clone",
    "-webkit-box-direction"         : "normal | reverse",
    "-webkit-box-flex"              : "<number>",
    "-webkit-box-flex-group"        : "<integer>",
    "-webkit-box-lines"             : "single | multiple",
    "-webkit-box-ordinal-group"     : "<integer>",
    "-webkit-box-orient"            : "horizontal | vertical | inline-axis | block-axis",
    "-webkit-box-pack"              : "start | end | center | justify",
    "box-decoration-break"          : "slice | clone",
    "box-shadow"                    : "<box-shadow>",
    "box-sizing"                    : "content-box | border-box",
    "break-after"                   : "auto | always | avoid | left | right | page | column | avoid-page | avoid-column",
    "break-before"                  : "auto | always | avoid | left | right | page | column | avoid-page | avoid-column",
    "break-inside"                  : "auto | avoid | avoid-page | avoid-column",

    //C
    "caption-side"                  : "top | bottom",
    "clear"                         : "none | right | left | both",
    "clip"                          : "<shape> | auto",
    "-webkit-clip-path"             : "<clip-source> | <clip-path> | none",
    "clip-path"                     : "<clip-source> | <clip-path> | none",
    "clip-rule"                     : "nonzero | evenodd",
    "color"                         : "<color>",
    "color-interpolation"           : "auto | sRGB | linearRGB",
    "color-interpolation-filters"   : "auto | sRGB | linearRGB",
    "color-profile"                 : 1,
    "color-rendering"               : "auto | optimizeSpeed | optimizeQuality",
    "column-count"                  : "<integer> | auto",                      //https://www.w3.org/TR/css3-multicol/
    "column-fill"                   : "auto | balance",
    "column-gap"                    : "<length> | normal",
    "column-rule"                   : "<border-width> || <border-style> || <color>",
    "column-rule-color"             : "<color>",
    "column-rule-style"             : "<border-style>",
    "column-rule-width"             : "<border-width>",
    "column-span"                   : "none | all",
    "column-width"                  : "<length> | auto",
    "columns"                       : 1,
    "content"                       : 1,
    "counter-increment"             : 1,
    "counter-reset"                 : 1,
    "crop"                          : "<shape> | auto",
    "cue"                           : "cue-after | cue-before",
    "cue-after"                     : 1,
    "cue-before"                    : 1,
    "cursor"                        : 1,

    //D
    "direction"                     : "ltr | rtl",
    "display"                       : "inline | block | list-item | inline-block | table | inline-table | table-row-group | table-header-group | table-footer-group | table-row | table-column-group | table-column | table-cell | table-caption | grid | inline-grid | run-in | ruby | ruby-base | ruby-text | ruby-base-container | ruby-text-container | contents | none | -moz-box | -moz-inline-block | -moz-inline-box | -moz-inline-grid | -moz-inline-stack | -moz-inline-table | -moz-grid | -moz-grid-group | -moz-grid-line | -moz-groupbox | -moz-deck | -moz-popup | -moz-stack | -moz-marker | -webkit-box | -webkit-inline-box | -ms-flexbox | -ms-inline-flexbox | flex | -webkit-flex | inline-flex | -webkit-inline-flex",
    "dominant-baseline"             : "auto | use-script | no-change | reset-size | ideographic | alphabetic | hanging | mathematical | central | middle | text-after-edge | text-before-edge",
    "drop-initial-after-adjust"     : "central | middle | after-edge | text-after-edge | ideographic | alphabetic | mathematical | <percentage> | <length>",
    "drop-initial-after-align"      : "baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical",
    "drop-initial-before-adjust"    : "before-edge | text-before-edge | central | middle | hanging | mathematical | <percentage> | <length>",
    "drop-initial-before-align"     : "caps-height | baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical",
    "drop-initial-size"             : "auto | line | <length> | <percentage>",
    "drop-initial-value"            : "<integer>",

    //E
    "elevation"                     : "<angle> | below | level | above | higher | lower",
    "empty-cells"                   : "show | hide",
    "enable-background"             : 1,

    //F
    "fill"                          : "<paint>",
    "fill-opacity"                  : "<opacity-value>",
    "fill-rule"                     : "nonzero | evenodd",
    "filter"                        : "<filter-function-list> | none",
    "fit"                           : "fill | hidden | meet | slice",
    "fit-position"                  : 1,
    "flex"                          : "<flex>",
    "flex-basis"                    : "<width>",
    "flex-direction"                : "row | row-reverse | column | column-reverse",
    "flex-flow"                     : "<flex-direction> || <flex-wrap>",
    "flex-grow"                     : "<number>",
    "flex-shrink"                   : "<number>",
    "flex-wrap"                     : "nowrap | wrap | wrap-reverse",
    "-webkit-flex"                  : "<flex>",
    "-webkit-flex-basis"            : "<width>",
    "-webkit-flex-direction"        : "row | row-reverse | column | column-reverse",
    "-webkit-flex-flow"             : "<flex-direction> || <flex-wrap>",
    "-webkit-flex-grow"             : "<number>",
    "-webkit-flex-shrink"           : "<number>",
    "-webkit-flex-wrap"             : "nowrap | wrap | wrap-reverse",
    "-ms-flex"                      : "<flex>",
    "-ms-flex-align"                : "start | end | center | stretch | baseline",
    "-ms-flex-direction"            : "row | row-reverse | column | column-reverse",
    "-ms-flex-order"                : "<number>",
    "-ms-flex-pack"                 : "start | end | center | justify",
    "-ms-flex-wrap"                 : "nowrap | wrap | wrap-reverse",
    "float"                         : "left | right | none",
    "float-offset"                  : 1,
    "flood-color"                   : 1,
    "flood-opacity"                 : "<opacity-value>",
    "font"                          : "<font-shorthand> | caption | icon | menu | message-box | small-caption | status-bar",
    "font-family"                   : "<font-family>",
    "font-feature-settings"         : "<feature-tag-value> | normal",
    "font-kerning"                  : "auto | normal | none",
    "font-size"                     : "<font-size>",
    "font-size-adjust"              : "<number> | none",
    "font-stretch"                  : "<font-stretch>",
    "font-style"                    : "<font-style>",
    "font-variant"                  : "<font-variant> | normal | none",
    "font-variant-alternates"       : "<font-variant-alternates> | normal",
    "font-variant-caps"             : "<font-variant-caps> | normal",
    "font-variant-east-asian"       : "<font-variant-east-asian> | normal",
    "font-variant-ligatures"        : "<font-variant-ligatures> | normal | none",
    "font-variant-numeric"          : "<font-variant-numeric> | normal",
    "font-variant-position"         : "normal | sub | super",
    "font-weight"                   : "<font-weight>",

    //G
    "glyph-orientation-horizontal"  : "<glyph-angle>",
    "glyph-orientation-vertical"    : "auto | <glyph-angle>",
    "grid"                          : 1,
    "grid-area"                     : 1,
    "grid-auto-columns"             : 1,
    "grid-auto-flow"                : 1,
    "grid-auto-position"            : 1,
    "grid-auto-rows"                : 1,
    "grid-cell-stacking"            : "columns | rows | layer",
    "grid-column"                   : 1,
    "grid-columns"                  : 1,
    "grid-column-align"             : "start | end | center | stretch",
    "grid-column-sizing"            : 1,
    "grid-column-start"             : 1,
    "grid-column-end"               : 1,
    "grid-column-span"              : "<integer>",
    "grid-flow"                     : "none | rows | columns",
    "grid-layer"                    : "<integer>",
    "grid-row"                      : 1,
    "grid-rows"                     : 1,
    "grid-row-align"                : "start | end | center | stretch",
    "grid-row-start"                : 1,
    "grid-row-end"                  : 1,
    "grid-row-span"                 : "<integer>",
    "grid-row-sizing"               : 1,
    "grid-template"                 : 1,
    "grid-template-areas"           : 1,
    "grid-template-columns"         : 1,
    "grid-template-rows"            : 1,

    //H
    "hanging-punctuation"           : 1,
    "height"                        : "<margin-width> | <content-sizing>",
    "hyphenate-after"               : "<integer> | auto",
    "hyphenate-before"              : "<integer> | auto",
    "hyphenate-character"           : "<string> | auto",
    "hyphenate-lines"               : "no-limit | <integer>",
    "hyphenate-resource"            : 1,
    "hyphens"                       : "none | manual | auto",

    //I
    "icon"                          : 1,
    "image-orientation"             : "angle | auto",
    "image-rendering"               : "auto | optimizeSpeed | optimizeQuality",
    "image-resolution"              : 1,
    "ime-mode"                      : "auto | normal | active | inactive | disabled",
    "inline-box-align"              : "last | <integer>",

    //J
    "justify-content"               : "flex-start | flex-end | center | space-between | space-around",
    "-webkit-justify-content"       : "flex-start | flex-end | center | space-between | space-around",

    //K
    "kerning"                       : "auto | <length>",

    //L
    "left"                          : "<margin-width>",
    "letter-spacing"                : "<length> | normal",
    "line-height"                   : "<line-height>",
    "line-break"                    : "auto | loose | normal | strict",
    "line-stacking"                 : 1,
    "line-stacking-ruby"            : "exclude-ruby | include-ruby",
    "line-stacking-shift"           : "consider-shifts | disregard-shifts",
    "line-stacking-strategy"        : "inline-line-height | block-line-height | max-height | grid-height",
    "list-style"                    : 1,
    "list-style-image"              : "<uri> | none",
    "list-style-position"           : "inside | outside",
    "list-style-type"               : "disc | circle | square | decimal | decimal-leading-zero | lower-roman | upper-roman | lower-greek | lower-latin | upper-latin | armenian | georgian | lower-alpha | upper-alpha | none",

    //M
    "margin"                        : "<margin-width>{1,4}",
    "margin-bottom"                 : "<margin-width>",
    "margin-left"                   : "<margin-width>",
    "margin-right"                  : "<margin-width>",
    "margin-top"                    : "<margin-width>",
    "mark"                          : 1,
    "mark-after"                    : 1,
    "mark-before"                   : 1,
    "marker"                        : 1,
    "marker-end"                    : 1,
    "marker-mid"                    : 1,
    "marker-start"                  : 1,
    "marks"                         : 1,
    "marquee-direction"             : 1,
    "marquee-play-count"            : 1,
    "marquee-speed"                 : 1,
    "marquee-style"                 : 1,
    "mask"                          : 1,
    "max-height"                    : "<length> | <percentage> | <content-sizing> | none",
    "max-width"                     : "<length> | <percentage> | <content-sizing> | none",
    "min-height"                    : "<length> | <percentage> | <content-sizing> | contain-floats | -moz-contain-floats | -webkit-contain-floats",
    "min-width"                     : "<length> | <percentage> | <content-sizing> | contain-floats | -moz-contain-floats | -webkit-contain-floats",
    "move-to"                       : 1,

    //N
    "nav-down"                      : 1,
    "nav-index"                     : 1,
    "nav-left"                      : 1,
    "nav-right"                     : 1,
    "nav-up"                        : 1,

    //O
    "object-fit"                    : "fill | contain | cover | none | scale-down",
    "object-position"               : "<position>",
    "opacity"                       : "<opacity-value>",
    "order"                         : "<integer>",
    "-webkit-order"                 : "<integer>",
    "orphans"                       : "<integer>",
    "outline"                       : 1,
    "outline-color"                 : "<color> | invert",
    "outline-offset"                : 1,
    "outline-style"                 : "<border-style>",
    "outline-width"                 : "<border-width>",
    "overflow"                      : "visible | hidden | scroll | auto",
    "overflow-style"                : 1,
    "overflow-wrap"                 : "normal | break-word",
    "overflow-x"                    : 1,
    "overflow-y"                    : 1,

    //P
    "padding"                       : "<padding-width>{1,4}",
    "padding-bottom"                : "<padding-width>",
    "padding-left"                  : "<padding-width>",
    "padding-right"                 : "<padding-width>",
    "padding-top"                   : "<padding-width>",
    "page"                          : 1,
    "page-break-after"              : "auto | always | avoid | left | right",
    "page-break-before"             : "auto | always | avoid | left | right",
    "page-break-inside"             : "auto | avoid",
    "page-policy"                   : 1,
    "pause"                         : 1,
    "pause-after"                   : 1,
    "pause-before"                  : 1,
    "perspective"                   : 1,
    "perspective-origin"            : 1,
    "phonemes"                      : 1,
    "pitch"                         : 1,
    "pitch-range"                   : 1,
    "play-during"                   : 1,
    "pointer-events"                : "auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all",
    "position"                      : "static | relative | absolute | fixed",
    "presentation-level"            : 1,
    "punctuation-trim"              : 1,

    //Q
    "quotes"                        : 1,

    //R
    "rendering-intent"              : 1,
    "resize"                        : 1,
    "rest"                          : 1,
    "rest-after"                    : 1,
    "rest-before"                   : 1,
    "richness"                      : 1,
    "right"                         : "<margin-width>",
    "rotation"                      : 1,
    "rotation-point"                : 1,
    "ruby-align"                    : 1,
    "ruby-overhang"                 : 1,
    "ruby-position"                 : 1,
    "ruby-span"                     : 1,

    //S
    "shape-rendering"               : "auto | optimizeSpeed | crispEdges | geometricPrecision",
    "size"                          : 1,
    "speak"                         : "normal | none | spell-out",
    "speak-header"                  : "once | always",
    "speak-numeral"                 : "digits | continuous",
    "speak-punctuation"             : "code | none",
    "speech-rate"                   : 1,
    "src"                           : 1,
    "stop-color"                    : 1,
    "stop-opacity"                  : "<opacity-value>",
    "stress"                        : 1,
    "string-set"                    : 1,
    "stroke"                        : "<paint>",
    "stroke-dasharray"              : "none | <dasharray>",
    "stroke-dashoffset"             : "<percentage> | <length>",
    "stroke-linecap"                : "butt | round | square",
    "stroke-linejoin"               : "miter | round | bevel",
    "stroke-miterlimit"             : "<miterlimit>",
    "stroke-opacity"                : "<opacity-value>",
    "stroke-width"                  : "<percentage> | <length>",

    "table-layout"                  : "auto | fixed",
    "tab-size"                      : "<integer> | <length>",
    "target"                        : 1,
    "target-name"                   : 1,
    "target-new"                    : 1,
    "target-position"               : 1,
    "text-align"                    : "left | right | center | justify | match-parent | start | end",
    "text-align-last"               : 1,
    "text-anchor"                   : "start | middle | end",
    "text-decoration"               : "<text-decoration-line> || <text-decoration-style> || <text-decoration-color>",
    "text-decoration-color"         : "<text-decoration-color>",
    "text-decoration-line"          : "<text-decoration-line>",
    "text-decoration-style"         : "<text-decoration-style>",
    "text-emphasis"                 : 1,
    "text-height"                   : 1,
    "text-indent"                   : "<length> | <percentage>",
    "text-justify"                  : "auto | none | inter-word | inter-ideograph | inter-cluster | distribute | kashida",
    "text-outline"                  : 1,
    "text-overflow"                 : 1,
    "text-rendering"                : "auto | optimizeSpeed | optimizeLegibility | geometricPrecision",
    "text-shadow"                   : 1,
    "text-transform"                : "capitalize | uppercase | lowercase | none",
    "text-wrap"                     : "normal | none | avoid",
    "top"                           : "<margin-width>",
    "-ms-touch-action"              : "auto | none | pan-x | pan-y | pan-left | pan-right | pan-up | pan-down | manipulation",
    "touch-action"                  : "auto | none | pan-x | pan-y | pan-left | pan-right | pan-up | pan-down | manipulation",
    "transform"                     : 1,
    "transform-origin"              : 1,
    "transform-style"               : 1,
    "transition"                    : 1,
    "transition-delay"              : 1,
    "transition-duration"           : 1,
    "transition-property"           : 1,
    "transition-timing-function"    : 1,

    //U
    "unicode-bidi"                  : "normal | embed | isolate | bidi-override | isolate-override | plaintext",
    "user-modify"                   : "read-only | read-write | write-only",
    "user-select"                   : "none | text | toggle | element | elements | all",

    //V
    "vertical-align"                : "auto | use-script | baseline | sub | super | top | text-top | central | middle | bottom | text-bottom | <percentage> | <length>",
    "visibility"                    : "visible | hidden | collapse",
    "voice-balance"                 : 1,
    "voice-duration"                : 1,
    "voice-family"                  : 1,
    "voice-pitch"                   : 1,
    "voice-pitch-range"             : 1,
    "voice-rate"                    : 1,
    "voice-stress"                  : 1,
    "voice-volume"                  : 1,
    "volume"                        : 1,

    //W
    "white-space"                   : "normal | pre | nowrap | pre-wrap | pre-line | -pre-wrap | -o-pre-wrap | -moz-pre-wrap | -hp-pre-wrap",   // https://perishablepress.com/wrapping-content/
    "white-space-collapse"          : 1,
    "widows"                        : "<integer>",
    "width"                         : "<length> | <percentage> | <content-sizing> | auto",
    "will-change"                   : "<will-change>",
    "word-break"                    : "normal | keep-all | break-all",
    "word-spacing"                  : "<length> | normal",
    "word-wrap"                     : "normal | break-word",
    "writing-mode"                  : "horizontal-tb | vertical-rl | vertical-lr | lr-tb | rl-tb | tb-rl | bt-rl | tb-lr | bt-lr | lr-bt | rl-bt | lr | rl | tb",

    //Z
    "z-index"                       : "<integer> | auto",
    "zoom"                          : "<number> | <percentage> | normal"
};
},{}],8:[function(require,module,exports){
"use strict";

module.exports = PropertyName;

var SyntaxUnit = require("../util/SyntaxUnit");

var Parser = require("./Parser");

/**
 * Represents a selector combinator (whitespace, +, >).
 * @namespace parserlib.css
 * @class PropertyName
 * @extends parserlib.util.SyntaxUnit
 * @constructor
 * @param {String} text The text representation of the unit.
 * @param {String} hack The type of IE hack applied ("*", "_", or null).
 * @param {int} line The line of text on which the unit resides.
 * @param {int} col The column of text on which the unit resides.
 */
function PropertyName(text, hack, line, col) {

    SyntaxUnit.call(this, text, line, col, Parser.PROPERTY_NAME_TYPE);

    /**
     * The type of IE hack applied ("*", "_", or null).
     * @type String
     * @property hack
     */
    this.hack = hack;
}

PropertyName.prototype = new SyntaxUnit();
PropertyName.prototype.constructor = PropertyName;
PropertyName.prototype.toString = function() {
    return (this.hack ? this.hack : "") + this.text;
};
},{"../util/SyntaxUnit":26,"./Parser":6}],9:[function(require,module,exports){
"use strict";

module.exports = PropertyValue;

var SyntaxUnit = require("../util/SyntaxUnit");

var Parser = require("./Parser");

/**
 * Represents a single part of a CSS property value, meaning that it represents
 * just everything single part between ":" and ";". If there are multiple values
 * separated by commas, this type represents just one of the values.
 * @param {String[]} parts An array of value parts making up this value.
 * @param {int} line The line of text on which the unit resides.
 * @param {int} col The column of text on which the unit resides.
 * @namespace parserlib.css
 * @class PropertyValue
 * @extends parserlib.util.SyntaxUnit
 * @constructor
 */
function PropertyValue(parts, line, col) {

    SyntaxUnit.call(this, parts.join(" "), line, col, Parser.PROPERTY_VALUE_TYPE);

    /**
     * The parts that make up the selector.
     * @type Array
     * @property parts
     */
    this.parts = parts;
}

PropertyValue.prototype = new SyntaxUnit();
PropertyValue.prototype.constructor = PropertyValue;
},{"../util/SyntaxUnit":26,"./Parser":6}],10:[function(require,module,exports){
"use strict";

module.exports = PropertyValueIterator;

/**
 * A utility class that allows for easy iteration over the various parts of a
 * property value.
 * @param {parserlib.css.PropertyValue} value The property value to iterate over.
 * @namespace parserlib.css
 * @class PropertyValueIterator
 * @constructor
 */
function PropertyValueIterator(value) {

    /**
     * Iterator value
     * @type int
     * @property _i
     * @private
     */
    this._i = 0;

    /**
     * The parts that make up the value.
     * @type Array
     * @property _parts
     * @private
     */
    this._parts = value.parts;

    /**
     * Keeps track of bookmarks along the way.
     * @type Array
     * @property _marks
     * @private
     */
    this._marks = [];

    /**
     * Holds the original property value.
     * @type parserlib.css.PropertyValue
     * @property value
     */
    this.value = value;
}

/**
 * Returns the total number of parts in the value.
 * @return {int} The total number of parts in the value.
 * @method count
 */
PropertyValueIterator.prototype.count = function() {
    return this._parts.length;
};

/**
 * Indicates if the iterator is positioned at the first item.
 * @return {Boolean} True if positioned at first item, false if not.
 * @method isFirst
 */
PropertyValueIterator.prototype.isFirst = function() {
    return this._i === 0;
};

/**
 * Indicates if there are more parts of the property value.
 * @return {Boolean} True if there are more parts, false if not.
 * @method hasNext
 */
PropertyValueIterator.prototype.hasNext = function() {
    return this._i < this._parts.length;
};

/**
 * Marks the current spot in the iteration so it can be restored to
 * later on.
 * @return {void}
 * @method mark
 */
PropertyValueIterator.prototype.mark = function() {
    this._marks.push(this._i);
};

/**
 * Returns the next part of the property value or null if there is no next
 * part. Does not move the internal counter forward.
 * @return {parserlib.css.PropertyValuePart} The next part of the property value or null if there is no next
 * part.
 * @method peek
 */
PropertyValueIterator.prototype.peek = function(count) {
    return this.hasNext() ? this._parts[this._i + (count || 0)] : null;
};

/**
 * Returns the next part of the property value or null if there is no next
 * part.
 * @return {parserlib.css.PropertyValuePart} The next part of the property value or null if there is no next
 * part.
 * @method next
 */
PropertyValueIterator.prototype.next = function() {
    return this.hasNext() ? this._parts[this._i++] : null;
};

/**
 * Returns the previous part of the property value or null if there is no
 * previous part.
 * @return {parserlib.css.PropertyValuePart} The previous part of the
 * property value or null if there is no previous part.
 * @method previous
 */
PropertyValueIterator.prototype.previous = function() {
    return this._i > 0 ? this._parts[--this._i] : null;
};

/**
 * Restores the last saved bookmark.
 * @return {void}
 * @method restore
 */
PropertyValueIterator.prototype.restore = function() {
    if (this._marks.length) {
        this._i = this._marks.pop();
    }
};

/**
 * Drops the last saved bookmark.
 * @return {void}
 * @method drop
 */
PropertyValueIterator.prototype.drop = function() {
    this._marks.pop();
};
},{}],11:[function(require,module,exports){
"use strict";

module.exports = PropertyValuePart;

var SyntaxUnit = require("../util/SyntaxUnit");

var Colors = require("./Colors");
var Parser = require("./Parser");
var Tokens = require("./Tokens");

/**
 * Represents a single part of a CSS property value, meaning that it represents
 * just one part of the data between ":" and ";".
 * @param {String} text The text representation of the unit.
 * @param {int} line The line of text on which the unit resides.
 * @param {int} col The column of text on which the unit resides.
 * @namespace parserlib.css
 * @class PropertyValuePart
 * @extends parserlib.util.SyntaxUnit
 * @constructor
 */
function PropertyValuePart(text, line, col, optionalHint) {
    var hint = optionalHint || {};

    SyntaxUnit.call(this, text, line, col, Parser.PROPERTY_VALUE_PART_TYPE);

    /**
     * Indicates the type of value unit.
     * @type String
     * @property type
     */
    this.type = "unknown";

    //figure out what type of data it is

    var temp;

    //it is a measurement?
    if (/^([+\-]?[\d\.]+)([a-z]+)$/i.test(text)) {  //dimension
        this.type = "dimension";
        this.value = +RegExp.$1;
        this.units = RegExp.$2;

        //try to narrow down
        switch (this.units.toLowerCase()) {

            case "em":
            case "rem":
            case "ex":
            case "px":
            case "cm":
            case "mm":
            case "in":
            case "pt":
            case "pc":
            case "ch":
            case "vh":
            case "vw":
            case "vmax":
            case "vmin":
                this.type = "length";
                break;

            case "fr":
                this.type = "grid";
                break;

            case "deg":
            case "rad":
            case "grad":
            case "turn":
                this.type = "angle";
                break;

            case "ms":
            case "s":
                this.type = "time";
                break;

            case "hz":
            case "khz":
                this.type = "frequency";
                break;

            case "dpi":
            case "dpcm":
                this.type = "resolution";
                break;

            //default
        }
    } else if (/^([+\-]?[\d\.]+)%$/i.test(text)) {  //percentage
        this.type = "percentage";
        this.value = +RegExp.$1;
    } else if (/^([+\-]?\d+)$/i.test(text)) {  //integer
        this.type = "integer";
        this.value = +RegExp.$1;
    } else if (/^([+\-]?[\d\.]+)$/i.test(text)) {  //number
        this.type = "number";
        this.value = +RegExp.$1;
    } else if (/^#([a-f0-9]{3,6})/i.test(text)) {  //hexcolor
        this.type = "color";
        temp = RegExp.$1;
        if (temp.length === 3) {
            this.red    = parseInt(temp.charAt(0)+temp.charAt(0), 16);
            this.green  = parseInt(temp.charAt(1)+temp.charAt(1), 16);
            this.blue   = parseInt(temp.charAt(2)+temp.charAt(2), 16);
        } else {
            this.red    = parseInt(temp.substring(0, 2), 16);
            this.green  = parseInt(temp.substring(2, 4), 16);
            this.blue   = parseInt(temp.substring(4, 6), 16);
        }
    } else if (/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i.test(text)) { //rgb() color with absolute numbers
        this.type   = "color";
        this.red    = +RegExp.$1;
        this.green  = +RegExp.$2;
        this.blue   = +RegExp.$3;
    } else if (/^rgb\(\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i.test(text)) { //rgb() color with percentages
        this.type   = "color";
        this.red    = +RegExp.$1 * 255 / 100;
        this.green  = +RegExp.$2 * 255 / 100;
        this.blue   = +RegExp.$3 * 255 / 100;
    } else if (/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)/i.test(text)) { //rgba() color with absolute numbers
        this.type   = "color";
        this.red    = +RegExp.$1;
        this.green  = +RegExp.$2;
        this.blue   = +RegExp.$3;
        this.alpha  = +RegExp.$4;
    } else if (/^rgba\(\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d\.]+)\s*\)/i.test(text)) { //rgba() color with percentages
        this.type   = "color";
        this.red    = +RegExp.$1 * 255 / 100;
        this.green  = +RegExp.$2 * 255 / 100;
        this.blue   = +RegExp.$3 * 255 / 100;
        this.alpha  = +RegExp.$4;
    } else if (/^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i.test(text)) { //hsl()
        this.type   = "color";
        this.hue    = +RegExp.$1;
        this.saturation = +RegExp.$2 / 100;
        this.lightness  = +RegExp.$3 / 100;
    } else if (/^hsla\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d\.]+)\s*\)/i.test(text)) { //hsla() color with percentages
        this.type   = "color";
        this.hue    = +RegExp.$1;
        this.saturation = +RegExp.$2 / 100;
        this.lightness  = +RegExp.$3 / 100;
        this.alpha  = +RegExp.$4;
    } else if (/^url\(("([^\\"]|\\.)*")\)/i.test(text)) { //URI
        // generated by TokenStream.readURI, so always double-quoted.
        this.type   = "uri";
        this.uri    = PropertyValuePart.parseString(RegExp.$1);
    } else if (/^([^\(]+)\(/i.test(text)) {
        this.type   = "function";
        this.name   = RegExp.$1;
        this.value  = text;
    } else if (/^"([^\n\r\f\\"]|\\\r\n|\\[^\r0-9a-f]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)*"/i.test(text)) {    //double-quoted string
        this.type   = "string";
        this.value  = PropertyValuePart.parseString(text);
    } else if (/^'([^\n\r\f\\']|\\\r\n|\\[^\r0-9a-f]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)*'/i.test(text)) {    //single-quoted string
        this.type   = "string";
        this.value  = PropertyValuePart.parseString(text);
    } else if (Colors[text.toLowerCase()]) {  //named color
        this.type   = "color";
        temp        = Colors[text.toLowerCase()].substring(1);
        this.red    = parseInt(temp.substring(0, 2), 16);
        this.green  = parseInt(temp.substring(2, 4), 16);
        this.blue   = parseInt(temp.substring(4, 6), 16);
    } else if (/^[,\/]$/.test(text)) {
        this.type   = "operator";
        this.value  = text;
    } else if (/^-?[a-z_\u00A0-\uFFFF][a-z0-9\-_\u00A0-\uFFFF]*$/i.test(text)) {
        this.type   = "identifier";
        this.value  = text;
    }

    // There can be ambiguity with escape sequences in identifiers, as
    // well as with "color" parts which are also "identifiers", so record
    // an explicit hint when the token generating this PropertyValuePart
    // was an identifier.
    this.wasIdent = Boolean(hint.ident);
}

PropertyValuePart.prototype = new SyntaxUnit();
PropertyValuePart.prototype.constructor = PropertyValuePart;

/**
 * Helper method to parse a CSS string.
 */
PropertyValuePart.parseString = function(str) {
    str = str.slice(1, -1); // Strip surrounding single/double quotes
    var replacer = function(match, esc) {
        if (/^(\n|\r\n|\r|\f)$/.test(esc)) {
            return "";
        }
        var m = /^[0-9a-f]{1,6}/i.exec(esc);
        if (m) {
            var codePoint = parseInt(m[0], 16);
            if (String.fromCodePoint) {
                return String.fromCodePoint(codePoint);
            } else {
                // XXX No support for surrogates on old JavaScript engines.
                return String.fromCharCode(codePoint);
            }
        }
        return esc;
    };
    return str.replace(/\\(\r\n|[^\r0-9a-f]|[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)/ig,
                       replacer);
};

/**
 * Helper method to serialize a CSS string.
 */
PropertyValuePart.serializeString = function(value) {
    var replacer = function(match, c) {
        if (c === "\"") {
            return "\\" + c;
        }
        var cp = String.codePointAt ? String.codePointAt(0) :
            // We only escape non-surrogate chars, so using charCodeAt
            // is harmless here.
            String.charCodeAt(0);
        return "\\" + cp.toString(16) + " ";
    };
    return "\"" + value.replace(/["\r\n\f]/g, replacer) + "\"";
};

/**
 * Create a new syntax unit based solely on the given token.
 * Convenience method for creating a new syntax unit when
 * it represents a single token instead of multiple.
 * @param {Object} token The token object to represent.
 * @return {parserlib.css.PropertyValuePart} The object representing the token.
 * @static
 * @method fromToken
 */
PropertyValuePart.fromToken = function(token) {
    var part = new PropertyValuePart(token.value, token.startLine, token.startCol, {
        // Tokens can have escaped characters that would fool the type
        // identification in the PropertyValuePart constructor, so pass
        // in a hint if this was an identifier.
        ident: token.type === Tokens.IDENT
    });
    return part;
};
},{"../util/SyntaxUnit":26,"./Colors":1,"./Parser":6,"./Tokens":18}],12:[function(require,module,exports){
"use strict";

var Pseudos = module.exports = {
    __proto__:       null,
    ":first-letter": 1,
    ":first-line":   1,
    ":before":       1,
    ":after":        1
};

Pseudos.ELEMENT = 1;
Pseudos.CLASS = 2;

Pseudos.isElement = function(pseudo) {
    return pseudo.indexOf("::") === 0 || Pseudos[pseudo.toLowerCase()] === Pseudos.ELEMENT;
};
},{}],13:[function(require,module,exports){
"use strict";

module.exports = Selector;

var SyntaxUnit = require("../util/SyntaxUnit");

var Parser = require("./Parser");
var Specificity = require("./Specificity");

/**
 * Represents an entire single selector, including all parts but not
 * including multiple selectors (those separated by commas).
 * @namespace parserlib.css
 * @class Selector
 * @extends parserlib.util.SyntaxUnit
 * @constructor
 * @param {Array} parts Array of selectors parts making up this selector.
 * @param {int} line The line of text on which the unit resides.
 * @param {int} col The column of text on which the unit resides.
 */
function Selector(parts, line, col) {

    SyntaxUnit.call(this, parts.join(" "), line, col, Parser.SELECTOR_TYPE);

    /**
     * The parts that make up the selector.
     * @type Array
     * @property parts
     */
    this.parts = parts;

    /**
     * The specificity of the selector.
     * @type parserlib.css.Specificity
     * @property specificity
     */
    this.specificity = Specificity.calculate(this);
}

Selector.prototype = new SyntaxUnit();
Selector.prototype.constructor = Selector;
},{"../util/SyntaxUnit":26,"./Parser":6,"./Specificity":16}],14:[function(require,module,exports){
"use strict";

module.exports = SelectorPart;

var SyntaxUnit = require("../util/SyntaxUnit");

var Parser = require("./Parser");

/**
 * Represents a single part of a selector string, meaning a single set of
 * element name and modifiers. This does not include combinators such as
 * spaces, +, >, etc.
 * @namespace parserlib.css
 * @class SelectorPart
 * @extends parserlib.util.SyntaxUnit
 * @constructor
 * @param {String} elementName The element name in the selector or null
 *      if there is no element name.
 * @param {Array} modifiers Array of individual modifiers for the element.
 *      May be empty if there are none.
 * @param {String} text The text representation of the unit.
 * @param {int} line The line of text on which the unit resides.
 * @param {int} col The column of text on which the unit resides.
 */
function SelectorPart(elementName, modifiers, text, line, col) {

    SyntaxUnit.call(this, text, line, col, Parser.SELECTOR_PART_TYPE);

    /**
     * The tag name of the element to which this part
     * of the selector affects.
     * @type String
     * @property elementName
     */
    this.elementName = elementName;

    /**
     * The parts that come after the element name, such as class names, IDs,
     * pseudo classes/elements, etc.
     * @type Array
     * @property modifiers
     */
    this.modifiers = modifiers;
}

SelectorPart.prototype = new SyntaxUnit();
SelectorPart.prototype.constructor = SelectorPart;
},{"../util/SyntaxUnit":26,"./Parser":6}],15:[function(require,module,exports){
"use strict";

module.exports = SelectorSubPart;

var SyntaxUnit = require("../util/SyntaxUnit");

var Parser = require("./Parser");

/**
 * Represents a selector modifier string, meaning a class name, element name,
 * element ID, pseudo rule, etc.
 * @namespace parserlib.css
 * @class SelectorSubPart
 * @extends parserlib.util.SyntaxUnit
 * @constructor
 * @param {String} text The text representation of the unit.
 * @param {String} type The type of selector modifier.
 * @param {int} line The line of text on which the unit resides.
 * @param {int} col The column of text on which the unit resides.
 */
function SelectorSubPart(text, type, line, col) {

    SyntaxUnit.call(this, text, line, col, Parser.SELECTOR_SUB_PART_TYPE);

    /**
     * The type of modifier.
     * @type String
     * @property type
     */
    this.type = type;

    /**
     * Some subparts have arguments, this represents them.
     * @type Array
     * @property args
     */
    this.args = [];
}

SelectorSubPart.prototype = new SyntaxUnit();
SelectorSubPart.prototype.constructor = SelectorSubPart;
},{"../util/SyntaxUnit":26,"./Parser":6}],16:[function(require,module,exports){
"use strict";

module.exports = Specificity;

var Pseudos = require("./Pseudos");
var SelectorPart = require("./SelectorPart");

/**
 * Represents a selector's specificity.
 * @namespace parserlib.css
 * @class Specificity
 * @constructor
 * @param {int} a Should be 1 for inline styles, zero for stylesheet styles
 * @param {int} b Number of ID selectors
 * @param {int} c Number of classes and pseudo classes
 * @param {int} d Number of element names and pseudo elements
 */
function Specificity(a, b, c, d) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
}

Specificity.prototype = {
    constructor: Specificity,

    /**
     * Compare this specificity to another.
     * @param {Specificity} other The other specificity to compare to.
     * @return {int} -1 if the other specificity is larger, 1 if smaller, 0 if equal.
     * @method compare
     */
    compare: function(other) {
        var comps = ["a", "b", "c", "d"],
            i, len;

        for (i=0, len=comps.length; i < len; i++) {
            if (this[comps[i]] < other[comps[i]]) {
                return -1;
            } else if (this[comps[i]] > other[comps[i]]) {
                return 1;
            }
        }

        return 0;
    },

    /**
     * Creates a numeric value for the specificity.
     * @return {int} The numeric value for the specificity.
     * @method valueOf
     */
    valueOf: function() {
        return (this.a * 1000) + (this.b * 100) + (this.c * 10) + this.d;
    },

    /**
     * Returns a string representation for specificity.
     * @return {String} The string representation of specificity.
     * @method toString
     */
    toString: function() {
        return this.a + "," + this.b + "," + this.c + "," + this.d;
    }
};

/**
 * Calculates the specificity of the given selector.
 * @param {parserlib.css.Selector} The selector to calculate specificity for.
 * @return {parserlib.css.Specificity} The specificity of the selector.
 * @static
 * @method calculate
 */
Specificity.calculate = function(selector) {

    var i, len,
        part,
        b=0, c=0, d=0;

    function updateValues(part) {

        var i, j, len, num,
            elementName = part.elementName ? part.elementName.text : "",
            modifier;

        if (elementName && elementName.charAt(elementName.length-1) !== "*") {
            d++;
        }

        for (i=0, len=part.modifiers.length; i < len; i++) {
            modifier = part.modifiers[i];
            switch (modifier.type) {
                case "class":
                case "attribute":
                    c++;
                    break;

                case "id":
                    b++;
                    break;

                case "pseudo":
                    if (Pseudos.isElement(modifier.text)) {
                        d++;
                    } else {
                        c++;
                    }
                    break;

                case "not":
                    for (j=0, num=modifier.args.length; j < num; j++) {
                        updateValues(modifier.args[j]);
                    }
            }
        }
    }

    for (i=0, len=selector.parts.length; i < len; i++) {
        part = selector.parts[i];

        if (part instanceof SelectorPart) {
            updateValues(part);
        }
    }

    return new Specificity(0, b, c, d);
};
},{"./Pseudos":12,"./SelectorPart":14}],17:[function(require,module,exports){
"use strict";

module.exports = TokenStream;

var TokenStreamBase = require("../util/TokenStreamBase");

var PropertyValuePart = require("./PropertyValuePart");
var Tokens = require("./Tokens");

var h = /^[0-9a-fA-F]$/,
    nonascii = /^[\u00A0-\uFFFF]$/,
    nl = /\n|\r\n|\r|\f/,
    whitespace = /\u0009|\u000a|\u000c|\u000d|\u0020/;

//-----------------------------------------------------------------------------
// Helper functions
//-----------------------------------------------------------------------------

function isHexDigit(c) {
    return c !== null && h.test(c);
}

function isDigit(c) {
    return c !== null && /\d/.test(c);
}

function isWhitespace(c) {
    return c !== null && whitespace.test(c);
}

function isNewLine(c) {
    return c !== null && nl.test(c);
}

function isNameStart(c) {
    return c !== null && /[a-z_\u00A0-\uFFFF\\]/i.test(c);
}

function isNameChar(c) {
    return c !== null && (isNameStart(c) || /[0-9\-\\]/.test(c));
}

function isIdentStart(c) {
    return c !== null && (isNameStart(c) || /\-\\/.test(c));
}

function mix(receiver, supplier) {
    for (var prop in supplier) {
        if (Object.prototype.hasOwnProperty.call(supplier, prop)) {
            receiver[prop] = supplier[prop];
        }
    }
    return receiver;
}

//-----------------------------------------------------------------------------
// CSS Token Stream
//-----------------------------------------------------------------------------

/**
 * A token stream that produces CSS tokens.
 * @param {String|Reader} input The source of text to tokenize.
 * @constructor
 * @class TokenStream
 * @namespace parserlib.css
 */
function TokenStream(input) {
    TokenStreamBase.call(this, input, Tokens);
}

TokenStream.prototype = mix(new TokenStreamBase(), {

    /**
     * Overrides the TokenStreamBase method of the same name
     * to produce CSS tokens.
     * @return {Object} A token object representing the next token.
     * @method _getToken
     * @private
     */
    _getToken: function() {

        var c,
            reader = this._reader,
            token   = null,
            startLine   = reader.getLine(),
            startCol    = reader.getCol();

        c = reader.read();

        while (c) {
            switch (c) {

                /*
                 * Potential tokens:
                 * - COMMENT
                 * - SLASH
                 * - CHAR
                 */
                case "/":

                    if (reader.peek() === "*") {
                        token = this.commentToken(c, startLine, startCol);
                    } else {
                        token = this.charToken(c, startLine, startCol);
                    }
                    break;

                /*
                 * Potential tokens:
                 * - DASHMATCH
                 * - INCLUDES
                 * - PREFIXMATCH
                 * - SUFFIXMATCH
                 * - SUBSTRINGMATCH
                 * - CHAR
                 */
                case "|":
                case "~":
                case "^":
                case "$":
                case "*":
                    if (reader.peek() === "=") {
                        token = this.comparisonToken(c, startLine, startCol);
                    } else {
                        token = this.charToken(c, startLine, startCol);
                    }
                    break;

                /*
                 * Potential tokens:
                 * - STRING
                 * - INVALID
                 */
                case "\"":
                case "'":
                    token = this.stringToken(c, startLine, startCol);
                    break;

                /*
                 * Potential tokens:
                 * - HASH
                 * - CHAR
                 */
                case "#":
                    if (isNameChar(reader.peek())) {
                        token = this.hashToken(c, startLine, startCol);
                    } else {
                        token = this.charToken(c, startLine, startCol);
                    }
                    break;

                /*
                 * Potential tokens:
                 * - DOT
                 * - NUMBER
                 * - DIMENSION
                 * - PERCENTAGE
                 */
                case ".":
                    if (isDigit(reader.peek())) {
                        token = this.numberToken(c, startLine, startCol);
                    } else {
                        token = this.charToken(c, startLine, startCol);
                    }
                    break;

                /*
                 * Potential tokens:
                 * - CDC
                 * - MINUS
                 * - NUMBER
                 * - DIMENSION
                 * - PERCENTAGE
                 */
                case "-":
                    if (reader.peek() === "-") {  //could be closing HTML-style comment
                        token = this.htmlCommentEndToken(c, startLine, startCol);
                    } else if (isNameStart(reader.peek())) {
                        token = this.identOrFunctionToken(c, startLine, startCol);
                    } else {
                        token = this.charToken(c, startLine, startCol);
                    }
                    break;

                /*
                 * Potential tokens:
                 * - IMPORTANT_SYM
                 * - CHAR
                 */
                case "!":
                    token = this.importantToken(c, startLine, startCol);
                    break;

                /*
                 * Any at-keyword or CHAR
                 */
                case "@":
                    token = this.atRuleToken(c, startLine, startCol);
                    break;

                /*
                 * Potential tokens:
                 * - NOT
                 * - CHAR
                 */
                case ":":
                    token = this.notToken(c, startLine, startCol);
                    break;

                /*
                 * Potential tokens:
                 * - CDO
                 * - CHAR
                 */
                case "<":
                    token = this.htmlCommentStartToken(c, startLine, startCol);
                    break;

                /*
                 * Potential tokens:
                 * - IDENT
                 * - CHAR
                 */
                case "\\":
                    if (/[^\r\n\f]/.test(reader.peek())) {
                        token = this.identOrFunctionToken(this.readEscape(c, true), startLine, startCol);
                    } else {
                        token = this.charToken(c, startLine, startCol);
                    }
                    break;

                /*
                 * Potential tokens:
                 * - UNICODE_RANGE
                 * - URL
                 * - CHAR
                 */
                case "U":
                case "u":
                    if (reader.peek() === "+") {
                        token = this.unicodeRangeToken(c, startLine, startCol);
                        break;
                    }
                    /* falls through */
                default:

                    /*
                     * Potential tokens:
                     * - NUMBER
                     * - DIMENSION
                     * - LENGTH
                     * - FREQ
                     * - TIME
                     * - EMS
                     * - EXS
                     * - ANGLE
                     */
                    if (isDigit(c)) {
                        token = this.numberToken(c, startLine, startCol);
                    } else

                    /*
                     * Potential tokens:
                     * - S
                     */
                    if (isWhitespace(c)) {
                        token = this.whitespaceToken(c, startLine, startCol);
                    } else

                    /*
                     * Potential tokens:
                     * - IDENT
                     */
                    if (isIdentStart(c)) {
                        token = this.identOrFunctionToken(c, startLine, startCol);
                    } else {
                       /*
                        * Potential tokens:
                        * - CHAR
                        * - PLUS
                        */
                        token = this.charToken(c, startLine, startCol);
                    }
            }

            //make sure this token is wanted
            //TODO: check channel
            break;
        }

        if (!token && c === null) {
            token = this.createToken(Tokens.EOF, null, startLine, startCol);
        }

        return token;
    },

    //-------------------------------------------------------------------------
    // Methods to create tokens
    //-------------------------------------------------------------------------

    /**
     * Produces a token based on available data and the current
     * reader position information. This method is called by other
     * private methods to create tokens and is never called directly.
     * @param {int} tt The token type.
     * @param {String} value The text value of the token.
     * @param {int} startLine The beginning line for the character.
     * @param {int} startCol The beginning column for the character.
     * @param {Object} options (Optional) Specifies a channel property
     *      to indicate that a different channel should be scanned
     *      and/or a hide property indicating that the token should
     *      be hidden.
     * @return {Object} A token object.
     * @method createToken
     */
    createToken: function(tt, value, startLine, startCol, options) {
        var reader = this._reader;
        options = options || {};

        return {
            value:      value,
            type:       tt,
            channel:    options.channel,
            endChar:    options.endChar,
            hide:       options.hide || false,
            startLine:  startLine,
            startCol:   startCol,
            endLine:    reader.getLine(),
            endCol:     reader.getCol()
        };
    },

    //-------------------------------------------------------------------------
    // Methods to create specific tokens
    //-------------------------------------------------------------------------

    /**
     * Produces a token for any at-rule. If the at-rule is unknown, then
     * the token is for a single "@" character.
     * @param {String} first The first character for the token.
     * @param {int} startLine The beginning line for the character.
     * @param {int} startCol The beginning column for the character.
     * @return {Object} A token object.
     * @method atRuleToken
     */
    atRuleToken: function(first, startLine, startCol) {
        var rule    = first,
            reader  = this._reader,
            tt      = Tokens.CHAR,
            ident;

        /*
         * First, mark where we are. There are only four @ rules,
         * so anything else is really just an invalid token.
         * Basically, if this doesn't match one of the known @
         * rules, just return '@' as an unknown token and allow
         * parsing to continue after that point.
         */
        reader.mark();

        //try to find the at-keyword
        ident = this.readName();
        rule = first + ident;
        tt = Tokens.type(rule.toLowerCase());

        //if it's not valid, use the first character only and reset the reader
        if (tt === Tokens.CHAR || tt === Tokens.UNKNOWN) {
            if (rule.length > 1) {
                tt = Tokens.UNKNOWN_SYM;
            } else {
                tt = Tokens.CHAR;
                rule = first;
                reader.reset();
            }
        }

        return this.createToken(tt, rule, startLine, startCol);
    },

    /**
     * Produces a character token based on the given character
     * and location in the stream. If there's a special (non-standard)
     * token name, this is used; otherwise CHAR is used.
     * @param {String} c The character for the token.
     * @param {int} startLine The beginning line for the character.
     * @param {int} startCol The beginning column for the character.
     * @return {Object} A token object.
     * @method charToken
     */
    charToken: function(c, startLine, startCol) {
        var tt = Tokens.type(c);
        var opts = {};

        if (tt === -1) {
            tt = Tokens.CHAR;
        } else {
            opts.endChar = Tokens[tt].endChar;
        }

        return this.createToken(tt, c, startLine, startCol, opts);
    },

    /**
     * Produces a character token based on the given character
     * and location in the stream. If there's a special (non-standard)
     * token name, this is used; otherwise CHAR is used.
     * @param {String} first The first character for the token.
     * @param {int} startLine The beginning line for the character.
     * @param {int} startCol The beginning column for the character.
     * @return {Object} A token object.
     * @method commentToken
     */
    commentToken: function(first, startLine, startCol) {
        var comment = this.readComment(first);

        return this.createToken(Tokens.COMMENT, comment, startLine, startCol);
    },

    /**
     * Produces a comparison token based on the given character
     * and location in the stream. The next character must be
     * read and is already known to be an equals sign.
     * @param {String} c The character for the token.
     * @param {int} startLine The beginning line for the character.
     * @param {int} startCol The beginning column for the character.
     * @return {Object} A token object.
     * @method comparisonToken
     */
    comparisonToken: function(c, startLine, startCol) {
        var reader  = this._reader,
            comparison  = c + reader.read(),
            tt      = Tokens.type(comparison) || Tokens.CHAR;

        return this.createToken(tt, comparison, startLine, startCol);
    },

    /**
     * Produces a hash token based on the specified information. The
     * first character provided is the pound sign (#) and then this
     * method reads a name afterward.
     * @param {String} first The first character (#) in the hash name.
     * @param {int} startLine The beginning line for the character.
     * @param {int} startCol The beginning column for the character.
     * @return {Object} A token object.
     * @method hashToken
     */
    hashToken: function(first, startLine, startCol) {
        var name    = this.readName(first);

        return this.createToken(Tokens.HASH, name, startLine, startCol);
    },

    /**
     * Produces a CDO or CHAR token based on the specified information. The
     * first character is provided and the rest is read by the function to determine
     * the correct token to create.
     * @param {String} first The first character in the token.
     * @param {int} startLine The beginning line for the character.
     * @param {int} startCol The beginning column for the character.
     * @return {Object} A token object.
     * @method htmlCommentStartToken
     */
    htmlCommentStartToken: function(first, startLine, startCol) {
        var reader      = this._reader,
            text        = first;

        reader.mark();
        text += reader.readCount(3);

        if (text === "<!--") {
            return this.createToken(Tokens.CDO, text, startLine, startCol);
        } else {
            reader.reset();
            return this.charToken(first, startLine, startCol);
        }
    },

    /**
     * Produces a CDC or CHAR token based on the specified information. The
     * first character is provided and the rest is read by the function to determine
     * the correct token to create.
     * @param {String} first The first character in the token.
     * @param {int} startLine The beginning line for the character.
     * @param {int} startCol The beginning column for the character.
     * @return {Object} A token object.
     * @method htmlCommentEndToken
     */
    htmlCommentEndToken: function(first, startLine, startCol) {
        var reader      = this._reader,
            text        = first;

        reader.mark();
        text += reader.readCount(2);

        if (text === "-->") {
            return this.createToken(Tokens.CDC, text, startLine, startCol);
        } else {
            reader.reset();
            return this.charToken(first, startLine, startCol);
        }
    },

    /**
     * Produces an IDENT or FUNCTION token based on the specified information. The
     * first character is provided and the rest is read by the function to determine
     * the correct token to create.
     * @param {String} first The first character in the identifier.
     * @param {int} startLine The beginning line for the character.
     * @param {int} startCol The beginning column for the character.
     * @return {Object} A token object.
     * @method identOrFunctionToken
     */
    identOrFunctionToken: function(first, startLine, startCol) {
        var reader  = this._reader,
            ident   = this.readName(first),
            tt      = Tokens.IDENT,
            uriFns  = ["url(", "url-prefix(", "domain("],
            uri;

        //if there's a left paren immediately after, it's a URI or function
        if (reader.peek() === "(") {
            ident += reader.read();
            if (uriFns.indexOf(ident.toLowerCase()) > -1) {
                reader.mark();
                uri = this.readURI(ident);
                if (uri === null) {
                    //didn't find a valid URL or there's no closing paren
                    reader.reset();
                    tt = Tokens.FUNCTION;
                } else {
                    tt = Tokens.URI;
                    ident = uri;
                }
            } else {
                tt = Tokens.FUNCTION;
            }
        } else if (reader.peek() === ":") {  //might be an IE function

            //IE-specific functions always being with progid:
            if (ident.toLowerCase() === "progid") {
                ident += reader.readTo("(");
                tt = Tokens.IE_FUNCTION;
            }
        }

        return this.createToken(tt, ident, startLine, startCol);
    },

    /**
     * Produces an IMPORTANT_SYM or CHAR token based on the specified information. The
     * first character is provided and the rest is read by the function to determine
     * the correct token to create.
     * @param {String} first The first character in the token.
     * @param {int} startLine The beginning line for the character.
     * @param {int} startCol The beginning column for the character.
     * @return {Object} A token object.
     * @method importantToken
     */
    importantToken: function(first, startLine, startCol) {
        var reader      = this._reader,
            important   = first,
            tt          = Tokens.CHAR,
            temp,
            c;

        reader.mark();
        c = reader.read();

        while (c) {

            //there can be a comment in here
            if (c === "/") {

                //if the next character isn't a star, then this isn't a valid !important token
                if (reader.peek() !== "*") {
                    break;
                } else {
                    temp = this.readComment(c);
                    if (temp === "") {    //broken!
                        break;
                    }
                }
            } else if (isWhitespace(c)) {
                important += c + this.readWhitespace();
            } else if (/i/i.test(c)) {
                temp = reader.readCount(8);
                if (/mportant/i.test(temp)) {
                    important += c + temp;
                    tt = Tokens.IMPORTANT_SYM;
                }
                break;  //we're done
            } else {
                break;
            }

            c = reader.read();
        }

        if (tt === Tokens.CHAR) {
            reader.reset();
            return this.charToken(first, startLine, startCol);
        } else {
            return this.createToken(tt, important, startLine, startCol);
        }
    },

    /**
     * Produces a NOT or CHAR token based on the specified information. The
     * first character is provided and the rest is read by the function to determine
     * the correct token to create.
     * @param {String} first The first character in the token.
     * @param {int} startLine The beginning line for the character.
     * @param {int} startCol The beginning column for the character.
     * @return {Object} A token object.
     * @method notToken
     */
    notToken: function(first, startLine, startCol) {
        var reader      = this._reader,
            text        = first;

        reader.mark();
        text += reader.readCount(4);

        if (text.toLowerCase() === ":not(") {
            return this.createToken(Tokens.NOT, text, startLine, startCol);
        } else {
            reader.reset();
            return this.charToken(first, startLine, startCol);
        }
    },

    /**
     * Produces a number token based on the given character
     * and location in the stream. This may return a token of
     * NUMBER, EMS, EXS, LENGTH, ANGLE, TIME, FREQ, DIMENSION,
     * or PERCENTAGE.
     * @param {String} first The first character for the token.
     * @param {int} startLine The beginning line for the character.
     * @param {int} startCol The beginning column for the character.
     * @return {Object} A token object.
     * @method numberToken
     */
    numberToken: function(first, startLine, startCol) {
        var reader  = this._reader,
            value   = this.readNumber(first),
            ident,
            tt      = Tokens.NUMBER,
            c       = reader.peek();

        if (isIdentStart(c)) {
            ident = this.readName(reader.read());
            value += ident;

            if (/^em$|^ex$|^px$|^gd$|^rem$|^vw$|^vh$|^vmax$|^vmin$|^ch$|^cm$|^mm$|^in$|^pt$|^pc$/i.test(ident)) {
                tt = Tokens.LENGTH;
            } else if (/^deg|^rad$|^grad$|^turn$/i.test(ident)) {
                tt = Tokens.ANGLE;
            } else if (/^ms$|^s$/i.test(ident)) {
                tt = Tokens.TIME;
            } else if (/^hz$|^khz$/i.test(ident)) {
                tt = Tokens.FREQ;
            } else if (/^dpi$|^dpcm$/i.test(ident)) {
                tt = Tokens.RESOLUTION;
            } else {
                tt = Tokens.DIMENSION;
            }
        } else if (c === "%") {
            value += reader.read();
            tt = Tokens.PERCENTAGE;
        }

        return this.createToken(tt, value, startLine, startCol);
    },

    /**
     * Produces a string token based on the given character
     * and location in the stream. Since strings may be indicated
     * by single or double quotes, a failure to match starting
     * and ending quotes results in an INVALID token being generated.
     * The first character in the string is passed in and then
     * the rest are read up to and including the final quotation mark.
     * @param {String} first The first character in the string.
     * @param {int} startLine The beginning line for the character.
     * @param {int} startCol The beginning column for the character.
     * @return {Object} A token object.
     * @method stringToken
     */
    stringToken: function(first, startLine, startCol) {
        var delim   = first,
            string  = first,
            reader  = this._reader,
            tt      = Tokens.STRING,
            c       = reader.read(),
            i;

        while (c) {
            string += c;

            if (c === "\\") {
                c = reader.read();
                if (c === null) {
                    break; // premature EOF after backslash
                } else if (/[^\r\n\f0-9a-f]/i.test(c)) {
                    // single-character escape
                    string += c;
                } else {
                    // read up to six hex digits
                    for (i=0; isHexDigit(c) && i<6; i++) {
                        string += c;
                        c = reader.read();
                    }
                    // swallow trailing newline or space
                    if (c === "\r" && reader.peek() === "\n") {
                        string += c;
                        c = reader.read();
                    }
                    if (isWhitespace(c)) {
                        string += c;
                    } else {
                        // This character is null or not part of the escape;
                        // jump back to the top to process it.
                        continue;
                    }
                }
            } else if (c === delim) {
                break; // delimiter found.
            } else if (isNewLine(reader.peek())) {
                // newline without an escapement: it's an invalid string
                tt = Tokens.INVALID;
                break;
            }
            c = reader.read();
        }

        //if c is null, that means we're out of input and the string was never closed
        if (c === null) {
            tt = Tokens.INVALID;
        }

        return this.createToken(tt, string, startLine, startCol);
    },

    unicodeRangeToken: function(first, startLine, startCol) {
        var reader  = this._reader,
            value   = first,
            temp,
            tt      = Tokens.CHAR;

        //then it should be a unicode range
        if (reader.peek() === "+") {
            reader.mark();
            value += reader.read();
            value += this.readUnicodeRangePart(true);

            //ensure there's an actual unicode range here
            if (value.length === 2) {
                reader.reset();
            } else {

                tt = Tokens.UNICODE_RANGE;

                //if there's a ? in the first part, there can't be a second part
                if (value.indexOf("?") === -1) {

                    if (reader.peek() === "-") {
                        reader.mark();
                        temp = reader.read();
                        temp += this.readUnicodeRangePart(false);

                        //if there's not another value, back up and just take the first
                        if (temp.length === 1) {
                            reader.reset();
                        } else {
                            value += temp;
                        }
                    }
                }
            }
        }

        return this.createToken(tt, value, startLine, startCol);
    },

    /**
     * Produces a S token based on the specified information. Since whitespace
     * may have multiple characters, this consumes all whitespace characters
     * into a single token.
     * @param {String} first The first character in the token.
     * @param {int} startLine The beginning line for the character.
     * @param {int} startCol The beginning column for the character.
     * @return {Object} A token object.
     * @method whitespaceToken
     */
    whitespaceToken: function(first, startLine, startCol) {
        var value   = first + this.readWhitespace();
        return this.createToken(Tokens.S, value, startLine, startCol);
    },

    //-------------------------------------------------------------------------
    // Methods to read values from the string stream
    //-------------------------------------------------------------------------

    readUnicodeRangePart: function(allowQuestionMark) {
        var reader  = this._reader,
            part = "",
            c       = reader.peek();

        //first read hex digits
        while (isHexDigit(c) && part.length < 6) {
            reader.read();
            part += c;
            c = reader.peek();
        }

        //then read question marks if allowed
        if (allowQuestionMark) {
            while (c === "?" && part.length < 6) {
                reader.read();
                part += c;
                c = reader.peek();
            }
        }

        //there can't be any other characters after this point

        return part;
    },

    readWhitespace: function() {
        var reader  = this._reader,
            whitespace = "",
            c       = reader.peek();

        while (isWhitespace(c)) {
            reader.read();
            whitespace += c;
            c = reader.peek();
        }

        return whitespace;
    },
    readNumber: function(first) {
        var reader  = this._reader,
            number  = first,
            hasDot  = (first === "."),
            c       = reader.peek();

        while (c) {
            if (isDigit(c)) {
                number += reader.read();
            } else if (c === ".") {
                if (hasDot) {
                    break;
                } else {
                    hasDot = true;
                    number += reader.read();
                }
            } else {
                break;
            }

            c = reader.peek();
        }

        return number;
    },

    // returns null w/o resetting reader if string is invalid.
    readString: function() {
        var token = this.stringToken(this._reader.read(), 0, 0);
        return token.type === Tokens.INVALID ? null : token.value;
    },

    // returns null w/o resetting reader if URI is invalid.
    readURI: function(first) {
        var reader  = this._reader,
            uri     = first,
            inner   = "",
            c       = reader.peek();

        //skip whitespace before
        while (c && isWhitespace(c)) {
            reader.read();
            c = reader.peek();
        }

        //it's a string
        if (c === "'" || c === "\"") {
            inner = this.readString();
            if (inner !== null) {
                inner = PropertyValuePart.parseString(inner);
            }
        } else {
            inner = this.readUnquotedURL();
        }

        c = reader.peek();

        //skip whitespace after
        while (c && isWhitespace(c)) {
            reader.read();
            c = reader.peek();
        }

        //if there was no inner value or the next character isn't closing paren, it's not a URI
        if (inner === null || c !== ")") {
            uri = null;
        } else {
            // Ensure argument to URL is always double-quoted
            // (This simplifies later processing in PropertyValuePart.)
            uri += PropertyValuePart.serializeString(inner) + reader.read();
        }

        return uri;
    },
    // This method never fails, although it may return an empty string.
    readUnquotedURL: function(first) {
        var reader  = this._reader,
            url     = first || "",
            c;

        for (c = reader.peek(); c; c = reader.peek()) {
            // Note that the grammar at
            // https://www.w3.org/TR/CSS2/grammar.html#scanner
            // incorrectly includes the backslash character in the
            // `url` production, although it is correctly omitted in
            // the `baduri1` production.
            if (nonascii.test(c) || /^[\-!#$%&*-\[\]-~]$/.test(c)) {
                url += c;
                reader.read();
            } else if (c === "\\") {
                if (/^[^\r\n\f]$/.test(reader.peek(2))) {
                    url += this.readEscape(reader.read(), true);
                } else {
                    break; // bad escape sequence.
                }
            } else {
                break; // bad character
            }
        }

        return url;
    },

    readName: function(first) {
        var reader  = this._reader,
            ident   = first || "",
            c;

        for (c = reader.peek(); c; c = reader.peek()) {
            if (c === "\\") {
                if (/^[^\r\n\f]$/.test(reader.peek(2))) {
                    ident += this.readEscape(reader.read(), true);
                } else {
                    // Bad escape sequence.
                    break;
                }
            } else if (isNameChar(c)) {
                ident += reader.read();
            } else {
                break;
            }
        }

        return ident;
    },

    readEscape: function(first, unescape) {
        var reader  = this._reader,
            cssEscape = first || "",
            i       = 0,
            c       = reader.peek();

        if (isHexDigit(c)) {
            do {
                cssEscape += reader.read();
                c = reader.peek();
            } while (c && isHexDigit(c) && ++i < 6);
        }

        if (cssEscape.length === 1) {
            if (/^[^\r\n\f0-9a-f]$/.test(c)) {
                reader.read();
                if (unescape) {
                    return c;
                }
            } else {
                // We should never get here (readName won't call readEscape
                // if the escape sequence is bad).
                throw new Error("Bad escape sequence.");
            }
        } else if (c === "\r") {
            reader.read();
            if (reader.peek() === "\n") {
                c += reader.read();
            }
        } else if (/^[ \t\n\f]$/.test(c)) {
            reader.read();
        } else {
            c = "";
        }

        if (unescape) {
            var cp = parseInt(cssEscape.slice(first.length), 16);
            return String.fromCodePoint ? String.fromCodePoint(cp) :
                String.fromCharCode(cp);
        }
        return cssEscape + c;
    },

    readComment: function(first) {
        var reader  = this._reader,
            comment = first || "",
            c       = reader.read();

        if (c === "*") {
            while (c) {
                comment += c;

                //look for end of comment
                if (comment.length > 2 && c === "*" && reader.peek() === "/") {
                    comment += reader.read();
                    break;
                }

                c = reader.read();
            }

            return comment;
        } else {
            return "";
        }
    }
});
},{"../util/TokenStreamBase":27,"./PropertyValuePart":11,"./Tokens":18}],18:[function(require,module,exports){
"use strict";

var Tokens = module.exports = [

    /*
     * The following token names are defined in CSS3 Grammar: https://www.w3.org/TR/css3-syntax/#lexical
     */

    // HTML-style comments
    { name: "CDO" },
    { name: "CDC" },

    // ignorables
    { name: "S", whitespace: true/*, channel: "ws"*/ },
    { name: "COMMENT", comment: true, hide: true, channel: "comment" },

    // attribute equality
    { name: "INCLUDES", text: "~=" },
    { name: "DASHMATCH", text: "|=" },
    { name: "PREFIXMATCH", text: "^=" },
    { name: "SUFFIXMATCH", text: "$=" },
    { name: "SUBSTRINGMATCH", text: "*=" },

    // identifier types
    { name: "STRING" },
    { name: "IDENT" },
    { name: "HASH" },

    // at-keywords
    { name: "IMPORT_SYM", text: "@import" },
    { name: "PAGE_SYM", text: "@page" },
    { name: "MEDIA_SYM", text: "@media" },
    { name: "FONT_FACE_SYM", text: "@font-face" },
    { name: "CHARSET_SYM", text: "@charset" },
    { name: "NAMESPACE_SYM", text: "@namespace" },
    { name: "SUPPORTS_SYM", text: "@supports" },
    { name: "VIEWPORT_SYM", text: ["@viewport", "@-ms-viewport", "@-o-viewport"] },
    { name: "DOCUMENT_SYM", text: ["@document", "@-moz-document"] },
    { name: "UNKNOWN_SYM" },
    //{ name: "ATKEYWORD"},

    // CSS3 animations
    { name: "KEYFRAMES_SYM", text: [ "@keyframes", "@-webkit-keyframes", "@-moz-keyframes", "@-o-keyframes" ] },

    // important symbol
    { name: "IMPORTANT_SYM" },

    // measurements
    { name: "LENGTH" },
    { name: "ANGLE" },
    { name: "TIME" },
    { name: "FREQ" },
    { name: "DIMENSION" },
    { name: "PERCENTAGE" },
    { name: "NUMBER" },

    // functions
    { name: "URI" },
    { name: "FUNCTION" },

    // Unicode ranges
    { name: "UNICODE_RANGE" },

    /*
     * The following token names are defined in CSS3 Selectors: https://www.w3.org/TR/css3-selectors/#selector-syntax
     */

    // invalid string
    { name: "INVALID" },

    // combinators
    { name: "PLUS", text: "+" },
    { name: "GREATER", text: ">" },
    { name: "COMMA", text: "," },
    { name: "TILDE", text: "~" },

    // modifier
    { name: "NOT" },

    /*
     * Defined in CSS3 Paged Media
     */
    { name: "TOPLEFTCORNER_SYM", text: "@top-left-corner" },
    { name: "TOPLEFT_SYM", text: "@top-left" },
    { name: "TOPCENTER_SYM", text: "@top-center" },
    { name: "TOPRIGHT_SYM", text: "@top-right" },
    { name: "TOPRIGHTCORNER_SYM", text: "@top-right-corner" },
    { name: "BOTTOMLEFTCORNER_SYM", text: "@bottom-left-corner" },
    { name: "BOTTOMLEFT_SYM", text: "@bottom-left" },
    { name: "BOTTOMCENTER_SYM", text: "@bottom-center" },
    { name: "BOTTOMRIGHT_SYM", text: "@bottom-right" },
    { name: "BOTTOMRIGHTCORNER_SYM", text: "@bottom-right-corner" },
    { name: "LEFTTOP_SYM", text: "@left-top" },
    { name: "LEFTMIDDLE_SYM", text: "@left-middle" },
    { name: "LEFTBOTTOM_SYM", text: "@left-bottom" },
    { name: "RIGHTTOP_SYM", text: "@right-top" },
    { name: "RIGHTMIDDLE_SYM", text: "@right-middle" },
    { name: "RIGHTBOTTOM_SYM", text: "@right-bottom" },

    /*
     * The following token names are defined in CSS3 Media Queries: https://www.w3.org/TR/css3-mediaqueries/#syntax
     */
    /*{ name: "MEDIA_ONLY", state: "media"},
    { name: "MEDIA_NOT", state: "media"},
    { name: "MEDIA_AND", state: "media"},*/
    { name: "RESOLUTION", state: "media" },

    /*
     * The following token names are not defined in any CSS specification but are used by the lexer.
     */

    // not a real token, but useful for stupid IE filters
    { name: "IE_FUNCTION" },

    // part of CSS3 grammar but not the Flex code
    { name: "CHAR" },

    // TODO: Needed?
    // Not defined as tokens, but might as well be
    {
        name: "PIPE",
        text: "|"
    },
    {
        name: "SLASH",
        text: "/"
    },
    {
        name: "MINUS",
        text: "-"
    },
    {
        name: "STAR",
        text: "*"
    },

    {
        name: "LBRACE",
        endChar: "}",
        text: "{"
    },
    {
        name: "RBRACE",
        text: "}"
    },
    {
        name: "LBRACKET",
        endChar: "]",
        text: "["
    },
    {
        name: "RBRACKET",
        text: "]"
    },
    {
        name: "EQUALS",
        text: "="
    },
    {
        name: "COLON",
        text: ":"
    },
    {
        name: "SEMICOLON",
        text: ";"
    },
    {
        name: "LPAREN",
        endChar: ")",
        text: "("
    },
    {
        name: "RPAREN",
        text: ")"
    },
    {
        name: "DOT",
        text: "."
    }
];

(function() {
    var nameMap = [],
        typeMap = Object.create(null);

    Tokens.UNKNOWN = -1;
    Tokens.unshift({ name:"EOF" });
    for (var i=0, len = Tokens.length; i < len; i++) {
        nameMap.push(Tokens[i].name);
        Tokens[Tokens[i].name] = i;
        if (Tokens[i].text) {
            if (Tokens[i].text instanceof Array) {
                for (var j=0; j < Tokens[i].text.length; j++) {
                    typeMap[Tokens[i].text[j]] = i;
                }
            } else {
                typeMap[Tokens[i].text] = i;
            }
        }
    }

    Tokens.name = function(tt) {
        return nameMap[tt];
    };

    Tokens.type = function(c) {
        return typeMap[c] || -1;
    };
})();
},{}],19:[function(require,module,exports){
"use strict";

/* exported Validation */

var Matcher = require("./Matcher");
var Properties = require("./Properties");
var ValidationTypes = require("./ValidationTypes");
var ValidationError = require("./ValidationError");
var PropertyValueIterator = require("./PropertyValueIterator");

var Validation = module.exports = {

    validate: function(property, value) {

        //normalize name
        var name        = property.toString().toLowerCase(),
            expression  = new PropertyValueIterator(value),
            spec        = Properties[name],
            part;

        if (!spec) {
            if (name.indexOf("-") !== 0) {    //vendor prefixed are ok
                throw new ValidationError("Unknown property '" + property + "'.", property.line, property.col);
            }
        } else if (typeof spec !== "number") {

            // All properties accept some CSS-wide values.
            // https://drafts.csswg.org/css-values-3/#common-keywords
            if (ValidationTypes.isAny(expression, "inherit | initial | unset")) {
                if (expression.hasNext()) {
                    part = expression.next();
                    throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
                }
                return;
            }

            // Property-specific validation.
            this.singleProperty(spec, expression);
        }
    },

    singleProperty: function(types, expression) {

        var result      = false,
            value       = expression.value,
            part;

        result = Matcher.parse(types).match(expression);

        if (!result) {
            if (expression.hasNext() && !expression.isFirst()) {
                part = expression.peek();
                throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
            } else {
                throw new ValidationError("Expected (" + ValidationTypes.describe(types) + ") but found '" + value + "'.", value.line, value.col);
            }
        } else if (expression.hasNext()) {
            part = expression.next();
            throw new ValidationError("Expected end of value but found '" + part + "'.", part.line, part.col);
        }
    }
};
},{"./Matcher":3,"./Properties":7,"./PropertyValueIterator":10,"./ValidationError":20,"./ValidationTypes":21}],20:[function(require,module,exports){
"use strict";

module.exports = ValidationError;

/**
 * Type to use when a validation error occurs.
 * @class ValidationError
 * @namespace parserlib.util
 * @constructor
 * @param {String} message The error message.
 * @param {int} line The line at which the error occurred.
 * @param {int} col The column at which the error occurred.
 */
function ValidationError(message, line, col) {

    /**
     * The column at which the error occurred.
     * @type int
     * @property col
     */
    this.col = col;

    /**
     * The line at which the error occurred.
     * @type int
     * @property line
     */
    this.line = line;

    /**
     * The text representation of the unit.
     * @type String
     * @property text
     */
    this.message = message;
}

//inherit from Error
ValidationError.prototype = new Error();
},{}],21:[function(require,module,exports){
"use strict";

var ValidationTypes = module.exports;

var Matcher = require("./Matcher");

function copy(to, from) {
    Object.keys(from).forEach(function(prop) {
        to[prop] = from[prop];
    });
}
copy(ValidationTypes, {

    isLiteral: function (part, literals) {
        var text = part.text.toString().toLowerCase(),
            args = literals.split(" | "),
            i, len, found = false;

        for (i=0, len=args.length; i < len && !found; i++) {
            if (args[i].charAt(0) === "<") {
                found = this.simple[args[i]](part);
            } else if (args[i].slice(-2) === "()") {
                found = (part.type === "function" &&
                         part.name === args[i].slice(0, -2));
            } else if (text === args[i].toLowerCase()) {
                found = true;
            }
        }

        return found;
    },

    isSimple: function(type) {
        return Boolean(this.simple[type]);
    },

    isComplex: function(type) {
        return Boolean(this.complex[type]);
    },

    describe: function(type) {
        if (this.complex[type] instanceof Matcher) {
            return this.complex[type].toString(0);
        }
        return type;
    },

    /**
     * Determines if the next part(s) of the given expression
     * are any of the given types.
     */
    isAny: function (expression, types) {
        var args = types.split(" | "),
            i, len, found = false;

        for (i=0, len=args.length; i < len && !found && expression.hasNext(); i++) {
            found = this.isType(expression, args[i]);
        }

        return found;
    },

    /**
     * Determines if the next part(s) of the given expression
     * are one of a group.
     */
    isAnyOfGroup: function(expression, types) {
        var args = types.split(" || "),
            i, len, found = false;

        for (i=0, len=args.length; i < len && !found; i++) {
            found = this.isType(expression, args[i]);
        }

        return found ? args[i-1] : false;
    },

    /**
     * Determines if the next part(s) of the given expression
     * are of a given type.
     */
    isType: function (expression, type) {
        var part = expression.peek(),
            result = false;

        if (type.charAt(0) !== "<") {
            result = this.isLiteral(part, type);
            if (result) {
                expression.next();
            }
        } else if (this.simple[type]) {
            result = this.simple[type](part);
            if (result) {
                expression.next();
            }
        } else if (this.complex[type] instanceof Matcher) {
            result = this.complex[type].match(expression);
        } else {
            result = this.complex[type](expression);
        }

        return result;
    },

    simple: {
        __proto__: null,

        "<absolute-size>":
            "xx-small | x-small | small | medium | large | x-large | xx-large",

        "<animateable-feature>":
            "scroll-position | contents | <animateable-feature-name>",

        "<animateable-feature-name>": function(part) {
            return this["<ident>"](part) &&
                !/^(unset|initial|inherit|will-change|auto|scroll-position|contents)$/i.test(part);
        },

        "<angle>": function(part) {
            return part.type === "angle";
        },

        "<attachment>": "scroll | fixed | local",

        "<attr>": "attr()",

        // inset() = inset( <shape-arg>{1,4} [round <border-radius>]? )
        // circle() = circle( [<shape-radius>]? [at <position>]? )
        // ellipse() = ellipse( [<shape-radius>{2}]? [at <position>]? )
        // polygon() = polygon( [<fill-rule>,]? [<shape-arg> <shape-arg>]# )
        "<basic-shape>": "inset() | circle() | ellipse() | polygon()",

        "<bg-image>": "<image> | <gradient> | none",

        "<border-style>":
            "none | hidden | dotted | dashed | solid | double | groove | " +
            "ridge | inset | outset",

        "<border-width>": "<length> | thin | medium | thick",

        "<box>": "padding-box | border-box | content-box",

        "<clip-source>": "<uri>",

        "<color>": function(part) {
            return part.type === "color" || String(part) === "transparent" || String(part) === "currentColor";
        },

        // The SVG <color> spec doesn't include "currentColor" or "transparent" as a color.
        "<color-svg>": function(part) {
            return part.type === "color";
        },

        "<content>": "content()",

        // https://www.w3.org/TR/css3-sizing/#width-height-keywords
        "<content-sizing>":
            "fill-available | -moz-available | -webkit-fill-available | " +
            "max-content | -moz-max-content | -webkit-max-content | " +
            "min-content | -moz-min-content | -webkit-min-content | " +
            "fit-content | -moz-fit-content | -webkit-fit-content",

        "<feature-tag-value>": function(part) {
            return part.type === "function" && /^[A-Z0-9]{4}$/i.test(part);
        },

        // custom() isn't actually in the spec
        "<filter-function>":
            "blur() | brightness() | contrast() | custom() | " +
            "drop-shadow() | grayscale() | hue-rotate() | invert() | " +
            "opacity() | saturate() | sepia()",

        "<flex-basis>": "<width>",

        "<flex-direction>": "row | row-reverse | column | column-reverse",

        "<flex-grow>": "<number>",

        "<flex-shrink>": "<number>",

        "<flex-wrap>": "nowrap | wrap | wrap-reverse",

        "<font-size>":
            "<absolute-size> | <relative-size> | <length> | <percentage>",

        "<font-stretch>":
            "normal | ultra-condensed | extra-condensed | condensed | " +
            "semi-condensed | semi-expanded | expanded | extra-expanded | " +
            "ultra-expanded",

        "<font-style>": "normal | italic | oblique",

        "<font-variant-caps>":
            "small-caps | all-small-caps | petite-caps | all-petite-caps | " +
            "unicase | titling-caps",

        "<font-variant-css21>": "normal | small-caps",

        "<font-weight>":
            "normal | bold | bolder | lighter | " +
            "100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900",

        "<generic-family>":
            "serif | sans-serif | cursive | fantasy | monospace",

        "<geometry-box>": "<shape-box> | fill-box | stroke-box | view-box",

        "<glyph-angle>": function(part) {
            return part.type === "angle" && part.units === "deg";
        },

        "<gradient>": function(part) {
            return part.type === "function" && /^(?:\-(?:ms|moz|o|webkit)\-)?(?:repeating\-)?(?:radial\-|linear\-)?gradient/i.test(part);
        },

        "<icccolor>":
            "cielab() | cielch() | cielchab() | " +
            "icc-color() | icc-named-color()",

        //any identifier
        "<ident>": function(part) {
            return part.type === "identifier" || part.wasIdent;
        },

        "<ident-not-generic-family>": function(part) {
            return this["<ident>"](part) && !this["<generic-family>"](part);
        },

        "<image>": "<uri>",

        "<integer>": function(part) {
            return part.type === "integer";
        },

        "<length>": function(part) {
            if (part.type === "function" && /^(?:\-(?:ms|moz|o|webkit)\-)?calc/i.test(part)) {
                return true;
            } else {
                return part.type === "length" || part.type === "number" || part.type === "integer" || String(part) === "0";
            }
        },

        "<line>": function(part) {
            return part.type === "integer";
        },

        "<line-height>": "<number> | <length> | <percentage> | normal",

        "<margin-width>": "<length> | <percentage> | auto",

        "<miterlimit>": function(part) {
            return this["<number>"](part) && part.value >= 1;
        },

        "<nonnegative-length-or-percentage>": function(part) {
            return (this["<length>"](part) || this["<percentage>"](part)) &&
                (String(part) === "0" || part.type === "function" || (part.value) >= 0);
        },

        "<nonnegative-number-or-percentage>": function(part) {
            return (this["<number>"](part) || this["<percentage>"](part)) &&
                (String(part) === "0" || part.type === "function" || (part.value) >= 0);
        },

        "<number>": function(part) {
            return part.type === "number" || this["<integer>"](part);
        },

        "<opacity-value>": function(part) {
            return this["<number>"](part) && part.value >= 0 && part.value <= 1;
        },

        "<padding-width>": "<nonnegative-length-or-percentage>",

        "<percentage>": function(part) {
            return part.type === "percentage" || String(part) === "0";
        },

        "<relative-size>": "smaller | larger",

        "<shape>": "rect() | inset-rect()",

        "<shape-box>": "<box> | margin-box",

        "<single-animation-direction>":
            "normal | reverse | alternate | alternate-reverse",

        "<single-animation-name>": function(part) {
            return this["<ident>"](part) &&
                /^-?[a-z_][-a-z0-9_]+$/i.test(part) &&
                !/^(none|unset|initial|inherit)$/i.test(part);
        },

        "<string>": function(part) {
            return part.type === "string";
        },

        "<time>": function(part) {
            return part.type === "time";
        },

        "<uri>": function(part) {
            return part.type === "uri";
        },

        "<width>": "<margin-width>"
    },

    complex: {
        __proto__: null,

        "<azimuth>":
            "<angle>" +
            " | " +
            "[ [ left-side | far-left | left | center-left | center | " +
            "center-right | right | far-right | right-side ] || behind ]" +
            " | "+
            "leftwards | rightwards",

        "<bg-position>": "<position>#",

        "<bg-size>":
            "[ <length> | <percentage> | auto ]{1,2} | cover | contain",

        "<border-image-slice>":
        // [<number> | <percentage>]{1,4} && fill?
        // *but* fill can appear between any of the numbers
        Matcher.many([true /* first element is required */],
                     Matcher.cast("<nonnegative-number-or-percentage>"),
                     Matcher.cast("<nonnegative-number-or-percentage>"),
                     Matcher.cast("<nonnegative-number-or-percentage>"),
                     Matcher.cast("<nonnegative-number-or-percentage>"),
                     "fill"),

        "<border-radius>":
            "<nonnegative-length-or-percentage>{1,4} " +
            "[ / <nonnegative-length-or-percentage>{1,4} ]?",

        "<box-shadow>": "none | <shadow>#",

        "<clip-path>": "<basic-shape> || <geometry-box>",

        "<dasharray>":
        // "list of comma and/or white space separated <length>s and
        // <percentage>s".  There is a non-negative constraint.
        Matcher.cast("<nonnegative-length-or-percentage>")
            .braces(1, Infinity, "#", Matcher.cast(",").question()),

        "<family-name>":
            // <string> | <IDENT>+
            "<string> | <ident-not-generic-family> <ident>*",

        "<filter-function-list>": "[ <filter-function> | <uri> ]+",

        // https://www.w3.org/TR/2014/WD-css-flexbox-1-20140325/#flex-property
        "<flex>":
            "none | [ <flex-grow> <flex-shrink>? || <flex-basis> ]",

        "<font-family>": "[ <generic-family> | <family-name> ]#",

        "<font-shorthand>":
            "[ <font-style> || <font-variant-css21> || " +
            "<font-weight> || <font-stretch> ]? <font-size> " +
            "[ / <line-height> ]? <font-family>",

        "<font-variant-alternates>":
            // stylistic(<feature-value-name>)
            "stylistic() || " +
            "historical-forms || " +
            // styleset(<feature-value-name> #)
            "styleset() || " +
            // character-variant(<feature-value-name> #)
            "character-variant() || " +
            // swash(<feature-value-name>)
            "swash() || " +
            // ornaments(<feature-value-name>)
            "ornaments() || " +
            // annotation(<feature-value-name>)
            "annotation()",

        "<font-variant-ligatures>":
            // <common-lig-values>
            "[ common-ligatures | no-common-ligatures ] || " +
            // <discretionary-lig-values>
            "[ discretionary-ligatures | no-discretionary-ligatures ] || " +
            // <historical-lig-values>
            "[ historical-ligatures | no-historical-ligatures ] || " +
            // <contextual-alt-values>
            "[ contextual | no-contextual ]",

        "<font-variant-numeric>":
            // <numeric-figure-values>
            "[ lining-nums | oldstyle-nums ] || " +
            // <numeric-spacing-values>
            "[ proportional-nums | tabular-nums ] || " +
            // <numeric-fraction-values>
            "[ diagonal-fractions | stacked-fractions ] || " +
            "ordinal || slashed-zero",

        "<font-variant-east-asian>":
            // <east-asian-variant-values>
            "[ jis78 | jis83 | jis90 | jis04 | simplified | traditional ] || " +
            // <east-asian-width-values>
            "[ full-width | proportional-width ] || " +
            "ruby",

        // Note that <color> here is "as defined in the SVG spec", which
        // is more restrictive that the <color> defined in the CSS spec.
        // none | currentColor | <color> [<icccolor>]? |
        // <funciri> [ none | currentColor | <color> [<icccolor>]? ]?
        "<paint>": "<paint-basic> | <uri> <paint-basic>?",

        // Helper definition for <paint> above.
        "<paint-basic>": "none | currentColor | <color-svg> <icccolor>?",

        "<position>":
            // Because our `alt` combinator is ordered, we need to test these
            // in order from longest possible match to shortest.
            "[ center | [ left | right ] [ <percentage> | <length> ]? ] && " +
            "[ center | [ top | bottom ] [ <percentage> | <length> ]? ]" +
            " | " +
            "[ left | center | right | <percentage> | <length> ] " +
            "[ top | center | bottom | <percentage> | <length> ]" +
            " | " +
            "[ left | center | right | top | bottom | <percentage> | <length> ]",

        "<repeat-style>":
            "repeat-x | repeat-y | [ repeat | space | round | no-repeat ]{1,2}",

        "<shadow>":
        //inset? && [ <length>{2,4} && <color>? ]
        Matcher.many([true /* length is required */],
                     Matcher.cast("<length>").braces(2, 4), "inset", "<color>"),

        "<text-decoration-color>":
           "<color>",

        "<text-decoration-line>":
            "none | [ underline || overline || line-through || blink ]",

        "<text-decoration-style>":
            "solid | double | dotted | dashed | wavy",

        "<will-change>":
            "auto | <animateable-feature>#",

        "<x-one-radius>":
            //[ <length> | <percentage> ] [ <length> | <percentage> ]?
            "[ <length> | <percentage> ]{1,2}"
    }
});

Object.keys(ValidationTypes.simple).forEach(function(nt) {
    var rule = ValidationTypes.simple[nt];
    if (typeof rule === "string") {
        ValidationTypes.simple[nt] = function(part) {
            return ValidationTypes.isLiteral(part, rule);
        };
    }
});

Object.keys(ValidationTypes.complex).forEach(function(nt) {
    var rule = ValidationTypes.complex[nt];
    if (typeof rule === "string") {
        ValidationTypes.complex[nt] = Matcher.parse(rule);
    }
});

// Because this is defined relative to other complex validation types,
// we need to define it *after* the rest of the types are initialized.
ValidationTypes.complex["<font-variant>"] =
    Matcher.oror({ expand: "<font-variant-ligatures>" },
                 { expand: "<font-variant-alternates>" },
                 "<font-variant-caps>",
                 { expand: "<font-variant-numeric>" },
                 { expand: "<font-variant-east-asian>" });
},{"./Matcher":3}],22:[function(require,module,exports){
"use strict";

module.exports = {
    Colors            : require("./Colors"),
    Combinator        : require("./Combinator"),
    Parser            : require("./Parser"),
    PropertyName      : require("./PropertyName"),
    PropertyValue     : require("./PropertyValue"),
    PropertyValuePart : require("./PropertyValuePart"),
    Matcher           : require("./Matcher"),
    MediaFeature      : require("./MediaFeature"),
    MediaQuery        : require("./MediaQuery"),
    Selector          : require("./Selector"),
    SelectorPart      : require("./SelectorPart"),
    SelectorSubPart   : require("./SelectorSubPart"),
    Specificity       : require("./Specificity"),
    TokenStream       : require("./TokenStream"),
    Tokens            : require("./Tokens"),
    ValidationError   : require("./ValidationError")
};
},{"./Colors":1,"./Combinator":2,"./Matcher":3,"./MediaFeature":4,"./MediaQuery":5,"./Parser":6,"./PropertyName":8,"./PropertyValue":9,"./PropertyValuePart":11,"./Selector":13,"./SelectorPart":14,"./SelectorSubPart":15,"./Specificity":16,"./TokenStream":17,"./Tokens":18,"./ValidationError":20}],23:[function(require,module,exports){
"use strict";

module.exports = EventTarget;

/**
 * A generic base to inherit from for any object
 * that needs event handling.
 * @class EventTarget
 * @constructor
 */
function EventTarget() {

    /**
     * The array of listeners for various events.
     * @type Object
     * @property _listeners
     * @private
     */
    this._listeners = Object.create(null);
}

EventTarget.prototype = {

    //restore constructor
    constructor: EventTarget,

    /**
     * Adds a listener for a given event type.
     * @param {String} type The type of event to add a listener for.
     * @param {Function} listener The function to call when the event occurs.
     * @return {void}
     * @method addListener
     */
    addListener: function(type, listener) {
        if (!this._listeners[type]) {
            this._listeners[type] = [];
        }

        this._listeners[type].push(listener);
    },

    /**
     * Fires an event based on the passed-in object.
     * @param {Object|String} event An object with at least a 'type' attribute
     *      or a string indicating the event name.
     * @return {void}
     * @method fire
     */
    fire: function(event) {
        if (typeof event === "string") {
            event = { type: event };
        }
        if (typeof event.target !== "undefined") {
            event.target = this;
        }

        if (typeof event.type === "undefined") {
            throw new Error("Event object missing 'type' property.");
        }

        if (this._listeners[event.type]) {

            //create a copy of the array and use that so listeners can't chane
            var listeners = this._listeners[event.type].concat();
            for (var i=0, len=listeners.length; i < len; i++) {
                listeners[i].call(this, event);
            }
        }
    },

    /**
     * Removes a listener for a given event type.
     * @param {String} type The type of event to remove a listener from.
     * @param {Function} listener The function to remove from the event.
     * @return {void}
     * @method removeListener
     */
    removeListener: function(type, listener) {
        if (this._listeners[type]) {
            var listeners = this._listeners[type];
            for (var i=0, len=listeners.length; i < len; i++) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }
};
},{}],24:[function(require,module,exports){
"use strict";

module.exports = StringReader;

/**
 * Convenient way to read through strings.
 * @namespace parserlib.util
 * @class StringReader
 * @constructor
 * @param {String} text The text to read.
 */
function StringReader(text) {

    /**
     * The input text with line endings normalized.
     * @property _input
     * @type String
     * @private
     */
    this._input = text.replace(/(\r\n?|\n)/g, "\n");

    /**
     * The row for the character to be read next.
     * @property _line
     * @type int
     * @private
     */
    this._line = 1;

    /**
     * The column for the character to be read next.
     * @property _col
     * @type int
     * @private
     */
    this._col = 1;

    /**
     * The index of the character in the input to be read next.
     * @property _cursor
     * @type int
     * @private
     */
    this._cursor = 0;
}

StringReader.prototype = {

    // restore constructor
    constructor: StringReader,

    //-------------------------------------------------------------------------
    // Position info
    //-------------------------------------------------------------------------

    /**
     * Returns the column of the character to be read next.
     * @return {int} The column of the character to be read next.
     * @method getCol
     */
    getCol: function() {
        return this._col;
    },

    /**
     * Returns the row of the character to be read next.
     * @return {int} The row of the character to be read next.
     * @method getLine
     */
    getLine: function() {
        return this._line;
    },

    /**
     * Determines if you're at the end of the input.
     * @return {Boolean} True if there's no more input, false otherwise.
     * @method eof
     */
    eof: function() {
        return this._cursor === this._input.length;
    },

    //-------------------------------------------------------------------------
    // Basic reading
    //-------------------------------------------------------------------------

    /**
     * Reads the next character without advancing the cursor.
     * @param {int} count How many characters to look ahead (default is 1).
     * @return {String} The next character or null if there is no next character.
     * @method peek
     */
    peek: function(count) {
        var c = null;
        count = typeof count === "undefined" ? 1 : count;

        // if we're not at the end of the input...
        if (this._cursor < this._input.length) {

            // get character and increment cursor and column
            c = this._input.charAt(this._cursor + count - 1);
        }

        return c;
    },

    /**
     * Reads the next character from the input and adjusts the row and column
     * accordingly.
     * @return {String} The next character or null if there is no next character.
     * @method read
     */
    read: function() {
        var c = null;

        // if we're not at the end of the input...
        if (this._cursor < this._input.length) {

            // if the last character was a newline, increment row count
            // and reset column count
            if (this._input.charAt(this._cursor) === "\n") {
                this._line++;
                this._col=1;
            } else {
                this._col++;
            }

            // get character and increment cursor and column
            c = this._input.charAt(this._cursor++);
        }

        return c;
    },

    //-------------------------------------------------------------------------
    // Misc
    //-------------------------------------------------------------------------

    /**
     * Saves the current location so it can be returned to later.
     * @method mark
     * @return {void}
     */
    mark: function() {
        this._bookmark = {
            cursor: this._cursor,
            line:   this._line,
            col:    this._col
        };
    },

    reset: function() {
        if (this._bookmark) {
            this._cursor = this._bookmark.cursor;
            this._line = this._bookmark.line;
            this._col = this._bookmark.col;
            delete this._bookmark;
        }
    },

    //-------------------------------------------------------------------------
    // Advanced reading
    //-------------------------------------------------------------------------

    /**
     * Reads up to and including the given string. Throws an error if that
     * string is not found.
     * @param {String} pattern The string to read.
     * @return {String} The string when it is found.
     * @throws Error when the string pattern is not found.
     * @method readTo
     */
    readTo: function(pattern) {

        var buffer = "",
            c;

        /*
         * First, buffer must be the same length as the pattern.
         * Then, buffer must end with the pattern or else reach the
         * end of the input.
         */
        while (buffer.length < pattern.length || buffer.lastIndexOf(pattern) !== buffer.length - pattern.length) {
            c = this.read();
            if (c) {
                buffer += c;
            } else {
                throw new Error("Expected \"" + pattern + "\" at line " + this._line  + ", col " + this._col + ".");
            }
        }

        return buffer;
    },

    /**
     * Reads characters while each character causes the given
     * filter function to return true. The function is passed
     * in each character and either returns true to continue
     * reading or false to stop.
     * @param {Function} filter The function to read on each character.
     * @return {String} The string made up of all characters that passed the
     *      filter check.
     * @method readWhile
     */
    readWhile: function(filter) {

        var buffer = "",
            c = this.peek();

        while (c !== null && filter(c)) {
            buffer += this.read();
            c = this.peek();
        }

        return buffer;
    },

    /**
     * Reads characters that match either text or a regular expression and
     * returns those characters. If a match is found, the row and column
     * are adjusted; if no match is found, the reader's state is unchanged.
     * reading or false to stop.
     * @param {String|RegExp} matcher If a string, then the literal string
     *      value is searched for. If a regular expression, then any string
     *      matching the pattern is search for.
     * @return {String} The string made up of all characters that matched or
     *      null if there was no match.
     * @method readMatch
     */
    readMatch: function(matcher) {

        var source = this._input.substring(this._cursor),
            value = null;

        // if it's a string, just do a straight match
        if (typeof matcher === "string") {
            if (source.slice(0, matcher.length) === matcher) {
                value = this.readCount(matcher.length);
            }
        } else if (matcher instanceof RegExp) {
            if (matcher.test(source)) {
                value = this.readCount(RegExp.lastMatch.length);
            }
        }

        return value;
    },

    /**
     * Reads a given number of characters. If the end of the input is reached,
     * it reads only the remaining characters and does not throw an error.
     * @param {int} count The number of characters to read.
     * @return {String} The string made up the read characters.
     * @method readCount
     */
    readCount: function(count) {
        var buffer = "";

        while (count--) {
            buffer += this.read();
        }

        return buffer;
    }
};
},{}],25:[function(require,module,exports){
"use strict";

module.exports = SyntaxError;

/**
 * Type to use when a syntax error occurs.
 * @class SyntaxError
 * @namespace parserlib.util
 * @constructor
 * @param {String} message The error message.
 * @param {int} line The line at which the error occurred.
 * @param {int} col The column at which the error occurred.
 */
function SyntaxError(message, line, col) {
    Error.call(this);
    this.name = this.constructor.name;

    /**
     * The column at which the error occurred.
     * @type int
     * @property col
     */
    this.col = col;

    /**
     * The line at which the error occurred.
     * @type int
     * @property line
     */
    this.line = line;

    /**
     * The text representation of the unit.
     * @type String
     * @property text
     */
    this.message = message;
}

//inherit from Error
SyntaxError.prototype = Object.create(Error.prototype); // jshint ignore:line
SyntaxError.prototype.constructor = SyntaxError; // jshint ignore:line
},{}],26:[function(require,module,exports){
"use strict";

module.exports = SyntaxUnit;

/**
 * Base type to represent a single syntactic unit.
 * @class SyntaxUnit
 * @namespace parserlib.util
 * @constructor
 * @param {String} text The text of the unit.
 * @param {int} line The line of text on which the unit resides.
 * @param {int} col The column of text on which the unit resides.
 */
function SyntaxUnit(text, line, col, type) {

    /**
     * The column of text on which the unit resides.
     * @type int
     * @property col
     */
    this.col = col;

    /**
     * The line of text on which the unit resides.
     * @type int
     * @property line
     */
    this.line = line;

    /**
     * The text representation of the unit.
     * @type String
     * @property text
     */
    this.text = text;

    /**
     * The type of syntax unit.
     * @type int
     * @property type
     */
    this.type = type;
}

/**
 * Create a new syntax unit based solely on the given token.
 * Convenience method for creating a new syntax unit when
 * it represents a single token instead of multiple.
 * @param {Object} token The token object to represent.
 * @return {parserlib.util.SyntaxUnit} The object representing the token.
 * @static
 * @method fromToken
 */
SyntaxUnit.fromToken = function(token) {
    return new SyntaxUnit(token.value, token.startLine, token.startCol);
};

SyntaxUnit.prototype = {

    //restore constructor
    constructor: SyntaxUnit,

    /**
     * Returns the text representation of the unit.
     * @return {String} The text representation of the unit.
     * @method valueOf
     */
    valueOf: function() {
        return this.toString();
    },

    /**
     * Returns the text representation of the unit.
     * @return {String} The text representation of the unit.
     * @method toString
     */
    toString: function() {
        return this.text;
    }
};
},{}],27:[function(require,module,exports){
"use strict";

module.exports = TokenStreamBase;

var StringReader = require("./StringReader");
var SyntaxError = require("./SyntaxError");

/**
 * Generic TokenStream providing base functionality.
 * @class TokenStreamBase
 * @namespace parserlib.util
 * @constructor
 * @param {String|StringReader} input The text to tokenize or a reader from
 *      which to read the input.
 */
function TokenStreamBase(input, tokenData) {

    /**
     * The string reader for easy access to the text.
     * @type StringReader
     * @property _reader
     * @private
     */
    this._reader = new StringReader(input ? input.toString() : "");

    /**
     * Token object for the last consumed token.
     * @type Token
     * @property _token
     * @private
     */
    this._token = null;

    /**
     * The array of token information.
     * @type Array
     * @property _tokenData
     * @private
     */
    this._tokenData = tokenData;

    /**
     * Lookahead token buffer.
     * @type Array
     * @property _lt
     * @private
     */
    this._lt = [];

    /**
     * Lookahead token buffer index.
     * @type int
     * @property _ltIndex
     * @private
     */
    this._ltIndex = 0;

    this._ltIndexCache = [];
}

/**
 * Accepts an array of token information and outputs
 * an array of token data containing key-value mappings
 * and matching functions that the TokenStream needs.
 * @param {Array} tokens An array of token descriptors.
 * @return {Array} An array of processed token data.
 * @method createTokenData
 * @static
 */
TokenStreamBase.createTokenData = function(tokens) {

    var nameMap     = [],
        typeMap     = Object.create(null),
        tokenData     = tokens.concat([]),
        i            = 0,
        len            = tokenData.length+1;

    tokenData.UNKNOWN = -1;
    tokenData.unshift({ name:"EOF" });

    for (; i < len; i++) {
        nameMap.push(tokenData[i].name);
        tokenData[tokenData[i].name] = i;
        if (tokenData[i].text) {
            typeMap[tokenData[i].text] = i;
        }
    }

    tokenData.name = function(tt) {
        return nameMap[tt];
    };

    tokenData.type = function(c) {
        return typeMap[c];
    };

    return tokenData;
};

TokenStreamBase.prototype = {

    //restore constructor
    constructor: TokenStreamBase,

    //-------------------------------------------------------------------------
    // Matching methods
    //-------------------------------------------------------------------------

    /**
     * Determines if the next token matches the given token type.
     * If so, that token is consumed; if not, the token is placed
     * back onto the token stream. You can pass in any number of
     * token types and this will return true if any of the token
     * types is found.
     * @param {int|int[]} tokenTypes Either a single token type or an array of
     *      token types that the next token might be. If an array is passed,
     *      it's assumed that the token can be any of these.
     * @param {variant} channel (Optional) The channel to read from. If not
     *      provided, reads from the default (unnamed) channel.
     * @return {Boolean} True if the token type matches, false if not.
     * @method match
     */
    match: function(tokenTypes, channel) {

        //always convert to an array, makes things easier
        if (!(tokenTypes instanceof Array)) {
            tokenTypes = [tokenTypes];
        }

        var tt  = this.get(channel),
            i   = 0,
            len = tokenTypes.length;

        while (i < len) {
            if (tt === tokenTypes[i++]) {
                return true;
            }
        }

        //no match found, put the token back
        this.unget();
        return false;
    },

    /**
     * Determines if the next token matches the given token type.
     * If so, that token is consumed; if not, an error is thrown.
     * @param {int|int[]} tokenTypes Either a single token type or an array of
     *      token types that the next token should be. If an array is passed,
     *      it's assumed that the token must be one of these.
     * @return {void}
     * @method mustMatch
     */
    mustMatch: function(tokenTypes) {

        var token;

        //always convert to an array, makes things easier
        if (!(tokenTypes instanceof Array)) {
            tokenTypes = [tokenTypes];
        }

        if (!this.match.apply(this, arguments)) {
            token = this.LT(1);
            throw new SyntaxError("Expected " + this._tokenData[tokenTypes[0]].name +
                " at line " + token.startLine + ", col " + token.startCol + ".", token.startLine, token.startCol);
        }
    },

    //-------------------------------------------------------------------------
    // Consuming methods
    //-------------------------------------------------------------------------

    /**
     * Keeps reading from the token stream until either one of the specified
     * token types is found or until the end of the input is reached.
     * @param {int|int[]} tokenTypes Either a single token type or an array of
     *      token types that the next token should be. If an array is passed,
     *      it's assumed that the token must be one of these.
     * @param {variant} channel (Optional) The channel to read from. If not
     *      provided, reads from the default (unnamed) channel.
     * @return {void}
     * @method advance
     */
    advance: function(tokenTypes, channel) {

        while (this.LA(0) !== 0 && !this.match(tokenTypes, channel)) {
            this.get();
        }

        return this.LA(0);
    },

    /**
     * Consumes the next token from the token stream.
     * @return {int} The token type of the token that was just consumed.
     * @method get
     */
    get: function(channel) {

        var tokenInfo   = this._tokenData,
            i           =0,
            token,
            info;

        //check the lookahead buffer first
        if (this._lt.length && this._ltIndex >= 0 && this._ltIndex < this._lt.length) {

            i++;
            this._token = this._lt[this._ltIndex++];
            info = tokenInfo[this._token.type];

            //obey channels logic
            while ((info.channel !== undefined && channel !== info.channel) &&
                    this._ltIndex < this._lt.length) {
                this._token = this._lt[this._ltIndex++];
                info = tokenInfo[this._token.type];
                i++;
            }

            //here be dragons
            if ((info.channel === undefined || channel === info.channel) &&
                    this._ltIndex <= this._lt.length) {
                this._ltIndexCache.push(i);
                return this._token.type;
            }
        }

        //call token retriever method
        token = this._getToken();

        //if it should be hidden, don't save a token
        if (token.type > -1 && !tokenInfo[token.type].hide) {

            //apply token channel
            token.channel = tokenInfo[token.type].channel;

            //save for later
            this._token = token;
            this._lt.push(token);

            //save space that will be moved (must be done before array is truncated)
            this._ltIndexCache.push(this._lt.length - this._ltIndex + i);

            //keep the buffer under 5 items
            if (this._lt.length > 5) {
                this._lt.shift();
            }

            //also keep the shift buffer under 5 items
            if (this._ltIndexCache.length > 5) {
                this._ltIndexCache.shift();
            }

            //update lookahead index
            this._ltIndex = this._lt.length;
        }

        /*
         * Skip to the next token if:
         * 1. The token type is marked as hidden.
         * 2. The token type has a channel specified and it isn't the current channel.
         */
        info = tokenInfo[token.type];
        if (info &&
                (info.hide ||
                (info.channel !== undefined && channel !== info.channel))) {
            return this.get(channel);
        } else {
            //return just the type
            return token.type;
        }
    },

    /**
     * Looks ahead a certain number of tokens and returns the token type at
     * that position. This will throw an error if you lookahead past the
     * end of input, past the size of the lookahead buffer, or back past
     * the first token in the lookahead buffer.
     * @param {int} The index of the token type to retrieve. 0 for the
     *      current token, 1 for the next, -1 for the previous, etc.
     * @return {int} The token type of the token in the given position.
     * @method LA
     */
    LA: function(index) {
        var total = index,
            tt;
        if (index > 0) {
            //TODO: Store 5 somewhere
            if (index > 5) {
                throw new Error("Too much lookahead.");
            }

            //get all those tokens
            while (total) {
                tt = this.get();
                total--;
            }

            //unget all those tokens
            while (total < index) {
                this.unget();
                total++;
            }
        } else if (index < 0) {

            if (this._lt[this._ltIndex+index]) {
                tt = this._lt[this._ltIndex+index].type;
            } else {
                throw new Error("Too much lookbehind.");
            }
        } else {
            tt = this._token.type;
        }

        return tt;
    },

    /**
     * Looks ahead a certain number of tokens and returns the token at
     * that position. This will throw an error if you lookahead past the
     * end of input, past the size of the lookahead buffer, or back past
     * the first token in the lookahead buffer.
     * @param {int} The index of the token type to retrieve. 0 for the
     *      current token, 1 for the next, -1 for the previous, etc.
     * @return {Object} The token of the token in the given position.
     * @method LA
     */
    LT: function(index) {

        //lookahead first to prime the token buffer
        this.LA(index);

        //now find the token, subtract one because _ltIndex is already at the next index
        return this._lt[this._ltIndex+index-1];
    },

    /**
     * Returns the token type for the next token in the stream without
     * consuming it.
     * @return {int} The token type of the next token in the stream.
     * @method peek
     */
    peek: function() {
        return this.LA(1);
    },

    /**
     * Returns the actual token object for the last consumed token.
     * @return {Token} The token object for the last consumed token.
     * @method token
     */
    token: function() {
        return this._token;
    },

    /**
     * Returns the name of the token for the given token type.
     * @param {int} tokenType The type of token to get the name of.
     * @return {String} The name of the token or "UNKNOWN_TOKEN" for any
     *      invalid token type.
     * @method tokenName
     */
    tokenName: function(tokenType) {
        if (tokenType < 0 || tokenType > this._tokenData.length) {
            return "UNKNOWN_TOKEN";
        } else {
            return this._tokenData[tokenType].name;
        }
    },

    /**
     * Returns the token type value for the given token name.
     * @param {String} tokenName The name of the token whose value should be returned.
     * @return {int} The token type value for the given token name or -1
     *      for an unknown token.
     * @method tokenName
     */
    tokenType: function(tokenName) {
        return this._tokenData[tokenName] || -1;
    },

    /**
     * Returns the last consumed token to the token stream.
     * @method unget
     */
    unget: function() {
        //if (this._ltIndex > -1) {
        if (this._ltIndexCache.length) {
            this._ltIndex -= this._ltIndexCache.pop();//--;
            this._token = this._lt[this._ltIndex - 1];
        } else {
            throw new Error("Too much lookahead.");
        }
    }
};
},{"./StringReader":24,"./SyntaxError":25}],28:[function(require,module,exports){
"use strict";

module.exports = {
    StringReader    : require("./StringReader"),
    SyntaxError     : require("./SyntaxError"),
    SyntaxUnit      : require("./SyntaxUnit"),
    EventTarget     : require("./EventTarget"),
    TokenStreamBase : require("./TokenStreamBase")
};
},{"./EventTarget":23,"./StringReader":24,"./SyntaxError":25,"./SyntaxUnit":26,"./TokenStreamBase":27}],"parserlib":[function(require,module,exports){
"use strict";

module.exports = {
    css  : require("./css"),
    util : require("./util")
};
},{"./css":22,"./util":28}]},{},[]);

return require('parserlib');
})();
var clone = (function() {
'use strict';

var nativeMap;
try {
  nativeMap = Map;
} catch(_) {
  // maybe a reference error because no `Map`. Give it a dummy value that no
  // value will ever be an instanceof.
  nativeMap = function() {};
}

var nativeSet;
try {
  nativeSet = Set;
} catch(_) {
  nativeSet = function() {};
}

var nativePromise;
try {
  nativePromise = Promise;
} catch(_) {
  nativePromise = function() {};
}

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
 * @param `includeNonEnumerable` - set to true if the non-enumerable properties
 *    should be cloned as well. Non-enumerable properties on the prototype
 *    chain will be ignored. (optional - false by default)
*/
function clone(parent, circular, depth, prototype, includeNonEnumerable) {
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    includeNonEnumerable = circular.includeNonEnumerable;
    circular = circular.circular;
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    circular = true;

  if (typeof depth == 'undefined')
    depth = Infinity;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      return null;

    if (depth === 0)
      return parent;

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (parent instanceof nativeMap) {
      child = new nativeMap();
    } else if (parent instanceof nativeSet) {
      child = new nativeSet();
    } else if (parent instanceof nativePromise) {
      child = new nativePromise(function (resolve, reject) {
        parent.then(function(value) {
          resolve(_clone(value, depth - 1));
        }, function(err) {
          reject(_clone(err, depth - 1));
        });
      });
    } else if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      child = new Buffer(parent.length);
      parent.copy(child);
      return child;
    } else if (parent instanceof Error) {
      child = Object.create(parent);
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    if (parent instanceof nativeMap) {
      var keyIterator = parent.keys();
      while(true) {
        var next = keyIterator.next();
        if (next.done) {
          break;
        }
        var keyChild = _clone(next.value, depth - 1);
        var valueChild = _clone(parent.get(next.value), depth - 1);
        child.set(keyChild, valueChild);
      }
    }
    if (parent instanceof nativeSet) {
      var iterator = parent.keys();
      while(true) {
        var next = iterator.next();
        if (next.done) {
          break;
        }
        var entryChild = _clone(next.value, depth - 1);
        child.add(entryChild);
      }
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(parent);
      for (var i = 0; i < symbols.length; i++) {
        // Don't need to worry about cloning a symbol because it is a primitive,
        // like a number or string.
        var symbol = symbols[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
        if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
          continue;
        }
        child[symbol] = _clone(parent[symbol], depth - 1);
        if (!descriptor.enumerable) {
          Object.defineProperty(child, symbol, {
            enumerable: false
          });
        }
      }
    }

    if (includeNonEnumerable) {
      var allPropertyNames = Object.getOwnPropertyNames(parent);
      for (var i = 0; i < allPropertyNames.length; i++) {
        var propertyName = allPropertyNames[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
        if (descriptor && descriptor.enumerable) {
          continue;
        }
        child[propertyName] = _clone(parent[propertyName], depth - 1);
        Object.defineProperty(child, propertyName, {
          enumerable: false
        });
      }
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
}
clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
}
clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
}
clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
}
clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
}
clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if (typeof module === 'object' && module.exports) {
  module.exports = clone;
}

/**
 * Main CSSLint object.
 * @class CSSLint
 * @static
 * @extends parserlib.util.EventTarget
 */

/* global parserlib, clone, Reporter */
/* exported CSSLint */

var CSSLint = (function() {
    "use strict";

    var rules           = [],
        formatters      = [],
        embeddedRuleset = /\/\*\s*csslint([^\*]*)\*\//,
        api             = new parserlib.util.EventTarget();

    api.version = "1.0.4";

    //-------------------------------------------------------------------------
    // Rule Management
    //-------------------------------------------------------------------------

    /**
     * Adds a new rule to the engine.
     * @param {Object} rule The rule to add.
     * @method addRule
     */
    api.addRule = function(rule) {
        rules.push(rule);
        rules[rule.id] = rule;
    };

    /**
     * Clears all rule from the engine.
     * @method clearRules
     */
    api.clearRules = function() {
        rules = [];
    };

    /**
     * Returns the rule objects.
     * @return An array of rule objects.
     * @method getRules
     */
    api.getRules = function() {
        return [].concat(rules).sort(function(a, b) {
            return a.id > b.id ? 1 : 0;
        });
    };

    /**
     * Returns a ruleset configuration object with all current rules.
     * @return A ruleset object.
     * @method getRuleset
     */
    api.getRuleset = function() {
        var ruleset = {},
            i = 0,
            len = rules.length;

        while (i < len) {
            ruleset[rules[i++].id] = 1;    // by default, everything is a warning
        }

        return ruleset;
    };

    /**
     * Returns a ruleset object based on embedded rules.
     * @param {String} text A string of css containing embedded rules.
     * @param {Object} ruleset A ruleset object to modify.
     * @return {Object} A ruleset object.
     * @method getEmbeddedRuleset
     */
    function applyEmbeddedRuleset(text, ruleset) {
        var valueMap,
            embedded = text && text.match(embeddedRuleset),
            rules = embedded && embedded[1];

        if (rules) {
            valueMap = {
                "true": 2,  // true is error
                "": 1,      // blank is warning
                "false": 0, // false is ignore

                "2": 2,     // explicit error
                "1": 1,     // explicit warning
                "0": 0      // explicit ignore
            };

            rules.toLowerCase().split(",").forEach(function(rule) {
                var pair = rule.split(":"),
                    property = pair[0] || "",
                    value = pair[1] || "";

                ruleset[property.trim()] = valueMap[value.trim()];
            });
        }

        return ruleset;
    }

    //-------------------------------------------------------------------------
    // Formatters
    //-------------------------------------------------------------------------

    /**
     * Adds a new formatter to the engine.
     * @param {Object} formatter The formatter to add.
     * @method addFormatter
     */
    api.addFormatter = function(formatter) {
        // formatters.push(formatter);
        formatters[formatter.id] = formatter;
    };

    /**
     * Retrieves a formatter for use.
     * @param {String} formatId The name of the format to retrieve.
     * @return {Object} The formatter or undefined.
     * @method getFormatter
     */
    api.getFormatter = function(formatId) {
        return formatters[formatId];
    };

    /**
     * Formats the results in a particular format for a single file.
     * @param {Object} result The results returned from CSSLint.verify().
     * @param {String} filename The filename for which the results apply.
     * @param {String} formatId The name of the formatter to use.
     * @param {Object} options (Optional) for special output handling.
     * @return {String} A formatted string for the results.
     * @method format
     */
    api.format = function(results, filename, formatId, options) {
        var formatter = this.getFormatter(formatId),
            result = null;

        if (formatter) {
            result = formatter.startFormat();
            result += formatter.formatResults(results, filename, options || {});
            result += formatter.endFormat();
        }

        return result;
    };

    /**
     * Indicates if the given format is supported.
     * @param {String} formatId The ID of the format to check.
     * @return {Boolean} True if the format exists, false if not.
     * @method hasFormat
     */
    api.hasFormat = function(formatId) {
        return formatters.hasOwnProperty(formatId);
    };

    //-------------------------------------------------------------------------
    // Verification
    //-------------------------------------------------------------------------

    /**
     * Starts the verification process for the given CSS text.
     * @param {String} text The CSS text to verify.
     * @param {Object} ruleset (Optional) List of rules to apply. If null, then
     *      all rules are used. If a rule has a value of 1 then it's a warning,
     *      a value of 2 means it's an error.
     * @return {Object} Results of the verification.
     * @method verify
     */
    api.verify = function(text, ruleset) {

        var i = 0,
            reporter,
            lines,
            allow = {},
            ignore = [],
            report,
            parser = new parserlib.css.Parser({
                starHack: true,
                ieFilters: true,
                underscoreHack: true,
                strict: false
            });

        // normalize line endings
        lines = text.replace(/\n\r?/g, "$split$").split("$split$");

        // find 'allow' comments
        CSSLint.Util.forEach(lines, function (line, lineno) {
            var allowLine = line && line.match(/\/\*[ \t]*csslint[ \t]+allow:[ \t]*([^\*]*)\*\//i),
                allowRules = allowLine && allowLine[1],
                allowRuleset = {};

            if (allowRules) {
                allowRules.toLowerCase().split(",").forEach(function(allowRule) {
                    allowRuleset[allowRule.trim()] = true;
                });
                if (Object.keys(allowRuleset).length > 0) {
                    allow[lineno + 1] = allowRuleset;
                }
            }
        });

        var ignoreStart = null,
            ignoreEnd = null;
        CSSLint.Util.forEach(lines, function (line, lineno) {
            // Keep oldest, "unclosest" ignore:start
            if (ignoreStart === null && line.match(/\/\*[ \t]*csslint[ \t]+ignore:start[ \t]*\*\//i)) {
                ignoreStart = lineno;
            }

            if (line.match(/\/\*[ \t]*csslint[ \t]+ignore:end[ \t]*\*\//i)) {
                ignoreEnd = lineno;
            }

            if (ignoreStart !== null && ignoreEnd !== null) {
                ignore.push([ignoreStart, ignoreEnd]);
                ignoreStart = ignoreEnd = null;
            }
        });

        // Close remaining ignore block, if any
        if (ignoreStart !== null) {
            ignore.push([ignoreStart, lines.length]);
        }

        if (!ruleset) {
            ruleset = this.getRuleset();
        }

        if (embeddedRuleset.test(text)) {
            // defensively copy so that caller's version does not get modified
            ruleset = clone(ruleset);
            ruleset = applyEmbeddedRuleset(text, ruleset);
        }

        reporter = new Reporter(lines, ruleset, allow, ignore);

        ruleset.errors = 2;       // always report parsing errors as errors
        for (i in ruleset) {
            if (ruleset.hasOwnProperty(i) && ruleset[i]) {
                if (rules[i]) {
                    rules[i].init(parser, reporter);
                }
            }
        }

        // capture most horrible error type
        try {
            parser.parse(text);
        } catch (ex) {
            reporter.error("Fatal error, cannot continue: " + ex.message, ex.line, ex.col, {});
        }

        report = {
            messages    : reporter.messages,
            stats       : reporter.stats,
            ruleset     : reporter.ruleset,
            allow       : reporter.allow,
            ignore      : reporter.ignore
        };

        // sort by line numbers, rollups at the bottom
        report.messages.sort(function (a, b) {
            if (a.rollup && !b.rollup) {
                return 1;
            } else if (!a.rollup && b.rollup) {
                return -1;
            } else {
                return a.line - b.line;
            }
        });

        return report;
    };

    //-------------------------------------------------------------------------
    // Publish the API
    //-------------------------------------------------------------------------

    return api;
})();

/**
 * An instance of Report is used to report results of the
 * verification back to the main API.
 * @class Reporter
 * @constructor
 * @param {String[]} lines The text lines of the source.
 * @param {Object} ruleset The set of rules to work with, including if
 *      they are errors or warnings.
 * @param {Object} explicitly allowed lines
 * @param {[][]} ingore list of line ranges to be ignored
 */
function Reporter(lines, ruleset, allow, ignore) {
    "use strict";

    /**
     * List of messages being reported.
     * @property messages
     * @type String[]
     */
    this.messages = [];

    /**
     * List of statistics being reported.
     * @property stats
     * @type String[]
     */
    this.stats = [];

    /**
     * Lines of code being reported on. Used to provide contextual information
     * for messages.
     * @property lines
     * @type String[]
     */
    this.lines = lines;

    /**
     * Information about the rules. Used to determine whether an issue is an
     * error or warning.
     * @property ruleset
     * @type Object
     */
    this.ruleset = ruleset;

    /**
     * Lines with specific rule messages to leave out of the report.
     * @property allow
     * @type Object
     */
    this.allow = allow;
    if (!this.allow) {
        this.allow = {};
    }

    /**
     * Linesets not to include in the report.
     * @property ignore
     * @type [][]
     */
    this.ignore = ignore;
    if (!this.ignore) {
        this.ignore = [];
    }
}

Reporter.prototype = {

    // restore constructor
    constructor: Reporter,

    /**
     * Report an error.
     * @param {String} message The message to store.
     * @param {int} line The line number.
     * @param {int} col The column number.
     * @param {Object} rule The rule this message relates to.
     * @method error
     */
    error: function(message, line, col, rule) {
        "use strict";
        this.messages.push({
            type    : "error",
            line    : line,
            col     : col,
            message : message,
            evidence: this.lines[line-1],
            rule    : rule || {}
        });
    },

    /**
     * Report an warning.
     * @param {String} message The message to store.
     * @param {int} line The line number.
     * @param {int} col The column number.
     * @param {Object} rule The rule this message relates to.
     * @method warn
     * @deprecated Use report instead.
     */
    warn: function(message, line, col, rule) {
        "use strict";
        this.report(message, line, col, rule);
    },

    /**
     * Report an issue.
     * @param {String} message The message to store.
     * @param {int} line The line number.
     * @param {int} col The column number.
     * @param {Object} rule The rule this message relates to.
     * @method report
     */
    report: function(message, line, col, rule) {
        "use strict";

        // Check if rule violation should be allowed
        if (this.allow.hasOwnProperty(line) && this.allow[line].hasOwnProperty(rule.id)) {
            return;
        }

        var ignore = false;
        CSSLint.Util.forEach(this.ignore, function (range) {
            if (range[0] <= line && line <= range[1]) {
                ignore = true;
            }
        });
        if (ignore) {
            return;
        }

        this.messages.push({
            type    : this.ruleset[rule.id] === 2 ? "error" : "warning",
            line    : line,
            col     : col,
            message : message,
            evidence: this.lines[line-1],
            rule    : rule
        });
    },

    /**
     * Report some informational text.
     * @param {String} message The message to store.
     * @param {int} line The line number.
     * @param {int} col The column number.
     * @param {Object} rule The rule this message relates to.
     * @method info
     */
    info: function(message, line, col, rule) {
        "use strict";
        this.messages.push({
            type    : "info",
            line    : line,
            col     : col,
            message : message,
            evidence: this.lines[line-1],
            rule    : rule
        });
    },

    /**
     * Report some rollup error information.
     * @param {String} message The message to store.
     * @param {Object} rule The rule this message relates to.
     * @method rollupError
     */
    rollupError: function(message, rule) {
        "use strict";
        this.messages.push({
            type    : "error",
            rollup  : true,
            message : message,
            rule    : rule
        });
    },

    /**
     * Report some rollup warning information.
     * @param {String} message The message to store.
     * @param {Object} rule The rule this message relates to.
     * @method rollupWarn
     */
    rollupWarn: function(message, rule) {
        "use strict";
        this.messages.push({
            type    : "warning",
            rollup  : true,
            message : message,
            rule    : rule
        });
    },

    /**
     * Report a statistic.
     * @param {String} name The name of the stat to store.
     * @param {Variant} value The value of the stat.
     * @method stat
     */
    stat: function(name, value) {
        "use strict";
        this.stats[name] = value;
    }
};

// expose for testing purposes
CSSLint._Reporter = Reporter;

/*
 * Utility functions that make life easier.
 */
CSSLint.Util = {
    /*
     * Adds all properties from supplier onto receiver,
     * overwriting if the same name already exists on
     * receiver.
     * @param {Object} The object to receive the properties.
     * @param {Object} The object to provide the properties.
     * @return {Object} The receiver
     */
    mix: function(receiver, supplier) {
        "use strict";
        var prop;

        for (prop in supplier) {
            if (supplier.hasOwnProperty(prop)) {
                receiver[prop] = supplier[prop];
            }
        }

        return prop;
    },

    /*
     * Polyfill for array indexOf() method.
     * @param {Array} values The array to search.
     * @param {Variant} value The value to search for.
     * @return {int} The index of the value if found, -1 if not.
     */
    indexOf: function(values, value) {
        "use strict";
        if (values.indexOf) {
            return values.indexOf(value);
        } else {
            for (var i=0, len=values.length; i < len; i++) {
                if (values[i] === value) {
                    return i;
                }
            }
            return -1;
        }
    },

    /*
     * Polyfill for array forEach() method.
     * @param {Array} values The array to operate on.
     * @param {Function} func The function to call on each item.
     * @return {void}
     */
    forEach: function(values, func) {
        "use strict";
        if (values.forEach) {
            return values.forEach(func);
        } else {
            for (var i=0, len=values.length; i < len; i++) {
                func(values[i], i, values);
            }
        }
    }
};

/*
 * Rule: Don't use adjoining classes (.foo.bar).
 */

CSSLint.addRule({

    // rule information
    id: "adjoining-classes",
    name: "Disallow adjoining classes",
    desc: "Don't use adjoining classes.",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-adjoining-classes",
    browsers: "IE6",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;
        parser.addListener("startrule", function(event) {
            var selectors = event.selectors,
                selector,
                part,
                modifier,
                classCount,
                i, j, k;

            for (i=0; i < selectors.length; i++) {
                selector = selectors[i];
                for (j=0; j < selector.parts.length; j++) {
                    part = selector.parts[j];
                    if (part.type === parser.SELECTOR_PART_TYPE) {
                        classCount = 0;
                        for (k=0; k < part.modifiers.length; k++) {
                            modifier = part.modifiers[k];
                            if (modifier.type === "class") {
                                classCount++;
                            }
                            if (classCount > 1){
                                reporter.report("Adjoining classes: "+selectors[i].text, part.line, part.col, rule);
                            }
                        }
                    }
                }
            }
        });
    }
});

/*
 * Rule: Don't use width or height when using padding or border.
 */
CSSLint.addRule({

    // rule information
    id: "box-model",
    name: "Beware of broken box size",
    desc: "Don't use width or height when using padding or border.",
    url: "https://github.com/CSSLint/csslint/wiki/Beware-of-box-model-size",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this,
            widthProperties = {
                border: 1,
                "border-left": 1,
                "border-right": 1,
                padding: 1,
                "padding-left": 1,
                "padding-right": 1
            },
            heightProperties = {
                border: 1,
                "border-bottom": 1,
                "border-top": 1,
                padding: 1,
                "padding-bottom": 1,
                "padding-top": 1
            },
            properties,
            boxSizing = false;

        function startRule() {
            properties = {};
            boxSizing = false;
        }

        function endRule() {
            var prop, value;

            if (!boxSizing) {
                if (properties.height) {
                    for (prop in heightProperties) {
                        if (heightProperties.hasOwnProperty(prop) && properties[prop]) {
                            value = properties[prop].value;
                            // special case for padding
                            if (!(prop === "padding" && value.parts.length === 2 && value.parts[0].value === 0)) {
                                reporter.report("Using height with " + prop + " can sometimes make elements larger than you expect.", properties[prop].line, properties[prop].col, rule);
                            }
                        }
                    }
                }

                if (properties.width) {
                    for (prop in widthProperties) {
                        if (widthProperties.hasOwnProperty(prop) && properties[prop]) {
                            value = properties[prop].value;

                            if (!(prop === "padding" && value.parts.length === 2 && value.parts[1].value === 0)) {
                                reporter.report("Using width with " + prop + " can sometimes make elements larger than you expect.", properties[prop].line, properties[prop].col, rule);
                            }
                        }
                    }
                }
            }
        }

        parser.addListener("startrule", startRule);
        parser.addListener("startfontface", startRule);
        parser.addListener("startpage", startRule);
        parser.addListener("startpagemargin", startRule);
        parser.addListener("startkeyframerule", startRule);
        parser.addListener("startviewport", startRule);

        parser.addListener("property", function(event) {
            var name = event.property.text.toLowerCase();

            if (heightProperties[name] || widthProperties[name]) {
                if (!/^0\S*$/.test(event.value) && !(name === "border" && event.value.toString() === "none")) {
                    properties[name] = {
                        line: event.property.line,
                        col: event.property.col,
                        value: event.value
                    };
                }
            } else {
                if (/^(width|height)/i.test(name) && /^(length|percentage)/.test(event.value.parts[0].type)) {
                    properties[name] = 1;
                } else if (name === "box-sizing") {
                    boxSizing = true;
                }
            }
        });

        parser.addListener("endrule", endRule);
        parser.addListener("endfontface", endRule);
        parser.addListener("endpage", endRule);
        parser.addListener("endpagemargin", endRule);
        parser.addListener("endkeyframerule", endRule);
        parser.addListener("endviewport", endRule);
    }
});

/*
 * Rule: box-sizing doesn't work in IE6 and IE7.
 */

CSSLint.addRule({

    // rule information
    id: "box-sizing",
    name: "Disallow use of box-sizing",
    desc: "The box-sizing properties isn't supported in IE6 and IE7.",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-box-sizing",
    browsers: "IE6, IE7",
    tags: ["Compatibility"],

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;

        parser.addListener("property", function(event) {
            var name = event.property.text.toLowerCase();

            if (name === "box-sizing") {
                reporter.report("The box-sizing property isn't supported in IE6 and IE7.", event.line, event.col, rule);
            }
        });
    }
});

/*
 * Rule: Use the bulletproof @font-face syntax to avoid 404's in old IE
 * (http://www.fontspring.com/blog/the-new-bulletproof-font-face-syntax)
 */

CSSLint.addRule({

    // rule information
    id: "bulletproof-font-face",
    name: "Use the bulletproof @font-face syntax",
    desc: "Use the bulletproof @font-face syntax to avoid 404's in old IE (http://www.fontspring.com/blog/the-new-bulletproof-font-face-syntax).",
    url: "https://github.com/CSSLint/csslint/wiki/Bulletproof-font-face",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this,
            fontFaceRule = false,
            firstSrc = true,
            ruleFailed = false,
            line, col;

        // Mark the start of a @font-face declaration so we only test properties inside it
        parser.addListener("startfontface", function() {
            fontFaceRule = true;
        });

        parser.addListener("property", function(event) {
            // If we aren't inside an @font-face declaration then just return
            if (!fontFaceRule) {
                return;
            }

            var propertyName = event.property.toString().toLowerCase(),
                value = event.value.toString();

            // Set the line and col numbers for use in the endfontface listener
            line = event.line;
            col = event.col;

            // This is the property that we care about, we can ignore the rest
            if (propertyName === "src") {
                var regex = /^\s?url\(['"].+\.eot\?.*['"]\)\s*format\(['"]embedded-opentype['"]\).*$/i;

                // We need to handle the advanced syntax with two src properties
                if (!value.match(regex) && firstSrc) {
                    ruleFailed = true;
                    firstSrc = false;
                } else if (value.match(regex) && !firstSrc) {
                    ruleFailed = false;
                }
            }
        });

        // Back to normal rules that we don't need to test
        parser.addListener("endfontface", function() {
            fontFaceRule = false;

            if (ruleFailed) {
                reporter.report("@font-face declaration doesn't follow the fontspring bulletproof syntax.", line, col, rule);
            }
        });
    }
});

/*
 * Rule: Include all compatible vendor prefixes to reach a wider
 * range of users.
 */

CSSLint.addRule({

    // rule information
    id: "compatible-vendor-prefixes",
    name: "Require compatible vendor prefixes",
    desc: "Include all compatible vendor prefixes to reach a wider range of users.",
    url: "https://github.com/CSSLint/csslint/wiki/Require-compatible-vendor-prefixes",
    browsers: "All",

    // initialization
    init: function (parser, reporter) {
        "use strict";
        var rule = this,
            compatiblePrefixes,
            properties,
            prop,
            variations,
            prefixed,
            i,
            len,
            inKeyFrame = false,
            arrayPush = Array.prototype.push,
            applyTo = [];

        // See http://peter.sh/experiments/vendor-prefixed-css-property-overview/ for details
        compatiblePrefixes = {
            "animation"                  : "webkit",
            "animation-delay"            : "webkit",
            "animation-direction"        : "webkit",
            "animation-duration"         : "webkit",
            "animation-fill-mode"        : "webkit",
            "animation-iteration-count"  : "webkit",
            "animation-name"             : "webkit",
            "animation-play-state"       : "webkit",
            "animation-timing-function"  : "webkit",
            "appearance"                 : "webkit moz",
            "border-end"                 : "webkit moz",
            "border-end-color"           : "webkit moz",
            "border-end-style"           : "webkit moz",
            "border-end-width"           : "webkit moz",
            "border-image"               : "webkit moz o",
            "border-radius"              : "webkit",
            "border-start"               : "webkit moz",
            "border-start-color"         : "webkit moz",
            "border-start-style"         : "webkit moz",
            "border-start-width"         : "webkit moz",
            "box-align"                  : "webkit moz ms",
            "box-direction"              : "webkit moz ms",
            "box-flex"                   : "webkit moz ms",
            "box-lines"                  : "webkit ms",
            "box-ordinal-group"          : "webkit moz ms",
            "box-orient"                 : "webkit moz ms",
            "box-pack"                   : "webkit moz ms",
            "box-sizing"                 : "",
            "box-shadow"                 : "",
            "column-count"               : "webkit moz ms",
            "column-gap"                 : "webkit moz ms",
            "column-rule"                : "webkit moz ms",
            "column-rule-color"          : "webkit moz ms",
            "column-rule-style"          : "webkit moz ms",
            "column-rule-width"          : "webkit moz ms",
            "column-width"               : "webkit moz ms",
            "hyphens"                    : "epub moz",
            "line-break"                 : "webkit ms",
            "margin-end"                 : "webkit moz",
            "margin-start"               : "webkit moz",
            "marquee-speed"              : "webkit wap",
            "marquee-style"              : "webkit wap",
            "padding-end"                : "webkit moz",
            "padding-start"              : "webkit moz",
            "tab-size"                   : "moz o",
            "text-size-adjust"           : "webkit ms",
            "transform"                  : "webkit ms",
            "transform-origin"           : "webkit ms",
            "transition"                 : "",
            "transition-delay"           : "",
            "transition-duration"        : "",
            "transition-property"        : "",
            "transition-timing-function" : "",
            "user-modify"                : "webkit moz",
            "user-select"                : "webkit moz ms",
            "word-break"                 : "epub ms",
            "writing-mode"               : "epub ms"
        };

        for (prop in compatiblePrefixes) {
            if (compatiblePrefixes.hasOwnProperty(prop)) {
                variations = [];
                prefixed = compatiblePrefixes[prop].split(" ");
                for (i = 0, len = prefixed.length; i < len; i++) {
                    variations.push("-" + prefixed[i] + "-" + prop);
                }
                compatiblePrefixes[prop] = variations;
                arrayPush.apply(applyTo, variations);
            }
        }

        parser.addListener("startrule", function () {
            properties = [];
        });

        parser.addListener("startkeyframes", function (event) {
            inKeyFrame = event.prefix || true;
        });

        parser.addListener("endkeyframes", function () {
            inKeyFrame = false;
        });

        parser.addListener("property", function (event) {
            var name = event.property;
            if (CSSLint.Util.indexOf(applyTo, name.text) > -1) {

                // e.g., -moz-transform is okay to be alone in @-moz-keyframes
                if (!inKeyFrame || typeof inKeyFrame !== "string" ||
                        name.text.indexOf("-" + inKeyFrame + "-") !== 0) {
                    properties.push(name);
                }
            }
        });

        parser.addListener("endrule", function () {
            if (!properties.length) {
                return;
            }

            var propertyGroups = {},
                i,
                len,
                name,
                prop,
                variations,
                value,
                full,
                actual,
                item,
                propertiesSpecified;

            for (i = 0, len = properties.length; i < len; i++) {
                name = properties[i];

                for (prop in compatiblePrefixes) {
                    if (compatiblePrefixes.hasOwnProperty(prop)) {
                        variations = compatiblePrefixes[prop];
                        if (CSSLint.Util.indexOf(variations, name.text) > -1) {
                            if (!propertyGroups[prop]) {
                                propertyGroups[prop] = {
                                    full: variations.slice(0),
                                    actual: [],
                                    actualNodes: []
                                };
                            }
                            if (CSSLint.Util.indexOf(propertyGroups[prop].actual, name.text) === -1) {
                                propertyGroups[prop].actual.push(name.text);
                                propertyGroups[prop].actualNodes.push(name);
                            }
                        }
                    }
                }
            }

            for (prop in propertyGroups) {
                if (propertyGroups.hasOwnProperty(prop)) {
                    value = propertyGroups[prop];
                    full = value.full;
                    actual = value.actual;

                    if (full.length > actual.length) {
                        for (i = 0, len = full.length; i < len; i++) {
                            item = full[i];
                            if (CSSLint.Util.indexOf(actual, item) === -1) {
                                propertiesSpecified = (actual.length === 1) ? actual[0] : (actual.length === 2) ? actual.join(" and ") : actual.join(", ");
                                reporter.report("The property " + item + " is compatible with " + propertiesSpecified + " and should be included as well.", value.actualNodes[0].line, value.actualNodes[0].col, rule);
                            }
                        }
                    }
                }
            }
        });
    }
});

/*
 * Rule: Certain properties don't play well with certain display values.
 * - float should not be used with inline-block
 * - height, width, margin-top, margin-bottom, float should not be used with inline
 * - vertical-align should not be used with block
 * - margin, float should not be used with table-*
 */

CSSLint.addRule({

    // rule information
    id: "display-property-grouping",
    name: "Require properties appropriate for display",
    desc: "Certain properties shouldn't be used with certain display property values.",
    url: "https://github.com/CSSLint/csslint/wiki/Require-properties-appropriate-for-display",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;

        var propertiesToCheck = {
                display: 1,
                "float": "none",
                height: 1,
                width: 1,
                margin: 1,
                "margin-left": 1,
                "margin-right": 1,
                "margin-bottom": 1,
                "margin-top": 1,
                padding: 1,
                "padding-left": 1,
                "padding-right": 1,
                "padding-bottom": 1,
                "padding-top": 1,
                "vertical-align": 1
            },
            properties;

        function reportProperty(name, display, msg) {
            if (properties[name]) {
                if (typeof propertiesToCheck[name] !== "string" || properties[name].value.toLowerCase() !== propertiesToCheck[name]) {
                    reporter.report(msg || name + " can't be used with display: " + display + ".", properties[name].line, properties[name].col, rule);
                }
            }
        }

        function startRule() {
            properties = {};
        }

        function endRule() {

            var display = properties.display ? properties.display.value : null;
            if (display) {
                switch (display) {

                    case "inline":
                        // height, width, margin-top, margin-bottom, float should not be used with inline
                        reportProperty("height", display);
                        reportProperty("width", display);
                        reportProperty("margin", display);
                        reportProperty("margin-top", display);
                        reportProperty("margin-bottom", display);
                        reportProperty("float", display, "display:inline has no effect on floated elements (but may be used to fix the IE6 double-margin bug).");
                        break;

                    case "block":
                        // vertical-align should not be used with block
                        reportProperty("vertical-align", display);
                        break;

                    case "inline-block":
                        // float should not be used with inline-block
                        reportProperty("float", display);
                        break;

                    default:
                        // margin, float should not be used with table
                        if (display.indexOf("table-") === 0) {
                            reportProperty("margin", display);
                            reportProperty("margin-left", display);
                            reportProperty("margin-right", display);
                            reportProperty("margin-top", display);
                            reportProperty("margin-bottom", display);
                            reportProperty("float", display);
                        }

                        // otherwise do nothing
                }
            }
        }

        parser.addListener("startrule", startRule);
        parser.addListener("startfontface", startRule);
        parser.addListener("startkeyframerule", startRule);
        parser.addListener("startpagemargin", startRule);
        parser.addListener("startpage", startRule);
        parser.addListener("startviewport", startRule);

        parser.addListener("property", function(event) {
            var name = event.property.text.toLowerCase();

            if (propertiesToCheck[name]) {
                properties[name] = {
                    value: event.value.text,
                    line: event.property.line,
                    col: event.property.col
                };
            }
        });

        parser.addListener("endrule", endRule);
        parser.addListener("endfontface", endRule);
        parser.addListener("endkeyframerule", endRule);
        parser.addListener("endpagemargin", endRule);
        parser.addListener("endpage", endRule);
        parser.addListener("endviewport", endRule);
    }
});

/*
 * Rule: Disallow duplicate background-images (using url).
 */

CSSLint.addRule({

    // rule information
    id: "duplicate-background-images",
    name: "Disallow duplicate background images",
    desc: "Every background-image should be unique. Use a common class for e.g. sprites.",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-duplicate-background-images",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this,
            stack = {};

        parser.addListener("property", function(event) {
            var name = event.property.text,
                value = event.value,
                i, len;

            if (name.match(/background/i)) {
                for (i=0, len=value.parts.length; i < len; i++) {
                    if (value.parts[i].type === "uri") {
                        if (typeof stack[value.parts[i].uri] === "undefined") {
                            stack[value.parts[i].uri] = event;
                        } else {
                            reporter.report("Background image '" + value.parts[i].uri + "' was used multiple times, first declared at line " + stack[value.parts[i].uri].line + ", col " + stack[value.parts[i].uri].col + ".", event.line, event.col, rule);
                        }
                    }
                }
            }
        });
    }
});

/*
 * Rule: Duplicate properties must appear one after the other. If an already-defined
 * property appears somewhere else in the rule, then it's likely an error.
 */

CSSLint.addRule({

    // rule information
    id: "duplicate-properties",
    name: "Disallow duplicate properties",
    desc: "Duplicate properties must appear one after the other.",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-duplicate-properties",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this,
            properties,
            lastProperty;

        function startRule() {
            properties = {};
        }

        parser.addListener("startrule", startRule);
        parser.addListener("startfontface", startRule);
        parser.addListener("startpage", startRule);
        parser.addListener("startpagemargin", startRule);
        parser.addListener("startkeyframerule", startRule);
        parser.addListener("startviewport", startRule);

        parser.addListener("property", function(event) {
            var property = event.property,
                name = property.text.toLowerCase();

            if (properties[name] && (lastProperty !== name || properties[name] === event.value.text)) {
                reporter.report("Duplicate property '" + event.property + "' found.", event.line, event.col, rule);
            }

            properties[name] = event.value.text;
            lastProperty = name;
        });
    }
});

/*
 * Rule: Style rules without any properties defined should be removed.
 */

CSSLint.addRule({

    // rule information
    id: "empty-rules",
    name: "Disallow empty rules",
    desc: "Rules without any properties specified should be removed.",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-empty-rules",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this,
            count = 0;

        parser.addListener("startrule", function() {
            count=0;
        });

        parser.addListener("property", function() {
            count++;
        });

        parser.addListener("endrule", function(event) {
            var selectors = event.selectors;
            if (count === 0) {
                reporter.report("Rule is empty.", selectors[0].line, selectors[0].col, rule);
            }
        });
    }
});

/*
 * Rule: There should be no syntax errors. (Duh.)
 */

CSSLint.addRule({

    // rule information
    id: "errors",
    name: "Parsing Errors",
    desc: "This rule looks for recoverable syntax errors.",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;

        parser.addListener("error", function(event) {
            reporter.error(event.message, event.line, event.col, rule);
        });
    }
});

CSSLint.addRule({

    // rule information
    id: "fallback-colors",
    name: "Require fallback colors",
    desc: "For older browsers that don't support RGBA, HSL, or HSLA, provide a fallback color.",
    url: "https://github.com/CSSLint/csslint/wiki/Require-fallback-colors",
    browsers: "IE6,IE7,IE8",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this,
            lastProperty,
            propertiesToCheck = {
                color: 1,
                background: 1,
                "border-color": 1,
                "border-top-color": 1,
                "border-right-color": 1,
                "border-bottom-color": 1,
                "border-left-color": 1,
                border: 1,
                "border-top": 1,
                "border-right": 1,
                "border-bottom": 1,
                "border-left": 1,
                "background-color": 1
            };

        function startRule() {
            lastProperty = null;
        }

        parser.addListener("startrule", startRule);
        parser.addListener("startfontface", startRule);
        parser.addListener("startpage", startRule);
        parser.addListener("startpagemargin", startRule);
        parser.addListener("startkeyframerule", startRule);
        parser.addListener("startviewport", startRule);

        parser.addListener("property", function(event) {
            var property = event.property,
                name = property.text.toLowerCase(),
                parts = event.value.parts,
                i = 0,
                colorType = "",
                len = parts.length;

            if (propertiesToCheck[name]) {
                while (i < len) {
                    if (parts[i].type === "color") {
                        if ("alpha" in parts[i] || "hue" in parts[i]) {

                            if (/([^\)]+)\(/.test(parts[i])) {
                                colorType = RegExp.$1.toUpperCase();
                            }

                            if (!lastProperty || (lastProperty.property.text.toLowerCase() !== name || lastProperty.colorType !== "compat")) {
                                reporter.report("Fallback " + name + " (hex or RGB) should precede " + colorType + " " + name + ".", event.line, event.col, rule);
                            }
                        } else {
                            event.colorType = "compat";
                        }
                    }

                    i++;
                }
            }

            lastProperty = event;
        });
    }
});

/*
 * Rule: You shouldn't use more than 10 floats. If you do, there's probably
 * room for some abstraction.
 */

CSSLint.addRule({

    // rule information
    id: "floats",
    name: "Disallow too many floats",
    desc: "This rule tests if the float property is used too many times",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-too-many-floats",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;
        var count = 0;

        // count how many times "float" is used
        parser.addListener("property", function(event) {
            if (event.property.text.toLowerCase() === "float" &&
                    event.value.text.toLowerCase() !== "none") {
                count++;
            }
        });

        // report the results
        parser.addListener("endstylesheet", function() {
            reporter.stat("floats", count);
            if (count >= 10) {
                reporter.rollupWarn("Too many floats (" + count + "), you're probably using them for layout. Consider using a grid system instead.", rule);
            }
        });
    }
});

/*
 * Rule: Avoid too many @font-face declarations in the same stylesheet.
 */

CSSLint.addRule({

    // rule information
    id: "font-faces",
    name: "Don't use too many web fonts",
    desc: "Too many different web fonts in the same stylesheet.",
    url: "https://github.com/CSSLint/csslint/wiki/Don%27t-use-too-many-web-fonts",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this,
            count = 0;

        parser.addListener("startfontface", function() {
            count++;
        });

        parser.addListener("endstylesheet", function() {
            if (count > 5) {
                reporter.rollupWarn("Too many @font-face declarations (" + count + ").", rule);
            }
        });
    }
});

/*
 * Rule: You shouldn't need more than 9 font-size declarations.
 */

CSSLint.addRule({

    // rule information
    id: "font-sizes",
    name: "Disallow too many font sizes",
    desc: "Checks the number of font-size declarations.",
    url: "https://github.com/CSSLint/csslint/wiki/Don%27t-use-too-many-font-size-declarations",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this,
            count = 0;

        // check for use of "font-size"
        parser.addListener("property", function(event) {
            if (event.property.toString() === "font-size") {
                count++;
            }
        });

        // report the results
        parser.addListener("endstylesheet", function() {
            reporter.stat("font-sizes", count);
            if (count >= 10) {
                reporter.rollupWarn("Too many font-size declarations (" + count + "), abstraction needed.", rule);
            }
        });
    }
});

/*
 * Rule: When using a vendor-prefixed gradient, make sure to use them all.
 */

CSSLint.addRule({

    // rule information
    id: "gradients",
    name: "Require all gradient definitions",
    desc: "When using a vendor-prefixed gradient, make sure to use them all.",
    url: "https://github.com/CSSLint/csslint/wiki/Require-all-gradient-definitions",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this,
            gradients;

        parser.addListener("startrule", function() {
            gradients = {
                moz: 0,
                webkit: 0,
                oldWebkit: 0,
                o: 0
            };
        });

        parser.addListener("property", function(event) {

            if (/\-(moz|o|webkit)(?:\-(?:linear|radial))\-gradient/i.test(event.value)) {
                gradients[RegExp.$1] = 1;
            } else if (/\-webkit\-gradient/i.test(event.value)) {
                gradients.oldWebkit = 1;
            }
        });

        parser.addListener("endrule", function(event) {
            var missing = [];

            if (!gradients.moz) {
                missing.push("Firefox 3.6+");
            }

            if (!gradients.webkit) {
                missing.push("Webkit (Safari 5+, Chrome)");
            }

            if (!gradients.oldWebkit) {
                missing.push("Old Webkit (Safari 4+, Chrome)");
            }

            if (!gradients.o) {
                missing.push("Opera 11.1+");
            }

            if (missing.length && missing.length < 4) {
                reporter.report("Missing vendor-prefixed CSS gradients for " + missing.join(", ") + ".", event.selectors[0].line, event.selectors[0].col, rule);
            }
        });
    }
});

/*
 * Rule: Don't use IDs for selectors.
 */

CSSLint.addRule({

    // rule information
    id: "ids",
    name: "Disallow IDs in selectors",
    desc: "Selectors should not contain IDs.",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-IDs-in-selectors",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;
        parser.addListener("startrule", function(event) {
            var selectors = event.selectors,
                selector,
                part,
                modifier,
                idCount,
                i, j, k;

            for (i=0; i < selectors.length; i++) {
                selector = selectors[i];
                idCount = 0;

                for (j=0; j < selector.parts.length; j++) {
                    part = selector.parts[j];
                    if (part.type === parser.SELECTOR_PART_TYPE) {
                        for (k=0; k < part.modifiers.length; k++) {
                            modifier = part.modifiers[k];
                            if (modifier.type === "id") {
                                idCount++;
                            }
                        }
                    }
                }

                if (idCount === 1) {
                    reporter.report("Don't use IDs in selectors.", selector.line, selector.col, rule);
                } else if (idCount > 1) {
                    reporter.report(idCount + " IDs in the selector, really?", selector.line, selector.col, rule);
                }
            }
        });
    }
});

/*
 * Rule: IE6-9 supports up to 31 stylesheet import.
 * Reference:
 * http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/internet-explorer-stylesheet-rule-selector-import-sheet-limit-maximum.aspx
 */

CSSLint.addRule({

    // rule information
    id: "import-ie-limit",
    name: "@import limit on IE6-IE9",
    desc: "IE6-9 supports up to 31 @import per stylesheet",
    browsers: "IE6, IE7, IE8, IE9",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this,
            MAX_IMPORT_COUNT = 31,
            count = 0;

        function startPage() {
            count = 0;
        }

        parser.addListener("startpage", startPage);

        parser.addListener("import", function() {
            count++;
        });

        parser.addListener("endstylesheet", function() {
            if (count > MAX_IMPORT_COUNT) {
                reporter.rollupError(
                    "Too many @import rules (" + count + "). IE6-9 supports up to 31 import per stylesheet.",
                    rule
                );
            }
        });
    }
});

/*
 * Rule: Don't use @import, use <link> instead.
 */

CSSLint.addRule({

    // rule information
    id: "import",
    name: "Disallow @import",
    desc: "Don't use @import, use <link> instead.",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-%40import",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;

        parser.addListener("import", function(event) {
            reporter.report("@import prevents parallel downloads, use <link> instead.", event.line, event.col, rule);
        });
    }
});

/*
 * Rule: Make sure !important is not overused, this could lead to specificity
 * war. Display a warning on !important declarations, an error if it's
 * used more at least 10 times.
 */

CSSLint.addRule({

    // rule information
    id: "important",
    name: "Disallow !important",
    desc: "Be careful when using !important declaration",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-%21important",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this,
            count = 0;

        // warn that important is used and increment the declaration counter
        parser.addListener("property", function(event) {
            if (event.important === true) {
                count++;
                reporter.report("Use of !important", event.line, event.col, rule);
            }
        });

        // if there are more than 10, show an error
        parser.addListener("endstylesheet", function() {
            reporter.stat("important", count);
            if (count >= 10) {
                reporter.rollupWarn("Too many !important declarations (" + count + "), try to use less than 10 to avoid specificity issues.", rule);
            }
        });
    }
});

/*
 * Rule: Properties should be known (listed in CSS3 specification) or
 * be a vendor-prefixed property.
 */

CSSLint.addRule({

    // rule information
    id: "known-properties",
    name: "Require use of known properties",
    desc: "Properties should be known (listed in CSS3 specification) or be a vendor-prefixed property.",
    url: "https://github.com/CSSLint/csslint/wiki/Require-use-of-known-properties",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;

        parser.addListener("property", function(event) {

            // the check is handled entirely by the parser-lib (https://github.com/nzakas/parser-lib)
            if (event.invalid) {
                reporter.report(event.invalid.message, event.line, event.col, rule);
            }
        });
    }
});

/*
 * Rule: All properties should be in alphabetical order.
 */

CSSLint.addRule({

    // rule information
    id: "order-alphabetical",
    name: "Alphabetical order",
    desc: "Assure properties are in alphabetical order",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this,
            properties;

        var startRule = function () {
            properties = [];
        };

        var endRule = function(event) {
            var currentProperties = properties.join(","),
                expectedProperties = properties.sort().join(",");

            if (currentProperties !== expectedProperties) {
                reporter.report("Rule doesn't have all its properties in alphabetical order.", event.line, event.col, rule);
            }
        };

        parser.addListener("startrule", startRule);
        parser.addListener("startfontface", startRule);
        parser.addListener("startpage", startRule);
        parser.addListener("startpagemargin", startRule);
        parser.addListener("startkeyframerule", startRule);
        parser.addListener("startviewport", startRule);

        parser.addListener("property", function(event) {
            var name = event.property.text,
                lowerCasePrefixLessName = name.toLowerCase().replace(/^-.*?-/, "");

            properties.push(lowerCasePrefixLessName);
        });

        parser.addListener("endrule", endRule);
        parser.addListener("endfontface", endRule);
        parser.addListener("endpage", endRule);
        parser.addListener("endpagemargin", endRule);
        parser.addListener("endkeyframerule", endRule);
        parser.addListener("endviewport", endRule);
    }
});

/*
 * Rule: outline: none or outline: 0 should only be used in a :focus rule
 *       and only if there are other properties in the same rule.
 */

CSSLint.addRule({

    // rule information
    id: "outline-none",
    name: "Disallow outline: none",
    desc: "Use of outline: none or outline: 0 should be limited to :focus rules.",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-outline%3Anone",
    browsers: "All",
    tags: ["Accessibility"],

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this,
            lastRule;

        function startRule(event) {
            if (event.selectors) {
                lastRule = {
                    line: event.line,
                    col: event.col,
                    selectors: event.selectors,
                    propCount: 0,
                    outline: false
                };
            } else {
                lastRule = null;
            }
        }

        function endRule() {
            if (lastRule) {
                if (lastRule.outline) {
                    if (lastRule.selectors.toString().toLowerCase().indexOf(":focus") === -1) {
                        reporter.report("Outlines should only be modified using :focus.", lastRule.line, lastRule.col, rule);
                    } else if (lastRule.propCount === 1) {
                        reporter.report("Outlines shouldn't be hidden unless other visual changes are made.", lastRule.line, lastRule.col, rule);
                    }
                }
            }
        }

        parser.addListener("startrule", startRule);
        parser.addListener("startfontface", startRule);
        parser.addListener("startpage", startRule);
        parser.addListener("startpagemargin", startRule);
        parser.addListener("startkeyframerule", startRule);
        parser.addListener("startviewport", startRule);

        parser.addListener("property", function(event) {
            var name = event.property.text.toLowerCase(),
                value = event.value;

            if (lastRule) {
                lastRule.propCount++;
                if (name === "outline" && (value.toString() === "none" || value.toString() === "0")) {
                    lastRule.outline = true;
                }
            }
        });

        parser.addListener("endrule", endRule);
        parser.addListener("endfontface", endRule);
        parser.addListener("endpage", endRule);
        parser.addListener("endpagemargin", endRule);
        parser.addListener("endkeyframerule", endRule);
        parser.addListener("endviewport", endRule);
    }
});

/*
 * Rule: Don't use classes or IDs with elements (a.foo or a#foo).
 */

CSSLint.addRule({

    // rule information
    id: "overqualified-elements",
    name: "Disallow overqualified elements",
    desc: "Don't use classes or IDs with elements (a.foo or a#foo).",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-overqualified-elements",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this,
            classes = {};

        parser.addListener("startrule", function(event) {
            var selectors = event.selectors,
                selector,
                part,
                modifier,
                i, j, k;

            for (i=0; i < selectors.length; i++) {
                selector = selectors[i];

                for (j=0; j < selector.parts.length; j++) {
                    part = selector.parts[j];
                    if (part.type === parser.SELECTOR_PART_TYPE) {
                        for (k=0; k < part.modifiers.length; k++) {
                            modifier = part.modifiers[k];
                            if (part.elementName && modifier.type === "id") {
                                reporter.report("Element (" + part + ") is overqualified, just use " + modifier + " without element name.", part.line, part.col, rule);
                            } else if (modifier.type === "class") {

                                if (!classes[modifier]) {
                                    classes[modifier] = [];
                                }
                                classes[modifier].push({
                                    modifier: modifier,
                                    part: part
                                });
                            }
                        }
                    }
                }
            }
        });

        parser.addListener("endstylesheet", function() {

            var prop;
            for (prop in classes) {
                if (classes.hasOwnProperty(prop)) {

                    // one use means that this is overqualified
                    if (classes[prop].length === 1 && classes[prop][0].part.elementName) {
                        reporter.report("Element (" + classes[prop][0].part + ") is overqualified, just use " + classes[prop][0].modifier + " without element name.", classes[prop][0].part.line, classes[prop][0].part.col, rule);
                    }
                }
            }
        });
    }
});

/*
 * Rule: Headings (h1-h6) should not be qualified (namespaced).
 */

CSSLint.addRule({

    // rule information
    id: "qualified-headings",
    name: "Disallow qualified headings",
    desc: "Headings should not be qualified (namespaced).",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-qualified-headings",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;

        parser.addListener("startrule", function(event) {
            var selectors = event.selectors,
                selector,
                part,
                i, j;

            for (i=0; i < selectors.length; i++) {
                selector = selectors[i];

                for (j=0; j < selector.parts.length; j++) {
                    part = selector.parts[j];
                    if (part.type === parser.SELECTOR_PART_TYPE) {
                        if (part.elementName && /h[1-6]/.test(part.elementName.toString()) && j > 0) {
                            reporter.report("Heading (" + part.elementName + ") should not be qualified.", part.line, part.col, rule);
                        }
                    }
                }
            }
        });
    }
});

/*
 * Rule: Selectors that look like regular expressions are slow and should be avoided.
 */

CSSLint.addRule({

    // rule information
    id: "regex-selectors",
    name: "Disallow selectors that look like regexs",
    desc: "Selectors that look like regular expressions are slow and should be avoided.",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-selectors-that-look-like-regular-expressions",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;

        parser.addListener("startrule", function(event) {
            var selectors = event.selectors,
                selector,
                part,
                modifier,
                i, j, k;

            for (i=0; i < selectors.length; i++) {
                selector = selectors[i];
                for (j=0; j < selector.parts.length; j++) {
                    part = selector.parts[j];
                    if (part.type === parser.SELECTOR_PART_TYPE) {
                        for (k=0; k < part.modifiers.length; k++) {
                            modifier = part.modifiers[k];
                            if (modifier.type === "attribute") {
                                if (/([~\|\^\$\*]=)/.test(modifier)) {
                                    reporter.report("Attribute selectors with " + RegExp.$1 + " are slow!", modifier.line, modifier.col, rule);
                                }
                            }
                        }
                    }
                }
            }
        });
    }
});

/*
 * Rule: Total number of rules should not exceed x.
 */

CSSLint.addRule({

    // rule information
    id: "rules-count",
    name: "Rules Count",
    desc: "Track how many rules there are.",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var count = 0;

        // count each rule
        parser.addListener("startrule", function() {
            count++;
        });

        parser.addListener("endstylesheet", function() {
            reporter.stat("rule-count", count);
        });
    }
});

/*
 * Rule: Warn people with approaching the IE 4095 limit
 */

CSSLint.addRule({

    // rule information
    id: "selector-max-approaching",
    name: "Warn when approaching the 4095 selector limit for IE",
    desc: "Will warn when selector count is >= 3800 selectors.",
    browsers: "IE",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this, count = 0;

        parser.addListener("startrule", function(event) {
            count += event.selectors.length;
        });

        parser.addListener("endstylesheet", function() {
            if (count >= 3800) {
                reporter.report("You have " + count + " selectors. Internet Explorer supports a maximum of 4095 selectors per stylesheet. Consider refactoring.", 0, 0, rule);
            }
        });
    }
});

/*
 * Rule: Warn people past the IE 4095 limit
 */

CSSLint.addRule({

    // rule information
    id: "selector-max",
    name: "Error when past the 4095 selector limit for IE",
    desc: "Will error when selector count is > 4095.",
    browsers: "IE",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this, count = 0;

        parser.addListener("startrule", function(event) {
            count += event.selectors.length;
        });

        parser.addListener("endstylesheet", function() {
            if (count > 4095) {
                reporter.report("You have " + count + " selectors. Internet Explorer supports a maximum of 4095 selectors per stylesheet. Consider refactoring.", 0, 0, rule);
            }
        });
    }
});

/*
 * Rule: Avoid new-line characters in selectors.
 */

CSSLint.addRule({

    // rule information
    id: "selector-newline",
    name: "Disallow new-line characters in selectors",
    desc: "New-line characters in selectors are usually a forgotten comma and not a descendant combinator.",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;

        function startRule(event) {
            var i, len, selector, p, n, pLen, part, part2, type, currentLine, nextLine,
                selectors = event.selectors;

            for (i = 0, len = selectors.length; i < len; i++) {
                selector = selectors[i];
                for (p = 0, pLen = selector.parts.length; p < pLen; p++) {
                    for (n = p + 1; n < pLen; n++) {
                        part = selector.parts[p];
                        part2 = selector.parts[n];
                        type = part.type;
                        currentLine = part.line;
                        nextLine = part2.line;

                        if (type === "descendant" && nextLine > currentLine) {
                            reporter.report("newline character found in selector (forgot a comma?)", currentLine, selectors[i].parts[0].col, rule);
                        }
                    }
                }
            }
        }

        parser.addListener("startrule", startRule);
    }
});

/*
 * Rule: Use shorthand properties where possible.
 *
 */

CSSLint.addRule({

    // rule information
    id: "shorthand",
    name: "Require shorthand properties",
    desc: "Use shorthand properties where possible.",
    url: "https://github.com/CSSLint/csslint/wiki/Require-shorthand-properties",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this,
            prop, i, len,
            propertiesToCheck = {},
            properties,
            mapping = {
                "margin": [
                    "margin-top",
                    "margin-bottom",
                    "margin-left",
                    "margin-right"
                ],
                "padding": [
                    "padding-top",
                    "padding-bottom",
                    "padding-left",
                    "padding-right"
                ]
            };

        // initialize propertiesToCheck
        for (prop in mapping) {
            if (mapping.hasOwnProperty(prop)) {
                for (i=0, len=mapping[prop].length; i < len; i++) {
                    propertiesToCheck[mapping[prop][i]] = prop;
                }
            }
        }

        function startRule() {
            properties = {};
        }

        // event handler for end of rules
        function endRule(event) {

            var prop, i, len, total;

            // check which properties this rule has
            for (prop in mapping) {
                if (mapping.hasOwnProperty(prop)) {
                    total=0;

                    for (i=0, len=mapping[prop].length; i < len; i++) {
                        total += properties[mapping[prop][i]] ? 1 : 0;
                    }

                    if (total === mapping[prop].length) {
                        reporter.report("The properties " + mapping[prop].join(", ") + " can be replaced by " + prop + ".", event.line, event.col, rule);
                    }
                }
            }
        }

        parser.addListener("startrule", startRule);
        parser.addListener("startfontface", startRule);

        // check for use of "font-size"
        parser.addListener("property", function(event) {
            var name = event.property.toString().toLowerCase();

            if (propertiesToCheck[name]) {
                properties[name] = 1;
            }
        });

        parser.addListener("endrule", endRule);
        parser.addListener("endfontface", endRule);
    }
});

/*
 * Rule: Don't use properties with a star prefix.
 *
 */

CSSLint.addRule({

    // rule information
    id: "star-property-hack",
    name: "Disallow properties with a star prefix",
    desc: "Checks for the star property hack (targets IE6/7)",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-star-hack",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;

        // check if property name starts with "*"
        parser.addListener("property", function(event) {
            var property = event.property;

            if (property.hack === "*") {
                reporter.report("Property with star prefix found.", event.property.line, event.property.col, rule);
            }
        });
    }
});

/*
 * Rule: Don't use text-indent for image replacement if you need to support rtl.
 *
 */

CSSLint.addRule({

    // rule information
    id: "text-indent",
    name: "Disallow negative text-indent",
    desc: "Checks for text indent less than -99px",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-negative-text-indent",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this,
            textIndent,
            direction;

        function startRule() {
            textIndent = false;
            direction = "inherit";
        }

        // event handler for end of rules
        function endRule() {
            if (textIndent && direction !== "ltr") {
                reporter.report("Negative text-indent doesn't work well with RTL. If you use text-indent for image replacement explicitly set direction for that item to ltr.", textIndent.line, textIndent.col, rule);
            }
        }

        parser.addListener("startrule", startRule);
        parser.addListener("startfontface", startRule);

        // check for use of "font-size"
        parser.addListener("property", function(event) {
            var name = event.property.toString().toLowerCase(),
                value = event.value;

            if (name === "text-indent" && value.parts[0].value < -99) {
                textIndent = event.property;
            } else if (name === "direction" && value.toString() === "ltr") {
                direction = "ltr";
            }
        });

        parser.addListener("endrule", endRule);
        parser.addListener("endfontface", endRule);
    }
});

/*
 * Rule: Don't use properties with a underscore prefix.
 *
 */

CSSLint.addRule({

    // rule information
    id: "underscore-property-hack",
    name: "Disallow properties with an underscore prefix",
    desc: "Checks for the underscore property hack (targets IE6)",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-underscore-hack",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;

        // check if property name starts with "_"
        parser.addListener("property", function(event) {
            var property = event.property;

            if (property.hack === "_") {
                reporter.report("Property with underscore prefix found.", event.property.line, event.property.col, rule);
            }
        });
    }
});

/*
 * Rule: Headings (h1-h6) should be defined only once.
 */

CSSLint.addRule({

    // rule information
    id: "unique-headings",
    name: "Headings should only be defined once",
    desc: "Headings should be defined only once.",
    url: "https://github.com/CSSLint/csslint/wiki/Headings-should-only-be-defined-once",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;

        var headings = {
            h1: 0,
            h2: 0,
            h3: 0,
            h4: 0,
            h5: 0,
            h6: 0
        };

        parser.addListener("startrule", function(event) {
            var selectors = event.selectors,
                selector,
                part,
                pseudo,
                i, j;

            for (i=0; i < selectors.length; i++) {
                selector = selectors[i];
                part = selector.parts[selector.parts.length-1];

                if (part.elementName && /(h[1-6])/i.test(part.elementName.toString())) {

                    for (j=0; j < part.modifiers.length; j++) {
                        if (part.modifiers[j].type === "pseudo") {
                            pseudo = true;
                            break;
                        }
                    }

                    if (!pseudo) {
                        headings[RegExp.$1]++;
                        if (headings[RegExp.$1] > 1) {
                            reporter.report("Heading (" + part.elementName + ") has already been defined.", part.line, part.col, rule);
                        }
                    }
                }
            }
        });

        parser.addListener("endstylesheet", function() {
            var prop,
                messages = [];

            for (prop in headings) {
                if (headings.hasOwnProperty(prop)) {
                    if (headings[prop] > 1) {
                        messages.push(headings[prop] + " " + prop + "s");
                    }
                }
            }

            if (messages.length) {
                reporter.rollupWarn("You have " + messages.join(", ") + " defined in this stylesheet.", rule);
            }
        });
    }
});

/*
 * Rule: Don't use universal selector because it's slow.
 */

CSSLint.addRule({

    // rule information
    id: "universal-selector",
    name: "Disallow universal selector",
    desc: "The universal selector (*) is known to be slow.",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-universal-selector",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;

        parser.addListener("startrule", function(event) {
            var selectors = event.selectors,
                selector,
                part,
                i;

            for (i=0; i < selectors.length; i++) {
                selector = selectors[i];

                part = selector.parts[selector.parts.length-1];
                if (part.elementName === "*") {
                    reporter.report(rule.desc, part.line, part.col, rule);
                }
            }
        });
    }
});

/*
 * Rule: Don't use unqualified attribute selectors because they're just like universal selectors.
 */

CSSLint.addRule({

    // rule information
    id: "unqualified-attributes",
    name: "Disallow unqualified attribute selectors",
    desc: "Unqualified attribute selectors are known to be slow.",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-unqualified-attribute-selectors",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";

        var rule = this;

        parser.addListener("startrule", function(event) {

            var selectors = event.selectors,
                selectorContainsClassOrId = false,
                selector,
                part,
                modifier,
                i, k;

            for (i=0; i < selectors.length; i++) {
                selector = selectors[i];

                part = selector.parts[selector.parts.length-1];
                if (part.type === parser.SELECTOR_PART_TYPE) {
                    for (k=0; k < part.modifiers.length; k++) {
                        modifier = part.modifiers[k];

                        if (modifier.type === "class" || modifier.type === "id") {
                            selectorContainsClassOrId = true;
                            break;
                        }
                    }

                    if (!selectorContainsClassOrId) {
                        for (k=0; k < part.modifiers.length; k++) {
                            modifier = part.modifiers[k];
                            if (modifier.type === "attribute" && (!part.elementName || part.elementName === "*")) {
                                reporter.report(rule.desc, part.line, part.col, rule);
                            }
                        }
                    }
                }
            }
        });
    }
});

/*
 * Rule: When using a vendor-prefixed property, make sure to
 * include the standard one.
 */

CSSLint.addRule({

    // rule information
    id: "vendor-prefix",
    name: "Require standard property with vendor prefix",
    desc: "When using a vendor-prefixed property, make sure to include the standard one.",
    url: "https://github.com/CSSLint/csslint/wiki/Require-standard-property-with-vendor-prefix",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this,
            properties,
            num,
            propertiesToCheck = {
                "-webkit-border-radius": "border-radius",
                "-webkit-border-top-left-radius": "border-top-left-radius",
                "-webkit-border-top-right-radius": "border-top-right-radius",
                "-webkit-border-bottom-left-radius": "border-bottom-left-radius",
                "-webkit-border-bottom-right-radius": "border-bottom-right-radius",

                "-o-border-radius": "border-radius",
                "-o-border-top-left-radius": "border-top-left-radius",
                "-o-border-top-right-radius": "border-top-right-radius",
                "-o-border-bottom-left-radius": "border-bottom-left-radius",
                "-o-border-bottom-right-radius": "border-bottom-right-radius",

                "-moz-border-radius": "border-radius",
                "-moz-border-radius-topleft": "border-top-left-radius",
                "-moz-border-radius-topright": "border-top-right-radius",
                "-moz-border-radius-bottomleft": "border-bottom-left-radius",
                "-moz-border-radius-bottomright": "border-bottom-right-radius",

                "-moz-column-count": "column-count",
                "-webkit-column-count": "column-count",

                "-moz-column-gap": "column-gap",
                "-webkit-column-gap": "column-gap",

                "-moz-column-rule": "column-rule",
                "-webkit-column-rule": "column-rule",

                "-moz-column-rule-style": "column-rule-style",
                "-webkit-column-rule-style": "column-rule-style",

                "-moz-column-rule-color": "column-rule-color",
                "-webkit-column-rule-color": "column-rule-color",

                "-moz-column-rule-width": "column-rule-width",
                "-webkit-column-rule-width": "column-rule-width",

                "-moz-column-width": "column-width",
                "-webkit-column-width": "column-width",

                "-webkit-column-span": "column-span",
                "-webkit-columns": "columns",

                "-moz-box-shadow": "box-shadow",
                "-webkit-box-shadow": "box-shadow",

                "-moz-transform": "transform",
                "-webkit-transform": "transform",
                "-o-transform": "transform",
                "-ms-transform": "transform",

                "-moz-transform-origin": "transform-origin",
                "-webkit-transform-origin": "transform-origin",
                "-o-transform-origin": "transform-origin",
                "-ms-transform-origin": "transform-origin",

                "-moz-box-sizing": "box-sizing",
                "-webkit-box-sizing": "box-sizing"
            };

        // event handler for beginning of rules
        function startRule() {
            properties = {};
            num = 1;
        }

        // event handler for end of rules
        function endRule() {
            var prop,
                i,
                len,
                needed,
                actual,
                needsStandard = [];

            for (prop in properties) {
                if (propertiesToCheck[prop]) {
                    needsStandard.push({
                        actual: prop,
                        needed: propertiesToCheck[prop]
                    });
                }
            }

            for (i=0, len=needsStandard.length; i < len; i++) {
                needed = needsStandard[i].needed;
                actual = needsStandard[i].actual;

                if (!properties[needed]) {
                    reporter.report("Missing standard property '" + needed + "' to go along with '" + actual + "'.", properties[actual][0].name.line, properties[actual][0].name.col, rule);
                } else {
                    // make sure standard property is last
                    if (properties[needed][0].pos < properties[actual][0].pos) {
                        reporter.report("Standard property '" + needed + "' should come after vendor-prefixed property '" + actual + "'.", properties[actual][0].name.line, properties[actual][0].name.col, rule);
                    }
                }
            }
        }

        parser.addListener("startrule", startRule);
        parser.addListener("startfontface", startRule);
        parser.addListener("startpage", startRule);
        parser.addListener("startpagemargin", startRule);
        parser.addListener("startkeyframerule", startRule);
        parser.addListener("startviewport", startRule);

        parser.addListener("property", function(event) {
            var name = event.property.text.toLowerCase();

            if (!properties[name]) {
                properties[name] = [];
            }

            properties[name].push({
                name: event.property,
                value: event.value,
                pos: num++
            });
        });

        parser.addListener("endrule", endRule);
        parser.addListener("endfontface", endRule);
        parser.addListener("endpage", endRule);
        parser.addListener("endpagemargin", endRule);
        parser.addListener("endkeyframerule", endRule);
        parser.addListener("endviewport", endRule);
    }
});

/*
 * Rule: You don't need to specify units when a value is 0.
 */

CSSLint.addRule({

    // rule information
    id: "zero-units",
    name: "Disallow units for 0 values",
    desc: "You don't need to specify units when a value is 0.",
    url: "https://github.com/CSSLint/csslint/wiki/Disallow-units-for-zero-values",
    browsers: "All",

    // initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;

        // count how many times "float" is used
        parser.addListener("property", function(event) {
            var parts = event.value.parts,
                i = 0,
                len = parts.length;

            while (i < len) {
                if ((parts[i].units || parts[i].type === "percentage") && parts[i].value === 0 && parts[i].type !== "time") {
                    reporter.report("Values of 0 shouldn't have units specified.", parts[i].line, parts[i].col, rule);
                }
                i++;
            }
        });
    }
});

(function() {
    "use strict";

    /**
     * Replace special characters before write to output.
     *
     * Rules:
     *  - single quotes is the escape sequence for double-quotes
     *  - &amp; is the escape sequence for &
     *  - &lt; is the escape sequence for <
     *  - &gt; is the escape sequence for >
     *
     * @param {String} message to escape
     * @return escaped message as {String}
     */
    var xmlEscape = function(str) {
        if (!str || str.constructor !== String) {
            return "";
        }

        return str.replace(/["&><]/g, function(match) {
            switch (match) {
                case "\"":
                    return "&quot;";
                case "&":
                    return "&amp;";
                case "<":
                    return "&lt;";
                case ">":
                    return "&gt;";
            }
        });
    };

    CSSLint.addFormatter({
        // format information
        id: "checkstyle-xml",
        name: "Checkstyle XML format",

        /**
         * Return opening root XML tag.
         * @return {String} to prepend before all results
         */
        startFormat: function() {
            return "<?xml version=\"1.0\" encoding=\"utf-8\"?><checkstyle>";
        },

        /**
         * Return closing root XML tag.
         * @return {String} to append after all results
         */
        endFormat: function() {
            return "</checkstyle>";
        },

        /**
         * Returns message when there is a file read error.
         * @param {String} filename The name of the file that caused the error.
         * @param {String} message The error message
         * @return {String} The error message.
         */
        readError: function(filename, message) {
            return "<file name=\"" + xmlEscape(filename) + "\"><error line=\"0\" column=\"0\" severty=\"error\" message=\"" + xmlEscape(message) + "\"></error></file>";
        },

        /**
         * Given CSS Lint results for a file, return output for this format.
         * @param results {Object} with error and warning messages
         * @param filename {String} relative file path
         * @param options {Object} (UNUSED for now) specifies special handling of output
         * @return {String} output for results
         */
        formatResults: function(results, filename/*, options*/) {
            var messages = results.messages,
                output = [];

            /**
             * Generate a source string for a rule.
             * Checkstyle source strings usually resemble Java class names e.g
             * net.csslint.SomeRuleName
             * @param {Object} rule
             * @return rule source as {String}
             */
            var generateSource = function(rule) {
                if (!rule || !("name" in rule)) {
                    return "";
                }
                return "net.csslint." + rule.name.replace(/\s/g, "");
            };

            if (messages.length > 0) {
                output.push("<file name=\""+filename+"\">");
                CSSLint.Util.forEach(messages, function (message) {
                    // ignore rollups for now
                    if (!message.rollup) {
                        output.push("<error line=\"" + message.line + "\" column=\"" + message.col + "\" severity=\"" + message.type + "\"" +
                          " message=\"" + xmlEscape(message.message) + "\" source=\"" + generateSource(message.rule) +"\"/>");
                    }
                });
                output.push("</file>");
            }

            return output.join("");
        }
    });
}());

CSSLint.addFormatter({
    // format information
    id: "compact",
    name: "Compact, 'porcelain' format",

    /**
     * Return content to be printed before all file results.
     * @return {String} to prepend before all results
     */
    startFormat: function() {
        "use strict";
        return "";
    },

    /**
     * Return content to be printed after all file results.
     * @return {String} to append after all results
     */
    endFormat: function() {
        "use strict";
        return "";
    },

    /**
     * Given CSS Lint results for a file, return output for this format.
     * @param results {Object} with error and warning messages
     * @param filename {String} relative file path
     * @param options {Object} (Optional) specifies special handling of output
     * @return {String} output for results
     */
    formatResults: function(results, filename, options) {
        "use strict";
        var messages = results.messages,
            output = "";
        options = options || {};

        /**
         * Capitalize and return given string.
         * @param str {String} to capitalize
         * @return {String} capitalized
         */
        var capitalize = function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        };

        if (messages.length === 0) {
            return options.quiet ? "" : filename + ": Lint Free!";
        }

        CSSLint.Util.forEach(messages, function(message) {
            if (message.rollup) {
                output += filename + ": " + capitalize(message.type) + " - " + message.message + " (" + message.rule.id + ")\n";
            } else {
                output += filename + ": line " + message.line +
                    ", col " + message.col + ", " + capitalize(message.type) + " - " + message.message + " (" + message.rule.id + ")\n";
            }
        });

        return output;
    }
});

CSSLint.addFormatter({
    // format information
    id: "csslint-xml",
    name: "CSSLint XML format",

    /**
     * Return opening root XML tag.
     * @return {String} to prepend before all results
     */
    startFormat: function() {
        "use strict";
        return "<?xml version=\"1.0\" encoding=\"utf-8\"?><csslint>";
    },

    /**
     * Return closing root XML tag.
     * @return {String} to append after all results
     */
    endFormat: function() {
        "use strict";
        return "</csslint>";
    },

    /**
     * Given CSS Lint results for a file, return output for this format.
     * @param results {Object} with error and warning messages
     * @param filename {String} relative file path
     * @param options {Object} (UNUSED for now) specifies special handling of output
     * @return {String} output for results
     */
    formatResults: function(results, filename/*, options*/) {
        "use strict";
        var messages = results.messages,
            output = [];

        /**
         * Replace special characters before write to output.
         *
         * Rules:
         *  - single quotes is the escape sequence for double-quotes
         *  - &amp; is the escape sequence for &
         *  - &lt; is the escape sequence for <
         *  - &gt; is the escape sequence for >
         *
         * @param {String} message to escape
         * @return escaped message as {String}
         */
        var escapeSpecialCharacters = function(str) {
            if (!str || str.constructor !== String) {
                return "";
            }
            return str.replace(/"/g, "'").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        };

        if (messages.length > 0) {
            output.push("<file name=\""+filename+"\">");
            CSSLint.Util.forEach(messages, function (message) {
                if (message.rollup) {
                    output.push("<issue severity=\"" + message.type + "\" reason=\"" + escapeSpecialCharacters(message.message) + "\" evidence=\"" + escapeSpecialCharacters(message.evidence) + "\"/>");
                } else {
                    output.push("<issue line=\"" + message.line + "\" char=\"" + message.col + "\" severity=\"" + message.type + "\"" +
                        " reason=\"" + escapeSpecialCharacters(message.message) + "\" evidence=\"" + escapeSpecialCharacters(message.evidence) + "\"/>");
                }
            });
            output.push("</file>");
        }

        return output.join("");
    }
});

/* globals JSON: true */

CSSLint.addFormatter({
    // format information
    id: "json",
    name: "JSON",

    /**
     * Return content to be printed before all file results.
     * @return {String} to prepend before all results
     */
    startFormat: function() {
        "use strict";
        this.json = [];
        return "";
    },

    /**
     * Return content to be printed after all file results.
     * @return {String} to append after all results
     */
    endFormat: function() {
        "use strict";
        var ret = "";
        if (this.json.length > 0) {
            if (this.json.length === 1) {
                ret = JSON.stringify(this.json[0]);
            } else {
                ret = JSON.stringify(this.json);
            }
        }
        return ret;
    },

    /**
     * Given CSS Lint results for a file, return output for this format.
     * @param results {Object} with error and warning messages
     * @param filename {String} relative file path (Unused)
     * @return {String} output for results
     */
    formatResults: function(results, filename, options) {
        "use strict";
        if (results.messages.length > 0 || !options.quiet) {
            this.json.push({
                filename: filename,
                messages: results.messages,
                stats: results.stats
            });
        }
        return "";
    }
});

CSSLint.addFormatter({
    // format information
    id: "junit-xml",
    name: "JUNIT XML format",

    /**
     * Return opening root XML tag.
     * @return {String} to prepend before all results
     */
    startFormat: function() {
        "use strict";
        return "<?xml version=\"1.0\" encoding=\"utf-8\"?><testsuites>";
    },

    /**
     * Return closing root XML tag.
     * @return {String} to append after all results
     */
    endFormat: function() {
        "use strict";
        return "</testsuites>";
    },

    /**
     * Given CSS Lint results for a file, return output for this format.
     * @param results {Object} with error and warning messages
     * @param filename {String} relative file path
     * @param options {Object} (UNUSED for now) specifies special handling of output
     * @return {String} output for results
     */
    formatResults: function(results, filename/*, options*/) {
        "use strict";

        var messages = results.messages,
            output = [],
            tests = {
                "error": 0,
                "failure": 0
            };

        /**
         * Generate a source string for a rule.
         * JUNIT source strings usually resemble Java class names e.g
         * net.csslint.SomeRuleName
         * @param {Object} rule
         * @return rule source as {String}
         */
        var generateSource = function(rule) {
            if (!rule || !("name" in rule)) {
                return "";
            }
            return "net.csslint." + rule.name.replace(/\s/g, "");
        };

        /**
         * Replace special characters before write to output.
         *
         * Rules:
         *  - single quotes is the escape sequence for double-quotes
         *  - &lt; is the escape sequence for <
         *  - &gt; is the escape sequence for >
         *
         * @param {String} message to escape
         * @return escaped message as {String}
         */
        var escapeSpecialCharacters = function(str) {

            if (!str || str.constructor !== String) {
                return "";
            }

            return str.replace(/"/g, "'").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        };

        if (messages.length > 0) {

            messages.forEach(function (message) {

                // since junit has no warning class
                // all issues as errors
                var type = message.type === "warning" ? "error" : message.type;

                // ignore rollups for now
                if (!message.rollup) {

                    // build the test case separately, once joined
                    // we'll add it to a custom array filtered by type
                    output.push("<testcase time=\"0\" name=\"" + generateSource(message.rule) + "\">");
                    output.push("<" + type + " message=\"" + escapeSpecialCharacters(message.message) + "\"><![CDATA[" + message.line + ":" + message.col + ":" + escapeSpecialCharacters(message.evidence) + "]]></" + type + ">");
                    output.push("</testcase>");

                    tests[type] += 1;
                }
            });

            output.unshift("<testsuite time=\"0\" tests=\"" + messages.length + "\" skipped=\"0\" errors=\"" + tests.error + "\" failures=\"" + tests.failure + "\" package=\"net.csslint\" name=\"" + filename + "\">");
            output.push("</testsuite>");
        }

        return output.join("");
    }
});

CSSLint.addFormatter({
    // format information
    id: "lint-xml",
    name: "Lint XML format",

    /**
     * Return opening root XML tag.
     * @return {String} to prepend before all results
     */
    startFormat: function() {
        "use strict";
        return "<?xml version=\"1.0\" encoding=\"utf-8\"?><lint>";
    },

    /**
     * Return closing root XML tag.
     * @return {String} to append after all results
     */
    endFormat: function() {
        "use strict";
        return "</lint>";
    },

    /**
     * Given CSS Lint results for a file, return output for this format.
     * @param results {Object} with error and warning messages
     * @param filename {String} relative file path
     * @param options {Object} (UNUSED for now) specifies special handling of output
     * @return {String} output for results
     */
    formatResults: function(results, filename/*, options*/) {
        "use strict";
        var messages = results.messages,
            output = [];

        /**
         * Replace special characters before write to output.
         *
         * Rules:
         *  - single quotes is the escape sequence for double-quotes
         *  - &amp; is the escape sequence for &
         *  - &lt; is the escape sequence for <
         *  - &gt; is the escape sequence for >
         *
         * @param {String} message to escape
         * @return escaped message as {String}
         */
        var escapeSpecialCharacters = function(str) {
            if (!str || str.constructor !== String) {
                return "";
            }
            return str.replace(/"/g, "'").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        };

        if (messages.length > 0) {

            output.push("<file name=\""+filename+"\">");
            CSSLint.Util.forEach(messages, function (message) {
                if (message.rollup) {
                    output.push("<issue severity=\"" + message.type + "\" reason=\"" + escapeSpecialCharacters(message.message) + "\" evidence=\"" + escapeSpecialCharacters(message.evidence) + "\"/>");
                } else {
                    var rule = "";
                    if (message.rule && message.rule.id) {
                        rule = "rule=\"" + escapeSpecialCharacters(message.rule.id) + "\" ";
                    }
                    output.push("<issue " + rule + "line=\"" + message.line + "\" char=\"" + message.col + "\" severity=\"" + message.type + "\"" +
                        " reason=\"" + escapeSpecialCharacters(message.message) + "\" evidence=\"" + escapeSpecialCharacters(message.evidence) + "\"/>");
                }
            });
            output.push("</file>");
        }

        return output.join("");
    }
});

CSSLint.addFormatter({
    // format information
    id: "text",
    name: "Plain Text",

    /**
     * Return content to be printed before all file results.
     * @return {String} to prepend before all results
     */
    startFormat: function() {
        "use strict";
        return "";
    },

    /**
     * Return content to be printed after all file results.
     * @return {String} to append after all results
     */
    endFormat: function() {
        "use strict";
        return "";
    },

    /**
     * Given CSS Lint results for a file, return output for this format.
     * @param results {Object} with error and warning messages
     * @param filename {String} relative file path
     * @param options {Object} (Optional) specifies special handling of output
     * @return {String} output for results
     */
    formatResults: function(results, filename, options) {
        "use strict";
        var messages = results.messages,
            output = "";
        options = options || {};

        if (messages.length === 0) {
            return options.quiet ? "" : "\n\ncsslint: No errors in " + filename + ".";
        }

        output = "\n\ncsslint: There ";
        if (messages.length === 1) {
            output += "is 1 problem";
        } else {
            output += "are " + messages.length + " problems";
        }
        output += " in " + filename + ".";

        var pos = filename.lastIndexOf("/"),
            shortFilename = filename;

        if (pos === -1) {
            pos = filename.lastIndexOf("\\");
        }
        if (pos > -1) {
            shortFilename = filename.substring(pos+1);
        }

        CSSLint.Util.forEach(messages, function (message, i) {
            output = output + "\n\n" + shortFilename;
            if (message.rollup) {
                output += "\n" + (i+1) + ": " + message.type;
                output += "\n" + message.message;
            } else {
                output += "\n" + (i+1) + ": " + message.type + " at line " + message.line + ", col " + message.col;
                output += "\n" + message.message;
                output += "\n" + message.evidence;
            }
        });

        return output;
    }
});

return CSSLint;
})();
local.CSSLint = CSSLint;
/* jslint ignore:end */



// jslint-hack - var
var jslint_extra;
var jslint_result;
var line_ignore;
var lines_extra;
/*
file https://github.com/douglascrockford/JSLint/blob/ea8401c6a72e21d66f49766af692b09e81d7a79f/jslint.js
*/
/* jslint utility2:true */
var next_line_extra = null;
var warn_at_extra = null;
// jslint.js
// 2019-01-31
// Copyright (c) 2015 Douglas Crockford  (www.JSLint.com)

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// The Software shall be used for Good, not Evil.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// jslint(source, option_object, global_array) is a function that takes 3
// arguments. The second two arguments are optional.

//      source          A text to analyze, a string or an array of strings.
//      option_object   An object whose keys correspond to option names.
//      global_array    An array of strings containing global variables that
//                      the file is allowed readonly access.

// jslint returns an object containing its results. The object contains a lot
// of valuable information. It can be used to generate reports. The object
// contains:

//      directives: an array of directive comment tokens.
//      edition: the version of JSLint that did the analysis.
//      exports: the names exported from the module.
//      froms: an array of strings representing each of the imports.
//      functions: an array of objects that represent all of the functions
//              declared in the file.
//      global: an object representing the global object. Its .context property
//              is an object containing a property for each global variable.
//      id: "(JSLint)"
//      json: true if the file is a JSON text.
//      lines: an array of strings, the source.
//      module: true if an import or export statement was used.
//      ok: true if no warnings were generated. This is what you want.
//      option: the option argument.
//      property: a property object.
//      stop: true if JSLint was unable to finish. You don't want this.
//      tokens: an array of objects representing the tokens in the file.
//      tree: the token objects arranged in a tree.
//      warnings: an array of warning objects. A warning object can contain:
//          name: "JSLintError"
//          column: A column number in the file.
//          line: A line number in the file.
//          code: A warning code string.
//          message: The warning message string.
//          a: Exhibit A.
//          b: Exhibit B.
//          c: Exhibit C.
//          d: Exhibit D.

// jslint works in several phases. In any of these phases, errors might be
// found. Sometimes JSLint is able to recover from an error and continue
// parsing. In some cases, it cannot and will stop early. If that should happen,
// repair your code and try again.

// Phases:

//      1. If the source is a single string, split it into an array of strings.
//      2. Turn the source into an array of tokens.
//      3. Furcate the tokens into a parse tree.
//      4. Walk the tree, traversing all of the nodes of the tree. It is a
//          recursive traversal. Each node may be processed on the way down
//          (preaction) and on the way up (postaction).
//      5. Check the whitespace between the tokens.

// jslint can also examine JSON text. It decides that a file is JSON text if
// the first token is "[" or "{". Processing of JSON text is much simpler than
// the processing of JavaScript programs. Only the first three phases are
// required.

// WARNING: JSLint will hurt your feelings.

// jslint-hack - property
/*\property
    a, and, arity, assign, b, bad_assignment_a, bad_directive_a, bad_get,
    bad_module_name_a, bad_option_a, bad_property_a, bad_set, bitwise, block,
    body, browser, c, calls, catch, charCodeAt, closer, closure, code, column,
    concat, constant, context, convert, couch, create, d, dead, default, devel,
    directive, directives, disrupt, dot, duplicate_a, edition, ellipsis, else,
    empty_block, escape_mega, eval, every, expected_a, expected_a_at_b_c,
    expected_a_b, expected_a_b_from_c_d, expected_a_before_b,
    expected_a_next_at_b, expected_digits_after_a, expected_four_digits,
    expected_identifier_a, expected_line_break_a_b, expected_regexp_factor_a,
    expected_space_a_b, expected_statements_a, expected_string_a,
    expected_type_string_a, exports, expression, extra, finally, flag, for,
    forEach, free, freeze, freeze_exports, from, froms, fud, fudge,
    function_in_loop, functions, g, getset, global, i, id, identifier, import,
    inc, indexOf, infix_in, init, initial, isArray, isNaN, join, json, keys,
    label, label_a, lbp, led, length, level, line, lines, live, long, loop, m,
    margin, match, message, misplaced_a, misplaced_directive_a, missing_browser,
    missing_m, module, naked_block, name, names, nested_comment, new, node,
    not_label_a, nr, nud, number_isNaN, ok, open, opening, option,
    out_of_scope_a, parameters, parent, pop, property, push, quote,
    redefinition_a_b, replace, required_a_optional_b, reserved_a, role, search,
    shebang, signature, single, slice, some, sort, split, startsWith, statement,
    stop, subscript_a, switch, test, this, thru, toString, todo_comment,
    tokens, too_long, too_many_digits, tree, try, type, u, unclosed_comment,
    unclosed_mega, unclosed_string, undeclared_a, unexpected_a,
    unexpected_a_after_b, unexpected_a_before_b, unexpected_at_top_level_a,
    unexpected_char_a, unexpected_comment, unexpected_directive_a,
    unexpected_expression_a, unexpected_label_a, unexpected_parens,
    unexpected_space_a_b, unexpected_statement_a, unexpected_trailing_space,
    unexpected_typeof_a, uninitialized_a, unreachable_a,
    unregistered_property_a, unsafe, unused_a, use_double, use_open, use_spaces,
    used, value, var_loop, var_switch, variable, warning, warnings,
    weird_condition_a, weird_expression_a, weird_loop, weird_relation_a, white,
    wrap_condition, wrap_immediate, wrap_parameter, wrap_regexp, wrap_unary,
    wrapped, writable, y
*/

function empty() {

// The empty function produces a new empty object that inherits nothing. This is
// much better than '{}' because confusions around accidental method names like
// 'constructor' are completely avoided.

    return Object.create(null);
}

function populate(array, object = empty(), value = true) {

// Augment an object by taking property names from an array of strings.

    array.forEach(function (name) {
        object[name] = value;
    });
    return object;
}

var allowed_option = {

// These are the options that are recognized in the option object or that may
// appear in a /*jslint*/ directive. Most options will have a boolean value,
// usually true. Some options will also predefine some number of global
// variables.

    bitwise: true,
    browser: [
        "caches", "clearInterval", "clearTimeout", "document", "DOMException",
        "Element", "Event", "event", "FileReader", "FormData", "history",
        "localStorage", "location", "MutationObserver", "name", "navigator",
        "screen", "sessionStorage", "setInterval", "setTimeout", "Storage",
        "TextDecoder", "TextEncoder", "URL", "window", "Worker",
        "XMLHttpRequest"
    ],
    couch: [
        "emit", "getRow", "isArray", "log", "provides", "registerType",
        "require", "send", "start", "sum", "toJSON"
    ],
    convert: true,
    devel: [
        "alert", "confirm", "console", "prompt"
    ],
    eval: true,
    for: true,
    fudge: true,
    getset: true,
    long: true,
    node: [
        "Buffer", "clearImmediate", "clearInterval", "clearTimeout",
        "console", "exports", "module", "process", "require",
        "setImmediate", "setInterval", "setTimeout", "TextDecoder",
        "TextEncoder", "URL", "URLSearchParams", "__dirname", "__filename"
    ],
    single: true,
    this: true,
    white: true
};

var anticondition = populate([
    "?", "~", "&", "|", "^", "<<", ">>", ">>>", "+", "-", "*", "/", "%",
    "typeof", "(number)", "(string)"
]);

// These are the bitwise operators.

var bitwiseop = populate([
    "~", "^", "^=", "&", "&=", "|", "|=", "<<", "<<=", ">>", ">>=",
    ">>>", ">>>="
]);

var escapeable = populate([
    "\\", "/", "`", "b", "f", "n", "r", "t"
]);

var opener = {

// The open and close pairs.

    "(": ")", // paren
    "[": "]", // bracket
    "{": "}", // brace
    "${": "}" // mega
};

// The relational operators.

var relationop = populate([
    "!=", "!==", "==", "===", "<", "<=", ">", ">="
]);

// This is the set of infix operators that require a space on each side.

var spaceop = populate([
    "!=", "!==", "%", "%=", "&", "&=", "&&", "*", "*=", "+=", "-=", "/",
    "/=", "<", "<=", "<<", "<<=", "=", "==", "===", "=>", ">", ">=",
    ">>", ">>=", ">>>", ">>>=", "^", "^=", "|", "|=", "||"
]);

var standard = [

// These are the globals that are provided by the language standard.

    "Array", "ArrayBuffer", "Boolean", "DataView", "Date", "decodeURI",
    "decodeURIComponent", "encodeURI", "encodeURIComponent", "Error",
    "EvalError", "Float32Array", "Float64Array", "Generator",
    "GeneratorFunction", "Int8Array", "Int16Array", "Int32Array", "Intl",
    "JSON", "Map", "Math", "Number", "Object", "parseInt", "parseFloat",
    "Promise", "Proxy", "RangeError", "ReferenceError", "Reflect", "RegExp",
    "Set", "String", "Symbol", "SyntaxError", "System", "TypeError",
    "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array",
    "URIError", "WeakMap", "WeakSet"
];

var bundle = {

// The bundle contains the raw text messages that are generated by jslint. It
// seems that they are all error messages and warnings. There are no "Atta
// boy!" or "You are so awesome!" messages. There is no positive reinforcement
// or encouragement. This relentless negativity can undermine self-esteem and
// wound the inner child. But if you accept it as sound advice rather than as
// personal criticism, it can make your programs better.

    and: "The '&&' subexpression should be wrapped in parens.",
    bad_assignment_a: "Bad assignment to '{a}'.",
    bad_directive_a: "Bad directive '{a}'.",
    bad_get: "A get function takes no parameters.",
    bad_module_name_a: "Bad module name '{a}'.",
    bad_option_a: "Bad option '{a}'.",
    bad_property_a: "Bad property name '{a}'.",
    bad_set: "A set function takes one parameter.",
    duplicate_a: "Duplicate '{a}'.",
    empty_block: "Empty block.",
    escape_mega: "Unexpected escapement in mega literal.",
    expected_a: "Expected '{a}'.",
    expected_a_at_b_c: "Expected '{a}' at column {b}, not column {c}.",
    expected_a_b: "Expected '{a}' and instead saw '{b}'.",
    expected_a_b_from_c_d: (
        "Expected '{a}' to match '{b}' from line {c} and instead saw '{d}'."
    ),
    expected_a_before_b: "Expected '{a}' before '{b}'.",
    expected_a_next_at_b: "Expected '{a}' at column {b} on the next line.",
    expected_digits_after_a: "Expected digits after '{a}'.",
    expected_four_digits: "Expected four digits after '\\u'.",
    expected_identifier_a: "Expected an identifier and instead saw '{a}'.",
    expected_line_break_a_b: "Expected a line break between '{a}' and '{b}'.",
    expected_regexp_factor_a: "Expected a regexp factor and instead saw '{a}'.",
    expected_space_a_b: "Expected one space between '{a}' and '{b}'.",
    expected_statements_a: "Expected statements before '{a}'.",
    expected_string_a: "Expected a string and instead saw '{a}'.",
    expected_type_string_a: "Expected a type string and instead saw '{a}'.",
    freeze_exports: (
        "Expected 'Object.freeze('. All export values should be frozen."
    ),
    function_in_loop: "Don't make functions within a loop.",
    infix_in: (
        "Unexpected 'in'. Compare with undefined, "
        + "or use the hasOwnProperty method instead."
    ),
    label_a: "'{a}' is a statement label.",
    misplaced_a: "Place '{a}' at the outermost level.",
    misplaced_directive_a: (
        "Place the '/*{a}*/' directive before the first statement."
    ),
    missing_browser: "/*global*/ requires the Assume a browser option.",
    missing_m: "Expected 'm' flag on a multiline regular expression.",
    naked_block: "Naked block.",
    nested_comment: "Nested comment.",
    not_label_a: "'{a}' is not a label.",
    number_isNaN: "Use Number.isNaN function to compare with NaN.",
    out_of_scope_a: "'{a}' is out of scope.",
    redefinition_a_b: "Redefinition of '{a}' from line {b}.",
    required_a_optional_b: (
        "Required parameter '{a}' after optional parameter '{b}'."
    ),
    reserved_a: "Reserved name '{a}'.",
    subscript_a: "['{a}'] is better written in dot notation.",
    todo_comment: "Unexpected TODO comment.",
    too_long: "Line is longer than 80 characters.",
    too_many_digits: "Too many digits.",
    unclosed_comment: "Unclosed comment.",
    unclosed_mega: "Unclosed mega literal.",
    unclosed_string: "Unclosed string.",
    undeclared_a: "Undeclared '{a}'.",
    unexpected_a: "Unexpected '{a}'.",
    unexpected_a_after_b: "Unexpected '{a}' after '{b}'.",
    unexpected_a_before_b: "Unexpected '{a}' before '{b}'.",
    unexpected_at_top_level_a: "Expected '{a}' to be in a function.",
    unexpected_char_a: "Unexpected character '{a}'.",
    unexpected_comment: "Unexpected comment.",
    unexpected_directive_a: "When using modules, don't use directive '/*{a}'.",
    unexpected_expression_a: (
        "Unexpected expression '{a}' in statement position."
    ),
    unexpected_label_a: "Unexpected label '{a}'.",
    unexpected_parens: "Don't wrap function literals in parens.",
    unexpected_space_a_b: "Unexpected space between '{a}' and '{b}'.",
    unexpected_statement_a: (
        "Unexpected statement '{a}' in expression position."
    ),
    unexpected_trailing_space: "Unexpected trailing space.",
    unexpected_typeof_a: (
        "Unexpected 'typeof'. Use '===' to compare directly with {a}."
    ),
    uninitialized_a: "Uninitialized '{a}'.",
    unreachable_a: "Unreachable '{a}'.",
    unregistered_property_a: "Unregistered property name '{a}'.",
    unsafe: "Unsafe character '{a}'.",
    unused_a: "Unused '{a}'.",
    use_double: "Use double quotes, not single quotes.",
    use_open: (
        "Wrap a ternary expression in parens, "
        + "with a line break after the left paren."
    ),
    use_spaces: "Use spaces, not tabs.",
    var_loop: "Don't declare variables in a loop.",
    var_switch: "Don't declare variables in a switch.",
    weird_condition_a: "Weird condition '{a}'.",
    weird_expression_a: "Weird expression '{a}'.",
    weird_loop: "Weird loop.",
    weird_relation_a: "Weird relation '{a}'.",
    wrap_condition: "Wrap the condition in parens.",
    wrap_immediate: (
        "Wrap an immediate function invocation in parentheses to assist "
        + "the reader in understanding that the expression is the result "
        + "of a function, and not the function itself."
    ),
    wrap_parameter: "Wrap the parameter in parens.",
    wrap_regexp: "Wrap this regexp in parens to avoid confusion.",
    wrap_unary: "Wrap the unary expression in parens."
};

// Regular expression literals:

// supplant {variables}
var rx_supplant = (
    /\{([^{}]*)\}/g
);
// carriage return, carriage return linefeed, or linefeed
var rx_crlf = (
    /\n|\r\n?/
);
// unsafe characters that are silently deleted by one or more browsers
var rx_unsafe = (
    /[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/
);
// identifier
var rx_identifier = (
    /^([a-zA-Z_$][a-zA-Z0-9_$]*)$/
);
var rx_module = (
    /^[a-zA-Z0-9_$:.@\-\/]+$/
);
var rx_bad_property = (
    /^_|\$|Sync\$|_$/
);
// star slash
var rx_star_slash = (
    /\*\//
);
// slash star
var rx_slash_star = (
    /\/\*/
);
// slash star or ending slash
var rx_slash_star_or_slash = (
    /\/\*|\/$/
);
// uncompleted work comment
var rx_todo = (
    /\b(?:todo|TO\s?DO|HACK)\b/
);
// tab
var rx_tab = (
    /\t/g
);
// directive
var rx_directive = (
    /^(jslint|property|global)\s+(.*)$/
);
var rx_directive_part = (
    /^([a-zA-Z$_][a-zA-Z0-9$_]*)(?::\s*(true|false))?,?\s*(.*)$/
);
// token (sorry it is so long)
var rx_token = (
    /^((\s+)|([a-zA-Z_$][a-zA-Z0-9_$]*)|[(){}\[\],:;'"~`]|\?\.?|=(?:==?|>)?|\.+|[*\/][*\/=]?|\+[=+]?|-[=\-]?|[\^%]=?|&[&=]?|\|[|=]?|>{1,3}=?|<<?=?|!(?:!|==?)?|(0|[1-9][0-9]*))(.*)$/
);
var rx_digits = (
    /^([0-9]+)(.*)$/
);
var rx_hexs = (
    /^([0-9a-fA-F]+)(.*)$/
);
var rx_octals = (
    /^([0-7]+)(.*)$/
);
var rx_bits = (
    /^([01]+)(.*)$/
);
// mega
var rx_mega = (
    /[`\\]|\$\{/
);
// JSON number
var rx_JSON_number = (
    /^-?\d+(?:\.\d*)?(?:e[\-+]?\d+)?$/i
);
// initial cap
var rx_cap = (
    /^[A-Z]/
);

function is_letter(string) {
    return (
        (string >= "a" && string <= "z\uffff")
        || (string >= "A" && string <= "Z\uffff")
    );
}

function supplant(string, object) {
    return string.replace(rx_supplant, function (found, filling) {
        var replacement = object[filling];
        return (
            replacement !== undefined
            ? replacement
            : found
        );
    });
}

var anon; // The guessed name for anonymous functions.
var block_stack; // The stack of blocks.
var blockage; // The current block.
var declared_globals; // The object containing the global declarations.
var directive_mode; // true if directives are still allowed.
var directives; // The directive comments.
var early_stop; // true if JSLint cannot finish.
var exports; // The exported names and values.
var froms; // The array collecting all import-from strings.
var fudge; // true if the natural numbers start with 1.
var functionage; // The current function.
var functions; // The array containing all of the functions.
var global; // The global object; the outermost context.
var json_mode; // true if parsing JSON.
var lines; // The array containing source lines.
var mega_mode; // true if currently parsing a megastring literal.
var module_mode; // true if import or export was used.
var next_token; // The next token to be examined in the parse.
var option; // The options parameter.
var property; // The object containing the tallied property names.
var shebang; // true if a #! was seen on the first line.
var stack; // The stack of functions.
var syntax; // The object containing the parser.
var tenure; // The predefined property registry.
var token; // The current token being examined in the parse.
var token_nr; // The number of the next token.
var tokens; // The array of tokens.
var tree; // The abstract parse tree.
var var_mode; // "var" if using var; "let" if using let.
var warnings; // The array collecting all generated warnings.

// Error reportage functions:

function artifact(the_token) {

// Return a string representing an artifact.

    if (the_token === undefined) {
        the_token = next_token;
    }
    return (
        (the_token.id === "(string)" || the_token.id === "(number)")
        ? String(the_token.value)
        : the_token.id
    );
}

function artifact_line(the_token) {

// Return the fudged line number of an artifact.

    if (the_token === undefined) {
        the_token = next_token;
    }
    return the_token.line + fudge;
}

function artifact_column(the_token) {

// Return the fudged column number of an artifact.

    if (the_token === undefined) {
        the_token = next_token;
    }
    return the_token.from + fudge;
}

function warn_at(code, line, column, a, b, c, d) {

// Report an error at some line and column of the program. The warning object
// resembles an exception.

    var warning = {
        // ~~
        name: "JSLintError",
        column,
        line,
        code
    };
    if (a !== undefined) {
        warning.a = a;
    }
    if (b !== undefined) {
        warning.b = b;
    }
    if (c !== undefined) {
        warning.c = c;
    }
    if (d !== undefined) {
        warning.d = d;
    }
    warning.message = supplant(bundle[code] || code, warning);
    // jslint-hack - warn_at_extra
    warn_at_extra(warning, warnings);
    return warning;
}

function stop_at(code, line, column, a, b, c, d) {

// Same as warn_at, except that it stops the analysis.

    // jslint-hack - early_stop = true
    early_stop = true;
    throw warn_at(code, line, column, a, b, c, d);
}

function warn(code, the_token, a, b, c, d) {

// Same as warn_at, except the warning will be associated with a specific token.
// If there is already a warning on this token, suppress the new one. It is
// likely that the first warning will be the most meaningful.

    if (the_token === undefined) {
        the_token = next_token;
    }
    if (the_token.warning === undefined) {
        the_token.warning = warn_at(
            code,
            the_token.line,
            the_token.from,
            a || artifact(the_token),
            b,
            c,
            // jslint-hack - the_token
            d || the_token
        );
        return the_token.warning;
    }
}

function stop(code, the_token, a, b, c, d) {

// Similar to warn and stop_at. If the token already had a warning, that
// warning will be replaced with this new one. It is likely that the stopping
// warning will be the more meaningful.

    if (the_token === undefined) {
        the_token = next_token;
    }
    delete the_token.warning;
    // jslint-hack - early_stop = true
    early_stop = true;
    throw warn(code, the_token, a, b, c, d);
}

// Tokenize:

function tokenize(source) {

// tokenize takes a source and produces from it an array of token objects.
// JavaScript is notoriously difficult to tokenize because of the horrible
// interactions between automatic semicolon insertion, regular expression
// literals, and now megastring literals. JSLint benefits from eliminating
// automatic semicolon insertion and nested megastring literals, which allows
// full tokenization to precede parsing.

// If the source is not an array, then it is split into lines at the
// carriage return/linefeed.

    lines = (
        Array.isArray(source)
        ? source
        : source.split(rx_crlf)
    );
    tokens = [];

    var char; // a popular character
    var column = 0; // the column number of the next character
    var first; // the first token
    var from; // the starting column number of the token
    var line = -1; // the line number of the next character
    var nr = 0; // the next token number
    var previous = global; // the previous token including comments
    var prior = global; // the previous token excluding comments
    var mega_from; // the starting column of megastring
    var mega_line; // the starting line of megastring
    var regexp_seen; // regular expression literal seen on this line
    var snippet; // a piece of string
    var source_line = ""; // the remaining line source string
    var whole_line = ""; // the whole line source string

    if (lines[0].startsWith("#!")) {
        line = 0;
        shebang = true;
    }

    function next_line() {

// Put the next line of source in source_line. If the line contains tabs,
// replace them with spaces and give a warning. Also warn if the line contains
// unsafe characters or is too damn long.

        var at;
        if (
            !option.long
            && whole_line.length > 80
            && !json_mode
            && first
            && !regexp_seen
        ) {
            warn_at("too_long", line, 80);
        }
        column = 0;
        line += 1;
        regexp_seen = false;
        source_line = lines[line];
        whole_line = source_line || "";
        if (source_line !== undefined) {
            // jslint-hack - next_line_extra
            source_line = next_line_extra(source_line, line);
            at = source_line.search(rx_tab);
            if (at >= 0) {
                if (!option.white) {
                    warn_at("use_spaces", line, at + 1);
                }
                source_line = source_line.replace(rx_tab, " ");
            }
            at = source_line.search(rx_unsafe);
            if (at >= 0) {
                warn_at(
                    "unsafe",
                    line,
                    column + at,
                    "U+" + source_line.charCodeAt(at).toString(16)
                );
            }
            if (!option.white && source_line.slice(-1) === " ") {
                warn_at(
                    "unexpected_trailing_space",
                    line,
                    source_line.length - 1
                );
            }
        }
        return source_line;
    }

// Most tokens, including the identifiers, operators, and punctuators, can be
// found with a regular expression. Regular expressions cannot correctly match
// regular expression literals, so we will match those the hard way. String
// literals and number literals can be matched by regular expressions, but they
// don't provide good warnings. The functions snip, next_char, prev_char,
// some_digits, and escape help in the parsing of literals.

    function snip() {

// Remove the last character from snippet.

        snippet = snippet.slice(0, -1);
    }

    function next_char(match) {

// Get the next character from the source line. Remove it from the source_line,
// and append it to the snippet. Optionally check that the previous character
// matched an expected value.

        if (match !== undefined && char !== match) {
            return stop_at((
                char === ""
                ? "expected_a"
                : "expected_a_b"
            ), line, column - 1, match, char);
        }
        if (source_line) {
            char = source_line[0];
            source_line = source_line.slice(1);
            snippet += char;
        } else {
            char = "";
            snippet += " ";
        }
        column += 1;
        return char;
    }

    function back_char() {

// Back up one character by moving a character from the end of the snippet to
// the front of the source_line.

        if (snippet) {
            char = snippet.slice(-1);
            source_line = char + source_line;
            column -= 1;
            snip();
        } else {
            char = "";
        }
        return char;
    }

    function some_digits(rx, quiet) {
        var result = source_line.match(rx);
        if (result) {
            char = result[1];
            column += char.length;
            source_line = result[2];
            snippet += char;
        } else {
            char = "";
            if (!quiet) {
                warn_at(
                    "expected_digits_after_a",
                    line,
                    column,
                    snippet
                );
            }
        }
        return char.length;
    }

    function escape(extra) {
        next_char("\\");
        if (escapeable[char] === true) {
            return next_char();
        }
        if (char === "") {
            return stop_at("unclosed_string", line, column);
        }
        if (char === "u") {
            if (next_char("u") === "{") {
                if (json_mode) {
                    warn_at("unexpected_a", line, column - 1, char);
                }
                if (some_digits(rx_hexs) > 5) {
                    warn_at("too_many_digits", line, column - 1);
                }
                if (next_char() !== "}") {
                    stop_at("expected_a_before_b", line, column, "}", char);
                }
                return next_char();
            }
            back_char();
            if (some_digits(rx_hexs, true) < 4) {
                warn_at("expected_four_digits", line, column - 1);
            }
            return;
        }
        if (extra && extra.indexOf(char) >= 0) {
            return next_char();
        }
        warn_at("unexpected_a_before_b", line, column - 2, "\\", char);
    }

    function make(id, value, identifier) {

// Make the token object and append it to the tokens list.

        var the_token = {
            from,
            id,
            identifier: Boolean(identifier),
            line,
            nr,
            thru: column
        };
        tokens[nr] = the_token;
        nr += 1;

// Directives must appear before the first statement.

        if (id !== "(comment)" && id !== ";") {
            directive_mode = false;
        }

// If the token is to have a value, give it one.

        if (value !== undefined) {
            the_token.value = value;
        }

// If this token is an identifier that touches a preceding number, or
// a "/", comment, or regular expression literal that touches a preceding
// comment or regular expression literal, then give a missing space warning.
// This warning is not suppressed by option.white.

        if (
            previous.line === line
            && previous.thru === from
            && (id === "(comment)" || id === "(regexp)" || id === "/")
            && (previous.id === "(comment)" || previous.id === "(regexp)")
        ) {
            warn(
                "expected_space_a_b",
                the_token,
                artifact(previous),
                artifact(the_token)
            );
        }
        if (previous.id === "." && id === "(number)") {
            warn("expected_a_before_b", previous, "0", ".");
        }
        if (prior.id === "." && the_token.identifier) {
            the_token.dot = true;
        }

// The previous token is used to detect adjacency problems.

        previous = the_token;

// The prior token is a previous token that was not a comment. The prior token
// is used to disambiguate "/", which can mean division or regular expression
// literal.

        if (previous.id !== "(comment)") {
            prior = previous;
        }
        return the_token;
    }

    function parse_directive(the_comment, body) {

// JSLint recognizes three directives that can be encoded in comments. This
// function processes one item, and calls itself recursively to process the
// next one.

        var result = body.match(rx_directive_part);
        if (result) {
            var allowed;
            var name = result[1];
            var value = result[2];
            if (the_comment.directive === "jslint") {
                allowed = allowed_option[name];
                if (
                    typeof allowed === "boolean"
                    || typeof allowed === "object"
                ) {
                    if (
                        value === ""
                        || value === "true"
                        || value === undefined
                    ) {
                        option[name] = true;
                        if (Array.isArray(allowed)) {
                            populate(allowed, declared_globals, false);
                        }
                    } else if (value === "false") {
                        option[name] = false;
                    } else {
                        warn("bad_option_a", the_comment, name + ":" + value);
                    }
                } else {
                    warn("bad_option_a", the_comment, name);
                }
            } else if (the_comment.directive === "property") {
                if (tenure === undefined) {
                    tenure = empty();
                }
                tenure[name] = true;
            } else if (the_comment.directive === "global") {
                if (value) {
                    warn("bad_option_a", the_comment, name + ":" + value);
                }
                declared_globals[name] = false;
                module_mode = the_comment;
            }
            return parse_directive(the_comment, result[3]);
        }
        if (body) {
            return stop("bad_directive_a", the_comment, body);
        }
    }

    function comment(snippet) {

// Make a comment object. Comments are not allowed in JSON text. Comments can
// include directives and notices of incompletion.

        var the_comment = make("(comment)", snippet);
        if (Array.isArray(snippet)) {
            snippet = snippet.join(" ");
        }
        if (!option.devel && rx_todo.test(snippet)) {
            warn("todo_comment", the_comment);
        }
        var result = snippet.match(rx_directive);
        if (result) {
            if (!directive_mode) {
                warn_at("misplaced_directive_a", line, from, result[1]);
            } else {
                the_comment.directive = result[1];
                parse_directive(the_comment, result[2]);
            }
            directives.push(the_comment);
        }
        return the_comment;
    }

    function regexp() {

// Parse a regular expression literal.

        var multi_mode = false;
        var result;
        var value;
        regexp_seen = true;

        function quantifier() {

// Match an optional quantifier.

            if (char === "?" || char === "*" || char === "+") {
                next_char();
            } else if (char === "{") {
                if (some_digits(rx_digits, true) === 0) {
                    warn_at("expected_a", line, column, "0");
                }
                if (next_char() === ",") {
                    some_digits(rx_digits, true);
                    next_char();
                }
                next_char("}");
            } else {
                return;
            }
            if (char === "?") {
                next_char("?");
            }
        }

        function subklass() {

// Match a character in a character class.

            if (char === "\\") {
                escape("BbDdSsWw-[]^");
                return true;
            }
            if (
                char === ""
                || char === "["
                || char === "]"
                || char === "/"
                || char === "^"
                || char === "-"
            ) {
                return false;
            }
            if (char === " ") {
                warn_at("expected_a_b", line, column, "\\u0020", " ");
            } else if (char === "`" && mega_mode) {
                warn_at("unexpected_a", line, column, "`");
            }
            next_char();
            return true;
        }

        function ranges() {

// Match a range of subclasses.

            if (subklass()) {
                if (char === "-") {
                    next_char("-");
                    if (!subklass()) {
                        return stop_at(
                            "unexpected_a",
                            line,
                            column - 1,
                            "-"
                        );
                    }
                }
                return ranges();
            }
        }

        function klass() {

// Match a class.

            next_char("[");
            if (char === "^") {
                next_char("^");
            }
            (function classy() {
                ranges();
                if (char !== "]" && char !== "") {
                    warn_at(
                        "expected_a_before_b",
                        line,
                        column,
                        "\\",
                        char
                    );
                    next_char();
                    return classy();
                }
            }());
            next_char("]");
        }

        function choice() {

            function group() {

// Match a group that starts with left paren.

                next_char("(");
                if (char === "?") {
                    next_char("?");
                    if (char === "=" || char === "!") {
                        next_char();
                    } else {
                        next_char(":");
                    }
                } else if (char === ":") {
                    warn_at("expected_a_before_b", line, column, "?", ":");
                }
                choice();
                next_char(")");
            }

            function factor() {
                if (
                    char === ""
                    || char === "/"
                    || char === "]"
                    || char === ")"
                ) {
                    return false;
                }
                if (char === "(") {
                    group();
                    return true;
                }
                if (char === "[") {
                    klass();
                    return true;
                }
                if (char === "\\") {
                    escape("BbDdSsWw^${}[]():=!.-|*+?");
                    return true;
                }
                if (
                    char === "?"
                    || char === "+"
                    || char === "*"
                    || char === "}"
                    || char === "{"
                ) {
                    warn_at(
                        "expected_a_before_b",
                        line,
                        column - 1,
                        "\\",
                        char
                    );
                } else if (char === "`") {
                    if (mega_mode) {
                        warn_at("unexpected_a", line, column - 1, "`");
                    }
                } else if (char === " ") {
                    warn_at(
                        "expected_a_b",
                        line,
                        column - 1,
                        "\\s",
                        " "
                    );
                } else if (char === "$") {
                    if (source_line[0] !== "/") {
                        multi_mode = true;
                    }
                } else if (char === "^") {
                    if (snippet !== "^") {
                        multi_mode = true;
                    }
                }
                next_char();
                return true;
            }

            function sequence(follow) {
                if (factor()) {
                    quantifier();
                    return sequence(true);
                }
                if (!follow) {
                    warn_at("expected_regexp_factor_a", line, column, char);
                }
            }

// Match a choice (a sequence that can be followed by | and another choice).

            sequence();
            if (char === "|") {
                next_char("|");
                return choice();
            }
        }

// Scan the regexp literal. Give a warning if the first character is = because
// /= looks like a division assignment operator.

        snippet = "";
        next_char();
        if (char === "=") {
            warn_at("expected_a_before_b", line, column, "\\", "=");
        }
        choice();

// Make sure there is a closing slash.

        snip();
        value = snippet;
        next_char("/");

// Process dangling flag letters.

        var allowed = {
            g: true,
            i: true,
            m: true,
            u: true,
            y: true
        };
        var flag = empty();
        (function make_flag() {
            if (is_letter(char)) {
                if (allowed[char] !== true) {
                    warn_at("unexpected_a", line, column, char);
                }
                allowed[char] = false;
                flag[char] = true;
                next_char();
                return make_flag();
            }
        }());
        back_char();
        if (char === "/" || char === "*") {
            return stop_at("unexpected_a", line, from, char);
        }
        result = make("(regexp)", char);
        result.flag = flag;
        result.value = value;
        if (multi_mode && !flag.m) {
            warn_at("missing_m", line, column);
        }
        return result;
    }

    function string(quote) {

// Make a string token.

        var the_token;
        snippet = "";
        next_char();

        return (function next() {
            if (char === quote) {
                snip();
                the_token = make("(string)", snippet);
                the_token.quote = quote;
                return the_token;
            }
            if (char === "") {
                return stop_at("unclosed_string", line, column);
            }
            if (char === "\\") {
                escape(quote);
            } else if (char === "`") {
                if (mega_mode) {
                    warn_at("unexpected_a", line, column, "`");
                }
                next_char("`");
            } else {
                next_char();
            }
            return next();
        }());
    }

    function frack() {
        if (char === ".") {
            some_digits(rx_digits);
            next_char();
        }
        if (char === "E" || char === "e") {
            next_char();
            if (char !== "+" && char !== "-") {
                back_char();
            }
            some_digits(rx_digits);
            next_char();
        }
    }

    function number() {
        if (snippet === "0") {
            next_char();
            if (char === ".") {
                frack();
            } else if (char === "b") {
                some_digits(rx_bits);
                next_char();
            } else if (char === "o") {
                some_digits(rx_octals);
                next_char();
            } else if (char === "x") {
                some_digits(rx_hexs);
                next_char();
            }
        } else {
            next_char();
            frack();
        }

// If the next character after a number is a digit or letter, then something
// unexpected is going on.

        if (
            (char >= "0" && char <= "9")
            || (char >= "a" && char <= "z")
            || (char >= "A" && char <= "Z")
        ) {
            return stop_at(
                "unexpected_a_after_b",
                line,
                column - 1,
                snippet.slice(-1),
                snippet.slice(0, -1)
            );
        }
        back_char();
        return make("(number)", snippet);
    }

    function lex() {
        var array;
        var i = 0;
        var j = 0;
        var last;
        var result;
        var the_token;
        // jslint-hack - un-recurse
        while (!source_line) {
            source_line = next_line();
            from = 0;
            if (source_line === undefined) {
                return (
                    mega_mode
                    ? stop_at("unclosed_mega", mega_line, mega_from)
                    : make("(end)")
                );
            }
        }
        from = column;
        result = source_line.match(rx_token);

// result[1] token
// result[2] whitespace
// result[3] identifier
// result[4] number
// result[5] rest

        if (!result) {
            return stop_at(
                "unexpected_char_a",
                line,
                column,
                source_line[0]
            );
        }

        snippet = result[1];
        column += snippet.length;
        source_line = result[5];

// Whitespace was matched. Call lex again to get more.

        if (result[2]) {
            return lex();
        }

// The token is an identifier.

        if (result[3]) {
            return make(snippet, undefined, true);
        }

// The token is a number.

        if (result[4]) {
            return number(snippet);
        }

// The token is a string.

        if (snippet === "\"") {
            return string(snippet);
        }
        if (snippet === "'") {
            if (!option.single) {
                warn_at("use_double", line, column);
            }
            return string(snippet);
        }

// The token is a megastring. We don't allow any kind of mega nesting.

        if (snippet === "`") {
            if (mega_mode) {
                return stop_at("expected_a_b", line, column, "}", "`");
            }
            snippet = "";
            mega_from = from;
            mega_line = line;
            mega_mode = true;

// Parsing a mega literal is tricky. First make a ` token.

            make("`");
            from += 1;

// Then loop, building up a string, possibly from many lines, until seeing
// the end of file, a closing `, or a ${ indicting an expression within the
// string.

            (function part() {
                var at = source_line.search(rx_mega);

// If neither ` nor ${ is seen, then the whole line joins the snippet.

                if (at < 0) {
                    snippet += source_line + "\n";
                    return (
                        next_line() === undefined
                        ? stop_at("unclosed_mega", mega_line, mega_from)
                        : part()
                    );
                }

// if either ` or ${ was found, then the preceding joins the snippet to become
// a string token.

                snippet += source_line.slice(0, at);
                column += at;
                source_line = source_line.slice(at);
                if (source_line[0] === "\\") {
                    stop_at("escape_mega", line, at);
                }
                make("(string)", snippet).quote = "`";
                snippet = "";

// If ${, then make tokens that will become part of an expression until
// a } token is made.

                if (source_line[0] === "$") {
                    column += 2;
                    make("${");
                    source_line = source_line.slice(2);
                    (function expr() {
                        var id = lex().id;
                        if (id === "{") {
                            return stop_at(
                                "expected_a_b",
                                line,
                                column,
                                "}",
                                "{"
                            );
                        }
                        if (id !== "}") {
                            return expr();
                        }
                    }());
                    return part();
                }
            }());
            source_line = source_line.slice(1);
            column += 1;
            mega_mode = false;
            return make("`");
        }

// The token is a // comment.

        if (snippet === "//") {
            // jslint-hack - too_long
            if (option.utility2 && (
                /^!!\u0020|^\u0020https:\/\//m
            ).test(source_line)) {
                regexp_seen = true;
            }
            snippet = source_line;
            source_line = "";
            the_token = comment(snippet);
            if (mega_mode) {
                warn("unexpected_comment", the_token, "`");
            }
            return the_token;
        }

// The token is a /* comment.

        if (snippet === "/*") {
            array = [];
            if (source_line[0] === "/") {
                warn_at("unexpected_a", line, column + i, "/");
            }
            (function next() {
                if (source_line > "") {
                    i = source_line.search(rx_star_slash);
                    if (i >= 0) {
                        return;
                    }
                    j = source_line.search(rx_slash_star);
                    if (j >= 0) {
                        warn_at("nested_comment", line, column + j);
                    }
                }
                array.push(source_line);
                // jslint-hack - too_long
                if (option.utility2 && (
                    /^\S|^\u0020{2}|\u0020https:\/\/|\u0020this\u0020.*?\u0020package\u0020will\u0020/m
                ).test(source_line)) {
                    regexp_seen = true;
                }
                source_line = next_line();
                if (source_line === undefined) {
                    return stop_at("unclosed_comment", line, column);
                }
                return next();
            }());
            snippet = source_line.slice(0, i);
            j = snippet.search(rx_slash_star_or_slash);
            if (j >= 0) {
                warn_at("nested_comment", line, column + j);
            }
            array.push(snippet);
            column += i + 2;
            source_line = source_line.slice(i + 2);
            return comment(array);
        }

// The token is a slash.

        if (snippet === "/") {

// The / can be a division operator or the beginning of a regular expression
// literal. It is not possible to know which without doing a complete parse.
// We want to complete the tokenization before we begin to parse, so we will
// estimate. This estimator can fail in some cases. For example, it cannot
// know if "}" is ending a block or ending an object literal, so it can
// behave incorrectly in that case; it is not meaningful to divide an
// object, so it is likely that we can get away with it. We avoided the worst
// cases by eliminating automatic semicolon insertion.

            if (prior.identifier) {
                if (!prior.dot) {
                    if (prior.id === "return") {
                        return regexp();
                    }
                    if (
                        prior.id === "(begin)"
                        || prior.id === "case"
                        || prior.id === "delete"
                        || prior.id === "in"
                        || prior.id === "instanceof"
                        || prior.id === "new"
                        || prior.id === "typeof"
                        || prior.id === "void"
                        || prior.id === "yield"
                    ) {
                        the_token = regexp();
                        return stop("unexpected_a", the_token);
                    }
                }
            } else {
                last = prior.id[prior.id.length - 1];
                if ("(,=:?[".indexOf(last) >= 0) {
                    return regexp();
                }
                if ("!&|{};~+-*%/^<>".indexOf(last) >= 0) {
                    the_token = regexp();
                    warn("wrap_regexp", the_token);
                    return the_token;
                }
            }
            if (source_line[0] === "/") {
                column += 1;
                source_line = source_line.slice(1);
                snippet = "/=";
                warn_at("unexpected_a", line, column, "/=");
            }
        }
        return make(snippet);
    }

    first = lex();
    json_mode = first.id === "{" || first.id === "[";

// This is the only loop in JSLint. It will turn into a recursive call to lex
// when ES6 has been finished and widely deployed and adopted.

    while (true) {
        if (lex().id === "(end)") {
            break;
        }
    }
}

// Parsing:

// Parsing weaves the tokens into an abstract syntax tree. During that process,
// a token may be given any of these properties:

//      arity       string
//      label       identifier
//      name        identifier
//      expression  expressions
//      block       statements
//      else        statements (else, default, catch)

// Specialized tokens may have additional properties.

function survey(name) {
    var id = name.id;

// Tally the property name. If it is a string, only tally strings that conform
// to the identifier rules.

    if (id === "(string)") {
        id = name.value;
        if (!rx_identifier.test(id)) {
            return id;
        }
    } else if (id === "`") {
        if (name.value.length === 1) {
            id = name.value[0].value;
            if (!rx_identifier.test(id)) {
                return id;
            }
        }
    } else if (!name.identifier) {
        return stop("expected_identifier_a", name);
    }

// If we have seen this name before, increment its count.

    if (typeof property[id] === "number") {
        property[id] += 1;

// If this is the first time seeing this property name, and if there is a
// tenure list, then it must be on the list. Otherwise, it must conform to
// the rules for good property names.
    } else {
        if (tenure !== undefined) {
            if (tenure[id] !== true) {
                warn("unregistered_property_a", name);
            }
        } else {
            if (name.identifier && rx_bad_property.test(id)) {
                warn("bad_property_a", name);
            }
        }
        property[id] = 1;
    }
    return id;
}

function dispense() {

// Deliver the next token, skipping the comments.

    var cadet = tokens[token_nr];
    token_nr += 1;
    if (cadet.id === "(comment)") {
        if (json_mode) {
            warn("unexpected_a", cadet);
        }
        return dispense();
    } else {
        return cadet;
    }
}

function lookahead() {

// Look ahead one token without advancing.

    var old_token_nr = token_nr;
    var cadet = dispense(true);
    token_nr = old_token_nr;
    return cadet;
}

function advance(id, match) {

// Produce the next token.

// Attempt to give helpful names to anonymous functions.

    if (token.identifier && token.id !== "function") {
        anon = token.id;
    } else if (token.id === "(string)" && rx_identifier.test(token.value)) {
        anon = token.value;
    }

// Attempt to match next_token with an expected id.

    if (id !== undefined && next_token.id !== id) {
        return (
            match === undefined
            ? stop("expected_a_b", next_token, id, artifact())
            : stop(
                "expected_a_b_from_c_d",
                next_token,
                id,
                artifact(match),
                artifact_line(match),
                artifact(next_token)
            )
        );
    }

// Promote the tokens, skipping comments.

    token = next_token;
    next_token = dispense();
    if (next_token.id === "(end)") {
        token_nr -= 1;
    }
}

// Parsing of JSON is simple:

function json_value() {
    var negative;
    if (next_token.id === "{") {
        return (function json_object() {
            var brace = next_token;
            var object = empty();
            var properties = [];
            brace.expression = properties;
            advance("{");
            if (next_token.id !== "}") {
                (function next() {
                    var name;
                    var value;
                    if (next_token.quote !== "\"") {
                        warn(
                            "unexpected_a",
                            next_token,
                            next_token.quote
                        );
                    }
                    name = next_token;
                    advance("(string)");
                    if (object[token.value] !== undefined) {
                        warn("duplicate_a", token);
                    } else if (token.value === "__proto__") {
                        warn("bad_property_a", token);
                    } else {
                        object[token.value] = token;
                    }
                    advance(":");
                    value = json_value();
                    value.label = name;
                    properties.push(value);
                    if (next_token.id === ",") {
                        advance(",");
                        return next();
                    }
                }());
            }
            advance("}", brace);
            return brace;
        }());
    }
    if (next_token.id === "[") {
        return (function json_array() {
            var bracket = next_token;
            var elements = [];
            bracket.expression = elements;
            advance("[");
            if (next_token.id !== "]") {
                (function next() {
                    elements.push(json_value());
                    if (next_token.id === ",") {
                        advance(",");
                        return next();
                    }
                }());
            }
            advance("]", bracket);
            return bracket;
        }());
    }
    if (
        next_token.id === "true"
        || next_token.id === "false"
        || next_token.id === "null"
    ) {
        advance();
        return token;
    }
    if (next_token.id === "(number)") {
        if (!rx_JSON_number.test(next_token.value)) {
            warn("unexpected_a");
        }
        advance();
        return token;
    }
    if (next_token.id === "(string)") {
        if (next_token.quote !== "\"") {
            warn("unexpected_a", next_token, next_token.quote);
        }
        advance();
        return token;
    }
    if (next_token.id === "-") {
        negative = next_token;
        negative.arity = "unary";
        advance("-");
        advance("(number)");
        negative.expression = token;
        return negative;
    }
    stop("unexpected_a");
}

// Now we parse JavaScript.

function enroll(name, role, readonly) {

// Enroll a name into the current function context. The role can be exception,
// function, label, parameter, or variable. We look for variable redefinition
// because it causes confusion.

    var id = name.id;

// Reserved words may not be enrolled.

    if (syntax[id] !== undefined && id !== "ignore") {
        warn("reserved_a", name);
    } else {

// Has the name been enrolled in this context?

        var earlier = functionage.context[id];
        if (earlier) {
            warn(
                "redefinition_a_b",
                name,
                name.id,
                earlier.line + fudge
            );

// Has the name been enrolled in an outer context?
        } else {
            stack.forEach(function (value) {
                var item = value.context[id];
                if (item !== undefined) {
                    earlier = item;
                }
            });
            if (earlier) {
                if (id === "ignore") {
                    if (earlier.role === "variable") {
                        warn("unexpected_a", name);
                    }
                } else {
                    if ((
                        role !== "exception"
                        || earlier.role !== "exception"
                    ) && role !== "parameter" && role !== "function") {
                        warn(
                            "redefinition_a_b",
                            name,
                            name.id,
                            earlier.line + fudge
                        );
                    }
                }
            }

// Enroll it.

            functionage.context[id] = name;
            name.dead = true;
            name.parent = functionage;
            name.init = false;
            name.role = role;
            name.used = 0;
            name.writable = !readonly;
        }
    }
}

function expression(rbp, initial) {

// This is the heart of the Pratt parser. I retained Pratt's nomenclature.
// They are elements of the parsing method called Top Down Operator Precedence.

// nud     Null denotation
// led     Left denotation
// lbp     Left binding power
// rbp     Right binding power

// It processes a nud (variable, constant, prefix operator). It will then
// process leds (infix operators) until the bind powers cause it to stop. It
// returns the expression's parse tree.

    var left;
    var the_symbol;

// Statements will have already advanced, so advance now only if the token is
// not the first of a statement,

    if (!initial) {
        advance();
    }
    the_symbol = syntax[token.id];
    if (the_symbol !== undefined && the_symbol.nud !== undefined) {
        left = the_symbol.nud();
    } else if (token.identifier) {
        left = token;
        left.arity = "variable";
    } else {
        return stop("unexpected_a", token);
    }
    (function right() {
        the_symbol = syntax[next_token.id];
        if (
            the_symbol !== undefined
            && the_symbol.led !== undefined
            && rbp < the_symbol.lbp
        ) {
            advance();
            left = the_symbol.led(left);
            return right();
        }
    }());
    return left;
}

function condition() {

// Parse the condition part of a do, if, while.

    var the_paren = next_token;
    var the_value;
    the_paren.free = true;
    advance("(");
    the_value = expression(0);
    advance(")");
    if (the_value.wrapped === true) {
        warn("unexpected_a", the_paren);
    }
    if (anticondition[the_value.id] === true) {
        warn("unexpected_a", the_value);
    }
    return the_value;
}

function is_weird(thing) {
    return (
        thing.id === "(regexp)"
        || thing.id === "{"
        || thing.id === "=>"
        || thing.id === "function"
        || (thing.id === "[" && thing.arity === "unary")
    );
}

function are_similar(a, b) {
    if (a === b) {
        return true;
    }
    if (Array.isArray(a)) {
        return (
            Array.isArray(b)
            && a.length === b.length
            && a.every(function (value, index) {
                return are_similar(value, b[index]);
            })
        );
    }
    if (Array.isArray(b)) {
        return false;
    }
    if (a.id === "(number)" && b.id === "(number)") {
        return a.value === b.value;
    }
    var a_string;
    var b_string;
    if (a.id === "(string)") {
        a_string = a.value;
    } else if (a.id === "`" && a.constant) {
        a_string = a.value[0];
    }
    if (b.id === "(string)") {
        b_string = b.value;
    } else if (b.id === "`" && b.constant) {
        b_string = b.value[0];
    }
    if (typeof a_string === "string") {
        return a_string === b_string;
    }
    if (is_weird(a) || is_weird(b)) {
        return false;
    }
    if (a.arity === b.arity && a.id === b.id) {
        if (a.id === ".") {
            return (
                are_similar(a.expression, b.expression)
                && are_similar(a.name, b.name)
            );
        }
        if (a.arity === "unary") {
            return are_similar(a.expression, b.expression);
        }
        if (a.arity === "binary") {
            return (
                a.id !== "("
                && are_similar(a.expression[0], b.expression[0])
                && are_similar(a.expression[1], b.expression[1])
            );
        }
        if (a.arity === "ternary") {
            return (
                are_similar(a.expression[0], b.expression[0])
                && are_similar(a.expression[1], b.expression[1])
                && are_similar(a.expression[2], b.expression[2])
            );
        }
        if (a.arity === "function" && a.arity === "regexp") {
            return false;
        }
        return true;
    }
    return false;
}

function semicolon() {

// Try to match a semicolon.

    if (next_token.id === ";") {
        advance(";");
    } else {
        warn_at(
            "expected_a_b",
            token.line,
            token.thru,
            ";",
            artifact(next_token)
        );
    }
    anon = "anonymous";
}

function statement() {

// Parse a statement. Any statement may have a label, but only four statements
// have use for one. A statement can be one of the standard statements, or
// an assignment expression, or an invocation expression.

    var first;
    var the_label;
    var the_statement;
    var the_symbol;
    advance();
    if (token.identifier && next_token.id === ":") {
        the_label = token;
        if (the_label.id === "ignore") {
            warn("unexpected_a", the_label);
        }
        advance(":");
        if (
            next_token.id === "do"
            || next_token.id === "for"
            || next_token.id === "switch"
            || next_token.id === "while"
        ) {
            enroll(the_label, "label", true);
            the_label.init = true;
            the_label.dead = false;
            the_statement = statement();
            the_statement.label = the_label;
            the_statement.statement = true;
            return the_statement;
        }
        advance();
        warn("unexpected_label_a", the_label);
    }

// Parse the statement.

    first = token;
    first.statement = true;
    the_symbol = syntax[first.id];
    if (the_symbol !== undefined && the_symbol.fud !== undefined) {
        the_symbol.disrupt = false;
        the_symbol.statement = true;
        the_statement = the_symbol.fud();
    } else {

// It is an expression statement.

        the_statement = expression(0, true);
        if (the_statement.wrapped && the_statement.id !== "(") {
            warn("unexpected_a", first);
        }
        semicolon();
    }
    if (the_label !== undefined) {
        the_label.dead = true;
    }
    return the_statement;
}

function statements() {

// Parse a list of statements. Give a warning if an unreachable statement
// follows a disruptive statement.

    var array = [];
    (function next(disrupt) {
        if (
            next_token.id !== "}"
            && next_token.id !== "case"
            && next_token.id !== "default"
            && next_token.id !== "else"
            && next_token.id !== "(end)"
        ) {
            var a_statement = statement();
            array.push(a_statement);
            if (disrupt) {
                warn("unreachable_a", a_statement);
            }
            return next(a_statement.disrupt);
        }
    }(false));
    return array;
}

function not_top_level(thing) {

// Some features should not be at the outermost level.

    if (functionage === global) {
        warn("unexpected_at_top_level_a", thing);
    }
}

function top_level_only(the_thing) {

// Some features must be at the most outermost level.

    if (blockage !== global) {
        warn("misplaced_a", the_thing);
    }
}

function block(special) {

// Parse a block, a sequence of statements wrapped in braces.
//  special "body"      The block is a function body.
//          "ignore"    No warning on an empty block.
//          "naked"     No advance.
//          undefined   An ordinary block.

    var stmts;
    var the_block;
    if (special !== "naked") {
        advance("{");
    }
    the_block = token;
    the_block.arity = "statement";
    the_block.body = special === "body";

// Top level function bodies may include the "use strict" pragma.

    if (
        special === "body"
        && stack.length === 1
        && next_token.value === "use strict"
    ) {
        next_token.statement = true;
        advance("(string)");
        advance(";");
    }
    stmts = statements();
    the_block.block = stmts;
    if (stmts.length === 0) {
        if (!option.devel && special !== "ignore") {
            warn("empty_block", the_block);
        }
        the_block.disrupt = false;
    } else {
        the_block.disrupt = stmts[stmts.length - 1].disrupt;
    }
    advance("}");
    return the_block;
}

function mutation_check(the_thing) {

// The only expressions that may be assigned to are
//      e.b
//      e[b]
//      v
//      [destructure]
//      {destructure}

    if (
        the_thing.arity !== "variable"
        && the_thing.id !== "."
        && the_thing.id !== "["
        && the_thing.id !== "{"
    ) {
        warn("bad_assignment_a", the_thing);
        return false;
    }
    return true;
}

function left_check(left, right) {

// Warn if the left is not one of these:
//      e.b
//      e[b]
//      e()
//      ?:
//      identifier

    var id = left.id;
    if (
        !left.identifier
        && (
            left.arity !== "ternary"
            || (
                !left_check(left.expression[1])
                && !left_check(left.expression[2])
            )
        )
        && (
            left.arity !== "binary"
            || (id !== "." && id !== "(" && id !== "[")
        )
    ) {
        // jslint-hack - unexpected_a
        warn("unexpected_a", right, null, null, left, right);
        return false;
    }
    return true;
}

// These functions are used to specify the grammar of our language:

function symbol(id, bp) {

// Make a symbol if it does not already exist in the language's syntax.

    var the_symbol = syntax[id];
    if (the_symbol === undefined) {
        the_symbol = empty();
        the_symbol.id = id;
        the_symbol.lbp = bp || 0;
        syntax[id] = the_symbol;
    }
    return the_symbol;
}

function assignment(id) {

// Make an assignment operator. The one true assignment is different because
// its left side, when it is a variable, is not treated as an expression.
// That case is special because that is when a variable gets initialized. The
// other assignment operators can modify, but they cannot initialize.

    var the_symbol = symbol(id, 20);
    the_symbol.led = function (left) {
        var the_token = token;
        var right;
        the_token.arity = "assignment";
        right = expression(20 - 1);
        if (id === "=" && left.arity === "variable") {
            the_token.names = left;
            the_token.expression = right;
        } else {
            the_token.expression = [
                left, right
            ];
        }
        if (
            right.arity === "assignment"
            || right.arity === "pre"
            || right.arity === "post"
        ) {
            warn("unexpected_a", right);
        }
        mutation_check(left);
        return the_token;
    };
    return the_symbol;
}

function constant(id, type, value) {

// Make a constant symbol.

    var the_symbol = symbol(id);
    the_symbol.constant = true;
    the_symbol.nud = (
        typeof value === "function"
        ? value
        : function () {
            token.constant = true;
            if (value !== undefined) {
                token.value = value;
            }
            return token;
        }
    );
    the_symbol.type = type;
    the_symbol.value = value;
    return the_symbol;
}

function infix(id, bp, f) {

// Make an infix operator.

    var the_symbol = symbol(id, bp);
    the_symbol.led = function (left) {
        var the_token = token;
        the_token.arity = "binary";
        if (f !== undefined) {
            return f(left);
        }
        the_token.expression = [
            left, expression(bp)
        ];
        return the_token;
    };
    return the_symbol;
}

function infixr(id, bp) {

// Make a right associative infix operator.

    var the_symbol = symbol(id, bp);
    the_symbol.led = function (left) {
        var the_token = token;
        the_token.arity = "binary";
        the_token.expression = [
            left, expression(bp - 1)
        ];
        return the_token;
    };
    return the_symbol;
}

function post(id) {

// Make one of the post operators.

    var the_symbol = symbol(id, 150);
    the_symbol.led = function (left) {
        token.expression = left;
        token.arity = "post";
        mutation_check(token.expression);
        return token;
    };
    return the_symbol;
}

function pre(id) {

// Make one of the pre operators.

    var the_symbol = symbol(id);
    the_symbol.nud = function () {
        var the_token = token;
        the_token.arity = "pre";
        the_token.expression = expression(150);
        mutation_check(the_token.expression);
        return the_token;
    };
    return the_symbol;
}

function prefix(id, f) {

// Make a prefix operator.

    var the_symbol = symbol(id);
    the_symbol.nud = function () {
        var the_token = token;
        the_token.arity = "unary";
        if (typeof f === "function") {
            return f();
        }
        the_token.expression = expression(150);
        return the_token;
    };
    return the_symbol;
}

function stmt(id, f) {

// Make a statement.

    var the_symbol = symbol(id);
    the_symbol.fud = function () {
        token.arity = "statement";
        return f();
    };
    return the_symbol;
}

function ternary(id1, id2) {

// Make a ternary operator.

    var the_symbol = symbol(id1, 30);
    the_symbol.led = function (left) {
        var the_token = token;
        var second = expression(20);
        advance(id2);
        token.arity = "ternary";
        the_token.arity = "ternary";
        the_token.expression = [
            left, second, expression(10)
        ];
        if (next_token.id !== ")") {
            warn("use_open", the_token);
        }
        return the_token;
    };
    return the_symbol;
}

// Begin defining the language.

syntax = empty();

symbol("}");
symbol(")");
symbol("]");
symbol(",");
symbol(";");
symbol(":");
symbol("*/");
symbol("await");
symbol("case");
symbol("catch");
symbol("class");
symbol("default");
symbol("else");
symbol("enum");
symbol("finally");
symbol("implements");
symbol("interface");
symbol("package");
symbol("private");
symbol("protected");
symbol("public");
symbol("static");
symbol("super");
symbol("void");
symbol("yield");

constant("(number)", "number");
constant("(regexp)", "regexp");
constant("(string)", "string");
constant("arguments", "object", function () {
    warn("unexpected_a", token);
    return token;
});
constant("eval", "function", function () {
    if (!option.eval) {
        warn("unexpected_a", token);
    } else if (next_token.id !== "(") {
        warn("expected_a_before_b", next_token, "(", artifact());
    }
    return token;
});
constant("false", "boolean", false);
constant("Function", "function", function () {
    if (!option.eval) {
        warn("unexpected_a", token);
    } else if (next_token.id !== "(") {
        warn("expected_a_before_b", next_token, "(", artifact());
    }
    return token;
});
constant("ignore", "undefined", function () {
    warn("unexpected_a", token);
    return token;
});
constant("Infinity", "number", Infinity);
constant("isFinite", "function", function () {
    warn("expected_a_b", token, "Number.isFinite", "isFinite");
    return token;
});
constant("isNaN", "function", function () {
    warn("number_isNaN", token);
    return token;
});
constant("NaN", "number", NaN);
constant("null", "null", null);
constant("this", "object", function () {
    if (!option.this) {
        warn("unexpected_a", token);
    }
    return token;
});
constant("true", "boolean", true);
constant("undefined", "undefined");

assignment("=");
assignment("+=");
assignment("-=");
assignment("*=");
assignment("/=");
assignment("%=");
assignment("&=");
assignment("|=");
assignment("^=");
assignment("<<=");
assignment(">>=");
assignment(">>>=");

infix("||", 40);
infix("&&", 50);
infix("|", 70);
infix("^", 80);
infix("&", 90);
infix("==", 100);
infix("===", 100);
infix("!=", 100);
infix("!==", 100);
infix("<", 110);
infix(">", 110);
infix("<=", 110);
infix(">=", 110);
infix("in", 110);
infix("instanceof", 110);
infix("<<", 120);
infix(">>", 120);
infix(">>>", 120);
infix("+", 130);
infix("-", 130);
infix("*", 140);
infix("/", 140);
infix("%", 140);
infixr("**", 150);
infix("(", 160, function (left) {
    var the_paren = token;
    var the_argument;
    if (left.id !== "function") {
        left_check(left, the_paren);
    }
    if (functionage.arity === "statement" && left.identifier) {
        functionage.name.calls[left.id] = left;
    }
    the_paren.expression = [
        left
    ];
    if (next_token.id !== ")") {
        (function next() {
            var ellipsis;
            if (next_token.id === "...") {
                ellipsis = true;
                advance("...");
            }
            the_argument = expression(10);
            if (ellipsis) {
                the_argument.ellipsis = true;
            }
            the_paren.expression.push(the_argument);
            if (next_token.id === ",") {
                advance(",");
                return next();
            }
        }());
    }
    advance(")", the_paren);
    if (the_paren.expression.length === 2) {
        the_paren.free = true;
        if (the_argument.wrapped === true) {
            warn("unexpected_a", the_paren);
        }
        if (the_argument.id === "(") {
            the_argument.wrapped = true;
        }
    } else {
        the_paren.free = false;
    }
    return the_paren;
});
infix(".", 170, function (left) {
    var the_token = token;
    var name = next_token;
    if ((
        left.id !== "(string)"
        || (name.id !== "indexOf" && name.id !== "repeat")
    ) && (
        left.id !== "["
        || (
            name.id !== "concat"
            && name.id !== "forEach"
            && name.id !== "join"
            && name.id !== "map"
        )
    ) && (left.id !== "+" || name.id !== "slice") && (
        left.id !== "(regexp)"
        || (name.id !== "exec" && name.id !== "test")
    )) {
        left_check(left, the_token);
    }
    if (!name.identifier) {
        stop("expected_identifier_a");
    }
    advance();
    survey(name);

// The property name is not an expression.

    the_token.name = name;
    the_token.expression = left;
    return the_token;
});
infix("?.", 170, function (left) {
    var the_token = token;
    var name = next_token;
    if ((
        left.id !== "(string)"
        || (name.id !== "indexOf" && name.id !== "repeat")
    ) && (
        left.id !== "["
        || (
            name.id !== "concat"
            && name.id !== "forEach"
            && name.id !== "join"
            && name.id !== "map"
        )
    ) && (left.id !== "+" || name.id !== "slice") && (
        left.id !== "(regexp)"
        || (name.id !== "exec" && name.id !== "test")
    )) {
        left_check(left, the_token);
    }
    if (!name.identifier) {
        stop("expected_identifier_a");
    }
    advance();
    survey(name);

// The property name is not an expression.

    the_token.name = name;
    the_token.expression = left;
    return the_token;
});
infix("[", 170, function (left) {
    var the_token = token;
    var the_subscript = expression(0);
    if (the_subscript.id === "(string)" || the_subscript.id === "`") {
        var name = survey(the_subscript);
        if (rx_identifier.test(name)) {
            warn("subscript_a", the_subscript, name);
        }
    }
    left_check(left, the_token);
    the_token.expression = [
        left, the_subscript
    ];
    advance("]");
    return the_token;
});
infix("=>", 170, function (left) {
    return stop("wrap_parameter", left);
});

function do_tick() {
    var the_tick = token;
    the_tick.value = [];
    the_tick.expression = [];
    if (next_token.id !== "`") {
        (function part() {
            advance("(string)");
            the_tick.value.push(token);
            if (next_token.id === "${") {
                advance("${");
                the_tick.expression.push(expression(0));
                advance("}");
                return part();
            }
        }());
    }
    advance("`");
    return the_tick;
}

infix("`", 160, function (left) {
    var the_tick = do_tick();
    left_check(left, the_tick);
    the_tick.expression = [
        left
    ].concat(the_tick.expression);
    return the_tick;
});

post("++");
post("--");
pre("++");
pre("--");

prefix("+");
prefix("-");
prefix("~");
prefix("!");
prefix("!!");
prefix("[", function () {
    var the_token = token;
    the_token.expression = [];
    if (next_token.id !== "]") {
        (function next() {
            var element;
            var ellipsis = false;
            if (next_token.id === "...") {
                ellipsis = true;
                advance("...");
            }
            element = expression(10);
            if (ellipsis) {
                element.ellipsis = true;
            }
            the_token.expression.push(element);
            if (next_token.id === ",") {
                advance(",");
                return next();
            }
        }());
    }
    advance("]");
    return the_token;
});
prefix("/=", function () {
    stop("expected_a_b", token, "/\\=", "/=");
});
prefix("=>", function () {
    return stop("expected_a_before_b", token, "()", "=>");
});
prefix("new", function () {
    var the_new = token;
    var right = expression(160);
    if (next_token.id !== "(") {
        warn("expected_a_before_b", next_token, "()", artifact(next_token));
    }
    the_new.expression = right;
    return the_new;
});
prefix("typeof");
prefix("void", function () {
    var the_void = token;
    warn("unexpected_a", the_void);
    the_void.expression = expression(0);
    return the_void;
});

function parameter_list() {
    var list = [];
    var optional;
    var signature = [
        "("
    ];
    if (next_token.id !== ")" && next_token.id !== "(end)") {
        (function parameter() {
            var ellipsis = false;
            var param;
            if (next_token.id === "{") {
                if (optional !== undefined) {
                    warn(
                        "required_a_optional_b",
                        next_token,
                        next_token.id,
                        optional.id
                    );
                }
                param = next_token;
                param.names = [];
                advance("{");
                signature.push("{");
                (function subparameter() {
                    var subparam = next_token;
                    if (!subparam.identifier) {
                        return stop("expected_identifier_a");
                    }
                    survey(subparam);
                    advance();
                    signature.push(subparam.id);
                    if (next_token.id === ":") {
                        advance(":");
                        advance();
                        token.label = subparam;
                        subparam = token;
                        if (!subparam.identifier) {
                            return stop("expected_identifier_a");
                        }
                    }
                    if (next_token.id === "=") {
                        advance("=");
                        subparam.expression = expression();
                        param.open = true;
                    }
                    param.names.push(subparam);
                    if (next_token.id === ",") {
                        advance(",");
                        signature.push(", ");
                        return subparameter();
                    }
                }());
                list.push(param);
                advance("}");
                signature.push("}");
                if (next_token.id === ",") {
                    advance(",");
                    signature.push(", ");
                    return parameter();
                }
            } else if (next_token.id === "[") {
                if (optional !== undefined) {
                    warn(
                        "required_a_optional_b",
                        next_token,
                        next_token.id,
                        optional.id
                    );
                }
                param = next_token;
                param.names = [];
                advance("[");
                signature.push("[]");
                (function subparameter() {
                    var subparam = next_token;
                    if (!subparam.identifier) {
                        return stop("expected_identifier_a");
                    }
                    advance();
                    param.names.push(subparam);
                    if (next_token.id === "=") {
                        advance("=");
                        subparam.expression = expression();
                        param.open = true;
                    }
                    if (next_token.id === ",") {
                        advance(",");
                        return subparameter();
                    }
                }());
                list.push(param);
                advance("]");
                if (next_token.id === ",") {
                    advance(",");
                    signature.push(", ");
                    return parameter();
                }
            } else {
                if (next_token.id === "...") {
                    ellipsis = true;
                    signature.push("...");
                    advance("...");
                    if (optional !== undefined) {
                        warn(
                            "required_a_optional_b",
                            next_token,
                            next_token.id,
                            optional.id
                        );
                    }
                }
                if (!next_token.identifier) {
                    return stop("expected_identifier_a");
                }
                param = next_token;
                list.push(param);
                advance();
                signature.push(param.id);
                if (ellipsis) {
                    param.ellipsis = true;
                } else {
                    if (next_token.id === "=") {
                        optional = param;
                        advance("=");
                        param.expression = expression(0);
                    } else {
                        if (optional !== undefined) {
                            warn(
                                "required_a_optional_b",
                                param,
                                param.id,
                                optional.id
                            );
                        }
                    }
                    if (next_token.id === ",") {
                        advance(",");
                        signature.push(", ");
                        return parameter();
                    }
                }
            }
        }());
    }
    advance(")");
    signature.push(")");
    return [
        list, signature.join("")
    ];
}

function do_function(the_function) {
    var name;
    if (the_function === undefined) {
        the_function = token;

// A function statement must have a name that will be in the parent's scope.

        if (the_function.arity === "statement") {
            if (!next_token.identifier) {
                return stop("expected_identifier_a", next_token);
            }
            name = next_token;
            enroll(name, "variable", true);
            the_function.name = name;
            name.init = true;
            name.calls = empty();
            advance();
        } else if (name === undefined) {

// A function expression may have an optional name.

            if (next_token.identifier) {
                name = next_token;
                the_function.name = name;
                advance();
            } else {
                the_function.name = anon;
            }
        }
    } else {
        name = the_function.name;
    }
    the_function.level = functionage.level + 1;
    if (mega_mode) {
        warn("unexpected_a", the_function);
    }

// Don't make functions in loops. It is inefficient, and it can lead to scoping
// errors.

    if (functionage.loop > 0) {
        warn("function_in_loop", the_function);
    }

// Give the function properties for storing its names and for observing the
// depth of loops and switches.

    the_function.context = empty();
    the_function.finally = 0;
    the_function.loop = 0;
    the_function.switch = 0;
    the_function.try = 0;

// Push the current function context and establish a new one.

    stack.push(functionage);
    functions.push(the_function);
    functionage = the_function;
    if (the_function.arity !== "statement" && typeof name === "object") {
        enroll(name, "function", true);
        name.dead = false;
        name.init = true;
        name.used = 1;
    }

// Parse the parameter list.

    advance("(");
    token.free = false;
    token.arity = "function";
    [
        functionage.parameters, functionage.signature
    ] = parameter_list();
    functionage.parameters.forEach(function enroll_parameter(name) {
        if (name.identifier) {
            enroll(name, "parameter", false);
        } else {
            name.names.forEach(enroll_parameter);
        }
    });

// The function's body is a block.

    the_function.block = block("body");
    if (
        the_function.arity === "statement"
        && next_token.line === token.line
    ) {
        return stop("unexpected_a", next_token);
    }
    if (
        next_token.id === "."
        || next_token.id === "?."
        || next_token.id === "["
    ) {
        warn("unexpected_a");
    }

// Restore the previous context.

    functionage = stack.pop();
    return the_function;
}

prefix("function", do_function);

function fart(pl) {
    advance("=>");
    var the_fart = token;
    the_fart.arity = "binary";
    the_fart.name = "=>";
    the_fart.level = functionage.level + 1;
    functions.push(the_fart);
    if (functionage.loop > 0) {
        warn("function_in_loop", the_fart);
    }

// Give the function properties storing its names and for observing the depth
// of loops and switches.

    the_fart.context = empty();
    the_fart.finally = 0;
    the_fart.loop = 0;
    the_fart.switch = 0;
    the_fart.try = 0;

// Push the current function context and establish a new one.

    stack.push(functionage);
    functionage = the_fart;
    the_fart.parameters = pl[0];
    the_fart.signature = pl[1];
    the_fart.parameters.forEach(function (name) {
        enroll(name, "parameter", true);
    });
    if (next_token.id === "{") {
        warn("expected_a_b", the_fart, "function", "=>");
        the_fart.block = block("body");
    } else {
        the_fart.expression = expression(0);
    }
    functionage = stack.pop();
    return the_fart;
}

prefix("(", function () {
    var the_paren = token;
    var the_value;
    var cadet = lookahead().id;

// We can distinguish between a parameter list for => and a wrapped expression
// with one token of lookahead.

    if (
        next_token.id === ")"
        || next_token.id === "..."
        || (next_token.identifier && (cadet === "," || cadet === "="))
    ) {
        the_paren.free = false;
        return fart(parameter_list());
    }
    the_paren.free = true;
    the_value = expression(0);
    if (the_value.wrapped === true) {
        warn("unexpected_a", the_paren);
    }
    the_value.wrapped = true;
    advance(")", the_paren);
    if (next_token.id === "=>") {
        if (the_value.arity !== "variable") {
            if (the_value.id === "{" || the_value.id === "[") {
                warn("expected_a_before_b", the_paren, "function", "(");
                return stop("expected_a_b", next_token, "{", "=>");
            }
            return stop("expected_identifier_a", the_value);
        }
        the_paren.expression = [
            the_value
        ];
        return fart([
            the_paren.expression, "(" + the_value.id + ")"
        ]);
    }
    return the_value;
});
prefix("`", do_tick);
prefix("{", function () {
    var the_brace = token;
    var seen = empty();
    the_brace.expression = [];
    if (next_token.id !== "}") {
        (function member() {
            var extra;
            var full;
            var id;
            var name = next_token;
            var value;
            advance();
            if (
                (name.id === "get" || name.id === "set")
                && next_token.identifier
            ) {
                if (!option.getset) {
                    warn("unexpected_a", name);
                }
                extra = name.id;
                full = extra + " " + next_token.id;
                name = next_token;
                advance();
                id = survey(name);
                if (seen[full] === true || seen[id] === true) {
                    warn("duplicate_a", name);
                }
                seen[id] = false;
                seen[full] = true;
            } else {
                id = survey(name);
                if (typeof seen[id] === "boolean") {
                    warn("duplicate_a", name);
                }
                seen[id] = true;
            }
            if (name.identifier) {
                if (next_token.id === "}" || next_token.id === ",") {
                    if (typeof extra === "string") {
                        advance("(");
                    }
                    value = expression(Infinity, true);
                } else if (next_token.id === "(") {
                    value = do_function({
                        arity: "unary",
                        from: name.from,
                        id: "function",
                        line: name.line,
                        name: (
                            typeof extra === "string"
                            ? extra
                            : id
                        ),
                        thru: name.from
                    });
                } else {
                    if (typeof extra === "string") {
                        advance("(");
                    }
                    var the_colon = next_token;
                    advance(":");
                    value = expression(0);
                    if (value.id === name.id) {
                        warn("unexpected_a", the_colon, ": " + name.id);
                    }
                }
                value.label = name;
                if (typeof extra === "string") {
                    value.extra = extra;
                }
                the_brace.expression.push(value);
            } else {
                advance(":");
                value = expression(0);
                value.label = name;
                the_brace.expression.push(value);
            }
            if (next_token.id === ",") {
                advance(",");
                return member();
            }
        }());
    }
    advance("}");
    return the_brace;
});

stmt(";", function () {
    warn("unexpected_a", token);
    return token;
});
stmt("{", function () {
    warn("naked_block", token);
    return block("naked");
});
stmt("break", function () {
    var the_break = token;
    var the_label;
    if (
        (functionage.loop < 1 && functionage.switch < 1)
        || functionage.finally > 0
    ) {
        warn("unexpected_a", the_break);
    }
    the_break.disrupt = true;
    if (next_token.identifier && token.line === next_token.line) {
        the_label = functionage.context[next_token.id];
        if (
            the_label === undefined
            || the_label.role !== "label"
            || the_label.dead
        ) {
            warn(
                (the_label !== undefined && the_label.dead)
                ? "out_of_scope_a"
                : "not_label_a"
            );
        } else {
            the_label.used += 1;
        }
        the_break.label = next_token;
        advance();
    }
    advance(";");
    return the_break;
});

function do_var() {
    var the_statement = token;
    var is_const = the_statement.id === "const";
    the_statement.names = [];

// A program may use var or let, but not both.

    if (!is_const) {
        if (var_mode === undefined) {
            var_mode = the_statement.id;
        } else if (the_statement.id !== var_mode) {
            warn(
                "expected_a_b",
                the_statement,
                var_mode,
                the_statement.id
            );
        }
    }

// We don't expect to see variables created in switch statements.

    if (functionage.switch > 0) {
        warn("var_switch", the_statement);
    }
    if (functionage.loop > 0 && the_statement.id === "var") {
        warn("var_loop", the_statement);
    }
    (function next() {
        if (next_token.id === "{" && the_statement.id !== "var") {
            var the_brace = next_token;
            advance("{");
            (function pair() {
                if (!next_token.identifier) {
                    return stop("expected_identifier_a", next_token);
                }
                var name = next_token;
                survey(name);
                advance();
                if (next_token.id === ":") {
                    advance(":");
                    if (!next_token.identifier) {
                        return stop("expected_identifier_a", next_token);
                    }
                    next_token.label = name;
                    the_statement.names.push(next_token);
                    enroll(next_token, "variable", is_const);
                    advance();
                    the_brace.open = true;
                } else {
                    the_statement.names.push(name);
                    enroll(name, "variable", is_const);
                }
                name.dead = false;
                name.init = true;
                if (next_token.id === "=") {
                    advance("=");
                    name.expression = expression();
                    the_brace.open = true;
                }
                if (next_token.id === ",") {
                    advance(",");
                    return pair();
                }
            }());
            advance("}");
            advance("=");
            the_statement.expression = expression(0);
        } else if (next_token.id === "[" && the_statement.id !== "var") {
            var the_bracket = next_token;
            advance("[");
            (function element() {
                var ellipsis;
                if (next_token.id === "...") {
                    ellipsis = true;
                    advance("...");
                }
                if (!next_token.identifier) {
                    return stop("expected_identifier_a", next_token);
                }
                var name = next_token;
                advance();
                the_statement.names.push(name);
                enroll(name, "variable", is_const);
                name.dead = false;
                name.init = true;
                if (ellipsis) {
                    name.ellipsis = true;
                } else {
                    if (next_token.id === "=") {
                        advance("=");
                        name.expression = expression();
                        the_bracket.open = true;
                    }
                    if (next_token.id === ",") {
                        advance(",");
                        return element();
                    }
                }
            }());
            advance("]");
            advance("=");
            the_statement.expression = expression(0);
        } else if (next_token.identifier) {
            var name = next_token;
            advance();
            if (name.id === "ignore") {
                warn("unexpected_a", name);
            }
            enroll(name, "variable", is_const);
            if (next_token.id === "=" || is_const) {
                advance("=");
                name.dead = false;
                name.init = true;
                name.expression = expression(0);
            }
            the_statement.names.push(name);
        } else {
            return stop("expected_identifier_a", next_token);
        }
    }());
    semicolon();
    return the_statement;
}

stmt("const", do_var);
stmt("continue", function () {
    var the_continue = token;
    if (functionage.loop < 1 || functionage.finally > 0) {
        warn("unexpected_a", the_continue);
    }
    not_top_level(the_continue);
    the_continue.disrupt = true;
    warn("unexpected_a", the_continue);
    advance(";");
    return the_continue;
});
stmt("debugger", function () {
    var the_debug = token;
    if (!option.devel) {
        warn("unexpected_a", the_debug);
    }
    semicolon();
    return the_debug;
});
stmt("delete", function () {
    var the_token = token;
    var the_value = expression(0);
    if (
        (the_value.id !== "." && the_value.id !== "[")
        || the_value.arity !== "binary"
    ) {
        stop("expected_a_b", the_value, ".", artifact(the_value));
    }
    the_token.expression = the_value;
    semicolon();
    return the_token;
});
stmt("do", function () {
    var the_do = token;
    not_top_level(the_do);
    functionage.loop += 1;
    the_do.block = block();
    advance("while");
    the_do.expression = condition();
    semicolon();
    if (the_do.block.disrupt === true) {
        warn("weird_loop", the_do);
    }
    functionage.loop -= 1;
    return the_do;
});
stmt("export", function () {
    var the_export = token;
    var the_id;
    var the_name;
    var the_thing;

    function export_id() {
        if (!next_token.identifier) {
            stop("expected_identifier_a");
        }
        the_id = next_token.id;
        the_name = global.context[the_id];
        if (the_name === undefined) {
            warn("unexpected_a");
        } else {
            the_name.used += 1;
            if (exports[the_id] !== undefined) {
                warn("duplicate_a");
            }
            exports[the_id] = the_name;
        }
        advance();
        the_export.expression.push(the_thing);
    }

    the_export.expression = [];
    if (next_token.id === "default") {
        if (exports.default !== undefined) {
            warn("duplicate_a");
        }
        advance("default");
        the_thing = expression(0);
        if (
            the_thing.id !== "("
            || the_thing.expression[0].id !== "."
            || the_thing.expression[0].expression.id !== "Object"
            || the_thing.expression[0].name.id !== "freeze"
        ) {
            warn("freeze_exports", the_thing);
        }
        if (next_token.id === ";") {
            semicolon();
        }
        exports.default = the_thing;
        the_export.expression.push(the_thing);
    } else {
        if (next_token.id === "function") {
            warn("freeze_exports");
            the_thing = statement();
            the_name = the_thing.name;
            the_id = the_name.id;
            the_name.used += 1;
            if (exports[the_id] !== undefined) {
                warn("duplicate_a", the_name);
            }
            exports[the_id] = the_thing;
            the_export.expression.push(the_thing);
            the_thing.statement = false;
            the_thing.arity = "unary";
        } else if (
            next_token.id === "var"
            || next_token.id === "let"
            || next_token.id === "const"
        ) {
            warn("unexpected_a", next_token);
            statement();
        } else if (next_token.id === "{") {
            advance("{");
            (function loop() {
                export_id();
                if (next_token.id === ",") {
                    advance(",");
                    return loop();
                }
            }());
            advance("}");
            semicolon();
        } else {
            stop("unexpected_a");
        }
    }
    module_mode = true;
    return the_export;
});
stmt("for", function () {
    var first;
    var the_for = token;
    if (!option.for) {
        warn("unexpected_a", the_for);
    }
    not_top_level(the_for);
    functionage.loop += 1;
    advance("(");
    token.free = true;
    if (next_token.id === ";") {
        return stop("expected_a_b", the_for, "while (", "for (;");
    }
    if (
        next_token.id === "var"
        || next_token.id === "let"
        || next_token.id === "const"
    ) {
        return stop("unexpected_a");
    }
    first = expression(0);
    if (first.id === "in") {
        if (first.expression[0].arity !== "variable") {
            warn("bad_assignment_a", first.expression[0]);
        }
        the_for.name = first.expression[0];
        the_for.expression = first.expression[1];
        warn("expected_a_b", the_for, "Object.keys", "for in");
    } else {
        the_for.initial = first;
        advance(";");
        the_for.expression = expression(0);
        advance(";");
        the_for.inc = expression(0);
        if (the_for.inc.id === "++") {
            warn("expected_a_b", the_for.inc, "+= 1", "++");
        }
    }
    advance(")");
    the_for.block = block();
    if (the_for.block.disrupt === true) {
        warn("weird_loop", the_for);
    }
    functionage.loop -= 1;
    return the_for;
});
stmt("function", do_function);
stmt("if", function () {
    var the_else;
    var the_if = token;
    the_if.expression = condition();
    the_if.block = block();
    if (next_token.id === "else") {
        advance("else");
        the_else = token;
        the_if.else = (
            next_token.id === "if"
            ? statement()
            : block()
        );
        if (the_if.block.disrupt === true) {
            if (the_if.else.disrupt === true) {
                the_if.disrupt = true;
            } else {
                warn("unexpected_a", the_else);
            }
        }
    }
    return the_if;
});
stmt("import", function () {
    var the_import = token;
    var name;
    if (typeof module_mode === "object") {
        warn("unexpected_directive_a", module_mode, module_mode.directive);
    }
    module_mode = true;
    if (next_token.identifier) {
        name = next_token;
        advance();
        if (name.id === "ignore") {
            warn("unexpected_a", name);
        }
        enroll(name, "variable", true);
        the_import.name = name;
    } else {
        var names = [];
        advance("{");
        if (next_token.id !== "}") {
            while (true) {
                if (!next_token.identifier) {
                    stop("expected_identifier_a");
                }
                name = next_token;
                advance();
                if (name.id === "ignore") {
                    warn("unexpected_a", name);
                }
                enroll(name, "variable", true);
                names.push(name);
                if (next_token.id !== ",") {
                    break;
                }
                advance(",");
            }
        }
        advance("}");
        the_import.name = names;
    }
    advance("from");
    advance("(string)");
    the_import.import = token;
    if (!rx_module.test(token.value)) {
        warn("bad_module_name_a", token);
    }
    froms.push(token.value);
    semicolon();
    return the_import;
});
stmt("let", do_var);
stmt("return", function () {
    var the_return = token;
    not_top_level(the_return);
    if (functionage.finally > 0) {
        warn("unexpected_a", the_return);
    }
    the_return.disrupt = true;
    if (next_token.id !== ";" && the_return.line === next_token.line) {
        the_return.expression = expression(10);
    }
    advance(";");
    return the_return;
});
stmt("switch", function () {
    var dups = [];
    var last;
    var stmts;
    var the_cases = [];
    var the_disrupt = true;
    var the_switch = token;
    not_top_level(the_switch);
    if (functionage.finally > 0) {
        warn("unexpected_a", the_switch);
    }
    functionage.switch += 1;
    advance("(");
    token.free = true;
    the_switch.expression = expression(0);
    the_switch.block = the_cases;
    advance(")");
    advance("{");
    (function major() {
        var the_case = next_token;
        the_case.arity = "statement";
        the_case.expression = [];
        (function minor() {
            advance("case");
            token.switch = true;
            var exp = expression(0);
            if (dups.some(function (thing) {
                return are_similar(thing, exp);
            })) {
                warn("unexpected_a", exp);
            }
            dups.push(exp);
            the_case.expression.push(exp);
            advance(":");
            if (next_token.id === "case") {
                return minor();
            }
        }());
        stmts = statements();
        if (stmts.length < 1) {
            warn("expected_statements_a");
            return;
        }
        the_case.block = stmts;
        the_cases.push(the_case);
        last = stmts[stmts.length - 1];
        if (last.disrupt) {
            if (last.id === "break" && last.label === undefined) {
                the_disrupt = false;
            }
        } else {
            warn(
                "expected_a_before_b",
                next_token,
                "break;",
                artifact(next_token)
            );
        }
        if (next_token.id === "case") {
            return major();
        }
    }());
    dups = undefined;
    if (next_token.id === "default") {
        var the_default = next_token;
        advance("default");
        token.switch = true;
        advance(":");
        the_switch.else = statements();
        if (the_switch.else.length < 1) {
            warn("unexpected_a", the_default);
            the_disrupt = false;
        } else {
            var the_last = the_switch.else[the_switch.else.length - 1];
            if (the_last.id === "break" && the_last.label === undefined) {
                warn("unexpected_a", the_last);
                the_last.disrupt = false;
            }
            the_disrupt = the_disrupt && the_last.disrupt;
        }
    } else {
        the_disrupt = false;
    }
    advance("}", the_switch);
    functionage.switch -= 1;
    the_switch.disrupt = the_disrupt;
    return the_switch;
});
stmt("throw", function () {
    var the_throw = token;
    the_throw.disrupt = true;
    the_throw.expression = expression(10);
    semicolon();
    if (functionage.try > 0) {
        warn("unexpected_a", the_throw);
    }
    return the_throw;
});
stmt("try", function () {
    var the_catch;
    var the_disrupt;
    var the_try = token;
    if (functionage.try > 0) {
        warn("unexpected_a", the_try);
    }
    functionage.try += 1;
    the_try.block = block();
    the_disrupt = the_try.block.disrupt;
    if (next_token.id === "catch") {
        var ignored = "ignore";
        the_catch = next_token;
        the_try.catch = the_catch;
        advance("catch");
        if (next_token.id === "(") {
            advance("(");
            if (!next_token.identifier) {
                return stop("expected_identifier_a", next_token);
            }
            if (next_token.id !== "ignore") {
                ignored = undefined;
                the_catch.name = next_token;
                enroll(next_token, "exception", true);
            }
            advance();
            advance(")");
        }
        the_catch.block = block(ignored);
        if (the_catch.block.disrupt !== true) {
            the_disrupt = false;
        }
    } else {
        warn(
            "expected_a_before_b",
            next_token,
            "catch",
            artifact(next_token)
        );
    }
    if (next_token.id === "finally") {
        functionage.finally += 1;
        advance("finally");
        the_try.else = block();
        the_disrupt = the_try.else.disrupt;
        functionage.finally -= 1;
    }
    the_try.disrupt = the_disrupt;
    functionage.try -= 1;
    return the_try;
});
stmt("var", do_var);
stmt("while", function () {
    var the_while = token;
    not_top_level(the_while);
    functionage.loop += 1;
    the_while.expression = condition();
    the_while.block = block();
    if (the_while.block.disrupt === true) {
        warn("weird_loop", the_while);
    }
    functionage.loop -= 1;
    return the_while;
});
stmt("with", function () {
    stop("unexpected_a", token);
});

ternary("?", ":");

// Ambulation of the parse tree.

function action(when) {

// Produce a function that will register task functions that will be called as
// the tree is traversed.

    return function (arity, id, task) {
        var a_set = when[arity];
        var i_set;

// The id parameter is optional. If excluded, the task will be applied to all
// ids.

        if (typeof id !== "string") {
            task = id;
            id = "(all)";
        }

// If this arity has no registrations yet, then create a set object to hold
// them.

        if (a_set === undefined) {
            a_set = empty();
            when[arity] = a_set;
        }

// If this id has no registrations yet, then create a set array to hold them.

        i_set = a_set[id];
        if (i_set === undefined) {
            i_set = [];
            a_set[id] = i_set;
        }

// Register the task with the arity and the id.

        i_set.push(task);
    };
}

function amble(when) {

// Produce a function that will act on the tasks registered by an action
// function while walking the tree.

    return function (the_token) {

// Given a task set that was built by an action function, run all of the
// relevant tasks on the token.

        var a_set = when[the_token.arity];
        var i_set;

// If there are tasks associated with the token's arity...

        if (a_set !== undefined) {

// If there are tasks associated with the token's id...

            i_set = a_set[the_token.id];
            if (i_set !== undefined) {
                i_set.forEach(function (task) {
                    return task(the_token);
                });
            }

// If there are tasks for all ids.

            i_set = a_set["(all)"];
            if (i_set !== undefined) {
                i_set.forEach(function (task) {
                    return task(the_token);
                });
            }
        }
    };
}

var posts = empty();
var pres = empty();
var preaction = action(pres);
var postaction = action(posts);
var preamble = amble(pres);
var postamble = amble(posts);

function walk_expression(thing) {
    if (thing) {
        if (Array.isArray(thing)) {
            thing.forEach(walk_expression);
        } else {
            preamble(thing);
            walk_expression(thing.expression);
            if (thing.id === "function") {
                walk_statement(thing.block);
            }
            if (thing.arity === "pre" || thing.arity === "post") {
                warn("unexpected_a", thing);
            } else if (
                thing.arity === "statement"
                || thing.arity === "assignment"
            ) {
                warn("unexpected_statement_a", thing);
            }
            postamble(thing);
        }
    }
}

function walk_statement(thing) {
    if (thing) {
        if (Array.isArray(thing)) {
            thing.forEach(walk_statement);
        } else {
            preamble(thing);
            walk_expression(thing.expression);
            if (thing.arity === "binary") {
                if (thing.id !== "(") {
                    warn("unexpected_expression_a", thing);
                }
            } else if (
                thing.arity !== "statement"
                && thing.arity !== "assignment"
            ) {
                warn("unexpected_expression_a", thing);
            }
            walk_statement(thing.block);
            walk_statement(thing.else);
            postamble(thing);
        }
    }
}

function lookup(thing) {
    if (thing.arity === "variable") {

// Look up the variable in the current context.

        var the_variable = functionage.context[thing.id];

// If it isn't local, search all the other contexts. If there are name
// collisions, take the most recent.

        if (the_variable === undefined) {
            stack.forEach(function (outer) {
                var a_variable = outer.context[thing.id];
                if (
                    a_variable !== undefined
                    && a_variable.role !== "label"
                ) {
                    the_variable = a_variable;
                }
            });

// If it isn't in any of those either, perhaps it is a predefined global.
// If so, add it to the global context.

            if (the_variable === undefined) {
                if (declared_globals[thing.id] === undefined) {
                    warn("undeclared_a", thing);
                    return;
                }
                the_variable = {
                    dead: false,
                    parent: global,
                    id: thing.id,
                    init: true,
                    role: "variable",
                    used: 0,
                    writable: false
                };
                global.context[thing.id] = the_variable;
            }
            the_variable.closure = true;
            functionage.context[thing.id] = the_variable;
        } else if (the_variable.role === "label") {
            warn("label_a", thing);
        }
        if (
            the_variable.dead
            && (
                the_variable.calls === undefined
                || the_variable.calls[functionage.name.id] === undefined
            )
        ) {
            warn("out_of_scope_a", thing);
        }
        return the_variable;
    }
}

function subactivate(name) {
    name.init = true;
    name.dead = false;
    blockage.live.push(name);
}

function preaction_function(thing) {
    if (thing.arity === "statement" && blockage.body !== true) {
        warn("unexpected_a", thing);
    }
    stack.push(functionage);
    block_stack.push(blockage);
    functionage = thing;
    blockage = thing;
    thing.live = [];
    if (typeof thing.name === "object") {
        thing.name.dead = false;
        thing.name.init = true;
    }
    if (thing.extra === "get") {
        if (thing.parameters.length !== 0) {
            warn("bad_get", thing);
        }
    } else if (thing.extra === "set") {
        if (thing.parameters.length !== 1) {
            warn("bad_set", thing);
        }
    }
    thing.parameters.forEach(function (name) {
        walk_expression(name.expression);
        if (name.id === "{" || name.id === "[") {
            name.names.forEach(subactivate);
        } else {
            name.dead = false;
            name.init = true;
        }
    });
}

function bitwise_check(thing) {
    if (!option.bitwise && bitwiseop[thing.id] === true) {
        warn("unexpected_a", thing);
    }
    if (
        thing.id !== "("
        && thing.id !== "&&"
        && thing.id !== "||"
        && thing.id !== "="
        && Array.isArray(thing.expression)
        && thing.expression.length === 2
        && (
            relationop[thing.expression[0].id] === true
            || relationop[thing.expression[1].id] === true
        )
    ) {
        warn("unexpected_a", thing);
    }
}

function pop_block() {
    blockage.live.forEach(function (name) {
        name.dead = true;
    });
    delete blockage.live;
    blockage = block_stack.pop();
}

function activate(name) {
    name.dead = false;
    if (name.expression !== undefined) {
        walk_expression(name.expression);
        if (name.id === "{" || name.id === "[") {
            name.names.forEach(subactivate);
        } else {
            name.init = true;
        }
    }
    blockage.live.push(name);
}

function action_var(thing) {
    thing.names.forEach(activate);
}

preaction("assignment", bitwise_check);
preaction("binary", bitwise_check);
preaction("binary", function (thing) {
    if (relationop[thing.id] === true) {
        var left = thing.expression[0];
        var right = thing.expression[1];
        if (left.id === "NaN" || right.id === "NaN") {
            warn("number_isNaN", thing);
        } else if (left.id === "typeof") {
            if (right.id !== "(string)") {
                if (right.id !== "typeof") {
                    warn("expected_string_a", right);
                }
            } else {
                var value = right.value;
                if (value === "null" || value === "undefined") {
                    warn("unexpected_typeof_a", right, value);
                } else if (
                    value !== "boolean"
                    && value !== "function"
                    && value !== "number"
                    && value !== "object"
                    && value !== "string"
                    && value !== "symbol"
                ) {
                    warn("expected_type_string_a", right, value);
                }
            }
        }
    }
});
preaction("binary", "==", function (thing) {
    warn("expected_a_b", thing, "===", "==");
});
preaction("binary", "!=", function (thing) {
    warn("expected_a_b", thing, "!==", "!=");
});
preaction("binary", "=>", preaction_function);
preaction("binary", "||", function (thing) {
    thing.expression.forEach(function (thang) {
        if (thang.id === "&&" && !thang.wrapped) {
            warn("and", thang);
        }
    });
});
preaction("binary", "(", function (thing) {
    var left = thing.expression[0];
    if (
        left.identifier
        && functionage.context[left.id] === undefined
        && typeof functionage.name === "object"
    ) {
        var parent = functionage.name.parent;
        if (parent) {
            var left_variable = parent.context[left.id];
            if (
                left_variable !== undefined
                && left_variable.dead
                && left_variable.parent === parent
                && left_variable.calls !== undefined
                && left_variable.calls[functionage.name.id] !== undefined
            ) {
                left_variable.dead = false;
            }
        }
    }
});
preaction("binary", "in", function (thing) {
    warn("infix_in", thing);
});
preaction("binary", "instanceof", function (thing) {
    warn("unexpected_a", thing);
});
preaction("binary", ".", function (thing) {
    if (thing.expression.new) {
        thing.new = true;
    }
});
preaction("statement", "{", function (thing) {
    block_stack.push(blockage);
    blockage = thing;
    thing.live = [];
});
preaction("statement", "for", function (thing) {
    if (thing.name !== undefined) {
        var the_variable = lookup(thing.name);
        if (the_variable !== undefined) {
            the_variable.init = true;
            if (!the_variable.writable) {
                warn("bad_assignment_a", thing.name);
            }
        }
    }
    walk_statement(thing.initial);
});
preaction("statement", "function", preaction_function);
preaction("unary", "~", bitwise_check);
preaction("unary", "function", preaction_function);
preaction("variable", function (thing) {
    var the_variable = lookup(thing);
    if (the_variable !== undefined) {
        thing.variable = the_variable;
        the_variable.used += 1;
    }
});

function init_variable(name) {
    var the_variable = lookup(name);
    if (the_variable !== undefined) {
        if (the_variable.writable) {
            the_variable.init = true;
            return;
        }
    }
    warn("bad_assignment_a", name);
}

postaction("assignment", "+=", function (thing) {
    var right = thing.expression[1];
    if (right.constant) {
        if (
            right.value === ""
            || (right.id === "(number)" && right.value === "0")
            || right.id === "(boolean)"
            || right.id === "null"
            || right.id === "undefined"
            || Number.isNaN(right.value)
        ) {
            warn("unexpected_a", right);
        }
    }
});
postaction("assignment", function (thing) {

// Assignment using = sets the init property of a variable. No other assignment
// operator can do this. A = token keeps that variable (or array of variables
// in case of destructuring) in its name property.

    var lvalue = thing.expression[0];
    if (thing.id === "=") {
        if (thing.names !== undefined) {
            if (Array.isArray(thing.names)) {
                thing.names.forEach(init_variable);
            } else {
                init_variable(thing.names);
            }
        } else {
            if (lvalue.id === "[" || lvalue.id === "{") {
                lvalue.expression.forEach(function (thing) {
                    if (thing.variable) {
                        thing.variable.init = true;
                    }
                });
            } else if (
                lvalue.id === "."
                && thing.expression[1].id === "undefined"
            ) {
                warn(
                    "expected_a_b",
                    lvalue.expression,
                    "delete",
                    "undefined"
                );
            }
        }
    } else {
        if (lvalue.arity === "variable") {
            if (!lvalue.variable || lvalue.variable.writable !== true) {
                warn("bad_assignment_a", lvalue);
            }
        }
        var right = syntax[thing.expression[1].id];
        if (
            right !== undefined
            && (
                right.id === "function"
                || right.id === "=>"
                || (
                    right.constant
                    && right.id !== "(number)"
                    && (right.id !== "(string)" || thing.id !== "+=")
                )
            )
        ) {
            warn("unexpected_a", thing.expression[1]);
        }
    }
});

function postaction_function(thing) {
    delete functionage.finally;
    delete functionage.loop;
    delete functionage.switch;
    delete functionage.try;
    functionage = stack.pop();
    if (thing.wrapped) {
        warn("unexpected_parens", thing);
    }
    return pop_block();
}

postaction("binary", function (thing) {
    var right;
    if (relationop[thing.id]) {
        if (
            is_weird(thing.expression[0])
            || is_weird(thing.expression[1])
            || are_similar(thing.expression[0], thing.expression[1])
            || (
                thing.expression[0].constant === true
                && thing.expression[1].constant === true
            )
        ) {
            warn("weird_relation_a", thing);
        }
    }
    if (thing.id === "+") {
        if (!option.convert) {
            if (thing.expression[0].value === "") {
                warn("expected_a_b", thing, "String(...)", "\"\" +");
            } else if (thing.expression[1].value === "") {
                warn("expected_a_b", thing, "String(...)", "+ \"\"");
            }
        }
    } else if (thing.id === "[") {
        if (thing.expression[0].id === "window") {
            warn("weird_expression_a", thing, "window[...]");
        }
        if (thing.expression[0].id === "self") {
            warn("weird_expression_a", thing, "self[...]");
        }
    } else if (thing.id === "." || thing.id === "?.") {
        if (thing.expression.id === "RegExp") {
            warn("weird_expression_a", thing);
        }
    } else if (thing.id !== "=>" && thing.id !== "(") {
        right = thing.expression[1];
        if (
            (thing.id === "+" || thing.id === "-")
            && right.id === thing.id
            && right.arity === "unary"
            && !right.wrapped
        ) {
            warn("wrap_unary", right);
        }
        if (
            thing.expression[0].constant === true
            && right.constant === true
        ) {
            thing.constant = true;
        }
    }
});
postaction("binary", "&&", function (thing) {
    if (
        is_weird(thing.expression[0])
        || are_similar(thing.expression[0], thing.expression[1])
        || thing.expression[0].constant === true
        || thing.expression[1].constant === true
    ) {
        warn("weird_condition_a", thing);
    }
});
postaction("binary", "||", function (thing) {
    if (
        is_weird(thing.expression[0])
        || are_similar(thing.expression[0], thing.expression[1])
        || thing.expression[0].constant === true
    ) {
        warn("weird_condition_a", thing);
    }
});
postaction("binary", "=>", postaction_function);
postaction("binary", "(", function (thing) {
    var left = thing.expression[0];
    var arg;
    var the_new;
    if (left.id === "new") {
        the_new = left;
        left = left.expression;
    }
    if (left.id === "function") {
        if (!thing.wrapped) {
            warn("wrap_immediate", thing);
        }
    } else if (left.identifier) {
        if (the_new !== undefined) {
            if (
                left.id[0] > "Z"
                || left.id === "Boolean"
                || left.id === "Number"
                || left.id === "String"
                || left.id === "Symbol"
            ) {
                warn("unexpected_a", the_new);
            } else if (left.id === "Function") {
                if (!option.eval) {
                    warn("unexpected_a", left, "new Function");
                }
            } else if (left.id === "Array") {
                arg = thing.expression;
                if (arg.length !== 2 || arg[1].id === "(string)") {
                    warn("expected_a_b", left, "[]", "new Array");
                }
            } else if (left.id === "Object") {
                warn(
                    "expected_a_b",
                    left,
                    "Object.create(null)",
                    "new Object"
                );
            }
        } else {
            if (
                left.id[0] >= "A"
                && left.id[0] <= "Z"
                && left.id !== "Boolean"
                && left.id !== "Number"
                && left.id !== "String"
                && left.id !== "Symbol"
            ) {
                warn(
                    "expected_a_before_b",
                    left,
                    "new",
                    artifact(left)
                );
            }
        }
    } else if (left.id === ".") {
        var cack = the_new !== undefined;
        if (left.expression.id === "Date" && left.name.id === "UTC") {
            cack = !cack;
        }
        if (rx_cap.test(left.name.id) !== cack) {
            if (the_new !== undefined) {
                warn("unexpected_a", the_new);
            } else {
                warn(
                    "expected_a_before_b",
                    left.expression,
                    "new",
                    left.name.id
                );
            }
        }
        if (left.name.id === "getTime") {
            var paren = left.expression;
            if (paren.id === "(") {
                var array = paren.expression;
                if (array.length === 1) {
                    var new_date = array[0];
                    if (
                        new_date.id === "new"
                        && new_date.expression.id === "Date"
                    ) {
                        warn(
                            "expected_a_b",
                            new_date,
                            "Date.now()",
                            "new Date().getTime()"
                        );
                    }
                }
            }
        }
    }
});
postaction("binary", "[", function (thing) {
    if (thing.expression[0].id === "RegExp") {
        warn("weird_expression_a", thing);
    }
    if (is_weird(thing.expression[1])) {
        warn("weird_expression_a", thing.expression[1]);
    }
});
postaction("statement", "{", pop_block);
postaction("statement", "const", action_var);
postaction("statement", "export", top_level_only);
postaction("statement", "for", function (thing) {
    walk_statement(thing.inc);
});
postaction("statement", "function", postaction_function);
postaction("statement", "import", function (the_thing) {
    var name = the_thing.name;
    if (Array.isArray(name)) {
        name.forEach(function (name) {
            name.dead = false;
            name.init = true;
            blockage.live.push(name);
        });
    } else {
        name.dead = false;
        name.init = true;
        blockage.live.push(name);
    }
    return top_level_only(the_thing);
});
postaction("statement", "let", action_var);
postaction("statement", "try", function (thing) {
    if (thing.catch !== undefined) {
        var the_name = thing.catch.name;
        if (the_name !== undefined) {
            var the_variable = functionage.context[the_name.id];
            the_variable.dead = false;
            the_variable.init = true;
        }
        walk_statement(thing.catch.block);
    }
});
postaction("statement", "var", action_var);
postaction("ternary", function (thing) {
    if (
        is_weird(thing.expression[0])
        || thing.expression[0].constant === true
        || are_similar(thing.expression[1], thing.expression[2])
    ) {
        warn("unexpected_a", thing);
    } else if (are_similar(thing.expression[0], thing.expression[1])) {
        warn("expected_a_b", thing, "||", "?");
    } else if (are_similar(thing.expression[0], thing.expression[2])) {
        warn("expected_a_b", thing, "&&", "?");
    } else if (
        thing.expression[1].id === "true"
        && thing.expression[2].id === "false"
    ) {
        warn("expected_a_b", thing, "!!", "?");
    } else if (
        thing.expression[1].id === "false"
        && thing.expression[2].id === "true"
    ) {
        warn("expected_a_b", thing, "!", "?");
    } else if (
        thing.expression[0].wrapped !== true
        && (
            thing.expression[0].id === "||"
            || thing.expression[0].id === "&&"
        )
    ) {
        warn("wrap_condition", thing.expression[0]);
    }
});
postaction("unary", function (thing) {
    if (thing.id === "`") {
        if (thing.expression.every(function (thing) {
            return thing.constant;
        })) {
            thing.constant = true;
        }
    } else if (thing.id === "!") {
        if (thing.expression.constant === true) {
            warn("unexpected_a", thing);
        }
    } else if (thing.id === "!!") {
        if (!option.convert) {
            warn("expected_a_b", thing, "Boolean(...)", "!!");
        }
    } else if (
        thing.id !== "["
        && thing.id !== "{"
        && thing.id !== "function"
        && thing.id !== "new"
    ) {
        if (thing.expression.constant === true) {
            thing.constant = true;
        }
    }
});
postaction("unary", "function", postaction_function);
postaction("unary", "+", function (thing) {
    if (!option.convert) {
        warn("expected_a_b", thing, "Number(...)", "+");
    }
    var right = thing.expression;
    if (right.id === "(" && right.expression[0].id === "new") {
        warn("unexpected_a_before_b", thing, "+", "new");
    } else if (
        right.constant
        || right.id === "{"
        || (right.id === "[" && right.arity !== "binary")
    ) {
        warn("unexpected_a", thing, "+");
    }
});

function delve(the_function) {
    Object.keys(the_function.context).forEach(function (id) {
        if (id !== "ignore") {
            var name = the_function.context[id];
            if (name.parent === the_function) {
                if (
                    name.used === 0
                    && (
                        name.role !== "function"
                        || name.parent.arity !== "unary"
                    )
                ) {
                    warn("unused_a", name);
                } else if (!name.init) {
                    warn("uninitialized_a", name);
                }
            }
        }
    });
}

function uninitialized_and_unused() {

// Delve into the functions looking for variables that were not initialized
// or used. If the file imports or exports, then its global object is also
// delved.

    if (module_mode === true || option.node) {
        delve(global);
    }
    functions.forEach(delve);
}

// Go through the token list, looking at usage of whitespace.

function whitage() {
    var closer = "(end)";
    var free = false;
    var left = global;
    var margin = 0;
    var nr_comments_skipped = 0;
    var open = true;
    var opening = true;
    var right;

    function pop() {
        var previous = stack.pop();
        closer = previous.closer;
        free = previous.free;
        margin = previous.margin;
        open = previous.open;
        opening = previous.opening;
    }

    function push() {
        stack.push({
            closer,
            free,
            margin,
            open,
            opening
        });
    }

    function expected_at(at) {
        warn(
            "expected_a_at_b_c",
            right,
            artifact(right),
            fudge + at,
            artifact_column(right)
        );
    }

    function at_margin(fit) {
        var at = margin + fit;
        // jslint-hack - expected_at
        if (right.from !== at) {
            return expected_at(at);
        }
    }

    function no_space_only() {
        if (
            left.id !== "(global)"
            && left.nr + 1 === right.nr
            && (
                left.line !== right.line
                || left.thru !== right.from
            )
        ) {
            warn(
                "unexpected_space_a_b",
                right,
                artifact(left),
                artifact(right)
            );
        }
    }

    function no_space() {
        if (left.line === right.line) {
            if (left.thru !== right.from && nr_comments_skipped === 0) {
                warn(
                    "unexpected_space_a_b",
                    right,
                    artifact(left),
                    artifact(right)
                );
            }
        } else {
            if (open) {
                var at = (
                    free
                    ? margin
                    : margin + 8
                );
                // jslint-hack - expected_at
                if (right.from !== at) {
                    expected_at(at);
                }
            } else {
                // jslint-hack - expected_at
                if (right.from !== margin + 8) {
                    expected_at(margin + 8);
                }
            }
        }
    }

    function one_space_only() {
        if (left.line !== right.line || left.thru + 1 !== right.from) {
            warn(
                "expected_space_a_b",
                right,
                artifact(left),
                artifact(right)
            );
        }
    }

    function one_space() {
        if (left.line === right.line || !open) {
            if (left.thru + 1 !== right.from && nr_comments_skipped === 0) {
                warn(
                    "expected_space_a_b",
                    right,
                    artifact(left),
                    artifact(right)
                );
            }
        } else {
            // jslint-hack - expected_at
            if (right.from !== margin) {
                expected_at(margin);
            }
        }
    }

    stack = [];
    tokens.forEach(function (the_token) {
        right = the_token;
        if (right.id === "(comment)" || right.id === "(end)") {
            nr_comments_skipped += 1;
        } else {

// If left is an opener and right is not the closer, then push the previous
// state. If the token following the opener is on the next line, then this is
// an open form. If the tokens are on the same line, then it is a closed form.
// Open form is more readable, with each item (statement, argument, parameter,
// etc) starting on its own line. Closed form is more compact. Statement blocks
// are always in open form.

            var new_closer = opener[left.id];
            if (typeof new_closer === "string") {
                if (new_closer !== right.id) {
                    opening = left.open || (left.line !== right.line);
                    push();
                    closer = new_closer;
                    if (opening) {
                        free = closer === ")" && left.free;
                        open = true;
                        // jslint-hack - conditional-margin
                        if (
                            !option.utility2
                            || lines[right.line].startsWith(" ")
                        ) {
                            margin += 4;
                        }
                        if (right.role === "label") {
                            // jslint-hack - expected_at
                            if (right.from !== 0) {
                                expected_at(0);
                            }
                        } else if (right.switch) {
                            at_margin(-4);
                        } else {
                            at_margin(0);
                        }
                    } else {
                        if (right.statement || right.role === "label") {
                            warn(
                                "expected_line_break_a_b",
                                right,
                                artifact(left),
                                artifact(right)
                            );
                        }
                        free = false;
                        open = false;
                        no_space_only();
                    }
                } else {

// If left and right are opener and closer, then the placement of right depends
// on the openness. Illegal pairs (like '{]') have already been detected.

                    if (left.line === right.line) {
                        no_space();
                    } else {
                        at_margin(0);
                    }
                }
            } else {
                if (right.statement === true) {
                    if (left.id === "else") {
                        one_space_only();
                    } else {
                        at_margin(0);
                        open = false;
                    }

// If right is a closer, then pop the previous state.
                } else if (right.id === closer) {
                    pop();
                    if (opening && right.id !== ";") {
                        at_margin(0);
                    } else {
                        no_space_only();
                    }
                } else {

// Left is not an opener, and right is not a closer.
// The nature of left and right will determine the space between them.

// If left is ',' or ';' or right is a statement then if open,
// right must go at the margin, or if closed, a space between.

                    if (right.switch) {
                        at_margin(-4);
                    } else if (right.role === "label") {
                        // jslint-hack - expected_at
                        if (right.from !== 0) {
                            expected_at(0);
                        }
                    } else if (left.id === ",") {
                        if (!open || (
                            (free || closer === "]")
                            && left.line === right.line
                        )) {
                            one_space();
                        } else {
                            at_margin(0);
                        }

// If right is a ternary operator, line it up on the margin.
                    } else if (right.arity === "ternary") {
                        if (open) {
                            at_margin(0);
                        } else {
                            warn("use_open", right);
                        }
                    } else if (
                        right.arity === "binary"
                        && right.id === "("
                        && free
                    ) {
                        no_space();
                    } else if (
                        left.id === "."
                        || left.id === "?."
                        || left.id === "..."
                        || right.id === ","
                        || right.id === ";"
                        || right.id === ":"
                        || (
                            right.arity === "binary"
                            && (right.id === "(" || right.id === "[")
                        )
                        || (
                            right.arity === "function"
                            && left.id !== "function"
                        )
                    ) {
                        no_space_only();
                    } else if (right.id === "." || right.id === "?.") {
                        // jslint-hack - method-chain
                        // https://github.com/douglascrockford/JSLint/commit/752c82d860ac14d35d492dc5c6ad0a0ed8227e76#diff-01d3d81a6eb6d82af3c377b55dc4fa28L4692
                        if (left.line === right.line) {
                            no_space();
                        } else {
                            at_margin(0);
                        }
                    } else if (left.id === ";") {
                        if (open) {
                            at_margin(0);
                        } else {
                            one_space();
                        }
                    } else if (
                        left.arity === "ternary"
                        || left.id === "case"
                        || left.id === "catch"
                        || left.id === "else"
                        || left.id === "finally"
                        || left.id === "while"
                        || right.id === "catch"
                        || right.id === "else"
                        || right.id === "finally"
                        || (right.id === "while" && !right.statement)
                        || (left.id === ")" && right.id === "{")
                    ) {
                        one_space_only();
                    } else if (
                        left.id === "var"
                        || left.id === "const"
                        || left.id === "let"
                    ) {
                        push();
                        closer = ";";
                        free = false;
                        open = left.open;
                        if (open) {
                            margin = margin + 4;
                            at_margin(0);
                        } else {
                            one_space_only();
                        }
                    } else if (

// There is a space between left and right.

                        spaceop[left.id] === true
                        || spaceop[right.id] === true
                        || (
                            left.arity === "binary"
                            && (left.id === "+" || left.id === "-")
                        )
                        || (
                            right.arity === "binary"
                            && (right.id === "+" || right.id === "-")
                        )
                        || left.id === "function"
                        || left.id === ":"
                        || ((
                            left.identifier
                            || left.id === "(string)"
                            || left.id === "(number)"
                        ) && (
                            right.identifier
                            || right.id === "(string)"
                            || right.id === "(number)"
                        ))
                        || (left.arity === "statement" && right.id !== ";")
                    ) {
                        one_space();
                    } else if (left.arity === "unary" && left.id !== "`") {
                        no_space_only();
                    }
                }
            }
            nr_comments_skipped = 0;
            delete left.calls;
            delete left.dead;
            delete left.free;
            delete left.init;
            delete left.open;
            delete left.used;
            left = right;
        }
    });
}

// The jslint function itself.

// jslint-hack - jslint0
var jslint0 = Object.freeze(function (
    source = "",
    option_object = empty(),
    global_array = []
) {
    try {
        warnings = [];
        option = Object.assign(empty(), option_object);
        anon = "anonymous";
        block_stack = [];
        declared_globals = empty();
        directive_mode = true;
        directives = [];
        // jslint-hack - early_stop = false
        early_stop = false;
        exports = empty();
        froms = [];
        fudge = (
            option.fudge
            ? 1
            : 0
        );
        functions = [];
        global = {
            id: "(global)",
            body: true,
            context: empty(),
            from: 0,
            level: 0,
            line: 0,
            live: [],
            loop: 0,
            switch: 0,
            thru: 0
        };
        blockage = global;
        functionage = global;
        json_mode = false;
        mega_mode = false;
        module_mode = false;
        next_token = global;
        property = empty();
        shebang = false;
        stack = [];
        tenure = undefined;
        token = global;
        token_nr = 0;
        var_mode = undefined;
        populate(standard, declared_globals, false);
        populate(global_array, declared_globals, false);
        Object.keys(option).forEach(function (name) {
            if (option[name] === true) {
                var allowed = allowed_option[name];
                if (Array.isArray(allowed)) {
                    populate(allowed, declared_globals, false);
                }
            }
        });
        tokenize(source);
        advance();
        if (json_mode) {
            tree = json_value();
            advance("(end)");
        } else {

// Because browsers encourage combining of script files, the first token might
// be a semicolon to defend against a missing semicolon in the preceding file.

            if (option.browser) {
                if (next_token.id === ";") {
                    advance(";");
                }
            } else {

// If we are not in a browser, then the file form of strict pragma may be used.

                if (
                    next_token.value === "use strict"
                ) {
                    advance("(string)");
                    advance(";");
                }
            }
            tree = statements();
            advance("(end)");
            functionage = global;
            walk_statement(tree);
            // jslint-hack - !early_stop
            if (!early_stop) {
                uninitialized_and_unused();
                if (!option.white) {
                    whitage();
                }
            }
        }
        if (!option.browser) {
            directives.forEach(function (comment) {
                if (comment.directive === "global") {
                    warn("missing_browser", comment);
                }
            });
        }
        early_stop = false;
    } catch (e) {
        // jslint-hack - e.early_stop = true
        e.early_stop = true;
        if (e.name !== "JSLintError") {
            warnings.push(e);
        }
    }
    return {
        directives,
        edition: "2019-01-31",
        exports,
        froms,
        functions,
        global,
        id: "(JSLint)",
        json: json_mode,
        lines,
        module: module_mode === true,
        ok: warnings.length === 0 && !early_stop,
        option,
        property,
        shebang: (
            shebang
            ? lines[0]
            : undefined
        ),
        stop: early_stop,
        tokens,
        tree,
        warnings: warnings.sort(function (a, b) {
            return a.line - b.line || a.column - b.column;
        })
    };
});



/*
file none
*/
// jslint-hack - ignore bad_property_a
rx_bad_property = (
    /$^/m
);
// jslint-hack - extra
jslint_extra = function (source, opt, global_array) {
/*
 * this function will run with extra-features inside jslint-function jslint()
 */
    // init
    line_ignore = null;
    lines = (
        // ternary-operator
        Array.isArray(source)
        ? source
        : source.split(rx_crlf)
    );
    lines_extra = lines.map(function () {
        return {};
    });
    // jslint
    jslint_result = jslint0(lines, opt, global_array);
    // autofix
    // expected_space_a_b: "Expected one space between '{a}' and '{b}'.",
    // unexpected_space_a_b: "Unexpected space between '{a}' and '{b}'.",
    source = lines_extra.map(function (element, ii) {
        return element.source_autofix || lines[ii];
    }).join("\n").replace((
        /\s+?\u0000/g
    ), "\u0000").replace((
        /(\n\u0020+)(.*?)\n\u0020*?(\/\/.*?)\u0000/g
    ), "$1$3$1$2\u0000").replace((
        /\u0000expected_space_a_b\u0000/g
    ), " ").replace((
        /\u0000unexpected_space_a_b\u0000/g
    ), "");
    jslint_result.lines_extra = lines_extra;
    jslint_result.source_autofix = source;
    return jslint_result;
};
local.jslint_extra = jslint_extra;
next_line_extra = function (source_line, line) {
/*
 * this function will run with extra-features inside jslint-function next_line()
 */
    var line_extra;
    var tmp;
    line_extra = {};
    line_extra.line = line;
    line_extra.source = source_line;
    lines_extra[line] = line_extra;
    tmp = (
        source_line.match(
            /^\/\*\u0020jslint\u0020(ignore:start|ignore:end|utility2:true)\u0020\*\/$/m
        )
        || source_line.slice(-50).match(
            /\u0020\/\/\u0020jslint\u0020(ignore:line)$/m
        )
    );
    switch (tmp && tmp[1]) {
    case "ignore:end":
        line_ignore = null;
        break;
    case "ignore:line":
        line_ignore = "line";
        break;
    case "ignore:start":
        line_ignore = true;
        break;
    case "utility2:true":
        option.bitwise = true;
        option.browser = true;
        option.node = true;
        option.this = true;
        option.utility2 = true;
        [
            allowed_option.browser,
            allowed_option.node, [
                "globalThis"
            ]
        ].forEach(function (list) {
            list.forEach(function (key) {
                declared_globals[key] = false;
            });
        });
        break;
    }
    line_extra.ignore = line_ignore;
    switch (line_ignore) {
    case "line":
        line_ignore = null;
        break;
    case true:
        source_line = "";
        break;
    }
    return source_line;
};
warn_at_extra = function (warning, warnings) {
/*
 * this function will run with extra-features inside jslint-function warn_at()
 */
    var tmp;
    Object.assign(warning, lines_extra[warning.line]);
    // left, right
    [
        "c", "d"
    ].forEach(function (key) {
        if (warning[key] === undefined || typeof warning[key] === "object") {
            warning[key] = Object.assign({}, warning[key]);
            Object.keys(warning[key]).forEach(function (key2) {
                if (typeof warning[key][key2] === "object") {
                    warning[key][key2] = null;
                }
            });
        }
    });
    // early_stop
    if (early_stop) {
        if (option.utility2) {
            warning.stack = warning.stack || new Error().stack;
        }
        warnings.push(warning);
        return;
    }
    // ignore
    if (warning.ignore) {
        delete warning.d.warning;
        return;
    }
    switch (option.utility2 && warning.code) {
    // unexpected_a: "Unexpected '{a}'.",
    case "unexpected_a":
        switch (
            JSON.stringify(warning.c.wrapped || warning.c.id)
            + " " + warning.d.id
        ) {
        case "true .":
            delete warning.d.warning;
            return;
        }
        break;
    }
    // autofix
    warning.a = warning.a || warning.source.trim();
    switch (option.autofix && warning.code) {
    // expected_a_at_b_c: "Expected '{a}' at column {b}, not column {c}.",
    case "expected_a_at_b_c":
        tmp = warning.b - warning.c;
        // autofix indent - increment
        if (tmp >= 0) {
            lines_extra[warning.line].source_autofix = (
                " ".repeat(tmp) + warning.source
            );
            break;
        }
        tmp = -tmp;
        // autofix indent - decrement
        if ((
            /^\u0020*?$/m
        ).test(warning.source.slice(0, warning.column))) {
            lines_extra[warning.line].source_autofix = (
                warning.source.slice(tmp)
            );
            break;
        }
        // autofix indent - newline
        lines_extra[warning.line].source_autofix = (
            warning.source.slice(0, warning.column) + "\n"
            + " ".repeat(warning.b) + warning.source.slice(warning.column)
        );
        break;
    // expected_identifier_a: "Expected an identifier and instead saw '{a}'.",
    case "expected_identifier_a":
        if (!(
            // newline
            (
                /^\d+$/m
            ).test(warning.a)
            && warning.source[warning.column + warning.a.length] === ":"
        )) {
            break;
        }
        lines_extra[warning.line].source_autofix = (
            warning.source.slice(0, warning.column) + "\"" + warning.a + "\""
            + warning.source.slice(warning.column + warning.a.length)
        );
        break;
    // expected_space_a_b: "Expected one space between '{a}' and '{b}'.",
    // unexpected_space_a_b: "Unexpected space between '{a}' and '{b}'.",
    case "expected_space_a_b":
    case "unexpected_space_a_b":
        lines_extra[warning.line].source_autofix = (
            warning.source.slice(0, warning.column) + "\u0000" + warning.code
            + "\u0000" + warning.source.slice(warning.column)
        );
        break;
    // use_spaces: "Use spaces, not tabs.",
    case "use_spaces":
        lines_extra[warning.line].source_autofix = (
            warning.source.replace((
                /^(\u0020*?)\t/
            ), "$1   ")
        );
        break;
    }
    if (warnings.length && warnings[warnings.length - 1].line < warning.line) {
        warnings.push(warning);
        return;
    }
    // debug
    if (option.utility2) {
        warning.option = Object.assign({}, option);
        Object.keys(warning.option).forEach(function (key) {
            if (
                typeof warning.option[key] === "object"
                || (warning.option[key] || "").length >= 100
            ) {
                delete warning.option[key];
            }
        });
        warning.source_autofix = (
            lines_extra[warning.line]
            && lines_extra[warning.line].source_autofix
        );
        warning.stack = warning.stack || new Error().stack;
    }
    warnings.unshift(warning);
};
}());



// run shared js-env code - function
(function () {
local.jslintAndPrint = function (code, file, opt) {
/*
 * this function will jslint / csslint <code> and print any errors to stderr
 */
    var tmp;
    if (!(opt && opt.modeNext)) {
        local.jslintResult = {
            modeNext: 0
        };
    }
    code = code || "";
    file = file || "undefined";
    opt = Object.assign(local.jslintResult, opt || {}, {
        code,
        file
    });
    opt.modeNext += 1;
    switch (opt.modeNext) {
    // jslint - init
    case 1:
        // cleanup
        opt.errList = [];
        opt.errorText = "";
        switch (opt.fileType0) {
        // deembed-js - '\\n\\\n...\\n\\\n'
        case ".\\n\\":
            // rgx - remove \\n\\
            code = code.replace((
                /\\n\\$|\\(.)/gm
            ), function (match0) {
                return (
                    match0 === "\\n\\"
                    ? ""
                    : match0[1]
                );
            });
            break;
        // deembed-js - '\n...\n'
        case ".sh":
            // rgx - convert '"'"' to '
            code = code.replace((
                /'"'"'/g
            ), "'");
            break;
        }
        // init
        opt = Object.assign(opt, {
            ".css": (
                /^\/\*csslint\b|(^\/\*\u0020jslint\u0020utility2:true\u0020\*\/$)/m
            ),
            ".html": (
                /^\/\*csslint\b|(^\/\*\u0020jslint\u0020utility2:true\u0020\*\/$)/m
            ),
            ".js": (
                /^\/\*jslint\b|(^\/\*\u0020jslint\u0020utility2:true\u0020\*\/$)/m
            ),
            ".md": (
                /(^\/\*\u0020jslint\u0020utility2:true\u0020\*\/$)/m
            ),
            ".sh": (
                /(^#\u0020jslint\u0020utility2:true$)/m
            ),
            code0: code,
            fileType: (
                /\.\w+?$|$/m
            ).exec(file)[0]
        });
        // jslint - .json
        if (
            code && (opt.fileType === ".js" || opt.fileType === ".json")
            && !opt.fileType0
        ) {
            try {
                tmp = JSON.parse(code);
                opt.fileType = ".json";
                if (opt.autofix) {
                    code = JSON.stringify(tmp, null, 4) + "\n";
                    opt.code0 = code;
                }
                opt.modeNext = Infinity;
                break;
            } catch (errCaught) {
                if (opt.fileType === ".json") {
                    opt.errList.push({
                        column: 0,
                        evidence: code.slice(0, 100),
                        line: 0,
                        message: errCaught.message
                    });
                    opt.modeNext = Infinity;
                    break;
                }
            }
        }
        try {
            opt.conditionalPassed = opt[opt.fileType].exec(code);
        } catch (ignore) {}
        opt.utility2 = (
            opt.conditionalPassed
            && opt.conditionalPassed[1]
        ) || opt.autofix;
        if (
            opt.conditional
            && (!opt.conditionalPassed || opt.coverage)
        ) {
            break;
        }
        opt.modeNext = 10;
        break;
    // jslint - autofix
    case 11:
        code = local.jslintAutofix(code, file, opt);
        local.jslintResult = opt;
        break;
    // jslint - csslint and jslint
    case 12:
        // restore lineOffset
        code = "\n".repeat(opt.lineOffset | 0) + code;
        switch (opt.fileType) {
        case ".css":
            // csslint
            Object.assign(opt, local.CSSLint.verify(code));
            // init errList
            opt.errList = opt.messages.map(function (err) {
                err.column = err.col;
                err.message = (
                    err.type + " - " + err.rule.id + " - " + err.message
                    + "\n    " + err.rule.desc
                );
                return err;
            });
            break;
        case ".html":
        case ".md":
        case ".sh":
            break;
        default:
            // jslint - .js
            Object.assign(opt, local.jslint_extra(code, opt));
            code = opt.source_autofix || code;
            // prioritize fatal err
            opt.warnings.forEach(function (err, ii) {
                if (err.early_stop) {
                    err.message = (
                        "[JSLint was unable to finish] - "
                        + err.message
                    );
                    opt.warnings.unshift(err);
                    opt.warnings.splice(ii, 1);
                }
            });
            // init errList
            opt.errList = opt.warnings.filter(function (err) {
                return err && err.message;
            }).map(function (err) {
                err.column = err.column + 1;
                err.evidence = err.source;
                err.line = err.line + 1;
                return err;
            });
        }
        break;
    // jslint - utility2
    case 13:
        local.jslintUtility2(code, file, opt);
        break;
    // jslint - print
    default:
        switch (Boolean(opt.fileType0) && opt.fileType0) {
        // reembed-js - '\\n\\\n...\\n\\\n'
        case ".\\n\\":
            code = code.trim();
            // rgx - escape \ to \\
            code = code.replace((
                /\\/g
            ), "\\\\");
            // rgx - append \n\
            code = code.replace((
                /$/gm
            ), "\\n\\");
            // rgx - escape ' to \'
            code = code.replace((
                /'/g
            ), "\\'");
            code += "\n";
            break;
        // reembed-js - '\n...\n'
        case ".sh":
            // rgx - escape ' to '"'"'
            code = code.trim().replace((
                /'/g
            ), "'\"'\"'") + "\n";
            break;
        case false:
            code = code.trimRight() + "\n";
            break;
        default:
            code = code.trim() + "\n";
        }
        // autofix-save
        if (
            !local.isBrowser
            && opt.autofix
            && !opt.fileType0
            && !opt.stop
            && code !== opt.code0
            && local.fs.existsSync(file)
        ) {
            local.fs.writeFileSync(file, code);
            local.fs.writeFileSync(file + ".autofix.old", opt.code0);
            local.child_process.spawnSync(
                "diff",
                [
                    "-u", file + ".autofix.old", file
                ],
                {
                    stdio: [
                        "ignore", 2, "ignore"
                    ]
                }
            );
            local.fs.unlinkSync(file + ".autofix.old");
            console.error(
                "\u001b[1mjslint-autofix - modified and saved file " + file
                + "\u001b[22m"
            );
        }
        // print colorized err.message to stderr
        // https://github.com/kaizhu256/JSLint/blob/cli/cli.js#L99
        opt.errList.filter(function (warning) {
            return warning && warning.message;
        // print only first 10 warnings
        }).slice(0, 10).forEach(function (err, ii) {
            opt.errorText = (
                opt.errorText
                || " \u001b[1mjslint " + file + "\u001b[22m\n"
            );
            opt.errorText += (
                ("  " + String(ii + 1)).slice(-3)
                + " \u001b[31m" + err.message + "\u001b[39m"
                + " \u001b[90m\/\/ line " + err.line + ", column "
                + err.column
                + "\u001b[39m\n"
                + ("    " + String(err.evidence).trim()).slice(0, 80) + "\n"
            );
            if (!ii && err.stack && err.a !== "debug\u0049nline") {
                tmp = err.stack;
                err.stack = null;
                opt.errorText += (
                    JSON.stringify(err, null, 4) + "\n" + tmp.trim() + "\n"
                );
            }
        });
        opt.errorText = opt.errorText.trim();
        if (opt.errorText) {
            // debug jslintResult
            local._debugJslintResult = local.jslintResult;
            // print err to stderr
            console.error(opt.errorText);
        }
        return code;
    }
    // recurse
    return local.jslintAndPrint(code, file, opt);
};

local.jslintAndPrintDir = function (dir, opt, onError) {
/*
 * this function will jslint files in shallow <dir>
 */
    var onParallel;
    onParallel = local.onParallel(onError);
    local.fs.readdirSync(dir).forEach(function (file) {
        var timeStart;
        file = process.cwd() + "/" + file;
        switch ((
            /\.\w+?$|$/m
        ).exec(file)[0]) {
        case ".css":
        case ".html":
        case ".js":
        case ".json":
        case ".md":
        case ".sh":
            if ((
                /\b(?:assets\.app\.js|lock|min|raw|rollup)\b/
            ).test(file)) {
                return;
            }
            onParallel.counter += 1;
            // jslint file
            local.fs.readFile(file, "utf8", function (err, data) {
                // validate no err occurred
                local.assertThrow(!err, err);
                timeStart = Date.now();
                local.jslintAndPrint(data, file, opt);
                console.error(
                    "jslint - " + (Date.now() - timeStart) + "ms " + file
                );
                onParallel();
            });
            break;
        }
    });
};

local.jslintAutofix = function (code, file, opt) {
/*
 * this function will jslint-autofix <code>
 */
    var code0;
    var code2;
    var dataList;
    var ignoreList;
    var ii;
    var rgx1;
    var rgx2;
    var tmp;
    // autofix-all
    if (opt.autofix) {
        // autofix-all - normalize local-function
        if (typeof(
            globalThis.utility2
            && globalThis.utility2.jslintAutofixLocalFunction
        ) === "function") {
            code = globalThis.utility2.jslintAutofixLocalFunction(code, file);
        }
        // autofix-all - remove trailing-whitespace
        code = code.replace((
            /\u0020+$/gm
        ), "");
        // autofix-all - remove leading-whitespace before )]}
        code = code.replace((
            /\n+?(\n\u0020*?[)\]}])/g
        ), "$1");
        // autofix-all - normalize newlines to \n\n
        code = code.replace((
            /([^\n])\n{3}([^\n])/g
        ), "$1\n\n$2");
        // autofix-all - normalize newlines to \n\n\n\n
        code = code.replace((
            /\n{5,}/g
        ), "\n\n\n\n");
        // autofix-all - recurse <script>...</script>, <style>...</style>
        code = code.replace((
            /(^\/\*\u0020jslint\u0020utility2:true\u0020\*\/\\n\\\n(?:^.*?\\n\\\n)*?)(^(?:\/\/\u0020)?<\/(?:script|style)>\\n\\\n)/gm
        ), function (ignore, match1, match2, ii) {
            return local.jslintAndPrint(
                match1,
                file + (
                    match2.indexOf("style") >= 0
                    ? ".<style>.css"
                    : ".<script>.js"
                ),
                Object.assign({}, opt, {
                    fileType0: ".\\n\\",
                    lineOffset: (
                        opt.lineOffset | 0
                    ) + code.slice(0, ii).replace((
                        /.+/g
                    ), "").length,
                    modeNext: 0
                })
            ) + match2;
        });
    }
    switch (opt.autofix && opt.fileType) {
    case ".css":
        break;
    case ".html":
        // autofix-html - recurse <script>...</script>, <style>...</style>
        code = code.replace((
            /(^\/\*\u0020jslint\u0020utility2:true\u0020\*\/\n(?:^.*?\n)*?)(^<\/(?:script|style)>\n)/gm
        ), function (ignore, match1, match2, ii) {
            return local.jslintAndPrint(
                match1,
                file + (
                    match2.indexOf("style") >= 0
                    ? ".<style>.css"
                    : ".<script>.js"
                ),
                local.objectAssignDefault({
                    fileType0: opt.fileType,
                    lineOffset: (
                        (opt.lineOffset | 0)
                        + code.slice(0, ii).replace((
                            /.+/g
                        ), "").length
                    ),
                    modeNext: 0
                }, opt)
            ) + match2;
        });
        break;
    case ".js":
        // autofix-js - demux code to [code, ignoreList]
        ignoreList = [];
        code = code.replace((
            /^\u0020*?\/\*\u0020jslint\u0020ignore:start\u0020\*\/$[\S\s]*?^\/\*\u0020jslint\u0020ignore:end\u0020\*\/$/gm
        ), function (match0) {
            ignoreList.push(match0);
            return "/* jslint ignore:start:end */";
        });
        // autofix-js - escape non-ascii
        code = code.replace((
            /[^\n\r\t\u0020-\u007e]/g
        ), function (match0) {
            return "\\u" + (
                "0000"
                + match0.charCodeAt(0).toString(16)
            ).slice(-4);
        });
        // autofix-js - demux code2 to [code2, ignoreList]
        code2 = "";
        dataList = [];
        ii = 0;
        rgx1 = (
            /\\.|\/\*|\*\/|\/\/!!|\/\/|["'\/`]|$/gm
        );
        // parse rgx
        // https://github.com/douglascrockford/JSLint/blob/557afd32bcaa35480d31a86f02d3a8c06a4e5b5c/jslint.js#L1383
        rgx2 = (
            /(?:[^.]\b(?:case|delete|in|instanceof|new|return|typeof|void|yield)|[!%&\u0028*+,\-:;<=>?\[\^{|}~])[\s\u0028]*?\/[^*\/]/g
        );
        tmp = "";
        // autofix-js - demux shebang
        code.replace((
            /^#!.*/
        ), function (match0) {
            code2 += "#!";
            dataList.push({
                code: match0,
                type: "#_"
            });
            rgx1.lastIndex = match0.length;
            ii = rgx1.lastIndex;
        });
        while (rgx1.lastIndex < code.length) {
            tmp = rgx1.exec(code);
            if (!tmp) {
                break;
            }
            tmp.input = null;
            switch (tmp[0]) {
            case "":
                rgx1.lastIndex += 1;
                break;
            case "\"":
            case "'":
            case "/*":
            case "//!!":
            case "//":
            case "`":
                // autofix-js - normalize rgx /_*/ to /_/
                rgx2.lastIndex = ii;
                if (rgx2.test(code) && rgx2.lastIndex - 2 <= tmp.index) {
                    rgx1.lastIndex = rgx2.lastIndex - 1;
                    tmp[0] = "/";
                }
                code2 += code.slice(ii, rgx1.lastIndex);
                ii = rgx1.lastIndex;
                while (rgx1.lastIndex < code.length) {
                    tmp[1] = rgx1.exec(code)[0];
                    switch (tmp[0] + "_" + tmp[1]) {
                    case "\"_\"":
                    case "'_'":
                    case "/*_*/":
                    case "//!!_":
                    case "//_":
                    case "/_*/":
                    case "/_/":
                    case "`_`":
                        code2 += "_" + tmp[1];
                        dataList.push({
                            code: tmp[0] + code.slice(ii, rgx1.lastIndex),
                            type: (tmp[0] + "_" + tmp[1]).replace("/_*/", "/_/")
                        });
                        ii = 0;
                        break;
                    case "/_":
                        code2 += code.slice(ii, rgx1.lastIndex);
                        ii = 0;
                        break;
                    }
                    if (!ii) {
                        break;
                    }
                    if (!tmp[1]) {
                        rgx1.lastIndex += 1;
                    }
                }
                ii = rgx1.lastIndex;
                break;
            }
        }
        code2 += code.slice(ii);
        code = code2;
        // autofix-js - normalize rgx /_*/ to /_/
        code = code.replace((
            /\/_\*\//g
        ), "/_/");
        opt.codeDemux = code;
        // autofix-js - left-align comment //_
        tmp = null;
        code = code.split("\n").reverse().map(function (line) {
            if ((
                /^\u0020+?\/\/_/
            ).test(line)) {
                return (
                    tmp
                    ? tmp[0].slice(0, -1) + line.trimLeft()
                    : line
                );
            }
            tmp = (
                /^\u0020*?\S/
            ).exec(line);
            return line;
        }).reverse().join("\n");
        // autofix-js - normalize prefix-operators to beginning-of-line
        // https://stackoverflow.com/questions/12122293/list-of-all-binary-operators-in-javascript
        code = code.replace((
            /(\S)\u0020+?(!=|!==|%|&|&&|-|:|<|<<|<=|==|===|>|>=|>>|>>>|\*|\+|\/|\?|\^|\||\|\|)((?:\s*?\/\*_\*\/|\s*?\/\/_)*)\s*?\n/g
        ), "$1$3\n$2");
        // autofix-js-braket - normalize rgx /_/ to (/_/)
        code = code.replace((
            /\/_\/[\w\s]*(\S)/g
        ), function (match0, match1) {
            return (
                match1 === ")"
                ? match0
                : match0.replace((
                    /\/_\/\w*/
                ), "($&)")
            );
        });
        // autofix-js-braket - normalize rgx (/_/) to (\n/_/\n)
        code = code.replace((
            /\((\/_\/\w*)\)/g
        ), "(\n$1\n)");
        // autofix-js-braket - normalize to jslint-open-form (\n...\n)
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Assignment
        code = code.replace((
            /\u0020(%=|&=|-=|<<=|=|>>=|>>>=|\*=|\*\*=|\+=|\/=|\^=|\|=)\n/g
        ), " $1  \n");
        code = code.replace((
            /\u0020(%=|&=|-=|<<=|=|>>=|>>>=|\*=|\*\*=|\+=|\/=|\^=|\|=|return)\u0020([^\n;]*?[^\n(;\[{]\n[\S\s]*?);/g
        ), function (match0, match1, match2) {
            if (!(
                /^\u0020\n|\u0020{4}(?:!=|!==|%|&|&&|-|:|<|<<|<=|==|===|>|>=|>>|>>>|\*|\+|\/|\?|\^|\||\|\|)\u0020/
            ).test(match2) || (
                /\bfunction\u0020\(/
            ).test(match2)) {
                return match0;
            }
            return " " + match1 + " (\n    " + match2.trim() + "\n);";
        });
        code = code.replace((
            /(\(\n)(\S)/g
        ), "$1    $2");
        // autofix-js-braket - remove leading-whitespace from ([{
        code = code.replace((
            /\n+\s*?([(\[{])\n/g
        ), "\u0000$1\n");
        code = code.replace((
            /\/\*_\*\/\u0000|\/\/_\u0000/g
        ), "$&\n");
        code = code.replace((
            /\u0000/g
        ), "");
        // autofix-js-braket - normalize {... to {\n   ...
        code = code.replace((
            /^(\u0020+)(.*?(?:\u0020\[|\(\[|\{))\u0020*?(\S)/gm
        ), "$1$2\n$1    $3");
        // autofix-js-braket - normalize {\s+} to {}
        code = code.replace((
            /([(\[{])\s+([)\]}])/g
        ), "$1$2");
        // autofix-js-whitespace - remove trailing-whitespace
        code = code.replace((
            /\u0020+$/gm
        ), "");
        // autofix-js-whitespace - normalize 8-space-indent to 4-space-indent
        tmp = "";
        code = code.replace((
            /^\u0020+/gm
        ), function (match0) {
            if (match0.length > tmp.length + 4) {
                match0 = tmp;
            }
            tmp = match0;
            return match0;
        });
        code = ("\n" + code + "\n");
        // autofix-js-whitespace - normalize comment //_... to //_\n...
        code = code.replace((
            /\/\/_([^\n])/g
        ), "//_\n$1");
        // autofix-js-whitespace - normalize (function { to \n\n\n\n(function {
        code = code.replace((
            /\n+((?:\/\*_\*\/\n|\/\/_\n)*?\(function\u0020.*?)\n+/g
        ), "\n\n\n\n$1\n");
        // autofix-js-whitespace - ...}()); to ...}());\n\n\n\n
        code = code.replace((
            /\n+(\}\(.*\)\);)\n+/g
        ), "\n$1\n\n\n\n");
        // autofix-js-whitespace - remove double-whitespace
        code = code.replace((
            /(\S\u0020)\u0020+/g
        ), "$1");
        code = code.trim();
        dataList.forEach(function (data) {
            switch (data.type) {
            case "'_'":
                // autofix-js - normalize single-quote to double-quote
                if (data.code[0] === "'") {
                    data.code = (
                        "\"" + data.code.slice(1, -1).replace((
                            /\\.|"/g
                        ), function (match0) {
                            return (
                                match0[1] === ""
                                ? "\\\""
                                : match0[1] === "'"
                                ? "'"
                                : match0
                            );
                        }) + "\""
                    );
                }
                break;
            case "/*_*/":
                // autofix-js - comment - "/*" to "/\*"
                data.code = "/*" + data.code.slice(2).replace((
                    /\/\*/g
                ), "/\\*");
                break;
            case "/_/":
                // autofix-js - rgx - " " -> "\\u0020"
                data.code = data.code.replace((
                    /\u0020/g
                ), "\\u0020");
                // autofix-js - rgx - "-]" -> "\-]"
                data.code = data.code.replace((
                    /\\.|-\]/g
                ), function (match0) {
                    return (
                        match0[0] === "-"
                        ? "\\" + match0
                        : match0
                    );
                });
                break;
            }
            // autofix-js - ascii
            data.code = data.code.replace((
                /\r/g
            ), "\\r").replace((
                /\t/g
            ), "\\t");
        });
        // autofix-js - remux shebang
        code = code.replace((
            /^#!/
        ), function () {
            return dataList.shift().code;
        });
        // autofix-js - remux [code, dataList] to code
        code = code.replace((
            /"_"|'_'|\/\*_\*\/|\/\/!!_|\/\/_|\/_\/|`_`/g
        ), function (match0) {
            // autofix-js - defer remux rgx /_/
            if (match0 === "/_/") {
                dataList.push(dataList.shift());
                return "/\u0000/";
            }
            return dataList.shift().code;
        });
        // autofix-js - jslint autofixed code
        ii = 0;
        while (true) {
            ii += 1;
            code0 = code;
            Object.assign(opt, local.jslint_extra(code, opt));
            code = opt.source_autofix;
            if (ii >= 10 || opt.stop || code0 === code) {
                break;
            }
        }
        // autofix-js - remux - code, dataList.</_/> -> code
        code = code.replace((
            /\/\u0000\//g
        ), function () {
            return dataList.shift().code;
        });
        // autofix-js - sort const, let, var
        code = code.replace((
            /(?:^\u0020*?(?:const|let|var)\u0020[\w$]*?;.*?\n)+/gm
        ), function (match0) {
            return match0.split("\n").slice(0, -1).sort().join("\n") + "\n";
        });
        // autofix-js - remux - code, ignoreList -> code
        code = code.replace((
            /^\u0020*?\/\*\u0020jslint\u0020ignore:start:end\u0020\*\/$/gm
        ), function () {
            return ignoreList.shift().trimLeft();
        });
        break;
    case ".md":
        // autofix-md - recurse ```javascript...```
        code = code.replace((
            /(```javascript\n)([\S\s]*?)\n```/g
        ), function (ignore, match1, match2, ii) {
            return match1 + local.jslintAndPrint(
                match2,
                file + ".<```javascript>.js",
                Object.assign({}, opt, {
                    fileType0: opt.fileType,
                    lineOffset: code.slice(0, ii).replace((
                        /.+/g
                    ), "").length + 1,
                    modeNext: 0
                })
            ) + "```";
        });
        break;
    case ".sh":
        // autofix-sh - recurse node -e '...'
        code = code.replace((
            /(\bUTILITY2_MACRO_JS='\n|\bnode\u0020-e\u0020(?:"\$UTILITY2_MACRO_JS")?'\n)([\S\s]*?)\n'/g
        ), function (ignore, match1, match2, ii) {
            return match1 + local.jslintAndPrint(
                match2,
                file + ".<node -e>.js",
                Object.assign({}, opt, {
                    fileType0: opt.fileType,
                    lineOffset: code.slice(0, ii).replace((
                        /.+/g
                    ), "").length + 1,
                    modeNext: 0
                })
            ) + "'";
        });
        break;
    }
    return code;
};

local.jslintGetColumnLine = function (code, ii) {
/*
 * this function will transform <code> and <ii> -> {column, line, evidence}
 */
    var column;
    var evidence;
    var line;
    evidence = code.slice(0, ii).split("\n");
    line = evidence.length - 1;
    column = evidence[line].length;
    evidence = evidence[line] + code.slice(ii, ii + 100).split("\n")[0];
    return {
        column,
        evidence,
        line
    };
};

local.jslintResult = {};

local.jslintUtility2 = function (code, ignore, opt) {
/*
 * this function will jslint <code> with utiity2-specific rules
 */
    var code2;
    var err;
    var indent;
    var previous;
    // jslintUtility2 - all
    if (opt.utility2) {
        code2 = code;
        code2 = code2.replace((
            /^\/\*\u0020jslint\u0020ignore:start\u0020\*\/$[\S\s]+?^\/\*\u0020jslint\u0020ignore:end\u0020\*\/$/gm
        ), function (match0) {
            // preserve lineno
            return match0.replace((
                /.+/g
            ), "");
        });
        code2.replace((
            /^\u0020+?(?:\*|\/\/!!)|^\u0020+|[\r\t]/gm
        ), function (match0, ii) {
            switch (match0.slice(-1)) {
            case " ":
                if (match0.length % 4 === 0) {
                    return;
                }
                err = {
                    message: "non 4-space indent"
                };
                break;
            case "\r":
                err = {
                    message: "unexpected \\r"
                };
                break;
            case "\t":
                err = {
                    message: "unexpected \\t"
                };
                break;
            default:
                return;
            }
            Object.assign(err, local.jslintGetColumnLine(code2, ii));
            opt.errList.push({
                column: err.column + 1,
                evidence: JSON.stringify(err.evidence),
                line: err.line + 1,
                message: err.message
            });
        });
    }
    switch (opt.utility2 && opt.fileType) {
    // jslintUtility2 - .css
    case ".css":
        // ignore comment
        code2 = code2.replace((
            /^\u0020*?\/\*[\S\s]*?\*\/\u0020*?$/gm
        ), function (match0) {
            // preserve lineno
            return match0.replace((
                /.+/g
            ), "");
        });
        code2.replace((
            /\S\u0020{2}|\u0020,|^\S.*?[,;{}]./gm
        ), function (match0, ii) {
            switch (match0.slice(-2)) {
            case "  ":
                err = {
                    colOffset: 2,
                    message: "unexpected multi-whitespace"
                };
                break;
            case " ,":
                err = {
                    colOffset: 1,
                    message: "unexpected whitespace before comma"
                };
                break;
            default:
                err = {
                    colOffset: match0.length,
                    message: "unexpected multiline-statement"
                };
            }
            Object.assign(err, local.jslintGetColumnLine(code2, ii));
            opt.errList.push({
                column: err.column + err.colOffset,
                evidence: JSON.stringify(err.evidence),
                line: err.line + 1,
                message: err.message
            });
        });
        // validate line-sorted - css-selector
        previous = "";
        code2 = code2.replace((
            /^.|[#.>]|[,}]$|\u0020\{$|\b\w/gm
        ), function (match0) {
            switch (match0) {
            case " ":
                return match0;
            case " {":
                return "\u0001" + match0;
            case "#":
                return "\u0002" + match0;
            case ",":
                return "\u0000" + match0;
            case ".":
                return "\u0001" + match0;
            case ">":
                return "\u0003" + match0;
            case "}":
                return "";
            default:
                return "\u0000" + match0;
            }
        });
        code2.replace((
            /\n\n|\u0000@|^(?:\S.*?\n)+/gm
        ), function (match0, ii) {
            err = null;
            switch (match0[1]) {
            case "\n":
            case "@":
                previous = "";
                break;
            default:
                match0 = match0.trim();
                if (!(previous < match0)) {
                    err = {
                        message: (
                            "lines not sorted\n" + previous + "\n" + match0
                        )
                    };
                } else if (
                    match0.split("\n").sort().join("\n") !== match0
                ) {
                    err = {
                        message: "lines not sorted\n" + match0
                    };
                }
                previous = match0;
            }
            if (err) {
                Object.assign(err, local.jslintGetColumnLine(code2, ii));
                opt.errList.push({
                    column: err.column + 1,
                    evidence: err.evidence,
                    line: err.line + 1,
                    message: err.message.replace((
                        /[\u0000-\u0007]/g
                    ), "")
                });
            }
        });
        break;
    // jslintUtility2 - .html
    case ".html":
        break;
    // jslintUtility2 - .js
    case ".js":
        // validate line-sorted - "local.xxx = "
        previous = "";
        code2.replace((
            /^\/\*\u0020validateLineSortedReset\u0020\*\/$|^\(function\u0020\(|(^local\.\S*?\u0020=\u0020.*?$)/gm
        ), function (ignore, match1, ii) {
            if (!match1) {
                previous = "";
                return;
            }
            if (match1.slice(-3) === "\\n\\") {
                return;
            }
            if (!(previous < match1)) {
                err = {
                    message: "lines not sorted\n" + previous + "\n" + match1
                };
                Object.assign(err, local.jslintGetColumnLine(code2, ii));
                opt.errList.push({
                    column: err.column + 1,
                    evidence: err.evidence,
                    line: err.line + 1,
                    message: err.message
                });
            }
            previous = match1;
        });
        // validate line-sorted - switch-statement
        previous = "";
        code2.replace((
            /^(\u0020+?)(\/\*\u0020validateLineSortedReset\u0020\*\/|switch\u0020.+?\u0020\{|\}|case\u0020.+?:(?:\n\u0020+?case\u0020.+?:)*|default:)$/gm
        ), function (ignore, match1, match2, ii) {
            err = null;
            switch (match2.slice(-1)) {
            case "/":
                if (match1 === indent) {
                    previous = "";
                }
                break;
            case "{":
                indent = indent || match1;
                break;
            case "}":
                if (match1 === indent) {
                    indent = "";
                    previous = "";
                }
                break;
            default:
                if (match1 !== indent) {
                    break;
                }
                match2 = match2.replace((
                    /\d+?\b/g
                ), function (match0) {
                    return ("0000" + match0).slice(-4);
                });
                if (!(previous < match2)) {
                    err = {
                        message: (
                            "lines not sorted\n" + previous + "\n" + match2
                        )
                    };
                }
                previous = match2;
            }
            if (err) {
                Object.assign(err, local.jslintGetColumnLine(code2, ii));
                opt.errList.push({
                    column: err.column + 1,
                    evidence: err.evidence,
                    line: err.line + 1,
                    message: err.message
                });
            }
        });
        break;
    // jslintUtility2 - .md
    case ".md":
        break;
    // jslintUtility2 - .sh
    case ".sh":
        previous = "";
        code2.replace((
            /(^sh\w+?\u0020\(\)\u0020\{)|^sh\w+?\u0020*?\(\)\u0020*?\{/gm
        ), function (ignore, match1, ii) {
            err = null;
            if (!match1) {
                err = {
                    message: "invalid whitespace"
                };
            } else {
                if (!(previous < match1)) {
                    err = {
                        message: (
                            "lines not sorted\n" + previous + "\n" + match1
                        )
                    };
                }
                previous = match1;
            }
            if (err) {
                Object.assign(err, local.jslintGetColumnLine(code2, ii));
                opt.errList.push({
                    column: err.column + 1,
                    evidence: err.evidence,
                    line: err.line + 1,
                    message: err.message
                });
            }
        });
        // validate line-sorted - case-esac-statement
        previous = "";
        code2.replace((
            /^(\u0020+?)(case\u0020.+?\u0020in|esac|[^\u0020()]+?\))$/gm
        ), function (ignore, match1, match2, ii) {
            err = null;
            match2 = match2.replace("*", "~*");
            switch (match2.slice(0, 5)) {
            case "case ":
                indent = indent || match1;
                break;
            case "esac":
                if (match1 === indent) {
                    indent = "";
                    previous = "";
                }
                break;
            default:
                if (match1 !== indent) {
                    break;
                }
                if (!(previous < match2)) {
                    err = {
                        message: (
                            "lines not sorted\n" + previous + "\n" + match2
                        )
                    };
                }
                previous = match2;
            }
            if (err) {
                Object.assign(err, local.jslintGetColumnLine(code2, ii));
                opt.errList.push({
                    column: err.column + 1,
                    evidence: err.evidence,
                    line: err.line + 1,
                    message: err.message
                });
            }
        });
        break;
    }
};
}());



/* istanbul ignore next */
// run node js-env code - init-after
(function () {
if (local.isBrowser) {
    return;
}

local.cliDict = {};

local.cliDict._default = function () {
/*
 * <file1> <file2> ...
 * will jslint <file1> <file2> ... and print errors to stderr
 */
    // jslint files
    process.argv.slice(2).forEach(function (file) {
        if (file[0] === "-") {
            return;
        }
        local.jslintAndPrint(
            local.fs.readFileSync(local.path.resolve(file), "utf8"),
            file,
            {
                autofix: process.argv.indexOf("--autofix") >= 0,
                conditional: process.argv.indexOf("--conditional") >= 0
            }
        );
    });
    // if err occurred, then exit with non-zero code
    process.exit(Boolean(local.jslintResult.errList.length));
};

local.cliDict.dir = function () {
/*
 * <dir>
 * will jslint files in shallow <dir>
 */
    local.jslintAndPrintDir(process.argv[3], {
        autofix: process.argv.indexOf("--autofix") >= 0,
        conditional: process.argv.indexOf("--conditional") >= 0
    }, process.exit);
};

// run the cli
if (module === require.main && !globalThis.utility2_rollup) {
    local.cliRun();
}
}());



}());
