#!/usr/bin/env node
/*
 * lib.apidoc.js (2018.9.29)
 * https://github.com/kaizhu256/node-apidoc-lite
 * this zero-dependency package will auto-generate documentation for your npm-package with zero-config
 *
 */



/* istanbul instrument in package apidoc */
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
    globalThis.utility2_apidoc = local;
} else {
    module.exports = local;
    module.exports.__dirname = __dirname;
}
// init lib main
local.apidoc = local;



/* validateLineSortedReset */
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

local.moduleDirname = function (module, modulePathList) {
/*
 * this function will search modulePathList for the module's __dirname
 */
    var result;
    // search process.cwd()
    if (!module || module === "." || module.indexOf("/") >= 0) {
        return require("path").resolve(process.cwd(), module || "");
    }
    // search modulePathList
    ["node_modules"]
    .concat(modulePathList)
    .concat(require("module").globalPaths)
    .concat([process.env.HOME + "/node_modules", "/usr/local/lib/node_modules"])
    .some(function (modulePath) {
        try {
            result = require("path").resolve(process.cwd(), modulePath + "/" + module);
            result = require("fs").statSync(result).isDirectory() && result;
            return result;
        } catch (ignore) {
            result = null;
        }
        return result;
    });
    return result || "";
};

local.objectSetDefault = function (dict, defaults, depth) {
/*
 * this function will recursively set defaults for undefined-items in dict
 */
    dict = dict || {};
    defaults = defaults || {};
    Object.keys(defaults).forEach(function (key) {
        var defaults2;
        var dict2;
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
        // if dict2 and defaults2 are both non-null and non-array objects,
        // then recurse with dict2 and defaults2
        if (
            depth > 1
            // dict2 is a non-null and non-array object
            && typeof dict2 === "object" && dict2 && !Array.isArray(dict2)
            // defaults2 is a non-null and non-array object
            && typeof defaults2 === "object" && defaults2 && !Array.isArray(defaults2)
        ) {
            // recurse
            local.objectSetDefault(dict2, defaults2, depth - 1);
        }
    });
    return dict;
};

local.stringHtmlSafe = function (text) {
/*
 * this function will make the text html-safe
 * https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html
 */
    return text
    .replace((
        /&/g
    ), "&amp;")
    .replace((
        /"/g
    ), "&quot;")
    .replace((
        /'/g
    ), "&apos;")
    .replace((
        /</g
    ), "&lt;")
    .replace((
        />/g
    ), "&gt;")
    .replace((
        /&amp;(amp;|apos;|gt;|lt;|quot;)/ig
    ), "&$1");
};

local.templateRender = function (template, dict, options) {
/*
 * this function will render the template with the given dict
 */
    var argList;
    var getValue;
    var match;
    var renderPartial;
    var rgx;
    var skip;
    var value;
    dict = dict || {};
    options = options || {};
    getValue = function (key) {
        argList = key.split(" ");
        value = dict;
        if (argList[0] === "#this/") {
            return;
        }
        // iteratively lookup nested values in the dict
        argList[0].split(".").forEach(function (key) {
            value = value && value[key];
        });
        return value;
    };
    renderPartial = function (match0, helper, key, partial) {
        switch (helper) {
        case "each":
        case "eachTrimRightComma":
            value = getValue(key);
            value = (
                Array.isArray(value)
                ? value.map(function (dict) {
                    // recurse with partial
                    return local.templateRender(partial, dict, options);
                }).join("")
                : ""
            );
            // remove trailing-comma from last element
            if (helper === "eachTrimRightComma") {
                value = value.trimRight().replace((
                    /,$/
                ), "");
            }
            return value;
        case "if":
            partial = partial.split("{{#unless " + key + "}}");
            partial = (
                getValue(key)
                ? partial[0]
                // handle 'unless' case
                : partial.slice(1).join("{{#unless " + key + "}}")
            );
            // recurse with partial
            return local.templateRender(partial, dict, options);
        case "unless":
            return (
                getValue(key)
                ? ""
                // recurse with partial
                : local.templateRender(partial, dict, options)
            );
        default:
            // recurse with partial
            return match0[0] + local.templateRender(match0.slice(1), dict, options);
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
        var markdownToHtml;
        var notHtmlSafe;
        notHtmlSafe = options.notHtmlSafe;
        try {
            getValue(match0.slice(2, -2));
            if (value === undefined) {
                return match0;
            }
            argList.slice(1).forEach(function (arg0, ii, list) {
                switch (arg0) {
                case "alphanumeric":
                    value = value.replace((
                        /\W/g
                    ), "_");
                    break;
                case "decodeURIComponent":
                    value = decodeURIComponent(value);
                    break;
                case "encodeURIComponent":
                    value = encodeURIComponent(value);
                    break;
                case "jsonStringify":
                    value = JSON.stringify(value);
                    break;
                case "jsonStringify4":
                    value = JSON.stringify(value, null, 4);
                    break;
                case "markdownSafe":
                    value = value.replace((
                        /`/g
                    ), "'");
                    break;
                case "markdownToHtml":
                    markdownToHtml = true;
                    break;
                case "notHtmlSafe":
                    notHtmlSafe = true;
                    break;
                case "truncate":
                    skip = ii + 1;
                    if (value.length > list[skip]) {
                        value = value.slice(0, list[skip] - 3).trimRight() + "...";
                    }
                    break;
                // default to String.prototype[arg0]()
                default:
                    if (ii === skip) {
                        break;
                    }
                    value = value[arg0]();
                }
            });
            value = String(value);
            // default to htmlSafe
            if (!notHtmlSafe) {
                value = value
                .replace((
                    /&/g
                ), "&amp;")
                .replace((
                    /"/g
                ), "&quot;")
                .replace((
                    /'/g
                ), "&apos;")
                .replace((
                    /</g
                ), "&lt;")
                .replace((
                    />/g
                ), "&gt;")
                .replace((
                    /&amp;(amp;|apos;|gt;|lt;|quot;)/ig
                ), "&$1");
            }
            markdownToHtml = (
                markdownToHtml
                && (typeof local.marked === "function" && local.marked)
            );
            if (markdownToHtml) {
                value = markdownToHtml(value)
                .replace((
                    /&amp;(amp;|apos;|gt;|lt;|quot;)/ig
                ), "&$1");
            }
            return value;
        } catch (errorCaught) {
            errorCaught.message = (
                "templateRender could not render expression "
                + JSON.stringify(match0) + "\n"
            ) + errorCaught.message;
            local.assertThrow(null, errorCaught);
        }
    });
};

local.tryCatchOnError = function (fnc, onError) {
/*
 * this function will run the fnc in a tryCatch block,
 * else call onError with the errorCaught
 */
    var result;
    // validate onError
    local.assertThrow(typeof onError === "function", typeof onError);
    try {
        // reset errorCaught
        local._debugTryCatchError = null;
        result = fnc();
        local._debugTryCatchError = null;
        return result;
    } catch (errorCaught) {
        // debug errorCaught
        local._debugTryCatchError = errorCaught;
        return onError(errorCaught);
    }
};
}());



// run shared js-env code - init-before
/* jslint ignore:start */
local.templateApidocHtml = '\
<div class="apidocDiv">\n\
<style>\n\
/*csslint\n\
*/\n\
.apidocDiv {\n\
    background: #fff;\n\
    font-family: Arial, Helvetica, sans-serif;\n\
}\n\
.apidocDiv a[href] {\n\
    color: #33f;\n\
    font-weight: bold;\n\
    text-decoration: none;\n\
}\n\
.apidocDiv a[href]:hover {\n\
    text-decoration: underline;\n\
}\n\
.apidocCodeCommentSpan {\n\
    background: #bbf;\n\
    color: #000;\n\
    display: block;\n\
}\n\
.apidocCodeKeywordSpan {\n\
    color: #d00;\n\
    font-weight: bold;\n\
}\n\
.apidocCodePre {\n\
    background: #eef;\n\
    border: 1px solid;\n\
    color: #777;\n\
    overflow-wrap: break-word;\n\
    padding: 5px;\n\
    white-space: pre-wrap;\n\
}\n\
.apidocFooterDiv {\n\
    margin-top: 20px;\n\
    text-align: center;\n\
}\n\
.apidocModuleLi {\n\
    margin-top: 10px;\n\
}\n\
.apidocSectionDiv {\n\
    border-top: 1px solid;\n\
    margin-top: 20px;\n\
}\n\
.apidocSignatureSpan {\n\
    color: #777;\n\
    font-weight: bold;\n\
}\n\
</style>\n\
<h1>api documentation for\n\
    <a\n\
        {{#if env.npm_package_homepage}}\n\
        href="{{env.npm_package_homepage}}"\n\
        {{/if env.npm_package_homepage}}\n\
    >{{env.npm_package_name}} ({{env.npm_package_version}})</a>\n\
</h1>\n\
<h4>{{env.npm_package_description}}</h4>\n\
<div class="apidocSectionDiv"><a\n\
    href="#apidoc.tableOfContents"\n\
    id="apidoc.tableOfContents"\n\
><h1>table of contents</h1></a><ol>\n\
    {{#each moduleList}}\n\
    <li class="apidocModuleLi"><a href="#{{id}}">module {{name}}</a><ol>\n\
        {{#each elementList}}\n\
        <li>\n\
            {{#if source}}\n\
            <a class="apidocElementLiA" href="#{{id}}">\n\
            {{name}}\n\
            <span class="apidocSignatureSpan">{{signature}}</span>\n\
            </a>\n\
            {{#unless source}}\n\
            <span class="apidocSignatureSpan">{{name}}</span>\n\
            {{/if source}}\n\
        </li>\n\
        {{/each elementList}}\n\
    </ol></li>\n\
    {{/each moduleList}}\n\
</ol></div>\n\
{{#each moduleList}}\n\
<div class="apidocSectionDiv">\n\
<h1><a href="#{{id}}" id="{{id}}">module {{name}}</a></h1>\n\
    {{#each elementList}}\n\
    {{#if source}}\n\
    <h2>\n\
        <a href="#{{id}}" id="{{id}}">\n\
        {{name}}\n\
        <span class="apidocSignatureSpan">{{signature}}</span>\n\
        </a>\n\
    </h2>\n\
    <ul>\n\
    <li>description and source-code<pre class="apidocCodePre">{{source truncate 4096}}</pre></li>\n\
    <li>example usage<pre class="apidocCodePre">{{example}}</pre></li>\n\
    </ul>\n\
    {{/if source}}\n\
    {{/each elementList}}\n\
</div>\n\
{{/each moduleList}}\n\
<div class="apidocFooterDiv">\n\
    [ this document was created with\n\
    <a href="https://github.com/kaizhu256/node-utility2" target="_blank">utility2</a>\n\
    ]\n\
</div>\n\
</div>\n\
';
/* jslint ignore:end */



// run shared js-env code - function
(function () {
local.apidocCreate = function (options) {
/*
 * this function will create the apidoc from options.dir
 */
    var elementCreate;
    var module;
    var moduleMain;
    var readExample;
    var tmp;
    var toString;
    var trimLeft;
    elementCreate = function (module, prefix, key) {
    /*
     * this function will create the apidoc-element in the given module
     */
        var element;
        if (options.modeNoApidoc) {
            return element;
        }
        element = {};
        element.moduleName = prefix.split(".");
        // handle case where module is a function
        if (element.moduleName.slice(-1)[0] === key) {
            element.moduleName.pop();
        }
        element.moduleName = element.moduleName.join(".");
        element.id = encodeURIComponent("apidoc.element." + prefix + "." + key);
        element.typeof = typeof module[key];
        element.name = (
            element.typeof + " <span class=\"apidocSignatureSpan\">"
            + element.moduleName + ".</span>" + key
        )
            // handle case where module is a function
            .replace(">.<", "><");
        if (element.typeof !== "function") {
            return element;
        }
        // init source
        element.source = local.stringHtmlSafe(trimLeft(toString(module[key])) || "n/a")
        .replace((
            /\([\S\s]*?\)/
        ), function (match0) {
            // init signature
            element.signature = match0
            .replace((
                /\u0020*?\/\*[\S\s]*?\*\/\u0020*/g
            ), "")
            .replace((
                /,/g
            ), ", ")
            .replace((
                /\s+/g
            ), " ");
            return element.signature;
        })
        .replace((
            /(\u0020*?\/\*[\S\s]*?\*\/\n)/
        ), "<span class=\"apidocCodeCommentSpan\">$1</span>")
        .replace((
            /^function\u0020\(/
        ), key + " = function (");
        // init example
        options.exampleList.some(function (example) {
            example.replace(
                new RegExp("((?:\n.*?){8}\\.)(" + key + ")(\\((?:.*?\n){8})"),
                function (ignore, match1, match2, match3) {
                    element.example = "..." + trimLeft(
                        local.stringHtmlSafe(match1)
                        + "<span class=\"apidocCodeKeywordSpan\">"
                        + local.stringHtmlSafe(match2)
                        + "</span>"
                        + local.stringHtmlSafe(match3)
                    ).trimRight() + "\n...";
                }
            );
            return element.example;
        });
        element.example = element.example || "n/a";
        return element;
    };
    readExample = function (file) {
    /*
     * this function will read the example from the given file
     */
        var result;
        local.tryCatchOnError(function () {
            file = local.path.resolve(options.dir, file);
            console.error("apidocCreate - readExample " + file);
            result = "";
            result = (
                "\n\n\n\n\n\n\n\n"
                // bug-workaround - truncate example to manageable size
                + local.fs.readFileSync(file, "utf8").slice(0, 262144)
                + "\n\n\n\n\n\n\n\n"
            ).replace((
                /\r\n*/g
            ), "\n");
        }, console.error);
        return result;
    };
    toString = function (value) {
    /*
     * this function will try to return the string form of the value
     */
        var result;
        local.tryCatchOnError(function () {
            result = "";
            result = String(value);
        }, console.error);
        return result;
    };
    trimLeft = function (text) {
    /*
     * this function will normalize the whitespace around the text
     */
        var whitespace;
        whitespace = "";
        text.trim().replace((
            /^\u0020*/gm
        ), function (match0) {
            if (!whitespace || match0.length < whitespace.length) {
                whitespace = match0;
            }
        });
        text = text.replace(new RegExp("^" + whitespace, "gm"), "");
        // enforce 128 character column limit
        text = text.replace((
            /^.{128}[^\\\n]+/gm
        ), function (match0) {
            return match0.replace((
                /(.{128}(?:\b|\w+))/g
            ), "$1\n").trimRight();
        });
        return text;
    };
    // init options
    options.dir = local.moduleDirname(
        options.dir,
        options.modulePathList || require("module").paths
    );
    local.objectSetDefault(options, {
        env: {
            npm_package_description: ""
        },
        packageJson: JSON.parse(readExample("package.json")),
        require: function (file) {
            return local.tryCatchOnError(function () {
                return require(file);
            }, console.error);
        }
    });
    Object.keys(options.packageJson).forEach(function (key) {
        tmp = options.packageJson[key];
        // strip email from npmdoc documentation
        // https://github.com/npmdoc/node-npmdoc-hpp/issues/1
        if (tmp) {
            if (tmp.email) {
                delete tmp.email;
            }
            if (Array.isArray(tmp)) {
                tmp.forEach(function (element) {
                    if (element && element.email) {
                        delete element.email;
                    }
                });
            }
        }
        if (key[0] === "_" || key === "readme") {
            delete options.packageJson[key];
        } else if (typeof tmp === "string") {
            options.env["npm_package_" + key] = tmp;
        }
    });
    local.objectSetDefault(options, {
        blacklistDict: {
            globalThis: globalThis
        },
        circularList: [globalThis],
        exampleDict: {},
        exampleList: [],
        html: "",
        libFileList: [],
        moduleDict: {},
        moduleExtraDict: {},
        packageJson: {
            bin: {}
        },
        template: local.templateApidocHtml,
        whitelistDict: {}
    }, 2);
    // init exampleList
    [1, 2, 3, 4].forEach(function (depth) {
        options.exampleList = options.exampleList.concat(
            // find . -maxdepth 1 -mindepth 1 -name "*.js" -type f
            // http://stackoverflow.com/questions/4509624/how-to-limit-depth-for-recursive-file-list
            local.child_process.execSync(
                "find \"" + options.dir
                + "\" -maxdepth " + depth + " -mindepth " + depth
                + " -type f | sed -e \"s|" + options.dir
                + "/||\" | grep -iv "
/* jslint ignore:start */
+ '"\
/\\.\\|\\(\\b\\|_\\)\\(\
bower_component\\|\
coverage\\|\
git\\|\
min\\|\
node_module\\|\
rollup\\|\
tmp\\|\
vendor\\)s\\{0,1\\}\\(\\b\\|_\\)\
" '
/* jslint ignore:end */
                + " | sort | head -n 256"
            ).toString()
            .split("\n")
        );
    });
    options.exampleList = options.exampleList.filter(function (file) {
        if (file && !options.exampleDict[file]) {
            options.exampleDict[file] = true;
            return true;
        }
    }).slice(0, 256).map(readExample);
    // init moduleMain
    local.tryCatchOnError(function () {
        console.error("apidocCreate - requiring " + options.dir + " ...");
        moduleMain = {};
        moduleMain = (
            options.moduleDict[options.env.npm_package_name]
            || options.require(options.dir)
            || options.require(
                options.dir + "/"
                + (options.packageJson.bin)[Object.keys(options.packageJson.bin)[0]]
            ) || {}
        );
        options.circularList.push(moduleMain);
        console.error("apidocCreate - ... required " + options.dir);
    }, console.error);
    tmp = {};
    // handle case where module is a function
    if (typeof moduleMain === "function") {
        (function () {
            var text;
            text = toString(moduleMain);
            tmp = function () {
                return;
            };
            // coverage-hack
            tmp();
            Object.defineProperties(tmp, {
                toString: {
                    get: function () {
                        return function () {
                            return text;
                        };
                    }
                }
            });
        }());
    }
    // normalize moduleMain
    moduleMain = local.objectSetDefault(tmp, moduleMain);
    options.moduleDict[options.env.npm_package_name] = moduleMain;
    // init circularList - builtins
    [
        "assert",
        "buffer",
        "child_process",
        "cluster",
        "crypto",
        "dgram",
        "dns",
        "domain",
        "events",
        "fs",
        "http",
        "https",
        "net",
        "os",
        "path",
        "querystring",
        "readline",
        "repl",
        "stream",
        "string_decoder",
        "timers",
        "tls",
        "tty",
        "url",
        "util",
        "vm",
        "zlib"
    ].forEach(function (key) {
        local.tryCatchOnError(function () {
            options.circularList.push(require(key));
        }, local.nop);
    });
    // init circularList - blacklistDict
    Object.keys(options.blacklistDict).forEach(function (key) {
        options.circularList.push(options.blacklistDict[key]);
    });
    // init circularList - moduleDict
    Object.keys(options.moduleDict).forEach(function (key) {
        options.circularList.push(options.moduleDict[key]);
    });
    // init circularList - prototype
    Object.keys(options.circularList).forEach(function (key) {
        tmp = options.circularList[key];
        options.circularList.push(tmp && tmp.prototype);
    });
    // deduplicate circularList
    tmp = options.circularList;
    options.circularList = [];
    tmp.forEach(function (element) {
        if (options.circularList.indexOf(element) < 0) {
            options.circularList.push(element);
        }
    });
    // init moduleDict child
    local.apidocModuleDictAdd(options, options.moduleDict);
    // init swgg.apiDict
    Object.keys((moduleMain.swgg && moduleMain.swgg.apiDict) || {}).forEach(function (key) {
        tmp = "swgg.apiDict";
        options.moduleDict[tmp] = options.moduleDict[tmp] || {};
        tmp = options.moduleDict[tmp];
        tmp[key + ".ajax"] = (
            moduleMain.swgg.apiDict[key]
            && moduleMain.swgg.apiDict[key].ajax
        );
    });
    // init moduleExtraDict
    options.moduleExtraDict[options.env.npm_package_name] = (
        options.moduleExtraDict[options.env.npm_package_name] || {}
    );
    module = options.moduleExtraDict[options.env.npm_package_name];
    [1, 2, 3, 4].forEach(function (depth) {
        options.libFileList = options.libFileList.concat(
            // find . -maxdepth 1 -mindepth 1 -name "*.js" -type f
            // http://stackoverflow.com/questions/4509624/how-to-limit-depth-for-recursive-file-list
            local.child_process.execSync(
                "find \"" + options.dir
                + "\" -maxdepth " + depth + " -mindepth " + depth
                + " -name \"*.js\" -type f | sed -e \"s|" + options.dir
                + "/||\" | grep -iv "
/* jslint ignore:start */
+ '"\
/\\.\\|\\(\\b\\|_\\)\\(\
archive\\|artifact\\|asset\\|\
bower_component\\|build\\|\
coverage\\|\
doc\\|dist\\|\
example\\|external\\|\
fixture\\|\
git\\|\
log\\|\
min\\|mock\\|\
node_module\\|\
rollup\\|\
spec\\|\
test\\|tmp\\|\
vendor\\)s\\{0,1\\}\\(\\b\\|_\\)\
" '
/* jslint ignore:end */
                + " | sort | head -n 256"
            ).toString()
            .split("\n")
        );
    });
    options.ii = 256;
    options.libFileList.every(function (file) {
        local.tryCatchOnError(function () {
            tmp = {};
            tmp.name = local.path.basename(file)
            .replace("lib.", "")
            .replace((
                /\.[^.]*?$/
            ), "")
            .replace((
                /\W/g
            ), "_");
            ([
                tmp.name,
                tmp.name.slice(0, 1).toUpperCase() + tmp.name.slice(1)
            ]).some(function (name) {
                tmp.isFiltered = name && (
                    !options.packageJson.main
                    || ("./" + file).indexOf(options.packageJson.main) < 0
                ) && !module[name];
                return !tmp.isFiltered;
            });
            if (!tmp.isFiltered) {
                return;
            }
            console.error("apidocCreate - libFile " + file);
            tmp.module = options.require(options.dir + "/" + file);
            // filter circular-reference
            if (!(tmp.module && options.circularList.indexOf(tmp.module) < 0)) {
                return;
            }
            options.ii -= 1;
            module[tmp.name] = tmp.module;
        }, console.error);
        return options.ii;
    });
    local.apidocModuleDictAdd(options, options.moduleExtraDict);
    Object.keys(options.moduleDict).forEach(function (key) {
        if (key.indexOf(options.env.npm_package_name + ".") !== 0) {
            return;
        }
        tmp = key.split(".").slice(1).join(".");
        moduleMain[tmp] = moduleMain[tmp] || options.moduleDict[key];
    });
    // init moduleList
    options.moduleList = Object.keys(options.moduleDict)
    .sort()
    .map(function (prefix) {
        module = options.moduleDict[prefix];
        // handle case where module is a function
        if (typeof module === "function") {
            local.tryCatchOnError(function () {
                module[prefix.split(".").slice(-1)[0]] = (
                    module[prefix.split(".").slice(-1)[0]] || module
                );
            }, console.error);
        }
        return {
            elementList: Object.keys(module)
            .filter(function (key) {
                return local.tryCatchOnError(function () {
                    return (
                        key
                        && (
                            /^\w[\w\-.]*?$/
                        ).test(key)
                        && key.indexOf("testCase_") !== 0
                        && (
                            module[key] !== options.blacklistDict[key]
                            || options.whitelistDict[key]
                        )
                    );
                }, console.error);
            })
            .map(function (key) {
                return elementCreate(module, prefix, key);
            })
            .sort(function (aa, bb) {
                return (
                    aa.name > bb.name
                    ? 1
                    : -1
                );
            }),
            id: encodeURIComponent("apidoc.module." + prefix),
            name: prefix
        };
    });
    // render apidoc
    options.result = local.templateRender(options.template, options, {
        notHtmlSafe: true
    })
    .trim()
    .replace((
        /\u0020+$/gm
    ), "") + "\n";
    return options.result;
};

local.apidocModuleDictAdd = function (options, moduleDict) {
/*
 * this function will add the modules in moduleDict to options.moduleDict
 */
    var isModule;
    var objectKeys;
    var tmp;
    objectKeys = function (dict) {
    /*
     * this function will return a list of the dict's keys, with valid getters
     */
        return Object.keys(dict).sort().filter(function (key) {
            return local.tryCatchOnError(function () {
                return dict[key] || true;
            }, local.nop);
        });
    };
    ["child", "prototype", "grandchild", "prototype"].forEach(function (element) {
        objectKeys(moduleDict).forEach(function (prefix) {
            if (!(
                /^\w[\w\-.]*?$/
            ).test(prefix)) {
                return;
            }
            objectKeys(moduleDict[prefix]).forEach(function (key) {
                if (!(
                    /^\w[\w\-.]*?$/
                ).test(key) || !moduleDict[prefix][key]) {
                    return;
                }
                tmp = (
                    element === "prototype"
                    ? {
                        module: moduleDict[prefix][key].prototype,
                        name: prefix + "." + key + ".prototype"
                    }
                    : {
                        module: moduleDict[prefix][key],
                        name: prefix + "." + key
                    }
                );
                if (
                    !tmp.module
                    || !(
                        typeof tmp.module === "function"
                        || typeof tmp.module === "object"
                    )
                    || Array.isArray(tmp.module)
                    || options.moduleDict[tmp.name]
                    || options.circularList.indexOf(tmp.module) >= 0
                ) {
                    return;
                }
                isModule = ([
                    tmp.module,
                    tmp.module.prototype
                ]).some(function (dict) {
                    return objectKeys(dict || {}).some(function (key) {
                        return typeof dict[key] === "function";
                    });
                });
                if (!isModule) {
                    return;
                }
                options.circularList.push(tmp.module);
                options.moduleDict[tmp.name] = tmp.module;
            });
        });
    });
};
}());



// run node js-env code - init-after
/* istanbul ignore next */
(function () {
if (local.isBrowser) {
    return;
}



local.cliDict = {};

local.cliDict._default = function () {
/*
 * <moduleDirectory>
 * will create apidoc from <moduleDirectory>
 */
    // jslint files
    process.stdout.write(local.apidocCreate({
        dir: process.argv[2],
        modulePathList: module.paths
    }));
};

// run cli
if (module === require.main && !globalThis.utility2_rollup) {
    local.cliRun();
}
}());



}());
