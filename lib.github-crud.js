#!/usr/bin/env node
/* istanbul instrument in package github-crud */
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
        local.modeJs = 'node';
        // init global
        local.global = global;
        // init utility2_rollup
        local = local.global.utility2_rollup || local;
        // init lib
        local.local = local.github_crud = local;
    }());



    /* istanbul ignore next */
    // run shared js-env code - pre-function
    (function () {
        local.jsonCopy = function (arg) {
        /*
         * this function will return a deep-copy of the JSON-arg
         */
            return arg === undefined
                ? undefined
                : JSON.parse(JSON.stringify(arg));
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
                defaults2 = defaults[key];
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
                    options.modeNext = error
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

        local.onParallel = function (onError, onDebug) {
        /*
         * this function will create a function that will
         * 1. run async tasks in parallel
         * 2. if counter === 0 or error occurred, then call onError with error
         */
            var self;
            onError = local.onErrorWithStack(onError);
            onDebug = onDebug || local.nop;
            self = function (error) {
                onDebug(error, self);
                // if previously counter === 0 or error occurred, then return
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
            };
            // init counter
            self.counter = 0;
            // return callback
            return self;
        };

        local.onTimeout = function (onError, timeout, message) {
        /*
         * this function will create a timeout-error-handler,
         * that will append the current stack to any error encountered
         */
            onError = local.onErrorWithStack(onError);
            // create timeout timer
            return setTimeout(function () {
                onError(new Error('onTimeout - timeout-error - ' +
                    timeout + ' ms - ' + (typeof message === 'function'
                    ? message()
                    : message)));
            // coerce to finite integer
            }, timeout | 0);
        };
    }());
    switch (local.modeJs) {



    // run node js-env code - function
    case 'node':
        local.contentRequest = function (options, onError) {
        /*
         * this function will request the content from github
         */
            // init options
            options = local.jsonCopy(options);
            local.objectSetDefault(options, {
                chunkList: [],
                headers: {
                    // github oauth authentication
                    Authorization: 'token ' + process.env.GITHUB_TOKEN,
                    // bug - github api requires user-agent header
                    'User-Agent': 'undefined'
                },
                method: 'GET',
                responseJson: {},
                responseText: ''
            }, 2);
            // init onError2
            options.onError2 = function (error) {
                if (options.done) {
                    return;
                }
                // cleanup timerTimeout
                clearTimeout(options.timerTimeout);
                // cleanup request and response
                [options.request, options.response].forEach(function (stream) {
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
                console.error(new Date().toISOString(
                ) + ' github-crud-response ' + JSON.stringify({
                    method: options.method,
                    url: options.url,
                    statusCode: options.response.statusCode
                }));
                onError(error, options.responseJson);
            };
            // init timerTimeout
            options.timerTimeout = local.onTimeout(
                options.onError2,
                30000,
                'github-crud ' + options.method + ' ' + options.url
            );
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
                options.onError2(new Error('invalid url ' + options.url));
                return;
            }
            options.message = '[skip ci] ' + options.method + ' file ' + options.url;
            options.url += '&message=' + encodeURIComponent(options.message);
            if (options.sha) {
                options.url += '&sha=' + options.sha;
            }
            local.objectSetDefault(options, local.url.parse(options.url));
            console.error(new Date().toISOString() + ' github-crud-request ' + JSON.stringify({
                method: options.method,
                url: options.url
            }));
            options.request = local.https.request(options, function (response) {
                options.response = response;
                if (options.response.statusCode < 200 || options.response.statusCode >= 300) {
                    options.onError2(new Error(options.response.statusCode));
                    return;
                }
                options.response
                    .on('data', function (chunk) {
                        options.chunkList.push(chunk);
                    })
                    .on('end', function () {
                        try {
                            options.responseText = Buffer.concat(options.chunkList).toString();
                            options.responseJson = JSON.parse(options.responseText);
                        } catch (ignore) {
                        }
                        options.onError2();
                    })
                    .on('error', options.onError2);
            })
                .on('error', options.onError2);
            options.request.end(JSON.stringify({
                branch: options.branch,
                content: new Buffer(options.content || '').toString('base64'),
                message: '[skip ci] ' + options.method + ' file ' + options.url,
                sha: options.sha
            }));
        };

        local.contentDelete = function (options, onError) {
        /*
         * this function will delete the github file
         * https://developer.github.com/v3/repos/contents/#delete-a-file
         */
            var onParallel;
            options = local.jsonCopy(options);
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    local.contentRequest(options, options.onNext);
                    break;
                case 2:
                    // file was deleted
                    if (options.method === 'DELETE') {
                        options.onNext();
                        return;
                    }
                    // get sha
                    if (!error && data.sha) {
                        // recurse
                        options.method = 'DELETE';
                        options.sha = data.sha;
                        local.contentDelete(options, options.onNext);
                        return;
                    }
                    // delete tree
                    onParallel = local.onParallel(options.onNext);
                    onParallel.counter += 1;
                    data.forEach(function (element) {
                        onParallel.counter += 1;
                        local.contentDelete({ url: element.url }, onParallel);
                    });
                    onParallel();
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
            options = local.jsonCopy(options);
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    options.method = 'GET';
                    local.contentRequest(options, options.onNext);
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
            options = local.jsonCopy(options);
            local.contentRequest(options, function (error, data) {
                if (!error && data) {
                    options.sha = data.sha;
                }
                options.method = 'PUT';
                local.contentRequest(options, onError);
            });
        };

        local.contentPutFile = function (options, onError) {
        /*
         * this function will put options.file into the github file
         * https://developer.github.com/v3/repos/contents/#update-a-file
         */
            options = local.jsonCopy(options);
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    // get file from url
                    if ((/^(?:http|https):\/\//).test(options.file)) {
                        (options.file.indexOf('https') === 0
                            ? local.https
                            : local.http).request(local.url.parse(
                            options.file
                        ), function (response) {
                            local.chunkList = [];
                            response
                                .on('data', function (chunk) {
                                    local.chunkList.push(chunk);
                                })
                                .on('end', function () {
                                    options.onNext(null, Buffer.concat(local.chunkList));
                                })
                                .on('error', options.onNext);
                        })
                            .on('error', options.onNext)
                            .end();
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
        break;
    }
    switch (local.modeJs) {



    /* istanbul ignore next */
    // run node js-env code - post-init
    case 'node':
        // require modules
        local.fs = require('fs');
        local.http = require('http');
        local.https = require('https');
        local.path = require('path');
        local.url = require('url');
        // init exports
        module.exports = module['./lib.db.js'] = local;
        module.exports.__dirname = __dirname;
        // run the cli
        if (module !== require.main || local.global.utility2_rollup) {
            break;
        }
        switch (String(process.argv[2]).toLowerCase()) {
        // delete file
        case 'delete':
            local.contentDelete({ url: process.argv[3] }, function (error) {
                // validate no error occurred
                console.assert(!error, error);
            });
            break;
        // get file
        case 'get':
            local.contentGet({ url: process.argv[3] }, function (error, data) {
                // validate no error occurred
                console.assert(!error, error);
                try {
                    process.stdout.write(data);
                } catch (ignore) {
                }
            });
            break;
        // put file
        case 'put':
            local.contentPutFile({
                url: process.argv[3],
                file: process.argv[4]
            }, function (error) {
                // validate no error occurred
                console.assert(!error, error);
            });
            break;
        }
        break;
    }
}());
