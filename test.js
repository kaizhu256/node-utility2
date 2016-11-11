/* istanbul instrument in package utility2 */
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
        // init Error.stackTraceLimit
        Error.stackTraceLimit = 20;
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
        switch (local.modeJs) {
        // re-init local from window.local
        case 'browser':
            local = window.local;
            break;
        // re-init local from example.js
        case 'node':
            local = (module.utility2 ||
                require(__dirname + '/index.js')).requireExampleJsFromReadme({
                __dirname: __dirname,
                module: module
            });
            /* istanbul ignore next */
            if (module.isRollup) {
                local = module;
                break;
            }
            // coverage-hack - cover istanbul
            require.cache[__dirname + '/lib.istanbul.js'] = null;
            local.utility2.istanbul2 = require(__dirname + '/lib.istanbul.js');
            local.utility2.istanbul.coverageReportCreate =
                local.utility2.istanbulCoverageReportCreate =
                local.utility2.istanbul2.coverageReportCreate;
            local.utility2.istanbul.instrumentInPackage =
                local.utility2.istanbulInstrumentInPackage =
                local.utility2.istanbul2.instrumentInPackage;
            local.utility2.istanbul2.codeDict = local.utility2.istanbul.codeDict;
            break;
        }
        // require modules
        local.istanbul = local.utility2.istanbul;
        local.jslint = local.utility2.jslint;
        local.uglifyjs = local.utility2.uglifyjs;
    }());



    // run shared js-env code - function
    (function () {
        // init tests
        local._testCase_testRun_failure = function (options, onError) {
        /*
         * this function will test testRun's failure handling-behavior
         */
            // test failure from callback handling-behavior
            onError(local.utility2.errorDefault);
            // test failure from multiple-callback handling-behavior
            onError();
            // test failure from ajax handling-behavior
            options = { url: '/undefined' };
            local.utility2.ajax(options, onError);
            // test failure from thrown error handling-behavior
            throw local.utility2.errorDefault;
        };

        local.testCase_FormData_default = function (options, onError) {
        /*
         * this function will test FormData's default handling-behavior
         */
            options = {};
            options.blob1 = new local.utility2.Blob(['hello', 'bye', '\u1234 ', 0]);
            options.blob2 = new local.utility2.Blob(['hello', 'bye', '\u1234 ', 0], {
                type: 'text/plain; charset=utf-8'
            });
            options.data = new local.utility2.FormData();
            options.data.append('text1', 'hellobye\u1234 0');
            // test file-upload handling-behavior
            options.data.append('file1', options.blob1);
            // test file-upload and filename handling-behavior
            options.data.append('file2', options.blob2, 'filename2.txt');
            options.method = 'POST';
            options.url = '/test.echo';
            local.utility2.ajax(options, function (error, xhr) {
                // validate no error occurred
                local.utility2.assert(!error, error);
                // validate responseText
                local.utility2.assert(xhr.responseText.indexOf(
                    '\r\nContent-Disposition: form-data; ' +
                        'name="text1"\r\n\r\nhellobye\u1234 0\r\n'
                ) >= 0, xhr.responseText);
                local.utility2.assert(xhr.responseText.indexOf(
                    '\r\nContent-Disposition: form-data; ' +
                        'name="file1"\r\n\r\nhellobye\u1234 0\r\n'
                ) >= 0, xhr.responseText);
                local.utility2.assert(xhr.responseText.indexOf(
                    '\r\nContent-Disposition: form-data; name="file2"; ' +
                        'filename="filename2.txt"\r\nContent-Type: text/plain; ' +
                        'charset=utf-8\r\n\r\nhellobye\u1234 0\r\n'
                ) >= 0, xhr.responseText);
                onError();
            });
        };

        local.testCase_FormData_error = function (options, onError) {
        /*
         * this function will test FormData's error handling-behavior
         */
            local.utility2.testMock([
                [local.utility2.FormData.prototype, { read: function (onError) {
                    onError(local.utility2.errorDefault);
                } }]
            ], function (onError) {
                options = {};
                options.data = new local.utility2.FormData();
                options.method = 'POST';
                options.url = '/test.echo';
                local.utility2.ajax(options, function (error) {
                    // validate error occurred
                    local.utility2.assert(error, error);
                    onError();
                });
            }, onError);
        };

        local.testCase_FormData_nullCase = function (options, onError) {
        /*
         * this function will test FormData's null-case handling-behavior
         */
            options = {};
            options.data = new local.utility2.FormData();
            options.method = 'POST';
            options.url = '/test.echo';
            local.utility2.ajax(options, function (error, xhr) {
                // validate no error occurred
                local.utility2.assert(!error, error);
                // validate responseText
                local.utility2.assert((/\r\n\r\n$/).test(xhr.responseText), xhr.responseText);
                onError();
            });
        };

        local.testCase_ajax_abort = function (options, onError) {
        /*
         * this function will test ajax's abort handling-behavior
         */
            options = local.utility2.ajax({ url: '/test.timeout' }, function (error) {
                // validate error occurred
                local.utility2.assert(error, error);
                onError();
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
            options = { url: 'package.json' };
            local.utility2.ajax(options, function (error, xhr) {
                // validate no error occurred
                local.utility2.assert(!error, error);
                // validate statusCode
                local.utility2.assertJsonEqual(xhr.statusCode, 200);
                // validate responseText
                local.utility2.assert((/"name": "utility2",/)
                    .test(xhr.responseText), xhr.responseText);
                onError();
            });
        };

        local.testCase_ajax_error = function (options, onError) {
        /*
         * this function will test ajax's error handling-behavior
         */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            [{
                // test 404-not-found-error handling-behavior
                url: '/test.error-404'
            }, {
                // test 500-internal-server-error handling-behavior
                url: '/test.error-500'
            }, {
                // test undefined-error handling-behavior
                url: '/test.error-undefined'
            }, {
                // test undefined https-url handling-behavior
                timeout: 1,
                url: 'https://localhost/undefined'
            }].forEach(function (_) {
                options = _;
                onParallel.counter += 1;
                local.utility2.ajax(options, function (error, xhr) {
                    // validate error occurred
                    local.utility2.assert(error, error);
                    // test getAllResponseHeaders' null handling-behavior
                    xhr.getAllResponseHeaders();
                    // test getResponseHeader' null handling-behavior
                    xhr.getResponseHeader('undefined');
                    onParallel();
                });
            });
            onParallel();
        };

        local.testCase_ajax_post = function (options, onError) {
        /*
         * this function will test ajax's POST handling-behavior
         */
            var onParallel;
            options = {};
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            // test /test.body handling-behavior
            onParallel.counter += 1;
            ['', 'arraybuffer', 'stream', 'text'].forEach(function (responseType) {
                local.utility2.ajax({
                    data: responseType === 'arraybuffer'
                        // test buffer post handling-behavior
                        ? local.utility2.bufferCreate('hello')
                        // test string post handling-behavior
                        : 'hello',
                    method: 'POST',
                    // test nodejs response handling-behavior
                    responseType: responseType === 'stream' && local.modeJs === 'node'
                        ? responseType
                        : '',
                    url: '/test.body'
                }, function (error, xhr) {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate statusCode
                    local.utility2.assertJsonEqual(xhr.statusCode, 200);
                    // validate response
                    switch (responseType) {
                    case 'arraybuffer':
                    case 'stream':
                        // cleanup response
                        local.utility2.requestResponseCleanup(null, xhr.response);
                        // validate response
                        options.data = xhr.response;
                        local.utility2.assert(options.data, options);
                        break;
                    default:
                        // validate responseText
                        options.data = xhr.responseText;
                        local.utility2.assertJsonEqual(options.data, 'hello');
                    }
                    onParallel();
                });
            });
            // test /test.echo handling-behavior
            local.utility2.ajax({
                data:  'hello',
                // test request header handling-behavior
                headers: { 'X-Request-Header-Test': 'hello' },
                method: 'POST',
                url: '/test.echo'
            }, function (error, xhr) {
                // validate no error occurred
                local.utility2.assert(!error, error);
                // validate statusCode
                local.utility2.assertJsonEqual(xhr.statusCode, 200);
                // validate response
                options.data = xhr.responseText;
                local.utility2.assert((/\r\nhello$/).test(options.data), options.data);
                local.utility2.assert((/\r\nx-request-header-test: hello\r\n/)
                    .test(options.data), options.data);
                // validate responseHeaders
                options.data = xhr.getAllResponseHeaders();
                local.utility2.assert((/^X-Response-Header-Test: bye\r\n/im)
                    .test(options.data), options.data);
                options.data = xhr.getResponseHeader('x-response-header-test');
                local.utility2.assertJsonEqual(options.data, 'bye');
                options.data = xhr.getResponseHeader('undefined');
                local.utility2.assertJsonEqual(options.data, null);
                onParallel();
            });
            onParallel();
        };

        local.testCase_ajax_timeout = function (options, onError) {
        /*
         * this function will test ajax's timeout handling-behavior
         */
            options = { timeout: 1, url: '/test.timeout' };
            setTimeout(function () {
                local.utility2.ajax(options, function (error) {
                    // validate error occurred
                    local.utility2.assert(error, error);
                    onError();
                });
            }, 1000);
        };

        local.testCase_ajaxProgressUpdate_misc = function (options, onError) {
        /*
         * this function will test ajaxProgressUpdate's misc handling-behavior
         */
            options = {};
            options.ajaxProgressDiv1 = local.modeJs === 'browser' &&
                document.querySelector('#ajaxProgressDiv1');
            if (!options.ajaxProgressDiv1) {
                onError();
                return;
            }
            local.utility2.testMock([
                // test testRun's no modeTest handling-behavior
                [local.global, { setTimeout: function (fnc) {
                    fnc();
                } }]
            ], function (onError) {
                options.ajaxProgressDiv1.style.background = 'transparent';
                local.utility2.ajaxProgressCounter = 0;
                local.utility2.ajaxProgressUpdate();
                onError();
            }, onError);
        };

        local.testCase_assertXxx_default = function (options, onError) {
        /*
         * this function will test assertXxx's default handling-behavior
         */
            options = {};
            // test assertion passed
            local.utility2.assert(true, true);
            // test assertion failed with undefined message
            local.utility2.tryCatchOnError(function () {
                local.utility2.assert(false);
            }, function (error) {
                // validate error occurred
                local.utility2.assert(error, error);
                // validate error-message
                local.utility2.assertJsonEqual(error.message, '');
            });
            // test assertion failed with string message
            local.utility2.tryCatchOnError(function () {
                local.utility2.assert(false, 'hello');
            }, function (error) {
                // validate error occurred
                local.utility2.assert(error, error);
                // validate error-message
                local.utility2.assertJsonEqual(error.message, 'hello');
            });
            // test assertion failed with error object
            local.utility2.tryCatchOnError(function () {
                local.utility2.assert(false, local.utility2.errorDefault);
            }, function (error) {
                // validate error occurred
                local.utility2.assert(error, error);
            });
            // test assertion failed with json object
            local.utility2.tryCatchOnError(function () {
                local.utility2.assert(false, { aa: 1 });
            }, function (error) {
                // validate error occurred
                local.utility2.assert(error, error);
                // validate error-message
                local.utility2.assertJsonEqual(error.message, '{"aa":1}');
            });
            options.list = ['', 0, false, null, undefined];
            options.list.forEach(function (aa, ii) {
                options.list.forEach(function (bb, jj) {
                    if (ii === jj) {
                        // test assertJsonEqual's handling-behavior
                        local.utility2.assertJsonEqual(aa, bb);
                    } else {
                        // test assertJsonNotEqual's handling-behavior
                        local.utility2.assertJsonNotEqual(aa, bb);
                    }
                });
            });
            onError();
        };

        local.testCase_blobRead_default = function (options, onError) {
        /*
         * this function will test blobRead's default handling-behavior
         */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            options = {};
            [
                new local.utility2.Blob(['hello', 'bye', '\u1234 ', 0]),
                new local.utility2.Blob(['hello', 'bye', '\u1234 ', 0], {
                    type: 'text/plain; charset=utf-8'
                })
            ].forEach(function (blob, ii) {
                options.blob = blob;
                [null, 'dataURL', 'text'].forEach(function (encoding) {
                    onParallel.counter += 1;
                    local.utility2.blobRead(options.blob, encoding, function (error, data) {
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data
                        switch (encoding) {
                        case 'dataURL':
                            if (ii === 0) {
                                local.utility2.assertJsonEqual(
                                    data,
                                    'data:;base64,aGVsbG9ieWXhiLQgMA=='
                                );
                                break;
                            }
                            local.utility2.assertJsonEqual(
                                data,
                                'data:text/plain; charset=utf-8;base64,aGVsbG9ieWXhiLQgMA=='
                            );
                            break;
                        case 'text':
                            local.utility2.assertJsonEqual(data, 'hellobye\u1234 0');
                            break;
                        default:
                            local.utility2.assertJsonEqual(
                                local.utility2.bufferToString(data),
                                'hellobye\u1234 0'
                            );
                        }
                        onParallel();
                    });
                });
            });
            onParallel();
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
            options.bff1 = local.utility2.bufferCreate(options.text1);
            options.text2 = local.utility2.bufferToString(options.bff1);
            local.utility2.assertJsonEqual(
                options.text2,
                local.utility2.bufferToString(options.text2)
            );
            // test base64 handling-behavior
            options.text3 = local.utility2.bufferToString(local.utility2.bufferCreate(
                local.utility2.bufferToString(options.bff1, 'base64'),
                'base64'
            ));
            local.utility2.assertJsonEqual(options.text2, options.text3);
            onError();
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
            ].forEach(function (_) {
                options = _;
                options.data = local.utility2.bufferIndexOfSubBuffer(
                    local.utility2.bufferCreate(options.buffer),
                    local.utility2.bufferCreate(options.subBuffer),
                    options.fromIndex
                );
                local.utility2.assertJsonEqual(options.data, options.validate);
            });
            onError();
        };

        local.testCase_debug_inline_default = function (options, onError) {
        /*
         * this function will test debug_inline's default handling-behavior
         */
            options = {};
            local.utility2.testMock([
                // suppress console.error
                [console, { error: function (arg) {
                    options.data += (arg || '') + '\n';
                } }]
            ], function (onError) {
                options.data = '';
                local.global['debug_inlineCallback'.replace('_i', 'I')](
                    local.utility2.echo
                )('hello');
                // validate data
                local.utility2.assertJsonEqual(
                    options.data,
                    '\n\n\ndebug_inline\nhello\n\n'.replace('_i', 'I')
                );
                onError();
            }, onError);
        };

        local.testCase_docApiCreate_default = function (options, onError) {
        /*
         * this function will test docApiCreate's default handling-behavior
         */
            /*jslint evil: true*/
            options = {};
            options.data = local.utility2.docApiCreate({
                moduleDict: {
                    // test module.exports is a function handling-behavior
                    function: {
                        example: '',
                        exports: local.utility2.objectSetDefault(
                            local.utility2.nop.bind(null),
                            { aa: 1 }
                        )
                    },
                    // test default handling-behavior
                    utility2: {
                        example: local.utility2.testRun.toString().replace((/;/g), ';\n    '),
                        exports: local.utility2
                    }
                }
            });
            // validate data
            local.utility2.assert(new RegExp('\n' +
                ' *?<h2>\n' +
                ' *?<a href="#element.utility2.nop" id="element.utility2.nop">\n' +
                ' *?function <span class="docApiSignatureSpan">utility2.</span>nop\n' +
                ' *?<span class="docApiSignatureSpan">\\(\\s*?\\)</span>\n' +
                ' *?</a>\n' +
                ' *?</h2>\n' +
                ' *?<ul>\n' +
                ' *?<li>description and source code<pre class="docApiCodePre">')
                .test(options.data), options.data);
            onError();
        };

        local.testCase_echo_default = function (options, onError) {
        /*
         * this function will test echo's default handling-behavior
         */
            options = {};
            options.data = local.utility2.echo('hello');
            local.utility2.assertJsonEqual(options.data, 'hello');
            onError();
        };

        local.testCase_exit_default = function (options, onError) {
        /*
         * this function will exit's default handling-behavior
         */
            options = [
                // suppress console.log
                [console, { log: local.utility2.nop }]
            ];
            // test exit's default handling-behavior
            local.utility2.testMock(options, function (onError) {
                // test invalid exit-code handling-behavior
                local.utility2.exit('invalid exit-code');
                onError();
            }, onError);
        };

        local.testCase_isNullOrUndefined_default = function (options, onError) {
        /*
         * this function will test isNullOrUndefined's default handling-behavior
         */
            options = {};
            options.data = local.utility2.isNullOrUndefined(null);
            // validate data
            local.utility2.assertJsonEqual(options.data, true);
            options.data = local.utility2.isNullOrUndefined(undefined);
            // validate data
            local.utility2.assertJsonEqual(options.data, true);
            options.data = local.utility2.isNullOrUndefined(false);
            // validate data
            local.utility2.assertJsonEqual(options.data, false);
            onError();
        };

        local.testCase_istanbulCoverageReportCreate_default = function (options, onError) {
        /*
         * this function will test istanbulCoverageReportCreate's default handling-behavior
         */
            local.utility2.testMock([
                // suppress console.log
                [console, { log: local.utility2.nop }]
            ], function (onError) {
                /*jslint evil: true*/
                // test no coverage handling-behavior
                local.istanbul.coverageReportCreate({});
                options = {};
                options.coverage = local.global.__coverage__mock = {};
                // cleanup old coverage
                if (local.modeJs === 'node') {
                    local.utility2.fsRmrSync('tmp/build/coverage.html/aa');
                }
                // test path handling-behavior
                ['/', local.utility2.__dirname].forEach(function (dir) {
                    ['aa.js', 'aa/bb.js'].forEach(function (path) {
                        // cover path
                        eval(local.istanbul.instrumentSync(
                            // test skip handling-behavior
                            'null',
                            dir + '/' + path,
                            '__coverage__mock'
                        ));
                    });
                });
                // create report with covered path
                local.istanbul.coverageReportCreate(options);
                // test file-content handling-behavior
                [
                    // test no content handling-behavior
                    '',
                    // test uncovereed-code handling-behavior
                    'null && null',
                    // test trailing-whitespace handling-behavior
                    'null ',
                    // test skip handling-behavior
                    '/* istanbul ignore next */\nnull && null'
                ].forEach(function (content) {
                    options = {};
                    options.coverage = local.global.__coverage__mock = {};
                    // cover path
                    eval(local.istanbul.instrumentSync(
                        content,
                        'aa.js',
                        '__coverage__mock'
                    ));
                    // create report with covered content
                    local.istanbul.coverageReportCreate(options);
                });
                onError();
            }, onError);
        };

        local.testCase_istanbulInstrumentSync_default = function (options, onError) {
        /*
         * this function will test istanbulInstrumentSync's default handling-behavior
         */
            options = {};
            options.data = local.istanbul.instrumentSync('1', 'test.js');
            // validate data
            local.utility2.assert(options.data.indexOf('.s[\'1\']++;1;\n') >= 0, options);
            onError();
        };

        local.testCase_jslintAndPrint_default = function (options, onError) {
        /*
         * this function will test jslintAndPrint's default handling-behavior
         */
            options = [
                // suppress console.error
                [console, { error: local.utility2.nop }],
                [local.jslint, { errorText: '' }]
            ];
            local.utility2.testMock(options, function (onError) {
                // test empty script handling-behavior
                local.jslint.jslintAndPrint('', 'empty.css');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                // test csslint failed handling-behavior
                local.jslint.jslintAndPrint('syntax error', 'failed.css');
                // validate error occurred
                local.utility2.assert(local.jslint.errorText, local.jslint.errorText);
                // test csslint passed handling-behavior
                local.jslint.jslintAndPrint('body { font: normal; }', 'passed.css');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                // test csslint flexbox handling-behavior
                local.jslint.jslintAndPrint('body { display: flex; }', 'passed.css');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                // test jslint failed handling-behavior
                local.jslint.jslintAndPrint('syntax error', 'failed.js');
                // validate error occurred
                local.utility2.assert(local.jslint.errorText, local.jslint.errorText);
                // test jslint passed handling-behavior
                local.jslint.jslintAndPrint('{}', 'passed.js');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                // test /* jslint-ignore-begin */ ... /* jslint-ignore-end */
                // handling-behavior
                local.jslint.jslintAndPrint('/* jslint-ignore-begin */\n' +
                    'syntax error\n' +
                    '/* jslint-ignore-end */\n', 'passed.js');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                // test /* jslint-ignore-next-line */ ...
                // handling-behavior
                local.jslint.jslintAndPrint('/* jslint-ignore-next-line */\n' +
                    'syntax error\n', 'passed.js');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                // test /* jslint-indent-begin */ ... /* jslint-indent-end */
                // handling-behavior
                local.jslint.jslintAndPrint('(function () {\n' +
                    '    "use strict";\n' +
                    '/* jslint-indent-begin 4 */\n' +
                    'String();\n' +
                    '/* jslint-indent-end */\n' +
                    '}());\n', 'passed.js');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                onError();
            }, onError);
        };

        local.testCase_jslintAndPrintConditional_default = function (options, onError) {
        /*
         * this function will test jslintAndPrintConditional's default handling-behavior
         */
            options = [
                // suppress console.error
                [console, { error: local.utility2.nop }],
                [local.jslint, { errorText: '' }]
            ];
            local.utility2.testMock(options, function (onError) {
                // test no csslint handling-behavior
                local.utility2.jslintAndPrintConditional('no csslint', 'empty.css');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                // test csslint passed handling-behavior
                local.utility2.jslintAndPrintConditional(
                    '/*csslint*/\nbody { font: normal; }',
                    'passed.css'
                );
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                // test no jslint handling-behavior
                local.utility2.jslintAndPrintConditional('no jslint', 'empty.js');
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                // test jslint passed handling-behavior
                local.utility2.jslintAndPrintConditional(
                    '/*jslint node: true*/\nconsole.log("hello");',
                    'passed.js'
                );
                // validate no error occurred
                local.utility2.assert(!local.jslint.errorText, local.jslint.errorText);
                onError();
            }, onError);
        };

        local.testCase_jsonCopy_default = function (options, onError) {
        /*
         * this function will test jsonCopy's default handling-behavior
         */
            options = {};
            // test various data-type handling-behavior
            [undefined, null, false, true, 0, 1, 1.5, 'a'].forEach(function (element) {
                options.data = local.utility2.jsonCopy(element);
                local.utility2.assertJsonEqual(options.data, element);
            });
            onError();
        };

        local.testCase_jsonStringifyOrdered_default = function (options, onError) {
        /*
         * this function will test jsonStringifyOrdered's default handling-behavior
         */
            options = {};
            // test data-type handling-behavior
            [undefined, null, false, true, 0, 1, 1.5, 'a', {}, []].forEach(function (data) {
                options.aa = local.utility2.jsonStringifyOrdered(data);
                options.bb = JSON.stringify(data);
                local.utility2.assertJsonEqual(options.aa, options.bb);
            });
            // test data-ordering handling-behavior
            options = {
                // test nested dict handling-behavior
                ff: { hh: 2, gg: 1},
                // test nested array handling-behavior
                ee: [1, null, undefined],
                dd: local.utility2.nop,
                cc: undefined,
                bb: null,
                aa: 1
            };
            // test circular-reference handling-behavior
            options.zz = options;
            local.utility2.assertJsonEqual(
                options,
                { aa: 1, bb: null, ee: [ 1, null, null ], ff: { gg: 1, hh: 2 } }
            );
            onError();
        };

        local.testCase_jwtHs256Xxx_default = function (options, onError) {
        /*
         * this function will test jwtHs256Xxx's default handling-behavior
         */
            options = {};
            // use canonical example at https://jwt.io/
            options.data = { sub: '1234567890', name: 'John Doe', admin: true };
            options.token = local.utility2.jwtHs256Encode('secret', options.data);
            // validate encoded token
            local.utility2.assertJsonEqual(
                options.token,
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
                    '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
                    '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
            );
            // test decoding-failed handling-behavior
            options.data = local.utility2.jwtHs256Decode('invalid', options.token);
            local.utility2.assertJsonEqual(options.data, undefined);
            options.data = local.utility2.jwtHs256Decode('secret', options.token);
            // validate decoded data
            local.utility2.assertJsonEqual(
                options.data,
                { admin: true, name: 'John Doe', sub: '1234567890' }
            );
            onError();
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
                options.elementDict[local.utility2.listGetElementRandom(options.list)] = true;
            }
            // validate all elements were retrieved from list
            local.utility2.assertJsonEqual(
                Object.keys(options.elementDict).sort(),
                ['aa', 'bb', 'cc', 'dd']
            );
            onError();
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
                    JSON.stringify(local.utility2.listShuffle(JSON.parse(options.list)));
                // validate shuffled list
                local.utility2.assertJsonEqual(
                    options.listShuffled.length,
                    options.list.length
                );
                options.changed = options.changed || options.listShuffled !== options.list;
            }
            // validate list changed at least once during the shuffle
            local.utility2.assert(options.changed, options);
            onError();
        };

        local.testCase_objectGetElementFirst_default = function (options, onError) {
        /*
         * this function will test objectGetElementFirst's default handling-behavior
         */
            options = { aa: 1, bb: 2 };
            local.utility2.assertJsonEqual(
                local.utility2.objectGetElementFirst(options),
                { key: 'aa', value: 1 }
            );
            onError();
        };

        local.testCase_objectKeysTypeOf_default = function (options, onError) {
        /*
         * this function will test objectKeysTypeOf's default handling-behavior
         */
            options = {
                aa: true,
                bb: local.utility2.nop,
                cc: 0,
                dd: null,
                ee: '',
                ff: undefined
            };
            options = local.utility2.objectKeysTypeof(options);
            local.utility2.assertJsonEqual(
                options,
                'boolean aa\nfunction bb\nnumber cc\nobject dd\nstring ee\nundefined ff'
            );
            onError();
        };

        local.testCase_objectLiteralize_default = function (options, onError) {
        /*
         * this function will test objectLiteralize's default handling-behavior
         */
            options = local.utility2.objectLiteralize({
                '': '$[]',
                '$[]1': [1, { '$[]2': [2, 3] }]
            });
            // validate options
            local.utility2.assertJsonEqual(options, { 1: { 2: 3 }, '': '$[]' });
            onError();
        };

        local.testCase_objectSetDefault_default = function (options, onError) {
        /*
         * this function will test objectSetDefault's default handling-behavior
         */
            // tset null handling behavior
            local.utility2.objectSetDefault();
            local.utility2.objectSetDefault({});
            // test falsey handling-behavior
            ['', 0, false, null, undefined].forEach(function (aa) {
                ['', 0, false, null, undefined].forEach(function (bb) {
                    local.utility2.assertJsonEqual(
                        local.utility2.objectSetDefault({ data: aa }, { data: bb }).data,
                        bb === undefined
                            ? aa
                            : bb
                    );
                });
            });
            // test non-recursive handling-behavior
            options = local.utility2.objectSetDefault(
                { aa: 0, bb: { cc: 1 }, cc: { dd: {} }, dd: [1, 1], ee: [1, 1] },
                { aa: 2, bb: { dd: 2 }, cc: { dd: { ee: 2 } }, dd: [2, 2], ee: { ff: 2 } },
                // test default-depth handling-behavior
                null
            );
            // validate options
            local.utility2.assertJsonEqual(
                options,
                { aa: 2, bb: { cc: 1 }, cc: { dd: {} }, dd: [1, 1], ee: [1, 1] }
            );
            // test recursive handling-behavior
            options = local.utility2.objectSetDefault(
                { aa: 0, bb: { cc: 1 }, cc: { dd: {} }, dd: [1, 1], ee: [1, 1] },
                { aa: 2, bb: { dd: 2 }, cc: { dd: { ee: 2 } }, dd: [2, 2], ee: { ff: 2 } },
                // test depth handling-behavior
                2
            );
            // validate options
            local.utility2.assertJsonEqual(
                options,
                { aa: 2, bb: { cc: 1, dd: 2 }, cc: { dd: {} }, dd: [1, 1], ee: [1, 1] }
            );
            onError();
        };

        local.testCase_objectSetOverride_default = function (options, onError) {
        /*
         * this function will test objectSetOverride's default handling-behavior
         */
            // tset null handling behavior
            local.utility2.objectSetOverride();
            local.utility2.objectSetOverride({});
            // test falsey handling-behavior
            ['', 0, false, null, undefined].forEach(function (aa) {
                ['', 0, false, null, undefined].forEach(function (bb) {
                    local.utility2.assertJsonEqual(
                        local.utility2.objectSetOverride({ data: aa }, { data: bb }).data,
                        bb === undefined
                            ? aa
                            : bb
                    );
                });
            });
            // test non-recursive handling-behavior
            options = local.utility2.objectSetOverride(
                { aa: 1, bb: { cc: 1 }, cc: { dd: 1 }, dd: [1, 1], ee: [1, 1] },
                { aa: 2, bb: { dd: 2 }, cc: { ee: 2 }, dd: [2, 2], ee: { ff: 2 } },
                // test default-depth handling-behavior
                null
            );
            // validate options
            local.utility2.assertJsonEqual(
                options,
                { aa: 2, bb: { dd: 2 }, cc: { ee: 2 }, dd: [2, 2], ee: { ff: 2 } }
            );
            // test recursive handling-behavior
            options = local.utility2.objectSetOverride(
                { aa: 1, bb: { cc: 1 }, cc: { dd: 1 }, dd: [1, 1], ee: [1, 1] },
                { aa: 2, bb: { dd: 2 }, cc: { ee: 2 }, dd: [2, 2], ee: { ff: 2 } },
                // test depth handling-behavior
                2
            );
            // validate options
            local.utility2.assertJsonEqual(
                options,
                { aa: 2, bb: { cc: 1, dd: 2 }, cc: { dd: 1, ee: 2 }, dd: [2, 2], ee: { ff: 2 } }
            );
            // test envDict with empty-string handling-behavior
            options = local.utility2.objectSetOverride(
                local.utility2.envDict,
                { 'emptyString': null },
                // test default-depth handling-behavior
                null
            );
            // validate options
            local.utility2.assertJsonEqual(options.emptyString, '');
            onError();
        };

        local.testCase_objectTraverse_default = function (options, onError) {
        /*
         * this function will test objectTraverse's default handling-behavior
         */
            options = { aa: null, bb: 2, cc: { dd: 4, ee: [5, 6, 7] } };
            // test circular-reference handling-behavior
            options.data = options;
            local.utility2.objectTraverse(options, function (element) {
                if (element && typeof element === 'object' && !Array.isArray(element)) {
                    element.zz = true;
                }
            });
            // validate options
            local.utility2.assertJsonEqual(
                options,
                { aa: null, bb: 2, cc: { dd: 4, ee: [5, 6, 7], zz: true }, zz: true }
            );
            onError();
        };

        local.testCase_onErrorDefault_default = function (options, onError) {
        /*
         * this function will test onErrorDefault's default handling-behavior
         */
            local.utility2.testMock([
                // suppress console.error
                [console, { error: function (arg) {
                    options = arg;
                } }],
                [local.global, { __coverage__: null }]
            ], function (onError) {
                // test no error handling-behavior
                local.utility2.onErrorDefault();
                // validate options
                local.utility2.assert(!options, options);
                // test error handling-behavior
                local.utility2.onErrorDefault(local.utility2.errorDefault);
                // validate options
                local.utility2.assert(options, options);
                onError();
            }, onError);
        };

        local.testCase_onNext_error = function (options, onError) {
        /*
         * this function will test onNext's error handling-behavior
         */

            options = {};
            local.utility2.onNext(options, function () {
                throw local.utility2.errorDefault;
            });
            options.modeNext = 0;
            local.utility2.tryCatchOnError(function () {
                options.onNext();
            }, function (error) {
                // validate error occurred
                local.utility2.assert(error, error);
                onError();
            });
        };

        local.testCase_onParallel_default = function (options, onError) {
        /*
         * this function will test onParallel's default handling-behavior
         */
            var onParallel, onParallelError;
            // jslint-hack
            local.utility2.nop(options);
            // test onDebug handling-behavior
            onParallel = local.utility2.onParallel(onError, function (error, self) {
                // validate no error occurred
                local.utility2.assert(!error, error);
                // validate self
                local.utility2.assert(self.counter >= 0, self);
            });
            onParallel.counter += 1;
            // test multiple-task handling-behavior
            onParallel.counter += 1;
            setTimeout(function () {
                onParallelError = local.utility2.onParallel(function (error) {
                    // validate error occurred
                    local.utility2.assert(error, error);
                    onParallel();
                });
                onParallelError.counter += 1;
                // test error handling-behavior
                onParallelError.counter += 1;
                onParallelError(local.utility2.errorDefault);
                // test ignore-after-error handling-behavior
                onParallelError();
            });
            // test default handling-behavior
            onParallel();
        };

        local.testCase_onTimeout_timeout = function (options, onError) {
        /*
         * this function will test onTimeout's timeout handling-behavior
         */
            options = local.utility2.timeElapsedStart();
            local.utility2.onTimeout(function (error) {
                // validate error occurred
                local.utility2.assert(error, error);
                // validate error message
                local.utility2.assert(error.message
                    .indexOf('testCase_onTimeout_errorTimeout') >= 0, error);
                // save timeElapsed
                local.utility2.timeElapsedStop(options);
                // validate timeElapsed passed is greater than timeout
                local.utility2.assert(options.timeElapsed >= 1500, options);
                onError();
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
            options.timeElapsed = local.utility2.profileSync(function () {
                return;
            });
            // validate timeElapsed
            local.utility2.assert(0 <= options.timeElapsed &&
                options.timeElapsed < 1000, options.timeElapsed);
            // test profile's async handling-behavior
            local.utility2.profile(function (onError) {
                setTimeout(onError);
            }, function (error, timeElapsed) {
                // validate no error occurred
                local.utility2.assert(!error, error);
                options.timeElapsed = timeElapsed;
                // validate timeElapsed
                local.utility2.assert(0 <= options.timeElapsed &&
                    options.timeElapsed < local.utility2.timeoutDefault, options.timeElapsed);
                onError();
            });
        };

        local.testCase_sjclCipherAes128Xxx_default = function (options, onError) {
        /*
         * this function will test sjclCipherAes128Xxx's default handling-behavior
         */
            options = {};
            options.encrypted = local.utility2.sjclCipherAes128Encrypt('password', 'hello');
            // test sjclCipherAes128Decrypt's fail handling-behavior
            options.decrypted = local.utility2.sjclCipherAes128Decrypt(
                'invalid',
                options.encrypted
            );
            local.utility2.assertJsonEqual(options.decrypted, undefined);
            // test sjclCipherAes128Decrypt's pass handling-behavior
            options.decrypted = local.utility2.sjclCipherAes128Decrypt(
                'password',
                options.encrypted
            );
            local.utility2.assertJsonEqual(options.decrypted, 'hello');
            onError();
        };

        local.testCase_sjclHashHmacSha256Xxx_default = function (options, onError) {
        /*
         * this function will test sjclHashHmacSha256Xxx's default handling-behavior
         */
            options = {};
            options.data = local.utility2.sjclHashHmacSha256Create('password', 'hello');
            local.utility2.assertJsonEqual(
                options.data,
                'euYV5phWfl4VEt2BQOdAvU1l36TbGV2AyjJ95jArSmM='
            );
            onError();
        };

        local.testCase_sjclHashScryptXxx_default = function (options, onError) {
        /*
         * this function will test sjclHashScryptXxx's default handling-behavior
         */
            options = {};
            // test sjclHashScryptCreate's null-case handling-behavior
            options.data = local.utility2.sjclHashScryptCreate();
            local.utility2.assertJsonEqual(options.data.slice(0, 10), '$s0$10801$');
            // https://github.com/wg/scrypt
            // test sjclHashScryptValidate's fail handling-behavior
            options.data = local.utility2.sjclHashScryptValidate(
                'password',
                '$s0$80801$epIxT/h6HbbwHaehFnh/bw==' +
                    '$l/guDhz2Q0v/D93gq0K0qtSX6FWP8pH5maAJkbIcRaEA'
            );
            local.utility2.assertJsonEqual(options.data, false);
            // https://github.com/wg/scrypt
            // test sjclHashScryptValidate's pass handling-behavior
            options.data = local.utility2.sjclHashScryptValidate(
                'password',
                '$s0$80801$epIxT/h6HbbwHaehFnh/bw==' +
                    '$l/guDhz2Q0v/D93gq0K0qtSX6FWP8pH5maAJkbIcRaE='
            );
            local.utility2.assertJsonEqual(options.data, true);
            onError();
        };

        local.testCase_sjclHashSha256Xxx_default = function (options, onError) {
        /*
         * this function will test sjclHashSha256Xxx's default handling-behavior
         */
            options = {};
            options.data = local.utility2.sjclHashSha256Create('hello');
            local.utility2.assertJsonEqual(
                options.data,
                'LPJNul+wow4m6DsqxbninhsWHlwfp0JecwQzYpOLmCQ='
            );
            onError();
        };

        local.testCase_taskCreateCached_default = function (options, onError) {
        /*
         * this function will test taskCreateCached's default handling-behavior
         */
            var cacheValue, onTask, optionsCopy;
            options = {};
            local.utility2.onNext(options, function (error, data) {
                switch (options.modeNext) {
                // test no cache handling-behavior
                case 1:
                    onTask = function (onError) {
                        onError(null, cacheValue);
                    };
                    options.cacheDict = 'testCase_taskCreateCached_default';
                    options.key = 'memory';
                    // cleanup memory-cache
                    local.utility2.cacheDict[options.cacheDict] = null;
                    cacheValue = 'hello';
                    optionsCopy = {
                        cacheDict: options.cacheDict,
                        key: options.key,
                        // test onCacheWrite handling-behavior
                        onCacheWrite: options.onNext
                    };
                    local.utility2.taskCreateCached(optionsCopy, onTask, options.onNext);
                    break;
                case 2:
                    // validate data
                    local.utility2.assertJsonEqual(data, 'hello');
                    // validate no cache-hit
                    local.utility2.assert(!optionsCopy.modeCacheHit, optionsCopy.modeCacheHit);
                    break;
                // test cache with update handling-behavior
                case 3:
                    cacheValue = 'bye';
                    optionsCopy = {
                        cacheDict: options.cacheDict,
                        key: options.key,
                        // test modeCacheUpdate handling-behavior
                        modeCacheUpdate: true,
                        // test onCacheWrite handling-behavior
                        onCacheWrite: options.onNext
                    };
                    local.utility2.taskCreateCached(optionsCopy, onTask, options.onNext);
                    break;
                case 4:
                    // validate data
                    local.utility2.assertJsonEqual(data, 'hello');
                    // validate modeCacheHit
                    local.utility2.assertJsonEqual(
                        optionsCopy.modeCacheHit,
                        true
                    );
                    break;
                // test cache handling-behavior
                case 5:
                    optionsCopy = {
                        cacheDict: options.cacheDict,
                        key: options.key
                    };
                    local.utility2.taskCreateCached(optionsCopy, onTask, options.onNext);
                    break;
                case 6:
                    // validate data
                    local.utility2.assertJsonEqual(data, 'bye');
                    // validate modeCacheHit
                    local.utility2.assertJsonEqual(
                        optionsCopy.modeCacheHit,
                        true
                    );
                    options.onNext();
                    break;
                default:
                    onError(error);
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
            local.utility2.taskCreate(options, function (onError) {
                onError();
                // test multiple-callback handling-behavior
                onError();
            }, function () {
                options.counter += 1;
            });
            // validate counter incremented once
            local.utility2.assertJsonEqual(options.counter, 1);
            onError();
        };

        local.testCase_taskCreate_upsert = function (options, onError) {
        /*
         * this function will test taskCreate's upsert handling-behavior
         */
            options = { counter: 0, key: 'testCase_taskCreate_upsert' };
            // test upsert handling-behavior
            [null, null].forEach(function () {
                local.utility2.taskCreate(options, function (onError) {
                    options.counter += 1;
                    setTimeout(onError);
                });
            });
            // validate counter incremented once
            setTimeout(function () {
                local.utility2.assertJsonEqual(options.counter, 1);
                onError();
            });
        };

        local.testCase_templateRender_default = function (options, onError) {
        /*
         * this function will test templateRender's default handling-behavior
         */
            options = {};
            // test undefined valueDefault handling-behavior
            options.data = local.utility2.templateRender('{{aa}}', {});
            local.utility2.assertJsonEqual(options.data, '{{aa}}');
            // test default handling-behavior
            options.data = local.utility2.templateRender('{{aa}} ' +
                '{{aa jsonStringify htmlSafe encodeURIComponent decodeURIComponent trim}} ' +
                '{{bb}} {{cc}} {{dd}} {{ee.ff}}', {
                    // test string value handling-behavior
                    aa: '<aa>',
                    // test non-string value handling-behavior
                    bb: 1,
                    // test null-value handling-behavior
                    cc: null,
                    // test undefined-value handling-behavior
                    dd: undefined,
                    // test nested value handling-behavior
                    ee: { ff: 'gg' }
                });
            local.utility2.assertJsonEqual(
                options.data,
                '<aa> &quot;&lt;aa&gt;&quot; 1 null {{dd}} gg'
            );
            // test partial handling-behavior
            options.data = local.utility2.templateRender('{{#undefined aa}}\n' +
                'list1{{#each list1}}\n' +
                '    aa - {{aa}}\n' +
                '    list2{{#each list2}}\n' +
                '        bb - {{bb}}\n' +
                '        {{#if bb}}\n' +
                '        if\n' +
                '        {{#unless bb}}\n' +
                '        else\n' +
                '        {{/if bb}}\n' +
                '        {{#unless bb}}\n' +
                '        unless\n' +
                '        {{/unless bb}}\n' +
                '    {{/each list2}}\n' +
                '{{/each list1}}\n' +
                '{{/undefined aa}}\n', {
                    list1: [
                        // test null-value handling-behavior
                        null,
                        {
                            aa: 'aa',
                            // test recursive-list handling-behavior
                            list2: [{ bb: 'bb' }, { bb: null }]
                        }
                    ]
                });
            local.utility2.assertJsonEqual(options.data, '{{#undefined aa}}\n' +
                'list1\n' +
                '    aa - {{aa}}\n' +
                '    list2\n' +
                '\n' +
                '    aa - aa\n' +
                '    list2\n' +
                '        bb - bb\n' +
                '        \n' +
                '        if\n' +
                '        \n' +
                '        \n' +
                '    \n' +
                '        bb - null\n' +
                '        \n' +
                '        else\n' +
                '        \n' +
                '        \n' +
                '        unless\n' +
                '        \n' +
                '    \n' +
                '\n' +
                '{{/undefined aa}}\n');
            onError();
        };

        local.testCase_testRun_nop = function (options, onError) {
        /*
         * this function will test testRun's nop handling-behavior
         */
            options = {};
            local.utility2.testMock([
                // test testRun's no modeTest handling-behavior
                [local.utility2, { envDict: {}, modeTest: null }]
            ], function (onError) {
                local.utility2.testRun(options);
                // validate no options.onReadyAfter
                local.utility2.assert(!options.onReadyAfter, options);
                onError();
            }, onError);
        };

        local.testCase_uglify_default = function (options, onError) {
        /*
         * this function will test uglify's default handling-behavior
         */
            options = {};
            options.data = local.uglifyjs.uglify('aa = 1');
            // validate data
            local.utility2.assertJsonEqual(options.data, 'aa=1');
            onError();
        };

        local.testCase_uglifyIfProduction_default = function (options, onError) {
        /*
         * this function will test uglify's default handling-behavior
         */
            options = {};
            local.utility2.testMock([
                // suppress console.error
                [local.utility2.envDict, { NODE_ENV: '' }]
            ], function (onError) {
                // test no production-mode handling-behavior
                local.utility2.envDict.NODE_ENV = '';
                options.data = local.utility2.uglifyIfProduction('aa = 1');
                // validate data
                local.utility2.assertJsonEqual(options.data, 'aa = 1');
                // test production-mode handling-behavior
                local.utility2.envDict.NODE_ENV = 'production';
                options.data = local.utility2.uglifyIfProduction('aa = 1');
                // validate data
                local.utility2.assertJsonEqual(options.data, 'aa=1');
                onError();
            }, onError);
        };

        local.testCase_urlParse_default = function (options, onError) {
        /*
         * this function will test urlParse's default handling-behavior
         */
            options = [
                [local.utility2, {
                    // test default PORT handling-behavior
                    envDict: {},
                    // test init-serverLocalHost handling-behavior
                    serverLocalHost: ''
                }]
            ];
            local.utility2.testMock(options, function (onError) {
                // test default handling-behavior
                local.utility2.assertJsonEqual(local.utility2.urlParse(
                    'https://localhost:80/foo?aa=1&bb%20cc=dd%20=ee&aa=2&aa#zz=1'
                ), {
                    hash: '#zz=1',
                    host: 'localhost:80',
                    hostname: 'localhost',
                    href: 'https://localhost:80/foo?aa=1&bb%20cc=dd%20=ee&aa=2&aa#zz=1',
                    pathname: '/foo',
                    port: '80',
                    protocol: 'https:',
                    query: { aa: ['1', '2', ''], 'bb cc': 'dd =ee' },
                    search: '?aa=1&bb%20cc=dd%20=ee&aa=2&aa'
                });
                // test error handling-behavior
                local.utility2.assertJsonEqual(local.utility2.urlParse(null), {
                    hash: '',
                    host: '',
                    hostname: '',
                    href: '',
                    pathname: '',
                    port: '',
                    protocol: '',
                    query: {},
                    search: ''
                });
                onError();
            }, onError);
        };

        local.testCase_uuidXxx_default = function (options, onError) {
        /*
         * this function will test uuidXxx's default handling-behavior
         */
            options = {};
            // test uuid4 handling-behavior
            options.data1 = local.utility2.uuid4Create();
            // validate data1
            local.utility2.assert(local.utility2.regexpUuidValidate
                .test(options.data1), options.data1);
            // test uuidTime handling-behavior
            options.data1 = local.utility2.uuidTimeCreate();
            // validate data1
            local.utility2.assert(local.utility2.regexpUuidValidate
                .test(options.data1), options.data1);
            setTimeout(function () {
                options.data2 = local.utility2.uuidTimeCreate();
                // validate data2
                local.utility2.assert(local.utility2.regexpUuidValidate
                    .test(options.data2), options.data2);
                // validate data1 < data2
                local.utility2.assert(
                    options.data1 < options.data2,
                    [options.data1, options.data2]
                );
                onError();
            }, 1000);
        };
    }());
    switch (local.modeJs) {



    // run browser js-env code - function
    case 'browser':
        local.testCase_blobRead_error = function (options, onError) {
        /*
         * this function will test blobRead's error handling-behavior
         */
            options = [
                [local.global.FileReader.prototype, { readAsArrayBuffer: function () {
                    this.onabort({ type: 'abort' });
                    this.onerror({ type: 'error' });
                } }]
            ];
            local.utility2.testMock(options, function (onError) {
                local.utility2.blobRead(null, null, function (error) {
                    // validate error occurred
                    local.utility2.assert(error, error);
                });
                onError();
            }, onError);
        };

        local.testCase_cookieXxx_default = function (options, onError) {
        /*
         * this function will test cookieXxx's default handling-behavior
         */
            options = {};
            // test cookieRemoveAll handling-behavior
            local.utility2.cookieRemoveAll();
            // validate data
            options.data = local.utility2.cookieDict().aa;
            local.utility2.assertJsonEqual(options.data, undefined);
            // test cookieSet handling-behavior
            local.utility2.cookieSet('aa', 'bb', 1000);
            // validate data
            options.data = local.utility2.cookieDict().aa;
            local.utility2.assertJsonEqual(options.data, 'bb');
            // test cookieRemove handling-behavior
            local.utility2.cookieRemove('aa');
            // validate data
            options.data = local.utility2.cookieDict().aa;
            local.utility2.assertJsonEqual(options.data, undefined);
            // test cookieSet handling-behavior
            local.utility2.cookieSet('aa', 'bb', 1000);
            // test cookieRemoveAll handling-behavior
            local.utility2.cookieRemoveAll();
            // validate data
            options.data = local.utility2.cookieDict().aa;
            local.utility2.assertJsonEqual(options.data, undefined);
            onError();
        };

        local.testCase_domFragmentRender_default = function (options, onError) {
        /*
         * this function will test domFragmentRender's default handling-behavior
         */
            options = {};
            options.data = local.utility2.domFragmentRender('<div>{{value}}</div>', {
                value: 'hello'
            });
            local.utility2.assertJsonEqual(
                options.data.children[0].outerHTML,
                '<div>hello</div>'
            );
            onError();
        };

        local.testCase_domQuerySelectorAll_default = function (options, onError) {
        /*
         * this function will test domQuerySelectorAll's default handling-behavior
         */
            options = {};
            [
                document,
                // test jQuery handling-behavior
                [document]
            ].forEach(function (element) {
                options.data = local.utility2.domQuerySelectorAll(element, 'body')[0];
                local.utility2.assert(options.data === document.body);
            });
            onError();
        };
        break;



    // run node js-env code - function
    case 'node':
        // init tests
        local.testCase_ajax_cache = function (options, onError) {
        /*
         * this function will test ajax's cache handling-behavior
         */
            options = {};
            local.utility2.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    // test http GET handling-behavior
                    local.utility2.ajax({
                        url: 'assets.hello'
                    }, options.onNext);
                    break;
                case 2:
                    // validate responseText
                    local.utility2.assertJsonEqual(data.responseText, 'hello');
                    // test http GET 304 cache handling-behavior
                    local.utility2.ajax({
                        headers: {
                            'If-Modified-Since': new Date(Date.now() + 0xffff).toGMTString()
                        },
                        url: 'assets.hello'
                    }, options.onNext);
                    break;
                case 3:
                    // validate statusCode
                    local.utility2.assertJsonEqual(data.statusCode, 304);
                    options.onNext();
                    break;
                default:
                    onError(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_build_app = function (options, onError) {
        /*
         * this function will test build's app handling-behavior
         */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            options = {};
            options = [{
                file: '/assets.' + local.utility2.envDict.npm_package_name + '.css',
                url: '/assets.' + local.utility2.envDict.npm_package_name + '.css'
            }, {
                file: '/assets.' + local.utility2.envDict.npm_package_name + '.js',
                url: '/assets.' + local.utility2.envDict.npm_package_name + '.js'
            }, {
                file: '/assets.' + local.utility2.envDict.npm_package_name + '.rollup.js',
                url: '/assets.' + local.utility2.envDict.npm_package_name + '.rollup.js'
            }, {
                file: '/assets.' + local.utility2.envDict.npm_package_name + '.min.js',
                transform: function (data) {
                    return local.utility2.uglifyIfProduction(
                        local.utility2.bufferToString(data)
                    );
                },
                url: '/assets.' + local.utility2.envDict.npm_package_name + '.js'
            }, {
                file: '/assets.app.js',
                url: '/assets.app.js'
            }, {
                file: '/assets.app.min.js',
                url: '/assets.app.min.js'
            }, {
                file: '/assets.example.js',
                url: '/assets.example.js'
            }, {
                file: '/assets.hello',
                url: '/assets.hello'
            }, {
                file: '/assets.script-only.html',
                url: '/assets.script-only.html'
            }, {
                file: '/assets.test.js',
                url: '/assets.test.js'
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
                file: '/assets.utility2.lib.sjcl.js',
                url: '/assets.utility2.lib.sjcl.js'
            }, {
                file: '/assets.utility2.lib.uglifyjs.js',
                url: '/assets.utility2.lib.uglifyjs.js'
            }, {
                file: '/index.html',
                url: '/index.html'
            }, {
                file: '/package.json',
                url: '/package.json'
            }];
            options.forEach(function (options) {
                onParallel.counter += 1;
                local.utility2.ajax(options, function (error, xhr) {
                    onParallel.counter += 1;
                    // validate no error occurred
                    onParallel(error);
                    switch (local.path.extname(options.file)) {
                    case '.css':
                    case '.js':
                    case '.json':
                        local.utility2.jslintAndPrintConditional(
                            xhr.responseText,
                            options.file
                        );
                        // validate no error occurred
                        local.utility2.assert(
                            !local.utility2.jslint.errorText,
                            local.utility2.jslint.errorText
                        );
                        break;
                    }
                    local.utility2.fsWriteFileWithMkdirp(
                        local.utility2.envDict.npm_config_dir_build + '/app' + options.file,
                        (options.transform || local.utility2.echo)(xhr.response),
                        onParallel
                    );
                });
            });
            onParallel();
        };

        local.testCase_build_doc = function (options, onError) {
        /*
         * this function will test build's doc handling-behavior
         */
            options = {};
            local.utility2.onNext(options, function (error) {
                switch (options.modeNext) {
                case 1:
                    options.moduleDict = {
                        utility2: {
                            exampleList: [],
                            exports: local.utility2
                        },
                        'utility2.Blob': {
                            exampleList: [],
                            exports: local.utility2.Blob
                        },
                        'utility2.Blob.prototype': {
                            exampleList: [],
                            exports: local.utility2.Blob.prototype
                        },
                        'utility2.FormData': {
                            exampleList: [],
                            exports: local.utility2.FormData
                        },
                        'utility2.FormData.prototype': {
                            exampleList: [],
                            exports: local.utility2.FormData.prototype
                        },
                        'utility2.istanbul': {
                            exampleList: ['lib.istanbul.js'],
                            exports: local.utility2.istanbul
                        },
                        'utility2.jslint': {
                            exampleList: ['lib.jslint.js'],
                            exports: local.utility2.jslint
                        },
                        'utility2.db': {
                            exampleList: ['lib.db.js'],
                            exports: local.utility2.db
                        },
                        'utility2.db._DbIndex.prototype': {
                            exampleList: ['lib.db.js'],
                            exports: local.utility2.db._DbIndex.prototype
                        },
                        'utility2.db._DbTable.prototype': {
                            exampleList: ['lib.db.js'],
                            exports: local.utility2.db._DbTable.prototype
                        },
                        'utility2.db._DbTree.prototype': {
                            exampleList: ['lib.db.js'],
                            exports: local.utility2.db._DbTree.prototype
                        },
                        'utility2.sjcl': {
                            exampleList: ['lib.sjcl.js'],
                            exports: local.utility2.sjcl
                        },
                        'utility2.uglifyjs': {
                            exampleList: ['lib.uglifyjs.js'],
                            exports: local.utility2.uglifyjs
                        }
                    };
                    Object.keys(options.moduleDict).forEach(function (key) {
                        options.moduleDict[key].example =
                            options.moduleDict[key].exampleList
                            .concat([
                                'README.md',
                                'test.js',
                                'index.js'
                            ])
                            .map(function (file) {
                                return '\n\n\n\n\n\n\n\n' +
                                    local.fs.readFileSync(file, 'utf8') +
                                    '\n\n\n\n\n\n\n\n';
                            }).join('');
                    });
                    // create doc.api.html
                    local.utility2.fsWriteFileWithMkdirp(
                        local.utility2.envDict.npm_config_dir_build + '/doc.api.html',
                        local.utility2.docApiCreate(options),
                        options.onNext
                    );
                    break;
                case 2:
                    local.utility2.browserTest({
                        modeBrowserTest: 'screenCapture',
                        url: 'file://' + local.utility2.envDict.npm_config_dir_build +
                            '/doc.api.html'
                    }, options.onNext);
                    break;
                default:
                    onError(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_fsWriteFileWithMkdirp_default = function (options, onError) {
        /*
         * this function will test fsWriteFileWithMkdirp's default handling-behavior
         */
            options = {};
            local.utility2.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    options.dir = local.utility2.envDict.npm_config_dir_tmp +
                        '/testCase_fsWriteFileWithMkdirp_default';
                    // cleanup dir
                    local.utility2.fsRmrSync(options.dir);
                    // validate no dir exists
                    local.utility2.assert(!local.fs.existsSync(options.dir), options.dir);
                    options.onNext();
                    break;
                case 2:
                    // test fsWriteFileWithMkdirp with mkdirp handling-behavior
                    options.file = options.dir + '/aa/bb';
                    local.utility2.fsWriteFileWithMkdirp(
                        options.file,
                        'hello1',
                        options.onNext
                    );
                    break;
                case 3:
                    // validate data
                    data = local.fs.readFileSync(options.file, 'utf8');
                    local.utility2.assertJsonEqual(data, 'hello1');
                    options.onNext();
                    break;
                case 4:
                    // test fsWriteFileWithMkdirp with no mkdirp handling-behavior
                    options.file = options.dir + '/aa/bb';
                    local.utility2.fsWriteFileWithMkdirp(
                        options.file,
                        'hello2',
                        options.onNext
                    );
                    break;
                case 5:
                    // validate data
                    data = local.fs.readFileSync(options.file, 'utf8');
                    local.utility2.assertJsonEqual(data, 'hello2');
                    options.onNext();
                    break;
                case 6:
                    // test error handling-behavior
                    options.file = options.dir + '/aa/bb/cc';
                    local.utility2.fsWriteFileWithMkdirp(
                        options.file,
                        'hello',
                        function (error) {
                            // validate error occurred
                            local.utility2.assert(error, error);
                            options.onNext();
                        }
                    );
                    break;
                case 7:
                    // cleanup dir
                    local.utility2.fsRmrSync(options.dir);
                    // validate no dir exists
                    local.utility2.assert(!local.fs.existsSync(options.dir), options.dir);
                    options.onNext();
                    break;
                default:
                    onError(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_onFileModifiedRestart_watchFile = function (options, onError) {
        /*
         * this function will test onFileModifiedRestart's watchFile handling-behavior
         */
            var onParallel;
            options = {};
            options.file = __filename;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            local.fs.stat(options.file, function (error, stat) {
                // test default watchFile handling-behavior
                onParallel.counter += 1;
                local.fs.utimes(options.file, stat.atime, new Date(), onParallel);
                // test nop watchFile handling-behavior
                onParallel.counter += 1;
                setTimeout(function () {
                    local.fs.utimes(options.file, stat.atime, stat.mtime, onParallel);
                // coverage-hack - use 1500 ms to cover setInterval
                }, 1500);
                onParallel(error);
            });
        };

        local.testCase_processSpawnWithTimeout_default = function (options, onError) {
        /*
         * this function will test processSpawnWithTimeout's default handling-behavior
         */
            var onParallel;
            options = {};
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            // test default handling-behavior
            onParallel.counter += 1;
            local.utility2.processSpawnWithTimeout('ls')
                .on('error', onParallel)
                .on('exit', function (exitCode, signal) {
                    // validate exitCode
                    local.utility2.assertJsonEqual(exitCode, 0);
                    // validate signal
                    local.utility2.assertJsonEqual(signal, null);
                    onParallel();
                });
            // test timeout handling-behavior
            onParallel.counter += 1;
            local.utility2.testMock([
                [local.utility2, { timeoutDefault: 1000 }]
            ], function (onError) {
                options.childProcess = local.utility2.processSpawnWithTimeout('sleep', [5000]);
                onError();
            }, local.utility2.nop);
            options.childProcess
                .on('error', onParallel)
                .on('exit', function (exitCode, signal) {
                    // validate exitCode
                    local.utility2.assertJsonEqual(exitCode, null);
                    // validate signal
                    local.utility2.assertJsonEqual(signal, 'SIGKILL');
                    onParallel();
                });
            onParallel();
        };

        local.testCase_requireExampleJsFromReadme_rollup = function (options, onError) {
        /*
         * this function will test requireExampleJsFromReadme's rollup handling-behavior
         */
            options = [
                [local.utility2, { assetsDict: {} }]
            ];
            options.module = {
                exports: { templateIndexHtml: '' },
                isRollup: true
            };
            local.utility2.testMock(options, function (onError) {
                options.data = local.utility2.requireExampleJsFromReadme(options);
                // validate data
                local.utility2.assertJsonEqual(options.data, {
                    exports: { templateIndexHtml: '' },
                    isRollup: true
                });
                onError();
            }, onError);
        };

        local.testCase_replStart_default = function (options, onError) {
        /*
         * this function will test replStart's default handling-behavior
         */
            /*jslint evil: true*/
            local.utility2.replStart();
            // coverage-hack - test replStart's muliple-call handling-behavior
            local.utility2.replStart();
            options = [
                // suppress console.error
                [console, { error: local.utility2.nop }],
                [local.child_process, { spawn: function () {
                    return { on: function (event, callback) {
                        // jslint-hack
                        local.utility2.nop(event);
                        callback();
                    } };
                } }],
                // suppress process.stdout
                [process.stdout, { write: local.utility2.nop }]
            ];
            local.utility2.testMock(options, function (onError) {
                [
                    // test shell handling-behavior
                    '$ :\n',
                    // test git diff handling-behavior
                    '$ git diff\n',
                    // test git log handling-behavior
                    '$ git log\n',
                    // test grep handling-behavior
                    'grep \\bhello\\b\n',
                    // test keys handling-behavior
                    'keys {}\n',
                    // test print handling-behavior
                    'print\n',
                    // test error handling-behavior
                    'undefined()\n'
                ].forEach(function (script) {
                    local.global.utility2_serverRepl1.eval(
                        script,
                        null,
                        'repl',
                        local.utility2.nop
                    );
                });
                // coverage-hack
                local.global.utility2_serverRepl1.nop();
                local.global.utility2_serverRepl1.onError(local.utility2.errorDefault);
                onError();
            }, onError);
        };

        local.testCase_replStart_tcp = function (options, onError) {
        /*
         * this function will test replStart's tcp handling-behavior
         */
            options = {};
            options.data = '';
            options.input = Math.random();
            options.socket = local.net.createConnection(local.utility2.envDict.PORT_REPL);
            options.socket.on('data', function (data) {
            /*
             * this function will concat data to options.data
             */
                options.data += data;
            });
            options.socket.setEncoding('utf8');
            options.socket.on('end', function () {
                // validate data
                local.utility2.assert(
                    options.data.indexOf(options.input) >= 0,
                    JSON.stringify([options.data, options.input])
                );
                onError();
            });
            options.socket.write(options.input + '\n');
            // test error-handling behavior
            options.socket.end('undefined()\n');
        };

        local.testCase_serverRespondTimeoutDefault_default = function (options, onError) {
        /*
         * this function will test serverRespondTimeoutDefault's default handling-behavior
         */
            options = [
                [local.utility2, { timeoutDefault: 1000 }]
            ];
            local.utility2.testMock(options, function (onError) {
                local.utility2.serverRespondTimeoutDefault(
                    {
                        // test default onTimeout handling-behavior
                        onTimeout: null,
                        url: ''
                    },
                    { end: local.utility2.nop, headersSent: true, on: local.utility2.nop },
                    // test default timeout handling-behavior
                    null
                );
                onError();
            }, onError);
        };

        local.testCase_webpage_error = function (options, onError) {
        /*
         * this function will test the webpage's error handling-behavior
         */
            options = {
                modeCoverageMerge: true,
                // test browserTest's modeSilent handling-behavior
                modeSilent: true,
                modeTestIgnore: true,
                timeoutDefault: local.utility2.timeoutDefault - 1000,
                url: local.utility2.serverLocalHost +
                    // test script-only handling-behavior
                    '/assets.script-only.html' +
                    // test electron-callback handling-behavior
                    '?modeTest=1&' +
                    // test specific testCase handling-behavior
                    // test testRun's failure handling-behavior
                    'modeTestCase=_testCase_testRun_failure&' +
                    // test timeExit handling-behavior
                    'timeExit={{timeExit}}'
            };
            local.utility2.browserTest(options, function (error) {
                // validate error occurred
                local.utility2.assert(error, error);
                onError();
            });
        };

        local.testCase_testReportCreate_default = function (options, onError) {
        /*
         * this function will test testReport's default handling-behavior
         */
            options = [
                // suppress console.log
                [console, { log: local.utility2.nop }],
                [local.utility2, { exit: local.utility2.nop }]
            ];
            local.utility2.testMock(options, function (onError) {
                // test exit handling-behavior
                local.utility2.testReportCreate(local.utility2.testReport);
                onError();
            }, onError);
        };

        local.testCase_indexJs_standalone = function (options, onError) {
        /*
         * this function will test index.js's standalone handling-behavior
         */
            options = {};
            options.data = local.fs.readFileSync('./index.js', 'utf8').replace(
                '/* istanbul instrument in package utility2 */',
                ''
            );
            local.fs.writeFileSync('./tmp/index.js', options.data);
            require('./tmp/index.js');
            onError();
        };
        break;
    }



    // run shared js-env code - post-init
    (function () {
        // init test-middleware
        local.middleware.middlewareList.push(function (request, response, nextMiddleware) {
        /*
         * this function will run the test-middleware
         */
            switch (request.urlParsed.pathname) {
            // test http POST handling-behavior
            case '/test.echo':
                // test response header handling-behavior
                local.utility2.serverRespondHeadSet(request, response, null, {
                    'X-Response-Header-Test': 'bye'
                });
                local.utility2.serverRespondEcho(request, response);
                break;
            // test http POST handling-behavior
            case '/test.body':
                // test request-body-read handling-behavior
                local.utility2.middlewareBodyRead(request, response, function () {
                    // test multiple request-body-read handling-behavior
                    local.utility2.middlewareBodyRead(request, response, function () {
                        response.write(request.bodyRaw);
                        response.end();
                    });
                });
                break;
            // test 500-internal-server-error handling-behavior
            case '/test.error-500':
                // test multiple-callback serverRespondHeadSet handling-behavior
                local.utility2.serverRespondHeadSet(request, response, null, {});
                nextMiddleware(local.utility2.errorDefault);
                // test multiple-callback error handling-behavior
                nextMiddleware(local.utility2.errorDefault);
                // test onErrorDefault handling-behavior
                local.utility2.testMock([
                    // suppress console.error
                    [console, { error: local.utility2.nop }]
                ], function (onError) {
                    var error;
                    error = new Error('error');
                    error.statusCode = 500;
                    local.middlewareError(error, request, response);
                    onError();
                }, local.utility2.nop);
                break;
            // test undefined-error handling-behavior
            case '/test.error-undefined':
                local.utility2.serverRespondDefault(request, response, 999);
                break;
            // test timeout handling-behavior
            case '/test.timeout':
                setTimeout(function () {
                    response.end();
                }, 2000);
                break;
            // serve file
            default:
                local.utility2.middlewareFileServer(request, response, nextMiddleware);
            }
        });
        // init serverLocal
        local.utility2.serverLocalUrlTest = function (url) {
            url = local.utility2.urlParse(url).pathname;
            return local.modeJs === 'browser' && url.indexOf('/test.') === 0;
        };
    }());
    switch (local.modeJs) {



    /* istanbul ignore next */
    // run node js-env code - post-init
    case 'node':
        // init repl debugger
        local.utility2.replStart();
        // run the cli
        if (module !== require.main || module.isRollup) {
            break;
        }
        // init assets
        local.utility2.assetsDict['/assets.app.js'] = [
            'header',
            '/assets.utility2.rollup.js',
            'local.utility2.stateInit',
            '/assets.example.js',
            '/assets.test.js'
        ].map(function (key) {
            switch (key) {
/* jslint-ignore-begin */
case 'header':
return '\
/*\n\
assets.app.js\n\
\n' + local.utility2.envDict.npm_package_description + '\n\
\n\
instruction\n\
    1. save this script as assets.app.js\n\
    2. run the shell command:\n\
        $ PORT=8081 node assets.app.js\n\
    3. open a browser to http://localhost:8081\n\
    4. edit or paste script in browser to cover and test\n\
*/\n\
';
/* jslint-ignore-end */
            case 'local.utility2.stateInit':
                return '// ' + key + '\n' +
                    local.utility2.assetsDict['/assets.utility2.rollup.content.js']
                    .replace(
                        '/* utility2.rollup.js content */',
                        key + '(' + JSON.stringify(
                            local.utility2.middlewareJsonpStateInit({ stateInit: true })
                        ) + ');'
                    );
            default:
                return '// ' + key + '\n' + local.utility2.assetsDict[key];
            }
        }).join('\n\n\n\n');
        local.utility2.assetsDict['/assets.app.min.js'] =
            local.utility2.uglifyIfProduction(local.utility2.assetsDict['/assets.app.js']);
        local.utility2.assetsDict['/assets.script-only.html'] = '<h1>script-only test</h1>\n' +
                '<script src="assets.utility2.js"></script>\n' +
                '<script>window.utility2.onReadyBefore.counter += 1;</script>\n' +
                '<script src="assets.example.js"></script>\n' +
                '<script src="assets.test.js"></script>\n' +
                '<script>window.utility2.onReadyBefore();</script>\n';
        if (process.argv[2]) {
            // start with coverage
            if (local.utility2.envDict.npm_config_mode_coverage) {
                process.argv.splice(1, 1, __dirname + '/lib.istanbul.js', 'cover');
                local.utility2.istanbul.cliRun({ runMain: true });
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
