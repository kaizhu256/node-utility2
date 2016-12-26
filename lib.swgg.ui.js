/* istanbul instrument in package swgg */
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
        local = local.global.utility2_rollup || (local.modeJs === 'browser'
            ? window.swgg
            : require('./lib.swgg.js'));
/* jslint-ignore-begin */
local.templateUiDatatable = '\
<div class="pagination tr">\n\
    {{#each pageList}}\n\
    <button\n\
        class="onEventDatatableReload"\n\
        data-page-number={{pageNumber}}\n\
        data-resource-name="{{name}}"\n\
        {{#if disabled}}disabled{{/if disabled}}\n\
    >\n\
        {{value}}\n\
    </button>\n\
    {{/each pageList}}\n\
</div>\n\
<table class="borderBottom borderTop">\n\
    <thead>\n\
        <tr>\n\
            <th style="padding-left: {{iiPadding}}rem; padding-right: {{iiPadding}}rem;">\n\
                <button class="onEventDatatableSelectedRemove">remove</button>\n\
            </th>\n\
            {{#each propDefList}}\n\
            <th class="cursorPointer">\n\
                <div>{{name}}</div>\n\
                <div class="color777">{{td2.innerHTML htmlSafe}}</div>\n\
                <div class="sortAsc">+</div>\n\
                <div class="sortDsc">-</div>\n\
            </th>\n\
            {{/each propDefList}}\n\
        </tr>\n\
    </thead>\n\
    <tbody>\n\
        {{#each dbRowList}}\n\
        <tr data-id="{{id}}" data-idField="{{idField}}">\n\
            <td class="cursorPointer eventDelegateClick onEventDatatableTrSelect">\n\
                <span class="tr">\n\
                    <input type="checkbox">\n\
                    <span class="flex1">{{ii}}</span>\n\
                </span>\n\
            </td>\n\
            {{#each colList}}\n\
            <td class="cursorPointer">{{valueEncoded htmlSafe}}</td>\n\
            {{/each colList}}\n\
        </tr>\n\
        {{/each dbRowList}}\n\
    <tfoot>\n\
    </tfoot>\n\
</table>\n\
';



// https://github.com/swagger-api/swagger-ui/blob/v2.1.3/src/main/template/main.handlebars
local.templateUiMain = '\
<div class="eventDelegateClick modal onEventModalHide" style="display: none; opacity: 0;">\n\
    <form class="datatable eventDelegateClick flex1"></form>\n\
</div>\n\
<div class="eventDelegateClick popup" style="display: none;"></div>\n\
<form2 class="eventDelegateSubmit header onEventUiReload tr">\n\
    <a class="td1" href="http://swagger.io" target="_blank">swagger</a>\n\
    <input\n\
        class="flex1 td2"\n\
        placeholder="http://petstore.swagger.io/v2/swagger.json"\n\
        type="text"\n\
        value="{{url}}"\n\
    >\n\
</form2>\n\
<div class="info reset">\n\
    {{#if info}}\n\
    <div class="fontWeightBold">{{info.title htmlSafe}}</div>\n\
    {{#if info.description}}\n\
    <div>{{info.description htmlSafe}}</div>\n\
    {{/if info.description}}\n\
    <ul>\n\
        {{#if externalDocs}}\n\
        <li class="marginTop05">\n\
            {{#if externalDocs.description}}\n\
            <p>{{externalDocs.description htmlSafe}}</p>\n\
            {{/if externalDocs.description}}\n\
            <a href="{{externalDocs.url}}" target="_blank">{{externalDocs.url}}</a>\n\
        </li>\n\
        {{/if externalDocs}}\n\
        {{#if info.termsOfService}}\n\
        <li class="marginTop05"><a target="_blank" href="{{info.termsOfService}}">Terms of service</a></li>\n\
        {{/if info.termsOfService}}\n\
        {{#if info.contact.name}}\n\
        <li class="marginTop05">Created by {{info.contact.name htmlSafe}}</li>\n\
        {{/if info.contact.name}}\n\
        {{#if info.contact.url}}\n\
        <li class="marginTop05">See more at <a href="{{info.contact.url}}">{{info.contact.url}}</a></li>\n\
        {{/if info.contact.url}}\n\
        {{#if info.contact.email}}\n\
        <li class="marginTop05"><a target="_parent" href="mailto:{{info.contact.email}}?subject={{info.title htmlSafe}}">Contact the developer</a></li>\n\
        {{/if info.contact.email}}\n\
        {{#if info.license}}\n\
        <li class="marginTop05"><a target="_blank" href="{{info.license.url}}">{{info.license.name}}</a></li>\n\
        {{/if info.license}}\n\
    </ul>\n\
    {{/if info}}\n\
</div>\n\
<div class="reset resourceList"></div>\n\
<div class="color777 footer reset">\n\
    <div>[ <span>base url</span>: {{basePath}}, <span>api version</span>: {{info.version}} ]</div>\n\
</div>\n\
';



// https://github.com/swagger-api/swagger-ui/blob/v2.1.3/src/main/template/operation.handlebars
local.templateUiOperation = '\
<div\n\
    class="eventDelegateClick eventDelegateSubmit marginTop05 operation {{_method}}"\n\
    data-_key-operation-id="{{_keyOperationId}}"\n\
    id="{{id}}"\n\
>\n\
    <div class="cursorPointer eventDelegateClick onEventOperationDisplayShow header tr">\n\
        <span class="td1">{{_method}}</span>\n\
        <span class="flex1 td2 {{#if deprecated}}fontLineThrough{{/if deprecated}}">{{_path}}</span>\n\
        <span class="flex1 td3">{{operationId}}</span>\n\
        <span class="flex1 td4">{{summary htmlSafe}}</span>\n\
    </div>\n\
    <form accept-charset="UTF-8" class="content" style="display: none;">\n\
        {{#if deprecated}}\n\
        <h4 class="label marginTop10">Warning: Deprecated</h4>\n\
        {{/if deprecated}}\n\
        {{#if description}}\n\
        <h4 class="label marginTop10">Description</h4>\n\
        <div>{{description htmlSafe}}</div>\n\
        {{/if description}}\n\
        {{#if parameters.length}}\n\
        <h4 class="label marginTop10">Parameters</h4>\n\
        <div class="marginTop05 paramDef tr">\n\
            <span class="color777 td1">Name and Description</span>\n\
            <span class="color777 td2">Data Type</span>\n\
            <span class="color777 td3">Value</span>\n\
            <span class="color777 td4">Schema</span>\n\
        </div>\n\
        {{#each parameters}}\n\
        <div class="borderTop paramDef tr" id="{{id}}" name="{{name}}">\n\
        </div>\n\
        {{/each parameters}}\n\
        {{/if parameters.length}}\n\
        <h4 class="label marginTop10">Response Messages</h4>\n\
        <div class="marginTop05 responseList tr">\n\
            <span class="color777 td1">HTTP Status Code</span>\n\
            <span class="color777 td2">Reason</span>\n\
        </div>\n\
        {{#each responseList}}\n\
        <div class="borderTop responseList tr">\n\
            <span class="td1">{{key}}</span>\n\
            {{#if value.description}}\n\
            <span class="td2">{{value.description htmlSafe}}</span>\n\
            {{/if value.description}}\n\
        </div>\n\
        {{/each responseList}}\n\
        <button class="marginTop10 onEventOperationAjax">Try it out!</button>\n\
        <div class="marginTop05 responseAjax"></div>\n\
    </form>\n\
</div>\n\
';



// https://github.com/swagger-api/swagger-ui/blob/v2.1.3/src/main/template/param.handlebars
local.templateUiParam = '\
<span class="td1 {{#if required}}fontWeightBold{{/if required}}">\n\
    {{name}}<br>\n\
    {{#if description}}\n\
    <span class="color777">{{description}}</span>\n\
    {{/if description}}\n\
</span>\n\
<span class="td2">{{type2}}{{#if format2}} ({{format2}}){{/if format2}}</span>\n\
<span class="td3">\n\
    {{#if isTextarea}}\n\
    <textarea class="input" placeholder="{{placeholder}}"></textarea>\n\
    {{/if isTextarea}}\n\
    {{#if isFile}}\n\
    <input class="input" type="file">\n\
    {{/if isFile}}\n\
    {{#if isSelect}}\n\
    <select class="input" {{#if isSelectMultiple}}multiple{{/if isSelectMultiple}}>\n\
        {{#each selectOptionList}}\n\
        <option id={{id}} {{selected}}>{{valueEncoded htmlSafe}}</option>\n\
        {{/each selectOptionList}}\n\
    </select>\n\
    {{/if isSelect}}\n\
    {{#if isInputText}}\n\
    <input class="input" placeholder="{{placeholder}}" type="text">\n\
    {{/if isInputText}}\n\
</span>\n\
<span class="td4">{{#if schemaText}}<pre>{{schemaText}}</pre>{{/if schemaText}}</span>\n\
';



// https://github.com/swagger-api/swagger-ui/blob/v2.1.3/src/main/template/resource.handlebars
local.templateUiResource = '\
<div\n\
    class="borderBottomBold resource eventDelegateClick"\n\
    data-name="{{name}}"\n\
    id="{{id}}">\n\
    <div class="fontWeightBold header tr">\n\
        <a class="color777 flex1 onEventResourceDisplayAction td1" href="#">{{name}} :\n\
        {{#if description}}\n\
        {{description htmlSafe}}\n\
        {{/if description}}\n\
        </a>\n\
        <a class="color777 onEventResourceDisplayAction td2" href="#">Show</a>\n\
        <a class="color777 onEventResourceDisplayAction td3" href="#">Expand / Collapse Operations</a>\n\
        <a class="color777 onEventDatatableReload td4" data-resource-name="{{name}}" href="#">Datatable</a>\n\
    </div>\n\
    <div class="operationList" style="display: none;"></div>\n\
</div>\n\
';



local.templateUiResponseAjax = '\
<h4 class="label marginTop10">Curl Request</h4>\n\
{{#if errorValidate}}\n\
<pre>n/a</pre>\n\
{{#unless errorValidate}}\n\
<pre>{{curl htmlSafe}}</pre>\n\
{{/if errorValidate}}\n\
<h4 class="label marginTop10">Response Code</h4>\n\
<pre>{{statusCode}}</pre>\n\
<h4 class="label marginTop10">Response Headers</h4>\n\
{{#if errorValidate}}\n\
<pre>n/a</pre>\n\
{{#unless errorValidate}}\n\
<pre>{{responseHeaders htmlSafe}}</pre>\n\
{{/if errorValidate}}\n\
<h4 class="label marginTop10">Response Body</h4>\n\
{{responseBody}}\n\
';
/* jslint-ignore-end */
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        local.uiAnimateFadeIn = function (element) {
        /*
         * this function will fadeIn the element
         */
            element.classList.add('swggAnimateFade');
            element.style.display = '';
            setTimeout(function () {
                element.style.opacity = '';
            }, 20);
            setTimeout(function () {
                element.classList.remove('swggAnimateFade');
            }, 500);
        };

        local.uiAnimateFadeOut = function (element) {
        /*
         * this function will fadeOut the element
         */
            element.classList.add('swggAnimateFade');
            element.style.opacity = '0';
            setTimeout(function () {
                element.style.display = 'none';
                element.classList.remove('swggAnimateFade');
            }, 500);
        };

        local.uiAnimateScrollTo = function (element) {
        /*
         * this function will scrollTo the element
         */
            var ii, timerInterval;
            ii = 0;
            timerInterval = setInterval(function () {
                ii += 0.025;
                local.global.scrollTo(0, document.body.scrollTop +
                    Math.min(ii, 1) * (element.offsetTop - document.body.scrollTop) +
                    -5);
            }, 25);
            setTimeout(function () {
                clearInterval(timerInterval);
            }, 1000);
        };

        local.uiAnimateShake = function (element) {
        /*
         * this function will shake the dom-element
         */
            element.classList.add('swggAnimateShake');
            setTimeout(function () {
                element.classList.remove('swggAnimateShake');
            }, 500);
        };

        local.uiAnimateSlideAccordian = function (element, elementList) {
        /*
         * this function will slideDown the element,
         * but slideUp all other elements in elementList
         */
            // hide elements in elementList
            elementList.forEach(function (element2) {
                if (element2 !== element) {
                    local.uiAnimateSlideUp(element2);
                }
            });
            // show element
            local.uiAnimateSlideDown(element);
        };

        local.uiAnimateSlideDown = function (element) {
        /*
         * this function will slideDown the dom-element
         */
            if (element.style.display !== 'none') {
                return;
            }
            element.style.maxHeight = 0;
            element.classList.add('swggAnimateSlide');
            element.style.display = '';
            setTimeout(function () {
                element.style.maxHeight = 2 * local.global.innerHeight + 'px';
            }, 20);
            setTimeout(function () {
                element.style.maxHeight = '';
                element.classList.remove('swggAnimateSlide');
            }, 500);
        };

        local.uiAnimateSlideUp = function (element) {
        /*
         * this function will slideUp the dom-element
         */
            if (element.style.display === 'none') {
                return;
            }
            element.style.maxHeight = 2 * local.global.innerHeight + 'px';
            element.classList.add('swggAnimateSlide');
            setTimeout(function () {
                element.style.maxHeight = '0px';
            }, 20);
            setTimeout(function () {
                element.style.display = 'none';
            }, 500);
            setTimeout(function () {
                element.style.maxHeight = '';
                element.classList.remove('swggAnimateSlide');
            }, 500);
        };

        local.uiDatatableRender = function (options) {
        /*
         * this function will render the datatable
         */
            var tmp;
            local.uiState.datatable = options;
            options.schema = local.schemaNormalizeAndCopy(options.schema);
            options.propDefList = Object.keys(options.schema.properties)
                .sort(function (aa, bb) {
                    return aa === options.idField
                        ? -1
                        : bb === options.idField
                        ? 1
                        : aa < bb
                        ? -1
                        : 1;
                })
                .map(function (propDef) {
                    tmp = propDef;
                    propDef = options.schema.properties[tmp];
                    propDef.name = tmp;
                    local.uiParamRender(propDef);
                    return propDef;
                });
            options.dbRowList = options.responseJson.data.map(function (dbRow, ii) {
                dbRow = { paramDict: dbRow };
                dbRow.colList = options.propDefList.map(function (propDef) {
                    propDef = local.jsonCopy(propDef);
                    propDef.dataset = {};
                    propDef.valueDecoded = dbRow.paramDict[propDef.name];
                    // init valueEncoded
                    local.uiValueEncode(propDef, propDef);
                    return propDef;
                });
                dbRow.id = dbRow.paramDict[options.idField];
                dbRow.ii = options.iiPadding = options.querySkip + ii + 1;
                return dbRow;
            });
            options.iiPadding = 0.3 * String(options.iiPadding || '').length;
            // init pagination
            options.pageCurrent = Math.floor(
                options.querySkip / options.queryLimit
            );
            options.pageTotal = Math.ceil(
                options.responseJson.meta.paginationCountTotal / options.queryLimit
            );
            options.pageMin = Math.max(
                Math.min(options.pageCurrent - 3, options.pageTotal - 7),
                0
            );
            options.pageMax = Math.min(options.pageMin + 7, options.pageTotal);
            options.pageList = [];
            for (tmp = options.pageMin; tmp < options.pageMax; tmp += 1) {
                options.pageList.push({
                    disabled: tmp === options.pageCurrent,
                    pageNumber: tmp,
                    value: tmp + 1
                });
            }
            // add first page
            options.pageList.unshift({
                disabled: options.pageCurrent === 0,
                pageNumber: 0,
                value: 'first page'
            });
            // add last page
            options.pageList.push({
                disabled: options.pageCurrent === options.pageTotal - 1,
                pageNumber: options.pageTotal - 1,
                value: 'last page'
            });
            options.pageCurrentIsFirst = options.pageCurrent === 0;
            options.pageCurrentIsLast = options.pageCurrent + 1 === options.pageTotal;
            // templateRender datatable
            document.querySelector('.swggUiContainer .datatable').innerHTML =
                local.templateRender(local.templateUiDatatable, options);
            // init event-handling
            local.uiEventInit(document.querySelector('.swggUiContainer .datatable'));
            // show modal
            if (document.querySelector('.swggUiContainer > .modal').style.display !== 'none') {
                return;
            }
            document.body.style.overflow = 'hidden';
            local.uiAnimateFadeIn(document.querySelector('.swggUiContainer > .modal'));
        };

        local.uiElementClick = function (options) {
        /*
         * this function will simulate a click-event on options.target
         */
            options.event = new local.global.Event(options.type || 'click', {
                bubbles: true,
                cancelable: true
            });
            options.target.dispatchEvent(options.event);
        };

        local.uiEventDelegate = function (event) {
            Object.keys(local.uiEventListenerDict).sort().some(function (key) {
                if (!(event.currentTarget.matches(key) || event.target.matches(key))) {
                    return;
                }
                switch (event.target.tagName) {
                case 'A':
                case 'BUTTON':
                case 'FORM':
                    event.preventDefault();
                    break;
                }
                event.stopPropagation();
                local.uiEventListenerDict[key](event);
                return true;
            });
        };

        local.uiEventInit = function (element) {
        /*
         * this function will init event-handling for the dom-element
         */
            ['Click', 'Submit'].forEach(function (eventType) {
                local.domQuerySelectorAll(
                    element,
                    '.eventDelegate' + eventType
                ).forEach(function (element) {
                    element.addEventListener(eventType.toLowerCase(), local.uiEventDelegate);
                });
            });
        };

        local.uiEventListenerDict['.onEventDatatableReload'] = function (event) {
        /*
         * this function will show the modal
         */
            var options;
            options = {};
            if (event) {
                location.hash = '!/' +
                    document.querySelector('.swggUiContainer .resource[data-name=' +
                        event.target.dataset.resourceName + ']').id + '/swgg_datatable';
                options.name = event.target.dataset.resourceName;
                options.pageNumber = event.target.dataset.pageNumber;
            } else {
                options.name = local.uiState.datatable.name;
                options.pageNumber = local.uiState.datatable.pageNumber;
                options.queryLimit = local.uiState.datatable.queryLimit;
                options.querySort = local.uiState.datatable.querySort;
                options.queryWhere = local.uiState.datatable.queryWhere;
            }
            local.objectSetDefault(
                options,
                local.jsonCopy(local.uiState['x-swgg-datatableDict'][options.name])
            );
            options.querySkip = options.pageNumber * options.queryLimit || 0;
            options.paramDict = {
                _queryLimit: options.queryLimit,
                _querySkip: options.querySkip,
                _querySort: options.querySort,
                _queryWhere: options.queryWhere
            };
            // request data
            local.apiDict[options.crudGetManyByQuery]._ajax(options, function (error, options) {
                // validate no error occurred
                local.assert(!error, error);
                local.uiDatatableRender(options);
            });
        };

        local.uiEventListenerDict['.onEventDatatableSelectedRemove'] = function () {
            var onParallel;
            onParallel = local.onParallel(local.uiEventListenerDict['.onEventDatatableReload']);
            onParallel.counter += 1;
            local.domQuerySelectorAll(
                document,
                '.swggUiContainer .datatable tr.selected'
            ).forEach(function (element) {
                onParallel.counter += 1;
                // remove data
                local.apiDict[
                    local.uiState.datatable.crudRemoveOneById
                ]._ajax(local.objectLiteralize({
                    paramDict: { '$[]': [local.uiState.datatable.idField, element.dataset.id] }
                }), onParallel);
            });
            onParallel();
        };

        local.uiEventListenerDict['.onEventDatatableTrSelect'] = function (event) {
            if (event.target.tagName !== 'INPUT') {
                event.currentTarget.querySelector('input').checked =
                    !event.currentTarget.querySelector('input').checked;
            }
            if (event.currentTarget.querySelector('input').checked) {
                event.currentTarget.closest('tr').classList.add('selected');
            } else {
                event.currentTarget.closest('tr').classList.remove('selected');
            }
        };

        local.uiEventListenerDict['.onEventModalHide'] = function (event) {
        /*
         * this function will hide the modal
         */
            if (event && !event.target.classList.contains('onEventModalHide')) {
                return;
            }
            if (document.querySelector('.swggUiContainer > .modal').style.display === 'none') {
                return;
            }
            document.body.style.overflow = '';
            // hide modeal
            local.uiAnimateFadeOut(document.querySelector('.swggUiContainer > .modal'));
        };

        local.uiEventListenerDict['.onEventOperationAjax'] = function (event) {
        /*
         * this function will return submit the operation to the backend
         */
            var options, tmp;
            options = {};
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    options.api = local.apiDict[event.currentTarget.dataset._keyOperationId];
                    options.domOperationContent = event.target.closest('.operation > .content');
                    options.headers = {};
                    options.paramDict = {};
                    options.api.parameters.forEach(function (paramDef) {
                        local.tryCatchOnError(function () {
                            tmp = options.domOperationContent.querySelector(
                                '.paramDef[name=' + paramDef.name + '] > .td3'
                            ).children[0];
                            switch (tmp.tagName) {
                            case 'INPUT':
                                tmp = tmp.type === 'file'
                                    ? tmp.files && tmp.files[0]
                                    : local.uiValueDecode(tmp, {
                                        type: paramDef.type,
                                        valueEncoded: tmp.value
                                    }).valueDecoded;
                                break;
                            case 'SELECT':
                                tmp = Array.from(tmp.options)
                                    .filter(function (element) {
                                        return element.selected;
                                    })
                                    .map(function (element) {
                                        return local.uiValueDecode(element, {
                                            type: paramDef.items
                                                ? paramDef.items.type
                                                : paramDef.type,
                                            valueEncoded: element.value
                                        }).valueDecoded;
                                    });
                                if (!tmp.length || tmp[0] === undefined) {
                                    return;
                                }
                                if (paramDef.type !== 'array') {
                                    tmp = tmp[0];
                                }
                                break;
                            case 'TEXTAREA':
                                tmp = paramDef.in === 'body'
                                    ? local.uiValueDecode(tmp, {
                                        type: paramDef.type,
                                        valueEncoded: tmp.value
                                    }).valueDecoded
                                    : !tmp.value
                                    ? undefined
                                    : tmp.value.split('\n').map(function (element) {
                                        return local.uiValueDecode(null, {
                                            type: paramDef.items.type,
                                            valueEncoded: element
                                        }).valueDecoded;
                                    });
                                break;
                            }
                            options.paramDict[paramDef.name] = tmp;
                        }, function (error) {
                            options.errorValidate = error;
                            options.errorValidate.options = { key: paramDef.name };
                            options.onNext(error);
                        });
                    });
                    options.api._ajax(options, options.onNext);
                    break;
                default:
                    // remove previous error
                    local.domQuerySelectorAll(
                        options.domOperationContent,
                        '.paramDef .input'
                    ).forEach(function (element) {
                        element.classList.remove('error');
                    });
                    if (options.errorValidate) {
                        // shake input on Error
                        local.domQuerySelectorAll(
                            options.domOperationContent,
                            '.paramDef[name=' + options.errorValidate.options.key + '] .input'
                        ).forEach(function (element) {
                            element.classList.add('error');
                            local.uiAnimateShake(element.closest('span'));
                        });
                        data = {
                            errorValidate: options.errorValidate,
                            responseText: error.message,
                            statusCode: 400
                        };
                    }
                    // init responseHeaders
                    data.responseHeaders = {};
                    (
                        (data.getAllResponseHeaders && data.getAllResponseHeaders()) || ''
                    ).replace(
                        (/.+/g),
                        function (item) {
                            item = item.split(':');
                            data.responseHeaders[item[0].trim().toLowerCase()] =
                                item.slice(1).join(':').trim();
                        }
                    );
                    // init contentType
                    data.contentType =
                        String(data.responseHeaders['content-type']).split(';')[0];
                    // init responseBody
                    switch (data.contentType.split('/')[0]) {
                    case 'audio':
                    case 'video':
                        data.responseBody = '<' + data.contentType.split('/')[0] +
                            ' controls><source src="data:' + data.contentType + ';base64,' +
                            local.bufferToBase64(data.response) +
                            '" type="' + data.contentType + '"></' +
                            data.contentType.split('/')[0] + '>';
                        break;
                    case 'image':
                        data.responseBody = '<img src="data:' + data.contentType + ';base64,' +
                            local.bufferToBase64(data.response) + '">';
                        break;
                    default:
                        data.responseBody = '<pre>' + local.stringHtmlSafe(
                            data.responseJson
                                ? JSON.stringify(data.responseJson, null, 4)
                                : data.responseText
                        ) + '</pre>';
                    }
                    // init curl
                    local.tryCatchOnError(function () {
                        options.data = JSON.stringify(JSON.parse(options.data), null, 4);
                    }, local.nop);
                    data.curl = 'curl \\\n' +
                        '--request ' + options.api._method.toUpperCase() + ' \\\n' +
                        Object.keys(options.headers).map(function (key) {
                            return "--header '" + key + ': ' + options.headers[key] + "' \\\n";
                        }).join('') + '--data-binary ' + (typeof options.data === 'string'
                            ? "'" + options.data.replace(/'/g, "'\"'\"'") + "'"
                            : '<blob>') + ' \\\n"' + options.url + '"';
                    data.responseHeaders = data.getAllResponseHeaders &&
                        data.getAllResponseHeaders().trim();
                    // templateRender response
                    options.domOperationContent.querySelector(
                        '.responseAjax'
                    ).innerHTML = local.templateRender(local.templateUiResponseAjax, data);
                    break;
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.uiEventListenerDict['.onEventOperationDisplayShow'] = function (event) {
        /*
         * this function will toggle the display of the operation
         */
            var tmp;
            location.hash = '!/' + event.target.closest('.resource').id + '/' +
                event.target.closest('.operation').id;
            tmp = event.target.closest('.operation').querySelector('.operation > .content');
            tmp.closest('.resource').classList.remove('expanded');
            // show the operation, but hide all other operations
            local.uiAnimateSlideAccordian(
                tmp,
                local.domQuerySelectorAll(
                    tmp.closest('.operationList'),
                    '.operation > .content'
                )
            );
        };

        local.uiEventListenerDict['.onEventResourceDisplayAction'] = function (event) {
        /*
         * this function will toggle the display of the resource
         */
            location.hash = '!/' + event.currentTarget.id;
            event.target.className.split(' ').some(function (className) {
                switch (className) {
                // show the resource, but hide all other resources
                case 'td1':
                case 'td2':
                case 'td3':
                    local.uiAnimateSlideAccordian(
                        event.currentTarget.querySelector('.operationList'),
                        local.domQuerySelectorAll(document, '.swggUiContainer .operationList')
                    );
                    break;
                }
                switch (className) {
                case 'td1':
                case 'td2':
                    return true;
                case 'td3':
                    // collapse all operations in the resource
                    if (event.currentTarget.classList.contains('expanded')) {
                        event.currentTarget.classList.remove('expanded');
                        local.domQuerySelectorAll(
                            event.currentTarget,
                            '.operation > .content'
                        ).forEach(function (element) {
                            local.uiAnimateSlideUp(element);
                        });
                    // expand all operations in the resource
                    } else {
                        event.currentTarget.classList.add('expanded');
                        local.domQuerySelectorAll(
                            event.currentTarget,
                            '.operation > .content'
                        ).forEach(function (element) {
                            local.uiAnimateSlideDown(element);
                        });
                    }
                    return true;
                }
            });
        };

        local.uiEventListenerDict['.onEventUiReload'] = function () {
        /*
         * this function will reload the ui
         */
            // reset ui
            local.domQuerySelectorAll(
                document,
                '.swggUiContainer > .reset'
            ).forEach(function (element) {
                element.remove();
            });
            // normalize url
            document.querySelector('.swggUiContainer > .header > .td2').value =
                local.urlParse(
                    document.querySelector('.swggUiContainer > .header > .td2').value
                        .replace((/^\//), '')
                ).href;
            local.ajax({
                url: document.querySelector('.swggUiContainer > .header > .td2').value
            }, function (error, xhr) {
                // validate no error occurred
                local.assert(!error, error);
                // reset state
                local.apiDict = local.swaggerJson = null;
                local.apiDictUpdate(JSON.parse(xhr.responseText));
                local.uiRender();
            });
        };

        local.uiParamRender = function (paramDef) {
        /*
         * this function will render the param
         */
            local.objectSetDefault(paramDef, {
                placeholder: paramDef.required
                    ? '(required)'
                    : ''
            });
            // init input - file
            if (paramDef.type === 'file') {
                paramDef.isFile = true;
            // init input - textarea
            } else if (paramDef.in === 'body') {
                paramDef.isTextarea = true;
            // init input - select
            } else if (paramDef.enum || paramDef.type === 'boolean') {
                paramDef.enumDefault = [];
                if (paramDef.default !== undefined) {
                    paramDef.enumDefault = paramDef.type === 'array'
                        ? paramDef.default
                        : [paramDef.default];
                }
                paramDef.isSelect = true;
                paramDef.isSelectMultiple = paramDef.type === 'array';
                paramDef.selectOptionList = (paramDef.type === 'boolean'
                    ? [false, true]
                    : paramDef.enum).map(function (element) {
                    paramDef.hasDefault |= paramDef.enumDefault.indexOf(element) >= 0;
                    return {
                        id: local.idDomElementCreate('swgg_id_' + paramDef.name),
                        selected: paramDef.enumDefault.indexOf(element) >= 0
                            ? 'selected'
                            : '',
                        type: paramDef.items
                            ? paramDef.items.type
                            : paramDef.type,
                        valueDecoded: element
                    };
                });
                // init 'undefined' value
                if (!(paramDef.hasDefault ||
                        paramDef.isSelectMultiple ||
                        paramDef.required)) {
                    paramDef.selectOptionList.unshift({
                        id: local.idDomElementCreate('swgg_id_' + paramDef.name),
                        selected: 'selected',
                        type: paramDef.type
                    });
                }
                paramDef.selectOptionList.forEach(function (element) {
                    local.uiValueEncode({ dataset: {} }, element);
                });
            // init input - textarea
            } else if (paramDef.type === 'array') {
                paramDef.isTextarea = true;
                paramDef.placeholder = 'provide multiple values in new lines' +
                    (paramDef.required
                        ? ' (at least one required)'
                        : '');
            // init input - text
            } else {
                paramDef.isInputText = true;
            }
            // init format2 / type2
            [
                paramDef,
                paramDef.schema
            ].some(function (element) {
                local.tryCatchOnError(function () {
                    paramDef.format2 = paramDef.format2 || element.format;
                }, local.nop);
                local.tryCatchOnError(function () {
                    paramDef.type2 = paramDef.type2 || element.type;
                }, local.nop);
                return paramDef.type2;
            });
            paramDef.type2 = paramDef.type2 || 'object';
            // init schema2
            [
                paramDef.items,
                paramDef.schema,
                paramDef.schema && paramDef.schema.items
            ].some(function (element) {
                local.tryCatchOnError(function () {
                    paramDef.schema2 = paramDef.schema2 ||
                        local.schemaNormalizeAndCopy(element).properties;
                }, local.nop);
                return paramDef.schema2;
            });
            if (paramDef.schema2) {
                paramDef.schemaText = JSON.stringify(paramDef.type2 === 'array'
                    ? [paramDef.schema2]
                    : paramDef.schema2, null, 4);
            }
            // init valueDecoded
            paramDef.valueDecoded = paramDef.default;
            if (paramDef.valueDecoded === undefined && paramDef.in === 'body') {
                if (paramDef.schema2) {
                    paramDef.valueDecoded = local.dbRowRandomCreate({
                        override: function () {
                            var override = {};
                            // preserve default value
                            Object.keys(paramDef.schema2).forEach(function (key) {
                                if (paramDef.schema2[key].default !== undefined) {
                                    override[key] = paramDef.schema2[key].default;
                                }
                            });
                            return override;
                        },
                        properties: paramDef.schema2
                    });
                    if (paramDef.type2 === 'array') {
                        paramDef.valueDecoded = [paramDef.valueDecoded];
                    }
                    paramDef.valueEncodeSpace = 4;
                } else {
                    paramDef.valueDecoded = paramDef.type2 === 'array'
                        ? []
                        : {};
                }
            }
            // templateRender paramDef
            paramDef.uiFragment = local.domFragmentRender(
                local.templateRender(local.templateUiParam, paramDef)
            );
            ['td1', 'td2', 'td3', 'td4'].forEach(function (element) {
                paramDef[element] = paramDef.uiFragment.querySelector('.' + element);
            });
        };

        local.uiRender = function () {
        /*
         * this function will render swagger-ui
         */
            var resource, self;
            // reset state
            local.idDomElementDict = {};
            self = local.uiState = local.jsonCopy(local.swaggerJson);
            // init url
            self.url = document.querySelector('.swggUiContainer > .header > .td2').value;
            // templateRender main
            self.uiFragment = local.domFragmentRender(local.templateUiMain, self);
            local.objectSetDefault(self, {
                resourceDict: {},
                operationDict: {},
                paramDefDict: {},
                tagDict: {}
            });
            // init tagDict
            self.tags.forEach(function (tag) {
                self.tagDict[tag.name] = tag;
            });
            // init operationDict
            Object.keys(local.apiDict).sort().forEach(function (operation) {
                // init operation
                operation = local.jsonCopy(local.apiDict[operation]);
                if (!operation.tags[0] || self.operationDict[operation._keyOperationId]) {
                    return;
                }
                self.operationDict[operation._keyOperationId] = operation;
                // init resource
                resource = self.resourceDict[operation.tags[0]];
                if (!resource && self.tagDict[operation.tags[0]]) {
                    resource = self.resourceDict[operation.tags[0]] =
                        self.tagDict[operation.tags[0]];
                    local.objectSetDefault(resource, {
                        description: 'no description available',
                        id: local.idDomElementCreate('swgg_id_' + operation.tags[0]),
                        name: operation.tags[0],
                        operationListInnerHtml: ''
                    });
                }
            });
            // init resourceDict
            Object.keys(self.resourceDict).sort().forEach(function (key) {
                // templateRender resource
                self.uiFragment.querySelector('.resourceList').appendChild(
                    local.domFragmentRender(local.templateUiResource, self.resourceDict[key])
                );
            });
            Object.keys(self.operationDict).sort(function (aa, bb) {
                aa = self.operationDict[aa];
                aa = aa._path + ' ' + aa._method;
                bb = self.operationDict[bb];
                bb = bb._path + ' ' + bb._method;
                return aa < bb
                    ? -1
                    : 1;
            }).forEach(function (operation) {
                operation = self.operationDict[operation];
                operation.id = local.idDomElementCreate('swgg_id_' + operation.operationId);
                resource = self.resourceDict[operation.tags[0]];
                local.objectSetDefault(operation, {
                    description: '',
                    responseList: Object.keys(operation.responses).sort().map(function (key) {
                        return { key: key, value: operation.responses[key] };
                    }),
                    summary: 'no summary available'
                });
                operation.parameters.forEach(function (element) {
                    // init element.id
                    element.id = local.idDomElementCreate('swgg_id_' + element.name);
                    self.paramDefDict[element.id] = element;
                });
                // templateRender operation
                self.uiFragment.querySelector(
                    '#' + resource.id + ' .operationList'
                ).appendChild(local.domFragmentRender(local.templateUiOperation, operation));
            });
            Object.keys(self.paramDefDict).forEach(function (paramDef) {
                paramDef = self.paramDefDict[paramDef];
                local.uiParamRender(paramDef);
                self.uiFragment.querySelector('#' + paramDef.id).innerHTML = '';
                self.uiFragment.querySelector('#' + paramDef.id)
                    .appendChild(paramDef.uiFragment);
                // init valueEncoded
                paramDef.paramInput =
                    self.uiFragment.querySelector('#' + paramDef.id + ' > .td3').children[0];
                local.uiValueEncode(paramDef.paramInput, paramDef);
                // init input.value
                if (paramDef.isSelect) {
                    paramDef.selectOptionList.forEach(function (element) {
                        element.paramInput = self.uiFragment.querySelector('#' + element.id);
                        local.uiValueEncode(element.paramInput, element);
                        element.paramInput.value = element.valueEncoded;
                    });
                } else if (paramDef.isInputText) {
                    paramDef.paramInput.value = paramDef.valueEncoded;
                } else if (paramDef.isTextarea) {
                    paramDef.paramInput.value = paramDef.valueEncoded;
                }
            });
            // overwrite swggUiContainer with uiFragment
            document.querySelector('.swggUiContainer').innerHTML = '';
            document.querySelector('.swggUiContainer').appendChild(self.uiFragment);
            // init event-handling
            local.uiEventInit(document);
            // scrollTo location.hash
            local.uiScrollTo(location.hash);
        };

        local.uiScrollTo = function (locationHash) {
        /*
         * this function will scrollTo locationHash
         */
            var operation, resource;
            // init resource
            resource = locationHash.split('/')[1];
            // list operations
            resource = document.querySelector('.swggUiContainer #' + resource) ||
                document.querySelector('.swggUiContainer .resource');
            local.uiAnimateSlideDown(resource.querySelector('.operationList'));
            // init operation
            operation = locationHash.split('/')[2];
            // render datatable
            if (operation === 'swgg_datatable') {
                local.onReadyAfter(function () {
                    local.uiElementClick({
                        target: resource.querySelector('.onEventDatatableReload')
                    });
                });
                return;
            }
            operation = resource.querySelector('#' + operation);
            // expand operation and scroll to it
            if (operation) {
                local.uiAnimateSlideDown(operation.querySelector('.content'));
                // scroll to operation
                local.uiAnimateScrollTo(operation);
            } else {
                // scroll to resource
                local.uiAnimateScrollTo(resource);
            }
        };

        local.uiValueDecode = function (input, options) {
        /*
         * this function will decode options.valueEncoded
         * according to input.dataset.swgg_param_value_options
         */
            var aa, bb;
            // restore options
            if (input) {
                aa = JSON.parse(decodeURIComponent(input.dataset.swgg_param_value_options));
                options.type = aa.type;
                options.valueDecodedDefault = aa.valueDecodedDefault;
            }
            aa = options.valueEncoded;
            if (!aa) {
                // use valueDecodedDefault
                bb = options.valueDecodedDefault;
            } else {
                // validate valueEncoded is a string
                local.assertJsonEqual(typeof aa, 'string');
                if (options.type === 'string') {
                    bb = aa;
                } else {
                    bb = JSON.parse(aa);
                    // validate valueDecoded is not a string
                    local.assertJsonNotEqual(typeof bb, 'string');
                }
            }
            options.valueDecoded = bb;
            return options;
        };

        local.uiValueEncode = function (input, options) {
        /*
         * this function will encode options.valueDecoded according to options.type
         */
            var aa, bb;
            aa = options.valueDecoded;
            // save options
            input.dataset.swgg_param_value_options = encodeURIComponent(JSON.stringify({
                type: options.type,
                valueDecodedDefault: aa === null || aa === ''
                    ? aa
                    : undefined
            }));
            if (local.isNullOrUndefined(aa)) {
                bb = aa === null && options.type !== 'string'
                    ? 'null'
                    : '';
            } else if (options.type === 'string') {
                // validate valueEncoded is a string
                local.assertJsonEqual(typeof aa, 'string');
                bb = aa;
            } else {
                // validate valueEncoded is not a string
                local.assertJsonNotEqual(typeof aa, 'string');
                bb = JSON.stringify(aa, options.valueEncodeReplacer, options.valueEncodeSpace);
            }
            options.valueEncoded = bb;
            return options;
        };
        break;
    }
}());
