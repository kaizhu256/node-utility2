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
    /* istanbul ignore next */
    if (typeof global === 'object' &&
            global.utility2_rollup &&
            global.process &&
            global.process.env.npm_package_nameAlias === 'swgg') {
        return;
    }



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
        local.local = local.swgg = local;
        // init exports
        if (local.modeJs === 'browser') {
            local.global.swgg = local;
        } else {
            module.exports = local;
            module.exports.__dirname = __dirname;
            module.exports.module = module;
        }
        // init lib utility2
        local.utility2 = local.global.utility2_rollup || (local.modeJs === 'browser'
            ? local.global.utility2
            : (function () {
                try {
                    return require('./assets.utility2.rollup.js');
                } catch (errorCaught) {
                    return require('./assets.swgg.rollup.js');
                }
            }()));
        local.utility2.objectSetDefault(local, local.utility2);
        local.utility2.swgg = local;
        // init assets and templates
/* jslint-ignore-begin */
local.assetsDict['/assets.swgg.html'] = '\
<!doctype html>\n\
<html lang="en">\n\
<head>\n\
<meta charset="UTF-8">\n\
<meta name="viewport" content="width=device-width, initial-scale=1">\n\
<title>swgg</title>\n\
<style>\n\
/*csslint\n\
    box-sizing: false,\n\
    universal-selector: false\n\
*/\n\
* {\n\
    box-sizing: border-box;\n\
}\n\
body {\n\
    background: #fff;\n\
    font-family: Arial, Helvetica, sans-serif;\n\
    margin: 2rem;\n\
}\n\
body > * {\n\
    margin-bottom: 1rem;\n\
}\n\
</style>\n\
<style>\n\
/*csslint\n\
    adjoining-classes: false,\n\
    box-model: false,\n\
    box-sizing: false,\n\
    universal-selector: false\n\
*/\n\
/* example.js */\n\
body > button {\n\
    width: 15rem;\n\
}\n\
.zeroPixel {\n\
    border: 0;\n\
    height: 0;\n\
    margin: 0;\n\
    padding: 0;\n\
    width: 0;\n\
}\n\
\n\
\n\
\n\
/* animate */\n\
.swggAnimateFade {\n\
    transition: opacity 250ms;\n\
}\n\
@keyframes swggAnimateShake {\n\
    100% {\n\
        transform: translateX(0);\n\
    }\n\
    0%, 20%, 60% {\n\
        transform: translateX(1rem);\n\
    }\n\
    40%, 80% {\n\
        transform: translateX(-1rem);\n\
    }\n\
}\n\
.swggAnimateShake {\n\
    animation-duration: 500ms;\n\
    animation-name: swggAnimateShake;\n\
}\n\
.swggAnimateSlide {\n\
    overflow-y: hidden;\n\
    transition: max-height 500ms;\n\
}\n\
\n\
\n\
\n\
/* general */\n\
.swggUiContainer,\n\
.swggUiContainer * {\n\
    box-sizing: border-box;\n\
    margin: 0;\n\
    padding: 0;\n\
}\n\
.swggUiContainer {\n\
    font-family: Arial, Helvetica, sans-serif;\n\
    margin-left: auto;\n\
    margin-right: auto;\n\
    max-width: 1024px;\n\
}\n\
.swggUiContainer > * {\n\
    margin-top: 1rem;\n\
}\n\
.swggUiContainer a {\n\
    text-decoration: none;\n\
}\n\
.swggUiContainer a:hover {\n\
    color: black;\n\
}\n\
.swggUiContainer a,\n\
.swggUiContainer input,\n\
.swggUiContainer span {\n\
    min-height: 1.5rem;\n\
}\n\
.swggUiContainer button {\n\
    padding: 0.5rem;\n\
}\n\
.swggUiContainer .color777 {\n\
    color: #777;\n\
}\n\
.swggUiContainer button,\n\
.swggUiContainer .cursorPointer,\n\
.swggUiContainer .cursorPointer input {\n\
    cursor: pointer;\n\
}\n\
.swggUiContainer .flex1 {\n\
    flex: 1;\n\
}\n\
.swggUiContainer .fontLineThrough {\n\
    text-decoration: line-through;\n\
}\n\
.swggUiContainer .fontWeightBold {\n\
    font-weight: bold;\n\
}\n\
.swggUiContainer input {\n\
    height: 1.5rem;\n\
    padding-left: 0.25rem;\n\
    padding-right: 0.25rem;\n\
}\n\
.swggUiContainer .marginTop05 {\n\
    margin-top: 0.5rem;\n\
}\n\
.swggUiContainer .marginTop10 {\n\
    margin-top: 1rem;\n\
}\n\
.swggUiContainer pre,\n\
.swggUiContainer textarea {\n\
    font-family: Menlo, Monaco, Consolas, Courier New, monospace;\n\
    font-size: small;\n\
    line-height: 1.25rem;\n\
    max-height: 20rem;\n\
    overflow: auto;\n\
    padding: 0.25rem;\n\
    white-space: pre;\n\
}\n\
.swggUiContainer .tr {\n\
    display: flex;\n\
}\n\
.swggUiContainer .tr > * {\n\
    margin-left: 1rem;\n\
    overflow: auto;\n\
    padding-top: 0.1rem;\n\
    word-wrap: break-word;\n\
}\n\
.swggUiContainer .tr > *:first-child {\n\
    margin-left: 0;\n\
}\n\
.swggUiContainer .tr > * > * {\n\
    width: 100%;\n\
}\n\
\n\
\n\
\n\
/* border */\n\
/* border-bottom-bold */\n\
.swggUiContainer .borderBottom {\n\
    border-bottom: 1px solid #bbb;\n\
    margin-bottom: 0.5rem;\n\
    padding-bottom: 0.5rem;\n\
}\n\
.swggUiContainer .borderBottomBold {\n\
    border-bottom: 1px solid #777;\n\
    margin-bottom: 0.5rem;\n\
    padding-bottom: 0.5rem;\n\
}\n\
/* border-top */\n\
.swggUiContainer .borderTop {\n\
    border-top: 1px solid #bbb;\n\
    margin-top: 0.5rem;\n\
    padding-top: 0.5rem;\n\
}\n\
/* border-top-bold */\n\
.swggUiContainer .borderTopBold,\n\
.swggUiContainer .resource:first-child {\n\
    border-top: 1px solid #777;\n\
    margin-top: 0.5rem;\n\
    padding-top: 0.5rem;\n\
}\n\
/* border-error*/\n\
.swggUiContainer .error {\n\
    border: 5px solid #b00;\n\
}\n\
\n\
\n\
\n\
/* datatable color */\n\
.swggUiContainer .datatable tbody > tr > td {\n\
    background: #efe;\n\
}\n\
.swggUiContainer .datatable tbody > tr > td:nth-child(odd) {\n\
    background: #dfd;\n\
}\n\
.swggUiContainer .datatable tbody > tr:nth-child(odd) > td {\n\
    background: #cfc;\n\
}\n\
.swggUiContainer .datatable tbody > tr:nth-child(odd) > td:nth-child(odd) {\n\
    background: #beb;\n\
}\n\
.swggUiContainer .datatable tbody > tr:hover > td {\n\
    background: #aea;\n\
}\n\
.swggUiContainer .datatable tbody > tr:hover > td:nth-child(odd) {\n\
    background: #9e9;\n\
}\n\
.swggUiContainer .datatable tbody > tr > td:hover,\n\
.swggUiContainer .datatable tbody > tr > td:hover:nth-child(odd),\n\
.swggUiContainer .datatable tbody > tr:nth-child(odd) > td:hover,\n\
.swggUiContainer .datatable tbody > tr:nth-child(odd) > td:hover:nth-child(odd),\n\
.swggUiContainer .datatable th:hover {\n\
    background: #7d7;\n\
}\n\
.swggUiContainer .datatable tbody > tr.selected > td {\n\
    background: #fee;\n\
}\n\
.swggUiContainer .datatable tbody > tr.selected > td:nth-child(odd) {\n\
    background: #fdd;\n\
}\n\
.swggUiContainer .datatable tbody > tr.selected:nth-child(odd) > td {\n\
    background: #ecc;\n\
}\n\
.swggUiContainer .datatable tbody > tr.selected:nth-child(odd) > td:nth-child(odd) {\n\
    background: #ebb;\n\
}\n\
.swggUiContainer .datatable th {\n\
    background: #9e9;\n\
}\n\
\n\
\n\
\n\
/* section */\n\
.swggUiContainer .datatable {\n\
    background: #fff;\n\
    background: rgba(255,255,255,0.875);\n\
    margin: 2rem;\n\
    overflow: auto;\n\
    padding: 1rem;\n\
}\n\
.swggUiContainer .datatable input[type=checkbox] {\n\
    width: 1.5rem;\n\
}\n\
.swggUiContainer .datatable .sortAsc,\n\
.swggUiContainer .datatable .sortDsc {\n\
    display: none;\n\
}\n\
.swggUiContainer .datatable td,\n\
.swggUiContainer .datatable th {\n\
    max-width: 10rem;\n\
    overflow: auto;\n\
    padding: 0.5rem;\n\
}\n\
.swggUiContainer .datatable th:first-child {\n\
    padding-right: 2rem;\n\
}\n\
.swggUiContainer > .header {\n\
    background: #8c0;\n\
    padding: 0.5rem;\n\
}\n\
.swggUiContainer > .header > .td1 {\n\
    font-size: x-large;\n\
    background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAqRJREFUeNrEVz1s00AUfnGXii5maMXoEUEHVwIpEkPNgkBdMnQoU5ytiKHJwpp2Q2JIO8DCUDOxIJFIVOoWZyJSh3pp1Q2PVVlcCVBH3ufeVZZ9Zye1Ay86nXV+ue/9fO/lheg/Se02X1rvksmbnTiKvuxQMBNgBnN4a/LCbmnUAP6JV58NCUsBC8CuAJxGPF47OgNqBaA93tolUhnx6jC4NxGwyOEwlccyAs+3kwdzKq0HDn2vEBTi8J2XpyMaywNDE157BhXUE3zJhlq8GKq+Zd2zaWHepPA8oN9XkfLmRdOiJV4XUUg/IyWncLjCYY/SHndV2u7zHr3bPKZtdxgboJOnthvrfGj/oMf3G0r7JVmNlLfKklmrt2MvvcNO7LFOhoFHfuAJI5o6ta10jpt5CQLgwXhXG2YIwvu+34qf78ybOjWTnWwkgR36d7JqJOrW0hHmNrKg9xhiS4+1jFmrxymh03B0w+6kURIAu3yHtOD5oaUNojMnGgbcctNvwdAnyxvxRR+/vaJnjzbpzcZX+nN1SdGv85i9eH8w3qPO+mdm/y4dnQ1iI8Fq6Nf4cxL6GWSjiFDSs0VRnxC5g0xSB2cgHpaseTxfqOv5uoHkNQ6Ha/N1Yz9mNMppEkEkYKj79q6uCq4bCHcSX3fJ0Vk/k9siASjCm1N6gZH6Ec9IXt2WkFES2K/ixoIyktJPAu/ptOA1SgO5zqtr6KASJPF0nMV8dgMsRhRPOcMwqQAOoi0VAIMLAEWJ6YYC1c8ibj1GP51RqwzYwZVMHQuvOzMCBUtb2tGHx5NAdLKqp5AX7Ng4d+Zi8AGDI9z1ijx9yaCH04y3GCP2S+QcvaGl+pcxyUBvinFlawoDQjHSelX8hQEoIrAq8p/mgC88HOS1YCl/BRgAmiD/1gn6Nu8AAAAASUVORK5CYII=) no-repeat left center;\n\
    padding-left: 2.5rem;\n\
    color: white;\n\
}\n\
.swggUiContainer > .header > .td2 {\n\
    font-size: medium;\n\
    height: 2rem;\n\
}\n\
.swggUiContainer > .header > .td3 {\n\
border: 0;\n\
    color: #fff;\n\
    padding: 6px 8px;\n\
    background-color: #580;\n\
}\n\
.swggUiContainer > .info > * {\n\
    margin-top: 1rem;\n\
}\n\
.swggUiContainer > .info a {\n\
    color: #370;\n\
    text-decoration: underline;\n\
}\n\
.swggUiContainer > .info > .fontWeightBold {\n\
    font-size: x-large;\n\
}\n\
.swggUiContainer > .info > ul {\n\
    margin-left: 2rem;\n\
}\n\
.swggUiContainer > .modal {\n\
    background: black;\n\
    background: rgba(0,0,0,0.5);\n\
    display: flex;\n\
    height: 100%;\n\
    left: 0;\n\
    margin: 0;\n\
    margin-top: 4px;\n\
    padding: 0;\n\
    position: fixed;\n\
    top: 0;\n\
    width: 100%;\n\
    z-index: 1;\n\
}\n\
.swggUiContainer .operation {\n\
    background: #dfd;\n\
    font-size: smaller;\n\
}\n\
.swggUiContainer .operation > .content {\n\
    padding: 1rem;\n\
}\n\
.swggUiContainer .operation > .content .label {\n\
    color: #0b0;\n\
}\n\
.swggUiContainer .operation > .content pre {\n\
    border: 1px solid #bbb;\n\
    background: #ffd;\n\
}\n\
.swggUiContainer .operation > .content .tr {\n\
    margin-left: 0.5rem;\n\
}\n\
.swggUiContainer .operation > .header:hover {\n\
    background: #bfb;\n\
}\n\
.swggUiContainer .operation > .header > span {\n\
    padding: 2px 0 2px 0;\n\
}\n\
.swggUiContainer .operation > .header > span:first-child {\n\
    margin-left: 0;\n\
}\n\
.swggUiContainer .operation > .header > .td1 {\n\
    background: #777;\n\
    color: white;\n\
    padding-top: 5px;\n\
    height: 1.5rem;\n\
    text-align: center;\n\
    width: 5rem;\n\
}\n\
.swggUiContainer .operation > .header > .td2 {\n\
    flex: 3;\n\
}\n\
.swggUiContainer .operation > .header > .td3 {\n\
    color: #777;\n\
    flex: 2;\n\
    text-decoration: none;\n\
}\n\
.swggUiContainer .operation > .header > .td4 {\n\
    flex: 2;\n\
    padding-right: 1rem;\n\
}\n\
.swggUiContainer .operation .paramDef pre,\n\
.swggUiContainer .operation .paramDef textarea {\n\
    height: 10rem;\n\
}\n\
.swggUiContainer .operation .paramDef > .td1 {\n\
    flex: 2;\n\
}\n\
.swggUiContainer .operation .paramDef > .td2 {\n\
    flex: 1;\n\
}\n\
.swggUiContainer .operation .paramDef > .td3 {\n\
    flex: 4;\n\
}\n\
.swggUiContainer .operation .paramDef > .td4 {\n\
    flex: 3;\n\
}\n\
.swggUiContainer .operation .responseList > .td1 {\n\
    flex: 1;\n\
}\n\
.swggUiContainer .operation .responseList > .td2 {\n\
    flex: 4;\n\
}\n\
.swggUiContainer .resource > .header > .td1 {\n\
    font-size: large;\n\
}\n\
.swggUiContainer .resource > .header > .td2,\n\
.swggUiContainer .resource > .header > .td3 {\n\
    border-right: 1px solid #777;\n\
    padding-right: 1rem;\n\
}\n\
\n\
\n\
\n\
/* method */\n\
.swggUiContainer .operation.DELETE > .header > .td1 {\n\
    background: #b00;\n\
}\n\
.swggUiContainer .operation.GET > .header > .td1 {\n\
    background: #093;\n\
}\n\
.swggUiContainer .operation.HEAD > .header > .td1 {\n\
    background: #f30;\n\
}\n\
.swggUiContainer .operation.PATCH > .header > .td1 {\n\
    background: #b0b;\n\
}\n\
.swggUiContainer .operation.POST > .header > .td1 {\n\
    background: #07b;\n\
}\n\
.swggUiContainer .operation.PUT > .header > .td1 {\n\
    background: #70b;\n\
}\n\
</style>\n\
</head>\n\
<body>\n\
    <div id="ajaxProgressDiv1" style="background: #d00; height: 4px; left: 0; margin: 0; padding: 0; position: fixed; top: 0; transition: background 0.5s, width 1.5s; width: 25%;"></div>\n\
    <div class="swggUiContainer">\n\
<form2 class="header tr">\n\
    <a class="td1" href="https://github.com/kaizhu256/node-swgg" target="_blank">swgg</a>\n\
    <input\n\
        class="flex1 td2"\n\
        type="text"\n\
        value="assets.swgg.petstore.json"\n\
    >\n\
    <button class="td3">Explore</button>\n\
</form2>\n\
    </div>\n\
    <div class="swggAjaxProgressDiv" style="margin-top: 1rem; text-align: center;">fetching resource list; Please wait.</div>\n\
    <script src="assets.swgg.rollup.js"></script>\n\
    <script>window.swgg.uiEventListenerDict[".onEventUiReload"]();</script>\n\
</body>\n\
</html>\n\
';



// https://github.com/json-schema-org/json-schema-org.github.io/blob/master/draft-04/schema
// curl -Ls https://raw.githubusercontent.com/json-schema-org/json-schema-org.github.io/master/draft-04/schema > /tmp/aa.json; node -e "console.log(JSON.stringify(require('/tmp/aa.json')));"
local.assetsDict['/assets.swgg.json-schema.json'] = JSON.stringify(
{"id":"http://json-schema.org/draft-04/schema#","$schema":"http://json-schema.org/draft-04/schema#","description":"Core schema meta-schema","definitions":{"schemaArray":{"type":"array","minItems":1,"items":{"$ref":"#"}},"positiveInteger":{"type":"integer","minimum":0},"positiveIntegerDefault0":{"allOf":[{"$ref":"#/definitions/positiveInteger"},{"default":0}]},"simpleTypes":{"enum":["array","boolean","integer","null","number","object","string"]},"stringArray":{"type":"array","items":{"type":"string"},"minItems":1,"uniqueItems":true}},"type":"object","properties":{"id":{"type":"string","format":"uri"},"$schema":{"type":"string","format":"uri"},"title":{"type":"string"},"description":{"type":"string"},"default":{},"multipleOf":{"type":"number","minimum":0,"exclusiveMinimum":true},"maximum":{"type":"number"},"exclusiveMaximum":{"type":"boolean","default":false},"minimum":{"type":"number"},"exclusiveMinimum":{"type":"boolean","default":false},"maxLength":{"$ref":"#/definitions/positiveInteger"},"minLength":{"$ref":"#/definitions/positiveIntegerDefault0"},"pattern":{"type":"string","format":"regex"},"additionalItems":{"anyOf":[{"type":"boolean"},{"$ref":"#"}],"default":{}},"items":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/schemaArray"}],"default":{}},"maxItems":{"$ref":"#/definitions/positiveInteger"},"minItems":{"$ref":"#/definitions/positiveIntegerDefault0"},"uniqueItems":{"type":"boolean","default":false},"maxProperties":{"$ref":"#/definitions/positiveInteger"},"minProperties":{"$ref":"#/definitions/positiveIntegerDefault0"},"required":{"$ref":"#/definitions/stringArray"},"additionalProperties":{"anyOf":[{"type":"boolean"},{"$ref":"#"}],"default":{}},"definitions":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"properties":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"patternProperties":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"dependencies":{"type":"object","additionalProperties":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/stringArray"}]}},"enum":{"type":"array","minItems":1,"uniqueItems":true},"type":{"anyOf":[{"$ref":"#/definitions/simpleTypes"},{"type":"array","items":{"$ref":"#/definitions/simpleTypes"},"minItems":1,"uniqueItems":true}]},"allOf":{"$ref":"#/definitions/schemaArray"},"anyOf":{"$ref":"#/definitions/schemaArray"},"oneOf":{"$ref":"#/definitions/schemaArray"},"not":{"$ref":"#"}},"dependencies":{"exclusiveMaximum":["maximum"],"exclusiveMinimum":["minimum"]},"default":{}}
);



// https://petstore.swagger.io/v2/swagger.json
// curl -Ls https://petstore.swagger.io/v2/swagger.json > /tmp/aa.json; node -e "console.log(JSON.stringify(require('/tmp/aa.json')));"
local.assetsDict['/assets.swgg.petstore.json'] = JSON.stringify(
{"swagger":"2.0","info":{"description":"This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.","version":"1.0.0","title":"Swagger Petstore","termsOfService":"http://swagger.io/terms/","contact":{"email":"apiteam@swagger.io"},"license":{"name":"Apache 2.0","url":"http://www.apache.org/licenses/LICENSE-2.0.html"}},"host":"petstore.swagger.io","basePath":"/v2","tags":[{"name":"pet","description":"Everything about your Pets","externalDocs":{"description":"Find out more","url":"http://swagger.io"}},{"name":"store","description":"Access to Petstore orders"},{"name":"user","description":"Operations about user","externalDocs":{"description":"Find out more about our store","url":"http://swagger.io"}}],"schemes":["http"],"paths":{"/pet":{"post":{"tags":["pet"],"summary":"Add a new pet to the store","description":"","operationId":"addPet","consumes":["application/json","application/xml"],"produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"Pet object that needs to be added to the store","required":true,"schema":{"$ref":"#/definitions/Pet"}}],"responses":{"405":{"description":"Invalid input"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]},"put":{"tags":["pet"],"summary":"Update an existing pet","description":"","operationId":"updatePet","consumes":["application/json","application/xml"],"produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"Pet object that needs to be added to the store","required":true,"schema":{"$ref":"#/definitions/Pet"}}],"responses":{"400":{"description":"Invalid ID supplied"},"404":{"description":"Pet not found"},"405":{"description":"Validation exception"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]}},"/pet/findByStatus":{"get":{"tags":["pet"],"summary":"Finds Pets by status","description":"Multiple status values can be provided with comma separated strings","operationId":"findPetsByStatus","produces":["application/xml","application/json"],"parameters":[{"name":"status","in":"query","description":"Status values that need to be considered for filter","required":true,"type":"array","items":{"type":"string","enum":["available","pending","sold"],"default":"available"},"collectionFormat":"multi"}],"responses":{"200":{"description":"successful operation","schema":{"type":"array","items":{"$ref":"#/definitions/Pet"}}},"400":{"description":"Invalid status value"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]}},"/pet/findByTags":{"get":{"tags":["pet"],"summary":"Finds Pets by tags","description":"Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.","operationId":"findPetsByTags","produces":["application/xml","application/json"],"parameters":[{"name":"tags","in":"query","description":"Tags to filter by","required":true,"type":"array","items":{"type":"string"},"collectionFormat":"multi"}],"responses":{"200":{"description":"successful operation","schema":{"type":"array","items":{"$ref":"#/definitions/Pet"}}},"400":{"description":"Invalid tag value"}},"security":[{"petstore_auth":["write:pets","read:pets"]}],"deprecated":true}},"/pet/{petId}":{"get":{"tags":["pet"],"summary":"Find pet by ID","description":"Returns a single pet","operationId":"getPetById","produces":["application/xml","application/json"],"parameters":[{"name":"petId","in":"path","description":"ID of pet to return","required":true,"type":"integer","format":"int64"}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/Pet"}},"400":{"description":"Invalid ID supplied"},"404":{"description":"Pet not found"}},"security":[{"api_key":[]}]},"post":{"tags":["pet"],"summary":"Updates a pet in the store with form data","description":"","operationId":"updatePetWithForm","consumes":["application/x-www-form-urlencoded"],"produces":["application/xml","application/json"],"parameters":[{"name":"petId","in":"path","description":"ID of pet that needs to be updated","required":true,"type":"integer","format":"int64"},{"name":"name","in":"formData","description":"Updated name of the pet","required":false,"type":"string"},{"name":"status","in":"formData","description":"Updated status of the pet","required":false,"type":"string"}],"responses":{"405":{"description":"Invalid input"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]},"delete":{"tags":["pet"],"summary":"Deletes a pet","description":"","operationId":"deletePet","produces":["application/xml","application/json"],"parameters":[{"name":"api_key","in":"header","required":false,"type":"string"},{"name":"petId","in":"path","description":"Pet id to delete","required":true,"type":"integer","format":"int64"}],"responses":{"400":{"description":"Invalid ID supplied"},"404":{"description":"Pet not found"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]}},"/pet/{petId}/uploadImage":{"post":{"tags":["pet"],"summary":"uploads an image","description":"","operationId":"uploadFile","consumes":["multipart/form-data"],"produces":["application/json"],"parameters":[{"name":"petId","in":"path","description":"ID of pet to update","required":true,"type":"integer","format":"int64"},{"name":"additionalMetadata","in":"formData","description":"Additional data to pass to server","required":false,"type":"string"},{"name":"file","in":"formData","description":"file to upload","required":false,"type":"file"}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/ApiResponse"}}},"security":[{"petstore_auth":["write:pets","read:pets"]}]}},"/store/inventory":{"get":{"tags":["store"],"summary":"Returns pet inventories by status","description":"Returns a map of status codes to quantities","operationId":"getInventory","produces":["application/json"],"parameters":[],"responses":{"200":{"description":"successful operation","schema":{"type":"object","additionalProperties":{"type":"integer","format":"int32"}}}},"security":[{"api_key":[]}]}},"/store/order":{"post":{"tags":["store"],"summary":"Place an order for a pet","description":"","operationId":"placeOrder","produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"order placed for purchasing the pet","required":true,"schema":{"$ref":"#/definitions/Order"}}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/Order"}},"400":{"description":"Invalid Order"}}}},"/store/order/{orderId}":{"get":{"tags":["store"],"summary":"Find purchase order by ID","description":"For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions","operationId":"getOrderById","produces":["application/xml","application/json"],"parameters":[{"name":"orderId","in":"path","description":"ID of pet that needs to be fetched","required":true,"type":"integer","maximum":10,"minimum":1,"format":"int64"}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/Order"}},"400":{"description":"Invalid ID supplied"},"404":{"description":"Order not found"}}},"delete":{"tags":["store"],"summary":"Delete purchase order by ID","description":"For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors","operationId":"deleteOrder","produces":["application/xml","application/json"],"parameters":[{"name":"orderId","in":"path","description":"ID of the order that needs to be deleted","required":true,"type":"integer","minimum":1,"format":"int64"}],"responses":{"400":{"description":"Invalid ID supplied"},"404":{"description":"Order not found"}}}},"/user":{"post":{"tags":["user"],"summary":"Create user","description":"This can only be done by the logged in user.","operationId":"createUser","produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"Created user object","required":true,"schema":{"$ref":"#/definitions/User"}}],"responses":{"default":{"description":"successful operation"}}}},"/user/createWithArray":{"post":{"tags":["user"],"summary":"Creates list of users with given input array","description":"","operationId":"createUsersWithArrayInput","produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"List of user object","required":true,"schema":{"type":"array","items":{"$ref":"#/definitions/User"}}}],"responses":{"default":{"description":"successful operation"}}}},"/user/createWithList":{"post":{"tags":["user"],"summary":"Creates list of users with given input array","description":"","operationId":"createUsersWithListInput","produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"List of user object","required":true,"schema":{"type":"array","items":{"$ref":"#/definitions/User"}}}],"responses":{"default":{"description":"successful operation"}}}},"/user/login":{"get":{"tags":["user"],"summary":"Logs user into the system","description":"","operationId":"loginUser","produces":["application/xml","application/json"],"parameters":[{"name":"username","in":"query","description":"The user name for login","required":true,"type":"string"},{"name":"password","in":"query","description":"The password for login in clear text","required":true,"type":"string"}],"responses":{"200":{"description":"successful operation","schema":{"type":"string"},"headers":{"X-Rate-Limit":{"type":"integer","format":"int32","description":"calls per hour allowed by the user"},"X-Expires-After":{"type":"string","format":"date-time","description":"date in UTC when token expires"}}},"400":{"description":"Invalid username/password supplied"}}}},"/user/logout":{"get":{"tags":["user"],"summary":"Logs out current logged in user session","description":"","operationId":"logoutUser","produces":["application/xml","application/json"],"parameters":[],"responses":{"default":{"description":"successful operation"}}}},"/user/{username}":{"get":{"tags":["user"],"summary":"Get user by user name","description":"","operationId":"getUserByName","produces":["application/xml","application/json"],"parameters":[{"name":"username","in":"path","description":"The name that needs to be fetched. Use user1 for testing. ","required":true,"type":"string"}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/User"}},"400":{"description":"Invalid username supplied"},"404":{"description":"User not found"}}},"put":{"tags":["user"],"summary":"Updated user","description":"This can only be done by the logged in user.","operationId":"updateUser","produces":["application/xml","application/json"],"parameters":[{"name":"username","in":"path","description":"name that need to be updated","required":true,"type":"string"},{"in":"body","name":"body","description":"Updated user object","required":true,"schema":{"$ref":"#/definitions/User"}}],"responses":{"400":{"description":"Invalid user supplied"},"404":{"description":"User not found"}}},"delete":{"tags":["user"],"summary":"Delete user","description":"This can only be done by the logged in user.","operationId":"deleteUser","produces":["application/xml","application/json"],"parameters":[{"name":"username","in":"path","description":"The name that needs to be deleted","required":true,"type":"string"}],"responses":{"400":{"description":"Invalid username supplied"},"404":{"description":"User not found"}}}}},"securityDefinitions":{"petstore_auth":{"type":"oauth2","authorizationUrl":"http://petstore.swagger.io/oauth/dialog","flow":"implicit","scopes":{"write:pets":"modify pets in your account","read:pets":"read your pets"}},"api_key":{"type":"apiKey","name":"api_key","in":"header"}},"definitions":{"Order":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"petId":{"type":"integer","format":"int64"},"quantity":{"type":"integer","format":"int32"},"shipDate":{"type":"string","format":"date-time"},"status":{"type":"string","description":"Order Status","enum":["placed","approved","delivered"]},"complete":{"type":"boolean","default":false}},"xml":{"name":"Order"}},"Category":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"name":{"type":"string"}},"xml":{"name":"Category"}},"User":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"username":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"},"email":{"type":"string"},"password":{"type":"string"},"phone":{"type":"string"},"userStatus":{"type":"integer","format":"int32","description":"User Status"}},"xml":{"name":"User"}},"Tag":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"name":{"type":"string"}},"xml":{"name":"Tag"}},"Pet":{"type":"object","required":["name","photoUrls"],"properties":{"id":{"type":"integer","format":"int64"},"category":{"$ref":"#/definitions/Category"},"name":{"type":"string","example":"doggie"},"photoUrls":{"type":"array","xml":{"name":"photoUrl","wrapped":true},"items":{"type":"string"}},"tags":{"type":"array","xml":{"name":"tag","wrapped":true},"items":{"$ref":"#/definitions/Tag"}},"status":{"type":"string","description":"pet status in the store","enum":["available","pending","sold"]}},"xml":{"name":"Pet"}},"ApiResponse":{"type":"object","properties":{"code":{"type":"integer","format":"int32"},"type":{"type":"string"},"message":{"type":"string"}}}},"externalDocs":{"description":"Find out more about Swagger","url":"http://swagger.io"}}
);



// https://github.com/OAI/OpenAPI-Specification/blob/master/schemas/v2.0/schema.json
// curl -Ls https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/schemas/v2.0/schema.json > /tmp/aa.json; node -e "console.log(JSON.stringify(require('/tmp/aa.json')));"
local.assetsDict['/assets.swgg.schema.json'] = JSON.stringify(
{"title":"A JSON Schema for Swagger 2.0 API.","id":"http://swagger.io/v2/schema.json#","$schema":"http://json-schema.org/draft-04/schema#","type":"object","required":["swagger","info","paths"],"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"swagger":{"type":"string","enum":["2.0"],"description":"The Swagger version of this document."},"info":{"$ref":"#/definitions/info"},"host":{"type":"string","pattern":"^[^{}/ :\\\\]+(?::\\d+)?$","description":"The host (name or ip) of the API. Example: 'swagger.io'"},"basePath":{"type":"string","pattern":"^/","description":"The base path to the API. Example: '/api'."},"schemes":{"$ref":"#/definitions/schemesList"},"consumes":{"description":"A list of MIME types accepted by the API.","allOf":[{"$ref":"#/definitions/mediaTypeList"}]},"produces":{"description":"A list of MIME types the API can produce.","allOf":[{"$ref":"#/definitions/mediaTypeList"}]},"paths":{"$ref":"#/definitions/paths"},"definitions":{"$ref":"#/definitions/definitions"},"parameters":{"$ref":"#/definitions/parameterDefinitions"},"responses":{"$ref":"#/definitions/responseDefinitions"},"security":{"$ref":"#/definitions/security"},"securityDefinitions":{"$ref":"#/definitions/securityDefinitions"},"tags":{"type":"array","items":{"$ref":"#/definitions/tag"},"uniqueItems":true},"externalDocs":{"$ref":"#/definitions/externalDocs"}},"definitions":{"info":{"type":"object","description":"General information about the API.","required":["version","title"],"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"title":{"type":"string","description":"A unique and precise title of the API."},"version":{"type":"string","description":"A semantic version number of the API."},"description":{"type":"string","description":"A longer description of the API. Should be different from the title.  GitHub Flavored Markdown is allowed."},"termsOfService":{"type":"string","description":"The terms of service for the API."},"contact":{"$ref":"#/definitions/contact"},"license":{"$ref":"#/definitions/license"}}},"contact":{"type":"object","description":"Contact information for the owners of the API.","additionalProperties":false,"properties":{"name":{"type":"string","description":"The identifying name of the contact person/organization."},"url":{"type":"string","description":"The URL pointing to the contact information.","format":"uri"},"email":{"type":"string","description":"The email address of the contact person/organization.","format":"email"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"license":{"type":"object","required":["name"],"additionalProperties":false,"properties":{"name":{"type":"string","description":"The name of the license type. It's encouraged to use an OSI compatible license."},"url":{"type":"string","description":"The URL pointing to the license.","format":"uri"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"paths":{"type":"object","description":"Relative paths to the individual endpoints. They must be relative to the 'basePath'.","patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"},"^/":{"$ref":"#/definitions/pathItem"}},"additionalProperties":false},"definitions":{"type":"object","additionalProperties":{"$ref":"#/definitions/schema"},"description":"One or more JSON objects describing the schemas being consumed and produced by the API."},"parameterDefinitions":{"type":"object","additionalProperties":{"$ref":"#/definitions/parameter"},"description":"One or more JSON representations for parameters"},"responseDefinitions":{"type":"object","additionalProperties":{"$ref":"#/definitions/response"},"description":"One or more JSON representations for parameters"},"externalDocs":{"type":"object","additionalProperties":false,"description":"information about external documentation","required":["url"],"properties":{"description":{"type":"string"},"url":{"type":"string","format":"uri"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"examples":{"type":"object","additionalProperties":true},"mimeType":{"type":"string","description":"The MIME type of the HTTP message."},"operation":{"type":"object","required":["responses"],"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"tags":{"type":"array","items":{"type":"string"},"uniqueItems":true},"summary":{"type":"string","description":"A brief summary of the operation."},"description":{"type":"string","description":"A longer description of the operation, GitHub Flavored Markdown is allowed."},"externalDocs":{"$ref":"#/definitions/externalDocs"},"operationId":{"type":"string","description":"A unique identifier of the operation."},"produces":{"description":"A list of MIME types the API can produce.","allOf":[{"$ref":"#/definitions/mediaTypeList"}]},"consumes":{"description":"A list of MIME types the API can consume.","allOf":[{"$ref":"#/definitions/mediaTypeList"}]},"parameters":{"$ref":"#/definitions/parametersList"},"responses":{"$ref":"#/definitions/responses"},"schemes":{"$ref":"#/definitions/schemesList"},"deprecated":{"type":"boolean","default":false},"security":{"$ref":"#/definitions/security"}}},"pathItem":{"type":"object","additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"$ref":{"type":"string"},"get":{"$ref":"#/definitions/operation"},"put":{"$ref":"#/definitions/operation"},"post":{"$ref":"#/definitions/operation"},"delete":{"$ref":"#/definitions/operation"},"options":{"$ref":"#/definitions/operation"},"head":{"$ref":"#/definitions/operation"},"patch":{"$ref":"#/definitions/operation"},"parameters":{"$ref":"#/definitions/parametersList"}}},"responses":{"type":"object","description":"Response objects names can either be any valid HTTP status code or 'default'.","minProperties":1,"additionalProperties":false,"patternProperties":{"^([0-9]{3})$|^(default)$":{"$ref":"#/definitions/responseValue"},"^x-":{"$ref":"#/definitions/vendorExtension"}},"not":{"type":"object","additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}}},"responseValue":{"oneOf":[{"$ref":"#/definitions/response"},{"$ref":"#/definitions/jsonReference"}]},"response":{"type":"object","required":["description"],"properties":{"description":{"type":"string"},"schema":{"oneOf":[{"$ref":"#/definitions/schema"},{"$ref":"#/definitions/fileSchema"}]},"headers":{"$ref":"#/definitions/headers"},"examples":{"$ref":"#/definitions/examples"}},"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"headers":{"type":"object","additionalProperties":{"$ref":"#/definitions/header"}},"header":{"type":"object","additionalProperties":false,"required":["type"],"properties":{"type":{"type":"string","enum":["string","number","integer","boolean","array"]},"format":{"type":"string"},"items":{"$ref":"#/definitions/primitivesItems"},"collectionFormat":{"$ref":"#/definitions/collectionFormat"},"default":{"$ref":"#/definitions/default"},"maximum":{"$ref":"#/definitions/maximum"},"exclusiveMaximum":{"$ref":"#/definitions/exclusiveMaximum"},"minimum":{"$ref":"#/definitions/minimum"},"exclusiveMinimum":{"$ref":"#/definitions/exclusiveMinimum"},"maxLength":{"$ref":"#/definitions/maxLength"},"minLength":{"$ref":"#/definitions/minLength"},"pattern":{"$ref":"#/definitions/pattern"},"maxItems":{"$ref":"#/definitions/maxItems"},"minItems":{"$ref":"#/definitions/minItems"},"uniqueItems":{"$ref":"#/definitions/uniqueItems"},"enum":{"$ref":"#/definitions/enum"},"multipleOf":{"$ref":"#/definitions/multipleOf"},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"vendorExtension":{"description":"Any property starting with x- is valid.","additionalProperties":true,"additionalItems":true},"bodyParameter":{"type":"object","required":["name","in","schema"],"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"description":{"type":"string","description":"A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed."},"name":{"type":"string","description":"The name of the parameter."},"in":{"type":"string","description":"Determines the location of the parameter.","enum":["body"]},"required":{"type":"boolean","description":"Determines whether or not this parameter is required or optional.","default":false},"schema":{"$ref":"#/definitions/schema"}},"additionalProperties":false},"headerParameterSubSchema":{"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"required":{"type":"boolean","description":"Determines whether or not this parameter is required or optional.","default":false},"in":{"type":"string","description":"Determines the location of the parameter.","enum":["header"]},"description":{"type":"string","description":"A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed."},"name":{"type":"string","description":"The name of the parameter."},"type":{"type":"string","enum":["string","number","boolean","integer","array"]},"format":{"type":"string"},"items":{"$ref":"#/definitions/primitivesItems"},"collectionFormat":{"$ref":"#/definitions/collectionFormat"},"default":{"$ref":"#/definitions/default"},"maximum":{"$ref":"#/definitions/maximum"},"exclusiveMaximum":{"$ref":"#/definitions/exclusiveMaximum"},"minimum":{"$ref":"#/definitions/minimum"},"exclusiveMinimum":{"$ref":"#/definitions/exclusiveMinimum"},"maxLength":{"$ref":"#/definitions/maxLength"},"minLength":{"$ref":"#/definitions/minLength"},"pattern":{"$ref":"#/definitions/pattern"},"maxItems":{"$ref":"#/definitions/maxItems"},"minItems":{"$ref":"#/definitions/minItems"},"uniqueItems":{"$ref":"#/definitions/uniqueItems"},"enum":{"$ref":"#/definitions/enum"},"multipleOf":{"$ref":"#/definitions/multipleOf"}}},"queryParameterSubSchema":{"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"required":{"type":"boolean","description":"Determines whether or not this parameter is required or optional.","default":false},"in":{"type":"string","description":"Determines the location of the parameter.","enum":["query"]},"description":{"type":"string","description":"A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed."},"name":{"type":"string","description":"The name of the parameter."},"allowEmptyValue":{"type":"boolean","default":false,"description":"allows sending a parameter by name only or with an empty value."},"type":{"type":"string","enum":["string","number","boolean","integer","array"]},"format":{"type":"string"},"items":{"$ref":"#/definitions/primitivesItems"},"collectionFormat":{"$ref":"#/definitions/collectionFormatWithMulti"},"default":{"$ref":"#/definitions/default"},"maximum":{"$ref":"#/definitions/maximum"},"exclusiveMaximum":{"$ref":"#/definitions/exclusiveMaximum"},"minimum":{"$ref":"#/definitions/minimum"},"exclusiveMinimum":{"$ref":"#/definitions/exclusiveMinimum"},"maxLength":{"$ref":"#/definitions/maxLength"},"minLength":{"$ref":"#/definitions/minLength"},"pattern":{"$ref":"#/definitions/pattern"},"maxItems":{"$ref":"#/definitions/maxItems"},"minItems":{"$ref":"#/definitions/minItems"},"uniqueItems":{"$ref":"#/definitions/uniqueItems"},"enum":{"$ref":"#/definitions/enum"},"multipleOf":{"$ref":"#/definitions/multipleOf"}}},"formDataParameterSubSchema":{"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"required":{"type":"boolean","description":"Determines whether or not this parameter is required or optional.","default":false},"in":{"type":"string","description":"Determines the location of the parameter.","enum":["formData"]},"description":{"type":"string","description":"A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed."},"name":{"type":"string","description":"The name of the parameter."},"allowEmptyValue":{"type":"boolean","default":false,"description":"allows sending a parameter by name only or with an empty value."},"type":{"type":"string","enum":["string","number","boolean","integer","array","file"]},"format":{"type":"string"},"items":{"$ref":"#/definitions/primitivesItems"},"collectionFormat":{"$ref":"#/definitions/collectionFormatWithMulti"},"default":{"$ref":"#/definitions/default"},"maximum":{"$ref":"#/definitions/maximum"},"exclusiveMaximum":{"$ref":"#/definitions/exclusiveMaximum"},"minimum":{"$ref":"#/definitions/minimum"},"exclusiveMinimum":{"$ref":"#/definitions/exclusiveMinimum"},"maxLength":{"$ref":"#/definitions/maxLength"},"minLength":{"$ref":"#/definitions/minLength"},"pattern":{"$ref":"#/definitions/pattern"},"maxItems":{"$ref":"#/definitions/maxItems"},"minItems":{"$ref":"#/definitions/minItems"},"uniqueItems":{"$ref":"#/definitions/uniqueItems"},"enum":{"$ref":"#/definitions/enum"},"multipleOf":{"$ref":"#/definitions/multipleOf"}}},"pathParameterSubSchema":{"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"required":["required"],"properties":{"required":{"type":"boolean","enum":[true],"description":"Determines whether or not this parameter is required or optional."},"in":{"type":"string","description":"Determines the location of the parameter.","enum":["path"]},"description":{"type":"string","description":"A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed."},"name":{"type":"string","description":"The name of the parameter."},"type":{"type":"string","enum":["string","number","boolean","integer","array"]},"format":{"type":"string"},"items":{"$ref":"#/definitions/primitivesItems"},"collectionFormat":{"$ref":"#/definitions/collectionFormat"},"default":{"$ref":"#/definitions/default"},"maximum":{"$ref":"#/definitions/maximum"},"exclusiveMaximum":{"$ref":"#/definitions/exclusiveMaximum"},"minimum":{"$ref":"#/definitions/minimum"},"exclusiveMinimum":{"$ref":"#/definitions/exclusiveMinimum"},"maxLength":{"$ref":"#/definitions/maxLength"},"minLength":{"$ref":"#/definitions/minLength"},"pattern":{"$ref":"#/definitions/pattern"},"maxItems":{"$ref":"#/definitions/maxItems"},"minItems":{"$ref":"#/definitions/minItems"},"uniqueItems":{"$ref":"#/definitions/uniqueItems"},"enum":{"$ref":"#/definitions/enum"},"multipleOf":{"$ref":"#/definitions/multipleOf"}}},"nonBodyParameter":{"type":"object","required":["name","in","type"],"oneOf":[{"$ref":"#/definitions/headerParameterSubSchema"},{"$ref":"#/definitions/formDataParameterSubSchema"},{"$ref":"#/definitions/queryParameterSubSchema"},{"$ref":"#/definitions/pathParameterSubSchema"}]},"parameter":{"oneOf":[{"$ref":"#/definitions/bodyParameter"},{"$ref":"#/definitions/nonBodyParameter"}]},"schema":{"type":"object","description":"A deterministic version of a JSON Schema object.","patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"$ref":{"type":"string"},"format":{"type":"string"},"title":{"$ref":"http://json-schema.org/draft-04/schema#/properties/title"},"description":{"$ref":"http://json-schema.org/draft-04/schema#/properties/description"},"default":{"$ref":"http://json-schema.org/draft-04/schema#/properties/default"},"multipleOf":{"$ref":"http://json-schema.org/draft-04/schema#/properties/multipleOf"},"maximum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/maximum"},"exclusiveMaximum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/exclusiveMaximum"},"minimum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/minimum"},"exclusiveMinimum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/exclusiveMinimum"},"maxLength":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveInteger"},"minLength":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"},"pattern":{"$ref":"http://json-schema.org/draft-04/schema#/properties/pattern"},"maxItems":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveInteger"},"minItems":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"},"uniqueItems":{"$ref":"http://json-schema.org/draft-04/schema#/properties/uniqueItems"},"maxProperties":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveInteger"},"minProperties":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"},"required":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/stringArray"},"enum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/enum"},"additionalProperties":{"anyOf":[{"$ref":"#/definitions/schema"},{"type":"boolean"}],"default":{}},"type":{"$ref":"http://json-schema.org/draft-04/schema#/properties/type"},"items":{"anyOf":[{"$ref":"#/definitions/schema"},{"type":"array","minItems":1,"items":{"$ref":"#/definitions/schema"}}],"default":{}},"allOf":{"type":"array","minItems":1,"items":{"$ref":"#/definitions/schema"}},"properties":{"type":"object","additionalProperties":{"$ref":"#/definitions/schema"},"default":{}},"discriminator":{"type":"string"},"readOnly":{"type":"boolean","default":false},"xml":{"$ref":"#/definitions/xml"},"externalDocs":{"$ref":"#/definitions/externalDocs"},"example":{}},"additionalProperties":false},"fileSchema":{"type":"object","description":"A deterministic version of a JSON Schema object.","patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"required":["type"],"properties":{"format":{"type":"string"},"title":{"$ref":"http://json-schema.org/draft-04/schema#/properties/title"},"description":{"$ref":"http://json-schema.org/draft-04/schema#/properties/description"},"default":{"$ref":"http://json-schema.org/draft-04/schema#/properties/default"},"required":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/stringArray"},"type":{"type":"string","enum":["file"]},"readOnly":{"type":"boolean","default":false},"externalDocs":{"$ref":"#/definitions/externalDocs"},"example":{}},"additionalProperties":false},"primitivesItems":{"type":"object","additionalProperties":false,"properties":{"type":{"type":"string","enum":["string","number","integer","boolean","array"]},"format":{"type":"string"},"items":{"$ref":"#/definitions/primitivesItems"},"collectionFormat":{"$ref":"#/definitions/collectionFormat"},"default":{"$ref":"#/definitions/default"},"maximum":{"$ref":"#/definitions/maximum"},"exclusiveMaximum":{"$ref":"#/definitions/exclusiveMaximum"},"minimum":{"$ref":"#/definitions/minimum"},"exclusiveMinimum":{"$ref":"#/definitions/exclusiveMinimum"},"maxLength":{"$ref":"#/definitions/maxLength"},"minLength":{"$ref":"#/definitions/minLength"},"pattern":{"$ref":"#/definitions/pattern"},"maxItems":{"$ref":"#/definitions/maxItems"},"minItems":{"$ref":"#/definitions/minItems"},"uniqueItems":{"$ref":"#/definitions/uniqueItems"},"enum":{"$ref":"#/definitions/enum"},"multipleOf":{"$ref":"#/definitions/multipleOf"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"security":{"type":"array","items":{"$ref":"#/definitions/securityRequirement"},"uniqueItems":true},"securityRequirement":{"type":"object","additionalProperties":{"type":"array","items":{"type":"string"},"uniqueItems":true}},"xml":{"type":"object","additionalProperties":false,"properties":{"name":{"type":"string"},"namespace":{"type":"string"},"prefix":{"type":"string"},"attribute":{"type":"boolean","default":false},"wrapped":{"type":"boolean","default":false}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"tag":{"type":"object","additionalProperties":false,"required":["name"],"properties":{"name":{"type":"string"},"description":{"type":"string"},"externalDocs":{"$ref":"#/definitions/externalDocs"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"securityDefinitions":{"type":"object","additionalProperties":{"oneOf":[{"$ref":"#/definitions/basicAuthenticationSecurity"},{"$ref":"#/definitions/apiKeySecurity"},{"$ref":"#/definitions/oauth2ImplicitSecurity"},{"$ref":"#/definitions/oauth2PasswordSecurity"},{"$ref":"#/definitions/oauth2ApplicationSecurity"},{"$ref":"#/definitions/oauth2AccessCodeSecurity"}]}},"basicAuthenticationSecurity":{"type":"object","additionalProperties":false,"required":["type"],"properties":{"type":{"type":"string","enum":["basic"]},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"apiKeySecurity":{"type":"object","additionalProperties":false,"required":["type","name","in"],"properties":{"type":{"type":"string","enum":["apiKey"]},"name":{"type":"string"},"in":{"type":"string","enum":["header","query"]},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"oauth2ImplicitSecurity":{"type":"object","additionalProperties":false,"required":["type","flow","authorizationUrl"],"properties":{"type":{"type":"string","enum":["oauth2"]},"flow":{"type":"string","enum":["implicit"]},"scopes":{"$ref":"#/definitions/oauth2Scopes"},"authorizationUrl":{"type":"string","format":"uri"},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"oauth2PasswordSecurity":{"type":"object","additionalProperties":false,"required":["type","flow","tokenUrl"],"properties":{"type":{"type":"string","enum":["oauth2"]},"flow":{"type":"string","enum":["password"]},"scopes":{"$ref":"#/definitions/oauth2Scopes"},"tokenUrl":{"type":"string","format":"uri"},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"oauth2ApplicationSecurity":{"type":"object","additionalProperties":false,"required":["type","flow","tokenUrl"],"properties":{"type":{"type":"string","enum":["oauth2"]},"flow":{"type":"string","enum":["application"]},"scopes":{"$ref":"#/definitions/oauth2Scopes"},"tokenUrl":{"type":"string","format":"uri"},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"oauth2AccessCodeSecurity":{"type":"object","additionalProperties":false,"required":["type","flow","authorizationUrl","tokenUrl"],"properties":{"type":{"type":"string","enum":["oauth2"]},"flow":{"type":"string","enum":["accessCode"]},"scopes":{"$ref":"#/definitions/oauth2Scopes"},"authorizationUrl":{"type":"string","format":"uri"},"tokenUrl":{"type":"string","format":"uri"},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"oauth2Scopes":{"type":"object","additionalProperties":{"type":"string"}},"mediaTypeList":{"type":"array","items":{"$ref":"#/definitions/mimeType"},"uniqueItems":true},"parametersList":{"type":"array","description":"The parameters needed to send a valid API call.","additionalItems":false,"items":{"oneOf":[{"$ref":"#/definitions/parameter"},{"$ref":"#/definitions/jsonReference"}]},"uniqueItems":true},"schemesList":{"type":"array","description":"The transfer protocol of the API.","items":{"type":"string","enum":["http","https","ws","wss"]},"uniqueItems":true},"collectionFormat":{"type":"string","enum":["csv","ssv","tsv","pipes"],"default":"csv"},"collectionFormatWithMulti":{"type":"string","enum":["csv","ssv","tsv","pipes","multi"],"default":"csv"},"title":{"$ref":"http://json-schema.org/draft-04/schema#/properties/title"},"description":{"$ref":"http://json-schema.org/draft-04/schema#/properties/description"},"default":{"$ref":"http://json-schema.org/draft-04/schema#/properties/default"},"multipleOf":{"$ref":"http://json-schema.org/draft-04/schema#/properties/multipleOf"},"maximum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/maximum"},"exclusiveMaximum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/exclusiveMaximum"},"minimum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/minimum"},"exclusiveMinimum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/exclusiveMinimum"},"maxLength":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveInteger"},"minLength":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"},"pattern":{"$ref":"http://json-schema.org/draft-04/schema#/properties/pattern"},"maxItems":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveInteger"},"minItems":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"},"uniqueItems":{"$ref":"http://json-schema.org/draft-04/schema#/properties/uniqueItems"},"enum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/enum"},"jsonReference":{"type":"object","required":["$ref"],"additionalProperties":false,"properties":{"$ref":{"type":"string"}}}}}
);



local.templateApiDict = {
    "crudCountManyByQuery": {
        "_method": "get",
        "_path": "/{{_tags0}}/crudCountManyByQuery",
        "parameters": [
            {
                "default": "{}",
                "description": "query param",
                "format": "json",
                "in": "query",
                "name": "_queryWhere",
                "type": "string"
            }
        ],
        "summary": "count many {{_schemaName}} objects by query"
    },
    "crudErrorDelete": {
        "_method": "delete",
        "_path": "/{{_tags0}}/crudErrorDelete",
        "responses": {
            "500": {
                "description": "500 error - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "return error response"
    },
    "crudErrorGet": {
        "_method": "get",
        "_path": "/{{_tags0}}/crudErrorGet",
        "responses": {
            "500": {
                "description": "500 error - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "return error response"
    },
    "crudErrorHead": {
        "_method": "head",
        "_path": "/{{_tags0}}/crudErrorHead",
        "responses": {
            "500": {
                "description": "500 error - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "return error response"
    },
    "crudErrorLogin": {
        "_method": "get",
        "_path": "/{{_tags0}}/crudErrorLogin",
        "responses": {
            "500": {
                "description": "500 error - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "login by password"
    },
    "crudErrorOptions": {
        "_method": "options",
        "_path": "/{{_tags0}}/crudErrorOptions",
        "responses": {
            "500": {
                "description": "500 error - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "return error response"
    },
    "crudErrorPatch": {
        "_method": "patch",
        "_path": "/{{_tags0}}/crudErrorPatch",
        "responses": {
            "500": {
                "description": "500 error - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "return error response"
    },
    "crudErrorPost": {
        "_method": "post",
        "_path": "/{{_tags0}}/crudErrorPost",
        "responses": {
            "500": {
                "description": "500 error - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "return error response"
    },
    "crudErrorPre": {
        "_method": "get",
        "_path": "/{{_tags0}}/crudErrorPre",
        "responses": {
            "500": {
                "description": "500 error - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "return error response"
    },
    "crudErrorPut": {
        "_method": "put",
        "_path": "/{{_tags0}}/crudErrorPut",
        "responses": {
            "500": {
                "description": "500 error - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "return error response"
    },
    "crudGetManyByQuery": {
        "_method": "get",
        "_path": "/{{_tags0}}/crudGetManyByQuery",
        "parameters": [
            {
                "default": "{\"_id\":{\"$exists\":true}}",
                "description": "query param",
                "format": "json",
                "in": "query",
                "name": "_queryWhere",
                "required": true,
                "type": "string"
            },
            {
                "default": "{}",
                "description": "projection-fields param",
                "format": "json",
                "in": "query",
                "name": "_queryFields",
                "type": "string"
            },
            {
                "default": 20,
                "description": "cursor-limit param",
                "in": "query",
                "name": "_queryLimit",
                "required": true,
                "type": "integer"
            },
            {
                "default": 0,
                "description": "cursor-skip param",
                "in": "query",
                "name": "_querySkip",
                "type": "integer"
            },
            {
                "default": "[{\"fieldName\":\"_timeUpdated\",\"isDescending\":true}]",
                "description": "cursor-sort param",
                "format": "json",
                "in": "query",
                "name": "_querySort",
                "type": "string"
            }
        ],
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse{{_schemaName}}"
                }
            }
        },
        "summary": "get many {{_schemaName}} objects by query"
    },
    "crudGetOneById": {
        "_idField": "{{_idField}}",
        "_method": "get",
        "_path": "/{{_tags0}}/crudGetOneById.{{_idField}}.{{_idAlias}}",
        "parameters": [
            {
                "description": "{{_schemaName}} {{_idField}}",
                "in": "query",
                "name": "{{_idField}}",
                "required": true,
                "type": "string"
            }
        ],
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse{{_schemaName}}"
                }
            }
        },
        "summary": "get one {{_schemaName}} object by {{_idField}}"
    },
    "crudGetOneByQuery": {
        "_method": "get",
        "_path": "/{{_tags0}}/crudGetOneByQuery",
        "parameters": [
            {
                "default": "{}",
                "description": "query param",
                "format": "json",
                "in": "query",
                "name": "_queryWhere",
                "required": true,
                "type": "string"
            }
        ],
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse{{_schemaName}}"
                }
            }
        },
        "summary": "get one {{_schemaName}} object by query"
    },
    "crudNullDelete": {
        "_method": "delete",
        "_path": "/{{_tags0}}/crudNullDelete",
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "return null response"
    },
    "crudNullGet": {
        "_method": "get",
        "_path": "/{{_tags0}}/crudNullGet",
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "return null response"
    },
    "crudNullHead": {
        "_method": "head",
        "_path": "/{{_tags0}}/crudNullHead",
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "return null response"
    },
    "crudNullOptions": {
        "_method": "options",
        "_path": "/{{_tags0}}/crudNullOptions",
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "return null response"
    },
    "crudNullPatch": {
        "_method": "patch",
        "_path": "/{{_tags0}}/crudNullPatch",
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "return null response"
    },
    "crudNullPost": {
        "_method": "post",
        "_path": "/{{_tags0}}/crudNullPost",
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "return null response"
    },
    "crudNullPut": {
        "_method": "put",
        "_path": "/{{_tags0}}/crudNullPut",
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "return null response"
    },
    "crudRemoveManyByQuery": {
        "_method": "delete",
        "_path": "/{{_tags0}}/crudRemoveManyByQuery",
        "parameters": [
            {
                "default": "{\"id\":\"undefined\"}",
                "description": "query param",
                "format": "json",
                "in": "query",
                "name": "_queryWhere",
                "required": true,
                "type": "string"
            }
        ],
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "remove many {{_schemaName}} objects by query"
    },
    "crudRemoveOneById": {
        "_idField": "{{_idField}}",
        "_method": "delete",
        "_path": "/{{_tags0}}/crudRemoveOneById.{{_idField}}.{{_idAlias}}",
        "parameters": [
            {
                "description": "{{_schemaName}} {{_idField}}",
                "in": "query",
                "name": "{{_idField}}",
                "required": true,
                "type": "string"
            }
        ],
        "summary": "remove one {{_schemaName}} object by {{_idField}}"
    },
    "crudSetManyById": {
        "_method": "put",
        "_path": "/{{_tags0}}/crudSetManyById",
        "parameters": [
            {
                "description": "{{_schemaName}} object",
                "in": "body",
                "name": "body",
                "required": true,
                "schema": {
                    "items": {
                        "$ref": "#/definitions/{{_schemaName}}"
                    },
                    "type": "array"
                }
            }
        ],
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse{{_schemaName}}"
                }
            }
        },
        "summary": "create or replace many {{_schemaName}} objects"
    },
    "crudSetOneById": {
        "_idField": "{{_idField}}",
        "_method": "put",
        "_path": "/{{_tags0}}/crudSetOneById.{{_idField}}.{{_idAlias}}",
        "parameters": [
            {
                "description": "{{_schemaName}} {{_idField}}",
                "in": "query",
                "name": "{{_idField}}",
                "type": "string"
            },
            {
                "description": "{{_schemaName}} object",
                "in": "body",
                "name": "body",
                "required": true,
                "schema": {
                    "$ref": "#/definitions/{{_schemaName}}"
                }
            }
        ],
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse{{_schemaName}}"
                }
            }
        },
        "summary": "create or replace one {{_schemaName}} object by {{_idField}}"
    },
    "crudUpdateOneById": {
        "_idField": "{{_idField}}",
        "_method": "patch",
        "_path": "/{{_tags0}}/crudUpdateOneById.{{_idField}}.{{_idAlias}}",
        "parameters": [
            {
                "description": "{{_schemaName}} {{_idField}}",
                "in": "query",
                "name": "{{_idField}}",
                "type": "string"
            },
            {
                "description": "{{_schemaName}} object",
                "in": "body",
                "name": "body",
                "required": true,
                "schema": {
                    "$ref": "#/definitions/{{_schemaName}}"
                },
                "x-swgg-notRequired": true
            }
        ],
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse{{_schemaName}}"
                }
            }
        },
        "summary": "create or update one {{_schemaName}} object by {{_idField}}"
    },
    "fileGetOneById": {
        "_idField": "{{_idField}}",
        "_method": "get",
        "_path": "/{{_tags0}}/fileGetOneById.{{_idField}}.{{_idAlias}}",
        "parameters": [
            {
                "description": "{{_schemaName}} {{_idField}}",
                "in": "query",
                "name": "{{_idField}}",
                "required": true,
                "type": "string"
            }
        ],
        "produces": [
            "application/octet-stream"
        ],
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "type": "file"
                }
            }
        },
        "summary": "get one {{_schemaName}} file by {{_idField}}"
    },
    "fileUploadManyByForm": {
        "_fileUploadNumber": "{{_fileUploadNumber}}",
        "_method": "post",
        "_path": "/{{_tags0}}/fileUploadManyByForm.{{_fileUploadNumber}}",
        "consumes": [
            "multipart/form-data"
        ],
        "parameters": [
            {
                "description": "{{_schemaName}} file description",
                "in": "formData",
                "name": "fileDescription",
                "type": "string"
            },
            {
                "description": "{{_schemaName}} file to upload by form",
                "in": "formData",
                "name": "file1",
                "type": "file"
            }
        ],
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse{{_schemaName}}"
                }
            }
        },
        "summary": "upload many {{_schemaName}} files by form"
    },
    "userLoginByPassword": {
        "_method": "get",
        "_path": "/{{_tags0}}/userLoginByPassword",
        "parameters": [
            {
                "description": "The user name for login",
                "in": "query",
                "name": "username",
                "required": true,
                "type": "string"
            },
            {
                "description": "The password for login in clear text",
                "in": "query",
                "name": "password",
                "required": true,
                "type": "string"
            }
        ],
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "login by password"
    },
    "userLogout": {
        "_method": "get",
        "_path": "/{{_tags0}}/userLogout",
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "logout"
    }
}
// JSON.stringify templateApiDict items to prevent side-effects
Object.keys(local.templateApiDict).forEach(function (key) {
    local.templateApiDict[key] = JSON.stringify(local.templateApiDict[key]);
});



// https://github.com/swagger-api/swagger-ui/blob/v2.1.3/dist/images/logo_small.png
local.templateSwaggerUiLogoSmallBase64 = '\
iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFn\
ZVJlYWR5ccllPAAAAqRJREFUeNrEVz1s00AUfnGXii5maMXoEUEHVwIpEkPNgkBdMnQoU5ytiKHJwpp2\
Q2JIO8DCUDOxIJFIVOoWZyJSh3pp1Q2PVVlcCVBH3ufeVZZ9Zye1Ay86nXV+ue/9fO/lheg/Se02X1rv\
ksmbnTiKvuxQMBNgBnN4a/LCbmnUAP6JV58NCUsBC8CuAJxGPF47OgNqBaA93tolUhnx6jC4NxGwyOEw\
lccyAs+3kwdzKq0HDn2vEBTi8J2XpyMaywNDE157BhXUE3zJhlq8GKq+Zd2zaWHepPA8oN9XkfLmRdOi\
JV4XUUg/IyWncLjCYY/SHndV2u7zHr3bPKZtdxgboJOnthvrfGj/oMf3G0r7JVmNlLfKklmrt2MvvcNO\
7LFOhoFHfuAJI5o6ta10jpt5CQLgwXhXG2YIwvu+34qf78ybOjWTnWwkgR36d7JqJOrW0hHmNrKg9xhi\
S4+1jFmrxymh03B0w+6kURIAu3yHtOD5oaUNojMnGgbcctNvwdAnyxvxRR+/vaJnjzbpzcZX+nN1SdGv\
85i9eH8w3qPO+mdm/y4dnQ1iI8Fq6Nf4cxL6GWSjiFDSs0VRnxC5g0xSB2cgHpaseTxfqOv5uoHkNQ6H\
a/N1Yz9mNMppEkEkYKj79q6uCq4bCHcSX3fJ0Vk/k9siASjCm1N6gZH6Ec9IXt2WkFES2K/ixoIyktJP\
Au/ptOA1SgO5zqtr6KASJPF0nMV8dgMsRhRPOcMwqQAOoi0VAIMLAEWJ6YYC1c8ibj1GP51RqwzYwZVM\
HQuvOzMCBUtb2tGHx5NAdLKqp5AX7Ng4d+Zi8AGDI9z1ijx9yaCH04y3GCP2S+QcvaGl+pcxyUBvinFl\
awoDQjHSelX8hQEoIrAq8p/mgC88HOS1YCl/BRgAmiD/1gn6Nu8AAAAASUVORK5CYII=\
';



local.templateUiDatatable = '\
<div class="pagination tr">\n\
    {{#each pageList}}\n\
    <button\n\
        class="onEventDatatableReload"\n\
        data-page-number={{pageNumber}}\n\
        data-resource-name="{{name}}"\n\
        {{#if disabled}}disabled{{/if disabled}}\n\
    >{{valueEncoded htmlSafe}}</button>\n\
    {{/each pageList}}\n\
</div>\n\
<table class="borderBottom borderTop">\n\
    <thead>\n\
        <tr>\n\
            <th\n\
                class="cursorPointer"\n\
                style="padding-left: {{iiPadding}}rem; padding-right: {{iiPadding}}rem;"\n\
            ><button class="onEventDatatableSelectedRemove">remove</button></th>\n\
            {{#each propDefList}}\n\
            <th class="cursorPointer">\n\
                <div>{{name}}</div>\n\
                <div class="color777">\n\
                    {{type2}}{{#if format2}}<br>({{format2}}){{/if format2}}\n\
                </div>\n\
                <div class="sortAsc">+</div>\n\
                <div class="sortDsc">-</div>\n\
            </th>\n\
            {{/each propDefList}}\n\
            <th\n\
                class="cursorPointer"\n\
                style="padding-left: {{iiPadding}}rem; padding-right: {{iiPadding}}rem;"\n\
            ><button class="onEventDatatableSelectedRemove">remove</button></th>\n\
        </tr>\n\
    </thead>\n\
    <tbody>\n\
        {{#each dbRowList}}\n\
        <tr data-id="{{id jsonStringify encodeURIComponent}}">\n\
            <td class="cursorPointer eventDelegateClick onEventDatatableTrSelect">\n\
                <span class="tr">\n\
                    <input type="checkbox">\n\
                    <span class="flex1">{{ii}}</span>\n\
                </span>\n\
            </td>\n\
            {{#each colList}}\n\
            <td>{{valueEncoded htmlSafe}}</td>\n\
            {{/each colList}}\n\
            <td class="cursorPointer eventDelegateClick onEventDatatableTrSelect">\n\
                <span class="tr">\n\
                    <input type="checkbox">\n\
                    <span class="flex1">{{ii}}</span>\n\
                </span>\n\
        </tr>\n\
        {{/each dbRowList}}\n\
    <tfoot>\n\
        <tr>\n\
            <th\n\
                class="cursorPointer"\n\
                style="padding-left: {{iiPadding}}rem; padding-right: {{iiPadding}}rem;"\n\
            ><button class="onEventDatatableSelectedRemove">remove</button></th>\n\
            {{#each propDefList}}\n\
            <th class="cursorPointer">\n\
                <div>{{name}}</div>\n\
                <div class="color777">\n\
                    {{type2}}{{#if format2}}<br>({{format2}}){{/if format2}}\n\
                </div>\n\
                <div class="sortAsc">+</div>\n\
                <div class="sortDsc">-</div>\n\
            </th>\n\
            {{/each propDefList}}\n\
            <th\n\
                class="cursorPointer"\n\
                style="padding-left: {{iiPadding}}rem; padding-right: {{iiPadding}}rem;"\n\
            ><button class="onEventDatatableSelectedRemove">remove</button></th>\n\
        </tr>\n\
    </tfoot>\n\
</table>\n\
<div class="pagination tr">\n\
    {{#each pageList}}\n\
    <button\n\
        class="onEventDatatableReload"\n\
        data-page-number={{pageNumber}}\n\
        data-resource-name="{{name}}"\n\
        {{#if disabled}}disabled{{/if disabled}}\n\
    >{{valueEncoded htmlSafe}}</button>\n\
    {{/each pageList}}\n\
</div>\n\
';



// https://github.com/swagger-api/swagger-ui/blob/v2.1.3/src/main/template/main.handlebars
local.templateUiMain = '\
<div class="eventDelegateClick modal onEventModalHide" style="display: none; opacity: 0;">\n\
    <form class="datatable eventDelegateClick"></form>\n\
</div>\n\
<div class="eventDelegateClick popup" style="display: none;"></div>\n\
<form2 class="eventDelegateSubmit header onEventUiReload tr">\n\
    <a class="td1" href="https://github.com/kaizhu256/node-swgg" target="_blank">swgg</a>\n\
    <input\n\
        class="flex1 td2"\n\
        type="text"\n\
        value="{{url}}"\n\
    >\n\
    <button class="eventDelegateClick onEventUiReload td3">Explore</button>\n\
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
        <li class="marginTop05">\n\
            <a target="_blank" href="{{info.termsOfService}}">Terms of service</a>\n\
        </li>\n\
        {{/if info.termsOfService}}\n\
        {{#if info.contact.name}}\n\
        <li class="marginTop05">Created by {{info.contact.name htmlSafe}}</li>\n\
        {{/if info.contact.name}}\n\
        {{#if info.contact.url}}\n\
        <li class="marginTop05">\n\
            See more at <a href="{{info.contact.url}}">{{info.contact.url}}</a>\n\
        </li>\n\
        {{/if info.contact.url}}\n\
        {{#if info.contact.email}}\n\
        <li class="marginTop05">\n\
            <a\n\
                target="_parent"\n\
                href="mailto:{{info.contact.email}}?subject={{info.title htmlSafe}}"\n\
            >Contact the developer</a>\n\
        </li>\n\
        {{/if info.contact.email}}\n\
        {{#if info.license}}\n\
        <li class="marginTop05">\n\
            <a target="_blank" href="{{info.license.url}}">{{info.license.name}}</a>\n\
        </li>\n\
        {{/if info.license}}\n\
    </ul>\n\
    {{/if info}}\n\
</div>\n\
<div class="reset resourceList"></div>\n\
<div class="color777 footer reset">\n\
    <div>\n\
        [ <span>base url</span>: {{basePath}}, <span>api version</span>: {{info.version}} ]\n\
    </div>\n\
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
        <span\n\
            class="td2 {{#if deprecated}}fontLineThrough{{/if deprecated}}"\n\
        >{{_path}}</span>\n\
        <span class="td3">{{operationId}}</span>\n\
        <span class="td4">{{summary htmlSafe}}</span>\n\
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
        <div class="borderTop paramDef tr" id="{{id}}" name="{{name}}">{{innerHTML}}</div>\n\
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
    {{name}}\n\
    {{#if description}}\n\
    <br><span class="color777">{{description htmlSafe}}</span>\n\
    {{/if description}}\n\
</span>\n\
<span class="td2">{{type2}}{{#if format2}}<br>({{format2}}){{/if format2}}</span>\n\
<span class="td3">\n\
    {{#if isTextarea}}\n\
    <textarea\n\
        class="input"\n\
        data-value-encoded="{{valueEncoded encodeURIComponent}}"\n\
        placeholder="{{placeholder}}"></textarea>\n\
    {{/if isTextarea}}\n\
    {{#if isFile}}\n\
    <input class="input" type="file">\n\
    {{/if isFile}}\n\
    {{#if isSelect}}\n\
    <select class="input" {{#if isSelectMultiple}}multiple{{/if isSelectMultiple}}>\n\
        {{#each selectOptionList}}\n\
        <option\n\
            data-value-decoded="{{valueDecoded jsonStringify encodeURIComponent}}"\n\
            id={{id}}\n\
            {{selected}}\n\
        >{{valueEncoded htmlSafe}}</option>\n\
        {{/each selectOptionList}}\n\
    </select>\n\
    {{/if isSelect}}\n\
    {{#if isInputText}}\n\
    <input\n\
        class="input"\n\
        data-value-encoded="{{valueEncoded encodeURIComponent}}"\n\
        placeholder="{{placeholder}}"\n\
        type="text"\n\
    >\n\
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
        <a\n\
            class="color777 onEventResourceDisplayAction td3"\n\
            href="#"\n\
        >Expand / Collapse Operations</a>\n\
        <a\n\
            class="color777 onEventDatatableReload td4"\n\
            data-resource-name="{{name}}"\n\
            href="#"\n\
        >Datatable</a>\n\
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
        local.swaggerSchemaJson = local.jsonCopy(local.objectSetOverride(
            JSON.parse(local.assetsDict['/assets.swgg.json-schema.json']),
            JSON.parse(local.assetsDict['/assets.swgg.schema.json']),
            2
        ));
    }());



    // run shared js-env code - function
    (function () {
        local.apiAjax = function (self, options, onError) {
        /*
         * this function will send a swagger-api ajax-request with the pathObject self
         */
            var isMultipartFormData, tmp;
            isMultipartFormData = (self.consumes && self.consumes[0]) === 'multipart/form-data';
            local.objectSetDefault(options, { data: '', paramDict: {}, url: '' });
            // try to validate paramDict
            local.tryCatchOnError(function () {
                local.validateByParamDefList({
                    // normalize paramDict
                    data: local.normalizeParamDictSwagger(
                        local.jsonCopy(options.paramDict),
                        self
                    ),
                    dataReadonlyRemove: options.paramDict,
                    key: self.operationId,
                    paramDefList: self.parameters
                });
            }, function (error) {
                options.errorValidate = error;
                onError(error);
            });
            if (options.errorValidate) {
                return;
            }
            // init options-defaults
            local.objectSetDefault(options, {
                inForm: isMultipartFormData
                    ? new local.FormData()
                    : '',
                inHeader: {},
                inPath: self._path,
                inQuery: '',
                headers: {},
                method: self._method,
                responseType: self.produces &&
                        self.produces[0].indexOf('application/octet-stream') === 0
                    ? 'arraybuffer'
                    : ''
            });
            // init paramDict
            self.parameters.forEach(function (paramDef) {
                tmp = options.paramDict[paramDef.name];
                if (tmp === undefined) {
                    return;
                }
                // serialize array
                if (paramDef.type === 'array' && paramDef.in !== 'body') {
                    if (typeof tmp !== 'string') {
                        switch (paramDef.collectionFormat) {
                        case 'json':
                            tmp = JSON.stringify(tmp);
                            break;
                        case 'multi':
                            tmp.forEach(function (value) {
                                options[paramDef.in === 'formData'
                                    ? 'inForm'
                                    : 'inQuery'] += '&' +
                                    encodeURIComponent(paramDef.name) + '=' +
                                    encodeURIComponent(paramDef.items.type === 'string'
                                        ? value
                                        : JSON.stringify(value));
                            });
                            return;
                        case 'pipes':
                            tmp = tmp.join('|');
                            break;
                        case 'ssv':
                            tmp = tmp.join(' ');
                            break;
                        case 'tsv':
                            tmp = tmp.join('\t');
                            break;
                        // default to csv
                        default:
                            tmp = tmp.join(',');
                        }
                    }
                } else if (!(paramDef.type === 'string' || tmp instanceof local.Blob)) {
                    tmp = JSON.stringify(tmp);
                }
                switch (paramDef.in) {
                case 'body':
                    options.inBody = tmp;
                    break;
                case 'formData':
                    if (isMultipartFormData) {
                        options.inForm.append(paramDef.name, tmp, tmp && tmp.name);
                        break;
                    }
                    options.inForm += '&' + encodeURIComponent(paramDef.name) + '=' +
                        encodeURIComponent(tmp);
                    break;
                case 'header':
                    options.inHeader[encodeURIComponent(paramDef.name.toLowerCase())] = tmp;
                    break;
                case 'query':
                    options.inQuery += '&' + encodeURIComponent(paramDef.name) + '=' +
                        encodeURIComponent(tmp);
                    break;
                case 'path':
                    options.inPath = options.inPath
                        .replace('{' + paramDef.name + '}', encodeURIComponent(tmp));
                    break;
                }
            });
            // init data
            options.data = options.inBody || (isMultipartFormData
                ? options.inForm
                : options.inForm.slice(1));
            // init headers
            local.objectSetOverride(options.headers, options.inHeader);
            // init headers - Content-Type
            if (options.inForm) {
                options.headers['Content-Type'] = isMultipartFormData
                    ? 'multipart/form-data'
                    : 'application/x-www-form-urlencoded';
            }
            // init headers - Authorization
            options.jwtEncrypted = options.jwtEncrypted || local.userJwtEncrypted;
            if (options.jwtEncrypted) {
                options.headers.Authorization = options.headers.Authorization ||
                    'Bearer ' + options.jwtEncrypted;
            }
            // init url
            options.url = (local.urlBaseGet() + options.inPath + '?' + options.inQuery.slice(1))
                .replace((/\?$/), '');
            if (!(options.headers['Content-Type'] || options.headers['content-type'])) {
                options.headers['content-type'] = 'application/json; charset=UTF-8';
            }
            // send ajax-request
            return local.ajax(options, function (error, xhr) {
                // try to init responseJson
                local.tryCatchOnError(function () {
                    xhr.responseJson = JSON.parse(xhr.responseText);
                }, local.nop);
                // init userJwtEncrypted
                if (xhr.getResponseHeader('swgg-jwt-encrypted')) {
                    local.userJwtEncrypted = xhr.getResponseHeader('swgg-jwt-encrypted');
                }
                onError(error, xhr);
            });
        };

        local.apiDictUpdate = function (options) {
        /*
         * this function will update the swagger-api dict of api-calls
         */
            var tmp;
            options = options || {};
            // init apiDict
            local.apiDict = local.apiDict || {};
            // init swaggerJson
            local.swaggerJson = local.swaggerJson || {
                "basePath": "/api/v0",
                "definitions": {
                    "BuiltinFile": {
                        "properties": {
                            "_id": {
                                "readOnly": true,
                                "type": "string"
                            },
                            "_timeCreated": {
                                "format": "date-time",
                                "readOnly": true,
                                "type": "string"
                            },
                            "_timeUpdated": {
                                "format": "date-time",
                                "readOnly": true,
                                "type": "string"
                            },
                            "fileBlob": {
                                "format": "byte",
                                "type": "string"
                            },
                            "fileContentType": {
                                "type": "string"
                            },
                            "fileDescription": {
                                "type": "string"
                            },
                            "fileFilename": {
                                "type": "string"
                            },
                            "fileInputName": {
                                "type": "string"
                            },
                            "fileSize": {
                                "minimum": 0,
                                "type": "integer"
                            },
                            "fileUrl": {
                                "type": "string"
                            },
                            "id": {
                                "type": "string"
                            }
                        }
                    },
                    "BuiltinJsonapiResponse": {
                        "properties": {
                            "data": {
                                "items": {
                                    "type": "object"
                                },
                                "type": "array"
                            },
                            "errors": {
                                "items": {
                                    "type": "object"
                                },
                                "type": "array"
                            },
                            "meta": {
                                "type": "object"
                            }
                        }
                    },
                    "BuiltinUser": {
                        "properties": {
                            "_id": {
                                "readOnly": true,
                                "type": "string"
                            },
                            "_timeCreated": {
                                "format": "date-time",
                                "readOnly": true,
                                "type": "string"
                            },
                            "_timeUpdated": {
                                "format": "date-time",
                                "readOnly": true,
                                "type": "string"
                            },
                            "id": {
                                "type": "string"
                            },
                            "jwtEncrypted": {
                                "type": "string"
                            },
                            "password": {
                                "format": "password",
                                "type": "string"
                            },
                            "username": {
                                "type": "string"
                            }
                        }
                    }
                },
                "info": {
                    "description": "demo of swagger-ui server",
                    "title": "swgg api",
                    "version": "0"
                },
                "paths": {},
                "securityDefinitions": {},
                "swagger": "2.0",
                "tags": []
            };
            // save tags
            tmp = {};
            [local.swaggerJson.tags, options.tags || []].forEach(function (tagList) {
                tagList.forEach(function (tag) {
                    local.objectSetOverride(tmp, local.objectLiteralize({
                        '$[]': [tag.name, tag]
                    }));
                }, 2);
            });
            tmp = Object.keys(tmp).sort().map(function (key) {
                return tmp[key];
            });
            // merge options into swaggerJson
            options = local.objectSetOverride(local.swaggerJson, options, 10);
            // restore tags
            local.swaggerJson.tags = tmp;
            Object.keys(options.definitions).forEach(function (schemaName) {
                // normalize definition
                options.definitions[schemaName] =
                    local.schemaNormalizeAndCopy(options.definitions[schemaName]);
            });
            // init apiDict from paths
            Object.keys(options.paths).forEach(function (path) {
                Object.keys(options.paths[path]).forEach(function (method) {
                    var self;
                    self = options.paths[path][method];
                    self._method = method;
                    self._path = path;
                    local.objectSetOverride(local.apiDict, local.objectLiteralize({
                        '$[]': [self.tags[0] + ' ' + self.operationId, self]
                    }), 2);
                });
            });
            // init apiDict from x-swgg-apiDict
            Object.keys(options['x-swgg-apiDict'] || {}).forEach(function (key) {
                // init self
                local.objectSetOverride(local.apiDict, local.objectLiteralize({
                    '$[]': [key, local.jsonCopy(options['x-swgg-apiDict'][key])]
                }), Infinity);
            });
            // init apiDict
            Object.keys(local.apiDict).forEach(function (key) {
                var self;
                self = local.apiDict[key];
                if (key === self._keyPath) {
                    return;
                }
                // init _operationId
                self._operationId = self._operationId || key.split(' ')[1];
                // init _fileUploadNumber
                self._fileUploadNumber = 1;
                self._operationId.replace(
                    (/^fileUploadManyByForm\.(\d+)/),
                    function (match0, match1) {
                        // jslint-hack - nop
                        local.nop(match0);
                        self._fileUploadNumber = Number(match1);
                    }
                );
                // init _idAlias and _idField
                tmp = local.idFieldInit({ operationId: self._operationId });
                self._idAlias = tmp.idAlias;
                self._idField = tmp.idField;
                // init _tags0
                self._tags0 = key.split(' ')[0];
                // init templateApiDict
                if (local.templateApiDict[self._operationId.split('.')[0]]) {
                    local.objectSetDefault(
                        self,
                        JSON.parse(local.templateApiDict[self._operationId.split('.')[0]]
                            .replace((/\{\{_fileUploadNumber\}\}/g), self._fileUploadNumber)
                            .replace((/\{\{_idAlias\}\}/g), self._idAlias)
                            .replace((/\{\{_idField\}\}/g), self._idField)
                            .replace((/\{\{_schemaName\}\}/g), self._schemaName)
                            .replace((/\{\{_tags0\}\}/g), self._tags0)
                            .replace((/\{\{operationId\}\}/g), self._operationId))
                    );
                }
                // init default
                local.objectSetDefault(self, {
                    _keyOperationId: key,
                    operationId: self._operationId,
                    parameters: [],
                    responses: {
                        200: {
                            description: 'ok - ' +
                                'http://jsonapi.org/format/#document-top-level',
                            schema: { $ref: '#/definitions/BuiltinJsonapiResponse' }
                        }
                    },
                    tags: [self._tags0]
                });
                // init _method
                self._method = self._method.toUpperCase();
                // init _keyPath
                self._keyPath = self._method + ' ' + self._path.replace((/\{.*?\}/g), '');
                // init _idField.format and _idField.type
                if (self._schemaName) {
                    self.parameters.forEach(function (param) {
                        if (param.name === self._idField) {
                            param.format = options.definitions[self._schemaName]
                                .properties[self._idAlias].format;
                            param.type = options.definitions[self._schemaName]
                                .properties[self._idAlias].type;
                        }
                    });
                }
                switch (self.operationId.split('.')[0]) {
                // add extra file-upload forms
                case 'fileUploadManyByForm':
                    for (tmp = 1; tmp <= self._fileUploadNumber; tmp += 1) {
                        self.parameters[tmp] = local.jsonCopy(self.parameters[1]);
                        self.parameters[tmp].name = 'file' + tmp;
                    }
                    break;
                }
                // update apiDict
                self = local.apiDict[key] = local.apiDict[self._keyPath] = local.jsonCopy(self);
                // init _ajax
                self._ajax = function (options, onError) {
                    return local.apiAjax(self, options, onError);
                };
                // remove underscored keys from self
                tmp = local.jsonCopy(self);
                Object.keys(tmp).forEach(function (key) {
                    if (key[0] === '_') {
                        delete tmp[key];
                    }
                });
                // update paths
                local.objectSetOverride(options, local.objectLiteralize({
                    paths: { '$[]': [self._path, { '$[]': [self._method.toLowerCase(), tmp] }] }
                }), 3);
            });
            // normalize swaggerJson
            local.swaggerJson = JSON.parse(local.jsonStringifyOrdered(options));
            // update $npm_config_swagger_basePath
            local.env.npm_config_swagger_basePath = local.swaggerJson.basePath;
            // try to validate swaggerJson
            local.tryCatchOnError(function () {
                local.validateBySwagger(local.swaggerJson);
            }, local.onErrorDefault);
        };

        local.dbFieldRandomCreate = function (options) {
        /*
         * this function will create a random dbField from options.propDef
         */
            var ii, max, min, propDef, tmp;
            propDef = options.propDef;
            if (propDef.readOnly) {
                return;
            }
            if (propDef.enum) {
                tmp = options.modeNotRandom
                    ? propDef.enum[0]
                    : local.listGetElementRandom(propDef.enum);
                return propDef.type === 'array'
                    ? [tmp]
                    : tmp;
            }
            // http://json-schema.org/latest/json-schema-validation.html#anchor13
            // 5.1.  Validation keywords for numeric instances (number and integer)
            max = isFinite(propDef.maximum)
                ? propDef.maximum
                : 999;
            min = isFinite(propDef.maximum)
                ? propDef.minimum
                : 0;
            switch (propDef.type) {
            case 'array':
                tmp = [];
                // http://json-schema.org/latest/json-schema-validation.html#anchor36
                // 5.3.  Validation keywords for arrays
                for (ii = 0; ii < (propDef.minItems || 0); ii += 1) {
                    tmp.push(null);
                }
                break;
            case 'boolean':
                tmp = options.modeNotRandom
                    ? false
                    : Math.random() <= 0.5
                    ? false
                    : true;
                break;
            case 'integer':
                if (propDef.exclusiveMaximum) {
                    max -= 1;
                }
                if (propDef.exclusiveMinimum) {
                    min += 1;
                }
                min = Math.min(min, max);
                tmp = options.modeNotRandom
                    ? 0
                    : Math.random();
                tmp = Math.floor(min + tmp * (max - min));
                break;
            case 'object':
                tmp = {};
                // http://json-schema.org/latest/json-schema-validation.html#anchor53
                // 5.4.  Validation keywords for objects
                for (ii = 0; ii < (propDef.minProperties || 0); ii += 1) {
                    tmp['property' + ii] = null;
                }
                break;
            case 'number':
                if (propDef.exclusiveMinimum) {
                    min = min < 0
                        ? min * 0.99999
                        : min * 1.00001 + 0.00001;
                }
                if (propDef.exclusiveMaximum) {
                    max = max > 0
                        ? max * 0.99999
                        : max * 1.00001 - 0.00001;
                }
                min = Math.min(min, max);
                tmp = options.modeNotRandom
                    ? 0
                    : Math.random();
                tmp = min + tmp * (max - min);
                break;
            case 'string':
                tmp = options.modeNotRandom
                    ? 'abcd1234'
                    : ((1 + Math.random()) * 0x10000000000000).toString(36).slice(1);
                switch (propDef.format) {
                case 'byte':
                    tmp = local.base64FromString(tmp);
                    break;
                case 'date':
                case 'date-time':
                    tmp = new Date().toISOString();
                    break;
                case 'email':
                    tmp = tmp + '@random.com';
                    break;
                case 'json':
                    tmp = JSON.stringify({ random: tmp });
                    break;
                case 'phone':
                    tmp = options.modeNotRandom
                        ? '+123 (1234) 1234-1234'
                        : '+' + Math.random().toString().slice(-3) +
                            ' (' + Math.random().toString().slice(-4) + ') ' +
                            Math.random().toString().slice(-4) + '-' +
                            Math.random().toString().slice(-4);
                    break;
                }
                // http://json-schema.org/latest/json-schema-validation.html#anchor25
                // 5.2.  Validation keywords for strings
                while (tmp.length < (propDef.minLength || 0)) {
                    tmp += tmp;
                }
                tmp = tmp.slice(0, propDef.maxLength || Infinity);
                break;
            }
            // http://json-schema.org/latest/json-schema-validation.html#anchor13
            // 5.1.  Validation keywords for numeric instances (number and integer)
            if (propDef.multipleOf) {
                tmp = propDef.multipleOf * Math.floor(tmp / propDef.multipleOf);
                if (tmp < min) {
                    tmp += propDef.multipleOf;
                }
            }
            return tmp;
        };

        local.dbRowListRandomCreate = function (options) {
        /*
         * this function will create a dbRowList of options.length random dbRow's
         */
            local.objectSetDefault(options, { dbRowList: [] });
            for (options.ii = 0; options.ii < options.length; options.ii += 1) {
                options.dbRowList.push(local.dbRowRandomCreate(options));
            }
            return options.dbRowList;
        };

        local.dbRowRandomCreate = function (options) {
        /*
         * this function will create a random dbRow from options.properties
         */
            var dbRow, tmp;
            dbRow = {};
            Object.keys(options.properties).forEach(function (key) {
                // try to validate data
                local.tryCatchOnError(function () {
                    tmp = local.dbFieldRandomCreate({
                        modeNotRandom: options.modeNotRandom,
                        propDef: options.properties[key]
                    });
                    local.validateByPropDef({
                        data: tmp,
                        key: options.properties[key].name,
                        schema: options.properties[key]
                    });
                    dbRow[key] = tmp;
                }, local.nop);
            });
            return local.jsonCopy(local.objectSetOverride(dbRow, options.override(options)));
        };

        local.idDomElementCreate = function (seed) {
        /*
         * this function will create a unique dom-element id from the seed,
         * that is both dom-selector and url friendly
         */
            var id, ii;
            id = encodeURIComponent(seed).replace((/\W/g), '_');
            for (ii = 2; local.idDomElementDict[id]; ii += 1) {
                id = encodeURIComponent(seed + '_' + ii).replace((/\W/g), '_');
            }
            local.idDomElementDict[id] = true;
            return id;
        };

        local.idFieldInit = function (options) {
        /*
         * this function will init options.idAlias, options.idField, and options.queryById
         */
            var idAlias, idField;
            // init idField
            options.idAlias = options.operationId.split('.');
            idField = options.idField = options.idAlias[1] || 'id';
            // init idAlias
            idAlias = options.idAlias = options.idAlias[2] || options.idField;
            // invert queryById
            if (options.modeQueryByIdInvert) {
                idAlias = options.idField;
                idField = options.idAlias;
            }
            // init queryById
            options.idValue = (options.data && options.data[idAlias]) || options.idValue;
            options.queryById = {};
            options.queryById[idField] = options.idValue;
            return options;
        };

        local.middlewareBodyParse = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will parse request.bodyRaw
         */
            var ii, jj, options;
            // jslint-hack
            local.nop(response);
            // if request is already parsed, then goto nextMiddleware
            if (!local.isNullOrUndefined(request.swgg.bodyParsed)) {
                nextMiddleware();
                return;
            }
            switch (String(request.headers['content-type']).split(';')[0]) {
            // parse application/x-www-form-urlencoded, e.g.
            // aa=hello%20world&bb=bye%20world
            case 'application/x-www-form-urlencoded':
                request.swgg.bodyParsed = local.bufferToString(request.bodyRaw);
                request.swgg.bodyParsed =
                    local.urlParse('?' + request.swgg.bodyParsed, true).query;
                break;
            /*
             * https://tools.ietf.org/html/rfc7578
             * parse multipart/form-data, e.g.
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
            case 'multipart/form-data':
                request.swgg.isMultipartFormData = true;
                request.swgg.bodyParsed = {};
                request.swgg.bodyMeta = {};
                options = {};
                options.crlf = local.bufferCreate([0x0d, 0x0a]);
                // init boundary
                ii = 0;
                jj = local.bufferIndexOfSubBuffer(request.bodyRaw, options.crlf, ii);
                if (jj <= 0) {
                    break;
                }
                options.boundary = local.bufferConcat([
                    options.crlf,
                    request.bodyRaw.slice(ii, jj)
                ]);
                ii = jj + 2;
                while (true) {
                    jj = local.bufferIndexOfSubBuffer(
                        request.bodyRaw,
                        options.boundary,
                        ii
                    );
                    if (jj < 0) {
                        break;
                    }
                    options.header = local.bufferToString(request.bodyRaw.slice(ii, ii + 1024))
                        .split('\r\n').slice(0, 2).join('\r\n');
                    options.contentType = (/^content-type:(.*)/im).exec(options.header);
                    options.contentType = options.contentType && options.contentType[1].trim();
                    options.filename = (/^content-disposition:.*?\bfilename="([^"]+)/im)
                        .exec(options.header);
                    options.filename = options.filename && options.filename[1];
                    options.name = (/^content-disposition:.*?\bname="([^"]+)/im)
                        .exec(options.header);
                    options.name = options.name && options.name[1];
                    ii = local.bufferIndexOfSubBuffer(
                        request.bodyRaw,
                        [0x0d, 0x0a, 0x0d, 0x0a],
                        ii + 2
                    ) + 4;
                    options.data = request.bodyRaw.slice(ii, jj);
                    request.swgg.bodyParsed[options.name] = options.data;
                    request.swgg.bodyMeta[options.name] = {
                        contentType: options.contentType,
                        filename: options.filename,
                        name: options.name
                    };
                    ii = jj + options.boundary.length + 2;
                }
                break;
            default:
                request.swgg.bodyParsed = local.bufferToString(request.bodyRaw);
                // try to JSON.parse the string
                local.tryCatchOnError(function () {
                    request.swgg.bodyParsed = JSON.parse(request.swgg.bodyParsed);
                }, local.nop);
            }
            nextMiddleware();
        };

        local.middlewareCrudBuiltin = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will
         * run the builtin crud-operations backed by db-lite
         */
            var crud, onParallel, options, tmp, user;
            options = {};
            local.onNext(options, function (error, data, meta) {
                switch (options.modeNext) {
                case 1:
                    crud = request.swgg.crud;
                    user = request.swgg.user;
                    switch (crud.operationId.split('.')[0]) {
                    case 'crudCountManyByQuery':
                        crud.dbTable.crudCountManyByQuery(crud.queryWhere, options.onNext);
                        break;
                    case 'crudSetManyById':
                        crud.dbTable.crudSetManyById(crud.body, options.onNext);
                        break;
                    case 'crudSetOneById':
                        // replace idField with idAlias in body
                        delete crud.body.id;
                        delete crud.body[crud.idField];
                        crud.body[crud.idAlias] = crud.data[crud.idField];
                        crud.dbTable.crudSetOneById(crud.body, options.onNext);
                        break;
                    case 'crudUpdateOneById':
                        // replace idField with idAlias in body
                        delete crud.body.id;
                        delete crud.body[crud.idField];
                        crud.body[crud.idAlias] = crud.data[crud.idField];
                        crud.dbTable.crudUpdateOneById(crud.body, options.onNext);
                        break;
                    // coverage-hack - test error handling-behavior
                    case 'crudErrorDelete':
                    case 'crudErrorGet':
                    case 'crudErrorHead':
                    case 'crudErrorOptions':
                    case 'crudErrorPatch':
                    case 'crudErrorPost':
                    case 'crudErrorPut':
                        options.onNext(local.errorDefault);
                        break;
                    case 'crudGetManyByQuery':
                        onParallel = local.onParallel(options.onNext);
                        onParallel.counter += 1;
                        crud.dbTable.crudGetManyByQuery({
                            limit: crud.queryLimit,
                            projection: crud.queryFields,
                            query: crud.queryWhere,
                            skip: crud.querySkip,
                            sort: crud.querySort
                        }, function (error, data) {
                            crud.queryData = data;
                            onParallel(error);
                        });
                        onParallel.counter += 1;
                        crud.dbTable.crudCountAll(function (error, data) {
                            crud.paginationCountTotal = data;
                            onParallel(error);
                        });
                        break;
                    case 'crudGetOneById':
                        crud.dbTable.crudGetOneById(crud.queryById, options.onNext);
                        break;
                    case 'crudGetOneByQuery':
                        crud.dbTable.crudGetOneByQuery({
                            query: crud.queryWhere
                        }, options.onNext);
                        break;
                    case 'crudNullDelete':
                    case 'crudNullGet':
                    case 'crudNullHead':
                    case 'crudNullOptions':
                    case 'crudNullPatch':
                    case 'crudNullPost':
                    case 'crudNullPut':
                        options.onNext();
                        break;
                    case 'crudRemoveManyByQuery':
                        crud.dbTable.crudRemoveManyByQuery(crud.queryWhere, options.onNext);
                        break;
                    case 'crudRemoveOneById':
                        crud.dbTable.crudRemoveOneById(crud.queryById, options.onNext);
                        break;
                    case 'fileGetOneById':
                        local.dbTableFile = local.db.dbTableCreateOne({ name: 'File' });
                        crud.dbTable.crudGetOneById(crud.queryById, options.onNext);
                        break;
                    case 'fileUploadManyByForm':
                        local.dbTableFile = local.db.dbTableCreateOne({ name: 'File' });
                        request.swgg.paramDict = {};
                        Object.keys(request.swgg.bodyMeta).forEach(function (key) {
                            if (typeof request.swgg.bodyMeta[key].filename !== 'string') {
                                request.swgg.paramDict[key] =
                                    local.bufferToString(request.swgg.bodyParsed[key]);
                            }
                        });
                        crud.body = Object.keys(request.swgg.bodyMeta)
                            .filter(function (key) {
                                return typeof request.swgg.bodyMeta[key].filename === 'string';
                            })
                            .map(function (key) {
                                tmp = local.jsonCopy(request.swgg.paramDict);
                                local.objectSetOverride(tmp, {
                                    fileBlob:
                                        local.base64FromBuffer(request.swgg.bodyParsed[key]),
                                    fileContentType: request.swgg.bodyMeta[key].contentType,
                                    fileFilename: request.swgg.bodyMeta[key].filename,
                                    fileInputName: request.swgg.bodyMeta[key].name,
                                    fileSize: request.swgg.bodyParsed[key].length,
                                    fileUrl: local.swaggerJson.basePath +
                                        '/' + request.swgg.pathObject._tags0 +
                                        '/fileGetOneById/' + tmp.id
                                });
                                return tmp;
                            });
                        local.dbTableFile.crudSetManyById(crud.body, options.onNext);
                        break;
                    case 'userLoginByPassword':
                    case 'userLogout':
                        // respond with 401 Unauthorized
                        if (!user.isAuthenticated) {
                            local.serverRespondHeadSet(request, response, 401, {});
                            request.swgg.crud.endArgList = [request, response];
                            options.modeNext = Infinity;
                            options.onNext();
                            return;
                        }
                        options.onNext();
                        break;
                    default:
                        options.modeNext = Infinity;
                        options.onNext();
                    }
                    break;
                case 2:
                    switch (crud.operationId.split('.')[0]) {
                    case 'crudSetOneById':
                    case 'crudUpdateOneById':
                        options.onNext(null, data);
                        break;
                    case 'crudGetManyByQuery':
                        options.onNext(null, crud.queryData, {
                            paginationCountTotal: crud.paginationCountTotal
                        });
                        break;
                    case 'fileUploadManyByForm':
                        options.onNext(null, data.map(function (element) {
                            delete element.fileBlob;
                            return element;
                        }));
                        break;
                    case 'userLoginByPassword':
                        options.onNext(null, { jwtEncrypted: user.jwtEncrypted });
                        break;
                    case 'userLogout':
                        crud.dbTable.crudUpdateOneById({
                            jwtEncrypted: null,
                            username: user.username
                        }, options.onNext);
                        break;
                    default:
                        options.onNext(null, data, meta);
                    }
                    break;
                case 3:
                    switch (crud.operationId.split('.')[0]) {
                    case 'fileGetOneById':
                        if (!data) {
                            local.serverRespondDefault(request, response, 404);
                            return;
                        }
                        local.serverRespondHeadSet(request, response, null, {
                            'Content-Type': data.fileContentType
                        });
                        response.end(local.base64ToBuffer(data.fileBlob));
                        break;
                    case 'userLogout':
                        options.onNext();
                        break;
                    default:
                        options.onNext(null, data, meta);
                    }
                    break;
                case 4:
                    request.swgg.crud.endArgList = [request, response, null, data, meta];
                    options.onNext();
                    break;
                default:
                    nextMiddleware(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.middlewareCrudEnd = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will end the builtin crud-operations
         */
            // jslint-hack
            local.nop(response);
            if (request.swgg.crud.endArgList) {
                local.serverRespondJsonapi.apply(null, request.swgg.crud.endArgList);
                return;
            }
            nextMiddleware();
        };

        local.middlewareRouter = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will
         * map the request's method-path to swagger's tags[0]-operationId
         */
            var tmp;
            // jslint-hack
            local.nop(response);
            // init swgg object
            local.objectSetDefault(
                request,
                { swgg: { crud: { operationId: '' }, user: {} } },
                2
            );
            // if request.url is not prefixed with swaggerJson.basePath,
            // then default to nextMiddleware
            if (request.urlParsed.pathname.indexOf(local.swaggerJson.basePath) !== 0) {
                nextMiddleware();
                return;
            }
            // init pathname
            request.swgg.pathname = request.method + ' ' + request.urlParsed.pathname
                .replace(local.swaggerJson.basePath, '');
            // init pathObject
            while (request.swgg.pathname !== tmp) {
                request.swgg.pathObject =
                    local.apiDict[request.swgg.pathname] ||
                    // handle /foo/{id}/bar case
                    local.apiDict[request.swgg.pathname
                        .replace((/\/[^\/]+\/([^\/]*?)$/), '//$1')];
                // if pathObject exists, then break
                if (request.swgg.pathObject) {
                    request.swgg.pathObject = local.jsonCopy(request.swgg.pathObject);
                    request.swgg.pathname = request.swgg.pathObject._keyPath;
                    // init crud.operationId
                    request.swgg.crud.operationId = request.swgg.pathObject._operationId;
                    break;
                }
                tmp = request.swgg.pathname;
                request.swgg.pathname = request.swgg.pathname
                    .replace((/\/[^\/]+?(\/*?)$/), '/$1');
            }
            nextMiddleware();
        };

        local.middlewareUserLogin = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will handle user login
         */
            var crud, options, user;
            options = {};
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    local.dbTableUser = local.db.dbTableCreateOne({ name: 'User' });
                    crud = request.swgg.crud;
                    user = request.swgg.user = {};
                    user.jwtEncrypted = request.headers.authorization &&
                        request.headers.authorization.replace('Bearer ', '');
                    user.jwtDecrypted = local.jwtA256GcmDecrypt(user.jwtEncrypted);
                    switch (crud.operationId.split('.')[0]) {
                    // coverage-hack - test error handling-behavior
                    case 'crudErrorLogin':
                        options.onNext(local.errorDefault);
                        return;
                    case 'userLoginByPassword':
                        user.password = request.urlParsed.query.password;
                        user.username = request.urlParsed.query.username;
                        if (user.password && user.username) {
                            local.dbTableUser.crudGetOneById({
                                username: user.username
                            }, options.onNext);
                            return;
                        }
                        break;
                    default:
                        if (user.jwtDecrypted.sub) {
                            // init username
                            user.username = user.jwtDecrypted.sub;
                            local.dbTableUser.crudGetOneById({
                                username: user.username
                            }, options.onNext);
                            return;
                        }
                    }
                    options.modeNext = Infinity;
                    options.onNext();
                    break;
                case 2:
                    switch (crud.operationId.split('.')[0]) {
                    case 'userLoginByPassword':
                        user.data = data;
                        if (!local.sjclHashScryptValidate(
                                user.password,
                                user.data && user.data.password
                            )) {
                            options.modeNext = Infinity;
                            options.onNext();
                            return;
                        }
                        // init isAuthenticated
                        user.isAuthenticated = true;
                        // https://tools.ietf.org/html/rfc7519
                        // create JSON Web Token (JWT)
                        user.jwtDecrypted = {};
                        user.jwtDecrypted.sub = user.data.username;
                        // update jwtEncrypted in client
                        user.jwtEncrypted = local.jwtA256GcmEncrypt(user.jwtDecrypted);
                        local.serverRespondHeadSet(request, response, null, {
                            'swgg-jwt-encrypted': user.jwtEncrypted
                        });
                        // update jwtEncrypted in dbTableUser
                        local.dbTableUser.crudUpdateOneById({
                            jwtEncrypted: user.jwtEncrypted,
                            username: user.jwtDecrypted.sub
                        }, options.onNext);
                        return;
                    default:
                        data = user.data = data || {};
                        if (data.jwtEncrypted) {
                            // init isAuthenticated
                            user.isAuthenticated = true;
                            // update jwtEncrypted in client
                            if (data.jwtEncrypted !== user.jwtEncrypted) {
                                user.jwtEncrypted = data.jwtEncrypted;
                                user.jwtDecrypted = local.jwtA256GcmDecrypt(user.jwtEncrypted);
                                local.serverRespondHeadSet(request, response, null, {
                                    'swgg-jwt-encrypted': user.jwtEncrypted
                                });
                            }
                        }
                    }
                    options.onNext();
                    break;
                default:
                    nextMiddleware(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.middlewareValidate = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will validate the swagger-request
         */
            var crud, modeNext, onNext, tmp;
            modeNext = 0;
            onNext = function () {
                modeNext += 1;
                switch (modeNext) {
                case 1:
                    // serve swagger.json
                    if (request.method + ' ' + request.urlParsed.pathname ===
                            'GET ' + local.swaggerJson.basePath + '/swagger.json') {
                        response.end(JSON.stringify(local.swaggerJson));
                        return;
                    }
                    if (!request.swgg.pathObject) {
                        modeNext = Infinity;
                        onNext();
                        return;
                    }
                    // init paramDict
                    request.swgg.paramDict = {};
                    // parse path param
                    tmp = request.urlParsed.pathname
                        .replace(local.swaggerJson.basePath, '').split('/');
                    request.swgg.pathObject._path.split('/').forEach(function (key, ii) {
                        if ((/^\{\S*?\}$/).test(key)) {
                            request.swgg.paramDict[key.slice(1, -1)] =
                                decodeURIComponent(tmp[ii]);
                        }
                    });
                    request.swgg.pathObject.parameters.forEach(function (paramDef) {
                        switch (paramDef.in) {
                        // parse body param
                        case 'body':
                            request.swgg.paramDict[paramDef.name] = request.swgg.bodyParsed ||
                                undefined;
                            break;
                        // parse formData param
                        case 'formData':
                            switch (String(request.headers['content-type']).split(';')[0]) {
                            case 'application/x-www-form-urlencoded':
                                request.swgg.paramDict[paramDef.name] =
                                    request.swgg.bodyParsed[paramDef.name];
                                break;
                            }
                            break;
                        // parse header param
                        case 'header':
                            request.swgg.paramDict[paramDef.name] =
                                request.headers[paramDef.name.toLowerCase()];
                            break;
                        // parse query param
                        case 'query':
                            request.swgg.paramDict[paramDef.name] =
                                request.urlParsed.query[paramDef.name];
                            break;
                        }
                        // parse array-multi
                        if (request.swgg.paramDict[paramDef.name] &&
                                paramDef.type === 'array' &&
                                paramDef.collectionFormat === 'multi') {
                            tmp = '';
                            request.swgg.paramDict[paramDef.name].forEach(function (value) {
                                tmp += '&' + encodeURIComponent(paramDef.name) + '=' +
                                    encodeURIComponent(value);
                            });
                            request.swgg.paramDict[paramDef.name] = tmp.slice(1);
                        }
                        // init default param
                        if (local.isNullOrUndefined(request.swgg.paramDict[paramDef.name]) &&
                                paramDef.default !== undefined) {
                            request.swgg.paramDict[paramDef.name] =
                                local.jsonCopy(paramDef.default);
                        }
                    });
                    // normalize paramDict
                    local.normalizeParamDictSwagger(
                        request.swgg.paramDict,
                        request.swgg.pathObject
                    );
                    // validate paramDict
                    local.validateByParamDefList({
                        data: request.swgg.paramDict,
                        key: request.swgg.pathname,
                        paramDefList: request.swgg.pathObject.parameters
                    });
                    onNext();
                    break;
                case 2:
                    // init crud
                    crud = request.swgg.crud;
                    // init crud.dbTable
                    crud.dbTable = request.swgg.pathObject &&
                        request.swgg.pathObject._schemaName &&
                        local.db.dbTableCreateOne({
                            name: request.swgg.pathObject._schemaName
                        });
                    if (!crud.dbTable) {
                        nextMiddleware();
                        return;
                    }
                    // init crud.body
                    if (!request.swgg.isMultipartFormData) {
                        crud.body = local.jsonCopy(request.swgg.bodyParsed);
                    }
                    // init crud.data
                    crud.data = local.jsonCopy(request.swgg.paramDict);
                    request.swgg.pathObject.parameters.forEach(function (param) {
                        // JSON.parse json-string
                        if (param.format === 'json' &&
                                param.type === 'string' &&
                                crud.data[param.name]) {
                            crud.data[param.name] = JSON.parse(crud.data[param.name]);
                        }
                    });
                    // init crud.query*
                    [{
                        key: 'queryFields',
                        value: {}
                    }, {
                        key: 'queryLimit',
                        value: 100
                    }, {
                        key: 'querySkip',
                        value: 0
                    }, {
                        key: 'querySort',
                        value: [{ fieldName: '_timeUpdated', isDescending: true }]
                    }, {
                        key: 'queryWhere',
                        value: {}
                    }].forEach(function (element) {
                        crud[element.key] = crud.data['_' + element.key] || JSON.parse(
                            local.templateRender(
                                request.swgg.pathObject['_' + element.key] || 'null',
                                request.swgg.paramDict
                            )
                        ) || element.value;
                    });
                    // pre-init crud.idField
                    crud.modeQueryByIdInvert = true;
                    local.idFieldInit(crud);
                    // init crud.data.id
                    switch (crud.operationId.split('.')[0]) {
                    case 'crudSetOneById':
                    case 'crudUpdateOneById':
                        if (!local.isNullOrUndefined(crud.data[crud.idField])) {
                            break;
                        }
                        crud.data[crud.idField] = (crud.body && crud.body[crud.idAlias]);
                        break;
                    }
                    // post-init crud.idField
                    crud.modeQueryByIdInvert = true;
                    local.idFieldInit(crud);
                    nextMiddleware();
                    break;
                default:
                    nextMiddleware();
                }
            };
            onNext();
        };

        local.normalizeParamDictSwagger = function (data, pathObject) {
        /*
         * this function will parse the data according to pathObject.parameters
         */
            var tmp;
            pathObject.parameters.forEach(function (paramDef) {
                tmp = data[paramDef.name];
                // init default value
                if (local.isNullOrUndefined(tmp) && paramDef.default !== undefined) {
                    tmp = local.jsonCopy(paramDef.default);
                }
                // parse array
                if (paramDef.type === 'array' && paramDef.in !== 'body') {
                    if (typeof tmp === 'string') {
                        switch (paramDef.collectionFormat) {
                        case 'json':
                            local.tryCatchOnError(function () {
                                tmp = JSON.parse(tmp);
                            }, local.nop);
                            data[paramDef.name] = tmp;
                            return;
                        case 'multi':
                            tmp = local.urlParse('?' + tmp, true).query[paramDef.name];
                            break;
                        case 'pipes':
                            tmp = tmp.split('|');
                            break;
                        case 'ssv':
                            tmp = tmp.split(' ');
                            break;
                        case 'tsv':
                            tmp = tmp.split('\t');
                            break;
                        // default to csv
                        default:
                            tmp = tmp.split(',');
                        }
                        if (paramDef.items && paramDef.items.type !== 'string') {
                            // try to JSON.parse the string
                            local.tryCatchOnError(function () {
                                tmp = tmp.map(function (element) {
                                    return JSON.parse(element);
                                });
                            }, local.nop);
                        }
                    }
                // JSON.parse paramDict
                } else if (paramDef.type !== 'file' &&
                        paramDef.type !== 'string' &&
                        (typeof tmp === 'string' || tmp instanceof local.global.Uint8Array)) {
                    // try to JSON.parse the string
                    local.tryCatchOnError(function () {
                        tmp = JSON.parse(local.bufferToString(tmp));
                    }, local.nop);
                }
                data[paramDef.name] = tmp;
            });
            return data;
        };

        local.onErrorJsonapi = function (onError) {
        /*
         * http://jsonapi.org/format/#errors
         * http://jsonapi.org/format/#document-structure-resource-objects
         * this function will normalize the error and data to jsonapi format,
         * and pass them to onError
         */
            return function (error, data, meta) {
                data = [error, data].map(function (data, ii) {
                    // if no error occurred, then return
                    if ((ii === 0 && !data) ||
                            // if data is already normalized, then return it
                            (data && data.meta && data.meta.isJsonapiResponse)) {
                        return data;
                    }
                    // normalize data-list
                    if (!Array.isArray(data)) {
                        data = [data];
                    }
                    // normalize error-list to contain non-null objects
                    if (ii === 0) {
                        // normalize error-list to be non-empty
                        if (!data.length) {
                            data.push(null);
                        }
                        data = data.map(function (element) {
                            if (!(element && typeof element === 'object')) {
                                element = { message: String(element) };
                            }
                            // normalize error-object to plain json-object
                            error = local.jsonCopy(element);
                            error.message = element.message;
                            error.stack = element.stack;
                            error.statusCode = Number(error.statusCode) || 500;
                            return error;
                        });
                        error = local.jsonCopy(data[0]);
                        error.errors = data;
                        return error;
                    }
                    return { data: data };
                });
                // init data.meta
                data.forEach(function (data, ii) {
                    if (!data) {
                        return;
                    }
                    data.meta = local.jsonCopy(meta || {});
                    data.meta.isJsonapiResponse = true;
                    if (ii === 0) {
                        data.meta.errorsLength = (data.errors && data.errors.length) | 0;
                    } else {
                        data.meta.dataLength = (data.data && data.data.length) | 0;
                    }
                    data.meta.statusCode = Number(data.meta.statusCode) ||
                        Number(data.statusCode) ||
                        0;
                });
                onError(data[0], data[1]);
            };
        };

        local.schemaNormalizeAndCopy = function (schema) {
        /*
         * this function will return a normalized copy the schema
         */
            var tmp;
            // dereference $ref
            if (schema.$ref) {
                [local.swaggerJson, local.swaggerSchemaJson].some(function (options) {
                    local.tryCatchOnError(function () {
                        schema.$ref.replace(
                            (/#\/(.*?)\/(.*?)$/),
                            function (match0, match1, match2) {
                                // jslint-hack - nop
                                local.nop(match0);
                                tmp = options[match1][match2];
                            }
                        );
                    }, local.nop);
                    return tmp;
                });
                // validate schema
                local.assert(tmp, schema.$ref);
                // recurse
                schema = local.schemaNormalizeAndCopy(tmp);
            }
            // inherit allOf
            if (schema.allOf) {
                tmp = local.jsonCopy(schema);
                delete tmp.allOf;
                schema.allOf.reverse().forEach(function (element) {
                    // recurse
                    local.objectSetDefault(tmp, local.schemaNormalizeAndCopy(element), 2);
                });
                schema = tmp;
            }
            schema = local.jsonCopy(schema);
            if (schema.type === 'object') {
                schema.properties = local.normalizeDict(schema.properties);
            }
            return schema;
        };

        local.serverRespondJsonapi = function (request, response, error, data, meta) {
        /*
         * http://jsonapi.org/format/#errors
         * http://jsonapi.org/format/#document-structure-resource-objects
         * this function will respond in jsonapi format
         */
            local.onErrorJsonapi(function (error, data) {
                local.serverRespondHeadSet(request, response, error && error.statusCode, {
                    'Content-Type': 'application/json; charset=UTF-8'
                });
                if (error) {
                    // debug statusCode / method / url
                    local.errorMessagePrepend(error, response.statusCode + ' ' +
                        request.method + ' ' + request.url + '\n');
                    // print error.stack to stderr
                    local.onErrorDefault(error);
                }
                data = error || data;
                data.meta.statusCode = response.statusCode =
                    data.meta.statusCode || response.statusCode;
                response.end(JSON.stringify(data));
            })(error, data, meta);
        };

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
                    return aa === options._idAlias
                        ? -1
                        : bb === options._idAlias
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
            options.iiPadding = 0;
            options.dbRowList = options.responseJson.data.map(function (dbRow, ii) {
                dbRow = { paramDict: dbRow };
                dbRow.colList = options.propDefList.map(function (propDef) {
                    propDef = local.jsonCopy(propDef);
                    propDef.valueEncoded = dbRow.paramDict[propDef.name];
                    if (propDef.valueEncoded === undefined) {
                        propDef.valueEncoded = '';
                    }
                    if (typeof propDef.valueEncoded !== 'string') {
                        propDef.valueEncoded = JSON.stringify(propDef.valueEncoded);
                    }
                    return propDef;
                });
                dbRow.id = dbRow.paramDict[options._idAlias];
                dbRow.ii = options.querySkip + ii + 1;
                options.iiPadding = Math.max(
                    0.375 * String(dbRow.ii).length,
                    options.iiPadding
                );
                return dbRow;
            });
            // init pagination
            options.pageCurrent = Math.floor(options.querySkip / options.queryLimit);
            options.pageTotal = Math.ceil(
                options.responseJson.meta.paginationCountTotal / options.queryLimit
            );
            options.pageMin = Math.max(
                Math.min(options.pageCurrent - 3, options.pageTotal - 7),
                0
            );
            options.pageMax = Math.min(options.pageMin + 7, options.pageTotal);
            options.pageList = [];
            // add first page
            options.pageList.push({
                disabled: options.pageCurrent === 0,
                pageNumber: 0,
                valueEncoded: 'first page'
            });
            for (tmp = options.pageMin; tmp < options.pageMax; tmp += 1) {
                options.pageList.push({
                    disabled: tmp === options.pageCurrent,
                    pageNumber: tmp,
                    valueEncoded: tmp + 1
                });
            }
            // add last page
            options.pageList.push({
                disabled: options.pageCurrent === options.pageTotal - 1,
                pageNumber: options.pageTotal - 1,
                valueEncoded: 'last page'
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
                Array.from(
                    element.querySelectorAll('.eventDelegate' + eventType)
                ).forEach(function (element) {
                    element.addEventListener(eventType.toLowerCase(), local.uiEventDelegate);
                });
            });
        };

        local.uiEventListenerDict = {};

        local.uiEventListenerDict['.onEventDatatableReload'] = function (event) {
        /*
         * this function will show the modal
         */
            var options;
            options = {};
            if (event) {
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
            options._idAlias = local.apiDict[options.crudRemoveOneById]._idAlias;
            options._idField = local.apiDict[options.crudRemoveOneById]._idField;
            local.objectSetDefault(options, { pageNumber: 0, queryLimit: 20 });
            options.querySkip = options.pageNumber * options.queryLimit;
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
                // emit event uiDatatableRendered
                document.dispatchEvent(new local.global.Event('uiDatatableRendered', {
                    bubbles: true,
                    cancelable: true
                }));
            });
        };

        local.uiEventListenerDict['.onEventDatatableSelectedRemove'] = function () {
            var onParallel;
            onParallel = local.onParallel(local.uiEventListenerDict['.onEventDatatableReload']);
            onParallel.counter += 1;
            Array.from(
                document.querySelectorAll('.swggUiContainer .datatable tr.selected')
            ).forEach(function (element) {
                onParallel.counter += 1;
                // remove data
                local.apiDict[
                    local.uiState.datatable.crudRemoveOneById
                ]._ajax(local.objectLiteralize({
                    paramDict: { '$[]': [
                        local.uiState.datatable._idField,
                        JSON.parse(decodeURIComponent(element.dataset.id))
                    ] }
                }), onParallel);
            });
            onParallel();
        };

        local.uiEventListenerDict['.onEventDatatableTrSelect'] = function (event) {
            if (event.target.tagName !== 'INPUT') {
                event.currentTarget.querySelector('input').checked =
                    !event.currentTarget.querySelector('input').checked;
            }
            Array.from(
                event.currentTarget.closest('tr').querySelectorAll('input')
            ).forEach(function (element) {
                element.checked = event.currentTarget.querySelector('input').checked;
            });
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
                                // parse file
                                if (tmp.type === 'file') {
                                    tmp = tmp.files && tmp.files[0];
                                    break;
                                }
                                tmp = tmp.value;
                                if (!tmp) {
                                    return;
                                }
                                // parse string
                                if (paramDef.type !== 'string') {
                                    tmp = JSON.parse(tmp);
                                }
                                break;
                            case 'SELECT':
                                tmp = Array.from(tmp.options)
                                    .filter(function (element) {
                                        return element.selected;
                                    })
                                    .map(function (element) {
                                        return JSON.parse(decodeURIComponent(
                                            element.dataset.valueDecoded
                                        ));
                                    });
                                if (!tmp.length || tmp[0] === '$swggUndefined') {
                                    return;
                                }
                                if (paramDef.type !== 'array') {
                                    tmp = tmp[0];
                                }
                                break;
                            case 'TEXTAREA':
                                tmp = tmp.value;
                                if (!tmp) {
                                    return;
                                }
                                // parse schema
                                if (paramDef.in === 'body') {
                                    tmp = JSON.parse(tmp);
                                    break;
                                }
                                // parse array
                                tmp = tmp.split('\n').map(function (element) {
                                    return paramDef.items.type === 'string'
                                        ? element
                                        : JSON.parse(element);
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
                    Array.from(
                        options.domOperationContent.querySelectorAll('.paramDef .input')
                    ).forEach(function (element) {
                        element.classList.remove('error');
                    });
                    if (options.errorValidate) {
                        // shake input on Error
                        Array.from(options.domOperationContent.querySelectorAll(
                            '.paramDef[name=' + options.errorValidate.options.key + '] .input'
                        )).forEach(function (element) {
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
                            local.base64FromBuffer(data.response) +
                            '" type="' + data.contentType + '"></' +
                            data.contentType.split('/')[0] + '>';
                        break;
                    case 'image':
                        data.responseBody = '<img src="data:' + data.contentType + ';base64,' +
                            local.base64FromBuffer(data.response) + '">';
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
                Array.from(
                    tmp.closest('.operationList').querySelectorAll('.operation > .content')
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
                        Array.from(document.querySelectorAll('.swggUiContainer .operationList'))
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
                        Array.from(
                            event.currentTarget.querySelectorAll('.operation > .content')
                        ).forEach(function (element) {
                            local.uiAnimateSlideUp(element);
                        });
                    // expand all operations in the resource
                    } else {
                        event.currentTarget.classList.add('expanded');
                        Array.from(
                            event.currentTarget.querySelectorAll('.operation > .content')
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
            Array.from(
                document.querySelectorAll('.swggUiContainer > .reset')
            ).forEach(function (element) {
                element.remove();
            });
            // normalize url
            document.querySelector('.swggUiContainer > .header > .td2').value =
                local.urlParse(
                    document.querySelector('.swggUiContainer > .header > .td2').value
                        .replace((/^\//), '')
                ).href;
            // display .swggAjaxProgressDiv
            document.querySelector('.swggAjaxProgressDiv').textContent =
                'fetching resource list: ' +
                document.querySelector('.swggUiContainer > .header > .td2').value +
                '; Please wait.';
            document.querySelector('.swggAjaxProgressDiv').style.display = 'block';
            local.ajax({
                url: document.querySelector('.swggUiContainer > .header > .td2').value
            }, function (error, xhr) {
                // hide .swggAjaxProgressDiv
                document.querySelector('.swggAjaxProgressDiv').style.display = 'none';
                // validate no error occurred
                local.assert(!error, error);
                // reset state
                local.apiDict = local.swaggerJson = null;
                local.apiDictUpdate(local.objectSetDefault(JSON.parse(xhr.responseText), {
                    host: local.urlParse(
                        document.querySelector('.swggUiContainer > .header > .td2').value
                    ).host
                }));
                local.uiRender();
            });
        };

        local.uiParamRender = function (paramDef) {
        /*
         * this function will render the param
         */
            paramDef.placeholder = paramDef.required
                ? '(required)'
                : '';
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
                        type: (paramDef.items && paramDef.items.type) || paramDef.type,
                        valueDecoded: element,
                        valueEncoded: typeof element === 'string'
                            ? element
                            : JSON.stringify(element)
                    };
                });
                // init 'undefined' value
                if (!(paramDef.hasDefault ||
                        paramDef.isSelectMultiple ||
                        paramDef.required)) {
                    paramDef.selectOptionList.unshift({
                        id: local.idDomElementCreate('swgg_id_' + paramDef.name),
                        selected: 'selected',
                        type: paramDef.type,
                        valueDecoded: '$swggUndefined',
                        valueEncoded: '<none>'
                    });
                }
                // if required, then select at least one value
                if (paramDef.required && paramDef.selectOptionList.length) {
                    paramDef.selected = paramDef.selectOptionList[0];
                    paramDef.selectOptionList.some(function (element) {
                        if (element.selected) {
                            paramDef.selected = element.selected;
                            return true;
                        }
                    });
                    paramDef.selected = 'selected';
                }
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
                paramDef.schema2 = local.schemaNormalizeAndCopy(element || {}).properties;
                return paramDef.schema2;
            });
            if (paramDef.schema2) {
                paramDef.schemaText = JSON.stringify(paramDef.type2 === 'array'
                    ? [paramDef.schema2]
                    : paramDef.schema2, null, 4);
            }
            // init valueEncoded
            paramDef.valueEncoded = paramDef.default;
            if (paramDef.valueEncoded === undefined) {
                paramDef.valueEncoded = local.dbFieldRandomCreate({
                    modeNotRandom: true,
                    propDef: paramDef
                });
            }
            // init valueEncoded for array
            if (paramDef.valueEncoded && paramDef.type2 === 'array' && paramDef.in !== 'body') {
                paramDef.valueEncoded = paramDef.valueEncoded.map(function (element) {
                    return typeof element === 'string'
                        ? element
                        : JSON.stringify(element);
                }).join('\n');
            }
            // init valueEncoded for schema
            if (paramDef.in === 'body' && paramDef.schema2) {
                paramDef.valueEncoded = local.dbRowRandomCreate({
                    modeNotRandom: true,
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
                    paramDef.valueEncoded = [paramDef.valueEncoded];
                }
                paramDef.valueEncoded = JSON.stringify(paramDef.valueEncoded, null, 4);
            }
            if (typeof paramDef.valueEncoded !== 'string') {
                paramDef.valueEncoded = JSON.stringify(paramDef.valueEncoded) || '';
            }
            // templateRender paramDef
            paramDef.innerHTML = local.templateRender(local.templateUiParam, paramDef);
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
                operation.tags.forEach(function (tag) {
                    self.operationDict[operation._keyOperationId] = operation;
                    // init resource
                    resource = self.resourceDict[tag];
                    if (!resource && self.tagDict[tag]) {
                        resource = self.resourceDict[tag] = self.tagDict[tag];
                        local.objectSetDefault(resource, {
                            description: 'no description available',
                            id: local.idDomElementCreate('swgg_id_' + tag),
                            name: tag,
                            operationListInnerHtml: ''
                        });
                    }
                });
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
                operation.tags.forEach(function (tag) {
                    operation = local.jsonCopy(operation);
                    resource = self.resourceDict[tag];
                    local.objectSetDefault(operation, {
                        description: '',
                        responseList: Object.keys(operation.responses).sort()
                            .map(function (key) {
                                return { key: key, value: operation.responses[key] };
                            }),
                        summary: 'no summary available'
                    });
                    operation.parameters.forEach(function (element) {
                        // init element.id
                        element.id = local.idDomElementCreate('swgg_id_' + element.name);
                        local.uiParamRender(element);
                    });
                    // templateRender operation
                    self.uiFragment.querySelector('#' + resource.id + ' .operationList')
                        .appendChild(
                            local.domFragmentRender(local.templateUiOperation, operation)
                        );
                });
            });
            // overwrite swggUiContainer with uiFragment
            document.querySelector('.swggUiContainer').innerHTML = '';
            document.querySelector('.swggUiContainer').appendChild(self.uiFragment);
            /* istanbul ignore next */
            // bug-workaround - add keypress listener for <form2>
            document.querySelector('form2').addEventListener('keypress', function (event) {
                if (event.keyCode === 13) {
                    local.uiEventListenerDict['.onEventUiReload']();
                }
            });
            // render valueEncoded
            Array.from(
                document.querySelectorAll('.swggUiContainer [data-value-encoded]')
            ).forEach(function (element) {
                element.value = decodeURIComponent(element.dataset.valueEncoded);
            });
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

        local.urlBaseGet = function () {
        /*
         * this function will return the base swagger url
         */
            return (local.swaggerJson.schemes ||
                local.urlParse('').protocol.slice(0, -1)) + '://' +
                (local.swaggerJson.host || local.urlParse('').host) +
                local.swaggerJson.basePath;
        };

        local.userLoginByPassword = function (options, onError) {
        /*
         * this function will send a login-by-password request
         */
            local.apiDict["GET /user/userLoginByPassword"]._ajax({
                paramDict: { password: options.password, username: options.username }
            }, onError);
        };

        local.userLogout = function (options, onError) {
        /*
         * this function will send a logout request
         */
            local.apiDict["GET /user/userLogout"]._ajax(options, onError);
        };

        local.utility2._middlewareError = function (error, request, response) {
        /*
         * this function will run the middleware that will
         * handle errors according to http://jsonapi.org/format/#errors
         */
            if (!error) {
                error = new Error('404 Not Found');
                error.statusCode = 404;
            }
            local.serverRespondJsonapi(request, response, error);
        };

        local.utility2._stateInit = function (options) {
        /*
         * this function will init the state-options
         */
            local.objectSetOverride(local, options, 10);
            // init api
            local.apiDictUpdate(local.swaggerJson);
        };

        local.validateByParamDefList = function (options) {
        /*
         * this function will validate options.data against options.paramDefList
         */
            var data, key;
            local.tryCatchOnError(function () {
                data = options.data;
                // validate data
                local.assert(data && typeof data === 'object', data);
                (options.paramDefList || []).forEach(function (paramDef) {
                    key = paramDef.name;
                    // recurse - validateByPropDef
                    local.validateByPropDef({
                        circularList: options.circularList,
                        data: data[key],
                        dataReadonlyRemove: (options.dataReadonlyRemove || {})[key],
                        key: key,
                        schema: paramDef,
                        required: paramDef.required,
                        'x-swgg-notRequired': paramDef['x-swgg-notRequired']
                    });
                });
            }, function (error) {
                error.statusCode = error.statusCode || 400;
                local.errorMessagePrepend(error, options.key + '.' + key + ' -> ');
                throw error;
            });
        };

        local.validateByPropDef = function (options) {
        /*
         * this function will validate options.data against options.schema
         */
            var data, prefix, propDef, tmp;
            local.tryCatchOnError(function () {
                data = options.data;
                prefix = 'property ' + options.key;
                propDef = options.schema;
                // validate undefined data
                if (local.isNullOrUndefined(data)) {
                    if (options.required && !options['x-swgg-notRequired']) {
                        tmp = new Error(prefix + ' cannot be null or undefined');
                        tmp.options = options;
                        throw tmp;
                    }
                    return;
                }
                // handle $ref
                tmp = propDef.$ref || (propDef.schema && propDef.schema.$ref);
                if (tmp) {
                    // recurse - validateBySchema
                    local.validateBySchema({
                        circularList: options.circularList,
                        data: data,
                        dataReadonlyRemove: options.dataReadonlyRemove,
                        key: tmp,
                        schema: local.schemaNormalizeAndCopy({ $ref: tmp }),
                        'x-swgg-notRequired': options['x-swgg-notRequired']
                    });
                    return;
                }
                // handle anyOf
                if (propDef.anyOf) {
                    tmp = propDef.anyOf.some(function (element) {
                        local.tryCatchOnError(function () {
                            // recurse - validateBySchema
                            local.validateBySchema({
                                circularList: options.circularList,
                                data: data,
                                key: 'anyOf',
                                schema: local.schemaNormalizeAndCopy(element),
                                'x-swgg-notRequired': options['x-swgg-notRequired']
                            });
                        }, local.nop);
                        return !local.utility2._debugTryCatchErrorCaught;
                    });
                    local.assert(tmp, local.utility2._debugTryCatchErrorCaught);
                    return;
                }
                // normalize propDef
                propDef = local.schemaNormalizeAndCopy(options.schema);
                // init circularList
                if (data && typeof data === 'object') {
                    options.circularList = options.circularList || [];
                    if (options.circularList.indexOf(data) >= 0) {
                        return;
                    }
                    options.circularList.push(data);
                }
                // validate propDef embedded in propDef.schema.type
                if (!propDef.type && propDef.schema && propDef.schema.type) {
                    propDef = propDef.schema;
                }
                // http://json-schema.org/latest/json-schema-validation.html#anchor13
                // 5.1.  Validation keywords for numeric instances (number and integer)
                if (typeof data === 'number') {
                    if (typeof propDef.multipleOf === 'number') {
                        local.assert(
                            data % propDef.multipleOf === 0,
                            prefix + ' must be a multiple of ' + propDef.multipleOf
                        );
                    }
                    if (typeof propDef.maximum === 'number') {
                        local.assert(
                            propDef.exclusiveMaximum
                                ? data < propDef.maximum
                                : data <= propDef.maximum,
                            prefix + ' must be ' + (propDef.exclusiveMaximum
                                ? '< '
                                : '<= ') + propDef.maximum
                        );
                    }
                    if (typeof propDef.minimum === 'number') {
                        local.assert(
                            propDef.exclusiveMinimum
                                ? data > propDef.minimum
                                : data >= propDef.minimum,
                            prefix + ' must be ' + (propDef.exclusiveMinimum
                                ? '> '
                                : '>= ') + propDef.minimum
                        );
                    }
                // http://json-schema.org/latest/json-schema-validation.html#anchor25
                // 5.2.  Validation keywords for strings
                } else if (typeof data === 'string') {
                    if (propDef.maxLength) {
                        local.assert(
                            data.length <= propDef.maxLength,
                            prefix + ' must have <= ' + propDef.maxLength + ' characters'
                        );
                    }
                    if (propDef.minLength) {
                        local.assert(
                            data.length >= propDef.minLength,
                            prefix + ' must have >= ' + propDef.minLength + ' characters'
                        );
                    }
                    if (propDef.pattern) {
                        local.assert(
                            new RegExp(propDef.pattern).test(data),
                            prefix + ' must match regex pattern /' + propDef.pattern + '/'
                        );
                    }
                // http://json-schema.org/latest/json-schema-validation.html#anchor36
                // 5.3.  Validation keywords for arrays
                } else if (Array.isArray(data)) {
                    if (propDef.maxItems) {
                        local.assert(
                            data.length <= propDef.maxItems,
                            prefix + ' must have <= ' + propDef.maxItems + ' items'
                        );
                    }
                    if (propDef.minItems) {
                        local.assert(
                            data.length >= propDef.minItems,
                            prefix + ' must have >= ' + propDef.minItems + ' items'
                        );
                    }
                    if (propDef.uniqueItems) {
                        tmp = {};
                        data.forEach(function (element) {
                            element = JSON.stringify(element);
                            local.assert(
                                !tmp[element],
                                prefix + ' must have only unique items'
                            );
                            tmp[element] = true;
                        });
                    }
                // http://json-schema.org/latest/json-schema-validation.html#anchor53
                // 5.4.  Validation keywords for objects
                } else if (typeof data === 'object') {
                    if (propDef.maxProperties) {
                        local.assert(
                            Object.keys(data).length <= propDef.maxProperties,
                            prefix + ' must have <= ' + propDef.maxProperties + ' items'
                        );
                    }
                    if (propDef.minProperties) {
                        local.assert(
                            Object.keys(data).length >= propDef.minProperties,
                            prefix + ' must have >= ' + propDef.minProperties + ' items'
                        );
                    }
                }
                // http://json-schema.org/latest/json-schema-validation.html#anchor75
                // 5.5.  Validation keywords for any instance type
                if (propDef.enum) {
                    (Array.isArray(data)
                        ? data
                        : [data]).forEach(function (element) {
                        local.assert(
                            propDef.enum.indexOf(element) >= 0,
                            prefix + ' must only have items in the list ' +
                                JSON.stringify(propDef.enum)
                        );
                    });
                }
                // https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
                // #data-types
                // validate schema.type
                switch (propDef.type) {
                case 'array':
                    local.assert(Array.isArray(data) && propDef.items);
                    data.forEach(function (element, ii) {
                        // recurse - validateByPropDef
                        local.validateByPropDef({
                            circularList: options.circularList,
                            data: element,
                            dataReadonlyRemove: (options.dataReadonlyRemove || {})[ii],
                            key: ii,
                            schema: propDef.items,
                            'x-swgg-notRequired': options['x-swgg-notRequired']
                        });
                    });
                    switch (propDef.collectionFormat) {
                    case 'multi':
                        local.assert(
                            propDef.in === 'formData' || propDef.in === 'query',
                            prefix + ' with collectionFormat "multi" ' +
                                'is valid only for parameters in "query" or "formData"'
                        );
                        break;
                    }
                    break;
                case 'boolean':
                    local.assert(typeof data === 'boolean');
                    break;
                case 'file':
                    break;
                case 'integer':
                    local.assert(typeof data === 'number' &&
                        isFinite(data) &&
                        Math.floor(data) === data);
                    switch (propDef.format) {
                    case 'int32':
                    case 'int64':
                        break;
                    }
                    break;
                case 'number':
                    local.assert(typeof data === 'number' && isFinite(data));
                    switch (propDef.format) {
                    case 'double':
                    case 'float':
                        break;
                    }
                    break;
                case 'object':
                    local.assert(typeof data === 'object');
                    break;
                case 'string':
                    local.assert(typeof data === 'string' || propDef.format === 'binary');
                    switch (propDef.format) {
                    // https://github.com/swagger-api/swagger-spec/issues/50
                    // Clarify 'byte' format #50
                    case 'byte':
                        local.assert(!(/[^\n\r\+\/0-9\=A-Za-z]/).test(data));
                        break;
                    case 'date':
                    case 'date-time':
                        local.assert(JSON.stringify(new Date(data)) !== 'null');
                        break;
                    case 'email':
                        local.assert(local.regexpEmailValidate.test(data));
                        break;
                    case 'phone':
                        local.assert(local.regexpPhoneValidate.test(data));
                        break;
                    case 'json':
                        JSON.parse(data);
                        break;
                    }
                    break;
                default:
                    local.assert(
                        propDef.type === undefined,
                        prefix + ' has invalid type ' + propDef.type
                    );
                }
            }, function (error) {
                error.message = error.message || prefix + ' is not a valid ' + propDef.type +
                    (propDef.format
                    ? ' (' + propDef.format + ')'
                    : '');
                error.options = options;
                throw error;
            });
        };

        local.validateBySchema = function (options) {
        /*
         * this function will validate options.data against options.schema
         */
            var data, key, prefix, propDefDict, schema, tmp, validateByPropDef;
            // recurse - validateByPropDef
            local.validateByPropDef(options);
            local.tryCatchOnError(function () {
                data = options.data;
                prefix = 'schema ' + options.key;
                schema = options.schema;
                // validate schema
                local.assert(
                    schema && typeof schema === 'object',
                    prefix + ' must be an object (not ' + typeof schema + ')'
                );
                // init propDefDict
                propDefDict = schema.properties || {};
                // validate data
                local.assert(
                    (data && typeof data === 'object') || !Object.keys(propDefDict).length,
                    'data for ' + prefix + ' must be an object (not ' + typeof data + ')'
                );
                if (typeof data !== 'object') {
                    return;
                }
                validateByPropDef = function (propDef) {
                    // remove options.dataReadonlyRemove[key]
                    if (propDef.readOnly &&
                            (options.dataReadonlyRemove || {}).hasOwnProperty(key)) {
                        delete options.dataReadonlyRemove[key];
                    }
                    // recurse - validateByPropDef
                    local.validateByPropDef({
                        circularList: options.circularList,
                        data: data[key],
                        dataReadonlyRemove: (options.dataReadonlyRemove || {})[key],
                        key: key,
                        schema: propDef,
                        required: schema.required && schema.required.indexOf(key) >= 0,
                        'x-swgg-notRequired': options['x-swgg-notRequired']
                    });
                };
                Object.keys(propDefDict).forEach(function (_) {
                    key = _;
                    validateByPropDef(propDefDict[key]);
                });
                Object.keys(data).forEach(function (_) {
                    key = _;
                    if (propDefDict[key]) {
                        return;
                    }
                    tmp = Object.keys(schema.patternProperties || {}).some(function (_) {
                        if (new RegExp(_).test(key)) {
                            validateByPropDef(schema.patternProperties[_]);
                            return true;
                        }
                    });
                    if (tmp) {
                        return;
                    }
                    // https://tools.ietf.org/html/draft-fge-json-schema-validation-00
                    // #section-5.4.4
                    // validate additionalProperties
                    local.assert(
                        schema.additionalProperties !== false,
                        prefix + ' must not have additionalProperties - ' + key
                    );
                    if (schema.additionalProperties) {
                        validateByPropDef(schema.additionalProperties);
                    }
                });
            }, function (error) {
                local.errorMessagePrepend(error, options.key + '.' + key + ' -> ');
                throw error;
            });
        };

        local.validateBySwagger = function (options) {
        /*
         * this function will validate the entire swagger json object
         */
            var key, schema, tmp, validateDefault;
            local.validateBySchema({
                data: options,
                key: 'swaggerJson',
                schema: local.swaggerSchemaJson
            });
            // validate default
            validateDefault = function () {
                if (schema.default !== undefined) {
                    return;
                }
                local.validateByPropDef({
                    data: schema.default,
                    key: key + '.default',
                    schema: schema
                });
            };
            Object.keys(options.definitions).forEach(function (schemaName) {
                schema = options.definitions[schemaName];
                key = schemaName;
                validateDefault();
                Object.keys(options.definitions[schemaName].properties || {
                }).forEach(function (propName) {
                    schema = options.definitions[schemaName].properties[propName];
                    key = schemaName + '.' + propName;
                    validateDefault();
                });
            });
            Object.keys(options.paths).forEach(function (pathName) {
                Object.keys(options.paths[pathName]).forEach(function (methodName) {
                    tmp = options.paths[pathName][methodName];
                    Object.keys(tmp.parameters).forEach(function (paramName) {
                        schema = tmp.parameters[paramName];
                        key = tmp.tags[0] + '.' + tmp.operationId + '.' + paramName;
                        validateDefault();
                    });
                });
            });
        };
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        // init state
        local.utility2._stateInit({});
        break;



    // run node js-env code - post-init
    case 'node':
        // init assets.lib.rollup.js
        local.assetsDict['/assets.swgg.rollup.js'] =
            local.assetsDict['/assets.utility2.rollup.js'];
        // init state
        local.utility2._stateInit({});
        break;
    }
    switch (local.modeJs) {



    /* istanbul ignore next */
    // run node js-env code - cli
    case 'node':
        /* istanbul ignore next */
        if (local.env.SWAGGER_JSON_URL) {
            if (local.env.SWAGGER_JSON_URL === '127.0.0.1') {
                local.env.SWAGGER_JSON_URL = '/assets.swgg.petstore.json';
            }
            local.assetsDict['/assets.swgg.html'] =
                local.assetsDict['/assets.swgg.html'].replace(
                    'assets.swgg.petstore.json',
                    local.env.SWAGGER_JSON_URL
                );
        }
        // run the cli
        switch (process.argv[2]) {
        case 'swagger-ui':
            local.replStart();
            local.global.local = local;
            local.assetsDict['/'] = local.assetsDict['/assets.swgg.html'];
            local.testRunServer({});
            break;
        }
        break;
    }
}());
