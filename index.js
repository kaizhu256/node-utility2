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
        // init require
        require = function (key) {
            return local[key] || local.require2(key);
        };
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        // init global.debug_inline
        local.global['debug_inline'.replace('_i', 'I')] = function (arg) {
        /*
         * this function will both print the arg to stderr and return it
         */
            // debug arguments
            local.utility2['_debug_inlineArguments'.replace('_i', 'I')] = arguments;
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
        // init lib utility2
        local.utility2 = { assetsDict: {}, local: local };
        local.utility2.nop = function () {
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
                local[key] = local.utility2[key] = local.modeJs === 'browser'
                    ? local.global['utility2_' + key]
                    : require('./lib.' + key + '.js');
            } catch (ignore) {
            }
            local[key] = local.utility2[key] = local.utility2[key] || {};
        });
        // init assets and templates
/* jslint-ignore-begin */
local.utility2.assetsDict['/assets.example.js'] = '';



local.utility2.assetsDict['/assets.test.js'] = '';



local.utility2.assetsDict['/assets.utility2.rollup.begin.js'] = '\
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
    if (typeof module === "object") {\n\
        module.isRollup = true;\n\
    }\n\
}());\n\
';



local.utility2.assetsDict['/assets.utility2.rollup.content.js'] = '\
(function () {\n\
    "use strict";\n\
    var local;\n\
    (function () {\n\
        if (typeof module === "object") {\n\
            module.isRollup = true;\n\
        }\n\
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
        local = local.modeJs === "browser"\n\
            ? window.utility2.local\n\
            : module;\n\
/* jslint-ignore-begin */\n\
/* utility2.rollup.js content */\n\
/* jslint-ignore-end */\n\
    }());\n\
}());\n\
';



local.utility2.assetsDict['/assets.utility2.rollup.end.js'] = '\
/* utility2.rollup.js end */\n\
';



local.utility2.assetsDict['/favicon.ico'] = '';



// https://www.w3.org/TR/html5/forms.html#valid-e-mail-address
local.utility2.regexpEmailValidate = (
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
);



// https://img.shields.io/badge/last_build-0000_00_00_00_00_00_UTC_--_master_--_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-0077ff.svg?style=flat
local.utility2.templateBuildBadgeSvg =
'<svg xmlns="http://www.w3.org/2000/svg" width="563" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="563" height="20" fill="#555"/><rect rx="0" x="61" width="502" height="20" fill="#07f"/><path fill="#07f" d="M61 0h4v20h-4z"/><rect rx="0" width="563" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="31.5" y="15" fill="#010101" fill-opacity=".3">last build</text><text x="31.5" y="14">last build</text><text x="311" y="15" fill="#010101" fill-opacity=".3">0000-00-00 00:00:00 UTC - master - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</text><text x="311" y="14">0000-00-00 00:00:00 UTC - master - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</text></g></svg>';



local.utility2.templateDocApiHtml = '\
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
    background-color: #bbf;\n\
    color: #000;\n\
    display: block;\n\
}\n\
.docApiCodeKeywordSpan {\n\
    color: #f00;\n\
    font-weight: bold;\n\
}\n\
.docApiCodePre {\n\
    background-color: #eef;\n\
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
        {{#if envDict.npm_package_homepage}}\n\
        href="{{envDict.npm_package_homepage}}"\n\
        {{/if envDict.npm_package_homepage}}\n\
    >({{envDict.npm_package_name}} v{{envDict.npm_package_version}})</a>\n\
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



local.utility2.templateIndexHtml = '';



// https://img.shields.io/badge/tests_failed-999-dd0000.svg?style=flat
local.utility2.templateTestReportBadgeSvg =
'<svg xmlns="http://www.w3.org/2000/svg" width="103" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="103" height="20" fill="#555"/><rect rx="0" x="72" width="31" height="20" fill="#d00"/><path fill="#d00" d="M72 0h4v20h-4z"/><rect rx="0" width="103" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="37" y="15" fill="#010101" fill-opacity=".3">tests failed</text><text x="37" y="14">tests failed</text><text x="86.5" y="15" fill="#010101" fill-opacity=".3">999</text><text x="86.5" y="14">999</text></g></svg>';



local.utility2.templateTestReportHtml = '\
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
    background-color: #fdd;\n\
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
    background-color: #bfb;\n\
}\n\
.testReportPlatformDiv table {\n\
    border-top: 1px solid black;\n\
    text-align: left;\n\
    width: 100%;\n\
}\n\
.testReportPlatformDiv table > tbody > tr:nth-child(odd) {\n\
    background-color: #bfb;\n\
}\n\
.testReportPlatformDiv .testFailed {\n\
    background-color: #f99;\n\
}\n\
.testReportPlatformDiv .testPending {\n\
    background-color: #99f;\n\
}\n\
</style>\n\
<div class="testReportPlatformDiv summary">\n\
<h1>\n\
    <a\n\
        {{#if envDict.npm_package_homepage}}\n\
        href="{{envDict.npm_package_homepage}}"\n\
        {{/if envDict.npm_package_homepage}}\n\
    >{{envDict.npm_package_name}} v{{envDict.npm_package_version}}</a>\n\
</h1>\n\
<h2>test-report summary</h2>\n\
<h4>\n\
    <span>version</span>-\n\
        {{envDict.npm_package_version}}<br>\n\
    <span>test date</span>- {{date}}<br>\n\
    <span>commit info</span>-\n\
        {{#if envDict.CI_COMMIT_INFO}}\n\
        {{envDict.CI_COMMIT_INFO htmlSafe}}<br>\n\
        {{#unless envDict.CI_COMMIT_INFO}}\n\
        undefined<br>\n\
        {{/if envDict.CI_COMMIT_INFO}}\n\
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
            this.emit('data', local.utility2.bufferConcat(this.chunkList));
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
            xhr.timeout = local.utility2.timeoutDefault;
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
                this.responseText = local.utility2.bufferToString(data);
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
            local.utility2.streamReadAll(this.responseStream, this.onError);
        };

        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange
        local._http.XMLHttpRequest.prototype.onreadystatechange = local.utility2.nop;

        local._http.XMLHttpRequest.prototype.open = function (method, url) {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#open()
         * Initializes a request
         */
            this.method = method;
            this.url = url;
            // parse url
            this.urlParsed = local.utility2.urlParse(String(this.url));
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
        local._http.XMLHttpRequest.prototype.overrideMimeType = local.utility2.nop;

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
        local._http.XMLHttpRequest.prototype.upload = {
            addEventListener: local.utility2.nop
        };

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
                local.utility2.nop(port);
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
                local.utility2.serverLocalRequestHandler(
                    self.serverRequest,
                    self.serverResponse
                );
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

        // init lib Blob
        local.utility2.Blob = local.modeJs === 'browser'
            ? local.global.Blob
            : function (array, options) {
              /*
               * this function will return a node-compatible Blob instance
               */
                this.bff = local.utility2.bufferConcat(array);
                this.type = options && options.type;
            };

        // init lib FormData
        local.utility2.FormData = function () {
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

        local.utility2.FormData.prototype.append = function (name, value, filename) {
        /*
         * https://xhr.spec.whatwg.org/#dom-formdata-append
         * The append(name, value, filename) method, when invoked, must run these steps:
         * 1. If the filename argument is given, set value to a new File object
         *    whose contents are value and name is filename.
         * 2. Append a new entry whose name is name, and value is value,
         *    to context object's list of entries.
         */
            if (filename) {
                // bug - chromium cannot assign name to Blob instance
                local.utility2.tryCatchOnError(function () {
                    value.name = filename;
                }, local.utility2.nop);
            }
            this.entryList.push({ name: name, value: value });
        };

        local.utility2.FormData.prototype.read = function (onError) {
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
                onError(null, local.utility2.bufferCreate());
                return;
            }
            // init boundary
            boundary = '--' + local.utility2.uuidTimeCreate();
            // init result
            result = [];
            onParallel = local.utility2.onParallel(function (error) {
                // add closing boundary
                result.push([boundary + '--\r\n']);
                // concatenate result
                onError(error, !error && local.utility2.bufferConcat(
                    // flatten result
                    Array.prototype.concat.apply([], result)
                ));
            });
            onParallel.counter += 1;
            this.entryList.forEach(function (element, ii) {
                var value;
                value = element.value;
                if (!(value instanceof local.utility2.Blob)) {
                    result[ii] = [boundary + '\r\nContent-Disposition: form-data; name="' +
                        element.name + '"\r\n\r\n', value, '\r\n'];
                    return;
                }
                // read from blob in parallel
                onParallel.counter += 1;
                local.utility2.blobRead(value, 'binary', function (error, data) {
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

        local.utility2.ajax = function (options, onError) {
        /*
         * this function will send an ajax-request with error-handling and timeout
         */
            var timerTimeout, tmp, xhr;
            onError = local.utility2.onErrorWithStack(onError);
            // init modeServerLocal
            if (!local.utility2.envDict.npm_config_mode_backend &&
                    local.utility2.serverLocalUrlTest(options.url)) {
                xhr = new local._http.XMLHttpRequest();
            }
            // init xhr
            xhr = xhr || (local.modeJs === 'browser'
                ? new local.global.XMLHttpRequest()
                : new local._http.XMLHttpRequest());
            // debug xhr
            local.utility2._debugXhr = xhr;
            // init options
            local.utility2.objectSetOverride(xhr, options);
            // init headers
            xhr.headers = {};
            Object.keys(options.headers || {}).forEach(function (key) {
                xhr.headers[key.toLowerCase()] = options.headers[key];
            });
            // init method
            xhr.method = xhr.method || 'GET';
            // init timeout
            xhr.timeout = xhr.timeout || local.utility2.timeoutDefault;
            // init timerTimeout
            timerTimeout = local.utility2.onTimeout(function (error) {
                xhr.error = xhr.error || error;
                xhr.abort();
                // cleanup requestStream and responseStream
                local.utility2.requestResponseCleanup(xhr.requestStream, xhr.responseStream);
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
                        local.utility2.requestResponseCleanup(
                            xhr.requestStream,
                            xhr.responseStream
                        );
                    });
                    // decrement ajaxProgressCounter
                    local.utility2.ajaxProgressCounter = Math.max(
                        local.utility2.ajaxProgressCounter - 1,
                        0
                    );
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
                            local.utility2.tryCatchOnError(function () {
                                tmp += '    ' + JSON.stringify(xhr.responseText.slice(0, 256) +
                                    '...') + '\n';
                            }, local.utility2.nop);
                            local.utility2.errorMessagePrepend(xhr.error, tmp);
                        }
                    }
                    onError(xhr.error, xhr);
                    break;
                }
                local.utility2.ajaxProgressUpdate();
            };
            // increment ajaxProgressCounter
            local.utility2.ajaxProgressCounter += 1;
            xhr.addEventListener('abort', xhr.onEvent);
            xhr.addEventListener('error', xhr.onEvent);
            xhr.addEventListener('load', xhr.onEvent);
            xhr.addEventListener('loadstart', local.utility2.ajaxProgressUpdate);
            xhr.addEventListener('progress', local.utility2.ajaxProgressUpdate);
            xhr.upload.addEventListener('progress', local.utility2.ajaxProgressUpdate);
            // open url
            xhr.open(xhr.method, xhr.url);
            // set request-headers
            Object.keys(xhr.headers).forEach(function (key) {
                xhr.setRequestHeader(key, xhr.headers[key]);
            });
            if (xhr.data instanceof local.utility2.FormData) {
                // handle formData
                xhr.data.read(function (error, data) {
                    if (error) {
                        xhr.error = xhr.error || error;
                        xhr.onEvent({ type: 'error' });
                        return;
                    }
                    // send data
                    xhr.send(local.utility2.bufferToNodeBuffer(data));
                });
            } else {
                // send data
                xhr.send(local.utility2.bufferToNodeBuffer(xhr.data));
            }
            return xhr;
        };

        local.utility2.ajaxProgressShow = function () {
        /*
         * this function will show ajaxProgress
         */
            local.utility2.ajaxProgressCounter += 1;
            local.utility2.ajaxProgressUpdate();
            local.utility2.ajaxProgressCounter -= 1;
            local.utility2.timerTimeoutAjaxProgressHide =
                setTimeout(local.utility2.ajaxProgressUpdate, local.utility2.timeoutDefault);
        };

        local.utility2.ajaxProgressUpdate = function () {
        /*
         * this function will update ajaxProgress
         */
            var ajaxProgressBarDiv;
            ajaxProgressBarDiv = local.modeJs === 'browser' &&
                document.querySelector('.ajaxProgressBarDiv');
            if (!ajaxProgressBarDiv) {
                return;
            }
            // show ajaxProgressDiv
            ajaxProgressBarDiv.parentNode.style.display = 'block';
            // cleanup timerTimeout
            clearTimeout(local.utility2.timerTimeoutAjaxProgressHide);
            // increment ajaxProgress
            if (local.utility2.ajaxProgressCounter) {
                ajaxProgressBarDiv.innerHTML = 'loading';
                ajaxProgressBarDiv.className = ajaxProgressBarDiv.className
                    .replace((/ajaxProgressBarDiv\w+/), 'ajaxProgressBarDivLoading');
                // this algorithm will indefinitely increment the ajaxProgressBar
                // with successively smaller increments without ever reaching 100%
                local.utility2.ajaxProgressState += 1;
                ajaxProgressBarDiv.style.width =
                    100 - 75 * Math.exp(-0.125 * local.utility2.ajaxProgressState) + '%';
                return;
            }
            // finish ajaxProgress
            ajaxProgressBarDiv.innerHTML = 'loaded';
            ajaxProgressBarDiv.className = ajaxProgressBarDiv.className
                .replace((/ajaxProgressBarDiv\w+/), 'ajaxProgressBarDivLoaded');
            ajaxProgressBarDiv.style.width = '100%';
            // hide ajaxProgress
            local.utility2.timerTimeoutAjaxProgressHide = setTimeout(function () {
                ajaxProgressBarDiv.parentNode.style.display = 'none';
                // reset ajaxProgress
                local.utility2.ajaxProgressState = 0;
                ajaxProgressBarDiv.innerHTML = 'loading';
                ajaxProgressBarDiv.className = ajaxProgressBarDiv.className
                    .replace((/ajaxProgressBarDiv\w+/), 'ajaxProgressBarDivLoading');
                ajaxProgressBarDiv.style.width = '0%';
            }, 1500);
        };

        local.utility2.assert = function (passed, message) {
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

        local.utility2.assertJsonEqual = function (aa, bb) {
        /*
         * this function will assert
         * utility2.jsonStringifyOrdered(aa) === JSON.stringify(bb)
         */
            aa = local.utility2.jsonStringifyOrdered(aa);
            bb = JSON.stringify(bb);
            local.utility2.assert(aa === bb, [aa, bb]);
        };

        local.utility2.assertJsonNotEqual = function (aa, bb) {
        /*
         * this function will assert
         * utility2.jsonStringifyOrdered(aa) !== JSON.stringify(bb)
         */
            aa = local.utility2.jsonStringifyOrdered(aa);
            bb = JSON.stringify(bb);
            local.utility2.assert(aa !== bb, [aa, bb]);
        };

        local.utility2.blobRead = function (blob, encoding, onError) {
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
                        local.utility2.bufferToString(blob.bff, 'base64');
                    break;
                // readAsText
                case 'text':
                    data = local.utility2.bufferToString(blob.bff);
                    break;
                // readAsArrayBuffer
                default:
                    data = local.utility2.bufferCreate(blob.bff);
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
                        ? local.utility2.bufferCreate(reader.result)
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
        local.utility2.browserTest = function (options, onError) {
        /*
         * this function will spawn an electron process to test options.url
         */
            var done, modeNext, onNext, onParallel, timerTimeout;
            if (local.modeJs === 'node') {
                local.utility2.objectSetDefault(options, local.utility2.envDict);
                options.timeoutDefault = options.timeoutDefault ||
                    local.utility2.timeoutDefault;
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
                    options.testName = local.utility2.envDict.MODE_BUILD + '.browser.' +
                        encodeURIComponent(local.utility2.urlParse(options.url).pathname);
                    local.utility2.objectSetDefault(options, {
                        fileCoverage: local.utility2.envDict.npm_config_dir_tmp +
                            '/coverage.' + options.testName + '.json',
                        fileScreenCapture: (local.utility2.envDict.npm_config_dir_build +
                            '/screen-capture.' + options.testName + '.png')
                            .replace((/%/g), '_')
                            .replace((/_2F\.png$/), '.png'),
                        fileTestReport: local.utility2.envDict.npm_config_dir_tmp +
                            '/test-report.' + options.testName + '.json',
                        modeBrowserTest: 'test',
                        timeExit: Date.now() + options.timeoutDefault
                    }, 1);
                    // init timerTimeout
                    timerTimeout = local.utility2.onTimeout(
                        onNext,
                        options.timeoutDefault,
                        options.testName
                    );
                    // init file urlBrowser
                    options.modeNext = 20;
                    options.urlBrowser = local.utility2.envDict.npm_config_dir_tmp +
                        '/electron.' + local.utility2.uuidTimeCreate() + '.html';
                    local.utility2.fsMkdirpSync(local.utility2.envDict.npm_config_dir_build);
                    local.fs.writeFileSync(options.urlBrowser, '<style>body {' +
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
                        '<script>window.local = {}; (' + local.utility2.browserTest
                            .toString()
                            .replace((/<\//g), '<\\/')
                            // coverage-hack - un-instrument
                            .replace((/\b__cov_.*?\+\+/g), '0') +
                        '(' + JSON.stringify(options) + '))</script>');
                    console.log('\nbrowserTest - created electron entry-page ' +
                        options.urlBrowser + '\n');
                    // spawn an electron process to test a url
                    options.modeNext = 10;
                    local.utility2.processSpawnWithTimeout('electron', [
                        __filename,
                        'browserTest',
                        '--disable-overlay-scrollbar',
                        '--enable-logging'
                    ], {
                        env: local.utility2.jsonCopy(options),
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
                        local.utility2.tryCatchOnError(function () {
                            data = JSON.parse(
                                local.fs.readFileSync(options.fileCoverage, 'utf8')
                            );
                        }, local.utility2.nop);
                        if (!local.utility2._debugTryCatchErrorCaught) {
                            local.utility2.istanbulCoverageMerge(
                                local.global.__coverage__,
                                data
                            );
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
                    local.utility2.tryCatchOnError(function () {
                        data = JSON.parse(local.fs.readFileSync(
                            options.fileTestReport,
                            'utf8'
                        ));
                    }, local.utility2.nop);
                    if (local.utility2._debugTryCatchErrorCaught) {
                        onNext(local.utility2._debugTryCatchErrorCaught);
                        return;
                    }
                    console.log('\nbrowserTest - merging test-report from ' +
                        options.fileTestReport + '\n');
                    if (!options.modeTestIgnore) {
                        local.utility2.testReportMerge(local.utility2.testReport, data);
                    }
                    // create test-report.json
                    local.fs.writeFileSync(
                        local.utility2.envDict.npm_config_dir_build + '/test-report.json',
                        JSON.stringify(local.utility2.testReport)
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
                    local.utility2.objectSetDefault(
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
                    onParallel = local.utility2.onParallel(onNext);
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

        /* jslint-ignore-begin */
        local.utility2._bufferFromBase64 = function (text) {
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

        local.utility2._bufferToBase64 = function (bff) {
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

        local.utility2.bufferConcat = function (bufferList) {
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
                    element = local.utility2.bufferCreateIfNotBuffer(element);
                    length += element.length;
                    return element;
                });
            result = local.utility2.bufferCreate(length);
            ii = 0;
            bufferList.forEach(function (element) {
                for (jj = 0; jj < element.length; ii += 1, jj += 1) {
                    result[ii] = element[jj];
                }
            });
            return result;
        };

        local.utility2.bufferCreate = function (text, encoding) {
        /*
         * this function will return a Uint8Array from the text,
         * with either 'utf8' (default) or 'base64' encoding
         */
            if (typeof text === 'string') {
                if (encoding === 'base64') {
                    return local.utility2._bufferFromBase64(text);
                }
                return local.modeJs === 'browser'
                    ? new local.global.TextEncoder('utf-8').encode(text)
                    : new Buffer(text);
            }
            return new local.global.Uint8Array(text);
        };

        local.utility2.bufferCreateIfNotBuffer = function (text, encoding) {
        /*
         * this function will return a Uint8Array from the text with the given encoding,
         * if it is not already a Uint8Array
         */
            return text instanceof local.global.Uint8Array
                ? text
                : local.utility2.bufferCreate(text, encoding);
        };

        local.utility2.bufferIndexOfSubBuffer = function (bff, subBff, fromIndex) {
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

        local.utility2.bufferToNodeBuffer = function (bff) {
        /*
         * this function will convert the Uint8Array instance to a node Buffer instance
         */
            if (local.modeJs === 'node' &&
                    bff instanceof local.global.Uint8Array && (!Buffer.isBuffer(bff))) {
                Object.setPrototypeOf(bff, Buffer.prototype);
            }
            return bff;
        };

        local.utility2.bufferToString = function (bff, encoding) {
        /*
         * this function will convert the Uint8Array bff to a string,
         * with either 'utf8' (default) or 'base64' encoding
         */
            if (typeof bff === 'string') {
                return bff;
            }
            bff = local.utility2.bufferCreateIfNotBuffer(bff);
            if (encoding === 'base64') {
                return local.utility2._bufferToBase64(bff);
            }
            return local.modeJs === 'browser'
                ? new local.global.TextDecoder('utf-8').decode(bff)
                : new Buffer(bff).toString();
        };

        local.utility2.cookieDict = function () {
        /*
         * this function will return a dict of all cookies
         */
            var result;
            result = {};
            document.cookie.replace((/(\w+)=([^;]*)/g), function (match0, match1, match2) {
                // jslint-hack
                local.utility2.nop(match0);
                result[match1] = match2;
            });
            return result;
        };

        local.utility2.cookieRemove = function (name) {
        /*
         * this function will remove the cookie with the given name
         */
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        };

        local.utility2.cookieRemoveAll = function () {
        /*
         * this function will remove all cookies
         */
            document.cookie.replace((/(\w+)=/g), function (match0, match1) {
                // jslint-hack
                local.utility2.nop(match0);
                document.cookie = match1 + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            });
        };

        local.utility2.cookieSet = function (name, value, expiresOffset) {
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

        local.utility2.dbReset = function () {
        /*
         * this function will reset db's file-state and memory-state
         */
            local.utility2.onResetBefore.counter += 1;
            // visual notification
            local.utility2.ajaxProgressShow();
            local.utility2.onResetAfter(function (error) {
                // validate no error occurred
                local.utility2.assert(!error, error);
                local.utility2.onReadyBefore.counter += 1;
                local.utility2.dbSeedListUpsert(
                    local.utility2.dbSeedList,
                    local.utility2.onReadyBefore
                );
            });
            // reset db backend
            if (local.modeJs === 'browser' &&
                    local.utility2.envDict.npm_config_mode_backend) {
                local.utility2.onResetBefore.counter += 1;
                local.utility2.ajax({ url: '/dbReset' }, function (error, xhr) {
                    // jslint-hack
                    local.utility2.nop(error);
                    // debug xhr
                    local.utility2._debugXhrdbReset = xhr;
                    local.utility2.onResetBefore();
                });
            }
            // reset db local-persistence
            if (local.db.dbClear) {
                local.utility2.onResetBefore.counter += 1;
                local.db.dbClear(local.utility2.onResetBefore);
            }
            local.utility2.onResetBefore();
        };

        local.utility2.dbSeedListUpsert = function (optionsList, onError) {
        /*
         * this function will serially upsert optionsList[ii].dbRowList
         */
            var onParallel, options, self;
            options = {};
            local.utility2.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    local.utility2.objectSetDefault(optionsList[optionsList.modeNext], {
                        dbIndexCreateList: [],
                        dbIndexRemoveList: [],
                        dbRowList: []
                    });
                    // create dbTable
                    local.db.dbTableCreate(
                        optionsList[optionsList.modeNext],
                        options.onNext
                    );
                    break;
                case 2:
                    self = data;
                    // remove dbIndex
                    optionsList[
                        optionsList.modeNext
                    ].dbIndexRemoveList.forEach(function (index) {
                        self.dbIndexRemove(index, onParallel);
                    });
                    // create dbIndex
                    optionsList[
                        optionsList.modeNext
                    ].dbIndexCreateList.forEach(function (index) {
                        self.dbIndexCreate(index);
                    });
                    // upsert dbRow
                    onParallel = local.utility2.onParallel(options.onNext);
                    onParallel.counter += 1;
                    optionsList[optionsList.modeNext].dbRowList.forEach(function (dbRow) {
                        onParallel.counter += 1;
                        self.crudUpdate({ id: dbRow.id }, dbRow, { upsert: true }, onParallel);
                    });
                    onParallel();
                    break;
                default:
                    optionsList.onNext(error);
                }
            });
            local.utility2.onNext(optionsList, function (error) {
                // recursively run each sub-middleware in middlewareList
                if (optionsList.modeNext < optionsList.length) {
                    options.modeNext = 0;
                    options.onNext();
                    return;
                }
                onError(error);
            });
            optionsList.modeNext = -1;
            local.utility2.onResetAfter(optionsList.onNext);
        };

        local.utility2.docApiCreate = function (options) {
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
                element.source = local.utility2.stringHtmlSafe(element.source)
                    .replace((/\([\S\s]*?\)/), function (match0) {
                        // init signature
                        element.signature = match0
                            .replace((/ *?\/\*[\S\s]*?\*\/ */g), '')
                            .replace((/ /g), '&nbsp;');
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
                            local.utility2.nop(match0);
                            if ((/\b(?:JSON\.|function )$/).test(match1)) {
                                return;
                            }
                            element.example = '...' + trimLeft(
                                local.utility2.stringHtmlSafe(match1) +
                                    '<span class="docApiCodeKeywordSpan">' + match2 +
                                    '</span>' + local.utility2.stringHtmlSafe(match3)
                            ).trimRight() + '\n...';
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
                    module = local.utility2.objectSetDefault(options.moduleDict[key], {
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
                                return key && key[0] !== '_' &&
                                    !(/\W/).test(key) &&
                                    key.indexOf('testCase_') !== 0;
                            })
                            .map(function (key) {
                                elementName = key;
                                return elementCreate();
                            })
                            .sort(function (aa, bb) {
                                return aa.name < bb.name
                                    ? -1
                                    : 1;
                            }),
                        id: 'module.' + module.name,
                        name: module.name
                    };
                });
            options.envDict = local.utility2.envDict;
            return local.utility2.templateRender(
                local.utility2.templateDocApiHtml,
                options
            );
        };

        local.utility2.domFragmentRender = function (template, dict) {
        /*
         * this function will return a dom-fragment rendered from the givent template and dict
         */
            var tmp;
            tmp = document.createElement('template');
            tmp.innerHTML = local.utility2.templateRender(template, dict);
            return tmp.content;
        };

        local.utility2.domQuerySelectorAll = function (element, selectors) {
        /*
         * this function will return the list of query-selected dom-elements,
         * as a javascript array
         */
            return Array.prototype.slice.call((element.length === 1
                // handle jQuery element
                ? element[0]
                : element).querySelectorAll(selectors));
        };

        local.utility2.echo = function (arg) {
        /*
         * this function will return the arg
         */
            return arg;
        };

        local.utility2.errorMessagePrepend = function (error, message) {
        /*
         * this function will prepend the message to error.message and error.stack
         */
            error.message = message + error.message;
            error.stack = message + error.stack;
            return error;
        };

        local.utility2.exit = function (exitCode) {
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
            local.utility2.modeTest = null;
        };

        local.utility2.fsMkdirpSync = function (dir) {
        /*
         * this function will synchronously 'mkdir -p' the dir
         */
            local.child_process.spawnSync(
                'mkdir',
                ['-p', local.path.resolve(process.cwd(), dir)],
                { stdio: ['ignore', 1, 2] }
            );
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
            data = local.utility2.bufferToNodeBuffer(data);
            file = local.path.resolve(process.cwd(), file);
            // save data to file
            local.fs.writeFile(file, data, function (error) {
                if (error && error.code === 'ENOENT') {
                    // if save failed, then mkdirp file's parent dir
                    local.utility2.processSpawnWithTimeout(
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

        local.utility2.isNullOrUndefined = function (arg) {
        /*
         * this function will test if the arg is null or undefined
         */
            return arg === null || arg === undefined;
        };

        local.utility2.istanbulCoverageMerge = function (coverage1, coverage2) {
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
                                dict1[key][ii] += count;
                            });
                        });
                        break;
                    // increment coverage for function and statement lines
                    case 'f':
                    case 's':
                        Object.keys(dict2).forEach(function (key) {
                            dict1[key] += dict2[key];
                        });
                        break;
                    }
                });
            });
            return coverage1;
        };

        // init istanbulCoverageReportCreate
        local.utility2.istanbulCoverageReportCreate =
            local.utility2.istanbul.coverageReportCreate || local.utility2.echo;

        // init istanbulInstrumentInPackage
        local.utility2.istanbulInstrumentInPackage =
            local.utility2.istanbul.instrumentInPackage || local.utility2.echo;

        // init istanbulInstrumentSync
        local.utility2.istanbulInstrumentSync =
            local.utility2.istanbul.instrumentSync || local.utility2.echo;

        // init jslintAndPrint
        local.utility2.jslintAndPrint =
            local.utility2.jslint.jslintAndPrint || local.utility2.echo;

        local.utility2.jslintAndPrintConditional = function (script, file) {
        /*
         * this function will jslint / csslint the script and print any errors to stderr,
         * conditionally
         */
            var extname;
            // cleanup errors
            local.utility2.jslint.errorCounter = 0;
            local.utility2.jslint.errorText = '';
            extname = (/\.\w+$/).exec(file);
            extname = extname && extname[0];
            switch (extname) {
            case '.css':
                if (script.indexOf('/*csslint') < 0) {
                    return script;
                }
                break;
            /* istanbul ignore next */
            case '.js':
                if (local.utility2.envDict.NODE_ENV === 'production' ||
                        local.global.__coverage__ ||
                        script.indexOf('/*jslint') < 0) {
                    return script;
                }
                break;
            }
            return local.utility2.jslintAndPrint(script, file);
        };

        local.utility2.jslintAndPrintHtml = function (script, file) {
        /*
         * this function will jalint and csslint the html script
         */
            // csslint <style> tag
            script.replace(
                (/<style>([\S\s]+?)<\/style>/g),
                function (match0, match1, ii, text) {
                    // jslint-hack
                    local.utility2.nop(match0);
                    // preserve lineno
                    match1 = text.slice(0, ii).replace((/.+/g), '') + match1;
                    local.utility2.jslintAndPrintConditional(match1, file + '.css');
                }
            );
            // jslint <script> tag
            script.replace(
                (/<script>([\S\s]+?)<\/script>/g),
                function (match0, match1, ii, text) {
                    // jslint-hack
                    local.utility2.nop(match0);
                    // preserve lineno
                    match1 = text.slice(0, ii).replace((/.+/g), '') + match1;
                    local.utility2.jslintAndPrintConditional(match1, file + '.js');
                }
            );
            return script;
        };

        local.utility2.jsonCopy = function (arg) {
        /*
         * this function will return a deep-copy of the JSON-arg
         */
            return arg === undefined
                ? undefined
                : JSON.parse(JSON.stringify(arg));
        };

        local.utility2.jsonStringifyOrdered = function (element, replacer, space) {
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
                            return typeof tmp === 'string'
                                ? JSON.stringify(key) + ':' + tmp
                                : undefined;
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

        local.utility2.jwtHs256Decode = function (password, token) {
        /*
         * https://jwt.io/
         * this function will decode the json-web-token with the given password
         */
            var data;
            // try to decode the token
            local.utility2.tryCatchOnError(function () {
                token = token.split('.');
                // validate header
                local.utility2.assert(
                    token[0] === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                    token
                );
                // validate signature
                token[3] = JSON.parse(local.utility2.stringFromBase64(token[1]));
                local.utility2.assert(local.utility2.sjclHashHmacSha256Create(
                    password,
                    token[0] + '.' + token[1]
                ).replace((/\=/g), '') === token[2]);
                data = token[3];
            }, local.utility2.nop);
            // return decoded data
            return data;
        };

        local.utility2.jwtHs256Encode = function (password, data) {
        /*
         * https://jwt.io/
         * this function will encode the data into a json-web-token with the given password
         */
            var token;
            token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                local.utility2.stringToBase64(JSON.stringify(data)).replace((/\=/g), '');
            return (token + '.' + local.utility2.sjclHashHmacSha256Create(password, token))
                .replace((/\=/g), '');
        };

        local.utility2.listGetElementRandom = function (list) {
        /*
         * this function will return a random element from the list
         */
            return list[Math.floor(list.length * Math.random())];
        };

        local.utility2.listShuffle = function (list) {
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

        local.utility2.middlewareAssetsCached = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will serve cached-assets
         */
            var options;
            options = {};
            local.utility2.onNext(options, function (error, data) {
                options.result = options.result ||
                    local.utility2.assetsDict[request.urlParsed.pathname];
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
                    local.utility2.taskOnErrorPushCached({
                        cacheDict: 'middlewareAssetsCachedGzip',
                        key: request.urlParsed.pathname
                    }, options.onNext, function (onError) {
                        local.zlib.gzip(options.result, function (error, data) {
                            onError(error, !error && data.toString('base64'));
                        });
                    });
                    break;
                case 2:
                    // set gzip header
                    options.result = local.utility2.bufferCreate(data, 'base64');
                    response.setHeader('Content-Encoding', 'gzip');
                    response.setHeader('Content-Length', options.result.length);
                    options.onNext();
                    break;
                case 3:
                    local.utility2.middlewareCacheControlLastModified(
                        request,
                        response,
                        options.onNext
                    );
                    break;
                case 4:
                    response.end(options.result);
                    break;
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.utility2.middlewareBodyRead = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will
         * read and save the request-body to request.bodyRaw
         */
            // jslint-hack
            local.utility2.nop(response);
            // if request is already read, then goto nextMiddleware
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
         * this function will run the middleware that will update the Last-Modified header
         */
            // do not cache if headers already sent or url has '?' search indicator
            if (!(response.headersSent || request.url.indexOf('?') >= 0)) {
                // init serverResponseHeaderLastModified
                local.utility2.serverResponseHeaderLastModified =
                    local.utility2.serverResponseHeaderLastModified ||
                    // resolve to 1000 ms
                    new Date(new Date(Math.floor(Date.now() / 1000) * 1000).toGMTString());
                // respond with 304 If-Modified-Since serverResponseHeaderLastModified
                if (new Date(request.headers['if-modified-since']) >=
                        local.utility2.serverResponseHeaderLastModified) {
                    response.statusCode = 304;
                    response.end();
                    return;
                }
                response.setHeader('Cache-Control', 'no-cache');
                response.setHeader(
                    'Last-Modified',
                    local.utility2.serverResponseHeaderLastModified.toGMTString()
                );
            }
            nextMiddleware();
        };

        local.utility2.middlewareError = function (error, request, response) {
        /*
         * this function will run the middleware that will handle errors
         */
            // if error occurred, then respond with '500 Internal Server Error',
            // else respond with '404 Not Found'
            local.utility2.serverRespondDefault(request, response, error
                ? (error.statusCode >= 400 && error.statusCode < 600
                    ? error.statusCode
                    : 500)
                : 404, error);
        };

        local.utility2.middlewareFileServer = function (request, response, nextMiddleware) {
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
            local.utility2.taskOnErrorPushCached({
                cacheDict: 'middlewareFileServer',
                key: request.urlFile
            }, function (error, data) {
                // default to nextMiddleware
                if (error) {
                    nextMiddleware();
                    return;
                }
                // init response-header content-type
                request.urlParsed.contentType = (/\.[^\.]*$/).exec(request.urlParsed.pathname);
                request.urlParsed.contentType = local.utility2.contentTypeDict[
                    request.urlParsed.contentType && request.urlParsed.contentType[0]
                ];
                local.utility2.serverRespondHeadSet(request, response, null, {
                    'Content-Type': request.urlParsed.contentType
                });
                // serve file from cache
                response.end(local.utility2.bufferCreate(data, 'base64'));
            // run background-task to re-cache file
            }, function (onError) {
                local.fs.readFile(request.urlFile, function (error, data) {
                    onError(error, data && local.utility2.bufferToString(data, 'base64'));
                });
            });
        };

        local.utility2.middlewareGroupCreate = function (middlewareList) {
        /*
         * this function will create a middleware that will
         * sequentially run the sub-middlewares in middlewareList
         */
            var self;
            self = function (request, response, nextMiddleware) {
                var options;
                options = {};
                local.utility2.onNext(options, function (error) {
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

        local.utility2.middlewareInit = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will init the request and response
         */
            // debug server-request
            local.utility2._debugServerRequest = request;
            // debug server-response
            local.utility2._debugServerResponse = response;
            // init timerTimeout
            local.utility2.serverRespondTimeoutDefault(
                request,
                response,
                local.utility2.timeoutDefault
            );
            // init request.urlParsed
            request.urlParsed = local.utility2.urlParse(request.url);
            // init response-header content-type
            request.urlParsed.contentType = (/\.[^\.]*$/).exec(request.urlParsed.pathname);
            request.urlParsed.contentType = local.utility2.contentTypeDict[
                request.urlParsed.contentType && request.urlParsed.contentType[0]
            ];
            local.utility2.serverRespondHeadSet(request, response, null, {
                'Content-Type': request.urlParsed.contentType
            });
            // set main-page content-type to text/html
            if (request.urlParsed.pathname === '/') {
                local.utility2.serverRespondHeadSet(request, response, null, {
                    'Content-Type': 'text/html; charset=UTF-8'
                });
            }
            // init response.end and response.write to accept Uint8Array instance
            ['end', 'write'].forEach(function (key) {
                response['_' + key] = response['_' + key] || response[key];
                response[key] = function () {
                    var args;
                    args = Array.prototype.slice.call(arguments);
                    args[0] = local.utility2.bufferToNodeBuffer(args[0]);
                    response['_' + key].apply(response, args);
                };
            });
            // default to nextMiddleware
            nextMiddleware();
        };

        local.utility2.middlewareJsonpStateInit = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will
         * serve the browser-state wrapped in the given request.jsonp-callback
         */
            var state;
            if (request.stateInit || (request.urlParsed &&
                    request.urlParsed.pathname === '/jsonp.utility2.stateInit')) {
                state = { utility2: { envDict: {
                    NODE_ENV: local.utility2.envDict.NODE_ENV,
                    npm_config_mode_backend: local.utility2.envDict.npm_config_mode_backend,
                    npm_package_description: local.utility2.envDict.npm_package_description,
                    npm_package_homepage: local.utility2.envDict.npm_package_homepage,
                    npm_package_name: local.utility2.envDict.npm_package_name,
                    npm_package_version: local.utility2.envDict.npm_package_version
                } } };
                if (request.stateInit) {
                    return state;
                }
                response.end(request.urlParsed.query.callback + '(' + JSON.stringify(state) +
                    ');');
                return;
            }
            nextMiddleware();
        };

        local.utility2.objectGetElementFirst = function (arg) {
        /*
         * this function will get the first element of the arg
         */
            var item;
            item = {};
            item.key = Object.keys(arg)[0];
            item.value = arg[item.key];
            return item;
        };

        local.utility2.objectKeysTypeof = function (arg) {
        /*
         * this function will return a list of the arg's keys, sorted by item-type
         */
            return Object.keys(arg).map(function (key) {
                return typeof arg[key] + ' ' + key;
            }).sort().join('\n');
        };

        local.utility2.objectLiteralize = function (arg) {
        /*
         * this function will traverse arg, and replace every encounter of the magical key '$[]'
         * with its object literal [key, value]
         */
            local.utility2.objectTraverse(arg, function (element) {
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

        local.utility2.objectSetDefault = function (arg, defaults, depth) {
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
                    local.utility2.objectSetDefault(arg2, defaults2, depth - 1);
                }
            });
            return arg;
        };

        local.utility2.objectSetOverride = function (arg, overrides, depth) {
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
                    local.utility2.objectSetOverride(arg2, overrides2, depth - 1);
                    return;
                }
                // else set arg[key] with overrides[key]
                arg[key] = arg === local.utility2.envDict
                    // if arg is envDict, then overrides falsey value with empty string
                    ? overrides2 || ''
                    : overrides2;
            });
            return arg;
        };

        local.utility2.objectTraverse = function (arg, onSelf, circularList) {
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
                    local.utility2.objectTraverse(arg[key], onSelf, circularList);
                });
            }
            return arg;
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

        local.utility2.onErrorWithStack = function (onError) {
        /*
         * this function will return a new callback that will call onError,
         * and append the current stack to any error
         */
            var stack;
            stack = new Error().stack.replace((/(.*?)\n.*?$/m), '$1');
            return function (error, data, meta) {
                if (error && String(error.stack).indexOf(stack.split('\n')[2]) < 0) {
                    // append the current stack to error.stack
                    error.stack += '\n' + stack;
                }
                onError(error, data, meta);
            };
        };

        local.utility2.onFileModifiedRestart = function (file) {
        /*
         * this function will watch the file, and if modified, then restart the process
         */
            if (local.utility2.envDict.npm_config_mode_auto_restart &&
                    local.fs.existsSync(file) &&
                    local.fs.statSync(file).isFile()) {
                local.fs.watchFile(file, {
                    interval: 1000,
                    persistent: false
                }, function (stat2, stat1) {
                    if (stat2.mtime > stat1.mtime) {
                        console.log('file modified - ' + file);
                        local.utility2.exit(77);
                    }
                });
            }
        };

        local.utility2.onNext = function (options, onError) {
        /*
         * this function will wrap onError inside the recursive function options.onNext,
         * and append the current stack to any error
         */
            options.onNext = local.utility2.onErrorWithStack(function (error, data, meta) {
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

        local.utility2.onParallel = function (onError, onDebug) {
        /*
         * this function will return a function that will
         * 1. run async tasks in parallel
         * 2. if counter === 0 or error occurred, then call onError with error
         */
            var self;
            onError = local.utility2.onErrorWithStack(onError);
            onDebug = onDebug || local.utility2.nop;
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

        local.utility2.onTimeout = function (onError, timeout, message) {
        /*
         * this function will return a timeout-error-handler,
         * that will append the current stack to any error encountered
         */
            onError = local.utility2.onErrorWithStack(onError);
            // create timeout timer
            return setTimeout(function () {
                onError(new Error('onTimeout - timeout-error - ' +
                    timeout + ' ms - ' + (typeof message === 'function'
                    ? message()
                    : message)));
            // coerce to finite integer
            }, timeout | 0);
        };

        local.utility2.processSpawnWithTimeout = function () {
        /*
         * this function will run like child_process.spawn,
         * but with auto-timeout after timeoutDefault milliseconds
         */
            var childProcess;
            // spawn childProcess
            childProcess = local.child_process.spawn.apply(local.child_process, arguments)
                .on('exit', function () {
                    // try to kill timerTimeout childProcess
                    local.utility2.tryCatchOnError(function () {
                        process.kill(childProcess.timerTimeout.pid);
                    }, local.utility2.nop);
                });
            // init failsafe timerTimeout
            childProcess.timerTimeout = local.child_process.spawn('/bin/sh', ['-c', 'sleep ' +
                // coerce to finite integer
                (((0.001 * local.utility2.timeoutDefault) | 0) +
                // add 2 second delay to failsafe timerTimeout
                2) + '; kill -9 ' + childProcess.pid + ' 2>/dev/null'], { stdio: 'ignore' });
            return childProcess;
        };

        local.utility2.profile = function (task, onError) {
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

        local.utility2.profileSync = function (task) {
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

        local.utility2.replStart = function () {
        /*
         * this function will start the repl debugger
         */
            var self;
            /*jslint evil: true*/
            if (local.utility2.replServer) {
                return;
            }
            // start replServer
            self = local.utility2.replServer = local.repl.start({ useGlobal: true });
            self.onError = function (error) {
            /*
             * this function will debug any repl-error
             */
                local.utility2._debugReplError = error || local.utility2._debugReplError;
            };
            self._domain.on('error', self.onError);
            // save repl eval function
            self.evalDefault = self.eval;
            // hook custom repl eval function
            self.eval = function (script, context, file, onError) {
                var match, onError2;
                match = (/^(\S+)(.*?)\n/).exec(script);
                onError2 = function (error, data) {
                    // debug error
                    self.onError(error);
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
                    local.utility2.processSpawnWithTimeout(
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
                    local.utility2.processSpawnWithTimeout(
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
                // try to eval the script
                local.utility2.tryCatchOnError(function () {
                    self.evalDefault(script, context, file, onError2);
                }, onError2);
            };
            self.socket = {
                end: local.utility2.nop,
                on: local.utility2.nop,
                write: local.utility2.nop
            };
            // init process.stdout
            process.stdout._write2 = process.stdout._write2 || process.stdout._write;
            process.stdout._write = function (chunk, encoding, callback) {
                process.stdout._write2(chunk, encoding, callback);
                if (self.socket.readable) {
                    self.socket.write(chunk, encoding);
                }
            };
            // start tcp-server
            self.serverTcp = local.net.createServer(function (socket) {
                // init socket
                self.socket = socket;
                self.socket.on('data', self.write.bind(self));
                self.socket.on('error', local.utility2.onErrorDefault);
                self.socket.setKeepAlive(true);
            });
            // coverage-hack - test no tcp-server handling-behavior
            [
                local.utility2.envDict.PORT_REPL
            ].filter(local.utility2.echo).forEach(function (port) {
                console.log('repl-server listening on tcp-port ' + port);
                self.serverTcp.listen(port);
            });
        };

        local.utility2.requestResponseCleanup = function (request, response) {
        /*
         * this function will end or destroy the request and response objects
         */
            [request, response].forEach(function (stream) {
                // try to end the stream
                local.utility2.tryCatchOnError(function () {
                    stream.end();
                }, function () {
                    // if error, then try to destroy the stream
                    local.utility2.tryCatchOnError(function () {
                        stream.destroy();
                    }, local.utility2.nop);
                });
            });
        };

        local.utility2.requireExampleJsFromReadme = function (options) {
        /*
         * this function will require and export example.js embedded in README.md
         */
            var file, module, script;
            if (options.module.isRollup) {
                // init assets
                local.utility2.assetsDict['/'] = local.utility2.assetsDict['/index.html'] =
                    local.utility2.templateRender(options.module.exports.templateIndexHtml, {
                        envDict: local.utility2.envDict,
                        isRollup: true
                    });
                local.utility2.assetsDict['/assets.app.js'] =
                    local.fs.readFileSync(__filename, 'utf8');
                local.utility2.assetsDict['/assets.app.min.js'] =
                    local.utility2.uglifyIfProduction(
                        local.utility2.assetsDict['/assets.app.js']
                    );
                return options.module;
            }
            file = options.__dirname + '/example.js';
            // read script from README.md
            local.fs.readFileSync(options.__dirname + '/README.md', 'utf8')
                .replace(
                    (/```\w*?(\n[\W\s]*?example.js[\n\"][\S\s]+?)\n```/),
                    function (match0, match1, ii, text) {
                        // jslint-hack
                        local.utility2.nop(match0);
                        // preserve lineno
                        script = text.slice(0, ii).replace((/.+/g), '') + match1;
                    }
                );
            script = script
                // alias require($npm_package_name) to module.moduleExports;
                .replace(
                    "require('" + local.utility2.envDict.npm_package_name + "')",
                    'module.moduleExports'
                )
                // uncomment utility2-comment
                .replace((/<!-- utility2-comment\b([\S\s]+?)\butility2-comment -->/g), '$1');
            // jslint script
            local.utility2.jslintAndPrint(script, file);
            // cover script
            script = local.utility2.istanbulInstrumentInPackage(script, file);
            // init module
            module = local.require2.cache[file] = new local.Module(file);
            module.moduleExports = require(options.__dirname + '/index.js');
            // load script into module
            module._compile(script, file);
            // init exports
            module.exports.utility2 = local.utility2;
            module.exports[local.utility2.envDict.npm_package_name] = module.moduleExports;
            // init assets
            local.utility2.assetsDict[
                '/assets.' + local.utility2.envDict.npm_package_name + '.css'
            ] = local.utility2.tryCatchReadFile(process.cwd() + '/index.css', 'utf8');
            local.utility2.assetsDict[
                '/assets.' + local.utility2.envDict.npm_package_name + '.js'
            ] = local.utility2.istanbulInstrumentInPackage(
                local.utility2.tryCatchReadFile(process.cwd() + '/index.js', 'utf8')
                    .replace((/^#!/), '//'),
                process.cwd() + '/index.js'
            );
            local.utility2.assetsDict['/assets.example.js'] = script;
            local.utility2.assetsDict['/assets.test.js'] =
                local.utility2.istanbulInstrumentInPackage(
                    local.utility2.tryCatchReadFile(process.cwd() + '/test.js', 'utf8'),
                    process.cwd() + '/test.js'
                );
            local.utility2.assetsDict['/'] = local.utility2.assetsDict['/index.html'] =
                local.utility2.jslintAndPrintHtml(
                    local.utility2.templateRender(module.exports.templateIndexHtml, {
                        envDict: local.utility2.envDict,
                        isRollup: module.isRollup ||
                            local.utility2.envDict.NODE_ENV === 'production'
                    })
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
                    case '.css':
                    case '.js':
                    case '.json':
                        // jslint file
                        local.utility2.jslintAndPrintConditional(
                            local.fs.readFileSync(file, 'utf8'),
                            file
                        );
                        break;
                    }
                });
            });
            return module.exports;
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
         * this function will return a timeout-error-handler for the server-request
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
                // cleanup timerTimeout
                clearTimeout(request.timerTimeout);
            });
        };

        local.utility2.serverLocalUrlTest = local.utility2.nop;

        local.utility2.sjclCipherAes128Decrypt = function (password, encrypted) {
        /*
         * this function will aes-decrypt the encrypted-data with the given password
         */
            var decrypted;
            local.utility2.tryCatchOnError(function () {
                encrypted = encrypted.split('.');
                decrypted = local.utility2.sjcl.decrypt(password, JSON.stringify({
                    ct: encrypted[2],
                    iter: 128,
                    iv: encrypted[1],
                    mode: 'gcm',
                    salt: encrypted[0]
                }));
            }, local.utility2.nop);
            return decrypted;
        };

        local.utility2.sjclCipherAes128Encrypt = function (password, decrypted) {
        /*
         * this function will aes-encrypt the decrypted-data with the given password
         */
            var options;
            options = { iter: 128, mode: 'gcm' };
            options = JSON.parse(local.utility2.sjcl.encrypt(password, decrypted, options));
            return (options.salt + '.' + options.iv + '.' + options.ct)
                .replace((/\=/g), '');
        };

        local.utility2.sjclHashHmacSha256Create = function (password, data) {
        /*
         * this function will return the base64-encoded hmac-sha256 hash
         * of the data with the given password
         */
            return local.utility2.sjcl.codec.base64.fromBits(
                new local.utility2.sjcl.misc.hmac(
                    local.utility2.sjcl.codec.utf8String.toBits(password)
                ).encrypt(data)
            );
        };

        local.utility2.sjclHashScryptCreate = function (password, options) {
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
                options[3] = local.utility2.sjcl.codec.base64.fromBits(
                    local.utility2.sjcl.random.randomWords(4, 0)
                );
            }
            // init hash
            options[4] = local.utility2.sjcl.codec.base64.fromBits(
                local.utility2.sjcl.misc.scrypt(
                    password || '',
                    local.utility2.sjcl.codec.base64.toBits(options[3]),
                    Math.pow(2, parseInt(options[2].slice(0, 1), 16)),
                    parseInt(options[2].slice(1, 2), 16),
                    parseInt(options[2].slice(3, 4), 16)
                )
            );
            return options.slice(0, 5).join('$');
        };

        local.utility2.sjclHashScryptValidate = function (password, hash) {
        /*
         * https://github.com/wg/scrypt
         * this function will validate the password against the scrypt-hash
         */
            return local.utility2.sjclHashScryptCreate(password, hash) === hash;
        };

        local.utility2.sjclHashSha256Create = function (data) {
        /*
         * this function will return the base64-encoded sha-256 hash of the string data
         */
            return local.utility2.sjcl.codec.base64.fromBits(
                local.utility2.sjcl.hash.sha256.hash(data)
            );
        };

        local.utility2.stateInit = function (options) {
        /*
         * this function will init the state-options
         */
            local.utility2.objectSetOverride(local, options, 10);
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
                    onError(null, local.modeJs === 'browser'
                        ? chunkList[0]
                        : local.utility2.bufferConcat(chunkList));
                })
                // on error event, pass error to onError
                .on('error', onError);
        };

        local.utility2.stringFromBase64 = function (text) {
        /*
         * this function will convert the base64-encoded text to text
         */
            return local.utility2.bufferToString(local.utility2.bufferCreate(text, 'base64'));
        };

        local.utility2.stringHtmlSafe = function (text) {
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

        local.utility2.stringToBase64 = function (text) {
        /*
         * this function will convert the text to base64-encoded text
         */
            return local.utility2.bufferToString(local.utility2.bufferCreate(text), 'base64');
        };

        local.utility2.taskOnErrorPush = function (options, onError) {
        /*
         * this function will push the callback onError to the task named options.key
         */
            var task;
            onError = local.utility2.onErrorWithStack(onError);
            // init task
            task = local.utility2.taskOnTaskDict[options.key] =
                local.utility2.taskOnTaskDict[options.key] || { onErrorList: [] };
            // push callback onError to the task
            task.onErrorList.push(onError);
        };

        local.utility2.taskOnErrorPushCached = function (options, onError, onTask) {
        /*
         * this function will
         * 1. if cache-hit, then call onError with cacheValue
         * 2. run onTask in background
         * 3. save onTask's result to cache
         * 4. if cache-miss, then call onError with onTask's result
         */
            local.utility2.onNext(options, function (error, data) {
                switch (options.modeNext) {
                //  1. if cache-hit, then call onError with cacheValue
                case 1:
                    // read cacheValue from memory-cache
                    local.utility2.cacheDict[options.cacheDict] =
                        local.utility2.cacheDict[options.cacheDict] || {};
                    options.cacheValue =
                        local.utility2.cacheDict[options.cacheDict][options.key];
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
                    local.utility2.taskOnErrorPush(options, options.onNext);
                    local.utility2.taskOnTaskUpsert(options, onTask);
                    break;
                default:
                    // 3. save onTask's result to cache
                    // JSON.stringify data to prevent side-effects on cache
                    options.cacheValue = JSON.stringify(data);
                    if (!error && options.cacheValue) {
                        local.utility2.cacheDict[options.cacheDict][options.key] =
                            options.cacheValue;
                    }
                    // 4. if cache-miss, then call onError with onTask's result
                    if (!options.modeCacheHit) {
                        onError(error, options.cacheValue && JSON.parse(options.cacheValue));
                    }
                    (options.onCacheWrite || local.utility2.nop)();
                    break;
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.utility2.taskOnTaskUpsert = function (options, onTask) {
        /*
         * this function will upsert the task onTask named options.key
         */
            var task;
            // init task
            task = local.utility2.taskOnTaskDict[options.key] =
                local.utility2.taskOnTaskDict[options.key] || { onErrorList: [] };
            // if task is defined, then return
            if (task.onTask) {
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
                delete local.utility2.taskOnTaskDict[options.key];
                // preserve error.message and error.stack
                task.result = JSON.stringify(Array.prototype.slice.call(arguments)
                    .map(function (element) {
                        if (element && element.stack) {
                            element = local.utility2.objectSetDefault(local.utility2.jsonCopy(
                                element
                            ), {
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
            task.timerTimeout = local.utility2.onTimeout(
                task.onDone,
                options.timeout || local.utility2.timeoutDefault,
                'taskOnTaskUpsert ' + options.key
            );
            task.onTask = onTask;
            // run onTask
            task.onTask(task.onDone);
            return task;
        };

        local.utility2.templateRender = function (template, dict) {
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
                            return local.utility2.templateRender(partial, dict);
                        }).join('')
                        : '';
                case 'if':
                    partial = partial.split('{{#unless ' + key + '}}');
                    partial = getValue(key)
                        ? partial[0]
                        // handle 'unless' case
                        : partial.slice(1).join('{{#unless ' + key + '}}');
                    // recurse with partial
                    return local.utility2.templateRender(partial, dict);
                case 'unless':
                    return getValue(key)
                        ? ''
                        // recurse with partial
                        : local.utility2.templateRender(partial, dict);
                default:
                    // recurse with partial
                    return match0[0] + local.utility2.templateRender(match0.slice(1), dict);
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
                        value = local.utility2.stringHtmlSafe(String(value));
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
            // try to call onError with mock-objects
            local.utility2.tryCatchOnError(function () {
                // mock-objects
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

        local.utility2.testReportCreate = function (testReport) {
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
                local.utility2.envDict.npm_config_dir_build + '/test-report.html',
                local.utility2.testReportMerge(testReport, {})
            );
            // create build.badge.svg
            local.fs.writeFileSync(local.utility2.envDict.npm_config_dir_build +
                '/build.badge.svg', local.utility2.templateBuildBadgeSvg
                // edit branch name
                .replace((/0000-00-00 00:00:00/g),
                    new Date().toISOString().slice(0, 19).replace('T', ' '))
                // edit branch name
                .replace((/- master -/g), '| ' + local.utility2.envDict.CI_BRANCH + ' |')
                // edit commit id
                .replace((/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/g),
                    local.utility2.envDict.CI_COMMIT_ID));
            // create test-report.badge.svg
            local.fs.writeFileSync(local.utility2.envDict.npm_config_dir_build +
                '/test-report.badge.svg', local.utility2.templateTestReportBadgeSvg
                // edit number of tests failed
                .replace((/999/g), testReport.testsFailed)
                // edit badge color
                .replace(
                    (/d00/g),
                    // coverage-hack - cover both fail and pass cases
                    '0d00'.slice(!!testReport.testsFailed).slice(0, 3)
                ));
            console.log('created test-report file://' +
                local.utility2.envDict.npm_config_dir_build + '/test-report.html\n');
            // if any test failed, then exit with non-zero exit-code
            console.log('\n' + local.utility2.envDict.MODE_BUILD +
                ' - ' + testReport.testsFailed + ' failed tests\n');
            // exit with number of tests failed
            local.utility2.exit(testReport.testsFailed);
        };

        local.utility2.testReportMerge = function (testReport1, testReport2) {
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
                // validate timeElapsed
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
                            (/^(browser|node)\b/),
                            local.utility2.envDict.MODE_BUILD + ' - $1'
                        );
                    }
                    // validate timeElapsed
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
                        // validate timeElapsed
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
                    return arg1.status.replace('passed', 'z') + arg1.name <
                        arg2.status.replace('passed', 'z') + arg2.name
                        ? -1
                        : 1;
                });
            });
            // sort testPlatformList by status and name
            testReport.testPlatformList.sort(function (arg1, arg2) {
                return arg1.status.replace('passed', 'z') + arg1.name <
                    arg2.status.replace('passed', 'z') + arg2.name
                    ? -1
                    : 1;
            });
            // stop testReport timer
            if (testReport.testsPending === 0) {
                local.utility2.timeElapsedStop(testReport);
            }
            // 2. return testReport1 in html-format
            // json-copy testReport that will be modified for html templating
            testReport = local.utility2.jsonCopy(testReport1);
            // update timeElapsed
            local.utility2.timeElapsedStop(testReport);
            testReport.testPlatformList.forEach(function (testPlatform) {
                local.utility2.timeElapsedStop(testPlatform);
                testPlatform.testCaseList.forEach(function (testCase) {
                    if (!testCase.done) {
                        local.utility2.timeElapsedStop(testCase);
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
            return local.utility2.templateRender(
                local.utility2.templateTestReportHtml,
                local.utility2.objectSetOverride(testReport, {
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
                                    return local.utility2.objectSetOverride(testCase, {
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

        local.utility2.testRun = function (options) {
        /*
         * this function will run all tests in testPlatform.testCaseList
         */
            var exit, onParallel, testPlatform, testReport, testReportDiv, timerInterval;
            // init modeTest
            local.utility2.modeTest = local.utility2.modeTest ||
                local.utility2.envDict.npm_config_mode_test;
            if (!(local.utility2.modeTest || options.modeTest)) {
                return;
            }
            if (!options.onReadyAfter) {
                // reset db
                local.utility2.dbReset();
                options.onReadyAfter = local.utility2.onReadyAfter(function () {
                    local.utility2.testRun(options);
                });
                return;
            }
            options.onReadyAfter = null;
            // init onParallel
            onParallel = local.utility2.onParallel(function () {
            /*
             * this function will create the test-report after all tests are done
             */
                // stop testPlatform timer
                local.utility2.timeElapsedStop(testPlatform);
                // finalize testReport
                local.utility2.testReportMerge(testReport, {});
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
                        local.utility2.envDict.npm_config_dir_build + '/test-report.json',
                        JSON.stringify(testReport)
                    );
                    // restore exit
                    process.exit = exit;
                    break;
                }
                setTimeout(function () {
                    if (local.modeJs === 'browser') {
                        // update coverageReport
                        local.utility2.istanbulCoverageReportCreate({
                            coverage: local.global.__coverage__
                        });
                    }
                    // exit with number of tests failed
                    local.utility2.exit(testReport.testsFailed);
                // coverage-hack - wait 1000 ms for timerInterval
                }, 1000);
            });
            onParallel.counter += 1;
            // mock exit
            switch (local.modeJs) {
            case 'node':
                exit = process.exit;
                process.exit = local.utility2.nop;
                break;
            }
            // init modeTestCase
            local.utility2.modeTestCase = local.utility2.modeTestCase ||
                local.utility2.envDict.npm_config_mode_test_case;
            // init testReport
            testReport = local.utility2.testReport;
            // init testReport timer
            local.utility2.timeElapsedStart(testReport);
            // init testPlatform
            testPlatform = local.utility2.testReport.testPlatformList[0];
            // init testPlatform timer
            local.utility2.timeElapsedStart(testPlatform);
            // reset testPlatform.testCaseList
            testPlatform.testCaseList.length = 0;
            // add tests into testPlatform.testCaseList
            Object.keys(options).forEach(function (key) {
                // add testCase options[key] to testPlatform.testCaseList
                if ((local.utility2.modeTestCase && local.utility2.modeTestCase === key) ||
                        (!local.utility2.modeTestCase && key.indexOf('testCase_') === 0)) {
                    testPlatform.testCaseList.push({
                        name: key,
                        status: 'pending',
                        onTestCase: options[key]
                    });
                }
            });
            // visual notification - update test-progress until done
            // init testReportDiv element
            if (local.modeJs === 'browser') {
                testReportDiv = document.querySelector('.testReportDiv');
            }
            testReportDiv = testReportDiv || { style: {} };
            testReportDiv.style.display = 'block';
            testReportDiv.innerHTML = local.utility2.testReportMerge(testReport, {});
            // update test-report status every 1000 ms until done
            timerInterval = setInterval(function () {
                // update testReportDiv in browser
                testReportDiv.innerHTML = local.utility2.testReportMerge(testReport, {});
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
                        local.utility2.assert(testCase.errorStack, 'invalid errorStack ' +
                            testCase.errorStack);
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
                    local.utility2.timeElapsedStop(testCase);
                    console.log('[' + local.modeJs + ' test-case ' +
                        testPlatform.testCaseList.filter(function (testCase) {
                            return testCase.done;
                        }).length + ' of ' + testPlatform.testCaseList.length + ' ' +
                        testCase.status + '] - ' + testCase.name);
                    // if all tests are done, then create test-report
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
                // try to run testCase
                local.utility2.tryCatchOnError(function () {
                    // start testCase timer
                    local.utility2.timeElapsedStart(testCase);
                    testCase.onTestCase(null, onError);
                }, onError);
            });
            onParallel();
        };

        local.utility2.testRunServer = function (options) {
        /*
         * this function will
         * 1. create server from options.middleware
         * 2. start server on local.utility2.envDict.PORT
         * 3. run tests
         */
            local.utility2.onReadyBefore.counter += 1;
            local.utility2.objectSetDefault(options, {
                middleware: local.utility2.middlewareGroupCreate([
                    local.utility2.middlewareInit,
                    local.utility2.middlewareAssetsCached,
                    local.utility2.middlewareJsonpStateInit
                ]),
                middlewareError: local.utility2.middlewareError
            });
            // 1. create server from options.middleware
            local.utility2.serverLocalRequestHandler = function (request, response) {
                options.middleware(request, response, function (error) {
                    options.middlewareError(error, request, response);
                });
            };
            local.utility2.server = local.http.createServer(
                local.utility2.serverLocalRequestHandler
            );
            // 2. start server on local.utility2.envDict.PORT
            local.utility2.envDict.PORT = local.utility2.envDict.PORT || '8081';
            console.log('server listening on http-port ' + local.utility2.envDict.PORT);
            local.utility2.onReadyBefore.counter += 1;
            local.utility2.server.listen(
                local.utility2.envDict.PORT,
                local.utility2.onReadyBefore
            );
            // 3. run tests
            local.utility2.testRun(options);
            local.utility2.onReadyBefore();
        };

        local.utility2.timeElapsedStart = function (options) {
        /*
         * this function will start options.timeElapsed
         */
            options = options || {};
            options.timeStart = options.timeStart || Date.now();
            return options;
        };

        local.utility2.timeElapsedStop = function (options) {
        /*
         * this function will stop options.timeElapsed
         */
            options = local.utility2.timeElapsedStart(options);
            options.timeElapsed = Date.now() - options.timeStart;
            return options;
        };

        local.utility2.tryCatchOnError = function (fnc, onError) {
        /*
         * this function will try to run the fnc in a try-catch block,
         * else call onError with the errorCaught
         */
            try {
                local.utility2._debugTryCatchErrorCaught = null;
                return fnc();
            } catch (errorCaught) {
                local.utility2._debugTryCatchErrorCaught = errorCaught;
                return onError(errorCaught);
            }
        };

        local.utility2.tryCatchReadFile = function (file, options) {
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

        local.utility2.uglify = local.utility2.uglifyjs.uglify || local.utility2.echo;

        local.utility2.uglifyIfProduction = function (code) {
        /*
         * this function will, if $NODE_ENV === production, then uglify the js-code
         *
         */
            return local.utility2.envDict.NODE_ENV === 'production'
                ? local.utility2.uglify(code)
                : code;
        };

        local.utility2.urlParse = function (url) {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/URL
         * this function will parse the url according to the above spec, plus a query param
         */
            var urlParsed;
            urlParsed = {};
            // try to parse the url
            local.utility2.tryCatchOnError(function () {
                // resolve host-less url
                switch (local.modeJs) {
                case 'browser':
                    local.utility2.serverLocalHost = local.utility2.serverLocalHost ||
                        location.protocol + '//' + location.host;
                    // resolve absolute path
                    if (url[0] === '/') {
                        url = local.utility2.serverLocalHost + url;
                    // resolve relative path
                    } else if (!(/^\w+?:\/\//).test(url)) {
                        url = local.utility2.serverLocalHost +
                            location.pathname.replace((/\/[^\/]*?$/), '') + '/' + url;
                    }
                    urlParsed = new local.global.URL(url);
                    break;
                case 'node':
                    local.utility2.serverLocalHost = local.utility2.serverLocalHost ||
                        'http://localhost:' + (local.utility2.envDict.PORT || '80');
                    // resolve absolute path
                    if (url[0] === '/') {
                        url = local.utility2.serverLocalHost + url;
                    // resolve relative path
                    } else if (!(/^\w+?:\/\//).test(url)) {
                        url = local.utility2.serverLocalHost + '/' + url;
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
            }, local.utility2.nop);
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

        local.utility2.uuid4Create = function () {
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

        local.utility2.uuidTimeCreate = function () {
        /*
         * this function will return a time-based version of uuid4,
         * with format 'tttttttt-tttx-4xxx-yxxx-xxxxxxxxxxxx'
         */
            return Date.now().toString(16).replace((/(.{8})/), '$1-') +
                local.utility2.uuid4Create().slice(12);
        };
    }());



    // run shared js-env code - post-init
    (function () {
        local.utility2.ajaxProgressCounter = 0;
        local.utility2.ajaxProgressState = 0;
        local.utility2.cacheDict = {};
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
        local.utility2.dbSeedList = [];
        local.utility2.envDict = local.modeJs === 'browser'
            ? {}
            : process.env;
        local.utility2.errorDefault = new Error('default error');
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
        local.utility2.taskOnTaskDict = {};
        local.utility2.testCaseDict = local.utility2.objectSetDefault({}, local);
        local.utility2.testReport = { testPlatformList: [{
            name: local.modeJs === 'browser'
                ? 'browser - ' +
                    location.pathname + ' - ' +
                    navigator.userAgent + ' - ' +
                    new Date().toISOString()
                : 'node - ' + process.platform + ' ' + process.version + ' - ' +
                    new Date().toISOString(),
            screenCaptureImg: local.utility2.envDict.MODE_BUILD_SCREEN_CAPTURE,
            testCaseList: []
        }] };
        // init serverLocalHost
        local.utility2.urlParse('');
        // init timeoutDefault
        switch (local.modeJs) {
        case 'browser':
            location.search.replace(
                (/\b(NODE_ENV|mode[A-Z]\w+|timeExit|timeoutDefault)=([\w\-\.\%]+)/g),
                function (match0, key, value) {
                    // jslint-hack
                    local.utility2.nop(match0);
                    local.utility2[key] = local.utility2.envDict[key] = value;
                    // try to JSON.parse the string
                    local.utility2.tryCatchOnError(function () {
                        local.utility2[key] = JSON.parse(value);
                    }, local.utility2.nop);
                }
            );
            break;
        case 'node':
            local.utility2.timeoutDefault = local.utility2.envDict.npm_config_timeout_default;
            break;
        }
        // init timeExit
        local.utility2.timeExit = Number(local.utility2.timeExit) ||
            Number(Date.now() + Number(local.utility2.envDict.npm_config_timeout_exit)) ||
            Number(local.utility2.envDict.npm_config_time_exit);
        if (local.utility2.timeExit) {
            local.utility2.timeoutDefault = local.utility2.timeExit - Date.now();
            setTimeout(local.utility2.exit, local.utility2.timeoutDefault);
        }
        // re-init timeoutDefault
        local.utility2.timeoutDefault = Number(local.utility2.timeoutDefault || 30000);
        // init onReadyAfter
        local.utility2.onReadyAfter = function (onError) {
        /*
         * this function will call onError when onReadyBefore.counter === 0
         */
            local.utility2.onReadyBefore.counter += 1;
            local.utility2.taskOnErrorPush({ key: 'utility2.onReadyAfter' }, onError);
            local.utility2.onResetAfter(local.utility2.onReadyBefore);
            return onError;
        };
        // init onReadyBefore
        local.utility2.onReadyBefore = local.utility2.onParallel(function (error) {
        /*
         * this function will keep track of onReadyBefore.counter
         */
            local.utility2.taskOnErrorPush({ key: 'utility2.onReadyAfter' }, function (error) {
                // validate no error occurred
                local.utility2.assert(!error, error);
            });
            local.utility2.taskOnTaskUpsert({
                key: 'utility2.onReadyAfter'
            }, function (onError) {
                onError(error);
            });
        });
        // init onResetAfter
        local.utility2.onResetAfter = function (onError) {
        /*
         * this function will call onError when onResetBefore.counter === 0
         */
            local.utility2.onResetBefore.counter += 1;
            // visual notification - onResetAfter
            local.utility2.ajaxProgressUpdate();
            local.utility2.taskOnErrorPush({ key: 'utility2.onResetAfter' }, onError);
            setTimeout(local.utility2.onResetBefore);
            return onError;
        };
        // init onResetBefore
        local.utility2.onResetBefore = local.utility2.onParallel(function (error) {
        /*
         * this function will keep track of onResetBefore.counter
         */
            local.utility2.taskOnErrorPush({ key: 'utility2.onResetAfter' }, function (error) {
                // validate no error occurred
                local.utility2.assert(!error, error);
            });
            local.utility2.taskOnTaskUpsert({
                key: 'utility2.onResetAfter'
            }, function (onError) {
                onError(error);
            });
        });
        local.utility2.onReadyAfter(local.utility2.nop);
        // init state
        local.utility2.stateInit({});
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        // init exports
        local.global.utility2 = local.utility2;
        // require modules
        local.http = local._http;
        local.https = local._http;
        break;



    /* istanbul ignore next */
    // run node js-env code - post-init
    case 'node':
        // init exports
        module.exports = local.utility2;
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
        // init envDict
        local.utility2.objectSetDefault(local.utility2.envDict, {
            npm_config_dir_build: process.cwd() + '/tmp/build',
            npm_config_dir_tmp: process.cwd() + '/tmp'
        });
        if (module.isRollup) {
            break;
        }
        // init assets
        [
            'index.css',
            'index.js',
            'index.sh',
            'lib.istanbul.js',
            'lib.jslint.js',
            'lib.db.js',
            'lib.sjcl.js',
            'lib.uglifyjs.js',
            'templateDocApiHtml',
            'templateTestReportHtml'
        ].forEach(function (key) {
            switch (key) {
            case 'index.css':
                local.utility2.assetsDict['/assets.utility2.css'] =
                    local.utility2.tryCatchReadFile(__dirname + '/' + key, 'utf8');
                break;
            case 'index.js':
                local.utility2.assetsDict['/assets.utility2.js'] =
                    local.utility2.istanbulInstrumentInPackage(
                        local.utility2.tryCatchReadFile(__dirname + '/' + key, 'utf8')
                            .replace((/^#!/), '//'),
                        __dirname + '/' + key
                    );
                break;
            case 'index.sh':
                local.utility2.jslintAndPrintHtml(
                    local.utility2.tryCatchReadFile(__dirname + '/' + key, 'utf8')
                        .replace((/^#!/), '//'),
                    __dirname + '/' + key
                );
                break;
            case 'lib.istanbul.js':
            case 'lib.jslint.js':
            case 'lib.db.js':
            case 'lib.sjcl.js':
            case 'lib.uglifyjs.js':
                local.utility2.assetsDict['/assets.utility2.' + key] =
                    local.utility2.istanbulInstrumentInPackage(
                        local.utility2.tryCatchReadFile(__dirname + '/' + key, 'utf8')
                            .replace((/^#!/), '//')
                            .replace(
                                (/(\bistanbul instrument in package .*-lite\b)/),
                                '!$1'
                            ),
                        __dirname + '/' + key
                    );
                break;
            case 'templateDocApiHtml':
            case 'templateTestReportHtml':
                local.utility2.jslintAndPrintHtml(local.utility2[key], key);
                break;
            }
        });
        local.utility2.assetsDict['/assets.utility2.rollup.js'] = [
            '/assets.utility2.rollup.begin.js',
            '/assets.utility2.lib.istanbul.js',
            '/assets.utility2.lib.jslint.js',
            '/assets.utility2.lib.db.js',
            '/assets.utility2.lib.sjcl.js',
            '/assets.utility2.lib.uglifyjs.js',
            '/assets.utility2.js',
            '/assets.utility2.css',
            '/assets.utility2.rollup.end.js'
        ].map(function (key) {
            switch (local.path.extname(key)) {
            case '.js':
                return '// ' + key + '\n' + local.utility2.assetsDict[key];
            default:
                return '// ' + key + '\n' +
                    local.utility2.assetsDict['/assets.utility2.rollup.content.js']
                    .replace(
                        '/* utility2.rollup.js content */',
                        'local.utility2.assetsDict[' + JSON.stringify(key) + '] = ' +
                            JSON.stringify(local.utility2.assetsDict[key])
                    );
            }
        }).join('\n\n\n\n');
        // init testCaseDict
        local.utility2.tryCatchReadFile(local.utility2.__dirname + '/test.js', 'utf8').replace(
            (/\/\/ run shared js-env code - function[\S\s]+?\n {4}\}\(\)\);/),
            function (match0, ii, text) {
                // preserve lineno
                match0 = text.slice(0, ii).replace((/.+/g), '') + match0;
                local.vm.runInNewContext(match0, local.utility2.objectSetDefault({
                    local: local.utility2.testCaseDict
                }, local.global));
            }
        );
        // merge previous test-report
        if (local.utility2.envDict.npm_config_file_test_report_merge &&
                local.fs.existsSync(
                    local.utility2.envDict.npm_config_file_test_report_merge
                )) {
            local.utility2.testReportMerge(
                local.utility2.testReport,
                JSON.parse(local.fs.readFileSync(
                    local.utility2.envDict.npm_config_file_test_report_merge,
                    'utf8'
                ))
            );
        }
        // run the cli
        if (module !== local.require2.main) {
            break;
        }
        switch (process.argv[2]) {
        case 'browserTest':
            local.utility2.browserTest({}, local.utility2.exit);
            break;
        }
        break;
    }
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
        // init module
        if (local.modeJs === 'node') {
            local = module;
            local.modeJs = 'node';
            local.require2 = require;
        }
        return local;
    }())
));
