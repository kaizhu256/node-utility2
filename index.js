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
(function (local) {
    'use strict';



    // run shared js-env code
    (function () {
        local._timeElapsedStop = function (options) {
            /*
             * this function will stop options.timeElapsed
             */
            if (options.timeElapsed > 0xffffffff) {
                options.timeElapsed = Date.now() - options.timeElapsed;
            }
        };

        local.utility2.assert = function (passed, message) {
            /*
             * this function will throw an error if the assertion fails
             */
            if (!passed) {
                // if message is an Error object, then throw it
                if (message && message.stack) {
                    throw message;
                }
                throw new Error(
                    // if message is a string, then leave it as is
                    typeof message === 'string'
                        ? message
                        // else JSON.stringify message
                        : JSON.stringify(message)
                );
            }
        };

        local.utility2.docApiCreate = function (options) {
            /*
             * this function will create an html api-doc from the given options
             */
            var element, elementCreate, elementName, module, moduleName, trimLeft;
            elementCreate = function () {
                element = {};
                element.id = encodeURIComponent('element.' + moduleName + '.' + elementName);
                element.name = 'function <span class="docApiSignatureSpan">' + moduleName +
                    '.</span>' + elementName;
                // init source
                element.source = trimLeft(module.exports[elementName].toString());
                if (element.source.length > 4096) {
                    element.source = element.source.slice(0, 4096).trimRight() + ' ...';
                }
                element.source = local.utility2.stringHtmlSafe(element.source)
                    .replace(
                        (/( *?\/\*[\S\s]*?\*\/\n)/),
                        '<span class="docApiCodeCommentSpan">$1</span>'
                    )
                    .replace((/^function \(/), elementName + ' = function (');
                // init example
                (module.aliasList || [moduleName]).forEach(function (moduleAlias) {
                    if (!element.example) {
                        options.example.replace(
                            new RegExp('((?:\n.*?){8}' + (moduleAlias === '.'
                                ? '\\.'
                                : moduleAlias
                                ? '\\b' + moduleAlias + '(?:\\([^\\)].*?\\)){0,1}\\.'
                                : '\\b') + ')(' + elementName +
                                ')(\\((?:.*?\n){8})'),
                            function (match0, match1, match2, match3) {
                                // jslint-hack
                                local.utility2.nop(match0);
                                element.example = '...' + trimLeft(
                                    local.utility2.stringHtmlSafe(match1) +
                                        '<span class="docApiCodeKeywordSpan">' + match2 +
                                        '</span>' + local.utility2.stringHtmlSafe(match3)
                                ).trimRight() + '\n...';
                            }
                        );
                    }
                });
                element.example = element.example || 'n/a';
                element.signature = (/\([\S\s]*?\)/).exec(element.source)[0];
                return element;
            };
            trimLeft = function (text) {
                var _;
                _ = '';
                text.trim().replace((/^ */gm), function (match0) {
                    if (!_ || match0.length < _.length) {
                        _ = match0;
                    }
                });
                return text.replace(new RegExp('^' + _, 'gm'), '');
            };
            options.moduleList = Object.keys(options.moduleDict)
                .sort()
                .map(function (key) {
                    moduleName = key;
                    // init alias
                    module = options.moduleDict[moduleName];
                    return {
                        elementList: Object.keys(module.exports)
                            .filter(function (key) {
                                try {
                                    return key &&
                                        key[0] !== '$' &&
                                        key[0] !== '_' &&
                                        typeof module.exports[key] === 'function';
                                } catch (ignore) {
                                }
                            })
                            .sort()
                            .map(function (key) {
                                elementName = key;
                                return elementCreate();
                            }),
                        id: 'module.' + moduleName,
                        name: moduleName
                    };
                });
            return local.utility2.stringFormat(
                local.utility2['/doc/doc.html.template'],
                options
            );
        };

        local.utility2.errorMessagePrepend = function (error, message) {
            /*
             * this function will prepend the message to error.message and error.stack
             */
            error.message = message + error.message;
            // phantomjs-hack - try to prepend message to error.stack
            try {
                error.stack = message + error.stack;
            } catch (ignore) {
            }
            return error;
        };

        /* istanbul ignore next */
        local.utility2.exit = function (exitCode) {
            /*
             * this function will exit the current process with the given exitCode
             */
            switch (local.modeJs) {
            case 'browser':
                // throw global_test_results as an error,
                // so it can be caught and passed to the phantom js-env
                switch (local.utility2.modeTest) {
                case 'phantom':
                    throw new Error('\nphantom\n' + JSON.stringify({
                        global_test_results:
                            local.global.global_test_results
                    }) + '\n');
                }
                break;
            case 'node':
                process.exit(exitCode);
                break;
            case 'phantom':
                if (local.modeExit) {
                    return;
                }
                local.modeExit = true;
                // run phantom self-test
                if (local.utility2.modePhantomSelfTest) {
                    // test string error with no trace handling-behavior
                    local.onError('error', null);
                    // test string error
                    // with trace-function and trace-sourceUrl handling-behavior
                    local.onError('error', [{ function: true, sourceUrl: true }]);
                    // test default error handling-behavior
                    local.onError(local.utility2.errorDefault);
                }
                if (local.global.__coverage__) {
                    local.fs.write(
                        local.utility2.fileCoverage,
                        JSON.stringify(local.global.__coverage__)
                    );
                }
                local.global.phantom.exit(exitCode);
                break;
            }
        };

        local.utility2.istanbulMerge = function (coverage1, coverage2) {
            /*
             * this function will merge coverage2 into coverage1
             */
            var dict1, dict2;
            coverage1 = coverage1 || {};
            coverage2 = coverage2 || {};
            Object.keys(coverage2).forEach(function (file) {
                // if file is undefined in coverage1, then add it
                if (!coverage1[file]) {
                    coverage1[file] = coverage2[file];
                    return;
                }
                // merge file from coverage2 into coverage1
                ['b', 'f', 's'].forEach(function (key) {
                    dict1 = coverage1[file][key];
                    dict2 = coverage2[file][key];
                    switch (key) {
                    // increment coverage for branch lines
                    case 'b':
                        Object.keys(dict2).forEach(function (key) {
                            dict2[key].forEach(function (count, ii) {
                                dict1[key][ii] = dict1[key][ii]
                                    ? dict1[key][ii] + count
                                    : count;
                            });
                        });
                        break;
                    // increment coverage for function and statement lines
                    case 'f':
                    case 's':
                        Object.keys(dict2).forEach(function (key) {
                            dict1[key] = dict1[key]
                                ? dict1[key] + dict2[key]
                                : dict2[key];
                        });
                        break;
                    }
                });
            });
            return coverage1;
        };

        local.utility2.jsonCopy = function (element) {
            /*
             * this function will return a deep-copy of the JSON element
             */
            return element === undefined
                ? undefined
                : JSON.parse(JSON.stringify(element));
        };

        local.utility2.jsonStringifyOrdered = function (element, replacer, space) {
            /*
             * this function will JSON.stringify the element with dictionaries in sorted order,
             * for testing purposes
             */
            var circularList, stringify, tmp;
            stringify = function (element) {
                /*
                 * this function will recursively stringify the element,
                 * with object-keys sorted and circular-references removed
                 */
                // if element is an object,
                // then recursively stringify its items sorted by their keys
                if (element && typeof element === 'object') {
                    // remove circular-reference
                    if (circularList.indexOf(element) >= 0) {
                        return;
                    }
                    circularList.push(element);
                    // if element is an array, then recursively stringify its elements
                    if (Array.isArray(element)) {
                        return '[' + element.map(function (element) {
                            tmp = stringify(element);
                            return typeof tmp === 'string'
                                ? tmp
                                : 'null';
                        }).join(',') + ']';
                    }
                    return '{' + Object.keys(element)
                        .sort()
                        .map(function (key) {
                            tmp = stringify(element[key]);
                            return typeof tmp === 'string'
                                ? JSON.stringify(key) + ':' + tmp
                                : undefined;
                        })
                        .filter(function (element) {
                            return typeof element === 'string';
                        })
                        .join(',') + '}';
                }
                // else JSON.stringify normally
                return JSON.stringify(element);
            };
            circularList = [];
            return JSON.stringify(element && typeof element === 'object'
                ? JSON.parse(stringify(element))
                : element,
                replacer,
                space);
        };

        local.utility2.listShuffle = function (list) {
            /*
             * this function will inplace shuffle the list, via fisher-yates algorithm
             * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
             */
            var ii, random, swap;
            for (ii = list.length - 1; ii > 0; ii -= 1) {
                // coerce to finite integer
                random = (Math.random() * ii) | 0;
                swap = list[ii];
                list[ii] = list[random];
                list[random] = swap;
            }
            return list;
        };

        local.utility2.nop = function () {
            /*
             * this function will run no operation - nop
             */
            return;
        };

        local.utility2.objectSetDefault = function (options, defaults, depth) {
            /*
             * this function will recursively set default values for unset leaf nodes
             * in the options object
             */
            Object.keys(defaults).forEach(function (key) {
                var defaults2, options2;
                defaults2 = defaults[key];
                options2 = options[key];
                // init options[key] to default value defaults[key]
                if (options2 === undefined) {
                    options[key] = defaults2;
                    return;
                }
                // if options2 and defaults2 are both non-null and non-array objects,
                // then recurse options2 and defaults2
                if (depth > 1 &&
                        // options2 is a non-null and non-array object
                        options2 &&
                        typeof options2 === 'object' &&
                        !Array.isArray(options2) &&
                        // defaults2 is a non-null and non-array object
                        defaults2 &&
                        typeof defaults2 === 'object' &&
                        !Array.isArray(defaults2)) {
                    local.utility2.objectSetDefault(options2, defaults2, depth - 1);
                }
            });
            return options;
        };

        local.utility2.objectSetOverride = function (options, override, depth) {
            /*
             * this function will recursively override the options object,
             * with the override object
             */
            var options2, override2;
            Object.keys(override).forEach(function (key) {
                options2 = options[key];
                override2 = override[key];
                // if both options2 and override2 are non-null and non-array objects,
                // then recurse options2 and override2
                if (depth > 1 &&
                        // options2 is a non-null and non-array object
                        (options2 &&
                        typeof options2 === 'object' &&
                        !Array.isArray(options2)) &&
                        // override2 is a non-null and non-array object
                        (override2 &&
                        typeof override2 === 'object' &&
                        !Array.isArray(override2))) {
                    local.utility2.objectSetOverride(options2, override2, depth - 1);
                    return;
                }
                // else set options[key] with override[key]
                options[key] = options === local.utility2.envDict
                    // if options is envDict, then override falsey value with empty string
                    ? override2 || ''
                    : override2;
            });
            return options;
        };

        local.utility2.objectTraverse = function (element, onSelf, circularList) {
            /*
             * this function will recursively traverse the element,
             * and call onSelf on the element's properties
             */
            onSelf(element);
            circularList = circularList || [];
            if (element &&
                    typeof element === 'object' &&
                    circularList.indexOf(element) === -1) {
                circularList.push(element);
                Object.keys(element).forEach(function (key) {
                    local.utility2.objectTraverse(element[key], onSelf, circularList);
                });
            }
            return element;
        };

        local.utility2.onErrorDefault = function (error) {
            /*
             * this function will print error.stack or error.message to stderr
             */
            // if error is defined, then print error.stack
            if (error && !local.global.__coverage__) {
                console.error('\nonErrorDefault - error\n' +
                    error.message + '\n' + error.stack + '\n');
            }
        };

        local.utility2.onErrorJsonParse = function (onError, modeDebug) {
            /*
             * this function will return a wrapper function,
             * that will JSON.parse the data with error handling
             */
            return function (error, data) {
                if (error) {
                    onError(error);
                    return;
                }
                try {
                    if (modeDebug) {
                        console.log('JSON.parse - ' + JSON.stringify(data));
                    }
                    data = JSON.parse(data);
                } catch (errorCaught) {
                    onError(new Error('JSON.parse failed - ' + errorCaught.message));
                    return;
                }
                onError(null, data);
            };
        };

        local.utility2.onErrorWithStack = function (onError) {
            /*
             * this function will return a new callback that calls onError,
             * and append the current stack to any error
             */
            var errorStack;
            try {
                throw new Error();
            } catch (errorCaught) {
                errorStack = errorCaught.stack;
            }
            return function (error) {
                if (error) {
                    // phantomjs-hack - try to append errorStack to error.stack
                    try {
                        error.stack = error.stack
                            ? error.stack + '\n' + errorStack
                            : errorStack;
                    } catch (ignore) {
                    }
                }
                onError.apply(null, arguments);
            };
        };

        local.utility2.onParallel = function (onError, onDebug) {
            /*
             * this function will return a function that will
             * 1. runs async tasks in parallel
             * 2. if counter === 0 or error occurs, then call onError
             */
            var self;
            onDebug = onDebug || local.utility2.nop;
            self = function (error) {
                local.utility2.onErrorWithStack(function (error) {
                    onDebug(error, self);
                    // if counter === 0 or error already occurred, then return
                    if (self.counter === 0 || self.error) {
                        return;
                    }
                    // handle error
                    if (error) {
                        self.error = error;
                        // ensure counter will decrement to 0
                        self.counter = 1;
                    }
                    // decrement counter
                    self.counter -= 1;
                    // if counter === 0, then call onError with error
                    if (self.counter === 0) {
                        onError(error);
                    }
                })(error);
            };
            // init counter
            self.counter = 0;
            // return callback
            return self;
        };

        local.utility2.onReadyInit = function () {
            /*
             * this function will create the deferred task utility2.onReady
             */
            // init onReady
            local.utility2.taskRunOrSubscribe({
                key: 'utility2.onReady',
                onTask: function (onError) {
                    local.utility2.onReady = local.utility2.onParallel(onError);
                    local.utility2.onReady.counter += 1;
                    setTimeout(local.utility2.onReady);
                }
            }, function (error) {
                // validate no error occurred
                local.utility2.assert(!error, error);
            });
        };

        local.utility2.onTimeout = function (onError, timeout, message) {
            /*
             * this function will create a timeout-error-handler,
             * that will append the current stack to any error
             */
            onError = local.utility2.onErrorWithStack(onError);
            // create timeout timer
            return setTimeout(function () {
                onError(new Error('onTimeout - timeout-error - ' +
                    timeout + ' ms - ' +
                    message));
            // coerce to finite integer
            }, timeout | 0);
        };

        local.utility2.requestResponseCleanup = function (request, response) {
            /*
             * this function will end or destroy the request and response objects
             */
            [request, response].forEach(function (stream) {
                // try to end the stream
                try {
                    stream.end();
                // if error, then try to destroy the stream
                } catch (errorCaught) {
                    try {
                        stream.destroy();
                    } catch (ignore) {
                    }
                }
            });
        };

        local.utility2.stringFormat = function (template, dict, valueDefault) {
            /*
             * this function will replace the keys in the template with the dict's key / value
             */
            var argList, match, replace, rgx, value;
            dict = dict || {};
            replace = function (match0, fragment) {
                // jslint-hack
                local.utility2.nop(match0);
                return dict[match].map(function (dict) {
                    // recursively format the array fragment
                    return local.utility2.stringFormat(
                        fragment,
                        dict,
                        valueDefault
                    );
                }).join('');
            };
            rgx = (/\{\{#[^}]+?\}\}/g);
            while (true) {
                // search for array fragments in the template
                match = rgx.exec(template);
                if (!match) {
                    break;
                }
                match = match[0].slice(3, -2);
                // if value is an array, then iteratively format the array fragment with it
                if (Array.isArray(dict[match])) {
                    template = template.replace(
                        new RegExp('\\{\\{#' + match +
                            '\\}\\}([\\S\\s]*?)\\{\\{\\/' + match +
                            '\\}\\}'),
                        replace
                    );
                }
            }
            // search for keys in the template
            return template.replace((/\{\{[^}]+?\}\}/g), function (match0) {
                argList = match0.slice(2, -2).split(' ');
                value = dict;
                // iteratively lookup nested values in the dict
                argList[0].split('.').forEach(function (key) {
                    value = value && value[key];
                });
                if (value === undefined) {
                    return valueDefault === undefined
                        ? match0
                        : valueDefault;
                }
                argList.slice(1).forEach(function (arg) {
                    switch (arg) {
                    case 'encodeURIComponent':
                        value = encodeURIComponent(value);
                        break;
                    case 'htmlSafe':
                        value = local.utility2.stringHtmlSafe(String(value));
                        break;
                    case 'json':
                        value = JSON.stringify(value);
                        break;
                    }
                });
                return String(value);
            });
        };

        local.utility2.stringHtmlSafe = function (text) {
            /*
             * this function will replace '<' to '&lt;' and '>' to '&gt;' in the text,
             * to make it htmlSafe
             */
            return text.replace((/</g), '&lt;').replace((/>/g), '&gt;');
        };

        local.utility2.taskRunCached = function (options, onError) {
            /*
             * this function will try to run onError from cache,
             * and auto-update the cache with a background-task
             */
            var modeCacheHit, modeNext, onNext, onParallel;
            modeNext = 0;
            onNext = function (error, data) {
                modeNext += 1;
                switch (modeNext) {
                case 1:
                    options.keyFile = options.modeCacheFile + '/' +
                        encodeURIComponent(options.cacheDict) + '/' +
                        encodeURIComponent(options.key);
                    if (options.modeCacheMemory) {
                        modeCacheHit = 'memory';
                        // read cacheValue from memory-cache
                        local.utility2.cacheDict[options.cacheDict] =
                            local.utility2.cacheDict[options.cacheDict] || {};
                        options.cacheValue =
                            local.utility2.cacheDict[options.cacheDict][options.key];
                        if (options.cacheValue) {
                            onNext(null, options.cacheValue);
                            return;
                        }
                    }
                    // read cacheValue from file-cache
                    if (options.modeCacheFile) {
                        modeCacheHit = 'file';
                        local.utility2.taskRunOrSubscribe({
                            key: options.keyFile + '/file/read',
                            onTask: function (onError) {
                                local.fs.readFile(options.keyFile, 'utf8', onError);
                            }
                        }, onNext);
                        return;
                    }
                    onNext();
                    return;
                case 2:
                    options.cacheValue = !error && data;
                    if (options.cacheValue) {
                        options.modeCacheHit = modeCacheHit;
                        // call onError with cacheValue
                        onError(null, JSON.parse(options.cacheValue));
                        if (!options.modeCacheUpdate) {
                            return;
                        }
                    }
                    // run background-task with lower priority for cache-hit
                    setTimeout(onNext, options.cacheValue && options.cacheTtl);
                    return;
                case 3:
                    // run background-task
                    local.utility2.taskRunOrSubscribe(options, onNext);
                    return;
                case 4:
                    onParallel = local.utility2
                        .onParallel(options.onCacheWrite || local.utility2.onErrorDefault);
                    onParallel.counter += 1;
                    // JSON.stringify data to prevent side-effects on cache
                    options.cacheValue = JSON.stringify(data);
                    if (!error && options.cacheValue) {
                        // save cacheValue to memory-cache
                        if (options.modeCacheMemory) {
                            onParallel.counter += 1;
                            local.utility2.cacheDict[options.cacheDict][options.key] =
                                options.cacheValue;
                            onParallel();
                        }
                        // save cacheValue to file-cache
                        if (options.modeCacheFile) {
                            onParallel.counter += 1;
                            local.utility2.taskRunOrSubscribe({
                                key: options.keyFile + '/file/write',
                                onTask: function (onError) {
                                    local.utility2.fsWriteFileWithMkdirp(
                                        options.keyFile,
                                        options.cacheValue,
                                        onError
                                    );
                                }
                            }, onParallel);
                        }
                    }
                    // if cache-miss, then call onError with cacheValue
                    if (!options.modeCacheHit) {
                        onError(error, options.cacheValue && JSON.parse(options.cacheValue));
                    }
                    onParallel();
                    return;
                }
            };
            onNext();
        };

        local.utility2.taskRunOrSubscribe = function (options, onError) {
            /*
             * this function will
             * 1. if task is undefined, create new task with the given options.key
             * 2. subscribe onError to the task
             * 3. run task.onTask with timeout-error-handler, and cleanup task when finished
             */
            var task;
            // init taskRunOrSubscribe
            local.utility2.cacheDict.taskRunOrSubscribe =
                local.utility2.cacheDict.taskRunOrSubscribe || {};
            // 1. if task is undefined, create new task with the given options.key
            task = local.utility2.cacheDict.taskRunOrSubscribe[options.key];
            if (!task) {
                task = local.utility2.cacheDict.taskRunOrSubscribe[options.key] = {};
                task.callbackList = [];
                task.onEnd = function () {
                    // if already done, then do nothing
                    if (task.done) {
                        return;
                    }
                    task.done = true;
                    // cleanup timerTimeout
                    clearTimeout(task.timerTimeout);
                    // cleanup task
                    delete local.utility2.cacheDict.taskRunOrSubscribe[options.key];
                    // preserve error.message and error.stack
                    task.result = JSON.stringify(Array.prototype.slice.call(
                        arguments
                    ).map(function (element) {
                        if (element && element.stack) {
                            element = local.utility2.objectSetDefault(local.utility2
                                .jsonCopy(element), {
                                    message: element.message,
                                    name: element.name,
                                    stack: element.stack
                                });
                        }
                        return element;
                    }));
                    // pass result to callbacks in callbackList
                    task.callbackList.forEach(function (onError) {
                        onError.apply(null, JSON.parse(task.result));
                    });
                };
                // init timerTimeout
                task.timerTimeout = local.utility2.onTimeout(
                    task.onEnd,
                    options.timeout || local.utility2.timeoutDefault,
                    'taskRunOrSubscribe ' + options.key
                );
            }
            // 2. subscribe onError to the task
            if (onError) {
                task.callbackList.push(local.utility2.onErrorWithStack(onError));
            }
            // 3. run task.onTask with timeout-error-handler, and cleanup task when finished
            if (!task.onTask && options.onTask) {
                task.onTask = options.onTask;
                // run onTask
                task.onTask(task.onEnd);
            }
        };

        local.utility2.testMock = function (mockList, onTestCase, onError) {
            /*
             * this function will mock the objects in mockList while running the onTestCase
             */
            var onError2;
            onError2 = function (error) {
                // restore mock[0] from mock[2]
                mockList.reverse().forEach(function (mock) {
                    local.utility2.objectSetOverride(mock[0], mock[2]);
                });
                onError(error);
            };
            // run onError callback in mocked objects in a try-catch block
            local.utility2.testTryCatch(function () {
                // mock objects
                mockList.forEach(function (mock) {
                    mock[2] = {};
                    // backup mock[0] into mock[2]
                    Object.keys(mock[1]).forEach(function (key) {
                        mock[2][key] = mock[0][key];
                    });
                    // override mock[0] with mock[1]
                    local.utility2.objectSetOverride(mock[0], mock[1]);
                });
                // run onTestCase
                onTestCase(onError2);
            }, onError2);
        };

        local.utility2.testMerge = function (testReport1, testReport2) {
            /*
             * this function will
             * 1. merge testReport2 into testReport1
             * 2. return testReport1 in html-format
             */
            var errorStackList, testCaseNumber, testReport;
            // 1. merge testReport2 into testReport1
            [testReport1, testReport2].forEach(function (testReport, ii) {
                ii += 1;
                local.utility2.objectSetDefault(testReport, {
                    date: new Date().toISOString(),
                    errorStackList: [],
                    testPlatformList: [],
                    timeElapsed: 0
                }, 8);
                // security - handle malformed testReport
                local.utility2.assert(
                    testReport && typeof testReport === 'object',
                    ii + ' invalid testReport ' + typeof testReport
                );
                local.utility2.assert(
                    typeof testReport.timeElapsed === 'number',
                    ii + ' invalid testReport.timeElapsed ' + typeof testReport.timeElapsed
                );
                // security - handle malformed testReport.testPlatformList
                testReport.testPlatformList.forEach(function (testPlatform) {
                    local.utility2.objectSetDefault(testPlatform, {
                        name: 'undefined',
                        testCaseList: [],
                        timeElapsed: 0
                    }, 8);
                    local.utility2.assert(
                        typeof testPlatform.name === 'string',
                        ii + ' invalid testPlatform.name ' + typeof testPlatform.name
                    );
                    // insert $MODE_BUILD into testPlatform.name
                    if (local.utility2.envDict.MODE_BUILD) {
                        testPlatform.name = testPlatform.name.replace(
                            (/^(browser|node|phantom|slimer)\b/),
                            local.utility2.envDict.MODE_BUILD + ' - $1'
                        );
                    }
                    local.utility2.assert(
                        typeof testPlatform.timeElapsed === 'number',
                        ii + ' invalid testPlatform.timeElapsed ' +
                            typeof testPlatform.timeElapsed
                    );
                    // security - handle malformed testPlatform.testCaseList
                    testPlatform.testCaseList.forEach(function (testCase) {
                        local.utility2.objectSetDefault(testCase, {
                            errorStack: '',
                            name: 'undefined',
                            timeElapsed: 0
                        }, 8);
                        local.utility2.assert(
                            typeof testCase.errorStack === 'string',
                            ii + ' invalid testCase.errorStack ' + typeof testCase.errorStack
                        );
                        local.utility2.assert(
                            typeof testCase.name === 'string',
                            ii + ' invalid testCase.name ' + typeof testCase.name
                        );
                        local.utility2.assert(
                            typeof testCase.timeElapsed === 'number',
                            ii + ' invalid testCase.timeElapsed ' + typeof testCase.timeElapsed
                        );
                    });
                });
            });
            // merge testReport2.testPlatformList into testReport1.testPlatformList
            testReport2.testPlatformList.forEach(function (testPlatform2) {
                // add testPlatform2 to testReport1.testPlatformList
                testReport1.testPlatformList.push(testPlatform2);
            });
            // update testReport1.timeElapsed
            if (testReport1.timeElapsed < 0xffffffff) {
                testReport1.timeElapsed += testReport2.timeElapsed;
            }
            testReport = testReport1;
            testReport.testsFailed = 0;
            testReport.testsPassed = 0;
            testReport.testsPending = 0;
            testReport.testPlatformList.forEach(function (testPlatform) {
                testPlatform.testsFailed = 0;
                testPlatform.testsPassed = 0;
                testPlatform.testsPending = 0;
                testPlatform.testCaseList.forEach(function (testCase) {
                    // update failed tests
                    if (testCase.errorStack) {
                        testCase.status = 'failed';
                        testPlatform.testsFailed += 1;
                        testReport.testsFailed += 1;
                    // update passed tests
                    } else if (testCase.timeElapsed < 0xffffffff) {
                        testCase.status = 'passed';
                        testPlatform.testsPassed += 1;
                        testReport.testsPassed += 1;
                    // update pending tests
                    } else {
                        testCase.status = 'pending';
                        testPlatform.testsPending += 1;
                        testReport.testsPending += 1;
                    }
                });
                // update testPlatform.status
                testPlatform.status = testPlatform.testsFailed
                    ? 'failed'
                    : testPlatform.testsPending
                    ? 'pending'
                    : 'passed';
                // sort testCaseList by status and name
                testPlatform.testCaseList.sort(function (arg1, arg2) {
                    arg1 = arg1.status
                        .replace('passed', 'z') + arg1.name.toLowerCase();
                    arg2 = arg2.status
                        .replace('passed', 'z') + arg2.name.toLowerCase();
                    return arg1 <= arg2
                        ? -1
                        : 1;
                });
            });
            // sort testPlatformList by status and name
            testReport.testPlatformList.sort(function (arg1, arg2) {
                arg1 = arg1.status
                    .replace('passed', 'z') + arg1.name.toLowerCase();
                arg2 = arg2.status
                    .replace('passed', 'z') + arg2.name.toLowerCase();
                return arg1 <= arg2
                    ? -1
                    : 1;
            });
            // stop testReport timer
            if (testReport.testsPending === 0) {
                local._timeElapsedStop(testReport);
            }
            // 2. return testReport1 in html-format
            // json-copy testReport that will be modified for html templating
            testReport = local.utility2.jsonCopy(testReport1);
            // update timeElapsed
            local._timeElapsedStop(testReport);
            testReport.testPlatformList.forEach(function (testPlatform) {
                local._timeElapsedStop(testPlatform);
                testPlatform.testCaseList.forEach(function (testCase) {
                    local._timeElapsedStop(testCase);
                    testPlatform.timeElapsed = Math.max(
                        testPlatform.timeElapsed,
                        testCase.timeElapsed
                    );
                });
                // update testReport.timeElapsed with testPlatform.timeElapsed
                testReport.timeElapsed =
                    Math.max(testReport.timeElapsed, testPlatform.timeElapsed);
            });
            // create html test-report
            testCaseNumber = 0;
            return local.utility2.stringFormat(
                local.utility2['/test/test-report.html.template'],
                local.utility2.objectSetOverride(testReport, {
                    CI_COMMIT_INFO: local.utility2.envDict.CI_COMMIT_INFO,
                    envDict: local.utility2.envDict,
                    // map testPlatformList
                    testPlatformList: testReport.testPlatformList
                        .filter(function (testPlatform) {
                            // if testPlatform has no tests, then filter it out
                            return testPlatform.testCaseList.length;
                        })
                        .map(function (testPlatform, ii) {
                            errorStackList = [];
                            return local.utility2.objectSetOverride(testPlatform, {
                                errorStackList: errorStackList,
                                name: testPlatform.name,
                                screenCapture: testPlatform.screenCaptureImg
                                    ? '<a href="' + testPlatform.screenCaptureImg + '">' +
                                        '<img ' +
                                        'class="testReportPlatformScreenCaptureImg" ' +
                                        'src="' + testPlatform.screenCaptureImg + '">' +
                                        '</a><br>'
                                    : '',
                                // map testCaseList
                                testCaseList: testPlatform.testCaseList.map(function (
                                    testCase
                                ) {
                                    testCaseNumber += 1;
                                    if (testCase.errorStack) {
                                        errorStackList.push({
                                            errorStack: testCaseNumber + '. ' + testCase.name +
                                                '\n' + testCase.errorStack
                                        });
                                    }
                                    return local.utility2.objectSetOverride(testCase, {
                                        testCaseNumber: testCaseNumber,
                                        testReportTestStatusClass: 'testReportTest' +
                                            testCase.status[0].toUpperCase() +
                                            testCase.status.slice(1)
                                    }, 8);
                                }),
                                testReportPlatformPreClass:
                                    'testReportPlatformPre' + (errorStackList.length
                                    ? ''
                                    : 'Hidden'),
                                testPlatformNumber: ii + 1
                            });
                        }, 8),
                    testsFailedClass: testReport.testsFailed
                        ? 'testReportTestFailed'
                        : 'testReportTestPassed'
                }, 8),
                'undefined'
            );
        };

        local.utility2.testRun = function (options) {
            /*
             * this function will run all tests in testPlatform.testCaseList
             */
            var coverageReportCreate,
                exit,
                onParallel,
                separator,
                testPlatform,
                testReport,
                testReportDiv,
                testReportHtml,
                timerInterval;
            // init modeTest
            options = options || {};
            local.utility2.modeTest = local.utility2.modeTest ||
                local.utility2.envDict.npm_config_mode_npm_test;
            if (!(local.utility2.modeTest || options.modeTest)) {
                return;
            }
            if (!options.onReady) {
                options.onReady = function () {
                    local.utility2.testRun(options);
                };
                local.utility2.taskRunOrSubscribe({
                    key: 'utility2.onReady'
                }, options.onReady);
                return;
            }
            // init onParallel
            onParallel = local.utility2.onParallel(function () {
                /*
                 * this function will create the test-report after all tests have finished
                 */
                // restore exit
                switch (local.modeJs) {
                case 'node':
                    process.exit = exit;
                    break;
                }
                // init new-line separator
                separator = new Array(56).join('-');
                // stop testPlatform timer
                local._timeElapsedStop(testPlatform);
                // create testReportHtml
                testReportHtml = local.utility2.testMerge(testReport, {});
                // print test-report summary
                console.log('\n' + separator +
                    '\n' + testReport.testPlatformList
                    .filter(function (testPlatform) {
                        // if testPlatform has no tests, then filter it out
                        return testPlatform.testCaseList.length;
                    })
                    .map(function (testPlatform) {
                        return '| test-report - ' + testPlatform.name + '\n|' +
                            ('        ' + testPlatform.timeElapsed + ' ms     ')
                            .slice(-16) +
                            ('        ' + testPlatform.testsFailed + ' failed ')
                            .slice(-16) +
                            ('        ' + testPlatform.testsPassed + ' passed ')
                            .slice(-16) +
                            '     |\n' + separator;
                    })
                    .join('\n') + '\n');
                switch (local.modeJs) {
                case 'browser':
                    // notify saucelabs of test results
                    // https://docs.saucelabs.com/reference/rest-api/
                    // #js-unit-testing
                    local.global.global_test_results = {
                        coverage: local.global.__coverage__,
                        failed: testReport.testsFailed,
                        testReport: testReport
                    };
                    setTimeout(function () {
                        // update coverageReport
                        coverageReportCreate();
                        // call callback with number of tests failed
                        local.utility2.exit(testReport.testsFailed);
                    }, 1000);
                    break;
                case 'node':
                    // create build badge
                    local.fs.writeFileSync(
                        local.utility2.envDict.npm_config_dir_build + '/build.badge.svg',
                        local.utility2['/build/build.badge.svg']
                            // edit branch name
                            .replace(
                                (/0000 00 00 00 00 00/g),
                                new Date()
                                    .toISOString()
                                    .slice(0, 19)
                                    .replace('T', ' ')
                            )
                            // edit branch name
                            .replace(
                                (/- master -/g),
                                '| ' + local.utility2.envDict.CI_BRANCH + ' |'
                            )
                            // edit commit id
                            .replace(
                                (/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/g),
                                local.utility2.envDict.CI_COMMIT_ID
                            )
                    );
                    // create test-report.badge.svg
                    local.fs.writeFileSync(
                        local.utility2.envDict.npm_config_dir_build +
                            '/test-report.badge.svg',
                        local.utility2['/build/test-report.badge.svg']
                            // edit number of tests failed
                            .replace((/999/g), testReport.testsFailed)
                            // edit badge color
                            .replace(
                                (/d00/g),
                                // coverage-hack - cover both fail and pass cases
                                '0d00'.slice(!!testReport.testsFailed).slice(0, 3)
                            )
                    );
                    // create test-report.html
                    local.fs.writeFileSync(
                        local.utility2.envDict.npm_config_dir_build + '/test-report.html',
                        testReportHtml
                    );
                    console.log('created test-report file://' +
                        local.utility2.envDict.npm_config_dir_build + '/test-report.html');
                    // create test-report.json
                    local.fs.writeFileSync(
                        local.utility2.envDict.npm_config_dir_build + '/test-report.json',
                        JSON.stringify(testReport)
                    );
                    // if any test failed, then exit with non-zero exit-code
                    setTimeout(function () {
                        // finalize testReport
                        local.utility2.testMerge(testReport, {});
                        console.log('\n' + local.utility2.envDict.MODE_BUILD +
                            ' - ' + testReport.testsFailed +
                            ' failed tests\n');
                        // call callback with number of tests failed
                        local.utility2.exit(testReport.testsFailed);
                    }, 1000);
                    break;
                }
            });
            onParallel.counter += 1;
            // mock exit
            switch (local.modeJs) {
            case 'node':
                exit = process.exit;
                process.exit = local.utility2.nop;
                break;
            }
            // init coverageReportCreate
            coverageReportCreate = (local.utility2.istanbul_lite &&
                local.utility2.istanbul_lite.coverageReportCreate) ||
                local.utility2.nop;
            // init modeTestCase
            local.utility2.modeTestCase = local.utility2.modeTestCase ||
                local.utility2.envDict.npm_config_mode_test_case;
            // init testReport
            testReport = local.utility2.testReport;
            // init testReport timer
            testReport.timeElapsed = Date.now();
            // init testPlatform
            testPlatform = local.utility2.testPlatform;
            // init testPlatform timer
            testPlatform.timeElapsed = Date.now();
            // reset testPlatform.testCaseList
            local.utility2.testPlatform.testCaseList.length = 0;
            // add tests into testPlatform.testCaseList
            Object.keys(options).forEach(function (key) {
                // add testCase options[key] to testPlatform.testCaseList
                if (key.indexOf('testCase_') === 0 &&
                        (local.utility2.modeTestCase === key ||
                        (!local.utility2.modeTestCase && key !== 'testCase_testRun_failure'))) {
                    local.utility2.testPlatform.testCaseList.push({
                        name: key,
                        onTestCase: options[key],
                        timeElapsed: Date.now()
                    });
                }
            });
            // visually update test-progress until it finishes
            if (local.modeJs === 'browser') {
                // init testReportDiv element
                testReportDiv = document.querySelector('.testReportDiv') || { style: {} };
                testReportDiv.style.display = 'block';
                testReportDiv.innerHTML = local.utility2.testMerge(testReport, {});
                // update test-report status every 1000 ms until done
                timerInterval = setInterval(function () {
                    // update testReportDiv in browser
                    testReportDiv.innerHTML = local.utility2.testMerge(testReport, {});
                    if (testReport.testsPending === 0) {
                        // cleanup timerInterval
                        clearInterval(timerInterval);
                    }
                    // update coverageReport
                    coverageReportCreate();
                }, 1000);
                // update coverageReport
                coverageReportCreate();
            }
            // shallow copy testPlatform.testCaseList,
            // to guard against in-place sort from testMerge
            testPlatform.testCaseList.slice().forEach(function (testCase) {
                var done, onError, timerTimeout;
                onError = function (error) {
                    // cleanup timerTimeout
                    clearTimeout(timerTimeout);
                    // if testCase already done, then fail testCase with error for ending again
                    if (done) {
                        error = error || new Error('callback in testCase ' +
                            testCase.name +
                            ' called multiple times');
                    }
                    // if error occurred, then fail testCase
                    if (error) {
                        console.error('\ntestCase ' + testCase.name + ' failed\n' +
                            error.message + '\n' + error.stack);
                        testCase.errorStack = testCase.errorStack ||
                            error.message + '\n' + error.stack;
                        // validate errorStack is non-empty
                        local.utility2.assert(
                            testCase.errorStack,
                            'invalid errorStack ' + testCase.errorStack
                        );
                    }
                    // if already done, then do nothing
                    if (done) {
                        return;
                    }
                    done = true;
                    // stop testCase timer
                    local._timeElapsedStop(testCase);
                    console.log('[' + local.modeJs + ' test-case ' +
                        testPlatform.testCaseList.filter(function (testCase) {
                            return testCase.timeElapsed < 0xffffffff;
                        }).length + ' of ' +
                        testPlatform.testCaseList.length + (testCase.errorStack
                        ? ' failed'
                        : ' passed') + '] - ' + testCase.name);
                    // if all tests have finished, then create test-report
                    onParallel();
                };
                // init timerTimeout
                timerTimeout = local.utility2.onTimeout(
                    onError,
                    local.utility2.timeoutDefault,
                    testCase.name
                );
                // increment number of tests remaining
                onParallel.counter += 1;
                // run testCase in try-catch block
                try {
                    // start testCase timer
                    testCase.timeElapsed = Date.now();
                    testCase.onTestCase(null, onError);
                } catch (errorCaught) {
                    onError(errorCaught);
                }
            });
            onParallel();
        };

        local.utility2.testTryCatch = function (callback, onError) {
            /*
             * this function will call the callback in a try-catch block,
             * and pass any error caught to onError
             */
            try {
                callback();
            } catch (errorCaught) {
                onError(errorCaught);
            }
        };

        local.utility2.timeoutDefaultInit = function () {
            /*
             * this function will init timeoutDefault
             */
            // init utility2 properties
            switch (local.modeJs) {
            case 'browser':
                location.search.replace(
                    (/\b(mode[A-Z]\w+|timeExit|timeoutDefault)=([\w\-\.\%]+)/g),
                    function (match0, key, value) {
                        // jslint-hack
                        local.utility2.nop(match0);
                        local.utility2[key] = value;
                        // try to parse value as json object
                        try {
                            local.utility2[key] = JSON.parse(value);
                        } catch (ignore) {
                        }
                    }
                );
                break;
            case 'node':
                local.utility2.timeExit = local.utility2.envDict.npm_config_time_exit;
                local.utility2.timeoutDefault =
                    local.utility2.envDict.npm_config_timeout_default;
                break;
            case 'phantom':
                try {
                    local.utility2.objectSetOverride(
                        local.utility2,
                        JSON.parse(decodeURIComponent(local.system.args[1])),
                        {},
                        Infinity
                    );
                } catch (ignore) {
                }
                break;
            }
            // init timeExit
            if (local.utility2.timeExit) {
                local.utility2.timeoutDefault = local.utility2.timeExit - Date.now();
                local.utility2.onTimeout(
                    local.utility2.exit,
                    local.utility2.timeoutDefault + 1000,
                    'exit'
                );
            }
            // init timeoutDefault
            local.utility2.timeoutDefault = local.utility2.timeoutDefault || 30000;
        };

        local.utility2.uuid4 = function () {
            /*
             * this function will return a random uuid,
             * with form "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
             */
            // code derived from http://jsperf.com/uuid4
            var id, ii;
            id = 0;
            for (ii = 1; ii < 32; ii += 1) {
                switch (ii) {
                case 8:
                case 20:
                    id += '-';
                    // coerce to finite integer
                    id += (Math.random() * 16 | 0).toString(16);
                    break;
                case 12:
                    id += '-';
                    id += '4';
                    break;
                case 16:
                    id += '-';
                    id += (Math.random() * 4 | 8).toString(16);
                    break;
                default:
                    // coerce to finite integer
                    id += (Math.random() * 16 | 0).toString(16);
                }
            }
            return id;
        };

        local.utility2.uuidTime = function () {
            /*
             * this function will return a time-based variant of uuid4,
             * with form "tttttttt-tttx-4xxx-yxxx-xxxxxxxxxxxx"
             */
            return Date.now().toString(16).replace(/([0-9a-f]{8})/, '$1-') +
                local.utility2.uuid4().slice(12);
        };
    }());
    switch (local.modeJs) {



    // run browser js-env code
    case 'browser':
        local.utility2.ajax = function (options, onError) {
            /*
             * this function will make an ajax request with error handling and timeout
             */
            var ajaxProgressDiv, done, error, ii, onEvent, timerTimeout, xhr;
            // init ajaxProgressDiv
            ajaxProgressDiv = document.querySelector('.ajaxProgressDiv') || { style: {} };
            // init event handling
            onEvent = local.utility2.onErrorWithStack(function (event) {
                // init statusCode
                xhr.statusCode = xhr.status;
                switch (event.type) {
                case 'abort':
                case 'error':
                case 'load':
                    // if already done, then do nothing
                    if (done) {
                        return;
                    }
                    done = true;
                    // cleanup timerTimeout
                    clearTimeout(timerTimeout);
                    // validate xhr is defined in _ajaxProgressList
                    ii = local._ajaxProgressList.indexOf(xhr);
                    local.utility2.assert(ii >= 0, 'missing xhr in _ajaxProgressList');
                    // remove xhr from ajaxProgressList
                    local._ajaxProgressList.splice(ii, 1);
                    // handle abort or error event
                    if (!error &&
                            (event.type === 'abort' ||
                            event.type === 'error' ||
                            xhr.statusCode >= 400)) {
                        error = new Error(event.type);
                    }
                    // handle completed xhr request
                    if (xhr.readyState === 4) {
                        // handle string data
                        if (error) {
                            // debug statusCode
                            error.statusCode = xhr.statusCode;
                            // debug statusCode / method / url
                            local.utility2.errorMessagePrepend(error, xhr.statusCode + ' ' +
                                xhr.method + ' ' + xhr.url + '\n' +
                                JSON.stringify(xhr.responseText.slice(0, 256) + '...') + '\n');
                        }
                    }
                    // hide _ajaxProgressDiv
                    if (local._ajaxProgressList.length === 0) {
                        local._ajaxProgressBarHide = setTimeout(function () {
                            // hide ajaxProgressBar
                            ajaxProgressDiv.style.display = 'none';
                            // reset ajaxProgress
                            local._ajaxProgressState = 0;
                            local._ajaxProgressUpdate(
                                '0%',
                                'ajaxProgressBarDivLoading',
                                'loading'
                            );
                        }, 1000);
                    }
                    // debug xhr
                    if (xhr.modeDebug) {
                        console.log(xhr);
                    }
                    onError(error, xhr);
                    break;
                }
                // increment ajaxProgressBar
                if (local._ajaxProgressList.length > 0) {
                    local._ajaxProgressIncrement();
                    return;
                }
                // finish ajaxProgressBar
                local._ajaxProgressUpdate('100%', 'ajaxProgressBarDivSuccess', 'loaded');
            });
            // init xhr
            xhr = new XMLHttpRequest();
            xhr.data = options.data;
            xhr.headers = options.headers || {};
            xhr.method = options.method || 'GET';
            xhr.modeDebug = options.modeDebug;
            xhr.timeout = options.timeout || local.utility2.timeoutDefault;
            xhr.url = options.url;
            // debug xhr
            local.utility2._debugAjaxXhr = xhr;
            // init timerTimeout
            timerTimeout = local.utility2.onTimeout(function (errorTimeout) {
                error = errorTimeout;
                xhr.abort();
            }, xhr.timeout, 'ajax');
            // init event handling
            xhr.addEventListener('abort', onEvent);
            xhr.addEventListener('error', onEvent);
            xhr.addEventListener('load', onEvent);
            xhr.addEventListener('loadstart', local._ajaxProgressIncrement);
            xhr.addEventListener('progress', local._ajaxProgressIncrement);
            xhr.upload.addEventListener('progress', local._ajaxProgressIncrement);
            // if ajaxProgressBar is hidden, then display it
            if (local._ajaxProgressList.length === 0) {
                ajaxProgressDiv.style.display = 'block';
            }
            // add xhr to _ajaxProgressList
            local._ajaxProgressList.push(xhr);
            // open url
            xhr.open(xhr.method, xhr.url);
            xhr.responseType = options.responseType || '';
            // send request headers
            Object.keys(xhr.headers).forEach(function (key) {
                xhr.setRequestHeader(key, xhr.headers[key]);
            });
            // clear any pending timer to hide _ajaxProgressDiv
            clearTimeout(local._ajaxProgressBarHide);
            // send data
            xhr.send(xhr.data);
            return xhr;
        };

        local._ajaxProgressIncrement = function () {
            /*
             * this function will increment ajaxProgressBar
             */
            // this algorithm can indefinitely increment the ajaxProgressBar
            // with successively smaller increments without ever reaching 100%
            local._ajaxProgressState += 1;
            local._ajaxProgressUpdate(
                100 - 75 * Math.exp(-0.125 * local._ajaxProgressState) + '%',
                'ajaxProgressBarDivLoading',
                'loading'
            );
        };

        // init list of xhr used in ajaxProgress
        local._ajaxProgressList = [];

        // init _ajaxProgressState
        local._ajaxProgressState = 0;

        local._ajaxProgressUpdate = function (width, type, label) {
            /*
             * this function will visually update ajaxProgressBar
             */
            var ajaxProgressBarDiv;
            ajaxProgressBarDiv = document.querySelector('.ajaxProgressBarDiv') ||
                { className: '', style: {} };
            ajaxProgressBarDiv.style.width = width;
            ajaxProgressBarDiv.className = ajaxProgressBarDiv.className
                .replace((/ajaxProgressBarDiv\w+/), type);
            ajaxProgressBarDiv.innerHTML = label;
        };
        break;



    // run node js-env code
    case 'node':
        local.utility2.ajax = function (options, onError) {
            /*
             * this function will make an ajax request with error handling and timeout
             */
            var done, modeNext, onNext, request, response, timerTimeout, urlParsed, xhr;
            modeNext = 0;
            onNext = local.utility2.onErrorWithStack(function (error, data) {
                modeNext = error instanceof Error
                    ? Infinity
                    : modeNext + 1;
                switch (modeNext) {
                case 1:
                    // init xhr
                    // http://www.w3.org/TR/XMLHttpRequest
                    xhr = options;
                    xhr.abort = function () {
                        onNext(new Error('abort'));
                    };
                    // disable socket pooling
                    xhr.agent = xhr.agent || false;
                    xhr.getAllResponseHeaders = function () {
                        return Object.keys(response.headers).map(function (key) {
                            return key + ': ' + response.headers[key] + '\r\n';
                        }).join('') + '\r\n';
                    };
                    xhr.getResponseHeader = function (key) {
                        return (response.headers && response.headers[key]) || null;
                    };
                    xhr.headers = xhr.headers || {};
                    // init Content-Length header
                    xhr.headers['Content-Length'] =
                        typeof xhr.data === 'string'
                        ? Buffer.byteLength(xhr.data)
                        : Buffer.isBuffer(xhr.data)
                        ? xhr.data.length
                        : 0;
                    xhr.onreadystatechange = xhr.onreadystatechange || local.utility2.nop;
                    xhr.readyState = 0;
                    xhr.responseText = '';
                    xhr.status = xhr.statusCode = 0;
                    xhr.statusText = '';
                    xhr.timeout = xhr.timeout || local.utility2.timeoutDefault;
                    // handle implicit localhost
                    if (xhr.url[0] === '/') {
                        xhr.url = 'http://localhost:' +
                            local.utility2.envDict.npm_config_server_port +
                            xhr.url;
                    }
                    // parse url
                    urlParsed = local.url.parse(String(xhr.url));
                    xhr.hostname = urlParsed.hostname;
                    xhr.path = urlParsed.path;
                    xhr.port = urlParsed.port;
                    // debug xhr
                    local.utility2._debugAjaxXhr = xhr;
                    // init timerTimeout
                    timerTimeout = local.utility2.onTimeout(
                        function (error) {
                            // cleanup request and response
                            local.utility2.requestResponseCleanup(request, response);
                            onNext(error);
                        },
                        xhr.timeout,
                        'ajax ' + xhr.method + ' ' + xhr.url
                    );
                    // init request
                    request = (urlParsed.protocol === 'https:'
                        ? local.https
                        : local.http)
                        .request(options, onNext)
                        // handle request-error
                        .on('error', onNext);
                    // debug request
                    local.utility2._debugAjaxRequest = request;
                    // send data
                    request.end(xhr.data);
                    break;
                case 2:
                    response = error;
                    // debug ajax response
                    local.utility2._debugAjaxResponse = response;
                    // update xhr
                    xhr.status = xhr.statusCode = response.statusCode;
                    xhr.statusText = local.http.STATUS_CODES[response.statusCode] || '';
                    xhr.readyState = 1;
                    xhr.onreadystatechange();
                    xhr.readyState = 2;
                    xhr.onreadystatechange();
                    xhr.readyState = 3;
                    xhr.onreadystatechange();
                    // handle http-error for statusCode >= 400
                    if (response.statusCode >= 400) {
                        onNext(new Error());
                        return;
                    }
                    if (xhr.responseType === 'response') {
                        modeNext = Infinity;
                        xhr.response = response;
                        request = null;
                        response = null;
                        onNext();
                        return;
                    }
                    local.utility2.streamReadAll(response, onNext);
                    break;
                case 3:
                    xhr.response = data;
                    xhr.responseText =  data.toString();
                    onNext();
                    break;
                default:
                    // if already done, then do nothing
                    if (done) {
                        return;
                    }
                    done = true;
                    // cleanup timerTimeout
                    clearTimeout(timerTimeout);
                    if (error) {
                        // debug statusCode
                        error.statusCode = xhr.statusCode;
                        // debug statusCode / method / url
                        local.utility2.errorMessagePrepend(error, xhr.statusCode + ' ' +
                            xhr.method + ' ' + xhr.url + '\n' +
                            JSON.stringify(xhr.responseText.slice(0, 256) + '...') + '\n');
                    }
                    // update xhr
                    xhr.readyState = 4;
                    xhr.onreadystatechange();
                    // debug xhr
                    if (xhr.modeDebug) {
                        console.log(xhr);
                    }
                    onError(error, xhr);
                }
            });
            onNext();
            return xhr;
        };

        local.utility2.middlewareAssetsCached = function (request, response, nextMiddleware) {
            /*
             * this function will run the cached-assets-middleware
             */
            var modeNext, onNext, result;
            modeNext = 0;
            onNext = function (error, data) {
                result = result ||
                    local.utility2.cacheDict.assets[request.urlParsed.pathnameNormalized];
                if (error || !result) {
                    nextMiddleware(error);
                    return;
                }
                modeNext += 1;
                switch (modeNext) {
                case 1:
                    if (response.headersSent ||
                            !(/\bgzip\b/).test(request.headers['accept-encoding'])) {
                        modeNext += 1;
                        onNext();
                        return;
                    }
                    // gzip result
                    local.utility2.taskRunCached({
                        cacheDict: 'assetsGzip',
                        key: request.urlParsed.pathnameNormalized,
                        modeCacheMemory: true,
                        onTask: function (onError) {
                            local.zlib.gzip(result, function (error, data) {
                                onError(error, !error && data.toString('base64'));
                            });
                        }
                    }, onNext);
                    break;
                case 2:
                    // gzip result
                    result = new Buffer(data, 'base64');
                    response.setHeader('Content-Encoding', 'gzip');
                    response.setHeader('Content-Length', result.length);
                    onNext();
                    break;
                case 3:
                    local.utility2
                        .middlewareCacheControlLastModified(request, response, onNext);
                    break;
                case 4:
                    response.end(result);
                    break;
                }
            };
            onNext();
        };

        local.utility2.middlewareBodyGet = function (request, response, nextMiddleware) {
            /*
             * this function will read the request-body and save it as request.bodyRaw
             */
            // jslint-hack
            local.utility2.nop(response);
            // if request has already been read, then goto nextMiddleware
            if (!request.readable) {
                nextMiddleware();
                return;
            }
            local.utility2.streamReadAll(request, function (error, data) {
                request.bodyRaw = request.bodyRaw || data;
                nextMiddleware(error);
            });
        };

        local.utility2.middlewareCacheControlLastModified = function (
            request,
            response,
            nextMiddleware
        ) {
            /*
             * this function will respond with the data cached by Last-Modified header
             */
            // do not cache if headers already sent or url has '?' search indicator
            if (!response.headersSent && request.url.indexOf('?') < 0) {
                // init serverResponseHeaderLastModified
                local.utility2.serverResponseHeaderLastModified =
                    local.utility2.serverResponseHeaderLastModified ||
                    // default Last-Modified header to server-start-time
                    new Date(Date.now() - process.uptime()).toGMTString();
                // respond with 304 if If-Modified-Since is greater than server-start-time
                if (request.headers['if-modified-since'] >=
                        local.utility2.serverResponseHeaderLastModified) {
                    response.statusCode = 304;
                    response.end();
                    return;
                }
                response.setHeader('Cache-Control', 'no-cache');
                response.setHeader(
                    'Last-Modified',
                    local.utility2.serverResponseHeaderLastModified
                );
            }
            nextMiddleware();
        };

        local.utility2.middlewareGroupCreate = function (middlewareList) {
            /*
             * this function will return a super-middleware,
             * that will sequentially run the sub-middlewares in middlewareList
             */
            var self;
            self = function (request, response, nextMiddleware) {
                /*
                 * this function will create a super-middleware,
                 * that will sequentially run the sub-middlewares in middlewareList
                 */
                var modeNext, onNext;
                modeNext = -1;
                onNext = function (error) {
                    modeNext = error
                        ? Infinity
                        : modeNext + 1;
                    // recursively run each sub-middleware in middlewareList
                    if (modeNext < self.middlewareList.length) {
                        self.middlewareList[modeNext](request, response, onNext);
                        return;
                    }
                    // default to nextMiddleware
                    nextMiddleware(error);
                };
                onNext();
            };
            self.middlewareList = middlewareList;
            return self;
        };

        local.utility2.middlewareInit = function (request, response, nextMiddleware) {
            /*
             * this function will run the init-middleware
             */
            // debug server request
            local.utility2._debugServerRequest = request;
            // debug server response
            local.utility2._debugServerResponse = response;
            // init timerTimeout
            local.utility2
                .serverRespondTimeoutDefault(request, response, local.utility2.timeoutDefault);
            // init request.urlParsed
            request.urlParsed = local.url.parse(request.url, true);
            // init request.urlParsed.pathnameNormalized
            request.urlParsed.pathnameNormalized = local.path.resolve(
                request.urlParsed.pathname
            );
            local.utility2.serverRespondHeadSet(request, response, null, {
                'Content-Type': local.utility2.contentTypeDict[
                    local.path.extname(request.urlParsed.pathnameNormalized)
                ]
            });
            // set main-page content-type to text/html
            if (request.urlParsed.pathnameNormalized === '/') {
                local.utility2.serverRespondHeadSet(request, response, null, {
                    'Content-Type': 'text/html; charset=UTF-8'
                });
            }
            // default to nextMiddleware
            nextMiddleware();
        };

        local.utility2.fsRmrSync = function (dir) {
            /*
             * this function will synchronously 'rm -fr' the dir
             */
            local.child_process.spawnSync(
                'rm',
                ['-fr', local.path.resolve(process.cwd(), dir)],
                { stdio: ['ignore', 1, 2] }
            );
        };

        local.utility2.fsWriteFileWithMkdirp = function (file, data, onError) {
            /*
             * this function will save the data to file, and auto-mkdirp the parent dir
             */
            file = local.path.resolve(process.cwd(), file);
            // save data to file
            local.fs.writeFile(file, data, function (error) {
                if (error && error.code === 'ENOENT') {
                    // if save failed, then mkdirp file's parent dir
                    local.utility2
                        .processSpawnWithTimeout(
                            'mkdir',
                            ['-p', local.path.dirname(file)],
                            { stdio: ['ignore', 1, 2] }
                        )
                        .on('exit', function () {
                            // save data to file
                            local.fs.writeFile(file, data, onError);
                        });
                    return;
                }
                onError(error);
            });
        };

        local.utility2.middlewareError = function (error, request, response) {
            /*
             * this function will run the error-middleware
             */
            // if error occurred, then respond with '500 Internal Server Error',
            // else respond with '404 Not Found'
            local.utility2.serverRespondDefault(request, response, error
                ? (error.statusCode >= 400 && error.statusCode < 600
                    ? error.statusCode
                    : 500)
                : 404, error);
        };

        local.utility2.onFileModifiedRestart = function (file) {
            /*
             * this function will watch the file,
             * and if modified, then restart the process
             */
            if (local.utility2.envDict.npm_config_mode_auto_restart &&
                    local.fs.existsSync(file) &&
                    local.fs.statSync(file).isFile()) {
                local.fs.watchFile(file, {
                    interval: 1000,
                    persistent: false
                }, function (stat2, stat1) {
                    if (stat2.mtime > stat1.mtime) {
                        local.utility2.exit(1);
                    }
                });
            }
        };

        local.utility2.phantomScreenCapture = function (options, onError) {
            /*
             * this function will spawn both phantomjs and slimerjs processes,
             * to screen-capture options.url
             */
            local.utility2.phantomTest(local.utility2.objectSetDefault(options, {
                modePhantom: 'screenCapture',
                timeoutScreenCapture: 2000
            }, 1), onError);
        };

        local.utility2.phantomTest = function (options, onError) {
            /*
             * this function will spawn both phantomjs and slimerjs processes,
             * to test options.url
             */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            ['phantomjs', 'slimerjs'].forEach(function (argv0) {
                var optionsCopy;
                // if phantomjs / slimerjs is not available, then do not use it
                if (local.utility2.envDict['npm_config_mode_' + argv0] === '0') {
                    return;
                }
                // copy options to create separate phantomjs / slimerjs state
                optionsCopy = local.utility2.jsonCopy(options);
                optionsCopy.argv0 = argv0;
                // run phantomjs / slimerjs instance
                onParallel.counter += 1;
                local._phantomTestSingle(optionsCopy, function (error) {
                    // save phantomjs / slimerjs state to options
                    options[argv0] = optionsCopy;
                    onParallel(error);
                });
            });
            onParallel();
        };

        local._phantomTestSingle = function (options, onError) {
            /*
             * this function will spawn a single phantomjs or slimerjs process,
             * to test options.url
             */
            var modeNext, onNext, onParallel, timerTimeout;
            modeNext = 0;
            onNext = function (error) {
                modeNext = error instanceof Error
                    ? Infinity
                    : modeNext + 1;
                switch (modeNext) {
                case 1:
                    options.testName = local.utility2.envDict.MODE_BUILD +
                        '.' + options.argv0 + '.' +
                        encodeURIComponent(local.url.parse(options.url).pathname);
                    options.timeExit = Date.now() + local.utility2.timeoutDefault;
                    local.utility2.objectSetDefault(options, {
                        fileCoverage: local.utility2.envDict.npm_config_dir_tmp +
                            '/coverage.' + options.testName + '.json',
                        fileScreenCapture: (local.utility2.envDict.npm_config_dir_build +
                            '/screen-capture.' + options.testName + '.png')
                            .replace((/%/g), '_')
                            .replace((/_2F\.png$/), '.png'),
                        fileTestReport: local.utility2.envDict.npm_config_dir_tmp +
                            '/test-report.' + options.testName + '.json',
                        modePhantom: 'testUrl'
                    }, 1);
                    // init timerTimeout
                    timerTimeout = local.utility2
                        .onTimeout(onNext, local.utility2.timeoutDefault, options.testName);
                    // coverage-hack - cover utility2 in phantomjs
                    options.argv1 = __dirname + '/index.js';
                    if (local.global.__coverage__ &&
                            local.utility2.envDict.npm_package_name === 'utility2') {
                        options.argv1 = local.utility2.envDict.npm_config_dir_tmp +
                            '/covered.utility2.js';
                        if (!local.utility2.modePhantomCovered) {
                            local.utility2.modePhantomCovered = true;
                            local.fs.writeFileSync(
                                options.argv1,
                                local.utility2.cacheDict.assets['/assets/utility2.js']
                            );
                        }
                    }
                    // spawn phantomjs to test a url
                    local.utility2
                        .processSpawnWithTimeout(
                            '/bin/sh',
                            ['-c',
                                options.argv0 +
                                // bug - hack slimerjs to allow heroku https
                                (options.argv0 === 'slimerjs'
                                ? ' --ssl-protocol=TLS '
                                : ' ') +
                                options.argv1 + ' ' +
                                encodeURIComponent(JSON.stringify(options)) + '; ' +
                                'EXIT_CODE=$?; ' +
                                // add black border around phantomjs screen-capture
                                '[ -f ' + options.fileScreenCapture + ' ] && ' +
                                'mogrify -frame 1 -mattecolor black ' +
                                options.fileScreenCapture + ' 2>/dev/null; ' +
                                'exit $EXIT_CODE;'],
                            { stdio: options.modeSilent || local.global.__coverage__
                                ? 'ignore'
                                : ['ignore', 1, 2] }
                        )
                        .on('exit', onNext);
                    break;
                case 2:
                    options.exitCode = error;
                    onParallel = local.utility2.onParallel(onNext);
                    onParallel.counter += 1;
                    // merge coverage and test-report
                    [
                        options.fileCoverage,
                        options.fileTestReport
                    ].forEach(function (file, ii) {
                        onParallel.counter += 1;
                        local.fs.readFile(
                            file,
                            'utf8',
                            local.utility2.onErrorJsonParse(function (error, data) {
                                if (!error) {
                                    // merge coverage
                                    if (ii === 0) {
                                        local.utility2.istanbulMerge(
                                            local.global.__coverage__,
                                            data
                                        );
                                    // merge test-report
                                    } else if (options.modePhantom === 'testUrl' &&
                                            !options.modeSilent) {
                                        local.utility2.testMerge(
                                            local.utility2.testReport,
                                            data
                                        );
                                    }
                                }
                                onParallel();
                            })
                        );
                    });
                    onParallel();
                    break;
                case 3:
                    onNext(options.exitCode && new Error(
                        options.argv0 + ' exit-code ' + options.exitCode
                    ));
                    break;
                default:
                    // cleanup timerTimeout
                    clearTimeout(timerTimeout);
                    onError(error);
                }
            };
            onNext();
        };

        local.utility2.processSpawnWithTimeout = function () {
            /*
             * this function will run like child_process.spawn,
             * but with auto-timeout after timeoutDefault milliseconds
             */
            var childProcess;
            // spawn childProcess
            childProcess = local.child_process.spawn.apply(local.child_process, arguments)
                // kill timerTimeout on exit
                .on('exit', function () {
                    try {
                        process.kill(childProcess.timerTimeout.pid);
                    } catch (ignore) {
                    }
                });
            // init timerTimeout
            childProcess.timerTimeout = local.child_process.spawn('/bin/sh', ['-c', 'sleep ' +
                // coerce to finite integer
                ((0.001 * local.utility2.timeoutDefault) | 0) +
                '; kill -9 ' + childProcess.pid + ' 2>/dev/null'], { stdio: 'ignore' });
            return childProcess;
        };

        local.utility2.replStart = function () {
            /*
             * this function will start the repl debugger
             */
            /*jslint evil: true*/
            // start repl server
            local._replServer = require('repl').start({ useGlobal: true });
            local._replServer.onError = function (error) {
                /*
                 * this function will debug any repl-error
                 */
                local.utility2._debugReplError = error || local.utility2._debugReplError;
            };
            // legacy-hack
            /* istanbul ignore if */
            if (local.utility2.envDict.npm_config_mode_legacy_node) {
                local._replServer._domain = { on: local.utility2.nop };
            }
            local._replServer._domain.on('error', local._replServer.onError);
            // save repl eval function
            local._replServer.evalDefault = local._replServer.eval;
            // hook custom repl eval function
            local._replServer.eval = function (script, context, file, onError) {
                var match, onError2;
                match = (/^(\S+)(.*?)\n/).exec(script);
                onError2 = function (error, data) {
                    // debug error
                    local._replServer.onError(error);
                    onError(error, data);
                };
                switch (match && match[1]) {
                // syntax sugar to run async shell command
                case '$':
                    switch (match[2]) {
                    // syntax sugar to run git diff
                    case ' git diff':
                        match[2] = ' git diff --color | cat';
                        break;
                    // syntax sugar to run git log
                    case ' git log':
                        match[2] = ' git log -n 4 | cat';
                        break;
                    }
                    // run async shell command
                    local.utility2
                        .processSpawnWithTimeout(
                            '/bin/sh',
                            ['-c', '. ' + __dirname + '/index.sh && ' + match[2]],
                            { stdio: ['ignore', 1, 2] }
                        )
                        // on shell exit, print return prompt
                        .on('exit', function (exitCode) {
                            console.log('exit-code ' + exitCode);
                            local._replServer.evalDefault('\n', context, file, onError2);
                        });
                    script = '\n';
                    break;
                // syntax sugar to grep current dir
                case 'grep':
                    // run async shell command
                    local.utility2
                        .processSpawnWithTimeout(
                            '/bin/sh',
                            ['-c', 'find . -type f | grep -v ' +
                                '"/\\.\\|.*\\(\\b\\|_\\)\\(\\.\\d\\|' +
                                'archive\\|artifact\\|' +
                                'bower_component\\|build\\|' +
                                'coverage\\|' +
                                'doc\\|' +
                                'external\\|' +
                                'fixture\\|' +
                                'git_module\\|' +
                                'jquery\\|' +
                                'log\\|' +
                                'min\\|mock\\|' +
                                'node_module\\|' +
                                'rollup\\|' +
                                'swp\\|' +
                                'tmp\\)\\(\\b\\|[_s]\\)" ' +
                                '| tr "\\n" "\\000" | xargs -0 grep -in "' +
                                match[2].trim() + '"'],
                            { stdio: ['ignore', 1, 2] }
                        )
                        // on shell exit, print return prompt
                        .on('exit', function (exitCode) {
                            console.log('exit-code ' + exitCode);
                            local._replServer.evalDefault('\n', context, file, onError2);
                        });
                    script = '\n';
                    break;
                // syntax sugar to print stringified arg
                case 'print':
                    script = 'console.log(String(' + match[2] + '))\n';
                    break;
                }
                // eval modified script
                local.utility2.testTryCatch(function () {
                    local._replServer.evalDefault(script, context, file, onError2);
                }, onError2);
            };
        };

        local.utility2.serverPortInit = function () {
            /*
             * this function will init $npm_config_server_port
             */
            // if $npm_config_server_port is undefined,
            // then assign it a random integer in the inclusive range 0 to 0xffff
            local.utility2.envDict.npm_config_server_port =
                local.utility2.envDict.npm_config_server_port ||
                // coerce to finite integer
                ((Math.random() * 0x10000) | 0x8000).toString();
            return local.utility2.envDict.npm_config_server_port;
        };

        local.utility2.serverRespondDefault = function (request, response, statusCode, error) {
            /*
             * this function will respond with a default message,
             * or error.stack for the given statusCode
             */
            // init statusCode and contentType
            local.utility2.serverRespondHeadSet(
                request,
                response,
                statusCode,
                { 'Content-Type': 'text/plain; charset=utf-8' }
            );
            if (error) {
                // debug statusCode / method / url
                local.utility2.errorMessagePrepend(error, response.statusCode + ' ' +
                    request.method + ' ' + request.url + '\n');
                // print error.stack to stderr
                local.utility2.onErrorDefault(error);
                // end response with error.stack
                response.end(error.stack);
                return;
            }
            // end response with default statusCode message
            response.end(
                statusCode + ' ' + local.http.STATUS_CODES[statusCode]
            );
        };

        local.utility2.serverRespondEcho = function (request, response) {
            /*
             * this function will respond with debug info
             */
            response.write(request.method + ' ' + request.url +
                ' HTTP/' + request.httpVersion + '\r\n' +
                Object.keys(request.headers).map(function (key) {
                    return key + ': ' + request.headers[key] + '\r\n';
                }).join('') + '\r\n');
            request.pipe(response);
        };

        local.utility2.serverRespondHeadSet = function (
            request,
            response,
            statusCode,
            headers
        ) {
            /*
             * this function will set the response object's statusCode / headers
             */
            // jslint-hack
            local.utility2.nop(request);
            if (response.headersSent) {
                return;
            }
            // init response.statusCode
            if (Number(statusCode)) {
                response.statusCode = Number(statusCode);
            }
            Object.keys(headers).forEach(function (key) {
                if (headers[key]) {
                    response.setHeader(key, headers[key]);
                }
            });
            return true;
        };

        local.utility2.serverRespondTimeoutDefault = function (request, response, timeout) {
            /*
             * this function will create a timeout-error-handler for the server request
             */
            request.onTimeout = request.onTimeout || function (error) {
                local.utility2.serverRespondDefault(request, response, 500, error);
                setTimeout(function () {
                    // cleanup request and response
                    local.utility2.requestResponseCleanup(request, response);
                }, 1000);
            };
            request.timerTimeout = local.utility2.onTimeout(
                request.onTimeout,
                timeout || local.utility2.timeoutDefault,
                'server ' + request.method + ' ' + request.url
            );
            response.on('finish', function () {
                clearTimeout(request.timerTimeout);
            });
        };

        local.utility2.streamReadAll = function (stream, onError) {
            /*
             * this function will concat data from the stream,
             * and pass it to onError when done reading
             */
            var chunkList;
            chunkList = [];
            // read data from the stream
            stream
                // on data event, push the buffer chunk to chunkList
                .on('data', function (chunk) {
                    chunkList.push(chunk);
                })
                // on end event, pass concatenated read buffer to onError
                .on('end', function () {
                    onError(null, Buffer.concat(chunkList));
                })
                // on error event, pass error to onError
                .on('error', onError);
        };

        local.utility2.testRunServer = function (options) {
            /*
             * this function will
             * 1. create server from options.middleware
             * 2. start server on port $npm_config_server_port
             * 3. if $npm_config_mode_npm_test is defined, then run tests
             */
            var server;
            // 1. create server from options.middleware
            server = local.http.createServer(function (request, response) {
                options.middleware(request, response, function (error) {
                    options.middlewareError(error, request, response);
                });
            });
            // init $npm_config_server_port
            local.utility2.serverPortInit();
            // 2. start server on port $npm_config_server_port
            console.log('server starting on port ' +
                local.utility2.envDict.npm_config_server_port);
            local.utility2.onReady.counter += 1;
            server.listen(
                local.utility2.envDict.npm_config_server_port,
                local.utility2.onReady
            );
            // if $npm_config_timeout_exit is defined,
            // then exit this process after $npm_config_timeout_exit ms
            if (Number(local.utility2.envDict.npm_config_timeout_exit)) {
                setTimeout(function () {
                    console.log('server stopping on port ' +
                        local.utility2.envDict.npm_config_server_port);
                    // screen-capture main-page
                    local.utility2.phantomScreenCapture({
                        modeSilent: true,
                        url: 'http://localhost:' + local.utility2.envDict.npm_config_server_port
                    }, local.utility2.exit);
                }, Number(local.utility2.envDict.npm_config_timeout_exit))
                    // keep timerTimeout from blocking the process from exiting
                    .unref();
            }
            // 3. if $npm_config_mode_npm_test is defined, then run tests
            local.utility2.testRun(options);
            return server;
        };
        break;
    }



    // run shared js-env code
    (function () {
        // require system
        if (local.modeJs === 'phantom') {
            local.system = require('system');
        }
        local.utility2.contentTypeDict = {
            // application
            '.js': 'application/javascript; charset=UTF-8',
            '.json': 'application/json; charset=UTF-8',
            '.pdf': 'application/pdf',
            '.xml': 'application/xml; charset=UTF-8',
            // image
            '.bmp': 'image/bmp',
            '.gif': 'image/gif',
            '.jpeg': 'image/jpeg',
            '.jpg': 'image/jpeg',
            '.png': 'image/png',
            '.svg': 'image/svg+xml; charset=UTF-8',
            // text
            '.css': 'text/css; charset=UTF-8',
            '.htm': 'text/html; charset=UTF-8',
            '.html': 'text/html; charset=UTF-8',
            '.md': 'text/markdown; charset=UTF-8',
            '.txt': 'text/plain; charset=UTF-8'
        };
        local.utility2.envDict = local.modeJs === 'browser'
            ? {}
            : local.modeJs === 'node'
            ? process.env
            : local.system.env;
        local.utility2.errorDefault = new Error('default error');
        // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address
        local.utility2.regexpEmailValidate = new RegExp(
            '^[a-zA-Z0-9.!#$%&\'*+\\/=?\\^_`{|}~\\-]+@' +
                '[a-zA-Z0-9](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?' +
                '(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?)*$'
        );
        local.utility2.regexpUriComponentCharset = (/[\w\!\%\'\(\)\*\-\.\~]/);
        local.utility2.regexpUuidValidate =
            (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
        local.utility2.stringAsciiCharset = local.utility2.stringExampleAscii ||
            '\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f' +
            '\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f' +
            ' !"#$%&\'()*+,-./0123456789:;<=>?' +
            '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_' +
            '`abcdefghijklmnopqrstuvwxyz{|}~\x7f';
        local.utility2.stringUriComponentCharset = '!%\'()*-.' +
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~';
        local.utility2.testPlatform = {
            name: local.modeJs === 'browser'
                ? 'browser - ' +
                    location.pathname + ' - ' +
                    navigator.userAgent + ' - ' +
                    new Date().toISOString()
                : local.modeJs === 'node'
                ? 'node - ' + process.platform + ' ' + process.version + ' - ' +
                    new Date().toISOString()
                : (local.global.slimer
                    ? 'slimer - '
                    : 'phantom - ') +
                    local.system.os.name + ' ' +
                    local.global.phantom.version.major + '.' +
                    local.global.phantom.version.minor + '.' +
                    local.global.phantom.version.patch + ' - ' +
                    new Date().toISOString(),
            screenCaptureImg: local.utility2.envDict.MODE_BUILD_SCREEN_CAPTURE,
            testCaseList: []
        };
        local.utility2.testReport = { testPlatformList: [local.utility2.testPlatform] };
        // init timeoutDefault
        local.utility2.timeoutDefaultInit();
        // init onReady
        local.utility2.onReadyInit();
    }());
    switch (local.modeJs) {



    // run browser js-env code
    case 'browser':
        // init exports
        window.utility2 = local.utility2;
        break;



    // run node js-env code
    case 'node':
        // init exports
        module.exports = local.utility2;
        module.exports.__dirname = __dirname;
        // require modules
        local.child_process = require('child_process');
        local.fs = require('fs');
        local.http = require('http');
        local.https = require('https');
        local.path = require('path');
        local.url = require('url');
        local.vm = require('vm');
        local.zlib = require('zlib');
        // legacy-hack
        /* istanbul ignore if */
        if (process.version.slice(0, 6) < 'v0.12.') {
            local.utility2.envDict.npm_config_mode_legacy_node =
                local.utility2.envDict.npm_config_mode_legacy_node || '1';
            local.utility2.fsRmrSync = function (dir) {
                /*
                 * this function will synchronously rm -fr the dir
                 */
                dir = local.path.resolve(process.cwd(), dir);
                var rmrSync;
                rmrSync = function (dir) {
                    try {
                        local.fs.unlinkSync(dir);
                    } catch (errorCaught) {
                        if (local.fs.existsSync(dir)) {
                            local.fs.readdirSync(dir).forEach(function (file) {
                                rmrSync(dir + '/' + file);
                            });
                            local.fs.rmdirSync(dir);
                        }
                    }
                };
                rmrSync(dir);
            };
        }
        // init utility2 properties
        local.utility2.objectSetDefault(local.utility2.envDict, {
            npm_config_dir_build: process.cwd() + '/tmp/build',
            npm_config_dir_tmp: process.cwd() + '/tmp',
            npm_package_name: 'example-module',
            npm_package_description: 'this is an example module',
            npm_package_version: '0.0.1'
        });
        // init assets
        local.utility2.cacheDict.assets['/assets/istanbul-lite.js'] =
            local.utility2.istanbul_lite['/assets/istanbul-lite.js'];
        local.utility2.cacheDict.assets['/assets/jslint-lite.js'] =
            local.utility2.jslint_lite['/assets/jslint-lite.js'];
        local.utility2.cacheDict.assets['/assets/utility2.js'] = local.utility2.istanbul_lite
            .instrumentInPackage(
                local.fs.readFileSync(__filename, 'utf8'),
                __filename,
                'utility2'
            );
        break;



    // run phantom js-env code
    case 'phantom':
        // require modules
        local.fs = require('fs');
        local.webpage = require('webpage');

        local.onError = function (error, trace) {
            /*
             * this function will run the main error-handler
             * http://phantomjs.org/api/phantom/handler/on-error.html
             */
            var data, exitCode;
            exitCode = 1;
            // handle notification that url has been opened
            if (error === 'success' && !trace) {
                console.log(local.utility2.argv0 + ' - opened ' + local.utility2.url);
                error = null;
                // screen-capture webpage after timeoutScreenCapture ms
                if (local.utility2.modePhantom === 'screenCapture') {
                    setTimeout(function () {
                        // save screen-capture
                        local.page.render(local.utility2.fileScreenCapture);
                        console.log(local.utility2.argv0 +
                            ' - created screen-capture file://' +
                            local.utility2.fileScreenCapture);
                        local.utility2.exit(0);
                    }, local.utility2.timeoutScreenCapture);
                }
                return;
            }
            // parse global_test_results
            try {
                data = JSON.parse(
                    (/\nphantom\n(\{"global_test_results":\{.*)/).exec(error)[1]
                ).global_test_results;
            } catch (ignore) {
            }
            if (data && data.testReport) {
                // handle global_test_results thrown from webpage
                // merge coverage
                local.global.__coverage__ =
                    local.utility2.istanbulMerge(local.global.__coverage__, data.coverage);
                // merge test-report
                local.utility2.testMerge(local.utility2.testReport, data.testReport);
                // save screen-capture
                local.page.render(local.utility2.fileScreenCapture);
                // integrate screen-capture into test-report
                data.testReport.testPlatformList[0].screenCaptureImg =
                    local.utility2.fileScreenCapture.replace((/.*\//), '');
                // save test-report
                local.fs.write(
                    local.utility2.fileTestReport,
                    JSON.stringify(local.utility2.testReport)
                );
                exitCode = data.testReport.testsFailed;
            // handle webpage-error
            // http://phantomjs.org/api/phantom/handler/on-error.html
            } else if (typeof error === 'string') {
                console.error('\n' + local.utility2.testName + '\nERROR: ' + error + ' TRACE:');
                (trace || []).forEach(function (t) {
                    console.error(' -> ' + (t.file || t.sourceURL)
                        + ': ' + t.line + (t.function
                        ? ' (in function ' + t.function + ')'
                        : ''));
                });
                console.error();
            // handle default-error
            } else {
                local.utility2.onErrorDefault(error);
            }
            if (local.utility2.modePhantom !== 'screenCapture') {
                local.utility2.exit(exitCode);
            }
        };

        [
            {
                // coverage-hack - cover 'hello' test
                system: { args: ['', 'hello'] },
                global: { console: { log: local.utility2.nop } },
                utility2: { exit: local.utility2.nop }
            },
            local
        ].forEach(function (local) {
            // run 'hello' test
            if (local.system.args[1] === 'hello') {
                local.global.console.log('hello');
                local.utility2.exit();
                return;
            }
            // init global error handling
            // http://phantomjs.org/api/phantom/handler/on-error.html
            local.global.phantom.onError = local.onError;
            // init webpage
            local.page = local.webpage.create();
            // init webpage clipRect
            local.page.clipRect = { height: 768, left: 0, top: 0, width: 1024 };
            // init webpage viewportSize
            local.page.viewportSize = { height: 768, width: 1024 };
            // init webpage error handling
            // http://phantomjs.org/api/webpage/handler/on-error.html
            local.page.onError = local.onError;
            // pipe webpage console.log to stdout
            local.page.onConsoleMessage = function () {
                console.log.apply(console, arguments);
            };
            // open requested webpage
            local.page.open(
                local.utility2.url.replace('{{timeExit}}', local.utility2.timeExit - 2000),
                local.onError
            );
        });
        break;
    }
}((function (self) {
    'use strict';
    var local;



    // run shared js-env code
    (function () {
        // init local
        local = {};
        // init js-env
        local.modeJs = (function () {
            try {
                return self.phantom.version &&
                    typeof require('webpage').create === 'function' &&
                    'phantom';
            } catch (errorCaughtPhantom) {
                try {
                    return module.exports &&
                        typeof process.versions.node === 'string' &&
                        typeof require('http').createServer === 'function' &&
                        'node';
                } catch (errorCaughtNode) {
                    return typeof navigator.userAgent === 'string' &&
                        typeof document.querySelector('body') === 'object' &&
                        'browser';
                }
            }
        }());
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : local.modeJs === 'node'
            ? global
            : self;
        // init global debug_print
        local.global['debug_print'.replace('_p', 'P')] = function (arg) {
            /*
             * this function will both print the arg to stderr and return it
             */
            // debug arguments
            local.utility2['_debug_printArguments'.replace('_p', 'P')] = arguments;
            console.error('\n\n\ndebug_print'.replace('_p', 'P'));
            console.error.apply(console, arguments);
            console.error();
            // return arg for inspection
            return arg;
        };
        // init global debug_printCallback
        local.global['debug_printCallback'.replace('_p', 'P')] = function (onError) {
            /*
             * this function will inject debug_print into the onError callback
             */
            return function () {
                local.global['debug_print'.replace('_p', 'P')].apply(null, arguments);
                onError.apply(null, arguments);
            };
        };
        // init utility2
        local.utility2 = { cacheDict: { assets: {} }, local: local };
        // init istanbul_lite
        local.utility2.istanbul_lite = local.modeJs === 'browser'
            ? window.istanbul_lite
            : local.modeJs === 'node'
            ? require('istanbul-lite')
            : null;
        // init jslint_lite
        local.utility2.jslint_lite = local.modeJs === 'browser'
            ? window.jslint_lite
            : local.modeJs === 'node'
            ? require('jslint-lite')
            : null;
/* jslint-indent-begin 8 */
/*jslint maxlen: 256*/
// init assets
local.utility2.cacheDict.assets['/assets/utility2.css'] = '/*csslint\n' +
        'box-model: false\n' +
    '*/\n' +
    '.ajaxProgressBarDiv {\n' +
        'animation: 2s linear 0s normal none infinite ajaxProgressBarDivAnimation;\n' +
        '-o-animation: 2s linear 0s normal none infinite ajaxProgressBarDivAnimation;\n' +
        '-moz-animation: 2s linear 0s normal none infinite ajaxProgressBarDivAnimation;\n' +
        '-webkit-animation: 2s linear 0s normal none infinite ajaxProgressBarDivAnimation;\n' +
        'background-image: linear-gradient(\n' +
            '45deg,rgba(255,255,255,.25) 25%,\n' +
            'transparent 25%,\n' +
            'transparent 50%,\n' +
            'rgba(255,255,255,.25) 50%,\n' +
            'rgba(255,255,255,.25) 75%,\n' +
            'transparent 75%,\n' +
            'transparent\n' +
        ');\n' +
        'background-size: 40px 40px;\n' +
        'color: #fff;\n' +
        'font-family: Helvetical Neue, Helvetica, Arial, sans-serif;\n' +
        'font-size: 12px;\n' +
        'padding: 2px 0 2px 0;\n' +
        'text-align: center;\n' +
        'transition: width .5s ease;\n' +
        'width: 25%;\n' +
    '}\n' +
    '.ajaxProgressBarDivError {\n' +
        'background-color: #d33;\n' +
    '}\n' +
    '.ajaxProgressBarDivLoading {\n' +
        'background-color: #37b;\n' +
    '}\n' +
    '.ajaxProgressBarDivSuccess {\n' +
        'background-color: #3b3;\n' +
    '}\n' +
    '.ajaxProgressDiv {\n' +
        'background-color: #fff;\n' +
        'border: 1px solid;\n' +
        'display: none;\n' +
        'left: 50%;\n' +
        'margin: 0 0 0 -50px;\n' +
        'padding: 5px 5px 5px 5px;\n' +
        'position: fixed;\n' +
        'top: 49%;\n' +
        'width: 100px;\n' +
        'z-index: 9999;\n' +
    '}\n' +
    '@keyframes ajaxProgressBarDivAnimation {\n' +
        'from { background-position: 40px 0; }\n' +
        'to { background-position: 0 0; }\n' +
    '}\n' +
    '@-o-keyframes ajaxProgressBarDivAnimation {\n' +
        'from { background-position: 40px 0; }\n' +
        'to { background-position: 0 0; }\n' +
    '}\n' +
    '@-webkit-keyframes ajaxProgressBarDivAnimation {\n' +
        'from { background-position: 40px 0; }\n' +
        'to { background-position: 0 0; }\n' +
    '}\n';



/* jslint-ignore-begin */
// https://img.shields.io/badge/last_build-0000_00_00_00_00_00_UTC_--_master_--_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-0077ff.svg?style=flat
local.utility2['/build/build.badge.svg'] = '<svg xmlns="http://www.w3.org/2000/svg" width="563" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="563" height="20" fill="#555"/><rect rx="0" x="61" width="502" height="20" fill="#07f"/><path fill="#07f" d="M61 0h4v20h-4z"/><rect rx="0" width="563" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="31.5" y="15" fill="#010101" fill-opacity=".3">last build</text><text x="31.5" y="14">last build</text><text x="311" y="15" fill="#010101" fill-opacity=".3">0000 00 00 00 00 00 UTC - master - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</text><text x="311" y="14">0000 00 00 00 00 00 UTC - master - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</text></g></svg>';



// https://img.shields.io/badge/coverage-100.0%-00dd00.svg?style=flat
local.utility2['/build/coverage.badge.svg'] = '<svg xmlns="http://www.w3.org/2000/svg" width="117" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="117" height="20" fill="#555"/><rect rx="0" x="63" width="54" height="20" fill="#0d0"/><path fill="#0d0" d="M63 0h4v20h-4z"/><rect rx="0" width="117" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="32.5" y="15" fill="#010101" fill-opacity=".3">coverage</text><text x="32.5" y="14">coverage</text><text x="89" y="15" fill="#010101" fill-opacity=".3">100.0%</text><text x="89" y="14">100.0%</text></g></svg>';



// https://img.shields.io/badge/tests_failed-999-dd0000.svg?style=flat
local.utility2['/build/test-report.badge.svg'] = '<svg xmlns="http://www.w3.org/2000/svg" width="103" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="103" height="20" fill="#555"/><rect rx="0" x="72" width="31" height="20" fill="#d00"/><path fill="#d00" d="M72 0h4v20h-4z"/><rect rx="0" width="103" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="37" y="15" fill="#010101" fill-opacity=".3">tests failed</text><text x="37" y="14">tests failed</text><text x="86.5" y="15" fill="#010101" fill-opacity=".3">999</text><text x="86.5" y="14">999</text></g></svg>';
/* jslint-ignore-end */



local.utility2['/doc/doc.html.template'] = '<style>\n' +
    '.docApiDiv {\n' +
        'font-family: Helvetical Neue, Helvetica, Arial, sans-serif;\n' +
    '}\n' +
    '.docApiDiv a {\n' +
        'color: #55f;\n' +
        'font-weight: bold;\n' +
        'text-decoration: none;\n' +
    '}\n' +
    '.docApiDiv a:hover {\n' +
        'text-decoration: underline;\n' +
    '}\n' +
    '.docApiSectionDiv {\n' +
        'border-top: 1px solid;\n' +
        'margin-top: 20px;\n' +
    '}\n' +
    '.docApiCodeCommentSpan {\n' +
        'background-color: #bbf;\n' +
        'color: #000;\n' +
        'display: block;\n' +
    '}\n' +
    '.docApiCodeKeywordSpan {\n' +
        'color: #f00;\n' +
        'font-weight: bold;\n' +
    '}\n' +
    '.docApiCodePre {\n' +
        'background-color: #eef;\n' +
        'border: 1px solid;\n' +
        'border-radius: 5px;\n' +
        'color: #777;\n' +
        'padding: 5px;\n' +
        'white-space: pre-wrap;\n' +
    '}\n' +
    '.docApiSignatureSpan {\n' +
        'color: #777;\n' +
    '}\n' +
    '</style>\n' +
    '<div class="docApiDiv">\n' +
    '<h1>api documentation</h1>\n' +
    '<div class="docApiSectionDiv" id="toc"><h1>table of contents</h1><ul>\n' +
    '{{#moduleList}}\n' +
    '<li><a href="#{{id}}">module {{name}}</a><ul>\n' +
    '{{#elementList}}\n' +
        '<li><a class="docApiElementLiA" href="#{{id}}">\n' +
        '{{name}}\n' +
        '<span class="docApiSignatureSpan">{{signature}}</span>\n' +
        '</a></li>\n' +
    '{{/elementList}}\n' +
    '</ul></li>\n' +
    '{{/moduleList}}\n' +
    '</ul></div>\n' +
    '{{#moduleList}}\n' +
    '<div class="docApiSectionDiv">\n' +
    '<h1><a href="#{{id}}" id="{{id}}">module {{name}}</a></h1>\n' +
    '{{#elementList}}\n' +
        '<h2><a href="#{{id}}" id="{{id}}">\n' +
            '{{name}}\n' +
            '<span class="docApiSignatureSpan">{{signature}}</span>\n' +
        '</a></h2>\n' +
        '<ul>\n' +
        '<li>description and source code<pre class="docApiCodePre">{{source}}</pre></li>\n' +
        '<li>example usage<pre class="docApiCodePre">{{example}}</pre></li>\n' +
        '</ul>\n' +
    '{{/elementList}}\n' +
    '</div>\n' +
    '{{/moduleList}}\n' +
    '</div>\n';



local.utility2['/test/test-report.html.template'] = '<style>\n' +
    '.testReportPlatformDiv {\n' +
        'border: 1px solid;\n' +
        'border-radius: 5px;\n' +
        'font-family: Helvetical Neue, Helvetica, Arial, sans-serif;\n' +
        'margin-top: 20px;\n' +
        'padding: 0 10px 10px 10px;\n' +
        'text-align: left;\n' +
    '}\n' +
    '.testReportPlatformPre {\n' +
        'background-color: #fdd;\n' +
        'border: 1px;\n' +
        'border-radius: 0 0 5px 5px;\n' +
        'border-top-style: solid;\n' +
        'margin-bottom: 0;\n' +
        'padding: 10px;\n' +
    '}\n' +
    '.testReportPlatformPreHidden {\n' +
        'display: none;\n' +
    '}\n' +
    '.testReportPlatformScreenCaptureImg {\n' +
        'border: 1px solid;\n' +
        'border-color: #000;\n' +
        'margin: 5px 0 5px 0;\n' +
        'max-height:256px;\n' +
        'max-width:512px;\n' +
    '}\n' +
    '.testReportPlatformSpan {\n' +
        'display: inline-block;\n' +
        'width: 8em;\n' +
    '}\n' +
    '.testReportPlatformTable {\n' +
        'border: 1px;\n' +
        'border-top-style: solid;\n' +
        'text-align: left;\n' +
        'width: 100%;\n' +
    '}\n' +
    '.testReportPlatformTr:nth-child(odd) {\n' +
        'background-color: #bfb;\n' +
    '}\n' +
    '.testReportTestFailed {\n' +
        'background-color: #f99;\n' +
    '}\n' +
    '.testReportTestPending {\n' +
        'background-color: #99f;\n' +
    '}\n' +
    '.testReportSummaryDiv {\n' +
        'background-color: #bfb;\n' +
    '}\n' +
    '.testReportSummarySpan {\n' +
        'display: inline-block;\n' +
        'width: 6.5em;\n' +
    '}\n' +
    '</style>\n' +
    '<div class="testReportPlatformDiv testReportSummaryDiv">\n' +
    '<h2>{{envDict.npm_package_name}} test-report summary</h2>\n' +
    '<h4>\n' +
        '<span class="testReportSummarySpan">version</span>-\n' +
            '{{envDict.npm_package_version}}<br>\n' +
        '<span class="testReportSummarySpan">test date</span>- {{date}}<br>\n' +
        '<span class="testReportSummarySpan">commit info</span>-\n' +
            '{{CI_COMMIT_INFO htmlSafe}}<br>\n' +
    '</h4>\n' +
    '<table class="testReportPlatformTable">\n' +
    '<thead><tr>\n' +
        '<th>total time-elapsed</th>\n' +
        '<th>total tests failed</th>\n' +
        '<th>total tests passed</th>\n' +
        '<th>total tests pending</th>\n' +
    '</tr></thead>\n' +
    '<tbody><tr>\n' +
        '<td>{{timeElapsed}} ms</td>\n' +
        '<td class="{{testsFailedClass}}">{{testsFailed}}</td>\n' +
        '<td>{{testsPassed}}</td>\n' +
        '<td>{{testsPending}}</td>\n' +
    '</tr></tbody>\n' +
    '</table>\n' +
    '</div>\n' +
    '{{#testPlatformList}}\n' +
    '<div class="testReportPlatformDiv">\n' +
    '<h4>\n' +
        '{{testPlatformNumber}}. {{name htmlSafe}}<br>\n' +
        '{{screenCapture}}\n' +
        '<span class="testReportPlatformSpan">time-elapsed</span>- {{timeElapsed}} ms<br>\n' +
        '<span class="testReportPlatformSpan">tests failed</span>- {{testsFailed}}<br>\n' +
        '<span class="testReportPlatformSpan">tests passed</span>- {{testsPassed}}<br>\n' +
        '<span class="testReportPlatformSpan">tests pending</span>- {{testsPending}}<br>\n' +
    '</h4>\n' +
    '<table class="testReportPlatformTable">\n' +
    '<thead><tr>\n' +
        '<th>#</th>\n' +
        '<th>time-elapsed</th>\n' +
        '<th>status</th>\n' +
        '<th>test-case</th>\n' +
    '</tr></thead>\n' +
    '<tbody>\n' +
    '{{#testCaseList}}\n' +
    '<tr class="testReportPlatformTr">\n' +
        '<td>{{testCaseNumber}}</td>\n' +
        '<td>{{timeElapsed}} ms</td>\n' +
        '<td class="{{testReportTestStatusClass}}">{{status}}</td>\n' +
        '<td>{{name}}</td>\n' +
    '</tr>\n' +
    '{{/testCaseList}}\n' +
    '</tbody>\n' +
    '</table>\n' +
    '<pre class="{{testReportPlatformPreClass}}">\n' +
    '{{#errorStackList}}\n' +
    '{{errorStack htmlSafe}}\n' +
    '{{/errorStackList}}\n' +
    '</pre>\n' +
    '</div>\n' +
    '{{/testPlatformList}}\n';
/* jslint-indent-end */
    }());
    return local;
}(this))));
