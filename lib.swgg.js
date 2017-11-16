/* istanbul instrument in package swgg */
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
    /* istanbul ignore next */
    if (typeof global === 'object' &&
            !global.utility2_app &&
            global.utility2_rollup &&
            global.process &&
            global.process.env.npm_package_nameLib === 'swgg') {
        return;
    }



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
        // init utility2_rollup
        local = local.global.utility2_rollup || local;
        // init lib
        local.local = local.swgg = local;
        // init exports
        if (local.modeJs === 'browser') {
            local.global.utility2_swgg = local;
        } else {
            // require builtins
            Object.keys(process.binding('natives')).forEach(function (key) {
                if (!local[key] && !(/\/|^_|^sys$/).test(key)) {
                    local[key] = require(key);
                }
            });
            module.exports = local;
            module.exports.__dirname = __dirname;
            module.exports.module = module;
        }
        // init lib swgg
        local.global.swgg = local.global.utility2_swgg = local.swgg = local;
        // init lib utility2
        local.utility2 = local.global.utility2_rollup || (local.modeJs === 'browser'
            ? local.global.utility2
            : (function () {
                try {
                    return require(__dirname + '/lib.utility2.js');
                } catch (errorCaught) {
                    return require(__dirname + '/assets.utility2.rollup.js');
                }
            }()));
        local.utility2.objectSetDefault(local, local.utility2);
        local.utility2.swgg = local;
        // init assets and templates
/* jslint-ignore-begin */
// https://github.com/json-schema-org/json-schema-org.github.io/blob/eb4805e94c3e27932352344767d19cc4c3c3381c/draft-04/schema
// curl -Ls https://raw.githubusercontent.com/json-schema-org/json-schema-org.github.io/eb4805e94c3e27932352344767d19cc4c3c3381c/draft-04/schema > /tmp/aa.json; node -e "console.log(JSON.stringify(require('/tmp/aa.json')));"
local.assetsDict['/assets.swgg.json-schema.json'] = JSON.stringify(
{"id":"http://json-schema.org/draft-04/schema#","$schema":"http://json-schema.org/draft-04/schema#","description":"Core schema meta-schema","definitions":{"schemaArray":{"type":"array","minItems":1,"items":{"$ref":"#"}},"positiveInteger":{"type":"integer","minimum":0},"positiveIntegerDefault0":{"allOf":[{"$ref":"#/definitions/positiveInteger"},{"default":0}]},"simpleTypes":{"enum":["array","boolean","integer","null","number","object","string"]},"stringArray":{"type":"array","items":{"type":"string"},"minItems":1,"uniqueItems":true}},"type":"object","properties":{"id":{"type":"string","format":"uri"},"$schema":{"type":"string","format":"uri"},"title":{"type":"string"},"description":{"type":"string"},"default":{},"multipleOf":{"type":"number","minimum":0,"exclusiveMinimum":true},"maximum":{"type":"number"},"exclusiveMaximum":{"type":"boolean","default":false},"minimum":{"type":"number"},"exclusiveMinimum":{"type":"boolean","default":false},"maxLength":{"$ref":"#/definitions/positiveInteger"},"minLength":{"$ref":"#/definitions/positiveIntegerDefault0"},"pattern":{"type":"string","format":"regex"},"additionalItems":{"anyOf":[{"type":"boolean"},{"$ref":"#"}],"default":{}},"items":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/schemaArray"}],"default":{}},"maxItems":{"$ref":"#/definitions/positiveInteger"},"minItems":{"$ref":"#/definitions/positiveIntegerDefault0"},"uniqueItems":{"type":"boolean","default":false},"maxProperties":{"$ref":"#/definitions/positiveInteger"},"minProperties":{"$ref":"#/definitions/positiveIntegerDefault0"},"required":{"$ref":"#/definitions/stringArray"},"additionalProperties":{"anyOf":[{"type":"boolean"},{"$ref":"#"}],"default":{}},"definitions":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"properties":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"patternProperties":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"dependencies":{"type":"object","additionalProperties":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/stringArray"}]}},"enum":{"type":"array","minItems":1,"uniqueItems":true},"type":{"anyOf":[{"$ref":"#/definitions/simpleTypes"},{"type":"array","items":{"$ref":"#/definitions/simpleTypes"},"minItems":1,"uniqueItems":true}]},"allOf":{"$ref":"#/definitions/schemaArray"},"anyOf":{"$ref":"#/definitions/schemaArray"},"oneOf":{"$ref":"#/definitions/schemaArray"},"not":{"$ref":"#"}},"dependencies":{"exclusiveMaximum":["maximum"],"exclusiveMinimum":["minimum"]},"default":{}}
);



// https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/schemas/v2.0/schema.json
// curl -Ls https://raw.githubusercontent.com/OAI/OpenAPI-Specification/3.0.0/schemas/v2.0/schema.json > /tmp/aa.json; node -e "console.log(JSON.stringify(require('/tmp/aa.json')));"
local.assetsDict['/assets.swgg.schema.json'] = JSON.stringify(
{"title":"A JSON Schema for Swagger 2.0 API.","id":"http://swagger.io/v2/schema.json#","$schema":"http://json-schema.org/draft-04/schema#","type":"object","required":["swagger","info","paths"],"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"swagger":{"type":"string","enum":["2.0"],"description":"The Swagger version of this document."},"info":{"$ref":"#/definitions/info"},"host":{"type":"string","pattern":"^[^{}/ :\\\\]+(?::\\d+)?$","description":"The host (name or ip) of the API. Example: 'swagger.io'"},"basePath":{"type":"string","pattern":"^/","description":"The base path to the API. Example: '/api'."},"schemes":{"$ref":"#/definitions/schemesList"},"consumes":{"description":"A list of MIME types accepted by the API.","allOf":[{"$ref":"#/definitions/mediaTypeList"}]},"produces":{"description":"A list of MIME types the API can produce.","allOf":[{"$ref":"#/definitions/mediaTypeList"}]},"paths":{"$ref":"#/definitions/paths"},"definitions":{"$ref":"#/definitions/definitions"},"parameters":{"$ref":"#/definitions/parameterDefinitions"},"responses":{"$ref":"#/definitions/responseDefinitions"},"security":{"$ref":"#/definitions/security"},"securityDefinitions":{"$ref":"#/definitions/securityDefinitions"},"tags":{"type":"array","items":{"$ref":"#/definitions/tag"},"uniqueItems":true},"externalDocs":{"$ref":"#/definitions/externalDocs"}},"definitions":{"info":{"type":"object","description":"General information about the API.","required":["version","title"],"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"title":{"type":"string","description":"A unique and precise title of the API."},"version":{"type":"string","description":"A semantic version number of the API."},"description":{"type":"string","description":"A longer description of the API. Should be different from the title.  GitHub Flavored Markdown is allowed."},"termsOfService":{"type":"string","description":"The terms of service for the API."},"contact":{"$ref":"#/definitions/contact"},"license":{"$ref":"#/definitions/license"}}},"contact":{"type":"object","description":"Contact information for the owners of the API.","additionalProperties":false,"properties":{"name":{"type":"string","description":"The identifying name of the contact person/organization."},"url":{"type":"string","description":"The URL pointing to the contact information.","format":"uri"},"email":{"type":"string","description":"The email address of the contact person/organization.","format":"email"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"license":{"type":"object","required":["name"],"additionalProperties":false,"properties":{"name":{"type":"string","description":"The name of the license type. It's encouraged to use an OSI compatible license."},"url":{"type":"string","description":"The URL pointing to the license.","format":"uri"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"paths":{"type":"object","description":"Relative paths to the individual endpoints. They must be relative to the 'basePath'.","patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"},"^/":{"$ref":"#/definitions/pathItem"}},"additionalProperties":false},"definitions":{"type":"object","additionalProperties":{"$ref":"#/definitions/schema"},"description":"One or more JSON objects describing the schemas being consumed and produced by the API."},"parameterDefinitions":{"type":"object","additionalProperties":{"$ref":"#/definitions/parameter"},"description":"One or more JSON representations for parameters"},"responseDefinitions":{"type":"object","additionalProperties":{"$ref":"#/definitions/response"},"description":"One or more JSON representations for parameters"},"externalDocs":{"type":"object","additionalProperties":false,"description":"information about external documentation","required":["url"],"properties":{"description":{"type":"string"},"url":{"type":"string","format":"uri"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"examples":{"type":"object","additionalProperties":true},"mimeType":{"type":"string","description":"The MIME type of the HTTP message."},"operation":{"type":"object","required":["responses"],"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"tags":{"type":"array","items":{"type":"string"},"uniqueItems":true},"summary":{"type":"string","description":"A brief summary of the operation."},"description":{"type":"string","description":"A longer description of the operation, GitHub Flavored Markdown is allowed."},"externalDocs":{"$ref":"#/definitions/externalDocs"},"operationId":{"type":"string","description":"A unique identifier of the operation."},"produces":{"description":"A list of MIME types the API can produce.","allOf":[{"$ref":"#/definitions/mediaTypeList"}]},"consumes":{"description":"A list of MIME types the API can consume.","allOf":[{"$ref":"#/definitions/mediaTypeList"}]},"parameters":{"$ref":"#/definitions/parametersList"},"responses":{"$ref":"#/definitions/responses"},"schemes":{"$ref":"#/definitions/schemesList"},"deprecated":{"type":"boolean","default":false},"security":{"$ref":"#/definitions/security"}}},"pathItem":{"type":"object","additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"$ref":{"type":"string"},"get":{"$ref":"#/definitions/operation"},"put":{"$ref":"#/definitions/operation"},"post":{"$ref":"#/definitions/operation"},"delete":{"$ref":"#/definitions/operation"},"options":{"$ref":"#/definitions/operation"},"head":{"$ref":"#/definitions/operation"},"patch":{"$ref":"#/definitions/operation"},"parameters":{"$ref":"#/definitions/parametersList"}}},"responses":{"type":"object","description":"Response objects names can either be any valid HTTP status code or 'default'.","minProperties":1,"additionalProperties":false,"patternProperties":{"^([0-9]{3})$|^(default)$":{"$ref":"#/definitions/responseValue"},"^x-":{"$ref":"#/definitions/vendorExtension"}},"not":{"type":"object","additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}}},"responseValue":{"oneOf":[{"$ref":"#/definitions/response"},{"$ref":"#/definitions/jsonReference"}]},"response":{"type":"object","required":["description"],"properties":{"description":{"type":"string"},"schema":{"oneOf":[{"$ref":"#/definitions/schema"},{"$ref":"#/definitions/fileSchema"}]},"headers":{"$ref":"#/definitions/headers"},"examples":{"$ref":"#/definitions/examples"}},"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"headers":{"type":"object","additionalProperties":{"$ref":"#/definitions/header"}},"header":{"type":"object","additionalProperties":false,"required":["type"],"properties":{"type":{"type":"string","enum":["string","number","integer","boolean","array"]},"format":{"type":"string"},"items":{"$ref":"#/definitions/primitivesItems"},"collectionFormat":{"$ref":"#/definitions/collectionFormat"},"default":{"$ref":"#/definitions/default"},"maximum":{"$ref":"#/definitions/maximum"},"exclusiveMaximum":{"$ref":"#/definitions/exclusiveMaximum"},"minimum":{"$ref":"#/definitions/minimum"},"exclusiveMinimum":{"$ref":"#/definitions/exclusiveMinimum"},"maxLength":{"$ref":"#/definitions/maxLength"},"minLength":{"$ref":"#/definitions/minLength"},"pattern":{"$ref":"#/definitions/pattern"},"maxItems":{"$ref":"#/definitions/maxItems"},"minItems":{"$ref":"#/definitions/minItems"},"uniqueItems":{"$ref":"#/definitions/uniqueItems"},"enum":{"$ref":"#/definitions/enum"},"multipleOf":{"$ref":"#/definitions/multipleOf"},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"vendorExtension":{"description":"Any property starting with x- is valid.","additionalProperties":true,"additionalItems":true},"bodyParameter":{"type":"object","required":["name","in","schema"],"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"description":{"type":"string","description":"A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed."},"name":{"type":"string","description":"The name of the parameter."},"in":{"type":"string","description":"Determines the location of the parameter.","enum":["body"]},"required":{"type":"boolean","description":"Determines whether or not this parameter is required or optional.","default":false},"schema":{"$ref":"#/definitions/schema"}},"additionalProperties":false},"headerParameterSubSchema":{"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"required":{"type":"boolean","description":"Determines whether or not this parameter is required or optional.","default":false},"in":{"type":"string","description":"Determines the location of the parameter.","enum":["header"]},"description":{"type":"string","description":"A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed."},"name":{"type":"string","description":"The name of the parameter."},"type":{"type":"string","enum":["string","number","boolean","integer","array"]},"format":{"type":"string"},"items":{"$ref":"#/definitions/primitivesItems"},"collectionFormat":{"$ref":"#/definitions/collectionFormat"},"default":{"$ref":"#/definitions/default"},"maximum":{"$ref":"#/definitions/maximum"},"exclusiveMaximum":{"$ref":"#/definitions/exclusiveMaximum"},"minimum":{"$ref":"#/definitions/minimum"},"exclusiveMinimum":{"$ref":"#/definitions/exclusiveMinimum"},"maxLength":{"$ref":"#/definitions/maxLength"},"minLength":{"$ref":"#/definitions/minLength"},"pattern":{"$ref":"#/definitions/pattern"},"maxItems":{"$ref":"#/definitions/maxItems"},"minItems":{"$ref":"#/definitions/minItems"},"uniqueItems":{"$ref":"#/definitions/uniqueItems"},"enum":{"$ref":"#/definitions/enum"},"multipleOf":{"$ref":"#/definitions/multipleOf"}}},"queryParameterSubSchema":{"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"required":{"type":"boolean","description":"Determines whether or not this parameter is required or optional.","default":false},"in":{"type":"string","description":"Determines the location of the parameter.","enum":["query"]},"description":{"type":"string","description":"A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed."},"name":{"type":"string","description":"The name of the parameter."},"allowEmptyValue":{"type":"boolean","default":false,"description":"allows sending a parameter by name only or with an empty value."},"type":{"type":"string","enum":["string","number","boolean","integer","array"]},"format":{"type":"string"},"items":{"$ref":"#/definitions/primitivesItems"},"collectionFormat":{"$ref":"#/definitions/collectionFormatWithMulti"},"default":{"$ref":"#/definitions/default"},"maximum":{"$ref":"#/definitions/maximum"},"exclusiveMaximum":{"$ref":"#/definitions/exclusiveMaximum"},"minimum":{"$ref":"#/definitions/minimum"},"exclusiveMinimum":{"$ref":"#/definitions/exclusiveMinimum"},"maxLength":{"$ref":"#/definitions/maxLength"},"minLength":{"$ref":"#/definitions/minLength"},"pattern":{"$ref":"#/definitions/pattern"},"maxItems":{"$ref":"#/definitions/maxItems"},"minItems":{"$ref":"#/definitions/minItems"},"uniqueItems":{"$ref":"#/definitions/uniqueItems"},"enum":{"$ref":"#/definitions/enum"},"multipleOf":{"$ref":"#/definitions/multipleOf"}}},"formDataParameterSubSchema":{"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"required":{"type":"boolean","description":"Determines whether or not this parameter is required or optional.","default":false},"in":{"type":"string","description":"Determines the location of the parameter.","enum":["formData"]},"description":{"type":"string","description":"A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed."},"name":{"type":"string","description":"The name of the parameter."},"allowEmptyValue":{"type":"boolean","default":false,"description":"allows sending a parameter by name only or with an empty value."},"type":{"type":"string","enum":["string","number","boolean","integer","array","file"]},"format":{"type":"string"},"items":{"$ref":"#/definitions/primitivesItems"},"collectionFormat":{"$ref":"#/definitions/collectionFormatWithMulti"},"default":{"$ref":"#/definitions/default"},"maximum":{"$ref":"#/definitions/maximum"},"exclusiveMaximum":{"$ref":"#/definitions/exclusiveMaximum"},"minimum":{"$ref":"#/definitions/minimum"},"exclusiveMinimum":{"$ref":"#/definitions/exclusiveMinimum"},"maxLength":{"$ref":"#/definitions/maxLength"},"minLength":{"$ref":"#/definitions/minLength"},"pattern":{"$ref":"#/definitions/pattern"},"maxItems":{"$ref":"#/definitions/maxItems"},"minItems":{"$ref":"#/definitions/minItems"},"uniqueItems":{"$ref":"#/definitions/uniqueItems"},"enum":{"$ref":"#/definitions/enum"},"multipleOf":{"$ref":"#/definitions/multipleOf"}}},"pathParameterSubSchema":{"additionalProperties":false,"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"required":["required"],"properties":{"required":{"type":"boolean","enum":[true],"description":"Determines whether or not this parameter is required or optional."},"in":{"type":"string","description":"Determines the location of the parameter.","enum":["path"]},"description":{"type":"string","description":"A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed."},"name":{"type":"string","description":"The name of the parameter."},"type":{"type":"string","enum":["string","number","boolean","integer","array"]},"format":{"type":"string"},"items":{"$ref":"#/definitions/primitivesItems"},"collectionFormat":{"$ref":"#/definitions/collectionFormat"},"default":{"$ref":"#/definitions/default"},"maximum":{"$ref":"#/definitions/maximum"},"exclusiveMaximum":{"$ref":"#/definitions/exclusiveMaximum"},"minimum":{"$ref":"#/definitions/minimum"},"exclusiveMinimum":{"$ref":"#/definitions/exclusiveMinimum"},"maxLength":{"$ref":"#/definitions/maxLength"},"minLength":{"$ref":"#/definitions/minLength"},"pattern":{"$ref":"#/definitions/pattern"},"maxItems":{"$ref":"#/definitions/maxItems"},"minItems":{"$ref":"#/definitions/minItems"},"uniqueItems":{"$ref":"#/definitions/uniqueItems"},"enum":{"$ref":"#/definitions/enum"},"multipleOf":{"$ref":"#/definitions/multipleOf"}}},"nonBodyParameter":{"type":"object","required":["name","in","type"],"oneOf":[{"$ref":"#/definitions/headerParameterSubSchema"},{"$ref":"#/definitions/formDataParameterSubSchema"},{"$ref":"#/definitions/queryParameterSubSchema"},{"$ref":"#/definitions/pathParameterSubSchema"}]},"parameter":{"oneOf":[{"$ref":"#/definitions/bodyParameter"},{"$ref":"#/definitions/nonBodyParameter"}]},"schema":{"type":"object","description":"A deterministic version of a JSON Schema object.","patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"properties":{"$ref":{"type":"string"},"format":{"type":"string"},"title":{"$ref":"http://json-schema.org/draft-04/schema#/properties/title"},"description":{"$ref":"http://json-schema.org/draft-04/schema#/properties/description"},"default":{"$ref":"http://json-schema.org/draft-04/schema#/properties/default"},"multipleOf":{"$ref":"http://json-schema.org/draft-04/schema#/properties/multipleOf"},"maximum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/maximum"},"exclusiveMaximum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/exclusiveMaximum"},"minimum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/minimum"},"exclusiveMinimum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/exclusiveMinimum"},"maxLength":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveInteger"},"minLength":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"},"pattern":{"$ref":"http://json-schema.org/draft-04/schema#/properties/pattern"},"maxItems":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveInteger"},"minItems":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"},"uniqueItems":{"$ref":"http://json-schema.org/draft-04/schema#/properties/uniqueItems"},"maxProperties":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveInteger"},"minProperties":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"},"required":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/stringArray"},"enum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/enum"},"additionalProperties":{"anyOf":[{"$ref":"#/definitions/schema"},{"type":"boolean"}],"default":{}},"type":{"$ref":"http://json-schema.org/draft-04/schema#/properties/type"},"items":{"anyOf":[{"$ref":"#/definitions/schema"},{"type":"array","minItems":1,"items":{"$ref":"#/definitions/schema"}}],"default":{}},"allOf":{"type":"array","minItems":1,"items":{"$ref":"#/definitions/schema"}},"properties":{"type":"object","additionalProperties":{"$ref":"#/definitions/schema"},"default":{}},"discriminator":{"type":"string"},"readOnly":{"type":"boolean","default":false},"xml":{"$ref":"#/definitions/xml"},"externalDocs":{"$ref":"#/definitions/externalDocs"},"example":{}},"additionalProperties":false},"fileSchema":{"type":"object","description":"A deterministic version of a JSON Schema object.","patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}},"required":["type"],"properties":{"format":{"type":"string"},"title":{"$ref":"http://json-schema.org/draft-04/schema#/properties/title"},"description":{"$ref":"http://json-schema.org/draft-04/schema#/properties/description"},"default":{"$ref":"http://json-schema.org/draft-04/schema#/properties/default"},"required":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/stringArray"},"type":{"type":"string","enum":["file"]},"readOnly":{"type":"boolean","default":false},"externalDocs":{"$ref":"#/definitions/externalDocs"},"example":{}},"additionalProperties":false},"primitivesItems":{"type":"object","additionalProperties":false,"properties":{"type":{"type":"string","enum":["string","number","integer","boolean","array"]},"format":{"type":"string"},"items":{"$ref":"#/definitions/primitivesItems"},"collectionFormat":{"$ref":"#/definitions/collectionFormat"},"default":{"$ref":"#/definitions/default"},"maximum":{"$ref":"#/definitions/maximum"},"exclusiveMaximum":{"$ref":"#/definitions/exclusiveMaximum"},"minimum":{"$ref":"#/definitions/minimum"},"exclusiveMinimum":{"$ref":"#/definitions/exclusiveMinimum"},"maxLength":{"$ref":"#/definitions/maxLength"},"minLength":{"$ref":"#/definitions/minLength"},"pattern":{"$ref":"#/definitions/pattern"},"maxItems":{"$ref":"#/definitions/maxItems"},"minItems":{"$ref":"#/definitions/minItems"},"uniqueItems":{"$ref":"#/definitions/uniqueItems"},"enum":{"$ref":"#/definitions/enum"},"multipleOf":{"$ref":"#/definitions/multipleOf"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"security":{"type":"array","items":{"$ref":"#/definitions/securityRequirement"},"uniqueItems":true},"securityRequirement":{"type":"object","additionalProperties":{"type":"array","items":{"type":"string"},"uniqueItems":true}},"xml":{"type":"object","additionalProperties":false,"properties":{"name":{"type":"string"},"namespace":{"type":"string"},"prefix":{"type":"string"},"attribute":{"type":"boolean","default":false},"wrapped":{"type":"boolean","default":false}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"tag":{"type":"object","additionalProperties":false,"required":["name"],"properties":{"name":{"type":"string"},"description":{"type":"string"},"externalDocs":{"$ref":"#/definitions/externalDocs"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"securityDefinitions":{"type":"object","additionalProperties":{"oneOf":[{"$ref":"#/definitions/basicAuthenticationSecurity"},{"$ref":"#/definitions/apiKeySecurity"},{"$ref":"#/definitions/oauth2ImplicitSecurity"},{"$ref":"#/definitions/oauth2PasswordSecurity"},{"$ref":"#/definitions/oauth2ApplicationSecurity"},{"$ref":"#/definitions/oauth2AccessCodeSecurity"}]}},"basicAuthenticationSecurity":{"type":"object","additionalProperties":false,"required":["type"],"properties":{"type":{"type":"string","enum":["basic"]},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"apiKeySecurity":{"type":"object","additionalProperties":false,"required":["type","name","in"],"properties":{"type":{"type":"string","enum":["apiKey"]},"name":{"type":"string"},"in":{"type":"string","enum":["header","query"]},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"oauth2ImplicitSecurity":{"type":"object","additionalProperties":false,"required":["type","flow","authorizationUrl"],"properties":{"type":{"type":"string","enum":["oauth2"]},"flow":{"type":"string","enum":["implicit"]},"scopes":{"$ref":"#/definitions/oauth2Scopes"},"authorizationUrl":{"type":"string","format":"uri"},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"oauth2PasswordSecurity":{"type":"object","additionalProperties":false,"required":["type","flow","tokenUrl"],"properties":{"type":{"type":"string","enum":["oauth2"]},"flow":{"type":"string","enum":["password"]},"scopes":{"$ref":"#/definitions/oauth2Scopes"},"tokenUrl":{"type":"string","format":"uri"},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"oauth2ApplicationSecurity":{"type":"object","additionalProperties":false,"required":["type","flow","tokenUrl"],"properties":{"type":{"type":"string","enum":["oauth2"]},"flow":{"type":"string","enum":["application"]},"scopes":{"$ref":"#/definitions/oauth2Scopes"},"tokenUrl":{"type":"string","format":"uri"},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"oauth2AccessCodeSecurity":{"type":"object","additionalProperties":false,"required":["type","flow","authorizationUrl","tokenUrl"],"properties":{"type":{"type":"string","enum":["oauth2"]},"flow":{"type":"string","enum":["accessCode"]},"scopes":{"$ref":"#/definitions/oauth2Scopes"},"authorizationUrl":{"type":"string","format":"uri"},"tokenUrl":{"type":"string","format":"uri"},"description":{"type":"string"}},"patternProperties":{"^x-":{"$ref":"#/definitions/vendorExtension"}}},"oauth2Scopes":{"type":"object","additionalProperties":{"type":"string"}},"mediaTypeList":{"type":"array","items":{"$ref":"#/definitions/mimeType"},"uniqueItems":true},"parametersList":{"type":"array","description":"The parameters needed to send a valid API call.","additionalItems":false,"items":{"oneOf":[{"$ref":"#/definitions/parameter"},{"$ref":"#/definitions/jsonReference"}]},"uniqueItems":true},"schemesList":{"type":"array","description":"The transfer protocol of the API.","items":{"type":"string","enum":["http","https","ws","wss"]},"uniqueItems":true},"collectionFormat":{"type":"string","enum":["csv","ssv","tsv","pipes"],"default":"csv"},"collectionFormatWithMulti":{"type":"string","enum":["csv","ssv","tsv","pipes","multi"],"default":"csv"},"title":{"$ref":"http://json-schema.org/draft-04/schema#/properties/title"},"description":{"$ref":"http://json-schema.org/draft-04/schema#/properties/description"},"default":{"$ref":"http://json-schema.org/draft-04/schema#/properties/default"},"multipleOf":{"$ref":"http://json-schema.org/draft-04/schema#/properties/multipleOf"},"maximum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/maximum"},"exclusiveMaximum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/exclusiveMaximum"},"minimum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/minimum"},"exclusiveMinimum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/exclusiveMinimum"},"maxLength":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveInteger"},"minLength":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"},"pattern":{"$ref":"http://json-schema.org/draft-04/schema#/properties/pattern"},"maxItems":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveInteger"},"minItems":{"$ref":"http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"},"uniqueItems":{"$ref":"http://json-schema.org/draft-04/schema#/properties/uniqueItems"},"enum":{"$ref":"http://json-schema.org/draft-04/schema#/properties/enum"},"jsonReference":{"type":"object","required":["$ref"],"additionalProperties":false,"properties":{"$ref":{"type":"string"}}}}}
);



local.assetsDict['/assets.swgg.swagger.json'] = local.assetsDict['/assets.swgg.swagger.json'] || '';



// https://petstore.swagger.io/v2/swagger.json
// curl -Ls https://petstore.swagger.io/v2/swagger.json > /tmp/aa.json; node -e "console.log(JSON.stringify(require('/tmp/aa.json')));"
local.assetsDict['/assets.swgg.swagger.petstore.json'] = JSON.stringify(
{"swagger":"2.0","info":{"description":"This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.","version":"1.0.0","title":"Swagger Petstore","termsOfService":"http://swagger.io/terms/","contact":{"email":"apiteam@swagger.io"},"license":{"name":"Apache 2.0","url":"http://www.apache.org/licenses/LICENSE-2.0.html"}},"host":"petstore.swagger.io","basePath":"/v2","tags":[{"name":"pet","description":"Everything about your Pets","externalDocs":{"description":"Find out more","url":"http://swagger.io"}},{"name":"store","description":"Access to Petstore orders"},{"name":"user","description":"Operations about user","externalDocs":{"description":"Find out more about our store","url":"http://swagger.io"}}],"schemes":["http"],"paths":{"/pet":{"post":{"tags":["pet"],"summary":"Add a new pet to the store","description":"","operationId":"addPet","consumes":["application/json","application/xml"],"produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"Pet object that needs to be added to the store","required":true,"schema":{"$ref":"#/definitions/Pet"}}],"responses":{"405":{"description":"Invalid input"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]},"put":{"tags":["pet"],"summary":"Update an existing pet","description":"","operationId":"updatePet","consumes":["application/json","application/xml"],"produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"Pet object that needs to be added to the store","required":true,"schema":{"$ref":"#/definitions/Pet"}}],"responses":{"400":{"description":"Invalid ID supplied"},"404":{"description":"Pet not found"},"405":{"description":"Validation exception"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]}},"/pet/findByStatus":{"get":{"tags":["pet"],"summary":"Finds Pets by status","description":"Multiple status values can be provided with comma separated strings","operationId":"findPetsByStatus","produces":["application/xml","application/json"],"parameters":[{"name":"status","in":"query","description":"Status values that need to be considered for filter","required":true,"type":"array","items":{"type":"string","enum":["available","pending","sold"],"default":"available"},"collectionFormat":"multi"}],"responses":{"200":{"description":"successful operation","schema":{"type":"array","items":{"$ref":"#/definitions/Pet"}}},"400":{"description":"Invalid status value"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]}},"/pet/findByTags":{"get":{"tags":["pet"],"summary":"Finds Pets by tags","description":"Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.","operationId":"findPetsByTags","produces":["application/xml","application/json"],"parameters":[{"name":"tags","in":"query","description":"Tags to filter by","required":true,"type":"array","items":{"type":"string"},"collectionFormat":"multi"}],"responses":{"200":{"description":"successful operation","schema":{"type":"array","items":{"$ref":"#/definitions/Pet"}}},"400":{"description":"Invalid tag value"}},"security":[{"petstore_auth":["write:pets","read:pets"]}],"deprecated":true}},"/pet/{petId}":{"get":{"tags":["pet"],"summary":"Find pet by ID","description":"Returns a single pet","operationId":"getPetById","produces":["application/xml","application/json"],"parameters":[{"name":"petId","in":"path","description":"ID of pet to return","required":true,"type":"integer","format":"int64"}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/Pet"}},"400":{"description":"Invalid ID supplied"},"404":{"description":"Pet not found"}},"security":[{"api_key":[]}]},"post":{"tags":["pet"],"summary":"Updates a pet in the store with form data","description":"","operationId":"updatePetWithForm","consumes":["application/x-www-form-urlencoded"],"produces":["application/xml","application/json"],"parameters":[{"name":"petId","in":"path","description":"ID of pet that needs to be updated","required":true,"type":"integer","format":"int64"},{"name":"name","in":"formData","description":"Updated name of the pet","required":false,"type":"string"},{"name":"status","in":"formData","description":"Updated status of the pet","required":false,"type":"string"}],"responses":{"405":{"description":"Invalid input"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]},"delete":{"tags":["pet"],"summary":"Deletes a pet","description":"","operationId":"deletePet","produces":["application/xml","application/json"],"parameters":[{"name":"api_key","in":"header","required":false,"type":"string"},{"name":"petId","in":"path","description":"Pet id to delete","required":true,"type":"integer","format":"int64"}],"responses":{"400":{"description":"Invalid ID supplied"},"404":{"description":"Pet not found"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]}},"/pet/{petId}/uploadImage":{"post":{"tags":["pet"],"summary":"uploads an image","description":"","operationId":"uploadFile","consumes":["multipart/form-data"],"produces":["application/json"],"parameters":[{"name":"petId","in":"path","description":"ID of pet to update","required":true,"type":"integer","format":"int64"},{"name":"additionalMetadata","in":"formData","description":"Additional data to pass to server","required":false,"type":"string"},{"name":"file","in":"formData","description":"file to upload","required":false,"type":"file"}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/ApiResponse"}}},"security":[{"petstore_auth":["write:pets","read:pets"]}]}},"/store/inventory":{"get":{"tags":["store"],"summary":"Returns pet inventories by status","description":"Returns a map of status codes to quantities","operationId":"getInventory","produces":["application/json"],"parameters":[],"responses":{"200":{"description":"successful operation","schema":{"type":"object","additionalProperties":{"type":"integer","format":"int32"}}}},"security":[{"api_key":[]}]}},"/store/order":{"post":{"tags":["store"],"summary":"Place an order for a pet","description":"","operationId":"placeOrder","produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"order placed for purchasing the pet","required":true,"schema":{"$ref":"#/definitions/Order"}}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/Order"}},"400":{"description":"Invalid Order"}}}},"/store/order/{orderId}":{"get":{"tags":["store"],"summary":"Find purchase order by ID","description":"For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions","operationId":"getOrderById","produces":["application/xml","application/json"],"parameters":[{"name":"orderId","in":"path","description":"ID of pet that needs to be fetched","required":true,"type":"integer","maximum":10,"minimum":1,"format":"int64"}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/Order"}},"400":{"description":"Invalid ID supplied"},"404":{"description":"Order not found"}}},"delete":{"tags":["store"],"summary":"Delete purchase order by ID","description":"For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors","operationId":"deleteOrder","produces":["application/xml","application/json"],"parameters":[{"name":"orderId","in":"path","description":"ID of the order that needs to be deleted","required":true,"type":"integer","minimum":1,"format":"int64"}],"responses":{"400":{"description":"Invalid ID supplied"},"404":{"description":"Order not found"}}}},"/user":{"post":{"tags":["user"],"summary":"Create user","description":"This can only be done by the logged in user.","operationId":"createUser","produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"Created user object","required":true,"schema":{"$ref":"#/definitions/User"}}],"responses":{"default":{"description":"successful operation"}}}},"/user/createWithArray":{"post":{"tags":["user"],"summary":"Creates list of users with given input array","description":"","operationId":"createUsersWithArrayInput","produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"List of user object","required":true,"schema":{"type":"array","items":{"$ref":"#/definitions/User"}}}],"responses":{"default":{"description":"successful operation"}}}},"/user/createWithList":{"post":{"tags":["user"],"summary":"Creates list of users with given input array","description":"","operationId":"createUsersWithListInput","produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"List of user object","required":true,"schema":{"type":"array","items":{"$ref":"#/definitions/User"}}}],"responses":{"default":{"description":"successful operation"}}}},"/user/login":{"get":{"tags":["user"],"summary":"Logs user into the system","description":"","operationId":"loginUser","produces":["application/xml","application/json"],"parameters":[{"name":"username","in":"query","description":"The user name for login","required":true,"type":"string"},{"name":"password","in":"query","description":"The password for login in clear text","required":true,"type":"string"}],"responses":{"200":{"description":"successful operation","schema":{"type":"string"},"headers":{"X-Rate-Limit":{"type":"integer","format":"int32","description":"calls per hour allowed by the user"},"X-Expires-After":{"type":"string","format":"date-time","description":"date in UTC when token expires"}}},"400":{"description":"Invalid username/password supplied"}}}},"/user/logout":{"get":{"tags":["user"],"summary":"Logs out current logged in user session","description":"","operationId":"logoutUser","produces":["application/xml","application/json"],"parameters":[],"responses":{"default":{"description":"successful operation"}}}},"/user/{username}":{"get":{"tags":["user"],"summary":"Get user by user name","description":"","operationId":"getUserByName","produces":["application/xml","application/json"],"parameters":[{"name":"username","in":"path","description":"The name that needs to be fetched. Use user1 for testing. ","required":true,"type":"string"}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/User"}},"400":{"description":"Invalid username supplied"},"404":{"description":"User not found"}}},"put":{"tags":["user"],"summary":"Updated user","description":"This can only be done by the logged in user.","operationId":"updateUser","produces":["application/xml","application/json"],"parameters":[{"name":"username","in":"path","description":"name that need to be updated","required":true,"type":"string"},{"in":"body","name":"body","description":"Updated user object","required":true,"schema":{"$ref":"#/definitions/User"}}],"responses":{"400":{"description":"Invalid user supplied"},"404":{"description":"User not found"}}},"delete":{"tags":["user"],"summary":"Delete user","description":"This can only be done by the logged in user.","operationId":"deleteUser","produces":["application/xml","application/json"],"parameters":[{"name":"username","in":"path","description":"The name that needs to be deleted","required":true,"type":"string"}],"responses":{"400":{"description":"Invalid username supplied"},"404":{"description":"User not found"}}}}},"securityDefinitions":{"petstore_auth":{"type":"oauth2","authorizationUrl":"http://petstore.swagger.io/oauth/dialog","flow":"implicit","scopes":{"write:pets":"modify pets in your account","read:pets":"read your pets"}},"api_key":{"type":"apiKey","name":"api_key","in":"header"}},"definitions":{"Order":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"petId":{"type":"integer","format":"int64"},"quantity":{"type":"integer","format":"int32"},"shipDate":{"type":"string","format":"date-time"},"status":{"type":"string","description":"Order Status","enum":["placed","approved","delivered"]},"complete":{"type":"boolean","default":false}},"xml":{"name":"Order"}},"Category":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"name":{"type":"string"}},"xml":{"name":"Category"}},"User":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"username":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"},"email":{"type":"string"},"password":{"type":"string"},"phone":{"type":"string"},"userStatus":{"type":"integer","format":"int32","description":"User Status"}},"xml":{"name":"User"}},"Tag":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"name":{"type":"string"}},"xml":{"name":"Tag"}},"Pet":{"type":"object","required":["name","photoUrls"],"properties":{"id":{"type":"integer","format":"int64"},"category":{"$ref":"#/definitions/Category"},"name":{"type":"string","example":"doggie"},"photoUrls":{"type":"array","xml":{"name":"photoUrl","wrapped":true},"items":{"type":"string"}},"tags":{"type":"array","xml":{"name":"tag","wrapped":true},"items":{"$ref":"#/definitions/Tag"}},"status":{"type":"string","description":"pet status in the store","enum":["available","pending","sold"]}},"xml":{"name":"Pet"}},"ApiResponse":{"type":"object","properties":{"code":{"type":"integer","format":"int32"},"type":{"type":"string"},"message":{"type":"string"}}}},"externalDocs":{"description":"Find out more about Swagger","url":"http://swagger.io"}}
);



local.swaggerErrorTypeDict = {
    arrayMaxItems: '{{type2}} {{prefix2}} = {{data2}} must have <= {{schema.maxItems}} items',
    arrayMinItems: '{{type2}} {{prefix2}} = {{data2}} must have >= {{schema.minItems}} items',
    arrayUniqueItems: '{{type2}} {{prefix2}} = {{data2}} must have unique items (has duplicate item {{tmp jsonStringify}})',
    itemEnum: '{{type2}} {{prefix2}} = {{data2}} can only have items from the list {{schema.enum jsonStringify}}',
    itemAnyOf: '{{tmp}} (from schama.anyOf {{schema2}})',
    itemNot: '{{type2}} {{prefix2}} = {{data2}} must not validate against schama.not {{schema2}}',
    itemOneOf: '{{type2}} {{prefix2}} = {{data2}} did not validate against exactly one schema (validated {{tmp}}) in schema.oneOf {{schema2}}',
    itemType: 'value {{prefix2}} = {{data2}} is not a valid {{type2}}',
    numberMultipleOf: '{{type2}} {{prefix2}} = {{data2}} must be a multiple of {{schema.multipleOf}}',
    numberExclusiveMaximum: '{{type2}} {{prefix2}} = {{data2}} must be < {{schema.maximum}}',
    numberExclusiveMinimum: '{{type2}} {{prefix2}} = {{data2}} must be > {{schema.minimum}}',
    numberMaximum: '{{type2}} {{prefix2}} = {{data2}} must be <= {{schema.maximum}}',
    numberMinimum: '{{type2}} {{prefix2}} = {{data2}} must be >= {{schema.minimum}}',
    objectAdditionalProperties: '{{type2}} {{prefix2}} = {{data2}} cannot have additional property {{key jsonStringify}}',
    objectDependencies: '{{type2}} {{prefix2}} = {{data2}} with item {{key jsonStringify}} must have dependency {{key2 jsonStringify}}',
    objectMaxProperties: '{{type2}} {{prefix2}} = {{data2}} must have <= {{schema.maxProperties}} properties',
    objectMinProperties: '{{type2}} {{prefix2}} = {{data2}} must have >= {{schema.minProperties}} properties',
    objectRequired: '{{type2}} {{prefix2}} = {{data2}} must have property {{key jsonStringify}}',
    schemaDeferenceCircular: 'cannot dereference circular-reference schema {{schema2}}',
    schemaDeference: 'cannot dereference schema {{schema2}}',
    // https://github.com/swagger-api/swagger-editor/blob/v3.0.17/src/plugins/validation/semantic-validators/validators
    semanticInvalidInFormdata: 'Parameter "in: formdata" is invalid, did you mean "in: formData" ( camelCase )?',
    semanticMinimumMoreThanMaximum: 'Minimum cannot be more than maximum',
    semanticMinPropertiesMoreThanMaxProperties: 'minProperties cannot be more than maxProperties',
    semanticMinLengthMoreThanMaxLength: 'minLength cannot be more than maxLength',
    semanticRequired: 'Schema properties specified as "required" must be defined',
    semanticRequiredArrayItems: 'schema {{schema2}} with "array" type requires an "items" property',
    semanticRequiredConsumesFormData: 'Operations with Parameters of "in: formData" must include "application/x-www-form-urlencoded" or "multipart/form-data" in their "consumes" property',
    semanticRequiredConsumesMultipartFormData: 'Operations with Parameters of "type: file" must include "multipart/form-data" in their "consumes" property',
    semanticRequiredInFormData: 'Parameters with "type: file" must have "in: formData"',
    semanticRequiredReadOnly: 'Read only properties cannot marked as required by a schema.',
    semanticRequiredTypeString: '${path} must have required string "type" param',
    semanticTypeString: '"type" should be a string',
    semanticUniqueInBodyFormDataParameter: 'Parameters cannot have both a "in: body" and "in: formData", as "formData" _will_ be the body',
    semanticUniqueInBodyFormDataOperation: 'Operations cannot have both a "body" parameter and "formData" parameter',
    semanticUniqueInBodyOperation: 'Operations must have no more than one body parameter',
    semanticUniqueParameterName: 'Operation parameters must have unique "name" + "in" properties',
    semanticUniqueOperationId: 'operationId {{prefix2}}["operationId"] = {{data2}} is not unique',
    semanticUnusedDefinition: 'Definition was declared but never used in document',
    semanticUnusedNameInPath: 'Path parameter ${parameterDefinition.name} was defined but never used',
    stringMaxLength: 'string {{prefix2}} = {{data2}} must have <= {{schema.maxLength}} characters',
    stringMinLength: 'string {{prefix2}} = {{data2}} must have >= {{schema.minLength}} characters',
    stringPattern: 'string {{prefix2}} = {{data2}} must match regexp pattern {{schema.pattern jsonStringify}}',
};



local.templateApiDict = {
    "crudCountManyByQuery": {
        "_method": "GET",
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
                "default": "{\"_id\":{\"$exists\":true}}",
                "description": "query param",
                "format": "json",
                "in": "query",
                "name": "_queryWhere",
                "required": true,
                "type": "string"
            },
            {
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
                "default": [{"fieldName":"_timeUpdated","isDescending":true}],
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
        "summary": "get one {{_schemaName}} file by {{_idName}}"
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
        "summary": "upload many {{_schemaName}} files by form"
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
};
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



// https://github.com/swagger-api/swagger-ui/blob/v2.1.3/src/main/template/main.handlebars
local.templateUiMain = '\
<!-- <div class="swggUiContainer"> -->\n\
<div class="eventDelegateKeyup eventDelegateSubmit onEventUiReload thead">\n\
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
    <button class="eventDelegateClick onEventUiReload td td4">explore</button>\n\
    <button\n\
        class="eventDelegateClick onEventUiReload td td5"\n\
        id="swggApiKeyClearButton1"\n\
    >clear api-keys</button>\n\
</div>\n\
<div class="info reset">\n\
    {{#if info}}\n\
    {{#if info.x-swgg-homepage}}\n\
    <a href="{{info.x-swgg-homepage}}" target="_blank"\n\
    ><h2>{{info.title}} ({{info.version}})</h2></a>\n\
    {{#unless info.x-swgg-homepage}}\n\
    <h2>{{info.title}} ({{info.version}})</h2>\n\
    {{/if info.x-swgg-homepage}}\n\
    {{#if info.description}}<div>{{info.description htmlBr}}</div>{{/if info.description}}\n\
    {{#if info.x-swgg-downloadStandaloneApp}}\n\
    <h4><a download href="{{info.x-swgg-downloadStandaloneApp}}">download standalone app</a></h4>\n\
    {{/if info.x-swgg-downloadStandaloneApp}}\n\
    <ul>\n\
        {{#if externalDocs}}\n\
        <li>\n\
            {{#if externalDocs.description}}\n\
            <p>{{externalDocs.description htmlBr}}</p>\n\
            {{/if externalDocs.description}}\n\
            {{#if externalDocs.url}}\n\
            <a href="{{externalDocs.url}}" target="_blank">{{externalDocs.url}}</a>\n\
            {{/if externalDocs.url}}\n\
        </li>\n\
        {{/if externalDocs}}\n\
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
            >contact the developer</a>\n\
        </li>\n\
        {{/if info.contact.email}}\n\
        {{#if info.license}}\n\
        <li><a target="_blank" href="{{info.license.url}}">{{info.license.name}}</a></li>\n\
        {{/if info.license}}\n\
    </ul>\n\
    {{/if info}}\n\
</div>\n\
{{#if urlSwaggerJson}}\n\
<h4 class="label">javascript code</h4>\n\
<pre id="swggAjaxProgressPre1">\n\
/*\n\
 * initialize swgg-client\n\
 * 1. download currently-loaded apis to file swagger.json:\n\
 *     $ curl -L "{{urlSwaggerJson}}" > swagger.json\n\
 * 2. npm install swgg\n\
 *     $ npm install swgg\n\
 * 3. run code below to initialize swgg-client\n\
 * 4. (optional) edit file swagger.json to suit your needs\n\
 */\n\
var swgg;\n\
swgg = require("swgg");\n\
swgg.apiUpdate(require("./swagger.json"));\n\
console.log("printing currently loaded apis ...");\n\
console.log(JSON.stringify(Object.keys(swgg.apiDict).sort(), null, 4));\n\
console.log("initialized swgg-client");\n\
</pre>\n\
<div class="reset styleColor777">[ <span>base url</span>: {{basePath}} ]</div>\n\
{{/if urlSwaggerJson}}\n\
<div id="swggAjaxProgressDiv1" style="text-align: center;">\n\
    <span>{{ajaxProgressText}}</span>\n\
    <span class="uiAnimateSpin"></span>\n\
</div>\n\
<div class="reset resourceList"></div>\n\
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
<div class="onEventOperationDisplayShow onEventInputValidate thead" tabindex="0">\n\
    <span class="td td1"></span>\n\
    <span class="method{{_method}} td td2">{{_method}}</span>\n\
    <span\n\
        class="td td3"\n\
        {{#if deprecated}}style="text-decoration: line-through;"{{/if deprecated}}\n\
    >{{_path}}</span>\n\
    <span class="styleColor777 styleTextOverflowEllipsis td td4">{{summary}}</span>\n\
</div>\n\
<form accept-charset="UTF-8"\n\
    class="content uiAnimateSlide"\n\
    style="border-bottom: 0; border-top: 0; margin-bottom: 0; margin-top: 0; max-height: 0; padding-bottom: 0; padding-top: 0;"\n\
>\n\
    {{#if deprecated}}<h4 class="label">(warning: deprecated)</h4><br>{{/if deprecated}}\n\
    <h4 class="label">description</h4>\n\
    <div class="styleColor777 tr">{{description htmlBr}}</div>\n\
    {{#if parameters.length}}\n\
    <h4 class="label">parameters</h4>\n\
    <div class="schemaP styleBorderBottom1px styleColor777 tr">\n\
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
    <div class="schemaResponse styleColor777 styleBorderBottom1px tr">\n\
        <span class="td td1">http status code</span>\n\
        <span class="td td2">reason</span>\n\
    </div>\n\
    {{#each responseList}}\n\
    <div class="schemaResponse tr">\n\
        <span class="td td1">{{key}}</span>\n\
        <span class="td td2">{{value.description}}</span>\n\
    </div>\n\
    {{/each responseList}}\n\
    <button class="onEventOperationAjax">try it out</button>\n\
    <h4 class="label">javascript code</h4>\n\
    <pre class="requestJavascript"></pre>\n\
    <h4 class="label">curl request</h4>\n\
    <pre class="requestCurl"></pre>\n\
    <h4 class="label">response status code</h4>\n\
    <pre class="responseStatusCode"></pre>\n\
    <h4 class="label">response headers</h4>\n\
    <pre class="responseHeaders"></pre>\n\
    <h4 class="label">response body</h4>\n\
    <pre class="responseBody" tabindex="0"></pre>\n\
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
    <span class="styleColor777">{{description htmlBr}}</span>\n\
    {{/if description}}\n\
</span>\n\
<span class="td td2">{{type2}}{{#if format2}}<br>({{format2}}){{/if format2}}</span>\n\
<span class="td td3">\n\
    {{#if isTextarea}}\n\
    <div class="multilinePlaceholderContainer">\n\
        <pre class="multilinePlaceholderPre">{{placeholder}}</pre>\n\
        <textarea\n\
            class="input multilinePlaceholderTextarea onEventInputTextareaChange"\n\
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
    {{#if isInputText}}\n\
    <input\n\
        class="input"\n\
        data-value-text="{{valueText encodeURIComponent notHtmlSafe}}"\n\
        placeholder="{{placeholder}}"\n\
        type="text"\n\
    >\n\
    {{/if isInputText}}\n\
    <div class="styleColorError"></div>\n\
</span>\n\
<span class="td td4">\n\
    {{#if schemaText}}<pre>{{schemaText}}</pre>{{/if schemaText}}\n\
</span>\n\
</div>\n\
';



local.templateUiRequestJavascript = '\
/*\n\
 * reproduce api-call {{options.api._methodPath jsonStringify}}\n\
 * 1. initialize swgg-client from previous step\n\
 * 2. run code below to reproduce api-call\n\
 */\n\
swgg.apiDict[{{options.api._methodPath jsonStringify}}].ajax({{optionsJson}}, \
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
<div\n\
    class="styleBorderBottom1px resource\n\
        eventDelegateChange eventDelegateClick eventDelegateKeyup eventDelegateSubmit\n\
    "\n\
    data-name="{{name}}"\n\
    id="{{id}}"\n\
>\n\
<h3 class="thead">\n\
    <span\n\
        class="onEventResourceDisplayAction styleTextOverflowEllipsis td td1"\n\
        tabindex="0"\n\
    >{{name}} : {{description}}</span>\n\
    <span\n\
        class="onEventResourceDisplayAction td td2"\n\
        tabindex="0"\n\
    >expand / collapse operations</span>\n\
    <span\n\
        class="onEventDatatableReload td td3"\n\
        data-resource-name="{{name}}"\n\
        tabindex="0"\n\
    >datatable</span>\n\
</h3>\n\
<div\n\
    class="operationList uiAnimateSlide"\n\
    style="border-bottom: 0; border-top: 0; margin-bottom: 0; margin-top: 0; max-height: 0; padding-bottom: 0; padding-top: 0;"\n\
>\n\
    <div class="resourceDescription">{{description htmlBr}}</div>\n\
</div>\n\
</div>\n\
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



local.assetsDict['/assets.swgg.html'] = local.assetsDict['/assets.index.default.template.html']
    .replace('assets.index.default.template.html', '')
    .replace((/<title>.*?<\/title>/), '<title>swgg</title>')
    .replace('\n<!-- utility2-comment\n', '\n')
    .replace((/\n<\/style>\n<style>\n[\S\s]*\n<\/style>\n/), '\
\n\
</style>\n\
<style>\n\
/*csslint\n\
*/\n\
/* jslint-ignore-begin */\n\
.swggUiContainer,\n\
.swggUiContainer * {\n\
    margin: 0;\n\
    margin-bottom: 10px;\n\
    max-width: 100%;\n\
    padding: 0;\n\
}\n\
.swggUiContainer .operation > .thead:focus,\n\
.swggUiContainer pre,\n\
.swggUiContainer .resource > .thead > .td:focus {\n\
    outline: none;\n\
}\n\
/* jslint-ignore-end */\n\
\n\
\n\
\n\
/* general */\n\
.swggUiContainer {\n\
    margin-left: auto;\n\
    margin-right: auto;\n\
    max-width: 1200px;\n\
}\n\
.swggUiContainer button,\n\
.swggUiContainer .operation > .thead,\n\
.swggUiContainer .resource > .thead {\n\
    cursor: pointer;\n\
}\n\
.swggUiContainer button {\n\
    padding: 10px;\n\
}\n\
.swggUiContainer input,\n\
.swggUiContainer pre,\n\
.swggUiContainer textarea {\n\
    min-height: 1.5rem;\n\
}\n\
.swggUiContainer input {\n\
    padding-left: 5px;\n\
    padding-right: 5px;\n\
}\n\
.swggUiContainer .responseStatusCode,\n\
.swggUiContainer .responseHeaders,\n\
.swggUiContainer .responseBody {\n\
    background: #373;\n\
}\n\
.swggUiContainer pre,\n\
.swggUiContainer textarea {\n\
    border: 1px solid #777;\n\
    font-family: Menlo, Monaco, Consolas, Courier New, monospace;\n\
    font-size: small;\n\
    line-height: 1.25rem;\n\
    max-height: 25rem;\n\
    padding: 5px;\n\
    white-space: nowrap;\n\
}\n\
.swggUiContainer pre {\n\
    background: #ddd;\n\
    overflow-wrap: break-word;\n\
    white-space: pre-wrap;\n\
}\n\
.swggUiContainer .schemaP pre,\n\
.swggUiContainer .schemaP .multilinePlaceholderContainer,\n\
.swggUiContainer .schemaP select[multiple],\n\
.swggUiContainer .schemaP textarea {\n\
    height: 10rem;\n\
}\n\
.swggUiContainer .td {\n\
    word-wrap: break-word;\n\
}\n\
.swggUiContainer .td div,\n\
.swggUiContainer .td input,\n\
.swggUiContainer .td pre,\n\
.swggUiContainer .td select,\n\
.swggUiContainer .td textarea {\n\
    width: 100%;\n\
}\n\
.swggUiContainer .thead,\n\
.swggUiContainer .tr {\n\
    display: flex;\n\
}\n\
\n\
\n\
\n\
/* section */\n\
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
    background: #77e;\n\
}\n\
.swggUiContainer .multilinePlaceholderContainer {\n\
    min-height: 10rem;\n\
    position: relative;\n\
}\n\
.swggUiContainer .multilinePlaceholderPre {\n\
    background: #fff;\n\
    position: absolute;\n\
    white-space: pre;\n\
}\n\
.swggUiContainer .multilinePlaceholderTextarea {\n\
    position: absolute;\n\
}\n\
.swggUiContainer .operation {\n\
    background: #dfd;\n\
}\n\
.swggUiContainer .operation > .content {\n\
    padding: 20px;\n\
}\n\
.swggUiContainer .operation > .thead:hover {\n\
    background: #7d7;\n\
}\n\
.swggUiContainer .operation > .thead > .td {\n\
    padding: 10px 0;\n\
}\n\
.swggUiContainer .operation > .thead > .td1 {\n\
    text-align: center;\n\
    width: 2rem;\n\
}\n\
.swggUiContainer .operation > .thead > .td2 {\n\
    text-align: center;\n\
    width: 5rem;\n\
}\n\
.swggUiContainer .resource > .thead > .td2 {\n\
    border-left: 1px solid #777;\n\
    border-right: 1px solid #777;\n\
    padding-left: 20px;\n\
    padding-right: 20px;\n\
}\n\
.swggUiContainer .resource:first-child {\n\
    border-top: 1px solid #777;\n\
    padding-top: 10px;\n\
}\n\
.swggUiContainer .resourceDescription {\n\
    background: #373;\n\
    padding: 10px 20px;\n\
}\n\
.swggUiContainer > .thead {\n\
    background: #7b5;\n\
    padding: 10px;\n\
}\n\
.swggUiContainer > .thead > .td {\n\
    font-size: smaller;\n\
}\n\
.swggUiContainer > .thead > .td1 {\n\
    background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAqRJREFUeNrEVz1s00AUfnGXii5maMXoEUEHVwIpEkPNgkBdMnQoU5ytiKHJwpp2Q2JIO8DCUDOxIJFIVOoWZyJSh3pp1Q2PVVlcCVBH3ufeVZZ9Zye1Ay86nXV+ue/9fO/lheg/Se02X1rvksmbnTiKvuxQMBNgBnN4a/LCbmnUAP6JV58NCUsBC8CuAJxGPF47OgNqBaA93tolUhnx6jC4NxGwyOEwlccyAs+3kwdzKq0HDn2vEBTi8J2XpyMaywNDE157BhXUE3zJhlq8GKq+Zd2zaWHepPA8oN9XkfLmRdOiJV4XUUg/IyWncLjCYY/SHndV2u7zHr3bPKZtdxgboJOnthvrfGj/oMf3G0r7JVmNlLfKklmrt2MvvcNO7LFOhoFHfuAJI5o6ta10jpt5CQLgwXhXG2YIwvu+34qf78ybOjWTnWwkgR36d7JqJOrW0hHmNrKg9xhiS4+1jFmrxymh03B0w+6kURIAu3yHtOD5oaUNojMnGgbcctNvwdAnyxvxRR+/vaJnjzbpzcZX+nN1SdGv85i9eH8w3qPO+mdm/y4dnQ1iI8Fq6Nf4cxL6GWSjiFDSs0VRnxC5g0xSB2cgHpaseTxfqOv5uoHkNQ6Ha/N1Yz9mNMppEkEkYKj79q6uCq4bCHcSX3fJ0Vk/k9siASjCm1N6gZH6Ec9IXt2WkFES2K/ixoIyktJPAu/ptOA1SgO5zqtr6KASJPF0nMV8dgMsRhRPOcMwqQAOoi0VAIMLAEWJ6YYC1c8ibj1GP51RqwzYwZVMHQuvOzMCBUtb2tGHx5NAdLKqp5AX7Ng4d+Zi8AGDI9z1ijx9yaCH04y3GCP2S+QcvaGl+pcxyUBvinFlawoDQjHSelX8hQEoIrAq8p/mgC88HOS1YCl/BRgAmiD/1gn6Nu8AAAAASUVORK5CYII=) no-repeat left center;\n\
    font-size: x-large;\n\
    padding-left: 40px;\n\
    padding-top: 7px;\n\
    text-decoration: none;\n\
}\n\
.swggUiContainer > .thead > .td4,\n\
.swggUiContainer > .thead > .td5 {\n\
    background: #373;\n\
    border: 0;\n\
}\n\
\n\
\n\
\n\
/* important style */\n\
/* border */\n\
.swggUiContainer .styleBorderError {\n\
    border: 5px solid #b00;\n\
}\n\
.swggUiContainer .styleBorderBottom1px {\n\
    border-bottom: 1px solid #777;\n\
}\n\
/* color */\n\
.swggUiContainer .resource > .thead > .td:hover {\n\
    color: #000;\n\
}\n\
.swggUiContainer a,\n\
.swggUiContainer .label,\n\
.swggUiContainer .resource > .thead > .td {\n\
    color: #373;\n\
}\n\
.swggUiContainer .styleColor777 {\n\
    color: #777;\n\
}\n\
.swggUiContainer .multilinePlaceholderPre {\n\
    color: #999;\n\
}\n\
.swggUiContainer .styleColorError {\n\
    color: #b00;\n\
}\n\
.swggUiContainer .operation > .thead > .td2,\n\
.swggUiContainer .resourceDescription,\n\
.swggUiContainer .responseStatusCode,\n\
.swggUiContainer .responseHeaders,\n\
.swggUiContainer .responseBody,\n\
.swggUiContainer > .thead > .td1,\n\
.swggUiContainer > .thead > .td4,\n\
.swggUiContainer > .thead > .td5 {\n\
    color: #fff;\n\
}\n\
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
/* margin */\n\
.swggUiContainer audio,\n\
.swggUiContainer img,\n\
.swggUiContainer .operation .thead,\n\
.swggUiContainer option,\n\
.swggUiContainer .responseBody,\n\
.swggUiContainer .responseMedia,\n\
.swggUiContainer .td,\n\
.swggUiContainer video {\n\
    margin-bottom: 0;\n\
}\n\
.swggUiContainer .label {\n\
    margin-bottom: 1px;\n\
}\n\
.swggUiContainer .onEventOperationAjax,\n\
.swggUiContainer .schemaP {\n\
    margin-bottom: 20px;\n\
}\n\
.swggUiContainer .td:first-child {\n\
    margin-left: 0;\n\
}\n\
.swggUiContainer > .info > ul,\n\
.swggUiContainer .operation > .thead > .td1,\n\
.swggUiContainer .td {\n\
    margin-left: 20px;\n\
}\n\
/* @media */\n\
@media screen and (max-width: 640px){\n\
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
/* overflow */\n\
.swggUiContainer pre,\n\
.swggUiContainer textarea,\n\
.swggUiContainer .td {\n\
    overflow: auto;\n\
}\n\
.swggUiContainer .schemaP > .td3 {\n\
    overflow: visible;\n\
}\n\
/* text-overflow */\n\
.swggUiContainer .styleTextOverflowEllipsis {\n\
    overflow: hidden;\n\
    text-overflow: ellipsis;\n\
    white-space: nowrap;\n\
}\n\
</style>\n\
')
    .replace((/\n<\/script>\n[\S\s]*\n<\/html>\n/), '\
\n\
</script>\n\
<div class="swggUiContainer">\n\
' + local.templateRender(local.templateUiMain, {
    ajaxProgressText: 'loading script',
    apiKeyValue: '',
    urlSwaggerJson: ''
}) + '\
</div>\n\
<script>\n\
/*jslint\n\
    bitwise: true,\n\
    browser: true,\n\
    maxerr: 8,\n\
    maxlen: 100,\n\
    node: true,\n\
    nomen: true,\n\
    regexp: true,\n\
    stupid: true\n\
*/\n\
"use strict";\n\
document.querySelector(".swggUiContainer > .thead > .td2").value =\n\
    ((/\\bmodeSwaggerJsonUrl=([^&]+)/g).exec(location.search) || {})[1] ||\n\
        "assets.swgg.swagger.json";\n\
</script>\n\
<script src="assets.utility2.rollup.js"></script>\n\
<script>window.swgg.uiEventListenerDict[".onEventUiReload"]({ swggInit: true });</script>\n\
</body>\n\
</html>\n\
');
/* jslint-ignore-end */
        local.assetsDict['/assets.swgg.swagger.schema.json'] = local.jsonStringifyOrdered(
            local.objectSetOverride(
                JSON.parse(local.assetsDict['/assets.swgg.json-schema.json'].replace(
                    (/"\$ref":".*?#/g),
                    '"$ref":"http://json-schema.org/draft-04/schema#'
                )),
                JSON.parse(local.assetsDict['/assets.swgg.schema.json'].replace(
                    (/"\$ref":".*?#/g),
                    '"$ref":"http://json-schema.org/draft-04/schema#'
                )),
                2
            )
        );
        local.swaggerSchemaJson = JSON.parse(local.assetsDict['/assets.swgg.swagger.schema.json']);
    }());



    // run shared js-env code - function
    (function () {
        local.apiAjax = function (self, options, onError) {
        /*
         * this function will send a swagger-api ajax-request with the operation self
         */
            var isMultipartFormData, tmp;
            options.operation = self;
            isMultipartFormData = (self.consumes && self.consumes[0]) === 'multipart/form-data';
            local.objectSetDefault(options, { data: '', paramDict: {}, url: '' });
            // try to validate paramDict
            options.error = local.validateBySwaggerParameters({
                // normalize paramDict
                data: local.normalizeSwaggerParamDict(options).paramDict,
                dataReadonlyRemove: options.paramDict,
                prefix: ['operation', self._methodPath],
                parameters: self.parameters,
                swaggerJson: local.swaggerJson
            })[0];
            // init options-defaults
            local.objectSetDefault(options, {
                inForm: isMultipartFormData
                    ? new local.FormData()
                    : '',
                inHeader: {},
                inPath: self._path.replace((/#.*?$/), ''),
                inQuery: '',
                headers: {},
                method: self._method,
                responseType: self.produces &&
                        self.produces[0].indexOf('application/octet-stream') === 0
                    ? 'arraybuffer'
                    : ''
            });
            // init paramDict
            self.parameters.forEach(function (schemaP) {
                tmp = options.paramDict[schemaP.name];
                if (tmp === undefined) {
                    return;
                }
                // serialize array
                if (Array.isArray(tmp) && schemaP.in !== 'body') {
                    switch (schemaP.collectionFormat || schemaP['x-swgg-collectionFormat']) {
                    case 'json':
                        tmp = JSON.stringify(tmp);
                        break;
                    case 'multi':
                        tmp.forEach(function (value) {
                            options[schemaP.in === 'formData'
                                ? 'inForm'
                                : 'inQuery'] += '&' + encodeURIComponent(schemaP.name) + '=' +
                                encodeURIComponent(local.schemaPItemsType(schemaP) === 'string'
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
                } else if (typeof tmp !== 'string' && !(tmp instanceof local.Blob)) {
                    tmp = JSON.stringify(tmp);
                }
                switch (schemaP.in) {
                case 'body':
                    options.inBody = tmp;
                    break;
                case 'formData':
                    if (isMultipartFormData) {
                        options.inForm.append(schemaP.name, tmp, tmp && tmp.name);
                        break;
                    }
                    options.inForm += '&' + encodeURIComponent(schemaP.name) + '=' +
                        encodeURIComponent(tmp);
                    break;
                case 'header':
                    options.inHeader[encodeURIComponent(schemaP.name.toLowerCase())] = tmp;
                    break;
                case 'query':
                    options.inQuery += '&' + encodeURIComponent(schemaP.name) + '=' +
                        encodeURIComponent(tmp);
                    break;
                case 'path':
                    options.inPath = options.inPath
                        .replace('{' + schemaP.name + '}', encodeURIComponent(tmp));
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
            options.url = (((local.normalizeValue('list', self.schemes ||
                local.swaggerJson.schemes)[0] ||
                local.urlParse('').protocol.slice(0, -1)) + '://' +
                (self['x-swgg-host'] || local.swaggerJson.host || local.urlParse('').host) +
                local.swaggerJsonBasePath) + options.inPath + '?' + options.inQuery.slice(1))
                .replace((/\?$/), '');
            if (!(options.headers['Content-Type'] || options.headers['content-type'])) {
                options.headers['content-type'] = 'application/json; charset=UTF-8';
            }
            if (options.error || options.modeValidate) {
                onError(options.error);
                return;
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

        local.apiUpdate = function (options, onError) {
        /*
         * this function will update the swagger-api dict of api-calls
         */
            var tmp;
            options = options || {};
            // fetch swagger.json file
            if (options.modeAjax) {
                local.ajax(options, function (error, xhr) {
                    // JSON.parse swagger.json string
                    local.tryCatchOnError(function () {
                        tmp = JSON.parse(xhr.responseText);
                    }, local.nop);
                    error = error || local.utility2._debugTryCatchError;
                    // reset state
                    local.apiDict = local.swaggerJson = null;
                    // apiUpdate swagger.json object
                    local.apiUpdate(!error && tmp, function (error2, data) {
                        onError(error || error2, data);
                    });
                });
                return;
            }
            local.tryCatchOnError(function () {
                options = JSON.parse(options.utility2.assetsDict['/assets.swgg.swagger.json']);
            }, local.nop);
            // normalize options
            options = local.normalizeSwaggerJson(options);
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
                    "description": "web-demo of swagger-ui server",
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
            [local.swaggerJson.tags, options.tags].forEach(function (tagList) {
                tagList.forEach(function (tag) {
                    tmp[tag.name] = local.objectSetOverride(tmp[tag.name], tag);
                });
            });
            tmp = Object.keys(tmp).sort().map(function (key) {
                return tmp[key];
            });
            // merge options into swaggerJson
            options = local.objectSetOverride(local.swaggerJson, options, 10);
            // restore tags
            local.swaggerJson.tags = tmp;
            // init swaggerJsonBasePath
            local.swaggerJsonBasePath = local.swaggerJson.basePath === '/'
                ? ''
                : local.swaggerJson.basePath;
            Object.keys(options.definitions).forEach(function (schemaName) {
                tmp = options.definitions[schemaName] = local.jsonCopy(
                    local.validateBySwaggerSchema({
                        // dereference definition
                        modeDereference: true,
                        prefix: ['swaggerJson', 'definitions', schemaName],
                        schema: options.definitions[schemaName],
                        swaggerJson: local.swaggerJson
                    })
                );
                (tmp.allOf || []).forEach(function (element) {
                    local.objectSetDefault(tmp, local.jsonCopy(local.validateBySwaggerSchema({
                        // dereference definition.allOf
                        modeDereference: true,
                        prefix: ['swaggerJson', 'definitions', schemaName, 'allOf'],
                        schema: element,
                        swaggerJson: local.swaggerJson
                    })), 2);
                });
                delete tmp.allOf;
            });
            // init apiDict from paths
            Object.keys(options.paths).forEach(function (path) {
                Object.keys(options.paths[path]).forEach(function (method) {
                    var self;
                    self = local.jsonCopy(options.paths[path][method]);
                    self._method = method.toUpperCase();
                    self._path = path;
                    tmp = 'operationId.' + self.operationId;
                    local.apiDict[tmp] = local.objectSetOverride(local.apiDict[tmp], self);
                });
            });
            // init apiDict from x-swgg-apiDict
            Object.keys(options['x-swgg-apiDict'] || {}).forEach(function (key) {
                // init self
                local.apiDict[key] = local.objectSetOverride(
                    local.apiDict[key],
                    local.jsonCopy(options['x-swgg-apiDict'][key])
                );
            });
            // init apiDict
            Object.keys(local.apiDict).forEach(function (key) {
                var self;
                if (key.indexOf('operationId.') !== 0) {
                    return;
                }
                key = key.split('.');
                self = local.apiDict[key.join('.')];
                // init operationId
                self.operationId = self.operationId || key.slice(1).join('.');
                // init _crudType
                self._crudType = self._crudType || key.slice(2);
                self._crudType[0] = self._crudType[0] || self.operationId;
                // init _fileUploadNumber
                self._fileUploadNumber = Number(
                    self._crudType[0] === 'fileUploadManyByForm' && self._crudType[1]
                ) || 1;
                // init _idBackend and _idName
                tmp = local.idNameInit({ crudType: self._crudType });
                self._idBackend = tmp.idBackend;
                self._idName = tmp.idName;
                // init tags
                self.tags = self.tags || [];
                self.tags[0] = self.tags[0] || key[1];
                // init templateApiDict
                if (local.templateApiDict[self._crudType[0]]) {
                    local.objectSetDefault(
                        self,
                        JSON.parse(local.templateApiDict[self._crudType[0]]
                            .replace((/\{\{_fileUploadNumber\}\}/g), self._fileUploadNumber)
                            .replace((/\{\{_idBackend\}\}/g), self._idBackend)
                            .replace((/\{\{_idName\}\}/g), self._idName)
                            .replace((/\{\{_operationId\}\}/g), self.operationId)
                            .replace((/\{\{_schemaName\}\}/g), self._schemaName)
                            .replace((/\{\{_tags0\}\}/g), self.tags[0]))
                    );
                }
                // init default
                local.objectSetDefault(self, {
                    parameters: [],
                    responses: { 200: {
                        description: 'ok - ' + 'http://jsonapi.org/format/#document-top-level',
                        schema: { $ref: '#/definitions/BuiltinJsonapiResponse' }
                    } }
                });
                // init _methodPath
                self._methodPath = self._method + ' ' + self._path.replace((/\{.*?\}/g), '{}');
                self.parameters.forEach(function (schemaP) {
                    // init _idName.format and _idName.type
                    if (self._schemaName && schemaP.name === self._idName) {
                        schemaP.format = options.definitions[self._schemaName]
                            .properties[self._idBackend].format;
                        schemaP.type = local.schemaPType(options.definitions[self._schemaName]
                            .properties[self._idBackend]);
                    }
                    local.tryCatchOnError(function () {
                        // dereference schemaP.$ref
                        local.objectSetDefault(schemaP, local.jsonCopy(
                            options.parameters[
                                (schemaP.$ref || schemaP['x-swgg-$ref']).split('#/parameters/')[1]
                            ]
                        ));
                        delete schemaP.$ref;
                    }, local.nop);
                });
                switch (self._crudType[0]) {
                // add extra file-upload forms
                case 'fileUploadManyByForm':
                    for (tmp = 1; tmp <= self._fileUploadNumber; tmp += 1) {
                        self.parameters[tmp] = local.jsonCopy(self.parameters[1]);
                        self.parameters[tmp].name = 'file' + tmp;
                    }
                    break;
                }
                // update apiDict
                self = local.apiDict[key.join('.')] = local.apiDict[self._methodPath] =
                    local.jsonCopy(self);
                // init ajax
                self.ajax = function (options, onError) {
                    return local.apiAjax(self, options, onError);
                };
                self._ajaxToString = self.ajax.toString()
                    .replace('{', ('{\n' +
                        '/*\n' +
                        ' * this function will make the api-call ' +
                        JSON.stringify(self._methodPath) + '\n' +
                        ' * example usage:' + ('\n' +
                        'swgg.apiDict[' + JSON.stringify(key.join('.')) + '].ajax(' +
                        JSON.stringify(local.normalizeSwaggerParamDict({
                                modeDefault: true,
                                operation: self,
                                paramDict: {}
                            }).paramDict, null, 4) +
                        ', function (error, data) {\n' +
                        '    if (error) {\n' +
                        '        console.error(error);\n' +
                        '        return;\n' +
                        '    }\n' +
                        '    console.log(data.responseJson || data.responseText);\n' +
                        '});').replace((/\n/g), '\n    ') + '\n */')
                        .replace((/\n/g), '\n                '));
                self.ajax.toString = function () {
                    return self._ajaxToString;
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
            // try to validate swaggerJson
            local.tryCatchOnError(function () {
                local.validateBySwaggerJson({ swaggerJson: local.swaggerJson });
            }, local.onErrorDefault);
            // init corsForwardProxyHost
            local.corsForwardProxyHost = local.corsForwardProxyHost ||
                local.swaggerJson['x-swgg-corsForwardProxyHost'];
            // init assets.swgg.swagger.server.json
            local.assetsDict['/assets.swgg.swagger.server.json'] = JSON.stringify(
                local.swaggerJson
            );
            local.setTimeoutOnError(onError, null, options);
        };

        local.dbFieldRandomCreate = function (options) {
        /*
         * this function will create a random dbField from options.schemaP
         */
            var depth, ii, max, min, schemaP, value;
            depth = Number.isFinite(options.depth)
                ? options.depth
                : 3;
            schemaP = options.schemaP;
            schemaP = schemaP.schema || schemaP;
            if (schemaP.readOnly) {
                return;
            }
            if (schemaP.enum) {
                value = options.modeNotRandom
                    ? schemaP.enum[0]
                    : local.listGetElementRandom(schemaP.enum);
                return local.schemaPType(schemaP) === 'array'
                    ? [value]
                    : value;
            }
            // init default-value
            value = null;
            switch (local.schemaPType(schemaP)) {
            case 'boolean':
                value = options.modeNotRandom
                    ? false
                    : Math.random() > 0.5
                    ? false
                    : true;
                break;
            // 5.1. Validation keywords for numeric instances (number and integer)
            case 'integer':
            case 'number':
                max = schemaP.maximum;
                min = schemaP.minimum;
                if (options.modeNotRandom) {
                    value = !(0 < min || max < 0)
                        ? 0
                        : min || max;
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
                    if (local.schemaPType(schemaP) === 'integer') {
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
            case 'string':
                value = options.modeNotRandom
                    ? 'abcd1234'
                    : ((1 + Math.random()) * 0x10000000000000).toString(36).slice(1);
                switch (schemaP.format) {
                case 'byte':
                    value = local.base64FromString(value);
                    break;
                case 'date':
                case 'date-time':
                    value = new Date().toISOString();
                    break;
                case 'email':
                    value = value + '@example.com';
                    break;
                case 'json':
                    value = JSON.stringify({ foo: value });
                    break;
                case 'phone':
                    value = options.modeNotRandom
                        ? '+123 (1234) 1234-1234'
                        : '+' + Math.random().toString().slice(-3) +
                            ' (' + Math.random().toString().slice(-4) + ') ' +
                            Math.random().toString().slice(-4) + '-' +
                            Math.random().toString().slice(-4);
                    break;
                }
                while (value.length < schemaP.minLength) {
                    value += value;
                }
                value = value.slice(0, schemaP.maxLength || Infinity);
                break;
            // 5.3. Validation keywords for arrays
            case 'array':
                if (depth <= 0) {
                    break;
                }
                value = [];
                for (ii = 0; ii < Math.min(
                        // 5.3.2. maxItems
                        schemaP.maxItems || 2,
                        // 5.3.3. minItems
                        schemaP.minItems || 2,
                        // 5.3.4. uniqueItems
                        schemaP.uniqueItems
                            ? 2
                            : 1
                    ); ii += 1) {
                    // recurse dbFieldRandomCreate
                    value.push(local.dbFieldRandomCreate({
                        depth: depth - 1,
                        modeNotRandom: options.modeNotRandom,
                        schemaP: local.schemaPItems(schemaP)
                    }));
                }
                break;
            // 5.4. Validation keywords for objects
            default:
                if (depth <= 0) {
                    break;
                }
                // recurse dbRowRandomCreate
                value = local.dbRowRandomCreate({
                    depth: depth - 1,
                    modeNotRandom: options.modeNotRandom,
                    schema: schemaP
                });
                break;
            }
            return value;
        };

        local.dbRowListRandomCreate = function (options) {
        /*
         * this function will create a dbRowList of options.length random dbRow's
         */
            var ii;
            for (ii = 0; ii < options.length; ii += 1) {
                options.dbRowList.push(local.dbRowRandomCreate(options));
            }
            return options.dbRowList;
        };

        local.dbRowRandomCreate = function (options) {
        /*
         * this function will create a random dbRow from options.properties
         */
            var ii, dbRow, properties;
            dbRow = {};
            options = local.objectSetDefault(options, { override: local.nop });
            properties = local.validateBySwaggerSchema({
                // dereference property
                modeDereference: true,
                prefix: ['dbRow'],
                schema: options.schema,
                swaggerJson: local.swaggerJson
            });
            properties = local.jsonCopy((properties && properties.properties) || {});
            for (ii = Object.keys(properties).length;
                    ii < (options.schema && options.schema.minProperties);
                    ii += 1) {
                properties['property' + ii] = { type: 'string' };
            }
            Object.keys(properties).forEach(function (key) {
                dbRow[key] = local.dbFieldRandomCreate({
                    depth: options.depth,
                    modeNotRandom: options.modeNotRandom,
                    schemaP: local.validateBySwaggerSchema({
                        // dereference property
                        modeDereference: true,
                        prefix: ['dbRow', key],
                        schema: properties[key],
                        swaggerJson: local.swaggerJson
                    })
                });
            });
            dbRow = local.jsonCopy(local.objectSetOverride(dbRow, options.override(options)));
            // try to validate data
            local.tryCatchOnError(function () {
                local.validateBySwaggerSchema({
                    data: dbRow,
                    prefix: ['dbRow'],
                    schema: options.schema,
                    swaggerJson: local.swaggerJson
                });
            }, console.error);
            return dbRow;
        };

        local.idDomElementCreate = function (seed) {
        /*
         * this function will create a deterministic and unique dom-element id from the seed,
         * that is both dom-selector and url friendly
         */
            local.idDomElementDict[seed] = (local.idDomElementDict[seed] || 0) + 1;
            return encodeURIComponent(
                seed + '_' + local.idDomElementDict[seed]
            ).replace((/\W/g), '_');
        };

        local.idNameInit = function (options) {
        /*
         * this function will init options.idBackend, options.idName, and options.queryById
         */
            var idBackend, idName;
            // init idName
            idName = options.idName = options.crudType[1] || 'id';
            // init idBackend
            idBackend = options.idBackend = options.crudType[2] || options.idName;
            // invert queryById
            if (options.modeQueryByIdInvert) {
                idBackend = options.idName;
                idName = options.idBackend;
            }
            // init queryById
            options.idValue = (options.data && options.data[idBackend]) || options.idValue;
            options.queryById = {};
            options.queryById[idName] = options.idValue;
            return options;
        };

        local.middlewareBodyParse = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will parse request.bodyRaw
         */
            var boundary, crlf, data, header, ii, jj, name;
            // jslint-hack - nop
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
                request.swgg.bodyParsed = local.urlParse('?' + request.swgg.bodyParsed, true).query;
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
                crlf = local.bufferCreate([0x0d, 0x0a]);
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
                    header = local.bufferToString(request.bodyRaw.slice(ii, ii + 1024))
                        .split('\r\n').slice(0, 2).join('\r\n');
                    name = (/^content-disposition:.*?\bname="([^"]+)/im).exec(header);
                    name = name && name[1];
                    request.swgg.bodyMeta[name] = {
                        contentType: ((/^content-type:(.*)/im)
                        .exec(header) || {1: ''})[1].trim() || null,
                        filename: ((/^content-disposition:.*?\bfilename="([^"]+)/im)
                        .exec(header) || {1: ''})[1].trim() || null,
                        name: name
                    };
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
                    switch (crud.crudType[0]) {
                    case 'crudCountManyByQuery':
                        crud.dbTable.crudCountManyByQuery(crud.queryWhere, options.onNext);
                        break;
                    case 'crudSetManyById':
                        crud.dbTable.crudSetManyById(crud.body, options.onNext);
                        break;
                    case 'crudSetOneById':
                        // replace idName with idBackend in body
                        delete crud.body.id;
                        delete crud.body[crud.idName];
                        crud.body[crud.idBackend] = crud.data[crud.idName];
                        crud.dbTable.crudSetOneById(crud.body, options.onNext);
                        break;
                    case 'crudUpdateOneById':
                        // replace idName with idBackend in body
                        delete crud.body.id;
                        delete crud.body[crud.idName];
                        crud.body[crud.idBackend] = crud.data[crud.idName];
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
                                request.swgg.paramDict[key] = local.bufferToString(
                                    request.swgg.bodyParsed[key]
                                );
                            }
                        });
                        crud.body = Object.keys(request.swgg.bodyMeta)
                            .filter(function (key) {
                                return typeof request.swgg.bodyMeta[key].filename === 'string';
                            })
                            .map(function (key) {
                                tmp = local.jsonCopy(request.swgg.paramDict);
                                tmp.id = tmp.id ||
                                    ((1 + Math.random()) * 0x10000000000000).toString(36).slice(1);
                                local.objectSetOverride(tmp, {
                                    fileBlob:
                                        local.base64FromBuffer(request.swgg.bodyParsed[key]),
                                    fileContentType: request.swgg.bodyMeta[key].contentType,
                                    fileFilename: request.swgg.bodyMeta[key].filename,
                                    fileInputName: request.swgg.bodyMeta[key].name,
                                    fileSize: request.swgg.bodyParsed[key].length,
                                    fileUrl: local.swaggerJsonBasePath +
                                        '/' + request.swgg.operation.tags[0] +
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
                    switch (crud.crudType[0]) {
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
                    switch (crud.crudType[0]) {
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
            // jslint-hack - nop
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
         * map the request's method-path to swagger's tags[0]-crudType
         */
            var tmp;
            // jslint-hack - nop
            local.nop(response);
            // init swgg object
            local.objectSetDefault(request, { swgg: { crud: { crudType: [] }, user: {} } }, 3);
            // if request.url is not prefixed with swaggerJsonBasePath,
            // then default to nextMiddleware
            if (request.urlParsed.pathname.indexOf(local.swaggerJsonBasePath) !== 0) {
                nextMiddleware();
                return;
            }
            // init methodPath
            request.swgg.methodPath = request.method + ' ' +
                request.urlParsed.pathname.replace(local.swaggerJsonBasePath, '');
            // init operation
            while (request.swgg.methodPath !== tmp) {
                request.swgg.operation = local.apiDict[request.swgg.methodPath] ||
                    // handle /foo/{id}/bar case
                    local.apiDict[
                        request.swgg.methodPath.replace((/\/[^\/]+\/([^\/]*?)$/), '/{}/$1')
                    ];
                // if operation exists, then break
                if (request.swgg.operation) {
                    request.swgg.operation = local.jsonCopy(request.swgg.operation);
                    // init crud.crudType
                    request.swgg.crud.crudType = request.swgg.operation._crudType;
                    break;
                }
                tmp = request.swgg.methodPath;
                // handle /foo/{id} case
                request.swgg.methodPath = request.swgg.methodPath.replace(
                    (/\/[^\/]+?(\/*?)$/),
                    '/$1{}'
                );
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
                    switch (crud.crudType[0]) {
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
                    switch (crud.crudType[0]) {
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
                        // create JSON Web Token (JWT)
                        // https://tools.ietf.org/html/rfc7519
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
            var crud, options, tmp;
            // jslint-hack - nop
            local.nop(response);
            options = {};
            local.onNext(options, function (error) {
                switch (options.modeNext) {
                case 1:
                    if (!request.swgg.operation) {
                        options.modeNext = Infinity;
                        options.onNext();
                        return;
                    }
                    // init paramDict
                    request.swgg.paramDict = {};
                    // parse path param
                    tmp = request.urlParsed.pathname
                        .replace(local.swaggerJsonBasePath, '')
                        .split('/');
                    request.swgg.operation._path.split('/').forEach(function (key, ii) {
                        if ((/^\{\S*?\}$/).test(key)) {
                            request.swgg.paramDict[key.slice(1, -1)] = decodeURIComponent(tmp[ii]);
                        }
                    });
                    request.swgg.operation.parameters.forEach(function (schemaP) {
                        switch (schemaP.in) {
                        // parse body param
                        case 'body':
                            request.swgg.paramDict[schemaP.name] = request.swgg.bodyParsed ||
                                undefined;
                            break;
                        // parse formData param
                        case 'formData':
                            switch (String(request.headers['content-type']).split(';')[0]) {
                            case 'application/x-www-form-urlencoded':
                                request.swgg.paramDict[schemaP.name] =
                                    request.swgg.bodyParsed[schemaP.name];
                                break;
                            }
                            break;
                        // parse header param
                        case 'header':
                            request.swgg.paramDict[schemaP.name] =
                                request.headers[schemaP.name.toLowerCase()];
                            break;
                        // parse query param
                        case 'query':
                            request.swgg.paramDict[schemaP.name] =
                                request.urlParsed.query[schemaP.name];
                            break;
                        }
                        // parse array-multi
                        tmp = request.swgg.paramDict[schemaP.name];
                        if (tmp &&
                                local.schemaPType(schemaP) === 'array' &&
                                schemaP.collectionFormat === 'multi') {
                            request.swgg.paramDict[schemaP.name] =
                                encodeURIComponent(schemaP.name) + '=' + (Array.isArray(tmp)
                                ? tmp
                                : [tmp]).join('&' + encodeURIComponent(schemaP.name) + '=');
                        }
                        // init default param
                        if (local.isNullOrUndefined(request.swgg.paramDict[schemaP.name]) &&
                                schemaP.default !== undefined) {
                            request.swgg.paramDict[schemaP.name] = local.jsonCopy(
                                schemaP.default
                            );
                        }
                    });
                    // normalize paramDict
                    local.normalizeSwaggerParamDict(request.swgg);
                    // validate paramDict
                    error = local.validateBySwaggerParameters({
                        data: request.swgg.paramDict,
                        prefix: ['operation', request.swgg.methodPath],
                        parameters: request.swgg.operation.parameters,
                        swaggerJson: local.swaggerJson
                    })[0];
                    options.onNext(error);
                    break;
                case 2:
                    // init crud
                    crud = request.swgg.crud;
                    // init crud.dbTable
                    crud.dbTable = request.swgg.operation &&
                        request.swgg.operation._schemaName &&
                        local.db.dbTableCreateOne({ name: request.swgg.operation._schemaName });
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
                    request.swgg.operation.parameters.forEach(function (schemaP) {
                        // JSON.parse json-string
                        if (schemaP.format === 'json' &&
                                local.schemaPType(schemaP) === 'string' &&
                                crud.data[schemaP.name]) {
                            crud.data[schemaP.name] = JSON.parse(crud.data[schemaP.name]);
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
                                request.swgg.operation['_' + element.key] || 'null',
                                request.swgg.paramDict,
                                { notHtmlSafe: true }
                            )
                        ) || element.value;
                    });
                    // init-before crud.idName
                    crud.modeQueryByIdInvert = true;
                    local.idNameInit(crud);
                    // init crud.data.id
                    switch (crud.crudType[0]) {
                    case 'crudSetOneById':
                    case 'crudUpdateOneById':
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
                    nextMiddleware(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.normalizeSwaggerJson = function (options) {
        /*
         * this function will normalize swaggerJson and filter $npm_package_swggTags0
         */
            var tmp;
            local.objectSetDefault(options, { paths: {}, tags: [] });
            // auto-create operationId from path
            Object.keys(options.paths).forEach(function (path) {
                Object.keys(options.paths[path]).forEach(function (method) {
                    tmp = options.paths[path][method];
                    local.objectSetDefault(tmp, { parameters: [], tags: [] });
                    // auto-create operationId
                    if (options['x-swgg-operationIdFromPath'] ||
                            tmp['x-swgg-operationIdFromPath'] ||
                            !tmp.operationId) {
                        tmp.operationId = encodeURIComponent(path + ' ' + method)
                            .replace((/[^\w\-.]/g), '_');
                    }
                });
            });
            if (!local.env.npm_package_swggTags0) {
                return options;
            }
            // override options with x-swgg-tags0-override
            local.objectSetOverride(options, options['x-swgg-tags0-override'] &&
                options['x-swgg-tags0-override'][local.env.npm_package_swggTags0], 10);
            // filter $npm_package_swggTags0 - definitions and parameters
            ['definitions', 'parameters'].forEach(function (schema) {
                schema = options[schema] || {};
                Object.keys(schema).forEach(function (key) {
                    if (schema[key]['x-swgg-tags0'] &&
                            schema[key]['x-swgg-tags0'] !== 'all' &&
                            schema[key]['x-swgg-tags0'] !== local.env.npm_package_swggTags0) {
                        delete schema[key];
                    }
                });
            });
            // filter $npm_package_swggTags0 - paths
            Object.keys(options.paths).forEach(function (path) {
                Object.keys(options.paths[path]).forEach(function (method) {
                    tmp = options.paths[path][method];
                    if (tmp['x-swgg-tags0'] &&
                            tmp['x-swgg-tags0'] !== 'all' &&
                            tmp['x-swgg-tags0'] !== local.env.npm_package_swggTags0) {
                        delete options.paths[path][method];
                        return;
                    }
                });
                if (!Object.keys(options.paths[path]).length) {
                    delete options.paths[path];
                }
            });
            // filter $npm_package_swggTags0 - tags
            options.tags = options.tags.filter(function (tag) {
                return !tag['x-swgg-tags0'] ||
                    tmp['x-swgg-tags0'] === 'all' ||
                    tag['x-swgg-tags0'] === local.env.npm_package_swggTags0;
            });
            return options;
        };

        local.normalizeSwaggerParamDict = function (options) {
        /*
         * this function will parse the options according to options.operation.parameters
         */
            var tmp;
            options.operation.parameters.forEach(function (schemaP) {
                tmp = options.paramDict[schemaP.name];
                // init default value
                if (!options.modeNoDefault &&
                        (options.modeDefault || schemaP.required) &&
                        local.isNullOrUndefined(tmp)) {
                    tmp = local.jsonCopy(schemaP.default);
                }
                if (options.modeDefault && local.isNullOrUndefined(tmp)) {
                    tmp = local.dbFieldRandomCreate({
                        modeNotRandom: true,
                        schemaP: schemaP
                    });
                }
                // parse array
                if (local.schemaPType(schemaP) === 'array' && schemaP.in !== 'body') {
                    if (typeof tmp === 'string') {
                        switch (schemaP.collectionFormat || schemaP['x-swgg-collectionFormat']) {
                        case 'json':
                            local.tryCatchOnError(function () {
                                tmp = JSON.parse(tmp);
                            }, local.nop);
                            options.paramDict[schemaP.name] = tmp;
                            return;
                        case 'multi':
                            tmp = local.urlParse('?' + tmp, true).query[schemaP.name];
                            if (!Array.isArray(tmp)) {
                                tmp = [tmp];
                            }
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
                        if (local.schemaPItemsType(schemaP) !== 'string') {
                            // try to JSON.parse the string
                            local.tryCatchOnError(function () {
                                tmp = tmp.map(function (element) {
                                    return JSON.parse(element);
                                });
                            }, local.nop);
                        }
                    }
                // JSON.parse paramDict
                } else if (local.schemaPType(schemaP) !== 'file' &&
                        local.schemaPType(schemaP) !== 'string' &&
                        (typeof tmp === 'string' || tmp instanceof local.global.Uint8Array)) {
                    // try to JSON.parse the string
                    local.tryCatchOnError(function () {
                        tmp = JSON.parse(local.bufferToString(tmp));
                    }, local.nop);
                }
                options.paramDict[schemaP.name] = tmp;
            });
            return options;
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
                        data = data.errorList || data;
                        // normalize error-list to be non-empty
                        if (!data.length) {
                            data.push(null);
                        }
                        data = data.map(function (element) {
                            if (!(typeof element === 'object' && element)) {
                                element = { message: String(element) };
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

        local.schemaPItemsType = function (schemaP) {
        /*
         * this function will return schemaP.items.type
         */
            return local.schemaPType(local.schemaPItems(schemaP) || {});
        };

        local.schemaPItems = function (schemaP) {
        /*
         * this function will return schemaP.items
         */
            return schemaP['x-swgg-items'] || schemaP.items;
        };

        local.schemaPType = function (schemaP) {
        /*
         * this function will return schemaP.type
         */
            return schemaP['x-swgg-type'] || schemaP.type;
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
                    local.errorMessagePrepend(error, response.statusCode + ' ' + request.method +
                        ' ' + request.url + '\n');
                    // print error.stack to stderr
                    local.onErrorDefault(error);
                }
                data = error || data;
                data.meta.statusCode = response.statusCode = data.meta.statusCode ||
                    response.statusCode;
                response.end(JSON.stringify(data));
            })(error, data, meta);
        };

        local.throwSwaggerError = function (options) {
        /*
         * this function will throw a swaggerError with the given options.errorType
         */
            var error;
            if (!options) {
                return;
            }
            options.data2 = options.data === undefined
                ? 'undefined'
                : JSON.stringify(options.data);
            options.prefix2 = options.prefix[0] + options.prefix.slice(1).map(function (element) {
                return '[' + JSON.stringify(element) + ']';
            }).join('');
            options.schema2 = JSON.stringify(options.schema) || 'undefined';
            options.type2 = (options.schema && local.schemaPType(options.schema)) || 'object';
            if (options.schema && options.schema.format) {
                options.type2 += ' (' + options.schema.format + ')';
            }
            Object.keys(options).forEach(function (key) {
                if (typeof options[key] === 'string' && options[key].length > 100) {
                    options[key] = options[key].slice(0, 100) + '...' + options[key].slice(-1);
                }
            });
            error = new Error('error.' + options.errorType + ' - ' + local.templateRender(
                local.swaggerErrorTypeDict[options.errorType],
                options,
                { notHtmlSafe: true }
            ));
            error.messageShort = 'value ' + local.templateRender(
                local.swaggerErrorTypeDict[options.errorType].replace((/.*?\{\{data2\}\} /), ''),
                options,
                { notHtmlSafe: true }
            );
            error.options = options;
            error.statusCode = 400;
            throw error;
        };

        local.uiAnimateShake = function (element) {
        /*
         * this function will shake the dom-element
         */
            element.classList.add('uiAnimateShake');
            setTimeout(function () {
                element.classList.remove('uiAnimateShake');
            }, 500);
        };

        local.uiEventDelegate = function (event) {
            event.target2 = event.target;
            // filter non-input keyup-event
            if (event.type === 'keyup' &&
                    !event.target2.closest('input, option, select, textarea')) {
                return;
            }
            // delegate event in .operation
            event.targetOperation = event.target2.closest('.operation');
            Object.keys(local.uiEventListenerDict).sort().some(function (key) {
                switch (key) {
                case '.onEventOperationDisplayShow':
                    event.target2 = event.target2.closest(key) || event.target2;
                    break;
                }
                if (!(event.currentTarget.matches(key) || event.target2.matches(key))) {
                    return;
                }
                switch (event.target2.tagName) {
                case 'BUTTON':
                case 'FORM':
                    event.preventDefault();
                    break;
                }
                event.stopPropagation();
                local.uiEventListenerDict[key](event);
                return true;
            });
            if (event.targetOperation && !local.timerTimeoutOnEventInputValidate) {
                local.timerTimeoutOnEventInputValidate = setTimeout(function () {
                    local.timerTimeoutOnEventInputValidate = null;
                    // validate input
                    local.uiEventListenerDict['.onEventInputValidate'](event);
                }, 25);
            }
        };

        local.uiEventListenerDict = {};

        local.uiEventListenerDict['.onEventInputTextareaChange'] = function (event) {
        /*
         * this function will show/hide the textarea's multiline placeholder
         */
            var isTransparent, value;
            isTransparent = event.target2.style.background === 'transparent';
            value = event.target2.value;
            if (value && isTransparent) {
                event.target2.style.background = '';
            }
            if (!value && !isTransparent) {
                event.target2.style.background = 'transparent';
            }
        };

        local.uiEventListenerDict['.onEventInputValidate'] = function (options, onError) {
        /*
         * this function will validate the parameters
         */
            var errorDict, jsonParse, tmp;
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
            options.api = local.apiDict[options.targetOperation.dataset._methodPath];
            options.headers = {};
            options.modeNoDefault = true;
            options.modeValidate = !options.modeAjax;
            options.paramDict = {};
            options.url = '';
            options.api.parameters.forEach(function (schemaP) {
                tmp = options.targetOperation.querySelector(
                    '.schemaP[data-name=' + JSON.stringify(schemaP.name) + '] .input'
                );
                switch (tmp.tagName) {
                case 'INPUT':
                    // parse file
                    if (local.schemaPType(tmp) === 'file') {
                        tmp = tmp.files && tmp.files[0];
                        break;
                    }
                    tmp = tmp.value;
                    if (!tmp) {
                        return;
                    }
                    // parse string
                    if (local.schemaPType(schemaP) !== 'string') {
                        tmp = jsonParse(tmp);
                    }
                    break;
                case 'SELECT':
                    tmp = Array.from(tmp.options)
                        .filter(function (element) {
                            return element.selected;
                        })
                        .map(function (element) {
                            return jsonParse(decodeURIComponent(
                                element.dataset.valueSelectOption
                            ));
                        });
                    if (!tmp.length || tmp[0] === '$swggUndefined') {
                        return;
                    }
                    if (local.schemaPType(schemaP) !== 'array') {
                        tmp = tmp[0];
                    }
                    break;
                case 'TEXTAREA':
                    tmp = tmp.value;
                    if (!tmp) {
                        return;
                    }
                    if (schemaP.schema &&
                            local.schemaPType(schemaP.schema) === 'string' &&
                            typeof tmp === 'string') {
                        break;
                    }
                    // parse schema
                    if (schemaP.in === 'body') {
                        tmp = jsonParse(tmp);
                        break;
                    }
                    // parse array
                    tmp = tmp.split('\n').map(function (element) {
                        return local.schemaPItemsType(schemaP) === 'string'
                            ? element
                            : jsonParse(element);
                    });
                    break;
                }
                options.paramDict[schemaP.name] = tmp;
            });
            options.api.ajax(options, onError || local.nop);
            // init errorDict
            errorDict = {};
            ((options.error && options.error.errorList) || []).forEach(function (error) {
                errorDict[error.options.prefix.filter(function (element) {
                    return typeof element === 'string';
                }).slice(-1)[0]] = error;
            });
            Array.from(options.targetOperation.querySelectorAll(
                '.schemaP[data-name]'
            )).forEach(function (element) {
                tmp = errorDict[element.dataset.name];
                // remove previous error
                if (!tmp) {
                    element.querySelector('.input').classList.remove('styleBorderError');
                    element.querySelector('.styleColorError').textContent = '';
                    return;
                }
                // shake invalid-input
                if (!element.querySelector('.input').classList.contains('styleBorderError')) {
                    element.querySelector('.input').classList.add('styleBorderError');
                    local.uiAnimateShake(element.querySelector('.td3'));
                }
                element.querySelector('.styleColorError').textContent = tmp.messageShort;
            });
            // init requestCurl
            tmp = options.data;
            local.tryCatchOnError(function () {
                tmp = JSON.stringify(JSON.parse(options.data), null, 4);
            }, local.nop);
            tmp = 'curl \\\n' + '--request ' + options.api._method + ' \\\n' +
                Object.keys(options.headers).map(function (key) {
                    return "--header '" + key + ': ' + options.headers[key] + "' \\\n";
                }).join('') + '--data-binary ' + (typeof tmp === 'string'
                    ? "'" + tmp.replace(/'/g, "'\"'\"'") + "'"
                    : '<blob>') + ' \\\n"' + options.url.replace((/&/g), '&\\\n') + '"';
            options.targetOperation.querySelector('.requestCurl').textContent = tmp;
            // init requestJavascript
            options.targetOperation.querySelector('.requestJavascript').textContent =
                local.templateRender(local.templateUiRequestJavascript, {
                    options: options,
                    optionsJson: JSON.stringify({
                        paramDict: options.paramDict
                    }, null, 4)
                }, { notHtmlSafe: true });
        };

        local.uiEventListenerDict['.onEventOperationAjax'] = function (options) {
        /*
         * this function will submit the operation to the backend
         */
            // ensure options is stateless
            options = { targetOperation: options.targetOperation };
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    // init ajax
                    options.modeAjax = true;
                    // validate input
                    local.uiEventListenerDict['.onEventInputValidate'](options, options.onNext);
                    if (options.error) {
                        return;
                    }
                    // reset response output
                    Array.from(options.targetOperation.querySelectorAll(
                        '.responseBody, .responseHeaders, .responseStatusCode'
                    )).forEach(function (element) {
                        element.classList.remove('styleBorderError');
                        element.textContent = 'loading ...';
                    });
                    options.targetOperation.querySelector('.responseMedia').innerHTML = '';
                    // scrollTo response
                    options.targetOperation.querySelector('.responseBody').focus();
                    break;
                default:
                    if (options.error) {
                        return;
                    }
                    data = local.objectSetDefault(data, {
                        contentType: 'undefined',
                        error: error,
                        options: options,
                        statusCode: ''
                    });
                    // init responseStatusCode
                    options.targetOperation.querySelector('.responseStatusCode').textContent =
                        data.statusCode;
                    // init responseHeaders
                    options.targetOperation.querySelector('.responseHeaders').textContent =
                        data.getAllResponseHeaders().trim();
                    // init responseBody
                    options.targetOperation.querySelector('.responseHeaders').textContent.replace((
                        /^content-type:(.*?)$/im
                    ), function (match0, match1) {
                        match0 = match1;
                        data.contentType = match0.trim();
                    });
                    data.mediaType = data.contentType.split('/')[0].replace('image', 'img');
                    switch (data.mediaType) {
                    case 'audio':
                    case 'img':
                    case 'video':
                        options.targetOperation.querySelector('.responseBody').textContent =
                            data.contentType;
                        options.targetOperation.querySelector('.responseMedia').innerHTML =
                            '<' + data.mediaType + ' controls src="data:' + data.contentType +
                            ';base64,' + local.base64FromBuffer(data.response) + '"></' +
                            data.mediaType + '>';
                        break;
                    default:
                        options.targetOperation.querySelector('.responseBody').textContent =
                            data.responseJson
                            ? JSON.stringify(data.responseJson, null, 4)
                            : data.responseText;
                    }
                    // init error
                    if (!(data.statusCode < 400)) {
                        Array.from(options.targetOperation.querySelectorAll(
                            '.responseBody, .responseHeaders, .responseStatusCode'
                        )).forEach(function (element) {
                            element.classList.add('styleBorderError');
                            local.uiAnimateShake(element);
                        });
                    }
                    break;
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.uiEventListenerDict['.onEventOperationDisplayShow'] = function (event, onError) {
        /*
         * this function will toggle the display of the operation
         */
            var element;
            element = event.target2;
            element = element.querySelector('.operation') || element.closest('.operation');
            location.hash = '!' + element.id;
            element.closest('.resource').classList.remove('expanded');
            // show parent resource
            local.uiAnimateSlideDown(element.closest('.resource').querySelector('.operationList'));
            // show the operation, but hide all other operations
            local.uiAnimateSlideAccordian(
                element.querySelector('.operation > .content'),
                Array.from(element.closest('.operationList').querySelectorAll(
                    '.operation > .content'
                )),
                function () {
                    // scrollTo operation
                    element.querySelector('[tabIndex]').blur();
                    element.querySelector('[tabIndex]').focus();
                    // validate input
                    local.uiEventListenerDict['.onEventInputValidate']({
                        targetOperation: element
                    });
                    local.setTimeoutOnError(onError, null, element);
                }
            );
        };

        local.uiEventListenerDict['.onEventResourceDisplayAction'] = function (event) {
        /*
         * this function will toggle the display of the resource
         */
            location.hash = '!' + event.currentTarget.id;
            event.target2.className.split(' ').some(function (className) {
                switch (className) {
                case 'td1':
                    // show the resource, but hide all other resources
                    local.uiAnimateSlideAccordian(
                        event.currentTarget.querySelector('.operationList'),
                        Array.from(document.querySelectorAll('.swggUiContainer .operationList'))
                    );
                    // show at least one operation in the resource
                    local.uiEventListenerDict['.onEventOperationDisplayShow']({
                        target2: event.currentTarget.querySelector(
                            '.operation .uiAnimateSlide[style*="max-height: 100%"]'
                        ) || event.currentTarget.querySelector('.operation')
                    });
                    return true;
                case 'td2':
                    // show the resource, but hide all other resources
                    local.uiAnimateSlideAccordian(
                        event.currentTarget.querySelector('.operationList'),
                        Array.from(document.querySelectorAll('.swggUiContainer .operationList'))
                    );
                    // collapse all operations in the resource
                    if (event.currentTarget.classList.contains('expanded')) {
                        event.currentTarget.classList.remove('expanded');
                        Array.from(event.currentTarget.querySelectorAll(
                            '.operation > .content'
                        )).forEach(function (element) {
                            local.uiAnimateSlideUp(element);
                        });
                    // expand all operations in the resource
                    } else {
                        event.currentTarget.classList.add('expanded');
                        Array.from(event.currentTarget.querySelectorAll(
                            '.operation > .content'
                        )).forEach(function (element) {
                            local.uiAnimateSlideDown(element);
                            // validate input
                            local.uiEventListenerDict['.onEventInputValidate']({
                                targetOperation: element.closest('.operation')
                            });
                        });
                    }
                    return true;
                }
            });
        };

        local.uiEventListenerDict['.onEventUiReload'] = function (event, onError) {
        /*
         * this function will reload the ui
         */
            event = event || {};
            // clear all apiKeyValue's from localStorage
            if (event.target2 && event.target2.id === 'swggApiKeyClearButton1') {
                local.apiKeyValue = '';
                Object.keys(localStorage).forEach(function (key) {
                    if (key.indexOf('utility2_swgg_apiKeyKey_') === 0) {
                        localStorage.removeItem(key);
                    }
                });
            // restore apiKeyValue
            } else if (event.swggInit) {
                local.apiKeyKey = 'utility2_swgg_apiKeyKey_' + encodeURIComponent(local.urlParse(
                    document.querySelector('.swggUiContainer > .thead > .td2').value
                        .replace((/^\//), '')
                ).href);
                local.apiKeyValue = localStorage.getItem(local.apiKeyKey) || '';
            // save apiKeyValue
            } else {
                local.apiKeyValue = document.querySelector('#swggApiKeyInput1').value;
                local.localStorageSetItemOrClear(local.apiKeyKey, local.apiKeyValue);
            }
            // if keyup-event is not return-key, then return
            if ((event.type === 'keyup' && event.code !== 'Enter') ||
                    // do not reload ui during test
                    local.global.utility2_modeTestRun >= 2) {
                return;
            }
            // reset ui
            Array.from(document.querySelectorAll(
                '.swggUiContainer > .reset'
            )).forEach(function (element) {
                element.remove();
            });
            // normalize swaggerJsonUrl
            document.querySelector('.swggUiContainer > .thead > .td2').value = local.urlParse(
                document.querySelector('.swggUiContainer > .thead > .td2').value
                    .replace((/^\//), '')
            ).href;
            document.querySelector('#swggAjaxProgressDiv1 span').innerHTML = 'loading swagger.json';
            // fetch swagger.json file
            local.apiUpdate({
                modeAjax: true,
                url: document.querySelector('.swggUiContainer > .thead > .td2').value
            }, function (error) {
                local.uiRenderAll(null, onError);
                local.tryCatchOnError(function () {
                    local.validateBySwaggerJson({ swaggerJson: local.swaggerJson });
                }, local.uiNotify);
                local.uiNotify(error);
            });
        };

        local.uiNotify = function (error) {
        /*
         * this function will notify with the given error
         */
            var element;
            element = document.querySelector('#swggAjaxProgressPre1');
            if (!error) {
                return element;
            }
            // highlight and shake input
            element.classList.add('styleBorderError');
            local.uiAnimateShake(element);
            element.textContent = error.message + '\n' + element.textContent;
            return element;
        };

        local.uiRenderAll = function (options, onError) {
        /*
         * this function will render swagger-ui
         */
            var resource;
            // optimization - render .swggUiContainer first
            if (!(options && options.swagger)) {
                options = local.uiState = local.jsonCopy(local.swaggerJson);
                // init ajaxProgressText
                options.ajaxProgressText = 'rendering swagger.json';
                // init apiKeyValue
                options.apiKeyValue = local.apiKeyValue;
                // templateRender title
                document.querySelector('head > title').textContent = local.templateRender(
                    local.templateUiTitle,
                    options
                ).trim();
                // init urlSwaggerJson
                options.urlSwaggerJson = document.querySelector(
                    '.swggUiContainer > .thead > .td2'
                ).value;
                // templateRender main
                document.querySelector('.swggUiContainer').innerHTML = local.templateRender(
                    local.templateUiMain,
                    options
                );
                setTimeout(function () {
                    local.uiRenderAll(options, onError);
                }, 100);
                return;
            }
            // optimization - render .resourceList in separate event-loop
            // reset state
            local.idDomElementDict = {};
            local.objectSetDefault(options, { resourceDict: {}, operationDict: {}, tagDict: {} });
            // init tagDict
            options.tags.forEach(function (tag) {
                options.tagDict[tag.name] = tag;
            });
            // init operationDict
            Object.keys(local.apiDict).sort().forEach(function (operation) {
                // init operation
                operation = local.jsonCopy(local.apiDict[operation]);
                operation.tags.forEach(function (tag) {
                    options.operationDict[operation._methodPath] = operation;
                    // init resource
                    resource = options.resourceDict[tag] = local.objectSetDefault(
                        options.resourceDict[tag] || options.tagDict[tag],
                        { description: 'no description', name: tag }
                    );
                    resource.id = resource.id || local.idDomElementCreate('swgg_id_' + tag);
                });
            });
            // init uiFragment
            options.uiFragment = document.createDocumentFragment();
            // init resourceDict
            Object.keys(options.resourceDict).sort().forEach(function (key) {
                // templateRender resource
                options.uiFragment.appendChild(
                    local.domElementRender(local.templateUiResource, options.resourceDict[key])
                );
            });
            Object.keys(options.operationDict).sort(function (aa, bb) {
                aa = options.operationDict[aa];
                aa = aa._path + ' ' + aa._method;
                bb = options.operationDict[bb];
                bb = bb._path + ' ' + bb._method;
                return aa < bb
                    ? -1
                    : 1;
            }).forEach(function (operation) {
                operation = options.operationDict[operation];
                operation.id = local.idDomElementCreate('swgg_id_' + operation.operationId);
                operation.tags.forEach(function (tag) {
                    // create new operation for each tag
                    operation = local.jsonCopy(operation);
                    resource = options.resourceDict[tag];
                    local.objectSetDefault(operation, {
                        description: 'no description',
                        responseList: Object.keys(operation.responses).sort().map(function (key) {
                            return {
                                key: key,
                                value: local.objectSetDefault(operation.responses[key], {
                                    description: 'no description'
                                })
                            };
                        }),
                        summary: operation.description || 'no summary'
                    });
                    operation.parameters.forEach(local.uiRenderSchemaP);
                    // templateRender operation
                    options.uiFragment.querySelector('#' + resource.id + ' .operationList')
                        .appendChild(local.domElementRender(local.templateUiOperation, operation));
                });
            });
            // emulate <ol></ol> for operations
            Array.from(options.uiFragment.querySelectorAll(
                '.operationList'
            )).forEach(function (element) {
                Array.from(element.querySelectorAll(
                    '.operation > .thead > .td1'
                )).forEach(function (element, ii) {
                    element.textContent = ii + 1 + '.';
                });
            });
            // append uiFragment to swggUiContainer
            document.querySelector('#swggAjaxProgressDiv1').style.display = 'none';
            document.querySelector('.swggUiContainer .resourceList').appendChild(
                options.uiFragment
            );
            Array.from(document.querySelectorAll(
                '.swggUiContainer [data-value-text]'
            )).forEach(function (element) {
                // render valueText
                element.value = decodeURIComponent(element.dataset.valueText);
                delete element.dataset.valueText;
                // init textarea's multiline placeholder
                if (element.tagName === 'TEXTAREA') {
                    local.uiEventListenerDict['.onEventInputTextareaChange']({ target2: element });
                }
            });
            // init event-handling
            ['Click', 'Keyup', 'Submit'].forEach(function (eventType) {
                Array.from(document.querySelectorAll(
                    '.swggUiContainer .eventDelegate' + eventType
                )).forEach(function (element) {
                    element.addEventListener(eventType.toLowerCase(), local.uiEventDelegate);
                });
            });
            // scrollTo location.hash
            local.uiEventListenerDict['.onEventOperationDisplayShow']({
                target2: document.querySelector('#' + (location.hash.slice(2) || 'undefined')) ||
                    document.querySelector('.swggUiContainer .operation')
            });
            local.setTimeoutOnError(onError);
        };

        local.uiRenderSchemaP = function (schemaP) {
        /*
         * this function will render schemaP
         */
            // init schemaP.id
            schemaP.id = local.idDomElementCreate('swgg_id_' + schemaP.name);
            // init enum
            schemaP.enum2 = schemaP.enum ||
                (local.schemaPItems(schemaP) || {}).enum ||
                (local.schemaPType(schemaP) === 'boolean' && [false, true]);
            // init input - file
            if (local.schemaPType(schemaP) === 'file') {
                schemaP.isFile = true;
            // init input - textarea
            } else if (schemaP.in === 'body') {
                schemaP.isTextarea = true;
            // init input - select
            } else if (schemaP.enum2) {
                // init enumDefault
                schemaP.enumDefault = [];
                if (schemaP.required && schemaP.default !== undefined) {
                    schemaP.enumDefault = local.schemaPType(schemaP) === 'array'
                        ? schemaP.default
                        : [schemaP.default];
                }
                schemaP.isSelectMultiple = local.schemaPType(schemaP) === 'array';
                schemaP.selectOptionList = schemaP.enum2.map(function (element) {
                    // init hasDefault
                    schemaP.hasDefault = schemaP.hasDefault ||
                        schemaP.enumDefault.indexOf(element) >= 0;
                    return {
                        id: local.idDomElementCreate('swgg_id_' + schemaP.name),
                        selected: schemaP.enumDefault.indexOf(element) >= 0
                            ? 'selected'
                            : '',
                        type: local.schemaPItemsType(schemaP) || local.schemaPType(schemaP),
                        placeholder: typeof element === 'string'
                            ? element
                            : JSON.stringify(element),
                        valueSelectOption: element
                    };
                });
                // init 'undefined' value
                if (!schemaP.required && !schemaP.hasDefault) {
                    schemaP.selectOptionList.unshift({
                        id: local.idDomElementCreate('swgg_id_' + schemaP.name),
                        selected: 'selected',
                        type: local.schemaPType(schemaP),
                        placeholder: '<none>',
                        valueSelectOption: '$swggUndefined'
                    });
                }
                // select at least one value
                schemaP.selectOptionList.some(function (element, ii) {
                    if (ii === 0 || element.selected) {
                        element.selected = 'selected';
                        if (ii !== 0) {
                            schemaP.selectOptionList[0].selected = '';
                            return true;
                        }
                    }
                });
            // init input - textarea
            } else if (local.schemaPType(schemaP) === 'array') {
                schemaP.isTextarea = true;
            // init input - text
            } else {
                schemaP.isInputText = true;
            }
            // init format2 / type2
            [schemaP, schemaP.schema || {}].some(function (element) {
                local.objectSetDefault(schemaP, {
                    format2: local.schemaPItemsType(element) || element.format,
                    type2: local.schemaPType(element)
                });
                return schemaP.type2;
            });
            schemaP.type2 = schemaP.type2 || 'object';
            // init schema2
            [
                schemaP,
                local.schemaPItems(schemaP),
                schemaP.schema,
                schemaP.schema && local.schemaPItems(schemaP.schema)
            ].some(function (element) {
                schemaP.schema2 = (local.validateBySwaggerSchema({
                    // dereference schemaP
                    modeDereference: true,
                    prefix: ['parameters', schemaP.name],
                    schema: element,
                    swaggerJson: local.swaggerJson
                }) || {});
                return schemaP.schema2.properties;
            });
            if (schemaP.schema2.properties) {
                schemaP.schemaText = JSON.stringify(schemaP.type2 === 'array'
                    ? [schemaP.schema2.properties]
                    : schemaP.schema2.properties, null, 4);
            }
            // init placeholder
            schemaP.placeholder = !local.isNullOrUndefined(schemaP.default)
                ? schemaP.default
                : local.dbFieldRandomCreate({
                    modeNotRandom: true,
                    schemaP: schemaP
                });
            if (typeof schemaP.placeholder !== 'string') {
                if (schemaP.in === 'body') {
                    schemaP.placeholder = JSON.stringify(schemaP.placeholder, null, 4);
                } else if (Array.isArray(schemaP.placeholder)) {
                    schemaP.placeholder = schemaP.placeholder.map(function (element) {
                        return typeof element === 'string'
                            ? element
                            : JSON.stringify(element);
                    }).join('\n');
                } else {
                    schemaP.placeholder = JSON.stringify(schemaP.placeholder);
                }
            }
            // init valueText
            schemaP.valueText = schemaP['x-swgg-apiKey']
                ? local.apiKeyValue
                : schemaP.required
                ? schemaP.placeholder
                : '';
            // templateRender schemaP
            schemaP.innerHTML = local.templateRender(local.templateUiParameter, schemaP);
        };

        local.userLoginByPassword = function (options, onError) {
        /*
         * this function will send a login-by-password request
         */
            local.apiDict["GET /user/userLoginByPassword"].ajax({
                paramDict: { password: options.password, username: options.username }
            }, onError);
        };

        local.userLogout = function (options, onError) {
        /*
         * this function will send a logout request
         */
            local.apiDict["GET /user/userLogout"].ajax(options, onError);
        };

        local.utility2.middlewareError = function (error, request, response) {
        /*
         * this function will run the middleware that will
         * handle errors according to http://jsonapi.org/format/#errors
         */
            if (!error) {
                local.serverRespondDefault(request, response, 404);
                return;
            }
            local.serverRespondJsonapi(request, response, error);
        };

        local.validateBySwaggerJson = function (options) {
        /*
         * this function will validate the entire swagger json object
         */
            var operation, operationIdDict, prefix, swaggerJson, test, tmp;
            operationIdDict = {};
            swaggerJson = options.swaggerJson || {};
            local.validateBySwaggerSchema(local.objectSetDefault(options, {
                data: swaggerJson,
                modeSchema: true,
                prefix: ['swaggerJson'],
                schema: local.swaggerSchemaJson,
                swaggerJson: swaggerJson
            }));
            // validate swaggerJson.definitions[key].properties[ii].default
            Object.keys(swaggerJson.definitions || {}).forEach(function (schemaName) {
                tmp = local.validateBySwaggerSchema({
                    // dereference definition
                    modeDereference: true,
                    prefix: ['swaggerJson', 'definitions', schemaName],
                    schema: swaggerJson.definitions[schemaName],
                    swaggerJson: swaggerJson
                });
                Object.keys(tmp.properties || {}).forEach(function (key) {
                    local.validateBySwaggerSchema({
                        modeDefault: true,
                        prefix: ['swaggerJson', 'definitions', schemaName, 'properties', key],
                        schema: tmp.properties[key],
                        swaggerJson: swaggerJson
                    });
                });
            });
            // validate swaggerJson.parameters[key].default
            Object.keys(swaggerJson.parameters || []).forEach(function (key) {
                local.validateBySwaggerSchema({
                    modeDefault: true,
                    prefix: ['swaggerJson', 'parameters', key],
                    schema: swaggerJson.parameters[key],
                    swaggerJson: swaggerJson
                });
            });
            // validate swaggerJson.paths[key][key].parameters[ii].default
            Object.keys(swaggerJson.paths).forEach(function (path) {
                Object.keys(swaggerJson.paths[path]).forEach(function (method) {
                    prefix = ['swaggerJson', 'paths', path, method];
                    operation = local.validateBySwaggerSchema({
                        // dereference operation
                        modeDereference: true,
                        prefix: prefix,
                        schema: swaggerJson.paths[path][method],
                        swaggerJson: swaggerJson
                    });
                    // validate semanticUniqueOperationId
                    test = !operationIdDict[operation.operationId];
                    local.throwSwaggerError(!test && {
                        data: operation.operationId,
                        errorType: 'semanticUniqueOperationId',
                        prefix: prefix
                    });
                    operationIdDict[operation.operationId] = true;
                    (operation.parameters || []).forEach(function (schemaP) {
                        local.validateBySwaggerSchema({
                            modeDefault: true,
                            prefix: prefix.concat(['parameters', schemaP.name]),
                            schema: schemaP,
                            swaggerJson: swaggerJson
                        });
                    });
                });
            });
        };

        local.validateBySwaggerParameters = function (options) {
        /*
         * this function will validate options.data against options.parameters
         */
            var errorList;
            errorList = [];
            options.parameters.forEach(function (schemaP) {
                local.tryCatchOnError(function () {
                    local.validateBySwaggerSchema({
                        data: options.data[schemaP.name],
                        dataReadonlyRemove: [
                            options.dataReadonlyRemove || {},
                            schemaP.name,
                            (options.dataReadonlyRemove || {})[schemaP.name]
                        ],
                        prefix: options.prefix.concat([schemaP.name]),
                        schema: schemaP,
                        swaggerJson: local.swaggerJson
                    });
                }, function (errorCaught) {
                    errorList.push(errorCaught);
                    errorCaught.errorList = errorList;
                });
            });
            return errorList;
        };

        local.validateBySwaggerSchema = function (options) {
        /*
         * this function will validate data against schema
         * http://json-schema.org/draft-04/json-schema-validation.html#rfc.section.5
         */
            var $ref,
                circularList,
                data,
                dataReadonlyRemove2,
                ii,
                oneOf,
                schema,
                test,
                tmp;
            if (!options.schema) {
                return;
            }
            data = options.data;
            options.dataReadonlyRemove = options.dataReadonlyRemove || [{}, '', null];
            dataReadonlyRemove2 = options.dataReadonlyRemove[2] || {};
            schema = options.schema;
            circularList = [];
            while (true) {
                // dereference schema.schema
                while (schema.schema) {
                    schema = schema.schema;
                }
                // dereference schema.oneOf
                oneOf = (data && schema.oneOf) || [];
                for (ii = 0; ii < oneOf.length; ii += 1) {
                    tmp = String(oneOf[ii] && oneOf[ii].$ref)
                        .replace('http://json-schema.org/draft-04/schema#', '#');
                    switch (tmp + ' ' + (!local.isNullOrUndefined(data.$ref) || data.in)) {
                    case '#/definitions/bodyParameter body':
                    case '#/definitions/formDataParameterSubSchema formData':
                    case '#/definitions/headerParameterSubSchema header':
                    case '#/definitions/jsonReference true':
                    case '#/definitions/pathParameterSubSchema path':
                    case '#/definitions/queryParameterSubSchema query':
                        schema = local.swaggerSchemaJson.definitions[tmp.split('/')[2]];
                        break;
                    default:
                        switch (tmp) {
                        case '#/definitions/bodyParameter':
                        case '#/definitions/jsonReference':
                            schema = oneOf[ii ^ 1];
                            break;
                        }
                    }
                    if (!schema.oneOf) {
                        break;
                    }
                }
                // dereference schema.$ref
                $ref = schema && schema.$ref;
                if (!$ref) {
                    break;
                }
                test = circularList.indexOf($ref) < 0;
                local.throwSwaggerError(!test && {
                    data: data,
                    errorType: 'schemaDeferenceCircular',
                    prefix: options.prefix,
                    schema: schema
                });
                circularList.push($ref);
                tmp = $ref.split('/').slice(-2);
                schema = $ref.indexOf('http://json-schema.org/draft-04/schema#/') === 0
                    ? local.swaggerSchemaJson[tmp[0]]
                    : options.swaggerJson[tmp[0]];
                schema = schema && schema[tmp[1]];
                test = schema;
                local.throwSwaggerError(!test && {
                    data: data,
                    errorType: 'schemaDeference',
                    prefix: options.prefix,
                    schema: options.schema
                });
            }
            if (options.modeDereference) {
                return schema;
            }
            // validate schema.default
            if (options.modeDefault) {
                data = schema.default;
            }
            // validate semanticRequired
            test = options.modeDefault ||
                !local.isNullOrUndefined(data) ||
                schema.required !== true ||
                schema['x-swgg-notRequired'];
            local.throwSwaggerError(!test && {
                data: data,
                errorType: 'semanticRequired',
                prefix: options.prefix,
                schema: schema
            });
            if (local.isNullOrUndefined(data)) {
                return;
            }
            // validate semanticRequiredArrayItems
            test = !options.modeSchema || local.schemaPType(data) !== 'array' ||
                (typeof local.schemaPItems(data) === 'object' && local.schemaPItems(data));
            local.throwSwaggerError(!test && {
                data: data,
                errorType: 'semanticRequiredArrayItems',
                prefix: options.prefix,
                schema: schema
            });
            // remove readOnly property
            if (schema.readOnly) {
                delete options.dataReadonlyRemove[0][options.dataReadonlyRemove[1]];
            }
            // optimization - validate schema.type first
            // 5.5.2. type
            // https://swagger.io/docs/specification/data-models/data-types/
            // https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md#data-types
            switch (local.schemaPType(schema)) {
            case 'array':
                test = Array.isArray(data);
                break;
            case 'boolean':
                test = typeof data === 'boolean';
                break;
            case 'file':
                test = !options.modeSchema;
                break;
            case 'integer':
                test = Number.isFinite(data) && Math.floor(data) === data;
                switch (schema.format) {
                case 'int32':
                    break;
                case 'int64':
                    break;
                }
                break;
            case 'number':
                test = Number.isFinite(data);
                switch (schema.format) {
                case 'double':
                    break;
                case 'float':
                    break;
                }
                break;
            case 'string':
                test = typeof data === 'string' ||
                    (!options.modeSchema && schema.format === 'binary');
                switch (test && !options.modeSchema && schema.format) {
                // Clarify 'byte' format #50
                // https://github.com/swagger-api/swagger-spec/issues/50
                case 'byte':
                    test = !(/[^\n\r\+\/0-9\=A-Za-z]/).test(data);
                    break;
                case 'date':
                case 'date-time':
                    test = JSON.stringify(new Date(data)) !== 'null';
                    break;
                case 'email':
                    test = local.regexpEmailValidate.test(data);
                    break;
                case 'json':
                    test = local.tryCatchOnError(function () {
                        JSON.parse(data);
                        return true;
                    }, local.nop);
                    break;
                case 'phone':
                    test = local.regexpPhoneValidate.test(data);
                    break;
                }
                break;
            default:
                test = options.modeSchema || typeof data === 'object';
                break;
            }
            local.throwSwaggerError(!test && {
                data: data,
                errorType: 'itemType',
                prefix: options.prefix,
                schema: schema,
                typeof: typeof data
            });
            tmp = typeof data;
            if (tmp === 'object' && Array.isArray(data)) {
                tmp = 'array';
            }
            switch (tmp) {
            // 5.1. Validation keywords for numeric instances (number and integer)
            case 'number':
                // 5.1.1. multipleOf
                test = typeof schema.multipleOf !== 'number' || data % schema.multipleOf === 0;
                local.throwSwaggerError(!test && {
                    data: data,
                    errorType: 'numberMultipleOf',
                    prefix: options.prefix,
                    schema: schema
                });
                // 5.1.2. maximum and exclusiveMaximum
                test = typeof schema.maximum !== 'number' || (schema.exclusiveMaximum
                    ? data < schema.maximum
                    : data <= schema.maximum);
                local.throwSwaggerError(!test && {
                    data: data,
                    errorType: schema.exclusiveMaximum
                        ? 'numberExclusiveMaximum'
                        : 'numberMaximum',
                    prefix: options.prefix,
                    schema: schema
                });
                // 5.1.3. minimum and exclusiveMinimum
                test = typeof schema.minimum !== 'number' || (schema.exclusiveMinimum
                    ? data > schema.minimum
                    : data >= schema.minimum);
                local.throwSwaggerError(!test && {
                    data: data,
                    errorType: schema.exclusiveMinimum
                        ? 'numberExclusiveMinimum'
                        : 'numberMinimum',
                    prefix: options.prefix,
                    schema: schema
                });
                break;
            // 5.2. Validation keywords for strings
            case 'string':
                // 5.2.1. maxLength
                test = typeof schema.maxLength !== 'number' || data.length <= schema.maxLength;
                local.throwSwaggerError(!test && {
                    data: data,
                    errorType: 'stringMaxLength',
                    prefix: options.prefix,
                    schema: schema
                });
                // 5.2.2. minLength
                test = typeof schema.minLength !== 'number' || data.length >= schema.minLength;
                local.throwSwaggerError(!test && {
                    data: data,
                    errorType: 'stringMinLength',
                    prefix: options.prefix,
                    schema: schema
                });
                // 5.2.3. pattern
                test = !schema.pattern || new RegExp(schema.pattern).test(data);
                local.throwSwaggerError(!test && {
                    data: data,
                    errorType: 'stringPattern',
                    prefix: options.prefix,
                    schema: schema
                });
                break;
            // 5.3. Validation keywords for arrays
            case 'array':
                // 5.3.1. additionalItems and items
                // swagger disallows array items
                data.forEach(function (element, ii) {
                    // recurse - schema.additionalItems and schema.items
                    local.validateBySwaggerSchema({
                        data: element,
                        dataReadonlyRemove: [dataReadonlyRemove2, ii, dataReadonlyRemove2[ii]],
                        modeSchema: options.modeSchema,
                        prefix: options.prefix.concat([ii]),
                        schema: local.schemaPItems(schema) || schema.additionalItems,
                        swaggerJson: options.swaggerJson
                    });
                });
                // 5.3.2. maxItems
                test = typeof schema.maxItems !== 'number' || data.length <= schema.maxItems;
                local.throwSwaggerError(!test && {
                    data: data,
                    errorType: 'arrayMaxItems',
                    prefix: options.prefix,
                    schema: schema
                });
                // 5.3.3. minItems
                test = typeof schema.minItems !== 'number' || data.length >= schema.minItems;
                local.throwSwaggerError(!test && {
                    data: data,
                    errorType: 'arrayMinItems',
                    prefix: options.prefix,
                    schema: schema
                });
                // 5.3.4. uniqueItems
                test = !schema.uniqueItems || data.every(function (element) {
                    tmp = element;
                    return data.indexOf(element) === data.lastIndexOf(element);
                });
                local.throwSwaggerError(!test && {
                    data: data,
                    errorType: 'arrayUniqueItems',
                    prefix: options.prefix,
                    schema: schema,
                    tmp: tmp
                });
                break;
            // 5.4. Validation keywords for objects
            case 'object':
                // 5.4.1. maxProperties
                test = typeof schema.maxProperties !== 'number' ||
                    Object.keys(data).length <= schema.maxProperties;
                local.throwSwaggerError(!test && {
                    data: data,
                    errorType: 'objectMaxProperties',
                    prefix: options.prefix,
                    schema: schema
                });
                // 5.4.2. minProperties
                test = typeof schema.minProperties !== 'number' ||
                    Object.keys(data).length >= schema.minProperties;
                local.throwSwaggerError(!test && {
                    data: data,
                    errorType: 'objectMinProperties',
                    prefix: options.prefix,
                    schema: schema
                });
                // 5.4.3. required
                local.normalizeValue('list', schema.required).forEach(function (key) {
                    test = !local.isNullOrUndefined(data[key]);
                    local.throwSwaggerError(!test && {
                        data: data,
                        errorType: 'objectRequired',
                        key: key,
                        prefix: options.prefix,
                        schema: schema
                    });
                });
                // 5.4.4. additionalProperties, properties and patternProperties
                Object.keys(data).forEach(function (key) {
                    tmp = null;
                    if (schema.properties && schema.properties[key]) {
                        tmp = true;
                        // recurse - schema.properties
                        local.validateBySwaggerSchema({
                            data: data[key],
                            dataReadonlyRemove: [
                                dataReadonlyRemove2,
                                key,
                                dataReadonlyRemove2[key]
                            ],
                            modeSchema: options.modeSchema,
                            prefix: options.prefix.concat([key]),
                            schema: schema.properties[key],
                            swaggerJson: options.swaggerJson
                        });
                    }
                    Object.keys(schema.patternProperties || {}).forEach(function (rgx) {
                        if (new RegExp(rgx).test(key)) {
                            tmp = true;
                            // recurse - schema.patternProperties
                            local.validateBySwaggerSchema({
                                data: data[key],
                                modeSchema: options.modeSchema,
                                prefix: options.prefix.concat([key]),
                                schema: schema.patternProperties[rgx],
                                swaggerJson: options.swaggerJson
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
                        errorType: 'objectAdditionalProperties',
                        key: key,
                        prefix: options.prefix,
                        schema: schema
                    });
                    // recurse - schema.additionalProperties
                    local.validateBySwaggerSchema({
                        data: data[key],
                        modeSchema: options.modeSchema,
                        prefix: options.prefix.concat([key]),
                        schema: schema.additionalProperties,
                        swaggerJson: options.swaggerJson
                    });
                });
                // 5.4.5. dependencies
                Object.keys(schema.dependencies || {}).forEach(function (key) {
                    if (local.isNullOrUndefined(data[key])) {
                        return;
                    }
                    // 5.4.5.2.1. Schema dependencies
                    // recurse - schema.dependencies
                    local.validateBySwaggerSchema({
                        data: data[key],
                        modeSchema: options.modeSchema,
                        prefix: options.prefix.concat([key]),
                        schema: schema.dependencies[key],
                        swaggerJson: options.swaggerJson
                    });
                    // 5.4.5.2.2. Property dependencies
                    local.normalizeValue('list', schema.dependencies[key]).every(function (key2) {
                        test = !local.isNullOrUndefined(data[key2]);
                        local.throwSwaggerError(!test && {
                            data: data,
                            errorType: 'objectDependencies',
                            key: key,
                            key2: key2,
                            prefix: options.prefix,
                            schema: schema
                        });
                    });
                });
                break;
            }
            // 5.5. Validation keywords for any instance type
            // 5.5.1. enum
            tmp = schema.enum || (!options.modeSchema && (local.schemaPItems(schema) || {}).enum);
            test = !tmp || (Array.isArray(data)
                ? data
                : [data]).every(function (element) {
                return tmp.indexOf(element) >= 0;
            });
            local.throwSwaggerError(!test && {
                data: data,
                errorType: 'itemEnum',
                prefix: options.prefix,
                schema: schema,
                tmp: tmp
            });
            // 5.5.2. type
            local.nop();
            // 5.5.3. allOf
            (schema.allOf || []).forEach(function (element) {
                // recurse - schema.allOf
                local.validateBySwaggerSchema({
                    data: data,
                    prefix: options.prefix,
                    modeSchema: options.modeSchema,
                    schema: element,
                    swaggerJson: options.swaggerJson
                });
            });
            // 5.5.4. anyOf
            tmp = null;
            test = !schema.anyOf || schema.anyOf.some(function (element) {
                local.tryCatchOnError(function () {
                    // recurse - schema.anyOf
                    local.validateBySwaggerSchema({
                        data: data,
                        modeSchema: options.modeSchema,
                        prefix: options.prefix,
                        schema: element,
                        swaggerJson: options.swaggerJson
                    });
                    return true;
                }, local.nop);
                tmp = tmp || local.utility2._debugTryCatchError;
                return !tmp;
            });
            local.throwSwaggerError(!test && {
                data: data,
                errorType: 'itemOneOf',
                prefix: options.prefix,
                schema: schema,
                tmp: tmp
            });
            // 5.5.5. oneOf
            tmp = !schema.oneOf
                ? 1
                : 0;
            (schema.oneOf || []).some(function (element) {
                local.tryCatchOnError(function () {
                    // recurse - schema.oneOf
                    local.validateBySwaggerSchema({
                        data: data,
                        modeSchema: options.modeSchema,
                        prefix: options.prefix,
                        schema: element,
                        swaggerJson: options.swaggerJson
                    });
                    tmp += 1;
                }, local.nop);
                return tmp > 1;
            });
            test = tmp === 1;
            local.throwSwaggerError(!test && {
                data: data,
                errorType: 'itemOneOf',
                prefix: options.prefix,
                schema: schema,
                tmp: tmp
            });
            // 5.5.6. not
            test = !schema.not || !local.tryCatchOnError(function () {
                // recurse - schema.not
                local.validateBySwaggerSchema({
                    data: data,
                    modeSchema: options.modeSchema,
                    prefix: options.prefix,
                    schema: schema.not,
                    swaggerJson: options.swaggerJson
                });
                return true;
            }, local.nop);
            local.throwSwaggerError(!test && {
                data: data,
                errorType: 'itemNot',
                prefix: options.prefix,
                schema: schema
            });
            // 5.5.7. definitions
            local.nop();
            // validate data.$ref
            if (schema === local.swaggerSchemaJson.definitions.jsonReference) {
                local.validateBySwaggerSchema({
                    modeDereference: true,
                    modeSchema: options.modeSchema,
                    prefix: options.prefix,
                    schema: data,
                    swaggerJson: options.swaggerJson
                });
            }
            return schema;
        };
    }());
    switch (local.modeJs) {



    // run node js-env code - init-after
    /* istanbul ignore next */
    case 'node':
        if (local.fs.existsSync(local.__dirname + '/assets.swgg.swagger.json')) {
            local.swgg.apiUpdate(JSON.parse(
                local.fs.readFileSync(local.__dirname + '/assets.swgg.swagger.json')
            ));
        }
        break;
    }
}());
