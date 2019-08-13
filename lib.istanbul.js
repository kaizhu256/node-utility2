#!/usr/bin/env node
/*
 * lib.istanbul.js (2019.8.12)
 * https://github.com/kaizhu256/node-istanbul-lite
 * this zero-dependency package will provide a browser-compatible version of the istanbul (v0.4.5) coverage-tool, with a working web-demo
 *
 */



/* istanbul instrument in package istanbul */
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
    globalThis.utility2_istanbul = local;
} else {
    module.exports = local;
    module.exports.__dirname = __dirname;
}
// init lib main
local.istanbul = local;



/* validateLineSortedReset */
// init custom
if (!local.isBrowser) {
    local._istanbul_module = require("module");
    local.process = process;
    local.require = require;
}

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

local.fsWriteFileWithMkdirpSync = function (file, data, mode) {
/*
 * this function will synchronously "mkdir -p" and write <data> to <file>
 */
    try {
        if (
            mode === "noWrite"
            || typeof require("fs").writeFileSync !== "function"
        ) {
            return;
        }
    } catch (ignore) {
        return;
    }
    // try to write to file
    try {
        require("fs").writeFileSync(file, data);
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
        // re-write to file
        require("fs").writeFileSync(file, data);
    }
};
}());



// run shared js-env code - function
(function () {
var __dirname;
var process;
var require;
// jslint-hack
local.nop(__dirname, require);
/* istanbul ignore next */
globalThis.__coverageCodeDict__ = globalThis.__coverageCodeDict__ || {};
// mock builtins
__dirname = "";
process = local.process || {
    cwd: function () {
        return "";
    },
    env: {},
    stdout: {}
};
require = function (key) {
    try {
        return local["_istanbul_" + key] || local[key] || local.require(key);
    } catch (ignore) {}
};
local["./package.json"] = {};
// mock module fs
local._istanbul_fs = {};
local._istanbul_fs.readFileSync = function (file) {
    // return head.txt or foot.txt
    file = local[file.slice(-8)];
    if (local.isBrowser) {
        file = file
        .replace("<!doctype html>\n", "")
        .replace((
            /(<\/?)(?:body|html)/g
        ), "$1div");
    }
    if (!local.isBrowser && process.env.npm_package_homepage) {
        file = file.replace(
            "{{env.npm_package_homepage}}",
            process.env.npm_package_homepage
        ).replace(
            "{{env.npm_package_name}}",
            process.env.npm_package_name
        ).replace(
            "{{env.npm_package_version}}",
            process.env.npm_package_version
        );
    } else {
        file = file.replace((
            /<h1\u0020[\S\s]*<\/h1>/
        ), "");
    }
    return file;
};

local._istanbul_fs.readdirSync = function () {
    return [];
};

// mock module path
local._istanbul_path = local.path || {
    dirname: function (file) {
        return file.replace((
            /\/[\w\-.]+?$/
        ), "");
    },
    resolve: function (aa, bb, cc, dd) {
        return dd || cc || bb || aa;
    }
};

local.coverageMerge = function (coverage1, coverage2) {
/*
 * this function will inplace-merge coverage2 into coverage1
 */
    var dict1;
    var dict2;
    coverage1 = coverage1 || {};
    coverage2 = coverage2 || {};
    Object.keys(coverage2).forEach(function (file) {
        if (!coverage2[file]) {
            return;
        }
        // if file is undefined in coverage1, then add it
        if (!coverage1[file]) {
            coverage1[file] = coverage2[file];
            return;
        }
        // merge file from coverage2 into coverage1
        [
            "b", "f", "s"
        ].forEach(function (key) {
            dict1 = coverage1[file][key];
            dict2 = coverage2[file][key];
            switch (key) {
            // increment coverage for branch lines
            case "b":
                Object.keys(dict2).forEach(function (key) {
                    dict2[key].forEach(function (count, ii) {
                        dict1[key][ii] += count;
                    });
                });
                break;
            // increment coverage for function and statement lines
            case "f":
            case "s":
                Object.keys(dict2).forEach(function (key) {
                    dict1[key] += dict2[key];
                });
                break;
            }
        });
    });
    return coverage1;
};

local.coverageReportCreate = function () {
/*
 * this function will
 * 1. print coverage in text-format to stdout
 * 2. write coverage in html-format to filesystem
 * 3. return coverage in html-format as single document
 */
    var opt;
    /* istanbul ignore next */
    if (!globalThis.__coverage__) {
        return "";
    }
    opt = {};
    opt.dir = process.cwd() + "/tmp/build/coverage.html";
    // merge previous coverage
    if (!local.isBrowser && process.env.npm_config_mode_coverage_merge) {
        console.log("merging file " + opt.dir + "/coverage.json to coverage");
        try {
            local.coverageMerge(globalThis.__coverage__, JSON.parse(
                local.fs.readFileSync(opt.dir + "/coverage.json", "utf8")
            ));
        } catch (ignore) {}
        try {
            opt.coverageCodeDict = JSON.parse(local.fs.readFileSync(
                opt.dir + "/coverage.code-dict.json",
                "utf8"
            ));
            Object.keys(opt.coverageCodeDict).forEach(function (key) {
                globalThis.__coverageCodeDict__[key] = (
                    globalThis.__coverageCodeDict__[key]
                    || opt.coverageCodeDict[key]
                );
            });
        } catch (ignore) {}
    }
    // init writer
    local.coverageReportHtml = "";
    local.coverageReportHtml += (
        "<div class=\"coverageReportDiv\">\n"
        + "<h1>coverage-report</h1>\n"
        + "<div style=\""
        + "background: #fff; border: 1px solid #000; margin 0; padding: 0;"
        + "\">\n"
    );
    local.writerData = "";
    opt.sourceStore = {};
    opt.writer = local.writer;
    // 1. print coverage in text-format to stdout
    new local.TextReport(opt).writeReport(local.collector);
    // 2. write coverage in html-format to filesystem
    new local.HtmlReport(opt).writeReport(local.collector);
    local.writer.writeFile("", local.nop);
    if (!local.isBrowser) {
        // write coverage.json
        local.fsWriteFileWithMkdirpSync(
            opt.dir + "/coverage.json",
            JSON.stringify(globalThis.__coverage__)
        );
        // write coverage.code-dict.json
        local.fsWriteFileWithMkdirpSync(
            opt.dir + "/coverage.code-dict.json",
            JSON.stringify(globalThis.__coverageCodeDict__)
        );
        // write coverage.badge.svg
        opt.pct = local.coverageReportSummary.root.metrics.lines.pct;
        local.fsWriteFileWithMkdirpSync(
            local._istanbul_path.dirname(opt.dir) + "/coverage.badge.svg",
            local.templateCoverageBadgeSvg
            // edit coverage badge percent
            .replace((
                /100.0/g
            ), opt.pct)
            // edit coverage badge color
            .replace((
                /0d0/g
            ), ((
                "0" + Math.round((100 - opt.pct) * 2.21).toString(16)
            ).slice(-2) + (
                "0" + Math.round(opt.pct * 2.21).toString(16)
            ).slice(-2) + "00"))
        );
    }
    console.log("created coverage file " + opt.dir + "/index.html");
    // 3. return coverage in html-format as a single document
    local.coverageReportHtml += "</div>\n</div>\n";
    // write coverage.rollup.html
    if (!local.isBrowser) {
        local.fsWriteFileWithMkdirpSync(
            opt.dir + "/coverage.rollup.html",
            local.coverageReportHtml
        );
    }
    return local.coverageReportHtml;
};

/* istanbul ignore next */
local.instrumentInPackage = function (code, file) {
/*
 * this function will instrument the code
 * only if the macro /\* istanbul instrument in package $npm_package_nameLib *\/
 * exists in the code
 */
    return (
        // ternary-operator
        (
            process.env.npm_config_mode_coverage
            && code.indexOf("/* istanbul ignore all */\n") < 0 && (
                process.env.npm_config_mode_coverage === "all"
                || code.indexOf(
                    "/* istanbul instrument in package "
                    + process.env.npm_package_nameLib + " */\n"
                ) >= 0
                || code.indexOf(
                    "/* istanbul instrument in package "
                    + process.env.npm_config_mode_coverage + " */\n"
                ) >= 0
            )
        )
        ? local.instrumentSync(code, file)
        : code
    );
};

local.instrumentSync = function (code, file) {
/*
 * this function will
 * 1. normalize the file
 * 2. save code to __coverageCodeDict__[file] for future html-report
 * 3. return instrumented code
 */
    // 1. normalize the file
    file = local._istanbul_path.resolve("/", file);
    // 2. save code to __coverageCodeDict__[file] for future html-report
    globalThis.__coverageCodeDict__[file] = code;
    // 3. return instrumented code
    return new local.Instrumenter({
        embedSource: true,
        esModules: true,
        noAutoWrap: true
    }).instrumentSync(code, file).trimLeft();
};

local.util = {
inherits: local.nop
};



/*
file https://github.com/jquery/esprima/blob/2.7.3/esprima.js
*/
/* istanbul ignore next */
/* jslint ignore:start */
(function () { var define, exports, module; exports = local;
(function webpackUniversalModuleDefinition(root, factory) {
/* istanbul ignore next */
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define([], factory);
/* istanbul ignore next */
    else if(typeof exports === 'object')
        exports["esprima"] = factory();
    else
        root["esprima"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/     // The module cache
/******/     var installedModules = {};

/******/     // The require function
/******/     function __webpack_require__(moduleId) {

/******/         // Check if module is in cache
/* istanbul ignore if */
/******/         if(installedModules[moduleId])
/******/             return installedModules[moduleId].exports;

/******/         // Create a new module (and put it into the cache)
/******/         var module = installedModules[moduleId] = {
/******/             exports: {},
/******/             id: moduleId,
/******/             loaded: false
/******/         };

/******/         // Execute the module function
/******/         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/         // Flag the module as loaded
/******/         module.loaded = true;

/******/         // Return the exports of the module
/******/         return module.exports;
/******/     }

/******/     // expose the modules object (__webpack_modules__)
/******/     __webpack_require__.m = modules;

/******/     // expose the module cache
/******/     __webpack_require__.c = installedModules;

/******/     // __webpack_public_path__
/******/     __webpack_require__.p = "";

/******/     // Load entry module and return exports
/******/     return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

    "use strict";
    /*
      Copyright JS Foundation and other contributors, https://js.foundation/

      Redistribution and use in source and binary forms, with or without
      modification, are permitted provided that the following conditions are met:

        * Redistributions of source code must retain the above copyright
          notice, this list of conditions and the following disclaimer.
        * Redistributions in binary form must reproduce the above copyright
          notice, this list of conditions and the following disclaimer in the
          documentation and/or other materials provided with the distribution.

      THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
      AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
      IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
      ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
      DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
      (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
      LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
      ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
      (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
      THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    */
    Object.defineProperty(exports, "__esModule", { value: true });
    var comment_handler_1 = __webpack_require__(1);
    var jsx_parser_1 = __webpack_require__(3);
    var parser_1 = __webpack_require__(8);
    var tokenizer_1 = __webpack_require__(15);
    function parse(code, options, delegate) {
        var commentHandler = null;
        var proxyDelegate = function (node, metadata) {
            if (delegate) {
                delegate(node, metadata);
            }
            if (commentHandler) {
                commentHandler.visit(node, metadata);
            }
        };
        var parserDelegate = (typeof delegate === 'function') ? proxyDelegate : null;
        var collectComment = false;
        if (options) {
            collectComment = (typeof options.comment === 'boolean' && options.comment);
            var attachComment = (typeof options.attachComment === 'boolean' && options.attachComment);
            if (collectComment || attachComment) {
                commentHandler = new comment_handler_1.CommentHandler();
                commentHandler.attach = attachComment;
                options.comment = true;
                parserDelegate = proxyDelegate;
            }
        }
        var isModule = false;
        if (options && typeof options.sourceType === 'string') {
            isModule = (options.sourceType === 'module');
        }
        var parser;
        if (options && typeof options.jsx === 'boolean' && options.jsx) {
            parser = new jsx_parser_1.JSXParser(code, options, parserDelegate);
        }
        else {
            parser = new parser_1.Parser(code, options, parserDelegate);
        }
        var program = isModule ? parser.parseModule() : parser.parseScript();
        var ast = program;
        if (collectComment && commentHandler) {
            ast.comments = commentHandler.comments;
        }
        if (parser.config.tokens) {
            ast.tokens = parser.tokens;
        }
        if (parser.config.tolerant) {
            ast.errors = parser.errorHandler.errors;
        }
        return ast;
    }
    exports.parse = parse;
    function parseModule(code, options, delegate) {
        var parsingOptions = options || {};
        parsingOptions.sourceType = 'module';
        return parse(code, parsingOptions, delegate);
    }
    exports.parseModule = parseModule;
    function parseScript(code, options, delegate) {
        var parsingOptions = options || {};
        parsingOptions.sourceType = 'script';
        return parse(code, parsingOptions, delegate);
    }
    exports.parseScript = parseScript;
    function tokenize(code, options, delegate) {
        var tokenizer = new tokenizer_1.Tokenizer(code, options);
        var tokens;
        tokens = [];
        try {
            while (true) {
                var token = tokenizer.getNextToken();
                if (!token) {
                    break;
                }
                if (delegate) {
                    token = delegate(token);
                }
                tokens.push(token);
            }
        }
        catch (e) {
            tokenizer.errorHandler.tolerate(e);
        }
        if (tokenizer.errorHandler.tolerant) {
            tokens.errors = tokenizer.errors();
        }
        return tokens;
    }
    exports.tokenize = tokenize;
    var syntax_1 = __webpack_require__(2);
    exports.Syntax = syntax_1.Syntax;
    // Sync with *.json manifests.
    exports.version = '4.0.1';

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var syntax_1 = __webpack_require__(2);
    var CommentHandler = (function () {
        function CommentHandler() {
            this.attach = false;
            this.comments = [];
            this.stack = [];
            this.leading = [];
            this.trailing = [];
        }
        CommentHandler.prototype.insertInnerComments = function (node, metadata) {
            //  innnerComments for properties empty block
            //  `function a() {/** comments **\/}`
            if (node.type === syntax_1.Syntax.BlockStatement && node.body.length === 0) {
                var innerComments = [];
                for (var i = this.leading.length - 1; i >= 0; --i) {
                    var entry = this.leading[i];
                    if (metadata.end.offset >= entry.start) {
                        innerComments.unshift(entry.comment);
                        this.leading.splice(i, 1);
                        this.trailing.splice(i, 1);
                    }
                }
                if (innerComments.length) {
                    node.innerComments = innerComments;
                }
            }
        };
        CommentHandler.prototype.findTrailingComments = function (metadata) {
            var trailingComments = [];
            if (this.trailing.length > 0) {
                for (var i = this.trailing.length - 1; i >= 0; --i) {
                    var entry_1 = this.trailing[i];
                    if (entry_1.start >= metadata.end.offset) {
                        trailingComments.unshift(entry_1.comment);
                    }
                }
                this.trailing.length = 0;
                return trailingComments;
            }
            var entry = this.stack[this.stack.length - 1];
            if (entry && entry.node.trailingComments) {
                var firstComment = entry.node.trailingComments[0];
                if (firstComment && firstComment.range[0] >= metadata.end.offset) {
                    trailingComments = entry.node.trailingComments;
                    delete entry.node.trailingComments;
                }
            }
            return trailingComments;
        };
        CommentHandler.prototype.findLeadingComments = function (metadata) {
            var leadingComments = [];
            var target;
            while (this.stack.length > 0) {
                var entry = this.stack[this.stack.length - 1];
                if (entry && entry.start >= metadata.start.offset) {
                    target = entry.node;
                    this.stack.pop();
                }
                else {
                    break;
                }
            }
            if (target) {
                var count = target.leadingComments ? target.leadingComments.length : 0;
                for (var i = count - 1; i >= 0; --i) {
                    var comment = target.leadingComments[i];
                    if (comment.range[1] <= metadata.start.offset) {
                        leadingComments.unshift(comment);
                        target.leadingComments.splice(i, 1);
                    }
                }
                if (target.leadingComments && target.leadingComments.length === 0) {
                    delete target.leadingComments;
                }
                return leadingComments;
            }
            for (var i = this.leading.length - 1; i >= 0; --i) {
                var entry = this.leading[i];
                if (entry.start <= metadata.start.offset) {
                    leadingComments.unshift(entry.comment);
                    this.leading.splice(i, 1);
                }
            }
            return leadingComments;
        };
        CommentHandler.prototype.visitNode = function (node, metadata) {
            if (node.type === syntax_1.Syntax.Program && node.body.length > 0) {
                return;
            }
            this.insertInnerComments(node, metadata);
            var trailingComments = this.findTrailingComments(metadata);
            var leadingComments = this.findLeadingComments(metadata);
            if (leadingComments.length > 0) {
                node.leadingComments = leadingComments;
            }
            if (trailingComments.length > 0) {
                node.trailingComments = trailingComments;
            }
            this.stack.push({
                node: node,
                start: metadata.start.offset
            });
        };
        CommentHandler.prototype.visitComment = function (node, metadata) {
            var type = (node.type[0] === 'L') ? 'Line' : 'Block';
            var comment = {
                type: type,
                value: node.value
            };
            if (node.range) {
                comment.range = node.range;
            }
            if (node.loc) {
                comment.loc = node.loc;
            }
            this.comments.push(comment);
            if (this.attach) {
                var entry = {
                    comment: {
                        type: type,
                        value: node.value,
                        range: [metadata.start.offset, metadata.end.offset]
                    },
                    start: metadata.start.offset
                };
                if (node.loc) {
                    entry.comment.loc = node.loc;
                }
                node.type = type;
                this.leading.push(entry);
                this.trailing.push(entry);
            }
        };
        CommentHandler.prototype.visit = function (node, metadata) {
            if (node.type === 'LineComment') {
                this.visitComment(node, metadata);
            }
            else if (node.type === 'BlockComment') {
                this.visitComment(node, metadata);
            }
            else if (this.attach) {
                this.visitNode(node, metadata);
            }
        };
        return CommentHandler;
    }());
    exports.CommentHandler = CommentHandler;

/***/ },
/* 2 */
/***/ function(module, exports) {

    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        AssignmentPattern: 'AssignmentPattern',
        ArrayExpression: 'ArrayExpression',
        ArrayPattern: 'ArrayPattern',
        ArrowFunctionExpression: 'ArrowFunctionExpression',
        AwaitExpression: 'AwaitExpression',
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ClassBody: 'ClassBody',
        ClassDeclaration: 'ClassDeclaration',
        ClassExpression: 'ClassExpression',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DoWhileStatement: 'DoWhileStatement',
        DebuggerStatement: 'DebuggerStatement',
        EmptyStatement: 'EmptyStatement',
        ExportAllDeclaration: 'ExportAllDeclaration',
        ExportDefaultDeclaration: 'ExportDefaultDeclaration',
        ExportNamedDeclaration: 'ExportNamedDeclaration',
        ExportSpecifier: 'ExportSpecifier',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForOfStatement: 'ForOfStatement',
        ForInStatement: 'ForInStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        ImportDeclaration: 'ImportDeclaration',
        ImportDefaultSpecifier: 'ImportDefaultSpecifier',
        ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
        ImportSpecifier: 'ImportSpecifier',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        MetaProperty: 'MetaProperty',
        MethodDefinition: 'MethodDefinition',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        ObjectPattern: 'ObjectPattern',
        Program: 'Program',
        Property: 'Property',
        RestElement: 'RestElement',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SpreadElement: 'SpreadElement',
        Super: 'Super',
        SwitchCase: 'SwitchCase',
        SwitchStatement: 'SwitchStatement',
        TaggedTemplateExpression: 'TaggedTemplateExpression',
        TemplateElement: 'TemplateElement',
        TemplateLiteral: 'TemplateLiteral',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement',
        YieldExpression: 'YieldExpression'
    };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

    "use strict";
/* istanbul ignore next */
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    var character_1 = __webpack_require__(4);
    var JSXNode = __webpack_require__(5);
    var jsx_syntax_1 = __webpack_require__(6);
    var Node = __webpack_require__(7);
    var parser_1 = __webpack_require__(8);
    var token_1 = __webpack_require__(13);
    var xhtml_entities_1 = __webpack_require__(14);
    token_1.TokenName[100 /* Identifier */] = 'JSXIdentifier';
    token_1.TokenName[101 /* Text */] = 'JSXText';
    // Fully qualified element name, e.g. <svg:path> returns "svg:path"
    function getQualifiedElementName(elementName) {
        var qualifiedName;
        switch (elementName.type) {
            case jsx_syntax_1.JSXSyntax.JSXIdentifier:
                var id = elementName;
                qualifiedName = id.name;
                break;
            case jsx_syntax_1.JSXSyntax.JSXNamespacedName:
                var ns = elementName;
                qualifiedName = getQualifiedElementName(ns.namespace) + ':' +
                    getQualifiedElementName(ns.name);
                break;
            case jsx_syntax_1.JSXSyntax.JSXMemberExpression:
                var expr = elementName;
                qualifiedName = getQualifiedElementName(expr.object) + '.' +
                    getQualifiedElementName(expr.property);
                break;
            /* istanbul ignore next */
            default:
                break;
        }
        return qualifiedName;
    }
    var JSXParser = (function (_super) {
        __extends(JSXParser, _super);
        function JSXParser(code, options, delegate) {
            return _super.call(this, code, options, delegate) || this;
        }
        JSXParser.prototype.parsePrimaryExpression = function () {
            return this.match('<') ? this.parseJSXRoot() : _super.prototype.parsePrimaryExpression.call(this);
        };
        JSXParser.prototype.startJSX = function () {
            // Unwind the scanner before the lookahead token.
            this.scanner.index = this.startMarker.index;
            this.scanner.lineNumber = this.startMarker.line;
            this.scanner.lineStart = this.startMarker.index - this.startMarker.column;
        };
        JSXParser.prototype.finishJSX = function () {
            // Prime the next lookahead.
            this.nextToken();
        };
        JSXParser.prototype.reenterJSX = function () {
            this.startJSX();
            this.expectJSX('}');
            // Pop the closing '}' added from the lookahead.
            if (this.config.tokens) {
                this.tokens.pop();
            }
        };
        JSXParser.prototype.createJSXNode = function () {
            this.collectComments();
            return {
                index: this.scanner.index,
                line: this.scanner.lineNumber,
                column: this.scanner.index - this.scanner.lineStart
            };
        };
        JSXParser.prototype.createJSXChildNode = function () {
            return {
                index: this.scanner.index,
                line: this.scanner.lineNumber,
                column: this.scanner.index - this.scanner.lineStart
            };
        };
        JSXParser.prototype.scanXHTMLEntity = function (quote) {
            var result = '&';
            var valid = true;
            var terminated = false;
            var numeric = false;
            var hex = false;
            while (!this.scanner.eof() && valid && !terminated) {
                var ch = this.scanner.source[this.scanner.index];
                if (ch === quote) {
                    break;
                }
                terminated = (ch === ';');
                result += ch;
                ++this.scanner.index;
                if (!terminated) {
                    switch (result.length) {
                        case 2:
                            // e.g. '&#123;'
                            numeric = (ch === '#');
                            break;
                        case 3:
                            if (numeric) {
                                // e.g. '&#x41;'
                                hex = (ch === 'x');
                                valid = hex || character_1.Character.isDecimalDigit(ch.charCodeAt(0));
                                numeric = numeric && !hex;
                            }
                            break;
                        default:
                            valid = valid && !(numeric && !character_1.Character.isDecimalDigit(ch.charCodeAt(0)));
                            valid = valid && !(hex && !character_1.Character.isHexDigit(ch.charCodeAt(0)));
                            break;
                    }
                }
            }
            if (valid && terminated && result.length > 2) {
                // e.g. '&#x41;' becomes just '#x41'
                var str = result.substr(1, result.length - 2);
                if (numeric && str.length > 1) {
                    result = String.fromCharCode(parseInt(str.substr(1), 10));
                }
                else if (hex && str.length > 2) {
                    result = String.fromCharCode(parseInt('0' + str.substr(1), 16));
                }
                else if (!numeric && !hex && xhtml_entities_1.XHTMLEntities[str]) {
                    result = xhtml_entities_1.XHTMLEntities[str];
                }
            }
            return result;
        };
        // Scan the next JSX token. This replaces Scanner#lex when in JSX mode.
        JSXParser.prototype.lexJSX = function () {
            var cp = this.scanner.source.charCodeAt(this.scanner.index);
            // < > / : = { }
            if (cp === 60 || cp === 62 || cp === 47 || cp === 58 || cp === 61 || cp === 123 || cp === 125) {
                var value = this.scanner.source[this.scanner.index++];
                return {
                    type: 7 /* Punctuator */,
                    value: value,
                    lineNumber: this.scanner.lineNumber,
                    lineStart: this.scanner.lineStart,
                    start: this.scanner.index - 1,
                    end: this.scanner.index
                };
            }
            // " '
            if (cp === 34 || cp === 39) {
                var start = this.scanner.index;
                var quote = this.scanner.source[this.scanner.index++];
                var str = '';
                while (!this.scanner.eof()) {
                    var ch = this.scanner.source[this.scanner.index++];
                    if (ch === quote) {
                        break;
                    }
                    else if (ch === '&') {
                        str += this.scanXHTMLEntity(quote);
                    }
                    else {
                        str += ch;
                    }
                }
                return {
                    type: 8 /* StringLiteral */,
                    value: str,
                    lineNumber: this.scanner.lineNumber,
                    lineStart: this.scanner.lineStart,
                    start: start,
                    end: this.scanner.index
                };
            }
            // ... or .
            if (cp === 46) {
                var n1 = this.scanner.source.charCodeAt(this.scanner.index + 1);
                var n2 = this.scanner.source.charCodeAt(this.scanner.index + 2);
                var value = (n1 === 46 && n2 === 46) ? '...' : '.';
                var start = this.scanner.index;
                this.scanner.index += value.length;
                return {
                    type: 7 /* Punctuator */,
                    value: value,
                    lineNumber: this.scanner.lineNumber,
                    lineStart: this.scanner.lineStart,
                    start: start,
                    end: this.scanner.index
                };
            }
            // `
            if (cp === 96) {
                // Only placeholder, since it will be rescanned as a real assignment expression.
                return {
                    type: 10 /* Template */,
                    value: '',
                    lineNumber: this.scanner.lineNumber,
                    lineStart: this.scanner.lineStart,
                    start: this.scanner.index,
                    end: this.scanner.index
                };
            }
            // Identifer can not contain backslash (char code 92).
            if (character_1.Character.isIdentifierStart(cp) && (cp !== 92)) {
                var start = this.scanner.index;
                ++this.scanner.index;
                while (!this.scanner.eof()) {
                    var ch = this.scanner.source.charCodeAt(this.scanner.index);
                    if (character_1.Character.isIdentifierPart(ch) && (ch !== 92)) {
                        ++this.scanner.index;
                    }
                    else if (ch === 45) {
                        // Hyphen (char code 45) can be part of an identifier.
                        ++this.scanner.index;
                    }
                    else {
                        break;
                    }
                }
                var id = this.scanner.source.slice(start, this.scanner.index);
                return {
                    type: 100 /* Identifier */,
                    value: id,
                    lineNumber: this.scanner.lineNumber,
                    lineStart: this.scanner.lineStart,
                    start: start,
                    end: this.scanner.index
                };
            }
            return this.scanner.lex();
        };
        JSXParser.prototype.nextJSXToken = function () {
            this.collectComments();
            this.startMarker.index = this.scanner.index;
            this.startMarker.line = this.scanner.lineNumber;
            this.startMarker.column = this.scanner.index - this.scanner.lineStart;
            var token = this.lexJSX();
            this.lastMarker.index = this.scanner.index;
            this.lastMarker.line = this.scanner.lineNumber;
            this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
            if (this.config.tokens) {
                this.tokens.push(this.convertToken(token));
            }
            return token;
        };
        JSXParser.prototype.nextJSXText = function () {
            this.startMarker.index = this.scanner.index;
            this.startMarker.line = this.scanner.lineNumber;
            this.startMarker.column = this.scanner.index - this.scanner.lineStart;
            var start = this.scanner.index;
            var text = '';
            while (!this.scanner.eof()) {
                var ch = this.scanner.source[this.scanner.index];
                if (ch === '{' || ch === '<') {
                    break;
                }
                ++this.scanner.index;
                text += ch;
                if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                    ++this.scanner.lineNumber;
                    if (ch === '\r' && this.scanner.source[this.scanner.index] === '\n') {
                        ++this.scanner.index;
                    }
                    this.scanner.lineStart = this.scanner.index;
                }
            }
            this.lastMarker.index = this.scanner.index;
            this.lastMarker.line = this.scanner.lineNumber;
            this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
            var token = {
                type: 101 /* Text */,
                value: text,
                lineNumber: this.scanner.lineNumber,
                lineStart: this.scanner.lineStart,
                start: start,
                end: this.scanner.index
            };
            if ((text.length > 0) && this.config.tokens) {
                this.tokens.push(this.convertToken(token));
            }
            return token;
        };
        JSXParser.prototype.peekJSXToken = function () {
            var state = this.scanner.saveState();
            this.scanner.scanComments();
            var next = this.lexJSX();
            this.scanner.restoreState(state);
            return next;
        };
        // Expect the next JSX token to match the specified punctuator.
        // If not, an exception will be thrown.
        JSXParser.prototype.expectJSX = function (value) {
            var token = this.nextJSXToken();
            if (token.type !== 7 /* Punctuator */ || token.value !== value) {
                this.throwUnexpectedToken(token);
            }
        };
        // Return true if the next JSX token matches the specified punctuator.
        JSXParser.prototype.matchJSX = function (value) {
            var next = this.peekJSXToken();
            return next.type === 7 /* Punctuator */ && next.value === value;
        };
        JSXParser.prototype.parseJSXIdentifier = function () {
            var node = this.createJSXNode();
            var token = this.nextJSXToken();
            if (token.type !== 100 /* Identifier */) {
                this.throwUnexpectedToken(token);
            }
            return this.finalize(node, new JSXNode.JSXIdentifier(token.value));
        };
        JSXParser.prototype.parseJSXElementName = function () {
            var node = this.createJSXNode();
            var elementName = this.parseJSXIdentifier();
            if (this.matchJSX(':')) {
                var namespace = elementName;
                this.expectJSX(':');
                var name_1 = this.parseJSXIdentifier();
                elementName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_1));
            }
            else if (this.matchJSX('.')) {
                while (this.matchJSX('.')) {
                    var object = elementName;
                    this.expectJSX('.');
                    var property = this.parseJSXIdentifier();
                    elementName = this.finalize(node, new JSXNode.JSXMemberExpression(object, property));
                }
            }
            return elementName;
        };
        JSXParser.prototype.parseJSXAttributeName = function () {
            var node = this.createJSXNode();
            var attributeName;
            var identifier = this.parseJSXIdentifier();
            if (this.matchJSX(':')) {
                var namespace = identifier;
                this.expectJSX(':');
                var name_2 = this.parseJSXIdentifier();
                attributeName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_2));
            }
            else {
                attributeName = identifier;
            }
            return attributeName;
        };
        JSXParser.prototype.parseJSXStringLiteralAttribute = function () {
            var node = this.createJSXNode();
            var token = this.nextJSXToken();
            if (token.type !== 8 /* StringLiteral */) {
                this.throwUnexpectedToken(token);
            }
            var raw = this.getTokenRaw(token);
            return this.finalize(node, new Node.Literal(token.value, raw));
        };
        JSXParser.prototype.parseJSXExpressionAttribute = function () {
            var node = this.createJSXNode();
            this.expectJSX('{');
            this.finishJSX();
            if (this.match('}')) {
                this.tolerateError('JSX attributes must only be assigned a non-empty expression');
            }
            var expression = this.parseAssignmentExpression();
            this.reenterJSX();
            return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
        };
        JSXParser.prototype.parseJSXAttributeValue = function () {
            return this.matchJSX('{') ? this.parseJSXExpressionAttribute() :
                this.matchJSX('<') ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute();
        };
        JSXParser.prototype.parseJSXNameValueAttribute = function () {
            var node = this.createJSXNode();
            var name = this.parseJSXAttributeName();
            var value = null;
            if (this.matchJSX('=')) {
                this.expectJSX('=');
                value = this.parseJSXAttributeValue();
            }
            return this.finalize(node, new JSXNode.JSXAttribute(name, value));
        };
        JSXParser.prototype.parseJSXSpreadAttribute = function () {
            var node = this.createJSXNode();
            this.expectJSX('{');
            this.expectJSX('...');
            this.finishJSX();
            var argument = this.parseAssignmentExpression();
            this.reenterJSX();
            return this.finalize(node, new JSXNode.JSXSpreadAttribute(argument));
        };
        JSXParser.prototype.parseJSXAttributes = function () {
            var attributes = [];
            while (!this.matchJSX('/') && !this.matchJSX('>')) {
                var attribute = this.matchJSX('{') ? this.parseJSXSpreadAttribute() :
                    this.parseJSXNameValueAttribute();
                attributes.push(attribute);
            }
            return attributes;
        };
        JSXParser.prototype.parseJSXOpeningElement = function () {
            var node = this.createJSXNode();
            this.expectJSX('<');
            var name = this.parseJSXElementName();
            var attributes = this.parseJSXAttributes();
            var selfClosing = this.matchJSX('/');
            if (selfClosing) {
                this.expectJSX('/');
            }
            this.expectJSX('>');
            return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
        };
        JSXParser.prototype.parseJSXBoundaryElement = function () {
            var node = this.createJSXNode();
            this.expectJSX('<');
            if (this.matchJSX('/')) {
                this.expectJSX('/');
                var name_3 = this.parseJSXElementName();
                this.expectJSX('>');
                return this.finalize(node, new JSXNode.JSXClosingElement(name_3));
            }
            var name = this.parseJSXElementName();
            var attributes = this.parseJSXAttributes();
            var selfClosing = this.matchJSX('/');
            if (selfClosing) {
                this.expectJSX('/');
            }
            this.expectJSX('>');
            return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
        };
        JSXParser.prototype.parseJSXEmptyExpression = function () {
            var node = this.createJSXChildNode();
            this.collectComments();
            this.lastMarker.index = this.scanner.index;
            this.lastMarker.line = this.scanner.lineNumber;
            this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
            return this.finalize(node, new JSXNode.JSXEmptyExpression());
        };
        JSXParser.prototype.parseJSXExpressionContainer = function () {
            var node = this.createJSXNode();
            this.expectJSX('{');
            var expression;
            if (this.matchJSX('}')) {
                expression = this.parseJSXEmptyExpression();
                this.expectJSX('}');
            }
            else {
                this.finishJSX();
                expression = this.parseAssignmentExpression();
                this.reenterJSX();
            }
            return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
        };
        JSXParser.prototype.parseJSXChildren = function () {
            var children = [];
            while (!this.scanner.eof()) {
                var node = this.createJSXChildNode();
                var token = this.nextJSXText();
                if (token.start < token.end) {
                    var raw = this.getTokenRaw(token);
                    var child = this.finalize(node, new JSXNode.JSXText(token.value, raw));
                    children.push(child);
                }
                if (this.scanner.source[this.scanner.index] === '{') {
                    var container = this.parseJSXExpressionContainer();
                    children.push(container);
                }
                else {
                    break;
                }
            }
            return children;
        };
        JSXParser.prototype.parseComplexJSXElement = function (el) {
            var stack = [];
            while (!this.scanner.eof()) {
                el.children = el.children.concat(this.parseJSXChildren());
                var node = this.createJSXChildNode();
                var element = this.parseJSXBoundaryElement();
                if (element.type === jsx_syntax_1.JSXSyntax.JSXOpeningElement) {
                    var opening = element;
                    if (opening.selfClosing) {
                        var child = this.finalize(node, new JSXNode.JSXElement(opening, [], null));
                        el.children.push(child);
                    }
                    else {
                        stack.push(el);
                        el = { node: node, opening: opening, closing: null, children: [] };
                    }
                }
                if (element.type === jsx_syntax_1.JSXSyntax.JSXClosingElement) {
                    el.closing = element;
                    var open_1 = getQualifiedElementName(el.opening.name);
                    var close_1 = getQualifiedElementName(el.closing.name);
                    if (open_1 !== close_1) {
                        this.tolerateError('Expected corresponding JSX closing tag for %0', open_1);
                    }
                    if (stack.length > 0) {
                        var child = this.finalize(el.node, new JSXNode.JSXElement(el.opening, el.children, el.closing));
                        el = stack[stack.length - 1];
                        el.children.push(child);
                        stack.pop();
                    }
                    else {
                        break;
                    }
                }
            }
            return el;
        };
        JSXParser.prototype.parseJSXElement = function () {
            var node = this.createJSXNode();
            var opening = this.parseJSXOpeningElement();
            var children = [];
            var closing = null;
            if (!opening.selfClosing) {
                var el = this.parseComplexJSXElement({ node: node, opening: opening, closing: closing, children: children });
                children = el.children;
                closing = el.closing;
            }
            return this.finalize(node, new JSXNode.JSXElement(opening, children, closing));
        };
        JSXParser.prototype.parseJSXRoot = function () {
            // Pop the opening '<' added from the lookahead.
            if (this.config.tokens) {
                this.tokens.pop();
            }
            this.startJSX();
            var element = this.parseJSXElement();
            this.finishJSX();
            return element;
        };
        JSXParser.prototype.isStartOfExpression = function () {
            return _super.prototype.isStartOfExpression.call(this) || this.match('<');
        };
        return JSXParser;
    }(parser_1.Parser));
    exports.JSXParser = JSXParser;

/***/ },
/* 4 */
/***/ function(module, exports) {

    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // See also tools/generate-unicode-regex.js.
    var Regex = {
        // Unicode v8.0.0 NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
        // Unicode v8.0.0 NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
    };
    exports.Character = {
        /* tslint:disable:no-bitwise */
        fromCodePoint: function (cp) {
            return (cp < 0x10000) ? String.fromCharCode(cp) :
                String.fromCharCode(0xD800 + ((cp - 0x10000) >> 10)) +
                    String.fromCharCode(0xDC00 + ((cp - 0x10000) & 1023));
        },
        // https://tc39.github.io/ecma262/#sec-white-space
        isWhiteSpace: function (cp) {
            return (cp === 0x20) || (cp === 0x09) || (cp === 0x0B) || (cp === 0x0C) || (cp === 0xA0) ||
                (cp >= 0x1680 && [0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(cp) >= 0);
        },
        // https://tc39.github.io/ecma262/#sec-line-terminators
        isLineTerminator: function (cp) {
            return (cp === 0x0A) || (cp === 0x0D) || (cp === 0x2028) || (cp === 0x2029);
        },
        // https://tc39.github.io/ecma262/#sec-names-and-keywords
        isIdentifierStart: function (cp) {
            return (cp === 0x24) || (cp === 0x5F) ||
                (cp >= 0x41 && cp <= 0x5A) ||
                (cp >= 0x61 && cp <= 0x7A) ||
                (cp === 0x5C) ||
                ((cp >= 0x80) && Regex.NonAsciiIdentifierStart.test(exports.Character.fromCodePoint(cp)));
        },
        isIdentifierPart: function (cp) {
            return (cp === 0x24) || (cp === 0x5F) ||
                (cp >= 0x41 && cp <= 0x5A) ||
                (cp >= 0x61 && cp <= 0x7A) ||
                (cp >= 0x30 && cp <= 0x39) ||
                (cp === 0x5C) ||
                ((cp >= 0x80) && Regex.NonAsciiIdentifierPart.test(exports.Character.fromCodePoint(cp)));
        },
        // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
        isDecimalDigit: function (cp) {
            return (cp >= 0x30 && cp <= 0x39); // 0..9
        },
        isHexDigit: function (cp) {
            return (cp >= 0x30 && cp <= 0x39) ||
                (cp >= 0x41 && cp <= 0x46) ||
                (cp >= 0x61 && cp <= 0x66); // a..f
        },
        isOctalDigit: function (cp) {
            return (cp >= 0x30 && cp <= 0x37); // 0..7
        }
    };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var jsx_syntax_1 = __webpack_require__(6);
    /* tslint:disable:max-classes-per-file */
    var JSXClosingElement = (function () {
        function JSXClosingElement(name) {
            this.type = jsx_syntax_1.JSXSyntax.JSXClosingElement;
            this.name = name;
        }
        return JSXClosingElement;
    }());
    exports.JSXClosingElement = JSXClosingElement;
    var JSXElement = (function () {
        function JSXElement(openingElement, children, closingElement) {
            this.type = jsx_syntax_1.JSXSyntax.JSXElement;
            this.openingElement = openingElement;
            this.children = children;
            this.closingElement = closingElement;
        }
        return JSXElement;
    }());
    exports.JSXElement = JSXElement;
    var JSXEmptyExpression = (function () {
        function JSXEmptyExpression() {
            this.type = jsx_syntax_1.JSXSyntax.JSXEmptyExpression;
        }
        return JSXEmptyExpression;
    }());
    exports.JSXEmptyExpression = JSXEmptyExpression;
    var JSXExpressionContainer = (function () {
        function JSXExpressionContainer(expression) {
            this.type = jsx_syntax_1.JSXSyntax.JSXExpressionContainer;
            this.expression = expression;
        }
        return JSXExpressionContainer;
    }());
    exports.JSXExpressionContainer = JSXExpressionContainer;
    var JSXIdentifier = (function () {
        function JSXIdentifier(name) {
            this.type = jsx_syntax_1.JSXSyntax.JSXIdentifier;
            this.name = name;
        }
        return JSXIdentifier;
    }());
    exports.JSXIdentifier = JSXIdentifier;
    var JSXMemberExpression = (function () {
        function JSXMemberExpression(object, property) {
            this.type = jsx_syntax_1.JSXSyntax.JSXMemberExpression;
            this.object = object;
            this.property = property;
        }
        return JSXMemberExpression;
    }());
    exports.JSXMemberExpression = JSXMemberExpression;
    var JSXAttribute = (function () {
        function JSXAttribute(name, value) {
            this.type = jsx_syntax_1.JSXSyntax.JSXAttribute;
            this.name = name;
            this.value = value;
        }
        return JSXAttribute;
    }());
    exports.JSXAttribute = JSXAttribute;
    var JSXNamespacedName = (function () {
        function JSXNamespacedName(namespace, name) {
            this.type = jsx_syntax_1.JSXSyntax.JSXNamespacedName;
            this.namespace = namespace;
            this.name = name;
        }
        return JSXNamespacedName;
    }());
    exports.JSXNamespacedName = JSXNamespacedName;
    var JSXOpeningElement = (function () {
        function JSXOpeningElement(name, selfClosing, attributes) {
            this.type = jsx_syntax_1.JSXSyntax.JSXOpeningElement;
            this.name = name;
            this.selfClosing = selfClosing;
            this.attributes = attributes;
        }
        return JSXOpeningElement;
    }());
    exports.JSXOpeningElement = JSXOpeningElement;
    var JSXSpreadAttribute = (function () {
        function JSXSpreadAttribute(argument) {
            this.type = jsx_syntax_1.JSXSyntax.JSXSpreadAttribute;
            this.argument = argument;
        }
        return JSXSpreadAttribute;
    }());
    exports.JSXSpreadAttribute = JSXSpreadAttribute;
    var JSXText = (function () {
        function JSXText(value, raw) {
            this.type = jsx_syntax_1.JSXSyntax.JSXText;
            this.value = value;
            this.raw = raw;
        }
        return JSXText;
    }());
    exports.JSXText = JSXText;

/***/ },
/* 6 */
/***/ function(module, exports) {

    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JSXSyntax = {
        JSXAttribute: 'JSXAttribute',
        JSXClosingElement: 'JSXClosingElement',
        JSXElement: 'JSXElement',
        JSXEmptyExpression: 'JSXEmptyExpression',
        JSXExpressionContainer: 'JSXExpressionContainer',
        JSXIdentifier: 'JSXIdentifier',
        JSXMemberExpression: 'JSXMemberExpression',
        JSXNamespacedName: 'JSXNamespacedName',
        JSXOpeningElement: 'JSXOpeningElement',
        JSXSpreadAttribute: 'JSXSpreadAttribute',
        JSXText: 'JSXText'
    };

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var syntax_1 = __webpack_require__(2);
    /* tslint:disable:max-classes-per-file */
    var ArrayExpression = (function () {
        function ArrayExpression(elements) {
            this.type = syntax_1.Syntax.ArrayExpression;
            this.elements = elements;
        }
        return ArrayExpression;
    }());
    exports.ArrayExpression = ArrayExpression;
    var ArrayPattern = (function () {
        function ArrayPattern(elements) {
            this.type = syntax_1.Syntax.ArrayPattern;
            this.elements = elements;
        }
        return ArrayPattern;
    }());
    exports.ArrayPattern = ArrayPattern;
    var ArrowFunctionExpression = (function () {
        function ArrowFunctionExpression(params, body, expression) {
            this.type = syntax_1.Syntax.ArrowFunctionExpression;
            this.id = null;
            this.params = params;
            this.body = body;
            this.generator = false;
            this.expression = expression;
            this.async = false;
        }
        return ArrowFunctionExpression;
    }());
    exports.ArrowFunctionExpression = ArrowFunctionExpression;
    var AssignmentExpression = (function () {
        function AssignmentExpression(operator, left, right) {
            this.type = syntax_1.Syntax.AssignmentExpression;
            this.operator = operator;
            this.left = left;
            this.right = right;
        }
        return AssignmentExpression;
    }());
    exports.AssignmentExpression = AssignmentExpression;
    var AssignmentPattern = (function () {
        function AssignmentPattern(left, right) {
            this.type = syntax_1.Syntax.AssignmentPattern;
            this.left = left;
            this.right = right;
        }
        return AssignmentPattern;
    }());
    exports.AssignmentPattern = AssignmentPattern;
    var AsyncArrowFunctionExpression = (function () {
        function AsyncArrowFunctionExpression(params, body, expression) {
            this.type = syntax_1.Syntax.ArrowFunctionExpression;
            this.id = null;
            this.params = params;
            this.body = body;
            this.generator = false;
            this.expression = expression;
            this.async = true;
        }
        return AsyncArrowFunctionExpression;
    }());
    exports.AsyncArrowFunctionExpression = AsyncArrowFunctionExpression;
    var AsyncFunctionDeclaration = (function () {
        function AsyncFunctionDeclaration(id, params, body) {
            this.type = syntax_1.Syntax.FunctionDeclaration;
            this.id = id;
            this.params = params;
            this.body = body;
            this.generator = false;
            this.expression = false;
            this.async = true;
        }
        return AsyncFunctionDeclaration;
    }());
    exports.AsyncFunctionDeclaration = AsyncFunctionDeclaration;
    var AsyncFunctionExpression = (function () {
        function AsyncFunctionExpression(id, params, body) {
            this.type = syntax_1.Syntax.FunctionExpression;
            this.id = id;
            this.params = params;
            this.body = body;
            this.generator = false;
            this.expression = false;
            this.async = true;
        }
        return AsyncFunctionExpression;
    }());
    exports.AsyncFunctionExpression = AsyncFunctionExpression;
    var AwaitExpression = (function () {
        function AwaitExpression(argument) {
            this.type = syntax_1.Syntax.AwaitExpression;
            this.argument = argument;
        }
        return AwaitExpression;
    }());
    exports.AwaitExpression = AwaitExpression;
    var BinaryExpression = (function () {
        function BinaryExpression(operator, left, right) {
            var logical = (operator === '||' || operator === '&&');
            this.type = logical ? syntax_1.Syntax.LogicalExpression : syntax_1.Syntax.BinaryExpression;
            this.operator = operator;
            this.left = left;
            this.right = right;
        }
        return BinaryExpression;
    }());
    exports.BinaryExpression = BinaryExpression;
    var BlockStatement = (function () {
        function BlockStatement(body) {
            this.type = syntax_1.Syntax.BlockStatement;
            this.body = body;
        }
        return BlockStatement;
    }());
    exports.BlockStatement = BlockStatement;
    var BreakStatement = (function () {
        function BreakStatement(label) {
            this.type = syntax_1.Syntax.BreakStatement;
            this.label = label;
        }
        return BreakStatement;
    }());
    exports.BreakStatement = BreakStatement;
    var CallExpression = (function () {
        function CallExpression(callee, args) {
            this.type = syntax_1.Syntax.CallExpression;
            this.callee = callee;
            this.arguments = args;
        }
        return CallExpression;
    }());
    exports.CallExpression = CallExpression;
    var CatchClause = (function () {
        function CatchClause(param, body) {
            this.type = syntax_1.Syntax.CatchClause;
            this.param = param;
            this.body = body;
        }
        return CatchClause;
    }());
    exports.CatchClause = CatchClause;
    var ClassBody = (function () {
        function ClassBody(body) {
            this.type = syntax_1.Syntax.ClassBody;
            this.body = body;
        }
        return ClassBody;
    }());
    exports.ClassBody = ClassBody;
    var ClassDeclaration = (function () {
        function ClassDeclaration(id, superClass, body) {
            this.type = syntax_1.Syntax.ClassDeclaration;
            this.id = id;
            this.superClass = superClass;
            this.body = body;
        }
        return ClassDeclaration;
    }());
    exports.ClassDeclaration = ClassDeclaration;
    var ClassExpression = (function () {
        function ClassExpression(id, superClass, body) {
            this.type = syntax_1.Syntax.ClassExpression;
            this.id = id;
            this.superClass = superClass;
            this.body = body;
        }
        return ClassExpression;
    }());
    exports.ClassExpression = ClassExpression;
    var ComputedMemberExpression = (function () {
        function ComputedMemberExpression(object, property) {
            this.type = syntax_1.Syntax.MemberExpression;
            this.computed = true;
            this.object = object;
            this.property = property;
        }
        return ComputedMemberExpression;
    }());
    exports.ComputedMemberExpression = ComputedMemberExpression;
    var ConditionalExpression = (function () {
        function ConditionalExpression(test, consequent, alternate) {
            this.type = syntax_1.Syntax.ConditionalExpression;
            this.test = test;
            this.consequent = consequent;
            this.alternate = alternate;
        }
        return ConditionalExpression;
    }());
    exports.ConditionalExpression = ConditionalExpression;
    var ContinueStatement = (function () {
        function ContinueStatement(label) {
            this.type = syntax_1.Syntax.ContinueStatement;
            this.label = label;
        }
        return ContinueStatement;
    }());
    exports.ContinueStatement = ContinueStatement;
    var DebuggerStatement = (function () {
        function DebuggerStatement() {
            this.type = syntax_1.Syntax.DebuggerStatement;
        }
        return DebuggerStatement;
    }());
    exports.DebuggerStatement = DebuggerStatement;
    var Directive = (function () {
        function Directive(expression, directive) {
            this.type = syntax_1.Syntax.ExpressionStatement;
            this.expression = expression;
            this.directive = directive;
        }
        return Directive;
    }());
    exports.Directive = Directive;
    var DoWhileStatement = (function () {
        function DoWhileStatement(body, test) {
            this.type = syntax_1.Syntax.DoWhileStatement;
            this.body = body;
            this.test = test;
        }
        return DoWhileStatement;
    }());
    exports.DoWhileStatement = DoWhileStatement;
    var EmptyStatement = (function () {
        function EmptyStatement() {
            this.type = syntax_1.Syntax.EmptyStatement;
        }
        return EmptyStatement;
    }());
    exports.EmptyStatement = EmptyStatement;
    var ExportAllDeclaration = (function () {
        function ExportAllDeclaration(source) {
            this.type = syntax_1.Syntax.ExportAllDeclaration;
            this.source = source;
        }
        return ExportAllDeclaration;
    }());
    exports.ExportAllDeclaration = ExportAllDeclaration;
    var ExportDefaultDeclaration = (function () {
        function ExportDefaultDeclaration(declaration) {
            this.type = syntax_1.Syntax.ExportDefaultDeclaration;
            this.declaration = declaration;
        }
        return ExportDefaultDeclaration;
    }());
    exports.ExportDefaultDeclaration = ExportDefaultDeclaration;
    var ExportNamedDeclaration = (function () {
        function ExportNamedDeclaration(declaration, specifiers, source) {
            this.type = syntax_1.Syntax.ExportNamedDeclaration;
            this.declaration = declaration;
            this.specifiers = specifiers;
            this.source = source;
        }
        return ExportNamedDeclaration;
    }());
    exports.ExportNamedDeclaration = ExportNamedDeclaration;
    var ExportSpecifier = (function () {
        function ExportSpecifier(local, exported) {
            this.type = syntax_1.Syntax.ExportSpecifier;
            this.exported = exported;
            this.local = local;
        }
        return ExportSpecifier;
    }());
    exports.ExportSpecifier = ExportSpecifier;
    var ExpressionStatement = (function () {
        function ExpressionStatement(expression) {
            this.type = syntax_1.Syntax.ExpressionStatement;
            this.expression = expression;
        }
        return ExpressionStatement;
    }());
    exports.ExpressionStatement = ExpressionStatement;
    var ForInStatement = (function () {
        function ForInStatement(left, right, body) {
            this.type = syntax_1.Syntax.ForInStatement;
            this.left = left;
            this.right = right;
            this.body = body;
            this.each = false;
        }
        return ForInStatement;
    }());
    exports.ForInStatement = ForInStatement;
    var ForOfStatement = (function () {
        function ForOfStatement(left, right, body) {
            this.type = syntax_1.Syntax.ForOfStatement;
            this.left = left;
            this.right = right;
            this.body = body;
        }
        return ForOfStatement;
    }());
    exports.ForOfStatement = ForOfStatement;
    var ForStatement = (function () {
        function ForStatement(init, test, update, body) {
            this.type = syntax_1.Syntax.ForStatement;
            this.init = init;
            this.test = test;
            this.update = update;
            this.body = body;
        }
        return ForStatement;
    }());
    exports.ForStatement = ForStatement;
    var FunctionDeclaration = (function () {
        function FunctionDeclaration(id, params, body, generator) {
            this.type = syntax_1.Syntax.FunctionDeclaration;
            this.id = id;
            this.params = params;
            this.body = body;
            this.generator = generator;
            this.expression = false;
            this.async = false;
        }
        return FunctionDeclaration;
    }());
    exports.FunctionDeclaration = FunctionDeclaration;
    var FunctionExpression = (function () {
        function FunctionExpression(id, params, body, generator) {
            this.type = syntax_1.Syntax.FunctionExpression;
            this.id = id;
            this.params = params;
            this.body = body;
            this.generator = generator;
            this.expression = false;
            this.async = false;
        }
        return FunctionExpression;
    }());
    exports.FunctionExpression = FunctionExpression;
    var Identifier = (function () {
        function Identifier(name) {
            this.type = syntax_1.Syntax.Identifier;
            this.name = name;
        }
        return Identifier;
    }());
    exports.Identifier = Identifier;
    var IfStatement = (function () {
        function IfStatement(test, consequent, alternate) {
            this.type = syntax_1.Syntax.IfStatement;
            this.test = test;
            this.consequent = consequent;
            this.alternate = alternate;
        }
        return IfStatement;
    }());
    exports.IfStatement = IfStatement;
    var ImportDeclaration = (function () {
        function ImportDeclaration(specifiers, source) {
            this.type = syntax_1.Syntax.ImportDeclaration;
            this.specifiers = specifiers;
            this.source = source;
        }
        return ImportDeclaration;
    }());
    exports.ImportDeclaration = ImportDeclaration;
    var ImportDefaultSpecifier = (function () {
        function ImportDefaultSpecifier(local) {
            this.type = syntax_1.Syntax.ImportDefaultSpecifier;
            this.local = local;
        }
        return ImportDefaultSpecifier;
    }());
    exports.ImportDefaultSpecifier = ImportDefaultSpecifier;
    var ImportNamespaceSpecifier = (function () {
        function ImportNamespaceSpecifier(local) {
            this.type = syntax_1.Syntax.ImportNamespaceSpecifier;
            this.local = local;
        }
        return ImportNamespaceSpecifier;
    }());
    exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
    var ImportSpecifier = (function () {
        function ImportSpecifier(local, imported) {
            this.type = syntax_1.Syntax.ImportSpecifier;
            this.local = local;
            this.imported = imported;
        }
        return ImportSpecifier;
    }());
    exports.ImportSpecifier = ImportSpecifier;
    var LabeledStatement = (function () {
        function LabeledStatement(label, body) {
            this.type = syntax_1.Syntax.LabeledStatement;
            this.label = label;
            this.body = body;
        }
        return LabeledStatement;
    }());
    exports.LabeledStatement = LabeledStatement;
    var Literal = (function () {
        function Literal(value, raw) {
            this.type = syntax_1.Syntax.Literal;
            this.value = value;
            this.raw = raw;
        }
        return Literal;
    }());
    exports.Literal = Literal;
    var MetaProperty = (function () {
        function MetaProperty(meta, property) {
            this.type = syntax_1.Syntax.MetaProperty;
            this.meta = meta;
            this.property = property;
        }
        return MetaProperty;
    }());
    exports.MetaProperty = MetaProperty;
    var MethodDefinition = (function () {
        function MethodDefinition(key, computed, value, kind, isStatic) {
            this.type = syntax_1.Syntax.MethodDefinition;
            this.key = key;
            this.computed = computed;
            this.value = value;
            this.kind = kind;
            this.static = isStatic;
        }
        return MethodDefinition;
    }());
    exports.MethodDefinition = MethodDefinition;
    var Module = (function () {
        function Module(body) {
            this.type = syntax_1.Syntax.Program;
            this.body = body;
            this.sourceType = 'module';
        }
        return Module;
    }());
    exports.Module = Module;
    var NewExpression = (function () {
        function NewExpression(callee, args) {
            this.type = syntax_1.Syntax.NewExpression;
            this.callee = callee;
            this.arguments = args;
        }
        return NewExpression;
    }());
    exports.NewExpression = NewExpression;
    var ObjectExpression = (function () {
        function ObjectExpression(properties) {
            this.type = syntax_1.Syntax.ObjectExpression;
            this.properties = properties;
        }
        return ObjectExpression;
    }());
    exports.ObjectExpression = ObjectExpression;
    var ObjectPattern = (function () {
        function ObjectPattern(properties) {
            this.type = syntax_1.Syntax.ObjectPattern;
            this.properties = properties;
        }
        return ObjectPattern;
    }());
    exports.ObjectPattern = ObjectPattern;
    var Property = (function () {
        function Property(kind, key, computed, value, method, shorthand) {
            this.type = syntax_1.Syntax.Property;
            this.key = key;
            this.computed = computed;
            this.value = value;
            this.kind = kind;
            this.method = method;
            this.shorthand = shorthand;
        }
        return Property;
    }());
    exports.Property = Property;
    var RegexLiteral = (function () {
        function RegexLiteral(value, raw, pattern, flags) {
            this.type = syntax_1.Syntax.Literal;
            this.value = value;
            this.raw = raw;
            this.regex = { pattern: pattern, flags: flags };
        }
        return RegexLiteral;
    }());
    exports.RegexLiteral = RegexLiteral;
    var RestElement = (function () {
        function RestElement(argument) {
            this.type = syntax_1.Syntax.RestElement;
            this.argument = argument;
        }
        return RestElement;
    }());
    exports.RestElement = RestElement;
    var ReturnStatement = (function () {
        function ReturnStatement(argument) {
            this.type = syntax_1.Syntax.ReturnStatement;
            this.argument = argument;
        }
        return ReturnStatement;
    }());
    exports.ReturnStatement = ReturnStatement;
    var Script = (function () {
        function Script(body) {
            this.type = syntax_1.Syntax.Program;
            this.body = body;
            this.sourceType = 'script';
        }
        return Script;
    }());
    exports.Script = Script;
    var SequenceExpression = (function () {
        function SequenceExpression(expressions) {
            this.type = syntax_1.Syntax.SequenceExpression;
            this.expressions = expressions;
        }
        return SequenceExpression;
    }());
    exports.SequenceExpression = SequenceExpression;
    var SpreadElement = (function () {
        function SpreadElement(argument) {
            this.type = syntax_1.Syntax.SpreadElement;
            this.argument = argument;
        }
        return SpreadElement;
    }());
    exports.SpreadElement = SpreadElement;
    var StaticMemberExpression = (function () {
        function StaticMemberExpression(object, property) {
            this.type = syntax_1.Syntax.MemberExpression;
            this.computed = false;
            this.object = object;
            this.property = property;
        }
        return StaticMemberExpression;
    }());
    exports.StaticMemberExpression = StaticMemberExpression;
    var Super = (function () {
        function Super() {
            this.type = syntax_1.Syntax.Super;
        }
        return Super;
    }());
    exports.Super = Super;
    var SwitchCase = (function () {
        function SwitchCase(test, consequent) {
            this.type = syntax_1.Syntax.SwitchCase;
            this.test = test;
            this.consequent = consequent;
        }
        return SwitchCase;
    }());
    exports.SwitchCase = SwitchCase;
    var SwitchStatement = (function () {
        function SwitchStatement(discriminant, cases) {
            this.type = syntax_1.Syntax.SwitchStatement;
            this.discriminant = discriminant;
            this.cases = cases;
        }
        return SwitchStatement;
    }());
    exports.SwitchStatement = SwitchStatement;
    var TaggedTemplateExpression = (function () {
        function TaggedTemplateExpression(tag, quasi) {
            this.type = syntax_1.Syntax.TaggedTemplateExpression;
            this.tag = tag;
            this.quasi = quasi;
        }
        return TaggedTemplateExpression;
    }());
    exports.TaggedTemplateExpression = TaggedTemplateExpression;
    var TemplateElement = (function () {
        function TemplateElement(value, tail) {
            this.type = syntax_1.Syntax.TemplateElement;
            this.value = value;
            this.tail = tail;
        }
        return TemplateElement;
    }());
    exports.TemplateElement = TemplateElement;
    var TemplateLiteral = (function () {
        function TemplateLiteral(quasis, expressions) {
            this.type = syntax_1.Syntax.TemplateLiteral;
            this.quasis = quasis;
            this.expressions = expressions;
        }
        return TemplateLiteral;
    }());
    exports.TemplateLiteral = TemplateLiteral;
    var ThisExpression = (function () {
        function ThisExpression() {
            this.type = syntax_1.Syntax.ThisExpression;
        }
        return ThisExpression;
    }());
    exports.ThisExpression = ThisExpression;
    var ThrowStatement = (function () {
        function ThrowStatement(argument) {
            this.type = syntax_1.Syntax.ThrowStatement;
            this.argument = argument;
        }
        return ThrowStatement;
    }());
    exports.ThrowStatement = ThrowStatement;
    var TryStatement = (function () {
        function TryStatement(block, handler, finalizer) {
            this.type = syntax_1.Syntax.TryStatement;
            this.block = block;
            this.handler = handler;
            this.finalizer = finalizer;
        }
        return TryStatement;
    }());
    exports.TryStatement = TryStatement;
    var UnaryExpression = (function () {
        function UnaryExpression(operator, argument) {
            this.type = syntax_1.Syntax.UnaryExpression;
            this.operator = operator;
            this.argument = argument;
            this.prefix = true;
        }
        return UnaryExpression;
    }());
    exports.UnaryExpression = UnaryExpression;
    var UpdateExpression = (function () {
        function UpdateExpression(operator, argument, prefix) {
            this.type = syntax_1.Syntax.UpdateExpression;
            this.operator = operator;
            this.argument = argument;
            this.prefix = prefix;
        }
        return UpdateExpression;
    }());
    exports.UpdateExpression = UpdateExpression;
    var VariableDeclaration = (function () {
        function VariableDeclaration(declarations, kind) {
            this.type = syntax_1.Syntax.VariableDeclaration;
            this.declarations = declarations;
            this.kind = kind;
        }
        return VariableDeclaration;
    }());
    exports.VariableDeclaration = VariableDeclaration;
    var VariableDeclarator = (function () {
        function VariableDeclarator(id, init) {
            this.type = syntax_1.Syntax.VariableDeclarator;
            this.id = id;
            this.init = init;
        }
        return VariableDeclarator;
    }());
    exports.VariableDeclarator = VariableDeclarator;
    var WhileStatement = (function () {
        function WhileStatement(test, body) {
            this.type = syntax_1.Syntax.WhileStatement;
            this.test = test;
            this.body = body;
        }
        return WhileStatement;
    }());
    exports.WhileStatement = WhileStatement;
    var WithStatement = (function () {
        function WithStatement(object, body) {
            this.type = syntax_1.Syntax.WithStatement;
            this.object = object;
            this.body = body;
        }
        return WithStatement;
    }());
    exports.WithStatement = WithStatement;
    var YieldExpression = (function () {
        function YieldExpression(argument, delegate) {
            this.type = syntax_1.Syntax.YieldExpression;
            this.argument = argument;
            this.delegate = delegate;
        }
        return YieldExpression;
    }());
    exports.YieldExpression = YieldExpression;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var assert_1 = __webpack_require__(9);
    var error_handler_1 = __webpack_require__(10);
    var messages_1 = __webpack_require__(11);
    var Node = __webpack_require__(7);
    var scanner_1 = __webpack_require__(12);
    var syntax_1 = __webpack_require__(2);
    var token_1 = __webpack_require__(13);
    var ArrowParameterPlaceHolder = 'ArrowParameterPlaceHolder';
    var Parser = (function () {
        function Parser(code, options, delegate) {
            if (options === void 0) { options = {}; }
            this.config = {
                range: (typeof options.range === 'boolean') && options.range,
                loc: (typeof options.loc === 'boolean') && options.loc,
                source: null,
                tokens: (typeof options.tokens === 'boolean') && options.tokens,
                comment: (typeof options.comment === 'boolean') && options.comment,
                tolerant: (typeof options.tolerant === 'boolean') && options.tolerant
            };
            if (this.config.loc && options.source && options.source !== null) {
                this.config.source = String(options.source);
            }
            this.delegate = delegate;
            this.errorHandler = new error_handler_1.ErrorHandler();
            this.errorHandler.tolerant = this.config.tolerant;
            this.scanner = new scanner_1.Scanner(code, this.errorHandler);
            this.scanner.trackComment = this.config.comment;
            this.operatorPrecedence = {
                ')': 0,
                ';': 0,
                ',': 0,
                '=': 0,
                ']': 0,
                '||': 1,
                '&&': 2,
                '|': 3,
                '^': 4,
                '&': 5,
                '==': 6,
                '!=': 6,
                '===': 6,
                '!==': 6,
                '<': 7,
                '>': 7,
                '<=': 7,
                '>=': 7,
                '<<': 8,
                '>>': 8,
                '>>>': 8,
                '+': 9,
                '-': 9,
                '*': 11,
                '/': 11,
                '%': 11
            };
            this.lookahead = {
                type: 2 /* EOF */,
                value: '',
                lineNumber: this.scanner.lineNumber,
                lineStart: 0,
                start: 0,
                end: 0
            };
            this.hasLineTerminator = false;
            this.context = {
                isModule: false,
                await: false,
                allowIn: true,
                allowStrictDirective: true,
                allowYield: true,
                firstCoverInitializedNameError: null,
                isAssignmentTarget: false,
                isBindingElement: false,
                inFunctionBody: false,
                inIteration: false,
                inSwitch: false,
                labelSet: {},
                strict: false
            };
            this.tokens = [];
            this.startMarker = {
                index: 0,
                line: this.scanner.lineNumber,
                column: 0
            };
            this.lastMarker = {
                index: 0,
                line: this.scanner.lineNumber,
                column: 0
            };
            this.nextToken();
            this.lastMarker = {
                index: this.scanner.index,
                line: this.scanner.lineNumber,
                column: this.scanner.index - this.scanner.lineStart
            };
        }
        Parser.prototype.throwError = function (messageFormat) {
            var values = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                values[_i - 1] = arguments[_i];
            }
            var args = Array.prototype.slice.call(arguments, 1);
            var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
                assert_1.assert(idx < args.length, 'Message reference must be in range');
                return args[idx];
            });
            var index = this.lastMarker.index;
            var line = this.lastMarker.line;
            var column = this.lastMarker.column + 1;
            throw this.errorHandler.createError(index, line, column, msg);
        };
        Parser.prototype.tolerateError = function (messageFormat) {
            var values = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                values[_i - 1] = arguments[_i];
            }
            var args = Array.prototype.slice.call(arguments, 1);
            var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
                assert_1.assert(idx < args.length, 'Message reference must be in range');
                return args[idx];
            });
            var index = this.lastMarker.index;
            var line = this.scanner.lineNumber;
            var column = this.lastMarker.column + 1;
            this.errorHandler.tolerateError(index, line, column, msg);
        };
        // Throw an exception because of the token.
        Parser.prototype.unexpectedTokenError = function (token, message) {
            var msg = message || messages_1.Messages.UnexpectedToken;
            var value;
            if (token) {
                if (!message) {
                    msg = (token.type === 2 /* EOF */) ? messages_1.Messages.UnexpectedEOS :
                        (token.type === 3 /* Identifier */) ? messages_1.Messages.UnexpectedIdentifier :
                            (token.type === 6 /* NumericLiteral */) ? messages_1.Messages.UnexpectedNumber :
                                (token.type === 8 /* StringLiteral */) ? messages_1.Messages.UnexpectedString :
                                    (token.type === 10 /* Template */) ? messages_1.Messages.UnexpectedTemplate :
                                        messages_1.Messages.UnexpectedToken;
                    if (token.type === 4 /* Keyword */) {
                        if (this.scanner.isFutureReservedWord(token.value)) {
                            msg = messages_1.Messages.UnexpectedReserved;
                        }
                        else if (this.context.strict && this.scanner.isStrictModeReservedWord(token.value)) {
                            msg = messages_1.Messages.StrictReservedWord;
                        }
                    }
                }
                value = token.value;
            }
            else {
                value = 'ILLEGAL';
            }
            msg = msg.replace('%0', value);
            if (token && typeof token.lineNumber === 'number') {
                var index = token.start;
                var line = token.lineNumber;
                var lastMarkerLineStart = this.lastMarker.index - this.lastMarker.column;
                var column = token.start - lastMarkerLineStart + 1;
                return this.errorHandler.createError(index, line, column, msg);
            }
            else {
                var index = this.lastMarker.index;
                var line = this.lastMarker.line;
                var column = this.lastMarker.column + 1;
                return this.errorHandler.createError(index, line, column, msg);
            }
        };
        Parser.prototype.throwUnexpectedToken = function (token, message) {
            throw this.unexpectedTokenError(token, message);
        };
        Parser.prototype.tolerateUnexpectedToken = function (token, message) {
            this.errorHandler.tolerate(this.unexpectedTokenError(token, message));
        };
        Parser.prototype.collectComments = function () {
            if (!this.config.comment) {
                this.scanner.scanComments();
            }
            else {
                var comments = this.scanner.scanComments();
                if (comments.length > 0 && this.delegate) {
                    for (var i = 0; i < comments.length; ++i) {
                        var e = comments[i];
                        var node = void 0;
                        node = {
                            type: e.multiLine ? 'BlockComment' : 'LineComment',
                            value: this.scanner.source.slice(e.slice[0], e.slice[1])
                        };
                        if (this.config.range) {
                            node.range = e.range;
                        }
                        if (this.config.loc) {
                            node.loc = e.loc;
                        }
                        var metadata = {
                            start: {
                                line: e.loc.start.line,
                                column: e.loc.start.column,
                                offset: e.range[0]
                            },
                            end: {
                                line: e.loc.end.line,
                                column: e.loc.end.column,
                                offset: e.range[1]
                            }
                        };
                        this.delegate(node, metadata);
                    }
                }
            }
        };
        // From internal representation to an external structure
        Parser.prototype.getTokenRaw = function (token) {
            return this.scanner.source.slice(token.start, token.end);
        };
        Parser.prototype.convertToken = function (token) {
            var t = {
                type: token_1.TokenName[token.type],
                value: this.getTokenRaw(token)
            };
            if (this.config.range) {
                t.range = [token.start, token.end];
            }
            if (this.config.loc) {
                t.loc = {
                    start: {
                        line: this.startMarker.line,
                        column: this.startMarker.column
                    },
                    end: {
                        line: this.scanner.lineNumber,
                        column: this.scanner.index - this.scanner.lineStart
                    }
                };
            }
            if (token.type === 9 /* RegularExpression */) {
                var pattern = token.pattern;
                var flags = token.flags;
                t.regex = { pattern: pattern, flags: flags };
            }
            return t;
        };
        Parser.prototype.nextToken = function () {
            var token = this.lookahead;
            this.lastMarker.index = this.scanner.index;
            this.lastMarker.line = this.scanner.lineNumber;
            this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
            this.collectComments();
            if (this.scanner.index !== this.startMarker.index) {
                this.startMarker.index = this.scanner.index;
                this.startMarker.line = this.scanner.lineNumber;
                this.startMarker.column = this.scanner.index - this.scanner.lineStart;
            }
            var next = this.scanner.lex();
            this.hasLineTerminator = (token.lineNumber !== next.lineNumber);
            if (next && this.context.strict && next.type === 3 /* Identifier */) {
                if (this.scanner.isStrictModeReservedWord(next.value)) {
                    next.type = 4 /* Keyword */;
                }
            }
            this.lookahead = next;
            if (this.config.tokens && next.type !== 2 /* EOF */) {
                this.tokens.push(this.convertToken(next));
            }
            return token;
        };
        Parser.prototype.nextRegexToken = function () {
            this.collectComments();
            var token = this.scanner.scanRegExp();
            if (this.config.tokens) {
                // Pop the previous token, '/' or '/='
                // This is added from the lookahead token.
                this.tokens.pop();
                this.tokens.push(this.convertToken(token));
            }
            // Prime the next lookahead.
            this.lookahead = token;
            this.nextToken();
            return token;
        };
        Parser.prototype.createNode = function () {
            return {
                index: this.startMarker.index,
                line: this.startMarker.line,
                column: this.startMarker.column
            };
        };
        Parser.prototype.startNode = function (token, lastLineStart) {
            if (lastLineStart === void 0) { lastLineStart = 0; }
            var column = token.start - token.lineStart;
            var line = token.lineNumber;
            if (column < 0) {
                column += lastLineStart;
                line--;
            }
            return {
                index: token.start,
                line: line,
                column: column
            };
        };
        Parser.prototype.finalize = function (marker, node) {
            if (this.config.range) {
                node.range = [marker.index, this.lastMarker.index];
            }
            if (this.config.loc) {
                node.loc = {
                    start: {
                        line: marker.line,
                        column: marker.column,
                    },
                    end: {
                        line: this.lastMarker.line,
                        column: this.lastMarker.column
                    }
                };
                if (this.config.source) {
                    node.loc.source = this.config.source;
                }
            }
            if (this.delegate) {
                var metadata = {
                    start: {
                        line: marker.line,
                        column: marker.column,
                        offset: marker.index
                    },
                    end: {
                        line: this.lastMarker.line,
                        column: this.lastMarker.column,
                        offset: this.lastMarker.index
                    }
                };
                this.delegate(node, metadata);
            }
            return node;
        };
        // Expect the next token to match the specified punctuator.
        // If not, an exception will be thrown.
        Parser.prototype.expect = function (value) {
            var token = this.nextToken();
            if (token.type !== 7 /* Punctuator */ || token.value !== value) {
                this.throwUnexpectedToken(token);
            }
        };
        // Quietly expect a comma when in tolerant mode, otherwise delegates to expect().
        Parser.prototype.expectCommaSeparator = function () {
            if (this.config.tolerant) {
                var token = this.lookahead;
                if (token.type === 7 /* Punctuator */ && token.value === ',') {
                    this.nextToken();
                }
                else if (token.type === 7 /* Punctuator */ && token.value === ';') {
                    this.nextToken();
                    this.tolerateUnexpectedToken(token);
                }
                else {
                    this.tolerateUnexpectedToken(token, messages_1.Messages.UnexpectedToken);
                }
            }
            else {
                this.expect(',');
            }
        };
        // Expect the next token to match the specified keyword.
        // If not, an exception will be thrown.
        Parser.prototype.expectKeyword = function (keyword) {
            var token = this.nextToken();
            if (token.type !== 4 /* Keyword */ || token.value !== keyword) {
                this.throwUnexpectedToken(token);
            }
        };
        // Return true if the next token matches the specified punctuator.
        Parser.prototype.match = function (value) {
            return this.lookahead.type === 7 /* Punctuator */ && this.lookahead.value === value;
        };
        // Return true if the next token matches the specified keyword
        Parser.prototype.matchKeyword = function (keyword) {
            return this.lookahead.type === 4 /* Keyword */ && this.lookahead.value === keyword;
        };
        // Return true if the next token matches the specified contextual keyword
        // (where an identifier is sometimes a keyword depending on the context)
        Parser.prototype.matchContextualKeyword = function (keyword) {
            return this.lookahead.type === 3 /* Identifier */ && this.lookahead.value === keyword;
        };
        // Return true if the next token is an assignment operator
        Parser.prototype.matchAssign = function () {
            if (this.lookahead.type !== 7 /* Punctuator */) {
                return false;
            }
            var op = this.lookahead.value;
            return op === '=' ||
                op === '*=' ||
                op === '**=' ||
                op === '/=' ||
                op === '%=' ||
                op === '+=' ||
                op === '-=' ||
                op === '<<=' ||
                op === '>>=' ||
                op === '>>>=' ||
                op === '&=' ||
                op === '^=' ||
                op === '|=';
        };
        // Cover grammar support.
        //
        // When an assignment expression position starts with an left parenthesis, the determination of the type
        // of the syntax is to be deferred arbitrarily long until the end of the parentheses pair (plus a lookahead)
        // or the first comma. This situation also defers the determination of all the expressions nested in the pair.
        //
        // There are three productions that can be parsed in a parentheses pair that needs to be determined
        // after the outermost pair is closed. They are:
        //
        //   1. AssignmentExpression
        //   2. BindingElements
        //   3. AssignmentTargets
        //
        // In order to avoid exponential backtracking, we use two flags to denote if the production can be
        // binding element or assignment target.
        //
        // The three productions have the relationship:
        //
        //   BindingElements ⊆ AssignmentTargets ⊆ AssignmentExpression
        //
        // with a single exception that CoverInitializedName when used directly in an Expression, generates
        // an early error. Therefore, we need the third state, firstCoverInitializedNameError, to track the
        // first usage of CoverInitializedName and report it when we reached the end of the parentheses pair.
        //
        // isolateCoverGrammar function runs the given parser function with a new cover grammar context, and it does not
        // effect the current flags. This means the production the parser parses is only used as an expression. Therefore
        // the CoverInitializedName check is conducted.
        //
        // inheritCoverGrammar function runs the given parse function with a new cover grammar context, and it propagates
        // the flags outside of the parser. This means the production the parser parses is used as a part of a potential
        // pattern. The CoverInitializedName check is deferred.
        Parser.prototype.isolateCoverGrammar = function (parseFunction) {
            var previousIsBindingElement = this.context.isBindingElement;
            var previousIsAssignmentTarget = this.context.isAssignmentTarget;
            var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
            this.context.isBindingElement = true;
            this.context.isAssignmentTarget = true;
            this.context.firstCoverInitializedNameError = null;
            var result = parseFunction.call(this);
            if (this.context.firstCoverInitializedNameError !== null) {
                this.throwUnexpectedToken(this.context.firstCoverInitializedNameError);
            }
            this.context.isBindingElement = previousIsBindingElement;
            this.context.isAssignmentTarget = previousIsAssignmentTarget;
            this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError;
            return result;
        };
        Parser.prototype.inheritCoverGrammar = function (parseFunction) {
            var previousIsBindingElement = this.context.isBindingElement;
            var previousIsAssignmentTarget = this.context.isAssignmentTarget;
            var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
            this.context.isBindingElement = true;
            this.context.isAssignmentTarget = true;
            this.context.firstCoverInitializedNameError = null;
            var result = parseFunction.call(this);
            this.context.isBindingElement = this.context.isBindingElement && previousIsBindingElement;
            this.context.isAssignmentTarget = this.context.isAssignmentTarget && previousIsAssignmentTarget;
            this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError || this.context.firstCoverInitializedNameError;
            return result;
        };
        Parser.prototype.consumeSemicolon = function () {
            if (this.match(';')) {
                this.nextToken();
            }
            else if (!this.hasLineTerminator) {
                if (this.lookahead.type !== 2 /* EOF */ && !this.match('}')) {
                    this.throwUnexpectedToken(this.lookahead);
                }
                this.lastMarker.index = this.startMarker.index;
                this.lastMarker.line = this.startMarker.line;
                this.lastMarker.column = this.startMarker.column;
            }
        };
        // https://tc39.github.io/ecma262/#sec-primary-expression
        Parser.prototype.parsePrimaryExpression = function () {
            var node = this.createNode();
            var expr;
            var token, raw;
            switch (this.lookahead.type) {
                case 3 /* Identifier */:
                    if ((this.context.isModule || this.context.await) && this.lookahead.value === 'await') {
                        this.tolerateUnexpectedToken(this.lookahead);
                    }
                    expr = this.matchAsyncFunction() ? this.parseFunctionExpression() : this.finalize(node, new Node.Identifier(this.nextToken().value));
                    break;
                case 6 /* NumericLiteral */:
                case 8 /* StringLiteral */:
                    if (this.context.strict && this.lookahead.octal) {
                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.StrictOctalLiteral);
                    }
                    this.context.isAssignmentTarget = false;
                    this.context.isBindingElement = false;
                    token = this.nextToken();
                    raw = this.getTokenRaw(token);
                    expr = this.finalize(node, new Node.Literal(token.value, raw));
                    break;
                case 1 /* BooleanLiteral */:
                    this.context.isAssignmentTarget = false;
                    this.context.isBindingElement = false;
                    token = this.nextToken();
                    raw = this.getTokenRaw(token);
                    expr = this.finalize(node, new Node.Literal(token.value === 'true', raw));
                    break;
                case 5 /* NullLiteral */:
                    this.context.isAssignmentTarget = false;
                    this.context.isBindingElement = false;
                    token = this.nextToken();
                    raw = this.getTokenRaw(token);
                    expr = this.finalize(node, new Node.Literal(null, raw));
                    break;
                case 10 /* Template */:
                    expr = this.parseTemplateLiteral();
                    break;
                case 7 /* Punctuator */:
                    switch (this.lookahead.value) {
                        case '(':
                            this.context.isBindingElement = false;
                            expr = this.inheritCoverGrammar(this.parseGroupExpression);
                            break;
                        case '[':
                            expr = this.inheritCoverGrammar(this.parseArrayInitializer);
                            break;
                        case '{':
                            expr = this.inheritCoverGrammar(this.parseObjectInitializer);
                            break;
                        case '/':
                        case '/=':
                            this.context.isAssignmentTarget = false;
                            this.context.isBindingElement = false;
                            this.scanner.index = this.startMarker.index;
                            token = this.nextRegexToken();
                            raw = this.getTokenRaw(token);
                            expr = this.finalize(node, new Node.RegexLiteral(token.regex, raw, token.pattern, token.flags));
                            break;
                        default:
                            expr = this.throwUnexpectedToken(this.nextToken());
                    }
                    break;
                case 4 /* Keyword */:
                    if (!this.context.strict && this.context.allowYield && this.matchKeyword('yield')) {
                        expr = this.parseIdentifierName();
                    }
                    else if (!this.context.strict && this.matchKeyword('let')) {
                        expr = this.finalize(node, new Node.Identifier(this.nextToken().value));
                    }
                    else {
                        this.context.isAssignmentTarget = false;
                        this.context.isBindingElement = false;
                        if (this.matchKeyword('function')) {
                            expr = this.parseFunctionExpression();
                        }
                        else if (this.matchKeyword('this')) {
                            this.nextToken();
                            expr = this.finalize(node, new Node.ThisExpression());
                        }
                        else if (this.matchKeyword('class')) {
                            expr = this.parseClassExpression();
                        }
                        else {
                            expr = this.throwUnexpectedToken(this.nextToken());
                        }
                    }
                    break;
                default:
                    expr = this.throwUnexpectedToken(this.nextToken());
            }
            return expr;
        };
        // https://tc39.github.io/ecma262/#sec-array-initializer
        Parser.prototype.parseSpreadElement = function () {
            var node = this.createNode();
            this.expect('...');
            var arg = this.inheritCoverGrammar(this.parseAssignmentExpression);
            return this.finalize(node, new Node.SpreadElement(arg));
        };
        Parser.prototype.parseArrayInitializer = function () {
            var node = this.createNode();
            var elements = [];
            this.expect('[');
            while (!this.match(']')) {
                if (this.match(',')) {
                    this.nextToken();
                    elements.push(null);
                }
                else if (this.match('...')) {
                    var element = this.parseSpreadElement();
                    if (!this.match(']')) {
                        this.context.isAssignmentTarget = false;
                        this.context.isBindingElement = false;
                        this.expect(',');
                    }
                    elements.push(element);
                }
                else {
                    elements.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
                    if (!this.match(']')) {
                        this.expect(',');
                    }
                }
            }
            this.expect(']');
            return this.finalize(node, new Node.ArrayExpression(elements));
        };
        // https://tc39.github.io/ecma262/#sec-object-initializer
        Parser.prototype.parsePropertyMethod = function (params) {
            this.context.isAssignmentTarget = false;
            this.context.isBindingElement = false;
            var previousStrict = this.context.strict;
            var previousAllowStrictDirective = this.context.allowStrictDirective;
            this.context.allowStrictDirective = params.simple;
            var body = this.isolateCoverGrammar(this.parseFunctionSourceElements);
            if (this.context.strict && params.firstRestricted) {
                this.tolerateUnexpectedToken(params.firstRestricted, params.message);
            }
            if (this.context.strict && params.stricted) {
                this.tolerateUnexpectedToken(params.stricted, params.message);
            }
            this.context.strict = previousStrict;
            this.context.allowStrictDirective = previousAllowStrictDirective;
            return body;
        };
        Parser.prototype.parsePropertyMethodFunction = function () {
            var isGenerator = false;
            var node = this.createNode();
            var previousAllowYield = this.context.allowYield;
            this.context.allowYield = true;
            var params = this.parseFormalParameters();
            var method = this.parsePropertyMethod(params);
            this.context.allowYield = previousAllowYield;
            return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
        };
        Parser.prototype.parsePropertyMethodAsyncFunction = function () {
            var node = this.createNode();
            var previousAllowYield = this.context.allowYield;
            var previousAwait = this.context.await;
            this.context.allowYield = false;
            this.context.await = true;
            var params = this.parseFormalParameters();
            var method = this.parsePropertyMethod(params);
            this.context.allowYield = previousAllowYield;
            this.context.await = previousAwait;
            return this.finalize(node, new Node.AsyncFunctionExpression(null, params.params, method));
        };
        Parser.prototype.parseObjectPropertyKey = function () {
            var node = this.createNode();
            var token = this.nextToken();
            var key;
            switch (token.type) {
                case 8 /* StringLiteral */:
                case 6 /* NumericLiteral */:
                    if (this.context.strict && token.octal) {
                        this.tolerateUnexpectedToken(token, messages_1.Messages.StrictOctalLiteral);
                    }
                    var raw = this.getTokenRaw(token);
                    key = this.finalize(node, new Node.Literal(token.value, raw));
                    break;
                case 3 /* Identifier */:
                case 1 /* BooleanLiteral */:
                case 5 /* NullLiteral */:
                case 4 /* Keyword */:
                    key = this.finalize(node, new Node.Identifier(token.value));
                    break;
                case 7 /* Punctuator */:
                    if (token.value === '[') {
                        key = this.isolateCoverGrammar(this.parseAssignmentExpression);
                        this.expect(']');
                    }
                    else {
                        key = this.throwUnexpectedToken(token);
                    }
                    break;
                default:
                    key = this.throwUnexpectedToken(token);
            }
            return key;
        };
        Parser.prototype.isPropertyKey = function (key, value) {
            return (key.type === syntax_1.Syntax.Identifier && key.name === value) ||
                (key.type === syntax_1.Syntax.Literal && key.value === value);
        };
        Parser.prototype.parseObjectProperty = function (hasProto) {
            var node = this.createNode();
            var token = this.lookahead;
            var kind;
            var key = null;
            var value = null;
            var computed = false;
            var method = false;
            var shorthand = false;
            var isAsync = false;
            if (token.type === 3 /* Identifier */) {
                var id = token.value;
                this.nextToken();
                computed = this.match('[');
                isAsync = !this.hasLineTerminator && (id === 'async') &&
                    !this.match(':') && !this.match('(') && !this.match('*') && !this.match(',');
                key = isAsync ? this.parseObjectPropertyKey() : this.finalize(node, new Node.Identifier(id));
            }
            else if (this.match('*')) {
                this.nextToken();
            }
            else {
                computed = this.match('[');
                key = this.parseObjectPropertyKey();
            }
            var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
            if (token.type === 3 /* Identifier */ && !isAsync && token.value === 'get' && lookaheadPropertyKey) {
                kind = 'get';
                computed = this.match('[');
                key = this.parseObjectPropertyKey();
                this.context.allowYield = false;
                value = this.parseGetterMethod();
            }
            else if (token.type === 3 /* Identifier */ && !isAsync && token.value === 'set' && lookaheadPropertyKey) {
                kind = 'set';
                computed = this.match('[');
                key = this.parseObjectPropertyKey();
                value = this.parseSetterMethod();
            }
            else if (token.type === 7 /* Punctuator */ && token.value === '*' && lookaheadPropertyKey) {
                kind = 'init';
                computed = this.match('[');
                key = this.parseObjectPropertyKey();
                value = this.parseGeneratorMethod();
                method = true;
            }
            else {
                if (!key) {
                    this.throwUnexpectedToken(this.lookahead);
                }
                kind = 'init';
                if (this.match(':') && !isAsync) {
                    if (!computed && this.isPropertyKey(key, '__proto__')) {
                        if (hasProto.value) {
                            this.tolerateError(messages_1.Messages.DuplicateProtoProperty);
                        }
                        hasProto.value = true;
                    }
                    this.nextToken();
                    value = this.inheritCoverGrammar(this.parseAssignmentExpression);
                }
                else if (this.match('(')) {
                    value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
                    method = true;
                }
                else if (token.type === 3 /* Identifier */) {
                    var id = this.finalize(node, new Node.Identifier(token.value));
                    if (this.match('=')) {
                        this.context.firstCoverInitializedNameError = this.lookahead;
                        this.nextToken();
                        shorthand = true;
                        var init = this.isolateCoverGrammar(this.parseAssignmentExpression);
                        value = this.finalize(node, new Node.AssignmentPattern(id, init));
                    }
                    else {
                        shorthand = true;
                        value = id;
                    }
                }
                else {
                    this.throwUnexpectedToken(this.nextToken());
                }
            }
            return this.finalize(node, new Node.Property(kind, key, computed, value, method, shorthand));
        };
        Parser.prototype.parseObjectInitializer = function () {
            var node = this.createNode();
            this.expect('{');
            var properties = [];
            var hasProto = { value: false };
            while (!this.match('}')) {
                properties.push(this.parseObjectProperty(hasProto));
                if (!this.match('}')) {
                    this.expectCommaSeparator();
                }
            }
            this.expect('}');
            return this.finalize(node, new Node.ObjectExpression(properties));
        };
        // https://tc39.github.io/ecma262/#sec-template-literals
        Parser.prototype.parseTemplateHead = function () {
            assert_1.assert(this.lookahead.head, 'Template literal must start with a template head');
            var node = this.createNode();
            var token = this.nextToken();
            var raw = token.value;
            var cooked = token.cooked;
            return this.finalize(node, new Node.TemplateElement({ raw: raw, cooked: cooked }, token.tail));
        };
        Parser.prototype.parseTemplateElement = function () {
            if (this.lookahead.type !== 10 /* Template */) {
                this.throwUnexpectedToken();
            }
            var node = this.createNode();
            var token = this.nextToken();
            var raw = token.value;
            var cooked = token.cooked;
            return this.finalize(node, new Node.TemplateElement({ raw: raw, cooked: cooked }, token.tail));
        };
        Parser.prototype.parseTemplateLiteral = function () {
            var node = this.createNode();
            var expressions = [];
            var quasis = [];
            var quasi = this.parseTemplateHead();
            quasis.push(quasi);
            while (!quasi.tail) {
                expressions.push(this.parseExpression());
                quasi = this.parseTemplateElement();
                quasis.push(quasi);
            }
            return this.finalize(node, new Node.TemplateLiteral(quasis, expressions));
        };
        // https://tc39.github.io/ecma262/#sec-grouping-operator
        Parser.prototype.reinterpretExpressionAsPattern = function (expr) {
            switch (expr.type) {
                case syntax_1.Syntax.Identifier:
                case syntax_1.Syntax.MemberExpression:
                case syntax_1.Syntax.RestElement:
                case syntax_1.Syntax.AssignmentPattern:
                    break;
                case syntax_1.Syntax.SpreadElement:
                    expr.type = syntax_1.Syntax.RestElement;
                    this.reinterpretExpressionAsPattern(expr.argument);
                    break;
                case syntax_1.Syntax.ArrayExpression:
                    expr.type = syntax_1.Syntax.ArrayPattern;
                    for (var i = 0; i < expr.elements.length; i++) {
                        if (expr.elements[i] !== null) {
                            this.reinterpretExpressionAsPattern(expr.elements[i]);
                        }
                    }
                    break;
                case syntax_1.Syntax.ObjectExpression:
                    expr.type = syntax_1.Syntax.ObjectPattern;
                    for (var i = 0; i < expr.properties.length; i++) {
                        this.reinterpretExpressionAsPattern(expr.properties[i].value);
                    }
                    break;
                case syntax_1.Syntax.AssignmentExpression:
                    expr.type = syntax_1.Syntax.AssignmentPattern;
                    delete expr.operator;
                    this.reinterpretExpressionAsPattern(expr.left);
                    break;
                default:
                    // Allow other node type for tolerant parsing.
                    break;
            }
        };
        Parser.prototype.parseGroupExpression = function () {
            var expr;
            this.expect('(');
            if (this.match(')')) {
                this.nextToken();
                if (!this.match('=>')) {
                    this.expect('=>');
                }
                expr = {
                    type: ArrowParameterPlaceHolder,
                    params: [],
                    async: false
                };
            }
            else {
                var startToken = this.lookahead;
                var params = [];
                if (this.match('...')) {
                    expr = this.parseRestElement(params);
                    this.expect(')');
                    if (!this.match('=>')) {
                        this.expect('=>');
                    }
                    expr = {
                        type: ArrowParameterPlaceHolder,
                        params: [expr],
                        async: false
                    };
                }
                else {
                    var arrow = false;
                    this.context.isBindingElement = true;
                    expr = this.inheritCoverGrammar(this.parseAssignmentExpression);
                    if (this.match(',')) {
                        var expressions = [];
                        this.context.isAssignmentTarget = false;
                        expressions.push(expr);
                        while (this.lookahead.type !== 2 /* EOF */) {
                            if (!this.match(',')) {
                                break;
                            }
                            this.nextToken();
                            if (this.match(')')) {
                                this.nextToken();
                                for (var i = 0; i < expressions.length; i++) {
                                    this.reinterpretExpressionAsPattern(expressions[i]);
                                }
                                arrow = true;
                                expr = {
                                    type: ArrowParameterPlaceHolder,
                                    params: expressions,
                                    async: false
                                };
                            }
                            else if (this.match('...')) {
                                if (!this.context.isBindingElement) {
                                    this.throwUnexpectedToken(this.lookahead);
                                }
                                expressions.push(this.parseRestElement(params));
                                this.expect(')');
                                if (!this.match('=>')) {
                                    this.expect('=>');
                                }
                                this.context.isBindingElement = false;
                                for (var i = 0; i < expressions.length; i++) {
                                    this.reinterpretExpressionAsPattern(expressions[i]);
                                }
                                arrow = true;
                                expr = {
                                    type: ArrowParameterPlaceHolder,
                                    params: expressions,
                                    async: false
                                };
                            }
                            else {
                                expressions.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
                            }
                            if (arrow) {
                                break;
                            }
                        }
                        if (!arrow) {
                            expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
                        }
                    }
                    if (!arrow) {
                        this.expect(')');
                        if (this.match('=>')) {
                            if (expr.type === syntax_1.Syntax.Identifier && expr.name === 'yield') {
                                arrow = true;
                                expr = {
                                    type: ArrowParameterPlaceHolder,
                                    params: [expr],
                                    async: false
                                };
                            }
                            if (!arrow) {
                                if (!this.context.isBindingElement) {
                                    this.throwUnexpectedToken(this.lookahead);
                                }
                                if (expr.type === syntax_1.Syntax.SequenceExpression) {
                                    for (var i = 0; i < expr.expressions.length; i++) {
                                        this.reinterpretExpressionAsPattern(expr.expressions[i]);
                                    }
                                }
                                else {
                                    this.reinterpretExpressionAsPattern(expr);
                                }
                                var parameters = (expr.type === syntax_1.Syntax.SequenceExpression ? expr.expressions : [expr]);
                                expr = {
                                    type: ArrowParameterPlaceHolder,
                                    params: parameters,
                                    async: false
                                };
                            }
                        }
                        this.context.isBindingElement = false;
                    }
                }
            }
            return expr;
        };
        // https://tc39.github.io/ecma262/#sec-left-hand-side-expressions
        Parser.prototype.parseArguments = function () {
            this.expect('(');
            var args = [];
            if (!this.match(')')) {
                while (true) {
                    var expr = this.match('...') ? this.parseSpreadElement() :
                        this.isolateCoverGrammar(this.parseAssignmentExpression);
                    args.push(expr);
                    if (this.match(')')) {
                        break;
                    }
                    this.expectCommaSeparator();
                    if (this.match(')')) {
                        break;
                    }
                }
            }
            this.expect(')');
            return args;
        };
        Parser.prototype.isIdentifierName = function (token) {
            return token.type === 3 /* Identifier */ ||
                token.type === 4 /* Keyword */ ||
                token.type === 1 /* BooleanLiteral */ ||
                token.type === 5 /* NullLiteral */;
        };
        Parser.prototype.parseIdentifierName = function () {
            var node = this.createNode();
            var token = this.nextToken();
            if (!this.isIdentifierName(token)) {
                this.throwUnexpectedToken(token);
            }
            return this.finalize(node, new Node.Identifier(token.value));
        };
        Parser.prototype.parseNewExpression = function () {
            var node = this.createNode();
            var id = this.parseIdentifierName();
            assert_1.assert(id.name === 'new', 'New expression must start with `new`');
            var expr;
            if (this.match('.')) {
                this.nextToken();
                if (this.lookahead.type === 3 /* Identifier */ && this.context.inFunctionBody && this.lookahead.value === 'target') {
                    var property = this.parseIdentifierName();
                    expr = new Node.MetaProperty(id, property);
                }
                else {
                    this.throwUnexpectedToken(this.lookahead);
                }
            }
            else {
                var callee = this.isolateCoverGrammar(this.parseLeftHandSideExpression);
                var args = this.match('(') ? this.parseArguments() : [];
                expr = new Node.NewExpression(callee, args);
                this.context.isAssignmentTarget = false;
                this.context.isBindingElement = false;
            }
            return this.finalize(node, expr);
        };
        Parser.prototype.parseAsyncArgument = function () {
            var arg = this.parseAssignmentExpression();
            this.context.firstCoverInitializedNameError = null;
            return arg;
        };
        Parser.prototype.parseAsyncArguments = function () {
            this.expect('(');
            var args = [];
            if (!this.match(')')) {
                while (true) {
                    var expr = this.match('...') ? this.parseSpreadElement() :
                        this.isolateCoverGrammar(this.parseAsyncArgument);
                    args.push(expr);
                    if (this.match(')')) {
                        break;
                    }
                    this.expectCommaSeparator();
                    if (this.match(')')) {
                        break;
                    }
                }
            }
            this.expect(')');
            return args;
        };
        Parser.prototype.parseLeftHandSideExpressionAllowCall = function () {
            var startToken = this.lookahead;
            var maybeAsync = this.matchContextualKeyword('async');
            var previousAllowIn = this.context.allowIn;
            this.context.allowIn = true;
            var expr;
            if (this.matchKeyword('super') && this.context.inFunctionBody) {
                expr = this.createNode();
                this.nextToken();
                expr = this.finalize(expr, new Node.Super());
                if (!this.match('(') && !this.match('.') && !this.match('[')) {
                    this.throwUnexpectedToken(this.lookahead);
                }
            }
            else {
                expr = this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
            }
            while (true) {
                if (this.match('.')) {
                    this.context.isBindingElement = false;
                    this.context.isAssignmentTarget = true;
                    this.expect('.');
                    var property = this.parseIdentifierName();
                    expr = this.finalize(this.startNode(startToken), new Node.StaticMemberExpression(expr, property));
                }
                else if (this.match('(')) {
                    var asyncArrow = maybeAsync && (startToken.lineNumber === this.lookahead.lineNumber);
                    this.context.isBindingElement = false;
                    this.context.isAssignmentTarget = false;
                    var args = asyncArrow ? this.parseAsyncArguments() : this.parseArguments();
                    expr = this.finalize(this.startNode(startToken), new Node.CallExpression(expr, args));
                    if (asyncArrow && this.match('=>')) {
                        for (var i = 0; i < args.length; ++i) {
                            this.reinterpretExpressionAsPattern(args[i]);
                        }
                        expr = {
                            type: ArrowParameterPlaceHolder,
                            params: args,
                            async: true
                        };
                    }
                }
                else if (this.match('[')) {
                    this.context.isBindingElement = false;
                    this.context.isAssignmentTarget = true;
                    this.expect('[');
                    var property = this.isolateCoverGrammar(this.parseExpression);
                    this.expect(']');
                    expr = this.finalize(this.startNode(startToken), new Node.ComputedMemberExpression(expr, property));
                }
                else if (this.lookahead.type === 10 /* Template */ && this.lookahead.head) {
                    var quasi = this.parseTemplateLiteral();
                    expr = this.finalize(this.startNode(startToken), new Node.TaggedTemplateExpression(expr, quasi));
                }
                else {
                    break;
                }
            }
            this.context.allowIn = previousAllowIn;
            return expr;
        };
        Parser.prototype.parseSuper = function () {
            var node = this.createNode();
            this.expectKeyword('super');
            if (!this.match('[') && !this.match('.')) {
                this.throwUnexpectedToken(this.lookahead);
            }
            return this.finalize(node, new Node.Super());
        };
        Parser.prototype.parseLeftHandSideExpression = function () {
            assert_1.assert(this.context.allowIn, 'callee of new expression always allow in keyword.');
            var node = this.startNode(this.lookahead);
            var expr = (this.matchKeyword('super') && this.context.inFunctionBody) ? this.parseSuper() :
                this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
            while (true) {
                if (this.match('[')) {
                    this.context.isBindingElement = false;
                    this.context.isAssignmentTarget = true;
                    this.expect('[');
                    var property = this.isolateCoverGrammar(this.parseExpression);
                    this.expect(']');
                    expr = this.finalize(node, new Node.ComputedMemberExpression(expr, property));
                }
                else if (this.match('.')) {
                    this.context.isBindingElement = false;
                    this.context.isAssignmentTarget = true;
                    this.expect('.');
                    var property = this.parseIdentifierName();
                    expr = this.finalize(node, new Node.StaticMemberExpression(expr, property));
                }
                else if (this.lookahead.type === 10 /* Template */ && this.lookahead.head) {
                    var quasi = this.parseTemplateLiteral();
                    expr = this.finalize(node, new Node.TaggedTemplateExpression(expr, quasi));
                }
                else {
                    break;
                }
            }
            return expr;
        };
        // https://tc39.github.io/ecma262/#sec-update-expressions
        Parser.prototype.parseUpdateExpression = function () {
            var expr;
            var startToken = this.lookahead;
            if (this.match('++') || this.match('--')) {
                var node = this.startNode(startToken);
                var token = this.nextToken();
                expr = this.inheritCoverGrammar(this.parseUnaryExpression);
                if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
                    this.tolerateError(messages_1.Messages.StrictLHSPrefix);
                }
                if (!this.context.isAssignmentTarget) {
                    this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
                }
                var prefix = true;
                expr = this.finalize(node, new Node.UpdateExpression(token.value, expr, prefix));
                this.context.isAssignmentTarget = false;
                this.context.isBindingElement = false;
            }
            else {
                expr = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
                if (!this.hasLineTerminator && this.lookahead.type === 7 /* Punctuator */) {
                    if (this.match('++') || this.match('--')) {
                        if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
                            this.tolerateError(messages_1.Messages.StrictLHSPostfix);
                        }
                        if (!this.context.isAssignmentTarget) {
                            this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
                        }
                        this.context.isAssignmentTarget = false;
                        this.context.isBindingElement = false;
                        var operator = this.nextToken().value;
                        var prefix = false;
                        expr = this.finalize(this.startNode(startToken), new Node.UpdateExpression(operator, expr, prefix));
                    }
                }
            }
            return expr;
        };
        // https://tc39.github.io/ecma262/#sec-unary-operators
        Parser.prototype.parseAwaitExpression = function () {
            var node = this.createNode();
            this.nextToken();
            var argument = this.parseUnaryExpression();
            return this.finalize(node, new Node.AwaitExpression(argument));
        };
        Parser.prototype.parseUnaryExpression = function () {
            var expr;
            if (this.match('+') || this.match('-') || this.match('~') || this.match('!') ||
                this.matchKeyword('delete') || this.matchKeyword('void') || this.matchKeyword('typeof')) {
                var node = this.startNode(this.lookahead);
                var token = this.nextToken();
                expr = this.inheritCoverGrammar(this.parseUnaryExpression);
                expr = this.finalize(node, new Node.UnaryExpression(token.value, expr));
                if (this.context.strict && expr.operator === 'delete' && expr.argument.type === syntax_1.Syntax.Identifier) {
                    this.tolerateError(messages_1.Messages.StrictDelete);
                }
                this.context.isAssignmentTarget = false;
                this.context.isBindingElement = false;
            }
            else if (this.context.await && this.matchContextualKeyword('await')) {
                expr = this.parseAwaitExpression();
            }
            else {
                expr = this.parseUpdateExpression();
            }
            return expr;
        };
        Parser.prototype.parseExponentiationExpression = function () {
            var startToken = this.lookahead;
            var expr = this.inheritCoverGrammar(this.parseUnaryExpression);
            if (expr.type !== syntax_1.Syntax.UnaryExpression && this.match('**')) {
                this.nextToken();
                this.context.isAssignmentTarget = false;
                this.context.isBindingElement = false;
                var left = expr;
                var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
                expr = this.finalize(this.startNode(startToken), new Node.BinaryExpression('**', left, right));
            }
            return expr;
        };
        // https://tc39.github.io/ecma262/#sec-exp-operator
        // https://tc39.github.io/ecma262/#sec-multiplicative-operators
        // https://tc39.github.io/ecma262/#sec-additive-operators
        // https://tc39.github.io/ecma262/#sec-bitwise-shift-operators
        // https://tc39.github.io/ecma262/#sec-relational-operators
        // https://tc39.github.io/ecma262/#sec-equality-operators
        // https://tc39.github.io/ecma262/#sec-binary-bitwise-operators
        // https://tc39.github.io/ecma262/#sec-binary-logical-operators
        Parser.prototype.binaryPrecedence = function (token) {
            var op = token.value;
            var precedence;
            if (token.type === 7 /* Punctuator */) {
                precedence = this.operatorPrecedence[op] || 0;
            }
            else if (token.type === 4 /* Keyword */) {
                precedence = (op === 'instanceof' || (this.context.allowIn && op === 'in')) ? 7 : 0;
            }
            else {
                precedence = 0;
            }
            return precedence;
        };
        Parser.prototype.parseBinaryExpression = function () {
            var startToken = this.lookahead;
            var expr = this.inheritCoverGrammar(this.parseExponentiationExpression);
            var token = this.lookahead;
            var prec = this.binaryPrecedence(token);
            if (prec > 0) {
                this.nextToken();
                this.context.isAssignmentTarget = false;
                this.context.isBindingElement = false;
                var markers = [startToken, this.lookahead];
                var left = expr;
                var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
                var stack = [left, token.value, right];
                var precedences = [prec];
                while (true) {
                    prec = this.binaryPrecedence(this.lookahead);
                    if (prec <= 0) {
                        break;
                    }
                    // Reduce: make a binary expression from the three topmost entries.
                    while ((stack.length > 2) && (prec <= precedences[precedences.length - 1])) {
                        right = stack.pop();
                        var operator = stack.pop();
                        precedences.pop();
                        left = stack.pop();
                        markers.pop();
                        var node = this.startNode(markers[markers.length - 1]);
                        stack.push(this.finalize(node, new Node.BinaryExpression(operator, left, right)));
                    }
                    // Shift.
                    stack.push(this.nextToken().value);
                    precedences.push(prec);
                    markers.push(this.lookahead);
                    stack.push(this.isolateCoverGrammar(this.parseExponentiationExpression));
                }
                // Final reduce to clean-up the stack.
                var i = stack.length - 1;
                expr = stack[i];
                var lastMarker = markers.pop();
                while (i > 1) {
                    var marker = markers.pop();
                    var lastLineStart = lastMarker && lastMarker.lineStart;
                    var node = this.startNode(marker, lastLineStart);
                    var operator = stack[i - 1];
                    expr = this.finalize(node, new Node.BinaryExpression(operator, stack[i - 2], expr));
                    i -= 2;
                    lastMarker = marker;
                }
            }
            return expr;
        };
        // https://tc39.github.io/ecma262/#sec-conditional-operator
        Parser.prototype.parseConditionalExpression = function () {
            var startToken = this.lookahead;
            var expr = this.inheritCoverGrammar(this.parseBinaryExpression);
            if (this.match('?')) {
                this.nextToken();
                var previousAllowIn = this.context.allowIn;
                this.context.allowIn = true;
                var consequent = this.isolateCoverGrammar(this.parseAssignmentExpression);
                this.context.allowIn = previousAllowIn;
                this.expect(':');
                var alternate = this.isolateCoverGrammar(this.parseAssignmentExpression);
                expr = this.finalize(this.startNode(startToken), new Node.ConditionalExpression(expr, consequent, alternate));
                this.context.isAssignmentTarget = false;
                this.context.isBindingElement = false;
            }
            return expr;
        };
        // https://tc39.github.io/ecma262/#sec-assignment-operators
        Parser.prototype.checkPatternParam = function (options, param) {
            switch (param.type) {
                case syntax_1.Syntax.Identifier:
                    this.validateParam(options, param, param.name);
                    break;
                case syntax_1.Syntax.RestElement:
                    this.checkPatternParam(options, param.argument);
                    break;
                case syntax_1.Syntax.AssignmentPattern:
                    this.checkPatternParam(options, param.left);
                    break;
                case syntax_1.Syntax.ArrayPattern:
                    for (var i = 0; i < param.elements.length; i++) {
                        if (param.elements[i] !== null) {
                            this.checkPatternParam(options, param.elements[i]);
                        }
                    }
                    break;
                case syntax_1.Syntax.ObjectPattern:
                    for (var i = 0; i < param.properties.length; i++) {
                        this.checkPatternParam(options, param.properties[i].value);
                    }
                    break;
                default:
                    break;
            }
            options.simple = options.simple && (param instanceof Node.Identifier);
        };
        Parser.prototype.reinterpretAsCoverFormalsList = function (expr) {
            var params = [expr];
            var options;
            var asyncArrow = false;
            switch (expr.type) {
                case syntax_1.Syntax.Identifier:
                    break;
                case ArrowParameterPlaceHolder:
                    params = expr.params;
                    asyncArrow = expr.async;
                    break;
                default:
                    return null;
            }
            options = {
                simple: true,
                paramSet: {}
            };
            for (var i = 0; i < params.length; ++i) {
                var param = params[i];
                if (param.type === syntax_1.Syntax.AssignmentPattern) {
                    if (param.right.type === syntax_1.Syntax.YieldExpression) {
                        if (param.right.argument) {
                            this.throwUnexpectedToken(this.lookahead);
                        }
                        param.right.type = syntax_1.Syntax.Identifier;
                        param.right.name = 'yield';
                        delete param.right.argument;
                        delete param.right.delegate;
                    }
                }
                else if (asyncArrow && param.type === syntax_1.Syntax.Identifier && param.name === 'await') {
                    this.throwUnexpectedToken(this.lookahead);
                }
                this.checkPatternParam(options, param);
                params[i] = param;
            }
            if (this.context.strict || !this.context.allowYield) {
                for (var i = 0; i < params.length; ++i) {
                    var param = params[i];
                    if (param.type === syntax_1.Syntax.YieldExpression) {
                        this.throwUnexpectedToken(this.lookahead);
                    }
                }
            }
            if (options.message === messages_1.Messages.StrictParamDupe) {
                var token = this.context.strict ? options.stricted : options.firstRestricted;
                this.throwUnexpectedToken(token, options.message);
            }
            return {
                simple: options.simple,
                params: params,
                stricted: options.stricted,
                firstRestricted: options.firstRestricted,
                message: options.message
            };
        };
        Parser.prototype.parseAssignmentExpression = function () {
            var expr;
            if (!this.context.allowYield && this.matchKeyword('yield')) {
                expr = this.parseYieldExpression();
            }
            else {
                var startToken = this.lookahead;
                var token = startToken;
                expr = this.parseConditionalExpression();
                if (token.type === 3 /* Identifier */ && (token.lineNumber === this.lookahead.lineNumber) && token.value === 'async') {
                    if (this.lookahead.type === 3 /* Identifier */ || this.matchKeyword('yield')) {
                        var arg = this.parsePrimaryExpression();
                        this.reinterpretExpressionAsPattern(arg);
                        expr = {
                            type: ArrowParameterPlaceHolder,
                            params: [arg],
                            async: true
                        };
                    }
                }
                if (expr.type === ArrowParameterPlaceHolder || this.match('=>')) {
                    // https://tc39.github.io/ecma262/#sec-arrow-function-definitions
                    this.context.isAssignmentTarget = false;
                    this.context.isBindingElement = false;
                    var isAsync = expr.async;
                    var list = this.reinterpretAsCoverFormalsList(expr);
                    if (list) {
                        if (this.hasLineTerminator) {
                            this.tolerateUnexpectedToken(this.lookahead);
                        }
                        this.context.firstCoverInitializedNameError = null;
                        var previousStrict = this.context.strict;
                        var previousAllowStrictDirective = this.context.allowStrictDirective;
                        this.context.allowStrictDirective = list.simple;
                        var previousAllowYield = this.context.allowYield;
                        var previousAwait = this.context.await;
                        this.context.allowYield = true;
                        this.context.await = isAsync;
                        var node = this.startNode(startToken);
                        this.expect('=>');
                        var body = void 0;
                        if (this.match('{')) {
                            var previousAllowIn = this.context.allowIn;
                            this.context.allowIn = true;
                            body = this.parseFunctionSourceElements();
                            this.context.allowIn = previousAllowIn;
                        }
                        else {
                            body = this.isolateCoverGrammar(this.parseAssignmentExpression);
                        }
                        var expression = body.type !== syntax_1.Syntax.BlockStatement;
                        if (this.context.strict && list.firstRestricted) {
                            this.throwUnexpectedToken(list.firstRestricted, list.message);
                        }
                        if (this.context.strict && list.stricted) {
                            this.tolerateUnexpectedToken(list.stricted, list.message);
                        }
                        expr = isAsync ? this.finalize(node, new Node.AsyncArrowFunctionExpression(list.params, body, expression)) :
                            this.finalize(node, new Node.ArrowFunctionExpression(list.params, body, expression));
                        this.context.strict = previousStrict;
                        this.context.allowStrictDirective = previousAllowStrictDirective;
                        this.context.allowYield = previousAllowYield;
                        this.context.await = previousAwait;
                    }
                }
                else {
                    if (this.matchAssign()) {
                        if (!this.context.isAssignmentTarget) {
                            this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
                        }
                        if (this.context.strict && expr.type === syntax_1.Syntax.Identifier) {
                            var id = expr;
                            if (this.scanner.isRestrictedWord(id.name)) {
                                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictLHSAssignment);
                            }
                            if (this.scanner.isStrictModeReservedWord(id.name)) {
                                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
                            }
                        }
                        if (!this.match('=')) {
                            this.context.isAssignmentTarget = false;
                            this.context.isBindingElement = false;
                        }
                        else {
                            this.reinterpretExpressionAsPattern(expr);
                        }
                        token = this.nextToken();
                        var operator = token.value;
                        var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
                        expr = this.finalize(this.startNode(startToken), new Node.AssignmentExpression(operator, expr, right));
                        this.context.firstCoverInitializedNameError = null;
                    }
                }
            }
            return expr;
        };
        // https://tc39.github.io/ecma262/#sec-comma-operator
        Parser.prototype.parseExpression = function () {
            var startToken = this.lookahead;
            var expr = this.isolateCoverGrammar(this.parseAssignmentExpression);
            if (this.match(',')) {
                var expressions = [];
                expressions.push(expr);
                while (this.lookahead.type !== 2 /* EOF */) {
                    if (!this.match(',')) {
                        break;
                    }
                    this.nextToken();
                    expressions.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
                }
                expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
            }
            return expr;
        };
        // https://tc39.github.io/ecma262/#sec-block
        Parser.prototype.parseStatementListItem = function () {
            var statement;
            this.context.isAssignmentTarget = true;
            this.context.isBindingElement = true;
            if (this.lookahead.type === 4 /* Keyword */) {
                switch (this.lookahead.value) {
                    case 'export':
                        if (!this.context.isModule) {
                            this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalExportDeclaration);
                        }
                        statement = this.parseExportDeclaration();
                        break;
                    case 'import':
                        if (!this.context.isModule) {
                            this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalImportDeclaration);
                        }
                        statement = this.parseImportDeclaration();
                        break;
                    case 'const':
                        statement = this.parseLexicalDeclaration({ inFor: false });
                        break;
                    case 'function':
                        statement = this.parseFunctionDeclaration();
                        break;
                    case 'class':
                        statement = this.parseClassDeclaration();
                        break;
                    case 'let':
                        statement = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({ inFor: false }) : this.parseStatement();
                        break;
                    default:
                        statement = this.parseStatement();
                        break;
                }
            }
            else {
                statement = this.parseStatement();
            }
            return statement;
        };
        Parser.prototype.parseBlock = function () {
            var node = this.createNode();
            this.expect('{');
            var block = [];
            while (true) {
                if (this.match('}')) {
                    break;
                }
                block.push(this.parseStatementListItem());
            }
            this.expect('}');
            return this.finalize(node, new Node.BlockStatement(block));
        };
        // https://tc39.github.io/ecma262/#sec-let-and-const-declarations
        Parser.prototype.parseLexicalBinding = function (kind, options) {
            var node = this.createNode();
            var params = [];
            var id = this.parsePattern(params, kind);
            if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
                if (this.scanner.isRestrictedWord(id.name)) {
                    this.tolerateError(messages_1.Messages.StrictVarName);
                }
            }
            var init = null;
            if (kind === 'const') {
                if (!this.matchKeyword('in') && !this.matchContextualKeyword('of')) {
                    if (this.match('=')) {
                        this.nextToken();
                        init = this.isolateCoverGrammar(this.parseAssignmentExpression);
                    }
                    else {
                        this.throwError(messages_1.Messages.DeclarationMissingInitializer, 'const');
                    }
                }
            }
            else if ((!options.inFor && id.type !== syntax_1.Syntax.Identifier) || this.match('=')) {
                this.expect('=');
                init = this.isolateCoverGrammar(this.parseAssignmentExpression);
            }
            return this.finalize(node, new Node.VariableDeclarator(id, init));
        };
        Parser.prototype.parseBindingList = function (kind, options) {
            var list = [this.parseLexicalBinding(kind, options)];
            while (this.match(',')) {
                this.nextToken();
                list.push(this.parseLexicalBinding(kind, options));
            }
            return list;
        };
        Parser.prototype.isLexicalDeclaration = function () {
            var state = this.scanner.saveState();
            this.scanner.scanComments();
            var next = this.scanner.lex();
            this.scanner.restoreState(state);
            return (next.type === 3 /* Identifier */) ||
                (next.type === 7 /* Punctuator */ && next.value === '[') ||
                (next.type === 7 /* Punctuator */ && next.value === '{') ||
                (next.type === 4 /* Keyword */ && next.value === 'let') ||
                (next.type === 4 /* Keyword */ && next.value === 'yield');
        };
        Parser.prototype.parseLexicalDeclaration = function (options) {
            var node = this.createNode();
            var kind = this.nextToken().value;
            assert_1.assert(kind === 'let' || kind === 'const', 'Lexical declaration must be either let or const');
            var declarations = this.parseBindingList(kind, options);
            this.consumeSemicolon();
            return this.finalize(node, new Node.VariableDeclaration(declarations, kind));
        };
        // https://tc39.github.io/ecma262/#sec-destructuring-binding-patterns
        Parser.prototype.parseBindingRestElement = function (params, kind) {
            var node = this.createNode();
            this.expect('...');
            var arg = this.parsePattern(params, kind);
            return this.finalize(node, new Node.RestElement(arg));
        };
        Parser.prototype.parseArrayPattern = function (params, kind) {
            var node = this.createNode();
            this.expect('[');
            var elements = [];
            while (!this.match(']')) {
                if (this.match(',')) {
                    this.nextToken();
                    elements.push(null);
                }
                else {
                    if (this.match('...')) {
                        elements.push(this.parseBindingRestElement(params, kind));
                        break;
                    }
                    else {
                        elements.push(this.parsePatternWithDefault(params, kind));
                    }
                    if (!this.match(']')) {
                        this.expect(',');
                    }
                }
            }
            this.expect(']');
            return this.finalize(node, new Node.ArrayPattern(elements));
        };
        Parser.prototype.parsePropertyPattern = function (params, kind) {
            var node = this.createNode();
            var computed = false;
            var shorthand = false;
            var method = false;
            var key;
            var value;
            if (this.lookahead.type === 3 /* Identifier */) {
                var keyToken = this.lookahead;
                key = this.parseVariableIdentifier();
                var init = this.finalize(node, new Node.Identifier(keyToken.value));
                if (this.match('=')) {
                    params.push(keyToken);
                    shorthand = true;
                    this.nextToken();
                    var expr = this.parseAssignmentExpression();
                    value = this.finalize(this.startNode(keyToken), new Node.AssignmentPattern(init, expr));
                }
                else if (!this.match(':')) {
                    params.push(keyToken);
                    shorthand = true;
                    value = init;
                }
                else {
                    this.expect(':');
                    value = this.parsePatternWithDefault(params, kind);
                }
            }
            else {
                computed = this.match('[');
                key = this.parseObjectPropertyKey();
                this.expect(':');
                value = this.parsePatternWithDefault(params, kind);
            }
            return this.finalize(node, new Node.Property('init', key, computed, value, method, shorthand));
        };
        Parser.prototype.parseObjectPattern = function (params, kind) {
            var node = this.createNode();
            var properties = [];
            this.expect('{');
            while (!this.match('}')) {
                properties.push(this.parsePropertyPattern(params, kind));
                if (!this.match('}')) {
                    this.expect(',');
                }
            }
            this.expect('}');
            return this.finalize(node, new Node.ObjectPattern(properties));
        };
        Parser.prototype.parsePattern = function (params, kind) {
            var pattern;
            if (this.match('[')) {
                pattern = this.parseArrayPattern(params, kind);
            }
            else if (this.match('{')) {
                pattern = this.parseObjectPattern(params, kind);
            }
            else {
                if (this.matchKeyword('let') && (kind === 'const' || kind === 'let')) {
                    this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.LetInLexicalBinding);
                }
                params.push(this.lookahead);
                pattern = this.parseVariableIdentifier(kind);
            }
            return pattern;
        };
        Parser.prototype.parsePatternWithDefault = function (params, kind) {
            var startToken = this.lookahead;
            var pattern = this.parsePattern(params, kind);
            if (this.match('=')) {
                this.nextToken();
                var previousAllowYield = this.context.allowYield;
                this.context.allowYield = true;
                var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
                this.context.allowYield = previousAllowYield;
                pattern = this.finalize(this.startNode(startToken), new Node.AssignmentPattern(pattern, right));
            }
            return pattern;
        };
        // https://tc39.github.io/ecma262/#sec-variable-statement
        Parser.prototype.parseVariableIdentifier = function (kind) {
            var node = this.createNode();
            var token = this.nextToken();
            if (token.type === 4 /* Keyword */ && token.value === 'yield') {
                if (this.context.strict) {
                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
                }
                else if (!this.context.allowYield) {
                    this.throwUnexpectedToken(token);
                }
            }
            else if (token.type !== 3 /* Identifier */) {
                if (this.context.strict && token.type === 4 /* Keyword */ && this.scanner.isStrictModeReservedWord(token.value)) {
                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
                }
                else {
                    if (this.context.strict || token.value !== 'let' || kind !== 'var') {
                        this.throwUnexpectedToken(token);
                    }
                }
            }
            else if ((this.context.isModule || this.context.await) && token.type === 3 /* Identifier */ && token.value === 'await') {
                this.tolerateUnexpectedToken(token);
            }
            return this.finalize(node, new Node.Identifier(token.value));
        };
        Parser.prototype.parseVariableDeclaration = function (options) {
            var node = this.createNode();
            var params = [];
            var id = this.parsePattern(params, 'var');
            if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
                if (this.scanner.isRestrictedWord(id.name)) {
                    this.tolerateError(messages_1.Messages.StrictVarName);
                }
            }
            var init = null;
            if (this.match('=')) {
                this.nextToken();
                init = this.isolateCoverGrammar(this.parseAssignmentExpression);
            }
            else if (id.type !== syntax_1.Syntax.Identifier && !options.inFor) {
                this.expect('=');
            }
            return this.finalize(node, new Node.VariableDeclarator(id, init));
        };
        Parser.prototype.parseVariableDeclarationList = function (options) {
            var opt = { inFor: options.inFor };
            var list = [];
            list.push(this.parseVariableDeclaration(opt));
            while (this.match(',')) {
                this.nextToken();
                list.push(this.parseVariableDeclaration(opt));
            }
            return list;
        };
        Parser.prototype.parseVariableStatement = function () {
            var node = this.createNode();
            this.expectKeyword('var');
            var declarations = this.parseVariableDeclarationList({ inFor: false });
            this.consumeSemicolon();
            return this.finalize(node, new Node.VariableDeclaration(declarations, 'var'));
        };
        // https://tc39.github.io/ecma262/#sec-empty-statement
        Parser.prototype.parseEmptyStatement = function () {
            var node = this.createNode();
            this.expect(';');
            return this.finalize(node, new Node.EmptyStatement());
        };
        // https://tc39.github.io/ecma262/#sec-expression-statement
        Parser.prototype.parseExpressionStatement = function () {
            var node = this.createNode();
            var expr = this.parseExpression();
            this.consumeSemicolon();
            return this.finalize(node, new Node.ExpressionStatement(expr));
        };
        // https://tc39.github.io/ecma262/#sec-if-statement
        Parser.prototype.parseIfClause = function () {
            if (this.context.strict && this.matchKeyword('function')) {
                this.tolerateError(messages_1.Messages.StrictFunction);
            }
            return this.parseStatement();
        };
        Parser.prototype.parseIfStatement = function () {
            var node = this.createNode();
            var consequent;
            var alternate = null;
            this.expectKeyword('if');
            this.expect('(');
            var test = this.parseExpression();
            if (!this.match(')') && this.config.tolerant) {
                this.tolerateUnexpectedToken(this.nextToken());
                consequent = this.finalize(this.createNode(), new Node.EmptyStatement());
            }
            else {
                this.expect(')');
                consequent = this.parseIfClause();
                if (this.matchKeyword('else')) {
                    this.nextToken();
                    alternate = this.parseIfClause();
                }
            }
            return this.finalize(node, new Node.IfStatement(test, consequent, alternate));
        };
        // https://tc39.github.io/ecma262/#sec-do-while-statement
        Parser.prototype.parseDoWhileStatement = function () {
            var node = this.createNode();
            this.expectKeyword('do');
            var previousInIteration = this.context.inIteration;
            this.context.inIteration = true;
            var body = this.parseStatement();
            this.context.inIteration = previousInIteration;
            this.expectKeyword('while');
            this.expect('(');
            var test = this.parseExpression();
            if (!this.match(')') && this.config.tolerant) {
                this.tolerateUnexpectedToken(this.nextToken());
            }
            else {
                this.expect(')');
                if (this.match(';')) {
                    this.nextToken();
                }
            }
            return this.finalize(node, new Node.DoWhileStatement(body, test));
        };
        // https://tc39.github.io/ecma262/#sec-while-statement
        Parser.prototype.parseWhileStatement = function () {
            var node = this.createNode();
            var body;
            this.expectKeyword('while');
            this.expect('(');
            var test = this.parseExpression();
            if (!this.match(')') && this.config.tolerant) {
                this.tolerateUnexpectedToken(this.nextToken());
                body = this.finalize(this.createNode(), new Node.EmptyStatement());
            }
            else {
                this.expect(')');
                var previousInIteration = this.context.inIteration;
                this.context.inIteration = true;
                body = this.parseStatement();
                this.context.inIteration = previousInIteration;
            }
            return this.finalize(node, new Node.WhileStatement(test, body));
        };
        // https://tc39.github.io/ecma262/#sec-for-statement
        // https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements
        Parser.prototype.parseForStatement = function () {
            var init = null;
            var test = null;
            var update = null;
            var forIn = true;
            var left, right;
            var node = this.createNode();
            this.expectKeyword('for');
            this.expect('(');
            if (this.match(';')) {
                this.nextToken();
            }
            else {
                if (this.matchKeyword('var')) {
                    init = this.createNode();
                    this.nextToken();
                    var previousAllowIn = this.context.allowIn;
                    this.context.allowIn = false;
                    var declarations = this.parseVariableDeclarationList({ inFor: true });
                    this.context.allowIn = previousAllowIn;
                    if (declarations.length === 1 && this.matchKeyword('in')) {
                        var decl = declarations[0];
                        if (decl.init && (decl.id.type === syntax_1.Syntax.ArrayPattern || decl.id.type === syntax_1.Syntax.ObjectPattern || this.context.strict)) {
                            this.tolerateError(messages_1.Messages.ForInOfLoopInitializer, 'for-in');
                        }
                        init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
                        this.nextToken();
                        left = init;
                        right = this.parseExpression();
                        init = null;
                    }
                    else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
                        init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
                        this.nextToken();
                        left = init;
                        right = this.parseAssignmentExpression();
                        init = null;
                        forIn = false;
                    }
                    else {
                        init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
                        this.expect(';');
                    }
                }
                else if (this.matchKeyword('const') || this.matchKeyword('let')) {
                    init = this.createNode();
                    var kind = this.nextToken().value;
                    if (!this.context.strict && this.lookahead.value === 'in') {
                        init = this.finalize(init, new Node.Identifier(kind));
                        this.nextToken();
                        left = init;
                        right = this.parseExpression();
                        init = null;
                    }
                    else {
                        var previousAllowIn = this.context.allowIn;
                        this.context.allowIn = false;
                        var declarations = this.parseBindingList(kind, { inFor: true });
                        this.context.allowIn = previousAllowIn;
                        if (declarations.length === 1 && declarations[0].init === null && this.matchKeyword('in')) {
                            init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
                            this.nextToken();
                            left = init;
                            right = this.parseExpression();
                            init = null;
                        }
                        else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
                            init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
                            this.nextToken();
                            left = init;
                            right = this.parseAssignmentExpression();
                            init = null;
                            forIn = false;
                        }
                        else {
                            this.consumeSemicolon();
                            init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
                        }
                    }
                }
                else {
                    var initStartToken = this.lookahead;
                    var previousAllowIn = this.context.allowIn;
                    this.context.allowIn = false;
                    init = this.inheritCoverGrammar(this.parseAssignmentExpression);
                    this.context.allowIn = previousAllowIn;
                    if (this.matchKeyword('in')) {
                        if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
                            this.tolerateError(messages_1.Messages.InvalidLHSInForIn);
                        }
                        this.nextToken();
                        this.reinterpretExpressionAsPattern(init);
                        left = init;
                        right = this.parseExpression();
                        init = null;
                    }
                    else if (this.matchContextualKeyword('of')) {
                        if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
                            this.tolerateError(messages_1.Messages.InvalidLHSInForLoop);
                        }
                        this.nextToken();
                        this.reinterpretExpressionAsPattern(init);
                        left = init;
                        right = this.parseAssignmentExpression();
                        init = null;
                        forIn = false;
                    }
                    else {
                        if (this.match(',')) {
                            var initSeq = [init];
                            while (this.match(',')) {
                                this.nextToken();
                                initSeq.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
                            }
                            init = this.finalize(this.startNode(initStartToken), new Node.SequenceExpression(initSeq));
                        }
                        this.expect(';');
                    }
                }
            }
            if (typeof left === 'undefined') {
                if (!this.match(';')) {
                    test = this.parseExpression();
                }
                this.expect(';');
                if (!this.match(')')) {
                    update = this.parseExpression();
                }
            }
            var body;
            if (!this.match(')') && this.config.tolerant) {
                this.tolerateUnexpectedToken(this.nextToken());
                body = this.finalize(this.createNode(), new Node.EmptyStatement());
            }
            else {
                this.expect(')');
                var previousInIteration = this.context.inIteration;
                this.context.inIteration = true;
                body = this.isolateCoverGrammar(this.parseStatement);
                this.context.inIteration = previousInIteration;
            }
            return (typeof left === 'undefined') ?
                this.finalize(node, new Node.ForStatement(init, test, update, body)) :
                forIn ? this.finalize(node, new Node.ForInStatement(left, right, body)) :
                    this.finalize(node, new Node.ForOfStatement(left, right, body));
        };
        // https://tc39.github.io/ecma262/#sec-continue-statement
        Parser.prototype.parseContinueStatement = function () {
            var node = this.createNode();
            this.expectKeyword('continue');
            var label = null;
            if (this.lookahead.type === 3 /* Identifier */ && !this.hasLineTerminator) {
                var id = this.parseVariableIdentifier();
                label = id;
                var key = '$' + id.name;
                if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
                    this.throwError(messages_1.Messages.UnknownLabel, id.name);
                }
            }
            this.consumeSemicolon();
            if (label === null && !this.context.inIteration) {
                this.throwError(messages_1.Messages.IllegalContinue);
            }
            return this.finalize(node, new Node.ContinueStatement(label));
        };
        // https://tc39.github.io/ecma262/#sec-break-statement
        Parser.prototype.parseBreakStatement = function () {
            var node = this.createNode();
            this.expectKeyword('break');
            var label = null;
            if (this.lookahead.type === 3 /* Identifier */ && !this.hasLineTerminator) {
                var id = this.parseVariableIdentifier();
                var key = '$' + id.name;
                if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
                    this.throwError(messages_1.Messages.UnknownLabel, id.name);
                }
                label = id;
            }
            this.consumeSemicolon();
            if (label === null && !this.context.inIteration && !this.context.inSwitch) {
                this.throwError(messages_1.Messages.IllegalBreak);
            }
            return this.finalize(node, new Node.BreakStatement(label));
        };
        // https://tc39.github.io/ecma262/#sec-return-statement
        Parser.prototype.parseReturnStatement = function () {
            if (!this.context.inFunctionBody) {
                this.tolerateError(messages_1.Messages.IllegalReturn);
            }
            var node = this.createNode();
            this.expectKeyword('return');
            var hasArgument = (!this.match(';') && !this.match('}') &&
                !this.hasLineTerminator && this.lookahead.type !== 2 /* EOF */) ||
                this.lookahead.type === 8 /* StringLiteral */ ||
                this.lookahead.type === 10 /* Template */;
            var argument = hasArgument ? this.parseExpression() : null;
            this.consumeSemicolon();
            return this.finalize(node, new Node.ReturnStatement(argument));
        };
        // https://tc39.github.io/ecma262/#sec-with-statement
        Parser.prototype.parseWithStatement = function () {
            if (this.context.strict) {
                this.tolerateError(messages_1.Messages.StrictModeWith);
            }
            var node = this.createNode();
            var body;
            this.expectKeyword('with');
            this.expect('(');
            var object = this.parseExpression();
            if (!this.match(')') && this.config.tolerant) {
                this.tolerateUnexpectedToken(this.nextToken());
                body = this.finalize(this.createNode(), new Node.EmptyStatement());
            }
            else {
                this.expect(')');
                body = this.parseStatement();
            }
            return this.finalize(node, new Node.WithStatement(object, body));
        };
        // https://tc39.github.io/ecma262/#sec-switch-statement
        Parser.prototype.parseSwitchCase = function () {
            var node = this.createNode();
            var test;
            if (this.matchKeyword('default')) {
                this.nextToken();
                test = null;
            }
            else {
                this.expectKeyword('case');
                test = this.parseExpression();
            }
            this.expect(':');
            var consequent = [];
            while (true) {
                if (this.match('}') || this.matchKeyword('default') || this.matchKeyword('case')) {
                    break;
                }
                consequent.push(this.parseStatementListItem());
            }
            return this.finalize(node, new Node.SwitchCase(test, consequent));
        };
        Parser.prototype.parseSwitchStatement = function () {
            var node = this.createNode();
            this.expectKeyword('switch');
            this.expect('(');
            var discriminant = this.parseExpression();
            this.expect(')');
            var previousInSwitch = this.context.inSwitch;
            this.context.inSwitch = true;
            var cases = [];
            var defaultFound = false;
            this.expect('{');
            while (true) {
                if (this.match('}')) {
                    break;
                }
                var clause = this.parseSwitchCase();
                if (clause.test === null) {
                    if (defaultFound) {
                        this.throwError(messages_1.Messages.MultipleDefaultsInSwitch);
                    }
                    defaultFound = true;
                }
                cases.push(clause);
            }
            this.expect('}');
            this.context.inSwitch = previousInSwitch;
            return this.finalize(node, new Node.SwitchStatement(discriminant, cases));
        };
        // https://tc39.github.io/ecma262/#sec-labelled-statements
        Parser.prototype.parseLabelledStatement = function () {
            var node = this.createNode();
            var expr = this.parseExpression();
            var statement;
            if ((expr.type === syntax_1.Syntax.Identifier) && this.match(':')) {
                this.nextToken();
                var id = expr;
                var key = '$' + id.name;
                if (Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
                    this.throwError(messages_1.Messages.Redeclaration, 'Label', id.name);
                }
                this.context.labelSet[key] = true;
                var body = void 0;
                if (this.matchKeyword('class')) {
                    this.tolerateUnexpectedToken(this.lookahead);
                    body = this.parseClassDeclaration();
                }
                else if (this.matchKeyword('function')) {
                    var token = this.lookahead;
                    var declaration = this.parseFunctionDeclaration();
                    if (this.context.strict) {
                        this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunction);
                    }
                    else if (declaration.generator) {
                        this.tolerateUnexpectedToken(token, messages_1.Messages.GeneratorInLegacyContext);
                    }
                    body = declaration;
                }
                else {
                    body = this.parseStatement();
                }
                delete this.context.labelSet[key];
                statement = new Node.LabeledStatement(id, body);
            }
            else {
                this.consumeSemicolon();
                statement = new Node.ExpressionStatement(expr);
            }
            return this.finalize(node, statement);
        };
        // https://tc39.github.io/ecma262/#sec-throw-statement
        Parser.prototype.parseThrowStatement = function () {
            var node = this.createNode();
            this.expectKeyword('throw');
            if (this.hasLineTerminator) {
                this.throwError(messages_1.Messages.NewlineAfterThrow);
            }
            var argument = this.parseExpression();
            this.consumeSemicolon();
            return this.finalize(node, new Node.ThrowStatement(argument));
        };
        // https://tc39.github.io/ecma262/#sec-try-statement
        Parser.prototype.parseCatchClause = function () {
            var node = this.createNode();
            this.expectKeyword('catch');
            this.expect('(');
            if (this.match(')')) {
                this.throwUnexpectedToken(this.lookahead);
            }
            var params = [];
            var param = this.parsePattern(params);
            var paramMap = {};
            for (var i = 0; i < params.length; i++) {
                var key = '$' + params[i].value;
                if (Object.prototype.hasOwnProperty.call(paramMap, key)) {
                    this.tolerateError(messages_1.Messages.DuplicateBinding, params[i].value);
                }
                paramMap[key] = true;
            }
            if (this.context.strict && param.type === syntax_1.Syntax.Identifier) {
                if (this.scanner.isRestrictedWord(param.name)) {
                    this.tolerateError(messages_1.Messages.StrictCatchVariable);
                }
            }
            this.expect(')');
            var body = this.parseBlock();
            return this.finalize(node, new Node.CatchClause(param, body));
        };
        Parser.prototype.parseFinallyClause = function () {
            this.expectKeyword('finally');
            return this.parseBlock();
        };
        Parser.prototype.parseTryStatement = function () {
            var node = this.createNode();
            this.expectKeyword('try');
            var block = this.parseBlock();
            var handler = this.matchKeyword('catch') ? this.parseCatchClause() : null;
            var finalizer = this.matchKeyword('finally') ? this.parseFinallyClause() : null;
            if (!handler && !finalizer) {
                this.throwError(messages_1.Messages.NoCatchOrFinally);
            }
            return this.finalize(node, new Node.TryStatement(block, handler, finalizer));
        };
        // https://tc39.github.io/ecma262/#sec-debugger-statement
        Parser.prototype.parseDebuggerStatement = function () {
            var node = this.createNode();
            this.expectKeyword('debugger');
            this.consumeSemicolon();
            return this.finalize(node, new Node.DebuggerStatement());
        };
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-statements-and-declarations
        Parser.prototype.parseStatement = function () {
            var statement;
            switch (this.lookahead.type) {
                case 1 /* BooleanLiteral */:
                case 5 /* NullLiteral */:
                case 6 /* NumericLiteral */:
                case 8 /* StringLiteral */:
                case 10 /* Template */:
                case 9 /* RegularExpression */:
                    statement = this.parseExpressionStatement();
                    break;
                case 7 /* Punctuator */:
                    var value = this.lookahead.value;
                    if (value === '{') {
                        statement = this.parseBlock();
                    }
                    else if (value === '(') {
                        statement = this.parseExpressionStatement();
                    }
                    else if (value === ';') {
                        statement = this.parseEmptyStatement();
                    }
                    else {
                        statement = this.parseExpressionStatement();
                    }
                    break;
                case 3 /* Identifier */:
                    statement = this.matchAsyncFunction() ? this.parseFunctionDeclaration() : this.parseLabelledStatement();
                    break;
                case 4 /* Keyword */:
                    switch (this.lookahead.value) {
                        case 'break':
                            statement = this.parseBreakStatement();
                            break;
                        case 'continue':
                            statement = this.parseContinueStatement();
                            break;
                        case 'debugger':
                            statement = this.parseDebuggerStatement();
                            break;
                        case 'do':
                            statement = this.parseDoWhileStatement();
                            break;
                        case 'for':
                            statement = this.parseForStatement();
                            break;
                        case 'function':
                            statement = this.parseFunctionDeclaration();
                            break;
                        case 'if':
                            statement = this.parseIfStatement();
                            break;
                        case 'return':
                            statement = this.parseReturnStatement();
                            break;
                        case 'switch':
                            statement = this.parseSwitchStatement();
                            break;
                        case 'throw':
                            statement = this.parseThrowStatement();
                            break;
                        case 'try':
                            statement = this.parseTryStatement();
                            break;
                        case 'var':
                            statement = this.parseVariableStatement();
                            break;
                        case 'while':
                            statement = this.parseWhileStatement();
                            break;
                        case 'with':
                            statement = this.parseWithStatement();
                            break;
                        default:
                            statement = this.parseExpressionStatement();
                            break;
                    }
                    break;
                default:
                    statement = this.throwUnexpectedToken(this.lookahead);
            }
            return statement;
        };
        // https://tc39.github.io/ecma262/#sec-function-definitions
        Parser.prototype.parseFunctionSourceElements = function () {
            var node = this.createNode();
            this.expect('{');
            var body = this.parseDirectivePrologues();
            var previousLabelSet = this.context.labelSet;
            var previousInIteration = this.context.inIteration;
            var previousInSwitch = this.context.inSwitch;
            var previousInFunctionBody = this.context.inFunctionBody;
            this.context.labelSet = {};
            this.context.inIteration = false;
            this.context.inSwitch = false;
            this.context.inFunctionBody = true;
            while (this.lookahead.type !== 2 /* EOF */) {
                if (this.match('}')) {
                    break;
                }
                body.push(this.parseStatementListItem());
            }
            this.expect('}');
            this.context.labelSet = previousLabelSet;
            this.context.inIteration = previousInIteration;
            this.context.inSwitch = previousInSwitch;
            this.context.inFunctionBody = previousInFunctionBody;
            return this.finalize(node, new Node.BlockStatement(body));
        };
        Parser.prototype.validateParam = function (options, param, name) {
            var key = '$' + name;
            if (this.context.strict) {
                if (this.scanner.isRestrictedWord(name)) {
                    options.stricted = param;
                    options.message = messages_1.Messages.StrictParamName;
                }
                if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
                    options.stricted = param;
                    options.message = messages_1.Messages.StrictParamDupe;
                }
            }
            else if (!options.firstRestricted) {
                if (this.scanner.isRestrictedWord(name)) {
                    options.firstRestricted = param;
                    options.message = messages_1.Messages.StrictParamName;
                }
                else if (this.scanner.isStrictModeReservedWord(name)) {
                    options.firstRestricted = param;
                    options.message = messages_1.Messages.StrictReservedWord;
                }
                else if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
                    options.stricted = param;
                    options.message = messages_1.Messages.StrictParamDupe;
                }
            }
            /* istanbul ignore next */
            if (typeof Object.defineProperty === 'function') {
                Object.defineProperty(options.paramSet, key, { value: true, enumerable: true, writable: true, configurable: true });
            }
            else {
                options.paramSet[key] = true;
            }
        };
        Parser.prototype.parseRestElement = function (params) {
            var node = this.createNode();
            this.expect('...');
            var arg = this.parsePattern(params);
            if (this.match('=')) {
                this.throwError(messages_1.Messages.DefaultRestParameter);
            }
            if (!this.match(')')) {
                this.throwError(messages_1.Messages.ParameterAfterRestParameter);
            }
            return this.finalize(node, new Node.RestElement(arg));
        };
        Parser.prototype.parseFormalParameter = function (options) {
            var params = [];
            var param = this.match('...') ? this.parseRestElement(params) : this.parsePatternWithDefault(params);
            for (var i = 0; i < params.length; i++) {
                this.validateParam(options, params[i], params[i].value);
            }
            options.simple = options.simple && (param instanceof Node.Identifier);
            options.params.push(param);
        };
        Parser.prototype.parseFormalParameters = function (firstRestricted) {
            var options;
            options = {
                simple: true,
                params: [],
                firstRestricted: firstRestricted
            };
            this.expect('(');
            if (!this.match(')')) {
                options.paramSet = {};
                while (this.lookahead.type !== 2 /* EOF */) {
                    this.parseFormalParameter(options);
                    if (this.match(')')) {
                        break;
                    }
                    this.expect(',');
                    if (this.match(')')) {
                        break;
                    }
                }
            }
            this.expect(')');
            return {
                simple: options.simple,
                params: options.params,
                stricted: options.stricted,
                firstRestricted: options.firstRestricted,
                message: options.message
            };
        };
        Parser.prototype.matchAsyncFunction = function () {
            var match = this.matchContextualKeyword('async');
            if (match) {
                var state = this.scanner.saveState();
                this.scanner.scanComments();
                var next = this.scanner.lex();
                this.scanner.restoreState(state);
                match = (state.lineNumber === next.lineNumber) && (next.type === 4 /* Keyword */) && (next.value === 'function');
            }
            return match;
        };
        Parser.prototype.parseFunctionDeclaration = function (identifierIsOptional) {
            var node = this.createNode();
            var isAsync = this.matchContextualKeyword('async');
            if (isAsync) {
                this.nextToken();
            }
            this.expectKeyword('function');
            var isGenerator = isAsync ? false : this.match('*');
            if (isGenerator) {
                this.nextToken();
            }
            var message;
            var id = null;
            var firstRestricted = null;
            if (!identifierIsOptional || !this.match('(')) {
                var token = this.lookahead;
                id = this.parseVariableIdentifier();
                if (this.context.strict) {
                    if (this.scanner.isRestrictedWord(token.value)) {
                        this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
                    }
                }
                else {
                    if (this.scanner.isRestrictedWord(token.value)) {
                        firstRestricted = token;
                        message = messages_1.Messages.StrictFunctionName;
                    }
                    else if (this.scanner.isStrictModeReservedWord(token.value)) {
                        firstRestricted = token;
                        message = messages_1.Messages.StrictReservedWord;
                    }
                }
            }
            var previousAllowAwait = this.context.await;
            var previousAllowYield = this.context.allowYield;
            this.context.await = isAsync;
            this.context.allowYield = !isGenerator;
            var formalParameters = this.parseFormalParameters(firstRestricted);
            var params = formalParameters.params;
            var stricted = formalParameters.stricted;
            firstRestricted = formalParameters.firstRestricted;
            if (formalParameters.message) {
                message = formalParameters.message;
            }
            var previousStrict = this.context.strict;
            var previousAllowStrictDirective = this.context.allowStrictDirective;
            this.context.allowStrictDirective = formalParameters.simple;
            var body = this.parseFunctionSourceElements();
            if (this.context.strict && firstRestricted) {
                this.throwUnexpectedToken(firstRestricted, message);
            }
            if (this.context.strict && stricted) {
                this.tolerateUnexpectedToken(stricted, message);
            }
            this.context.strict = previousStrict;
            this.context.allowStrictDirective = previousAllowStrictDirective;
            this.context.await = previousAllowAwait;
            this.context.allowYield = previousAllowYield;
            return isAsync ? this.finalize(node, new Node.AsyncFunctionDeclaration(id, params, body)) :
                this.finalize(node, new Node.FunctionDeclaration(id, params, body, isGenerator));
        };
        Parser.prototype.parseFunctionExpression = function () {
            var node = this.createNode();
            var isAsync = this.matchContextualKeyword('async');
            if (isAsync) {
                this.nextToken();
            }
            this.expectKeyword('function');
            var isGenerator = isAsync ? false : this.match('*');
            if (isGenerator) {
                this.nextToken();
            }
            var message;
            var id = null;
            var firstRestricted;
            var previousAllowAwait = this.context.await;
            var previousAllowYield = this.context.allowYield;
            this.context.await = isAsync;
            this.context.allowYield = !isGenerator;
            if (!this.match('(')) {
                var token = this.lookahead;
                id = (!this.context.strict && !isGenerator && this.matchKeyword('yield')) ? this.parseIdentifierName() : this.parseVariableIdentifier();
                if (this.context.strict) {
                    if (this.scanner.isRestrictedWord(token.value)) {
                        this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
                    }
                }
                else {
                    if (this.scanner.isRestrictedWord(token.value)) {
                        firstRestricted = token;
                        message = messages_1.Messages.StrictFunctionName;
                    }
                    else if (this.scanner.isStrictModeReservedWord(token.value)) {
                        firstRestricted = token;
                        message = messages_1.Messages.StrictReservedWord;
                    }
                }
            }
            var formalParameters = this.parseFormalParameters(firstRestricted);
            var params = formalParameters.params;
            var stricted = formalParameters.stricted;
            firstRestricted = formalParameters.firstRestricted;
            if (formalParameters.message) {
                message = formalParameters.message;
            }
            var previousStrict = this.context.strict;
            var previousAllowStrictDirective = this.context.allowStrictDirective;
            this.context.allowStrictDirective = formalParameters.simple;
            var body = this.parseFunctionSourceElements();
            if (this.context.strict && firstRestricted) {
                this.throwUnexpectedToken(firstRestricted, message);
            }
            if (this.context.strict && stricted) {
                this.tolerateUnexpectedToken(stricted, message);
            }
            this.context.strict = previousStrict;
            this.context.allowStrictDirective = previousAllowStrictDirective;
            this.context.await = previousAllowAwait;
            this.context.allowYield = previousAllowYield;
            return isAsync ? this.finalize(node, new Node.AsyncFunctionExpression(id, params, body)) :
                this.finalize(node, new Node.FunctionExpression(id, params, body, isGenerator));
        };
        // https://tc39.github.io/ecma262/#sec-directive-prologues-and-the-use-strict-directive
        Parser.prototype.parseDirective = function () {
            var token = this.lookahead;
            var node = this.createNode();
            var expr = this.parseExpression();
            var directive = (expr.type === syntax_1.Syntax.Literal) ? this.getTokenRaw(token).slice(1, -1) : null;
            this.consumeSemicolon();
            return this.finalize(node, directive ? new Node.Directive(expr, directive) : new Node.ExpressionStatement(expr));
        };
        Parser.prototype.parseDirectivePrologues = function () {
            var firstRestricted = null;
            var body = [];
            while (true) {
                var token = this.lookahead;
                if (token.type !== 8 /* StringLiteral */) {
                    break;
                }
                var statement = this.parseDirective();
                body.push(statement);
                var directive = statement.directive;
                if (typeof directive !== 'string') {
                    break;
                }
                if (directive === 'use strict') {
                    this.context.strict = true;
                    if (firstRestricted) {
                        this.tolerateUnexpectedToken(firstRestricted, messages_1.Messages.StrictOctalLiteral);
                    }
                    if (!this.context.allowStrictDirective) {
                        this.tolerateUnexpectedToken(token, messages_1.Messages.IllegalLanguageModeDirective);
                    }
                }
                else {
                    if (!firstRestricted && token.octal) {
                        firstRestricted = token;
                    }
                }
            }
            return body;
        };
        // https://tc39.github.io/ecma262/#sec-method-definitions
        Parser.prototype.qualifiedPropertyName = function (token) {
            switch (token.type) {
                case 3 /* Identifier */:
                case 8 /* StringLiteral */:
                case 1 /* BooleanLiteral */:
                case 5 /* NullLiteral */:
                case 6 /* NumericLiteral */:
                case 4 /* Keyword */:
                    return true;
                case 7 /* Punctuator */:
                    return token.value === '[';
                default:
                    break;
            }
            return false;
        };
        Parser.prototype.parseGetterMethod = function () {
            var node = this.createNode();
            var isGenerator = false;
            var previousAllowYield = this.context.allowYield;
            this.context.allowYield = !isGenerator;
            var formalParameters = this.parseFormalParameters();
            if (formalParameters.params.length > 0) {
                this.tolerateError(messages_1.Messages.BadGetterArity);
            }
            var method = this.parsePropertyMethod(formalParameters);
            this.context.allowYield = previousAllowYield;
            return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
        };
        Parser.prototype.parseSetterMethod = function () {
            var node = this.createNode();
            var isGenerator = false;
            var previousAllowYield = this.context.allowYield;
            this.context.allowYield = !isGenerator;
            var formalParameters = this.parseFormalParameters();
            if (formalParameters.params.length !== 1) {
                this.tolerateError(messages_1.Messages.BadSetterArity);
            }
            else if (formalParameters.params[0] instanceof Node.RestElement) {
                this.tolerateError(messages_1.Messages.BadSetterRestParameter);
            }
            var method = this.parsePropertyMethod(formalParameters);
            this.context.allowYield = previousAllowYield;
            return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
        };
        Parser.prototype.parseGeneratorMethod = function () {
            var node = this.createNode();
            var isGenerator = true;
            var previousAllowYield = this.context.allowYield;
            this.context.allowYield = true;
            var params = this.parseFormalParameters();
            this.context.allowYield = false;
            var method = this.parsePropertyMethod(params);
            this.context.allowYield = previousAllowYield;
            return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
        };
        // https://tc39.github.io/ecma262/#sec-generator-function-definitions
        Parser.prototype.isStartOfExpression = function () {
            var start = true;
            var value = this.lookahead.value;
            switch (this.lookahead.type) {
                case 7 /* Punctuator */:
                    start = (value === '[') || (value === '(') || (value === '{') ||
                        (value === '+') || (value === '-') ||
                        (value === '!') || (value === '~') ||
                        (value === '++') || (value === '--') ||
                        (value === '/') || (value === '/='); // regular expression literal
                    break;
                case 4 /* Keyword */:
                    start = (value === 'class') || (value === 'delete') ||
                        (value === 'function') || (value === 'let') || (value === 'new') ||
                        (value === 'super') || (value === 'this') || (value === 'typeof') ||
                        (value === 'void') || (value === 'yield');
                    break;
                default:
                    break;
            }
            return start;
        };
        Parser.prototype.parseYieldExpression = function () {
            var node = this.createNode();
            this.expectKeyword('yield');
            var argument = null;
            var delegate = false;
            if (!this.hasLineTerminator) {
                var previousAllowYield = this.context.allowYield;
                this.context.allowYield = false;
                delegate = this.match('*');
                if (delegate) {
                    this.nextToken();
                    argument = this.parseAssignmentExpression();
                }
                else if (this.isStartOfExpression()) {
                    argument = this.parseAssignmentExpression();
                }
                this.context.allowYield = previousAllowYield;
            }
            return this.finalize(node, new Node.YieldExpression(argument, delegate));
        };
        // https://tc39.github.io/ecma262/#sec-class-definitions
        Parser.prototype.parseClassElement = function (hasConstructor) {
            var token = this.lookahead;
            var node = this.createNode();
            var kind = '';
            var key = null;
            var value = null;
            var computed = false;
            var method = false;
            var isStatic = false;
            var isAsync = false;
            if (this.match('*')) {
                this.nextToken();
            }
            else {
                computed = this.match('[');
                key = this.parseObjectPropertyKey();
                var id = key;
                if (id.name === 'static' && (this.qualifiedPropertyName(this.lookahead) || this.match('*'))) {
                    token = this.lookahead;
                    isStatic = true;
                    computed = this.match('[');
                    if (this.match('*')) {
                        this.nextToken();
                    }
                    else {
                        key = this.parseObjectPropertyKey();
                    }
                }
                if ((token.type === 3 /* Identifier */) && !this.hasLineTerminator && (token.value === 'async')) {
                    var punctuator = this.lookahead.value;
                    if (punctuator !== ':' && punctuator !== '(' && punctuator !== '*') {
                        isAsync = true;
                        token = this.lookahead;
                        key = this.parseObjectPropertyKey();
                        if (token.type === 3 /* Identifier */ && token.value === 'constructor') {
                            this.tolerateUnexpectedToken(token, messages_1.Messages.ConstructorIsAsync);
                        }
                    }
                }
            }
            var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
            if (token.type === 3 /* Identifier */) {
                if (token.value === 'get' && lookaheadPropertyKey) {
                    kind = 'get';
                    computed = this.match('[');
                    key = this.parseObjectPropertyKey();
                    this.context.allowYield = false;
                    value = this.parseGetterMethod();
                }
                else if (token.value === 'set' && lookaheadPropertyKey) {
                    kind = 'set';
                    computed = this.match('[');
                    key = this.parseObjectPropertyKey();
                    value = this.parseSetterMethod();
                }
            }
            else if (token.type === 7 /* Punctuator */ && token.value === '*' && lookaheadPropertyKey) {
                kind = 'init';
                computed = this.match('[');
                key = this.parseObjectPropertyKey();
                value = this.parseGeneratorMethod();
                method = true;
            }
            if (!kind && key && this.match('(')) {
                kind = 'init';
                value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
                method = true;
            }
            if (!kind) {
                this.throwUnexpectedToken(this.lookahead);
            }
            if (kind === 'init') {
                kind = 'method';
            }
            if (!computed) {
                if (isStatic && this.isPropertyKey(key, 'prototype')) {
                    this.throwUnexpectedToken(token, messages_1.Messages.StaticPrototype);
                }
                if (!isStatic && this.isPropertyKey(key, 'constructor')) {
                    if (kind !== 'method' || !method || (value && value.generator)) {
                        this.throwUnexpectedToken(token, messages_1.Messages.ConstructorSpecialMethod);
                    }
                    if (hasConstructor.value) {
                        this.throwUnexpectedToken(token, messages_1.Messages.DuplicateConstructor);
                    }
                    else {
                        hasConstructor.value = true;
                    }
                    kind = 'constructor';
                }
            }
            return this.finalize(node, new Node.MethodDefinition(key, computed, value, kind, isStatic));
        };
        Parser.prototype.parseClassElementList = function () {
            var body = [];
            var hasConstructor = { value: false };
            this.expect('{');
            while (!this.match('}')) {
                if (this.match(';')) {
                    this.nextToken();
                }
                else {
                    body.push(this.parseClassElement(hasConstructor));
                }
            }
            this.expect('}');
            return body;
        };
        Parser.prototype.parseClassBody = function () {
            var node = this.createNode();
            var elementList = this.parseClassElementList();
            return this.finalize(node, new Node.ClassBody(elementList));
        };
        Parser.prototype.parseClassDeclaration = function (identifierIsOptional) {
            var node = this.createNode();
            var previousStrict = this.context.strict;
            this.context.strict = true;
            this.expectKeyword('class');
            var id = (identifierIsOptional && (this.lookahead.type !== 3 /* Identifier */)) ? null : this.parseVariableIdentifier();
            var superClass = null;
            if (this.matchKeyword('extends')) {
                this.nextToken();
                superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
            }
            var classBody = this.parseClassBody();
            this.context.strict = previousStrict;
            return this.finalize(node, new Node.ClassDeclaration(id, superClass, classBody));
        };
        Parser.prototype.parseClassExpression = function () {
            var node = this.createNode();
            var previousStrict = this.context.strict;
            this.context.strict = true;
            this.expectKeyword('class');
            var id = (this.lookahead.type === 3 /* Identifier */) ? this.parseVariableIdentifier() : null;
            var superClass = null;
            if (this.matchKeyword('extends')) {
                this.nextToken();
                superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
            }
            var classBody = this.parseClassBody();
            this.context.strict = previousStrict;
            return this.finalize(node, new Node.ClassExpression(id, superClass, classBody));
        };
        // https://tc39.github.io/ecma262/#sec-scripts
        // https://tc39.github.io/ecma262/#sec-modules
        Parser.prototype.parseModule = function () {
            this.context.strict = true;
            this.context.isModule = true;
            this.scanner.isModule = true;
            var node = this.createNode();
            var body = this.parseDirectivePrologues();
            while (this.lookahead.type !== 2 /* EOF */) {
                body.push(this.parseStatementListItem());
            }
            return this.finalize(node, new Node.Module(body));
        };
        Parser.prototype.parseScript = function () {
            var node = this.createNode();
            var body = this.parseDirectivePrologues();
            while (this.lookahead.type !== 2 /* EOF */) {
                body.push(this.parseStatementListItem());
            }
            return this.finalize(node, new Node.Script(body));
        };
        // https://tc39.github.io/ecma262/#sec-imports
        Parser.prototype.parseModuleSpecifier = function () {
            var node = this.createNode();
            if (this.lookahead.type !== 8 /* StringLiteral */) {
                this.throwError(messages_1.Messages.InvalidModuleSpecifier);
            }
            var token = this.nextToken();
            var raw = this.getTokenRaw(token);
            return this.finalize(node, new Node.Literal(token.value, raw));
        };
        // import {<foo as bar>} ...;
        Parser.prototype.parseImportSpecifier = function () {
            var node = this.createNode();
            var imported;
            var local;
            if (this.lookahead.type === 3 /* Identifier */) {
                imported = this.parseVariableIdentifier();
                local = imported;
                if (this.matchContextualKeyword('as')) {
                    this.nextToken();
                    local = this.parseVariableIdentifier();
                }
            }
            else {
                imported = this.parseIdentifierName();
                local = imported;
                if (this.matchContextualKeyword('as')) {
                    this.nextToken();
                    local = this.parseVariableIdentifier();
                }
                else {
                    this.throwUnexpectedToken(this.nextToken());
                }
            }
            return this.finalize(node, new Node.ImportSpecifier(local, imported));
        };
        // {foo, bar as bas}
        Parser.prototype.parseNamedImports = function () {
            this.expect('{');
            var specifiers = [];
            while (!this.match('}')) {
                specifiers.push(this.parseImportSpecifier());
                if (!this.match('}')) {
                    this.expect(',');
                }
            }
            this.expect('}');
            return specifiers;
        };
        // import <foo> ...;
        Parser.prototype.parseImportDefaultSpecifier = function () {
            var node = this.createNode();
            var local = this.parseIdentifierName();
            return this.finalize(node, new Node.ImportDefaultSpecifier(local));
        };
        // import <* as foo> ...;
        Parser.prototype.parseImportNamespaceSpecifier = function () {
            var node = this.createNode();
            this.expect('*');
            if (!this.matchContextualKeyword('as')) {
                this.throwError(messages_1.Messages.NoAsAfterImportNamespace);
            }
            this.nextToken();
            var local = this.parseIdentifierName();
            return this.finalize(node, new Node.ImportNamespaceSpecifier(local));
        };
        Parser.prototype.parseImportDeclaration = function () {
            if (this.context.inFunctionBody) {
                this.throwError(messages_1.Messages.IllegalImportDeclaration);
            }
            var node = this.createNode();
            this.expectKeyword('import');
            var src;
            var specifiers = [];
            if (this.lookahead.type === 8 /* StringLiteral */) {
                // import 'foo';
                src = this.parseModuleSpecifier();
            }
            else {
                if (this.match('{')) {
                    // import {bar}
                    specifiers = specifiers.concat(this.parseNamedImports());
                }
                else if (this.match('*')) {
                    // import * as foo
                    specifiers.push(this.parseImportNamespaceSpecifier());
                }
                else if (this.isIdentifierName(this.lookahead) && !this.matchKeyword('default')) {
                    // import foo
                    specifiers.push(this.parseImportDefaultSpecifier());
                    if (this.match(',')) {
                        this.nextToken();
                        if (this.match('*')) {
                            // import foo, * as foo
                            specifiers.push(this.parseImportNamespaceSpecifier());
                        }
                        else if (this.match('{')) {
                            // import foo, {bar}
                            specifiers = specifiers.concat(this.parseNamedImports());
                        }
                        else {
                            this.throwUnexpectedToken(this.lookahead);
                        }
                    }
                }
                else {
                    this.throwUnexpectedToken(this.nextToken());
                }
                if (!this.matchContextualKeyword('from')) {
                    var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
                    this.throwError(message, this.lookahead.value);
                }
                this.nextToken();
                src = this.parseModuleSpecifier();
            }
            this.consumeSemicolon();
            return this.finalize(node, new Node.ImportDeclaration(specifiers, src));
        };
        // https://tc39.github.io/ecma262/#sec-exports
        Parser.prototype.parseExportSpecifier = function () {
            var node = this.createNode();
            var local = this.parseIdentifierName();
            var exported = local;
            if (this.matchContextualKeyword('as')) {
                this.nextToken();
                exported = this.parseIdentifierName();
            }
            return this.finalize(node, new Node.ExportSpecifier(local, exported));
        };
        Parser.prototype.parseExportDeclaration = function () {
            if (this.context.inFunctionBody) {
                this.throwError(messages_1.Messages.IllegalExportDeclaration);
            }
            var node = this.createNode();
            this.expectKeyword('export');
            var exportDeclaration;
            if (this.matchKeyword('default')) {
                // export default ...
                this.nextToken();
                if (this.matchKeyword('function')) {
                    // export default function foo () {}
                    // export default function () {}
                    var declaration = this.parseFunctionDeclaration(true);
                    exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
                }
                else if (this.matchKeyword('class')) {
                    // export default class foo {}
                    var declaration = this.parseClassDeclaration(true);
                    exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
                }
                else if (this.matchContextualKeyword('async')) {
                    // export default async function f () {}
                    // export default async function () {}
                    // export default async x => x
                    var declaration = this.matchAsyncFunction() ? this.parseFunctionDeclaration(true) : this.parseAssignmentExpression();
                    exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
                }
                else {
                    if (this.matchContextualKeyword('from')) {
                        this.throwError(messages_1.Messages.UnexpectedToken, this.lookahead.value);
                    }
                    // export default {};
                    // export default [];
                    // export default (1 + 2);
                    var declaration = this.match('{') ? this.parseObjectInitializer() :
                        this.match('[') ? this.parseArrayInitializer() : this.parseAssignmentExpression();
                    this.consumeSemicolon();
                    exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
                }
            }
            else if (this.match('*')) {
                // export * from 'foo';
                this.nextToken();
                if (!this.matchContextualKeyword('from')) {
                    var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
                    this.throwError(message, this.lookahead.value);
                }
                this.nextToken();
                var src = this.parseModuleSpecifier();
                this.consumeSemicolon();
                exportDeclaration = this.finalize(node, new Node.ExportAllDeclaration(src));
            }
            else if (this.lookahead.type === 4 /* Keyword */) {
                // export var f = 1;
                var declaration = void 0;
                switch (this.lookahead.value) {
                    case 'let':
                    case 'const':
                        declaration = this.parseLexicalDeclaration({ inFor: false });
                        break;
                    case 'var':
                    case 'class':
                    case 'function':
                        declaration = this.parseStatementListItem();
                        break;
                    default:
                        this.throwUnexpectedToken(this.lookahead);
                }
                exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
            }
            else if (this.matchAsyncFunction()) {
                var declaration = this.parseFunctionDeclaration();
                exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
            }
            else {
                var specifiers = [];
                var source = null;
                var isExportFromIdentifier = false;
                this.expect('{');
                while (!this.match('}')) {
                    isExportFromIdentifier = isExportFromIdentifier || this.matchKeyword('default');
                    specifiers.push(this.parseExportSpecifier());
                    if (!this.match('}')) {
                        this.expect(',');
                    }
                }
                this.expect('}');
                if (this.matchContextualKeyword('from')) {
                    // export {default} from 'foo';
                    // export {foo} from 'foo';
                    this.nextToken();
                    source = this.parseModuleSpecifier();
                    this.consumeSemicolon();
                }
                else if (isExportFromIdentifier) {
                    // export {default}; // missing fromClause
                    var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
                    this.throwError(message, this.lookahead.value);
                }
                else {
                    // export {foo};
                    this.consumeSemicolon();
                }
                exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(null, specifiers, source));
            }
            return exportDeclaration;
        };
        return Parser;
    }());
    exports.Parser = Parser;

/***/ },
/* 9 */
/***/ function(module, exports) {

    "use strict";
    // Ensure the condition is true, otherwise throw an error.
    // This is only to have a better contract semantic, i.e. another safety net
    // to catch a logic error. The condition shall be fulfilled in normal case.
    // Do NOT use this to enforce a certain condition on any user input.
    Object.defineProperty(exports, "__esModule", { value: true });
    function assert(condition, message) {
        /* istanbul ignore if */
        if (!condition) {
            throw new Error('ASSERT: ' + message);
        }
    }
    exports.assert = assert;

/***/ },
/* 10 */
/***/ function(module, exports) {

    "use strict";
    /* tslint:disable:max-classes-per-file */
    Object.defineProperty(exports, "__esModule", { value: true });
    var ErrorHandler = (function () {
        function ErrorHandler() {
            this.errors = [];
            this.tolerant = false;
        }
        ErrorHandler.prototype.recordError = function (error) {
            this.errors.push(error);
        };
        ErrorHandler.prototype.tolerate = function (error) {
            if (this.tolerant) {
                this.recordError(error);
            }
            else {
                throw error;
            }
        };
        ErrorHandler.prototype.constructError = function (msg, column) {
            var error = new Error(msg);
            try {
                throw error;
            }
            catch (base) {
                /* istanbul ignore else */
                if (Object.create && Object.defineProperty) {
                    error = Object.create(base);
                    Object.defineProperty(error, 'column', { value: column });
                }
            }
            /* istanbul ignore next */
            return error;
        };
        ErrorHandler.prototype.createError = function (index, line, col, description) {
            var msg = 'Line ' + line + ': ' + description;
            var error = this.constructError(msg, col);
            error.index = index;
            error.lineNumber = line;
            error.description = description;
            return error;
        };
        ErrorHandler.prototype.throwError = function (index, line, col, description) {
            throw this.createError(index, line, col, description);
        };
        ErrorHandler.prototype.tolerateError = function (index, line, col, description) {
            var error = this.createError(index, line, col, description);
            if (this.tolerant) {
                this.recordError(error);
            }
            else {
                throw error;
            }
        };
        return ErrorHandler;
    }());
    exports.ErrorHandler = ErrorHandler;

/***/ },
/* 11 */
/***/ function(module, exports) {

    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Error messages should be identical to V8.
    exports.Messages = {
        BadGetterArity: 'Getter must not have any formal parameters',
        BadSetterArity: 'Setter must have exactly one formal parameter',
        BadSetterRestParameter: 'Setter function argument must not be a rest parameter',
        ConstructorIsAsync: 'Class constructor may not be an async method',
        ConstructorSpecialMethod: 'Class constructor may not be an accessor',
        DeclarationMissingInitializer: 'Missing initializer in %0 declaration',
        DefaultRestParameter: 'Unexpected token =',
        DuplicateBinding: 'Duplicate binding %0',
        DuplicateConstructor: 'A class may only have one constructor',
        DuplicateProtoProperty: 'Duplicate __proto__ fields are not allowed in object literals',
        ForInOfLoopInitializer: '%0 loop variable declaration may not have an initializer',
        GeneratorInLegacyContext: 'Generator declarations are not allowed in legacy contexts',
        IllegalBreak: 'Illegal break statement',
        IllegalContinue: 'Illegal continue statement',
        IllegalExportDeclaration: 'Unexpected token',
        IllegalImportDeclaration: 'Unexpected token',
        IllegalLanguageModeDirective: 'Illegal \'use strict\' directive in function with non-simple parameter list',
        IllegalReturn: 'Illegal return statement',
        InvalidEscapedReservedWord: 'Keyword must not contain escaped characters',
        InvalidHexEscapeSequence: 'Invalid hexadecimal escape sequence',
        InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
        InvalidLHSInForIn: 'Invalid left-hand side in for-in',
        InvalidLHSInForLoop: 'Invalid left-hand side in for-loop',
        InvalidModuleSpecifier: 'Unexpected token',
        InvalidRegExp: 'Invalid regular expression',
        LetInLexicalBinding: 'let is disallowed as a lexically bound name',
        MissingFromClause: 'Unexpected token',
        MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
        NewlineAfterThrow: 'Illegal newline after throw',
        NoAsAfterImportNamespace: 'Unexpected token',
        NoCatchOrFinally: 'Missing catch or finally after try',
        ParameterAfterRestParameter: 'Rest parameter must be last formal parameter',
        Redeclaration: '%0 \'%1\' has already been declared',
        StaticPrototype: 'Classes may not have static property named prototype',
        StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
        StrictDelete: 'Delete of an unqualified identifier in strict mode.',
        StrictFunction: 'In strict mode code, functions can only be declared at top level or inside a block',
        StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
        StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
        StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
        StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
        StrictModeWith: 'Strict mode code may not include a with statement',
        StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
        StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
        StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
        StrictReservedWord: 'Use of future reserved word in strict mode',
        StrictVarName: 'Variable name may not be eval or arguments in strict mode',
        TemplateOctalLiteral: 'Octal literals are not allowed in template strings.',
        UnexpectedEOS: 'Unexpected end of input',
        UnexpectedIdentifier: 'Unexpected identifier',
        UnexpectedNumber: 'Unexpected number',
        UnexpectedReserved: 'Unexpected reserved word',
        UnexpectedString: 'Unexpected string',
        UnexpectedTemplate: 'Unexpected quasi %0',
        UnexpectedToken: 'Unexpected token %0',
        UnexpectedTokenIllegal: 'Unexpected token ILLEGAL',
        UnknownLabel: 'Undefined label \'%0\'',
        UnterminatedRegExp: 'Invalid regular expression: missing /'
    };

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var assert_1 = __webpack_require__(9);
    var character_1 = __webpack_require__(4);
    var messages_1 = __webpack_require__(11);
    function hexValue(ch) {
        return '0123456789abcdef'.indexOf(ch.toLowerCase());
    }
    function octalValue(ch) {
        return '01234567'.indexOf(ch);
    }
    var Scanner = (function () {
        function Scanner(code, handler) {
            this.source = code;
            this.errorHandler = handler;
            this.trackComment = false;
            this.isModule = false;
            this.length = code.length;
            this.index = 0;
            this.lineNumber = (code.length > 0) ? 1 : 0;
            this.lineStart = 0;
            this.curlyStack = [];
        }
        Scanner.prototype.saveState = function () {
            return {
                index: this.index,
                lineNumber: this.lineNumber,
                lineStart: this.lineStart
            };
        };
        Scanner.prototype.restoreState = function (state) {
            this.index = state.index;
            this.lineNumber = state.lineNumber;
            this.lineStart = state.lineStart;
        };
        Scanner.prototype.eof = function () {
            return this.index >= this.length;
        };
        Scanner.prototype.throwUnexpectedToken = function (message) {
            if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
            return this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
        };
        Scanner.prototype.tolerateUnexpectedToken = function (message) {
            if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
            this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
        };
        // https://tc39.github.io/ecma262/#sec-comments
        Scanner.prototype.skipSingleLineComment = function (offset) {
            var comments = [];
            var start, loc;
            if (this.trackComment) {
                comments = [];
                start = this.index - offset;
                loc = {
                    start: {
                        line: this.lineNumber,
                        column: this.index - this.lineStart - offset
                    },
                    end: {}
                };
            }
            while (!this.eof()) {
                var ch = this.source.charCodeAt(this.index);
                ++this.index;
                if (character_1.Character.isLineTerminator(ch)) {
                    if (this.trackComment) {
                        loc.end = {
                            line: this.lineNumber,
                            column: this.index - this.lineStart - 1
                        };
                        var entry = {
                            multiLine: false,
                            slice: [start + offset, this.index - 1],
                            range: [start, this.index - 1],
                            loc: loc
                        };
                        comments.push(entry);
                    }
                    if (ch === 13 && this.source.charCodeAt(this.index) === 10) {
                        ++this.index;
                    }
                    ++this.lineNumber;
                    this.lineStart = this.index;
                    return comments;
                }
            }
            if (this.trackComment) {
                loc.end = {
                    line: this.lineNumber,
                    column: this.index - this.lineStart
                };
                var entry = {
                    multiLine: false,
                    slice: [start + offset, this.index],
                    range: [start, this.index],
                    loc: loc
                };
                comments.push(entry);
            }
            return comments;
        };
        Scanner.prototype.skipMultiLineComment = function () {
            var comments = [];
            var start, loc;
            if (this.trackComment) {
                comments = [];
                start = this.index - 2;
                loc = {
                    start: {
                        line: this.lineNumber,
                        column: this.index - this.lineStart - 2
                    },
                    end: {}
                };
            }
            while (!this.eof()) {
                var ch = this.source.charCodeAt(this.index);
                if (character_1.Character.isLineTerminator(ch)) {
                    if (ch === 0x0D && this.source.charCodeAt(this.index + 1) === 0x0A) {
                        ++this.index;
                    }
                    ++this.lineNumber;
                    ++this.index;
                    this.lineStart = this.index;
                }
                else if (ch === 0x2A) {
                    // Block comment ends with '*/'.
                    if (this.source.charCodeAt(this.index + 1) === 0x2F) {
                        this.index += 2;
                        if (this.trackComment) {
                            loc.end = {
                                line: this.lineNumber,
                                column: this.index - this.lineStart
                            };
                            var entry = {
                                multiLine: true,
                                slice: [start + 2, this.index - 2],
                                range: [start, this.index],
                                loc: loc
                            };
                            comments.push(entry);
                        }
                        return comments;
                    }
                    ++this.index;
                }
                else {
                    ++this.index;
                }
            }
            // Ran off the end of the file - the whole thing is a comment
            if (this.trackComment) {
                loc.end = {
                    line: this.lineNumber,
                    column: this.index - this.lineStart
                };
                var entry = {
                    multiLine: true,
                    slice: [start + 2, this.index],
                    range: [start, this.index],
                    loc: loc
                };
                comments.push(entry);
            }
            this.tolerateUnexpectedToken();
            return comments;
        };
        Scanner.prototype.scanComments = function () {
            var comments;
            if (this.trackComment) {
                comments = [];
            }
            var start = (this.index === 0);
            while (!this.eof()) {
                var ch = this.source.charCodeAt(this.index);
                if (character_1.Character.isWhiteSpace(ch)) {
                    ++this.index;
                }
                else if (character_1.Character.isLineTerminator(ch)) {
                    ++this.index;
                    if (ch === 0x0D && this.source.charCodeAt(this.index) === 0x0A) {
                        ++this.index;
                    }
                    ++this.lineNumber;
                    this.lineStart = this.index;
                    start = true;
                }
                else if (ch === 0x2F) {
                    ch = this.source.charCodeAt(this.index + 1);
                    if (ch === 0x2F) {
                        this.index += 2;
                        var comment = this.skipSingleLineComment(2);
                        if (this.trackComment) {
                            comments = comments.concat(comment);
                        }
                        start = true;
                    }
                    else if (ch === 0x2A) {
                        this.index += 2;
                        var comment = this.skipMultiLineComment();
                        if (this.trackComment) {
                            comments = comments.concat(comment);
                        }
                    }
                    else {
                        break;
                    }
                }
                else if (start && ch === 0x2D) {
                    // U+003E is '>'
                    if ((this.source.charCodeAt(this.index + 1) === 0x2D) && (this.source.charCodeAt(this.index + 2) === 0x3E)) {
                        // '-->' is a single-line comment
                        this.index += 3;
                        var comment = this.skipSingleLineComment(3);
                        if (this.trackComment) {
                            comments = comments.concat(comment);
                        }
                    }
                    else {
                        break;
                    }
                }
                else if (ch === 0x3C && !this.isModule) {
                    if (this.source.slice(this.index + 1, this.index + 4) === '!--') {
                        this.index += 4; // `<!--`
                        var comment = this.skipSingleLineComment(4);
                        if (this.trackComment) {
                            comments = comments.concat(comment);
                        }
                    }
                    else {
                        break;
                    }
                }
                else {
                    break;
                }
            }
            return comments;
        };
        // https://tc39.github.io/ecma262/#sec-future-reserved-words
        Scanner.prototype.isFutureReservedWord = function (id) {
            switch (id) {
                case 'enum':
                case 'export':
                case 'import':
                case 'super':
                    return true;
                default:
                    return false;
            }
        };
        Scanner.prototype.isStrictModeReservedWord = function (id) {
            switch (id) {
                case 'implements':
                case 'interface':
                case 'package':
                case 'private':
                case 'protected':
                case 'public':
                case 'static':
                case 'yield':
                case 'let':
                    return true;
                default:
                    return false;
            }
        };
        Scanner.prototype.isRestrictedWord = function (id) {
            return id === 'eval' || id === 'arguments';
        };
        // https://tc39.github.io/ecma262/#sec-keywords
        Scanner.prototype.isKeyword = function (id) {
            switch (id.length) {
                case 2:
                    return (id === 'if') || (id === 'in') || (id === 'do');
                case 3:
                    return (id === 'var') || (id === 'for') || (id === 'new') ||
                        (id === 'try') || (id === 'let');
                case 4:
                    return (id === 'this') || (id === 'else') || (id === 'case') ||
                        (id === 'void') || (id === 'with') || (id === 'enum');
                case 5:
                    return (id === 'while') || (id === 'break') || (id === 'catch') ||
                        (id === 'throw') || (id === 'const') || (id === 'yield') ||
                        (id === 'class') || (id === 'super');
                case 6:
                    return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
                        (id === 'switch') || (id === 'export') || (id === 'import');
                case 7:
                    return (id === 'default') || (id === 'finally') || (id === 'extends');
                case 8:
                    return (id === 'function') || (id === 'continue') || (id === 'debugger');
                case 10:
                    return (id === 'instanceof');
                default:
                    return false;
            }
        };
        Scanner.prototype.codePointAt = function (i) {
            var cp = this.source.charCodeAt(i);
            if (cp >= 0xD800 && cp <= 0xDBFF) {
                var second = this.source.charCodeAt(i + 1);
                if (second >= 0xDC00 && second <= 0xDFFF) {
                    var first = cp;
                    cp = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                }
            }
            return cp;
        };
        Scanner.prototype.scanHexEscape = function (prefix) {
            var len = (prefix === 'u') ? 4 : 2;
            var code = 0;
            for (var i = 0; i < len; ++i) {
                if (!this.eof() && character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
                    code = code * 16 + hexValue(this.source[this.index++]);
                }
                else {
                    return null;
                }
            }
            return String.fromCharCode(code);
        };
        Scanner.prototype.scanUnicodeCodePointEscape = function () {
            var ch = this.source[this.index];
            var code = 0;
            // At least, one hex digit is required.
            if (ch === '}') {
                this.throwUnexpectedToken();
            }
            while (!this.eof()) {
                ch = this.source[this.index++];
                if (!character_1.Character.isHexDigit(ch.charCodeAt(0))) {
                    break;
                }
                code = code * 16 + hexValue(ch);
            }
            if (code > 0x10FFFF || ch !== '}') {
                this.throwUnexpectedToken();
            }
            return character_1.Character.fromCodePoint(code);
        };
        Scanner.prototype.getIdentifier = function () {
            var start = this.index++;
            while (!this.eof()) {
                var ch = this.source.charCodeAt(this.index);
                if (ch === 0x5C) {
                    // Blackslash (U+005C) marks Unicode escape sequence.
                    this.index = start;
                    return this.getComplexIdentifier();
                }
                else if (ch >= 0xD800 && ch < 0xDFFF) {
                    // Need to handle surrogate pairs.
                    this.index = start;
                    return this.getComplexIdentifier();
                }
                if (character_1.Character.isIdentifierPart(ch)) {
                    ++this.index;
                }
                else {
                    break;
                }
            }
            return this.source.slice(start, this.index);
        };
        Scanner.prototype.getComplexIdentifier = function () {
            var cp = this.codePointAt(this.index);
            var id = character_1.Character.fromCodePoint(cp);
            this.index += id.length;
            // '\u' (U+005C, U+0075) denotes an escaped character.
            var ch;
            if (cp === 0x5C) {
                if (this.source.charCodeAt(this.index) !== 0x75) {
                    this.throwUnexpectedToken();
                }
                ++this.index;
                if (this.source[this.index] === '{') {
                    ++this.index;
                    ch = this.scanUnicodeCodePointEscape();
                }
                else {
                    ch = this.scanHexEscape('u');
                    if (ch === null || ch === '\\' || !character_1.Character.isIdentifierStart(ch.charCodeAt(0))) {
                        this.throwUnexpectedToken();
                    }
                }
                id = ch;
            }
            while (!this.eof()) {
                cp = this.codePointAt(this.index);
                if (!character_1.Character.isIdentifierPart(cp)) {
                    break;
                }
                ch = character_1.Character.fromCodePoint(cp);
                id += ch;
                this.index += ch.length;
                // '\u' (U+005C, U+0075) denotes an escaped character.
                if (cp === 0x5C) {
                    id = id.substr(0, id.length - 1);
                    if (this.source.charCodeAt(this.index) !== 0x75) {
                        this.throwUnexpectedToken();
                    }
                    ++this.index;
                    if (this.source[this.index] === '{') {
                        ++this.index;
                        ch = this.scanUnicodeCodePointEscape();
                    }
                    else {
                        ch = this.scanHexEscape('u');
                        if (ch === null || ch === '\\' || !character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
                            this.throwUnexpectedToken();
                        }
                    }
                    id += ch;
                }
            }
            return id;
        };
        Scanner.prototype.octalToDecimal = function (ch) {
            // \0 is not octal escape sequence
            var octal = (ch !== '0');
            var code = octalValue(ch);
            if (!this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
                octal = true;
                code = code * 8 + octalValue(this.source[this.index++]);
                // 3 digits are only allowed when string starts
                // with 0, 1, 2, 3
                if ('0123'.indexOf(ch) >= 0 && !this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
                    code = code * 8 + octalValue(this.source[this.index++]);
                }
            }
            return {
                code: code,
                octal: octal
            };
        };
        // https://tc39.github.io/ecma262/#sec-names-and-keywords
        Scanner.prototype.scanIdentifier = function () {
            var type;
            var start = this.index;
            // Backslash (U+005C) starts an escaped character.
            var id = (this.source.charCodeAt(start) === 0x5C) ? this.getComplexIdentifier() : this.getIdentifier();
            // There is no keyword or literal with only one character.
            // Thus, it must be an identifier.
            if (id.length === 1) {
                type = 3 /* Identifier */;
            }
            else if (this.isKeyword(id)) {
                type = 4 /* Keyword */;
            }
            else if (id === 'null') {
                type = 5 /* NullLiteral */;
            }
            else if (id === 'true' || id === 'false') {
                type = 1 /* BooleanLiteral */;
            }
            else {
                type = 3 /* Identifier */;
            }
            if (type !== 3 /* Identifier */ && (start + id.length !== this.index)) {
                var restore = this.index;
                this.index = start;
                this.tolerateUnexpectedToken(messages_1.Messages.InvalidEscapedReservedWord);
                this.index = restore;
            }
            return {
                type: type,
                value: id,
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                start: start,
                end: this.index
            };
        };
        // https://tc39.github.io/ecma262/#sec-punctuators
        Scanner.prototype.scanPunctuator = function () {
            var start = this.index;
            // Check for most common single-character punctuators.
            var str = this.source[this.index];
            switch (str) {
                case '(':
                case '{':
                    if (str === '{') {
                        this.curlyStack.push('{');
                    }
                    ++this.index;
                    break;
                case '.':
                    ++this.index;
                    if (this.source[this.index] === '.' && this.source[this.index + 1] === '.') {
                        // Spread operator: ...
                        this.index += 2;
                        str = '...';
                    }
                    break;
                case '}':
                    ++this.index;
                    this.curlyStack.pop();
                    break;
                case ')':
                case ';':
                case ',':
                case '[':
                case ']':
                case ':':
                case '?':
                case '~':
                    ++this.index;
                    break;
                default:
                    // 4-character punctuator.
                    str = this.source.substr(this.index, 4);
                    if (str === '>>>=') {
                        this.index += 4;
                    }
                    else {
                        // 3-character punctuators.
                        str = str.substr(0, 3);
                        if (str === '===' || str === '!==' || str === '>>>' ||
                            str === '<<=' || str === '>>=' || str === '**=') {
                            this.index += 3;
                        }
                        else {
                            // 2-character punctuators.
                            str = str.substr(0, 2);
                            if (str === '&&' || str === '||' || str === '==' || str === '!=' ||
                                str === '+=' || str === '-=' || str === '*=' || str === '/=' ||
                                str === '++' || str === '--' || str === '<<' || str === '>>' ||
                                str === '&=' || str === '|=' || str === '^=' || str === '%=' ||
                                str === '<=' || str === '>=' || str === '=>' || str === '**') {
                                this.index += 2;
                            }
                            else {
                                // 1-character punctuators.
                                str = this.source[this.index];
                                if ('<>=!+-*%&|^/'.indexOf(str) >= 0) {
                                    ++this.index;
                                }
                            }
                        }
                    }
            }
            if (this.index === start) {
                this.throwUnexpectedToken();
            }
            return {
                type: 7 /* Punctuator */,
                value: str,
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                start: start,
                end: this.index
            };
        };
        // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
        Scanner.prototype.scanHexLiteral = function (start) {
            var num = '';
            while (!this.eof()) {
                if (!character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
                    break;
                }
                num += this.source[this.index++];
            }
            if (num.length === 0) {
                this.throwUnexpectedToken();
            }
            // coverage-hack - bigint-hex
            if (this.source[this.index] === 'n') { num += this.source[this.index++]; }
            if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
                this.throwUnexpectedToken();
            }
            return {
                type: 6 /* NumericLiteral */,
                value: parseInt('0x' + num, 16),
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                start: start,
                end: this.index
            };
        };
        Scanner.prototype.scanBinaryLiteral = function (start) {
            var num = '';
            var ch;
            while (!this.eof()) {
                ch = this.source[this.index];
                if (ch !== '0' && ch !== '1') {
                    break;
                }
                num += this.source[this.index++];
            }
            if (num.length === 0) {
                // only 0b or 0B
                this.throwUnexpectedToken();
            }
            // coverage-hack - bigint-bin
            if (this.source[this.index] === 'n') { num += this.source[this.index++]; }
            if (!this.eof()) {
                ch = this.source.charCodeAt(this.index);
                /* istanbul ignore else */
                if (character_1.Character.isIdentifierStart(ch) || character_1.Character.isDecimalDigit(ch)) {
                    this.throwUnexpectedToken();
                }
            }
            return {
                type: 6 /* NumericLiteral */,
                value: parseInt(num, 2),
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                start: start,
                end: this.index
            };
        };
        Scanner.prototype.scanOctalLiteral = function (prefix, start) {
            var num = '';
            var octal = false;
            if (character_1.Character.isOctalDigit(prefix.charCodeAt(0))) {
                octal = true;
                num = '0' + this.source[this.index++];
            }
            else {
                ++this.index;
            }
            while (!this.eof()) {
                if (!character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
                    break;
                }
                num += this.source[this.index++];
            }
            if (!octal && num.length === 0) {
                // only 0o or 0O
                this.throwUnexpectedToken();
            }
            // coverage-hack - bigint-oct
            if (this.source[this.index] === 'n') { num += this.source[this.index++]; }
            if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                this.throwUnexpectedToken();
            }
            return {
                type: 6 /* NumericLiteral */,
                value: parseInt(num, 8),
                octal: octal,
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                start: start,
                end: this.index
            };
        };
        Scanner.prototype.isImplicitOctalLiteral = function () {
            // Implicit octal, unless there is a non-octal digit.
            // (Annex B.1.1 on Numeric Literals)
            for (var i = this.index + 1; i < this.length; ++i) {
                var ch = this.source[i];
                if (ch === '8' || ch === '9') {
                    return false;
                }
                if (!character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
                    return true;
                }
            }
            return true;
        };
        Scanner.prototype.scanNumericLiteral = function () {
            var start = this.index;
            var ch = this.source[start];
            assert_1.assert(character_1.Character.isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'), 'Numeric literal must start with a decimal digit or a decimal point');
            var num = '';
            if (ch !== '.') {
                num = this.source[this.index++];
                ch = this.source[this.index];
                // Hex number starts with '0x'.
                // Octal number starts with '0'.
                // Octal number in ES6 starts with '0o'.
                // Binary number in ES6 starts with '0b'.
                if (num === '0') {
                    if (ch === 'x' || ch === 'X') {
                        ++this.index;
                        return this.scanHexLiteral(start);
                    }
                    if (ch === 'b' || ch === 'B') {
                        ++this.index;
                        return this.scanBinaryLiteral(start);
                    }
                    if (ch === 'o' || ch === 'O') {
                        return this.scanOctalLiteral(ch, start);
                    }
                    if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
                        if (this.isImplicitOctalLiteral()) {
                            return this.scanOctalLiteral(ch, start);
                        }
                    }
                }
                while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                    num += this.source[this.index++];
                }
                ch = this.source[this.index];
            }
            if (ch === '.') {
                num += this.source[this.index++];
                while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                    num += this.source[this.index++];
                }
                ch = this.source[this.index];
            }
            if (ch === 'e' || ch === 'E') {
                num += this.source[this.index++];
                ch = this.source[this.index];
                if (ch === '+' || ch === '-') {
                    num += this.source[this.index++];
                }
                if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                    while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                        num += this.source[this.index++];
                    }
                }
                else {
                    this.throwUnexpectedToken();
                }
            }
            // coverage-hack - bigint-dec
            if (this.source[this.index] === 'n') { num += this.source[this.index++]; }
            if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
                this.throwUnexpectedToken();
            }
            return {
                type: 6 /* NumericLiteral */,
                value: parseFloat(num),
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                start: start,
                end: this.index
            };
        };
        // https://tc39.github.io/ecma262/#sec-literals-string-literals
        Scanner.prototype.scanStringLiteral = function () {
            var start = this.index;
            var quote = this.source[start];
            assert_1.assert((quote === '\'' || quote === '"'), 'String literal must starts with a quote');
            ++this.index;
            var octal = false;
            var str = '';
            while (!this.eof()) {
                var ch = this.source[this.index++];
                if (ch === quote) {
                    quote = '';
                    break;
                }
                else if (ch === '\\') {
                    ch = this.source[this.index++];
                    if (!ch || !character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                        switch (ch) {
                            case 'u':
                                if (this.source[this.index] === '{') {
                                    ++this.index;
                                    str += this.scanUnicodeCodePointEscape();
                                }
                                else {
                                    var unescaped_1 = this.scanHexEscape(ch);
                                    if (unescaped_1 === null) {
                                        this.throwUnexpectedToken();
                                    }
                                    str += unescaped_1;
                                }
                                break;
                            case 'x':
                                var unescaped = this.scanHexEscape(ch);
                                if (unescaped === null) {
                                    this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
                                }
                                str += unescaped;
                                break;
                            case 'n':
                                str += '\n';
                                break;
                            case 'r':
                                str += '\r';
                                break;
                            case 't':
                                str += '\t';
                                break;
                            case 'b':
                                str += '\b';
                                break;
                            case 'f':
                                str += '\f';
                                break;
                            case 'v':
                                str += '\x0B';
                                break;
                            case '8':
                            case '9':
                                str += ch;
                                this.tolerateUnexpectedToken();
                                break;
                            default:
                                if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
                                    var octToDec = this.octalToDecimal(ch);
                                    octal = octToDec.octal || octal;
                                    str += String.fromCharCode(octToDec.code);
                                }
                                else {
                                    str += ch;
                                }
                                break;
                        }
                    }
                    else {
                        ++this.lineNumber;
                        if (ch === '\r' && this.source[this.index] === '\n') {
                            ++this.index;
                        }
                        this.lineStart = this.index;
                    }
                }
                else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                    break;
                }
                else {
                    str += ch;
                }
            }
            if (quote !== '') {
                this.index = start;
                this.throwUnexpectedToken();
            }
            return {
                type: 8 /* StringLiteral */,
                value: str,
                octal: octal,
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                start: start,
                end: this.index
            };
        };
        // https://tc39.github.io/ecma262/#sec-template-literal-lexical-components
        Scanner.prototype.scanTemplate = function () {
            var cooked = '';
            var terminated = false;
            var start = this.index;
            var head = (this.source[start] === '`');
            var tail = false;
            var rawOffset = 2;
            ++this.index;
            while (!this.eof()) {
                var ch = this.source[this.index++];
                if (ch === '`') {
                    rawOffset = 1;
                    tail = true;
                    terminated = true;
                    break;
                }
                else if (ch === '$') {
                    if (this.source[this.index] === '{') {
                        this.curlyStack.push('${');
                        ++this.index;
                        terminated = true;
                        break;
                    }
                    cooked += ch;
                }
                else if (ch === '\\') {
                    ch = this.source[this.index++];
                    if (!character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                        switch (ch) {
                            case 'n':
                                cooked += '\n';
                                break;
                            case 'r':
                                cooked += '\r';
                                break;
                            case 't':
                                cooked += '\t';
                                break;
                            case 'u':
                                if (this.source[this.index] === '{') {
                                    ++this.index;
                                    cooked += this.scanUnicodeCodePointEscape();
                                }
                                else {
                                    var restore = this.index;
                                    var unescaped_2 = this.scanHexEscape(ch);
                                    if (unescaped_2 !== null) {
                                        cooked += unescaped_2;
                                    }
                                    else {
                                        this.index = restore;
                                        cooked += ch;
                                    }
                                }
                                break;
                            case 'x':
                                var unescaped = this.scanHexEscape(ch);
                                if (unescaped === null) {
                                    this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
                                }
                                cooked += unescaped;
                                break;
                            case 'b':
                                cooked += '\b';
                                break;
                            case 'f':
                                cooked += '\f';
                                break;
                            case 'v':
                                cooked += '\v';
                                break;
                            default:
                                if (ch === '0') {
                                    if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                                        // Illegal: \01 \02 and so on
                                        this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
                                    }
                                    cooked += '\0';
                                }
                                else if (character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
                                    // Illegal: \1 \2
                                    this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
                                }
                                else {
                                    cooked += ch;
                                }
                                break;
                        }
                    }
                    else {
                        ++this.lineNumber;
                        if (ch === '\r' && this.source[this.index] === '\n') {
                            ++this.index;
                        }
                        this.lineStart = this.index;
                    }
                }
                else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                    ++this.lineNumber;
                    if (ch === '\r' && this.source[this.index] === '\n') {
                        ++this.index;
                    }
                    this.lineStart = this.index;
                    cooked += '\n';
                }
                else {
                    cooked += ch;
                }
            }
            if (!terminated) {
                this.throwUnexpectedToken();
            }
            if (!head) {
                this.curlyStack.pop();
            }
            return {
                type: 10 /* Template */,
                value: this.source.slice(start + 1, this.index - rawOffset),
                cooked: cooked,
                head: head,
                tail: tail,
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                start: start,
                end: this.index
            };
        };
        // https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
        Scanner.prototype.testRegExp = function (pattern, flags) {
            // The BMP character to use as a replacement for astral symbols when
            // translating an ES6 "u"-flagged pattern to an ES5-compatible
            // approximation.
            // Note: replacing with '\uFFFF' enables false positives in unlikely
            // scenarios. For example, `[\u{1044f}-\u{10440}]` is an invalid
            // pattern that would not be detected by this substitution.
            var astralSubstitute = '\uFFFF';
            var tmp = pattern;
            var self = this;
            if (flags.indexOf('u') >= 0) {
                tmp = tmp
                    .replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function ($0, $1, $2) {
                    var codePoint = parseInt($1 || $2, 16);
                    if (codePoint > 0x10FFFF) {
                        self.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
                    }
                    if (codePoint <= 0xFFFF) {
                        return String.fromCharCode(codePoint);
                    }
                    return astralSubstitute;
                })
                    .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, astralSubstitute);
            }
            // First, detect invalid regular expressions.
            try {
                RegExp(tmp);
            }
            catch (e) {
                this.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
            }
            // Return a regular expression object for this pattern-flag pair, or
            // `null` in case the current environment doesn't support the flags it
            // uses.
            try {
                return new RegExp(pattern, flags);
            }
            catch (exception) {
                /* istanbul ignore next */
                return null;
            }
        };
        Scanner.prototype.scanRegExpBody = function () {
            var ch = this.source[this.index];
            assert_1.assert(ch === '/', 'Regular expression literal must start with a slash');
            var str = this.source[this.index++];
            var classMarker = false;
            var terminated = false;
            while (!this.eof()) {
                ch = this.source[this.index++];
                str += ch;
                if (ch === '\\') {
                    ch = this.source[this.index++];
                    // https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
                    if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                        this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
                    }
                    str += ch;
                }
                else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                    this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
                }
                else if (classMarker) {
                    if (ch === ']') {
                        classMarker = false;
                    }
                }
                else {
                    if (ch === '/') {
                        terminated = true;
                        break;
                    }
                    else if (ch === '[') {
                        classMarker = true;
                    }
                }
            }
            if (!terminated) {
                this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
            }
            // Exclude leading and trailing slash.
            return str.substr(1, str.length - 2);
        };
        Scanner.prototype.scanRegExpFlags = function () {
            var str = '';
            var flags = '';
            while (!this.eof()) {
                var ch = this.source[this.index];
                if (!character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
                    break;
                }
                ++this.index;
                if (ch === '\\' && !this.eof()) {
                    ch = this.source[this.index];
                    if (ch === 'u') {
                        ++this.index;
                        var restore = this.index;
                        var char = this.scanHexEscape('u');
                        if (char !== null) {
                            flags += char;
                            for (str += '\\u'; restore < this.index; ++restore) {
                                str += this.source[restore];
                            }
                        }
                        else {
                            this.index = restore;
                            flags += 'u';
                            str += '\\u';
                        }
                        this.tolerateUnexpectedToken();
                    }
                    else {
                        str += '\\';
                        this.tolerateUnexpectedToken();
                    }
                }
                else {
                    flags += ch;
                    str += ch;
                }
            }
            return flags;
        };
        Scanner.prototype.scanRegExp = function () {
            var start = this.index;
            var pattern = this.scanRegExpBody();
            var flags = this.scanRegExpFlags();
            var value = this.testRegExp(pattern, flags);
            return {
                type: 9 /* RegularExpression */,
                value: '',
                pattern: pattern,
                flags: flags,
                regex: value,
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                start: start,
                end: this.index
            };
        };
        Scanner.prototype.lex = function () {
            if (this.eof()) {
                return {
                    type: 2 /* EOF */,
                    value: '',
                    lineNumber: this.lineNumber,
                    lineStart: this.lineStart,
                    start: this.index,
                    end: this.index
                };
            }
            var cp = this.source.charCodeAt(this.index);
            if (character_1.Character.isIdentifierStart(cp)) {
                return this.scanIdentifier();
            }
            // Very common: ( and ) and ;
            if (cp === 0x28 || cp === 0x29 || cp === 0x3B) {
                return this.scanPunctuator();
            }
            // String literal starts with single quote (U+0027) or double quote (U+0022).
            if (cp === 0x27 || cp === 0x22) {
                return this.scanStringLiteral();
            }
            // Dot (.) U+002E can also start a floating-point number, hence the need
            // to check the next character.
            if (cp === 0x2E) {
                if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1))) {
                    return this.scanNumericLiteral();
                }
                return this.scanPunctuator();
            }
            if (character_1.Character.isDecimalDigit(cp)) {
                return this.scanNumericLiteral();
            }
            // Template literals start with ` (U+0060) for template head
            // or } (U+007D) for template middle or template tail.
            if (cp === 0x60 || (cp === 0x7D && this.curlyStack[this.curlyStack.length - 1] === '${')) {
                return this.scanTemplate();
            }
            // Possible identifier start in a surrogate pair.
            if (cp >= 0xD800 && cp < 0xDFFF) {
                if (character_1.Character.isIdentifierStart(this.codePointAt(this.index))) {
                    return this.scanIdentifier();
                }
            }
            return this.scanPunctuator();
        };
        return Scanner;
    }());
    exports.Scanner = Scanner;

/***/ },
/* 13 */
/***/ function(module, exports) {

    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TokenName = {};
    exports.TokenName[1 /* BooleanLiteral */] = 'Boolean';
    exports.TokenName[2 /* EOF */] = '<end>';
    exports.TokenName[3 /* Identifier */] = 'Identifier';
    exports.TokenName[4 /* Keyword */] = 'Keyword';
    exports.TokenName[5 /* NullLiteral */] = 'Null';
    exports.TokenName[6 /* NumericLiteral */] = 'Numeric';
    exports.TokenName[7 /* Punctuator */] = 'Punctuator';
    exports.TokenName[8 /* StringLiteral */] = 'String';
    exports.TokenName[9 /* RegularExpression */] = 'RegularExpression';
    exports.TokenName[10 /* Template */] = 'Template';

/***/ },
/* 14 */
/***/ function(module, exports) {

    "use strict";
    // Generated by generate-xhtml-entities.js. DO NOT MODIFY!
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XHTMLEntities = {
        quot: '\u0022',
        amp: '\u0026',
        apos: '\u0027',
        gt: '\u003E',
        nbsp: '\u00A0',
        iexcl: '\u00A1',
        cent: '\u00A2',
        pound: '\u00A3',
        curren: '\u00A4',
        yen: '\u00A5',
        brvbar: '\u00A6',
        sect: '\u00A7',
        uml: '\u00A8',
        copy: '\u00A9',
        ordf: '\u00AA',
        laquo: '\u00AB',
        not: '\u00AC',
        shy: '\u00AD',
        reg: '\u00AE',
        macr: '\u00AF',
        deg: '\u00B0',
        plusmn: '\u00B1',
        sup2: '\u00B2',
        sup3: '\u00B3',
        acute: '\u00B4',
        micro: '\u00B5',
        para: '\u00B6',
        middot: '\u00B7',
        cedil: '\u00B8',
        sup1: '\u00B9',
        ordm: '\u00BA',
        raquo: '\u00BB',
        frac14: '\u00BC',
        frac12: '\u00BD',
        frac34: '\u00BE',
        iquest: '\u00BF',
        Agrave: '\u00C0',
        Aacute: '\u00C1',
        Acirc: '\u00C2',
        Atilde: '\u00C3',
        Auml: '\u00C4',
        Aring: '\u00C5',
        AElig: '\u00C6',
        Ccedil: '\u00C7',
        Egrave: '\u00C8',
        Eacute: '\u00C9',
        Ecirc: '\u00CA',
        Euml: '\u00CB',
        Igrave: '\u00CC',
        Iacute: '\u00CD',
        Icirc: '\u00CE',
        Iuml: '\u00CF',
        ETH: '\u00D0',
        Ntilde: '\u00D1',
        Ograve: '\u00D2',
        Oacute: '\u00D3',
        Ocirc: '\u00D4',
        Otilde: '\u00D5',
        Ouml: '\u00D6',
        times: '\u00D7',
        Oslash: '\u00D8',
        Ugrave: '\u00D9',
        Uacute: '\u00DA',
        Ucirc: '\u00DB',
        Uuml: '\u00DC',
        Yacute: '\u00DD',
        THORN: '\u00DE',
        szlig: '\u00DF',
        agrave: '\u00E0',
        aacute: '\u00E1',
        acirc: '\u00E2',
        atilde: '\u00E3',
        auml: '\u00E4',
        aring: '\u00E5',
        aelig: '\u00E6',
        ccedil: '\u00E7',
        egrave: '\u00E8',
        eacute: '\u00E9',
        ecirc: '\u00EA',
        euml: '\u00EB',
        igrave: '\u00EC',
        iacute: '\u00ED',
        icirc: '\u00EE',
        iuml: '\u00EF',
        eth: '\u00F0',
        ntilde: '\u00F1',
        ograve: '\u00F2',
        oacute: '\u00F3',
        ocirc: '\u00F4',
        otilde: '\u00F5',
        ouml: '\u00F6',
        divide: '\u00F7',
        oslash: '\u00F8',
        ugrave: '\u00F9',
        uacute: '\u00FA',
        ucirc: '\u00FB',
        uuml: '\u00FC',
        yacute: '\u00FD',
        thorn: '\u00FE',
        yuml: '\u00FF',
        OElig: '\u0152',
        oelig: '\u0153',
        Scaron: '\u0160',
        scaron: '\u0161',
        Yuml: '\u0178',
        fnof: '\u0192',
        circ: '\u02C6',
        tilde: '\u02DC',
        Alpha: '\u0391',
        Beta: '\u0392',
        Gamma: '\u0393',
        Delta: '\u0394',
        Epsilon: '\u0395',
        Zeta: '\u0396',
        Eta: '\u0397',
        Theta: '\u0398',
        Iota: '\u0399',
        Kappa: '\u039A',
        Lambda: '\u039B',
        Mu: '\u039C',
        Nu: '\u039D',
        Xi: '\u039E',
        Omicron: '\u039F',
        Pi: '\u03A0',
        Rho: '\u03A1',
        Sigma: '\u03A3',
        Tau: '\u03A4',
        Upsilon: '\u03A5',
        Phi: '\u03A6',
        Chi: '\u03A7',
        Psi: '\u03A8',
        Omega: '\u03A9',
        alpha: '\u03B1',
        beta: '\u03B2',
        gamma: '\u03B3',
        delta: '\u03B4',
        epsilon: '\u03B5',
        zeta: '\u03B6',
        eta: '\u03B7',
        theta: '\u03B8',
        iota: '\u03B9',
        kappa: '\u03BA',
        lambda: '\u03BB',
        mu: '\u03BC',
        nu: '\u03BD',
        xi: '\u03BE',
        omicron: '\u03BF',
        pi: '\u03C0',
        rho: '\u03C1',
        sigmaf: '\u03C2',
        sigma: '\u03C3',
        tau: '\u03C4',
        upsilon: '\u03C5',
        phi: '\u03C6',
        chi: '\u03C7',
        psi: '\u03C8',
        omega: '\u03C9',
        thetasym: '\u03D1',
        upsih: '\u03D2',
        piv: '\u03D6',
        ensp: '\u2002',
        emsp: '\u2003',
        thinsp: '\u2009',
        zwnj: '\u200C',
        zwj: '\u200D',
        lrm: '\u200E',
        rlm: '\u200F',
        ndash: '\u2013',
        mdash: '\u2014',
        lsquo: '\u2018',
        rsquo: '\u2019',
        sbquo: '\u201A',
        ldquo: '\u201C',
        rdquo: '\u201D',
        bdquo: '\u201E',
        dagger: '\u2020',
        Dagger: '\u2021',
        bull: '\u2022',
        hellip: '\u2026',
        permil: '\u2030',
        prime: '\u2032',
        Prime: '\u2033',
        lsaquo: '\u2039',
        rsaquo: '\u203A',
        oline: '\u203E',
        frasl: '\u2044',
        euro: '\u20AC',
        image: '\u2111',
        weierp: '\u2118',
        real: '\u211C',
        trade: '\u2122',
        alefsym: '\u2135',
        larr: '\u2190',
        uarr: '\u2191',
        rarr: '\u2192',
        darr: '\u2193',
        harr: '\u2194',
        crarr: '\u21B5',
        lArr: '\u21D0',
        uArr: '\u21D1',
        rArr: '\u21D2',
        dArr: '\u21D3',
        hArr: '\u21D4',
        forall: '\u2200',
        part: '\u2202',
        exist: '\u2203',
        empty: '\u2205',
        nabla: '\u2207',
        isin: '\u2208',
        notin: '\u2209',
        ni: '\u220B',
        prod: '\u220F',
        sum: '\u2211',
        minus: '\u2212',
        lowast: '\u2217',
        radic: '\u221A',
        prop: '\u221D',
        infin: '\u221E',
        ang: '\u2220',
        and: '\u2227',
        or: '\u2228',
        cap: '\u2229',
        cup: '\u222A',
        int: '\u222B',
        there4: '\u2234',
        sim: '\u223C',
        cong: '\u2245',
        asymp: '\u2248',
        ne: '\u2260',
        equiv: '\u2261',
        le: '\u2264',
        ge: '\u2265',
        sub: '\u2282',
        sup: '\u2283',
        nsub: '\u2284',
        sube: '\u2286',
        supe: '\u2287',
        oplus: '\u2295',
        otimes: '\u2297',
        perp: '\u22A5',
        sdot: '\u22C5',
        lceil: '\u2308',
        rceil: '\u2309',
        lfloor: '\u230A',
        rfloor: '\u230B',
        loz: '\u25CA',
        spades: '\u2660',
        clubs: '\u2663',
        hearts: '\u2665',
        diams: '\u2666',
        lang: '\u27E8',
        rang: '\u27E9'
    };

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var error_handler_1 = __webpack_require__(10);
    var scanner_1 = __webpack_require__(12);
    var token_1 = __webpack_require__(13);
    var Reader = (function () {
        function Reader() {
            this.values = [];
            this.curly = this.paren = -1;
        }
        // A function following one of those tokens is an expression.
        Reader.prototype.beforeFunctionExpression = function (t) {
            return ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new',
                'return', 'case', 'delete', 'throw', 'void',
                // assignment operators
                '=', '+=', '-=', '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=',
                '&=', '|=', '^=', ',',
                // binary/unary operators
                '+', '-', '*', '**', '/', '%', '++', '--', '<<', '>>', '>>>', '&',
                '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=',
                '<=', '<', '>', '!=', '!=='].indexOf(t) >= 0;
        };
        // Determine if forward slash (/) is an operator or part of a regular expression
        // https://github.com/mozilla/sweet.js/wiki/design
        Reader.prototype.isRegexStart = function () {
            var previous = this.values[this.values.length - 1];
            var regex = (previous !== null);
            switch (previous) {
                case 'this':
                case ']':
                    regex = false;
                    break;
                case ')':
                    var keyword = this.values[this.paren - 1];
                    regex = (keyword === 'if' || keyword === 'while' || keyword === 'for' || keyword === 'with');
                    break;
                case '}':
                    // Dividing a function by anything makes little sense,
                    // but we have to check for that.
                    regex = false;
                    if (this.values[this.curly - 3] === 'function') {
                        // Anonymous function, e.g. function(){} /42
                        var check = this.values[this.curly - 4];
                        regex = check ? !this.beforeFunctionExpression(check) : false;
                    }
                    else if (this.values[this.curly - 4] === 'function') {
                        // Named function, e.g. function f(){} /42/
                        var check = this.values[this.curly - 5];
                        regex = check ? !this.beforeFunctionExpression(check) : true;
                    }
                    break;
                default:
                    break;
            }
            return regex;
        };
        Reader.prototype.push = function (token) {
            if (token.type === 7 /* Punctuator */ || token.type === 4 /* Keyword */) {
                if (token.value === '{') {
                    this.curly = this.values.length;
                }
                else if (token.value === '(') {
                    this.paren = this.values.length;
                }
                this.values.push(token.value);
            }
            else {
                this.values.push(null);
            }
        };
        return Reader;
    }());
    var Tokenizer = (function () {
        function Tokenizer(code, config) {
            this.errorHandler = new error_handler_1.ErrorHandler();
            this.errorHandler.tolerant = config ? (typeof config.tolerant === 'boolean' && config.tolerant) : false;
            this.scanner = new scanner_1.Scanner(code, this.errorHandler);
            this.scanner.trackComment = config ? (typeof config.comment === 'boolean' && config.comment) : false;
            this.trackRange = config ? (typeof config.range === 'boolean' && config.range) : false;
            this.trackLoc = config ? (typeof config.loc === 'boolean' && config.loc) : false;
            this.buffer = [];
            this.reader = new Reader();
        }
        Tokenizer.prototype.errors = function () {
            return this.errorHandler.errors;
        };
        Tokenizer.prototype.getNextToken = function () {
            if (this.buffer.length === 0) {
                var comments = this.scanner.scanComments();
                if (this.scanner.trackComment) {
                    for (var i = 0; i < comments.length; ++i) {
                        var e = comments[i];
                        var value = this.scanner.source.slice(e.slice[0], e.slice[1]);
                        var comment = {
                            type: e.multiLine ? 'BlockComment' : 'LineComment',
                            value: value
                        };
                        if (this.trackRange) {
                            comment.range = e.range;
                        }
                        if (this.trackLoc) {
                            comment.loc = e.loc;
                        }
                        this.buffer.push(comment);
                    }
                }
                if (!this.scanner.eof()) {
                    var loc = void 0;
                    if (this.trackLoc) {
                        loc = {
                            start: {
                                line: this.scanner.lineNumber,
                                column: this.scanner.index - this.scanner.lineStart
                            },
                            end: {}
                        };
                    }
                    var startRegex = (this.scanner.source[this.scanner.index] === '/') && this.reader.isRegexStart();
                    var token = startRegex ? this.scanner.scanRegExp() : this.scanner.lex();
                    this.reader.push(token);
                    var entry = {
                        type: token_1.TokenName[token.type],
                        value: this.scanner.source.slice(token.start, token.end)
                    };
                    if (this.trackRange) {
                        entry.range = [token.start, token.end];
                    }
                    if (this.trackLoc) {
                        loc.end = {
                            line: this.scanner.lineNumber,
                            column: this.scanner.index - this.scanner.lineStart
                        };
                        entry.loc = loc;
                    }
                    if (token.type === 9 /* RegularExpression */) {
                        var pattern = token.pattern;
                        var flags = token.flags;
                        entry.regex = { pattern: pattern, flags: flags };
                    }
                    this.buffer.push(entry);
                }
            }
            return this.buffer.shift();
        };
        return Tokenizer;
    }());
    exports.Tokenizer = Tokenizer;

/***/ }
/******/ ])
});
;
}());



/*
file https://github.com/estools/estraverse/blob/1.9.3/estraverse.js
*/
/* istanbul ignore next */
(function () { var exports; exports = local.estraverse = {};
/*
  Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/*jslint vars:false, bitwise:true*/
/*jshint indent:4*/
/*global exports:true*/
(function clone(exports) {
    'use strict';

    var Syntax,
        isArray,
        VisitorOption,
        VisitorKeys,
        objectCreate,
        objectKeys,
        BREAK,
        SKIP,
        REMOVE;

    function ignoreJSHintError() { }

    isArray = Array.isArray;
    if (!isArray) {
        isArray = function isArray(array) {
            return Object.prototype.toString.call(array) === '[object Array]';
        };
    }

    function deepCopy(obj) {
        var ret = {}, key, val;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                val = obj[key];
                if (typeof val === 'object' && val !== null) {
                    ret[key] = deepCopy(val);
                } else {
                    ret[key] = val;
                }
            }
        }
        return ret;
    }

    function shallowCopy(obj) {
        var ret = {}, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    }
    ignoreJSHintError(shallowCopy);

    // based on LLVM libc++ upper_bound / lower_bound
    // MIT License

    function upperBound(array, func) {
        var diff, len, i, current;

        len = array.length;
        i = 0;

        while (len) {
            diff = len >>> 1;
            current = i + diff;
            if (func(array[current])) {
                len = diff;
            } else {
                i = current + 1;
                len -= diff + 1;
            }
        }
        return i;
    }

    function lowerBound(array, func) {
        var diff, len, i, current;

        len = array.length;
        i = 0;

        while (len) {
            diff = len >>> 1;
            current = i + diff;
            if (func(array[current])) {
                i = current + 1;
                len -= diff + 1;
            } else {
                len = diff;
            }
        }
        return i;
    }
    ignoreJSHintError(lowerBound);

    objectCreate = Object.create || (function () {
        function F() { }

        return function (o) {
            F.prototype = o;
            return new F();
        };
    })();

    objectKeys = Object.keys || function (o) {
        var keys = [], key;
        for (key in o) {
            keys.push(key);
        }
        return keys;
    };

    function extend(to, from) {
        var keys = objectKeys(from), key, i, len;
        for (i = 0, len = keys.length; i < len; i += 1) {
            key = keys[i];
            to[key] = from[key];
        }
        return to;
    }

    Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        AssignmentPattern: 'AssignmentPattern',
        ArrayExpression: 'ArrayExpression',
        ArrayPattern: 'ArrayPattern',
        ArrowFunctionExpression: 'ArrowFunctionExpression',
        AwaitExpression: 'AwaitExpression', // CAUTION: It's deferred to ES7.
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ClassBody: 'ClassBody',
        ClassDeclaration: 'ClassDeclaration',
        ClassExpression: 'ClassExpression',
        ComprehensionBlock: 'ComprehensionBlock',  // CAUTION: It's deferred to ES7.
        ComprehensionExpression: 'ComprehensionExpression',  // CAUTION: It's deferred to ES7.
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DebuggerStatement: 'DebuggerStatement',
        DirectiveStatement: 'DirectiveStatement',
        DoWhileStatement: 'DoWhileStatement',
        EmptyStatement: 'EmptyStatement',
        ExportAllDeclaration: 'ExportAllDeclaration',
        ExportDefaultDeclaration: 'ExportDefaultDeclaration',
        ExportNamedDeclaration: 'ExportNamedDeclaration',
        ExportSpecifier: 'ExportSpecifier',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        ForOfStatement: 'ForOfStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        GeneratorExpression: 'GeneratorExpression',  // CAUTION: It's deferred to ES7.
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        ImportDeclaration: 'ImportDeclaration',
        ImportDefaultSpecifier: 'ImportDefaultSpecifier',
        ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
        ImportSpecifier: 'ImportSpecifier',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        MetaProperty: 'MetaProperty',
        MethodDefinition: 'MethodDefinition',
        ModuleSpecifier: 'ModuleSpecifier',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        ObjectPattern: 'ObjectPattern',
        Program: 'Program',
        Property: 'Property',
        RestElement: 'RestElement',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SpreadElement: 'SpreadElement',
        Super: 'Super',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        TaggedTemplateExpression: 'TaggedTemplateExpression',
        TemplateElement: 'TemplateElement',
        TemplateLiteral: 'TemplateLiteral',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement',
        YieldExpression: 'YieldExpression'
    };

    VisitorKeys = {
        AssignmentExpression: ['left', 'right'],
        AssignmentPattern: ['left', 'right'],
        ArrayExpression: ['elements'],
        ArrayPattern: ['elements'],
        ArrowFunctionExpression: ['params', 'body'],
        AwaitExpression: ['argument'], // CAUTION: It's deferred to ES7.
        BlockStatement: ['body'],
        BinaryExpression: ['left', 'right'],
        BreakStatement: ['label'],
        CallExpression: ['callee', 'arguments'],
        CatchClause: ['param', 'body'],
        ClassBody: ['body'],
        ClassDeclaration: ['id', 'superClass', 'body'],
        ClassExpression: ['id', 'superClass', 'body'],
        ComprehensionBlock: ['left', 'right'],  // CAUTION: It's deferred to ES7.
        ComprehensionExpression: ['blocks', 'filter', 'body'],  // CAUTION: It's deferred to ES7.
        ConditionalExpression: ['test', 'consequent', 'alternate'],
        ContinueStatement: ['label'],
        DebuggerStatement: [],
        DirectiveStatement: [],
        DoWhileStatement: ['body', 'test'],
        EmptyStatement: [],
        ExportAllDeclaration: ['source'],
        ExportDefaultDeclaration: ['declaration'],
        ExportNamedDeclaration: ['declaration', 'specifiers', 'source'],
        ExportSpecifier: ['exported', 'local'],
        ExpressionStatement: ['expression'],
        ForStatement: ['init', 'test', 'update', 'body'],
        ForInStatement: ['left', 'right', 'body'],
        ForOfStatement: ['left', 'right', 'body'],
        FunctionDeclaration: ['id', 'params', 'body'],
        FunctionExpression: ['id', 'params', 'body'],
        GeneratorExpression: ['blocks', 'filter', 'body'],  // CAUTION: It's deferred to ES7.
        Identifier: [],
        IfStatement: ['test', 'consequent', 'alternate'],
        ImportDeclaration: ['specifiers', 'source'],
        ImportDefaultSpecifier: ['local'],
        ImportNamespaceSpecifier: ['local'],
        ImportSpecifier: ['imported', 'local'],
        Literal: [],
        LabeledStatement: ['label', 'body'],
        LogicalExpression: ['left', 'right'],
        MemberExpression: ['object', 'property'],
        MetaProperty: ['meta', 'property'],
        MethodDefinition: ['key', 'value'],
        ModuleSpecifier: [],
        NewExpression: ['callee', 'arguments'],
        ObjectExpression: ['properties'],
        ObjectPattern: ['properties'],
        Program: ['body'],
        Property: ['key', 'value'],
        RestElement: [ 'argument' ],
        ReturnStatement: ['argument'],
        SequenceExpression: ['expressions'],
        SpreadElement: ['argument'],
        Super: [],
        SwitchStatement: ['discriminant', 'cases'],
        SwitchCase: ['test', 'consequent'],
        TaggedTemplateExpression: ['tag', 'quasi'],
        TemplateElement: [],
        TemplateLiteral: ['quasis', 'expressions'],
        ThisExpression: [],
        ThrowStatement: ['argument'],
        TryStatement: ['block', 'handler', 'finalizer'],
        UnaryExpression: ['argument'],
        UpdateExpression: ['argument'],
        VariableDeclaration: ['declarations'],
        VariableDeclarator: ['id', 'init'],
        WhileStatement: ['test', 'body'],
        WithStatement: ['object', 'body'],
        YieldExpression: ['argument']
    };

    // unique id
    BREAK = {};
    SKIP = {};
    REMOVE = {};

    VisitorOption = {
        Break: BREAK,
        Skip: SKIP,
        Remove: REMOVE
    };

    function Reference(parent, key) {
        this.parent = parent;
        this.key = key;
    }

    Reference.prototype.replace = function replace(node) {
        this.parent[this.key] = node;
    };

    Reference.prototype.remove = function remove() {
        if (isArray(this.parent)) {
            this.parent.splice(this.key, 1);
            return true;
        } else {
            this.replace(null);
            return false;
        }
    };

    function Element(node, path, wrap, ref) {
        this.node = node;
        this.path = path;
        this.wrap = wrap;
        this.ref = ref;
    }

    function Controller() { }

    // API:
    // return property path array from root to current node
    Controller.prototype.path = function path() {
        var i, iz, j, jz, result, element;

        function addToPath(result, path) {
            if (isArray(path)) {
                for (j = 0, jz = path.length; j < jz; ++j) {
                    result.push(path[j]);
                }
            } else {
                result.push(path);
            }
        }

        // root node
        if (!this.__current.path) {
            return null;
        }

        // first node is sentinel, second node is root element
        result = [];
        for (i = 2, iz = this.__leavelist.length; i < iz; ++i) {
            element = this.__leavelist[i];
            addToPath(result, element.path);
        }
        addToPath(result, this.__current.path);
        return result;
    };

    // API:
    // return type of current node
    Controller.prototype.type = function () {
        var node = this.current();
        return node.type || this.__current.wrap;
    };

    // API:
    // return array of parent elements
    Controller.prototype.parents = function parents() {
        var i, iz, result;

        // first node is sentinel
        result = [];
        for (i = 1, iz = this.__leavelist.length; i < iz; ++i) {
            result.push(this.__leavelist[i].node);
        }

        return result;
    };

    // API:
    // return current node
    Controller.prototype.current = function current() {
        return this.__current.node;
    };

    Controller.prototype.__execute = function __execute(callback, element) {
        var previous, result;

        result = undefined;

        previous  = this.__current;
        this.__current = element;
        this.__state = null;
        if (callback) {
            result = callback.call(this, element.node, this.__leavelist[this.__leavelist.length - 1].node);
        }
        this.__current = previous;

        return result;
    };

    // API:
    // notify control skip / break
    Controller.prototype.notify = function notify(flag) {
        this.__state = flag;
    };

    // API:
    // skip child nodes of current node
    Controller.prototype.skip = function () {
        this.notify(SKIP);
    };

    // API:
    // break traversals
    Controller.prototype['break'] = function () {
        this.notify(BREAK);
    };

    // API:
    // remove node
    Controller.prototype.remove = function () {
        this.notify(REMOVE);
    };

    Controller.prototype.__initialize = function(root, visitor) {
        this.visitor = visitor;
        this.root = root;
        this.__worklist = [];
        this.__leavelist = [];
        this.__current = null;
        this.__state = null;
        this.__fallback = null;
        if (visitor.fallback === 'iteration') {
            this.__fallback = objectKeys;
        } else if (typeof visitor.fallback === 'function') {
            this.__fallback = visitor.fallback;
        }

        this.__keys = VisitorKeys;
        if (visitor.keys) {
            this.__keys = extend(objectCreate(this.__keys), visitor.keys);
        }
    };

    function isNode(node) {
        if (node == null) {
            return false;
        }
        return typeof node === 'object' && typeof node.type === 'string';
    }

    function isProperty(nodeType, key) {
        return (nodeType === Syntax.ObjectExpression || nodeType === Syntax.ObjectPattern) && 'properties' === key;
    }

    Controller.prototype.traverse = function traverse(root, visitor) {
        var worklist,
            leavelist,
            element,
            node,
            nodeType,
            ret,
            key,
            current,
            current2,
            candidates,
            candidate,
            sentinel;

        this.__initialize(root, visitor);

        sentinel = {};

        // reference
        worklist = this.__worklist;
        leavelist = this.__leavelist;

        // initialize
        worklist.push(new Element(root, null, null, null));
        leavelist.push(new Element(null, null, null, null));

        while (worklist.length) {
            element = worklist.pop();

            if (element === sentinel) {
                element = leavelist.pop();

                ret = this.__execute(visitor.leave, element);

                if (this.__state === BREAK || ret === BREAK) {
                    return;
                }
                continue;
            }

            if (element.node) {

                ret = this.__execute(visitor.enter, element);

                if (this.__state === BREAK || ret === BREAK) {
                    return;
                }

                worklist.push(sentinel);
                leavelist.push(element);

                if (this.__state === SKIP || ret === SKIP) {
                    continue;
                }

                node = element.node;
                nodeType = node.type || element.wrap;
                candidates = this.__keys[nodeType];
                if (!candidates) {
                    if (this.__fallback) {
                        candidates = this.__fallback(node);
                    } else {
                        throw new Error('Unknown node type ' + nodeType + '.');
                    }
                }

                current = candidates.length;
                while ((current -= 1) >= 0) {
                    key = candidates[current];
                    candidate = node[key];
                    if (!candidate) {
                        continue;
                    }

                    if (isArray(candidate)) {
                        current2 = candidate.length;
                        while ((current2 -= 1) >= 0) {
                            if (!candidate[current2]) {
                                continue;
                            }
                            if (isProperty(nodeType, candidates[current])) {
                                element = new Element(candidate[current2], [key, current2], 'Property', null);
                            } else if (isNode(candidate[current2])) {
                                element = new Element(candidate[current2], [key, current2], null, null);
                            } else {
                                continue;
                            }
                            worklist.push(element);
                        }
                    } else if (isNode(candidate)) {
                        worklist.push(new Element(candidate, key, null, null));
                    }
                }
            }
        }
    };

    Controller.prototype.replace = function replace(root, visitor) {
        var worklist,
            leavelist,
            node,
            nodeType,
            target,
            element,
            current,
            current2,
            candidates,
            candidate,
            sentinel,
            outer,
            key;

        function removeElem(element) {
            var i,
                key,
                nextElem,
                parent;

            if (element.ref.remove()) {
                // When the reference is an element of an array.
                key = element.ref.key;
                parent = element.ref.parent;

                // If removed from array, then decrease following items' keys.
                i = worklist.length;
                while (i--) {
                    nextElem = worklist[i];
                    if (nextElem.ref && nextElem.ref.parent === parent) {
                        if  (nextElem.ref.key < key) {
                            break;
                        }
                        --nextElem.ref.key;
                    }
                }
            }
        }

        this.__initialize(root, visitor);

        sentinel = {};

        // reference
        worklist = this.__worklist;
        leavelist = this.__leavelist;

        // initialize
        outer = {
            root: root
        };
        element = new Element(root, null, null, new Reference(outer, 'root'));
        worklist.push(element);
        leavelist.push(element);

        while (worklist.length) {
            element = worklist.pop();

            if (element === sentinel) {
                element = leavelist.pop();

                target = this.__execute(visitor.leave, element);

                // node may be replaced with null,
                // so distinguish between undefined and null in this place
                if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
                    // replace
                    element.ref.replace(target);
                }

                if (this.__state === REMOVE || target === REMOVE) {
                    removeElem(element);
                }

                if (this.__state === BREAK || target === BREAK) {
                    return outer.root;
                }
                continue;
            }

            target = this.__execute(visitor.enter, element);

            // node may be replaced with null,
            // so distinguish between undefined and null in this place
            if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
                // replace
                element.ref.replace(target);
                element.node = target;
            }

            if (this.__state === REMOVE || target === REMOVE) {
                removeElem(element);
                element.node = null;
            }

            if (this.__state === BREAK || target === BREAK) {
                return outer.root;
            }

            // node may be null
            node = element.node;
            if (!node) {
                continue;
            }

            worklist.push(sentinel);
            leavelist.push(element);

            if (this.__state === SKIP || target === SKIP) {
                continue;
            }

            nodeType = node.type || element.wrap;
            candidates = this.__keys[nodeType];
            if (!candidates) {
                if (this.__fallback) {
                    candidates = this.__fallback(node);
                } else {
                    throw new Error('Unknown node type ' + nodeType + '.');
                }
            }

            current = candidates.length;
            while ((current -= 1) >= 0) {
                key = candidates[current];
                candidate = node[key];
                if (!candidate) {
                    continue;
                }

                if (isArray(candidate)) {
                    current2 = candidate.length;
                    while ((current2 -= 1) >= 0) {
                        if (!candidate[current2]) {
                            continue;
                        }
                        if (isProperty(nodeType, candidates[current])) {
                            element = new Element(candidate[current2], [key, current2], 'Property', new Reference(candidate, current2));
                        } else if (isNode(candidate[current2])) {
                            element = new Element(candidate[current2], [key, current2], null, new Reference(candidate, current2));
                        } else {
                            continue;
                        }
                        worklist.push(element);
                    }
                } else if (isNode(candidate)) {
                    worklist.push(new Element(candidate, key, null, new Reference(node, key)));
                }
            }
        }

        return outer.root;
    };

    function traverse(root, visitor) {
        var controller = new Controller();
        return controller.traverse(root, visitor);
    }

    function replace(root, visitor) {
        var controller = new Controller();
        return controller.replace(root, visitor);
    }

    function extendCommentRange(comment, tokens) {
        var target;

        target = upperBound(tokens, function search(token) {
            return token.range[0] > comment.range[0];
        });

        comment.extendedRange = [comment.range[0], comment.range[1]];

        if (target !== tokens.length) {
            comment.extendedRange[1] = tokens[target].range[0];
        }

        target -= 1;
        if (target >= 0) {
            comment.extendedRange[0] = tokens[target].range[1];
        }

        return comment;
    }

    function attachComments(tree, providedComments, tokens) {
        // At first, we should calculate extended comment ranges.
        var comments = [], comment, len, i, cursor;

        if (!tree.range) {
            throw new Error('attachComments needs range information');
        }

        // tokens array is empty, we attach comments to tree as 'leadingComments'
        if (!tokens.length) {
            if (providedComments.length) {
                for (i = 0, len = providedComments.length; i < len; i += 1) {
                    comment = deepCopy(providedComments[i]);
                    comment.extendedRange = [0, tree.range[0]];
                    comments.push(comment);
                }
                tree.leadingComments = comments;
            }
            return tree;
        }

        for (i = 0, len = providedComments.length; i < len; i += 1) {
            comments.push(extendCommentRange(deepCopy(providedComments[i]), tokens));
        }

        // This is based on John Freeman's implementation.
        cursor = 0;
        traverse(tree, {
            enter: function (node) {
                var comment;

                while (cursor < comments.length) {
                    comment = comments[cursor];
                    if (comment.extendedRange[1] > node.range[0]) {
                        break;
                    }

                    if (comment.extendedRange[1] === node.range[0]) {
                        if (!node.leadingComments) {
                            node.leadingComments = [];
                        }
                        node.leadingComments.push(comment);
                        comments.splice(cursor, 1);
                    } else {
                        cursor += 1;
                    }
                }

                // already out of owned node
                if (cursor === comments.length) {
                    return VisitorOption.Break;
                }

                if (comments[cursor].extendedRange[0] > node.range[1]) {
                    return VisitorOption.Skip;
                }
            }
        });

        cursor = 0;
        traverse(tree, {
            leave: function (node) {
                var comment;

                while (cursor < comments.length) {
                    comment = comments[cursor];
                    if (node.range[1] < comment.extendedRange[0]) {
                        break;
                    }

                    if (node.range[1] === comment.extendedRange[0]) {
                        if (!node.trailingComments) {
                            node.trailingComments = [];
                        }
                        node.trailingComments.push(comment);
                        comments.splice(cursor, 1);
                    } else {
                        cursor += 1;
                    }
                }

                // already out of owned node
                if (cursor === comments.length) {
                    return VisitorOption.Break;
                }

                if (comments[cursor].extendedRange[0] > node.range[1]) {
                    return VisitorOption.Skip;
                }
            }
        });

        return tree;
    }

    exports.version = require('./package.json').version;
    exports.Syntax = Syntax;
    exports.traverse = traverse;
    exports.replace = replace;
    exports.attachComments = attachComments;
    exports.VisitorKeys = VisitorKeys;
    exports.VisitorOption = VisitorOption;
    exports.Controller = Controller;
    exports.cloneEnvironment = function () { return clone({}); };

    return exports;
}(exports));
/* vim: set sw=4 ts=4 et tw=80 : */
}());



/*
file https://github.com/estools/esutils/blob/2.0.2/lib/code.js
*/
/* istanbul ignore next */
(function () { var module; module = {};
/*
  Copyright (C) 2013-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    var ES6Regex, ES5Regex, NON_ASCII_WHITESPACES, IDENTIFIER_START, IDENTIFIER_PART, ch;

    // See `tools/generate-identifier-regex.js`.
    ES5Regex = {
        // ECMAScript 5.1/Unicode v9.0.0 NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
        // ECMAScript 5.1/Unicode v9.0.0 NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/
    };

    ES6Regex = {
        // ECMAScript 6/Unicode v9.0.0 NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
        // ECMAScript 6/Unicode v9.0.0 NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
    };

    function isDecimalDigit(ch) {
        return 0x30 <= ch && ch <= 0x39;  // 0..9
    }

    function isHexDigit(ch) {
        return 0x30 <= ch && ch <= 0x39 ||  // 0..9
            0x61 <= ch && ch <= 0x66 ||     // a..f
            0x41 <= ch && ch <= 0x46;       // A..F
    }

    function isOctalDigit(ch) {
        return ch >= 0x30 && ch <= 0x37;  // 0..7
    }

    // 7.2 White Space

    NON_ASCII_WHITESPACES = [
        0x1680,
        0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A,
        0x202F, 0x205F,
        0x3000,
        0xFEFF
    ];

    function isWhiteSpace(ch) {
        return ch === 0x20 || ch === 0x09 || ch === 0x0B || ch === 0x0C || ch === 0xA0 ||
            ch >= 0x1680 && NON_ASCII_WHITESPACES.indexOf(ch) >= 0;
    }

    // 7.3 Line Terminators

    function isLineTerminator(ch) {
        return ch === 0x0A || ch === 0x0D || ch === 0x2028 || ch === 0x2029;
    }

    // 7.6 Identifier Names and Identifiers

    function fromCodePoint(cp) {
        if (cp <= 0xFFFF) { return String.fromCharCode(cp); }
        var cu1 = String.fromCharCode(Math.floor((cp - 0x10000) / 0x400) + 0xD800);
        var cu2 = String.fromCharCode(((cp - 0x10000) % 0x400) + 0xDC00);
        return cu1 + cu2;
    }

    IDENTIFIER_START = new Array(0x80);
    for(ch = 0; ch < 0x80; ++ch) {
        IDENTIFIER_START[ch] =
            ch >= 0x61 && ch <= 0x7A ||  // a..z
            ch >= 0x41 && ch <= 0x5A ||  // A..Z
            ch === 0x24 || ch === 0x5F;  // $ (dollar) and _ (underscore)
    }

    IDENTIFIER_PART = new Array(0x80);
    for(ch = 0; ch < 0x80; ++ch) {
        IDENTIFIER_PART[ch] =
            ch >= 0x61 && ch <= 0x7A ||  // a..z
            ch >= 0x41 && ch <= 0x5A ||  // A..Z
            ch >= 0x30 && ch <= 0x39 ||  // 0..9
            ch === 0x24 || ch === 0x5F;  // $ (dollar) and _ (underscore)
    }

    function isIdentifierStartES5(ch) {
        return ch < 0x80 ? IDENTIFIER_START[ch] : ES5Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
    }

    function isIdentifierPartES5(ch) {
        return ch < 0x80 ? IDENTIFIER_PART[ch] : ES5Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
    }

    function isIdentifierStartES6(ch) {
        return ch < 0x80 ? IDENTIFIER_START[ch] : ES6Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
    }

    function isIdentifierPartES6(ch) {
        return ch < 0x80 ? IDENTIFIER_PART[ch] : ES6Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
    }

    module.exports = {
        isDecimalDigit: isDecimalDigit,
        isHexDigit: isHexDigit,
        isOctalDigit: isOctalDigit,
        isWhiteSpace: isWhiteSpace,
        isLineTerminator: isLineTerminator,
        isIdentifierStartES5: isIdentifierStartES5,
        isIdentifierPartES5: isIdentifierPartES5,
        isIdentifierStartES6: isIdentifierStartES6,
        isIdentifierPartES6: isIdentifierPartES6
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */
local.esutils = { code: module.exports }; }());



/*
file https://github.com/estools/escodegen/blob/1.8.1/escodegen.js
*/
/* istanbul ignore next */
(function () { var exports; exports = local.escodegen = {};
/*
  Copyright (C) 2012-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2015 Ingvar Stepanyan <me@rreverser.com>
  Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>
  Copyright (C) 2012-2013 Michael Ficarra <escodegen.copyright@michael.ficarra.me>
  Copyright (C) 2012-2013 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2013 Irakli Gozalishvili <rfobic@gmail.com>
  Copyright (C) 2012 Robert Gust-Bardon <donate@robert.gust-bardon.org>
  Copyright (C) 2012 John Freeman <jfreeman08@gmail.com>
  Copyright (C) 2011-2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*global exports:true, require:true, global:true*/
(function () {
    'use strict';

    var Syntax,
        Precedence,
        BinaryPrecedence,
        SourceNode,
        estraverse,
        esutils,
        isArray,
        base,
        indent,
        json,
        renumber,
        hexadecimal,
        quotes,
        escapeless,
        newline,
        space,
        parentheses,
        semicolons,
        safeConcatenation,
        directive,
        extra,
        parse,
        sourceMap,
        sourceCode,
        preserveBlankLines,
        FORMAT_MINIFY,
        FORMAT_DEFAULTS;

    estraverse = require('estraverse');
    esutils = require('esutils');

    Syntax = estraverse.Syntax;

    // Generation is done by generateExpression.
    function isExpression(node) {
        return CodeGenerator.Expression.hasOwnProperty(node.type);
    }

    // Generation is done by generateStatement.
    function isStatement(node) {
        return CodeGenerator.Statement.hasOwnProperty(node.type);
    }

    Precedence = {
        Sequence: 0,
        Yield: 1,
        Await: 1,
        Assignment: 1,
        Conditional: 2,
        ArrowFunction: 2,
        LogicalOR: 3,
        LogicalAND: 4,
        BitwiseOR: 5,
        BitwiseXOR: 6,
        BitwiseAND: 7,
        Equality: 8,
        Relational: 9,
        BitwiseSHIFT: 10,
        Additive: 11,
        Multiplicative: 12,
        Unary: 13,
        Postfix: 14,
        Call: 15,
        New: 16,
        TaggedTemplate: 17,
        Member: 18,
        Primary: 19
    };

    BinaryPrecedence = {
        '||': Precedence.LogicalOR,
        '&&': Precedence.LogicalAND,
        '|': Precedence.BitwiseOR,
        '^': Precedence.BitwiseXOR,
        '&': Precedence.BitwiseAND,
        '==': Precedence.Equality,
        '!=': Precedence.Equality,
        '===': Precedence.Equality,
        '!==': Precedence.Equality,
        'is': Precedence.Equality,
        'isnt': Precedence.Equality,
        '<': Precedence.Relational,
        '>': Precedence.Relational,
        '<=': Precedence.Relational,
        '>=': Precedence.Relational,
        'in': Precedence.Relational,
        'instanceof': Precedence.Relational,
        '<<': Precedence.BitwiseSHIFT,
        '>>': Precedence.BitwiseSHIFT,
        '>>>': Precedence.BitwiseSHIFT,
        '+': Precedence.Additive,
        '-': Precedence.Additive,
        '*': Precedence.Multiplicative,
        '%': Precedence.Multiplicative,
        '/': Precedence.Multiplicative
    };

    //Flags
    var F_ALLOW_IN = 1,
        F_ALLOW_CALL = 1 << 1,
        F_ALLOW_UNPARATH_NEW = 1 << 2,
        F_FUNC_BODY = 1 << 3,
        F_DIRECTIVE_CTX = 1 << 4,
        F_SEMICOLON_OPT = 1 << 5;

    //Expression flag sets
    //NOTE: Flag order:
    // F_ALLOW_IN
    // F_ALLOW_CALL
    // F_ALLOW_UNPARATH_NEW
    var E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
        E_TTF = F_ALLOW_IN | F_ALLOW_CALL,
        E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
        E_TFF = F_ALLOW_IN,
        E_FFT = F_ALLOW_UNPARATH_NEW,
        E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW;

    //Statement flag sets
    //NOTE: Flag order:
    // F_ALLOW_IN
    // F_FUNC_BODY
    // F_DIRECTIVE_CTX
    // F_SEMICOLON_OPT
    var S_TFFF = F_ALLOW_IN,
        S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT,
        S_FFFF = 0x00,
        S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX,
        S_TTFF = F_ALLOW_IN | F_FUNC_BODY;

    function getDefaultOptions() {
        // default options
        return {
            indent: null,
            base: null,
            parse: null,
            comment: false,
            format: {
                indent: {
                    style: '    ',
                    base: 0,
                    adjustMultilineComment: false
                },
                newline: '\n',
                space: ' ',
                json: false,
                renumber: false,
                hexadecimal: false,
                quotes: 'single',
                escapeless: false,
                compact: false,
                parentheses: true,
                semicolons: true,
                safeConcatenation: false,
                preserveBlankLines: false
            },
            moz: {
                comprehensionExpressionStartsWithAssignment: false,
                starlessGenerator: false
            },
            sourceMap: null,
            sourceMapRoot: null,
            sourceMapWithCode: false,
            directive: false,
            raw: true,
            verbatim: null,
            sourceCode: null
        };
    }

    function stringRepeat(str, num) {
        var result = '';

        for (num |= 0; num > 0; num >>>= 1, str += str) {
            if (num & 1) {
                result += str;
            }
        }

        return result;
    }

    isArray = Array.isArray;
    if (!isArray) {
        isArray = function isArray(array) {
            return Object.prototype.toString.call(array) === '[object Array]';
        };
    }

    function hasLineTerminator(str) {
        return (/[\r\n]/g).test(str);
    }

    function endsWithLineTerminator(str) {
        var len = str.length;
        return len && esutils.code.isLineTerminator(str.charCodeAt(len - 1));
    }

    function merge(target, override) {
        var key;
        for (key in override) {
            if (override.hasOwnProperty(key)) {
                target[key] = override[key];
            }
        }
        return target;
    }

    function updateDeeply(target, override) {
        var key, val;

        function isHashObject(target) {
            return typeof target === 'object' && target instanceof Object && !(target instanceof RegExp);
        }

        for (key in override) {
            if (override.hasOwnProperty(key)) {
                val = override[key];
                if (isHashObject(val)) {
                    if (isHashObject(target[key])) {
                        updateDeeply(target[key], val);
                    } else {
                        target[key] = updateDeeply({}, val);
                    }
                } else {
                    target[key] = val;
                }
            }
        }
        return target;
    }

    function generateNumber(value) {
        var result, point, temp, exponent, pos;

        if (value !== value) {
            throw new Error('Numeric literal whose value is NaN');
        }
        if (value < 0 || (value === 0 && 1 / value < 0)) {
            throw new Error('Numeric literal whose value is negative');
        }

        if (value === 1 / 0) {
            return json ? 'null' : renumber ? '1e400' : '1e+400';
        }

        result = '' + value;
        if (!renumber || result.length < 3) {
            return result;
        }

        point = result.indexOf('.');
        if (!json && result.charCodeAt(0) === 0x30  /* 0 */ && point === 1) {
            point = 0;
            result = result.slice(1);
        }
        temp = result;
        result = result.replace('e+', 'e');
        exponent = 0;
        if ((pos = temp.indexOf('e')) > 0) {
            exponent = +temp.slice(pos + 1);
            temp = temp.slice(0, pos);
        }
        if (point >= 0) {
            exponent -= temp.length - point - 1;
            temp = +(temp.slice(0, point) + temp.slice(point + 1)) + '';
        }
        pos = 0;
        while (temp.charCodeAt(temp.length + pos - 1) === 0x30  /* 0 */) {
            --pos;
        }
        if (pos !== 0) {
            exponent -= pos;
            temp = temp.slice(0, pos);
        }
        if (exponent !== 0) {
            temp += 'e' + exponent;
        }
        if ((temp.length < result.length ||
                    (hexadecimal && value > 1e12 && Math.floor(value) === value && (temp = '0x' + value.toString(16)).length < result.length)) &&
                +temp === value) {
            result = temp;
        }

        return result;
    }

    // Generate valid RegExp expression.
    // This function is based on https://github.com/Constellation/iv Engine

    function escapeRegExpCharacter(ch, previousIsBackslash) {
        // not handling '\' and handling \u2028 or \u2029 to unicode escape sequence
        if ((ch & ~1) === 0x2028) {
            return (previousIsBackslash ? 'u' : '\\u') + ((ch === 0x2028) ? '2028' : '2029');
        } else if (ch === 10 || ch === 13) {  // \n, \r
            return (previousIsBackslash ? '' : '\\') + ((ch === 10) ? 'n' : 'r');
        }
        return String.fromCharCode(ch);
    }

    function generateRegExp(reg) {
        var match, result, flags, i, iz, ch, characterInBrack, previousIsBackslash;

        result = reg.toString();

        if (reg.source) {
            // extract flag from toString result
            match = result.match(/\/([^/]*)$/);
            if (!match) {
                return result;
            }

            flags = match[1];
            result = '';

            characterInBrack = false;
            previousIsBackslash = false;
            for (i = 0, iz = reg.source.length; i < iz; ++i) {
                ch = reg.source.charCodeAt(i);

                if (!previousIsBackslash) {
                    if (characterInBrack) {
                        if (ch === 93) {  // ]
                            characterInBrack = false;
                        }
                    } else {
                        if (ch === 47) {  // /
                            result += '\\';
                        } else if (ch === 91) {  // [
                            characterInBrack = true;
                        }
                    }
                    result += escapeRegExpCharacter(ch, previousIsBackslash);
                    previousIsBackslash = ch === 92;  // \
                } else {
                    // if new RegExp("\\\n') is provided, create /\n/
                    result += escapeRegExpCharacter(ch, previousIsBackslash);
                    // prevent like /\\[/]/
                    previousIsBackslash = false;
                }
            }

            return '/' + result + '/' + flags;
        }

        return result;
    }

    function escapeAllowedCharacter(code, next) {
        var hex;

        if (code === 0x08  /* \b */) {
            return '\\b';
        }

        if (code === 0x0C  /* \f */) {
            return '\\f';
        }

        if (code === 0x09  /* \t */) {
            return '\\t';
        }

        hex = code.toString(16).toUpperCase();
        if (json || code > 0xFF) {
            return '\\u' + '0000'.slice(hex.length) + hex;
        } else if (code === 0x0000 && !esutils.code.isDecimalDigit(next)) {
            return '\\0';
        } else if (code === 0x000B  /* \v */) { // '\v'
            return '\\x0B';
        } else {
            return '\\x' + '00'.slice(hex.length) + hex;
        }
    }

    function escapeDisallowedCharacter(code) {
        if (code === 0x5C  /* \ */) {
            return '\\\\';
        }

        if (code === 0x0A  /* \n */) {
            return '\\n';
        }

        if (code === 0x0D  /* \r */) {
            return '\\r';
        }

        if (code === 0x2028) {
            return '\\u2028';
        }

        if (code === 0x2029) {
            return '\\u2029';
        }

        throw new Error('Incorrectly classified character');
    }

    function escapeDirective(str) {
        var i, iz, code, quote;

        quote = quotes === 'double' ? '"' : '\'';
        for (i = 0, iz = str.length; i < iz; ++i) {
            code = str.charCodeAt(i);
            if (code === 0x27  /* ' */) {
                quote = '"';
                break;
            } else if (code === 0x22  /* " */) {
                quote = '\'';
                break;
            } else if (code === 0x5C  /* \ */) {
                ++i;
            }
        }

        return quote + str + quote;
    }

    function escapeString(str) {
        var result = '', i, len, code, singleQuotes = 0, doubleQuotes = 0, single, quote;

        for (i = 0, len = str.length; i < len; ++i) {
            code = str.charCodeAt(i);
            if (code === 0x27  /* ' */) {
                ++singleQuotes;
            } else if (code === 0x22  /* " */) {
                ++doubleQuotes;
            } else if (code === 0x2F  /* / */ && json) {
                result += '\\';
            } else if (esutils.code.isLineTerminator(code) || code === 0x5C  /* \ */) {
                result += escapeDisallowedCharacter(code);
                continue;
            } else if (!esutils.code.isIdentifierPartES5(code) && (json && code < 0x20  /* SP */ || !json && !escapeless && (code < 0x20  /* SP */ || code > 0x7E  /* ~ */))) {
                result += escapeAllowedCharacter(code, str.charCodeAt(i + 1));
                continue;
            }
            result += String.fromCharCode(code);
        }

        single = !(quotes === 'double' || (quotes === 'auto' && doubleQuotes < singleQuotes));
        quote = single ? '\'' : '"';

        if (!(single ? singleQuotes : doubleQuotes)) {
            return quote + result + quote;
        }

        str = result;
        result = quote;

        for (i = 0, len = str.length; i < len; ++i) {
            code = str.charCodeAt(i);
            if ((code === 0x27  /* ' */ && single) || (code === 0x22  /* " */ && !single)) {
                result += '\\';
            }
            result += String.fromCharCode(code);
        }

        return result + quote;
    }

    /**
     * flatten an array to a string, where the array can contain
     * either strings or nested arrays
     */
    function flattenToString(arr) {
        var i, iz, elem, result = '';
        for (i = 0, iz = arr.length; i < iz; ++i) {
            elem = arr[i];
            result += isArray(elem) ? flattenToString(elem) : elem;
        }
        return result;
    }

    /**
     * convert generated to a SourceNode when source maps are enabled.
     */
    function toSourceNodeWhenNeeded(generated, node) {
        if (!sourceMap) {
            // with no source maps, generated is either an
            // array or a string.  if an array, flatten it.
            // if a string, just return it
            if (isArray(generated)) {
                return flattenToString(generated);
            } else {
                return generated;
            }
        }
        if (node == null) {
            if (generated instanceof SourceNode) {
                return generated;
            } else {
                node = {};
            }
        }
        if (node.loc == null) {
            return new SourceNode(null, null, sourceMap, generated, node.name || null);
        }
        return new SourceNode(node.loc.start.line, node.loc.start.column, (sourceMap === true ? node.loc.source || null : sourceMap), generated, node.name || null);
    }

    function noEmptySpace() {
        return (space) ? space : ' ';
    }

    function join(left, right) {
        var leftSource,
            rightSource,
            leftCharCode,
            rightCharCode;

        leftSource = toSourceNodeWhenNeeded(left).toString();
        if (leftSource.length === 0) {
            return [right];
        }

        rightSource = toSourceNodeWhenNeeded(right).toString();
        if (rightSource.length === 0) {
            return [left];
        }

        leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
        rightCharCode = rightSource.charCodeAt(0);

        if ((leftCharCode === 0x2B  /* + */ || leftCharCode === 0x2D  /* - */) && leftCharCode === rightCharCode ||
            esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode) ||
            leftCharCode === 0x2F  /* / */ && rightCharCode === 0x69  /* i */) { // infix word operators all start with `i`
            return [left, noEmptySpace(), right];
        } else if (esutils.code.isWhiteSpace(leftCharCode) || esutils.code.isLineTerminator(leftCharCode) ||
                esutils.code.isWhiteSpace(rightCharCode) || esutils.code.isLineTerminator(rightCharCode)) {
            return [left, right];
        }
        return [left, space, right];
    }

    function addIndent(stmt) {
        return [base, stmt];
    }

    function withIndent(fn) {
        var previousBase;
        previousBase = base;
        base += indent;
        fn(base);
        base = previousBase;
    }

    function calculateSpaces(str) {
        var i;
        for (i = str.length - 1; i >= 0; --i) {
            if (esutils.code.isLineTerminator(str.charCodeAt(i))) {
                break;
            }
        }
        return (str.length - 1) - i;
    }

    function adjustMultilineComment(value, specialBase) {
        var array, i, len, line, j, spaces, previousBase, sn;

        array = value.split(/\r\n|[\r\n]/);
        spaces = Number.MAX_VALUE;

        // first line doesn't have indentation
        for (i = 1, len = array.length; i < len; ++i) {
            line = array[i];
            j = 0;
            while (j < line.length && esutils.code.isWhiteSpace(line.charCodeAt(j))) {
                ++j;
            }
            if (spaces > j) {
                spaces = j;
            }
        }

        if (typeof specialBase !== 'undefined') {
            // pattern like
            // {
            //   var t = 20;  /*
            //                 * this is comment
            //                 */
            // }
            previousBase = base;
            if (array[1][spaces] === '*') {
                specialBase += ' ';
            }
            base = specialBase;
        } else {
            if (spaces & 1) {
                // /*
                //  *
                //  */
                // If spaces are odd number, above pattern is considered.
                // We waste 1 space.
                --spaces;
            }
            previousBase = base;
        }

        for (i = 1, len = array.length; i < len; ++i) {
            sn = toSourceNodeWhenNeeded(addIndent(array[i].slice(spaces)));
            array[i] = sourceMap ? sn.join('') : sn;
        }

        base = previousBase;

        return array.join('\n');
    }

    function generateComment(comment, specialBase) {
        if (comment.type === 'Line') {
            if (endsWithLineTerminator(comment.value)) {
                return '//' + comment.value;
            } else {
                // Always use LineTerminator
                var result = '//' + comment.value;
                if (!preserveBlankLines) {
                    result += '\n';
                }
                return result;
            }
        }
        if (extra.format.indent.adjustMultilineComment && /[\n\r]/.test(comment.value)) {
            return adjustMultilineComment('/*' + comment.value + '*/', specialBase);
        }
        return '/*' + comment.value + '*/';
    }

    function addComments(stmt, result) {
        var i, len, comment, save, tailingToStatement, specialBase, fragment,
            extRange, range, prevRange, prefix, infix, suffix, count;

        if (stmt.leadingComments && stmt.leadingComments.length > 0) {
            save = result;

            if (preserveBlankLines) {
                comment = stmt.leadingComments[0];
                result = [];

                extRange = comment.extendedRange;
                range = comment.range;

                prefix = sourceCode.substring(extRange[0], range[0]);
                count = (prefix.match(/\n/g) || []).length;
                if (count > 0) {
                    result.push(stringRepeat('\n', count));
                    result.push(addIndent(generateComment(comment)));
                } else {
                    result.push(prefix);
                    result.push(generateComment(comment));
                }

                prevRange = range;

                for (i = 1, len = stmt.leadingComments.length; i < len; i++) {
                    comment = stmt.leadingComments[i];
                    range = comment.range;

                    infix = sourceCode.substring(prevRange[1], range[0]);
                    count = (infix.match(/\n/g) || []).length;
                    result.push(stringRepeat('\n', count));
                    result.push(addIndent(generateComment(comment)));

                    prevRange = range;
                }

                suffix = sourceCode.substring(range[1], extRange[1]);
                count = (suffix.match(/\n/g) || []).length;
                result.push(stringRepeat('\n', count));
            } else {
                comment = stmt.leadingComments[0];
                result = [];
                if (safeConcatenation && stmt.type === Syntax.Program && stmt.body.length === 0) {
                    result.push('\n');
                }
                result.push(generateComment(comment));
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result.push('\n');
                }

                for (i = 1, len = stmt.leadingComments.length; i < len; ++i) {
                    comment = stmt.leadingComments[i];
                    fragment = [generateComment(comment)];
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        fragment.push('\n');
                    }
                    result.push(addIndent(fragment));
                }
            }

            result.push(addIndent(save));
        }

        if (stmt.trailingComments) {

            if (preserveBlankLines) {
                comment = stmt.trailingComments[0];
                extRange = comment.extendedRange;
                range = comment.range;

                prefix = sourceCode.substring(extRange[0], range[0]);
                count = (prefix.match(/\n/g) || []).length;

                if (count > 0) {
                    result.push(stringRepeat('\n', count));
                    result.push(addIndent(generateComment(comment)));
                } else {
                    result.push(prefix);
                    result.push(generateComment(comment));
                }
            } else {
                tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
                specialBase = stringRepeat(' ', calculateSpaces(toSourceNodeWhenNeeded([base, result, indent]).toString()));
                for (i = 0, len = stmt.trailingComments.length; i < len; ++i) {
                    comment = stmt.trailingComments[i];
                    if (tailingToStatement) {
                        // We assume target like following script
                        //
                        // var t = 20;  /**
                        //               * This is comment of t
                        //               */
                        if (i === 0) {
                            // first case
                            result = [result, indent];
                        } else {
                            result = [result, specialBase];
                        }
                        result.push(generateComment(comment, specialBase));
                    } else {
                        result = [result, addIndent(generateComment(comment))];
                    }
                    if (i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                        result = [result, '\n'];
                    }
                }
            }
        }

        return result;
    }

    function generateBlankLines(start, end, result) {
        var j, newlineCount = 0;

        for (j = start; j < end; j++) {
            if (sourceCode[j] === '\n') {
                newlineCount++;
            }
        }

        for (j = 1; j < newlineCount; j++) {
            result.push(newline);
        }
    }

    function parenthesize(text, current, should) {
        if (current < should) {
            return ['(', text, ')'];
        }
        return text;
    }

    function generateVerbatimString(string) {
        var i, iz, result;
        result = string.split(/\r\n|\n/);
        for (i = 1, iz = result.length; i < iz; i++) {
            result[i] = newline + base + result[i];
        }
        return result;
    }

    function generateVerbatim(expr, precedence) {
        var verbatim, result, prec;
        verbatim = expr[extra.verbatim];

        if (typeof verbatim === 'string') {
            result = parenthesize(generateVerbatimString(verbatim), Precedence.Sequence, precedence);
        } else {
            // verbatim is object
            result = generateVerbatimString(verbatim.content);
            prec = (verbatim.precedence != null) ? verbatim.precedence : Precedence.Sequence;
            result = parenthesize(result, prec, precedence);
        }

        return toSourceNodeWhenNeeded(result, expr);
    }

    function CodeGenerator() {
    }

    // Helpers.

    CodeGenerator.prototype.maybeBlock = function(stmt, flags) {
        var result, noLeadingComment, that = this;

        noLeadingComment = !extra.comment || !stmt.leadingComments;

        if (stmt.type === Syntax.BlockStatement && noLeadingComment) {
            return [space, this.generateStatement(stmt, flags)];
        }

        if (stmt.type === Syntax.EmptyStatement && noLeadingComment) {
            return ';';
        }

        withIndent(function () {
            result = [
                newline,
                addIndent(that.generateStatement(stmt, flags))
            ];
        });

        return result;
    };

    CodeGenerator.prototype.maybeBlockSuffix = function (stmt, result) {
        var ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
        if (stmt.type === Syntax.BlockStatement && (!extra.comment || !stmt.leadingComments) && !ends) {
            return [result, space];
        }
        if (ends) {
            return [result, base];
        }
        return [result, newline, base];
    };

    function generateIdentifier(node) {
        return toSourceNodeWhenNeeded(node.name, node);
    }

    function generateAsyncPrefix(node, spaceRequired) {
        return node.async ? 'async' + (spaceRequired ? noEmptySpace() : space) : '';
    }

    function generateStarSuffix(node) {
        var isGenerator = node.generator && !extra.moz.starlessGenerator;
        return isGenerator ? '*' + space : '';
    }

    function generateMethodPrefix(prop) {
        var func = prop.value;
        if (func.async) {
            return generateAsyncPrefix(func, !prop.computed);
        } else {
            // avoid space before method name
            return generateStarSuffix(func) ? '*' : '';
        }
    }

    CodeGenerator.prototype.generatePattern = function (node, precedence, flags) {
        if (node.type === Syntax.Identifier) {
            return generateIdentifier(node);
        }
        return this.generateExpression(node, precedence, flags);
    };

    CodeGenerator.prototype.generateFunctionParams = function (node) {
        var i, iz, result, hasDefault;

        hasDefault = false;

        if (node.type === Syntax.ArrowFunctionExpression &&
                !node.rest && (!node.defaults || node.defaults.length === 0) &&
                node.params.length === 1 && node.params[0].type === Syntax.Identifier) {
            // arg => { } case
            result = [generateAsyncPrefix(node, true), generateIdentifier(node.params[0])];
        } else {
            result = node.type === Syntax.ArrowFunctionExpression ? [generateAsyncPrefix(node, false)] : [];
            result.push('(');
            if (node.defaults) {
                hasDefault = true;
            }
            for (i = 0, iz = node.params.length; i < iz; ++i) {
                if (hasDefault && node.defaults[i]) {
                    // Handle default values.
                    result.push(this.generateAssignment(node.params[i], node.defaults[i], '=', Precedence.Assignment, E_TTT));
                } else {
                    result.push(this.generatePattern(node.params[i], Precedence.Assignment, E_TTT));
                }
                if (i + 1 < iz) {
                    result.push(',' + space);
                }
            }

            if (node.rest) {
                if (node.params.length) {
                    result.push(',' + space);
                }
                result.push('...');
                result.push(generateIdentifier(node.rest));
            }

            result.push(')');
        }

        return result;
    };

    CodeGenerator.prototype.generateFunctionBody = function (node) {
        var result, expr;

        result = this.generateFunctionParams(node);

        if (node.type === Syntax.ArrowFunctionExpression) {
            result.push(space);
            result.push('=>');
        }

        if (node.expression) {
            result.push(space);
            expr = this.generateExpression(node.body, Precedence.Assignment, E_TTT);
            if (expr.toString().charAt(0) === '{') {
                expr = ['(', expr, ')'];
            }
            result.push(expr);
        } else {
            result.push(this.maybeBlock(node.body, S_TTFF));
        }

        return result;
    };

    CodeGenerator.prototype.generateIterationForStatement = function (operator, stmt, flags) {
        var result = ['for' + space + '('], that = this;
        withIndent(function () {
            if (stmt.left.type === Syntax.VariableDeclaration) {
                withIndent(function () {
                    result.push(stmt.left.kind + noEmptySpace());
                    result.push(that.generateStatement(stmt.left.declarations[0], S_FFFF));
                });
            } else {
                result.push(that.generateExpression(stmt.left, Precedence.Call, E_TTT));
            }

            result = join(result, operator);
            result = [join(
                result,
                that.generateExpression(stmt.right, Precedence.Sequence, E_TTT)
            ), ')'];
        });
        result.push(this.maybeBlock(stmt.body, flags));
        return result;
    };

    CodeGenerator.prototype.generatePropertyKey = function (expr, computed, value) {
        var result = [];

        if (computed) {
            result.push('[');
        }

        if (value.type === 'AssignmentPattern') {
            result.push(this.AssignmentPattern(value, Precedence.Sequence, E_TTT));
        } else {
            result.push(this.generateExpression(expr, Precedence.Sequence, E_TTT));
        }

        if (computed) {
            result.push(']');
        }

        return result;
    };

    CodeGenerator.prototype.generateAssignment = function (left, right, operator, precedence, flags) {
        if (Precedence.Assignment < precedence) {
            flags |= F_ALLOW_IN;
        }

        return parenthesize(
            [
                this.generateExpression(left, Precedence.Call, flags),
                space + operator + space,
                this.generateExpression(right, Precedence.Assignment, flags)
            ],
            Precedence.Assignment,
            precedence
        );
    };

    CodeGenerator.prototype.semicolon = function (flags) {
        if (!semicolons && flags & F_SEMICOLON_OPT) {
            return '';
        }
        return ';';
    };

    // Statements.

    CodeGenerator.Statement = {

        BlockStatement: function (stmt, flags) {
            var range, content, result = ['{', newline], that = this;

            withIndent(function () {
                // handle functions without any code
                if (stmt.body.length === 0 && preserveBlankLines) {
                    range = stmt.range;
                    if (range[1] - range[0] > 2) {
                        content = sourceCode.substring(range[0] + 1, range[1] - 1);
                        if (content[0] === '\n') {
                            result = ['{'];
                        }
                        result.push(content);
                    }
                }

                var i, iz, fragment, bodyFlags;
                bodyFlags = S_TFFF;
                if (flags & F_FUNC_BODY) {
                    bodyFlags |= F_DIRECTIVE_CTX;
                }

                for (i = 0, iz = stmt.body.length; i < iz; ++i) {
                    if (preserveBlankLines) {
                        // handle spaces before the first line
                        if (i === 0) {
                            if (stmt.body[0].leadingComments) {
                                range = stmt.body[0].leadingComments[0].extendedRange;
                                content = sourceCode.substring(range[0], range[1]);
                                if (content[0] === '\n') {
                                    result = ['{'];
                                }
                            }
                            if (!stmt.body[0].leadingComments) {
                                generateBlankLines(stmt.range[0], stmt.body[0].range[0], result);
                            }
                        }

                        // handle spaces between lines
                        if (i > 0) {
                            if (!stmt.body[i - 1].trailingComments  && !stmt.body[i].leadingComments) {
                                generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
                            }
                        }
                    }

                    if (i === iz - 1) {
                        bodyFlags |= F_SEMICOLON_OPT;
                    }

                    if (stmt.body[i].leadingComments && preserveBlankLines) {
                        fragment = that.generateStatement(stmt.body[i], bodyFlags);
                    } else {
                        fragment = addIndent(that.generateStatement(stmt.body[i], bodyFlags));
                    }

                    result.push(fragment);
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        if (preserveBlankLines && i < iz - 1) {
                            // don't add a new line if there are leading coments
                            // in the next statement
                            if (!stmt.body[i + 1].leadingComments) {
                                result.push(newline);
                            }
                        } else {
                            result.push(newline);
                        }
                    }

                    if (preserveBlankLines) {
                        // handle spaces after the last line
                        if (i === iz - 1) {
                            if (!stmt.body[i].trailingComments) {
                                generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
                            }
                        }
                    }
                }
            });

            result.push(addIndent('}'));
            return result;
        },

        BreakStatement: function (stmt, flags) {
            if (stmt.label) {
                return 'break ' + stmt.label.name + this.semicolon(flags);
            }
            return 'break' + this.semicolon(flags);
        },

        ContinueStatement: function (stmt, flags) {
            if (stmt.label) {
                return 'continue ' + stmt.label.name + this.semicolon(flags);
            }
            return 'continue' + this.semicolon(flags);
        },

        ClassBody: function (stmt, flags) {
            var result = [ '{', newline], that = this;

            withIndent(function (indent) {
                var i, iz;

                for (i = 0, iz = stmt.body.length; i < iz; ++i) {
                    result.push(indent);
                    result.push(that.generateExpression(stmt.body[i], Precedence.Sequence, E_TTT));
                    if (i + 1 < iz) {
                        result.push(newline);
                    }
                }
            });

            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(base);
            result.push('}');
            return result;
        },

        ClassDeclaration: function (stmt, flags) {
            var result, fragment;
            result  = ['class'];
            if (stmt.id) {
                result = join(result, this.generateExpression(stmt.id, Precedence.Sequence, E_TTT));
            }
            if (stmt.superClass) {
                fragment = join('extends', this.generateExpression(stmt.superClass, Precedence.Assignment, E_TTT));
                result = join(result, fragment);
            }
            result.push(space);
            result.push(this.generateStatement(stmt.body, S_TFFT));
            return result;
        },

        DirectiveStatement: function (stmt, flags) {
            if (extra.raw && stmt.raw) {
                return stmt.raw + this.semicolon(flags);
            }
            return escapeDirective(stmt.directive) + this.semicolon(flags);
        },

        DoWhileStatement: function (stmt, flags) {
            // Because `do 42 while (cond)` is Syntax Error. We need semicolon.
            var result = join('do', this.maybeBlock(stmt.body, S_TFFF));
            result = this.maybeBlockSuffix(stmt.body, result);
            return join(result, [
                'while' + space + '(',
                this.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                ')' + this.semicolon(flags)
            ]);
        },

        CatchClause: function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                var guard;

                result = [
                    'catch' + space + '(',
                    that.generateExpression(stmt.param, Precedence.Sequence, E_TTT),
                    ')'
                ];

                if (stmt.guard) {
                    guard = that.generateExpression(stmt.guard, Precedence.Sequence, E_TTT);
                    result.splice(2, 0, ' if ', guard);
                }
            });
            result.push(this.maybeBlock(stmt.body, S_TFFF));
            return result;
        },

        DebuggerStatement: function (stmt, flags) {
            return 'debugger' + this.semicolon(flags);
        },

        EmptyStatement: function (stmt, flags) {
            return ';';
        },

        ExportDefaultDeclaration: function (stmt, flags) {
            var result = [ 'export' ], bodyFlags;

            bodyFlags = (flags & F_SEMICOLON_OPT) ? S_TFFT : S_TFFF;

            // export default HoistableDeclaration[Default]
            // export default AssignmentExpression[In] ;
            result = join(result, 'default');
            if (isStatement(stmt.declaration)) {
                result = join(result, this.generateStatement(stmt.declaration, bodyFlags));
            } else {
                result = join(result, this.generateExpression(stmt.declaration, Precedence.Assignment, E_TTT) + this.semicolon(flags));
            }
            return result;
        },

        ExportNamedDeclaration: function (stmt, flags) {
            var result = [ 'export' ], bodyFlags, that = this;

            bodyFlags = (flags & F_SEMICOLON_OPT) ? S_TFFT : S_TFFF;

            // export VariableStatement
            // export Declaration[Default]
            if (stmt.declaration) {
                return join(result, this.generateStatement(stmt.declaration, bodyFlags));
            }

            // export ExportClause[NoReference] FromClause ;
            // export ExportClause ;
            if (stmt.specifiers) {
                if (stmt.specifiers.length === 0) {
                    result = join(result, '{' + space + '}');
                } else if (stmt.specifiers[0].type === Syntax.ExportBatchSpecifier) {
                    result = join(result, this.generateExpression(stmt.specifiers[0], Precedence.Sequence, E_TTT));
                } else {
                    result = join(result, '{');
                    withIndent(function (indent) {
                        var i, iz;
                        result.push(newline);
                        for (i = 0, iz = stmt.specifiers.length; i < iz; ++i) {
                            result.push(indent);
                            result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                            if (i + 1 < iz) {
                                result.push(',' + newline);
                            }
                        }
                    });
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                        result.push(newline);
                    }
                    result.push(base + '}');
                }

                if (stmt.source) {
                    result = join(result, [
                        'from' + space,
                        // ModuleSpecifier
                        this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                        this.semicolon(flags)
                    ]);
                } else {
                    result.push(this.semicolon(flags));
                }
            }
            return result;
        },

        ExportAllDeclaration: function (stmt, flags) {
            // export * FromClause ;
            return [
                'export' + space,
                '*' + space,
                'from' + space,
                // ModuleSpecifier
                this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                this.semicolon(flags)
            ];
        },

        ExpressionStatement: function (stmt, flags) {
            var result, fragment;

            function isClassPrefixed(fragment) {
                var code;
                if (fragment.slice(0, 5) !== 'class') {
                    return false;
                }
                code = fragment.charCodeAt(5);
                return code === 0x7B  /* '{' */ || esutils.code.isWhiteSpace(code) || esutils.code.isLineTerminator(code);
            }

            function isFunctionPrefixed(fragment) {
                var code;
                if (fragment.slice(0, 8) !== 'function') {
                    return false;
                }
                code = fragment.charCodeAt(8);
                return code === 0x28 /* '(' */ || esutils.code.isWhiteSpace(code) || code === 0x2A  /* '*' */ || esutils.code.isLineTerminator(code);
            }

            function isAsyncPrefixed(fragment) {
                var code, i, iz;
                if (fragment.slice(0, 5) !== 'async') {
                    return false;
                }
                if (!esutils.code.isWhiteSpace(fragment.charCodeAt(5))) {
                    return false;
                }
                for (i = 6, iz = fragment.length; i < iz; ++i) {
                    if (!esutils.code.isWhiteSpace(fragment.charCodeAt(i))) {
                        break;
                    }
                }
                if (i === iz) {
                    return false;
                }
                if (fragment.slice(i, i + 8) !== 'function') {
                    return false;
                }
                code = fragment.charCodeAt(i + 8);
                return code === 0x28 /* '(' */ || esutils.code.isWhiteSpace(code) || code === 0x2A  /* '*' */ || esutils.code.isLineTerminator(code);
            }

            result = [this.generateExpression(stmt.expression, Precedence.Sequence, E_TTT)];
            // 12.4 '{', 'function', 'class' is not allowed in this position.
            // wrap expression with parentheses
            fragment = toSourceNodeWhenNeeded(result).toString();
            if (fragment.charCodeAt(0) === 0x7B  /* '{' */ ||  // ObjectExpression
                    isClassPrefixed(fragment) ||
                    isFunctionPrefixed(fragment) ||
                    isAsyncPrefixed(fragment) ||
                    (directive && (flags & F_DIRECTIVE_CTX) && stmt.expression.type === Syntax.Literal && typeof stmt.expression.value === 'string')) {
                result = ['(', result, ')' + this.semicolon(flags)];
            } else {
                result.push(this.semicolon(flags));
            }
            return result;
        },

        ImportDeclaration: function (stmt, flags) {
            // ES6: 15.2.1 valid import declarations:
            //     - import ImportClause FromClause ;
            //     - import ModuleSpecifier ;
            var result, cursor, that = this;

            // If no ImportClause is present,
            // this should be `import ModuleSpecifier` so skip `from`
            // ModuleSpecifier is StringLiteral.
            if (stmt.specifiers.length === 0) {
                // import ModuleSpecifier ;
                return [
                    'import',
                    space,
                    // ModuleSpecifier
                    this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                    this.semicolon(flags)
                ];
            }

            // import ImportClause FromClause ;
            result = [
                'import'
            ];
            cursor = 0;

            // ImportedBinding
            if (stmt.specifiers[cursor].type === Syntax.ImportDefaultSpecifier) {
                result = join(result, [
                        this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
                ]);
                ++cursor;
            }

            if (stmt.specifiers[cursor]) {
                if (cursor !== 0) {
                    result.push(',');
                }

                if (stmt.specifiers[cursor].type === Syntax.ImportNamespaceSpecifier) {
                    // NameSpaceImport
                    result = join(result, [
                            space,
                            this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
                    ]);
                } else {
                    // NamedImports
                    result.push(space + '{');

                    if ((stmt.specifiers.length - cursor) === 1) {
                        // import { ... } from "...";
                        result.push(space);
                        result.push(this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT));
                        result.push(space + '}' + space);
                    } else {
                        // import {
                        //    ...,
                        //    ...,
                        // } from "...";
                        withIndent(function (indent) {
                            var i, iz;
                            result.push(newline);
                            for (i = cursor, iz = stmt.specifiers.length; i < iz; ++i) {
                                result.push(indent);
                                result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                                if (i + 1 < iz) {
                                    result.push(',' + newline);
                                }
                            }
                        });
                        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                            result.push(newline);
                        }
                        result.push(base + '}' + space);
                    }
                }
            }

            result = join(result, [
                'from' + space,
                // ModuleSpecifier
                this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                this.semicolon(flags)
            ]);
            return result;
        },

        VariableDeclarator: function (stmt, flags) {
            var itemFlags = (flags & F_ALLOW_IN) ? E_TTT : E_FTT;
            if (stmt.init) {
                return [
                    this.generateExpression(stmt.id, Precedence.Assignment, itemFlags),
                    space,
                    '=',
                    space,
                    this.generateExpression(stmt.init, Precedence.Assignment, itemFlags)
                ];
            }
            return this.generatePattern(stmt.id, Precedence.Assignment, itemFlags);
        },

        VariableDeclaration: function (stmt, flags) {
            // VariableDeclarator is typed as Statement,
            // but joined with comma (not LineTerminator).
            // So if comment is attached to target node, we should specialize.
            var result, i, iz, node, bodyFlags, that = this;

            result = [ stmt.kind ];

            bodyFlags = (flags & F_ALLOW_IN) ? S_TFFF : S_FFFF;

            function block() {
                node = stmt.declarations[0];
                if (extra.comment && node.leadingComments) {
                    result.push('\n');
                    result.push(addIndent(that.generateStatement(node, bodyFlags)));
                } else {
                    result.push(noEmptySpace());
                    result.push(that.generateStatement(node, bodyFlags));
                }

                for (i = 1, iz = stmt.declarations.length; i < iz; ++i) {
                    node = stmt.declarations[i];
                    if (extra.comment && node.leadingComments) {
                        result.push(',' + newline);
                        result.push(addIndent(that.generateStatement(node, bodyFlags)));
                    } else {
                        result.push(',' + space);
                        result.push(that.generateStatement(node, bodyFlags));
                    }
                }
            }

            if (stmt.declarations.length > 1) {
                withIndent(block);
            } else {
                block();
            }

            result.push(this.semicolon(flags));

            return result;
        },

        ThrowStatement: function (stmt, flags) {
            return [join(
                'throw',
                this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
            ), this.semicolon(flags)];
        },

        TryStatement: function (stmt, flags) {
            var result, i, iz, guardedHandlers;

            result = ['try', this.maybeBlock(stmt.block, S_TFFF)];
            result = this.maybeBlockSuffix(stmt.block, result);

            if (stmt.handlers) {
                // old interface
                for (i = 0, iz = stmt.handlers.length; i < iz; ++i) {
                    result = join(result, this.generateStatement(stmt.handlers[i], S_TFFF));
                    if (stmt.finalizer || i + 1 !== iz) {
                        result = this.maybeBlockSuffix(stmt.handlers[i].body, result);
                    }
                }
            } else {
                guardedHandlers = stmt.guardedHandlers || [];

                for (i = 0, iz = guardedHandlers.length; i < iz; ++i) {
                    result = join(result, this.generateStatement(guardedHandlers[i], S_TFFF));
                    if (stmt.finalizer || i + 1 !== iz) {
                        result = this.maybeBlockSuffix(guardedHandlers[i].body, result);
                    }
                }

                // new interface
                if (stmt.handler) {
                    if (isArray(stmt.handler)) {
                        for (i = 0, iz = stmt.handler.length; i < iz; ++i) {
                            result = join(result, this.generateStatement(stmt.handler[i], S_TFFF));
                            if (stmt.finalizer || i + 1 !== iz) {
                                result = this.maybeBlockSuffix(stmt.handler[i].body, result);
                            }
                        }
                    } else {
                        result = join(result, this.generateStatement(stmt.handler, S_TFFF));
                        if (stmt.finalizer) {
                            result = this.maybeBlockSuffix(stmt.handler.body, result);
                        }
                    }
                }
            }
            if (stmt.finalizer) {
                result = join(result, ['finally', this.maybeBlock(stmt.finalizer, S_TFFF)]);
            }
            return result;
        },

        SwitchStatement: function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags, that = this;
            withIndent(function () {
                result = [
                    'switch' + space + '(',
                    that.generateExpression(stmt.discriminant, Precedence.Sequence, E_TTT),
                    ')' + space + '{' + newline
                ];
            });
            if (stmt.cases) {
                bodyFlags = S_TFFF;
                for (i = 0, iz = stmt.cases.length; i < iz; ++i) {
                    if (i === iz - 1) {
                        bodyFlags |= F_SEMICOLON_OPT;
                    }
                    fragment = addIndent(this.generateStatement(stmt.cases[i], bodyFlags));
                    result.push(fragment);
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        result.push(newline);
                    }
                }
            }
            result.push(addIndent('}'));
            return result;
        },

        SwitchCase: function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags, that = this;
            withIndent(function () {
                if (stmt.test) {
                    result = [
                        join('case', that.generateExpression(stmt.test, Precedence.Sequence, E_TTT)),
                        ':'
                    ];
                } else {
                    result = ['default:'];
                }

                i = 0;
                iz = stmt.consequent.length;
                if (iz && stmt.consequent[0].type === Syntax.BlockStatement) {
                    fragment = that.maybeBlock(stmt.consequent[0], S_TFFF);
                    result.push(fragment);
                    i = 1;
                }

                if (i !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result.push(newline);
                }

                bodyFlags = S_TFFF;
                for (; i < iz; ++i) {
                    if (i === iz - 1 && flags & F_SEMICOLON_OPT) {
                        bodyFlags |= F_SEMICOLON_OPT;
                    }
                    fragment = addIndent(that.generateStatement(stmt.consequent[i], bodyFlags));
                    result.push(fragment);
                    if (i + 1 !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        result.push(newline);
                    }
                }
            });
            return result;
        },

        IfStatement: function (stmt, flags) {
            var result, bodyFlags, semicolonOptional, that = this;
            withIndent(function () {
                result = [
                    'if' + space + '(',
                    that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                    ')'
                ];
            });
            semicolonOptional = flags & F_SEMICOLON_OPT;
            bodyFlags = S_TFFF;
            if (semicolonOptional) {
                bodyFlags |= F_SEMICOLON_OPT;
            }
            if (stmt.alternate) {
                result.push(this.maybeBlock(stmt.consequent, S_TFFF));
                result = this.maybeBlockSuffix(stmt.consequent, result);
                if (stmt.alternate.type === Syntax.IfStatement) {
                    result = join(result, ['else ', this.generateStatement(stmt.alternate, bodyFlags)]);
                } else {
                    result = join(result, join('else', this.maybeBlock(stmt.alternate, bodyFlags)));
                }
            } else {
                result.push(this.maybeBlock(stmt.consequent, bodyFlags));
            }
            return result;
        },

        ForStatement: function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                result = ['for' + space + '('];
                if (stmt.init) {
                    if (stmt.init.type === Syntax.VariableDeclaration) {
                        result.push(that.generateStatement(stmt.init, S_FFFF));
                    } else {
                        // F_ALLOW_IN becomes false.
                        result.push(that.generateExpression(stmt.init, Precedence.Sequence, E_FTT));
                        result.push(';');
                    }
                } else {
                    result.push(';');
                }

                if (stmt.test) {
                    result.push(space);
                    result.push(that.generateExpression(stmt.test, Precedence.Sequence, E_TTT));
                    result.push(';');
                } else {
                    result.push(';');
                }

                if (stmt.update) {
                    result.push(space);
                    result.push(that.generateExpression(stmt.update, Precedence.Sequence, E_TTT));
                    result.push(')');
                } else {
                    result.push(')');
                }
            });

            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result;
        },

        ForInStatement: function (stmt, flags) {
            return this.generateIterationForStatement('in', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
        },

        ForOfStatement: function (stmt, flags) {
            return this.generateIterationForStatement('of', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
        },

        LabeledStatement: function (stmt, flags) {
            return [stmt.label.name + ':', this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)];
        },

        Program: function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags;
            iz = stmt.body.length;
            result = [safeConcatenation && iz > 0 ? '\n' : ''];
            bodyFlags = S_TFTF;
            for (i = 0; i < iz; ++i) {
                if (!safeConcatenation && i === iz - 1) {
                    bodyFlags |= F_SEMICOLON_OPT;
                }

                if (preserveBlankLines) {
                    // handle spaces before the first line
                    if (i === 0) {
                        if (!stmt.body[0].leadingComments) {
                            generateBlankLines(stmt.range[0], stmt.body[i].range[0], result);
                        }
                    }

                    // handle spaces between lines
                    if (i > 0) {
                        if (!stmt.body[i - 1].trailingComments && !stmt.body[i].leadingComments) {
                            generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
                        }
                    }
                }

                fragment = addIndent(this.generateStatement(stmt.body[i], bodyFlags));
                result.push(fragment);
                if (i + 1 < iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    if (preserveBlankLines) {
                        if (!stmt.body[i + 1].leadingComments) {
                            result.push(newline);
                        }
                    } else {
                        result.push(newline);
                    }
                }

                if (preserveBlankLines) {
                    // handle spaces after the last line
                    if (i === iz - 1) {
                        if (!stmt.body[i].trailingComments) {
                            generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
                        }
                    }
                }
            }
            return result;
        },

        FunctionDeclaration: function (stmt, flags) {
            return [
                generateAsyncPrefix(stmt, true),
                'function',
                generateStarSuffix(stmt) || noEmptySpace(),
                stmt.id ? generateIdentifier(stmt.id) : '',
                this.generateFunctionBody(stmt)
            ];
        },

        ReturnStatement: function (stmt, flags) {
            if (stmt.argument) {
                return [join(
                    'return',
                    this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
                ), this.semicolon(flags)];
            }
            return ['return' + this.semicolon(flags)];
        },

        WhileStatement: function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                result = [
                    'while' + space + '(',
                    that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                    ')'
                ];
            });
            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result;
        },

        WithStatement: function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                result = [
                    'with' + space + '(',
                    that.generateExpression(stmt.object, Precedence.Sequence, E_TTT),
                    ')'
                ];
            });
            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result;
        }
    };

    merge(CodeGenerator.prototype, CodeGenerator.Statement);

    // Expressions.

    CodeGenerator.Expression = {

        SequenceExpression: function (expr, precedence, flags) {
            var result, i, iz;
            if (Precedence.Sequence < precedence) {
                flags |= F_ALLOW_IN;
            }
            result = [];
            for (i = 0, iz = expr.expressions.length; i < iz; ++i) {
                result.push(this.generateExpression(expr.expressions[i], Precedence.Assignment, flags));
                if (i + 1 < iz) {
                    result.push(',' + space);
                }
            }
            return parenthesize(result, Precedence.Sequence, precedence);
        },

        AssignmentExpression: function (expr, precedence, flags) {
            return this.generateAssignment(expr.left, expr.right, expr.operator, precedence, flags);
        },

        ArrowFunctionExpression: function (expr, precedence, flags) {
            return parenthesize(this.generateFunctionBody(expr), Precedence.ArrowFunction, precedence);
        },

        ConditionalExpression: function (expr, precedence, flags) {
            if (Precedence.Conditional < precedence) {
                flags |= F_ALLOW_IN;
            }
            return parenthesize(
                [
                    this.generateExpression(expr.test, Precedence.LogicalOR, flags),
                    space + '?' + space,
                    this.generateExpression(expr.consequent, Precedence.Assignment, flags),
                    space + ':' + space,
                    this.generateExpression(expr.alternate, Precedence.Assignment, flags)
                ],
                Precedence.Conditional,
                precedence
            );
        },

        LogicalExpression: function (expr, precedence, flags) {
            return this.BinaryExpression(expr, precedence, flags);
        },

        BinaryExpression: function (expr, precedence, flags) {
            var result, currentPrecedence, fragment, leftSource;
            currentPrecedence = BinaryPrecedence[expr.operator];

            if (currentPrecedence < precedence) {
                flags |= F_ALLOW_IN;
            }

            fragment = this.generateExpression(expr.left, currentPrecedence, flags);

            leftSource = fragment.toString();

            if (leftSource.charCodeAt(leftSource.length - 1) === 0x2F /* / */ && esutils.code.isIdentifierPartES5(expr.operator.charCodeAt(0))) {
                result = [fragment, noEmptySpace(), expr.operator];
            } else {
                result = join(fragment, expr.operator);
            }

            fragment = this.generateExpression(expr.right, currentPrecedence + 1, flags);

            if (expr.operator === '/' && fragment.toString().charAt(0) === '/' ||
            expr.operator.slice(-1) === '<' && fragment.toString().slice(0, 3) === '!--') {
                // If '/' concats with '/' or `<` concats with `!--`, it is interpreted as comment start
                result.push(noEmptySpace());
                result.push(fragment);
            } else {
                result = join(result, fragment);
            }

            if (expr.operator === 'in' && !(flags & F_ALLOW_IN)) {
                return ['(', result, ')'];
            }
            return parenthesize(result, currentPrecedence, precedence);
        },

        CallExpression: function (expr, precedence, flags) {
            var result, i, iz;
            // F_ALLOW_UNPARATH_NEW becomes false.
            result = [this.generateExpression(expr.callee, Precedence.Call, E_TTF)];
            result.push('(');
            for (i = 0, iz = expr['arguments'].length; i < iz; ++i) {
                result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
                if (i + 1 < iz) {
                    result.push(',' + space);
                }
            }
            result.push(')');

            if (!(flags & F_ALLOW_CALL)) {
                return ['(', result, ')'];
            }
            return parenthesize(result, Precedence.Call, precedence);
        },

        NewExpression: function (expr, precedence, flags) {
            var result, length, i, iz, itemFlags;
            length = expr['arguments'].length;

            // F_ALLOW_CALL becomes false.
            // F_ALLOW_UNPARATH_NEW may become false.
            itemFlags = (flags & F_ALLOW_UNPARATH_NEW && !parentheses && length === 0) ? E_TFT : E_TFF;

            result = join(
                'new',
                this.generateExpression(expr.callee, Precedence.New, itemFlags)
            );

            if (!(flags & F_ALLOW_UNPARATH_NEW) || parentheses || length > 0) {
                result.push('(');
                for (i = 0, iz = length; i < iz; ++i) {
                    result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
                    if (i + 1 < iz) {
                        result.push(',' + space);
                    }
                }
                result.push(')');
            }

            return parenthesize(result, Precedence.New, precedence);
        },

        MemberExpression: function (expr, precedence, flags) {
            var result, fragment;

            // F_ALLOW_UNPARATH_NEW becomes false.
            result = [this.generateExpression(expr.object, Precedence.Call, (flags & F_ALLOW_CALL) ? E_TTF : E_TFF)];

            if (expr.computed) {
                result.push('[');
                result.push(this.generateExpression(expr.property, Precedence.Sequence, flags & F_ALLOW_CALL ? E_TTT : E_TFT));
                result.push(']');
            } else {
                if (expr.object.type === Syntax.Literal && typeof expr.object.value === 'number') {
                    fragment = toSourceNodeWhenNeeded(result).toString();
                    // When the following conditions are all true,
                    //   1. No floating point
                    //   2. Don't have exponents
                    //   3. The last character is a decimal digit
                    //   4. Not hexadecimal OR octal number literal
                    // we should add a floating point.
                    if (
                            fragment.indexOf('.') < 0 &&
                            !/[eExX]/.test(fragment) &&
                            esutils.code.isDecimalDigit(fragment.charCodeAt(fragment.length - 1)) &&
                            !(fragment.length >= 2 && fragment.charCodeAt(0) === 48)  // '0'
                            ) {
                        result.push('.');
                    }
                }
                result.push('.');
                result.push(generateIdentifier(expr.property));
            }

            return parenthesize(result, Precedence.Member, precedence);
        },

        MetaProperty: function (expr, precedence, flags) {
            var result;
            result = [];
            result.push(expr.meta);
            result.push('.');
            result.push(expr.property);
            return parenthesize(result, Precedence.Member, precedence);
        },

        UnaryExpression: function (expr, precedence, flags) {
            var result, fragment, rightCharCode, leftSource, leftCharCode;
            fragment = this.generateExpression(expr.argument, Precedence.Unary, E_TTT);

            if (space === '') {
                result = join(expr.operator, fragment);
            } else {
                result = [expr.operator];
                if (expr.operator.length > 2) {
                    // delete, void, typeof
                    // get `typeof []`, not `typeof[]`
                    result = join(result, fragment);
                } else {
                    // Prevent inserting spaces between operator and argument if it is unnecessary
                    // like, `!cond`
                    leftSource = toSourceNodeWhenNeeded(result).toString();
                    leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
                    rightCharCode = fragment.toString().charCodeAt(0);

                    if (((leftCharCode === 0x2B  /* + */ || leftCharCode === 0x2D  /* - */) && leftCharCode === rightCharCode) ||
                            (esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode))) {
                        result.push(noEmptySpace());
                        result.push(fragment);
                    } else {
                        result.push(fragment);
                    }
                }
            }
            return parenthesize(result, Precedence.Unary, precedence);
        },

        YieldExpression: function (expr, precedence, flags) {
            var result;
            if (expr.delegate) {
                result = 'yield*';
            } else {
                result = 'yield';
            }
            if (expr.argument) {
                result = join(
                    result,
                    this.generateExpression(expr.argument, Precedence.Yield, E_TTT)
                );
            }
            return parenthesize(result, Precedence.Yield, precedence);
        },

        AwaitExpression: function (expr, precedence, flags) {
            var result = join(
                expr.all ? 'await*' : 'await',
                this.generateExpression(expr.argument, Precedence.Await, E_TTT)
            );
            return parenthesize(result, Precedence.Await, precedence);
        },

        UpdateExpression: function (expr, precedence, flags) {
            if (expr.prefix) {
                return parenthesize(
                    [
                        expr.operator,
                        this.generateExpression(expr.argument, Precedence.Unary, E_TTT)
                    ],
                    Precedence.Unary,
                    precedence
                );
            }
            return parenthesize(
                [
                    this.generateExpression(expr.argument, Precedence.Postfix, E_TTT),
                    expr.operator
                ],
                Precedence.Postfix,
                precedence
            );
        },

        FunctionExpression: function (expr, precedence, flags) {
            var result = [
                generateAsyncPrefix(expr, true),
                'function'
            ];
            if (expr.id) {
                result.push(generateStarSuffix(expr) || noEmptySpace());
                result.push(generateIdentifier(expr.id));
            } else {
                result.push(generateStarSuffix(expr) || space);
            }
            result.push(this.generateFunctionBody(expr));
            return result;
        },

        ArrayPattern: function (expr, precedence, flags) {
            return this.ArrayExpression(expr, precedence, flags, true);
        },

        ArrayExpression: function (expr, precedence, flags, isPattern) {
            var result, multiline, that = this;
            if (!expr.elements.length) {
                return '[]';
            }
            multiline = isPattern ? false : expr.elements.length > 1;
            result = ['[', multiline ? newline : ''];
            withIndent(function (indent) {
                var i, iz;
                for (i = 0, iz = expr.elements.length; i < iz; ++i) {
                    if (!expr.elements[i]) {
                        if (multiline) {
                            result.push(indent);
                        }
                        if (i + 1 === iz) {
                            result.push(',');
                        }
                    } else {
                        result.push(multiline ? indent : '');
                        result.push(that.generateExpression(expr.elements[i], Precedence.Assignment, E_TTT));
                    }
                    if (i + 1 < iz) {
                        result.push(',' + (multiline ? newline : space));
                    }
                }
            });
            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(multiline ? base : '');
            result.push(']');
            return result;
        },

        RestElement: function(expr, precedence, flags) {
            return '...' + this.generatePattern(expr.argument);
        },

        ClassExpression: function (expr, precedence, flags) {
            var result, fragment;
            result = ['class'];
            if (expr.id) {
                result = join(result, this.generateExpression(expr.id, Precedence.Sequence, E_TTT));
            }
            if (expr.superClass) {
                fragment = join('extends', this.generateExpression(expr.superClass, Precedence.Assignment, E_TTT));
                result = join(result, fragment);
            }
            result.push(space);
            result.push(this.generateStatement(expr.body, S_TFFT));
            return result;
        },

        MethodDefinition: function (expr, precedence, flags) {
            var result, fragment;
            if (expr['static']) {
                result = ['static' + space];
            } else {
                result = [];
            }
            if (expr.kind === 'get' || expr.kind === 'set') {
                fragment = [
                    join(expr.kind, this.generatePropertyKey(expr.key, expr.computed, expr.value)),
                    this.generateFunctionBody(expr.value)
                ];
            } else {
                fragment = [
                    generateMethodPrefix(expr),
                    this.generatePropertyKey(expr.key, expr.computed, expr.value),
                    this.generateFunctionBody(expr.value)
                ];
            }
            return join(result, fragment);
        },

        Property: function (expr, precedence, flags) {
            if (expr.kind === 'get' || expr.kind === 'set') {
                return [
                    expr.kind, noEmptySpace(),
                    this.generatePropertyKey(expr.key, expr.computed, expr.value),
                    this.generateFunctionBody(expr.value)
                ];
            }

            if (expr.shorthand) {
                return this.generatePropertyKey(expr.key, expr.computed, expr.value);
            }

            if (expr.method) {
                return [
                    generateMethodPrefix(expr),
                    this.generatePropertyKey(expr.key, expr.computed, expr.value),
                    this.generateFunctionBody(expr.value)
                ];
            }

            return [
                this.generatePropertyKey(expr.key, expr.computed, expr.value),
                ':' + space,
                this.generateExpression(expr.value, Precedence.Assignment, E_TTT)
            ];
        },

        ObjectExpression: function (expr, precedence, flags) {
            var multiline, result, fragment, that = this;

            if (!expr.properties.length) {
                return '{}';
            }
            multiline = expr.properties.length > 1;

            withIndent(function () {
                fragment = that.generateExpression(expr.properties[0], Precedence.Sequence, E_TTT);
            });

            if (!multiline) {
                // issues 4
                // Do not transform from
                //   dejavu.Class.declare({
                //       method2: function () {}
                //   });
                // to
                //   dejavu.Class.declare({method2: function () {
                //       }});
                if (!hasLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    return [ '{', space, fragment, space, '}' ];
                }
            }

            withIndent(function (indent) {
                var i, iz;
                result = [ '{', newline, indent, fragment ];

                if (multiline) {
                    result.push(',' + newline);
                    for (i = 1, iz = expr.properties.length; i < iz; ++i) {
                        result.push(indent);
                        result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
                        if (i + 1 < iz) {
                            result.push(',' + newline);
                        }
                    }
                }
            });

            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(base);
            result.push('}');
            return result;
        },

        AssignmentPattern: function(expr, precedence, flags) {
            return this.generateAssignment(expr.left, expr.right, '=', precedence, flags);
        },

        ObjectPattern: function (expr, precedence, flags) {
            var result, i, iz, multiline, property, that = this;
            if (!expr.properties.length) {
                return '{}';
            }

            multiline = false;
            if (expr.properties.length === 1) {
                property = expr.properties[0];
                if (property.value.type !== Syntax.Identifier) {
                    multiline = true;
                }
            } else {
                for (i = 0, iz = expr.properties.length; i < iz; ++i) {
                    property = expr.properties[i];
                    if (!property.shorthand) {
                        multiline = true;
                        break;
                    }
                }
            }
            result = ['{', multiline ? newline : '' ];

            withIndent(function (indent) {
                var i, iz;
                for (i = 0, iz = expr.properties.length; i < iz; ++i) {
                    result.push(multiline ? indent : '');
                    result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
                    if (i + 1 < iz) {
                        result.push(',' + (multiline ? newline : space));
                    }
                }
            });

            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(multiline ? base : '');
            result.push('}');
            return result;
        },

        ThisExpression: function (expr, precedence, flags) {
            return 'this';
        },

        Super: function (expr, precedence, flags) {
            return 'super';
        },

        Identifier: function (expr, precedence, flags) {
            return generateIdentifier(expr);
        },

        ImportDefaultSpecifier: function (expr, precedence, flags) {
            return generateIdentifier(expr.id || expr.local);
        },

        ImportNamespaceSpecifier: function (expr, precedence, flags) {
            var result = ['*'];
            var id = expr.id || expr.local;
            if (id) {
                result.push(space + 'as' + noEmptySpace() + generateIdentifier(id));
            }
            return result;
        },

        ImportSpecifier: function (expr, precedence, flags) {
            var imported = expr.imported;
            var result = [ imported.name ];
            var local = expr.local;
            if (local && local.name !== imported.name) {
                result.push(noEmptySpace() + 'as' + noEmptySpace() + generateIdentifier(local));
            }
            return result;
        },

        ExportSpecifier: function (expr, precedence, flags) {
            var local = expr.local;
            var result = [ local.name ];
            var exported = expr.exported;
            if (exported && exported.name !== local.name) {
                result.push(noEmptySpace() + 'as' + noEmptySpace() + generateIdentifier(exported));
            }
            return result;
        },

        Literal: function (expr, precedence, flags) {
            var raw;
            if (expr.hasOwnProperty('raw') && parse && extra.raw) {
                try {
                    raw = parse(expr.raw).body[0].expression;
                    if (raw.type === Syntax.Literal) {
                        if (raw.value === expr.value) {
                            return expr.raw;
                        }
                    }
                } catch (e) {
                    // not use raw property
                }
            }

            if (expr.value === null) {
                return 'null';
            }

            if (typeof expr.value === 'string') {
                return escapeString(expr.value);
            }

            if (typeof expr.value === 'number') {
                return generateNumber(expr.value);
            }

            if (typeof expr.value === 'boolean') {
                return expr.value ? 'true' : 'false';
            }

            return generateRegExp(expr.value);
        },

        GeneratorExpression: function (expr, precedence, flags) {
            return this.ComprehensionExpression(expr, precedence, flags);
        },

        ComprehensionExpression: function (expr, precedence, flags) {
            // GeneratorExpression should be parenthesized with (...), ComprehensionExpression with [...]
            // Due to https://bugzilla.mozilla.org/show_bug.cgi?id=883468 position of expr.body can differ in Spidermonkey and ES6

            var result, i, iz, fragment, that = this;
            result = (expr.type === Syntax.GeneratorExpression) ? ['('] : ['['];

            if (extra.moz.comprehensionExpressionStartsWithAssignment) {
                fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);
                result.push(fragment);
            }

            if (expr.blocks) {
                withIndent(function () {
                    for (i = 0, iz = expr.blocks.length; i < iz; ++i) {
                        fragment = that.generateExpression(expr.blocks[i], Precedence.Sequence, E_TTT);
                        if (i > 0 || extra.moz.comprehensionExpressionStartsWithAssignment) {
                            result = join(result, fragment);
                        } else {
                            result.push(fragment);
                        }
                    }
                });
            }

            if (expr.filter) {
                result = join(result, 'if' + space);
                fragment = this.generateExpression(expr.filter, Precedence.Sequence, E_TTT);
                result = join(result, [ '(', fragment, ')' ]);
            }

            if (!extra.moz.comprehensionExpressionStartsWithAssignment) {
                fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);

                result = join(result, fragment);
            }

            result.push((expr.type === Syntax.GeneratorExpression) ? ')' : ']');
            return result;
        },

        ComprehensionBlock: function (expr, precedence, flags) {
            var fragment;
            if (expr.left.type === Syntax.VariableDeclaration) {
                fragment = [
                    expr.left.kind, noEmptySpace(),
                    this.generateStatement(expr.left.declarations[0], S_FFFF)
                ];
            } else {
                fragment = this.generateExpression(expr.left, Precedence.Call, E_TTT);
            }

            fragment = join(fragment, expr.of ? 'of' : 'in');
            fragment = join(fragment, this.generateExpression(expr.right, Precedence.Sequence, E_TTT));

            return [ 'for' + space + '(', fragment, ')' ];
        },

        SpreadElement: function (expr, precedence, flags) {
            return [
                '...',
                this.generateExpression(expr.argument, Precedence.Assignment, E_TTT)
            ];
        },

        TaggedTemplateExpression: function (expr, precedence, flags) {
            var itemFlags = E_TTF;
            if (!(flags & F_ALLOW_CALL)) {
                itemFlags = E_TFF;
            }
            var result = [
                this.generateExpression(expr.tag, Precedence.Call, itemFlags),
                this.generateExpression(expr.quasi, Precedence.Primary, E_FFT)
            ];
            return parenthesize(result, Precedence.TaggedTemplate, precedence);
        },

        TemplateElement: function (expr, precedence, flags) {
            // Don't use "cooked". Since tagged template can use raw template
            // representation. So if we do so, it breaks the script semantics.
            return expr.value.raw;
        },

        TemplateLiteral: function (expr, precedence, flags) {
            var result, i, iz;
            result = [ '`' ];
            for (i = 0, iz = expr.quasis.length; i < iz; ++i) {
                result.push(this.generateExpression(expr.quasis[i], Precedence.Primary, E_TTT));
                if (i + 1 < iz) {
                    result.push('${' + space);
                    result.push(this.generateExpression(expr.expressions[i], Precedence.Sequence, E_TTT));
                    result.push(space + '}');
                }
            }
            result.push('`');
            return result;
        },

        ModuleSpecifier: function (expr, precedence, flags) {
            return this.Literal(expr, precedence, flags);
        }
    };

    merge(CodeGenerator.prototype, CodeGenerator.Expression);

    CodeGenerator.prototype.generateExpression = function (expr, precedence, flags) {
        var result, type;

        type = expr.type || Syntax.Property;

        if (extra.verbatim && expr.hasOwnProperty(extra.verbatim)) {
            return generateVerbatim(expr, precedence);
        }

        result = this[type](expr, precedence, flags);

        if (extra.comment) {
            result = addComments(expr, result);
        }
        return toSourceNodeWhenNeeded(result, expr);
    };

    CodeGenerator.prototype.generateStatement = function (stmt, flags) {
        var result,
            fragment;

        result = this[stmt.type](stmt, flags);

        // Attach comments

        if (extra.comment) {
            result = addComments(stmt, result);
        }

        fragment = toSourceNodeWhenNeeded(result).toString();
        if (stmt.type === Syntax.Program && !safeConcatenation && newline === '' &&  fragment.charAt(fragment.length - 1) === '\n') {
            result = sourceMap ? toSourceNodeWhenNeeded(result).replaceRight(/\s+$/, '') : fragment.replace(/\s+$/, '');
        }

        return toSourceNodeWhenNeeded(result, stmt);
    };

    function generateInternal(node) {
        var codegen;

        codegen = new CodeGenerator();
        if (isStatement(node)) {
            return codegen.generateStatement(node, S_TFFF);
        }

        if (isExpression(node)) {
            return codegen.generateExpression(node, Precedence.Sequence, E_TTT);
        }

        throw new Error('Unknown node type: ' + node.type);
    }

    function generate(node, options) {
        var defaultOptions = getDefaultOptions(), result, pair;

        if (options != null) {
            // Obsolete options
            //
            //   `options.indent`
            //   `options.base`
            //
            // Instead of them, we can use `option.format.indent`.
            if (typeof options.indent === 'string') {
                defaultOptions.format.indent.style = options.indent;
            }
            if (typeof options.base === 'number') {
                defaultOptions.format.indent.base = options.base;
            }
            options = updateDeeply(defaultOptions, options);
            indent = options.format.indent.style;
            if (typeof options.base === 'string') {
                base = options.base;
            } else {
                base = stringRepeat(indent, options.format.indent.base);
            }
        } else {
            options = defaultOptions;
            indent = options.format.indent.style;
            base = stringRepeat(indent, options.format.indent.base);
        }
        json = options.format.json;
        renumber = options.format.renumber;
        hexadecimal = json ? false : options.format.hexadecimal;
        quotes = json ? 'double' : options.format.quotes;
        escapeless = options.format.escapeless;
        newline = options.format.newline;
        space = options.format.space;
        if (options.format.compact) {
            newline = space = indent = base = '';
        }
        parentheses = options.format.parentheses;
        semicolons = options.format.semicolons;
        safeConcatenation = options.format.safeConcatenation;
        directive = options.directive;
        parse = json ? null : options.parse;
        sourceMap = options.sourceMap;
        sourceCode = options.sourceCode;
        preserveBlankLines = options.format.preserveBlankLines && sourceCode !== null;
        extra = options;

        if (sourceMap) {
            if (!exports.browser) {
                // We assume environment is node.js
                // And prevent from including source-map by browserify
                SourceNode = require('source-map').SourceNode;
            } else {
                SourceNode = global.sourceMap.SourceNode;
            }
        }

        result = generateInternal(node);

        if (!sourceMap) {
            pair = {code: result.toString(), map: null};
            return options.sourceMapWithCode ? pair : pair.code;
        }

        pair = result.toStringWithSourceMap({
            file: options.file,
            sourceRoot: options.sourceMapRoot
        });

        if (options.sourceContent) {
            pair.map.setSourceContent(options.sourceMap,
                                      options.sourceContent);
        }

        if (options.sourceMapWithCode) {
            return pair;
        }

        return pair.map.toString();
    }

    FORMAT_MINIFY = {
        indent: {
            style: '',
            base: 0
        },
        renumber: true,
        hexadecimal: true,
        quotes: 'auto',
        escapeless: true,
        compact: true,
        parentheses: false,
        semicolons: false
    };

    FORMAT_DEFAULTS = getDefaultOptions().format;

    exports.version = require('./package.json').version;
    exports.generate = generate;
    exports.attachComments = estraverse.attachComments;
    exports.Precedence = updateDeeply({}, Precedence);
    exports.browser = false;
    exports.FORMAT_MINIFY = FORMAT_MINIFY;
    exports.FORMAT_DEFAULTS = FORMAT_DEFAULTS;
}());
/* vim: set sw=4 ts=4 et tw=80 : */
}());
/* jslint ignore:end */



/*
file https://github.com/components/handlebars.js/blob/v1.2.1/handlebars.js
*/
/* validateLineSortedReset */
local.handlebars = {};
local.handlebars.compile = function (template) {
/*
 * this function will return a function
 * that will render <template> with given <dict>
 */
    return function (dict) {
        var result;
        result = template;
        // render triple-curly-brace
        result = result.replace((
            /\{\{\{/g
        ), "{{").replace((
            /\}\}\}/g
        ), "}}");
        // render with-statement
        result = result.replace((
            /\{\{#with\u0020(.+?)\}\}([\S\s]+?)\{\{\/with\}\}/g
        ), function (ignore, match1, match2) {
            return local.handlebars.replace(match2, dict, match1 + ".");
        });
        // render helper
        result = result.replace(
            "{{#show_ignores metrics}}{{/show_ignores}}",
            function () {
                return local.handlebars.show_ignores(dict.metrics);
            }
        );
        result = result.replace((
            "{{#show_line_execution_counts fileCoverage}}"
            + "{{maxLines}}{{/show_line_execution_counts}}"
        ), function () {
            return local.handlebars.show_line_execution_counts(
                dict.fileCoverage,
                {
                    fn: function () {
                        return dict.maxLines;
                    }
                }
            );
        });
        result = result.replace(
            "{{#show_lines}}{{maxLines}}{{/show_lines}}",
            function () {
                return local.handlebars.show_lines({
                    fn: function () {
                        return dict.maxLines;
                    }
                });
            }
        );
        result = result.replace(
            "{{#show_picture}}{{metrics.statements.pct}}{{/show_picture}}",
            function () {
                return local.handlebars.show_picture({
                    fn: function () {
                        return dict.metrics.statements.pct;
                    }
                });
            }
        );
        result = local.handlebars.replace(result, dict, "");
        // show code last
        result = result.replace(
            "{{#show_code structured}}{{/show_code}}",
            function () {
                return local.handlebars.show_code(dict.structured);
            }
        );
        return result;
    };
};

local.handlebars.registerHelper = function (key, helper) {
/*
 * this function will register the helper-function
 */
    local.handlebars[key] = function (aa, bb) {
        try {
            return helper(aa, bb);
        } catch (ignore) {}
    };
};

local.handlebars.replace = function (template, dict, withPrefix) {
/*
 * this function will render <template> with given <dict>
 */
    var value;
    // search for keys in the template
    return template.replace((
        /\{\{.+?\}\}/g
    ), function (match0) {
        value = dict;
        // iteratively lookup nested values in the dict
        (withPrefix + match0.slice(2, -2)).split(".").forEach(function (key) {
            value = value && value[key];
        });
        return (
            value === undefined
            ? match0
            : String(value)
        );
    });
};

/*
file https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/collector.js
*/
/* validateLineSortedReset */
local.collector = {
    fileCoverageFor: function (file) {
        return globalThis.__coverage__[file];
    },
    files: function () {
        return Object.keys(globalThis.__coverage__).filter(function (key) {
            if (
                globalThis.__coverage__[key]
                && globalThis.__coverageCodeDict__[key]
            ) {
                // reset derived info
                globalThis.__coverage__[key].l = null;
                return true;
            }
        });
    }
};



/*
file https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/util/insertion-text.js
*/
/* istanbul ignore next */
/* jslint ignore:start */
(function () { var module; module = {};
/*
 Copyright (c) 2012, Yahoo! Inc.  All rights reserved.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

function InsertionText(text, consumeBlanks) {
    this.text = text;
    this.origLength = text.length;
    this.offsets = [];
    this.consumeBlanks = consumeBlanks;
    this.startPos = this.findFirstNonBlank();
    this.endPos = this.findLastNonBlank();
}

var WHITE_RE = /[ \f\n\r\t\v\u00A0\u2028\u2029]/;

InsertionText.prototype = {

    findFirstNonBlank: function () {
        var pos = -1,
            text = this.text,
            len = text.length,
            i;
        for (i = 0; i < len; i += 1) {
            if (!text.charAt(i).match(WHITE_RE)) {
                pos = i;
                break;
            }
        }
        return pos;
    },
    findLastNonBlank: function () {
        var text = this.text,
            len = text.length,
            pos = text.length + 1,
            i;
        for (i = len - 1; i >= 0; i -= 1) {
            if (!text.charAt(i).match(WHITE_RE)) {
                pos = i;
                break;
            }
        }
        return pos;
    },
    originalLength: function () {
        return this.origLength;
    },

    insertAt: function (col, str, insertBefore, consumeBlanks) {
        consumeBlanks = typeof consumeBlanks === 'undefined' ? this.consumeBlanks : consumeBlanks;
        col = col > this.originalLength() ? this.originalLength() : col;
        col = col < 0 ? 0 : col;

        if (consumeBlanks) {
            if (col <= this.startPos) {
                col = 0;
            }
            if (col > this.endPos) {
                col = this.origLength;
            }
        }

        var len = str.length,
            offset = this.findOffset(col, len, insertBefore),
            realPos = col + offset,
            text = this.text;
        this.text = text.substring(0, realPos) + str + text.substring(realPos);
        return this;
    },

    findOffset: function (pos, len, insertBefore) {
        var offsets = this.offsets,
            offsetObj,
            cumulativeOffset = 0,
            i;

        for (i = 0; i < offsets.length; i += 1) {
            offsetObj = offsets[i];
            if (offsetObj.pos < pos || (offsetObj.pos === pos && !insertBefore)) {
                cumulativeOffset += offsetObj.len;
            }
            if (offsetObj.pos >= pos) {
                break;
            }
        }
        if (offsetObj && offsetObj.pos === pos) {
            offsetObj.len += len;
        } else {
            offsets.splice(i, 0, { pos: pos, len: len });
        }
        return cumulativeOffset;
    },

    wrap: function (startPos, startText, endPos, endText, consumeBlanks) {
        this.insertAt(startPos, startText, true, consumeBlanks);
        this.insertAt(endPos, endText, false, consumeBlanks);
        return this;
    },

    wrapLine: function (startText, endText) {
        this.wrap(0, startText, this.originalLength(), endText);
    },

    toString: function () {
        return this.text;
    }
};

module.exports = InsertionText;
local["../util/insertion-text"] = module.exports; }());



/*
file https://github.com/gotwarlost/istanbul/blob/v0.4.5/lib/instrumenter.js
*/
/* istanbul ignore next */
(function () { var escodegen, esprima, module, window; escodegen = local.escodegen; esprima = local.esprima; module = undefined; window = local;
/*
 Copyright (c) 2012, Yahoo! Inc.  All rights reserved.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

/*global esprima, escodegen, window */
(function (isNode) {
    "use strict";
    var SYNTAX,
        nodeType,
        ESP = isNode ? require('esprima') : esprima,
        ESPGEN = isNode ? require('escodegen') : escodegen,  //TODO - package as dependency
        crypto = isNode ? require('crypto') : null,
        LEADER_WRAP = '(function () { ',
        TRAILER_WRAP = '\n}());',
        COMMENT_RE = /^\s*istanbul\s+ignore\s+(if|else|next)(?=\W|$)/,
        astgen,
        preconditions,
        cond,
        isArray = Array.isArray;

    /* istanbul ignore if: untestable */
    if (!isArray) {
        isArray = function (thing) { return thing &&  Object.prototype.toString.call(thing) === '[object Array]'; };
    }

    if (!isNode) {
        preconditions = {
            'Could not find esprima': ESP,
            'Could not find escodegen': ESPGEN,
            'JSON object not in scope': JSON,
            'Array does not implement push': [].push,
            'Array does not implement unshift': [].unshift
        };
        /* istanbul ignore next: untestable */
        for (cond in preconditions) {
            if (preconditions.hasOwnProperty(cond)) {
                if (!preconditions[cond]) { throw new Error(cond); }
            }
        }
    }

    function generateTrackerVar(filename, omitSuffix) {
        var hash, suffix;
        if (crypto !== null) {
            hash = crypto.createHash('md5');
            hash.update(filename);
            suffix = hash.digest('base64');
            //trim trailing equal signs, turn identifier unsafe chars to safe ones + => _ and / => $
            suffix = suffix.replace(new RegExp('=', 'g'), '')
                .replace(new RegExp('\\+', 'g'), '_')
                .replace(new RegExp('/', 'g'), '$');
        } else {
            window.__cov_seq = window.__cov_seq || 0;
            window.__cov_seq += 1;
            suffix = window.__cov_seq;
        }
        // coverage-hack - pseudorandom coverage-identifier
        return '__cov_' + Math.random().toString(16).slice(2);
    }

    function pushAll(ary, thing) {
        if (!isArray(thing)) {
            thing = [ thing ];
        }
        Array.prototype.push.apply(ary, thing);
    }

    SYNTAX = {
        // keep in sync with estraverse's VisitorKeys
        AssignmentExpression: ['left', 'right'],
        AssignmentPattern: ['left', 'right'],
        ArrayExpression: ['elements'],
        ArrayPattern: ['elements'],
        ArrowFunctionExpression: ['params', 'body'],
        AwaitExpression: ['argument'], // CAUTION: It's deferred to ES7.
        BlockStatement: ['body'],
        BinaryExpression: ['left', 'right'],
        BreakStatement: ['label'],
        CallExpression: ['callee', 'arguments'],
        CatchClause: ['param', 'body'],
        ClassBody: ['body'],
        ClassDeclaration: ['id', 'superClass', 'body'],
        ClassExpression: ['id', 'superClass', 'body'],
        ComprehensionBlock: ['left', 'right'],  // CAUTION: It's deferred to ES7.
        ComprehensionExpression: ['blocks', 'filter', 'body'],  // CAUTION: It's deferred to ES7.
        ConditionalExpression: ['test', 'consequent', 'alternate'],
        ContinueStatement: ['label'],
        DebuggerStatement: [],
        DirectiveStatement: [],
        DoWhileStatement: ['body', 'test'],
        EmptyStatement: [],
        ExportAllDeclaration: ['source'],
        ExportDefaultDeclaration: ['declaration'],
        ExportNamedDeclaration: ['declaration', 'specifiers', 'source'],
        ExportSpecifier: ['exported', 'local'],
        ExpressionStatement: ['expression'],
        ForStatement: ['init', 'test', 'update', 'body'],
        ForInStatement: ['left', 'right', 'body'],
        ForOfStatement: ['left', 'right', 'body'],
        FunctionDeclaration: ['id', 'params', 'body'],
        FunctionExpression: ['id', 'params', 'body'],
        GeneratorExpression: ['blocks', 'filter', 'body'],  // CAUTION: It's deferred to ES7.
        Identifier: [],
        IfStatement: ['test', 'consequent', 'alternate'],
        ImportDeclaration: ['specifiers', 'source'],
        ImportDefaultSpecifier: ['local'],
        ImportNamespaceSpecifier: ['local'],
        ImportSpecifier: ['imported', 'local'],
        Literal: [],
        LabeledStatement: ['label', 'body'],
        LogicalExpression: ['left', 'right'],
        MetaProperty: ['meta', 'property'],
        MemberExpression: ['object', 'property'],
        MethodDefinition: ['key', 'value'],
        ModuleSpecifier: [],
        NewExpression: ['callee', 'arguments'],
        ObjectExpression: ['properties'],
        ObjectPattern: ['properties'],
        Program: ['body'],
        Property: ['key', 'value'],
        RestElement: [ 'argument' ],
        ReturnStatement: ['argument'],
        SequenceExpression: ['expressions'],
        SpreadElement: ['argument'],
        Super: [],
        SwitchStatement: ['discriminant', 'cases'],
        SwitchCase: ['test', 'consequent'],
        TaggedTemplateExpression: ['tag', 'quasi'],
        TemplateElement: [],
        TemplateLiteral: ['quasis', 'expressions'],
        ThisExpression: [],
        ThrowStatement: ['argument'],
        TryStatement: ['block', 'handler', 'finalizer'],
        UnaryExpression: ['argument'],
        UpdateExpression: ['argument'],
        VariableDeclaration: ['declarations'],
        VariableDeclarator: ['id', 'init'],
        WhileStatement: ['test', 'body'],
        WithStatement: ['object', 'body'],
        YieldExpression: ['argument']
    };

    for (nodeType in SYNTAX) {
        /* istanbul ignore else: has own property */
        if (SYNTAX.hasOwnProperty(nodeType)) {
            SYNTAX[nodeType] = { name: nodeType, children: SYNTAX[nodeType] };
        }
    }

    astgen = {
        variable: function (name) { return { type: SYNTAX.Identifier.name, name: name }; },
        stringLiteral: function (str) { return { type: SYNTAX.Literal.name, value: String(str) }; },
        numericLiteral: function (num) { return { type: SYNTAX.Literal.name, value: Number(num) }; },
        statement: function (contents) { return { type: SYNTAX.ExpressionStatement.name, expression: contents }; },
        dot: function (obj, field) { return { type: SYNTAX.MemberExpression.name, computed: false, object: obj, property: field }; },
        subscript: function (obj, sub) { return { type: SYNTAX.MemberExpression.name, computed: true, object: obj, property: sub }; },
        postIncrement: function (obj) { return { type: SYNTAX.UpdateExpression.name, operator: '++', prefix: false, argument: obj }; },
        sequence: function (one, two) { return { type: SYNTAX.SequenceExpression.name, expressions: [one, two] }; },
        returnStatement: function (expr) { return { type: SYNTAX.ReturnStatement.name, argument: expr }; }
    };

    function Walker(walkMap, preprocessor, scope, debug) {
        this.walkMap = walkMap;
        this.preprocessor = preprocessor;
        this.scope = scope;
        this.debug = debug;
        if (this.debug) {
            this.level = 0;
            this.seq = true;
        }
    }

    function defaultWalker(node, walker) {

        var type = node.type,
            preprocessor,
            postprocessor,
            children = SYNTAX[type],
            // don't run generated nodes thru custom walks otherwise we will attempt to instrument the instrumentation code :)
            applyCustomWalker = !!node.loc || node.type === SYNTAX.Program.name,
            walkerFn = applyCustomWalker ? walker.walkMap[type] : null,
            i,
            j,
            walkFnIndex,
            childType,
            childNode,
            ret,
            childArray,
            childElement,
            pathElement,
            assignNode,
            isLast;

        if (!SYNTAX[type]) {
            console.error(node);
            console.error('Unsupported node type:' + type);
            return;
        }
        children = SYNTAX[type].children;
        /* istanbul ignore if: guard */
        if (node.walking) { throw new Error('Infinite regress: Custom walkers may NOT call walker.apply(node)'); }
        node.walking = true;

        ret = walker.apply(node, walker.preprocessor);

        preprocessor = ret.preprocessor;
        if (preprocessor) {
            delete ret.preprocessor;
            ret = walker.apply(node, preprocessor);
        }

        if (isArray(walkerFn)) {
            for (walkFnIndex = 0; walkFnIndex < walkerFn.length; walkFnIndex += 1) {
                isLast = walkFnIndex === walkerFn.length - 1;
                ret = walker.apply(ret, walkerFn[walkFnIndex]);
                /*istanbul ignore next: paranoid check */
                if (ret.type !== type && !isLast) {
                    throw new Error('Only the last walker is allowed to change the node type: [type was: ' + type + ' ]');
                }
            }
        } else {
            if (walkerFn) {
                ret = walker.apply(node, walkerFn);
            }
        }

        if (node.skipSelf) {
            return;
        }

        for (i = 0; i < children.length; i += 1) {
            childType = children[i];
            childNode = node[childType];
            if (childNode && !childNode.skipWalk) {
                pathElement = { node: node, property: childType };
                if (isArray(childNode)) {
                    childArray = [];
                    for (j = 0; j < childNode.length; j += 1) {
                        childElement = childNode[j];
                        pathElement.index = j;
                        if (childElement) {
                          assignNode = walker.apply(childElement, null, pathElement);
                          if (isArray(assignNode.prepend)) {
                              pushAll(childArray, assignNode.prepend);
                              delete assignNode.prepend;
                          }
                        } else {
                            assignNode = undefined;
                        }
                        pushAll(childArray, assignNode);
                    }
                    node[childType] = childArray;
                } else {
                    assignNode = walker.apply(childNode, null, pathElement);
                    /*istanbul ignore if: paranoid check */
                    if (isArray(assignNode.prepend)) {
                        throw new Error('Internal error: attempt to prepend statements in disallowed (non-array) context');
                        /* if this should be allowed, this is how to solve it
                        tmpNode = { type: 'BlockStatement', body: [] };
                        pushAll(tmpNode.body, assignNode.prepend);
                        pushAll(tmpNode.body, assignNode);
                        node[childType] = tmpNode;
                        delete assignNode.prepend;
                        */
                    } else {
                        node[childType] = assignNode;
                    }
                }
            }
        }

        postprocessor = ret.postprocessor;
        if (postprocessor) {
            delete ret.postprocessor;
            ret = walker.apply(ret, postprocessor);
        }

        delete node.walking;

        return ret;
    }

    Walker.prototype = {
        startWalk: function (node) {
            this.path = [];
            this.apply(node);
        },

        apply: function (node, walkFn, pathElement) {
            var ret, i, seq, prefix;

            walkFn = walkFn || defaultWalker;
            if (this.debug) {
                this.seq += 1;
                this.level += 1;
                seq = this.seq;
                prefix = '';
                for (i = 0; i < this.level; i += 1) { prefix += '    '; }
                console.log(prefix + 'Enter (' + seq + '):' + node.type);
            }
            if (pathElement) { this.path.push(pathElement); }
            ret = walkFn.call(this.scope, node, this);
            if (pathElement) { this.path.pop(); }
            if (this.debug) {
                this.level -= 1;
                console.log(prefix + 'Return (' + seq + '):' + node.type);
            }
            return ret || node;
        },

        startLineForNode: function (node) {
            return node && node.loc && node.loc.start ? node.loc.start.line : /* istanbul ignore next: guard */ null;
        },

        ancestor: function (n) {
            return this.path.length > n - 1 ? this.path[this.path.length - n] : /* istanbul ignore next: guard */ null;
        },

        parent: function () {
            return this.ancestor(1);
        },

        isLabeled: function () {
            var el = this.parent();
            return el && el.node.type === SYNTAX.LabeledStatement.name;
        }
    };

    /**
     * mechanism to instrument code for coverage. It uses the `esprima` and
     * `escodegen` libraries for JS parsing and code generation respectively.
     *
     * Works on `node` as well as the browser.
     *
     * Usage on nodejs
     * ---------------
     *
     *      var instrumenter = new require('istanbul').Instrumenter(),
     *          changed = instrumenter.instrumentSync('function meaningOfLife() { return 42; }', 'filename.js');
     *
     * Usage in a browser
     * ------------------
     *
     * Load `esprima.js`, `escodegen.js` and `instrumenter.js` (this file) using `script` tags or other means.
     *
     * Create an instrumenter object as:
     *
     *      var instrumenter = new Instrumenter(),
     *          changed = instrumenter.instrumentSync('function meaningOfLife() { return 42; }', 'filename.js');
     *
     * Aside from demonstration purposes, it is unclear why you would want to instrument code in a browser.
     *
     * @class Instrumenter
     * @constructor
     * @param {Object} options Optional. Configuration options.
     * @param {String} [options.coverageVariable] the global variable name to use for
     *      tracking coverage. Defaults to `__coverage__`
     * @param {Boolean} [options.embedSource] whether to embed the source code of every
     *      file as an array in the file coverage object for that file. Defaults to `false`
     * @param {Boolean} [options.preserveComments] whether comments should be preserved in the output. Defaults to `false`
     * @param {Boolean} [options.noCompact] emit readable code when set. Defaults to `false`
     * @param {Boolean} [options.esModules] whether the code to instrument contains uses es
     *      imports or exports.
     * @param {Boolean} [options.noAutoWrap] do not automatically wrap the source in
     *      an anonymous function before covering it. By default, code is wrapped in
     *      an anonymous function before it is parsed. This is done because
     *      some nodejs libraries have `return` statements outside of
     *      a function which is technically invalid Javascript and causes the parser to fail.
     *      This construct, however, works correctly in node since module loading
     *      is done in the context of an anonymous function.
     *
     * Note that the semantics of the code *returned* by the instrumenter does not change in any way.
     * The function wrapper is "unwrapped" before the instrumented code is generated.
     * @param {Object} [options.codeGenerationOptions] an object that is directly passed to the `escodegen`
     *      library as configuration for code generation. The `noCompact` setting is not honored when this
     *      option is specified
     * @param {Boolean} [options.debug] assist in debugging. Currently, the only effect of
     *      setting this option is a pretty-print of the coverage variable. Defaults to `false`
     * @param {Boolean} [options.walkDebug] assist in debugging of the AST walker used by this class.
     *
     */
    function Instrumenter(options) {
        this.opts = options || {
            debug: false,
            walkDebug: false,
            coverageVariable: '__coverage__',
            codeGenerationOptions: undefined,
            noAutoWrap: false,
            noCompact: false,
            embedSource: false,
            preserveComments: false,
            esModules: false
        };

        if (this.opts.esModules && !this.opts.noAutoWrap) {
            this.opts.noAutoWrap = true;
            if (this.opts.debug) {
                console.log('Setting noAutoWrap to true as required by esModules');
            }
        }

        this.walker = new Walker({
            ArrowFunctionExpression: [ this.arrowBlockConverter ],
            ExpressionStatement: this.coverStatement,
            ExportNamedDeclaration: this.coverExport,
            BreakStatement: this.coverStatement,
            ContinueStatement: this.coverStatement,
            DebuggerStatement: this.coverStatement,
            ReturnStatement: this.coverStatement,
            ThrowStatement: this.coverStatement,
            TryStatement: [ this.paranoidHandlerCheck, this.coverStatement],
            VariableDeclaration: this.coverStatement,
            IfStatement: [ this.ifBlockConverter, this.coverStatement, this.ifBranchInjector ],
            ForStatement: [ this.skipInit, this.loopBlockConverter, this.coverStatement ],
            ForInStatement: [ this.skipLeft, this.loopBlockConverter, this.coverStatement ],
            ForOfStatement: [ this.skipLeft, this.loopBlockConverter, this.coverStatement ],
            WhileStatement: [ this.loopBlockConverter, this.coverStatement ],
            DoWhileStatement: [ this.loopBlockConverter, this.coverStatement ],
            SwitchStatement: [ this.coverStatement, this.switchBranchInjector ],
            SwitchCase: [ this.switchCaseInjector ],
            WithStatement: [ this.withBlockConverter, this.coverStatement ],
            FunctionDeclaration: [ this.coverFunction, this.coverStatement ],
            FunctionExpression: this.coverFunction,
            LabeledStatement: this.coverStatement,
            ConditionalExpression: this.conditionalBranchInjector,
            LogicalExpression: this.logicalExpressionBranchInjector,
            ObjectExpression: this.maybeAddType,
            MetaProperty: this.coverMetaProperty,
        }, this.extractCurrentHint, this, this.opts.walkDebug);

        //unit testing purposes only
        if (this.opts.backdoor && this.opts.backdoor.omitTrackerSuffix) {
            this.omitTrackerSuffix = true;
        }
    }

    Instrumenter.prototype = {
        /**
         * synchronous instrumentation method. Throws when illegal code is passed to it
         * @method instrumentSync
         * @param {String} code the code to be instrumented as a String
         * @param {String} filename Optional. The name of the file from which
         *  the code was read. A temporary filename is generated when not specified.
         *  Not specifying a filename is only useful for unit tests and demonstrations
         *  of this library.
         */
        instrumentSync: function (code, filename) {
            var program;

            //protect from users accidentally passing in a Buffer object instead
            if (typeof code !== 'string') { throw new Error('Code must be string'); }
            if (code.charAt(0) === '#') { //shebang, 'comment' it out, won't affect syntax tree locations for things we care about
                code = '//' + code;
            }
            if (!this.opts.noAutoWrap) {
                code = LEADER_WRAP + code + TRAILER_WRAP;
            }
            try {
                program = ESP.parse(code, {
                    loc: true,
                    range: true,
                    tokens: this.opts.preserveComments,
                    comment: true,
                    sourceType: this.opts.esModules ? 'module' : 'script'
                });
            } catch (e) {
                console.log('Failed to parse file: ' + filename);
                throw e;
            }
            if (this.opts.preserveComments) {
                program = ESPGEN.attachComments(program, program.comments, program.tokens);
            }
            if (!this.opts.noAutoWrap) {
                program = {
                    type: SYNTAX.Program.name,
                    body: program.body[0].expression.callee.body.body,
                    comments: program.comments
                };
            }
            return this.instrumentASTSync(program, filename, code);
        },
        filterHints: function (comments) {
            var ret = [],
                i,
                comment,
                groups;
            if (!(comments && isArray(comments))) {
                return ret;
            }
            for (i = 0; i < comments.length; i += 1) {
                comment = comments[i];
                /* istanbul ignore else: paranoid check */
                if (comment && comment.value && comment.range && isArray(comment.range)) {
                    groups = String(comment.value).match(COMMENT_RE);
                    if (groups) {
                        ret.push({ type: groups[1], start: comment.range[0], end: comment.range[1] });
                    }
                }
            }
            return ret;
        },
        extractCurrentHint: function (node) {
            if (!node.range) { return; }
            var i = this.currentState.lastHintPosition + 1,
                hints = this.currentState.hints,
                nodeStart = node.range[0],
                hint;
            this.currentState.currentHint = null;
            // coverage-hack - allow top-level istanbul-ignore-next
            if (node.type === "Program") { return; }
            while (i < hints.length) {
                hint = hints[i];
                if (hint.end < nodeStart) {
                    this.currentState.currentHint = hint;
                    this.currentState.lastHintPosition = i;
                    i += 1;
                } else {
                    break;
                }
            }
        },
        /**
         * synchronous instrumentation method that instruments an AST instead.
         * @method instrumentASTSync
         * @param {String} program the AST to be instrumented
         * @param {String} filename Optional. The name of the file from which
         *  the code was read. A temporary filename is generated when not specified.
         *  Not specifying a filename is only useful for unit tests and demonstrations
         *  of this library.
         *  @param {String} originalCode the original code corresponding to the AST,
         *  used for embedding the source into the coverage object
         */
        instrumentASTSync: function (program, filename, originalCode) {
            var usingStrict = false,
                codegenOptions,
                generated,
                preamble,
                lineCount,
                i;
            filename = filename || String(new Date().getTime()) + '.js';
            this.sourceMap = null;
            this.coverState = {
                path: filename,
                s: {},
                b: {},
                f: {},
                fnMap: {},
                statementMap: {},
                branchMap: {}
            };
            this.currentState = {
                trackerVar: generateTrackerVar(filename, this.omitTrackerSuffix),
                func: 0,
                branch: 0,
                variable: 0,
                statement: 0,
                hints: this.filterHints(program.comments),
                currentHint: null,
                lastHintPosition: -1,
                ignoring: 0
            };
            if (program.body && program.body.length > 0 && this.isUseStrictExpression(program.body[0])) {
                //nuke it
                program.body.shift();
                //and add it back at code generation time
                usingStrict = true;
            }
            this.walker.startWalk(program);
            codegenOptions = this.opts.codeGenerationOptions || { format: { compact: !this.opts.noCompact }};
            codegenOptions.comment = this.opts.preserveComments;
            //console.log(JSON.stringify(program, undefined, 2));

            generated = ESPGEN.generate(program, codegenOptions);
            preamble = this.getPreamble(originalCode || '', usingStrict);

            if (generated.map && generated.code) {
                lineCount = preamble.split(/\r\n|\r|\n/).length;
                // offset all the generated line numbers by the number of lines in the preamble
                for (i = 0; i < generated.map._mappings._array.length; i += 1) {
                    generated.map._mappings._array[i].generatedLine += lineCount;
                }
                this.sourceMap = generated.map;
                generated = generated.code;
            }

            return preamble + '\n' + generated + '\n';
        },
        /**
         * Callback based instrumentation. Note that this still executes synchronously in the same process tick
         * and calls back immediately. It only provides the options for callback style error handling as
         * opposed to a `try-catch` style and nothing more. Implemented as a wrapper over `instrumentSync`
         *
         * @method instrument
         * @param {String} code the code to be instrumented as a String
         * @param {String} filename Optional. The name of the file from which
         *  the code was read. A temporary filename is generated when not specified.
         *  Not specifying a filename is only useful for unit tests and demonstrations
         *  of this library.
         * @param {Function(err, instrumentedCode)} callback - the callback function
         */
        instrument: function (code, filename, callback) {

            if (!callback && typeof filename === 'function') {
                callback = filename;
                filename = null;
            }
            try {
                callback(null, this.instrumentSync(code, filename));
            } catch (ex) {
                callback(ex);
            }
        },
        /**
         * returns the file coverage object for the code that was instrumented
         * just before calling this method. Note that this represents a
         * "zero-coverage" object which is not even representative of the code
         * being loaded in node or a browser (which would increase the statement
         * counts for mainline code).
         * @method lastFileCoverage
         * @return {Object} a "zero-coverage" file coverage object for the code last instrumented
         * by this instrumenter
         */
        lastFileCoverage: function () {
            return this.coverState;
        },
        /**
         * returns the source map object for the code that was instrumented
         * just before calling this method.
         * @method lastSourceMap
         * @return {Object} a source map object for the code last instrumented
         * by this instrumenter
         */
        lastSourceMap: function () {
            return this.sourceMap;
        },
        fixColumnPositions: function (coverState) {
            var offset = LEADER_WRAP.length,
                fixer = function (loc) {
                    if (loc.start.line === 1) {
                        loc.start.column -= offset;
                    }
                    if (loc.end.line === 1) {
                        loc.end.column -= offset;
                    }
                },
                k,
                obj,
                i,
                locations;

            obj = coverState.statementMap;
            for (k in obj) {
                /* istanbul ignore else: has own property */
                if (obj.hasOwnProperty(k)) { fixer(obj[k]); }
            }
            obj = coverState.fnMap;
            for (k in obj) {
                /* istanbul ignore else: has own property */
                if (obj.hasOwnProperty(k)) { fixer(obj[k].loc); }
            }
            obj = coverState.branchMap;
            for (k in obj) {
                /* istanbul ignore else: has own property */
                if (obj.hasOwnProperty(k)) {
                    locations = obj[k].locations;
                    for (i = 0; i < locations.length; i += 1) {
                        fixer(locations[i]);
                    }
                }
            }
        },

        getPreamble: function (sourceCode, emitUseStrict) {
            var varName = this.opts.coverageVariable || '__coverage__',
                file = this.coverState.path.replace(/\\/g, '\\\\'),
                tracker = this.currentState.trackerVar,
                coverState,
                strictLine = emitUseStrict ? '"use strict";' : '',
                // return replacements using the function to ensure that the replacement is
                // treated like a dumb string and not as a string with RE replacement patterns
                replacer = function (s) {
                    return function () { return s; };
                },
                code;
            if (!this.opts.noAutoWrap) {
                this.fixColumnPositions(this.coverState);
            }
            if (this.opts.embedSource) {
                this.coverState.code = sourceCode.split(/(?:\r?\n)|\r/);
            }
            coverState = this.opts.debug ? JSON.stringify(this.coverState, undefined, 4) : JSON.stringify(this.coverState);
            code = [
                "%STRICT%",
                "var %VAR% = (Function('return this'))();",
                "if (!%VAR%.%GLOBAL%) { %VAR%.%GLOBAL% = {}; }",
                "%VAR% = %VAR%.%GLOBAL%;",
                "if (!(%VAR%['%FILE%'])) {",
                "   %VAR%['%FILE%'] = %OBJECT%;",
                "}",
                "%VAR% = %VAR%['%FILE%'];"
            ].join("\n")
                .replace(/%STRICT%/g, replacer(strictLine))
                .replace(/%VAR%/g, replacer(tracker))
                .replace(/%GLOBAL%/g, replacer(varName))
                .replace(/%FILE%/g, replacer(file))
                .replace(/%OBJECT%/g, replacer(coverState));
            return code;
        },

        startIgnore: function () {
            this.currentState.ignoring += 1;
        },

        endIgnore: function () {
            this.currentState.ignoring -= 1;
        },

        convertToBlock: function (node) {
            if (!node) {
                return { type: 'BlockStatement', body: [] };
            } else if (node.type === 'BlockStatement') {
                return node;
            } else {
                return { type: 'BlockStatement', body: [ node ] };
            }
        },

        arrowBlockConverter: function (node) {
            var retStatement;
            if (node.expression) { // turn expression nodes into a block with a return statement
                retStatement = astgen.returnStatement(node.body);
                // ensure the generated return statement is covered
                retStatement.loc = node.body.loc;
                node.body = this.convertToBlock(retStatement);
                node.expression = false;
            }
        },

        paranoidHandlerCheck: function (node) {
            // if someone is using an older esprima on the browser
            // convert handlers array to single handler attribute
            // containing its first element
            /* istanbul ignore next */
            if (!node.handler && node.handlers) {
                node.handler = node.handlers[0];
            }
        },

        ifBlockConverter: function (node) {
            node.consequent = this.convertToBlock(node.consequent);
            node.alternate = this.convertToBlock(node.alternate);
        },

        loopBlockConverter: function (node) {
            node.body = this.convertToBlock(node.body);
        },

        withBlockConverter: function (node) {
            node.body = this.convertToBlock(node.body);
        },

        statementName: function (location, initValue) {
            var sName,
                ignoring = !!this.currentState.ignoring;

            location.skip = ignoring || undefined;
            initValue = initValue || 0;
            this.currentState.statement += 1;
            sName = this.currentState.statement;
            this.coverState.statementMap[sName] = location;
            this.coverState.s[sName] = initValue;
            return sName;
        },

        skipInit: function (node /*, walker */) {
            if (node.init) {
                node.init.skipWalk = true;
            }
        },

        skipLeft: function (node /*, walker */) {
            node.left.skipWalk = true;
        },

        isUseStrictExpression: function (node) {
            return node && node.type === SYNTAX.ExpressionStatement.name &&
                node.expression  && node.expression.type === SYNTAX.Literal.name &&
                node.expression.value === 'use strict';
        },

        maybeSkipNode: function (node, type) {
            var alreadyIgnoring = !!this.currentState.ignoring,
                hint = this.currentState.currentHint,
                ignoreThis = !alreadyIgnoring && hint && hint.type === type;

            if (ignoreThis) {
                this.startIgnore();
                node.postprocessor = this.endIgnore;
                return true;
            }
            return false;
        },

        coverMetaProperty: function(node /* , walker */) {
           node.skipSelf = true;
        },

        coverStatement: function (node, walker) {
            var sName,
                incrStatementCount,
                parent,
                grandParent;

            this.maybeSkipNode(node, 'next');

            if (this.isUseStrictExpression(node)) {
                grandParent = walker.ancestor(2);
                /* istanbul ignore else: difficult to test */
                if (grandParent) {
                    if ((grandParent.node.type === SYNTAX.FunctionExpression.name ||
                        grandParent.node.type === SYNTAX.FunctionDeclaration.name)  &&
                        walker.parent().node.body[0] === node) {
                        return;
                    }
                }
            }

            if (node.type === SYNTAX.FunctionDeclaration.name) {
                // Called for the side-effect of setting the function's statement count to 1.
                this.statementName(node.loc, 1);
            } else {
                // We let `coverExport` handle ExportNamedDeclarations.
                parent = walker.parent();
                if (parent && parent.node.type === SYNTAX.ExportNamedDeclaration.name) {
                    return;
                }

                sName = this.statementName(node.loc);

                incrStatementCount = astgen.statement(
                    astgen.postIncrement(
                        astgen.subscript(
                            astgen.dot(astgen.variable(this.currentState.trackerVar), astgen.variable('s')),
                            astgen.stringLiteral(sName)
                        )
                    )
                );

                this.splice(incrStatementCount, node, walker);
            }
        },

        coverExport: function (node, walker) {
            var sName, incrStatementCount;

            if ( !node.declaration || !node.declaration.declarations ) { return; }

            this.maybeSkipNode(node, 'next');

            sName = this.statementName(node.declaration.loc);
            incrStatementCount = astgen.statement(
                astgen.postIncrement(
                    astgen.subscript(
                        astgen.dot(astgen.variable(this.currentState.trackerVar), astgen.variable('s')),
                        astgen.stringLiteral(sName)
                    )
                )
            );

            this.splice(incrStatementCount, node, walker);
        },

        splice: function (statements, node, walker) {
            var targetNode = walker.isLabeled() ? walker.parent().node : node;
            targetNode.prepend = targetNode.prepend || [];
            pushAll(targetNode.prepend, statements);
        },

        functionName: function (node, line, location) {
            this.currentState.func += 1;
            var id = this.currentState.func,
                ignoring = !!this.currentState.ignoring,
                name = node.id ? node.id.name : '(anonymous_' + id + ')',
                clone = function (attr) {
                    var obj = location[attr] || /* istanbul ignore next */ {};
                    return { line: obj.line, column: obj.column };
                };
            this.coverState.fnMap[id] = {
                name: name, line: line,
                loc: {
                    start: clone('start'),
                    end: clone('end')
                },
                skip: ignoring || undefined
            };
            this.coverState.f[id] = 0;
            return id;
        },

        coverFunction: function (node, walker) {
            var id,
                body = node.body,
                blockBody = body.body,
                popped;

            this.maybeSkipNode(node, 'next');

            id = this.functionName(node, walker.startLineForNode(node), {
                start: node.loc.start,
                end: { line: node.body.loc.start.line, column: node.body.loc.start.column }
            });

            if (blockBody.length > 0 && this.isUseStrictExpression(blockBody[0])) {
                popped = blockBody.shift();
            }
            blockBody.unshift(
                astgen.statement(
                    astgen.postIncrement(
                        astgen.subscript(
                            astgen.dot(astgen.variable(this.currentState.trackerVar), astgen.variable('f')),
                            astgen.stringLiteral(id)
                        )
                    )
                )
            );
            if (popped) {
                blockBody.unshift(popped);
            }
        },

        branchName: function (type, startLine, pathLocations) {
            var bName,
                paths = [],
                locations = [],
                i,
                ignoring = !!this.currentState.ignoring;
            this.currentState.branch += 1;
            bName = this.currentState.branch;
            for (i = 0; i < pathLocations.length; i += 1) {
                pathLocations[i].skip = pathLocations[i].skip || ignoring || undefined;
                locations.push(pathLocations[i]);
                paths.push(0);
            }
            this.coverState.b[bName] = paths;
            this.coverState.branchMap[bName] = { line: startLine, type: type, locations: locations };
            return bName;
        },

        branchIncrementExprAst: function (varName, branchIndex, down) {
            var ret = astgen.postIncrement(
                astgen.subscript(
                    astgen.subscript(
                        astgen.dot(astgen.variable(this.currentState.trackerVar), astgen.variable('b')),
                        astgen.stringLiteral(varName)
                    ),
                    astgen.numericLiteral(branchIndex)
                ),
                down
            );
            return ret;
        },

        locationsForNodes: function (nodes) {
            var ret = [],
                i;
            for (i = 0; i < nodes.length; i += 1) {
                ret.push(nodes[i].loc);
            }
            return ret;
        },

        ifBranchInjector: function (node, walker) {
            var alreadyIgnoring = !!this.currentState.ignoring,
                hint = this.currentState.currentHint,
                ignoreThen = !alreadyIgnoring && hint && hint.type === 'if',
                ignoreElse = !alreadyIgnoring && hint && hint.type === 'else',
                line = node.loc.start.line,
                col = node.loc.start.column,
                makeLoc = function () { return  { line: line, column: col }; },
                bName = this.branchName('if', walker.startLineForNode(node), [
                    { start: makeLoc(), end: makeLoc(), skip: ignoreThen || undefined },
                    { start: makeLoc(), end: makeLoc(), skip: ignoreElse || undefined }
                ]),
                thenBody = node.consequent.body,
                elseBody = node.alternate.body,
                child;
            thenBody.unshift(astgen.statement(this.branchIncrementExprAst(bName, 0)));
            elseBody.unshift(astgen.statement(this.branchIncrementExprAst(bName, 1)));
            if (ignoreThen) { child = node.consequent; child.preprocessor = this.startIgnore; child.postprocessor = this.endIgnore; }
            if (ignoreElse) { child = node.alternate; child.preprocessor = this.startIgnore; child.postprocessor = this.endIgnore; }
        },

        branchLocationFor: function (name, index) {
            return this.coverState.branchMap[name].locations[index];
        },

        switchBranchInjector: function (node, walker) {
            var cases = node.cases,
                bName,
                i;

            if (!(cases && cases.length > 0)) {
                return;
            }
            bName = this.branchName('switch', walker.startLineForNode(node), this.locationsForNodes(cases));
            for (i = 0; i < cases.length; i += 1) {
                cases[i].branchLocation = this.branchLocationFor(bName, i);
                cases[i].consequent.unshift(astgen.statement(this.branchIncrementExprAst(bName, i)));
            }
        },

        switchCaseInjector: function (node) {
            var location = node.branchLocation;
            delete node.branchLocation;
            if (this.maybeSkipNode(node, 'next')) {
                location.skip = true;
            }
        },

        conditionalBranchInjector: function (node, walker) {
            var bName = this.branchName('cond-expr', walker.startLineForNode(node), this.locationsForNodes([ node.consequent, node.alternate ])),
                ast1 = this.branchIncrementExprAst(bName, 0),
                ast2 = this.branchIncrementExprAst(bName, 1);

            node.consequent.preprocessor = this.maybeAddSkip(this.branchLocationFor(bName, 0));
            node.alternate.preprocessor = this.maybeAddSkip(this.branchLocationFor(bName, 1));
            node.consequent = astgen.sequence(ast1, node.consequent);
            node.alternate = astgen.sequence(ast2, node.alternate);
        },

        maybeAddSkip: function (branchLocation) {
            return function (node) {
                var alreadyIgnoring = !!this.currentState.ignoring,
                    hint = this.currentState.currentHint,
                    ignoreThis = !alreadyIgnoring && hint && hint.type === 'next';
                if (ignoreThis) {
                    this.startIgnore();
                    node.postprocessor = this.endIgnore;
                }
                if (ignoreThis || alreadyIgnoring) {
                    branchLocation.skip = true;
                }
            };
        },

        logicalExpressionBranchInjector: function (node, walker) {
            var parent = walker.parent(),
                leaves = [],
                bName,
                tuple,
                i;

            this.maybeSkipNode(node, 'next');

            if (parent && parent.node.type === SYNTAX.LogicalExpression.name) {
                //already covered
                return;
            }

            this.findLeaves(node, leaves);
            bName = this.branchName('binary-expr',
                walker.startLineForNode(node),
                this.locationsForNodes(leaves.map(function (item) { return item.node; }))
            );
            for (i = 0; i < leaves.length; i += 1) {
                tuple = leaves[i];
                tuple.parent[tuple.property] = astgen.sequence(this.branchIncrementExprAst(bName, i), tuple.node);
                tuple.node.preprocessor = this.maybeAddSkip(this.branchLocationFor(bName, i));
            }
        },

        findLeaves: function (node, accumulator, parent, property) {
            if (node.type === SYNTAX.LogicalExpression.name) {
                this.findLeaves(node.left, accumulator, node, 'left');
                this.findLeaves(node.right, accumulator, node, 'right');
            } else {
                accumulator.push({ node: node, parent: parent, property: property });
            }
        },
        maybeAddType: function (node /*, walker */) {
            var props = node.properties,
                i,
                child;
            for (i = 0; i < props.length; i += 1) {
                child = props[i];
                if (!child.type) {
                    child.type = SYNTAX.Property.name;
                }
            }
        },
    };

    if (isNode) {
        module.exports = Instrumenter;
    } else {
        window.Instrumenter = Instrumenter;
    }
}(typeof module !== 'undefined' && typeof module.exports !== 'undefined' && typeof exports !== 'undefined'));
}());



/*
file https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/object-utils.js
*/
/* istanbul ignore next */
(function () { var module, window; module = undefined; window = local;
/*
 Copyright (c) 2012, Yahoo! Inc.  All rights reserved.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

/**
 * utility methods to process coverage objects. A coverage object has the following
 * format.
 *
 *      {
 *          "/path/to/file1.js": { file1 coverage },
 *          "/path/to/file2.js": { file2 coverage }
 *      }
 *
 *  The internals of the file coverage object are intentionally not documented since
 *  it is not a public interface.
 *
 *  *Note:* When a method of this module has the word `File` in it, it will accept
 *  one of the sub-objects of the main coverage object as an argument. Other
 *  methods accept the higher level coverage object with multiple keys.
 *
 * Works on `node` as well as the browser.
 *
 * Usage on nodejs
 * ---------------
 *
 *      var objectUtils = require('istanbul').utils;
 *
 * Usage in a browser
 * ------------------
 *
 * Load this file using a `script` tag or other means. This will set `window.coverageUtils`
 * to this module's exports.
 *
 * @class ObjectUtils
 * @static
 */
(function (isNode) {
    /**
     * adds line coverage information to a file coverage object, reverse-engineering
     * it from statement coverage. The object passed in is updated in place.
     *
     * Note that if line coverage information is already present in the object,
     * it is not recomputed.
     *
     * @method addDerivedInfoForFile
     * @static
     * @param {Object} fileCoverage the coverage object for a single file
     */
    function addDerivedInfoForFile(fileCoverage) {
        var statementMap = fileCoverage.statementMap,
            statements = fileCoverage.s,
            lineMap;

        if (!fileCoverage.l) {
            fileCoverage.l = lineMap = {};
            Object.keys(statements).forEach(function (st) {
                var line = statementMap[st].start.line,
                    count = statements[st],
                    prevVal = lineMap[line];
                if (count === 0 && statementMap[st].skip) { count = 1; }
                if (typeof prevVal === 'undefined' || prevVal < count) {
                    lineMap[line] = count;
                }
            });
        }
    }
    /**
     * adds line coverage information to all file coverage objects.
     *
     * @method addDerivedInfo
     * @static
     * @param {Object} coverage the coverage object
     */
    function addDerivedInfo(coverage) {
        Object.keys(coverage).forEach(function (k) {
            addDerivedInfoForFile(coverage[k]);
        });
    }
    /**
     * removes line coverage information from all file coverage objects
     * @method removeDerivedInfo
     * @static
     * @param {Object} coverage the coverage object
     */
    function removeDerivedInfo(coverage) {
        Object.keys(coverage).forEach(function (k) {
            delete coverage[k].l;
        });
    }

    function percent(covered, total) {
        var tmp;
        if (total > 0) {
            tmp = 1000 * 100 * covered / total + 5;
            return Math.floor(tmp / 10) / 100;
        } else {
            return 100.00;
        }
    }

    function computeSimpleTotals(fileCoverage, property, mapProperty) {
        var stats = fileCoverage[property],
            map = mapProperty ? fileCoverage[mapProperty] : null,
            ret = { total: 0, covered: 0, skipped: 0 };

        Object.keys(stats).forEach(function (key) {
            var covered = !!stats[key],
                skipped = map && map[key].skip;
            ret.total += 1;
            if (covered || skipped) {
                ret.covered += 1;
            }
            if (!covered && skipped) {
                ret.skipped += 1;
            }
        });
        ret.pct = percent(ret.covered, ret.total);
        return ret;
    }

    function computeBranchTotals(fileCoverage) {
        var stats = fileCoverage.b,
            branchMap = fileCoverage.branchMap,
            ret = { total: 0, covered: 0, skipped: 0 };

        Object.keys(stats).forEach(function (key) {
            var branches = stats[key],
                map = branchMap[key],
                covered,
                skipped,
                i;
            for (i = 0; i < branches.length; i += 1) {
                covered = branches[i] > 0;
                skipped = map.locations && map.locations[i] && map.locations[i].skip;
                if (covered || skipped) {
                    ret.covered += 1;
                }
                if (!covered && skipped) {
                    ret.skipped += 1;
                }
            }
            ret.total += branches.length;
        });
        ret.pct = percent(ret.covered, ret.total);
        return ret;
    }
    /**
     * returns a blank summary metrics object. A metrics object has the following
     * format.
     *
     *      {
     *          lines: lineMetrics,
     *          statements: statementMetrics,
     *          functions: functionMetrics,
     *          branches: branchMetrics
     *      }
     *
     *  Each individual metric object looks as follows:
     *
     *      {
     *          total: n,
     *          covered: m,
     *          pct: percent
     *      }
     *
     * @method blankSummary
     * @static
     * @return {Object} a blank metrics object
     */
    function blankSummary() {
        return {
            lines: {
                total: 0,
                covered: 0,
                skipped: 0,
                pct: 'Unknown'
            },
            statements: {
                total: 0,
                covered: 0,
                skipped: 0,
                pct: 'Unknown'
            },
            functions: {
                total: 0,
                covered: 0,
                skipped: 0,
                pct: 'Unknown'
            },
            branches: {
                total: 0,
                covered: 0,
                skipped: 0,
                pct: 'Unknown'
            }
        };
    }
    /**
     * returns the summary metrics given the coverage object for a single file. See `blankSummary()`
     * to understand the format of the returned object.
     *
     * @method summarizeFileCoverage
     * @static
     * @param {Object} fileCoverage the coverage object for a single file.
     * @return {Object} the summary metrics for the file
     */
    function summarizeFileCoverage(fileCoverage) {
        var ret = blankSummary();
        addDerivedInfoForFile(fileCoverage);
        ret.lines = computeSimpleTotals(fileCoverage, 'l');
        ret.functions = computeSimpleTotals(fileCoverage, 'f', 'fnMap');
        ret.statements = computeSimpleTotals(fileCoverage, 's', 'statementMap');
        ret.branches = computeBranchTotals(fileCoverage);
        return ret;
    }
    /**
     * merges two instances of file coverage objects *for the same file*
     * such that the execution counts are correct.
     *
     * @method mergeFileCoverage
     * @static
     * @param {Object} first the first file coverage object for a given file
     * @param {Object} second the second file coverage object for the same file
     * @return {Object} an object that is a result of merging the two. Note that
     *      the input objects are not changed in any way.
     */
    function mergeFileCoverage(first, second) {
        var ret = JSON.parse(JSON.stringify(first)),
            i;

        delete ret.l; //remove derived info

        Object.keys(second.s).forEach(function (k) {
            ret.s[k] += second.s[k];
        });
        Object.keys(second.f).forEach(function (k) {
            ret.f[k] += second.f[k];
        });
        Object.keys(second.b).forEach(function (k) {
            var retArray = ret.b[k],
                secondArray = second.b[k];
            for (i = 0; i < retArray.length; i += 1) {
                retArray[i] += secondArray[i];
            }
        });

        return ret;
    }
    /**
     * merges multiple summary metrics objects by summing up the `totals` and
     * `covered` fields and recomputing the percentages. This function is generic
     * and can accept any number of arguments.
     *
     * @method mergeSummaryObjects
     * @static
     * @param {Object} summary... multiple summary metrics objects
     * @return {Object} the merged summary metrics
     */
    function mergeSummaryObjects() {
        var ret = blankSummary(),
            args = Array.prototype.slice.call(arguments),
            keys = ['lines', 'statements', 'branches', 'functions'],
            increment = function (obj) {
                if (obj) {
                    keys.forEach(function (key) {
                        ret[key].total += obj[key].total;
                        ret[key].covered += obj[key].covered;
                        ret[key].skipped += obj[key].skipped;
                    });
                }
            };
        args.forEach(function (arg) {
            increment(arg);
        });
        keys.forEach(function (key) {
            ret[key].pct = percent(ret[key].covered, ret[key].total);
        });

        return ret;
    }
    /**
     * returns the coverage summary for a single coverage object. This is
     * wrapper over `summarizeFileCoverage` and `mergeSummaryObjects` for
     * the common case of a single coverage object
     * @method summarizeCoverage
     * @static
     * @param {Object} coverage  the coverage object
     * @return {Object} summary coverage metrics across all files in the coverage object
     */
    function summarizeCoverage(coverage) {
        var fileSummary = [];
        Object.keys(coverage).forEach(function (key) {
            fileSummary.push(summarizeFileCoverage(coverage[key]));
        });
        return mergeSummaryObjects.apply(null, fileSummary);
    }

    /**
     * makes the coverage object generated by this library yuitest_coverage compatible.
     * Note that this transformation is lossy since the returned object will not have
     * statement and branch coverage.
     *
     * @method toYUICoverage
     * @static
     * @param {Object} coverage The `istanbul` coverage object
     * @return {Object} a coverage object in `yuitest_coverage` format.
     */
    function toYUICoverage(coverage) {
        var ret = {};

        addDerivedInfo(coverage);

        Object.keys(coverage).forEach(function (k) {
            var fileCoverage = coverage[k],
                lines = fileCoverage.l,
                functions = fileCoverage.f,
                fnMap = fileCoverage.fnMap,
                o;

            o = ret[k] = {
                lines: {},
                calledLines: 0,
                coveredLines: 0,
                functions: {},
                calledFunctions: 0,
                coveredFunctions: 0
            };
            Object.keys(lines).forEach(function (k) {
                o.lines[k] = lines[k];
                o.coveredLines += 1;
                if (lines[k] > 0) {
                    o.calledLines += 1;
                }
            });
            Object.keys(functions).forEach(function (k) {
                var name = fnMap[k].name + ':' + fnMap[k].line;
                o.functions[name] = functions[k];
                o.coveredFunctions += 1;
                if (functions[k] > 0) {
                    o.calledFunctions += 1;
                }
            });
        });
        return ret;
    }

    var exportables = {
        addDerivedInfo: addDerivedInfo,
        addDerivedInfoForFile: addDerivedInfoForFile,
        removeDerivedInfo: removeDerivedInfo,
        blankSummary: blankSummary,
        summarizeFileCoverage: summarizeFileCoverage,
        summarizeCoverage: summarizeCoverage,
        mergeFileCoverage: mergeFileCoverage,
        mergeSummaryObjects: mergeSummaryObjects,
        toYUICoverage: toYUICoverage
    };

    /* istanbul ignore else: windows */
    if (isNode) {
        module.exports = exportables;
    } else {
        window.coverageUtils = exportables;
    }
}(typeof module !== 'undefined' && typeof module.exports !== 'undefined' && typeof exports !== 'undefined'));
local["../object-utils"] = window.coverageUtils; }());



/*
file https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/report/common/defaults.js
*/
/* istanbul ignore next */
(function () { var module; module = {};
/*
 Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
module.exports = {
    watermarks: function () {
        return {
            statements: [ 50, 80 ],
            lines: [ 50, 80 ],
            functions: [ 50, 80],
            branches: [ 50, 80 ]
        };
    },

    classFor: function (type, metrics, watermarks) {
        var mark = watermarks[type],
            value = metrics[type].pct;
        return value >= mark[1] ? 'high' : value >= mark[0] ? 'medium' : 'low';
    },

    colorize: function (str, clazz) {
        /* istanbul ignore if: untestable in batch mode */
        if (process.stdout.isTTY) {
            switch (clazz) {
                // coverage-hack - Octal escape sequences are not allowed in strict mode.
                case 'low' : str = '\0x1b[91m' + str + '\0x1b[0m'; break;
                case 'medium': str = '\0x1b[93m' + str + '\0x1b[0m'; break;
                case 'high': str = '\0x1b[92m' + str + '\0x1b[0m'; break;
            }
        }
        return str;
    }
};
local["./common/defaults"] = module.exports; }());
/* jslint ignore:end */



/*
file https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/report/index.js
*/
local["./index"] = {
    call: local.nop,
    mix: function (klass, prototype) {
        klass.prototype = prototype;
    }
};



/*
file https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/report/templates/foot.txt
*/
/* jslint ignore:start */
local["foot.txt"] = '\
</div>\n\
<div class="footer">\n\
    <div class="meta">Generated by <a href="https://github.com/kaizhu256/node-utility2" target="_blank">utility2</a> at {{datetime}}</div>\n\
</div>\n\
</body>\n\
</html>\n\
';



/*
file https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/report/templates/head.txt
*/
local["head.txt"] = '\
<!doctype html>\n\
<html lang="en" class="x-istanbul">\n\
<head>\n\
    <title>Code coverage report for {{entity}}</title>\n\
    <meta charset="utf-8">\n\
<style>\n\
/* jslint utility2:true */\n\
/*csslint\n\
    box-model: false,\n\
    important: false,\n\
    qualified-headings: false,\n\
*/\n\
/* csslint ignore:start */\n\
*,\n\
*:after,\n\
*:before {\n\
    box-sizing: border-box;\n\
}\n\
/* csslint ignore:end */\n\
.x-istanbul {\n\
    font-family: Helvetica Neue, Helvetica,Arial;\n\
    font-size: 10pt;\n\
    margin: 0;\n\
    padding: 0;\n\
}\n\
.x-istanbul h1 {\n\
    font-size: large;\n\
}\n\
.x-istanbul pre {\n\
    font-family: Consolas, Menlo, Monaco, monospace;\n\
    font-size: 14px;\n\
    margin: 0;\n\
    padding: 0;\n\
    tab-size: 2;\n\
}\n\
.x-istanbul .cbranch-no {\n\
    background: yellow !important;\n\
    color: #111;\n\
}\n\
.x-istanbul .cbranch-skip {\n\
    background: #ddd !important;\n\
    color: #111;\n\
}\n\
.x-istanbul .com {\n\
    color: #999 !important;\n\
}\n\
.x-istanbul .cover-empty,\n\
.x-istanbul .cover-fill {\n\
    background: white;\n\
    border: 1px solid #444;\n\
    display: inline-block;\n\
    height: 12px;\n\
}\n\
.x-istanbul .cover-empty {\n\
    background: white;\n\
    border-left: none;\n\
}\n\
.x-istanbul .cover-fill {\n\
    background: #ccc;\n\
    border-right: 1px solid #444;\n\
}\n\
.x-istanbul .cover-full {\n\
    border-right: none !important;\n\
}\n\
.x-istanbul .coverage {\n\
    border-collapse: collapse;\n\
    margin: 0;\n\
    padding: 0\n\
}\n\
.x-istanbul .coverage td {\n\
    color: #111;\n\
    margin: 0;\n\
    padding: 0;\n\
    vertical-align: top;\n\
}\n\
.x-istanbul .coverage td .cline-any {\n\
    display: inline-block;\n\
    padding: 0 5px;\n\
    width: 60px;\n\
}\n\
.x-istanbul .coverage td .cline-neutral {\n\
    background: #eee;\n\
}\n\
.x-istanbul .coverage td .cline-no {\n\
    background: #fc8c84;\n\
}\n\
.x-istanbul .coverage td .cline-yes {\n\
    background: #b5d592;\n\
    color: #999;\n\
}\n\
.x-istanbul .coverage .line-count {\n\
    padding-right: 5px;\n\
    text-align: right;\n\
    width: 50px;\n\
}\n\
.x-istanbul .coverage .line-count a {\n\
    text-decoration: none;\n\
}\n\
.x-istanbul .coverage .line-coverage {\n\
    border-left: 1px solid #666;\n\
    border-right: 1px solid #666;\n\
    color: #777 !important;\n\
    text-align: right;\n\
}\n\
.x-istanbul .coverage-summary {\n\
    padding: 20px;\n\
}\n\
.x-istanbul .coverage-summary table {\n\
    border-collapse: collapse;\n\
    margin: auto;\n\
    table-layout: fixed;\n\
    text-align: left;\n\
    width: 100%\n\
}\n\
.x-istanbul .coverage-summary td {\n\
    border: 1px solid #666;\n\
    margin: 0;\n\
    padding: 5px;\n\
    white-space: nowrap;\n\
}\n\
.x-istanbul .coverage-summary th {\n\
    margin: 0;\n\
    padding: 0 0 2px 0;\n\
}\n\
.x-istanbul .cstat-no {\n\
    background: #fc8c84;\n\
    color: #111;\n\
}\n\
.x-istanbul .cstat-skip {\n\
    background: #ddd;\n\
    color: #111;\n\
}\n\
.x-istanbul .cstat-yes {\n\
    color: #111;\n\
}\n\
.x-istanbul .entity,\n\
.x-istanbul .metric {\n\
    font-weight: bold;\n\
}\n\
.x-istanbul .footer,\n\
.x-istanbul .header {\n\
    background: #eee;\n\
    padding: 20px;\n\
}\n\
.x-istanbul .footer {\n\
    border-top: 1px solid #666;\n\
}\n\
.x-istanbul .fstat-no {\n\
    background: #ffc520;\n\
    color: #111 !important;\n\
}\n\
.x-istanbul .fstat-skip {\n\
    background: #ddd;\n\
    color: #111 !important;\n\
}\n\
.x-istanbul .header {\n\
    border-bottom: 1px solid #666;\n\
    top: 0;\n\
    width: 100%;\n\
}\n\
.x-istanbul .high {\n\
    background: #b5d592 !important;\n\
}\n\
.x-istanbul .ignore-none {\n\
    color: #999;\n\
    font-weight: normal;\n\
}\n\
.x-istanbul .low {\n\
    background: #fc8c84 !important;\n\
}\n\
.x-istanbul .medium {\n\
    background: #ffe87c !important;\n\
}\n\
.x-istanbul .meta {\n\
    text-align: center;\n\
}\n\
.x-istanbul .metric {\n\
    background: white;\n\
    border: 1px solid #333;\n\
    display: inline-block;\n\
    padding: .3em;\n\
}\n\
.x-istanbul .missing-if-branch {\n\
    background: black;\n\
    color: yellow;\n\
    display: inline-block;\n\
    margin-right: 10px;\n\
    padding: 0 4px;\n\
    position: relative;\n\
}\n\
.x-istanbul .missing-if-branch .typ,\n\
.x-istanbul .skip-if-branch .typ {\n\
    color: inherit !important;\n\
}\n\
.x-istanbul .prettyprint {\n\
    border: none !important;\n\
    margin: 0 !important;\n\
    padding: 0 !important;\n\
}\n\
.x-istanbul .skip-if-branch {\n\
    background: #ccc;\n\
    color: white;\n\
    display: none;\n\
    margin-right: 10px;\n\
    padding: 0 4px;\n\
    position: relative;\n\
}\n\
/* validateLineSortedReset */\n\
.x-istanbul a {\n\
    color: #00d;\n\
    text-decoration: underline;\n\
}\n\
.x-istanbul pre {\n\
    overflow: visible;\n\
    white-space: pre\n\
}\n\
.x-istanbul .file div {\n\
    margin-bottom: 2px;\n\
    overflow-wrap: break-word;\n\
    white-space: normal;\n\
    width: 100%;\n\
}\n\
.x-istanbul .tableHeader {\n\
    border-collapse: collapse;\n\
    margin: 0 auto 10px auto;\n\
    table-layout: fixed;\n\
    text-align: left;\n\
    width: 100%;\n\
}\n\
.x-istanbul .tableHeader td {\n\
    background: #fff;\n\
    border: 1px solid #666;\n\
    padding: 5px;\n\
}\n\
.x-istanbul .tableHeader th {\n\
    padding: 0 0 2px 0;\n\
}\n\
</style>\n\
</head>\n\
<body class="x-istanbul">\n\
<script>\n\
// init domOnEventSelectAllWithinPre\n\
(function () {\n\
/*\n\
 * this function will limit select-all within <pre tabIndex="0"> elements\n\
 * https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse\n\
 */\n\
    "use strict";\n\
    if (window.domOnEventSelectAllWithinPre) {\n\
        return;\n\
    }\n\
    window.domOnEventSelectAllWithinPre = function (evt) {\n\
        var range;\n\
        var selection;\n\
        if (\n\
            evt\n\
            && evt.key === "a"\n\
            && (evt.ctrlKey || evt.metaKey)\n\
            && evt.target.closest(\n\
                "pre"\n\
            )\n\
        ) {\n\
            range = document.createRange();\n\
            range.selectNodeContents(evt.target.closest(\n\
                "pre"\n\
            ));\n\
            selection = window.getSelection();\n\
            selection.removeAllRanges();\n\
            selection.addRange(range);\n\
            evt.preventDefault();\n\
        }\n\
    };\n\
    // init event-handling\n\
    document.addEventListener(\n\
        "keydown",\n\
        window.domOnEventSelectAllWithinPre\n\
    );\n\
}());\n\
</script>\n\
<div class="header {{reportClass}}">\n\
    <h1 style="font-weight: bold;">\n\
        <a href="{{env.npm_package_homepage}}">{{env.npm_package_name}} ({{env.npm_package_version}})</a>\n\
    </h1>\n\
    <h1>Code coverage report for <span class="entity">{{entity}}</span></h1>\n\
    <table class="tableHeader">\n\
    <thead>\n\
    <tr>\n\
        <th>Ignored</th>\n\
        <th>Statements</th>\n\
        <th>Branches</th>\n\
        <th>Functions</th>\n\
        <th>Lines</th>\n\
    </tr>\n\
    </thead>\n\
    <tbody>\n\
        <td>{{#show_ignores metrics}}{{/show_ignores}}</td>\n\
        <td>{{#with metrics.statements}}{{pct}}%<br>({{covered}} / {{total}}){{/with}}</td>\n\
        <td>{{#with metrics.branches}}{{pct}}%<br>({{covered}} / {{total}}){{/with}}</td>\n\
        <td>{{#with metrics.functions}}{{pct}}%<br>({{covered}} / {{total}}){{/with}}</td>\n\
        <td>{{#with metrics.lines}}{{pct}}%<br>({{covered}} / {{total}}){{/with}}</td>\n\
    </tbody>\n\
    </table>\n\
    {{{pathHtml}}}\n\
</div>\n\
<div class="body">\n\
';
/* jslint ignore:end */



/*
file https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/util/file-writer.js
*/
local.writer = {
    write: function (data) {
        local.writerData += data;
    },
    writeFile: function (file, onError) {
        local.coverageReportHtml += local.writerData + "\n\n";
        if (!local.isBrowser && local.writerFile) {
            local.fsWriteFileWithMkdirpSync(local.writerFile, local.writerData);
        }
        local.writerData = "";
        local.writerFile = file;
        onError(local.writer);
    }
};



/*
file https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/util/tree-summarizer.js
*/
/* istanbul ignore next */
(function () {
    var module;
    module = {};
/* jslint ignore:start */
/*
 Copyright (c) 2012, Yahoo! Inc.  All rights reserved.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var path = require('path'),
    SEP = path.sep || '/',
    utils = require('../object-utils');

function commonArrayPrefix(first, second) {
    var len = first.length < second.length ? first.length : second.length,
        i,
        ret = [];
    for (i = 0; i < len; i += 1) {
        if (first[i] === second[i]) {
            ret.push(first[i]);
        } else {
            break;
        }
    }
    return ret;
}

function findCommonArrayPrefix(args) {
    if (args.length === 0) {
        return [];
    }

    var separated = args.map(function (arg) { return arg.split(SEP); }),
        ret = separated.pop();

    if (separated.length === 0) {
        return ret.slice(0, ret.length - 1);
    } else {
        return separated.reduce(commonArrayPrefix, ret);
    }
}

function Node(fullName, kind, metrics) {
    this.name = fullName;
    this.fullName = fullName;
    this.kind = kind;
    this.metrics = metrics || null;
    this.parent = null;
    this.children = [];
}

Node.prototype = {
    displayShortName: function () {
        return this.relativeName;
    },
    fullPath: function () {
        return this.fullName;
    },
    addChild: function (child) {
        this.children.push(child);
        child.parent = this;
    },
    toJSON: function () {
        return {
            name: this.name,
            relativeName: this.relativeName,
            fullName: this.fullName,
            kind: this.kind,
            metrics: this.metrics,
            parent: this.parent === null ? null : this.parent.name,
            children: this.children.map(function (node) { return node.toJSON(); })
        };
    }
};

function TreeSummary(summaryMap, commonPrefix) {
    this.prefix = commonPrefix;
    this.convertToTree(summaryMap, commonPrefix);
}

TreeSummary.prototype = {
    getNode: function (shortName) {
        return this.map[shortName];
    },
    convertToTree: function (summaryMap, arrayPrefix) {
        var nodes = [],
            rootPath = arrayPrefix.join(SEP) + SEP,
            root = new Node(rootPath, 'dir'),
            tmp,
            tmpChildren,
            seen = {},
            filesUnderRoot = false;

        seen[rootPath] = root;
        Object.keys(summaryMap).forEach(function (key) {
            var metrics = summaryMap[key],
                node,
                parentPath,
                parent;
            node = new Node(key, 'file', metrics);
            seen[key] = node;
            nodes.push(node);
            parentPath = path.dirname(key) + SEP;
            if (parentPath === SEP + SEP) {
                parentPath = SEP + '__root__' + SEP;
            }
            parent = seen[parentPath];
            if (!parent) {
                parent = new Node(parentPath, 'dir');
                root.addChild(parent);
                seen[parentPath] = parent;
            }
            parent.addChild(node);
            if (parent === root) { filesUnderRoot = true; }
        });

        if (filesUnderRoot && arrayPrefix.length > 0) {
            arrayPrefix.pop(); //start at one level above
            tmp = root;
            tmpChildren = tmp.children;
            tmp.children = [];
            root = new Node(arrayPrefix.join(SEP) + SEP, 'dir');
            root.addChild(tmp);
            tmpChildren.forEach(function (child) {
                if (child.kind === 'dir') {
                    root.addChild(child);
                } else {
                    tmp.addChild(child);
                }
            });
        }
        this.fixupNodes(root, arrayPrefix.join(SEP) + SEP);
        this.calculateMetrics(root);
        this.root = root;
        this.map = {};
        this.indexAndSortTree(root, this.map);
    },

    fixupNodes: function (node, prefix, parent) {
        var that = this;
        if (node.name.indexOf(prefix) === 0) {
            node.name = node.name.substring(prefix.length);
        }
        if (node.name.charAt(0) === SEP) {
            node.name = node.name.substring(1);
        }
        if (parent) {
            if (parent.name !== '__root__/') {
                node.relativeName = node.name.substring(parent.name.length);
            } else {
                node.relativeName = node.name;
            }
        } else {
            node.relativeName = node.name.substring(prefix.length);
        }
        node.children.forEach(function (child) {
            that.fixupNodes(child, prefix, node);
        });
    },
    calculateMetrics: function (entry) {
        var that = this,
            fileChildren;
        if (entry.kind !== 'dir') {return; }
        entry.children.forEach(function (child) {
            that.calculateMetrics(child);
        });
        entry.metrics = utils.mergeSummaryObjects.apply(
            null,
            entry.children.map(function (child) { return child.metrics; })
        );
        // calclulate "java-style" package metrics where there is no hierarchy
        // across packages
        fileChildren = entry.children.filter(function (n) { return n.kind !== 'dir'; });
        if (fileChildren.length > 0) {
            entry.packageMetrics = utils.mergeSummaryObjects.apply(
                null,
                fileChildren.map(function (child) { return child.metrics; })
            );
        } else {
            entry.packageMetrics = null;
        }
    },
    indexAndSortTree: function (node, map) {
        var that = this;
        map[node.name] = node;
        node.children.sort(function (a, b) {
            a = a.relativeName;
            b = b.relativeName;
            return a < b ? -1 : a > b ? 1 : 0;
        });
        node.children.forEach(function (child) {
            that.indexAndSortTree(child, map);
        });
    },
    toJSON: function () {
        return {
            prefix: this.prefix,
            root: this.root.toJSON()
        };
    }
};

function TreeSummarizer() {
    this.summaryMap = {};
}

TreeSummarizer.prototype = {
    addFileCoverageSummary: function (filePath, metrics) {
        this.summaryMap[filePath] = metrics;
    },
    getTreeSummary: function () {
        var commonArrayPrefix = findCommonArrayPrefix(Object.keys(this.summaryMap));
        return new TreeSummary(this.summaryMap, commonArrayPrefix);
    }
};

module.exports = TreeSummarizer;
/* jslint ignore:end */
    local["../util/tree-summarizer"] = module.exports;
    module.exports.prototype._getTreeSummary = (
        module.exports.prototype.getTreeSummary
    );
    module.exports.prototype.getTreeSummary = function () {
        local.coverageReportSummary = this._getTreeSummary();
        return local.coverageReportSummary;
    };
}());



/*
file https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/report/html.js
*/
/* istanbul ignore next */
/* jslint ignore:start */
(function () { var module; module = {};
/*
 Copyright (c) 2012, Yahoo! Inc.  All rights reserved.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

/*jshint maxlen: 300 */
var handlebars = require('handlebars'),
    defaults = require('./common/defaults'),
    path = require('path'),
    SEP = path.sep || '/',
    fs = require('fs'),
    util = require('util'),
    FileWriter = require('../util/file-writer'),
    Report = require('./index'),
    Store = require('../store'),
    InsertionText = require('../util/insertion-text'),
    TreeSummarizer = require('../util/tree-summarizer'),
    utils = require('../object-utils'),
    templateFor = function (name) { return handlebars.compile(fs.readFileSync(path.resolve(__dirname, 'templates', name + '.txt'), 'utf8')); },
    headerTemplate = templateFor('head'),
    footerTemplate = templateFor('foot'),
    pathTemplate = handlebars.compile('<div class="path">{{{html}}}</div>'),
    detailTemplate = handlebars.compile([
        '<tr>',
        '<td class="line-count">{{#show_lines}}{{maxLines}}{{/show_lines}}</td>',
        '<td class="line-coverage">{{#show_line_execution_counts fileCoverage}}{{maxLines}}{{/show_line_execution_counts}}</td>',
        // coverage-hack - domOnEventSelectAllWithinPre
        '<td class="text"><pre class="prettyprint lang-js" tabIndex="0">{{#show_code structured}}{{/show_code}}</pre></td>',
        '</tr>\n'
    ].join('')),
    summaryTableHeader = [
        '<div class="coverage-summary">',
        '<table>',
        '<thead>',
        '<tr>',
        // coverage-hack - compact summary
        '   <th data-col="file" data-fmt="html" data-html="true" class="file">File</th>',
        '   <th data-col="statements" data-type="number" data-fmt="pct" class="pct">Statements</th>',
        '   <th data-col="branches" data-type="number" data-fmt="pct" class="pct">Branches</th>',
        '   <th data-col="functions" data-type="number" data-fmt="pct" class="pct">Functions</th>',
        '   <th data-col="lines" data-type="number" data-fmt="pct" class="pct">Lines</th>',
        '</tr>',
        '</thead>',
        '<tbody>'
    ].join('\n'),
    summaryLineTemplate = handlebars.compile([
        '<tr>',
        // coverage-hack - compact summary
        '<td class="file {{reportClasses.statements}}" data-value="{{file}}"><a href="{{output}}"><div>{{file}}</div>{{#show_picture}}{{metrics.statements.pct}}{{/show_picture}}</a></td>',
        '<td data-value="{{metrics.statements.pct}}" class="pct {{reportClasses.statements}}">{{metrics.statements.pct}}%<br>({{metrics.statements.covered}} / {{metrics.statements.total}})</td>',
        '<td data-value="{{metrics.branches.pct}}" class="pct {{reportClasses.branches}}">{{metrics.branches.pct}}%<br>({{metrics.branches.covered}} / {{metrics.branches.total}})</td>',
        '<td data-value="{{metrics.functions.pct}}" class="pct {{reportClasses.functions}}">{{metrics.functions.pct}}%<br>({{metrics.functions.covered}} / {{metrics.functions.total}})</td>',
        '<td data-value="{{metrics.lines.pct}}" class="pct {{reportClasses.lines}}">{{metrics.lines.pct}}%<br>({{metrics.lines.covered}} / {{metrics.lines.total}})</td>',
        '</tr>\n'
    ].join('\n\t')),
    summaryTableFooter = [
        '</tbody>',
        '</table>',
        '</div>'
    ].join('\n'),
    lt = '\u0001',
    gt = '\u0002',
    RE_LT = /</g,
    RE_GT = />/g,
    RE_AMP = /&/g,
    RE_lt = /\u0001/g,
    RE_gt = /\u0002/g;

handlebars.registerHelper('show_picture', function (opts) {
    var num = Number(opts.fn(this)),
        rest,
        cls = '';
    if (isFinite(num)) {
        if (num === 100) {
            cls = ' cover-full';
        }
        num = Math.floor(num);
        rest = 100 - num;
        return '<span class="cover-fill' + cls + '" style="width: ' + num + 'px;"></span>' +
            '<span class="cover-empty" style="width:' + rest + 'px;"></span>';
    } else {
        return '';
    }
});

handlebars.registerHelper('show_ignores', function (metrics) {
    var statements = metrics.statements.skipped,
        functions = metrics.functions.skipped,
        branches = metrics.branches.skipped,
        result;

    if (statements === 0 && functions === 0 && branches === 0) {
        return '<span class="ignore-none">none</span>';
    }

    result = [];
    // coverage-hack - compact summary
    if (statements >0) { result.push('statements: ' + statements); }
    if (branches >0) { result.push('branches: ' + branches); }
    if (functions >0) { result.push('functions: ' + functions); }

    return result.join('<br>');
});

// coverage-hack - hashtag lineno
handlebars.registerHelper('show_lines', function (opts) {
    var maxLines = Number(opts.fn(this)),
        i,
        array = "";

    for (i = 1; i <= maxLines; i += 1) {
        array += '<a href="#L' + i + '" id="L' + i + '">' + i + '</a>\n';
    }
    return array;
});

handlebars.registerHelper('show_line_execution_counts', function (context, opts) {
    var lines = context.l,
        maxLines = Number(opts.fn(this)),
        i,
        lineNumber,
        array = [],
        covered,
        value = '';

    for (i = 0; i < maxLines; i += 1) {
        lineNumber = i + 1;
        value = '&nbsp;';
        covered = 'neutral';
        if (lines.hasOwnProperty(lineNumber)) {
            if (lines[lineNumber] > 0) {
                covered = 'yes';
                value = lines[lineNumber];
            } else {
                covered = 'no';
            }
        }
        array.push('<span class="cline-any cline-' + covered + '">' + value + '</span>');
    }
    return array.join('\n');
});

function customEscape(text) {
    text = text.toString();
    return text.replace(RE_AMP, '&amp;')
        .replace(RE_LT, '&lt;')
        .replace(RE_GT, '&gt;')
        .replace(RE_lt, '<')
        .replace(RE_gt, '>');
}

handlebars.registerHelper('show_code', function (context /*, opts */) {
    var array = [];

    context.forEach(function (item) {
        array.push(customEscape(item.text) || '&nbsp;');
    });
    return array.join('\n');
});

function title(str) {
    return ' title="' + str + '" ';
}

function annotateLines(fileCoverage, structuredText) {
    var lineStats = fileCoverage.l;
    if (!lineStats) { return; }
    Object.keys(lineStats).forEach(function (lineNumber) {
        var count = lineStats[lineNumber];
        structuredText[lineNumber].covered = count > 0 ? 'yes' : 'no';
    });
    structuredText.forEach(function (item) {
        if (item.covered === null) {
            item.covered = 'neutral';
        }
    });
}

function annotateStatements(fileCoverage, structuredText) {
    var statementStats = fileCoverage.s,
        statementMeta = fileCoverage.statementMap;
    Object.keys(statementStats).forEach(function (stName) {
        var count = statementStats[stName],
            meta = statementMeta[stName],
            type = count > 0 ? 'yes' : 'no',
            startCol = meta.start.column,
            endCol = meta.end.column + 1,
            startLine = meta.start.line,
            endLine = meta.end.line,
            openSpan = lt + 'span class="' + (meta.skip ? 'cstat-skip' : 'cstat-no') + '"' + title('statement not covered') + gt,
            closeSpan = lt + '/span' + gt,
            text;

        if (type === 'no') {
            if (endLine !== startLine) {
                endLine = startLine;
                endCol = structuredText[startLine].text.originalLength();
            }
            text = structuredText[startLine].text;
            text.wrap(startCol,
                openSpan,
                startLine === endLine ? endCol : text.originalLength(),
                closeSpan);
        }
    });
}

function annotateFunctions(fileCoverage, structuredText) {

    var fnStats = fileCoverage.f,
        fnMeta = fileCoverage.fnMap;
    if (!fnStats) { return; }
    Object.keys(fnStats).forEach(function (fName) {
        var count = fnStats[fName],
            meta = fnMeta[fName],
            type = count > 0 ? 'yes' : 'no',
            startCol = meta.loc.start.column,
            endCol = meta.loc.end.column + 1,
            startLine = meta.loc.start.line,
            endLine = meta.loc.end.line,
            openSpan = lt + 'span class="' + (meta.skip ? 'fstat-skip' : 'fstat-no') + '"' + title('function not covered') + gt,
            closeSpan = lt + '/span' + gt,
            text;

        if (type === 'no') {
            if (endLine !== startLine) {
                endLine = startLine;
                endCol = structuredText[startLine].text.originalLength();
            }
            text = structuredText[startLine].text;
            text.wrap(startCol,
                openSpan,
                startLine === endLine ? endCol : text.originalLength(),
                closeSpan);
        }
    });
}

function annotateBranches(fileCoverage, structuredText) {
    var branchStats = fileCoverage.b,
        branchMeta = fileCoverage.branchMap;
    if (!branchStats) { return; }

    Object.keys(branchStats).forEach(function (branchName) {
        var branchArray = branchStats[branchName],
            sumCount = branchArray.reduce(function (p, n) { return p + n; }, 0),
            metaArray = branchMeta[branchName].locations,
            i,
            count,
            meta,
            type,
            startCol,
            endCol,
            startLine,
            endLine,
            openSpan,
            closeSpan,
            text;

        if (sumCount > 0) { //only highlight if partial branches are missing
            for (i = 0; i < branchArray.length; i += 1) {
                count = branchArray[i];
                meta = metaArray[i];
                type = count > 0 ? 'yes' : 'no';
                startCol = meta.start.column;
                endCol = meta.end.column + 1;
                startLine = meta.start.line;
                endLine = meta.end.line;
                openSpan = lt + 'span class="branch-' + i + ' ' + (meta.skip ? 'cbranch-skip' : 'cbranch-no') + '"' + title('branch not covered') + gt;
                closeSpan = lt + '/span' + gt;

                if (count === 0) { //skip branches taken
                    if (endLine !== startLine) {
                        endLine = startLine;
                        endCol = structuredText[startLine].text.originalLength();
                    }
                    text = structuredText[startLine].text;
                    if (branchMeta[branchName].type === 'if') { // and 'if' is a special case since the else branch might not be visible, being non-existent
                        text.insertAt(startCol, lt + 'span class="' + (meta.skip ? 'skip-if-branch' : 'missing-if-branch') + '"' +
                            title((i === 0 ? 'if' : 'else') + ' path not taken') + gt +
                            (i === 0 ? 'I' : 'E')  + lt + '/span' + gt, true, false);
                    } else {
                        text.wrap(startCol,
                            openSpan,
                            startLine === endLine ? endCol : text.originalLength(),
                            closeSpan);
                    }
                }
            }
        }
    });
}

function getReportClass(stats, watermark) {
    var coveragePct = stats.pct,
        identity  = 1;
    if (coveragePct * identity === coveragePct) {
        return coveragePct >= watermark[1] ? 'high' : coveragePct >= watermark[0] ? 'medium' : 'low';
    } else {
        return '';
    }
}

/**
 * a `Report` implementation that produces HTML coverage reports.
 *
 * Usage
 * -----
 *
 *      var report = require('istanbul').Report.create('html');
 *
 *
 * @class HtmlReport
 * @extends Report
 * @constructor
 * @param {Object} opts optional
 * @param {String} [opts.dir] the directory in which to generate reports. Defaults to `./html-report`
 */
function HtmlReport(opts) {
    Report.call(this);
    this.opts = opts || {};
    this.opts.dir = this.opts.dir || path.resolve(process.cwd(), 'html-report');
    this.opts.sourceStore = this.opts.sourceStore || Store.create('fslookup');
    this.opts.linkMapper = this.opts.linkMapper || this.standardLinkMapper();
    this.opts.writer = this.opts.writer || null;
    // coverage-hack - new Date() bugfix
    this.opts.templateData = { datetime: new Date().toGMTString() };
    this.opts.watermarks = this.opts.watermarks || defaults.watermarks();
}

HtmlReport.TYPE = 'html';
util.inherits(HtmlReport, Report);

Report.mix(HtmlReport, {

    getPathHtml: function (node, linkMapper) {
        var parent = node.parent,
            nodePath = [],
            linkPath = [],
            i;

        while (parent) {
            nodePath.push(parent);
            parent = parent.parent;
        }

        for (i = 0; i < nodePath.length; i += 1) {
            linkPath.push('<a href="' + linkMapper.ancestor(node, i + 1) + '">' +
                (nodePath[i].relativeName || 'All files') + '</a>');
        }
        linkPath.reverse();
        return linkPath.length > 0 ? linkPath.join(' &#187; ') + ' &#187; ' +
            node.displayShortName() : '';
    },

    fillTemplate: function (node, templateData) {
        var opts = this.opts,
            linkMapper = opts.linkMapper;

        templateData.entity = node.name || 'All files';
        templateData.metrics = node.metrics;
        templateData.reportClass = getReportClass(node.metrics.statements, opts.watermarks.statements);
        templateData.pathHtml = pathTemplate({ html: this.getPathHtml(node, linkMapper) });
        templateData.prettify = {
            js: linkMapper.asset(node, 'prettify.js'),
            css: linkMapper.asset(node, 'prettify.css')
        };
    },
    writeDetailPage: function (writer, node, fileCoverage) {
        var opts = this.opts,
            sourceStore = opts.sourceStore,
            templateData = opts.templateData,
            sourceText = fileCoverage.code && Array.isArray(fileCoverage.code) ?
                fileCoverage.code.join('\n') + '\n' : sourceStore.get(fileCoverage.path),
            code = sourceText.split(/(?:\r?\n)|\r/),
            count = 0,
            structured = code.map(function (str) { count += 1; return { line: count, covered: null, text: new InsertionText(str, true) }; }),
            context;

        structured.unshift({ line: 0, covered: null, text: new InsertionText("") });

        this.fillTemplate(node, templateData);
        writer.write(headerTemplate(templateData));
        writer.write('<pre><table class="coverage">\n');

        annotateLines(fileCoverage, structured);
        //note: order is important, since statements typically result in spanning the whole line and doing branches late
        //causes mismatched tags
        annotateBranches(fileCoverage, structured);
        annotateFunctions(fileCoverage, structured);
        annotateStatements(fileCoverage, structured);

        structured.shift();
        context = {
            structured: structured,
            maxLines: structured.length,
            fileCoverage: fileCoverage
        };
        writer.write(detailTemplate(context));
        writer.write('</table></pre>\n');
        writer.write(footerTemplate(templateData));
    },

    writeIndexPage: function (writer, node) {
        var linkMapper = this.opts.linkMapper,
            templateData = this.opts.templateData,
            children = Array.prototype.slice.apply(node.children),
            watermarks = this.opts.watermarks;

        children.sort(function (a, b) {
            return a.name < b.name ? -1 : 1;
        });

        this.fillTemplate(node, templateData);
        writer.write(headerTemplate(templateData));
        writer.write(summaryTableHeader);
        children.forEach(function (child) {
            var metrics = child.metrics,
                reportClasses = {
                    statements: getReportClass(metrics.statements, watermarks.statements),
                    lines: getReportClass(metrics.lines, watermarks.lines),
                    functions: getReportClass(metrics.functions, watermarks.functions),
                    branches: getReportClass(metrics.branches, watermarks.branches)
                },
                data = {
                    metrics: metrics,
                    reportClasses: reportClasses,
                    file: child.displayShortName(),
                    output: linkMapper.fromParent(child)
                };
            writer.write(summaryLineTemplate(data) + '\n');
        });
        writer.write(summaryTableFooter);
        writer.write(footerTemplate(templateData));
    },

    writeFiles: function (writer, node, dir, collector) {
        var that = this,
            indexFile = path.resolve(dir, 'index.html'),
            childFile;
        if (this.opts.verbose) { console.error('Writing ' + indexFile); }
        writer.writeFile(indexFile, function (contentWriter) {
            that.writeIndexPage(contentWriter, node);
        });
        node.children.forEach(function (child) {
            if (child.kind === 'dir') {
                that.writeFiles(writer, child, path.resolve(dir, child.relativeName), collector);
            } else {
                childFile = path.resolve(dir, child.relativeName + '.html');
                if (that.opts.verbose) { console.error('Writing ' + childFile); }
                writer.writeFile(childFile, function (contentWriter) {
                    that.writeDetailPage(contentWriter, child, collector.fileCoverageFor(child.fullPath()));
                });
            }
        });
    },

    standardLinkMapper: function () {
        return {
            fromParent: function (node) {
                var i = 0,
                    relativeName = node.relativeName,
                    ch;
                if (SEP !== '/') {
                    relativeName = '';
                    for (i = 0; i < node.relativeName.length; i += 1) {
                        ch = node.relativeName.charAt(i);
                        if (ch === SEP) {
                            relativeName += '/';
                        } else {
                            relativeName += ch;
                        }
                    }
                }
                return node.kind === 'dir' ? relativeName + 'index.html' : relativeName + '.html';
            },
            ancestorHref: function (node, num) {
                var href = '',
                    separated,
                    levels,
                    i,
                    j;
                for (i = 0; i < num; i += 1) {
                    separated = node.relativeName.split(SEP);
                    levels = separated.length - 1;
                    for (j = 0; j < levels; j += 1) {
                        href += '../';
                    }
                    node = node.parent;
                }
                return href;
            },
            ancestor: function (node, num) {
                return this.ancestorHref(node, num) + 'index.html';
            },
            asset: function (node, name) {
                var i = 0,
                    parent = node.parent;
                while (parent) { i += 1; parent = parent.parent; }
                return this.ancestorHref(node, i) + name;
            }
        };
    },

    writeReport: function (collector, sync) {
        var opts = this.opts,
            dir = opts.dir,
            summarizer = new TreeSummarizer(),
            writer = opts.writer || new FileWriter(sync),
            tree;

        collector.files().forEach(function (key) {
            summarizer.addFileCoverageSummary(key, utils.summarizeFileCoverage(collector.fileCoverageFor(key)));
        });
        tree = summarizer.getTreeSummary();
        fs.readdirSync(path.resolve(__dirname, '..', 'vendor')).forEach(function (f) {
            var resolvedSource = path.resolve(__dirname, '..', 'vendor', f),
                resolvedDestination = path.resolve(dir, f),
                stat = fs.statSync(resolvedSource);

            if (stat.isFile()) {
                if (opts.verbose) {
                    console.log('Write asset: ' + resolvedDestination);
                }
                writer.copyFile(resolvedSource, resolvedDestination);
            }
        });
        //console.log(JSON.stringify(tree.root, undefined, 4));
        this.writeFiles(writer, tree.root, dir, collector);
    }
});

module.exports = HtmlReport;
local.HtmlReport = module.exports; }());



/*
file https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/report/text.js
*/
/* istanbul ignore next */
(function () { var module; module = {};
/*
 Copyright (c) 2012, Yahoo! Inc.  All rights reserved.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var path = require('path'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    defaults = require('./common/defaults'),
    Report = require('./index'),
    TreeSummarizer = require('../util/tree-summarizer'),
    utils = require('../object-utils'),
    PCT_COLS = 10,
    TAB_SIZE = 3,
    DELIM = ' |',
    COL_DELIM = '-|';

/**
 * a `Report` implementation that produces text output in a detailed table.
 *
 * Usage
 * -----
 *
 *      var report = require('istanbul').Report.create('text');
 *
 * @class TextReport
 * @extends Report
 * @constructor
 * @param {Object} opts optional
 * @param {String} [opts.dir] the directory in which to the text coverage report will be written, when writing to a file
 * @param {String} [opts.file] the filename for the report. When omitted, the report is written to console
 * @param {Number} [opts.maxcols] the max column width of the report. By default, the width of the report is adjusted based on the length of the paths
 *              to be reported.
 */
function TextReport(opts) {
    Report.call(this);
    opts = opts || {};
    this.dir = opts.dir || process.cwd();
    this.file = opts.file;
    this.summary = opts.summary;
    this.maxCols = opts.maxCols || 0;
    this.watermarks = opts.watermarks || defaults.watermarks();
}

TextReport.TYPE = 'text';

function padding(num, ch) {
    var str = '',
        i;
    ch = ch || ' ';
    for (i = 0; i < num; i += 1) {
        str += ch;
    }
    return str;
}

function fill(str, width, right, tabs, clazz) {
    tabs = tabs || 0;
    str = String(str);

    var leadingSpaces = tabs * TAB_SIZE,
        remaining = width - leadingSpaces,
        leader = padding(leadingSpaces),
        fmtStr = '',
        fillStr,
        strlen = str.length;

    if (remaining > 0) {
        if (remaining >= strlen) {
            fillStr = padding(remaining - strlen);
            fmtStr = right ? fillStr + str : str + fillStr;
        } else {
            fmtStr = str.substring(strlen - remaining);
            fmtStr = '... ' + fmtStr.substring(4);
        }
    }

    fmtStr = defaults.colorize(fmtStr, clazz);
    return leader + fmtStr;
}

function formatName(name, maxCols, level, clazz) {
    return fill(name, maxCols, false, level, clazz);
}

function formatPct(pct, clazz) {
    return fill(pct, PCT_COLS, true, 0, clazz);
}

function nodeName(node) {
    return node.displayShortName() || 'All files';
}

function tableHeader(maxNameCols) {
    var elements = [];
    elements.push(formatName('File', maxNameCols, 0));
    elements.push(formatPct('% Stmts'));
    elements.push(formatPct('% Branches'));
    elements.push(formatPct('% Funcs'));
    elements.push(formatPct('% Lines'));
    return elements.join(' |') + ' |';
}

function tableRow(node, maxNameCols, level, watermarks) {
    var name = nodeName(node),
        statements = node.metrics.statements.pct,
        branches = node.metrics.branches.pct,
        functions = node.metrics.functions.pct,
        lines = node.metrics.lines.pct,
        elements = [];

    elements.push(formatName(name, maxNameCols, level, defaults.classFor('statements', node.metrics, watermarks)));
    elements.push(formatPct(statements, defaults.classFor('statements', node.metrics, watermarks)));
    elements.push(formatPct(branches, defaults.classFor('branches', node.metrics, watermarks)));
    elements.push(formatPct(functions, defaults.classFor('functions', node.metrics, watermarks)));
    elements.push(formatPct(lines, defaults.classFor('lines', node.metrics, watermarks)));

    return elements.join(DELIM) + DELIM;
}

function findNameWidth(node, level, last) {
    last = last || 0;
    level = level || 0;
    var idealWidth = TAB_SIZE * level + nodeName(node).length;
    if (idealWidth > last) {
        last = idealWidth;
    }
    node.children.forEach(function (child) {
        last = findNameWidth(child, level + 1, last);
    });
    return last;
}

function makeLine(nameWidth) {
    var name = padding(nameWidth, '-'),
        pct = padding(PCT_COLS, '-'),
        elements = [];

    elements.push(name);
    elements.push(pct);
    elements.push(pct);
    elements.push(pct);
    elements.push(pct);
    return elements.join(COL_DELIM) + COL_DELIM;
}

function walk(node, nameWidth, array, level, watermarks) {
    var line;
    if (level === 0) {
        line = makeLine(nameWidth);
        array.push(line);
        array.push(tableHeader(nameWidth));
        array.push(line);
    } else {
        array.push(tableRow(node, nameWidth, level, watermarks));
    }
    node.children.forEach(function (child) {
        walk(child, nameWidth, array, level + 1, watermarks);
    });
    if (level === 0) {
        array.push(line);
        array.push(tableRow(node, nameWidth, level, watermarks));
        array.push(line);
    }
}

Report.mix(TextReport, {
    writeReport: function (collector /*, sync */) {
        var summarizer = new TreeSummarizer(),
            tree,
            root,
            nameWidth,
            statsWidth = 4 * ( PCT_COLS + 2),
            maxRemaining,
            strings = [],
            text;

        collector.files().forEach(function (key) {
            summarizer.addFileCoverageSummary(key, utils.summarizeFileCoverage(collector.fileCoverageFor(key)));
        });
        tree = summarizer.getTreeSummary();
        root = tree.root;
        nameWidth = findNameWidth(root);
        if (this.maxCols > 0) {
            maxRemaining = this.maxCols - statsWidth - 2;
            if (nameWidth > maxRemaining) {
                nameWidth = maxRemaining;
            }
        }
        walk(root, nameWidth, strings, 0, this.watermarks);
        text = strings.join('\n') + '\n';
        if (this.file) {
            mkdirp.sync(this.dir);
            fs.writeFileSync(path.join(this.dir, this.file), text, 'utf8');
        } else {
            console.log(text);
        }
    }
});

module.exports = TextReport;
local.TextReport = module.exports; }());



/*
file https://img.shields.io/badge/coverage-100.0%-00dd00.svg?style=flat
*/
local.templateCoverageBadgeSvg =
'<svg xmlns="http://www.w3.org/2000/svg" width="117" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="117" height="20" fill="#555"/><rect rx="0" x="63" width="54" height="20" fill="#0d0"/><path fill="#0d0" d="M63 0h4v20h-4z"/><rect rx="0" width="117" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="32.5" y="15" fill="#010101" fill-opacity=".3">coverage</text><text x="32.5" y="14">coverage</text><text x="89" y="15" fill="#010101" fill-opacity=".3">100.0%</text><text x="89" y="14">100.0%</text></g></svg>';



/*
file none
*/
/* jslint ignore:end */
}());



// run node js-env code - init-after
/* istanbul ignore next */
(function () {
if (local.isBrowser) {
    return;
}



local.cliDict = {};
local.cliDict.cover = function () {
/*
 * <script>
 * will run and cover <script>
 */
    var tmp;
    try {
        tmp = JSON.parse(local.fs.readFileSync("package.json", "utf8"));
        process.env.npm_package_nameLib = (
            process.env.npm_package_nameLib
            || tmp.nameLib
            || tmp.name.replace((
                /-/g
            ), "_")
        );
    } catch (ignore) {}
    process.env.npm_config_mode_coverage = (
        process.env.npm_config_mode_coverage
        || process.env.npm_package_nameLib
        || "all"
    );
    // add coverage hook to require
    local._istanbul_moduleExtensionsJs = (
        local._istanbul_module._extensions[".js"]
    );
    local._istanbul_module._extensions[".js"] = function (module, file) {
        if (typeof file === "string" && (
            file.indexOf(process.env.npm_config_mode_coverage_dir) === 0 || (
                file.indexOf(process.cwd()) === 0
                && file.indexOf(process.cwd() + "/node_modules/") !== 0
            )
        )) {
            module._compile(local.instrumentInPackage(
                local.fs.readFileSync(file, "utf8"),
                file
            ), file);
            return;
        }
        local._istanbul_moduleExtensionsJs(module, file);
    };
    // init process.argv
    process.argv.splice(1, 2);
    process.argv[1] = local.path.resolve(process.cwd(), process.argv[1]);
    console.log("\ncovering $ " + process.argv.join(" "));
    // create coverage on exit
    process.on("exit", function () {
        local.coverageReportCreate({
            coverage: globalThis.__coverage__
        });
    });
    // re-init cli
    local._istanbul_module.runMain();
};

local.cliDict.instrument = function () {
/*
 * <script>
 * will instrument <script> and print result to stdout
 */
    process.argv[3] = local.path.resolve(process.cwd(), process.argv[3]);
    process.stdout.write(local.instrumentSync(
        local.fs.readFileSync(process.argv[3], "utf8"),
        process.argv[3]
    ));
};

//
local.cliDict.test = function () {
/*
 * <script>
 * will run and cover <script> if env var $npm_config_mode_coverage is set
 */
    if (process.env.npm_config_mode_coverage) {
        process.argv[2] = "cover";
        // re-init cli
        local.cliDict[process.argv[2]]();
        return;
    }
    // restart node with __filename removed from process.argv
    process.argv.splice(1, 2);
    process.argv[1] = local.path.resolve(process.cwd(), process.argv[1]);
    // re-init cli
    local._istanbul_module.runMain();
};

// run the cli
if (module === require.main && !globalThis.utility2_rollup) {
    local.cliRun();
}
}());



}());
