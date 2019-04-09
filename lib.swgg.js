#!/usr/bin/env node
/*
 * lib.swgg.js (2019.2.20)
 * https://github.com/kaizhu256/node-swgg
 * this zero-dependency package will run a virtual swagger-ui server with persistent-storage in the browser, that your webapp can use (in-place of a real backend), with a working web-demo
 *
 */



/* istanbul instrument in package swgg */
/* istanbul ignore next */
/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    var consoleError;
    var local;
    // init globalThis
    (function () {
        try {
            globalThis = Function("return this")(); // jslint ignore:line
        } catch (ignore) {}
    }());
    globalThis.globalThis = globalThis;
    // init debug_inline
    if (!globalThis["debug\u0049nline"]) {
        consoleError = console.error;
        globalThis["debug\u0049nline"] = function () {
        /*
         * this function will both print <arguments> to stderr
         * and return <arguments>[0]
         */
            var argList;
            argList = Array.from(arguments); // jslint ignore:line
            // debug arguments
            globalThis["debug\u0049nlineArguments"] = argList;
            consoleError("\n\ndebug\u0049nline");
            consoleError.apply(console, argList);
            consoleError("\n");
            // return arg0 for inspection
            return argList[0];
        };
    }
    // init local
    local = {};
    local.local = local;
    globalThis.globalLocal = local;
    // init isBrowser
    local.isBrowser = (
        typeof window === "object"
        && window === globalThis
        && typeof window.XMLHttpRequest === "function"
        && window.document
        && typeof window.document.querySelector === "function"
    );
    // init function
    local.assertThrow = function (passed, message) {
    /*
     * this function will throw error-<message> if <passed> is falsy
     */
        var err;
        if (passed) {
            return;
        }
        err = (
            // ternary-condition
            (
                message
                && typeof message.message === "string"
                && typeof message.stack === "string"
            )
            // if message is error-object, then leave as is
            ? message
            : new Error(
                typeof message === "string"
                // if message is a string, then leave as is
                ? message
                // else JSON.stringify message
                : JSON.stringify(message, null, 4)
            )
        );
        throw err;
    };
    local.functionOrNop = function (fnc) {
    /*
     * this function will if <fnc> exists,
     * them return <fnc>,
     * else return <nop>
     */
        return fnc || local.nop;
    };
    local.identity = function (value) {
    /*
     * this function will return <value>
     */
        return value;
    };
    local.nop = function () {
    /*
     * this function will do nothing
     */
        return;
    };
    local.objectAssignDefault = function (target, source) {
    /*
     * this function will if items from <target> are
     * null, undefined, or empty-string,
     * then overwrite them with items from <source>
     */
        target = target || {};
        Object.keys(source || {}).forEach(function (key) {
            if (
                target[key] === null
                || target[key] === undefined
                || target[key] === ""
            ) {
                target[key] = target[key] || source[key];
            }
        });
        return target;
    };
    // require builtin
    if (!local.isBrowser) {
        local.assert = require("assert");
        local.buffer = require("buffer");
        local.child_process = require("child_process");
        local.cluster = require("cluster");
        local.crypto = require("crypto");
        local.dgram = require("dgram");
        local.dns = require("dns");
        local.domain = require("domain");
        local.events = require("events");
        local.fs = require("fs");
        local.http = require("http");
        local.https = require("https");
        local.net = require("net");
        local.os = require("os");
        local.path = require("path");
        local.querystring = require("querystring");
        local.readline = require("readline");
        local.repl = require("repl");
        local.stream = require("stream");
        local.string_decoder = require("string_decoder");
        local.timers = require("timers");
        local.tls = require("tls");
        local.tty = require("tty");
        local.url = require("url");
        local.util = require("util");
        local.vm = require("vm");
        local.zlib = require("zlib");
    }
}(this));



(function (local) {
"use strict";



/* istanbul ignore next */
// run shared js-env code - init-before
(function () {
// init local
local = (
    globalThis.utility2_rollup
    // || globalThis.utility2_rollup_old
    // || require("./assets.utility2.rollup.js")
    || globalThis.globalLocal
);
// init exports
if (local.isBrowser) {
    globalThis.utility2_swgg = local;
} else {
    module.exports = local;
    module.exports.__dirname = __dirname;
}
// init lib main
local.swgg = local;



/* validateLineSortedReset */
// init lib utility2
local.utility2 = globalThis.utility2_rollup || (
    local.isBrowser
    ? globalThis.utility2
    : (function () {
        try {
            return require("./lib.utility2.js");
        } catch (ignore) {
            return require("./assets.utility2.rollup.js");
        }
    }())
);
local.utility2.objectSetDefault(local, local.utility2);
// init lib swgg
globalThis.swgg = local;
local.utility2.swgg = local;
/* validateLineSortedReset */
// init assets and templates
// https://github.com/json-schema-org/json-schema-org.github.io/blob/eb4805e94c3e27932352344767d19cc4c3c3381c/draft-04/schema
/* jslint ignore:start */
// curl -Ls https://raw.githubusercontent.com/json-schema-org/json-schema-org.github.io/eb4805e94c3e27932352344767d19cc4c3c3381c/draft-04/schema > /tmp/aa.json; node -e "console.log(JSON.stringify(require('/tmp/aa.json')));"
local.assetsDict["/assets.swgg.json-schema.json"] = JSON.stringify(
{"id":"http://json-schema.org/draft-04/schema#","$schema":"http://json-schema.org/draft-04/schema#","description":"Core schema meta-schema","definitions":{"schemaArray":{"type":"array","minItems":1,"items":{"$ref":"#"}},"positiveInteger":{"type":"integer","minimum":0},"positiveIntegerDefault0":{"allOf":[{"$ref":"#/definitions/positiveInteger"},{"default":0}]},"simpleTypes":{"enum":["array","boolean","integer","null","number","object","string"]},"stringArray":{"type":"array","items":{"type":"string"},"minItems":1,"uniqueItems":true}},"type":"object","properties":{"id":{"type":"string","format":"uri"},"$schema":{"type":"string","format":"uri"},"title":{"type":"string"},"description":{"type":"string"},"default":{},"multipleOf":{"type":"number","minimum":0,"exclusiveMinimum":true},"maximum":{"type":"number"},"exclusiveMaximum":{"type":"boolean","default":false},"minimum":{"type":"number"},"exclusiveMinimum":{"type":"boolean","default":false},"maxLength":{"$ref":"#/definitions/positiveInteger"},"minLength":{"$ref":"#/definitions/positiveIntegerDefault0"},"pattern":{"type":"string","format":"regex"},"additionalItems":{"anyOf":[{"type":"boolean"},{"$ref":"#"}],"default":{}},"items":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/schemaArray"}],"default":{}},"maxItems":{"$ref":"#/definitions/positiveInteger"},"minItems":{"$ref":"#/definitions/positiveIntegerDefault0"},"uniqueItems":{"type":"boolean","default":false},"maxProperties":{"$ref":"#/definitions/positiveInteger"},"minProperties":{"$ref":"#/definitions/positiveIntegerDefault0"},"required":{"$ref":"#/definitions/stringArray"},"additionalProperties":{"anyOf":[{"type":"boolean"},{"$ref":"#"}],"default":{}},"definitions":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"properties":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"patternProperties":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"dependencies":{"type":"object","additionalProperties":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/stringArray"}]}},"enum":{"type":"array","minItems":1,"uniqueItems":true},"type":{"anyOf":[{"$ref":"#/definitions/simpleTypes"},{"type":"array","items":{"$ref":"#/definitions/simpleTypes"},"minItems":1,"uniqueItems":true}]},"allOf":{"$ref":"#/definitions/schemaArray"},"anyOf":{"$ref":"#/definitions/schemaArray"},"oneOf":{"$ref":"#/definitions/schemaArray"},"not":{"$ref":"#"}},"dependencies":{"exclusiveMaximum":["maximum"],"exclusiveMinimum":["minimum"]},"default":{}}
);



// https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/schemas/v2.0/schema.json
// curl -Ls https://raw.githubusercontent.com/OAI/OpenAPI-Specification/3.0.0/schemas/v2.0/schema.json > /tmp/aa.json; node -e "console.log(JSON.stringify(require('/tmp/aa.json')));"
local.assetsDict["/assets.swgg.schema.json"] = JSON.stringify(
{"title":"A JSON Schema for Swagger 2.0 API.","id":"http://swagger.io/v2/schema.json#","$schema":"http://json-schema.org/draft-04/schema#","type":"object","required":["swagger","info","paths"],"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"swagger":{"type":"string","enum":["2.0"],"description":"The Swagger version of this document."},"info":{"$ref":"#/definitions/info"},"host":{"type":"string","pattern":"^[^{}/ :\\\\]+(?::\\d+)?$","description":"The host (name or ip) of the API. Example: 'swagger.io'"},"basePath":{"type":"string","pattern":"^/","description":"The base path to the API. Example: '/api'."},"schemes":{"$ref":"#/definitions/schemesList"},"consumes":{"description":"A list of MIME types accepted by the API.","allOf":[{"$ref":"#/definitions/mediaTypeList"}]},"produces":{"description":"A list of MIME types the API can produce.","allOf":[{"$ref":"#/definitions/mediaTypeList"}]},"paths":{"$ref":"#/definitions/paths"},"definitions":{"$ref":"#/definitions/definitions"},"parameters":{"$ref":"#/definitions/parameterDefinitions"},"responses":{"$ref":"#/definitions/responseDefinitions"},"security":{"$ref":"#/definitions/security"},"securityDefinitions":{"$ref":"#/definitions/securityDefinitions"},"tags":{"type":"array","items":{"$ref":"#/definitions/tag"},"uniqueItems":true},"externalDocs":{"$ref":"#/definitions/externalDocs"}},"definitions":{"info":{"type":"object","description":"General information about the API.","required":["version","title"],"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"title":{"type":"string","description":"A unique and precise title of the API."},"version":{"type":"string","description":"A semantic version number of the API."},"description":{"type":"string","description":"A longer description of the API. Should be different from the title.  GitHub Flavored Markdown is allowed."},"termsOfService":{"type":"string","description":"The terms of service for the API."},"contact":{"$ref":"#/definitions/contact"},"license":{"$ref":"#/definitions/license"}}},"contact":{"type":"object","description":"Contact information for the owners of the API.","additionalProperties":false,"properties":{"name":{"type":"string","description":"The identifying name of the contact person/organization."},"url":{"type":"string","description":"The URL pointing to the contact information.","format":"uri"},"email":{"type":"string","description":"The email address of the contact person/organization.","format":"email"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"license":{"type":"object","required":["name"],"additionalProperties":false,"properties":{"name":{"type":"string","description":"The name of the license type. It's encouraged to use an OSI compatible license."},"url":{"type":"string","description":"The URL pointing to the license.","format":"uri"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"paths":{"type":"object","description":"Relative paths to the individual endpoints. They must be relative to the 'basePath'.","patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"},"^/":{"$ref":"#/definitions/pathItem"}},"additionalProperties":false},"definitions":{"type":"object","additionalProperties":{"$ref":"#/definitions/schema"},"description":"One or more JSON objects describing the schemas being consumed and produced by the API."},"parameterDefinitions":{"type":"object","additionalProperties":{"$ref":"#/definitions/parameter"},"description":"One or more JSON representations for parameters"},"responseDefinitions":{"type":"object","additionalProperties":{"$ref":"#/definitions/response"},"description":"One or more JSON representations for parameters"},"externalDocs":{"type":"object","additionalProperties":false,"description":"information about external documentation","required":["url"],"properties":{"description":{"type":"string"},"url":{"type":"string","format":"uri"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"examples":{"type":"object","additionalProperties":true},"mimeType":{"type":"string","description":"The MIME type of the HTTP message."},"operation":{"type":"object","required":["responses"],"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"tags":{"type":"array","items":{"type":"string"},"uniqueItems":true},"summary":{"type":"string","description":"A brief summary of the operation."},"description":{"type":"string","description":"A longer description of the operation, GitHub Flavored Markdown is allowed."},"externalDocs":{"$ref":"#/definitions/externalDocs"},"operationId":{"type":"string","description":"A unique identifier of the operation."},"produces":{"description":"A list of MIME types the API can produce.","allOf":[{"$ref":"#/definitions/mediaTypeList"}]},"consumes":{"description":"A list of MIME types the API can consume.","allOf":[{"$ref":"#/definitions/mediaTypeList"}]},"parameters":{"$ref":"#/definitions/parametersList"},"responses":{"$ref":"#/definitions/responses"},"schemes":{"$ref":"#/definitions/schemesList"},"deprecated":{"type":"boolean","default":false},"security":{"$ref":"#/definitions/security"}}},"pathItem":{"type":"object","additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"$ref":{"type":"string"},"get":{"$ref":"#/definitions/operation"},"put":{"$ref":"#/definitions/operation"},"post":{"$ref":"#/definitions/operation"},"delete":{"$ref":"#/definitions/operation"},"options":{"$ref":"#/definitions/operation"},"head":{"$ref":"#/definitions/operation"},"patch":{"$ref":"#/definitions/operation"},"parameters":{"$ref":"#/definitions/parametersList"}}},"responses":{"type":"object","description":"Response objects names can either be any valid HTTP status code or 'default'.","minProperties":1,"additionalProperties":false,"patternProperties":{"^([0-9]{3})$|^(default)$":{"$ref":"#/definitions/responseValue"},"^x-":{"$ref":"#/definitions/vendorExtension"}},"not":{"type":"object","additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}}},"responseValue":{"oneOf":[{"$ref":"#/definitions/response"},{"$ref":"#/definitions/jsonReference"}]},"response":{"type":"object","required":["description"],"properties":{"description":{"type":"string"},"schema":{"oneOf":[{"$ref":"#/definitions/schema"},{"$ref":"#/definitions/fileSchema"}]},"headers":{"$ref":"#/definitions/headers"},"examples":{"$ref":"#/definitions/examples"}},"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"headers":{"type":"object","additionalProperties":{"$ref":"#/definitions/header"}},"header":{"type":"object","additionalProperties":false,"required":["type"],"properties":{"type":{"type":"string","enum":["string","number","integer","boolean","array"]},"format":{"type":"string"},"items":{"$ref":"#/definitions/primitivesItems"},"collectionFormat":{"$ref":"#/definitions/collectionFormat"},"default":{"$ref":"#/definitions/default"},"maximum":{"$ref":"#/definitions/maximum"},"exclusiveMaximum":{"$ref":"#/definitions/exclusiveMaximum"},"minimum":{"$ref":"#/definitions/minimum"},"exclusiveMinimum":{"$ref":"#/definitions/exclusiveMinimum"},"maxLength":{"$ref":"#/definitions/maxLength"},"minLength":{"$ref":"#/definitions/minLength"},"pattern":{"$ref":"#/definitions/pattern"},"maxItems":{"$ref":"#/definitions/maxItems"},"minItems":{"$ref":"#/definitions/minItems"},"uniqueItems":{"$ref":"#/definitions/uniqueItems"},"enum":{"$ref":"#/definitions/enum"},"multipleOf":{"$ref":"#/definitions/multipleOf"},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"vendorExtension":{"description":"Any property starting with x- is valid.","additionalProperties":true,"additionalItems":true},"bodyParameter":{"type":"object","required":["name","in","schema"],"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"description":{"type":"string","description":"A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed."},"name":{"type":"string","description":"The name of the parameter."},"in":{"type":"string","description":"Determines the location of the parameter.","enum":["body"]},"required":{"type":"boolean","description":"Determines whether or not this parameter is required or optional.","default":false},"schema":{"$ref":"#/definitions/schema"}},"additionalProperties":false},"headerParameterSubSchema":{"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"required":{"type":"boolean","description":"Determines whether or not this parameter is required or optional.","default":false},"in":{"type":"string","description":"Determines the location of the parameter.","enum":["header"]},"description":{"type":"string","description":"A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed."},"name":{"type":"string","description":"The name of the parameter."},"type":{"type":"string","enum":["string","number","boolean","integer","array"]},"format":{"type":"string"},"items":{"$ref":"#/definitions/primitivesItems"},"collectionFormat":{"$ref":"#/definitions/collectionFormat"},"default":{"$ref":"#/definitions/default"},"maximum":{"$ref":"#/definitions/maximum"},"exclusiveMaximum":{"$ref":"#/definitions/exclusiveMaximum"},"minimum":{"$ref":"#/definitions/minimum"},"exclusiveMinimum":{"$ref":"#/definitions/exclusiveMinimum"},"maxLength":{"$ref":"#/definitions/maxLength"},"minLength":{"$ref":"#/definitions/minLength"},"pattern":{"$ref":"#/definitions/pattern"},"maxItems":{"$ref":"#/definitions/maxItems"},"minItems":{"$ref":"#/definitions/minItems"},"uniqueItems":{"$ref":"#/definitions/uniqueItems"},"enum":{"$ref":"#/definitions/enum"},"multipleOf":{"$ref":"#/definitions/multipleOf"}}},"queryParameterSubSchema":{"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"required":{"type":"boolean","description":"Determines whether or not this parameter is required or optional.","default":false},"in":{"type":"string","description":"Determines the location of the parameter.","enum":["query"]},"description":{"type":"string","description":"A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed."},"name":{"type":"string","description":"The name of the parameter."},"allowEmptyValue":{"type":"boolean","default":false,"description":"allows sending a parameter by name only or with an empty value."},"type":{"type":"string","enum":["string","number","boolean","integer","array"]},"format":{"type":"string"},"items":{"$ref":"#/definitions/primitivesItems"},"collectionFormat":{"$ref":"#/definitions/collectionFormatWithMulti"},"default":{"$ref":"#/definitions/default"},"maximum":{"$ref":"#/definitions/maximum"},"exclusiveMaximum":{"$ref":"#/definitions/exclusiveMaximum"},"minimum":{"$ref":"#/definitions/minimum"},"exclusiveMinimum":{"$ref":"#/definitions/exclusiveMinimum"},"maxLength":{"$ref":"#/definitions/maxLength"},"minLength":{"$ref":"#/definitions/minLength"},"pattern":{"$ref":"#/definitions/pattern"},"maxItems":{"$ref":"#/definitions/maxItems"},"minItems":{"$ref":"#/definitions/minItems"},"uniqueItems":{"$ref":"#/definitions/uniqueItems"},"enum":{"$ref":"#/definitions/enum"},"multipleOf":{"$ref":"#/definitions/multipleOf"}}},"formDataParameterSubSchema":{"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"required":{"type":"boolean","description":"Determines whether or not this parameter is required or optional.","default":false},"in":{"type":"string","description":"Determines the location of the parameter.","enum":["formData"]},"description":{"type":"string","description":"A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed."},"name":{"type":"string","description":"The name of the parameter."},"allowEmptyValue":{"type":"boolean","default":false,"description":"allows sending a parameter by name only or with an empty value."},"type":{"type":"string","enum":["string","number","boolean","integer","array","file"]},"format":{"type":"string"},"items":{"$ref":"#/definitions/primitivesItems"},"collectionFormat":{"$ref":"#/definitions/collectionFormatWithMulti"},"default":{"$ref":"#/definitions/default"},"maximum":{"$ref":"#/definitions/maximum"},"exclusiveMaximum":{"$ref":"#/definitions/exclusiveMaximum"},"minimum":{"$ref":"#/definitions/minimum"},"exclusiveMinimum":{"$ref":"#/definitions/exclusiveMinimum"},"maxLength":{"$ref":"#/definitions/maxLength"},"minLength":{"$ref":"#/definitions/minLength"},"pattern":{"$ref":"#/definitions/pattern"},"maxItems":{"$ref":"#/definitions/maxItems"},"minItems":{"$ref":"#/definitions/minItems"},"uniqueItems":{"$ref":"#/definitions/uniqueItems"},"enum":{"$ref":"#/definitions/enum"},"multipleOf":{"$ref":"#/definitions/multipleOf"}}},"pathParameterSubSchema":{"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"required":["required"],"properties":{"required":{"type":"boolean","enum":[true],"description":"Determines whether or not this parameter is required or optional."},"in":{"type":"string","description":"Determines the location of the parameter.","enum":["path"]},"description":{"type":"string","description":"A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed."},"name":{"type":"string","description":"The name of the parameter."},"type":{"type":"string","enum":["string","number","boolean","integer","array"]},"format":{"type":"string"},"items":{"$ref":"#/definitions/primitivesItems"},"collectionFormat":{"$ref":"#/definitions/collectionFormat"},"default":{"$ref":"#/definitions/default"},"maximum":{"$ref":"#/definitions/maximum"},"exclusiveMaximum":{"$ref":"#/definitions/exclusiveMaximum"},"minimum":{"$ref":"#/definitions/minimum"},"exclusiveMinimum":{"$ref":"#/definitions/exclusiveMinimum"},"maxLength":{"$ref":"#/definitions/maxLength"},"minLength":{"$ref":"#/definitions/minLength"},"pattern":{"$ref":"#/definitions/pattern"},"maxItems":{"$ref":"#/definitions/maxItems"},"minItems":{"$ref":"#/definitions/minItems"},"uniqueItems":{"$ref":"#/definitions/uniqueItems"},"enum":{"$ref":"#/definitions/enum"},"multipleOf":{"$ref":"#/definitions/multipleOf"}}},"nonBodyParameter":{"type":"object","required":["name","in","type"],"oneOf":[{"$ref":"#/definitions/headerParameterSubSchema"},{"$ref":"#/definitions/formDataParameterSubSchema"},{"$ref":"#/definitions/queryParameterSubSchema"},{"$ref":"#/definitions/pathParameterSubSchema"}]},"parameter":{"oneOf":[{"$ref":"#/definitions/bodyParameter"},{"$ref":"#/definitions/nonBodyParameter"}]},"schema":{"type":"object","description":"A deterministic version of a JSON Schema object.","patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"$ref":{"type":"string"},"format":{"type":"string"},"title":{"$ref":"http://json-schema.org/draft-04/schema#/properties/title"},"description":{"$ref":"http://json-schema.org/draft-04/schema#/properties/description"},"default":{"$ref":"http://json-schema.org/draft-04/schema#/properties/default"},"multipleOf":{"$ref":"http://json-schema.org/draft-04/schema#/properties/multipleOf"},"maximum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/maximum"},"exclusiveMaximum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/exclusiveMaximum"},"minimum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/minimum"},"exclusiveMinimum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/exclusiveMinimum"},"maxLength":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveInteger"},"minLength":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"},"pattern":{"$ref":"http://json-schema.org/draft-04/schema#/properties/pattern"},"maxItems":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveInteger"},"minItems":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"},"uniqueItems":{"$ref":"http://json-schema.org/draft-04/schema#/properties/uniqueItems"},"maxProperties":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveInteger"},"minProperties":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"},"required":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/stringArray"},"enum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/enum"},"additionalProperties":{"anyOf":[{"$ref":"#/definitions/schema"},{"type":"boolean"}],"default":{}},"type":{"$ref":"http://json-schema.org/draft-04/schema#/properties/type"},"items":{"anyOf":[{"$ref":"#/definitions/schema"},{"type":"array","minItems":1,"items":{"$ref":"#/definitions/schema"}}],"default":{}},"allOf":{"type":"array","minItems":1,"items":{"$ref":"#/definitions/schema"}},"properties":{"type":"object","additionalProperties":{"$ref":"#/definitions/schema"},"default":{}},"discriminator":{"type":"string"},"readOnly":{"type":"boolean","default":false},"xml":{"$ref":"#/definitions/xml"},"externalDocs":{"$ref":"#/definitions/externalDocs"},"example":{}},"additionalProperties":false},"fileSchema":{"type":"object","description":"A deterministic version of a JSON Schema object.","patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"required":["type"],"properties":{"format":{"type":"string"},"title":{"$ref":"http://json-schema.org/draft-04/schema#/properties/title"},"description":{"$ref":"http://json-schema.org/draft-04/schema#/properties/description"},"default":{"$ref":"http://json-schema.org/draft-04/schema#/properties/default"},"required":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/stringArray"},"type":{"type":"string","enum":["file"]},"readOnly":{"type":"boolean","default":false},"externalDocs":{"$ref":"#/definitions/externalDocs"},"example":{}},"additionalProperties":false},"primitivesItems":{"type":"object","additionalProperties":false,"properties":{"type":{"type":"string","enum":["string","number","integer","boolean","array"]},"format":{"type":"string"},"items":{"$ref":"#/definitions/primitivesItems"},"collectionFormat":{"$ref":"#/definitions/collectionFormat"},"default":{"$ref":"#/definitions/default"},"maximum":{"$ref":"#/definitions/maximum"},"exclusiveMaximum":{"$ref":"#/definitions/exclusiveMaximum"},"minimum":{"$ref":"#/definitions/minimum"},"exclusiveMinimum":{"$ref":"#/definitions/exclusiveMinimum"},"maxLength":{"$ref":"#/definitions/maxLength"},"minLength":{"$ref":"#/definitions/minLength"},"pattern":{"$ref":"#/definitions/pattern"},"maxItems":{"$ref":"#/definitions/maxItems"},"minItems":{"$ref":"#/definitions/minItems"},"uniqueItems":{"$ref":"#/definitions/uniqueItems"},"enum":{"$ref":"#/definitions/enum"},"multipleOf":{"$ref":"#/definitions/multipleOf"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"security":{"type":"array","items":{"$ref":"#/definitions/securityRequirement"},"uniqueItems":true},"securityRequirement":{"type":"object","additionalProperties":{"type":"array","items":{"type":"string"},"uniqueItems":true}},"xml":{"type":"object","additionalProperties":false,"properties":{"name":{"type":"string"},"namespace":{"type":"string"},"prefix":{"type":"string"},"attribute":{"type":"boolean","default":false},"wrapped":{"type":"boolean","default":false}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"tag":{"type":"object","additionalProperties":false,"required":["name"],"properties":{"name":{"type":"string"},"description":{"type":"string"},"externalDocs":{"$ref":"#/definitions/externalDocs"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"securityDefinitions":{"type":"object","additionalProperties":{"oneOf":[{"$ref":"#/definitions/basicAuthenticationSecurity"},{"$ref":"#/definitions/apiKeySecurity"},{"$ref":"#/definitions/oauth2ImplicitSecurity"},{"$ref":"#/definitions/oauth2PasswordSecurity"},{"$ref":"#/definitions/oauth2ApplicationSecurity"},{"$ref":"#/definitions/oauth2AccessCodeSecurity"}]}},"basicAuthenticationSecurity":{"type":"object","additionalProperties":false,"required":["type"],"properties":{"type":{"type":"string","enum":["basic"]},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"apiKeySecurity":{"type":"object","additionalProperties":false,"required":["type","name","in"],"properties":{"type":{"type":"string","enum":["apiKey"]},"name":{"type":"string"},"in":{"type":"string","enum":["header","query"]},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"oauth2ImplicitSecurity":{"type":"object","additionalProperties":false,"required":["type","flow","authorizationUrl"],"properties":{"type":{"type":"string","enum":["oauth2"]},"flow":{"type":"string","enum":["implicit"]},"scopes":{"$ref":"#/definitions/oauth2Scopes"},"authorizationUrl":{"type":"string","format":"uri"},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"oauth2PasswordSecurity":{"type":"object","additionalProperties":false,"required":["type","flow","tokenUrl"],"properties":{"type":{"type":"string","enum":["oauth2"]},"flow":{"type":"string","enum":["password"]},"scopes":{"$ref":"#/definitions/oauth2Scopes"},"tokenUrl":{"type":"string","format":"uri"},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"oauth2ApplicationSecurity":{"type":"object","additionalProperties":false,"required":["type","flow","tokenUrl"],"properties":{"type":{"type":"string","enum":["oauth2"]},"flow":{"type":"string","enum":["application"]},"scopes":{"$ref":"#/definitions/oauth2Scopes"},"tokenUrl":{"type":"string","format":"uri"},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"oauth2AccessCodeSecurity":{"type":"object","additionalProperties":false,"required":["type","flow","authorizationUrl","tokenUrl"],"properties":{"type":{"type":"string","enum":["oauth2"]},"flow":{"type":"string","enum":["accessCode"]},"scopes":{"$ref":"#/definitions/oauth2Scopes"},"authorizationUrl":{"type":"string","format":"uri"},"tokenUrl":{"type":"string","format":"uri"},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"oauth2Scopes":{"type":"object","additionalProperties":{"type":"string"}},"mediaTypeList":{"type":"array","items":{"$ref":"#/definitions/mimeType"},"uniqueItems":true},"parametersList":{"type":"array","description":"The parameters needed to send a valid API call.","additionalItems":false,"items":{"oneOf":[{"$ref":"#/definitions/parameter"},{"$ref":"#/definitions/jsonReference"}]},"uniqueItems":true},"schemesList":{"type":"array","description":"The transfer protocol of the API.","items":{"type":"string","enum":["http","https","ws","wss"]},"uniqueItems":true},"collectionFormat":{"type":"string","enum":["csv","ssv","tsv","pipes"],"default":"csv"},"collectionFormatWithMulti":{"type":"string","enum":["csv","ssv","tsv","pipes","multi"],"default":"csv"},"title":{"$ref":"http://json-schema.org/draft-04/schema#/properties/title"},"description":{"$ref":"http://json-schema.org/draft-04/schema#/properties/description"},"default":{"$ref":"http://json-schema.org/draft-04/schema#/properties/default"},"multipleOf":{"$ref":"http://json-schema.org/draft-04/schema#/properties/multipleOf"},"maximum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/maximum"},"exclusiveMaximum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/exclusiveMaximum"},"minimum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/minimum"},"exclusiveMinimum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/exclusiveMinimum"},"maxLength":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveInteger"},"minLength":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"},"pattern":{"$ref":"http://json-schema.org/draft-04/schema#/properties/pattern"},"maxItems":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveInteger"},"minItems":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"},"uniqueItems":{"$ref":"http://json-schema.org/draft-04/schema#/properties/uniqueItems"},"enum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/enum"},"jsonReference":{"type":"object","required":["$ref"],"additionalProperties":false,"properties":{"$ref":{"type":"string"}}}}}
);



local.assetsDict["/assets.swgg.swagger.json"] = local.assetsDict["/assets.swgg.swagger.json"] || "";



// https://petstore.swagger.io/v2/swagger.json
// curl -Ls https://petstore.swagger.io/v2/swagger.json > /tmp/aa.json; node -e "console.log(JSON.stringify(require('/tmp/aa.json')));"
local.assetsDict["/assets.swgg.swagger.petstore.json"] = JSON.stringify(
{"swagger":"2.0","info":{"description":"This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.","version":"1.0.0","title":"Swagger Petstore","termsOfService":"http://swagger.io/terms/","contact":{"email":"apiteam@swagger.io"},"license":{"name":"Apache 2.0","url":"http://www.apache.org/licenses/LICENSE-2.0.html"}},"host":"petstore.swagger.io","basePath":"/v2","tags":[{"name":"pet","description":"Everything about your Pets","externalDocs":{"description":"Find out more","url":"http://swagger.io"}},{"name":"store","description":"Access to Petstore orders"},{"name":"user","description":"Operations about user","externalDocs":{"description":"Find out more about our store","url":"http://swagger.io"}}],"schemes":["http"],"paths":{"/pet":{"post":{"tags":["pet"],"summary":"Add a new pet to the store","description":"","operationId":"addPet","consumes":["application/json","application/xml"],"produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"Pet object that needs to be added to the store","required":true,"schema":{"$ref":"#/definitions/Pet"}}],"responses":{"405":{"description":"Invalid input"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]},"put":{"tags":["pet"],"summary":"Update an existing pet","description":"","operationId":"updatePet","consumes":["application/json","application/xml"],"produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"Pet object that needs to be added to the store","required":true,"schema":{"$ref":"#/definitions/Pet"}}],"responses":{"400":{"description":"Invalid ID supplied"},"404":{"description":"Pet not found"},"405":{"description":"Validation exception"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]}},"/pet/findByStatus":{"get":{"tags":["pet"],"summary":"Finds Pets by status","description":"Multiple status values can be provided with comma separated strings","operationId":"findPetsByStatus","produces":["application/xml","application/json"],"parameters":[{"name":"status","in":"query","description":"Status values that need to be considered for filter","required":true,"type":"array","items":{"type":"string","enum":["available","pending","sold"],"default":"available"},"collectionFormat":"multi"}],"responses":{"200":{"description":"successful operation","schema":{"type":"array","items":{"$ref":"#/definitions/Pet"}}},"400":{"description":"Invalid status value"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]}},"/pet/findByTags":{"get":{"tags":["pet"],"summary":"Finds Pets by tags","description":"Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.","operationId":"findPetsByTags","produces":["application/xml","application/json"],"parameters":[{"name":"tags","in":"query","description":"Tags to filter by","required":true,"type":"array","items":{"type":"string"},"collectionFormat":"multi"}],"responses":{"200":{"description":"successful operation","schema":{"type":"array","items":{"$ref":"#/definitions/Pet"}}},"400":{"description":"Invalid tag value"}},"security":[{"petstore_auth":["write:pets","read:pets"]}],"deprecated":true}},"/pet/{petId}":{"get":{"tags":["pet"],"summary":"Find pet by ID","description":"Returns a single pet","operationId":"getPetById","produces":["application/xml","application/json"],"parameters":[{"name":"petId","in":"path","description":"ID of pet to return","required":true,"type":"integer","format":"int64"}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/Pet"}},"400":{"description":"Invalid ID supplied"},"404":{"description":"Pet not found"}},"security":[{"api_key":[]}]},"post":{"tags":["pet"],"summary":"Updates a pet in the store with form data","description":"","operationId":"updatePetWithForm","consumes":["application/x-www-form-urlencoded"],"produces":["application/xml","application/json"],"parameters":[{"name":"petId","in":"path","description":"ID of pet that needs to be updated","required":true,"type":"integer","format":"int64"},{"name":"name","in":"formData","description":"Updated name of the pet","required":false,"type":"string"},{"name":"status","in":"formData","description":"Updated status of the pet","required":false,"type":"string"}],"responses":{"405":{"description":"Invalid input"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]},"delete":{"tags":["pet"],"summary":"Deletes a pet","description":"","operationId":"deletePet","produces":["application/xml","application/json"],"parameters":[{"name":"api_key","in":"header","required":false,"type":"string"},{"name":"petId","in":"path","description":"Pet id to delete","required":true,"type":"integer","format":"int64"}],"responses":{"400":{"description":"Invalid ID supplied"},"404":{"description":"Pet not found"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]}},"/pet/{petId}/uploadImage":{"post":{"tags":["pet"],"summary":"uploads an image","description":"","operationId":"uploadFile","consumes":["multipart/form-data"],"produces":["application/json"],"parameters":[{"name":"petId","in":"path","description":"ID of pet to update","required":true,"type":"integer","format":"int64"},{"name":"additionalMetadata","in":"formData","description":"Additional data to pass to server","required":false,"type":"string"},{"name":"file","in":"formData","description":"file to upload","required":false,"type":"file"}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/ApiResponse"}}},"security":[{"petstore_auth":["write:pets","read:pets"]}]}},"/store/inventory":{"get":{"tags":["store"],"summary":"Returns pet inventories by status","description":"Returns a map of status codes to quantities","operationId":"getInventory","produces":["application/json"],"parameters":[],"responses":{"200":{"description":"successful operation","schema":{"type":"object","additionalProperties":{"type":"integer","format":"int32"}}}},"security":[{"api_key":[]}]}},"/store/order":{"post":{"tags":["store"],"summary":"Place an order for a pet","description":"","operationId":"placeOrder","produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"order placed for purchasing the pet","required":true,"schema":{"$ref":"#/definitions/Order"}}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/Order"}},"400":{"description":"Invalid Order"}}}},"/store/order/{orderId}":{"get":{"tags":["store"],"summary":"Find purchase order by ID","description":"For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions","operationId":"getOrderById","produces":["application/xml","application/json"],"parameters":[{"name":"orderId","in":"path","description":"ID of pet that needs to be fetched","required":true,"type":"integer","maximum":10,"minimum":1,"format":"int64"}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/Order"}},"400":{"description":"Invalid ID supplied"},"404":{"description":"Order not found"}}},"delete":{"tags":["store"],"summary":"Delete purchase order by ID","description":"For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors","operationId":"deleteOrder","produces":["application/xml","application/json"],"parameters":[{"name":"orderId","in":"path","description":"ID of the order that needs to be deleted","required":true,"type":"integer","minimum":1,"format":"int64"}],"responses":{"400":{"description":"Invalid ID supplied"},"404":{"description":"Order not found"}}}},"/user":{"post":{"tags":["user"],"summary":"Create user","description":"This can only be done by the logged in user.","operationId":"createUser","produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"Created user object","required":true,"schema":{"$ref":"#/definitions/User"}}],"responses":{"default":{"description":"successful operation"}}}},"/user/createWithArray":{"post":{"tags":["user"],"summary":"Creates list of users with given input array","description":"","operationId":"createUsersWithArrayInput","produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"List of user object","required":true,"schema":{"type":"array","items":{"$ref":"#/definitions/User"}}}],"responses":{"default":{"description":"successful operation"}}}},"/user/createWithList":{"post":{"tags":["user"],"summary":"Creates list of users with given input array","description":"","operationId":"createUsersWithListInput","produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"List of user object","required":true,"schema":{"type":"array","items":{"$ref":"#/definitions/User"}}}],"responses":{"default":{"description":"successful operation"}}}},"/user/login":{"get":{"tags":["user"],"summary":"Logs user into the system","description":"","operationId":"loginUser","produces":["application/xml","application/json"],"parameters":[{"name":"username","in":"query","description":"The user name for login","required":true,"type":"string"},{"name":"password","in":"query","description":"The password for login in clear text","required":true,"type":"string"}],"responses":{"200":{"description":"successful operation","schema":{"type":"string"},"headers":{"X-Rate-Limit":{"type":"integer","format":"int32","description":"calls per hour allowed by the user"},"X-Expires-After":{"type":"string","format":"date-time","description":"date in UTC when token expires"}}},"400":{"description":"Invalid username/password supplied"}}}},"/user/logout":{"get":{"tags":["user"],"summary":"Logs out current logged in user session","description":"","operationId":"logoutUser","produces":["application/xml","application/json"],"parameters":[],"responses":{"default":{"description":"successful operation"}}}},"/user/{username}":{"get":{"tags":["user"],"summary":"Get user by user name","description":"","operationId":"getUserByName","produces":["application/xml","application/json"],"parameters":[{"name":"username","in":"path","description":"The name that needs to be fetched. Use user1 for testing. ","required":true,"type":"string"}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/User"}},"400":{"description":"Invalid username supplied"},"404":{"description":"User not found"}}},"put":{"tags":["user"],"summary":"Updated user","description":"This can only be done by the logged in user.","operationId":"updateUser","produces":["application/xml","application/json"],"parameters":[{"name":"username","in":"path","description":"name that need to be updated","required":true,"type":"string"},{"in":"body","name":"body","description":"Updated user object","required":true,"schema":{"$ref":"#/definitions/User"}}],"responses":{"400":{"description":"Invalid user supplied"},"404":{"description":"User not found"}}},"delete":{"tags":["user"],"summary":"Delete user","description":"This can only be done by the logged in user.","operationId":"deleteUser","produces":["application/xml","application/json"],"parameters":[{"name":"username","in":"path","description":"The name that needs to be deleted","required":true,"type":"string"}],"responses":{"400":{"description":"Invalid username supplied"},"404":{"description":"User not found"}}}}},"securityDefinitions":{"petstore_auth":{"type":"oauth2","authorizationUrl":"http://petstore.swagger.io/oauth/dialog","flow":"implicit","scopes":{"write:pets":"modify pets in your account","read:pets":"read your pets"}},"api_key":{"type":"apiKey","name":"api_key","in":"header"}},"definitions":{"Order":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"petId":{"type":"integer","format":"int64"},"quantity":{"type":"integer","format":"int32"},"shipDate":{"type":"string","format":"date-time"},"status":{"type":"string","description":"Order Status","enum":["placed","approved","delivered"]},"complete":{"type":"boolean","default":false}},"xml":{"name":"Order"}},"Category":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"name":{"type":"string"}},"xml":{"name":"Category"}},"User":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"username":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"},"email":{"type":"string"},"password":{"type":"string"},"phone":{"type":"string"},"userStatus":{"type":"integer","format":"int32","description":"User Status"}},"xml":{"name":"User"}},"Tag":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"name":{"type":"string"}},"xml":{"name":"Tag"}},"Pet":{"type":"object","required":["name","photoUrls"],"properties":{"id":{"type":"integer","format":"int64"},"category":{"$ref":"#/definitions/Category"},"name":{"type":"string","example":"doggie"},"photoUrls":{"type":"array","xml":{"name":"photoUrl","wrapped":true},"items":{"type":"string"}},"tags":{"type":"array","xml":{"name":"tag","wrapped":true},"items":{"$ref":"#/definitions/Tag"}},"status":{"type":"string","description":"pet status in the store","enum":["available","pending","sold"]}},"xml":{"name":"Pet"}},"ApiResponse":{"type":"object","properties":{"code":{"type":"integer","format":"int32"},"type":{"type":"string"},"message":{"type":"string"}}}},"externalDocs":{"description":"Find out more about Swagger","url":"http://swagger.io"}}
);



local.swaggerErrorTypeDict = {
    arrayMaxItems: '{{type2}} {{prefix0}} must have <= {{schema.maxItems}} items',
    arrayMinItems: '{{type2}} {{prefix0}} must have >= {{schema.minItems}} items',
    arrayUniqueItems: '{{type2}} {{prefix0}} must have unique items (has duplicate item {{tmp jsonStringify}})',
    itemEnum: '{{type2}} {{prefix0}} can only have items from the list {{schema.enum jsonStringify}}',
    itemAnyOf: '{{tmp}} (from schama.anyOf {{schema2}})',
    itemNot: '{{type2}} {{prefix0}} must not validate against schama.not {{schema2}}',
    itemOneOf: '{{type2}} {{prefix0}} did not validate against exactly one schema (validated {{tmp}}) in schema.oneOf {{schema2}}',
    itemType: 'value {{prefix0}} is not a valid {{type2}}',
    numberMultipleOf: '{{type2}} {{prefix0}} must be a multiple of {{schema.multipleOf}}',
    numberExclusiveMaximum: '{{type2}} {{prefix0}} must be < {{schema.maximum}}',
    numberExclusiveMinimum: '{{type2}} {{prefix0}} must be > {{schema.minimum}}',
    numberMaximum: '{{type2}} {{prefix0}} must be <= {{schema.maximum}}',
    numberMinimum: '{{type2}} {{prefix0}} must be >= {{schema.minimum}}',
    objectAdditionalProperties: '{{type2}} {{prefix0}} cannot have additional property {{key jsonStringify}}',
    objectDependencies: '{{type2}} {{prefix0}} with item {{key jsonStringify}} must have dependency {{key2 jsonStringify}}',
    objectMaxProperties: '{{type2}} {{prefix0}} must have <= {{schema.maxProperties}} properties',
    objectMinProperties: '{{type2}} {{prefix0}} must have >= {{schema.minProperties}} properties',
    objectRequired: '{{type2}} {{prefix0}} is required',
    schemaDereferenceCircular: 'cannot dereference circular-reference schema {{schema2}}',
    schemaDereference: 'cannot dereference schema {{schema2}}',
    // https://github.com/swagger-api/swagger-editor/tree/v3.1.20/src/plugins/validation/semantic-validators/validators
    // shGrep swagger-editor/src/plugins/validation/semantic-validators/validators 'message:'
    // form-data.js:90: "Parameter \"in: formdata\" is invalid, did you mean \"in: formData\" ( camelCase )?",
    semanticFormData1: "Parameter {{prefix0}} is invalid, did you mean \"in: formData\" ( camelCase )?",
    // form-data.js:109: "Parameters cannot have both a \"in: body\" and \"in: formData\", as \"formData\" _will_ be the body"
    semanticFormData2: "Parameters cannot have both a \"in: body\" and \"in: formData\", as \"formData\" _will_ be the body",
    // form-data.js:131: "Parameters with \"type: file\" must have \"in: formData\"",
    semanticFormData3: "Parameter {{prefix0}} with \"type: file\" must have \"in: formData\"",
    // form-data.js:140: "Operations with Parameters of \"type: file\" must include \"multipart/form-data\" in their \"consumes\" property",
    semanticFormData4: "Operation {{prefix0}} with Parameters of \"type: file\" must include \"multipart/form-data\" in their \"consumes\" property",
    // form-data.js:163: "Operations with Parameters of \"in: formData\" must include \"application/x-www-form-urlencoded\" or \"multipart/form-data\" in their \"consumes\" property",
    semanticFormData5: "Operation {{prefix0}} with Parameters of \"in: formData\" must include \"application/x-www-form-urlencoded\" or \"multipart/form-data\" in their \"consumes\" property",
    // items-required-for-array-objects.js:27: "Schema objects with 'array' type require an 'items' property"
    semanticItemsRequiredForArrayObjects1: "Schema {{schema2}} with 'array' type require an 'items' property",
    // items-required-for-array-objects.js:38: "Schema properties specified as 'required' must be defined"
    semanticItemsRequiredForArrayObjects2: "{{type2}} {{prefix0}} must have property {{key jsonStringify}}",
    // items-required-for-array-objects.js:50: "Headers with 'array' type require an 'items' property"
    semanticItemsRequiredForArrayObjects3: "Headers with 'array' type require an 'items' property",
    // items-required-for-array-objects.js:59: "Model properties with 'array' type require an 'items' property"
    semanticItemsRequiredForArrayObjects4: "Model properties with 'array' type require an 'items' property",
    // operation-ids.js:40: "operationIds must be unique"
    semanticOperationIds1: 'operationId {{prefix0}} must be unique',
    // operations.js:30: "Operations cannot have both a \"body\" parameter and \"formData\" parameter"
    semanticOperations1: "Operation {{prefix0}} cannot have both a \"body\" parameter and \"formData\" parameter",
    // operations.js:38: "Operations must have no more than one body parameter"
    semanticOperations2: "Operation {{prefix0}} must have no more than one body parameter",
    // operations.js:53: "Operation parameters must have unique 'name' + 'in' properties"
    semanticOperations3: "Operation parameters {{prefix0}} must have unique 'name' + 'in' properties",
    // parameters.js:18: "Parameters with 'array' type require an 'items' property."
    semanticParameters1: "Parameters with 'array' type require an 'items' property.",
    // parameters.js:24: "Non-body parameters require a 'type' property."
    semanticParameters2: "Non-body parameter {{prefix0}} require a 'type' property.",
    // paths.js:48: "Query strings in paths are not allowed."
    semanticPaths1: "Query strings in path {{prefix2 jsonStringify}} are not allowed",
    // paths.js:79: "Equivalent paths are not allowed."
    semanticPaths2: 'Equivalent paths {{pathList jsonStringify}} are not allowed',
    // paths.js:94: "Path parameters must have unique 'name' + 'in' properties"
    semanticPaths3: "Path parameter ${parameterDefinition.name jsonStringify} must be unique",
    // paths.js:107: `Path parameter ${parameterDefinition.name} was defined but never used`
    semanticPaths4: 'Path parameter ${parameterDefinition.name} was defined but never used',
    // paths.js:119: "Empty path parameter declarations are not valid"
    semanticPaths5: "Empty path parameter declarations are not valid - {{prefix2 jsonStringify}}",
    // paths.js:131: `Declared path parameter "${parameter}" needs to be defined as a path parameter at either the path or operation level`
    semanticPaths6: 'Declared path parameter {{name jsonStringify}} needs to be defined as a path parameter {{prefix2 jsonStringify}} at either the path or operation level',
    // paths.js:141: `Path parameter ${parameterDefinition.name} was defined but never used`
    semanticPaths7: 'Path parameter {{prefix0}} was defined but never used',
    // refs.js:37: "Definition was declared but never used in document"
    semanticRefs1: 'Definition was declared but never used in document',
    // schema.js:61: "Read only properties cannot marked as required by a schema."
    semanticSchema1: "Read only property {{prefix0}} cannot be marked as required by a schema.",
    // security-definitions.js:33: `${path} must have required string 'type' param`,
    semanticSecurityDefinitions1: '${path} must have required string "type" param',
    // security-definitions.js:44: "apiKey authorization must have required 'in' param, valid values are 'query' or 'header'.",
    semanticSecurityDefinitions2: 'apiKey authorization must have required "in" param, valid values are "query" or "header".',
    // security-definitions.js:52: "apiKey authorization must have required 'name' string param. The name of the header or query parameter to be used.",
    semanticSecurityDefinitions3: "apiKey authorization must have required 'name' string param. The name of the header or query parameter to be used.",
    // security-definitions.js:66: "oauth2 authorization must have required 'flow' string param. Valid values are 'implicit', 'password', 'application' or 'accessCode'",
    semanticSecurityDefinitions4: "oauth2 authorization must have required 'flow' string param. Valid values are 'implicit', 'password', 'application' or 'accessCode'",
    // security-definitions.js:73: "oauth2 authorization implicit flow must have required 'authorizationUrl' parameter.",
    semanticSecurityDefinitions5: "oauth2 authorization implicit flow must have required 'authorizationUrl' parameter.",
    // security-definitions.js:81: "oauth2 authorization accessCode flow must have required 'authorizationUrl' and 'tokenUrl' string parameters.",
    semanticSecurityDefinitions6: "oauth2 authorization accessCode flow must have required 'authorizationUrl' and 'tokenUrl' string parameters.",
    // security-definitions.js:89: "oauth2 authorization password flow must have required 'tokenUrl' string parameter.",
    semanticSecurityDefinitions7: "oauth2 authorization password flow must have required 'tokenUrl' string parameter.",
    // security-definitions.js:97: "oauth2 authorization application flow must have required 'tokenUrl' string parameter.",
    semanticSecurityDefinitions8: "oauth2 authorization application flow must have required 'tokenUrl' string parameter.",
    // security-definitions.js:106: "'scopes' is required property type object. The available scopes for the OAuth2 security scheme.",
    semanticSecurityDefinitions9: "'scopes' is required property type object. The available scopes for the OAuth2 security scheme.",
    // security.js:23: "security requirements must match a security definition",
    semanticSecurity1: "security requirements must match a security definition",
    // security.js:37: `Security scope definition ${scope} could not be resolved`,
    semanticSecurity2: 'Security scope definition ${scope} could not be resolved',
    // walker.js:27: "\"type\" should be a string"
    semanticWalker1: "type {{prefix0}} should be a string",
    // walker.js:39: "Minimum cannot be more than maximum"
    semanticWalker2: 'Minimum cannot be more than maximum - {{prefix0}}',
    // walker.js:48: "minProperties cannot be more than maxProperties"
    semanticWalker3: 'minProperties cannot be more than maxProperties - {{prefix0}}',
    // walker.js:57: "minLength cannot be more than maxLength"
    semanticWalker4: 'minLength cannot be more than maxLength - {{prefix0}}',
    // walker.js:76: `${path[path.length - 2]} $refs cannot match any of the following: ${humanFriendlyRefBlacklist}`
    // semanticWalker5: '${path[path.length - 2]} $refs cannot match any of the following: ${humanFriendlyRefBlacklist}',
    // walker.js:89: "$ref paths must begin with `#/`"
    semanticWalker6: '$ref {{prefix0}} must begin with "#/"',
    // walker.js:108: "Values alongside a $ref will be ignored."
    semanticWalker7: 'Values alongside a $ref will be ignored.',
    stringMaxLength: '{{type2}} {{prefix0}} must have <= {{schema.maxLength}} characters',
    stringMinLength: '{{type2}} {{prefix0}} must have >= {{schema.minLength}} characters',
    stringPattern: '{{type2}} {{prefix0}} must match regexp pattern {{schema.pattern jsonStringify}}'
};



local.templateApiDict =
{
    "crudCountManyByQuery": {
        "_method": "GET",
        "_path": "/{{_tags0}}/crudCountManyByQuery",
        "parameters": [
            {
                "default": "{\"id\":{\"$exists\":true}}",
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
        "_method": "DELETE",
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
        "_method": "GET",
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
        "_method": "HEAD",
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
        "_method": "GET",
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
        "_method": "OPTIONS",
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
        "_method": "PATCH",
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
        "_method": "POST",
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
        "_method": "GET",
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
        "_method": "PUT",
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
        "_method": "GET",
        "_path": "/{{_tags0}}/crudGetManyByQuery",
        "parameters": [
            {
                "default": "{\"id\":{\"$exists\":true}}",
                "description": "query param",
                "format": "json",
                "in": "query",
                "name": "_queryWhere",
                "required": true,
                "type": "string"
            },
            {
                "default": null,
                "description": "projection-fields param",
                "format": "json",
                "in": "query",
                "name": "_queryFields",
                "type": "string",
                "x-swgg-collectionFormat": "json",
                "x-swgg-items": {
                    "type": "string"
                },
                "x-swgg-type": "array"
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
                "default": [
                    {
                        "fieldName": "id"
                    },
                    {
                        "fieldName": "_timeUpdated",
                        "isDescending": true
                    }
                ],
                "description": "cursor-sort param",
                "format": "json",
                "in": "query",
                "name": "_querySort",
                "type": "string",
                "x-swgg-collectionFormat": "json",
                "x-swgg-items": {
                    "type": "object"
                },
                "x-swgg-type": "array"
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
        "summary": "get many {{_schemaName}} objects by query"
    },
    "crudGetOneById": {
        "_idName": "{{_idName}}",
        "_method": "GET",
        "_path": "/{{_tags0}}/crudGetOneById.{{_idName}}.{{_idBackend}}",
        "parameters": [
            {
                "description": "{{_schemaName}} {{_idName}}",
                "in": "query",
                "name": "{{_idName}}",
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
        "summary": "get one {{_schemaName}} object by {{_idName}}"
    },
    "crudGetOneByQuery": {
        "_method": "GET",
        "_path": "/{{_tags0}}/crudGetOneByQuery",
        "parameters": [
            {
                "default": "{\"id\":{\"$exists\":true}}",
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
        "summary": "get one {{_schemaName}} object by query"
    },
    "crudNullDelete": {
        "_method": "DELETE",
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
        "_method": "GET",
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
        "_method": "HEAD",
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
        "_method": "OPTIONS",
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
        "_method": "PATCH",
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
        "_method": "POST",
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
        "_method": "PUT",
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
        "_method": "DELETE",
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
        "_idName": "{{_idName}}",
        "_method": "DELETE",
        "_path": "/{{_tags0}}/crudRemoveOneById.{{_idName}}.{{_idBackend}}",
        "parameters": [
            {
                "description": "{{_schemaName}} {{_idName}}",
                "in": "query",
                "name": "{{_idName}}",
                "required": true,
                "type": "string"
            }
        ],
        "summary": "remove one {{_schemaName}} object by {{_idName}}"
    },
    "crudSetManyById": {
        "_method": "PUT",
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
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "create or replace many {{_schemaName}} objects"
    },
    "crudSetOneById": {
        "_idName": "{{_idName}}",
        "_method": "PUT",
        "_path": "/{{_tags0}}/crudSetOneById.{{_idName}}.{{_idBackend}}",
        "parameters": [
            {
                "description": "{{_schemaName}} {{_idName}}",
                "in": "query",
                "name": "{{_idName}}",
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
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "create or replace one {{_schemaName}} object by {{_idName}}"
    },
    "crudUpdateOneById": {
        "_idName": "{{_idName}}",
        "_method": "PATCH",
        "_path": "/{{_tags0}}/crudUpdateOneById.{{_idName}}.{{_idBackend}}",
        "parameters": [
            {
                "description": "{{_schemaName}} {{_idName}}",
                "in": "query",
                "name": "{{_idName}}",
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
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "create or update one {{_schemaName}} object by {{_idName}}"
    },
    "fileGetOneById": {
        "_idName": "{{_idName}}",
        "_method": "GET",
        "_path": "/{{_tags0}}/fileGetOneById.{{_idName}}.{{_idBackend}}",
        "parameters": [
            {
                "description": "{{_schemaName}} {{_idName}}",
                "in": "query",
                "name": "{{_idName}}",
                "required": true,
                "type": "string"
            }
        ],
        "responses": {
            "200": {
                "description": "200 ok - http://jsonapi.org/format/#document-structure-top-level",
                "schema": {
                    "type": "file"
                }
            }
        },
        "summary": "get one {{_schemaName}} file by {{_idName}}",
        "x-swgg-consumes0": "application/octet-stream"
    },
    "fileUploadManyByForm": {
        "_fileUploadNumber": "{{_fileUploadNumber}}",
        "_method": "POST",
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
                    "$ref": "#/definitions/BuiltinJsonapiResponse"
                }
            }
        },
        "summary": "upload many {{_schemaName}} files by form",
        "x-swgg-consumes0": "multipart/form-data"
    },
    "userLoginByPassword": {
        "_method": "GET",
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
        "_method": "GET",
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
;
// JSON.stringify templateApiDict items to prevent side-effects
Object.keys(local.templateApiDict).forEach(function (key) {
    local.templateApiDict[key] = JSON.stringify(local.templateApiDict[key]);
});



// https://swaggerhub.com/wp-content/uploads/2017/10/Swagger-Icon.svg
local.templateSwaggerUiLogoMediumBase64 = '\
iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAAC6FBMVEUAAABqn0BqmUBumUBtmj9tmUBt\
mT9tmkBtmj9tmT9tmUBsmkBsmUBtmj9smkBsmUBsmT9tm0BtmkFvmTxsnEFtmT9smT9smUBtmT9tmkBs\
mkBtmkBsmj9tmz+AgABqmj9smT9tmUBtmkBsmkBsmj9tm0BVqlVgn0BtmkBsmj9tmUBxnDltkkltmD5s\
mT9tmj9smkBtmUFsmEBsmUBtmkBtmT9vnUEA/wBsmj5smkBsmkBmmTNtmj5smj9smT9rmz9smT9smj9t\
mj9um0Fvmz1tmj9qmz5wmT1smj9smkBtmj9mmTNsmT9tmkBrmj9tmEFtmT9smkBtmUBsmUBtmD9roUNt\
mT9smkCAv0Bsm0Bqnj5tmz5smUBrmUBtmkBsmj9smkBtmT9smUBtmkBsmUBtmUBsmkFsnTttmkBwl0Bt\
mkBtmT9tmUCRs2+kwIe2zZ92oEyauXttmkBrmkDj7Nv///+/0qt/p1htmj+JrWTa5s/I2bdtmT9pljxt\
mkCkwIj2+fObunxsmEB0okZsmUBtmT9Vqittmj9rmkGtx5TS4MRumj7b5tDt8+j2+fSStHBrmEFsmT/k\
7Ny2zKBtmT5um0Ftmj9umD5smj9tmj9tmkBsmT9tmkBsmj9smT9tmj9smT5tnD5smj9tmT9smUBtmUJs\
mEDI2bhrmD/R38Nsmj+sxpNtmz9/pljt8ue1zJ+IrWSauXyjv4dsmT5tmT9rmj+txpS/06xrmj9sm0Bs\
mT+Rs3C2zaBsmkBtmUBsmUBtmkBrmUBsmkFinTttmUBsmkBtpDdqnEBsmkBsmT9smD9tmUBtmD1smT9t\
mUBtmUBolzpsmT9umj9smz5tmT9qlUBumT9tnj2txpNsmT9rmjxrnEJtmT9smj9rmUFsmUBtmT9smT9r\
mT1rmD5smkBxqjltmT9smUBtmT9tmkBtm0BsmUBsmUBmmURtmUBsmT9smkBsmj9unEBrmz5tmUBtmT9s\
m0Bvm0OD9tkQAAAA+HRSTlMAGDxkgYyWn6myvL+vnYt4ZlQ/Hjt6pcvx/9SwiT0CNXa39Pe9OAMIW7Zs\
EgdS9fmsSzSg6IonAU7EuAVi1sFFVd7KTy7JKRn+/I0KfeNRL9pv+PBNE7mQBEAdXntrk4anraODgGdH\
Gu8gzM6P//////+ITP/////y////5hG7////Vwvn4QZ+K///Vv////9Dzf//RjPFJZLqpJ5grqrtLTFt\
buwjXP85/0n/Wf///////1ppef//cn+Z//+Xm4d3X1MNw3QOJM/pYdwq7nOUFt1dIXUMQRX/xiYfkdk3\
UP36Mj6cCfYo1asc89cP6+Lg5SxKcL5jF9reEmcAAAc2SURBVHgB7NGDYQNAAAXQX9v8sW2ntt0Gtfdf\
oQOUl0Oqt8ID8O9fS2tbe0dnV3dPb1//wODQ8MjoGJprfGJyappvsFhtw3Y0gcPpcnv4Ia9vwh+AQcGQ\
dZpf4glHojAiFu9OUEAylQ5At0w2QWG5fAEaFUtlNmjGD01m5+YpYWEROiwtU9LKKlRbK1OB9Q2otJnd\
ohLbO7tQJbjnoTL7B1Dj8IhKhcegwPEJFTs9g6xKlRrU6pBynqMW6xeQcLlFYfojr6jRNRp0Q61u0YjA\
HTXLQlywSu3u6xDlpgHVXQgppmiE2wERXTTkAQIeacwTvuyZBoXwwrxdfbltxFEcnzLTU88tMzMzMzMz\
k7PaZhWvvG1ll+3KUrNhLjvMTOU2KTP/L0WtZGfvaH6Nxj77ee5Rv7EmI82MInT2JeigSx9SIg8/go7a\
71HRNPoYOuxxyTryCWgVhnX9B5BzCoXuru5CAXpPKqPh0BjW4yYAOXdAz4giuEuM2yiP9oLySq6bIyvW\
54B66mmV7RlQvuvayHLLFVC7q0zPgvLcvFkJH1Tmeui558EUy/ayXA/MCy8qvZtB9bgWs0qgXlJaL18K\
pujazNLcxutuUzqPgarazaqBOkZpvALBPQz+ATkEf6u7zRxQuslrN1COmwgjbCQ/dBMRqF0VdQq4iP8t\
EiJzTBXcq4oZCa6S3kDk0O8OGAVuW0WMhsYofj0hcpkaNMaQrLHm61XsZAXQuFcNchJ0avqxajnrknFq\
QydCJ+hYFsarDU1od5YvmI1P2Msw4O1nRYIsnK1aTRwaWZNUi8v3h5ZrJ8uRZPW2bpZMRtuzQLJMr4NT\
hkrWVNVsWgeyAklW78kq9Rr0nI5m4XWVekP2N6iIPGqirDdV6hhZFmBnmo+Eg2uaKCvsRNZbGY9p/iYf\
IJcKWWQQbydZR8rfk3KIZO9t78hOKwLD1eRkf777+QNRv+6p2MoqI8M9fH2on7Y85BOIZprzkqyjRa9J\
Iaxl+dB7RMVug56T3sMGcqrKBtfhcdZ06M1wrQ0tFGXX2jvOmgnAvAdYx//ndM8q0KVi2YPWDXHWbFrU\
1dVX4hstc2bNmFuaNx8tFvSVSjMWtkaN+LdgVvOEmugrQGNRnLWYz6Kt+jFgfrwJN6u5IL7ZJYcMyxlk\
0Gc8N3aOs5YIssJiU1VsKXk7KLFbtgyxYijIWh5n7WHOCj3yJy47yR0k93qBS/5DLzRnrYizVmqzyAbS\
fDbclrmJRvoDplaBdvGsHcmzh2b1O0gsdVOryZgJ2DhagIRTM2WtibPWmrJ6HL5Dvywrq0F/LaCPZNGT\
9SeMN7HsiW9ijfU75KmhzdqSnbXyIV9mQz6ckzXknZD834s95iH/bpz1njnLLacTRJg1QQTAoNbQSVLn\
uuasneKsO0H4QUh3+ZOucCkGD+TAGfzy0T8fzTc7UQ8aFRCL46z3wTmVgD98/EZQWz0HLRYsC4KGjxZz\
ljaCZT5dRIVVmB4+H0ArSn+yucgtvYX9RWgNF7zYeBZfbCrkUZZxbPAhMjTyLXz4parI8Kh+g5L9XGXk\
VBYtz49WAz5ChrqVnRH5scPIJGutbEejamux35B9dfNxvqsROU5DliRZM+W/vZWsKjKcn2R9ggyRlZlL\
fhryqUqsk81cyCUQZa2nR+eE/ayi8Duzq2RZXgf2Tj9TqcMxVHaacZvgmLrzWZ+rZncPlayVqtkXHcia\
K8k6VrVYNzQOV77cS7X4SnI5v+1ZX6tW31wiuNwoO1l1aB3IvyfrSFYAnW/Vhr5rd5bHswyf7J6+Hhqh\
naxI8Pb9vRrkB/N8E7T5EOMANdiPve3N8s2vWz8p4m5wo+y8cDWM099Yxfx8NCjfynzqlY0vIjMVtcZ4\
zlnuxsYp/JJWhdolD7fJUcJvIZfl+jawof/WgLvC9BIeC9rwJSV+VTovvgDGt5vlgLn0N6W1C6i6zaxR\
oC5TGc4CE1nMqoF6/mCV4aJLwPjWsvodULuoTHuAqlrKCjRVpymD80B5gYWsegXcfr8L/nkBFzXCPFlh\
sMx39PuSRkdCqxhVR40aVYkc2PWHEpiEv9qDZ4BcozAAwO+1zffatpndkq0p7UPTv+U929qz7bHlt5mx\
tscP55z4PIwlhgAH3jJkKj4OOKkcR5bsgSP5R2SnHDhTeCArncBDEzJyCnhpQSY+/QR+viIDr4G3KKTu\
bgrw14WUnQRBwpVIkUcXCPRZhdSoroBg6lGkJEkDInhrkYr/gyCO8ziSl68DsY70IWH6BiDg57FiJOm/\
AcgIvOCBpOibXwIxNUYkw2QGkl40WVA8qwZIm4q+jeLE+74ACmw3plG4mUc2oERXNovCOGUCVaHaD8jX\
h7yjQJ2uSqJE7vzOZ+qAjbcNX+eQC0/JPxswNT8R9BS38vF35+cB2AnZC76TQY64zu1beTeuwk67VnNl\
8V7M0tkzp0+dPHF8+f4KHDoEq3MUjwHy2w4OAAAAAElFTkSuQmCC\
';



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



// https://github.com/swagger-api/swagger-ui/blob/v2.1.3/src/main/template/main.handlebars
local.templateUiMain = '\
<!-- <div class="swggUiContainer"> -->\n\
<h2 class="eventDelegateSubmit hXxx thead" data-onevent="onEventUiReload">\n\
    <a class="td td1" href="https://github.com/kaizhu256/node-swgg" target="_blank">swgg</a>\n\
    <input\n\
        class="td td2"\n\
        placeholder="http://petstore.swagger.io/v2/swagger.json"\n\
        type="text"\n\
        value="{{urlSwaggerJson}}"\n\
    >\n\
    <input\n\
        class="td td3"\n\
        id="swggApiKeyInput1"\n\
        placeholder="api-key"\n\
        type="text"\n\
        value="{{apiKeyValue}}"\n\
    >\n\
    <button class="button eventDelegateClick td td4" data-onevent="onEventUiReload">explore</button>\n\
    <button\n\
        class="button eventDelegateClick td td5" data-onevent="onEventUiReload"\n\
        id="swggApiKeyClearButton1"\n\
    >\n\
        clear api-keys\n\
    </button>\n\
</h2>\n\
<div\n\
    class="colorError"\n\
    id="swggUiReloadErrorDiv1"\n\
    style="background: none; border: 0;"\n\
></div>\n\
<div class="eventDelegateClick info reset">\n\
    {{#if info}}\n\
    {{#if info.x-swgg-homepage}}\n\
    <h2 class="hXxx">\n\
        <a href="{{info.x-swgg-homepage}}" target="_blank">{{info.title}} ({{info.version}})</a>\n\
    </h2>\n\
    {{#unless info.x-swgg-homepage}}\n\
    <h2 class="hXxx">{{info.title}} ({{info.version}})</h2>\n\
    {{/if info.x-swgg-homepage}}\n\
    {{#if info.x-swgg-description}}\n\
    <div class="markdown">{{info.x-swgg-description markdownToHtml}}</div>\n\
    {{/if info.x-swgg-description}}\n\
    {{#if info.description}}\n\
    <div class="description markdown">{{info.description markdownToHtml}}</div>\n\
    {{/if info.description}}\n\
    {{#if x-swgg-downloadStandaloneApp}}\n\
    <a class="button" download href="{{x-swgg-downloadStandaloneApp notHtmlSafe}}">\n\
        download standalone app\n\
    </a><br>\n\
    {{/if x-swgg-downloadStandaloneApp}}\n\
    {{#if x-swgg-onEventDomDb}}\n\
    <button class="button" data-onevent="onEventDomDb" data-onevent-db="dbReset">reset database</button><br>\n\
    <button class="button" data-onevent="onEventDomDb" data-onevent-db="dbExport">export database -&gt; file</button><br>\n\
    <button class="button" data-onevent="onEventDomDb" data-onevent-db="dbImport">import database &lt;- file</button><br>\n\
    {{/if x-swgg-onEventDomDb}}\n\
    <ul>\n\
        {{#if externalDocs.url}}\n\
        <li>\n\
            <a href="{{externalDocs.url}}" target="_blank">\n\
                {{#if externalDocs.description}}\n\
                {{externalDocs.description}}\n\
                {{#unless externalDocs.description}}\n\
                external url\n\
                {{/if externalDocs.description}}\n\
            </a>\n\
        </li>\n\
        {{/if externalDocs.url}}\n\
        {{#if info.termsOfService}}\n\
        <li><a target="_blank" href="{{info.termsOfService}}">terms of service</a></li>\n\
        {{/if info.termsOfService}}\n\
        {{#if info.contact.name}}\n\
        <li>created by {{info.contact.name}}</li>\n\
        {{/if info.contact.name}}\n\
        {{#if info.contact.url}}\n\
        <li>see more at <a href="{{info.contact.url}}">{{info.contact.url}}</a></li>\n\
        {{/if info.contact.url}}\n\
        {{#if info.contact.email}}\n\
        <li>\n\
            <a\n\
                target="_parent"\n\
                href="mailto:{{info.contact.email}}?subject={{info.title}}"\n\
            >\n\
                contact the developer\n\
            </a>\n\
        </li>\n\
        {{/if info.contact.email}}\n\
        {{#if info.license}}\n\
        <li><a target="_blank" href="{{info.license.url}}">{{info.license.name}}</a></li>\n\
        {{/if info.license}}\n\
    </ul>\n\
    {{/if info}}\n\
</div>\n\
{{#if urlSwaggerJson}}\n\
<h4 class="label">nodejs initialization</h4>\n\
<pre id="swggAjaxProgressPre1" tabIndex="0">\n\
/*\n\
 * initialize nodejs swgg-client\n\
 * 1. download currently-loaded apis to file swagger.json:\n\
 *     $ curl -L -o swagger.json "{{urlSwaggerJson}}"\n\
 * 2. npm install swgg\n\
 *     $ npm install swgg\n\
 * 3. run code below to initialize nodejs swgg-client\n\
 * 4. (optional) edit file swagger.json to suit your needs\n\
 */\n\
var swgg;\n\
swgg = require("swgg");\n\
swgg.apiUpdate(require("./swagger.json"));\n\
console.log("printing currently loaded apis ...");\n\
Object.keys(swgg.apiDict).sort().forEach(function (key) {\n\
    console.log("swgg.apiDict[" + JSON.stringify(key) + "].ajax");\n\
});\n\
console.log("initialized nodejs swgg-client");\n\
</pre>\n\
<div class="color777 reset">[ <span>base url</span>: {{basePath}} ]</div>\n\
{{/if urlSwaggerJson}}\n\
<div id="swggAjaxProgressDiv1" style="text-align: center;">\n\
    <span>{{ajaxProgressText}}</span>\n\
    <div class="uiAnimateSpin" style="animation: uiAnimateSpin 2s linear infinite; border: 5px solid #999; border-radius: 50%; border-top: 5px solid #7d7; display: inline-block; height: 25px; vertical-align: middle; width: 25px;"></div>\n\
</div>\n\
<ol class="reset resourceList" style="list-style-type: upper-roman;"></ol>\n\
<div class="utility2FooterDiv">\n\
    [ this document was created with\n\
    <a href="https://github.com/kaizhu256/node-swgg" target="_blank">swgg</a>\n\
    ]\n\
</div>\n\
<!-- </div> -->\n\
';



// https://github.com/swagger-api/swagger-ui/blob/v2.1.3/src/main/template/operation.handlebars
local.templateUiOperation = '\
<div class="operation" data-_method-path="{{_methodPath}}" id="{{id}}">\n\
<div class="thead" data-onevent="onEventOperationDisplayShow" tabindex="0">\n\
    <span class="td td1"></span>\n\
    <span class="method{{_method}} td td2">{{_method}}</span>\n\
    <span\n\
        class="td td3"\n\
        {{#if deprecated}}style="text-decoration: line-through;"{{/if deprecated}}\n\
    >\n\
        {{_path}}\n\
    </span>\n\
    <span class="color777 td td4 textOverflowEllipsis">{{summary}}</span>\n\
</div>\n\
<form accept-charset="UTF-8"\n\
    class="onEventInputValidateAndAjax uiAnimateSlide"\n\
    style="border-bottom: 0; border-top: 0; margin-bottom: 0; margin-top: 0; max-height: 0; padding-bottom: 0; padding-top: 0;"\n\
>\n\
    {{#if deprecated}}\n\
    <h4 class="colorError label">(warning: deprecated)</h4><br>\n\
    {{/if deprecated}}\n\
    <h4 class="label">description</h4>\n\
    <div class="description markdown">\n\
        {{description markdownToHtml}}\n\
    </div>\n\
    {{#if parameters.length}}\n\
    <h4 class="label">parameters</h4>\n\
    <div class="borderBottom1Px color777 schemaP thead">\n\
        <span class="td td1">name and description</span>\n\
        <span class="td td2">data type</span>\n\
        <span class="td td3">value</span>\n\
        <span class="td td4">schema</span>\n\
    </div>\n\
    {{#each parameters}}\n\
    {{innerHTML notHtmlSafe}}\n\
    {{/each parameters}}\n\
    {{/if parameters.length}}\n\
    <h4 class="label">response messages</h4>\n\
    <div class="borderBottom1Px color777 schemaResponse thead">\n\
        <span class="td td1">http status code</span>\n\
        <span class="td td2">reason</span>\n\
    </div>\n\
    {{#each responseList}}\n\
    <div class="schemaResponse tr">\n\
        <span class="td td1">{{key}}</span>\n\
        <span class="markdown td td2">{{value.description markdownToHtml}}</span>\n\
    </div>\n\
    {{/each responseList}}\n\
    <button class="button" data-onevent="onEventOperationAjax">try it out!</button>\n\
    <h4 class="label">nodejs request</h4>\n\
    <pre class="requestJavascript" tabIndex="0"></pre>\n\
    <h4 class="label">curl request</h4>\n\
    <pre class="requestCurl" tabIndex="0"></pre>\n\
    <h4 class="label">response status code</h4>\n\
    <pre class="responseStatusCode" tabindex="0"></pre>\n\
    <h4 class="label">response headers</h4>\n\
    <pre class="resHeaders" tabIndex="0"></pre>\n\
    <h4 class="label">response body</h4>\n\
    <pre class="responseBody" tabIndex="0"></pre>\n\
    <div class="responseMedia"></div>\n\
</form>\n\
</div>\n\
';



// https://github.com/swagger-api/swagger-ui/blob/v2.1.3/src/main/template/param.handlebars
local.templateUiParameter = '\
<div class="schemaP tr" id="{{id}}" data-name="{{name}}">\n\
<span class="td td1">\n\
    {{name}}\n\
    {{#if required}}<br><span style="font-weight: bold;">(required)</span>{{/if required}}\n\
    {{#if description}}\n\
    <br>\n\
    <span class="color777 markdown">{{description markdownToHtml}}</span>\n\
    {{/if description}}\n\
</span>\n\
<span class="td td2">{{type2}}{{#if format2}}<br>({{format2}}){{/if format2}}</span>\n\
<span class="td td3" data-onevent="onEventInputValidateAndAjax">\n\
    {{#if isTextarea}}\n\
    <div class="multilinePlaceholderContainer">\n\
        <pre class="multilinePlaceholderPre">{{placeholder}}</pre>\n\
        <textarea\n\
            class="input multilinePlaceholderTextarea textarea" data-onevent="onEventInputTextareaChange"\n\
            data-value-text="{{valueText encodeURIComponent notHtmlSafe}}"\n\
        ></textarea>\n\
    </div>\n\
    {{/if isTextarea}}\n\
    {{#if isFile}}<input class="input" type="file">{{/if isFile}}\n\
    {{#if enum2}}\n\
    <select class="input" {{#if isSelectMultiple}}multiple{{/if isSelectMultiple}}>\n\
        {{#each selectOptionList}}\n\
        <option\n\
            data-value-select-option=\n\
                "{{valueSelectOption jsonStringify encodeURIComponent notHtmlSafe}}"\n\
            id="{{id}}"\n\
            {{selected}}\n\
        >{{placeholder}}</option>\n\
        {{/each selectOptionList}}\n\
    </select>\n\
    {{/if enum2}}\n\
    {{#if isInputNumber}}\n\
    <input\n\
        class="input"\n\
        data-value-text="{{valueText encodeURIComponent notHtmlSafe}}"\n\
        placeholder="{{placeholder}}"\n\
        type="number"\n\
    >\n\
    {{/if isInputNumber}}\n\
    {{#if isInputText}}\n\
    <input\n\
        class="input"\n\
        data-value-text="{{valueText encodeURIComponent notHtmlSafe}}"\n\
        placeholder="{{placeholder}}"\n\
        type="text"\n\
    >\n\
    {{/if isInputText}}\n\
    <div class="colorError"></div>\n\
</span>\n\
<span class="td td4">\n\
    {{#if schemaText}}<pre tabIndex="0">{{schemaText}}</pre>{{/if schemaText}}\n\
</span>\n\
</div>\n\
';



local.templateUiRequestJavascript = '\
/*\n\
 * reproduce api-call {{option.api._methodPath jsonStringify}}\n\
 * 1. initialize nodejs swgg-client from previous step\n\
 * 2. run code below to reproduce api-call\n\
 */\n\
swgg.apiDict[{{option.api._methodPath jsonStringify}}].ajax({{optionJson}}, \
function (error, data) {\n\
    if (error) {\n\
        console.error(error);\n\
        return;\n\
    }\n\
    console.log(data.responseJson || data.responseText);\n\
}\
);\n\
';



// https://github.com/swagger-api/swagger-ui/blob/v2.1.3/src/main/template/resource.handlebars
local.templateUiResource = '\
<li\n\
    class="eventDelegateChange eventDelegateClick eventDelegateKeyup eventDelegateSubmit resource"\n\
    data-name="{{name}}"\n\
    id="{{id}}"\n\
>\n\
<h3 class="thead">\n\
    <span class="td td1 textOverflowEllipsis" data-onevent="onEventResourceDisplayAction" tabindex="0">\n\
        {{name}}:&nbsp;&nbsp;{{summary}}\n\
    </span>\n\
    <span class="td td2" data-onevent="onEventResourceDisplayAction" tabindex="0">\n\
    expand / collapse operations\n\
    </span>\n\
</h3>\n\
<ol\n\
    class="operationList uiAnimateSlide"\n\
    style="border-bottom: 0; border-top: 0; margin-bottom: 0; margin-top: 0; max-height: 0; padding-bottom: 0; padding-top: 0;"\n\
>\n\
    <div class="description markdown">{{description markdownToHtml}}</div>\n\
</ol>\n\
</li>\n\
';



local.templateUiTitle = '\
{{#if info.title}}\n\
{{#if info.version}}\n\
{{info.title}} ({{info.version}})\n\
{{#unless info.version}}\n\
{{info.title}}\n\
{{/if info.version}}\n\
{{#unless info.title}}\n\
swgg\n\
{{/if info.title}}\n\
';



/* validateLineSortedReset */
local.assetsDict["/assets.swgg.html"] = local.assetsDict["/assets.utility2.template.html"]
    .replace("assets.utility2.template.html", "")
    .replace((/<title>.*?<\/title>/), "<title>swgg</title>")
    .replace("\n<!-- utility2-comment\n", "\n")
    .replace("\n</style>\n", '\
\n\
</style>\n\
<style>\n\
/* jslint utility2:true */\n\
/*csslint\n\
*/\n\
/* csslint ignore:start */\n\
.swggUiContainer,\n\
.swggUiContainer * {\n\
    border: 0;\n\
    border-radius: 0;\n\
    margin: 0;\n\
    max-width: 100%;\n\
    padding: 0;\n\
}\n\
.swggUiContainer pre,\n\
.swggUiContainer .operation > .thead:focus,\n\
.swggUiContainer .resource > .thead > .td:focus {\n\
    outline: none;\n\
}\n\
.swggUiContainer .description > * {\n\
    margin-top: 20px;\n\
}\n\
.swggUiContainer .description > *:first-child {\n\
    margin-top: 0;\n\
}\n\
/* csslint ignore:end */\n\
/* validateLineSortedReset */\n\
/* general */\n\
.swggUiContainer code,\n\
.swggUiContainer pre,\n\
.swggUiContainer textarea {\n\
    line-height: 1.25rem;\n\
    max-height: 50rem;\n\
    overflow: auto;\n\
}\n\
.swggUiContainer input,\n\
.swggUiContainer pre,\n\
.swggUiContainer textarea {\n\
    min-height: 1.5rem;\n\
}\n\
.swggUiContainer pre {\n\
    white-space: pre;\n\
}\n\
.swggUiContainer .button,\n\
.swggUiContainer .operation > .thead,\n\
.swggUiContainer .resource > .thead {\n\
    cursor: pointer;\n\
}\n\
.swggUiContainer .button,\n\
.swggUiContainer .operation > .thead > .td3,\n\
.swggUiContainer .resource > .thead > .td {\n\
    font-weight: bold;\n\
    text-decoration: underline;\n\
}\n\
.swggUiContainer .markdown pre {\n\
    max-height: none;\n\
}\n\
.swggUiContainer .multilinePlaceholderContainer {\n\
    min-height: 10rem;\n\
    position: relative;\n\
}\n\
.swggUiContainer .multilinePlaceholderPre {\n\
    position: absolute;\n\
    white-space: pre;\n\
}\n\
.swggUiContainer .multilinePlaceholderTextarea {\n\
    position: absolute;\n\
}\n\
.swggUiContainer .operation > .thead > .td1 {\n\
    text-align: left;\n\
    width: 2rem;\n\
}\n\
.swggUiContainer .operation > .thead > .td2 {\n\
    text-align: center;\n\
    width: 5rem;\n\
}\n\
.swggUiContainer .resBody,\n\
.swggUiContainer .resHeaders,\n\
.swggUiContainer .resStatusCode {\n\
    font-weight: bold;\n\
}\n\
.swggUiContainer .schemaP pre,\n\
.swggUiContainer .schemaP select[multiple],\n\
.swggUiContainer .schemaP textarea,\n\
.swggUiContainer .schemaP .multilinePlaceholderContainer {\n\
    height: 10rem;\n\
}\n\
.swggUiContainer .schemaP > .td3 {\n\
    overflow: visible;\n\
}\n\
.swggUiContainer .td {\n\
    overflow: auto;\n\
    overflow-wrap: break-word;\n\
}\n\
.swggUiContainer .td input,\n\
.swggUiContainer .td pre,\n\
.swggUiContainer .td select,\n\
.swggUiContainer .td textarea {\n\
    width: 100%;\n\
}\n\
.swggUiContainer .zeroPixel {\n\
    border: 0;\n\
    height: 0;\n\
    margin: 0;\n\
    padding: 0;\n\
    width: 0;\n\
}\n\
/* validateLineSortedReset */\n\
/* background */\n\
.swggUiContainer code,\n\
.swggUiContainer pre {\n\
    background: #ddd;\n\
}\n\
.swggUiContainer .button {\n\
    background: #ddf;\n\
}\n\
.swggUiContainer .description {\n\
    background: #bdb;\n\
}\n\
.swggUiContainer .methodDELETE {\n\
    background: #b07;\n\
}\n\
.swggUiContainer .methodGET {\n\
    background: #373;\n\
}\n\
.swggUiContainer .methodHEAD {\n\
    background: #7b7;\n\
}\n\
.swggUiContainer .methodOPTIONS {\n\
    background: #777;\n\
}\n\
.swggUiContainer .methodPATCH {\n\
    background: #99f;\n\
}\n\
.swggUiContainer .methodPOST {\n\
    background: #33d;\n\
}\n\
.swggUiContainer .methodPUT {\n\
    background: #77d;\n\
}\n\
.swggUiContainer .multilinePlaceholderPre {\n\
    background: #fff;\n\
}\n\
.swggUiContainer .operation {\n\
    background: #dfd;\n\
}\n\
.swggUiContainer .resource > .thead,\n\
.swggUiContainer > .thead {\n\
    background: #7b7;\n\
}\n\
.swggUiContainer > .info > .button {\n\
    width: 20rem;\n\
}\n\
.swggUiContainer > .thead > .td1 {\n\
    background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAqRJREFUeNrEVz1s00AUfnGXii5maMXoEUEHVwIpEkPNgkBdMnQoU5ytiKHJwpp2Q2JIO8DCUDOxIJFIVOoWZyJSh3pp1Q2PVVlcCVBH3ufeVZZ9Zye1Ay86nXV+ue/9fO/lheg/Se02X1rvksmbnTiKvuxQMBNgBnN4a/LCbmnUAP6JV58NCUsBC8CuAJxGPF47OgNqBaA93tolUhnx6jC4NxGwyOEwlccyAs+3kwdzKq0HDn2vEBTi8J2XpyMaywNDE157BhXUE3zJhlq8GKq+Zd2zaWHepPA8oN9XkfLmRdOiJV4XUUg/IyWncLjCYY/SHndV2u7zHr3bPKZtdxgboJOnthvrfGj/oMf3G0r7JVmNlLfKklmrt2MvvcNO7LFOhoFHfuAJI5o6ta10jpt5CQLgwXhXG2YIwvu+34qf78ybOjWTnWwkgR36d7JqJOrW0hHmNrKg9xhiS4+1jFmrxymh03B0w+6kURIAu3yHtOD5oaUNojMnGgbcctNvwdAnyxvxRR+/vaJnjzbpzcZX+nN1SdGv85i9eH8w3qPO+mdm/y4dnQ1iI8Fq6Nf4cxL6GWSjiFDSs0VRnxC5g0xSB2cgHpaseTxfqOv5uoHkNQ6Ha/N1Yz9mNMppEkEkYKj79q6uCq4bCHcSX3fJ0Vk/k9siASjCm1N6gZH6Ec9IXt2WkFES2K/ixoIyktJPAu/ptOA1SgO5zqtr6KASJPF0nMV8dgMsRhRPOcMwqQAOoi0VAIMLAEWJ6YYC1c8ibj1GP51RqwzYwZVMHQuvOzMCBUtb2tGHx5NAdLKqp5AX7Ng4d+Zi8AGDI9z1ijx9yaCH04y3GCP2S+QcvaGl+pcxyUBvinFlawoDQjHSelX8hQEoIrAq8p/mgC88HOS1YCl/BRgAmiD/1gn6Nu8AAAAASUVORK5CYII=) no-repeat left center;\n\
}\n\
/* validateLineSortedReset */\n\
/* border */\n\
.swggUiContainer input,\n\
.swggUiContainer pre,\n\
.swggUiContainer select,\n\
.swggUiContainer textarea {\n\
    border: 1px solid #999;\n\
}\n\
.swggUiContainer .borderBottom1Px {\n\
    border-bottom: 1px solid #777;\n\
}\n\
.swggUiContainer .button {\n\
    border: 1px solid #35b;\n\
    border-radius: 5px;\n\
}\n\
.swggUiContainer .resource > .thead > .td2 {\n\
    border-left: 1px solid #333;\n\
}\n\
/* validateLineSortedReset */\n\
/* color */\n\
.swggUiContainer a,\n\
.swggUiContainer .button,\n\
.swggUiContainer .operation > .thead,\n\
.swggUiContainer .resource > .thead {\n\
    color: #35b;\n\
}\n\
.swggUiContainer code {\n\
    color: #333;\n\
}\n\
.swggUiContainer .color777 {\n\
    color: #777;\n\
}\n\
.swggUiContainer .label {\n\
    color: #373;\n\
}\n\
.swggUiContainer .multilinePlaceholderPre {\n\
    color: #999;\n\
}\n\
.swggUiContainer .operation > .thead > .td2,\n\
.swggUiContainer .resource > .thead,\n\
.swggUiContainer > .thead > .td1 {\n\
    color: #fff;\n\
}\n\
.swggUiContainer .thead,\n\
.swggUiContainer .tr {\n\
    display: flex;\n\
}\n\
/* validateLineSortedReset */\n\
/* flex */\n\
.swggUiContainer .operation > .thead > .td3 {\n\
    flex: 1;\n\
}\n\
.swggUiContainer .operation > .thead > .td4 {\n\
    flex: 1;\n\
}\n\
.swggUiContainer .resource > .thead > .td1 {\n\
    flex: 1;\n\
}\n\
.swggUiContainer .schemaP > .td1 {\n\
    flex: 2;\n\
}\n\
.swggUiContainer .schemaP > .td2 {\n\
    flex: 1;\n\
}\n\
.swggUiContainer .schemaP > .td3 {\n\
    flex: 4;\n\
}\n\
.swggUiContainer .schemaP > .td4 {\n\
    flex: 3;\n\
}\n\
.swggUiContainer .schemaResponse > .td1 {\n\
    flex: 1;\n\
}\n\
.swggUiContainer .schemaResponse > .td2 {\n\
    flex: 4;\n\
}\n\
.swggUiContainer > .thead > .td2 {\n\
    flex: 4;\n\
}\n\
.swggUiContainer > .thead > .td3 {\n\
    flex: 1;\n\
}\n\
/* validateLineSortedReset */\n\
/* margin */\n\
.swggUiContainer li {\n\
    margin-top: 10px;\n\
}\n\
.swggUiContainer ol,\n\
.swggUiContainer ul,\n\
.swggUiContainer .td {\n\
    margin-left: 20px;\n\
}\n\
.swggUiContainer .description,\n\
.swggUiContainer .label,\n\
.swggUiContainer .operation,\n\
.swggUiContainer .operation > form > div,\n\
.swggUiContainer .operation > form > pre,\n\
.swggUiContainer .resource,\n\
.swggUiContainer > div,\n\
.swggUiContainer > ol,\n\
.swggUiContainer > pre,\n\
.swggUiContainer > .info > div,\n\
.swggUiContainer > .info > ul,\n\
.swggUiContainer > .info > .button,\n\
.swggUiContainer > .info > .hXxx {\n\
    margin-top: 20px;\n\
}\n\
.swggUiContainer .label {\n\
    margin-bottom: -19px;\n\
}\n\
.swggUiContainer .operation > form > .button {\n\
    margin: 40px 0 20px 0;\n\
}\n\
.swggUiContainer .resource > ol,\n\
.swggUiContainer .resource > .thead > .td,\n\
.swggUiContainer .td:first-child,\n\
.swggUiContainer > ol {\n\
    margin-left: 0;\n\
}\n\
.swggUiContainer .resource > ol > .description {\n\
    margin-top: 0;\n\
}\n\
/* validateLineSortedReset */\n\
/* padding */\n\
.swggUiContainer code {\n\
    padding: 2px;\n\
}\n\
.swggUiContainer input {\n\
    padding: 0 5px;\n\
}\n\
.swggUiContainer pre,\n\
.swggUiContainer textarea {\n\
    padding: 5px;\n\
}\n\
.swggUiContainer .button,\n\
.swggUiContainer .resource > .thead > .td,\n\
.swggUiContainer > .thead {\n\
    padding: 10px 20px;\n\
}\n\
.swggUiContainer .description {\n\
    padding: 20px;\n\
}\n\
.swggUiContainer .operation > form {\n\
    padding: 0 20px;\n\
}\n\
.swggUiContainer .operation > form .td1 {\n\
    padding-left: 0;\n\
}\n\
.swggUiContainer .operation > .thead {\n\
    padding: 0 20px;\n\
}\n\
.swggUiContainer .operation > .thead > .td {\n\
    padding: 10px 0;\n\
}\n\
.swggUiContainer > .thead > .td1 {\n\
    padding-left: 40px;\n\
    padding-top: 4px;\n\
}\n\
/* validateLineSortedReset */\n\
/* .textOverflowEllipsis */\n\
.swggUiContainer .textOverflowEllipsis {\n\
    overflow: hidden;\n\
    text-overflow: ellipsis;\n\
    white-space: nowrap;\n\
}\n\
/* validateLineSortedReset */\n\
/* @media */\n\
@media screen and (max-width: 640px) {\n\
    .swggUiContainer .operation {\n\
        font-size: small;\n\
    }\n\
    .swggUiContainer .resource > .thead > .td {\n\
        flex: 1;\n\
    }\n\
    .swggUiContainer > .thead {\n\
        display: block;\n\
        padding: 0;\n\
    }\n\
    .swggUiContainer > .thead > .td {\n\
        display: block;\n\
        margin: 0;\n\
        width: 100%;\n\
    }\n\
}\n\
/* validateLineSortedReset */\n\
/* hover */\n\
.swggUiContainer a:hover,\n\
.swggUiContainer .resource > .thead > .td:hover,\n\
.swggUiContainer > .thead > .td1:hover {\n\
    color: #037;\n\
}\n\
.swggUiContainer .button:hover,\n\
.swggUiContainer .operation > .thead:hover {\n\
    background: #bbf;\n\
}\n\
/* validateLineSortedReset */\n\
/* error */\n\
.swggUiContainer button.hasError,\n\
.swggUiContainer pre.hasError,\n\
.swggUiContainer textarea.hasError {\n\
    background: #fbb;\n\
}\n\
.swggUiContainer input.hasError,\n\
.swggUiContainer select.hasError {\n\
    border: 5px solid #d00;\n\
}\n\
</style>\n\
')
    .replace((/\n<\/script>\n[\S\s]*\n<\/html>\n/), '\
\n\
</script>\n\
<div class="swggUiContainer" style="margin: 0 auto; max-width: 1200px;">\n\
' + local.templateRender(local.templateUiMain, {
    ajaxProgressText: "loading script",
    apiKeyValue: "",
    urlSwaggerJson: ""
}) + '\
</div>\n\
<script>\n\
/* jslint utility2:true */\n\
// init domOnEventMediaHotkeys\n\
(function () {\n\
/*\n\
 * this function will add media-hotkeys to elements\n\
 * with class=".domOnEventMediaHotkeysInit"\n\
 */\n\
    "use strict";\n\
    var currentTarget;\n\
    var identity;\n\
    var input;\n\
    var onEvent;\n\
    if (window.domOnEventMediaHotkeys) {\n\
        return;\n\
    }\n\
    identity = function (value) {\n\
    /*\n\
     * this function will return <value>\n\
     */\n\
        return value;\n\
    };\n\
    window.domOnEventMediaHotkeys = function (event) {\n\
        var media;\n\
        if (event === "init") {\n\
            Array.from(document.querySelectorAll(\n\
                ".domOnEventMediaHotkeysInit"\n\
            )).forEach(function (media) {\n\
                media.classList.remove("domOnEventMediaHotkeysInit");\n\
                media.classList.add("domOnEventMediaHotkeys");\n\
                ["play", "pause", "seeking"].forEach(function (event) {\n\
                    media.addEventListener(event, onEvent);\n\
                });\n\
            });\n\
            return;\n\
        }\n\
        if (event.currentTarget.classList.contains("domOnEventMediaHotkeys")) {\n\
            currentTarget = event.currentTarget;\n\
            input.focus();\n\
            return;\n\
        }\n\
        media = currentTarget;\n\
        try {\n\
            switch (event.key || event.type) {\n\
            case ",":\n\
            case ".":\n\
                media.currentTime += (\n\
                    event.key === "," && identity(-0.03125)\n\
                ) || 0.03125;\n\
                break;\n\
            case "<":\n\
            case ">":\n\
                media.playbackRate *= (\n\
                    event.key === "<" && identity(0.5)\n\
                ) || 2;\n\
                break;\n\
            case "ArrowDown":\n\
            case "ArrowUp":\n\
                media.volume += (\n\
                    event.key === "ArrowDown" && identity(-0.05)\n\
                ) || 0.05;\n\
                break;\n\
            case "ArrowLeft":\n\
            case "ArrowRight":\n\
                media.currentTime += (\n\
                    event.key === "ArrowLeft" && identity(-5)\n\
                ) || 5;\n\
                break;\n\
            case "j":\n\
            case "l":\n\
                media.currentTime += (event.key === "j" && identity(-10)) || 10;\n\
                break;\n\
            case "k":\n\
            case " ":\n\
                if (media.paused) {\n\
                    media.play();\n\
                } else {\n\
                    media.pause();\n\
                }\n\
                break;\n\
            case "m":\n\
                media.muted = !media.muted;\n\
                break;\n\
            default:\n\
                if (event.key >= 0) {\n\
                    media.currentTime = 0.1 * event.key * media.duration;\n\
                    break;\n\
                }\n\
                return;\n\
            }\n\
        } catch (ignore) {}\n\
        event.preventDefault();\n\
    };\n\
    onEvent = window.domOnEventMediaHotkeys;\n\
    input = document.createElement("button");\n\
    input.style = (\n\
        "border:0;height:0;margin:0;padding:0;position:fixed;width:0;"\n\
        + "z-index:-1;"\n\
    );\n\
    input.addEventListener("click", onEvent);\n\
    input.addEventListener("keydown", onEvent);\n\
    document.body.appendChild(input);\n\
    onEvent("init");\n\
}());\n\
\n\
\n\
\n\
document.querySelector(\n\
    ".swggUiContainer > .thead > .td2"\n\
).value = ((\n\
    /\\bmodeSwaggerJsonUrl=([^&]+)|$/gm\n\
).exec(location.search)[1] || "assets.swgg.swagger.json");\n\
</script>\n\
<script src="assets.utility2.rollup.js"></script>\n\
<script>\n\
/* jslint utility2:true */\n\
window.local = window.local || window.swgg;\n\
window.swgg.uiEventListenerDict.onEventUiReload({\n\
    swggInit: true\n\
});\n\
</script>\n\
<!-- swgg-script-extra-begin -->\n\
<!-- swgg-script-extra-end -->\n\
</body>\n\
</html>\n\
');
/* jslint ignore:end */
local.assetsDict["/assets.swgg.swagger.schema.json"] = local.jsonStringifyOrdered(
    local.objectSetOverride(
        JSON.parse(local.assetsDict["/assets.swgg.json-schema.json"].replace((
            /"\$ref":".*?#/g
        ), "\"$ref\":\"http://json-schema.org/draft-04/schema#")),
        JSON.parse(local.assetsDict["/assets.swgg.schema.json"].replace((
            /"\$ref":".*?#/g
        ), "\"$ref\":\"http://json-schema.org/draft-04/schema#")),
        2
    )
);
local.swaggerSchemaJson = JSON.parse(local.assetsDict["/assets.swgg.swagger.schema.json"]);
}());



// run shared js-env code - function
(function () {
local.apiAjax = function (that, option, onError) {
/*
 * this function will send a swagger-api ajax-request with the operation that
 */
    var tmp;
    local.objectSetDefault(option, {
        data: "",
        operation: that,
        paramDict: {},
        url: ""
    });
    if (option.modeDefault) {
        local.normalizeSwaggerParamDict(option);
    }
    // try to validate paramDict
    option.error = local.swaggerValidateDataParameters({
        // normalize paramDict
        data: local.normalizeSwaggerParamDict({
            modeNoDefault: option.modeNoDefault,
            operation: that,
            paramDict: local.jsonCopy(option.paramDict)
        }).paramDict,
        dataReadonlyRemove: option.paramDict,
        prefix: ["operation", that._methodPath],
        parameters: that.parameters,
        swaggerJson: local.swaggerJson
    })[0];
    // init option-defaults
    local.objectSetDefault(option, {
        inForm: (
            // ternary-condition
            that._consumes0 === "multipart/form-data"
            ? new local.FormData()
            : ""
        ),
        inHeader: {},
        inPath: that._path.replace((
            /#.*?$/
        ), ""),
        inQuery: "",
        headers: {},
        method: that._method,
        responseType: (
            // ternary-condition
            that._consumes0.indexOf("application/octet-stream") === 0
            ? "arraybuffer"
            : ""
        )
    });
    // init paramDict
    that.parameters.forEach(function (schemaP) {
        tmp = option.paramDict[schemaP.name];
        if (local.isNullOrUndefined(tmp)) {
            return;
        }
        // serialize array
        if (Array.isArray(tmp) && schemaP.in !== "body") {
            switch (schemaP.collectionFormat || schemaP["x-swgg-collectionFormat"]) {
            case "json":
                tmp = JSON.stringify(tmp);
                break;
            case "multi":
                tmp.forEach(function (value) {
                    option[(
                        // ternary-condition
                        schemaP.in === "formData"
                        ? "inForm"
                        : "inQuery"
                    )] += (
                        "&" + encodeURIComponent(schemaP.name) + "="
                        + encodeURIComponent(
                            local.schemaPItemsType(schemaP) === "string"
                            ? value
                            : JSON.stringify(value)
                        )
                    );
                });
                return;
            case "pipes":
                tmp = tmp.join("|");
                break;
            case "ssv":
                tmp = tmp.join(" ");
                break;
            case "tsv":
                tmp = tmp.join("\t");
                break;
            // default to csv
            default:
                tmp = tmp.join(",");
            }
        } else if (typeof tmp !== "string" && !(tmp && tmp.constructor === local.Blob)) {
            tmp = JSON.stringify(tmp);
        }
        switch (schemaP.in) {
        case "body":
            option.inBody = tmp;
            break;
        case "formData":
            switch (that._consumes0) {
            case "application/xml":
                // init xml header
                if (!option.inForm) {
                    option.inForm += "<?xml version=\"1.0\"?>";
                }
                option.inForm += (
                    "\n<" + schemaP.name + ">" + "<![CDATA["
                    + tmp.replace((
                        /\]\]>/g
                    ), "]]&#x3e;") + "]]></" + schemaP.name + ">"
                );
                break;
            case "multipart/form-data":
                option.inForm.append(schemaP.name, tmp, tmp && tmp.name);
                break;
            default:
                if (option.inForm) {
                    option.inForm += "&";
                }
                option.inForm += (
                    encodeURIComponent(schemaP.name) + "="
                    + encodeURIComponent(tmp)
                );
            }
            break;
        case "header":
            option.inHeader[encodeURIComponent(schemaP.name.toLowerCase())] = tmp;
            break;
        case "path":
            option.inPath = option.inPath
            .replace("{" + schemaP.name + "}", encodeURIComponent(tmp));
            break;
        case "query":
            option.inQuery += (
                "&" + encodeURIComponent(schemaP.name) + "="
                + encodeURIComponent(tmp)
            );
            break;
        }
    });
    // init data
    option.data = option.inBody || option.inForm;
    // init headers
    local.objectSetOverride(option.headers, option.inHeader);
    // init headers - Content-Type
    option.headers["Content-Type"] = that._consumes0;
    // init headers - Authorization
    option.jwtEncrypted = option.jwtEncrypted || local.userJwtEncrypted;
    if (option.jwtEncrypted) {
        option.headers.Authorization = (
            option.headers.Authorization
            || "Bearer " + option.jwtEncrypted
        );
    }
    // init url
    option.url = "";
    option.url += (
        local.identity(that["x-swgg-schemes"] || local.swaggerJson.schemes || [])[0]
        || local.urlParse("").protocol.slice(0, -1)
    );
    option.url += "://";
    option.url += that["x-swgg-host"] || local.swaggerJson.host || local.urlParse("").host;
    option.url += local.swaggerJsonBasePath;
    option.url += option.inPath + "?" + option.inQuery.slice(1);
    option.url = option.url.replace((
        /\?$/
    ), "");
    if (option.modeAjax === "validate" || (option.error && option.modeAjax !== "ajax")) {
        onError(option.error);
        return;
    }
    option.error = null;
    // send ajax-request
    return local.ajax(option, function (error, xhr) {
        // try to init responseJson
        local.tryCatchOnError(function () {
            xhr.responseJson = JSON.parse(xhr.responseText);
        }, local.nop);
        // init userJwtEncrypted
        local.userJwtEncrypted = (
            xhr.resHeaders["swgg-jwt-encrypted"]
            || local.userJwtEncrypted
        );
        onError(error, xhr);
    });
};

local.apiUpdate = function (swaggerJson) {
/*
 * this function will update the swagger-api dict of api-calls
 */
    var pathDict;
    var tmp;
    swaggerJson = swaggerJson || {};
    // normalize swaggerJson
    swaggerJson = local.normalizeSwaggerJson(swaggerJson, {
        objectSetDescription: function (dict) {
            if (typeof dict === "object" && dict && !dict.$ref) {
                if (Array.isArray(dict["x-swgg-descriptionLineList"])) {
                    dict.description = dict["x-swgg-descriptionLineList"].join("\n");
                }
                if (!(dict === swaggerJson.externalDocs || dict === swaggerJson.info)) {
                    dict.description = dict.description || "no description";
                }
            }
        }
    });
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
            "title": "swgg api",
            "version": "0.0.1"
        },
        "paths": {},
        "securityDefinitions": {},
        "swagger": "2.0",
        "tags": []
    };
    // save tags
    tmp = {};
    [local.swaggerJson.tags, swaggerJson.tags].forEach(function (tagList) {
        tagList.forEach(function (tag) {
            tmp[tag.name] = local.objectSetOverride(tmp[tag.name], tag);
        });
    });
    local.swaggerJson["x-swgg-tagNameList"] = Object.keys(tmp).sort();
    tmp = local.swaggerJson["x-swgg-tagNameList"].map(function (key) {
        return tmp[key];
    });
    // merge swaggerJson into local.swaggerJson
    swaggerJson = local.objectSetOverride(local.swaggerJson, swaggerJson, 10);
    // restore tags
    local.swaggerJson.tags = tmp;
    // init swaggerJsonBasePath
    local.swaggerJsonBasePath = (
        local.swaggerJson.basePath === "/"
        ? ""
        : local.swaggerJson.basePath
    );
    Object.keys(swaggerJson.definitions).forEach(function (schemaName) {
        swaggerJson.definitions[schemaName] = local.jsonCopy(
            local.swaggerValidateDataSchema({
                // dereference definition
                modeDereference: true,
                prefix: ["swaggerJson", "definitions", schemaName],
                schema: swaggerJson.definitions[schemaName],
                swaggerJson: local.swaggerJson
            })
        );
        tmp = swaggerJson.definitions[schemaName];
        (tmp.allOf || []).forEach(function (element) {
            local.objectSetDefault(tmp, local.jsonCopy(local.swaggerValidateDataSchema({
                // dereference definition.allOf
                modeDereference: true,
                prefix: ["swaggerJson", "definitions", schemaName, "allOf"],
                schema: element,
                swaggerJson: local.swaggerJson
            })), 2);
        });
        delete tmp.allOf;
    });
    // init apiDict from paths
    Object.keys(swaggerJson.paths).forEach(function (path) {
        Object.keys(swaggerJson.paths[path]).forEach(function (method) {
            var that;
            that = local.jsonCopy(swaggerJson.paths[path][method]);
            that._method = method.toUpperCase();
            that._path = path;
            tmp = "operationId." + that.operationId;
            local.apiDict[tmp] = local.objectSetOverride(local.apiDict[tmp], that);
        });
    });
    // init apiDict from x-swgg-apiDict
    Object.keys(swaggerJson["x-swgg-apiDict"] || {}).forEach(function (key) {
        local.apiDict[key] = local.objectSetOverride(
            local.apiDict[key],
            local.jsonCopy(swaggerJson["x-swgg-apiDict"][key])
        );
    });
    // init apiDict
    Object.keys(local.apiDict).forEach(function (key) {
        var that;
        if (key.indexOf("operationId.") !== 0) {
            return;
        }
        key = key.split(".");
        that = local.apiDict[key.join(".")];
        // init operationId
        that.operationId = that.operationId || key.slice(1).join(".");
        // init _crudType
        that._crudType = that._crudType || key.slice(2);
        that._crudType[0] = that._crudType[0] || that.operationId;
        // init _fileUploadNumber
        that._fileUploadNumber = Number(
            that._crudType[0] === "fileUploadManyByForm" && that._crudType[1]
        ) || 1;
        // init _idBackend and _idName
        tmp = local.idNameInit({
            crudType: that._crudType
        });
        that._idBackend = tmp.idBackend;
        that._idName = tmp.idName;
        // init tags
        that.tags = that.tags || [];
        that.tags[0] = that.tags[0] || key[1];
        // init templateApiDict
        if (local.templateApiDict[that._crudType[0]]) {
            local.objectSetDefault(
                that,
                JSON.parse(local.templateApiDict[that._crudType[0]]
                .replace((
                    /\{\{_fileUploadNumber\}\}/g
                ), that._fileUploadNumber)
                .replace((
                    /\{\{_idBackend\}\}/g
                ), that._idBackend)
                .replace((
                    /\{\{_idName\}\}/g
                ), that._idName)
                .replace((
                    /\{\{_operationId\}\}/g
                ), that.operationId)
                .replace((
                    /\{\{_schemaName\}\}/g
                ), that._schemaName)
                .replace((
                    /\{\{_tags0\}\}/g
                ), that.tags[0]))
            );
        }
        // init default
        local.objectSetDefault(that, {
            _schemaPDict: {},
            consumes: [],
            parameters: [],
            responses: {
                "200": {
                    description: "ok - " + "http://jsonapi.org/format/#document-top-level",
                    schema: {
                        $ref: "#/definitions/BuiltinJsonapiResponse"
                    }
                }
            },
            tags: []
        });
        // init _consumes0
        tmp = that["x-swgg-consumes0"] || (that.consumes && that.consumes[0]);
        that.parameters.some(function (schemaP) {
            tmp = tmp || (
                schemaP.in === "body"
                && schemaP.schema.type === "string"
                && local.identity("text/plain")
            );
            return tmp;
        });
        that._consumes0 = tmp || "application/json";
        // init _methodPath
        that._methodPath = that._method + " " + that._path.replace((
            /\{.*?\}/g
        ), "{}");
        that.parameters.forEach(function (schemaP) {
            // dereference schemaP
            String(schemaP["x-swgg-$ref"] || schemaP.$ref).replace((
                /#\/parameters\/(.+?$)/m
            ), function (ignore, match1) {
                local.objectSetDefault(
                    schemaP,
                    local.jsonCopy(swaggerJson.parameters[match1])
                );
                delete schemaP.$ref;
            });
            // init _idName.format and _idName.type
            if (that._schemaName && schemaP.name === that._idName) {
                schemaP.format = swaggerJson.definitions[that._schemaName]
                .properties[that._idBackend].format;
                schemaP.type = local.schemaPType(swaggerJson.definitions[that._schemaName]
                .properties[that._idBackend]);
            }
            // init _schemaPDict
            that._schemaPDict[schemaP.name] = schemaP;
        });
        // init required
        [
            that["x-swgg-notRequired"],
            that["x-swgg-required"]
        ].forEach(function (element, ii) {
            (element || []).forEach(function (name) {
                that._schemaPDict[name].required = Boolean(ii);
            });
        });
        switch (that._crudType[0]) {
        // add extra file-upload forms
        case "fileUploadManyByForm":
            tmp = 1;
            while (tmp <= that._fileUploadNumber) {
                that.parameters[tmp] = local.jsonCopy(that.parameters[1]);
                that.parameters[tmp].name = "file" + tmp;
                tmp += 1;
            }
            break;
        }
        // update apiDict
        that = local.jsonCopy(that);
        local.apiDict[key.join(".")] = that;
        local.apiDict[that._methodPath] = that;
        // init ajax
        that.ajax = function (swaggerJson, onError) {
            return local.apiAjax(that, swaggerJson, onError);
        };
        that._ajaxToString = (
            that.ajax.toString()
            .replace("{", (
                "{\n"
                + "/*\n"
                + " * this function will run the api-call "
                + JSON.stringify(that._methodPath) + "\n"
                + " * example usage:" + (
                    "\n"
                    + "swgg.apiDict[" + JSON.stringify(key.join(".")) + "].ajax("
                    + JSON.stringify(local.normalizeSwaggerParamDict({
                        modeDefault: true,
                        operation: that,
                        paramDict: {}
                    }).paramDict, null, 4)
                    + ", function (error, data) {\n"
                    + "    if (error) {\n"
                    + "        console.error(error);\n"
                    + "        return;\n"
                    + "    }\n"
                    + "    console.log(data.responseJson || data.responseText);\n"
                    + "});"
                ).replace((
                    /\n/g
                ), "\n    ") + "\n */"
            )
                .replace((
                /\n/g
            ), "\n                "))
        );
        that.ajax.toString = function () {
            return that._ajaxToString;
        };
        // remove underscored keys from that
        tmp = local.jsonCopy(that);
        Object.keys(tmp).forEach(function (key) {
            if (key[0] === "_") {
                tmp[key] = undefined;
            }
        });
        // update paths
        pathDict = {};
        pathDict[that._path] = {};
        pathDict[that._path][that._method.toLowerCase()] = tmp;
        local.objectSetOverride(swaggerJson, {
            paths: pathDict
        }, 3);
    });
    // normalize swaggerJson
    local.swaggerJson = JSON.parse(local.jsonStringifyOrdered(swaggerJson));
    // try to validate swaggerJson
    local.tryCatchOnError(function () {
        local.swaggerValidate(local.swaggerJson);
    }, local.onErrorDefault);
    // init corsForwardProxyHost
    local.corsForwardProxyHost = (
        local.corsForwardProxyHost
        || local.swaggerJson["x-swgg-corsForwardProxyHost"]
    );
    // init assets.swgg.swagger.server.json
    local.assetsDict["/assets.swgg.swagger.server.json"] = JSON.stringify(
        local.swaggerJson
    );
};

local.dbFieldRandomCreate = function (option) {
/*
 * this function will create a random dbField from <option>.schemaP
 */
    var depth;
    var ii;
    var max;
    var min;
    var schemaP;
    var value;
    depth = (
        Number.isFinite(option.depth)
        ? option.depth
        : 3
    );
    schemaP = option.schemaP;
    schemaP = schemaP.schema || schemaP;
    if (schemaP.readOnly) {
        return;
    }
    // init default-value
    if (option.modeNotRandom && !local.isNullOrUndefined(schemaP.default)) {
        return local.jsonCopy(schemaP.default);
    }
    // init enum-value
    if (schemaP.enum) {
        value = (
            option.modeNotRandom
            ? schemaP.enum[0]
            : local.listGetElementRandom(schemaP.enum)
        );
        return (
            local.schemaPType(schemaP) === "array"
            ? [value]
            : value
        );
    }
    // init default-value
    value = null;
    switch (local.schemaPType(schemaP)) {
    // 5.3. Validation keywords for arrays
    case "array":
        if (depth <= 0) {
            break;
        }
        value = [];
        ii = 0;
        while (ii < Math.min(
            // 5.3.2. maxItems
            schemaP.maxItems || 2,
            // 5.3.3. minItems
            schemaP.minItems || 2,
            // 5.3.4. uniqueItems
            schemaP.uniqueItems
            ? 2
            : 1
        )) {
            // recurse dbFieldRandomCreate
            value.push(local.dbFieldRandomCreate({
                depth: depth - 1,
                modeNotRandom: option.modeNotRandom,
                schemaP: local.schemaPItems(schemaP)
            }));
            ii += 1;
        }
        break;
    case "boolean":
        value = (
            option.modeNotRandom
            ? false
            : Boolean(Math.random() > 0.5)
        );
        break;
    // 5.1. Validation keywords for numeric instances (number and integer)
    case "integer":
    case "number":
        max = schemaP.maximum;
        min = schemaP.minimum;
        if (option.modeNotRandom) {
            value = (
                !(0 < min || max < 0)
                ? 0
                : min || max
            );
        } else {
            if (!(Number.isFinite(max) && Number.isFinite(min))) {
                if (!Number.isFinite(max) && !Number.isFinite(min)) {
                    max = 1000;
                    min = 0;
                } else if (Number.isFinite(max)) {
                    min = max - 1000;
                } else {
                    max = min + 1000;
                }
            }
            // exclusiveMaximum and exclusiveMinimum for float
            value = min + (max - min) * Math.max(Math.random(), min * 0.000000000000001);
            if (local.schemaPType(schemaP) === "integer") {
                value = Math.round(value);
            }
        }
        max = schemaP.maximum;
        min = schemaP.minimum;
        // exclusiveMaximum for integer
        if (schemaP.exclusiveMaximum && value === max) {
            value -= 1;
        }
        // exclusiveMinimum for integer
        if (schemaP.exclusiveMaximum && value === min) {
            value += 1;
        }
        // multipleOf
        if (schemaP.multipleOf > 0) {
            value = schemaP.multipleOf * Math.floor(value / schemaP.multipleOf);
            if (value < min || (schemaP.exclusiveMinimum && value <= min)) {
                value += schemaP.multipleOf;
            }
        }
        break;
    // 5.2. Validation keywords for strings
    case "string":
        value = (
            option.modeNotRandom
            ? "abcd1234"
            : ((1 + Math.random()) * 0x10000000000000).toString(36).slice(1)
        );
        switch (schemaP.format) {
        case "byte":
            value = local.base64FromBuffer(value);
            break;
        case "date":
        case "date-time":
            value = new Date().toISOString();
            break;
        case "email":
            value = value + "@example.com";
            break;
        case "json":
            value = JSON.stringify({
                foo: value
            });
            break;
        case "phone":
            value = (
                option.modeNotRandom
                ? "+123 (1234) 1234-1234"
                : "+" + Math.random().toString().slice(-3)
                + " (" + Math.random().toString().slice(-4) + ") "
                + Math.random().toString().slice(-4) + "-"
                + Math.random().toString().slice(-4)
            );
            break;
        }
        while (value.length < schemaP.minLength) {
            value += value;
        }
        value = value.slice(0, schemaP.maxLength || Infinity);
        break;
    // 5.4. Validation keywords for objects
    default:
        if (depth <= 0) {
            break;
        }
        // recurse dbRowRandomCreate
        value = local.dbRowRandomCreate({
            depth: depth - 1,
            modeNotRandom: option.modeNotRandom,
            prefix: ["schema<" + JSON.stringify(schemaP) + ">"],
            schema: schemaP
        });
    }
    return value;
};

local.dbRowListRandomCreate = function (option) {
/*
 * this function will create a dbRowList of option.length random dbRow's
 */
    var ii;
    ii = 0;
    while (ii < option.length) {
        option.dbRowList.push(local.dbRowRandomCreate(option));
        ii += 1;
    }
    return option.dbRowList;
};

local.dbRowRandomCreate = function (option) {
/*
 * this function will create a random dbRow from option.properties
 */
    var dbRow;
    var ii;
    var properties;
    dbRow = {};
    option = local.objectSetDefault(option, {
        override: local.nop,
        prefix: ["dbRow"]
    });
    properties = local.swaggerValidateDataSchema({
        // dereference property
        modeDereference: true,
        prefix: option.prefix,
        schema: option.schema,
        swaggerJson: local.swaggerJson
    });
    properties = local.jsonCopy((properties && properties.properties) || {});
    ii = Object.keys(properties).length;
    while (ii < (option.schema && option.schema.minProperties)) {
        properties["property" + ii] = {
            type: "string"
        };
        ii += 1;
    }
    Object.keys(properties).forEach(function (key) {
        dbRow[key] = local.dbFieldRandomCreate({
            depth: option.depth,
            modeNotRandom: option.modeNotRandom,
            schemaP: local.swaggerValidateDataSchema({
                // dereference property
                modeDereference: true,
                prefix: option.prefix.concat([key]),
                schema: properties[key],
                swaggerJson: local.swaggerJson
            })
        });
    });
    dbRow = local.jsonCopy(local.objectSetOverride(dbRow, option.override(option)));
    // try to validate data
    local.tryCatchOnError(function () {
        local.swaggerValidateDataSchema({
            data: dbRow,
            prefix: option.prefix,
            schema: option.schema,
            swaggerJson: local.swaggerJson
        });
    }, local.onErrorDefault);
    return dbRow;
};

local.idDomElementCreate = function (seed) {
/*
 * this function will create a deterministic and unique dom-element id from the seed,
 * that is both dom-selector and url friendly
 */
    local.idDomElementDict[seed] = (local.idDomElementDict[seed] || 0) + 1;
    return encodeURIComponent(
        seed + "_" + local.idDomElementDict[seed]
    ).replace((
        /\W/g
    ), "_");
};

local.idNameInit = function (option) {
/*
 * this function will init option.idBackend, option.idName, and option.queryById
 */
    var idBackend;
    var idName;
    // init idName
    idName = option.crudType[1] || "id";
    option.idName = idName;
    // init idBackend
    idBackend = option.crudType[2] || option.idName;
    option.idBackend = idBackend;
    // invert queryById
    if (option.modeQueryByIdInvert) {
        idBackend = option.idName;
        idName = option.idBackend;
    }
    // init queryById
    option.idValue = (option.data && option.data[idBackend]) || option.idValue;
    option.queryById = {};
    option.queryById[idName] = option.idValue;
    return option;
};

local.middlewareBodyParse = function (request, response, nextMiddleware) {
/*
 * this function will run the middleware that will parse request.bodyRaw
 */
    var boundary;
    var crlf;
    var data;
    var headerParse;
    var ii;
    var jj;
    var name;
    // if request is already parsed, then goto nextMiddleware
    if (!request.swgg.operation || !local.isNullOrUndefined(request.swgg.bodyParsed)) {
        nextMiddleware();
        return;
    }
    headerParse = function () {
        local.bufferToUtf8(request.bodyRaw.slice(ii, ii + 1024)).replace((
            /^content-disposition:\u0020?form-data;(.+?)\r\n(?:content-type:\u0020?(.*?)$)?/im
        ), function (ignore, match1, match2) {
            data = {
                contentType: match2,
                name: ""
            };
            match1.replace((
                /(\w+)="([^"]+)/g
            ), function (ignore, match1, match2) {
                data[match1.toLowerCase()] = match2;
            });
            name = data.name;
            request.swgg.bodyMeta[name] = data;
        });
    };
    switch (request.swgg.operation._consumes0) {
    // parse application/x-www-form-urlencoded, e.g.
    // aa=hello%20world&bb=bye%20world
    case "application/x-www-form-urlencoded":
        request.swgg.bodyParsed = local.bufferToUtf8(request.bodyRaw);
        request.swgg.bodyParsed = local.urlParse("?" + request.swgg.bodyParsed, true).query;
        break;
    case "application/xml":
        request.swgg.bodyParsed = {};
        local.bufferToUtf8(request.bodyRaw).replace((
            /<(.+?)><!\[CDATA\[([\S\s]+?)\]\]>/g
        ), function (name, match1, value) {
            name = match1;
            name = decodeURIComponent(name);
            request.swgg.bodyParsed[name] = (
                local.schemaPType(request.swgg.operation._schemaPDict[name]) === "string"
                ? value
                : JSON.parse(value)
            );
        });
        break;
    /*
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
     * https://tools.ietf.org/html/rfc7578
     */
    case "multipart/form-data":
        request.swgg.bodyParsed = {};
        request.swgg.bodyMeta = {};
        crlf = new Uint8Array([0x0d, 0x0a]);
        // init boundary
        ii = 0;
        jj = local.bufferIndexOfSubBuffer(request.bodyRaw, crlf, ii);
        if (jj <= 0) {
            break;
        }
        boundary = local.bufferConcat([crlf, request.bodyRaw.slice(ii, jj)]);
        ii = jj + 2;
        while (true) {
            jj = local.bufferIndexOfSubBuffer(
                request.bodyRaw,
                boundary,
                ii
            );
            if (jj < 0) {
                break;
            }
            headerParse();
            ii = local.bufferIndexOfSubBuffer(
                request.bodyRaw,
                [0x0d, 0x0a, 0x0d, 0x0a],
                ii + 2
            ) + 4;
            data = request.bodyRaw.slice(ii, jj);
            request.swgg.bodyParsed[name] = data;
            ii = jj + boundary.length + 2;
        }
        break;
    default:
        request.swgg.bodyParsed = local.bufferToUtf8(request.bodyRaw);
        // try to JSON.parse the string
        local.tryCatchOnError(function () {
            request.swgg.bodyParsed = JSON.parse(request.swgg.bodyParsed);
        }, local.nop);
    }
    nextMiddleware(null, request, response);
};

local.middlewareCrudBuiltin = function (request, response, nextMiddleware) {
/*
 * this function will run the middleware that will
 * run the builtin crud-operations backed by db-lite
 */
    var crud;
    var onParallel;
    var option;
    var tmp;
    var user;
    option = {};
    local.onNext(option, function (error, data, meta) {
        switch (option.modeNext) {
        case 1:
            crud = request.swgg.crud;
            user = request.swgg.user;
            switch (crud.crudType[0]) {
            case "crudCountManyByQuery":
                crud.dbTable.crudCountManyByQuery(crud.queryWhere, option.onNext);
                break;
            case "crudSetManyById":
                crud.dbTable.crudSetManyById(crud.body, option.onNext);
                break;
            case "crudSetOneById":
                // replace idName with idBackend in body
                delete crud.body.id;
                delete crud.body[crud.idName];
                crud.body[crud.idBackend] = crud.data[crud.idName];
                crud.dbTable.crudSetOneById(crud.body, option.onNext);
                break;
            case "crudUpdateOneById":
                // replace idName with idBackend in body
                delete crud.body.id;
                delete crud.body[crud.idName];
                crud.body[crud.idBackend] = crud.data[crud.idName];
                crud.dbTable.crudUpdateOneById(crud.body, option.onNext);
                break;
            // coverage-hack - test error handling-behavior
            case "crudErrorDelete":
            case "crudErrorGet":
            case "crudErrorHead":
            case "crudErrorOptions":
            case "crudErrorPatch":
            case "crudErrorPost":
            case "crudErrorPut":
                option.onNext(local.errorDefault);
                break;
            case "crudGetManyByQuery":
                onParallel = local.onParallel(option.onNext);
                onParallel.counter += 1;
                crud.dbTable.crudGetManyByQuery({
                    fieldList: crud.queryFields,
                    limit: crud.queryLimit,
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
            case "crudGetOneById":
                crud.dbTable.crudGetOneById(crud.queryById, option.onNext);
                break;
            case "crudGetOneByQuery":
                crud.dbTable.crudGetOneByQuery({
                    query: crud.queryWhere
                }, option.onNext);
                break;
            case "crudNullDelete":
            case "crudNullGet":
            case "crudNullHead":
            case "crudNullOptions":
            case "crudNullPatch":
            case "crudNullPost":
            case "crudNullPut":
                option.onNext();
                break;
            case "crudRemoveManyByQuery":
                crud.dbTable.crudRemoveManyByQuery(crud.queryWhere, option.onNext);
                break;
            case "crudRemoveOneById":
                crud.dbTable.crudRemoveOneById(crud.queryById, option.onNext);
                break;
            case "fileGetOneById":
                local.dbTableFile = local.db.dbTableCreateOne({
                    name: "File"
                });
                crud.dbTable.crudGetOneById(crud.queryById, option.onNext);
                break;
            case "fileUploadManyByForm":
                local.dbTableFile = local.db.dbTableCreateOne({
                    name: "File"
                });
                request.swgg.paramDict = {};
                Object.keys(request.swgg.bodyMeta).forEach(function (key) {
                    if (typeof request.swgg.bodyMeta[key].filename !== "string") {
                        request.swgg.paramDict[key] = local.bufferToUtf8(
                            request.swgg.bodyParsed[key]
                        );
                    }
                });
                crud.body = Object.keys(request.swgg.bodyMeta)
                .filter(function (key) {
                    return typeof request.swgg.bodyMeta[key].filename === "string";
                })
                .map(function (key) {
                    tmp = local.jsonCopy(request.swgg.paramDict);
                    tmp.id = tmp.id || ((1 + Math.random()) * 0x10000000000000)
                    .toString(36).slice(1);
                    local.objectSetOverride(tmp, {
                        fileBlob: local.base64FromBuffer(request.swgg.bodyParsed[key]),
                        fileContentType: request.swgg.bodyMeta[key].contentType,
                        fileFilename: request.swgg.bodyMeta[key].filename,
                        fileInputName: request.swgg.bodyMeta[key].name,
                        fileSize: request.swgg.bodyParsed[key].length,
                        fileUrl: (
                            local.swaggerJsonBasePath
                            + "/" + request.swgg.operation.tags[0]
                            + "/fileGetOneById/" + tmp.id
                        )
                    });
                    return tmp;
                });
                local.dbTableFile.crudSetManyById(crud.body, option.onNext);
                break;
            case "userLoginByPassword":
            case "userLogout":
                // respond with 401 Unauthorized
                if (!user.isAuthenticated) {
                    local.serverRespondHeadSet(request, response, 401, {});
                    request.swgg.crud.endArgList = [request, response];
                    option.modeNext = Infinity;
                    option.onNext();
                    return;
                }
                option.onNext();
                break;
            default:
                option.modeNext = Infinity;
                option.onNext();
            }
            break;
        case 2:
            switch (crud.crudType[0]) {
            case "crudSetOneById":
            case "crudUpdateOneById":
                option.onNext(null, data);
                break;
            case "crudGetManyByQuery":
                option.onNext(null, crud.queryData, {
                    paginationCountTotal: crud.paginationCountTotal
                });
                break;
            case "fileUploadManyByForm":
                option.onNext(null, data.map(function (element) {
                    delete element.fileBlob;
                    return element;
                }));
                break;
            case "userLoginByPassword":
                option.onNext(null, {
                    jwtEncrypted: user.jwtEncrypted
                });
                break;
            case "userLogout":
                crud.dbTable.crudUpdateOneById({
                    jwtEncrypted: null,
                    username: user.username
                }, option.onNext);
                break;
            default:
                option.onNext(null, data, meta);
            }
            break;
        case 3:
            switch (crud.crudType[0]) {
            case "fileGetOneById":
                if (!data) {
                    local.serverRespondDefault(request, response, 404);
                    return;
                }
                local.serverRespondHeadSet(request, response, null, {
                    "Content-Type": data.fileContentType
                });
                response.end(local.base64ToBuffer(data.fileBlob));
                break;
            case "userLogout":
                option.onNext();
                break;
            default:
                option.onNext(null, data, meta);
            }
            break;
        case 4:
            request.swgg.crud.endArgList = [request, response, null, data, meta];
            option.onNext();
            break;
        default:
            nextMiddleware(error);
        }
    });
    option.modeNext = 0;
    option.onNext();
};

local.middlewareCrudEnd = function (request, response, nextMiddleware) {
/*
 * this function will run the middleware that will end the builtin crud-operations
 */
    if (request.swgg.crud.endArgList) {
        local.serverRespondJsonapi.apply(null, request.swgg.crud.endArgList);
        return;
    }
    nextMiddleware(null, request, response);
};

local.middlewareRouter = function (request, response, nextMiddleware) {
/*
 * this function will run the middleware that will
 * map the request's method-path to swagger's tags[0]-crudType
 */
    var tmp;
    // init swgg object
    local.objectSetDefault(request, {
        swgg: {
            crud: {
                crudType: []
            },
            user: {}
        }
    }, 3);
    // if request.url is not prefixed with swaggerJsonBasePath,
    // then default to nextMiddleware
    if (request.urlParsed.pathname.indexOf(local.swaggerJsonBasePath) !== 0) {
        nextMiddleware();
        return;
    }
    // init methodPath
    request.swgg.methodPath = (
        request.method + " "
        + request.urlParsed.pathname.replace(local.swaggerJsonBasePath, "")
    );
    // init operation
    while (request.swgg.methodPath !== tmp) {
        request.swgg.operation = (
            local.apiDict[request.swgg.methodPath]
            // handle /foo/{id}/bar case
            || local.apiDict[request.swgg.methodPath.replace((
                /\/[^\/]+\/([^\/]*?)$/
            ), "/{}/$1")]
        );
        // if operation exists, then break
        if (request.swgg.operation) {
            request.swgg.operation = local.jsonCopy(request.swgg.operation);
            // init crud.crudType
            request.swgg.crud.crudType = request.swgg.operation._crudType;
            break;
        }
        tmp = request.swgg.methodPath;
        // handle /foo/{id} case
        request.swgg.methodPath = request.swgg.methodPath.replace((
            /\/[^\/]+?(\/*?)$/
        ), "/$1{}");
    }
    nextMiddleware(null, request, response);
};

local.middlewareUserLogin = function (request, response, nextMiddleware) {
/*
 * this function will run the middleware that will handle user login
 */
    var crud;
    var option;
    var user;
    option = {};
    local.onNext(option, function (error, data) {
        switch (option.modeNext) {
        case 1:
            local.dbTableUser = local.db.dbTableCreateOne({
                name: "User"
            });
            crud = request.swgg.crud;
            user = {};
            request.swgg.user = user;
            user.jwtEncrypted = (
                request.headers.authorization
                && request.headers.authorization.replace("Bearer ", "")
            );
            user.jwtDecrypted = local.jwtAes256GcmDecrypt(user.jwtEncrypted);
            switch (crud.crudType[0]) {
            // coverage-hack - test error handling-behavior
            case "crudErrorLogin":
                option.onNext(local.errorDefault);
                return;
            case "userLoginByPassword":
                user.password = request.urlParsed.query.password;
                user.username = request.urlParsed.query.username;
                if (user.password && user.username) {
                    local.dbTableUser.crudGetOneById({
                        username: user.username
                    }, option.onNext);
                    return;
                }
                break;
            default:
                if (user.jwtDecrypted.sub) {
                    // init username
                    user.username = user.jwtDecrypted.sub;
                    local.dbTableUser.crudGetOneById({
                        username: user.username
                    }, option.onNext);
                    return;
                }
            }
            option.modeNext = Infinity;
            option.onNext();
            break;
        case 2:
            switch (crud.crudType[0]) {
            case "userLoginByPassword":
                user.data = data;
                if (!local.sjclHashScryptValidate(
                    user.password,
                    user.data && user.data.password
                )) {
                    option.modeNext = Infinity;
                    option.onNext();
                    return;
                }
                // init isAuthenticated
                user.isAuthenticated = true;
                // create JSON Web Token (JWT)
                // https://tools.ietf.org/html/rfc7519
                user.jwtDecrypted = {};
                user.jwtDecrypted.sub = user.data.username;
                // update jwtEncrypted in client
                user.jwtEncrypted = local.jwtAes256GcmEncrypt(user.jwtDecrypted);
                local.serverRespondHeadSet(request, response, null, {
                    "swgg-jwt-encrypted": user.jwtEncrypted
                });
                // update jwtEncrypted in dbTableUser
                local.dbTableUser.crudUpdateOneById({
                    jwtEncrypted: user.jwtEncrypted,
                    username: user.jwtDecrypted.sub
                }, option.onNext);
                return;
            default:
                data = data || {};
                user.data = data;
                if (data.jwtEncrypted) {
                    // init isAuthenticated
                    user.isAuthenticated = true;
                    // update jwtEncrypted in client
                    if (data.jwtEncrypted !== user.jwtEncrypted) {
                        user.jwtEncrypted = data.jwtEncrypted;
                        user.jwtDecrypted = local.jwtAes256GcmDecrypt(user.jwtEncrypted);
                        local.serverRespondHeadSet(request, response, null, {
                            "swgg-jwt-encrypted": user.jwtEncrypted
                        });
                    }
                }
            }
            option.onNext();
            break;
        default:
            nextMiddleware(error);
        }
    });
    option.modeNext = 0;
    option.onNext();
};

local.middlewareValidate = function (request, response, nextMiddleware) {
/*
 * this function will run the middleware that will validate the swagger-request
 */
    var crud;
    var option;
    var tmp;
    option = {};
    local.onNext(option, function (error) {
        switch (option.modeNext) {
        case 1:
            if (!request.swgg.operation) {
                option.modeNext = Infinity;
                option.onNext();
                return;
            }
            // init paramDict
            request.swgg.paramDict = {};
            // parse path param
            tmp = request.urlParsed.pathname
            .replace(local.swaggerJsonBasePath, "")
            .split("/");
            request.swgg.operation._path.split("/").forEach(function (key, ii) {
                if ((
                    /^\{\S*?\}$/
                ).test(key)) {
                    request.swgg.paramDict[key.slice(1, -1)] = decodeURIComponent(tmp[ii]);
                }
            });
            request.swgg.operation.parameters.forEach(function (schemaP) {
                switch (schemaP.in) {
                // parse body param
                case "body":
                    request.swgg.paramDict[schemaP.name] = (
                        request.swgg.bodyParsed
                        || undefined
                    );
                    break;
                // parse formData param
                case "formData":
                    switch (request.swgg.operation._consumes0) {
                    case "application/x-www-form-urlencoded":
                    case "application/xml":
                        request.swgg.paramDict[schemaP.name] = (
                            request.swgg.bodyParsed[schemaP.name]
                        );
                        break;
                    }
                    break;
                // parse header param
                case "header":
                    request.swgg.paramDict[schemaP.name] = (
                        request.headers[schemaP.name.toLowerCase()]
                    );
                    break;
                // parse query param
                case "query":
                    request.swgg.paramDict[schemaP.name] = (
                        request.urlParsed.query[schemaP.name]
                    );
                    break;
                }
                // parse array-multi
                tmp = request.swgg.paramDict[schemaP.name];
                if (
                    tmp
                    && local.schemaPType(schemaP) === "array"
                    && schemaP.collectionFormat === "multi"
                ) {
                    request.swgg.paramDict[schemaP.name] = (
                        encodeURIComponent(schemaP.name)
                        + "=" + (
                            Array.isArray(tmp)
                            ? tmp
                            : [tmp]
                        ).join("&" + encodeURIComponent(schemaP.name) + "=")
                    );
                }
                // init default param
                if (
                    local.isNullOrUndefined(request.swgg.paramDict[schemaP.name])
                    && schemaP.default !== undefined
                ) {
                    request.swgg.paramDict[schemaP.name] = local.jsonCopy(
                        schemaP.default
                    );
                }
            });
            // normalize paramDict
            local.normalizeSwaggerParamDict(request.swgg);
            // validate paramDict
            error = local.swaggerValidateDataParameters({
                data: request.swgg.paramDict,
                prefix: ["operation", request.swgg.methodPath],
                parameters: request.swgg.operation.parameters,
                swaggerJson: local.swaggerJson
            })[0];
            option.onNext(error);
            break;
        case 2:
            // init crud
            crud = request.swgg.crud;
            // init crud.dbTable
            crud.dbTable = (
                request.swgg.operation
                && request.swgg.operation._schemaName
                && local.db.dbTableCreateOne({
                    name: request.swgg.operation._schemaName
                })
            );
            if (!crud.dbTable) {
                nextMiddleware();
                return;
            }
            // init crud.body
            if (request.swgg.operation._consumes0 !== "multipart/form-data") {
                crud.body = local.jsonCopy(request.swgg.bodyParsed);
            }
            // init crud.data
            crud.data = local.jsonCopy(request.swgg.paramDict);
            request.swgg.operation.parameters.forEach(function (schemaP) {
                // JSON.parse json-string
                if (
                    schemaP.format === "json"
                    && local.schemaPType(schemaP) === "string"
                    && crud.data[schemaP.name]
                ) {
                    crud.data[schemaP.name] = JSON.parse(crud.data[schemaP.name]);
                }
            });
            // init crud.query*
            [{
                key: "queryFields",
                value: {}
            }, {
                key: "queryLimit",
                value: 100
            }, {
                key: "querySkip",
                value: 0
            }, {
                key: "querySort",
                value: [{
                    fieldName: "id"
                }, {
                    fieldName: "_timeUpdated",
                    isDescending: true
                }]
            }, {
                key: "queryWhere",
                value: {}
            }].forEach(function (element) {
                crud[element.key] = crud.data["_" + element.key] || JSON.parse(
                    local.templateRender(
                        request.swgg.operation["_" + element.key] || "null",
                        request.swgg.paramDict,
                        {
                            notHtmlSafe: true
                        }
                    )
                ) || element.value;
            });
            // init-before crud.idName
            crud.modeQueryByIdInvert = true;
            local.idNameInit(crud);
            // init crud.data.id
            switch (crud.crudType[0]) {
            case "crudSetOneById":
            case "crudUpdateOneById":
                if (!local.isNullOrUndefined(crud.data[crud.idName])) {
                    break;
                }
                crud.data[crud.idName] = (crud.body && crud.body[crud.idBackend]);
                break;
            }
            // init-after crud.idName
            crud.modeQueryByIdInvert = true;
            local.idNameInit(crud);
            nextMiddleware();
            break;
        default:
            nextMiddleware(error, request, response);
        }
    });
    option.modeNext = 0;
    option.onNext();
};

local.normalizeSwaggerJson = function (swaggerJson, option) {
/*
 * this function will normalize swaggerJson and filter $npm_package_swggTags0
 */
    var pathDict;
    var tmp;
    option = local.objectSetDefault(option, {
        objectSetDescription: function (dict) {
            if (
                dict
                && dict.description
                && Array.isArray(dict["x-swgg-descriptionLineList"])
            ) {
                delete dict.description;
            }
        }
    });
    local.objectSetDefault(swaggerJson, {
        paths: {},
        tags: []
    });
    // fix error - semanticPaths2
    pathDict = {};
    Object.keys(swaggerJson.paths).forEach(function (path) {
        tmp = path.replace((
            /\{.*?\}/g
        ), "{}");
        pathDict[tmp] = pathDict[tmp] || {};
        pathDict[tmp][path] = true;
    });
    Object.keys(pathDict).forEach(function (key) {
        Object.keys(pathDict[key]).sort().forEach(function (path, ii) {
            // fix error.semanticUniquePath
            if (ii && swaggerJson["x-swgg-fixErrorSemanticUniquePath"]) {
                swaggerJson.paths[path + "#" + ii] = swaggerJson.paths[path];
                delete swaggerJson.paths[path];
            }
        });
    });
    Object.keys(swaggerJson.paths).forEach(function (path) {
        Object.keys(swaggerJson.paths[path]).forEach(function (method) {
            tmp = swaggerJson.paths[path][method];
            // auto-create operationId from path
            if (
                swaggerJson["x-swgg-operationIdFromPath"]
                || tmp["x-swgg-operationIdFromPath"]
                || !tmp.operationId
            ) {
                tmp.operationId = local.operationIdFromAjax({
                    method: method,
                    url: path
                });
            }
            // normalize parameter.required
            (tmp.parameters || []).forEach(function (schemaP) {
                if (schemaP.required === false) {
                    delete schemaP.required;
                }
            });
        });
    });
    // override tag.description with x-swgg-tags0-override
    if (swaggerJson["x-swgg-tags0-override"]) {
        swaggerJson.tags.forEach(function (tag) {
            tmp = local.objectSetDefault(swaggerJson["x-swgg-tags0-override"][tag.name], {
                description: tag.description,
                "x-swgg-descriptionLineList": tag["x-swgg-descriptionLineList"]
            });
            tag.description = tmp.description;
            tag["x-swgg-descriptionLineList"] = tmp["x-swgg-descriptionLineList"];
            // objectSetDescription
            option.objectSetDescription(tmp);
            option.objectSetDescription(tag);
        });
    }
    // apply option.objectSetDescription
    [swaggerJson.externalDocs, swaggerJson.info].forEach(option.objectSetDescription);
    [
        swaggerJson.definitions,
        swaggerJson.parameters,
        swaggerJson.responses
    ].forEach(function (dict) {
        Object.keys(dict || {}).forEach(function (key) {
            tmp = dict[key];
            if (dict === swaggerJson.definitions) {
                tmp = tmp.properties || {};
                Object.keys(tmp).forEach(function (key) {
                    option.objectSetDescription(tmp[key]);
                });
                return;
            }
            option.objectSetDescription(tmp);
        });
    });
    Object.keys(swaggerJson.paths).forEach(function (path) {
        Object.keys(swaggerJson.paths[path]).forEach(function (method) {
            tmp = swaggerJson.paths[path][method];
            option.objectSetDescription(tmp);
            (tmp.parameters || []).forEach(option.objectSetDescription);
            Object.keys(tmp.responses || {}).forEach(function (key) {
                option.objectSetDescription(tmp.responses[key]);
            });
        });
    });
    if (
        !local.env.npm_package_swggTags0 || (
            /-all$/
        ).test(local.env.npm_package_swggTags0)
    ) {
        return swaggerJson;
    }
    // override swaggerJson with x-swgg-tags0-override
    local.objectSetOverride(
        swaggerJson,
        (
            swaggerJson["x-swgg-tags0-override"]
            && swaggerJson["x-swgg-tags0-override"][local.env.npm_package_swggTags0]
        ),
        10
    );
    // filter $npm_package_swggTags0 - definitions and parameters
    ["definitions", "parameters", "responses"].forEach(function (schema) {
        schema = swaggerJson[schema] || {};
        Object.keys(schema).forEach(function (key) {
            tmp = schema[key]["x-swgg-tags0"];
            if (tmp && tmp !== "all" && tmp !== local.env.npm_package_swggTags0) {
                delete schema[key];
            }
        });
    });
    // filter $npm_package_swggTags0 - paths
    Object.keys(swaggerJson.paths).forEach(function (path) {
        Object.keys(swaggerJson.paths[path]).forEach(function (method) {
            tmp = swaggerJson.paths[path][method]["x-swgg-tags0"];
            if (tmp && tmp !== "all" && tmp !== local.env.npm_package_swggTags0) {
                delete swaggerJson.paths[path][method];
                return;
            }
        });
        if (!Object.keys(swaggerJson.paths[path]).length) {
            delete swaggerJson.paths[path];
        }
    });
    // filter $npm_package_swggTags0 - tags
    swaggerJson.tags = swaggerJson.tags.filter(function (tag) {
        return (
            !tag["x-swgg-tags0"]
            || tmp["x-swgg-tags0"] === "all"
            || tag["x-swgg-tags0"] === local.env.npm_package_swggTags0
        );
    });
    return swaggerJson;
};

local.normalizeSwaggerParamDict = function (option) {
/*
 * this function will parse the option according to option.operation.parameters
 */
    var tmp;
    option.operation.parameters.forEach(function (schemaP) {
        tmp = option.paramDict[schemaP.name];
        // init default value
        if (
            !option.modeNoDefault
            && (option.modeDefault || schemaP.required)
            && local.isNullOrUndefined(tmp)
        ) {
            tmp = local.jsonCopy(schemaP.default);
        }
        if (option.modeDefault && local.isNullOrUndefined(tmp)) {
            tmp = local.dbFieldRandomCreate({
                modeNotRandom: true,
                schemaP: schemaP
            });
        }
        // parse array
        if (local.schemaPType(schemaP) === "array" && schemaP.in !== "body") {
            if (typeof tmp === "string") {
                switch (schemaP.collectionFormat || schemaP["x-swgg-collectionFormat"]) {
                case "json":
                    local.tryCatchOnError(function () {
                        tmp = JSON.parse(tmp);
                    }, local.nop);
                    option.paramDict[schemaP.name] = tmp;
                    return;
                case "multi":
                    tmp = local.urlParse("?" + tmp, true).query[schemaP.name];
                    if (!Array.isArray(tmp)) {
                        tmp = [tmp];
                    }
                    break;
                case "pipes":
                    tmp = tmp.split("|");
                    break;
                case "ssv":
                    tmp = tmp.split(" ");
                    break;
                case "tsv":
                    tmp = tmp.split("\t");
                    break;
                // default to csv
                default:
                    tmp = tmp.split(",");
                }
                if (local.schemaPItemsType(schemaP) !== "string") {
                    // try to JSON.parse the string
                    local.tryCatchOnError(function () {
                        tmp = tmp.map(function (element) {
                            return JSON.parse(element);
                        });
                    }, local.nop);
                }
            }
        // JSON.parse paramDict
        } else if (
            local.schemaPType(schemaP) !== "file"
            && local.schemaPType(schemaP) !== "string"
            && (
                typeof tmp === "string"
                || Object.prototype.toString.call(tmp) === "[object Uint8Array]"
            )
        ) {
            // try to JSON.parse the string
            local.tryCatchOnError(function () {
                tmp = JSON.parse(local.bufferToUtf8(tmp));
            }, local.nop);
        }
        option.paramDict[schemaP.name] = tmp;
    });
    return option;
};

local.onErrorJsonapi = function (onError) {
/*
 * this function will normalize the error and data to jsonapi format,
 * and pass them to onError
 * http://jsonapi.org/format/#errors
 * http://jsonapi.org/format/#document-structure-resource-objects
 */
    return function (error, data, meta) {
        data = [error, data].map(function (data, ii) {
            // if no error occurred, then return
            if (
                (ii === 0 && !data)
                // if data is already normalized, then return it
                || (data && data.meta && data.meta.isJsonapiResponse)
            ) {
                return data;
            }
            // normalize data-list
            if (!Array.isArray(data)) {
                data = [data];
            }
            // normalize error-list to contain non-null objects
            if (!ii) {
                data = data.errorList || data;
                // normalize error-list to be non-empty
                if (!data.length) {
                    data.push(null);
                }
                data = data.map(function (element) {
                    if (!(typeof element === "object" && element)) {
                        element = {
                            message: String(element)
                        };
                    }
                    // normalize error-object to plain json-object
                    return {
                        message: element.message,
                        name: element.name,
                        stack: element.stack,
                        statusCode: Number(element.statusCode) || 500
                    };
                });
                error = local.jsonCopy(data[0]);
                error.errors = data;
                return error;
            }
            return {
                data: data
            };
        });
        // init data.meta
        data.forEach(function (data, ii) {
            if (!data) {
                return;
            }
            data.meta = local.jsonCopy(meta || {});
            data.meta.isJsonapiResponse = true;
            if (ii) {
                data.meta.dataLength = data.data.length;
            } else {
                data.meta.errorsLength = data.errors.length;
            }
            data.meta.statusCode = (
                Number(data.meta.statusCode)
                || Number(data.statusCode)
                || 0
            );
        });
        onError(data[0], data[1]);
    };
};

local.operationIdFromAjax = function (option) {
/*
 * this function will create a sortable operationId
 * from given ajax-option
 */
    var urlParsed;
    urlParsed = local.urlParseWithBraket(option.url);
    return encodeURIComponent(
        urlParsed.pathname + urlParsed.hash + " " + option.method.toUpperCase()
    ).replace((
        /[^\w\-.]/g
    ), "_");
};

local.schemaPItems = function (schemaP) {
/*
 * this function will return schemaP.items
 */
    return schemaP["x-swgg-items"] || schemaP.items;
};

local.schemaPItemsType = function (schemaP) {
/*
 * this function will return schemaP.items.type
 */
    return local.schemaPType(local.schemaPItems(schemaP) || {});
};

local.schemaPType = function (schemaP) {
/*
 * this function will return schemaP.type
 */
    return schemaP && (schemaP["x-swgg-type"] || schemaP.type);
};

local.serverRespondJsonapi = function (request, response, error, data, meta) {
/*
 * this function will respond in jsonapi format
 * http://jsonapi.org/format/#errors
 * http://jsonapi.org/format/#document-structure-resource-objects
 */
    local.onErrorJsonapi(function (error, data) {
        local.serverRespondHeadSet(request, response, error && error.statusCode, {
            "Content-Type": "application/json"
        });
        if (error) {
            // debug statusCode / method / url
            local.errorMessagePrepend(
                error,
                response.statusCode + " " + request.method + " " + request.url + "\n"
            );
            // print error.stack to stderr
            local.onErrorDefault(error);
        }
        data = error || data;
        response.statusCode = data.meta.statusCode || response.statusCode;
        data.meta.statusCode = response.statusCode;
        response.end(JSON.stringify(data));
    })(error, data, meta);
};

local.swaggerJsonFromAjax = function (swaggerJson, option) {
/*
 * this function will update swaggerJson
 * with definitions and paths created from given ajax-option
 */
    var data;
    var isArray;
    var operation;
    var pathDict;
    var type;
    var upsertSchemaP;
    var urlParsed;
    upsertSchemaP = function (schemaP) {
        if (!operation.parameters.some(function (element) {
            if (element.in === schemaP.in && element.name === schemaP.name) {
                ["default", "items", "schema"].forEach(function (key) {
                    if (!local.isNullOrUndefined(schemaP[key])) {
                        element[key] = schemaP[key];
                    }
                });
                return true;
            }
        })) {
            operation.parameters.push(schemaP);
        }
    };
    // init swaggerJson
    swaggerJson = local.objectSetDefault(swaggerJson, {
        basePath: "/",
        definitions: {},
        info: {
            title: "",
            version: ""
        },
        paths: {},
        swagger: "2.0"
    });
    // init option
    option = local.objectSetDefault(option, {
        headers: {},
        method: "GET"
    });
    // init urlParsed
    urlParsed = local.urlParseWithBraket(option.url);
    // init operation
    operation = {
        operationId: option.operationId || local.operationIdFromAjax(option),
        parameters: [],
        responses: {
            default: {
                description: "default response"
            }
        },
        tags: option.tags || ["undefined"],
        "x-swgg-tags0": option["x-swgg-tags0"]
    };
    if ((
        /^(?:http|https):\/\//
    ).test(option.url)) {
        operation["x-swgg-host"] = urlParsed.host;
        operation["x-swgg-schemes"] = [urlParsed.protocol.slice(0, -1)];
    }
    pathDict = {};
    pathDict[urlParsed.pathname + urlParsed.hash] = {};
    pathDict[urlParsed.pathname + urlParsed.hash][
        option.method.toLowerCase()
    ] = operation;
    local.objectSetDefault(swaggerJson, {
        paths: pathDict
    }, 3);
    // init param in header
    Object.keys(option.headers).forEach(function (key) {
        upsertSchemaP({
            default: option.headers[key],
            in: "header",
            name: key,
            type: "string"
        });
    });
    // init param in path
    urlParsed.pathname.replace((
        /\{[^}]+?\}/g
    ), function (match0) {
        match0 = match0.slice(1, -1);
        upsertSchemaP({
            default: match0,
            in: "path",
            name: match0,
            required: true,
            type: "string"
        });
    });
    // init param in query
    Object.keys(urlParsed.query).forEach(function (key) {
        upsertSchemaP({
            default: urlParsed.query[key],
            in: "query",
            name: key,
            type: "string"
        });
    });
    data = option.data;
    if (!data) {
        return swaggerJson;
    }
    // init param in body - text-data
    upsertSchemaP({
        in: "body",
        name: "body",
        schema: {
            type: "string"
        }
    });
    local.tryCatchOnError(function () {
        data = JSON.parse(data);
    }, local.nop);
    if (typeof data !== "object") {
        return swaggerJson;
    }
    // init param in body - json-data
    isArray = Array.isArray(data);
    type = local.swaggerJsonFromPostBody(swaggerJson, {
        data: (
            // ternary-condition
            isArray
            ? data[0]
            : data
        ),
        depth: 2,
        key: "body",
        prefix: operation.operationId,
        "x-swgg-tags0": option["x-swgg-tags0"]
    });
    upsertSchemaP({
        in: "body",
        name: "body",
        schema: (
            // ternary-condition
            isArray
            ? {
                items: type,
                type: "array"
            }
            : type
        )
    });
    return swaggerJson;
};

local.swaggerJsonFromCurl = function (swaggerJson, text) {
/*
 * this function will update swaggerJson
 * with definitions and paths created from given curl-command-text
 */
    var arg;
    var argList;
    var doubleBackslash;
    var option;
    var quote;
    arg = "";
    argList = [];
    doubleBackslash = local.stringUniqueKey(text);
    // parse doubleBackslash
    text = text.replace((
        /\\\\/g
    ), doubleBackslash);
    // parse line-continuation
    text = text.replace((
        /\\\n/g
    ), "");
    // parse quotes
    text.replace((
        /(\s*?)(\S+)/g
    ), function (match0, line, word) {
        line = match0;
        word.replace((
            /^(["']?).*?(?:\\")?(["']?)$/
        ), function (quote1, match1, quote2) {
            quote1 = match1;
            if (quote) {
                arg += line;
            } else {
                arg = word;
                quote = quote1;
            }
            if (!quote || quote === quote2) {
                switch (quote) {
                // parse escapes in single-quotes
                case "'":
                    arg = arg.replace((
                        /'"'"'/g
                    ), "'");
                    arg = arg.slice(1, -1);
                    break;
                // parse escapes in double-quotes
                // https://www.gnu.org/software/bash/manual/html_node/Double-Quotes.html
                case "\"":
                    arg = arg.replace((
                        /\\([$`"\n])/g
                    ), "$1");
                    arg = arg.slice(1, -1);
                    break;
                }
                argList.push(arg);
                arg = "";
                quote = "";
            }
        });
    });
    // un-parse doubleBackslash
    argList = argList.map(function (arg) {
        return arg.replace(new RegExp(doubleBackslash, "g"), "\\\\");
    });
    argList.push("curl");
    argList.forEach(function (arg, ii) {
        switch (argList[ii - 1]) {
        case "--data":
        case "--data-ascii":
        case "--data-binary":
        case "--data-raw":
        case "-d":
            option.data = arg;
            return;
        case "--header":
        case "-H":
            arg = arg.split(":");
            arg[1] = arg.slice(1).join(":").trim();
            option.headers[arg[0].toLowerCase()] = arg[1];
            return;
        case "--request":
        case "-X":
            option.method = arg;
            return;
        }
        if (arg === "curl") {
            if (option) {
                option.url = option.url || argList[ii - 1];
                swaggerJson = local.swaggerJsonFromAjax(swaggerJson, option);
            }
            option = {
                headers: {},
                method: "GET"
            };
        }
        if ((
            /^(?:http|https):\/\//
        ).test(arg)) {
            option.url = arg;
        }
    });
    return swaggerJson;
};

local.swaggerJsonFromPostBody = function (swaggerJson, option) {
/*
 * this function will update swaggerJson
 * with definitions created from the post-body-data
 */
    var definition;
    var isArray;
    var prefix;
    var schemaP;
    var type;
    var value;
    prefix = option.prefix + "." + encodeURIComponent(option.key);
    definition = {
        properties: {},
        "x-swgg-tags0": option["x-swgg-tags0"]
    };
    swaggerJson.definitions[prefix] = definition;
    Object.keys(option.data).forEach(function (key) {
        value = option.data[key];
        isArray = Array.isArray(value);
        if (isArray) {
            value = value[0];
        }
        type = (
            local.isNullOrUndefined(value)
            ? "string"
            : typeof value
        );
        schemaP = (
            isArray
            ? {
                default: option.data[key],
                items: {
                    type: type
                },
                type: "array"
            }
            : {
                default: value,
                type: type
            }
        );
        definition.properties[key] = schemaP;
        if (!(type === "object" && option.depth > 1)) {
            return;
        }
        // recurse
        type = local.swaggerJsonFromPostBody(swaggerJson, {
            data: value,
            depth: option.depth - 1,
            key: key,
            prefix: prefix,
            "x-swgg-tags0": option["x-swgg-tags0"]
        });
        if (isArray) {
            schemaP.items = type;
        } else {
            definition.properties[key] = type;
        }
    });
    return {
        $ref: "#/definitions/" + prefix
    };
};

local.swaggerValidate = function (swaggerJson) {
/*
 * this function will validate the json-object swaggerJson
 */
    var operation;
    var operationIdDict;
    var pathDict;
    var prefix;
    var test;
    var tmp;
    operationIdDict = {};
    swaggerJson = swaggerJson || {};
    local.swaggerValidateDataSchema({
        data: swaggerJson,
        modeSchema: true,
        prefix: ["swaggerJson"],
        schema: local.swaggerSchemaJson,
        swaggerJson: swaggerJson
    });
    pathDict = {};
    Object.keys(swaggerJson.paths).forEach(function (path) {
        prefix = ["swaggerJson", "paths", path];
        // validate semanticPaths1
        test = path.indexOf("?") < 0;
        local.throwSwaggerError(!test && {
            errorType: "semanticPaths1",
            prefix: prefix
        });
        tmp = path.replace((
            /\{.*?\}/g
        ), "{}");
        // validate semanticPaths2
        test = !pathDict[tmp];
        local.throwSwaggerError(!test && {
            errorType: "semanticPaths2",
            pathList: [pathDict[tmp], path],
            prefix: prefix
        });
        pathDict[tmp] = path;
        // validate semanticPaths3
        tmp = {};
        path.replace((
            /\{.*?\}/g
        ), function (match0) {
            test = !tmp[match0];
            local.throwSwaggerError(!test && {
                errorType: "semanticPaths3",
                name: match0,
                prefix: prefix
            });
            tmp[match0] = true;
        });
        // validate semanticPaths5
        test = path.indexOf("{}") < 0;
        local.throwSwaggerError(!test && {
            errorType: "semanticPaths5",
            prefix: prefix
        });
    });
    // validate swaggerJson.definitions[key].properties[ii].default
    Object.keys(swaggerJson.definitions || {}).forEach(function (schemaName) {
        tmp = local.swaggerValidateDataSchema({
            // dereference definition
            modeDereference: true,
            prefix: ["swaggerJson", "definitions", schemaName],
            schema: swaggerJson.definitions[schemaName],
            swaggerJson: swaggerJson
        });
        Object.keys(tmp.properties || {}).forEach(function (key) {
            local.swaggerValidateDataSchema({
                modeDefault: true,
                prefix: ["swaggerJson", "definitions", schemaName, "properties", key],
                schema: tmp.properties[key],
                swaggerJson: swaggerJson
            });
        });
    });
    // validate swaggerJson.parameters[key].default
    Object.keys(swaggerJson.parameters || []).forEach(function (key) {
        local.swaggerValidateDataSchema({
            modeDefault: true,
            prefix: ["swaggerJson", "parameters", key],
            schema: swaggerJson.parameters[key],
            swaggerJson: swaggerJson
        });
    });
    // validate swaggerJson.paths[key][key].parameters[ii].default
    Object.keys(swaggerJson.paths).forEach(function (path) {
        Object.keys(swaggerJson.paths[path]).forEach(function (method) {
            prefix = ["swaggerJson", "paths", path, method];
            operation = local.swaggerValidateDataSchema({
                // dereference operation
                modeDereference: true,
                prefix: prefix,
                schema: swaggerJson.paths[path][method],
                swaggerJson: swaggerJson
            });
            // validate semanticOperationIds1
            test = !operationIdDict[operation.operationId];
            local.throwSwaggerError(!test && {
                data: operation.operationId,
                errorType: "semanticOperationIds1",
                prefix: prefix.concat(["operationId"])
            });
            operationIdDict[operation.operationId] = true;
            tmp = {
                in: {},
                name: {},
                path: {},
                type: {}
            };
            path.replace((
                /\{.*?\}/g
            ), function (match0) {
                match0 = match0.slice(1, -1);
                tmp.path[match0] = tmp.path[match0] || [];
                tmp.path[match0][0] = true;
            });
            (operation.parameters || []).forEach(function (schemaP, ii) {
                // dereference schemaP
                String(schemaP["x-swgg-$ref"] || schemaP.$ref).replace((
                    /#\/parameters\/(.+?$)/m
                ), function (ignore, match1) {
                    schemaP = local.objectSetDefault(
                        local.jsonCopy(schemaP),
                        local.jsonCopy(swaggerJson.parameters[match1])
                    );
                    delete schemaP.$ref;
                });
                // validate semanticOperations2
                test = !(tmp.in.body && schemaP.in === "body");
                local.throwSwaggerError(!test && {
                    data: operation,
                    errorType: "semanticOperations2",
                    prefix: prefix,
                    schema: operation
                });
                // validate semanticOperations3
                test = (
                    schemaP.name === undefined
                    || schemaP.in === undefined
                    || !tmp.name[schemaP.name + " " + schemaP.in]
                );
                local.throwSwaggerError(!test && {
                    data: operation.parameters,
                    errorType: "semanticOperations3",
                    prefix: prefix.concat(["parameters"])
                });
                tmp.in[schemaP.in] = true;
                tmp.name[schemaP.name + " " + schemaP.in] = true;
                tmp.type[schemaP.type] = true;
                // validate semanticOperations1
                test = !(tmp.in.body && tmp.in.formData);
                local.throwSwaggerError(!test && {
                    data: operation,
                    errorType: "semanticOperations1",
                    prefix: prefix
                });
                // validate schemaP
                local.swaggerValidateDataSchema({
                    modeDefault: true,
                    prefix: prefix.concat(["parameters", schemaP.name]),
                    schema: schemaP,
                    swaggerJson: swaggerJson
                });
                if (schemaP.in === "path") {
                    tmp.path[schemaP.name] = tmp.path[schemaP.name] || [];
                    tmp.path[schemaP.name][1] = true;
                    // validate semanticPaths7
                    test = tmp.path[schemaP.name][0];
                    local.throwSwaggerError(!test && {
                        data: schemaP,
                        errorType: "semanticPaths7",
                        prefix: prefix.concat(["parameters", ii])
                    });
                }
            });
            Object.keys(tmp.path).forEach(function (name) {
                // validate semanticPaths6
                test = tmp.path[name][1];
                local.throwSwaggerError(!test && {
                    errorType: "semanticPaths6",
                    name: name,
                    prefix: prefix.concat(["parameters", "ii"])
                });
            });
            // validate semanticFormData4
            test = (
                !tmp.type.file
                || (operation.consumes || []).indexOf("multipart/form-data") >= 0
            );
            local.throwSwaggerError(!test && {
                data: operation,
                errorType: "semanticFormData4",
                prefix: prefix
            });
            // validate semanticFormData5
            test = (
                !tmp.in.formData
                || (operation.consumes || []).indexOf(
                    "application/x-www-form-urlencoded"
                ) >= 0
                || (operation.consumes || []).indexOf("multipart/form-data") >= 0
            );
            local.throwSwaggerError(!test && {
                data: operation,
                errorType: "semanticFormData5",
                prefix: prefix,
                schema: operation
            });
        });
    });
};

local.swaggerValidateDataParameters = function (option) {
/*
 * this function will validate the items in option.paramDict
 * against the schemaP's in option.parameters
 */
    var errorList;
    errorList = [];
    option.parameters.forEach(function (schemaP) {
        local.tryCatchOnError(function () {
            local.swaggerValidateDataSchema({
                data: option.data[schemaP.name],
                dataReadonlyRemove: [
                    option.dataReadonlyRemove || {},
                    schemaP.name,
                    option.dataReadonlyRemove && option.dataReadonlyRemove[schemaP.name]
                ],
                prefix: option.prefix.concat([schemaP.name]),
                schema: schemaP,
                swaggerJson: local.swaggerJson
            });
        }, function (errCaught) {
            console.error(errCaught.message);
            errorList.push(errCaught);
            errCaught.errorList = errorList;
        });
    });
    return errorList;
};

local.swaggerValidateDataSchema = function (option) {
/*
 * this function will validate option.data against the swagger option.schema
 * http://json-schema.org/draft-04/json-schema-validation.html#rfc.section.5
 */
    var $ref;
    var circularSet;
    var data;
    var dataReadonlyRemove2;
    var ii;
    var list;
    var oneOf;
    var schema;
    var test;
    var tmp;
    if (!option.schema) {
        return;
    }
    data = option.data;
    option.dataReadonlyRemove = option.dataReadonlyRemove || [{}, "", null];
    dataReadonlyRemove2 = option.dataReadonlyRemove[2] || {};
    schema = option.schema;
    circularSet = new Set();
    while (true) {
        // dereference schema.schema
        while (schema.schema) {
            schema = schema.schema;
        }
        // dereference schema.oneOf
        oneOf = (data && schema.oneOf) || [];
        ii = 0;
        while (ii < oneOf.length) {
            tmp = String(oneOf[ii] && oneOf[ii].$ref)
            .replace("http://json-schema.org/draft-04/schema#", "#");
            switch (tmp + " " + (!local.isNullOrUndefined(data.$ref) || data.in)) {
            case "#/definitions/bodyParameter body":
            case "#/definitions/formDataParameterSubSchema formData":
            case "#/definitions/headerParameterSubSchema header":
            case "#/definitions/jsonReference true":
            case "#/definitions/pathParameterSubSchema path":
            case "#/definitions/queryParameterSubSchema query":
                schema = local.swaggerSchemaJson.definitions[tmp.split("/")[2]];
                break;
            default:
                switch (tmp) {
                case "#/definitions/bodyParameter":
                case "#/definitions/jsonReference":
                    schema = oneOf[ii ^ 1];
                    break;
                }
            }
            if (!schema.oneOf) {
                break;
            }
            ii += 1;
        }
        // dereference schema.$ref
        $ref = schema && schema.$ref;
        if (!$ref) {
            break;
        }
        test = !circularSet.has($ref);
        local.throwSwaggerError(!test && {
            data: data,
            errorType: "schemaDereferenceCircular",
            prefix: option.prefix,
            schema: schema
        });
        circularSet.add($ref);
        // validate semanticWalker6
        test = (
            $ref.indexOf("#/") === 0
            || $ref.indexOf("http://json-schema.org/draft-04/schema#/") === 0
        );
        local.throwSwaggerError(!test && {
            data: $ref,
            errorType: "semanticWalker6",
            prefix: option.prefix.concat(["$ref"])
        });
        switch (option.modeSchema && $ref) {
        case "http://json-schema.org/draft-04/schema#/definitions/parameter":
            // validate semanticFormData1
            test = data.in !== "formdata";
            local.throwSwaggerError(!test && {
                data: data.in,
                errorType: "semanticFormData1",
                prefix: option.prefix.concat(["in"])
            });
            // validate semanticFormData3
            test = data.type !== "file" || data.in === "formData";
            local.throwSwaggerError(!test && {
                data: data,
                errorType: "semanticFormData3",
                prefix: option.prefix
            });
            // validate semanticParameters2
            test = data.in === "body" || !local.isNullOrUndefined(data.type);
            local.throwSwaggerError(!test && {
                data: data,
                errorType: "semanticParameters2",
                prefix: option.prefix
            });
            break;
        case "http://json-schema.org/draft-04/schema#/definitions/schema":
            list = data.required || [];
            ii = 0;
            while (ii < list.length) {
                tmp = list[ii];
                // validate semanticSchema1
                test = !(
                    data.properties
                    && data.properties[tmp]
                    && data.properties[tmp].readOnly
                );
                local.throwSwaggerError(!test && {
                    data: data.properties[tmp],
                    errorType: "semanticSchema1",
                    prefix: option.prefix.concat(["properties", tmp])
                });
                ii += 1;
            }
            // validate semanticWalker1
            test = local.isNullOrUndefined(data.type) || typeof data.type === "string";
            local.throwSwaggerError(!test && {
                data: data.type,
                errorType: "semanticWalker1",
                prefix: option.prefix.concat(["type"])
            });
            // validate semanticWalker2
            test = !(data.maximum < data.minimum);
            local.throwSwaggerError(!test && {
                data: data,
                errorType: "semanticWalker2",
                prefix: option.prefix
            });
            // validate semanticWalker3
            test = !(data.maxProperties < data.minProperties);
            local.throwSwaggerError(!test && {
                data: data,
                errorType: "semanticWalker3",
                prefix: option.prefix
            });
            // validate semanticWalker4
            test = !(data.maxLength < data.minLength);
            local.throwSwaggerError(!test && {
                data: data,
                errorType: "semanticWalker4",
                prefix: option.prefix,
                schema: schema
            });
            break;
        }
        tmp = $ref.split("/").slice(-2);
        schema = (
            $ref.indexOf("http://json-schema.org/draft-04/schema#/") === 0
            ? local.swaggerSchemaJson[tmp[0]]
            : option.swaggerJson[tmp[0]]
        );
        schema = schema && schema[tmp[1]];
        test = schema;
        local.throwSwaggerError(!test && {
            data: data,
            errorType: "schemaDereference",
            prefix: option.prefix,
            schema: option.schema
        });
    }
    if (option.modeDereference) {
        if (option.modeDereferenceDepth > 1) {
            schema = local.jsonCopy(schema);
            Object.keys(schema.properties || {}).forEach(function (key) {
                schema.properties[key] = local.swaggerValidateDataSchema({
                    // dereference property
                    modeDereference: true,
                    modeDereferenceDepth: option.modeDereferenceDepth - 1,
                    prefix: option.prefix.concat(["properties", key]),
                    schema: schema.properties[key],
                    swaggerJson: option.swaggerJson
                });
            });
        }
        return schema;
    }
    // validate schema.default
    if (option.modeDefault) {
        data = schema.default;
    }
    // validate schema.required
    test = (
        option.modeDefault
        || !local.isNullOrUndefined(data)
        || schema.required !== true
        || schema["x-swgg-notRequired"]
    );
    local.throwSwaggerError(!test && {
        data: data,
        errorType: "objectRequired",
        prefix: option.prefix,
        schema: schema
    });
    if (local.isNullOrUndefined(data)) {
        return;
    }
    // validate semanticItemsRequiredForArrayObjects1
    test = (
        !option.modeSchema || local.schemaPType(data) !== "array"
        || (typeof local.schemaPItems(data) === "object" && local.schemaPItems(data))
    );
    local.throwSwaggerError(!test && {
        errorType: "semanticItemsRequiredForArrayObjects1",
        prefix: option.prefix,
        schema: data
    });
    // remove readOnly property
    if (schema.readOnly) {
        delete option.dataReadonlyRemove[0][option.dataReadonlyRemove[1]];
    }
    // optimization - validate schema.type first
    // 5.5.2. type
    // https://swagger.io/docs/specification/data-models/data-types/
    // https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md#data-types
    switch (local.schemaPType(schema)) {
    case "array":
        test = Array.isArray(data);
        break;
    case "boolean":
        test = typeof data === "boolean";
        break;
    case "file":
        test = !option.modeSchema;
        break;
    case "integer":
        test = Number.isInteger(data);
        switch (schema.format) {
        case "int32":
            break;
        case "int64":
            break;
        }
        break;
    case "number":
        test = Number.isFinite(data);
        switch (schema.format) {
        case "double":
            break;
        case "float":
            break;
        }
        break;
    case "string":
        test = (
            typeof data === "string"
            || (!option.modeSchema && schema.format === "binary")
        );
        switch (test && !option.modeSchema && schema.format) {
        // Clarify 'byte' format #50
        // https://github.com/swagger-api/swagger-spec/issues/50
        case "byte":
            test = !(
                /[^\n\r+\/0-9=A-Za-z]/
            ).test(data);
            break;
        case "date":
        case "date-time":
            test = JSON.stringify(new Date(data)) !== "null";
            break;
        case "email":
            test = local.regexpValidateEmail.test(data);
            break;
        case "json":
            test = local.tryCatchOnError(function () {
                JSON.parse(data);
                return true;
            }, local.nop);
            break;
        case "phone":
            test = local.regexpValidatePhone.test(data);
            break;
        }
        break;
    default:
        test = option.modeSchema || typeof data === "object";
    }
    local.throwSwaggerError(!test && {
        data: data,
        errorType: "itemType",
        prefix: option.prefix,
        schema: schema,
        typeof: typeof data
    });
    tmp = typeof data;
    if (tmp === "object" && Array.isArray(data)) {
        tmp = "array";
    }
    switch (tmp) {
    // 5.3. Validation keywords for arrays
    case "array":
        // 5.3.1. additionalItems and items
        // swagger disallows array items
        data.forEach(function (element, ii) {
            // recurse - schema.additionalItems and schema.items
            local.swaggerValidateDataSchema({
                data: element,
                dataReadonlyRemove: [dataReadonlyRemove2, ii, dataReadonlyRemove2[ii]],
                modeSchema: option.modeSchema,
                prefix: option.prefix.concat([ii]),
                schema: local.schemaPItems(schema) || schema.additionalItems,
                swaggerJson: option.swaggerJson
            });
        });
        // 5.3.2. maxItems
        test = typeof schema.maxItems !== "number" || data.length <= schema.maxItems;
        local.throwSwaggerError(!test && {
            data: data,
            errorType: "arrayMaxItems",
            prefix: option.prefix,
            schema: schema
        });
        // 5.3.3. minItems
        test = typeof schema.minItems !== "number" || data.length >= schema.minItems;
        local.throwSwaggerError(!test && {
            data: data,
            errorType: "arrayMinItems",
            prefix: option.prefix,
            schema: schema
        });
        // 5.3.4. uniqueItems
        test = !schema.uniqueItems || data.every(function (element) {
            tmp = element;
            return data.indexOf(element) === data.lastIndexOf(element);
        });
        local.throwSwaggerError(!test && {
            data: data,
            errorType: "arrayUniqueItems",
            prefix: option.prefix,
            schema: schema,
            tmp: tmp
        });
        break;
    // 5.1. Validation keywords for numeric instances (number and integer)
    case "number":
        // 5.1.1. multipleOf
        test = typeof schema.multipleOf !== "number" || data % schema.multipleOf === 0;
        local.throwSwaggerError(!test && {
            data: data,
            errorType: "numberMultipleOf",
            prefix: option.prefix,
            schema: schema
        });
        // 5.1.2. maximum and exclusiveMaximum
        test = typeof schema.maximum !== "number" || (
            schema.exclusiveMaximum
            ? data < schema.maximum
            : data <= schema.maximum
        );
        local.throwSwaggerError(!test && {
            data: data,
            errorType: (
                // ternary-condition
                schema.exclusiveMaximum
                ? "numberExclusiveMaximum"
                : "numberMaximum"
            ),
            prefix: option.prefix,
            schema: schema
        });
        // 5.1.3. minimum and exclusiveMinimum
        test = typeof schema.minimum !== "number" || (
            schema.exclusiveMinimum
            ? data > schema.minimum
            : data >= schema.minimum
        );
        local.throwSwaggerError(!test && {
            data: data,
            errorType: (
                // ternary-condition
                schema.exclusiveMinimum
                ? "numberExclusiveMinimum"
                : "numberMinimum"
            ),
            prefix: option.prefix,
            schema: schema
        });
        break;
    // 5.4. Validation keywords for objects
    case "object":
        // 5.4.1. maxProperties
        test = (
            typeof schema.maxProperties !== "number"
            || Object.keys(data).length <= schema.maxProperties
        );
        local.throwSwaggerError(!test && {
            data: data,
            errorType: "objectMaxProperties",
            prefix: option.prefix,
            schema: schema
        });
        // 5.4.2. minProperties
        test = (
            typeof schema.minProperties !== "number"
            || Object.keys(data).length >= schema.minProperties
        );
        local.throwSwaggerError(!test && {
            data: data,
            errorType: "objectMinProperties",
            prefix: option.prefix,
            schema: schema
        });
        // 5.4.3. required
        (schema.required || []).forEach(function (key) {
            // validate semanticItemsRequiredForArrayObjects2
            test = !local.isNullOrUndefined(data[key]);
            local.throwSwaggerError(!test && {
                data: data,
                errorType: "semanticItemsRequiredForArrayObjects2",
                key: key,
                prefix: option.prefix,
                schema: schema
            });
        });
        // 5.4.4. additionalProperties, properties and patternProperties
        Object.keys(data).forEach(function (key) {
            tmp = null;
            if (schema.properties && schema.properties[key]) {
                tmp = true;
                // recurse - schema.properties
                local.swaggerValidateDataSchema({
                    data: data[key],
                    dataReadonlyRemove: [
                        dataReadonlyRemove2,
                        key,
                        dataReadonlyRemove2[key]
                    ],
                    modeSchema: option.modeSchema,
                    prefix: option.prefix.concat([key]),
                    schema: schema.properties[key],
                    swaggerJson: option.swaggerJson
                });
            }
            Object.keys(schema.patternProperties || {}).forEach(function (rgx) {
                if (new RegExp(rgx).test(key)) {
                    tmp = true;
                    // recurse - schema.patternProperties
                    local.swaggerValidateDataSchema({
                        data: data[key],
                        modeSchema: option.modeSchema,
                        prefix: option.prefix.concat([key]),
                        schema: schema.patternProperties[rgx],
                        swaggerJson: option.swaggerJson
                    });
                }
            });
/*
* validate
* 5.4.4.4. If "additionalProperties" has boolean value false
*
* In this case, validation of the instance depends on the property set of
* "properties" and "patternProperties". In this section, the property names of
* "patternProperties" will be called regexes for convenience.
*
* The first step is to collect the following sets:
*
* s
* The property set of the instance to validate.
* p
* The property set from "properties".
* pp
* The property set from "patternProperties".
* Having collected these three sets, the process is as follows:
*
* remove from "s" all elements of "p", if any;
* for each regex in "pp", remove all elements of "s" which this regex matches.
* Validation of the instance succeeds if, after these two steps, set "s" is empty.
*/
            test = tmp || schema.additionalProperties !== false;
            local.throwSwaggerError(!test && {
                data: data,
                errorType: "objectAdditionalProperties",
                key: key,
                prefix: option.prefix,
                schema: schema
            });
            // recurse - schema.additionalProperties
            local.swaggerValidateDataSchema({
                data: data[key],
                modeSchema: option.modeSchema,
                prefix: option.prefix.concat([key]),
                schema: schema.additionalProperties,
                swaggerJson: option.swaggerJson
            });
        });
        // 5.4.5. dependencies
        Object.keys(schema.dependencies || {}).forEach(function (key) {
            if (local.isNullOrUndefined(data[key])) {
                return;
            }
            // 5.4.5.2.1. Schema dependencies
            // recurse - schema.dependencies
            local.swaggerValidateDataSchema({
                data: data[key],
                modeSchema: option.modeSchema,
                prefix: option.prefix.concat([key]),
                schema: schema.dependencies[key],
                swaggerJson: option.swaggerJson
            });
            // 5.4.5.2.2. Property dependencies
            schema.dependencies[key].every(function (key2) {
                test = !local.isNullOrUndefined(data[key2]);
                local.throwSwaggerError(!test && {
                    data: data,
                    errorType: "objectDependencies",
                    key: key,
                    key2: key2,
                    prefix: option.prefix,
                    schema: schema
                });
            });
        });
        break;
    // 5.2. Validation keywords for strings
    case "string":
        // 5.2.1. maxLength
        test = typeof schema.maxLength !== "number" || data.length <= schema.maxLength;
        local.throwSwaggerError(!test && {
            data: data,
            errorType: "stringMaxLength",
            prefix: option.prefix,
            schema: schema
        });
        // 5.2.2. minLength
        test = typeof schema.minLength !== "number" || data.length >= schema.minLength;
        local.throwSwaggerError(!test && {
            data: data,
            errorType: "stringMinLength",
            prefix: option.prefix,
            schema: schema
        });
        // 5.2.3. pattern
        test = !schema.pattern || new RegExp(schema.pattern).test(data);
        local.throwSwaggerError(!test && {
            data: data,
            errorType: "stringPattern",
            prefix: option.prefix,
            schema: schema
        });
        break;
    }
    // 5.5. Validation keywords for any instance type
    // 5.5.1. enum
    tmp = schema.enum || (!option.modeSchema && (local.schemaPItems(schema) || {}).enum);
    test = !tmp || (
        Array.isArray(data)
        ? data
        : [data]
    ).every(function (element) {
        return tmp.indexOf(element) >= 0;
    });
    local.throwSwaggerError(!test && {
        data: data,
        errorType: "itemEnum",
        prefix: option.prefix,
        schema: schema,
        tmp: tmp
    });
    // 5.5.2. type
    local.nop();
    // 5.5.3. allOf
    (schema.allOf || []).forEach(function (element) {
        // recurse - schema.allOf
        local.swaggerValidateDataSchema({
            data: data,
            prefix: option.prefix,
            modeSchema: option.modeSchema,
            schema: element,
            swaggerJson: option.swaggerJson
        });
    });
    // 5.5.4. anyOf
    tmp = null;
    test = !schema.anyOf || schema.anyOf.some(function (element) {
        local.tryCatchOnError(function () {
            // recurse - schema.anyOf
            local.swaggerValidateDataSchema({
                data: data,
                modeSchema: option.modeSchema,
                prefix: option.prefix,
                schema: element,
                swaggerJson: option.swaggerJson
            });
            return true;
        }, local.nop);
        tmp = tmp || local.utility2._debugTryCatchError;
        return !tmp;
    });
    local.throwSwaggerError(!test && {
        data: data,
        errorType: "itemOneOf",
        prefix: option.prefix,
        schema: schema,
        tmp: tmp
    });
    // 5.5.5. oneOf
    tmp = (
        !schema.oneOf
        ? 1
        : 0
    );
    (schema.oneOf || []).some(function (element) {
        local.tryCatchOnError(function () {
            // recurse - schema.oneOf
            local.swaggerValidateDataSchema({
                data: data,
                modeSchema: option.modeSchema,
                prefix: option.prefix,
                schema: element,
                swaggerJson: option.swaggerJson
            });
            tmp += 1;
        }, local.nop);
        return tmp > 1;
    });
    test = tmp === 1;
    local.throwSwaggerError(!test && {
        data: data,
        errorType: "itemOneOf",
        prefix: option.prefix,
        schema: schema,
        tmp: tmp
    });
    // 5.5.6. not
    test = !schema.not || !local.tryCatchOnError(function () {
        // recurse - schema.not
        local.swaggerValidateDataSchema({
            data: data,
            modeSchema: option.modeSchema,
            prefix: option.prefix,
            schema: schema.not,
            swaggerJson: option.swaggerJson
        });
        return true;
    }, local.nop);
    local.throwSwaggerError(!test && {
        data: data,
        errorType: "itemNot",
        prefix: option.prefix,
        schema: schema
    });
    // 5.5.7. definitions
    local.nop();
    // validate data.$ref
    if (schema === local.swaggerSchemaJson.definitions.jsonReference) {
        local.swaggerValidateDataSchema({
            modeDereference: true,
            modeSchema: option.modeSchema,
            prefix: option.prefix,
            schema: data,
            swaggerJson: option.swaggerJson
        });
    }
    return schema;
};

local.swaggerValidateFile = function (option, onError) {
/*
 * this function will validate the json-file option.file
 */
    local.onNext(option, function (error, data) {
        switch (option.modeNext) {
        case 1:
            if (typeof option.data === "string") {
                option.onNext(null, option.data);
                return;
            }
            // fetch url
            if ((
                /^(?:http|https):\/\//
            ).test(option.file)) {
                local.ajax({
                    url: option.file
                }, function (error, xhr) {
                    option.onNext(error, xhr && xhr.responseText);
                });
                return;
            }
            // read file
            local.fs.readFile(option.file, "utf8", option.onNext);
            break;
        case 2:
            // jslint
            local.jslint.jslintAndPrint(data, option.file);
            local.assertThrow(
                !local.jslint.jslintResult.errorText,
                local.jslint.jslintResult.errorText.replace((
                    /\u001b\[\d*m/g
                ), "")
            );
            // validate
            local.swgg.swaggerValidate(JSON.parse(data));
            option.onNext();
            break;
        default:
            console.error(
                error
                ? "\u001b[31mswagger-validate - failed - " + option.file + "\n"
                + error.message + "\u001b[39m"
                : "swagger-validate - passed - " + option.file
            );
            onError(error);
        }
    });
    option.modeNext = 0;
    option.onNext();
};

local.throwSwaggerError = function (option) {
/*
 * this function will throw a swaggerError with given option.errorType
 */
    var error;
    if (!option) {
        return;
    }
    [0, 2].forEach(function (ii) {
        option["prefix" + ii] = option.prefix[ii] + option.prefix.slice(
            ii + 1
        ).map(function (element) {
            return "[" + JSON.stringify(element) + "]";
        }).join("");
    });
    option.prefix0 += " = " + local.stringTruncate(
        JSON.stringify(option.data) || "undefined",
        100
    );
    option.schema2 = local.stringTruncate(
        JSON.stringify(option.schema) || "undefined",
        500
    );
    option.type2 = (option.schema && local.schemaPType(option.schema)) || "object";
    if (option.schema && option.schema.format) {
        option.type2 += " (" + option.schema.format + ")";
    }
    error = new Error("error." + option.errorType + " - " + local.templateRender(
        local.swaggerErrorTypeDict[option.errorType],
        option,
        {
            notHtmlSafe: true
        }
    ));
    error.messageShort = local.templateRender(
        local.swaggerErrorTypeDict[option.errorType].replace("{{prefix0}}", "{{prefix2}}"),
        option,
        {
            notHtmlSafe: true
        }
    );
    error.option = option;
    error.statusCode = 400;
    throw error;
};

local.uiEventDelegate = function (event) {
    // filter non-input keyup-event
    event.targetOnEvent = event.target.closest(
        "[data-onevent]"
    );
    if (!event.targetOnEvent) {
        return;
    }
    // rate-limit keyup
    if (event.type === "keyup") {
        local.uiEventDelegateKeyupEvent = event;
        if (local.uiEventDelegateKeyupTimerTimeout !== 2) {
            local.uiEventDelegateKeyupTimerTimeout = (
                local.uiEventDelegateKeyupTimerTimeout
                || setTimeout(function () {
                    local.uiEventDelegateKeyupTimerTimeout = 2;
                    local.uiEventDelegate(local.uiEventDelegateKeyupEvent);
                }, 100)
            );
            return;
        }
        local.uiEventDelegateKeyupTimerTimeout = null;
        if (!event.target.closest(
            "input, option, select, textarea"
        )) {
            return;
        }
    }
    switch (event.targetOnEvent.tagName) {
    case "BUTTON":
    case "FORM":
        event.preventDefault();
        break;
    }
    event.stopPropagation();
    local.uiEventListenerDict[event.targetOnEvent.dataset.onevent](event);
};

local.uiEventListenerDict = local.objectAssignDefault(
    globalThis.domOnEventDelegateDict
);

local.uiEventListenerDict.onEventDomDb = local.db.onEventDomDb;

local.uiEventListenerDict.onEventInputTextareaChange = function (event) {
/*
 * this function will show/hide the textarea's multiline placeholder
 */
    var isTransparent;
    var value;
    isTransparent = event.targetOnEvent.style.background.indexOf("transparent") >= 0;
    value = event.targetOnEvent.value;
    if (value && isTransparent) {
        event.targetOnEvent.style.background = "";
    }
    if (!value && !isTransparent) {
        event.targetOnEvent.style.background = "transparent";
    }
    local.uiEventListenerDict.onEventInputValidateAndAjax({
        targetOnEvent: event.targetOnEvent
    });
};

local.uiEventListenerDict.onEventInputValidateAndAjax = function (option, onError) {
/*
 * this function will validate the input parameters
 * against the schemas in option.parameters
 */
    var errorDict;
    var jsonParse;
    var tmp;
    jsonParse = function (text) {
    /*
     * this function will try to JSON.parse(text)
     */
        return local.tryCatchOnError(function () {
            return JSON.parse(text);
        }, function () {
            return text;
        });
    };
    // jslint-hack
    option.targetOnEvent = option.targetOnEvent.closest(
        ".operation"
    );
    option.api = local.apiDict[option.targetOnEvent.dataset._methodPath];
    option.headers = {};
    option.modeAjax = option.modeAjax || "validate";
    option.modeNoDefault = true;
    option.paramDict = {};
    option.url = "";
    option.api.parameters.forEach(function (schemaP) {
        tmp = option.targetOnEvent.querySelector(
            ".schemaP[data-name=" + JSON.stringify(schemaP.name) + "] .input"
        );
        switch (tmp.tagName) {
        case "INPUT":
            // parse file
            if (local.schemaPType(tmp) === "file") {
                tmp = tmp.files && tmp.files[0];
                break;
            }
            tmp = tmp.value;
            if (!tmp) {
                return;
            }
            // parse string
            if (local.schemaPType(schemaP) !== "string") {
                tmp = jsonParse(tmp);
            }
            break;
        case "SELECT":
            tmp = Array.from(tmp.options)
            .filter(function (element) {
                return element.selected;
            })
            .map(function (element) {
                return jsonParse(decodeURIComponent(
                    element.dataset.valueSelectOption
                ));
            });
            if (!tmp.length || tmp[0] === "$swggUndefined") {
                return;
            }
            if (local.schemaPType(schemaP) !== "array") {
                tmp = tmp[0];
            }
            break;
        case "TEXTAREA":
            tmp = tmp.value;
            if (!tmp) {
                return;
            }
            // ignore string (json)
            if (schemaP.format === "json" && local.schemaPType(schemaP) === "string") {
                break;
            }
            if (
                schemaP.schema
                && local.schemaPType(schemaP.schema) === "string"
                && typeof tmp === "string"
            ) {
                break;
            }
            // parse schema
            if (schemaP.in === "body") {
                tmp = jsonParse(tmp);
                break;
            }
            // parse array
            tmp = tmp.split("\n").map(function (element) {
                return (
                    local.schemaPItemsType(schemaP) === "string"
                    ? element
                    : jsonParse(element)
                );
            });
            break;
        }
        option.paramDict[schemaP.name] = tmp;
    });
    option.api.ajax(option, onError || local.nop);
    // init errorDict
    errorDict = {};
    ((option.error && option.error.errorList) || []).forEach(function (error) {
        errorDict[error.option.prefix[2]] = error;
    });
    // shake input on error
    Array.from(option.targetOnEvent.querySelectorAll(
        ".schemaP[data-name]"
    )).forEach(function (element) {
        tmp = errorDict[element.dataset.name];
        local.uiAnimateShakeIfError(tmp, element.querySelector(
            ".input"
        ));
        element.querySelector(
            ".colorError"
        ).textContent = (
            tmp
            ? tmp.messageShort
            : ""
        );
    });
    // shake submit-button on error
    local.uiAnimateShakeIfError(
        option.error,
        option.targetOnEvent.querySelector(
            ".onEventOperationAjax"
        )
    );
    // init requestCurl
    tmp = option.data;
    local.tryCatchOnError(function () {
        tmp = JSON.stringify(JSON.parse(option.data), null, 4);
    }, local.nop);
    tmp = (
        "curl \\\n" + "--request " + option.api._method + " \\\n"
        + Object.keys(option.headers).map(function (key) {
            return "--header '" + key + ": " + option.headers[key] + "' \\\n";
        }).join("") + "--data-binary " + (
            typeof tmp === "string"
            ? "'" + tmp.replace((
                /'/g
            ), "'\"'\"'") + "'"
            : "<blob>"
        ) + " \\\n\"" + option.url.replace((
            /&/g
        ), "&\\\n") + "\""
    );
    option.targetOnEvent.querySelector(
        ".requestCurl"
    ).textContent = tmp;
    // init requestJavascript
    option.targetOnEvent.querySelector(
        ".requestJavascript"
    ).textContent = local.templateRender(
        local.templateUiRequestJavascript,
        {
            option: option,
            optionJson: JSON.stringify({
                paramDict: option.paramDict
            }, null, 4)
        },
        {
            notHtmlSafe: true
        }
    );
};

local.uiEventListenerDict.onEventOperationAjax = function (option) {
/*
 * this function will submit the operation to the backend
 */
    // ensure option is stateless
    option = {
        targetOnEvent: option.targetOnEvent.closest(
            ".operation"
        )
    };
    local.onNext(option, function (error, data) {
        switch (option.modeNext) {
        case 1:
            // force ajax
            option.modeAjax = "ajax";
            // validate input
            local.uiEventListenerDict.onEventInputValidateAndAjax(
                option,
                option.onNext
            );
            // reset response output
            Array.from(option.targetOnEvent.querySelectorAll(
                ".resBody, .resHeaders, .resStatusCode"
            )).forEach(function (element) {
                element.classList.remove("hasError");
                element.textContent = "loading ...";
            });
            option.targetOnEvent.querySelector(
                ".resMedia"
            ).innerHTML = "";
            // scrollTo response
            option.targetOnEvent.querySelector(
                ".resStatusCode"
            ).focus();
            break;
        default:
            local.onErrorDefault(error);
            data = local.objectSetDefault(data, {
                contentType: "undefined",
                statusCode: "undefined"
            });
            // init responseStatusCode
            option.targetOnEvent.querySelector(
                ".resStatusCode"
            ).textContent = (
                data.statusCode
            );
            // init resHeaders
            option.targetOnEvent.querySelector(
                ".resHeaders"
            ).textContent = Object.keys(data.resHeaders).map(function (key) {
                return key + ": " + data.resHeaders[key] + "\r\n";
            }).join("");
            // init responseBody
            option.targetOnEvent.querySelector(
                ".resHeaders"
            ).textContent.replace((
                /^content-type:(.*?)$/im
            ), function (ignore, match1) {
                data.contentType = match1.trim();
            });
            data.mediaType = data.contentType.split("/")[0].replace("image", "img");
            switch (data.mediaType) {
            case "audio":
            case "img":
            case "video":
                option.targetOnEvent.querySelector(
                    ".resBody"
                ).textContent = (
                    data.contentType
                );
                option.targetOnEvent.querySelector(
                    ".resMedia"
                ).innerHTML = (
                    "<" + data.mediaType
                    + " class=\"domOnEventMediaHotkeysInit\" controls src=\"data:"
                    + data.contentType
                    + ";base64," + local.base64FromBuffer(data.resBuffer) + "\"></"
                    + data.mediaType + ">"
                );
                globalThis.domOnEventMediaHotkeys("init");
                break;
            default:
                option.targetOnEvent.querySelector(
                    ".resBody"
                ).textContent = (
                    data.responseJson
                    ? JSON.stringify(data.responseJson, null, 4)
                    : data.response
                );
            }
            // shake response on error
            Array.from(option.targetOnEvent.querySelectorAll(
                ".resBody, .resHeaders, .resStatusCode"
            )).forEach(function (element) {
                local.uiAnimateShakeIfError(data.statusCode >= 400, element);
            });
        }
    });
    option.modeNext = 0;
    option.onNext();
};

local.uiEventListenerDict.onEventOperationDisplayShow = function (event, onError) {
/*
 * this function will toggle the display of the operation
 */
    var element;
    element = event.targetOnEvent;
    element = element.querySelector(
        ".operation"
    ) || element.closest(
        ".operation"
    );
    location.hash = "!" + element.id;
    element.closest(
        ".resource"
    ).classList.remove("expanded");
    // show parent resource
    local.uiAnimateSlideDown(element.closest(
        ".resource"
    ).querySelector(
        ".operationList"
    ));
    // show the operation, but hide all other operations
    local.uiAnimateSlideAccordian(
        element.querySelector(
            ".operation > form"
        ),
        Array.from(element.closest(
            ".operationList"
        ).querySelectorAll(
            ".operation > form"
        )),
        function () {
            // scrollTo operation
            element.querySelector(
                "[tabIndex]"
            ).blur();
            element.querySelector(
                "[tabIndex]"
            ).focus();
            // validate input
            local.uiEventListenerDict.onEventInputValidateAndAjax({
                targetOnEvent: element
            });
            local.setTimeoutOnError(onError, 0, null, element);
        }
    );
};

local.uiEventListenerDict.onEventResourceDisplayAction = function (event) {
/*
 * this function will toggle the display of the resource
 */
    location.hash = "!" + event.currentTarget.id;
    event.targetOnEvent.className.split(" ").some(function (className) {
        switch (className) {
        case "td1":
            // show the resource, but hide all other resources
            local.uiAnimateSlideAccordian(
                event.currentTarget.querySelector(
                    ".operationList"
                ),
                Array.from(document.querySelectorAll(
                    ".swggUiContainer .operationList"
                ))
            );
            // show at least one operation in the resource
            local.uiEventListenerDict.onEventOperationDisplayShow({
                targetOnEvent: event.currentTarget.querySelector(
                    ".operation .uiAnimateSlide[style*=\"max-height: 100%\"]"
                ) || event.currentTarget.querySelector(
                    ".operation"
                )
            });
            return true;
        case "td2":
            // show the resource, but hide all other resources
            local.uiAnimateSlideAccordian(
                event.currentTarget.querySelector(
                    ".operationList"
                ),
                Array.from(document.querySelectorAll(
                    ".swggUiContainer .operationList"
                ))
            );
            // collapse all operations in the resource
            if (event.currentTarget.classList.contains("expanded")) {
                event.currentTarget.classList.remove("expanded");
                Array.from(event.currentTarget.querySelectorAll(
                    ".operation > form"
                )).forEach(function (element) {
                    local.uiAnimateSlideUp(element);
                });
            // expand all operations in the resource
            } else {
                event.currentTarget.classList.add("expanded");
                Array.from(event.currentTarget.querySelectorAll(
                    ".operation > form"
                )).forEach(function (element) {
                    local.uiAnimateSlideDown(element);
                    // validate input
                    local.uiEventListenerDict.onEventInputValidateAndAjax({
                        targetOnEvent: element
                    });
                });
            }
            return true;
        }
    });
};

local.uiEventListenerDict.onEventUiReload = function (option, onError) {
/*
 * this function will reload the ui
 */
    var resource;
    var swaggerJson;
    option = option || {};
    swaggerJson = option;
    local.onNext(option, function (error, data) {
        switch (option.modeNext) {
        case 1:
            if (
                event
                && event.targetOnEvent
                && !event.targetOnEvent.classList.contains(
                    "eventDelegate"
                    + event.type[0].toUpperCase()
                    + event.type.slice(1)
                )
            ) {
                return;
            }
            option.inputUrl = document.querySelector(
                ".swggUiContainer > .thead > .td2"
            );
            // clear all apiKeyValue's from localStorage
            if (
                option.targetOnEvent
                && option.targetOnEvent.id === "swggApiKeyClearButton1"
            ) {
                local.apiKeyValue = "";
                Object.keys(localStorage).forEach(function (key) {
                    if (key.indexOf("utility2_swgg_apiKeyKey_") === 0) {
                        localStorage.removeItem(key);
                    }
                });
            // restore apiKeyValue
            } else if (option.swggInit) {
                local.apiKeyKey = "utility2_swgg_apiKeyKey_" + encodeURIComponent(
                    local.urlParse(option.inputUrl.value.replace((
                        /^\//
                    ), "")).href
                );
                local.apiKeyValue = localStorage.getItem(local.apiKeyKey) || "";
            // save apiKeyValue
            } else {
                local.apiKeyValue = document.querySelector(
                    "#swggApiKeyInput1"
                ).value;
                local.localStorageSetItemOrClear(local.apiKeyKey, local.apiKeyValue);
            }
            // if keyup-event is not return-key, then return
            if (
                (option.type === "keyup" && option.code !== "Enter")
                // do not reload ui during test
                || globalThis.utility2_modeTest >= 4
            ) {
                option.modeNext = Infinity;
                option.onNext();
                return;
            }
            // reset ui
            document.querySelector(
                "#swggUiReloadErrorDiv1"
            ).textContent = "";
            Array.from(document.querySelectorAll(
                ".swggUiContainer > .reset"
            )).forEach(function (element) {
                element.remove();
            });
            // normalize swaggerJsonUrl
            option.inputUrl.value = local.urlParse(
                option.inputUrl.value.replace((
                    /^\//
                ), "")
            ).href;
            document.querySelector(
                "#swggAjaxProgressDiv1 span"
            ).innerHTML = (
                "loading swagger.json"
            );
            option.onNext();
            break;
        case 2:
            // fetch swagger.json file
            local.ajax({
                url: option.inputUrl.value
            }, option.onNext);
            break;
        case 3:
            // JSON.parse swagger.json string
            local.tryCatchOnError(function () {
                option.onNext(null, JSON.parse(data.responseText));
            }, option.onNext);
            break;
        case 4:
            // reset state
            local.apiDict = null;
            local.swaggerJson = null;
            // apiUpdate swagger.json object
            local.apiUpdate(data);
            swaggerJson = local.jsonCopy(local.swaggerJson);
            local.uiState = swaggerJson;
            // init ajaxProgressText
            swaggerJson.ajaxProgressText = "rendering swagger.json";
            // init apiKeyValue
            swaggerJson.apiKeyValue = local.apiKeyValue;
            // templateRender title
            document.querySelector(
                "head > title"
            ).textContent = local.templateRender(
                local.templateUiTitle,
                swaggerJson
            ).trim();
            // init urlSwaggerJson
            swaggerJson.urlSwaggerJson = option.inputUrl.value;
            // templateRender main
            document.querySelector(
                ".swggUiContainer"
            ).innerHTML = local.templateRender(
                local.templateUiMain,
                swaggerJson
            );
            setTimeout(function () {
                // recurse - render .resourceList
                local.uiEventListenerDict.onEventUiReload(
                    swaggerJson,
                    option.onNext
                );
            }, 100);
            break;
        default:
            local.onErrorDefault(error);
            // debug error
            local._debugOnEventUiReload = error || local._debugOnEventUiReload;
            document.querySelector(
                "#swggUiReloadErrorDiv1"
            ).textContent = (
                (error || {
                    message: ""
                }).message
            );
            local.setTimeoutOnError(onError, 0, error);
        }
    });
    // optimization - render .swggUiContainer first
    if (!swaggerJson.swagger) {
        option.modeNext = 0;
        option.onNext();
        return;
    }
    // optimization - render .resourceList in separate event-loop
    // reset state
    local.idDomElementDict = {};
    local.objectSetDefault(swaggerJson, {
        resourceDict: {},
        operationDict: {},
        tagDict: {}
    });
    // init tagDict
    swaggerJson.tags.forEach(function (tag) {
        swaggerJson.tagDict[tag.name] = tag;
    });
    // init operationDict
    Object.keys(local.apiDict).sort().forEach(function (operation) {
        // init operation
        operation = local.jsonCopy(local.apiDict[operation]);
        operation.tags.forEach(function (tag) {
            swaggerJson.operationDict[operation._methodPath] = operation;
            // init resource
            swaggerJson.resourceDict[tag] = local.objectSetDefault(
                swaggerJson.resourceDict[tag] || swaggerJson.tagDict[tag],
                {
                    description: "no description",
                    name: tag
                }
            );
            resource = swaggerJson.resourceDict[tag];
            resource.id = resource.id || local.idDomElementCreate("swgg_id_" + tag);
            resource.summary = resource.summary || String(resource.description)
            .replace((
                /\bhttps?:\/\/[^\s<]+[^<.,:;"')\]\s]/g
            ), "");
        });
    });
    // init uiFragment
    swaggerJson.uiFragment = document.createDocumentFragment();
    // init resourceDict
    Object.keys(swaggerJson.resourceDict).sort().forEach(function (key) {
        // templateRender resource
        swaggerJson.uiFragment.appendChild(
            local.domElementRender(local.templateUiResource, swaggerJson.resourceDict[key])
        );
    });
    Object.keys(swaggerJson.operationDict).sort(function (aa, bb) {
        aa = swaggerJson.operationDict[aa];
        aa = aa["x-swgg-sortValue"] || (aa._path + " " + aa._method);
        bb = swaggerJson.operationDict[bb];
        bb = bb["x-swgg-sortValue"] || (bb._path + " " + bb._method);
        return (
            aa < bb
            ? -1
            : 1
        );
    }).forEach(function (operation) {
        operation = swaggerJson.operationDict[operation];
        operation.id = local.idDomElementCreate("swgg_id_" + operation.operationId);
        operation.tags.forEach(function (tag) {
            // create new operation for each tag
            operation = local.jsonCopy(operation);
            resource = swaggerJson.resourceDict[tag];
            local.objectSetDefault(operation, {
                description: "no description",
                responseList: Object.keys(operation.responses).sort().map(function (key) {
                    return {
                        key: key,
                        value: operation.responses[key]
                    };
                })
            });
            operation.summary = operation.summary || operation.description
            .replace((
                /\bhttps?:\/\/[^\s<]+[^<.,:;"')\]\s]/g
            ), "");
            operation.parameters.forEach(local.uiRenderSchemaP);
            // templateRender operation
            swaggerJson.uiFragment.querySelector(
                "#" + resource.id + " .operationList"
            )
            .appendChild(local.domElementRender(local.templateUiOperation, operation));
        });
    });
    // emulate <ol></ol> for operations
    Array.from(swaggerJson.uiFragment.querySelectorAll(
        ".operationList"
    )).forEach(function (element) {
        Array.from(element.querySelectorAll(
            ".operation > .thead > .td1"
        )).forEach(function (element, ii) {
            element.textContent = ii + 1 + ".";
        });
    });
    // append uiFragment to swggUiContainer
    document.querySelector(
        "#swggAjaxProgressDiv1"
    ).style.display = "none";
    document.querySelector(
        ".swggUiContainer .resourceList"
    ).appendChild(
        swaggerJson.uiFragment
    );
    Array.from(document.querySelectorAll(
        ".swggUiContainer [data-value-text]"
    )).forEach(function (element) {
        // render valueText
        element.value = decodeURIComponent(element.dataset.valueText);
        delete element.dataset.valueText;
        // init textarea's multiline placeholder
        if (element.tagName === "TEXTAREA") {
            local.uiEventListenerDict.onEventInputTextareaChange({
                targetOnEvent: element
            });
        }
    });
    // init event-handling
    ["Change", "Click", "Keyup", "Submit"].forEach(function (eventType) {
        Array.from(document.querySelectorAll(
            ".eventDelegate" + eventType
        )).forEach(function (element) {
            element.addEventListener(
                eventType.toLowerCase(),
                local.uiEventDelegate
            );
        });
    });
    // scrollTo location.hash
    local.uiEventListenerDict.onEventOperationDisplayShow({
        targetOnEvent: (
            document.querySelector(
                "#" + (location.hash.slice(2) || "undefined")
            )
            || document.querySelector(
                ".swggUiContainer .operation"
            )
        )
    });
    local.setTimeoutOnError(onError);
};

local.uiRenderSchemaP = function (schemaP) {
/*
 * this function will render schemaP
 */
    // init schemaP.id
    schemaP.id = local.idDomElementCreate("swgg_id_" + schemaP.name);
    // init enum
    schemaP.enum2 = (
        schemaP.enum
        || (local.schemaPItems(schemaP) || {}).enum
        || (local.schemaPType(schemaP) === "boolean" && [false, true])
    );
    // init input - file
    if (local.schemaPType(schemaP) === "file") {
        schemaP.isFile = true;
    // init input - textarea
    } else if (schemaP.in === "body") {
        schemaP.isTextarea = true;
    // init input - select
    } else if (schemaP.enum2) {
        // init enumDefault
        schemaP.enumDefault = [];
        if (schemaP.required && schemaP.default !== undefined) {
            schemaP.enumDefault = (
                local.schemaPType(schemaP) === "array"
                ? schemaP.default
                : [schemaP.default]
            );
        }
        schemaP.isSelectMultiple = local.schemaPType(schemaP) === "array";
        schemaP.selectOptionList = schemaP.enum2.map(function (element) {
            // init hasDefault
            schemaP.hasDefault = (
                schemaP.hasDefault
                || schemaP.enumDefault.indexOf(element) >= 0
            );
            return {
                id: local.idDomElementCreate("swgg_id_" + schemaP.name),
                selected: (
                    // ternary-condition
                    schemaP.enumDefault.indexOf(element) >= 0
                    ? "selected"
                    : ""
                ),
                type: (
                    local.schemaPItemsType(schemaP)
                    || local.schemaPType(schemaP)
                ),
                placeholder: (
                    // ternary-condition
                    typeof element === "string"
                    ? element
                    : JSON.stringify(element)
                ),
                valueSelectOption: element
            };
        });
        // init 'undefined' value
        if (!schemaP.required && !schemaP.hasDefault) {
            schemaP.selectOptionList.unshift({
                id: local.idDomElementCreate("swgg_id_" + schemaP.name),
                selected: "selected",
                type: local.schemaPType(schemaP),
                placeholder: "<none>",
                valueSelectOption: "$swggUndefined"
            });
        }
        // select at least one value
        schemaP.selectOptionList.some(function (element, ii) {
            if (ii === 0 || element.selected) {
                element.selected = "selected";
                if (ii !== 0) {
                    schemaP.selectOptionList[0].selected = "";
                    return true;
                }
            }
        });
    // init input - textarea
    } else if (local.schemaPType(schemaP) === "array" || (
        schemaP.format === "json"
        && local.schemaPType(schemaP) === "string"
    )) {
        schemaP.isTextarea = true;
    // init input - number
    } else if (schemaP.type === "integer" || schemaP.type === "number") {
        schemaP.isInputNumber = true;
    // init input - text
    } else {
        schemaP.isInputText = true;
    }
    // init format2 / type2
    ([schemaP, schemaP.schema || {}]).some(function (element) {
        local.objectSetDefault(schemaP, {
            format2: local.schemaPItemsType(element) || element.format,
            type2: local.schemaPType(element)
        });
        return schemaP.type2;
    });
    schemaP.type2 = schemaP.type2 || "object";
    // init schema2
    ([
        schemaP,
        local.schemaPItems(schemaP),
        schemaP.schema,
        schemaP.schema && local.schemaPItems(schemaP.schema)
    ]).some(function (element) {
        schemaP.schema2 = (local.swaggerValidateDataSchema({
            // dereference schemaP
            modeDereference: true,
            modeDereferenceDepth: 2,
            prefix: ["parameters", schemaP.name],
            schema: element,
            swaggerJson: local.swaggerJson
        }) || {});
        return schemaP.schema2.properties;
    });
    if (schemaP.schema2.properties) {
        schemaP.schemaText = JSON.stringify((
            // ternary-condition
            schemaP.type2 === "array"
            ? [schemaP.schema2.properties]
            : schemaP.schema2.properties
        ), null, 4);
    }
    // init placeholder
    schemaP.placeholder = (
        !local.isNullOrUndefined(schemaP.default)
        ? schemaP.default
        : local.dbFieldRandomCreate({
            modeNotRandom: true,
            schemaP: schemaP
        })
    );
    if (typeof schemaP.placeholder !== "string") {
        if (schemaP.in === "body") {
            schemaP.placeholder = JSON.stringify(schemaP.placeholder, null, 4);
        } else if (Array.isArray(schemaP.placeholder)) {
            schemaP.placeholder = schemaP.placeholder.map(function (element) {
                return (
                    typeof element === "string"
                    ? element
                    : JSON.stringify(element)
                );
            }).join("\n");
        } else {
            schemaP.placeholder = JSON.stringify(schemaP.placeholder);
        }
    } else if (schemaP.format === "json") {
        schemaP.placeholder = JSON.stringify(JSON.parse(schemaP.placeholder), null, 4);
    }
    // init valueText
    schemaP.valueText = (
        schemaP["x-swgg-apiKey"]
        ? local.apiKeyValue
        : schemaP.default === null
        ? ""
        : (schemaP.required || schemaP.isTextarea)
        ? schemaP.placeholder
        : ""
    );
    // templateRender schemaP
    schemaP.innerHTML = local.templateRender(local.templateUiParameter, schemaP);
};

local.urlParseWithBraket = function (url) {
/*
 * this function will urlParse the url with curly-brackets preserved
 */
    var tmp;
    tmp = local.stringUniqueKey(url);
    return JSON.parse(JSON.stringify(
        local.urlParse(url.replace((
            /\{/g
        ), tmp + 1).replace((
            /\}/g
        ), tmp + 2))
    ).replace(new RegExp(tmp + 1, "g"), "{").replace(new RegExp(tmp + 2, "g"), "}"));
};

local.userLoginByPassword = function (option, onError) {
/*
 * this function will send a login-by-password request
 */
    local.apiDict["GET /user/userLoginByPassword"].ajax({
        paramDict: {
            password: option.password,
            username: option.username
        }
    }, onError);
};

local.userLogout = function (option, onError) {
/*
 * this function will send a logout request
 */
    local.apiDict["GET /user/userLogout"].ajax(option, onError);
};
}());



// run node js-env code - init-after
/* istanbul ignore next */
(function () {
if (local.isBrowser) {
    return;
}
local.assetsDict["/assets.swagger-ui.logo.medium.png"] = Buffer.from(
    local.templateSwaggerUiLogoMediumBase64,
    "base64"
);
local.assetsDict["/assets.swagger-ui.logo.small.png"] = Buffer.from(
    local.templateSwaggerUiLogoSmallBase64,
    "base64"
);
local.swgg.apiUpdate(
    local.fsReadFileOrEmptyStringSync(local.__dirname + "/assets.swgg.swagger.json", "json")
);
}());



}());
