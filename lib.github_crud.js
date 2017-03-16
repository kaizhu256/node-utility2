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
            module.exports = local;
            module.exports.__dirname = __dirname;
        }
    }());



    /* istanbul ignore next */
    // run shared js-env code - pre-function
    (function () {
        local.httpRequest = function (options, onError) {
        /*
         * this function will request the data from options.url
         */
            var chunkList, onError2, timerTimeout, done, request, response, urlParsed;
            // init onError2
            onError2 = function (error) {
                if (done) {
                    return;
                }
                done = true;
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
                if (response && (response.statusCode < 200 || response.statusCode >= 300)) {
                    error = error || new Error(response.statusCode);
                    console.error(String(response.data));
                }
                // debug response
                console.error(new Date().toISOString() + ' http-response ' + JSON.stringify({
                    statusCode: (response && response.statusCode) || 0,
                    method: options.method,
                    url: options.url
                }));
                onError(error, response);
            };
            // init timerTimeout
            timerTimeout = setTimeout(function () {
                onError2(new Error('http-request timeout'));
            }, options.timeout || 30000);
            urlParsed = require('url').parse(options.url);
            urlParsed.headers = options.headers;
            urlParsed.method = options.method;
            // debug request
            console.error();
            console.error(new Date().toISOString() + ' http-request ' + JSON.stringify({
                method: options.method,
                url: options.url
            }));
            request = require(
                urlParsed.protocol.slice(0, -1)
            ).request(urlParsed, function (_response) {
                response = _response;
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
    }());
    switch (local.modeJs) {



    // run node js-env code - function
    case 'node':
        local.contentDelete = function (options, onError) {
        /*
         * this function will delete the github file
         * https://developer.github.com/v3/repos/contents/#delete-a-file
         */
            var onParallel;
            options = { url: options.url };
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
                            method: 'DELETE',
                            sha: data.sha,
                            url: options.url
                        }, options.onNext);
                        return;
                    }
                    // delete tree
                    onParallel = local.onParallel(options.onNext);
                    onParallel.counter += 1;
                    data.forEach(function (element) {
                        onParallel.counter += 1;
                        // recurse
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
            options = { content: options.content, modeErrorIgnore: true, url: options.url };
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
            options = { file: options.file, url: options.url };
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
                    // bug-workaround - github api requires user-agent header
                    'User-Agent': 'undefined'
                },
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
                options.onError2(new Error('invalid url ' + options.url));
                return;
            }
            if (options.method !== 'GET') {
                options.message = '[skip ci] ' + options.method + ' file ' + options.url
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
        break;
    }
    switch (local.modeJs) {



    /* istanbul ignore next */
    // run node js-env code - post-init
    case 'node':
        // require modules
        local.fs = require('fs');
        local.path = require('path');
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
