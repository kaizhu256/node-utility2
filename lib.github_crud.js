#!/usr/bin/env node
/* istanbul instrument in package github_crud */
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
        // init lib
        local.local = local.github_crud = local;
        // init exports
        if (local.modeJs === 'browser') {
            local.global.utility2_github_crud = local;
        } else {
            // require builtins
            Object.keys(process.binding('natives')).forEach(function (key) {
                if (!local[key] && !(/\/|^_|^sys$/).test(key)) {
                    local[key] = require(key);
                }
            });
            module.exports = local;
            module.exports.__dirname = __dirname;
            module.exports.module = module;
        }
    }());



    /* istanbul ignore next */
    // run shared js-env code - function-before
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

        local.httpRequest = function (options, onError) {
        /*
         * this function will request the data from options.url
         */
            var chunkList,
                isDone,
                onError2,
                serverLog,
                timerTimeout,
                request,
                response,
                timeStart,
                urlParsed;
            // init onError2
            onError2 = function (error) {
                if (isDone) {
                    return;
                }
                isDone = true;
                // debug httpResponse
                serverLog({
                    type: 'httpResponse',
                    time: new Date(timeStart).toISOString(),
                    method: options.method,
                    url: options.url,
                    statusCode: Number(response && response.statusCode) || 0,
                    duration: Date.now() - timeStart
                });
                // cleanup timerTimeout
                clearTimeout(timerTimeout);
                // cleanup request and response
                [request, response].forEach(function (stream) {
                    // try to end the stream
                    try {
                        stream.end();
                    // else try to destroy the stream
                    } catch (errorCaught) {
                        try {
                            stream.destroy();
                        } catch (ignore) {
                        }
                    }
                });
                onError(error, response);
            };
            // init serverLog
            serverLog = local.serverLog || console.error;
            // init timerTimeout
            timerTimeout = setTimeout(function () {
                onError2(new Error('http-request timeout'));
            }, options.timeout || 30000);
            urlParsed = require('url').parse(options.url);
            urlParsed.headers = options.headers;
            urlParsed.method = options.method;
            // debug request
            timeStart = Date.now();
            request = require(
                urlParsed.protocol.slice(0, -1)
            ).request(urlParsed, function (_response) {
                response = _response;
                if (response.statusCode < 200 || response.statusCode > 299) {
                    onError2(new Error(response.statusCode));
                    return;
                }
                chunkList = [];
                response
                    .on('data', function (chunk) {
                        chunkList.push(chunk);
                    })
                    .on('end', function () {
                        response.data = Buffer.concat(chunkList);
                        onError2();
                    })
                    .on('error', onError2);
            }).on('error', onError2);
            request.end(options.data);
        };

        local.nop = function () {
        /*
         * this function will do nothing
         */
            return;
        };

        local.onErrorWithStack = function (onError) {
        /*
         * this function will create a new callback that will call onError,
         * and append the current stack to any error
         */
            var stack;
            stack = new Error().stack.replace((/(.*?)\n.*?$/m), '$1');
            return function (error, data, meta) {
                if (error &&
                        error !== local.errorDefault &&
                        String(error.stack).indexOf(stack.split('\n')[2]) < 0) {
                    // append the current stack to error.stack
                    error.stack += '\n' + stack;
                }
                onError(error, data, meta);
            };
        };

        local.onNext = function (options, onError) {
        /*
         * this function will wrap onError inside the recursive function options.onNext,
         * and append the current stack to any error
         */
            options.onNext = local.onErrorWithStack(function (error, data, meta) {
                try {
                    options.modeNext = error && !options.modeErrorIgnore
                        ? Infinity
                        : options.modeNext + 1;
                    onError(error, data, meta);
                } catch (errorCaught) {
                    // throw errorCaught to break infinite recursion-loop
                    if (options.errorCaught) {
                        throw options.errorCaught;
                    }
                    options.errorCaught = errorCaught;
                    options.onNext(errorCaught, data, meta);
                }
            });
            return options;
        };

        local.onParallel = function (onError, onEach, onRetry) {
        /*
         * this function will create a function that will
         * 1. run async tasks in parallel
         * 2. if counter === 0 or error occurred, then call onError with error
         */
            var onParallel;
            onError = local.onErrorWithStack(onError);
            onEach = onEach || local.nop;
            onRetry = onRetry || local.nop;
            onParallel = function (error, data) {
                if (onRetry(error, data)) {
                    return;
                }
                // decrement counter
                onParallel.counter -= 1;
                // validate counter
                local.assert(
                    onParallel.counter >= 0 || error || onParallel.error,
                    'invalid onParallel.counter = ' + onParallel.counter
                );
                // ensure onError is run only once
                if (onParallel.counter < 0) {
                    return;
                }
                // handle error
                if (error) {
                    onParallel.error = error;
                    // ensure counter <= 0
                    onParallel.counter = -Math.abs(onParallel.counter);
                }
                // call onError when isDone
                if (onParallel.counter <= 0) {
                    onError(error, data);
                    return;
                }
                onEach();
            };
            // init counter
            onParallel.counter = 0;
            // return callback
            return onParallel;
        };

        local.onParallelList = function (options, onEach, onError) {
        /*
         * this function will
         * 1. async-run onEach in parallel,
         *    with the given options.rateLimit and options.retryLimit
         * 2. call onError when isDone
         */
            var ii, onEach2, onParallel;
            options.list = options.list || [];
            onEach2 = function () {
                while (ii + 1 < options.list.length &&
                        onParallel.counter < options.rateLimit + 1) {
                    ii += 1;
                    onParallel.ii += 1;
                    onParallel.remaining -= 1;
                    onEach({
                        element: options.list[ii],
                        ii: ii,
                        list: options.list,
                        retry: 0
                    }, onParallel);
                }
            };
            onParallel = local.onParallel(onError, onEach2, function (error, data) {
                if (error && data && data.retry < options.retryLimit) {
                    local.onErrorDefault(error);
                    data.retry += 1;
                    setTimeout(function () {
                        onParallel.counter -= 1;
                        onEach(data, onParallel);
                    }, 1000);
                    return true;
                }
            });
            ii = -1;
            onParallel.ii = -1;
            onParallel.remaining = options.list.length;
            options.rateLimit = Number(options.rateLimit) || 6;
            options.rateLimit = Math.max(options.rateLimit, 1);
            options.retryLimit = Number(options.retryLimit) || 2;
            onParallel.counter += 1;
            onEach2();
            onParallel();
        };

        local.onReadyAfter = function (onError) {
        /*
         * this function will call onError when onReadyBefore.counter === 0
         */
            local.onReadyBefore.counter += 1;
            local.taskCreate({ key: 'utility2.onReadyAfter' }, null, onError);
            local.onResetAfter(local.onReadyBefore);
            return onError;
        };
    }());
    switch (local.modeJs) {



    // run node js-env code - function
    case 'node':
        local.contentDelete = function (options, onError) {
        /*
         * this function will delete the github file
         * https://developer.github.com/v3/repos/contents/#delete-a-file
         */
            options = { message: options.message, url: options.url };
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    // get sha
                    local.contentRequest({ method: 'GET', url: options.url }, options.onNext);
                    break;
                case 2:
                    // delete file with sha
                    if (!error && data.sha) {
                        local.contentRequest({
                            message: options.message,
                            method: 'DELETE',
                            sha: data.sha,
                            url: options.url
                        }, options.onNext);
                        return;
                    }
                    // delete tree
                    local.onParallelList({ list: data }, function (data, onParallel) {
                        onParallel.counter += 1;
                        // recurse
                        local.contentDelete({
                            message: options.message,
                            url: data.element.url
                        }, onParallel);
                    }, options.onNext);
                    break;
                default:
                    onError();
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.contentGet = function (options, onError) {
        /*
         * this function will get the github file
         * https://developer.github.com/v3/repos/contents/#get-contents
         */
            options = { url: options.url };
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    local.contentRequest({ method: 'GET', url: options.url }, options.onNext);
                    break;
                case 2:
                    options.onNext(null, new Buffer(data.content, 'base64'));
                    break;
                default:
                    onError(error, !error && data);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.contentPut = function (options, onError) {
        /*
         * this function will put options.content into the github file
         * https://developer.github.com/v3/repos/contents/#update-a-file
         */
            options = {
                content: options.content,
                message: options.message,
                modeErrorIgnore: true,
                url: options.url
            };
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    // get sha
                    local.contentRequest({ method: 'GET', url: options.url }, options.onNext);
                    break;
                case 2:
                    // put file with sha
                    local.contentRequest({
                        content: options.content,
                        message: options.message,
                        method: 'PUT',
                        sha: data.sha,
                        url: options.url
                    }, options.onNext);
                    break;
                default:
                    onError(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.contentPutFile = function (options, onError) {
        /*
         * this function will put options.file into the github file
         * https://developer.github.com/v3/repos/contents/#update-a-file
         */
            options = { file: options.file, message: options.message, url: options.url };
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    // get file from url
                    if ((/^(?:http|https):\/\//).test(options.file)) {
                        local.httpRequest({
                            method: 'GET',
                            url: options.file
                        }, function (error, response) {
                            options.onNext(error, response && response.data);
                        });
                        return;
                    }
                    // get file
                    local.fs.readFile(
                        local.path.resolve(process.cwd(), options.file),
                        options.onNext
                    );
                    break;
                case 2:
                    local.contentPut({
                        content: data,
                        message: options.message,
                        // resolve file in url
                        url: (/\/$/).test(options.url)
                            ? options.url + local.path.basename(options.file)
                            : options.url
                    }, options.onNext);
                    break;
                default:
                    onError(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.contentRequest = function (options, onError) {
        /*
         * this function will request the content from github
         */
            // init options
            options = {
                chunkList: [],
                content: options.content,
                headers: {
                    // github oauth authentication
                    Authorization: 'token ' + process.env.GITHUB_TOKEN,
                    // bug-workaround - https://developer.github.com/v3/#user-agent-required
                    'User-Agent': 'undefined'
                },
                message: options.message,
                method: options.method,
                responseJson: {},
                sha: options.sha,
                url: options.url
            };
            options.url = options.url
/* jslint-ignore-begin */
// parse https://github.com/:owner/:repo/blob/:branch/:path
.replace(
    (/^https:\/\/github.com\/([^\/]+?\/[^\/]+?)\/blob\/([^\/]+?)\/(.+)/),
    'https://api.github.com/repos/$1/contents/$3?branch=$2'
)
// parse https://github.com/:owner/:repo/tree/:branch/:path
.replace(
    (/^https:\/\/github.com\/([^\/]+?\/[^\/]+?)\/tree\/([^\/]+?)\/(.+)/),
    'https://api.github.com/repos/$1/contents/$3?branch=$2'
)
// parse https://raw.githubusercontent.com/:owner/:repo/:branch/:path
.replace(
(/^https:\/\/raw.githubusercontent.com\/([^\/]+?\/[^\/]+?)\/([^\/]+?)\/(.+)/),
    'https://api.github.com/repos/$1/contents/$3?branch=$2'
)
// parse https://:owner.github.io/:repo/:path
.replace(
    (/^https:\/\/([^\.]+?)\.github\.io\/([^\/]+?)\/(.+)/),
    'https://api.github.com/repos/$1/$2/contents/$3?branch=gh-pages'
)
/* jslint-ignore-end */
                .replace((/\?branch=(.*)/), function (match0, match1) {
                    options.branch = match1;
                    if (options.method === 'GET') {
                        match0 = match0.replace('branch', 'ref');
                    }
                    return match0;
                });
            if (options.url.indexOf('https://api.github.com/repos/') !== 0) {
                onError(new Error('invalid url ' + options.url));
                return;
            }
            if (options.method !== 'GET') {
                options.message = options.message ||
                    '[ci skip] ' + options.method + ' file ' + options.url
                    .replace((/\?.*/), '');
                options.url += '&message=' + encodeURIComponent(options.message);
                if (options.sha) {
                    options.url += '&sha=' + options.sha;
                }
                options.data = JSON.stringify({
                    branch: options.branch,
                    content: new Buffer(options.content || '').toString('base64'),
                    message: options.message,
                    sha: options.sha
                });
            }
            local.httpRequest(options, function (error, response) {
                try {
                    options.responseJson = JSON.parse(response.data.toString());
                } catch (ignore) {
                }
                onError(error, options.responseJson);
            });
        };

        local.contentTouch = function (options, onError) {
        /*
         * this function will touch options.url
         * https://developer.github.com/v3/repos/contents/#update-a-file
         */
            options = {
                message: options.message,
                modeErrorIgnore: true,
                url: options.url
            };
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    // get sha
                    local.contentRequest({ method: 'GET', url: options.url }, options.onNext);
                    break;
                case 2:
                    // put file with sha
                    local.contentRequest({
                        content: new Buffer(data.content || '', 'base64'),
                        message: options.message,
                        method: 'PUT',
                        sha: data.sha,
                        url: options.url
                    }, options.onNext);
                    break;
                default:
                    onError(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.contentTouchList = function (options, onError) {
        /*
         * this function will touch options.urlList in parallel
         * https://developer.github.com/v3/repos/contents/#update-a-file
         */
            local.onParallelList({ list: options.urlList }, function (data, onParallel) {
                onParallel.counter += 1;
                local.contentTouch({
                    message: options.message,
                    modeErrorIgnore: true,
                    url: data.element
                }, onParallel);
            }, onError);
        };
        break;
    }
    switch (local.modeJs) {



    /* istanbul ignore next */
    // run node js-env code - init-after
    case 'node':
        // init cli
        if (module !== require.main || local.global.utility2_rollup) {
            break;
        }
        local.cliDict = {};
        local.cliDict.delete = function () {
        /*
         * fileRemote commitMessage
         * delete fileRemote from github
         */
            local.contentDelete({
                message: process.argv[4],
                url: process.argv[3]
            }, function (error) {
                // validate no error occurred
                console.assert(!error, error);
            });
        };
        local.cliDict.get = function () {
        /*
         * fileRemote
         * get fileRemote from github
         */
            local.contentGet({ url: process.argv[3] }, function (error, data) {
                // validate no error occurred
                console.assert(!error, error);
                try {
                    process.stdout.write(data);
                } catch (ignore) {
                }
            });
        };
        local.cliDict.put = function () {
        /*
         * fileRemote fileLocal commitMessage
         * put fileLocal as fileRemote on github
         */
            local.contentPutFile({
                message: process.argv[5],
                url: process.argv[3],
                file: process.argv[4]
            }, function (error) {
                // validate no error occurred
                console.assert(!error, error);
            });
        };
        local.cliDict.touch = function () {
        /*
         * fileRemote commitMessage
         * touch fileRemote on github
         */
            local.contentTouch({
                message: process.argv[4],
                url: process.argv[3]
            }, function (error) {
                // validate no error occurred
                console.assert(!error, error);
            });
        };
        local.cliDict.touchlist = function () {
        /*
         * fileRemoteList commitMessage
         * touch comma-separated fileRemoteList on github
         */
            local.contentTouchList({
                message: process.argv[4],
                urlList: process.argv[3].split(',').filter(function (element) {
                    return element;
                })
            }, function (error) {
                // validate no error occurred
                console.assert(!error, error);
            });
        };
        local.cliRun();
        break;
    }
}());
