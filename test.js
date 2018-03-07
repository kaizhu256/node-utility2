/* istanbul instrument in package utility2 */
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
        // re-init local
        local = local.global.local = (local.global.utility2 ||
            require('./lib.utility2.js')).requireReadme();
        // init test
        local.testRunInit(local);
    }());



    // run shared js-env code - function
    (function () {
        local._testCase_testRunDefault_failure = function (options, onError) {
        /*
         * this function will test testRunDefault's failure handling-behavior
         */
            // test failure from callback handling-behavior
            onError(local.errorDefault);
            // test failure from multiple-callback handling-behavior
            onError(null, options);
            // test failure from ajax handling-behavior
            local.ajax({ url: '/undefined' }, onError);
            // test failure from thrown error handling-behavior
            throw local.errorDefault;
        };

        local.testCase_FormData_default = function (options, onError) {
        /*
         * this function will test FormData's default handling-behavior
         */
            options = {};
            options.blob1 = new local.Blob(['aa', 'bb', '\u1234 ', 0]);
            options.blob2 = new local.Blob(['aa', 'bb', '\u1234 ', 0], {
                type: 'text/plain; charset=utf-8'
            });
            options.data = new local.FormData();
            options.data.append('text1', 'aabb\u1234 0');
            // test file-upload handling-behavior
            options.data.append('file1', options.blob1);
            // test file-upload and filename handling-behavior
            options.data.append('file2', options.blob2, 'filename2.txt');
            options.method = 'POST';
            options.url = '/test.echo';
            local.ajax(options, function (error, xhr) {
                // validate no error occurred
                local.assert(!error, error);
                // validate responseText
                local.assert(xhr.responseText.indexOf(
                    '\r\nContent-Disposition: form-data; ' +
                        'name="text1"\r\n\r\naabb\u1234 0\r\n'
                ) >= 0, xhr.responseText);
                local.assert(xhr.responseText.indexOf(
                    '\r\nContent-Disposition: form-data; ' +
                        'name="file1"\r\n\r\naabb\u1234 0\r\n'
                ) >= 0, xhr.responseText);
                local.assert(xhr.responseText.indexOf(
                    '\r\nContent-Disposition: form-data; name="file2"; ' +
                        'filename="filename2.txt"\r\nContent-Type: text/plain; ' +
                        'charset=utf-8\r\n\r\naabb\u1234 0\r\n'
                ) >= 0, xhr.responseText);
                onError(null, options);
            });
        };

        local.testCase_FormData_error = function (options, onError) {
        /*
         * this function will test FormData's error handling-behavior
         */
            local.testMock([
                [local.FormData.prototype, { read: function (onError) {
                    onError(local.errorDefault);
                } }]
            ], function (onError) {
                local.ajax({
                    data: new local.FormData(),
                    method: 'POST',
                    url: '/test.echo'
                }, function (error) {
                    // validate error occurred
                    local.assert(error, error);
                    onError(null, options);
                });
            }, onError);
        };

        local.testCase_FormData_nullCase = function (options, onError) {
        /*
         * this function will test FormData's null-case handling-behavior
         */
            local.ajax({
                data: new local.FormData(),
                method: 'POST',
                url: '/test.echo'
            }, function (error, xhr) {
                // validate no error occurred
                local.assert(!error, error);
                // validate responseText
                local.assert((/\r\n\r\n$/).test(xhr.responseText), xhr.responseText);
                onError(null, options);
            });
        };

        local.testCase_ajaxProgressUpdate_misc = function (options, onError) {
        /*
         * this function will test ajaxProgressUpdate's misc handling-behavior
         */
            if (!(local.modeJs === 'browser' && document.querySelector('#ajaxProgressDiv1'))) {
                onError(null, options);
                return;
            }
            local.testMock([
                [local, { ajaxProgressCounter: 0, ajaxProgressState: 0 }],
                [local.global, { clearTimeou: local.nop, setTimeout: function (fnc) {
                    local.ajaxProgressState = 1;
                    fnc();
                } }]
            ], function (onError) {
                // test progress-finish handling-behavior
                local.ajaxProgressCounter = 0;
                local.ajaxProgressUpdate();
                // validate data
                local.assertJsonEqual(local.ajaxProgressState, 1);
                // test progress-update handling-behavior
                local.ajaxProgressCounter = 1;
                // test NaN handling-behavior
                document.querySelector('#ajaxProgressDiv1').style.width = '0px';
                local.ajaxProgressUpdate();
                // validate data
                local.assertJsonEqual(local.ajaxProgressState, 1);
                onError(null, options);
            }, onError);
        };

        local.testCase_ajax_abort = function (options, onError) {
        /*
         * this function will test ajax's abort handling-behavior
         */
            options = local.ajax({ url: '/test.timeout' }, function (error) {
                // validate error occurred
                local.assert(error, error);
                onError(null, options);
            });
            // test multiple-callback handling-behavior
            options.onEvent({ type: 'abort' });
            options.abort();
            options.abort();
        };

        local.testCase_ajax_assets = function (options, onError) {
        /*
         * this function will test ajax's assets handling-behavior
         */
            local.ajax({ url: 'LICENSE' }, function (error, xhr) {
                // validate no error occurred
                local.assert(!error, error);
                // validate statusCode
                local.assertJsonEqual(xhr.statusCode, 200);
                onError(null, options);
            });
        };

        local.testCase_ajax_cache = function (options, onError) {
        /*
         * this function will test ajax's cache handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            options = {};
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    // test http GET handling-behavior
                    local.ajax({ url: 'assets.hello' }, options.onNext);
                    break;
                case 2:
                    // validate responseText
                    local.assertJsonEqual(data.responseText, 'hello\n');
                    // test http GET 304 cache handling-behavior
                    local.ajax({
                        headers: {
                            'If-Modified-Since': new Date(Date.now() + 0xffff).toGMTString()
                        },
                        url: 'assets.hello'
                    }, options.onNext);
                    break;
                case 3:
                    // validate statusCode
                    local.assertJsonEqual(data.statusCode, 304);
                    options.onNext();
                    break;
                default:
                    onError(error, options);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_ajax_error = function (options, onError) {
        /*
         * this function will test ajax's error handling-behavior
         */
            local.onParallelList({ list: [{
                // test 404-not-found-error handling-behavior
                url: '/test.error-404'
            }, {
                // test 500-internal-server-error handling-behavior
                url: '/test.error-500'
            }, {
                // test undefined-error handling-behavior
                url: '/test.error-undefined'
            }, {
                // test corsForwardProxyHost handling-behavior
                corsForwardProxyHost: 'https://undefined:0',
                location: { host: 'undefined.github.io' },
                timeout: 1,
                // test undefined-https-url handling-behavior
                url: 'https://undefined:0'
            }] }, function (options2, onParallel) {
                onParallel.counter += 1;
                local.ajax(options2.element, function (error, xhr) {
                    // validate error occurred
                    local.assert(error, error);
                    // test getAllResponseHeaders' null-case handling-behavior
                    xhr.getAllResponseHeaders();
                    // test getResponseHeader' null-case handling-behavior
                    xhr.getResponseHeader('undefined');
                    onParallel(null, options);
                });
            }, onError);
        };

        local.testCase_ajax_post = function (options, onError) {
        /*
         * this function will test ajax's POST handling-behavior
         */
            options = {};
            // test /test.body handling-behavior
            local.onParallelList({ list: [
                '',
                'arraybuffer',
                'stream',
                'text'
            ] }, function (responseType, onParallel) {
                responseType = responseType.element;
                onParallel.counter += 1;
                local.ajax({
                    data: responseType === 'arraybuffer'
                        // test buffer post handling-behavior
                        ? local.bufferCreate('aa')
                        // test string post handling-behavior
                        : 'aa',
                    method: 'POST',
                    // test nodejs response handling-behavior
                    responseType: responseType === 'stream' && local.modeJs === 'node'
                        ? responseType
                        : '',
                    url: '/test.body'
                }, function (error, xhr) {
                    // validate no error occurred
                    local.assert(!error, error);
                    // validate statusCode
                    local.assertJsonEqual(xhr.statusCode, 200);
                    // validate response
                    switch (responseType) {
                    case 'arraybuffer':
                    case 'stream':
                        // cleanup response
                        local.streamListCleanup([xhr.response]);
                        // validate response
                        options.data = xhr.response;
                        local.assert(options.data, options);
                        break;
                    default:
                        // validate responseText
                        options.data = xhr.responseText;
                        local.assertJsonEqual(options.data, 'aa');
                    }
                    onParallel(null, options);
                });
            }, function (error) {
                // validate no error occurred
                local.assert(!error, error);
                // test /test.echo handling-behavior
                local.ajax({
                    data: 'aa',
                    // test request-header handling-behavior
                    headers: { 'X-Request-Header-Test': 'aa' },
                    method: 'POST',
                    // test modeDebug handling-behavior
                    modeDebug: true,
                    url: '/test.echo'
                }, function (error, xhr) {
                    // validate no error occurred
                    local.assert(!error, error);
                    // validate statusCode
                    local.assertJsonEqual(xhr.statusCode, 200);
                    // validate response
                    options.data = xhr.responseText;
                    local.assert((/\r\naa$/).test(options.data), options.data);
                    local.assert(
                        (/\r\nx-request-header-test: aa\r\n/).test(options.data),
                        options.data
                    );
                    // validate responseHeaders
                    options.data = xhr.getAllResponseHeaders();
                    local.assert(
                        (/^X-Response-Header-Test: bb\r\n/im).test(options.data),
                        options.data
                    );
                    options.data = xhr.getResponseHeader('x-response-header-test');
                    local.assertJsonEqual(options.data, 'bb');
                    options.data = xhr.getResponseHeader('undefined');
                    local.assertJsonEqual(options.data, null);
                    onError(null, options);
                });
            });
        };

        local.testCase_ajax_standalone = function (options, onError) {
        /*
         * this function will test ajax's standalone handling-behavior
         */
            if (local.modeJs !== 'browser') {
                onError(null, options);
                return;
            }
            local.testMock([
                [local, {
                    ajaxProgressUpdate: null,
                    bufferToNodeBuffer: null,
                    bufferToString: null,
                    corsForwardProxyHostIfNeeded: null,
                    errorMessagePrepend: null,
                    nop: null,
                    onErrorWithStack: null,
                    onTimeout: null,
                    serverLocalUrlTest: null,
                    streamListCleanup: null,
                    timeoutDefault: null,
                    tryCatchOnError: null
                }]
            ], function (onError) {
                local.ajax({ undefined: undefined, url: '/' }, function (error) {
                    // validate no error occurred
                    local.assert(!error, error);
                });
                onError(null, options);
            }, onError);
        };

        local.testCase_ajax_timeout = function (options, onError) {
        /*
         * this function will test ajax's timeout handling-behavior
         */
            setTimeout(function () {
                local.ajax({ timeout: 1, url: '/test.timeout' }, function (error) {
                    // validate error occurred
                    local.assert(error, error);
                    onError(null, options);
                });
            }, 1000);
        };

        local.testCase_assertXxx_default = function (options, onError) {
        /*
         * this function will test assertXxx's default handling-behavior
         */
            // test assertion passed
            local.assert(true, true);
            // test assertion failed with undefined message
            local.tryCatchOnError(function () {
                local.assert(null);
            }, function (error) {
                // validate error occurred
                local.assert(error, error);
                // validate error-message
                local.assertJsonEqual(error.message, '');
            });
            // test assertion failed with string message
            local.tryCatchOnError(function () {
                local.assert(null, 'aa');
            }, function (error) {
                // validate error occurred
                local.assert(error, error);
                // validate error-message
                local.assertJsonEqual(error.message, 'aa');
            });
            // test assertion failed with error object
            local.tryCatchOnError(function () {
                local.assert(null, local.errorDefault);
            }, function (error) {
                // validate error occurred
                local.assert(error, error);
            });
            // test assertion failed with json object
            local.tryCatchOnError(function () {
                local.assert(null, { aa: 1 });
            }, function (error) {
                // validate error occurred
                local.assert(error, error);
                // validate error-message
                local.assertJsonEqual(error.message, '{"aa":1}');
            });
            ['', 0, false, null, undefined].forEach(function (aa, ii) {
                ['', 0, false, null, undefined].forEach(function (bb, jj) {
                    if (ii === jj) {
                        // test assertJsonEqual's handling-behavior
                        local.assertJsonEqual(aa, bb);
                    } else {
                        // test assertJsonNotEqual's handling-behavior
                        local.assertJsonNotEqual(aa, bb);
                    }
                });
            });
            onError(null, options);
        };

        local.testCase_base64Xxx_default = function (options, onError) {
        /*
         * this function will test base64Xxx's default handling-behavior
         */
            options = {};
            options.base64 = local.base64FromString(local.stringCharsetAscii + '\u1234');
            // test null-case handling-behavior
            local.assertJsonEqual(local.base64FromBuffer(), '');
            local.assertJsonEqual(local.base64FromHex(), '');
            local.assertJsonEqual(local.base64FromString(), '');
            local.assertJsonEqual(local.base64ToBuffer(), {});
            local.assertJsonEqual(local.base64ToHex(), '');
            local.assertJsonEqual(local.base64ToString(), '');
            local.assertJsonEqual(local.base64FromBuffer(local.base64ToBuffer()), '');
            local.assertJsonEqual(local.base64FromHex(local.base64ToHex()), '');
            local.assertJsonEqual(local.base64FromString(local.base64ToString()), '');
            // test commutation handling-behavior
            local.assertJsonEqual(
                local.base64FromBuffer(local.base64ToBuffer(options.base64)),
                options.base64
            );
            local.assertJsonEqual(
                local.base64FromHex(local.base64ToHex(options.base64)),
                options.base64
            );
            local.assertJsonEqual(
                local.base64FromString(local.base64ToString(options.base64)),
                options.base64
            );
            onError(null, options);
        };

        local.testCase_blobRead_default = function (options, onError) {
        /*
         * this function will test blobRead's default handling-behavior
         */
            local.onParallelList({ list: [
                new local.Blob(['aa', 'bb', '\u1234 ', 0]),
                new local.Blob(['aa', 'bb', '\u1234 ', 0], {
                    type: 'text/plain; charset=utf-8'
                })
            ] }, function (options2, onParallel) {
                onParallel.counter += 1;
                [null, 'dataURL', 'text'].forEach(function (encoding) {
                    onParallel.counter += 1;
                    local.blobRead(options2.element, encoding, function (error, data) {
                        // validate no error occurred
                        local.assert(!error, error);
                        // validate data
                        switch (encoding) {
                        case 'dataURL':
                            if (options2.ii === 0) {
                                local.assertJsonEqual(data, 'data:;base64,YWFiYuGItCAw');
                                break;
                            }
                            local.assertJsonEqual(
                                data,
                                'data:text/plain; charset=utf-8;base64,YWFiYuGItCAw'
                            );
                            break;
                        case 'text':
                            local.assertJsonEqual(data, 'aabb\u1234 0');
                            break;
                        default:
                            local.assertJsonEqual(
                                local.bufferToString(data),
                                'aabb\u1234 0'
                            );
                        }
                        onParallel(null, options);
                    });
                });
                onParallel(null, options);
            }, onError);
        };

        local.testCase_blobRead_error = function (options, onError) {
        /*
         * this function will test blobRead's error handling-behavior
         */
            if (local.modeJs !== 'browser') {
                onError(null, options);
                return;
            }
            local.testMock([
                [local.global.FileReader.prototype, { readAsArrayBuffer: function () {
                    this.onabort({ type: 'abort' });
                    this.onerror({ type: 'error' });
                } }]
            ], function (onError) {
                local.blobRead(null, null, function (error) {
                    // validate error occurred
                    local.assert(error, error);
                });
                onError(null, options);
            }, onError);
        };

        local.testCase_browserTest_default = function (options, onError) {
        /*
         * this function will test browserTest's default handling-behavior
         */
            var options2;
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            options = {};
            local.onNext(options, function (error) {
                switch (options.modeNext) {
                // test scrape handling-behavior
                case 1:
                    options2 = {};
                    options2.modeBrowserTest = 'scrape';
                    options2.modeBrowserTestRecurseDepth = 1;
                    options2.modeBrowserTestRecurseExclude = 'undefined';
                    options2.modeTestIgnore = true;
                    options2.timeoutScreenshot = 1000;
                    options2.url = local.serverLocalHost + '/assets.recurse1';
                    local.browserTest(options2, options.onNext);
                    break;
                // test translateAfterScrape handling-behavior
                case 2:
                    options2.modeBrowserTest = 'translateAfterScrape';
                    options2.modeBrowserTestTranslate = 'ru,zh-CN';
                    options2.modeNext = 0;
                    options2.url = options2.fileScreenshotBase;
                    local.browserTest(options2, options.onNext);
                    break;
                case 3:
                    // validate scraped files
                    [
                        options2.fileScreenshotBase + '.html',
                        options2.fileScreenshotBase + '.png',
                        options2.fileScreenshotBase + '.translateAfterScrape.ru.html',
                        options2.fileScreenshotBase + '.translateAfterScrape.ru.png',
                        options2.fileScreenshotBase + '.translateAfterScrape.zh-CN.html',
                        options2.fileScreenshotBase + '.translateAfterScrape.zh-CN.png',
                        options2.fileScreenshotBase.replace('recurse1', 'recurse2') + '.html',
                        options2.fileScreenshotBase.replace('recurse1', 'recurse2') + '.png'
                    ].forEach(function (file) {
                        local.assert(local.fs.existsSync(file), file);
                        local.fs.unlinkSync(file);
                    });
                    options.onNext();
                    break;
                default:
                    onError(error, options);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };
        local.testCase_browserTest_default.timeout = 60000;

        local.testCase_browserTest_electron = function (options, onError) {
        /*
         * this function will test browserTest's electron handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            options = function (arg0, arg1) {
                // test onParallel handling-behavior
                if (typeof arg0 === 'function') {
                    arg0();
                }
                // test on handling-behavior
                if (typeof arg1 === 'function') {
                    arg1(options, '');
                    arg1(options, options.fileElectronHtml);
                    arg1(options, options.fileElectronHtml + ' opened');
                }
                return options;
            };
            options.BrowserWindow = options;
            options.app = options;
            options.electron = options;
            options.capturePage = options;
            options.loadURL = options;
            options.on = options;
            options.once = options;
            options.prototype = options;
            options.toPng = options;
            options.unref = options;
            local.testMock([
                [local.global, { setTimeout: options }],
                [process.versions, { electron: true }],
                [local, { onParallel: options }]
            ], function (onError) {
                local.browserTest(options, local.nop);
                options.modeNext = 0;
                options.modeBrowserTest = 'scrape';
                local.browserTest(options, local.nop);
                onError(null, options);
            }, onError);
        };

        local.testCase_bufferCreate_default = function (options, onError) {
        /*
         * this function will test bufferCreate's default handling-behavior
         */
            options = {};
            options.text1 = '';
            for (options.ii = 0; options.ii < 0x10000; options.ii += 1) {
                options.text1 += String.fromCodePoint(options.ii);
            }
            for (options.ii = 0x10000; options.ii < 0x110000; options.ii += 0x100) {
                options.text1 += String.fromCodePoint(options.ii);
            }
            // test utf8 handling-behavior
            options.bff1 = local.bufferCreate(options.text1);
            options.text2 = local.bufferToString(options.bff1);
            local.assertJsonEqual(options.text2, local.bufferToString(options.text2));
            onError(null, options);
        };

        local.testCase_bufferCreate_polyfill = function (options, onError) {
        /*
         * this function will test bufferCreate's polyfill handling-behavior
         */
            options = [
                [local.global, { TextDecoder: null, TextEncoder: null }]
            ];
            // test exit's default handling-behavior
            local.testMock(options, function (onError) {
                local.testCase_bufferCreate_default(null, onError);
            }, onError);
        };

        local.testCase_bufferIndexOfSubBuffer_default = function (options, onError) {
        /*
         * this function will test bufferIndexOfSubBuffer's default handling-behavior
         */
            [
                { buffer: '', subBuffer: '', validate: 0 },
                { buffer: '', subBuffer: 'aa', validate: -1 },
                { buffer: 'aa', subBuffer: '', validate: 0 },
                { buffer: 'aa', subBuffer: 'aa', validate: 0 },
                { buffer: 'aa', subBuffer: 'bb', validate: -1 },
                { buffer: 'aaaa', subBuffer: 'aa', validate: 0 },
                { buffer: 'aabb', subBuffer: 'aa', validate: 0 },
                { buffer: 'aabb', subBuffer: 'bb', validate: 2 },
                { buffer: 'aabbaa', subBuffer: 'aa', validate: 0 },
                { buffer: 'aabbaa', subBuffer: 'bb', validate: 2 },
                { buffer: 'aabbaa', subBuffer: 'ba', validate: 3 }
            ].forEach(function (options) {
                options.data = local.bufferIndexOfSubBuffer(
                    local.bufferCreate(options.buffer),
                    local.bufferCreate(options.subBuffer),
                    options.fromIndex
                );
                local.assertJsonEqual(options.data, options.validate);
            });
            onError(null, options);
        };

        local.testCase_buildApidoc_default = function (options, onError) {
        /*
         * this function will test buildApidoc's default handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            options = {};
            // test $npm_config_mode_coverage=all handling-behavior
            local.testMock([
                [local.env, { npm_config_mode_coverage: 'all' }]
            ], function (onError) {
                local.buildApidoc(null, onError);
            }, local.onErrorThrow);
            // test $npm_package_buildCustomOrg handling-behavior
            local.testMock([
                [local.env, { npm_package_buildCustomOrg: 'electron-lite' }]
            ], function (onError) {
                local.buildApidoc(options, onError);
            }, local.onErrorThrow);
            local.buildApidoc({ blacklistDict: options }, onError);
        };

        local.testCase_buildApp_default = function (options, onError) {
        /*
         * this function will test buildApp's default handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            local.testCase_buildReadme_default(options, local.onErrorThrow);
            local.testCase_buildLib_default(options, local.onErrorThrow);
            local.testCase_buildTest_default(options, local.onErrorThrow);
            options = { assetsList: [{
                file: '/LICENSE',
                url: '/LICENSE'
            }, {
                file: '/assets.hello',
                url: '/assets.hello'
            }, {
                file: '/assets.script_only.html',
                url: '/assets.script_only.html'
            }, {
                file: '/assets.utility2.lib.db.js',
                url: '/assets.utility2.lib.db.js'
            }, {
                file: '/assets.utility2.lib.istanbul.js',
                url: '/assets.utility2.lib.istanbul.js'
            }, {
                file: '/assets.utility2.lib.jslint.js',
                url: '/assets.utility2.lib.jslint.js'
            }, {
                file: '/assets.utility2.lib.marked.js',
                url: '/assets.utility2.lib.marked.js'
            }, {
                file: '/assets.utility2.lib.sjcl.js',
                url: '/assets.utility2.lib.sjcl.js'
            }, {
                file: '/assets.utility2.lib.uglifyjs.js',
                url: '/assets.utility2.lib.uglifyjs.js'
            }, {
                file: '/assets.utility2.rollup.js',
                url: '/assets.utility2.rollup.js'
            }] };
            local.buildApp(options, onError);
        };

        local.testCase_buildCustomOrg_default = function (options, onError) {
        /*
         * this function will test buildCustomOrg's default handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            local.testMock([
                [local.env, { GITHUB_ORG: '', npm_package_buildCustomOrg: 'electron-lite' }],
                [local.fs, { writeFileSync: local.nop }],
                [local.global, { setTimeout: function (onError) {
                    onError(null, options);
                } }],
                [process, { on: function (options, onError) {
                    // test error handling-behavior
                    onError(local.errorDefault, options);
                } }]
            ], function (onError) {
                // test npmdoc handling-behavior
                local.env.GITHUB_ORG = 'npmdoc';
                local.buildCustomOrg({}, local.onErrorThrow);
                // test npmtest handling-behavior
                local.env.GITHUB_ORG = 'npmtest';
                local.buildCustomOrg({}, local.onErrorThrow);
                // test scrapeitall handling-behavior
                local.env.GITHUB_ORG = 'scrapeitall';
                local.buildCustomOrg({}, local.onErrorThrow);
                onError(null, options);
            }, local.onErrorThrow);
            local.buildCustomOrg({}, onError);
        };

        local.testCase_buildLib_default = function (options, onError) {
        /*
         * this function will test buildLib's default handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            options = {};
            local.testMock([
                [local.fs, {
                    // test customize-local handling-behavior
                    existsSync: function () {
                        return true;
                    },
                    writeFileSync: local.nop
                }]
            ], function (onError) {
                local.buildLib(options, onError);
            }, local.onErrorThrow);
            options = {};
            local.buildLib(options, onError);
        };

        local.testCase_buildReadme_default = function (options, onError) {
        /*
         * this function will test buildReadme's default handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            options = {};
            options.customize = function () {
                options.dataFrom = options.dataFrom
                    // test shDeployCustom handling-behavior
                    .replace('shDeployGithub', 'shDeployCustom')
                    // test no-assets.index.template.html handling-behavior
                    .replace('assets.index.default.template.html', '');
            };
            options.fsReadFileSync = local.fs.readFileSync;
            local.testMock([
                [local.env, {
                    npm_package_buildCustomOrg: '',
                    npm_package_isPrivate: '1',
                    npm_package_name: 'undefined'
                }],
                [local.fs, {
                    existsSync: function () {
                        return true;
                    },
                    readFileSync: function (file) {
                        return local.tryCatchOnError(function () {
                            return options.fsReadFileSync(file, 'utf8');
                        }, function () {
                            return '{}';
                        });
                    },
                    writeFileSync: local.nop
                }],
                [local.assetsDict, {
                    // test no-assets.index.default.template.html handling-behavior
                    '/assets.index.template.html': '',
                    // test customize example.js handling-behavior
                    '/index.html': ''
                }]
            ], function (onError) {
                local.buildReadme(options, onError);
                // test $npm_package_buildCustomOrg handling-behavior
                local.env.npm_package_buildCustomOrg = 'aa';
                local.buildReadme(options, onError);
                onError(null, options);
            }, local.onErrorThrow);
            options = {};
            options.customize = function () {
                // search-and-replace - customize dataTo
                [
                    // customize quickstart example.js
                    (/# quickstart example.js[\S\s]*?istanbul instrument in package/),
                    // customize quickstart-footer
                    (/>\[download standalone app\]<[^`]*?utility2FooterDiv/),
                    (/```[^`]*?\n# extra screenshots/),
                    // customize build-script
                    (/# run shBuildCi[^`]*?```/)
                ].forEach(function (rgx) {
                    options.dataFrom.replace(rgx, function (match0) {
                        options.dataTo = options.dataTo.replace(rgx, match0);
                    });
                });
            };
            local.buildReadme(options, onError);
        };

        local.testCase_buildXxx_default = function (options, onError) {
        /*
         * this function will test buildXxx's default handling-behavior
         */
            local.testMock([
                [local, {
                    assetsDict: { '/': '' },
                    browserTest: local.nop,
                    buildApidoc: local.nop,
                    buildCustomOrg: local.nop,
                    buildLib: local.nop,
                    buildReadme: local.nop,
                    buildTest: local.nop,
                    testCase_buildReadme_default: local.nop,
                    testCase_buildLib_default: local.nop,
                    testCase_buildTest_default: local.nop,
                    testCase_buildCustomOrg_default: local.nop
                }]
            ], function (onError) {
                local._testCase_buildApidoc_default(null, local.nop);
                local._testCase_buildApp_default(null, local.nop);
                local._testCase_buildCustomOrg_default(null, local.nop);
                local._testCase_buildLib_default(null, local.nop);
                local._testCase_buildReadme_default(null, local.nop);
                local._testCase_buildTest_default(null, local.nop);
                local._testCase_webpage_default(null, local.nop);
                local.assetsDict['/'] = '<script src="assets.test.js"></script>';
                local._testCase_webpage_default(null, local.nop);
                onError(null, options);
            }, onError);
        };

        local.testCase_childProcessSpawnWithTimeout_default = function (options, onError) {
        /*
         * this function will test childProcessSpawnWithTimeout's default handling-behavior
         */
            var onParallel;
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            options = {};
            onParallel = local.onParallel(onError);
            onParallel.counter += 1;
            // test default handling-behavior
            onParallel.counter += 1;
            local.childProcessSpawnWithTimeout('ls')
                .on('error', onParallel)
                .on('exit', function (exitCode, signal) {
                    // validate exitCode
                    local.assertJsonEqual(exitCode, 0);
                    // validate signal
                    local.assertJsonEqual(signal, null);
                    onParallel(null, options);
                });
            // test timeout handling-behavior
            onParallel.counter += 1;
            local.testMock([
                [local, { timeoutDefault: 1000 }]
            ], function (onError) {
                options.childProcess = local.childProcessSpawnWithTimeout('sleep', [5000]);
                onError(null, options);
            }, local.onErrorThrow);
            options.childProcess
                .on('error', onParallel)
                .on('exit', function (exitCode, signal) {
                    // validate exitCode
                    local.assertJsonEqual(exitCode, null);
                    // validate signal
                    local.assertJsonEqual(signal, 'SIGKILL');
                    onParallel(null, options);
                });
            onParallel(null, options);
        };

        local.testCase_cliRun_default = function (options, onError) {
        /*
         * this function will test cliRun's default handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            local.testMock([
                [local, { replStart: null }],
                [local.cliDict, { _default: null }],
                [local.vm, { runInThisContext: local.nop }],
                [process, { argv: [] }]
            ], function (onError) {
                local.cliRun();
                local.replStart = local.nop;
                process.argv[2] = '--help';
                local.cliRun();
                ['--eval', '--help', '--interactive', '--version'].forEach(function (key) {
                    local.cliDict[key]();
                });
                onError(null, options);
            }, onError);
        };

        local.testCase_cookieXxx_default = function (options, onError) {
        /*
         * this function will test cookieXxx's default handling-behavior
         */
            if (local.modeJs !== 'browser') {
                onError(null, options);
                return;
            }
            // test cookieRemoveAll handling-behavior
            local.cookieRemoveAll();
            // validate data
            local.assertJsonEqual(local.cookieDict().aa, undefined);
            // test cookieSet handling-behavior
            local.cookieSet('aa', 'bb', 1000);
            // validate data
            local.assertJsonEqual(local.cookieDict().aa, 'bb');
            // test cookieRemove handling-behavior
            local.cookieRemove('aa');
            // validate data
            local.assertJsonEqual(local.cookieDict().aa, undefined);
            // test cookieSet handling-behavior
            local.cookieSet('aa', 'bb', 1000);
            // test cookieRemoveAll handling-behavior
            local.cookieRemoveAll();
            // validate data
            local.assertJsonEqual(local.cookieDict().aa, undefined);
            onError(null, options);
        };

        local.testCase_corsBackendHostInject_default = function (options, onError) {
        /*
         * this function will corsBackendHostInject's default handling-behavior
         */
            // test null-case handling-behavior
            local.assertJsonEqual(local.corsBackendHostInject(), undefined);
            // test override-all handling-behavior
            local.assertJsonEqual(local.corsBackendHostInject(
                'cc.com',
                'aa-alpha.bb.com',
                null,
                { host: 'github.io', pathname: '/build..beta..travis-ci.org/' }
            ), 'aa-beta.bb.com');
            // test override-rgx handling-behavior
            local.assertJsonEqual(local.corsBackendHostInject(
                'cc/dd',
                'aa-alpha.bb.com/',
                (/(^cc\/)/),
                { host: 'github.io', pathname: '/build..beta..travis-ci.org/' }
            ), 'aa-beta.bb.com/cc/dd');
            onError(null, options);
        };

        local.testCase_corsForwardProxyHostIfNeeded_default = function (options, onError) {
        /*
         * this function will corsForwardProxyHostIfNeeded's default handling-behavior
         */
            if (local.modeJs !== 'browser') {
                onError(null, options);
                return;
            }
            local.assert(local.corsForwardProxyHostIfNeeded({
                location: { host: 'undefined.github.io' },
                url: 'https://example.com'
            }).indexOf('.herokuapp.com') >= 0);
            onError(null, options);
        };

        local.testCase_dbTableCustomOrgXxx_default = function (options, onError) {
        /*
         * this function will test dbTableCustomOrgXxx's default handling-behavior
         */
            local.testMock([
                [local, {
                    ajax: function (options, onError) {
                        onError(null, {
                            responseText: JSON.stringify({
                                '@pagination': { count: 0 },
                                repositories: [{
                                    _id: '',
                                    name: 'node-aa-bb-cc',
                                    private: false,
                                    slug: 'aa/node-aa-bb-cc'
                                }]
                            })
                        }, options);
                    },
                    db: {
                        crudGetManyByQuery: local.nop,
                        crudRemoveManyByQuery: local.nop,
                        crudSetManyById: local.nop,
                        dbTableCreateOne: function (options, onError) {
                            (onError || local.nop)(null, local.db, options);
                            return local.db;
                        },
                        save: function (onError) {
                            onError(null, options);
                        }
                    },
                    setTimeoutOnError: function (onError, timeout, error) {
                        onError(error, timeout);
                    }
                }]
            ], function (onError) {
                local.dbTableCustomOrgUpdate({ customOrg: 'aa' }, local.onErrorThrow);
                local.dbTableCustomOrgCrudGetManyByQuery({});
                onError(null, options);
            }, local.onErrorThrow);
            onError(null, options);
        };

        local.testCase_debug_inline_default = function (options, onError) {
        /*
         * this function will test debug_inline's default handling-behavior
         */
            options = {};
            local.testMock([
                [local, { _consoleError: function (arg) {
                    options.data += (arg || '') + '\n';
                } }]
            ], function (onError) {
                options.data = '';
                local.global['debug_inline'.replace('_i', 'I')]('aa');
                // validate data
                local.assertJsonEqual(
                    options.data,
                    '\n\n\ndebug_inline\naa\n\n'.replace('_i', 'I')
                );
                onError(null, options);
            }, onError);
        };

        local.testCase_domElementRender_default = function (options, onError) {
        /*
         * this function will test domElementRender's default handling-behavior
         */
            if (local.modeJs !== 'browser') {
                onError(null, options);
                return;
            }
            local.assertJsonEqual(local.domElementRender('<div>{{value}}</div>', {
                value: 'aa'
            }).children[0].outerHTML, '<div>aa</div>');
            onError(null, options);
        };

        local.testCase_echo_default = function (options, onError) {
        /*
         * this function will test echo's default handling-behavior
         */
            local.assertJsonEqual(local.echo('aa'), 'aa');
            onError(null, options);
        };

        local.testCase_envSanitize_default = function (options, onError) {
        /*
         * this function will envSanitize's default handling-behavior
         */
            // test invalid envSanitize-code handling-behavior
            local.assertJsonEqual(local.envSanitize({
                aa: '',
                aaPassword: '',
                aa_password: '',
                aapassword: '',
                bb: null,
                passport: '',
                password: ''
            }), { aa: '', aapassword: '' });
            onError(null, options);
        };

        local.testCase_exit_error = function (options, onError) {
        /*
         * this function will exit's error handling-behavior
         */
            // test invalid exit-code handling-behavior
            local.exit('invalid exit-code');
            onError(null, options);
        };

        local.testCase_fsWriteFileWithMkdirpSync_default = function (options, onError) {
        /*
         * this function will test fsWriteFileWithMkdirpSync's default handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            local.fsRmrSync('tmp/build/testCase_fsWriteFileWithMkdirpSync_default');
            // validate data
            local.assertJsonEqual(local.tryCatchReadFile(
                'tmp/build/testCase_fsWriteFileWithMkdirpSync_default/aa.txt',
                'utf8'
            ), '');
            local.fsWriteFileWithMkdirpSync(
                'tmp/build/testCase_fsWriteFileWithMkdirpSync_default/aa.txt',
                'aa'
            );
            // validate data
            local.assertJsonEqual(local.tryCatchReadFile(
                'tmp/build/testCase_fsWriteFileWithMkdirpSync_default/aa.txt',
                'utf8'
            ), 'aa');
            onError(null, options);
        };

        local.testCase_httpRequest_default = function (options, onError) {
        /*
         * this function will test httpRequest's default handling-behavior
         */
            var onParallel;
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            onParallel = local.onParallel(onError);
            onParallel.counter += 1;
            // test default handling-behavior
            onParallel.counter += 1;
            local.httpRequest({
                data: 'aa',
                // test request-header handling-behavior
                headers: { 'X-Request-Header-Test': 'aa' },
                method: 'POST',
                url: local.serverLocalHost + '/test.echo'
            }, function (error, response) {
                // validate no error occurred
                local.assert(!error, error);
                // validate response.statusCode
                local.assertJsonEqual(response.statusCode, 200);
                // validate response.headers
                local.assertJsonEqual(response.headers['x-response-header-test'], 'bb');
                // validate response.data
                options = String(response.data);
                local.assert((/\r\naa$/).test(options), options);
                local.assert((/\r\nx-request-header-test: aa\r\n/).test(options), options);
                onParallel(null, options);
            });
            // test error handling-behavior
            onParallel.counter += 1;
            local.httpRequest({
                url: local.serverLocalHost + '/test.error-404'
            }, function (error) {
                // validate error occurred
                local.assert(error, error);
                onParallel(null, options);
            });
            // test serverLog-fallback handling-behavior
            onParallel.counter += 1;
            local.testMock([
                [local.http, { request: null }],
                [local, { serverLog: null }]
            ], function (onError) {
                local.http.request = function () {
                    return local.http.request;
                };
                local.http.request.end = local.http.request.on = local.http.request;
                local.httpRequest({ url: 'http://example.com' });
                onError(null, options);
            }, onParallel);
            // test timeout handling-behavior
            onParallel.counter += 1;
            setTimeout(function () {
                local.httpRequest({
                    timeout: 1,
                    url: local.serverLocalHost + '/test.timeout'
                }, function (error) {
                    // validate error occurred
                    local.assert(error, error);
                    onParallel(null, options);
                });
            }, 1000);
            onParallel(null, options);
        };

        local.testCase_isNullOrUndefined_default = function (options, onError) {
        /*
         * this function will test isNullOrUndefined's default handling-behavior
         */
            // validate data
            local.assertJsonEqual(local.isNullOrUndefined(null), true);
            // validate data
            local.assertJsonEqual(local.isNullOrUndefined(undefined), true);
            // validate data
            local.assertJsonEqual(local.isNullOrUndefined(false), false);
            onError(null, options);
        };

        local.testCase_jslintAndPrintConditional_default = function (options, onError) {
        /*
         * this function will test jslintAndPrintConditional's default handling-behavior
         */
            local.testMock([
                [local.jslint, { errorText: '' }]
            ], function (onError) {
                // test no csslint handling-behavior
                local.jslintAndPrintConditional('no csslint', 'empty.css');
                // validate no error occurred
                local.assert(!local.jslint.errorText, local.jslint.errorText);
                // test csslint passed handling-behavior
                local.jslintAndPrintConditional(
                    '/*csslint*/\nbody { display: block; }',
                    'passed.css',
                    'force'
                );
                // validate no error occurred
                local.assert(!local.jslint.errorText, local.jslint.errorText);
                // test no jslint handling-behavior
                local.jslintAndPrintConditional('no jslint', 'empty.js');
                // validate no error occurred
                local.assert(!local.jslint.errorText, local.jslint.errorText);
                // test jslint passed handling-behavior
                local.jslintAndPrintConditional(
                    '/*jslint node: true*/\nconsole.log("aa");',
                    'passed.js',
                    'force'
                );
                // validate no error occurred
                local.assert(!local.jslint.errorText, local.jslint.errorText);
                onError(null, options);
            }, onError);
        };

        local.testCase_jsonCopy_default = function (options, onError) {
        /*
         * this function will test jsonCopy's default handling-behavior
         */
            // test various data-type handling-behavior
            [undefined, null, false, true, 0, 1, 1.5, 'a'].forEach(function (element) {
                local.assertJsonEqual(local.jsonCopy(element), element);
            });
            onError(null, options);
        };

        local.testCase_jsonStringifyOrdered_default = function (options, onError) {
        /*
         * this function will test jsonStringifyOrdered's default handling-behavior
         */
            options = {};
            // test data-type handling-behavior
            [undefined, null, false, true, 0, 1, 1.5, 'a', {}, []].forEach(function (data) {
                options.aa = local.jsonStringifyOrdered(data);
                options.bb = JSON.stringify(data);
                local.assertJsonEqual(options.aa, options.bb);
            });
            // test data-ordering handling-behavior
            options = {
                // test nested dict handling-behavior
                ff: { hh: 2, gg: 1},
                // test nested array handling-behavior
                ee: [1, null, undefined],
                dd: local.nop,
                cc: undefined,
                bb: null,
                aa: 1
            };
            // test circular-reference handling-behavior
            options.zz = options;
            local.assertJsonEqual(
                options,
                { aa: 1, bb: null, ee: [ 1, null, null ], ff: { gg: 1, hh: 2 } }
            );
            onError(null, options);
        };

        local.testCase_jwtA256GcmXxx_default = function (options, onError) {
        /*
         * this function will test jwtA256GcmXxx's default handling-behavior
         */
            options = {};
            options.key = local.jwtAes256KeyCreate();
            // use canonical example at https://jwt.io/
            options.data = { sub: '1234567890', name: 'John Doe', admin: true };
            options.data = local.normalizeJwt(options.data);
            options.data = JSON.parse(local.jsonStringifyOrdered(options.data));
            // encrypt token
            options.token = local.jwtA256GcmEncrypt(options.data, options.key);
            // validate encrypted-token
            local.assertJsonEqual(
                local.jwtA256GcmDecrypt(options.token, options.key),
                options.data
            );
            // test decryption-failed handling-behavior
            local.assertJsonEqual(local.jwtA256GcmDecrypt(options.token, null), {});
            onError(null, options);
        };

        local.testCase_jwtHs256Xxx_default = function (options, onError) {
        /*
         * this function will test jwtHs256Xxx's default handling-behavior
         */
            options = {};
            options.key = local.normalizeJwtBase64Url(local.base64FromString('secret'));
            // use canonical example at https://jwt.io/
            options.data = { sub: '1234567890', name: 'John Doe', admin: true };
            options.token = local.jwtHs256Encode(options.data, options.key);
            // validate encoded-token
            local.assertJsonEqual(
                options.token,
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
                    '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
                    '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
            );
            options.data = local.jwtHs256Decode(options.token, options.key);
            // validate decoded-data
            local.assertJsonEqual(
                options.data,
                { admin: true, name: 'John Doe', sub: '1234567890' }
            );
            // test decoding-failed handling-behavior
            options.data = local.jwtHs256Decode(options.token, 'undefined');
            local.assertJsonEqual(options.data, {});
            onError(null, options);
        };

        local.testCase_libUtility2Js_standalone = function (options, onError) {
        /*
         * this function will test lib.utility2.js's standalone handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            local.fs.writeFileSync('tmp/lib.utility2.js', local.fs.readFileSync(
                'lib.utility2.js',
                'utf8'
            ).replace('/* istanbul instrument in package utility2 */', ''));
            require('./tmp/lib.utility2.js');
            onError(null, options);
        };

        local.testCase_listGetElementRandom_default = function (options, onError) {
        /*
         * this function will test listGetRandom's default handling-behavior
         */
            options = {};
            // init list
            options.list = ['aa', 'bb', 'cc', 'dd'];
            options.elementDict = {};
            // get 100 random elements from list
            for (options.ii = 0; options.ii < 1024; options.ii += 1) {
                options.elementDict[local.listGetElementRandom(options.list)] = true;
            }
            // validate all elements were retrieved from list
            local.assertJsonEqual(
                Object.keys(options.elementDict).sort(),
                ['aa', 'bb', 'cc', 'dd']
            );
            onError(null, options);
        };

        local.testCase_listShuffle_default = function (options, onError) {
        /*
         * this function will test listShuffle's default handling-behavior
         */
            options = {};
            // init list
            options.list = '[0,1]';
            // shuffle list 100 times
            for (options.ii = 0; options.ii < 100; options.ii += 1) {
                options.listShuffled =
                    JSON.stringify(local.listShuffle(JSON.parse(options.list)));
                // validate shuffled list
                local.assertJsonEqual(options.listShuffled.length, options.list.length);
                options.changed = options.changed || options.listShuffled !== options.list;
            }
            // validate list changed at least once during the shuffle
            local.assert(options.changed, options);
            onError(null, options);
        };

        local.testCase_localStorageSetItemOrClear_default = function (options, onError) {
        /*
         * this function will localStorageSetItemOrClear's default handling-behavior
         */
            if (local.modeJs !== 'browser') {
                onError(null, options);
                return;
            }
            local.localStorageSetItemOrClear(
                'testCase_localStorageSetItemOrClear_default',
                null
            );
            local.assertJsonEqual(
                localStorage.testCase_localStorageSetItemOrClear_default,
                'null'
            );
            local.testMock([
                [localStorage, {
                    clear: null,
                    setItem: function () {
                        throw local.errorDefault;
                    }
                }]
            ], function (onError) {
                localStorage.clear = onError;
                local.localStorageSetItemOrClear(
                    'testCase_localStorageSetItemOrClear_default',
                    null
                );
            }, onError);
        };

        local.testCase_middlewareForwardProxy_default = function (options, onError) {
        /*
         * this function will test middlewareForwardProxy's default handling-behavior
         */
            var onParallel;
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            onParallel = local.onParallel(onError);
            onParallel.counter += 1;
            // test preflight-cors handling-behavior
            onParallel.counter += 1;
            local.ajax({ headers: {
                'access-control-request-headers': 'forward-proxy-headers,forward-proxy-url'
            }, method: 'OPTIONS', url: '' }, onParallel);
            // test forward-proxy-http handling-behavior
            onParallel.counter += 1;
            local.ajax({ headers: {
                'forward-proxy-url': '/assets.hello'
            }, url: '' }, function (error, data) {
                // validate no error occurred
                local.assert(!error, error);
                // validate responseText
                local.assertJsonEqual(data.responseText, 'hello\n');
                onParallel(null, options);
            });
            // test error handling-behavior
            onParallel.counter += 1;
            local.ajax({ headers: {
                'forward-proxy-url': 'https://undefined:0'
            }, url: '' }, function (error) {
                // validate error occurred
                local.assert(error, error);
                onParallel(null, options);
            });
            onParallel(null, options);
        };

        local.testCase_moduleDirname_default = function (options, onError) {
        /*
         * this function will test moduleDirname's default handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            // test null-case handling-behavior
            local.assertJsonEqual(local.moduleDirname(null, module.paths), process.cwd());
            // test path handling-behavior
            local.assertJsonEqual(local.moduleDirname('.', module.paths), process.cwd());
            local.assertJsonEqual(local.moduleDirname('./', module.paths), process.cwd());
            // test module exists handling-behavior
            options = local.moduleDirname('electron-lite', module.paths);
            local.assert((/\/electron-lite$/).test(options), options);
            // test module does not exists handling-behavior
            local.assertJsonEqual(local.moduleDirname('syntax error', module.paths), '');
            onError(null, options);
        };

        local.testCase_normalizeValue_default = function (options, onError) {
        /*
         * this function will test normalizeValue's default handling-behavior
         */
            // test list handling-behavior
            local.assertJsonEqual(local.normalizeValue('list', [1]), [1]);
            local.assertJsonEqual(local.normalizeValue('list', null), []);
            local.assertJsonEqual(local.normalizeValue('list', {}), []);
            // test number handling-behavior
            local.assertJsonEqual(local.normalizeValue('number', 0.5), 0.5);
            local.assertJsonEqual(local.normalizeValue('number', null), 0);
            local.assertJsonEqual(local.normalizeValue('number', {}), 0);
            // test string handling-behavior
            local.assertJsonEqual(local.normalizeValue('string', 'aa'), 'aa');
            local.assertJsonEqual(local.normalizeValue('string', null), '');
            local.assertJsonEqual(local.normalizeValue('string', {}), '');
            onError(null, options);
        };

        local.testCase_numberToRomanNumerals_default = function (options, onError) {
        /*
         * this function will test numberToRomanNumerals's default handling-behavior
         */
            options = {};
            options.list = [
            /* jslint-ignore-next-line */
"","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI","XXII","XXIII","XXIV","XXV","XXVI","XXVII","XXVIII","XXIX","XXX","XXXI","XXXII","XXXIII","XXXIV","XXXV","XXXVI","XXXVII","XXXVIII","XXXIX","XL","XLI","XLII","XLIII","XLIV","XLV","XLVI","XLVII","XLVIII","XLIX","L","LI","LII","LIII","LIV","LV","LVI","LVII","LVIII","LIX","LX","LXI","LXII","LXIII","LXIV","LXV","LXVI","LXVII","LXVIII","LXIX","LXX","LXXI","LXXII","LXXIII","LXXIV","LXXV","LXXVI","LXXVII","LXXVIII","LXXIX","LXXX","LXXXI","LXXXII","LXXXIII","LXXXIV","LXXXV","LXXXVI","LXXXVII","LXXXVIII","LXXXIX","XC","XCI","XCII","XCIII","XCIV","XCV","XCVI","XCVII","XCVIII","XCIX","C"
            ];
            for (options.ii = 0; options.ii < 10; options.ii += 1) {
                local.assertJsonEqual(
                    local.numberToRomanNumerals(options.ii),
                    options.list[options.ii]
                );
            }
            onError(null, options);
        };

        local.testCase_objectGetElementFirst_default = function (options, onError) {
        /*
         * this function will test objectGetElementFirst's default handling-behavior
         */
            local.assertJsonEqual(
                local.objectGetElementFirst({ aa: 1, bb: 2 }),
                { key: 'aa', value: 1 }
            );
            onError(null, options);
        };

        local.testCase_objectKeysTypeOf_default = function (options, onError) {
        /*
         * this function will test objectKeysTypeOf's default handling-behavior
         */
            local.assertJsonEqual(local.objectKeysTypeof({
                aa: true,
                bb: local.nop,
                cc: 0,
                dd: null,
                ee: '',
                ff: undefined
            }), 'boolean aa\nfunction bb\nnumber cc\nobject dd\nstring ee\nundefined ff');
            onError(null, options);
        };

        local.testCase_objectLiteralize_default = function (options, onError) {
        /*
         * this function will test objectLiteralize's default handling-behavior
         */
            local.assertJsonEqual(local.objectLiteralize({
                '': '$[]',
                '$[]1': [1, { '$[]2': [2, 3] }]
            }), { 1: { 2: 3 }, '': '$[]' });
            onError(null, options);
        };

        local.testCase_objectSetDefault_default = function (options, onError) {
        /*
         * this function will test objectSetDefault's default handling-behavior
         */
            // test null-case handling-behavior
            local.objectSetDefault();
            local.objectSetDefault({});
            // test falsey handling-behavior
            ['', 0, false, null, undefined].forEach(function (aa) {
                ['', 0, false, null, undefined].forEach(function (bb) {
                    local.assertJsonEqual(
                        local.objectSetDefault({ data: aa }, { data: bb }).data,
                        aa === 0 || aa === false || bb === undefined
                            ? aa
                            : bb
                    );
                });
            });
            // test non-recursive handling-behavior
            local.assertJsonEqual(local.objectSetDefault(
                { aa: 0, bb: { cc: 1 }, cc: { dd: {} }, dd: [1, 1], ee: [1, 1] },
                { aa: 2, bb: { dd: 2 }, cc: { dd: { ee: 2 } }, dd: [2, 2], ee: { ff: 2 } },
                // test default-depth handling-behavior
                null
            ), { aa: 0, bb: { cc: 1 }, cc: { dd: {} }, dd: [1, 1], ee: [1, 1] });
            // test recursive handling-behavior
            local.assertJsonEqual(local.objectSetDefault(
                { aa: 0, bb: { cc: 1 }, cc: { dd: {} }, dd: [1, 1], ee: [1, 1] },
                { aa: 2, bb: { dd: 2 }, cc: { dd: { ee: 2 } }, dd: [2, 2], ee: { ff: 2 } },
                // test depth handling-behavior
                2
            ), { aa: 0, bb: { cc: 1, dd: 2 }, cc: { dd: {} }, dd: [1, 1], ee: [1, 1] });
            onError(null, options);
        };

        local.testCase_objectSetOverride_default = function (options, onError) {
        /*
         * this function will test objectSetOverride's default handling-behavior
         */
            // test null-case handling-behavior
            local.objectSetOverride();
            local.objectSetOverride({});
            // test falsey handling-behavior
            ['', 0, false, null, undefined].forEach(function (aa) {
                ['', 0, false, null, undefined].forEach(function (bb) {
                    local.assertJsonEqual(
                        local.objectSetOverride({ data: aa }, { data: bb }).data,
                        bb === undefined
                            ? aa
                            : bb
                    );
                });
            });
            // test non-recursive handling-behavior
            local.assertJsonEqual(local.objectSetOverride(
                { aa: 1, bb: { cc: 1 }, cc: { dd: 1 }, dd: [1, 1], ee: [1, 1] },
                { aa: 2, bb: { dd: 2 }, cc: { ee: 2 }, dd: [2, 2], ee: { ff: 2 } },
                // test default-depth handling-behavior
                null
            ), { aa: 2, bb: { dd: 2 }, cc: { ee: 2 }, dd: [2, 2], ee: { ff: 2 } });
            // test recursive handling-behavior
            local.assertJsonEqual(local.objectSetOverride(
                { aa: 1, bb: { cc: 1 }, cc: { dd: 1 }, dd: [1, 1], ee: [1, 1] },
                { aa: 2, bb: { dd: 2 }, cc: { ee: 2 }, dd: [2, 2], ee: { ff: 2 } },
                // test depth handling-behavior
                2
            ), { aa: 2, bb: { cc: 1, dd: 2 }, cc: { dd: 1, ee: 2 }, dd: [2, 2], ee: { ff: 2 } });
            // test env with empty-string handling-behavior
            local.assertJsonEqual(local.objectSetOverride(
                local.env,
                { 'emptyString': null },
                // test default-depth handling-behavior
                null,
                local.env
            ).emptyString, '');
            onError(null, options);
        };

        local.testCase_objectTraverse_default = function (options, onError) {
        /*
         * this function will test objectTraverse's default handling-behavior
         */
            options = { aa: null, bb: 2, cc: { dd: 4, ee: [5, 6, 7] } };
            // test circular-reference handling-behavior
            options.data = options;
            local.objectTraverse(options, function (element) {
                if (typeof element === 'object' && element && !Array.isArray(element)) {
                    element.zz = true;
                }
            });
            // validate options
            local.assertJsonEqual(
                options,
                { aa: null, bb: 2, cc: { dd: 4, ee: [5, 6, 7], zz: true }, zz: true }
            );
            onError(null, options);
        };

        local.testCase_onErrorDefault_default = function (options, onError) {
        /*
         * this function will test onErrorDefault's default handling-behavior
         */
            local.testMock([
                [console, { error: function (arg) {
                    options = arg;
                } }],
                [local.global, { __coverage__: null }]
            ], function (onError) {
                // test no error handling-behavior
                local.onErrorDefault();
                // validate options
                local.assert(!options, options);
                // test error handling-behavior
                local.onErrorDefault(local.errorDefault);
                // validate options
                local.assert(options, options);
                onError(null, options);
            }, onError);
        };

        local.testCase_onErrorThrow_error = function (options, onError) {
        /*
         * this function will test onErrorThrow's error handling-behavior
         */
            local.tryCatchOnError(function () {
                local.onErrorThrow(local.errorDefault);
            }, function (error) {
                // validate error occurred
                local.assert(error, error);
                onError(null, options);
            });
        };

        local.testCase_onFileModifiedRestart_watchFile = function (options, onError) {
        /*
         * this function will test onFileModifiedRestart's watchFile handling-behavior
         */
            var onParallel;
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            onParallel = local.onParallel(onError);
            onParallel.counter += 1;
            local.fs.stat(__filename, function (error, stat) {
                // test default watchFile handling-behavior
                onParallel.counter += 1;
                local.fs.utimes(__filename, stat.atime, new Date(), onParallel);
                // test nop watchFile handling-behavior
                onParallel.counter += 1;
                setTimeout(function () {
                    local.fs.utimes(__filename, stat.atime, stat.mtime, onParallel);
                // coverage-hack - use 1500 ms to cover setInterval
                }, 1500);
                onParallel(error, options);
            });
        };

        local.testCase_onNext_error = function (options, onError) {
        /*
         * this function will test onNext's error handling-behavior
         */

            options = {};
            local.onNext(options, function () {
                throw local.errorDefault;
            });
            options.modeNext = 0;
            local.tryCatchOnError(function () {
                options.onNext();
            }, function (error) {
                // validate error occurred
                local.assert(error, error);
                onError(null, options);
            });
        };

        local.testCase_onParallelList_default = function (options, onError) {
        /*
         * this function will test onParallelList's default handling-behavior
         */
            options = {};
            local.onNext(options, function (error) {
                switch (options.modeNext) {
                case 1:
                    // test null-case handling-behavior
                    local.onParallelList({}, local.onErrorThrow, options.onNext);
                    break;
                case 2:
                    options.list = [null];
                    // test retryLimit handling-behavior
                    options.retryLimit = 1;
                    local.onParallelList(options, function (data, onParallel) {
                        onParallel.counter += 1;
                        // test error handling-behavior
                        onParallel(local.errorDefault, data);
                        // test multiple callback handling-behavior
                        setTimeout(onParallel, 5000);
                    }, function (error) {
                        // validate error occurred
                        local.assert(error, error);
                        options.onNext();
                    });
                    break;
                case 3:
                    options.data = [];
                    // test rateLimit handling-behavior
                    options.rateLimit = 3;
                    options.rateMax = 0;
                    // test retryLimit handling-behavior
                    options.retryLimit = 1;
                    local.onParallelList({
                        list: [1, 2, 3, 4, 5],
                        rateLimit: options.rateLimit
                    }, function (data, onParallel) {
                        onParallel.counter += 1;
                        options.rateMax = Math.max(onParallel.counter - 1, options.rateMax);
                        // test async handling-behavior
                        setTimeout(function () {
                            options.data[data.ii] = data.element;
                            onParallel(data.retry < 1 && local.onErrorDefault, data);
                        });
                    }, options.onNext, options.rateLimit);
                    break;
                case 4:
                    // validate data
                    local.assertJsonEqual(options.data, [1, 2, 3, 4, 5]);
                    local.assertJsonEqual(options.rateMax, 3);
                    options.data = [];
                    options.rateLimit = 'syntax error';
                    options.rateMax = 0;
                    local.onParallelList({
                        list: [1, 2, 3, 4, 5],
                        rateLimit: options.rateLimit
                    }, function (data, onParallel) {
                        // test sync handling-behavior
                        onParallel.counter += 1;
                        options.rateMax = Math.max(onParallel.counter, options.rateMax);
                        options.data[data.ii] = data.element;
                        onParallel(null, options);
                    }, options.onNext);
                    break;
                case 5:
                    // validate data
                    local.assertJsonEqual(options.data, [1, 2, 3, 4, 5]);
                    local.assertJsonEqual(options.rateMax, 2);
                    options.onNext();
                    break;
                default:
                    onError(error, options);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_onParallel_default = function (options, onError) {
        /*
         * this function will test onParallel's default handling-behavior
         */
            var onParallel, onParallelError;
            // test onEach handling-behavior
            onParallel = local.onParallel(onError, function () {
                // validate counter
                local.assert(onParallel.counter >= 0, onParallel);
            });
            onParallel.counter += 1;
            // test multiple-task handling-behavior
            onParallel.counter += 1;
            setTimeout(function () {
                onParallelError = local.onParallel(function (error) {
                    // validate error occurred
                    local.assert(error, error);
                    onParallel(null, options);
                });
                onParallelError.counter += 1;
                // test error handling-behavior
                onParallelError.counter += 1;
                onParallelError(local.errorDefault);
                // test ignore-after-error handling-behavior
                onParallelError();
            });
            // test default handling-behavior
            onParallel(null, options);
        };

        local.testCase_onTimeout_timeout = function (options, onError) {
        /*
         * this function will test onTimeout's timeout handling-behavior
         */
            options = local.timeElapsedStart();
            local.onTimeout(function (error) {
                // validate error occurred
                local.assert(error, error);
                // validate error message
                local.assert(
                    error.message.indexOf('testCase_onTimeout_errorTimeout') >= 0,
                    error
                );
                // poll timeElapsed
                local.timeElapsedPoll(options);
                // validate timeElapsed passed is greater than timeout
                local.assert(options.timeElapsed >= 1500, options);
                onError(null, options);
            // coverage-hack - use 1500 ms to cover setInterval
            }, 1500, function () {
                return 'testCase_onTimeout_errorTimeout';
            });
        };

        local.testCase_profileXxx_default = function (options, onError) {
        /*
         * this function will test profileXxx's default handling-behavior
         */
            options = {};
            // test profileSync's handling-behavior
            options.timeElapsed = local.profileSync(function () {
                return;
            });
            // validate timeElapsed
            local.assert(
                0 <= options.timeElapsed && options.timeElapsed < 1000,
                options.timeElapsed
            );
            // test profile's async handling-behavior
            local.profile(function (onError) {
                setTimeout(onError);
            }, function (error, timeElapsed) {
                // validate no error occurred
                local.assert(!error, error);
                options.timeElapsed = timeElapsed;
                // validate timeElapsed
                local.assert(0 <= options.timeElapsed &&
                    options.timeElapsed < local.timeoutDefault, options.timeElapsed);
                onError(null, options);
            });
        };

        local.testCase_replStart_default = function (options, onError) {
        /*
         * this function will test replStart's default handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            /*jslint evil: true*/
            local.replStart();
            // coverage-hack - test replStart's muliple-call handling-behavior
            local.replStart();
            local.testMock([
                [local.child_process, { spawn: function () {
                    return { on: function (event, callback) {
                        callback(null, event);
                    } };
                } }],
                // suppress process.stdout
                [process.stdout, { write: local.nop }]
            ], function (onError) {
                [
                    // test null-case handling-behavior
                    '',
                    // test shell handling-behavior
                    '$ :\n',
                    // test git diff handling-behavior
                    '$ git diff\n',
                    // test git log handling-behavior
                    '$ git log\n',
                    // test grep handling-behavior
                    'grep \\baa\\b\n',
                    // test keys handling-behavior
                    'keys {}\n',
                    // test print handling-behavior
                    'print\n',
                    // test error handling-behavior
                    'undefined()\n'
                ].forEach(function (script) {
                    local.global.utility2_serverRepl1.eval(script, null, 'repl', local.nop);
                });
                // test nop handling-behavior
                local.global.utility2_serverRepl1.nop();
                // test error handling-behavior
                local.global.utility2_serverRepl1.onError(local.errorDefault);
                onError(null, options);
            }, onError);
        };

        local.testCase_replStart_tcp = function (options, onError) {
        /*
         * this function will test replStart's tcp handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            options = {};
            options.data = '';
            options.input = Math.random();
            options.socket = local.net.createConnection(local.env.PORT_REPL);
            options.socket.on('data', function (data) {
            /*
             * this function will concat data to options.data
             */
                options.data += data;
            });
            options.socket.setEncoding('utf8');
            options.socket.on('end', function () {
                // validate data
                local.assert(
                    options.data.indexOf(options.input) >= 0,
                    JSON.stringify([options.data, options.input])
                );
                onError(null, options);
            });
            options.socket.write(options.input + '\n');
            // test error handling-behavior
            options.socket.end('undefined()\n');
        };

        local.testCase_requireReadme_start = function (options, onError) {
        /*
         * this function will test requireReadme's start handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            local.testMock([
                [local, {
                    assetsDict: { '/assets.index.template.html': '' },
                    onFileModifiedRestart: local.nop
                }],
                [local.env, {
                    npm_config_mode_start: '1',
                    npm_package_nameLib: '_testCase_requireReadme_start'
                }],
                [local.fs, {
                    readFile: function (file, options, onError) {
                        onError(null, '{}', file, options);
                    },
                    readdirSync: function () {
                        // test jslintAndPrintConditional behavior
                        return [
                            'aa.css',
                            'aa.html',
                            'aa.js',
                            'aa.json',
                            'aa.rollup.js',
                            'assets.swgg.swagger.json'
                        ];
                    }
                }]
            ], function (onError) {
                // validate data
                local.requireReadme();
                local.assert(local._testCase_requireReadme_start === local);
                onError(null, options);
            }, onError);
        };

        local.testCase_serverLog_default = function (options, onError) {
        /*
         * this function will test serverLog's default handling-behavior
         */
            local._serverLog({});
            onError(null, options);
        };

        local.testCase_serverRespondTimeoutDefault_default = function (options, onError) {
        /*
         * this function will test serverRespondTimeoutDefault's default handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            local.testMock([
                [local, { timeoutDefault: 1000 }]
            ], function (onError) {
                local.serverRespondTimeoutDefault(
                    {
                        on: local.nop,
                        // test default onTimeout handling-behavior
                        onTimeout: null,
                        url: ''
                    },
                    { end: local.nop, headersSent: true, on: local.nop },
                    // test default timeout handling-behavior
                    null
                );
                onError(null, options);
            }, onError);
        };

        local.testCase_setTimeoutOnError_default = function (options, onError) {
        /*
         * this function will test setTimeoutOnError's default handling-behavior
         */
            options = {};
            // test null-case handling-behavior
            local.assertJsonEqual(local.setTimeoutOnError(), undefined);
            // test onError handling-behavior
            local.assertJsonEqual(local.setTimeoutOnError(onError, 0, null, options), {});
        };

        local.testCase_sjclHashScryptXxx_default = function (options, onError) {
        /*
         * this function will test sjclHashScryptXxx's default handling-behavior
         */
            // test sjclHashScryptCreate's null-case handling-behavior
            local.assertJsonEqual(local.sjclHashScryptCreate().slice(0, 10), '$s0$10801$');
            // https://github.com/wg/scrypt
            // test sjclHashScryptValidate's fail handling-behavior
            local.assertJsonEqual(local.sjclHashScryptValidate(
                'password',
                '$s0$80801$epIxT/h6HbbwHaehFnh/bw==' +
                    '$l/guDhz2Q0v/D93gq0K0qtSX6FWP8pH5maAJkbIcRaEA'
            ), false);
            // https://github.com/wg/scrypt
            // test sjclHashScryptValidate's pass handling-behavior
            local.assertJsonEqual(local.sjclHashScryptValidate(
                'password',
                '$s0$80801$epIxT/h6HbbwHaehFnh/bw==' +
                    '$l/guDhz2Q0v/D93gq0K0qtSX6FWP8pH5maAJkbIcRaE='
            ), true);
            onError(null, options);
        };

        local.testCase_sjclHashShaXxxCreate_default = function (options, onError) {
        /*
         * this function will test sjclHashShaXxxCreate's default handling-behavior
         */
            local.assertJsonEqual(
                local.sjclHashSha1Create('aa'),
                '4MkDWJjdUvxlxBRUzsnE0mEb+zc='
            );
            local.assertJsonEqual(
                local.sjclHashSha256Create('aa'),
                'lhtt0+3jy47LqsvWjeBAzXjrLtWIkTDM60xJJo6k1QY='
            );
            onError(null, options);
        };

        local.testCase_sjclHmacShaXxx_default = function (options, onError) {
        /*
         * this function will test sjclHmacShaXxx's default handling-behavior
         */
            local.assertJsonEqual(
                local.sjclHmacSha1Create('aa', 'bb'),
                '15pOinCz63A+qZoxnv+mJB6UF1k='
            );
            local.assertJsonEqual(
                local.sjclHmacSha256Create('aa', 'bb'),
                '94Xv3VdPHA+ohKyjkM1pb0W5ZVAuMVcmIAAI2AqNRCQ='
            );
            onError(null, options);
        };

        local.testCase_stringHtmlSafe_default = function (options, onError) {
        /*
         * this function will test stringHtmlSafe's default handling-behavior
         */
            local.assertJsonEqual(
                local.stringHtmlSafe(local.stringHtmlSafe(local.stringCharsetAscii).slice(32, -1)),
                ' !&quot;#$%&amp;&apos;()*+,-./0123456789:;&lt;=&gt;?@' +
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
            );
            onError(null, options);
        };

        local.testCase_stringRegexpEscape_default = function (options, onError) {
        /*
         * this function will test stringRegexpEscape's default handling-behavior
         */
            local.assertJsonEqual(local.stringRegexpEscape(local.stringCharsetAscii), String() +
                '\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007' +
                '\b\t\n\u000b\f\r\u000e\u000f' +
                '\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017' +
                '\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f' +
                ' !"#\\$%&\'\\(\\)\\*\\+,\\-\\.\\/0123456789:;<=>\\?@' +
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ\\[\\\\\\]\\^_`abcdefghijklmnopqrstuvwxyz\\{\\|\\}~' +
                '\u007f');
            onError(null, options);
        };

        local.testCase_stringTruncate_default = function (options, onError) {
        /*
         * this function will test stringTruncate's default handling-behavior
         */
            local.assertJsonEqual(local.stringTruncate('aa'), 'aa');
            local.assertJsonEqual(local.stringTruncate('aa', 1), '...');
            local.assertJsonEqual(local.stringTruncate('aa', 2), 'aa');
            onError(null, options);
        };

        local.testCase_stringUniqueKey_default = function (options, onError) {
        /*
         * this function will test stringUniqueKey's default handling-behavior
         */
            local.assert(('zqxj').indexOf(local.stringUniqueKey('zqxj') < 0));
            onError(null, options);
        };

        local.testCase_taskCreateCached_default = function (options, onError) {
        /*
         * this function will test taskCreateCached's default handling-behavior
         */
            var cacheValue, onTask, optionsCopy;
            options = {};
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                // test no cache handling-behavior
                case 1:
                    onTask = function (onError) {
                        onError(null, cacheValue);
                    };
                    options.cacheDict = 'testCase_taskCreateCached_default';
                    options.key = 'memory';
                    // cleanup memory-cache
                    local.cacheDict[options.cacheDict] = null;
                    cacheValue = 'aa';
                    optionsCopy = {
                        cacheDict: options.cacheDict,
                        key: options.key,
                        // test onCacheWrite handling-behavior
                        onCacheWrite: options.onNext
                    };
                    local.taskCreateCached(optionsCopy, onTask, options.onNext);
                    break;
                case 2:
                    // validate data
                    local.assertJsonEqual(data, 'aa');
                    // validate no cache-hit
                    local.assert(!optionsCopy.modeCacheHit, optionsCopy.modeCacheHit);
                    break;
                // test cache with update handling-behavior
                case 3:
                    cacheValue = 'bb';
                    optionsCopy = {
                        cacheDict: options.cacheDict,
                        key: options.key,
                        // test modeCacheUpdate handling-behavior
                        modeCacheUpdate: true,
                        // test onCacheWrite handling-behavior
                        onCacheWrite: options.onNext
                    };
                    local.taskCreateCached(optionsCopy, onTask, options.onNext);
                    break;
                case 4:
                    // validate data
                    local.assertJsonEqual(data, 'aa');
                    // validate modeCacheHit
                    local.assertJsonEqual(optionsCopy.modeCacheHit, true);
                    break;
                // test cache handling-behavior
                case 5:
                    optionsCopy = {
                        cacheDict: options.cacheDict,
                        key: options.key
                    };
                    local.taskCreateCached(optionsCopy, onTask, options.onNext);
                    break;
                case 6:
                    // validate data
                    local.assertJsonEqual(data, 'bb');
                    // validate modeCacheHit
                    local.assertJsonEqual(optionsCopy.modeCacheHit, true);
                    options.onNext();
                    break;
                default:
                    onError(error, options);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_taskCreate_multipleCallback = function (options, onError) {
        /*
         * this function will test taskCreate's multiple-callback handling-behavior
         */
            options = { counter: 0, key: 'testCase_taskCreate_multiCallback' };
            local.taskCreate(options, function (onError) {
                onError(null, options);
                // test multiple-callback handling-behavior
                onError(null, options);
            }, function () {
                options.counter += 1;
            });
            // validate counter incremented once
            local.assertJsonEqual(options.counter, 1);
            onError(null, options);
        };

        local.testCase_taskCreate_upsert = function (options, onError) {
        /*
         * this function will test taskCreate's upsert handling-behavior
         */
            options = { counter: 0, key: 'testCase_taskCreate_upsert' };
            // test upsert handling-behavior
            [null, null].forEach(function () {
                local.taskCreate(options, function (onError) {
                    options.counter += 1;
                    setTimeout(onError);
                });
            });
            // validate counter incremented once
            setTimeout(function () {
                local.assertJsonEqual(options.counter, 1);
                onError(null, options);
            });
        };

        local.testCase_templateRender_default = function (options, onError) {
        /*
         * this function will test templateRender's default handling-behavior
         */
            // test null-case handling-behavior
            local.assertJsonEqual(local.templateRender(), '');
            // test undefined-value handling-behavior
            local.assertJsonEqual(local.templateRender('{{aa}}', {}), '{{aa}}');
            // test basic handling-behavior
            local.assertJsonEqual(local.templateRender('{{aa}}', {
                aa: '```<aa\nbb>```'
            }), '```&lt;aa\nbb&gt;```');
            // test markdownToHtml handling-behavior
            local.assertJsonEqual(local.templateRender('{{aa markdownToHtml}}', {
                aa: local.stringCharsetAscii.slice(32, -1)
            }), '<p> !&quot;#$%&amp;&apos;()*+,-./0123456789:;&lt;=&gt;?@' +
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~</p>\n');
            // test markdownSafe handling-behavior
            local.assertJsonEqual(local.templateRender('{{aa markdownSafe notHtmlSafe}}', {
                aa: local.stringCharsetAscii.slice(32, -1)
            }), ' !"#$%&\'()*+,-./0123456789:;<=>?@' +
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\'abcdefghijklmnopqrstuvwxyz{|}~');
            // test notHtmlSafe handling-behavior
            local.assertJsonEqual(local.templateRender('{{aa notHtmlSafe}}', {
                aa: '```<aa\nbb>```'
            }), '```<aa\nbb>```');
            // test default handling-behavior
            local.assertJsonEqual(local.templateRender('{{aa alphanumeric}} ' +
                '{{aa truncate 4 truncate 4}} ' +
                '{{aa jsonStringify jsonStringify4 decodeURIComponent encodeURIComponent trim}} ' +
                '{{bb}} {{cc}} {{dd}} {{ee.ff}}', {
                    // test string value handling-behavior
                    aa: '`<aa>`',
                    // test non-string value handling-behavior
                    bb: 1,
                    // test null-value handling-behavior
                    cc: null,
                    // test undefined-value handling-behavior
                    dd: undefined,
                    // test nested value handling-behavior
                    ee: { ff: 'gg' }
                }), '__aa__ `... %22%5C%22%60%3Caa%3E%60%5C%22%22 1 null {{dd}} gg');
            // test partial handling-behavior
            local.assertJsonEqual(local.templateRender('{{#undefined aa}}\n' +
                'list1{{#each list1}}\n' +
                '    aa - {{aa}}\n' +
                '    list2{{#eachTrimRightComma list2}}\n' +
                '        {{#this/ notHtmlSafe jsonStringify}}\n' +
                '        bb - {{bb}}\n' +
                '        {{#if bb}}\n' +
                '        if\n' +
                '        {{#unless bb}}\n' +
                '        else\n' +
                '        {{/if bb}}\n' +
                '        {{#unless bb}}\n' +
                '        unless\n' +
                '        {{/unless bb}}\n' +
                '        ,\n' +
                '    {{/eachTrimRightComma list2}}\n' +
                '{{/each list1}}\n' +
                '{{/undefined aa}}\n', { list1: [
                    // test null-value handling-behavior
                    null,
                    {
                        aa: 'aa',
                        // test recursive-list handling-behavior
                        list2: [{ bb: 'bb' }, { bb: null }]
                    }
                ]
                    }), '{{#undefined aa}}\n' +
                'list1\n' +
                '    aa - {{aa}}\n' +
                '    list2\n' +
                '\n' +
                '    aa - aa\n' +
                '    list2\n' +
                '        {"bb":"bb"}\n' +
                '        bb - bb\n' +
                '        \n' +
                '        if\n' +
                '        \n' +
                '        \n' +
                '        ,\n' +
                '    \n' +
                '        {"bb":null}\n' +
                '        bb - null\n' +
                '        \n' +
                '        else\n' +
                '        \n' +
                '        \n' +
                '        unless\n' +
                '        \n' +
                '        \n' +
                '\n' +
                '{{/undefined aa}}\n');
            // test error handling-behavior
            local.tryCatchOnError(function () {
                local.templateRender('{{aa bb}}', { aa: 1 });
            }, local.nop);
            // validate error occurred
            local.assert(local._debugTryCatchError, local._debugTryCatchError);
            onError(null, options);
        };

        local.testCase_testReportCreate_default = function (options, onError) {
        /*
         * this function will test testReport's default handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            local.testMock([], function (onError) {
                // test null-case handling-behavior
                local.testReportCreate();
                // test testsFailed handling-behavior
                local.testReportCreate({ testPlatformList: [{
                    testCaseList: [{ status: 'failed' }, { status: 'passed' }]
                }] });
                onError(null, options);
            }, onError);
        };

        local.testCase_testRunDefault_nop = function (options, onError) {
        /*
         * this function will test testRunDefault's nop handling-behavior
         */
            options = {};
            local.testRunDefault(options);
            local.testMock([
                [local, { env: {}, modeTest: null }]
            ], function (onError) {
                local.testRunDefault(options);
                // validate no options.onReadyAfter
                local.assert(!options.onReadyAfter, options);
                onError(null, options);
            }, onError);
        };

        local.testCase_testRunInit_testRunButton1 = function (options, onError) {
        /*
         * this function will test testRunInit's testRunButton1 handling-behavior
         */
            if (local.modeJs !== 'browser') {
                onError(null, options);
                return;
            }
            local.testMock([
                [document, {
                    querySelector: function () {
                        return { click: local.nop };
                    }
                }],
                [local, {
                    modeTest: true,
                    testRunBrowser: local.nop,
                    testRunDefault: local.nop
                }],
                [local.global, {
                    setTimeout: function (fnc) {
                        fnc();
                    },
                    utility2_serverHttp1: null
                }]
            ], function (onError) {
                local.testRunInit(local);
                local.testRunBrowser = null;
                local.testRunInit(local);
                onError(null, options);
            }, onError);
        };

        local.testCase_throwError_default = function (options, onError) {
        /*
         * this function will test throwError's default handling-behavior
         */
            local.tryCatchOnError(function () {
                local.throwError();
            }, function (error) {
                // validate error occurred
                local.assert(error, error);
                onError(null, options);
            });
        };

        local.testCase_uglify_default = function (options, onError) {
        /*
         * this function will test uglify's default handling-behavior
         */
            // test css handling-behavior
            local.assertJsonEqual(local.uglify('body { margin: 0; }', 'aa.css'), 'body{margin:0;}');
            // test js handling-behavior
            local.assertJsonEqual(local.uglify('aa = 1', 'aa.js'), 'aa=1');
            onError(null, options);
        };

        local.testCase_uiAnimateXxx_default = function (options, onError) {
        /*
         * this function will test uiAnimateXxx's default handling-behavior
         */
            if (local.modeJs !== 'browser') {
                onError(null, options);
                return;
            }
            options = document.createElement('div');
            // test uiAnimateShake handling-behavior
            local.uiAnimateShake();
            local.uiAnimateShake(options);
            local.assert(options.classList.contains('uiAnimateShake'), options.classList);
            local.uiAnimateShake(options);
            local.assert(options.classList.contains('uiAnimateShake'), options.classList);
            // test uiAnimateShakeIfError handling-behavior
            local.uiAnimateShakeIfError();
            local.uiAnimateShakeIfError(null, options);
            local.assert(!options.classList.contains('hasError'), options.classList);
            local.uiAnimateShakeIfError(true, options);
            local.assert(options.classList.contains('hasError'), options.classList);
            local.uiAnimateShakeIfError(null, options);
            local.assert(!options.classList.contains('hasError'), options.classList);
            // test uiAnimateSlideXxx handling-behavior
            local.uiAnimateSlideDown();
            local.uiAnimateSlideUp();
            options.classList.add('uiAnimateSlide');
            local.uiAnimateSlideDown(options);
            local.assert(options.style.maxHeight.indexOf('px') >= 0, options.style.maxHeight);
            local.uiAnimateSlideUp(options);
            local.assertJsonEqual(options.style.maxHeight, '0px');
            // test uiAnimateSlideAccordian handling-behavior
            local.uiAnimateSlideAccordian(options, [options, document.createElement('div')]);
            onError(null, options);
        };

        local.testCase_urlParse_default = function (options, onError) {
        /*
         * this function will test urlParse's default handling-behavior
         */
            local.testMock([
                [local, {
                    // test default PORT handling-behavior
                    env: {},
                    // test init-serverLocalHost handling-behavior
                    serverLocalHost: ''
                }]
            ], function (onError) {
                // test default handling-behavior
                local.assertJsonEqual(local.urlParse(
                    'https://127.0.0.1:80/foo/bar?aa=1&bb%20cc=dd%20=ee&aa=2&aa#zz=1'
                ), {
                    hash: '#zz=1',
                    host: '127.0.0.1:80',
                    hostname: '127.0.0.1',
                    href: 'https://127.0.0.1:80/foo/bar?aa=1&bb%20cc=dd%20=ee&aa=2&aa#zz=1',
                    path: '/foo/bar?aa=1&bb%20cc=dd%20=ee&aa=2&aa',
                    pathname: '/foo/bar',
                    port: '80',
                    protocol: 'https:',
                    query: { aa: ['1', '2', ''], 'bb cc': 'dd =ee' },
                    search: '?aa=1&bb%20cc=dd%20=ee&aa=2&aa'
                });
                // test error handling-behavior
                local.assertJsonEqual(local.urlParse(null), {
                    hash: '',
                    host: '',
                    hostname: '',
                    href: '',
                    path: '',
                    pathname: '',
                    port: '',
                    protocol: '',
                    query: {},
                    search: ''
                });
                onError(null, options);
            }, onError);
        };

        local.testCase_uuid4Create_default = function (options, onError) {
        /*
         * this function will test uuid4Create's default handling-behavior
         */
            local.assert((local.regexpValidateUuid).test(local.uuid4Create()), local.uuid4Create());
            onError(null, options);
        };

        local.testCase_webpage_error = function (options, onError) {
        /*
         * this function will test webpage's error handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            local.browserTest({
                modeCoverageMerge: true,
                // test browserTest's modeSilent handling-behavior
                modeSilent: true,
                modeTestIgnore: true,
                timeoutDefault: local.timeoutDefault - 1000,
                url: local.serverLocalHost +
                    // test script_only handling-behavior
                    '/assets.script_only.html' +
                    // test electron-callback handling-behavior
                    '?modeTest=1&' +
                    // test specific testCase handling-behavior
                    // test testRunDefault's failure handling-behavior
                    'modeTestCase=_testCase_testRunDefault_failure&' +
                    // test timeExit handling-behavior
                    'timeExit={{timeExit}}'
            }, function (error) {
                // validate error occurred
                local.assert(error, error);
                onError(null, options);
            });
        };

        local.utility2.serverLocalUrlTest = function (url) {
        /*
         * this function will test if the url is local
         */
            url = local.urlParse(url).pathname;
            return local.modeJs === 'browser' &&
                !local.env.npm_config_mode_backend &&
                (/^\/test\./).test(url);
        };
    }());
    switch (local.modeJs) {



    // run node js-env code - function
    case 'node':
        break;
    }



    // run shared js-env code - init-after
    (function () {
        // init assets
        local.assetsDict['/assets.swgg.swagger.json'] =
            local.assetsDict['/assets.swgg.swagger.json'] ||
            local.assetsDict['/assets.swgg.swagger.petstore.json'];
        // coverage-hack - re-run test-server
        local.testRunServer(local);
        // coverage-hack - stateInit
        local.stateInit({});
        // init test-middleware
        local.middlewareList.push(function (request, response, nextMiddleware) {
        /*
         * this function will run the test-middleware
         */
            switch (request.urlParsed.pathname) {
            // test http POST handling-behavior
            case '/test.echo':
                // test response header handling-behavior
                local.serverRespondHeadSet(request, response, null, {
                    'X-Response-Header-Test': 'bb'
                });
                local.serverRespondEcho(request, response);
                break;
            // test http POST handling-behavior
            case '/test.body':
                // test request-body-read handling-behavior
                local.middlewareBodyRead(request, response, function () {
                    // test multiple request-body-read handling-behavior
                    local.middlewareBodyRead(request, response, function () {
                        response.write(request.bodyRaw);
                        response.end();
                    });
                });
                break;
            // test 500-internal-server-error handling-behavior
            case '/test.error-500':
                // test multiple-callback serverRespondHeadSet handling-behavior
                local.serverRespondHeadSet(request, response, null, {});
                nextMiddleware(local.errorDefault);
                // test multiple-callback error handling-behavior
                nextMiddleware(local.errorDefault);
                // test onErrorDefault handling-behavior
                local.testMock([
                ], function (onError) {
                    var error;
                    error = new Error('error');
                    error.statusCode = 500;
                    local.middlewareError(error, request, response);
                    onError();
                }, local.onErrorThrow);
                break;
            // test undefined-error handling-behavior
            case '/test.error-undefined':
                local.serverRespondDefault(request, response, 999);
                break;
            // test timeout handling-behavior
            case '/test.timeout':
                setTimeout(function () {
                    response.end();
                }, 2000);
                break;
            // serve file
            default:
                local.middlewareFileServer(request, response, nextMiddleware);
            }
        });
    }());
    switch (local.modeJs) {



    // run node js-env code - init-after
    /* istanbul ignore next */
    case 'node':
        switch (local.env.HEROKU_APP_NAME) {
        case 'h1-cron1':
            // heroku-keepalive
            setInterval(function () {
                local.ajax({ url: 'https://h1-cron1.herokuapp.com' }, local.onErrorThrow);
            }, 5 * 60 * 1000);
            local.cronJob = local.nop;
            // update cron
            local.ajax({
                url: 'https://kaizhu256.github.io/node-utility2/cronJob.js'
            }, function (error, data) {
                if (!error && data.responseText !== local.cronScript) {
                    local.cronScript = data.responseText;
                    local.vm.runInThisContext(local.cronScript);
                }
            });
            setInterval(function () {
                var cronTime;
                cronTime = new Date();
                if (cronTime.toISOString().slice(0, 16) <
                        (local.cronTime && local.cronTime.toISOString())) {
                    return;
                }
                local.cronTime = cronTime;
                // cron every 5 minutes
                if (local.cronTime.getUTCMinutes() % 5 === 0) {
                    // update cron
                    local.ajax({
                        url: 'https://kaizhu256.github.io/node-utility2/cronJob.js'
                    }, function (error, data) {
                        if (!error && data.responseText !== local.cronScript) {
                            local.cronScript = data.responseText;
                            local.vm.runInThisContext(local.cronScript);
                        }
                    });
                }
                local.cronJob();
            }, 30000);
            break;
        case 'h1-proxy1':
            // heroku-keepalive
            setInterval(function () {
                local.ajax({ url: 'https://h1-proxy1.herokuapp.com' }, local.onErrorThrow);
            }, 5 * 60 * 1000);
            break;
        }
        // init cli
        if (module !== require.main || local.global.utility2_rollup) {
            return;
        }
        local.assetsDict['/assets.recurse1'] = local.assetsDict['/assets.recurse2'] =
            '<a href="assets.recurse1"></a>\n' +
            '<a href="assets.recurse2"></a>\n' +
            '<a href="assets.undefined"></a>\n';
        local.assetsDict['/assets.script_only.html'] = '<h1>script_only_test</h1>\n' +
            '<script src="assets.utility2.js"></script>\n' +
            '<script>window.utility2.onReadyBefore.counter += 1;</script>\n' +
            '<script src="assets.example.js"></script>\n' +
            '<script src="assets.test.js"></script>\n' +
            '<script>window.utility2.onReadyBefore();</script>\n';
        if (process.argv[2]) {
            // start with coverage
            if (local.env.npm_config_mode_coverage) {
                process.argv.splice(1, 1, __dirname + '/lib.istanbul.js', 'cover');
                local.istanbul.cliDict[process.argv[2]]();
                return;
            }
            // start
            process.argv.splice(1, 1);
            process.argv[1] = local.path.resolve(process.cwd(), process.argv[1]);
            local.Module.runMain();
        }
        break;
    }
}());
