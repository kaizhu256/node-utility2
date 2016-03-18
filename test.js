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
        switch (local.modeJs) {
        // re-init local from window.local
        case 'browser':
            local = window.local;
            break;
        // re-init local from example.js
        case 'node':
            local.script = require('fs').readFileSync(__dirname + '/README.md', 'utf8')
                // support syntax-highlighting
                .replace((/[\S\s]+?\n.*?example.js\s*?```\w*?\n/), function (match0) {
                    // preserve lineno
                    return match0.replace((/.+/g), '');
                })
                .replace((/\n```[\S\s]+/), '')
                // disable mock package.json env
                .replace(/(process.env.npm_package_\w+ = )/g, '// $1')
                // alias require('$npm_package_name') to require('index.js');
                .replace("require('utility2')", 'module.utility2')
                .replace(
                    "require('" + process.env.npm_package_name + "')",
                    "require('./index.js')"
                )
                // coverage-hack - do not cover example.js
                .replace('local.utility2.istanbulInstrumentSync', 'local.utility2.echo');
            local.utility2 = require('./index.js');
            // require example.js
            local = local.utility2.requireFromScript(
                __dirname + '/example.js',
                local.utility2.jslintAndPrint(local.script, __dirname + '/example.js')
                    .replace(
                        "local.fs.readFileSync(__dirname + '/example.js', 'utf8')",
                        JSON.stringify(local.script)
                    )
            );
            // coverage-hack - cover requireFromScript's cache handling behavior
            local.utility2.requireFromScript(__dirname + '/example.js');
            // coverage-hack - cover istanbul
            delete require.cache[__dirname + '/lib.istanbul.js'];
            local.utility2.istanbul2 = require('./lib.istanbul.js');
            local.utility2.istanbul.coverageReportCreate =
                local.utility2.istanbulCoverageReportCreate =
                local.utility2.istanbul2.coverageReportCreate;
            local.utility2.istanbul2.codeDict = local.utility2.istanbul.codeDict;
            break;
        }
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
            options = { url: '/test.undefined' };
            local.utility2.ajax(options, onError);
            // test failure from thrown error handling-behavior
            throw local.utility2.errorDefault;
        };

        local.testCase_ajax_abort = function (options, onError) {
        /*
         * this function will test ajax's abort handling-behavior
         */
            options = local.utility2.ajax({ url: '/test.timeout' }, function (error) {
                local.utility2.tryCatchOnError(function () {
                    // validate error occurred
                    local.utility2.assert(error, error);
                    onError();
                }, onError);
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
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error && xhr.status === 200, [error, xhr.status]);
                    // validate responseText
                    local.utility2.assert((/"name": "utility2",/)
                        .test(xhr.responseText), xhr.responseText);
                    onError();
                }, onError);
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
                // test JSON.parse error
                modeJson: true,
                url: '/assets.hello'
            }, {
                // test 404-not-found-error handling-behavior
                url: '/test.error-404'
            }, {
                // test 500-internal-server-error handling-behavior
                url: '/test.error-500'
            }, {
                // test undefined-error handling-behavior
                url: '/test.error-undefined'
            }, {
                // test timeout handling-behavior
                timeout: 1,
                url: '/test.timeout'
            }, {
                // test undefined https host handling-behavior
                timeout: 1,
                url: 'https://' + local.utility2.uuidTimeCreate() + '.com'
            }].forEach(function (_) {
                options = _;
                onParallel.counter += 1;
                local.utility2.ajax(options, function (error) {
                    local.utility2.tryCatchOnError(function () {
                        // validate error occurred
                        local.utility2.assert(error, error);
                        onParallel();
                    }, onError);
                });
            });
            onParallel();
        };

        local.testCase_ajax_json = function (options, onError) {
        /*
         * this function will test ajax's json handling-behavior
         */
            options = { modeJson: true, url: '/test.json' };
            local.utility2.ajax(options, function (error, xhr) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error && xhr.status === 200, [error, xhr.status]);
                    // validate responseJSON
                    local.utility2.assert(xhr.responseJSON === 'hello', xhr.responseJSON);
                    onError();
                }, onError);
            });
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
            ['', 'blob', 'response', 'text'].forEach(function (responseType) {
                local.utility2.ajax({
                    data: responseType === 'blob' && local.modeJs === 'node'
                        // test blob post handling-behavior
                        ? new Buffer('hello')
                        // test string post handling-behavior
                        : 'hello',
                    method: 'POST',
                    // test nodejs response handling-behavior
                    responseType: responseType === 'response' && local.modeJs === 'node'
                        ? responseType
                        : '',
                    url: '/test.body'
                }, function (error, xhr) {
                    local.utility2.tryCatchOnError(function () {
                        // validate no error occurred
                        local.utility2.assert(
                            !error && xhr.status === 200,
                            [error, xhr.status]
                        );
                        // validate response
                        switch (responseType) {
                        case 'blob':
                        case 'response':
                            // cleanup response
                            local.utility2.requestResponseCleanup(null, xhr.response);
                            // validate response
                            options.result = xhr.response;
                            local.utility2.assert(options.result, options);
                            break;
                        default:
                            options.result = xhr.responseText;
                            local.utility2.assert(options.result === 'hello', options);
                        }
                        onParallel();
                    }, onError);
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
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error && xhr.status === 200, [error, xhr.status]);
                    // validate response
                    options.data = xhr.responseText;
                    local.utility2.assert((/\r\nhello$/).test(options.data), options.data);
                    local.utility2.assert((/\r\nx-request-header-test: hello\r\n/)
                        .test(options.data), options.data);
                    // validate responseHeaders
                    options.data = xhr.getAllResponseHeaders();
                    local.utility2.assert(
                        (/^X-Response-Header-Test: bye\r\n/im).test(options.data),
                        options.data
                    );
                    options.data = xhr.getResponseHeader('x-response-header-test');
                    local.utility2.assert(options.data === 'bye', options.data);
                    options.data = xhr.getResponseHeader('undefined');
                    local.utility2.assert(options.data === null, options.data);
                    // validate statusCode
                    local.utility2.assert(xhr.statusCode === 200, xhr.statusCode);
                    onParallel();
                }, onParallel);
            });
            onParallel();
        };

        local.testCase_assert_default = function (options, onError) {
        /*
         * this function will test assert's default handling-behavior
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
                local.utility2.assert(error.message === '', error.message);
            });
            // test assertion failed with string message
            local.utility2.tryCatchOnError(function () {
                local.utility2.assert(false, 'hello');
            }, function (error) {
                // validate error occurred
                local.utility2.assert(error, error);
                // validate error-message
                local.utility2.assert(error.message === 'hello', error.message);
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
                options = { aa: 1 };
                local.utility2.assert(false, options);
            }, function (error) {
                // validate error occurred
                local.utility2.assert(error, error);
                // validate error-message
                local.utility2.assert(error.message === '{"aa":1}', error.message);
            });
            onError();
        };

        local.testCase_bcrypt_default = function (options, onError) {
        /*
         * this function will test bcrypt's default handling-behavior
         */
            options = {};
            // test null-case handling-behavior
            options.result = local.utility2.bcryptPasswordValidate();
            local.utility2.assert(options.result === false, options);
            // test default handling-behavior
            options.password = 'hello';
            options.hash = local.utility2.bcryptHashCreate(options.password, 8);
            options.result =
                local.utility2.bcryptPasswordValidate(options.password, options.hash);
            local.utility2.assert(options.result, options);
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
                options.result = local.utility2.bufferIndexOfSubBuffer(
                    new local.utility2.StringView(options.buffer).rawData,
                    new local.utility2.StringView(options.subBuffer).rawData,
                    options.fromIndex
                );
                local.utility2.assert(options.result === options.validate, options);
            });
            onError();
        };

        local.testCase_cryptojs_default = function (options, onError) {
        /*
         * this function will test cryptojs's default handling-behavior
         */
            options = {};
            // test cryptojsCipherAes256Decrypt's handling-behavior
            options.data = local.utility2.cryptojsCipherAes256Decrypt(
                // test cryptojsCipherAes256Encrypt's handling-behavior
                local.utility2.cryptojsCipherAes256Encrypt('hello', 'secret'),
                'secret'
            );
            local.utility2.assert(options.data === 'hello', options.data);
            // test cryptojsHashHmacSha256Create handling-behavior
            options.data = local.utility2.cryptojsHashHmacSha256Create(
                'hello',
                'secret'
            );
            local.utility2.assert(options.data ===
                'iKqz7ejTrflNJquQ07r9SiCDBww7zOnAFO4EpEOEfAs=',
                options.data);
            // test cryptojsHashSha256Create handling-behavior
            options.data = local.utility2.cryptojsHashSha256Create('hello');
            local.utility2.assert(options.data ===
                'LPJNul+wow4m6DsqxbninhsWHlwfp0JecwQzYpOLmCQ=',
                options.data);
            onError();
        };

        local.testCase_debug_print_default = function (options, onError) {
        /*
         * this function will test debug_print's default handling-behavior
         */
            options = {};
            local.utility2.testMock([
                // suppress console.error
                [console, { error: function (arg) {
                    options.data += (arg || '') + '\n';
                } }]
            ], function (onError) {
                options.data = '';
                local.global['debug_printCallback'.replace('_p', 'P')](
                    local.utility2.echo
                )('hello');
                // validate data
                local.utility2.assert(
                    options.data === '\n\n\n' + 'debug_print'.replace('_p', 'P') +
                        '\nhello\n\n',
                    options.data
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
                example: local.utility2.testRun.toString().replace((/;/g), ';\n    '),
                moduleDict: {
                    // test module.exports is a function handling-behavior
                    function: { exports: local.utility2.nop.bind(null) },
                    // test no aliasList handling-behavior
                    noAliasList: { exports: local.utility2 },
                    // test aliasList handling-behavior
                    utility2: { aliasList: ['', '.', 'undefined'], exports: local.utility2 }
                }
            });
            // validate data
            local.utility2.assert(new RegExp('\n' +
                ' *?<h2>\n' +
                ' *?<a href="#element.utility2.nop" id="element.utility2.nop">\n' +
                ' *?function <span class="docApiSignatureSpan">utility2.</span>nop\n' +
                ' *?<span class="docApiSignatureSpan">\\(\\)</span>\n' +
                ' *?</a>\n' +
                ' *?</h2>\n' +
                ' *?<ul>\n' +
                ' *?<li>description and source code<pre class="docApiCodePre">')
                .test(options.data), options.data);
            local.utility2.assert(new RegExp('\n' +
                ' *?<span class="docApiSignatureSpan">' +
                    'object <span class="docApiSignatureSpan">noAliasList.</span>errorDefault' +
                    '</span>\n')
                .test(options.data), options.data);
            onError();
        };

        local.testCase_echo_default = function (options, onError) {
        /*
         * this function will test echo's default handling-behavior
         */
            // jslint-hack
            local.utility2.nop(options);
            local.utility2.assert(local.utility2.echo('hello') === 'hello');
            onError();
        };

        local.testCase_es6_generator = function (options, onError) {
        /*
         * this function will test es6's generator handling-behavior
         */
            options = {};
            options.generatorCreate = function* () {
                var result;
                result = yield arguments;
                yield result;
                yield this;
            };
            options.generator = options.generatorCreate(1);
            options.data = local.utility2.jsonStringifyOrdered(options.generator.next(2));
            local.utility2.assert(options.data ===
                '{"done":false,"value":{"0":1}}', options.data);
            options.data = local.utility2.jsonStringifyOrdered(options.generator.next(2));
            local.utility2.assert(options.data ===
                '{"done":false,"value":2}', options.data);
            options.data = local.utility2.jsonStringifyOrdered(options.generator.next(2));
            local.utility2.assert(options.data ===
                '{"done":false,"value":{"data":"{\\"done\\":false,\\"value\\":2}",' +
                '"generator":{}}}', options.data);
            options.data = local.utility2.jsonStringifyOrdered(options.generator.next(2));
            local.utility2.assert(options.data ===
                '{"done":true}', options.data);
            onError();
        };

        local.testCase_exit_default = function (options, onError) {
        /*
         * this function will exit's default handling-behavior
         */
            options = [
                // suppress console.log
                [console, { log: local.utility2.nop }],
                // test modeTest === 'consoleLogResult' handling-behavior
                [local.utility2, { modeTest: 'consoleLogResult' }]
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
            local.utility2.assert(options.data === true, options.data);
            options.data = local.utility2.isNullOrUndefined(undefined);
            // validate data
            local.utility2.assert(options.data === true, options.data);
            options.data = local.utility2.isNullOrUndefined(false);
            // validate data
            local.utility2.assert(options.data === false, options.data);
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
                local.utility2.istanbulCoverageReportCreate({});
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
                        eval(local.utility2.istanbulInstrumentSync(
                            // test skip handling-behavior
                            'null',
                            dir + '/' + path,
                            '__coverage__mock'
                        ));
                    });
                });
                // create report with covered path
                local.utility2.istanbulCoverageReportCreate(options);
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
                    eval(local.utility2.istanbulInstrumentSync(
                        content,
                        'aa.js',
                        '__coverage__mock'
                    ));
                    // create report with covered content
                    local.utility2.istanbulCoverageReportCreate(options);
                });
                onError();
            }, onError);
        };

        local.testCase_istanbulInstrumentSync_default = function (options, onError) {
        /*
         * this function will test istanbulInstrumentSync's default handling-behavior
         */
            var data;
            // jslint-hack
            local.utility2.nop(options);
            data = local.utility2.istanbulInstrumentSync('1', 'test.js');
            // validate data
            local.utility2.assert(data.indexOf('.s[\'1\']++;1;\n') >= 0, data);
            onError();
        };

        local.testCase_jslintAndPrint_default = function (options, onError) {
        /*
         * this function will test jslintAndPrint's default handling-behavior
         */
            options = [
                // suppress console.error
                [console, { error: local.utility2.nop }]
            ];
            local.utility2.testMock(options, function (onError) {
                // test empty script handling-behavior
                local.utility2.jslintAndPrint('', 'empty.css');
                // validate no error occurred
                local.utility2.assert(
                    !local.utility2.jslint.errorText,
                    local.utility2.jslint.errorText
                );
                // test csslint passed handling-behavior
                local.utility2.jslintAndPrint('body { font: normal; }', 'passed.css');
                // validate no error occurred
                local.utility2.assert(
                    !local.utility2.jslint.errorText,
                    local.utility2.jslint.errorText
                );
                // test csslint failed handling-behavior
                local.utility2.jslintAndPrint('syntax error', 'failed.css');
                // validate error occurred
                local.utility2.assert(
                    local.utility2.jslint.errorText,
                    local.utility2.jslint.errorText
                );
                // test jslint passed handling-behavior
                local.utility2.jslintAndPrint('{}', 'passed.js');
                // validate no error occurred
                local.utility2.assert(
                    !local.utility2.jslint.errorText,
                    local.utility2.jslint.errorText
                );
                // test jslint failed handling-behavior
                local.utility2.jslintAndPrint('syntax error', 'failed.js');
                // validate error occurred
                local.utility2.assert(
                    local.utility2.jslint.errorText,
                    local.utility2.jslint.errorText
                );
                // test /* jslint-ignore-begin */ ... /* jslint-ignore-end */
                // handling-behavior
                local.utility2.jslintAndPrint('/* jslint-ignore-begin */\n' +
                    'syntax error\n' +
                    '/* jslint-ignore-end */\n', 'passed.js');
                // validate no error occurred
                local.utility2.assert(
                    !local.utility2.jslint.errorText,
                    local.utility2.jslint.errorText
                );
                onError();
            }, onError);
        };

        local.testCase_jsonCopy_default = function (options, onError) {
        /*
         * this function will test jsonCopy's default handling-behavior
         */
            // jslint-hack
            local.utility2.nop(options);
            // test various data-type handling-behavior
            [undefined, null, false, true, 0, 1, 1.5, 'a'].forEach(function (data) {
                local.utility2.assert(
                    local.utility2.jsonCopy(data) === data,
                    [local.utility2.jsonCopy(data), data]
                );
            });
            onError();
        };

        local.testCase_jsonStringifyOrdered_default = function (options, onError) {
        /*
         * this function will test jsonStringifyOrdered's default handling-behavior
         */
            // test data-type handling-behavior
            [undefined, null, false, true, 0, 1, 1.5, 'a', {}, []].forEach(function (data) {
                local.utility2.assert(
                    local.utility2.jsonStringifyOrdered(data) === JSON.stringify(data),
                    [local.utility2.jsonStringifyOrdered(data), JSON.stringify(data)]
                );
            });
            // test data-ordering handling-behavior
            options = {
                // test nested dict handling-behavior
                ff: { hh: 2, gg: 1},
                // test nested array handling-behavior
                ee: [undefined],
                dd: local.utility2.nop,
                cc: undefined,
                bb: null,
                aa: 1
            };
            // test circular-reference handling-behavior
            options.zz = options;
            options = local.utility2.jsonStringifyOrdered(options);
            local.utility2.assert(
                options === '{"aa":1,"bb":null,"ee":[null],"ff":{"gg":1,"hh":2}}',
                options
            );
            onError();
        };

        local.testCase_jwtHs256Xxx_default = function (options, onError) {
        /*
         * this function will test jwtHs256Xxx's default handling-behavior
         */
            options = {};
            options.payload = { sub: '1234567890', name: 'John Doe', admin: true };
            options.token = local.utility2.jwtHs256Encode(options.payload, 'secret');
            // validate encoded token
            local.utility2.assert(options.token === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.' +
                'TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ', options.token);
            options.payload = local.utility2.jwtHs256Decode(options.token, 'secret');
            // validate decoded payload
            local.utility2.assert(JSON.stringify(options.payload) ===
                '{"sub":"1234567890","name":"John Doe","admin":true}', options.payload);
            onError();
        };

        local.testCase_listGetElementRandom_default = function (options, onError) {
        /*
         * this function will test listGetRandom's default handling-behavior
         */
            options = {};
            // init list
            options.list = ['aa', 'bb', 'cc'];
            options.elementDict = {};
            // get 100 random elements from list
            for (options.ii = 0; options.ii < 100; options.ii += 1) {
                options.elementDict[local.utility2.listGetElementRandom(options.list)] = true;
            }
            // validate all elements were retrieved from list
            local.utility2.assert(JSON.stringify(Object.keys(options.elementDict).sort()) ===
                JSON.stringify(options.list), options);
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
                local.utility2.assert(options.listShuffled.length ===
                    options.list.length, options);
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
            options = JSON.stringify(local.utility2.objectGetElementFirst(options));
            local.utility2.assert(options === '{"key":"aa","value":1}', options);
            onError();
        };

        local.testCase_objectKeysTypeOf_default = function (options, onError) {
        /*
         * this function will test objectKeysTypeOf's default handling-behavior
         */
            options =
                { aa: true, bb: local.utility2.nop, cc: 0, dd: null, ee: '', ff: undefined };
            options = local.utility2.objectKeysTypeof(options);
            local.utility2.assert(options === 'boolean aa\nfunction bb\n' +
                'number cc\nobject dd\nstring ee\nundefined ff', options);
            onError();
        };

        local.testCase_objectSetDefault_default = function (options, onError) {
        /*
         * this function will test objectSetDefault's default handling-behavior
         */
            // test falsey handling-behavior
            ['', 0, false, null, undefined].forEach(function (aa) {
                ['', 0, false, null, undefined].forEach(function (bb) {
                    local.utility2.assert(local.utility2.objectSetDefault(
                        { data: aa },
                        { data: bb }
                    ).data === (bb === undefined
                        ? aa
                        : bb));
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
            local.utility2.assert(
                local.utility2.jsonStringifyOrdered(options) ===
                    '{"aa":2,"bb":{"cc":1},"cc":{"dd":{}},"dd":[1,1],"ee":[1,1]}',
                options
            );
            // test recursive handling-behavior
            options = local.utility2.objectSetDefault(
                { aa: 0, bb: { cc: 1 }, cc: { dd: {} }, dd: [1, 1], ee: [1, 1] },
                { aa: 2, bb: { dd: 2 }, cc: { dd: { ee: 2 } }, dd: [2, 2], ee: { ff: 2 } },
                // test depth handling-behavior
                2
            );
            // validate options
            local.utility2.assert(
                local.utility2.jsonStringifyOrdered(options) ===
                    '{"aa":2,"bb":{"cc":1,"dd":2},"cc":{"dd":{}},"dd":[1,1],"ee":[1,1]}',
                options
            );
            onError();
        };

        local.testCase_objectSetOverride_default = function (options, onError) {
        /*
         * this function will test objectSetOverride's default handling-behavior
         */
            // test falsey handling-behavior
            ['', 0, false, null, undefined].forEach(function (aa) {
                ['', 0, false, null, undefined].forEach(function (bb) {
                    local.utility2.assert(local.utility2.objectSetOverride(
                        { data: aa },
                        { data: bb }
                    ).data === (bb === undefined
                        ? aa
                        : bb));
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
            options = local.utility2.jsonStringifyOrdered(options);
            local.utility2.assert(options === '{"aa":2,"bb":{"dd":2},"cc":{"ee":2},' +
                '"dd":[2,2],"ee":{"ff":2}}', options);
            // test recursive handling-behavior
            options = local.utility2.objectSetOverride(
                { aa: 1, bb: { cc: 1 }, cc: { dd: 1 }, dd: [1, 1], ee: [1, 1] },
                { aa: 2, bb: { dd: 2 }, cc: { ee: 2 }, dd: [2, 2], ee: { ff: 2 } },
                // test depth handling-behavior
                2
            );
            // validate options
            options = local.utility2.jsonStringifyOrdered(options);
            local.utility2.assert(options === '{"aa":2,"bb":{"cc":1,"dd":2},' +
                '"cc":{"dd":1,"ee":2},"dd":[2,2],"ee":{"ff":2}}', options);
            // test envDict with empty-string handling-behavior
            options = local.utility2.objectSetOverride(
                local.utility2.envDict,
                { 'emptyString': null },
                // test default-depth handling-behavior
                null
            );
            // validate options
            local.utility2.assert(options.emptyString === '', options.emptyString);
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
            options = local.utility2.jsonStringifyOrdered(options);
            local.utility2.assert(
                options === '{"aa":null,"bb":2,"cc":{"dd":4,"ee":[5,6,7],"zz":true},"zz":true}',
                options
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

        local.testCase_onParallel_default = function (options, onError) {
        /*
         * this function will test onParallel's default handling-behavior
         */
            var onParallel, onParallelError;
            // jslint-hack
            local.utility2.nop(options);
            // test onDebug handling-behavior
            onParallel = local.utility2.onParallel(onError, function (error, self) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate self
                    local.utility2.assert(self.counter >= 0, self);
                }, onError);
            });
            onParallel.counter += 1;
            // test multiple-task handling-behavior
            onParallel.counter += 1;
            setTimeout(function () {
                onParallelError = local.utility2.onParallel(function (error) {
                    local.utility2.tryCatchOnError(function () {
                        // validate error occurred
                        local.utility2.assert(error, error);
                        onParallel();
                    }, onParallel);
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
            var timeElapsed;
            // jslint-hack
            local.utility2.nop(options);
            timeElapsed = Date.now();
            local.utility2.onTimeout(function (error) {
                local.utility2.tryCatchOnError(function () {
                    // validate error occurred
                    local.utility2.assert(error, error);
                    // validate error message
                    local.utility2.assert(error.message
                        .indexOf('testCase_onTimeout_errorTimeout') >= 0, error);
                    // save timeElapsed
                    timeElapsed = Date.now() - timeElapsed;
                    // validate timeElapsed passed is greater than timeout
                    local.utility2.assert(timeElapsed >= 1500, timeElapsed);
                    onError();
                }, onError);
            // coverage-hack - use 1500 ms to cover setInterval test-report refresh in browser
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
                    options.timeElapsed < 1000, options.timeElapsed);
                onError();
            });
        };

        local.testCase_taskCallbackAndUpdateCached_default = function (options, onError) {
        /*
         * this function will test taskCallbackAndUpdateCached's default handling-behavior
         */
            var cacheValue, modeNext, onNext, onTask, optionsCopy;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    modeNext += 1;
                    switch (modeNext) {
                    // test no cache handling-behavior
                    case 1:
                        onTask = function (onError) {
                            onError(null, cacheValue);
                        };
                        options = {
                            cacheDict: 'testCase_taskCallbackAndUpdateCached_default',
                            key: 'memory'
                        };
                        // cleanup memory-cache
                        local.utility2.cacheDict[options.cacheDict] = null;
                        cacheValue = 'hello';
                        optionsCopy = {
                            cacheDict: options.cacheDict,
                            key: options.key,
                            // test onCacheWrite handling-behavior
                            onCacheWrite: onNext
                        };
                        local.utility2.taskCallbackAndUpdateCached(optionsCopy, onNext, onTask);
                        break;
                    case 2:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data
                        local.utility2.assert(data === 'hello', data);
                        // validate no cache-hit
                        local.utility2.assert(
                            !optionsCopy.modeCacheHit,
                            optionsCopy.modeCacheHit
                        );
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
                            onCacheWrite: onNext
                        };
                        local.utility2.taskCallbackAndUpdateCached(optionsCopy, onNext, onTask);
                        break;
                    case 4:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data
                        local.utility2.assert(data === 'hello', data);
                        // validate modeCacheHit
                        local.utility2.assert(
                            optionsCopy.modeCacheHit === true,
                            optionsCopy.modeCacheHit
                        );
                        break;
                    // test cache handling-behavior
                    case 5:
                        optionsCopy = {
                            cacheDict: options.cacheDict,
                            key: options.key
                        };
                        local.utility2.taskCallbackAndUpdateCached(optionsCopy, onNext, onTask);
                        break;
                    case 6:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data
                        local.utility2.assert(data === 'bye', data);
                        // validate modeCacheHit
                        local.utility2.assert(
                            optionsCopy.modeCacheHit === true,
                            optionsCopy.modeCacheHit
                        );
                        onNext();
                        break;
                    // test error handling-behavior
                    case 7:
                        optionsCopy = {
                            cacheDict: options.cacheDict,
                            key: options.key + 'Error'
                        };
                        local.utility2.taskCallbackAndUpdateCached(
                            optionsCopy,
                            onNext,
                            function (onError) {
                                onError(local.utility2.errorDefault);
                            }
                        );
                        break;
                    case 8:
                        // validate error occurred
                        local.utility2.assert(error, error);
                        onNext();
                        break;
                    default:
                        onError(error);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_taskUpsert_multipleCallback = function (options, onError) {
        /*
         * this function will test taskUpsert's multiple-callback handling-behavior
         */
            options = { counter: 0, key: 'testCase_taskUpsert_multiCallback' };
            local.utility2.taskCallbackAdd(options, function () {
                options.counter += 1;
            });
            local.utility2.taskUpsert(options, function (onError) {
                // test multiple-callback handling-behavior
                onError();
                onError();
            });
            // validate counter incremented once
            local.utility2.assert(options.counter === 1, options);
            onError();
        };

        local.testCase_taskUpsert_upsert = function (options, onError) {
        /*
         * this function will test taskUpsert's upsert handling-behavior
         */
            options = { counter: 0, key: 'testCase_taskUpsert_upsert' };
            // test upsert handling-behavior
            [null, null].forEach(function () {
                local.utility2.taskUpsert(options, function (onError) {
                    options.counter += 1;
                    setTimeout(onError);
                });
            });
            // validate counter incremented once
            setTimeout(function () {
                local.utility2.tryCatchOnError(function () {
                    local.utility2.assert(options.counter === 1, options);
                    onError();
                }, onError);
            });
        };

        local.testCase_templateRender_default = function (options, onError) {
        /*
         * this function will test templateRender's default handling-behavior
         */
            var data;
            // jslint-hack
            local.utility2.nop(options);
            // test undefined valueDefault handling-behavior
            data = local.utility2.templateRender('{{aa}}', {}, undefined);
            local.utility2.assert(data === '{{aa}}', data);
            // test default handling-behavior
            data = local.utility2.templateRender(
                '{{aa}} {{aa json htmlSafe encodeURIComponent}} {{bb}} {{cc}} {{dd}} {{ee.ff}}',
                {
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
                },
                '<undefined>'
            );
            local.utility2.assert(
                data === '<aa> %26quot%3B%26lt%3Baa%26gt%3B%26quot%3B 1 null <undefined> gg',
                data
            );
            // test partial-list handling-behavior
            data = local.utility2.templateRender('[{{#list list1}}list1(' +
                '{{aa}} - ' +
                '[{{#list list2}}list2(' +
                    '{{bb}}, ' +
                    '{{#if bb}}if{{/if bb}}, ' +
                    '{{#unless bb}}unless{{/unless bb}}' +
                ') - {{/list list2}}]' +
                '), {{/list list1}}]',
                {
                    list1: [
                        // test null-value handling-behavior
                        null,
                        // test recursive-list handling-behavior
                        { aa: 'aa', list2: [{ bb: 'bb' }, { bb: null }] }
                    ]
                },
                '<undefined>'
                );
            local.utility2.assert(data === '[list1(<undefined> - [<undefined>]), list1(' +
                'aa - ' +
                '[list2(bb, if, <undefined>) - list2(null, <undefined>, unless) - ' +
                ']), ]', data);
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
                // validate no options.onReady
                local.utility2.assert(!options.onReady, options);
                onError();
            }, onError);
        };

        local.testCase_uglify_default = function (options, onError) {
        /*
         * this function will test uglify's default handling-behavior
         */
            var data;
            // jslint-hack
            local.utility2.nop(options);
            data = local.utility2.uglify('aa = 1');
            // validate data
            local.utility2.assert(data === 'aa=1', data);
            onError();
        };

        local.testCase_uglifyIfProduction_default = function (options, onError) {
        /*
         * this function will test uglify's default handling-behavior
         */
            options = {};
            local.utility2.testMock([
                // suppress console.error
                [local.utility2.envDict, { npm_config_production: '' }]
            ], function (onError) {
                // test no production-mode handling-behavior
                local.utility2.envDict.npm_config_production = '';
                options.result = local.utility2.uglifyIfProduction('aa = 1');
                // validate result
                local.utility2.assert(options.result === 'aa = 1', options);
                // test production-mode handling-behavior
                local.utility2.envDict.npm_config_production = '1';
                options.result = local.utility2.uglifyIfProduction('aa = 1');
                // validate result
                local.utility2.assert(options.result === 'aa=1', options);
                onError();
            }, onError);
        };

        local.testCase_urlParse_default = function (options, onError) {
        /*
         * this function will test urlParse's default handling-behavior
         */
            options = {};
            local.utility2.testMock([
                [local.utility2, {
                    // test default PORT handling-behavior
                    envDict: {},
                    // test init-serverLocalHost handling-behavior
                    serverLocalHost: ''
                }]
            ], function (onError) {
                // test default handling-behavior
                options.result = local.utility2.urlParse('https://localhost:80/foo' +
                    '?aa=1&bb%20cc=dd%20=ee&aa=2&aa#zz=1');
                // validate result
                local.utility2.assert(local.utility2.jsonStringifyOrdered(options.result) ===
                    local.utility2.jsonStringifyOrdered({
                        hash: '#zz=1',
                        host: 'localhost:80',
                        hostname: 'localhost',
                        href: 'https://localhost:80/foo?aa=1&bb%20cc=dd%20=ee&aa=2&aa#zz=1',
                        pathname: '/foo',
                        port: '80',
                        protocol: 'https:',
                        query: { aa: ['1', '2', ''], 'bb cc': 'dd =ee' },
                        search: '?aa=1&bb%20cc=dd%20=ee&aa=2&aa'
                    }), options);
                // test error handling-behavior
                options.result = local.utility2.urlParse(null);
                // validate result
                local.utility2.assert(local.utility2.jsonStringifyOrdered(options.result) ===
                    local.utility2.jsonStringifyOrdered({
                        hash: '',
                        host: '',
                        hostname: '',
                        href: '',
                        pathname: '',
                        port: '',
                        protocol: '',
                        query: {},
                        search: ''
                    }), options);
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
            local.utility2.assert(
                local.utility2.regexpUuidValidate.test(options.data1),
                options.data1
            );
            // test uuidTime handling-behavior
            options.data1 = local.utility2.uuidTimeCreate();
            // validate data1
            local.utility2.assert(
                local.utility2.regexpUuidValidate.test(options.data1),
                options.data1
            );
            setTimeout(function () {
                local.utility2.tryCatchOnError(function () {
                    options.data2 = local.utility2.uuidTimeCreate();
                    // validate data2
                    local.utility2.assert(
                        local.utility2.regexpUuidValidate.test(options.data2),
                        options.data2
                    );
                    // validate data1 < data2
                    local.utility2.assert(
                        options.data1 < options.data2,
                        [options.data1, options.data2]
                    );
                    onError();
                }, onError);
            }, 1000);
        };
    }());
    switch (local.modeJs) {



    // run browser js-env code - function
    case 'browser':
        local.testCase_FormData_default = function (options, onError) {
        /*
         * this function will test FormData's default handling-behavior
         */
            options = {};
            options.blob1 = new local.global.Blob(['hello\u1234bye']);
            options.blob2 = new local.global.Blob(['hello\u1234bye'], {
                type: 'text/plain; charset=utf-8'
            });
            options.data = new local.utility2.FormData();
            options.data.append('text1', 'hello\u1234bye');
            // test file-upload handling-behavior
            options.data.append('file1', options.blob1);
            // test file-upload and filename handling-behavior
            options.data.append('file2', options.blob2, 'filename2.txt');
            options.method = 'POST';
            options.url = '/test.echo';
            local.utility2.ajax(options, function (error, xhr) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate responseText
                    local.utility2.assert(xhr.responseText.indexOf(
                        '\r\nContent-Disposition: form-data; ' +
                            'name="text1"\r\n\r\nhello\u1234bye\r\n'
                    ) >= 0, xhr.responseText);
                    local.utility2.assert(xhr.responseText.indexOf(
                        '\r\nContent-Disposition: form-data; ' +
                            'name="file1"\r\n\r\nhello\u1234bye\r\n'
                    ) >= 0, xhr.responseText);
                    local.utility2.assert(xhr.responseText.indexOf(
                        '\r\nContent-Disposition: form-data; name="file2"; ' +
                            'filename="filename2.txt"\r\nContent-Type: text/plain; ' +
                            'charset=utf-8\r\n\r\nhello\u1234bye\r\n'
                    ) >= 0, xhr.responseText);
                    onError();
                }, onError);
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
                    local.utility2.tryCatchOnError(function () {
                        // validate error occurred
                        local.utility2.assert(error, error);
                        onError();
                    }, onError);
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
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate responseText
                    local.utility2.assert(
                        (/\r\n\r\n$/).test(xhr.responseText),
                        xhr.responseText
                    );
                    onError();
                }, onError);
            });
        };

        local.testCase_blobRead_default = function (options, onError) {
        /*
         * this function will test blobRead's default handling-behavior
         */
            var onParallel;
            options = {};
            options.blob = new local.global.Blob(['hello\u1234bye'], {
                type: 'text/plain; charset=utf-8'
            });
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            [null, 'dataURL', 'text'].forEach(function (encoding) {
                onParallel.counter += 1;
                local.utility2.blobRead(options.blob, encoding, function (error, data) {
                    local.utility2.tryCatchOnError(function () {
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data
                        switch (encoding) {
                        case 'dataURL':
                            local.utility2.assert(data ===
                                'data:text/plain; charset=utf-8;base64,aGVsbG/hiLRieWU=', data);
                            break;
                        case 'text':
                            local.utility2.assert(data === 'hello\u1234bye', data);
                            break;
                        default:
                            data = new local.utility2.StringView(data).toString();
                            local.utility2.assert(data === 'hello\u1234bye', data);
                        }
                        onParallel();
                    }, onError);
                });
            });
            onParallel();
        };

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

        local.testCase_domElementQuerySelectorAll_default = function (options, onError) {
        /*
         * this function will test domElementQuerySelectorAll's default handling-behavior
         */
            options = {};
            [
                document,
                [document]
            ].forEach(function (element) {
                options.result = local.utility2.domElementQuerySelectorAll(element, 'body')[0];
                local.utility2.assert(options.result === document.body);
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
            // jslint-hack
            local.utility2.nop(options);
            // test http GET handling-behavior
            local.utility2.ajax({
                url: 'assets.hello'
            }, function (error, xhr) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate responseText
                    local.utility2.assert(xhr.responseText === 'hello', xhr.responseText);
                    // test http GET 304 cache handling-behavior
                    local.utility2.ajax({
                        headers: {
                            'If-Modified-Since': new Date(Date.now() + 0xffff).toGMTString()
                        },
                        url: 'assets.hello'
                    }, function (error, xhr) {
                        local.utility2.tryCatchOnError(function () {
                            // validate no error occurred
                            local.utility2.assert(!error, error);
                            // validate 304 http status
                            local.utility2.assert(xhr.statusCode === 304, xhr.statusCode);
                            onError();
                        }, onError);
                    });
                }, onError);
            });
        };

        local.testCase_build_assets = function (options, onError) {
        /*
         * this function will test build's asset handling-behavior
         */
            var onParallel;
            // jslint-hack
            local.utility2.nop(options);
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            [{
                file: '/index.html',
                url: '/'
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
                file: '/assets.utility2.css',
                url: '/assets.utility2.css'
            }, {
                file: '/assets.utility2.js',
                url: '/assets.utility2.js'
            }, {
                file: '/assets.utility2.rollup.js',
                url: '/assets.utility2.rollup.js'
            }, {
                file: '/assets.utility2.lib.bcrypt.js',
                url: '/assets.utility2.lib.bcrypt.js'
            }, {
                file: '/assets.utility2.lib.cryptojs.js',
                url: '/assets.utility2.lib.cryptojs.js'
            }, {
                file: '/assets.utility2.lib.istanbul.js',
                url: '/assets.utility2.lib.istanbul.js'
            }, {
                file: '/assets.utility2.lib.jslint.js',
                url: '/assets.utility2.lib.jslint.js'
            }, {
                file: '/assets.utility2.lib.stringview.js',
                url: '/assets.utility2.lib.stringview.js'
            }, {
                file: '/assets.utility2.lib.uglifyjs.js',
                url: '/assets.utility2.lib.uglifyjs.js'
            }, {
                file: '/package.json',
                url: '/package.json'
            }].forEach(function (options) {
                onParallel.counter += 1;
                local.utility2.ajax(options, function (error, xhr) {
                    // validate no error occurred
                    onParallel.counter += 1;
                    onParallel(error);
                    local.utility2.fsWriteFileWithMkdirp(
                        local.utility2.envDict.npm_config_dir_build + '/app' + options.file,
                        xhr.response,
                        onParallel
                    );
                });
            });
            onParallel();
        };

        local.testCase_fsWriteFileWithMkdirp_default = function (options, onError) {
        /*
         * this function will test fsWriteFileWithMkdirp's default handling-behavior
         */
            var dir, file, modeNext, onNext;
            // jslint-hack
            local.utility2.nop(options);
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        dir = local.utility2.envDict.npm_config_dir_tmp +
                            '/testCase_fsWriteFileWithMkdirp_default';
                        // cleanup dir
                        local.utility2.fsRmrSync(dir);
                        // validate no dir exists
                        local.utility2.assert(!local.fs.existsSync(dir), dir);
                        onNext();
                        break;
                    case 2:
                        // test fsWriteFileWithMkdirp with mkdirp handling-behavior
                        file = dir + '/aa/bb';
                        local.utility2.fsWriteFileWithMkdirp(file, 'hello1', onNext);
                        break;
                    case 3:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data
                        data = local.fs.readFileSync(file, 'utf8');
                        local.utility2.assert(data === 'hello1', data);
                        onNext();
                        break;
                    case 4:
                        // test fsWriteFileWithMkdirp with no mkdirp handling-behavior
                        file = dir + '/aa/bb';
                        local.utility2.fsWriteFileWithMkdirp(file, 'hello2', onNext);
                        break;
                    case 5:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data
                        data = local.fs.readFileSync(file, 'utf8');
                        local.utility2.assert(data === 'hello2', data);
                        onNext();
                        break;
                    case 6:
                        // test error handling-behavior
                        file = dir + '/aa/bb/cc';
                        local.utility2.fsWriteFileWithMkdirp(file, 'hello', onNext);
                        break;
                    case 7:
                        // validate error occurred
                        local.utility2.assert(error, error);
                        onNext();
                        break;
                    case 8:
                        // cleanup dir
                        local.utility2.fsRmrSync(dir);
                        // validate no dir exists
                        local.utility2.assert(!local.fs.existsSync(dir), dir);
                        onNext();
                        break;
                    default:
                        onError(error);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_istanbulCoverageMerge_default = function (options, onError) {
        /*
         * this function will test istanbulCoverageMerge's default handling-behavior
         */
            var coverage1, coverage2, data;
            // jslint-hack
            local.utility2.nop(options);
            data = local.utility2.istanbulInstrumentSync(
                '(function () {\nreturn arg ' +
                    '? __coverage__ ' +
                    ': __coverage__;\n}());',
                'test'
            );
            local.utility2.arg = 0;
            // test null-case handling-behavior
            coverage1 = null;
            coverage2 = null;
            local.utility2.istanbulCoverageMerge(coverage1, coverage2);
            // validate merged coverage1
            local.utility2.assert(coverage1 === null, coverage1);
            // init coverage1
            coverage1 = local.vm.runInNewContext(data, { arg: 0 });
            /* jslint-ignore-begin */
            // validate coverage1
            local.utility2.assert(local.utility2.jsonStringifyOrdered(coverage1) === '{"/test":{"b":{"1":[0,1]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"code":["(function () {","return arg ? __coverage__ : __coverage__;","}());"],"f":{"1":1},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"/test","s":{"1":1,"2":1},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage1);
            // test merge-create handling-behavior
            coverage1 = local.utility2.istanbulCoverageMerge({}, coverage1);
            // validate coverage1
            local.utility2.assert(local.utility2.jsonStringifyOrdered(coverage1) === '{"/test":{"b":{"1":[0,1]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"code":["(function () {","return arg ? __coverage__ : __coverage__;","}());"],"f":{"1":1},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"/test","s":{"1":1,"2":1},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage1);
            // init coverage2
            coverage2 = local.vm.runInNewContext(data, { arg: 1 });
            // validate coverage2
            local.utility2.assert(local.utility2.jsonStringifyOrdered(coverage2) === '{"/test":{"b":{"1":[1,0]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"code":["(function () {","return arg ? __coverage__ : __coverage__;","}());"],"f":{"1":1},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"/test","s":{"1":1,"2":1},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage2);
            // test merge-update handling-behavior
            local.utility2.istanbulCoverageMerge(coverage1, coverage2);
            // validate merged coverage1
            local.utility2.assert(local.utility2.jsonStringifyOrdered(coverage1) === '{"/test":{"b":{"1":[1,1]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"code":["(function () {","return arg ? __coverage__ : __coverage__;","}());"],"f":{"1":2},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"/test","s":{"1":2,"2":2},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage1);
            /* jslint-ignore-end */
            onError();
        };

        local.testCase_istanbulInstrumentInPackage_default = function (options, onError) {
        /*
         * this function will test istanbulInstrumentInPackage's default handling-behavior
         */
            var data;
            // jslint-hack
            local.utility2.nop(options);
            local.utility2.testMock([
                [local.global, { __coverage__: {} }]
            ], function (onError) {
                // test no instrument handling-behavior
                data = local.utility2.istanbulInstrumentInPackage('1', '', '');
                // validate data
                local.utility2.assert(data === '1', data);
                // test instrument handling-behavior
                data = local.utility2.istanbulInstrumentInPackage('1', '', 'utility2');
                // validate data
                local.utility2.assert(data.indexOf('.s[\'1\']++;1;\n') >= 0, data);
                onError();
            }, onError);
        };

        local.testCase_onFileModifiedRestart_watchFile = function (options, onError) {
        /*
         * this function will test onFileModifiedRestart's watchFile handling-behavior
         */
            var file, onParallel;
            // jslint-hack
            local.utility2.nop(options);
            file = __filename;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            local.fs.stat(file, function (error, stat) {
                // test default watchFile handling-behavior
                onParallel.counter += 1;
                local.fs.utimes(file, stat.atime, new Date(), onParallel);
                // test nop watchFile handling-behavior
                onParallel.counter += 1;
                setTimeout(function () {
                    local.fs.utimes(file, stat.atime, stat.mtime, onParallel);
                // coverage-hack - use 1500 ms to cover setInterval watchFile in node
                }, 1500);
                onParallel(error);
            });
        };

        local.testCase_processSpawnWithTimeout_default = function (options, onError) {
        /*
         * this function will test processSpawnWithTimeout's default handling-behavior
         */
            var childProcess, onParallel;
            // jslint-hack
            local.utility2.nop(options);
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            // test default handling-behavior
            onParallel.counter += 1;
            local.utility2.processSpawnWithTimeout('ls')
                .on('error', onParallel)
                .on('exit', function (exitCode, signal) {
                    // validate exitCode
                    local.utility2.assert(exitCode === 0, exitCode);
                    // validate signal
                    local.utility2.assert(signal === null, signal);
                    onParallel();
                });
            // test timeout handling-behavior
            onParallel.counter += 1;
            local.utility2.testMock([
                [local.utility2, { timeoutDefault: 1000 }]
            ], function (onError) {
                childProcess = local.utility2.processSpawnWithTimeout('sleep', [5000]);
                onError();
            }, local.utility2.nop);
            childProcess
                .on('error', onParallel)
                .on('exit', function (exitCode, signal) {
                    local.utility2.tryCatchOnError(function () {
                        // validate exitCode
                        local.utility2.assert(exitCode === null, exitCode);
                        // validate signal
                        local.utility2.assert(signal === 'SIGKILL', signal);
                        onParallel();
                    }, onParallel);
                });
            onParallel();
        };

        local.testCase_replStart_default = function (options, onError) {
        /*
         * this function will test replStart's default handling-behavior
         */
            /*jslint evil: true*/
            // jslint-hack
            local.utility2.nop(options);
            local.utility2.testMock([
                [local.utility2, { processSpawnWithTimeout: function () {
                    return { on: function (event, callback) {
                        // jslint-hack
                        local.utility2.nop(event);
                        callback();
                    } };
                } }]
            ], function (onError) {
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
                    'print\n'
                ].forEach(function (script) {
                    local.utility2.local._replServer.eval(
                        script,
                        null,
                        'repl',
                        local.utility2.nop
                    );
                });
                onError();
            }, onError);
        };

        local.testCase_serverRespondTimeoutDefault_default = function (options, onError) {
        /*
         * this function will test serverRespondTimeoutDefault's default handling-behavior
         */
            // jslint-hack
            local.utility2.nop(options);
            local.utility2.testMock([
                // suppress console.error
                [local.utility2, { timeoutDefault: 1000 }]
            ], function (onError) {
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

        local.testCase_testPage_error = function (options, onError) {
        /*
         * this function will test the test-page's error handling-behavior
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
                    // test phantom-callback handling-behavior
                    '?modeTest=consoleLogResult&' +
                    // test specific testCase handling-behavior
                    // test testRun's failure handling-behavior
                    'modeTestCase=_testCase_testRun_failure&' +
                    // test timeExit handling-behavior
                    'timeExit={{timeExit}}'
            };
            local.utility2.browserTest(options, function (error) {
                local.utility2.tryCatchOnError(function () {
                    // validate error occurred
                    local.utility2.assert(error, error);
                    onError();
                }, onError);
            });
        };

        local.testCase_testReportCreate_default = function (options, onError) {
        /*
         * this function will test testReport's default handling-behavior
         */
            // jslint-hack
            local.utility2.nop(options);
            // test testRunServer's $npm_config_timeout_exit handling-behavior
            local.utility2.testMock([
                // suppress console.log
                [console, { log: local.utility2.nop }],
                [local.utility2, { exit: local.utility2.nop }]
            ], function (onError) {
                // test exit handling-behavior
                local.utility2.testReportCreate(local.utility2.testReport);
                onError();
            }, onError);
        };

        local.testCase_testRunServer_exit = function (options, onError) {
        /*
         * this function will test testRunServer's exit handling-behavior
         */
            // jslint-hack
            local.utility2.nop(options);
            // test testRunServer's $npm_config_timeout_exit handling-behavior
            local.utility2.testMock([
                // suppress console.log
                [console, { log: local.utility2.nop }],
                // have setTimeout call immediately
                [local.global, { setTimeout: function (onError) {
                    onError();
                } }],
                [local.utility2, {
                    browserTest: function (options, onError) {
                        // jslint-hack
                        local.utility2.nop(options);
                        onError();
                    },
                    envDict: {
                        // test $npm_package_name !== 'utility2' handling-behavior
                        npm_package_name: 'undefined',
                        // test timeout-exit handling-behavior
                        npm_config_timeout_exit: '1'
                    },
                    onReady: {},
                    serverLocalHost: '',
                    serverLocalRequestHandler: local.utility2.nop,
                    serverLocalUrlTest: local.utility2.nop,
                    testRun: local.utility2.nop
                }],
                [local.utility2.local, { http: { createServer: function () {
                    return { listen: local.utility2.nop };
                } } }]
            ], function (onError) {
                // test exit handling-behavior
                local.utility2.testRunServer({ middleware:
                    local.utility2.middlewareGroupCreate([local.utility2.middlewareInit]) });
                onError();
            }, onError);
        };
        break;
    }



    // run shared js-env code - post-init
    (function () {
        // init assets
        local.utility2.assetsDict['/'] = local.utility2.templateRender(
            local.utility2.templateIndexHtml,
            {
                envDict: local.utility2.envDict,
                // add script assets.test.js
                scriptExtra: '<script src="assets.test.js"></script>'
            },
            ''
        );
        local.utility2.assetsDict['/assets.script-only.html'] =
            '<h1>script-only test</h1>\n' +
            '<script src="assets.utility2.lib.stringview.js"></script>' +
            '<script src="assets.utility2.js"></script>\n' +
            '<script src="assets.example.js"></script>\n' +
            '<script src="assets.test.js"></script>\n';
        // init serverLocal
        local.utility2.serverLocalUrlTest = function (url) {
            url = local.utility2.urlParse(url).pathname;
            return local.modeJs === 'browser' && url.indexOf('/test.') === 0;
        };
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
            // test undefined-error handling-behavior
            case '/test.json':
                response.end('"hello"');
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
    }());
    switch (local.modeJs) {



    // run node js-env code - post-init
    case 'node':
        // init assets
        local.utility2.assetsDict['/assets.test.js'] =
            local.utility2.istanbulInstrumentInPackage(
                local.fs.readFileSync(__filename, 'utf8'),
                __filename,
                'utility2'
            );
        // debug dir
        [
            __dirname,
            process.cwd()
        ].forEach(function (dir) {
            local.fs.readdirSync(dir).forEach(function (file) {
                file = dir + '/' + file;
                // if the file is modified, then restart the process
                local.utility2.onFileModifiedRestart(file);
                switch (local.path.extname(file)) {
                // jslint file
                case '.css':
                case '.js':
                case '.json':
                    local.utility2.jslintAndPrint(local.fs.readFileSync(file, 'utf8'), file);
                    break;
                }
            });
        });
        // init repl debugger
        local.utility2.replStart();
        /* istanbul ignore next */
        // run the cli
        local.cliRun = function () {
            if (module !== require.main) {
                return;
            }
            if (process.argv[2]) {
                require(local.path.resolve(process.cwd(), process.argv[2]));
            }
        };
        local.cliRun();
        break;
    }
}());
