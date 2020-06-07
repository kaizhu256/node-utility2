#!/usr/bin/env node
/*
 * lib.apidoc.js (2020.3.17)
 * https://github.com/kaizhu256/node-apidoc-lite
 * this zero-dependency package will auto-generate documentation for your npm-package with zero-config
 *
 */



/* istanbul instrument in package apidoc */
// assets.utility2.header.js - start
/* jslint utility2:true */
/* istanbul ignore next */
// run shared js-env code - init-local
(function (globalThis) {
    "use strict";
    let consoleError;
    let local;
    // init globalThis
    globalThis.globalThis = globalThis.globalThis || globalThis;
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
        local.isBrowser && typeof globalThis.importScripts === "function"
    );
    // init function
    local.assertJsonEqual = function (aa, bb) {
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
    };
    local.assertOrThrow = function (passed, msg) {
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
            if (arg !== undefined && arg !== null && arg !== "") {
                return arg;
            }
            ii += 1;
        }
        return arg;
    };
    local.identity = function (val) {
    /*
     * this function will return <val>
     */
        return val;
    };
    local.nop = function () {
    /*
     * this function will do nothing
     */
        return;
    };
    local.objectAssignDefault = function (tgt = {}, src = {}, depth = 0) {
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
    };
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
    // require builtin
    if (!local.isBrowser) {
        local.fs = require("fs");
    }
}((typeof globalThis === "object" && globalThis) || window));
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
    globalThis.utility2_apidoc = local;
} else {
    module.exports = local;
    module.exports.__dirname = __dirname;
}
// init lib main
local.apidoc = local;



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

local.moduleDirname = function (module, pathList) {
/*
 * this function will search <pathList> for <module>'s __dirname
 */
    let result;
    // search "."
    if (!module || module === "." || module.indexOf("/") >= 0) {
        return require("path").resolve(module || "");
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
            result = require("path").resolve(path + "/" + module);
            result = require("fs").statSync(result).isDirectory() && result;
            return result;
        } catch (ignore) {
            result = "";
        }
    });
    return result;
};

local.stringHtmlSafe = function (str) {
/*
 * this function will make <str> html-safe
 * https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html
 */
    return str.replace((
        /&/gu
    ), "&amp;").replace((
        /"/gu
    ), "&quot;").replace((
        /'/gu
    ), "&apos;").replace((
        /</gu
    ), "&lt;").replace((
        />/gu
    ), "&gt;").replace((
        /&amp;(amp;|apos;|gt;|lt;|quot;)/igu
    ), "&$1");
};

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
        {{#each elemList}}\n\
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
        {{/each elemList}}\n\
    </ol></li>\n\
    {{/each moduleList}}\n\
</ol></div>\n\
{{#each moduleList}}\n\
<div class="apidocSectionDiv">\n\
<h1><a href="#{{id}}" id="{{id}}">module {{name}}</a></h1>\n\
    {{#each elemList}}\n\
    {{#if source}}\n\
    <h2>\n\
        <a href="#{{id}}" id="{{id}}">\n\
        {{name}}\n\
        <span class="apidocSignatureSpan">{{signature}}</span>\n\
        </a>\n\
    </h2>\n\
    <ul>\n\
    <li>description and source-code<pre class="apidocCodePre">{{source truncate 4096}}</pre></li>\n\
    <li>example use<pre class="apidocCodePre">{{example}}</pre></li>\n\
    </ul>\n\
    {{/if source}}\n\
    {{/each elemList}}\n\
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

local.templateRender = function (template, dict, opt = {}, ii = 0) {
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
                // handle "unless" case
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
    // search for keys in template
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
                    /&/gu
                ), "&amp;").replace((
                    /"/gu
                ), "&quot;").replace((
                    /'/gu
                ), "&apos;").replace((
                    /</gu
                ), "&lt;").replace((
                    />/gu
                ), "&gt;").replace((
                    /&amp;(amp;|apos;|gt;|lt;|quot;)/igu
                ), "&$1");
            }
            markdownToHtml = (
                markdownToHtml
                && (typeof local.marked === "function" && local.marked)
            );
            if (markdownToHtml) {
                val = markdownToHtml(val).replace((
                    /&amp;(amp;|apos;|gt;|lt;|quot;)/igu
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

local.tryCatchOnError = function (fnc, onError) {
/*
 * this function will run <fnc> in tryCatch block,
 * else call onError with errCaught
 */
    let result;
    // validate onError
    local.assertOrThrow(typeof onError === "function", typeof onError);
    try {
        // reset errCaught
        delete local._debugTryCatchError;
        result = fnc();
        delete local._debugTryCatchError;
        return result;
    } catch (errCaught) {
        // debug errCaught
        local._debugTryCatchError = errCaught;
        return onError(errCaught);
    }
};
}());



// run shared js-env code - function
(function () {
local.apidocCreate = function (opt) {
/*
 * this function will create the apidoc from <opt>.dir
 */
    let elemCreate;
    let module;
    let moduleMain;
    let readExample;
    let tmp;
    let toString;
    let trimStart;
    elemCreate = function (module, prefix, key) {
    /*
     * this function will create the apidoc-elem in given <module>
     */
        let elem;
        if (opt.modeNoApidoc) {
            return elem;
        }
        elem = {};
        elem.moduleName = prefix.split(".");
        // handle case where module is a function
        if (elem.moduleName.slice(-1)[0] === key) {
            elem.moduleName.pop();
        }
        elem.moduleName = elem.moduleName.join(".");
        elem.id = encodeURIComponent("apidoc.elem." + prefix + "." + key);
        elem.typeof = typeof module[key];
        elem.name = (
            elem.typeof + " <span class=\"apidocSignatureSpan\">"
            + elem.moduleName + ".</span>" + key
        );
        // handle case where module is a function
        elem.name = elem.name.replace(">.<", "><");
        if (elem.typeof !== "function") {
            return elem;
        }
        // init source
        elem.source = local.stringHtmlSafe(
            trimStart(toString(module[key])) || "n/a"
        ).replace((
            /\([\S\s]*?\)/
        ), function (match0) {
            // init signature
            elem.signature = match0.replace((
                /\u0020*?\/\*[\S\s]*?\*\/\u0020*/g
            ), "").replace((
                /,/g
            ), ", ").replace((
                /\s+/g
            ), " ");
            return elem.signature;
        }).replace((
            /(\u0020*?\/\*[\S\s]*?\*\/\n)/
        ), "<span class=\"apidocCodeCommentSpan\">$1</span>").replace((
            /^function\u0020\(/
        ), key + " = function (");
        // init example
        opt.exampleList.some(function (example) {
            example.replace(
                new RegExp("((?:\n.*?){8}\\.)(" + key + ")(\\((?:.*?\n){8})"),
                function (ignore, match1, match2, match3) {
                    elem.example = "..." + trimStart(
                        local.stringHtmlSafe(match1)
                        + "<span class=\"apidocCodeKeywordSpan\">"
                        + local.stringHtmlSafe(match2)
                        + "</span>"
                        + local.stringHtmlSafe(match3)
                    ).trimEnd() + "\n...";
                    return "";
                }
            );
            return elem.example;
        });
        elem.example = elem.example || "n/a";
        return elem;
    };
    readExample = function (file) {
    /*
     * this function will read the example from given file
     */
        let result;
        local.tryCatchOnError(function () {
            file = require("path").resolve(opt.dir, file);
            console.error("apidocCreate - readExample " + file);
            result = "";
            result = local.identity(
                "\n\n\n\n\n\n\n\n"
                // bug-workaround - truncate example to manageable size
                + require("fs").readFileSync(file, "utf8").slice(0, 262144)
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
        let result;
        local.tryCatchOnError(function () {
            result = "";
            result = String(value);
        }, console.error);
        return result;
    };
    trimStart = function (str) {
    /*
     * this function will normalize whitespace before <str>
     */
        let whitespace;
        whitespace = "";
        str.trim().replace((
            /^\u0020*/gm
        ), function (match0) {
            if (!whitespace || match0.length < whitespace.length) {
                whitespace = match0;
            }
            return "";
        });
        str = str.replace(new RegExp("^" + whitespace, "gm"), "");
        // enforce 128 character column limit
        str = str.replace((
            /^.{128}[^\\\n]+/gm
        ), function (match0) {
            return match0.replace((
                /(.{128}(?:\b|\w+))/g
            ), "$1\n").trimEnd();
        });
        return str;
    };
    // init opt
    opt.dir = local.moduleDirname(
        opt.dir,
        opt.modulePathList || require("module").paths
    );
    local.objectAssignDefault(opt, {
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
    Object.keys(opt.packageJson).forEach(function (key) {
        tmp = opt.packageJson[key];
        // strip email from npmdoc documentation
        // https://github.com/npmdoc/node-npmdoc-hpp/issues/1
        if (tmp) {
            if (tmp.email) {
                delete tmp.email;
            }
            if (Array.isArray(tmp)) {
                tmp.forEach(function (elem) {
                    if (elem && elem.email) {
                        delete elem.email;
                    }
                });
            }
        }
        if (key[0] === "_" || key === "readme") {
            delete opt.packageJson[key];
        } else if (typeof tmp === "string") {
            opt.env["npm_package_" + key] = tmp;
        }
    });
    local.objectAssignDefault(opt, {
        blacklistDict: {
            globalThis
        },
        circularSet: new Set([
            globalThis
        ]),
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
    ([
        1, 2, 3, 4
    ]).forEach(function (depth) {
        opt.exampleList = opt.exampleList.concat(
            // find . -maxdepth 1 -mindepth 1 -name "*.js" -type f
            // https://stackoverflow.com/questions/4509624/how-to-limit-depth-for-recursive-file-list
            require("child_process").execSync(
                "find \"" + opt.dir
                + "\" -maxdepth " + depth + " -mindepth " + depth
                + " -type f | sed -e \"s|" + opt.dir
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
            ).toString().split("\n")
        );
    });
    opt.exampleList = opt.exampleList.filter(function (file) {
        if (file && !opt.exampleDict[file]) {
            opt.exampleDict[file] = true;
            return true;
        }
    }).slice(0, 256).map(readExample);
    // init moduleMain
    local.tryCatchOnError(function () {
        console.error("apidocCreate - requiring " + opt.dir + " ...");
        moduleMain = {};
        moduleMain = (
            opt.moduleDict[opt.env.npm_package_name]
            || opt.require(opt.dir)
            || opt.require(
                opt.dir + "/"
                + (opt.packageJson.bin)[Object.keys(opt.packageJson.bin)[0]]
            ) || {}
        );
        opt.circularSet.add(moduleMain);
        console.error("apidocCreate - ... required " + opt.dir);
    }, console.error);
    tmp = {};
    // handle case where module is a function
    if (typeof moduleMain === "function") {
        (function () {
            let str;
            str = toString(moduleMain);
            tmp = function () {
                return;
            };
            // hack-coverage
            tmp();
            Object.defineProperties(tmp, {
                toString: {
                    get: function () {
                        return function () {
                            return str;
                        };
                    }
                }
            });
        }());
    }
    // normalize moduleMain
    moduleMain = local.objectAssignDefault(tmp, moduleMain);
    opt.moduleDict[opt.env.npm_package_name] = moduleMain;
    // init circularSet - builtins
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
            opt.circularSet.add(require(key));
        }, local.nop);
    });
    // init circularSet - blacklistDict
    Object.keys(opt.blacklistDict).forEach(function (key) {
        opt.circularSet.add(opt.blacklistDict[key]);
    });
    // init circularSet - moduleDict
    Object.keys(opt.moduleDict).forEach(function (key) {
        opt.circularSet.add(opt.moduleDict[key]);
    });
    // init circularSet - prototype
    opt.circularSet.forEach(function (elem) {
        opt.circularSet.add(elem && elem.prototype);
    });
    // init moduleDict child
    local.apidocModuleDictAdd(opt, opt.moduleDict);
    // init moduleExtraDict
    opt.moduleExtraDict[opt.env.npm_package_name] = (
        opt.moduleExtraDict[opt.env.npm_package_name] || {}
    );
    module = opt.moduleExtraDict[opt.env.npm_package_name];
    ([
        1, 2, 3, 4
    ]).forEach(function (depth) {
        opt.libFileList = opt.libFileList.concat(
            // find . -maxdepth 1 -mindepth 1 -name "*.js" -type f
            // https://stackoverflow.com/questions/4509624/how-to-limit-depth-for-recursive-file-list
            require("child_process").execSync(
                "find \"" + opt.dir
                + "\" -maxdepth " + depth + " -mindepth " + depth
                + " -name \"*.js\" -type f | sed -e \"s|" + opt.dir
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
            ).toString().split("\n")
        );
    });
    opt.ii = 256;
    opt.libFileList.every(function (file) {
        local.tryCatchOnError(function () {
            tmp = {};
            tmp.name = require("path").basename(file).replace(
                "lib.",
                ""
            ).replace((
                /\.[^.]*?$/
            ), "").replace((
                /\W/g
            ), "_");
            Array.from([
                tmp.name,
                tmp.name.slice(0, 1).toUpperCase() + tmp.name.slice(1)
            ]).some(function (name) {
                tmp.isFiltered = name && (
                    !opt.packageJson.main
                    || String("./" + file).indexOf(opt.packageJson.main) < 0
                ) && !module[name];
                return !tmp.isFiltered;
            });
            if (!tmp.isFiltered) {
                return;
            }
            console.error("apidocCreate - libFile " + file);
            tmp.module = opt.require(opt.dir + "/" + file);
            // filter circular-reference
            if (!(tmp.module && opt.circularSet.has(tmp.module))) {
                return;
            }
            opt.ii -= 1;
            module[tmp.name] = tmp.module;
        }, console.error);
        return opt.ii;
    });
    local.apidocModuleDictAdd(opt, opt.moduleExtraDict);
    Object.keys(opt.moduleDict).forEach(function (key) {
        if (key.indexOf(opt.env.npm_package_name + ".") !== 0) {
            return;
        }
        tmp = key.split(".").slice(1).join(".");
        moduleMain[tmp] = moduleMain[tmp] || opt.moduleDict[key];
    });
    // init moduleList
    opt.moduleList = Object.keys(opt.moduleDict).sort().map(function (prefix) {
        module = opt.moduleDict[prefix];
        // handle case where module is a function
        if (typeof module === "function") {
            local.tryCatchOnError(function () {
                module[prefix.split(".").slice(-1)[0]] = (
                    module[prefix.split(".").slice(-1)[0]] || module
                );
            }, console.error);
        }
        return {
            elemList: Object.keys(module).filter(function (key) {
                return local.tryCatchOnError(function () {
                    return (
                        key
                        && (
                            /^\w[\w\-.]*?$/
                        ).test(key)
                        && key.indexOf("testCase_") !== 0
                        && (
                            module[key] !== opt.blacklistDict[key]
                            || opt.whitelistDict[key]
                        )
                    );
                }, console.error);
            }).map(function (key) {
                return elemCreate(module, prefix, key);
            }).sort(function (aa, bb) {
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
    opt.result = local.templateRender(opt.template, opt, {
        notHtmlSafe: true
    }).trim().replace((
        /\u0020+$/gm
    ), "") + "\n";
    return opt.result;
};

local.apidocModuleDictAdd = function (opt, moduleDict) {
/*
 * this function will add the modules in <moduleDict> to <opt>.moduleDict
 */
    let isModule;
    let objectKeys;
    let tmp;
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
    [
        "child", "prototype", "grandchild", "prototype"
    ].forEach(function (elem) {
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
                    elem === "prototype"
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
                    || opt.moduleDict[tmp.name]
                    || opt.circularSet.has(tmp.module)
                ) {
                    return;
                }
                isModule = Array.from([
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
                opt.circularSet.add(tmp.module);
                opt.moduleDict[tmp.name] = tmp.module;
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

// run the cli
if (module === require.main && !globalThis.utility2_rollup) {
    local.cliRun();
}
}());
}());
