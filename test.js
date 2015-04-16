/*jslint
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    stupid: true
*/
(function (local) {
    'use strict';



    // run shared js-env code
    (function () {
        // init tests
        local.testCase_ajax_default = function (onError) {
            /*
                this function will test ajax's default handling behavior
            */
            var onTaskEnd;
            onTaskEnd = local.utility2.onTaskEnd(onError);
            onTaskEnd.counter += 1;
            // test http GET handling behavior
            onTaskEnd.counter += 1;
            local.utility2.ajax({ url: '/test/hello' }, function (error, data) {
                local.utility2.testTryCatch(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate data
                    local.utility2.assert(data === 'hello', data);
                    onTaskEnd();
                }, onTaskEnd);
            });
            // test http GET 304 cache handling behavior
            onTaskEnd.counter += 1;
            local.utility2.ajax({
                headers: { 'If-Modified-Since': new Date(Date.now() + 0xffff).toGMTString() },
                url: '/test/hello'
            }, function (error, data, xhr) {
                local.utility2.testTryCatch(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate 304 http status
                    local.utility2.assert(xhr.status === 304, JSON.stringify(xhr));
                    // validate no data
                    local.utility2.assert(!data, data);
                    onTaskEnd();
                }, onTaskEnd);
            });
            // test http POST handling behavior
            ['binary', 'string'].forEach(function (resultType) {
                onTaskEnd.counter += 1;
                local.utility2.ajax({
                    data: resultType === 'binary' && local.modeJs === 'node'
                        // test binary post handling behavior
                        ? new Buffer('hello')
                        // test string post handling behavior
                        : 'hello',
                    // test request header handling behavior
                    headers: { 'X-Header-Test': 'Test' },
                    method: 'POST',
                    resultType: resultType,
                    url: '/test/echo'
                }, function (error, data) {
                    local.utility2.testTryCatch(function () {
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate test header
                        local.utility2.assert((/\r\nx-header-test: Test\r\n/).test(data), data);
                        // validate binary data
                        if (resultType === 'binary' && local.modeJs === 'node') {
                            local.utility2.assert(Buffer.isBuffer(data), data);
                            data = String(data);
                        }
                        // validate string data
                        local.utility2.assert((/\r\nhello$/).test(data), data);
                        onTaskEnd();
                    }, onTaskEnd);
                });
            });
            [{
                // test 404-not-found-error handling behavior
                url: '/test/undefined?modeErrorIgnore=1'
            }, {
                // test 500-internal-server-error handling behavior
                url: '/test/server-error?modeErrorIgnore=1'
            }, {
                // test timeout handling behavior
                timeout: 1,
                url: '/test/timeout'
            }, {
                // test undefined https host handling behavior
                timeout: 1,
                url: 'https://undefined' + Date.now() + Math.random() + '.com'
            }].forEach(function (options) {
                onTaskEnd.counter += 1;
                local.utility2.ajax(options, function (error) {
                    local.utility2.testTryCatch(function () {
                        // validate error occurred
                        local.utility2.assert(error instanceof Error, error);
                        onTaskEnd();
                    }, onTaskEnd);
                });
            });
            onTaskEnd();
        };

        local.testCase_assert_default = function (onError) {
            /*
                this function will test assert's default handling behavior
            */
            var error;
            // test assertion passed
            local.utility2.assert(true, true);
            // test assertion failed with undefined message
            local.utility2.testTryCatch(function () {
                local.utility2.assert(false);
            }, function (error) {
                // validate error occurred
                local.utility2.assert(error instanceof Error, error);
                // validate error-message
                local.utility2.assert(error.message === '', error.message);
            });
            // test assertion failed with error object,
            // with no error.message and no error.trace
            error = new Error();
            error.message = '';
            error.stack = '';
            local.utility2.testTryCatch(function () {
                local.utility2.assert(false, error);
            }, function (error) {
                // validate error occurred
                local.utility2.assert(error instanceof Error, error);
                // validate error.message
                local.utility2.assert(error.message === 'undefined', error.message);
            });
            // test assertion failed with string message
            local.utility2.testTryCatch(function () {
                local.utility2.assert(false, 'hello');
            }, function (error) {
                // validate error occurred
                local.utility2.assert(error instanceof Error, error);
                // validate error-message
                local.utility2.assert(error.message === 'hello', error.message);
            });
            // test assertion failed with error object
            local.utility2.testTryCatch(function () {
                local.utility2.assert(false, local.utility2.errorDefault);
            }, function (error) {
                // validate error occurred
                local.utility2.assert(error instanceof Error, error);
            });
            // test assertion failed with json object
            local.utility2.testTryCatch(function () {
                local.utility2.assert(false, { aa: 1 });
            }, function (error) {
                // validate error occurred
                local.utility2.assert(error instanceof Error, error);
                // validate error-message
                local.utility2.assert(error.message === '{"aa":1}', error.message);
            });
            onError();
        };

        local.testCase_debug_print_default = function (onError) {
            /*
                this function will test debug_print's default handling behavior
            */
            var message;
            local.utility2.testMock([
                // suppress console.error
                [console, { error: function (arg) {
                    message += (arg || '') + '\n';
                } }]
            ], function (onError) {
                message = '';
                local.global['debug_print'.replace('_p', 'P')]('hello');
                // validate message
                local.utility2.assert(
                    message === '\n\n\n' + 'debug_print'.replace('_p', 'P') + '\nhello\n\n',
                    message
                );
                onError();
            }, onError);
        };

        local.testCase_jsonCopy_default = function (onError) {
            /*
                this function will test jsonCopy's default handling behavior
            */
            // test various data-type handling behavior
            [undefined, null, false, true, 0, 1, 1.5, 'a'].forEach(function (data) {
                local.utility2.assert(
                    local.utility2.jsonCopy(data) === data,
                    [local.utility2.jsonCopy(data), data]
                );
            });
            onError();
        };

        local.testCase_jsonStringifyOrdered_default = function (onError) {
            /*
                this function will test jsonStringifyOrdered's default handling behavior
            */
            var data;
            // test various data-type handling behavior
            [undefined, null, false, true, 0, 1, 1.5, 'a', {}, []].forEach(function (data) {
                local.utility2.assert(
                    local.utility2.jsonStringifyOrdered(data) === JSON.stringify(data),
                    [local.utility2.jsonStringifyOrdered(data), JSON.stringify(data)]
                );
            });
            // test data-ordering handling behavior
            data = local.utility2.jsonStringifyOrdered({
                // test nested dict handling behavior
                ee: { gg: 2, ff: 1},
                // test array handling behavior
                dd: [undefined],
                cc: local.utility2.nop,
                bb: 2,
                aa: 1
            });
            local.utility2.assert(
                data === '{"aa":1,"bb":2,"dd":[null],"ee":{"ff":1,"gg":2}}',
                data
            );
            onError();
        };

        local.testCase_listShuffle_default = function (onError) {
            /*
                this function will test listShuffle's default handling behavior
            */
            var data, list = '[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]';
            // validate list before shuffle
            data = JSON.stringify(JSON.parse(list));
            local.utility2.assert(data === list, data);
            // shuffle list
            data = JSON.stringify(local.utility2.listShuffle(JSON.parse(list)));
            // validate list after shuffle
            local.utility2.assert(data.length === list.length, data);
            local.utility2.assert(data !== list, data);
            onError();
        };

        local.testCase_objectSetDefault_default = function (onError) {
            /*
                this function will test objectSetDefault's default handling behavior
            */
            var options;
            // test non-recursive handling behavior
            options = local.utility2.objectSetDefault(
                { aa: 1, bb: {}, cc: [] },
                { aa: 2, bb: { cc: 2 }, cc: [1, 2] },
                // test default depth handling behavior
                null
            );
            // validate options
            local.utility2.assert(
                local.utility2.jsonStringifyOrdered(options) === '{"aa":1,"bb":{},"cc":[]}',
                options
            );
            // test recursive handling behavior
            options = local.utility2.objectSetDefault(
                { aa: 1, bb: {}, cc: [] },
                { aa: 2, bb: { cc: 2 }, cc: [1, 2] },
                -1
            );
            // validate options
            local.utility2.assert(
                local.utility2.jsonStringifyOrdered(options) ===
                    '{"aa":1,"bb":{"cc":2},"cc":[]}',
                options
            );
            onError();
        };

        local.testCase_objectSetOverride_default = function (onError) {
            /*
                this function will test objectSetOverride's default handling behavior
            */
            var data, options;
            // test override handling behavior
            options = local.utility2.objectSetOverride(
                {
                    aa: 1,
                    bb: { cc: 2 },
                    dd: [3, 4],
                    ee: { ff: { gg: 5, hh: 6 } }
                },
                {
                    aa: 2,
                    bb: { dd: 3 },
                    dd: [4, 5],
                    ee: { ff: { gg: 6 } }
                },
                // test depth handling behavior
                2
            );
            // validate options
            data = local.utility2.jsonStringifyOrdered(options);
            local.utility2.assert(data ===
                '{"aa":2,"bb":{"cc":2,"dd":3},"dd":[4,5],' + '"ee":{"ff":{"gg":6}}}', data);
            // test override envDict with empty-string handling behavior
            options = local.utility2.objectSetOverride(
                local.utility2.envDict,
                { 'emptyString': null },
                // test default depth handling behavior
                null
            );
            // validate options
            local.utility2.assert(options.emptyString === '', options.emptyString);
            onError();
        };

        local.testCase_objectTraverse_default = function (onError) {
            /*
                this function will test objectTraverse's default handling behavior
            */
            var data;
            data = { aa: null, bb: 2, cc: { dd: 4, ee: [5, 6, 7] } };
            local.utility2.objectTraverse(data, function (element) {
                if (element && typeof element === 'object' && !Array.isArray(element)) {
                    element.zz = true;
                }
            });
            // validate data
            data = local.utility2.jsonStringifyOrdered(data);
            local.utility2.assert(
                data === '{"aa":null,"bb":2,"cc":{"dd":4,"ee":[5,6,7],"zz":true},"zz":true}',
                data
            );
            onError();
        };

        local.testCase_onErrorDefault_default = function (onError) {
            /*
                this function will test onErrorDefault's default handling behavior
            */
            var message;
            local.utility2.testMock([
                // suppress console.error
                [console, { error: function (arg) {
                    message = arg;
                } }]
            ], function (onError) {
                // test no error handling behavior
                local.utility2.onErrorDefault();
                // validate message
                local.utility2.assert(!message, message);
                // test error handling behavior
                local.utility2.onErrorDefault(local.utility2.errorDefault);
                // validate message
                local.utility2.assert(message, message);
                onError();
            }, onError);
        };

        local.testCase_onErrorJsonParse_default = function (onError) {
            /*
                this function will test onErrorJsonParse's default handling behavior
            */
            var data, error, jsonParse;
            jsonParse = local.utility2.onErrorJsonParse(function (arg0, arg1) {
                data = arg1;
                error = arg0;
            });
            // test parse passed handling behavior
            jsonParse(null, '1');
            // validate no error occurred
            local.utility2.assert(!error, error);
            // validate data
            local.utility2.assert(data === 1);
            // test parse failed handling behavior
            jsonParse(null, 'syntax error');
            // validate no error occurred
            local.utility2.assert(error instanceof Error, error);
            // validate data
            local.utility2.assert(!data);
            // test error handling behavior
            jsonParse(new Error());
            // validate no error occurred
            local.utility2.assert(error instanceof Error, error);
            // validate data
            local.utility2.assert(!data);
            onError();
        };

        local.testCase_onTaskEnd_default = function (onError) {
            /*
                this function will test onTaskEnd's default handling behavior
            */
            var onTaskEnd, onTaskEndError;
            // test onDebug handling behavior
            onTaskEnd = local.utility2.onTaskEnd(onError, function (error, self) {
                local.utility2.testTryCatch(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate self
                    local.utility2.assert(self.counter >= 0, self);
                }, onError);
            });
            onTaskEnd.counter += 1;
            onTaskEnd.counter += 1;
            setTimeout(function () {
                onTaskEndError = local.utility2.onTaskEnd(function (error) {
                    local.utility2.testTryCatch(function () {
                        // validate error occurred
                        local.utility2.assert(error instanceof Error, error);
                        onTaskEnd();
                    }, onTaskEnd);
                });
                onTaskEndError.counter += 1;
                // test error handling behavior
                onTaskEndError.counter += 1;
                onTaskEndError(local.utility2.errorDefault);
                // test ignore-after-error handling behavior
                onTaskEndError();
            });
            // test default handling behavior
            onTaskEnd();
        };

        local.testCase_onTimeout_timeout = function (onError) {
            /*
                this function will test onTimeout's timeout handling behavior
            */
            var timeElapsed;
            timeElapsed = Date.now();
            local.utility2.onTimeout(function (error) {
                local.utility2.testTryCatch(function () {
                    // validate error occurred
                    local.utility2.assert(error instanceof Error);
                    // save timeElapsed
                    timeElapsed = Date.now() - timeElapsed;
                    // validate timeElapsed passed is greater than timeout
                    // bug - ie might timeout slightly earlier,
                    // so increase timeElapsed by a small amount
                    local.utility2.assert(timeElapsed + 100 >= 1000, timeElapsed);
                    onError();
                }, onError);
            // coverage-hack - use 1500 ms to cover setInterval test-report refresh in browser
            }, 1500, 'testCase_onTimeout_errorTimeout');
        };

        local.testCase_stringFormat_default = function (onError) {
            /*
                this function will test stringFormat's default handling behavior
            */
            var data;
            // test undefined valueDefault handling behavior
            data = local.utility2.stringFormat('{{aa}}', {}, undefined);
            local.utility2.assert(data === '{{aa}}', data);
            // test default handling behavior
            data = local.utility2.stringFormat(
                '{{aa}}{{aa}}{{bb}}{{cc}}{{dd}}{{ee.ff}}',
                {
                    // test string value handling behavior
                    aa: 'aa',
                    // test non-string value handling behavior
                    bb: 1,
                    // test null-value handling behavior
                    cc: null,
                    // test undefined-value handling behavior
                    dd: undefined,
                    // test nested value handling behavior
                    ee: { ff: 'gg' }
                },
                '<undefined>'
            );
            local.utility2.assert(data === 'aaaa1null<undefined>gg', data);
            // test list handling behavior
            data = local.utility2.stringFormat(
                '[{{#list1}}[{{#list2}}{{aa}},{{/list2}}],{{/list1}}]',
                {
                    list1: [
                        // test null-value handling behavior
                        null,
                        // test recursive list handling behavior
                        { list2: [{ aa: 'bb' }, { aa: 'cc' }] }
                    ]
                },
                '<undefined>'
            );
            local.utility2.assert(
                data === '[[<undefined><undefined>,<undefined>],[bb,cc,],]',
                data
            );
            onError();
        };

        local.testCase_testRun_failure = function (onError) {
            /*
                this function will test testRun's failure handling behavior
            */
            // test failure from callback handling behavior
            onError(local.utility2.errorDefault);
            // test failure from multiple-callback handling behavior
            onError();
            // test failure from ajax handling behavior
            local.utility2.ajax({ url: '/test/undefined?modeErrorIgnore=1' }, onError);
            // test failure from thrown error handling behavior
            throw local.utility2.errorDefault;
        };
    }());
    switch (local.modeJs) {



    // run node js-env code
    case 'node':
        // init tests
        local.testCase_istanbulMerge_default = function (onError) {
            /*
                this function will test istanbulMerge's default handling behavior
            */
            var coverage1, coverage2, script;
            script = local.istanbul_lite.instrumentSync(
                '(function () {\nreturn arg ' +
                    '? __coverage__ ' +
                    ': __coverage__;\n}());',
                'test'
            );
            local.utility2.arg = 0;
            // jslint-hack
            local.utility2.nop(script);



            /* jslint-ignore-begin */
            // init coverage1
            coverage1 = local.vm.runInNewContext(script, { arg: 0 });
            // validate coverage1
            local.utility2.assert(local.utility2.jsonStringifyOrdered(coverage1) === '{"/test":{"b":{"1":[0,1]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"f":{"1":1},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"/test","s":{"1":1,"2":1},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage1);
            // init coverage2
            coverage2 = local.vm.runInNewContext(script, { arg: 1 });
            // validate coverage2
            local.utility2.assert(local.utility2.jsonStringifyOrdered(coverage2) === '{"/test":{"b":{"1":[1,0]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"f":{"1":1},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"/test","s":{"1":1,"2":1},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage2);
            // merge coverage2 into coverage1
            local.utility2.istanbulMerge(coverage1, coverage2);
            // validate merged coverage1
            local.utility2.assert(local.utility2.jsonStringifyOrdered(coverage1) === '{"/test":{"b":{"1":[1,1]},"branchMap":{"1":{"line":2,"locations":[{"end":{"column":25,"line":2},"start":{"column":13,"line":2}},{"end":{"column":40,"line":2},"start":{"column":28,"line":2}}],"type":"cond-expr"}},"f":{"1":2},"fnMap":{"1":{"line":1,"loc":{"end":{"column":13,"line":1},"start":{"column":1,"line":1}},"name":"(anonymous_1)"}},"path":"/test","s":{"1":2,"2":2},"statementMap":{"1":{"end":{"column":5,"line":3},"start":{"column":0,"line":1}},"2":{"end":{"column":41,"line":2},"start":{"column":0,"line":2}}}}}', coverage1);
            /* jslint-ignore-end */



            // test null-case handling behavior
            coverage1 = null;
            coverage2 = null;
            local.utility2.istanbulMerge(coverage1, coverage2);
            // validate merged coverage1
            local.utility2.assert(coverage1 === null, coverage1);
            onError();
        };

        local.testCase_onFileModifiedRestart_watchFile = function (onError) {
            /*
                this function will test onFileModifiedRestart's watchFile handling behavior
            */
            var file, onTaskEnd;
            file = __dirname + '/package.json';
            onTaskEnd = local.utility2.onTaskEnd(onError);
            onTaskEnd.counter += 1;
            local.fs.stat(file, function (error, stat) {
                // test default watchFile handling behavior
                onTaskEnd.counter += 1;
                local.fs.utimes(file, stat.atime, new Date(), onTaskEnd);
                // test nop watchFile handling behavior
                onTaskEnd.counter += 1;
                setTimeout(function () {
                    local.fs.utimes(file, stat.atime, stat.mtime, onTaskEnd);
                // coverage-hack - use 1500 ms to cover setInterval watchFile in node
                }, 1500);
                onTaskEnd(error);
            });
        };

        local.testCase_serverRespondTimeoutDefault_default = function (onError) {
            /*
                this function will test serverRespondTimeoutDefault's default handling behavior
            */
            local.utility2.testMock([
                // suppress console.error
                [console, { error: local.utility2.nop }],
                [local.utility2, {
                    // suppress onErrorDefault
                    onErrorDefault: local.utility2.nop,
                    // coverage-hack - cover timeout callback handling behavior
                    onTimeoutRequestResponseDestroy: function (onError) {
                        onError();
                    },
                    serverRespondDefault: local.utility2.nop
                }]
            ], function (onError) {
                local.utility2.serverRespondTimeoutDefault(
                    {},
                    {},
                    // coverage-hack - cover default timeout handling behavior
                    null
                );
                onError();
            }, onError);
        };

        local.testCase_phantomTest_default = function (onError) {
            /*
                this function will test phantomTest's default handling behavior
            */
            var onTaskEnd, options;
            onTaskEnd = local.utility2.onTaskEnd(onError);
            onTaskEnd.counter += 1;
            [{
                // test default handling behavior
                url: 'http://localhost:' +
                    local.utility2.envDict.npm_config_server_port +
                    // test phantom-callback handling behavior
                    '?modeTest=phantom&' +
                    // test _testSecret-validation handling behavior
                    '_testSecret={{_testSecret}}'
            }, {
                modeError: true,
                modeErrorIgnore: true,
                url: 'http://localhost:' +
                    local.utility2.envDict.npm_config_server_port +
                    // test script-error handling behavior
                    '/test/script-error.html'
            }, {
                modeError: true,
                modeErrorIgnore: true,
                // run phantom self-test
                modePhantomSelfTest: true,
                url: 'http://localhost:' +
                    local.utility2.envDict.npm_config_server_port +
                    // test standalone script handling behavior
                    '/test/script-standalone.html?' +
                    // test modeTest !== 'phantom' handling behavior
                    'modeTest=phantom2&' +
                    // test single-test-case handling behavior
                    // test testRun's failure handling behavior
                    'modeTestCase=testCase_testRun_failure'
            }].forEach(function (options) {
                onTaskEnd.counter += 1;
                local.utility2.phantomTest(options, function (error) {
                    local.utility2.testTryCatch(function () {
                        // validate error occurred
                        if (options.modeError) {
                            local.utility2.assert(error instanceof Error, error);
                        // validate no error occurred
                        } else {
                            local.utility2.assert(!error, error);
                        }
                        onTaskEnd();
                    }, onTaskEnd);
                });
            });
            // test screenCapture handling behavior
            onTaskEnd.counter += 1;
            options = {
                modeErrorIgnore: true,
                timeoutScreenCapture: 1,
                url: 'http://localhost:' +
                    local.utility2.envDict.npm_config_server_port +
                    '/test/script-error.html'
            };
            local.utility2.phantomScreenCapture(options, function (error) {
                local.utility2.testTryCatch(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate screen-capture file
                    local.utility2.assert(
                        options.phantomjs.fileScreenCapture &&
                            local.fs.existsSync(options.phantomjs.fileScreenCapture),
                        options.phantomjs.fileScreenCapture
                    );
                    // remove screen-capture file, so it will not interfere with re-test
                    local.fs.unlinkSync(options.phantomjs.fileScreenCapture);
                    onTaskEnd();
                }, onTaskEnd);
            });
            // test misc handling behavior
            onTaskEnd.counter += 1;
            local.utility2.testMock([
                [local.utility2, {
                    envDict: {
                        // test no slimerjs handling behavior
                        npm_config_mode_no_slimerjs: '1',
                        // test no cover utility2.js handling behavior
                        npm_package_name: 'undefined'
                    },
                    onTimeout: local.utility2.nop,
                    processSpawnWithTimeout: function () {
                        return { on: local.utility2.nop };
                    }
                }]
            ], function (onError) {
                local.utility2.phantomTest({
                    url: 'http://localhost:' +
                        local.utility2.envDict.npm_config_server_port
                });
                onError();
            }, onTaskEnd);
            onTaskEnd();
        };

        local.testCase_processSpawnWithTimeout_default = function (onError) {
            /*
                this function will test processSpawnWithTimeout's default handling behavior
            */
            var childProcess, onTaskEnd;
            onTaskEnd = local.utility2.onTaskEnd(onError);
            onTaskEnd.counter += 1;
            // test default handling behavior
            onTaskEnd.counter += 1;
            local.utility2.processSpawnWithTimeout('ls')
                .on('error', onTaskEnd)
                .on('exit', function (exitCode, signal) {
                    // validate exitCode
                    local.utility2.assert(exitCode === 0, exitCode);
                    // validate signal
                    local.utility2.assert(signal === null, signal);
                    onTaskEnd();
                });
            // test timeout handling behavior
            onTaskEnd.counter += 1;
            local.utility2.testMock([
                [local.utility2, { timeoutDefault: 1000 }]
            ], function (onError) {
                childProcess = local.utility2.processSpawnWithTimeout('sleep', [5000]);
                onError();
            }, local.utility2.nop);
            childProcess
                .on('error', onTaskEnd)
                .on('exit', function (exitCode, signal) {
                    local.utility2.testTryCatch(function () {
                        // validate exitCode
                        local.utility2.assert(exitCode === null, exitCode);
                        // validate signal
                        local.utility2.assert(signal === 'SIGKILL', signal);
                        onTaskEnd();
                    }, onTaskEnd);
                });
            onTaskEnd();
        };

        local.testCase_replStart_default = function (onError) {
            /*
                this function will test replStart's default handling behavior
            */
            /*jslint evil: true*/
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
                    // test shell handling behavior
                    '$ :\n',
                    // test git diff handling behavior
                    '$ git diff\n',
                    // test git log handling behavior
                    '$ git log\n',
                    // test grep handling behavior
                    'grep \\bhello\\b\n',
                    // test print handling behavior
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

        local.testCase_testRunServer_misc = function (onError) {
            /*
                this function will test testRunServer's misc handling behavior
            */
            local.utility2.testMock([
                [local.utility2, {
                    envDict: {
                        // test $npm_package_name !== 'utility2' handling behavior
                        npm_package_name: 'undefined',
                        // test timeout-exit handling behavior
                        npm_config_timeout_exit: '1',
                        // test $npm_config_server_port handling behavior
                        npm_config_server_port: ''
                    },
                    phantomScreenCapture: local.utility2.nop,
                    onReady: {},
                    taskCacheCreateOrAddCallback: local.utility2.nop
                }],
                [local.utility2.local, {
                    http: { createServer: function () {
                        return { listen: local.utility2.nop };
                    } }
                }]
            ], function (onError) {
                local.utility2.testRunServer({
                    middleware: local.utility2.middlewareGroupCreate([
                        local.utility2.middlewareInit
                    ])
                });
                // validate $npm_config_server_port
                local.utility2.assert(
                    Number(local.utility2.envDict.npm_config_server_port) > 0,
                    local.utility2.envDict.npm_config_server_port
                );
                onError();
            }, onError);
        };

        local.testCase_uuid4_default = function (onError) {
            /*
                this function will test uuid4's default handling behavior
            */
            var data;
            data = local.utility2.uuidTime();
            // validate data
            local.utility2.assert(local.utility2.regexpUuidValidate.test(data), data);
            onError();
        };

        local.testCase_uuidTime_default = function (onError) {
            /*
                this function will test uuidTime's default handling behavior
            */
            var data1, data2;
            data1 = local.utility2.uuidTime();
            setTimeout(function () {
                local.utility2.testTryCatch(function () {
                    data2 = local.utility2.uuidTime();
                    // validate data1
                    local.utility2.assert(local.utility2.regexpUuidValidate.test(data1), data1);
                    // validate data2
                    local.utility2.assert(local.utility2.regexpUuidValidate.test(data2), data2);
                    // validate data1 < data2
                    local.utility2.assert(data1 < data2, [data1, data2]);
                    onError();
                }, onError);
            }, 1000);
        };
        break;
    }
    switch (local.modeJs) {



    // run browser js-env code
    case 'browser':
        // export local
        window.local = local;
        local.utility2.onErrorExit = function () {
            // test modeTest !== 'phantom' handling behavior
            if (local.utility2.modeTest === 'phantom2') {
                setTimeout(function () {
                    throw new Error('\nphantom\n' +
                        JSON.stringify({ global_test_results: window.global_test_results }));
                }, 1000);
            }
        };
        // coverage-hack - cover no modeTest handling behavior
        local._modeTest = local.utility2.modeTest;
        local.utility2.modeTest = null;
        local.utility2.testRun();
        // restore modeTest
        local.utility2.modeTest = local._modeTest;
        // run test
        local.utility2.testRun(local);
        break;



    // run node js-env code
    case 'node':
        // require modules
        local.child_process = require('child_process');
        local.fs = require('fs');
        local.http = require('http');
        local.https = require('https');
        local.istanbul_lite = require('istanbul-lite');
        local.jslint_lite = require('jslint-lite');
        local.path = require('path');
        local.url = require('url');
        local.vm = require('vm');
        local.zlib = require('zlib');
        // init assets
        local['/'] = local.utility2['/test/test.html'];
        local['/assets/istanbul-lite.js'] = local.istanbul_lite['/assets/istanbul-lite.js'];
        local['/assets/jslint-lite.js'] = local.jslint_lite['/assets/jslint-lite.js'];
        local['/assets/utility2.css'] = local.utility2['/assets/utility2.css'];
        local['/assets/utility2.js'] = local.istanbul_lite.instrumentInPackage(
            local.utility2['/assets/utility2.js'],
            __dirname + '/index.js',
            'utility2'
        );
        local['/test/hello'] = 'hello';
        local['/test/script-error.html'] = '<script>syntax error</script>';
        local['/test/script-standalone.html'] = '<script src="/assets/utility2.js">\n' +
            '</script><script src="/test/test.js"></script>';
        local['/test/test.js'] = local.istanbul_lite.instrumentInPackage(
            local.fs.readFileSync(__filename, 'utf8'),
            __filename,
            'utility2'
        );
        // init middleware
        local.middleware = local.utility2.middlewareGroupCreate([
            local.utility2.middlewareInit,
            function (request, response, nextMiddleware) {
                /*
                    this function will run the test-middleware
                */
                switch (request.urlParsed.pathnameNormalized) {
                // serve assets
                case '/':
                case '/assets/istanbul-lite.js':
                case '/assets/jslint-lite.js':
                case '/assets/utility2.css':
                case '/assets/utility2.js':
                case '/test/hello':
                case '/test/script-error.html':
                case '/test/script-standalone.html':
                case '/test/test.js':
                    local.utility2
                        .middlewareCacheControlLastModified(request, response, function () {
                            local.utility2.serverRespondGzipCache(
                                request,
                                response,
                                request.urlParsed.pathnameNormalized,
                                local[request.urlParsed.pathnameNormalized]
                            );
                        });
                    break;
                // test http POST handling behavior
                case '/test/echo':
                    local.utility2.serverRespondEcho(request, response);
                    break;
                // test timeout handling behavior
                case '/test/timeout':
                    setTimeout(function () {
                        response.end();
                    }, 1000);
                    break;
                // test 500-internal-server-error handling behavior
                case '/test/server-error':
                    // test multiple-callback serverRespondSetHead handling behavior
                    local.utility2.serverRespondSetHead(request, response, null, {});
                    nextMiddleware(local.utility2.errorDefault);
                    // test multiple-callback error handling behavior
                    nextMiddleware(local.utility2.errorDefault);
                    // test onErrorDefault handling behavior
                    local.utility2.testMock([
                        // suppress console.error
                        [console, { error: local.utility2.nop }],
                        // suppress modeErrorIgnore
                        [request, { url: '' }]
                    ], function (onError) {
                        local.utility2.serverRespondDefault(
                            request,
                            response,
                            500,
                            local.utility2.errorDefault
                        );
                        onError();
                    }, local.utility2.nop);
                    break;
                // default to nextMiddleware
                default:
                    nextMiddleware();
                }
            }
        ]);
        // init middleware error-handler
        local.onMiddlewareError = local.utility2.onMiddlewareError;
        // run server-test
        local.utility2.testRunServer(local);
        // init dir
        [__dirname, process.cwd()].forEach(function (dir) {
            local.fs.readdirSync(dir).forEach(function (file) {
                file = dir + '/' + file;
                switch (local.path.extname(file)) {
                case '.js':
                case '.json':
                    // jslint the file
                    local.jslint_lite.jslintAndPrint(local.fs.readFileSync(file, 'utf8'), file);
                    break;
                }
                // if the file is modified, then restart the process
                local.utility2.onFileModifiedRestart(file);
            });
        });
        // jslint /assets/utility2.css
        local.jslint_lite.jslintAndPrint(
            local.utility2['/assets/utility2.css'],
            '/assets/utility2.css'
        );
        // init repl debugger
        local.utility2.replStart({ local: local });
        // init $npm_config_start_file
        [
            // coverage-hack - cover no $npm_config_start_file handling behavior
            null,
            process.env.npm_config_start_file
        ].forEach(function (file) {
            if (file) {
                require(process.cwd() + '/' + file);
            }
        });
        break;
    }
}((function () {
    'use strict';
    var local;



    // run shared js-env code
    (function () {
        // init local
        local = {};
        // init utility2
        local.utility2 = { local: local };
        local.modeJs = (function () {
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
        }());
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        // init utility2
        local.utility2 = local.modeJs === 'browser'
            ? window.utility2
            : require('./index.js');
        // init istanbul_lite
        local.istanbul_lite = local.utility2.local.istanbul_lite;
        // init jslint_lite
        local.jslint_lite = local.utility2.local.jslint_lite;
    }());
    return local;
}())));
