#!/usr/bin/env node
/* istanbul instrument in package apidoc */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run shared js-env code - pre-init
    (function () {
        // init local
        local = {};
        // init modeJs
        local.modeJs = (function () {
            try {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
                    typeof XMLHttpRequest.prototype.open === 'function' &&
                    'browser';
            } catch (errorCaughtBrowser) {
                return module.exports &&
                    typeof process.versions.node === 'string' &&
                    typeof require('http').createServer === 'function' &&
                    'node';
            }
        }());
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        // init utility2_rollup
        local = local.global.utility2_rollup || local;
        // init lib
        local.local = local.apidoc = local;
        // init exports
        if (local.modeJs === 'browser') {
            local.global.utility2_apidoc = local;
        } else {
            module.exports = local;
            module.exports.__dirname = __dirname;
            module.exports.module = module;
        }
    }());



    // run shared js-env code - pre-function
    /* istanbul ignore next */
    (function () {
        local.assert = function (passed, message) {
        /*
         * this function will throw the error message if passed is falsey
         */
            var error;
            if (passed) {
                return;
            }
            error = message && message.message
                // if message is an error-object, then leave it as is
                ? message
                : new Error(typeof message === 'string'
                    // if message is a string, then leave it as is
                    ? message
                    // else JSON.stringify message
                    : JSON.stringify(message));
            throw error;
        };

        local.moduleDirname = function (module, modulePathList) {
        /*
         * this function will search modulePathList for the module's __dirname
         */
            var result, tmp;
            // search process.cwd()
            if (!module || module === '.' || module.indexOf('/') >= 0) {
                return require('path').resolve(process.cwd(), module || '');
            }
            // search builtin
            if (Object.keys(process.binding('natives')).indexOf(module) >= 0) {
                return module;
            }
            // search modulePathList
            [
                modulePathList,
                require('module').globalPaths
            ].some(function (modulePathList) {
                modulePathList.some(function (modulePath) {
                    try {
                        tmp = require('path').resolve(
                            process.cwd(),
                            modulePath + '/' + module
                        );
                        result = require('fs').statSync(tmp).isDirectory() && tmp;
                        return result;
                    } catch (ignore) {
                    }
                });
                return result;
            });
            return result || '';
        };

        local.nop = function () {
        /*
         * this function will do nothing
         */
            return;
        };

        local.objectSetDefault = function (arg, defaults, depth) {
        /*
         * this function will recursively set defaults for undefined-items in the arg
         */
            arg = arg || {};
            defaults = defaults || {};
            Object.keys(defaults).forEach(function (key) {
                var arg2, defaults2;
                arg2 = arg[key];
                // handle misbehaving getter
                try {
                    defaults2 = defaults[key];
                } catch (ignore) {
                }
                if (defaults2 === undefined) {
                    return;
                }
                // init arg[key] to default value defaults[key]
                if (!arg2) {
                    arg[key] = defaults2;
                    return;
                }
                // if arg2 and defaults2 are both non-null and non-array objects,
                // then recurse with arg2 and defaults2
                if (depth > 1 &&
                        // arg2 is a non-null and non-array object
                        arg2 &&
                        typeof arg2 === 'object' &&
                        !Array.isArray(arg2) &&
                        // defaults2 is a non-null and non-array object
                        defaults2 &&
                        typeof defaults2 === 'object' &&
                        !Array.isArray(defaults2)) {
                    // recurse
                    local.objectSetDefault(arg2, defaults2, depth - 1);
                }
            });
            return arg;
        };

        local.stringHtmlSafe = function (text) {
        /*
         * this function will make the text html-safe
         */
            // new RegExp('[' + '"&\'<>'.split('').sort().join('') + ']', 'g')
            return text.replace((/["&'<>]/g), function (match0) {
                return '&#x' + match0.charCodeAt(0).toString(16) + ';';
            });
        };

        local.templateRender = function (template, dict) {
        /*
         * this function will render the template with the given dict
         */
            var argList, getValue, match, renderPartial, rgx, value;
            dict = dict || {};
            getValue = function (key) {
                argList = key.split(' ');
                value = dict;
                // iteratively lookup nested values in the dict
                argList[0].split('.').forEach(function (key) {
                    value = value && value[key];
                });
                return value;
            };
            renderPartial = function (match0, helper, key, partial) {
                switch (helper) {
                case 'each':
                    value = getValue(key);
                    return Array.isArray(value)
                        ? value.map(function (dict) {
                            // recurse with partial
                            return local.templateRender(partial, dict);
                        }).join('')
                        : '';
                case 'if':
                    partial = partial.split('{{#unless ' + key + '}}');
                    partial = getValue(key)
                        ? partial[0]
                        // handle 'unless' case
                        : partial.slice(1).join('{{#unless ' + key + '}}');
                    // recurse with partial
                    return local.templateRender(partial, dict);
                case 'unless':
                    return getValue(key)
                        ? ''
                        // recurse with partial
                        : local.templateRender(partial, dict);
                default:
                    // recurse with partial
                    return match0[0] + local.templateRender(match0.slice(1), dict);
                }
            };
            // render partials
            rgx = (/\{\{#(\w+) ([^}]+?)\}\}/g);
            template = template || '';
            for (match = rgx.exec(template); match; match = rgx.exec(template)) {
                rgx.lastIndex += 1 - match[0].length;
                template = template.replace(
                    new RegExp('\\{\\{#(' + match[1] + ') (' + match[2] +
                        ')\\}\\}([\\S\\s]*?)\\{\\{/' + match[1] + ' ' + match[2] +
                        '\\}\\}'),
                    renderPartial
                );
            }
            // search for keys in the template
            return template.replace((/\{\{[^}]+?\}\}/g), function (match0) {
                getValue(match0.slice(2, -2));
                if (value === undefined) {
                    return match0;
                }
                argList.slice(1).forEach(function (arg) {
                    switch (arg) {
                    case 'alphanumeric':
                        value = value.replace((/\W/g), '_');
                        break;
                    case 'decodeURIComponent':
                        value = decodeURIComponent(value);
                        break;
                    case 'encodeURIComponent':
                        value = encodeURIComponent(value);
                        break;
                    case 'htmlSafe':
                        value = value.replace((/["&'<>]/g), function (match0) {
                            return '&#x' + match0.charCodeAt(0).toString(16) + ';';
                        });
                        break;
                    case 'jsonStringify':
                        value = JSON.stringify(value);
                        break;
                    case 'jsonStringify4':
                        value = JSON.stringify(value, null, 4);
                        break;
                    case 'markdownCodeSafe':
                        value = value.replace((/`/g), '\'');
                        break;
                    default:
                        value = value[arg]();
                        break;
                    }
                });
                return String(value);
            });
        };
    }());



    // run shared js-env code - pre-init
/* jslint-ignore-begin */
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
    >{{env.npm_package_name}} (v{{env.npm_package_version}})</a>\n\
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
    <li>description and source-code<pre class="apidocCodePre">{{source}}</pre></li>\n\
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

local.templateApidocMd = '\
{{#if header}} \
{{header}} \
{{#unless header}} \
# api documentation for \
{{#if env.npm_package_homepage}} \
[{{env.npm_package_name}} (v{{env.npm_package_version}})]({{env.npm_package_homepage}}) \
{{#unless env.npm_package_homepage}} \
{{env.npm_package_name}} (v{{env.npm_package_version}}) \
{{/if env.npm_package_homepage}} \
\n\
## {{env.npm_package_description}} \
\n\
{{/if header}} \
\n\
\n\
\n\
# <a name="apidoc.tableOfContents"></a>[table of contents](#apidoc.tableOfContents) \
{{#each moduleList}} \
\n\
\n\
#### [module {{name}}](#{{id}}) \
    {{#each elementList}} \
\n\
1. \
{{#if source}} \
[{{name}} {{signature}}](#{{id}}) \
{{#unless source}} \
{{name}} \
{{/if source}} \
{{/each elementList}} \
{{/each moduleList}} \
{{#each moduleList}} \
\n\
\n\
\n\
\n\
# <a name="{{id}}"></a>[module {{name}}](#{{id}}) \
{{#each elementList}} \
{{#if source}} \
\n\
\n\
#### <a name="{{id}}"></a>[{{name}} {{signature}}](#{{id}}) \
\n\
- description and source-code \
\n\
```javascript \
\n\
{{source markdownCodeSafe}} \
\n\
``` \
\n\
- example usage \
\n\
```shell \
\n\
{{example markdownCodeSafe}} \
\n\
``` \
{{/if source}} \
{{/each elementList}} \
{{/each moduleList}} \
\n\
\n\
\n\
\n\
# misc \
\n\
- this document was created with [utility2](https://github.com/kaizhu256/node-utility2) \
\n';
/* jslint-ignore-end */



    // run shared js-env code - function
    (function () {
        local.apidocCreate = function (options) {
        /*
         * this function will create the apidoc from options.dir
         */
            var elementCreate, module, moduleMain, readExample, tmp, trimLeft;
            elementCreate = function (module, prefix, key) {
            /*
             * this function will create the apidoc-element in the given module
             */
                var element;
                element = {};
                element.moduleName = prefix.split('.');
                // handle case where module is a function
                if (element.moduleName.slice(-1)[0] === key) {
                    element.moduleName.pop();
                }
                element.moduleName = element.moduleName.join('.');
                element.id = encodeURIComponent('apidoc.element.' + prefix + '.' + key);
                element.typeof = typeof module[key];
                element.name = (element.typeof + ' <span class="apidocSignatureSpan">' +
                    element.moduleName + '.</span>' + key)
                    // handle case where module is a function
                    .replace('>.<', '><');
                if (element.typeof !== 'function') {
                    return element;
                }
                // init source
                element.source = 'n/a';
                // bug-workaround - catch and ignore error
                // "Function.prototype.toString is not generic"
                try {
                    element.source = trimLeft(module[key].toString());
                } catch (ignore) {
                }
                if (element.source.length > 4096) {
                    element.source = element.source.slice(0, 4096).trimRight() + ' ...';
                }
                element.source = (options.template === local.templateApidocHtml
                    ? local.stringHtmlSafe(element.source)
                    : element.source)
                    .replace((/\([\S\s]*?\)/), function (match0) {
                        // init signature
                        element.signature = match0
                            .replace((/ *?\/\*[\S\s]*?\*\/ */g), '')
                            .replace((/,/g), ', ')
                            .replace((/\s+/g), ' ');
                        return element.signature;
                    })
                    .replace(
                        (/( *?\/\*[\S\s]*?\*\/\n)/),
                        '<span class="apidocCodeCommentSpan">$1</span>'
                    )
                    .replace((/^function \(/), key + ' = function (');
                // init example
                options.exampleList.some(function (example) {
                    example.replace(
                        new RegExp('((?:\n.*?){8}\\.)(' + key + ')(\\((?:.*?\n){8})'),
                        function (match0, match1, match2, match3) {
                            element.example = '...' + trimLeft(
                                options.template === local.templateApidocHtml
                                    ?  local.stringHtmlSafe(match1) +
                                        '<span class="apidocCodeKeywordSpan">' +
                                        local.stringHtmlSafe(match2) +
                                        '</span>' +
                                        local.stringHtmlSafe(match3)
                                    : match0
                            ).trimRight() + '\n...';
                        }
                    );
                    return element.example;
                });
                element.example = element.example || 'n/a';
                return element;
            };
            readExample = function (file) {
            /*
             * this function will read the example from the given file
             */
                try {
                    return ('\n\n\n\n\n\n\n\n' +
                        local.fs.readFileSync(local.path.resolve(options.dir, file), 'utf8') +
                        '\n\n\n\n\n\n\n\n').replace((/\r\n*/g), '\n');
                } catch (errorCaught) {
                    return '';
                }
            };
            trimLeft = function (text) {
            /*
             * this function will normalize the whitespace around the text
             */
                var whitespace;
                whitespace = '';
                text.trim().replace((/^ */gm), function (match0) {
                    if (!whitespace || match0.length < whitespace.length) {
                        whitespace = match0;
                    }
                });
                text = text.replace(new RegExp('^' + whitespace, 'gm'), '');
                // enforce 128 character column limit
                text = text.replace((/^.{128}[^\\\n]+/gm), function (match0) {
                    return match0.replace((/(.{128}(?:\b|\w+))/g), '$1\n').trimRight();
                });
                return text;
            };
            // init options
            options.dir = local.moduleDirname(
                options.dir,
                options.modulePathList || local.module.paths
            );
            local.objectSetDefault(options, {
                env: {},
                packageJson: JSON.parse(readExample('package.json'))
            });
            Object.keys(options.packageJson).forEach(function (key) {
                if (key[0] === '_') {
                    delete options.packageJson[key];
                } else if (typeof options.packageJson[key] === 'string') {
                    options.env['npm_package_' + key] = options.packageJson[key];
                }
            });
            local.objectSetDefault(options, {
                blacklistDict: { global: global },
                circularList: [global],
                exampleFileList: [],
                exampleList: [],
                html: '',
                libFileList: [],
                moduleDict: {},
                moduleExtraDict: {},
                template: local.templateApidocHtml
            });
            // init exampleList
            options.exampleList = options.exampleList.concat(options.exampleFileList.concat(
                local.fs.readdirSync(options.dir)
                    .sort()
                    .filter(function (file) {
                        return file.indexOf(options.env.npm_package_main) === 0 ||
                            (/^(?:readme)\b/i).test(file) ||
                            (/^(?:index|lib|test)\b.*\.js$/i).test(file);
                    })
            ).map(readExample));
            // init moduleMain
            try {
                moduleMain = {};
                moduleMain = options.moduleDict[options.env.npm_package_name] =
                    options.moduleDict[options.env.npm_package_name] ||
                    require(options.dir + (process.env.npm_package_buildNpmdocMain || ''));
            } catch (ignore) {
            }
            options.moduleDict[options.env.npm_package_name] = moduleMain;
            // init circularList - builtin
            Object.keys(process.binding('natives')).forEach(function (key) {
                if (!(/\/|_linklist|sys/).test(key)) {
                    options.blacklistDict[key] = options.blacklistDict[key] || require(key);
                }
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
            // cleanup circularList
            tmp = options.circularList;
            options.circularList = [];
            tmp.forEach(function (element) {
                if (options.circularList.indexOf(element) < 0) {
                    options.circularList.push(element);
                }
            });
            // init moduleDict child
            local.apidocModuleDictAdd(options, options.moduleDict);
            // init moduleExtraDict
            local.fs.readdirSync(options.dir).sort().forEach(function (file) {
                try {
                    local.fs.readdirSync(options.dir + '/' + file).sort().forEach(function (
                        file2
                    ) {
                        file2 = file + '/' + file2;
                        options.libFileList.push(file2);
                    });
                } catch (errorCaught) {
                    options.libFileList.push(file);
                }
            });
            module = options.moduleExtraDict[options.env.npm_package_name] =
                options.moduleExtraDict[options.env.npm_package_name] || {};
            options.libFileList.forEach(function (file) {
                try {
                    tmp = {};
                    tmp.name = local.path.basename(file)
                        .replace('lib.', '')
                        .replace((/\.[^.]*?$/), '')
                        .replace((/\W/g), '_');
                    [
                        tmp.name,
                        tmp.name[0].toUpperCase() + tmp.name.slice(1)
                    ].some(function (name) {
                        tmp.skip = local.path.extname(file) !== '.js' ||
                            file.indexOf(options.packageJson.main) >= 0 ||
                            new RegExp('(?:\\b|_)(?:archive|artifact|assets|' +
                                'bin|bower_component|build|' +
                                'cli|coverage' +
                                'doc|dist|' +
                                'example|external|' +
                                'fixture|' +
                                'index|' +
                                'log|' +
                                'min|mock|' +
                                'node_modules|' +
                                'rollup|' +
                                'test|tmp|' +
                                'vendor)(?:\\b|_)').test(file.toLowerCase()) ||
                            module[name];
                        return tmp.skip;
                    });
                    if (tmp.skip) {
                        return;
                    }
                    tmp.module = require(options.dir + '/' + file);
                    if (options.circularList.indexOf(tmp.module) >= 0) {
                        return;
                    }
                    module[tmp.name] = tmp.module;
                    // update exampleList
                    options.exampleList.push(readExample(file));
                } catch (ignore) {
                }
            });
            local.apidocModuleDictAdd(options, options.moduleExtraDict);
            // normalize moduleMain
            moduleMain = options.moduleDict[options.env.npm_package_name] =
                local.objectSetDefault({}, moduleMain);
            Object.keys(options.moduleDict).forEach(function (key) {
                if (key.indexOf(options.env.npm_package_name + '.') !== 0) {
                    return;
                }
                tmp = key.split('.').slice(1).join('.');
                moduleMain[tmp] = moduleMain[tmp] || options.moduleDict[key];
            });
            // init moduleList
            options.moduleList = Object.keys(options.moduleDict)
                .sort()
                .map(function (prefix) {
                    module = options.moduleDict[prefix];
                    // handle case where module is a function
                    if (typeof module === 'function') {
                        module[prefix.split('.').slice(-1)[0]] =
                            module[prefix.split('.').slice(-1)[0]] || module;
                    }
                    return {
                        elementList: Object.keys(module)
                            .filter(function (key) {
                                try {
                                    return key &&
                                        (/^\w[\w\-.]*?$/).test(key) &&
                                        key.indexOf('testCase_') !== 0 &&
                                        module[key] !== options.blacklistDict[key];
                                } catch (ignore) {
                                }
                            })
                            .map(function (key) {
                                return elementCreate(module, prefix, key);
                            })
                            .sort(function (aa, bb) {
                                return aa.name > bb.name
                                    ? 1
                                    : -1;
                            }),
                        id: encodeURIComponent('apidoc.module.' + prefix),
                        name: prefix
                    };
                });
            // render apidoc
            options.result = local.templateRender(options.template, options)
                .trim()
                .replace((/ +$/gm), '') + '\n';
            return options.result;
        };

        local.apidocModuleDictAdd = function (options, moduleDict) {
        /*
         * this function will add the modules in moduleDict to options.moduleDict
         */
            var isModule, tmp;
            ['child', 'prototype', 'grandchild', 'prototype'].forEach(function (element) {
                Object.keys(moduleDict).sort().forEach(function (prefix) {
                    if (!(/^\w[\w\-.]*?$/).test(prefix)) {
                        return;
                    }
                    Object.keys(moduleDict[prefix]).forEach(function (key) {
                        if (!(/^\w[\w\-.]*?$/).test(key)) {
                            return;
                        }
                        // bug-workaround - buggy electron accessors
                        try {
                            tmp = element === 'prototype'
                                ? {
                                    module: moduleDict[prefix][key].prototype,
                                    name: prefix + '.' + key + '.prototype'
                                }
                                : {
                                    module: moduleDict[prefix][key],
                                    name: prefix + '.' + key
                                };
                            if (!tmp.module ||
                                    !(typeof tmp.module === 'function' ||
                                    typeof tmp.module === 'object') ||
                                    options.moduleDict[tmp.name] ||
                                    options.circularList.indexOf(tmp.module) >= 0) {
                                return;
                            }
                            isModule = [
                                tmp.module,
                                tmp.module.prototype
                            ].some(function (dict) {
                                return Object.keys(dict || {}).some(function (key) {
                                    try {
                                        return typeof dict[key] === 'function';
                                    } catch (ignore) {
                                    }
                                });
                            });
                            if (!isModule) {
                                return;
                            }
                            options.circularList.push(tmp.module);
                            options.moduleDict[tmp.name] = tmp.module;
                        } catch (ignore) {
                        }
                    });
                });
            });
        };
    }());
    switch (local.modeJs) {



    // run node js-env code - post-init
    /* istanbul ignore next */
    case 'node':
        // require modules
        local.fs = require('fs');
        local.path = require('path');
        // run the cli
        if (module !== require.main || local.global.utility2_rollup) {
            break;
        }
        // jslint files
        process.stdout.write(local.apidocCreate({
            dir: process.argv[2],
            modulePathList: module.paths,
            template: process.argv[3] === '--markdown'
                ? local.templateApidocMd
                : local.templateApidocHtml
        }));
        break;
    }
}());
