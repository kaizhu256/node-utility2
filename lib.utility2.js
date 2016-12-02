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
(function (local) {
    'use strict';
    var require;



    // run shared js-env code - pre-init
    (function () {
        // init lib
        local.local = local.utility2 = local.global.utility2 = local;
        // init require
        require = function (key) {
            return local[key] || local.require2(key);
        };
        // init global.debug_inline
        local.global['debug_inline'.replace('_i', 'I')] = function (arg) {
        /*
         * this function will both print the arg to stderr and return it
         */
            // debug arguments
            local['_debug_inlineArguments'.replace('_i', 'I')] = arguments;
            console.error('\n\n\ndebug_inline'.replace('_i', 'I'));
            console.error.apply(console, arguments);
            console.error();
            // return arg for inspection
            return arg;
        };
        // init global.debug_inlineCallback
        local.global['debug_inlineCallback'.replace('_i', 'I')] = function (onError) {
        /*
         * this function will inject debug_inline into the callback onError
         */
            return function () {
                local.global['debug_inline'.replace('_i', 'I')].apply(null, arguments);
                onError.apply(null, arguments);
            };
        };
        local.nop = function () {
        /*
         * this function will do nothing
         */
            return;
        };
        // init lib
        [
            'db',
            'istanbul',
            'jslint',
            'sjcl',
            'uglifyjs'
        ].forEach(function (key) {
            try {
                local[key] = local.modeJs === 'browser'
                    ? local.global['utility2_' + key]
                    : require('./lib.' + key + '.js');
            } catch (ignore) {
            }
            local[key] = local[key] || {};
        });
        // init assets and templates
        local.assetsDict = {};
/* jslint-ignore-begin */
local.assetsDict['/assets.example.js'] = '';



local.assetsDict['/assets.test.js'] = '';



local.assetsDict['/assets.utility2.rollup.begin.js'] = '\
/* utility2.rollup.js begin */\n\
/*jslint\n\
    bitwise: true,\n\
    browser: true,\n\
    maxerr: 8,\n\
    maxlen: 96,\n\
    node: true,\n\
    nomen: true,\n\
    regexp: true,\n\
    stupid: true\n\
*/\n\
(function () {\n\
    "use strict";\n\
    var local;\n\
    local = {};\n\
    local.modeJs = (function () {\n\
        try {\n\
            return typeof navigator.userAgent === "string" &&\n\
                typeof document.querySelector("body") === "object" &&\n\
                typeof XMLHttpRequest.prototype.open === "function" &&\n\
                "browser";\n\
        } catch (errorCaughtBrowser) {\n\
            return module.exports &&\n\
                typeof process.versions.node === "string" &&\n\
                typeof require("http").createServer === "function" &&\n\
                "node";\n\
        }\n\
    }());\n\
    local.global = local.modeJs === "browser"\n\
        ? window\n\
        : global;\n\
    local.local = local.global.utility2_rollup = local.global.utility2_rollup_old || local;\n\
}());\n\
';



local.assetsDict['/assets.utility2.rollup.content.js'] = '\
(function () {\n\
    "use strict";\n\
    var local;\n\
    local = (typeof window === "object" && window && window.utility2_rollup) ||\n\
        global.utility2_rollup;\n\
    local.local = local;\n\
/* jslint-ignore-begin */\n\
/* utility2.rollup.js content */\n\
/* jslint-ignore-end */\n\
}());\n\
';



local.assetsDict['/assets.utility2.rollup.end.js'] = '\
(function () {\n\
    "use strict";\n\
    var local;\n\
    local = {};\n\
    local.modeJs = (function () {\n\
        try {\n\
            return typeof navigator.userAgent === "string" &&\n\
                typeof document.querySelector("body") === "object" &&\n\
                typeof XMLHttpRequest.prototype.open === "function" &&\n\
                "browser";\n\
        } catch (errorCaughtBrowser) {\n\
            return module.exports &&\n\
                typeof process.versions.node === "string" &&\n\
                typeof require("http").createServer === "function" &&\n\
                "node";\n\
        }\n\
    }());\n\
    local.global = local.modeJs === "browser"\n\
        ? window\n\
        : global;\n\
    local.global.utility2_rollup_old = local.global.utility2_rollup;\n\
    local.global.utility2_rollup = null;\n\
}());\n\
/* utility2.rollup.js end */\n\
';



local.assetsDict['/favicon.ico'] = '';



// https://www.w3.org/TR/html5/forms.html#valid-e-mail-address
local.regexpEmailValidate = (
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
);



// https://img.shields.io/badge/last_build-0000_00_00_00_00_00_UTC_--_master_--_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-0077ff.svg?style=flat
local.templateBuildBadgeSvg =
'<svg xmlns="http://www.w3.org/2000/svg" width="563" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="563" height="20" fill="#555"/><rect rx="0" x="61" width="502" height="20" fill="#07f"/><path fill="#07f" d="M61 0h4v20h-4z"/><rect rx="0" width="563" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="31.5" y="15" fill="#010101" fill-opacity=".3">last build</text><text x="31.5" y="14">last build</text><text x="311" y="15" fill="#010101" fill-opacity=".3">0000-00-00 00:00:00 UTC - master - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</text><text x="311" y="14">0000-00-00 00:00:00 UTC - master - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</text></g></svg>';



local.templateDocApiHtml = '\
<style>\n\
.docApiDiv {\n\
    font-family: Arial, Helvetica, sans-serif;\n\
}\n\
.docApiDiv a[href] {\n\
    color: #33f;\n\
    font-weight: bold;\n\
    text-decoration: none;\n\
}\n\
.docApiDiv a[href]:hover {\n\
    text-decoration: underline;\n\
}\n\
.docApiSectionDiv {\n\
    border-top: 1px solid;\n\
    margin-top: 20px;\n\
}\n\
.docApiCodeCommentSpan {\n\
    background: #bbf;\n\
    color: #000;\n\
    display: block;\n\
}\n\
.docApiCodeKeywordSpan {\n\
    color: #d00;\n\
    font-weight: bold;\n\
}\n\
.docApiCodePre {\n\
    background: #eef;\n\
    border: 1px solid;\n\
    color: #777;\n\
    padding: 5px;\n\
    white-space: pre-wrap;\n\
}\n\
.docApiSignatureSpan {\n\
    color: #777;\n\
    font-weight: bold;\n\
}\n\
</style>\n\
<div class="docApiDiv">\n\
<h1>api documentation\n\
    <a\n\
        {{#if env.npm_package_homepage}}\n\
        href="{{env.npm_package_homepage}}"\n\
        {{/if env.npm_package_homepage}}\n\
    >({{env.npm_package_name}} v{{env.npm_package_version}})</a>\n\
</h1>\n\
<div class="docApiSectionDiv"><a href="#"><h1>table of contents</h1></a><ul>\n\
{{#each moduleList}}\n\
    <li><a href="#{{id}}">module {{name}}</a><ol>\n\
        {{#each elementList}}\n\
        <li>\n\
            {{#if source}}\n\
            <a class="docApiElementLiA" href="#{{id}}">\n\
            {{name}}\n\
            <span class="docApiSignatureSpan">{{signature}}</span>\n\
            </a>\n\
            {{#unless source}}\n\
            <span class="docApiSignatureSpan">{{name}}</span>\n\
        {{/if source}}\n\
        </li>\n\
        {{/each elementList}}\n\
    </ol></li>\n\
{{/each moduleList}}\n\
</ul></div>\n\
    {{#each moduleList}}\n\
    <div class="docApiSectionDiv">\n\
    <h1><a href="#{{id}}" id="{{id}}">module {{name}}</a></h1>\n\
        {{#each elementList}}\n\
        {{#if source}}\n\
        <h2>\n\
            <a href="#{{id}}" id="{{id}}">\n\
            {{name}}\n\
            <span class="docApiSignatureSpan">{{signature}}</span>\n\
            </a>\n\
        </h2>\n\
        <ul>\n\
        <li>description and source code<pre class="docApiCodePre">{{source}}</pre></li>\n\
        <li>example usage<pre class="docApiCodePre">{{example}}</pre></li>\n\
        </ul>\n\
        {{/if source}}\n\
        {{/each elementList}}\n\
    </div>\n\
    {{/each moduleList}}\n\
</div>\n\
';



local.templateIndexHtml = '';



// https://img.shields.io/badge/tests_failed-999-dd0000.svg?style=flat
local.templateTestReportBadgeSvg =
'<svg xmlns="http://www.w3.org/2000/svg" width="103" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="103" height="20" fill="#555"/><rect rx="0" x="72" width="31" height="20" fill="#d00"/><path fill="#d00" d="M72 0h4v20h-4z"/><rect rx="0" width="103" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="37" y="15" fill="#010101" fill-opacity=".3">tests failed</text><text x="37" y="14">tests failed</text><text x="86.5" y="15" fill="#010101" fill-opacity=".3">999</text><text x="86.5" y="14">999</text></g></svg>';



local.templateTestReportHtml = '\
<style>\n\
/*csslint\n\
    adjoining-classes: false\n\
*/\n\
.testReportPlatformDiv {\n\
    border: 1px solid black;\n\
    font-family: Arial, Helvetica, sans-serif;\n\
    margin-top: 20px;\n\
    padding: 0 10px 10px 10px;\n\
    text-align: left;\n\
}\n\
.testReportPlatformDiv .displayNone {\n\
    display: none;\n\
}\n\
.testReportPlatformDiv img {\n\
    border: 1px solid black;\n\
    margin: 5px 0 5px 0;\n\
    max-height: 256px;\n\
    max-width: 512px;\n\
}\n\
.testReportPlatformDiv pre {\n\
    background: #fdd;\n\
    border-top: 1px solid black;\n\
    margin-bottom: 0;\n\
    padding: 10px;\n\
    white-space: pre-wrap;\n\
}\n\
.testReportPlatformDiv span {\n\
    display: inline-block;\n\
    width: 8rem;\n\
}\n\
.testReportPlatformDiv.summary {\n\
    background: #bfb;\n\
}\n\
.testReportPlatformDiv table {\n\
    border-top: 1px solid black;\n\
    text-align: left;\n\
    width: 100%;\n\
}\n\
.testReportPlatformDiv table > tbody > tr:nth-child(odd) {\n\
    background: #bfb;\n\
}\n\
.testReportPlatformDiv .testFailed {\n\
    background: #f99;\n\
}\n\
.testReportPlatformDiv .testPending {\n\
    background: #99f;\n\
}\n\
</style>\n\
<div class="testReportPlatformDiv summary">\n\
<h1>\n\
    <a\n\
        {{#if env.npm_package_homepage}}\n\
        href="{{env.npm_package_homepage}}"\n\
        {{/if env.npm_package_homepage}}\n\
    >{{env.npm_package_name}} v{{env.npm_package_version}}</a>\n\
</h1>\n\
<h2>test-report summary</h2>\n\
<h4>\n\
    <span>version</span>-\n\
        {{env.npm_package_version}}<br>\n\
    <span>test date</span>- {{date}}<br>\n\
    <span>commit info</span>-\n\
        {{#if env.CI_COMMIT_INFO}}\n\
        {{env.CI_COMMIT_INFO htmlSafe}}<br>\n\
        {{#unless env.CI_COMMIT_INFO}}\n\
        undefined<br>\n\
        {{/if env.CI_COMMIT_INFO}}\n\
</h4>\n\
<table>\n\
<thead>\n\
    <tr>\n\
        <th>total time-elapsed</th>\n\
        <th>total tests failed</th>\n\
        <th>total tests passed</th>\n\
        <th>total tests pending</th>\n\
    </tr>\n\
</thead>\n\
<tbody><tr>\n\
    <td>{{timeElapsed}} ms</td>\n\
    <td class="{{testStatusClass}}">{{testsFailed}}</td>\n\
    <td>{{testsPassed}}</td>\n\
    <td>{{testsPending}}</td>\n\
</tr></tbody>\n\
</table>\n\
</div>\n\
{{#each testPlatformList}}\n\
<div class="testReportPlatformDiv">\n\
<h4>\n\
    {{testPlatformNumber}}. {{name htmlSafe}}<br>\n\
    {{#if screenCaptureImg}}\n\
    <a href="{{screenCaptureImg}}"><img src="{{screenCaptureImg}}"></a><br>\n\
    {{/if screenCaptureImg}}\n\
    <span>time-elapsed</span>- {{timeElapsed}} ms<br>\n\
    <span>tests failed</span>- {{testsFailed}}<br>\n\
    <span>tests passed</span>- {{testsPassed}}<br>\n\
    <span>tests pending</span>- {{testsPending}}<br>\n\
</h4>\n\
<table>\n\
<thead><tr>\n\
    <th>#</th>\n\
    <th>time-elapsed</th>\n\
    <th>status</th>\n\
    <th>test-case</th>\n\
</tr></thead>\n\
<tbody>\n\
{{#each testCaseList}}\n\
<tr>\n\
    <td>{{testCaseNumber}}</td>\n\
    <td>{{timeElapsed}} ms</td>\n\
    <td class="{{testReportTestStatusClass}}">{{status}}</td>\n\
    <td>{{name}}</td>\n\
</tr>\n\
{{/each testCaseList}}\n\
</tbody>\n\
</table>\n\
<pre class="{{preClass}}">\n\
{{#each errorStackList}}\n\
{{errorStack htmlSafe}}\n\
{{/each errorStackList}}\n\
</pre>\n\
</div>\n\
{{/each testPlatformList}}\n\
';
/* jslint-ignore-end */
    }());



    // run shared js-env code - function
    (function () {
        // init lib Blob
        local.Blob = local.modeJs === 'browser'
            ? local.global.Blob
            : function (array, options) {
              /*
               * this function will return a node-compatible Blob instance
               */
                this.bff = local.bufferConcat(array);
                this.type = options && options.type;
            };

        // init lib FormData
        local.FormData = function () {
        /*
         * this function will return a serverLocal-compatible FormData instance
         * https://xhr.spec.whatwg.org/#dom-formdata
         * The FormData(form) constructor must run these steps:
         * 1. Let fd be a new FormData object.
         * 2. If form is given, set fd's entries to the result
         *    of constructing the form data set for form. (not implemented)
         * 3. Return fd.
         */
            this.entryList = [];
        };

        local.FormData.prototype.append = function (name, value, filename) {
        /*
         * https://xhr.spec.whatwg.org/#dom-formdata-append
         * The append(name, value, filename) method, when invoked, must run these steps:
         * 1. If the filename argument is given, set value to a new File object
         *    whose contents are value and name is filename.
         * 2. Append a new entry whose name is name, and value is value,
         *    to context object's list of entries.
         */
            if (filename) {
                // bug-workaround - chromium cannot assign name to Blob instance
                local.tryCatchOnError(function () {
                    value.name = filename;
                }, local.nop);
            }
            this.entryList.push({ name: name, value: value });
        };

        local.FormData.prototype.read = function (onError) {
        /*
         * https://tools.ietf.org/html/rfc7578
         * this function will read from formData as a buffer, e.g.
         * --Boundary\r\n
         * Content-Disposition: form-data; name="key"\r\n
         * \r\n
         * value\r\n
         * --Boundary\r\n
         * Content-Disposition: form-data; name="input1"; filename="file1.png"\r\n
         * Content-Type: image/jpeg\r\n
         * \r\n
         * <data1>\r\n
         * --Boundary\r\n
         * Content-Disposition: form-data; name="input2"; filename="file2.png"\r\n
         * Content-Type: image/jpeg\r\n
         * \r\n
         * <data2>\r\n
         * --Boundary--\r\n
         */
            var boundary, onParallel, result;
            // handle null-case
            if (this.entryList.length === 0) {
                onError(null, local.bufferCreate());
                return;
            }
            // init boundary
            boundary = '--' + local.uuidTimeCreate();
            // init result
            result = [];
            onParallel = local.onParallel(function (error) {
                // add closing boundary
                result.push([boundary + '--\r\n']);
                // concatenate result
                onError(
                    error,
                    // flatten result
                    !error && local.bufferConcat(Array.prototype.concat.apply([], result))
                );
            });
            onParallel.counter += 1;
            this.entryList.forEach(function (element, ii) {
                var value;
                value = element.value;
                if (!(value instanceof local.Blob)) {
                    result[ii] = [boundary + '\r\nContent-Disposition: form-data; name="' +
                        element.name + '"\r\n\r\n', value, '\r\n'];
                    return;
                }
                // read from blob in parallel
                onParallel.counter += 1;
                local.blobRead(value, 'binary', function (error, data) {
                    result[ii] = !error && [boundary +
                        '\r\nContent-Disposition: form-data; name="' + element.name + '"' +
                        // read param filename
                        (value && value.name
                            ? '; filename="' + value.name + '"'
                            : '') +
                        '\r\n' +
                        // read param Content-Type
                        (value && value.type
                            ? 'Content-Type: ' + value.type + '\r\n'
                            : '') +
                        '\r\n', data, '\r\n'];
                    onParallel(error);
                });
            });
            onParallel();
        };

        // init lib _http
        local._http = {};

        // init _http.IncomingMessage
        local._http.IncomingMessage = function (xhr) {
        /*
         * https://nodejs.org/api/all.html#all_http_incomingmessage
         * An IncomingMessage object is created by http.Server or http.ClientRequest
         * and passed as the first argument to the 'request' and 'response' event respectively
         */
            this.headers = {};
            this.httpVersion = '1.1';
            this.method = xhr.method;
            this.onEvent = document.createDocumentFragment();
            this.readable = true;
            this.url = xhr.url;
        };

        local._http.IncomingMessage.prototype.addListener = function (event, onEvent) {
        /*
         * https://nodejs.org/api/all.html#all_emitter_addlistener_event_listener
         * Adds a listener to the end of the listeners array for the specified event
         */
            this.onEvent.addEventListener(event, function (event) {
                onEvent(event.data);
            });
            if (this.readable && event === 'end') {
                this.readable = null;
                this.emit('data', this.data);
                this.emit('end');
            }
            return this;
        };

        local._http.IncomingMessage.prototype.emit = function (event, data) {
        /*
         * https://nodejs.org/api/all.html#all_emitter_emit_event_arg1_arg2
         * Calls each of the listeners in order with the supplied arguments
         */
            event = new local.global.Event(event);
            event.data = data;
            this.onEvent.dispatchEvent(event);
        };

        // https://nodejs.org/api/all.html#all_emitter_on_event_listener
        local._http.IncomingMessage.prototype.on =
            local._http.IncomingMessage.prototype.addListener;

        local._http.IncomingMessage.prototype.pipe = function (writable) {
        /*
         * https://nodejs.org/api/all.html#all_readable_pipe_destination_options
         * This method pulls all the data out of a readable stream, and writes it to the
         * supplied destination, automatically managing the flow so that the destination is not
         * overwhelmed by a fast readable stream
         */
            this.on('data', function (chunk) {
                writable.write(chunk);
            });
            this.on('end', function () {
                writable.end();
            });
            return writable;
        };

        local._http.STATUS_CODES = {
            100: 'Continue',
            101: 'Switching Protocols',
            102: 'Processing',
            200: 'OK',
            201: 'Created',
            202: 'Accepted',
            203: 'Non-Authoritative Information',
            204: 'No Content',
            205: 'Reset Content',
            206: 'Partial Content',
            207: 'Multi-Status',
            208: 'Already Reported',
            226: 'IM Used',
            300: 'Multiple Choices',
            301: 'Moved Permanently',
            302: 'Found',
            303: 'See Other',
            304: 'Not Modified',
            305: 'Use Proxy',
            307: 'Temporary Redirect',
            308: 'Permanent Redirect',
            400: 'Bad Request',
            401: 'Unauthorized',
            402: 'Payment Required',
            403: 'Forbidden',
            404: 'Not Found',
            405: 'Method Not Allowed',
            406: 'Not Acceptable',
            407: 'Proxy Authentication Required',
            408: 'Request Timeout',
            409: 'Conflict',
            410: 'Gone',
            411: 'Length Required',
            412: 'Precondition Failed',
            413: 'Payload Too Large',
            414: 'URI Too Long',
            415: 'Unsupported Media Type',
            416: 'Range Not Satisfiable',
            417: 'Expectation Failed',
            418: 'I\'m a teapot',
            421: 'Misdirected Request',
            422: 'Unprocessable Entity',
            423: 'Locked',
            424: 'Failed Dependency',
            425: 'Unordered Collection',
            426: 'Upgrade Required',
            428: 'Precondition Required',
            429: 'Too Many Requests',
            431: 'Request Header Fields Too Large',
            451: 'Unavailable For Legal Reasons',
            500: 'Internal Server Error',
            501: 'Not Implemented',
            502: 'Bad Gateway',
            503: 'Service Unavailable',
            504: 'Gateway Timeout',
            505: 'HTTP Version Not Supported',
            506: 'Variant Also Negotiates',
            507: 'Insufficient Storage',
            508: 'Loop Detected',
            509: 'Bandwidth Limit Exceeded',
            510: 'Not Extended',
            511: 'Network Authentication Required'
        };

        // init _http.ServerResponse
        local._http.ServerResponse = function (onResponse) {
        /*
         * https://nodejs.org/api/all.html#all_class_http_serverresponse
         * This object is created internally by a HTTP server--not by the user
         */
            this.chunkList = [];
            this.headers = {};
            this.onEvent = document.createDocumentFragment();
            this.onResponse = onResponse;
            this.statusCode = 200;
        };

        // https://nodejs.org/api/all.html#all_emitter_addlistener_event_listener
        local._http.ServerResponse.prototype.addListener =
            local._http.IncomingMessage.prototype.addListener;

        // https://nodejs.org/api/all.html#all_emitter_emit_event_arg1_arg2
        local._http.ServerResponse.prototype.emit =
            local._http.IncomingMessage.prototype.emit;

        local._http.ServerResponse.prototype.end = function (data) {
        /* https://nodejs.org/api/all.html#all_response_end_data_encoding_callback
         * This method signals to the server that all of the response headers
         * and body have been sent
         */
            // emit writable events
            this.chunkList.push(data || '');
            this.emit('finish');
            // emit readable events
            this.onResponse(this);
            this.emit('data', local.bufferConcat(this.chunkList));
            this.emit('end');
        };

        // https://nodejs.org/api/all.html#all_emitter_on_event_listener
        local._http.ServerResponse.prototype.on =
            local._http.IncomingMessage.prototype.addListener;

        // https://nodejs.org/api/all.html#all_response_setheader_name_value
        local._http.ServerResponse.prototype.setHeader = function (key, value) {
            this.headers[key.toLowerCase()] = value;
        };

        local._http.ServerResponse.prototype.write = function (data) {
        /*
         * https://nodejs.org/api/all.html#all_response_write_chunk_encoding_callback
         * This sends a chunk of the response body
         */
            this.chunkList.push(data);
        };

        // init _http.XMLHttpRequest
        local._http.XMLHttpRequest = function () {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#XMLHttpRequest()
         * The constructor initiates an XMLHttpRequest
         */
            var xhr;
            xhr = this;
            ['onError', 'onResponse'].forEach(function (key) {
                xhr[key] = xhr[key].bind(xhr);
            });
            xhr.headers = {};
            xhr.onLoadList = [];
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
            xhr.readyState = 0;
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response
            xhr.response = null;
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseText
            xhr.responseText = '';
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
            xhr.responseType = '';
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status
            xhr.status = xhr.statusCode = 0;
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/statusText
            xhr.statusText = '';
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout
            xhr.timeout = local.timeoutDefault;
        };

        local._http.XMLHttpRequest.prototype.abort = function () {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#abort()
         * Aborts the request if it has already been sent
         */
            this.onError(new Error('abort'));
        };

        local._http.XMLHttpRequest.prototype.addEventListener = function (event, onError) {
        /*
         * this function will add event listeners to the xhr-connection
         */
            switch (event) {
            case 'abort':
            case 'error':
            case 'load':
                this.onLoadList.push(onError);
                break;
            }
        };

        local._http.XMLHttpRequest.prototype.getAllResponseHeaders = function () {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
         * #getAllResponseHeaders()
         * Returns all the response headers, separated by CRLF, as a string,
         * or null if no response has been received
         */
            var xhr;
            xhr = this;
            return Object.keys((xhr.responseStream &&
                xhr.responseStream.headers) || {}).map(function (key) {
                return key + ': ' + xhr.responseStream.headers[key] + '\r\n';
            }).join('') + '\r\n';
        };

        local._http.XMLHttpRequest.prototype.getResponseHeader = function (key) {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#getResponseHeader()
         * Returns the string containing the text of the specified header,
         * or null if either the response has not yet been received
         * or the header doesn't exist in the response
         */
            return (this.responseStream &&
                this.responseStream.headers &&
                this.responseStream.headers[key]) || null;
        };

        local._http.XMLHttpRequest.prototype.onError = function (error, data) {
        /*
         * this function will handle the error and data passed back to the xhr-connection
         */
            if (this.done) {
                return;
            }
            this.error = error;
            this.response = data;
            // init responseText
            if (!this.responseType || this.responseType === 'text') {
                this.responseText = local.bufferToString(data);
            }
            // update xhr
            this.readyState = 4;
            this.onreadystatechange();
            // handle data
            this.onLoadList.forEach(function (onError) {
                onError({ type: error
                    ? 'error'
                    : 'load' });
            });
        };

        local._http.XMLHttpRequest.prototype.onResponse = function (responseStream) {
        /*
         * this function will handle the responseStream from the xhr-connection
         */
            this.responseStream = responseStream;
            // update xhr
            this.status = this.statusCode = this.responseStream.statusCode;
            this.statusText = local.http.STATUS_CODES[this.responseStream.statusCode] || '';
            this.readyState = 1;
            this.onreadystatechange();
            this.readyState = 2;
            this.onreadystatechange();
            this.readyState = 3;
            this.onreadystatechange();
            if (this.responseType === 'stream') {
                this.onError(null, this.responseStream);
                return;
            }
            local.streamReadAll(this.responseStream, this.onError);
        };

        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange
        local._http.XMLHttpRequest.prototype.onreadystatechange = local.nop;

        local._http.XMLHttpRequest.prototype.open = function (method, url) {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#open()
         * Initializes a request
         */
            this.method = method;
            this.url = url;
            // parse url
            this.urlParsed = local.urlParse(String(this.url));
            this.hostname = this.urlParsed.hostname;
            this.path = this.urlParsed.pathname + this.urlParsed.search;
            this.port = this.urlParsed.port;
            // init requestStream
            this.requestStream = (this.urlParsed.protocol === 'https:'
                ? local.https
                : local.http).request(this, this.onResponse)
                // handle request-error
                .on('error', this.onError);
        };

        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#overrideMimeType()
        local._http.XMLHttpRequest.prototype.overrideMimeType = local.nop;

        local._http.XMLHttpRequest.prototype.send = function (data) {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#send()
         * Sends the request
         */
            var self;
            self = this;
            self.data = data;
            // asynchronously send data
            setTimeout(function () {
                self.requestStream.end(self.data);
            });
        };

        local._http.XMLHttpRequest.prototype.setRequestHeader = function (key, value) {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#setRequestHeader()
         * Sets the value of an HTTP request header
         */
            key = key.toLowerCase();
            this.headers[key] = value;
            this.requestStream.setHeader(key, value);
        };

        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload
        local._http.XMLHttpRequest.prototype.upload = { addEventListener: local.nop };

        local._http.createServer = function () {
            /*
             * https://nodejs.org/api/all.html#all_http_createserver_requestlistener
             * Returns a new instance of http.Server
             */
            return { listen: function (port, onError) {
            /*
             * https://nodejs.org/api/all.html#all_server_listen_handle_callback
             * This will cause the server to accept connections on the specified handle,
             * but it is presumed that the file descriptor or handle has already been bound
             * to a port or domain socket
             */
                // jslint-hack
                local.nop(port);
                onError();
            } };
        };

        local._http.request = function (xhr, onResponse) {
            var self;
            self = {};
            self.end = function (data) {
                // do not run more than once
                if (self.ended) {
                    return;
                }
                self.ended = true;
                self.serverRequest.data = data;
                local.serverLocalRequestHandler(self.serverRequest, self.serverResponse);
            };
            self.on = function () {
                return self;
            };
            self.serverRequest = new local._http.IncomingMessage(xhr);
            self.serverResponse = new local._http.ServerResponse(onResponse);
            self.setHeader = function (key, value) {
                self.serverRequest.headers[key.toLowerCase()] = value;
            };
            return self;
        };

        local._middlewareJsonpStateInit = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will
         * serve the browser-state wrapped in the given jsonp-callback
         */
            var state;
            if (request._stateInit || (request.urlParsed &&
                    request.urlParsed.pathname === '/jsonp.utility2._stateInit')) {
                state = { utility2: { env: {
                    NODE_ENV: local.env.NODE_ENV,
                    npm_config_mode_backend: local.env.npm_config_mode_backend,
                    npm_config_mode_rollup: local.env.npm_config_mode_rollup,
                    npm_package_description: local.env.npm_package_description,
                    npm_package_homepage: local.env.npm_package_homepage,
                    npm_package_name: local.env.npm_package_name,
                    npm_package_nameAlias: local.env.npm_package_nameAlias,
                    npm_package_version: local.env.npm_package_version
                } } };
                if (request._stateInit) {
                    return state;
                }
                response.end(request.urlParsed.query.callback + '(' + JSON.stringify(state) +
                    ');');
                return;
            }
            nextMiddleware();
        };

        local._serverLocalUrlTest = local.nop;

        local._stateInit = function (options) {
        /*
         * this function will init the state-options
         */
            local.objectSetOverride(local, options, 10);
        };

        local._testRunBefore = local.nop;

        local.ajax = function (options, onError) {
        /*
         * this function will send an ajax-request with error-handling and timeout
         */
            var timerTimeout, tmp, xhr;
            onError = local.onErrorWithStack(onError);
            // init modeServerLocal
            if (!local.env.npm_config_mode_backend && local._serverLocalUrlTest(options.url)) {
                xhr = new local._http.XMLHttpRequest();
            }
            // init xhr
            xhr = xhr || (local.modeJs === 'browser'
                ? new local.global.XMLHttpRequest()
                : new local._http.XMLHttpRequest());
            // debug xhr
            local._debugXhr = xhr;
            // init options
            local.objectSetOverride(xhr, options);
            // init headers
            xhr.headers = {};
            Object.keys(options.headers || {}).forEach(function (key) {
                xhr.headers[key.toLowerCase()] = options.headers[key];
            });
            // init method
            xhr.method = xhr.method || 'GET';
            // init timeout
            xhr.timeout = xhr.timeout || local.timeoutDefault;
            // init timerTimeout
            timerTimeout = local.onTimeout(function (error) {
                xhr.error = xhr.error || error;
                xhr.abort();
                // cleanup requestStream and responseStream
                local.requestResponseCleanup(xhr.requestStream, xhr.responseStream);
            }, xhr.timeout, 'ajax ' + xhr.method + ' ' + xhr.url);
            // init event handling
            xhr.onEvent = function (event) {
                // init statusCode
                xhr.statusCode = xhr.status;
                switch (event.type) {
                case 'abort':
                case 'error':
                case 'load':
                    // do not run more than once
                    if (xhr.done) {
                        return;
                    }
                    xhr.done = true;
                    // cleanup timerTimeout
                    clearTimeout(timerTimeout);
                    // cleanup requestStream and responseStream
                    setTimeout(function () {
                        local.requestResponseCleanup(xhr.requestStream, xhr.responseStream);
                    });
                    // decrement ajaxProgressCounter
                    local.ajaxProgressCounter -= 1;
                    // handle abort or error event
                    if (!xhr.error &&
                            (event.type === 'abort' ||
                            event.type === 'error' ||
                            xhr.statusCode >= 400)) {
                        xhr.error = new Error(event.type);
                    }
                    // handle completed xhr request
                    if (xhr.readyState === 4) {
                        // handle string data
                        if (xhr.error) {
                            // debug statusCode
                            xhr.error.statusCode = xhr.statusCode;
                            // debug statusCode / method / url
                            tmp = local.modeJs + ' - ' + xhr.statusCode + ' ' + xhr.method +
                                ' ' + xhr.url + '\n';
                            // try to debug responseText
                            local.tryCatchOnError(function () {
                                tmp += '    ' + JSON.stringify(xhr.responseText.slice(0, 256) +
                                    '...') + '\n';
                            }, local.nop);
                            local.errorMessagePrepend(xhr.error, tmp);
                        }
                    }
                    onError(xhr.error, xhr);
                    break;
                }
                local.ajaxProgressUpdate();
            };
            // increment ajaxProgressCounter
            local.ajaxProgressCounter += 1;
            xhr.addEventListener('abort', xhr.onEvent);
            xhr.addEventListener('error', xhr.onEvent);
            xhr.addEventListener('load', xhr.onEvent);
            xhr.addEventListener('loadstart', local.ajaxProgressUpdate);
            xhr.addEventListener('progress', local.ajaxProgressUpdate);
            xhr.upload.addEventListener('progress', local.ajaxProgressUpdate);
            // open url
            xhr.open(xhr.method, xhr.url);
            // set request-headers
            Object.keys(xhr.headers).forEach(function (key) {
                xhr.setRequestHeader(key, xhr.headers[key]);
            });
            if (xhr.data instanceof local.FormData) {
                // handle formData
                xhr.data.read(function (error, data) {
                    if (error) {
                        xhr.error = xhr.error || error;
                        xhr.onEvent({ type: 'error' });
                        return;
                    }
                    // send data
                    xhr.send(local.bufferToNodeBuffer(data));
                });
            } else {
                // send data
                xhr.send(local.bufferToNodeBuffer(xhr.data));
            }
            return xhr;
        };

        local.ajaxProgressUpdate = function () {
        /*
         * this function will update ajaxProgress
         */
            var ajaxProgressDiv1;
            ajaxProgressDiv1 = local.modeJs === 'browser' &&
                document.querySelector('#ajaxProgressDiv1');
            if (!ajaxProgressDiv1) {
                return;
            }
            // init ajaxProgressDiv1StyleBackground
            local.ajaxProgressDiv1StyleBackground = local.ajaxProgressDiv1StyleBackground ||
                ajaxProgressDiv1.style.background;
            // show ajaxProgress
            if (ajaxProgressDiv1.style.background === 'transparent') {
                ajaxProgressDiv1.style.background = local.ajaxProgressDiv1StyleBackground;
            }
            // cleanup timerTimeout
            clearTimeout(local.timerTimeoutAjaxProgressHide);
            // increment ajaxProgress
            if (local.ajaxProgressCounter > 0) {
                // this algorithm will indefinitely increment the ajaxProgressBar
                // with successively smaller increments without ever reaching 100%
                local.ajaxProgressState += 1;
                ajaxProgressDiv1.style.width =
                    100 - 75 * Math.exp(-0.125 * local.ajaxProgressState) + '%';
                return;
            }
            // finish ajaxProgress
            ajaxProgressDiv1.style.width = '100%';
            // hide ajaxProgress
            local.timerTimeoutAjaxProgressHide = setTimeout(function () {
                ajaxProgressDiv1.style.background = 'transparent';
                // reset ajaxProgress
                setTimeout(function () {
                    local.ajaxProgressCounter = 0;
                    local.ajaxProgressState = 0;
                    ajaxProgressDiv1.style.width = '25%';
                }, 500);
            }, 1500);
        };

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

        local.assertJsonEqual = function (aa, bb) {
        /*
         * this function will assert
         * utility2.jsonStringifyOrdered(aa) === JSON.stringify(bb)
         */
            aa = local.jsonStringifyOrdered(aa);
            bb = JSON.stringify(bb);
            local.assert(aa === bb, [aa, bb]);
        };

        local.assertJsonNotEqual = function (aa, bb) {
        /*
         * this function will assert
         * utility2.jsonStringifyOrdered(aa) !== JSON.stringify(bb)
         */
            aa = local.jsonStringifyOrdered(aa);
            bb = JSON.stringify(bb);
            local.assert(aa !== bb, [aa, bb]);
        };

        local.assetsWrite = function (file, data) {
        /*
         * this function will write the data to the asset-file,
         * and if $NODE_ENV === production, create an uglified asset-file as well
         *
         */
            local.assetsDict[file] = data;
            // create uglified asset-file
            file = file.split('.');
            switch (typeof data === 'string' &&
                file.length >= 2 &&
                file[file.length - 2] !== 'min' &&
                file[file.length - 1]) {
            // case 'css':
            case 'js':
                file.splice(-1, 0, 'min');
                file = file.join('.');
                local.tryCatchOnError(function () {
                    local.assetsDict[file] = local.env.NODE_ENV === 'production'
                        ? local.uglify(data)
                        : data;
                }, local.nop);
                break;
            }
        };

        local.blobRead = function (blob, encoding, onError) {
        /*
         * this function will read from the blob with the given encoding
         * possible encodings are:
         * - Uint8Array (default)
         * - dataURL
         * - text
         */
            var data, done, reader;
            if (local.modeJs === 'node') {
                switch (encoding) {
                // readAsDataURL
                case 'dataURL':
                    data = 'data:' + (blob.type || '') + ';base64,' +
                        local.bufferToString(blob.bff, 'base64');
                    break;
                // readAsText
                case 'text':
                    data = local.bufferToString(blob.bff);
                    break;
                // readAsArrayBuffer
                default:
                    data = local.bufferCreate(blob.bff);
                }
                onError(null, data);
                return;
            }
            reader = new local.global.FileReader();
            reader.onabort = reader.onerror = reader.onload = function (event) {
                if (done) {
                    return;
                }
                done = true;
                switch (event.type) {
                case 'abort':
                case 'error':
                    onError(new Error('blobRead - ' + event.type));
                    break;
                case 'load':
                    onError(null, reader.result instanceof local.global.ArrayBuffer
                        // convert ArrayBuffer to Uint8Array
                        ? local.bufferCreate(reader.result)
                        : reader.result);
                    break;
                }
            };
            switch (encoding) {
            // readAsDataURL
            case 'dataURL':
                reader.readAsDataURL(blob);
                break;
            // readAsText
            case 'text':
                reader.readAsText(blob);
                break;
            // readAsArrayBuffer
            default:
                reader.readAsArrayBuffer(blob);
            }
        };

        /* istanbul ignore next */
        local.browserTest = function (options, onError) {
        /*
         * this function will spawn an electron process to test options.url
         */
            var done, modeNext, onNext, onParallel, timerTimeout;
            if (local.modeJs === 'node') {
                local.objectSetDefault(options, local.env);
                options.timeoutDefault = options.timeoutDefault || local.timeoutDefault;
            }
            modeNext = Number(options.modeNext || 0);
            onNext = function (error, data) {
                modeNext = error instanceof Error
                    ? Infinity
                    : modeNext + 1;
                switch (modeNext) {
                // run node code
                case 1:
                    // init options
                    options.testName = local.env.MODE_BUILD + '.browser.' +
                        encodeURIComponent(local.urlParse(options.url).pathname);
                    local.objectSetDefault(options, {
                        fileCoverage: local.env.npm_config_dir_tmp +
                            '/coverage.' + options.testName + '.json',
                        fileScreenCapture: (local.env.npm_config_dir_build +
                            '/screen-capture.' + options.testName + '.png')
                            .replace((/%/g), '_')
                            .replace((/_2F\.png$/), '.png'),
                        fileTestReport: local.env.npm_config_dir_tmp +
                            '/test-report.' + options.testName + '.json',
                        modeBrowserTest: 'test',
                        timeExit: Date.now() + options.timeoutDefault
                    }, 1);
                    // init timerTimeout
                    timerTimeout = local.onTimeout(
                        onNext,
                        options.timeoutDefault,
                        options.testName
                    );
                    // init file urlBrowser
                    options.modeNext = 20;
                    options.urlBrowser = local.env.npm_config_dir_tmp +
                        '/electron.' + local.uuidTimeCreate() + '.html';
                    local.fsWriteFileWithMkdirpSync(options.urlBrowser, '<style>body {' +
                            'border: 1px solid black;' +
                            'margin: 0;' +
                            'padding: 0;' +
                        '}</style>' +
                        '<webview id=webview1 src="' +
                        options.url.replace('{{timeExit}}', options.timeExit) +
                        '" style="' +
                            'border: none;' +
                            'height: 100%;' +
                            'margin: 0;' +
                            'padding: 0;' +
                            'width: 100%;' +
                        '"></webview>' +
                        '<script>window.local = {}; (' + local.browserTest
                            .toString()
                            .replace((/<\//g), '<\\/')
                            // coverage-hack - un-instrument
                            .replace((/\b__cov_.*?\+\+/g), '0') +
                        '(' + JSON.stringify(options) + '))</script>');
                    console.log('\nbrowserTest - created electron entry-page ' +
                        options.urlBrowser + '\n');
                    // spawn an electron process to test a url
                    options.modeNext = 10;
                    local.processSpawnWithTimeout('electron', [
                        __filename,
                        'browserTest',
                        '--disable-overlay-scrollbar',
                        '--enable-logging'
                    ], {
                        env: local.jsonCopy(options),
                        stdio: options.modeSilent
                            ? 'ignore'
                            : ['ignore', 1, 2]
                    }).once('exit', onNext);
                    break;
                case 2:
                    console.log('\nbrowserTest - exit-code ' + error + ' - ' + options.url +
                        '\n');
                    // merge browser coverage
                    if (options.modeCoverageMerge) {
                        // try to JSON.parse the string
                        local.tryCatchOnError(function () {
                            data = JSON.parse(
                                local.fs.readFileSync(options.fileCoverage, 'utf8')
                            );
                        }, local.nop);
                        if (!local._debugTryCatchErrorCaught) {
                            local.istanbulCoverageMerge(local.global.__coverage__, data);
                            console.log('\nbrowserTest - merged coverage from ' +
                                options.fileCoverage + '\n');
                        }
                    }
                    if (options.modeBrowserTest !== 'test') {
                        modeNext = Infinity;
                        onNext();
                        return;
                    }
                    // try to merge browser test-report
                    local.tryCatchOnError(function () {
                        data = JSON.parse(
                            local.fs.readFileSync(options.fileTestReport, 'utf8')
                        );
                    }, local.nop);
                    if (local._debugTryCatchErrorCaught) {
                        onNext(local._debugTryCatchErrorCaught);
                        return;
                    }
                    console.log('\nbrowserTest - merging test-report from ' +
                        options.fileTestReport + '\n');
                    if (!options.modeTestIgnore) {
                        local.testReportMerge(local.testReport, data);
                    }
                    // create test-report.json
                    local.fs.writeFileSync(
                        local.env.npm_config_dir_build + '/test-report.json',
                        JSON.stringify(local.testReport)
                    );
                    onNext(data && data.testsFailed && new Error(data.testsFailed));
                    break;
                // run electron-node code
                case 11:
                    // handle uncaughtexception
                    process.once('uncaughtException', onNext);
                    // wait for electron to init
                    require('electron').app.once('ready', onNext);
                    break;
                case 12:
                    options.BrowserWindow = require('electron').BrowserWindow;
                    local.objectSetDefault(
                        options,
                        { frame: false, height: 768, width: 1024, x: 0, y: 0 }
                    );
                    // init browserWindow
                    options.browserWindow = new options.BrowserWindow(options);
                    options.browserWindow.once('page-title-updated', onNext);
                    // load url in browserWindow
                    options.browserWindow.loadURL('file://' + options.urlBrowser);
                    break;
                case 13:
                    console.log('\nbrowserTest - opened url ' + options.url + '\n');
                    onParallel = local.onParallel(onNext);
                    onParallel.counter += 1;
                    if (options.modeBrowserTest === 'test') {
                        onParallel.counter += 1;
                        options.browserWindow.once('page-title-updated', function () {
                            onParallel();
                        });
                    }
                    onParallel.counter += 1;
                    setTimeout(function () {
                        options.browserWindow.capturePage(options, function (data) {
                            local.fs.writeFileSync(options.fileScreenCapture, data.toPng());
                            console.log('\nbrowserTest - created screen-capture file://' +
                                options.fileScreenCapture + '\n');
                            onParallel();
                        });
                    }, Number(options.timeoutScreenCapture || 5000));
                    onParallel();
                    break;
                // run electron-browser code
                case 21:
                    options.fs = require('fs');
                    options.webview1 = document.querySelector('#webview1');
                    options.webview1.addEventListener('did-get-response-details', function () {
                        document.title = 'opened ' + location.href;
                    });
                    options.webview1.addEventListener('console-message', function (event) {
                        try {
                            options.global_test_results = event.message
                                .indexOf('{"global_test_results":{') === 0 &&
                                JSON.parse(event.message).global_test_results;
                            if (options.global_test_results.testReport) {
                                // merge screen-capture into test-report
                                options.global_test_results.testReport.testPlatformList[
                                    0
                                ].screenCaptureImg =
                                    options.fileScreenCapture.replace((/.*\//), '');
                                // save browser test-report
                                options.fs.writeFileSync(
                                    options.fileTestReport,
                                    JSON.stringify(options.global_test_results.testReport)
                                );
                                // save browser coverage
                                if (options.global_test_results.coverage) {
                                    require('fs').writeFileSync(
                                        options.fileCoverage,
                                        JSON.stringify(options.global_test_results.coverage)
                                    );
                                }
                                document.title = 'testReport written';
                                return;
                            }
                        } catch (errorCaught) {
                            console.error(errorCaught.stack);
                        }
                        console.log(event.message);
                    });
                    break;
                default:
                    if (done) {
                        return;
                    }
                    done = true;
                    // cleanup timerTimeout
                    clearTimeout(timerTimeout);
                    onError(error);
                }
            };
            onNext();
        };

        local.bufferConcat = function (bufferList) {
        /*
         * this function will emulate node's Buffer.concat for Uint8Array in the browser
         */
            var ii, jj, length, result;
            length = 0;
            bufferList = bufferList
                .filter(function (element) {
                    return element || element === 0;
                })
                .map(function (element) {
                    // convert number to string
                    if (typeof element === 'number') {
                        element = String(element);
                    }
                    // convert non-Uint8Array to Uint8Array
                    element = local.bufferCreateIfNotBuffer(element);
                    length += element.length;
                    return element;
                });
            result = local.bufferCreate(length);
            ii = 0;
            bufferList.forEach(function (element) {
                for (jj = 0; jj < element.length; ii += 1, jj += 1) {
                    result[ii] = element[jj];
                }
            });
            return result;
        };

        local.bufferCreate = function (text, encoding) {
        /*
         * this function will return a Uint8Array from the text,
         * with either 'utf8' (default) or 'base64' encoding
         */
            if (typeof text === 'string') {
                if (encoding === 'base64') {
                    return local.bufferFromBase64(text);
                }
                if (local.modeJs === 'node') {
                    return new Buffer(text);
                }
                if (local.global.TextEncoder) {
                    return new local.global.TextEncoder('utf-8').encode(text);
                }
// bug-workaround - TextEncoder.encode polyfill
/* jslint-ignore-begin */
// utility2-uglifyjs https://github.com/feross/buffer/blob/v4.9.1/index.js#L1670
/* istanbul ignore next */
function utf8ToBytes(e,t){t=t||Infinity;var n,r=e.length,i=null,s=[];for(var o=0
;o<r;++o){n=e.charCodeAt(o);if(n>55295&&n<57344){if(!i){if(n>56319){(t-=3)>-1&&s
.push(239,191,189);continue}if(o+1===r){(t-=3)>-1&&s.push(239,191,189);continue}
i=n;continue}if(n<56320){(t-=3)>-1&&s.push(239,191,189),i=n;continue}n=(i-55296<<10|
n-56320)+65536}else i&&(t-=3)>-1&&s.push(239,191,189);i=null;if(n<128){if((t-=1)<0
)break;s.push(n)}else if(n<2048){if((t-=2)<0)break;s.push(n>>6|192,n&63|128)}else if(
n<65536){if((t-=3)<0)break;s.push(n>>12|224,n>>6&63|128,n&63|128)}else{if(!(n<1114112
))throw new Error("Invalid code point");if((t-=4)<0)break;s.push(n>>18|240,n>>12&63|128
,n>>6&63|128,n&63|128)}}return s}
return new local.global.Uint8Array(utf8ToBytes(text));
/* jslint-ignore-end */
            }
            return new local.global.Uint8Array(text);
        };

        local.bufferCreateIfNotBuffer = function (text, encoding) {
        /*
         * this function will return a Uint8Array from the text with the given encoding,
         * if it is not already a Uint8Array
         */
            return text instanceof local.global.Uint8Array
                ? text
                : local.bufferCreate(text, encoding);
        };

        /* jslint-ignore-begin */
        local.bufferFromBase64 = function (text) {
        /*
         * https://gist.github.com/wang-bin/7332335
         * this function will convert the base64-encoded text to a Uint8Array
         */
            var de = new Uint8Array(text.length); //3/4
            var u = 0, q = '', x = '', c;
            var map64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            for (var r=0; c=text[x++]; ~c&&(u=q%4?u*64+c:c,q++%4)?de[r++]=(255&u>>(-2*q&6)):0)
                c = map64.indexOf(c);
            return de.subarray(0, r);
        };
        /* jslint-ignore-end */

        local.bufferIndexOfSubBuffer = function (bff, subBff, fromIndex) {
        /*
         * this function will search bff for the indexOf-like position of the subBff
         */
            var ii, jj, kk;
            for (ii = fromIndex || 0; ii < bff.length; ii += 1) {
                for (jj = 0, kk = ii; jj < subBff.length; jj += 1, kk += 1) {
                    if (subBff[jj] !== bff[kk]) {
                        break;
                    }
                }
                if (jj === subBff.length) {
                    return kk - jj;
                }
            }
            return subBff.length && -1;
        };

        local.bufferToBase64 = function (bff) {
        /*
         * https://developer.mozilla.org/en-US/Add-ons/Code_snippets/StringView#The_code
         * this function will convert the Uint8Array bff to a base64-encoded text
         */
            var ii, mod3, text, uint24, uint6ToB64;
            text = '';
            uint24 = 0;
            uint6ToB64 = function (uint6) {
                return uint6 < 26
                    ? uint6 + 65
                    : uint6 < 52
                    ? uint6 + 71
                    : uint6 < 62
                    ? uint6 - 4
                    : uint6 === 62
                    ? 43
                    : 47;
            };
            for (ii = 0; ii < bff.length; ii += 1) {
                mod3 = ii % 3;
                uint24 |= bff[ii] << (16 >>> mod3 & 24);
                if (mod3 === 2 || bff.length - ii === 1) {
                    text += String.fromCharCode(
                        uint6ToB64(uint24 >>> 18 & 63),
                        uint6ToB64(uint24 >>> 12 & 63),
                        uint6ToB64(uint24 >>> 6 & 63),
                        uint6ToB64(uint24 & 63)
                    );
                    uint24 = 0;
                }
            }
            return text.replace(/A(?=A$|$)/g, '=');
        };

        local.bufferToNodeBuffer = function (bff) {
        /*
         * this function will convert the Uint8Array instance to a node Buffer instance
         */
            if (local.modeJs === 'node' &&
                    bff instanceof local.global.Uint8Array && (!Buffer.isBuffer(bff))) {
                Object.setPrototypeOf(bff, Buffer.prototype);
            }
            return bff;
        };

        local.bufferToString = function (bff, encoding) {
        /*
         * this function will convert the Uint8Array bff to a string,
         * with either 'utf8' (default) or 'base64' encoding
         */
            if (typeof bff === 'string') {
                return bff;
            }
            bff = local.bufferCreateIfNotBuffer(bff);
            if (encoding === 'base64') {
                return local.bufferToBase64(bff);
            }
            if (local.modeJs === 'node') {
                return new Buffer(bff).toString();
            }
            if (local.global.TextDecoder) {
                return new local.global.TextDecoder('utf-8').decode(bff);
            }
// bug-workaround - TextDecoder.decode polyfill
/* jslint-ignore-begin */
// http://stackoverflow.com/questions/17191945/conversion-between-utf-8-arraybuffer-and-string
function Utf8ArrayToStr(e){var t,n,r,i,s,o;t="",r=e.length,n=0;while(n<r){i=e[n++
];switch(i>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:t+=String
.fromCharCode(i);break;case 12:case 13:s=e[n++],t+=String.fromCharCode((i&31)<<6|
s&63);break;case 14:s=e[n++],o=e[n++],t+=String.fromCharCode((i&15)<<12|(s&63)<<6|
(o&63)<<0)}}return t}
return Utf8ArrayToStr(bff);
/* jslint-ignore-end */
        };

        local.buildApp = function (optionsList, onError) {
        /*
         * this function will build the app
         */
            var onParallel;
            onParallel = local.onParallel(onError);
            onParallel.counter += 1;
            optionsList = optionsList.concat({
                file: '/assets.' + local.env.npm_package_nameAlias + '.css',
                url: '/assets.' + local.env.npm_package_nameAlias + '.css'
            }, {
                file: '/assets.' + local.env.npm_package_nameAlias + '.js',
                url: '/assets.' + local.env.npm_package_nameAlias + '.js'
            }, {
                file: '/assets.app.js',
                url: '/assets.app.js'
            }, {
                file: '/assets.example.js',
                url: '/assets.example.js'
            }, {
                file: '/assets.test.js',
                url: '/assets.test.js'
            }, {
                file: '/assets.utility2.rollup.js',
                url: '/assets.utility2.rollup.js'
            }, {
                file: '/index.html',
                url: '/index.html'
            }, {
                file: '/jsonp.utility2._stateInit',
                url: '/jsonp.utility2._stateInit?callback=window.utility2._stateInit'
            });
            optionsList.forEach(function (options) {
                // get uglified file
                switch (local.path.extname(options.file)) {
                // case '.css':
                case '.js':
                    optionsList.push({
                        file: options.file.replace((/(\.\w+$)/), '.min$1'),
                        url: options.url.replace((/(\.\w+$)/), '.min$1')
                    });
                    break;
                }
            });
            optionsList.forEach(function (options) {
                onParallel.counter += 1;
                local.ajax(options, function (error, xhr) {
                    if (error && (/\.min\.(?:css|js)$/).test(options.file)) {
                        onParallel();
                        return;
                    }
                    // validate no error occurred
                    local.assert(!error, error);
                    switch (local.path.extname(options.file)) {
                    case '.css':
                    case '.js':
                    case '.json':
                        local.jslintAndPrintConditional(xhr.responseText, options.file);
                        // validate no error occurred
                        local.assert(!local.jslint.errorText, local.jslint.errorText);
                        break;
                    }
                    local.fsWriteFileWithMkdirpSync(
                        local.env.npm_config_dir_build + '/app' + options.file,
                        new Buffer(xhr.response)
                    );
                    onParallel();
                });
            });
            // test assets.app.js
            onParallel.counter += 1;
            local.fs.writeFileSync(
                local.env.npm_config_dir_tmp + '/assets.app.js',
                local.assetsDict['/assets.app.js']
            );
            local.processSpawnWithTimeout(
                process.argv[0],
                ['assets.app.js'],
                {
                    cwd: local.env.npm_config_dir_tmp,
                    env: {
                        PORT: (Math.random() * 0x10000) | 0x8000,
                        npm_config_timeout_exit: 5000
                    },
                    stdio: ['ignore', 1, 2]
                }
            )
                .once('error', onParallel)
                .once('exit', function (exitCode) {
                    // validate exitCode
                    local.assert(!exitCode, exitCode);
                    onParallel();
                });
            onParallel();
        };

        /* istanbul ignore next */
        local.buildDoc = function (options, onError) {
        /*
         * this function will build the doc
         */
            if (local.env.npm_config_mode_coverage === 'all') {
                onError();
                return;
            }
            // init moduleDict
            local.objectSetDefault(options, local.objectLiteralize({
                exampleFileList: ['README.md', 'test.js', local.env.npm_package_main + '.js'],
                moduleDict: {
                    '$[]': [local.env.npm_package_nameAlias, {
                        exampleFileList: [],
                        exports: global.utility2_moduleExports
                    }]
                }
            }), 2);
            // init moduleDict.*.prototype
            options.moduleExports = options.moduleDict[local.env.npm_package_nameAlias].exports;
            Object.keys(options.moduleExports).forEach(function (key) {
                if ((/[A-Z]/).test(key[0]) &&
                        options.moduleExports[key] &&
                        options.moduleExports[key].prototype &&
                        options.moduleExports[key] !== local.global.utility2_apiDict[key]) {
                    options.moduleDict[
                        local.env.npm_package_nameAlias + '.' + key + '.prototype'
                    ] = options.moduleDict[
                        local.env.npm_package_nameAlias + '.' + key + '.prototype'
                    ] || {
                        exampleFileList: [],
                        exports: options.moduleExports[key].prototype
                    };
                }
            });
            // init moduleDict.example
            Object.keys(options.moduleDict).forEach(function (key) {
                options.moduleDict[key].example =
                    options.moduleDict[key].exampleFileList
                    .concat(options.exampleFileList)
                    .map(function (file) {
                        return '\n\n\n\n\n\n\n\n' +
                            local.fs.readFileSync(process.cwd() + '/' + file, 'utf8') +
                            '\n\n\n\n\n\n\n\n';
                    }).join('');
            });
            // create doc.api.html
            local.fsWriteFileWithMkdirpSync(
                local.env.npm_config_dir_build + '/doc.api.html',
                local.docApiCreate(options)
            );
            console.log('created documentation file://' + local.env.npm_config_dir_build +
                '/doc.api.html\n');
            local.browserTest({
                modeBrowserTest: 'screenCapture',
                url: 'file://' + local.env.npm_config_dir_build + '/doc.api.html'
            }, onError);
        };

        local.cookieDict = function () {
        /*
         * this function will return a dict of all cookies
         */
            var result;
            result = {};
            document.cookie.replace((/(\w+)=([^;]*)/g), function (match0, match1, match2) {
                // jslint-hack
                local.nop(match0);
                result[match1] = match2;
            });
            return result;
        };

        local.cookieRemove = function (name) {
        /*
         * this function will remove the cookie with the given name
         */
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        };

        local.cookieRemoveAll = function () {
        /*
         * this function will remove all cookies
         */
            document.cookie.replace((/(\w+)=/g), function (match0, match1) {
                // jslint-hack
                local.nop(match0);
                document.cookie = match1 + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            });
        };

        local.cookieSet = function (name, value, expiresOffset) {
        /*
         * this function will set the cookie with the given name, value,
         * and expiresOffset (in ms)
         */
            var tmp;
            tmp = name + '=' + value + '; expires=' +
                new Date(Date.now() + expiresOffset).toUTCString();
            document.cookie = tmp;
            return tmp;
        };

        local.docApiCreate = function (options) {
        /*
         * this function will return an html api-doc from the given options
         */
            var element, elementCreate, elementName, module, tmp, trimLeft;
            elementCreate = function () {
                element = {};
                element.moduleName = module.name.split('.');
                // handle case where module.exports is a function
                if (element.moduleName.slice(-1)[0] === elementName) {
                    element.moduleName.pop();
                }
                element.moduleName = element.moduleName.join('.');
                element.id = encodeURIComponent('element.' + module.name + '.' + elementName);
                element.typeof = typeof module.exports[elementName];
                element.name = (element.typeof + ' <span class="docApiSignatureSpan">' +
                    element.moduleName + '.</span>' + elementName)
                    // handle case where module.exports is a function
                    .replace('>.<', '');
                if (element.typeof !== 'function') {
                    return element;
                }
                // init source
                element.source = trimLeft(module.exports[elementName].toString());
                if (element.source.length > 4096) {
                    element.source = element.source.slice(0, 4096).trimRight() + ' ...';
                }
                element.source = local.stringHtmlSafe(element.source)
                    .replace((/\([\S\s]*?\)/), function (match0) {
                        // init signature
                        element.signature = match0
                            .replace((/ *?\/\*[\S\s]*?\*\/ */g), '')
                            .replace((/,/g), ',\n');
                        return element.signature;
                    })
                    .replace(
                        (/( *?\/\*[\S\s]*?\*\/\n)/),
                        '<span class="docApiCodeCommentSpan">$1</span>'
                    )
                    .replace((/^function \(/), elementName + ' = function (');
                // init example
                [
                    '\\b' + element.moduleName,
                    '\\.',
                    '\\b'
                ].some(function (prefix) {
                    module.example.replace(
                        new RegExp('((?:\n.*?){8}' +
                            prefix + ')(' + elementName + ')(\\((?:.*?\n){8})'),
                        function (match0, match1, match2, match3) {
                            // jslint-hack
                            local.nop(match0);
                            if ((/\b(?:JSON\.|function )$/).test(match1)) {
                                return;
                            }
                            element.example = '...' + trimLeft(local.stringHtmlSafe(match1) +
                                '<span class="docApiCodeKeywordSpan">' + match2 + '</span>' +
                                local.stringHtmlSafe(match3)).trimRight() + '\n...';
                        }
                    );
                    return element.example;
                });
                element.example = element.example || 'n/a';
                return element;
            };
            trimLeft = function (text) {
                /*
                 * this function will normalize the whitespace around the text
                 */
                tmp = '';
                text.trim().replace((/^ */gm), function (match0) {
                    if (!tmp || match0.length < tmp.length) {
                        tmp = match0;
                    }
                });
                text = text.replace(new RegExp('^' + tmp, 'gm'), '');
                // enforce 128 character column limit
                while ((/^.{128}[^\\\n]/m).test(text)) {
                    text = text.replace((/^(.{128})([^\\\n]+)/gm), '$1\\\n$2');
                }
                return text;
            };
            options.moduleList = Object.keys(options.moduleDict)
                .sort()
                .map(function (key) {
                    module = local.objectSetDefault(options.moduleDict[key], {
                        example: '',
                        name: key
                    });
                    // handle case where module.exports is a function
                    if (typeof module.exports === 'function') {
                        tmp = module.exports;
                        module.exports = {};
                        module.exports[module.name.split('.').slice(-1)[0]] = tmp;
                        Object.keys(tmp).forEach(function (key) {
                            module.exports[key] = tmp[key];
                        });
                    }
                    return {
                        elementList: Object.keys(module.exports)
                            .filter(function (key) {
                                return local.tryCatchOnError(function () {
                                    return key && key[0] !== '_' &&
                                        !(/\W/).test(key) &&
                                        key.indexOf('testCase_') !== 0 &&
                                        (module.exports === local || module.exports[key] !==
                                            local.global.utility2_apiDict[key]);
                                }, local.nop);
                            })
                            .map(function (key) {
                                elementName = key;
                                return elementCreate();
                            })
                            .sort(function (aa, bb) {
                                return aa.name > bb.name
                                    ? 1
                                    : -1;
                            }),
                        id: 'module.' + module.name,
                        name: module.name
                    };
                });
            options.env = local.env;
            return local.templateRender(local.templateDocApiHtml, options);
        };

        local.domFragmentRender = function (template, dict) {
        /*
         * this function will return a dom-fragment rendered from the givent template and dict
         */
            var tmp;
            tmp = document.createElement('template');
            tmp.innerHTML = local.templateRender(template, dict);
            return tmp.content;
        };

        local.domQuerySelectorAll = function (element, selectors) {
        /*
         * this function will return the list of query-selected dom-elements,
         * as a javascript-array
         */
            return Array.from((element.length === 1
                // handle jQuery element
                ? element[0]
                : element).querySelectorAll(selectors));
        };

        local.echo = function (arg) {
        /*
         * this function will return the arg
         */
            return arg;
        };

        local.errorMessagePrepend = function (error, message) {
        /*
         * this function will prepend the message to error.message and error.stack
         */
            error.message = message + error.message;
            error.stack = message + error.stack;
            return error;
        };

        local.exit = function (exitCode) {
        /*
         * this function will exit the current process with the given exitCode
         */
            exitCode = !exitCode || Number(exitCode) === 0
                ? 0
                : Number(exitCode) || 1;
            switch (local.modeJs) {
            case 'browser':
                console.log(JSON.stringify({
                    global_test_results: local.global.global_test_results
                }));
                break;
            case 'node':
                process.exit(exitCode);
                break;
            }
            // reset modeTest
            local.modeTest = null;
        };

        local.fsRmrSync = function (dir) {
        /*
         * this function will synchronously 'rm -fr' the dir
         */
            local.child_process.spawnSync(
                'rm',
                ['-fr', local.path.resolve(process.cwd(), dir)],
                { stdio: ['ignore', 1, 2] }
            );
        };

        local.fsWriteFileWithMkdirpSync = function (file, data) {
        /*
         * this function will synchronously 'mkdir -p' and write the data to file
         */
            // try to write to file
            try {
                require('fs').writeFileSync(file, data);
            } catch (errorCaught) {
                // mkdir -p
                require('child_process').spawnSync(
                    'mkdir',
                    ['-p', require('path').dirname(file)],
                    { stdio: ['ignore', 1, 2] }
                );
                // re-write to file
                require('fs').writeFileSync(file, data);
            }
        };

        local.isNullOrUndefined = function (arg) {
        /*
         * this function will test if the arg is null or undefined
         */
            return arg === null || arg === undefined;
        };

        // init istanbulCoverageMerge
        local.istanbulCoverageMerge = local.istanbul.coverageMerge || local.echo;

        // init istanbulCoverageMerge
        local.istanbulCoverageMerge = local.istanbul.coverageMerge || local.echo;

        // init istanbulCoverageReportCreate
        local.istanbulCoverageReportCreate = local.istanbul.coverageReportCreate || local.echo;

        // init istanbulInstrumentInPackage
        local.istanbulInstrumentInPackage = local.istanbul.instrumentInPackage || local.echo;

        // init istanbulInstrumentSync
        local.istanbulInstrumentSync = local.istanbul.instrumentSync || local.echo;

        // init jslintAndPrint
        local.jslintAndPrint = local.jslint.jslintAndPrint || local.echo;

        local.jslintAndPrintConditional = function (script, file, mode) {
        /*
         * this function will jslint / csslint the script and print any errors to stderr,
         * conditionally
         */
            var extname;
            // cleanup errors
            local.jslint.errorCounter = 0;
            local.jslint.errorText = '';
            extname = (/\.\w+$/).exec(file);
            extname = extname && extname[0];
            switch (extname) {
            case '.css':
                if (script.indexOf('/*csslint') < 0 && mode !== 'force') {
                    return script;
                }
                break;
            case '.js':
                if ((script.indexOf('/*jslint') < 0 ||
                        local.env.NODE_ENV === 'production' ||
                        local.global.__coverage__) && mode !== 'force') {
                    return script;
                }
                break;
            }
            return local.jslintAndPrint(script, file);
        };

        local.jslintAndPrintHtml = function (script, file) {
        /*
         * this function will jalint and csslint the html script
         */
            // csslint <style> tag
            script.replace(
                (/<style>([\S\s]+?)<\/style>/g),
                function (match0, match1, ii, text) {
                    // jslint-hack
                    local.nop(match0);
                    // preserve lineno
                    match1 = text.slice(0, ii).replace((/.+/g), '') + match1;
                    local.jslintAndPrintConditional(match1, file + '.css');
                }
            );
            // jslint <script> tag
            script.replace(
                (/<script>([\S\s]+?)<\/script>/g),
                function (match0, match1, ii, text) {
                    // jslint-hack
                    local.nop(match0);
                    // preserve lineno
                    match1 = text.slice(0, ii).replace((/.+/g), '') + match1;
                    local.jslintAndPrintConditional(match1, file + '.js');
                }
            );
            return script;
        };

        local.jsonCopy = function (arg) {
        /*
         * this function will return a deep-copy of the JSON-arg
         */
            return arg === undefined
                ? undefined
                : JSON.parse(JSON.stringify(arg));
        };

        local.jsonStringifyOrdered = function (element, replacer, space) {
        /*
         * this function will JSON.stringify the element,
         * with object-keys sorted and circular-references removed
         */
            var circularList, stringify, tmp;
            stringify = function (element) {
            /*
             * this function will recursively JSON.stringify the element,
             * with object-keys sorted and circular-references removed
             */
                // if element is an object, then recurse its items with object-keys sorted
                if (element &&
                        typeof element === 'object' &&
                        typeof element.toJSON !== 'function') {
                    // ignore circular-reference
                    if (circularList.indexOf(element) >= 0) {
                        return;
                    }
                    circularList.push(element);
                    // if element is an array, then recurse its elements
                    if (Array.isArray(element)) {
                        return '[' + element.map(function (element) {
                            tmp = stringify(element);
                            return typeof tmp === 'string'
                                ? tmp
                                : 'null';
                        }).join(',') + ']';
                    }
                    return '{' + Object.keys(element)
                        // sort object-keys
                        .sort()
                        .map(function (key) {
                            tmp = stringify(element[key]);
                            if (typeof tmp === 'string') {
                                return JSON.stringify(key) + ':' + tmp;
                            }
                        })
                        .filter(function (element) {
                            return typeof element === 'string';
                        })
                        .join(',') + '}';
                }
                // else JSON.stringify as normal
                return JSON.stringify(element);
            };
            circularList = [];
            return JSON.stringify(element && typeof element === 'object'
                ? JSON.parse(stringify(element))
                : element, replacer, space);
        };

        local.jwtHs256Decode = function (password, token) {
        /*
         * https://jwt.io/
         * this function will decode the json-web-token with the given password
         */
            var data;
            // try to decode the token
            local.tryCatchOnError(function () {
                token = token.split('.');
                // validate header
                local.assert(token[0] === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', token);
                // validate signature
                token[3] = JSON.parse(local.stringFromBase64(token[1]));
                local.assert(local.sjclHashHmacSha256Create(password, token[0] + '.' + token[1])
                    .replace((/\=/g), '') === token[2]);
                data = token[3];
            }, local.nop);
            // return decoded data
            return data;
        };

        local.jwtHs256Encode = function (password, data) {
        /*
         * https://jwt.io/
         * this function will encode the data into a json-web-token with the given password
         */
            var token;
            token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                local.stringToBase64(JSON.stringify(data)).replace((/\=/g), '');
            return (token + '.' + local.sjclHashHmacSha256Create(password, token))
                .replace((/\=/g), '');
        };

        local.listGetElementRandom = function (list) {
        /*
         * this function will return a random element from the list
         */
            return list[Math.floor(list.length * Math.random())];
        };

        local.listShuffle = function (list) {
        /*
         * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
         * this function will inplace shuffle the list, via fisher-yates algorithm
         */
            var ii, random, swap;
            for (ii = list.length - 1; ii > 0; ii -= 1) {
                // coerce to finite integer
                random = (Math.random() * (ii + 1)) | 0;
                swap = list[ii];
                list[ii] = list[random];
                list[random] = swap;
            }
            return list;
        };

        local.middlewareAssetsCached = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will serve cached-assets
         */
            var options;
            options = {};
            local.onNext(options, function (error, data) {
                options.result = options.result || local.assetsDict[request.urlParsed.pathname];
                if (options.result === undefined) {
                    nextMiddleware(error);
                    return;
                }
                switch (options.modeNext) {
                case 1:
                    // skip gzip
                    if (response.headersSent ||
                            !(/\bgzip\b/).test(request.headers['accept-encoding'])) {
                        options.modeNext += 1;
                        options.onNext();
                        return;
                    }
                    // gzip and cache result
                    local.taskCreateCached({
                        cacheDict: 'middlewareAssetsCachedGzip',
                        key: request.urlParsed.pathname
                    }, function (onError) {
                        local.zlib.gzip(options.result, function (error, data) {
                            onError(error, !error && data.toString('base64'));
                        });
                    }, options.onNext);
                    break;
                case 2:
                    // set gzip header
                    options.result = local.bufferCreate(data, 'base64');
                    response.setHeader('Content-Encoding', 'gzip');
                    response.setHeader('Content-Length', options.result.length);
                    options.onNext();
                    break;
                case 3:
                    local.middlewareCacheControlLastModified(request, response, options.onNext);
                    break;
                case 4:
                    response.end(options.result);
                    break;
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.middlewareBodyRead = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will
         * read and save the request-body to request.bodyRaw
         */
            // jslint-hack
            local.nop(response);
            // if request is already read, then goto nextMiddleware
            if (!request.readable) {
                nextMiddleware();
                return;
            }
            local.streamReadAll(request, function (error, data) {
                request.bodyRaw = request.bodyRaw || data;
                nextMiddleware(error);
            });
        };

        local.middlewareCacheControlLastModified = function (
            request,
            response,
            nextMiddleware
        ) {
        /*
         * this function will run the middleware that will update the Last-Modified header
         */
            // do not cache if headers already sent or url has '?' search indicator
            if (!(response.headersSent || request.url.indexOf('?') >= 0)) {
                // init serverResponseHeaderLastModified
                local.serverResponseHeaderLastModified =
                    local.serverResponseHeaderLastModified ||
                    // resolve to 1000 ms
                    new Date(new Date(Math.floor(Date.now() / 1000) * 1000).toGMTString());
                // respond with 304 If-Modified-Since serverResponseHeaderLastModified
                if (new Date(request.headers['if-modified-since']) >=
                        local.serverResponseHeaderLastModified) {
                    response.statusCode = 304;
                    response.end();
                    return;
                }
                response.setHeader('Cache-Control', 'no-cache');
                response.setHeader(
                    'Last-Modified',
                    local.serverResponseHeaderLastModified.toGMTString()
                );
            }
            nextMiddleware();
        };

        local.middlewareError = function (error, request, response) {
        /*
         * this function will run the middleware that will handle errors
         */
            // if error occurred, then respond with '500 Internal Server Error',
            // else respond with '404 Not Found'
            local.serverRespondDefault(request, response, error
                ? (error.statusCode >= 400 && error.statusCode < 600
                    ? error.statusCode
                    : 500)
                : 404, error);
        };

        local.middlewareFileServer = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will serve files
         */
            if (request.method !== 'GET' || local.modeJs === 'browser') {
                nextMiddleware();
                return;
            }
            request.urlFile = (process.cwd() + request.urlParsed.pathname
                // security - disable parent directory lookup
                .replace((/.*\/\.\.\//g), '/'))
                // replace trailing '/' with '/index.html'
                .replace((/\/$/), '/index.html');
            // serve file from cache
            local.taskCreateCached({
                cacheDict: 'middlewareFileServer',
                key: request.urlFile
            // run background-task to re-cache file
            }, function (onError) {
                local.fs.readFile(request.urlFile, function (error, data) {
                    onError(error, data && local.bufferToString(data, 'base64'));
                });
            }, function (error, data) {
                // default to nextMiddleware
                if (error) {
                    nextMiddleware();
                    return;
                }
                // init response-header content-type
                request.urlParsed.contentType = (/\.[^\.]*$/).exec(request.urlParsed.pathname);
                request.urlParsed.contentType = local.contentTypeDict[
                    request.urlParsed.contentType && request.urlParsed.contentType[0]
                ];
                local.serverRespondHeadSet(request, response, null, {
                    'Content-Type': request.urlParsed.contentType
                });
                // serve file from cache
                response.end(local.bufferCreate(data, 'base64'));
            });
        };

        local.middlewareGroupCreate = function (middlewareList) {
        /*
         * this function will create a middleware that will
         * sequentially run the sub-middlewares in middlewareList
         */
            var self;
            self = function (request, response, nextMiddleware) {
                var options;
                options = {};
                local.onNext(options, function (error) {
                    // recurse with next middleware in middlewareList
                    if (options.modeNext < self.middlewareList.length) {
                        // run the sub-middleware
                        self.middlewareList[options.modeNext](
                            request,
                            response,
                            options.onNext
                        );
                        return;
                    }
                    // default to nextMiddleware
                    nextMiddleware(error);
                });
                options.modeNext = -1;
                options.onNext();
            };
            self.middlewareList = middlewareList;
            return self;
        };

        local.middlewareInit = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will init the request and response
         */
            // debug server-request
            local._debugServerRequest = request;
            // debug server-response
            local._debugServerResponse = response;
            // init timerTimeout
            local.serverRespondTimeoutDefault(request, response, local.timeoutDefault);
            // init request.urlParsed
            request.urlParsed = local.urlParse(request.url);
            // init response-header content-type
            request.urlParsed.contentType = (/\.[^\.]*$/).exec(request.urlParsed.pathname);
            request.urlParsed.contentType = local.contentTypeDict[
                request.urlParsed.contentType && request.urlParsed.contentType[0]
            ];
            local.serverRespondHeadSet(request, response, null, {
                'Content-Type': request.urlParsed.contentType
            });
            // set main-page content-type to text/html
            if (request.urlParsed.pathname === '/') {
                local.serverRespondHeadSet(request, response, null, {
                    'Content-Type': 'text/html; charset=UTF-8'
                });
            }
            // init response.end and response.write to accept Uint8Array instance
            ['end', 'write'].forEach(function (key) {
                response['_' + key] = response['_' + key] || response[key];
                response[key] = function () {
                    var args;
                    args = Array.from(arguments);
                    args[0] = local.bufferToNodeBuffer(args[0]);
                    response['_' + key].apply(response, args);
                };
            });
            // default to nextMiddleware
            nextMiddleware();
        };

        local.normalizeDict = function (dict) {
        /*
         * this function will normalize the dict
         */
            return dict && typeof dict === 'object' && !Array.isArray(dict)
                ? dict
                : {};
        };

        local.normalizeList = function (list) {
        /*
         * this function will normalize the list
         */
            return Array.isArray(list)
                ? list
                : [];
        };

        local.normalizeText = function (text) {
        /*
         * this function will normalize the text
         */
            return typeof text === 'string'
                ? text
                : '';
        };

        local.objectGetElementFirst = function (arg) {
        /*
         * this function will get the first element of the arg
         */
            var item;
            item = {};
            item.key = Object.keys(arg)[0];
            item.value = arg[item.key];
            return item;
        };

        local.objectKeysTypeof = function (arg) {
        /*
         * this function will return a list of the arg's keys, sorted by item-type
         */
            return Object.keys(arg).map(function (key) {
                return typeof arg[key] + ' ' + key;
            }).sort().join('\n');
        };

        local.objectLiteralize = function (arg) {
        /*
         * this function will traverse arg, and replace every encounter of the magical key '$[]'
         * with its object literal [key, value]
         */
            local.objectTraverse(arg, function (element) {
                if (element && typeof element === 'object' && !Array.isArray(element)) {
                    Object.keys(element).forEach(function (key) {
                        if (key.indexOf('$[]') === 0) {
                            element[element[key][0]] = element[key][1];
                            delete element[key];
                        }
                    });
                }
            });
            return arg;
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

        local.objectSetOverride = function (arg, overrides, depth) {
        /*
         * this function will recursively set overrides for items the arg
         */
            arg = arg || {};
            overrides = overrides || {};
            Object.keys(overrides).forEach(function (key) {
                var arg2, overrides2;
                arg2 = arg[key];
                overrides2 = overrides[key];
                if (overrides2 === undefined) {
                    return;
                }
                // if both arg2 and overrides2 are non-null and non-array objects,
                // then recurse with arg2 and overrides2
                if (depth > 1 &&
                        // arg2 is a non-null and non-array object
                        (arg2 &&
                        typeof arg2 === 'object' &&
                        !Array.isArray(arg2)) &&
                        // overrides2 is a non-null and non-array object
                        (overrides2 &&
                        typeof overrides2 === 'object' &&
                        !Array.isArray(overrides2))) {
                    local.objectSetOverride(arg2, overrides2, depth - 1);
                    return;
                }
                // else set arg[key] with overrides[key]
                arg[key] = arg === local.env
                    // if arg is env, then overrides falsey value with empty string
                    ? overrides2 || ''
                    : overrides2;
            });
            return arg;
        };

        local.objectTraverse = function (arg, onSelf, circularList) {
        /*
         * this function will recursively traverse the arg,
         * and run onSelf with the arg's properties
         */
            onSelf(arg);
            circularList = circularList || [];
            if (arg &&
                    typeof arg === 'object' &&
                    circularList.indexOf(arg) < 0) {
                circularList.push(arg);
                Object.keys(arg).forEach(function (key) {
                    // recurse with arg[key]
                    local.objectTraverse(arg[key], onSelf, circularList);
                });
            }
            return arg;
        };

        local.onErrorDefault = function (error) {
        /*
         * this function will if error exists, then print error.stack to stderr
         */
            if (error && !local.global.__coverage__) {
                console.error(error.stack);
            }
        };

        local.onErrorWithStack = function (onError) {
        /*
         * this function will return a new callback that will call onError,
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

        local.onFileModifiedRestart = function (file) {
        /*
         * this function will watch the file, and if modified, then restart the process
         */
            if (local.env.npm_config_mode_auto_restart &&
                    local.fs.existsSync(file) &&
                    local.fs.statSync(file).isFile()) {
                local.fs.watchFile(file, {
                    interval: 1000,
                    persistent: false
                }, function (stat2, stat1) {
                    if (stat2.mtime > stat1.mtime) {
                        console.log('file modified - ' + file);
                        local.exit(77);
                    }
                });
            }
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
         * this function will return a function that will
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

        local.onReadyAfter = function (onError) {
        /*
         * this function will call onError when onReadyBefore.counter === 0
         */
            local.onReadyBefore.counter += 1;
            local.taskCreate({ key: 'utility2.onReadyAfter' }, null, onError);
            local.onResetAfter(local.onReadyBefore);
            return onError;
        };

        local.onReadyBefore = local.onParallel(function (error) {
        /*
         * this function will keep track of onReadyBefore.counter
         */
            local.taskCreate({
                key: 'utility2.onReadyAfter'
            }, function (onError) {
                onError(error);
            }, function (error) {
                // validate no error occurred
                local.assert(!error, error);
            });
        });

        local.onResetAfter = function (onError) {
        /*
         * this function will call onError when onResetBefore.counter === 0
         */
            local.onResetBefore.counter += 1;
            // visual notification - onResetAfter
            local.ajaxProgressUpdate();
            local.taskCreate({ key: 'utility2.onResetAfter' }, null, onError);
            setTimeout(local.onResetBefore);
            return onError;
        };

        local.onResetBefore = local.onParallel(function (error) {
        /*
         * this function will keep track of onResetBefore.counter
         */
            local.taskCreate({
                key: 'utility2.onResetAfter'
            }, function (onError) {
                onError(error);
            }, function (error) {
                // validate no error occurred
                local.assert(!error, error);
            });
        });
        local.onTimeout = function (onError, timeout, message) {
        /*
         * this function will return a timeout-error-handler,
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

        local.processSpawnWithTimeout = function () {
        /*
         * this function will run like child_process.spawn,
         * but with auto-timeout after timeoutDefault milliseconds
         */
            var childProcess;
            // spawn childProcess
            childProcess = local.child_process.spawn.apply(local.child_process, arguments)
                .on('exit', function () {
                    // try to kill timerTimeout childProcess
                    local.tryCatchOnError(function () {
                        process.kill(childProcess.timerTimeout.pid);
                    }, local.nop);
                });
            // init failsafe timerTimeout
            childProcess.timerTimeout = local.child_process.spawn('/bin/sh', ['-c', 'sleep ' +
                // coerce to finite integer
                (((0.001 * local.timeoutDefault) | 0) +
                // add 2 second delay to failsafe timerTimeout
                2) + '; kill -9 ' + childProcess.pid + ' 2>/dev/null'], { stdio: 'ignore' });
            return childProcess;
        };

        local.profile = function (task, onError) {
        /*
         * this function will profile the async task in milliseconds
         */
            var timeStart;
            timeStart = Date.now();
            // run async task
            task(function (error) {
                // call onError with difference in milliseconds between Date.now() and timeStart
                onError(error, Date.now() - timeStart);
            });
        };

        local.profileSync = function (task) {
        /*
         * this function will profile the sync task in milliseconds
         */
            var timeStart;
            timeStart = Date.now();
            // run sync task
            task();
            // return difference in milliseconds between Date.now() and timeStart
            return Date.now() - timeStart;
        };

        local.replStart = function () {
        /*
         * this function will start the repl debugger
         */
            /*jslint evil: true*/
            var self;
            if (global.utility2_serverRepl1) {
                return;
            }
            // start replServer
            self = global.utility2_serverRepl1 = require('repl').start({ useGlobal: true });
            self.nop = function () {
            /*
             * this function will do nothing
             */
                return;
            };
            self.onError = function (error) {
            /*
             * this function will debug any repl-error
             */
                // debug error
                global.utility2_debugReplError = error;
                console.error(error.stack);
            };
            // save repl eval function
            self.evalDefault = self.eval;
            // hook custom repl eval function
            self.eval = function (script, context, file, onError) {
                var match, onError2;
                match = (/^(\S+)(.*?)\n/).exec(script);
                onError2 = function (error, data) {
                    // debug error
                    global.utility2_debugReplError = error || global.utility2_debugReplError;
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
                    require('child_process').spawn(
                        '/bin/sh',
                        ['-c', match[2]],
                        { stdio: ['ignore', 1, 2] }
                    )
                        // on shell exit, print return prompt
                        .on('exit', function (exitCode) {
                            console.log('exit-code ' + exitCode);
                            self.evalDefault(
                                '\n',
                                context,
                                file,
                                onError2
                            );
                        });
                    script = '\n';
                    break;
                // syntax sugar to grep current dir
                case 'grep':
                    // run async shell command
                    require('child_process').spawn(
                        '/bin/sh',
                        ['-c', 'find . -type f | grep -v ' +
/* jslint-ignore-begin */
'"\
/\\.\\|.*\\(\\b\\|_\\)\\(\\.\\d\\|\
archive\\|artifact\\|\
bower_component\\|build\\|\
coverage\\|\
doc\\|\
external\\|\
fixture\\|\
git_module\\|\
jquery\\|\
log\\|\
min\\|mock\\|\
node_module\\|\
rollup\\|\
swp\\|\
tmp\\)\\(\\b\\|[_s]\\)\
" ' +
/* jslint-ignore-end */
                            '| tr "\\n" "\\000" | xargs -0 grep -in "' +
                            match[2].trim() + '"'],
                        { stdio: ['ignore', 1, 2] }
                    )
                        // on shell exit, print return prompt
                        .on('exit', function (exitCode) {
                            console.log('exit-code ' + exitCode);
                            self.evalDefault(
                                '\n',
                                context,
                                file,
                                onError2
                            );
                        });
                    script = '\n';
                    break;
                // syntax sugar to list object's keys, sorted by item-type
                case 'keys':
                    script = 'console.log(Object.keys(' + match[2] + ').map(function (key) {' +
                        'return typeof ' + match[2] + '[key] + " " + key + "\\n";' +
                        '}).sort().join("") + Object.keys(' + match[2] + ').length)\n';
                    break;
                // syntax sugar to print stringified arg
                case 'print':
                    script = 'console.log(String(' + match[2] + '))\n';
                    break;
                }
                // eval the script
                self.evalDefault(script, context, file, onError2);
            };
            self.socket = { end: self.nop, on: self.nop, write: self.nop };
            // init process.stdout
            process.stdout._writeDefault = process.stdout._writeDefault ||
                process.stdout._write;
            process.stdout._write = function (chunk, encoding, callback) {
                process.stdout._writeDefault(chunk, encoding, callback);
                if (self.socket.readable) {
                    self.socket.write(chunk, encoding);
                }
            };
            // start tcp-server
            global.utility2_serverReplTcp1 = require('net').createServer(function (socket) {
                // init socket
                self.socket = socket;
                self.socket.on('data', self.write.bind(self));
                self.socket.on('error', self.onError);
                self.socket.setKeepAlive(true);
            });
            local.runIfTrue(process.env.PORT_REPL, function () {
                console.log('repl-server listening on tcp-port ' + process.env.PORT_REPL);
                global.utility2_serverReplTcp1.listen(process.env.PORT_REPL);
            });
        };

        local.requestResponseCleanup = function (request, response) {
        /*
         * this function will end or destroy the request and response objects
         */
            [request, response].forEach(function (stream) {
                // try to end the stream
                local.tryCatchOnError(function () {
                    stream.end();
                }, function () {
                    // if error, then try to destroy the stream
                    local.tryCatchOnError(function () {
                        stream.destroy();
                    }, local.nop);
                });
            });
        };

        local.requireExampleJsFromReadme = function () {
        /*
         * this function will require and export example.js embedded in README.md
         */
            var fileExampleJs, fileMain, module, script;
            // init repl debugger
            local.replStart();
            // debug dir
            [__dirname, process.cwd()].forEach(function (dir) {
                local.fs.readdirSync(dir).forEach(function (file) {
                    file = dir + '/' + file;
                    // if the file is modified, then restart the process
                    local.onFileModifiedRestart(file);
                    switch (local.path.extname(file)) {
                    case '.css':
                    case '.js':
                    case '.json':
                        // jslint file
                        local.jslintAndPrintConditional(
                            local.tryCatchReadFile(file, 'utf8'),
                            file
                        );
                        break;
                    }
                });
            });
            // init npm_package_nameAlias
            local.env.npm_package_nameAlias = local.env.npm_package_nameAlias ||
                local.env.npm_package_name;
            if (local.env.npm_config_mode_start || local.global.utility2_rollup) {
                // init exports
                local.global.local = local;
                // init assets
                local.assetsDict['/'] = local.assetsDict['/index.html'] = local.templateRender(
                    local.templateIndexHtml,
                    { env: local.env, isRollup: true }
                );
                local.assetsWrite('/assets.app.js', local.fs.readFileSync(__filename, 'utf8'));
                local[local.env.npm_package_nameAlias] = local;
                return local;
            }
            fileExampleJs = process.cwd() + '/example.js';
            fileMain = process.cwd() + '/' + local.env.npm_package_main;
            global.utility2_moduleExports = require(fileMain + '.js');
            // read script from README.md
            script = 'module.exports = require("./");\n' +
                'module.exports.templateIndexHtml = "";\n';
            local.fs.readFileSync(process.cwd() + '/README.md', 'utf8').replace(
                (/```\w*?(\n[\W\s]*?example.js[\n\"][\S\s]+?)\n```/),
                function (match0, match1, ii, text) {
                    // jslint-hack
                    local.nop(match0);
                    // preserve lineno
                    script = text.slice(0, ii).replace((/.+/g), '') + match1;
                }
            );
            script = script
                // alias require($npm_package_name) to utility2_moduleExports;
                .replace(
                    "require('" + local.env.npm_package_name + "')",
                    'global.utility2_moduleExports'
                )
                // uncomment utility2-comment
                .replace((/<!-- utility2-comment\b([\S\s]+?)\butility2-comment -->/g), '$1');
            // jslint script
            local.jslintAndPrintConditional(script, fileExampleJs);
            // cover script
            script = local.istanbulInstrumentInPackage(script, fileExampleJs);
            // init module
            module = local.require2.cache[fileExampleJs] = new local.Module(fileExampleJs);
            // load script into module
            module._compile(script, fileExampleJs);
            // init exports
            module.exports.utility2 = local;
            module.exports[local.env.npm_package_nameAlias] = global.utility2_moduleExports;
            // init assets
            local.assetsWrite(
                '/assets.' + local.env.npm_package_nameAlias + '.css',
                local.tryCatchReadFile(fileMain + '.css', 'utf8')
            );
            local.assetsWrite(
                '/assets.' + local.env.npm_package_nameAlias + '.js',
                local.istanbulInstrumentInPackage(
                    local.fs.readFileSync(fileMain + '.js', 'utf8').replace((/^#!/), '//'),
                    fileMain + '.js'
                )
            );
            local.assetsWrite('/assets.example.js', script);
            local.assetsWrite('/assets.test.js', local.istanbulInstrumentInPackage(
                local.fs.readFileSync(process.cwd() + '/test.js', 'utf8'),
                process.cwd() + '/test.js'
            ));
            local.assetsDict['/'] = local.assetsDict['/index.html'] = local.jslintAndPrintHtml(
                local.templateRender(module.exports.templateIndexHtml, {
                    env: local.env,
                    isRollup: local.global.utility2_rollup ||
                        local.env.NODE_ENV === 'production'
                })
            );
            local.assetsWrite('/assets.app.js', [
                'header',
                '/assets.utility2.rollup.js',
                '/assets.utility2.rollup.begin.js',
                'local._stateInit',
                '/assets.lib.js',
                '/assets.example.js',
                '/assets.test.js',
                '/assets.utility2.rollup.end.js'
            ].map(function (key) {
                script = local.assetsDict[key];
                switch (key) {
/* jslint-ignore-begin */
case 'header':
return '\
/*\n\
assets.app.js\n\
\n' + local.env.npm_package_description + '\n\
\n\
instruction\n\
    1. save this script as assets.app.js\n\
    2. run the shell command:\n\
        $ PORT=8081 node assets.app.js\n\
    3. play with the browser-demo on http://localhost:8081\n\
*/\n\
';
/* jslint-ignore-end */
                case 'local._stateInit':
                    script = local.assetsDict['/assets.utility2.rollup.content.js'].replace(
                        '/* utility2.rollup.js content */',
                        key + '(' + JSON.stringify(
                            local._middlewareJsonpStateInit({ _stateInit: true })
                        ) + ');'
                    );
                    break;
                case '/assets.lib.js':
                    script = local.assetsDict[
                        '/assets.' + local.env.npm_package_nameAlias + '.js'
                    ];
                    local.runIfTrue(local.assetsDict[
                        '/assets.' + local.env.npm_package_nameAlias + '.rollup.js'
                    ], function () {
                        script = '';
                    });
                    break;
                case '/assets.utility2.rollup.js':
                    local.runIfTrue(local.assetsDict[
                        '/assets.' + local.env.npm_package_nameAlias + '.rollup.js'
                    ], function () {
                        script = local.assetsDict[
                            '/assets.' + local.env.npm_package_nameAlias + '.rollup.js'
                        ];
                    });
                    break;
                }
                return '// ' + key + '\n' + script;
            }).join('\n\n\n\n'));
            local.objectSetDefault(module.exports, local);
            return module.exports;
        };

        local.runIfTrue = function (condition, fnc) {
        /*
         * this function will run the fnc if condition is truthy
         */
            if (condition) {
                fnc();
            }
        };

        local.serverRespondDefault = function (request, response, statusCode, error) {
        /*
         * this function will respond with a default message,
         * or error.stack for the given statusCode
         */
            // init statusCode and contentType
            local.serverRespondHeadSet(
                request,
                response,
                statusCode,
                { 'Content-Type': 'text/plain; charset=utf-8' }
            );
            if (error) {
                // debug statusCode / method / url
                local.errorMessagePrepend(
                    error,
                    response.statusCode + ' ' + request.method + ' ' + request.url + '\n'
                );
                // print error.stack to stderr
                local.onErrorDefault(error);
                // end response with error.stack
                response.end(error.stack);
                return;
            }
            // end response with default statusCode message
            response.end(
                statusCode + ' ' + local.http.STATUS_CODES[statusCode]
            );
        };

        local.serverRespondEcho = function (request, response) {
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

        local.serverRespondHeadSet = function (request, response, statusCode, headers) {
        /*
         * this function will set the response object's statusCode / headers
         */
            // jslint-hack
            local.nop(request);
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

        local.serverRespondTimeoutDefault = function (request, response, timeout) {
        /*
         * this function will return a timeout-error-handler for the server-request
         */
            request.onTimeout = request.onTimeout || function (error) {
                local.serverRespondDefault(request, response, 500, error);
                setTimeout(function () {
                    // cleanup request and response
                    local.requestResponseCleanup(request, response);
                }, 1000);
            };
            request.timerTimeout = local.onTimeout(
                request.onTimeout,
                timeout || local.timeoutDefault,
                'server ' + request.method + ' ' + request.url
            );
            response.on('finish', function () {
                // cleanup timerTimeout
                clearTimeout(request.timerTimeout);
            });
        };

        local.sjclCipherAes128Decrypt = function (password, encrypted) {
        /*
         * this function will aes-decrypt the encrypted-data with the given password
         */
            var decrypted;
            local.tryCatchOnError(function () {
                encrypted = encrypted.split('.');
                decrypted = local.sjcl.decrypt(password, JSON.stringify({
                    ct: encrypted[2],
                    iter: 128,
                    iv: encrypted[1],
                    mode: 'gcm',
                    salt: encrypted[0]
                }));
            }, local.nop);
            return decrypted;
        };

        local.sjclCipherAes128Encrypt = function (password, decrypted) {
        /*
         * this function will aes-encrypt the decrypted-data with the given password
         */
            var options;
            options = { iter: 128, mode: 'gcm' };
            options = JSON.parse(local.sjcl.encrypt(password, decrypted, options));
            return (options.salt + '.' + options.iv + '.' + options.ct).replace((/\=/g), '');
        };

        local.sjclHashHmacSha256Create = function (password, data) {
        /*
         * this function will return the base64-encoded hmac-sha256 hash
         * of the data with the given password
         */
            return local.sjcl.codec.base64.fromBits(
                new local.sjcl.misc.hmac(local.sjcl.codec.utf8String.toBits(password))
                    .encrypt(data)
            );
        };

        local.sjclHashScryptCreate = function (password, options) {
        /*
         * https://github.com/wg/scrypt
         * this function will return the scrypt-hash of the password
         * with the given options (default = $s0$10801)
         * e.g. $s0$e0801$epIxT/h6HbbwHaehFnh/bw==$7H0vsXlY8UxxyW/BWx/9GuY7jEvGjT71GFd6O4SZND0=
         */
            // init options
            options = (options || '$s0$10801').split('$');
            // init salt
            if (!options[3]) {
                options[3] = local.sjcl.codec.base64.fromBits(
                    local.sjcl.random.randomWords(4, 0)
                );
            }
            // init hash
            options[4] = local.sjcl.codec.base64.fromBits(
                local.sjcl.misc.scrypt(
                    password || '',
                    local.sjcl.codec.base64.toBits(options[3]),
                    Math.pow(2, parseInt(options[2].slice(0, 1), 16)),
                    parseInt(options[2].slice(1, 2), 16),
                    parseInt(options[2].slice(3, 4), 16)
                )
            );
            return options.slice(0, 5).join('$');
        };

        local.sjclHashScryptValidate = function (password, hash) {
        /*
         * https://github.com/wg/scrypt
         * this function will validate the password against the scrypt-hash
         */
            return local.sjclHashScryptCreate(password, hash) === hash;
        };

        local.sjclHashSha256Create = function (data) {
        /*
         * this function will return the base64-encoded sha-256 hash of the string data
         */
            return local.sjcl.codec.base64.fromBits(local.sjcl.hash.sha256.hash(data));
        };

        local.streamReadAll = function (stream, onError) {
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
                    onError(null, local.modeJs === 'browser'
                        ? chunkList[0]
                        : local.bufferConcat(chunkList));
                })
                // on error event, pass error to onError
                .on('error', onError);
        };

        local.stringFromBase64 = function (text) {
        /*
         * this function will convert the base64-encoded text to text
         */
            return local.bufferToString(local.bufferCreate(text, 'base64'));
        };

        local.stringHtmlSafe = function (text) {
        /*
         * this function will replace '&' to '&amp;', '<' to '&lt;',
         * and '>' to '&gt;' in the text to make it htmlSafe
         */
            return text
                .replace((/&/g), '&amp;')
                .replace((/</g), '&lt;')
                .replace((/>/g), '&gt;')
                .replace((/"/g), '&quot;')
                .replace((/'/g), '&#x27;')
                .replace((/`/g), '&#x60;');
        };

        local.stringToBase64 = function (text) {
        /*
         * this function will convert the text to base64-encoded text
         */
            return local.bufferToString(local.bufferCreate(text), 'base64');
        };

        local.taskCreate = function (options, onTask, onError) {
        /*
         * this function will create the task onTask named options.key, if it does not exist,
         * and push onError to its onErrorList
         */
            var task;
            // init task
            task = local.taskOnTaskDict[options.key] = local.taskOnTaskDict[options.key] ||
                { onErrorList: [] };
            // push callback onError to the task
            if (onError) {
                onError = local.onErrorWithStack(onError);
                task.onErrorList.push(onError);
            }
            // if task exists, then return it
            if (!onTask || task.onTask) {
                return task;
            }
            task.onDone = function () {
                // if already done, then do nothing
                if (task.done) {
                    return;
                }
                task.done = true;
                // cleanup timerTimeout
                clearTimeout(task.timerTimeout);
                // cleanup task
                delete local.taskOnTaskDict[options.key];
                // preserve error.message and error.stack
                task.result = JSON.stringify(Array.from(arguments)
                    .map(function (element) {
                        if (element && element.stack) {
                            element = local.objectSetDefault(local.jsonCopy(element), {
                                message: element.message,
                                name: element.name,
                                stack: element.stack
                            });
                        }
                        return element;
                    }));
                // pass result to callbacks in onErrorList
                task.onErrorList.forEach(function (onError) {
                    onError.apply(null, JSON.parse(task.result));
                });
            };
            // init timerTimeout
            task.timerTimeout = local.onTimeout(
                task.onDone,
                options.timeout || local.timeoutDefault,
                'taskCreate ' + options.key
            );
            task.onTask = onTask;
            // run onTask
            task.onTask(task.onDone);
            return task;
        };

        local.taskCreateCached = function (options, onTask, onError) {
        /*
         * this function will
         * 1. if cache-hit, then call onError with cacheValue
         * 2. run onTask in background
         * 3. save onTask's result to cache
         * 4. if cache-miss, then call onError with onTask's result
         */
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                //  1. if cache-hit, then call onError with cacheValue
                case 1:
                    // read cacheValue from memory-cache
                    local.cacheDict[options.cacheDict] = local.cacheDict[options.cacheDict] ||
                        {};
                    options.cacheValue = local.cacheDict[options.cacheDict][options.key];
                    if (options.cacheValue) {
                        // call onError with cacheValue
                        options.modeCacheHit = true;
                        onError(null, JSON.parse(options.cacheValue));
                        if (!options.modeCacheUpdate) {
                            break;
                        }
                    }
                    // run background-task with lower priority for cache-hit
                    setTimeout(options.onNext, options.modeCacheHit && options.cacheTtl);
                    break;
                // 2. run onTask in background
                case 2:
                    local.taskCreate(options, onTask, options.onNext);
                    break;
                default:
                    // 3. save onTask's result to cache
                    // JSON.stringify data to prevent side-effects on cache
                    options.cacheValue = JSON.stringify(data);
                    if (!error && options.cacheValue) {
                        local.cacheDict[options.cacheDict][options.key] = options.cacheValue;
                    }
                    // 4. if cache-miss, then call onError with onTask's result
                    if (!options.modeCacheHit) {
                        onError(error, options.cacheValue && JSON.parse(options.cacheValue));
                    }
                    (options.onCacheWrite || local.nop)();
                    break;
                }
            });
            options.modeNext = 0;
            options.onNext();
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
                    case 'decodeURIComponent':
                        value = decodeURIComponent(value);
                        break;
                    case 'encodeURIComponent':
                        value = encodeURIComponent(value);
                        break;
                    case 'htmlSafe':
                        value = local.stringHtmlSafe(String(value));
                        break;
                    case 'jsonStringify':
                        value = JSON.stringify(value);
                        break;
                    default:
                        value = value[arg]();
                        break;
                    }
                });
                return String(value);
            });
        };

        local.testMock = function (mockList, onTestCase, onError) {
        /*
         * this function will mock the objects in mockList while running the onTestCase
         */
            var onError2;
            onError2 = function (error) {
                // restore mock[0] from mock[2]
                mockList.reverse().forEach(function (mock) {
                    local.objectSetOverride(mock[0], mock[2]);
                });
                onError(error);
            };
            // try to call onError with mock-objects
            local.tryCatchOnError(function () {
                // mock-objects
                mockList.forEach(function (mock) {
                    mock[2] = {};
                    // backup mock[0] into mock[2]
                    Object.keys(mock[1]).forEach(function (key) {
                        mock[2][key] = mock[0][key];
                    });
                    // override mock[0] with mock[1]
                    local.objectSetOverride(mock[0], mock[1]);
                });
                // run onTestCase
                onTestCase(onError2);
            }, onError2);
        };

        local.testReportCreate = function (testReport) {
        /*
         * this function will create test-report artifacts
         */
            // print test-report summary
            console.log('\n' + new Array(56).join('-') + '\n' + testReport.testPlatformList
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
                        .slice(-16) + '     |\n' + new Array(56).join('-');
                })
                .join('\n') + '\n');
            // create test-report.html
            local.fs.writeFileSync(
                local.env.npm_config_dir_build + '/test-report.html',
                local.testReportMerge(testReport, {})
            );
            // create build.badge.svg
            local.fs.writeFileSync(local.env.npm_config_dir_build +
                '/build.badge.svg', local.templateBuildBadgeSvg
                // edit branch name
                .replace((/0000-00-00 00:00:00/g),
                    new Date().toISOString().slice(0, 19).replace('T', ' '))
                // edit branch name
                .replace((/- master -/g), '| ' + local.env.CI_BRANCH + ' |')
                // edit commit id
                .replace(
                    (/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/g),
                    local.env.CI_COMMIT_ID
                ));
            // create test-report.badge.svg
            local.fs.writeFileSync(local.env.npm_config_dir_build +
                '/test-report.badge.svg', local.templateTestReportBadgeSvg
                // edit number of tests failed
                .replace((/999/g), testReport.testsFailed)
                // edit badge color
                .replace(
                    (/d00/g),
                    // coverage-hack - cover both fail and pass cases
                    '0d00'.slice(!!testReport.testsFailed).slice(0, 3)
                ));
            console.log('created test-report file://' + local.env.npm_config_dir_build +
                '/test-report.html\n');
            // if any test failed, then exit with non-zero exit-code
            console.log('\n' + local.env.MODE_BUILD +
                ' - ' + testReport.testsFailed + ' failed tests\n');
            // exit with number of tests failed
            local.exit(testReport.testsFailed);
        };

        local.testReportMerge = function (testReport1, testReport2) {
        /*
         * this function will
         * 1. merge testReport2 into testReport1
         * 2. return testReport1 in html-format
         */
            var errorStackList, testCaseNumber, testReport;
            // 1. merge testReport2 into testReport1
            [testReport1, testReport2].forEach(function (testReport, ii) {
                ii += 1;
                local.objectSetDefault(testReport, {
                    date: new Date().toISOString(),
                    errorStackList: [],
                    testPlatformList: [],
                    timeElapsed: 0
                }, 8);
                // security - handle malformed testReport
                local.assert(
                    testReport && typeof testReport === 'object',
                    ii + ' invalid testReport ' + typeof testReport
                );
                // validate timeElapsed
                local.assert(
                    typeof testReport.timeElapsed === 'number',
                    ii + ' invalid testReport.timeElapsed ' + typeof testReport.timeElapsed
                );
                // security - handle malformed testReport.testPlatformList
                testReport.testPlatformList.forEach(function (testPlatform) {
                    local.objectSetDefault(testPlatform, {
                        name: 'undefined',
                        testCaseList: [],
                        timeElapsed: 0
                    }, 8);
                    local.assert(
                        typeof testPlatform.name === 'string',
                        ii + ' invalid testPlatform.name ' + typeof testPlatform.name
                    );
                    // insert $MODE_BUILD into testPlatform.name
                    if (local.env.MODE_BUILD) {
                        testPlatform.name = testPlatform.name.replace(
                            (/^(browser|node)\b/),
                            local.env.MODE_BUILD + ' - $1'
                        );
                    }
                    // validate timeElapsed
                    local.assert(
                        typeof testPlatform.timeElapsed === 'number',
                        ii + ' invalid testPlatform.timeElapsed ' +
                            typeof testPlatform.timeElapsed
                    );
                    // security - handle malformed testPlatform.testCaseList
                    testPlatform.testCaseList.forEach(function (testCase) {
                        local.objectSetDefault(testCase, {
                            errorStack: '',
                            name: 'undefined',
                            timeElapsed: 0
                        }, 8);
                        local.assert(
                            typeof testCase.errorStack === 'string',
                            ii + ' invalid testCase.errorStack ' + typeof testCase.errorStack
                        );
                        local.assert(
                            typeof testCase.name === 'string',
                            ii + ' invalid testCase.name ' + typeof testCase.name
                        );
                        // validate timeElapsed
                        local.assert(
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
            testReport1.timeElapsed += testReport2.timeElapsed;
            testReport = testReport1;
            testReport.testsFailed = 0;
            testReport.testsPassed = 0;
            testReport.testsPending = 0;
            testReport.testPlatformList.forEach(function (testPlatform) {
                testPlatform.testsFailed = 0;
                testPlatform.testsPassed = 0;
                testPlatform.testsPending = 0;
                testPlatform.testCaseList.forEach(function (testCase) {
                    switch (testCase.status) {
                    // update failed tests
                    case 'failed':
                        testPlatform.testsFailed += 1;
                        testReport.testsFailed += 1;
                        break;
                    // update passed tests
                    case 'passed':
                        testPlatform.testsPassed += 1;
                        testReport.testsPassed += 1;
                        break;
                    // update pending tests
                    default:
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
                    return arg1.status.replace('passed', 'z') + arg1.name >
                        arg2.status.replace('passed', 'z') + arg2.name
                        ? 1
                        : -1;
                });
            });
            // sort testPlatformList by status and name
            testReport.testPlatformList.sort(function (arg1, arg2) {
                return arg1.status.replace('passed', 'z') + arg1.name >
                    arg2.status.replace('passed', 'z') + arg2.name
                    ? 1
                    : -1;
            });
            // stop testReport timer
            if (testReport.testsPending === 0) {
                local.timeElapsedStop(testReport);
            }
            // 2. return testReport1 in html-format
            // json-copy testReport that will be modified for html templating
            testReport = local.jsonCopy(testReport1);
            // update timeElapsed
            local.timeElapsedStop(testReport);
            testReport.testPlatformList.forEach(function (testPlatform) {
                local.timeElapsedStop(testPlatform);
                testPlatform.testCaseList.forEach(function (testCase) {
                    if (!testCase.done) {
                        local.timeElapsedStop(testCase);
                    }
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
            return local.templateRender(
                local.templateTestReportHtml,
                local.objectSetOverride(testReport, {
                    env: local.env,
                    // map testPlatformList
                    testPlatformList: testReport.testPlatformList
                        .filter(function (testPlatform) {
                            // if testPlatform has no tests, then filter it out
                            return testPlatform.testCaseList.length;
                        })
                        .map(function (testPlatform, ii) {
                            errorStackList = [];
                            return local.objectSetOverride(testPlatform, {
                                errorStackList: errorStackList,
                                name: testPlatform.name,
                                screenCaptureImg: testPlatform.screenCaptureImg,
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
                                    return local.objectSetOverride(testCase, {
                                        testCaseNumber: testCaseNumber,
                                        testReportTestStatusClass: 'test' +
                                            testCase.status[0].toUpperCase() +
                                            testCase.status.slice(1)
                                    }, 8);
                                }),
                                preClass: errorStackList.length
                                    ? ''
                                    : 'displayNone',
                                testPlatformNumber: ii + 1
                            });
                        }, 8),
                    testStatusClass: testReport.testsFailed
                        ? 'testFailed'
                        : 'testPassed'
                }, 8)
            );
        };

        local.testRunDefault = function (options) {
        /*
         * this function will run all tests in testPlatform.testCaseList
         */
            var exit, onParallel, testPlatform, testReport, testReportDiv1, timerInterval;
            // init modeTest
            local.modeTest = local.modeTest || local.env.npm_config_mode_test;
            if (!(local.modeTest || options.modeTest)) {
                return;
            }
            if (!options.testRunBeforeDone) {
                options.testRunBeforeTimer = options.testRunBeforeTimer ||
                    setTimeout(function () {
                        local._testRunBefore();
                        local.onReadyAfter(function () {
                            options.testRunBeforeDone = true;
                            local.testRunDefault(options);
                        });
                    });
                return;
            }
            // reset _testRunBefore
            options.testRunBeforeDone = options.testRunBeforeTimer = null;
            // visual notification - testRun
            local.ajaxProgressUpdate();
            // init onParallel
            onParallel = local.onParallel(function () {
            /*
             * this function will create the test-report after all tests are done
             */
                local.ajaxProgressUpdate();
                // stop testPlatform timer
                local.timeElapsedStop(testPlatform);
                // finalize testReport
                local.testReportMerge(testReport, {});
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
                    break;
                case 'node':
                    // create test-report.json
                    local.fs.writeFileSync(
                        local.env.npm_config_dir_build + '/test-report.json',
                        JSON.stringify(testReport)
                    );
                    // restore exit
                    process.exit = exit;
                    break;
                }
                setTimeout(function () {
                    if (local.modeJs === 'browser') {
                        // update coverageReport
                        local.istanbulCoverageReportCreate({
                            coverage: local.global.__coverage__
                        });
                    }
                    // exit with number of tests failed
                    local.exit(testReport.testsFailed);
                // coverage-hack - wait 1000 ms for timerInterval
                }, 1000);
            });
            onParallel.counter += 1;
            // mock exit
            switch (local.modeJs) {
            case 'node':
                exit = process.exit;
                process.exit = local.nop;
                break;
            }
            // init modeTestCase
            local.modeTestCase = local.modeTestCase || local.env.npm_config_mode_test_case;
            // init testReport
            testReport = local.testReport;
            // init testReport timer
            local.timeElapsedStart(testReport);
            // init testPlatform
            testPlatform = local.testReport.testPlatformList[0];
            // init testPlatform timer
            local.timeElapsedStart(testPlatform);
            // reset testPlatform.testCaseList
            testPlatform.testCaseList.length = 0;
            // add tests into testPlatform.testCaseList
            Object.keys(options).forEach(function (key) {
                // add testCase options[key] to testPlatform.testCaseList
                if ((local.modeTestCase && local.modeTestCase === key) ||
                        (!local.modeTestCase && key.indexOf('testCase_') === 0)) {
                    testPlatform.testCaseList.push({
                        name: key,
                        status: 'pending',
                        onTestCase: options[key]
                    });
                }
            });
            // visual notification - update test-progress until done
            // init testReportDiv1 element
            if (local.modeJs === 'browser') {
                testReportDiv1 = document.querySelector('#testReportDiv1');
            }
            testReportDiv1 = testReportDiv1 || { style: {} };
            testReportDiv1.style.display = 'block';
            testReportDiv1.innerHTML = local.testReportMerge(testReport, {});
            // update test-report status every 1000 ms until done
            timerInterval = setInterval(function () {
                // update testReportDiv1 in browser
                testReportDiv1.innerHTML = local.testReportMerge(testReport, {});
                if (testReport.testsPending === 0) {
                    // cleanup timerInterval
                    clearInterval(timerInterval);
                }
            }, 1000);
            // shallow-copy testPlatform.testCaseList to prevent side-effects
            // from in-place sort from testReportMerge
            testPlatform.testCaseList.slice().forEach(function (testCase) {
                var onError, timerTimeout;
                onError = function (error) {
                    // cleanup timerTimeout
                    clearTimeout(timerTimeout);
                    // if testCase already done, then fail testCase with error for ending again
                    if (testCase.done) {
                        error = error || new Error('callback in testCase ' +
                            testCase.name + ' called multiple times');
                    }
                    // if error occurred, then fail testCase
                    if (error) {
                        testCase.status = 'failed';
                        console.error('\ntestCase ' + testCase.name + ' failed\n' +
                            error.message + '\n' + error.stack);
                        testCase.errorStack = testCase.errorStack ||
                            error.message + '\n' + error.stack;
                        // validate errorStack is non-empty
                        local.assert(
                            testCase.errorStack,
                            'invalid errorStack ' + testCase.errorStack
                        );
                    }
                    // if already done, then do nothing
                    if (testCase.done) {
                        return;
                    }
                    testCase.done = true;
                    if (testCase.status === 'pending') {
                        testCase.status = 'passed';
                    }
                    // stop testCase timer
                    local.timeElapsedStop(testCase);
                    console.log('[' + local.modeJs + ' test-case ' +
                        testPlatform.testCaseList.filter(function (testCase) {
                            return testCase.done;
                        }).length + ' of ' + testPlatform.testCaseList.length + ' ' +
                        testCase.status + '] - ' + testCase.name);
                    // if all tests are done, then create test-report
                    onParallel();
                };
                // init timerTimeout
                timerTimeout = local.onTimeout(onError, local.timeoutDefault, testCase.name);
                // increment number of tests remaining
                onParallel.counter += 1;
                // try to run testCase
                local.tryCatchOnError(function () {
                    // start testCase timer
                    local.timeElapsedStart(testCase);
                    testCase.onTestCase(null, onError);
                }, onError);
            });
            onParallel();
        };

        local.testRunServer = function (options) {
        /*
         * this function will
         * 1. create server from options.middleware
         * 2. start server on local.env.PORT
         * 3. run tests
         */
            if (local.global.utility2_serverHttp1) {
                return;
            }
            local.onReadyBefore.counter += 1;
            local.objectSetDefault(options, {
                middleware: local.middlewareGroupCreate([
                    local.middlewareInit,
                    local.middlewareAssetsCached,
                    local._middlewareJsonpStateInit
                ]),
                middlewareError: local.middlewareError
            });
            // 1. create server from options.middleware
            local.serverLocalRequestHandler = function (request, response) {
                options.middleware(request, response, function (error) {
                    options.middlewareError(error, request, response);
                });
            };
            local.global.utility2_serverHttp1 = local.http.createServer(
                local.serverLocalRequestHandler
            );
            // 2. start server on local.env.PORT
            console.log('server listening on http-port ' + local.env.PORT);
            local.onReadyBefore.counter += 1;
            local.global.utility2_serverHttp1.listen(local.env.PORT, local.onReadyBefore);
            // 3. run tests
            local.testRunDefault(options);
            local.onReadyBefore();
        };

        local.timeElapsedStart = function (options) {
        /*
         * this function will start options.timeElapsed
         */
            options = options || {};
            options.timeStart = options.timeStart || Date.now();
            return options;
        };

        local.timeElapsedStop = function (options) {
        /*
         * this function will stop options.timeElapsed
         */
            options = local.timeElapsedStart(options);
            options.timeElapsed = Date.now() - options.timeStart;
            return options;
        };

        local.tryCatchOnError = function (fnc, onError) {
        /*
         * this function will try to run the fnc in a try-catch block,
         * else call onError with the errorCaught
         */
            try {
                // reset errorCaught
                local._debugTryCatchErrorCaught = null;
                return fnc();
            } catch (errorCaught) {
                // debug errorCaught
                local._debugTryCatchErrorCaught = errorCaught;
                return onError(errorCaught);
            }
        };

        local.tryCatchReadFile = function (file, options) {
        /*
         * this function will try to read the file or return an empty string
         */
            var data;
            data = '';
            try {
                data = local.fs.readFileSync(file, options);
            } catch (ignore) {
            }
            return data;
        };

        local.uglify = local.uglifyjs.uglify || local.echo;

        local.urlParse = function (url) {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/URL
         * this function will parse the url according to the above spec, plus a query param
         */
            var urlParsed;
            urlParsed = {};
            // try to parse the url
            local.tryCatchOnError(function () {
                // resolve host-less url
                switch (local.modeJs) {
                case 'browser':
                    local.serverLocalHost = local.serverLocalHost ||
                        location.protocol + '//' + location.host;
                    // resolve absolute path
                    if (url[0] === '/') {
                        url = local.serverLocalHost + url;
                    // resolve relative path
                    } else if (!(/^\w+?:\/\//).test(url)) {
                        url = local.serverLocalHost +
                            location.pathname.replace((/\/[^\/]*?$/), '') + '/' + url;
                    }
                    urlParsed = new local.global.URL(url);
                    break;
                case 'node':
                    local.env.PORT = local.env.PORT || '8081';
                    local.serverLocalHost = local.serverLocalHost ||
                        ('http://localhost:' + local.env.PORT);
                    // resolve absolute path
                    if (url[0] === '/') {
                        url = local.serverLocalHost + url;
                    // resolve relative path
                    } else if (!(/^\w+?:\/\//).test(url)) {
                        url = local.serverLocalHost + '/' + url;
                    }
                    urlParsed = local.url.parse(url);
                    break;
                }
                // init query
                urlParsed.query = {};
                urlParsed.search.slice(1).replace((/[^&]+/g), function (item) {
                    item = item.split('=');
                    item[0] = decodeURIComponent(item[0]);
                    item[1] = decodeURIComponent(item.slice(1).join('='));
                    // parse repeating query-param as an array
                    if (urlParsed.query[item[0]]) {
                        if (!Array.isArray(urlParsed.query[item[0]])) {
                            urlParsed.query[item[0]] = [urlParsed.query[item[0]]];
                        }
                        urlParsed.query[item[0]].push(item[1]);
                    } else {
                        urlParsed.query[item[0]] = item[1];
                    }
                });
            }, local.nop);
            // https://developer.mozilla.org/en/docs/Web/API/URL#Properties
            return {
                hash: urlParsed.hash || '',
                host: urlParsed.host || '',
                hostname: urlParsed.hostname || '',
                href: urlParsed.href || '',
                pathname: urlParsed.pathname || '',
                port: urlParsed.port || '',
                protocol: urlParsed.protocol || '',
                query: urlParsed.query || {},
                search: urlParsed.search || ''
            };
        };

        local.uuid4Create = function () {
        /*
         * this function will return a random uuid,
         * with format 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
         */
            // code derived from http://jsperf.com/uuid4
            var id, ii;
            id = '';
            for (ii = 0; ii < 32; ii += 1) {
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

        local.uuidTimeCreate = function () {
        /*
         * this function will return a time-based version of uuid4,
         * with format 'tttttttt-tttx-4xxx-yxxx-xxxxxxxxxxxx'
         */
            return Date.now().toString(16).replace((/(.{8})/), '$1-') +
                local.uuid4Create().slice(12);
        };
    }());



    // run shared js-env code - post-init
    (function () {
        local.ajaxProgressCounter = 0;
        local.ajaxProgressState = 0;
        local.cacheDict = {};
        local.contentTypeDict = {
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
        local.env = local.modeJs === 'browser'
            ? {}
            : process.env;
        local.errorDefault = new Error('default error');
        local.regexpUriComponentCharset = (/[\w\!\%\'\(\)\*\-\.\~]/);
        local.regexpUuidValidate =
            (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
        local.stringAsciiCharset =
            '\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f' +
            '\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f' +
            ' !"#$%&\'()*+,-./0123456789:;<=>?' +
            '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_' +
            '`abcdefghijklmnopqrstuvwxyz{|}~\x7f';
        local.stringUriComponentCharset = '!%\'()*-.' +
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~';
        local.taskOnTaskDict = {};
        local.testCaseDict = local.objectSetDefault({}, local);
        local.testReport = { testPlatformList: [{
            name: local.modeJs === 'browser'
                ? 'browser - ' + location.pathname + ' - ' + navigator.userAgent + ' - ' +
                    new Date().toISOString()
                : 'node - ' + process.platform + ' ' + process.version + ' - ' +
                    new Date().toISOString(),
            screenCaptureImg: local.env.MODE_BUILD_SCREEN_CAPTURE,
            testCaseList: []
        }] };
        // init serverLocalHost
        local.urlParse('');
        // init timeoutDefault
        switch (local.modeJs) {
        case 'browser':
            location.search.replace(
                (/\b(NODE_ENV|mode[A-Z]\w+|timeExit|timeoutDefault)=([\w\-\.\%]+)/g),
                function (match0, key, value) {
                    // jslint-hack
                    local.nop(match0);
                    local[key] = local.env[key] = value;
                    // try to JSON.parse the string
                    local.tryCatchOnError(function () {
                        local[key] = JSON.parse(value);
                    }, local.nop);
                }
            );
            break;
        case 'node':
            local.timeoutDefault = local.env.npm_config_timeout_default;
            break;
        }
        // init timeExit
        local.timeExit = Number(local.timeExit) ||
            Number(Date.now() + Number(local.env.npm_config_timeout_exit)) ||
            Number(local.env.npm_config_time_exit);
        if (local.timeExit) {
            local.timeoutDefault = local.timeExit - Date.now();
            setTimeout(local.exit, local.timeoutDefault);
        }
        // re-init timeoutDefault
        local.timeoutDefault = Number(local.timeoutDefault || 30000);
        local.onReadyAfter(local.nop);
        // init state
        local._stateInit({});
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        // require modules
        local.http = local._http;
        local.https = local._http;
        break;



    /* istanbul ignore next */
    // run node js-env code - post-init
    case 'node':
        // init exports
        module.exports = local;
        module.exports.__dirname = __dirname;
        // require modules
        local.Module = require('module');
        local.child_process = require('child_process');
        local.fs = require('fs');
        local.http = require('http');
        local.https = require('https');
        local.net = require('net');
        local.path = require('path');
        local.repl = require('repl');
        local.stream = require('stream');
        local.url = require('url');
        local.vm = require('vm');
        local.zlib = require('zlib');
        // init env
        local.objectSetDefault(local.env, {
            npm_config_dir_build: process.cwd() + '/tmp/build',
            npm_config_dir_tmp: process.cwd() + '/tmp'
        });
        if (local.global.utility2_rollup) {
            break;
        }
        // init assets
        [
            'lib.istanbul.js',
            'lib.jslint.js',
            'lib.db.js',
            'lib.sjcl.js',
            'lib.uglifyjs.js',
            'lib.utility2.css',
            'lib.utility2.js',
            'lib.utility2.sh',
            'templateDocApiHtml',
            'templateTestReportHtml'
        ].forEach(function (key) {
            switch (key) {
            case 'lib.istanbul.js':
            case 'lib.jslint.js':
            case 'lib.db.js':
            case 'lib.sjcl.js':
            case 'lib.uglifyjs.js':
                local.assetsDict['/assets.utility2.' + key] = local.istanbulInstrumentInPackage(
                    local.tryCatchReadFile(__dirname + '/' + key, 'utf8')
                        .replace((/^#!/), '//')
                        .replace(
                            (/(\bistanbul instrument in package .*-lite\b)/),
                            '!$1'
                        ),
                    __dirname + '/' + key
                );
                break;
            case 'lib.utility2.css':
                local.assetsDict['/assets.utility2.css'] =
                    local.tryCatchReadFile(__dirname + '/' + key, 'utf8');
                break;
            case 'lib.utility2.js':
                local.assetsDict['/assets.utility2.js'] = local.istanbulInstrumentInPackage(
                    local.tryCatchReadFile(__dirname + '/' + key, 'utf8')
                        .replace((/^#!/), '//'),
                    __dirname + '/' + key
                );
                break;
            case 'lib.utility2.sh':
                local.jslintAndPrintHtml(
                    local.tryCatchReadFile(__dirname + '/' + key, 'utf8')
                        .replace((/^#!/), '//'),
                    __dirname + '/' + key
                );
                break;
            case 'templateDocApiHtml':
            case 'templateTestReportHtml':
                local.jslintAndPrintHtml(local[key], key);
                break;
            }
        });
        local.assetsWrite('/assets.utility2.rollup.js', [
            '/assets.utility2.rollup.begin.js',
            '/assets.utility2.lib.db.js',
            '/assets.utility2.lib.istanbul.js',
            '/assets.utility2.lib.jslint.js',
            '/assets.utility2.lib.sjcl.js',
            '/assets.utility2.lib.uglifyjs.js',
            '/assets.utility2.js',
            '/assets.utility2.css',
            '/assets.utility2.rollup.end.js'
        ].map(function (key) {
            switch (local.path.extname(key)) {
            case '.js':
                return '// ' + key + '\n' + local.assetsDict[key];
            default:
                return '// ' + key + '\n' +
                    local.assetsDict['/assets.utility2.rollup.content.js']
                    .replace(
                        '/* utility2.rollup.js content */',
                        'local.assetsDict[' + JSON.stringify(key) + '] = ' +
                            JSON.stringify(local.assetsDict[key])
                    );
            }
        }).join('\n\n\n\n'));
        // init testCaseDict
        local.tryCatchReadFile(local.__dirname + '/test.js', 'utf8').replace(
            (/\/\/ run shared js-env code - function[\S\s]+?\n {4}\}\(\)\);/),
            function (match0, ii, text) {
                // preserve lineno
                match0 = text.slice(0, ii).replace((/.+/g), '') + match0;
                local.vm.runInNewContext(match0, local.objectSetDefault({
                    local: local.testCaseDict
                }, local.global));
            }
        );
        // merge previous test-report
        if (local.env.npm_config_file_test_report_merge) {
            console.log('merging file://' + local.env.npm_config_file_test_report_merge +
                ' to test-report');
            local.testReportMerge(
                local.testReport,
                JSON.parse(local.tryCatchReadFile(
                    local.env.npm_config_file_test_report_merge,
                    'utf8'
                ) || '{}')
            );
        }
        // run the cli
        if (module !== local.require2.main) {
            break;
        }
        switch (process.argv[2]) {
        case 'browserTest':
            local.browserTest({}, local.exit);
            break;
        }
        break;
    }
    // save utility2-api
    local.global.utility2_apiDict = local.objectSetDefault({}, local);
}(
    (function () {
        'use strict';
        var local;
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
        // init require
        if (local.modeJs === 'node') {
            local.require2 = require;
        }
        return local;
    }())
));
