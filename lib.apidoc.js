#!/usr/bin/env node
/* istanbul instrument in package apidoc */
/* jslint-utility2 */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run shared js-env code - init-before
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
        /* istanbul ignore next */
        if (!local) {
            local = local.global.utility2_rollup ||
                local.global.utility2_rollup_old ||
                require('./assets.utility2.rollup.js');
            local.fs = null;
        }
        // init exports
        if (local.modeJs === 'browser') {
            local.global.utility2_apidoc = local;
        } else {
            // require builtins
            Object.keys(process.binding('natives')).forEach(function (key) {
                if (!local[key] && !(/\/|^_|^sys$/).test(key)) {
                    local[key] = require(key);
                }
            });
            module.exports = local;
            module.exports.__dirname = __dirname;
        }
        // init lib
        local.local = local.apidoc = local;
    }());



    // run shared js-env code - function-before
    /* istanbul ignore next */
    (function () {
        local.assert = function (passed, message, onError) {
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
            // debug error
            local._debugAssertError = error;
            onError = onError || function (error) {
                throw error;
            };
            onError(error);
        };

        local.cliRun = function (fnc) {
        /*
         * this function will run the cli
         */
            var nop;
            nop = function () {
            /*
             * this function will do nothing
             */
                return;
            };
            local.cliDict._eval = local.cliDict._eval || function () {
            /*
             * code
             * eval code
             */
                local.global.local = local;
                require('vm').runInThisContext(process.argv[3]);
            };
            local.cliDict['--eval'] = local.cliDict['--eval'] || local.cliDict._eval;
            local.cliDict['-e'] = local.cliDict['-e'] || local.cliDict._eval;
            local.cliDict._help = local.cliDict._help || function () {
            /*
             * [none]
             * print help
             */
                var element, result, lengthList, sortDict;
                sortDict = {};
                result = [['[command]', '[args]', '[description]', -1]];
                lengthList = [result[0][0].length, result[0][1].length];
                Object.keys(local.cliDict).sort().forEach(function (key, ii) {
                    if (key[0] === '_' && key !== '_default') {
                        return;
                    }
                    sortDict[local.cliDict[key].toString()] =
                        sortDict[local.cliDict[key].toString()] || (ii + 1);
                    element = (/\n +\*(.*)\n +\*(.*)/).exec(local.cliDict[key].toString());
                    // coverage-hack - ignore else-statement
                    nop(local.global.__coverage__ && (function () {
                        element = element || ['', '', ''];
                    }()));
                    element = [
                        key.replace('_default', '[none]') + ' ',
                        element[1].trim() + ' ',
                        element[2].trim(),
                        (sortDict[local.cliDict[key].toString()] << 8) + ii
                    ];
                    result.push(element);
                    lengthList.forEach(function (length, jj) {
                        lengthList[jj] = Math.max(element[jj].length, length);
                    });
                });
                result.sort(function (aa, bb) {
                    return aa[3] < bb[3]
                        ? -1
                        : 1;
                });
                console.log('usage:   ' + __filename + ' [command] [args]');
                console.log('example: ' + __filename + ' --eval    ' +
                    '"console.log(\'hello world\')"\n');
                result.forEach(function (element, ii) {
                    lengthList.forEach(function (length, jj) {
                        while (element[jj].length < length) {
                            element[jj] += '-';
                        }
                    });
                    element = element.slice(0, 3).join('---- ');
                    if (ii === 0) {
                        element = element.replace((/-/g), ' ');
                    }
                    console.log(element);
                });
            };
            local.cliDict['--help'] = local.cliDict['--help'] || local.cliDict._help;
            local.cliDict['-h'] = local.cliDict['-h'] || local.cliDict._help;
            local.cliDict._default = local.cliDict._default || local.cliDict._help;
            local.cliDict.help = local.cliDict.help || local.cliDict._help;
            local.cliDict._interactive = local.cliDict._interactive || function () {
            /*
             * [none]
             * start interactive-mode
             */
                local.global.local = local;
                local.replStart();
            };
            if (local.replStart) {
                local.cliDict['--interactive'] = local.cliDict['--interactive'] ||
                    local.cliDict._interactive;
                local.cliDict['-i'] = local.cliDict['-i'] || local.cliDict._interactive;
            }
            // run fnc()
            fnc = fnc || function () {
                if (local.cliDict[process.argv[2]]) {
                    local.cliDict[process.argv[2]]();
                    return;
                }
                local.cliDict._default();
            };
            fnc();
        };

        local.moduleDirname = function (module, modulePathList) {
        /*
         * this function will search modulePathList for the module's __dirname
         */
            var result;
            // search process.cwd()
            if (!module || module === '.' || module.indexOf('/') >= 0) {
                return require('path').resolve(process.cwd(), module || '');
            }
            // search modulePathList
            ['node_modules']
                .concat(modulePathList)
                .concat(require('module').globalPaths)
                .concat([process.env.HOME + '/node_modules', '/usr/local/lib/node_modules'])
                .some(function (modulePath) {
                    try {
                        result = require('path').resolve(process.cwd(), modulePath + '/' + module);
                        result = require('fs').statSync(result).isDirectory() && result;
                        return result;
                    } catch (errorCaught) {
                        result = null;
                    }
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
                switch (arg2) {
                case '':
                case null:
                case undefined:
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
         * https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html
         */
            return text
                .replace((/"/g), '&quot;')
                .replace((/&/g), '&amp;')
                .replace((/'/g), '&apos;')
                .replace((/</g), '&lt;')
                .replace((/>/g), '&gt;')
                .replace((/&amp;(amp;|apos;|gt;|lt;|quot;)/ig), '&$1');
        };

        local.templateRender = function (template, dict, options) {
        /*
         * this function will render the template with the given dict
         */
            var argList, getValue, match, renderPartial, rgx, tryCatch, skip, value;
            dict = dict || {};
            options = options || {};
            getValue = function (key) {
                argList = key.split(' ');
                value = dict;
                if (argList[0] === '#this/') {
                    return;
                }
                // iteratively lookup nested values in the dict
                argList[0].split('.').forEach(function (key) {
                    value = value && value[key];
                });
                return value;
            };
            renderPartial = function (match0, helper, key, partial) {
                switch (helper) {
                case 'each':
                case 'eachTrimRightComma':
                    value = getValue(key);
                    value = Array.isArray(value)
                        ? value.map(function (dict) {
                            // recurse with partial
                            return local.templateRender(partial, dict, options);
                        }).join('')
                        : '';
                    // remove trailing-comma from last element
                    if (helper === 'eachTrimRightComma') {
                        value = value.trimRight().replace((/,$/), '');
                    }
                    return value;
                case 'if':
                    partial = partial.split('{{#unless ' + key + '}}');
                    partial = getValue(key)
                        ? partial[0]
                        // handle 'unless' case
                        : partial.slice(1).join('{{#unless ' + key + '}}');
                    // recurse with partial
                    return local.templateRender(partial, dict, options);
                case 'unless':
                    return getValue(key)
                        ? ''
                        // recurse with partial
                        : local.templateRender(partial, dict, options);
                default:
                    // recurse with partial
                    return match0[0] + local.templateRender(match0.slice(1), dict, options);
                }
            };
            tryCatch = function (fnc, message) {
            /*
             * this function will prepend the message to errorCaught
             */
                try {
                    return fnc();
                } catch (errorCaught) {
                    errorCaught.message = message + errorCaught.message;
                    throw errorCaught;
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
                var markdownToHtml, notHtmlSafe;
                notHtmlSafe = options.notHtmlSafe;
                return tryCatch(function () {
                    getValue(match0.slice(2, -2));
                    if (value === undefined) {
                        return match0;
                    }
                    argList.slice(1).forEach(function (arg, ii, list) {
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
                        case 'jsonStringify':
                            value = JSON.stringify(value);
                            break;
                        case 'jsonStringify4':
                            value = JSON.stringify(value, null, 4);
                            break;
                        case 'markdownSafe':
                            value = value.replace((/`/g), '\'');
                            break;
                        case 'markdownToHtml':
                            markdownToHtml = true;
                            break;
                        case 'notHtmlSafe':
                            notHtmlSafe = true;
                            break;
                        case 'truncate':
                            skip = ii + 1;
                            if (value.length > list[skip]) {
                                value = value.slice(0, list[skip] - 3).trimRight() + '...';
                            }
                            break;
                        // default to String.prototype[arg]()
                        default:
                            if (ii === skip) {
                                break;
                            }
                            value = value[arg]();
                            break;
                        }
                    });
                    value = String(value);
                    // default to htmlSafe
                    if (!notHtmlSafe) {
                        value = value
                            .replace((/"/g), '&quot;')
                            .replace((/&/g), '&amp;')
                            .replace((/'/g), '&apos;')
                            .replace((/</g), '&lt;')
                            .replace((/>/g), '&gt;')
                            .replace((/&amp;(amp;|apos;|gt;|lt;|quot;)/ig), '&$1');
                    }
                    if (markdownToHtml && typeof local.marked === 'function') {
                        value = local.marked(value)
                            .replace((/&amp;(amp;|apos;|gt;|lt;|quot;)/ig), '&$1');
                    }
                    return value;
                }, 'templateRender could not render expression ' + JSON.stringify(match0) + '\n');
            });
        };

        local.tryCatchOnError = function (fnc, onError) {
        /*
         * this function will try to run the fnc in a try-catch block,
         * else call onError with the errorCaught
         */
            var result;
            // validate onError
            local.assert(typeof onError === 'function', typeof onError);
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
/* jslint-ignore-end */



    // run shared js-env code - function
    (function () {
        local.apidocCreate = function (options) {
        /*
         * this function will create the apidoc from options.dir
         */
            var elementCreate, module, moduleMain, readExample, tmp, toString, trimLeft;
            elementCreate = function (module, prefix, key) {
            /*
             * this function will create the apidoc-element in the given module
             */
                var element;
                if (options.modeNoApidoc) {
                    return element;
                }
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
                element.source = local.stringHtmlSafe(trimLeft(toString(module[key])) || 'n/a')
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
                            // jslint-hack
                            local.nop(match0);
                            element.example = '...' + trimLeft(local.stringHtmlSafe(match1) +
                                '<span class="apidocCodeKeywordSpan">' +
                                local.stringHtmlSafe(match2) +
                                '</span>' +
                                local.stringHtmlSafe(match3)).trimRight() + '\n...';
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
                var result;
                local.tryCatchOnError(function () {
                    file = local.path.resolve(options.dir, file);
                    console.error('apidocCreate - readExample ' + file);
                    result = '';
                    result = ('\n\n\n\n\n\n\n\n' +
                        // bug-workaround - truncate example to manageable size
                        local.fs.readFileSync(file, 'utf8').slice(0, 262144) +
                        '\n\n\n\n\n\n\n\n').replace((/\r\n*/g), '\n');
                }, console.error);
                return result;
            };
            toString = function (value) {
            /*
             * this function will try to return the string form of the value
             */
                var result;
                local.tryCatchOnError(function () {
                    result = '';
                    result = String(value);
                }, console.error);
                return result;
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
                env: { npm_package_description: '' },
                packageJson: JSON.parse(readExample('package.json')),
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
                if (key[0] === '_' || key === 'readme') {
                    delete options.packageJson[key];
                } else if (typeof tmp === 'string') {
                    options.env['npm_package_' + key] = tmp;
                }
            });
            local.objectSetDefault(options, {
                blacklistDict: { global: global },
                circularList: [global],
                exampleDict: {},
                exampleList: [],
                html: '',
                libFileList: [],
                moduleDict: {},
                moduleExtraDict: {},
                packageJson: { bin: {} },
                template: local.templateApidocHtml,
                whitelistDict: {}
            }, 2);
            // init exampleList
            [1, 2, 3, 4].forEach(function (depth) {
                options.exampleList = options.exampleList.concat(
                    // find . -maxdepth 1 -mindepth 1 -name "*.js" -type f
                    // http://stackoverflow.com/questions/4509624/how-to-limit-depth-for-recursive-file-list
                    local.child_process.execSync('find "' + options.dir +
                        '" -maxdepth ' + depth + ' -mindepth ' + depth +
                        ' -type f | sed -e "s|' + options.dir +
                        '/||" | grep -iv ' +
/* jslint-ignore-begin */
'"\
/\\.\\|\\(\\b\\|_\\)\\(\
bower_component\\|\
coverage\\|\
git\\|\
min\\|\
node_module\\|\
rollup\\|\
tmp\\|\
vendor\\)s\\{0,1\\}\\(\\b\\|_\\)\
" ' +
/* jslint-ignore-end */
                            ' | sort | head -n 256').toString()
                        .split('\n')
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
                console.error('apidocCreate - requiring ' + options.dir + ' ...');
                moduleMain = {};
                moduleMain = options.moduleDict[options.env.npm_package_name] ||
                    options.require(options.dir) ||
                    options.require(options.dir + '/' +
                        (options.packageJson.bin)[Object.keys(options.packageJson.bin)[0]]) || {};
                options.circularList.push(moduleMain);
                console.error('apidocCreate - ... required ' + options.dir);
            }, console.error);
            tmp = {};
            // handle case where module is a function
            if (typeof moduleMain === 'function') {
                (function () {
                    var text;
                    text = toString(moduleMain);
                    tmp = function () {
                        return;
                    };
                    // coverage-hack
                    tmp();
                    Object.defineProperties(tmp, { toString: { get: function () {
                        return function () {
                            return text;
                        };
                    } } });
                }());
            }
            // normalize moduleMain
            moduleMain = options.moduleDict[options.env.npm_package_name] = local.objectSetDefault(
                tmp,
                moduleMain
            );
            // init circularList - builtin
            Object.keys(process.binding('natives')).forEach(function (key) {
                if (!(/\/|^_linklist$|^sys$/).test(key)) {
                    options.circularList.push(require(key));
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
                tmp = 'swgg.apiDict';
                tmp = options.moduleDict[tmp] = options.moduleDict[tmp] || {};
                tmp[key + '.ajax'] = moduleMain.swgg.apiDict[key] &&
                    moduleMain.swgg.apiDict[key].ajax;
            });
            // init moduleExtraDict
            module = options.moduleExtraDict[options.env.npm_package_name] =
                options.moduleExtraDict[options.env.npm_package_name] || {};
            [1, 2, 3, 4].forEach(function (depth) {
                options.libFileList = options.libFileList.concat(
                    // find . -maxdepth 1 -mindepth 1 -name "*.js" -type f
                    // http://stackoverflow.com/questions/4509624/how-to-limit-depth-for-recursive-file-list
                    local.child_process.execSync('find "' + options.dir +
                        '" -maxdepth ' + depth + ' -mindepth ' + depth +
                        ' -name "*.js" -type f | sed -e "s|' + options.dir +
                        '/||" | grep -iv ' +
/* jslint-ignore-begin */
'"\
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
" ' +
/* jslint-ignore-end */
                            ' | sort | head -n 256').toString()
                        .split('\n')
                );
            });
            options.ii = 256;
            options.libFileList.every(function (file) {
                local.tryCatchOnError(function () {
                    tmp = {};
                    tmp.name = local.path.basename(file)
                        .replace('lib.', '')
                        .replace((/\.[^.]*?$/), '')
                        .replace((/\W/g), '_');
                    [
                        tmp.name,
                        tmp.name.slice(0, 1).toUpperCase() + tmp.name.slice(1)
                    ].some(function (name) {
                        tmp.isFiltered = name && (!options.packageJson.main ||
                                ('./' + file).indexOf(options.packageJson.main) < 0) &&
                            !module[name];
                        return !tmp.isFiltered;
                    });
                    if (!tmp.isFiltered) {
                        return;
                    }
                    console.error('apidocCreate - libFile ' + file);
                    tmp.module = options.require(options.dir + '/' + file);
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
                        local.tryCatchOnError(function () {
                            module[prefix.split('.').slice(-1)[0]] =
                                module[prefix.split('.').slice(-1)[0]] || module;
                        }, console.error);
                    }
                    return {
                        elementList: Object.keys(module)
                            .filter(function (key) {
                                return local.tryCatchOnError(function () {
                                    return key &&
                                        (/^\w[\w\-.]*?$/).test(key) &&
                                        key.indexOf('testCase_') !== 0 &&
                                        (module[key] !== options.blacklistDict[key]
                                            || options.whitelistDict[key]);
                                }, console.error);
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
            options.result = local.templateRender(options.template, options, { notHtmlSafe: true })
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
                        // bug-workaround - buggy electron getter / setter
                        local.tryCatchOnError(function () {
                            if (!(/^\w[\w\-.]*?$/).test(key) || !moduleDict[prefix][key]) {
                                return;
                            }
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
                                    Array.isArray(tmp.module) ||
                                    options.moduleDict[tmp.name] ||
                                    options.circularList.indexOf(tmp.module) >= 0) {
                                return;
                            }
                            isModule = [
                                tmp.module,
                                tmp.module.prototype
                            ].some(function (dict) {
                                return Object.keys(dict || {}).some(function (key) {
                                    // bug-workaround - buggy electron getter / setter
                                    return local.tryCatchOnError(function () {
                                        return typeof dict[key] === 'function';
                                    }, console.error);
                                });
                            });
                            if (!isModule) {
                                return;
                            }
                            options.circularList.push(tmp.module);
                            options.moduleDict[tmp.name] = tmp.module;
                        }, console.error);
                    });
                });
            });
        };
    }());
    switch (local.modeJs) {



    // run node js-env code - init-after
    /* istanbul ignore next */
    case 'node':
        // init cli
        if (module !== require.main || local.global.utility2_rollup) {
            break;
        }
        local.cliDict = {};
        local.cliDict._default = function () {
        /*
         * moduleDirectory
         * create apidoc from moduleDirectory
         */
            // jslint files
            process.stdout.write(local.apidocCreate({
                dir: process.argv[2],
                modulePathList: module.paths
            }));
        };
        local.cliRun();
        break;
    }
}());
